/*
 * Copyright (c) 2020 Huawei Device Co., Ltd.
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
 * Defines the animator options.
 * @interface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 6
 */
export interface AnimatorOptions {
  /**
   * Duration of the animation, in milliseconds.
   * The default value is 0.
   * @type {number}
   * @since 6
   */
  duration: number;

  /**
   * Time curve of the animation. For details about the supported types.
   * linear The animation speed keeps unchanged.
   * ease The animation starts and ends at a low speed, cubic-bezier(0.25, 0.1, 0.25, 1.0).
   * ease-in The animation starts at a low speed, cubic-bezier(0.42, 0.0, 1.0, 1.0).
   * ease-out The animation ends at a low speed, cubic-bezier(0.0, 0.0, 0.58, 1.0).
   * ease-in-out The animation starts and ends at a low speed, cubic-bezier(0.42, 0.0, 0.58, 1.0).
   * fast-out-slow-in Standard curve, cubic-bezier(0.4, 0.0, 0.2, 1.0).
   * linear-out-slow-in Deceleration curve, cubic-bezier(0.0, 0.0, 0.2, 1.0).
   * fast-out-linear-in Acceleration curve, cubic-bezier(0.4, 0.0, 1.0, 1.0).
   * friction Damping curve, cubic-bezier(0.2, 0.0, 0.2, 1.0).
   * extreme-deceleration Extreme deceleration curve, cubic-bezier(0.0, 0.0, 0.0, 1.0).
   * sharp Sharp curve, cubic-bezier(0.33, 0.0, 0.67, 1.0).
   * rhythm Rhythm curve, cubic-bezier(0.7, 0.0, 0.2, 1.0).
   * smooth Smooth curve, cubic-bezier(0.4, 0.0, 0.4, 1.0).
   * cubic-bezier(x1, y1, x2, y2) You can customize an animation speed curve in the cubic-bezier() function. The x and y values of each input parameter must be between 0 and 1.
   * Step curve. The number must be set and only an integer is supported, step-position is optional. It can be set to start or end. The default value is end.
   * The default value is ease.
   * @type {string}
   * @since 6
   */
  easing: string;

  /**
   * Delay for the animation start. The default value indicates no delay.
   * The default value is 0.
   * @type {number}
   * @since 6
   */
  delay: number;

  /**
   * Whether to resume to the initial state after the animation is executed.
   * none: The initial state is restored after the animation is executed.
   * forwards: The state at the end of the animation (defined in the last key frame) is retained after the animation is executed.
   * @type {string}
   * @since 6
   */
  fill: "none" | "forwards" | "backwards" | "both";

  /**
   * The animation playback mode.
   * The default value is "normal".
   * @type {string}
   * @since 6
   */
  direction: "normal" | "reverse" | "alternate" | "alternate-reverse";

  /**
   * Number of times the animation will be played. number indicates a fixed number of playback operations, and -1 an unlimited number of playback operations.
   * The default value is 1.
   * @type {number}
   * @since 6
   */
  iterations: number;

  /**
   * Starting point of animator interpolation.
   * The default value is 0.
   * @type {number}
   * @since 6
   */
  begin: number;

  /**
   * Ending point of Dynamic Interpolation
   * The default value is 1.
   * @type {number}
   * @since 6
   */
  end: number;
}

/**
 * Defines the Animator result interface.
 * @interface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 6
 */
export interface AnimatorResult {
  /**
   * Update the options for current animator.
   * @param { AnimatorOptions } options - Options.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 6
   * @deprecated since 9
   * @useinstead ohos.animator.reset
   */
  update(options: AnimatorOptions): void;
  /**
   * Reset the options for current animator.
   * @param { AnimatorOptions } options - Options.
   * @throws { BusinessError } 401 - if the type of the parameter 1 is not object.
   * @throws { BusinessError } 100001 - if no page is found for pageId or fail to get object property list.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  reset(options: AnimatorOptions): void;
  /**
   * Starts the animation.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 6
   */
  play(): void;
  /**
   * Ends the animation.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 6
   */
  finish(): void;
  /**
   * Pauses the animation.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 6
   */
  pause(): void;
  /**
   * Cancels the animation.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 6
   */
  cancel(): void;
  /**
   * Plays the animation in reverse direction.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 6
   */
  reverse(): void;
  /**
   * Trigger when vsync callback.
   * @param { number } progress - The current progress of animation
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 6
   */
  onframe: (progress: number) => void;
  /**
   * The animation is finished.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 6
   */
  onfinish: () => void;
  /**
   * The animation is canceled.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 6
   */
  oncancel: () => void;
  /**
   * The animation is repeated.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 6
   */
  onrepeat: () => void;
}

/**
 * Defines the Animator class.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 6
 */
export default class Animator {
  /**
   * Create an animator object for custom animation.
   * @param { AnimatorOptions } options - Options.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 6
   * @deprecated since 9
   * @useinstead ohos.animator.create
   */
  static createAnimator(options: AnimatorOptions): AnimatorResult;
  /**
   * Create an animator object for custom animation.
   * @param { AnimatorOptions } options - Options.
   * @throws { BusinessError } 401 - if parameter error.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
   static create(options: AnimatorOptions): AnimatorResult;
}
