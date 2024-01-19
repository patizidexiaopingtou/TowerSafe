/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

#ifndef CPPTIMER_H
#define CPPTIMER_H

#include <algorithm>
#include <chrono>
#include <functional>
#include <list>
#include <thread>

#include "CallbackQueue.h"
#include "PreviewerEngineLog.h"

class CppTimer {
public:
    CppTimer() = delete;
    CppTimer& operator=(const CppTimer&) = delete;
    CppTimer(const CppTimer&) = delete;

    ~CppTimer();

    // Use callback functions and parameters to construct a timer. the timer is repeatedly executed by default.
    template <class Function, class... Args>
    explicit CppTimer(Function callback, Args... args) : interval(0), shotTimes(-1), isRunning(false)
    {
        functional = [callback, args...]() { return callback(args...); };
        threadId = std::this_thread::get_id();
        InitClock();
    }

    // Use callback functions, parameters, and execution times to construct a timer.
    template <class Function, class... Args>
    CppTimer(Function callback, Args... args, int shotTimes) : interval(0), shotTimes(-1), isRunning(false)
    {
        functional = [callback, args...]() { return callback(args...); };
        this->shotTimes = shotTimes;
        threadId = std::this_thread::get_id();
        InitClock();
    }

    inline void SetShotTimes(int timers)
    {
        shotTimes = timers;
    }

    inline int GetShotTimes() const
    {
        return shotTimes;
    }

    inline bool IsRunning() const
    {
        return isRunning;
    }

    void Start(int64_t value);

    void Stop();

    void RunTimerTick(CallbackQueue& queue);

private:
    int64_t interval;
    int32_t shotTimes;
    std::thread::id threadId;
    bool isRunning;
    std::function<void()> functional;
    std::chrono::system_clock::time_point startTime;

    void InitClock()
    {
        startTime = std::chrono::system_clock::now();
    }
};

#endif // CPPTIMER_H
