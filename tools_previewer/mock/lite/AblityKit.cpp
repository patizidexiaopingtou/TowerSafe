/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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


#include "ability_kit.h"

#include "CommandParser.h"
#include "PreviewerEngineLog.h"
#include "VirtualMessageImpl.h"

int32_t OHOS::AbilityKit::RegisterReceiver(const char* bundleName, SuccessCallback success, FailCallback fail,
                                           uint32_t successCallbackFunc, uint32_t failCallbackFunc, uint32_t context)
{
    (void)successCallbackFunc;
    (void)failCallbackFunc;
    (void)context;
    VirtualMessageImpl::GetInstance().RegistBundle(bundleName, success, fail);
    return 0;
}

int32_t OHOS::AbilityKit::UnregisterReceiver(const char* bundleName)
{
    VirtualMessageImpl::GetInstance().UnregistBundle(bundleName);
    return 0;
}

int32_t OHOS::AbilityKit::SendMsgToPeerApp(bool isLocalMsg, const char* callingPkgName, const char* calledPkgName,
                                           const uint8_t* msgBody, uint32_t length, uint32_t successCallbackFunc,
                                           uint32_t failCallbackFunc, uint32_t context)
{
    (void)isLocalMsg;
    (void)length;
    (void)successCallbackFunc;
    (void)failCallbackFunc;
    (void)context;
    ILOG("Message from %s to %s : %s", callingPkgName, calledPkgName,
         reinterpret_cast<const char*>(msgBody));
    return 0;
}

int32_t OHOS::AbilityKit::DetectPhoneApp(const char* callingPkgName, const char* calledPkgName,
                                         uint32_t successCallbackFunc, uint32_t failCallbackFunc, uint32_t context)
{
    (void)callingPkgName;
    (void)calledPkgName;
    (void)successCallbackFunc;
    (void)failCallbackFunc;
    (void)context;
    return 0;
}

int32_t OHOS::AbilityKit::DetectResourceRelease()
{
    return 0;
}

int32_t OHOS::AbilityKit::SendMsgResourceRelease()
{
    return 0;
}
