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

import { AsyncCallback } from './basic';

/**
 * Provides the event logging function for applications to log the fault, statistical, security,
 * and user behavior events reported during running. Based on event information,
 * you will be able to analyze the running status of applications.
 *
 * @since 7
 * @syscap SystemCapability.HiviewDFX.HiAppEvent
 * @deprecated since 9
 * @useinstead ohos.hiviewdfx.hiAppEvent
 */
declare namespace hiAppEvent {
    /**
     * Enumerate application event types.
     *
     * @since 7
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     */
    enum EventType {
        /**
         * Fault event.
         *
         * @since 7
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        FAULT = 1,

        /**
         * Statistic event.
         *
         * @since 7
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        STATISTIC = 2,

        /**
         * Security event.
         *
         * @since 7
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        SECURITY = 3,

        /**
         * User behavior event.
         *
         * @since 7
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        BEHAVIOR = 4
    }

    /**
     * Preset event.
     *
     * @since 7
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     */
    namespace Event {
        /**
         * User login event.
         *
         * @since 7
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        const USER_LOGIN: string;

        /**
         * User logout event.
         *
         * @since 7
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        const USER_LOGOUT: string;

        /**
         * Distributed service event.
         *
         * @since 7
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        const DISTRIBUTED_SERVICE_START: string;
    }

    /**
     * Preset param.
     *
     * @since 7
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     */
    namespace Param {
        /**
         * User id.
         *
         * @since 7
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        const USER_ID: string;

        /**
         * Distributed service name.
         *
         * @since 7
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        const DISTRIBUTED_SERVICE_NAME: string;

        /**
         * Distributed service instance id.
         *
         * @since 7
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        const DISTRIBUTED_SERVICE_INSTANCE_ID: string;
    }

    /**
     * Write application event.
     *
     * @since 7
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @static
     * @param {string} eventName Application event name.
     * @param {EventType} eventType Application event type.
     * @param {object} keyValues Application event key-value pair params.
     * @param {AsyncCallback} [callback] Callback function.
     * @returns {void | Promise<void>} No callback return Promise otherwise return void.
     */
    function write(eventName: string, eventType: EventType, keyValues: object): Promise<void>;
    function write(eventName: string, eventType: EventType, keyValues: object, callback: AsyncCallback<void>): void;

    /**
     * Application event logging configuration interface.
     *
     * @since 7
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @static
     * @param {ConfigOption} config Application event logging configuration item object.
     * @returns {boolean} Configuration result.
     */
    function configure(config: ConfigOption): boolean;

    /**
     * Describe the options for the configuration.
     *
     * @since 7
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     */
    interface ConfigOption {
        /**
         * Configuration item: application event logging switch.
         *
         * @since 7
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        disable?: boolean;

        /**
         * Configuration item: event file directory storage quota size.
         *
         * @since 7
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        maxStorage?: string;
    }
}

export default hiAppEvent;
