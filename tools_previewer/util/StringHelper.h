/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

#ifndef STRINGHELPER_H
#define STRINGHELPER_H

#pragma once
#include <string>

class StringHelper {
public:
    enum Encode { ANSI = 1, UTF16_LE, UTF16_BE, UTF8_BOM, UTF8 };
    static Encode IsUtf8Data(const uint8_t* data, size_t size)
    {
        bool bAnsi = true;
        uint8_t ch = 0x00;
        int32_t nBytes = 0;
        int32_t byteNumber[] = {0, 1, 2, 3, 4, 5, 6};
        for (auto i = 0; i < size; i++) {
            ch = *(data + i);
            if ((ch & 0x80) != 0x00) { // The first digit of the byte is 0:0XXX_XXXX
                bAnsi = false;
            }
            if (nBytes == byteNumber[0]) {
                if (ch < 0x80) {
                    continue;
                }
                if (ch >= 0xFC && ch <= 0xFD) {
                    // The char has 6 bytes:1111_110X 10XX_XXXX 10XX_XXXX 10XX_XXXX 10XX_XXXX 10XX_XXXX
                    nBytes = byteNumber[6];
                } else if (ch >= 0xF8) {
                    // The char has 5 bytes:1111_10XX 10XX_XXXX 10XX_XXXX 10XX_XXXX 10XX_XXXX
                    nBytes = byteNumber[5];
                } else if (ch >= 0xF0) {
                    // The char has 4 bytes:1111_0XXX 10XX_XXXX 10XX_XXXX 10XX_XXXX
                    nBytes = byteNumber[4];
                } else if (ch >= 0xE0) {
                    nBytes = byteNumber[3]; // The char has 3 bytes:1110_XXXX 10XX_XXXX 10XX_XXXX
                } else if (ch >= 0xC0) {
                    nBytes = byteNumber[2]; // The char has 2 bytes:110X_XXXX 10XX_XXXX
                } else {
                    return Encode::ANSI;
                }
                nBytes--;
            } else {
                if ((ch & 0xC0) != 0x80) {
                    return Encode::ANSI;
                }
                nBytes--;
            }
        }
        if (nBytes > byteNumber[0] || bAnsi) {
            return Encode::ANSI;
        }
        return Encode::UTF8;
    };

    static Encode DetectEncode(const uint8_t* data, size_t size)
    {
        int utf16HeadLen = 2;
        int utf8HeadLen = 3;
        // Detect the size and the first and second bytes
        if (size > utf16HeadLen && data[0] == 0xFF && data[1] == 0xFE) {
            return Encode::UTF16_LE;
        // Detect the size and the first and second bytes
        } else if (size > utf16HeadLen && data[0] == 0xFE && data[1] == 0xFF) {
            return Encode::UTF16_BE;
        // Detect the size and the first, second, and third bytes
        } else if (size > utf8HeadLen && data[0] == 0xEF && data[1] == 0xBB&& data[2] == 0xBF) { // NOLINT
            return Encode::UTF8_BOM;
        } else {
            return IsUtf8Data(data, size);
        }
    };

    static std::string StringToUtf8(const std::string& str);
    static std::string Utf8ToString(const std::string& str);
};

#endif // STRINGHELPER_H