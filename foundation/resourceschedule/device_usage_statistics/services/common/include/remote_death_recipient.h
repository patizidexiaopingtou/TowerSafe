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

#ifndef REMOTE_DEATH_RECIPIENT_H
#define REMOTE_DEATH_RECIPIENT_H

#include <functional>

#include "iremote_object.h"

namespace OHOS {
namespace DeviceUsageStats {
class RemoteDeathRecipient : public IRemoteObject::DeathRecipient {
public:
    explicit RemoteDeathRecipient(std::function<void(const wptr<IRemoteObject> &)> callback)
    {
        callback_ = callback;
    }

    ~RemoteDeathRecipient()
    {
        callback_ = nullptr;
    }

    void OnRemoteDied(const wptr<IRemoteObject> &object)
    {
        if (callback_ != nullptr) {
            callback_(object);
        }
    }

private:
    std::function<void(const wptr<IRemoteObject> &)> callback_;
};
}  // namespace DeviceUsageStats
}  // namespace OHOS
#endif  // REMOTE_DEATH_RECIPIENT_H