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

#ifndef OHOS_DISTRIBUTED_DEVICE_PROFILE_TRUST_GROUP_MANAGER_H
#define OHOS_DISTRIBUTED_DEVICE_PROFILE_TRUST_GROUP_MANAGER_H

#include <string>

#include "device_auth.h"
#include "device_auth_defines.h"
#include "nlohmann/json.hpp"
#include "event_handler.h"
#include "single_instance.h"

namespace OHOS {
namespace DeviceProfile {
struct GroupInfo {
    std::string groupName;
    std::string groupId;
    std::string groupOwner;
    int32_t groupType;
    int32_t groupVisibility;

    GroupInfo() : groupName(""), groupId(""), groupOwner(""), groupType(0), groupVisibility(0) {}
};

void from_json(const nlohmann::json& jsonObject, GroupInfo& groupInfo);

class TrustGroupManager {
    DECLARE_SINGLE_INSTANCE(TrustGroupManager);

public:
    bool CheckTrustGroup(const std::string& deviceId);
    bool InitHichainService();
private:
    static void OnDeviceUnBoundAdapter(const char* peerUdid, const char* groupInfo);
    static bool CheckDeviceId(const std::string udid);
    static std::string GetDeviceUdid();
    void InitDataChangeListener();
    bool CheckGroupsInfo(const char* returnGroups, uint32_t groupNum);

private:
    const DeviceGroupManager* hichainGmInstance_ = nullptr;
    DataChangeListener dataChangeListener_;
};
}  // namespace DeviceProfile
}  // namespace OHOS
#endif  // OHOS_DISTRIBUTED_DEVICE_PROFILE_TRUST_GROUP_MANAGER_H
