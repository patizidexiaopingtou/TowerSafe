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

#include "plugindestroysessioncmd_fuzzer.h"

#include <cstddef>
#include <cstdint>

#include "command_poller.h"
#include "plugin_manager.h"
#include "plugin_service.ipc.h"
#include "socket_context.h"

namespace OHOS {
bool DestroySessionTest(const uint8_t* data, size_t size)
{
    auto pluginManage = std::make_shared<PluginManager>();
    auto commandPoller = std::make_shared<CommandPoller>(pluginManage);
    pluginManage->SetCommandPoller(commandPoller);

    DestroySessionCmd successCmd;

    if (!successCmd.ParseFromArray(data, size)) {
        return true;
    }
    commandPoller->OnDestroySessionCmd(successCmd);
    return true;
}
} // namespace OHOS

/* Fuzzer entry point */
extern "C" int LLVMFuzzerTestOneInput(const uint8_t* data, size_t size)
{
    /* Run your code on data */
    OHOS::DestroySessionTest(data, size);
    return 0;
}
