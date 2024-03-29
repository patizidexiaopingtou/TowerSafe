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
 * Define SubTabBarStyle, the style is text and underline.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
 declare class SubTabBarStyle {
  /**
   * constructor.
   * @since 9
   */
  constructor(content: string | Resource);
}

/**
 * Define BottomTabBarStyle, the style is icon and text.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
 declare class BottomTabBarStyle {
  /**
   * constructor.
   * @since 9
   */
  constructor(icon: string | Resource, text: string | Resource);
}

/**
 * Provides an interface for switching the content view on a tab page.
 * @since 7
 */
interface TabContentInterface {
  /**
   * Called when the content view of the switch tab is set.
   * @since 7
   */
  (): TabContentAttribute;
}

/**
 * Defines the attribute functions of TabContent.
 * @since 7
 */
declare class TabContentAttribute extends CommonMethod<TabContentAttribute> {
  /**
   * Called when tabbar is entered.
   * @since 7
   */
  tabBar(value: string | Resource | CustomBuilder |
    { icon?: string | Resource; text?: string | Resource }): TabContentAttribute;

  /**
   * Called when tabbar is entered.
   * @since 9
   */
   tabBar(value: SubTabBarStyle | BottomTabBarStyle): TabContentAttribute;
}

/**
 * Defines TabContent Component.
 * @since 7
 */
declare const TabContent: TabContentInterface;

/**
 * Defines TabContent Component instance.
 * @since 7
 */
declare const TabContentInstance: TabContentAttribute;
