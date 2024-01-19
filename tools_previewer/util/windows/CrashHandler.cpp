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

#include "CrashHandler.h"

#include <cstdlib>
#include <dbghelp.h>
#include <iostream>
#include <sstream>
#include <unistd.h>
#include <windows.h>

#include "PreviewerEngineLog.h"
#include "PublicMethods.h"

static const int MAX_ADDRESS_LENGTH = 32;

struct CrashInfo {
    CHAR ErrorCode[MAX_ADDRESS_LENGTH];
    CHAR Address[MAX_ADDRESS_LENGTH];
    CHAR Flags[MAX_ADDRESS_LENGTH];
};

void CrashHandler::RecordCallStack(const CONTEXT *context)
{
    HANDLE hProcess = GetCurrentProcess();
    SymInitialize(hProcess, NULL, TRUE);

    CONTEXT crashContext = *context;

    STACKFRAME64 sf = {};
    DWORD imageType = IMAGE_FILE_MACHINE_I386;

#ifdef _M_X64
    imageType = IMAGE_FILE_MACHINE_AMD64;
    sf.AddrPC.Offset = crashContext.Rip;
    sf.AddrPC.Mode = AddrModeFlat;
    sf.AddrFrame.Offset = crashContext.Rsp;
    sf.AddrFrame.Mode = AddrModeFlat;
    sf.AddrStack.Offset = crashContext.Rsp;
    sf.AddrStack.Mode = AddrModeFlat;
#endif

    HANDLE hThread = GetCurrentThread();

    while (true) {
        if (!StackWalk64(imageType, hProcess, hThread, &sf, &crashContext, NULL,
                         SymFunctionTableAccess64, SymGetModuleBase64, NULL)) {
            break;
        }
        if (sf.AddrFrame.Offset == 0) {
            break;
        }

        int8_t stackIntLog[PublicMethods::MAX_ITOA_BIT] = {0};
        unsigned int itoaLength = PublicMethods::Ulltoa(sf.AddrPC.Offset, stackIntLog);
        int8_t offsetLog[] = "\n[JsEngine Crash]sf.AddrPC.Offset : 0x";
        write(STDERR_FILENO, offsetLog, sizeof(offsetLog));
        write(STDERR_FILENO, stackIntLog, itoaLength);
    }
    SymCleanup(hProcess);
}

LONG CrashHandler::ApplicationCrashHandler(EXCEPTION_POINTERS *exception)
{
    int8_t crashBeginLog[] = "[JsEngine Crash]Engine Crash Info Begin.\n";
    write(STDERR_FILENO, crashBeginLog, sizeof(crashBeginLog) - 1);

    int8_t stackIntLog[PublicMethods::MAX_ITOA_BIT] = {0};
    // 16 means hexadecimal
    unsigned int itoaLength = PublicMethods::Ulltoa(reinterpret_cast<uintptr_t>
                                                    (exception->ExceptionRecord->ExceptionAddress), stackIntLog);
    int8_t ELOG[] = "[JsEngine Crash]Address: 0x";
    write(STDERR_FILENO, ELOG, sizeof(ELOG) - 1);
    write(STDERR_FILENO, stackIntLog, itoaLength);
    // 16 means hexadecimal
    itoaLength = PublicMethods::Ulltoa(exception->ExceptionRecord->ExceptionCode, stackIntLog);
    int8_t addressLog[] = "\n[JsEngine Crash]ErrorCode: 0x";
    write(STDERR_FILENO, addressLog, sizeof(addressLog) - 1);
    write(STDERR_FILENO, stackIntLog, itoaLength);
    // 16 means hexadecimal
    RecordCallStack(exception->ContextRecord);

    int8_t crashEndLog[] = "\n[JsEngine Crash]Engine Crash Info End.\n";
    write(STDERR_FILENO, crashEndLog, sizeof(crashEndLog) - 1);
    return 0;
}

void CrashHandler::InitExceptionHandler()
{
    SetUnhandledExceptionFilter((LPTOP_LEVEL_EXCEPTION_FILTER)ApplicationCrashHandler);
}
