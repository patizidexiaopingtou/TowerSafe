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
 * Provides a button component.
 * @since 7
 */
/**
 * Provides a button component.
 * @form
 * @since 9
 */
declare enum ButtonType {
  /**
   * Capsule button (rounded corners default to half the height).
   * @since 7
   */
  /**
   * Capsule button (rounded corners default to half the height).
   * @form
   * @since 9
   */
  Capsule,

  /**
   * Round buttons.
   * @since 7
   */
  /**
   * Round buttons.
   * @form
   * @since 9
   */
  Circle,

  /**
   * Common button (no rounded corners by default).
   * @since 7
   */
  /**
   * Common button (no rounded corners by default).
   * @form
   * @since 9
   */
  Normal,
}

/**
 * Defines the button options.
 * @since 7
 */
/**
 * Defines the button options.
 * @form
 * @since 9
 */
declare interface ButtonOptions {
  /**
   * Describes the button style.
   * @since 7
   */
  /**
   * Describes the button style.
   * @form
   * @since 9
   */
  type?: ButtonType;

  /**
   * Indicates whether to enable the switchover effect when the button is pressed. When the status is set to false, the switchover effect is disabled.
   * @since 7
   */
  /**
   * Indicates whether to enable the switchover effect when the button is pressed. When the status is set to false, the switchover effect is disabled.
   * @form
   * @since 9
   */
  stateEffect?: boolean;
}

/**
 * Defines the Button Component.
 * @since 7
 */
/**
 * Defines the Button Component.
 * @form
 * @since 9
 */
interface ButtonInterface {
  /**
   * Button object
   * @since 7
   */
  /**
   * Button object
   * @form
   * @since 9
   */
  (): ButtonAttribute;

  /**
   * Create Button with Text child.
   * @since 7
   */
  /**
   * Create Button with Text child.
   * @form
   * @since 9
   */
  (options: ButtonOptions): ButtonAttribute;

  /**
   * Create Button with inner text label.
   * @since 7
   */
  /**
   * Create Button with inner text label.
   * @form
   * @since 9
   */
  (label: ResourceStr, options?: ButtonOptions): ButtonAttribute;
}

/**
 * Defines the button attribute functions.
 * @since 7
 */
/**
 * Defines the button attribute functions.
 * @form
 * @since 9
 */
declare class ButtonAttribute extends CommonMethod<ButtonAttribute> {
  /**
   * Describes the button style.
   * @since 7
   */
  /**
   * Describes the button style.
   * @form
   * @since 9
   */
  type(value: ButtonType): ButtonAttribute;

  /**
   * Indicates whether to enable the switchover effect when the button is pressed. When the status is set to false, the switchover effect is disabled.
   * @since 7
   */
  /**
   * Indicates whether to enable the switchover effect when the button is pressed. When the status is set to false, the switchover effect is disabled.
   * @form
   * @since 9
   */
  stateEffect(value: boolean): ButtonAttribute;

  /**
   * Text color.
   * @since 7
   */
  /**
   * Text color.
   * @form
   * @since 9
   */
  fontColor(value: ResourceColor): ButtonAttribute;

  /**
   * Text size.
   * @since 7
   */
  /**
   * Text size.
   * @form
   * @since 9
   */
  fontSize(value: Length): ButtonAttribute;

  /**
   * Font weight.
   * @since 7
   */
  /**
   * Font weight.
   * @form
   * @since 9
   */
  fontWeight(value: number | FontWeight | string): ButtonAttribute;

  /**
   * Font style.
   * @since 8
   */
  /**
   * Font style.
   * @form
   * @since 9
   */
  fontStyle(value: FontStyle): ButtonAttribute;

  /**
   * Font family.
   * @since 8
   */
  /**
   * Font family.
   * @form
   * @since 9
   */
  fontFamily(value: string | Resource): ButtonAttribute;
}

/**
 * Defines Button Component.
 * @since 7
 */
/**
 * Defines Button Component.
 * @form
 * @since 9
 */
declare const Button: ButtonInterface;

/**
 * Defines Button Component instance.
 * @since 7
 */
/**
 * Defines Button Component instance.
 * @form
 * @since 9
 */
declare const ButtonInstance: ButtonAttribute;
