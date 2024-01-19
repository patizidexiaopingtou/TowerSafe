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
import Context from './application/Context';

/**
 * Provides interfaces to sync distributed object.
 *
 * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
 * @since 8
 */
declare namespace distributedDataObject {

    /**
     * Create distributed object.
     *
     * @param {object} source - source Init data of distributed object.
     * @returns {DistributedObject} - return the distributed object.
     * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.distributedDataObject.create
     */
    function createDistributedObject(source: object): DistributedObject;

    /**
     * Create distributed object.
     *
     * @param {Context} context - Indicates the application context.
     * @param {object} source - source Init data of distributed object.
     * @returns {DataObject} - return the distributed object.
     * @throws {BusinessError} 401 - the parameter check failed.
     * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
     * @since 9
     */
    function create(context: Context, source: object): DataObject;

    /**
     * Generate a random sessionId.
     *
     * @returns {string} - return generated sessionId.
     * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
     * @since 8
     */
    function genSessionId(): string;

    /**
     * The response of save.
     * Contains the parameter information of the save object.
     * 
     * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
     * @since 9
     */
    interface SaveSuccessResponse {

        /**
         * sessionId of saved object
         * 
         * @since 9
         */
        sessionId: string;

        /**
         * version of saved object, can compare with DistributedObject.__version
         * 
         * @since 9
         */
        version: number;

        /**
         * deviceid that data saved
         * data is "local", means save in local device
         * otherwise, means the networkId of device
         * 
         * @since 9
         */
        deviceId: string;
    }

    /**
     * The response of revokeSave.
     * Contains the sessionId of the changed object.
     * 
     * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
     * @since 9
     */
    interface RevokeSaveSuccessResponse {

        /**
         * The sessionId of the changed object.
         * 
         * @since 9
         */
        sessionId: string;
    }

    /**
     * Object create by {@link createDistributedObject}.
     *
     * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.distributedDataObject.DataObject
     */
    interface DistributedObject {
        
        /**
         * Change object session
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param {string} sessionId - sessionId The sessionId to be joined, if empty, leave all session.
         * @returns {boolean} - return a result of function.
         * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.distributedDataObject.DataObject.setSessionId
         */
        setSessionId(sessionId?: string): boolean;

        /**
         * On watch of change
         * 
         * @param {string} type - event type, fixed as' change ', indicates data change.
         * @param {Callback<{sessionId: string, fields: Array<string>}>} callback
         *          indicates the observer of object data changed. 
         *          {string} sessionId - the sessionId of the changed object.
         *          {Array<string>} fields - changed data.
         * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.distributedDataObject.DataObject.on
         */
        on(type: 'change', callback: Callback<{ sessionId: string, fields: Array<string> }>): void;

        /**
         * Off watch of change
         * 
         * @param {string} type - event type, fixed as' change ', indicates data change.
         * @param {Callback<{sessionId: string, fields: Array<string>}>} callback
         *          indicates the observer of object data changed.
         *          {string} sessionId - the sessionId of the changed object.
         *          {Array<string>} fields - changed data.
         *          callback If not null, off the callback, if undefined, off all callbacks.
         * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.distributedDataObject.DataObject.off
         */
        off(type: 'change', callback?: Callback<{ sessionId: string, fields: Array<string> }>): void;

        /**
         * On watch of status
         * 
         * @param {string} type - event type, fixed as' status', indicates the online and offline of the object.
         * @param {Callback<{sessionId: string, networkId: string, status: 'online' | 'offline'}>} callback
         *          indicates the observer of object status changed.
         *          {string} sessionId - the sessionId of the changed object.
         *          {string} networkId - networkId of the changed device.
         *          {string} status 
         *                   'online' The object became online on the device and data can be synced to the device.
         *                   'offline' The object became offline on the device and the object can not sync any data.
         * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.distributedDataObject.DataObject.on
         */
        on(type: 'status',
           callback: Callback<{ sessionId: string, networkId: string, status: 'online' | 'offline' }>): void;

        /**
         * Off watch of status
         * 
         * @param {string} type - event type, fixed as' status', indicates the online and offline of the object.
         * @param {Callback<{sessionId: string, networkId: string, status: 'online' | 'offline'}>} callback
         *          Indicates the observer of object status changed.
         *          {string} sessionId - the sessionId of the changed object.
         *          {string} networkId - networkId of the changed device.
         *          {string} status 
         *                   'online' The object became online on the device and data can be synced to the device.
         *                   'offline' The object became offline on the device and the object can not sync any data.
         *          callback If not null, off the callback, if undefined, off all callbacks.
         * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.distributedDataObject.DataObject.off
         */
        off(type: 'status',
            callback?: Callback<{ sessionId: string, deviceId: string, status: 'online' | 'offline' }>): void;
    }

    /**
     * Object create by {@link create}.
     *
     * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
     * @since 9
     */
    interface DataObject {

        /*
         * Change object session.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param {string} sessionId - sessionId The sessionId to be joined, if empty, leave all session.
         * @param {AsyncCallback<void>} callback - the callback of setSessionId.
         * @throws {BusinessError} 201 - the permissions check failed.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 15400001 - create table failed.
         * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
         * @since 9
         */
        setSessionId(sessionId: string, callback: AsyncCallback<void>): void;
        setSessionId(callback: AsyncCallback<void>): void;

        /*
         * Change object session.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param {string} sessionId - sessionId The sessionId to be joined, if empty, leave all session.
         * @returns {Promise<void>} - the promise returned by the function.
         * @throws {BusinessError} 201 - the permissions check failed.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 15400001 - create table failed.
         * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
         * @since 9
         */
        setSessionId(sessionId?: string): Promise<void>;

        /**
         * On watch of change.
         * 
         * @param {string} type - event type, fixed as' change ', indicates data change.
         * @param {Callback<{sessionId: string, fields: Array<string>}>} callback
         *          indicates the observer of object data changed. 
         *          {string} sessionId - the sessionId of the changed object.
         *          {Array<string>} fields - changed data.
         *          sessionId the sessionId of the changed object.         
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
         * @since 9
         */
        on(type: 'change', callback: Callback<{ sessionId: string, fields: Array<string> }>): void;

        /**
         * Off watch of change.
         * 
         * @param {string} type - event type, fixed as' change ', indicates data change.
         * @param {Callback<{sessionId: string, fields: Array<string>}>} callback
         *          indicates the observer of object data changed.
         *          {string} sessionId - the sessionId of the changed object.
         *          {Array<string>} fields - changed data.
         *          callback If not null, off the callback, if undefined, off all callbacks.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
         * @since 9
         */
        off(type: 'change', callback?: Callback<{ sessionId: string, fields: Array<string> }>): void;

        /**
         * On watch of status.
         * 
         * @param {string} type - event type, fixed as' status', indicates the online and offline of the object.
         * @param {Callback<{ sessionId: string, networkId: string, status: 'online' | 'offline' }>} callback
         *          indicates the observer of object status changed.
         *          {string} sessionId - the sessionId of the changed object.
         *          {string} networkId - networkId of the changed device.
         *          {string} status 
         *                   'online' The object became online on the device and data can be synced to the device.
         *                   'offline' The object became offline on the device and the object can not sync any data.
         *                   'restored' The object restored success.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
         * @since 9
         */
        on(type: 'status',
           callback: Callback<{ sessionId: string, networkId: string, status: 'online' | 'offline' }>): void;

        /**
         * Off watch of status.
         *
         * @param {string} type - event type, fixed as' status', indicates the online and offline of the object.
         * @param {Callback<{sessionId: string, networkId: string, status: 'online' | 'offline'}>} callback
         *          Indicates the observer of object status changed.
         *          {string} sessionId - the sessionId of the changed object.
         *          {string} networkId - networkId of the changed device.
         *          {string} status
         *                   'online' The object became online on the device and data can be synced to the device.
         *                   'offline' The object became offline on the device and the object can not sync any data.
         *          callback If not null, off the callback, if undefined, off all callbacks.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
         * @since 9
         */
        off(type: 'status',
            callback?: Callback<{ sessionId: string, deviceId: string, status: 'online' | 'offline' }>): void;

        /**
         * Save object, after save object data successfully, the object data will not release when app existed,
         * and resume data on saved device after app existed.
         * the saved data secure level is S0, it is not safe, can only save public data, if there is privacy data,
         * you should encrypt it
         *
         * The saved data will be released when
         * 1. saved after 24h.
         * 2. app uninstalled.
         * 3. after resume data success, system will auto delete the saved data.
         * 
         * @param {string} deviceId - Indicates the device that will resume the object data.
         * @param {AsyncCallback<SaveSuccessResponse>} callback
         *        {SaveSuccessResponse}: the response of save.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
         * @since 9
         */
        save(deviceId: string, callback: AsyncCallback<SaveSuccessResponse>): void;

        /**
         * Save object, after save object data successfully, the object data will not release when app existed,
         * and resume data on saved device after app existed.
         * the saved data secure level is S0, it is not safe, can only save public data, if there is privacy data,
         * you should encrypt it.
         *
         * The saved data will be released when
         * 1. saved after 24h.
         * 2. app uninstalled.
         * 3. after resume data success, system will auto delete the saved data.
         * 
         * @param {string} deviceId - Indicates the device that will resume the object data.
         * @returns {Promise<SaveSuccessResponse>} {SaveSuccessResponse}: the response of save.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
         * @since 9
         */
        save(deviceId: string): Promise<SaveSuccessResponse>;

        /**
         * Revoke save object, delete saved object immediately, if object is saved in local device,
         * it will delete saved data on all trusted device.
         * if object is saved in other device, it will delete data in local device.
         * 
         * @param {AsyncCallback<RevokeSaveSuccessResponse>} callback
         *        {RevokeSaveSuccessResponse}: the response of revokeSave.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
         * @since 9
         */
        revokeSave(callback: AsyncCallback<RevokeSaveSuccessResponse>): void;

        /**
         * Revoke save object, delete saved object immediately, if object is saved in local device,
         * it will delete saved data on all trusted device.
         * if object is saved in other device, it will delete data in local device.
         * 
         * @returns {Promise<RevokeSaveSuccessResponse>} {RevokeSaveSuccessResponse}: the response of revokeSave.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.DataObject.DistributedObject
         * @since 9
         */
        revokeSave(): Promise<RevokeSaveSuccessResponse>;
    }
}

export default distributedDataObject;
