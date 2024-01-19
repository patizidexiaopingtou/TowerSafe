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

/**
 * Provide methods for matching monitored AbilityStage objects that meet specified conditions.
 * The most recently matched AbilityStage objects will be saved in the AbilityStageMonitor object.
 *
 * @since 9
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @permission N/A
 */
export interface AbilityStageMonitor {
    /**
     * The module name of the abilityStage to monitor.
     *
     * @since 9
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     */
    moduleName: string;

    /**
     * The source path of the abilityStage to monitor.
     *
     * @since 9
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     */
     srcEntrance: string;
}

export default AbilityStageMonitor;