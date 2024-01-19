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

#ifndef SRC_BYTRACE_EVENT_PARSER_H
#define SRC_BYTRACE_EVENT_PARSER_H

#include <functional>
#include <vector>

#include "common_types.h"
#include "event_parser_base.h"
#include "print_event_parser.h"
#include "trace_data_cache.h"
#include "trace_streamer_config.h"
#include "trace_streamer_filters.h"

namespace SysTuning {
namespace TraceStreamer {
using ArgsMap = std::unordered_map<std::string, std::string>;
class BytraceEventParser : public EventParserBase {
private:
    class EventInfo {
    public:
        EventInfo(uint64_t ts, BytraceLine li) : eventTimestamp(ts), line(li) {}
        uint64_t eventTimestamp;
        BytraceLine line;
    };

public:
    BytraceEventParser(TraceDataCache* dataCache, const TraceStreamerFilters* filter);
    void ParseDataItem(const BytraceLine& line);
    void FilterAllEventsTemp();
    void FilterAllEvents();
    void BeginFilterEvents(EventInfo* event);
    void Clear() const;
private:
    using FuncCall = std::function<bool(const ArgsMap& args, const BytraceLine line)>;
    bool SchedSwitchEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool TaskRenameEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool TaskNewtaskEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool TracingMarkWriteOrPrintEvent(const ArgsMap& args, const BytraceLine& line);
    bool SchedWakeupEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool SchedWakingEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool CpuIdleEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool CpuFrequencyEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool CpuFrequencyLimitsEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool WorkqueueExecuteStartEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool WorkqueueExecuteEndEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool ProcessExitEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool SetRateEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool ClockEnableEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool ClockDisableEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool RegulatorSetVoltageEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool RegulatorSetVoltageCompleteEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool RegulatorDisableEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool RegulatorDisableCompleteEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool IpiEntryEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool IpiExitEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool IrqHandlerEntryEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool IrqHandlerExitEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool SoftIrqRaiseEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool SoftIrqEntryEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool SoftIrqExitEvent(const ArgsMap& args, const BytraceLine& line) const;
    bool BinderTransaction(const ArgsMap& args, const BytraceLine& line) const;
    bool BinderTransactionReceived(const ArgsMap& args, const BytraceLine& line) const;
    bool BinderTransactionAllocBufEvent(const ArgsMap& args, const BytraceLine& line) const;
    void GetDataSegArgs(BytraceLine& bufLine, ArgsMap& args, uint32_t& tgid) const;

    std::map<std::string, FuncCall> eventToFunctionMap_ = {};
    const unsigned int MIN_SCHED_SWITCH_ARGS_COUNT = 6;
    const unsigned int MIN_SCHED_WAKEUP_ARGS_COUNT = 2;
    const unsigned int MIN_TASK_RENAME_ARGS_COUNT = 2;
    const unsigned int MIN_SCHED_WAKING_ARGS_COUNT = 4;
    const unsigned int MIN_CPU_IDLE_ARGS_COUNT = 2;
    const unsigned int MIN_CPU_FREQUENCY_ARGS_COUNT = 2;
    const unsigned int MIN_PROCESS_EXIT_ARGS_COUNT = 2;
    const unsigned int MIN_CLOCK_SET_RATE_ARGS_COUNT = 3;
    const unsigned int MIN_CLOCK_ENABLE_ARGS_COUNT = 3;
    const unsigned int MIN_CLOCK_DISABLE_ARGS_COUNT = 3;
    const unsigned int MIN_IRQ_HANDLER_ENTRY_ARGS_COUNT = 2;
    const unsigned int MIN_IRQ_HANDLER_EXIT_ARGS_COUNT = 2;
    const unsigned int MIN_SOFTIRQ_ENTRY_ARGS_COUNT = 2;
    const unsigned int MIN_SOFTIRQ_EXIT_ARGS_COUNT = 2;
    const unsigned int MIN_BINDER_TRANSACTION_ARGS_COUNT = 7;
    const unsigned int MIN_BINDER_TRANSACTION_RECEIVED_ARGS_COUNT = 1;
    const unsigned int MIN_BINDER_TRANSACTION_ALLOC_BUF_ARGS_COUNT = 3;
    std::vector<std::unique_ptr<EventInfo>> eventList_ = {};
    PrintEventParser printEventParser_;
    const DataIndex schedWakeupName_ = traceDataCache_->GetDataIndex("sched_wakeup");
    const DataIndex schedWakingName_ = traceDataCache_->GetDataIndex("sched_waking");
    const DataIndex ioWaitId_ = traceDataCache_->GetDataIndex("io_wait");
    const DataIndex workQueueId_ = traceDataCache_->GetDataIndex("workqueue");
    const DataIndex schedWakeupId_ = traceDataCache_->GetDataIndex("sched_wakeup");
    const DataIndex schedBlockedReasonId_ = traceDataCache_->GetDataIndex("sched_blocked_reason");
    const DataIndex cpuFrequencyLimitMaxNameId = traceDataCache_->GetDataIndex("cpu_frequency_limits_max");
    const DataIndex cpuFrequencyLimitMinNameId = traceDataCache_->GetDataIndex("cpu_frequency_limits_min");
protected:
    TraceStreamerConfig config_{};
};
} // namespace TraceStreamer
} // namespace SysTuning

#endif // SRC_BYTRACE_EVENT_PARSER_H
