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
 * Provides methods to operate or manage Connected Tag.
 *
 * @since 8
 * @syscap SystemCapability.Communication.ConnectedTag
 */
declare namespace connectedTag {
    /**
     * Initializes Connected Tag.
     *
     * @returns Returns true or false.
     * @permission ohos.permission.NFC_TAG
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.connectedTag/connectedTag#initialize
     */
    function init(): boolean;

    /**
     * Initializes the connected NFC tag.
     *
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3200101 - Connected NFC tag running state is abnormal in service.
     * @permission ohos.permission.NFC_TAG
     * @since 9
     */
    function initialize(): void;

    /**
     * UnInitializes Connected Tag.
     *
     * @returns Returns true or false.
     * @permission ohos.permission.NFC_TAG
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.connectedTag/connectedTag#uninitialize
     */
    function uninit(): boolean;

    /**
     * Uninitializes the connected NFC tag.
     *
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3200101 - Connected NFC tag running state is abnormal in service.
     * @permission ohos.permission.NFC_TAG
     * @since 9
     */
    function uninitialize(): void;

    /**
     * Reads the NDEF Data.
     *
     * @returns Returns the NDEF Data.
     * @permission ohos.permission.NFC_TAG
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.connectedTag/connectedTag#read
     */
    function readNdefTag(): Promise<string>;
    function readNdefTag(callback: AsyncCallback<string>): void;

    /**
     * Reads the NDEF data from the connected NFC tag.
     *
     * @returns The reponse NDEF data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3200101 - Connected NFC tag running state is abnormal in service.
     * @permission ohos.permission.NFC_TAG
     * @since 9
     */
    function read(): Promise<number[]>;
    function read(callback: AsyncCallback<number[]>): void;

    /**
     * Writes the NDEF Data.
     *
     * @param data The Data to write.
     * @returns Returns true or false.
     * @permission ohos.permission.NFC_TAG
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.connectedTag/connectedTag#write
     */
    function writeNdefTag(data: string): Promise<void>;
    function writeNdefTag(data: string, callback: AsyncCallback<void>): void;

    /**
     * Writes the NDEF data to the connected NFC tag.
     *
     * @param data Indicates the NDEF data to send, which is a byte array.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3200101 - Connected NFC tag running state is abnormal in service.
     * @permission ohos.permission.NFC_TAG
     * @since 9
     */
    function write(data: number[]): Promise<void>;
    function write(data: number[], callback: AsyncCallback<void>): void;

    /**
     * Subscribes NFC RF status change events.
     *
     * @type The callback type.
     * @param callback The callback function to be registered.
     * @returns Returns NFC_RF_LEAVE or NFC_RF_ENTER
     * @permission ohos.permission.NFC_TAG
     * @since 8
     */
    function on(type: "notify", callback: Callback<number>): void;

    /**
     * Unsubscribes NFC RF status change events.
     *
     * <p>All callback functions will be unregistered If there is no specific callback parameter.</p>
     *
     * @type The callback type.
     * @param callback The callback function to be unregistered.
     * @permission ohos.permission.NFC_TAG
     * @since 8
     */
    function off(type: "notify", callback?:Callback<number>): void;

    /**
     * Describes the NFC RF type.
     *
     * @since 8
     */
    enum NfcRfType {
        /** NFC RF LEAVE */
        NFC_RF_LEAVE = 0,

        /** NFC RF ENTER */
        NFC_RF_ENTER = 1,
    }
}

export default connectedTag;
