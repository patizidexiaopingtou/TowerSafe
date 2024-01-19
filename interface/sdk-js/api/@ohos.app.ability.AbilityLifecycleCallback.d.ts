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

import UIAbility from "./@ohos.app.ability.UIAbility";
import dataAbility from "./@ohos.data.dataAbility";
import window from './@ohos.window';

/**
 * The ability lifecycle callback.
 * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
 * @StageModelOnly
 * @since 9
 */
export default class AbilityLifecycleCallback {
    /**
     * Called back when an ability is started for initialization.
     * @param { Ability } ability - Indicates the ability to register for listening.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    onAbilityCreate(ability: UIAbility): void;

    /**
     * Called back when a window stage is created.
     * @param { Ability } ability - Indicates the ability to register for listening.
     * @param { window.WindowStage } windowStage - window stage to create
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    onWindowStageCreate(ability: UIAbility, windowStage: window.WindowStage): void;

    /**
     * Called back when a window stage is actived.
     * @param { Ability } ability - Indicates the ability to register for listening.
     * @param { window.WindowStage } windowStage - window stage to active
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    onWindowStageActive(ability: UIAbility, windowStage: window.WindowStage): void;

    /**
     * Called back when a window stage is inactived.
     * @param { Ability } ability - Indicates the ability to register for listening.
     * @param { window.WindowStage } windowStage - window stage to inactive
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    onWindowStageInactive(ability: UIAbility, windowStage: window.WindowStage): void;

    /**
     * Called back when a window stage is destroyed.
     * @param { Ability } ability - Indicates the ability to register for listening.
     * @param { window.WindowStage } windowStage - window stage to destroy
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    onWindowStageDestroy(ability: UIAbility, windowStage: window.WindowStage): void;

    /**
     * Called back when an ability is destroyed.
     * @param { Ability } ability - Indicates the ability to register for listening.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    onAbilityDestroy(ability: UIAbility): void;

    /**
     * Called back when the state of an ability changes to foreground.
     * @param { Ability } ability - Indicates the ability to register for listening.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    onAbilityForeground(ability: UIAbility): void;

    /**
     * Called back when the state of an ability changes to background.
     * @param { Ability } ability - Indicates the ability to register for listening.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    onAbilityBackground(ability: UIAbility): void;

    /**
     * Called back when an ability prepares to continue.
     * @param { Ability } ability - Indicates the ability to register for listening.
     * @syscap SystemCapability.Ability.AbilityRuntime.AbilityCore
     * @StageModelOnly
     * @since 9
     */
    onAbilityContinue(ability: UIAbility): void;
}