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
 * Defines the option of MenuItemGroup.
 * @since 9
 */
 declare interface MenuItemGroupOptions {
    /**
     * Defines the header display info.
     * @since 9
     */
    header?: ResourceStr | CustomBuilder;
  
    /**
     * Defines the footer display info.
     * @since 9
     */
    footer?: ResourceStr | CustomBuilder;
  }
  
  /**
   * Defines the MenuItemGroup Component.
   * @since 9
   */
  interface MenuItemGroupInterface {
    /**
     * Creates the MenuItemGroup component.
     * @since 9
     */
    (value?: MenuItemGroupOptions): MenuItemGroupAttribute;
  }
  
  /**
   * Defines the MenuItemGroup component attribute functions.
   * @since 9
   */
  declare class MenuItemGroupAttribute extends CommonMethod<MenuItemGroupAttribute> {}
  
  /**
 * Defines MenuItemGroup Component.
 * @since 9
 */
  declare const MenuItemGroup: MenuItemGroupInterface;

  /**
 * Defines MenuItemGroup Component instance.
 * @since 9
 */
  declare const MenuItemGroupInstance: MenuItemGroupAttribute;
  