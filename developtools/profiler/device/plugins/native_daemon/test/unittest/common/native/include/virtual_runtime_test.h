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
#ifndef HIPERF_VIRTUAL_RUNTIME_TEST_H
#define HIPERF_VIRTUAL_RUNTIME_TEST_H

#include "debug_logger.h"
#include "utilities.h"
#include "virtual_runtime.h"
#include "virtual_thread.h"

namespace OHOS {
namespace Developtools {
namespace NativeDaemon {
static const std::string TEST_DWARF_RECORD = "hiperf_643_644_sample_record_213_6754913387560.dump";
constexpr const pid_t TEST_DWARF_RECORD_PID = 643;
constexpr const pid_t TEST_DWARF_RECORD_TID = 644;
/*
 SAMPLE: id= 72 size 8424 pid 643 tid 644 ip nr 0 reg nr 16, stacks 8192 time 6754913387560
 (1/16)unwind symbol:  va: 0x0000000000003539::LoopFunction(int)
 (2/16)unwind symbol:   va: 0x0000000000003645::CallStack10(int, int)
 (3/16)unwind symbol:    va: 0x0000000000003671::CallStack9(int, int)
 (4/16)unwind symbol:     va: 0x00000000000036b5::CallStack8(int, int)
 (5/16)unwind symbol:      va: 0x00000000000036f9::CallStack7(int, int)
 (6/16)unwind symbol:       va: 0x000000000000373d::CallStack6(int, int)
 (7/16)unwind symbol:        va: 0x0000000000003781::CallStack5(int, int)
 (8/16)unwind symbol:         va: 0x00000000000037c5::CallStack4(int, int)
 (9/16)unwind symbol:          va: 0x0000000000003809::CallStack3(int, int)
 (10/16)unwind symbol:           va: 0x000000000000384d::CallStack2(int, int)
 (11/16)unwind symbol:            va: 0x0000000000003891::CallStack1(int, int)
 (12/16)unwind symbol:             va: 0x00000000000038d5::CallStack0(int, int)
 (13/16)unwind symbol:              va: 0x0000000000003919::ExampleThread(int, int)
 (14/16)unwind symbol:               va: 0x0000000000003fe3::void*
 std::__h::__thread_proxy<std::__h::tuple<std::__h::unique_ptr<std::__h::__thread_struct,
 std::__h::default_delete<std::__h::__thread_struct> >, void (*)(int, int), int, int> >(void*)
 (15/16)unwind symbol:                va: 0x000000000005506c::__aeabi_read_tp
 (16/16)unwind symbol:                 va: 0x000000000005506c::__aeabi_read_tp
*/
constexpr const size_t TEST_DWARF_RECORD_STACK_SIZE = 8192u;
static const std::vector<std::pair<uint64_t, std::string>> TEST_RECORD_CALLSTACK_IP_FUNC = {
    {0x0000000000003539, "LoopFunction(int)"}, // base ip sp
    {0x0000000000003645, "CallStack10(int, int)"}, {0x0000000000003671, "CallStack9(int, int)"},
    {0x00000000000036b5, "CallStack8(int, int)"},  {0x00000000000036f9, "CallStack7(int, int)"},
    {0x000000000000373d, "CallStack6(int, int)"},  {0x0000000000003781, "CallStack5(int, int)"},
    {0x00000000000037c5, "CallStack4(int, int)"},  {0x0000000000003809, "CallStack3(int, int)"},
    {0x000000000000384d, "CallStack2(int, int)"},  {0x0000000000003891, "CallStack1(int, int)"},
    {0x00000000000038d5, "CallStack0(int, int)"},  {0x0000000000003919, "ExampleThread(int, int)"},
};
/*
  event_attr:
    type 1, size 120, config 0
    sample_freq 4000
    sample_type (0x133e7)
    read_format (0x7)
    disabled 1, inherit 1, pinned 0, exclusive 0
    exclude_user 0, exclude_kernel 0, exclude_hv 0, exclude_idle 0
    mmap 1, mmap2 1, comm 1, comm_exec 0, freq 1
    inherit_stat 0, enable_on_exec 0, task 0, use_clockid 0
    watermark 0, precise_ip 0, mmap_data 0, clockid 0
    sample_id_all 0, exclude_host 0, exclude_guest 0
    branch_sample_type 0x0
    exclude_callchain_kernel 0, exclude_callchain_user 1
    sample_regs_user 0xffff
    sample_stack_user 0x2000
*/
constexpr const uint64_t TEST_RECORD_SAMPLE_TYPE = 0x133e7;
constexpr const size_t TEST_DWARF_RECORD_REGS_USER = 0xffff;
} // namespace NativeDaemon
} // namespace Developtools
} // namespace OHOS
#endif