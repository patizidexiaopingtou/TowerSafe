/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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

#include "wasm_func.h"

namespace SysTuning {
namespace TraceStreamer {
RpcServer g_wasmTraceStreamer;
extern "C" {
using ReplyFunction = void (*)(const char* data, uint32_t len, int finish);
ReplyFunction g_reply;
uint8_t* g_reqBuf;
uint32_t g_reqBufferSize;

using SendDataCallBack = void (*)(const char* data, int len, int componentId);
SendDataCallBack g_sendData = nullptr;
uint8_t* g_sendDataBuf;
uint32_t g_sendDataBufSize;

void ResultCallback(const std::string& jsonResult, int finish)
{
    g_reply(jsonResult.data(), jsonResult.size(), finish);
}
EMSCRIPTEN_KEEPALIVE uint8_t* Initialize(ReplyFunction replyFunction, uint32_t reqBufferSize)
{
    g_reply = replyFunction;
    g_reqBuf = new uint8_t[reqBufferSize];
    g_reqBufferSize = reqBufferSize;
    return g_reqBuf;
}

EMSCRIPTEN_KEEPALIVE int UpdateTraceTime(int len)
{
    return g_wasmTraceStreamer.UpdateTraceTime(g_reqBuf, len);
}

void ThirdPary_SendDataCallback(const char* pluginData, int len, int componentId)
{
    if (g_sendData) {
        g_sendData(pluginData, len, componentId);
    }
}

EMSCRIPTEN_KEEPALIVE uint8_t* TraceStreamer_Set_ThirdParty_DataDealer(SendDataCallBack sendDataCallBack,
                                                                      uint32_t reqBufferSize)
{
    g_sendData = sendDataCallBack;
    g_sendDataBuf = new uint8_t[reqBufferSize];
    g_sendDataBufSize = reqBufferSize;
    return g_sendDataBuf;
}

int TraceStreamer_Plugin_Out_Filter(const char* pluginData, int len, const std::string componentName)
{
    std::map<int, std::string>::iterator itor = g_wasmTraceStreamer.g_thirdPartyConfig.begin();
    int componentId = 0;
    for (; itor != g_wasmTraceStreamer.g_thirdPartyConfig.end(); ++itor) {
        if (itor->second == componentName) {
            componentId = itor->first;
            return TraceStreamer_Plugin_Out_SendData(pluginData, len, componentId);
        }
    }
    return -1;
}

// Tell js to call the corresponding third-party parser interface according to the compositeId
int TraceStreamer_Plugin_Out_SendData(const char* pluginData, int len, int componentId)
{
    ThirdPary_SendDataCallback(pluginData, len, componentId);
    return 0;
}

EMSCRIPTEN_KEEPALIVE int TraceStreamer_Init_ThirdParty_Config(int dataLen)
{
    return g_wasmTraceStreamer.TraceStreamer_Init_ThirdParty_Config(g_reqBuf, dataLen);
}

// return 0 while ok, -1 while failed
EMSCRIPTEN_KEEPALIVE int TraceStreamerParseData(const uint8_t* data, int dataLen)
{
    if (g_wasmTraceStreamer.ParseData(data, dataLen, nullptr)) {
        return 0;
    }
    return -1;
}
// return 0 while ok, -1 while failed
EMSCRIPTEN_KEEPALIVE int TraceStreamerParseDataEx(int dataLen)
{
    if (g_wasmTraceStreamer.ParseData(g_reqBuf, dataLen, nullptr)) {
        return 0;
    }
    return -1;
}
EMSCRIPTEN_KEEPALIVE int TraceStreamerParseDataOver()
{
    if (g_wasmTraceStreamer.ParseDataOver(nullptr, 0, nullptr)) {
        return 0;
    }
    return -1;
}
EMSCRIPTEN_KEEPALIVE int TraceStreamerSqlOperate(const uint8_t* sql, int sqlLen)
{
    if (g_wasmTraceStreamer.SqlOperate(sql, sqlLen, nullptr)) {
        return 0;
    }
    return -1;
}
EMSCRIPTEN_KEEPALIVE int TraceStreamerSqlOperateEx(int sqlLen)
{
    if (g_wasmTraceStreamer.SqlOperate(g_reqBuf, sqlLen, nullptr)) {
        return 0;
    }
    return -1;
}
EMSCRIPTEN_KEEPALIVE int TraceStreamerReset()
{
    g_wasmTraceStreamer.Reset(nullptr, 0, nullptr);
    return 0;
}
// return the length of result, -1 while failed
EMSCRIPTEN_KEEPALIVE int TraceStreamerSqlQuery(const uint8_t* sql, int sqlLen, uint8_t* out, int outLen)
{
    return g_wasmTraceStreamer.WasmSqlQuery(sql, sqlLen, out, outLen);
}
// return the length of result, -1 while failed
EMSCRIPTEN_KEEPALIVE int TraceStreamerSqlQueryEx(int sqlLen)
{
    return g_wasmTraceStreamer.WasmSqlQueryWithCallback(g_reqBuf, sqlLen, &ResultCallback);
}
EMSCRIPTEN_KEEPALIVE int TraceStreamerCancel()
{
    g_wasmTraceStreamer.CancelSqlQuery();
    return 0;
}
} // extern "C"
} // namespace TraceStreamer
} // namespace SysTuning
