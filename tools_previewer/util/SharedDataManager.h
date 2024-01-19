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

#ifndef SHAREDDATAMANAGER_H
#define SHAREDDATAMANAGER_H

#include <mutex>
#include <set>

enum class BrightnessMode { MANUAL = 0, AUTO, BRIGHTNESSMODE_MAX };

enum class ChargeState { NOCHARGE = 0, CHARGING, CHARGESTATE_MAX };

enum class SharedDataType {
    BRIGHTNESS_VALUE,
    BRIGHTNESS_MODE,
    KEEP_SCREEN_ON,
    BATTERY_STATUS,
    BATTERY_LEVEL,
    HEARTBEAT_VALUE,
    SUMSTEP_VALUE,
    VOLUME_VALUE,
    PRESSURE_VALUE,
    WEARING_STATE,
    LANGUAGE,
    LONGITUDE,
    LATITUDE,
    LAN,
    REGION
};

class SharedDataManager {
public:
    using Checker = void (*)();

    const static int POSITIONPRECISION = 11;

    // add a data change check function of the template class to automatically,remove duplicates
    static void AddChecker(const Checker checker);

    // to perform the check, it needs to be polled for 100ms
    static void CheckTick();

private:
    static std::set<Checker> checkers;
    static std::mutex mutex;
};

#endif // SHAREDDATAMANAGER_H
