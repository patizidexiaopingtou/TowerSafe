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

/**
 * JS cross-thread task executor.
 * @since 9
 * @syscap SystemCapability.Utils.Lang
 */
 declare namespace taskpool {
  /**
   * The Priority defines the task priority.
   * @since 9
   * @syscap SystemCapability.Utils.Lang
   */
  enum Priority {
    HIGH,
    MEDIUM,
    LOW
  }

  /**
   * The Task class provides an interface to create a task.
   * @since 9
   * @syscap SystemCapability.Utils.Lang
   */
  class Task {
    /**
     * Create a Task instance.
     * @param func Concurrent function to execute in taskpool.
     * @param args The concurrent function arguments.
     * @throws {BusinessError} 401 - if the input parameters are invalid.
     * @throws {BusinessError} 10200014 - if the function is not mark as concurrent.
     * @since 9
     * @syscap SystemCapability.Utils.Lang
     */
    constructor(func: Function, ...args: unknown[]);

    /**
     * Concurrent function to execute in taskpool.
     */
    function: Function;

    /**
     * The concurrent function arguments.
     */
    arguments?: unknown[];
  }

  /**
   * Execute a concurrent function.
   * @param func Concurrent function want to execute.
   * @param args The concurrent function arguments.
   * @throws {BusinessError} 401 - if the input parameters are invalid.
   * @throws {BusinessError} 10200003 - Worker initialization failure.
   * @throws {BusinessError} 10200006 - Serializing an uncaught exception failed.
   * @throws {BusinessError} 10200014 - if the function is not mark as concurrent.
   * @since 9
   * @syscap SystemCapability.Utils.Lang
   */
  function execute(func: Function, ...args: unknown[]): Promise<unknown>;

  /**
   * Execute a concurrent task.
   * @param task The task want to execute.
   * @param priority Task priority, MEDIUM is default.
   * @throws {BusinessError} 401 - if the input parameters are invalid.
   * @throws {BusinessError} 10200003 - Worker initialization failure.
   * @throws {BusinessError} 10200006 - Serializing an uncaught exception failed.
   * @throws {BusinessError} 10200014 - if the function in task is not mark as concurrent.
   * @since 9
   * @syscap SystemCapability.Utils.Lang
   */
  function execute(task: Task, priority?: Priority): Promise<unknown>;

  /**
   * Cancel a concurrent task.
   * @param task The task want to cancel.
   * @throws {BusinessError} 401 - if the input parameters are invalid.
   * @throws {BusinessError} 10200015 - if the task is not exist.
   * @throws {BusinessError} 10200016 - if the task is running.
   * @since 9
   * @syscap SystemCapability.Utils.Lang
   */
  function cancel(task: Task): void;
}

export default taskpool;
