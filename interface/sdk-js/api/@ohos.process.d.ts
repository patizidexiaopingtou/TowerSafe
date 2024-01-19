/*
* Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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
* The process is mainly used to obtain the relevant ID of the process, obtain and modify
* the working directory of the process, exit and close the process.
* @since 7
* @syscap SystemCapability.Utils.Lang
*/

declare namespace process {
    /**
    * The childprocess object can be used to create a new process.
    * @since 7
    * @syscap SystemCapability.Utils.Lang
    * @systemapi Hide this for inner system use
    * @test
    */
    export interface ChildProcess {
        /**
        * Return pid is the pid of the current process
        * @since 7
        * @syscap SystemCapability.Utils.Lang
        * @systemapi Hide this for inner system use
        * @test
        * @returns Return the pid of the current process.
        */
        readonly pid: number;

        /**
        * Return ppid is the pid of the current child process
        * @since 7
        * @syscap SystemCapability.Utils.Lang
        * @systemapi Hide this for inner system use
        * @test
        * @returns Return the pid of the current child process.
        */
        readonly ppid: number;

        /**
        * Return exitCode is the exit code of the current child process
        * @since 7
        * @syscap SystemCapability.Utils.Lang
        * @systemapi Hide this for inner system use
        * @test
        * @returns Return the exit code of the current child process.
        */
        readonly exitCode: number;

        /**
        * Return boolean is whether the current process signal is sent successfully
        * @since 7
        * @syscap SystemCapability.Utils.Lang
        * @systemapi Hide this for inner system use
        * @test
        * @returns Return whether the current process signal is sent successfully.
        */
        readonly killed: boolean;

        /**
        * Return 'number' is the target process exit code
        * @since 7
        * @syscap SystemCapability.Utils.Lang
        * @systemapi Hide this for inner system use
        * @test
        * @returns Return the target process exit code.
        */
        wait(): Promise<number>;

        /**
        * Return it as 'Uint8Array' of the stdout until EOF
        * @since 7
        * @syscap SystemCapability.Utils.Lang
        * @systemapi Hide this for inner system use
        * @test
        * @returns Return subprocess standard output.
        */
        getOutput(): Promise<Uint8Array>;

        /**
        * Return it as 'Uint8Array of the stderr until EOF
        * @since 7
        * @syscap SystemCapability.Utils.Lang
        * @systemapi Hide this for inner system use
        * @test
        * @returns Return subprocess standard error output.
        */
        getErrorOutput(): Promise<Uint8Array>;

        /**
        * Close the target process
        * @since 7
        * @syscap SystemCapability.Utils.Lang
        * @systemapi Hide this for inner system use
        * @test
        */
        close(): void;

        /**
        * Send a signal to process
        * @since 7
        * @syscap SystemCapability.Utils.Lang
        * @systemapi Hide this for inner system use
        * @test
        * @param signal Number or string represents the signal sent.
        */
        kill(signal: number | string): void;
    }

    /**
     * Process is mainly used to obtain the relevant ID of the process, obtain and modify the
     * working directory of the process, exit and close the process.
     * @name ProcessManager
     * @since 9
     * @syscap SystemCapability.Utils.Lang
     */
    export class ProcessManager {
        /**
        * Returns a boolean whether the specified uid belongs to a particular application.
        * @since 9
        * @syscap SystemCapability.Utils.Lang
        * @param v An id.
        * @returns Return a boolean whether the specified uid belongs to a particular application.
        * @throws {BusinessError} 401 - The type of v must be number.
        */
        isAppUid(v: number): boolean;

        /**
        * Returns the uid based on the specified user name.
        * @since 9
        * @syscap SystemCapability.Utils.Lang
        * @param v Process name.
        * @returns Return the uid based on the specified user name.
        * @throws {BusinessError} 401 - The type of v must be string.
        */
        getUidForName(v: string): number;

        /**
        * Returns the thread priority based on the specified tid.
        * @since 9
        * @syscap SystemCapability.Utils.Lang
        * @param v The tid of the process.
        * @returns Return the thread priority based on the specified tid.
        * @throws {BusinessError} 401 - The type of v must be number.
        */
        getThreadPriority(v: number): number;

        /**
        * Returns the system configuration at runtime.
        * @since 9
        * @syscap SystemCapability.Utils.Lang
        * @param name Parameters defined by the system configuration.
        * @returns Return the system configuration at runtime.
        * @throws {BusinessError} 401 - The type of name must be number.
        */
        getSystemConfig(name: number): number;

        /**
        * Returns the system value for environment variables.
        * @since 9
        * @syscap SystemCapability.Utils.Lang
        * @param name Parameters defined by the system environment variables.
        * @returns Return the system value for environment variables.
        * @throws {BusinessError} 401 - The type of name must be string.
        */
        getEnvironmentVar(name: string): string;

        /**
        * Process exit
        * @since 9
        * @syscap SystemCapability.Utils.Lang
        * @param code Process exit code.
        * @throws {BusinessError} 401 - The type of code must be number.
        */
        exit(code: number): void;

        /**
        * Return whether the signal was sent successfully
        * @since 9
        * @syscap SystemCapability.Utils.Lang
        * @param signal Signal sent.
        * @param pid Send signal to target pid.
        * @returns Return the result of the signal.
        * @throws {BusinessError} 401 - if the input parameters are invalid.
        */
        kill(signal: number, pid: number): boolean;
    }

    /**
    * Returns the numeric valid group ID of the process
    * @since 7
    * @syscap SystemCapability.Utils.Lang
    * @systemapi Hide this for inner system use
    * @test
    * @returns Return the numeric valid group ID of the process.
    */
    const egid: number;

    /**
    * Return the numeric valid user identity of the process
    * @since 7
    * @syscap SystemCapability.Utils.Lang
    * @systemapi Hide this for inner system use
    * @test
    * @returns Return the numeric valid user identity of the process.
    */
    const euid: number;

    /**
    * Returns the numeric group id of the process
    * @since 7
    * @syscap SystemCapability.Utils.Lang
    * @systemapi Hide this for inner system use
    * @test
    * @returns Return the numeric group if of the process.
    */
    const gid: number

    /**
    * Returns the digital user id of the process
    * @since 7
    * @syscap SystemCapability.Utils.Lang
    * @returns Return the digital user id of the process.
    */
    const uid: number;

    /**
    * Return an array with supplementary group id
    * @since 7
    * @syscap SystemCapability.Utils.Lang
    * @systemapi Hide this for inner system use
    * @test
    * @returns Return an array with supplementary group id.
    */
    const groups: number[];

    /**
    * Return pid is The pid of the current process
    * @since 7
    * @syscap SystemCapability.Utils.Lang
    * @returns Return The pid of the current process.
    */
    const pid: number;

    /**
    * Return ppid is The pid of the current child process
    * @since 7
    * @syscap SystemCapability.Utils.Lang
    * @systemapi Hide this for inner system use
    * @test
    * @returns Return The pid of the current child process.
    */
    const ppid: number;

    /**
    * Returns the tid of the current thread.
    * @since 8
    * @syscap SystemCapability.Utils.Lang
    * @returns Return the tid of the current thread.
    */
    const tid: number;

    /**
    * Returns a boolean whether the process is isolated.
    * @since 8
    * @syscap SystemCapability.Utils.Lang
    * @returns Return boolean whether the process is isolated.
    */
    function isIsolatedProcess(): boolean;

    /**
    * Returns a boolean whether the specified uid belongs to a particular application.
    * @since 8
    * @deprecated since 9
    * @useinstead ohos.process.ProcessManager.isAppUid
    * @syscap SystemCapability.Utils.Lang
    * @param v An id.
    * @returns Return a boolean whether the specified uid belongs to a particular application.
    */
    function isAppUid(v: number): boolean;

    /**
    * Returns a boolean whether the process is running in a 64-bit environment.
    * @since 8
    * @syscap SystemCapability.Utils.Lang
    * @returns Return a boolean whether the process is running in a 64-bit environment.
    */
    function is64Bit(): boolean;

    /**
    * Returns the uid based on the specified user name.
    * @since 8
    * @deprecated since 9
    * @useinstead ohos.process.ProcessManager.getUidForName
    * @syscap SystemCapability.Utils.Lang
    * @param v Process name.
    * @returns Return the uid based on the specified user name.
    */
    function getUidForName(v: string): number;

    /**
    * Returns the thread priority based on the specified tid.
    * @since 8
    * @deprecated since 9
    * @useinstead ohos.process.ProcessManager.getThreadPriority
    * @syscap SystemCapability.Utils.Lang
    * @param v The tid of the process.
    * @returns Return the thread priority based on the specified tid.
    */
    function getThreadPriority(v: number): number;

    /**
    * Returns the elapsed real time (in milliseconds) taken from the start of the system to the start of the process.
    * @since 8
    * @syscap SystemCapability.Utils.Lang
    * @returns Return the start of the system to the start of the process.
    */
    function getStartRealtime(): number;

    /**
    * Returns the cpu time (in milliseconds) from the time when the process starts to the current time.
    * @since 8
    * @syscap SystemCapability.Utils.Lang
    * @returns Return the cpu time (in milliseconds) from the time when the process starts to the current time.
    */
    function getPastCpuTime(): number;

    /**
    * Returns the system configuration at runtime.
    * @since 8
    * @deprecated since 9
    * @useinstead ohos.process.ProcessManager.getSystemConfig
    * @syscap SystemCapability.Utils.Lang
    * @param name Parameters defined by the system configuration.
    * @returns Return the system configuration at runtime.
    */
    function getSystemConfig(name: number): number;

    /**
    * Returns the system value for environment variables.
    * @since 8
    * @deprecated since 9
    * @useinstead ohos.process.ProcessManager.getEnvironmentVar
    * @syscap SystemCapability.Utils.Lang
    * @param name Parameters defined by the system environment variables.
    * @returns Return the system value for environment variables.
    */
    function getEnvironmentVar(name: string): string;

    type EventListener = (evt: Object) => void;
    /**
    * Return a child process object and spawns a new ChildProcess to run the command.
    * @since 7
    * @syscap SystemCapability.Utils.Lang
    * @param command String of the shell commands executed by the child process.
    * @param options This is an object. The object contains three parameters. Timeout is the running time of the child
    * process, killSignal is the signal sent when the child process reaches timeout, and maxBuffer is the size of the
    * maximum buffer area for standard input and output.
    * @systemapi Hide this for inner system use
    * @test
    * @returns Return a child process object.
    */
    function runCmd(command: string,
        options?: { timeout?: number, killSignal?: number | string, maxBuffer?: number }): ChildProcess;

    /**
    * Abort current process
    * @since 7
    * @syscap SystemCapability.Utils.Lang
    */
    function abort(): void;

    /**
    * Register for an event
    * @since 7
    * @syscap SystemCapability.Utils.Lang
    * @param type Indicates the type of event registered.
    * @systemapi Hide this for inner system use
    * @test
    * @param listener Represents the registered event function
    */
    function on(type: string, listener: EventListener): void;

    /**
    * Remove registered event
    * @since 7
    * @syscap SystemCapability.Utils.Lang
    * @param type Remove the type of registered event.
    * @systemapi Hide this for inner system use
    * @test
    * @returns Return removed result.
    */
    function off(type: string): boolean;

    /**
    * Process exit
    * @since 7
    * @deprecated since 9
    * @useinstead ohos.process.ProcessManager.exit
    * @syscap SystemCapability.Utils.Lang
    * @param code Process exit code.
    */
    function exit(code: number): void;

    /**
    * Return the current work directory;
    * @since 7
    * @syscap SystemCapability.Utils.Lang
    * @systemapi Hide this for inner system use
    * @test
    * @returns Return the current work directory.
    */
    function cwd(): string;

    /**
    * Change current directory
    * @since 7
    * @syscap SystemCapability.Utils.Lang
    * @systemapi Hide this for inner system use
    * @test
    * @param dir The path you want to change.
    */
    function chdir(dir: string): void;

    /**
    * Returns the running time of the system
    * @since 7
    * @syscap SystemCapability.Utils.Lang
    * @returns Return the running time of the system.
    */
    function uptime(): number;

    /**
    * Return whether the signal was sent successfully
    * @since 7
    * @deprecated since 9
    * @useinstead ohos.process.ProcessManager.kill
    * @syscap SystemCapability.Utils.Lang
    * @param signal Signal sent.
    * @param pid Send signal to target pid.
    * @returns Return the result of the signal.
    */
    function kill(signal: number, pid: number): boolean;
}
export default process;