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


#include "brightness_impl.h"

#include "PreviewerEngineLog.h"
#include "SharedData.h"

using namespace OHOS::ACELite;

int32_t BrightnessImpl::SetValueImpl(uint8_t value)
{
    if (!SharedData<uint8_t>::SetData(SharedDataType::BRIGHTNESS_VALUE, value)) {
        return EC_API_INVALID_PARAM;
    }
    ILOG("Set screen brightness value: %d", value);
    return 0;
}

int32_t BrightnessImpl::GetValueImpl(uint8_t& value)
{
    value = SharedData<uint8_t>::GetData(SharedDataType::BRIGHTNESS_VALUE);
    ILOG("Get screen brightness value: %d", value);
    return 0;
}

int32_t BrightnessImpl::SetModeImpl(uint8_t mode)
{
    if (!SharedData<uint8_t>::SetData(SharedDataType::BRIGHTNESS_MODE, mode)) {
        return EC_API_INVALID_PARAM;
    }
    ILOG("Set screen brightness mode: %d", mode);
    return 0;
}

int32_t BrightnessImpl::GetModeImpl(uint8_t& mode)
{
    mode = SharedData<uint8_t>::GetData(SharedDataType::BRIGHTNESS_MODE);
    ILOG("Get screen brightness mode: %d", mode);
    return 0;
}

void BrightnessImpl::SetKeepScreenOnImpl(bool keepScreenOn)
{
    SharedData<bool>::SetData(SharedDataType::KEEP_SCREEN_ON, keepScreenOn);
    ILOG("Set screen keep on: %d", keepScreenOn);
}

void BrightnessImpl::SetAlwaysOnMode(bool alwaysOn)
{
    (void)alwaysOn;
}

int32_t BrightnessImpl::GetSysMode(uint8_t& mode)
{
    (void)mode;
    return 0;
}

int32_t BrightnessImpl::SetSysMode(uint8_t mode)
{
    (void)mode;
    return 0;
}

uint8_t BrightnessImpl::GetSysAlwaysOnState()
{
    return 0;
}

void BrightnessImpl::SetSysAlwaysOnState(uint8_t alwaysOnState)
{
    (void)alwaysOnState;
}

uint8_t BrightnessImpl::GetCurBrightLevel()
{
    return 0;
}

BrightnessImpl::BrightnessImpl()
{
}

BrightnessImpl::~BrightnessImpl()
{
}
