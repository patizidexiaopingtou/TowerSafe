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
#include "MouseWheel.h"

MouseWheel::MouseWheel() : mouseXPosition(0), mouseYPosition(0), rotate(0) {}

void MouseWheel::SetMousePosition(double xPosition, double yPosition)
{
    mouseXPosition = xPosition;
    mouseYPosition = yPosition;
}

void MouseWheel::SetRotate(double rotation)
{
    this->rotate = rotation;
}

double MouseWheel::GetMouseXPosition() const
{
    return mouseXPosition;
}

double MouseWheel::GetMouseYPosition() const
{
    return mouseYPosition;
}

double MouseWheel::GetRotate() const
{
    return rotate;
}
