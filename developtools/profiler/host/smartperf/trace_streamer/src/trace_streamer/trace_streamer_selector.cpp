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

#include "trace_streamer_selector.h"
#include <algorithm>
#include <chrono>
#include <functional>
#include <regex>
#include "args_filter.h"
#include "binder_filter.h"
#include "clock_filter.h"
#include "cpu_filter.h"
#include "file.h"
#include "filter_filter.h"
#include "hi_sysevent_measure_filter.h"
#include "irq_filter.h"
#include "measure_filter.h"
#include "parser/bytrace_parser/bytrace_parser.h"
#include "parser/htrace_parser/htrace_parser.h"
#if WITH_PERF
#include "perf_data_filter.h"
#endif
#include "process_filter.h"
#include "slice_filter.h"
#include "stat_filter.h"
#include "string_help.h"
#include "symbols_filter.h"
#include "system_event_measure_filter.h"

using namespace SysTuning::base;
namespace SysTuning {
namespace TraceStreamer {
namespace {
TraceFileType GuessFileType(const uint8_t* data, size_t size)
{
    if (size == 0) {
        return TRACE_FILETYPE_UN_KNOW;
    }
    std::string start(reinterpret_cast<const char*>(data), std::min<size_t>(size, 20));
    if (start.find("# tracer") != std::string::npos) {
        return TRACE_FILETYPE_BY_TRACE;
    }
    if (start.find("# TRACE") != std::string::npos) {
        return TRACE_FILETYPE_BY_TRACE;
    }
    if (start.find("# SYSEVENT") != std::string::npos) {
        return TRACE_FILETYPE_SYSEVENT;
    }
    if (start.find("# sysevent") != std::string::npos) {
        return TRACE_FILETYPE_SYSEVENT;
    }
    if ((start.compare(0, std::string("<!DOCTYPE html>").length(), "<!DOCTYPE html>") == 0) ||
        (start.compare(0, std::string("<html>").length(), "<html>") == 0)) {
        return TRACE_FILETYPE_BY_TRACE;
    }
    if (start.compare(0, std::string("\x0a").length(), "\x0a") == 0) {
        return TRACE_FILETYPE_UN_KNOW;
    }
    if (start.compare(0, std::string("OHOSPROF").length(), "OHOSPROF") == 0) {
        return TRACE_FILETYPE_H_TRACE;
    }
    const std::regex bytraceMatcher = std::regex(R"(-(\d+)\s+\(?\s*(\d+|-+)?\)?\s?\[(\d+)\]\s*)"
                                            R"([a-zA-Z0-9.]{0,5}\s+(\d+\.\d+):\s+(\S+):)");
    std::smatch matcheLine;
    std::string bytraceMode(reinterpret_cast<const char*>(data), size);
    if (std::regex_search(bytraceMode, matcheLine, bytraceMatcher)) {
        return TRACE_FILETYPE_BY_TRACE;
    }
    return TRACE_FILETYPE_UN_KNOW;
}
} // namespace

TraceStreamerSelector::TraceStreamerSelector()
    : fileType_(TRACE_FILETYPE_UN_KNOW), bytraceParser_(nullptr), htraceParser_(nullptr)
{
    InitFilter();
}
TraceStreamerSelector::~TraceStreamerSelector() {}

void TraceStreamerSelector::InitFilter()
{
    streamFilters_ = std::make_unique<TraceStreamerFilters>();
    traceDataCache_ = std::make_unique<TraceDataCache>();
    streamFilters_->cpuFilter_ = std::make_unique<CpuFilter>(traceDataCache_.get(), streamFilters_.get());
    streamFilters_->sliceFilter_ = std::make_unique<SliceFilter>(traceDataCache_.get(), streamFilters_.get());

    streamFilters_->processFilter_ = std::make_unique<ProcessFilter>(traceDataCache_.get(), streamFilters_.get());
    streamFilters_->clockFilter_ = std::make_unique<ClockFilter>(traceDataCache_.get(), streamFilters_.get());
    streamFilters_->filterFilter_ = std::make_unique<FilterFilter>(traceDataCache_.get(), streamFilters_.get());

    streamFilters_->threadMeasureFilter_ =
        std::make_unique<MeasureFilter>(traceDataCache_.get(), streamFilters_.get(), E_THREADMEASURE_FILTER);
    streamFilters_->threadFilter_ =
        std::make_unique<MeasureFilter>(traceDataCache_.get(), streamFilters_.get(), E_THREAD_FILTER);
    streamFilters_->cpuMeasureFilter_ =
        std::make_unique<MeasureFilter>(traceDataCache_.get(), streamFilters_.get(), E_CPU_MEASURE_FILTER);
    streamFilters_->processMeasureFilter_ =
        std::make_unique<MeasureFilter>(traceDataCache_.get(), streamFilters_.get(), E_PROCESS_MEASURE_FILTER);
    streamFilters_->processFilterFilter_ =
        std::make_unique<MeasureFilter>(traceDataCache_.get(), streamFilters_.get(), E_PROCESS_FILTER_FILTER);
    streamFilters_->symbolsFilter_ = std::make_unique<SymbolsFilter>(traceDataCache_.get(), streamFilters_.get());
    streamFilters_->statFilter_ = std::make_unique<StatFilter>(traceDataCache_.get(), streamFilters_.get());
    streamFilters_->binderFilter_ = std::make_unique<BinderFilter>(traceDataCache_.get(), streamFilters_.get());
    streamFilters_->argsFilter_ = std::make_unique<ArgsFilter>(traceDataCache_.get(), streamFilters_.get());
    streamFilters_->irqFilter_ = std::make_unique<IrqFilter>(traceDataCache_.get(), streamFilters_.get());
    streamFilters_->clockRateFilter_ =
        std::make_unique<MeasureFilter>(traceDataCache_.get(), streamFilters_.get(), E_CLOCK_RATE_FILTER);
    streamFilters_->clockEnableFilter_ =
        std::make_unique<MeasureFilter>(traceDataCache_.get(), streamFilters_.get(), E_CLOCK_ENABLE_FILTER);
    streamFilters_->clockDisableFilter_ =
        std::make_unique<MeasureFilter>(traceDataCache_.get(), streamFilters_.get(), E_CLOCK_DISABLE_FILTER);
    streamFilters_->clkRateFilter_ =
        std::make_unique<MeasureFilter>(traceDataCache_.get(), streamFilters_.get(), E_CLK_RATE_FILTER);
    streamFilters_->clkEnableFilter_ =
        std::make_unique<MeasureFilter>(traceDataCache_.get(), streamFilters_.get(), E_CLK_ENABLE_FILTER);
    streamFilters_->clkDisableFilter_ =
        std::make_unique<MeasureFilter>(traceDataCache_.get(), streamFilters_.get(), E_CLK_DISABLE_FILTER);
    streamFilters_->sysEventMemMeasureFilter_ =
        std::make_unique<SystemEventMeasureFilter>(traceDataCache_.get(), streamFilters_.get(), E_SYS_MEMORY_FILTER);
    streamFilters_->sysEventVMemMeasureFilter_ = std::make_unique<SystemEventMeasureFilter>(
        traceDataCache_.get(), streamFilters_.get(), E_SYS_VIRTUAL_MEMORY_FILTER);
#if WITH_PERF
    streamFilters_->perfDataFilter_ = std::make_unique<PerfDataFilter>(traceDataCache_.get(), streamFilters_.get());
#endif
    streamFilters_->sysEventSourceFilter_ = std::make_unique<SystemEventMeasureFilter>(
        traceDataCache_.get(), streamFilters_.get(), E_SYS_EVENT_SOURCE_FILTER);
    streamFilters_->hiSysEventMeasureFilter_ =
        std::make_unique<HiSysEventMeasureFilter>(traceDataCache_.get(), streamFilters_.get());
}

void TraceStreamerSelector::WaitForParserEnd()
{
    if (fileType_ == TRACE_FILETYPE_H_TRACE) {
        htraceParser_->WaitForParserEnd();
    }
    if (fileType_ == TRACE_FILETYPE_BY_TRACE) {
        bytraceParser_->WaitForParserEnd();
    }
    traceDataCache_->UpdateTraceRange();
}

MetaData* TraceStreamerSelector::GetMetaData()
{
    return traceDataCache_->GetMetaData();
}

void TraceStreamerSelector::SetDataType(TraceFileType type)
{
    fileType_ = type;
    if (fileType_ == TRACE_FILETYPE_H_TRACE) {
        htraceParser_ = std::make_unique<HtraceParser>(traceDataCache_.get(), streamFilters_.get());
    } else if (fileType_ == TRACE_FILETYPE_BY_TRACE) {
        bytraceParser_ = std::make_unique<BytraceParser>(traceDataCache_.get(), streamFilters_.get());
    }
}
bool TraceStreamerSelector::ParseTraceDataSegment(std::unique_ptr<uint8_t[]> data, size_t size)
{
    if (size == 0) {
        return true;
    }
    if (fileType_ == TRACE_FILETYPE_UN_KNOW) {
        fileType_ = GuessFileType(data.get(), size);
        if (fileType_ == TRACE_FILETYPE_H_TRACE) {
            htraceParser_ = std::make_unique<HtraceParser>(traceDataCache_.get(), streamFilters_.get());
        } else if (fileType_ == TRACE_FILETYPE_BY_TRACE || fileType_ == TRACE_FILETYPE_SYSEVENT) {
            bytraceParser_ = std::make_unique<BytraceParser>(traceDataCache_.get(), streamFilters_.get());
            bytraceParser_->EnableBytrace(fileType_ == TRACE_FILETYPE_BY_TRACE);
        }
        if (fileType_ == TRACE_FILETYPE_UN_KNOW) {
            SetAnalysisResult(TRACE_PARSER_FILE_TYPE_ERROR);
            TS_LOGI(
                "File type is not supported!,\nthe head content is:%s\n ---waring!!!---\n"
                "File type is not supported!,\n",
                data.get());
            return false;
        }
    }
    if (fileType_ == TRACE_FILETYPE_H_TRACE) {
        htraceParser_->ParseTraceDataSegment(std::move(data), size);
    } else if (fileType_ == TRACE_FILETYPE_BY_TRACE || fileType_ == TRACE_FILETYPE_SYSEVENT) {
        bytraceParser_->ParseTraceDataSegment(std::move(data), size);
    }
    SetAnalysisResult(TRACE_PARSER_NORMAL);
    return true;
}
void TraceStreamerSelector::EnableMetaTable(bool enabled)
{
    traceDataCache_->EnableMetaTable(enabled);
}

void TraceStreamerSelector::SetCleanMode(bool cleanMode)
{
    g_cleanMode = true;
}
int TraceStreamerSelector::ExportDatabase(const std::string& outputName) const
{
    traceDataCache_->UpdateTraceRange();
    return traceDataCache_->ExportDatabase(outputName);
}
void TraceStreamerSelector::Clear()
{
    traceDataCache_->Prepare();
    traceDataCache_->Clear();
}
int TraceStreamerSelector::SearchData()
{
    return traceDataCache_->SearchData();
}
int TraceStreamerSelector::OperateDatabase(const std::string& sql)
{
    return traceDataCache_->OperateDatabase(sql);
}
int TraceStreamerSelector::SearchDatabase(const std::string& sql,
    TraceDataDB::ResultCallBack resultCallBack)
{
    return traceDataCache_->SearchDatabase(sql, resultCallBack);
}
int TraceStreamerSelector::SearchDatabase(const std::string& sql, uint8_t* out, int outLen)
{
    return traceDataCache_->SearchDatabase(sql, out, outLen);
}
int TraceStreamerSelector::UpdateTraceRangeTime(uint8_t* data, int len)
{
    std::string traceRangeStr;
    memcpy(&traceRangeStr, data, len);
    int pos;
    int size = traceRangeStr.size();
    std::vector<string> vTraceRangeStr;
    for (int i = 0; i < size; i++) {
        pos = traceRangeStr.find(";", i);
        if (pos == std::string::npos) {
            break;
        }
        if (pos < size) {
            std::string s = traceRangeStr.substr(i, pos - i);
            vTraceRangeStr.push_back(s);
            i = pos;
        }
    }
    uint64_t minTs = std::stoull(vTraceRangeStr.at(0));
    uint64_t maxTs = std::stoull(vTraceRangeStr.at(1));
    traceDataCache_->UpdateTraceTime(minTs);
    traceDataCache_->UpdateTraceTime(maxTs);
    return 0;
}
void TraceStreamerSelector::SetCancel(bool cancel)
{
    traceDataCache_->SetCancel(cancel);
}
} // namespace TraceStreamer
} // namespace SysTuning
