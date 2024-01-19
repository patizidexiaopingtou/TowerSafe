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
 * MissionCallback registered by app.
 *
 * @name MissionCallback
 * @since 9
 * @syscap SystemCapability.Ability.AbilityRuntime.Mission
 * @permission ohos.permission.MANAGE_MISSIONS
 * @systemapi hide for inner use.
 */
 export interface MissionCallback {
    /**
     * Called by system when mission changed.
     *
     * @since 9
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @param deviceId Indicates the deviceId mission changed.
     */
    notifyMissionsChanged(deviceId: string): void;

    /**
     * Called by system when snapshot changed.
     *
     * @since 9
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @param deviceId Indicates the deviceId mission changed.
     * @param mission Indicates the id of destroyed mission.
     */
    notifySnapshot(deviceId: string, mission: number): void;

    /**
     * Called by system when network disconnect.
     *
     * @since 9
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @param deviceId Indicates the deviceId mission changed.
     * @param state Indicates the state of network
     */
    notifyNetDisconnect(deviceId: string, state: number): void;
}