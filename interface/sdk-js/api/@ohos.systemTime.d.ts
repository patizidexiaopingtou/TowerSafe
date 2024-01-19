/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
 * @since 7
 * @syscap SystemCapability.MiscServices.Time
 * @deprecated since 9
 * @useinstead ohos.systemDateTime
 */
declare namespace systemTime {
    /**
     * Sets the system time.
     * @permission ohos.permission.SET_TIME
     * @param time Target time stamp (ms)
     * @throws { BusinessError } -1 - the parameter check failed or permission denied or system error.
     * @since 7
     * @deprecated since 9
     */
    function setTime(time : number, callback : AsyncCallback<void>) : void;
    function setTime(time : number) : Promise<void>;

    /**
     * Obtains the number of milliseconds that have elapsed since the Unix epoch.
     * @throws { BusinessError } -1 - the parameter check failed or system error.
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.systemDateTime/systemDateTime.getCurrentTime
     */
    function getCurrentTime(isNano: boolean, callback: AsyncCallback<number>): void;
    function getCurrentTime(callback: AsyncCallback<number>): void;
    function getCurrentTime(isNano?: boolean): Promise<number>;

    /**
     * Obtains the number of milliseconds elapsed since the system was booted, not including deep sleep time.
     * @throws { BusinessError } -1 - the parameter check failed or system error.
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.systemDateTime/systemDateTime.getRealActiveTime
     */
    function getRealActiveTime(isNano: boolean, callback: AsyncCallback<number>): void;
    function getRealActiveTime(callback: AsyncCallback<number>): void;
    function getRealActiveTime(isNano?: boolean): Promise<number>;

    /**
     * Obtains the number of milliseconds elapsed since the system was booted, including deep sleep time.
     * @throws { BusinessError } -1 - the parameter check failed or system error.
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.systemDateTime/systemDateTime.getRealTime
     */
    function getRealTime(isNano: boolean, callback: AsyncCallback<number>): void;
    function getRealTime(callback: AsyncCallback<number>): void;
    function getRealTime(isNano?: boolean): Promise<number>;

    /**
     * Sets the system time.
     * @permission ohos.permission.SET_TIME
     * @param date The target date
     * @throws { BusinessError } -1 - the parameter check failed or permission denied or system error.
     * @since 7
     * @deprecated since 9
     */
    function setDate(date: Date, callback: AsyncCallback<void>): void;
    function setDate(date: Date): Promise<void>;

    /**
     * Obtains the system date.
     * @throws { BusinessError } -1 - the parameter check failed or system error.
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.systemDateTime/systemDateTime.getDate
     */
    function getDate(callback: AsyncCallback<Date>): void;
    function getDate(): Promise<Date>;

    /**
     * Sets the system time zone.
     * @permission ohos.permission.SET_TIME_ZONE
     * @param timezone The system time zone
     * @throws { BusinessError } -1 - the parameter check failed or permission denied or system error.
     * @since 7
     * @deprecated since 9
     */
    function setTimezone(timezone: string, callback: AsyncCallback<void>): void;
    function setTimezone(timezone: string): Promise<void>;

    /**
     * Obtains the system time zone.
     * @throws { BusinessError } -1 - the parameter check failed or system error.
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.systemDateTime/systemDateTime.getTimezone
     */
    function getTimezone(callback: AsyncCallback<string>): void;
    function getTimezone(): Promise<string>;
}

export default systemTime;
