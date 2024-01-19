/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
import { ApplicationInfo } from './bundle/applicationInfo';
import { AbilityInfo } from './bundle/abilityInfo';
import { PermissionDef } from  './bundle/PermissionDef';
import Want from './@ohos.app.ability.Want';
import image from './@ohos.multimedia.image';
import { BundleInfo } from './bundle/bundleInfo';
import { BundleInstaller } from './bundle/bundleInstaller';

/**
 * bundle.
 * @name bundle
 * @since 7
 * @syscap SystemCapability.BundleManager.BundleFramework
 * @deprecated since 9
 * @useinstead ohos.bundle.bundleManager
 */
declare namespace bundle {

/**
 * @name BundleFlag
 * @since 7
 * @syscap SystemCapability.BundleManager.BundleFramework
 * @deprecated since 9
 * @useinstead ohos.bundle.bundleManager.BundleFlag, ohos.bundle.bundleManager.ApplicationFlag or
 *          ohos.bundle.bundleManager.AbilityFlag
 */
  enum BundleFlag {
    GET_BUNDLE_DEFAULT = 0x00000000,
    GET_BUNDLE_WITH_ABILITIES = 0x00000001,
    GET_ABILITY_INFO_WITH_PERMISSION = 0x00000002,
    GET_ABILITY_INFO_WITH_APPLICATION = 0x00000004,
    GET_APPLICATION_INFO_WITH_PERMISSION = 0x00000008,
    GET_BUNDLE_WITH_REQUESTED_PERMISSION = 0x00000010,
    GET_ALL_APPLICATION_INFO = 0xFFFF0000,
    /**
     * @since 8
     */
    GET_ABILITY_INFO_WITH_METADATA = 0x00000020,
    /**
     * @since 8
     */
     GET_APPLICATION_INFO_WITH_METADATA = 0x00000040,
    /**
     * @since 8
     */
    GET_ABILITY_INFO_SYSTEMAPP_ONLY = 0x00000080,
    /**
     * @since 8
     */
    GET_ABILITY_INFO_WITH_DISABLE = 0x00000100,
    /**
     * @since 8
     */
    GET_APPLICATION_INFO_WITH_DISABLE = 0x00000200,
  }

/**
 * @name ColorMode
 * @since 7
 * @syscap SystemCapability.BundleManager.BundleFramework
 * @deprecated since 9
 */
  export enum ColorMode {
    AUTO_MODE = -1,
    DARK_MODE = 0,
    LIGHT_MODE = 1,
  }

/**
 * @name GrantStatus
 * @since 7
 * @syscap SystemCapability.BundleManager.BundleFramework
 * @deprecated since 9
 * @useinstead ohos.bundle.bundleManager.PermissionGrantState
 */
  export enum GrantStatus {
    PERMISSION_DENIED = -1,
    PERMISSION_GRANTED = 0,
  }

  /**
   * @name AbilityType
   * @since 7
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @deprecated since 9
   * @useinstead ohos.bundle.bundleManager.AbilityType
   */
  export enum AbilityType {
    /**
     * @default Indicates an unknown ability type
     * @since 7
     * @syscap SystemCapability.BundleManager.BundleFramework
     */
    UNKNOWN,

    /**
     * @default Indicates that the ability has a UI
     * @since 7
     * @syscap SystemCapability.BundleManager.BundleFramework
     */
    PAGE,

    /**
     * @default Indicates that the ability does not have a UI
     * @since 7
     * @syscap SystemCapability.BundleManager.BundleFramework
     */
    SERVICE,

    /**
     * @default Indicates that the ability is used to provide data access services
     * @since 7
     * @syscap SystemCapability.BundleManager.BundleFramework
     */
    DATA,
  }

  /**
   * @name AbilitySubType
   * @since 7
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @deprecated since 9
   */
  export enum AbilitySubType {
    UNSPECIFIED = 0,
    CA = 1,
  }

  /**
   * @name DisplayOrientation
   * @since 7
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @deprecated since 9
   * @useinstead ohos.bundle.bundleManager.DisplayOrientation
   */
  export enum DisplayOrientation {
    /**
     * @default Indicates that the system automatically determines the display orientation
     * @since 7
     * @syscap SystemCapability.BundleManager.BundleFramework
     */
    UNSPECIFIED,

    /**
     * @default Indicates the landscape orientation
     * @since 7
     * @syscap SystemCapability.BundleManager.BundleFramework
     */
    LANDSCAPE,

    /**
     * @default Indicates the portrait orientation
     * @since 7
     * @syscap SystemCapability.BundleManager.BundleFramework
     */
    PORTRAIT,

    /**
     * @default Indicates the page ability orientation is the same as that of the nearest ability in the stack
     * @since 7
     * @syscap SystemCapability.BundleManager.BundleFramework
     */
    FOLLOW_RECENT,
  }

  /**
   * @name LaunchMode
   * @since 7
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @deprecated since 9
   * @useinstead ohos.bundle.bundleManager.LaunchType
   */
  export enum LaunchMode {
    /**
     * @default Indicates that the ability has only one instance
     * @since 7
     * @syscap SystemCapability.BundleManager.BundleFramework
     */
    SINGLETON = 0,

    /**
     * @default Indicates that the ability can have multiple instances
     * @since 7
     * @syscap SystemCapability.BundleManager.BundleFramework
     */
    STANDARD = 1,
  }

  /**
   * @name BundleOptions
   * @since 7
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @deprecated since 9
   */
  export interface BundleOptions {
    /**
     * @default Indicates the user id
     * @since 7
     * @syscap SystemCapability.BundleManager.BundleFramework
     */
    userId?: number;
  }

  /**
   * @name InstallErrorCode
   * @since 7
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @deprecated since 9
   */
  export enum InstallErrorCode{
    SUCCESS = 0,
    STATUS_INSTALL_FAILURE = 1,
    STATUS_INSTALL_FAILURE_ABORTED = 2,
    STATUS_INSTALL_FAILURE_INVALID = 3,
    STATUS_INSTALL_FAILURE_CONFLICT = 4,
    STATUS_INSTALL_FAILURE_STORAGE = 5,
    STATUS_INSTALL_FAILURE_INCOMPATIBLE = 6,
    STATUS_UNINSTALL_FAILURE = 7,
    STATUS_UNINSTALL_FAILURE_BLOCKED = 8,
    STATUS_UNINSTALL_FAILURE_ABORTED = 9,
    STATUS_UNINSTALL_FAILURE_CONFLICT = 10,
    STATUS_INSTALL_FAILURE_DOWNLOAD_TIMEOUT = 0x0B,
    STATUS_INSTALL_FAILURE_DOWNLOAD_FAILED = 0x0C,
    /**
      * @since 8
      */
    STATUS_RECOVER_FAILURE_INVALID = 0x0D,
    /**
      * @since 7
      */
    STATUS_ABILITY_NOT_FOUND = 0x40,
    /**
      * @since 7
      */
    STATUS_BMS_SERVICE_ERROR = 0x41,
    /**
      * @since 8
      */
    STATUS_FAILED_NO_SPACE_LEFT = 0x42,
    /**
      * @since 8
      */
    STATUS_GRANT_REQUEST_PERMISSIONS_FAILED = 0x43,
    /**
     * @since 8
     */
    STATUS_INSTALL_PERMISSION_DENIED = 0x44,
    /**
     * @since 8
     */
    STATUS_UNINSTALL_PERMISSION_DENIED = 0x45,
  }

  /**
   * Obtains bundleInfo based on bundleName, bundleFlags and options.
   *
   * @since 7
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @param bundleName Indicates the application bundle name to be queried.
   * @param bundleFlags Indicates the application bundle flags to be queried.
   * @param options Indicates the bundle options object.
   * @returns Returns the BundleInfo object.
   * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED or ohos.permission.GET_BUNDLE_INFO
   * @deprecated since 9
   * @useinstead ohos.bundle.bundleManager#getBundleInfo
   */
   function getBundleInfo(bundleName: string, bundleFlags: number, options: BundleOptions, callback: AsyncCallback<BundleInfo>): void;
   function getBundleInfo(bundleName: string, bundleFlags: number, callback: AsyncCallback<BundleInfo>): void;
   function getBundleInfo(bundleName: string, bundleFlags: number, options?: BundleOptions): Promise<BundleInfo>;

  /**
   * Obtains the interface used to install bundles.
   *
   * @since 7
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @returns Returns the IBundleInstaller interface.
   * @permission ohos.permission.INSTALL_BUNDLE
   * @systemapi Hide this for inner system use
   * @deprecated since 9
   * @useinstead ohos.bundle.installer#getBundleInstaller
   */
  function getBundleInstaller(callback: AsyncCallback<BundleInstaller>): void;
  function getBundleInstaller(): Promise<BundleInstaller>;

  /**
   * Obtains information about the current ability.
   *
   * @since 7
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @param bundleName Indicates the application bundle name to be queried.
   * @param abilityName Indicates the ability name.
   * @returns Returns the AbilityInfo object for the current ability.
   * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED or ohos.permission.GET_BUNDLE_INFO
   * @deprecated since 9
   * @useinstead ohos.bundle.bundleManager#queryAbilityInfo
   */
  function getAbilityInfo(bundleName: string, abilityName: string, callback: AsyncCallback<AbilityInfo>): void;
  function getAbilityInfo(bundleName: string, abilityName: string): Promise<AbilityInfo>;

  /**
   * Obtains based on a given bundle name.
   *
   * @since 7
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @param bundleName Indicates the application bundle name to be queried.
   * @param bundleFlags Indicates the flag used to specify information contained in the ApplicationInfo object
   *              that will be returned.
   * @param userId Indicates the user ID or do not pass user ID.
   * @returns Returns the ApplicationInfo object.
   * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED or ohos.permission.GET_BUNDLE_INFO
   * @deprecated since 9
   * @useinstead ohos.bundle.bundleManager#getApplicationInfo
   */
  function getApplicationInfo(bundleName: string, bundleFlags: number, userId: number, callback: AsyncCallback<ApplicationInfo>) : void;
  function getApplicationInfo(bundleName: string, bundleFlags: number, callback: AsyncCallback<ApplicationInfo>) : void;
  function getApplicationInfo(bundleName: string, bundleFlags: number, userId?: number) : Promise<ApplicationInfo>;

  /**
   * Query the AbilityInfo by the given Want.
   *
   * @since 7
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @param want Indicates the Want containing the application bundle name to
   *               be queried.
   * @param bundleFlags Indicates the flag used to specify information contained in the AbilityInfo objects that
   *              will be returned.
   * @param userId Indicates the user ID.
   * @returns Returns a list of AbilityInfo objects.
   * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED or ohos.permission.GET_BUNDLE_INFO
   * @deprecated since 9
   * @useinstead ohos.bundle.bundleManager#queryAbilityInfo
   */
  function queryAbilityByWant(want: Want, bundleFlags: number, userId: number, callback: AsyncCallback<Array<AbilityInfo>>): void;
  function queryAbilityByWant(want: Want, bundleFlags: number, callback: AsyncCallback<Array<AbilityInfo>>): void;
  function queryAbilityByWant(want: Want, bundleFlags: number, userId?:number): Promise<Array<AbilityInfo>>;

  /**
   * Obtains BundleInfo of all bundles available in the system.
   *
   * @since 7
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @param bundleFlag Indicates the flag used to specify information contained in the BundleInfo that will be
   *              returned.
   * @param userId Indicates the user id.
   * @returns Returns a list of BundleInfo objects.
   * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
   * @deprecated since 9
   * @useinstead ohos.bundle.bundleManager#getAllBundleInfo
   */
  function getAllBundleInfo(bundleFlag: BundleFlag, userId: number, callback: AsyncCallback<Array<BundleInfo>>) : void;
  function getAllBundleInfo(bundleFlag: BundleFlag, callback: AsyncCallback<Array<BundleInfo>>) : void;
  function getAllBundleInfo(bundleFlag: BundleFlag, userId?: number) : Promise<Array<BundleInfo>>;

  /**
   * Obtains information about all installed applications of a specified user.
   *
   * @since 7
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @param bundleFlags Indicates the flag used to specify information contained in the ApplicationInfo objects
   *              that will be returned.
   * @param userId Indicates the user ID or do not pass user ID.
   * @returns Returns a list of ApplicationInfo objects.
   * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
   * @deprecated since 9
   * @useinstead ohos.bundle.bundleManager#getAllApplicationInfo
   */
  function getAllApplicationInfo(bundleFlags: number, userId: number, callback: AsyncCallback<Array<ApplicationInfo>>) : void;
  function getAllApplicationInfo(bundleFlags: number, callback: AsyncCallback<Array<ApplicationInfo>>) : void;
  function getAllApplicationInfo(bundleFlags: number, userId?: number) : Promise<Array<ApplicationInfo>>;

  /**
   * Obtains bundle name by the given uid.
   *
   * @since 8
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @param uid Indicates the UID of an application.
   * @returns Returns the bundle name.
   * @deprecated since 9
   * @useinstead ohos.bundle.bundleManager#getNameForUid
   */
   function getNameForUid(uid: number, callback: AsyncCallback<string>) : void
   function getNameForUid(uid: number) : Promise<string>;

  /**
   * Obtains information about an application bundle contained in an ohos Ability Package (HAP).
   *
   * @since 7
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @param hapFilePath Indicates the path storing the HAP. The path should be the relative path to the data
   *                    directory of the current application.
   * @param bundleFlags Indicates the flag used to specify information contained in the BundleInfo object to be
   *              returned.
   * @returns Returns the BundleInfo object.
   * @deprecated since 9
   * @useinstead ohos.bundle.bundleManager#getBundleArchiveInfo
   */
  function getBundleArchiveInfo(hapFilePath: string, bundleFlags: number, callback: AsyncCallback<BundleInfo>) : void
  function getBundleArchiveInfo(hapFilePath: string, bundleFlags: number) : Promise<BundleInfo>;

  /**
   * Obtains the Want for starting the main ability of an application based on the
   * given bundle name. The main ability of an application is the ability that has the
   * #ACTION_HOME and #ENTITY_HOME Want
   * filters set in the application's <b>config.json</b> file.
   *
   * @since 7
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @param bundleName Indicates the bundle name of the application.
   * @returns Returns the Want for starting the application's main ability if any; returns null if
   *         the given bundle does not exist or does not contain any main ability.
   * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
   * @deprecated since 9
   * @useinstead ohos.bundle.bundleManager#getLaunchWantForBundle
   */
  function getLaunchWantForBundle(bundleName: string, callback: AsyncCallback<Want>): void;
  function getLaunchWantForBundle(bundleName: string): Promise<Want>;

  /**
   * Clears cache data of a specified application.
   *
   * @since 8
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @param bundleName Indicates the bundle name of the application whose cache data is to be cleared.
   * @param callback Indicates the callback to be invoked for returning the operation result.
   * @permission ohos.permission.REMOVE_CACHE_FILES
   * @systemapi Hide this for inner system use
   * @deprecated since 9
   * @useinstead ohos.bundle.bundleManager#cleanBundleCacheFiles
   */
  function cleanBundleCacheFiles(bundleName: string, callback: AsyncCallback<void>): void;
  function cleanBundleCacheFiles(bundleName: string): Promise<void>;

  /**
   * Sets whether to enable a specified application.
   *
   * @since 8
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @param bundleName Indicates the bundle name of the application.
   * @param isEnable Specifies whether to enable the application. The value true means to enable it, and the
   *                  value false means to disable it.
   * @permission ohos.permission.CHANGE_ABILITY_ENABLED_STATE
   * @systemapi Hide this for inner system use
   * @deprecated since 9
   * @useinstead ohos.bundle.bundleManager#setApplicationEnabled
   */
  function setApplicationEnabled(bundleName: string, isEnable: boolean, callback: AsyncCallback<void>): void;
  function setApplicationEnabled(bundleName: string, isEnable: boolean): Promise<void>;

  /**
   * Sets whether to enable a specified ability.
   *
   * @since 8
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @param abilityInfo Indicates information about the ability to set.
   * @param isEnable Specifies whether to enable the ability. The value true means to enable it, and the
   *                  value false means to disable it..
   * @permission ohos.permission.CHANGE_ABILITY_ENABLED_STATE
   * @systemapi Hide this for inner system use
   * @deprecated since 9
   * @useinstead ohos.bundle.bundleManager#setAbilityEnabled
   */
  function setAbilityEnabled(info: AbilityInfo, isEnable: boolean, callback: AsyncCallback<void>): void;
  function setAbilityEnabled(info: AbilityInfo, isEnable: boolean): Promise<void>;

  /**
   * Get the permission details by permissionName.
   *
   * @since 8
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @param permissionName Indicates permission name.
   * @returns Returns permissionDef object.
   * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
   * @systemapi
   * @deprecated since 9
   * @useinstead ohos.bundle.bundleManager#getPermissionDef
   */
  function getPermissionDef(permissionName: string, callback: AsyncCallback<PermissionDef>): void;
  function getPermissionDef(permissionName: string): Promise<PermissionDef>;

  /**
   * Obtains the label of a specified ability.
   *
   * @since 8
   * @syscap SystemCapability.BundleManager.BundleFramework
   * @param bundleName Indicates the bundle name of the application to which the ability belongs.
   * @param abilityName Indicates the ability name.
   * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED or ohos.permission.GET_BUNDLE_INFO
   * @returns Returns the label representing the label of the specified ability.
   * @deprecated since 9
   * @useinstead ohos.bundle.bundleManager#getAbilityLabel
   */
  function getAbilityLabel(bundleName: string, abilityName: string, callback: AsyncCallback<string>): void;
  function getAbilityLabel(bundleName: string, abilityName: string): Promise<string>;

  /**
    * Obtains the icon of a specified ability.
    *
    * @since 8
    * @syscap SystemCapability.BundleManager.BundleFramework
    * @param bundleName Indicates the bundle name of the application to which the ability belongs.
    * @param abilityName Indicates the ability name.
    * @returns Returns the PixelMap object representing the icon of the specified ability.
    * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED or ohos.permission.GET_BUNDLE_INFO
    * @deprecated since 9
    * @useinstead ohos.resourceManager#getMediaContent
    */
  function getAbilityIcon(bundleName: string, abilityName: string, callback: AsyncCallback<image.PixelMap>): void;
  function getAbilityIcon(bundleName: string, abilityName: string): Promise<image.PixelMap>;

  /**
    * Checks whether a specified ability is enabled.
    *
    * @since 8
    * @syscap SystemCapability.BundleManager.BundleFramework
    * @param info Indicates information about the ability to check.
    * @returns Returns true if the ability is enabled; returns false otherwise.
    * @deprecated since 9
    * @useinstead ohos.bundle.bundleManager#isAbilityEnabled
    */
  function isAbilityEnabled(info: AbilityInfo, callback: AsyncCallback<boolean>): void;
  function isAbilityEnabled(info: AbilityInfo): Promise<boolean>;

  /**
    * Checks whether a specified application is enabled.
    *
    * @since 8
    * @syscap SystemCapability.BundleManager.BundleFramework
    * @param bundleName Indicates the bundle name of the application.
    * @returns Returns true if the application is enabled; returns false otherwise.
    * @deprecated since 9
    * @useinstead ohos.bundle.bundleManager#isApplicationEnabled
    */
  function isApplicationEnabled(bundleName: string, callback: AsyncCallback<boolean>): void;
  function isApplicationEnabled(bundleName: string): Promise<boolean>;
}

export default bundle;
