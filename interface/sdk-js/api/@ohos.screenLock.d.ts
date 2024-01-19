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
import { Callback } from './basic';

/**
 * systemScreenLock
 * @syscap SystemCapability.MiscServices.ScreenLock
 * @since 7
 */
declare namespace screenLock {

  /**
   * Checks whether the screen is currently locked.
   *
   * @returns Returns {@code true} if the screen is currently locked; returns {@code false} otherwise.
   * @syscap SystemCapability.MiscServices.ScreenLock
   * @since 7
   * @deprecated since 9
   */
  function isScreenLocked(callback: AsyncCallback<boolean>): void;

  /**
   * Checks whether the screen is currently locked.
   *
   * @returns Returns {@code true} if the screen is currently locked; returns {@code false} otherwise.
   * @syscap SystemCapability.MiscServices.ScreenLock
   * @since 7
   * @deprecated since 9
   */
  function isScreenLocked(): Promise<boolean>;

  /**
   * Checks whether the screen is currently locked.
   *
   * @returns Returns {@code true} if the screen is currently locked; returns {@code false} otherwise.
   * @throws {BusinessError} 202 - permission verification failed, application which is not a system application uses system API.
   * @syscap SystemCapability.MiscServices.ScreenLock
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  function isLocked(): boolean;

  /**
   * Checks whether the screen lock of the current device is secure.
   *
   * @returns Returns {@code true} if the screen lock of the current device is secure; returns {@code false} otherwise.
   * @syscap SystemCapability.MiscServices.ScreenLock
   * @since 7
   * @deprecated since 9
   */
  function isSecureMode(callback: AsyncCallback<boolean>): void;

  /**
   * Checks whether the screen lock of the current device is secure.
   *
   * @returns Returns {@code true} if the screen lock of the current device is secure; returns {@code false} otherwise.
   * @syscap SystemCapability.MiscServices.ScreenLock
   * @since 7
   * @deprecated since 9
   */
  function isSecureMode(): Promise<boolean>;

  /**
   * Unlock the screen.
   *
   * @syscap SystemCapability.MiscServices.ScreenLock
   * @since 7
   * @deprecated since 9
   */
  function unlockScreen(callback: AsyncCallback<void>): void;

  /**
   * Unlock the screen.
   *
   * @syscap SystemCapability.MiscServices.ScreenLock
   * @since 7
   * @deprecated since 9
   */
  function unlockScreen():Promise<void>;

  /**
   * Unlock the screen.
   *
   * @returns Returns {@code true} if the screen is unlocked successfully; returns {@code false} otherwise.
   * @throws {BusinessError} 401 - parameter error.
   * @throws {BusinessError} 202 - permission verification failed, application which is not a system application uses system API.
   * @throws {BusinessError} 13200002 - the screenlock management service is abnormal.
   * @syscap SystemCapability.MiscServices.ScreenLock
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  function unlock(callback: AsyncCallback<boolean>): void;

  /**
   * Unlock the screen.
   *
   * @returns Returns {@code true} if the screen is unlocked successfully; returns {@code false} otherwise.
   * @throws {BusinessError} 202 - permission verification failed, application which is not a system application uses system API.
   * @throws {BusinessError} 13200002 - the screenlock management service is abnormal.
   * @syscap SystemCapability.MiscServices.ScreenLock
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  function unlock():Promise<boolean>;

  /**
   * Lock the screen.
   *
   * @returns Returns {@code true} if the screen is locked successfully; returns {@code false} otherwise.
   * @throws {BusinessError} 401 - parameter error.
   * @throws {BusinessError} 13200002 - the screenlock management service is abnormal.
   * @syscap SystemCapability.MiscServices.ScreenLock
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  function lock(callback: AsyncCallback<boolean>): void;

  /**
   * Lock the screen.
   *
   * @returns Returns {@code true} if the screen is locked successfully; returns {@code false} otherwise.
   * @throws {BusinessError} 13200002 - the screenlock management service is abnormal.
   * @syscap SystemCapability.MiscServices.ScreenLock
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  function lock():Promise<boolean>;

  /**
   * Indicates the system event type related to the screenlock management service.
   *
   * @syscap SystemCapability.MiscServices.ScreenLock
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  type EventType =
      'beginWakeUp'
      | 'endWakeUp'
      | 'beginScreenOn'
      | 'endScreenOn'
      | 'beginScreenOff'
      | 'endScreenOff'
      | 'unlockScreen'
      | 'lockScreen'
      | 'beginExitAnimation'
      | 'beginSleep'
      | 'endSleep'
      | 'changeUser'
      | 'screenlockEnabled'
      | 'serviceRestart'

  /**
   * Indicates the system event type and parameter related to the screenlock management service.
   *
   * @syscap SystemCapability.MiscServices.ScreenLock
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  interface SystemEvent {
    eventType: EventType,
    params: string
  }

  /**
   * Register system event related to screen lock service.
   *
   * @param { Callback<SystemEvent> } callback - the callback function for indicating the system event related screen lock
   * @returns Returns {@code true} if register system event is success; returns {@code false} otherwise.
   * @throws {BusinessError} 401 - parameter error.
   * @throws {BusinessError} 13200002 - the screenlock management service is abnormal.
   * @syscap SystemCapability.MiscServices.ScreenLock
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  function onSystemEvent(callback: Callback<SystemEvent>): boolean;

  /**
   * The screen lock app sends the event to the screen lock service.
   *
   * @param { String } event - event type.
   * @param { number } parameter - operation result of the event.
   * @returns Returns {@code true} if screen lock app send event to screen lock service is success; returns {@code false} otherwise.
   * @throws {BusinessError} 401 - parameter error.
   * @throws {BusinessError} 13200002 - the screenlock management service is abnormal.
   * @syscap SystemCapability.MiscServices.ScreenLock
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  function sendScreenLockEvent(event: String, parameter: number, callback: AsyncCallback<boolean>): void;

  /**
   * The screen lock app sends the event to the screen lock service.
   *
   * @param { String } event - event type.
   * @param { number } parameter - operation result of the event.
   * @returns Returns {@code true} if screen lock app send event to screen lock service is success; returns {@code false} otherwise.
   * @throws {BusinessError} 401 - parameter error.
   * @throws {BusinessError} 13200002 - the screenlock management service is abnormal.
   * @syscap SystemCapability.MiscServices.ScreenLock
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  function sendScreenLockEvent(event: String, parameter: number): Promise<boolean>;
}

export default screenLock;