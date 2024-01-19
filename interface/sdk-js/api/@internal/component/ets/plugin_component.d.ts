/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
 * PluginComponentTemplate
 * @since 9
 * @systemapi
 */
interface PluginComponentTemplate {
  /**
   * Defines the plugin source name.
   * @since 9
   * @systemapi
   */
  source: string;
  /**
   * Defines the bundle name of the Template.
   * @since 9
   * @systemapi
   */
  bundleName: string;
}

/**
 * Provides plugin component.
 * @since 9
 * @systemapi
 */
interface PluginComponentInterface {
  /**
   * Called when setting the plugin.
   * @since 9
   * @systemapi
   */
  (value: { template: PluginComponentTemplate; data: any }): PluginComponentAttribute;
}

/**
 * Defines the plugin component attribute functions.
 * @since 9
 * @systemapi
 */
declare class PluginComponentAttribute extends CommonMethod<PluginComponentAttribute> {
  /**
   * pluginComponent onComplete callback,
   * @since 9
   * @systemapi
   */
  onComplete(callback: () => void): PluginComponentAttribute;

  /**
   * pluginComponent onError callback,
   * @since 9
   * @systemapi
   */
  onError(callback: (info: { errcode: number; msg: string }) => void): PluginComponentAttribute;
}

/**
 * Defines PluginComponent Component.
 * @since 9
 * @systemapi
 */
declare const PluginComponent: PluginComponentInterface;

/**
 * Defines PluginComponent Component instance.
 * @since 9
 * @systemapi
 */
declare const PluginComponentInstance: PluginComponentAttribute;
