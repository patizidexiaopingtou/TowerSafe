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

#include "audiogetcurrentchannelidrender_fuzzer.h"
#include "audio_hdi_fuzzer_common.h"

using namespace OHOS::Audio;
namespace OHOS {
namespace Audio {
    bool AudioGetCurrentChannelidRenderFuzzTest(const uint8_t *data, size_t size)
    {
        bool result = false;
        uint32_t channelId = 0;
        TestAudioManager *getCurrentManager = nullptr;
        struct AudioAdapter *getCurrentAdapter = nullptr;
        struct AudioRender *getCurrentRender = nullptr;
        int32_t ret = AudioGetManagerCreateRender(getCurrentManager, &getCurrentAdapter, &getCurrentRender);
        if (ret < 0 || getCurrentAdapter == nullptr || getCurrentRender == nullptr || getCurrentManager == nullptr) {
            HDF_LOGE("%{public}s: AudioGetManagerCreateRender failed \n", __func__);
            return false;
        }

        struct AudioRender *handle = reinterpret_cast<struct AudioRender *>(const_cast<uint8_t *>(data));
        ret = getCurrentRender->attr.GetCurrentChannelId(handle, &channelId);
        if (ret == HDF_SUCCESS) {
            result = true;
        }
        getCurrentAdapter->DestroyRender(getCurrentAdapter, getCurrentRender);
        getCurrentManager->UnloadAdapter(getCurrentManager, getCurrentAdapter);
        return result;
    }
}
}

extern "C" int LLVMFuzzerTestOneInput(const uint8_t *data, size_t size)
{
    OHOS::Audio::AudioGetCurrentChannelidRenderFuzzTest(data, size);
    return 0;
}