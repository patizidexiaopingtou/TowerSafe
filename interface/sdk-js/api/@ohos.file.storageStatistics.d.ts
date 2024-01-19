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
 * Provides filesystem statistics APIs
 *
 * @since 8
 * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
 */
declare namespace storageStatistics {
  /**
   * Get the totalSize of volume.
   *
   * @since 8
   * @param volumeUuid the uuid of the volume
   * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
   * @permission ohos.permission.STORAGE_MANAGER
   * @throws { BusinessError } 201 - Permission verification failed.
   * @throws { BusinessError } 202 - The caller is not a system application.
   * @throws { BusinessError } 401 - The input parameter is invalid.
   * @throws { BusinessError } 13600001 - IPC error.
   * @throws { BusinessError } 13600008 - No such object.
   * @throws { BusinessError } 13900032 - Unknown error.
   * @systemapi
   */
  function getTotalSizeOfVolume(volumeUuid: string, callback: AsyncCallback<number>): void;
  function getTotalSizeOfVolume(volumeUuid: string): Promise<number>;
  /**
   * Get the free size Of volume.
   * 
   * @since 8
   * @param volumeUuid the uuid of the volume
   * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
   * @permission ohos.permission.STORAGE_MANAGER
   * @throws { BusinessError } 201 - Permission verification failed.
   * @throws { BusinessError } 202 - The caller is not a system application.
   * @throws { BusinessError } 401 - The input parameter is invalid.
   * @throws { BusinessError } 13600001 - IPC error.
   * @throws { BusinessError } 13600008 - No such object.
   * @throws { BusinessError } 13900032 - Unknown error.
   * @systemapi
   */
  function getFreeSizeOfVolume(volumeUuid: string, callback: AsyncCallback<number>): void;
  function getFreeSizeOfVolume(volumeUuid: string): Promise<number>;

  /**
   * Get the bundlestat 
   * 
   * @since 9
   * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
   */

  export interface BundleStats {
    /**
     * The size of application installation data.
     * @since 9
     * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
     */
    appSize: number;

    /**
     * The size of application cache data.
     * @since 9
     * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
     */
    cacheSize: number;

    /**
     * The size of application local data, distributed data and database data.
     * @since 9
     * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
     */
    dataSize: number;
  }
  /**
   * Get the bundlestat 
   * 
   * @since 9
   * @param packageName the name of the application
   * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
   * @permission ohos.permission.STORAGE_MANAGER
   * @throws { BusinessError } 201 - Permission verification failed.
   * @throws { BusinessError } 202 - The caller is not a system application.
   * @throws { BusinessError } 401 - The input parameter is invalid.
   * @throws { BusinessError } 13600001 - IPC error.
   * @throws { BusinessError } 13600008 - No such object.
   * @throws { BusinessError } 13900032 - Unknown error.
   * @systemapi
   */
  function getBundleStats(packageName: string,  callback: AsyncCallback<BundleStats>): void;
  function getBundleStats(packageName: string): Promise<BundleStats>;

  /**
   * Get the Current BundleStats
   * 
   * @since 9
   * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
   * @throws { BusinessError } 401 - The input parameter is invalid.
   * @throws { BusinessError } 13600001 - IPC error.
   * @throws { BusinessError } 13900032 - Unknown error.
   */
  function getCurrentBundleStats(callback: AsyncCallback<BundleStats>): void;
  function getCurrentBundleStats(): Promise<BundleStats>;

  /**
   * Get the systemsize
   * 
   * @since 9
   * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
   * @permission ohos.permission.STORAGE_MANAGER
   * @throws { BusinessError } 201 - Permission verification failed.
   * @throws { BusinessError } 202 - The caller is not a system application.
   * @throws { BusinessError } 401 - The input parameter is invalid.
   * @throws { BusinessError } 13600001 - IPC error.
   * @throws { BusinessError } 13900032 - Unknown error.
   * @systemapi
   */
  function getSystemSize(callback: AsyncCallback<number>): void;
  function getSystemSize(): Promise<number>;

  /**
   * Get the UserStorageStats
   * 
   * @since 9
   * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
   * @systemapi
   */
  export interface StorageStats {
    /**
     * The total size of device.
     * @since 9
     * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
     * @systemapi
     */
    total: number;

    /**
     * The size of audio file.
     * @since 9
     * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
     * @systemapi
     */
    audio: number;

    /**
     * The size of video file.
     * @since 9
     * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
     * @systemapi
     */
    video: number;

    /**
     * The size of image file.
     * @since 9
     * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
     * @systemapi
     */
    image: number;

    /**
     * The size of other file.
     * @since 9
     * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
     * @systemapi
     */
    file: number;

    /**
     * The size of application.
     * @since 9
     * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
     * @systemapi
     */
    app: number;
  }

  /**
   * Get the UserStorageStats
   * 
   * @since 9
   * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
   * @permission ohos.permission.STORAGE_MANAGER
   * @throws { BusinessError } 201 - Permission verification failed.
   * @throws { BusinessError } 202 - The caller is not a system application.
   * @throws { BusinessError } 401 - The input parameter is invalid.
   * @throws { BusinessError } 13600001 - IPC error.
   * @throws { BusinessError } 13900032 - Unknown error.
   * @systemapi
   */
  function getUserStorageStats(): Promise<StorageStats>;
  function getUserStorageStats(callback: AsyncCallback<StorageStats>): void;

  /**
   * Get the UserStorageStats
   * 
   * @since 9
   * @param userId the id of the user
   * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
   * @permission ohos.permission.STORAGE_MANAGER
   * @throws { BusinessError } 201 - Permission verification failed.
   * @throws { BusinessError } 202 - The caller is not a system application.
   * @throws { BusinessError } 401 - The input parameter is invalid.
   * @throws { BusinessError } 13600001 - IPC error.
   * @throws { BusinessError } 13600009 - User if out of range.
   * @throws { BusinessError } 13900032 - Unknown error.
   * @systemapi
   */
   function getUserStorageStats(userId: number): Promise<StorageStats>;
   function getUserStorageStats(userId: number, callback: AsyncCallback<StorageStats>): void;

  /**
   * Get the totalsize
   * 
   * @since 9
   * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
   * @permission ohos.permission.STORAGE_MANAGER
   * @throws { BusinessError } 201 - Permission verification failed.
   * @throws { BusinessError } 202 - The caller is not a system application.
   * @throws { BusinessError } 401 - The input parameter is invalid.
   * @throws { BusinessError } 13600001 - IPC error.
   * @throws { BusinessError } 13900032 - Unknown error.
   * @systemapi
   */
  function getTotalSize(callback: AsyncCallback<number>): void;
  function getTotalSize(): Promise<number>;

  /**
   * Get the freesize
   * 
   * @since 9
   * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
   * @permission ohos.permission.STORAGE_MANAGER
   * @throws { BusinessError } 201 - Permission verification failed.
   * @throws { BusinessError } 202 - The caller is not a system application.
   * @throws { BusinessError } 401 - The input parameter is invalid.
   * @throws { BusinessError } 13600001 - IPC error.
   * @throws { BusinessError } 13900032 - Unknown error.
   * @systemapi
   */
  function getFreeSize(callback: AsyncCallback<number>): void;
  function getFreeSize(): Promise<number>;
}

export default storageStatistics;
