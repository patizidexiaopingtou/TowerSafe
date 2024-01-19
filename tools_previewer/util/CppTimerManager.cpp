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

#include "CppTimerManager.h"

#include <thread>

using namespace std;
std::map<std::thread::id, unique_ptr<CppTimerManager>> CppTimerManager::managers;

// Non-threaded security
CppTimerManager& CppTimerManager::GetTimerManager()
{
    thread::id curThreadId = this_thread::get_id();
    if (managers.find(curThreadId) == managers.end()) {
        managers[curThreadId] = make_unique<CppTimerManager>();
    }
    return *managers[curThreadId];
}

void CppTimerManager::AddCppTimer(CppTimer& timer)
{
    runningTimers.push_back(&timer);
    ILOG("CppTimerManager::AddCppTimer %x %x", this, &timer);
}

void CppTimerManager::RemoveCppTimer(CppTimer& timer)
{
    runningTimers.remove(&timer);
    ILOG("CppTimerManager::RemoveCppTimer %x %x", this, &timer);
}

void CppTimerManager::RunTimerTick()
{
    auto tempTimers = runningTimers;
    if (tempTimers.size() == 0) {
        ILOG("CppTimerManager::RunTimerTick No timer exec.");
    }
    auto iter = tempTimers.begin();
    while (iter != tempTimers.end()) {
        CppTimer* timer = *iter;
        timer->RunTimerTick(callbackQueue);

        iter++;
    }

    callbackQueue.ConsumingCallback();
}
