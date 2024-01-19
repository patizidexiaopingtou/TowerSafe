/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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

import Want from "./@ohos.app.ability.Want";

/**
 * Interface of request dialog.
 * @namespace dialogRequest
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 9
 */
declare namespace dialogRequest {
    /**
     * Request info of a request.
     * @typedef RequestInfo
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    export interface RequestInfo {
    }

    export enum ResultCode {
        RESULT_OK = 0,
        RESULT_CANCEL = 1,
    }

    /**
     * The result of requestDialogService with asynchronous callback.
     *
     * @since 9
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @permission N/A
     * @StageModelOnly
     */
    export interface RequestResult {
        /**
         * The request result passed in by the user.
         *
         * @since 9
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         * @StageModelOnly
         */
        result: ResultCode;
    }

    /**
     * Provides methods for request callback.
     * @name AuthenticatorCallback
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    export interface RequestCallback {
        /**
         * Send request result to caller.
         * @param { RequestResult } result - result for request.
         * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
         * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
         * @StageModelOnly
         * @since 9
         */
        setRequestResult(result: RequestResult): void;
    }

    /**
     * Get request info from caller want.
     * @param { Want } want - want from caller.
     * @returns { RequestInfo } Returns the request info from caller.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    function getRequestInfo(want: Want): RequestInfo;

    /**
     * Get request callback from caller want.
     * @param { Want } want - want from caller.
     * @returns { RequestCallback } Returns the request callback.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    function getRequestCallback(want: Want): RequestCallback;
}

export default dialogRequest;