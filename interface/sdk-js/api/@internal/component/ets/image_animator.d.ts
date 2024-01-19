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
 * Defines the ImageAnimator Interface.
 * @since 7
 */
interface ImageAnimatorInterface {
  /**
   * ImageAnimator is returned.
   * @since 7
   */
  (): ImageAnimatorAttribute;
}

/**
 * Defines the ImageFrameInfo Interface.
 * @since 7
 */
interface ImageFrameInfo {
  /**
   * Image path
   * @type { string }
   * @since 7
   */
  /**
   * Image path
   * @type { string | Resource }
   * @since 9
   */
  src: string | Resource;
  /**
   * Image width
   * @type: { number | string }
   * @since 7
   */
  width?: number | string;
  /**
   * Image height
   * @type: { number | string }
   * @since 7
   */
  height?: number | string;
  /**
   * Vertical coordinate of the image relative to the upper left corner of the component
   * @type: { number | string }
   * @since 7
   */
  top?: number | string;
  /**
   * Horizontal coordinate of the image relative to the upper left corner of the component
   * @type: { number | string }
   * @since 7
   */
  left?: number | string;
  /**
   * Playback duration of this image frame, in milliseconds.
   * @type: { number }
   * @since 7
   */
  duration?: number;
}

/**
 * inheritance CommonMethod
 * @since 7
 */
declare class ImageAnimatorAttribute extends CommonMethod<ImageAnimatorAttribute> {
  /**
   * list images
   * @since 7
   */
  images(value: Array<ImageFrameInfo>): ImageAnimatorAttribute;

  /**
   * The default value is the initial state, which is used to control the playback status.
   * @since 7
   */
  state(value: AnimationStatus): ImageAnimatorAttribute;

  /**
   * The unit is millisecond.
   * @since 7
   */
  duration(value: number): ImageAnimatorAttribute;

  /**
   * Set the playback sequence.
   * @since 7
   */
  reverse(value: boolean): ImageAnimatorAttribute;

  /**
   * Sets whether the image size is fixed to the component size.
   * @since 7
   */
  fixedSize(value: boolean): ImageAnimatorAttribute;

  /**
   * Indicates whether to enable pre-decoding.
   * @since 7
   * @deprecated since 9
   */
  preDecode(value: number): ImageAnimatorAttribute;

  /**
   * Sets the state before and after the animation starts
   * @since 7
   */
  fillMode(value: FillMode): ImageAnimatorAttribute;

  /**
   * Played once by default
   * @since 7
   */
  iterations(value: number): ImageAnimatorAttribute;

  /**
   * Status callback, which is triggered when the animation starts to play.
   * @since 7
   */
  onStart(event: () => void): ImageAnimatorAttribute;

  /**
   * Status callback, which is triggered when the animation pauses.
   * @since 7
   */
  onPause(event: () => void): ImageAnimatorAttribute;

  /**
   * Status callback, triggered when the animation is replayed
   * @since 7
   */
  onRepeat(event: () => void): ImageAnimatorAttribute;

  /**
   * Status callback, which is triggered when the animation is canceled.
   * @since 7
   */
  onCancel(event: () => void): ImageAnimatorAttribute;

  /**
   * Status callback, which is triggered when the animation playback is complete.
   * @since 7
   */
  onFinish(event: () => void): ImageAnimatorAttribute;
}

/**
 * Defines ImageAnimator Component.
 * @since 7
 */
declare const ImageAnimator: ImageAnimatorInterface;

/**
 * Defines ImageAnimator Component instance.
 * @since 7
 */
declare const ImageAnimatorInstance: ImageAnimatorAttribute;
