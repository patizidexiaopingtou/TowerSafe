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

#include "module_export_napi.h"

#include "file_extension_info_napi.h"
#include "js_native_api_types.h"
#include "napi/native_api.h"

namespace OHOS {
namespace FileAccessFwk {

EXTERN_C_START
/*
 * The module initialization.
 */
napi_value FileExtensionInfoExport(napi_env env, napi_value exports)
{
    InitDeviceFlag(env, exports);
    InitDocumentFlag(env, exports);
    InitNotifyType(env, exports);
    InitDeviceType(env, exports);
    InitFileInfo(env, exports);
    InitRootInfo(env, exports);

    return exports;
}
EXTERN_C_END

/*
 * The module definition.
 */
static napi_module _module = {
    .nm_version = 1,
    .nm_flags = 0,
    .nm_filename = nullptr,
    .nm_register_func = FileExtensionInfoExport,
    .nm_modname = "file.fileExtensionInfo",
    .nm_priv = ((void *)0),
    .reserved = {0}
};

/*
 * The module registration.
 */
extern "C" __attribute__((constructor)) void RegisterModule(void)
{
    napi_module_register(&_module);
}
} // namespace FileAccessFwk
} // namespace OHOS