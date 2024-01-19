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

import { AsyncCallback, Callback } from './basic';
import Want from './@ohos.app.ability.Want';
import rpc from './@ohos.rpc'

/**
 * This module provides the capability to manage application accounts.
 * @syscap SystemCapability.Account.AppAccount
 * @since 7
 */
declare namespace appAccount {
    /**
     * Obtains the AppAccountManager instance.
     * @returns Returns the instance of the AppAccountManager.
     * @syscap SystemCapability.Account.AppAccount
     * @since 7
     */
    function createAppAccountManager(): AppAccountManager;

    /**
     * Provides methods for managing application accounts.
     * @name AppAccountManager
     * @syscap SystemCapability.Account.AppAccount
     * @since 7
     */
    interface AppAccountManager {
        /**
         * Adds the account name and extra information of this application to the account management service.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         * @param name Indicates the name of the application account to add.
         * @param extraInfo Indicates the extra information of the application account to add.
         *        The extra information cannot be sensitive information of the application account.
         * @returns void.
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#createAccount
         */
        addAccount(name: string, callback: AsyncCallback<void>): void;
        addAccount(name: string, extraInfo: string, callback: AsyncCallback<void>): void;
        addAccount(name: string, extraInfo?: string): Promise<void>;

        /**
         * Creates the account name and extra information of this application to the account management service.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         * @param name Indicates the name of the application account to add.
         * @param options Indicates the extra information of the application account to add.
         *        The extra information cannot be sensitive information of the application account.
         * @returns void.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name or options.
         * @throws {BusinessError} 12300004 - the account indicated by name already exist.
         * @throws {BusinessError} 12300007 - the account number has reached the upper limit.
         * @since 9
         */
        createAccount(name: string, callback: AsyncCallback<void>): void;
        createAccount(name: string, options: CreateAccountOptions, callback: AsyncCallback<void>): void;
        createAccount(name: string, options?: CreateAccountOptions): Promise<void>;

        /**
         * Adds an application account of a specified owner implicitly.
         * @param owner Indicates the account owner of your application or third-party applications.
         * @param authType Indicates the authentication type.
         * @param options Indicates the authenticator-specific options for the request.
         * @param callback Indicates the authenticator callback.
         * @returns void.
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#createAccountImplicitly
         */
        addAccountImplicitly(owner: string, authType: string, options: {[key: string]: any}, callback: AuthenticatorCallback): void;

        /**
         * Creates an application account of a specified owner implicitly.
         * @param owner Indicates the account owner of your application or third-party applications.
         * @param options Indicates the authenticator-specific options for the request.
         * @param callback Indicates the authenticator callback.
         * @returns void.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid owner or options.
         * @throws {BusinessError} 12300007 - the account number has reached the upper limit.
         * @throws {BusinessError} 12300010 - account service busy.
         * @throws {BusinessError} 12300113 - the account authenticator service does not exist.
         * @throws {BusinessError} 12300114 - authenticator service exception.
         * @since 9
         */
        createAccountImplicitly(owner: string, callback: AuthCallback): void;
        createAccountImplicitly(owner: string, options: CreateAccountImplicitlyOptions, callback: AuthCallback): void;

        /**
         * Deletes an application account from the account management service.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         * @param name Indicates the name of the application account to delete.
         * @returns void.
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#removeAccount
         */
        deleteAccount(name: string, callback: AsyncCallback<void>): void;
        deleteAccount(name: string): Promise<void>;

        /**
         * Removes an application account from the account management service.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         * @param name Indicates the name of the application account to delete.
         * @returns void.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name.
         * @throws {BusinessError} 12300003 - the account indicated by name dose not exist.
         * @since 9
         */
        removeAccount(name: string, callback: AsyncCallback<void>): void;
        removeAccount(name: string): Promise<void>;

        /**
         * Disables a third-party application with the specified bundle name from
         * accessing the given application account.
         * @param name Indicates the name of the application account to disable access from
         *        the third-party application.
         * @param bundleName Indicates the bundle name of the third-party application.
         * @returns void.
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setAppAccess
         */
        disableAppAccess(name: string, bundleName: string, callback: AsyncCallback<void>): void;
        disableAppAccess(name: string, bundleName: string): Promise<void>;

        /**
         * Enables a third-party application with the specified bundle name to access the given application
         * account for data query and listening.
         * @param name Indicates the name of the application account.
         * @param bundleName Indicates the bundle name of the third-party application.
         * @returns void.
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setAppAccess
         */
        enableAppAccess(name: string, bundleName: string, callback: AsyncCallback<void>): void;
        enableAppAccess(name: string, bundleName: string): Promise<void>;

        /**
         * Sets a third-party application with the specified bundle name to access the given application
         * account for data query and listening.
         * @param name Indicates the name of the application account.
         * @param bundleName Indicates the bundle name of the third-party application.
         * @param isAccessible Indicates the accessibility flag, true for accessible, false for inaccessible.
         * @returns void.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name or bundle name.
         * @throws {BusinessError} 12300003 - the account indicated by localId dose not exist.
         * @throws {BusinessError} 12400001 - the application indicated by bundlename does not exist.
         * @since 9
         */
        setAppAccess(name: string, bundleName: string, isAccessible: boolean, callback: AsyncCallback<void>): void;
        setAppAccess(name: string, bundleName: string, isAccessible: boolean): Promise<void>;

        /**
         * Checks whether a third-party application with the specified bundle name is allowed to access
         * the given application account for data query and listening.
         * @param name Indicates the name of the application account.
         * @param bundleName Indicates the bundle name of the third-party application.
         * @returns void.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name or bundle name.
         * @throws {BusinessError} 12300003 - the account indicated by localId dose not exist.
         * @since 9
         */
        checkAppAccess(name: string, bundleName: string, callback: AsyncCallback<boolean>): void;
        checkAppAccess(name: string, bundleName: string): Promise<boolean>;

        /**
         * Checks whether a specified application account allows application data synchronization.
         * <p>
         * If the same OHOS account has logged in to multiple devices, these devices constitute a super device
         * through the distributed networking. On the connected devices, you can call this method to check
         * whether application data can be synchronized.
         * <p>
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param name Indicates the name of the application account.
         * @returns Returns {@code true} if application data synchronization is allowed; returns {@code false} otherwise.
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#checkDataSyncEnabled
         */
        checkAppAccountSyncEnable(name: string, callback: AsyncCallback<boolean>): void;
        checkAppAccountSyncEnable(name: string): Promise<boolean>;

        /**
         * Checks whether application data synchronization is enabled for the specified account.
         * <p>
         * If the same OHOS account has logged in to multiple devices, these devices constitute a super device
         * through the distributed networking. On the connected devices, you can call this method to check
         * whether application data can be synchronized.
         * <p>
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param name Indicates the name of the application account.
         * @returns Returns {@code true} if application data synchronization is allowed; returns {@code false} otherwise.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name.
         * @throws {BusinessError} 12300003 - the account indicated by localId dose not exist.
         * @since 9
         */
        checkDataSyncEnabled(name: string, callback: AsyncCallback<boolean>): void;
        checkDataSyncEnabled(name: string): Promise<boolean>;

        /**
         * Sets the credential for this application account.
         * @param name Indicates the name of the application account.
         * @param credentialType Indicates the type of the credential to set.
         * @param credential Indicates the credential to set.
         * @returns void.
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setCredential
         */
        setAccountCredential(name: string, credentialType: string, credential: string,
                             callback: AsyncCallback<void>): void;
        setAccountCredential(name: string, credentialType: string, credential: string): Promise<void>;

        /**
         * Sets the credential for this application account.
         * @param name Indicates the name of the application account.
         * @param credentialType Indicates the type of the credential to set.
         * @param credential Indicates the credential to set.
         * @returns void.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name, credentialType or credential.
         * @throws {BusinessError} 12300003 - the account indicated by localId dose not exist.
         * @since 9
         */
        setCredential(name: string, credentialType: string, credential: string,
                             callback: AsyncCallback<void>): void;
        setCredential(name: string, credentialType: string, credential: string): Promise<void>;

        /**
         * Sets extra information for this application account.
         * <p>
         * You can call this method when you forget the extra information of your application account or
         * need to modify the extra information.
         * @param name Indicates the name of the application account.
         * @param extraInfo Indicates the extra information to set.
         * @returns void.
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setCustomData
         */
        setAccountExtraInfo(name: string, extraInfo: string, callback: AsyncCallback<void>): void;
        setAccountExtraInfo(name: string, extraInfo: string): Promise<void>;
        
        /**
         * Sets whether a specified application account allows application data synchronization.
         * <p>
         * If the same OHOS account has logged in to multiple devices, these devices constitute a super device
         * through the distributed networking. On the connected devices, you can call this method to set whether to
         * allow cross-device data synchronization. If synchronization is allowed, application data can be synchronized
         * among these devices in the event of any changes related to the application account.
         * If synchronization is not allowed, the application data is stored only on the local device.
         * <p>
         * <b>Application account-related changes</b>: adding or deleting an application account, setting extra
         * information (such as updating a token), and setting data associated with this application account
         * <p>
         * <b>Application data that can be synchronized</b>: application account name, token,
         * and data associated with this application account
         * <p>
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param name Indicates the name of the application account.
         * @param isEnable Specifies whether to allow application data synchronization.
         * @returns void.
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setDataSyncEnabled
         */
        setAppAccountSyncEnable(name: string, isEnable: boolean, callback: AsyncCallback<void>): void;
        setAppAccountSyncEnable(name: string, isEnable: boolean): Promise<void>;

        /**
         * Sets whether a specified application account enables application data synchronization.
         * <p>
         * If the same OHOS account has logged in to multiple devices, these devices constitute a super device
         * through the distributed networking. On the connected devices, you can call this method to set whether to
         * enable cross-device data synchronization. If synchronization is enabled, application data can be synchronized
         * among these devices in the event of any changes related to the application account.
         * If synchronization is not enabled, the application data is stored only on the local device.
         * <p>
         * <b>Application account-related changes</b>: adding or deleting an application account, setting extra
         * information (such as updating a token), and setting data associated with this application account
         * <p>  
         * <b>Application data that can be synchronized</b>: application account name, token,
         * and data associated with this application account
         * <p>
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param name Indicates the name of the application account.
         * @param isEnabled Specifies whether to enable application data synchronization.
         * @returns void.
         * @throws {BusinessError} 201 - permission denied.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name.
         * @throws {BusinessError} 12300003 - the account indicated by name dose not exist.
         * @since 9
         */
        setDataSyncEnabled(name: string, isEnabled: boolean, callback: AsyncCallback<void>): void;
        setDataSyncEnabled(name: string, isEnabled: boolean): Promise<void>;

        /**
         * Sets data associated with this application account.
         * @param name Indicates the name of the application account.
         * @param key Indicates the key of the data to set. The key can be customized.
         * @param value Indicates the value of the data to set.
         * @returns void.
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setCustomData
         */
        setAssociatedData(name: string, key: string, value: string, callback: AsyncCallback<void>): void;
        setAssociatedData(name: string, key: string, value: string): Promise<void>;

        /**
         * Sets data associated with this application account.
         * @param name Indicates the name of the application account.
         * @param key Indicates the key of the data to set. The key can be customized.
         * @param value Indicates the value of the data to set.
         * @returns void.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name, key or value.
         * @throws {BusinessError} 12300003 - the account indicated by name dose not exist.
         * @throws {BusinessError} 12400003 - the number of customized data has reached the upper limit.
         * @since 9
         */
        setCustomData(name: string, key: string, value: string, callback: AsyncCallback<void>): void;
        setCustomData(name: string, key: string, value: string): Promise<void>;

        /**
         * Obtains information about all accessible accounts.
         * <p>
         * This method applies to the following accounts:
         * <ul>
         * <li>Accounts of this application.</li>
         * <li>Accounts of third-party applications. To obtain such information,
         * your application must have gained authorization from the third-party applications.</li>
         * </ul>
         * @permission ohos.permission.GET_ALL_APP_ACCOUNTS
         * @returns Returns a list of application accounts.
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getAllAccounts
         */
        getAllAccessibleAccounts(callback: AsyncCallback<Array<AppAccountInfo>>): void;
        getAllAccessibleAccounts(): Promise<Array<AppAccountInfo>>;

        /**
         * Obtains information about all accessible accounts.
         * <p>
         * This method applies to the following accounts:
         * <ul>
         * <li>Accounts of this application.</li>
         * <li>Accounts of third-party applications. To obtain such information,
         * your application must have gained authorization from the third-party applications.</li>
         * </ul>
         * @returns Returns a list of application accounts.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @since 9
         */
        getAllAccounts(callback: AsyncCallback<Array<AppAccountInfo>>): void;
        getAllAccounts(): Promise<Array<AppAccountInfo>>;

        /**
         * Obtains information about all accounts of a specified account owner.
         * <p>
         * This method applies to the following accounts:
         * <ul>
         * <li>Accounts of this application.</li>
         * <li>Accounts of third-party applications. To obtain such information,
         * your application must have gained authorization from the third-party applications.</li>
         * </ul>
         * @permission ohos.permission.GET_ALL_APP_ACCOUNTS
         * @param owner Indicates the account owner of your application or third-party applications.
         * @returns Returns a list of application accounts.
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getAccountsByOwner
         */
        getAllAccounts(owner: string, callback: AsyncCallback<Array<AppAccountInfo>>): void;
        getAllAccounts(owner: string): Promise<Array<AppAccountInfo>>;

        /**
         * Gets information about all accounts of a specified account owner.
         * <p>
         * This method applies to the following accounts:
         * <ul>
         * <li>Accounts of this application.</li>
         * <li>Accounts of third-party applications. To obtain such information,
         * your application must have gained authorization from the third-party applications.</li>
         * </ul>
         * @param owner Indicates the account owner of your application or third-party applications.
         * @returns Returns a list of application accounts.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid owner.
         * @throws {BusinessError} 12400001 - the application indicated by bundle name does not exist.
         * @since 9
         */
        getAccountsByOwner(owner: string, callback: AsyncCallback<Array<AppAccountInfo>>): void;
        getAccountsByOwner(owner: string): Promise<Array<AppAccountInfo>>;

        /**
         * Obtains the credential of this application account.
         * @param name Indicates the name of the application account.
         * @param credentialType Indicates the type of the credential to obtain.
         * @returns Returns the credential of the application account.
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getCredential
         */
        getAccountCredential(name: string, credentialType: string, callback: AsyncCallback<string>): void;
        getAccountCredential(name: string, credentialType: string): Promise<string>;

        /**
         * Obtains the credential of this application account.
         * @param name Indicates the name of the application account.
         * @param credentialType Indicates the type of the credential to obtain.
         * @returns Returns the credential of the application account.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name or credentialType.
         * @throws {BusinessError} 12300003 - the account indicated by name dose not exist.
         * @throws {BusinessError} 12300102 - credential does not exist.
         * @since 9
         */
        getCredential(name: string, credentialType: string, callback: AsyncCallback<string>): void;
        getCredential(name: string, credentialType: string): Promise<string>;
 
        /**
         * Obtains extra information of this application account.
         * @param name Indicates the name of the application account.
         * @returns Returns the extra information of the account; returns {@code null} in other scenarios,
         *         for example, if the account does not exist.
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getCustomData
         */
        getAccountExtraInfo(name: string, callback: AsyncCallback<string>): void;
        getAccountExtraInfo(name: string): Promise<string>;

        /**
         * Obtains data associated with this application account.
         * @param name Indicates the name of the application account.
         * @param key Indicates the key of the data to obtain.
         * @returns Returns the associated data of the application account.
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getCustomData
         */
        getAssociatedData(name: string, key: string, callback: AsyncCallback<string>): void;
        getAssociatedData(name: string, key: string): Promise<string>;

        /**
         * Obtains data associated with this application account.
         * @param name Indicates the name of the application account.
         * @param key Indicates the key of the data to obtain.
         * @returns Returns the associated data of the application account.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name or key.
         * @throws {BusinessError} 12300003 - the account indicated by name dose not exist.
         * @throws {BusinessError} 12400002 - the customData does not exist.
         * @since 9
         */
        getCustomData(name: string, key: string, callback: AsyncCallback<string>): void;
        getCustomData(name: string, key: string): Promise<string>;

        /**
         * Obtains data associated with the specified account synchronously.
         * @param name Indicates the name of the application account.
         * @param key Indicates the key of the data to obtain.
         * @returns Returns the associated data of the application account.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name or key.
         * @throws {BusinessError} 12300003 - the account indicated by name dose not exist.
         * @throws {BusinessError} 12400002 - the customData does not exist.
         * @since 9
         */
        getCustomDataSync(name: string, key: string): string;

        /**
         * Subscribes to the change events of accounts of the specified owners.
         * <p>
         * When the account owner updates the account, the subscriber will receive a notification
         * about the account change event.
         * @param owners Indicates the account owners, which are specified
         *        by {@link AppAccount#AppAccount(String name, String owner)}.
         * @returns void
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#on
         */
        on(type: 'change', owners: Array<string>, callback: Callback<Array<AppAccountInfo>>): void;

        /**
         * Subscribes to the change events of accounts of the specified owners.
         * <p>
         * When the account owner updates the account, the subscriber will receive a notification
         * about the account change event.
         * @param owners Indicates the account owners, which are specified
         *        by {@link AppAccount#AppAccount(String name, String owner)}.
         * @returns void
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid type or owners.
         * @throws {BusinessError} 12300011 - the callback has been registered.
         * @throws {BusinessError} 12400001 - the application indicated by owner does not exist.
         * @since 9
         */
        on(type: 'accountChange', owners: Array<string>, callback: Callback<Array<AppAccountInfo>>): void;

        /**
         * Unsubscribes from account events.
         * @returns void
         * @since 7
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#off
         */
        off(type: 'change', callback?: Callback<Array<AppAccountInfo>>): void;

        /**
         * Unsubscribes from account events.
         * @returns void
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid type.
         * @throws {BusinessError} 12300012 - the callback has not been registered.
         * @since 9
         */
        off(type: 'accountChange', callback?: Callback<Array<AppAccountInfo>>): void;

        /**
         * Authenticates an application account to get an oauth token.
         * @param name Indicates the account name of your application or third-party applications.
         * @param owner Indicates the account owner of your application or third-party applications.
         * @param authType Indicates the authentication type.
         * @param options Indicates the authenticator-specific options for the request.
         * @param callback Indicates the authenticator callback.
         * @returns void.
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#auth
         */
        authenticate(name: string, owner: string, authType: string, options: {[key: string]: any}, callback: AuthenticatorCallback): void;

        /**
         * Authenticates an application account to get an auth token.
         * @param name Indicates the account name of your application or third-party applications.
         * @param owner Indicates the account owner of your application or third-party applications.
         * @param authType Indicates the authentication type.
         * @param options Indicates the authenticator-specific options for the request.
         * @param callback Indicates the authenticator callback.
         * @returns void.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name, owner, authType or options.
         * @throws {BusinessError} 12300003 - the account indicated by owner dose not exist.
         * @throws {BusinessError} 12300010 - account service busy.
         * @throws {BusinessError} 12300113 - the account authenticator service does not exist.
         * @throws {BusinessError} 12300114 - authenticator service exception.
         * @since 9
         */
        auth(name: string, owner: string, authType: string, callback: AuthCallback): void;
        auth(name: string, owner: string, authType: string, options: {[key:string]: Object}, callback: AuthCallback): void;

        /**
         * Gets an oauth token with the specified authentication type from a particular application account.
         * @param name Indicates the account name of your application or third-party applications.
         * @param owner Indicates the account owner of your application or third-party applications.
         * @param authType Indicates the authentication type.
         * @returns Returns an oauth token.
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getAuthToken
         */
        getOAuthToken(name: string, owner: string, authType: string, callback: AsyncCallback<string>): void;
        getOAuthToken(name: string, owner: string, authType: string): Promise<string>;

        /**
         * Gets an auth token with the specified authentication type from a particular application account.
         * @param name Indicates the account name of your application or third-party applications.
         * @param owner Indicates the account owner of your application or third-party applications.
         * @param authType Indicates the authentication type.
         * @returns Returns an auth token.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name, owner or authType.
         * @throws {BusinessError} 12300003 - the account indicated by owner dose not exist.
         * @throws {BusinessError} 12300107 - the authType is not found.
         * @since 9
         */
        getAuthToken(name: string, owner: string, authType: string, callback: AsyncCallback<string>): void;
        getAuthToken(name: string, owner: string, authType: string): Promise<string>;

        /**
         * Sets an oauth token with the specified authentication type for a particular account.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         * @param name Indicates the account name of your application.
         * @param authType Indicates the authentication type.
         * @param token Indicates the oauth token.
         * @returns void.
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setAuthToken
         */
        setOAuthToken(name: string, authType: string, token: string, callback: AsyncCallback<void>): void;
        setOAuthToken(name: string, authType: string, token: string): Promise<void>;

        /**
         * Sets an auth token with the specified authentication type for a particular account.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         * @param name Indicates the account name of your application.
         * @param authType Indicates the authentication type.
         * @param token Indicates the auth token.
         * @returns void.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name, owner, authType or token.
         * @throws {BusinessError} 12300003 - the account indicated by name dose not exist.
         * @throws {BusinessError} 12400004 - the number of token has reached the upper limit.
         * @since 9
         */
        setAuthToken(name: string, authType: string, token: string, callback: AsyncCallback<void>): void;
        setAuthToken(name: string, authType: string, token: string): Promise<void>;

        /**
         * Deletes an oauth token for the specified application account.
         * <p>
         * Only tokens visible to the caller application can be deleted.
         * @param name Indicates the account name of your application or third-party applications.
         * @param owner Indicates the account owner of your application or third-party applications.
         * @param authType Indicates the authentication type.
         * @param token Indicates the oauth token.
         * @returns void.
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#deleteAuthToken
         */
        deleteOAuthToken(name: string, owner: string, authType: string, token: string, callback: AsyncCallback<void>): void;
        deleteOAuthToken(name: string, owner: string, authType: string, token: string): Promise<void>;

        /**
         * Deletes an auth token for the specified application account.
         * <p>
         * Only tokens visible to the caller application can be deleted.
         * @param name Indicates the account name of your application or third-party applications.
         * @param owner Indicates the account owner of your application or third-party applications.
         * @param authType Indicates the authentication type.
         * @param token Indicates the auth token.
         * @returns void.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name, owner, authType or token.
         * @throws {BusinessError} 12300003 - the account indicated by name dose not exist.
         * @throws {BusinessError} 12300107 - the authType is not found.
         * @since 9
         */
        deleteAuthToken(name: string, owner: string, authType: string, token: string, callback: AsyncCallback<void>): void;
        deleteAuthToken(name: string, owner: string, authType: string, token: string): Promise<void>;

        /**
         * Sets the oauth token visibility of the specified authentication type to a third-party application.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         * @param name Indicates the account name of your application.
         * @param authType Indicates the authentication type.
         * @param bundleName Indicates the bundle name of the third-party application.
         * @param isVisible Indicates the bool value of visibility.
         * @returns void.
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#setAuthTokenVisibility
         */
        setOAuthTokenVisibility(name: string, authType: string, bundleName: string, isVisible: boolean, callback: AsyncCallback<void>): void;
        setOAuthTokenVisibility(name: string, authType: string, bundleName: string, isVisible: boolean): Promise<void>;

        /**
         * Sets the auth token visibility of the specified authentication type to a third-party application.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         * @param name Indicates the account name of your application.
         * @param authType Indicates the authentication type.
         * @param bundleName Indicates the bundle name of the third-party application.
         * @param isVisible Indicates the bool value of visibility.
         * @returns void.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name, authType or bundleName.
         * @throws {BusinessError} 12300003 - the account indicated by name dose not exist.
         * @throws {BusinessError} 12300107 - the authType is not found.
         * @throws {BusinessError} 12400001 - the application indicated by name does not exist.
         * @throws {BusinessError} 12400005 - the size of authorization list reaches the upper limit.
         * @since 9
         */
        setAuthTokenVisibility(name: string, authType: string, bundleName: string, isVisible: boolean, callback: AsyncCallback<void>): void;
        setAuthTokenVisibility(name: string, authType: string, bundleName: string, isVisible: boolean): Promise<void>;

        /**
         * Checks the oauth token visibility of the specified authentication type for a third-party application.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         * @param name Indicates the account name of your application or third-party applications.
         * @param authType Indicates the authentication type.
         * @param bundleName Indicates the bundle name of the third-party application.
         * @returns Returns the bool value of visibility.
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#checkAuthTokenVisibility
         */
        checkOAuthTokenVisibility(name: string, authType: string, bundleName: string, callback: AsyncCallback<boolean>): void;
        checkOAuthTokenVisibility(name: string, authType: string, bundleName: string): Promise<boolean>;

        /**
         * Checks the auth token visibility of the specified authentication type for a third-party application.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         * @param name Indicates the account name of your application or third-party applications.
         * @param authType Indicates the authentication type.
         * @param bundleName Indicates the bundle name of the third-party application.
         * @returns Returns the bool value of visibility.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name, authType or bundleName.
         * @throws {BusinessError} 12300003 - the account indicated by name dose not exist.
         * @throws {BusinessError} 12300107 - the authType is not found.
         * @since 9
         */
        checkAuthTokenVisibility(name: string, authType: string, bundleName: string, callback: AsyncCallback<boolean>): void;
        checkAuthTokenVisibility(name: string, authType: string, bundleName: string): Promise<boolean>;

        /**
         * Gets all oauth tokens visible to the caller application.
         * @param name Indicates the account name of your application or third-party applications.
         * @param owner Indicates the account owner of your application or third-party applications.
         * @returns Returns a list of oauth tokens visible to the caller application.
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getAllAuthTokens
         */
        getAllOAuthTokens(name: string, owner: string, callback: AsyncCallback<Array<OAuthTokenInfo>>): void;
        getAllOAuthTokens(name: string, owner: string): Promise<Array<OAuthTokenInfo>>;

        /**
         * Gets all auth tokens visible to the caller application.
         * @param name Indicates the account name of your application or third-party applications.
         * @param owner Indicates the account owner of your application or third-party applications.
         * @returns Returns a list of auth tokens visible to the caller application.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name or owner.
         * @throws {BusinessError} 12300003 - the account indicated by name dose not exist.
         * @since 9
         */
        getAllAuthTokens(name: string, owner: string, callback: AsyncCallback<Array<AuthTokenInfo>>): void;
        getAllAuthTokens(name: string, owner: string): Promise<Array<AuthTokenInfo>>;

        /**
         * Gets the open authorization list with a specified authentication type for a particular application account.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         * @param name Indicates the account name of your application.
         * @param authType Indicates the authentication type.
         * @returns Returns the open authorization list of the specified authentication type.
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getAuthList
         */
        getOAuthList(name: string, authType: string, callback: AsyncCallback<Array<string>>): void;
        getOAuthList(name: string, authType: string): Promise<Array<string>>;

        /**
         * Gets the open authorization list with a specified authentication type for a particular application account.
         * <p>
         * Only the owner of the application account has the permission to call this method.
         * @param name Indicates the account name of your application.
         * @param authType Indicates the authentication type.
         * @returns Returns the open authorization list of the specified authentication type.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name or authType.
         * @throws {BusinessError} 12300003 - the account indicated by name dose not exist.
         * @throws {BusinessError} 12300107 - the authType is not found.
         * @since 9
         */
        getAuthList(name: string, authType: string, callback: AsyncCallback<Array<string>>): void;
        getAuthList(name: string, authType: string): Promise<Array<string>>;

        /**
         * Gets the authenticator callback with the specified session id.
         * <p>
         * Only the owner of the authenticator has the permission to call this method.
         * @param sessionId Indicates the id of a authentication session.
         * @returns Returns the authenticator callback related to the session id.
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#getAuthCallback
         */
        getAuthenticatorCallback(sessionId: string, callback: AsyncCallback<AuthenticatorCallback>): void;
        getAuthenticatorCallback(sessionId: string): Promise<AuthenticatorCallback>;

        /**
         * Obtains the authenticator callback with the specified session id.
         * <p>
         * Only the owner of the authenticator has the permission to call this method.
         * @param sessionId Indicates the id of a authentication session.
         * @returns Returns the authenticator callback related to the session id.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid session id.
         * @throws {BusinessError} 12300108 - the session indicated by sessionId does not exist.
         * @since 9
         */
        getAuthCallback(sessionId: string, callback: AsyncCallback<AuthCallback>): void;
        getAuthCallback(sessionId: string): Promise<AuthCallback>;

        /**
         * Gets the authenticator information of an application account.
         * @param owner Indicates the account owner of your application or third-party applications.
         * @returns Returns the authenticator information of the application account.
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.AppAccountManager#queryAuthenticatorInfo
         */
        getAuthenticatorInfo(owner: string, callback: AsyncCallback<AuthenticatorInfo>): void;
        getAuthenticatorInfo(owner: string): Promise<AuthenticatorInfo>;

        /**
         * Queries the authenticator information of an application account.
         * @param owner Indicates the account owner of your application or third-party applications.
         * @returns Returns the authenticator information of the application account.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid owner.
         * @throws {BusinessError} 12300113 - the account authenticator service does not exist.
         * @since 9
         */
        queryAuthenticatorInfo(owner: string, callback: AsyncCallback<AuthenticatorInfo>): void;
        queryAuthenticatorInfo(owner: string): Promise<AuthenticatorInfo>;

        /**
         * Checks whether a particular account has all specified labels.
         * @param name Indicates the account name.
         * @param owner Indicates the account owner.
         * @param labels Indicates an array of labels to check.
         * @returns boolean
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name, owner or labels.
         * @throws {BusinessError} 12300003 - the account indicated by owner dose not exist.
         * @throws {BusinessError} 12300010 - account service busy.
         * @throws {BusinessError} 12300113 - the account authenticator service does not exist.
         * @throws {BusinessError} 12300114 - authenticator service exception.
         * @since 9
         */
        checkAccountLabels(name: string, owner: string, labels: Array<string>, callback: AsyncCallback<boolean>): void;
        checkAccountLabels(name: string, owner: string, labels: Array<string>): Promise<boolean>;

        /**
         * Deletes the credential of the specified application account.
         * @param name Indicates the account name.
         * @param credentialType Indicates the type of the credential to delete.
         * @returns void.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name or credentialType.
         * @throws {BusinessError} 12300003 - the account indicated by name dose not exist.
         * @throws {BusinessError} 12300102 - credential does not exist.
         * @since 9
         */
        deleteCredential(name: string, credentialType: string, callback: AsyncCallback<void>): void;
        deleteCredential(name: string, credentialType: string): Promise<void>;

        /**
         * Selects a list of accounts that satisfied with the specified options.
         * @param options Indicates the options for selecting account.
         * @returns Returns a list of accounts.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid options.
         * @throws {BusinessError} 12300010 - account service busy.
         * @throws {BusinessError} 12300114 - authenticator service exception.
         * @since 9
         */
        selectAccountsByOptions(options: SelectAccountsOptions, callback: AsyncCallback<Array<AppAccountInfo>>): void;
        selectAccountsByOptions(options: SelectAccountsOptions): Promise<Array<AppAccountInfo>>;

        /**
         * Verifies the credential to ensure the user is the owner of the specified account.
         * @param name Indicates the account name.
         * @param owner Indicates the account owner.
         * @param options Indicates the options for verifying credential.
         * @param callback Indicates the authenticator callback.
         * @returns void.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid name, owner or options.
         * @throws {BusinessError} 12300003 - the account indicated by owner dose not exist.
         * @throws {BusinessError} 12300010 - account service busy.
         * @throws {BusinessError} 12300113 - the account authenticator service does not exist.
         * @throws {BusinessError} 12300114 - authenticator service exception.
         * @since 9
         */
        verifyCredential(name: string, owner: string, callback: AuthCallback): void;
        verifyCredential(name: string, owner: string, options: VerifyCredentialOptions, callback: AuthCallback): void;

        /**
         * Sets properties for the specified account authenticator.
         * <p>
         * If the authenticator supports setting its properties, 
         * the caller will normally be redirected to an Ability specified by Want for property setting.
         * @param owner Indicates the owner of authenticator.
         * @param callback Indicates the authenticator callback.
         * @returns void.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @throws {BusinessError} 12300001 - system service exception.
         * @throws {BusinessError} 12300002 - invalid owner or options.
         * @throws {BusinessError} 12300010 - account service busy.
         * @throws {BusinessError} 12300113 - the account authenticator service does not exist.
         * @throws {BusinessError} 12300114 - authenticator service exception.
         * @since 9
         */
        setAuthenticatorProperties(owner: string, callback: AuthCallback): void;
        setAuthenticatorProperties(owner: string, options: SetPropertiesOptions, callback: AuthCallback): void;
    }

    /**
     * Provides basic information of an application account, including the account owner and name.
     * @name AppAccountInfo
     * @syscap SystemCapability.Account.AppAccount
     * @since 7
     */
    interface AppAccountInfo {
        /**
         * The owner an application account.
         */
        owner: string;

        /**
         * The name an application account.
         */
        name: string;
    }

    /**
     * Provides basic information of an oauth token, including the authentication type and token value.
     * @name OAuthTokenInfo
     * @syscap SystemCapability.Account.AppAccount
     * @since 8
     * @deprecated since 9
     * @useinstead appAccount.AuthTokenInfo
     */
    interface OAuthTokenInfo {
        /**
         * The authentication type.
         *
         * @since 8
         */
        authType: string;

        /**
         * The token value.
         *
         * @since 8
         */
        token: string;
    }

    /**
     * Provides basic information of an auth token, including the authentication type and token value.
     * @name AuthTokenInfo
     * @syscap SystemCapability.Account.AppAccount
     * @since 9
     */
     interface AuthTokenInfo {
        /**
         * The authentication type.
         * @since 9
         */
        authType: string;

        /**
         * The token value.
         * @since 9
         */
        token: string;

        /**
         * The account to which the token belongs.
         * @since 9
         */
        account?: AppAccountInfo;
    }

    /**
     * Provides basic information of an authenticator, including the authenticator owner, icon id and label id.
     * @name AuthenticatorInfo
     * @syscap SystemCapability.Account.AppAccount
     * @since 8
     */
    interface AuthenticatorInfo {
        /**
         * The owner of an authenticator.
         */
        owner: string;

        /**
         * The icon id of an authenticator.
         */
        iconId: number;

        /**
         * The label id of an authenticator.
         */
        labelId: number;
    }

    /**
     * Provides the definition of the authentication result.
     * @name AuthResult
     * @syscap SystemCapability.Account.AppAccount
     * @since 9
     */
     interface AuthResult {
        /**
         * The account information.
         * @since 9
         */
        account?: AppAccountInfo;

        /**
         * The token information.
         * @since 9
         */
        tokenInfo?: AuthTokenInfo;
    }

    /**
     * Provides the available options for creating an account.
     * @name CreateAccountOptions
     * @syscap SystemCapability.Account.AppAccount
     * @since 9
     */
    interface CreateAccountOptions {
        /**
         * The custom data for creating an account,
         * which can be further modified by function setCustomData.
         * @since 9
         */
        customData?: {[key: string]: string};
    }

    /**
     * Provides the available options for creating an account implicitly.
     * @name CreateAccountImplicitlyOptions
     * @syscap SystemCapability.Account.AppAccount
     *
     * @since 9
     */
    interface CreateAccountImplicitlyOptions {
        /**
         * The required labels for creating an account.
         * @since 9
         */
        requiredLabels?: Array<string>;
        
        /**
         * The authentication type.
         * @since 9
         */
        authType?: string;

        /**
         * The authenticator-specific parameters.
         * The list of reserved parameter name:
         * 1. Constants.KEY_CALLER_BUNDLE_NAME;
         * The above parameters are set by the appAccount management service and can be used for identify the caller.
         * @since 9
         */
        parameters?: {[key:string]: Object};
    }

    /**
     * Provides the available options for selecting accounts.
     * @name SelectAccountsOptions
     * @syscap SystemCapability.Account.AppAccount
     * @since 9
     */
    interface SelectAccountsOptions {
        /**
         * The list of accounts allowed to be selected.
         * @since 9
         */
        allowedAccounts?: Array<AppAccountInfo>;

        /**
         * The list of account owners, whose accounts allowed to be selected.
         * @since 9
         */
        allowedOwners?: Array<string>;

        /**
         * The labels required for the selected accounts.
         * @since 9
         */
        requiredLabels?: Array<string>;
    }

    /**
     * Provides the available options for verifying credential.
     * @name VerifyCredentialOptions
     * @syscap SystemCapability.Account.AppAccount
     * @since 9
     */
    interface VerifyCredentialOptions {
        /**
         * The credential type to be verified.
         * @since 9
         */
        credentialType?: string;

        /**
         * The credential to be verified.
         * @since 9
         */
        credential?: string;

        /**
         * The authenticator-specific parameters.
         * The list of reserved parameter name:
         * 1. Constants.KEY_CALLER_BUNDLE_NAME;
         * The above parameters are set by the appAccount management service and can be used for identify the caller.
         * @since 9
         */
        parameters?: {[key:string]: Object};
    }

    /**
     * Provides the available options for setting properties.
     * @name SetPropertiesOptions
     * @syscap SystemCapability.Account.AppAccount
     * @since 9
     */
    interface SetPropertiesOptions {
        /**
         * The properties to be set.
         * @since 9
         */
        properties?: {[key: string]: Object};

        /**
         * The authenticator-specific parameters.
         * The list of reserved parameter name:
         * 1. Constants.KEY_CALLER_BUNDLE_NAME;
         * The above parameters are set by the appAccount management service and can be used for identify the caller.
         *
         * @since 9
         */
        parameters?: {[key: string]: Object};
    }

    /**
     * Provides constants definition.
     * @name Constants
     * @syscap SystemCapability.Account.AppAccount
     * @since 8
     */
    enum Constants {
        /**
         * Indicates the action for adding account implicitly.
         *
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.Constants#ACTION_CREATE_ACCOUNT_IMPLICITLY
         */
        ACTION_ADD_ACCOUNT_IMPLICITLY = "addAccountImplicitly",

        /**
         * Indicates the action for authenticating.
         *
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.Constants#ACTION_AUTH
         */
        ACTION_AUTHENTICATE = "authenticate",

        /**
         * Indicates the action for creating account implicitly.
         *
         * @since 9
         */
        ACTION_CREATE_ACCOUNT_IMPLICITLY = "createAccountImplicitly",

        /**
          * Indicates the action for authenticating.
          *
          * @since 9
          */
        ACTION_AUTH = "auth",

        /**
          * Indicates the action for verifying credential.
          *
          * @since 9
          */
        ACTION_VERIFY_CREDENTIAL = "verifyCredential",

        /**
          * Indicates the action for set authenticator properties.
          *
          * @since 9
          */
        ACTION_SET_AUTHENTICATOR_PROPERTIES = "setAuthenticatorProperties",

        /**
         * Indicates the key of name.
         *
         * @since 8
         */
        KEY_NAME = "name",

        /**
         * Indicates the key of owner.
         *
         * @since 8
         */
        KEY_OWNER = "owner",

        /**
         * Indicates the key of token.
         *
         * @since 8
         */
        KEY_TOKEN = "token",

        /**
         * Indicates the key of action.
         *
         * @since 8
         */
        KEY_ACTION = "action",

        /**
         * Indicates the key of authentication type.
         *
         * @since 8
         */
        KEY_AUTH_TYPE = "authType",

        /**
         * Indicates the key of session id.
         *
         * @since 8
         */
        KEY_SESSION_ID = "sessionId",

        /**
         * Indicates the key of caller pid.
         *
         * @since 8
         */
        KEY_CALLER_PID = "callerPid",

        /**
         * Indicates the key of caller uid.
         *
         * @since 8
         */
        KEY_CALLER_UID = "callerUid",

        /**
         * Indicates the key of caller bundle name.
         *
         * @since 8
         */
        KEY_CALLER_BUNDLE_NAME = "callerBundleName",

        /**
         * Indicates the key of required labels.
         *
         * @since 9
         */
        KEY_REQUIRED_LABELS = "requiredLabels",

        /**
         * Indicates the key of boolean result.
         *
         * @since 9
         */
        KEY_BOOLEAN_RESULT = "booleanResult"
    }

    /**
     * Provides result code definition.
     * @name ResultCode
     * @syscap SystemCapability.Account.AppAccount
     * @since 8
     * @deprecated since 9
     */
    enum ResultCode {
        SUCCESS = 0,
        ERROR_ACCOUNT_NOT_EXIST = 10001,
        ERROR_APP_ACCOUNT_SERVICE_EXCEPTION = 10002,
        ERROR_INVALID_PASSWORD = 10003,
        ERROR_INVALID_REQUEST = 10004,
        ERROR_INVALID_RESPONSE = 10005,
        ERROR_NETWORK_EXCEPTION = 10006,
        ERROR_OAUTH_AUTHENTICATOR_NOT_EXIST = 10007,
        ERROR_OAUTH_CANCELED = 10008,
        ERROR_OAUTH_LIST_TOO_LARGE = 10009,
        ERROR_OAUTH_SERVICE_BUSY = 10010,
        ERROR_OAUTH_SERVICE_EXCEPTION = 10011,
        ERROR_OAUTH_SESSION_NOT_EXIST = 10012,
        ERROR_OAUTH_TIMEOUT = 10013,
        ERROR_OAUTH_TOKEN_NOT_EXIST = 10014,
        ERROR_OAUTH_TOKEN_TOO_MANY = 10015,
        ERROR_OAUTH_UNSUPPORT_ACTION = 10016,
        ERROR_OAUTH_UNSUPPORT_AUTH_TYPE = 10017,
        ERROR_PERMISSION_DENIED = 10018
    }

    /**
     * Provides methods for authenticator callback.
     * @name AuthenticatorCallback
     * @syscap SystemCapability.Account.AppAccount
     * @since 8
     * @deprecated since 9
     * @useinstead AppAccount.AuthCallback
     * 
     */
    interface AuthenticatorCallback {
        /**
         * Notifies the client of the authentication result.
         * @param code Indicates the result code.
         * @param result Indicates the authentication result.
         * @returns void.
         * @since 8
         */
        onResult: (code: number, result: {[key: string]: any}) => void;

        /**
         * Notifies the client that the authentication request need to be redirected.
         * @param request Indicates the request information to be redirected.
         * @returns void.
         * @since 8
         */
        onRequestRedirected: (request: Want) => void;
    }

    /**
     * Provides methods for authentication callback.
     * @name AuthCallback
     * @syscap SystemCapability.Account.AppAccount
     * @since 9
     */
    interface AuthCallback {
        /**
         * Notifies the client of the authentication result.
         * @param code Indicates the result code.
         * @param result Indicates the authentication result.
         * @returns void.
         * @since 9
         */
        onResult: (code: number, result?: AuthResult) => void;

        /**
         * Notifies the client that the authentication request need to be redirected.
         * @param request Indicates the request information to be redirected.
         * @returns void.
         * @since 9
         */
        onRequestRedirected: (request: Want) => void;

        /**
         * Notifies the client that the request is continued.
         * @returns void.
         * @since 9
         */
        onRequestContinued?: () => void;
    }

    /**
     * Provides methods for authenticator.
     * @name Authenticator
     * @syscap SystemCapability.Account.AppAccount
     * @since 8
     */
    class Authenticator {
        /**
         * Adds an application account of a specified owner implicitly.
         * @param authType Indicates the authentication type.
         * @param callerBundleName Indicates the caller bundle name.
         * @param options Indicates the authenticator-specific options for the request.
         * @param callback Indicates the authenticator callback.
         * @returns void.
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.Authenticator#createAccountImplicitly
         */
        addAccountImplicitly(authType: string, callerBundleName: string, options: {[key: string]: any}, callback: AuthenticatorCallback): void;

        /**
         * Creates an application account of a specified owner implicitly.
         * @param options Indicates the authenticator-specific options for the request.
         * @param callback Indicates the authenticator callback.
         * @returns void.
         * @since 9
         */
        createAccountImplicitly(options: CreateAccountImplicitlyOptions, callback: AuthCallback): void;

        /**
         * Authenticates an application account to get an oauth token.
         * @param name Indicates the account name.
         * @param authType Indicates the authentication type.
         * @param callerBundleName Indicates the caller bundle name.
         * @param options Indicates the authenticator-specific options for the request.
         * @param callback Indicates the authenticator callback.
         * @returns void.
         * @since 8
         * @deprecated since 9
         * @useinstead appAccount.Authenticator#auth
         */
        authenticate(name: string, authType: string, callerBundleName: string, options: {[key: string]: any}, callback: AuthenticatorCallback): void;

        /**
         * Authenticates an application account to get an oauth token.
         * @param name Indicates the account name.
         * @param authType Indicates the authentication type.
         * @param options Indicates the authenticator-specific options for the request.
         * @param callback Indicates the authenticator callback.
         * @returns void.
         * @since 9
         */
        auth(name: string, authType: string, options: {[key:string]: Object}, callback: AuthCallback): void;
        
         /**
         * Verifies the credential to ensure the user is the owner of the specified application account.
         * <p>
         * The credential can be provided in the options, otherwise an Ability will normally be returned,
         * which can be started by the caller to further verify credential.
         * @param name Indicates the name of the application account.
         * @param options Indicates the options for verifying credential.
         * @param callback Indicates the authenticator callback.
         * @returns void.
         * @since 9
         */
        verifyCredential(name: string, options: VerifyCredentialOptions, callback: AuthCallback): void;

        /**
         * Sets properties for the authenticator.
         * @param options Indicates the options for setting properties.
         * @param callback Indicates the authenticator callback.
         * @returns void.
         * @since 9
         */
        setProperties(options: SetPropertiesOptions, callback: AuthCallback): void;

        /**
         * Checks whether a particular account has all specified labels.
         * @param name Indicates the account name.
         * @param labels Indicates an array of labels to check.
         * @param callback Indicates the authenticator callback.
         * @returns void.
         * @since 9
         */
        checkAccountLabels(name: string, labels: Array<string>, callback: AuthCallback): void;

        /**
         * Checks whether the specified account can be removed.
         * @param name Indicates the account name.
         * @param callback Indicates the authenticator callback.
         * @returns void.
         * @since 9
         */
        checkAccountRemovable(name: string, callback: AuthCallback): void;

        /**
         * Gets the remote object of the authenticator for remote procedure call.
         * @returns Returns a remote object.
         * @since 9
         */
        getRemoteObject(): rpc.RemoteObject;
    }
}

export default appAccount;