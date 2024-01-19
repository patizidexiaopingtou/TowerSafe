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

import { AsyncCallback } from './basic';

/**
 * System time and timezone.
 * @since 9
 * @syscap SystemCapability.MiscServices.Time
 */
declare namespace systemDateTime {
    /**
     * Sets the system time.
     * @param { number } time - Indicates the target timestamp(in milliseconds)
     * @param { AsyncCallback<void> } callback - The callback of setTime
     * @throws { BusinessError } 202 - Permission denied, Non system application use system APIs
     * @throws { BusinessError } 401 - Invalid parameters
     * @since 9
     * @systemapi Hide this for inner system use
     */
    function setTime(time : number, callback : AsyncCallback<void>) : void;
    /**
     * Sets the system time.
     * @param { number } time - Indicates the target timestamp(in milliseconds)
     * @returns { Promise<void> } The promise returned by the function
     * @throws { BusinessError } 202 - Permission denied, Non system application use system APIs
     * @throws { BusinessError } 401 - Invalid parameters
     * @since 9
     * @systemapi Hide this for inner system use
     */
    function setTime(time : number) : Promise<void>;

    /**
     * Obtains the number of milliseconds that have elapsed since the Unix epoch.
     * @param { boolean } isNano - True if the result is in nanoseconds. Otherswise in milliseconds
     * @param { AsyncCallback<number> } callback - The callback of getCurrentTime
     * @throws { BusinessError } 401 - Invalid parameters
     * @since 9
     */
    function getCurrentTime(isNano: boolean, callback: AsyncCallback<number>): void;

    /**
     * Obtains the number of milliseconds that have elapsed since the Unix epoch.
     * @param { AsyncCallback<number> } callback - The callback of getCurrentTime
     * @throws { BusinessError } 401 - Invalid parameters
     * @since 9
     */
    function getCurrentTime(callback: AsyncCallback<number>): void;

    /**
     * Obtains the number of milliseconds that have elapsed since the Unix epoch.
     * @param { boolean } isNano - True if the result is in nanoseconds. Otherswise in milliseconds
     * @throws { BusinessError } 401 - Invalid parameters
     * @returns { Promise<number> } The promise returned by the function
     * @since 9
     */
    function getCurrentTime(isNano?: boolean): Promise<number>;

    /**
     * Obtains the number of milliseconds elapsed since the system was booted, not including deep sleep time.
     * @param { boolean } isNano - True if the result is in nanoseconds. Otherswise in milliseconds
     * @param { AsyncCallback<number> } callback - The callback of getRealActiveTime
     * @throws { BusinessError } 401 - Invalid parameters
     * @since 9
     */
    function getRealActiveTime(isNano: boolean, callback: AsyncCallback<number>): void;

    /**
     * Obtains the number of milliseconds elapsed since the system was booted, not including deep sleep time.
     * @param { AsyncCallback<number> } callback - The callback of getRealActiveTime
     * @throws { BusinessError } 401 - Invalid parameters
     * @since 9
     */
    function getRealActiveTime(callback: AsyncCallback<number>): void;

    /**
     * Obtains the number of milliseconds elapsed since the system was booted, not including deep sleep time.
     * @param { boolean } [isNano] - True if the result is in nanoseconds. Otherswise in milliseconds
     * @returns { Promise<number> } The promise returned by the function
     * @throws { BusinessError } 401 - Invalid parameters
     * @since 9
     */
    function getRealActiveTime(isNano?: boolean): Promise<number>;

    /**
     * Obtains the number of milliseconds elapsed since the system was booted, including deep sleep time.
     * @param { boolean } isNano - True if the result is in nanoseconds. Otherswise in milliseconds
     * @param { AsyncCallback<number> } callback - The callback of getRealTime
     * @throws { BusinessError } 401 - Invalid parameters
     * @since 9
     */
    function getRealTime(isNano: boolean, callback: AsyncCallback<number>): void;

    /**
     * Obtains the number of milliseconds elapsed since the system was booted, including deep sleep time.
     * @param { AsyncCallback<number> } callback - The callback of getRealTime
     * @throws { BusinessError } 401 - Invalid parameters
     * @since 9
     */
    function getRealTime(callback: AsyncCallback<number>): void;

    /**
     * Obtains the number of milliseconds elapsed since the system was booted, including deep sleep time.
     * @param { boolean } [isNano] - True if the result is in nanoseconds. Otherswise in milliseconds
     * @returns { Promise<number> } The promise returned by the function
     * @throws { BusinessError } 401 - Invalid parameters
     * @since 9
     */
    function getRealTime(isNano?: boolean): Promise<number>;

    /**
     * Sets the system time.
     * @param { Date } date - The target date
     * @param { AsyncCallback<void> } callback - The callback of setDate
     * @throws { BusinessError } 202 - Permission denied, Non system application use system APIs
     * @throws { BusinessError } 401 - Invalid parameters
     * @since 9
     * @systemapi Hide this for inner system use
     */
    function setDate(date: Date, callback: AsyncCallback<void>): void;

    /**
     * Sets the system time.
     * @param { Date } date - The target date
     * @returns { Promise<void> } The promise returned by the function
     * @throws { BusinessError } 202 - Permission denied, Non system application use system APIs
     * @throws { BusinessError } 401 - Invalid parameters
     * @since 9
     * @systemapi Hide this for inner system use
     */
    function setDate(date: Date): Promise<void>;

    /**
     * Obtains the system date.
     * @param { AsyncCallback<Date> } callback - The callback of getDate
     * @throws { BusinessError } 401 - Invalid parameters
     * @since 9
     */
    function getDate(callback: AsyncCallback<Date>): void;

    /**
     * Obtains the system date.
     * @returns { Promise<Date> } The promise returned by the function
     * @throws { BusinessError } 401 - Invalid parameters
     * @since 9
     */
    function getDate(): Promise<Date>;

    /**
     * Sets the system time zone.
     * @param { string } timezone - The system time zone
     * @param { AsyncCallback<void> } callback - The callback of setTimezone
     * @throws { BusinessError } 202 - Permission denied, Non system application use system APIs
     * @throws { BusinessError } 401 - Invalid parameters
     * @since 9
     * @systemapi Hide this for inner system use
     */
    function setTimezone(timezone: string, callback: AsyncCallback<void>): void;

    /**
     * Sets the system time zone.
     * @param { string } timezone -  The system time zone
     * @returns { Promise<void> } The promise returned by the function
     * @throws { BusinessError } 202 - Permission denied, Non system application use system APIs
     * @throws { BusinessError } 401 - Invalid parameters
     * @since 9
     * @systemapi Hide this for inner system use
     */
    function setTimezone(timezone: string): Promise<void>;

    /**
     * Obtains the system time zone.
     * @param { AsyncCallback<string> } callback - The callback of getTimezone
     * @throws { BusinessError } 401 - Invalid parameters
     * @since 9
     */
    function getTimezone(callback: AsyncCallback<string>): void;

    /**
     * Obtains the system time zone.
     * @returns { Promise<string> } The promise returned by the function
     * @throws { BusinessError } 401 - Invalid parameters
     * @since 9
     */
    function getTimezone(): Promise<string>;
}

export default systemDateTime;