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

#ifndef FOUNDATION_RESOURCESCHEDULE_BACKGROUND_TASK_MGR_SERVICES_CORE_INCLUDE_BACKGROUND_TASK_MGR_SERVICE_H
#define FOUNDATION_RESOURCESCHEDULE_BACKGROUND_TASK_MGR_SERVICES_CORE_INCLUDE_BACKGROUND_TASK_MGR_SERVICE_H

#include <ctime>
#include <list>
#include <memory>
#include <mutex>

#include "event_handler.h"
#include "event_runner.h"
#include "refbase.h"
#include "singleton.h"
#include "system_ability.h"
#include "system_ability_definition.h"

#include "background_task_mgr_stub.h"
#include "bg_continuous_task_mgr.h"
#include "bg_transient_task_mgr.h"
#include "bgtaskmgr_inner_errors.h"
#include "bg_efficiency_resources_mgr.h"

namespace OHOS {
namespace BackgroundTaskMgr {
enum class ServiceRunningState {
    STATE_NOT_START,
    STATE_RUNNING
};

class BackgroundTaskMgrService final : public SystemAbility, public BackgroundTaskMgrStub,
    public std::enable_shared_from_this<BackgroundTaskMgrService> {
    DISALLOW_COPY_AND_MOVE(BackgroundTaskMgrService);
    DECLARE_SYSTEM_ABILITY(BackgroundTaskMgrService);
    DECLARE_DELAYED_SINGLETON(BackgroundTaskMgrService);
public:
    BackgroundTaskMgrService(const int32_t systemAbilityId, bool runOnCreate);
    void OnStart() final;
    void OnStop() final;

    ErrCode RequestSuspendDelay(const std::u16string& reason,
        const sptr<IExpiredCallback>& callback, std::shared_ptr<DelaySuspendInfo> &delayInfo) override;
    ErrCode CancelSuspendDelay(int32_t requestId) override;
    ErrCode GetRemainingDelayTime(int32_t requestId, int32_t &delayTime) override;
    ErrCode StartBackgroundRunning(const sptr<ContinuousTaskParam> &taskParam) override;
    ErrCode StopBackgroundRunning(const std::string &abilityName, const sptr<IRemoteObject> &abilityToken) override;
    ErrCode SubscribeBackgroundTask(const sptr<IBackgroundTaskSubscriber>& subscriber) override;
    ErrCode UnsubscribeBackgroundTask(const sptr<IBackgroundTaskSubscriber>& subscriber) override;
    ErrCode GetTransientTaskApps(std::vector<std::shared_ptr<TransientTaskAppInfo>> &list) override;
    ErrCode GetContinuousTaskApps(std::vector<std::shared_ptr<ContinuousTaskCallbackInfo>> &list) override;
    ErrCode ApplyEfficiencyResources(const sptr<EfficiencyResourceInfo> &resourceInfo) override;
    ErrCode ResetAllEfficiencyResources() override;
    ErrCode GetEfficiencyResourcesInfos(std::vector<std::shared_ptr<ResourceCallbackInfo>> &appList,
        std::vector<std::shared_ptr<ResourceCallbackInfo>> &procList) override;
    ErrCode StopContinuousTask(int32_t uid, int32_t pid, uint32_t taskType) override;
    int32_t Dump(int32_t fd, const std::vector<std::u16string> &args) override;

    void ForceCancelSuspendDelay(int32_t requestId);
    void HandleRequestExpired(const int32_t requestId);
    void HandleExpiredCallbackDeath(const wptr<IRemoteObject>& remote);
    void HandleSubscriberDeath(const wptr<IRemoteObject>& remote);
    
private:
    void Init();
    void DumpUsage(std::string &result);
    bool CheckCallingToken();
    void OnAddSystemAbility(int32_t systemAbilityId, const std::string& deviceId) override;
    void OnRemoveSystemAbility(int32_t systemAbilityId, const std::string& deviceId) override;

private:
    ServiceRunningState state_ {ServiceRunningState::STATE_NOT_START};
};
}  // namespace BackgroundTaskMgr
}  // namespace OHOS
#endif  // FOUNDATION_RESOURCESCHEDULE_BACKGROUND_TASK_MGR_SERVICES_CORE_INCLUDE_BACKGROUND_TASK_MGR_SERVICE_H