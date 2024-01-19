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
  * Indicates the Metadata
  * @typedef Metadata
  * @syscap SystemCapability.BundleManager.BundleFramework.Core
  * @since 9
  */
  export interface Metadata {
    /**
     * Indicates the metadata name
     * @type {string}
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    name: string;

    /**
     * Indicates the metadata value
     * @type {string}
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    value: string;

    /**
     * Indicates the metadata resource
     * @type {string}
     * @syscap SystemCapability.BundleManager.BundleFramework.Core
     * @since 9
     */
    resource: string;
  }