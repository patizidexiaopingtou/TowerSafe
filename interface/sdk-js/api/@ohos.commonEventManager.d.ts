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

import { AsyncCallback } from './basic';
import { CommonEventData } from './commonEvent/commonEventData';
import { CommonEventSubscriber } from './commonEvent/commonEventSubscriber';
import { CommonEventSubscribeInfo } from './commonEvent/commonEventSubscribeInfo';
import { CommonEventPublishData } from './commonEvent/commonEventPublishData';

/**
 * Common event definition
 * @namespace commonEventManager
 * @syscap SystemCapability.Notification.CommonEvent
 * @since 9
 */
declare namespace commonEventManager {
  /**
   * Publishes an ordered, sticky, or standard common event.
   * @param { string } event - name of the common event.
   * @param { AsyncCallback<void> } callback - The callback of publish.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.CommonEvent
   * @since 9
   */
  function publish(event: string, callback: AsyncCallback<void>): void;

  /**
   * Publishes an ordered, sticky, or standard common event.
   * @param { string } event - name of the common event.
   * @param { CommonEventPublishData } options - Indicate the CommonEventPublishData containing the common event content and attributes.
   * @param { AsyncCallback<void> } callback - The callback of publish.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.CommonEvent
   * @since 9
   */
  function publish(event: string, options: CommonEventPublishData, callback: AsyncCallback<void>): void;

  /**
   * Publishes an ordered, sticky, or standard common event to a specified user.
   * @param { string } event - Specified the names of the common events.
   * @param { number } userId - Specified the user to receive the common events.
   * @param { AsyncCallback<void> } callback - The callback of publishAsUser.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.CommonEvent
   * @systemapi
   * @since 9
   */
  function publishAsUser(event: string, userId: number, callback: AsyncCallback<void>): void;

  /**
   * Publishes an ordered, sticky, or standard common event to a specified user.
   * @param { string } event - Specified the names of the common events.
   * @param { number } userId - Specified the user to receive the common events.
   * @param { CommonEventPublishData } options - Indicates the CommonEventPublishData containing the common event content and attributes.
   * @param { AsyncCallback<void> } callback - The callback of publishAsUser.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.CommonEvent
   * @systemapi
   * @since 9
   */
  function publishAsUser(event: string, userId: number, options: CommonEventPublishData, callback: AsyncCallback<void>): void;

  /**
   * Creates a CommonEventSubscriber for the SubscriberInfo.
   * @param { CommonEventSubscribeInfo } subscribeInfo - Indicates the information of the subscriber.
   * @param { AsyncCallback<CommonEventSubscriber> } callback - The callback is used to return the CommonEventSubscriber object.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.CommonEvent
   * @since 9
   */
  function createSubscriber(subscribeInfo: CommonEventSubscribeInfo, callback: AsyncCallback<CommonEventSubscriber>): void;

  /**
   * Creates a CommonEventSubscriber for the SubscriberInfo.
   * @param { CommonEventSubscribeInfo } subscribeInfo - Indicates the information of the subscriber.
   * @returns { Promise<CommonEventSubscriber> } Returns the CommonEventSubscriber object.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.CommonEvent
   * @since 9
   */
  function createSubscriber(subscribeInfo: CommonEventSubscribeInfo): Promise<CommonEventSubscriber>;

  /**
   * Subscribe an ordered, sticky, or standard common event.
   * @param { CommonEventSubscriber } subscriber - Indicate the subscriber of the common event.
   * @param { AsyncCallback<CommonEventData> } callback - The callback is used to return the CommonEventData object.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.CommonEvent
   * @since 9
   */
  function subscribe(subscriber: CommonEventSubscriber, callback: AsyncCallback<CommonEventData>): void;

  /**
   * Unsubscribe from an ordered, sticky, or standard common event.
   * @param { CommonEventSubscriber } subscriber - Indicate the subscriber of the common event.
   * @param { AsyncCallback<void> } callback - The callback of unsubscribe.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.CommonEvent
   * @since 9
   */
  function unsubscribe(subscriber: CommonEventSubscriber, callback?: AsyncCallback<void>): void;

  /**
   * The event type that the commonEvent supported.
   * @enum { string }
   * @syscap SystemCapability.Notification.CommonEvent
   * @since 9
   */
  export enum Support {
    /**
     * This commonEvent means when the device is booted or system upgrade completed, and only be sent by system.
     */
    COMMON_EVENT_BOOT_COMPLETED = "usual.event.BOOT_COMPLETED",

    /**
     * This commonEvent means when the device finnish booting, but still in the locked state.
     */
    COMMON_EVENT_LOCKED_BOOT_COMPLETED = "usual.event.LOCKED_BOOT_COMPLETED",

    /**
     * This commonEvent means when the device is shutting down, note: turn off, not sleeping.
     */
    COMMON_EVENT_SHUTDOWN = "usual.event.SHUTDOWN",

    /**
     * This commonEvent means when the charging state, level and so on about the battery.
     */
    COMMON_EVENT_BATTERY_CHANGED = "usual.event.BATTERY_CHANGED",

    /**
     * This commonEvent means when the device in low battery state..
     */
    COMMON_EVENT_BATTERY_LOW = "usual.event.BATTERY_LOW",

    /**
     * This commonEvent means when the battery level is an ok state.
     */
    COMMON_EVENT_BATTERY_OKAY = "usual.event.BATTERY_OKAY",

    /**
     * This commonEvent means when the other power is connected to the device.
     */
    COMMON_EVENT_POWER_CONNECTED = "usual.event.POWER_CONNECTED",

    /**
     * This commonEvent means when the other power is removed from the device.
     */
    COMMON_EVENT_POWER_DISCONNECTED = "usual.event.POWER_DISCONNECTED",

    /**
     * This commonEvent means when the screen is turned off.
     */
    COMMON_EVENT_SCREEN_OFF = "usual.event.SCREEN_OFF",

    /**
     * This commonEvent means when the device is awakened and interactive.
     */
    COMMON_EVENT_SCREEN_ON = "usual.event.SCREEN_ON",

    /**
     * This commonEvent means when the thermal state level change
     */
    COMMON_EVENT_THERMAL_LEVEL_CHANGED = "usual.event.THERMAL_LEVEL_CHANGED",

    /**
     * This commonEvent means when the user is present after the device is awakened.
     */
    COMMON_EVENT_USER_PRESENT = "usual.event.USER_PRESENT",

    /**
     * This commonEvent means when the current time is changed.
     */
    COMMON_EVENT_TIME_TICK = "usual.event.TIME_TICK",

    /**
     * This commonEvent means when the time is set.
     */
    COMMON_EVENT_TIME_CHANGED = "usual.event.TIME_CHANGED",

    /**
     * This commonEvent means when the current date is changed.
     */
    COMMON_EVENT_DATE_CHANGED = "usual.event.DATE_CHANGED",

    /**
     * This commonEvent means when the time zone is changed.
     */
    COMMON_EVENT_TIMEZONE_CHANGED = "usual.event.TIMEZONE_CHANGED",

    /**
     * This commonEvent means when the dialog to dismiss.
     */
    COMMON_EVENT_CLOSE_SYSTEM_DIALOGS = "usual.event.CLOSE_SYSTEM_DIALOGS",

    /**
     * This commonEvent means when a new application package is installed on the device.
     */
    COMMON_EVENT_PACKAGE_ADDED = "usual.event.PACKAGE_ADDED",

    /**
     * This commonEvent means when a new version application package is installed on the device and
     * replace the old version.the data contains the name of the package.
     */
    COMMON_EVENT_PACKAGE_REPLACED = "usual.event.PACKAGE_REPLACED",

    /**
     * This commonEvent means when a new version application package is installed on the device and
     * replace the old version, it does not contain additional data and only be sent to the replaced application.
     */
    COMMON_EVENT_MY_PACKAGE_REPLACED = "usual.event.MY_PACKAGE_REPLACED",

    /**
     * This commonEvent means when an existing application package is removed from the device.
     */
    COMMON_EVENT_PACKAGE_REMOVED = "usual.event.PACKAGE_REMOVED",

    /**
     * This commonEvent means when an existing application package is removed from the device.
     */
    COMMON_EVENT_BUNDLE_REMOVED = "usual.event.BUNDLE_REMOVED",

    /**
     * This commonEvent means when an existing application package is completely removed from the device.
     */
    COMMON_EVENT_PACKAGE_FULLY_REMOVED = "usual.event.PACKAGE_FULLY_REMOVED",

    /**
     * This commonEvent means when an existing application package has been changed.
     */
    COMMON_EVENT_PACKAGE_CHANGED = "usual.event.PACKAGE_CHANGED",

    /**
     * This commonEvent means the user has restarted a package, and all of its processes have been killed.
     */
    COMMON_EVENT_PACKAGE_RESTARTED = "usual.event.PACKAGE_RESTARTED",

    /**
     * This commonEvent means the user has cleared the package data.
     */
    COMMON_EVENT_PACKAGE_DATA_CLEARED = "usual.event.PACKAGE_DATA_CLEARED",

    /**
     * This commonEvent means the user has cleared the package cache.
     */
    COMMON_EVENT_PACKAGE_CACHE_CLEARED = "usual.event.PACKAGE_CACHE_CLEARED",

    /**
     * This commonEvent means the packages have been suspended.
     */
    COMMON_EVENT_PACKAGES_SUSPENDED = "usual.event.PACKAGES_SUSPENDED",

    /**
     * This commonEvent means the packages have been un-suspended.
     */
    COMMON_EVENT_PACKAGES_UNSUSPENDED = "usual.event.PACKAGES_UNSUSPENDED",

    /**
     * This commonEvent Sent to a package that has been suspended by the system.
     */
    COMMON_EVENT_MY_PACKAGE_SUSPENDED = "usual.event.MY_PACKAGE_SUSPENDED",

    /**
     * Sent to a package that has been un-suspended.
     */
    COMMON_EVENT_MY_PACKAGE_UNSUSPENDED = "usual.event.MY_PACKAGE_UNSUSPENDED",

    /**
     * A user id has been removed from the system.
     */
    COMMON_EVENT_UID_REMOVED = "usual.event.UID_REMOVED",

    /**
     * The application is first launched after installed.
     */
    COMMON_EVENT_PACKAGE_FIRST_LAUNCH = "usual.event.PACKAGE_FIRST_LAUNCH",

    /**
     * Sent by system package verifier when a package need to be verified.
     */
    COMMON_EVENT_PACKAGE_NEEDS_VERIFICATION =
        "usual.event.PACKAGE_NEEDS_VERIFICATION",

    /**
     * Sent by system package verifier when a package is verified.
     */
    COMMON_EVENT_PACKAGE_VERIFIED = "usual.event.PACKAGE_VERIFIED",

    /**
     * Resources for a set of packages (which were previously unavailable) are currently
     * available since the media on which they exist is available.
     */
    COMMON_EVENT_EXTERNAL_APPLICATIONS_AVAILABLE =
        "usual.event.EXTERNAL_APPLICATIONS_AVAILABLE",

    /**
     * Resources for a set of packages are currently unavailable since the media on which they exist is unavailable.
     */
    COMMON_EVENT_EXTERNAL_APPLICATIONS_UNAVAILABLE =
        "usual.event.EXTERNAL_APPLICATIONS_UNAVAILABLE",

    /**
     * The device configuration such as orientation,locale have been changed.
     */
    COMMON_EVENT_CONFIGURATION_CHANGED = "usual.event.CONFIGURATION_CHANGED",

    /**
     * The current device's locale has changed.
     */
    COMMON_EVENT_LOCALE_CHANGED = "usual.event.LOCALE_CHANGED",

    /**
     *  Indicates low memory condition notification acknowledged by user and package management should be started.
     */
    COMMON_EVENT_MANAGE_PACKAGE_STORAGE = "usual.event.MANAGE_PACKAGE_STORAGE",

    /**
     * Send by the smart function when the system in drive mode.
     */
    COMMON_EVENT_DRIVE_MODE = "common.event.DRIVE_MODE",

    /**
     * Send by the smart function when the system in home mode.
     */
    COMMON_EVENT_HOME_MODE = "common.event.HOME_MODE",

    /**
     * Send by the smart function when the system in office mode.
     */
    COMMON_EVENT_OFFICE_MODE = "common.event.OFFICE_MODE",

    /**
     * Remind new user of preparing to start.
     */
    COMMON_EVENT_USER_STARTED = "usual.event.USER_STARTED",

    /**
     * Remind previous user of that the service has been the background.
     */
    COMMON_EVENT_USER_BACKGROUND = "usual.event.USER_BACKGROUND",

    /**
     * Remind new user of that the service has been the foreground.
     */
    COMMON_EVENT_USER_FOREGROUND = "usual.event.USER_FOREGROUND",

    /**
     * Remind new user of that the service has been switched to new user.
     */
    COMMON_EVENT_USER_SWITCHED = "usual.event.USER_SWITCHED",

    /**
     * Remind new user of that the service has been starting.
     */
    COMMON_EVENT_USER_STARTING = "usual.event.USER_STARTING",

    /**
     * Remind new user of that the service has been unlocked.
     */
    COMMON_EVENT_USER_UNLOCKED = "usual.event.USER_UNLOCKED",

    /**
     * Remind new user of that the service has been stopping.
     */
    COMMON_EVENT_USER_STOPPING = "usual.event.USER_STOPPING",

    /**
     * Remind new user of that the service has stopped.
     */
    COMMON_EVENT_USER_STOPPED = "usual.event.USER_STOPPED",

    /**
     * Distributed account login successfully.
     */
    COMMON_EVENT_DISTRIBUTED_ACCOUNT_LOGIN = "common.event.DISTRIBUTED_ACCOUNT_LOGIN",

    /**
     * Distributed account logout successfully.
     */
    COMMON_EVENT_DISTRIBUTED_ACCOUNT_LOGOUT = "common.event.DISTRIBUTED_ACCOUNT_LOGOUT",

    /**
     * Distributed account is invalid.
     */
    COMMON_EVENT_DISTRIBUTED_ACCOUNT_TOKEN_INVALID = "common.event.DISTRIBUTED_ACCOUNT_TOKEN_INVALID",

    /**
     * Distributed account logs off.
     */
    COMMON_EVENT_DISTRIBUTED_ACCOUNT_LOGOFF = "common.event.DISTRIBUTED_ACCOUNT_LOGOFF",

    /**
     * WIFI state.
     */
    COMMON_EVENT_WIFI_POWER_STATE = "usual.event.wifi.POWER_STATE",

    /**
     * WIFI scan results.
     */
    COMMON_EVENT_WIFI_SCAN_FINISHED = "usual.event.wifi.SCAN_FINISHED",

    /**
     * WIFI RSSI change.
     */
    COMMON_EVENT_WIFI_RSSI_VALUE = "usual.event.wifi.RSSI_VALUE",

    /**
     * WIFI connect state.
     */
    COMMON_EVENT_WIFI_CONN_STATE = "usual.event.wifi.CONN_STATE",

    /**
     * WIFI hotspot state.
     */
    COMMON_EVENT_WIFI_HOTSPOT_STATE = "usual.event.wifi.HOTSPOT_STATE",

    /**
     * WIFI ap sta join.
     */
    COMMON_EVENT_WIFI_AP_STA_JOIN = "usual.event.wifi.WIFI_HS_STA_JOIN",

    /**
     * WIFI ap sta join.
     */
    COMMON_EVENT_WIFI_AP_STA_LEAVE = "usual.event.wifi.WIFI_HS_STA_LEAVE",

    /**
     * Indicates Wi-Fi MpLink state notification acknowledged by binding or unbinding MpLink.
     */
    COMMON_EVENT_WIFI_MPLINK_STATE_CHANGE = "usual.event.wifi.mplink.STATE_CHANGE",

    /**
     * Indicates Wi-Fi P2P connection state notification acknowledged by connecting or disconnected P2P.
     */
    COMMON_EVENT_WIFI_P2P_CONN_STATE = "usual.event.wifi.p2p.CONN_STATE_CHANGE",

    /**
     * Indicates that the Wi-Fi P2P state change.
     */
    COMMON_EVENT_WIFI_P2P_STATE_CHANGED = "usual.event.wifi.p2p.STATE_CHANGE",

    /**
     * Indicates that the Wi-Fi P2P peers state change.
     */
    COMMON_EVENT_WIFI_P2P_PEERS_STATE_CHANGED =
        "usual.event.wifi.p2p.DEVICES_CHANGE",

    /**
     * Indicates that the Wi-Fi P2P discovery state change.
     */
    COMMON_EVENT_WIFI_P2P_PEERS_DISCOVERY_STATE_CHANGED =
        "usual.event.wifi.p2p.PEER_DISCOVERY_STATE_CHANGE",

    /**
     * Indicates that the Wi-Fi P2P current device state change.
     */
    COMMON_EVENT_WIFI_P2P_CURRENT_DEVICE_STATE_CHANGED =
        "usual.event.wifi.p2p.CURRENT_DEVICE_CHANGE",

    /**
     * Indicates that the Wi-Fi P2P group info is changed.
     */
    COMMON_EVENT_WIFI_P2P_GROUP_STATE_CHANGED =
        "usual.event.wifi.p2p.GROUP_STATE_CHANGED",

    /**
     * Bluetooth.handsfree.ag.connect.state.update.
     */
    COMMON_EVENT_BLUETOOTH_HANDSFREE_AG_CONNECT_STATE_UPDATE =
        "usual.event.bluetooth.handsfree.ag.CONNECT_STATE_UPDATE",

    /**
     * Bluetooth.handsfree.ag.current.device.update.
     */
    COMMON_EVENT_BLUETOOTH_HANDSFREE_AG_CURRENT_DEVICE_UPDATE =
        "usual.event.bluetooth.handsfree.ag.CURRENT_DEVICE_UPDATE",

    /**
     * Bluetooth.handsfree.ag.audio.state.update.
     */
    COMMON_EVENT_BLUETOOTH_HANDSFREE_AG_AUDIO_STATE_UPDATE =
        "usual.event.bluetooth.handsfree.ag.AUDIO_STATE_UPDATE",

    /**
     * Bluetooth.a2dpsource.connect.state.update.
     */
    COMMON_EVENT_BLUETOOTH_A2DPSOURCE_CONNECT_STATE_UPDATE =
        "usual.event.bluetooth.a2dpsource.CONNECT_STATE_UPDATE",

    /**
     * Bluetooth.a2dpsource.current.device.update.
     */
    COMMON_EVENT_BLUETOOTH_A2DPSOURCE_CURRENT_DEVICE_UPDATE =
        "usual.event.bluetooth.a2dpsource.CURRENT_DEVICE_UPDATE",

    /**
     * Bluetooth.a2dpsource.playing.state.update.
     */
    COMMON_EVENT_BLUETOOTH_A2DPSOURCE_PLAYING_STATE_UPDATE =
        "usual.event.bluetooth.a2dpsource.PLAYING_STATE_UPDATE",

    /**
     * Bluetooth.a2dpsource.avrcp.connect.state.update.
     */
    COMMON_EVENT_BLUETOOTH_A2DPSOURCE_AVRCP_CONNECT_STATE_UPDATE =
        "usual.event.bluetooth.a2dpsource.AVRCP_CONNECT_STATE_UPDATE",

    /**
     * Bluetooth.a2dpsource.codec.value.update.
     */
    COMMON_EVENT_BLUETOOTH_A2DPSOURCE_CODEC_VALUE_UPDATE =
        "usual.event.bluetooth.a2dpsource.CODEC_VALUE_UPDATE",

    /**
     * Bluetooth.remotedevice.discovered.
     */
    COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_DISCOVERED =
        "usual.event.bluetooth.remotedevice.DISCOVERED",

    /**
     * Bluetooth.remotedevice.class.value.update.
     */
    COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_CLASS_VALUE_UPDATE =
        "usual.event.bluetooth.remotedevice.CLASS_VALUE_UPDATE",

    /**
     * Bluetooth.remotedevice.acl.connected.
     */
    COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_ACL_CONNECTED =
        "usual.event.bluetooth.remotedevice.ACL_CONNECTED",

    /**
     * Bluetooth.remotedevice.acl.disconnected.
     */
    COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_ACL_DISCONNECTED =
        "usual.event.bluetooth.remotedevice.ACL_DISCONNECTED",

    /**
     * Bluetooth.remotedevice.name.update.
     */
    COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_NAME_UPDATE =
        "usual.event.bluetooth.remotedevice.NAME_UPDATE",

    /**
     * Bluetooth.remotedevice.pair.state.
     */
    COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_PAIR_STATE =
        "usual.event.bluetooth.remotedevice.PAIR_STATE",

    /**
     * Bluetooth.remotedevice.battery.value.update.
     */
    COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_BATTERY_VALUE_UPDATE =
        "usual.event.bluetooth.remotedevice.BATTERY_VALUE_UPDATE",

    /**
     * Bluetooth.remotedevice.sdp.result.
     */
    COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_SDP_RESULT =
        "usual.event.bluetooth.remotedevice.SDP_RESULT",

    /**
     * Bluetooth.remotedevice.uuid.value.
     */
    COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_UUID_VALUE =
        "usual.event.bluetooth.remotedevice.UUID_VALUE",

    /**
     * Bluetooth.remotedevice.pairing.req.
     */
    COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_PAIRING_REQ =
        "usual.event.bluetooth.remotedevice.PAIRING_REQ",

    /**
     * Bluetooth.remotedevice.pairing.cancel.
     */
    COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_PAIRING_CANCEL =
        "usual.event.bluetooth.remotedevice.PAIRING_CANCEL",

    /**
     * Bluetooth.remotedevice.connect.req.
     */
    COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_CONNECT_REQ =
        "usual.event.bluetooth.remotedevice.CONNECT_REQ",

    /**
     * Bluetooth.remotedevice.connect.reply.
     */
    COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_CONNECT_REPLY =
        "usual.event.bluetooth.remotedevice.CONNECT_REPLY",

    /**
     * Bluetooth.remotedevice.connect.cancel.
     */
    COMMON_EVENT_BLUETOOTH_REMOTEDEVICE_CONNECT_CANCEL =
        "usual.event.bluetooth.remotedevice.CONNECT_CANCEL",

    /**
     * Bluetooth.handsfreeunit.connect.state.update.
     */
    COMMON_EVENT_BLUETOOTH_HANDSFREEUNIT_CONNECT_STATE_UPDATE =
        "usual.event.bluetooth.handsfreeunit.CONNECT_STATE_UPDATE",

    /**
     * Bluetooth.handsfreeunit.audio.state.update.
     */
    COMMON_EVENT_BLUETOOTH_HANDSFREEUNIT_AUDIO_STATE_UPDATE =
        "usual.event.bluetooth.handsfreeunit.AUDIO_STATE_UPDATE",

    /**
     * Bluetooth.handsfreeunit.ag.common.event.
     */
    COMMON_EVENT_BLUETOOTH_HANDSFREEUNIT_AG_COMMON_EVENT =
        "usual.event.bluetooth.handsfreeunit.AG_COMMON_EVENT",

    /**
     * Bluetooth.handsfreeunit.ag.call.state.update.
     */
    COMMON_EVENT_BLUETOOTH_HANDSFREEUNIT_AG_CALL_STATE_UPDATE =
        "usual.event.bluetooth.handsfreeunit.AG_CALL_STATE_UPDATE",

    /**
     * Bluetooth.host.state.update.
     */
    COMMON_EVENT_BLUETOOTH_HOST_STATE_UPDATE =
        "usual.event.bluetooth.host.STATE_UPDATE",

    /**
     * Bluetooth.host.req.discoverable.
     */
    COMMON_EVENT_BLUETOOTH_HOST_REQ_DISCOVERABLE =
        "usual.event.bluetooth.host.REQ_DISCOVERABLE",

    /**
     * Bluetooth.host.req.enable.
     */
    COMMON_EVENT_BLUETOOTH_HOST_REQ_ENABLE = "usual.event.bluetooth.host.REQ_ENABLE",

    /**
     * Bluetooth.host.req.disable.
     */
    COMMON_EVENT_BLUETOOTH_HOST_REQ_DISABLE =
        "usual.event.bluetooth.host.REQ_DISABLE",

    /**
     * Bluetooth.host.scan.mode.update.
     */
    COMMON_EVENT_BLUETOOTH_HOST_SCAN_MODE_UPDATE =
        "usual.event.bluetooth.host.SCAN_MODE_UPDATE",

    /**
     * Bluetooth.host.discovery.stated.
     */
    COMMON_EVENT_BLUETOOTH_HOST_DISCOVERY_STARTED =
        "usual.event.bluetooth.host.DISCOVERY_STARTED",

    /**
     * Bluetooth.host.discovery.finished.
     */
    COMMON_EVENT_BLUETOOTH_HOST_DISCOVERY_FINISHED =
        "usual.event.bluetooth.host.DISCOVERY_FINISHED",

    /**
     * Bluetooth.host.name.update.
     */
    COMMON_EVENT_BLUETOOTH_HOST_NAME_UPDATE =
        "usual.event.bluetooth.host.NAME_UPDATE",

    /**
     * Bluetooth.a2dp.connect.state.update.
     */
    COMMON_EVENT_BLUETOOTH_A2DPSINK_CONNECT_STATE_UPDATE =
        "usual.event.bluetooth.a2dpsink.CONNECT_STATE_UPDATE",

    /**
     * Bluetooth.a2dp.playing.state.update.
     */
    COMMON_EVENT_BLUETOOTH_A2DPSINK_PLAYING_STATE_UPDATE =
        "usual.event.bluetooth.a2dpsink.PLAYING_STATE_UPDATE",

    /**
     * Bluetooth.a2dp.audio.state.update.
     */
    COMMON_EVENT_BLUETOOTH_A2DPSINK_AUDIO_STATE_UPDATE =
        "usual.event.bluetooth.a2dpsink.AUDIO_STATE_UPDATE",

    /**
     * Nfc state change.
     */
    COMMON_EVENT_NFC_ACTION_ADAPTER_STATE_CHANGED =
        "usual.event.nfc.action.ADAPTER_STATE_CHANGED",

    /**
     * Nfc field on detected.
     */
    COMMON_EVENT_NFC_ACTION_RF_FIELD_ON_DETECTED =
        "usual.event.nfc.action.RF_FIELD_ON_DETECTED",

    /**
     * Nfc field off detected.
     */
    COMMON_EVENT_NFC_ACTION_RF_FIELD_OFF_DETECTED =
        "usual.event.nfc.action.RF_FIELD_OFF_DETECTED",

    /**
     * Sent when stop charging battery.
     */
    COMMON_EVENT_DISCHARGING = "usual.event.DISCHARGING",

    /**
     * Sent when start charging battery.
     */
    COMMON_EVENT_CHARGING = "usual.event.CHARGING",

    /**
     * Sent when device's idle mode changed
     */
    COMMON_EVENT_DEVICE_IDLE_MODE_CHANGED = "usual.event.DEVICE_IDLE_MODE_CHANGED",

    /**
     * Sent when device's power save mode changed
     */
    COMMON_EVENT_POWER_SAVE_MODE_CHANGED = "usual.event.POWER_SAVE_MODE_CHANGED",

    /**
     * User added.
     */
    COMMON_EVENT_USER_ADDED = "usual.event.USER_ADDED",

    /**
     * User removed.
     */
    COMMON_EVENT_USER_REMOVED = "usual.event.USER_REMOVED",

    /**
     * Sent when ability is added.
     */
    COMMON_EVENT_ABILITY_ADDED = "common.event.ABILITY_ADDED",

    /**
     * Sent when ability is removed.
     */
    COMMON_EVENT_ABILITY_REMOVED = "common.event.ABILITY_REMOVED",

    /**
     * Sent when ability is updated.
     */
    COMMON_EVENT_ABILITY_UPDATED = "common.event.ABILITY_UPDATED",

    /**
     * Gps mode state changed.
     */
    COMMON_EVENT_LOCATION_MODE_STATE_CHANGED =
        "usual.event.location.MODE_STATE_CHANGED",

    /**
     * The ivi is about to go into sleep state when the ivi is turned off power.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_IVI_SLEEP = "common.event.IVI_SLEEP",

    /**
     * The ivi is slept and notify the app stop playing.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_IVI_PAUSE = "common.event.IVI_PAUSE",

    /**
     * The ivi is standby and notify the app stop playing.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_IVI_STANDBY = "common.event.IVI_STANDBY",

    /**
     * The app stop playing and save state.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_IVI_LASTMODE_SAVE = "common.event.IVI_LASTMODE_SAVE",

    /**
     * The ivi is voltage abnormal.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_IVI_VOLTAGE_ABNORMAL = "common.event.IVI_VOLTAGE_ABNORMAL",

    /**
     * The ivi temperature is too high.
     * This is a protected common event that can only be sent by system.this common event will be delete later,
     * please use COMMON_EVENT_IVI_TEMPERATURE_ABNORMAL.
     */
    COMMON_EVENT_IVI_HIGH_TEMPERATURE = "common.event.IVI_HIGH_TEMPERATURE",

    /**
     * The ivi temperature is extreme high.
     * This is a protected common event that can only be sent by system.this common event will be delete later,
     * please use COMMON_EVENT_IVI_TEMPERATURE_ABNORMAL.
     */
    COMMON_EVENT_IVI_EXTREME_TEMPERATURE = "common.event.IVI_EXTREME_TEMPERATURE",

    /**
     * The ivi temperature is abnormal.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_IVI_TEMPERATURE_ABNORMAL = "common.event.IVI_TEMPERATURE_ABNORMAL",

    /**
     * The ivi voltage is recovery.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_IVI_VOLTAGE_RECOVERY = "common.event.IVI_VOLTAGE_RECOVERY",

    /**
     * The ivi temperature is recovery.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_IVI_TEMPERATURE_RECOVERY = "common.event.IVI_TEMPERATURE_RECOVERY",

    /**
     * The battery service is active.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_IVI_ACTIVE = "common.event.IVI_ACTIVE",

    /**
     * The usb state change events.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_USB_STATE = "usual.event.hardware.usb.action.USB_STATE",

    /**
     * The usb port changed.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_USB_PORT_CHANGED = "usual.event.hardware.usb.action.USB_PORT_CHANGED",

    /**
     * The usb device attached.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_USB_DEVICE_ATTACHED =
        "usual.event.hardware.usb.action.USB_DEVICE_ATTACHED",

    /**
     * The usb device detached.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_USB_DEVICE_DETACHED =
        "usual.event.hardware.usb.action.USB_DEVICE_DETACHED",

    /**
     * The usb accessory attached.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_USB_ACCESSORY_ATTACHED =
        "usual.event.hardware.usb.action.USB_ACCESSORY_ATTACHED",

    /**
     * The usb accessory detached.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_USB_ACCESSORY_DETACHED =
        "usual.event.hardware.usb.action.USB_ACCESSORY_DETACHED",

    /**
     * The external storage was removed.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_DISK_REMOVED = "usual.event.data.DISK_REMOVED",

    /**
     * The external storage was unmounted.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_DISK_UNMOUNTED = "usual.event.data.DISK_UNMOUNTED",

    /**
     * The external storage was mounted.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_DISK_MOUNTED = "usual.event.data.DISK_MOUNTED",

    /**
     * The external storage was bad removal.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_DISK_BAD_REMOVAL = "usual.event.data.DISK_BAD_REMOVAL",

    /**
     * The external storage was unmountable.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_DISK_UNMOUNTABLE = "usual.event.data.DISK_UNMOUNTABLE",

    /**
     * The external storage was eject.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_DISK_EJECT = "usual.event.data.DISK_EJECT",

    /**
     * The external storage was removed.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_VOLUME_REMOVED = "usual.event.data.VOLUME_REMOVED",

    /**
     * The external storage was unmounted.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_VOLUME_UNMOUNTED = "usual.event.data.VOLUME_UNMOUNTED",

    /**
     * The external storage was mounted.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_VOLUME_MOUNTED = "usual.event.data.VOLUME_MOUNTED",

    /**
     * The external storage was bad removal.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_VOLUME_BAD_REMOVAL = "usual.event.data.VOLUME_BAD_REMOVAL",

    /**
     * The external storage was eject.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_VOLUME_EJECT = "usual.event.data.VOLUME_EJECT",

    /**
     * The visible of account was updated.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_VISIBLE_ACCOUNTS_UPDATED =
        "usual.event.data.VISIBLE_ACCOUNTS_UPDATED",

    /**
     * Account was deleted.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_ACCOUNT_DELETED = "usual.event.data.ACCOUNT_DELETED",

    /**
     * Foundation was ready.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_FOUNDATION_READY = "common.event.FOUNDATION_READY",

    /**
     * Indicates the common event Action indicating that the airplane mode status of the device changes.
     * Users can register this event to listen to the change of the airplane mode status of the device.
     */
    COMMON_EVENT_AIRPLANE_MODE_CHANGED = "usual.event.AIRPLANE_MODE",

    /**
     * sent by the window manager service when the window mode is split.
     */
    COMMON_EVENT_SPLIT_SCREEN = "common.event.SPLIT_SCREEN",

    /**
     * The notification slot has been updated.
     * This is a protected common event that can only be sent by system.
     */
    COMMON_EVENT_SLOT_CHANGE = "usual.event.SLOT_CHANGE",

    /**
     * Indicate the action of a common event that the spn display information has been updated.
     * This common event can be triggered only by system.
     */
    COMMON_EVENT_SPN_INFO_CHANGED = "usual.event.SPN_INFO_CHANGED",

    /**
     * Indicate the result of quick fix apply.
     * This common event can be triggered only by system.
     */
    COMMON_EVENT_QUICK_FIX_APPLY_RESULT = "usual.event.QUICK_FIX_APPLY_RESULT",

    /**
     * Indicate the action of a common event that the user information has been updated.
     * This common event can be triggered only by system.
     */
    COMMON_EVENT_USER_INFO_UPDATED = "usual.event.USER_INFO_UPDATED"
  }
}

export default commonEventManager;
