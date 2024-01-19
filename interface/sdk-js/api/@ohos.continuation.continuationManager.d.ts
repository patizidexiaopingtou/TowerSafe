/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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
import { Callback } from './basic';
import { AsyncCallback } from './basic';
import { ContinuationResult } from './continuation/continuationResult'
import { ContinuationExtraParams } from './continuation/continuationExtraParams'

/**
 * Provides methods for interacting with the continuation manager service, including methods for registering and
 * Unregister the ability to hop, updating the device connection state, and showing the list of devices
 * that can be selected for hopping.
 * @namespace continuationManager
 * @syscap SystemCapability.Ability.DistributedAbilityManager
 * @since 8
 */
declare namespace continuationManager {
    /**
     * Called when the user selects devices from the candidate device list.
     * You can implement your own processing logic in this callback to initiate the hop process.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param type deviceSelected.
     * @returns callback Indicates the information about the selected devices.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @throws { BusinessError } 16600004 - The specified callback has been registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    function on(type: "deviceSelected", token: number, callback: Callback<Array<ContinuationResult>>): void;
    function off(type: "deviceSelected", token: number): void;
 
    /**
     * Called when devices are disconnected from the continuation manager service.
     * You can implement your own processing logic in this callback, such as notifying the user of the disconnection.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param type deviceUnselected.
     * @returns callback Indicates the information about the unselected devices.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @throws { BusinessError } 16600004 - The specified callback has been registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    function on(type: "deviceUnselected", token: number, callback: Callback<Array<ContinuationResult>>): void;
    function off(type: "deviceUnselected", token: number): void;

    /**
     * Called when the user selects a device from the candidate device list.
     * You can implement your own processing logic in this callback to initiate the hop process.
     *
     * @param type deviceConnect.
     * @returns callback Indicates the information about the selected device.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager.continuationManager#on/off(type: "deviceSelected")
     */
    function on(type: "deviceConnect", callback: Callback<ContinuationResult>): void;
    function off(type: "deviceConnect", callback?: Callback<ContinuationResult>): void;

    /**
     * Called when a device is disconnected from the continuation manager service.
     * You can implement your own processing logic in this callback, such as notifying the user of the disconnection.
     *
     * @param type deviceDisconnect.
     * @returns callback Indicates the ID of the disconnected device.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager.continuationManager#on/off(type: "deviceUnSelected")
     */
    function on(type: "deviceDisconnect", callback: Callback<string>): void;
    function off(type: "deviceDisconnect", callback?: Callback<string>): void;

    /**
     * Registers an ability to be hopped with the continuation manager service and obtains the registration token
     * assigned to the ability.
     *
     * @param options Indicates the {@link ExtraParams} object containing the extra parameters used to filter
     * the list of available devices.
     * @returns callback Indicates the callback to be invoked when the continuation manager service is connected.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager.continuationManager#registerContinuation
     */
    function register(callback: AsyncCallback<number>): void;
    function register(options: ContinuationExtraParams, callback: AsyncCallback<number>): void;
    function register(options?: ContinuationExtraParams): Promise<number>;

    /**
     * Unregisters a specified ability from the continuation manager service based on the token obtained during ability
     * registration.
     *
     * @param token Indicates the registration token of the ability.
     * @returns callback Indicates the callback to be invoked when the continuation manager service is connected.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager.continuationManager#unregisterContinuation
     */
    function unregister(token: number, callback: AsyncCallback<void>): void;
    function unregister(token: number): Promise<void>;

    /**
     * Updates the connection state of the device where the specified ability is successfully hopped.
     *
     * @param token Indicates the registration token of the ability.
     * @param deviceId Indicates the ID of the device whose connection state is to be updated.
     * @param status Indicates the connection state to update.
     * @returns callback Indicates the callback to be invoked when the continuation manager service is connected.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager.continuationManager#updateContinuationState
     */
    function updateConnectStatus(token: number, deviceId: string, status: DeviceConnectState, callback: AsyncCallback<void>): void;
    function updateConnectStatus(token: number, deviceId: string, status: DeviceConnectState): Promise<void>;

    /**
     * Start to manage the devices that can be selected for continuation.
     *
     * @param token Indicates the registration token of the ability.
     * @param options Indicates the extraParams object containing the extra parameters used to filter
     * the list of available devices. This parameter can be null.
     * @returns callback Indicates the callback to be invoked when the continuation manager service is connected.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.continuation.continuationManager.continuationManager#startContinuationDeviceManager
     */
    function startDeviceManager(token: number, callback: AsyncCallback<void>): void;
    function startDeviceManager(token: number, options: ContinuationExtraParams, callback: AsyncCallback<void>): void;
    function startDeviceManager(token: number, options?: ContinuationExtraParams): Promise<void>;

    /**
     * Registers an ability to be hopped with the continuation manager service and obtains the registration token
     * assigned to the ability.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param options Indicates the {@link ExtraParams} object containing the extra parameters used to filter
     * the list of available devices.
     * @returns callback Indicates the callback to be invoked when the continuation manager service is connected.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600003 - The number of token registration times has reached the upper limit.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    function registerContinuation(callback: AsyncCallback<number>): void;
    function registerContinuation(options: ContinuationExtraParams, callback: AsyncCallback<number>): void;
    function registerContinuation(options?: ContinuationExtraParams): Promise<number>;
 
    /**
     * Unregisters a specified ability from the continuation manager service based on the token obtained during ability
     * registration.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param token Indicates the registration token of the ability.
     * @returns callback Indicates the callback to be invoked when the continuation manager service is connected.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    function unregisterContinuation(token: number, callback: AsyncCallback<void>): void;
    function unregisterContinuation(token: number): Promise<void>;
 
    /**
     * Updates the connection state of the device where the specified ability is successfully hopped.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param token Indicates the registration token of the ability.
     * @param deviceId Indicates the ID of the device whose connection state is to be updated.
     * @param status Indicates the connection state to update.
     * @returns callback Indicates the callback to be invoked when the continuation manager service is connected.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    function updateContinuationState(token: number, deviceId: string, status: DeviceConnectState, callback: AsyncCallback<void>): void;
    function updateContinuationState(token: number, deviceId: string, status: DeviceConnectState): Promise<void>;
 
    /**
     * Start to manage the devices that can be selected for continuation.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @param token Indicates the registration token of the ability.
     * @param options Indicates the extraParams object containing the extra parameters used to filter
     * the list of available devices. This parameter can be null.
     * @returns callback Indicates the callback to be invoked when the continuation manager service is connected.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 16600001 - The system ability works abnormally.
     * @throws { BusinessError } 16600002 - The specified token or callback is not registered.
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 9
     */
    function startContinuationDeviceManager(token: number, callback: AsyncCallback<void>): void;
    function startContinuationDeviceManager(token: number, options: ContinuationExtraParams, callback: AsyncCallback<void>): void;
    function startContinuationDeviceManager(token: number, options?: ContinuationExtraParams): Promise<void>;

    /**
     * Device connection status data structure.
     *
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     */
    export enum DeviceConnectState {
        IDLE = 0,
        CONNECTING = 1,
        CONNECTED = 2,
        DISCONNECTING = 3
    }

    /**
     * Indicates the description of additional parameters for continuation.
     * 
     * @syscap SystemCapability.Ability.DistributedAbilityManager
     * @since 8
     */
    export enum ContinuationMode {

        /**
         * Collaboration with a single device.
         */
        COLLABORATION_SINGLE = 0,

        /**
         * Collaboration with multiple devices.
         */
        COLLABORATION_MULTIPLE = 1,
    }

}
export default continuationManager;