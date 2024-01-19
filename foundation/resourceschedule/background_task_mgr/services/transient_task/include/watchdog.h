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

#ifndef FOUNDATION_RESOURCESCHEDULE_BACKGROUND_TASK_MGR_SERVICES_TRANSIENT_TASK_INCLUDE_WATCHDOG_H
#define FOUNDATION_RESOURCESCHEDULE_BACKGROUND_TASK_MGR_SERVICES_TRANSIENT_TASK_INCLUDE_WATCHDOG_H

#include <event_handler.h>
#include <event_runner.h>
#include <refbase.h>

#include "appmgr/app_mgr_client.h"

#include "decision_maker.h"
#include "key_info.h"

namespace OHOS {
namespace BackgroundTaskMgr {
class BackgroundTaskMgrService;

class Watchdog : public AppExecFwk::EventHandler {
public:
    Watchdog(const wptr<BackgroundTaskMgrService>& service, const std::shared_ptr<DecisionMaker>& decision);
    ~Watchdog() override = default;
    bool AddWatchdog(int32_t requestId, const std::shared_ptr<KeyInfo>& info, int32_t interval);
    void RemoveWatchdog(int32_t requestId);
    void ProcessEvent(const AppExecFwk::InnerEvent::Pointer& event) override;

private:
    bool KillApplicationByUid(const std::string &bundleName, const int32_t uid);

    wptr<BackgroundTaskMgrService> service_;
    std::unique_ptr<AppExecFwk::AppMgrClient> appMgrClient_;
    std::shared_ptr<DecisionMaker> decision_ {nullptr};
};
}  // namespace BackgroundTaskMgr
}  // namespace OHOS
#endif  // FOUNDATION_RESOURCESCHEDULE_BACKGROUND_TASK_MGR_SERVICES_TRANSIENT_TASK_INCLUDE_WATCHDOG_H