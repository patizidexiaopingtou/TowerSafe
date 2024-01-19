/*
* Copyright (c) 2021 Huawei Device Co., Ltd.
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

/// <reference path="../component/common_ts_ets_api.d.ts"/>

import { AsyncCallback, Callback } from './basic' ;
import BaseContext from './application/BaseContext';
import { LocalStorage } from 'StateManagement';
import image from './@ohos.multimedia.image';
import rpc from './@ohos.rpc';
import dialogRequest from "./@ohos.app.ability.dialogRequest";

/**
 * Window manager.
 * @syscap SystemCapability.WindowManager.WindowManager.Core
 */
declare namespace window {
  /**
   * The type of a window.
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 7
   */
  enum WindowType {
    /**
     * App.
     * @FAModelOnly
     */
    TYPE_APP,
    /**
     * System alert.
     */
    TYPE_SYSTEM_ALERT,
    /**
     * Input method.
     * @systemapi Hide this for inner system use.
     * @since 9
     * @StageModelOnly
     */
    TYPE_INPUT_METHOD,
    /**
     * Status bar.
     * @systemapi Hide this for inner system use.
     * @since 9
     * @StageModelOnly
     */
    TYPE_STATUS_BAR,
    /**
     * Panel.
     * @systemapi Hide this for inner system use.
     * @since 9
     * @StageModelOnly
     */
    TYPE_PANEL,
    /**
     * Keyguard.
     * @systemapi Hide this for inner system use.
     * @since 9
     * @StageModelOnly
     */
    TYPE_KEYGUARD,
    /**
     * Volume.
     * @systemapi Hide this for inner system use.
     * @since 9
     * @StageModelOnly
     */
    TYPE_VOLUME_OVERLAY,
    /**
     * Navigation bar.
     * @systemapi Hide this for inner system use.
     * @since 9
     * @StageModelOnly
     */
    TYPE_NAVIGATION_BAR,
    /**
     * Float.
     * @permission ohos.permission.SYSTEM_FLOAT_WINDOW
     * @since 9
     * @StageModelOnly
     */
    TYPE_FLOAT,
    /**
     * Wallpaper.
     * @systemapi Hide this for inner system use.
     * @since 9
     * @StageModelOnly
     */
    TYPE_WALLPAPER,
    /**
     * Desktop.
     * @systemapi Hide this for inner system use.
     * @since 9
     * @StageModelOnly
     */
    TYPE_DESKTOP,
    /**
     * Recent.
     * @systemapi Hide this for inner system use.
     * @since 9
     * @StageModelOnly
     */
    TYPE_LAUNCHER_RECENT,
    /**
     * Dock.
     * @systemapi Hide this for inner system use.
     * @since 9
     * @StageModelOnly
     */
    TYPE_LAUNCHER_DOCK,
    /**
     * Voice interaction.
     * @systemapi Hide this for inner system use.
     * @since 9
     * @StageModelOnly
     */
    TYPE_VOICE_INTERACTION,
    /**
     * Pointer.
     * @systemapi Hide this for inner system use.
     * @since 9
     * @StageModelOnly
     */
    TYPE_POINTER,
    /**
     * Float camera.
     * @systemapi Hide this for inner system use.
     * @since 9
     * @StageModelOnly
     */
     TYPE_FLOAT_CAMERA,
     /**
     * Dialog.
     * @systemapi Hide this for inner system use.
     * @since 9
     * @StageModelOnly
     */
    TYPE_DIALOG,
    /**
     * Screenshot.
     * @systemapi Hide this for inner system use.
     * @since 9
     * @StageModelOnly
     */
    TYPE_SCREENSHOT
  }

  /**
   * Describes the type of avoid area
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 7
   */
  enum AvoidAreaType {
    /**
     * Default area of the system
     */
    TYPE_SYSTEM,

    /**
     * Notch
     */
    TYPE_CUTOUT,

    /**
     * Area for system gesture
     * @since 9
     */
    TYPE_SYSTEM_GESTURE,

    /**
     * Area for keyboard
     * @since 9
     */
     TYPE_KEYBOARD
  }
  /**
   * Describes the window mode of an application
   * @systemapi Hide this for inner system use.
   * @since 7
   */
  enum WindowMode {
    UNDEFINED = 1,
    FULLSCREEN,
    PRIMARY,
    SECONDARY,
    FLOATING
  }

   /**
   * Describes the mode of window layout
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  enum WindowLayoutMode {
    /**
     * CASCADE
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    WINDOW_LAYOUT_MODE_CASCADE,
    /**
     * TILE
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    WINDOW_LAYOUT_MODE_TILE
  }

  /**
   * Properties of status bar and navigation bar, it couldn't update automatically
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 6
   */
  interface SystemBarProperties {
    /**
     * The color of the status bar.
     * @since 6
     */
    statusBarColor?: string;

    /**
     * The light icon of the status bar.
     * @since 7
     */
    isStatusBarLightIcon?: boolean;

    /**
     * The content color of the status bar
     * @since 8
     */
    statusBarContentColor?: string;

    /**
     * The color of the navigation bar.
     * @since 6
     */
    navigationBarColor?: string;

    /**
     * The light icon of the navigation bar.
     * @since 7
     */
    isNavigationBarLightIcon?: boolean;

    /**
     * The content color of the navigation bar
     * @since 8
     */
    navigationBarContentColor?: string;
  }

  /**
   * System bar tint of region
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @systemapi Hide this for inner system use.
   * @since 8
   */
  interface SystemBarRegionTint {
    /**
     * System bar type
     */
    type: WindowType;

    /**
     * The visibility of system bar
     */
    isEnable?: boolean;

    /**
     * The region of system bar
     */
    region?: Rect;

    /**
     * The background color of the system bar.
     */
    backgroundColor?: string;

    /**
     * The content color of the system bar.
     */
    contentColor?: string
  }

  /**
   * System bar tint state for systemui
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @systemapi Hide this for inner system use.
   * @since 8
   */
  interface SystemBarTintState {
    /**
     * Id of display
     */
    displayId: number;
    /**
     * Region tint of systembar
     */
    regionTint: Array<SystemBarRegionTint>;
  }

  /**
   * Rectangle
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 7
   */
  interface Rect {
    left: number;

    top: number;

    width: number;

    height: number;
  }

  /**
   * Avoid area
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 7
   */
  interface AvoidArea {
    /**
     * Whether avoidArea is visible on screen
     * @since 9
     */
    visible: boolean;

    /**
     * Rectangle on the left of the screen
     */
    leftRect: Rect;

    /**
     * Rectangle on the top of the screen
     */
    topRect: Rect;

    /**
     * Rectangle on the right of the screen
     */
    rightRect: Rect;

    /**
     * Rectangle on the bottom of the screen
     */
    bottomRect: Rect;
  }

  /**
   * Window size
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 7
   */
  interface Size {
    /**
     * The width of the window.
     */
    width: number;

    /**
     * The height of the window.
     */
    height: number;
  }

  /**
   * Properties of window, it couldn't update automatically
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 6
   */
  interface WindowProperties {
    /**
     * The position and size of the window
     * @since 7
     */
    windowRect: Rect;

    /**
     * Window type
     * @since 7
     */
    type: WindowType;

    /**
     * Whether the window is displayed in full screen mode. The default value is false.
     * @since 6
     */
    isFullScreen: boolean

    /**
     * Whether the window layout is in full screen mode(whether the window is immersive). The default value is false.
     * @since 7
     */
    isLayoutFullScreen: boolean

    /**
     * Whether the window can gain focus. The default value is true
     * @since 7
     */
    focusable: boolean

    /**
     * Whether the window is touchable. The default value is false
     * @since 7
     */
    touchable: boolean

    /**
     * Brightness value of window.
     * @since 6
     */
    brightness: number

    /**
     * The dimbehind value of window.
     * @since 7
     * @deprecated since 9
     */
    dimBehindValue: number

    /**
     * Whether keep screen on.
     * @since 6
     */
    isKeepScreenOn: boolean

    /**
     * Whether make window in privacy mode or not.
     * @since 7
     */
    isPrivacyMode: boolean

    /**
     * Whether is round corner or not.
     * @since 7
     * @deprecated since 9
     */
    isRoundCorner: boolean

    /**
     * Whether is transparent or not.
     * @since 7
     */
    isTransparent: boolean

    /**
     * Window id.
     * @since 9
     */
     id: number
  }

  /**
   * Type of allowing the specified of color space.
   * @since 8
   */
  enum ColorSpace {
    /**
     * Default color space.
     */
    DEFAULT,
    /**
     * Wide gamut color space. The specific wide color gamut depends on thr screen.
     */
    WIDE_GAMUT,
  }
  /**
   * Describes the scale Transition Options of window
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 9
   * @systemapi
   */
   interface ScaleOptions {
    /**
     * The scale param of x direction. Default is 1.f
     * @since 9
     */
    x?: number;

    /**
     * The scale param of y direction. Default is 1.f
     * @since 9
     */
    y?: number;

    /**
     * The scale param of pivot point of x. Default is 0.5f, Interval is 0.f - 1.f
     * @since 9
     */
    pivotX?: number;

    /**
     * The scale param of pivot point of y. Default is 0.5f, Interval is 0.f - 1.f
     * @since 9
     */
    pivotY?: number;
  }

  /**
   * Describes the rotate Transition Options of window
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 9
   * @systemapi
   */
  interface RotateOptions {
    /**
     * The rotate degree of x direction. Default value is 0.f
     * @since 9
     */
    x?: number;

    /**
     * The rotate degree of y direction. Default value is 0.f
     * @since 9
     */
    y?: number;

    /**
     * The rotate degree of z direction. Default value is 0.f
     * @since 9
     */
    z?: number;
    
    /**
     * The param of pivot point of x. Default is 0.5f, Interval is 0.f - 1.f
     * @since 9
     */
    pivotX?: number;

    /**
     * The param of pivot point of y. Default is 0.5f, Interval is 0.f - 1.f
     * @since 9
     */
    pivotY?: number;
  }

  /**
   * Describes the translate Transition Options of window
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 9
   * @systemapi
   */
  interface TranslateOptions {
    /**
    * The translate pixel param of x direction. Default is 0.f
    * @since 9
    */
    x?: number;

    /**
     * The translate pixel param of y direction. Default is 0.f
     * @since 9
     */
    y?: number;

    /**
     * The translate pixel param of z direction. Default is 0.f
     * @since 9
     */
    z?: number;
  }

  /**
   * Transition Context
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @systemapi
   * @since 9
   */
   interface TransitionContext {
    /**
     * The target window with animation
     * @since 9
     */
    toWindow: Window

    /**
     * Set complete state of animation transition
     * @param isCompleted is Completed if true, or not if false.
     * @throws {BusinessError} 401 - If param is invalid
     * @since 9
     */
    completeTransition(isCompleted: boolean): void;
  }

  /**
   * Transition Controller
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @systemapi
   * @since 9
   */
  interface TransitionController {
    /**
     * Animation configuration when showing window
     * @param context transition Context.
     * @since 9
     * @throws {BusinessError} 401 - If param is invalid
     */
    animationForShown(context: TransitionContext): void;
    /**
     * Animation configuration when hiding window
     * @param context transition context.
     * @since 9
     * @throws {BusinessError} 401 - If param is invalid
     */
    animationForHidden(context: TransitionContext): void;
  }

  /**
   * Configuration parameters for window creation.
   * @since 9
   */
  interface Configuration {
    /**
     * Indicates window id.
     * @since 9
     */
    name: string

    /**
     * Indicates window type
     * @since 9
     */
    windowType: WindowType

    /**
     * Indicates window context.
     * @since 9
     */
    ctx?: BaseContext

    /**
     * Indicates display ID.
     * @since 9
     */
    displayId?: number

    /**
     * Indicates Parent window id
     * @since 9
     */
    parentId?: number
  }

  /**
   * Create a window with a specific configuration
   * @param Configuration Configuration parameters for window creation.
   * @since 9
   * @throws {BusinessError} 201 - If there is no permission
   * @throws {BusinessError} 401 - If param is invalid
   * @throws {BusinessError} 1300001 - If window has created
   * @throws {BusinessError} 1300006 - If window context is abnormally
   */
  function createWindow(config: Configuration, callback: AsyncCallback<Window>): void;

  /**
   * Create a window with a specific configuration
   * @param Configuration Configuration parameters for window creation.
   * @since 9
   * @throws {BusinessError} 201 - If there is no permission
   * @throws {BusinessError} 401 - If param is invalid
   * @throws {BusinessError} 1300001 - If window has created
   * @throws {BusinessError} 1300006 - If window context is abnormally
   */
  function createWindow(config: Configuration): Promise<Window>;

  /**
   * Create a sub window with a specific id and type, only support 7.
   * @param id Indicates window id.
   * @param type Indicates window type.
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.window#createWindow
   * @FAModelOnly
   */
  function create(id: string, type: WindowType, callback: AsyncCallback<Window>): void;

  /**
   * Create a sub window with a specific id and type, only support 7.
   * @param id Indicates window id.
   * @param type Indicates window type.
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.window#createWindow
   * @FAModelOnly
   */
  function create(id: string, type: WindowType): Promise<Window>;

  /**
   * Create a system or float window with a specific id and type.
   * @param ctx Indicates the context on which the window depends
   * @param id Indicates window id.
   * @param type Indicates window type.
   * @since 8
   * @deprecated since 9
   * @useinstead ohos.window#createWindow
   */
  function create(ctx: BaseContext, id: string, type: WindowType): Promise<Window>;

  /**
   * Create a system or float window with a specific id and type.
   * @param ctx Indicates the context on which the window depends
   * @param id Indicates window id.
   * @param type Indicates window type.
   * @since 8
   * @deprecated since 9
   * @useinstead ohos.window#createWindow
   */
  function create(ctx: BaseContext, id: string, type: WindowType, callback: AsyncCallback<Window>): void;

  /**
   * Find the window by id.
   * @param id Indicates window id.
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.window#findWindow
   */
  function find(id: string, callback: AsyncCallback<Window>): void;

  /**
   * Find the window by id.
   * @param id Indicates window id.
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.window#findWindow
   */
  function find(id: string): Promise<Window>;

   /**
    * Find the window by name.
    * @param name Indicates window name.
    * @throws {BusinessError} 401 - If param is invalid
    * @since 9
    */
   function findWindow(name: string): Window;

  /**
   * Get the final show window.
   * @param id Indicates window id.
   * @since 6
   * @deprecated since 9
   * @useinstead ohos.window#getLastWindow
   * @FAModelOnly
   */
  function getTopWindow(callback: AsyncCallback<Window>): void;

  /**
   * Get the final show window.
   * @since 6
   * @deprecated since 9
   * @useinstead ohos.window#getLastWindow
   * @FAModelOnly
   */
  function getTopWindow(): Promise<Window>;

  /**
   * Get the final show window.
   * @param ctx Indicates the context on which the window depends
   * @since 8
   * @deprecated since 9
   * @useinstead ohos.window#getLastWindow
   */
  function getTopWindow(ctx: BaseContext): Promise<Window>;

  /**
   * Get the final show window.
   * @param ctx Indicates the context on which the window depends
   * @since 8
   * @deprecated since 9
   * @useinstead ohos.window#getLastWindow
   */
  function getTopWindow(ctx: BaseContext, callback: AsyncCallback<Window>): void;

  /**
   * Get the final show window.
   * @param ctx Indicates the context on which the window depends.
   * @throws {BusinessError} 401 - If param is invalid
   * @throws {BusinessError} 1300002 - If window state is abnormally
   * @throws {BusinessError} 1300006 - If window context is abnormally
   * @since 9
   */
   function getLastWindow(ctx: BaseContext, callback: AsyncCallback<Window>): void;

   /**
    * Get the final show window.
    * @throws {BusinessError} 401 - If param is invalid
    * @throws {BusinessError} 1300002 - If window state is abnormally
    * @throws {BusinessError} 1300006 - If window context is abnormally
    * @since 9
    */
   function getLastWindow(ctx: BaseContext): Promise<Window>;

  /**
   * Minimize all app windows.
   * @systemapi Hide this for inner system use.
   * @throws {BusinessError} 401 - If param is invalid
   * @throws {BusinessError} 1300003 - If system state is abnormally
   * @since 9
   */
  function minimizeAll(id: number, callback: AsyncCallback<void>): void;

  /**
   * Minimize all app windows.
   * @systemapi Hide this for inner system use.
   * @throws {BusinessError} 401 - If param is invalid
   * @throws {BusinessError} 1300003 - If system state is abnormally
   * @since 9
   */
  function minimizeAll(id: number): Promise<void>;

  /**
   * Toggle shown state for all app windows. Minimize or restore all app windows.
   * @throws {BusinessError} 1300003 - If system state is abnormally
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  function toggleShownStateForAllAppWindows(callback: AsyncCallback<void>): void;

  /**
   * Toggle shown state for all app windows. Minimize or restore all app windows.
   * @throws {BusinessError} 1300003 - If system state is abnormally
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  function toggleShownStateForAllAppWindows(): Promise<void>;

  /**
   * Set the layout mode of a window.
   * @param mode the layout mode of a window.
   * @systemapi Hide this for inner system use.
   * @throws {BusinessError} 401 - If param is invalid
   * @throws {BusinessError} 1300003 - If system state is abnormally
   * @since 9
   */
  function setWindowLayoutMode(mode: WindowLayoutMode, callback: AsyncCallback<void>): void;

  /**
   * Set the layout mode of a window.
   * @param mode the layout mode of a window.
   * @systemapi Hide this for inner system use.
   * @throws {BusinessError} 401 - If param is invalid
   * @throws {BusinessError} 1300003 - If system state is abnormally
   * @since 9
   */
  function setWindowLayoutMode(mode: WindowLayoutMode): Promise<void>;

  /**
   * Register the callback of systemBarTintChange
   * @param type: 'systemBarTintChange'
   * @systemapi Hide this for inner system use.
   * @throws {BusinessError} 401 - If param is invalid
   * @since 8
   */
  function on(type: 'systemBarTintChange', callback: Callback<SystemBarTintState>): void;

  /**
   * Unregister the callback of systemBarTintChange
   * @param type: 'systemBarTintChange'
   * @systemapi Hide this for inner system use.
   * @throws {BusinessError} 401 - If param is invalid
   * @since 8
   */
  function off(type: 'systemBarTintChange', callback?: Callback<SystemBarTintState>): void;

  /**
   * Display orientation
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 9
   */
  enum Orientation {
    /**
     * Default value. The direction mode is not clearly defined. It is determined by the system.
     * @since 9
     */
    UNSPECIFIED = 0,
    
    /**
     * Display in portrait orientation.
     * @since 9
     */
    PORTRAIT = 1,
    
    /**
     * Display in landscape orientation.
     * @since 9
     */
    LANDSCAPE = 2,
    
    /**
     * Display in inverted portrait orientation.
     * @since 9
     */
    PORTRAIT_INVERTED = 3,
    
    /**
     * Display in inverted landscape orientation.
     * @since 9
     */
    LANDSCAPE_INVERTED = 4,
    
    /**
     * Follow the rotation of the sensor, ignore auto rotation lock.
     * @since 9
     */
    AUTO_ROTATION = 5,
    
    /**
     * Follow the rotation of the sensor, only work in the vertical direction, ignore auto rotation lock.
     * @since 9
     */
    AUTO_ROTATION_PORTRAIT = 6,

    /**
     * Follow the rotation of the sensor, only work in the horizontal direction, ignore auto rotation lock.
     * @since 9
     */
    AUTO_ROTATION_LANDSCAPE = 7,
    
    /**
     * Follow the rotation of the sensor, controlled by auto rotation lock.
     * @since 9
     */
    AUTO_ROTATION_RESTRICTED = 8,
    
    /**
     * Follow the rotation of the sensor, only work in the vertical direction, controlled by auto rotation lock.
     * @since 9
     */
    AUTO_ROTATION_PORTRAIT_RESTRICTED = 9,
    
    /**
     * Follow the rotation of the sensor, only work in the horizontal direction, controlled by auto rotation lock.
     * @since 9
     */
    AUTO_ROTATION_LANDSCAPE_RESTRICTED = 10,
    
    /**
     * Locked mode, keep the same direction as previous one.
     * @since 9
     */
    LOCKED = 11,
  }

  /**
   * Type of blur style
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  enum BlurStyle {
    /**
     * Close blur.
     * @since 9
     */
    OFF,
    /**
     * Blur style thin.
     * @since 9
     */
    THIN,
     /**
     * Blur style regular.
     * @since 9
     */
    REGULAR,
    /**
     * Blur style thick.
     * @since 9
     */
    THICK,
  }

  interface Window {
    /**
     * Hide window.
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @systemapi Hide this for inner system use.
     * @since 7
     */
    hide (callback: AsyncCallback<void>): void;

    /**
      * Hide window.
      * @throws {BusinessError} 1300002 - If window state is abnormally
      * @systemapi Hide this for inner system use.
      * @since 7
      */
    hide(): Promise<void>;

    /**
      * Hide window with animation.
      * @throws {BusinessError} 1300002 - If window state is abnormally
      * @throws {BusinessError} 1300003 - If system state is abnormally
      * @throws {BusinessError} 1300004 - If this window can not showWithAnimation
      * @since 9
      * @systemapi
      */
    hideWithAnimation(callback: AsyncCallback<void>): void;

    /**
      * Hide window with animation.
      * @throws {BusinessError} 1300002 - If window state is abnormally
      * @throws {BusinessError} 1300003 - If system state is abnormally
      * @throws {BusinessError} 1300004 - If this window can not showWithAnimation
      * @since 9
      * @systemapi
      */
    hideWithAnimation(): Promise<void>;

    /**
      * Show window.
      * @since 7
      * @deprecated since 9
      * @useinstead ohos.window.Window#showWindow
      */
    show(callback: AsyncCallback<void>): void;

    /**
      * Show window.
      * @since 7
      * @deprecated since 9
      * @useinstead ohos.window.Window#showWindow
      */
    show(): Promise<void>;

    /**
      * Show window.
      * @throws {BusinessError} 1300002 - If window state is abnormally
      * @since 9
      */
    showWindow(callback: AsyncCallback<void>): void;

    /**
      * Show window.
      * @throws {BusinessError} 1300002 - If window state is abnormally
      * @since 9
      */
    showWindow(): Promise<void>;

    /**
      * Show window with animation.
      * @throws {BusinessError} 1300002 - If window state is abnormally
      * @throws {BusinessError} 1300003 - If system state is abnormally
      * @throws {BusinessError} 1300004 - If this window can not showWithAnimation
      * @since 9
      * @systemapi
      */
    showWithAnimation(callback: AsyncCallback<void>): void;

    /**
      * Show window with animation.
      * @throws {BusinessError} 1300002 - If window state is abnormally
      * @throws {BusinessError} 1300003 - If system state is abnormally
      * @throws {BusinessError} 1300004 - If this window can not showWithAnimation
      * @since 9
      * @systemapi
      */
    showWithAnimation(): Promise<void>;

    /**
     * Destroy the window.
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#destroyWindow
     */
    destroy(callback: AsyncCallback<void>): void;

    /**
      * Destroy the window.
      * @since 7
      * @deprecated since 9
      * @useinstead ohos.window.Window#destroyWindow
      */
    destroy(): Promise<void>;

    /**
     * Destroy the window.
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @since 9
     */
    destroyWindow(callback: AsyncCallback<void>): void;

    /**
      * Destroy the window.
      * @throws {BusinessError} 1300002 - If window state is abnormally
      * @throws {BusinessError} 1300003 - If system state is abnormally
      * @since 9
      */
    destroyWindow(): Promise<void>;

    /**
     * Set the position of a window.
     * @param x Indicate the X-coordinate of the window.
     * @param y Indicate the Y-coordinate of the window.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#moveWindowTo
     */
    moveTo(x: number, y: number): Promise<void>;

    /**
     * Set the position of a window.
     * @param x Indicate the X-coordinate of the window.
     * @param y Indicate the Y-coordinate of the window.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#moveWindowTo
     */
    moveTo(x: number, y: number, callback: AsyncCallback<void>): void;

    /**
     * Set the position of a window.
     * @param x Indicate the X-coordinate of the window.
     * @param y Indicate the Y-coordinate of the window.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    moveWindowTo(x: number, y: number): Promise<void>;

    /**
     * Set the position of a window.
     * @param x Indicate the X-coordinate of the window.
     * @param y Indicate the Y-coordinate of the window.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    moveWindowTo(x: number, y: number, callback: AsyncCallback<void>): void;

    /**
     * Set the size of a window .
     * @param width Indicates the width of the window.
     * @param height Indicates the height of the window.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#resize
     */
    resetSize(width: number, height: number): Promise<void>;

    /**
     * Set the size of a window .
     * @param width Indicates the width of the window.
     * @param height Indicates the height of the window.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#resize
     */
    resetSize(width: number, height: number, callback: AsyncCallback<void>): void;

    /**
     * Set the size of a window .
     * @param width Indicates the width of the window.
     * @param height Indicates the height of the window.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    resize(width: number, height: number): Promise<void>;

    /**
     * Set the size of a window .
     * @param width Indicates the width of the window.
     * @param height Indicates the height of the window.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
     resize(width: number, height: number, callback: AsyncCallback<void>): void;

    /**
     * Set the type of a window.
     * @param type Indicate the type of a window.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @systemapi Hide this for inner system use.
     * @since 7
     * @deprecated since 9
     */
    setWindowType(type: WindowType): Promise<void>;

    /**
     * Set the type of a window.
     * @param type Indicate the type of a window.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @systemapi Hide this for inner system use.
     * @since 7
     * @deprecated since 9
     */
    setWindowType(type: WindowType, callback: AsyncCallback<void>): void;

    /**
     * Set the mode of a window.
     * @param mode Indicate the mode of a window.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    setWindowMode(mode: WindowMode): Promise<void>;

    /**
     * Set the mode of a window.
     * @param mode Indicate the mode of a window.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    setWindowMode(mode: WindowMode, callback: AsyncCallback<void>): void;

    /**
     * Get the properties of current window
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.window.Window#getWindowProperties
     */
    getProperties(callback: AsyncCallback<WindowProperties>): void;

     /**
      * Get the properties of current window
      * @syscap SystemCapability.WindowManager.WindowManager.Core
      * @since 6
      * @deprecated since 9
      * @useinstead ohos.window.Window#getWindowProperties
      */
    getProperties(): Promise<WindowProperties>;

    /**
     * Get the properties of current window
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    getWindowProperties(): WindowProperties;

    /**
     * Get the avoid area
     * @param type Type of the area
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#getWindowAvoidArea
     */
    getAvoidArea(type: AvoidAreaType, callback: AsyncCallback<AvoidArea>): void;

    /**
     * Get the avoid area
     * @param type Type of the area
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#getWindowAvoidArea
     */
    getAvoidArea(type: AvoidAreaType): Promise<AvoidArea>;

    /**
     * Get the avoid area
     * @param type Type of the area
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @since 9
     */
    getWindowAvoidArea(type: AvoidAreaType): AvoidArea;

    /**
     * Set the flag of the window is shown full screen
     * @param isFullScreen the flag of the window is shown full screen
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowSystemBarEnable
     */
    setFullScreen(isFullScreen: boolean, callback: AsyncCallback<void>): void;

    /**
     * Set the flag of the window is shown full screen
     * @param isFullScreen the flag of the window is shown full screen
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowSystemBarEnable
     */
    setFullScreen(isFullScreen: boolean): Promise<void>;

    /**
     * Set the property of the window can layout in full screen
     * @param isLayoutFullScreen the window can layout in full screen
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowLayoutFullScreen
     */
    setLayoutFullScreen(isLayoutFullScreen: boolean, callback: AsyncCallback<void>): void;

    /**
     * Set the property of the window can layout in full screen
     * @param isLayoutFullScreen the window can layout in full screen
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowLayoutFullScreen
     */
    setLayoutFullScreen(isLayoutFullScreen: boolean): Promise<void>;

    /**
     * Set the property of the window can layout in full screen
     * @param isLayoutFullScreen the window can layout in full screen
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @since 9
     */
    setWindowLayoutFullScreen(isLayoutFullScreen: boolean, callback: AsyncCallback<void>): void;

    /**
     * Set the property of the window can layout in full screen
     * @param isLayoutFullScreen the window can layout in full screen
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @since 9
     */
    setWindowLayoutFullScreen(isLayoutFullScreen: boolean): Promise<void>;

    /**
     * Set the system bar to have visible.
     * @param names the set of system bar
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowSystemBarEnable
     */
    setSystemBarEnable(names: Array<'status'|'navigation'>, callback: AsyncCallback<void>): void;

    /**
     * Set the system bar to have visible.
     * @param names the set of system bar
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowSystemBarEnable
     */
    setSystemBarEnable(names: Array<'status'|'navigation'>): Promise<void>;

    /**
     * Set the system bar to have visible.
     * @param names the set of system bar
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @since 9
     */
    setWindowSystemBarEnable(names: Array<'status'|'navigation'>, callback: AsyncCallback<void>): void;

    /**
     * Set the system bar to have visible.
     * @param names the set of system bar
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @since 9
     */
    setWindowSystemBarEnable(names: Array<'status'|'navigation'>): Promise<void>;

    /**
     * Set the properties of system bar
     * @param systemBarProperties the properties of system bar
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowSystemBarProperties
     */
    setSystemBarProperties(systemBarProperties: SystemBarProperties, callback: AsyncCallback<void>): void;

    /**
     * Set the properties of system bar
     * @param systemBarProperties the properties of system bar
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowSystemBarProperties
     */
    setSystemBarProperties(systemBarProperties: SystemBarProperties): Promise<void>;

    /**
     * Set the properties of system bar
     * @param systemBarProperties the properties of system bar
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @since 9
     */
    setWindowSystemBarProperties(systemBarProperties: SystemBarProperties, callback: AsyncCallback<void>): void;

    /**
     * Set the properties of system bar
     * @param systemBarProperties the properties of system bar
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @since 9
     */
    setWindowSystemBarProperties(systemBarProperties: SystemBarProperties): Promise<void>;

    /**
     * Set the preferred orientation config of the window
     * @param orientation the orientation config of the window
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @since 9
     */
    setPreferredOrientation(orientation: Orientation): Promise<void>;

    /**
     * Set the preferred orientation config of the window
     * @param orientation the orientation config of the window
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @since 9
     */
    setPreferredOrientation(orientation: Orientation, callback: AsyncCallback<void>): void;

    /**
     * Loads content
     * @param path  path Path of the page to which the content will be loaded
     * @param storage storage The data object shared within the content instance loaded by the window
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @since 9
     * @StageModelOnly
     */
    loadContent(path: string, storage: LocalStorage, callback: AsyncCallback<void>): void;

    /**
     * Loads content
     * @param path path of the page to which the content will be loaded
     * @param storage storage The data object shared within the content instance loaded by the window
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @since 9
     * @StageModelOnly
     */
    loadContent(path: string, storage: LocalStorage): Promise<void>;

    /**
     * Loads content
     * @param path path of the page to which the content will be loaded
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#setUIContent
     */
    loadContent(path: string, callback: AsyncCallback<void>): void;

    /**
     * Loads content
     * @param path path of the page to which the content will be loaded
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#setUIContent
     */
    loadContent(path: string): Promise<void>;

    /**
     * Loads content
     * @param path path of the page to which the content will be loaded
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @since 9
     */
    setUIContent(path: string, callback: AsyncCallback<void>): void;

    /**
     * Loads content
     * @param path path of the page to which the content will be loaded
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @since 9
     */
    setUIContent(path: string): Promise<void>;

    /**
     * Checks whether the window is displayed
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#isWindowShowing
     */
    isShowing(callback: AsyncCallback<boolean>): void;

    /**
     * Checks whether the window is displayed
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#isWindowShowing
     */
    isShowing(): Promise<boolean>;

    /**
     * Checks whether the window is displayed
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    isWindowShowing(): boolean;

    /**
     * Register the callback of windowSizeChange
     * @param type: 'windowSizeChange'
     * @throws {BusinessError} 401 - If param is invalid
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     */
    on(type: 'windowSizeChange', callback: Callback<Size>): void;

    /**
     * Unregister the callback of windowSizeChange
     * @param type: 'windowSizeChange'
     * @throws {BusinessError} 401 - If param is invalid
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     */
    off(type: 'windowSizeChange', callback?: Callback<Size>): void;

    /**
     * Register the callback of systemAvoidAreaChange
     * @param type: 'systemAvoidAreaChange'
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#on_avoidAreaChange
     */
    on(type: 'systemAvoidAreaChange', callback: Callback<AvoidArea>): void;

    /**
     * Unregister the callback of systemAvoidAreaChange
     * @param type: 'systemAvoidAreaChange'
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#off_avoidAreaChange
     */
    off(type: 'systemAvoidAreaChange', callback?: Callback<AvoidArea>): void;

    /**
     * Register the callback of avoidAreaChange
     * @param type: 'avoidAreaChange'
     * @throws {BusinessError} 401 - If param is invalid
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    on(type: 'avoidAreaChange', callback: Callback<{ type: AvoidAreaType, area: AvoidArea }>): void;

    /**
     * Unregister the callback of avoidAreaChange
     * @param type: 'avoidAreaChange'
     * @throws {BusinessError} 401 - If param is invalid
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    off(type: 'avoidAreaChange', callback?: Callback<{ type: AvoidAreaType, area: AvoidArea }>): void;

    /**
     * Register the callback of keyboardHeightChange
     * @param type: 'keyboardHeightChange'
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @throws {BusinessError} 401 - If param is invalid
     */
    on(type: 'keyboardHeightChange', callback: Callback<number>): void;

    /**
     * Unregister the callback of keyboardHeightChange
     * @param type: 'keyboardHeightChange'
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @throws {BusinessError} 401 - If param is invalid
     */
    off(type: 'keyboardHeightChange', callback?: Callback<number>): void;

    /**
     * Touch outside callback on.
     * @throws {BusinessError} 401 - If param is invalid
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    on(type: 'touchOutside', callback: Callback<void>): void;

    /**
     * Touch outside callback off.
     * @throws {BusinessError} 401 - If param is invalid
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    off(type: 'touchOutside', callback?: Callback<void>): void;

    /**
     * Register the callback of screenshot, only the focused window called back
     * @param type: 'screenshot'
     * @throws {BusinessError} 401 - If param is invalid
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    on(type: 'screenshot', callback: Callback<void>): void;

     /**
      * Unregister the callback of screenshot
      * @param type: 'screenshot'
      * @throws {BusinessError} 401 - If param is invalid
      * @syscap SystemCapability.WindowManager.WindowManager.Core
      * @since 9
      */
    off(type: 'screenshot', callback?: Callback<void>): void;

    /**
     * Bind dialog to the target window.
     * @param token token of the target window.
     * @param deathCallback the callback of dialogDeath.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    bindDialogTarget(token: rpc.RemoteObject, deathCallback: Callback<void>): Promise<void>;

    /**
     * Bind dialog to the target window.
     * @param token token of the target window.
     * @param deathCallback the callback of dialogDeath.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    bindDialogTarget(token: rpc.RemoteObject, deathCallback: Callback<void>, callback: AsyncCallback<void>): void;

    /**
     * Bind dialog to the target window.
     * @param requestInfo requestInfo of the target window.
     * @param deathCallback the callback of dialogDeath.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    bindDialogTarget(requestInfo: dialogRequest.RequestInfo, deathCallback: Callback<void>): Promise<void>;

    /**
     * Bind dialog to the target window.
     * @param requestInfo requestInfo of the target window.
     * @param deathCallback the callback of dialogDeath.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    bindDialogTarget(requestInfo: dialogRequest.RequestInfo, deathCallback: Callback<void>, callback: AsyncCallback<void>): void;

    /**
     * Whether the window supports thr wide gamut setting.
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.window.Window#isWindowSupportWideGamut
     */
    isSupportWideGamut(): Promise<boolean>;

    /**
     * Whether the window supports thr wide gamut setting.
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.window.Window#isWindowSupportWideGamut
     */
    isSupportWideGamut(callback: AsyncCallback<boolean>): void;

    /**
     * Whether the window supports thr wide gamut setting.
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @since 9
     */
    isWindowSupportWideGamut(): Promise<boolean>;

    /**
     * Whether the window supports thr wide gamut setting.
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @since 9
     */
     isWindowSupportWideGamut(callback: AsyncCallback<boolean>): void;

    /**
     * Sets the specified color space.
     * @param colorSpace the specified color space.
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowColorSpace
     */
    setColorSpace(colorSpace:ColorSpace): Promise<void>;

    /**
     * Sets the specified color space.
     * @param colorSpace the specified color space.
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowColorSpace
     */
    setColorSpace(colorSpace:ColorSpace, callback: AsyncCallback<void>): void;

    /**
     * Sets the specified color space.
     * @param colorSpace the specified color space.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @since 9
     */
    setWindowColorSpace(colorSpace:ColorSpace): Promise<void>;

    /**
     * Sets the specified color space.
     * @param colorSpace the specified color space.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @since 9
     */
    setWindowColorSpace(colorSpace:ColorSpace, callback: AsyncCallback<void>): void;

    /**
     * Obtains the set color space.
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.window.Window#getWindowColorSpace
     */
    getColorSpace(): Promise<ColorSpace>;

    /**
     * Obtains the set color space.
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.window.Window#getWindowColorSpace
     */
    getColorSpace(callback: AsyncCallback<ColorSpace>): void;

    /**
     * Obtains the set color space.
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @since 9
     */
    getWindowColorSpace(): ColorSpace;

    /**
     * Sets the background color of window.
     * @param color the specified color.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowBackgroundColor
     */
    setBackgroundColor(color: string): Promise<void>;

    /**
     * Sets the background color of window.
     * @param color the specified color.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowBackgroundColor
     */
    setBackgroundColor(color: string, callback: AsyncCallback<void>): void;

    /**
     * Sets the background color of window.
     * @param color the specified color.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    setWindowBackgroundColor(color: string): void;

    /**
     * Sets the brightness of window.
     * @param brightness the specified brightness value.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowBrightness
     */
    setBrightness(brightness: number): Promise<void>;

    /**
     * Sets the brightness of window.
     * @param brightness the specified brightness value.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowBrightness
     */
    setBrightness(brightness: number, callback: AsyncCallback<void>): void;

    /**
     * Sets the brightness of window.
     * @param brightness the specified brightness value.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @since 9
     */
    setWindowBrightness(brightness: number): Promise<void>;

    /**
     * Sets the brightness of window.
     * @param brightness the specified brightness value.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @since 9
     */
    setWindowBrightness(brightness: number, callback: AsyncCallback<void>): void;

    /**
    * Sets the dimBehind of window.
    * @param dimBehindValue the specified dimBehind.
    * @syscap SystemCapability.WindowManager.WindowManager.Core
    * @since 7
    * @deprecated since 9
    */
    setDimBehind(dimBehindValue: number, callback: AsyncCallback<void>): void;

    /**
     * Sets the dimBehind of window.
     * @param dimBehind the specified dimBehind.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     */
    setDimBehind(dimBehindValue: number): Promise<void>;

    /**
     * Sets whether focusable or not.
     * @param isFocusable can be focus if true, or can not be focus if false.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowFocusable
     */
    setFocusable(isFocusable: boolean): Promise<void>;

    /**
     * Sets whether focusable or not.
     * @param isFocusable can be focus if true, or can not be focus if false.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowFocusable
     */
    setFocusable(isFocusable: boolean, callback: AsyncCallback<void>): void;

    /**
     * Sets whether focusable or not.
     * @param isFocusable can be focus if true, or can not be focus if false.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @since 9
     */
    setWindowFocusable(isFocusable: boolean): Promise<void>;

    /**
     * Sets whether focusable or not.
     * @param isFocusable can be focus if true, or can not be focus if false.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @since 9
     */
    setWindowFocusable(isFocusable: boolean, callback: AsyncCallback<void>): void;

    /**
     * Sets whether keep screen on or not.
     * @param isKeepScreenOn keep screen on if true, or not if false.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowKeepScreenOn
     */
    setKeepScreenOn(isKeepScreenOn: boolean): Promise<void>;

    /**
     * Sets whether keep screen on or not.
     * @param isKeepScreenOn keep screen on if true, or not if false.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowKeepScreenOn
     */
    setKeepScreenOn(isKeepScreenOn: boolean, callback: AsyncCallback<void>): void;

    /**
     * Sets whether keep screen on or not.
     * @param isKeepScreenOn keep screen on if true, or not if false.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    setWindowKeepScreenOn(isKeepScreenOn: boolean): Promise<void>;

    /**
     * Sets whether keep screen on or not.
     * @param isKeepScreenOn keep screen on if true, or not if false.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    setWindowKeepScreenOn(isKeepScreenOn: boolean, callback: AsyncCallback<void>): void;

    /**
     * Sets whether to wake up the screen when this ability is restored.
     * @param wakeUp Specifies whether to wake up the screen. True means to wake it up, false means not.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    setWakeUpScreen(wakeUp: boolean): void;

    /**
    * Sets whether outside can be touch or not.
    * @param touchable outside can be touch if true, or not if false.
    * @syscap SystemCapability.WindowManager.WindowManager.Core
    * @since 7
    * @deprecated since 9
    */
    setOutsideTouchable(touchable: boolean): Promise<void>;

    /**
     * Sets whether outside can be touch or not.
     * @param touchable outside can be touch if true, or not if false.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     */
    setOutsideTouchable(touchable: boolean, callback: AsyncCallback<void>): void;

    /**
     * Sets whether is private mode or not.
     * @param isPrivacyMode in private mode if true, or not if false.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowPrivacyMode
     */
    setPrivacyMode(isPrivacyMode: boolean): Promise<void>;

    /**
     * Sets whether is private mode or not.
     * @param isPrivacyMode in private mode if true, or not if false.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowPrivacyMode
     */
    setPrivacyMode(isPrivacyMode: boolean, callback: AsyncCallback<void>): void;

    /**
     * Sets whether is private mode or not.
     * @param isPrivacyMode in private mode if true, or not if false.
     * @throws {BusinessError} 201 - If there is no permission
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @permission ohos.permission.PRIVACY_WINDOW
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    setWindowPrivacyMode(isPrivacyMode: boolean): Promise<void>;

    /**
     * Sets whether is private mode or not.
     * @param isPrivacyMode in private mode if true, or not if false.
     * @throws {BusinessError} 201 - If there is no permission
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @permission ohos.permission.PRIVACY_WINDOW
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
     setWindowPrivacyMode(isPrivacyMode: boolean, callback: AsyncCallback<void>): void;

    /**
     * Ignore this window during screenshot.
     * @param isSkip skip if true, or not if false.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    setSnapshotSkip(isSkip: boolean): void;

    /**
     * Sets whether is touchable or not.
     * @param isTouchable is touchable if true, or not if false.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowTouchable
     */
    setTouchable(isTouchable: boolean): Promise<void>;

    /**
     * Sets whether is touchable or not.
     * @param isTouchable is touchable if true, or not if false.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.window.Window#setWindowTouchable
     */
    setTouchable(isTouchable: boolean, callback: AsyncCallback<void>): void;

    /**
     * Sets whether is touchable or not.
     * @param isTouchable is touchable if true, or not if false.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    setWindowTouchable(isTouchable: boolean): Promise<void>;

    /**
     * Sets whether is touchable or not.
     * @param isTouchable is touchable if true, or not if false.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    setWindowTouchable(isTouchable: boolean, callback: AsyncCallback<void>): void;

    /**
     * Sets the flag of the window is forbidden to move in split screen mode
     * @param isForbidSplitMove the flag of the window is forbidden to move in split screen mode
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @systemapi
     * @since 9
     */
    setForbidSplitMove(isForbidSplitMove: boolean, callback: AsyncCallback<void>): void;

    /**
     * Sets the flag of the window is forbidden to move in split screen mode
     * @param isForbidSplitMove the flag of the window is forbidden to move in split screen mode
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300003 - If system state is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @systemapi
     * @since 9
     */
    setForbidSplitMove(isForbidSplitMove: boolean): Promise<void>;

    /**
     * Obtains snapshot of window
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     */
    snapshot(callback: AsyncCallback<image.PixelMap>): void;

     /**
      * Obtains snapshot of window
      * @throws {BusinessError} 1300002 - If window state is abnormally
      * @syscap SystemCapability.WindowManager.WindowManager.Core
      * @since 9
      */
    snapshot(): Promise<image.PixelMap>;

    /** Sets opacity  of window
     * @param opacity  Interval is 0.f-1.f.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300004 - If this window can not opacity
     * @systemapi
     * @since 9
     */
    opacity(opacity: number): void;

    /**
     * Sets scale options of window.
     * @param scaleOptions scale param of window.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300004 - If this window can not scale
     * @systemapi
     * @since 9
     */
    scale(scaleOptions: ScaleOptions): void;

    /**
     * Sets rotate options of window.
     * @param rotateOptions rotate param of window.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300004 - If this window can not rotate
     * @systemapi
     * @since 9
     */
    rotate(rotateOptions: RotateOptions): void;

    /**
     * Sets translate options of window.
     * @param translateOptions translate param of window.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300004 - If this window can not translate
     * @systemapi
     * @since 9
     */
    translate(translateOptions: TranslateOptions): void;

    /**
     * Get Transition Controller.
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300004 - If this window can not getTransitionController
     * @systemapi
     * @since 9
     */
    getTransitionController(): TransitionController;

    /**
     * Sets the window blur radius.
     * @param radius the blur radius.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300004 - If this window can not setBlur
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    setBlur(radius: number): void;

    /**
     * Sets the window backdrop blur radius.
     * @param radius the blur radius.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300004 - If this window can not setBackdropBlur
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    setBackdropBlur(radius: number): void;

    /**
     * Sets the window backdrop blur style.
     * @param blurStyle the specified blur style.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300004 - If this window can not setBackdropBlurStyle
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    setBackdropBlurStyle(blurStyle: BlurStyle): void;

    /**
     * Sets shadow.
     * @param radius the radius of the shadow.
     * @param color the color of the shadow.
     * @param offsetX the offset of the shadow on the x-axis.
     * @param offsetY the offset of the shadow on the y-axis.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300004 - If this window can not setShadow
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    setShadow(radius: number, color?: string, offsetX?: number, offsetY?: number): void;

    /**
     * Sets corner radius.
     * @param cornerRadius the corner radius.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300004 - If this window can not setCornerRadius
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    setCornerRadius(cornerRadius: number): void;
  }
  /**
   * Window stage callback event type
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 9
   * @StageModelOnly
   */
  enum WindowStageEventType {
    /**
     * The window stage is running in the foreground.
     * @since 9
     */
    SHOWN = 1,
    /**
     * The window stage gains focus.
     * @since 9
     */
    ACTIVE,
    /**
     * The window stage loses focus.
     * @since 9
     */
    INACTIVE,
    /**
     * The window stage is running in the background.
     * @since 9
     */
    HIDDEN,
  }
  /**
   * WindowStage
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 9
   */
  interface WindowStage {
    /**
     * Get main window of the stage.
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300005 - If window stage is abnormally
     * @since 9
     * @StageModelOnly
     */
    getMainWindow(): Promise<Window>;
    /**
     * Get main window of the stage.
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300005 - If window stage is abnormally
     * @since 9
     * @StageModelOnly
     */
    getMainWindow(callback: AsyncCallback<Window>): void;
    /**
     * Get main window of the stage.
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300005 - If window stage is abnormally
     * @since 9
     * @StageModelOnly
     */
     getMainWindowSync(): Window;
    /**
     * Create sub window of the stage.
     * @param name window name of sub window
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300005 - If window stage is abnormally
     * @since 9
     * @StageModelOnly
     */
    createSubWindow(name: string): Promise<Window>;
    /**
     * Create sub window of the stage.
     * @param name window name of sub window
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300005 - If window stage is abnormally
     * @since 9
     * @StageModelOnly
     */
    createSubWindow(name: string, callback: AsyncCallback<Window>): void;
    /**
     * Get sub window of the stage.
     * @throws {BusinessError} 1300005 - If window stage is abnormally
     * @since 9
     * @StageModelOnly
     */
    getSubWindow(): Promise<Array<Window>>;
    /**
     * Get sub window of the stage.
     * @throws {BusinessError} 1300005 - If window stage is abnormally
     * @since 9
     * @StageModelOnly
     */
    getSubWindow(callback: AsyncCallback<Array<Window>>): void;
    /**
     * Loads content
     * @param path  path Path of the page to which the content will be loaded
     * @param storage storage The data object shared within the content instance loaded by the window
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300005 - If window stage is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     * @StageModelOnly
     */
    loadContent(path: string, storage: LocalStorage, callback: AsyncCallback<void>): void;
    /**
     * Loads content
     * @param path path of the page to which the content will be loaded
     * @param storage storage The data object shared within the content instance loaded by the window
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300005 - If window stage is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     * @StageModelOnly
     */
    loadContent(path: string, storage?: LocalStorage): Promise<void>;
    /**
     * Loads content
     * @param path path of the page to which the content will be loaded
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300005 - If window stage is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @since 9
     * @StageModelOnly
     */
    loadContent(path: string, callback: AsyncCallback<void>): void;
    /**
     * Window stage event callback on.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300005 - If window stage is abnormally
     * @since 9
     * @StageModelOnly
     */
    on(eventType: 'windowStageEvent', callback: Callback<WindowStageEventType>): void;
    /**
     * Window stage event callback off.
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300005 - If window stage is abnormally
     * @since 9
     * @StageModelOnly
     */
    off(eventType: 'windowStageEvent', callback?: Callback<WindowStageEventType>): void;

    /**
     * Disable window decoration. It must be called before loadContent.
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300005 - If window stage is abnormally
     * @systemapi
     * @since 9
     * @StageModelOnly
     */
     disableWindowDecor(): void;

    /**
     * Sets whether can show on lock screen or not
     * @param showOnLockScreen can show on lock screen if true, or not if false
     * @throws {BusinessError} 401 - If param is invalid
     * @throws {BusinessError} 1300002 - If window state is abnormally
     * @throws {BusinessError} 1300005 - If window stage is abnormally
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @systemapi Hide this for inner system use.
     * @since 9
     * @StageModelOnly
     */
     setShowOnLockScreen(showOnLockScreen: boolean): void;
  }
}

export default window;
