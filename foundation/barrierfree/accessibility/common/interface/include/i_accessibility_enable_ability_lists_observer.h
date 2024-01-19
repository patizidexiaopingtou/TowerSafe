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

#ifndef INTERFACE_ACCESSIBILITY_ENABLE_ABILITY_LISTS_OBSERVER_H
#define INTERFACE_ACCESSIBILITY_ENABLE_ABILITY_LISTS_OBSERVER_H

#include "iremote_broker.h"

namespace OHOS {
namespace Accessibility {
class IAccessibilityEnableAbilityListsObserver : public IRemoteBroker {
public:
    DECLARE_INTERFACE_DESCRIPTOR(u"ohos.accessibility.IAccessibilityEnableAbilityListsObserver");

    /**
     * @brief Receive the state notify from AAMS and send it to the observer registered.
     */
    virtual void OnAccessibilityEnableAbilityListsChanged() = 0;

    enum class Message {
        ON_ACCESSIBILITY_ENABLE_ABILITY_LISTS_CHANGED,
    };
};
} // namespace Accessibility
} // namespace OHOS
#endif // INTERFACE_ACCESSIBILITY_ENABLE_ABILITY_LISTS_OBSERVER_H