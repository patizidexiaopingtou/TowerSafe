/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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

import accessibility from './@ohos.accessibility';
import { AsyncCallback, Callback } from './basic';

/**
 * Configuration of the accessibility.
 *
 * @since 9
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @systemapi
 */
declare namespace config {
  /**
   * Indicates the configuration of high-contrast text.
   */
  var highContrastText: Config<boolean>;
  /**
   * Indicates the configuration of invert color.
   */
  var invertColor: Config<boolean>;
  /**
   * Indicates the configuration of daltonization color filter.
   */
  var daltonizationColorFilter: Config<DaltonizationColorFilter>;
  /**
   * Indicates the configuration of content timeout.
   */
  var contentTimeout: Config<number>;
  /**
   * Indicates the configuration of animation state.
   */
  var animationOff: Config<boolean>;
  /**
   * Indicates the configuration of brightness discount.
   */
  var brightnessDiscount: Config<number>;
  /**
   * Indicates the configuration of mouse key state.
   */
  var mouseKey: Config<boolean>;
  /**
   * Indicates the configuration of mouse auto click.
   */
  var mouseAutoClick: Config<number>;
  /**
   * Indicates the configuration of short key state.
   */
  var shortkey: Config<boolean>;
  /**
   * Indicates the configuration of short key target.
   */
  var shortkeyTarget: Config<string>;
  /**
   * Indicates the configuration of captions state.
   */
  var captions: Config<boolean>;
  /**
   * Indicates the configuration of captions style.
   */
  var captionsStyle: Config<accessibility.CaptionsStyle>;

  /**
   * Enable the accessibility extension ability.
   * @param name Indicates the accessibility extension name, in "bundleName/abilityName" format.
   * @param capability Indicates the ability.
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 401 - Input parameter error.
   * @throws { BusinessError } 9300001 - Invalid bundle name or ability name.
   * @throws { BusinessError } 9300002 - Target ability already enabled.
   */
  function enableAbility(name: string, capability: Array<accessibility.Capability>): Promise<void>;
  function enableAbility(name: string, capability: Array<accessibility.Capability>, callback: AsyncCallback<void>): void;

  /**
   * Disable the accessibility extension ability.
   * @param name Indicates the accessibility extension name, in "bundleName/abilityName" format.
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 401 - Input parameter error.
   * @throws { BusinessError } 9300001 - Invalid bundle name or ability name.
   */
  function disableAbility(name: string): Promise<void>;
  function disableAbility(name: string, callback: AsyncCallback<void>): void;

  /**
   * Register the listener that watches for changes in the enabled status of accessibility extensions.
   * @param type Indicates the type of event.
   * @param callback Indicates the listener.
   * @throws { BusinessError } 401 - Input parameter error.
   */
  function on(type: 'enabledAccessibilityExtensionListChange', callback: Callback<void>): void;

  /**
   * Unregister listener that watches for changes in the enabled status of accessibility extensions.
   * @param type Indicates the type of event.
   * @param callback Indicates the listener.
   * @throws { BusinessError } 401 - Input parameter error.
   */
  function off(type: 'enabledAccessibilityExtensionListChange', callback?: Callback<void>): void;

  /**
   * Indicates setting, getting, and listening to changes in configuration.
   */
  interface Config<T> {
    /**
     * Setting configuration value.
     * @param value Indicates the value.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Input parameter error.
     */
    set(value: T): Promise<void>;
    set(value: T, callback: AsyncCallback<void>): void;

    /**
     * Getting configuration value.
     */
    get(): Promise<T>;
    get(callback: AsyncCallback<T>): void;

    /**
     * Register the listener to listen for configuration changes.
     * @param callback Indicates the listener.
     * @throws { BusinessError } 401 - Input parameter error.
     */
    on(callback: Callback<T>): void;

    /**
     * Unregister the listener to listen for configuration changes.
     * @param callback Indicates the listener.
     */
    off(callback?: Callback<T>): void;
  }

  /**
   * Indicates the type of daltonization color filter.
   */
  type DaltonizationColorFilter = 'Normal' | 'Protanomaly' | 'Deuteranomaly' | 'Tritanomaly';
}
export default config;