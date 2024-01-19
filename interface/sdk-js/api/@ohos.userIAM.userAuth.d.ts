/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 * User authentication
 * @namespace userAuth
 * @syscap SystemCapability.UserIAM.UserAuth.Core
 * @since 6
 */
declare namespace userAuth {
    /**
     * Enum for authentication result.
     * @enum {number}
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 6
     * @deprecated since 8
     * @useinstead ohos.userIAM.userAuth.ResultCode
     */
    export enum AuthenticationResult {
        /**
         * Indicates that the device does not support authentication.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        NO_SUPPORT = -1,

        /**
         * Indicates that authentication is success.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        SUCCESS = 0,

        /**
         * Indicates the authenticator fails to identify user.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        COMPARE_FAILURE = 1,

        /**
         * Indicates that authentication has been canceled.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        CANCELED = 2,

        /**
         * Indicates that authentication has timed out.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        TIMEOUT = 3,

        /**
         * Indicates a failure to open the camera.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        CAMERA_FAIL = 4,

        /**
         * Indicates that the authentication task is busy. Wait for a few seconds and try again.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        BUSY = 5,

        /**
         * Indicates incorrect parameters.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        INVALID_PARAMETERS = 6,

        /**
         * Indicates that the authenticator is locked.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        LOCKED = 7,

        /**
         * Indicates that the user has not enrolled the authenticator.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        NOT_ENROLLED = 8,

        /**
         * Indicates other errors.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        GENERAL_ERROR = 100,
    }

    /**
     * Auth types
     * @since 6
     * @deprecated since 8
     */
    type AuthType = "ALL" | "FACE_ONLY";

    /**
     * Secure levels
     * @since 6
     * @deprecated since 8
     */
    type SecureLevel = "S1" | "S2" | "S3" | "S4";

    /**
     * Used to initiate authentication.
     * @interface Authenticator
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 6
     * @deprecated since 8
     */
    interface Authenticator {
        /**
         * Execute authentication.
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @param type Indicates the authentication type.
         * @param level Indicates the security level.
         * @returns Returns authentication result, which is specified by AuthenticationResult.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 6
         * @deprecated since 8
         */
        execute(type: AuthType, level: SecureLevel, callback: AsyncCallback<number>): void;
        execute(type: AuthType, level: SecureLevel): Promise<number>;
    }

    /**
     * Get Authenticator instance.
     * @returns Returns an Authenticator.
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @deprecated since 8
     */
    function getAuthenticator(): Authenticator;

    /**
     * User authentication.
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.userIAM.userAuth.AuthInstance
     */
    class UserAuth {
        /**
         * Constructor to get the UserAuth class instance.
         * @returns Returns the UserAuth class instance.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.userIAM.userAuth.getAuthInstance
         */
        constructor();

        /**
         * Get version information.
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @returns Returns version information.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.userIAM.userAuth.getVersion
         */
        getVersion(): number;

        /**
         * Check whether the authentication capability is available.
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @param authType Credential type for authentication.
         * @param authTrustLevel Trust level of authentication result.
         * @returns Returns a check result, which is specified by getAvailableStatus, the value of number is related to the ResultCode enum, **201** is check permission failed.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.userIAM.userAuth.getAvailableStatus
         */
        getAvailableStatus(authType: UserAuthType, authTrustLevel: AuthTrustLevel): number;

        /**
         * Executes authentication.
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @param challenge Pass in challenge value.
         * @param authType Type of authentication.
         * @param authTrustLevel Trust level of authentication result.
         * @param callback Return result and acquireInfo through callback, the value of result code is related to the ResultCode enum, **201** is check permission failed.
         * @returns Returns ContextId for cancel.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.userIAM.userAuth.AuthInstance.start
         */
        auth(challenge: Uint8Array, authType: UserAuthType, authTrustLevel: AuthTrustLevel, callback: IUserAuthCallback): Uint8Array;

        /**
         * Cancel authentication with ContextID.
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @param contextID Cancel authentication and pass in ContextID.
         * @returns Returns a number value indicating whether Cancel authentication was successful, the value of number is related to the ResultCode enum, **201** is check permission failed.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.userIAM.userAuth.AuthInstance.cancel
         */
        cancelAuth(contextID: Uint8Array): number;
    }

    /**
     * Asynchronous callback of authentication operation.
     * @interface IUserAuthCallback
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.userIAM.userAuth.AuthEvent
     */
    interface IUserAuthCallback {
        /**
         * The authentication result code is returned through the callback.
         * If the authentication is passed, the authentication token is returned in extraInfo,
         * If the authentication fails, the remaining authentication times are returned in extraInfo,
         * If the authentication executor is locked, the freezing time is returned in extraInfo.
         * @param result Authentication result code, the value of result code is related to the ResultCode enum, **201** is check permission failed.
         * @param extraInfo Pass the specific information for different situation.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.userIAM.userAuth.AuthEvent.callback
         */
        onResult: (result: number, extraInfo: AuthResult) => void;

        /**
         * During an authentication, the TipsCode is returned through the callback.
         * @param module The executor type for authentication.
         * @param acquire The tip code for different authentication executor.
         * @param extraInfo Reserved parameter.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.userIAM.userAuth.AuthEvent.callback
         */
        onAcquireInfo ?: (module: number, acquire: number, extraInfo: any) => void;
    }

    /**
     * Authentication result: authentication token, remaining authentication times, freezing time.
     * @typedef AuthResult
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.userIAM.userAuth.AuthResultInfo
     */
    interface AuthResult {
        /**
         * The authentication result if the authentication is passed.
         * @type {Uint8Array}
         * @since 8
         */
        token ?: Uint8Array;

        /**
         * The remaining authentication times if the authentication fails.
         * @type {number}
         * @since 8
         */
        remainTimes ?: number;

        /**
         * The freezing time if the authentication executor is locked.
         * @type {number}
         * @since 8
         */
        freezingTime ?: number;
    }

    /**
     * Enum for operation result.
     * @enum {number}
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.userIAM.userAuth.UserAuthResultCode
     */
    enum ResultCode {
        /**
         * Indicates that the result is success or ability is supported.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        SUCCESS = 0,

        /**
         * Indicates that authentication failed.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        FAIL = 1,

        /**
         * Indicates other errors.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        GENERAL_ERROR = 2,

        /**
         * Indicates that this operation has been canceled.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        CANCELED = 3,

        /**
         * Indicates that this operation has timed out.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        TIMEOUT = 4,

        /**
         * Indicates that this authentication type is not supported.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        TYPE_NOT_SUPPORT = 5,

        /**
         * Indicates that the authentication trust level is not supported.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        TRUST_LEVEL_NOT_SUPPORT = 6,

        /**
         * Indicates that the authentication task is busy. Wait for a few seconds and try again.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        BUSY = 7,

        /**
         * Indicates incorrect parameters.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        INVALID_PARAMETERS = 8,

        /**
         * Indicates that the authenticator is locked.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        LOCKED = 9,

        /**
         * Indicates that the user has not enrolled the authenticator.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         * @deprecated since 9
         */
        NOT_ENROLLED = 10
    }

    /**
     * The enumeration of prompt codes in the process of face authentication.
     * @enum {number}
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 8
     */
    enum FaceTips {
        /**
         * Indicates that the obtained facial image is too bright due to high illumination.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FACE_AUTH_TIP_TOO_BRIGHT = 1,

        /**
         * Indicates that the obtained facial image is too dark due to low illumination.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FACE_AUTH_TIP_TOO_DARK = 2,

        /**
         * Indicates that the face is too close to the device.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FACE_AUTH_TIP_TOO_CLOSE = 3,

        /**
         * Indicates that the face is too far away from the device.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FACE_AUTH_TIP_TOO_FAR = 4,

        /**
         * Indicates that the device is too high, and that only the upper part of the face is captured.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FACE_AUTH_TIP_TOO_HIGH = 5,

        /**
         * Indicates that the device is too low, and that only the lower part of the face is captured.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FACE_AUTH_TIP_TOO_LOW = 6,

        /**
         * Indicates that the device is deviated to the right, and that only the right part of the face is captured.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FACE_AUTH_TIP_TOO_RIGHT = 7,

        /**
         * Indicates that the device is deviated to the left, and that only the left part of the face is captured.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FACE_AUTH_TIP_TOO_LEFT = 8,

        /**
         * Indicates that the face moves too fast during facial information collection.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FACE_AUTH_TIP_TOO_MUCH_MOTION = 9,

        /**
         * Indicates that the face is not facing the device.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FACE_AUTH_TIP_POOR_GAZE = 10,

        /**
         * Indicates that no face is detected.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FACE_AUTH_TIP_NOT_DETECTED = 11,
    }

    /**
     * The enumeration of prompt codes in the process of fingerprint authentication.
     * @enum {number}
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 8
     */
    enum FingerprintTips {
        /**
         * Indicates that the image acquired is good.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FINGERPRINT_AUTH_TIP_GOOD = 0,

        /**
         * Indicates that the fingerprint image is too noisy due to suspected or detected dirt on sensor.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FINGERPRINT_AUTH_TIP_DIRTY = 1,

        /**
         * Indicates that the fingerprint image is too noisy to process due to a detected condition.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FINGERPRINT_AUTH_TIP_INSUFFICIENT = 2,

        /**
         * Indicates that only a partial fingerprint image is detected.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FINGERPRINT_AUTH_TIP_PARTIAL = 3,

        /**
         * Indicates that the fingerprint image is incomplete due to quick motion.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FINGERPRINT_AUTH_TIP_TOO_FAST = 4,

        /**
         * Indicates that the fingerprint image is unreadable due to lack of motion.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FINGERPRINT_AUTH_TIP_TOO_SLOW = 5
    }

    /**
     * Credential type for authentication.
     * @enum {number}
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 8
     */
    enum UserAuthType {
        /**
         * Authentication type face.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FACE = 2,

        /**
         * Authentication type fingerprint.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        FINGERPRINT = 4
    }

    /**
     * Trust level of authentication results.
     * @enum {number}
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 8
     */
    enum AuthTrustLevel {
        /**
         * Authentication result trusted level 1.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        ATL1 = 10000,

        /**
         * Authentication result trusted level 2.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        ATL2 = 20000,

        /**
         * Authentication result trusted level 3.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        ATL3 = 30000,

        /**
         * Authentication result trusted level 4.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 8
         */
        ATL4 = 40000
    }

    /**
     * Authentication events.
     * @since 9
     */
    type AuthEventKey = "result" | "tip";

    /**
     * Return information of Authentication events.
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 9
     */
    type EventInfo = AuthResultInfo | TipInfo;

    /**
     * Asynchronous callback of authentication event.
     * @interface AuthEvent
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 9
     */
    interface AuthEvent {
        /**
         * The authentication event callback.
         * @param result Event info.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        callback(result: EventInfo): void;
    }

    /**
     * Authentication result information.
     * @typedef AuthResultInfo
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 9
     */
    interface AuthResultInfo {
        /**
         * The authentication result.
         * @type {number}
         * @since 9
         */
        result: number;

        /**
         * The authentication token if the authentication is passed.
         * @type {Uint8Array}
         * @since 9
         */
        token ?: Uint8Array;

        /**
         * The remaining authentication attempts if the authentication fails.
         * @type {number}
         * @since 9
         */
        remainAttempts ?: number;

        /**
         * The lockout duration if the authentication executor is locked.
         * @type {number}
         * @since 9
         */
        lockoutDuration ?: number;
    }

    /**
     * Authentication tip info.
     * @typedef TipInfo
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 9
     */
    interface TipInfo {
        /**
         * The authentication module of sending tip information.
         * @type {number}
         * @since 9
         */
        module: number;

        /**
         * Tip information, used to prompt the business to perform some operations.
         * @type {number}
         * @since 9
         */
        tip: number;
    }

    /**
     * Authentication instance, used to initiate a complete authentication.
     * @interface AuthInstance
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 9
     */
    interface AuthInstance {
        /**
         * Turn on authentication event listening.
         * @param name Event name.
         * @param callback Event information return.
         * @throws { BusinessError } 401 - Incorrect parameters.
         * @throws { BusinessError } 12500002 - General operation error.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since since 9
         */
        on: (name: AuthEventKey, callback: AuthEvent) => void;

        /**
         * Turn off authentication event listening.
         * @param name Event name.
         * @throws { BusinessError } 401 - Incorrect parameters.
         * @throws { BusinessError } 12500002 - General operation error.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since since 9
         */
        off: (name: AuthEventKey) => void;

        /**
         * Start this authentication, an instance can only perform authentication once.
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 401 - Incorrect parameters.
         * @throws { BusinessError } 12500001 - Authentication failed.
         * @throws { BusinessError } 12500002 - General operation error.
         * @throws { BusinessError } 12500003 - The operation is canceled.
         * @throws { BusinessError } 12500004 - The operation is time-out.
         * @throws { BusinessError } 12500005 - The authentication type is not supported.
         * @throws { BusinessError } 12500006 - The authentication trust level is not supported.
         * @throws { BusinessError } 12500007 - The authentication task is busy.
         * @throws { BusinessError } 12500009 - The authenticator is locked.
         * @throws { BusinessError } 12500010 - The type of credential has not been enrolled.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since since 9
         */
        start: () => void;

        /**
         * Cancel this authentication.
         * @permission ohos.permission.ACCESS_BIOMETRIC
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 401 - Incorrect parameters.
         * @throws { BusinessError } 12500002 - General operation error.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since since 9
         */
        cancel: () => void;
    }

    /**
     * Check whether the authentication capability is available.
     * @permission ohos.permission.ACCESS_BIOMETRIC
     * @param authType Credential type for authentication.
     * @param authTrustLevel Trust level of authentication result.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Incorrect parameters.
     * @throws { BusinessError } 12500002 - General operation error.
     * @throws { BusinessError } 12500005 - The authentication type is not supported.
     * @throws { BusinessError } 12500006 - The authentication trust level is not supported.
     * @throws { BusinessError } 12500010 - The type of credential has not been enrolled.
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 9
     */
    function getAvailableStatus(authType: UserAuthType, authTrustLevel: AuthTrustLevel): void;

    /**
     * Get Authentication instance.
     * @param challenge Pass in challenge value.
     * @param authType Credential type for authentication.
     * @param authTrustLevel Trust level of authentication result.
     * @returns Returns an authentication instance.
     * @throws { BusinessError } 401 - Incorrect parameters.
     * @throws { BusinessError } 12500002 - General operation error.
     * @throws { BusinessError } 12500005 - The authentication type is not supported.
     * @throws { BusinessError } 12500006 - The authentication trust level is not supported.
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 9
     */
    function getAuthInstance(challenge: Uint8Array, authType: UserAuthType, authTrustLevel: AuthTrustLevel): AuthInstance;

    /**
     * Enum for operation result.
     * @enum {number}
     * @syscap SystemCapability.UserIAM.UserAuth.Core
     * @since 9
     */
    enum UserAuthResultCode {
        /**
         * Indicates that the result is success or ability is supported.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        SUCCESS = 12500000,

        /**
         * Indicates that the authentication result is failed.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        FAIL = 12500001,

        /**
         * Indicates other errors.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        GENERAL_ERROR = 12500002,

        /**
         * Indicates that this operation is canceled.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        CANCELED = 12500003,

        /**
         * Indicates that this operation is time-out.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        TIMEOUT = 12500004,

        /**
         * Indicates that this authentication type is not supported.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        TYPE_NOT_SUPPORT = 12500005,

        /**
         * Indicates that the authentication trust level is not supported.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        TRUST_LEVEL_NOT_SUPPORT = 12500006,

        /**
         * Indicates that the authentication task is busy. Wait for a few seconds and try again.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        BUSY = 12500007,

        /**
         * Indicates that the authenticator is locked.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        LOCKED = 12500009,

        /**
         * Indicates that the user has not enrolled the authenticator.
         * @syscap SystemCapability.UserIAM.UserAuth.Core
         * @since 9
         */
        NOT_ENROLLED = 12500010
    }
}

export default userAuth;
