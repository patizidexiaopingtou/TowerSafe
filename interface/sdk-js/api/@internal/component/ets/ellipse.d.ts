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
 * Ellipse drawing.
 * @since 7
 */
/**
 * Ellipse drawing.
 * @form
 * @since 9
 */
interface EllipseInterface {
  /**
   * use new function to set the value.
   * @since 7
   */
  /**
   * use new function to set the value.
   * @form
   * @since 9
   */
  new (value?: { width?: string | number; height?: string | number }): EllipseAttribute;

  /**
   * Set the value.
   * @since 7
   */
  /**
   * Set the value.
   * @form
   * @since 9
   */
  (value?: { width?: string | number; height?: string | number }): EllipseAttribute;
}

/**
 * @since 7
 */
/**
 * @form
 * @since 9
 */
declare class EllipseAttribute extends CommonShapeMethod<EllipseAttribute> {}

/**
 * Defines Ellipse Component.
 * @since 7
 */
/**
 * Defines Ellipse Component.
 * @form
 * @since 9
 */
declare const Ellipse: EllipseInterface;

/**
 * Defines Ellipse Component instance.
 * @since 7
 */
/**
 * Defines Ellipse Component instance.
 * @form
 * @since 9
 */
declare const EllipseInstance: EllipseAttribute;
