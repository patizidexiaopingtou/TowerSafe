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
 * Provides an interface for drawing rectangles.
 * @since 7
 */
/**
 * Provides an interface for drawing rectangles.
 * @form
 * @since 9
 */
interface RectInterface {
  /**
   * Use new function to create Rect.
   * @since 7
   */
  /**
   * Use new function to create Rect.
   * @form
   * @since 9
   */
  new (
    value?:
      {
        width?: number | string;
        height?: number | string;
        radius?: number | string | Array<any>;
      }
      | {
          width?: number | string;
          height?: number | string;
          radiusWidth?: number | string;
          radiusHeight?: number | string;
        },
  ): RectAttribute;

  /**
   * Called when a rectangle is created.
   * @since 7
   */
  /**
   * Called when a rectangle is created.
   * @form
   * @since 9
   */
  (
    value?:
      {
        width?: number | string;
        height?: number | string;
        radius?: number | string | Array<any>;
      }
      | {
          width?: number | string;
          height?: number | string;
          radiusWidth?: number | string;
          radiusHeight?: number | string;
        },
  ): RectAttribute;
}

/**
 * @since 7
 */
/**
 * @form
 * @since 9
 */
declare class RectAttribute extends CommonShapeMethod<RectAttribute> {
  /**
   * Called when the fillet width is set.
   * @since 7
   */
  /**
   * Called when the fillet width is set.
   * @form
   * @since 9
   */
  radiusWidth(value: number | string): RectAttribute;

  /**
   * Called when the fillet height is set.
   * @since 7
   */
  /**
   * Called when the fillet height is set.
   * @form
   * @since 9
   */
  radiusHeight(value: number | string): RectAttribute;

  /**
   * Called when the fillet size is set.
   * @since 7
   */
  /**
   * Called when the fillet size is set.
   * @form
   * @since 9
   */
  radius(value: number | string | Array<any>): RectAttribute;
}

/**
 * @form
 * @since 9
 */
declare const Rect: RectInterface;

/**
 * @deprecated since 9
 */
declare const RectInStance: RectAttribute;

/**
 * @form
 * @since 9
 */
declare const RectInstance: RectAttribute;
