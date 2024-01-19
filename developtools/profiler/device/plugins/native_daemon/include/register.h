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
#ifndef HIPERF_REGISTER_H
#define HIPERF_REGISTER_H

#include <linux/perf_event.h>

#include <cinttypes>
#include <string>

#include "utilities.h"

namespace OHOS {
namespace Developtools {
namespace NativeDaemon {
// these define copy from kernel uapi
enum perf_event_x86_regs {
    PERF_REG_X86_AX,
    PERF_REG_X86_BX,
    PERF_REG_X86_CX,
    PERF_REG_X86_DX,
    PERF_REG_X86_SI,
    PERF_REG_X86_DI,
    PERF_REG_X86_BP,
    PERF_REG_X86_SP,
    PERF_REG_X86_IP,
    PERF_REG_X86_FLAGS,
    PERF_REG_X86_CS,
    PERF_REG_X86_SS,
    PERF_REG_X86_DS,
    PERF_REG_X86_ES,
    PERF_REG_X86_FS,
    PERF_REG_X86_GS,
    PERF_REG_X86_R8,
    PERF_REG_X86_R9,
    PERF_REG_X86_R10,
    PERF_REG_X86_R11,
    PERF_REG_X86_R12,
    PERF_REG_X86_R13,
    PERF_REG_X86_R14,
    PERF_REG_X86_R15,
    PERF_REG_X86_32_MAX = PERF_REG_X86_GS + 1,
    PERF_REG_X86_64_MAX = PERF_REG_X86_R15 + 1,
};

enum perf_event_arm64_regs {
    PERF_REG_ARM64_X0,
    PERF_REG_ARM64_X1,
    PERF_REG_ARM64_X2,
    PERF_REG_ARM64_X3,
    PERF_REG_ARM64_X4,
    PERF_REG_ARM64_X5,
    PERF_REG_ARM64_X6,
    PERF_REG_ARM64_X7,
    PERF_REG_ARM64_X8,
    PERF_REG_ARM64_X9,
    PERF_REG_ARM64_X10,
    PERF_REG_ARM64_X11,
    PERF_REG_ARM64_X12,
    PERF_REG_ARM64_X13,
    PERF_REG_ARM64_X14,
    PERF_REG_ARM64_X15,
    PERF_REG_ARM64_X16,
    PERF_REG_ARM64_X17,
    PERF_REG_ARM64_X18,
    PERF_REG_ARM64_X19,
    PERF_REG_ARM64_X20,
    PERF_REG_ARM64_X21,
    PERF_REG_ARM64_X22,
    PERF_REG_ARM64_X23,
    PERF_REG_ARM64_X24,
    PERF_REG_ARM64_X25,
    PERF_REG_ARM64_X26,
    PERF_REG_ARM64_X27,
    PERF_REG_ARM64_X28,
    PERF_REG_ARM64_X29,
    PERF_REG_ARM64_LR,
    PERF_REG_ARM64_SP,
    PERF_REG_ARM64_PC,
    PERF_REG_ARM64_MAX,
};

enum perf_event_arm_regs {
    PERF_REG_ARM_SP,
    PERF_REG_ARM_PC,
    PERF_REG_ARM_MAX,
};

enum ArchType {
    X86_32,
    X86_64,
    ARM,
    ARM64,
    UNSUPPORT,
};

// order is IP , SP for ut
static const std::map<size_t, const std::string> PERF_REG_NAME_MAP = {
#if defined(target_cpu_x86_64)
    {PERF_REG_X86_IP, "PERF_REG_X86_IP"},
    {PERF_REG_X86_SP, "PERF_REG_X86_SP"},
#elif defined(target_cpu_arm)
    {PERF_REG_ARM_PC, "PERF_REG_ARM_PC"},
    {PERF_REG_ARM_SP, "PERF_REG_ARM_SP"},
#elif defined(target_cpu_arm64)
    {PERF_REG_ARM64_PC, "PERF_REG_ARM64_PC"},
    {PERF_REG_ARM64_SP, "PERF_REG_ARM64_SP"},
#endif
};

// context name
static const std::map<uint64_t, const std::string> PERF_CONTEXT_NAME = {
    {PERF_CONTEXT_HV, "PERF_CONTEXT_HV"},
    {PERF_CONTEXT_KERNEL, "PERF_CONTEXT_KERNEL"},
    {PERF_CONTEXT_USER, "PERF_CONTEXT_USER"},
    {PERF_CONTEXT_GUEST, "PERF_CONTEXT_GUEST"},
    {PERF_CONTEXT_GUEST_KERNEL, "PERF_CONTEXT_GUEST_KERNEL"},
    {PERF_CONTEXT_GUEST_USER, "PERF_CONTEXT_GUEST_USER"},
    {PERF_CONTEXT_MAX, "PERF_CONTEXT_MAX"},
};

#if defined(target_cpu_x86_64)
constexpr ArchType buildArchType = ArchType::X86_64;
#elif defined(target_cpu_arm64)
constexpr ArchType buildArchType = ArchType::ARM64;
#elif defined(target_cpu_arm)
constexpr ArchType buildArchType = ArchType::ARM;
#else
#error NOT SUPPORT ARCH
#endif

const std::string UpdatePerfContext(uint64_t addr, perf_callchain_context &perfCallchainContext);

uint64_t GetSupportedRegMask(ArchType arch);

// this is only for debug
const std::string RegisterGetName(size_t registerIndex);

size_t RegisterGetCount();

size_t RegisterGetSP(ArchType arch);

inline const std::string GetArchName(ArchType arch)
{
    switch (arch) {
        case ArchType::X86_32:
            return "X86_32";
        case ArchType::X86_64:
            return "X86_64";
        case ArchType::ARM:
            return "ARM";
        case ArchType::ARM64:
            return "ARM64";
        default:
            return "Unsupport";
    }
}

size_t RegisterGetIP(ArchType arch);

inline size_t RegisterGetCount()
{
    switch (buildArchType) {
        case ArchType::X86_32:
            return PERF_REG_X86_32_MAX;
        case ArchType::X86_64:
            return PERF_REG_X86_64_MAX;
        case ArchType::ARM:
            return PERF_REG_ARM_MAX;
        case ArchType::ARM64:
            return PERF_REG_ARM64_MAX;
        default: {
            HLOGM("Registers in an unknown CPU.");
            return std::numeric_limits<size_t>::max();
        }
    }
}

inline bool RegisterGetValue(uint64_t &value, const u64 registers[], const size_t registerIndex,
    const size_t registerNumber)
{
    if (registerIndex >= registerNumber) {
        HLOGE("registerIndex is %zu, max is %zu", registerIndex, registerNumber);
        return false;
    }
    value = registers[registerIndex];
    return true;
}

inline bool RegisterGetSPValue(uint64_t &value, ArchType arch, const u64 registers[],
                               const size_t registerNumber)
{
    return RegisterGetValue(value, registers, RegisterGetSP(arch), registerNumber);
}

inline bool RegisterGetIPValue(uint64_t &value, ArchType arch, const u64 registers[],
                               const size_t registerNumber)
{
    return RegisterGetValue(value, registers, RegisterGetIP(arch), registerNumber);
}

int LibunwindRegIdToPerfReg(int regnum);

ArchType GetDeviceArch();
ArchType SetDeviceArch(ArchType arch);
ArchType GetArchTypeFromUname(const std::string &machine);
ArchType GetArchTypeFromABI(bool abi32);
void UpdateRegForABI(ArchType arch, u64 registers[]);
} // namespace NativeDaemon
} // namespace Developtools
} // namespace OHOS
#endif