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
 * Content scroll direction.
 * @since 7
 */
declare enum ScrollDirection {
  /**
   * Vertical scrolling is supported.
   * @since 7
   */
  Vertical,

  /**
   * Horizontal scrolling is supported.
   * @since 7
   */
  Horizontal,

  /**
   * Free scrolling is supported.
   * @since 7
   * @deprecated since 9
   */
  Free,

  /**
   * Non-scrollable.
   * @since 7
   */
  None,
}

/**
 * @since 7
 */
declare class Scroller {
  /**
   * constructor.
   * @since 7
   */
  constructor();

  /**
   * Called when the setting slides to the specified position.
   * @since 7
   */
  scrollTo(value: {
    xOffset: number | string;
    yOffset: number | string;
    animation?: { duration: number; curve: Curve };
  });

  /**
   * Called when scrolling to the edge of the container.
   * @since 7
   */
  scrollEdge(value: Edge);

  /**
   * Called when page turning mode is set.
   * @since 7
   * @deprecated since 9
   */
  scrollPage(value: { next: boolean; direction?: Axis });

  /**
   * Called when page turning mode is set.
   * @since 9
   */
  scrollPage(value: { next: boolean });

  /**
   * Called when viewing the scroll offset.
   * @since 7
   */
  currentOffset();

  /**
   * Called when sliding to the specified index.
   * @since 7
   */
  scrollToIndex(value: number);

  /**
   * Called when the setting slides by offset.
   * @since 9
   */
  scrollBy(dx: Length, dy: Length);
}

/**
 * Provides interfaces for scrollable containers.
 * @since 7
 */
interface ScrollInterface {
  /**
   * Called when a scrollable container is set.
   * @since 7
   */
  (scroller?: Scroller): ScrollAttribute;
}

/**
 * Defines the scroll attribute functions.
 * @since 7
 */
declare class ScrollAttribute extends CommonMethod<ScrollAttribute> {
  /**
   * Called when the scroll method is slid.
   * @since 7
   */
  scrollable(value: ScrollDirection): ScrollAttribute;

  /**
   * Called when the setting slides to the specified position.
   * @since 7
   */
  onScroll(event: (xOffset: number, yOffset: number) => void): ScrollAttribute;

  /**
   * Called when scrolling to the edge of the container.
   * @since 7
   */
  onScrollEdge(event: (side: Edge) => void): ScrollAttribute;

  /**
   * Called when scrolling start.
   * @since 9
   */
  onScrollStart(event: () => void): ScrollAttribute;

  /**
   * Called when scrolling has stopped.
   * @since 7
   * @deprecated since 9
   * @useinstead scroll/Scroll#onScrollStop
   */
  onScrollEnd(event: () => void): ScrollAttribute;

  /**
   * Called when scrolling has stopped.
   * @since 9
   */
   onScrollStop(event: () => void): ScrollAttribute;

  /**
   * Called when the status of the scroll bar is set.
   * @since 7
   */
  scrollBar(barState: BarState): ScrollAttribute;

  /**
   * Called when the color of the scroll bar is set.
   * @since 7
   */
  scrollBarColor(color: Color | number | string): ScrollAttribute;

  /**
   * Called when the width of the scroll bar is set.
   * @since 7
   */
  scrollBarWidth(value: number | string): ScrollAttribute;

  /**
   * Called when the sliding effect is set.
   * @since 7
   */
  edgeEffect(edgeEffect: EdgeEffect): ScrollAttribute;

  /**
   * Called when scrolling begin each frame.
   * @since 9
   */
  onScrollFrameBegin(event: (offset: number, state: ScrollState) => { offsetRemain: number }): ScrollAttribute;
}

/**
 * Defines Scroll Component.
 * @since 7
 */
declare const Scroll: ScrollInterface;

/**
 * Defines Scroll Component instance.
 * @since 7
 */
declare const ScrollInstance: ScrollAttribute;
