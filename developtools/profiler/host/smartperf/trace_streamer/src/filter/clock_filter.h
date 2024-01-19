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

#ifndef CLOCK_FILTER_H
#define CLOCK_FILTER_H

#include <map>
#include <string>
#include <unordered_map>
#include <vector>
#include "filter_base.h"
#include "trace_data_cache.h"
#include "trace_streamer_filters.h"
#include "ts_common.h"

namespace SysTuning {
namespace TraceStreamer {
/*
 * TS_REALTIME:  A settable system-wide clock that measures real time. Its time represents seconds and nanoseconds
 * since the Epoch.
 * TS_REALTIME_COARSE:  A faster but less precise version of TS_REALTIME.  This clock is not settable.
 * TS_MONOTONIC:  The number of seconds that the system has been running since it was booted.The CLOCK_MONOTONIC
 * clock is not affected by discontinuous jumps in the system time ，but is affected by the incremental adjustments
 * performed by adjtime(3) and  NTP. This clock does not count time that the system is  suspended.
 * TS_MONOTONIC_COARSE:  A faster but less precise version of TS_MONOTONIC.
 * TS_MONOTONIC_RAW:  Similar to TS_MONOTONIC, but provides access to a raw  hardware-based time that is not subject
 * to NTP adjustments or the incremental adjustments performed by adjtime(3). This clock does not count time that the
 * system is suspended.
 * TS_BOOTTIME:  A nonsettable system-wide clock that is identical to TS_MONOTONIC, except that it also includes
 * any time that the system is suspended.
 */

using ClockId = uint32_t;
struct SnapShot {
    ClockId clockId;
    uint64_t ts;
};
class ClockFilter : private FilterBase {
public:
    using ConvertClockMap = std::map<uint64_t, int64_t>;

    ClockFilter(TraceDataCache* dataCache, const TraceStreamerFilters* filter);
    ~ClockFilter() override;

    void SetPrimaryClock(ClockId primary)
    {
        primaryClock_ = primary;
    }
    ClockId GetPrimaryClock() const
    {
        return primaryClock_;
    }
    uint64_t ToPrimaryTraceTime(ClockId srcClockId, uint64_t srcTs) const;
    uint64_t Convert(ClockId srcClockId, uint64_t srcTs, ClockId desClockId) const;
    void AddClockSnapshot(const std::vector<SnapShot>& snapShot);
    bool HasInitSnapShot() const
    {
        return hasInitSnapShot_;
    }

private:
    static std::string GenClockKey(ClockId srcClockId, ClockId desClockId);
    void AddConvertClockMap(ClockId srcClockId, ClockId dstClockId, uint64_t srcTs, uint64_t dstTs);

private:
    std::unordered_map<std::string, ConvertClockMap> clockMaps_ = {};

    ClockId primaryClock_;
    bool hasInitSnapShot_ = false;
    TraceDataCache* dataCache_;
};
} // namespace TraceStreamer
} // namespace SysTuning

#endif // CLOCK_FILTER_H
