/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

import { AsyncCallback, BusinessError } from './basic';

 /**
 * The interface of system parameters class.
 *
 * @since 9
 * @syscap SystemCapability.Startup.SystemInfo
 * @systemapi Hide this for inner system use.
 */
declare namespace systemParameterEnhance {
    /**
     * Gets the value of the attribute with the specified key.
     *
     * @param key Key of the system attribute.
     * @param def Default value.
     * @returns the value of the parameter.
     * @throws {BusinessError} 401 - if type of key is not string or key is not specified.
     * @throws {BusinessError} 14700101 - if key is not found
     * @throws {BusinessError} 14700103 - if permission denied
     * @throws {BusinessError} 14700104 - if system internal error
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 9
     */
    function getSync(key: string, def?: string): string;

    /**
     * Gets the value of the attribute with the specified key.
     *
     * @param key Key of the system attribute.
     * @param callback Callback function.
     * @throws {BusinessError} 401 - if type of key is not string or key is not specified.
     * @throws {BusinessError} 14700101 - if key is not found
     * @throws {BusinessError} 14700103 - if permission denied
     * @throws {BusinessError} 14700104 - if system internal error
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 9
     */
    function get(key: string, callback: AsyncCallback<string>): void;

    /**
     * Gets the value of the attribute with the specified key.
     *
     * @param key Key of the system attribute.
     * @param def Default value.
     * @param callback Callback function.
     * @throws {BusinessError} 401 - if type of key is not string or key is not specified.
     * @throws {BusinessError} 14700101 - if key is not found
     * @throws {BusinessError} 14700103 - if permission denied
     * @throws {BusinessError} 14700104 - if system internal error
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 9
     */
    function get(key: string, def: string, callback: AsyncCallback<string>): void;

    /**
     * Gets the value of the attribute with the specified key.
     *
     * @param key Key of the system attribute.
     * @param def Default value.
     * @throws {BusinessError} 401 - if type of key is not string or key is not specified.
     * @throws {BusinessError} 14700101 - if key is not found
     * @throws {BusinessError} 14700103 - if permission denied
     * @throws {BusinessError} 14700104 - if system internal error
     * @returns Promise, which is used to obtain the result asynchronously.
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 9
     */
    function get(key: string, def?: string): Promise<string>;

    /**
     * Sets a value for the attribute with the specified key.
     *
     * @param key Key of the system attribute.
     * @param value System attribute value to set.
     * @throws {BusinessError} 401 - if type of key is not string or key is not specified.
     * @throws {BusinessError} 14700102 - if value is invalid
     * @throws {BusinessError} 14700103 - if permission denied
     * @throws {BusinessError} 14700104 - if system internal error
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 9
     */
    function setSync(key: string, value: string): void;

    /**
     * Sets a value for the attribute with the specified key.
     *
     * @param key Key of the system attribute.
     * @param value System attribute value to set.
     * @param callback Callback function.
     * @throws {BusinessError} 401 - if type of key is not string or key is not specified.
     * @throws {BusinessError} 14700102 - if value is invalid
     * @throws {BusinessError} 14700103 - if permission denied
     * @throws {BusinessError} 14700104 - if system internal error
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 9
     */
    function set(key: string, value: string, callback: AsyncCallback<void>): void;

    /**
     * Sets a value for the attribute with the specified key.
     *
     * @param key Key of the system attribute.
     * @param value Default value.
     * @returns Promise, which is used to obtain the result asynchronously.
     * @throws {BusinessError} 401 - if type of key is not string or key is not specified.
     * @throws {BusinessError} 14700102 - if value is invalid
     * @throws {BusinessError} 14700103 - if permission denied
     * @throws {BusinessError} 14700104 - if system internal error
     * @syscap SystemCapability.Startup.SystemInfo
     * @since 9
     */
    function set(key: string, value: string): Promise<void>;
}

export default systemParameterEnhance;
