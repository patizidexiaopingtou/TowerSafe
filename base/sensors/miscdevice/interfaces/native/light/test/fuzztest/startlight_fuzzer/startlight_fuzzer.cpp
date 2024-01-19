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

#include "startlight_fuzzer.h"
#include "securec.h"
#include "light_agent.h"

namespace OHOS {
namespace Sensors {
template<class T>
size_t GetObject(T &object, const uint8_t *data, size_t size)
{
    size_t objectSize = sizeof(object);
    if (objectSize > size) {
        return 0;
    }
    errno_t ret = memcpy_s(&object, objectSize, data, objectSize);
    if (ret != EOK) {
        return 0;
    }
    return objectSize;
}

void StartLightFuzzTest(const uint8_t* data, size_t size)
{
    size_t startPos = 0;
    int32_t lightId;
    startPos += GetObject<int32_t>(lightId, data + startPos, size - startPos);
    LightColor color;
    startPos += GetObject<LightColor>(color, data + startPos, size - startPos);
    LightAnimation animation;
    GetObject<LightAnimation>(animation, data + startPos, size - startPos);
    OHOS::Sensors::TurnOn(lightId, color, animation);
}
} // Sensors
} // OHOS

/* Fuzzer entry point */
extern "C" int LLVMFuzzerTestOneInput(const uint8_t* data, size_t size)
{
    /* Run your code on data */
    OHOS::Sensors::StartLightFuzzTest(data, size);
    return 0;
}
