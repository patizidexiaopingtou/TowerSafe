/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

#ifndef CGROUP_SCHED_FRAMEWORK_PROCESS_GROUP_INCLUDE_PROCESS_GROUP_UTIL_H_
#define CGROUP_SCHED_FRAMEWORK_PROCESS_GROUP_INCLUDE_PROCESS_GROUP_UTIL_H_

#include <string>
#include "nlohmann/json.hpp"

namespace OHOS {
namespace ResourceSchedule {
namespace CgroupSetting {
std::string FormatString(const char* fmt, va_list vararg);

std::string StringPrintf(const char* fmt, ...);

bool GetRealPath(const std::string& path, std::string& realPath);

bool ReadFileToString(const std::string& filePath, std::string& content);

bool WriteStringToFile(int fd, const std::string& content);

bool WriteStringToFile(const std::string& content, const std::string& filePath);

bool ReadFileToStringForVFS(const std::string& filePath, std::string& content);
} // namespace CgroupSetting
} // namespace ResourceSchedule
} // namespace OHOS

#endif // CGROUP_SCHED_FRAMEWORK_PROCESS_GROUP_INCLUDE_PROCESS_GROUP_UTIL_H_
