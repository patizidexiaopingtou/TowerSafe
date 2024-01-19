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

#ifndef VIBRATOR_SERVICE_CLIENT_H
#define VIBRATOR_SERVICE_CLIENT_H

#include <mutex>
#include "iremote_object.h"
#include "miscdevice_service_proxy.h"
#include "singleton.h"

namespace OHOS {
namespace Sensors {
class VibratorServiceClient : public Singleton<VibratorServiceClient> {
public:
    int32_t Vibrate(int32_t vibratorId, int32_t timeOut, int32_t usage);
    int32_t Vibrate(int32_t vibratorId, const std::string &effect, int32_t loopCount, int32_t usage);
    int32_t Stop(int32_t vibratorId, const std::string &type);
    void ProcessDeathObserver(const wptr<IRemoteObject> &object);

private:
    int32_t InitServiceClient();
    sptr<IRemoteObject::DeathRecipient> serviceDeathObserver_ = nullptr;
    sptr<IMiscdeviceService> miscdeviceProxy_ = nullptr;
    std::mutex clientMutex_;
};
}  // namespace Sensors
}  // namespace OHOS
#endif  // VIBRATOR_SERVICE_CLIENT_H
