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

#ifndef VIBRATOR_HDI_CONNECTION_H
#define VIBRATOR_HDI_CONNECTION_H

#include "i_vibrator_hdi_connection.h"
#include "singleton.h"

namespace OHOS {
namespace Sensors {
class VibratorHdiConnection : public IVibratorHdiConnection, public Singleton<VibratorHdiConnection> {
public:
    VibratorHdiConnection() = default;

    virtual ~VibratorHdiConnection() {}

    int32_t ConnectHdi() override;

    int32_t StartOnce(uint32_t duration) override;

    int32_t Start(const std::string &effectType) override;

    int32_t Stop(VibratorStopMode mode) override;

    int32_t DestroyHdiConnection() override;

private:
    DISALLOW_COPY_AND_MOVE(VibratorHdiConnection);
    std::unique_ptr<IVibratorHdiConnection> iVibratorHdiConnection_;
};
}  // namespace Sensors
}  // namespace OHOS
#endif  // VIBRATOR_HDI_CONNECTION_H