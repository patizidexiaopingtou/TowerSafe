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

import { AsyncCallback } from "../basic";
import { ConnectOptions } from "../ability/connectOptions";
import { Caller } from '../@ohos.app.ability.UIAbility';
import ExtensionContext from "./ExtensionContext";
import Want from "../@ohos.app.ability.Want";
import StartOptions from "../@ohos.app.ability.StartOptions";

/**
 * The context of service extension. It allows access to
 * serviceExtension-specific resources.
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @systemapi
 * @StageModelOnly
 * @since 9
 */
export default class ServiceExtensionContext extends ExtensionContext {
    /**
     * Service extension uses this method to start a specific ability.
     * @param { Want } want - Indicates the ability to start.
     * @param { AsyncCallback<void> } callback - The callback of startAbility.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    startAbility(want: Want, callback: AsyncCallback<void>): void;

    /**
     * Service extension uses this method to start a specific ability.
     * @param { Want } want - Indicates the ability to start.
     * @param { StartOptions } options - Indicates the start options.
     * @param { AsyncCallback<void> } callback - The callback of startAbility.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    startAbility(want: Want, options: StartOptions, callback: AsyncCallback<void>): void;

    /**
     * Service extension uses this method to start a specific ability.
     * @param { Want } want - Indicates the ability to start.
     * @param { StartOptions } options - Indicates the start options.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    startAbility(want: Want, options?: StartOptions): Promise<void>;

    /**
     * Service extension uses this method to start a specific ability with account.
     * @param { Want } want - Indicates the ability to start.
     * @param { number } accountId - Indicates the accountId to start.
     * @param { AsyncCallback<void> } callback - The callback of startAbilityWithAccount.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    startAbilityWithAccount(want: Want, accountId: number, callback: AsyncCallback<void>): void;

    /**
     * Service extension uses this method to start a specific ability with account.
     * @param { Want } want - Indicates the ability to start.
     * @param { number } accountId - Indicates the accountId to start.
     * @param { StartOptions } options - Indicates the start options.
     * @param { AsyncCallback<void> } callback - The callback of startAbilityWithAccount.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    startAbilityWithAccount(want: Want, accountId: number, options: StartOptions, callback: AsyncCallback<void>): void;

    /**
     * Service extension uses this method to start a specific ability with account.
     * @param { Want } want - Indicates the ability to start.
     * @param { number } accountId - Indicates the accountId to start.
     * @param { StartOptions } options - Indicates the start options.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    startAbilityWithAccount(want: Want, accountId: number, options?: StartOptions): Promise<void>;

    /**
     * Starts a new service extension ability.
     * @param { Want } want - Indicates the want info to start.
     * @param { AsyncCallback<void> } callback - The callback of startServiceExtensionAbility.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    startServiceExtensionAbility(want: Want, callback: AsyncCallback<void>): void;

    /**
     * Starts a new service extension ability.
     * @param { Want } want - Indicates the want info to start.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    startServiceExtensionAbility(want: Want): Promise<void>;

    /**
     * Starts a new service extension ability with account.
     * @permission ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
     * @param { Want } want - Indicates the want info to start.
     * @param { number } accountId - Indicates the account to start.
     * @param { AsyncCallback<void> } callback - The callback of startServiceExtensionAbilityWithAccount.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    startServiceExtensionAbilityWithAccount(want: Want, accountId: number, callback: AsyncCallback<void>): void;

    /**
     * Starts a new service extension ability with account.
     * @permission ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
     * @param { Want } want - Indicates the want info to start.
     * @param { number } accountId - Indicates the account to start.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    startServiceExtensionAbilityWithAccount(want: Want, accountId: number): Promise<void>;

    /**
     * Stops a service within the same application.
     * @param { Want } want - Indicates the want info to start.
     * @param { AsyncCallback<void> } callback - The callback of stopServiceExtensionAbility.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    stopServiceExtensionAbility(want: Want, callback: AsyncCallback<void>): void;

    /**
     * Stops a service within the same application.
     * @param { Want } want - Indicates the want info to start.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    stopServiceExtensionAbility(want: Want): Promise<void>;

    /**
     * Stops a service within the same application with account.
     * @permission ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
     * @param { Want } want - Indicates the want info to start.
     * @param { number } accountId - Indicates the accountId to start.
     * @param { AsyncCallback<void> } callback - The callback of stopServiceExtensionAbilityWithAccount.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    stopServiceExtensionAbilityWithAccount(want: Want, accountId: number, callback: AsyncCallback<void>): void;

    /**
     * Stops a service within the same application with account.
     * @permission ohos.permission.INTERACT_ACROSS_LOCAL_ACCOUNTS
     * @param { Want } want - Indicates the want info to start.
     * @param { number } accountId - Indicates the accountId to start.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    stopServiceExtensionAbilityWithAccount(want: Want, accountId: number): Promise<void>;

    /**
     * Destroys this service extension.
     * @param { AsyncCallback<void> } callback - The callback of terminateSelf.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    terminateSelf(callback: AsyncCallback<void>): void;

    /**
     * Destroys this service extension.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    terminateSelf(): Promise<void>;

    /**
     * Connects an ability to a Service extension.
     * <p>This method can be called by an ability or service extension, but the destination of the connection must be a
     * service extension. You must implement the {@link ConnectOptions} interface to obtain the proxy of the target
     * service extension when the Service extension is connected.</p>
     * @param { Want } want - Indicates the service extension to connect.
     * @param { ConnectOptions } options - Indicates the callback of connection.
     * @returns { number } Returns the connection id.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    connectServiceExtensionAbility(want: Want, options: ConnectOptions): number;

    /**
     * Connects an ability to a Service extension with account.
     * <p>This method can be called by an ability or service extension, but the destination of the connection must be a
     * service extension. You must implement the {@link ConnectOptions} interface to obtain the proxy of the target
     * service extension when the Service extension is connected.</p>
     * @param { Want } want - Indicates the service extension to connect.
     * @param { number } accountId - Indicates the account to connect.
     * @param { ConnectOptions } options - Indicates the callback of connection.
     * @returns { number } Returns the connection id.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    connectServiceExtensionAbilityWithAccount(want: Want, accountId: number, options: ConnectOptions): number;

    /**
     * Disconnect an ability to a service extension, in contrast to {@link connectAbility}.
     * @param { number } connection - the connection id returned from connectAbility api.
     * @param { AsyncCallback<void> } callback - The callback of disconnectAbility.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    disconnectServiceExtensionAbility(connection: number, callback: AsyncCallback<void>): void;

    /**
     * Disconnect an ability to a service extension, in contrast to {@link connectAbility}.
     * @param { number } connection - the connection id returned from connectAbility api.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    disconnectServiceExtensionAbility(connection: number): Promise<void>;

    /**
     * Get the caller object of the startup capability
     * @permission ohos.permission.ABILITY_BACKGROUND_COMMUNICATION
     * @param { Want } want - Indicates the ability to start.
     * @returns { Promise<Caller> } Returns the Caller interface.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    startAbilityByCall(want: Want): Promise<Caller>;

    /**
     * Service extension uses this method to start a specific ability,
     * if ability is multi instance, will start a recent instance.
     * @param { Want } want - Indicates the ability to start.
     * @param { AsyncCallback<void> } callback - The callback of startAbility.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    startRecentAbility(want: Want, callback: AsyncCallback<void>): void;

    /**
     * Service extension uses this method to start a specific ability,
     * if ability is multi instance, will start a recent instance.
     * @param { Want } want - Indicates the ability to start.
     * @param { StartOptions } options - Indicates the start options.
     * @param { AsyncCallback<void> } callback - The callback of startAbility.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    startRecentAbility(want: Want, options: StartOptions, callback: AsyncCallback<void>): void;

    /**
     * Service extension uses this method to start a specific ability,
     * if ability is multi instance, will start a recent instance.
     * @param { Want } want - Indicates the ability to start.
     * @param { StartOptions } options - Indicates the start options.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    startRecentAbility(want: Want, options?: StartOptions): Promise<void>;
}