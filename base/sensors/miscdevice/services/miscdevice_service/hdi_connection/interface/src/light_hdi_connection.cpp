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
#include "light_hdi_connection.h"

#include <list>

#include "compatible_light_connection.h"
#include "hdi_light_connection.h"
#include "hitrace_meter.h"
#include "sensors_errors.h"

namespace OHOS {
namespace Sensors {
using namespace OHOS::HiviewDFX;

namespace {
constexpr HiLogLabel LABEL = { LOG_CORE, MISC_LOG_DOMAIN, "LightHdiConnection" };
}

int32_t LightHdiConnection::ConnectHdi()
{
    iLightHdiConnection_ = std::make_unique<HdiLightConnection>();
    int32_t ret = iLightHdiConnection_->ConnectHdi();
    if (ret != 0) {
        MISC_HILOGE("hdi direct failed");
        iLightHdiConnection_ = std::make_unique<CompatibleLightConnection>();
        CHKPR(iLightHdiConnection_, ERROR);
        ret = iLightHdiConnection_->ConnectHdi();
    }
    if (ret != 0) {
        MISC_HILOGE("hdi connection failed");
        return LIGHT_HDF_CONNECT_ERR;
    }
    ret = iLightHdiConnection_->GetLightList(lightInfoList_);
    if (ret != 0) {
        MISC_HILOGE("GetLightList failed");
        return LIGHT_ERR;
    }
    return ERR_OK;
}

int32_t LightHdiConnection::GetLightList(std::vector<LightInfo>& lightList) const
{
    lightList.assign(lightInfoList_.begin(), lightInfoList_.end());
    return ERR_OK;
}

int32_t LightHdiConnection::TurnOn(int32_t lightId, const LightColor &color, const LightAnimation &animation)
{
    CHKPR(iLightHdiConnection_, ERROR);
    int32_t ret = iLightHdiConnection_->TurnOn(lightId, color, animation);
    if (ret != 0) {
        MISC_HILOGE("TurnOn failed");
        return LIGHT_ID_NOT_SUPPORT;
    }
    return ERR_OK;
}

int32_t LightHdiConnection::TurnOff(int32_t lightId)
{
    CHKPR(iLightHdiConnection_, ERROR);
    int32_t ret = iLightHdiConnection_->TurnOff(lightId);
    if (ret != 0) {
        MISC_HILOGE("TurnOff failed");
        return LIGHT_ERR;
    }
    return ERR_OK;
}

int32_t LightHdiConnection::DestroyHdiConnection()
{
    CHKPR(iLightHdiConnection_, ERROR);
    int32_t ret = iLightHdiConnection_->DestroyHdiConnection();
    if (ret != 0) {
        MISC_HILOGE("DestroyHdiConnection failed");
        return LIGHT_HDF_CONNECT_ERR;
    }
    return ERR_OK;
}
}  // namespace Sensors
}  // namespace OHOS
