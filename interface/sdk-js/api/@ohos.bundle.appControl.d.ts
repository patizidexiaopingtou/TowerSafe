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
import Want from './@ohos.app.ability.Want';

/**
 * Used for application interception control
 * @namespace appControl
 * @syscap SystemCapability.BundleManager.BundleFramework.AppControl
 * @systemapi
 * @since 9
 */
declare namespace appControl {
  /**
   * Set the disposed status of a specified bundle.
   * @permission ohos.permission.MANAGE_DISPOSED_APP_STATUS
   * @param { string } appId - Indicates the app ID of the application.
   * @param { Want } disposedWant - Indicates the disposed want.
   * @param { AsyncCallback } callback - The callback of setting the disposed status result.
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 202 - Permission denied, non-system app called system api.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 17700005 - The specified app ID is empty string.
   * @syscap SystemCapability.BundleManager.BundleFramework.AppControl
   * @systemapi
   * @since 9
   */
  function setDisposedStatus(appId: string, disposedWant: Want, callback: AsyncCallback<void>): void;

  /**
   * Set the disposed status of a specified bundle.
   * @permission ohos.permission.MANAGE_DISPOSED_APP_STATUS
   * @param { string } appId - Indicates the app ID of the application.
   * @param { Want } disposedWant - Indicates the disposed want.
   * @returns { Promise<void> } The result of setting the disposed status of a specified bundle.
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 202 - Permission denied, non-system app called system api.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 17700005 - The specified app ID is empty string.
   * @syscap SystemCapability.BundleManager.BundleFramework.AppControl
   * @systemapi
   * @since 9
   */
  function setDisposedStatus(appId: string, disposedWant: Want): Promise<void>;

  /**
   * Obtains the disposed status of a specified bundle.
   * @permission ohos.permission.MANAGE_DISPOSED_APP_STATUS
   * @param { string } appId - Indicates the app ID of the application.
   * @param { AsyncCallback<Want> } callback - The callback of getting the disposed status of a specified bundle result.
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 202 - Permission denied, non-system app called system api.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 17700005 - The specified app ID is empty string.
   * @syscap SystemCapability.BundleManager.BundleFramework.AppControl
   * @systemapi
   * @since 9
   */
  function getDisposedStatus(appId: string, callback: AsyncCallback<Want>): void;

  /**
   * Obtains the disposed status of a specified bundle.
   * @permission ohos.permission.MANAGE_DISPOSED_APP_STATUS
   * @param { string } appId - Indicates the app ID of the application.
   * @returns { Promise<Want> } Returns the disposed status of a specified bundle.
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 202 - Permission denied, non-system app called system api.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 17700005 - The specified app ID is empty string.
   * @syscap SystemCapability.BundleManager.BundleFramework.AppControl
   * @systemapi
   * @since 9
   */
  function getDisposedStatus(appId: string): Promise<Want>;

  /**
   * Delete the disposed status of a specified bundle.
   * @permission ohos.permission.MANAGE_DISPOSED_APP_STATUS
   * @param { string } appId - Indicates the app ID of the application.
   * @param { AsyncCallback<void> } callback - the callback of deleting the disposed status of a specified bundle result.
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 202 - Permission denied, non-system app called system api.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 17700005 - The specified app ID is empty string.
   * @syscap SystemCapability.BundleManager.BundleFramework.AppControl
   * @systemapi
   * @since 9
   */
  function deleteDisposedStatus(appId: string, callback: AsyncCallback<void>): void;

  /**
   * Delete the disposed status of a specified bundle.
   * @permission ohos.permission.MANAGE_DISPOSED_APP_STATUS
   * @param { string } appId - Indicates the app ID of the application.
   * @returns { Promise<void> } Returns the result of deleting the disposed status of a specified bundle.
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 202 - Permission denied, non-system app called system api.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 17700005 - The specified app ID is empty string.
   * @syscap SystemCapability.BundleManager.BundleFramework.AppControl
   * @systemapi
   * @since 9
   */
  function deleteDisposedStatus(appId: string): Promise<void>;
}

export default appControl;
