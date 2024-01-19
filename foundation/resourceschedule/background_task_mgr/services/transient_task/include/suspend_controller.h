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

#ifndef FOUNDATION_RESOURCESCHEDULE_BACKGROUND_TASK_MGR_SERVICES_TRANSIENT_TASK_INCLUDE_SUSPEND_CONTROLLER_H
#define FOUNDATION_RESOURCESCHEDULE_BACKGROUND_TASK_MGR_SERVICES_TRANSIENT_TASK_INCLUDE_SUSPEND_CONTROLLER_H

#include <map>
#include <string>

#include "key_info.h"

namespace OHOS {
namespace BackgroundTaskMgr {
class SuspendController {
public:
    void RequestSuspendDelay(const std::shared_ptr<KeyInfo>& key);
    void CancelSuspendDelay(const std::shared_ptr<KeyInfo>& key);

private:
    std::map<std::shared_ptr<KeyInfo>, uint32_t, KeyInfoComp> delaySuspendApps_;
};
}  // namespace BackgroundTaskMgr
}  // namespace OHOS
#endif  // FOUNDATION_RESOURCESCHEDULE_BACKGROUND_TASK_MGR_SERVICES_TRANSIENT_TASK_INCLUDE_SUSPEND_CONTROLLER_H