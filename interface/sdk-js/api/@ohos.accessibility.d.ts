/*
 * Copyright (C) 2021-2022 Huawei Device Co., Ltd.
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

import { AsyncCallback } from './basic';
import { Callback } from './basic';

/**
 * Accessibility
 * @name Accessibility
 * @since 7
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 */
declare namespace accessibility {
  /**
   * The type of the Ability app.
   * @type { 'audible' | 'generic' | 'haptic' | 'spoken' | 'visual' }
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 7
   */
  /**
   * The type of the Ability app.
   * @type { 'audible' | 'generic' | 'haptic' | 'spoken' | 'visual' | 'all' } 
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 9
   */
  type AbilityType = 'audible' | 'generic' | 'haptic' | 'spoken' | 'visual' | 'all';

  /**
   * The action that the ability can execute.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 7
   */
  type Action = 'accessibilityFocus' | 'clearAccessibilityFocus' | 'focus' | 'clearFocus' | 'clearSelection' |
    'click' | 'longClick' | 'cut' | 'copy' | 'paste' | 'select' | 'setText' | 'delete' |
    'scrollForward' | 'scrollBackward' | 'setSelection';

  /**
   * The type of the accessibility event.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 7
   */
  type EventType = 'accessibilityFocus' | 'accessibilityFocusClear' |
    'click' | 'longClick' | 'focus' | 'select' | 'hoverEnter' | 'hoverExit' |
    'textUpdate' | 'textSelectionUpdate' | 'scroll';

  /**
   * The change type of the windowsChange event.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 7
   */
  type WindowUpdateType = 'add' | 'remove' | 'bounds' | 'active' | 'focus';

  /**
   * The type of the ability state.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 7
   */
  type AbilityState = 'enable' | 'disable' | 'install';

  /**
   * The ability that accessibility subsystem support.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 7
   */
  type Capability = 'retrieve' | 'touchGuide' | 'keyEventObserver' | 'zoom' | 'gesture';

  /**
   * The granularity of text move.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @since 7
   */
  type TextMoveUnit = 'char' | 'word' | 'line' | 'page' | 'paragraph';

  /**
   * Checks whether accessibility ability is enabled.
   * @since 7
   * @param callback Asynchronous callback interface.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @returns Returns {@code true} if the accessibility is enabled; returns {@code false} otherwise.
   */
  function isOpenAccessibility(callback: AsyncCallback<boolean>): void;
  function isOpenAccessibility(): Promise<boolean>;

  /**
   * Checks touch browser ability (which is used by talkback) is enabled.
   * @since 7
   * @param callback Asynchronous callback interface.
   * @syscap SystemCapability.BarrierFree.Accessibility.Vision
   * @returns Returns {@code true} if the touch browser is enabled; returns {@code false} otherwise.
   */
  function isOpenTouchGuide(callback: AsyncCallback<boolean>): void;
  function isOpenTouchGuide(): Promise<boolean>;

  /**
   * Queries the list of accessibility abilities.
   * @since 7
   * @param abilityType The type of the accessibility ability. {@code AbilityType} eg.spoken
   * @param stateType The state of the accessibility ability.  {@code AbilityState} eg.installed
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @returns Returns the list of abilityInfos.
   * @deprecated since 9
   * @useinstead ohos.accessibility#getAccessibilityExtensionList
   */
  function getAbilityLists(abilityType: AbilityType, stateType: AbilityState,
    callback: AsyncCallback<Array<AccessibilityAbilityInfo>>): void;
  function getAbilityLists(abilityType: AbilityType,
    stateType: AbilityState): Promise<Array<AccessibilityAbilityInfo>>;


  /**
   * Queries the list of accessibility abilities.
   * @since 9
   * @param abilityType The type of the accessibility ability. {@code AbilityType} eg.spoken
   * @param stateType The state of the accessibility ability.  {@code AbilityState} eg.installed
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @returns Returns the list of abilityInfos.
   * @throws { BusinessError } 401 - Input parameter error.
   */
  function getAccessibilityExtensionList(abilityType: AbilityType, stateType: AbilityState): Promise<Array<AccessibilityAbilityInfo>>;
  function getAccessibilityExtensionList(abilityType: AbilityType, stateType: AbilityState, callback: AsyncCallback<Array<AccessibilityAbilityInfo>>): void;

  /**
   * Send accessibility Event.
   * @since 7
   * @param event The object of the accessibility {@code EventInfo} .
   * @param callback Asynchronous callback interface.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @returns Returns {@code true} if success ; returns {@code false} otherwise.
   * @deprecated since 9
   * @useinstead ohos.accessibility#sendAccessibilityEvent
   */
  function sendEvent(event: EventInfo, callback: AsyncCallback<void>): void;
  function sendEvent(event: EventInfo): Promise<void>;

  /**
   * Send accessibility event.
   * @since 9
   * @param event The object of the accessibility {@code EventInfo} .
   * @param callback Asynchronous callback interface.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @returns Returns {@code true} if success ; returns {@code false} otherwise.
   * @throws { BusinessError } 401 - Input parameter error.
   */
  function sendAccessibilityEvent(event: EventInfo, callback: AsyncCallback<void>): void;
  function sendAccessibilityEvent(event: EventInfo): Promise<void>;

  /**
   * Register the observer of the accessibility state changed.
   * @since 7
   * @param type state event type.
   * @param callback Asynchronous callback interface.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @returns Returns {@code true} if the register is success ; returns {@code false} otherwise.
   * @throws { BusinessError } 401 - Input parameter error.
   */
  function on(type: 'accessibilityStateChange', callback: Callback<boolean>): void;

  /**
   * Register the observer of the touchGuide state changed.
   * @since 7
   * @param type state event type.
   * @param callback Asynchronous callback interface.
   * @syscap SystemCapability.BarrierFree.Accessibility.Vision
   * @returns Returns {@code true} if the register is success ; returns {@code false} otherwise.
   * @throws { BusinessError } 401 - Input parameter error.
   */
  function on(type: 'touchGuideStateChange', callback: Callback<boolean>): void;

  /**
   * Unregister the observer of the accessibility state changed.
   * @since 7
   * @param type state event type
   * @param callback Asynchronous callback interface.
   * @syscap SystemCapability.BarrierFree.Accessibility.Core
   * @returns Returns {@code true} if the Unregister is success ; returns {@code false} otherwise.
   * @throws { BusinessError } 401 - Input parameter error.
   */
  function off(type: 'accessibilityStateChange', callback?: Callback<boolean>): void;

  /**
   * Unregister the observer of the touchGuide state changed.
   * @since 7
   * @param type state event type
   * @param callback Asynchronous callback interface.
   * @returns Returns {@code true} if the Unregister is success ; returns {@code false} otherwise.
   * @throws { BusinessError } 401 - Input parameter error.
   */
   function off(type: 'touchGuideStateChange', callback?: Callback<boolean>): void;

  /**
   * Get the captions manager.
   * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
   * @since 8
   * @returns Returns the captions manager.
   */
   function getCaptionsManager(): CaptionsManager;

   /**
    * Indicates the captions manager.
    * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
    * @since 8
    */
   interface CaptionsManager {
     /**
      * Indicates whether captions are enabled.
      */
     enabled: boolean;
     /**
      * Indicates the style of captions.
      */
     style: CaptionsStyle;
 
     /**
      * Register the observer of the enable state.
      * @throws { BusinessError } 401 - Input parameter error.
      */
     on(type: 'enableChange', callback: Callback<boolean>): void;

     /**
      * Register the observer of the style.
      * @throws { BusinessError } 401 - Input parameter error.
      */
     on(type: 'styleChange', callback: Callback<CaptionsStyle>): void;

     /**
      * Unregister the observer of the enable state.
      * @throws { BusinessError } 401 - Input parameter error.
      */
     off(type: 'enableChange', callback?: Callback<boolean>): void;

     /**
      * Unregister the observer of the style.
      * @throws { BusinessError } 401 - Input parameter error.
      */
     off(type: 'styleChange', callback?: Callback<CaptionsStyle>): void;
   }
 
   /**
    * Indicates the edge type of the captions font.
    * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
    * @since 8
    */
   type CaptionsFontEdgeType = 'none' | 'raised' | 'depressed' | 'uniform' | 'dropShadow';
   /**
    * Indicates the font family of captions.
    * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
    * @since 8
    */
   type CaptionsFontFamily = 'default' | 'monospacedSerif' | 'serif' |
     'monospacedSansSerif' | 'sansSerif' | 'casual' | 'cursive' | 'smallCapitals';
   /**
    * Indicates the style of captions.
    * @syscap SystemCapability.BarrierFree.Accessibility.Hearing
    * @since 8
    */
   interface CaptionsStyle {
     /**
      * Indicates the font family of captions.
      */
     fontFamily: CaptionsFontFamily;
     /**
      * Indicates the font scaling of captions.
      */
     fontScale: number;
     /**
      * Indicates the font color of captions.
      */
     fontColor: number | string;
     /**
      * Indicates the edge type of the captions font.
      */
     fontEdgeType: CaptionsFontEdgeType;
     /**
      * Indicates the background color of captions.
      */
     backgroundColor: number | string;
     /**
      * Indicates the window color of captions.
      */
     windowColor: number | string;
   }

   /**
    * Indicates the info of accessibility.
    * @syscap SystemCapability.BarrierFree.Accessibility.Core
    * @since 7
    */
  interface AccessibilityAbilityInfo {
    /**
     * The ability id.
     * @since 7
     */
    readonly id: string;

    /* The ability name.
     * @since 7
     */
    readonly name: string;

    /* The bundle name of the ability.
     * @since 7
     */
    readonly bundleName: string;

    /* The target bundle name for the observation.
     * @since 9
     */
    readonly targetBundleNames: Array<string>;

    /**
     * The type of the ability.
     * @since 7
     */
    readonly abilityTypes: Array<AbilityType>;

    /**
     * The capabilities of the ability.
     * @since 7
     */
    readonly capabilities: Array<Capability>;

    /**
     * The description of the ability.
     * @since 7
     */
    readonly description: string;

    /**
     * The events which the accessibility ability wants to observe.
     * @since 7
     */
    readonly eventTypes: Array<EventType>;

  }

  /**
    * Indicates the info of events.
    * @syscap SystemCapability.BarrierFree.Accessibility.Core
    * @since 7
    */
  class EventInfo {
    constructor(jsonObject);
    /**
     * The type of an accessibility event.
     * @since 7
     */
    type: EventType;

    /**
     * The type of the window change event.
     * @since 7
     */
    windowUpdateType?: WindowUpdateType;

    /**
     * The bundle name of the target application.
     * @since 7
     */
    bundleName: string;

    /**
     * The type of the event source component,such as button, chart.
     * @since 7
     */
    componentType?: string;

    /** The page id of the event source.
     * @since 7
     */
    pageId ?: number;

    /**
     * The accessibility event description.
     * @since 7
     */
    description?: string;

    /**
     * The action that triggers the accessibility event, for example, clicking or focusing a view.
     * @since 7
     */
    triggerAction: Action;

    /**
     * The movement step used for reading texts.
     * @since 7
     */
    textMoveUnit?: TextMoveUnit;

    /**
     * The content list.
     * @since 7
     */
    contents?: Array<string>;

    /**
     * The content changed before.
     * @since 7
     */
    lastContent?: string;

    /**
     * The start index of listed items on the screen.
     * @since 7
     */
    beginIndex?: number;

    /**
     * The index of the current item on the screen.
     * @since 7
     */
    currentIndex?: number;

    /**
     * The end index of listed items on the screen.
     * @since 7
     */
    endIndex?: number;

    /**
     * The total of the items.
     * @since 7
     */
    itemCount?: number;
  }
}
export default accessibility;