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

 /**
  * @name  Provides methods for obtaining information about the ability that a shortcut will start, including the target
  *        bundle name, target module name and ability class name.
  * @since 7
  * @syscap SystemCapability.BundleManager.BundleFramework
  * @systemapi Hide this for inner system use
  * @deprecated since 9
  * @useinstead ohos.bundle.launcherBundleManager.ShortcutWant
  */
  export interface ShortcutWant{
    /**
      * @since 7
      * @syscap SystemCapability.BundleManager.BundleFramework
      */
    readonly targetBundle: string;
    /**
      * @since 7
      * @syscap SystemCapability.BundleManager.BundleFramework
      */
    readonly targetClass: string;
  }

   /**
    * @name  Provides information about a shortcut, including the shortcut ID and label.
    * @since 7
    * @syscap SystemCapability.BundleManager.BundleFramework
    * @deprecated since 9
    * @useinstead ohos.bundle.launcherBundleManager.ShortcutInfo
    */
  export interface ShortcutInfo {
    /**
      * @since 7
      * @syscap SystemCapability.BundleManager.BundleFramework
      *
      */
    readonly id: string;
    /**
      * @since 7
      * @syscap SystemCapability.BundleManager.BundleFramework
      */
    readonly bundleName: string;
    /**
      * @since 7
      * @syscap SystemCapability.BundleManager.BundleFramework
      */
    readonly hostAbility: string;
    /**
      * @since 7
      * @syscap SystemCapability.BundleManager.BundleFramework
      */
    readonly icon: string;
     /**
      * @since 8
      * @syscap SystemCapability.BundleManager.BundleFramework
      */
     readonly iconId: number;
    /**
      * @since 7
      * @syscap SystemCapability.BundleManager.BundleFramework
      */
    readonly label: string;
     /**
      * @since 8
      * @syscap SystemCapability.BundleManager.BundleFramework
      */
     readonly labelId: number;
    /**
      * @since 7
      * @syscap SystemCapability.BundleManager.BundleFramework
      */
    readonly disableMessage: string;
    /**
      * @since 7
      * @syscap SystemCapability.BundleManager.BundleFramework
      */
    readonly wants: Array<ShortcutWant>;
    /**
      * @default false
      * @since 7
      * @syscap SystemCapability.BundleManager.BundleFramework
      */
    readonly isStatic?: boolean
    /**
      * @default false
      * @since 7
      * @syscap SystemCapability.BundleManager.BundleFramework
      */
    readonly isHomeShortcut?: boolean;
    /**
      * @default false
      * @since 7
      * @syscap SystemCapability.BundleManager.BundleFramework
      */
    readonly isEnabled?: boolean;
  }