/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

#include "iservice_registry.h"

#include "ipc_skeleton.h"

namespace OHOS {
SystemAbilityManagerClient& SystemAbilityManagerClient::GetInstance()
{
    static auto instance = new SystemAbilityManagerClient();
    return *instance;
}

sptr<ISystemAbilityManager> SystemAbilityManagerClient::GetSystemAbilityManager()
{
    std::lock_guard<std::mutex> lock(systemAbilityManagerLock_);
    if (action_ == "set_null") {
        return nullptr;
    }
    if (systemAbilityManager_ != nullptr) {
        return systemAbilityManager_;
    }
    sptr<IRemoteObject> registryObject = IPCSkeleton::GetContextObject();
    systemAbilityManager_ = iface_cast<ISystemAbilityManager>(registryObject);
    return systemAbilityManager_;
}

sptr<IRemoteObject> SystemAbilityManagerClient::GetRegistryRemoteObject()
{
    return nullptr;
}
}  // namespace OHOS
