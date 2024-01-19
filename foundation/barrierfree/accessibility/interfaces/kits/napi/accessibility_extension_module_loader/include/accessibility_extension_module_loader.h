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

#ifndef ACCESSIBILITY_EXTENSION_MODULE_LOADER_H
#define ACCESSIBILITY_EXTENSION_MODULE_LOADER_H

#include "extension_module_loader.h"

namespace OHOS::Accessibility {
class AccessibilityExtensionModuleLoader : public AbilityRuntime::ExtensionModuleLoader,
    public Singleton<AccessibilityExtensionModuleLoader> {
    DECLARE_SINGLETON(AccessibilityExtensionModuleLoader);

public:
    /**
     * @brief Create Extension.
     *
     * @param runtime The runtime.
     * @return The Extension instance.
     */
    virtual AbilityRuntime::Extension *Create(const std::unique_ptr<AbilityRuntime::Runtime> &runtime) const override;

    virtual std::map<std::string, std::string> GetParams() override;
};
} // namespace OHOS::Accessibility
#endif // ACCESSIBILITY_EXTENSION_MODULE_LOADER_H