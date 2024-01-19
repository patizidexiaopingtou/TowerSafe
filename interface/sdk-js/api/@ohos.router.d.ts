/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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

import {Callback} from './basic';
import { AsyncCallback } from './basic';

/**
 * @namespace router
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
declare namespace router {

  /**
   * Router Mode
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  export enum RouterMode {
    /**
     * Default route mode.
     * The page will be added to the top of the page stack.
     * @since 9
     */
    Standard,

    /**
     * Single route mode.
     * If the target page already has the same url page in the page stack,
     * the same url page closest to the top of the stack will be moved to the top of the stack.
     * If the target page url does not exist in the page stack, route will use default route mode.
     * @since 9
     */
    Single,
  }

  /**
   * @typedef RouterOptions
   * @syscap SystemCapability.ArkUI.ArkUI.Lite
   * @since 8
   */
  interface RouterOptions {

    /**
     * URI of the destination page, which supports the following formats:
     * 1. Absolute path of the page, which is provided by the pages list in the config.json file.
     *    Example:
     *      pages/index/index
     *      pages/detail/detail
     * 2. Particular path. If the URI is a slash (/), the home page is displayed.
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @type {string}
     * @since 8
     */
    url: string;

    /**
     * Data that needs to be passed to the destination page during navigation.
     * After the destination page is displayed, the parameter can be directly used for the page.
     * For example, this.data1 (data1 is the key value of the params used for page navigation.)
     * @syscap SystemCapability.ArkUI.ArkUI.Lite
     * @type {Object}
     * @since 8
     */
    params?: Object;
  }

  /**
   * @typedef RouterState
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  interface RouterState {

    /**
     * Index of the current page in the stack.
     * NOTE: The index starts from 1 from the bottom to the top of the stack.
     * @type {number}
     * @since 8
     */
    index: number;

    /**
     * Name of the current page, that is, the file name.
     * @type {string}
     * @since 8
     */
    name: string;

    /**
     * Path of the current page.
     * @type {string}
     * @since 8
     */
    path: string;
  }

  /**
   * @typedef EnableAlertOptions
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  interface EnableAlertOptions {

    /**
     * dialog context.
     * @type {string}
     * @since 8
     */
    message: string;
  }

  /**
   * Navigates to a specified page in the application based on the page URL and parameters.
   * @param { RouterOptions } options - Options.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   * @deprecated since 9
   * @useinstead ohos.router.router#pushUrl
   */
  function push(options: RouterOptions):void;

  /**
   * Navigates to a specified page in the application based on the page URL and parameters.
   * @param { RouterOptions } options - Options.
   * @param { AsyncCallback<void> } callback - the callback of pushUrl.
   * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
   * @throws { BusinessError } 100001 - if UI execution context not found.
   * @throws { BusinessError } 100002 - if the uri is not exist.
   * @throws { BusinessError } 100003 - if the pages are pushed too much.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  function pushUrl(options: RouterOptions, callback: AsyncCallback<void>):void;

  /**
   * Navigates to a specified page in the application based on the page URL and parameters.
   * @param { RouterOptions } options - Options.
   * @returns { Promise<void> } the promise returned by the function.
   * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
   * @throws { BusinessError } 100001 - if UI execution context not found.
   * @throws { BusinessError } 100002 - if the uri is not exist.
   * @throws { BusinessError } 100003 - if the pages are pushed too much.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  function pushUrl(options: RouterOptions): Promise<void>;

   /**
   * Navigates to a specified page in the application based on the page URL and parameters.
   * @param { RouterOptions } options - Options.
   * @param { RouterMode } mode - RouterMode.
   * @param { AsyncCallback<void> } callback - the callback of pushUrl.
   * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
   * @throws { BusinessError } 100001 - if UI execution context not found.
   * @throws { BusinessError } 100002 - if the uri is not exist.
   * @throws { BusinessError } 100003 - if the pages are pushed too much.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  function pushUrl(options: RouterOptions, mode: RouterMode, callback: AsyncCallback<void>):void;

  /**
   * Navigates to a specified page in the application based on the page URL and parameters.
   * @param { RouterOptions } options - Options.
   * @param { RouterMode } mode - RouterMode.
   * @returns { Promise<void> } the promise returned by the function.
   * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
   * @throws { BusinessError } 100001 - if UI execution context not found.
   * @throws { BusinessError } 100002 - if the uri is not exist.
   * @throws { BusinessError } 100003 - if the pages are pushed too much.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  function pushUrl(options: RouterOptions, mode: RouterMode): Promise<void>;

  /**
   * Replaces the current page with another one in the application. The current page is destroyed after replacement.
   * @param { RouterOptions } options - Options.
   * @syscap SystemCapability.ArkUI.ArkUI.Lite
   * @since 8
   * @deprecated since 9
   * @useinstead ohos.router.router#replaceUrl
   */
  function replace(options: RouterOptions):void;

  /**
   * Replaces the current page with another one in the application. The current page is destroyed after replacement.
   * @param { RouterOptions } options - Options.
   * @param { AsyncCallback<void> } callback - the callback of replaceUrl.
   * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
   * @throws { BusinessError } 100001 - if UI execution context not found, only throw in standard system.
   * @throws { BusinessError } 200002 - if the uri is not exist.
   * @syscap SystemCapability.ArkUI.ArkUI.Lite
   * @since 9
   */
  function replaceUrl(options: RouterOptions, callback: AsyncCallback<void>):void;

  /**
   * Replaces the current page with another one in the application. The current page is destroyed after replacement.
   * @param { RouterOptions } options - Options.
   * @returns { Promise<void> } the promise returned by the function.
   * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
   * @throws { BusinessError } 100001 - if UI execution context not found, only throw in standard system.
   * @throws { BusinessError } 200002 - if the uri is not exist.
   * @syscap SystemCapability.ArkUI.ArkUI.Lite
   * @since 9
   */
  function replaceUrl(options: RouterOptions): Promise<void>;

  /**
   * Replaces the current page with another one in the application. The current page is destroyed after replacement.
   * @param { RouterOptions } options - Options.
   * @param { RouterMode } mode - RouterMode.
   * @param { AsyncCallback<void> } callback - the callback of replaceUrl.
   * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
   * @throws { BusinessError } 100001 - if UI execution context not found, only throw in standard system.
   * @throws { BusinessError } 200002 - if the uri is not exist.
   * @syscap SystemCapability.ArkUI.ArkUI.Lite
   * @since 9
   */
  function replaceUrl(options: RouterOptions, mode: RouterMode, callback: AsyncCallback<void>):void;

  /**
   * Replaces the current page with another one in the application. The current page is destroyed after replacement.
   * @param { RouterOptions } options - Options.
   * @param { RouterMode } mode - RouterMode.
   * @returns { Promise<void> } the promise returned by the function.
   * @throws { BusinessError } 401 - if the number of parameters is less than 1 or the type of the url parameter is not string.
   * @throws { BusinessError } 100001 - if can not get the delegate, only throw in standard system.
   * @throws { BusinessError } 200002 - if the uri is not exist.
   * @syscap SystemCapability.ArkUI.ArkUI.Lite
   * @since 9
   */
  function replaceUrl(options: RouterOptions, mode: RouterMode): Promise<void>;

  /**
   * Returns to the previous page or a specified page.
   * @param { RouterOptions } options - Options.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  function back(options?: RouterOptions):void;

  /**
   * Clears all historical pages and retains only the current page at the top of the stack.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  function clear():void;

  /**
   * Obtains the number of pages in the current stack.
   * @returns { string } Number of pages in the stack. The maximum value is 32.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  function getLength():string;

  /**
   * Obtains information about the current page state.
   * @returns { RouterState }Page state.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  function getState():RouterState;

  /**
   * Pop up dialog to ask whether to back
   * @param { EnableAlertOptions } options - Options.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   * @deprecated since 9
   * @useinstead ohos.router.router#showAlertBeforeBackPage
   */
  function enableAlertBeforeBackPage(options: EnableAlertOptions):void;

  /**
   * Pop up alert dialog to ask whether to back
   * @param { EnableAlertOptions } options - Options.
   * @throws { BusinessError } 401 - if the type of the parameter is not object or the type of the message is not string.
   * @throws { BusinessError } 100001 - if UI execution context not found.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  function showAlertBeforeBackPage(options: EnableAlertOptions):void;

  /**
   * Cancel enableAlertBeforeBackPage
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   * @deprecated since 9
   * @useinstead ohos.router.router#hideAlertBeforeBackPage
   */
  function disableAlertBeforeBackPage():void;

  /**
   * Hide alert before back page
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
   function hideAlertBeforeBackPage():void;

  /**
   * Obtains information about the current page params.
   * @returns { Object }Page params.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  function getParams(): Object;
}

export default router;
