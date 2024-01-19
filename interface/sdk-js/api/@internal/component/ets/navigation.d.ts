/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
 * Defines the navigation common title.
 * @since 9
 */
declare interface NavigationCommonTitle {
  /**
   * Sets the main title.
   * @since 9
   */
  main: string;

  /**
   * Sets the sub title.
   * @since 9
   */
  sub: string;
}

/**
 * Defines the navigation custom title.
 * @since 9
 */
declare interface NavigationCustomTitle {
  /**
   * Sets the custom title builder.
   * @since 9
   */
  builder: CustomBuilder;

  /**
   * Sets the custom title height.
   * @since 9
   */
  height: TitleHeight | Length;
}

/**
 * Navigation mode
 * @since 9
 */
declare enum NavigationMode {
  /**
   * The navigation bar and the content area are displayed in stack.
   * @since 9
   */
  Stack,
  /**
   * The navigation bar and the content area are displayed side by side.
   * @since 9
   */
  Split,
   /**
   * If the window width is greater than 520vp, the navigation component is displayed in split mode.
   * Otherwise it's displayed in stack mode.
   * @since 9
   */
  Auto,
}

/**
 * Navigation bar position
 * @since 9
 */
declare enum NavBarPosition {
  /**
   * The navigation bar is on the Start of the container
   * @since 9
   */
  Start,
  /**
   * The navigation bar is on the End of the container
   * @since 9
   */
  End,
}

/**
 * Navigation title mode.
 * @since 8
 */
declare enum NavigationTitleMode {
  /**
   * The title is free mode.
   * @since 8
   */
  Free = 0,

  /**
   * The title is full mode.
   * @since 8
   */
  Full,

  /**
   * The title is mini mode.
   * @since 8
   */
  Mini,
}

declare interface NavigationMenuItem {
  /**
   * The value of navigation menu item.
   * @since 8
   */
  value: string;
  /**
   * The icon of navigation menu item.
   * @since 8
   */
  icon?: string;
  /**
   * Trigger by navigation menu item click.
   * @since 8
   */
  action?: () => void;
}

/**
 * Provide navigator view interface
 * @since 8
 */
interface NavigationInterface {
  /**
   * Called when the navigator view interface is used.
   * @since 8
   */
  (): NavigationAttribute;
}

/**
 * Declare Navigation view properties.
 * @since 8
 */
declare class NavigationAttribute extends CommonMethod<NavigationAttribute> {
  /**
   * Sets the width of navigation bar.
   * @since 9
   */
  navBarWidth(value: Length): NavigationAttribute;

  /**
   * Sets the position of navigation bar.
   * @since 9
   */
  navBarPosition(value: NavBarPosition): NavigationAttribute;
   
  /**
   * Sets the mode of navigation.
   * @since 9
   */
  mode(value: NavigationMode): NavigationAttribute;
   
  /**
   * Sets the back button icon.
   * @since 9
   */
  backButtonIcon(value: string | PixelMap | Resource): NavigationAttribute;
   
  /**
   * Hide the navigation bar.
   * @since 9
   */
  hideNavBar(value: boolean): NavigationAttribute;

  /**
   * Navigation title
   * @type { (string | CustomBuilder) }
   * @since 8
   */
  /**
   * Navigation title
   * @type { (string | CustomBuilder | NavigationCommonTitle | NavigationCustomTitle) }
   * @since 9
   */
  title(value: string | CustomBuilder | NavigationCommonTitle | NavigationCustomTitle): NavigationAttribute;

  /**
   * Navigation subtitle
   * @since 8
   * @deprecated since 9
   * @useinstead title
   */
  subTitle(value: string): NavigationAttribute;

  /**
   * Hide navigation title bar
   * @since 8
   */
  hideTitleBar(value: boolean): NavigationAttribute;

  /**
   * Hide navigation back button
   * @since 8
   */
  hideBackButton(value: boolean): NavigationAttribute;

  /**
   * Navigation title mode
   * @since 8
   */
  titleMode(value: NavigationTitleMode): NavigationAttribute;

  /**
   * Navigation title bar's menus
   * @since 8
   */
  menus(value: Array<NavigationMenuItem> | CustomBuilder): NavigationAttribute;

  /**
   * Tool bar
   * @since 8
   */
  toolBar(value: object | CustomBuilder): NavigationAttribute;

  /**
   * Hide tool bar
   * @since 8
   */
  hideToolBar(value: boolean): NavigationAttribute;

  /**
   * Trigger callback when title mode change finished at free mode.
   * @since 8
   */
  onTitleModeChange(callback: (titleMode: NavigationTitleMode) => void): NavigationAttribute;

  /**
   * Trigger callback when the visibility of navigation bar change.
   * @since 9
   */
  onNavBarStateChange(callback: (isVisible: boolean) => void): NavigationAttribute;
}

/**
 * Defines Navigation Component.
 * @since 8
 */
declare const Navigation: NavigationInterface;

/**
 * Defines Navigation Component instance.
 * @since 8
 */
declare const NavigationInstance: NavigationAttribute;
