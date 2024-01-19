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

#include "profilercreatesession_fuzzer.h"

#include <cstddef>
#include <cstdint>

#include "plugin_service.h"
#include "profiler_service.h"

namespace OHOS {
bool ProfilerCreateSessionFuzzTest(const uint8_t* data, size_t size)
{
    auto pluginService = std::make_shared<PluginService>();
    auto profilerService = std::make_shared<ProfilerService>(pluginService);
    auto serverContext = std::make_shared<::grpc::ServerContext>();
    auto response = std::make_unique<CreateSessionResponse>();

    CreateSessionRequest request;
    if (!request.ParseFromArray(data, size)) {
        return true;
    }

    profilerService->CreateSession(serverContext.get(), &request, response.get());
    return true;
}
} // namespace OHOS

/* Fuzzer entry point */
extern "C" int LLVMFuzzerTestOneInput(const uint8_t* data, size_t size)
{
    /* Run your code on data */
    OHOS::ProfilerCreateSessionFuzzTest(data, size);
    return 0;
}
