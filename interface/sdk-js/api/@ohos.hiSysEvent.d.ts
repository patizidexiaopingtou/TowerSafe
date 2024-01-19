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
 * Provides the system event logging function for applications to log the fault, statistical, security,
 * and user behavior events reported during running. Based on event information,
 * you will be able to analyze the running status of applications.
 *
 * @syscap SystemCapability.HiviewDFX.HiSysEvent
 * @systemapi hide for inner use
 * @since 9
 */
declare namespace hiSysEvent {
  /**
   * Enumerate system event types.
   *
   * @enum {number}
   * @readonly
   * @syscap SystemCapability.HiviewDFX.HiSysEvent
   * @systemapi hide for inner use
   * @since 9
   */
  enum EventType {
    /**
     * Fault event
     *
     * @syscap SystemCapability.HiviewDFX.HiSysEvent
     * @systemapi hide for inner use
     * @since 9
     */
    FAULT = 1,

    /**
     * Statistic event
     *
     * @syscap SystemCapability.HiviewDFX.HiSysEvent
     * @systemapi hide for inner use
     * @since 9
     */
    STATISTIC = 2,

    /**
     * Security event
     *
     * @syscap SystemCapability.HiviewDFX.HiSysEvent
     * @systemapi hide for inner use
     * @since 9
     */
    SECURITY = 3,

    /**
     * System behavior event
     *
     * @syscap SystemCapability.HiviewDFX.HiSysEvent
     * @systemapi hide for inner use
     * @since 9
     */
    BEHAVIOR = 4
  }

  /**
   * Definition of written system event information.
   *
   * @syscap SystemCapability.HiviewDFX.HiSysEvent
   * @systemapi hide for inner use
   * @since 9
   */
  interface SysEventInfo {
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
   * Write system event.
   *
   * @syscap SystemCapability.HiviewDFX.HiSysEvent
   * @systemapi hide for inner use
   * @static
   * @param {SysEventInfo} info system event information to be written.
   * @param {AsyncCallback} [callback] callback function.
   * @throws {BusinessError} 401 - Invalid argument.
   * @throws {BusinessError} 11200001 - Invalid event domain.
   * @throws {BusinessError} 11200002 - Invalid event name.
   * @throws {BusinessError} 11200003 - Abnormal environment.
   * @throws {BusinessError} 11200004 - Length of the event is over limit.
   * @throws {BusinessError} 11200051 - Invalid event parameter.
   * @throws {BusinessError} 11200052 - Size of the event parameter of the string type is over limit.
   * @throws {BusinessError} 11200053 - Count of event parameters is over limit.
   * @throws {BusinessError} 11200054 - Count of event parameter of the array type is over limit.
   * @returns {void | Promise<void>} no callback return Promise otherwise return void.
   * @since 9
   */
  function write(info: SysEventInfo): Promise<void>;
  function write(info: SysEventInfo, callback: AsyncCallback<void>): void;

  /**
   * Enumerate search system event rule type.
   *
   * @enum {number}
   * @readonly
   * @syscap SystemCapability.HiviewDFX.HiSysEvent
   * @systemapi hide for inner use
   * @since 9
   */
  enum RuleType {
    /**
     * Whole word match
     *
     * @syscap SystemCapability.HiviewDFX.HiSysEvent
     * @systemapi hide for inner use
     * @since 9
     */
    WHOLE_WORD = 1,

    /**
     * Prefix match
     *
     * @syscap SystemCapability.HiviewDFX.HiSysEvent
     * @systemapi hide for inner use
     * @since 9
     */
    PREFIX = 2,

    /**
     * Regular match
     *
     * @syscap SystemCapability.HiviewDFX.HiSysEvent
     * @systemapi hide for inner use
     * @since 9
     */
    REGULAR = 3
  }

  /**
   * Definition listener rule for system event information.
   *
   * @syscap SystemCapability.HiviewDFX.HiSysEvent
   * @systemapi hide for inner use
   * @since 9
   */
  interface WatchRule {
    /**
     * The domain of the event.
     */
    domain: string;

    /**
     * The name of the event.
     */
    name: string;

    /**
     * The name of the event.
     */
    tag: string;

    /**
     * The rule of match system event
     */
    ruleType: RuleType;
  }

  /**
   * Definition watcher for system event information.
   *
   * @syscap SystemCapability.HiviewDFX.HiSysEvent
   * @systemapi hide for inner use
   * @since 9
   */
  interface Watcher {
    /**
     * Rule of filter system event
     */
     rules: WatchRule[];

     /**
     * Receive system event.
     *
     * @syscap SystemCapability.HiviewDFX.HiSysEvent
     * @systemapi hide for inner use
     * @param {SysEventInfo} info system event information of receive.
     * @returns {void} return void.
     * @since 9
     */
    onEvent: (info: SysEventInfo) => void;

    /**
     * Hisysevent service shutdown.
     *
     * @syscap SystemCapability.HiviewDFX.HiSysEvent
     * @systemapi hide for inner use
     * @returns {void} return void.
     * @since 9
     */
    onServiceDied: () => void;
  }

  /**
   * Definition arguments for query system event information.
   *
   * @enum {number}
   * @readonly
   * @syscap SystemCapability.HiviewDFX.HiSysEvent
   * @systemapi hide for inner use
   * @since 9
   */
  interface QueryArg {
    /**
     * Begin time
     */
    beginTime: number;

    /**
     * End time
     */
    endTime: number;

    /**
     * Max number of receive system event
     */
    maxEvents: number;
  }

  /**
   * Definition event for query system event information
   *
   * @syscap SystemCapability.HiviewDFX.HiSysEvent
   * @systemapi hide for inner use
   * @since 9
   */
  interface QueryRule {
    /**
     * The domain of the event
     */
    domain: string;

    /**
     * List of event name
     */
    names: string[];
  }

  /**
   * Definition query result handler
   *
   * @syscap SystemCapability.HiviewDFX.HiSysEvent
   * @systemapi hide for inner use
   * @since 9
   */
  interface Querier {
    /**
     * Handle query result, the query result will be send in several times.
     *
     * @syscap SystemCapability.HiviewDFX.HiSysEvent
     * @systemapi hide for inner use
     * @param {SysEventInfo[]} infos system event information of query result.
     * @returns {void} return void.
     * @since 9
     */
    onQuery: (infos: SysEventInfo[]) => void;

    /**
     * Notify querier execute query has finished.
     *
     * @syscap SystemCapability.HiviewDFX.HiSysEvent
     * @systemapi hide for inner use
     * @param {number} reason 0 success, 1 fail.
     * @param {number} total the total number of query result.
     * @returns {void} return void.
     * @since 9
     */
    onComplete: (reason: number, total: number) => void;
  }

  /**
   * Add watcher to watch system event
   *
   * @syscap SystemCapability.HiviewDFX.HiSysEvent
   * @systemapi hide for inner use
   * @permission ohos.permission.READ_DFX_SYSEVENT
   * @param {Watcher} watcher watch system event
   * @throws {BusinessError} 201 - Permission denied. An attempt was made to read system event forbidden by permission: ohos.permission.READ_DFX_SYSEVENT.
   * @throws {BusinessError} 401 - Invalid argument.
   * @throws {BusinessError} 11200101 - Count of watchers is over limit.
   * @throws {BusinessError} 11200102 - Count of watch rules is over limit.
   * @returns {void} return void.
   * @since 9
   */
  function addWatcher(watcher: Watcher): void;

  /**
   * Remove watcher
   *
   * @syscap SystemCapability.HiviewDFX.HiSysEvent
   * @systemapi hide for inner use
   * @permission ohos.permission.READ_DFX_SYSEVENT
   * @param {Watcher} watcher watch system event
   * @throws {BusinessError} 201 - Permission denied. An attempt was made to read system event forbidden by permission: ohos.permission.READ_DFX_SYSEVENT.
   * @throws {BusinessError} 401 - Invalid argument.
   * @throws {BusinessError} 11200201 - The watcher does not exist.
   * @returns {void} return void.
   * @since 9
   */
  function removeWatcher(watcher: Watcher): void;

  /**
   * Query system event
   *
   * @syscap SystemCapability.HiviewDFX.HiSysEvent
   * @systemapi hide for inner use
   * @permission ohos.permission.READ_DFX_SYSEVENT
   * @param {QueryArg} queryArg common arguments of query system event
   * @param {QueryRule[]} rules rule of query system event
   * @param {Querier} querier receive query result
   * @throws {BusinessError} 201 - Permission denied. An attempt was made to read system event forbidden by permission: ohos.permission.READ_DFX_SYSEVENT.
   * @throws {BusinessError} 401 - Invalid argument.
   * @throws {BusinessError} 11200301 - Count of query rules is over limit.
   * @throws {BusinessError} 11200302 - Invalid query rule.
   * @throws {BusinessError} 11200303 - Count of concurrent queriers is over limit.
   * @throws {BusinessError} 11200304 - Query frequency is over limit.
   * @returns {void} return void.
   * @since 9
   */
  function query(queryArg: QueryArg, rules: QueryRule[], querier: Querier): void;
}

export default hiSysEvent;
