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

#ifndef BYTRACE_COMMON_TYPES_H
#define BYTRACE_COMMON_TYPES_H

#include <atomic>
#include <string>
#include <unordered_map>
#include "cpu_plugin_result.pb.h"
#include "diskio_plugin_result.pb.h"
#include "hidump_plugin_result.pb.h"
#include "hilog_plugin_result.pb.h"
#include "hisysevent_plugin_result.pb.h"
#include "memory_plugin_result.pb.h"
#include "native_hook_result.pb.h"
#include "network_plugin_result.pb.h"
#include "process_plugin_result.pb.h"
#include "services/common_types.pb.h"
#include "trace_plugin_result.pb.h"
#include "ts_common.h"

namespace SysTuning {
namespace TraceStreamer {
enum ParseResult { ERROR = 0, SUCCESS };
enum RawType { RAW_CPU_IDLE = 1, RAW_SCHED_WAKEUP = 2, RAW_SCHED_WAKING = 3 };
enum Stat : uint32_t {
    RUNNABLE = 0,
    INTERRUPTABLESLEEP = 1,
    UNINTERRUPTIBLESLEEP = 2,
    STOPPED = 4,
    TRACED = 8, // the process is being debug
    EXITDEAD = 16,
    EXITZOMBIE = 32,
    TASKDEAD = 64,
    WAKEKILL = 128,
    WAKING = 256,
    PARKED = 512,
    NOLOAD = 1024,
    TASKNEW = 2048,
    VALID = 0X8000,
};

struct BytraceLine {
    uint64_t ts = 0;
    uint32_t pid = 0;
    uint32_t cpu = 0;

    std::string task;    // thread name
    std::string pidStr;  // thread str
    std::string tGidStr; // process thread_group
    std::string eventName;
    std::string argsStr;
};
enum ParseStatus {
    TS_PARSE_STATUS_INIT = 0,
    TS_PARSE_STATUS_SEPRATED = 1,
    TS_PARSE_STATUS_PARSING = 2,
    TS_PARSE_STATUS_PARSED = 3,
    TS_PARSE_STATUS_INVALID = 4
};
struct DataSegment {
    std::string seg;
    BytraceLine bufLine;
    std::atomic<ParseStatus> status{TS_PARSE_STATUS_INIT};
};
// 注意使用完之后恢复初始化状态，保证下次使用不会出现数据混乱。
struct HtraceDataSegment {
    std::string seg;
    MemoryData memData;
    HilogInfo logData;
    BatchNativeHookData batchNativeHookData;
    HidumpInfo hidumpInfo;
    CpuData cpuInfo;
    NetworkDatas networkInfo;
    DiskioData diskIOInfo;
    ProcessData processInfo;
    HisyseventInfo hisyseventInfo;
    uint64_t timeStamp;
    std::unique_ptr<TracePluginResult> traceData;
    BuiltinClocks clockId;
    DataSourceType dataType;
    std::atomic<ParseStatus> status{TS_PARSE_STATUS_INIT};
};

class TracePoint {
public:
    TracePoint() {}
    TracePoint(const TracePoint& point)
    {
        phase_ = point.phase_;
        tgid_ = point.tgid_;
        name_ = point.name_;
        value_ = point.value_;
        categoryGroup_ = point.categoryGroup_;
        chainId_ = point.chainId_;
        spanId_ = point.spanId_;
        parentSpanId_ = point.parentSpanId_;
        flag_ = point.flag_;
        args_ = point.args_;
    }
    void operator=(const TracePoint& point)
    {
        phase_ = point.phase_;
        tgid_ = point.tgid_;
        name_ = point.name_;
        value_ = point.value_;
        categoryGroup_ = point.categoryGroup_;
        chainId_ = point.chainId_;
        spanId_ = point.spanId_;
        parentSpanId_ = point.parentSpanId_;
        flag_ = point.flag_;
        args_ = point.args_;
    }
    char phase_ = '\0';
    uint32_t tgid_ = 0;
    std::string name_ = "";
    uint64_t value_ = 0;
    std::string categoryGroup_ = "";
    // Distributed Data
    std::string chainId_ = "";
    std::string spanId_ = "";
    std::string parentSpanId_ = "";
    std::string flag_ = "";
    std::string args_ = "";
};
} // namespace TraceStreamer
} // namespace SysTuning
#endif // _BYTRACE_COMMON_TYPES_H_
