/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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

import { Metadata } from './Metadata';
import { Resource } from '../global/resource';
import bundleManager from './../@ohos.bundle.bundleManager';

/**
 * Obtains configuration information about an application
 * @typedef ApplicationInfo
 * @syscap SystemCapability.BundleManager.BundleFramework.Core
 * @since 9
 */
export interface ApplicationInfo {
  /**
   * Indicates the application name, which is the same as {@code bundleName}
   * @type {string}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly name: string;

  /**
   * Description of application
   * @type {string}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly description: string;

  /**
   * Indicates the description id of the application
   * @type {number}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly descriptionId: number;

  /**
   * Indicates whether or not this application may be instantiated
   * @type {boolean}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly enabled: boolean;

  /**
   * Indicates the label of the application
   * @type {string}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly label: string;

  /**
   * Indicates the label id of the application
   * @type {number}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly labelId: number;

  /**
   * Indicates the icon of the application
   * @type {string}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly icon: string;

  /**
   * Indicates the icon id of the application
   * @type {number}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly iconId: number;

  /**
   * Process of application, if user do not set it ,the value equal bundleName
   * @type {string}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly process: string;

  /**
   * Indicates the permissions required for accessing the application.
   * @type {Array<string>}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly permissions: Array<string>;

  /**
   * Indicates the application source code path
   * @type {string}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly codePath: string;

  /**
   * Indicates the metadata of module
   * @type {Map<string, Array<Metadata>>}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly metadata: Map<string, Array<Metadata>>;

  /**
   * Indicates whether or not this application may be removable
   * @type {boolean}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly removable: boolean;

  /**
   * Indicates the access token of the application
   * @type {number}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly accessTokenId: number;

  /**
   * Indicates the uid of the application
   * @type {number}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly uid: number;

  /**
   * Indicates icon resource of the application
   * @type {Resource}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly iconResource: Resource;

  /**
   * Indicates label resource of the application
   * @type {Resource}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
    readonly labelResource: Resource;

  /**
   * Indicates description resource of the application
   * @type {Resource}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly descriptionResource: Resource;

  /**
   * Indicates the appDistributionType of the application
   * @type {string}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly appDistributionType: string;

  /**
   * Indicates the appProvisionType of the application
   * @type {string}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly appProvisionType: string;

  /**
   * Indicates whether the application is a system application
   * @type {boolean}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
   readonly systemApp: boolean;

  /**
   * Indicates the type of application is APP or atomicService.
   * @type {bundleManager.BundleType}
   * @syscap SystemCapability.BundleManager.BundleFramework.Core
   * @since 9
   */
  readonly bundleType: bundleManager.BundleType;
}
