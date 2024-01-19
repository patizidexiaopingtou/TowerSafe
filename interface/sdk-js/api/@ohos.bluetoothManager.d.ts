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
 * Provides methods to operate or manage Bluetooth.
 * @namespace bluetoothManager
 * @syscap SystemCapability.Communication.Bluetooth.Core
 * @since 9
 */
declare namespace bluetoothManager {
    /**
     * Obtains the Bluetooth status of a device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @returns { BluetoothState } Returns the Bluetooth status, which can be {@link BluetoothState#STATE_OFF},
     * {@link BluetoothState#STATE_TURNING_ON}, {@link BluetoothState#STATE_ON}, {@link BluetoothState#STATE_TURNING_OFF},
     * {@link BluetoothState#STATE_BLE_TURNING_ON}, {@link BluetoothState#STATE_BLE_ON},
     * or {@link BluetoothState#STATE_BLE_TURNING_OFF}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function getState(): BluetoothState;

    /**
     * Get the local device connection state to any profile of any remote device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @returns { ProfileConnectionState } One of {@link ProfileConnectionState#STATE_DISCONNECTED},
     * {@link ProfileConnectionState#STATE_CONNECTING}, {@link ProfileConnectionState#STATE_CONNECTED},
     * {@link ProfileConnectionState#STATE_DISCONNECTING}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function getBtConnectionState(): ProfileConnectionState;

    /**
     * Starts pairing with a remote Bluetooth device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @param deviceId The address of the remote device to pair.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function pairDevice(deviceId: string): void;

    /**
     * Remove a paired remote device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @param deviceId The address of the remote device to be removed.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 202 - Non-system applications are not allowed to use system APIs.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    function cancelPairedDevice(deviceId: string): void;

    /**
     * Obtains the name of a peer Bluetooth device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param deviceId The address of the remote device.
     * @returns { string } Returns the device name in character string format.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function getRemoteDeviceName(deviceId: string): string;

    /**
     * Obtains the class of a peer Bluetooth device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param deviceId The address of the remote device.
     * @returns { DeviceClass } The class of the remote device, {@link DeviceClass}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function getRemoteDeviceClass(deviceId: string): DeviceClass;

    /**
     * Enables Bluetooth on a device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function enableBluetooth(): void;

    /**
     * Disables Bluetooth on a device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function disableBluetooth(): void;

    /**
     * Obtains the Bluetooth local name of a device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @returns { string } Returns the name the device.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function getLocalName(): string;

    /**
     * Obtains the list of Bluetooth devices that have been paired with the current device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @returns { Array<string> } Returns a list of paired Bluetooth devices's address.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function getPairedDevices(): Array<string>;

    /**
     * Obtains the connection state of profile.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param profileId The profile id.
     * @returns { ProfileConnectionState } Returns the connection state.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900004 - Profile is not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function getProfileConnectionState(profileId: ProfileId): ProfileConnectionState;

    /**
     * Sets the confirmation of pairing with a certain device.
     *
     * @permission ohos.permission.MANAGE_BLUETOOTH
     * @param device The address of the remote device.
     * @param accept Indicates whether to accept the pairing request, {@code true} indicates accept or {@code false} otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function setDevicePairingConfirmation(device: string, accept: boolean): void;

    /**
     * Sets the Bluetooth friendly name of a device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @param name Indicates a valid Bluetooth name.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function setLocalName(name: string): void;

    /**
     * Sets the Bluetooth scan mode for a device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param mode Indicates the Bluetooth scan mode to set, {@link ScanMode}.
     * @param duration Indicates the duration in seconds, in which the host is discoverable.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function setBluetoothScanMode(mode: ScanMode, duration: number): void;

    /**
     * Obtains the Bluetooth scanning mode of a device.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @returns { ScanMode } Returns the Bluetooth scanning mode, {@link ScanMode}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function getBluetoothScanMode(): ScanMode;

    /**
     * Starts scanning Bluetooth devices.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH and ohos.permission.LOCATION
     *     and ohos.permission.APPROXIMATELY_LOCATION
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function startBluetoothDiscovery(): void;

    /**
     * Stops Bluetooth device scanning.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function stopBluetoothDiscovery(): void;

    /**
     * Subscribe the event reported when a remote Bluetooth device is discovered.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param type Type of the discovering event to listen for.
     * @param callback Callback used to listen for the discovering event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function on(type: "bluetoothDeviceFind", callback: Callback<Array<string>>): void;

    /**
     * Unsubscribe the event reported when a remote Bluetooth device is discovered.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param type Type of the discovering event to listen for.
     * @param callback Callback used to listen for the discovering event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function off(type: "bluetoothDeviceFind", callback?: Callback<Array<string>>): void;

    /**
     * Subscribe the event reported when a remote Bluetooth device is bonded.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param type Type of the bond state event to listen for.
     * @param callback Callback used to listen for the bond state event, {@link BondStateParam}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function on(type: "bondStateChange", callback: Callback<BondStateParam>): void;

    /**
     * Unsubscribe the event reported when a remote Bluetooth device is bonded.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param type Type of the bond state event to listen for.
     * @param callback Callback used to listen for the bond state event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function off(type: "bondStateChange", callback?: Callback<BondStateParam>): void;

    /**
     * Subscribe the event of a pairing request from a remote Bluetooth device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @param type Type of the pairing request event to listen for.
     * @param callback Callback used to listen for the pairing request event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function on(type: "pinRequired", callback: Callback<PinRequiredParam>): void;

    /**
     * Unsubscribe the event of a pairing request from a remote Bluetooth device.
     *
     * @permission ohos.permission.DISCOVER_BLUETOOTH
     * @param type Type of the pairing request event to listen for.
     * @param callback Callback used to listen for the pairing request event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function off(type: "pinRequired", callback?: Callback<PinRequiredParam>): void;

    /**
     * Subscribe the event reported when the Bluetooth state changes.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param type Type of the Bluetooth state changes event to listen for.
     * @param callback Callback used to listen for the Bluetooth state event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function on(type: "stateChange", callback: Callback<BluetoothState>): void;

    /**
     * Unsubscribe the event reported when the Bluetooth state changes.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param type Type of the Bluetooth state changes event to listen for.
     * @param callback Callback used to listen for the Bluetooth state event.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function off(type: "stateChange", callback?: Callback<BluetoothState>): void;

    /**
     * Creates a Bluetooth server listening socket.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param name Indicates the service name.
     * @param option Indicates the listen parameters {@link SppOption}.
     * @param callback Callback used to return a server socket ID.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900004 - Profile is not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function sppListen(name: string, option: SppOption, callback: AsyncCallback<number>): void;

    /**
     * Waits for a remote device to connect.
     *
     * @param serverSocket Indicates the server socket ID, returned by {@link sppListen}.
     * @param callback Callback used to return a client socket ID.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900004 - Profile is not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function sppAccept(serverSocket: number, callback: AsyncCallback<number>): void;

    /**
     * Connects to a remote device over the socket.
     *
     * @permission ohos.permission.USE_BLUETOOTH
     * @param device The address of the remote device to connect.
     * @param option Indicates the connect parameters {@link SppOption}.
     * @param callback Callback used to return a client socket ID.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900003 - Bluetooth switch is off.
     * @throws { BusinessError } 2900004 - Profile is not supported.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function sppConnect(device: string, option: SppOption, callback: AsyncCallback<number>): void;

    /**
     * Disables an spp server socket and releases related resources.
     *
     * @param socket Indicates the server socket ID, returned by {@link sppListen}.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function sppCloseServerSocket(socket: number): void;

    /**
     * Disables an spp client socket and releases related resources.
     *
     * @param socket Indicates the client socket ID, returned by {@link sppAccept} or {@link sppConnect}.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2900001 - Service stopped.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function sppCloseClientSocket(socket: number): void;

    /**
     * Write data through the socket.
     *
     * @param clientSocket Indicates the client socket ID, returned by {@link sppAccept} or {@link sppConnect}.
     * @param data Indicates the data to write.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2901054 - IO error.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function sppWrite(clientSocket: number, data: ArrayBuffer): void;

    /**
     * Subscribe the event reported when data is read from the socket.
     *
     * @param type Type of the spp read event to listen for.
     * @param callback Callback used to listen for the spp read event.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 2901054 - IO error.
     * @throws { BusinessError } 2900099 - Operation failed.
     * @since 9
     */
    function on(type: "sppRead", clientSocket: number, callback: Callback<ArrayBuffer>): void;

    /**
     * Unsubscribe the event reported when data is read from the socket.
     *
     * @param type Type of the spp read event to listen for.
     * @param callback Callback used to listen for the spp read event.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @since 9
     */
    function off(type: "sppRead", clientSocket: number, callback?: Callback<ArrayBuffer>): void;

    /**
     * Obtains the instance of profile.
     *
     * @param profileId The profile id..
     * @returns { A2dpSourceProfile | HandsFreeAudioGatewayProfile | HidHostProfile | PanProfile } Returns the instance of profile.
     * @throws { BusinessError } 401 - Invalid parameter.
     * @throws { BusinessError } 801 - Capability not supported.
     * @since 9
     */
    function getProfileInstance(profileId: ProfileId): A2dpSourceProfile | HandsFreeAudioGatewayProfile | HidHostProfile | PanProfile;

    /**
     * Base interface of profile.
     */
    interface BaseProfile {
        /**
         * Obtains the connected devices list of profile.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { Array<string> } Returns the address of connected devices list.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900004 - Profile is not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        getConnectionDevices(): Array<string>;

        /**
         * Obtains the profile state of device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param device The address of bluetooth device.
         * @returns { ProfileConnectionState } Returns {@link ProfileConnectionState} of device.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900004 - Profile is not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        getDeviceState(device: string): ProfileConnectionState;
    }

    /**
     * Manager a2dp source profile.
     */
    interface A2dpSourceProfile extends BaseProfile {
        /**
         * Connect to device with a2dp.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @param device The address of the remote device to connect.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900004 - Profile is not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        connect(device: string): void;

        /**
         * Disconnect to device with a2dp.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @param device The address of the remote device to disconnect.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900004 - Profile is not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        disconnect(device: string): void;

        /**
         * Subscribe the event reported when the profile connection state changes .
         *
         * @param type Type of the profile connection state changes event to listen for .
         * @param callback Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        on(type: "connectionStateChange", callback: Callback<StateChangeParam>): void;

        /**
         * Unsubscribe the event reported when the profile connection state changes .
         *
         * @param type Type of the profile connection state changes event to listen for .
         * @param callback Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        off(type: "connectionStateChange", callback?: Callback<StateChangeParam>): void;

        /**
         * Obtains the playing state of device.
         *
         * @param device The address of the remote device.
         * @returns { PlayingState } Returns {@link PlayingState} of the remote device.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900004 - Profile is not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        getPlayingState(device: string): PlayingState;
    }

    /**
     * Manager handsfree AG profile.
     */
    interface HandsFreeAudioGatewayProfile extends BaseProfile {
        /**
         * Connect to device with hfp.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @param device The address of the remote device to connect.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900004 - Profile is not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        connect(device: string): void;

        /**
         * Disconnect to device with hfp.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @param device The address of the remote device to disconnect.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900004 - Profile is not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        disconnect(device: string): void;

        /**
         * Subscribe the event reported when the profile connection state changes .
         *
         * @param type Type of the profile connection state changes event to listen for .
         * @param callback Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        on(type: "connectionStateChange", callback: Callback<StateChangeParam>): void;

        /**
         * Unsubscribe the event reported when the profile connection state changes .
         *
         * @param type Type of the profile connection state changes event to listen for .
         * @param callback Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        off(type: "connectionStateChange", callback?: Callback<StateChangeParam>): void;
    }

    /**
     * Manager hid host profile.
     */
    interface HidHostProfile extends BaseProfile {
        /**
         * Connect to device with hid host.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @param device The address of the remote device to connect.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 202 - Non-system applications are not allowed to use system APIs.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900004 - Profile is not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @systemapi Hide this for inner system use.
         * @since 9
         */
        connect(device: string): void;

        /**
         * Disconnect to device with hid host.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @param device The address of the remote device to disconnect.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 202 - Non-system applications are not allowed to use system APIs.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900004 - Profile is not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @systemapi Hide this for inner system use.
         * @since 9
         */
        disconnect(device: string): void;

        /**
         * Subscribe the event reported when the profile connection state changes .
         *
         * @param type Type of the profile connection state changes event to listen for .
         * @param callback Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        on(type: "connectionStateChange", callback: Callback<StateChangeParam>): void;

        /**
         * Unsubscribe the event reported when the profile connection state changes.
         *
         * @param type Type of the profile connection state changes event to listen for.
         * @param callback Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        off(type: "connectionStateChange", callback?: Callback<StateChangeParam>): void;
    }

    /**
     * Manager pan profile.
     */
    interface PanProfile extends BaseProfile {
        /**
         * Disconnect to device with pan.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param device The address of the remote device to disconnect.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 202 - Non-system applications are not allowed to use system APIs.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900004 - Profile is not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @systemapi Hide this for inner system use.
         * @since 9
         */
        disconnect(device: string): void;

        /**
         * Subscribe the event reported when the profile connection state changes .
         *
         * @param type Type of the profile connection state changes event to listen for .
         * @param callback Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        on(type: "connectionStateChange", callback: Callback<StateChangeParam>): void;

        /**
         * Unsubscribe the event reported when the profile connection state changes.
         *
         * @param type Type of the profile connection state changes event to listen for.
         * @param callback Callback used to listen for event.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        off(type: "connectionStateChange", callback?: Callback<StateChangeParam>): void;

        /**
         * Enable bluetooth tethering.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @param enable Specifies whether to enable tethering. The value {@code true} indicates
         * that tethering is enabled, and the value {@code false} indicates that tethering is disabled.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 202 - Non-system applications are not allowed to use system APIs.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900004 - Profile is not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @systemapi Hide this for inner system use.
         * @since 9
         */
        setTethering(enable: boolean): void;

        /**
         * Obtains the tethering enable or disable.
         *
         * @returns { boolean } Returns the value {@code true} is tethering is on, returns {@code false} otherwise.
         * @throws { BusinessError } 202 - Non-system applications are not allowed to use system APIs.
         * @throws { BusinessError } 801 - Capability not supported.
         * @systemapi Hide this for inner system use.
         * @since 9
         */
        isTetheringOn(): boolean;
    }

    namespace BLE {
        /**
         * create a JavaScript Gatt server instance.
         *
         * @returns { GattServer } Returns a JavaScript Gatt server instance {@code GattServer}.
         * @since 9
         */
        function createGattServer(): GattServer;

        /**
         * create a JavaScript Gatt client device instance.
         *
         * @param deviceId The address of the remote device.
         * @returns { GattClientDevice } Returns a JavaScript Gatt client device instance {@code GattClientDevice}.
         * @since 9
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         */
        function createGattClientDevice(deviceId: string): GattClientDevice;

        /**
         * Obtains the list of devices in the connected status.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { Array<string> } Returns the list of device address.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        function getConnectedBLEDevices(): Array<string>;

        /**
         * Starts scanning for specified BLE devices with filters.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH and ohos.permission.MANAGE_BLUETOOTH and ohos.permission.LOCATION
         *     and ohos.permission.APPROXIMATELY_LOCATION
         * @param filters Indicates the list of filters used to filter out specified devices.
         * If you do not want to use filter, set this parameter to {@code null}.
         * @param options Indicates the parameters for scanning and if the user does not assign a value, the default value will be used.
         * {@link ScanOptions#interval} set to 0, {@link ScanOptions#dutyMode} set to {@link SCAN_MODE_LOW_POWER}
         * and {@link ScanOptions#matchMode} set to {@link MATCH_MODE_AGGRESSIVE}.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        function startBLEScan(filters: Array<ScanFilter>, options?: ScanOptions): void;

        /**
         * Stops BLE scanning.
         *
         * @since 9
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         */
        function stopBLEScan(): void;

        /**
         * Subscribe BLE scan result.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param type Type of the scan result event to listen for.
         * @param callback Callback used to listen for the scan result event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        function on(type: "BLEDeviceFind", callback: Callback<Array<ScanResult>>): void;

        /**
         * Unsubscribe BLE scan result.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param type Type of the scan result event to listen for.
         * @param callback Callback used to listen for the scan result event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        function off(type: "BLEDeviceFind", callback?: Callback<Array<ScanResult>>): void;
    }

    /**
     * Manages GATT server. Before calling an Gatt server method, you must use {@link createGattServer} to create an GattServer instance.
     */
    interface GattServer {
        /**
         * Starts BLE advertising.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @param setting Indicates the settings for BLE advertising.
         * If you need to use the default value, set this parameter to {@code null}.
         * @param advData Indicates the advertising data.
         * @param advResponse Indicates the scan response associated with the advertising data.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        startAdvertising(setting: AdvertiseSetting, advData: AdvertiseData, advResponse?: AdvertiseData): void;

        /**
         * Stops BLE advertising.
         *
         * @permission ohos.permission.DISCOVER_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        stopAdvertising(): void;

        /**
         * Adds a specified service to be hosted.
         *
         * <p>The added service and its characteristics are provided by the local device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param service Indicates the service to add.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        addService(service: GattService): void;

        /**
         * Removes a specified service from the list of GATT services provided by this device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param serviceUuid Indicates the UUID of the service to remove.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900004 - Profile is not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        removeService(serviceUuid: string): void;

        /**
         * Closes this {@code GattServer} object and unregisters its callbacks.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        close(): void;

        /**
         * Sends a notification of a change in a specified local characteristic.
         *
         * <p>This method should be called for every BLE peripheral device that has requested notifications.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param deviceId Indicates the address of the BLE peripheral device to receive the notification.
         * @param notifyCharacteristic Indicates the local characteristic that has changed.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        notifyCharacteristicChanged(deviceId: string, notifyCharacteristic: NotifyCharacteristic): void;

        /**
         * Sends a response to a specified read or write request to a given BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param serverResponse Indicates the response parameters {@link ServerResponse}.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        sendResponse(serverResponse: ServerResponse): void;

        /**
         * Subscribe characteristic read event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param type Type of the characteristic read event to listen for.
         * @param callback Callback used to listen for the characteristic read event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        on(type: "characteristicRead", callback: Callback<CharacteristicReadRequest>): void;

        /**
         * Unsubscribe characteristic read event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param type Type of the characteristic read event to listen for.
         * @param callback Callback used to listen for the characteristic read event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        off(type: "characteristicRead", callback?: Callback<CharacteristicReadRequest>): void;

        /**
         * Subscribe characteristic write event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param type Type of the characteristic write event to listen for.
         * @param callback Callback used to listen for the characteristic write event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        on(type: "characteristicWrite", callback: Callback<CharacteristicWriteRequest>): void;

        /**
         * Unsubscribe characteristic write event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param type Type of the characteristic write event to listen for.
         * @param callback Callback used to listen for the characteristic write event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        off(type: "characteristicWrite", callback?: Callback<CharacteristicWriteRequest>): void;

        /**
         * Subscribe descriptor read event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param type Type of the descriptor read event to listen for.
         * @param callback Callback used to listen for the descriptor read event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        on(type: "descriptorRead", callback: Callback<DescriptorReadRequest>): void;

        /**
         * Unsubscribe descriptor read event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param type Type of the descriptor read event to listen for.
         * @param callback Callback used to listen for the descriptor read event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        off(type: "descriptorRead", callback?: Callback<DescriptorReadRequest>): void;

        /**
         * Subscribe descriptor write event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param type Type of the descriptor write event to listen for.
         * @param callback Callback used to listen for the descriptor write event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        on(type: "descriptorWrite", callback: Callback<DescriptorWriteRequest>): void;

        /**
         * Unsubscribe descriptor write event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param type Type of the descriptor write event to listen for.
         * @param callback Callback used to listen for the descriptor write event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        off(type: "descriptorWrite", callback?: Callback<DescriptorWriteRequest>): void;

        /**
         * Subscribe server connection state changed event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param type Type of the connection state changed event to listen for.
         * @param callback Callback used to listen for the connection state changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        on(type: "connectStateChange", callback: Callback<BLEConnectChangedState>): void;

        /**
         * Unsubscribe server connection state changed event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param type Type of the connection state changed event to listen for.
         * @param callback Callback used to listen for the connection state changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        off(type: "connectStateChange", callback?: Callback<BLEConnectChangedState>): void;
    }

    /**
     * Manages GATT client. Before calling an Gatt client method, you must use {@link createGattClientDevice} to create an GattClientDevice instance.
     */
    interface GattClientDevice {

        /**
         * Connects to a BLE peripheral device.
         *
         * <p>The 'BLEConnectionStateChange' event is subscribed to return the connection state.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        connect(): void;

        /**
         * Disconnects from or stops an ongoing connection to a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        disconnect(): void;

        /**
         * Disables a BLE peripheral device.
         *
         * <p> This method unregisters the device and clears the registered callbacks and handles.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { boolean } Returns {@code true} if the the device is disabled; returns {@code false} otherwise.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900003 - Bluetooth switch is off.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        close(): void;

        /**
         * Obtains the name of BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { Promise<string> } Returns a string representation of the name if obtained;
         * returns {@code null} if the name fails to be obtained or the name does not exist.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        getDeviceName(callback: AsyncCallback<string>): void;
        getDeviceName(): Promise<string>;

        /**
         * Starts discovering services.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { Promise<Array<GattService>> } Returns the list of services {@link GattService} of the BLE peripheral device.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        getServices(callback: AsyncCallback<Array<GattService>>): void;
        getServices(): Promise<Array<GattService>>;

        /**
         * Reads the characteristic of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param characteristic Indicates the characteristic to read.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901000 - Read forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        readCharacteristicValue(characteristic: BLECharacteristic, callback: AsyncCallback<BLECharacteristic>): void;
        readCharacteristicValue(characteristic: BLECharacteristic): Promise<BLECharacteristic>;

        /**
         * Reads the descriptor of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param descriptor Indicates the descriptor to read.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901000 - Read forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        readDescriptorValue(descriptor: BLEDescriptor, callback: AsyncCallback<BLEDescriptor>): void;
        readDescriptorValue(descriptor: BLEDescriptor): Promise<BLEDescriptor>;

        /**
         * Writes the characteristic of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param characteristic Indicates the characteristic to write.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901001 - Write forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        writeCharacteristicValue(characteristic: BLECharacteristic): void;

        /**
         * Writes the descriptor of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param descriptor Indicates the descriptor to write.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2901001 - Write forbidden.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        writeDescriptorValue(descriptor: BLEDescriptor): void;

        /**
         * Get the RSSI value of this BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @returns { Promise<number> } Returns the RSSI value.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        getRssiValue(callback: AsyncCallback<number>): void;
        getRssiValue(): Promise<number>;

        /**
         * Set the mtu size of a BLE peripheral device.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param mtu The maximum transmission unit.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        setBLEMtuSize(mtu: number): void;

        /**
         * Enables or disables notification of a characteristic when value changed.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param enable Specifies whether to enable notification of the characteristic. The value {@code true} indicates
         * that notification is enabled, and the value {@code false} indicates that notification is disabled.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Invalid parameter.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 2900001 - Service stopped.
         * @throws { BusinessError } 2900099 - Operation failed.
         * @since 9
         */
        setNotifyCharacteristicChanged(characteristic: BLECharacteristic, enable: boolean): void;

        /**
         * Subscribe characteristic value changed event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param type Type of the characteristic value changed event to listen for.
         * @param callback Callback used to listen for the characteristic value changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        on(type: "BLECharacteristicChange", callback: Callback<BLECharacteristic>): void;

        /**
         * Unsubscribe characteristic value changed event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param type Type of the characteristic value changed event to listen for.
         * @param callback Callback used to listen for the characteristic value changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        off(type: "BLECharacteristicChange", callback?: Callback<BLECharacteristic>): void;

        /**
         * Subscribe client connection state changed event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param type Type of the connection state changed event to listen for.
         * @param callback Callback used to listen for the connection state changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        on(type: "BLEConnectionStateChange", callback: Callback<BLEConnectChangedState>): void;

        /**
         * Unsubscribe client connection state changed event.
         *
         * @permission ohos.permission.USE_BLUETOOTH
         * @param type Type of the connection state changed event to listen for.
         * @param callback Callback used to listen for the connection state changed event.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 801 - Capability not supported.
         * @since 9
         */
        off(type: "BLEConnectionStateChange", callback?: Callback<BLEConnectChangedState>): void;
    }

    /**
     * Describes the Gatt service.
     *
     * @since 9
     */
    interface GattService {
        /** The UUID of a GattService instance */
        serviceUuid: string;
        /** Indicates whether the GattService instance is primary or secondary. */
        isPrimary: boolean;
        /** The {@link BLECharacteristic} list belongs to this GattService instance */
        characteristics: Array<BLECharacteristic>;
        /** The list of GATT services contained in the service */
        includeServices?: Array<GattService>;
    }

    /**
     * Describes the Gatt characteristic.
     *
     * @since 9
     */
    interface BLECharacteristic {
        /** The UUID of the {@link GattService} instance to which the characteristic belongs */
        serviceUuid: string;
        /** The UUID of a BLECharacteristic instance */
        characteristicUuid: string;
        /** The value of a BLECharacteristic instance */
        characteristicValue: ArrayBuffer;
        /** The list of {@link BLEDescriptor} contained in the characteristic */
        descriptors: Array<BLEDescriptor>;
    }

    /**
     * Describes the Gatt descriptor.
     *
     * @since 9
     */
    interface BLEDescriptor {
        /** The UUID of the {@link GattService} instance to which the descriptor belongs */
        serviceUuid: string;
        /** The UUID of the {@link BLECharacteristic} instance to which the descriptor belongs */
        characteristicUuid: string;
        /** The UUID of the BLEDescriptor instance */
        descriptorUuid: string;
        /** The value of the BLEDescriptor instance */
        descriptorValue: ArrayBuffer;
    }

    /**
     * Describes the value of the indication or notification sent by the Gatt server.
     *
     * @since 9
     */
    interface NotifyCharacteristic {
        /** The UUID of the {@link GattService} instance to which the characteristic belongs */
        serviceUuid: string;
        /** The UUID of a NotifyCharacteristic instance */
        characteristicUuid: string;
        /** The value of a NotifyCharacteristic instance */
        characteristicValue: ArrayBuffer;
        /**
         * Specifies whether to request confirmation from the BLE peripheral device (indication) or
         * send a notification. Value {@code true} indicates the former and {@code false} indicates the latter.
         */
        confirm: boolean;
    }

    /**
     * Describes the parameters of the Gatt client's characteristic read request.
     *
     * @since 9
     */
    interface CharacteristicReadRequest {
        /** Indicates the address of the client that initiates the read request */
        deviceId: string;
        /** The Id of the read request */
        transId: number;
        /** Indicates the byte offset of the start position for reading characteristic value */
        offset: number;
        /** The UUID of a CharacteristicReadRequest instance */
        characteristicUuid: string;
        /** The UUID of the service to which the characteristic belongs */
        serviceUuid: string;
    }

    /**
     * Describes the parameters of the of the Gatt client's characteristic write request.
     *
     * @since 9
     */
    interface CharacteristicWriteRequest {
        /** Indicates the address of the client that initiates the write request */
        deviceId: string;
        /** The Id of the write request */
        transId: number;
        /** Indicates the byte offset of the start position for writing characteristic value */
        offset: number;
        /** Whether this request should be pending for later operation */
        isPrep: boolean;
        /** Whether the remote client need a response */
        needRsp: boolean;
        /** Indicates the value to be written */
        value: ArrayBuffer;
        /** The UUID of a CharacteristicWriteRequest instance */
        characteristicUuid: string;
        /** The UUID of the service to which the characteristic belongs */
        serviceUuid: string;
    }

    /**
     * Describes the parameters of the Gatt client's descriptor read request.
     *
     * @since 9
     */
    interface DescriptorReadRequest {
        /** Indicates the address of the client that initiates the read request */
        deviceId: string;
        /** The Id of the read request */
        transId: number;
        /** Indicates the byte offset of the start position for reading characteristic value */
        offset: number;
        /** The UUID of a DescriptorReadRequest instance */
        descriptorUuid: string;
        /** The UUID of the characteristic to which the descriptor belongs */
        characteristicUuid: string;
        /** The UUID of the service to which the descriptor belongs */
        serviceUuid: string;
    }

    /**
     * Describes the parameters of the Gatt client's characteristic write request.
     *
     * @since 9
     */
    interface DescriptorWriteRequest {
        /** Indicates the address of the client that initiates the write request */
        deviceId: string;
        /** The Id of the write request */
        transId: number;
        /** Indicates the byte offset of the start position for writing characteristic value */
        offset: number;
        /** Whether this request should be pending for later operation */
        isPrep: boolean;
        /** Whether the remote client need a response */
        needRsp: boolean;
        /** Indicates the value to be written */
        value: ArrayBuffer;
        /** The UUID of a DescriptorWriteRequest instance */
        descriptorUuid: string;
        /** The UUID of the characteristic to which the descriptor belongs */
        characteristicUuid: string;
        /** The UUID of the service to which the descriptor belongs */
        serviceUuid: string;
    }

    /**
     * Describes the parameters of a response send by the server to a specified read or write request.
     *
     * @since 9
     */
    interface ServerResponse {
        /** Indicates the address of the client to which to send the response */
        deviceId: string;
        /** The Id of the write request */
        transId: number;
        /** Indicates the status of the read or write request, set this parameter to '0' in normal cases */
        status: number;
        /** Indicates the byte offset of the start position for reading or writing operation */
        offset: number;
        /** Indicates the value to be sent */
        value: ArrayBuffer;
    }

    /**
     * Describes the Gatt profile connection state.
     *
     * @since 9
     */
    interface BLEConnectChangedState {
        /** Indicates the peer device address */
        deviceId: string;
        /** Connection state of the Gatt profile */
        state: ProfileConnectionState;
    }

    /**
     * Describes the contents of the scan results.
     *
     * @since 9
     */
    interface ScanResult {
        /** Address of the scanned device */
        deviceId: string;
        /** RSSI of the remote device */
        rssi: number;
        /** The raw data of broadcast packet */
        data: ArrayBuffer;
    }

    /**
     * Describes the settings for BLE advertising.
     *
     * @since 9
     */
    interface AdvertiseSetting {
        /**
         * Minimum slot value for the advertising interval, which is {@code 32} (20 ms)
         * Maximum slot value for the advertising interval, which is {@code 16777215} (10485.759375s)
         * Default slot value for the advertising interval, which is {@code 1600} (1s)
         */
        interval?: number;
        /**
         * Minimum transmission power level for advertising, which is {@code -127}
         * Maximum transmission power level for advertising, which is {@code 1}
         * Default transmission power level for advertising, which is {@code -7}
         */
        txPower?: number;
        /** Indicates whether the BLE is connectable, default is {@code true} */
        connectable?: boolean;
    }

    /**
     * Describes the advertising data.
     *
     * @since 9
     */
    interface AdvertiseData {
        /** The specified service UUID list to this advertisement */
        serviceUuids: Array<string>;
        /** The specified manufacturer data list to this advertisement */
        manufactureData: Array<ManufactureData>;
        /** The specified service data list to this advertisement */
        serviceData: Array<ServiceData>;
    }

    /**
     * Describes the manufacturer data.
     *
     * @since 9
     */
    interface ManufactureData {
        /** Indicates the manufacturer ID assigned by Bluetooth SIG */
        manufactureId: number;
        /** Indicates the manufacturer data to add */
        manufactureValue: ArrayBuffer;
    }

    /**
     * Describes the service data.
     *
     * @since 9
     */
    interface ServiceData {
        /** Indicates the UUID of the service data to add */
        serviceUuid: string;
        /** Indicates the service data to add */
        serviceValue: ArrayBuffer;
    }

    /**
     * Describes the criteria for filtering scanning results can be set.
     *
     * @since 9
     */
    interface ScanFilter {
        /**
         * The address of a BLE peripheral device
         * @since 9
         */
        deviceId?: string;

        /**
         * The name of a BLE peripheral device
         * @since 9
         */
        name?: string;

        /**
         * The service UUID of a BLE peripheral device
         * @since 9
         */
        serviceUuid?: string;

        /**
         * Service UUID mask.
         * @since 9
         */
        serviceUuidMask?: string;

        /**
         * Service solicitation UUID.
         * @since 9
         */
        serviceSolicitationUuid?: string;

        /**
         * Service solicitation UUID mask.
         * @since 9
         */
        serviceSolicitationUuidMask?: string;

        /**
         * Service data.
         * @since 9
         */
        serviceData?: ArrayBuffer;

        /**
         * Service data mask.
         * @since 9
         */
        serviceDataMask?: ArrayBuffer;

        /**
         * Manufacture id.
         * @since 9
         */
        manufactureId?: number;

        /**
         * Manufacture data.
         * @since 9
         */
        manufactureData?: ArrayBuffer;

        /**
         * Manufacture data mask.
         * @since 9
         */
        manufactureDataMask?: ArrayBuffer;
    }

    /**
     * Describes the parameters for scan.
     *
     * @since 9
     */
    interface ScanOptions {
        /** Time of delay for reporting the scan result */
        interval?: number;
        /** Bluetooth LE scan mode */
        dutyMode?: ScanDuty;
        /** Match mode for Bluetooth LE scan filters hardware match */
        matchMode?: MatchMode;
    }

    /**
     * Describes the spp parameters.
     *
     * @since 9
     */
    interface SppOption {
        /** Indicates the UUID in the SDP record. */
        uuid: string;
        /** Indicates secure channel or not */
        secure: boolean;
        /** Spp link type {@link SppType}*/
        type: SppType;
    }

    /**
     * Describes the bond key param.
     *
     * @since 9
     */
    interface PinRequiredParam {
        deviceId: string;
        pinCode: string;
    }

    /**
     * Describes the class of a bluetooth device.
     *
     * @since 9
     */
    interface DeviceClass {
        majorClass: MajorClass;
        majorMinorClass: MajorMinorClass;
        classOfDevice: number;
    }

    /**
     * Describes the class of a bluetooth device.
     *
     * @since 9
     */
    interface BondStateParam {
        deviceId: string;
        state: BondState;
    }

    /**
     * Profile state change parameters.
     *
     * @since 9
     */
    interface StateChangeParam {
        /** The address of device */
        deviceId: string;

        /** Profile state value */
        state: ProfileConnectionState;
    }

    /**
     * The enum of scan duty.
     *
     * @since 9
     */
    enum ScanDuty {
        /** low power mode */
        SCAN_MODE_LOW_POWER = 0,
        /** balanced power mode */
        SCAN_MODE_BALANCED = 1,
        /** Scan using highest duty cycle */
        SCAN_MODE_LOW_LATENCY = 2
    }

    /**
     * The enum of BLE match mode.
     *
     * @since 9
     */
    enum MatchMode {
        /** aggressive mode */
        MATCH_MODE_AGGRESSIVE = 1,
        /** sticky mode */
        MATCH_MODE_STICKY = 2
    }

    /**
     * The enum of profile connection state.
     *
     * @since 9
     */
    enum ProfileConnectionState {
        /** the current profile is disconnected */
        STATE_DISCONNECTED = 0,
        /** the current profile is being connected */
        STATE_CONNECTING = 1,
        /** the current profile is connected */
        STATE_CONNECTED = 2,
        /** the current profile is being disconnected */
        STATE_DISCONNECTING = 3
    }

    /**
     * The enum of bluetooth state.
     *
     * @since 9
     */
    enum BluetoothState {
        /** Indicates the local Bluetooth is off */
        STATE_OFF = 0,
        /** Indicates the local Bluetooth is turning on */
        STATE_TURNING_ON = 1,
        /** Indicates the local Bluetooth is on, and ready for use */
        STATE_ON = 2,
        /** Indicates the local Bluetooth is turning off */
        STATE_TURNING_OFF = 3,
        /** Indicates the local Bluetooth is turning LE mode on */
        STATE_BLE_TURNING_ON = 4,
        /** Indicates the local Bluetooth is in LE only mode */
        STATE_BLE_ON = 5,
        /** Indicates the local Bluetooth is turning off LE only mode */
        STATE_BLE_TURNING_OFF = 6
    }

    /**
     * The enum of SPP type.
     *
     * @since 9
     */
    enum SppType {
        /** RFCOMM */
        SPP_RFCOMM
    }

    /**
     * The enum of BR scan mode.
     *
     * @since 9
     */
    enum ScanMode {
        /** Indicates the scan mode is none */
        SCAN_MODE_NONE = 0,
        /** Indicates the scan mode is connectable */
        SCAN_MODE_CONNECTABLE = 1,
        /** Indicates the scan mode is general discoverable */
        SCAN_MODE_GENERAL_DISCOVERABLE = 2,
        /** Indicates the scan mode is limited discoverable */
        SCAN_MODE_LIMITED_DISCOVERABLE = 3,
        /** Indicates the scan mode is connectable and general discoverable */
        SCAN_MODE_CONNECTABLE_GENERAL_DISCOVERABLE = 4,
        /** Indicates the scan mode is connectable and limited discoverable */
        SCAN_MODE_CONNECTABLE_LIMITED_DISCOVERABLE = 5
    }

    /**
     * The enum of bond state.
     *
     * @since 9
     */
    enum BondState {
        /** Indicate the bond state is invalid */
        BOND_STATE_INVALID = 0,
        /** Indicate the bond state is bonding */
        BOND_STATE_BONDING = 1,
        /** Indicate the bond state is bonded*/
        BOND_STATE_BONDED = 2
    }

    /**
     * The enum of major class of a bluetooth device.
     *
     * @since 9
     */
    enum MajorClass {
        MAJOR_MISC = 0x0000,
        MAJOR_COMPUTER = 0x0100,
        MAJOR_PHONE = 0x0200,
        MAJOR_NETWORKING = 0x0300,
        MAJOR_AUDIO_VIDEO = 0x0400,
        MAJOR_PERIPHERAL = 0x0500,
        MAJOR_IMAGING = 0x0600,
        MAJOR_WEARABLE = 0x0700,
        MAJOR_TOY = 0x0800,
        MAJOR_HEALTH = 0x0900,
        MAJOR_UNCATEGORIZED = 0x1F00
    }

    /**
     * The enum of major minor class of a bluetooth device.
     *
     * @since 9
     */
    enum MajorMinorClass {
        // The Minor Device Class field
        // Computer Major Class
        COMPUTER_UNCATEGORIZED = 0x0100,
        COMPUTER_DESKTOP = 0x0104,
        COMPUTER_SERVER = 0x0108,
        COMPUTER_LAPTOP = 0x010C,
        COMPUTER_HANDHELD_PC_PDA = 0x0110,
        COMPUTER_PALM_SIZE_PC_PDA = 0x0114,
        COMPUTER_WEARABLE = 0x0118,
        COMPUTER_TABLET = 0x011C,

        // Phone Major Class
        PHONE_UNCATEGORIZED = 0x0200,
        PHONE_CELLULAR = 0x0204,
        PHONE_CORDLESS = 0x0208,
        PHONE_SMART = 0x020C,
        PHONE_MODEM_OR_GATEWAY = 0x0210,
        PHONE_ISDN = 0x0214,

        // LAN/Network Access Point Major Class
        NETWORK_FULLY_AVAILABLE = 0x0300,
        NETWORK_1_TO_17_UTILIZED = 0x0320,
        NETWORK_17_TO_33_UTILIZED = 0x0340,
        NETWORK_33_TO_50_UTILIZED = 0x0360,
        NETWORK_60_TO_67_UTILIZED = 0x0380,
        NETWORK_67_TO_83_UTILIZED = 0x03A0,
        NETWORK_83_TO_99_UTILIZED = 0x03C0,
        NETWORK_NO_SERVICE = 0x03E0,

        // Audio/Video Major Class
        AUDIO_VIDEO_UNCATEGORIZED = 0x0400,
        AUDIO_VIDEO_WEARABLE_HEADSET = 0x0404,
        AUDIO_VIDEO_HANDSFREE = 0x0408,
        AUDIO_VIDEO_MICROPHONE = 0x0410,
        AUDIO_VIDEO_LOUDSPEAKER = 0x0414,
        AUDIO_VIDEO_HEADPHONES = 0x0418,
        AUDIO_VIDEO_PORTABLE_AUDIO = 0x041C,
        AUDIO_VIDEO_CAR_AUDIO = 0x0420,
        AUDIO_VIDEO_SET_TOP_BOX = 0x0424,
        AUDIO_VIDEO_HIFI_AUDIO = 0x0428,
        AUDIO_VIDEO_VCR = 0x042C,
        AUDIO_VIDEO_VIDEO_CAMERA = 0x0430,
        AUDIO_VIDEO_CAMCORDER = 0x0434,
        AUDIO_VIDEO_VIDEO_MONITOR = 0x0438,
        AUDIO_VIDEO_VIDEO_DISPLAY_AND_LOUDSPEAKER = 0x043C,
        AUDIO_VIDEO_VIDEO_CONFERENCING = 0x0440,
        AUDIO_VIDEO_VIDEO_GAMING_TOY = 0x0448,

        // Peripheral Major Class
        PERIPHERAL_NON_KEYBOARD_NON_POINTING = 0x0500,
        PERIPHERAL_KEYBOARD = 0x0540,
        PERIPHERAL_POINTING_DEVICE = 0x0580,
        PERIPHERAL_KEYBOARD_POINTING = 0x05C0,
        PERIPHERAL_UNCATEGORIZED = 0x0500,
        PERIPHERAL_JOYSTICK = 0x0504,
        PERIPHERAL_GAMEPAD = 0x0508,
        PERIPHERAL_REMOTE_CONTROL = 0x05C0,
        PERIPHERAL_SENSING_DEVICE = 0x0510,
        PERIPHERAL_DIGITIZER_TABLET = 0x0514,
        PERIPHERAL_CARD_READER = 0x0518,
        PERIPHERAL_DIGITAL_PEN = 0x051C,
        PERIPHERAL_SCANNER_RFID = 0x0520,
        PERIPHERAL_GESTURAL_INPUT = 0x0522,

        // Imaging Major Class
        IMAGING_UNCATEGORIZED = 0x0600,
        IMAGING_DISPLAY = 0x0610,
        IMAGING_CAMERA = 0x0620,
        IMAGING_SCANNER = 0x0640,
        IMAGING_PRINTER = 0x0680,

        // Wearable Major Class
        WEARABLE_UNCATEGORIZED = 0x0700,
        WEARABLE_WRIST_WATCH = 0x0704,
        WEARABLE_PAGER = 0x0708,
        WEARABLE_JACKET = 0x070C,
        WEARABLE_HELMET = 0x0710,
        WEARABLE_GLASSES = 0x0714,

        // Minor Device Class field - Toy Major Class
        TOY_UNCATEGORIZED = 0x0800,
        TOY_ROBOT = 0x0804,
        TOY_VEHICLE = 0x0808,
        TOY_DOLL_ACTION_FIGURE = 0x080C,
        TOY_CONTROLLER = 0x0810,
        TOY_GAME = 0x0814,

        // Minor Device Class field - Health
        HEALTH_UNCATEGORIZED = 0x0900,
        HEALTH_BLOOD_PRESSURE = 0x0904,
        HEALTH_THERMOMETER = 0x0908,
        HEALTH_WEIGHING = 0x090C,
        HEALTH_GLUCOSE = 0x0910,
        HEALTH_PULSE_OXIMETER = 0x0914,
        HEALTH_PULSE_RATE = 0x0918,
        HEALTH_DATA_DISPLAY = 0x091C,
        HEALTH_STEP_COUNTER = 0x0920,
        HEALTH_BODY_COMPOSITION_ANALYZER = 0x0924,
        HEALTH_PEAK_FLOW_MONITOR = 0x0928,
        HEALTH_MEDICATION_MONITOR = 0x092C,
        HEALTH_KNEE_PROSTHESIS = 0x0930,
        HEALTH_ANKLE_PROSTHESIS = 0x0934,
        HEALTH_GENERIC_HEALTH_MANAGER = 0x0938,
        HEALTH_PERSONAL_MOBILITY_DEVICE = 0x093C,
    }

    /**
     * The enum of a2dp playing state.
     *
     * @since 9
     */
    enum PlayingState {
        STATE_NOT_PLAYING,
        STATE_PLAYING,
    }

    /**
     * The enum of profile id.
     *
     * @since 9
     */
    enum ProfileId {
        /**
         * @since 9
         */
        PROFILE_A2DP_SOURCE = 1,

        /**
         * @since 9
         */
        PROFILE_HANDS_FREE_AUDIO_GATEWAY = 4,

        /**
         * @since 9
         */
        PROFILE_HID_HOST = 6,

        /**
         * @since 9
         */
        PROFILE_PAN_NETWORK = 7,
    }
}

export default bluetoothManager;