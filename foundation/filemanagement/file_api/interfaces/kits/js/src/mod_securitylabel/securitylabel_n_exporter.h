/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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

#ifndef SECURITYLABEL_N_EXPORTER_H
#define SECURITYLABEL_N_EXPORTER_H

#include "filemgmt_libn.h"

namespace OHOS {
namespace FileManagement {
namespace ModuleSecurityLabel {
napi_value SetSecurityLabel(napi_env env, napi_callback_info info);
napi_value SetSecurityLabelSync(napi_env env, napi_callback_info info);
napi_value GetSecurityLabel(napi_env env, napi_callback_info info);
napi_value GetSecurityLabelSync(napi_env env, napi_callback_info info);
} // namespace ModuleSecurityLabel
} // namespace FileManagement
} // namespace OHOS
#endif // SECURITYLABEL_N_EXPORTER_H