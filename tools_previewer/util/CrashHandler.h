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

#ifndef CRASHHANDLER_H
#define CRASHHANDLER_H

#include <string>
#include <cstdint>

#ifdef _WIN32
#include <windows.h>
#endif // _WIN32

class CrashHandler {
public:
    CrashHandler() = default;
    virtual ~CrashHandler() = default;
    CrashHandler& operator=(const CrashHandler&) = delete;
    CrashHandler(const CrashHandler&) = delete;

    void InitExceptionHandler();
private:
#ifdef _WIN32
    static void RecordCallStack(const CONTEXT *pContext);
    static LONG ApplicationCrashHandler(EXCEPTION_POINTERS *pException);
#else
    static void ApplicationCrashHandler(int signal);
#endif // _WIN32
};

#endif // LOCALSOCKET_H
