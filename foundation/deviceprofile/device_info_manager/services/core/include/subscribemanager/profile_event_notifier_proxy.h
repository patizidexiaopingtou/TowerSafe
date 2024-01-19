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

#ifndef OHOS_DEVICE_PROFILE_I_PROFILE_SYNC_CALLBACK_PROXY_H
#define OHOS_DEVICE_PROFILE_I_PROFILE_SYNC_CALLBACK_PROXY_H

#include "iprofile_event_notifier.h"
#include "iremote_proxy.h"

namespace OHOS {
namespace DeviceProfile {
class ProfileEventNotifierProxy : public IRemoteProxy<IProfileEventNotifier> {
public:
    explicit ProfileEventNotifierProxy(const sptr<IRemoteObject>& impl);
    ~ProfileEventNotifierProxy() = default;

    void OnSyncCompleted(const SyncResult& syncResults) override;
    void OnProfileChanged(const ProfileChangeNotification& changeNotification) override;

private:
    static inline BrokerDelegator<ProfileEventNotifierProxy> delegator_;
};
}  // namespace DeviceProfile
}  // namespace OHOS

#endif  // OHOS_DEVICE_PROFILE_I_PROFILE_SYNC_CALLBACK_PROXY_H
