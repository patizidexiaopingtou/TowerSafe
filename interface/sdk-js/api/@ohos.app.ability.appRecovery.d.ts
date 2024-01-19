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

/**
 * This module provides the capability of app recovery.
 * You can use this capability to save state and restart the application
 * which let end user continue their workflow when app error occurs.
 * This api support restart the app when js crash or app freeze occurs currently.
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @since 9
 */
declare namespace appRecovery {
    /**
     * The flag that determines when to restart you app.
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    enum RestartFlag {
        /**
         * No restart restrictions.
         */
        ALWAYS_RESTART = 0,

        /**
         * Restart if current app process encounter uncaught js/ts/ets exception.
         */
        RESTART_WHEN_JS_CRASH = 0x0001,

        /**
         * Restart if the main thread of current app process block more than 6 seconds.
         */
        RESTART_WHEN_APP_FREEZE = 0x0002,

        /**
         * Do not restart in any scenario.
         */
        NO_RESTART = 0xFFFF,
    }

    /**
     * The flag that determines when to save ability state.
     * When start saving ability state, the { ohos.app.ability.UiAbility.onSaveState } will be called and
     * the page stack of current ability will be saved automatically.
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    enum SaveOccasionFlag {
        /**
         * Saving ability state when an error occurs.
         * The error in current situation has the same semantic with { errorManager } defines
         * which means the state that the application cannot continue to work but allows developer to handle.
         */
        SAVE_WHEN_ERROR = 0x0001,

        /**
         * Saving ability state when ability is in background.
         */
        SAVE_WHEN_BACKGROUND = 0x0002,
    }

    /**
     * The flag that determines how to save the ability state.
     * @enum { number }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @since 9
     */
    enum SaveModeFlag {
        /**
         * Save state to file immediately.
         */
        SAVE_WITH_FILE = 0x0001,

        /**
         * Keep state in memory and flush to file when error occurs or { restartApp } is invoked.
         */
        SAVE_WITH_SHARED_MEMORY = 0x0002,
    }

    /**
     * Enable appRecovery function.
     * @param { RestartFlag } The flag that determines the restart cases of your app, default value is { ALWAYS_RESTART }.
     * @param { SaveOccasionFlag } The flag that determines when to save ability state, default value is { SAVE_WHEN_ERROR }.
     * @param { SaveModeFlag } The flag that determines how to save the ability state, default value is { SAVE_WITH_FILE }.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    function enableAppRecovery(restart?: RestartFlag, saveOccasion?: SaveOccasionFlag, saveMode?: SaveModeFlag) : void;

    /**
     * Restart current process and launch the first ability(the entry ability in most cases) of current process.
     * The previous saved state will be filled in the { want.wantParams } of { UIAbility.onCreate } interface.
     * and the { param } of { UIAbility.onCreate } will be set to APP_RECOVERY.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    function restartApp(): void;

    /**
     * Actively save application state.
     * The ability framework will call { UIAbility.onSaveState } of first launched ability and
     * persist state as { saveOccasion } flag from { enableAppRecovery } interface.
     * @returns true if save data successfully, otherwise false.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    function saveAppState(): boolean;
}

export default appRecovery;