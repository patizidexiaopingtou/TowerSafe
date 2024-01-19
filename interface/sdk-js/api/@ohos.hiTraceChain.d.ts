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

/**
 * Provides APIs to implement call chain tracing throughout a service process.
 * With HiTrace, you can quickly obtain the run log for the call chain of a 
 * specified service process and locate faults in cross-device, cross-process,
 * or cross-thread communications.
 *
 * @since 8
 * @syscap SystemCapability.HiviewDFX.HiTrace
 */
declare namespace hiTraceChain {
    /**
     * Enumerate trace flag
     *
     * @since 8
     * @syscap SystemCapability.HiviewDFX.HiTrace
     */
    enum HiTraceFlag {
        /**
         * Default value
         */
        DEFAULT           = 0,

        /**
         * Trace sync and async call. default: trace sync call only.
         */
        INCLUDE_ASYNC     = 1,

        /**
         * Do not create child span. default: create child span.
         */
        DONOT_CREATE_SPAN = 1 << 1,

        /**
         * Output tracepoint info in span. default: do not output tracepoint info.
         */
        TP_INFO           = 1 << 2,

        /**
         * Do not output begin and end info. default: output begin and end info.
         */
        NO_BE_INFO        = 1 << 3,

        /**
         * Do not add id to log. default: add id to log.
         */
        DISABLE_LOG  = 1 << 4,

        /**
         * The trace is triggered by fault.
         */
        FAILURE_TRIGGER   = 1 << 5,

        /**
         * Output device-to-device tracepoint info in span only. default: do not output device-to-device tracepoint info.
         */
        D2D_TP_INFO       = 1 << 6,
    }

    /**
     * Enumerate trace point type
     *
     * @since 8
     * @syscap SystemCapability.HiviewDFX.HiTrace
     */
    enum HiTraceTracepointType {
        /**
         * Client send
         */
        CS = 0,

        /**
         * Client receive
         */
        CR = 1,

        /**
         * Server send
         */
        SS = 2,

        /**
         * Server receive
         */
        SR = 3,

        /**
         * General info
         */
        GENERAL = 4,
    }

    /**
     * Enumerate trace communication mode
     *
     * @since 8
     * @syscap SystemCapability.HiviewDFX.HiTrace
     */
    enum HiTraceCommunicationMode {
        /**
         * Unspecified
         */
        DEFAULT = 0,

        /**
         * Thread-to-thread
         */
        THREAD  = 1,

        /**
         * Process-to-process
         */
        PROCESS = 2,

        /**
         * Device-to-device
         */
        DEVICE  = 3,
    }

    /**
     * Trace id, for tracing process.
     *
     * @since 8
     * @syscap SystemCapability.HiviewDFX.HiTrace
     */
    interface HiTraceId {
        chainId: bigint; /* 0n: invalid */
        spanId?: number;
        parentSpanId?: number;
        flags?: number;
    }

    /**
     * Start tracing a process impl.
     *
     * @since 8
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @param {string} name Process name.
     * @param {number} flags Trace function flag.
     * @returns {HiTraceId} Valid if first call, otherwise invalid.
     */
    function begin(name: string, flags?: number): HiTraceId;

    /**
     * Stop process tracing and clear trace id of current thread if the given trace
     * id is valid, otherwise do nothing.
     *
     * @since 8
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @param {HiTraceId} id The trace id that need to stop.
     */
    function end(id: HiTraceId): void;

    /**
     * Get trace id of current thread, and return a invalid trace id if no
     * trace id belong to current thread
     *
     * @since 8
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @returns {HiTraceId} Valid if current thread have a trace id, otherwise invalid.
     */
    function getId(): HiTraceId;

    /**
     * Set id as trace id of current thread. Do nothing if id is invalid.
     *
     * @since 8
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @param {HiTraceId} id Set id as trace id of current thread.
     */
    function setId(id: HiTraceId): void;

    /**
     * Clear trace id of current thread and set it invalid.
     *
     * @since 8
     * @syscap SystemCapability.HiviewDFX.HiTrace
     */
    function clearId(): void;

    /**
     * Create a new span id according to the trace id of current thread.
     *
     * @since 8
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @returns {HiTraceId} A valid span trace id. Otherwise trace id of current thread if do not allow create span.
     */
    function createSpan(): HiTraceId;

    /**
     * Print hitrace info, include trace id info.
     *
     * @since 8
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @param {HiTraceCommunicationMode} mode Trace communication mode.
     * @param {HiTraceTracepointType} type Trace info type.
     * @param {HiTraceId} id Trace id that need to print.
     * @param {string} msg Customized info that need to print.
     */
    function tracepoint(mode: HiTraceCommunicationMode, type: HiTraceTracepointType, id: HiTraceId, msg?: string): void;

    /**
     * Judge whether the trace id is valid or not.
     *
     * @since 8
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @param {HiTraceId} id Trace id that need to judge.
     * @returns {boolean} True for a valid trace id, otherwise false.
     */
    function isValid(id: HiTraceId): boolean;

    /**
     * Judge whether the trace id has enabled a trace flag or not.
     *
     * @since 8
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @param {HiTraceId} id Trace id that need to judge.
     * @param {HiTraceFlag} flag Trace flag that need to judge.
     * @returns {boolean} true if the trace id has enabled the flag.
     */
    function isFlagEnabled(id: HiTraceId, flag: HiTraceFlag): boolean;

    /**
     * Enable the designative trace flag for the trace id.
     *
     * @since 8
     * @syscap SystemCapability.HiviewDFX.HiTrace
     * @param {HiTraceId} id Trace id that need to enable a flag. 
     * @param {HiTraceFlag} flag the designative trace flag that need to be enabled in the trace id.
     */
    function enableFlag(id: HiTraceId, flag: HiTraceFlag): void;
}

export default hiTraceChain;
