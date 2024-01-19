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
 * Defines the options of Flex.
 * @since 7
 */
/**
 * Defines the options of Flex.
 * @form
 * @since 9
 */
declare interface FlexOptions {
  /**
   * Sets the horizontal layout of elements.
   * @since 7
   */
  /**
   * Sets the horizontal layout of elements.
   * @form
   * @since 9
   */
  direction?: FlexDirection;

  /**
   * Whether the Flex container is a single row/column arrangement or a multi-row/column arrangement.
   * @since 7
   */
  /**
   * Whether the Flex container is a single row/column arrangement or a multi-row/column arrangement.
   * @form
   * @since 9
   */
  wrap?: FlexWrap;

  /**
   * The alignment format of the subassembly on the Flex container spindle.
   * @since 7
   */
  /**
   * The alignment format of the subassembly on the Flex container spindle.
   * @form
   * @since 9
   */
  justifyContent?: FlexAlign;

  /**
   * Alignment Format for Subassembly on Flex Container Cross Axis.
   * @since 7
   */
  /**
   * Alignment Format for Subassembly on Flex Container Cross Axis.
   * @form
   * @since 9
   */
  alignItems?: ItemAlign;

  /**
   * The alignment of multiple lines of content when there is extra space in the cross axis.
   * @since 7
   */
  /**
   * The alignment of multiple lines of content when there is extra space in the cross axis.
   * @form
   * @since 9
   */
  alignContent?: FlexAlign;
}

/**
 * Provides a monthly view component to display information such as date, shift break, and schedule.
 * @since 7
 */
/**
 * Provides a monthly view component to display information such as date, shift break, and schedule.
 * @form
 * @since 9
 */
interface FlexInterface {
  /**
   * Defines the constructor of Flex.
   * @since 7
   */
  /**
   * Defines the constructor of Flex.
   * @form
   * @since 9
   */
  (value?: FlexOptions): FlexAttribute;
}

/**
 * Defines the Flex attribute functions.
 * @since 7
 */
/**
 * Defines the Flex attribute functions.
 * @form
 * @since 9
 */
declare class FlexAttribute extends CommonMethod<FlexAttribute> {}

/**
 * Defines Flex Component.
 * @since 7
 */
/**
 * Defines Flex Component.
 * @form
 * @since 9
 */
declare const Flex: FlexInterface;

/**
 * Defines Flex Component instance.
 * @since 7
 */
/**
 * Defines Flex Component instance.
 * @form
 * @since 9
 */
declare const FlexInstance: FlexAttribute;
