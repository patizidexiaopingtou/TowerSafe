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
import {AsyncCallback, Callback} from './basic';
import Context from "./application/BaseContext";

/**
 * Provides interfaces to obtain and modify preferences data.
 *
 * @name preferences
 * @since 9
 * @syscap SystemCapability.DistributedDataManager.Preferences.Core
 *
 */
declare namespace preferences {
    /**
     * Obtains a {@link Preferences} instance matching a specified preferences file name.
     *
     * <p>The {@link references} instance loads all data of the preferences file and
     * resides in the memory. You can use removePreferencesFromCache to remove the instance from the memory.
     *
     * @param {Context} context - Indicates the context of application or capability.
     * @param {string} name - Indicates the preferences file name.
     * @param {AsyncCallback<Preferences>} callback - the {@link Preferences} instance matching the specified
     *        preferences file name.
     * @throws {BusinessError} 401 - if the parameter type is incorrect.
     * @since 9
     */
    function getPreferences(context: Context, name: string, callback: AsyncCallback<Preferences>): void;

    /**
     * Obtains a {@link Preferences} instance matching a specified preferences file name.
     *
     * <p>The {@link references} instance loads all data of the preferences file and
     * resides in the memory. You can use removePreferencesFromCache to remove the instance from the memory.
     *
     * @param {Context} context - Indicates the context of application or capability.
     * @param {string} name - Indicates the preferences file name.
     * @returns {Promise<Preferences>} the {@link Preferences} instance matching the specified preferences file name.
     * @throws {BusinessError} 401 - if the parameter type is incorrect.
     * @since 9
     */
    function getPreferences(context: Context, name: string): Promise<Preferences>;

    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache which is performed by removePreferencesFromCache and deletes the
     * preferences file.
     *
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param {Context} context - Indicates the context of application or capability.
     * @param {string} name - Indicates the preferences file name.
     * @param {AsyncCallback<void>} callback - Indicates the callback function.
     * @throws {BusinessError} 401 - if the parameter type is incorrect.
     * @throws {BusinessError} 15500010 - if failed to delete preferences file.
     * @since 9
     */
    function deletePreferences(context: Context, name: string, callback: AsyncCallback<void>): void;

    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache which is performed by removePreferencesFromCache and deletes the
     * preferences file.
     *
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param {Context} context - Indicates the context of application or capability.
     * @param {string} name - Indicates the preferences file name.
     * @returns {Promise<void>} a promise object.
     * @throws {BusinessError} 401 - if the parameter type is incorrect.
     * @throws {BusinessError} 15500010 - if failed to delete preferences file.
     * @since 9
     */
    function deletePreferences(context: Context, name: string): Promise<void>;

    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache.
     *
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param {Context} context - Indicates the context of application or capability.
     * @param {string} name - Indicates the preferences file name.
     * @param {AsyncCallback<void>} callback - Indicates the callback function.
     * @throws {BusinessError} 401 - if the parameter type is incorrect.
     * @since 9
     */
    function removePreferencesFromCache(context: Context, name: string, callback: AsyncCallback<void>): void;

    /**
     * Deletes a {@link Preferences} instance matching a specified preferences file name
     * from the cache.
     *
     * <p>When deleting the {@link Preferences} instance, you must release all references
     * of the instance. In addition, do not use the instance to perform data operations. Otherwise, data inconsistency
     * will occur.
     *
     * @param {Context} context - Indicates the context of application or capability.
     * @param {string} name - Indicates the preferences file name.
     * @returns {Promise<void>} a promise object.
     * @throws {BusinessError} 401 - if the parameter type is incorrect.
     * @since 9
     */
    function removePreferencesFromCache(context: Context, name: string): Promise<void>;

    /**
     * Provides interfaces to obtain and modify preferences data.
     *
     * <p>The preferences data is stored in a file, which matches only one {@link Preferences} instance in the memory.
     * You can use getPreferences to obtain the {@link Preferences} instance matching
     * the file that stores preferences data, and use movePreferencesFromCache
     * to remove the {@link Preferences} instance from the memory.
     *
     * @syscap SystemCapability.DistributedDataManager.Preferences.Core
     *
     * @since 9
     */
    interface Preferences {
        /**
         * Obtains the value of a preferences in the int format.
         *
         * <p>If the value is {@code null} or not in the int format, the default value is returned.
         *
         * @param {string} key - Indicates the key of the preferences. It cannot be {@code null} or empty.
         * @param {ValueType} defValue - Indicates the default value to return.
         * @param {AsyncCallback<ValueType>} callback - the value matching the specified key if it is found;
         *        returns the default value otherwise.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @since 9
         */
        get(key: string, defValue: ValueType, callback: AsyncCallback<ValueType>): void;

        /**
         * Obtains the value of a preferences in the int format.
         *
         * <p>If the value is {@code null} or not in the int format, the default value is returned.
         *
         * @param {string} key - Indicates the key of the preferences. It cannot be {@code null} or empty.
         * @param {ValueType} defValue - Indicates the default value to return.
         * @returns {Promise<ValueType>} the value matching the specified key if it is found;
         *          returns the default value otherwise.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @since 9
         */
        get(key: string, defValue: ValueType): Promise<ValueType>;

        /**
         * Obtains all the keys and values of a preferences in an object.
         *
         * @param {AsyncCallback<Object>} callback - the values and keys in an object.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @since 9
         */
        getAll(callback: AsyncCallback<Object>): void;

        /**
         * Obtains all the keys and values of a preferences in an object.
         *
         * @returns {Promise<Object>} the values and keys in an object.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @since 9
         */
        getAll(): Promise<Object>;

        /**
         * Checks whether the {@link Preferences} object contains a preferences matching a specified key.
         *
         * @param {string} key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         * @param {AsyncCallback<boolean>} callback - {@code true} if the {@link Preferences} object contains a preferences
         *         with the specified key;returns {@code false} otherwise.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @since 9
         */
        has(key: string, callback: AsyncCallback<boolean>): void;

        /**
         * Checks whether the {@link Preferences} object contains a preferences matching a specified key.
         *
         * @param {string} key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         * @returns {Promise<void>} {@code true} if the {@link Preferences} object contains
         *         a preferences with the specified key; returns {@code false} otherwise.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @since 9
         */
        has(key: string): Promise<boolean>;

        /**
         * Sets an int value for the key in the {@link Preferences} object.
         *
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the
         * file.
         *
         * @param {string} key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         * @param {ValueType} value - Indicates the value of the preferences.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @param {AsyncCallback<void>} callback - Indicates the callback function.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @since 9
         */
        put(key: string, value: ValueType, callback: AsyncCallback<void>): void;

        /**
         * Sets an int value for the key in the {@link Preferences} object.
         *
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the
         * file.
         *
         * @param {string} key - Indicates the key of the preferences to modify. It cannot be {@code null} or empty.
         * @param {ValueType} value - Indicates the value of the preferences.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @returns {Promise<void>} a promise object.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @since 9
         */
        put(key: string, value: ValueType): Promise<void>;

        /**
         * Deletes the preferences with a specified key from the {@link Preferences} object.
         *
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the
         * file.
         *
         * @param {string} key - Indicates the key of the preferences to delete. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @param {AsyncCallback<void>} callback - Indicates the callback function.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @since 9
         */
        delete(key: string, callback: AsyncCallback<void>): void;

        /**
         * Deletes the preferences with a specified key from the {@link Preferences} object.
         *
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the
         * file.
         *
         * @param {string} key - Indicates the key of the preferences to delete. It cannot be {@code null} or empty.
         *        <tt>MAX_KEY_LENGTH</tt>.
         * @returns {Promise<void>} a promise object.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @since 9
         */
        delete(key: string): Promise<void>;

        /**
         * Clears all preferences from the {@link Preferences} object.
         *
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the file.
         *
         * @param {AsyncCallback<void>} callback - Indicates the callback function.
         * @since 9
         */
        clear(callback: AsyncCallback<void>): void;

        /**
         * Clears all preferences from the {@link Preferences} object.
         *
         * <p>You can call the {@link #flush} method to save the {@link Preferences} object to the file.
         *
         * @returns {Promise<void>} a promise object.
         * @since 9
         */
        clear(): Promise<void>;

        /**
         * Asynchronously saves the {@link Preferences} object to the file.
         *
         * @param {AsyncCallback<void>} callback - Indicates the callback function.
         * @since 9
         */
        flush(callback: AsyncCallback<void>): void;

        /**
         * Asynchronously saves the {@link Preferences} object to the file.
         *
         * @returns {Promise<void>} a promise object.
         * @since 9
         */
        flush(): Promise<void>;

        /**
         * Registers an observer to listen for the change of a {@link Preferences} object.
         *
         * @param {Callback} callback - indicates the callback when preferences changes.
         * @param {Callback<{key: string}>} callback - Indicates the callback function.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @since 9
         */
        on(type: 'change', callback: Callback<{ key: string }>): void;

        /**
         * Unregisters an existing observer.
         *
         * @param {Callback} callback - indicates the callback when preferences changes.
         * @param {Callback<{key: string}>} callback - Indicates the callback function.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @since 9
         */
        off(type: 'change', callback?: Callback<{ key: string }>): void;
    }

    /**
     * Indicates possible value types
     */
    type ValueType = number | string | boolean | Array<number> | Array<string> | Array<boolean>;

    /**
     * Indicates the maximum length of a key (80 characters).
     */
    const MAX_KEY_LENGTH: 80;

    /**
     * Indicates the maximum length of a string (8192 characters).
     */
    const MAX_VALUE_LENGTH: 8192;
}

export default preferences;
