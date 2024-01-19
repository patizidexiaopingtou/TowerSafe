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

import { AsyncCallback } from './basic';
import { ContinueCallback } from './application/ContinueCallback';
import { ContinueDeviceInfo } from './application/ContinueDeviceInfo';
import { MissionCallback } from './application/MissionCallbacks';
import { MissionDeviceInfo } from './application/MissionDeviceInfo';
import { MissionParameter } from './application/MissionParameter';

/**
 * This module provides the capability to manage abilities and obtain system task information for distributed
 * scenario.
 * @namespace distributedMissionManager
 * @syscap SystemCapability.Ability.AbilityRuntime.Mission
 * @systemapi Hide this for inner system use.
 * @since 9
 */
declare namespace distributedMissionManager {
  /**
   * Start sync missions from remote device.
   *
   * @permission ohos.permission.MANAGE_MISSIONS
   * @param parameter Parameters corresponding to mission.
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @syscap SystemCapability.Ability.AbilityRuntime.Mission
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  function startSyncRemoteMissions(parameter: MissionParameter, callback: AsyncCallback<void>): void;
  function startSyncRemoteMissions(parameter: MissionParameter): Promise<void>;

  /**
   * Stop sync missions from remote device.
   *
   * @permission ohos.permission.MANAGE_MISSIONS
   * @param parameter Parameters corresponding to mission.
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @syscap SystemCapability.Ability.AbilityRuntime.Mission
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  function stopSyncRemoteMissions(parameter: MissionDeviceInfo, callback: AsyncCallback<void>): void;
  function stopSyncRemoteMissions(parameter: MissionDeviceInfo): Promise<void>;

  /**
   * Register the missionListener to ams.
   *
   * @permission ohos.permission.MANAGE_MISSIONS
   * @param parameter Parameters corresponding to mission.
   * @param options The callbacks for registering mission.
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @syscap SystemCapability.Ability.AbilityRuntime.Mission
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  function registerMissionListener(parameter: MissionDeviceInfo, options: MissionCallback, callback: AsyncCallback<void>): void;
  function registerMissionListener(parameter: MissionDeviceInfo, options: MissionCallback): Promise<void>;

  /**
   * Unregister the missionListener to ams.
   *
   * @permission ohos.permission.MANAGE_MISSIONS
   * @param parameter Parameters corresponding to mission.
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @syscap SystemCapability.Ability.AbilityRuntime.Mission
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  function unRegisterMissionListener(parameter: MissionDeviceInfo, callback: AsyncCallback<void>): void;
  function unRegisterMissionListener(parameter: MissionDeviceInfo): Promise<void>;

  /**
   * Continue mission
   *
   * @permission ohos.permission.MANAGE_MISSIONS and ohos.permission.DISTRIBUTED_DATASYNC
   * @param parameter Parameters corresponding to continue mission.
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 16300501 - The system ability work abnormally.
   * @throws { BusinessError } 16300502 - Failed to get the missionInfo of the specified missionId.
   * @throws { BusinessError } 16300503 - The application is not installed on the remote end and installation-free is
   * not supported.
   * @throws { BusinessError } 16300504 - The application is not installed on the remote end but installation-free is
   * supported, try again with freeInstall flag.
   * @throws { BusinessError } 16300505 - The operation device must be the device where the application to be continued
   * is located or the target device to be continued.
   * @throws { BusinessError } 16300506 - The local continuation task is already in progress.
   * @syscap SystemCapability.Ability.AbilityRuntime.Mission
   * @systemapi Hide this for inner system use.
   * @since 9
   */
  function continueMission(parameter: ContinueDeviceInfo, options: ContinueCallback, callback: AsyncCallback<void>): void;
  function continueMission(parameter: ContinueDeviceInfo, options: ContinueCallback): Promise<void>;
}
export default distributedMissionManager;
