/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

#include "MouseInputImpl.h"

#include <thread>
#include <vector>
#include <chrono>

#include "ace_ability.h"
#include "event_dispatcher.h"

#include "PreviewerEngineLog.h"

using namespace std;

using namespace OHOS::Ace;

MouseInputImpl::MouseInputImpl()
{
}

TouchType MouseInputImpl::ConvertToOsType(MouseInput::MouseStatus status) const
{
    TouchType type;
    switch (status) {
        case INDEV_STATE_RELEASE:
            type = TouchType::UP;
            break;
        case INDEV_STATE_PRESS:
            type = TouchType::DOWN;
            break;
        case INDEV_STATE_MOVE:
            type = TouchType::MOVE;
            break;
        default:
            break;
    }
    return type;
}
void MouseInputImpl::DispatchOsTouchEvent() const
{
    TouchEvent touchEvent;
    touchEvent.time = std::chrono::high_resolution_clock::now();
    touchEvent.id = 1;
    touchEvent.x = mouseXPosition;
    touchEvent.y = mouseYPosition;
    touchEvent.type = ConvertToOsType(mouseStatus);
    touchEvent.size = sizeof (TouchEvent);
    ILOG("MouseInputImpl::DispatchEvent x: %f y:%f", mouseXPosition, mouseYPosition);
    ILOG("current thread: %d", this_thread::get_id());
    if (!Platform::EventDispatcher::GetInstance().DispatchTouchEvent(touchEvent)) {
        ILOG("MouseInputImpl::DispatchEvent failed, x: %f y:%f", mouseXPosition, mouseYPosition);
    }
}

void MouseInputImpl::DispatchOsBackEvent() const
{
    ILOG("DispatchBackPressedEvent run.");
    ILOG("current thread: %d", this_thread::get_id());
    if (!Platform::EventDispatcher::GetInstance().DispatchBackPressedEvent()) {
        ELOG("DispatchBackPressedEvent failed.");
    }
}

MouseInputImpl& MouseInputImpl::GetInstance()
{
    static MouseInputImpl instance;
    return instance;
}

void MouseInputImpl::SetMouseStatus(MouseStatus status)
{
    mouseStatus = status;
}

void MouseInputImpl::SetMousePosition(double xPosition, double yPosition)
{
    mouseXPosition = xPosition;
    mouseYPosition = yPosition;
}
