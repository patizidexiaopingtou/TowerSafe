/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
 * Defines the list item group options.
 * @since 9
 */
declare interface ListItemGroupOptions {
  /**
   * Describes the ListItemGroup header.
   * @since 9
   */
  header?: CustomBuilder;

  /**
   * Describes the ListItemGroup footer.
   * @since 9
   */
  footer?: CustomBuilder;

  /**
   * Describes the ListItemGroup space.
   * @since 9
   */
  space?: number | string;
}

/**
 * Defines the ListItemGroup component
 * @since 9
 */
interface ListItemGroupInterface {
  /**
   * Called when interface is called.
   * @since 9
   */
  (options?: ListItemGroupOptions): ListItemGroupAttribute;
}

/**
 * Defines the item group attribute functions.
 * @since 9
 */
declare class ListItemGroupAttribute extends CommonMethod<ListItemGroupAttribute> {
  /**
   * Called when the ListItemGroup split line style is set.
   * @since 9
   */
  divider(
    value: {
      strokeWidth: Length;
      color?: ResourceColor;
      startMargin?: Length;
      endMargin?: Length;
    } | null,
  ): ListItemGroupAttribute;
}

/**
 * Defines ListItemGroup Component instance.
 * @since 9
 */
declare const ListItemGroupInstance: ListItemGroupAttribute;

/**
 * Defines ListItemGroup Component.
 * @since 9
 */
declare const ListItemGroup: ListItemGroupInterface;
  