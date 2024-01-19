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
 * Provides an interface for drawing polylines.
 * @since 7
 */
/**
 * Provides an interface for drawing polylines.
 * @form
 * @since 9
 */
interface PolylineInterface {
  /**
   * Uses new to create Polyline.
   * @since 7
   */
  /**
   * Uses new to create Polyline.
   * @form
   * @since 9
   */
  new (value?: { width?: string | number; height?: string | number }): PolylineAttribute;

  /**
   * Called when using the draw fold.
   * @since 7
   */
  /**
   * Called when using the draw fold.
   * @form
   * @since 9
   */
  (value?: { width?: string | number; height?: string | number }): PolylineAttribute;
}

/**
 * @since 7
 */
/**
 * @form
 * @since 9
 */
declare class PolylineAttribute extends CommonShapeMethod<PolylineAttribute> {
  /**
   * Called when the polyline is set to pass through the coordinate point list.
   * @since 7
   */
  /**
   * Called when the polyline is set to pass through the coordinate point list.
   * @form
   * @since 9
   */
  points(value: Array<any>): PolylineAttribute;
}

/**
 * Defines Polyline Component.
 * @since 7
 */
/**
 * Defines Polyline Component.
 * @form
 * @since 9
 */
declare const Polyline: PolylineInterface;

/**
 * Defines Polyline Component instance.
 * @since 7
 */
/**
 * Defines Polyline Component instance.
 * @form
 * @since 9
 */
declare const PolylineInstance: PolylineAttribute;
