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
 * The construct function of NavRouter.
 * @since 9
 */
declare interface NavRouterInterface {
  /**
   * Constructor.
   * @since 9
   */
  (): NavRouterAttribute;
}

/**
 * The attribute function of NavRouter
 * @since 9
 */
declare class NavRouterAttribute extends CommonMethod<NavRouterAttribute> {
  /**
   * Trigger callback when NavigationView state change.
   * @since 9
   */
  onStateChange(callback: (isActivated: boolean) => void): NavRouterAttribute;
}

/**
 * Defines NavRouter Component.
 * @since 9
 */
declare const NavRouter: NavRouterInterface;

/**
 * Defines NavRouter Component instance.
 * @since 9
 */
declare const NavRouterInstance: NavRouterAttribute;
  