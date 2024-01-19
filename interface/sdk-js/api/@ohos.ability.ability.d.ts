/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

import { DataAbilityHelper as _DataAbilityHelper }  from './ability/dataAbilityHelper';
import { PacMap as _PacMap }  from './ability/dataAbilityHelper';
import { DataAbilityOperation as _DataAbilityOperation }  from './ability/dataAbilityOperation';
import { DataAbilityResult as _DataAbilityResult }  from './ability/dataAbilityResult';
import { AbilityResult as _AbilityResult }  from './ability/abilityResult';
import { ConnectOptions as _ConnectOptions }  from './ability/connectOptions';
import { StartAbilityParameter as _StartAbilityParameter }  from './ability/startAbilityParameter';

/**
 * The class of an ability.
 *
 * @since 9
 * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
 * @FAModelOnly
 */
declare namespace ability {

    /**
     * DataAbilityHelper
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     *
     * @since 9
     * @FAModelOnly
     */
    export type DataAbilityHelper = _DataAbilityHelper

    /**
     * Defines a PacMap object for storing a series of values.
     * @since 9
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     */
    export type PacMap = _PacMap

    /**
     * @since 9
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     */
    export type DataAbilityOperation = _DataAbilityOperation

    /**
     * @name DataAbilityResult
     * @since 9
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     */
    export type DataAbilityResult = _DataAbilityResult

    /**
     * @since 9
     * @syscap SystemCapability.Ability.AbilityBase
     * @FAModelOnly
     */
    export type AbilityResult = _AbilityResult

    /**
     * @since 9
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @FAModelOnly
     */
    export type ConnectOptions = _ConnectOptions

    /**
     * @since 9
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     */
    export type StartAbilityParameter = _StartAbilityParameter
}

export default ability;