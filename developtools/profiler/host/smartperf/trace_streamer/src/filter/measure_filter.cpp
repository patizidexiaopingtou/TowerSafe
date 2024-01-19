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

#include "measure_filter.h"
#include "filter_filter.h"
#include "log.h"
#include "ts_common.h"

namespace SysTuning {
namespace TraceStreamer {
MeasureFilter::MeasureFilter(TraceDataCache* dataCache, const TraceStreamerFilters* filter, FilterType e)
    : FilterBase(dataCache, filter),
      tidStreamIdFilterIdMap_(INVALID_UINT64),
      filterType_(e)
{
}

MeasureFilter::~MeasureFilter() {}

bool MeasureFilter::AppendNewMeasureData(uint64_t internalTid, DataIndex nameIndex, uint64_t timestamp, int64_t value)
{
    auto filterId = GetOrCreateFilterId(internalTid, nameIndex);
    if (filterType_ == E_PROCESS_MEASURE_FILTER) {
        traceDataCache_->GetProcessMeasureData()->AppendMeasureData(0, timestamp, value, filterId);
    } else {
        traceDataCache_->GetMeasureData()->AppendMeasureData(0, timestamp, value, filterId);
    }
    return value != 0;
}
uint32_t MeasureFilter::GetOrCreateFilterId(uint64_t internalTid, DataIndex nameIndex)
{
    auto filterId = tidStreamIdFilterIdMap_.Find(internalTid, nameIndex);
    if (filterId != INVALID_UINT64) {
        return static_cast<uint32_t>(filterId);
    }

    uint32_t newFilterId = streamFilters_->filterFilter_->AddFilter(
        filterTypeValue.at(filterType_), traceDataCache_->GetDataFromDict(nameIndex), internalTid);
    AddCertainFilterId(internalTid, nameIndex, newFilterId);
    return newFilterId;
}

void MeasureFilter::AddCertainFilterId(uint64_t internalTid, DataIndex nameIndex, uint64_t filterId)
{
    tidStreamIdFilterIdMap_.Insert(internalTid, nameIndex, filterId);

    if (filterType_ == E_THREADMEASURE_FILTER) {
        traceDataCache_->GetThreadMeasureFilterData()->AppendNewFilter(filterId, static_cast<uint32_t>(nameIndex),
                                                                       internalTid);
    } else if (filterType_ == E_THREAD_FILTER) {
        traceDataCache_->GetThreadFilterData()->AppendNewFilter(filterId, static_cast<uint32_t>(nameIndex),
                                                                internalTid);
    } else if (filterType_ == E_PROCESS_MEASURE_FILTER) {
        traceDataCache_->GetProcessMeasureFilterData()->AppendNewFilter(
            static_cast<uint32_t>(filterId), static_cast<uint32_t>(nameIndex), static_cast<uint32_t>(internalTid));
    } else if (filterType_ == E_PROCESS_FILTER_FILTER) {
        traceDataCache_->GetProcessFilterData()->AppendNewFilter(
            static_cast<uint32_t>(filterId), static_cast<uint32_t>(nameIndex), static_cast<uint32_t>(internalTid));
    } else if (filterType_ == E_CPU_MEASURE_FILTER) {
        traceDataCache_->GetCpuMeasuresData()->AppendNewFilter(filterId, static_cast<uint32_t>(nameIndex), internalTid);
    } else if (filterType_ == E_CLOCK_RATE_FILTER) {
        traceDataCache_->GetClockEventFilterData()->AppendNewFilter(filterId, clockSetRateDataIndex_,
            static_cast<uint32_t>(nameIndex), internalTid);
    } else if (filterType_ == E_CLOCK_ENABLE_FILTER) {
        traceDataCache_->GetClockEventFilterData()->AppendNewFilter(filterId, clockEnableDataIndex_,
            static_cast<uint32_t>(nameIndex), internalTid);
    } else if (filterType_ == E_CLOCK_DISABLE_FILTER) {
        traceDataCache_->GetClockEventFilterData()->AppendNewFilter(filterId, clockDisableDataIndex_,
            static_cast<uint32_t>(nameIndex), internalTid);
    } else if (filterType_ == E_CLK_RATE_FILTER) {
        traceDataCache_->GetClkEventFilterData()->AppendNewFilter(filterId, clkSetRateDataIndex_,
            static_cast<uint32_t>(nameIndex), internalTid);
    } else if (filterType_ == E_CLK_ENABLE_FILTER) {
        traceDataCache_->GetClkEventFilterData()->AppendNewFilter(filterId, clkEnableDataIndex_,
            static_cast<uint32_t>(nameIndex), internalTid);
    } else if (filterType_ == E_CLK_DISABLE_FILTER) {
        traceDataCache_->GetClkEventFilterData()->AppendNewFilter(filterId, clkDisableDataIndex_,
            static_cast<uint32_t>(nameIndex), internalTid);
    }
}
void MeasureFilter::Clear()
{
    tidStreamIdFilterIdMap_.Clear();
}
} // namespace TraceStreamer
} // namespace SysTuning
