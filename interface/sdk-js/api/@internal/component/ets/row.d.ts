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
 * The components are laid out horizontally
 * @since 7
 */
/**
 * The components are laid out horizontally
 * @form
 * @since 9
 */
interface RowInterface {
  /**
   * Called when the layout is set in the horizontal direction.
   * @since 7
   */
  /**
   * Called when the layout is set in the horizontal direction.
   * @form
   * @since 9
   */
  (value?: { space?: string | number }): RowAttribute;
}

/**
 * Defines the row attribute functions.
 * @since 7
 */
/**
 * Defines the row attribute functions.
 * @form
 * @since 9
 */
declare class RowAttribute extends CommonMethod<RowAttribute> {
  /**
   * Called when the vertical alignment is set.
   * @since 7
   */
  /**
   * Called when the vertical alignment is set.
   * @form
   * @since 9
   */
  alignItems(value: VerticalAlign): RowAttribute;

  /**
   * Called when the horizontal alignment is set.
   * @since 8
   */
  /**
   * Called when the horizontal alignment is set.
   * @form
   * @since 9
   */
  justifyContent(value: FlexAlign): RowAttribute;
}

/**
 * Defines Row Component.
 * @since 7
 */
/**
 * Defines Row Component.
 * @form
 * @since 9
 */
declare const Row: RowInterface;

/**
 * Defines Row Component instance.
 * @since 7
 */
/**
 * Defines Row Component instance.
 * @form
 * @since 9
 */
declare const RowInstance: RowAttribute;
