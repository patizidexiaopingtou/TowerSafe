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

#ifndef TIMER_MANAGER_INTERFACE_H
#define TIMER_MANAGER_INTERFACE_H

#include <memory>
#include "want_agent_helper.h"
#include "time_common.h"

namespace OHOS {
namespace MiscServices {
struct TimerEntry {
    uint64_t id;
    int type;
    uint64_t windowLength;
    uint64_t interval;
    int flag;
    std::function<void (const uint64_t)> callback;
    std::shared_ptr<OHOS::AbilityRuntime::WantAgent::WantAgent> wantAgent;
    int uid;
};

class ITimerManager {
public:
    enum TimerFlag {
        STANDALONE = 1 << 0,
        WAKE_FROM_IDLE = 1 << 1,
        ALLOW_WHILE_IDLE = 1 << 2,
        ALLOW_WHILE_IDLE_UNRESTRICTED = 1 << 3,
        IDLE_UNTIL = 1 << 4,
    };

    enum TimerType {
        RTC_WAKEUP = 0,
        RTC = 1,
        ELAPSED_REALTIME_WAKEUP = 2,
        ELAPSED_REALTIME = 3
    };

    virtual int32_t CreateTimer(TimerPara &paras,
                                std::function<void (const uint64_t)> callback,
                                std::shared_ptr<OHOS::AbilityRuntime::WantAgent::WantAgent> wantAgent,
                                int uid, uint64_t &timerId) = 0;

    virtual int32_t StartTimer(uint64_t timerId, uint64_t triggerTime) = 0;
    virtual int32_t StopTimer(uint64_t timerId) = 0;
    virtual int32_t DestroyTimer(uint64_t timerId) = 0;
    virtual ~ITimerManager() = default;
    virtual bool ProxyTimer(int32_t uid, bool isProxy, bool needRetrigger) = 0;
    virtual bool ResetAllProxy() = 0;
}; // ITimerManager
} // MiscService
} // OHOS

#endif