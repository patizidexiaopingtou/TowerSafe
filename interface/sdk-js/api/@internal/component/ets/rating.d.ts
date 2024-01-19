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
 * Provides the interface for scoring bars.
 * @since 7
 */
/**
 * Provides the interface for scoring bars.
 * @form
 * @since 9
 */
interface RatingInterface {
  /**
   * Called when a score bar is created.
   * @since 7
   */
  /**
   * Called when a score bar is created.
   * @form
   * @since 9
   */
  (options?: { rating: number; indicator?: boolean }): RatingAttribute;
}

/**
 * Defines the rating attribute functions.
 * @since 7
 */
/**
 * Defines the rating attribute functions.
 * @form
 * @since 9
 */
declare class RatingAttribute extends CommonMethod<RatingAttribute> {
  /**
   * Called when the total number of stars is set.
   * @since 7
   */
  /**
   * Called when the total number of stars is set.
   * @form
   * @since 9
   */
  stars(value: number): RatingAttribute;

  /**
   * Called when the step size of the operation rating.
   * @since 7
   */
  /**
   * Called when the step size of the operation rating.
   * @form
   * @since 9
   */
  stepSize(value: number): RatingAttribute;

  /**
   * Called when a picture is set.
   * @since 7
   */
  /**
   * Called when a picture is set.
   * @form
   * @since 9
   */
  starStyle(value: { backgroundUri: string; foregroundUri: string; secondaryUri?: string }): RatingAttribute;

  /**
   * Called when the star rating of the operation scoring bar changes.
   * @since 7
   */
  /**
   * Called when the star rating of the operation scoring bar changes.
   * @form
   * @since 9
   */
  onChange(callback: (value: number) => void): RatingAttribute;
}

/**
 * Defines Rating Component.
 * @since 7
 */
/**
 * Defines Rating Component.
 * @form
 * @since 9
 */
declare const Rating: RatingInterface;

/**
 * Defines Rating Component instance.
 * @since 7
 */
/**
 * Defines Rating Component instance.
 * @form
 * @since 9
 */
declare const RatingInstance: RatingAttribute;
