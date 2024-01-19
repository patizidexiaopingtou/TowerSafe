/*
* Copyright (C) 2022 Huawei Device Co., Ltd.
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

import {AsyncCallback, Callback} from "./basic";

/**
 * Provides volumemanager statistics APIs
 *
 * @since 9
 * @syscap SystemCapability.FileManagement.StorageService.Volume
 * @systemapi
 */
declare namespace volumeManager {

/**
   * Get All Volumes
   * 
   * @since 9
   * @syscap SystemCapability.FileManagement.StorageService.Volume
   * @systemapi
   */
 export interface Volume {
   /**
     * Volume ID.
     * @since 9
     * @syscap SystemCapability.FileManagement.StorageService.Volume
     * @systemapi
     */
   id: string;

   /**
     * Universally unique identifier of volume.
     * @since 9
     * @syscap SystemCapability.FileManagement.StorageService.Volume
     * @systemapi
     */
   uuid: string;

   /**
     * The ID of disk that volume belongs to.
     * @since 9
     * @syscap SystemCapability.FileManagement.StorageService.Volume
     * @systemapi
     */
   diskId: string;

   /**
     * The label of the volume.
     * @since 9
     * @syscap SystemCapability.FileManagement.StorageService.Volume
     * @systemapi
     */
   description: string;

   /**
     * The volume is removable or not.
     * @since 9
     * @syscap SystemCapability.FileManagement.StorageService.Volume
     * @systemapi
     */
   removable: boolean;

   /**
     * The mount state of the volume.
     * @since 9
     * @syscap SystemCapability.FileManagement.StorageService.Volume
     * @systemapi
     */
   state: number;

   /**
     * The mount path of the volume.
     * @since 9
     * @syscap SystemCapability.FileManagement.StorageService.Volume
     */
   path: string;
}
/**
   * Get All Volumes
   * 
   * @since 9
   * @returns Returns the information of all volumes
   * @syscap SystemCapability.FileManagement.StorageService.Volume
   * @permission ohos.permission.STORAGE_MANAGER
   * @throws { BusinessError } 201 - Permission verification failed.
   * @throws { BusinessError } 202 - The caller is not a system application.
   * @throws { BusinessError } 401 - The input parameter is invalid.
   * @throws { BusinessError } 13600001 - IPC error.
   * @throws { BusinessError } 13900032 - Unknown error.
   * @systemapi
   */
function getAllVolumes(callback: AsyncCallback<Array<Volume>>): void;
function getAllVolumes(): Promise<Array<Volume>>;


 /**
   * Mount
   * 
   * @since 9
   * @param volumeId the id of the volume
   * @syscap SystemCapability.FileManagement.StorageService.Volume
   * @permission ohos.permission.MOUNT_UNMOUNT_MANAGER
   * @throws { BusinessError } 201 - Permission verification failed.
   * @throws { BusinessError } 202 - The caller is not a system application.
   * @throws { BusinessError } 401 - The input parameter is invalid.
   * @throws { BusinessError } 13600001 - IPC error.
   * @throws { BusinessError } 13600002 - Not supported filesystem.
   * @throws { BusinessError } 13600003 - Failed to mount.
   * @throws { BusinessError } 13600005 - Incorrect volume state.
   * @throws { BusinessError } 13600008 - No such object.
   * @throws { BusinessError } 13900032 - Unknown error.
   * @systemapi
   */
function mount(volumeId: string, callback: AsyncCallback<void>): void;
function mount(volumeId: string): Promise<void>;

/**
   * UnMount
   * 
   * @since 9
   * @param volumeId the id of the volume
   * @syscap SystemCapability.FileManagement.StorageService.Volume
   * @permission ohos.permission.MOUNT_UNMOUNT_MANAGER
   * @throws { BusinessError } 201 - Permission verification failed.
   * @throws { BusinessError } 202 - The caller is not a system application.
   * @throws { BusinessError } 401 - The input parameter is invalid.
   * @throws { BusinessError } 13600001 - IPC error.
   * @throws { BusinessError } 13600002 - Not supported filesystem.
   * @throws { BusinessError } 13600004 - Failed to unmount.
   * @throws { BusinessError } 13600005 - Incorrect volume state.
   * @throws { BusinessError } 13600008 - No such object.
   * @throws { BusinessError } 13900032 - Unknown error.
   * @systemapi
   */
function unmount(volumeId: string, callback: AsyncCallback<void>): void;
function unmount(volumeId: string): Promise<void>;

/**
   * Get the volume by uuid.
   * 
   * @since 9
   * @param uuid the uuid of volume 
   * @syscap SystemCapability.FileManagement.StorageService.Volume
   * @permission ohos.permission.STORAGE_MANAGER
   * @throws { BusinessError } 201 - Permission verification failed.
   * @throws { BusinessError } 202 - The caller is not a system application.
   * @throws { BusinessError } 401 - The input parameter is invalid.
   * @throws { BusinessError } 13600001 - IPC error.
   * @throws { BusinessError } 13600008 - No such object.
   * @throws { BusinessError } 13900032 - Unknown error.
   * @systemapi
   */
function getVolumeByUuid(uuid: string, callback: AsyncCallback<Volume>): void;
function getVolumeByUuid(uuid: string): Promise<Volume>;

/**
   * Get the volume by id.
   * 
   * @since 9
   * @param volumeId the id of volume
   * @syscap SystemCapability.FileManagement.StorageService.Volume
   * @permission ohos.permission.STORAGE_MANAGER
   * @throws { BusinessError } 201 - Permission verification failed.
   * @throws { BusinessError } 202 - The caller is not a system application.
   * @throws { BusinessError } 401 - The input parameter is invalid.
   * @throws { BusinessError } 13600001 - IPC error.
   * @throws { BusinessError } 13600008 - No such object.
   * @throws { BusinessError } 13900032 - Unknown error.
   * @systemapi
   */
function getVolumeById(volumeId: string, callback: AsyncCallback<Volume>): void;
function getVolumeById(volumeId: string): Promise<Volume>;

/**
   * Set the description of volume.
   * 
   * @since 9
   * @param uuid the uuid of volume
   * @param description new description of volume
   * @syscap SystemCapability.FileManagement.StorageService.Volume
   * @permission ohos.permission.MOUNT_UNMOUNT_MANAGER
   * @throws { BusinessError } 201 - Permission verification failed.
   * @throws { BusinessError } 202 - The caller is not a system application.
   * @throws { BusinessError } 401 - The input parameter is invalid.
   * @throws { BusinessError } 13600001 - IPC error.
   * @throws { BusinessError } 13600002 - Not supported filesystem.
   * @throws { BusinessError } 13600005 - Incorrect volume state.
   * @throws { BusinessError } 13600008 - No such object.
   * @throws { BusinessError } 13900032 - Unknown error.
   * @systemapi
   */
function setVolumeDescription(uuid: string, description: string, callback: AsyncCallback<void>): void;
function setVolumeDescription(uuid: string, description: string): Promise<void>;

/**
   * Format.
   * 
   * @since 9
   * @param volumeId the id of the volume
   * @param fsType the file system type after formatting
   * @syscap SystemCapability.FileManagement.StorageService.Volume
   * @permission ohos.permission.MOUNT_FORMAT_MANAGER
   * @throws { BusinessError } 201 - Permission verification failed.
   * @throws { BusinessError } 202 - The caller is not a system application.
   * @throws { BusinessError } 401 - The input parameter is invalid.
   * @throws { BusinessError } 13600001 - IPC error.
   * @throws { BusinessError } 13600002 - Not supported filesystem.
   * @throws { BusinessError } 13600005 - Incorrect volume state.
   * @throws { BusinessError } 13600008 - No such object.
   * @throws { BusinessError } 13900032 - Unknown error.
   * @systemapi
   */
function format(volumeId: string, fsType: string, callback: AsyncCallback<void>): void;
function format(volumeId: string, fsType: string): Promise<void>;
  
 
/**
   * Partition.
   * 
   * @since 9
   * @param diskId the id of the disk
   * @param type of partition such as private partition or public partition
   * @syscap SystemCapability.FileManagement.StorageService.Volume
   * @permission ohos.permission.MOUNT_FORMAT_MANAGER
   * @throws { BusinessError } 201 - Permission verification failed.
   * @throws { BusinessError } 202 - The caller is not a system application.
   * @throws { BusinessError } 401 - The input parameter is invalid.
   * @throws { BusinessError } 13600001 - IPC error.
   * @throws { BusinessError } 13600008 - No such object.
   * @throws { BusinessError } 13900032 - Unknown error.
   * @systemapi
   */
function partition(diskId: string, type: number, callback: AsyncCallback<void>): void;
function partition(diskId: string, type: number): Promise<void>;
}

export default volumeManager;
