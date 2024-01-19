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

#ifndef DEBUGLOG_H
#define DEBUGLOG_H

#define DLOG(...) PrintLog("DEBUG", __FILE__, __FUNCTION__, __LINE__, ##__VA_ARGS__)
#define ILOG(...) PrintLog("INFO", __FILE__, __FUNCTION__, __LINE__, ##__VA_ARGS__)
#define WLOG(...) PrintLog("WARN", __FILE__, __FUNCTION__, __LINE__, ##__VA_ARGS__)
#define ELOG(...) PrintLog("ERROR", __FILE__, __FUNCTION__, __LINE__, ##__VA_ARGS__)
#define FLOG(...) PrintLog("FATAL", __FILE__, __FUNCTION__, __LINE__, ##__VA_ARGS__)

void PrintLog(const char* level, const char* file, const char* func, int line,
              const char* fmt, ...);

#endif // DEBUGLOG_H
