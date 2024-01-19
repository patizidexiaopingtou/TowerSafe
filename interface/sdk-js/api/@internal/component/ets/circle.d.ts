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
 * Defines circle options for Circle component.
 * @since 7
 */
/**
 * Defines circle options for Circle component.
 * @form
 * @since 9
 */
declare interface CircleOptions {
  /**
   * Defines the width property.
   * @since 7
   */
  /**
   * Defines the width property.
   * @form
   * @since 9
   */
  width?: string | number;

  /**
   * Defines the height property.
   * @since 7
   */
  /**
   * Defines the height property.
   * @form
   * @since 9
   */
  height?: string | number;
}

/**
 * Defines circle component.
 * @since 7
 */
/**
 * Defines circle component.
 * @form
 * @since 9
 */
interface CircleInterface {
  /**
   * use new function to set the value.
   * @since 7
   */
  /**
   * use new function to set the value.
   * @form
   * @since 9
   */
  new (value?: CircleOptions): CircleAttribute;

  /**
   * Set the value..
   * @since 7
   */
  /**
   * Set the value..
   * @form
   * @since 9
   */
  (value?: CircleOptions): CircleAttribute;
}

/**
 * Circle drawing component attribute functions.
 * @since 7
 */
/**
 * Circle drawing component attribute functions.
 * @form
 * @since 9
 */
declare class CircleAttribute extends CommonShapeMethod<CircleAttribute> {}

/**
 * Defines Circle Component.
 * @since 7
 */
/**
 * Defines Circle Component.
 * @form
 * @since 9
 */
declare const Circle: CircleInterface;

/**
 * Defines Circle Component instance.
 * @since 7
 */
/**
 * Defines Circle Component instance.
 * @form
 * @since 9
 */
declare const CircleInstance: CircleAttribute;
