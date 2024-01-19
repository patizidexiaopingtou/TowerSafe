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

import {AsyncCallback, Callback} from './basic'
import { Permissions } from './permissions'

/**
 * @syscap SystemCapability.Security.AccessToken
 */
 declare namespace privacyManager {
    /**
     * Adds access record of sensitive permission.
     * @param tokenID The tokenId of specified application.
     * @param permissionName The permission name to be added.
     * @param successCount Access count.
     * @param failCount Reject count.
     * @returns { void | Promise<void> } No callback return Promise otherwise return void.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 201 - Permission denied. Interface caller does not have permission "ohos.permission.PERMISSION_USED_STATS".
     * @throws { BusinessError } 12100001 - The parameter is invalid. The tokenID is 0, or the string size of permissionName is larger than 256, or the count value is invalid.
     * @throws { BusinessError } 12100002 - The specified tokenID does not exist or it does not refer to an application process.
     * @throws { BusinessError } 12100003 - The specified permission does not exist or it is not an user_grant permission.
     * @throws { BusinessError } 12100007 - Service is abnormal.
     * @throws { BusinessError } 12100008 - Out of memory.
     * @permission ohos.permission.PERMISSION_USED_STATS
     * @systemapi
     * @since 9
     */
    function addPermissionUsedRecord(tokenID: number, permissionName: Permissions, successCount: number, failCount: number): Promise<void>;
    function addPermissionUsedRecord(tokenID: number, permissionName: Permissions, successCount: number, failCount: number, callback: AsyncCallback<void>): void;

    /**
     * Queries the access records of sensitive permission.
     * @param request The request of permission used records.
     * @returns Return the response of permission used records.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 201 - Permission denied. Interface caller does not have permission "ohos.permission.PERMISSION_USED_STATS".
     * @throws { BusinessError } 12100001 - The parameter is invalid. the value of flag in request is invalid.
     * @throws { BusinessError } 12100002 - The specified tokenID does not exist or it does not refer to an application process.
     * @throws { BusinessError } 12100003 - The specified permission does not exist or it is not an user_grant permission.
     * @throws { BusinessError } 12100007 - Service is abnormal.
     * @throws { BusinessError } 12100008 - Out of memory.
     * @permission ohos.permission.PERMISSION_USED_STATS
     * @systemapi
     * @since 9
     */
    function getPermissionUsedRecord(request: PermissionUsedRequest): Promise<PermissionUsedResponse>;
    function getPermissionUsedRecord(request: PermissionUsedRequest, callback: AsyncCallback<PermissionUsedResponse>): void;

    /**
     * Start using sensitive permission.
     * @param tokenID The tokenId of specified application.
     * @param permissionName The permission name to be started.
     * @returns { void | Promise<void> } No callback return Promise otherwise return void.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 201 - Permission denied. Interface caller does not have permission "ohos.permission.PERMISSION_USED_STATS".
     * @throws { BusinessError } 12100001 - The parameter is invalid. The tokenID is 0, or the string size of permissionName is larger than 256.
     * @throws { BusinessError } 12100002 - The specified tokenID does not exist or it does not refer to an application process.
     * @throws { BusinessError } 12100003 - The specified permission does not exist or it is not an user_grant permission.
     * @throws { BusinessError } 12100004 - The interface is called repeatedly with the same input. It means the application specified by the tokenID has been using the specified permission.
     * @throws { BusinessError } 12100007 - Service is abnormal.
     * @throws { BusinessError } 12100008 - Out of memory.
     * @permission ohos.permission.PERMISSION_USED_STATS
     * @systemapi
     * @since 9
     */
    function startUsingPermission(tokenID: number, permissionName: Permissions): Promise<void>;
    function startUsingPermission(tokenID: number, permissionName: Permissions, callback: AsyncCallback<void>): void;

    /**
     * Stop using sensitive permission.
     * @param tokenID The tokenId of specified application.
     * @param permissionName The permission name to be stopped.
     * @returns { void | Promise<void> } No callback return Promise otherwise return void.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 201 - Permission denied. Interface caller does not have permission "ohos.permission.PERMISSION_USED_STATS".
     * @throws { BusinessError } 12100001 - The parameter is invalid. The tokenID is 0, or the string size of permissionName is larger than 256.
     * @throws { BusinessError } 12100002 - The specified tokenID does not exist or it does not refer to an application process.
     * @throws { BusinessError } 12100003 - The specified permission does not exist or it is not an user_grant permission.
     * @throws { BusinessError } 12100004 - The interface is not used with "startUsingPermission".
     * @throws { BusinessError } 12100007 - Service is abnormal.
     * @throws { BusinessError } 12100008 - Out of memory.
     * @permission ohos.permission.PERMISSION_USED_STATS
     * @systemapi
     * @since 9
     */
    function stopUsingPermission(tokenID: number, permissionName: Permissions): Promise<void>;
    function stopUsingPermission(tokenID: number, permissionName: Permissions, callback: AsyncCallback<void>): void;

    /**
     * Subscribes to the change of active state of the specified permission.
     * @param permissionList Indicates the permission list, which are specified.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 201 - Permission denied. Interface caller does not have permission "ohos.permission.PERMISSION_USED_STATS".
     * @throws { BusinessError } 12100001 - The parameter is invalid. The tokenID is 0, or the string size of permissionName is larger than 256.
     * @throws { BusinessError } 12100004 - The interface is called repeatedly with the same input.
     * @throws { BusinessError } 12100005 - The registration time has exceeded the limitation.
     * @throws { BusinessError } 12100007 - Service is abnormal.
     * @throws { BusinessError } 12100008 - Out of memory.
     * @permission ohos.permission.PERMISSION_USED_STATS
     * @systemapi
     * @since 9
     */
    function on(type: 'activeStateChange', permissionList: Array<Permissions>, callback: Callback<ActiveChangeResponse>): void;

    /**
     * Unsubscribes to the change of active state of the specified permission.
     * @param permissionList Indicates the permission list, which are specified.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 201 - Permission denied. Interface caller does not have permission "ohos.permission.PERMISSION_USED_STATS".
     * @throws { BusinessError } 12100001 - The parameter is invalid. The permissionName in list is all invalid or the list size is larger than 1024.
     * @throws { BusinessError } 12100004 - The interface is not used together with "on".
     * @throws { BusinessError } 12100007 - Service is abnormal.
     * @throws { BusinessError } 12100008 - Out of memory.
     * @permission ohos.permission.PERMISSION_USED_STATS
     * @systemapi
     * @since 9
     */
    function off(type: 'activeStateChange', permissionList: Array<Permissions>, callback?: Callback<ActiveChangeResponse>): void;

    /**
     * Enum for permission for status.
     * @systemapi
     * @since 9
     */
     enum PermissionActiveStatus {
        /**
         * permission is not used yet.
         */
        PERM_INACTIVE = 0,

        /**
         * permission is used in front_end.
         */
        PERM_ACTIVE_IN_FOREGROUND = 1,

        /**
         * permission is used in back_end.
         */
        PERM_ACTIVE_IN_BACKGROUND = 2,
    }

    /**
     * Indicates the response of permission active status.
     * @systemapi
     * @since 9
     */
    interface ActiveChangeResponse {
        /**
         * AccessTokenID
         */
        tokenId: number;

        /**
        * The permission name
        */
        permissionName: Permissions;
    
        /**
        * The device id
        */
        deviceId: string;
        /**
        * The active status name
        */
        activeStatus: PermissionActiveStatus;
    }

    /**
     * PermissionUsageFlag.
     * @systemapi
     * @since 9
     */
    enum PermissionUsageFlag {
        /**
         * permission used summary
         */
        FLAG_PERMISSION_USAGE_SUMMARY = 0,
        /**
         * permission used detail
         */
        FLAG_PERMISSION_USAGE_DETAIL = 1,
    }

    /**
     * Provides request of querying permission used records.
     * @systemapi
     * @since 9
     */
    interface PermissionUsedRequest {
        /**
         * AccessTokenID
         */
        tokenId: number;

        /**
         * Distribute flag
         */
        isRemote: boolean;

         /**
         * The device id
         */
        deviceId: string;

        /**
         * The bundle name
         */
        bundleName: string;

        /**
         * The list of permission name
         */ 
        permissionNames: Array<Permissions>;

        /**
         * The begin time, in milliseconds
         */
        beginTime: number;

        /**
         * The end time, in milliseconds
         */
        endTime: number;

        /**
         * The permission usage flag
         */
        flag: PermissionUsageFlag;
    }

    /**
     * Provides response of querying permission used records.
     * @systemapi
     * @since 9
     */
    interface PermissionUsedResponse {
        /**
         * The begin time, in milliseconds
         */
        beginTime: number;

        /**
         * The end time, in milliseconds
         */
        endTime: number;

        /**
         * The list of permission used records of bundle
         */ 
        bundleRecords: Array<BundleUsedRecord>;
    }

    /**
     * BundleUsedRecord.
     * @systemapi
     * @since 9
     */
     interface BundleUsedRecord {
        /**
         * AccessTokenID
         */
        tokenId: number;

        /**
          * Distribute flag
          */
        isRemote: boolean;

        /**
         * The device id 
         */
        deviceId: string;

        /**
         * The bundle name 
         */
        bundleName: string;

        /**
         * The list of permission used records
         */ 
        permissionRecords: Array<PermissionUsedRecord>;
    }

    /**
     * PermissionUsedRecord.
     * @systemapi
     * @since 9
     */
    interface PermissionUsedRecord {
        /**
        * The permission name 
        */
        permissionName: Permissions;

        /**
         * The access counts
         */
        accessCount: number;

        /**
         * The reject counts
         */
        rejectCount: number;

        /**
         * The last access time, in milliseconds
         */
        lastAccessTime: number;

        /**
         * The last reject time, in milliseconds
         */
        lastRejectTime: number;

        /**
         * The last access duration, in milliseconds
         */
        lastAccessDuration: number;

         /**
         * The list of access records of details
         */
        accessRecords: Array<UsedRecordDetail>;

        /**
         * The list of reject records of details
         */
        rejectRecords: Array<UsedRecordDetail>;
    }

    /**
     * UsedRecordDetail.
     * @systemapi
     * @since 9
     */
    interface UsedRecordDetail {
        /**
         * The status
         */
        status: number;

        /**
         * Timestamp, in milliseconds
         */
        timestamp: number;

        /**
         * Access duration, in milliseconds
         */
        accessDuration: number;
    }
}

export default privacyManager;
export { Permissions };