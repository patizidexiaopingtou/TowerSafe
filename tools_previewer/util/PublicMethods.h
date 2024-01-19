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

#ifndef PUBLICMETHODS_H
#define PUBLICMETHODS_H

#include <string>

#ifdef _WIN32
#include <windows.h>
#endif // _WIN32

class PublicMethods final {
public:
    static const int32_t MAX_ITOA_BIT = 65;
    PublicMethods() = default;
    virtual ~PublicMethods() = default;
    PublicMethods& operator=(const PublicMethods&) = delete;
    PublicMethods(const PublicMethods&) = delete;
    static uint32_t Ulltoa(uintptr_t value, int8_t (&rstStr)[MAX_ITOA_BIT]);
};

#endif // LOCALSOCKET_H
