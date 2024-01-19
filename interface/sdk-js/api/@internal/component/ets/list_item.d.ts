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
 * Declare item ceiling attribute.
 * @since 7
 */
declare enum Sticky {
  /**
   * No sticky.
   * @since 7
   */
  None,

  /**
   * Normal mode
   * @since 7
   */
  Normal,

  /**
   * Set opacity.
   * @since 7
   */
  Opacity,
}

/**
 * Declare whether the ListItem element is editable.
 * @since 7
 * @deprecated since 9
 */
declare enum EditMode {
  /**
   * Unrestricted operations.
   * @since 7
   */
  None,

  /**
   * Deletable.
   * @since 7
   */
  Deletable,

  /**
   * Movable.
   * @since 7
   */
  Movable,
}

/**
 * Sliding effect
 * @since 9
 */
declare enum SwipeEdgeEffect {
  /**
   * Elastic physical action, sliding to the edge can continue to slide for a distance based on the initial speed or touch event, and spring back when released.
   * @since 9
   */
  Spring,

  /**
   * Sliding to the edge has no effect.
   * @since 9
   */
  None,
}

/**
 * Defines the SwipeActionOption of swipeAction attribute method.
 * @since 9
 */
declare interface SwipeActionOptions {
  /**
   * An action item that appears when a list item slides right (when list direction is Vertical) or
   * slides down (when list direction Horizontal).
   * @since 9
   */
  start?: CustomBuilder;
  /**
   * An action item that appears when a list item slides left (when list direction is Vertical) or
   * slides up (when list direction Horizontal).
   * @since 9
   */
  end?: CustomBuilder;

  /**
   * Sets whether sliding to a boundary has a spring effect.
   * @since 9
   */
  edgeEffect?: SwipeEdgeEffect;
}

/**
 * @since 7
 */
/**
 * @form
 * @since 9
 */
/**
 * Values in the list
 * @since 7
 */
/**
 * Values in the list
 * @form
 * @since 9
 */
interface ListItemInterface {
  /**
   * Called when an interface is used.
   * @since 7
   */
  /**
   * Called when an interface is used.
   * @form
   * @since 9
   */
  (value?: string): ListItemAttribute;
}

/**
 * @since 7
 */
/**
 * @form
 * @since 9
 */
declare class ListItemAttribute extends CommonMethod<ListItemAttribute> {
  /**
   * Called when setting whether item is ceiling effect.
   * @since 7
   */
  sticky(value: Sticky): ListItemAttribute;

  /**
   * Called when judging whether it is editable.
   * @since 7
   * @deprecated since 9
   */
  editable(value: boolean | EditMode): ListItemAttribute;

  /**
   * Called when judging whether it is selectable.
   * @since 8
   */
  selectable(value: boolean): ListItemAttribute;

  /**
   * Sets the action item that appears when the list item slides in the cross axis direction of the list.
   * @param value items defines in the SwipeActionOption.
   * @since 9
   */
  swipeAction(value: SwipeActionOptions): ListItemAttribute;

  /**
   * Called when the listItem is selected.
   * @since 8
   */
  /**
   * Called when the listItem is selected.
   * @form
   * @since 9
   */
  onSelect(event: (isSelected: boolean) => void): ListItemAttribute;
}

/**
 * Defines ListItem Component instance.
 * @since 7
 */
/**
 * Defines ListItem Component instance.
 * @form
 * @since 9
 */
declare const ListItemInstance: ListItemAttribute;

/**
 * Defines ListItem Component.
 * @since 7
 */
/**
 * Defines ListItem Component.
 * @form
 * @since 9
 */
declare const ListItem: ListItemInterface;
