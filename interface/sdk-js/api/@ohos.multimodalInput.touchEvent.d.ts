/*
* Copyright (c) 2022 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import { InputEvent } from './@ohos.multimodalInput.inputEvent'

/**
 * Action
 *
 * @since 9
 * @syscap SystemCapability.MultimodalInput.Input.Core
 */
export declare enum Action {
  /**
   * Touch cancelled
   */
  CANCEL = 0,

  /**
   * Touch pressed
   */
  DOWN = 1,

  /**
   * Touch moved
   */
  MOVE = 2,

  /**
   * Touch lifted
   */
  UP = 3,
}

/**
 * ToolType
 *
 * @since 9
 * @syscap SystemCapability.MultimodalInput.Input.Core
 */
export declare enum ToolType {
  /**
   * Finger
   */
  FINGER = 0,

  /**
   * Stylus
   */
  PEN = 1,

  /**
   * Rubber
   */
  RUBBER = 2,

  /**
   * Brush
   */
  BRUSH = 3,

  /**
   * Pencil
   */
  PENCIL = 4,

  /**
   * Air brush
   */
  AIRBRUSH = 5,

  /**
   * Mouse
   */
  MOUSE = 6,

  LENS = 7,
}

/**
 * SourceType
 *
 * @since 9
 * @syscap SystemCapability.MultimodalInput.Input.Core
 */
export declare enum SourceType {
  /**
   * Touchscreen
   */
  TOUCH_SCREEN = 0,

  /**
   * Stylus
   */
  PEN = 1,

  /**
   * Touchpad
   */
  TOUCH_PAD = 2,
}

/**
 * Touch
 *
 * @since 9
 * @syscap SystemCapability.MultimodalInput.Input.Core
 */
export declare interface Touch {
  /**
   * Pointer identifier
   */
  id: number;

  /**
   * Time stamp when touch is pressed
   */
  pressedTime: number;

  /**
   * X coordinate of the touch position on the screen
   */
  screenX: number;

  /**
   * Y coordinate of the touch position on the screen
   */
  screenY: number;

  /**
   * X coordinate of the touch position in the window
   */
  windowX: number;

  /**
   * Y coordinate of the touch position in the window
   */
  windowY: number;

  /**
   * Pressure value. The value range is [0.0, 1.0]. The value 0.0 indicates that the pressure is not supported.
   */
  pressure: number;

  /**
   * Width of the contact area when touch is pressed
   */
  width: number;

  /**
   * Height of the contact area when touch is pressed
   */
  height: number;

  /**
   * Angle relative to the YZ plane. The value range is [-90, 90]. A positive value indicates a rightward tilt.
   */
  tiltX: number;

  /**
   * Angle relative to the XZ plane. The value range is [-90, 90]. A positive value indicates a downward tilt.
   */
  tiltY: number;

  /**
   * Center point X of the tool area
   */
  toolX: number;

  /**
   * Center point Y of the tool area
   */
  toolY: number;

  /**
   * Width of the tool area
   */
  toolWidth: number;

  /**
   * Height of the tool area
   */
  toolHeight: number;

  /**
   * X coordinate of the input device
   */
  rawX: number;

  /**
   * Y coordinate of the input device
   */
  rawY: number;

  /**
   * Tool type
   */
  toolType: ToolType;
}

/**
 * TouchEvent
 *
 * @since 9
 * @syscap SystemCapability.MultimodalInput.Input.Core
 */
export declare interface TouchEvent extends InputEvent {
  /**
   * Touch action
   */
  action: Action;

  /**
   * Current touch point
   */
  touch: Touch;

  /**
   * All touch points
   */
  touches: Touch[];

  /**
   * Device type of the touch source
   */
  sourceType: SourceType;
}