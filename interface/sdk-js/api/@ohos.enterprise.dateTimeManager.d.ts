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

import { AsyncCallback } from "./basic";
import Want from "./@ohos.app.ability.Want";

/**
 * This module provides the capability to manage the datetime of the enterprise devices.
 * @namespace dateTimeManager.
 * @syscap SystemCapability.Customization.EnterpriseDeviceManager
 * @systemapi
 * @since 9
 */
declare namespace dateTimeManager {

  /**
   * Sets the system time.
   * This function can be called by a super administrator.
   * @permission ohos.permission.ENTERPRISE_SET_DATETIME
   * @param { Want } admin - admin indicates the administrator ability information.
   * @param { number } time - time indicates the target time stamp (ms).
   * @param { AsyncCallback<void> } callback - the callback of setDateTime.
   * @throws { BusinessError } 9200001 - the application is not an administrator of the device.
   * @throws { BusinessError } 9200002 - the administrator application does not have permission to manage the device.
   * @throws { BusinessError } 201 - the application does not have permission to call this function.
   * @throws { BusinessError } 401 - invalid input parameter.
   * @syscap SystemCapability.Customization.EnterpriseDeviceManager
   * @systemapi
   * @StageModelOnly
   * @since 9
   */
  function setDateTime(admin: Want, time: number, callback: AsyncCallback<void>): void;

  /**
   * Sets the system time.
   * This function can be called by a super administrator.
   * @permission ohos.permission.ENTERPRISE_SET_DATETIME
   * @param { Want } admin - admin indicates the administrator ability information.
   * @param { number } time - time indicates the target time stamp (ms).
   * @returns { Promise<void> } the promise returned by the setDateTime.
   * @throws { BusinessError } 9200001 - the application is not an administrator of the device.
   * @throws { BusinessError } 9200002 - the administrator application does not have permission to manage the device.
   * @throws { BusinessError } 201 - the application does not have permission to call this function.
   * @throws { BusinessError } 401 - invalid input parameter.
   * @syscap SystemCapability.Customization.EnterpriseDeviceManager
   * @systemapi
   * @StageModelOnly
   * @since 9
   */
  function setDateTime(admin: Want, time: number): Promise<void>;
}

export default dateTimeManager;