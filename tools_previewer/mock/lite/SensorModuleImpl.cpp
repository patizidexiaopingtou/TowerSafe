/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

#include "sensor_impl.h"

#include "SharedData.h"

using namespace OHOS::ACELite;

uint32_t SensorImpl::GetBarometer(void)
{
    return SharedData<uint32_t>::GetData(SharedDataType::PRESSURE_VALUE);
}

uint32_t SensorImpl::GetSteps()
{
    return SharedData<uint32_t>::GetData(SharedDataType::SUMSTEP_VALUE);
}

uint32_t SensorImpl::GetHeartRate()
{
    return SharedData<uint8_t>::GetData(SharedDataType::HEARTBEAT_VALUE);
}

bool SensorImpl::GetOnBodyState()
{
    return SharedData<bool>::GetData(SharedDataType::WEARING_STATE);
}
