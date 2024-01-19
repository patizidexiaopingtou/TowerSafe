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

import distributedAccount from './@ohos.account.distributedAccount'
import { AsyncCallback, Callback } from './basic';

/**
 * This module provides the capability to manage os accounts.
 * @syscap SystemCapability.Account.OsAccount
 * @since 7
 */
declare namespace osAccount {
    /**
     * Obtains the AccountManager instance.
     * @returns Returns the instance of the AccountManager.
     * @syscap SystemCapability.Account.OsAccount
     * @since 7
     */
    function getAccountManager(): AccountManager;

    /**
     * Provides abilities for you to manage and perform operations on your OS accounts.
     * @name AccountManager
     * @syscap SystemCapability.Account.OsAccount
     * @since 7
     */
    interface AccountManager {
        /**
         * Activates a specified OS account.
         * <p>
         * If multiple OS accounts are available, you can call this method to enable a specific OS account
         * to run in the foreground. Then, the OS account originally running in the foreground will be
         * switched to the background.
         * </p>
         * @permission ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS_EXTENSION
         * @param localId Indicates the local ID of the OS account.
         * @returns void.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid localId.
         * @throws {BusinessError} 12300003 - the account indicated by localId dose not exist.
         * @throws {BusinessError} 12300008 - the localId indicates restricted account.
         * @throws {BusinessError} 12300009 - the account indicated by localId has been activated.
         * @systemapi Hide this for inner system use.
         * @since 7
         */
        activateOsAccount(localId: number, callback: AsyncCallback<void>): void;
        activateOsAccount(localId: number): Promise<void>;

        /**
         * Checks whether the function of supporting multiple OS accounts is enabled.
         * @returns Returns {@code true} if this function is enabled; returns {@code false} otherwise.
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#checkMultiOsAccountEnabled
         */
        isMultiOsAccountEnable(callback: AsyncCallback<boolean>): void;
        isMultiOsAccountEnable(): Promise<boolean>;

        /**
         * Checks whether the function of supporting multiple OS accounts is enabled.
         * @returns void
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @since 9
         */
        checkMultiOsAccountEnabled(callback: AsyncCallback<boolean>): void;
        checkMultiOsAccountEnabled(): Promise<boolean>;

        /**
         * Checks whether an OS account is activated based on its local ID.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
         * @param localId Indicates the local ID of the OS account.
         * @returns Returns {@code true} if the OS account is activated; returns {@code false} otherwise.
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#checkOsAccountActivated
         */
        isOsAccountActived(localId: number, callback: AsyncCallback<boolean>): void;
        isOsAccountActived(localId: number): Promise<boolean>;

        /**
         * Checks whether an OS account is activated based on its local ID.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
         * @param localId Indicates the local ID of the OS account.
         * @returns void
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid localId.
         * @throws {BusinessError} 12300003 - the account indicated by localId dose not exist.
         * @since 9
         */
        checkOsAccountActivated(localId: number, callback: AsyncCallback<boolean>): void;
        checkOsAccountActivated(localId: number): Promise<boolean>;

        /**
         * Checks whether a constraint has been enabled for an OS account based on its local ID.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param localId Indicates the local ID of the OS account.
         * @param constraint Indicates the constraint to check. The value can be:
         *        <ul>
         *        <li>{@code constraint.wifi.set} - Indicates the constraint on configuring the Wi-Fi access point.
         *        </li>
         *        <li>{@code constraint.sms.use} - Indicates the constraint on sending and receiving short messages.
         *        </li>
         *        <li>{@code constraint.calls.outgoing} - Indicates the constraint on making calls.</li>
         *        <li>{@code constraint.unknown.sources.install} - Indicates the constraint on installing applications
         *        from unknown sources.</li>
         *        </ul>
         * @returns Returns {@code true} if the constraint has been enabled for the OS account;
         *         returns {@code false} otherwise.
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#checkConstraintEnabled
         */
        isOsAccountConstraintEnable(localId: number, constraint: string, callback: AsyncCallback<boolean>): void;
        isOsAccountConstraintEnable(localId: number, constraint: string): Promise<boolean>;

        /**
         * Checks whether the given constraint is enabled for the specified OS account.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @param { string } constraint - Indicates the constraint to check. For example: the value can be:
         *        <ul>
         *        <li>{@code constraint.wifi.set} - Indicates the constraint on configuring the Wi-Fi access point.
         *        </li>
         *        <li>{@code constraint.sms.use} - Indicates the constraint on sending and receiving short messages.
         *        </li>
         *        <li>{@code constraint.calls.outgoing} - Indicates the constraint on making calls.</li>
         *        <li>{@code constraint.unknown.sources.install} - Indicates the constraint on installing applications
         *        from unknown sources.</li>
         *        </ul>
         * @param { AsyncCallback<boolean> } callback - Indicates the callback for checking whether the constraint is enabled for the specified OS account.
         * @throws { BusinessError } 201 - permission denied.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @throws { BusinessError } 12300002 - invalid localId or constraint.
         * @throws { BusinessError } 12300003 - the account indicated by localId dose not exist.
         * @since 9
         */
        checkOsAccountConstraintEnabled(localId: number, constraint: string, callback: AsyncCallback<boolean>): void;

        /**
         * Checks whether the given constraint is enabled for the specified OS account.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @param { string } constraint - Indicates the constraint to check. For example: the value can be:
         *        <ul>
         *        <li>{@code constraint.wifi.set} - Indicates the constraint on configuring the Wi-Fi access point.
         *        </li>
         *        <li>{@code constraint.sms.use} - Indicates the constraint on sending and receiving short messages.
         *        </li>
         *        <li>{@code constraint.calls.outgoing} - Indicates the constraint on making calls.</li>
         *        <li>{@code constraint.unknown.sources.install} - Indicates the constraint on installing applications
         *        from unknown sources.</li>
         *        </ul>
         * @returns { Promise<boolean> } Returns whether the given constraint is enabled for the specified OS account.
         * @throws { BusinessError } 201 - permission denied.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @throws { BusinessError } 12300002 - invalid localId or constraint.
         * @throws { BusinessError } 12300003 - the account indicated by localId dose not exist.
         * @since 9
         */
        checkOsAccountConstraintEnabled(localId: number, constraint: string): Promise<boolean>;
        
        /**
         * Checks whether this OS account is a test OS account.
         * @returns Returns {@code true} if this OS account is a test OS account; returns {@code false} otherwise.
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#checkOsAccountTestable
         */
        isTestOsAccount(callback: AsyncCallback<boolean>): void;
        isTestOsAccount(): Promise<boolean>;

        /**
         * Checks whether current OS account is testable.
         * @returns Returns {@code true} if this account is testable; returns {@code false} otherwise.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @since 9
         */
        checkOsAccountTestable(callback: AsyncCallback<boolean>): void;
        checkOsAccountTestable(): Promise<boolean>;

        /**
         * Checks whether an OS account has been verified based on its local ID.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
         * @param localId Indicates the local ID of the OS account.
         * @returns Returns {@code true} if the OS account has been verified successfully;
         *          returns {@code false} otherwise.
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#checkOsAccountVerified
         * 
         */
        isOsAccountVerified(callback: AsyncCallback<boolean>): void;
        isOsAccountVerified(localId: number, callback: AsyncCallback<boolean>): void;
        isOsAccountVerified(localId?: number): Promise<boolean>;

        /**
         * Checks whether the current OS account is verified.
         * @param { AsyncCallback<boolean> } callback - Indicates the callback for checking whether the current OS account is verified.
         * @throws { BusinessError } 12300001 - system service exception.
         * @since 9
         */
        checkOsAccountVerified(callback: AsyncCallback<boolean>): void;

        /**
         * Checks whether the current OS account is verified.
         * @returns { Promise<boolean> } Returns whether the current OS account is verified.
         * @throws { BusinessError } 12300001 - system service exception.
         * @since 9
         */
        checkOsAccountVerified(): Promise<boolean>;

        /**
         * Checks whether the specified OS account is verified.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @param { AsyncCallback<boolean> } callback - Indicates the callback for checking whether the specified OS account is verified.
         * @throws { BusinessError } 201 - permission denied.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @throws { BusinessError } 12300002 - invalid localId.
         * @throws { BusinessError } 12300003 - the account indicated by localId dose not exist.
         * @since 9
         */
        checkOsAccountVerified(localId: number, callback: AsyncCallback<boolean>): void;

        /**
         * Checks whether the specified OS account is verified.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @returns { Promise<boolean> } Returns whether the specified OS account is verified.
         * @throws { BusinessError } 201 - permission denied.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @throws { BusinessError } 12300002 - invalid localId.
         * @throws { BusinessError } 12300003 - the account indicated by localId dose not exist.
         * @since 9
         */
        checkOsAccountVerified(localId: number): Promise<boolean>;

        /**
         * Removes an OS account based on its local ID.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param localId Indicates the local ID of the OS account.
         * @returns void.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid localId.
         * @throws {BusinessError} 12300003 - the account indicated by localId dose not exist.
         * @throws {BusinessError} 12300008 - the localId indicates restricted account.
         * @systemapi Hide this for inner system use.
         * @since 7
         */
        removeOsAccount(localId: number, callback: AsyncCallback<void>): void;
        removeOsAccount(localId: number): Promise<void>;

        /**
         * Sets constraints for an OS account based on its local ID.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param localId Indicates the local ID of the OS account.
         * @param constraints Indicates the constraints to set for the OS account. The value can be:
         *        <ul>
         *        <li>{@code constraint.wifi.set} - Indicates the constraint on configuring the Wi-Fi access point.
         *        </li>
         *        <li>{@code constraint.sms.use} - Indicates the constraint on sending and receiving short messages.
         *        </li>
         *        <li>{@code constraint.calls.outgoing} - Indicates the constraint on making calls.</li>
         *        <li>{@code constraint.unknown.sources.install} - Indicates the constraint on installing applications
         *        from unknown sources.</li>
         *        </ul>
         * @param enable Specifies whether to enable the constraint.
         * @returns void.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid localId or constraints.
         * @throws {BusinessError} 12300003 - the account indicated by localId dose not exist.
         * @throws {BusinessError} 12300008 - the localId indicates restricted account.
         * @systemapi Hide this for inner system use.
         * @since 7
         */
        setOsAccountConstraints(localId: number, constraints: Array<string>, enable: boolean,
                                callback: AsyncCallback<void>): void;
        setOsAccountConstraints(localId: number, constraints: Array<string>, enable: boolean): Promise<void>;

        /**
         * Sets the local name for an OS account based on its local ID.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param localId Indicates the local ID of the OS account.
         * @param localName Indicates the local name to set for the OS account.
         * @returns void.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid localId or localName.
         * @throws {BusinessError} 12300003 - the account indicated by localId dose not exist.
         * @throws {BusinessError} 12300008 - the localId indicates restricted account.
         * @systemapi Hide this for inner system use.
         * @since 7
         */
        setOsAccountName(localId: number, localName: string, callback: AsyncCallback<void>): void;
        setOsAccountName(localId: number, localName: string): Promise<void>;

        /**
         * Obtains the number of all OS accounts created on a device.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @returns Returns the number of created OS accounts.
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountCount
         */
        getCreatedOsAccountsCount(callback: AsyncCallback<number>): void;
        getCreatedOsAccountsCount(): Promise<number>;

        /**
         * Obtains the number of all OS accounts created on a device.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @returns Returns the number of created OS accounts.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @since 9
         */
        getOsAccountCount(callback: AsyncCallback<number>): void;
        getOsAccountCount(): Promise<number>;

        /**
         * Obtains the local ID of an OS account from the current process UID.
         * @returns Returns the local ID of the OS account.
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountLocalId
         */
        getOsAccountLocalIdFromProcess(callback: AsyncCallback<number>): void;
        getOsAccountLocalIdFromProcess(): Promise<number>;

        /**
         * Gets the local ID of the current OS account.
         * @param { AsyncCallback<number> } callback - Indicates the callback for getting the local ID of the current OS account.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @since 9
         */
        getOsAccountLocalId(callback: AsyncCallback<number>): void;

        /**
         * Get the local ID of the current OS account.
         * @returns { Promise<number> } Returns the local ID of the current account.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @since 9
         */
        getOsAccountLocalId(): Promise<number>;

        /**
         * Gets the local ID of an OS account from the process UID
         * @param uid Indicates the process UID.
         * @returns Returns the local ID of the OS account.
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountLocalIdForUid
         */
        getOsAccountLocalIdFromUid(uid: number, callback: AsyncCallback<number>): void;
        getOsAccountLocalIdFromUid(uid: number): Promise<number>;

        /**
         * Gets the local ID of the OS account associated with the specified UID.
         * @param { number } uid - Indicates the process UID.
         * @param { AsyncCallback<number> } callback - Indicates the callback for getting the local ID of the OS account associated with the specified UID.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid uid.
         * @since 9
         */
        getOsAccountLocalIdForUid(uid: number, callback: AsyncCallback<number>): void;

        /**
         * Get the local ID of the OS account associated with the specified UID.
         * @param { number } uid - Indicates the process UID.
         * @returns { Promise<number> } Returns the local ID of the OS account associated with the specified UID.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @throws { BusinessError } 12300002 - invalid uid.
         * @since 9
         */
        getOsAccountLocalIdForUid(uid: number): Promise<number>;

        /**
         * Queries the local ID of an OS account which is bound to the specified domain account.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param domainInfo Indicates the domain account info.
         * @returns Returns the local ID of the OS account.
         * @since 8
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountLocalIdForDomain
         */
        getOsAccountLocalIdFromDomain(domainInfo: DomainAccountInfo, callback: AsyncCallback<number>): void;
        getOsAccountLocalIdFromDomain(domainInfo: DomainAccountInfo): Promise<number>;

        /**
         * Gets the local ID of the OS account associated with the specified domain account.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { DomainAccountInfo } domainInfo - Indicates the domain account info.
         * @param { AsyncCallback<number> } callback - Indicates the callback for getting the local ID of the OS account associated with the specified domain account.
         * @throws { BusinessError } 201 - permission denied.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @throws { BusinessError } 12300002 - invalid domainInfo.
         * @since 9
         */
        getOsAccountLocalIdForDomain(domainInfo: DomainAccountInfo, callback: AsyncCallback<number>): void;

        /**
         * Gets the local ID of the OS account associated with the specified domain account.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { DomainAccountInfo } domainInfo - Indicates the domain account info.
         * @returns { Promise<number> } Returns the local ID of the OS account associated with the specified domain account.
         * @throws { BusinessError } 201 - permission denied.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @throws { BusinessError } 12300002 - invalid domainInfo.
         * @since 9
         */
        getOsAccountLocalIdForDomain(domainInfo: DomainAccountInfo): Promise<number>;

        /**
         * Queries the maximum number of OS accounts that can be created on a device.
         * @returns Returns the maximum number of OS accounts that can be created.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @systemapi Hide this for inner system use.
         * @since 7
         */
        queryMaxOsAccountNumber(callback: AsyncCallback<number>): void;
        queryMaxOsAccountNumber(): Promise<number>;

        /**
         * Obtains all constraints of an OS account based on its local ID.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param localId Indicates the local ID of the OS account.
         * @returns Returns a list of constraints.
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountConstraints
         */
        getOsAccountAllConstraints(localId: number, callback: AsyncCallback<Array<string>>): void;
        getOsAccountAllConstraints(localId: number): Promise<Array<string>>;

        /**
         * Obtains all constraints of an account based on its ID.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param localId Indicates the local ID of the OS account.
         * @returns Returns a list of constraints.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid localId.
         * @throws {BusinessError} 12300003 - the account indicated by localId dose not exist.
         * @since 9
         */
        getOsAccountConstraints(localId: number, callback: AsyncCallback<Array<string>>): void;
        getOsAccountConstraints(localId: number): Promise<Array<string>>;

        /**
         * Queries the list of all the OS accounts that have been created in the system.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @returns Returns a list of OS accounts.         
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @systemapi Hide this for inner system use.
         * @since 7
         */
        queryAllCreatedOsAccounts(callback: AsyncCallback<Array<OsAccountInfo>>): void;
        queryAllCreatedOsAccounts(): Promise<Array<OsAccountInfo>>;

        /**
         * Queries the id list of all activated OS accounts.
         * @returns Returns a id list of OS accounts.
         * @since 8
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getActivatedOsAccountLocalIds
         */
        queryActivatedOsAccountIds(callback: AsyncCallback<Array<number>>): void;
        queryActivatedOsAccountIds(): Promise<Array<number>>;

        /**
         * Gets the local IDs of all activated OS accounts.
         * @param { AsyncCallback<Array<number>> } callback - Indicates the callback for getting the local IDs of all activated OS accounts.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @since 9
         */
        getActivatedOsAccountLocalIds(callback: AsyncCallback<Array<number>>): void;

        /**
         * Gets the local IDs of all activated OS accounts.
         * @returns { Promise<Array<number>> } Returns all activated accounts.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @since 9
         */
        getActivatedOsAccountLocalIds(): Promise<Array<number>>;

        /**
         * Creates an OS account using the local name and account type.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param localName Indicates the local name of the OS account to create.
         * @param type Indicates the type of the OS account to create.
         *        {@link OsAccountType} specifies the account types available in the system.
         * @returns Returns information about the created OS account; returns {@code null} if the creation fails.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid localName.
         * @throws {BusinessError} 12300005 - multi-user not supported.
         * @throws {BusinessError} 12300006 - unsupported account type.
         * @throws {BusinessError} 12300007 - the number of account reaches the upper limit.
         * @systemapi Hide this for inner system use.
         * @since 7
         */
        createOsAccount(localName: string, type: OsAccountType, callback: AsyncCallback<OsAccountInfo>): void;
        createOsAccount(localName: string, type: OsAccountType): Promise<OsAccountInfo>;

        /**
         * Creates an OS account using the account type and domain account info.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param type Indicates the type of the OS account to create.
         *        {@link OsAccountType} specifies the account types available in the system.
         * @param domainInfo Indicates the domain account info.
         * @returns Returns information about the created OS account; returns {@code null} if the creation fails.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid type or domainInfo.
         * @throws {BusinessError} 12300005 - multi-user not supported.
         * @throws {BusinessError} 12300006 - unsupported account type.
         * @throws {BusinessError} 12300007 - the number of account reaches the upper limit.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        createOsAccountForDomain(type: OsAccountType, domainInfo: DomainAccountInfo, callback: AsyncCallback<OsAccountInfo>): void;
        createOsAccountForDomain(type: OsAccountType, domainInfo: DomainAccountInfo): Promise<OsAccountInfo>;

        /**
         * Queries information about the current OS account.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @returns Returns information about the current OS account; returns {@code null} if the query fails.
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getCurrentOsAccount
         */
        queryCurrentOsAccount(callback: AsyncCallback<OsAccountInfo>): void;
        queryCurrentOsAccount(): Promise<OsAccountInfo>;

        /**
         * Gets information about the current OS account.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @returns Returns information about the current OS account; returns {@code null} if the query fails.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @since 9
         */
        getCurrentOsAccount(callback: AsyncCallback<OsAccountInfo>): void;
        getCurrentOsAccount(): Promise<OsAccountInfo>;

        /**
         * Queries OS account information based on the local ID.
         *
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS or ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS_EXTENSION
         * @param localId Indicates the local ID of the OS account.
         * @returns Returns the OS account information; returns {@code null} if the query fails.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid localId.
         * @throws {BusinessError} 12300003 - the account indicated by localId dose not exist.
         * @systemapi Hide this for inner system use.
         * @since 7
         */
        queryOsAccountById(localId: number, callback: AsyncCallback<OsAccountInfo>): void;
        queryOsAccountById(localId: number): Promise<OsAccountInfo>;

        /**
         * Obtains the type of this OS account from the current process.
         * @returns Returns the OS account type. The value can be {@link OsAccountType#ADMIN},
         *         {@link OsAccountType#NORMAL}, and {@link OsAccountType#GUEST}.
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountType
         */
        getOsAccountTypeFromProcess(callback: AsyncCallback<OsAccountType>): void;
        getOsAccountTypeFromProcess(): Promise<OsAccountType>;

        /**
         * Obtains the type of this OS account from the current process.
         * @returns Returns the OS account type. The value can be {@link OsAccountType#ADMIN},
         *         {@link OsAccountType#NORMAL}, and {@link OsAccountType#GUEST}.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @since 9
         */
        getOsAccountType(callback: AsyncCallback<OsAccountType>): void;
        getOsAccountType(): Promise<OsAccountType>;

        /**
         * Obtains the distributed virtual device ID (DVID).
         * <p>
         * If the same OHOS account has logged in to multiple devices, these devices constitute a super device
         * through the distributed networking. On the connected devices, you can call this method to obtain the DVIDs.
         * The same application running on different devices obtains the same DVID, whereas different applications
         * obtain different DVIDs.
         * <p>
         * @permission ohos.permission.DISTRIBUTED_DATASYNC or ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @returns Returns the DVID if obtained; returns an empty string if no OHOS account has logged in.
         * @since 7
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#queryDistributedVirtualDeviceId
         */
        getDistributedVirtualDeviceId(callback: AsyncCallback<string>): void;
        getDistributedVirtualDeviceId(): Promise<string>;

        /**
         * Queries the distributed virtual device ID (DVID).
         * <p>
         * If the same OHOS account has logged in to multiple devices, these devices constitute a super device
         * through the distributed networking. On the connected devices, you can call this method to obtain the DVIDs.
         * The same application running on different devices obtains the same DVID, whereas different applications
         * obtain different DVIDs.
         * <p>
         * @permission ohos.permission.DISTRIBUTED_DATASYNC or ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @returns Returns the DVID if obtained; returns an empty string if no OHOS account has logged in.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @since 9
         */
        queryDistributedVirtualDeviceId(callback: AsyncCallback<string>): void;
        queryDistributedVirtualDeviceId(): Promise<string>;

        /**
         * Obtains the profile photo of an OS account based on its local ID.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param localId Indicates the local ID of the OS account.
         * @returns Returns the profile photo if obtained;
         *         returns {@code null} if the profile photo fails to be obtained.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid localId.
         * @throws {BusinessError} 12300003 - the account indicated by localId dose not exist.
         * @systemapi Hide this for inner system use.
         * @since 7
         */
        getOsAccountProfilePhoto(localId: number, callback: AsyncCallback<string>): void;
        getOsAccountProfilePhoto(localId: number): Promise<string>;

        /**
         * Sets the profile photo for an OS account based on its local ID.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param localId Indicates the local ID of the OS account.
         * @param photo Indicates the profile photo to set for the OS account.
         * @returns void.         
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid localId or photo.
         * @throws {BusinessError} 12300003 - the account indicated by localId dose not exist.
         * @throws {BusinessError} 12300008 - the localId indicates restricted account.
         * @systemapi Hide this for inner system use.
         * @since 7
         */
        setOsAccountProfilePhoto(localId: number, photo: string, callback: AsyncCallback<void>): void;
        setOsAccountProfilePhoto(localId: number, photo: string): Promise<void>;

        /**
         * Obtain localId according to serial number
         * @param serialNumber Indicates serial number.
         * @returns localId.
         * @since 8
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getOsAccountLocalIdForSerialNumber
         */
        getOsAccountLocalIdBySerialNumber(serialNumber: number, callback: AsyncCallback<number>): void;
        getOsAccountLocalIdBySerialNumber(serialNumber: number): Promise<number>;

        /**
         * Gets the local ID of the OS account associated with the serial number.
         * @param { number } serialNumber - Indicates serial number.
         * @param { AsyncCallback<number> } callback - Indicates the callback for getting the local ID of the OS account associated with the serial number.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @throws { BusinessError } 12300002 - invalid serialNumber.
         * @throws { BusinessError } 12300003 - the account indicated by serialNumber dose not exist.
         * @since 9
         */
        getOsAccountLocalIdForSerialNumber(serialNumber: number, callback: AsyncCallback<number>): void;

        /**
         * Gets the local ID of the OS account associated with the serial number.
         * @param { number } serialNumber - Indicates serial number.
         * @returns { Promise<number> } Returns the local ID of the OS account associated with the serial number.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @throws { BusinessError } 12300002 - invalid serialNumber.
         * @throws { BusinessError } 12300003 - the account indicated by serialNumber dose not exist.
         * @since 9
         */
        getOsAccountLocalIdForSerialNumber(serialNumber: number): Promise<number>;

        /**
         * Obtain serial number according to localId.
         * @param localId Indicates the local ID of the OS account.
         * @returns serial number.
         * @since 8
         * @deprecated since 9
         * @useinstead osAccount.AccountManager#getSerialNumberForOsAccountLocalId
         */
        getSerialNumberByOsAccountLocalId(localId: number, callback: AsyncCallback<number>): void;
        getSerialNumberByOsAccountLocalId(localId: number): Promise<number>;

        /**
         * Gets the serial number for the specified os account local id.
         * @param { number } localId - Indicates the local ID of the OS account.
         * @param { AsyncCallback<number> } callback - Indicates the callback for getting the serial number for the specified os account local id.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @throws { BusinessError } 12300002 - invalid localId.
         * @throws { BusinessError } 12300003 - the account indicated by localId dose not exist.
         * @since 9
         */
        getSerialNumberForOsAccountLocalId(localId: number, callback: AsyncCallback<number>): void;

        /**
         * Gets the serial number for the specified os account local id.
         * @param { number } localId - Indicates the local ID of the OS account.
         * @returns { Promise<number> } Returns the serial number according to local ID.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @throws { BusinessError } 12300002 - invalid localId.
         * @throws { BusinessError } 12300003 - the account indicated by localId dose not exist.
         * @since 9
         */
        getSerialNumberForOsAccountLocalId(localId: number): Promise<number>;

        /**
         * Subscribes to the change events of accounts.
         * <p>
         * When user change the account, the subscriber will receive a notification
         * about the account change event.
         * @permission ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS_EXTENSION
         * @param type Event type.
         * @param name Indicates the name of subscriber.
         * @returns void.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid type or name.
         * @throws {BusinessError} 12300011 - the callback has been registered.
         * @systemapi Hide this for inner system use.
         * @since 7
         */
        on(type: 'activate' | 'activating', name: string, callback: Callback<number>): void;

        /**
         * Unsubscribes from account events.
         * @permission ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS_EXTENSION
         * @param type Event type.
         * @param name Indicates the name of subscriber.
         * @returns void.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid type or name.
         * @throws {BusinessError} 12300012 - the callback has not been registered.
         * @systemapi Hide this for inner system use.
         * @since 7
         */
        off(type: 'activate' | 'activating', name: string, callback?: Callback<number>): void;

        /**
         * Gets the bundle ID associated with the specified UID.
         * @param { number } uid - Indicates the target uid.
         * @param { AsyncCallback<number> } callback - Indicates the callback for getting the bundle ID associated with the specified UID.
         * @throws { BusinessError } 202 - not system application.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @throws { BusinessError } 12300002 - invalid uid.
         * @systemapi Hide this for inner system use.
         * @since 9
         */
        getBundleIdForUid(uid: number, callback: AsyncCallback<number>): void;

        /**
         * Gets the bundle ID associated with the specified UID.
         * @param { number } uid - Indicates the target uid.
         * @returns { Promise<number> } Returns the bundle ID associated with the specified UID.
         * @throws { BusinessError } 202 - not system application.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @throws { BusinessError } 12300002 - invalid uid.
         * @systemapi Hide this for inner system use.
         * @since 9
         */
        getBundleIdForUid(uid: number): Promise<number>;

        /**
         * Check whether current process belongs to the main account.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @returns Returns {@code true} if current process belongs to the main os account;
         *         returns {@code false} otherwise.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @systemapi Hide this for inner system use.
         * @since 9
         */
        isMainOsAccount(callback: AsyncCallback<boolean>): void;
        isMainOsAccount(): Promise<boolean>;

        /**
         * Gets a list of constraint source types for the specified os account.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @param { string } constraint - Indicates the constraint to query the source type.
         * @param { AsyncCallback<Array<ConstraintSourceTypeInfo>> } callback - Indicates the callback for getting a list of constraint source types for the specified os account.
         * @throws { BusinessError } 201 - permission denied.
         * @throws { BusinessError } 202 - not system application.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @throws { BusinessError } 12300002 - invalid name or constraint.
         * @throws { BusinessError } 12300003 - the account indicated by localId dose not exist.
         * @systemapi Hide this for inner system use.
         * @since 9
         */
        getOsAccountConstraintSourceTypes(localId: number, constraint: string, callback: AsyncCallback<Array<ConstraintSourceTypeInfo>>): void;

        /**
         * Gets a list of constraint source types for the specified os account.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @param { number } localId - Indicates the local ID of the OS account.
         * @param { string } constraint - Indicates the constraint to query the source type.
         * @returns { Promise<Array<ConstraintSourceTypeInfo>> } Returns a list of constraint source types for the specified os account.
         * @throws { BusinessError } 201 - permission denied.
         * @throws { BusinessError } 202 - not system application.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300001 - system service exception.
         * @throws { BusinessError } 12300002 - invalid name or constraint.
         * @throws { BusinessError } 12300003 - the account indicated by localId dose not exist.
         * @systemapi Hide this for inner system use.
         * @since 9
         */
        getOsAccountConstraintSourceTypes(localId: number, constraint: string): Promise<Array<ConstraintSourceTypeInfo>>;
    }

    /**
     * Provides information about OS accounts, including the local ID, local name, and type of an OS account.
     * @name OsAccountInfo
     * @syscap SystemCapability.Account.OsAccount
     * @since 7
     */
    interface OsAccountInfo {
        /**
         * The local ID of an OS account.
         * @since 7
         */
        localId: number;   

        /**
         * The local name of an OS account.
         * @since 7
         */
        localName: string;

        /**
         * Include: ADMIN, Normal, GUEST.
         * @since 7
         */
        type: OsAccountType;

        /**
         * Account constraints information.
         * @since 7
         */
        constraints: Array<string>;

        /**
         * The account is verified or not.
         * @since 8
         */
        isVerified: boolean;

        /**
         * OS account photo.
         * @since 8
         */
        photo: string;

        /**
         * Os account create time.
         * @since 8
         */
        createTime: number;

        /**
         * The last time to log in.
         * @since 8
         */
        lastLoginTime: number;

        /**
         * Os account serial number.
         * @since 8
         */
        serialNumber: number;

        /**
         * Os account is activated or not.
         * @since 8
         */
        isActived: boolean;

        /**
         * Os account create completed or not.
         * @since 8
         */
        isCreateCompleted: boolean;

        /**
         * Distributed account info.
         * @since 7
         */
        distributedInfo: distributedAccount.DistributedInfo;

         /**
          * Domain account info.
          * @since 8
          */
        domainInfo: DomainAccountInfo;
    }

    interface DomainAccountInfo {
        /**
        * The domain name
        * @since 8
        */
        domain: string;

        /**
        * The account name in the domain
        * @since 8
        */
        accountName: string;
    }

    /**
     * Enumerates OS account types.
     * @name OsAccountType
     * @syscap SystemCapability.Account.OsAccount
     * @since 7
     */
    enum OsAccountType {
        /**
         * Indicates the administrator account, which has the permission to manage other OS accounts.
         */
        ADMIN = 0,

        /**
         * Indicates a normal account, which has access to common functions of OS accounts.
         */
        NORMAL,

        /**
         * Indicates a guest account, which is used to temporarily access the device and may be deleted at any time.
         */
        GUEST
    }

    /**
     * Provides the abilities for user authentication.
     * @name UserAuth
     * @syscap SystemCapability.Account.OsAccount
     * @since 8
     */
    class UserAuth {
        /**
         * Constructor to get the UserAuth class instance.
         * @returns Returns the UserAuth class instance.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        constructor();

        /**
         * Gets version information.
         * @returns Returns the version information.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        getVersion(): number;

        /**
         * Checks whether the authentication capability is available.
         * @permission ohos.permission.ACCESS_USER_AUTH_INTERNAL
         * @param authType Indicates the credential type for authentication.
         * @param authTrustLevel Indicates the trust level of authentication result.
         * @returns Returns a status result.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid authType or authTrustLevel.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        getAvailableStatus(authType: AuthType, authTrustLevel: AuthTrustLevel): number;

        /**
         * Gets the property based on the specified request information.
         * @permission ohos.permission.ACCESS_USER_AUTH_INTERNAL
         * @param request Indicates the request information, including authentication type, and property type list.
         * @returns Returns an executor property.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid request.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        getProperty(request: GetPropertyRequest, callback: AsyncCallback<ExecutorProperty>): void;
        getProperty(request: GetPropertyRequest): Promise<ExecutorProperty>;

        /**
         * Sets property that can be used to initialize algorithms.
         * @permission ohos.permission.ACCESS_USER_AUTH_INTERNAL
         * @param request Indicates the request information, including authentication type and the key-value to be set.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid request.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        setProperty(request: SetPropertyRequest, callback: AsyncCallback<void>): void;
        setProperty(request: SetPropertyRequest): Promise<void>;

        /**
         * Executes authentication.
         * @permission ohos.permission.ACCESS_USER_AUTH_INTERNAL
         * @param challenge Indicates the challenge value.
         * @param authType Indicates the authentication type.
         * @param authTrustLevel Indicates the trust level of authentication result.
         * @param callback Indicates the callback to get result and acquireInfo.
         * @returns Returns a context ID for cancellation.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid challenge, authType or authTrustLevel.
         * @throws {BusinessError} 12300101 - credential is incorrect.
         * @throws {BusinessError} 12300105 - unsupported authTrustLevel.
         * @throws {BusinessError} 12300106 - unsupported authType.
         * @throws {BusinessError} 12300110 - authentication is locked.
         * @throws {BusinessError} 12300111 - authentication timeout.
         * @throws {BusinessError} 12300112 - authentication service is busy.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        auth(challenge: Uint8Array, authType: AuthType, authTrustLevel: AuthTrustLevel, callback: IUserAuthCallback): Uint8Array;

        /**
         * Executes user authentication.
         * @permission ohos.permission.ACCESS_USER_AUTH_INTERNAL
         * @param userId Indicates the user identification.
         * @param challenge Indicates the challenge value.
         * @param authType Indicates the authentication type.
         * @param authTrustLevel Indicates the trust level of authentication result.
         * @param callback Indicates the callback to get result and acquireInfo.
         * @returns Returns a context ID for cancellation.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid userId, challenge, authType or authTrustLevel.
         * @throws {BusinessError} 12300101 - credential is incorrect.
         * @throws {BusinessError} 12300105 - unsupported authTrustLevel.
         * @throws {BusinessError} 12300106 - unsupported authType.
         * @throws {BusinessError} 12300110 - authentication is locked.
         * @throws {BusinessError} 12300111 - authentication timeout.
         * @throws {BusinessError} 12300112 - authentication service is busy.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        authUser(userId: number, challenge: Uint8Array, authType: AuthType, authTrustLevel: AuthTrustLevel, callback: IUserAuthCallback): Uint8Array;

        /**
         * Cancels authentication with context ID.
         * @permission ohos.permission.ACCESS_USER_AUTH_INTERNAL
         * @param contextID Indicates the authentication context ID.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid contextId.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        cancelAuth(contextID: Uint8Array): void;
    }

    /**
     * Provides the abilities for Pin code authentication.
     * @name PINAuth
     * @syscap SystemCapability.Account.OsAccount
     * @since 8
     */
    class PINAuth {
        /**
         * Constructor to get the PINAuth class instance.
         * @returns Returns the PINAuth class instance.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        constructor();

        /**
         * Register inputer.
         * @permission ohos.permission.ACCESS_PIN_AUTH
         * @param inputer Indicates the password input box callback
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid inputer.
         * @throws {BusinessError} 12300103 - the credential inputer has been registered.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        registerInputer(inputer: IInputer): void;

        /**
         * Unregister inputer.
         * @permission ohos.permission.ACCESS_PIN_AUTH
         * @systemapi Hide this for inner system use.
         * @throws {BusinessError} 201 - permission denied.
         * @since 8
         */
        unregisterInputer(): void;
    }

    /**
     * Provides the management of credential inputers.
     * @name InputerManager
     * @syscap SystemCapability.Account.OsAccount
     * @since 9
     */
    class InputerManager {
        /**
         * Register credential inputer by authentication type.
         * @permission ohos.permission.ACCESS_USER_AUTH_INTERNAL or ohos.permission.MANAGE_USER_IDM
         * @static
         * @param authType Indicates the authentication type.
         * @param inputer Indicates the credential input box callback.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 202 - not system application.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid authType or inputer.
         * @throws {BusinessError} 12300103 - the credential inputer has been registered.
         * @throws {BusinessError} 12300106 - unsupported authType.
         * @systemapi Hide this for inner system use.
         * @since 9
         */
        static registerInputer(authType: AuthType, inputer: IInputer): void;

        /**
         * Unregister credential inputer by authentication type.
         * @permission ohos.permission.ACCESS_USER_AUTH_INTERNAL or ohos.permission.MANAGE_USER_IDM
         * @static
         * @param authType Indicates the authentication type.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 202 - not system application.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300002 - invalid authType.
         * @systemapi Hide this for inner system use.
         * @since 9
         */
        static unregisterInputer(authType: AuthType): void;
    }

    /**
     * Provides the definition of domain plugin.
     * @interface DomainPlugin
     * @syscap SystemCapability.Account.OsAccount
     * @since 9
     */
    interface DomainPlugin {
        /**
         * Authenticates the specified domain account.
         * @param { DomainAccountInfo } domainAccountInfo - Indicates the domain account information for authentication.
         * @param { Uint8Array } credential - Indicates the credential for authentication.
         * @param { IUserAuthCallback } callback - Indicates the authentication callback.
         * @systemapi Hide this for inner system use.
         * @since 9
         */
        auth(domainAccountInfo: DomainAccountInfo, credential: Uint8Array, callback: IUserAuthCallback): void;
    }

    /**
     * Provides abilities for the management of domain account.
     * @syscap SystemCapability.Account.OsAccount
     * @since 9
     */
    class DomainAccountManager {
        /**
         * Registers the domain plugin, which provides the capabilities for domain authentication.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @static
         * @param { DomainPlugin } plugin - Indicates the domain plugin.
         * @throws { BusinessError } 201 - permission denied.
         * @throws { BusinessError } 202 - not system application.
         * @throws { BusinessError } 401 - the parameter check failed.
         * @throws { BusinessError } 12300201 - the domain plugin has been registered.
         * @systemapi Hide this for inner system use.
         * @since 9
         */
        static registerPlugin(plugin: DomainPlugin): void;

        /**
         * Unregisters domain plugin.
         * @permission ohos.permission.MANAGE_LOCAL_ACCOUNTS
         * @static
         * @throws { BusinessError } 201 - permission denied.
         * @throws { BusinessError } 202 - not system application.
         * @systemapi Hide this for inner system use.
         * @since 9
         */
        static unregisterPlugin(): void;
    }

    /**
     * Provides the abilities for managing user identity.
     * @name UserIdentityManager
     * @syscap SystemCapability.Account.OsAccount
     * @since 8
     */
    class UserIdentityManager {
        /**
         * Constructor to get the UserIdentityManager class instance.
         * @returns Returns the UserIdentityManager class instance.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        constructor();

        /**
         * Opens session.
         * <p>
         * Start an IDM operation to obtain challenge value.
         * A challenge value of 0 indicates that opensession failed.
         * @permission ohos.permission.MANAGE_USER_IDM
         * @returns Returns a challenge value.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        openSession(callback: AsyncCallback<Uint8Array>): void;
        openSession(): Promise<Uint8Array>;

        /**
         * Adds credential.
         * <p>
         * Add user credential information, pass in credential addition method and credential information
         * (credential type, subclass, if adding user's non password credentials, pass in password authentication token),
         * and get the result / acquireInfo callback.
         * @permission ohos.permission.MANAGE_USER_IDM
         * @param credentialInfo Indicates the credential information.
         * @param callback Indicates the callback to get results and acquireInfo.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid credentialInfo.
         * @throws {BusinessError} 12300101 - token is invalid.
         * @throws {BusinessError} 12300106 - unsupported authType.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        addCredential(credentialInfo: CredentialInfo, callback: IIdmCallback): void;

        /**
         * Updates credential.
         * @permission ohos.permission.MANAGE_USER_IDM
         * @param credentialInfo Indicates the credential information.
         * @param callback Indicates the callback to get results and acquireInfo.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid credentialInfo.
         * @throws {BusinessError} 12300101 - token is invalid.
         * @throws {BusinessError} 12300106 - unsupported authType.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        updateCredential(credentialInfo: CredentialInfo, callback: IIdmCallback): void;

        /**
         * Closes session.
         * <p>
         * End an IDM operation.  
         * @permission ohos.permission.MANAGE_USER_IDM
         * @throws {BusinessError} 201 - permission denied.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        closeSession(): void;

        /**
         * Cancels entry with a challenge value.
         * @permission ohos.permission.MANAGE_USER_IDM
         * @param challenge Indicates the challenge value.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid challenge.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        cancel(challenge: Uint8Array): void;

        /**
         * Deletes the user with the authentication token.
         * @permission ohos.permission.MANAGE_USER_IDM
         * @param token Indicates the authentication token.
         * @param callback Indicates the callback to get the deletion result.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300101 - token is invalid.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        delUser(token: Uint8Array, callback: IIdmCallback): void;

        /**
         * Deletes the user credential information.
         * @permission ohos.permission.MANAGE_USER_IDM
         * @param credentialId Indicates the credential index.
         * @param token Indicates the authentication token.
         * @param callback Indicates the callback to get the deletion result.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid credentialId.
         * @throws {BusinessError} 12300101 - token is invalid.
         * @throws {BusinessError} 12300102 - credential not found.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        delCred(credentialId: Uint8Array, token: Uint8Array, callback: IIdmCallback): void;

        /**
         * Gets authentication information.
         * @permission ohos.permission.USE_USER_IDM
         * @param authType Indicates the authentication type.
         * @param callback Indicates the callback to get all registered credential information of
         * the specified type for the current user.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid authType.
         * @throws {BusinessError} 12300102 - credential not found.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        getAuthInfo(callback: AsyncCallback<Array<EnrolledCredInfo>>): void;
        getAuthInfo(authType: AuthType, callback: AsyncCallback<Array<EnrolledCredInfo>>): void;
        getAuthInfo(authType?: AuthType): Promise<Array<EnrolledCredInfo>>;
    }

    /**
     * Password data callback.
     *
     * @name IInputData
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    interface IInputData {
        /**
         * Notifies to set data.
         * @param authSubType Indicates the credential subtype for authentication.
         * @param data Indicates the data to set.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300002 - invalid pinSubType.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        onSetData: (authSubType: AuthSubType, data: Uint8Array) => void;
    }
    
    /**
     * Password input box callback.
     * @name IInputer
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    interface IInputer {
        /**
         * Notifies to get data.
         * @param authSubType Indicates the credential subtype for authentication.
         * @param callback Indicates the password data callback.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        onGetData: (authSubType: AuthSubType, callback: IInputData) => void;
    }

    /**
     * User authentication callback.
     * @name IUserAuthCallback
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    interface IUserAuthCallback {
        /**
         * The authentication result code is returned through the callback.
         * @param result Indicates the authentication result code.
         * @param extraInfo Indicates the specific information for different situation.
         * If the authentication is passed, the authentication token is returned in extraInfo,
         * If the authentication fails, the remaining authentication times are returned in extraInfo,
         * If the authentication executor is locked, the freezing time is returned in extraInfo.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        onResult: (result: number, extraInfo: AuthResult) => void;

        /**
         * During an authentication, the TipsCode is returned through the callback.
         * @param module Indicates the executor type for authentication.
         * @param acquire Indicates the tip code for different authentication executor.
         * @param extraInfo reserved parameter.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        onAcquireInfo?: (module: number, acquire: number, extraInfo: any) => void;
    }

    /**
     * Identity manager callback.
     * @name IIdmCallback
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    interface IIdmCallback {
        /**
         * The authentication result code is returned through the callback.
         * @param result Indicates the authentication result code.
         * @param extraInfo pass the specific information for different situation.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        onResult: (result: number, extraInfo: RequestResult) => void;

        /**
         * During an authentication, the TipsCode is returned through the callback.
         * @param module Indicates the executor type for authentication.
         * @param acquire Indicates the tip code for different authentication executor.
         * @param extraInfo reserved parameter.
         * @systemapi Hide this for inner system use.
         * @since 8
         */
        onAcquireInfo?: (module: number, acquire: number, extraInfo: any) => void;
    }

    /**
     * Provides the information of the get property request.
     *
     * @name GetPropertyRequest
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    interface GetPropertyRequest {
        /**
         * Indicates the authentication credential type.
         */
        authType: AuthType;

        /**
         * Indicates the array of property types to get.
         */
        keys: Array<GetPropertyType>;
    }

    /**
     * Provides the information of the set property request.
     * @name SetPropertyRequest
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    interface SetPropertyRequest {
        /**
         * Indicates the authentication credential type.
         */
        authType: AuthType;

        /**
         * Indicates the property type to set.
         */
        key: SetPropertyType;

        /**
         * Indicates the information to set.
         */
        setInfo: Uint8Array;
    }

    /**
     * Provides the property of executor.
     * @name ExecutorProperty
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    interface ExecutorProperty {
        /**
         * Indicates the result.
         */
        result: number;

        /**
         * Indicates the authentication credential subtype.
         */
        authSubType: AuthSubType;

        /**
         * Indicates the remaining times.
         */
        remainTimes?: number;

        /**
         * Indicates the freezing times.
         */
        freezingTime?: number;
    }
 
    /**
     * Indicates the information of authentication result.
     * @name AuthResult
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    interface AuthResult {
        /**
         * Indicates the authentication token.
         */
        token?: Uint8Array;

        /**
         * Indicates the remaining times.
         */
        remainTimes?: number;

        /**
         * Indicates the freezing times.
         */
        freezingTime?: number;
    }

    /**
     * Indicates the information of credential.
     * @name CredentialInfo
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    interface CredentialInfo {
        /**
         * Indicates the credential type.
         */
        credType: AuthType;

        /**
         * Indicates the credential subtype.
         */
        credSubType: AuthSubType;

        /**
         * Indicates the authentication token.
         */
        token: Uint8Array;
    }

    /**
     * Indicates the information of request result.
     * @name RequestResult
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    interface RequestResult {
        /**
         * Indicates the credential index.
         */
        credentialId?: Uint8Array;
    }

    /**
     * Indicates the information of enrolled credential.
     * @name EnrolledCredInfo
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    interface EnrolledCredInfo {
        /**
         * Indicates the credential index.
         */
        credentialId: Uint8Array;

        /**
         * Indicates the authentication credential type.
         */
        authType: AuthType;

        /**
         * Indicates the authentication credential subtype.
         */
        authSubType: AuthSubType;

        /**
         * Indicates the credential template ID.
         */
        templateId: Uint8Array;
    }

    /**
     * Indicates the property type to get.
     * @name GetPropertyType
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    enum GetPropertyType {
        /**
         * Indicates the authentication subtype.
         */
        AUTH_SUB_TYPE = 1,

        /**
         * Indicates the remain times.
         */
        REMAIN_TIMES = 2,

        /**
         * Indicates the freezing time.
         */
        FREEZING_TIME = 3
    }

    /**
     * Indicates the property type to set.
     *
     * @name SetPropertyType
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    enum SetPropertyType {
        /**
         * Indicates the init algorithm.
         */
        INIT_ALGORITHM = 1,
    }

    /**
     * Indicates the credential type for authentication.
     * @name AuthType
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    enum AuthType {
        /**
         * Indicates the PIN authentication type.
         */
        PIN = 1,

        /**
         * Indicates the FACE authentication type.
         */
        FACE = 2,

        /**
         * Indicates the DOMAIN authentication type.
         * @since 9
         */
        DOMAIN = 1024
    }

    /**
     * Indicates the credential subtype for authentication.
     * @name AuthSubType
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    enum AuthSubType {
        /**
         * Indicates the 6-digit credential.
         */
        PIN_SIX = 10000,

        /**
         * Indicates the self-defined digital credential.
         */
        PIN_NUMBER = 10001,

        /**
         * Indicates the self-defined mixed credential.
         */
        PIN_MIXED = 10002,
    
        /**
         * Indicates the 2D face credential.
         */
        FACE_2D = 20000,

        /**
         * Indicates the 3D face credential.
         */
        FACE_3D = 20001,

        /**
         * Indicates the mixed domain credential.
         * @since 9
         */
        DOMAIN_MIXED = 10240001
    }

    /**
     * Indicates the trusted level of authentication results.
     * @name AuthTrustLevel
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    enum AuthTrustLevel {
        /**
         * Indicates the trusted level 1.
         */
        ATL1 = 10000,

        /**
         * Indicates the trusted level 2.
         */
        ATL2 = 20000,

        /**
         * Indicates the trusted level 3.
         */
        ATL3 = 30000,

        /**
         * Indicates the trusted level 4.
         */
        ATL4 = 40000
    }

    /**
     * Indicates the module of acquired information.
     * @name Module
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    enum Module {
        /**
         * Indicates the information acquired from FaceAuth.
         */
        FACE_AUTH = 1
    }

    /**
     * Indicates the enumeration of authentication result code.
     * @name ResultCode
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    enum ResultCode {
        /**
         * Indicates that authentication is success or ability is supported.
         */
        SUCCESS = 0,

        /**
         * Indicates the authenticator fails to identify user.
         */
        FAIL = 1,

        /**
         * Indicates other errors.
         */
        GENERAL_ERROR = 2,

        /**
         * Indicates that authentication has been canceled.
         */
        CANCELED = 3,

        /**
         * Indicates that authentication has timed out.
         */
        TIMEOUT = 4,

        /**
         * Indicates that this authentication type is not supported.
         */
        TYPE_NOT_SUPPORT = 5,

        /**
         * Indicates that the authentication trust level is not supported.
         */
        TRUST_LEVEL_NOT_SUPPORT = 6,

        /**
         * Indicates that the authentication task is busy. Wait for a few seconds and try again.
         */
        BUSY = 7,

        /**
         * Indicates incorrect parameters.
         */
        INVALID_PARAMETERS = 8,

        /**
         * Indicates that the authenticator is locked.
         */
        LOCKED = 9,

        /**
         * Indicates that the user has not enrolled the authenticator.
         */
        NOT_ENROLLED = 10
    }

    /**
     * Indicates the enumeration of prompt codes in the process of face authentication.
     * @name FaceTipsCode
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    enum FaceTipsCode {
        /**
         * Indicates that the obtained facial image is too bright due to high illumination.
         */
        FACE_AUTH_TIP_TOO_BRIGHT = 1,

        /**
         * Indicates that the obtained facial image is too dark due to low illumination.
         */
        FACE_AUTH_TIP_TOO_DARK = 2,

        /**
         * Indicates that the face is too close to the device.
         */
        FACE_AUTH_TIP_TOO_CLOSE = 3,

        /**
         * Indicates that the face is too far away from the device.
         */
        FACE_AUTH_TIP_TOO_FAR = 4,

        /**
         * Indicates that the device is too high, and that only the upper part of the face is captured.
         */
        FACE_AUTH_TIP_TOO_HIGH = 5,

        /**
         * Indicates that the device is too low, and that only the lower part of the face is captured.
         */
        FACE_AUTH_TIP_TOO_LOW = 6,

        /**
         * Indicates that the device is deviated to the right, and that only the right part of the face is captured.
         */
        FACE_AUTH_TIP_TOO_RIGHT = 7,

        /**
         * Indicates that the device is deviated to the left, and that only the left part of the face is captured.
         */
        FACE_AUTH_TIP_TOO_LEFT = 8,

        /**
         * Indicates that the face moves too fast during facial information collection.
         */
        FACE_AUTH_TIP_TOO_MUCH_MOTION = 9,

        /**
         * Indicates that the face is not facing the device.
         */
        FACE_AUTH_TIP_POOR_GAZE = 10,

        /**
         * Indicates that no face is detected.
         */
        FACE_AUTH_TIP_NOT_DETECTED = 11,
    }

    /**
     * Indicates the enumeration of prompt codes in the process of fingerprint authentication.
     * @name FingerprintTips
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 8
     */
    enum FingerprintTips {
        /**
         * Indicates that the image acquired is good.
         */
        FINGERPRINT_TIP_GOOD = 0,

        /**
         * Indicates that the fingerprint image is too noisy due to suspected or detected dirt on the sensor.
         */
        FINGERPRINT_TIP_IMAGER_DIRTY = 1,

        /**
         * Indicates that the fingerprint image is too noisy to process due to a detected condition.
         */
        FINGERPRINT_TIP_INSUFFICIENT = 2,

        /**
         * Indicates that only a partial fingerprint image is detected.
         */
        FINGERPRINT_TIP_PARTIAL = 3,

        /**
         * Indicates that the fingerprint image is incomplete due to quick motion.
         */
        FINGERPRINT_TIP_TOO_FAST = 4,

        /**
         * Indicates that the fingerprint image is unreadable due to lack of motion.
         */
        FINGERPRINT_TIP_TOO_SLOW = 5
    }

    /**
     * Enumerates for constraint source types.
     * @name ConstraintSourceType
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    enum ConstraintSourceType {
        /**
         * No constraints are set
         * @since 9
         */
        CONSTRAINT_NOT_EXIST = 0,

        /**
         * Constraint is set by setOsAccountConstraints
         * @since 9
         */
        CONSTRAINT_TYPE_BASE = 1,

        /**
         * Constraint is set by device owner
         * @since 9
         */
        CONSTRAINT_TYPE_DEVICE_OWNER = 2,

        /**
         * Constraint is set by profile owner
         * @since 9
         */
        CONSTRAINT_TYPE_PROFILE_OWNER = 3
    }

    /**
     * Provides information about the constraint source type info of an os account.
     * @name ConstraintSourceTypeInfo
     * @syscap SystemCapability.Account.OsAccount
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    interface ConstraintSourceTypeInfo {
        /**
         * Indicates the id of an os account who set the constraint.
         * When type is CONSTRAINT_NOT_EXIST or CONSTRAINT_TYPE_BASE, localId will be -1.
         * @since 9
         */
        localId: number;

        /**
         * Indicates the source type of the constraint.
         * @since 9
         */
        type: ConstraintSourceType;
    }
}

export default osAccount;