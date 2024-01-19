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

#ifndef VIRTUALLOCATION_H
#define VIRTUALLOCATION_H

#include "location.h"

class VirtualLocation {
public:
    static VirtualLocation& GetInstance();
    const int8_t* GetMockPointer() const;
    uint32_t GetMockLen() const;
    void SetCallBack(LocDataUpdateCallback func);
    void SetSubscribe(bool value);
    bool IsSubscribe() const;
    LocDataUpdateCallback GetCallBack() const;
    void ExecCallBack() const;
    bool IsPostionChanged();

    // Obtains the location precision.
    float GetAccuracy() const;
    // Obtains the UTC time from 1970-01-01T00:00:00.000, in milliseconds.
    uint64_t GetTime() const;

private:
    VirtualLocation();
    virtual ~VirtualLocation();
    bool isSubsribe;
    double longitudeChecked;
    double latitudeChecked;
    float accuracy;
    int8_t* mockPointer;
    uint32_t mockLen;
    LocDataUpdateCallback callBack;
    const float LOCATION_ACCURACY = 20.0; // The accuracy of location
    const int PRECISION_BASE_NUMBER = 10; // The precision base number of longitude and latitude

    void InitMockPointer();
};

#endif // VIRTUALLOCATION_H
