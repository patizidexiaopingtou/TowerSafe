/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

importScripts("trace_streamer_builtin.js", "TempSql.js");
self.onerror = function (error: any) {
}
let Module: any = null;
let enc = new TextEncoder();
let dec = new TextDecoder();
let arr: Uint8Array;
let start: number;
const REQ_BUF_SIZE = 4 * 1024 * 1024;
let reqBufferAddr:number = -1;
let bufferSlice:Array<any> = []
let json:string;

let headUnitArray:Uint8Array;
let thirdWasmMap = new Map();
let thirdJsonResult = new Map();

function initWASM() {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        let wasm = trace_streamer_builtin_wasm
        Module = wasm({
            locateFile: (s: any) => {
                return s
            },
            print: (line: any) => {
            },
            printErr: (line: any) => {
            },
            onRuntimeInitialized: () => {
                resolve("ok");
            },
            onAbort: () => {
                reject("on abort");
            }
        });
    })
}

function initThirdWASM(wasmFunctionName:string) {
    function callModelFun(functionName: string) {
        let func = eval(functionName);
        return new func({
            locateFile: (s: any) => {
                return s
            },
            print: (line: any) => {
            },
            printErr: (line: any) => {
            },
            onRuntimeInitialized: () => {
            },
            onAbort: () => {
            }
        });
    }
    return callModelFun(wasmFunctionName)
}

let merged = ()=>{
    let length = 0;
    bufferSlice.forEach(item => {
        length += item.length;
    });
    let mergedArray = new Uint8Array(length);
    let offset = 0;
    bufferSlice.forEach(item => {
        mergedArray.set(item, offset);
        offset += item.length;
    });
    return mergedArray;
}
let convertJSON = ()=>{
    let str = dec.decode(arr);
    let jsonArray = [];
    str = str.substring(str.indexOf("\n") + 1);
    if (!str) {
    }else{
        let parse = JSON.parse(str);
        let columns = parse.columns;
        let values = parse.values;
        for (let i = 0; i < values.length; i++) {
            let obj: any = {}
            for (let j = 0; j < columns.length; j++) {
                obj[columns[j]] = values[i][j]
            }
            jsonArray.push(obj)
        }
    }
    return jsonArray;
}
self.onmessage = async (e: MessageEvent) => {
    if (e.data.action === "open") {
        await initWASM();
        // @ts-ignore
        self.postMessage({id: e.data.id, action: e.data.action, ready: true, index: 0});
        let uint8Array = new Uint8Array(e.data.buffer);
        let callback = (heapPtr: number, size: number, isEnd: number) => {
            let out:Uint8Array = Module.HEAPU8.slice(heapPtr, heapPtr + size);
            bufferSlice.push(out);
            if(isEnd == 1){
                arr = merged();
                bufferSlice.length = 0;
            }
        }
        let fn = Module.addFunction(callback, "viii");
        reqBufferAddr = Module._Initialize(fn, REQ_BUF_SIZE);
        let wasmConfigStr = e.data.wasmConfig
        if (wasmConfigStr != "") {
            let wasmConfig = JSON.parse(wasmConfigStr);
            let wasmConfigs = wasmConfig.WasmFiles
            let itemArray = wasmConfigs.map((item:any) => {return item.componentId + ";" + item.pluginName})
            let thirdWasmStr: string = itemArray.join(";")
            let configUintArray = enc.encode(thirdWasmStr + ";");
            Module.HEAPU8.set(configUintArray, reqBufferAddr);
            Module._TraceStreamer_Init_ThirdParty_Config(configUintArray.length);
            let first = true;
            let sendDataCallback = (heapPtr: number, size: number, componentID: number) => {
                if (componentID == 100) {
                    if (first) {
                        first = false;
                        headUnitArray = Module.HEAPU8.slice(heapPtr, heapPtr + size);
                    }
                    return;
                }
                let configs = wasmConfigs.filter((wasmConfig: any) => {
                    return wasmConfig.componentId == componentID;
                })
                if (configs.length > 0) {
                    let config = configs[0];
                    let model = thirdWasmMap.get(componentID)
                    if (model == null && config.componentId == componentID) {
                        importScripts(config.wasmJsName)
                        let thirdMode = initThirdWASM(config.wasmName)
                        let thirdQueryDataCallBack = (heapPtr: number, size: number, isEnd: number, isConfig: number) => {
                            if (isConfig == 1) {
                                let out: Uint8Array = thirdMode.HEAPU8.slice(heapPtr, heapPtr + size);
                                thirdJsonResult.set(componentID, dec.decode(out))
                            } else  {
                                let out: Uint8Array = thirdMode.HEAPU8.slice(heapPtr, heapPtr + size);
                                bufferSlice.push(out);
                                if (isEnd == 1) {
                                    arr = merged();
                                    bufferSlice.length = 0;
                                }
                            }
                        }
                        let fn = thirdMode.addFunction(thirdQueryDataCallBack, "viiii");
                        let thirdreqBufferAddr = thirdMode._Init(fn, REQ_BUF_SIZE)
                        let updateTraceTimeCallBack = (heapPtr: number, size: number) => {
                            let out: Uint8Array = thirdMode.HEAPU8.slice(heapPtr, heapPtr + size);
                            Module.HEAPU8.set(out, reqBufferAddr);
                            Module._UpdateTraceTime(out.length);
                        }
                        let traceRangeFn = thirdMode.addFunction(updateTraceTimeCallBack, "vii");
                        let mm = thirdMode._InitTraceRange(traceRangeFn, 1024)
                        thirdMode._TraceStreamer_In_JsonConfig();
                        thirdMode.HEAPU8.set(headUnitArray, thirdreqBufferAddr);
                        thirdMode._ParserData(headUnitArray.length, 100);
                        let out: Uint8Array = Module.HEAPU8.slice(heapPtr, heapPtr + size);
                        thirdMode.HEAPU8.set(out, thirdreqBufferAddr);
                        thirdMode._ParserData(out.length, componentID);
                        thirdWasmMap.set(componentID, {"model": thirdMode, "bufferAddr":thirdreqBufferAddr})
                    } else {
                        let mm = model.model
                        let out: Uint8Array = Module.HEAPU8.slice(heapPtr, heapPtr + size);
                        mm.HEAPU8.set(out, model.bufferAddr);
                        mm._ParserData(out.length, componentID);
                    }
                }
            }
            let fn1 = Module.addFunction(sendDataCallback, "viii");
            let reqBufferAddr1 = Module._TraceStreamer_Set_ThirdParty_DataDealer(fn1, REQ_BUF_SIZE);
        }
        let wrSize = 0;
        let r2 = -1;
        while (wrSize < uint8Array.length) {
            const sliceLen = Math.min(uint8Array.length - wrSize, REQ_BUF_SIZE);
            const dataSlice = uint8Array.subarray(wrSize, wrSize + sliceLen);
            Module.HEAPU8.set(dataSlice, reqBufferAddr);
            wrSize += sliceLen;
            r2 = Module._TraceStreamerParseDataEx(sliceLen);
            if (r2 == -1) {
                break;
            }
        }
        Module._TraceStreamerParseDataOver();
        for (let value of thirdWasmMap.values()) {
            value.model._TraceStreamer_In_ParseDataOver();
        }
        if (r2 == -1) {
            // @ts-ignore
            self.postMessage({id: e.data.id, action: e.data.action, init: false, msg: "parse data error"});
            return;
        }
        // @ts-ignore
        temp_init_sql_list.forEach((item, index) => {
            let r = createView(item);
            // @ts-ignore
            self.postMessage({id: e.data.id, ready: true, index: index + 1});
        });
        // @ts-ignore
        self.postMessage({id: e.data.id, action: e.data.action, init: true, msg: "ok", configSqlMap:thirdJsonResult, buffer: e.data.buffer},  [e.data.buffer]);
    } else if (e.data.action === "exec") {
        query(e.data.name, e.data.sql, e.data.params);
        let jsonArray = convertJSON();
        // @ts-ignore
        self.postMessage({id: e.data.id, action: e.data.action, results: jsonArray});
    } else if (e.data.action == "exec-buf") {
        query(e.data.name, e.data.sql, e.data.params);
        // @ts-ignore
        self.postMessage({id: e.data.id, action: e.data.action, results: arr.buffer}, [arr.buffer]);
    } else if (e.data.action.startsWith("exec-sdk")) {
        querySdk(e.data.name, e.data.sql, e.data.params, e.data.action);
        let jsonArray = convertJSON();
        // @ts-ignore
        self.postMessage({id: e.data.id, action: e.data.action, results: jsonArray});
    }
}

function createView(sql: string) {
    let enc = new TextEncoder();
    let sqlPtr = Module._malloc(sql.length);
    Module.HEAPU8.set(enc.encode(sql), sqlPtr);
    let res = Module._TraceStreamerSqlOperate(sqlPtr, sql.length);
    return res;
}

function queryJSON(name: string, sql: string, params: any) {
    query(name,sql,params);
    return convertJSON();
}

function query(name: string, sql: string, params: any) {
    if (params) {
        Reflect.ownKeys(params).forEach((key: any) => {
            if (typeof params[key] === "string") {
                sql = sql.replace(new RegExp(`\\${key}`, "g"), `'${params[key]}'`);
            } else {
                sql = sql.replace(new RegExp(`\\${key}`, "g"), params[key]);
            }
        });
    }
    start = new Date().getTime();
    let sqlUintArray = enc.encode(sql);
    Module.HEAPU8.set(sqlUintArray, reqBufferAddr);
    Module._TraceStreamerSqlQueryEx(sqlUintArray.length);
}

function querySdk(name: string, sql: string, params: any, action: string) {
    if (params) {
        Reflect.ownKeys(params).forEach((key: any) => {
            if (typeof params[key] === "string") {
                sql = sql.replace(new RegExp(`\\${key}`, "g"), `'${params[key]}'`);
            } else {
                sql = sql.replace(new RegExp(`\\${key}`, "g"), params[key]);
            }
        });
    }
    let sqlUintArray = enc.encode(sql);
    let commentId = action.substring(action.lastIndexOf("-") + 1)
    let key = Number(commentId)
    let wasm = thirdWasmMap.get(key);
    let wasmModel = wasm.model
    wasmModel.HEAPU8.set(sqlUintArray, wasm.bufferAddr);
    wasmModel._TraceStreamerSqlQueryEx(sqlUintArray.length);
}