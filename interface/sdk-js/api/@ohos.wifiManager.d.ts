/*
 * Copyright (C) 2022-2023 Huawei Device Co., Ltd.
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
 * @namespace wifiManager
 * @since 9
 */
declare namespace wifiManager {
    /**
     * Enable Wi-Fi.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @throws {BusinessError} 2501003 - Failed for wifi is closing.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     */
    function enableWifi(): void;

    /**
     * Disable Wi-Fi.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @throws {BusinessError} 2501004 - Failed for wifi is opening.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     */
    function disableWifi(): void;

    /**
     * Query the Wi-Fi status
     *
     * @returns Returns {@code true} if the Wi-Fi is active, returns {@code false} otherwise.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function isWifiActive(): boolean;

    /**
     * Scan Wi-Fi hotspot.
     *
     * <p>This API works in asynchronous mode.</p>
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.LOCATION
     */
    function scan(): void;

    /**
     * Obtain the scanned sta list.
     *
     * @returns Returns information about scanned Wi-Fi hotspot if any.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO and (ohos.permission.GET_WIFI_PEERS_MAC or ohos.permission.LOCATION)
     */
    function getScanResults(): Promise<Array<WifiScanInfo>>;
    function getScanResults(callback: AsyncCallback<Array<WifiScanInfo>>): void;

    /**
     * Obtain the scanned results.
     *
     * @returns Returns information about scanned Wi-Fi hotspot if any.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO and (ohos.permission.GET_WIFI_PEERS_MAC or ohos.permission.LOCATION)
     */
    function getScanResultsSync(): Array<WifiScanInfo>;

    /**
     * Add Wi-Fi connection configuration to the device.
     *
     * <p>The configuration will be updated when the configuration is added.</p>
     *
     * @param config Indicates the device configuration for connection to the Wi-Fi network.
     * @returns Returns {@code networkId} if the configuration is added; returns {@code -1} otherwise.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.SET_WIFI_CONFIG
     * @systemapi Hide this for inner system use.
     */
    function addDeviceConfig(config: WifiDeviceConfig): Promise<number>;
    function addDeviceConfig(config: WifiDeviceConfig, callback: AsyncCallback<number>): void;

     /**
     * Add a specified candidate hotspot configuration and returns the networkId.
     *
     * <p>This method adds one configuration at a time. After this configuration is added,
     *     your device will determine whether to connect to the hotspot.
     *
     * @param config - candidate config.
     * @returns Returns {@code networkId} if the configuration is added; returns {@code -1} otherwise.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO
     */
     function addCandidateConfig(config: WifiDeviceConfig): Promise<number>;
     function addCandidateConfig(config: WifiDeviceConfig, callback: AsyncCallback<number>): void;

     /**
      * Remove a specified candidate hotspot configuration, only the configuration which is added by ourself is allowed
      * to be removed.
      *
      * @param networkId - Network ID which will be removed.
      * @returns {@code true} if the candidate hotspot configuration is removed, returns {@code false} otherwise.
      *
      * @since 9
      * @throws {BusinessError} 201 - Permission denied.
      * @throws {BusinessError} 401 - Invalid parameters.
      * @throws {BusinessError} 801 - Capability not supported.
      * @throws {BusinessError} 2501000 - Operation failed.
      * @syscap SystemCapability.Communication.WiFi.STA
      * @permission ohos.permission.SET_WIFI_INFO
      */
     function removeCandidateConfig(networkId: number): Promise<void>;
     function removeCandidateConfig(networkId: number, callback: AsyncCallback<void>): void;

    /**
     * Obtain the list of all existed candidate Wi-Fi configurations which added by ourself.
     *
     * <p>You can obtain only the Wi-Fi configurations you created on your own application.
     *
     * @returns Returns the list of all existed Wi-Fi configurations you created on your application.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     */
    function getCandidateConfigs(): Array<WifiDeviceConfig>;

    /**
     * Connect to a specified candidate hotspot by networkId, only the configuration which is added by ourself
     * is allowed to be connected.
     *
     * <p>This method connect to a configuration at a time.
     *
     * @param networkId - Network ID which will be connected.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @throws {BusinessError} 2501001 - Wifi is closed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO
     */
     function connectToCandidateConfig(networkId: number): void;

    /**
     * Connect to Wi-Fi hotspot by networkId.
     *
     * @param networkId ID of the connected network.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @throws {BusinessError} 2501001 - Wifi is closed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     */
    function connectToNetwork(networkId: number): void;

    /**
     * Connect to Wi-Fi hotspot by WifiDeviceConfig.
     *
     * @param config Indicates the device configuration for connection to the Wi-Fi hotspot.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @throws {BusinessError} 2501001 - Wifi is closed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.SET_WIFI_CONFIG and
     * ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     */
    function connectToDevice(config: WifiDeviceConfig): void;

    /**
     * Disconnect connection between sta and Wi-Fi hotspot.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     */
    function disconnect(): void;

    /**
     * Calculate the Wi-Fi signal level based on the Wi-Fi RSSI and frequency band.
     *
     * @param rssi Indicates the Wi-Fi RSSI.
     * @param band Indicates the Wi-Fi frequency band.
     * @returns Returns Wi-Fi signal level ranging from 0 to 4.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function getSignalLevel(rssi: number, band: number): number;

    /**
     * Obtain connection information about the Wi-Fi connection.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @throws {BusinessError} 2501001 - Wifi is closed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function getLinkedInfo(): Promise<WifiLinkedInfo>;
    function getLinkedInfo(callback: AsyncCallback<WifiLinkedInfo>): void;

    /**
     * Check whether the Wi-Fi connection has been set up.
     *
     * @returns Returns {@code true} if a Wi-Fi connection has been set up, returns {@code false} otherwise.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function isConnected(): boolean;

    /**
     * Obtain the features supported by the device.
     *
     * <p>To check whether this device supports a specified feature.
     *
     * @returns Returns the features supported by this device.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2401000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.Core
     * @permission ohos.permission.GET_WIFI_INFO
     * @systemapi Hide this for inner system use.
     */
    function getSupportedFeatures(): number;

    /**
     * Check whether the device supports a specified feature.
     *
     * @param featureId Indicates the ID of the feature.
     * @returns Returns {@code true} if this device supports the specified feature, returns {@code false} otherwise.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2401000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.Core
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function isFeatureSupported(featureId: number): boolean;

    /**
     * Obtain the MAC address of a Wi-Fi device. Wi-Fi must be enabled.
     *
     * <p>The MAC address is unique and cannot be changed.
     *
     * @returns Returns the MAC address of the Wi-Fi device.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @throws {BusinessError} 2501001 - Wifi is closed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_LOCAL_MAC and ohos.permission.GET_WIFI_INFO
     * @systemapi Hide this for inner system use.
     */
    function getDeviceMacAddress(): string[];

    /**
     * Obtain the IP information of the Wi-Fi connection.
     *
     * <p>The IP information includes the host IP address, gateway address, and DNS information.
     *
     * @returns Returns the IP information of the Wi-Fi connection.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function getIpInfo(): IpInfo;

    /**
     * Obtain the country code of the device.
     *
     * @returns Returns the country code of this device.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2401000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.Core
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function getCountryCode(): string;

    /**
     * Re-associate to current network.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @throws {BusinessError} 2501001 - Wifi is closed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     */
    function reassociate(): void;

    /**
     * Re-connect to current network.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @throws {BusinessError} 2501001 - Wifi is closed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     */
    function reconnect(): void;

    /**
     * Obtain the list of all existed Wi-Fi configurations.
     *
     * @returns Returns the list of all existing Wi-Fi configurations you created on your application.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION and ohos.permission.GET_WIFI_CONFIG
     * @systemapi Hide this for inner system use.
     */
    function getDeviceConfigs(): Array<WifiDeviceConfig>;

    /**
     * Update the specified Wi-Fi configuration.
     *
     * @param config Indicates the Wi-Fi configuration to update.
     *
     * @returns Returns the network ID in the updated Wi-Fi configuration if the update is successful;
     *     returns {@code -1} if the specified Wi-Fi configuration is not contained in the list.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.SET_WIFI_CONFIG
     * @systemapi Hide this for inner system use.
     */
    function updateNetwork(config: WifiDeviceConfig): number;

    /**
     * Disable the specified DeviceConfig by networkId.
     *
     * <p>The disabled DeviceConfig will not be associated with again.
     *
     * @param networkId Identifies the network to disable.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     */
    function disableNetwork(netId: number): void;

    /**
     * Remove all the saved Wi-Fi configurations.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     */
    function removeAllNetwork(): void;

    /**
     * Remove a Wi-Fi DeviceConfig with networkId.
     *
     * <p>After a Wi-Fi DeviceConfig is removed, its configuration will be deleted from the list of Wi-Fi configurations.
     * If the Wi-Fi DeviceConfig is being connected, the connection will be interrupted.
     * The application can only delete Wi-Fi DeviceConfig it has created.
     *
     * @param networkId indicate the ID of the Wi-Fi DeviceConfig,
     *     which can be obtained using the {@link #addDeviceConfig} or {@link #getLinkedInfo} method.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     */
    function removeDevice(id: number): void;

    /**
     * Enable Wi-Fi hotspot function.
     *
     * <p>This method is asynchronous. After the Wi-Fi hotspot is enabled, Wi-Fi may be disabled.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2601000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.MANAGE_WIFI_HOTSPOT
     * @systemapi Hide this for inner system use.
     */
    function enableHotspot(): void;

    /**
     * Disable Wi-Fi hotspot function.
     *
     * <p>This method is asynchronous. If Wi-Fi is enabled after the Wi-Fi hotspot is disabled, Wi-Fi may be re-enabled.
     *
     * @returns Returns {@code true} if this method is called successfully, returns {@code false} otherwise.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2601000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.MANAGE_WIFI_HOTSPOT
     * @systemapi Hide this for inner system use.
     */
    function disableHotspot(): void;

    /**
     * Check whether a device serving as a Wi-Fi hotspot supports both the 2.4 GHz and 5 GHz Wi-Fi.
     *
     * @returns Returns {@code true} if the method is called successfully, returns {@code false} otherwise.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2601000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.MANAGE_WIFI_HOTSPOT
     * @systemapi Hide this for inner system use.
     */
     function isHotspotDualBandSupported(): boolean;

    /**
     * Check whether Wi-Fi hotspot is active on a device.
     *
     * @returns Returns {@code true} if Wi-Fi hotspot is enabled, returns {@code false} otherwise.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2601000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.GET_WIFI_INFO
     * @systemapi Hide this for inner system use.
     */
    function isHotspotActive(): boolean;

    /**
     * Set the hotspot configuration for the device.
     *
     * @param config Indicates the Wi-Fi hotspot configuration.
     *     The SSID and {@code securityType} must be available and correct.
     *     If {@code securityType} is not {@code open}, {@code preSharedKey} must be available and correct.
     * @returns Returns {@code true} if the method is called successfully, returns {@code false} otherwise.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2601000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.GET_WIFI_CONFIG
     * @systemapi Hide this for inner system use.
     */
    function setHotspotConfig(config: HotspotConfig): void;

    /**
     * Obtain the Wi-Fi hotspot configuration.
     *
     * @returns Returns the configuration of an existed or enabled Wi-Fi hotspot.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2601000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.GET_WIFI_CONFIG
     * @systemapi Hide this for inner system use.
     */
    function getHotspotConfig(): HotspotConfig;

    /**
     * Obtain the list of stations that are connected to the Wi-Fi hotspot.
     *
     * <p>This method can only be used on a device that serves as a Wi-Fi hotspot.
     *
     * @returns Returns the list of clients that are connected to the Wi-Fi hotspot.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2601000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION and ohos.permission.MANAGE_WIFI_HOTSPOT
     * @systemapi Hide this for inner system use.
     */
    function getStations(): Array<StationInfo>;

    /**
     * Obtain information about the P2P connection.
     *
     * @returns Returns the P2P connection information.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function getP2pLinkedInfo(): Promise<WifiP2pLinkedInfo>;
    function getP2pLinkedInfo(callback: AsyncCallback<WifiP2pLinkedInfo>): void;

    /**
     * Obtain information about the current p2p group.
     *
     * @returns Returns the current group information.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     */
    function getCurrentGroup(): Promise<WifiP2pGroupInfo>;
    function getCurrentGroup(callback: AsyncCallback<WifiP2pGroupInfo>): void;

    /**
     * Obtain the information about the found devices.
     *
     * @returns Returns the found devices list.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     */
    function getP2pPeerDevices(): Promise<WifiP2pDevice[]>;
    function getP2pPeerDevices(callback: AsyncCallback<WifiP2pDevice[]>): void;

    /**
     * Obtain the information about own device information. 
     *
     * <p> deviceAddress in the returned WifiP2pDevice will be set "00:00:00:00:00:00",
	 * if ohos.permission.GET_WIFI_LOCAL_MAC is not granted.
     *
     * @returns Returns the information about own device info.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.GET_WIFI_CONFIG
     */
    function getP2pLocalDevice(): Promise<WifiP2pDevice>;
    function getP2pLocalDevice(callback: AsyncCallback<WifiP2pDevice>): void;

    /**
     * Create a P2P group.
     *
     * @param config Indicates the configuration for a group.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function createGroup(config: WifiP2PConfig): void;

    /**
     * Remove a P2P group.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function removeGroup(): void;

    /**
     * Initiate a P2P connection to a device with the specified configuration.
     *
     * @param config Indicates the configuration for connecting to a specific group.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     */
    function p2pConnect(config: WifiP2PConfig): void;

    /**
     * Stop an ongoing p2p connection that is being established.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function p2pCancelConnect(): void;

    /**
     * Start discover Wi-Fi P2P devices.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     */
    function startDiscoverDevices(): void;

    /**
     * Stop discover Wi-Fi P2P devices.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function stopDiscoverDevices(): void;

    /**
     * Delete the persistent P2P group with the specified network ID.
     *
     * @param netId Indicates the network ID of the group to be deleted.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     */
    function deletePersistentGroup(netId: number): void;

    /**
     * Obtain information about the groups.
     *
     * @returns Returns the groups information.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     * @systemapi Hide this for inner system use.
     */
    function getP2pGroups(): Promise<Array<WifiP2pGroupInfo>>;
    function getP2pGroups(callback: AsyncCallback<Array<WifiP2pGroupInfo>>): void;

    /**
     * Set the name of the Wi-Fi P2P device.
     *
     * @param devName Indicate the name to be set.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.SET_WIFI_INFO and ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     */
    function setDeviceName(devName: string): void;

    /**
     * Subscribe Wi-Fi status change events.
     *
     * @returns Returns 0: inactive, 1: active, 2: activating, 3: de-activating
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function on(type: "wifiStateChange", callback: Callback<number>): void;

    /**
     * Unsubscribe Wi-Fi status change events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function off(type: "wifiStateChange", callback?: Callback<number>): void;

    /**
     * Subscribe Wi-Fi connection change events.
     *
     * @returns Returns 0: disconnected, 1: connected
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function on(type: "wifiConnectionChange", callback: Callback<number>): void;

    /**
     * Unsubscribe Wi-Fi connection change events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function off(type: "wifiConnectionChange", callback?: Callback<number>): void;

    /**
     * Subscribe Wi-Fi scan status change events.
     *
     * @returns Returns 0: scan fail, 1: scan success
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function on(type: "wifiScanStateChange", callback: Callback<number>): void;

    /**
     * Unsubscribe Wi-Fi scan status change events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function off(type: "wifiScanStateChange", callback?: Callback<number>): void;

    /**
     * Subscribe Wi-Fi rssi change events.
     *
     * @returns Returns RSSI value in dBm
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function on(type: "wifiRssiChange", callback: Callback<number>): void;

    /**
     * Unsubscribe Wi-Fi rssi change events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function off(type: "wifiRssiChange", callback?: Callback<number>): void;

    /**
     * Subscribe Wi-Fi stream change events.
     *
     * @returns Returns 0: stream none, 1: stream down, 2: stream up, 3: stream bidirectional
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.MANAGE_WIFI_CONNECTION
     * @systemapi Hide this for inner system use.
     */
     function on(type: "streamChange", callback: Callback<number>): void;

     /**
      * Unsubscribe Wi-Fi stream change events.
      *
      * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
      *
      * @since 9
      * @throws {BusinessError} 201 - Permission denied.
      * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
      * @throws {BusinessError} 401 - Invalid parameters.
      * @throws {BusinessError} 801 - Capability not supported.
      * @throws {BusinessError} 2501000 - Operation failed.
      * @syscap SystemCapability.Communication.WiFi.STA
      * @permission ohos.permission.MANAGE_WIFI_CONNECTION
      * @systemapi Hide this for inner system use.
      */
     function off(type: "streamChange", callback?: Callback<number>): void;

    /**
     * Subscribe Wi-Fi device config change events.
     *
     * @returns Returns 0: config is added, 1: config is changed, 2: config is removed.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     * @systemapi Hide this for inner system use.
     */
     function on(type: "deviceConfigChange", callback: Callback<number>): void;

    /**
     * Subscribe Wi-Fi device config change events.
     *
     * @returns Returns 0: config is added, 1: config is changed, 2: config is removed.
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2501000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.STA
     * @permission ohos.permission.GET_WIFI_INFO
     * @systemapi Hide this for inner system use.
     */
     function off(type: "deviceConfigChange", callback?: Callback<number>): void;

    /**
     * Subscribe Wi-Fi hotspot state change events.
     *
     * @returns Returns 0: inactive, 1: active, 2: activating, 3: de-activating
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2601000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function on(type: "hotspotStateChange", callback: Callback<number>): void;

    /**
     * Unsubscribe Wi-Fi hotspot state change events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2601000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function off(type: "hotspotStateChange", callback?: Callback<number>): void;

    /**
     * Subscribe Wi-Fi hotspot sta join events.
     *
     * @returns Returns StationInfo
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2601000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.MANAGE_WIFI_HOTSPOT
     * @systemapi Hide this for inner system use.
     */
    function on(type: "hotspotStaJoin", callback: Callback<StationInfo>): void;

    /**
     * Unsubscribe Wi-Fi hotspot sta join events.
     *
     * <p>All callback functions will be deregistered If there is no specific callback parameter.</p>
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2601000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.MANAGE_WIFI_HOTSPOT
     * @systemapi Hide this for inner system use.
     */
    function off(type: "hotspotStaJoin", callback?: Callback<StationInfo>): void;

    /**
     * Subscribe Wi-Fi hotspot sta leave events.
     *
     * @returns Returns {@link #StationInfo} object
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2601000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.MANAGE_WIFI_HOTSPOT
     * @systemapi Hide this for inner system use.
     */
    function on(type: "hotspotStaLeave", callback: Callback<StationInfo>): void;

    /**
     * Unsubscribe Wi-Fi hotspot sta leave events.
     *
     * @returns Returns {@link #StationInfo} object
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 202 - System API is not allowed called by Non-system application.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2601000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
     * @permission ohos.permission.MANAGE_WIFI_HOTSPOT
     * @systemapi Hide this for inner system use.
     */
    function off(type: "hotspotStaLeave", callback?: Callback<StationInfo>): void;

    /**
     * Subscribe P2P status change events.
     *
     * @returns Returns 1: idle, 2: starting, 3:started, 4: closing, 5: closed
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function on(type: "p2pStateChange", callback: Callback<number>): void;

    /**
     * Unsubscribe P2P status change events.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function off(type: "p2pStateChange", callback?: Callback<number>): void;

    /**
     * Subscribe P2P connection change events.
     *
     * @returns Returns WifiP2pLinkedInfo
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function on(type: "p2pConnectionChange", callback: Callback<WifiP2pLinkedInfo>): void;

    /**
     * Unsubscribe P2P connection change events.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function off(type: "p2pConnectionChange", callback?: Callback<WifiP2pLinkedInfo>): void;

    /**
     * Subscribe P2P local device change events.
     *
     * @returns Returns WifiP2pDevice
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     */
    function on(type: "p2pDeviceChange", callback: Callback<WifiP2pDevice>): void;

    /**
     * Unsubscribe P2P local device change events.
     *
     * @returns Returns WifiP2pDevice
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.LOCATION
     */
    function off(type: "p2pDeviceChange", callback?: Callback<WifiP2pDevice>): void;

    /**
     * Subscribe P2P peer device change events.
     *
     * @returns Returns WifiP2pDevice[]
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO and ohos.permission.LOCATION
     */
    function on(type: "p2pPeerDeviceChange", callback: Callback<WifiP2pDevice[]>): void;

    /**
     * Unsubscribe P2P peer device change events.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.LOCATION
     */
    function off(type: "p2pPeerDeviceChange", callback?: Callback<WifiP2pDevice[]>): void;

    /**
     * Subscribe P2P persistent group change events.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function on(type: "p2pPersistentGroupChange", callback: Callback<void>): void;

    /**
     * Unsubscribe P2P persistent group change events.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function off(type: "p2pPersistentGroupChange", callback?: Callback<void>): void;

    /**
     * Subscribe P2P discovery events.
     *
     * @returns Returns 0: initial state, 1: discovery succeeded
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function on(type: "p2pDiscoveryChange", callback: Callback<number>): void;

    /**
     * Unsubscribe P2P discovery events.
     *
     * @since 9
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Invalid parameters.
     * @throws {BusinessError} 801 - Capability not supported.
     * @throws {BusinessError} 2801000 - Operation failed.
     * @syscap SystemCapability.Communication.WiFi.P2P
     * @permission ohos.permission.GET_WIFI_INFO
     */
    function off(type: "p2pDiscoveryChange", callback?: Callback<number>): void;

    /**
     * Wi-Fi EAP method.
     *
     * @since 9
     * @systemapi Hide this for inner system use.
     * @syscap SystemCapability.Communication.WiFi.STA
     */
     enum EapMethod {
        EAP_NONE,
        EAP_PEAP,
        EAP_TLS,
        EAP_TTLS,
        EAP_PWD,
        EAP_SIM,
        EAP_AKA,
        EAP_AKA_PRIME,
        EAP_UNAUTH_TLS,
    }

    /**
     * Wi-Fi phase 2 method.
     *
     * @since 9
     * @systemapi Hide this for inner system use.
     * @syscap SystemCapability.Communication.WiFi.STA
     */
     enum Phase2Method {
        PHASE2_NONE,
        PHASE2_PAP,
        PHASE2_MSCHAP,
        PHASE2_MSCHAPV2,
        PHASE2_GTC,
        PHASE2_SIM,
        PHASE2_AKA,
        PHASE2_AKA_PRIME,
    }

    /**
     * Wi-Fi EAP config.
     *
     * @since 9
     * @systemapi Hide this for inner system use.
     * @syscap SystemCapability.Communication.WiFi.STA
     */
    interface WifiEapConfig {
        /** EAP authentication method */
        eapMethod: EapMethod;

        /** Phase 2 authentication method */
        phase2Method: Phase2Method;

        /** The identity */
        identity: string;

        /** Anonymous identity */
        anonymousIdentity: string;

        /** Password */
        password: string;

        /** CA certificate alias */
        caCertAliases: string;

        /** CA certificate path */
        caPath: string;

        /** Client certificate alias */
        clientCertAliases: string;

        /** content of user's certificate */
        certEntry: Uint8Array;

        /** Password of user's certificate */
        certPassword: string;

        /** Alternate subject match */
        altSubjectMatch: string;

        /** Domain suffix match */
        domainSuffixMatch: string;

        /** Realm for Passpoint credential */
        realm: string;

        /** Public Land Mobile Network of the provider of Passpoint credential */
        plmn: string;

        /** Sub ID of the SIM card */
        eapSubId: number;
    }

    /**
     * Wi-Fi device configuration information.
     *
     * @since 9
     * @syscap SystemCapability.Communication.WiFi.STA
     */
    interface WifiDeviceConfig {
        /** Wi-Fi SSID: the maximum length is 32 */
        ssid: string;

        /** Wi-Fi bssid(MAC): the length is 6 */
        bssid?: string;

        /** Wi-Fi key: maximum length is 64 */
        preSharedKey: string;

        /** Hide SSID or not, false(default): not hide */
        isHiddenSsid?: boolean;

        /** Security type: reference definition of WifiSecurityType */
        securityType: WifiSecurityType;

        /** The UID of the Wi-Fi configuration creator */
        /* @systemapi */
        creatorUid?: number;

        /** Disable reason */
        /* @systemapi */
        disableReason?: number;

        /** Allocated networkId */
        /* @systemapi */
        netId?: number;

        /** Random mac type */
        /* @systemapi */
        randomMacType?: number;

        /** Random mac address, the length is 6 */
        /* @systemapi */
        randomMacAddr?: string;

        /** IP Type */
        /* @systemapi */
        ipType?: IpType;

        /** IP config of static */
        /* @systemapi */
        staticIp?: IpConfig;

        /**
         * EAP config info.
         * @systemapi
         */
        eapConfig?: WifiEapConfig;
    }

    /**
     * Wi-Fi IP configuration information.
     *
     * @since 9
     * @systemapi Hide this for inner system use.
     * @syscap SystemCapability.Communication.WiFi.STA
     */
    interface IpConfig {
        ipAddress: number;
        gateway: number;
        prefixLength: number;
        dnsServers: number[];
        domains: Array<string>;
    }

    /**
     * Wi-Fi information elements.
     *
     * @since 9
     * @syscap SystemCapability.Communication.WiFi.STA
     */
    interface WifiInfoElem {
        /** Element id */
        eid: number;
        /** Element content */
        content: Uint8Array;
    }

    /**
     * Describes the wifi channel width.
     *
     * @since 9
     * @syscap SystemCapability.Communication.WiFi.STA
     */
    enum WifiChannelWidth {
        WIDTH_20MHZ = 0,
        WIDTH_40MHZ = 1,
        WIDTH_80MHZ = 2,
        WIDTH_160MHZ = 3,
        WIDTH_80MHZ_PLUS = 4,
        WIDTH_INVALID
    }

    /**
     * Describes the scanned Wi-Fi information.
     *
     * @since 9
     * @syscap SystemCapability.Communication.WiFi.STA
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

        /**
         * Center frequency 0.
         *
         * @since 9
         * @syscap SystemCapability.Communication.WiFi.STA
         */
        centerFrequency0: number;

        /**
         * Center frequency 1.
         *
         * @since 9
         * @syscap SystemCapability.Communication.WiFi.STA
         */
        centerFrequency1: number;

        /**
         * Information elements.
         *
         * @since 9
         * @syscap SystemCapability.Communication.WiFi.STA
         */
        infoElems: Array<WifiInfoElem>;

        /** Time stamp */
        timestamp: number;
    }

    /**
     * Describes the wifi security type.
     *
     * @since 9
     * @syscap SystemCapability.Communication.WiFi.Core
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

        /**
         * EAP authentication.
         *
         * @since 9
         * @syscap SystemCapability.Communication.WiFi.Core
         */
        WIFI_SEC_TYPE_EAP = 5,

        /**
         * SUITE_B_192 192 bit level.
         *
         * @since 9
         * @syscap SystemCapability.Communication.WiFi.Core
         */
        WIFI_SEC_TYPE_EAP_SUITE_B = 6,

        /**
         * Opportunistic Wireless Encryption.
         *
         * @since 9
         * @syscap SystemCapability.Communication.WiFi.Core
         */
        WIFI_SEC_TYPE_OWE = 7,

        /**
         * WAPI certificate to be specified.
         *
         * @since 9
         * @syscap SystemCapability.Communication.WiFi.Core
         */
        WIFI_SEC_TYPE_WAPI_CERT = 8,

        /**
         * WAPI pre-shared key to be specified.
         *
         * @since 9
         * @syscap SystemCapability.Communication.WiFi.Core
         */
        WIFI_SEC_TYPE_WAPI_PSK = 9,
    }

    /**
     * Wi-Fi connection information.
     *
     * @since 9
     * @syscap SystemCapability.Communication.WiFi.STA
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

        /**
         * Type of macAddress: 0 - real mac, 1 - random mac.
         *
         * @since 9
         * @syscap SystemCapability.Communication.WiFi.STA
         */
        macType: number;

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
     * @since 9
     * @syscap SystemCapability.Communication.WiFi.STA
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
     * @since 9
     * @systemapi Hide this for inner system use.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
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
     * @since 9
     * @systemapi Hide this for inner system use.
     * @syscap SystemCapability.Communication.WiFi.AP.Core
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
     * @since 9
     * @systemapi Hide this for inner system use.
     * @syscap SystemCapability.Communication.WiFi.STA
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
     * @since 9
     * @systemapi Hide this for inner system use.
     * @syscap SystemCapability.Communication.WiFi.STA
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
     * @since 9
     * @syscap SystemCapability.Communication.WiFi.STA
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
     * @since 9
     * @syscap SystemCapability.Communication.WiFi.P2P
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

        /** Device group capabilities */
        groupCapabilities: number;
    }

    /**
     * P2P config.
     *
     * @since 9
     * @syscap SystemCapability.Communication.WiFi.P2P
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
     * @since 9
     * @syscap SystemCapability.Communication.WiFi.P2P
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
     * @since 9
     * @syscap SystemCapability.Communication.WiFi.P2P
     */
    enum P2pConnectState {
        DISCONNECTED = 0,
        CONNECTED = 1,
    }

    /**
     * P2P linked information.
     *
     * @since 9
     * @syscap SystemCapability.Communication.WiFi.P2P
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
     * @since 9
     * @syscap SystemCapability.Communication.WiFi.P2P
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
     * @since 9
     * @syscap SystemCapability.Communication.WiFi.P2P
     */
    enum GroupOwnerBand {
        GO_BAND_AUTO = 0,
        GO_BAND_2GHZ = 1,
        GO_BAND_5GHZ = 2,
    }
}

export default wifiManager;
