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
import { MissionInfo as _MissionInfo } from './application/MissionInfo';
import { MissionListener as _MissionListener } from './application/MissionListener';
import { MissionSnapshot as _MissionSnapshot } from './application/MissionSnapshot';
import StartOptions from "./@ohos.app.ability.StartOptions";

/**
 * This module provides the capability to manage abilities and obtaining system task information.
 * @permission ohos.permission.MANAGE_MISSIONS
 * @namespace missionManager
 * @syscap SystemCapability.Ability.AbilityRuntime.Mission
 * @systemapi
 * @since 9
 */
declare namespace missionManager {
    /**
     * Register the missionListener to ams.
     * @param { string } type - mission.
     * @param { MissionListener } listener - Indicates the MissionListener to be registered.
     * @returns { number } Returns the index number of the MissionListener.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function on(type: "mission", listener: MissionListener): number;

    /**
     * Unregister the missionListener to ams.
     * @param { string } type - mission.
     * @param { number } listenerId - Indicates the listener id to be unregistered.
     * @param { AsyncCallback<void> } callback - The callback of off.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function off(type: "mission", listenerId: number, callback: AsyncCallback<void>): void;

    /**
     * Unregister the missionListener to ams.
     * @param { string } type - mission.
     * @param { number } listenerId - Indicates the listener id to be unregistered.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function off(type: "mission", listenerId: number): Promise<void>;

    /**
     * Get the missionInfo with the given missionId.
     * @param { string } deviceId - Indicates the device to be queried.
     * @param { number } missionId - Indicates mission id to be queried.
     * @param { AsyncCallback<MissionInfo> } callback - The callback is used to return the MissionInfo of the given id.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function getMissionInfo(deviceId: string, missionId: number, callback: AsyncCallback<MissionInfo>): void;

    /**
     * Get the missionInfo with the given missionId.
     * @param { string } deviceId - Indicates the device to be queried.
     * @param { number } missionId - Indicates mission id to be queried.
     * @returns { Promise<MissionInfo> } Returns the MissionInfo of the given id.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function getMissionInfo(deviceId: string, missionId: number): Promise<MissionInfo>;

    /**
     * Get missionInfos in the given deviceId with maximum number of numMax.
     * @param { string } deviceId - Indicates the device to be queried.
     * @param { number } numMax - Indicates the maximum number of returned missions.
     * @param { AsyncCallback<Array<MissionInfo>> } callback - The callback is used to return the array of the MissionInfo.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function getMissionInfos(deviceId: string, numMax: number, callback: AsyncCallback<Array<MissionInfo>>): void;

    /**
     * Get missionInfos in the given deviceId with maximum number of numMax.
     * @param { string } deviceId - Indicates the device to be queried.
     * @param { number } numMax - Indicates the maximum number of returned missions.
     * @returns { Promise<Array<MissionInfo>> } Returns the array of the MissionInfo.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function getMissionInfos(deviceId: string, numMax: number): Promise<Array<MissionInfo>>;

    /**
     * Get the mission snapshot with the given missionId.
     * @param { string } deviceId - Indicates the device to be queried.
     * @param { number } missionId - Indicates mission id to be queried.
     * @param { AsyncCallback<MissionSnapshot> } callback - The callback is used to return the MissionSnapshot of the given id.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function getMissionSnapShot(deviceId: string, missionId: number, callback: AsyncCallback<MissionSnapshot>): void;

    /**
     * Get the mission snapshot with the given missionId.
     * @param { string } deviceId - Indicates the device to be queried.
     * @param { number } missionId - Indicates mission id to be queried.
     * @returns { Promise<MissionSnapshot> } Returns the MissionSnapshot of the given id.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function getMissionSnapShot(deviceId: string, missionId: number): Promise<MissionSnapshot>;

    /**
     * Get the mission low resolution snapshot with the given missionId.
     * @param { string } deviceId - Indicates the device to be queried.
     * @param { number } missionId - Indicates mission id to be queried.
     * @param { AsyncCallback<MissionSnapshot> } callback - The callback is used to return the MissionSnapshot of the given id.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function getLowResolutionMissionSnapShot(deviceId: string, missionId: number, callback: AsyncCallback<MissionSnapshot>): void;

    /**
     * Get the mission low resolution snapshot with the given missionId.
     * @param { string } deviceId - Indicates the device to be queried.
     * @param { number } missionId - Indicates mission id to be queried.
     * @returns { Promise<MissionSnapshot> } Returns the MissionSnapshot of the given id.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function getLowResolutionMissionSnapShot(deviceId: string, missionId: number): Promise<MissionSnapshot>;

    /**
     * Lock the mission.
     * @param { number } missionId - Indicates mission id to be locked.
     * @param { AsyncCallback<void> } callback - The callback of lockMission.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function lockMission(missionId: number, callback: AsyncCallback<void>): void;

    /**
     * Lock the mission.
     * @param { number } missionId - Indicates mission id to be locked.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function lockMission(missionId: number): Promise<void>;

    /**
     * Unlock the mission.
     * @param { number } missionId - Indicates mission id to be unlocked.
     * @param { AsyncCallback<void> } callback - The callback of unlockMission.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function unlockMission(missionId: number, callback: AsyncCallback<void>): void;

    /**
     * Unlock the mission.
     * @param { number } missionId - Indicates mission id to be unlocked.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function unlockMission(missionId: number): Promise<void>;

    /**
     * Clear the given mission in the ability manager service.
     * @param { number } missionId - Indicates mission id to be cleared.
     * @param { AsyncCallback<void> } callback - The callback of clearMission.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function clearMission(missionId: number, callback: AsyncCallback<void>): void;

    /**
     * Clear the given mission in the ability manager service.
     * @param { number } missionId - Indicates mission id to be cleared.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function clearMission(missionId: number): Promise<void>;

    /**
     * Clear all missions in the ability manager service.
     * @param { AsyncCallback<void> } callback - The callback of clearAllMissions.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function clearAllMissions(callback: AsyncCallback<void>): void;

    /**
     * Clear all missions in the ability manager service.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function clearAllMissions(): Promise<void>;

    /**
     * Schedule the given mission to foreground.
     * @param { number } missionId - Indicates mission id to be moved to foreground.
     * @param { AsyncCallback<void> } callback - The callback of moveMissionToFront.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function moveMissionToFront(missionId: number, callback: AsyncCallback<void>): void;

    /**
     * Schedule the given mission to foreground.
     * @param { number } missionId - Indicates mission id to be moved to foreground.
     * @param { StartOptions } options - Indicates the start options.
     * @param { AsyncCallback<void> } callback - The callback of moveMissionToFront.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function moveMissionToFront(missionId: number, options: StartOptions, callback: AsyncCallback<void>): void;

    /**
     * Schedule the given mission to foreground.
     * @param { number } missionId - Indicates mission id to be moved to foreground.
     * @param { StartOptions } options - Indicates the start options.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @since 9
     */
    function moveMissionToFront(missionId: number, options?: StartOptions): Promise<void>;

    /**
     * Mission information corresponding to ability.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @systemapi
     * @since 9
     */
    export type MissionInfo = _MissionInfo

    /**
     * MissionListener registered by app.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @systemapi
     * @since 9
     */
    export type MissionListener = _MissionListener

    /**
     * Mission snapshot corresponding to mission.
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @systemapi
     * @since 9
     */
    export type MissionSnapshot = _MissionSnapshot
}

export default missionManager;