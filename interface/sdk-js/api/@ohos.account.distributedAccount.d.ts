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

import {AsyncCallback} from './basic'

/**
 * This module provides the capability to manage distributed accounts.
 * @syscap SystemCapability.Account.OsAccount
 * @since 7
 */
declare namespace distributedAccount {
    /**
     * Get the ability of the distributed account.
     * @permission N/A
     * @syscap SystemCapability.Account.OsAccount
     * @returns Ability to manage operations of distributed account.
     * @since 7
     */
    function getDistributedAccountAbility(): DistributedAccountAbility;

    /**
     * Defines distributed account functions and interfaces.
     * @name DistributedAccountAbility
     * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
     * @syscap SystemCapability.Account.OsAccount
     * @since 7
     */
    interface DistributedAccountAbility {
        /**
         * Queries the distributed information of the current OS account.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.DISTRIBUTED_DATASYNC
         * @returns The distributed information of the current OS account.
         * @since 7
         * @deprecated since 9
         * @useinstead distributedAccount.DistributedAccountAbility#getOsAccountDistributedInfo
         */
        queryOsAccountDistributedInfo(callback: AsyncCallback<DistributedInfo>): void;
        queryOsAccountDistributedInfo(): Promise<DistributedInfo>;

        /**
         * Gets the distributed information of the current OS account.
         * @permission ohos.permission.MANAGE_DISTRIBUTED_ACCOUNTS or ohos.permission.GET_DISTRIBUTED_ACCOUNTS or ohos.permission.DISTRIBUTED_DATASYNC
         * @returns The distributed information of the current OS account.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @since 9
         */
        getOsAccountDistributedInfo(callback: AsyncCallback<DistributedInfo>): void;
        getOsAccountDistributedInfo(): Promise<DistributedInfo>;

        /**
         * Updates the distributed information of the OS account.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param accountInfo Indicates the information of the OS account used for a distributed system.
         * @returns void
         * @since 7
         * @deprecated since 9
         * @useinstead distributedAccount.DistributedAccountAbility#setOsAccountDistributedInfo
         */
        updateOsAccountDistributedInfo(accountInfo: DistributedInfo, callback: AsyncCallback<void>): void;
        updateOsAccountDistributedInfo(accountInfo: DistributedInfo): Promise<void>;

        /**   
         * Sets the distributed information of the OS account.
         * @permission ohos.permission.MANAGE_DISTRIBUTED_ACCOUNTS
         * @param accountInfo Indicates the information of the OS account used for a distributed system.
         * @returns void
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid accountInfo.
         * @throws {BusinessError} 12300003 - the account indicated by accountInfo dose not exist.
         * @since 9
         */
        setOsAccountDistributedInfo(accountInfo: DistributedInfo, callback: AsyncCallback<void>): void;
        setOsAccountDistributedInfo(accountInfo: DistributedInfo): Promise<void>;
    }

    /**
     * Provides the distributed information of the OS account.
     *
     * @name DistributedInfo
     * @permission N/A
     * @syscap SystemCapability.Account.OsAccount
     * @since 7
     */
    interface DistributedInfo {
        /**
         * The name in the distributed information of the OS account.
         *
         * @since 7
         */
        name: string;

        /**
         * The ID in the distributed information of the OS account.
         *
         * @since 7
         */
        id: string;

        /**
         * The event string in the distributed information of the OS account.
         *
         * @since 7
         */   
        event: string;

        /**
         * The nickname in the distributed information of the OS account.
         *
         * @since 9
         */
        nickname?: string;

        /**
         * The avatar in the distributed information of the OS account.
         *
         * @since 9
         */
        avatar?: string;

        /**
         * The scalable data in the distributed information of the OS account.
         */
        scalableData?: object;
    }
}

export default distributedAccount;