/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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
import { MissionInfo } from './application/MissionInfo';
import { MissionListener } from './application/MissionListener';
import { MissionSnapshot } from './application/MissionSnapshot';
import StartOptions from "./@ohos.app.ability.StartOptions";

/**
 * This module provides the capability to manage abilities and obtaining system task information.
 *
 * @name missionManager
 * @since 8
 * @syscap SystemCapability.Ability.AbilityRuntime.Mission
 * @permission ohos.permission.MANAGE_MISSIONS
 * @systemapi hide for inner use.
 * @deprecated since 9
 * @useinstead ohos.app.ability.missionManager
 */
declare namespace missionManager {
    /**
     * Register the missionListener to ams.
     *
     * @since 8
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @param listener Indicates the MissionListener to be registered.
     * @returns The index number of the MissionListener.
     */
    function registerMissionListener(listener: MissionListener): number;

    /**
     * Unregister the missionListener to ams.
     *
     * @since 8
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @param listenerId Indicates the listener id to be unregistered.
     * @returns -
     */
    function unregisterMissionListener(listenerId: number, callback: AsyncCallback<void>): void;
    function unregisterMissionListener(listenerId: number): Promise<void>;

    /**
     * Get the missionInfo with the given missionId.
     *
     * @since 8
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @param deviceId Indicates the device to be queried.
     * @param missionId Indicates mission id to be queried.
     * @returns the {@link MissionInfo} of the given id.
     */
    function getMissionInfo(deviceId: string, missionId: number, callback: AsyncCallback<MissionInfo>): void;
    function getMissionInfo(deviceId: string, missionId: number): Promise<MissionInfo>;

    /**
     * Get the missionInfo with the given missionId.
     *
     * @since 8
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @param deviceId Indicates the device to be queried.
     * @param numMax Indicates the maximum number of returned missions.
     * @returns The array of the {@link MissionInfo}.
     */
    function getMissionInfos(deviceId: string, numMax: number, callback: AsyncCallback<Array<MissionInfo>>): void;
    function getMissionInfos(deviceId: string, numMax: number): Promise<Array<MissionInfo>>;

    /**
     * Get the mission snapshot with the given missionId.
     *
     * @since 8
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @param deviceId Indicates the device to be queried.
     * @param missionId Indicates mission id to be queried.
     * @returns The {@link MissionSnapshot} of the given id.
     */
    function getMissionSnapShot(deviceId: string, missionId: number, callback: AsyncCallback<MissionSnapshot>): void;
    function getMissionSnapShot(deviceId: string, missionId: number): Promise<MissionSnapshot>;

    /**
     * Lock the mission.
     *
     * @since 8
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @param missionId Indicates mission id to be locked.
     * @returns -
     */
    function lockMission(missionId: number, callback: AsyncCallback<void>): void;
    function lockMission(missionId: number): Promise<void>;

    /**
     * Unlock the mission.
     *
     * @since 8
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @param missionId Indicates mission id to be unlocked.
     * @returns -
     */
    function unlockMission(missionId: number, callback: AsyncCallback<void>): void;
    function unlockMission(missionId: number): Promise<void>;

    /**
     * Clear the given mission in the ability manager service.
     *
     * @since 8
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @param missionId Indicates mission id to be cleared.
     * @returns -
     */
    function clearMission(missionId: number, callback: AsyncCallback<void>): void;
    function clearMission(missionId: number): Promise<void>;

    /**
     * Clear all missions in the ability manager service.
     *
     * @since 8
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @returns -
     */
    function clearAllMissions(callback: AsyncCallback<void>): void;
    function clearAllMissions(): Promise<void>;

    /**
     * Schedule the given mission to foreground.
     *
     * @since 8
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @param missionId Indicates mission id to be moved to foreground.
     * @param options Indicates the start options.
     * @returns -
     */
    function moveMissionToFront(missionId: number, callback: AsyncCallback<void>): void;
    function moveMissionToFront(missionId: number, options: StartOptions, callback: AsyncCallback<void>): void;
    function moveMissionToFront(missionId: number, options?: StartOptions): Promise<void>;
}

export default missionManager;