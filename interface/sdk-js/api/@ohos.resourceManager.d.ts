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

import { RawFileDescriptor as _RawFileDescriptor } from './global/rawFileDescriptor';
import { Resource as _Resource } from './global/resource';
import { AsyncCallback as _AsyncCallback } from './basic';

/**
 * Provides resource related APIs.
 *
 * @since 6
 * @syscap SystemCapability.Global.ResourceManager
 */
declare namespace resourceManager {
/**
 * Enumerates screen directions.
 *
 * @since 6
 */
export enum Direction {
    /**
     * Indicates the vertical direction.
     *
     * @since 6
     */
    DIRECTION_VERTICAL = 0,

    /**
     * Indicates the horizontal direction.
     *
     * @since 6
     */
    DIRECTION_HORIZONTAL = 1
}

/**
 * Enumerates device types.
 *
 * @since 6
 */
export enum DeviceType {
    /**
     * Indicates a phone.
     *
     * @since 6
     */
    DEVICE_TYPE_PHONE = 0x00,

    /**
     * Indicates a tablet.
     *
     * @since 6
     */
    DEVICE_TYPE_TABLET = 0x01,

    /**
     * Indicates a car.
     *
     * @since 6
     */
    DEVICE_TYPE_CAR = 0x02,

    /**
     * Indicates a PC.
     *
     * @since 6
     */
    DEVICE_TYPE_PC = 0x03,

    /**
     * Indicates a smart TV.
     *
     * @since 6
     */
    DEVICE_TYPE_TV = 0x04,

    /**
     * Indicates a wearable device.
     *
     * @since 6
     */
    DEVICE_TYPE_WEARABLE = 0x06
}

/**
 * Enumerates screen density types.
 *
 * @since 6
 */
export enum ScreenDensity {
    /**
     * Indicates small screen density.
     *
     * @since 6
     */
    SCREEN_SDPI = 120,

    /**
     * Indicates medium screen density.
     *
     * @since 6
     */
    SCREEN_MDPI = 160,

    /**
     * Indicates large screen density.
     *
     * @since 6
     */
    SCREEN_LDPI = 240,

    /**
     * Indicates extra-large screen density.
     *
     * @since 6
     */
    SCREEN_XLDPI = 320,

    /**
     * Indicates extra-extra-large screen density.
     *
     * @since 6
     */
    SCREEN_XXLDPI = 480,

    /**
     * Indicates extra-extra-extra-large screen density.
     *
     * @since 6
     */
    SCREEN_XXXLDPI = 640
}

/**
 * Provides the device configuration.
 *
 * @since 6
 */
export class Configuration {
    /**
     * Indicates the screen direction of the current device.
     *
     * @since 6
     */
    direction: Direction

    /**
     * Indicates the current system language, for example, zh-Hans-CN.
     *
     * @since 6
     */
    locale: string
}

/**
 * Provides the device capability.
 *
 * @since 6
 */
export class DeviceCapability {
    /**
     * Indicates the screen density of the current device.
     *
     * @since 6
     */
    screenDensity: ScreenDensity

    /**
     * Indicates the type of the current device.
     *
     * @since 6
     */
    deviceType: DeviceType
}

/**
 * The ResourceManager callback.
 * @since 6
 * @deprecated since 9
 */
 export interface AsyncCallback<T> {
    (err: Error, data: T): void;
}

/**
 * Obtains the ResourceManager object of the current application.
 *
 * @param callback Indicates the callback containing the ResourceManager object.
 * @since 6
 * @FAModelOnly
 */
export function getResourceManager(callback: AsyncCallback<ResourceManager>): void;

/**
 * Obtains the ResourceManager object of the specified application.
 *
 * @param bundleName Indicates the bundle name of the specified application.
 * @param callback Indicates the callback containing the ResourceManager object.
 * @since 6
 * @FAModelOnly
 */
export function getResourceManager(bundleName: string, callback: AsyncCallback<ResourceManager>): void;

/**
 * Obtains the ResourceManager object of the current application.
 *
 * @returns Returns that the ResourceManager object is returned in Promise mode.
 * @since 6
 * @FAModelOnly
 */
export function getResourceManager(): Promise<ResourceManager>;

/**
 * Obtains the ResourceManager object of the specified application.
 *
 * @param bundleName Indicates the bundle name of the specified application.
 * @returns Returns that the ResourceManager object is returned in Promise mode.
 * @since 6
 * @FAModelOnly
 */
export function getResourceManager(bundleName: string): Promise<ResourceManager>;

/**
 * Provides the capability of accessing application resources.
 *
 * @since 6
 */
export interface ResourceManager {
    /**
     * Obtains the character string corresponding to a specified resource ID in callback mode.
     *
     * @param resId Indicates the resource ID.
     * @param callback Indicates the asynchronous callback used to return the obtained character string.
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.resourceManager.getStringValue
     */
    getString(resId: number, callback: AsyncCallback<string>): void;

    /**
     * Obtains string resources associated with a specified resource ID in Promise mode.
     *
     * @param resId Indicates the resource ID.
     * @returns Returns the character string corresponding to the resource ID.
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.resourceManager.getStringValue
     */
    getString(resId: number): Promise<string>;

    /**
     * Obtains the character string corresponding to a specified resource object in callback mode.
     *
     * @param resource Indicates the resource object.
     * @param callback Indicates the asynchronous callback used to return the obtained character string.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the module resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by module resId.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getStringValue(resource: Resource, callback: _AsyncCallback<string>): void;

    /**
     * Obtains string resources associated with a specified resource object in Promise mode.
     *
     * @param resource Indicates the resource object.
     * @returns Returns the character string corresponding to the resource object.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the module resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by module resId.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getStringValue(resource: Resource): Promise<string>;

    /**
     * Obtains the array of character strings corresponding to a specified resource ID in callback mode.
     *
     * @param resId Indicates the resource ID.
     * @param callback Indicates the asynchronous callback used to return the obtained array of character strings.
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.resourceManager.getStringArrayValue
     */
    getStringArray(resId: number, callback: AsyncCallback<Array<string>>): void;

    /**
     * Obtains the array of character strings corresponding to a specified resource ID in Promise mode.
     *
     * @param resId Indicates the resource ID.
     * @returns Returns the array of character strings corresponding to the specified resource ID.
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.resourceManager.getStringArrayValue
     */
    getStringArray(resId: number): Promise<Array<string>>;

    /**
     * Obtains the array of character strings corresponding to a specified resource object in callback mode.
     *
     * @param resource Indicates the resource object.
     * @param callback Indicates the asynchronous callback used to return the obtained array of character strings.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the module resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by module resId.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getStringArrayValue(resource: Resource, callback: _AsyncCallback<Array<string>>): void;

    /**
     * Obtains the array of character strings corresponding to a specified resource object in Promise mode.
     *
     * @param resource Indicates the resource object.
     * @returns Returns the array of character strings corresponding to the specified resource object.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the module resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by module resId.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getStringArrayValue(resource: Resource): Promise<Array<string>>;

    /**
     * Obtains the content of the media file corresponding to a specified resource ID in callback mode.
     *
     * @param resId Indicates the resource ID.
     * @param callback Indicates the asynchronous callback used to return the obtained media file content.
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.resourceManager.getMediaContent
     */
    getMedia(resId: number, callback: AsyncCallback<Uint8Array>): void;

    /**
     * Obtains the content of the media file corresponding to a specified resource ID in Promise mode.
     *
     * @param resId Indicates the resource ID.
     * @returns Returns the content of the media file corresponding to the specified resource ID.
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.resourceManager.getMediaContent
     */
    getMedia(resId: number): Promise<Uint8Array>;

    /**
     * Obtains the content of the media file corresponding to a specified resource object in callback mode.
     *
     * @param resource Indicates the resource object.
     * @param callback Indicates the asynchronous callback used to return the obtained media file content.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the module resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by module resId.
     * @since 9
     */
    getMediaContent(resource: Resource, callback: _AsyncCallback<Uint8Array>): void;

    /**
     * Obtains the content of the media file corresponding to a specified resource object in Promise mode.
     *
     * @param resource Indicates the resource object.
     * @returns Returns the content of the media file corresponding to the specified resource object.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the module resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by module resId.
     * @since 9
     */
    getMediaContent(resource: Resource): Promise<Uint8Array>;

    /**
     * Obtains the Base64 code of the image resource corresponding to the specified resource ID in callback mode.
     *
     * @param resId Indicates the resource ID.
     * @param callback Indicates the asynchronous callback used to return the obtained Base64 code of the image
     *                 resource.
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.resourceManager.getMediaContentBase64
     */
    getMediaBase64(resId: number, callback: AsyncCallback<string>): void;

    /**
     * Obtains the Base64 code of the image resource corresponding to the specified resource ID in Promise mode.
     *
     * @param resId Indicates the resource ID.
     * @returns Returns the Base64 code of the image resource corresponding to the specified resource ID.
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.resourceManager.getMediaContentBase64
     */
    getMediaBase64(resId: number): Promise<string>;

    /**
     * Obtains the Base64 code of the image resource corresponding to the specified resource object in callback mode.
     *
     * @param resource Indicates the resource object.
     * @param callback Indicates the asynchronous callback used to return the obtained Base64 code of the image
     *                 resource.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the module resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by module resId.
     * @since 9
     */
    getMediaContentBase64(resource: Resource, callback: _AsyncCallback<string>): void;

    /**
     * Obtains the Base64 code of the image resource corresponding to the specified resource object in Promise mode.
     *
     * @param resource Indicates the resource object.
     * @returns Returns the Base64 code of the image resource corresponding to the specified resource object.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the module resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by module resId.
     * @since 9
     */
    getMediaContentBase64(resource: Resource): Promise<string>;

    /**
     * Obtains the device capability in callback mode.
     *
     * @param callback Indicates the asynchronous callback used to return the obtained device capability.
     * @since 6
     */
    getDeviceCapability(callback: _AsyncCallback<DeviceCapability>): void;

    /**
     * Obtains the device capability in Promise mode.
     *
     * @returns Returns the device capability.
     * @since 6
     */
    getDeviceCapability(): Promise<DeviceCapability>;

    /**
     * Obtains the device configuration in callback mode.
     *
     * @param callback Indicates the asynchronous callback used to return the obtained device
     *                 configuration.
     * @since 6
     */
    getConfiguration(callback: _AsyncCallback<Configuration>): void;

    /**
     * Obtains the device configuration in Promise mode.
     *
     * @returns Returns the device configuration.
     * @since 6
     */
    getConfiguration(): Promise<Configuration>;

    /**
     * Obtains the singular-plural character string represented by the ID string corresponding to the
     * specified number in callback mode.
     *
     * @param resId Indicates the resource ID.
     * @param num Indicates the number.
     * @param callback Indicates the asynchronous callback used to return the singular-plural character
     *                 string represented by the ID string corresponding to the specified number.
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.resourceManager.getPluralStringValue
     */
    getPluralString(resId: number, num: number, callback: AsyncCallback<string>): void;

    /**
     * Obtains the singular-plural character string represented by the ID string corresponding to
     * the specified number in Promise mode.
     *
     * @param resId Indicates the resource ID.
     * @param num Indicates the number.
     * @returns Returns the singular-plural character string represented by the ID string
     *         corresponding to the specified number.
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.resourceManager.getPluralStringValue
     */
    getPluralString(resId: number, num: number): Promise<string>;

    /**
     * Obtains the singular-plural character string represented by the resource object string corresponding to the
     * specified number in callback mode.
     *
     * @param resource Indicates the resource object.
     * @param num Indicates the number.
     * @param callback Indicates the asynchronous callback used to return the singular-plural character
     *                 string represented by the resource object string corresponding to the specified number.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by resId.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getPluralStringValue(resource: Resource, num: number, callback: _AsyncCallback<string>): void;

    /**
     * Obtains the singular-plural character string represented by the resource object string corresponding to
     * the specified number in Promise mode.
     *
     * @param resource Indicates the resource object.
     * @param num Indicates the number.
     * @returns Returns the singular-plural character string represented by the resource object string
     *         corresponding to the specified number.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by resId.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getPluralStringValue(resource: Resource, num: number): Promise<string>;

    /**
     * Obtains the raw file resource corresponding to the specified resource path in callback mode.
     *
     * @param path Indicates the resource relative path.
     * @param callback Indicates the asynchronous callback used to return the raw file resource.
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.resourceManager.getRawFileContent
     */
    getRawFile(path: string, callback: AsyncCallback<Uint8Array>): void;

    /**
     * Obtains the raw file resource corresponding to the specified resource path in Promise mode.
     *
     * @param path Indicates the resource relative path.
     * @returns Returns the raw file resource corresponding to the specified resource path.
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.resourceManager.getRawFileContent
     */
    getRawFile(path: string): Promise<Uint8Array>;

    /**
     * Obtains the raw file resource descriptor corresponding to the specified resource path in callback mode.
     *
     * @param path Indicates the resource relative path.
     * @param callback Indicates the asynchronous callback used to return the raw file resource descriptor.
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.resourceManager.getRawFd
     */
    getRawFileDescriptor(path: string, callback: AsyncCallback<RawFileDescriptor>): void;

     /**
      * Obtains the raw file resource descriptor corresponding to the specified resource path in Promise mode.
      *
      * @param path Indicates the resource relative path.
      * @returns Returns the raw file resource descriptor corresponding to the specified resource path.
      * @since 8
      * @deprecated since 9
      * @useinstead ohos.resourceManager.getRawFd
      */
    getRawFileDescriptor(path: string): Promise<RawFileDescriptor>;

    /**
     * Obtains close raw file resource descriptor corresponding to the specified resource path in callback mode.
     *
     * @param path Indicates the resource relative path.
     * @param callback Indicates the asynchronous callback used to return result close raw file resource descriptor.
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.resourceManager.closeRawFd
     */
    closeRawFileDescriptor(path: string, callback: AsyncCallback<void>): void;

    /**
     * Obtains close raw file resource descriptor corresponding to the specified resource path in Promise mode.
     *
     * @param path Indicates the resource relative path.
     * @returns Returns result close raw file resource descriptor corresponding to the specified resource path.
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.resourceManager.closeRawFd
     */
    closeRawFileDescriptor(path: string): Promise<void>;

    /**
     * Obtains the character string corresponding to a specified resource name in callback mode.
     *
     * @param resName Indicates the resource name.
     * @param callback Indicates the asynchronous callback used to return the obtained character string.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001003 - If the resName invalid.
     * @throws { BusinessError } 9001004 - If the resource not found by resName.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getStringByName(resName: string, callback: _AsyncCallback<string>): void;

    /**
     * Obtains string resources associated with a specified resource name in Promise mode.
     *
     * @param resName Indicates the resource name.
     * @returns Returns the character string corresponding to the resource name.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001003 - If the resName invalid.
     * @throws { BusinessError } 9001004 - If the resource not found by resName.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
     getStringByName(resName: string): Promise<string>;

    /**
     * Obtains the array of character strings corresponding to a specified resource name in callback mode.
     *
     * @param resName Indicates the resource name.
     * @param callback Indicates the asynchronous callback used to return the obtained array of character strings.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001003 - If the resName invalid.
     * @throws { BusinessError } 9001004 - If the resource not found by resName.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getStringArrayByName(resName: string, callback: _AsyncCallback<Array<string>>): void;

    /**
     * Obtains the array of character strings corresponding to a specified resource name in Promise mode.
     *
     * @param resName Indicates the resource name.
     * @returns Returns the array of character strings corresponding to the specified resource name.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001003 - If the resName invalid.
     * @throws { BusinessError } 9001004 - If the resource not found by resName.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getStringArrayByName(resName: string): Promise<Array<string>>;

    /**
     * Obtains the content of the media file corresponding to a specified resource name in callback mode.
     *
     * @param resName Indicates the resource name.
     * @param callback Indicates the asynchronous callback used to return the obtained media file content.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001003 - If the resName invalid.
     * @throws { BusinessError } 9001004 - If the resource not found by resName.
     * @since 9
     */
    getMediaByName(resName: string, callback: _AsyncCallback<Uint8Array>): void;

    /**
     * Obtains the content of the media file corresponding to a specified resource name in Promise mode.
     *
     * @param resName Indicates the resource name.
     * @returns Returns the content of the media file corresponding to the specified resource name.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001003 - If the resName invalid.
     * @throws { BusinessError } 9001004 - If the resource not found by resName.
     * @since 9
     */
    getMediaByName(resName: string): Promise<Uint8Array>;

    /**
     * Obtains the Base64 code of the image resource corresponding to the specified resource name in callback mode.
     *
     * @param resName Indicates the resource name.
     * @param callback Indicates the asynchronous callback used to return the obtained Base64 code of the image
     *                 resource.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001003 - If the resName invalid.
     * @throws { BusinessError } 9001004 - If the resource not found by resName.
     * @since 9
     */
    getMediaBase64ByName(resName: string, callback: _AsyncCallback<string>): void;

    /**
     * Obtains the Base64 code of the image resource corresponding to the specified resource name in Promise mode.
     *
     * @param resName Indicates the resource name.
     * @returns Returns the Base64 code of the image resource corresponding to the specified resource name.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001003 - If the resName invalid.
     * @throws { BusinessError } 9001004 - If the resource not found by resName.
     * @since 9
     */
    getMediaBase64ByName(resName: string): Promise<string>;

    /**
     * Obtains the singular-plural character string represented by the name string corresponding to the
     * specified number in callback mode.
     *
     * @param resName Indicates the resource name.
     * @param num Indicates the number.
     * @param callback Indicates the asynchronous callback used to return the singular-plural character
     *                 string represented by the name string corresponding to the specified number.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001003 - If the resName invalid.
     * @throws { BusinessError } 9001004 - If the resource not found by resName.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getPluralStringByName(resName: string, num: number, callback: _AsyncCallback<string>): void;

    /**
     * Obtains the singular-plural character string represented by the name string corresponding to
     * the specified number in Promise mode.
     *
     * @param resName Indicates the resource name.
     * @param num Indicates the number.
     * @returns Returns the singular-plural character string represented by the name string
     *         corresponding to the specified number.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001003 - If the resName invalid.
     * @throws { BusinessError } 9001004 - If the resource not found by resName.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getPluralStringByName(resName: string, num: number): Promise<string>;

    /**
     * Obtains string resources associated with a specified resource ID.
     *
     * @param resId Indicates the resource ID.
     * @returns Returns the character string corresponding to the resource ID.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by resId.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getStringSync(resId: number): string;

    /**
     * Obtains string resources associated with a specified resource object.
     *
     * @param resource Indicates the resource object.
     * @returns Returns the character string corresponding to the resource object.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the module resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by module resId.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getStringSync(resource: Resource): string;

    /**
     * Obtains string resources associated with a specified resource name.
     *
     * @param resName Indicates the resource name.
     * @returns Returns the character string corresponding to the resource name.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001003 - If the resName invalid.
     * @throws { BusinessError } 9001004 - If the resource not found by resName.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getStringByNameSync(resName: string): string;

    /**
     * Obtains the boolean result with a specified resource ID.
     *
     * @param resId Indicates the resource ID.
     * @returns Returns the boolean resource corresponding to the resource ID.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by resId.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getBoolean(resId: number): boolean;

    /**
     * Obtains the boolean result with a specified resource object.
     *
     * @param resource Indicates the resource object.
     * @returns Returns the boolean resource corresponding to the resource object.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the module resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by module resId.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getBoolean(resource: Resource): boolean;

    /**
     * Obtains the boolean result with a specified resource name.
     *
     * @param resName Indicates the resource name.
     * @returns Returns the boolean resource corresponding to the resource name.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001003 - If the resName invalid.
     * @throws { BusinessError } 9001004 - If the resource not found by resName.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getBooleanByName(resName: string): boolean;

    /**
     * Obtains the number result with a specified resource ID.
     *
     * @param resId Indicates the resource ID.
     * @returns Returns the number resource corresponding to the resource ID.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by resId.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getNumber(resId: number): number;

    /**
     * Obtains the number result with a specified resource object.
     *
     * @param resource Indicates the resource object.
     * @returns Returns the number resource corresponding to the resource object.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the module resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by module resId.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getNumber(resource: Resource): number;

    /**
     * Obtains the number result with a specified resource name.
     *
     * @param resName Indicates the resource name.
     * @returns Returns the number resource corresponding to the resource name.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001003 - If the resName invalid.
     * @throws { BusinessError } 9001004 - If the resource not found by resName.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getNumberByName(resName: string): number;

    /**
     * Obtains release resourceManager.
     *
     * @since 7
     */
    release();

    /**
     * Obtains the character string corresponding to a specified resource ID in callback mode.
     *
     * @param resId Indicates the resource ID.
     * @param callback Indicates the asynchronous callback used to return the obtained character string.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by resId.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getStringValue(resId: number, callback: _AsyncCallback<string>): void;

     /**
     * Obtains string resources associated with a specified resource ID in Promise mode.
     *
     * @param resId Indicates the resource ID.
     * @returns Returns the character string corresponding to the resource ID.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by resId.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getStringValue(resId: number): Promise<string>;

    /**
     * Obtains the array of character strings corresponding to a specified resource ID in callback mode.
     *
     * @param resId Indicates the resource ID.
     * @param callback Indicates the asynchronous callback used to return the obtained array of character strings.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by resId.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getStringArrayValue(resId: number, callback: _AsyncCallback<Array<string>>): void;

    /**
     * Obtains the array of character strings corresponding to a specified resource ID in Promise mode.
     *
     * @param resId Indicates the resource ID.
     * @returns Returns the array of character strings corresponding to the specified resource ID.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by resId.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getStringArrayValue(resId: number): Promise<Array<string>>;

    /**
     * Obtains the singular-plural character string represented by the ID string corresponding to the
     * specified number in callback mode.
     *
     * @param resId Indicates the resource ID.
     * @param num Indicates the number.
     * @param callback Indicates the asynchronous callback used to return the singular-plural character
     *                 string represented by the ID string corresponding to the specified number.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by resId.
     * @throws { BusinessError } 9001006 - If the resource re-ref too much.
     * @since 9
     */
    getPluralStringValue(resId: number, num: number, callback: _AsyncCallback<string>): void;

    /**
      * Obtains the singular-plural character string represented by the ID string corresponding to
      * the specified number in Promise mode.
      *
      * @param resId Indicates the resource ID.
      * @param num Indicates the number.
      * @returns Returns the singular-plural character string represented by the ID string
      *         corresponding to the specified number.
      * @throws { BusinessError } 401 - If the input parameter invalid.
      * @throws { BusinessError } 9001001 - If the resId invalid.
      * @throws { BusinessError } 9001002 - If the resource not found by resId.
      * @throws { BusinessError } 9001006 - If the resource re-ref too much.
      * @since 9
      */
    getPluralStringValue(resId: number, num: number): Promise<string>;

    /**
     * Obtains the content of the media file corresponding to a specified resource ID in callback mode.
     *
     * @param resId Indicates the resource ID.
     * @param callback Indicates the asynchronous callback used to return the obtained media file content.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by resId.
     * @since 9
     */
    getMediaContent(resId: number, callback: _AsyncCallback<Uint8Array>): void;

    /**
     * Obtains the content of the media file corresponding to a specified resource ID in Promise mode.
     *
     * @param resId Indicates the resource ID.
     * @returns Returns the content of the media file corresponding to the specified resource ID.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by resId.
     * @since 9
     */
    getMediaContent(resId: number): Promise<Uint8Array>;

    /**
     * Obtains the Base64 code of the image resource corresponding to the specified resource ID in callback mode.
     *
     * @param resId Indicates the resource ID.
     * @param callback Indicates the asynchronous callback used to return the obtained Base64 code of the image
     *                 resource.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by resId.
     * @since 9
     */
    getMediaContentBase64(resId: number, callback: _AsyncCallback<string>): void;

    /**
     * Obtains the Base64 code of the image resource corresponding to the specified resource ID in Promise mode.
     *
     * @param resId Indicates the resource ID.
     * @returns Returns the Base64 code of the image resource corresponding to the specified resource ID.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001001 - If the resId invalid.
     * @throws { BusinessError } 9001002 - If the resource not found by resId.
     * @since 9
     */
    getMediaContentBase64(resId: number): Promise<string>;

    /**
     * Obtains the raw file resource corresponding to the specified resource path in callback mode.
     *
     * @param path Indicates the resource relative path.
     * @param callback Indicates the asynchronous callback used to return the raw file resource.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001005 - If the resource not found by path.
     * @since 9
     */
    getRawFileContent(path: string, callback: _AsyncCallback<Uint8Array>): void;

    /**
     * Obtains the raw file resource corresponding to the specified resource path in Promise mode.
     *
     * @param path Indicates the resource relative path.
     * @returns Returns the raw file resource corresponding to the specified resource path.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001005 - If the resource not found by path.
     * @since 9
     */
    getRawFileContent(path: string): Promise<Uint8Array>;

    /**
     * Obtains the raw file resource descriptor corresponding to the specified resource path in callback mode.
     *
     * @param path Indicates the resource relative path.
     * @param callback Indicates the asynchronous callback used to return the raw file resource descriptor.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001005 - If the resource not found by path.
     * @since 9
     */
    getRawFd(path: string, callback: _AsyncCallback<RawFileDescriptor>): void;

    /**
     * Obtains the raw file resource descriptor corresponding to the specified resource path in Promise mode.
     *
     * @param path Indicates the resource relative path.
     * @returns Returns the raw file resource descriptor corresponding to the specified resource path.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001005 - If the resource not found by path.
     * @since 9
     */
    getRawFd(path: string): Promise<RawFileDescriptor>;

    /**
     * Obtains close raw file resource descriptor corresponding to the specified resource path in callback mode.
     *
     * @param path Indicates the resource relative path.
     * @param callback Indicates the asynchronous callback used to return result close raw file resource descriptor.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001005 - If the resource not found by path.
     * @since 9
     */
    closeRawFd(path: string, callback: _AsyncCallback<void>): void;

    /**
     * Obtains close raw file resource descriptor corresponding to the specified resource path in Promise mode.
     *
     * @param path Indicates the resource relative path.
     * @throws { BusinessError } 401 - If the input parameter invalid.
     * @throws { BusinessError } 9001005 - If the resource not found by path.
     * @since 9
     */
    closeRawFd(path: string): Promise<void>;
}

    /**
     * Contains rawFile descriptor information.
     * @name Contains rawFile descriptor information
     * @since 9
     * @syscap SystemCapability.Global.ResourceManager
     *
     */
    export type RawFileDescriptor = _RawFileDescriptor;

    /**
     * Contains resource descriptor information.
     * @name Contains resource descriptor information
     * @since 9
     * @syscap SystemCapability.Global.ResourceManager
     *
     */
    export type Resource = _Resource;
}
export default resourceManager;