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

#include "KeyboardHelper.h"
#include <windows.h>

short KeyboardHelper::GetKeyStateByKeyName(const std::string keyName)
{
    if (keyName == "CapsLock") {
        return GetKeyState(VK_CAPITAL);
    } else if (keyName == "NumLock") {
        return GetKeyState(VK_NUMLOCK);
    }
    return -1;
}