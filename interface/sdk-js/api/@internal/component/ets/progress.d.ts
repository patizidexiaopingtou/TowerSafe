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
 * Defines the option of Progress.
 * @since 7
 */
/**
 * Defines the option of Progress.
 * @form
 * @since 9
 */
 declare interface ProgressOptions {
  /**
   * Sets the value of Progress.
   * @since 7
   */
  /**
   * Sets the value of Progress.
   * @form
   * @since 9
   */
  value: number;

  /**
   * Sets the total of Progress.
   * @since 7
   */
  /**
   * Sets the total of Progress.
   * @form
   * @since 9
   */
  total?: number;

  /**
   * Sets the style of Progress.
   * @since 7
   * @deprecated since 8
   * @useinstead type
   */
  style?: ProgressStyle

  /**
   * Sets the type of Progress.
   * @since 8
   */
   /**
   * Sets the type of Progress.
   * @form
   * @since 9
   */
  type?: ProgressType
}

/**
 * Type of progress bar
 * @since 8
 */
/**
 * Type of progress bar
 * @form
 * @since 9
 */
declare enum ProgressType {
  /**
   * Linear progress bar style.
   * @since 8
   */
  /**
   * Linear progress bar style.
   * @form
   * @since 9
   */
  Linear,

  /**
   * Ring progress bar.
   * @since 8
   */
  /**
   * Ring progress bar.
   * @form
   * @since 9
   */
  Ring,

  /**
   * Eclipse progress bar.
   * @since 8
   */
  /**
   * Eclipse progress bar.
   * @form
   * @since 9
   */
  Eclipse,

  /**
   * ScaleRing progress bar.
   * @since 8
   */
  /**
   * ScaleRing progress bar.
   * @form
   * @since 9
   */
  ScaleRing,

  /**
   * Capsule progress bar.
   * @since 8
   */
  /**
   * Capsule progress bar.
   * @form
   * @since 9
   */
  Capsule,
}

/**
 * Defines style options for progress component.
 * @since 8
 */
/**
 * Defines style options for progress component.
 * @form
 * @since 9
 */
declare interface ProgressStyleOptions {
  /**
   * Defines the strokeWidth property.
   * @since 8
   */
  /**
   * Defines the strokeWidth property.
   * @form
   * @since 9
   */
  strokeWidth?: Length;

  /**
   * Defines the scaleCount property.
   * @since 8
   */
  /**
   * Defines the scaleCount property.
   * @form
   * @since 9
   */
  scaleCount?: number;

  /**
   * Defines the scaleWidth property.
   * @since 8
   */
  /**
   * Defines the scaleWidth property.
   * @form
   * @since 9
   */
  scaleWidth?: Length;
}

/**
 * Type of progress bar
 * @since 7
 */
/**
 * Type of progress bar
 * @form
 * @since 9
 */
declare enum ProgressStyle {
  /**
   * Linear progress bar style.
   * @since 7
   */
  /**
   * Linear progress bar style.
   * @form
   * @since 9
   */
  Linear,

  /**
   * Ring progress bar.
   * @since 8
   */
  /**
   * Ring progress bar.
   * @form
   * @since 9
   */
  Ring,

  /**
   * Eclipse progress bar.
   * @since 7
   */
  /**
   * Eclipse progress bar.
   * @form
   * @since 9
   */
  Eclipse,

  /**
   * ScaleRing progress bar.
   * @since 8
   */
  /**
   * ScaleRing progress bar.
   * @form
   * @since 9
   */
  ScaleRing,

  /**
   * Capsule progress bar.
   * @since 8
   */
  /**
   * Capsule progress bar.
   * @form
   * @since 9
   */
  Capsule,
}

/**
 * Provides the progress bar interface.
 * @since 7
 */
/**
 * Provides the progress bar interface.
 * @form
 * @since 9
 */
interface ProgressInterface {
  /**
   * Called when the progress bar is set.
   * @since 7
   */
  /**
   * Called when the progress bar is set.
   * @form
   * @since 9
   */
  (options: ProgressOptions): ProgressAttribute;
}

/**
 * Defines the progress attribute functions.
 * @since 7
 */
/**
 * Defines the progress attribute functions.
 * @form
 * @since 9
 */
declare class ProgressAttribute extends CommonMethod<ProgressAttribute> {
  /**
   * Called when the current progress value is set.
   * @since 7
   */
  /**
   * Called when the current progress value is set.
   * @form
   * @since 9
   */
  value(value: number): ProgressAttribute;

  /**
   * Called when the progress bar foreground is set.
   * @since 7
   */
  /**
   * Called when the progress bar foreground is set.
   * @form
   * @since 9
   */
  color(value: ResourceColor): ProgressAttribute;

  /**
   * Called when the style of progress bar is set.
   * @since 8
   */
  /**
   * Called when the style of progress bar is set.
   * @form
   * @since 9
   */
  style(value: ProgressStyleOptions): ProgressAttribute;
}

/**
 * Defines Progress Component.
 * @since 7
 */
/**
 * Defines Progress Component.
 * @form
 * @since 9
 */
declare const Progress: ProgressInterface;

/**
 * Defines Progress Component instance.
 * @since 7
 */
/**
 * Defines Progress Component instance.
 * @form
 * @since 9
 */
declare const ProgressInstance: ProgressAttribute;
