/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

#include <memory>
#include <vector>

#include "filemgmt_libhilog.h"
#include "hash.h"

namespace OHOS {
namespace FileManagement {
namespace ModuleFileIO {
using namespace std;
static napi_value Export(napi_env env, napi_value exports)
{
    std::unique_ptr<NExporter> products = make_unique<HashNExporter>(env, exports);

    if (!products->Export()) {
        HILOGE("INNER BUG. Failed to export class %{public}s for module fileio", products->GetClassName().c_str());
        return nullptr;
    } else {
        HILOGI("Class %{public}s for module fileio has been exported", products->GetClassName().c_str());
    }
    return exports;
}

NAPI_MODULE(hash, Export)
} // namespace ModuleFileIO
} // namespace FileManagement
} // namespace OHOS