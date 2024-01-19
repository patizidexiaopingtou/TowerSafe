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

#ifndef KEYINPUT_H
#define KEYINPUT_H

#include <cstdint>
#include <vector>
#include <string>

class KeyInput {
public:
    virtual void SetKeyEvent(const int32_t keyCodeVal, const int32_t keyActionVal,
                             const std::vector<int32_t> pressedCodesVal,
                             const std::string keyStrVal) {};
    virtual void SetCodePoint(const unsigned int codePointVal) {};
    virtual void DispatchOsInputMethodEvent() const {};
    virtual void DispatchOsKeyEvent() const {};

protected:
    KeyInput();
    virtual ~KeyInput() {}
    unsigned int codePoint; // unicode for IME
    int32_t keyCode;
    int32_t keyAction;
    std::string keyString;
};

#endif // KEYINPUT_H
