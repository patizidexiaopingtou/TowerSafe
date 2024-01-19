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

// @ts-ignore
import {HiPerfReport,HiPerfReportStruct} from "../../../../dist/trace/database/ui-worker/ProcedureWorkerHiPerfReport.js"
// @ts-ignore
import {Rect} from "../../../../dist/trace/database/ui-worker/ProcedureWorkerCommon";

describe('ProcedureWorkerHiPerfReport Test', ()=> {

    it('ProcedureWorkerHiPerfReportTest01', () => {
        let frame = {
            x:0,
            y:9,
            width:10,
            height:10
        }
        let dataList = new Array();
        dataList.push({startTime: 0, dur: 10, frame: {x:0, y:9, width:10, height:10}})
        dataList.push({startTime: 1, dur: 111})
        let dataList2 = new Array();
        dataList2.push({startTime: 0, dur: 10, frame: {x:0, y:9, width:10, height:1}})
        dataList2.push({startTime: 1, dur: 111})
        let rect = new Rect(0, 10, 10, 10);
        HiPerfReport(dataList, dataList2, "", [{length: 1}], 1, 1024, 1024, frame, true, 1, true)
    });

    it('ProcedureWorkerHiPerfReportTest02', () => {
        let frame = {
            x:0,
            y:9,
            width:10,
            height:10
        }
        let dataList = new Array();
        dataList.push({startTime: 0, dur: 10, frame: {x:0, y:9, width:10, height:10}})
        dataList.push({startTime: 1, dur: 111, frame: {x:0, y:9, width:10, height:10}})
        let rect = new Rect(0, 10, 10, 10);
        let dataList2 = new Array();
        dataList2.push({startTime: 0, dur: 10, frame: {x:0, y:9, width:10, height:1}})
        dataList2.push({startTime: 1, dur: 111})
        HiPerfReport(dataList, dataList2, "", [{length: 0}], 1, 1024, 1024, frame, true, 1, false)
    });

    it('ProcedureWorkerHiPerfReportTest07', () => {
        let frame = {
            x:0,
            y:9,
            width:10,
            height:10
        }
        let dataList = new Array();
        dataList.push({startTime: 0, dur: 10, frame: {x:0, y:9, width:10, height:10}})
        dataList.push({startTime: 1, dur: 111, frame: {x:0, y:9, width:10, height:10}})
        let rect = new Rect(0, 10, 10, 10);
        let dataList2 = new Array();
        dataList2.push({startTime: 0, dur: 10, frame: {x:0, y:9, width:10, height:1}})
        dataList2.push({startTime: 1, dur: 111})
        HiPerfReport(dataList, dataList2, "", [{length: 0}], 1, 1024, 1024, frame, false, 1, false)
    });

    it('ProcedureWorkerHiPerfReportTest03',()=>{
        const data = {
            frame : {
                x:0,
                y:9,
                width:10,
                height:10
            },
            cpu:1,
            startNs:1,
            value:1,
        }
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        expect(HiPerfReportStruct.drawRoundRectPath(ctx,1,0,10,10,12)).toBeUndefined();
    });

    it('ProcedureWorkerHiPerfReportTest04', function () {
        let node = {
            frame: {
                x: 20,
                y: 20,
                width: 100,
                height: 100
            },
            startNS: 0,
            value: 50,
            startTs:3,
            dur:1,
            height:2
        }
        let  frame = {
            x: 20,
            y: 20,
            width: 100,
            height: 100
        }
        expect(HiPerfReportStruct.setFrame(node,2, 1,2,frame)).toBeUndefined()
    });

    it('ProcedureWorkerHiPerfReportTest05', function () {
        let node = {
            frame: {
                x: 20,
                y: 20,
                width: 100,
                height: 100
            },
            startNS: 2,
            value: 50,
            startTs:3,
            dur:3,
            height:2
        }
        let  frame = {
            x: 20,
            y: 20,
            width: 100,
            height: 100
        }
        expect(HiPerfReportStruct.setFrame(node,2, 1,2,frame)).toBeUndefined()
    });

    it('ProcedureWorkerHiPerfReportTest06', function () {
        expect(HiPerfReportStruct.groupBy10MS([{ps:1},{coX:"1"}],10,"")).toEqual([{"dur": 10000000, "height": NaN, "startNS": NaN, "sum": NaN,}])
    });
})