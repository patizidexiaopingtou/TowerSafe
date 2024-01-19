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
import { LauncherAbilityInfo as _LauncherAbilityInfo } from './bundleManager/LauncherAbilityInfo';
import { ShortcutInfo as _ShortcutInfo, ShortcutWant as _ShortcutWant} from './bundleManager/ShortcutInfo';


/**
 * Launcher bundle manager.
 * @namespace launcherBundleManager
 * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
 * @systemapi
 * @since 9
 */
declare namespace launcherBundleManager {
  /**
   * Obtains launcher abilities info based on a given bundleName and userId.
   * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
   * @param { string } bundleName - Indicates the application bundle name to be queried.
   * @param { number } userId - Indicates the id for the user.
   * @param { AsyncCallback<Array<LauncherAbilityInfo>> } callback -The callback of the LauncherAbilityInfo object result.
   * @throws {BusinessError} 201 - Verify permission denied.
   * @throws {BusinessError} 202 - Permission denied, non-system app called system api.
   * @throws {BusinessError} 401 - The parameter check failed.
   * @throws {BusinessError} 801 - Capability not support.
   * @throws {BusinessError} 17700001 - The specified bundle name is not found.
   * @throws {BusinessError} 17700004 - The specified user ID is not found.
   * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
   * @systemapi
   * @since 9
   */
  function getLauncherAbilityInfo(bundleName: string, userId: number, callback: AsyncCallback<Array<LauncherAbilityInfo>>) : void;

   /**
   * Obtains launcher abilities info based on a given bundleName and userId.
   * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
   * @param { string } bundleName - Indicates the application bundle name to be queried.
   * @param { number } userId - Indicates the id for the user.
   * @returns { Promise<Array<LauncherAbilityInfo>> } the LauncherAbilityInfo object.
   * @throws {BusinessError} 201 - Verify permission denied.
   * @throws {BusinessError} 202 - Permission denied, non-system app called system api.
   * @throws {BusinessError} 401 - The parameter check failed.
   * @throws {BusinessError} 801 - Capability not support.
   * @throws {BusinessError} 17700001 - The specified bundle name is not found.
   * @throws {BusinessError} 17700004 - The specified user ID is not found.
   * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
   * @systemapi
   * @since 9
   */
  function getLauncherAbilityInfo(bundleName: string, userId: number) : Promise<Array<LauncherAbilityInfo>>;

  /**
   * Obtains launcher abilities info based on a given userId.
   * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
   * @param { number } userId - Indicates the id for the user.
   * @param { AsyncCallback<Array<LauncherAbilityInfo>> } callback -The callback of the LauncherAbilityInfo object result.
   * @throws {BusinessError} 201 - Verify permission denied.
   * @throws {BusinessError} 202 - Permission denied, non-system app called system api.
   * @throws {BusinessError} 401 - The parameter check failed.
   * @throws {BusinessError} 801 - Capability not support.
   * @throws {BusinessError} 17700004 - The specified user ID is not found.
   * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
   * @systemapi
   * @since 9
   */
  function getAllLauncherAbilityInfo(userId: number, callback: AsyncCallback<Array<LauncherAbilityInfo>>) : void;

  /**
   * Obtains launcher abilities info based on a given userId.
   * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
   * @param { number } userId - Indicates the id for the user.
   * @returns { Promise<Array<LauncherAbilityInfo>> } the LauncherAbilityInfo object.
   * @throws {BusinessError} 201 - Verify permission denied.
   * @throws {BusinessError} 202 - Permission denied, non-system app called system api.
   * @throws {BusinessError} 401 - The parameter check failed.
   * @throws {BusinessError} 801 - Capability not support.
   * @throws {BusinessError} 17700004 - The specified user ID is not found.
   * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
   * @systemapi
   * @since 9
   */
  function getAllLauncherAbilityInfo(userId: number) : Promise<Array<LauncherAbilityInfo>>;

  /**
   * Obtains shortcut info based on a given bundleName.
   * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
   * @param { string } bundleName - Indicates the application bundle name to be queried.
   * @param { AsyncCallback<Array<ShortcutInfo>> } callback -The callback of the ShortcutInfo object result.
   * @throws {BusinessError} 201 - Verify permission denied.
   * @throws {BusinessError} 202 - Permission denied, non-system app called system api.
   * @throws {BusinessError} 401 - The parameter check failed.
   * @throws {BusinessError} 801 - Capability not support.
   * @throws {BusinessError} 17700001 - The specified bundle name is not found.
   * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
   * @systemapi
   * @since 9
   */
  function getShortcutInfo(bundleName :string, callback: AsyncCallback<Array<ShortcutInfo>>) : void;

  /**
   * Obtains shortcut info based on a given bundleName.
   * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
   * @param { string } bundleName - Indicates the application bundle name to be queried.
   * @returns { Promise<Array<ShortcutInfo>> } the LauncherShortcutInfo object.
   * @throws {BusinessError} 201 - Verify permission denied.
   * @throws {BusinessError} 202 - Permission denied, non-system app called system api.
   * @throws {BusinessError} 401 - The parameter check failed.
   * @throws {BusinessError} 801 - Capability not support.
   * @throws {BusinessError} 17700001 - The specified bundle name is not found.
   * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
   * @systemapi
   * @since 9
   */
  function getShortcutInfo(bundleName : string) : Promise<Array<ShortcutInfo>>;

  /**
   * Contains basic launcher Ability information, which uniquely identifies an LauncherAbilityInfo.
   * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
   * @systemapi
   * @since 9
   */
  export type LauncherAbilityInfo = _LauncherAbilityInfo;

  /**
   * Provides information about a shortcut, including the shortcut ID and label.
   * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
   * @systemapi
   * @since 9
   */
  export type ShortcutInfo = _ShortcutInfo;
  /**
   * Obtains information about the ability that a shortcut will start.
   * @syscap SystemCapability.BundleManager.BundleFramework.Launcher
   * @systemapi
   * @since 9
   */
  export type ShortcutWant = _ShortcutWant;
}

export default launcherBundleManager;
