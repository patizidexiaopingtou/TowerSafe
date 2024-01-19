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

#ifndef SENSOR_HDI_CONNECTION_H
#define SENSOR_HDI_CONNECTION_H

#include "i_sensor_hdi_connection.h"
#include "singleton.h"

namespace OHOS {
namespace Sensors {
class SensorHdiConnection : public ISensorHdiConnection, public Singleton<SensorHdiConnection> {
public:
    SensorHdiConnection() = default;
    virtual ~SensorHdiConnection() {}
    int32_t ConnectHdi() override;
    int32_t GetSensorList(std::vector<Sensor>& sensorList) override;
    int32_t EnableSensor(int32_t sensorId) override;
    int32_t DisableSensor(int32_t sensorId)  override;
    int32_t SetBatch(int32_t sensorId, int64_t samplingInterval, int64_t reportInterval) override;
    int32_t SetMode(int32_t sensorId, int32_t mode) override;
    int32_t RegisteDataReport(ReportDataCb cb, sptr<ReportDataCallback> reportDataCallback) override;
    int32_t DestroyHdiConnection() override;

private:
    DISALLOW_COPY_AND_MOVE(SensorHdiConnection);
    std::unique_ptr<ISensorHdiConnection> iSensorHdiConnection_;
    std::vector<Sensor> sensorList_;
    int32_t ConnectHdiService();
};
}  // namespace Sensors
}  // namespace OHOS
#endif  // SENSOR_HDI_CONNECTION_H