/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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

import type { AsyncCallback } from '../basic';
import ExtensionContext from './ExtensionContext';
import type accessibility from '../@ohos.accessibility';
import type { GesturePath } from '../@ohos.accessibility.GesturePath';

/**
 * The accessibility extension context. Used to configure, query information, and inject gestures.
 *
 * @extends ExtensionContext
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
export default class AccessibilityExtensionContext extends ExtensionContext {
  /**
   * Set the bundle names that is interested in sending the event.
   *
   * @param { Array<string> } targetNames The bundle names that are interested in sending the event.
   * @param { AsyncCallback<void> } callback Indicates the listener.
   * @throws { BusinessError } 401 - Input parameter error.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  setTargetBundleName(targetNames: Array<string>, callback: AsyncCallback<void>): void;

  /**
   * Set the bundle names that is interested in sending the event.
   *
   * @param { Array<string> } targetNames The bundle names that are interested in sending the event.
   * @returns { Promise<void> }
   * @throws { BusinessError } 401 - Input parameter error.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  setTargetBundleName(targetNames: Array<string>): Promise<void>;

  /**
   * Get focus element.
   *
   * @param { boolean } isAccessibilityFocus Indicates whether the acquired element has an accessibility focus.
   * @param { AsyncCallback<AccessibilityElement> } callback Indicates the listener.
   * @throws { BusinessError } 401 - Input parameter error.
   * @throws { BusinessError } 9300003 -  Do not have accessibility right for this operation.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  getFocusElement(isAccessibilityFocus: boolean, callback: AsyncCallback<AccessibilityElement>): void;

  /**
   * Get focus element.
   *
   * @param { boolean } isAccessibilityFocus Indicates whether the acquired element has an accessibility focus.
   * @returns { Promise<AccessibilityElement> }
   * @throws { BusinessError } 401 - Input parameter error.
   * @throws { BusinessError } 9300003 -  Do not have accessibility right for this operation.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  getFocusElement(isAccessibilityFocus?: boolean): Promise<AccessibilityElement>;

  /**
   * Get focus element.
   * @param { AsyncCallback<AccessibilityElement> } callback Indicates the listener.
   * @throws { BusinessError } 401 - Input parameter error.
   * @throws { BusinessError } 9300003 -  Do not have accessibility right for this operation.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  getFocusElement(callback: AsyncCallback<AccessibilityElement>): void;

  /**
   * Get window root element.
   *
   * @param { number } windowId Indicates the window ID.
   * @param { AsyncCallback<AccessibilityElement> } callback Indicates the listener.
   * @throws { BusinessError } 401 - Input parameter error.
   * @throws { BusinessError } 9300003 -  Do not have accessibility right for this operation.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  getWindowRootElement(windowId: number, callback: AsyncCallback<AccessibilityElement>): void;

  /**
   * Get window root element.
   *
   * @param { number } windowId Indicates the window ID.
   * @returns { Promise<AccessibilityElement> }
   * @throws { BusinessError } 401 - Input parameter error.
   * @throws { BusinessError } 9300003 -  Do not have accessibility right for this operation.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  getWindowRootElement(windowId?: number): Promise<AccessibilityElement>;

  /**
   * Get window root element.
   * @param { AsyncCallback<AccessibilityElement> } callback Indicates the listener.
   * @throws { BusinessError } 401 - Input parameter error.
   * @throws { BusinessError } 9300003 -  Do not have accessibility right for this operation.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  getWindowRootElement(callback: AsyncCallback<AccessibilityElement>): void;

  /**
   * Get window list.
   *
   * @param { number } displayId Indicates the display ID.
   * @param { AsyncCallback<Array<AccessibilityElement>> } callback Indicates the listener.
   * @throws { BusinessError } 401 - Input parameter error.
   * @throws { BusinessError } 9300003 -  Do not have accessibility right for this operation.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  getWindows(displayId: number, callback: AsyncCallback<Array<AccessibilityElement>>): void;

  /**
   * Get window list.
   *
   * @param { number } displayId Indicates the display ID.
   * @returns { Promise<Array<AccessibilityElement>> }
   * @throws { BusinessError } 401 - Input parameter error.
   * @throws { BusinessError } 9300003 -  Do not have accessibility right for this operation.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  getWindows(displayId?: number): Promise<Array<AccessibilityElement>>;

  /**
   * Get window list.
   * @param { AsyncCallback<Array<AccessibilityElement>> } callback Indicates the listener.
   * @throws { BusinessError } 401 - Input parameter error.
   * @throws { BusinessError } 9300003 -  Do not have accessibility right for this operation.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  getWindows(callback: AsyncCallback<Array<AccessibilityElement>>): void;

  /**
   * Inject gesture path events.
   *
   * @param { GesturePath } gesturePath Indicates the gesture path.
   * @param { AsyncCallback<void> } callback Indicates the listener.
   * @throws { BusinessError } 401 - Input parameter error.
   * @throws { BusinessError } 9300003 -  Do not have accessibility right for this operation.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  injectGesture(gesturePath: GesturePath, callback: AsyncCallback<void>): void;

  /**
   * Inject gesture path events.
   *
   * @param { GesturePath } gesturePath Indicates the gesture path.
   * @returns { Promise<void> }
   * @throws { BusinessError } 401 - Input parameter error.
   * @throws { BusinessError } 9300003 -  Do not have accessibility right for this operation.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  injectGesture(gesturePath: GesturePath): Promise<void>;
}

/**
 * Indicates an accessibility element.
 * Supports querying element attributes, requesting execution actions, and finding child elements by condition.
 *
 * @typedef AccessibilityElement
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
declare interface AccessibilityElement {
  /**
   * Get a list of attribute names.
   *
   * @param { AsyncCallback<Array<T>> } callback Indicates the listener.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  attributeNames<T extends keyof ElementAttributeValues>(callback: AsyncCallback<Array<T>>): void;

  /**
   * Get a list of attribute names.
   * @returns { Promise<Array<T>> }
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  attributeNames<T extends keyof ElementAttributeValues>(): Promise<Array<T>>;

  /**
   * Get the value of an attribute.
   *
   * @param { T } attributeName Indicates the attribute name.
   * @param { AsyncCallback<ElementAttributeValues[T]> } callback Indicates the listener.
   * @throws { BusinessError } 401 - Input parameter error.
   * @throws { BusinessError } 9300004 - This property does not exist.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  attributeValue<T extends keyof ElementAttributeValues>(
    attributeName: T,
    callback: AsyncCallback<ElementAttributeValues[T]>
  ): void;

  /**
   * Get the value of an attribute.
   *
   * @param { T } attributeName Indicates the attribute name.
   * @returns { Promise<ElementAttributeValues[T]> }
   * @throws { BusinessError } 401 - Input parameter error.
   * @throws { BusinessError } 9300004 - This property does not exist.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  attributeValue<T extends keyof ElementAttributeValues>(attributeName: T): Promise<ElementAttributeValues[T]>;

  /**
   * Get a list of supported actions.
   *
   * @param { AsyncCallback<Array<string>> } callback Indicates the listener.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  actionNames(callback: AsyncCallback<Array<string>>): void;

  /**
   * Get a list of supported actions.
   *
   * @param { AsyncCallback<Array<string>> } callback Indicates the listener.
   * @returns { Promise<Array<string>> }
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  actionNames(): Promise<Array<string>>;

  /**
   * Perform the specified action.
   *
   * @param { string } actionName Indicates the action name.
   * @param { object } parameters Indicates the parameters needed to execute the action.
   * @param { AsyncCallback<void> } callback Indicates the listener.
   * @throws { BusinessError } 401 - Input parameter error.
   * @throws { BusinessError } 9300005 - This action is not supported.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  performAction(actionName: string, parameters: object, callback: AsyncCallback<void>): void;

  /**
   * Perform the specified action.
   *
   * @param { string } actionName Indicates the action name.
   * @param { object } parameters Indicates the parameters needed to execute the action.
   * @returns { Promise<void> }
   * @throws { BusinessError } 401 - Input parameter error.
   * @throws { BusinessError } 9300005 - This action is not supported.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  performAction(actionName: string, parameters?: object): Promise<void>;

  /**
   * Perform the specified action.
   *
   * @param { string } actionName Indicates the action name.
   * @param { AsyncCallback<void> } callback Indicates the listener.
   * @throws { BusinessError } 401 - Input parameter error.
   * @throws { BusinessError } 9300005 - This action is not supported.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  performAction(actionName: string, callback: AsyncCallback<void>): void;

  /**
   * Find elements that match the condition.
   *
   * @param { 'content' } type The type of query condition is content.
   * @param { string } condition Indicates the specific content to be queried.
   * @param { AsyncCallback<Array<AccessibilityElement>> } callback Indicates the listener.
   * @throws { BusinessError } 401 - Input parameter error.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  findElement(type: 'content', condition: string, callback: AsyncCallback<Array<AccessibilityElement>>): void;

  /**
   * Find elements that match the condition.
   *
   * @param { 'content' } type The type of query condition is content.
   * @param { string } condition Indicates the specific content to be queried.
   * @returns { Promise<Array<AccessibilityElement>> }
   * @throws { BusinessError } 401 - Input parameter error.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  findElement(type: 'content', condition: string): Promise<Array<AccessibilityElement>>;

  /**
   * Find elements that match the condition.
   *
   * @param { 'focusType' } type The type of query condition is focus type.
   * @param { FocusType } condition Indicates the type of focus to query.
   * @param { AsyncCallback<AccessibilityElement> } callback Indicates the listener.
   * @throws { BusinessError } 401 - Input parameter error.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  findElement(type: 'focusType', condition: FocusType, callback: AsyncCallback<AccessibilityElement>): void;

  /**
   * Find elements that match the condition.
   *
   * @param { 'focusType' } type The type of query condition is focus type.
   * @param { FocusType } condition Indicates the type of focus to query.
   * @returns { Promise<AccessibilityElement> }
   * @throws { BusinessError } 401 - Input parameter error.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  findElement(type: 'focusType', condition: FocusType): Promise<AccessibilityElement>;

  /**
   * Find elements that match the condition.
   *
   * @param { 'focusDirection' } type The type of query condition is focus direction.
   * @param { FocusDirection } condition Indicates the direction of search focus to query.
   * @param { AsyncCallback<AccessibilityElement> } callback Indicates the listener.
   * @throws { BusinessError } 401 - Input parameter error.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  findElement(type: 'focusDirection', condition: FocusDirection, callback: AsyncCallback<AccessibilityElement>): void;

  /**
   * Find elements that match the condition.
   *
   * @param { 'focusDirection' } type The type of query condition is focus direction.
   * @param { FocusDirection } condition Indicates the direction of search focus to query.
   * @returns { Promise<AccessibilityElement> }
   * @throws { BusinessError } 401 - Input parameter error.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  findElement(type: 'focusDirection', condition: FocusDirection): Promise<AccessibilityElement>;
}

/**
 * Indicates the possible attributes of the element and the type of the attribute value.
 *
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
type ElementAttributeValues = {
  /**
   * Indicates accessibility focus state.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  accessibilityFocused: boolean;
  /**
   * Indicates the bundle name to which it belongs.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  bundleName: string;
  /**
   * Indicates whether the element is checkable.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  checkable: boolean;
  /**
   * Indicates whether the element is checked.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  checked: boolean;
  /**
   * Indicates all child elements.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  children: Array<AccessibilityElement>;
  /**
   * Indicates whether the element is clickable.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  clickable: boolean;
  /**
   * Indicates the component ID to which the element belongs.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  componentId: number;
  /**
   * Indicates the component type to which the element belongs.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  componentType: string;
  /**
   * Indicates the content.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  contents: Array<string>;
  /**
   * Indicates the index of the current item.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  currentIndex: number;
  /**
   * Indicates the description of the element.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  description: string;
  /**
   * Indicates whether the element is editable.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  editable: boolean;
  /**
   * Indicates the list index of the last item displayed on the screen.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  endIndex: number;
  /**
   * Indicates the string of error state.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  error: string;
  /**
   * Indicates whether the element is focusable.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  focusable: boolean;
  /**
   * Indicates the hint text.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  hintText: string;
  /**
   * Indicates the type of input text.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  inputType: number;
  /**
   * Indicates the inspector key.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  inspectorKey: string;
  /**
   * Indicates whether the element is active or not.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  isActive: boolean;
  /**
   * Indicates whether the element is enable or not.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  isEnable: boolean;
  /**
   * Indicates whether the element is hint state or not.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  isHint: boolean;
  /**
   * Indicates whether the element is focused or not.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  isFocused: boolean;
  /**
   * Indicates whether the element is password or not.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  isPassword: boolean;
  /**
   * Indicates whether the element is visible or not.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  isVisible: boolean;
  /**
   * Indicates the total count of the items.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  itemCount: number;
  /**
   * Indicates the last content.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  lastContent: string;
  /**
   * Indicates the display layer of the element.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  layer: number;
  /**
   * Indicates whether the element is long clickable.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  longClickable: boolean;
  /**
   * Indicates the page id.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  pageId: number;
  /**
   * Indicates the parent of the element.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  parent: AccessibilityElement;
  /**
   * Indicates whether the element supports multiple lines of text.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  pluralLineSupported: boolean;
  /**
   * Indicates the area of the element.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  rect: Rect;
  /**
   * Indicates the resource name of the element.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  resourceName: string;
  /**
   * Indicates the root element of the window element.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  rootElement: AccessibilityElement;
  /**
   * Indicates the display area of the element.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  screenRect: Rect;
  /**
   * Indicates whether the element is scrollable.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  scrollable: boolean;
  /**
   * Indicates whether the element is selected.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  selected: boolean;
  /**
   * Indicates the list index of the first item displayed on the screen.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  startIndex: number;
  /**
   * Indicates the text of the element.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  text: string;
  /**
   * Indicates the maximum length limit of the element text.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  textLengthLimit: number;
  /**
   * Indicates the unit of movement of the element text as it is read.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  textMoveUnit: accessibility.TextMoveUnit;
  /**
   * Indicates the action that triggered the element event.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  triggerAction: accessibility.Action;
  /**
   * Indicates the window type of the element.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  type: WindowType;
  /**
   * Indicates the maximum value.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  valueMax: number;
  /**
   * Indicates the minimum value.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  valueMin: number;
  /**
   * Indicates the current value.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  valueNow: number;
  /**
   * Indicates the window id.
   *
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  windowId: number;
};

/**
 * Indicates the direction of the search focus.
 *
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
type FocusDirection = 'up' | 'down' | 'left' | 'right' | 'forward' | 'backward';

/**
 * Indicates the type of the focus.
 *
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
type FocusType = 'accessibility' | 'normal';

/**
 * Indicates the type of the window.
 *
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
type WindowType = 'application' | 'system';

/**
 * Indicates rectangle.
 *
 * @typedef Rect
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}
