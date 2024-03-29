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
 * Parameters corresponding to mission.
 *
 * @since 9
 * @syscap SystemCapability.Ability.AbilityRuntime.Mission
 * @permission ohos.permission.MANAGE_MISSIONS
 * @systemapi hide for inner use.
 */
export interface MissionParameter {
    /**
     * Indicates the deviceId to start sync.
     *
     * @since 9
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     */
    deviceId: string;

    /**
     * If needed to fix the versions conflict.
     *
     * @since 9
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     */
    fixConflict: boolean;

    /**
     * Tag used to be specified.
     *
     * @since 9
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     */
    tag: number;
}