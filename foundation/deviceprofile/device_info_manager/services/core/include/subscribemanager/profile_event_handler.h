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

#ifndef OHOS_DEVICE_PROFILE_PROFILE_EVENT_HANDLER_H
#define OHOS_DEVICE_PROFILE_PROFILE_EVENT_HANDLER_H

#include <map>
#include <unordered_set>
#include <list>
#include <atomic>

#include "event_handler.h"
#include "iremote_object.h"

#include "iprofile_event_notifier.h"
#include "profile_event.h"
#include "profile_change_notification.h"
#include "subscribe_info.h"
#include "single_instance.h"

namespace OHOS {
namespace DeviceProfile {
struct FilterInfo {
    bool filtered {false};
    std::unordered_set<uint32_t> indexes;
};

class ProfileEventHandler {
    friend class SubscriberDeathRecipient;
public:
    explicit ProfileEventHandler(const std::string& handlerName)
        : handlerName_(handlerName) {}
    virtual ~ProfileEventHandler() = default;

    bool Init();
    bool IsRegistered() const;

    virtual int32_t Subscribe(const SubscribeInfo& subscribeInfo,
        const sptr<IRemoteObject>& profileEventNotifier);
    int32_t Unsubscribe(const sptr<IRemoteObject>& profileEventNotifier);
    void OnSubscriberDied(const sptr<IRemoteObject>& profileEventNotifier);

protected:
    std::atomic<bool> isRegistered_ {false};
    std::mutex notifierLock_;
    std::map<sptr<IRemoteObject>, SubscribeInfo> profileEventSubscribeInfos_;
    std::string handlerName_;
    std::shared_ptr<AppExecFwk::EventHandler> eventHandler_;

private:
    virtual int32_t Register() = 0;
    virtual int32_t Unregister() = 0;
};
}  // namespace DeviceProfile
}  // namespace OHOS

#endif  // OHOS_DEVICE_PROFILE_I_PROFILE_EVENT_H
