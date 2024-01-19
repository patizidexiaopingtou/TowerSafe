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
import { InputEvent } from "./@ohos.multimodalInput.inputEvent"
import { KeyCode } from "./@ohos.multimodalInput.keyCode"

/**
 * Action
 *
 * @since 9
 * @syscap SystemCapability.MultimodalInput.Input.Core
 */
export declare enum Action {
  /**
   * Cancel
   */
  CANCEL = 0,

  /**
   * Moving of the mouse pointer
   */
  MOVE = 1,

  /**
   * Pressing down of the mouse
   */
  BUTTON_DOWN = 2,

  /**
   * Lifting of the mouse button
   */
  BUTTON_UP = 3,

  /**
   * Beginning of the axis event associated with the mouse
   */
  AXIS_BEGIN = 4,

  /**
   * Updating of the axis event associated with the mouse
   */
  AXIS_UPDATE = 5,

  /**
   * Ending of the axis event associated with the mouse
   */
  AXIS_END = 6,
}

/**
 * Mouse button
 *
 * @since 9
 * @syscap SystemCapability.MultimodalInput.Input.Core
 */
export declare enum Button {
  /**
   * Left button on the mouse
   */
  LEFT = 0,

  /**
   * Middle button on the mouse
   */
  MIDDLE = 1,

  /**
   * Right button on the mouse
   */
  RIGHT = 2,

  /**
   * Side button on the mouse
   */
  SIDE = 3,

  /**
   * Extended button on the mouse
   */
  EXTRA = 4,

  /**
   * Forward button on the mouse
   */
  FORWARD = 5,

  /**
   * Back button on the mouse
   */
  BACK = 6,

  /**
   * Task key on the mouse
   */
  TASK = 7
}

/**
 * Axis
 *
 * @since 9
 * @syscap SystemCapability.MultimodalInput.Input.Core
 */
export declare enum Axis {
  /**
   * Vertical scroll axis
   */
  SCROLL_VERTICAL = 0,

  /**
   * Horizontal scroll axis
   */
  SCROLL_HORIZONTAL = 1,

  /**
   * Pinch axis
   */
  PINCH = 2,
}

/**
 * AxisValue
 *
 * @since 9
 * @syscap SystemCapability.MultimodalInput.Input.Core
 */
export declare interface AxisValue {
  /**
   * Axis type
   */
  axis: Axis;

  /**
   * Axis value
   */
  value: number
}

/**
 * MouseEvent
 *
 * @since 9
 * @syscap SystemCapability.MultimodalInput.Input.Core
 */
export declare interface MouseEvent extends InputEvent {
  /**
   * Mouse event action
   */
  action: Action;

  /**
   * X coordinate of the mouse pointer on the screen
   */
  screenX: number;

  /**
   * Y coordinate of the mouse pointer on the screen
   */
  screenY: number;

  /**
   * X coordinate of the mouse pointer in the window
   */
  windowX: number;

  /**
   * Y coordinate of the mouse pointer in the window
   */
  windowY: number;

  /**
   * X axis offset relative to the previous reported mouse pointer position. When the mouse pointer is at the edge of the screen, the value may be less than the difference of the X coordinate reported twice.
   */
  rawDeltaX: number;

  /**
   * Y axis offset relative to the previous reported mouse pointer position
   */
  rawDeltaY: number;

  /**
   * Button that is currently pressed or released
   */
  button: Button;

  /**
   * Button that is being pressed
   */
  pressedButtons: Button[];

  /**
   * All axis data contained in the event
   */
  axes: AxisValue[];

  /**
   * List of pressed keys
   */
  pressedKeys: KeyCode[];

  /**
   * Whether ctrlKey is being pressed
   */
  ctrlKey: boolean;

  /**
   * Whether altKey is being pressed
   */
  altKey: boolean;

  /**
   * Whether shiftKey is being pressed
   */
  shiftKey: boolean;

  /**
   * Whether logoKey is being pressed
   */
  logoKey: boolean;

  /**
   * Whether fnKey is being pressed
   */
  fnKey:boolean
  
  /**
   * Whether capsLock is active
   */
  capsLock:boolean
  
  /**
   * Whether numLock is active
   */
  numLock:boolean
  
  /**
   * Whether scrollLock is active
   */
  scrollLock:boolean
}