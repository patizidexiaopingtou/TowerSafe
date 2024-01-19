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
 * common enum of color
 * @since 7
 */
/**
 * common enum of color
 * @form
 * @since 9
 */
declare enum Color {
  /**
   * White.
   * @since 7
   */
  /**
   * White.
   * @form
   * @since 9
   */
  White,

  /**
   * Black.
   * @since 7
   */
  /**
   * Black.
   * @form
   * @since 9
   */
  Black,

  /**
   * Blue.
   * @since 7
   */
  /**
   * Blue.
   * @form
   * @since 9
   */
  Blue,

  /**
   * Brown.
   * @since 7
   */
  /**
   * Brown.
   * @form
   * @since 9
   */
  Brown,

  /**
   * Gray.
   * @since 7
   */
  /**
   * Gray.
   * @form
   * @since 9
   */
  Gray,

  /**
   * Green.
   * @since 7
   */
  /**
   * Green.
   * @form
   * @since 9
   */
  Green,

  /**
   * Grey.
   * @since 7
   */
  /**
   * Grey.
   * @form
   * @since 9
   */
  Grey,

  /**
   * Orange.
   * @since 7
   */
  /**
   * Orange.
   * @form
   * @since 9
   */
  Orange,

  /**
   * color.
   * @since 7
   */
  /**
   * color.
   * @form
   * @since 9
   */
  Pink,

  /**
   * Red.
   * @since 7
   */
  /**
   * Red.
   * @form
   * @since 9
   */
  Red,

  /**
   * Yellow.
   * @since 7
   */
  /**
   * Yellow.
   * @form
   * @since 9
   */
  Yellow,

  /**
   * Transparent.
   * @form
   * @since 9
   */
  Transparent,
}

/**
 * Image display mode
 * @since 7
 */
/**
 * Image display mode.
 * @form
 * @since 9
 */
declare enum ImageFit {
  /**
   * Keep the aspect ratio to zoom out or zoom in so that the image is completely displayed within the display boundary.
   * @since 7
   */
  /**
   * Keep the aspect ratio to zoom out or zoom in so that the image is completely displayed within the display boundary.
   * @form
   * @since 9
   */
  Contain,

  /**
   * Keep the aspect ratio to zoom out or zoom in so that both sides of the image are greater than or equal to the display boundary.
   * @since 7
   */
  /**
   * Keep the aspect ratio to zoom out or zoom in so that both sides of the image are greater than or equal to the display boundary.
   * @form
   * @since 9
   */
  Cover,

  /**
   * Adaptive display
   * @since 7
   */
  /**
   * Adaptive display
   * @form
   * @since 9
   */
  Auto,

  /**
   * Zoom in or out without maintaining the aspect ratio so that the image fills the display boundary.
   * @since 7
   */
  /**
   * Zoom in or out without maintaining the aspect ratio so that the image fills the display boundary.
   * @form
   * @since 9
   */
  Fill,

  /**
   * Keep the aspect ratio displayed, and the image zooms out or remains unchanged.
   * @since 7
   */
  /**
   * Keep the aspect ratio displayed, and the image zooms out or remains unchanged.
   * @form
   * @since 9
   */
  ScaleDown,

  /**
   * Keep the original size and display it in the center.
   * @since 7
   */
  /**
   * Keep the original size and display it in the center.
   * @form
   * @since 9
   */
  None,
}

/**
 * Border Style
 * @since 7
 */
/**
 * Border Style
 * @form
 * @since 9
 */
declare enum BorderStyle {
  /**
   * Displays as a series of dots with a radius of half the borderWidth.
   * @since 7
   */
  /**
   * Displays as a series of dots with a radius of half the borderWidth.
   * @form
   * @since 9
   */
  Dotted,

  /**
   * Shows as a series of short square dashed lines.
   * @since 7
   */
  /**
   * Shows as a series of short square dashed lines.
   * @form
   * @since 9
   */
  Dashed,

  /**
   * Shows as a solid line.
   * @since 7
   */
  /**
   * Shows as a solid line.
   * @form
   * @since 9
   */
  Solid,
}

/**
 * Line Join Style
 * @since 7
 */
/**
 * Line Join Style
 * @form
 * @since 9
 */
declare enum LineJoinStyle {
  /**
   * Connect path segments using bevels.
   * @since 7
   */
  /**
   * Connect path segments using bevels.
   * @form
   * @since 9
   */
  Miter,

  /**
   * Connect path segments using sharp corners.
   * @since 7
   */
  /**
   * Connect path segments using sharp corners.
   * @form
   * @since 9
   */
  Round,

  /**
   * Connect path segments using fillets.
   * @since 7
   */
  /**
   * Connect path segments using fillets.
   * @form
   * @since 9
   */
  Bevel,
}

/**
 * Function Called by Touch
 * @since 7
 */
/**
 * Function Called by Touch
 * @form
 * @since 9
 */
declare enum TouchType {
  /**
   * Triggered when the finger is pressed.
   * @since 7
   */
  /**
   * Triggered when the finger is pressed.
   * @form
   * @since 9
   */
  Down,

  /**
   * Triggered when the finger is raised.
   * @since 7
   */
  /**
   * Triggered when the finger is raised.
   * @form
   * @since 9
   */
  Up,

  /**
   * Triggered when the finger presses on the screen.
   * @since 7
   */
  /**
   * Triggered when the finger presses on the screen.
   * @form
   * @since 9
   */
  Move,

  /**
   * Triggers when the touch event cancels.
   * @since 7
   */
  /**
   * Triggers when the touch event cancels.
   * @form
   * @since 9
   */
  Cancel,
}

/**
 * Function Called by Mouse
 * @since 8
 */
/**
 * Function Called by Mouse
 * @form
 * @since 9
 */
declare enum MouseButton {
  /**
   * Mouse Left Button.
   * @since 8
   */
  /**
   * Mouse Left Button.
   * @form
   * @since 9
   */
  Left,

  /**
   * Mouse Right Button.
   * @since 8
   */
  /**
   * Mouse Right Button.
   * @form
   * @since 9
   */
  Right,

  /**
   * Mouse Middle Button.
   * @since 8
   */
  /**
   * Mouse Middle Button.
   * @form
   * @since 9
   */
  Middle,

  /**
   * Mouse Back Button.
   * @since 8
   */
  /**
   * Mouse Back Button.
   * @form
   * @since 9
   */
  Back,

  /**
   * Mouse Forward Button.
   * @since 8
   */
  /**
   * Mouse Forward Button.
   * @form
   * @since 9
   */
  Forward,

  /**
   * Mouse None Button.
   * @since 8
   */
  /**
   * Mouse None Button.
   * @form
   * @since 9
   */
  None,
}

/**
 * Function Called by Mouse
 * @since 8
 */
/**
 * Function Called by Mouse
 * @form
 * @since 9
 */
declare enum MouseAction {
  /**
   * Triggered when the mouse is pressed.
   * @since 8
   */
  /**
   * Triggered when the mouse is pressed.
   * @form
   * @since 9
   */
  Press,

  /**
   * Triggered when the mouse is released.
   * @since 8
   */
  /**
   * Triggered when the mouse is released.
   * @form
   * @since 9
   */
  Release,

  /**
   * Triggered when the mouse is Moved.
   * @since 8
   */
  /**
   * Triggered when the mouse is Moved.
   * @form
   * @since 9
   */
  Move,

  /**
   * Triggered when the mouse is Hovered.
   * @since 8
   */
  /**
   * Triggered when the mouse is Hovered.
   * @form
   * @since 9
   */
  Hover
}

/**
 * Animation status.
 * @since 7
 */
/**
 * Animation status.
 * @form
 * @since 9
 */
declare enum AnimationStatus {
  /**
   * Initial state of the animation.
   * @since 7
   */
  /**
   * Initial state of the animation.
   * @form
   * @since 9
   */
  Initial,

  /**
   * The animation is playing.
   * @since 7
   */
  /**
   * The animation is playing.
   * @form
   * @since 9
   */
  Running,

  /**
   * The animation is paused.
   * @since 7
   */
  /**
   * The animation is paused.
   * @form
   * @since 9
   */
  Paused,

  /**
   * The animation is stopped.
   * @since 7
   */
  /**
   * The animation is stopped.
   * @form
   * @since 9
   */
  Stopped,
}

/**
 * Sets the animation playback mode. By default, the animation starts to play again after the playback is complete.
 * @since 7
 */
/**
 * Sets the animation playback mode. By default, the animation starts to play again after the playback is complete.
 * @form
 * @since 9
 */
declare enum Curve {
  /**
   * Indicates that the speed of the animation is the same from start to finish.
   * @since 7
   */
  /**
   * Indicates that the speed of the animation is the same from start to finish.
   * @form
   * @since 9
   */
  Linear,

  /**
   * Indicates that the animation starts at a low speed, then accelerates, and then slows down before it ends, CubicBezier(0.25, 0.1, 0.25, 1.0).
   * @since 7
   */
  /**
   * Indicates that the animation starts at a low speed, then accelerates, and then slows down before it ends, CubicBezier(0.25, 0.1, 0.25, 1.0).
   * @form
   * @since 9
   */
  Ease,

  /**
   * Indicates that the animation starts at a low speed, CubicBezier(0.42, 0.0, 1.0, 1.0).
   * @since 7
   */
  /**
   * Indicates that the animation starts at a low speed, CubicBezier(0.42, 0.0, 1.0, 1.0).
   * @form
   * @since 9
   */
  EaseIn,

  /**
   * Indicates that the animation ends at a low speed, CubicBezier(0.0, 0.0, 0.78, 1.0).
   * @since 7
   */
  /**
   * Indicates that the animation ends at a low speed, CubicBezier(0.0, 0.0, 0.78, 1.0).
   * @form
   * @since 9
   */
  EaseOut,

  /**
   * Indicates that the animation starts and ends at a slow speed, CubicBezier(0.42, 0.0, 0.78, 1.0).
   * @since 7
   */
  /**
   * Indicates that the animation starts and ends at a slow speed, CubicBezier(0.42, 0.0, 0.78, 1.0).
   * @form
   * @since 9
   */
  EaseInOut,

  /**
   * Slow-in, fast-out
   * @since 7
   */
  /**
   * Slow-in, fast-out
   * @form
   * @since 9
   */
  FastOutSlowIn,

  /**
   * Linear Out Slow In
   * @since 7
   */
  /**
   * Linear Out Slow In
   * @form
   * @since 9
   */
  LinearOutSlowIn,

  /**
   * Fast Out Linear In.
   * @since 7
   */
  /**
   * Fast Out Linear In.
   * @form
   * @since 9
   */
  FastOutLinearIn,

  /**
   * Extreme Deceleration.
   * @since 7
   */
  /**
   * Extreme Deceleration.
   * @form
   * @since 9
   */
  ExtremeDeceleration,

  /**
   * Sharp.
   * @since 7
   */
  /**
   * Sharp.
   * @form
   * @since 9
   */
  Sharp,

  /**
   * Rhythm.
   * @since 7
   */
  /**
   * Rhythm.
   * @form
   * @since 9
   */
  Rhythm,

  /**
   * Smooth.
   * @since 7
   */
  /**
   * Smooth.
   * @form
   * @since 9
   */
  Smooth,

  /**
   * Damping curve, CubicBezier(0.2, 0.0, 0.2, 1.0).
   * @since 7
   */
  /**
   * Damping curve, CubicBezier(0.2, 0.0, 0.2, 1.0).
   * @form
   * @since 9
   */
  Friction,
}

/**
 * Sets the state before and after the animation starts.
 * @since 7
 */
/**
 * Sets the state before and after the animation starts.
 * @form
 * @since 9
 */
declare enum FillMode {
  /**
   * Restores to the initial state after the playback is complete.
   * @since 7
   */
  /**
   * Restores to the initial state after the playback is complete.
   * @form
   * @since 9
   */
  None,

  /**
   * Retains the state at the end of the animation when the playback is complete.
   * @since 7
   */
  /**
   * Retains the state at the end of the animation when the playback is complete.
   * @form
   * @since 9
   */
  Forwards,

  /**
   * Applies the start attribute value for the period specified by animation-delay before the animation is displayed.
   * @since 7
   */
  /**
   * Applies the start attribute value for the period specified by animation-delay before the animation is displayed.
   * @form
   * @since 9
   */
  Backwards,

  /**
   * Both forward and backward fill modes are applied.
   * @since 7
   */
  /**
   * Both forward and backward fill modes are applied.
   * @form
   * @since 9
   */
  Both,
}

/**
 * Play Mode
 * @since 7
 */
/**
 * Play Mode
 * @form
 * @since 9
 */
declare enum PlayMode {
  /**
   * The animation plays normally.
   * @since 7
   */
  /**
   * The animation plays normally.
   * @form
   * @since 9
   */
  Normal,

  /**
   * The animation plays backwards.
   * @since 7
   */
  /**
   * The animation plays backwards.
   * @form
   * @since 9
   */
  Reverse,

  /**
   * The animation plays forward on odd numbers (1, 3, 7...) and backward on even numbers (2, 4, 6...).
   * @since 7
   */
  /**
   * The animation plays forward on odd numbers (1, 3, 7...) and backward on even numbers (2, 4, 6...).
   * @form
   * @since 9
   */
  Alternate,

  /**
   * The animation plays backwards on odd numbers (1, 3, 7...) and forwards on even numbers (2, 4, 6...)..
   * @since 7
   */
  /**
   * The animation plays backwards on odd numbers (1, 3, 7...) and forwards on even numbers (2, 4, 6...)..
   * @form
   * @since 9
   */
  AlternateReverse,
}

/**
 * Type of a key.
 * @since 7
 */
/**
 * Type of a key.
 * @form
 * @since 9
 */
declare enum KeyType {
  /**
   * Press the key.
   * @since 7
   */
  /**
   * Press the key.
   * @form
   * @since 9
   */
  Down,

  /**
   * The key is released.
   * @since 7
   */
  /**
   * The key is released.
   * @form
   * @since 9
   */
  Up,
}

/**
 * Type of the input device that triggers the current key.
 * @since 7
 */
/**
 * Type of the input device that triggers the current key.
 * @form
 * @since 9
 */
declare enum KeySource {
  /**
   * The input device type is unknown.
   * @since 7
   */
  /**
   * The input device type is unknown.
   * @form
   * @since 9
   */
  Unknown,

  /**
   * Set Device Type to Keyboard.
   * @since 7
   */
  /**
   * Set Device Type to Keyboard.
   * @form
   * @since 9
   */
  Keyboard,
}

/**
 * Edge.
 * @since 7
 */
/**
 * Edge.
 * @form
 * @since 9
 */
declare enum Edge {
  /**
   * The top is centered horizontally.
   * @since 7
   */
  /**
   * The top is centered horizontally.
   * @form
   * @since 9
   */
  Top,

  /**
   * Center horizontal and vertical.
   * @since 7
   * @deprecated since 9
   */
  Center,

  /**
   * The bottom is centered horizontally.
   * @since 7
   */
  /**
   * The bottom is centered horizontally.
   * @form
   * @since 9
   */
  Bottom,

  /**
   * Cross axis direction text baseline alignment.
   * @since 7
   * @deprecated since 9
   */
  Baseline,

  /**
   * Align the head of the cross axis direction.
   * @since 7
   */
  /**
   * Align the head of the cross axis direction.
   * @form
   * @since 9
   */
  Start,

  /**
   * Middle
   * @since 7
   * @deprecated since 9
   */
  Middle,

  /**
   * Align the head of the cross axis direction.
   * @since 7
   */
  /**
   * Align the head of the cross axis direction.
   * @form
   * @since 9
   */
  End,
}

/**
 * Set Weekend
 * @since 7
 */
/**
 * Set Weekend
 * @form
 * @since 9
 */
declare enum Week {
  /**
   * Monday.
   * @since 7
   */
  /**
   * Monday.
   * @form
   * @since 9
   */
  Mon,

  /**
   * Tuesday.
   * @since 7
   */
  /**
   * Tuesday.
   * @form
   * @since 9
   */
  Tue,

  /**
   * Wednesday.
   * @since 7
   */
  /**
   * Wednesday.
   * @form
   * @since 9
   */
  Wed,

  /**
   * Thursday.
   * @since 7
   */
  /**
   * Thursday.
   * @form
   * @since 9
   */
  Thur,

  /**
   * Friday.
   * @since 7
   */
  /**
   * Friday.
   * @form
   * @since 9
   */
  Fri,

  /**
   * Saturday.
   * @since 7
   */
  /**
   * Saturday.
   * @form
   * @since 9
   */
  Sat,

  /**
   * Sunday.
   * @since 7
   */
  /**
   * Sunday.
   * @form
   * @since 9
   */
  Sun,
}

/**
 * Sets the horizontal layout of elements.
 * @since 7
 */
/**
 * Sets the horizontal layout of elements.
 * @form
 * @since 9
 */
declare enum Direction {
  /**
   * Elements are laid out from left to right.
   * @since 7
   */
  /**
   * Elements are laid out from left to right.
   * @form
   * @since 9
   */
  Ltr,

  /**
   * Elements are laid out from right to left.
   * @since 7
   */
  /**
   * Elements are laid out from right to left.
   * @form
   * @since 9
   */
  Rtl,

  /**
   * Use the default layout direction.
   * @since 7
   */
  /**
   * Use the default layout direction.
   * @form
   * @since 9
   */
  Auto,
}

/**
 * Used to set the status of the scroll bar.
 * @since 7
 */
/**
 * Used to set the status of the scroll bar.
 * @form
 * @since 9
 */
declare enum BarState {
  /**
   * Not displayed.
   * @since 7
   */
  /**
   * Not displayed.
   * @form
   * @since 9
   */
  Off,

  /**
   * On-demand display (displayed when you touch it and disappears after 2 seconds).
   * @since 7
   */
  /**
   * On-demand display (displayed when you touch it and disappears after 2 seconds).
   * @form
   * @since 9
   */
  Auto,

  /**
   * Resident display.
   * @since 7
   */
  /**
   * Resident display.
   * @form
   * @since 9
   */
  On,
}

/**
 * Sliding effect
 * @since 7
 */
/**
 * Sliding effect
 * @form
 * @since 9
 */
declare enum EdgeEffect {
  /**
   * Elastic physical action, sliding to the edge can continue to slide for a distance based on the initial speed or touch event, and spring back when released.
   * @since 7
   */
  /**
   * Elastic physical action, sliding to the edge can continue to slide for a distance based on the initial speed or touch event, and spring back when released.
   * @form
   * @since 9
   */
  Spring,

  /**
   * Fade.
   * @since 7
   */
  /**
   * Fade.
   * @form
   * @since 9
   */
  Fade,

  /**
   * Sliding to the edge has no effect.
   * @since 7
   */
  /**
   * Sliding to the edge has no effect.
   * @form
   * @since 9
   */
  None,
}

/**
 * Alignment enumeration description.
 * @since 7
 */
/**
 * Alignment enumeration description.
 * @form
 * @since 9
 */
declare enum Alignment {
  /**
   * Top Start.
   * @since 7
   */
  /**
   * Top Start.
   * @form
   * @since 9
   */
  TopStart,

  /**
   * The top is centered horizontally.
   * @since 7
   */
  /**
   * The top is centered horizontally.
   * @form
   * @since 9
   */
  Top,

  /**
   * Top tail end.
   * @since 7
   */
  /**
   * Top tail end.
   * @form
   * @since 9
   */
  TopEnd,

  /**
   * The starting end is centered longitudinally.
   * @since 7
   */
  /**
   * The starting end is centered longitudinally.
   * @form
   * @since 9
   */
  Start,

  /**
   * Center horizontal and vertical.
   * @since 7
   */
  /**
   * Center horizontal and vertical.
   * @form
   * @since 9
   */
  Center,

  /**
   * The tail end is centered longitudinally.
   * @since 7
   */
  /**
   * The tail end is centered longitudinally.
   * @form
   * @since 9
   */
  End,

  /**
   * Bottom starting end.
   * @since 7
   */
  /**
   * Bottom starting end.
   * @form
   * @since 9
   */
  BottomStart,

  /**
   * The bottom is centered horizontally.
   * @since 7
   */
  /**
   * The bottom is centered horizontally.
   * @form
   * @since 9
   */
  Bottom,

  /**
   * Bottom end.
   * @since 7
   */
  /**
   * Bottom end.
   * @form
   * @since 9
   */
  BottomEnd,
}

/**
 * TransitionType enumeration description.
 * @since 7
 */
/**
 * TransitionType enumeration description.
 * @form
 * @since 9
 */
declare enum TransitionType {
  /**
   * Specifies that the current transition action takes effect in all change scenarios of the component.
   * @since 7
   */
  /**
   * Specifies that the current transition action takes effect in all change scenarios of the component.
   * @form
   * @since 9
   */
  All,

  /**
   * Specifies the insertion scenario in which the current transition action takes effect.
   * @since 7
   */
  /**
   * Specifies the insertion scenario in which the current transition action takes effect.
   * @form
   * @since 9
   */
  Insert,

  /**
   * Specifies the deletion scenario in which the current transition action takes effect.
   * @since 7
   */
  /**
   * Specifies the deletion scenario in which the current transition action takes effect.
   * @form
   * @since 9
   */
  Delete,
}

/**
 * RelateType enumeration description
 * @since 7
 */
/**
 * RelateType enumeration description
 * @form
 * @since 9
 */
declare enum RelateType {
  /**
   * Scales the current component to fill the parent component.
   * @since 7
   */
  /**
   * Scales the current component to fill the parent component.
   * @form
   * @since 9
   */
  FILL,

  /**
   * Scales the current component to fit the parent component.
   * @since 7
   */
  /**
   * Scales the current component to fit the parent component.
   * @form
   * @since 9
   */
  FIT,
}

/**
 * Controls the display or hide of the current component
 * @since 7
 */
/**
 * Controls the display or hide of the current component
 * @form
 * @since 9
 */
declare enum Visibility {
  /**
   * Show
   * @since 7
   */
  /**
   * Show
   * @form
   * @since 9
   */
  Visible,

  /**
   * Hide, but participate in layout for placeholder.
   * @since 7
   */
  /**
   * Hide, but participate in layout for placeholder.
   * @form
   * @since 9
   */
  Hidden,

  /**
   * Hides but does not participate in layout and does not take place.
   * @since 7
   */
  /**
   * Hides but does not participate in layout and does not take place.
   * @form
   * @since 9
   */
  None,
}

/**
 * LineCapStyle enumeration description
 * @since 7
 */
/**
 * LineCapStyle enumeration description
 * @form
 * @since 9
 */
declare enum LineCapStyle {
  /**
   * The two ends of the dividing line are parallel lines.
   * @since 7
   */
  /**
   * The two ends of the dividing line are parallel lines.
   * @form
   * @since 9
   */
  Butt,

  /**
   * The two ends of the dividing line are semicircles.
   * @since 7
   */
  /**
   * The two ends of the dividing line are semicircles.
   * @form
   * @since 9
   */
  Round,

  /**
   * Extends half a circle at the end of the path with a width equal to half the line width and a height equal to the line width.
   * @since 7
   */
  /**
   * Extends half a circle at the end of the path with a width equal to half the line width and a height equal to the line width.
   * @form
   * @since 9
   */
  Square,
}

/**
 * Axis enumeration description.
 * @since 7
 */
/**
 * Axis enumeration description.
 * @form
 * @since 9
 */
declare enum Axis {
  /**
   * Longitudinal arrangement
   * @since 7
   */
  /**
   * Longitudinal arrangement
   * @form
   * @since 9
   */
  Vertical,

  /**
   * Horizontal arrangement.
   * @since 7
   */
  /**
   * Horizontal arrangement.
   * @form
   * @since 9
   */
  Horizontal,
}

/**
 * HorizontalAlign enumeration description.
 * @since 7
 */
/**
 * HorizontalAlign enumeration description.
 * @form
 * @since 9
 */
declare enum HorizontalAlign {
  /**
   * Aligns the start end in the language direction.
   * @since 7
   */
  /**
   * Aligns the start end in the language direction.
   * @form
   * @since 9
   */
  Start,

  /**
   * Center alignment. The default alignment mode is used.
   * @since 7
   */
  /**
   * Center alignment. The default alignment mode is used.
   * @form
   * @since 9
   */
  Center,

  /**
   * Aligns the ends in the language direction.
   * @since 7
   */
  /**
   * Aligns the ends in the language direction.
   * @form
   * @since 9
   */
  End,
}

/**
 * FlexAlign enumeration description.
 * @since 7
 */
/**
 * FlexAlign enumeration description.
 * @form
 * @since 9
 */
declare enum FlexAlign {
  /**
   * The element is aligned at the head of the principal axis,
   * the first element is aligned with the head of the row, and subsequent elements are aligned with the previous one.
   * @since 7
   */
  /**
   * The element is aligned at the head of the principal axis,
   * the first element is aligned with the head of the row, and subsequent elements are aligned with the previous one.
   * @form
   * @since 9
   */
  Start,

  /**
   * The elements are centered in the direction of the principal axis,
   * and the first element is the same distance from the beginning of the row as the last element is from the end of the row.
   * @since 7
   */
  /**
   * The elements are centered in the direction of the principal axis,
   * and the first element is the same distance from the beginning of the row as the last element is from the end of the row.
   * @form
   * @since 9
   */
  Center,

  /**
   * The element is aligned at the tail of the principal axis,
   * the last element is aligned at the end of the row, and the other elements are aligned with the next.
   * @since 7
   */
  /**
   * The element is aligned at the tail of the principal axis,
   * the last element is aligned at the end of the row, and the other elements are aligned with the next.
   * @form
   * @since 9
   */
  End,

  /**
   * Elastic elements are evenly distributed in the direction of the Flex principal axis,
   * with the same distance between adjacent elements.
   * The first element aligns with the beginning of the line, and the last element aligns with the end of the line.
   * @since 7
   */
  /**
   * Elastic elements are evenly distributed in the direction of the Flex principal axis,
   * with the same distance between adjacent elements.
   * The first element aligns with the beginning of the line, and the last element aligns with the end of the line.
   * @form
   * @since 9
   */
  SpaceBetween,

  /**
   * Elastic elements are evenly distributed in the direction of the Flex principal axis,
   *  with the same distance between adjacent elements. Half the distance between adjacent elements as the distance between
   * the first element and the distance between the last element and the end of the row.
   * @since 7
   */
  /**
   * Elastic elements are evenly distributed in the direction of the Flex principal axis,
   *  with the same distance between adjacent elements. Half the distance between adjacent elements as the distance between
   * the first element and the distance between the last element and the end of the row.
   * @form
   * @since 9
   */
  SpaceAround,

  /**
   * Elements in the Flex axis direction are evenly spaced.
   * The spacing between adjacent elements, the spacing between the first element and the beginning of the row,
   * and the spacing between the last element and the end of the row are the same.
   * @since 7
   */
  /**
   * Elements in the Flex axis direction are evenly spaced.
   * The spacing between adjacent elements, the spacing between the first element and the beginning of the row,
   * and the spacing between the last element and the end of the row are the same.
   * @form
   * @since 9
   */
  SpaceEvenly,
}

/**
 * ItemAlign enumeration description
 * @since 7
 */
/**
 * ItemAlign enumeration description
 * @form
 * @since 9
 */
declare enum ItemAlign {
  /**
   * Use the default configuration in the Flex container.
   * @since 7
   */
  /**
   * Use the default configuration in the Flex container.
   * @form
   * @since 9
   */
  Auto,

  /**
   * The element is in the Flex container with the cross-axis direction head aligned.
   * @since 7
   */
  /**
   * The element is in the Flex container with the cross-axis direction head aligned.
   * @form
   * @since 9
   */
  Start,

  /**
   * The element is centered in the Flex container with the cross axis direction aligned.
   * @since 7
   */
  /**
   * The element is centered in the Flex container with the cross axis direction aligned.
   * @form
   * @since 9
   */
  Center,

  /**
   * The element is bottom aligned in the Flex container with the cross axis direction.
   * @since 7
   */
  /**
   * The element is bottom aligned in the Flex container with the cross axis direction.
   * @form
   * @since 9
   */
  End,

  /**
   * Element In the Flex container, the cross-axis direction text baseline is aligned.
   * @since 7
   */
  /**
   * Element In the Flex container, the cross-axis direction text baseline is aligned.
   * @form
   * @since 9
   */
  Baseline,

  /**
   * Element In a Flex container, the fill is stretched across the axis and, when no dimension is set, to the container size.
   * @since 7
   */
  /**
   * Element In a Flex container, the fill is stretched across the axis and, when no dimension is set, to the container size.
   * @form
   * @since 9
   */
  Stretch,
}

/**
 * FlexDirection enumeration description
 * @since 7
 */
/**
 * FlexDirection enumeration description
 * @form
 * @since 9
 */
declare enum FlexDirection {
  /**
   * The main axis is consistent with the row direction as the layout mode.
   * @since 7
   */
  /**
   * The main axis is consistent with the row direction as the layout mode.
   * @form
   * @since 9
   */
  Row,

  /**
   * The main axis is consistent with the column direction as the layout mode.
   * @since 7
   */
  /**
   * The main axis is consistent with the column direction as the layout mode.
   * @form
   * @since 9
   */
  Column,

  /**
   * The layout is in the opposite direction to the Row direction.
   * @since 7
   */
  /**
   * The layout is in the opposite direction to the Row direction.
   * @form
   * @since 9
   */
  RowReverse,

  /**
   * Layout in the opposite direction to the column.
   * @since 7
   */
  /**
   * Layout in the opposite direction to the column.
   * @form
   * @since 9
   */
  ColumnReverse,
}

/**
 * FlexWrap enumeration description
 * @since 7
 */
/**
 * FlexWrap enumeration description
 * @form
 * @since 9
 */
declare enum FlexWrap {
  /**
   * The Flex container has a single row/column layout of elements, and children are allowed to go beyond the container.
   * @since 7
   */
  /**
   * The Flex container has a single row/column layout of elements, and children are allowed to go beyond the container.
   * @form
   * @since 9
   */
  NoWrap,

  /**
   * The elements of the Flex container are arranged in multiple rows or columns, and the sub-items are allowed to exceed the container.
   * @since 7
   */
  /**
   * The elements of the Flex container are arranged in multiple rows or columns, and the sub-items are allowed to exceed the container.
   * @form
   * @since 9
   */
  Wrap,

  /**
   * The elements of the Flex container are arranged in reverse multiple rows/columns, and children are allowed to exceed the container.
   * @since 7
   */
  /**
   * The elements of the Flex container are arranged in reverse multiple rows/columns, and children are allowed to exceed the container.
   * @form
   * @since 9
   */
  WrapReverse,
}

/**
 * VerticalAlign enumeration description
 * @since 7
 */
/**
 * VerticalAlign enumeration description
 * @form 
 * @since 9
 */
declare enum VerticalAlign {
  /**
   * Top alignment.
   * @since 7
   */
  /**
   * Top alignment.
   * @form
   * @since 9
   */
  Top,

  /**
   * Center alignment. The default alignment mode is used.
   * @since 7
   */
  /**
   * Center alignment. The default alignment mode is used.
   * @form
   * @since 9
   */
  Center,

  /**
   * Bottom alignment.
   * @since 7
   */
  /**
   * Bottom alignment.
   * @form
   * @since 9
   */
  Bottom,
}

/**
 * ImageRepeat enumeration description
 * @since 7
 */
/**
 * ImageRepeat enumeration description
 * @form
 * @since 9
 */
declare enum ImageRepeat {
  /**
   * Do not draw the picture again.
   * @since 7
   */
  /**
   * Do not draw the picture again.
   * @form
   * @since 9
   */
  NoRepeat,

  /**
   * Repeat the drawing only on the horizontal axis.
   * @since 7
   */
  /**
   * Repeat the drawing only on the horizontal axis.
   * @form
   * @since 9
   */
  X,

  /**
   * Repeat the drawing only on the vertical axis.
   * @since 7
   */
  /**
   * Repeat the drawing only on the vertical axis.
   * @form
   * @since 9
   */
  Y,

  /**
   * Draw the picture repeatedly on both axes.
   * @since 7
   */
  /**
   * Draw the picture repeatedly on both axes.
   * @form
   * @since 9
   */
  XY,
}

/**
 * ImageSize enumeration description
 * @since 7
 */
/**
 * ImageSize enumeration description
 * @form
 * @since 9
 */
declare enum ImageSize {
  /**
   * Keep the scale of the original image unchanged.
   * @since 7
   */
  /**
   * Keep the scale of the original image unchanged.
   * @form
   * @since 9
   */
  Auto,

  /**
   * Default value. Keep the aspect ratio to zoom in or out the image so that both sides of the image are greater than or equal to the display boundary.
   * @since 7
   */
  /**
   * Default value. Keep the aspect ratio to zoom in or out the image so that both sides of the image are greater than or equal to the display boundary.
   * @form
   * @since 9
   */
  Cover,

  /**
   * Keep the aspect ratio to zoom out or zoom in so that the image is completely displayed within the display boundary.
   * @since 7
   */
  /**
   * Keep the aspect ratio to zoom out or zoom in so that the image is completely displayed within the display boundary.
   * @form
   * @since 9
   */
  Contain,
}

/**
 * GradientDirection enumeration description
 * @since 7
 */
/**
 * GradientDirection enumeration description
 * @form
 * @since 9
 */
declare enum GradientDirection {
  /**
   * Right to left.
   * @since 7
   */
  /**
   * Right to left.
   * @form
   * @since 9
   */
  Left,

  /**
   * From the bottom up.
   * @since 7
   */
  /**
   * From the bottom up.
   * @form
   * @since 9
   */
  Top,

  /**
   * From left to right.
   * @since 7
   */
  /**
   * From left to right.
   * @form
   * @since 9
   */
  Right,

  /**
   * From the top down.
   * @since 7
   */
  /**
   * From the top down.
   * @form
   * @since 9
   */
  Bottom,

  /**
   * Top Left
   * @since 7
   */
  /**
   * Top Left
   * @form
   * @since 9
   */
  LeftTop,

  /**
   * Left Bottom
   * @since 7
   */
  /**
   * Left Bottom
   * @form
   * @since 9
   */
  LeftBottom,

  /**
   * Right Top
   * @since 7
   */
  /**
   * Right Top
   * @form
   * @since 9
   */
  RightTop,

  /**
   * Right Bottom
   * @since 7
   */
  /**
   * Right Bottom
   * @form
   * @since 9
   */
  RightBottom,

  /**
   * None
   * @since 7
   */
  /**
   * None
   * @form
   * @since 9
   */
  None,
}

/**
 * SharedTransitionEffectType enumeration description
 * @since 7
 */
/**
 * SharedTransitionEffectType enumeration description
 * @form
 * @since 9
 */
declare enum SharedTransitionEffectType {
  /**
   * The location of the destination page element remains unchanged, and you can configure the transparency animation. Currently,
   * only the static effect configured for redirecting to the target page takes effect.
   * @since 7
   */
  /**
   * The location of the destination page element remains unchanged, and you can configure the transparency animation. Currently,
   * only the static effect configured for redirecting to the target page takes effect.
   * @form
   * @since 9
   */
  Static,

  /**
   * Move the source page element to the destination page element location and scale it appropriately.
   * @since 7
   */
  /**
   * Move the source page element to the destination page element location and scale it appropriately.
   * @form
   * @since 9
   */
  Exchange,
}

/**
 * Text style
 * @since 7
 */
/**
 * Text style
 * @form
 * @since 9
 */
declare enum FontStyle {
  /**
   * Default style.
   * @since 7
   */
  /**
   * Default style.
   * @form
   * @since 9
   */
  Normal,

  /**
   * Italic style.
   * @since 7
   */
  /**
   * Italic style.
   * @form
   * @since 9
   */
  Italic,
}

/**
 * The font weight of the text
 * @since 7
 */
/**
 * The font weight of the text
 * @form
 * @since 9
 */
declare enum FontWeight {
  /**
   * Defines a lighter value than [Inherited Value]..
   * @since 7
   */
  /**
   * Defines a lighter value than [Inherited Value]..
   * @form
   * @since 9
   */
  Lighter,

  /**
   * Normal font. Equivalent to a digital value of 400.
   * @since 7
   */
  /**
   * Normal font. Equivalent to a digital value of 400.
   * @form
   * @since 9
   */
  Normal,

  /**
   * Defines a more general value than [Inherited Value].
   * @since 7
   */
  /**
   * Defines a more general value than [Inherited Value].
   * @form
   * @since 9
   */
  Regular,

  /**
   * Defines a value that is more centered than [Inherited Value].
   * @since 7
   */
  /**
   * Defines a value that is more centered than [Inherited Value].
   * @form
   * @since 9
   */
  Medium,

  /**
   * Bold. Equivalent to a numeric value of 700.
   * @since 7
   */
  /**
   * Bold. Equivalent to a numeric value of 700.
   * @form
   * @since 9
   */
  Bold,

  /**
   * Defines a value that is heavier than [Inherited Value].
   * @since 7
   */
   /**
   * Defines a value that is heavier than [Inherited Value].
   * @form
   * @since 9
   */
  Bolder,
}

/**
 * Alignment of text.
 * @since 7
 */
/**
 * Alignment of text.
 * @form
 * @since 9
 */
declare enum TextAlign {
  /**
   * Center the text.
   * @since 7
   */
  /**
   * Center the text.
   * @form
   * @since 9
   */
  Center,

  /**
   * The text is aligned in the same direction as the writing
   * @since 7
   */
  /**
   * The text is aligned in the same direction as the writing
   * @form
   * @since 9
   */
  Start,

  /**
   * The text is aligned in the opposite direction of writing
   * @since 7
   */
  /**
   * The text is aligned in the opposite direction of writing
   * @form
   * @since 9
   */
  End,
}

/**
 * Declare how text overflows.
 * @since 7
 */
/**
 * Declare how text overflows.
 * @form
 * @since 9
 */
declare enum TextOverflow {
  /**
   * When the text is too long, it will be cropped and displayed.
   * @since 7
   */
  /**
   * When the text is too long, it will be cropped and displayed.
   * @form
   * @since 9
   */
  Clip,

  /**
   * If the text is too long, the text that cannot be displayed shall be replaced by ellipsis.
   * @since 7
   */
  /**
   * If the text is too long, the text that cannot be displayed shall be replaced by ellipsis.
   * @form
   * @since 9
   */
  Ellipsis,

  /**
   * Text is not cropped when it is too long.
   * @since 7
   */
  /**
   * Text is not cropped when it is too long.
   * @form
   * @since 9
   */
  None,
}

/**
 * Type of text modifier.
 * @since 7
 */
/**
 * Type of text modifier.
 * @form
 * @since 9
 */
declare enum TextDecorationType {
  /**
   * Do not use text decorative lines.
   * @since 7
   */
  /**
   * Do not use text decorative lines.
   * @form
   * @since 9
   */
  None,

  /**
   * Underline the words.
   * @since 7
   */
  /**
   * Underline the words.
   * @form
   * @since 9
   */
  Underline,

  /**
   * Text is in all uppercase.
   * @since 7
   */
  /**
   * Text is in all uppercase.
   * @form
   * @since 9
   */
  Overline,

  /**
   * A modifier line that passes through the text.
   * @since 7
   */
  /**
   * A modifier line that passes through the text.
   * @form
   * @since 9
   */
  LineThrough,
}

/**
 * Letter type in text
 * @since 7
 */
/**
 * Letter type in text
 * @form
 * @since 9
 */
declare enum TextCase {
  /**
   * The default is normal.
   * @since 7
   */
  /**
   * The default is normal.
   * @form
   * @since 9
   */
  Normal,

  /**
   * The text is all lowercase.
   * @since 7
   */
  /**
   * The text is all lowercase.
   * @form
   * @since 9
   */
  LowerCase,

  /**
   * The text is all uppercase.
   * @since 7
   */
  /**
   * The text is all uppercase.
   * @form
   * @since 9
   */
  UpperCase,
}

/**
 * ResponseType for contextMenu
 * @since 8
 */
/**
 * ResponseType for contextMenu
 * @form
 * @since 9
 */
declare enum ResponseType {
  /**
   * Right click.
   * @since 8
   */
  /**
   * Right click.
   * @form
   * @since 9
   */
  RightClick,

  /**
   * Long press.
   * @since 8
   */
  /**
   * Long press.
   * @form
   * @since 9
   */
  LongPress,
}

/**
 * HoverEffect enumeration description
 * @since 8
 */
/**
 * HoverEffect enumeration description
 * @form
 * @since 9
 */
declare enum HoverEffect {
  /**
   * Default effect
   * @since 8
   */
  /**
   * Default effect
   * @form
   * @since 9
   */
  Auto,

  /**
   * Zoom in and out effect
   * @since 8
   */
  /**
   * Zoom in and out effect
   * @form
   * @since 9
   */
  Scale,

  /**
   * Highlight effect
   * @since 8
   */
  /**
   * Highlight effect
   * @form
   * @since 9
   */
  Highlight,

  /**
   * None effect
   * @since 8
   */
  /**
   * None effect
   * @form
   * @since 9
   */
  None,
}

/**
 * Placement enumeration description
 * @since 8
 */
/**
 * Placement enumeration description
 * @form
 * @since 9
 */
declare enum Placement {
  /**
   * Left placement
   * @since 8
   */
  /**
   * Left placement
   * @form
   * @since 9
   */
  Left,

  /**
   * Right placement
   * @since 8
   */
  /**
   * Right placement
   * @form
   * @since 9
   */
  Right,

  /**
   * Top placement
   * @since 8
   */
  /**
   * Top placement
   * @form
   * @since 9
   */
  Top,

  /**
   * Bottom placement
   * @since 8
   */
  /**
   * Bottom placement
   * @form
   * @since 9
   */
  Bottom,

  /**
   * TopLeft placement
   * @since 8
   */
  /**
   * TopLeft placement
   * @form
   * @since 9
   */
  TopLeft,

  /**
   * TopRight placement
   * @since 8
   */
  /**
   * TopRight placement
   * @form
   * @since 9
   */
  TopRight,

  /**
   * BottomLeft placement
   * @since 8
   */
  /**
   * BottomLeft placement
   * @form
   * @since 9
   */
  BottomLeft,

  /**
   * BottomRight placement
   * @since 8
   */
  /**
   * BottomRight placement
   * @form
   * @since 9
   */
  BottomRight,

  /**
   * LeftTop placement
   * @form
   * @since 9
   */
  LeftTop,

  /**
   * LeftBottom placement
   * @form
   * @since 9
   */
  LeftBottom,

  /**
   * RightTop placement
   * @form
   * @since 9
   */
  RightTop,

  /**
   * RightBottom placement
   * @form
   * @since 9
   */
  RightBottom,
}

/**
 * Indicates the share option.
 *
 * @form
 * @since 9
 */
declare enum CopyOptions {
  /**
   * Not allow share.
   * @form
   * @since 9
   */
  None = 0,

  /**
   * Share in app.
   * @form
   * @since 9
   */
  InApp = 1,

  /**
   * Share in local device.
   * @form
   * @since 9
   */
  LocalDevice = 2,
}

/**
 * Defines the hit test mode.
 * @form
 * @since 9
 */
declare enum HitTestMode {
  /**
   * Both self and children nodes respond to the hit test for touch events,
   * but block hit test of the other nodes which is masked by this node.
   * @form
   * @since 9
   */
  Default,

  /**
   * Self respond to the hit test for touch events,
   * but block hit test of children and other nodes which is masked by this node.
   * @form
   * @since 9
   */
  Block,

  /**
   * Self and children respond to the hit test for touch events,
   * and allow hit test of other nodes which is masked by this node.
   * @form
   * @since 9
   */
  Transparent,

  /**
   * Self not respond to the hit test for touch events,
   * but children respond to the hit test for touch events.
   * @form
   * @since 9
   */
  None,
}

/**
 * Title height.
 * @form
 * @since 9
 */
declare enum TitleHeight {
  /**
   * Title height when only main title is available.
   * @form
   * @since 9
   */
  MainOnly,

  /**
   * Title height when main title and subtitle are both available.
   * @form
   * @since 9
   */
  MainWithSub,
}