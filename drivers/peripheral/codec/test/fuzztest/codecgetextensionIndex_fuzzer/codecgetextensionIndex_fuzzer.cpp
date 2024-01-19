/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

#include "codecgetextensionIndex_fuzzer.h"
#include "codeccommon_fuzzer.h"

#include <securec.h>

namespace {
    struct AllParameters {
        char *paramName;
        uint32_t *indexType;
    };
}

namespace OHOS {
namespace Codec {
    bool CodecGetExtensionIndex(const uint8_t* data, size_t size)
    {
        struct AllParameters params;
        if (data == nullptr) {
            return false;
        }

        if (memcpy_s((void *)&params, sizeof(params), data, sizeof(params)) != 0) {
            return false;
        }

        bool result = false;
        result = Preconditions();
        if (!result) {
            HDF_LOGE("%{public}s: Preconditions failed\n", __func__);
            return false;
        }

        int32_t ret = component->GetExtensionIndex(component, params.paramName, params.indexType);
        if (ret == HDF_SUCCESS) {
            HDF_LOGI("%{public}s: GetExtensionIndex succeed\n", __func__);
            result = true;
        }

        result = Destroy();
        if (!result) {
            HDF_LOGE("%{public}s: Destroy failed\n", __func__);
            return false;
        }

        return result;
    }
} // namespace codec
} // namespace OHOS

extern "C" int LLVMFuzzerTestOneInput(const uint8_t* data, size_t size)
{
    OHOS::Codec::CodecGetExtensionIndex(data, size);
    return 0;
}