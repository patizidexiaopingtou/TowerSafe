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
 * Provides interfaces for drawing components.
 * @since 7
 */
/**
 * Provides interfaces for drawing components.
 * @form
 * @since 9
 */
interface ShapeInterface {
  /**
   * Use the new function to create Shape.
   * @since 7
   */
  new (value?: PixelMap): ShapeAttribute;

  /**
   * Called when a component is drawn.
   * @since 7
   */
  (value: PixelMap): ShapeAttribute;

  /**
   * Called when a component is drawn.
   * @form
   * @since 9
   */
  (): ShapeAttribute;
}

/**
 * @since 7
 */
/**
 * @form
 * @since 9
 */
declare class ShapeAttribute extends CommonMethod<ShapeAttribute> {
  /**
   * Viewport of shape
   * @since 7
   */
  /**
   * Viewport of shape
   * @form
   * @since 9
   */
  viewPort(value: { x?: number | string; y?: number | string; width?: number | string; height?: number | string }): ShapeAttribute;

  /**
   * Called when the border color is set.
   * @since 7
   */
  /**
   * Called when the border color is set.
   * @form
   * @since 9
   */
  stroke(value: ResourceColor): ShapeAttribute;

  /**
   * Called when the fill color is set.
   * @since 7
   */
  /**
   * Called when the fill color is set.
   * @form
   * @since 9
   */
  fill(value: ResourceColor): ShapeAttribute;

  /**
   * Called when the offset of the starting point of border drawing is set.
   * @since 7
   */
  /**
   * Called when the offset of the starting point of border drawing is set.
   * @form
   * @since 9
   */
  strokeDashOffset(value: number | string): ShapeAttribute;

  /**
   * Called when the gap of the border is set.
   * @since 7
   */
  /**
   * Called when the gap of the border is set.
   * @form
   * @since 9
   */
  strokeDashArray(value: Array<any>): ShapeAttribute;

  /**
   * Called when the path endpoint drawing style is set.
   * @since 7
   */
  /**
   * Called when the path endpoint drawing style is set.
   * @form
   * @since 9
   */
  strokeLineCap(value: LineCapStyle): ShapeAttribute;

  /**
   * Called when the border corner drawing style is set.
   * @since 7
   */
  /**
   * Called when the border corner drawing style is set.
   * @form
   * @since 9
   */
  strokeLineJoin(value: LineJoinStyle): ShapeAttribute;

  /**
   * Called when the limit value for drawing acute angles as oblique angles is set.
   * @since 7
   */
  /**
   * Called when the limit value for drawing acute angles as oblique angles is set.
   * @form
   * @since 9
   */
  strokeMiterLimit(value: number | string): ShapeAttribute;

  /**
   * Called when the opacity of the border is set.
   * @since 7
   */
  /**
   * Called when the opacity of the border is set.
   * @form
   * @since 9
   */
  strokeOpacity(value: number | string | Resource): ShapeAttribute;

  /**
   * Called when the transparency of the border is set.
   * @since 7
   */
  /**
   * Called when the transparency of the border is set.
   * @form
   * @since 9
   */
  fillOpacity(value: number | string | Resource): ShapeAttribute;

  /**
   * Called when the width of the border is set.
   * @since 7
   */
  /**
   * Called when the width of the border is set.
   * @form
   * @since 9
   */
  strokeWidth(value: number | string): ShapeAttribute;

  /**
   * Called when setting whether anti aliasing is on.
   * @since 7
   */
  /**
   * Called when setting whether anti aliasing is on.
   * @form
   * @since 9
   */
  antiAlias(value: boolean): ShapeAttribute;
  
  /**
   * Called when shape mesh.
   * @since 8
   */
  /**
   * Called when shape mesh.
   * @form
   * @since 9
   */
  mesh(value: Array<any>, column: number, row: number): ShapeAttribute;
}

/**
 * Defines Shape Component.
 * @since 7
 */
/**
 * Defines Shape Component.
 * @form
 * @since 9
 */
declare const Shape: ShapeInterface;

/**
 * Defines Shape Component instance.
 * @since 7
 */
/**
 * Defines Shape Component instance.
 * @form
 * @since 9
 */
declare const ShapeInstance: ShapeAttribute;
