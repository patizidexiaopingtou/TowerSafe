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

import { AsyncCallback, Callback } from './basic';
import { Permissions } from './permissions';
import Context from "./application/Context";
import PermissionRequestResult from "./security/PermissionRequestResult";

/**
 * @syscap SystemCapability.Security.AccessToken
 */
 declare namespace abilityAccessCtrl {
    /**
     * Obtains the AtManager instance.
     * @returns returns the instance of the AtManager.
     * @since 8
     */
    function createAtManager(): AtManager;
  
    /**
     * Provides methods for managing access_token.
     * @name AtManager
     */
    interface AtManager {
        /**
         * Checks whether a specified application has been granted the given permission.
         * @param tokenID The tokenId of specified application.
         * @param permissionName The permission name to be verified.
         * @returns Returns permission verify result.
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.abilityAccessCtrl.AtManager#checkAccessToken
         */
        verifyAccessToken(tokenID: number, permissionName: string): Promise<GrantStatus>;

        /**
         * Checks whether a specified application has been granted the given permission.
         * @param tokenID The tokenId of specified application.
         * @param permissionName The permission name to be verified. Permissions type only support the valid permission name.
         * @returns Returns permission verify result.
         * @since 9
         */
        verifyAccessToken(tokenID: number, permissionName: Permissions): Promise<GrantStatus>;

        /**
         * Checks whether a specified application has been granted the given permission synchronously.
         * @param tokenID The tokenId of specified application.
         * @param permissionName The permission name to be verified.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 12100001 - The parameter is invalid. The tokenID is 0, or the string size of permissionName is larger than 256.
         * @returns Returns permission verify result.
         * @since 9
         */
        verifyAccessTokenSync(tokenID: number, permissionName: Permissions): GrantStatus;

        /**
         * Checks whether a specified application has been granted the given permission.
         * @param tokenID The tokenId of specified application.
         * @param permissionName The permission name to be verified.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 12100001 - The parameter is invalid. The tokenID is 0, or the string size of permissionName is larger than 256.
         * @returns Returns permission verify result.
         * @since 9
         */
        checkAccessToken(tokenID: number, permissionName: Permissions): Promise<GrantStatus>;

        /**
         * Requests certain permissions from the user.
         *
         * @param context The context that initiates the permission request.
         * @param permissionList Indicates the list of permissions to be requested. This parameter cannot be null or empty.
         * @returns Returns the {@link PermissionRequestResult}.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 12100001 - The parameter is invalid. The context is invalid when it does not belong to the application itself.
         * @since 9
         * @StageModelOnly
         */
        requestPermissionsFromUser(context: Context, permissionList: Array<Permissions>, requestCallback: AsyncCallback<PermissionRequestResult>) : void;
        requestPermissionsFromUser(context: Context, permissionList: Array<Permissions>) : Promise<PermissionRequestResult>;

        /**
         * Grants a specified user_grant permission to the given application.
         * @param tokenID The tokenId of specified application.
         * @param permissionName The permission name to be granted.
         * @param permissionFlags Flags of permission state.
         * @returns { void | Promise<void> } No callback return Promise otherwise return void.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 201 - Permission denied. Interface caller does not have permission "ohos.permission.GRANT_SENSITIVE_PERMISSIONS".
         * @throws { BusinessError } 12100001 - The parameter is invalid. The tokenID is 0, or the string size of permissionName is larger than 256, or the flags value is invalid.
         * @throws { BusinessError } 12100002 - The specified tokenID does not exist.
         * @throws { BusinessError } 12100003 - The specified permission does not exist.
         * @throws { BusinessError } 12100006 - The application specified by the tokenID is not allowed to be granted with the specified permission. Either the application is a sandbox or the tokenID is from a remote device.
         * @throws { BusinessError } 12100007 - Service is abnormal.
         * @permission ohos.permission.GRANT_SENSITIVE_PERMISSIONS
         * @systemapi
         * @since 8
         */
        grantUserGrantedPermission(tokenID: number, permissionName: Permissions, permissionFlags: number): Promise<void>;
        grantUserGrantedPermission(tokenID: number, permissionName: Permissions, permissionFlags: number, callback: AsyncCallback<void>): void;

        /**
         * Revoke a specified user_grant permission to the given application.
         * @param tokenID The tokenId of specified application.
         * @param permissionName The permission name to be revoked.
         * @param permissionFlags Flags of permission state.
         * @returns { void | Promise<void> } No callback return Promise otherwise return void.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 201 - Permission denied. Interface caller does not have permission "ohos.permission.REVOKE_SENSITIVE_PERMISSIONS".
         * @throws { BusinessError } 12100001 - The parameter is invalid. The tokenID is 0, or the string size of permissionName is larger than 256, or the flags value is invalid.
         * @throws { BusinessError } 12100002 - The specified tokenID does not exist.
         * @throws { BusinessError } 12100003 - The specified permission does not exist.
         * @throws { BusinessError } 12100006 - The application specified by the tokenID is not allowed to be revoked with the specified permission. Either the application is a sandbox or the tokenID is from a remote device.
         * @throws { BusinessError } 12100007 - Service is abnormal.
         * @permission ohos.permission.REVOKE_SENSITIVE_PERMISSIONS
         * @systemapi
         * @since 8
         */
        revokeUserGrantedPermission(tokenID: number, permissionName: Permissions, permissionFlags: number): Promise<void>;
        revokeUserGrantedPermission(tokenID: number, permissionName: Permissions, permissionFlags: number, callback: AsyncCallback<void>): void;

        /**
         * Queries specified permission flags of the given application.
         * @param tokenID The tokenId of specified application.
         * @param permissionName The permission name to be granted.
         * @returns Return permission flags.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 201 - Permission denied. Interface caller does not have permission specified below.
         * @throws { BusinessError } 12100001 - The parameter is invalid. The tokenID is 0, or the string size of permissionName is larger than 256.
         * @throws { BusinessError } 12100002 - The specified tokenID does not exist.
         * @throws { BusinessError } 12100003 - The specified permission does not exist.
         * @throws { BusinessError } 12100006 - The operation is not allowed. Either the application is a sandbox or the tokenID is from a remote device.
         * @throws { BusinessError } 12100007 - Service is abnormal.
         * @permission ohos.permission.GET_SENSITIVE_PERMISSIONS or ohos.permission.GRANT_SENSITIVE_PERMISSIONS or ohos.permission.REVOKE_SENSITIVE_PERMISSIONS
         * @systemapi
         * @since 8
         */
        getPermissionFlags(tokenID: number, permissionName: Permissions): Promise<number>;

        /**
         * Queries permission management version.
         * @returns Return permission version.
         * @systemapi
         * @since 9
         */
        getVersion(): Promise<number>;

        /**
         * Registers a permission state callback so that the application can be notified upon specified permission state of specified applications changes.
         * @param tokenIDList A list of tokenIds that specifies the applications to be listened on. The value in the list can be:
         *        <ul>
         *        <li>{@code empty} - Indicates that the application can be notified if the specified permission state of any applications changes.
         *        </li>
         *        <li>{@code non-empty} - Indicates that the application can only be notified if the specified permission state of the specified applications change.
         *        </li>
         *        </ul>
         * @param permissionList A list of permissions that specifies the permissions to be listened on. The value in the list can be:
         *        <ul>
         *        <li>{@code empty} - Indicates that the application can be notified if any permission state of the specified applications changes.
         *        </li>
         *        <li>{@code non-empty} - Indicates that the application can only be notified if the specified permission state of the specified applications changes.
         *        </li>
         *        </ul>
         * @param callback Callback used to listen for the permission state changed event.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 201 - Permission denied. Interface caller does not have permission "ohos.permission.GET_SENSITIVE_PERMISSIONS".
         * @throws { BusinessError } 12100001 - The parameter is invalid. The tokenID is 0, or the string size of permissionName is larger than 256.
         * @throws { BusinessError } 12100004 - The interface is called repeatedly with the same input.
         * @throws { BusinessError } 12100005 - The registration time has exceeded the limitation.
         * @throws { BusinessError } 12100007 - Service is abnormal.
         * @throws { BusinessError } 12100008 - Out of memory.
         * @permission ohos.permission.GET_SENSITIVE_PERMISSIONS
         * @systemapi
         * @since 9
         */
        on(type: 'permissionStateChange', tokenIDList: Array<number>, permissionList: Array<Permissions>, callback: Callback<PermissionStateChangeInfo>): void;

        /**
         * Unregisters a permission state callback so that the specified applications cannot be notified upon specified permissions state changes anymore.
         * @param tokenIDList A list of tokenIds that specifies the applications being listened on. it should correspond to the value registered by function of "on", whose type is "permissionStateChange".
         * @param permissionList A list of permissions that specifies the permissions being listened on. it should correspond to the value registered by function of "on", whose type is "permissionStateChange".
         * @param callback Callback used to listen for the permission state changed event.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 201 - Permission denied. Interface caller does not have permission "ohos.permission.GET_SENSITIVE_PERMISSIONS".
         * @throws { BusinessError } 12100001 - The parameter is invalid. The tokenID in list is all invalid, or the permissionName in list is all invalid.
         * @throws { BusinessError } 12100004 - The interface is not used together with "on".
         * @throws { BusinessError } 12100007 - Service is abnormal.
         * @throws { BusinessError } 12100008 - Out of memory.
         * @permission ohos.permission.GET_SENSITIVE_PERMISSIONS
         * @systemapi
         * @since 9
         */
        off(type: 'permissionStateChange', tokenIDList: Array<number>, permissionList: Array<Permissions>, callback?: Callback<PermissionStateChangeInfo>): void;
    }
  
    /**
     * GrantStatus.
     * @since 8
     */
    export enum GrantStatus {
        /**
         * access_token permission check fail
         */
        PERMISSION_DENIED = -1,
        /**
         * access_token permission check success
         */
        PERMISSION_GRANTED = 0,
    }

    /**
     * Enum for permission state change type.
     * @systemapi
     * @since 9
     */
    export enum PermissionStateChangeType {
        /**
         * A granted user_grant permission is revoked.
         */
        PERMISSION_REVOKED_OPER = 0,
        /**
         * A user_grant permission is granted.
         */
        PERMISSION_GRANTED_OPER = 1,
    }

    /**
     * Indicates the information of permission state change.
     * @name PermissionStateChangeInfo
     * @systemapi
     * @since 9
     */
    interface PermissionStateChangeInfo {
        /**
         * Indicates the permission state change type.
         */
        change: PermissionStateChangeType;

        /**
         * Indicates the application whose permission state has been changed.
         */
        tokenID: number;

        /**
         * Indicates the permission whose state has been changed.
         */
        permissionName: Permissions;
    }
 }

 export default abilityAccessCtrl;
 export { Permissions };