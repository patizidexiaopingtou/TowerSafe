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

#ifndef NAPI_UTILS_H
#define NAPI_UTILS_H

#include <map>
#include <memory>
#include <string>

#include "js_native_api.h"
#include "napi/native_api.h"
#include "napi/native_node_api.h"
#include "time_hilog_wreapper.h"
namespace OHOS {
namespace MiscServices {
namespace Time {
#define NAPI_ASSERTS_BASE(env, assertion, code, message, retVal) \
    do {                                                         \
        if (!(assertion)) {                                      \
            napi_throw_error((env), code, message);              \
            return retVal;                                       \
        }                                                        \
    } while (0)

#define NAPI_ASSERTP(env, assertion, message) \
    NAPI_ASSERTS_BASE(env, assertion, std::to_string(ERROR).c_str(), message, nullptr)

/* check condition related to argc/argv, return and logging. */
#define CHECK_ARGS_RETURN_VOID(module, context, condition, message, code)  \
    do {                                                                   \
        if (!(condition)) {                                                \
            (context)->status = napi_invalid_arg;                          \
            (context)->errMessage = std::string(message);                  \
            (context)->errCode = code;                                     \
            TIME_HILOGE(module, "test (" #condition ") failed: " message); \
            return;                                                        \
        }                                                                  \
    } while (0)

#define CHECK_STATUS_RETURN_VOID(module, context, message, code)                       \
    do {                                                                               \
        if ((context)->status != napi_ok) {                                            \
            (context)->errMessage = std::string(message);                              \
            (context)->errCode = code;                                                 \
            TIME_HILOGE(module, "test (context->status == napi_ok) failed: " message); \
            return;                                                                    \
        }                                                                              \
    } while (0)

/* check condition, return and logging if condition not true. */
#define CHECK_RETURN(module, condition, message, retVal)                   \
    do {                                                                   \
        if (!(condition)) {                                                \
            TIME_HILOGE(module, "test (" #condition ") failed: " message); \
            return retVal;                                                 \
        }                                                                  \
    } while (0)

#define CHECK_RETURN_VOID(module, condition, message)                      \
    do {                                                                   \
        if (!(condition)) {                                                \
            TIME_HILOGE(module, "test (" #condition ") failed: " message); \
            return;                                                        \
        }                                                                  \
    } while (0)

constexpr size_t ARGC_ONE = 1;
constexpr size_t ARGC_TWO = 2;
constexpr size_t ARGC_THREE = 3;

constexpr size_t ARGV_FIRST = 0;
constexpr size_t ARGV_SECOND = 1;
constexpr size_t ARGV_THIRD = 2;

constexpr int32_t SET_TIME_MAX_PARA = 2;
constexpr int32_t SET_TIMEZONE_MAX_PARA = 2;

constexpr int32_t CREATE_MAX_PARA = 2;
constexpr int32_t START_MAX_PARA = 3;
constexpr int32_t STOP_MAX_PARA = 2;
constexpr int32_t DESTROY_MAX_PARA = 2;

constexpr int32_t MAX_TIME_ZONE_ID = 1024;
constexpr int32_t INVALID_TIME = -1;

enum JsErrorCode : int32_t {
    ERROR_OK = 0,
    ERROR = -1,
    PERMISSION_ERROR = 201,
    SYSTEM_APP_ERROR = 202,
    PARAMETER_ERROR = 401,
};

struct CallbackPromiseInfo {
    napi_ref callback = nullptr;
    napi_deferred deferred = nullptr;
    bool isCallback = false;
    int errorCode = JsErrorCode::ERROR_OK;
    std::string message;
};

const std::map<int32_t, std::string> CODE_TO_MESSAGE = {
    { JsErrorCode::SYSTEM_APP_ERROR, "not system app" },
    { JsErrorCode::PARAMETER_ERROR, "parameter invalid" },
    { JsErrorCode::PERMISSION_ERROR, "permission denied" },
    { JsErrorCode::ERROR, "system error" },
};

class NapiUtils {
public:
    static napi_value GetCallbackErrorValue(napi_env env, int32_t errCode, const std::string &message);
    static napi_value NapiGetNull(napi_env env);
    static void SetPromise(napi_env env, const napi_deferred deferred, int errorCode, const std::string &message,
        napi_value result);
    static void SetCallback(napi_env env, napi_ref callbackIn, int32_t errorCode, const std::string &message,
        napi_value result);
    static void ReturnCallbackPromise(napi_env env, const CallbackPromiseInfo &info, napi_value result);
    static napi_value JSParaError(napi_env env, napi_ref callback);
    static napi_value ParseParametersBySetTime(napi_env env, const napi_value (&argv)[SET_TIME_MAX_PARA], size_t argc,
        int64_t &times, napi_ref &callback);
    static napi_value ParseParametersBySetTimezone(napi_env env, const napi_value (&argv)[SET_TIMEZONE_MAX_PARA],
        size_t argc, std::string &timezoneId, napi_ref &callback);
    static napi_value ParseParametersGet(napi_env env, const napi_value (&argv)[SET_TIMEZONE_MAX_PARA], size_t argc,
        napi_ref &callback);
    static napi_value ParseParametersGetNA(napi_env env, const napi_value (&argv)[SET_TIMEZONE_MAX_PARA], size_t argc,
        napi_ref &callback, bool *isNano);
    static int32_t ConvertErrorCode(int32_t timeErrorCode);
    static napi_value CreateNapiNumber(napi_env env, int32_t objName);
    static napi_value GetUndefinedValue(napi_env env);
    static napi_status GetValue(napi_env env, napi_value in, std::string &out);
    static void SetTimerCallback(const napi_env &env, const napi_ref &callbackIn, const int &errorCode,
        const char *message, const napi_value &result);
    static napi_status ThrowError(napi_env env, const char *napiMessage, int32_t napiCode);
    static std::string GetErrorMessage(int32_t errCode);
};
} // namespace Time
} // namespace MiscServices
} // namespace OHOS

#endif // NAPI_UTILS_H