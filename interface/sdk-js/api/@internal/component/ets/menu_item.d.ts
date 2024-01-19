/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
 * Defines the option of MenuItem.
 * @since 9
 */
 declare interface MenuItemOptions {
    /**
     * Defines the start display image info.
     * @since 9
     */
    startIcon?: ResourceStr;
  
    /**
     * Defines the content string display info.
     * @since 9
     */
    content?: ResourceStr;
  
    /**
     * Defines the end display image info.
     * @since 9
     */
    endIcon?: ResourceStr;
  
    /**
     * Defines the end label info like shortcut.
     * @since 9
     */
    labelInfo?: ResourceStr;

    /**
     * Create the submenu.
     * @since 9
     */
    builder?: CustomBuilder;
  }
  
  /**
   * Defines the MenuItem Component.
   * @since 9
   */
  interface MenuItemInterface {
    /**
     * Creates the MenuItem component.
     * @since 9
     */
    (value?: MenuItemOptions | CustomBuilder): MenuItemAttribute;
  }
  
  /**
   * Defines the MenuItem component attribute functions.
   * @since 9
   */
  declare class MenuItemAttribute extends CommonMethod<MenuItemAttribute> {
    /**
     * Setting whether menuItem is selected.
     * @since 9
     */
    selected(value: boolean): MenuItemAttribute;
    /**
     * Whether the relevant check icon is displayed when a menu item is selected.
     * @since 9
     */
    selectIcon(value: boolean): MenuItemAttribute;
  
    /**
     * Triggers a callback when a menu item is selected or unchecked.
     * @param callback
     * @since 9
     */
    onChange(callback: (selected: boolean) => void): MenuItemAttribute;
  }
  
  /**
 * Defines MenuItem Component.
 * @since 9
 */
  declare const MenuItem: MenuItemInterface;

  /**
 * Defines MenuItem Component instance.
 * @since 9
 */
  declare const MenuItemInstance: MenuItemAttribute;
  