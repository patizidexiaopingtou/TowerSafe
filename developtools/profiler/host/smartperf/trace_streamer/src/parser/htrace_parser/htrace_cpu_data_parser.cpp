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
#include "htrace_cpu_data_parser.h"
#include "clock_filter.h"
#include "htrace_event_parser.h"
#include "process_filter.h"
#include "stat_filter.h"
namespace SysTuning {
namespace TraceStreamer {
HtraceCpuDataParser::HtraceCpuDataParser(TraceDataCache* dataCache, const TraceStreamerFilters* ctx)
    : HtracePluginTimeParser(dataCache, ctx)
{
}

HtraceCpuDataParser::~HtraceCpuDataParser()
{
    TS_LOGI("cpuData ts MIN:%llu, MAX:%llu", static_cast<unsigned long long>(GetPluginStartTime()),
            static_cast<unsigned long long>(GetPluginEndTime()));
}
void HtraceCpuDataParser::Parse(CpuData& tracePacket, uint64_t ts)
{
    if (!tracePacket.has_cpu_usage_info() && !tracePacket.thread_info_size()) {
        return;
    }
    if (tracePacket.has_cpu_usage_info()) {
        auto cpuInfo = tracePacket.cpu_usage_info();
        auto userLoad = tracePacket.user_load();
        auto sysLoad = tracePacket.sys_load();
        auto process_num = tracePacket.process_num();
        ts = streamFilters_->clockFilter_->ToPrimaryTraceTime(TS_CLOCK_REALTIME, ts);
        UpdatePluginTimeRange(TS_CLOCK_REALTIME, ts, ts);
        auto cpuUsage = std::make_unique<TsCpuData>();
        streamFilters_->statFilter_->IncreaseStat(TRACE_CPU_USAGE, STAT_EVENT_RECEIVED);
        cpuUsage->SetCpuUsage(ts, cpuInfo);
        cpuUsage->SetExtInfo(tracePacket.total_load(), userLoad, sysLoad, process_num);
        cpuData_.push_back(std::move(cpuUsage));
    }
}
void HtraceCpuDataParser::Finish()
{
    auto cmp = [](const std::unique_ptr<TsCpuData>& a, const std::unique_ptr<TsCpuData>& b) { return a->ts_ < b->ts_; };
    std::sort(cpuData_.begin(), cpuData_.end(), cmp);
    bool firstTime = true;
    uint64_t lastTs = 0;
    for (auto itor = cpuData_.begin(); itor != cpuData_.end(); itor++) {
        auto newTimeStamp = (*itor)->ts_;
        if (firstTime) {
            lastTs = newTimeStamp;
            firstTime = false;
            continue;
        }
        auto dur = newTimeStamp - lastTs;
        auto durMs = (*itor)->cpuUsageData_->system_boot_time_ms() - (*itor)->cpuUsageData_->prev_system_boot_time_ms();
        durMs = durMs == 0 ? 1 : durMs;
        traceDataCache_->GetCpuUsageInfoData()->AppendNewData(
            newTimeStamp, dur,
            (*itor)->totalLoad_,
            (*itor)->userLoad_, (*itor)->sysLoad_, (*itor)->process_num_);
        lastTs = newTimeStamp;
    }
    cpuData_.clear();
    traceDataCache_->MixTraceTime(GetPluginStartTime(), GetPluginEndTime());
}
} // namespace TraceStreamer
} // namespace SysTuning
