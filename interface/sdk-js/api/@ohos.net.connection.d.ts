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

import {AsyncCallback, Callback} from "./basic";
import http from "./@ohos.net.http";
import socket from "./@ohos.net.socket";

/**
 * Provides interfaces to manage and use data networks.
 *
 * @since 8
 * @syscap SystemCapability.Communication.NetManager.Core
 */
declare namespace connection {
  type HttpRequest = http.HttpRequest;
  type TCPSocket = socket.TCPSocket;
  type UDPSocket = socket.UDPSocket;

  /**
   * Create a network connection with optional netSpecifier and timeout.
   *
   * @param netSpecifier Indicates the network specifier. See {@link NetSpecifier}.
   * @param timeout The time in milliseconds to attempt looking for a suitable network before
   *   {@link NetConnection#netUnavailable} is called.
   */
  function createNetConnection(netSpecifier?: NetSpecifier, timeout?: number): NetConnection;

  /**
   * Obtains the data network that is activated by default.
   *
   * @param callback Returns the {@link NetHandle} object;
   *      returns {@code null} if the default network is not activated.
   * @permission ohos.permission.GET_NETWORK_INFO
   * @throws {BusinessError} 201 - Permission denied.
   * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
   * @throws {BusinessError} 2100003 - System internal error.
   */
  function getDefaultNet(callback: AsyncCallback<NetHandle>): void;
  function getDefaultNet(): Promise<NetHandle>;

  /**
   * Obtains the data network that is activated by default.
   *
   * <p>To call this method, you must have the {@code ohos.permission.GET_NETWORK_INFO} permission.
   *
   * @returns Returns the {@link NetHandle} object;
   *      returns {@code null} if the default network is not activated.
   * @permission ohos.permission.GET_NETWORK_INFO
   * @throws {BusinessError} 201 - Permission denied.
   * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
   * @throws {BusinessError} 2100003 - System internal error.
   * @since 9
   */
  function getDefaultNetSync(): NetHandle;

  /**
   * Obtains the list of data networks that are activated.
   *
   * @param callback Returns the {@link NetHandle} object; returns {@code null} if no network is activated.
   * @permission ohos.permission.GET_NETWORK_INFO
   * @throws {BusinessError} 201 - Permission denied.
   * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
   * @throws {BusinessError} 2100003 - System internal error.
   */
  function getAllNets(callback: AsyncCallback<Array<NetHandle>>): void;
  function getAllNets(): Promise<Array<NetHandle>>;

  /**
   * Queries the connection properties of a network.
   *
   * @param netHandle Indicates the network to be queried.
   * @param callback Returns the {@link ConnectionProperties} object.
   * @permission ohos.permission.GET_NETWORK_INFO
   * @throws {BusinessError} 201 - Permission denied.
   * @throws {BusinessError} 401 - Parameter error.
   * @throws {BusinessError} 2100001 - Invalid parameter value.
   * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
   * @throws {BusinessError} 2100003 - System internal error.
   */
  function getConnectionProperties(netHandle: NetHandle, callback: AsyncCallback<ConnectionProperties>): void;
  function getConnectionProperties(netHandle: NetHandle): Promise<ConnectionProperties>;

  /**
   * Obtains {@link NetCapabilities} of a {@link NetHandle} object.
   *
   * @param netHandle Indicates the handle. See {@link NetHandle}.
   * @param callback Returns {@link NetCapabilities}; returns {@code null} if {@code handle} is invalid.
   * @permission ohos.permission.GET_NETWORK_INFO
   * @throws {BusinessError} 201 - Permission denied.
   * @throws {BusinessError} 401 - Parameter error.
   * @throws {BusinessError} 2100001 - Invalid parameter value.
   * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
   * @throws {BusinessError} 2100003 - System internal error.
   */
  function getNetCapabilities(netHandle: NetHandle, callback: AsyncCallback<NetCapabilities>): void;
  function getNetCapabilities(netHandle: NetHandle): Promise<NetCapabilities>;

  /**
   * Checks whether data traffic usage on the current network is metered.
   *
   * @param callback Returns {@code true} if data traffic usage on the current network is metered;
   *      returns {@code false} otherwise.
   * @permission ohos.permission.GET_NETWORK_INFO
   * @throws {BusinessError} 201 - Permission denied.
   * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
   * @throws {BusinessError} 2100003 - System internal error.
   * @since 9
   */
  function isDefaultNetMetered(callback: AsyncCallback<boolean>): void;
  function isDefaultNetMetered(): Promise<boolean>;

  /**
   * Checks whether the default data network is activated.
   *
   * @param callback Returns {@code true} if the default data network is activated; returns {@code false} otherwise.
   * @permission ohos.permission.GET_NETWORK_INFO
   * @throws {BusinessError} 201 - Permission denied.
   * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
   * @throws {BusinessError} 2100003 - System internal error. 
   */
  function hasDefaultNet(callback: AsyncCallback<boolean>): void;
  function hasDefaultNet(): Promise<boolean>;

  /**
   * Enables the airplane mode for a device.
   *
   * <p>To invoke this method, you must have the {@code ohos.permission.CONNECTIVITY_INTERNAL} permission.
   *
   * @permission ohos.permission.CONNECTIVITY_INTERNAL
   * @systemapi Hide this for inner system use. Only used for system app.
   * @throws {BusinessError} 201 - Permission denied.
   * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
   * @throws {BusinessError} 2100003 - System internal error.
   */
  function enableAirplaneMode(callback: AsyncCallback<void>): void;
  function enableAirplaneMode(): Promise<void>;

  /**
   * Disables the airplane mode for a device.
   *
   * <p>To invoke this method, you must have the {@code ohos.permission.CONNECTIVITY_INTERNAL} permission.
   *
   * @permission ohos.permission.CONNECTIVITY_INTERNAL
   * @systemapi Hide this for inner system use. Only used for system app.
   * @throws {BusinessError} 201 - Permission denied.
   * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
   * @throws {BusinessError} 2100003 - System internal error.
   */
  function disableAirplaneMode(callback: AsyncCallback<void>): void;
  function disableAirplaneMode(): Promise<void>;

  /**
   * Reports the network state is connected.
   *
   * @param netHandle Indicates the network whose state is to be reported.
   * @permission ohos.permission.GET_NETWORK_INFO and ohos.permission.INTERNET
   * @throws {BusinessError} 201 - Permission denied.
   * @throws {BusinessError} 401 - Parameter error.
   * @throws {BusinessError} 2100001 - Invalid parameter value.
   * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
   * @throws {BusinessError} 2100003 - System internal error.
   */
  function reportNetConnected(netHandle: NetHandle, callback: AsyncCallback<void>): void;
  function reportNetConnected(netHandle: NetHandle): Promise<void>;

  /**
   * Reports the network state is disconnected.
   *
   * @param netHandle Indicates the network whose state is to be reported.
   * @permission ohos.permission.GET_NETWORK_INFO and ohos.permission.INTERNET
   * @throws {BusinessError} 201 - Permission denied.
   * @throws {BusinessError} 401 - Parameter error.
   * @throws {BusinessError} 2100001 - Invalid parameter value.
   * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
   * @throws {BusinessError} 2100003 - System internal error.
   */
  function reportNetDisconnected(netHandle: NetHandle, callback: AsyncCallback<void>): void;
  function reportNetDisconnected(netHandle: NetHandle): Promise<void>;

  /**
   * Resolves the host name to obtain all IP addresses based on the default data network.
   *
   * @param host Indicates the host name or the domain.
   * @param callback Returns the NetAddress list.
   * @permission ohos.permission.INTERNET
   * @throws {BusinessError} 201 - Permission denied.
   * @throws {BusinessError} 401 - Parameter error.
   * @throws {BusinessError} 2100001 - Invalid parameter value.
   * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
   * @throws {BusinessError} 2100003 - System internal error.
   */
  function getAddressesByName(host: string, callback: AsyncCallback<Array<NetAddress>>): void;
  function getAddressesByName(host: string): Promise<Array<NetAddress>>;

  /**
   * Obtains the {@link NetHandle} bound to a process using {@link setAppNet}.
   *
   * @param callback Returns the {@link NetHandle} bound to the process;
   *      returns {@code null} if no {@link NetHandle} is bound to the process.
   *      For details, see {@link NetHandle}.
   * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
   * @throws {BusinessError} 2100003 - System internal error.
   * @since 9
   */
  function getAppNet(callback: AsyncCallback<NetHandle>): void;

  /**
   * Obtains the {@link NetHandle} bound to a process using {@link setAppNet}.
   *
   * @returns { Promise<NetHandle> } the promise returned by the function.
   *      returns {@code null} if no {@link NetHandle} is bound to the process.
   *      For details, see {@link NetHandle}.
   * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
   * @throws {BusinessError} 2100003 - System internal error.
   * @since 9
   */
  function getAppNet(): Promise<NetHandle>;

  /**
   * Binds a process to {@code NetHandle}.
   *
   * <p>All the sockets created from the process will be bound to the {@code NetHandle},
   * and the resolution of all host names will be managed by the {@code NetHandle}.
   *
   * @param netHandle Indicates the handle. For details, see {@link NetHandle}.
   * @param callback Returns the callback of setAppNet.
   * @permission ohos.permission.INTERNET
   * @throws {BusinessError} 201 - Permission denied.
   * @throws {BusinessError} 401 - Parameter error.
   * @throws {BusinessError} 2100001 - Invalid parameter value.
   * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
   * @throws {BusinessError} 2100003 - System internal error.
   * @since 9
   */
  function setAppNet(netHandle: NetHandle, callback: AsyncCallback<void>): void;

  /**
   * Binds a process to {@code NetHandle}.
   *
   * <p>All the sockets created from the process will be bound to the {@code NetHandle},
   * and the resolution of all host names will be managed by the {@code NetHandle}.
   *
   * @param netHandle Indicates the handle. For details, see {@link NetHandle}.
   * @returns { Promise<void> } the promise returned by the function.
   * @permission ohos.permission.INTERNET
   * @throws {BusinessError} 201 - Permission denied.
   * @throws {BusinessError} 401 - Parameter error.
   * @throws {BusinessError} 2100001 - Invalid parameter value.
   * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
   * @throws {BusinessError} 2100003 - System internal error.
   * @since 9
   */
  function setAppNet(netHandle: NetHandle): Promise<void>;

  export interface NetConnection {
    on(type: 'netAvailable', callback: Callback<NetHandle>): void;

    on(type: 'netBlockStatusChange', callback: Callback<{ netHandle: NetHandle, blocked: boolean }>): void;

    on(type: 'netCapabilitiesChange', callback: Callback<{ netHandle: NetHandle, netCap: NetCapabilities }>): void;

    on(type: 'netConnectionPropertiesChange', callback: Callback<{ netHandle: NetHandle, connectionProperties: ConnectionProperties }>): void;

    on(type: 'netLost', callback: Callback<NetHandle>): void;

    on(type: 'netUnavailable', callback: Callback<void>): void;

    /**
     * Receives status change notifications of a specified network.
     *
     * @permission ohos.permission.GET_NETWORK_INFO
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
     * @throws {BusinessError} 2100003 - System internal error.
     * @throws {BusinessError} 2101008 - The callback is not found.
     * @throws {BusinessError} 2101022 - The number of requests exceeded the maximum.
     */
    register(callback: AsyncCallback<void>): void;

    /**
     * Cancels listening for network status changes.
     * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
     * @throws {BusinessError} 2100003 - System internal error.
     * @throws {BusinessError} 2101007 - The same callback exists.
     */
    unregister(callback: AsyncCallback<void>): void;
  }

  export interface NetSpecifier {
    netCapabilities: NetCapabilities;
    bearerPrivateIdentifier?: string;
  }

  export interface NetHandle {
    netId: number;

    /**
     * Binds a TCPSocket or UDPSocket to the current network. All data flows from
     * the socket will use this network, without being subject to {@link setAppNet}.
     * Before using this method, ensure that the socket is disconnected.
     *
     * @param socketParam Indicates the TCPSocket or UDPSocket object.
     * @throws {BusinessError} 401 - Parameter error.
     * @throws {BusinessError} 2100001 - Invalid parameter value.
     * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
     * @throws {BusinessError} 2100003 - System internal error.
     * @since 9
     */
    bindSocket(socketParam: TCPSocket | UDPSocket, callback: AsyncCallback<void>): void;
    bindSocket(socketParam: TCPSocket | UDPSocket): Promise<void>;

    /**
     * Resolves a host name to obtain all IP addresses based on the specified NetHandle.
     *
     * @param host Indicates the host name or the domain.
     * @param callback Returns the NetAddress list.
     * @permission ohos.permission.INTERNET
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Parameter error.
     * @throws {BusinessError} 2100001 - Invalid parameter value.
     * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
     * @throws {BusinessError} 2100003 - System internal error.
     */
    getAddressesByName(host: string, callback: AsyncCallback<Array<NetAddress>>): void;
    getAddressesByName(host: string): Promise<Array<NetAddress>>;

    /**
     * Resolves a host name to obtain the first IP address based on the specified NetHandle.
     *
     * @param host Indicates the host name or the domain.
     * @param callback Returns the first NetAddress.
     * @permission ohos.permission.INTERNET
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 401 - Parameter error.
     * @throws {BusinessError} 2100001 - Invalid parameter value.
     * @throws {BusinessError} 2100002 - Operation failed. Cannot connect to service.
     * @throws {BusinessError} 2100003 - System internal error.
     */
    getAddressByName(host: string, callback: AsyncCallback<NetAddress>): void;
    getAddressByName(host: string): Promise<NetAddress>;
  }

  export interface NetCapabilities {
    linkUpBandwidthKbps?: number;
    linkDownBandwidthKbps?: number;
    networkCap?: Array<NetCap>;
    bearerTypes: Array<NetBearType>;
  }

  export enum NetCap {
    /**
     * Indicates that the network can access the carrier's MMSC to send and receive multimedia messages.
     */
    NET_CAPABILITY_MMS = 0,

    /**
     * Indicates that the network traffic is not metered.
     */
    NET_CAPABILITY_NOT_METERED = 11,

    /**
     * Indicates that the network can access the Internet.
     */
    NET_CAPABILITY_INTERNET = 12,

    /**
     * Indicates that the network does not use a VPN.
     */
    NET_CAPABILITY_NOT_VPN = 15,

    /**
     * Indicates that the network is available.
     */
    NET_CAPABILITY_VALIDATED = 16,
  }

  export enum NetBearType {
    /**
     * Indicates that the network is based on a cellular network.
     */
    BEARER_CELLULAR = 0,

    /**
     * Indicates that the network is based on a Wi-Fi network.
     */
    BEARER_WIFI = 1,

    /**
     * Indicates that the network is an Ethernet network.
     */
    BEARER_ETHERNET = 3,
  }

  export interface ConnectionProperties {
    interfaceName: string;
    domains: string;
    linkAddresses: Array<LinkAddress>;
    dnses: Array<NetAddress>;
    routes: Array<RouteInfo>;
    mtu: number;
  }

  export interface RouteInfo {
    interface: string;
    destination: LinkAddress;
    gateway: NetAddress;
    hasGateway: boolean;
    isDefaultRoute: boolean;
  }

  export interface LinkAddress {
    address: NetAddress;
    prefixLength: number;
  }

  export interface NetAddress {
    address: string;
    family?: number; // IPv4 = 1; IPv6 = 2, default is IPv4
    port?: number; // [0, 65535]
  }
}

export default connection;
