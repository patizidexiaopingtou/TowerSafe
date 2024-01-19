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
 * Defines the data type of the interface restriction.
 * @since 7
 */
declare interface Resource {
  /**
   * Set id.
   * @since 7
   */
  readonly id: number;

  /**
   * Set type.
   * @since 7
   */
  readonly type: number;

  /**
   * Set params.
   * @since 7
   */
  readonly params?: any[];

  /**
   * Set bundleName.
   * @since 9
   */
  readonly bundleName: string;

  /**
   * Set moduleName.
   * @since 9
   */
  readonly moduleName: string;
}

/**
 * Defines the length property with string, number and resource unit.
 * @since 7
 */
declare type Length = string | number | Resource;

/**
 * Defines the string which can use resource.
 * @since 7
 */
declare type ResourceStr = string | Resource;

/**
 * Defines the padding property.
 * @since 7
 */
declare type Padding = {
  /**
   * top property.
   */
  top?: Length;

  /**
   * right property.
   */
  right?: Length;

  /**
   * bottom property.
   */
  bottom?: Length;

  /**
   * left property.
   */
  left?: Length;
};

/**
 * Defines the margin property.
 * @since 7
 */
declare type Margin = Padding;

/**
 * Defines the border width property.
 * @since 9
 */
 declare type EdgeWidths = {
  /**
   * top property.
   * @since 9
   */
  top?: Length;

  /**
   * right property.
   * @since 9
   */
  right?: Length;

  /**
   * bottom property.
   * @since 9
   */
  bottom?: Length;

  /**
   * left property.
   * @since 9
   */
  left?: Length;
};

/**
 * Defines the border radius property.
 * @since 9
 */
declare type BorderRadiuses = {
  /**
   * top-left property.
   * @since 9
   */
  topLeft?: Length;

  /**
   * top-right property.
   * @since 9
   */
  topRight?: Length;

  /**
   * bottom-left property.
   * @since 9
   */
  bottomLeft?: Length;

  /**
   * bottom-right property.
   * @since 9
   */
  bottomRight?: Length;
};

/**
 * Defines the border color property.
 * @since 9
 */
declare type EdgeColors = {
  /**
   * top property.
   * @since 9
   */
  top?: ResourceColor;

  /**
   * right property.
   * @since 9
   */
  right?: ResourceColor;

  /**
   * bottom property.
   * @since 9
   */
  bottom?: ResourceColor;

  /**
   * left property.
   * @since 9
   */
  left?: ResourceColor;
};

/**
 * Defines the border style property.
 * @since 9
 */
declare type EdgeStyles = {
  /**
   * top property.
   * @since 9
   */
  top?: BorderStyle;

  /**
   * right property.
   * @since 9
   */
  right?: BorderStyle;

  /**
   * bottom property.
   * @since 9
   */
  bottom?: BorderStyle;

  /**
   * left property.
   * @since 9
   */
  left?: BorderStyle;
};

/**
 * Defines the offset property.
 * @since 7
 */
declare type Offset = {
  /**
   * dx property.
   */
  dx: Length;

  /**
   * dy property.
   */
  dy: Length;
};

/**
 * Defines the color which can use resource.
 * @since 7
 */
declare type ResourceColor = Color | number | string | Resource;

/**
 * Defines the length constrain property.
 * @since 9
 */
declare type LengthConstrain = {
  /**
   * minimum length.
   */
  minLength: Length;

  /**
   * maximum length.
   */
  maxLength: Length;
};

/**
 * Defines the font used for text.
 * @since 7
 */
declare interface Font {
  /**
   * font size.
   */
  size?: Length;

  /**
   * font weight.
   */
  weight?: FontWeight | number | string;

  /**
   * font family.
   */
  family?: string | Resource;

  /**
   * font style.
   */
  style?: FontStyle;
}

/**
 * Defines the area property.
 * @since 8
 */
declare interface Area {
  /**
   * Defines the width property.
   * @since 8
   */
  width: Length;

  /**
   * Defines the height property.
   * @since 8
   */
  height: Length;

  /**
   * Defines the local position.
   * @since 8
   */
  position: Position;

  /**
   * Defines the global position.
   * @since 8
   */
  globalPosition: Position;
}

/**
 * Defines the position.
 * @since 7
 */
declare interface Position {
  /**
   * Coordinate x of the Position.
   * @since 7
   */
  x?: Length;
  /**
   * Coordinate y of the Position.
   * @since 7
   */
  y?: Length;
}

/**
 * Defines the constrain size options.
 * @since 7
 */
declare interface ConstraintSizeOptions {
  /**
   * Defines the min width.
   * @since 7
   */
  minWidth?: Length;
  /**
   * Defines the max width.
   * @since 7
   */
  maxWidth?: Length;
  /**
   * Defines the min height.
   * @since 7
   */
  minHeight?: Length;
  /**
   * Defines the max height.
   * @since 7
   */
  maxHeight?: Length;
}

/**
 * Defines the size options.
 * @since 7
 */
declare interface SizeOptions {
  /**
   * Defines the width.
   * @since 7
   */
  width?: Length;
  /**
   * Defines the height.
   * @since 7
   */
  height?: Length;
}

/**
 * Defines the options of border.
 * @since 7
 */
declare interface BorderOptions {
  /**
   * Defines the border width.
   * @type { Length }
   * @since 7
   */
  /**
   * Defines the border width.
   * @type { EdgeWidths | Length }
   * @since 9
   */
  width?: EdgeWidths | Length;
  /**
   * Defines the border color.
   * @type { ResourceColor }
   * @since 7
   */
  /**
   * Defines the border color.
   * @type { EdgeColors | ResourceColor }
   * @since 9
   */
  color?: EdgeColors | ResourceColor;
  /**
   * Defines the border radius.
   * @type { Length }
   * @since 7
   */
  /**
   * Defines the border radius.
   * @type { BorderRadiuses | Length }
   * @since 9
   */
  radius?: BorderRadiuses | Length;
  /**
   * Defines the border style.
   * @type { BorderStyle }
   * @since 7
   */
  /**
   * Defines the border style.
   * @type { EdgeStyles | BorderStyle }
   * @since 9
   */
  style?: EdgeStyles | BorderStyle;
}

/**
 * Defines the ColorFilter object.
 * @since 9
 */
declare class ColorFilter {
  /**
   * Creates ColorFilter with 4*5 matrix.
   * @param value 4*5 color matrix values. The value[m*n] is located in the m row and n column. The matrix is row-first.
   * @since 9
   */
  constructor(value: number[]);
}

declare module "GlobalResource" {
  module "GlobalResource" {
    // @ts-ignore
    export { Resource };
  }
}
