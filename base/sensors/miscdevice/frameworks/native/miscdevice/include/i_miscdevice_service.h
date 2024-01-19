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

#ifndef I_MISCDEVICE_SERVICE_H
#define I_MISCDEVICE_SERVICE_H

#include <string>
#include <vector>

#include "iremote_broker.h"
#include "light_agent_type.h"
#include "miscdevice_common.h"

namespace OHOS {
namespace Sensors {
class IMiscdeviceService : public IRemoteBroker {
public:
    IMiscdeviceService() = default;
    virtual ~IMiscdeviceService() = default;
    DECLARE_INTERFACE_DESCRIPTOR(u"IMiscdeviceService");
    virtual int32_t Vibrate(int32_t vibratorId, int32_t timeOut, int32_t usage) = 0;
    virtual int32_t CancelVibrator(int32_t vibratorId) = 0;
    virtual int32_t PlayVibratorEffect(int32_t vibratorId, const std::string &effect,
                                       int32_t loopCount, int32_t usage) = 0;
    virtual int32_t StopVibratorEffect(int32_t vibratorId, const std::string &effect) = 0;
    virtual std::vector<LightInfo> GetLightList() = 0;
    virtual int32_t TurnOn(int32_t lightId, const LightColor &color, const LightAnimation &animation) = 0;
    virtual int32_t TurnOff(int32_t lightId) = 0;

    enum {
        VIBRATE,
        CANCEL_VIBRATOR,
        PLAY_VIBRATOR_EFFECT,
        STOP_VIBRATOR_EFFECT,
        GET_LIGHT_LIST,
        TURN_ON,
        TURN_OFF,
    };
};
}  // namespace Sensors
}  // namespace OHOS
#endif  // I_MISCDEVICE_SERVICE_H
