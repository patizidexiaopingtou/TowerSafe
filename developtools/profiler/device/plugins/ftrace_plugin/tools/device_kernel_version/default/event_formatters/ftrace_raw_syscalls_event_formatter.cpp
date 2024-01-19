/* THIS FILE IS GENERATE BY ftrace_cpp_generator.py, PLEASE DON'T EDIT IT!
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
#include <cinttypes>

#include "event_formatter.h"
#include "logging.h"
#include "trace_events.h"

FTRACE_NS_BEGIN
namespace {
const int BUFFER_SIZE = 512;

REGISTER_FTRACE_EVENT_FORMATTER(
    sys_enter,
    [](const ForStandard::FtraceEvent& event) -> bool { return event.has_sys_enter_format(); },
    [](const ForStandard::FtraceEvent& event) -> std::string {
        auto msg = event.sys_enter_format();
        char buffer[BUFFER_SIZE];
        int len = snprintf_s(buffer, BUFFER_SIZE, BUFFER_SIZE - 1,
            "sys_enter: NR %" PRIu64 " (%" PRIx64 ", %" PRIx64 ", %" PRIx64 ", %" PRIx64 ", %" PRIx64 ", %" PRIx64 ")",
            msg.id(), msg.args()[0], msg.args()[1], msg.args()[2], msg.args()[3], msg.args()[4], msg.args()[5]);
        if (len >= BUFFER_SIZE - 1) {
            HILOG_WARN(LOG_CORE, "maybe, the contents of print event(sys_enter) msg had be cut off in outfile");
        }
        return std::string(buffer);
    });

REGISTER_FTRACE_EVENT_FORMATTER(
    sys_exit,
    [](const ForStandard::FtraceEvent& event) -> bool { return event.has_sys_exit_format(); },
    [](const ForStandard::FtraceEvent& event) -> std::string {
        auto msg = event.sys_exit_format();
        char buffer[BUFFER_SIZE];
        int len = snprintf_s(
            buffer, BUFFER_SIZE, BUFFER_SIZE - 1, "sys_exit: NR %" PRIu64 " = %" PRIu64 "", msg.id(), msg.ret());
        if (len >= BUFFER_SIZE - 1) {
            HILOG_WARN(LOG_CORE, "maybe, the contents of print event(sys_exit) msg had be cut off in outfile");
        }
        return std::string(buffer);
    });
} // namespace
FTRACE_NS_END
