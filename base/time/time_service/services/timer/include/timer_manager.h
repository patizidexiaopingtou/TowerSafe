/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
#ifndef TIMER_MANAGER_H
#define TIMER_MANAGER_H

#include <cinttypes>
#include <mutex>
#include <vector>
#include <map>
#include <random>
#include <thread>
#include <atomic>
#include <chrono>
#include <functional>
#include "batch.h"
#include "timer_handler.h"
#include "want_agent_helper.h"

namespace OHOS {
namespace MiscServices {
class TimerManager : public ITimerManager {
public:
    static std::shared_ptr<TimerManager> Create();
    int32_t CreateTimer(TimerPara &paras,
                        std::function<void (const uint64_t)> callback,
                        std::shared_ptr<OHOS::AbilityRuntime::WantAgent::WantAgent> wantAgent,
                        int uid,
                        uint64_t &timerId) override;
    int32_t StartTimer(uint64_t timerId, uint64_t triggerTime) override;
    int32_t StopTimer(uint64_t timerId) override;
    int32_t DestroyTimer(uint64_t timerId) override;
    bool ProxyTimer(int32_t uid, bool isProxy, bool needRetrigger) override;
    bool ResetAllProxy() override;
    bool ShowtimerEntryMap(int fd);
    bool ShowTimerEntryById(int fd, uint64_t timerId);
    bool ShowTimerTriggerById(int fd, uint64_t timerId);
    ~TimerManager() override;

private:
    explicit TimerManager(std::shared_ptr<TimerHandler> impl);
    void TimerLooper();

    void SetHandler(uint64_t id,
        int type,
        uint64_t triggerAtTime,
        uint64_t windowLength,
        uint64_t interval,
        int flag,
        std::function<void (const uint64_t)> callback,
        std::shared_ptr<OHOS::AbilityRuntime::WantAgent::WantAgent> wantAgent,
        int uid);
    void SetHandlerLocked(uint64_t id,
        int type,
        std::chrono::milliseconds when,
        std::chrono::steady_clock::time_point whenElapsed,
        std::chrono::milliseconds windowLength,
        std::chrono::steady_clock::time_point maxWhen,
        std::chrono::milliseconds interval,
        std::function<void (const uint64_t)> callback,
        std::shared_ptr<OHOS::AbilityRuntime::WantAgent::WantAgent> wantAgent,
        uint32_t flags,
        bool doValidate,
        uint64_t callingUid);
    void RemoveHandler(uint64_t id);
    void RemoveLocked(uint64_t id);
    void ReBatchAllTimers();
    void ReBatchAllTimersLocked(bool doValidate);
    void ReAddTimerLocked(std::shared_ptr<TimerInfo> timer,
        std::chrono::steady_clock::time_point nowElapsed,
        bool doValidate);
    void SetHandlerLocked(std::shared_ptr<TimerInfo> alarm, bool rebatching, bool doValidate);
    void InsertAndBatchTimerLocked(std::shared_ptr<TimerInfo> alarm);
    int64_t AttemptCoalesceLocked(std::chrono::steady_clock::time_point whenElapsed,
        std::chrono::steady_clock::time_point maxWhen);
    bool TriggerTimersLocked(std::vector<std::shared_ptr<TimerInfo>> &triggerList,
        std::chrono::steady_clock::time_point nowElapsed);
    void RescheduleKernelTimerLocked();
    void DeliverTimersLocked(const std::vector<std::shared_ptr<TimerInfo>> &triggerList,
        std::chrono::steady_clock::time_point nowElapsed);
    std::shared_ptr<Batch> FindFirstWakeupBatchLocked();
    void SetLocked(int type, std::chrono::nanoseconds when);
    std::chrono::steady_clock::time_point ConvertToElapsed(std::chrono::milliseconds when, int type);
    std::chrono::steady_clock::time_point GetBootTimeNs();
    void CallbackAlarmIfNeed(std::shared_ptr<TimerInfo> alarm);
    bool StopTimerInner(uint64_t timerNumber, bool needDestroy);
    void RemoveProxy(uint64_t timerNumber, int32_t uid);
    void NotifyWantAgent(std::shared_ptr<OHOS::AbilityRuntime::WantAgent::WantAgent> wantAgent);

    std::map<uint64_t, std::shared_ptr<TimerEntry>> timerEntryMap_;
    std::default_random_engine random_;
    std::atomic_bool runFlag_;
    std::shared_ptr<TimerHandler> handler_;
    std::unique_ptr<std::thread> alarmThread_;
    std::vector<std::shared_ptr<Batch>> alarmBatches_;
    std::mutex mutex_;
    std::mutex entryMapMutex_;
    std::mutex showTimerMutex_;
    std::chrono::system_clock::time_point lastTimeChangeClockTime_;
    std::chrono::steady_clock::time_point lastTimeChangeRealtime_;

    // proxy uid
    std::mutex proxyMutex_;
    std::set<int32_t> proxyUids_;
    std::map<int32_t, std::vector<std::shared_ptr<TimerInfo>>> proxyMap_;
}; // timer_manager
} // MiscServices
} // OHOS

#endif