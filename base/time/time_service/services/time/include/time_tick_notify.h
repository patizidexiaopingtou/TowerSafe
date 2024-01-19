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

#ifndef TIME_TICK_NOTIFY_H
#define TIME_TICK_NOTIFY_H

#include <singleton.h>
#include "timer.h"

namespace OHOS {
namespace MiscServices {
class TimeTickNotify : public DelayedSingleton<TimeTickNotify> {
public:
    TimeTickNotify();
    ~TimeTickNotify();
    DISALLOW_COPY_AND_MOVE(TimeTickNotify);
    void Init();
    void Callback();
    void Stop();
    void PowerCallback();
private:
    void StartTimer();
    void RefreshNextTriggerTime();
    uint64_t GetMillisecondsFromUTC(uint64_t UTCtimeNano);
    Utils::Timer timer_;
    uint32_t timerId_;
    uint64_t nextTriggerTime_;
};
} // MiscServices
} // OHOS
#endif