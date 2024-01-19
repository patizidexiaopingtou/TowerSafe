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
import { NotificationActionButton as _NotificationActionButton } from './notification/notificationActionButton';
import { NotificationBasicContent as _NotificationBasicContent } from './notification/notificationContent';
import { NotificationContent as _NotificationContent } from './notification/notificationContent';
import { NotificationLongTextContent as _NotificationLongTextContent } from './notification/notificationContent';
import { NotificationMultiLineContent as _NotificationMultiLineContent } from './notification/notificationContent';
import { NotificationPictureContent as _NotificationPictureContent } from './notification/notificationContent';
import { NotificationFlags as  _NotificationFlags} from './notification/notificationFlags';
import { NotificationFlagStatus as _NotificationFlagStatus } from './notification/notificationFlags';
import { NotificationRequest as _NotificationRequest } from './notification/notificationRequest';
import { DistributedOptions as _DistributedOptions } from './notification/notificationRequest';
import { NotificationSlot as _NotificationSlot } from './notification/notificationSlot';
import { NotificationSorting as _NotificationSorting } from './notification/notificationSorting';
import { NotificationTemplate as _NotificationTemplate } from './notification/notificationTemplate';
import { NotificationUserInput as _NotificationUserInput } from './notification/notificationUserInput';

/**
 * Manages notifications.
 * <p>Generally, only system applications have permissions on notification subscription and unsubscribe.
 * You can specify the content of a notification to be published and the content is carried by
 * {@link NotificationRequest}. A notification ID is unique in an application and must be specified
 * when using {@link NotificationRequest} to carry the notification content. If a notification
 * with this ID has been published and you need to use this ID to publish another notification,
 * the original notification will be updated. In addition, the notification ID can be used to cancel
 * a notification by calling the {@link #cancel(int)} method.
 * @namespace notificationManager
 * @syscap SystemCapability.Notification.Notification
 * @since 9
 */
declare namespace notificationManager {
  /**
   * Publishes a notification.
   * <p>If a notification with the same ID has been published by the current application and has not been deleted,
   * this method will update the notification.
   * @param { NotificationRequest } request - notification request
   * @param { AsyncCallback<void> } callback - The callback of publish.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function publish(request: NotificationRequest, callback: AsyncCallback<void>): void;

  /**
   * Publishes a notification.
   * <p>If a notification with the same ID has been published by the current application and has not been deleted,
   * this method will update the notification.
   * @param { NotificationRequest } request - notification request
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function publish(request: NotificationRequest): Promise<void>;

  /**
   * Publishes a notification to the specified user.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { NotificationRequest } request - a notification.
   * @param { number } userId - of subscriber receiving the notification.
   * @param { AsyncCallback<void> } callback - The callback of publish.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function publish(request: NotificationRequest, userId: number, callback: AsyncCallback<void>): void;

  /**
   * Publishes a notification to the specified user.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { NotificationRequest } request - a notification.
   * @param { number } userId - of subscriber receiving the notification.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function publish(request: NotificationRequest, userId: number): Promise<void>;

  /**
   * Publishes a representative notification.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER and ohos.permission.NOTIFICATION_AGENT_CONTROLLER
   * @param { NotificationRequest } request - a notification.
   * @param { string } representativeBundle - bundle name of the representative
   * @param { number } userId - userid of the representative
   * @param { AsyncCallback<void> } callback - The callback of publishAsBundle.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function publishAsBundle(request: NotificationRequest, representativeBundle: string, userId: number, callback: AsyncCallback<void>): void;

  /**
   * Publishes a representative notification.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER and ohos.permission.NOTIFICATION_AGENT_CONTROLLER
   * @param { NotificationRequest } request - a notification.
   * @param { string } representativeBundle - bundle name of the representative
   * @param { number } userId - userid of the representative
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function publishAsBundle(request: NotificationRequest, representativeBundle: string, userId: number): Promise<void>;

  /**
   * Cancel a notification with the specified ID.
   * @param { number } id - ID of the notification to cancel, which must be unique in the application.
   * @param { AsyncCallback<void> } callback - The callback of cancel.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function cancel(id: number, callback: AsyncCallback<void>): void;

  /**
   * Cancel a notification with the specified label and ID.
   * @param { number } id - ID of the notification to cancel, which must be unique in the application.
   * @param { string }label - Label of the notification to cancel.
   * @param { AsyncCallback<void> } callback - The callback of cancel.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function cancel(id: number, label: string, callback: AsyncCallback<void>): void;

  /**
   * Cancel a notification with the specified label and ID.
   * @param { number } id - ID of the notification to cancel, which must be unique in the application.
   * @param { string }label - Label of the notification to cancel.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function cancel(id: number, label?: string): Promise<void>;

  /**
   * Cancel a representative notification.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER and ohos.permission.NOTIFICATION_AGENT_CONTROLLER
   * @param { number } id - ID of the notification to cancel, which must be unique in the application.
   * @param { string } representativeBundle - bundle name of the representative.
   * @param { number } userId - userid of the representative.
   * @param { AsyncCallback<void> } callback - The callback of cancelAsBundle.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function cancelAsBundle(id: number, representativeBundle: string, userId: number, callback: AsyncCallback<void>): void;

  /**
   * Cancel a representative notification.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER and ohos.permission.NOTIFICATION_AGENT_CONTROLLER
   * @param { number } id - ID of the notification to cancel, which must be unique in the application.
   * @param { string } representativeBundle - bundle name of the representative.
   * @param { number } userId - userid of the representative.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function cancelAsBundle(id: number, representativeBundle: string, userId: number): Promise<void>;

  /**
   * Cancel all notifications of the current application.
   * @param { AsyncCallback<void> } callback - The callback of cancelAll.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function cancelAll(callback: AsyncCallback<void>): void;

  /**
   * Cancel all notifications of the current application.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function cancelAll(): Promise<void>;

  /**
   * Creates a notification slot.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { NotificationSlot } slot - Indicates the notification slot to be created, which is set by {@link NotificationSlot}.
   * @param { AsyncCallback<void> } callback - The callback of addSlot.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function addSlot(slot: NotificationSlot, callback: AsyncCallback<void>): void;

  /**
   * Creates a notification slot.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { NotificationSlot } slot - Indicates the notification slot to be created, which is set by {@link NotificationSlot}.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function addSlot(slot: NotificationSlot): Promise<void>;

  /**
   * Adds a slot type.
   * @param { SlotType } type - Slot type to add.
   * @param { AsyncCallback<void> } callback - The callback of addSlot.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function addSlot(type: SlotType, callback: AsyncCallback<void>): void;

  /**
   * Adds a slot type.
   * @param { SlotType } type - Slot type to add.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function addSlot(type: SlotType): Promise<void>;

  /**
   * Creates a notification slot.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { Array<NotificationSlot> } slots - Indicates the notification slots to be created, which is set by {@link NotificationSlot}.
   * @param { AsyncCallback<void> } callback - The callback of addSlots.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function addSlots(slots: Array<NotificationSlot>, callback: AsyncCallback<void>): void;

  /**
   * Creates a notification slot.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { Array<NotificationSlot> } slots - Indicates the notification slots to be created, which is set by {@link NotificationSlot}.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function addSlots(slots: Array<NotificationSlot>): Promise<void>;

  /**
   * Obtains a notification slot of the specified slot type.
   * @param { SlotType } slotType - Type of the notification slot to obtain.
   * @param { AsyncCallback<NotificationSlot> } callback - The callback is used to return the NotificationSlot.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function getSlot(slotType: SlotType, callback: AsyncCallback<NotificationSlot>): void;

  /**
   * Obtains a notification slot of the specified slot type.
   * @param { SlotType } slotType - Type of the notification slot to obtain.
   * @returns { Promise<NotificationSlot> } Returns the NotificationSlot.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function getSlot(slotType: SlotType): Promise<NotificationSlot>;

  /**
   * Obtains all NotificationSlot objects created by the current application.
   * @param { AsyncCallback<Array<NotificationSlot>> } callback - The callback is used to return all notification slots of this application.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function getSlots(callback: AsyncCallback<Array<NotificationSlot>>): void;

  /**
   * Obtains all NotificationSlot objects created by the current application.
   * @returns { Promise<Array<NotificationSlot>> } Returns all notification slots of this application.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function getSlots(): Promise<Array<NotificationSlot>>;

  /**
   * Removes a NotificationSlot of the specified SlotType created by the current application.
   * @param { SlotType } slotType - Type of the NotificationSlot to remove.
   * @param { AsyncCallback<void> } callback - The callback of removeSlot.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function removeSlot(slotType: SlotType, callback: AsyncCallback<void>): void;

  /**
   * Removes a NotificationSlot of the specified SlotType created by the current application.
   * @param { SlotType } slotType - Type of the NotificationSlot to remove.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function removeSlot(slotType: SlotType): Promise<void>;

  /**
   * Removes all NotificationSlot objects created by the current application.
   * @param { AsyncCallback<void> } callback - The callback of removeAllSlots.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function removeAllSlots(callback: AsyncCallback<void>): void;

  /**
   * Removes all NotificationSlot objects created by the current application.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function removeAllSlots(): Promise<void>;

  /**
   * Set whether the application can send notifications.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { boolean } enable - Set enable or not.
   * @param { AsyncCallback<void> } callback - The callback of setNotificationEnable.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function setNotificationEnable(bundle: BundleOption, enable: boolean, callback: AsyncCallback<void>): void;

  /**
   * Set whether the application can send notifications.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { boolean } enable - Set enable or not.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function setNotificationEnable(bundle: BundleOption, enable: boolean): Promise<void>;

  /**
   * Checks whether this application allows to publish notifications.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { AsyncCallback<boolean> } callback - The callback of isNotificationEnabled.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function isNotificationEnabled(bundle: BundleOption, callback: AsyncCallback<boolean>): void;

  /**
   * Checks whether this application allows to publish notifications.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @returns { Promise<boolean> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function isNotificationEnabled(bundle: BundleOption): Promise<boolean>;

  /**
   * Checks whether this application allows to publish notifications.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { AsyncCallback<boolean> } callback - The callback of isNotificationEnabled.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function isNotificationEnabled(callback: AsyncCallback<boolean>): void;

  /**
   * Checks whether this application allows to publish notifications.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @returns { Promise<boolean> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function isNotificationEnabled(): Promise<boolean>;

  /**
   * Checks whether this application allows to publish notifications under the user.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { number } userId - The userid of the representative.
   * @param { AsyncCallback<boolean> } callback - The callback of isNotificationEnabled.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function isNotificationEnabled(userId: number, callback: AsyncCallback<boolean>): void;

  /**
   * Checks whether this application allows to publish notifications under the user.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { number } userId - The userid of the representative.
   * @returns { Promise<boolean> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function isNotificationEnabled(userId: number): Promise<boolean>;

  /**
   * Sets whether to allow the specified application to show badge.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { boolean } enable - Set enable or not.
   * @param { AsyncCallback<void> } callback - The callback of displayBadge.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function displayBadge(bundle: BundleOption, enable: boolean, callback: AsyncCallback<void>): void;

  /**
   * Sets whether to allow the specified application to show badge.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { boolean } enable - Set enable or not.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function displayBadge(bundle: BundleOption, enable: boolean): Promise<void>;

  /**
   * Obtains the flag that whether to allow the application to show badge.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { AsyncCallback<boolean> } callback - The callback of isBadgeDisplayed.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function isBadgeDisplayed(bundle: BundleOption, callback: AsyncCallback<boolean>): void;

  /**
   * Obtains the flag that whether to allow the application to show badge.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @returns { Promise<boolean> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function isBadgeDisplayed(bundle: BundleOption): Promise<boolean>;

  /**
   * Update all notification slots for the specified bundle.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { NotificationSlot } slot - Indicates the notification slot.
   * @param { AsyncCallback<void> } callback - The callback of setSlotByBundle.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function setSlotByBundle(bundle: BundleOption, slot: NotificationSlot, callback: AsyncCallback<void>): void;

  /**
   * Update all notification slots for the specified bundle.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { NotificationSlot } slot - Indicates the notification slot.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function setSlotByBundle(bundle: BundleOption, slot: NotificationSlot): Promise<void>;

  /**
   * Obtains all notification slots belonging to the specified bundle.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { AsyncCallback<Array<NotificationSlot>> } callback - The callback of getSlotsByBundle.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function getSlotsByBundle(bundle: BundleOption, callback: AsyncCallback<Array<NotificationSlot>>): void;

  /**
   * Obtains all notification slots belonging to the specified bundle.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @returns { Promise<Array<NotificationSlot>> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function getSlotsByBundle(bundle: BundleOption): Promise<Array<NotificationSlot>>;

  /**
   * Obtains number of slot.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { AsyncCallback<number> } callback - The callback of getSlotNumByBundle.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function getSlotNumByBundle(bundle: BundleOption, callback: AsyncCallback<number>): void;

  /**
   * Obtains number of slot.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @returns { Promise<number> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function getSlotNumByBundle(bundle: BundleOption): Promise<number>;

  /**
   * Obtains all active notifications in the current system. The caller must have system permissions to
   * call this method.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { AsyncCallback<Array<NotificationRequest>> } callback - The callback of getAllActiveNotifications.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function getAllActiveNotifications(callback: AsyncCallback<Array<NotificationRequest>>): void;

  /**
   * Obtains all active notifications in the current system. The caller must have system permissions to
   * call this method.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @returns { Promise<Array<NotificationRequest>> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function getAllActiveNotifications(): Promise<Array<NotificationRequest>>;

  /**
   * Obtains the number of all active notifications.
   * @param { AsyncCallback<number> } callback - The callback of getActiveNotificationCount.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function getActiveNotificationCount(callback: AsyncCallback<number>): void;

  /**
   * Obtains the number of all active notifications.
   * @returns { Promise<number> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function getActiveNotificationCount(): Promise<number>;

  /**
   * Obtains an array of active notifications.
   * @param { AsyncCallback<Array<NotificationRequest>> } callback - The callback of getActiveNotifications.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function getActiveNotifications(callback: AsyncCallback<Array<NotificationRequest>>): void;

  /**
   * Obtains an array of active notifications.
   * @returns { Promise<Array<NotificationRequest>> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function getActiveNotifications(): Promise<Array<NotificationRequest>>;

  /**
   * Cancel the notification of a specified group for this application.
   * @param { string } groupName - The name of the group.
   * @param { AsyncCallback<void> } callback - The callback of cancelGroup.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function cancelGroup(groupName: string, callback: AsyncCallback<void>): void;

  /**
   * Cancel the notification of a specified group for this application.
   * @param { string } groupName - The name of the group.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function cancelGroup(groupName: string): Promise<void>;

  /**
   * Delete the notification of a specified group for this application.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { string } groupName - The name of the group.
   * @param { AsyncCallback<void> } callback - The callback of removeGroupByBundle.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function removeGroupByBundle(bundle: BundleOption, groupName: string, callback: AsyncCallback<void>): void;

  /**
   * Delete the notification of a specified group for this application.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { string } groupName - The name of the group.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function removeGroupByBundle(bundle: BundleOption, groupName: string): Promise<void>;

  /**
   * Set the Do Not Disturb date.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { DoNotDisturbDate } date - The Do Not Disturb date.
   * @param { AsyncCallback<void> } callback - The callback of setDoNotDisturbDate.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function setDoNotDisturbDate(date: DoNotDisturbDate, callback: AsyncCallback<void>): void;

  /**
   * Set the Do Not Disturb date.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { DoNotDisturbDate } date - The Do Not Disturb date.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function setDoNotDisturbDate(date: DoNotDisturbDate): Promise<void>;

  /**
   * Set the Do Not Disturb date under the specified user.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { DoNotDisturbDate } date - The Do Not Disturb date.
   * @param { number } userId - The userId.
   * @param { AsyncCallback<void> } callback - The callback of setDoNotDisturbDate.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function setDoNotDisturbDate(date: DoNotDisturbDate, userId: number, callback: AsyncCallback<void>): void;

  /**
   * Set the Do Not Disturb date under the specified user.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { DoNotDisturbDate } date - The Do Not Disturb date.
   * @param { number } userId - The userId.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function setDoNotDisturbDate(date: DoNotDisturbDate, userId: number): Promise<void>;

  /**
   * Obtains the Do Not Disturb date.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { AsyncCallback<DoNotDisturbDate> } callback - The callback is used to return the Do Not Disturb date.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function getDoNotDisturbDate(callback: AsyncCallback<DoNotDisturbDate>): void;

  /**
   * Obtains the Do Not Disturb date.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @returns { Promise<DoNotDisturbDate> } Returns the Do Not Disturb date.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function getDoNotDisturbDate(): Promise<DoNotDisturbDate>;

  /**
   * Obtains the Do Not Disturb date.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { number } userId - The userId.
   * @param { AsyncCallback<DoNotDisturbDate> } callback - The callback is used to return the Do Not Disturb date.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function getDoNotDisturbDate(userId: number, callback: AsyncCallback<DoNotDisturbDate>): void;

  /**
   * Obtains the Do Not Disturb date.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { number } userId - The userId.
   * @returns { Promise<DoNotDisturbDate> } Returns the Do Not Disturb date.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function getDoNotDisturbDate(userId: number): Promise<DoNotDisturbDate>;

  /**
   * Obtains whether to support the Do Not Disturb mode.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { AsyncCallback<boolean> } callback - The callback is used to return whether Do Not Disturb mode is supported.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function isSupportDoNotDisturbMode(callback: AsyncCallback<boolean>): void;

  /**
   * Obtains whether to support the Do Not Disturb mode.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @returns { Promise<boolean> } Returns whether Do Not Disturb mode is supported.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function isSupportDoNotDisturbMode(): Promise<boolean>;

  /**
   * Obtains whether the template is supported by the system.
   * @param templateName Name of template to be Obtained.
   * @param { AsyncCallback<boolean> } callback - The callback is used to return whether the template is supported.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function isSupportTemplate(templateName: string, callback: AsyncCallback<boolean>): void;

  /**
   * Obtains whether the template is supported by the system.
   * @param templateName Name of template to be Obtained.
   * @returns { Promise<boolean> } Returns whether the template is supported.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function isSupportTemplate(templateName: string): Promise<boolean>;

  /**
   * Request permission to send notification.
   * @param { AsyncCallback<void> } callback - The callback of requestEnableNotification.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function requestEnableNotification(callback: AsyncCallback<void>): void;

  /**
   * Request permission to send notification.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function requestEnableNotification(): Promise<void>;

  /**
   * Sets whether the device supports distributed notification.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { boolean } enable - Set enable or not.
   * @param { AsyncCallback<void> } callback - The callback of setDistributedEnable.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function setDistributedEnable(enable: boolean, callback: AsyncCallback<void>): void;

  /**
   * Sets whether the device supports distributed notification.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { boolean } enable - Set enable or not.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function setDistributedEnable(enable: boolean): Promise<void>;

  /**
   * Obtains whether the device supports distributed notification.
   * @param { AsyncCallback<boolean> } callback - The callback is used to return whether the distributed notification is supported.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function isDistributedEnabled(callback: AsyncCallback<boolean>): void;

  /**
   * Obtains whether the device supports distributed notification.
   * @returns { Promise<boolean> } Returns whether the distributed notification is supported.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  function isDistributedEnabled(): Promise<boolean>;

  /**
   * Sets whether an application supports distributed notification.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { boolean } enable - Set enable or not.
   * @param { AsyncCallback<void> } callback - The callback of setDistributedEnableByBundle.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function setDistributedEnableByBundle(bundle: BundleOption, enable: boolean, callback: AsyncCallback<void>): void;

  /**
   * Sets whether an application supports distributed notification.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { boolean } enable - Set enable or not.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function setDistributedEnableByBundle(bundle: BundleOption, enable: boolean): Promise<void>;

  /**
   * Obtains whether an application supports distributed notification.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { AsyncCallback<boolean> } callback - The callback is used to return whether the distributed notification is supported.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function isDistributedEnabledByBundle(bundle: BundleOption, callback: AsyncCallback<boolean>): void;

  /**
   * Obtains whether an application supports distributed notification.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @returns { Promise<boolean> } Returns whether the distributed notification is supported.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function isDistributedEnabledByBundle(bundle: BundleOption): Promise<boolean>;

  /**
   * Obtains the remind modes of the notification.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { AsyncCallback<DeviceRemindType> } callback - The callback is used to return the RemindType.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function getDeviceRemindType(callback: AsyncCallback<DeviceRemindType>): void;

  /**
   * Obtains the remind modes of the notification.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @returns { Promise<DeviceRemindType> } Returns the RemindType.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function getDeviceRemindType(): Promise<DeviceRemindType>;

  /**
   * Set whether the application slot is enabled.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { SlotType } type - Type of the notification slot.
   * @param { boolean } enable - Set enable or not.
   * @param { AsyncCallback<void> } callback - The callback of setNotificationEnableSlot.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function setNotificationEnableSlot(bundle: BundleOption, type: SlotType, enable: boolean, callback: AsyncCallback<void>): void;

  /**
   * Set whether the application slot is enabled.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { SlotType } type - Type of the notification slot.
   * @param { boolean } enable - Set enable or not.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function setNotificationEnableSlot(bundle: BundleOption, type: SlotType, enable: boolean): Promise<void>;

  /**
   * Obtains whether the application slot is enabled.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { SlotType } type - Type of the notification slot.
   * @param { AsyncCallback<boolean> } callback - The callback is used to return whether the application slot is enabled.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function isNotificationSlotEnabled(bundle: BundleOption, type: SlotType, callback: AsyncCallback<boolean>): void;

  /**
   * Obtains whether the application slot is enabled.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { BundleOption } bundle - The bundle option.
   * @param { SlotType } type - Type of the notification slot.
   * @returns { Promise<boolean> } Returns whether the application slot is enabled.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function isNotificationSlotEnabled(bundle: BundleOption, type: SlotType): Promise<boolean>;

  /**
   * Set whether to sync notifications to devices that do not have the app installed.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { number } userId - The userId.
   * @param { boolean } enable - Set enable or not.
   * @param { AsyncCallback<void> } callback - The callback of setSyncNotificationEnabledWithoutApp.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function setSyncNotificationEnabledWithoutApp(userId: number, enable: boolean, callback: AsyncCallback<void>): void;

  /**
   * Set whether to sync notifications to devices that do not have the app installed.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { number } userId - The userId.
   * @param { boolean } enable - Set enable or not.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function setSyncNotificationEnabledWithoutApp(userId: number, enable: boolean): Promise<void>;

  /**
   * Obtains whether to sync notifications to devices that do not have the app installed.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { number } userId - The userId.
   * @param { AsyncCallback<boolean> } callback - The callback is used to return whether to sync notifications to devices.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function getSyncNotificationEnabledWithoutApp(userId: number, callback: AsyncCallback<boolean>): void;

  /**
   * Obtains whether to sync notifications to devices that do not have the app installed.
   * @permission ohos.permission.NOTIFICATION_CONTROLLER
   * @param { number } userId - The userId.
   * @returns { Promise<boolean> } Returns whether to sync notifications to devices.
   * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  function getSyncNotificationEnabledWithoutApp(userId: number): Promise<boolean>;

  /**
   * Describes NotificationSlot types.
   * @enum { number }
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  export enum SlotType {
    /**
     * NotificationSlot of an unknown type.
     */
    UNKNOWN_TYPE = 0,

    /**
     * NotificationSlot for social communication.
     */
    SOCIAL_COMMUNICATION = 1,

    /**
     * NotificationSlot for service information.
     */
    SERVICE_INFORMATION = 2,

    /**
     * NotificationSlot for content information.
     */
    CONTENT_INFORMATION = 3,

    /**
     * NotificationSlot for other purposes.
     */
    OTHER_TYPES = 0xFFFF,
  }

  /**
   * Describes notification content types.
   * @enum { number }
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  export enum ContentType {
    /**
     * Normal text notification.
     */
    NOTIFICATION_CONTENT_BASIC_TEXT,

    /**
     * Long text notification.
     */
    NOTIFICATION_CONTENT_LONG_TEXT,

    /**
     * Picture-attached notification.
     */
    NOTIFICATION_CONTENT_PICTURE,

    /**
     * Conversation notification.
     */
    NOTIFICATION_CONTENT_CONVERSATION,

    /**
     * Multi-line text notification.
     */
    NOTIFICATION_CONTENT_MULTILINE,
  }

  /**
   * Indicates the level of the slot
   * @enum { number }
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  export enum SlotLevel {
    /**
     * Indicates that the notification function is disabled.
     */
    LEVEL_NONE = 0,

    /**
     * Indicates that the notification function is enabled but notification
     * icons are not displayed in the status bar, with no banner or prompt tone.
     */
    LEVEL_MIN = 1,

    /**
     * Indicates that the notification function is enabled and notification
     * icons are displayed in the status bar, with no banner or prompt tone.
     */
    LEVEL_LOW = 2,

    /**
     * Indicates that the notification function is enabled and notification
     * icons are displayed in the status bar, with no banner but with a prompt tone.
     */
    LEVEL_DEFAULT = 3,

    /**
     * Indicates that the notification function is enabled and notification
     * icons are displayed in the status bar, with a banner and a prompt tone.
     */
    LEVEL_HIGH = 4,
  }

  /**
   * The type of the Do Not Disturb.
   * @enum { number }
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  export enum DoNotDisturbType {
    /**
     * Non do not disturb type notification
     */
    TYPE_NONE = 0,

    /**
     * Execute do not disturb once in the set time period (only watch hours and minutes)
     */
    TYPE_ONCE = 1,

    /**
     * Execute do not disturb every day with a set time period (only watch hours and minutes)
     */
    TYPE_DAILY = 2,

    /**
     * Execute in the set time period (specify the time, month, day and hour)
     */
    TYPE_CLEARLY = 3,
  }

  /**
   * Describes a DoNotDisturbDate instance.
   * @typedef DoNotDisturbDate
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  export interface DoNotDisturbDate {
    /**
     * the type of the Do Not Disturb.
     *
     */
    type: DoNotDisturbType;

    /**
     * the start time of the Do Not Disturb.
     *
     */
    begin: Date;

    /**
     * the end time of the Do Not Disturb.
     *
     */
    end: Date;
  }

  /**
   * The remind type of the notification.
   * @enum { number }
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  export enum DeviceRemindType {
    /**
     * The device is not in use, no reminder
     */
    IDLE_DONOT_REMIND = 0,

    /**
     * The device is not in use, remind
     */
    IDLE_REMIND = 1,

    /**
     * The device is in use, no reminder
     */
    ACTIVE_DONOT_REMIND = 2,

    /**
     * The device is in use, reminder
     */
    ACTIVE_REMIND = 3,
  }

  /**
   * Notification source type
   * @enum { number }
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  export enum SourceType {
    /**
     * General notification
     */
    TYPE_NORMAL = 0,

    /**
     * Continuous notification
     */
    TYPE_CONTINUOUS = 1,

    /**
     * Scheduled notification
     */
    TYPE_TIMER = 2,
  }

  /**
   * Describes a bundleOption in a notification.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  export type BundleOption = _BundleOption

  /**
   * Describes an action button displayed in a notification.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  export type NotificationActionButton = _NotificationActionButton

  /**
   * Describes a normal text notification.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  export type NotificationBasicContent = _NotificationBasicContent

  /**
   * Describes notification types.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  export type NotificationContent = _NotificationContent

  /**
   * Describes a long text notification.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  export type NotificationLongTextContent = _NotificationLongTextContent

  /**
   * Describes a multi-line text notification.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  export type NotificationMultiLineContent = _NotificationMultiLineContent

  /**
   * Describes a picture-attached notification.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  export type NotificationPictureContent = _NotificationPictureContent

  /**
   * Describes a NotificationFlags instance.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  export type NotificationFlags = _NotificationFlags

  /**
   * The status of the notification flag.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  export type NotificationFlagStatus = _NotificationFlagStatus

  /**
   * Defines a NotificationRequest instance.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  export type NotificationRequest = _NotificationRequest

  /**
   * Describes distributed options.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  export type DistributedOptions = _DistributedOptions

  /**
   * Describes a NotificationSlot instance.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  export type NotificationSlot = _NotificationSlot

  /**
   * Provides sorting information about an active notification.
   * @syscap SystemCapability.Notification.Notification
   * @systemapi
   * @since 9
   */
  export type NotificationSorting = _NotificationSorting

  /**
   * Describes a NotificationTemplate instance.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  export type NotificationTemplate = _NotificationTemplate

  /**
   * Describes a NotificationUserInput instance.
   * @syscap SystemCapability.Notification.Notification
   * @since 9
   */
  export type NotificationUserInput = _NotificationUserInput
}

export default notificationManager;
