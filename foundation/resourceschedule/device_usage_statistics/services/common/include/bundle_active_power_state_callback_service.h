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

#ifndef BUNDLE_ACTIVE_POWER_STATE_CALLBACK_SERVICE_H
#define BUNDLE_ACTIVE_POWER_STATE_CALLBACK_SERVICE_H

#include "bundle_active_power_state_callback_stub.h"
#include "bundle_active_core.h"

namespace OHOS {
namespace DeviceUsageStats {
using OHOS::PowerMgr::PowerState;
class BundleActivePowerStateCallbackService : public BundleActivePowerStateCallbackStub {
public:
    BundleActivePowerStateCallbackService(std::shared_ptr<BundleActiveCore> bundleActiveCore);
    virtual ~BundleActivePowerStateCallbackService() {}
    void OnPowerStateChanged(PowerState state) override;
private:
    std::shared_ptr<BundleActiveCore> bundleActiveCore_;
};
}  // namespace DeviceUsageStats
}  // namespace OHOS
#endif  // BUNDLE_ACTIVE_POWER_STATE_CALLBACK_SERVICE_H

