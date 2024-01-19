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

// for libunwind.h empty struct has size 0 in c, size 1 in c++
#define UNW_EMPTY_STRUCT uint8_t unused;

#include "register.h"

#if !is_mingw
#include <sys/utsname.h>
#endif

#if HAVE_LIBUNWIND
#include <libunwind.h>
#endif

#include "debug_logger.h"

namespace OHOS {
namespace Developtools {
namespace NativeDaemon {
static ArchType deviceArchType = ArchType::UNSUPPORT;

size_t RegisterGetSP(ArchType arch)
{
    switch (arch) {
        case ArchType::X86_32:
        case ArchType::X86_64:
            return PERF_REG_X86_SP;
        case ArchType::ARM:
            return PERF_REG_ARM_SP;
        case ArchType::ARM64:
            return PERF_REG_ARM64_SP;
        default:
            return std::numeric_limits<size_t>::max();
    }
}

size_t RegisterGetIP(ArchType arch)
{
    switch (arch) {
        case ArchType::X86_32:
        case ArchType::X86_64:
            return PERF_REG_X86_IP;
        case ArchType::ARM:
            return PERF_REG_ARM_PC;
        case ArchType::ARM64:
            return PERF_REG_ARM64_PC;
        default:
            return std::numeric_limits<size_t>::max();
    }
}

// these copy from kerne uapi perf_regs.h
uint64_t GetSupportedRegMask(ArchType arch)
{
    uint64_t result = 0;
    switch (arch) {
        case ArchType::X86_32:
            result = ((1ULL << PERF_REG_X86_32_MAX) - 1);
            break;
        case ArchType::X86_64:
            result = ((1ULL << PERF_REG_X86_64_MAX) - 1);
            result &= ~((1ULL << PERF_REG_X86_DS) | (1ULL << PERF_REG_X86_ES) |
                        (1ULL << PERF_REG_X86_FS) | (1ULL << PERF_REG_X86_GS));
            break;
        case ArchType::ARM:
            result = ((1ULL << PERF_REG_ARM_MAX) - 1);
            break;
        case ArchType::ARM64:
            result = ((1ULL << PERF_REG_ARM64_MAX) - 1);
            break;
        default:
            result = std::numeric_limits<uint64_t>::max();
            HLOGE("unsupport arch %d", arch);
            break;
    }
    return result;
}

#if HAVE_LIBUNWIND
const std::map<int, int> LibUnwindRegMap = {
#if defined(target_cpu_x86_64)
    {UNW_X86_64_RAX, PERF_REG_X86_AX},  {UNW_X86_64_RDX, PERF_REG_X86_DX},
    {UNW_X86_64_RCX, PERF_REG_X86_CX},  {UNW_X86_64_RBX, PERF_REG_X86_BX},
    {UNW_X86_64_RSI, PERF_REG_X86_SI},  {UNW_X86_64_RDI, PERF_REG_X86_DI},
    {UNW_X86_64_RBP, PERF_REG_X86_BP},  {UNW_X86_64_RSP, PERF_REG_X86_SP},
    {UNW_X86_64_R8, PERF_REG_X86_R8},   {UNW_X86_64_R9, PERF_REG_X86_R9},
    {UNW_X86_64_R10, PERF_REG_X86_R10}, {UNW_X86_64_R11, PERF_REG_X86_R11},
    {UNW_X86_64_R12, PERF_REG_X86_R12}, {UNW_X86_64_R13, PERF_REG_X86_R13},
    {UNW_X86_64_R14, PERF_REG_X86_R14}, {UNW_X86_64_R15, PERF_REG_X86_R15},
    {UNW_X86_64_RIP, PERF_REG_X86_IP},
#elif defined(target_cpu_arm64)
    {UNW_AARCH64_X0, PERF_REG_ARM64_X0},   {UNW_AARCH64_X1, PERF_REG_ARM64_X1},
    {UNW_AARCH64_X2, PERF_REG_ARM64_X2},   {UNW_AARCH64_X3, PERF_REG_ARM64_X3},
    {UNW_AARCH64_X4, PERF_REG_ARM64_X4},   {UNW_AARCH64_X5, PERF_REG_ARM64_X5},
    {UNW_AARCH64_X6, PERF_REG_ARM64_X6},   {UNW_AARCH64_X7, PERF_REG_ARM64_X7},
    {UNW_AARCH64_X8, PERF_REG_ARM64_X8},   {UNW_AARCH64_X9, PERF_REG_ARM64_X9},
    {UNW_AARCH64_X10, PERF_REG_ARM64_X10}, {UNW_AARCH64_X11, PERF_REG_ARM64_X11},
    {UNW_AARCH64_X12, PERF_REG_ARM64_X12}, {UNW_AARCH64_X13, PERF_REG_ARM64_X13},
    {UNW_AARCH64_X14, PERF_REG_ARM64_X14}, {UNW_AARCH64_X15, PERF_REG_ARM64_X15},
    {UNW_AARCH64_X16, PERF_REG_ARM64_X16}, {UNW_AARCH64_X17, PERF_REG_ARM64_X17},
    {UNW_AARCH64_X18, PERF_REG_ARM64_X18}, {UNW_AARCH64_X19, PERF_REG_ARM64_X19},
    {UNW_AARCH64_X20, PERF_REG_ARM64_X20}, {UNW_AARCH64_X21, PERF_REG_ARM64_X21},
    {UNW_AARCH64_X22, PERF_REG_ARM64_X22}, {UNW_AARCH64_X23, PERF_REG_ARM64_X23},
    {UNW_AARCH64_X24, PERF_REG_ARM64_X24}, {UNW_AARCH64_X25, PERF_REG_ARM64_X25},
    {UNW_AARCH64_X26, PERF_REG_ARM64_X26}, {UNW_AARCH64_X27, PERF_REG_ARM64_X27},
    {UNW_AARCH64_X28, PERF_REG_ARM64_X28}, {UNW_AARCH64_X29, PERF_REG_ARM64_X29},
    {UNW_AARCH64_X30, PERF_REG_ARM64_LR},  {UNW_AARCH64_SP, PERF_REG_ARM64_SP},
    {UNW_AARCH64_PC, PERF_REG_ARM64_PC},
#elif defined(target_cpu_arm)
    {UNW_ARM_R13, PERF_REG_ARM_SP},
    {UNW_ARM_R15, PERF_REG_ARM_PC},
#else
#error not support
#endif
};

int LibunwindRegIdToPerfReg(int libUnwindReg)
{
    if (LibUnwindRegMap.count(libUnwindReg)) {
        int ret = LibUnwindRegMap.at(libUnwindReg);
        return ret;
    } else {
        HLOGE("unwind: invalid reg id %d", libUnwindReg);
        return -EINVAL;
    }
}
#endif

const std::string UpdatePerfContext(uint64_t addr, perf_callchain_context &perfCallchainContext)
{
    if (PERF_CONTEXT_NAME.count(addr) != 0) {
        perfCallchainContext = static_cast<perf_callchain_context>(addr);
        return StringPrintf("%s: %" PRIx64 "", PERF_CONTEXT_NAME.at(addr).c_str(), addr);
    } else {
        perfCallchainContext = PERF_CONTEXT_MAX;
        return StringPrintf("unknow context: %" PRIx64 "", addr);
    }
}

const std::string RegisterGetName(size_t registerIndex)
{
    std::string name;
    name.append("PerfReg[");
    name.append(std::to_string(registerIndex));
    if (PERF_REG_NAME_MAP.count(registerIndex) > 0) {
        name.append(":");
        name.append(PERF_REG_NAME_MAP.at(registerIndex));
    }
    name.append("]");
    return name;
}

ArchType GetArchTypeFromUname(const std::string &machine)
{
    if (StringStartsWith(machine, "arm")) {
        if (machine == "armv8l") {
            // 32 bit elf run in 64 bit cpu
            return ArchType::ARM64;
        }
        return ArchType::ARM;
    } else if (machine == "aarch64") {
        return ArchType::ARM64;
    } else if (machine == "x86_64") {
        return ArchType::X86_64;
    } else if (machine == "x86" || machine == "i686") {
        return ArchType::X86_32;
    } else {
        HLOGE("unsupport machine %s", machine.c_str());
        return ArchType::UNSUPPORT;
    }
}

ArchType GetArchTypeFromABI(bool abi32)
{
    if (deviceArchType == ArchType::UNSUPPORT) {
        deviceArchType = GetDeviceArch();
    }
    if (abi32) {
        if (deviceArchType == ArchType::ARM64) {
            return ArchType::ARM;
        } else if (deviceArchType == ArchType::X86_64) {
            return ArchType::X86_32;
        }
    }
    return deviceArchType;
}

ArchType SetDeviceArch(ArchType arch)
{
    HLOGD("deviceArchType change to  %s", GetArchName(arch).c_str());
    deviceArchType = arch;
    return deviceArchType;
}

ArchType GetDeviceArch()
{
#if is_mingw
    return deviceArchType;
#else
    if (deviceArchType != ArchType::UNSUPPORT) {
        return deviceArchType;
    } else {
        utsname systemName;
        if ((uname(&systemName)) != 0) {
            // fallback
            deviceArchType = buildArchType;
        } else {
            deviceArchType = GetArchTypeFromUname(systemName.machine);
            HLOGD("machine arch is %s : %s", systemName.machine,
                  GetArchName(deviceArchType).c_str());
            if (deviceArchType == ArchType::UNSUPPORT) {
                deviceArchType = buildArchType;
            }
        }
    }
    return deviceArchType;
#endif
}

void UpdateRegForABI(ArchType arch, u64 *regs)
{
    if (deviceArchType == ArchType::ARM64 and arch == ArchType::ARM) {
        // arm in arm64
        regs[PERF_REG_ARM_PC] = regs[PERF_REG_ARM64_PC];
    }
}
} // namespace NativeDaemon
} // namespace Developtools
} // namespace OHOS