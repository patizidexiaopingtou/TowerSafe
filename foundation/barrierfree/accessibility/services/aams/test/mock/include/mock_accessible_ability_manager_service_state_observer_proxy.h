/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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

#ifndef MOCK_ACCESSIBILITY_ABILITY_MANAGER_SERVICE_STATE_OBSERVER_PROXY_H
#define MOCK_ACCESSIBILITY_ABILITY_MANAGER_SERVICE_STATE_OBSERVER_PROXY_H

#include <gmock/gmock.h>
#include "accessible_ability_manager_state_observer_proxy.h"

namespace OHOS {
namespace Accessibility {
class MockAccessibleAbilityManagerStateObserverProxy : public AccessibleAbilityManagerStateObserverProxy {
public:
    MockAccessibleAbilityManagerStateObserverProxy(const sptr<IRemoteObject>& object);
    virtual ~MockAccessibleAbilityManagerStateObserverProxy() override;
    MOCK_METHOD1(OnStateChanged, void(const uint32_t stateType));
};
} // namespace Accessibility
} // namespace OHOS
#endif // MOCK_ACCESSIBILITY_ABILITY_MANAGER_SERVICE_STATE_OBSERVER_PROXY_H