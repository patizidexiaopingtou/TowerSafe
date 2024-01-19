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

import { AsyncCallback, Callback } from './basic';

/**
 * Interface of display manager.
 * @syscap SystemCapability.WindowManager.WindowManager.Core
 * @since 7
 */
declare namespace display {
  /**
   * Obtain the default display.
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.display#getDefaultDisplaySync
   */
  function getDefaultDisplay(callback: AsyncCallback<Display>): void;

  /**
   * Obtain the default display.
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.display#getDefaultDisplaySync
   */
  function getDefaultDisplay(): Promise<Display>;

  /**
   * Obtain the default display.
   * @throws {BusinessError} 1400001 - If display or screen is invalid
   * @since 9
   */
  function getDefaultDisplaySync(): Display;

  /**
   * Obtain all displays.
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.display#getAllDisplays
   */
  function getAllDisplay(callback: AsyncCallback<Array<Display>>): void;

  /**
   * Obtain all displays.
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.display#getAllDisplays
   */
  function getAllDisplay(): Promise<Array<Display>>;

  /**
   * Obtain all displays.
   * @throws {BusinessError} 1400001 - If display or screen is invalid
   * @since 9
   */
   function getAllDisplays(callback: AsyncCallback<Array<Display>>): void;

   /**
    * Obtain all displays.
    * @throws {BusinessError} 1400001 - If display or screen is invalid
    * @since 9
    */
   function getAllDisplays(): Promise<Array<Display>>;

  /**
   * Check whether there is a privacy window on the current display.
   * @param displayId Display id to query
   * @throws {BusinessError} 401 - If param is invalid
   * @throws {BusinessError} 1400003 - If system works abnormally
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  function hasPrivateWindow(displayId: number): boolean;

  /**
   * Register the callback for display changes.
   * @param type: type of callback
   * @since 7
   * @throws {BusinessError} 401 - If param is invalid
   */
  function on(type: 'add' | 'remove' | 'change', callback: Callback<number>): void;

  /**
   * Unregister the callback for display changes.
   * @param type: type of callback
   * @since 7
   * @throws {BusinessError} 401 - If param is invalid
   */
  function off(type: 'add' | 'remove' | 'change', callback?: Callback<number>): void;

  /**
   * Enumerates the display states.
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 7
   */
  enum DisplayState {
    /**
     * Unknown.
     */
    STATE_UNKNOWN = 0,
    /**
     * Screen off.
     */
    STATE_OFF,
    /**
     * Screen on.
     */
    STATE_ON,
    /**
     * Doze, but it will update for some important system messages.
     */
    STATE_DOZE,
    /**
     * Doze and not update.
     */
    STATE_DOZE_SUSPEND,
    /**
     * VR node.
     */
    STATE_VR,
    /**
     * Screen on and not update.
     */
    STATE_ON_SUSPEND,
  }

  /**
   * Rectangle
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 9
   */
  interface Rect {
    /**
     * The X-axis coordinate of the upper left vertex of the rectangle, in pixels.
     * @since 9
     */
    left: number;

    /**
     * The Y-axis coordinate of the upper left vertex of the rectangle, in pixels.
     * @since 9
     */
    top: number;

    /**
     * Width of the rectangle, in pixels.
     * @since 9
     */
    width: number;
    
    /**
     * Height of the rectangle, in pixels.
     * @since 9
     */
    height: number;
  }

  /**
   * Curved area rects of the waterfall display.
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 9
   */
  interface WaterfallDisplayAreaRects {
    /**
     * Indicates the size of left side curved area of the waterfall screen.
     * @since 9
     */
    readonly left: Rect;

    /**
     * Indicates the size of right side curved area of the waterfall screen.
     * @since 9
     */
    readonly right: Rect;

    /**
     * Indicates the size of top side curved area of the waterfall screen.
     * @since 9
     */
    readonly top: Rect;

    /**
     * Indicates the size of bottom side curved area of the waterfall screen.
     * @since 9
     */
    readonly bottom: Rect;
  }

  /**
   * Cutout information of the display.
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 9
   */
  interface CutoutInfo {
    /**
     * Bounding rectangles of the cutout areas of the display.
     * @since 9
     */
    readonly boundingRects: Array<Rect>;

    /**
     * Rectangles of curved parts on each side of a waterfall display.
     * @since 9
     */
    readonly waterfallDisplayAreaRects: WaterfallDisplayAreaRects;
  }

  /**
   * Define properties of the display. They cannot be updated automatically.
   * @syscap SystemCapability.WindowManager.WindowManager.Core
   * @since 7
   */
  interface Display {
    /**
     * Display ID.
     */
    id: number;

    /**
     * Display name.
     */
    name: string;

    /**
     * The display is alive.
     */
    alive: boolean;

    /**
     * The state of display.
     */
    state: DisplayState;

    /**
     * Refresh rate, in Hz.
     */
    refreshRate: number;

    /**
     * Rotation degrees of the display.
     */
    rotation: number;

    /**
     * Display width, in pixels.
     */
    width: number;

    /**
     * Display height, in pixels.
     */
    height: number;

    /**
     * Display resolution.
     */
    densityDPI: number;

    /**
     * Display density, in pixels. The value for a low-resolution display is 1.0.
     */
    densityPixels: number;

    /**
     * Text scale density of the display.
     */
    scaledDensity: number;

    /**
     * DPI on the x-axis.
     */
    xDPI: number;

    /**
     * DPI on the y-axis.
     */
    yDPI: number;

    /**
     * Obtain the cutout info of the display.
     * @throws {BusinessError} 1400001 - If display or screen is invalid
     * @since 9
     */
    getCutoutInfo(callback: AsyncCallback<CutoutInfo>): void;

    /**
     * Obtain the cutout info of the display.
     * @throws {BusinessError} 1400001 - If display or screen is invalid
     * @since 9
     */
    getCutoutInfo(): Promise<CutoutInfo>;
  }
}

export default display;