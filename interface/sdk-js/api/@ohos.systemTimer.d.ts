/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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

import { AsyncCallback, ErrorCallback } from './basic';
import { WantAgent } from './@ohos.wantAgent';

/**
 * Provides js api for systemTimer
 *
 * @syscap SystemCapability.MiscServices.Time
 * @systemapi Hide this for inner system use.
 * @since 7
 */
declare namespace systemTimer {
  /**
   * Indicates the timing policy the timer use, which can be REALTIME or UTC.
   *
   * @constant
   * @syscap SystemCapability.MiscServices.Time
   * @systemapi Hide this for inner system use.
   * @since 7
   */
  const TIMER_TYPE_REALTIME: number;

  /**
   * Describes whether a timer will wake the device up.
   *
   * @constant
   * @syscap SystemCapability.MiscServices.Time
   * @systemapi Hide this for inner system use.
   * @since 7
   */
  const TIMER_TYPE_WAKEUP: number;

  /**
   * Describes whether a timer will be delivered precisely at a scheduled time.
   *
   * @constant
   * @syscap SystemCapability.MiscServices.Time
   * @systemapi Hide this for inner system use.
   * @since 7
   */
  const TIMER_TYPE_EXACT: number;

  /**
   * Indicates whether the timer waking up the system is supported in low-power mode.
   *
   * @constant
   * @syscap SystemCapability.MiscServices.Time
   * @systemapi Hide this for inner system use.
   * @since 7
   */
  const TIMER_TYPE_IDLE: number;

  /**
   * Creates a timer.
   *
   * @param options Indicates the timer options.
   * @param { TimerOptions } options - The necessary configuration information.
   * @param { AsyncCallback<number> } callback - {number} is the timer ID.
   * @throws { BusinessError } 202 - permission denied.
   * @throws { BusinessError } 401 - if the parameter type is incorrect.
   * @syscap SystemCapability.MiscServices.Time
   * @systemapi Hide this for inner system use.
   * @since 7
   */
  function createTimer(options: TimerOptions, callback: AsyncCallback<number>): void;

  /**
   * Creates a timer.
   *
   * @param options Indicates the timer options.
   * @param { TimerOptions } options - The necessary configuration information.
   * @returns { Promise<number> } the timer ID.
   * @throws { BusinessError } 202 - permission denied.
   * @throws { BusinessError } 401 - if the parameter type is incorrect.
   * @syscap SystemCapability.MiscServices.Time
   * @systemapi Hide this for inner system use.
   * @since 7
   */
  function createTimer(options: TimerOptions): Promise<number>;

  /**
   * Starts a timer.
   *
   * @param { number } timer - The timer ID.
   * @param { number } triggerTime - Indicates the time at which the timer is triggered for the first time, in milliseconds.
   *                   The time will be automatically set to 5000 milliseconds after the current time if the passed
   *                   value is smaller than the current time plus 5000 milliseconds.
   * @param { AsyncCallback<void> } callback - The callback function.
   * @throws { BusinessError } 202 - permission denied.
   * @throws { BusinessError } 401 - if the parameter type is incorrect.
   * @syscap SystemCapability.MiscServices.Time
   * @systemapi Hide this for inner system use.
   * @since 7
   */
  function startTimer(timer: number, triggerTime: number, callback: AsyncCallback<void>): void;

  /**
   * Starts a timer.
   *
   * @param { number } timer - The timer ID.
   * @param { number } triggerTime - Indicates the time at which the timer is triggered for the first time, in milliseconds.
   *                   The time will be automatically set to 5000 milliseconds after the current time if the passed
   *                   value is smaller than the current time plus 5000 milliseconds.
   * @returns { Promise<void> } return a promise object.
   * @throws { BusinessError } 202 - permission denied.
   * @throws { BusinessError } 401 - if the parameter type is incorrect.
   * @syscap SystemCapability.MiscServices.Time
   * @systemapi Hide this for inner system use.
   * @since 7
   */
  function startTimer(timer: number, triggerTime: number): Promise<void>;

  /**
   * Stops a timer.
   *
   * @param { number } timer - The timer ID.
   * @param { AsyncCallback<void> } callback - The callback function.
   * @throws { BusinessError } 202 - permission denied.
   * @throws { BusinessError } 401 - if the parameter type is incorrect.
   * @syscap SystemCapability.MiscServices.Time
   * @systemapi Hide this for inner system use.
   * @since 7
   */
  function stopTimer(timer: number, callback: AsyncCallback<void>): void;

  /**
   * Stops a timer.
   *
   * @param { number } timer - The timer ID.
   * @returns { Promise<void> } return a promise object.
   * @throws { BusinessError } 202 - permission denied.
   * @throws { BusinessError } 401 - if the parameter type is incorrect.
   * @syscap SystemCapability.MiscServices.Time
   * @systemapi Hide this for inner system use.
   * @since 7
   */
  function stopTimer(timer: number): Promise<void>;

  /**
   * Destroy a timer.
   *
   * @param { number } timer - The timer ID.
   * @param { AsyncCallback<void> } callback - The callback function.
   * @throws { BusinessError } 202 - permission denied.
   * @throws { BusinessError } 401 - if the parameter type is incorrect.
   * @syscap SystemCapability.MiscServices.Time
   * @systemapi Hide this for inner system use.
   * @since 7
   */
  function destroyTimer(timer: number, callback: AsyncCallback<void>): void;

  /**
   * Destroy a timer.
   *
   * @param { number } timer - The timer ID.
   * @returns { Promise<void> } return a promise object.
   * @throws { BusinessError } 202 - permission denied.
   * @throws { BusinessError } 401 - if the parameter type is incorrect.
   * @syscap SystemCapability.MiscServices.Time
   * @systemapi Hide this for inner system use.
   * @since 7
   */
  function destroyTimer(timer: number): Promise<void>;

  /**
   * When the repeat is false,the interval is not needed, choose one of wantAgent and callback.
   * When the repeat is true,the interval is required, the wantAgent is required, and the callback can be left blank.
   *
   * @syscap SystemCapability.MiscServices.Time
   * @systemapi Hide this for inner system use.
   * @since 7
   */
  interface TimerOptions {
    /**
     * The timer type.
     *
     * @syscap SystemCapability.MiscServices.Time
     * @systemapi Hide this for inner system use.
     * @since 7
     */
    type: number;

    /**
     * Indicates a repeating timer
     *
     * @syscap SystemCapability.MiscServices.Time
     * @systemapi Hide this for inner system use.
     * @since 7
     */
    repeat: boolean;

    /**
     * Indicates the interval between two consecutive triggers, in milliseconds.
     * The interval will be set to 5000 milliseconds automatically if the passed value is smaller than 5000.
     *
     * @syscap SystemCapability.MiscServices.Time
     * @systemapi Hide this for inner system use.
     * @since 7
     */
    interval?: number;

    /**
     * Indicates the intent to send when the timer goes off.
     *
     * @syscap SystemCapability.MiscServices.Time
     * @systemapi Hide this for inner system use.
     * @since 7
     */
    wantAgent?: WantAgent;

    /**
     * Called back when the timer goes off.
     *
     * @syscap SystemCapability.MiscServices.Time
     * @systemapi Hide this for inner system use.
     * @since 7
     */
    callback?: () => void;
  }
}

export default systemTimer;