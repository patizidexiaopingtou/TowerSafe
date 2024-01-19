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
#include "light_agent.h"

#include "light_client.h"
#include "sensors_errors.h"

namespace OHOS {
namespace Sensors {
using OHOS::HiviewDFX::HiLog;
using OHOS::HiviewDFX::HiLogLabel;

namespace {
constexpr HiLogLabel LABEL = { LOG_CORE, MISC_LOG_DOMAIN, "LightNDK" };
}  // namespace

int32_t GetLightList(LightInfo **lightInfo, int32_t &count)
{
    CHKPR(lightInfo, ERROR);
    auto &client = LightClient::GetInstance();
    int32_t ret = client.GetLightList(lightInfo, count);
    if (ret != ERR_OK) {
        MISC_HILOGE("GetLightList failed");
        return ERROR;
    }
    return SUCCESS;
}

int32_t TurnOn(int32_t lightId, const LightColor &color, const LightAnimation &animation)
{
    if (lightId < 0) {
        MISC_HILOGE("lightId is invalid");
        return ERROR;
    }
    auto &client = LightClient::GetInstance();
    int32_t ret = client.TurnOn(lightId, color, animation);
    if (ret != ERR_OK) {
        MISC_HILOGE("TurnOn failed, lightId:%{public}d,ret:%{public}d ", lightId, ret);
        return ERROR;
    }
    return SUCCESS;
}

int32_t TurnOff(int32_t lightId)
{
    if (lightId < 0) {
        MISC_HILOGE("lightId is error");
        return ERROR;
    }
    auto &client = LightClient::GetInstance();
    int32_t ret = client.TurnOff(lightId);
    if (ret != ERR_OK) {
        MISC_HILOGE("TurnOff failed, lightId:%{public}d,ret:%{public}d", lightId, ret);
        return ERROR;
    }
    return SUCCESS;
}
}  // namespace Sensors
}  // namespace OHOS
