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

#ifndef NAPI_ACCESSIBILITY_EXTENSION_CONTEXT_H
#define NAPI_ACCESSIBILITY_EXTENSION_CONTEXT_H

#include "accessibility_extension_context.h"
#include "napi/native_api.h"
#include "napi/native_node_api.h"
#include "native_engine/native_engine.h"
#include "native_engine/native_reference.h"
#include "native_engine/native_value.h"

namespace OHOS {
namespace Accessibility {
NativeValue* CreateJsAccessibilityExtensionContext(
    NativeEngine& engine, std::shared_ptr<AccessibilityExtensionContext> context);
} // namespace Accessibility
} // namespace OHOS
#endif // NAPI_ACCESSIBILITY_EXTENSION_CONTEXT_H