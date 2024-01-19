/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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

import { AsyncCallback, Callback } from './basic';

/**
 * Provides extended methods to operate or manage Wi-Fi.
 *
 * <p>The APIs involved in this file are non-general APIs.
 * These extended APIs are only used by some product types, such as routers. 
 * Common products should not use these APIs.</p>
 *
 * @since 9
 * @import import wifiManagerExt from '@ohos.wifiManagerExt';
 */
declare namespace wifiManagerExt {
    /**
     * Enable a Wi-Fi hotspot.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2701000 - Operation failed.
     * @permission ohos.permission.MANAGE_WIFI_HOTSPOT_EXT
     * @syscap SystemCapability.Communication.WiFi.AP.Extension
     */
     function enableHotspot(): void;

     /**
      * Disable a Wi-Fi hotspot.
      *
      * @since 9
      * @throws {BusinessError} 201 - Permission denied.
      * @throws {BusinessError} 801 - Capability not supported.
      * @throws {BusinessError} 2701000 - Operation failed.
      * @permission ohos.permission.MANAGE_WIFI_HOTSPOT_EXT
      * @syscap SystemCapability.Communication.WiFi.AP.Extension
      */
     function disableHotspot(): void;

    /**
     * Obtain the supported power Mode.
     *
     * @returns Returns the array of supported power Mode.
     *
      * @since 9
      * @throws {BusinessError} 201 - Permission denied.
      * @throws {BusinessError} 801 - Capability not supported.
      * @throws {BusinessError} 2701000 - Operation failed.
     * @permission ohos.permission.GET_WIFI_INFO
     * @syscap SystemCapability.Communication.WiFi.AP.Extension
     */
     function getSupportedPowerMode(): Promise<Array<PowerMode>>;
     function getSupportedPowerMode(callback: AsyncCallback<Array<PowerMode>>): void;

    /**
     * Obtain the current Wi-Fi power mode.
     *
     * @returns Returns the current Wi-Fi power mode. If a value less than zero is returned, it indicates a failure.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2701000 - Operation failed.
     * @permission ohos.permission.GET_WIFI_INFO
     * @syscap SystemCapability.Communication.WiFi.AP.Extension
     */
    function getPowerMode (): Promise<PowerMode>;
    function getPowerMode (callback: AsyncCallback<PowerMode>): void;

    /**
     * Set the current Wi-Fi power mode.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2701000 - Operation failed.
     * @permission ohos.permission.MANAGE_WIFI_HOTSPOT_EXT
     * @syscap SystemCapability.Communication.WiFi.AP.Extension
     */
    function setPowerMode(mode: PowerMode) : void

    /**
     * The power Mode enumeration.
     *
     * @since 9
     * @syscap SystemCapability.Communication.WiFi.AP.Extension
     */
     export enum PowerMode {
        /** Sleeping Mode. */
        SLEEPING = 0,

        /** General Mode. */
        GENERAL = 1,

        /** Through wall Mode. */
        THROUGH_WALL = 2,
    }
}

export default wifiManagerExt;
