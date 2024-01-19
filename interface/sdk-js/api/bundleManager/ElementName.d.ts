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

/**
 * Contains basic Ability information, which uniquely identifies an ability.
 * You can use this class to obtain values of the fields set in an element,
 * such as the device ID, bundle name, and ability name.
 * @typedef ElementName
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @since 9
 */
export interface ElementName {
  /**
   * Indicates device id
   * @type {?string}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  deviceId?: string;

  /**
   * @default Indicates bundle name
   * @type {string}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  bundleName: string;

  /**
  * @default Indicates module name
  * @type {?string}
  * @syscap SystemCapability.BundleManager.BundleFramework.Core
  * @since 9
  */
  moduleName?: string;

  /**
   * Indicates ability name
   * @type {string}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  abilityName: string;

  /**
   * Indicates uri
   * @type {?string}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  uri?: string;

  /**
   * Indicates short name
   * @type {?string}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  shortName?: string;
}
