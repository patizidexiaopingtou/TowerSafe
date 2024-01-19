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

#ifndef MOUSEWHEEL_H
#define MOUSEWHEEL_H

class MouseWheel {
public:
    double GetMouseXPosition() const;
    double GetMouseYPosition() const;
    double GetRotate() const;
    virtual void SetMousePosition(double xPosition, double yPosition);
    virtual void SetRotate(double rotation);
    virtual void DispatchWheelEvent() const {};

protected:
    MouseWheel();
    virtual ~MouseWheel() {}
    double mouseXPosition;
    double mouseYPosition;
    double rotate;
};

#endif // MOUSEWHEEL_H
