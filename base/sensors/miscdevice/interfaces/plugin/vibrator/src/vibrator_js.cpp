/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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

#include <cstdio>
#include <map>
#include <string>
#include <unistd.h>

#include "hilog/log.h"
#include "napi/native_api.h"
#include "napi/native_node_api.h"

#include "miscdevice_log.h"
#include "vibrator_agent.h"
#include "vibrator_napi_error.h"
#include "vibrator_napi_utils.h"

namespace OHOS {
namespace Sensors {
namespace {
constexpr OHOS::HiviewDFX::HiLogLabel LABEL = { LOG_CORE, MISC_LOG_DOMAIN, "VibratorJs" };
constexpr int32_t VIBRATE_SHORT_DURATION = 35;
constexpr int32_t VIBRATE_LONG_DURATION = 1000;
}  // namespace

static std::map<std::string, int32_t> g_usageType = {
    {"unknown", USAGE_UNKNOWN},
    {"alarm", USAGE_ALARM},
    {"ring", USAGE_RING},
    {"notification", USAGE_NOTIFICATION},
    {"communication", USAGE_COMMUNICATION},
    {"touch", USAGE_TOUCH},
    {"media", USAGE_MEDIA},
    {"physicalFeedback", USAGE_PHYSICAL_FEEDBACK},
    {"simulateReality", USAGE_SIMULATE_REALITY},
};

struct VibrateInfo {
    std::string type;
    std::string usage;
    int32_t duration = 0;
    std::string effectId;
    int32_t count = 0;
};

static napi_value VibrateTime(napi_env env, napi_value args[], size_t argc)
{
    NAPI_ASSERT(env, (argc == 1 || argc == 2), "Wrong argument number");
    int32_t duration = 0;
    NAPI_ASSERT(env, GetInt32Value(env, args[0], duration), "Get int number fail");
    sptr<AsyncCallbackInfo> asyncCallbackInfo = new (std::nothrow) AsyncCallbackInfo(env);
    CHKPP(asyncCallbackInfo);

    asyncCallbackInfo->error.code = StartVibratorOnce(duration);
    if (argc == 2) {
        NAPI_ASSERT(env, IsMatchType(env, args[1], napi_function), "Wrong argument type. function expected");
        NAPI_CALL(env, napi_create_reference(env, args[1], 1, &asyncCallbackInfo->callback[0]));
        EmitAsyncCallbackWork(asyncCallbackInfo);
        return nullptr;
    }

    napi_deferred deferred = nullptr;
    napi_value promise = nullptr;
    NAPI_CALL(env, napi_create_promise(env, &deferred, &promise));
    asyncCallbackInfo->deferred = deferred;
    EmitPromiseWork(asyncCallbackInfo);
    return promise;
}

static napi_value VibrateEffectId(napi_env env, napi_value args[], size_t argc)
{
    NAPI_ASSERT(env, (argc == 1 || argc == 2), "Wrong argument number");
    string effectId;
    NAPI_ASSERT(env, GetStringValue(env, args[0], effectId), "Wrong argument type. String or function expected");
    sptr<AsyncCallbackInfo> asyncCallbackInfo = new (std::nothrow) AsyncCallbackInfo(env);
    CHKPP(asyncCallbackInfo);
    asyncCallbackInfo->error.code = StartVibrator(effectId.c_str());

    if (argc == 2) {
        NAPI_ASSERT(env, IsMatchType(env, args[1], napi_function), "Wrong argument type. function expected");
        NAPI_CALL(env, napi_create_reference(env, args[1], 1, &asyncCallbackInfo->callback[0]));
        EmitAsyncCallbackWork(asyncCallbackInfo);
        return nullptr;
    }

    napi_deferred deferred = nullptr;
    napi_value promise = nullptr;
    NAPI_CALL(env, napi_create_promise(env, &deferred, &promise));
    asyncCallbackInfo->deferred = deferred;
    EmitPromiseWork(asyncCallbackInfo);
    return promise;
}

static bool GetCallbackInfo(const napi_env &env, napi_value args[],
    sptr<AsyncCallbackInfo> &asyncCallbackInfo, string &mode)
{
    CHKPF(asyncCallbackInfo);
    CHKPF(args);
    napi_value value = nullptr;
    NAPI_CALL_BASE(env, napi_get_named_property(env, args[0], "success", &value), false);
    NAPI_CALL_BASE(env, napi_create_reference(env, value, 1, &asyncCallbackInfo->callback[0]), false);

    bool result = false;
    NAPI_CALL_BASE(env, napi_has_named_property(env, args[0], "mode", &result), false);
    if (result) {
        NAPI_CALL_BASE(env, napi_get_named_property(env, args[0], "mode", &value), false);
        NAPI_ASSERT_BASE(env, GetStringValue(env, value, mode),
            "Wrong argument type. String or function expected", false);
        NAPI_ASSERT_BASE(env, (mode == "long" || mode == "short"),
            "Wrong argument type. Invalid mode value", false);
    }
    NAPI_CALL_BASE(env, napi_has_named_property(env, args[0], "fail", &result), false);
    if (result) {
        NAPI_CALL_BASE(env, napi_get_named_property(env, args[0], "fail", &value), false);
        NAPI_CALL_BASE(env, napi_create_reference(env, value, 1, &asyncCallbackInfo->callback[1]), false);
    }
    NAPI_CALL_BASE(env, napi_has_named_property(env, args[0], "complete", &result), false);
    if (result) {
        NAPI_CALL_BASE(env, napi_get_named_property(env, args[0], "complete", &value), false);
        NAPI_CALL_BASE(env, napi_create_reference(env, value, 1, &asyncCallbackInfo->callback[2]), false);
    }
    return true;
}

static napi_value VibrateMode(napi_env env, napi_value args[], size_t argc)
{
    if (argc == 0) {
        NAPI_ASSERT(env, (StartVibratorOnce(VIBRATE_LONG_DURATION) == 0), "Vibrate long mode fail");
        return nullptr;
    }
    NAPI_ASSERT(env, (argc == 1), "Param number is invalid");
    sptr<AsyncCallbackInfo> asyncCallbackInfo = new (std::nothrow) AsyncCallbackInfo(env);
    CHKPP(asyncCallbackInfo);
    asyncCallbackInfo->callbackType = TYPE_SYSTEM_VIBRATE;
    string mode = "long";
    NAPI_ASSERT(env, GetCallbackInfo(env, args, asyncCallbackInfo, mode), "Get callback info fail");
    int32_t duration = ((mode == "long") ? VIBRATE_LONG_DURATION : VIBRATE_SHORT_DURATION);
    asyncCallbackInfo->error.code = StartVibratorOnce(duration);
    if (asyncCallbackInfo->error.code != SUCCESS) {
        asyncCallbackInfo->error.message = "Vibrator vibrate fail";
    }
    EmitAsyncCallbackWork(asyncCallbackInfo);
    return nullptr;
}

bool ParseParameter(napi_env env, napi_value args[], size_t argc, VibrateInfo &info)
{
    CHKCF((argc >= 2), "Wrong argument number");
    CHKCF(GetPropertyString(env, args[0], "type", info.type), "Get vibrate type fail");
    if (info.type == "time") {
        CHKCF(GetPropertyInt32(env, args[0], "duration", info.duration), "Get vibrate type fail");
    } else if (info.type == "preset") {
        CHKCF(GetPropertyInt32(env, args[0], "count", info.count), "Get vibrate count fail");
        CHKCF(GetPropertyString(env, args[0], "effectId", info.effectId), "Get vibrate effectId fail");
    }
    CHKCF(GetPropertyString(env, args[1], "usage", info.usage), "Get vibrate usage fail");
    return true;
}

bool SetUsage(const std::string &usage)
{
    if (auto iter = g_usageType.find(usage); iter == g_usageType.end()) {
        MISC_HILOGE("Wrong usage type");
        return false;
    }
    return SetUsage(g_usageType[usage]);
}

int32_t StartVibrate(const VibrateInfo &info)
{
    if (!SetUsage(info.usage)) {
        MISC_HILOGE("SetUsage fail");
        return PARAMETER_ERROR;
    }
    if ((info.type != "time") && (info.type != "preset")) {
        MISC_HILOGE("Invalid vibrate type");
        return PARAMETER_ERROR;
    }
    if (info.type == "preset") {
        if (!SetLoopCount(info.count)) {
            MISC_HILOGE("SetLoopCount fail");
            return PARAMETER_ERROR;
        }
        return StartVibrator(info.effectId.c_str());
    }
    return StartVibratorOnce(info.duration);
}

static napi_value VibrateEffect(napi_env env, napi_value args[], size_t argc)
{
    VibrateInfo info;
    if (!ParseParameter(env, args, argc, info)) {
        ThrowErr(env, PARAMETER_ERROR, "parameter fail");
        return nullptr;
    }
    sptr<AsyncCallbackInfo> asyncCallbackInfo = new (std::nothrow) AsyncCallbackInfo(env);
    CHKPP(asyncCallbackInfo);
    asyncCallbackInfo->error.code = StartVibrate(info);
    if ((asyncCallbackInfo->error.code != SUCCESS) && (asyncCallbackInfo->error.code == PARAMETER_ERROR)) {
        ThrowErr(env, PARAMETER_ERROR, "parameters invalid");
        return nullptr;
    }
    if (argc >= 3) {
        if (!IsMatchType(env, args[2], napi_function)) {
            ThrowErr(env, PARAMETER_ERROR, "IsMatchType fail, should be function");
            return nullptr;
        }
        if (napi_create_reference(env, args[2], 1, &asyncCallbackInfo->callback[0]) != napi_ok) {
            ThrowErr(env, PARAMETER_ERROR, "napi_create_reference fail");
            return nullptr;
        }
        EmitAsyncCallbackWork(asyncCallbackInfo);
        return nullptr;
    }
    napi_deferred deferred = nullptr;
    napi_value promise = nullptr;
    CHKCP((napi_create_promise(env, &deferred, &promise) == napi_ok), "napi_create_promise fail");
    asyncCallbackInfo->deferred = deferred;
    EmitPromiseWork(asyncCallbackInfo);
    return promise;
}

static napi_value Vibrate(napi_env env, napi_callback_info info)
{
    CHKPP(env);
    CHKPP(info);
    size_t argc = 3;
    napi_value args[3] = {};
    napi_value thisArg = nullptr;
    napi_status status = napi_get_cb_info(env, info, &argc, args, &thisArg, nullptr);
    if ((status != napi_ok) || (argc == 0)) {
        ThrowErr(env, PARAMETER_ERROR, "napi_get_cb_info fail or number of parameter invalid");
        return nullptr;
    }
    if (IsMatchType(env, args[0], napi_number)) {
        return VibrateTime(env, args, argc);
    }
    if (IsMatchType(env, args[0], napi_string)) {
        return VibrateEffectId(env, args, argc);
    }
    if (IsMatchType(env, args[0], napi_object) && argc == 1) {
        return VibrateMode(env, args, argc);
    }
    return VibrateEffect(env, args, argc);
}

static napi_value Stop(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2] = {};
    napi_value thisArg = nullptr;
    napi_status status = napi_get_cb_info(env, info, &argc, args, &thisArg, nullptr);
    if ((status != napi_ok) || (argc == 0)) {
        ThrowErr(env, PARAMETER_ERROR, "napi_get_cb_info fail or number of parameter invalid");
        return nullptr;
    }
    string mode;
    if (!GetStringValue(env, args[0], mode)) {
        ThrowErr(env, PARAMETER_ERROR, "GetStringValue fail");
        return nullptr;
    }
    sptr<AsyncCallbackInfo> asyncCallbackInfo = new (std::nothrow) AsyncCallbackInfo(env);
    CHKPP(asyncCallbackInfo);
    asyncCallbackInfo->error.code = StopVibrator(mode.c_str());
    if ((asyncCallbackInfo->error.code != SUCCESS) && (asyncCallbackInfo->error.code == PARAMETER_ERROR)) {
        ThrowErr(env, PARAMETER_ERROR, "Parameters invalid");
        return nullptr;
    }
    if (argc >= 2) {
        if (!IsMatchType(env, args[1], napi_function)) {
            ThrowErr(env, PARAMETER_ERROR, "IsMatchType fail, should be function");
            return nullptr;
        }
        if (napi_create_reference(env, args[1], 1, &asyncCallbackInfo->callback[0]) != napi_ok) {
            ThrowErr(env, PARAMETER_ERROR, "napi_create_reference fail");
            return nullptr;
        }
        EmitAsyncCallbackWork(asyncCallbackInfo);
        return nullptr;
    }
    napi_deferred deferred = nullptr;
    napi_value promise = nullptr;
    CHKCP((napi_create_promise(env, &deferred, &promise) == napi_ok), "napi_create_promise fail");
    asyncCallbackInfo->deferred = deferred;
    EmitPromiseWork(asyncCallbackInfo);
    return promise;
}

static napi_value EnumClassConstructor(const napi_env env, const napi_callback_info info)
{
    size_t argc = 0;
    napi_value args[1] = {0};
    napi_value res = nullptr;
    void *data = nullptr;
    NAPI_CALL(env, napi_get_cb_info(env, info, &argc, args, &res, &data));
    return res;
}

static napi_value CreateEnumStopMode(const napi_env env, napi_value exports)
{
    napi_value timeMode = nullptr;
    napi_value presetMode = nullptr;
    NAPI_CALL(env, napi_create_string_utf8(env, "time", NAPI_AUTO_LENGTH, &timeMode));
    NAPI_CALL(env, napi_create_string_utf8(env, "preset", NAPI_AUTO_LENGTH, &presetMode));

    napi_property_descriptor desc[] = {
        DECLARE_NAPI_STATIC_PROPERTY("VIBRATOR_STOP_MODE_TIME", timeMode),
        DECLARE_NAPI_STATIC_PROPERTY("VIBRATOR_STOP_MODE_PRESET", presetMode),
    };
    napi_value result = nullptr;
    NAPI_CALL(env, napi_define_class(env, "VibratorStopMode", NAPI_AUTO_LENGTH, EnumClassConstructor, nullptr,
        sizeof(desc) / sizeof(*desc), desc, &result));
    NAPI_CALL(env, napi_set_named_property(env, exports, "VibratorStopMode", result));
    return exports;
}

static napi_value CreateEnumEffectId(const napi_env env, const napi_value exports)
{
    napi_value clockTime = nullptr;
    napi_create_string_utf8(env, "haptic.clock.timer", NAPI_AUTO_LENGTH, &clockTime);
    napi_property_descriptor desc[] = {
        DECLARE_NAPI_STATIC_PROPERTY("EFFECT_CLOCK_TIMER", clockTime),
    };
    napi_value result = nullptr;
    NAPI_CALL(env, napi_define_class(env, "EffectId", NAPI_AUTO_LENGTH, EnumClassConstructor, nullptr,
        sizeof(desc) / sizeof(*desc), desc, &result));
    NAPI_CALL(env, napi_set_named_property(env, exports, "EffectId", result));
    return exports;
}

static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor desc[] = {
        DECLARE_NAPI_FUNCTION("vibrate", Vibrate),
        DECLARE_NAPI_FUNCTION("stop", Stop),
        DECLARE_NAPI_FUNCTION("startVibration", Vibrate),
        DECLARE_NAPI_FUNCTION("stopVibration", Stop),
    };
    NAPI_CALL(env, napi_define_properties(env, exports, sizeof(desc) / sizeof(napi_property_descriptor), desc));
    NAPI_ASSERT_BASE(env, CreateEnumStopMode(env, exports) != nullptr, "Create enum stop mode fail", exports);
    NAPI_ASSERT_BASE(env, CreateEnumEffectId(env, exports) != nullptr, "Create enum effect id fail", exports);
    return exports;
}

static napi_module _module = {
    .nm_version = 1,
    .nm_flags = 0,
    .nm_filename = nullptr,
    .nm_register_func = Init,
    .nm_modname = "vibrator",
    .nm_priv = ((void *)0),
    .reserved = {0}
};

extern "C" __attribute__((constructor)) void RegisterModule(void)
{
    napi_module_register(&_module);
}
}  // namespace Sensors
}  // namespace OHOS
