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

/**
 * Provides the event logging function for applications to log the fault, statistical, security,
 * and user behavior events reported during running. Based on event information,
 * you will be able to analyze the running status of applications.
 *
 * @since 9
 * @syscap SystemCapability.HiviewDFX.HiAppEvent
 */
declare namespace hiAppEvent {
    /**
     * Enumerate application event types.
     *
     * @since 9
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     */
    enum EventType {
        /**
         * Fault event.
         *
         * @since 9
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        FAULT = 1,

        /**
         * Statistic event.
         *
         * @since 9
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        STATISTIC = 2,

        /**
         * Security event.
         *
         * @since 9
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        SECURITY = 3,

        /**
         * User behavior event.
         *
         * @since 9
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        BEHAVIOR = 4
    }

    /**
     * Preset event.
     *
     * @since 9
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     */
    namespace event {
        /**
         * User login event.
         *
         * @since 9
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        const USER_LOGIN: string;

        /**
         * User logout event.
         *
         * @since 9
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        const USER_LOGOUT: string;

        /**
         * Distributed service event.
         *
         * @since 9
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        const DISTRIBUTED_SERVICE_START: string;
    }

    /**
     * Preset param.
     *
     * @since 9
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     */
    namespace param {
        /**
         * User id.
         *
         * @since 9
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        const USER_ID: string;

        /**
         * Distributed service name.
         *
         * @since 9
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        const DISTRIBUTED_SERVICE_NAME: string;

        /**
         * Distributed service instance id.
         *
         * @since 9
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        const DISTRIBUTED_SERVICE_INSTANCE_ID: string;
    }

    /**
     * Application event logging configuration interface.
     *
     * @since 9
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @static
     * @param {ConfigOption} config Application event logging configuration item object.
     * @throws {BusinessError} 401 - Parameter error.
     * @throws {BusinessError} 11103001 - Invalid max storage quota value.
     */
    function configure(config: ConfigOption): void;

    /**
     * Describe the options for the configuration.
     *
     * @since 9
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     */
    interface ConfigOption {
        /**
         * Configuration item: application event logging switch.
         *
         * @since 9
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        disable?: boolean;

        /**
         * Configuration item: event file directory storage quota size.
         *
         * @since 9
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         */
        maxStorage?: string;
    }

    /**
     * Definition of written application event information.
     *
     * @since 9
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     */
    interface AppEventInfo {
        /**
         * The domain of the event.
         */
        domain: string;

        /**
         * The name of the event.
         */
        name: string;

        /**
         * The type of the event.
         */
        eventType: EventType;

        /**
         * The params of the event.
         */
        params: object;
    }

    /**
     * Write application event.
     *
     * @since 9
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @static
     * @param {AppEventInfo} info Application event information to be written.
     * @param {AsyncCallback} [callback] Callback function.
     * @throws {BusinessError} 401 - Parameter error.
     * @throws {BusinessError} 11100001 - Function is disabled.
     * @throws {BusinessError} 11101001 - Invalid event domain.
     * @throws {BusinessError} 11101002 - Invalid event name.
     * @throws {BusinessError} 11101003 - Invalid number of event parameters.
     * @throws {BusinessError} 11101004 - Invalid string length of the event parameter.
     * @throws {BusinessError} 11101005 - Invalid event parameter name.
     * @throws {BusinessError} 11101006 - Invalid array length of the event parameter.
     */
     function write(info: AppEventInfo): Promise<void>;
     function write(info: AppEventInfo, callback: AsyncCallback<void>): void;

    /**
     * Definition of the read event package.
     *
     * @since 9
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     */
    interface AppEventPackage {
        /**
         * The id of the package.
         */
        packageId: number;

        /**
         * The number of events contained in the package.
         */
        row: number;

        /**
         * The total size of events contained in the package.
         */
        size: number;

        /**
         * The events data contained in the package.
         */
        data: string[];
    }

    /**
     * Definition of event holder object, which is used to read the event data monitored by the watcher.
     *
     * @since 9
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     */
    class AppEventPackageHolder {
        /**
         * Constructor for AppEventPackageHolder.
         *
         * @since 9
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @param {string} watcherName Name of the watcher to read.
         */
        constructor(watcherName: string);

        /**
         * Set the threshold size per read.
         *
         * @since 9
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @param {number} size Threshold size.
         * @throws {BusinessError} 401 - Parameter error.
         * @throws {BusinessError} 11104001 - Invalid size value.
         */
        setSize(size: number): void;

        /**
         * Read the event data monitored by the watcher.
         *
         * @since 9
         * @syscap SystemCapability.HiviewDFX.HiAppEvent
         * @returns {AppEventPackage} The read event package.
         */
        takeNext(): AppEventPackage;
    }

    /**
     * Definition of the condition for triggering callback when the watcher monitors event data.
     *
     * @since 9
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     */
    interface TriggerCondition {
        /**
         * The number of write events that trigger callback.
         */
        row?: number;

        /**
         * The size of write events that trigger callback.
         */
        size?: number;

        /**
         * The interval for triggering callback.
         */
        timeOut?: number;
    }

    /**
     * Definition of event filter object, which is used to filter events monitored by the watcher.
     *
     * @since 9
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     */
    interface AppEventFilter {
        /**
         * The name of the event domain to be monitored by the watcher.
         */
        domain: string;

        /**
         * The types of the events to be monitored by the watcher.
         */
        eventTypes?: EventType[];
    }

    /**
     * Definition of event watcher object, which is used to monitor written event data.
     *
     * @since 9
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     */
    interface Watcher {
        /**
         * The name of watcher.
         */
        name: string;

        /**
         * The condition for triggering callback.
         */
        triggerCondition?: TriggerCondition;

        /**
         * The event filters for monitoring events.
         */
        appEventFilters?: AppEventFilter[];

        /**
         * The callback function of watcher.
         */
        onTrigger?: (curRow: number, curSize: number, holder: AppEventPackageHolder) => void;
    }

    /**
     * Add event watcher.
     *
     * @since 9
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @static
     * @param {Watcher} watcher Watcher object for monitoring events.
     * @returns {AppEventPackageHolder} Holder object, which is used to read the monitoring data of the watcher.
     * @throws {BusinessError} 401 - Parameter error.
     * @throws {BusinessError} 11102001 - Invalid watcher name.
     * @throws {BusinessError} 11102002 - Invalid filtering event domain.
     * @throws {BusinessError} 11102003 - Invalid row value.
     * @throws {BusinessError} 11102004 - Invalid size value.
     * @throws {BusinessError} 11102005 - Invalid timeout value.
     */
    function addWatcher(watcher: Watcher): AppEventPackageHolder;

    /**
     * Remove event watcher.
     *
     * @since 9
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @static
     * @param {Watcher} watcher Watcher object for monitoring events.
     * @throws {BusinessError} 401 - Parameter error.
     * @throws {BusinessError} 11102001 - Invalid watcher name.
     */
    function removeWatcher(watcher: Watcher): void;

    /**
     * Clear all local logging data of the application.
     *
     * @since 9
     * @syscap SystemCapability.HiviewDFX.HiAppEvent
     * @static
     */
    function clearData(): void;
}

export default hiAppEvent;
