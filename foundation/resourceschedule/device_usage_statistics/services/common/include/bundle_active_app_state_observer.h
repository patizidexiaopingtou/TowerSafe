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

#ifndef BUNDLE_ACTIVE_APP_STATE_OBSERVER_H
#define BUNDLE_ACTIVE_APP_STATE_OBSERVER_H

#include <memory>
#ifdef OS_ACCOUNT_PART_ENABLED
#include "os_account_manager.h"
#endif // OS_ACCOUNT_PART_ENABLED
#include "application_state_observer_stub.h"
#include "bundle_active_report_handler.h"

namespace OHOS {
namespace DeviceUsageStats {
using OHOS::AppExecFwk::ApplicationStateObserverStub;
using OHOS::AppExecFwk::AppStateData;
using OHOS::AppExecFwk::AbilityStateData;
using OHOS::AppExecFwk::ProcessData;

class BundleActiveAppStateObserver : public ApplicationStateObserverStub {
public:
    void OnAbilityStateChanged(const AbilityStateData &abilityStateData) override;
    void Init(const std::shared_ptr<BundleActiveReportHandler>& reportHandler);
private:
    inline bool ValidateAppStateData(const AppStateData &appStateData) const
    {
        return appStateData.uid > 0
            && appStateData.bundleName.size() > 0;
    }

    inline bool ValidateAbilityStateData(const AbilityStateData &abilityStateData) const
    {
        return abilityStateData.uid > 0 && abilityStateData.pid >= 0
            && abilityStateData.bundleName.size() > 0
            && abilityStateData.abilityName.size() > 0
            && abilityStateData.token != nullptr;
    }

    inline bool ValidateProcessData(const ProcessData &processData) const
    {
        return processData.uid > 0 && processData.pid >= 0
            && processData.bundleName.size() > 0;
    }
    std::shared_ptr<BundleActiveReportHandler> reportHandler_;
};
}  // namespace DeviceUsageStats
}  // namespace OHOS
#endif  // BUNDLE_ACTIVE_APP_STATE_OBSERVER_H

