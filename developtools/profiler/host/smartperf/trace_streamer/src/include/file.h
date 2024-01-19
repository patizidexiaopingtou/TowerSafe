/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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

#ifndef INCLUDE_TUNING_BASE_FILE_UTILS_H_
#define INCLUDE_TUNING_BASE_FILE_UTILS_H_

#include <string>

namespace SysTuning {
namespace base {
constexpr uint32_t kFileModeInvalid = 0xFFFFFFFF;
enum TraceParserStatus {
    TRACE_PARSER_NORMAL = 0,
    TRACE_PARSER_FILE_TYPE_ERROR = 1,
    TRACE_PARSE_ERROR = 2,
    TRACE_PARSER_ABNORMAL = 3
};

void SetAnalysisResult(TraceParserStatus stat);

TraceParserStatus GetAnalysisResult();

ssize_t Read(int fd, uint8_t* dst, size_t dstSize);

int OpenFile(const std::string& path, int flags, uint32_t mode = kFileModeInvalid);

std::string GetExecutionDirectoryPath();
} // namespace base
} // namespace SysTuning
#endif // INCLUDE_TUNING_BASE_FILE_UTILS_H_
