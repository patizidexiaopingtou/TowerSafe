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

import { AsyncCallback } from './basic';
import { Configuration } from './@ohos.app.ability.Configuration';
import { AbilityRunningInfo as _AbilityRunningInfo } from './application/AbilityRunningInfo';
import { ExtensionRunningInfo as _ExtensionRunningInfo } from './application/ExtensionRunningInfo';
import { ElementName }  from './bundleManager/ElementName';

/**
 * The class of an ability manager.
 * @namespace abilityManager
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @systemapi
 * @since 9
 */
declare namespace abilityManager {
    /**
     * Enum for the ability state.
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @since 9
     */
    export enum AbilityState {
        INITIAL = 0,
        FOCUS = 2,
        FOREGROUND = 9,
        BACKGROUND = 10,
        FOREGROUNDING = 11,
        BACKGROUNDING = 12
    }

    /**
     * Updates the configuration by modifying the configuration.
     * @permission ohos.permission.UPDATE_CONFIGURATION
     * @param { Configuration } config - Indicates the new configuration.
     * @param { AsyncCallback<void> } callback - The callback of updateConfiguration.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @since 9
     */
    function updateConfiguration(config: Configuration, callback: AsyncCallback<void>): void;

    /**
     * Updates the configuration by modifying the configuration.
     * @permission ohos.permission.UPDATE_CONFIGURATION
     * @param { Configuration } config - Indicates the new configuration.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @since 9
     */
    function updateConfiguration(config: Configuration): Promise<void>;

    /**
     * Get information about running UI abilities.
     * @permission ohos.permission.GET_RUNNING_INFO
     * @returns { Promise<Array<AbilityRunningInfo>> } Returns the array of AbilityRunningInfo.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @since 9
     */
    function getAbilityRunningInfos(): Promise<Array<AbilityRunningInfo>>;

    /**
     * Get information about running UI abilities.
     * @permission ohos.permission.GET_RUNNING_INFO
     * @param { AsyncCallback<Array<AbilityRunningInfo>> } callback - The callback is used to return the array of AbilityRunningInfo.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @since 9
     */
    function getAbilityRunningInfos(callback: AsyncCallback<Array<AbilityRunningInfo>>): void;

    /**
     * Get information about running extensions.
     * @permission ohos.permission.GET_RUNNING_INFO
     * @param { number } upperLimit - Get the maximum limit of the number of messages.
     * @returns { Promise<Array<ExtensionRunningInfo>> } Returns the array of ExtensionRunningInfo.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @since 9
     */
    function getExtensionRunningInfos(upperLimit: number): Promise<Array<ExtensionRunningInfo>>;

    /**
     * Get information about running extensions.
     * @permission ohos.permission.GET_RUNNING_INFO
     * @param { number } upperLimit - Get the maximum limit of the number of messages.
     * @param { AsyncCallback<Array<ExtensionRunningInfo>> } callback - The callback is used to return the array of ExtensionRunningInfo.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @since 9
     */
    function getExtensionRunningInfos(upperLimit: number, callback: AsyncCallback<Array<ExtensionRunningInfo>>): void;

    /**
     * Get the top ability information of the display.
     * @returns { Promise<ElementName> } Returns the elementName info of the top ability.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @since 9
     */
    function getTopAbility(): Promise<ElementName>;

    /**
     * Get the top ability information of the display.
     * @param { AsyncCallback<ElementName> } callback - The callback is used to return the elementName info of the top ability.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @since 9
     */
    function getTopAbility(callback: AsyncCallback<ElementName>): void;

    /**
     * The class of an ability running information.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @since 9
     */
    export type AbilityRunningInfo = _AbilityRunningInfo

    /**
     * The class of an extension running information.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @since 9
     */
    export type ExtensionRunningInfo = _ExtensionRunningInfo
}

export default abilityManager;