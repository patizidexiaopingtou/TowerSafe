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

import { AsyncCallback, BusinessError } from "./basic";

/**
 * A static class to do update for device.
 *
 * @since 9
 * @syscap SystemCapability.Update.UpdateService
 * @systemapi hide for inner use.
 */
declare namespace update {
    /**
     * Get online update handler for the calling device.
     *
     * @param { UpgradeInfo } upgradeInfo - Indicates client app and business type.
     * @returns { Updater } online update handler to perform online update.
     * @since 9
     */
    function getOnlineUpdater(upgradeInfo: UpgradeInfo): Updater;

    /**
     * Get restore handler.
     *
     * @returns { Restorer } restore handler to perform factory reset.
     * @since 9
     */
    function getRestorer(): Restorer;

    /**
     * Get local update handler.
     *
     * @returns { LocalUpdater } local update handler to perform local update.
     * @since 9
     */
    function getLocalUpdater(): LocalUpdater;

    /**
     * A static class to do online update.
     *
     * @since 9
     * @syscap SystemCapability.Update.UpdateService
     * @systemapi hide for inner use.
     */
    export interface Updater {
        /**
         * Check new version.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { AsyncCallback<CheckResult> } callback - Callback used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        checkNewVersion(callback: AsyncCallback<CheckResult>): void;

        /**
         * Check new version.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @returns { Promise<CheckResult> } Promise used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        checkNewVersion(): Promise<CheckResult>;

        /**
         * Get new version.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { AsyncCallback<CheckResult> } callback - Callback used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        getNewVersionInfo(callback: AsyncCallback<NewVersionInfo>): void;

        /**
         * Get new version.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @returns { Promise<NewVersionInfo> } Promise used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        getNewVersionInfo(): Promise<NewVersionInfo>;

        /**
         * Get new version description.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { VersionDigestInfo } versionDigestInfo - Version digest information.
         * @param { DescriptionOptions } descriptionOptions - Options of the description file.
         * @param { AsyncCallback<Array<ComponentDescription>> } callback - Callback used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        getNewVersionDescription(versionDigestInfo: VersionDigestInfo, descriptionOptions: DescriptionOptions, callback: AsyncCallback<Array<ComponentDescription>>): void;

        /**
         * Get new version description.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { VersionDigestInfo } versionDigestInfo - Version digest information.
         * @param { DescriptionOptions } descriptionOptions - Options of the description file.
         * @returns { Promise<Array<ComponentDescription>> } Promise used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        getNewVersionDescription(versionDigestInfo: VersionDigestInfo, descriptionOptions: DescriptionOptions): Promise<Array<ComponentDescription>>;

        /**
         * Get current version.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { AsyncCallback<Array<CurrentVersionInfo>> } callback - Callback used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        getCurrentVersionInfo(callback: AsyncCallback<CurrentVersionInfo>): void;

        /**
         * Get current version.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @@returns { Promise<Array<CurrentVersionInfo>> } Promise used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        getCurrentVersionInfo(): Promise<CurrentVersionInfo>;

        /**
         * Get current version description.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { DescriptionOptions } descriptionOptions - Options of the description file.
         * @param { AsyncCallback<Array<ComponentDescription>> } callback - Callback used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        getCurrentVersionDescription(descriptionOptions: DescriptionOptions, callback: AsyncCallback<Array<ComponentDescription>>): void;

        /**
         * Get current version description.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { DescriptionOptions } descriptionOptions - Options of the description file.
         * @returns { Promise<Array<ComponentDescription> } Promise used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        getCurrentVersionDescription(descriptionOptions: DescriptionOptions): Promise<Array<ComponentDescription>>;

        /**
         * Get task info.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { AsyncCallback<TaskInfo> } callback - Callback used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        getTaskInfo(callback: AsyncCallback<TaskInfo>): void;

        /**
         * Get task info.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @returns { Promise<TaskInfo> } Promise used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        getTaskInfo(): Promise<TaskInfo>;

        /**
         * Trigger download new version packages.
         * Apps should listen to task update event
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { VersionDigestInfo } versionDigestInfo - Version digest information.
         * @param { DownloadOptions } downloadOptions - Download options.
         * @param { AsyncCallback<void> } callback - Callback used to return the result. If the operation is successful, `err` is `undefined`; otherwise, `err` is an `Error` object.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        download(versionDigestInfo: VersionDigestInfo, downloadOptions: DownloadOptions, callback: AsyncCallback<void>): void;

        /**
         * Trigger download new version packages.
         * Apps should listen to task update event
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { VersionDigestInfo } versionDigestInfo - Version digest information.
         * @param { DownloadOptions } downloadOptions - Download options.
         * @returns { Promise<void> } Promise that returns no value.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        download(versionDigestInfo: VersionDigestInfo, downloadOptions: DownloadOptions): Promise<void>;

        /**
         * Resume download new version packages.
         * Apps should listen to task update event
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { VersionDigestInfo } versionDigestInfo - Version digest information.
         * @param { ResumeDownloadOptions } resumeDownloadOptions - Options for resume download.
         * @param { AsyncCallback<void> } callback - Callback used to return the result. If the operation is successful, `err` is `undefined`; otherwise, `err` is an `Error` object.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        resumeDownload(versionDigestInfo: VersionDigestInfo, resumeDownloadOptions: ResumeDownloadOptions, callback: AsyncCallback<void>): void;

        /**
         * Resume download new version packages.
         * Apps should listen to task update event
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { VersionDigestInfo } versionDigestInfo - Version digest information.
         * @param { ResumeDownloadOptions } resumeDownloadOptions - Options for resume download.
         * @returns { Promise<void> } Promise that returns no value.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        resumeDownload(versionDigestInfo: VersionDigestInfo, resumeDownloadOptions: ResumeDownloadOptions): Promise<void>;

        /**
         * Pause download new version packages.
         * Apps should listen to task update event
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { VersionDigestInfo } versionDigestInfo - Version digest information.
         * @param { PauseDownloadOptions } pauseDownloadOptions - Options for pause download.
         * @param { AsyncCallback<void> } callback - Callback used to return the result. If the operation is successful, `err` is `undefined`; otherwise, `err` is an `Error` object.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        pauseDownload(versionDigestInfo: VersionDigestInfo, pauseDownloadOptions: PauseDownloadOptions, callback: AsyncCallback<void>): void;

        /**
         * Pause download new version packages.
         * Apps should listen to task update event
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { VersionDigestInfo } versionDigestInfo - Version digest information.
         * @param { PauseDownloadOptions } pauseDownloadOptions - Options for pause download.
         * @returns { Promise<void> } Promise that returns no value.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        pauseDownload(versionDigestInfo: VersionDigestInfo, pauseDownloadOptions: PauseDownloadOptions): Promise<void>;

        /**
         * Install packages for the device.
         * Apps should listen to task update event
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { VersionDigestInfo } versionDigestInfo - Version digest information.
         * @param { UpgradeOptions } upgradeOptions - Update options. 
         * @param { AsyncCallback<void> } callback - Callback used to return the result. If the operation is successful, `err` is `undefined`; otherwise, `err` is an `Error` object.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        upgrade(versionDigestInfo: VersionDigestInfo, upgradeOptions: UpgradeOptions, callback: AsyncCallback<void>): void;

        /**
         * Install packages for the device.
         * Apps should listen to task update event
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { VersionDigestInfo } versionDigestInfo - Version digest information.
         * @param { UpgradeOptions } upgradeOptions - Update options. 
         * @param { Promise<void> } Promise that returns no value.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        upgrade(versionDigestInfo: VersionDigestInfo, upgradeOptions: UpgradeOptions): Promise<void>;

        /**
         * Clear error during upgrade.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { VersionDigestInfo } versionDigestInfo - Version digest information.
         * @param { ClearOptions } ClearOptions - Clear options. 
         * @param { AsyncCallback<void> } callback - Callback used to return the result. If the operation is successful, `err` is `undefined`; otherwise, `err` is an `Error` object.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        clearError(versionDigestInfo: VersionDigestInfo, clearOptions: ClearOptions, callback: AsyncCallback<void>): void;

        /**
         * Clear error during upgrade.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { VersionDigestInfo } versionDigestInfo - Version digest information.
         * @param { ClearOptions } clearOptions - Clear options. 
         * @returns { Promise<void> } Promise that returns no value.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        clearError(versionDigestInfo: VersionDigestInfo, clearOptions: ClearOptions): Promise<void>;

        /**
         * Get current upgrade policy.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { AsyncCallback<UpgradePolicy> } callback - Callback used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        getUpgradePolicy(callback: AsyncCallback<UpgradePolicy>): void;

        /**
         * Get current upgrade policy.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @returns { Promise<UpgradePolicy> } Promise used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        getUpgradePolicy(): Promise<UpgradePolicy>;

        /**
         * Set upgrade policy.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { UpgradePolicy } policy - Update policy.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        setUpgradePolicy(policy: UpgradePolicy, callback: AsyncCallback<void>): void;

        /**
         * Set upgrade policy.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { policy } UpgradePolicy - Update policy.
         * @returns { Promise<void> } Promise that returns no value.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        setUpgradePolicy(policy: UpgradePolicy): Promise<void>;

        /**
         * Terminate upgrade task.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { AsyncCallback<void> } callback - Callback used to return the result. If the operation is successful, 'err' is 'undefined'; otherwise, 'err' is an 'Error' object.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        terminateUpgrade(callback: AsyncCallback<void>): void;

        /**
         * Terminate upgrade task.
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @returns { Promise<void> } Promise that returns no value.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        terminateUpgrade(): Promise<void>;

        /**
         * Subscribe task update events
         * 
         * @param { EventClassifyInfo } eventClassifyInfo - Event information.
         * @param { UpgradeTaskCallback } taskCallback - Event callback.
         * @since 9
         */
        on(eventClassifyInfo: EventClassifyInfo, taskCallback: UpgradeTaskCallback): void;

        /**
         * Unsubscribe task update events
         *
         * @param { EventClassifyInfo } eventClassifyInfo - Event information.
         * @param { UpgradeTaskCallback } taskCallback - Event callback.
         * @since 9
         */
        off(eventClassifyInfo: EventClassifyInfo, taskCallback?: UpgradeTaskCallback): void;
    }

    /**
     * A static class to do restore.
     *
     * @since 9
     * @syscap SystemCapability.Update.UpdateService
     * @systemapi hide for inner use.
     */
    export interface Restorer {
        /**
         * Reboot and clean user data.
         *
         * @permission ohos.permission.FACTORY_RESET
         * @param { AsyncCallback<void> } callback - Callback used to return the result. If the operation is successful, `err` is `undefined`; otherwise, `err` is an `Error` object.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        factoryReset(callback: AsyncCallback<void>): void;

        /**
         * Reboot and clean user data.
         * 
         * @permission ohos.permission.FACTORY_RESET
         * @returns { Promise<void> } Promise that returns no value.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        factoryReset(): Promise<void>;
    }

    /**
     * A static class to do local update.
     *
     * @since 9
     * @syscap SystemCapability.Update.UpdateService
     * @systemapi hide for inner use.
     */
    export interface LocalUpdater {
        /**
         * Verify local update package.
         * 
         * @param { UpgradeFile } upgradeFile - Update file.
         * @param { string } certsFile - Path of the certificate file.
         * @param { AsyncCallback<void> } callback - Callback used to return the verify upgrade package result.
         * @permission ohos.permission.UPDATE_SYSTEM
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        verifyUpgradePackage(upgradeFile: UpgradeFile, certsFile: string, callback: AsyncCallback<void>): void;

        /**
         * Verify local update package.
         * 
         * @param { UpgradeFile } upgradeFile - Update file.
         * @param { string } certsFile - Path of the certificate file.
         * returns { Promise<void> } Promise that returns no value.
         * @permission ohos.permission.UPDATE_SYSTEM
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        verifyUpgradePackage(upgradeFile: UpgradeFile, certsFile: string): Promise<void>;

        /**
         * Apply local update package.
         * Apps should listen to task update event
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { UpgradeFile } upgradeFile - Update file.
         * @param { AsyncCallback<void> } callback - Callback used to return the apply new version result.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        applyNewVersion(upgradeFiles: Array<UpgradeFile>, callback: AsyncCallback<void>): void;

        /**
         * Apply local update package.
         * Apps should listen to task update event
         *
         * @permission ohos.permission.UPDATE_SYSTEM
         * @param { UpgradeFile } upgradeFile - Update file.
         * @returns { Promise<void> } Promise that returns no value.
         * @throws { BusinessError } 201 - Permission denied.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 11500104 - IPC error.
         * @since 9
         */
        applyNewVersion(upgradeFiles: Array<UpgradeFile>): Promise<void>;

        /**
         * Subscribe task update events
         *
         * @param { EventClassifyInfo } eventClassifyInfo - Event information.
         * @param { UpgradeTaskCallback } taskCallback - Event callback.
         * @since 9
         */
        on(eventClassifyInfo: EventClassifyInfo, taskCallback: UpgradeTaskCallback): void;

        /**
         * Unsubscribe task update events
         *
         * @param { EventClassifyInfo } eventClassifyInfo - Event information.
         * @param { UpgradeTaskCallback } taskCallback - Event callback.
         * @since 9
         */
        off(eventClassifyInfo: EventClassifyInfo, taskCallback?: UpgradeTaskCallback): void;
    }

    /**
     * Represents upgrade info.
     *
     * @since 9
     */
    export interface UpgradeInfo {
        /**
         * Upgrade client package name
         * @type {string}
         * @since 9
         */
        upgradeApp: string;

        /**
         * BusinessType of upgrade
         * @type {BusinessType}
         * @since 9
         */
        businessType: BusinessType;
    }

    /**
     * Represents business type.
     *
     * @since 9
     */
    export interface BusinessType {
        /**
         * Vendor of business type
         * @type {BusinessVendor}
         * @since 9
         */
        vendor: BusinessVendor;

        /**
         * Update service type
         * @type {BusinessSubType}
         * @since 9
         */
        subType: BusinessSubType;
    }

    /**
     * Represents new version check result.
     *
     * @since 9
     */
    export interface CheckResult {
        /**
         * New version exist or not
         * @type {boolean}
         * @since 9
         */
        isExistNewVersion: boolean;

        /**
         * New version info
         * @type {NewVersionInfo}
         * @since 9
         */
        newVersionInfo: NewVersionInfo;
    }

    /**
     * Represents new version info.
     *
     * @since 9
     */
    export interface NewVersionInfo {
        /**
         * Digest info of new version
         * @type {VersionDigestInfo}
         * @since 9
         */
        versionDigestInfo: VersionDigestInfo;

        /**
         * New version component array
         * @type {Array<VersionComponent>}
         * @since 9
         */
        versionComponents: Array<VersionComponent>;
    }

    /**
     * Represents version digest info.
     *
     * @since 9
     */
    export interface VersionDigestInfo {
        /**
         * Version digest value
         * @type {string}
         * @since 9
         */
        versionDigest: string;
    }

    /**
     * Represents version component info.
     *
     * @since 9
     */
    export interface VersionComponent {
        /**
         * Version component id
         * @type {string}
         * @since 9
         */
        componentId: string;

        /**
         * Version component type
         * @type {ComponentType}
         * @since 9
         */
        componentType: ComponentType;

        /**
         * Upgrade action
         * @type {UpgradeAction}
         * @since 9
         */
        upgradeAction: UpgradeAction;

        /**
         * Display version number
         * @type {string}
         * @since 9
         */
        displayVersion: string;

        /**
         * Internal version number
         * @type {string}
         * @since 9
         */
        innerVersion: string;

        /**
         * Update package size
         * @type {number}
         * @since 9
         */
        size: number;

        /**
         * Effective mode
         * @type {EffectiveMode}
         * @since 9
         */
        effectiveMode: EffectiveMode;

        /**
         * Information about the version description file
         * @type {DescriptionInfo}
         * @since 9
         */
        descriptionInfo: DescriptionInfo;
    }

    /**
     * Represents description options.
     *
     * @since 9
     */
    export interface DescriptionOptions {
        /**
         * Format of the description file
         * @type {DescriptionFormat}
         * @since 9
         */
        format: DescriptionFormat;

        /**
         * Language of the description file
         * @type {string}
         * @since 9
         */
        language: string;
    }

    /**
     * Represents version component description.
     *
     * @since 9
     */
    export interface ComponentDescription {
        /**
         * Component id
         * @type {string}
         * @since 9
         */
        componentId: string;

        /**
         * Information about the description file
         * @type {DescriptionInfo}
         * @since 9
         */
        descriptionInfo: DescriptionInfo;
    }

    /**
     * Represents new version description information.
     *
     * @since 9
     */
    export interface DescriptionInfo {
        /**
         * Description content type
         * @type {DescriptionType}
         * @since 9
         */
        descriptionType: DescriptionType;

        /**
         * Content of the description file
         * @type {string}
         * @since 9
         */
        content: string;
    }

    /**
     * Represents current version info.
     *
     * @since 9
     */
    export interface CurrentVersionInfo {
        /**
         * System version number
         * @type {string}
         * @since 9
         */
        osVersion: string;

        /**
         * Device name
         * @type {string}
         * @since 9
         */
        deviceName: string;

        /**
         * Current version component array
         * @type {Array<VersionComponent>}
         * @since 9
         */
        versionComponents: Array<VersionComponent>;
    }

    /**
     * Represents download options.
     *
     * @since 9
     */
    export interface DownloadOptions {
        /**
         * Allow download with the network type
         * @type {NetType}
         * @since 9
         */
        allowNetwork: NetType;

        /**
         * Upgrade command
         * @type {Order}
         * @since 9
         */
        order: Order;
    }

    /**
     * Represents resume download options.
     *
     * @since 9
     */
    export interface ResumeDownloadOptions {
        /**
         * Allow download with the network type
         * @type {NetType}
         * @since 9
         */
        allowNetwork: NetType;
    }

    /**
     * Represents pause download options.
     *
     * @since 9
     */
    export interface PauseDownloadOptions {
        /**
         * Whether allow auto resume when net available
         * @type {boolean}
         * @since 9
         */
        isAllowAutoResume: boolean;
    }

    /**
     * Represents upgrade options.
     *
     * @since 9
     */
    export interface UpgradeOptions {
        /**
         * Upgrade command
         * @type {Order}
         * @since 9
         */
        order: Order;
    }

    /**
     * Represents clear error options.
     *
     * @since 9
     */
    export interface ClearOptions {
        /**
         * Clear status error
         * @type {UpgradeStatus}
         * @since 9
         */
        status: UpgradeStatus;
    }

    /**
     * Represents upgrade policy.
     *
     * @since 9
     */
    export interface UpgradePolicy {
        /**
         * Download strategy: open or close
         * @type {boolean}
         * @since 9
         */
        downloadStrategy: boolean;

        /**
         * Auto upgrade strategy: open or close
         * @type {boolean}
         * @since 9
         */
        autoUpgradeStrategy: boolean;

        /**
         * Auto upgrade period
         * @type {Array<UpgradePeriod>}
         * @since 9
         */
        autoUpgradePeriods: Array<UpgradePeriod>;
    }

    /**
     * Represents upgrade period.
     *
     * @since 9
     */
    export interface UpgradePeriod {
        /**
         * Start time of upgrade period
         * @type {number}
         * @since 9
         */
        start: number;

        /**
         * End time of upgrade period
         * @type {number}
         * @since 9
         */
        end: number;
    }

    /**
     * Represents task info.
     *
     * @since 9
     */
    export interface TaskInfo {
        /**
         * Whether upgrade task exist
         * @type {boolean}
         * @since 9
         */
        existTask: boolean;

        /**
         * Task body info
         * @type {TaskBody}
         * @since 9
         */
        taskBody: TaskBody;
    }

    /**
     * Represents event info.
     *
     * @since 9
     */
    export interface EventInfo {
        /**
         * Event id
         * @type {EventId}
         * @since 9
         */
        eventId: EventId;

        /**
         * Task body info
         * @type {TaskBody}
         * @since 9
         */
        taskBody: TaskBody;
    }

    /**
     * Represents task body info.
     *
     * @since 9
     */
    export interface TaskBody {
        /**
         * Digest info of new version
         * @type {VersionDigestInfo}
         * @since 9
         */
        versionDigestInfo: VersionDigestInfo;

        /**
         * Upgrade status
         * @type {UpgradeStatus}
         * @since 9
         */
        status: UpgradeStatus;

        /**
         * Upgrade sub status
         * @type {number}
         * @since 9
         */
        subStatus: number;

        /**
         * Upgrade progress
         * @type {number}
         * @since 9
         */
        progress: number;

        /**
         * Install mode
         * @type {number}
         * @since 9
         */
        installMode: number;

        /**
         * Error messages
         * @type {Array<ErrorMessage>}
         * @since 9
         */
        errorMessages: Array<ErrorMessage>;

        /**
         * Version component array
         * @type {Array<VersionComponent>}
         * @since 9
         */
        versionComponents: Array<VersionComponent>;
    }

    /**
     * Represents error message.
     *
     * @since 9
     */
    export interface ErrorMessage {
        /**
         * Error code
         * @type {number}
         * @since 9
         */
        errorCode: number;

        /**
         * Error message
         * @type {string}
         * @since 9
         */
        errorMessage: string;
    }

    /**
     * Represents event classify info.
     *
     * @since 9
     */
    export interface EventClassifyInfo {
        /**
         * Event classify
         * @type {EventClassify}
         * @since 9
         */
        eventClassify: EventClassify;

        /**
         * Additional information
         * @type {string}
         * @since 9
         */
        extraInfo: string;
    }

    /**
     * Represents upgrade file info.
     *
     * @since 9
     */
    export interface UpgradeFile {
        /**
         * Upgrade file type
         * @type {ComponentType}
         * @since 9
         */
        fileType: ComponentType;

        /**
         * Upgrade file path
         * @type {string}
         * @since 9
         */
        filePath: string;
    }

    /**
     * Called when upgrade task info changes.
     * You need to implement this method in a child class.
     *
     * @param eventInfo EventInfo: include eventId and taskBody info.
     * @since 9
     */
    export interface UpgradeTaskCallback {
        /**
         * Event callback.
         *
         * @param { EventInfo } eventInfo - Event information.
         * @since 9
         */
        (eventInfo: EventInfo): void;
    }

    /**
     * Enumerates business vendor type.
     *
     * @since 9
     */
    export enum BusinessVendor {
        /**
         * Device vendor is open source.
         * @since 9
         */
        PUBLIC = "public"
    }

    /**
     * Enumerates business sub type.
     *
     * @since 9
     */
    export enum BusinessSubType {
        /**
         * Business sub type is Firmware.
         * @since 9
         */
        FIRMWARE = 1
    }

    /**
     * Enumerates component type.
     *
     * @since 9
     */
    export enum ComponentType {
        /**
         * Component type is OTA.
         * @since 9
         */
        OTA = 1,
    }

    /**
     * Enumerates upgrade action type.
     *
     * @since 9
     */
    export enum UpgradeAction {
        /**
         * Differential package.
         * @since 9
         */
        UPGRADE = "upgrade",

        /**
         * Recovery package.
         * @since 9
         */
        RECOVERY = "recovery"
    }

    /**
     * Enumerates effective mode.
     *
     * @since 9
     */
    export enum EffectiveMode {
        /**
         * Cold update.
         * @since 9
         */
        COLD = 1,

        /**
         * Live update.
         * @since 9
         */
        LIVE = 2,

        /**
         * Hybrid live and cold update.
         * @since 9
         */
        LIVE_AND_COLD = 3
    }

    /**
     * Enumerates description type.
     *
     * @since 9
     */
    export enum DescriptionType {
        /**
         * Description type is content.
         * @since 9
         */
        CONTENT = 0,

        /**
         * Description type is link.
         * @since 9
         */
        URI = 1
    }

    /**
     * Enumerates description format.
     *
     * @since 9
     */
    export enum DescriptionFormat {
        /**
         * Description format is standard format.
         * @since 9
         */
        STANDARD = 0,

        /**
         * Description format is Simple format.
         * @since 9
         */
        SIMPLIFIED = 1
    }

    /**
     * Enumerates network type.
     *
     * @since 9
     */
    export enum NetType {
        /**
         * Network type is data network.
         * @since 9
         */
        CELLULAR = 1,

        /**
         * Network type is Wi-Fi hotspot.
         * @since 9
         */
        METERED_WIFI = 2,

        /**
         * Network type is non Wi-Fi hotspot.
         * @since 9
         */
        NOT_METERED_WIFI = 4,

        /**
         * Network type is Wi-Fi.
         * @since 9
         */
        WIFI = 6,

        /**
         * Network type is data network and Wi-Fi.
         * @since 9
         */
        CELLULAR_AND_WIFI = 7
    }

    /**
     * Enumerates upgrade order.
     *
     * @since 9
     */
    export enum Order {
        /**
         * Upgrade order is download.
         * @since 9
         */
        DOWNLOAD = 1,

        /**
         * Upgrade order is Install.
         * @since 9
         */
        INSTALL = 2,

        /**
         * Upgrade order is download and install.
         * @since 9
         */
        DOWNLOAD_AND_INSTALL = 3,

        /**
         * Upgrade order is apply.
         * @since 9
         */
        APPLY = 4,

        /**
         * Upgrade order is install and apply.
         * @since 9
         */
        INSTALL_AND_APPLY = 6
    }

    /**
     * Enumerates upgrade status.
     *
     * @since 9
     */
    export enum UpgradeStatus {
        /**
         * Upgrade status is waiting for download.
         * @since 9
         */
        WAITING_DOWNLOAD = 20,

        /**
         * Upgrade status is downloading.
         * @since 9
         */
        DOWNLOADING = 21,

        /**
         * Upgrade status is download paused.
         * @since 9
         */
        DOWNLOAD_PAUSED = 22,

        /**
         * Upgrade status is download failed.
         * @since 9
         */
        DOWNLOAD_FAIL = 23,

        /**
         * Upgrade status is waiting for installation.
         * @since 9
         */
        WAITING_INSTALL = 30,

        /**
         * Upgrade status is upgrading.
         * @since 9
         */
        UPDATING = 31,

        /**
         * Upgrade status is waiting for applying the update.
         * @since 9
         */
        WAITING_APPLY = 40,

        /**
         * Upgrade status is applying the update.
         * @since 9
         */
        APPLYING = 41,

        /**
         * Upgrade status is update succeeded.
         * @since 9
         */
        UPGRADE_SUCCESS = 50,

        /**
         * Upgrade status is update failed.
         * @since 9
         */
        UPGRADE_FAIL = 51
    }

    /**
     * Enumerates event classify.
     *
     * @since 9
     */
    export enum EventClassify {
        /**
         * Event classify is task event.
         * @since 9
         */
        TASK = 0x01000000
    }

    /**
     * Enumerates event id.
     *
     * @since 9
     */
    export enum EventId {
        /**
         * Event id is task event.
         * @since 9
         */
        EVENT_TASK_BASE = EventClassify.TASK,

        /**
         * Event id is task received.
         * @since 9
         */
        EVENT_TASK_RECEIVE,

        /**
         * Event id is task cancelled.
         * @since 9
         */
        EVENT_TASK_CANCEL,

        /**
         * Event id is waiting for download.
         * @since 9
         */
        EVENT_DOWNLOAD_WAIT,

        /**
         * Event id is download started.
         * @since 9
         */
        EVENT_DOWNLOAD_START,

        /**
         * Event id is download progress update.
         * @since 9
         */
        EVENT_DOWNLOAD_UPDATE,

        /**
         * Event id is download paused.
         * @since 9
         */
        EVENT_DOWNLOAD_PAUSE,

        /**
         * Event id is download resumed.
         * @since 9
         */
        EVENT_DOWNLOAD_RESUME,

        /**
         * Event id is download succeeded.
         * @since 9
         */
        EVENT_DOWNLOAD_SUCCESS,

        /**
         * Event id is download failed.
         * @since 9
         */
        EVENT_DOWNLOAD_FAIL,

        /**
         * Event id is waiting for update.
         * @since 9
         */
        EVENT_UPGRADE_WAIT,

        /**
         * Event id is update started.
         * @since 9
         */
        EVENT_UPGRADE_START,

        /**
         * Event id is update in progress.
         * @since 9
         */
        EVENT_UPGRADE_UPDATE,

        /**
         * Event id is waiting for applying the update.
         * @since 9
         */
        EVENT_APPLY_WAIT,

        /**
         * Event id is applying the update.
         * @since 9
         */
        EVENT_APPLY_START,

        /**
         * Event id is update succeeded.
         * @since 9
         */
        EVENT_UPGRADE_SUCCESS,

        /**
         * Event id is update failed.
         * @since 9
         */
        EVENT_UPGRADE_FAIL
    }
}

export default update;