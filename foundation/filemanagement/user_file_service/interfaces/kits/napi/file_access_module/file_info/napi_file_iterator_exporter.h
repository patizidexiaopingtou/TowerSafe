/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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

#ifndef NAPI_FILE_ITERATOR_EXPORTER_H
#define NAPI_FILE_ITERATOR_EXPORTER_H

#include <string>

#include "file_access_extension_info.h"
#include "file_access_helper.h"
#include "filemgmt_libn.h"

namespace OHOS {
namespace FileAccessFwk {
using namespace FileManagement::LibN;

class NapiFileIteratorExporter final : public NExporter {
public:
    inline static const std::string className_ = "NapiFileIteratorExporter";

    NapiFileIteratorExporter(napi_env env, napi_value exports) : NExporter(env, exports) {};
    ~NapiFileIteratorExporter() = default;

    static napi_value Constructor(napi_env env, napi_callback_info info);
    static napi_value Next(napi_env env, napi_callback_info info);

    bool Export() override;
    std::string GetClassName() override;
};
} // namespace FileAccessFwk
} // namespace OHOS
#endif // NAPI_FILE_ITERATOR_EXPORTER_H