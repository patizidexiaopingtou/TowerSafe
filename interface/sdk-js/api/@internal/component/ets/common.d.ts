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
 * Defining Component ClassDecorator
 * @since 7
 */
/**
 * Defining Component ClassDecorator
 * @form
 * @since 9
 */
declare const Component: ClassDecorator;

/**
 * Defines Entry ClassDecorator.
 * @returns { ClassDecorator } Entry is a ClassDecorator.
 * @since 7
 */
/**
 * Defines Entry ClassDecorator.
 * @returns { ClassDecorator & ((storage?: LocalStorage) => ClassDecorator) }
 * Entry is a ClassDecorator and it supports LocalStorage as parameters.
 * @form
 * @since 9
 */
declare const Entry: ClassDecorator & ((storage?: LocalStorage) => ClassDecorator);

/**
 * Defining Observed ClassDecorator.
 * @since 7
 */
/**
 * Defining Observed ClassDecorator.
 * @form
 * @since 9
 */
declare const Observed: ClassDecorator;

/**
 * Defining Preview ClassDecorator.
 * @since 7
 */
/**
 * Defining Preview ClassDecorator.
 * @form
 * @since 9
 */
declare const Preview: ClassDecorator & ((value: PreviewParams) => ClassDecorator);

/**
 * Defining BuilderParam PropertyDecorator
 * @since 7
 */
/**
 * Defining BuilderParam PropertyDecorator
 * @form
 * @since 9
 */
declare const BuilderParam: PropertyDecorator;

/**
 * Defining State PropertyDecorator.
 * @since 7
 */
/**
 * Defining State PropertyDecorator.
 * @form
 * @since 9
 */
declare const State: PropertyDecorator;

/**
 * Defining Prop PropertyDecorator.
 * @since 7
 */
/**
 * Defining Prop PropertyDecorator.
 * @form
 * @since 9
 */
declare const Prop: PropertyDecorator;

/**
 * Defining Link PropertyDecorator.
 * @since 7
 */
/**
 * Defining Link PropertyDecorator.
 * @form
 * @since 9
 */
declare const Link: PropertyDecorator;

/**
 * Defining ObjectLink PropertyDecorator.
 * @since 7
 */
/**
 * Defining ObjectLink PropertyDecorator.
 * @form
 * @since 9
 */
declare const ObjectLink: PropertyDecorator;

/**
 * Defining Provide PropertyDecorator.
 * @since 7
 */
/**
 * Defining Provide PropertyDecorator.
 * @form
 * @since 9
 */
declare const Provide: PropertyDecorator & ((value: string) => PropertyDecorator);

/**
 * Defining Consume PropertyDecorator.
 * @since 7
 */
/**
 * Defining Consume PropertyDecorator.
 * @form
 * @since 9
 */
declare const Consume: PropertyDecorator & ((value: string) => PropertyDecorator);

/**
 * Defining StorageProp PropertyDecorator.
 * @since 7
 */
declare const StorageProp: (value: string) => PropertyDecorator;

/**
 * Defining StorageLink PropertyDecorator.
 * @since 7
 */
declare const StorageLink: (value: string) => PropertyDecorator;

/**
 * Defining Watch PropertyDecorator.
 * @since 7
 */
/**
 * Defining Watch PropertyDecorator.
 * @form
 * @since 9
 */
declare const Watch: (value: string) => PropertyDecorator;

/**
 * Defining Builder MethodDecorator
 * @since 7
 */
/**
 * Defining Builder MethodDecorator
 * @form
 * @since 9
 */
declare const Builder: MethodDecorator;

/**
 * Defining Styles MethodDecorator
 * @since 8
 */
/**
 * Defining Styles MethodDecorator
 * @form
 * @since 9
 */
declare const Styles: MethodDecorator;

/**
 * Defining Extend MethodDecorator
 * @since 7
 */
/**
 * Defining Extend MethodDecorator
 * @form
 * @since 9
 */
declare const Extend: MethodDecorator & ((value: any) => MethodDecorator);

/**
 * Defining Concurrent MethodDecorator
 * @since 9
 */
declare const Concurrent: MethodDecorator;

/**
 * Defining  CustomDialog ClassDecorator
 * @since 7
 */
declare const CustomDialog: ClassDecorator;

/**
 * Defining LocalStorageLink PropertyDecorator.
 * @since 9
 */
declare const LocalStorageLink: (value: string) => PropertyDecorator;

/**
 * Defining LocalStorageProp PropertyDecorator
 * @form
 * @since 9
 */
declare const LocalStorageProp: (value: string) => PropertyDecorator;

/**
 * Obtains the Context object associated with a component on the page.
 * @param { Object } component - indicates the component on the page.
 * @StageModelOnly
 * @since 9
 */
declare function getContext(component?: Object): Context;

/**
 * Get context.
 * @StageModelOnly
 * @since 9
 */
declare type Context = import('../api/application/Context').default;

/**
 * Post Card Action.
 * @param { Object } component - indicate the card entry component.
 * @param { Object } action - indicate the router or message event.
 * @form
 * @StageModelOnly
 * @since 9
 */
 declare function postCardAction(component: Object, action: Object): void;

/**
 * Defines the data type of the interface restriction.
 * @since 7
 */
/**
 * Defines the data type of the interface restriction.
 * @form
 * @since 9
 */
declare interface Configuration {
  /**
   * Set colorMode.
   * @since 7
   */
  /**
   * Set colorMode.
   * @form
   * @since 9
   */
  readonly colorMode: string;

  /**
   * Set fontScale.
   * @since 7
   */
  /**
   * Set fontScale.
   * @form
   * @since 9
   */
  readonly fontScale: number;
}

/**
 * Defines the data type of the interface restriction.
 * @since 8
 */
/**
 * Defines the data type of the interface restriction.
 * @form
 * @since 9
 */
declare interface Rectangle {
  /**
   * x:Horizontal coordinate
   * @since 8
   */
  /**
   * x:Horizontal coordinate
   * @form
   * @since 9
   */
  x?: Length;

  /**
   * y:Vertical axis coordinate.
   * @since 8
   */
  /**
   * y:Vertical axis coordinate.
   * @form
   * @since 9
   */
  y?: Length;

  /**
   * Sets the width of the current touchRect.
   * @since 8
   */
  /**
   * Sets the width of the current touchRect.
   * @form
   * @since 9
   */
  width?: Length;

  /**
   * Sets the height of the current touchRect.
   * @since 8
   */
  /**
   * Sets the height of the current touchRect.
   * @form
   * @since 9
   */
  height?: Length;
}

/**
 * global $r function
 * @since 7
 */
/**
 * global $r function
 * @form
 * @since 9
 */
declare function $r(value: string, ...params: any[]): Resource;

/**
 * global $rawfile function
 * @since 7
 */
/**
 * global $rawfile function
 * @form
 * @since 9
 */
declare function $rawfile(value: string): Resource;

/**
 * Defines the animate function params.
 * @since 7
 */
/**
 * Defines the animate function params.
 * @form
 * @since 9
 */
declare interface AnimateParam {
  /**
   * Animation duration, in ms.
   * @since 7
   */
  /**
   * Animation duration, in ms.
   * @form
   * @since 9
   */
  duration?: number;
  /**
   * Animation playback speed. A larger value indicates faster animation playback, and a smaller value indicates slower
   * animation playback. The value 0 means that there is no animation.
   * @since 7
   */
  tempo?: number;
  /**
   * Animation curve.
   * @type { string | Curve}
   * @since 7
   */
  /**
   * Animation curve.
   * @type { string | Curve | ICurve}
   * @form
   * @since 9
   */
  curve?: Curve | string | ICurve;
  /**
   * Animation playback mode. By default, the animation is played from the beginning after the playback is complete.
   * @since 7
   */
  delay?: number;
  /**
   * Animation playback mode. By default, the animation is played from the beginning after the playback is complete.
   * @since 7
   */
  iterations?: number;
  /**
   * Animation playback mode. By default, the animation is played from the beginning after the playback is complete.
   * @since 7
   */
  /**
   * Animation playback mode. By default, the animation is played from the beginning after the playback is complete.
   * @form
   * @since 9
   */
  playMode?: PlayMode;
  /**
   * Callback invoked when the animation playback is complete.
   * @since 7
   */
  /**
   * Callback invoked when the animation playback is complete.
   * @form
   * @since 9
   */
  onFinish?: () => void;
}

/**
 * Interface for curve object.
 * @form
 * @since 9
 */
interface ICurve {
  /**
   * Get curve value by fraction.
   * @form
   * @since 9
   */ 
  interpolate(fraction : number) : number;
}

/**
 * Defines the motion path options.
 * @since 7
 */
declare interface MotionPathOptions {
  /**
   * The path info.
   * @since 7
   */
  path: string;
  /**
   * The origin point info.
   * @since 7
   */
  from?: number;
  /**
   * The distance point info.
   * @since 7
   */
  to?: number;
  /**
   * The rotate info.
   * @since 7
   */
  rotatable?: boolean;
}

/**
 * Defines the shard transition function params.
 * @since 7
 */
declare interface sharedTransitionOptions {
  /**
   * Animation duration, in ms.
   * @since 7
   */
  duration?: number;
  /**
   * Animation duration, in ms.
   * @since 7
   */
  curve?: Curve | string;
  /**
   * Animation playback mode. By default, the animation is played from the beginning after the playback is complete.
   * @since 7
   */
  delay?: number;
  /**
   * The motion path info.
   * @since 7
   */
  motionPath?: MotionPathOptions;
  /**
   * Z index info.
   * @since 7
   */
  zIndex?: number;
  /**
   * the animate type.
   * @since 7
   */
  type?: SharedTransitionEffectType;
}

/**
 * Defines the options of translate.
 * @since 7
 */
/**
 * Defines the options of translate.
 * @form
 * @since 9
 */
declare interface TranslateOptions {
  /**
   * The param of x direction.
   * @since 7
   */
  /**
   * The param of x direction.
   * @form
   * @since 9
   */
  x?: number | string;
  /**
   * The param of y direction.
   * @since 7
   */
  /**
   * The param of y direction.
   * @form
   * @since 9
   */
  y?: number | string;
  /**
   * The param of z direction.
   * @since 7
   */
  /**
   * The param of z direction.
   * @form
   * @since 9
   */
  z?: number | string;
}

/**
 * Defines the options of scale.
 * @since 7
 */
/**
 * Defines the options of scale.
 * @form
 * @since 9
 */
declare interface ScaleOptions {
  /**
   * The param of x direction.
   * @since 7
   */
  /**
   * The param of x direction.
   * @form
   * @since 9
   */
  x?: number;
  /**
   * The param of y direction.
   * @since 7
   */
  /**
   * The param of y direction.
   * @form
   * @since 9
   */
  y?: number;
  /**
   * The param of z direction.
   * @since 7
   */
  /**
   * The param of z direction.
   * @form
   * @since 9
   */
  z?: number;
  /**
   * The param of center point of x.
   * @since 7
   */
  /**
   * The param of center point of x.
   * @form
   * @since 9
   */
  centerX?: number | string;
  /**
   * The param of center point of y.
   * @since 7
   */
  /**
   * The param of center point of y.
   * @form
   * @since 9
   */
  centerY?: number | string;
}

/**
 * Defines the align rule options of relative container.
 * @form
 * @since 9
 */
declare interface AlignRuleOption {
  /**
   * The param of left align.
   * @form
   * @since 9
   */
  left?: { anchor: string, align: HorizontalAlign };
  /**
   * The param of right align.
   * @form
   * @since 9
   */
  right?: { anchor: string, align: HorizontalAlign };
  /**
   * The param of middle align.
   * @form
   * @since 9
   */
  middle?: { anchor: string, align: HorizontalAlign };
  /**
   * The param of top align.
   * @form
   * @since 9
   */
  top?: { anchor: string, align: VerticalAlign };
  /**
   * The param of bottom align.
   * @form
   * @since 9
   */
  bottom?: { anchor: string, align: VerticalAlign };
  /**
   * The param of center align.
   * @form
   * @since 9
   */
  center?: { anchor: string, align: VerticalAlign };
}

declare interface RotateOptions {
  /**
   * The param of x direction.
   * @since 7
   */
  /**
   * The param of x direction.
   * @form
   * @since 9
   */
  x?: number;
  /**
   * The param of y direction.
   * @since 7
   */
  /**
   * The param of y direction.
   * @form
   * @since 9
   */
  y?: number;
  /**
   * The param of z direction.
   * @since 7
   */
  /**
   * The param of z direction.
   * @form
   * @since 9
   */
  z?: number;
  /**
   * The param of center point of x.
   * @since 7
   */
  /**
   * The param of center point of x.
   * @form
   * @since 9
   */
  centerX?: number | string;
  /**
   * The param of center point of y.
   * @since 7
   */
  /**
   * The param of center point of y.
   * @form
   * @since 9
   */
  centerY?: number | string;
  /**
   * The param of angle.
   * @since 7
   */
  /**
   * The param of angle.
   * @form
   * @since 9
   */
  angle: number | string;
}

/**
 * Defines the param of transition.
 * @since 7
 */
/**
 * Defines the param of transition.
 * @form
 * @since 9
 */
declare interface TransitionOptions {
  /**
   * Defines the param of type.
   * @since 7
   */
  /**
   * Defines the param of type.
   * @form
   * @since 9
   */
  type?: TransitionType;
  /**
   * Defines the param of opacity.
   * @since 7
   */
  /**
   * Defines the param of opacity.
   * @form
   * @since 9
   */
  opacity?: number;
  /**
   * Defines the param of translate.
   * @since 7
   */
  /**
   * Defines the param of translate.
   * @form
   * @since 9
   */
  translate?: TranslateOptions;
  /**
   * Defines the param of scale.
   * @since 7
   */
  /**
   * Defines the param of scale.
   * @form
   * @since 9
   */
  scale?: ScaleOptions;
  /**
   * Defines the param of rotate.
   * @since 7
   */
  /**
   * Defines the param of rotate.
   * @form
   * @since 9
   */
  rotate?: RotateOptions;
}

/**
 * Define Preview property
 * @form
 * @since 9
 */
interface PreviewParams {
  /**
   * Define Preview title
   * @form
   * @since 9
   */
  title?: string;
  /**
   * Define Preview width
   * @form
   * @since 9
   */
  width?: number;
  /**
   * Define Preview height
   * @form
   * @since 9
   */
  height?: number;
  /**
   * Define Preview locale
   * @form
   * @since 9
   */
  locale?: string;
  /**
   * Define Preview colorMode
   * @form
   * @since 9
   */
  colorMode?: string;
  /**
   * Define Preview deviceType
   * @form
   * @since 9
   */
  deviceType?: string;
  /**
   * Define Preview dpi
   * @form
   * @since 9
   */
  dpi?: number;
  /**
   * Define Preview orientation
   * @form
   * @since 9
   */
  orientation?: string;
  /**
   * Define Preview roundScreen
   * @form
   * @since 9
   */
  roundScreen?: boolean;
}

/**
 * ItemDragInfo object description
 * @since 8
 */
declare interface ItemDragInfo {
  /**
   * Obtains the X coordinate of the drag window, in vp.
   * @since 8
   */
  x: number;

  /**
   * Obtains the Y coordinate of the drag window, in vp.
   * @since 8
   */
  y: number;
}

/**
 * DragItemInfo object description
 * @since 8
 */
declare interface DragItemInfo {
  /**
   * Uses the pixelMap object for drawing.
   * @since 8
   */
  pixelMap?: PixelMap;

  /**
   * Uses the custom builder for drawing, if pixelMap is set, this value is ignored.
   * @since 8
   */
  builder?: CustomBuilder;

  /**
   * Sets the extra info for drag event.
   * @since 8
   */
  extraInfo?: string;
}

/**
 * Defining animation function.
 * @since 7
 */
/**
 * Defining animation function.
 * @form
 * @since 9
 */
declare function animateTo(value: AnimateParam, event: () => void): void;

/**
 * Converts a value in vp units to a value in px.
 * @since 7
 */
/**
 * Converts a value in vp units to a value in px.
 * @form
 * @since 9
 */
declare function vp2px(value: number): number;

/**
 * Converts a number in units of px to a number in units of vp.
 * @since 7
 */
/**
 * Converts a number in units of px to a number in units of vp.
 * @form
 * @since 9
 */
declare function px2vp(value: number): number;

/**
 * Converts a number in fp units to a number in px.
 * @since 7
 */
/**
 * Converts a number in fp units to a number in px.
 * @form
 * @since 9
 */
declare function fp2px(value: number): number;

/**
 * Converts a number in units of px to a number in units of fp.
 * @since 7
 */
/**
 * Converts a number in units of px to a number in units of fp.
 * @form
 * @since 9
 */
declare function px2fp(value: number): number;

/**
 * Converts a number in units of lpx to a number in units of px.
 * @since 7
 */
/**
 * Converts a number in units of lpx to a number in units of px.
 * @form
 * @since 9
 */
declare function lpx2px(value: number): number;

/**
 * Converts a number in units of px to a number in units of lpx.
 * @since 7
 */
/**
 * Converts a number in units of px to a number in units of lpx.
 * @form
 * @since 9
 */
declare function px2lpx(value: number): number;

declare namespace focusControl {
  /**
   * Request focus to the specific component by param: 'id/key'.
   * @since 9
   */
  function requestFocus(value: string): boolean;
}

/**
 * Defines the event target.
 * @since 8
 */
/**
 * Defines the event target.
 * @form
 * @since 9
 */
declare interface EventTarget {
  /**
   * Area of current target.
   * @since 8
   */
  /**
   * Area of current target.
   * @form
   * @since 9
   */
  area: Area;
}

/**
 * Defines the event source type.
 * @since 8
 */
declare enum SourceType {
  /**
   * Unknown type.
   * @since 8
   */
  Unknown,

  /**
   * The mouse type.
   * @since 8
   */
  Mouse,

  /**
   * The touch screen type.
   * @since 8
   */
  TouchScreen,
}

/**
 * Defines the event tool type.
 * @since 9
 */
declare enum SourceTool {
  /**
   * Unknown type.
   * @since 9
   */
  Unknown,

  /**
   * The finger type.
   * @since 9
   */
  FINGER,

  /**
   * The pen type.
   * @since 9
   */
  PEN,
}

/**
 * Defines the Border Image Repeat Mode.
 * @form
 * @since 9
 */
declare enum RepeatMode {
  /**
   * Repeat mode.
   * @form
   * @since 9
   */
  Repeat,
  
  /**
   * Stretch mode.
   * @form
   * @since 9
   */
  Stretch,

  /**
   * Round mode.
   * @form
   * @since 9
   */
  Round,

  /**
   * Space mode.
   * @form
   * @since 9
   */
  Space,
}
/**
 * enum Blur style
 * @form
 * @since 9
 * @systemapi
 */
 declare enum BlurStyle {
  /**
   * Defines the fuzzy scale.
   * @form
   * @since 9
   */
  Thin,

  /**
   * Defines the fuzzy scale.
   * @form
   * @since 9
   */
  Regular,

  /**
   * Defines the fuzzy scale.
   * @form
   * @since 9
   */
  Thick,
}

/**
 * Defines the base event.
 * @since 8
 */
/**
 * Defines the base event.
 * @form
 * @since 9
 */
declare interface BaseEvent {
  /**
   * Defines the current target which fires this event.
   * @since 8
   */
  /**
   * Defines the current target which fires this event.
   * @form
   * @since 9
   */
  target: EventTarget;

  /**
   * Event timestamp.
   * @since 8
   */
  /**
   * Event timestamp.
   * @form
   * @since 9
   */
  timestamp: number;

  /**
   * the event source info.
   * @since 8
   */
  /**
   * the event source info.
   * @form
   * @since 9
   */
  source: SourceType;

  /**
   * Touch pressure.
   * @form
   * @since 9
   */
  pressure: number;

  /**
   * The angle between pencil projection on plane-X-Y and axis-Z.
   * @form
   * @since 9
   */
  tiltX: number;

  /**
   * The angle between pencil projection on plane-Y-Z and axis-Z.
   * @form
   * @since 9
   */
  tiltY: number;

  /**
   * The event tool type info.
   * @form
   * @since 9
   */
  sourceTool: SourceTool;
}

/**
 * Border image option
 * @form
 * @since 9
 */
declare interface BorderImageOption {
  /**
   * Border image slice
   * @form
   * @since 9
   */
  slice?: Length | EdgeWidths,

  /**
   * Border image repeat
   * @form
   * @since 9
   */
  repeat?: RepeatMode,

  /**
   * Border image source
   * @form
   * @since 9
   */
  source?: string | Resource | LinearGradient,

  /**
   * Border image width
   * @form
   * @since 9
   */
  width?: Length | EdgeWidths,

  /**
   * Border image outset
   * @form
   * @since 9
   */
  outset?: Length | EdgeWidths,

  /**
   * Border image center fill
   * @form
   * @since 9
   */
  fill?: boolean
}

/**
 * The tap action triggers this method invocation.
 * @since 7
 */
/**
 * The tap action triggers this method invocation.
 * @form
 * @since 9
 */
declare interface ClickEvent extends BaseEvent {
  /**
   * X coordinate of the click point relative to the left edge of the device screen.
   * @since 7
   */
  /**
   * X coordinate of the click point relative to the left edge of the device screen.
   * @form
   * @since 9
   */
  screenX: number;

  /**
   * The Y coordinate of the touch point relative to the upper edge of the device screen.
   * @since 7
   */
  /**
   * The Y coordinate of the touch point relative to the upper edge of the device screen.
   * @form
   * @since 9
   */
  screenY: number;

  /**
   * X coordinate of the click point relative to the left edge of the clicked element.
   * @since 7
   */
  /**
   * X coordinate of the click point relative to the left edge of the clicked element.
   * @form
   * @since 9
   */
  x: number;

  /**
   * Y coordinate of the click point relative to the upper edge of the clicked element.
   * @since 7
   */
  /**
   * Y coordinate of the click point relative to the left edge of the clicked element.
   * @form
   * @since 9
   */
  y: number;
}

/**
 * The mouse click action triggers this method invocation.
 * @since 8
 */
declare interface MouseEvent extends BaseEvent {
  /**
   * Mouse button of the click event.
   * @since 8
   */
  button: MouseButton;

  /**
   * Mouse action of the click event.
   * @since 8
   */
  action: MouseAction;

  /**
   * X coordinate of the click point relative to the left edge of the device screen.
   * @since 8
   */
  screenX: number;

  /**
   * The Y coordinate of the click point relative to the upper edge of the device screen.
   * @since 8
   */
  screenY: number;

  /**
   * X coordinate of the click point relative to the left edge of the clicked element.
   * @since 8
   */
  x: number;

  /**
   * Y coordinate of the click point relative to the upper edge of the clicked element.
   * @since 8
   */
  y: number;

  /**
   * The blocking event pops up.
   * @since 8
   */
  stopPropagation?: () => void;
}

/**
 * Type of the touch event.
 * @since 7
 */
declare interface TouchObject {
  /**
   * Type of the touch event.
   * @since 7
   */
  type: TouchType;

  /**
   * Finger unique identifier.
   * @since 7
   */
  id: number;

  /**
   * X coordinate of the touch point relative to the left edge of the device screen.
   * @since 7
   */
  screenX: number;

  /**
   * The Y coordinate of the touch point relative to the upper edge of the device screen.
   * @since 7
   */
  screenY: number;

  /**
   * X coordinate of the touch point relative to the left edge of the touched element.
   * @since 7
   */
  x: number;

  /**
   * Y coordinate of the touch point relative to the upper edge of the touched element.
   * @since 7
   */
  y: number;
}

/**
 * Touch Action Function Parameters
 * @since 7
 */
declare interface TouchEvent extends BaseEvent {
  /**
   * Type of the touch event.
   * @since 7
   */
  type: TouchType;

  /**
   * All finger information.
   * @since 7
   */
  touches: TouchObject[];

  /**
   * Indicates the current changed finger information.
   * @since 7
   */
  changedTouches: TouchObject[];

  /**
   * The blocking event pops up.
   * @since 7
   */
  stopPropagation?: () => void;
}

/**
 * Defines the PixelMap type object for ui component.
 * @since 7
 */
declare type PixelMap = import('../api/@ohos.multimedia.image').default.PixelMap;

/**
 * pixelmap object with release function.
 * @systemapi
 * @since 7
 */
declare interface PixelMapMock {
  /**
   * release function.
   * @systemapi
   * @since 7
   */
  release(): void;
}

/**
 * DragEvent object description
 * @since 7
 */
declare interface DragEvent {
  /**
   * Obtains the X coordinate of the drag window, in vp.
   * @since 7
   */
  getX(): number;

  /**
   * Obtains the Y coordinate of the drag window, in vp.
   * @since 7
   */
  getY(): number;
}

/**
 * KeyEvent object description:
 * @since 7
 */
declare interface KeyEvent {
  /**
   * Type of a key.
   * @since 7
   */
  type: KeyType;

  /**
   * Key code of a key
   * @since 7
   */
  keyCode: number;

  /**
   * Key value of a key.
   * @since 7
   */
  keyText: string;

  /**
   * Type of the input device that triggers the current key, such as the keyboard or handle.
   * @since 7
   */
  keySource: KeySource;

  /**
   * Indicates the ID of the input device that triggers the current key.
   * @since 7
   */
  deviceId: number;

  /**
   * Indicates the status of the key when the key is pressed.
   * The value 1 indicates the pressed state, and the value 0 indicates the unpressed state.
   * @since 7
   */
  metaKey: number;

  /**
   * Timestamp when the key was pressed.
   * @since 7
   */
  timestamp: number;

  /**
   * Block event bubbling.
   * @since 7
   */
  stopPropagation?: () => void;
}

/**
 * Component State Styles.
 * @since 8
 */
/**
 * Component State Styles.
 * @form
 * @since 9
 */
declare interface StateStyles {
  /**
   * Defines normal state styles.
   * @since 8
   */
  /**
   * Defines normal state styles.
   * @form
   * @since 9
   */
  normal?: any;

  /**
   * Defines pressed state styles.
   * @since 8
   */
  /**
   * Defines pressed state styles.
   * @form
   * @since 9
   */
  pressed?: any;

  /**
   * Defines disabled state styles.
   * @since 8
   */
  /**
   * Defines disabled state styles.
   * @form
   * @since 9
   */
  disabled?: any;

  /**
   * Defines focused state styles.
   * @since 8
   */
  /**
   * Defines focused state styles.
   * @form
   * @since 9
   */
  focused?: any;

  /**
   * Defines clicked state styles.
   * @since 8
   */
  /**
   * Defines clicked state styles.
   * @form
   * @since 9
   */
  clicked?: any;
}

/**
 * Defines the popup options.
 * @since 7
 */
declare interface PopupOptions {
  /**
   * Information in the pop-up window.
   * @since 7
   */
  message: string;

  /**
   * placement On Top
   * @since 7
   */
  placementOnTop?: boolean;

  /**
   * The first button.
   * @since 7
   */
  primaryButton?: {
    /**
     * Button text value
     * @since 7
     */
    value: string;

    /**
     * action
     * @since 7
     */
    action: () => void;
  };

  /**
   * The second button.
   * @since 7
   */
  secondaryButton?: {
    /**
     * Button text value
     * @since 7
     */
    value: string;

    /**
     * action
     * @since 7
     */
    action: () => void;
  };

  /**
   * on State Change
   * @since 7
   */
  onStateChange?: (event: { isVisible: boolean }) => void;

  /**
   * The offset of the sharp corner of popup.
   * @since 9
   */
   arrowOffset?: Length;

  /**
   * Whether to display in the sub window.
   * @since 9
   */
   showInSubWindow?: boolean;
}

/**
 * Defines the custom popup options.
 * @since 8
 */
declare interface CustomPopupOptions {
  /**
   * builder of popup
   * @since 8
   */
  builder: CustomBuilder;

  /**
   * placement of popup
   * @since 8
   */
  placement?: Placement;

  /**
   * mask color of popup
   * @since 8
   */
  maskColor?: Color | string | Resource | number;

  /**
   * background color of popup
   * @since 8
   */
  popupColor?: Color | string | Resource | number;

  /**
   * whether show arrow
   * @since 8
   */
  enableArrow?: boolean;

  /**
   * whether hide popup when click mask
   * @since 8
   */
  autoCancel?: boolean;

  /**
   * on State Change
   * @since 8
   */
  onStateChange?: (event: { isVisible: boolean }) => void;

  /**
   * The offset of the sharp corner of popup.
   * @since 9
   */
   arrowOffset?: Length;

  /**
   * Whether to display in the sub window.
   * @since 9
   */
   showInSubWindow?: boolean;
}

/**
 * CommonMethod.
 * @since 7
 */
/**
 * CommonMethod.
 * @form
 * @since 9
 */
declare class CommonMethod<T> {
  /**
   * constructor.
   * @systemapi
   * @since 7
   * @ignore
   */
  /**
   * constructor.
   * @form
   * @systemapi
   * @since 9
   * @ignore
   */
  constructor();

  /**
   * Sets the width of the current component.
   * @since 7
   */
  /**
   * Sets the width of the current component.
   * @form
   * @since 9
   */
  width(value: Length): T;

  /**
   * Sets the height of the current component.
   * @since 7
   */
  /**
   * Sets the width of the current component.
   * @form
   * @since 9
   */
  height(value: Length): T;

  /**
   * Sets the response region of the current component.
   * @since 8
   */
  /**
   * Sets the response region of the current component.
   * @form
   * @since 9
   */
  responseRegion(value: Array<Rectangle> | Rectangle): T;

  /**
   * The size of the current component.
   * @since 7
   */
  /**
   * The size of the current component.
   * @form
   * @since 9
   */
  size(value: SizeOptions): T;

  /**
   * constraint Size：
   * minWidth：minimum Width，maxWidth：maximum Width，minHeight：minimum Height ，maxHeight：maximum Height，
   * @since 7
   */
  /**
   * constraint Size：
   * minWidth：minimum Width，maxWidth：maximum Width，minHeight：minimum Height ，maxHeight：maximum Height，
   * @form
   * @since 9
   */
  constraintSize(value: ConstraintSizeOptions): T;

  /**
   * Sets the touchable of the current component
   * @since 7
   * @deprecated since 9
   * @useinstead hitTestBehavior
   */
  touchable(value: boolean): T;

  /**
   * Defines the component's hit test behavior in touch events.
   * @param value the hit test mode.
   * @since 9
   */
  hitTestBehavior(value: HitTestMode): T;

  /**
   * layout Weight
   * @since 7
   */
  /**
   * layout Weight
   * @form
   * @since 9
   */
  layoutWeight(value: number | string): T;

  /**
   * Inner margin.
   * @since 7
   */
  /**
   * Inner margin.
   * @form
   * @since 9
   */
  padding(value: Padding | Length): T;

  /**
   * Outer Margin.
   * @since 7
   */
  /**
   * Outer Margin.
   * @form
   * @since 9
   */
  margin(value: Margin | Length): T;

  /**
   * Background color
   * @since 7
   */
  /**
   * Background color
   * @form
   * @since 9
   */
  backgroundColor(value: ResourceColor): T;

  /**
   * Background image
   * src: Image address url
   * @since 7
   */
  /**
   * Background image
   * src: Image address url
   * @form
   * @since 9
   */
  backgroundImage(src: ResourceStr, repeat?: ImageRepeat): T;

  /**
   * Background image size
   * @since 7
   */
  /**
   * Background image size
   * @form
   * @since 9
   */
  backgroundImageSize(value: SizeOptions | ImageSize): T;

  /**
   * Background image position
   * x:Horizontal coordinate;y:Vertical axis coordinate.
   * @since 7
   */
  /**
   * Background image position
   * x:Horizontal coordinate;y:Vertical axis coordinate.
   * @form
   * @since 9
   */
  backgroundImagePosition(value: Position | Alignment): T;

  /**
   * Background blur style.
   * blurStyle:Blur style type.
   * @form
   * @since 9
   */
   backgroundBlurStyle(value: BlurStyle): T;
  
  /**
   * Opacity
   * @since 7
   */
  /**
   * Opacity
   * @form
   * @since 9
   */
  opacity(value: number | Resource): T;

  /**
   * Opacity
   * width:Border width;color:Border color;radius:Border radius;
   * @since 7
   */
  /**
   * Opacity
   * width:Border width;color:Border color;radius:Border radius;
   * @form
   * @since 9
   */
  border(value: BorderOptions): T;

  /**
   * Border style
   * @since 7
   */
  /**
   * Border style
   * @form
   * @since 9
   */
  borderStyle(value: BorderStyle): T;

  /**
   * Border style
   * @form
   * @since 9
   */
   borderStyle(value: EdgeStyles): T;

  /**
   * Border width
   * @since 7
   */
  /**
   * Border width
   * @form
   * @since 9
   */
  borderWidth(value: Length): T;

  /**
   * Border width
   * @since 9
   */
  /**
   * Border width
   * @form
   * @since 9
   */
   borderWidth(value: EdgeWidths): T;

  /**
   * Border color
   * @since 7
   */
  /**
   * Border color
   * @form
   * @since 9
   */
  borderColor(value: ResourceColor): T;

  /**
   * Border color
   * @form
   * @since 9
   */
   borderColor(value: EdgeColors): T;

  /**
   * Border radius
   * @since 7
   */
  /**
   * Border radius
   * @form
   * @since 9
   */
  borderRadius(value: Length): T;

  /**
   * Border radius
   * @form
   * @since 9
   */
   borderRadius(value: BorderRadiuses): T;

  /**
   * Border image
   * @form
   * @since 9
   */
  borderImage(value: BorderImageOption): T;

  /**
   * Trigger a click event when a click is clicked.
   * @since 7
   */
  /**
   * Trigger a click event when a click is clicked.
   * @form
   * @since 9
   */
  onClick(event: (event?: ClickEvent) => void): T;

  /**
   * Trigger a mouse hover event.
   * @since 8
   */
  onHover(event: (isHover?: boolean) => void): T;

  /**
   * Set hover effect.
   * @since 8
   */
  hoverEffect(value: HoverEffect): T;

  /**
   * Trigger a mouse event.
   * @since 8
   */
  onMouse(event: (event?: MouseEvent) => void): T;

  /**
   * Trigger a touch event when touched.
   * @since 7
   */
  onTouch(event: (event?: TouchEvent) => void): T;

  /**
   * Keyboard input
   * @since 7
   */
  onKeyEvent(event: (event?: KeyEvent) => void): T;

  /**
   * Set focusable.
   * @since 8
   */
  focusable(value: boolean): T;

  /**
   * Trigger a event when got focus.
   * @since 8
   */
  onFocus(event: () => void): T;

  /**
   * Trigger a event when lose focus.
   * @since 8
   */
  onBlur(event: () => void): T;

  /**
   * Set focus index by key tab.
   * @since 9
   */
  tabIndex(index: number): T;

  /**
   * Set default focused component when a page create.
   * @since 9
   */
  defaultFocus(value: boolean): T;

  /**
   * Set default focused component when focus on a focus group.
   * @since 9
   */
  groupDefaultFocus(value: boolean): T;

  /**
   * Set a component focused when the component be touched.
   * @since 9
   */
  focusOnTouch(value: boolean): T;

  /**
   * animation
   * @since 7
   */
  /**
   * animation
   * @form
   * @since 9
   */
  animation(value: AnimateParam): T;

  /**
   * Transition parameter
   * @since 7
   */
  /**
   * Transition parameter
   * @form
   * @since 9
   */
  transition(value: TransitionOptions): T;

  /**
   * Bind gesture recognition.
   * gesture:Bound Gesture Type,mask:GestureMask;
   * @since 7
   */
  gesture(gesture: GestureType, mask?: GestureMask): T;

  /**
   * Binding Preferential Recognition Gestures
   * gesture:Bound Gesture Type,mask:GestureMask;
   * @since 7
   */
  priorityGesture(gesture: GestureType, mask?: GestureMask): T;

  /**
   * Binding gestures that can be triggered simultaneously with internal component gestures
   * gesture:Bound Gesture Type,mask:GestureMask;
   * @since 7
   */
  parallelGesture(gesture: GestureType, mask?: GestureMask): T;

  /**
   * Adds the content blurring effect for the current component. The input parameter is the blurring radius.
   * The larger the blurring radius, the more blurring the content.
   * If the value is 0, the content blurring effect is not blurring.
   * @since 7
   */
  /**
   * Adds the content blurring effect for the current component. The input parameter is the blurring radius.
   * The larger the blurring radius, the more blurring the content.
   * If the value is 0, the content blurring effect is not blurring.
   * @form
   * @since 9
   */
  blur(value: number): T;

  /**
   * Adds a highlight effect to the current component.
   * The input parameter is the highlight proportion. 0 indicates no highlight effect, and 1 indicates the maximum highlight proportion.
   * The component is displayed as all white (percentage).
   * @since 7
   */
  /**
   * Adds a highlight effect to the current component.
   * The input parameter is the highlight proportion. 0 indicates no highlight effect, and 1 indicates the maximum highlight proportion.
   * The component is displayed as all white (percentage).
   * @form
   * @since 9
   */
  brightness(value: number): T;

  /**
   * Adds a contrast effect to the current component. The input parameter is the contrast value.
   * A larger contrast value indicates a sharper image. When the contrast value is 0, the image becomes gray. (%)
   * @since 7
   */
  /**
   * Adds a contrast effect to the current component. The input parameter is the contrast value.
   * A larger contrast value indicates a sharper image. When the contrast value is 0, the image becomes gray. (%)
   * @form
   * @since 9
   */
  contrast(value: number): T;

  /**
   * Adds a grayscale effect to the current component.
   * The value is the gray scale conversion ratio. If the input parameter is 1.0, the gray scale image is completely converted to the gray scale image. If the input parameter is 0.0, the image does not change.
   * If the input parameter is between 0.0 and 1.0, the effect changes. (Percentage)
   * @since 7
   */
  /**
   * Adds a grayscale effect to the current component.
   * The value is the gray scale conversion ratio. If the input parameter is 1.0, the gray scale image is completely converted to the gray scale image. If the input parameter is 0.0, the image does not change.
   * If the input parameter is between 0.0 and 1.0, the effect changes. (Percentage)
   * @form
   * @since 9
   */
  grayscale(value: number): T;

  /**
   * Adds a color overlay effect for the current component. The input parameter is the superimposed color.
   * @since 7
   */
  /**
   * Adds a color overlay effect for the current component. The input parameter is the superimposed color.
   * @form
   * @since 9
   */
  colorBlend(value: Color | string | Resource): T;

  /**
   * Adds a saturation effect to the current component.
   * The saturation is the ratio of the color-containing component to the achromatic component (gray).
   * The larger the color-containing component, the greater the saturation.
   * The larger the achromatic component, the smaller the saturation. (Percentage)
   * @since 7
   */
  /**
   * Adds a saturation effect to the current component.
   * The saturation is the ratio of the color-containing component to the achromatic component (gray).
   * The larger the color-containing component, the greater the saturation.
   * The larger the achromatic component, the smaller the saturation. (Percentage)
   * @form
   * @since 9
   */
  saturate(value: number): T;

  /**
   * Converts the image to sepia. Value defines the scale of the conversion.
   * A value of 1 is completely sepia, and a value of 0 does not change the image. (Percentage)
   * @since 7
   */
  /**
   * Converts the image to sepia. Value defines the scale of the conversion.
   * A value of 1 is completely sepia, and a value of 0 does not change the image. (Percentage)
   * @form
   * @since 9
   */
  sepia(value: number): T;

  /**
   * Invert the input image. Value defines the scale of the conversion. 100% of the value is a complete reversal.
   * A value of 0% does not change the image. (Percentage)
   * @since 7
   */
  /**
   * Invert the input image. Value defines the scale of the conversion. 100% of the value is a complete reversal.
   * A value of 0% does not change the image. (Percentage)
   * @form
   * @since 9
   */
  invert(value: number): T;

  /**
   * Adds the hue rotation effect to the current component.
   * The input parameter is the rotation angle. When the input parameter is 0deg, the image does not change (the default value is 0deg), and the input parameter does not have a maximum value.
   * If the value exceeds 360deg, the image is circled again.
   * @since 7
   */
  /**
   * Adds the hue rotation effect to the current component.
   * The input parameter is the rotation angle. When the input parameter is 0deg, the image does not change (the default value is 0deg), and the input parameter does not have a maximum value.
   * If the value exceeds 360deg, the image is circled again.
   * @form
   * @since 9
   */
  hueRotate(value: number | string): T;

  /**
   * Adds the background blur effect for the current component. The input parameter is the blur radius.
   * The larger the blur radius, the more blurred the background. If the value is 0, the background blur is not blurred.
   * @since 7
   */
  /**
   * Adds the background blur effect for the current component. The input parameter is the blur radius.
   * The larger the blur radius, the more blurred the background. If the value is 0, the background blur is not blurred.
   * @form
   * @since 9
   */
  backdropBlur(value: number): T;

  /**
   * Sets the translation effect during page transition.
   * The value is the start point of entry and end point of exit.
   * When this parameter is set together with slide, slide takes effect by default.
   * @since 7
   */
  /**
   * Sets the translation effect during page transition.
   * The value is the start point of entry and end point of exit.
   * When this parameter is set together with slide, slide takes effect by default.
   * @form
   * @since 9
   */
  translate(value: TranslateOptions): T;

  /**
   * Sets the zoom effect during page transition. The value is the start point of entry and end point of exit.
   * @since 7
   */
  /**
   * Sets the zoom effect during page transition. The value is the start point of entry and end point of exit.
   * @form
   * @since 9
   */
  scale(value: ScaleOptions): T;

  /**
   * Default number of occupied columns, indicating the number of occupied grid columns when the number of columns (span) of the corresponding size is not set in the useSizeType attribute.
   * @since 7
   */
  gridSpan(value: number): T;

  /**
   * The default offset column number indicates the number of offset columns of the current component in the start direction of the parent component when the useSizeType attribute does not set the offset of the corresponding dimension. That is,
   * the current component is located in the nth column.
   * @since 7
   */
  gridOffset(value: number): T;

  /**
   * Sets the rotation effect during assembly transition.
   * The values are the start point during insertion and the end point during deletion.
   * @since 7
   */
  /**
   * Sets the rotation effect during assembly transition.
   * The values are the start point during insertion and the end point during deletion.
   * @form
   * @since 9
   */
  rotate(value: RotateOptions): T;

  /**
   * Sets the transformation matrix for the current component.
   * @since 7
   */
  transform(value: object): T;

  /**
   * This callback is triggered when a component mounts a display.
   * @since 7
   */
  /**
   * This callback is triggered when a component mounts a display.
   * @form
   * @since 9
   */
  onAppear(event: () => void): T;

  /**
   * This callback is triggered when component uninstallation disappears.
   * @since 7
   */
  /**
   * This callback is triggered when component uninstallation disappears.
   * @form
   * @since 9
   */
  onDisAppear(event: () => void): T;

  /**
   * This callback is triggered when the size or position of this component change finished.
   * @param event event callback.
   * @since 8
   */
  onAreaChange(event: (oldValue: Area, newValue: Area) => void): T;

  /**
   * Controls the display or hide of the current component.
   * @since 7
   */
  /**
   * Controls the display or hide of the current component.
   * @form
   * @since 9
   */
  visibility(value: Visibility): T;

  /**
   * The percentage of the remaining space of the Flex container allocated to the component on which this property resides.
   * @since 7
   */
  /**
   * The percentage of the remaining space of the Flex container allocated to the component on which this property resides.
   * @form
   * @since 9
   */
  flexGrow(value: number): T;

  /**
   * The proportion of the Flex container compression size assigned to the component on which this attribute resides.
   * @since 7
   */
  /**
   * The proportion of the Flex container compression size assigned to the component on which this attribute resides.
   * @form
   * @since 9
   */
  flexShrink(value: number): T;

  /**
   * The base dimension of the assembly on which this attribute is located in the direction of the principal axis in the Flex container.
   * @since 7
   */
  /**
   * The base dimension of the assembly on which this attribute is located in the direction of the principal axis in the Flex container.
   * @form
   * @since 9
   */
  flexBasis(value: number | string): T;

  /**
   * Overrides the default configuration of alignItems in the Flex Layout container.
   * @since 7
   */
  /**
   * Overrides the default configuration of alignItems in the Flex Layout container.
   * @form
   * @since 9
   */
  alignSelf(value: ItemAlign): T;

  /**
   * Sets the current component and displays the priority in the layout container. This parameter is valid only in Row, Column, and Flex single-row layouts.
   * @since 7
   */
  /**
   * Sets the current component and displays the priority in the layout container. This parameter is valid only in Row, Column, and Flex single-row layouts.
   * @form
   * @since 9
   */
  displayPriority(value: number): T;

  /**
   * The sibling components in the same container are hierarchically displayed. A larger value of z indicates a higher display level.
   * @since 7
   */
  /**
   * The sibling components in the same container are hierarchically displayed. A larger value of z indicates a higher display level.
   * @form
   * @since 9
   */
  zIndex(value: number): T;

  /**
   * If the components of the two pages are configured with the same ID, the shared element transition is performed during transition. If the parameter is set to an empty string, the shared element transition does not occur. For details about the options parameter, see the options parameter description.
   * @since 7
   */
  sharedTransition(id: string, options?: sharedTransitionOptions): T;

  /**
   * Sets the sliding direction. The enumerated value supports logical AND (&) and logical OR (|).
   * @since 7
   */
  /**
   * Sets the sliding direction. The enumerated value supports logical AND (&) and logical OR (|).
   * @form
   * @since 9
   */
  direction(value: Direction): T;

  /**
   * align
   * @since 7
   */
  /**
   * align
   * @form
   * @since 9
   */
  align(value: Alignment): T;

  /**
   * position
   * @since 7
   */
  /**
   * position
   * @form
   * @since 9
   */
  position(value: Position): T;

  /**
   * Sets the anchor point of the element when it is positioned. The base point is offset from the top start point of the element.
   * @since 7
   */
  /**
   * Sets the anchor point of the element when it is positioned. The base point is offset from the top start point of the element.
   * @form
   * @since 9
   */
  markAnchor(value: Position): T;

  /**
   * Coordinate offset relative to the layout completion position.
   * Setting this attribute does not affect the layout of the parent container. The position is adjusted only during drawing.
   * @since 7
   */
  /**
   * Coordinate offset relative to the layout completion position.
   * Setting this attribute does not affect the layout of the parent container. The position is adjusted only during drawing.
   * @form
   * @since 9
   */
  offset(value: Position): T;

  /**
   * If the value is true, the component is available and can respond to operations such as clicking.
   *  If it is set to false, click operations are not responded.
   * @since 7
   */
  /**
   * If the value is true, the component is available and can respond to operations such as clicking.
   *  If it is set to false, click operations are not responded.
   * @form
   * @since 9
   */
  enabled(value: boolean): T;

  /**
   * Sets the number of occupied columns and offset columns for a specific device width type.
   * @since 7
   */
  useSizeType(value: {
    xs?: number | { span: number; offset: number };
    sm?: number | { span: number; offset: number };
    md?: number | { span: number; offset: number };
    lg?: number | { span: number; offset: number };
  }): T;

  /**
   * Specifies the alignRules of relative container
   * @form
   * @since 9
   */
  alignRules(value: AlignRuleOption): T;

  /**
   * Specifies the aspect ratio of the current component.
   * @since 7
   */
  /**
   * Specifies the aspect ratio of the current component.
   * @form
   * @since 9
   */
  aspectRatio(value: number): T;

  /**
   * After a listener is bound, the component can be dragged. After the drag occurs, a callback is triggered.
   * (To be triggered, press and hold for 170 milliseconds (ms))
   * @since 8
   */
  onDragStart(event: (event?: DragEvent, extraParams?: string) => CustomBuilder | DragItemInfo): T;

  /**
   * After binding, a callback is triggered when the component is dragged to the range of the component.
   * @since 8
   */
  onDragEnter(event: (event?: DragEvent, extraParams?: string) => void): T;

  /**
   * After binding, a callback is triggered when the drag moves within the range of a placeable component.
   * @since 8
   */
  onDragMove(event: (event?: DragEvent, extraParams?: string) => void): T;

  /**
   * After binding, a callback is triggered when the component is dragged out of the component range.
   * @since 8
   */
  onDragLeave(event: (event?: DragEvent, extraParams?: string) => void): T;

  /**
   * The component bound to this event can be used as the drag release target.
   * This callback is triggered when the drag behavior is stopped within the scope of the component.
   * @since 8
   */
  onDrop(event: (event?: DragEvent, extraParams?: string) => void): T;

  /**
   * Add mask text to the current component. The layout is the same as that of the current component.
   * @since 7
   */
  /**
   * Add mask text to the current component. The layout is the same as that of the current component.
   * @form
   * @since 9
   */
  overlay(value: string, options?: { align?: Alignment; offset?: { x?: number; y?: number } }): T;

  /**
   * Linear Gradient
   * angle: Angle of Linear Gradient; direction:Direction of Linear Gradient;  colors:Color description for gradients,repeating:repeating.
   * @since 7
   */
  /**
   * Linear Gradient
   * angle: Angle of Linear Gradient; direction:Direction of Linear Gradient;  colors:Color description for gradients,repeating:repeating.
   * @form
   * @since 9
   */
  linearGradient(value: {
    angle?: number | string;
    direction?: GradientDirection;
    colors: Array<any>;
    repeating?: boolean;
  }): T;

  /**
   * Angle Gradient
   * center:is the center point of the angle gradient
   * start:Start point of angle gradient
   * end:End point of angle gradient
   * number:number
   * rotating:rotating
   * colors:Color description for gradients
   * repeating:repeating
   * @since 7
   */
  /**
   * Angle Gradient
   * center:is the center point of the angle gradient
   * start:Start point of angle gradient
   * end:End point of angle gradient
   * number:number
   * rotating:rotating
   * colors:Color description for gradients
   * repeating:repeating
   * @form
   * @since 9
   */
  sweepGradient(value: {
    center: Array<any>;
    start?: number | string;
    end?: number | string;
    rotation?: number | string;
    colors: Array<any>;
    repeating?: boolean;
  }): T;

  /**
   * Radial Gradient
   * center:Center point of radial gradient
   * radius:Radius of Radial Gradient
   * colors:Color description for gradients
   * repeating: Refill
   * @since 7
   */
  /**
   * Radial Gradient
   * center:Center point of radial gradient
   * radius:Radius of Radial Gradient
   * colors:Color description for gradients
   * repeating: Refill
   * @form
   * @since 9
   */
  radialGradient(value: { center: Array<any>; radius: number | string; colors: Array<any>; repeating?: boolean }): T;

  /**
   * Set the motion path of the component
   * path:Motion path for displacement animation, using the svg path string.
   * from:Start point of the motion path. The default value is 0.0.
   * to:End point of the motion path. The default value is 1.0.
   * rotatable:Whether to follow the path for rotation.
   * @since 7
   */
  motionPath(value: MotionPathOptions): T;

  /**
   * Add a shadow effect to the current component
   * @since 7
   */
  /**
   * Add a shadow effect to the current component
   * @form
   * @since 9
   */
  shadow(value: {
    radius: number | Resource;
    color?: Color | string | Resource;
    offsetX?: number | Resource;
    offsetY?: number | Resource;
  }): T;

  /**
   * When the parameter is of the Shape type, the current component is cropped according to the specified shape.
   * When the parameter is of the boolean type, this parameter specifies whether to crop based on the edge contour.
   * @since 7
   */
  /**
   * When the parameter is of the Shape type, the current component is cropped according to the specified shape.
   * When the parameter is of the boolean type, this parameter specifies whether to crop based on the edge contour.
   * @form
   * @since 9
   */
  clip(value: boolean | CircleAttribute | EllipseAttribute | PathAttribute | RectAttribute): T;

  /**
   * Applies a mask of the specified shape to the current assembly.
   * @since 7
   */
  /**
   * Applies a mask of the specified shape to the current assembly.
   * @form
   * @since 9
   */
  mask(value: CircleAttribute | EllipseAttribute | PathAttribute | RectAttribute): T;

  /**
   * Key. User can set an key to the component to identify it.
   * @since 8
   * @systemapi
   * @test
   */
  key(value: string): T;

  /**
   * Id. User can set an id to the component to identify it.
   * @since 8
   */
  /**
   * Id. User can set an id to the component to identify it.
   * @form
   * @since 9
   */
  id(value: string): T;

  /**
   * geometryTransition
   * @since 7
   */
  geometryTransition(id: string): T;

  /**
   * Popup control
   * @since 7
   */
  bindPopup(show: boolean, popup: PopupOptions | CustomPopupOptions): T;

  /**
   * Menu control
   * @since 7
   */
  bindMenu(content: { value: string; action: () => void }[] | CustomBuilder): T;

  /**
   * ContextMenu control
   * @since 8
   */
  bindContextMenu(content: CustomBuilder, responseType: ResponseType): T;

  /**
   * Sets styles for component state.
   * @since 8
   */
  /**
   * Sets styles for component state.
   * @form
   * @since 9
   */
  stateStyles(value: StateStyles): T;

  /**
   * id for distribute identification.
   * @since 8
   */
  restoreId(value: number): T;

  /**
   * Trigger a visible area change event.
   * @since 9
   */
   onVisibleAreaChange(ratios: Array<number>, event: (isVisible: boolean, currentRatio: number) => void): T;
}

/**
 * CommonAttribute for ide.
 * @since 7
 */
/**
 * CommonAttribute for ide.
 * @form
 * @since 9
 */
declare class CommonAttribute extends CommonMethod<CommonAttribute> {}

/**
 * CommonInterface for ide.
 * @since 7
 */
/**
 * CommonInterface for ide.
 * @form
 * @since 9
 */
interface CommonInterface {
  (): CommonAttribute;
}

/**
 * CommonInstance for ide.
 * @since 7
 */
/**
 * CommonInstance for ide.
 * @form
 * @since 9
 */
declare const CommonInstance: CommonAttribute;

/**
 * Common for ide.
 * @since 7
 */
/**
 * Common for ide.
 * @form
 * @since 9
 */
declare const Common: CommonInterface;

/**
 * Defines the CustomBuilder Type.
 * @since 7
 */
/**
 * Defines the CustomBuilder Type.
 * @form
 * @since 9
 */
declare type CustomBuilder = (() => any) | void;

/**
 * CommonShapeMethod
 * @since 7
 */
/**
 * CommonShapeMethod
 * @form
 * @since 9
 */
declare class CommonShapeMethod<T> extends CommonMethod<T> {
  /**
   * constructor.
   * @since 7
   * @systemapi
   */
  /**
   * constructor.
   * @form
   * @since 9
   * @systemapi
   */
  constructor();

  /**
   * border Color
   * @since 7
   */
  /**
   * border Color
   * @form
   * @since 9
   */
  stroke(value: ResourceColor): T;

  /**
   * Fill color.
   * @since 7
   */
  /**
   * Fill color.
   * @form
   * @since 9
   */
  fill(value: ResourceColor): T;

  /**
   * Offset from the start point of the border drawing.
   * @since 7
   */
  /**
   * Offset from the start point of the border drawing.
   * @form
   * @since 9
   */
  strokeDashOffset(value: number | string): T;

  /**
   * Path endpoint drawing style.
   * @since 7
   */
  /**
   * Path endpoint drawing style.
   * @form
   * @since 9
   */
  strokeLineCap(value: LineCapStyle): T;

  /**
   * Border corner drawing style.
   * @since 7
   */
  /**
   * Border corner drawing style.
   * @form
   * @since 9
   */
  strokeLineJoin(value: LineJoinStyle): T;

  /**
   * Limits for drawing acute angles as bevels
   * @since 7
   */
  /**
   * Limits for drawing acute angles as bevels
   * @form
   * @since 9
   */
  strokeMiterLimit(value: number | string): T;

  /**
   * Sets the opacity of the border.
   * @since 7
   */
  /**
   * Sets the opacity of the border.
   * @form
   * @since 9
   */
  strokeOpacity(value: number | string | Resource): T;

  /**
   * fill Opacity
   * @since 7
   */
  /**
   * fill Opacity
   * @form
   * @since 9
   */
  fillOpacity(value: number | string | Resource): T;

  /**
   * Sets the width of the dividing line.
   * @since 7
   */
  /**
   * Sets the width of the dividing line.
   * @form
   * @since 9
   */
  strokeWidth(value: Length): T;

  /**
   * Indicates whether to enable anti-aliasing
   * @since 7
   */
  /**
   * Indicates whether to enable anti-aliasing
   * @form
   * @since 9
   */
  antiAlias(value: boolean): T;

  /**
   * Sets the gap for the border.
   * @since 7
   */
  /**
   * Sets the gap for the border.
   * @form
   * @since 9
   */
  strokeDashArray(value: Array<any>): T;
}

/**
 * Linear Gradient Interface
 * @param { number | string } angle - Angle of Linear Gradient.
 * @param { GradientDirection } direction - Direction of Linear Gradient.
 * @param { Array<any> } colors - Array of colors
 * @param { boolean } repeating: Image slice repeating.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
declare interface LinearGradient {
  angle?: number | string;
  direction?: GradientDirection;
  colors: Array<any>;
  repeating?: boolean;
}

/**
 * Sub component border info.
 * @form
 * @since 9
 */
declare interface LayoutBorderInfo {
  borderWidth: EdgeWidths,
  margin: Margin,
  padding: Padding,
}

/**
 * Sub component layout info.
 * @form
 * @since 9
 */
declare interface LayoutInfo {
  position: Position,
  constraint: ConstraintSizeOptions,
}

/**
 * Sub component info passed from framework when layout and measure happens.
 * @form
 * @since 9
 */
declare interface LayoutChild {
  /**
   * Sub component name.
   * @form
   * @since 9
   */
  name: string,

  /**
   * Sub component id.
   * @form
   * @since 9
   */
  id: string,

  /**
   * Sub component constraint.
   * @form
   * @since 9
   */
  constraint: ConstraintSizeOptions,

  /**
   * Sub component border info.
   * @form
   * @since 9
   */
  borderInfo: LayoutBorderInfo,

  /**
   * Sub component position.
   * @form
   * @since 9
   */
  position: Position,

  /**
   * Call this measure method in onMeasure callback to supply sub component size.
   * @form
   * @since 9
   */
  measure(childConstraint: ConstraintSizeOptions),

  /**
   * Call this layout method in onLayout callback to assign layout info to sub component.
   * @form
   * @since 9
   */
  layout(childLayoutInfo: LayoutInfo)
}

/**
 * Custom Component
 * @since 7
 */
/**
 * Custom Component
 * @extends CommonAttribute
 * @form
 * @since 9
 */
declare class CustomComponent extends CommonAttribute {
  /**
   * Customize the pop-up content constructor.
   * @since 7
   */
  /**
   * Customize the pop-up content constructor.
   * @form
   * @since 9
   */
  build(): void;

  /**
   * aboutToAppear Method
   * @since 7
   */
  /**
   * aboutToAppear Method
   * @form
   * @since 9
   */
  aboutToAppear?(): void;

  /**
   * aboutToDisappear Method
   * @since 7
   */
  /**
   * aboutToDisappear Method
   * @form
   * @since 9
   */
  aboutToDisappear?(): void;

  /**
   * Custom component override this method to layout each of its sub components.
   * @form
   * @since 9
   */
  onLayout?(children: Array<LayoutChild>, constraint: ConstraintSizeOptions): void;

  /**
   * Custom component override this method to measure each of its sub components.
   * @form
   * @since 9
   */
  onMeasure?(children: Array<LayoutChild>, constraint: ConstraintSizeOptions): void;

  /**
   * onPageShow Method
   * @since 7
   */
  onPageShow?(): void;

  /**
   * onPageHide Method
   * @since 7
   */
  onPageHide?(): void;

  /**
   * onBackPress Method
   * @since 7
   */
  onBackPress?(): void;

  /**
   * PageTransition Method.
   * Implement Animation when enter this page or move to other pages.
   * @since 9
   */
  pageTransition?(): void;
}

/**
 * View
 * @ignore ide should ignore this class
 * @systemapi
 * @since 7
 */
/**
 * View
 * @ignore ide should ignore this class
 * @systemapi
 * @form
 * @since 9
 */
declare class View {
  /**
   * Just use for generate tsbundle
   * @ignore ide should ignore this attribute
   * @systemapi
   * @since 7
   */
  create(value: any): any;
}

declare module "SpecialEvent" {
  module "SpecialEvent" {
    // @ts-ignore
    export { TouchObject, KeyEvent, MouseEvent };
  }
}
