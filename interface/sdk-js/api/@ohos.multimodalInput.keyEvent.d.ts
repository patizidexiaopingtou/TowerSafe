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
   * Cancel key
   */
  CANCEL = 0,

  /**
   * Down key
   */
  DOWN = 1,

  /**
   * Up key
   */
  UP = 2,
}

/**
* Key
*
* @since 9
* @syscap SystemCapability.MultimodalInput.Input.Core
*/
export declare interface Key {
  /**
   * Key code
   */
  code: KeyCode;

  /**
   * Time when the key is pressed
   */
  pressedTime: number;

  /**
   * Device to which the key belongs
   */
  deviceId: number;
}

/**
* KeyEvent
*
* @since 9
* @syscap SystemCapability.MultimodalInput.Input.Core
*/
export declare interface KeyEvent extends InputEvent {
  /**
   * Key action
   */
  action: Action;

  /**
   * Key that has changed
   */
  key: Key;

  /**
   * Unicode character corresponding to the key
   */
  unicodeChar: number;

  /**
   * List of pressed keys
   */
  keys: Key[];

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
  fnKey: boolean;

  /**
   * Whether capsLock is active
   */
  capsLock: boolean;

  /**
   * Whether numLock is active
   */
  numLock: boolean;

  /**
   * Whether scrollLock is active
   */
  scrollLock: boolean;
}