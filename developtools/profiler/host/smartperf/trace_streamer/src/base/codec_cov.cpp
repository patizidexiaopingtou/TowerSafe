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

#include "codec_cov.h"

#include <memory>
#ifdef _WIN32
#include <windows.h>
#endif

namespace SysTuning {
namespace base {
int PreNum(unsigned char byte)
{
    constexpr uint32_t BITS = 8;
    unsigned char mask = 0x80;
    int num = 0;
    for (uint32_t i = 0; i < BITS; i++) {
        if ((byte & mask) == mask) {
            mask = mask >> 1;
            num++;
        } else {
            break;
        }
    }
    return num;
}

bool IsUTF8(const uint8_t* data, int len)
{
    constexpr uint8_t MASK = 0x80;
    constexpr uint8_t FIRST_BYTE = 0xc0;
    constexpr int TARGET = 2;
    int num = 0;
    int i = 0;
    while (i < len) {
        if ((data[i] & MASK) == 0x00) {
            i++;
            continue;
        }
        if ((num = PreNum(data[i])) <= TARGET) {
            return false;
        }
        i++;
        for (int j = 0; j < num - 1; j++) {
            if ((data[i] & FIRST_BYTE) != MASK) {
                return false;
            }
            i++;
        }
    }
    return true;
}

bool IsGBK(const uint8_t* data, int len)
{
    constexpr int STEP = 2;
    constexpr uint8_t ASCII_END = 0x7f;
    constexpr uint8_t FIRST_BYTE = 0x81;
    constexpr uint8_t FIRST_BYTE_END = 0xfe;
    constexpr uint8_t SECOND_BYTE_ONE = 0x40;
    constexpr uint8_t SECOND_BYTE_TWO_END = 0xfe;
    constexpr uint8_t GBK_MASK = 0xf7;
    int i = 0;
    while (i < len) {
        if (data[i] <= ASCII_END) {
            i++;
            continue;
        } else {
            if (data[i] >= FIRST_BYTE && data[i] <= FIRST_BYTE_END && data[i + 1] >= SECOND_BYTE_ONE &&
                data[i + 1] <= SECOND_BYTE_TWO_END && data[i + 1] != GBK_MASK) {
                i += STEP;
                continue;
            } else {
                return false;
            }
        }
    }
    return true;
}

CODING GetCoding(const uint8_t* data, int len)
{
    CODING coding;
    if (IsUTF8(data, len)) {
        coding = UTF8;
    } else if (IsGBK(data, len)) {
        coding = GBK;
    } else {
        coding = UNKOWN;
    }
    return coding;
}

#ifdef _WIN32
std::string GbkToUtf8(const char* srcStr)
{
    int len = MultiByteToWideChar(CP_ACP, 0, srcStr, -1, NULL, 0);
    std::unique_ptr<wchar_t[]> wstr = std::make_unique<wchar_t[]>(len + 1);
    MultiByteToWideChar(CP_ACP, 0, srcStr, -1, wstr.get(), len);
    len = WideCharToMultiByte(CP_UTF8, 0, wstr.get(), -1, NULL, 0, NULL, NULL);
    std::unique_ptr<char[]> str = std::make_unique<char[]>(len + 1);
    WideCharToMultiByte(CP_UTF8, 0, wstr.get(), -1, str.get(), len, NULL, NULL);
    return std::string(str.get());
}
#endif
} // namespace base
} // namespace SysTuning
