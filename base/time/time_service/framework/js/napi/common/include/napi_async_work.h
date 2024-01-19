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

#ifndef NAPI_ASYNC_WORK_H
#define NAPI_ASYNC_WORK_H

#include <functional>
#include <memory>
#include <string>

#include "napi/native_api.h"
#include "napi/native_common.h"
#include "napi/native_node_api.h"
#include "time_hilog_wreapper.h"

namespace OHOS {
namespace MiscServices {
namespace Time {
using NapiCbInfoParser = std::function<void(size_t argc, napi_value *argv)>;
using NapiAsyncExecute = std::function<void(void)>;
using NapiAsyncComplete = std::function<void(napi_value &)>;

struct ContextBase {
    virtual ~ContextBase();
    void GetCbInfo(napi_env env, napi_callback_info info, NapiCbInfoParser parse = NapiCbInfoParser(),
        bool sync = false);

    napi_env env = nullptr;
    napi_value output = nullptr;
    napi_status status = napi_invalid_arg;
    std::string errMessage = "";
    int32_t errCode = 0;
    napi_value self = nullptr;

private:
    napi_deferred deferred = nullptr;
    napi_async_work work = nullptr;
    napi_ref callbackRef = nullptr;
    napi_ref selfRef = nullptr;

    NapiAsyncExecute execute = nullptr;
    NapiAsyncComplete complete = nullptr;

    static constexpr size_t ARGC_MAX = 3;

    friend class NapiAsyncWork;
};

class NapiAsyncWork {
public:
    static napi_value Enqueue(napi_env env, ContextBase *ctxt, const std::string &name,
        NapiAsyncExecute execute = NapiAsyncExecute(), NapiAsyncComplete complete = NapiAsyncComplete());

private:
    enum {
        /* AsyncCallback / Promise output result index  */
        RESULT_ERROR = 0,
        RESULT_DATA = 1,
        RESULT_ALL = 2
    };
    static void GenerateOutput(ContextBase *ctxt);
};
} // namespace Time
} // namespace MiscServices
} // namespace OHOS

#endif // NAPI_ASYNC_WORK_H