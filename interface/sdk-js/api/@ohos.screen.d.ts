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

import { AsyncCallback, Callback } from './basic';

/**
 * Interface of screen manager
 * @syscap SystemCapability.WindowManager.WindowManager.Core
 * @systemapi Hide this for inner system use.
 * @since 9
 */
declare namespace screen {
  /**
   * Get all screen
   * @throws {BusinessError} 1400001 - If display or screen is invalid
   * @since 9
   */
  function getAllScreens(callback: AsyncCallback<Array<Screen>>): void;
  function getAllScreens(): Promise<Array<Screen>>;

  /**
   * Register the callback for screen changes.
   * @param eventType: type of callback
   * @throws {BusinessError} 401 - If param is invalid
   * @since 9
   */
  function on(eventType: 'connect' | 'disconnect' | 'change', callback: Callback<number>): void;

  /**
   * Unregister the callback for screen changes.
   * @param eventType: type of callback
   * @throws {BusinessError} 401 - If param is invalid
   * @since 9
   */
  function off(eventType: 'connect' | 'disconnect' | 'change', callback?: Callback<number>): void;

  /**
   * Make screens as expand-screen
   * @throws {BusinessError} 401 - If param is invalid
   * @throws {BusinessError} 1400001 - If display or screen is invalid
   * @since 9
   */
  function makeExpand(options:Array<ExpandOption>, callback: AsyncCallback<number>): void;
  function makeExpand(options:Array<ExpandOption>): Promise<number>;

  /**
   * Make screens as mirror-screen
   * @throws {BusinessError} 401 - If param is invalid
   * @throws {BusinessError} 1400001 - If display or screen is invalid
   * @since 9
   */
  function makeMirror(mainScreen:number, mirrorScreen:Array<number>, callback: AsyncCallback<number>): void;
  function makeMirror(mainScreen:number, mirrorScreen:Array<number>): Promise<number>;

  /**
   * Create virtual screen. if surfaceId is valid, this permission is necessary.
   * @param options Indicates the options of the virtual screen.
   * @permission ohos.permission.CAPTURE_SCREEN
   * @throws {BusinessError} 201 - If there is no permission
   * @throws {BusinessError} 401 - If param is invalid
   * @throws {BusinessError} 1400001 - If display or screen is invalid
   * @since 9
   */
  function createVirtualScreen(options:VirtualScreenOption, callback: AsyncCallback<Screen>): void;
  function createVirtualScreen(options:VirtualScreenOption): Promise<Screen>;

  /**
   * Destroy virtual screen.
   * @param screenId Indicates the screen id of the virtual screen.
   * @throws {BusinessError} 401 - If param is invalid
   * @throws {BusinessError} 1400002 - If operation other screen
   * @since 9
   */
  function destroyVirtualScreen(screenId:number, callback: AsyncCallback<void>): void;
  function destroyVirtualScreen(screenId:number): Promise<void>;

  /**
   * Set surface for the virtual screen.
   * @param screenId Indicates the screen id of the virtual screen.
   * @param surfaceId Indicates the surface id.
   * @permission ohos.permission.CAPTURE_SCREEN
   * @throws {BusinessError} 201 - If there is no permission
   * @throws {BusinessError} 401 - If param is invalid
   * @throws {BusinessError} 1400001 - If display or screen is invalid
   * @since 9
   */
  function setVirtualScreenSurface(screenId:number, surfaceId: string, callback: AsyncCallback<void>): void;
  function setVirtualScreenSurface(screenId:number, surfaceId: string): Promise<void>;

  /**
   * Get screen rotation lock status.
   * @since 9
   */
  function isScreenRotationLocked(callback: AsyncCallback<boolean>): void;
  function isScreenRotationLocked(): Promise<boolean>;
  
  /**
   * Set screen rotation lock status.
   * @param isLocked Indicates whether the screen rotation switch is locked.
   * @throws {BusinessError} 401 - If param is invalid
   * @since 9
   */
  function setScreenRotationLocked(isLocked:boolean, callback: AsyncCallback<void>): void;
  function setScreenRotationLocked(isLocked:boolean): Promise<void>;

  /**
   * The parameter of making expand screen
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 9
   */
  interface ExpandOption {
    /**
     * Screen id
     */
    screenId: number;

    /**
     * The start coordinate X of the screen origin
     */
    startX: number;

    /**
     * The start coordinate Y of the screen origin
     */
    startY: number;
  }

  /**
   * The parameter for creating virtual screen.
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 9
   */
  interface VirtualScreenOption {
    /**
     * Indicates the name of the virtual screen.
     */
    name: string

    /**
     * Indicates the width of the virtual screen.
     */
    width: number

    /**
     * Indicates the height of the virtual screen.
     */
    height: number

    /**
     * Indicates the density of the virtual screen.
     */
    density: number

    /**
     * Indicates the surface id of the virtual screen.
     */
    surfaceId: string
  }

  /**
   * Interface for screen
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 9
   */
  interface Screen {
    /**
     * Screen id
     */
    readonly id: number;

    /**
     * Group id
     */
    readonly parent: number;

    /**
     * Mode supported by the screen
     */
    readonly supportedModeInfo: Array<ScreenModeInfo>;

    /**
     * Currently active mode
     */
    readonly activeModeIndex: number;

    /**
     * Orientation of the screen
     */
    readonly orientation: Orientation;

    /**
     * Set the orientation of the screen
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1400003 - If system state is abnormally
     * @since 9
     */
    setOrientation(orientation: Orientation, callback: AsyncCallback<void>): void;
    setOrientation(orientation: Orientation): Promise<void>;

    /**
     * Active the mode
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1400003 - If system state is abnormally
     */
    setScreenActiveMode(modeIndex: number, callback: AsyncCallback<void>): void;
    setScreenActiveMode(modeIndex: number): Promise<void>;

    /**
     * Set display density of the screen
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1400003 - If system state is abnormally
     */
    setDensityDpi(densityDpi: number, callback: AsyncCallback<void>): void;
    setDensityDpi(densityDpi: number): Promise<void>;
  }

  /**
   * Screen orientation
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 9
   */
  enum Orientation {
    UNSPECIFIED = 0,
    VERTICAL = 1,
    HORIZONTAL = 2,
    REVERSE_VERTICAL = 3,
    REVERSE_HORIZONTAL = 4,
  }

  /**
   * The information of the screen
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 9
   */
  interface ScreenModeInfo {
    id: number;
    width: number;
    height: number;
    refreshRate: number;
  }
}

export default screen;
