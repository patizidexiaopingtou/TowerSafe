/*
 * Copyright (C) 2021-2022 Huawei Device Co., Ltd.
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
 * Provides methods to operate or manage Wi-Fi.
 *
 * @since 6
 * @import import wifi from '@ohos.wifi';
 */
declare namespace wifi {
    /**
     * Enables Wi-Fi.
     *
     * @returns Returns {@code true} if the operation is successful, returns {@code false} otherwise.
     *
     * @since 6
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.enableWifi
     */
    function enableWifi(): boolean;

    /**
     * Disables Wi-Fi.
     *
     * @returns Returns {@code true} if the operation is successful, returns {@code false} otherwise.
     *
     * @since 6
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.disableWifi
     */
    function disableWifi(): boolean;

    /**
     * Queries the Wi-Fi status
     *
     * @returns Returns {@code true} if the Wi-Fi is active, returns {@code false} otherwise.
     *
     * @since 6
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.isWifiActive
     */
    function isWifiActive(): boolean;

    /**
     * Scans Wi-Fi hotspot.
     *
     * <p>This API works in asynchronous mode.</p>
     *
     * @returns Returns {@code true} if the scanning is successful, returns {@code false} otherwise.
     *
     * @since 6
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.scan
     */
    function scan(): boolean;

    /**
     * Obtains the hotspot information that scanned.
     *
     * @returns Returns information about scanned Wi-Fi hotspot if any.
     *
     * @since 6
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO and (ohos.permission.GET_WIFI_PEERS_MAC or ohos.permission.LOCATION)
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getScanResults
     */
    function getScanInfos(): Promise<Array<WifiScanInfo>>;
    function getScanInfos(callback: AsyncCallback<Array<WifiScanInfo>>): void;

    /**
     * Adds Wi-Fi connection configuration to the device.
     *
     * <p>The configuration will be updated when the configuration is added.</p>
     *
     * @param config Indicates the device configuration for connection to the Wi-Fi network.
     * @returns Returns {@code networkId} if the configuration is added; returns {@code -1} otherwise.
     *
     * @since 6
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.SET_WIFI_CONFIG
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.addDeviceConfig
     */
    function addDeviceConfig(config: WifiDeviceConfig): Promise<number>;
    function addDeviceConfig(config: WifiDeviceConfig, callback: AsyncCallback<number>): void;

    /**
     * Adds a specified untrusted hotspot configuration.
     *
     * <p>This method adds one configuration at a time. After this configuration is added,
     *     your device will determine whether to connect to the hotspot.
     *
     * @returns Returns {@code true} if the untrusted hotspot configuration is added, returns {@code false} otherwise.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.addCandidateConfig
     */
     function addUntrustedConfig(config: WifiDeviceConfig): Promise<boolean>;
     function addUntrustedConfig(config: WifiDeviceConfig, callback: AsyncCallback<boolean>): void;
 
     /**
      * Removes a specified untrusted hotspot configuration.
      *
      * <p>This method removes one configuration at a time.
      *
      * @returns Returns {@code true} if the untrusted hotspot configuration is removed, returns {@code false} otherwise.
      * @since 7
      * @syscap SystemCapability.Communication.WiFi.STA
      * @permission ohos.permission.SET_WIFI_INFO
      * @deprecated since 9
      * @useinstead ohos.wifiManager/wifiManager.removeCandidateConfig
      */
     function removeUntrustedConfig(config: WifiDeviceConfig): Promise<boolean>;
     function removeUntrustedConfig(config: WifiDeviceConfig, callback: AsyncCallback<boolean>): void;

    /**
     * Connects to Wi-Fi network.
     *
     * @param networkId ID of the connected network.
     * @returns Returns {@code true} if the network connection is successful, returns {@code false} otherwise.
     *
     * @since 6
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.connectToNetwork
     */
    function connectToNetwork(networkId: number): boolean;

    /**
     * Connects to Wi-Fi network.
     *
     * @param config Indicates the device configuration for connection to the Wi-Fi network.
     * @returns Returns {@code true} if the network connection is successful, returns {@code false} otherwise.
     *
     * @since 6
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.SET_WIFI_CONFIG and
     * ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.connectToDevice
     */
    function connectToDevice(config: WifiDeviceConfig): boolean;

    /**
     * Disconnect Wi-Fi network.
     *
     * @returns Returns {@code true} for disconnecting network success, returns {@code false} otherwise.
     *
     * @since 6
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.disconnect
     */
    function disconnect(): boolean;

    /**
     * Calculates the Wi-Fi signal level based on the Wi-Fi RSSI and frequency band.
     *
     * @param rssi Indicates the Wi-Fi RSSI.
     * @band Indicates the Wi-Fi frequency band.
     * @returns Returns Wi-Fi signal level ranging from 0 to 4.
     *
     * @since 6
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getSignalLevel
     */
    function getSignalLevel(rssi: number, band: number): number;

    /**
     * Obtains information about a Wi-Fi connection.
     *
     * @returns Returns the Wi-Fi connection information.
     * @since 6
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getLinkedInfo
     */
    function getLinkedInfo(): Promise<WifiLinkedInfo>;
    function getLinkedInfo(callback: AsyncCallback<WifiLinkedInfo>): void;

    /**
     * Checks whether a Wi-Fi connection has been set up.
     *
     * @returns Returns {@code true} if a Wi-Fi connection has been set up, returns {@code false} otherwise.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.isConnected
     */
    function isConnected(): boolean;

    /**
     * Obtains the features supported by this device.
     *
     * <p>To check whether this device supports a specified feature.
     *
     * @returns Returns the features supported by this device.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.Core
     * @permission ohos.permission.GET_WIFI_INFO
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getSupportedFeatures
     */
    function getSupportedFeatures(): number;

    /**
     * Checks whether this device supports a specified feature.
     *
     * @param featureId Indicates the ID of the feature.
     * @returns Returns {@code true} if this device supports the specified feature, returns {@code false} otherwise.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.Core
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.isFeatureSupported
     */
    function isFeatureSupported(featureId: number): boolean;

    /**
     * Obtains the MAC address of a Wi-Fi device. Wi-Fi must be enabled.
     *
     * <p>The MAC address is unique and cannot be changed.
     *
     * @returns Returns the MAC address of the Wi-Fi device.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_LOCAL_MAC and ohos.permission.GET_WIFI_INFO
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getDeviceMacAddress
     */
    function getDeviceMacAddress(): string[];

    /**
     * Obtains the IP information of a Wi-Fi connection.
     *
     * <p>The IP information includes the host IP address, gateway address, and DNS information.
     *
     * @returns Returns the IP information of the Wi-Fi connection.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getIpInfo
     */
    function getIpInfo(): IpInfo;

    /**
     * Obtains the country code of this device.
     *
     * @returns Returns the country code of this device.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.Core
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getCountryCode
     */
    function getCountryCode(): string;

    /**
     * Re-associate to current network.
     *
     * @returns {@code true} if the Wi-Fi network is re-associate successfully.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.reassociate
     */
    function reassociate(): boolean;

    /**
     * Re-connects to current network.
     *
     * @returns {@code true} if the Wi-Fi network is re-connect successfully.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.reconnect
     */
    function reconnect(): boolean;

    /**
     * Obtains the list of all existing Wi-Fi configurations.
     *
     * <p>You can obtain only the Wi-Fi configurations you created on your own application.
     *
     * @returns Returns the list of all existing Wi-Fi configurations you created on your application.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION and ohos.permission.GET_WIFI_CONFIG
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getDeviceConfigs
     */
    function getDeviceConfigs(): Array<WifiDeviceConfig>;

    /**
     * Updates the specified Wi-Fi configuration.
     *
     * @param config Indicates the Wi-Fi configuration to update.
     *
     * @returns Returns the network ID in the updated Wi-Fi configuration if the update is successful;
     *     returns {@code -1} if the specified Wi-Fi configuration is not contained in the list.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.SET_WIFI_CONFIG
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.updateNetwork
     */
    function updateNetwork(config: WifiDeviceConfig): number;

    /**
     * Disables a specified network.
     *
     * <p>The disabled network will not be associated with again.
     *
     * @param netId Identifies the network to disable.
     * @returns Returns {@code true} if the specified network is disabled, returns {@code false} otherwise.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.disableNetwork
     */
    function disableNetwork(netId: number): boolean;

    /**
     * Removes all the saved Wi-Fi configurations.
     *
     * @returns Returns {@code true} if all the saved Wi-Fi configurations are removed;
     *     returns {@code false} otherwise.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.removeAllNetwork
     */
    function removeAllNetwork(): boolean;

    /**
     * Deletes a Wi-Fi network with a specified ID.
     *
     * <p>After a Wi-Fi network is deleted, its configuration will be deleted from the list of Wi-Fi configurations.
     * If the Wi-Fi network is being connected, the connection will be interrupted.
     * The application can only delete Wi-Fi networks it has created.
     *
     * @param id Indicates the ID of the Wi-Fi network,
     *     which can be obtained using the {@link #addDeviceConfig} or {@link #getLinkedInfo} method.
     * @returns Returns {@code true} if the Wi-Fi network is deleted successfully, returns {@code false} otherwise.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.removeDevice
     */
    function removeDevice(id: number): boolean;

    /**
     * Enables a Wi-Fi hotspot.
     *
     * <p>This method is asynchronous. After the Wi-Fi hotspot is enabled, Wi-Fi may be disabled.
     *
     * @returns Returns {@code true} if this method is called successfully, returns {@code false} otherwise.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.MANAGE_WIFI_HOTSPOT
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.enableHotspot
     */
    function enableHotspot(): boolean;

    /**
     * Disables a Wi-Fi hotspot.
     *
     * <p>This method is asynchronous. If Wi-Fi is enabled after the Wi-Fi hotspot is disabled, Wi-Fi may be re-enabled.
     *
     * @returns Returns {@code true} if this method is called successfully, returns {@code false} otherwise.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.MANAGE_WIFI_HOTSPOT
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.disableHotspot
     */
    function disableHotspot(): boolean;

    /**
     * Checks whether a device serving as a Wi-Fi hotspot supports both the 2.4 GHz and 5 GHz Wi-Fi.
     *
     * @returns Returns {@code true} if the method is called successfully, returns {@code false} otherwise.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.MANAGE_WIFI_HOTSPOT
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.isHotspotDualBandSupported
     */
     function isHotspotDualBandSupported(): boolean;

    /**
     * Checks whether Wi-Fi hotspot is active on a device.
     *
     * @returns Returns {@code true} if Wi-Fi hotspot is enabled, returns {@code false} otherwise.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.GET_WIFI_INFO
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.isHotspotActive
     */
    function isHotspotActive(): boolean;

    /**
     * Sets the hotspot for a device.
     *
     * <p>Only OPEN and WPA2 PSK hotspot can be configured.
     *
     * @param config Indicates the Wi-Fi hotspot configuration.
     *     The SSID and {@code securityType} must be available and correct.
     *     If {@code securityType} is not {@code open}, {@code preSharedKey} must be available and correct.
     * @returns Returns {@code true} if the method is called successfully, returns {@code false} otherwise.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.GET_WIFI_CONFIG
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.setHotspotConfig
     */
    function setHotspotConfig(config: HotspotConfig): boolean;

    /**
     * Obtains the Wi-Fi hotspot configuration.
     *
     * @returns Returns the configuration of an existing or enabled Wi-Fi hotspot.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.GET_WIFI_CONFIG
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getHotspotConfig
     */
    function getHotspotConfig(): HotspotConfig;

    /**
     * Obtains the list of clients that are connected to a Wi-Fi hotspot.
     *
     * <p>This method can only be used on a device that serves as a Wi-Fi hotspot.
     *
     * @returns Returns the list of clients that are connected to the Wi-Fi hotspot.
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION and ohos.permission.MANAGE_WIFI_HOTSPOT
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getStations
     */
    function getStations(): Array<StationInfo>;

    /**
     * Obtains information about a P2P connection.
     *
     * @returns Returns the P2P connection information.
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getP2pLinkedInfo
     */
    function getP2pLinkedInfo(): Promise<WifiP2pLinkedInfo>;
    function getP2pLinkedInfo(callback: AsyncCallback<WifiP2pLinkedInfo>): void;

    /**
     * Obtains information about the current group.
     *
     * @returns Returns the current group information.
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getCurrentGroup
     */
    function getCurrentGroup(): Promise<WifiP2pGroupInfo>;
    function getCurrentGroup(callback: AsyncCallback<WifiP2pGroupInfo>): void;

    /**
     * Obtains the information about the found devices.
     *
     * @returns Returns the found devices list.
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.getP2pPeerDevices
     */
    function getP2pPeerDevices(): Promise<WifiP2pDevice[]>;
    function getP2pPeerDevices(callback: AsyncCallback<WifiP2pDevice[]>): void;

    /**
     * Creates a P2P group.
     *
     * @param config Indicates the configuration for creating a group.
     * @returns Returns {@code true} if the operation is successful, returns {@code false} otherwise.
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.createGroup
     */
    function createGroup(config: WifiP2PConfig): boolean;

    /**
     * Removes a P2P group.
     *
     * @returns Returns {@code true} if the operation is successful, returns {@code false} otherwise.
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.removeGroup
     */
    function removeGroup(): boolean;

    /**
     * Initiates a P2P connection to a device with the specified configuration.
     *
     * @param config Indicates the configuration for connecting to a specific group.
     * @returns Returns {@code true} if the operation is successful, returns {@code false} otherwise.
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.p2pConnect
     */
    function p2pConnect(config: WifiP2PConfig): boolean;

    /**
     * Canceling a P2P connection.
     *
     * @returns Returns {@code true} if the operation is successful, returns {@code false} otherwise.
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.p2pCancelConnect
     */
    function p2pCancelConnect(): boolean;

    /**
     * Discover Wi-Fi P2P devices.
     *
     * @returns Returns {@code true} if the operation is successful, returns {@code false} otherwise.
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.startDiscoverDevices
     */
    function startDiscoverDevices(): boolean;

    /**
     * Stops discovering Wi-Fi P2P devices.
     *
     * @returns Returns {@code true} if the operation is successful, returns {@code false} otherwise.
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.stopDiscoverDevices
     */
    function stopDiscoverDevices(): boolean;

    /**
     * Deletes the persistent P2P group with the specified network ID.
     *
     * @param netId Indicates the network ID of the group to be deleted.
     * @returns Returns {@code true} if the operation is successful, returns {@code false} otherwise.
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.deletePersistentGroup
     */
    function deletePersistentGroup(netId: number): boolean;

    /**
     * Sets the name of the Wi-Fi P2P device.
     *
     * @param devName Indicates the name to be set.
     * @returns Returns {@code true} if the operation is successful, returns {@code false} otherwise.
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.setDeviceName
     */
    function setDeviceName(devName: string): boolean;

    /**
     * Subscribe Wi-Fi status change events.
     *
     * @returns Returns 0: inactive, 1: active, 2: activating, 3: deactivating
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:wifiStateChange
     */
    function on(type: "wifiStateChange", callback: Callback<number>): void;

    /**
     * Unsubscribe Wi-Fi status change events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     *
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:wifiStateChange
     */
    function off(type: "wifiStateChange", callback?: Callback<number>): void;

    /**
     * Subscribe Wi-Fi connection change events.
     *
     * @returns Returns 0: disconnected, 1: connected
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:wifiConnectionChange
     */
    function on(type: "wifiConnectionChange", callback: Callback<number>): void;

    /**
     * Unsubscribe Wi-Fi connection change events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     *
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:wifiConnectionChange
     */
    function off(type: "wifiConnectionChange", callback?: Callback<number>): void;

    /**
     * Subscribe Wi-Fi scan status change events.
     *
     * @returns Returns 0: scan fail, 1: scan success
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:wifiScanStateChange
     */
    function on(type: "wifiScanStateChange", callback: Callback<number>): void;

    /**
     * Unsubscribe Wi-Fi scan status change events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     *
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:wifiScanStateChange
     */
    function off(type: "wifiScanStateChange", callback?: Callback<number>): void;

    /**
     * Subscribe Wi-Fi rssi change events.
     *
     * @returns Returns RSSI value in dBm
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:wifiRssiChange
     */
    function on(type: "wifiRssiChange", callback: Callback<number>): void;

    /**
     * Unsubscribe Wi-Fi rssi change events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     *
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:wifiRssiChange
     */
    function off(type: "wifiRssiChange", callback?: Callback<number>): void;

    /**
     * Subscribe Wi-Fi stream change events.
     *
     * @returns Returns 0: stream none, 1: stream down, 2: stream up, 3: stream bidirectional
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:streamChange
     */
     function on(type: "streamChange", callback: Callback<number>): void;

     /**
      * Unsubscribe Wi-Fi stream change events.
      *
      * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
      *
      * @since 7
      * @syscap SystemCapability.Communication.WiFi.STA
      * @permission ohos.permission.MANAGE_WIFI_CONNECTION
      * @systemapi Hide this for inner system use.
      * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:streamChange
      */
     function off(type: "streamChange", callback?: Callback<number>): void;

    /**
     * Subscribe Wi-Fi hotspot state change events.
     *
     * @returns Returns 0: inactive, 1: active, 2: activating, 3: deactivating
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:hotspotStateChange
     */
    function on(type: "hotspotStateChange", callback: Callback<number>): void;

    /**
     * Unsubscribe Wi-Fi hotspot state change events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     *
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:hotspotStateChange
     */
    function off(type: "hotspotStateChange", callback?: Callback<number>): void;

    /**
     * Subscribe Wi-Fi hotspot sta join events.
     *
     * @returns Returns StationInfo
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.MANAGE_WIFI_HOTSPOT
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:hotspotStaJoin
     */
    function on(type: "hotspotStaJoin", callback: Callback<StationInfo>): void;

    /**
     * Unsubscribe Wi-Fi hotspot sta join events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     *
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.MANAGE_WIFI_HOTSPOT
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:hotspotStaJoin
     */
    function off(type: "hotspotStaJoin", callback?: Callback<StationInfo>): void;

    /**
     * Subscribe Wi-Fi hotspot sta leave events.
     *
     * @returns Returns {@link #StationInfo} object
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.MANAGE_WIFI_HOTSPOT
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:hotspotStaLeave
     */
    function on(type: "hotspotStaLeave", callback: Callback<StationInfo>): void;

    /**
     * Unsubscribe Wi-Fi hotspot sta leave events.
     *
     * @returns Returns {@link #StationInfo} object
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.MANAGE_WIFI_HOTSPOT
     * @systemapi Hide this for inner system use.
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:hotspotStaLeave
     */
    function off(type: "hotspotStaLeave", callback?: Callback<StationInfo>): void;

    /**
     * Subscribe P2P status change events.
     *
     * @returns Returns 1: idle, 2: starting, 3:started, 4: closing, 5: closed
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:p2pStateChange
     */
    function on(type: "p2pStateChange", callback: Callback<number>): void;

    /**
     * Unsubscribe P2P status change events.
     *
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:p2pStateChange
     */
    function off(type: "p2pStateChange", callback?: Callback<number>): void;

    /**
     * Subscribe P2P connection change events.
     *
     * @returns Returns WifiP2pLinkedInfo
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:p2pConnectionChange
     */
    function on(type: "p2pConnectionChange", callback: Callback<WifiP2pLinkedInfo>): void;

    /**
     * Unsubscribe P2P connection change events.
     *
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:p2pConnectionChange
     */
    function off(type: "p2pConnectionChange", callback?: Callback<WifiP2pLinkedInfo>): void;

    /**
     * Subscribe P2P local device change events.
     *
     * @returns Returns WifiP2pDevice
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:p2pDeviceChange
     */
    function on(type: "p2pDeviceChange", callback: Callback<WifiP2pDevice>): void;

    /**
     * Unsubscribe P2P local device change events.
     *
     * @returns Returns WifiP2pDevice
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:p2pDeviceChange
     */
    function off(type: "p2pDeviceChange", callback?: Callback<WifiP2pDevice>): void;

    /**
     * Subscribe P2P peer device change events.
     *
     * @returns Returns WifiP2pDevice[]
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:p2pPeerDeviceChange
     */
    function on(type: "p2pPeerDeviceChange", callback: Callback<WifiP2pDevice[]>): void;

    /**
     * Unsubscribe P2P peer device change events.
     *
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:p2pPeerDeviceChange
     */
    function off(type: "p2pPeerDeviceChange", callback?: Callback<WifiP2pDevice[]>): void;

    /**
     * Subscribe P2P persistent group change events.
     *
     * @returns Returns void
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:p2pPersistentGroupChange
     */
    function on(type: "p2pPersistentGroupChange", callback: Callback<void>): void;

    /**
     * Unsubscribe P2P persistent group change events.
     *
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:p2pPersistentGroupChange
     */
    function off(type: "p2pPersistentGroupChange", callback?: Callback<void>): void;

    /**
     * Subscribe P2P discovery events.
     *
     * @returns Returns 0: initial state, 1: discovery succeeded
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.on#event:p2pDiscoveryChange
     */
    function on(type: "p2pDiscoveryChange", callback: Callback<number>): void;

    /**
     * Unsubscribe P2P discovery events.
     *
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.off#event:p2pDiscoveryChange
     */
    function off(type: "p2pDiscoveryChange", callback?: Callback<number>): void;

    /**
     * Wi-Fi device configuration information.
     *
     * @since 6
     * @syscap SystemCapability.Communication.WiFi.STA
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.WifiDeviceConfig
     */
    interface WifiDeviceConfig {
        /** Wi-Fi SSID: the maximum length is 32 */
        ssid: string;

        /** Wi-Fi bssid(MAC): the length is 6 */
        bssid: string;

        /** Wi-Fi key: maximum length is 64 */
        preSharedKey: string;

        /** Hide SSID or not, false(default): not hide */
        isHiddenSsid: boolean;

        /** Security type: reference definition of WifiSecurityType */
        securityType: WifiSecurityType;

        /** The UID of the Wi-Fi configuration creator */
        /* @systemapi */
        creatorUid: number;

        /** Disable reason */
        /* @systemapi */
        disableReason: number;

        /** Allocated networkId */
        /* @systemapi */
        netId: number;

        /** Random mac type */
        /* @systemapi */
        randomMacType: number;

        /** Random mac address, the length is 6 */
        /* @systemapi */
        randomMacAddr: string;

        /** IP Type */
        /* @systemapi */
        ipType: IpType;

        /** IP config of static */
        /* @systemapi */
        staticIp: IpConfig;
    }

    /**
     * Wi-Fi IP configuration information.
     *
     * @since 7
     * @systemapi Hide this for inner system use.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.IpConfig
     */
    interface IpConfig {
        ipAddress: number;
        gateway: number;
        dnsServers: number[];
        domains: Array<string>;
    }

    /**
     * Describes the scanned Wi-Fi information.
     *
     * @since 6
     * @syscap SystemCapability.Communication.WiFi.STA
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.WifiScanInfo
     */
    interface WifiScanInfo {
        /** Wi-Fi SSID: the maximum length is 32 */
        ssid: string;

        /** Wi-Fi bssid(MAC): the length is 6 */
        bssid: string;

        /** Hotspot capability */
        capabilities: string;

        /** Security type: reference definition of WifiSecurityType */
        securityType: WifiSecurityType;

        /** Received signal strength indicator (RSSI) */
        rssi: number;

        /** Frequency band, 1: 2.4G, 2: 5G */
        band: number;

        /** Frequency */
        frequency: number;

        /** Channel width */
        channelWidth: number;

        /** Time stamp */
        timestamp: number;
    }

    /**
     * Describes the wifi security type.
     *
     * @since 6
     * @syscap SystemCapability.Communication.WiFi.Core
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.WifiSecurityType
     */
    enum WifiSecurityType {
        /** Invalid security type */
        WIFI_SEC_TYPE_INVALID = 0,

        /** Open */
        WIFI_SEC_TYPE_OPEN = 1,

        /** Wired Equivalent Privacy (WEP) */
        WIFI_SEC_TYPE_WEP = 2,

        /** Pre-shared key (PSK) */
        WIFI_SEC_TYPE_PSK = 3,

        /** Simultaneous Authentication of Equals (SAE) */
        WIFI_SEC_TYPE_SAE = 4,
    }

    /**
     * Wi-Fi connection information.
     *
     * @since 6
     * @syscap SystemCapability.Communication.WiFi.STA
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.WifiLinkedInfo
     */
    interface WifiLinkedInfo {
        /** The SSID of the Wi-Fi hotspot */
        ssid: string;

        /** The BSSID of the Wi-Fi hotspot */
        bssid: string;

        /** The ID(uniquely identifies) of a Wi-Fi connection. */
        /* @systemapi */
        networkId: number;

        /** The RSSI(dBm) of a Wi-Fi access point. */
        rssi: number;

        /** The frequency band of a Wi-Fi access point. */
        band: number;

        /** The speed of a Wi-Fi access point. */
        linkSpeed: number;

        /** The frequency of a Wi-Fi access point. */
        frequency: number;

        /** Whether the SSID of the access point (AP) of this Wi-Fi connection is hidden. */
        isHidden: boolean;

        /** Whether this Wi-Fi connection restricts the data volume. */
        isRestricted: boolean;

        /** The load value of this Wi-Fi connection. A greater value indicates a higher load. */
        /* @systemapi */
        chload: number;

        /** The signal-to-noise ratio (SNR) of this Wi-Fi connection. */
        /* @systemapi */
        snr: number;

        /** The Wi-Fi MAC address of a device. */
        macAddress: string;

        /** The IP address of this Wi-Fi connection. */
        ipAddress: number;

        /** The state of the supplicant of this Wi-Fi connection. */
        /* @systemapi */
        suppState: SuppState;

        /** The state of this Wi-Fi connection. */
        connState: ConnState;
    }

    /**
     * Wi-Fi IP information.
     *
     * @since 7
     * @syscap SystemCapability.Communication.WiFi.STA
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.IpInfo
     */
    interface IpInfo {
        /** The IP address of the Wi-Fi connection */
        ipAddress: number;

        /** The gateway of the Wi-Fi connection */
        gateway: number;

        /** The network mask of the Wi-Fi connection */
        netmask: number;

        /** The primary DNS server IP address of the Wi-Fi connection */
        primaryDns: number;

        /** The secondary DNS server IP address of the Wi-Fi connection */
        secondDns: number;

        /** The DHCP server IP address of the Wi-Fi connection */
        serverIp: number;

        /** The IP address lease duration of the Wi-Fi connection */
        leaseDuration: number;
    }

    /**
     * Wi-Fi hotspot configuration information.
     *
     * @since 7
     * @systemapi Hide this for inner system use.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.HotspotConfig
     */
    interface HotspotConfig {
        /** The SSID of the Wi-Fi hotspot */
        ssid: string;

        /** The encryption mode of the Wi-Fi hotspot */
        securityType: WifiSecurityType;

        /** The frequency band of the Wi-Fi hotspot */
        band: number;

        /** The password of the Wi-Fi hotspot */
        preSharedKey: string;

        /** The maximum number of connections allowed by the Wi-Fi hotspot */
        maxConn: number;
    }

    /**
     * Wi-Fi station information.
     *
     * @since 7
     * @systemapi Hide this for inner system use.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.StationInfo
     */
    interface StationInfo {
        /** the network name of the Wi-Fi client */
        name: string;

        /** The MAC address of the Wi-Fi client */
        macAddress: string;

        /** The IP address of the Wi-Fi client */
        ipAddress: string;
    }

    /**
     * Wi-Fi IP type enumeration.
     *
     * @since 7
     * @systemapi Hide this for inner system use.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.IpType
     */
     enum IpType {
        /** Use statically configured IP settings */
        STATIC,

        /** Use dynamically configured IP settings */
        DHCP,

        /** No IP details are assigned */
        UNKNOWN,
    }

    /**
     * The state of the supplicant enumeration.
     *
     * @since 6
     * @systemapi Hide this for inner system use.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.SuppState
     */
    export enum SuppState {
        /** The supplicant is not associated with or is disconnected from the AP. */
        DISCONNECTED,

        /** The network interface is disabled. */
        INTERFACE_DISABLED,

        /** The supplicant is disabled. */
        INACTIVE,

        /** The supplicant is scanning for a Wi-Fi connection. */
        SCANNING,

        /** The supplicant is authenticating with a specified AP. */
        AUTHENTICATING,

        /** The supplicant is associating with a specified AP. */
        ASSOCIATING,

        /** The supplicant is associated with a specified AP. */
        ASSOCIATED,

        /** The four-way handshake is ongoing. */
        FOUR_WAY_HANDSHAKE,

        /** The group handshake is ongoing. */
        GROUP_HANDSHAKE,

        /** All authentication is completed. */
        COMPLETED,

        /** Failed to establish a connection to the supplicant. */
        UNINITIALIZED,

        /** The supplicant is in an unknown or invalid state. */
        INVALID
    }

    /**
     * The state of Wi-Fi connection enumeration.
     *
     * @since 6
     * @syscap SystemCapability.Communication.WiFi.STA
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.ConnState
     */
    export enum ConnState {
        /** The device is searching for an available AP. */
        SCANNING,

        /** The Wi-Fi connection is being set up. */
        CONNECTING,

        /** The Wi-Fi connection is being authenticated. */
        AUTHENTICATING,

        /** The IP address of the Wi-Fi connection is being obtained. */
        OBTAINING_IPADDR,

        /** The Wi-Fi connection has been set up. */
        CONNECTED,

        /** The Wi-Fi connection is being torn down. */
        DISCONNECTING,

        /** The Wi-Fi connection has been torn down. */
        DISCONNECTED,

        /** Failed to set up the Wi-Fi connection. */
        UNKNOWN
    }

    /**
     * P2P device information.
     *
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.WifiP2pDevice
     */
    interface WifiP2pDevice {
        /** Device name */
        deviceName: string;

        /** Device mac address */
        deviceAddress: string;

        /** Primary device type */
        primaryDeviceType: string;

        /** Device status */
        deviceStatus: P2pDeviceStatus;

        /** Device group capabilitys */
        groupCapabilitys: number;
    }

    /**
     * P2P config.
     *
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.WifiP2PConfig
     */
    interface WifiP2PConfig {
        /** Device mac address */
        deviceAddress: string;

        /**
         * Group network ID. When creating a group, -1 indicates creates a temporary group,
         * -2: indicates creates a persistent group
         */
        netId: number;

        /* The passphrase of this {@code WifiP2pConfig} instance */
        passphrase: string;

        /** Group name */
        groupName: string;

        /** Group owner band */
        goBand: GroupOwnerBand;
    }

    /**
     * P2P group information.
     *
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.WifiP2pGroupInfo
     */
    interface WifiP2pGroupInfo {
        /** Indicates whether it is group owner */
        isP2pGo: boolean;

        /** Group owner information */
        ownerInfo: WifiP2pDevice;

        /** The group passphrase */
        passphrase: string;

        /** Interface name */
        interface: string;

        /** Group name */
        groupName: string;

        /** Network ID */
        networkId: number;

        /** Frequency */
        frequency: number;

        /** Client list */
        clientDevices: WifiP2pDevice[];

        /** Group owner IP address */
        goIpAddress: string;
    }

    /**
     * P2P connection status.
     *
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.P2pConnectState
     */
    enum P2pConnectState {
        DISCONNECTED = 0,
        CONNECTED = 1,
    }

    /**
     * P2P linked information.
     *
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.WifiP2pLinkedInfo
     */
    interface WifiP2pLinkedInfo {
        /** Connection status */
        connectState: P2pConnectState;

        /** Indicates whether it is group owner */
        isGroupOwner: boolean;

        /** Group owner address */
        groupOwnerAddr: string;
    }

    /**
     * P2P device status.
     *
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.P2pDeviceStatus
     */
    enum P2pDeviceStatus {
        CONNECTED = 0,
        INVITED = 1,
        FAILED = 2,
        AVAILABLE = 3,
        UNAVAILABLE = 4,
    }

    /**
     * P2P group owner band.
     *
     * @since 8
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @deprecated since 9
     * @useinstead ohos.wifiManager/wifiManager.GroupOwnerBand
     */
    enum GroupOwnerBand {
        GO_BAND_AUTO = 0,
        GO_BAND_2GHZ = 1,
        GO_BAND_5GHZ = 2,
    }
}

export default wifi;
