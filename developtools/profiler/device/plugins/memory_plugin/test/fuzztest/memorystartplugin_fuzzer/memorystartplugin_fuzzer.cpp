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

#include "memorystartplugin_fuzzer.h"

#include <cstddef>
#include <cstdint>

#include "memory_data_plugin.h"

namespace OHOS {
bool FuzzMemoryStartPlugin(const uint8_t* data, size_t size)
{
    std::unique_ptr<MemoryDataPlugin> plugin = std::make_unique<MemoryDataPlugin>();
    plugin->Start(data, size);
    plugin->Stop();
    return true;
}
} // namespace OHOS

/* Fuzzer entry point */
extern "C" int LLVMFuzzerTestOneInput(const uint8_t* data, size_t size)
{
    /* Run your code on data */
    OHOS::FuzzMemoryStartPlugin(data, size);
    return 0;
}
