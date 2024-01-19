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
 * Line drawing component.
 * @since 7
 */
/**
 * Line drawing component.
 * @form
 * @since 9
 */
interface LineInterface {
  /**
   * Uses new to create the line.
   * width: Width of the rectangle where the line resides..
   * height: Height of the rectangle where the line resides.
   * @since 7
   */
  /**
   * Uses new to create the line.
   * width: Width of the rectangle where the line resides..
   * height: Height of the rectangle where the line resides.
   * @form
   * @since 9
   */
  new (value?: { width?: string | number; height?: string | number }): LineAttribute;

  /**
   * The return value of the parameter is Line.
   * width: Width of the rectangle where the line resides..
   * height: Height of the rectangle where the line resides.
   * @since 7
   */
  /**
   * The return value of the parameter is Line.
   * width: Width of the rectangle where the line resides..
   * height: Height of the rectangle where the line resides.
   * @form
   * @since 9
   */
  (value?: { width?: string | number; height?: string | number }): LineAttribute;
}

/**
 * inheritance CommonShapeMethod.
 * @since 7
 */
/**
 * inheritance CommonShapeMethod.
 * @form
 * @since 9
 */
declare class LineAttribute extends CommonShapeMethod<LineAttribute> {
  /**
   * Coordinate of the start point of the line (relative coordinate).
   * @since 7
   */
  /**
   * Coordinate of the start point of the line (relative coordinate).
   * @form
   * @since 9
   */
  startPoint(value: Array<any>): LineAttribute;

  /**
   * Line end coordinates (relative coordinates).
   * @since 7
   */
  /**
   * Line end coordinates (relative coordinates).
   * @form
   * @since 9
   */
  endPoint(value: Array<any>): LineAttribute;
}

/**
 * Defines Line Component.
 * @since 7
 */
/**
 * Defines Line Component.
 * @form
 * @since 9
 */
declare const Line: LineInterface;

/**
 * Defines Line Component instance.
 * @since 7
 */
/**
 * Defines Line Component instance.
 * @form
 * @since 9
 */
declare const LineInstance: LineAttribute;
