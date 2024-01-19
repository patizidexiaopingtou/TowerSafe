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

#ifndef MOCK_ACCESSIBILITY_ELEMENT_OPERATOR_CALLBACK_H
#define MOCK_ACCESSIBILITY_ELEMENT_OPERATOR_CALLBACK_H

#include <gmock/gmock.h>
#include "accessibility_element_operator_callback.h"

namespace OHOS {
namespace Accessibility {
class MockAccessibilityElementOperatorCallback : public AccessibilityElementOperatorCallback {
public:
    virtual ~MockAccessibilityElementOperatorCallback() = default;
    MOCK_METHOD2(SetSearchElementInfoByAccessibilityIdResult, void(const std::list<AccessibilityElementInfo> &infos,
        const int32_t requestId));
    MOCK_METHOD2(SetSearchElementInfoByTextResult, void(const std::list<AccessibilityElementInfo> &infos,
        const int32_t requestId));
    MOCK_METHOD2(SetFindFocusedElementInfoResult, void(const AccessibilityElementInfo &info, const int32_t requestId));
    MOCK_METHOD2(SetFocusMoveSearchResult, void(const AccessibilityElementInfo &info, const int32_t requestId));
    MOCK_METHOD2(SetExecuteActionResult, void(const bool succeeded, const int32_t requestId));
};
} // namespace Accessibility
} // namespace OHOS
#endif // MOCK_ACCESSIBILITY_ELEMENT_OPERATOR_CALLBACK_H