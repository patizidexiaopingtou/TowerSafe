/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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

#include "timer_manager.h"
#include <utility>
#include <vector>
#include <algorithm>
#include <ctime>
#include <iostream>
#include <sys/time.h>
#include "if_system_ability_manager.h"
#include "system_ability_definition.h"
#include "iservice_registry.h"

namespace OHOS {
namespace MiscServices {
using namespace std::chrono;
using namespace OHOS::AppExecFwk;
namespace {
static int TIME_CHANGED_BITS = 16;
static uint32_t TIME_CHANGED_MASK = 1 << TIME_CHANGED_BITS;
const int ONE_THOUSAND = 1000;
const float_t BATCH_WINDOW_COE = 0.75;
const auto ZERO_FUTURITY = seconds(0);
const auto MIN_INTERVAL_ONE_SECONDS = seconds(1);
const auto MAX_INTERVAL = hours(24 * 365);
const auto INTERVAL_HOUR = hours(1);
const auto INTERVAL_HALF_DAY = hours(12);
const auto MIN_FUZZABLE_INTERVAL = milliseconds(10000);
const int NANO_TO_SECOND =  1000000000;
const int WANTAGENT_CODE_ELEVEN = 11;
}

extern bool AddBatchLocked(std::vector<std::shared_ptr<Batch>> &list, const std::shared_ptr<Batch> &batch);
extern steady_clock::time_point MaxTriggerTime(steady_clock::time_point now,
                                               steady_clock::time_point triggerAtTime,
                                               milliseconds interval);

std::shared_ptr<TimerManager> TimerManager::Create()
{
    auto impl = TimerHandler::Create();
    if (impl == nullptr) {
        TIME_HILOGE(TIME_MODULE_SERVICE, "Create Timer handle failed.");
        return nullptr;
    }
    return std::shared_ptr<TimerManager>(new TimerManager(impl));
}

TimerManager::TimerManager(std::shared_ptr<TimerHandler> impl)
    : random_ {static_cast<uint64_t>(time(nullptr))},
      runFlag_ {false},
      handler_ {std::move(impl)},
      lastTimeChangeClockTime_ {system_clock::time_point::min()},
      lastTimeChangeRealtime_ {steady_clock::time_point::min()}
{
    runFlag_ = true;
    alarmThread_.reset(new std::thread(&TimerManager::TimerLooper, this));
}

int32_t TimerManager::CreateTimer(TimerPara &paras,
                                  std::function<void (const uint64_t)> callback,
                                  std::shared_ptr<OHOS::AbilityRuntime::WantAgent::WantAgent> wantAgent,
                                  int uid,
                                  uint64_t &timerId)
{
    TIME_HILOGI(TIME_MODULE_SERVICE,
                "Create timer: %{public}d windowLength:%{public}" PRId64 "interval:%{public}" PRId64 "flag:%{public}d",
        paras.timerType,
        paras.windowLength,
        paras.interval,
        paras.flag);
    while (timerId == 0) {
        timerId = random_();
    }
    auto timerInfo = std::make_shared<TimerEntry>(TimerEntry {
        timerId,
        paras.timerType,
        static_cast<uint64_t>(paras.windowLength),
        paras.interval,
        paras.flag,
        std::move(callback),
        wantAgent,
        uid
    });
    std::lock_guard<std::mutex> lock(entryMapMutex_);
    timerEntryMap_.insert(std::make_pair(timerId, timerInfo));
    return E_TIME_OK;
}

int32_t TimerManager::StartTimer(uint64_t timerId, uint64_t triggerTime)
{
    std::lock_guard<std::mutex> lock(entryMapMutex_);
    auto it = timerEntryMap_.find(timerId);
    if (it == timerEntryMap_.end()) {
        TIME_HILOGE(TIME_MODULE_SERVICE, "Timer id not found: %{public}" PRId64 "", timerId);
        return E_TIME_NOT_FOUND;
    }
    TIME_HILOGI(TIME_MODULE_SERVICE, "Start timer : %{public}" PRId64 "", timerId);
    TIME_HILOGI(TIME_MODULE_SERVICE, "TriggerTime : %{public}" PRId64 "", triggerTime);
    auto timerInfo = it->second;
    SetHandler(timerInfo->id,
               timerInfo->type,
               triggerTime,
               timerInfo->windowLength,
               timerInfo->interval,
               timerInfo->flag,
               timerInfo->callback,
               timerInfo->wantAgent,
               timerInfo->uid);
    return E_TIME_OK;
}

int32_t TimerManager::StopTimer(uint64_t timerId)
{
    return StopTimerInner(timerId, false) ? E_TIME_OK : E_TIME_DEAL_FAILED;
}

int32_t TimerManager::DestroyTimer(uint64_t timerId)
{
    return StopTimerInner(timerId, true) ? E_TIME_OK : E_TIME_DEAL_FAILED;
}

bool TimerManager::StopTimerInner(uint64_t timerNumber, bool needDestroy)
{
    TIME_HILOGD(TIME_MODULE_SERVICE, "start id: %{public}" PRId64 ", needDestroy: %{public}d",
        timerNumber, needDestroy);
    std::lock_guard<std::mutex> lock(entryMapMutex_);
    auto it = timerEntryMap_.find(timerNumber);
    if (it == timerEntryMap_.end()) {
        TIME_HILOGD(TIME_MODULE_SERVICE, "end.");
        return false;
    }
    RemoveHandler(timerNumber);
    if (it->second) {
        int32_t uid = it->second->uid;
        RemoveProxy(timerNumber, uid);
    }
    if (needDestroy) {
        timerEntryMap_.erase(it);
    }
    TIME_HILOGD(TIME_MODULE_SERVICE, "end.");
    return true;
}

void TimerManager::RemoveProxy(uint64_t timerNumber, int32_t uid)
{
    std::lock_guard<std::mutex> lock(proxyMutex_);
    auto itMap = proxyMap_.find(uid);
    if (itMap != proxyMap_.end()) {
        auto alarms = itMap->second;
        for (auto itAlarm = alarms.begin(); itAlarm != alarms.end();) {
            if ((*itAlarm)->id == timerNumber) {
                alarms.erase(itAlarm);
            } else {
                itAlarm++;
            }
        }
        if (alarms.empty()) {
            proxyMap_.erase(uid);
        }
    }
}

void TimerManager::SetHandler(uint64_t id,
                              int type,
                              uint64_t triggerAtTime,
                              uint64_t windowLength,
                              uint64_t interval,
                              int flag,
                              std::function<void (const uint64_t)> callback,
                              std::shared_ptr<OHOS::AbilityRuntime::WantAgent::WantAgent> wantAgent,
                              int uid)
{
    TIME_HILOGI(TIME_MODULE_SERVICE, "start id: %{public}" PRId64 "", id);
    TIME_HILOGI(TIME_MODULE_SERVICE,
        "start type:%{public}d windowLength:%{public}" PRId64"interval:%{public}" PRId64"flag:%{public}d",
        type, windowLength, interval, flag);
    auto windowLengthDuration = milliseconds(windowLength);
    if (windowLengthDuration > INTERVAL_HALF_DAY) {
        windowLengthDuration = INTERVAL_HOUR;
    }
    auto minInterval = MIN_INTERVAL_ONE_SECONDS;
    auto intervalDuration = milliseconds(interval);
    if (intervalDuration > milliseconds::zero() && intervalDuration < minInterval) {
        intervalDuration = minInterval;
    } else if (intervalDuration > MAX_INTERVAL) {
        intervalDuration = MAX_INTERVAL;
    }

    auto nowElapsed = GetBootTimeNs();
    auto nominalTrigger = ConvertToElapsed(milliseconds(triggerAtTime), type);
    if (nominalTrigger < nowElapsed) {
        TIME_HILOGI(TIME_MODULE_SERVICE, "invalid trigger time end.");
        return;
    }
    auto minTrigger = nowElapsed + ZERO_FUTURITY;
    auto triggerElapsed = (nominalTrigger > minTrigger) ? nominalTrigger : minTrigger;

    steady_clock::time_point maxElapsed;
    if (windowLengthDuration == milliseconds::zero()) {
        maxElapsed = triggerElapsed;
    } else if (windowLengthDuration < milliseconds::zero()) {
        maxElapsed = MaxTriggerTime(nominalTrigger, triggerElapsed, intervalDuration);
        windowLengthDuration = duration_cast<milliseconds>(maxElapsed - triggerElapsed);
    } else {
        maxElapsed = triggerElapsed + windowLengthDuration;
    }
    TIME_HILOGI(TIME_MODULE_SERVICE, "Try get lock");
    std::lock_guard<std::mutex> lockGuard(mutex_);
    TIME_HILOGI(TIME_MODULE_SERVICE, "Lock guard");
    SetHandlerLocked(id,
                     type,
                     milliseconds(triggerAtTime),
                     triggerElapsed,
                     windowLengthDuration,
                     maxElapsed,
                     intervalDuration,
                     std::move(callback),
                     wantAgent,
                     static_cast<uint32_t>(flag),
                     true,
                     uid);
}

void TimerManager::SetHandlerLocked(uint64_t id, int type,
                                    std::chrono::milliseconds when,
                                    std::chrono::steady_clock::time_point whenElapsed,
                                    std::chrono::milliseconds windowLength,
                                    std::chrono::steady_clock::time_point maxWhen,
                                    std::chrono::milliseconds interval,
                                    std::function<void (const uint64_t)> callback,
                                    std::shared_ptr<OHOS::AbilityRuntime::WantAgent::WantAgent> wantAgent,
                                    uint32_t flags,
                                    bool doValidate,
                                    uint64_t callingUid)
{
    TIME_HILOGI(TIME_MODULE_SERVICE, "start id: %{public}" PRId64 "", id);
    auto alarm = std::make_shared<TimerInfo>(id, type, when, whenElapsed, windowLength, maxWhen,
        interval, std::move(callback), wantAgent, flags, callingUid);
    SetHandlerLocked(alarm, false, doValidate);
    TIME_HILOGI(TIME_MODULE_SERVICE, "end");
}

void TimerManager::RemoveHandler(uint64_t id)
{
    TIME_HILOGI(TIME_MODULE_SERVICE, "start");
    std::lock_guard<std::mutex> lock(mutex_);
    RemoveLocked(id);
    TIME_HILOGI(TIME_MODULE_SERVICE, "end");
}

void TimerManager::RemoveLocked(uint64_t id)
{
    TIME_HILOGI(TIME_MODULE_SERVICE, "start id: %{public}" PRId64 "", id);
    auto whichAlarms = [id](const TimerInfo &timer) {
        return timer.id == id;
    };

    bool didRemove = false;
    for (auto it = alarmBatches_.begin(); it != alarmBatches_.end();) {
        auto batch = *it;
        didRemove = batch->Remove(whichAlarms);
        if (batch->Size() == 0) {
            TIME_HILOGD(TIME_MODULE_SERVICE, "erase");
            it = alarmBatches_.erase(it);
        } else {
            ++it;
        }
    }

    if (didRemove) {
        ReBatchAllTimersLocked(true);
    }
    TIME_HILOGI(TIME_MODULE_SERVICE, "end");
}

void TimerManager::SetHandlerLocked(std::shared_ptr<TimerInfo> alarm, bool rebatching, bool doValidate)
{
    TIME_HILOGI(TIME_MODULE_SERVICE, "start rebatching= %{public}d, doValidate= %{public}d", rebatching, doValidate);
    InsertAndBatchTimerLocked(std::move(alarm));
    if (!rebatching) {
        RescheduleKernelTimerLocked();
    }
    TIME_HILOGI(TIME_MODULE_SERVICE, "end");
}

void TimerManager::ReBatchAllTimers()
{
    TIME_HILOGI(TIME_MODULE_SERVICE, "start");
    ReBatchAllTimersLocked(true);
    TIME_HILOGI(TIME_MODULE_SERVICE, "end");
}

void TimerManager::ReBatchAllTimersLocked(bool doValidate)
{
    TIME_HILOGI(TIME_MODULE_SERVICE, "start");
    auto oldSet = alarmBatches_;
    alarmBatches_.clear();
    auto nowElapsed = GetBootTimeNs();
    for (const auto &batch : oldSet) {
        auto n = batch->Size();
        for (unsigned int i = 0; i < n; i++) {
            ReAddTimerLocked(batch->Get(i), nowElapsed, doValidate);
        }
    }
    RescheduleKernelTimerLocked();
    TIME_HILOGI(TIME_MODULE_SERVICE, "end");
}

void TimerManager::ReAddTimerLocked(std::shared_ptr<TimerInfo> timer,
                                    std::chrono::steady_clock::time_point nowElapsed,
                                    bool doValidate)
{
    TIME_HILOGI(TIME_MODULE_SERVICE, "start");
    timer->when = timer->origWhen;
    auto whenElapsed = ConvertToElapsed(timer->when, timer->type);
    if (whenElapsed < nowElapsed) {
        TIME_HILOGI(TIME_MODULE_SERVICE, "invalid timer end.");
        return;
    }
    steady_clock::time_point maxElapsed;
    if (timer->windowLength == milliseconds::zero()) {
        maxElapsed = whenElapsed;
    } else {
        maxElapsed = (timer->windowLength > milliseconds::zero()) ?
                     (whenElapsed + timer->windowLength) :
                     MaxTriggerTime(nowElapsed, whenElapsed, timer->repeatInterval);
    }
    timer->whenElapsed = whenElapsed;
    timer->maxWhenElapsed = maxElapsed;
    SetHandlerLocked(timer, true, doValidate);
    TIME_HILOGI(TIME_MODULE_SERVICE, "end");
}

std::chrono::steady_clock::time_point TimerManager::ConvertToElapsed(std::chrono::milliseconds when, int type)
{
    auto bootTimePoint = GetBootTimeNs();
    TIME_HILOGI(TIME_MODULE_SERVICE, "start");
    if (type == RTC || type == RTC_WAKEUP) {
        auto systemTimeNow = system_clock::now().time_since_epoch();
        auto offset = when - systemTimeNow;
        TIME_HILOGI(TIME_MODULE_SERVICE, "systemTimeNow : %{public}lld", systemTimeNow.count());
        TIME_HILOGI(TIME_MODULE_SERVICE, "offset : %{public}lld", offset.count());
        return bootTimePoint + offset;
    }
    auto bootTimeNow = bootTimePoint.time_since_epoch();
    auto offset = when - bootTimeNow;
    TIME_HILOGI(TIME_MODULE_SERVICE, "bootTimeNow : %{public}lld", bootTimeNow.count());
    TIME_HILOGI(TIME_MODULE_SERVICE, "offset : %{public}lld", offset.count());
    TIME_HILOGI(TIME_MODULE_SERVICE, "end");
    return bootTimePoint + offset;
}

void TimerManager::TimerLooper()
{
    TIME_HILOGI(TIME_MODULE_SERVICE, "Start timer wait loop");
    std::vector<std::shared_ptr<TimerInfo>> triggerList;
    while (runFlag_) {
        uint32_t result = 0;
        do {
            result = handler_->WaitForAlarm();
        } while (result < 0 && errno == EINTR);

        auto nowRtc = std::chrono::system_clock::now();
        auto nowElapsed = GetBootTimeNs();
        triggerList.clear();

        if ((result & TIME_CHANGED_MASK) != 0) {
            system_clock::time_point lastTimeChangeClockTime;
            system_clock::time_point expectedClockTime;
            std::lock_guard<std::mutex> lock(mutex_);
            lastTimeChangeClockTime = lastTimeChangeClockTime_;
            expectedClockTime = lastTimeChangeClockTime +
                (duration_cast<milliseconds>(nowElapsed.time_since_epoch()) -
                duration_cast<milliseconds>(lastTimeChangeRealtime_.time_since_epoch()));
            if (lastTimeChangeClockTime == system_clock::time_point::min()
                || nowRtc < (expectedClockTime - milliseconds(ONE_THOUSAND))
                || nowRtc > (expectedClockTime + milliseconds(ONE_THOUSAND))) {
                ReBatchAllTimers();
                lastTimeChangeClockTime_ = nowRtc;
                lastTimeChangeRealtime_ = nowElapsed;
            }
        }

        if (result != TIME_CHANGED_MASK) {
            std::lock_guard<std::mutex> lock(mutex_);
            TriggerTimersLocked(triggerList, nowElapsed);
            DeliverTimersLocked(triggerList, nowElapsed);
            RescheduleKernelTimerLocked();
        } else {
            std::lock_guard<std::mutex> lock(mutex_);
            RescheduleKernelTimerLocked();
        }
    }
}

TimerManager::~TimerManager()
{
    if (alarmThread_ && alarmThread_->joinable()) {
        alarmThread_->join();
    }
}

steady_clock::time_point TimerManager::GetBootTimeNs()
{
    int64_t timeNow = -1;
    struct timespec tv {};
    if (clock_gettime(CLOCK_BOOTTIME, &tv) < 0) {
        return steady_clock::now();
    }
    timeNow = tv.tv_sec * NANO_TO_SECOND + tv.tv_nsec;
    steady_clock::time_point tp_epoch ((nanoseconds(timeNow)));
    return tp_epoch;
}

bool TimerManager::TriggerTimersLocked(std::vector<std::shared_ptr<TimerInfo>> &triggerList,
                                       std::chrono::steady_clock::time_point nowElapsed)
{
    bool hasWakeup = false;
    while (!alarmBatches_.empty()) {
        auto batch = alarmBatches_.at(0);
        if (batch->GetStart() > nowElapsed) {
            break;
        }
        alarmBatches_.erase(alarmBatches_.begin());
        TIME_HILOGI(TIME_MODULE_SERVICE, "after erase alarmBatches_.size= %{public}d",
            static_cast<int>(alarmBatches_.size()));

        const auto n = batch->Size();
        for (unsigned int i = 0; i < n; ++i) {
            auto alarm = batch->Get(i);
            alarm->count = 1;
            triggerList.push_back(alarm);
            TIME_HILOGI(TIME_MODULE_SERVICE, "alarm uid= %{public}d", alarm->uid);
            if (alarm->repeatInterval > milliseconds::zero()) {
                alarm->count += duration_cast<milliseconds>(nowElapsed -
                    alarm->expectedWhenElapsed) / alarm->repeatInterval;
                auto delta = alarm->count * alarm->repeatInterval;
                auto nextElapsed = alarm->whenElapsed + delta;
                SetHandlerLocked(alarm->id, alarm->type, alarm->when + delta, nextElapsed, alarm->windowLength,
                    MaxTriggerTime(nowElapsed, nextElapsed, alarm->repeatInterval), alarm->repeatInterval,
                    alarm->callback, alarm->wantAgent, alarm->flags, true, alarm->uid);
            }
            if (alarm->wakeup) {
                hasWakeup = true;
            }
        }
    }
    std::sort(triggerList.begin(),
        triggerList.end(),
        [] (const std::shared_ptr<TimerInfo> &l, const std::shared_ptr<TimerInfo> &r) {
            return l->whenElapsed < r->whenElapsed;
        });

    return hasWakeup;
}

void TimerManager::RescheduleKernelTimerLocked()
{
    auto nextNonWakeup = std::chrono::steady_clock::time_point::min();
    if (!alarmBatches_.empty()) {
        auto firstWakeup = FindFirstWakeupBatchLocked();
        auto firstBatch = alarmBatches_.front();
        if (firstWakeup != nullptr) {
            auto alarmPtr = firstWakeup->Get(0);
            SetLocked(ELAPSED_REALTIME_WAKEUP, firstWakeup->GetStart().time_since_epoch());
        }
        if (firstBatch != firstWakeup) {
            auto alarmPtr = firstBatch->Get(0);
            nextNonWakeup = firstBatch->GetStart();
        }
    }

    if (nextNonWakeup != std::chrono::steady_clock::time_point::min()) {
        SetLocked(ELAPSED_REALTIME, nextNonWakeup.time_since_epoch());
    }
}

std::shared_ptr<Batch> TimerManager::FindFirstWakeupBatchLocked()
{
    auto it = std::find_if(alarmBatches_.begin(),
        alarmBatches_.end(),
        [](const std::shared_ptr<Batch> &batch) {
            return batch->HasWakeups();
        });
    return (it != alarmBatches_.end()) ? *it : nullptr;
}

void TimerManager::SetLocked(int type, std::chrono::nanoseconds when)
{
    handler_->Set(static_cast<uint32_t>(type), when);
}

void TimerManager::InsertAndBatchTimerLocked(std::shared_ptr<TimerInfo> alarm)
{
    TIME_HILOGI(TIME_MODULE_SERVICE, "start");
    int64_t whichBatch = (alarm->flags & static_cast<uint32_t>(STANDALONE)) ? -1
        : AttemptCoalesceLocked(alarm->whenElapsed, alarm->maxWhenElapsed);
    TIME_HILOGI(TIME_MODULE_SERVICE, "whichBatch= %{public}" PRId64 "", whichBatch);
    if (whichBatch < 0) {
        AddBatchLocked(alarmBatches_, std::make_shared<Batch>(*alarm));
    } else {
        auto batch = alarmBatches_.at(whichBatch);
        if (batch->Add(alarm)) {
            alarmBatches_.erase(alarmBatches_.begin() + whichBatch);
            AddBatchLocked(alarmBatches_, batch);
        }
    }
    TIME_HILOGI(TIME_MODULE_SERVICE, "end");
}

int64_t TimerManager::AttemptCoalesceLocked(std::chrono::steady_clock::time_point whenElapsed,
                                            std::chrono::steady_clock::time_point maxWhen)
{
    TIME_HILOGI(TIME_MODULE_SERVICE, "start");
    int64_t i = 0;
    for (const auto &item : alarmBatches_) {
        if ((item->GetFlags() & static_cast<uint32_t>(STANDALONE)) == 0 && item->CanHold(whenElapsed, maxWhen)) {
            return i;
        }
    }
    return -1;
}

void TimerManager::DeliverTimersLocked(const std::vector<std::shared_ptr<TimerInfo>> &triggerList,
                                       std::chrono::steady_clock::time_point nowElapsed)
{
    for (const auto &alarm : triggerList) {
        if (alarm->callback) {
            CallbackAlarmIfNeed(alarm);
        }
        if (alarm->wantAgent) {
            NotifyWantAgent(alarm->wantAgent);
        }
    }
}

void TimerManager::NotifyWantAgent(std::shared_ptr<OHOS::AbilityRuntime::WantAgent::WantAgent> wantAgent)
{
    TIME_HILOGD(TIME_MODULE_SERVICE, "trigger wantagent.");
    std::shared_ptr<AAFwk::Want> want =
        OHOS::AbilityRuntime::WantAgent::WantAgentHelper::GetWant(wantAgent);
    OHOS::AbilityRuntime::WantAgent::TriggerInfo paramsInfo("", nullptr, want, WANTAGENT_CODE_ELEVEN);
    OHOS::AbilityRuntime::WantAgent::WantAgentHelper::TriggerWantAgent(
        wantAgent, nullptr, paramsInfo);
}

void TimerManager::CallbackAlarmIfNeed(std::shared_ptr<TimerInfo> alarm)
{
    int uid = alarm->uid;
    std::lock_guard<std::mutex> lock(proxyMutex_);
    auto it = proxyUids_.find(uid);
    if (it == proxyUids_.end()) {
        alarm->callback(alarm->id);
        TIME_HILOGI(TIME_MODULE_SERVICE, "Trigger id: %{public}" PRId64 "", alarm->id);
        return;
    }
    TIME_HILOGI(TIME_MODULE_SERVICE, "Alarm is proxy!");
    auto itMap = proxyMap_.find(uid);
    if (itMap == proxyMap_.end()) {
        std::vector<std::shared_ptr<TimerInfo>> timeInfoVec;
        timeInfoVec.push_back(alarm);
        proxyMap_[uid] = timeInfoVec;
    } else {
        std::vector<std::shared_ptr<TimerInfo>> timeInfoVec = itMap->second;
        timeInfoVec.push_back(alarm);
        proxyMap_[uid] = timeInfoVec;
    }
}

bool TimerManager::ProxyTimer(int32_t uid, bool isProxy, bool needRetrigger)
{
    std::lock_guard<std::mutex> lock(proxyMutex_);
    TIME_HILOGD(TIME_MODULE_SERVICE, "start");
    if (isProxy) {
        proxyUids_.insert(uid);
        return true;
    }
    auto it = proxyUids_.find(uid);
    if (it != proxyUids_.end()) {
        proxyUids_.erase(uid);
    } else {
        TIME_HILOGE(TIME_MODULE_SERVICE, "Uid: %{public}d doesn't exist in the proxy list." PRId64 "", uid);
        return false;
    }
    if (!needRetrigger) {
        TIME_HILOGI(TIME_MODULE_SERVICE, "ProxyTimer doesn't need retrigger, clear all callbacks!");
        proxyMap_.erase(uid);
        return true;
    }
    auto itMap = proxyMap_.find(uid);
    if (itMap != proxyMap_.end()) {
        auto timeInfoVec = itMap->second;
        for (const auto& alarm : timeInfoVec) {
            if (!alarm->callback) {
                TIME_HILOGE(TIME_MODULE_SERVICE, "ProxyTimer Callback is nullptr!");
                continue;
            }
            alarm->callback(alarm->id);
            TIME_HILOGD(TIME_MODULE_SERVICE, "Shut down proxy, proxyUid: %{public}d, alarmId: %{public}" PRId64 "",
                uid, alarm->id);
        }
        timeInfoVec.clear();
        proxyMap_.erase(uid);
    }
    return true;
}

bool TimerManager::ResetAllProxy()
{
    std::lock_guard<std::mutex> lock(proxyMutex_);
    TIME_HILOGD(TIME_MODULE_SERVICE, "start");
    for (auto it = proxyMap_.begin(); it != proxyMap_.end(); it++) {
        auto timeInfoVec = it->second;
        for (const auto& alarm : timeInfoVec) {
            if (!alarm->callback) {
                TIME_HILOGE(TIME_MODULE_SERVICE, "Callback is nullptr!");
                continue;
            }
            alarm->callback(alarm->id);
            TIME_HILOGD(TIME_MODULE_SERVICE, "Reset all proxy, proxyUid: %{public}d, alarmId: %{public}" PRId64 "",
                it->first, alarm->id);
        }
        timeInfoVec.clear();
    }
    proxyMap_.clear();
    proxyUids_.clear();
    return true;
}

bool AddBatchLocked(std::vector<std::shared_ptr<Batch>> &list, const std::shared_ptr<Batch> &newBatch)
{
    TIME_HILOGI(TIME_MODULE_SERVICE, "start");
    auto it = std::upper_bound(list.begin(),
                               list.end(),
                               newBatch,
                               [](const std::shared_ptr<Batch> &first, const std::shared_ptr<Batch> &second) {
                                    return first->GetStart() < second->GetStart();
                                });
    list.insert(it, newBatch);
    TIME_HILOGI(TIME_MODULE_SERVICE, "end");
    return it == list.begin();
}

steady_clock::time_point MaxTriggerTime(steady_clock::time_point now,
                                        steady_clock::time_point triggerAtTime,
                                        milliseconds interval)
{
    milliseconds futurity = (interval == milliseconds::zero()) ? 
        (duration_cast<milliseconds>(triggerAtTime - now)) : interval;
    if (futurity < MIN_FUZZABLE_INTERVAL) {
        futurity = milliseconds::zero();
    }
    return triggerAtTime + milliseconds(static_cast<long>(BATCH_WINDOW_COE * futurity.count()));
}

bool TimerManager::ShowtimerEntryMap(int fd)
{
    TIME_HILOGD(TIME_MODULE_SERVICE, "start.");
    std::lock_guard<std::mutex> lock(showTimerMutex_);
    std::map<uint64_t, std::shared_ptr<TimerEntry>>::iterator iter = timerEntryMap_.begin();
    for (; iter != timerEntryMap_.end(); iter++) {
        dprintf(fd, " - dump timer number   = %lu\n", iter->first);
        dprintf(fd, " * timer id            = %lu\n", iter->second->id);
        dprintf(fd, " * timer type          = %d\n", iter->second->type);
        dprintf(fd, " * timer window Length = %lu\n", iter->second->windowLength);
        dprintf(fd, " * timer interval      = %lu\n", iter->second->interval);
        dprintf(fd, " * timer uid           = %d\n\n", iter->second->uid);
    }
    TIME_HILOGD(TIME_MODULE_SERVICE, "end.");
    return true;
}

bool TimerManager::ShowTimerEntryById(int fd, uint64_t timerId)
{
    TIME_HILOGD(TIME_MODULE_SERVICE, "start.");
    std::lock_guard<std::mutex> lock(showTimerMutex_);
    std::map<uint64_t, std::shared_ptr<TimerEntry>>::iterator iter = timerEntryMap_.find(timerId);
    if (iter == timerEntryMap_.end()) {
        TIME_HILOGD(TIME_MODULE_SERVICE, "end.");
        return false;
    } else {
        dprintf(fd, " - dump timer number   = %lu\n", iter->first);
        dprintf(fd, " * timer id            = %lu\n", iter->second->id);
        dprintf(fd, " * timer type          = %d\n", iter->second->type);
        dprintf(fd, " * timer window Length = %lu\n", iter->second->windowLength);
        dprintf(fd, " * timer interval      = %lu\n", iter->second->interval);
        dprintf(fd, " * timer uid           = %d\n\n", iter->second->uid);
    }
    TIME_HILOGD(TIME_MODULE_SERVICE, "end.");
    return true;
}

bool TimerManager::ShowTimerTriggerById(int fd, uint64_t timerId)
{
    TIME_HILOGD(TIME_MODULE_SERVICE, "start.");
    std::lock_guard<std::mutex> lock(showTimerMutex_);
    for (size_t i = 0; i < alarmBatches_.size(); i++) {
        for (size_t j = 0; j < alarmBatches_[i]->Size(); j++) {
            if (alarmBatches_[i]->Get(j)->id == timerId) {
                dprintf(fd, " - dump timer id   = %lu\n", alarmBatches_[i]->Get(j)->id);
                dprintf(fd, " * timer trigger   = %lld\n", alarmBatches_[i]->Get(j)->origWhen);
            }
        }
    }
    TIME_HILOGD(TIME_MODULE_SERVICE, "end.");
    return true;
}
} // MiscServices
} // OHOS