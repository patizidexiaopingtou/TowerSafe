/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "remotefileshare_napi.h"
#include "remotefileshare_n_exporter.h"

namespace OHOS {
namespace AppFileService {
namespace ModuleRemoteFileShare {
/***********************************************
 * Module export and register
 ***********************************************/
napi_value RemoteFileShareExport(napi_env env, napi_value exports)
{
    static napi_property_descriptor desc[] = {
        DECLARE_NAPI_FUNCTION("createSharePath", CreateSharePath),
    };
    napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);
    return exports;
}

NAPI_MODULE(remotefileshare, RemoteFileShareExport)
} // namespace ModuleRemoteFileShare
} // namespace AppFileService
} // namespace OHOS
