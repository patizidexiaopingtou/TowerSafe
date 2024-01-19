/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

#include "accessibility_ut_helper.h"
#include "window_accessibility_controller.h"

namespace OHOS::Rosen {
WM_IMPLEMENT_SINGLE_INSTANCE(WindowAccessibilityController)
WindowAccessibilityController::WindowAccessibilityController()
{
}

void WindowAccessibilityController::SetAnchorAndScale(int32_t x, int32_t y, float scale)
{
    Accessibility::AccessibilityAbilityHelper::GetInstance().SetZoomState(true);
}

void WindowAccessibilityController::SetAnchorOffset(int32_t deltaX, int32_t deltaY)
{
    Accessibility::AccessibilityAbilityHelper::GetInstance().SetScrollState(true);
}

void WindowAccessibilityController::OffWindowZoom()
{
    Accessibility::AccessibilityAbilityHelper::GetInstance().SetZoomState(false);
}
} // namespace OHOS::Rosen