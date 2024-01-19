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

#include "sysparamdynamic_fuzzer.h"
#include "libfscrypt/fscrypt_sysparam.h"
#include <securec.h>
#include <cstddef>
#include <cstdint>
#define MAX_NUM 100

namespace OHOS {
bool SysparamDynamicFuzzTest(const uint8_t *data, size_t size)
{
    if ((data == nullptr) || (size < sizeof(unsigned int))) {
        return false;
    }

    char character[MAX_NUM] = { 0x00 };
    if (EOK != memcpy_s(character, sizeof(character)-1, data, size)) {
        return false;
    }

    unsigned int len[MAX_NUM] = { 0x00 };
    if (EOK != memcpy_s(len, sizeof(len)-1, data, size)) {
        return false;
    }

    GetFscryptParameter(character, character, character, len);
    SetFscryptParameter(character, character);
    return true;
}
} // namespace OHOS

/* Fuzzer entry point */
extern "C" int LLVMFuzzerTestOneInput(const uint8_t *data, size_t size)
{
    /* Run your code on data */
    OHOS::SysparamDynamicFuzzTest(data, size);
    return 0;
}
