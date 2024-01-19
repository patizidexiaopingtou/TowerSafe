/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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

import { AsyncCallback } from './basic';
import { BundleOption as _BundleOption } from './notification/NotificationCommonDef';
import { NotificationSubscribeInfo as _NotificationSubscribeInfo } from './notification/notificationSubscribeInfo';
import { NotificationSubscriber as _NotificationSubscriber } from './notification/notificationSubscriber';
import { SubscribeCallbackData as _SubscribeCallbackData } from './notification/notificationSubscriber';
import { EnabledNotificationCallbackData as _EnabledNotificationCallbackData } from './notification/notificationSubscriber';

/**
 * @name notificationSubscribe
 * @since 9
 * @systemapi
 * @syscap SystemCapability.Notification.Notification
 * @permission N/A
 */
declare namespace notificationSubscribe {
  /**
   * Describes a NotificationKey, which can be used to identify a notification.
   * @typedef NotificationKey
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  export interface NotificationKey {
    id: number;
    label?: string;
  }

  /**
   * Reason for remove a notification
   * @enum { number }
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  export enum RemoveReason {
    /**
     * Notification clicked notification on the status bar
     */
    CLICK_REASON_REMOVE = 1,

    /**
     * User dismissal notification  on the status bar
     */
    CANCEL_REASON_REMOVE = 2,
  }

  /**
   * Subscribe to notifications.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { NotificationSubscriber } subscriber - The notification subscriber.
   * @param { AsyncCallback<void> } callback - The callback of subscribe.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function subscribe(subscriber: NotificationSubscriber, callback: AsyncCallback<void>): void;

  /**
   * Subscribe to notifications.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { NotificationSubscriber } subscriber - The notification subscriber.
   * @param { NotificationSubscribeInfo } info - The notification subscribe info.
   * @param { AsyncCallback<void> } callback - The callback of subscribe.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function subscribe(subscriber: NotificationSubscriber, info: NotificationSubscribeInfo, callback: AsyncCallback<void>): void;

  /**
   * Subscribe to notifications
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { NotificationSubscriber } subscriber - The notification subscriber.
   * @param { NotificationSubscribeInfo } info - The notification subscribe info.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function subscribe(subscriber: NotificationSubscriber, info?: NotificationSubscribeInfo): Promise<void>;

  /**
   * Unsubscribe notifications.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { NotificationSubscriber } subscriber - The notification subscriber.
   * @param { AsyncCallback<void> } callback - The callback of unsubscribe.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function unsubscribe(subscriber: NotificationSubscriber, callback: AsyncCallback<void>): void;

  /**
   * Unsubscribe notifications.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { NotificationSubscriber } subscriber - The notification subscriber.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function unsubscribe(subscriber: NotificationSubscriber): Promise<void>;

  /**
   * Remove notification.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { NotificationKey } notificationKey - The notification key.
   * @param { RemoveReason } reason - The remove reason.
   * @param { AsyncCallback<void> } callback - The callback of remove.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
   function remove(bundle: BundleOption, notificationKey: NotificationKey, reason: RemoveReason, callback: AsyncCallback<void>): void;

   /**
    * Remove notification.
    * @permission ohos.permission.NOTIFICATION_CONTROLLER
    * @param { BundleOption } bundle - The bundle option.
    * @param { NotificationKey } notificationKey - The notification key.
    * @param { RemoveReason } reason - The remove reason.
    * @returns { Promise<void> } The promise returned by the function.
    * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
    * @syscap SystemCapability.Notification.Notification
    * @systemapi
    * @since 9
    */
   function remove(bundle: BundleOption, notificationKey: NotificationKey, reason: RemoveReason): Promise<void>;
 
   /**
    * Remove notification.
    * @permission ohos.permission.NOTIFICATION_CONTROLLER
    * @param { string } hashCode - The hashCode.
    * @param { RemoveReason } reason - The remove reason.
    * @param { AsyncCallback<void> } callback - The callback of remove.
    * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
    * @syscap SystemCapability.Notification.Notification
    * @systemapi
    * @since 9
    */
   function remove(hashCode: string, reason: RemoveReason, callback: AsyncCallback<void>): void;
 
   /**
    * Remove notification.
    * @permission ohos.permission.NOTIFICATION_CONTROLLER
    * @param { string } hashCode - The hashCode.
    * @param { RemoveReason } reason - The remove reason.
    * @returns { Promise<void> } The promise returned by the function.
    * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
    * @syscap SystemCapability.Notification.Notification
    * @systemapi
    * @since 9
    */
   function remove(hashCode: string, reason: RemoveReason): Promise<void>;
 
   /**
    * RemoveAll all notifications.
    * @permission ohos.permission.NOTIFICATION_CONTROLLER
    * @param { BundleOption } bundle - The bundle option.
    * @param { AsyncCallback<void> } callback - The callback of removeAll.
    * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
    * @syscap SystemCapability.Notification.Notification
    * @systemapi
    * @since 9
    */
   function removeAll(bundle: BundleOption, callback: AsyncCallback<void>): void;
 
   /**
    * RemoveAll all notifications.
    * @permission ohos.permission.NOTIFICATION_CONTROLLER
    * @param { AsyncCallback<void> } callback - The callback of removeAll.
    * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
    * @syscap SystemCapability.Notification.Notification
    * @systemapi
    * @since 9
    */
   function removeAll(callback: AsyncCallback<void>): void;
 
   /**
    * Remove all notifications under the specified user.
    * @permission ohos.permission.NOTIFICATION_CONTROLLER
    * @param { number } userId - The userId.
    * @param { AsyncCallback<void> } callback - The callback of removeAll.
    * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
    * @syscap SystemCapability.Notification.Notification
    * @systemapi
    * @since 9
    */
   function removeAll(userId: number, callback: AsyncCallback<void>): void;
 
   /**
    * Remove all notifications under the specified user.
    * @permission ohos.permission.NOTIFICATION_CONTROLLER
    * @param { number } userId - The userId.
    * @returns { Promise<void> } The promise returned by the function.
    * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
    * @syscap SystemCapability.Notification.Notification
    * @systemapi
    * @since 9
    */
   function removeAll(userId: number): Promise<void>;
 
   /**
    * RemoveAll all notifications.
    * @permission ohos.permission.NOTIFICATION_CONTROLLER
    * @param { BundleOption } bundle - The bundle option.
    * @returns { Promise<void> } The promise returned by the function.
    * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
    * @syscap SystemCapability.Notification.Notification
    * @systemapi
    * @since 9
    */
   function removeAll(bundle?: BundleOption): Promise<void>;

  /**
   * Describes a bundleOption in a notification.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  export type BundleOption = _BundleOption

  /**
   * Sets filter criteria of publishers for subscribing to desired notifications.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  export type NotificationSubscribeInfo = _NotificationSubscribeInfo

  /**
   * Provides methods that will be called back when the subscriber receives a new notification or
   * a notification is canceled.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  export type NotificationSubscriber = _NotificationSubscriber

  /**
   * Provides methods that will be called back when the subscriber receives a new notification or
   * a notification is canceled.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  export type SubscribeCallbackData = _SubscribeCallbackData

  /**
   * Describes the properties of the application that the permission to send notifications has changed.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  export type EnabledNotificationCallbackData = _EnabledNotificationCallbackData
}

export default notificationSubscribe;
