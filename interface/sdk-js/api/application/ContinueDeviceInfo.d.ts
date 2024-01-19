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
 * Parameters corresponding to continue mission.
 *
 * @interface ContinueDeviceInfo
 * @syscap SystemCapability.Ability.AbilityRuntime.Mission
 * @systemapi hide for inner use.
 * @since 9
 */
 export interface ContinueDeviceInfo {
    /**
     * Indicates the original deviceId to continue mission.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    srcDeviceId: string;
    /**
     * Indicates the target deviceId to continue mission.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    dstDeviceId: string;
     /**
     * Indicates the mission to continue.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    missionId: number;
    /**
     * Indicates the extended param.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    wantParam: {[key: string]: any};
}