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

#ifndef ACCESSIBILITY_EXTENSION_H
#define ACCESSIBILITY_EXTENSION_H

#include "accessibility_extension_context.h"
#include "extension_base.h"
#include "runtime.h"

namespace OHOS {
namespace Accessibility {
class AccessibilityExtension : public AbilityRuntime::ExtensionBase<AccessibilityExtensionContext> {
public:
    AccessibilityExtension() = default;
    virtual ~AccessibilityExtension() = default;

    /**
     * @brief Init the extension.
     *
     * @param record the extension record.
     * @param application the application info.
     * @param handler the extension handler.
     * @param token the remote token.
     */
    virtual void Init(const std::shared_ptr<AbilityRuntime::AbilityLocalRecord> &record,
        const std::shared_ptr<AbilityRuntime::OHOSApplication> &application,
        std::shared_ptr<AbilityRuntime::AbilityHandler> &handler,
        const sptr<IRemoteObject> &token) override;

    /**
     * @brief Create and init context.
     *
     * @param record the extension record.
     * @param application the application info.
     * @param handler the extension handler.
     * @param token the remote token.
     * @return The created context.
     */
    virtual std::shared_ptr<AccessibilityExtensionContext> CreateAndInitContext(
        const std::shared_ptr<AbilityRuntime::AbilityLocalRecord> &record,
        const std::shared_ptr<AbilityRuntime::OHOSApplication> &application,
        std::shared_ptr<AbilityRuntime::AbilityHandler> &handler,
        const sptr<IRemoteObject> &token) override;
};
} // namespace Accessibility
} // namespace OHOS
#endif  // ACCESSIBILITY_EXTENSION_H