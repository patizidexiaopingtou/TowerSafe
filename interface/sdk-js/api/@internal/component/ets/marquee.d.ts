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
 * Provides the interface for the marquee attributes.
 * @since 8
 */
/**
 * Provides the interface for the marquee attributes.
 * @form
 * @since 9
 */
interface MarqueeInterface {
  /**
   * Create marquee.
   * @since 8
   */
  /**
   * Create marquee.
   * @form
   * @since 9
   */
  (value: { start: boolean; step?: number; loop?: number; fromStart?: boolean; src: string }): MarqueeAttribute;
}

/**
 * Declares marquee properties.
 * @since 8
 */
/**
 * Declares marquee properties.
 * @form
 * @since 9
 */
declare class MarqueeAttribute extends CommonMethod<MarqueeAttribute> {
  /**
   * Set marquee font Color.
   * @since 8
   */
  /**
   * Set marquee font Color.
   * @form
   * @since 9
   */
  fontColor(value: ResourceColor): MarqueeAttribute;

  /**
   * Set marquee font size.
   * @since 8
   */
  /**
   * Set marquee font size.
   * @form
   * @since 9
   */
  fontSize(value: Length): MarqueeAttribute;

  /**
   * Set marquee allow scale.
   * @since 8
   */
  /**
   * Set marquee allow scale.
   * @form
   * @since 9
   */
  allowScale(value: boolean): MarqueeAttribute;

  /**
   * Set marquee font weight.
   * @since 8
   */
  /**
   * Set marquee font weight.
   * @form
   * @since 9
   */
  fontWeight(value: number | FontWeight | string): MarqueeAttribute;

  /**
   * Set marquee font family.
   * @since 8
   */
  /**
   * Set marquee font family.
   * @form
   * @since 9
   */
  fontFamily(value: string | Resource): MarqueeAttribute;

  /**
   * Called when scrolling starts.
   * @since 8
   */
  /**
   * Called when scrolling starts.
   * @form
   * @since 9
   */
  onStart(event: () => void): MarqueeAttribute;

  /**
   * Called when scrolling to the bottom.
   * @since 8
   */
  /**
   * Called when scrolling to the bottom.
   * @form
   * @since 9
   */
  onBounce(event: () => void): MarqueeAttribute;

  /**
   * Called when scrolling is complete.
   * @since 8
   */
  /**
   * Called when scrolling is complete.
   * @form
   * @since 9
   */
  onFinish(event: () => void): MarqueeAttribute;
}

/**
 * Defines Marquee Component.
 * @since 8
 */
/**
 * Defines Marquee Component.
 * @form
 * @since 9
 */
declare const Marquee: MarqueeInterface;

/**
 * Defines Marquee Component instance.
 * @since 8
 */
/**
 * Defines Marquee Component instance.
 * @form
 * @since 9
 */
declare const MarqueeInstance: MarqueeAttribute;
