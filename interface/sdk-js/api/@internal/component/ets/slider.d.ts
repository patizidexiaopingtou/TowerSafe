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
 * Declare sliderstyle
 * @since 7
 */
/**
 * Declare sliderstyle
 * @form
 * @since 9
 */
declare enum SliderStyle {
  /**
   * The slider is on the slide rail.
   * @since 7
   */
  /**
   * The slider is on the slide rail.
   * @form
   * @since 9
   */
  OutSet,

  /**
   * The slider is in the slide rail.
   * @since 7
   */
  /**
   * The slider is in the slide rail.
   * @form
   * @since 9
   */
  InSet,
}

/**
 * Declare SliderChangeMode
 * @since 7
 */
/**
 * Declare SliderChangeMode
 * @form
 * @since 9
 */
declare enum SliderChangeMode {
  /**
   * Start dragging the slider.
   * @since 7
   */
  /**
   * Start dragging the slider.
   * @form
   * @since 9
   */
  Begin,

  /**
   * Drag the slider.
   * @since 7
   */
  /**
   * Drag the slider.
   * @form
   * @since 9
   */
  Moving,

  /**
   * End dragging the slider.
   * @since 7
   */
  /**
   * End dragging the slider.
   * @form
   * @since 9
   */
  End,

  /**
   * Click the slider.
   * @since 8
   */
  /**
   * Click the slider.
   * @form
   * @since 9
   */
  Click,
}

/**
 * Defines the options of Slider.
 * @since 7
 */
/**
 * Defines the options of Slider.
 * @form
 * @since 9
 */
declare interface SliderOptions {
  /**
   * Current value of Slider.
   * @since 7
   */
  /**
   * Current value of Slider.
   * @form
   * @since 9
   */
  value?: number;

  /**
   * Sets the min value of Slider.
   * @since 7
   */
  /**
   * Sets the min value of Slider.
   * @form
   * @since 9
   */
  min?: number;

  /**
   * Sets the max value of Slider.
   * @since 7
   */
  /**
   * Sets the max value of Slider.
   * @form
   * @since 9
   */
  max?: number;

  /**
   * Sets the step of each slide value.
   * @since 7
   */
  /**
   * Sets the step of each slide value.
   * @form
   * @since 9
   */
  step?: number;

  /**
   * Sets the slider style.
   * @since 7
   */
  /**
   * Sets the slider style.
   * @form
   * @since 9
   */
  style?: SliderStyle;

  /**
   * Sets the slider direction style.
   * @since 8
   */
  /**
   * Sets the slider direction style.
   * @form
   * @since 9
   */
  direction?: Axis;

  /**
   * Set whether the direction of the slider needs to be reversed.
   * @since 8
   */
  /**
   * Set whether the direction of the slider needs to be reversed.
   * @form
   * @since 9
   */
  reverse?: boolean;
}

/**
 * Provides an interface for the slide bar component.
 * @since 7
 */
/**
 * Provides an interface for the slide bar component.
 * @form
 * @since 9
 */
interface SliderInterface {
  /**
   * Called when the slider bar component is used.
   * @since 7
   */
  /**
   * Called when the slider bar component is used.
   * @form
   * @since 9
   */
  (options?: SliderOptions): SliderAttribute;
}

/**
 * Defines the attribute functions of Slider.
 * @since 7
 */
/**
 * Defines the attribute functions of Slider.
 * @form
 * @since 9
 */
declare class SliderAttribute extends CommonMethod<SliderAttribute> {
  /**
   * Called when the slider color of the slider bar is set.
   * @since 7
   */
  /**
   * Called when the slider color of the slider bar is set.
   * @form
   * @since 9
   */
  blockColor(value: ResourceColor): SliderAttribute;

  /**
   * Called when the track color of the slider is set.
   * @since 7
   */
  /**
   * Called when the track color of the slider is set.
   * @form
   * @since 9
   */
  trackColor(value: ResourceColor): SliderAttribute;

  /**
   * Called when the slider of the slider bar is set to slide over the area color.
   * @since 7
   */
  /**
   * Called when the slider of the slider bar is set to slide over the area color.
   * @form
   * @since 9
   */
  selectedColor(value: ResourceColor): SliderAttribute;

  /**
   * Called when the minimum label is set.
   * @since 7
   * @deprecated since 9
   * @useinstead min
   */
  minLabel(value: string): SliderAttribute;

  /**
   * Called when the maximum label is set.
   * @since 7
   * @deprecated since 9
   * @useinstead max
   */
  maxLabel(value: string): SliderAttribute;

  /**
   * Called when setting whether to display step size.
   * @since 7
   */
  /**
   * Called when setting whether to display step size.
   * @form
   * @since 9
   */
  showSteps(value: boolean): SliderAttribute;

  /**
   * Called when the percentage of bubble prompt is set when sliding.
   * @since 7
   */
  /**
   * Called when the percentage of bubble prompt is set when sliding.
   * @form
   * @since 9
   */
  showTips(value: boolean): SliderAttribute;

  /**
   * Called when the thickness of track is set.
   * @since 8
   */
  /**
   * Called when the thickness of track is set.
   * @form
   * @since 9
   */
  trackThickness(value: Length): SliderAttribute;

  /**
   * Called when the selection value changes.
   * @since 7
   */
  /**
   * Called when the selection value changes.
   * @form
   * @since 9
   */
  onChange(callback: (value: number, mode: SliderChangeMode) => void): SliderAttribute;
}

/**
 * Defines Slider Component.
 * @since 7
 */
/**
 * Defines Slider Component.
 * @form
 * @since 9
 */
declare const Slider: SliderInterface;

/**
 * Defines Slider Component instance.
 * @since 7
 */
/**
 * Defines Slider Component instance.
 * @form
 * @since 9
 */
declare const SliderInstance: SliderAttribute;
