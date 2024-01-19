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
 * Input parameter for creating a radio box.
 * @since 8
 */
/**
 * Input parameter for creating a radio box.
 * @form
 * @since 9
 */
declare interface RadioOptions {
  /**
   * Radio group name.
   * @since 8
   */
  /**
   * Radio group name.
   * @form
   * @since 9
   */
  group: string;

  /**
   * Radio name.
   * @since 8
   */
  /**
   * Radio name.
   * @form
   * @since 9
   */
  value: string;
}

/**
 * Provides an interface for creating a radio box.
 * @since 8
 */
/**
 * Provides an interface for creating a radio box.
 * @form
 * @since 9
 */
interface RadioInterface {
  /**
   * Called when a radio box is created.
   * @since 8
   */
  /**
   * Called when a radio box is created.
   * @form
   * @since 9
   */
  (options: RadioOptions): RadioAttribute;
}

/**
 * @since 8
 */
/**
 * @form
 * @since 9
 */
declare class RadioAttribute extends CommonMethod<RadioAttribute> {
  /**
   * Called when the radio box is selected.
   * @since 8
   */
  /**
   * Called when the radio box is selected.
   * @form
   * @since 9
   */
  checked(value: boolean): RadioAttribute;

  /**
   * Called when the radio box selection status changes.
   * @since 8
   */
  /**
   * Called when the radio box selection status changes.
   * @form
   * @since 9
   */
  onChange(callback: (isChecked: boolean) => void): RadioAttribute;
}

/**
 * Defines Radio Component.
 * @since 8
 */
/**
 * Defines Radio Component.
 * @form
 * @since 9
 */
declare const Radio: RadioInterface;

/**
 * Defines Radio Component instance.
 * @since 8
 */
/**
 * Defines Radio Component instance.
 * @form
 * @since 9
 */
declare const RadioInstance: RadioAttribute;
