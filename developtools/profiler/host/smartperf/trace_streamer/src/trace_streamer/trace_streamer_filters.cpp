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

#include "trace_streamer_filters.h"
#include "args_filter.h"
#include "binder_filter.h"
#include "clock_filter.h"
#include "cpu_filter.h"
#include "filter_filter.h"
#include "hi_sysevent_measure_filter.h"
#include "irq_filter.h"
#include "measure_filter.h"
#include "perf_data_filter.h"
#include "process_filter.h"
#include "slice_filter.h"
#include "stat_filter.h"
#include "symbols_filter.h"
#include "system_event_measure_filter.h"

namespace SysTuning {
namespace TraceStreamer {
TraceStreamerFilters::TraceStreamerFilters() = default;
TraceStreamerFilters::~TraceStreamerFilters() = default;
} // namespace TraceStreamer
} // namespace SysTuning
