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

#ifndef OHOS_DEVICE_PROFILE_PROFILE_SYNC_HANDLER_H
#define OHOS_DEVICE_PROFILE_PROFILE_SYNC_HANDLER_H

#include <map>

#include "kvstore_sync_callback.h"
#include "profile_event_handler.h"

namespace OHOS {
namespace DeviceProfile {
using namespace OHOS::DistributedKv;

class ProfileSyncHandler : public std::enable_shared_from_this<ProfileSyncHandler>,
                           public ProfileEventHandler,
                           public DistributedKv::KvStoreSyncCallback {
public:
    explicit ProfileSyncHandler(const std::string& handlerName)
        : ProfileEventHandler(handlerName) {}
    ~ProfileSyncHandler() = default;

    void SyncCompleted(const std::map<std::string, Status>& results) override;

private:
    int32_t Register() override;
    int32_t Unregister() override;

    void NotifySyncCompleted(const SyncResult& syncResults);
};
}  // namespace DeviceProfile
}  // namespace OHOS
#endif  // OHOS_DEVICE_PROFILE_PROFILE_SYNC_HANDLER_H
