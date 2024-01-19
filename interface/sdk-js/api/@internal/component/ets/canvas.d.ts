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
 * Filling style algorithm, which determines whether a point is within or outside the path. The following
 *    two configurations are supported:
 * "evenodd": odd and even round rule
 * "nonzero": (Default) Non-zero Wrap Rules
 * @since 8
 */
/**
 * Filling style algorithm, which determines whether a point is within or outside the path. The following
 *    two configurations are supported:
 * "evenodd": odd and even round rule
 * "nonzero": (Default) Non-zero Wrap Rules
 * @form
 * @since 9
 */
declare type CanvasFillRule = "evenodd" | "nonzero";

/**
 * Specifies the attribute of drawing the end of each line segment. The following configurations are supported:
 * "butt": (Default) Segment Ends in Square
 * "round": Segment ends in a circle
 * "square": The end of the segment ends in a square, but a rectangular area is added that is the same width
 *    as the segment and is half the thickness of the segment.
 * @since 8
 */
/**
 * Specifies the attribute of drawing the end of each line segment. The following configurations are supported:
 * "butt": (Default) Segment Ends in Square
 * "round": Segment ends in a circle
 * "square": The end of the segment ends in a square, but a rectangular area is added that is the same width
 *    as the segment and is half the thickness of the segment.
 * @form
 * @since 9
 */
declare type CanvasLineCap = "butt" | "round" | "square";

/**
 * Sets the attribute of how two connected parts (line segments, arcs, and curves) whose length is not 0
 *    are connected together. The following three configurations are supported:
 * "bevel": Fill the ends of the connected sections with an additional triangle-base area,
 *    each with its own independent rectangular corner.
 * "miter": (Default) An additional diamond region is formed by extending the outer edges of the connected portions
 *    so that they intersect at a point.
 * "round": Draw the shape of the corner by filling in an additional sector with the center at the end of the
 *    connected section. The radius of the fillet is the width of the segment.
 * @since 8
 */
/**
 * Sets the attribute of how two connected parts (line segments, arcs, and curves) whose length is not 0
 *    are connected together. The following three configurations are supported:
 * "bevel": Fill the ends of the connected sections with an additional triangle-base area,
 *    each with its own independent rectangular corner.
 * "miter": (Default) An additional diamond region is formed by extending the outer edges of the connected portions
 *    so that they intersect at a point.
 * "round": Draw the shape of the corner by filling in an additional sector with the center at the end of the
 *    connected section. The radius of the fillet is the width of the segment.
 * @form
 * @since 9
 */
declare type CanvasLineJoin = "bevel" | "miter" | "round";

/**
 * Indicates the attribute of the current text direction. The options are as follows:
 * "inherit": (Default) Inherit current Canvas component settings
 * "ltr": The text direction is left to right.
 * "rtl": The text direction is from right to left.
 * @since 8
 */
/**
 * Indicates the attribute of the current text direction. The options are as follows:
 * "inherit": (Default) Inherit current Canvas component settings
 * "ltr": The text direction is left to right.
 * "rtl": The text direction is from right to left.
 * @form
 * @since 9
 */
declare type CanvasDirection = "inherit" | "ltr" | "rtl";

/**
 * Describes the alignment mode for drawing text. The options are as follows:
 * "center": The text is centered.
 * "end": Where text aligns lines end (Left alignment refers to the local from left to right,
 *    and right alignment refers to the local from right to left)
 * "left": The text is left-aligned.
 * "right": The text is right-aligned.
 * "start": (Default) Where the text snap line begins (Left alignment refers to the local from left to right,
 *    and right alignment refers to the local from right to left)
 * @since 8
 */
/**
 * Describes the alignment mode for drawing text. The options are as follows:
 * "center": The text is centered.
 * "end": Where text aligns lines end (Left alignment refers to the local from left to right,
 *    and right alignment refers to the local from right to left)
 * "left": The text is left-aligned.
 * "right": The text is right-aligned.
 * "start": (Default) Where the text snap line begins (Left alignment refers to the local from left to right,
 *    and right alignment refers to the local from right to left)
 * @form
 * @since 9
 */
declare type CanvasTextAlign = "center" | "end" | "left" | "right" | "start";

/**
 * Text baseline, which supports the following configurations:
 * "alphabetic": (Default) The text baseline is the standard letter baseline.
 * "bottom": The text baseline is at the bottom of the text block. The difference between the ideographic baseline
 *    and the ideographic baseline is that the ideographic baseline does not need to consider downlink letters.
 * "hanging": The text baseline is a hanging baseline.
 * "ideographic": The text baseline is the ideographic baseline; If the character itself exceeds the alphabetic
 *    baseline, the ideographic baseline is at the bottom of the character itself.
 * "middle": The text baseline is in the middle of the text block.
 * "top": The text baseline is at the top of the text block.
 * @since 8
 */
/**
 * Text baseline, which supports the following configurations:
 * "alphabetic": (Default) The text baseline is the standard letter baseline.
 * "bottom": The text baseline is at the bottom of the text block. The difference between the ideographic baseline
 *    and the ideographic baseline is that the ideographic baseline does not need to consider downlink letters.
 * "hanging": The text baseline is a hanging baseline.
 * "ideographic": The text baseline is the ideographic baseline; If the character itself exceeds the alphabetic
 *    baseline, the ideographic baseline is at the bottom of the character itself.
 * "middle": The text baseline is in the middle of the text block.
 * "top": The text baseline is at the top of the text block.
 * @form
 * @since 9
 */
declare type CanvasTextBaseline = "alphabetic" | "bottom" | "hanging" | "ideographic" | "middle" | "top";

/**
 * Sets the image smoothness attribute. The options are as follows:
 * "high": height
 * "low": (default)low
 * "medium": medium
 * @since 8
 */
/**
 * Sets the image smoothness attribute. The options are as follows:
 * "high": height
 * "low": (default)low
 * "medium": medium
 * @form
 * @since 9
 */
declare type ImageSmoothingQuality = "high" | "low" | "medium";

/**
 * Opaque objects that describe gradients, created by createLinearGradient() or createRadialGradient()
 * @since 8
 */
/**
 * Opaque objects that describe gradients, created by createLinearGradient() or createRadialGradient()
 * @form
 * @since 9
 */
declare class CanvasGradient {
  /**
   * Add a breakpoint defined by offset and color to the gradient
   * @param number Value between 0 and 1, out of range throws INDEX_SIZE_ERR error
   * @param string CSS color value <color>. If the color value cannot be resolved to a valid CSS color value <color>
   *    a SYNTAX_ERR error is thrown.
   * @since 8
   */
  /**
   * Add a breakpoint defined by offset and color to the gradient
   * @param number Value between 0 and 1, out of range throws INDEX_SIZE_ERR error
   * @param string CSS color value <color>. If the color value cannot be resolved to a valid CSS color value <color>
   *    a SYNTAX_ERR error is thrown.
   * @form
   * @since 9
   */
  addColorStop(offset: number, color: string): void;
}

/**
 * Path object, which provides basic methods for drawing paths.
 * @since 8
 */
/**
 * Path object, which provides basic methods for drawing paths.
 * @form
 * @since 9
 */
declare class CanvasPath {
  /**
   * Draw an arc path
   * @param x The x-axis coordinate of the center (center of the circle) of the arc.
   * @param y The y-axis coordinate of the center (center of the circle) of the arc.
   * @param radius Radius of the arc.
   * @param startAngle Start point of an arc, which starts to be calculated in the x-axis direction. The unit is radian.
   * @param endAngle The end point of the arc, in radians.
   * @param counterclockwise If the value is true, the arc is drawn counterclockwise. Otherwise,
   *    the arc is drawn clockwise. The default value is false.
   * @since 8
   */
  /**
   * Draw an arc path
   * @param x The x-axis coordinate of the center (center of the circle) of the arc.
   * @param y The y-axis coordinate of the center (center of the circle) of the arc.
   * @param radius Radius of the arc.
   * @param startAngle Start point of an arc, which starts to be calculated in the x-axis direction. The unit is radian.
   * @param endAngle The end point of the arc, in radians.
   * @param counterclockwise If the value is true, the arc is drawn counterclockwise. Otherwise,
   *    the arc is drawn clockwise. The default value is false.
   * @form
   * @since 9
   */
  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void;

  /**
   * Draw arc paths based on control points and radius
   * @param x1 The x-axis coordinate of the first control point.
   * @param y1 The y-axis coordinate of the first control point.
   * @param x2 The x-axis coordinate of the second control point.
   * @param y2 The y-axis coordinate of the second control point.
   * @param radius Radius of the arc.
   * @since 8
   */
  /**
   * Draw arc paths based on control points and radius
   * @param x1 The x-axis coordinate of the first control point.
   * @param y1 The y-axis coordinate of the first control point.
   * @param x2 The x-axis coordinate of the second control point.
   * @param y2 The y-axis coordinate of the second control point.
   * @param radius Radius of the arc.
   * @form
   * @since 9
   */
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;

  /**
   * Drawing Cubic Bessel Curve Paths
   * @param cp1x The x-axis coordinate of the first control point.
   * @param cp1y The y-axis coordinate of the first control point.
   * @param cp2x The x-axis coordinate of the second control point.
   * @param cp2y The y-axis coordinate of the second control point.
   * @param x x-axis coordinate of the end point.
   * @param y y-axis coordinate of the end point.
   * @since 8
   */
  /**
   * Drawing Cubic Bessel Curve Paths
   * @param cp1x The x-axis coordinate of the first control point.
   * @param cp1y The y-axis coordinate of the first control point.
   * @param cp2x The x-axis coordinate of the second control point.
   * @param cp2y The y-axis coordinate of the second control point.
   * @param x x-axis coordinate of the end point.
   * @param y y-axis coordinate of the end point.
   * @form
   * @since 9
   */
  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;

  /**
   * Returns the pen point to the start point of the current sub-path
   * @since 8
   */
  /**
   * Returns the pen point to the start point of the current sub-path
   * @form
   * @since 9
   */
  closePath(): void;

  /**
   * Draw an Elliptic Path
   * @param x x-axis coordinate of the center of the ellipse.
   * @param y y-axis coordinate of the center of the ellipse.
   * @param radiusX Radius of the major axis of the ellipse.
   * @param radiusY Radius of the minor axis of the ellipse.
   * @param rotation The rotation angle of the ellipse, in radians (not angular degrees).
   * @param startAngle The angle of the starting point to be drawn, measured from the x-axis in radians
   *    (not angular degrees).
   * @param endAngle The angle, in radians, at which the ellipse is to be drawn (not angular degrees).
   * @param counterclockwise If the value is true, the ellipse is drawn counterclockwise. Otherwise,
   *    the ellipse is drawn clockwise. The default value is false.
   * @since 8
   */
  /**
   * Draw an Elliptic Path
   * @param x x-axis coordinate of the center of the ellipse.
   * @param y y-axis coordinate of the center of the ellipse.
   * @param radiusX Radius of the major axis of the ellipse.
   * @param radiusY Radius of the minor axis of the ellipse.
   * @param rotation The rotation angle of the ellipse, in radians (not angular degrees).
   * @param startAngle The angle of the starting point to be drawn, measured from the x-axis in radians
   *    (not angular degrees).
   * @param endAngle The angle, in radians, at which the ellipse is to be drawn (not angular degrees).
   * @param counterclockwise If the value is true, the ellipse is drawn counterclockwise. Otherwise,
   *    the ellipse is drawn clockwise. The default value is false.
   * @form
   * @since 9
   */
  ellipse(
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    counterclockwise?: boolean,
  ): void;

  /**
   * Connect sub-path using straight lines
   * @param x The x-axis coordinate of the end point of the line.
   * @param y The y-axis coordinate of the end point of the line.
   * @since 8
   */
  /**
   * Connect sub-path using straight lines
   * @param x The x-axis coordinate of the end point of the line.
   * @param y The y-axis coordinate of the end point of the line.
   * @form
   * @since 9
   */
  lineTo(x: number, y: number): void;

  /**
   * Moves the start point of a new sub-path to the (x, y) coordinate.
   * @param x The x-axis coordinate of the point.
   * @param y The y-axis coordinate of the point.
   * @since 8
   */
  /**
   * Moves the start point of a new sub-path to the (x, y) coordinate.
   * @param x The x-axis coordinate of the point.
   * @param y The y-axis coordinate of the point.
   * @form
   * @since 9
   */
  moveTo(x: number, y: number): void;

  /**
   * Draw quadratic Bezier curve paths
   * @param cpx The x-axis coordinate of the control point.
   * @param cpy The y-axis coordinate of the control point.
   * @param x x-axis coordinate of the end point.
   * @param y y-axis coordinate of the end point.
   * @since 8
   */
  /**
   * Draw quadratic Bezier curve paths
   * @param cpx The x-axis coordinate of the control point.
   * @param cpy The y-axis coordinate of the control point.
   * @param x x-axis coordinate of the end point.
   * @param y y-axis coordinate of the end point.
   * @form
   * @since 9
   */
  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;

  /**
   * Draw Rectangular Paths
   * @param x The x-axis coordinate of the start point of the rectangle.
   * @param y The y-axis coordinate of the start point of the rectangle.
   * @param w Width of the rectangle.
   * @param h Height of the rectangle.
   * @since 8
   */
  /**
   * Draw Rectangular Paths
   * @param x The x-axis coordinate of the start point of the rectangle.
   * @param y The y-axis coordinate of the start point of the rectangle.
   * @param w Width of the rectangle.
   * @param h Height of the rectangle.
   * @form
   * @since 9
   */
  rect(x: number, y: number, w: number, h: number): void;
}

/**
 * 2D path object for path drawing
 * @since 8
 */
/**
 * 2D path object for path drawing
 * @form
 * @since 9
 */
declare class Path2D extends CanvasPath {
  /**
   * Adds a path according to the specified path variable.
   * @param path Indicates the path object to be added.
   * @param transform Transformation matrix of the new trail
   * @since 8
   */
  /**
   * Adds a path according to the specified path variable.
   * @param path Indicates the path object to be added.
   * @param transform Transformation matrix of the new trail
   * @form
   * @since 9
   */
  addPath(path: Path2D, transform?: Matrix2D): void;

  /**
   * Create an empty path object.
   * @since 8
   */
  /**
   * Create an empty path object.
   * @form
   * @since 9
   */
  constructor();

  /**
   * Create a copy of a path object
   * @param path Path object to be copied
   * @since 8
   */
  /**
   * Create a copy of a path object
   * @param path Path object to be copied
   * @form
   * @since 9
   */
  constructor(path: Path2D);

  /**
   * Create a new path according to the description.
   * @param d Indicates the path string that compiles with the SVG path description specifications.
   * @since 8
   */
  /**
   * Create a new path according to the description.
   * @param d Indicates the path string that compiles with the SVG path description specifications.
   * @form
   * @since 9
   */
  constructor(d: string);
}

/**
 * Describes an opaque object of a template, which is created using the createPattern() method.
 * @since 8
 */
/**
 * Describes an opaque object of a template, which is created using the createPattern() method.
 * @form
 * @since 9
 */
declare type CanvasPattern = import('../api/@internal/full/canvaspattern').CanvasPattern;

/**
 * Size information of the text
 * @since 8
 */
/**
 * Size information of the text
 * @form
 * @since 9
 */
declare interface TextMetrics {
  /**
   * Double, the distance from the horizontal line indicated by the textBaseline property to the top of
   *    the rectangular boundary of the rendered text.
   * @since 8
   */
  /**
   * Double, the distance from the horizontal line indicated by the textBaseline property to the top of
   *    the rectangular boundary of the rendered text.
   * @form
   * @since 9
   */
  readonly actualBoundingBoxAscent: number;

  /**
   * Double, the distance from the horizontal line indicated by the textBaseline property to the bottom of
   *    the rectangular boundary of the rendered text.
   * @since 8
   */
  /**
   * Double, the distance from the horizontal line indicated by the textBaseline property to the bottom of
   *    the rectangular boundary of the rendered text.
   * @form
   * @since 9
   */
  readonly actualBoundingBoxDescent: number;

  /**
   * Double, parallel to the baseline, distance from the alignment point determined by the textAlign property to
   *    the left of the text rectangle boundary.
   * @since 8
   */
  /**
   * Double, parallel to the baseline, distance from the alignment point determined by the textAlign property to
   *    the left of the text rectangle boundary.
   * @form
   * @since 9
   */
  readonly actualBoundingBoxLeft: number;

  /**
   * Double, parallel to the baseline, distance from the alignment point determined by the textAlign property to
   *    the right of the text rectangle boundary.
   * @since 8
   */
  /**
   * Double, parallel to the baseline, distance from the alignment point determined by the textAlign property to
   *    the right of the text rectangle boundary.
   * @form
   * @since 9
   */
  readonly actualBoundingBoxRight: number;

  /**
   * Double, the distance from the horizontal line indicated by the textBaseline property to the alphabetic baseline of
   *    the wireframe.
   * @since 8
   */
  /**
   * Double, the distance from the horizontal line indicated by the textBaseline property to the alphabetic baseline of
   *    the wireframe.
   * @form
   * @since 9
   */
  readonly alphabeticBaseline: number;

  /**
   * Double, the distance from the horizontal line indicated by the textBaseline property to the top of the
   *    em square in the wireframe.
   * @since 8
   */
  /**
   * Double, the distance from the horizontal line indicated by the textBaseline property to the top of the
   *    em square in the wireframe.
   * @form
   * @since 9
   */
  readonly emHeightAscent: number;

  /**
   * Double, distance from the horizontal line indicated by the textBaseline property to the bottom of the
   *    em box in the wireframe.
   * @since 8
   */
  /**
   * Double, distance from the horizontal line indicated by the textBaseline property to the bottom of the
   *    em box in the wireframe.
   * @form
   * @since 9
   */
  readonly emHeightDescent: number;

  /**
   * Double, distance from the horizontal line indicated by the textBaseline property to the top of the
   *    highest rectangle boundary of all fonts rendering text.
   * @since 8
   */
  /**
   * Double, distance from the horizontal line indicated by the textBaseline property to the top of the
   *    highest rectangle boundary of all fonts rendering text.
   * @form
   * @since 9
   */
  readonly fontBoundingBoxAscent: number;

  /**
   * Double, distance from the horizontal line indicated by the textBaseline property to the bottom of the
   *   rectangular boundary of all fonts rendering text.
   * @since 8
   */
  /**
   * Double, distance from the horizontal line indicated by the textBaseline property to the bottom of the
   *   rectangular boundary of all fonts rendering text.
   * @form
   * @since 9
   */
  readonly fontBoundingBoxDescent: number;

  /**
   * Double, distance from the horizontal line indicated by the textBaseline property to
   *    the hanging baseline of the wireframe.
   * @since 8
   */
  /**
   * Double, distance from the horizontal line indicated by the textBaseline property to
   *    the hanging baseline of the wireframe.
   * @form
   * @since 9
   */
  readonly hangingBaseline: number;

  /**
   * Double, distance from the horizontal line indicated by the textBaseline property to
   *    the ideographic baseline of the wireframe.
   * @since 8
   */
  /**
   * Double, distance from the horizontal line indicated by the textBaseline property to
   *    the ideographic baseline of the wireframe.
   * @form
   * @since 9
   */
  readonly ideographicBaseline: number;

  /**
   * Indicates the width of a character string. The value is of the double type.
   * @since 8
   */
  /**
   * Indicates the width of a character string. The value is of the double type.
   * @form
   * @since 9
   */
  readonly width: number;

  /**
   * Indicates the height of a character string. The value is of the double type.
   * @since 8
   */
  /**
   * Indicates the height of a character string. The value is of the double type.
   * @form
   * @since 9
   */
  readonly height: number;
}

/**
 * Bitmap image object that can be drawn onto the current Canvas
 * @since 8
 */
/**
 * Bitmap image object that can be drawn onto the current Canvas
 * @form
 * @since 9
 */
declare class ImageBitmap {
  /**
   * Indicates the height of the CSS pixel unit of ImageData.
   * @since 8
   */
  /**
   * Indicates the height of the CSS pixel unit of ImageData.
   * @form
   * @since 9
   */
  readonly height: number;

  /**
   * Indicates the width of the CSS pixel unit of ImageData.
   * @since 8
   */
  /**
   * Indicates the width of the CSS pixel unit of ImageData.
   * @form
   * @since 9
   */
  readonly width: number;

  /**
   * Releases all graphics resources associated with an ImageBitmap.
   * @since 8
   */
  /**
   * Releases all graphics resources associated with an ImageBitmap.
   * @form
   * @since 9
   */
  close(): void;

  /**
   * Create an ImageBitmap object based on the transferred image path.
   * @param src Path of the image object.
   * @since 8
   */
  /**
   * Create an ImageBitmap object based on the transferred image path.
   * @param src Path of the image object.
   * @form
   * @since 9
   */
  constructor(src: string);

  /**
   * Transfer a PixelMap object to construct an ImageBitmap object.
   * @param data PixelMap object
   * @since 8
   */
  constructor(data: PixelMap);
}

/**
 * Image data object
 * @since 8
 */
/**
 * Image data object
 * @form
 * @since 9
 */
declare class ImageData {
  /**
   * Array containing image pixel data
   * @since 8
   */
  /**
   * Array containing image pixel data
   * @form
   * @since 9
   */
  readonly data: Uint8ClampedArray;

  /**
   * Width of the image.
   * @since 8
   */
  /**
   * Width of the image.
   * @form
   * @since 9
   */
  readonly height: number;

  /**
   * Height of the image.
   * @since 8
   */
   /**
   * Height of the image.
   * @form
   * @since 9
   */
  readonly width: number;

  /**
   * Create an ImageData object based on the input parameters.
   * @param width Width of the image.
   * @param height Height of the image.
   * @param data Data of the image. If this parameter is not specified, the default value is a black rectangular image.
   * @since 8
   */
  /**
   * Create an ImageData object based on the input parameters.
   * @param width Width of the image.
   * @param height Height of the image.
   * @param data Data of the image. If this parameter is not specified, the default value is a black rectangular image.
   * @form
   * @since 9
   */
  constructor(width: number, height: number, data?: Uint8ClampedArray);
}

/**
 * This object allows you to set properties when creating a rendering context
 * @since 8
 */
/**
 * This object allows you to set properties when creating a rendering context
 * @form
 * @since 9
 */
declare class RenderingContextSettings {
  /**
   * Indicates whether anti-aliasing is enabled for canvas. The default value is false.
   * @since 8
   */
  /**
   * Indicates whether anti-aliasing is enabled for canvas. The default value is false.
   * @form
   * @since 9
   */
  antialias?: boolean;

  /**
   * Create an RenderingContextSettings object based on the antialias and alpha.
   * @param antialias Indicates whether anti-aliasing is enabled for canvas
   * @since 8
   */
  /**
   * Create an RenderingContextSettings object based on the antialias and alpha.
   * @param antialias Indicates whether anti-aliasing is enabled for canvas
   * @form
   * @since 9
   */
  constructor(antialias?: boolean);
}

/**
 * Canvas renderer for drawing shapes, text, images and other objects
 * @since 8
 */
/**
 * Canvas renderer for drawing shapes, text, images and other objects
 * @form
 * @since 9
 */
declare class CanvasRenderer extends CanvasPath {
  /**
   * Transparency. The value ranges from 0.0 (completely transparent) to 1.0 (completely opaque).
   *    The default value is 1.0. If the value is out of range, the assignment is invalid.
   * @since 8
   */
  /**
   * Transparency. The value ranges from 0.0 (completely transparent) to 1.0 (completely opaque).
   *    The default value is 1.0. If the value is out of range, the assignment is invalid.
   * @form
   * @since 9
   */
  globalAlpha: number;

  /**
   * Type of composition operation applied when drawing a new shape. The following types are supported:
   * source-over: (Default) Draws a new drawing on top of an existing canvas context.
   * source-in: The new drawing is drawn only where the new drawing overlaps the target canvas.
   *    Everything else is transparent.
   * source-out: Draws a new drawing where it does not overlap with the existing canvas content.
   * source-atop: The new drawing is drawn only where it overlaps the content of the existing canvas.
   * destination-over: Draws a new graphic behind the existing canvas content.
   * destination-in: Existing canvas content remains where the new drawing overlaps the existing canvas content.
   *    Everything else is transparent.
   * destination-out: Existing content remains where the new drawing does not overlap.
   * destination-atop: The existing canvas retains only the part that overlaps with the new drawing,
   *    which is drawn behind the canvas content.
   * lighter: The color of two overlapping shapes is determined by adding the color values.
   * copy: Only new graphics are displayed.
   * xor: In the image, those overlaps and other places outside of the normal drawing are transparent.
   * multiply: Multiply the top pixel by the bottom pixel, and the result is a darker picture.
   * screen: The pixels are inverted, multiplied, and inverted again, and the result is a brighter picture.
   * overlay: The combination of multiply and screen enables dark places to be darker and bright places to be brighter.
   * darken: Keeps the darkest pixel in both layers.
   * lighten: Keeps the brightest pixel in both layers.
   * color-dodge: The inverse of dividing the bottom layer by the top layer.
   * color-burn: Divide the inverted bottom layer by the top layer, and reverse the result.
   * hard-light: A combination of multiplication and screen is similar to overlay, but the layers are interchanged.
   * difference: Subtract the bottom from the top or vice versa to get a positive value.
   * soft-light: A softer version of hard-light. Pure black or pure white does not result in pure black or pure white.
   * exclusion: Similar to difference, but with lower contrast.
   * hue: The luminance and chroma of the bottom layer are retained while the hue of the top layer is employed.
   * saturation: The luminance (luma) and hue (hue) of the bottom layer are retained while the chroma (chroma) of
   *    the top layer is used.
   * color: The luminance (luma) of the bottom layer is retained while the hue (hue) and chroma (chroma) of
   *    the top layer are used.
   * luminosity: The hue and chroma of the bottom layer are maintained while the luminance of the top layer is used.
   * @since 8
   */
  /**
   * Type of composition operation applied when drawing a new shape. The following types are supported:
   * source-over: (Default) Draws a new drawing on top of an existing canvas context.
   * source-in: The new drawing is drawn only where the new drawing overlaps the target canvas.
   *    Everything else is transparent.
   * source-out: Draws a new drawing where it does not overlap with the existing canvas content.
   * source-atop: The new drawing is drawn only where it overlaps the content of the existing canvas.
   * destination-over: Draws a new graphic behind the existing canvas content.
   * destination-in: Existing canvas content remains where the new drawing overlaps the existing canvas content.
   *    Everything else is transparent.
   * destination-out: Existing content remains where the new drawing does not overlap.
   * destination-atop: The existing canvas retains only the part that overlaps with the new drawing,
   *    which is drawn behind the canvas content.
   * lighter: The color of two overlapping shapes is determined by adding the color values.
   * copy: Only new graphics are displayed.
   * xor: In the image, those overlaps and other places outside of the normal drawing are transparent.
   * multiply: Multiply the top pixel by the bottom pixel, and the result is a darker picture.
   * screen: The pixels are inverted, multiplied, and inverted again, and the result is a brighter picture.
   * overlay: The combination of multiply and screen enables dark places to be darker and bright places to be brighter.
   * darken: Keeps the darkest pixel in both layers.
   * lighten: Keeps the brightest pixel in both layers.
   * color-dodge: The inverse of dividing the bottom layer by the top layer.
   * color-burn: Divide the inverted bottom layer by the top layer, and reverse the result.
   * hard-light: A combination of multiplication and screen is similar to overlay, but the layers are interchanged.
   * difference: Subtract the bottom from the top or vice versa to get a positive value.
   * soft-light: A softer version of hard-light. Pure black or pure white does not result in pure black or pure white.
   * exclusion: Similar to difference, but with lower contrast.
   * hue: The luminance and chroma of the bottom layer are retained while the hue of the top layer is employed.
   * saturation: The luminance (luma) and hue (hue) of the bottom layer are retained while the chroma (chroma) of
   *    the top layer is used.
   * color: The luminance (luma) of the bottom layer is retained while the hue (hue) and chroma (chroma) of
   *    the top layer are used.
   * luminosity: The hue and chroma of the bottom layer are maintained while the luminance of the top layer is used.
   * @form
   * @since 9
   */
  globalCompositeOperation: string;

  /**
   * Draw an image on a canvas
   * @param image Picture objects drawn to the canvas.
   * @param dx x-axis coordinate of the upper left corner of the image on the target canvas.
   * @param dy y-axis coordinate of the upper left corner of the image on the target canvas.
   * @since 8
   */
  /**
   * Draw an image on a canvas
   * @param image Picture objects drawn to the canvas.
   * @param dx x-axis coordinate of the upper left corner of the image on the target canvas.
   * @param dy y-axis coordinate of the upper left corner of the image on the target canvas.
   * @form
   * @since 9
   */
  drawImage(image: ImageBitmap | PixelMap, dx: number, dy: number): void;

  /**
   * Draw an image on a canvas
   * @param image Picture objects drawn to the canvas.
   * @param dx x-axis coordinate of the upper left corner of the image on the target canvas.
   * @param dy y-axis coordinate of the upper left corner of the image on the target canvas.
   * @param dw Specifies the drawing width of the image on the target canvas. The width of the drawn image will be scaled.
   * @param dh Specifies the drawing height of the image on the target canvas. The height of the drawn image will be scaled.
   * @since 8
   */
  /**
   * Draw an image on a canvas
   * @param image Picture objects drawn to the canvas.
   * @param dx x-axis coordinate of the upper left corner of the image on the target canvas.
   * @param dy y-axis coordinate of the upper left corner of the image on the target canvas.
   * @param dw Specifies the drawing width of the image on the target canvas. The width of the drawn image will be scaled.
   * @param dh Specifies the drawing height of the image on the target canvas. The height of the drawn image will be scaled.
   * @form
   * @since 9
   */
  drawImage(image: ImageBitmap | PixelMap, dx: number, dy: number, dw: number, dh: number): void;

  /**
   *Draw an image on a canvas
   * @param image Picture objects drawn to the canvas.
   * @param sx x coordinate of the upper left corner of the rectangle (cropping) selection box of the image.
   * @param sy y coordinate of the upper left corner of the rectangle (cropping) selection box of the image.
   * @param sw Width of the rectangle (cropping) selection box of the image.
   * @param sh Height of the rectangle (cropping) selection box of the image.
   * @param dx x-axis coordinate of the upper left corner of the image on the target canvas.
   * @param dy y-axis coordinate of the upper left corner of the image on the target canvas.
   * @param dw Specifies the drawing width of the image on the target canvas. The width of the drawn image will be scaled.
   * @param dh Specifies the drawing height of the image on the target canvas. The height of the drawn image will be scaled.
   * @since 8
   */
  /**
   *Draw an image on a canvas
   * @param image Picture objects drawn to the canvas.
   * @param sx x coordinate of the upper left corner of the rectangle (cropping) selection box of the image.
   * @param sy y coordinate of the upper left corner of the rectangle (cropping) selection box of the image.
   * @param sw Width of the rectangle (cropping) selection box of the image.
   * @param sh Height of the rectangle (cropping) selection box of the image.
   * @param dx x-axis coordinate of the upper left corner of the image on the target canvas.
   * @param dy y-axis coordinate of the upper left corner of the image on the target canvas.
   * @param dw Specifies the drawing width of the image on the target canvas. The width of the drawn image will be scaled.
   * @param dh Specifies the drawing height of the image on the target canvas. The height of the drawn image will be scaled.
   * @form
   * @since 9
   */
  drawImage(
    image: ImageBitmap | PixelMap,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
  ): void;

  /**
   * Clear the sub-path list and start a new path.
   * @since 8
   */
  /**
   * Clear the sub-path list and start a new path.
   * @form
   * @since 9
   */
  beginPath(): void;

  /**
   * Sets the currently created path as the current clipping path
   * @param fillRule Algorithm rule. For details, see {@link CanvasFillRule}.
   * @since 8
   */
  /**
   * Sets the currently created path as the current clipping path
   * @param fillRule Algorithm rule. For details, see {@link CanvasFillRule}.
   * @form
   * @since 9
   */
  clip(fillRule?: CanvasFillRule): void;

  /**
   * Tailoring according to the specified path
   * @param path Path to be cut.
   * @param fillRule Algorithm rule. For details, see {@link CanvasFillRule}.
   * @since 8
   */
  /**
   * Tailoring according to the specified path
   * @param path Path to be cut.
   * @param fillRule Algorithm rule. For details, see {@link CanvasFillRule}.
   * @form
   * @since 9
   */
  clip(path: Path2D, fillRule?: CanvasFillRule): void;

  /**
   * Fills existing paths according to the current fill style.
   * @param fillRule Algorithm rule. For details, see {@link CanvasFillRule}.
   * @since 8
   */
  /**
   * Fills existing paths according to the current fill style.
   * @param fillRule Algorithm rule. For details, see {@link CanvasFillRule}.
   * @form
   * @since 9
   */
  fill(fillRule?: CanvasFillRule): void;

  /**
   * Fills the specified path according to the current fill style
   * @param path Path to be filled.
   * @param fillRule Algorithm rule. For details, see {@link CanvasFillRule}.
   * @since 8
   */
  /**
   * Fills the specified path according to the current fill style
   * @param path Path to be filled.
   * @param fillRule Algorithm rule. For details, see {@link CanvasFillRule}.
   * @form
   * @since 9
   */
  fill(path: Path2D, fillRule?: CanvasFillRule): void;

  /**
   * Draws an existing path according to the current stroke style.
   * @since 8
   */
  /**
   * Draws an existing path according to the current stroke style.
   * @form
   * @since 9
   */
  stroke(): void;

  /**
   * Draws the specified path according to the current stroke style
   * @param path Specified stroke path object
   * @since 8
   */
  /**
   * Draws the specified path according to the current stroke style
   * @param path Specified stroke path object
   * @form
   * @since 9
   */
  stroke(path: Path2D): void;

  /**
   * Attributes that describe the fill color and style. The default value is # 000 (black). The options are as follows:
   * color: Color String
   * CanvasGradient: Color gradient object. For details, see {@link CanvasGradient}.
   * CanvasPattern: Template object. For details, see {@link CanvasPattern}.
   * @param path Specified stroke path object
   * @since 8
   */
  /**
   * Attributes that describe the fill color and style. The default value is # 000 (black). The options are as follows:
   * color: Color String
   * CanvasGradient: Color gradient object. For details, see {@link CanvasGradient}.
   * CanvasPattern: Template object. For details, see {@link CanvasPattern}.
   * @param path Specified stroke path object
   * @form
   * @since 9
   */
  fillStyle: string | CanvasGradient | CanvasPattern;

  /**
   * Attributes of the stroke color and style. The default value is # 000 (black). The options are as follows:
   * color: Color String
   * CanvasGradient: Color gradient object. For details, see {@link CanvasGradient}.
   * CanvasPattern: Template object. For details, see {@link CanvasPattern}.
   * @param path Specified stroke path object
   * @since 8
   */
  /**
   * Attributes of the stroke color and style. The default value is # 000 (black). The options are as follows:
   * color: Color String
   * CanvasGradient: Color gradient object. For details, see {@link CanvasGradient}.
   * CanvasPattern: Template object. For details, see {@link CanvasPattern}.
   * @param path Specified stroke path object
   * @form
   * @since 9
   */
  strokeStyle: string | CanvasGradient | CanvasPattern;

  /**
   * Creates a linear gradient object that is specified along the parameter coordinates
   * @param x0 The x-axis coordinate of the start point.
   * @param y0 The y-axis coordinate of the start point.
   * @param x1 x-axis coordinate of the end point.
   * @param y1 y-axis coordinate of the end point.
   * @since 8
   */
  /**
   * Creates a linear gradient object that is specified along the parameter coordinates
   * @param x0 The x-axis coordinate of the start point.
   * @param y0 The y-axis coordinate of the start point.
   * @param x1 x-axis coordinate of the end point.
   * @param y1 y-axis coordinate of the end point.
   * @form
   * @since 9
   */
  createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;

  /**
   * Creates a template object using the specified image
   * @param image Objects as duplicate image sources
   * @param repetition Specifies how to repeat images. The following four modes are supported:
   * "repeat": Repeated images in both X and Y directions
   * "repeat-x": Repeated images in the X-axis direction but not in the Y-axis direction
   * "repeat-y": The image is repeated in the Y axis direction, and the image is not repeated in the X axis direction.
   * "no-repeat": Non-repeating images in both X and Y directions
   * @since 8
   */
  /**
   * Creates a template object using the specified image
   * @param image Objects as duplicate image sources
   * @param repetition Specifies how to repeat images. The following four modes are supported:
   * "repeat": Repeated images in both X and Y directions
   * "repeat-x": Repeated images in the X-axis direction but not in the Y-axis direction
   * "repeat-y": The image is repeated in the Y axis direction, and the image is not repeated in the X axis direction.
   * "no-repeat": Non-repeating images in both X and Y directions
   * @form
   * @since 9
   */
  createPattern(image: ImageBitmap, repetition: string | null): CanvasPattern | null;

  /**
   * Creates a radioactive gradient object based on parameters that determine the coordinates of two circles
   * @param x0 The x-axis coordinate of the start circle.
   * @param y0 The y-axis coordinate of the start circle.
   * @param r0 Radius of the starting circle.
   * @param x1 The x-axis coordinate of the end circle.
   * @param y1 The y-axis coordinate of the end circle.
   * @param r1 Radius of the end circle.
   * @since 8
   */
  /**
   * Creates a radioactive gradient object based on parameters that determine the coordinates of two circles
   * @param x0 The x-axis coordinate of the start circle.
   * @param y0 The y-axis coordinate of the start circle.
   * @param r0 Radius of the starting circle.
   * @param x1 The x-axis coordinate of the end circle.
   * @param y1 The y-axis coordinate of the end circle.
   * @param r1 Radius of the end circle.
   * @form
   * @since 9
   */
  createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient;

  /**
   * Provides filter effects such as blur and grayscale. You can set the following filter effects:
   * blur(<length>): Adds a Gaussian blur effect to the drawing
   * brightness(<percentage>): Provides a linear multiplication for the drawing and adjusts the brightness level.
   * contrast(<percentage>): Adjusts the contrast of the image. When the value is 0%, the image is completely black.
   *    When the value is 100%, there is no change in the image.
   * drop-shadow(<offset-x>, <offset-y>, <blur-radius>, <spread-radius>, <color>): Shading the image
   *           --- <offset-x>: Describes the horizontal distance of the shadow.
   *           --- <offset-y>: Describes the vertical distance of the shadow.
   *           --- <blur-radius>: Blur radius. The larger the value, the greater the blur. The value cannot be a negative number.
   *           --- <spread-radius>: Positive numbers make the shadow expand larger, negative numbers make the shadow shrink.
   *           --- <color>: Shadow Color
   * grayscale(<percentage>)：Converts the image to a gray image. When the value is 100%, the image is completely gray.
   *    When the value is 0%, there is no change in the image.
   * hue-rotate(<degree>)：Perform color rotation on an image. When the value is 0 degrees, there is no change in the image.
   * invert(<percentage>)：Inverted image (representing the effect of a photographic negative). When the value is 100%,
   *    the image is completely inverted. When the value is 0%, there is no change in the image.
   * opacity(<percentage>)：Transparency of the image. At 0%, the image is completely transparent.
   *    When the value is 100%, there is no change in the image.
   * saturate(<percentage>)：Perform saturation processing on the image. At 0%, the image is completely un-saturated.
   *    When the value is 100%, there is no change in the image.
   * sepia(<percentage>)：The image is sepia (nostalgic style). At 100%, the image turns completely sepia.
   *    When the value is 0%, there is no change in the image.
   * none：Turn off filter effects
   * @since 8
   */
  /**
   * Provides filter effects such as blur and grayscale. You can set the following filter effects:
   * blur(<length>): Adds a Gaussian blur effect to the drawing
   * brightness(<percentage>): Provides a linear multiplication for the drawing and adjusts the brightness level.
   * contrast(<percentage>): Adjusts the contrast of the image. When the value is 0%, the image is completely black.
   *    When the value is 100%, there is no change in the image.
   * drop-shadow(<offset-x>, <offset-y>, <blur-radius>, <spread-radius>, <color>): Shading the image
   *           --- <offset-x>: Describes the horizontal distance of the shadow.
   *           --- <offset-y>: Describes the vertical distance of the shadow.
   *           --- <blur-radius>: Blur radius. The larger the value, the greater the blur. The value cannot be a negative number.
   *           --- <spread-radius>: Positive numbers make the shadow expand larger, negative numbers make the shadow shrink.
   *           --- <color>: Shadow Color
   * grayscale(<percentage>)：Converts the image to a gray image. When the value is 100%, the image is completely gray.
   *    When the value is 0%, there is no change in the image.
   * hue-rotate(<degree>)：Perform color rotation on an image. When the value is 0 degrees, there is no change in the image.
   * invert(<percentage>)：Inverted image (representing the effect of a photographic negative). When the value is 100%,
   *    the image is completely inverted. When the value is 0%, there is no change in the image.
   * opacity(<percentage>)：Transparency of the image. At 0%, the image is completely transparent.
   *    When the value is 100%, there is no change in the image.
   * saturate(<percentage>)：Perform saturation processing on the image. At 0%, the image is completely un-saturated.
   *    When the value is 100%, there is no change in the image.
   * sepia(<percentage>)：The image is sepia (nostalgic style). At 100%, the image turns completely sepia.
   *    When the value is 0%, there is no change in the image.
   * none：Turn off filter effects
   * @form
   * @since 9
   */
  filter: string;

  /**
   * Creates a new, empty ImageData object of the specified size
   * @param sw Width of the ImageData object.
   * @param sh Height of the ImageData object.
   * @since 8
   */
  /**
   * Creates a new, empty ImageData object of the specified size
   * @param sw Width of the ImageData object.
   * @param sh Height of the ImageData object.
   * @form
   * @since 9
   */
  createImageData(sw: number, sh: number): ImageData;

  /**
   * From an existing ImageData object, copy an object with the same width and height as the image.
   *    The image content is not copied.
   * @param imagedata ImageData object to be copied.
   * @since 8
   */
  /**
   * From an existing ImageData object, copy an object with the same width and height as the image.
   *    The image content is not copied.
   * @param imagedata ImageData object to be copied.
   * @form
   * @since 9
   */
  createImageData(imagedata: ImageData): ImageData;

  /**
   * Obtains the pixel data of a specified area on the current canvas.
   * @param sx x coordinate of the upper left corner of the rectangular area of the image data to be extracted.
   * @param sy y coordinate of the upper left corner of the rectangular area of the image data to be extracted.
   * @param sw The width of the rectangular area of the image data to be extracted.
   * @param sh The height of the rectangular area of the image data to be extracted.
   * @since 8
   */
  /**
   * Obtains the pixel data of a specified area on the current canvas.
   * @param sx x coordinate of the upper left corner of the rectangular area of the image data to be extracted.
   * @param sy y coordinate of the upper left corner of the rectangular area of the image data to be extracted.
   * @param sw The width of the rectangular area of the image data to be extracted.
   * @param sh The height of the rectangular area of the image data to be extracted.
   * @form
   * @since 9
   */
  getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;

  /**
   * Obtains the PixelMap of a specified area on the current canvas.
   * @param sx x coordinate of the upper left corner of the rectangular area of the PixelMap to be extracted.
   * @param sy y coordinate of the upper left corner of the rectangular area of the PixelMap to be extracted.
   * @param sw The width of the rectangular area of the PixelMap to be extracted.
   * @param sh The height of the rectangular area of the PixelMap to be extracted.
   * @since 8
   */
  getPixelMap(sx: number, sy: number, sw: number, sh: number): PixelMap;

  /**
   * Draws the specified ImageData object onto the canvas
   * @param imagedata ImageData object to be drawn.
   * @param dx Position offset of the source image data in the target canvas (the offset in the x-axis direction).
   * @param dy Position offset of the source image data in the target canvas (the offset in the y-axis direction).
   * @since 8
   */
  /**
   * Draws the specified ImageData object onto the canvas
   * @param imagedata ImageData object to be drawn.
   * @param dx Position offset of the source image data in the target canvas (the offset in the x-axis direction).
   * @param dy Position offset of the source image data in the target canvas (the offset in the y-axis direction).
   * @form
   * @since 9
   */
  putImageData(imagedata: ImageData, dx: number, dy: number): void;

  /**
   * Draws the specified ImageData object onto the canvas
   * @param imagedata ImageData object to be drawn.
   * @param dx Position offset of the source image data in the target canvas (the offset in the x-axis direction).
   * @param dy Position offset of the source image data in the target canvas (the offset in the y-axis direction).
   * @param dirtyX Position of the upper left corner of the rectangular area in the source image data.
   *    The default is the upper left corner (x coordinate) of the entire image data.
   * @param dirtyY Position of the upper left corner of the rectangular area in the source image data.
   *    The default is the upper left corner (y coordinate) of the entire image data.
   * @param dirtyWidth Width of the rectangular area in the source image data.
   *    The default is the width of the image data.
   * @param dirtyHeight Height of the rectangular area in the source image data.
   *    The default is the height of the image data.
   * @since 8
   */
  /**
   * Draws the specified ImageData object onto the canvas
   * @param imagedata ImageData object to be drawn.
   * @param dx Position offset of the source image data in the target canvas (the offset in the x-axis direction).
   * @param dy Position offset of the source image data in the target canvas (the offset in the y-axis direction).
   * @param dirtyX Position of the upper left corner of the rectangular area in the source image data.
   *    The default is the upper left corner (x coordinate) of the entire image data.
   * @param dirtyY Position of the upper left corner of the rectangular area in the source image data.
   *    The default is the upper left corner (y coordinate) of the entire image data.
   * @param dirtyWidth Width of the rectangular area in the source image data.
   *    The default is the width of the image data.
   * @param dirtyHeight Height of the rectangular area in the source image data.
   *    The default is the height of the image data.
   * @form
   * @since 9
   */
  putImageData(
    imagedata: ImageData,
    dx: number,
    dy: number,
    dirtyX: number,
    dirtyY: number,
    dirtyWidth: number,
    dirtyHeight: number,
  ): void;

  /**
   * Specifies whether to smooth the image. The value true indicates that the image is smooth (default value).
   *    The value false indicates that the image is not smooth.
   * @since 8
   */
  /**
   * Specifies whether to smooth the image. The value true indicates that the image is smooth (default value).
   *    The value false indicates that the image is not smooth.
   * @form
   * @since 9
   */
  imageSmoothingEnabled: boolean;

  /**
   * Smoothness level of the current image. For details, see {@link ImageSmoothingQuality}.
   * @since 8
   */
  /**
   * Smoothness level of the current image. For details, see {@link ImageSmoothingQuality}.
   * @form
   * @since 9
   */
  imageSmoothingQuality: ImageSmoothingQuality;

  /**
   * Line segment endpoint attribute. For details, see {@link CanvasLineCap}.
   * @since 8
   */
  /**
   * Line segment endpoint attribute. For details, see {@link CanvasLineCap}.
   * @form
   * @since 9
   */
  lineCap: CanvasLineCap;

  /**
   * Dotted line offset attribute. The default value is 0.0.
   * @since 8
   */
  /**
   * Dotted line offset attribute. The default value is 0.0.
   * @form
   * @since 9
   */
  lineDashOffset: number;

  /**
   * Line segment connection point attribute. For details, see {@link CanvasLineJoin}.
   * @since 8
   */
  /**
   * Line segment connection point attribute. For details, see {@link CanvasLineJoin}.
   * @form
   * @since 9
   */
  lineJoin: CanvasLineJoin;

  /**
   * Line thickness attribute. The value cannot be 0 or a negative number.
   * @since 8
   */
  /**
   * Line thickness attribute. The value cannot be 0 or a negative number.
   * @form
   * @since 9
   */
  lineWidth: number;

  /**
   * The value of this parameter cannot be 0 or a negative number.
   * @since 8
   */
  /**
   * The value of this parameter cannot be 0 or a negative number.
   * @form
   * @since 9
   */
  miterLimit: number;

  /**
   * Gets the current segment style.
   * @since 8
   */
  /**
   * Gets the current segment style.
   * @form
   * @since 9
   */
  getLineDash(): number[];

  /**
   * Sets the dashed line mode for line drawing.
   * @param segments A set of numbers that describe the length of alternating drawn lines segments and
   *    spacing (coordinate space units).
   * @since 8
   */
  /**
   * Sets the dashed line mode for line drawing.
   * @param segments A set of numbers that describe the length of alternating drawn lines segments and
   *    spacing (coordinate space units).
   * @form
   * @since 9
   */
  setLineDash(segments: number[]): void;

  /**
   * Clears the drawing content of a rectangular area.
   * @param x The x-axis coordinate of the start point of the rectangle.
   * @param y The y-axis coordinate of the start point of the rectangle.
   * @param w Width of the rectangle.
   * @param h Height of the rectangle.
   * @since 8
   */
  /**
   * Clears the drawing content of a rectangular area.
   * @param x The x-axis coordinate of the start point of the rectangle.
   * @param y The y-axis coordinate of the start point of the rectangle.
   * @param w Width of the rectangle.
   * @param h Height of the rectangle.
   * @form
   * @since 9
   */
  clearRect(x: number, y: number, w: number, h: number): void;

  /**
   * Fills a specified rectangular area
   * @param x The x-axis coordinate of the start point of the rectangle.
   * @param y The y-axis coordinate of the start point of the rectangle.
   * @param w Width of the rectangle.
   * @param h Height of the rectangle.
   * @since 8
   */
  /**
   * Fills a specified rectangular area
   * @param x The x-axis coordinate of the start point of the rectangle.
   * @param y The y-axis coordinate of the start point of the rectangle.
   * @param w Width of the rectangle.
   * @param h Height of the rectangle.
   * @form
   * @since 9
   */
  fillRect(x: number, y: number, w: number, h: number): void;

  /**
   * Stroke Specify Rectangular Area
   * @param x The x-axis coordinate of the start point of the rectangle.
   * @param y The y-axis coordinate of the start point of the rectangle.
   * @param w Width of the rectangle.
   * @param h Height of the rectangle.
   * @since 8
   */
  /**
   * Stroke Specify Rectangular Area
   * @param x The x-axis coordinate of the start point of the rectangle.
   * @param y The y-axis coordinate of the start point of the rectangle.
   * @param w Width of the rectangle.
   * @param h Height of the rectangle.
   * @form
   * @since 9
   */
  strokeRect(x: number, y: number, w: number, h: number): void;

  /**
   * Shadow blur radius. The default value is 0. The value cannot be a negative number.
   * @since 8
   */
  /**
   * Shadow blur radius. The default value is 0. The value cannot be a negative number.
   * @form
   * @since 9
   */
  shadowBlur: number;

  /**
   * Shadow color. The default value is transparent black.
   * @since 8
   */
  /**
   * Shadow color. The default value is transparent black.
   * @form
   * @since 9
   */
  shadowColor: string;

  /**
   * Horizontal offset distance of the shadow. The default value is 0.
   * @since 8
   */
  /**
   * Horizontal offset distance of the shadow. The default value is 0.
   * @form
   * @since 9
   */
  shadowOffsetX: number;

  /**
   * Vertical offset distance of the shadow. The default value is 0.
   * @since 8
   */
  /**
   * Vertical offset distance of the shadow. The default value is 0.
   * @form
   * @since 9
   */
  shadowOffsetY: number;

  /**
   * Top of the stack pop-up state in the drawing state stack
   * @since 8
   */
  /**
   * Top of the stack pop-up state in the drawing state stack
   * @form
   * @since 9
   */
  restore(): void;

  /**
   * Saves the current drawing state to the drawing state stack
   * @since 8
   */
  /**
   * Saves the current drawing state to the drawing state stack
   * @form
   * @since 9
   */
  save(): void;

  /**
   * Fills the specified text at the specified location
   * @param text Text string to be drawn.
   * @param x The x-axis coordinate of the start point of the text.
   * @param y The y-axis coordinate of the start point of the text.
   * @param maxWidth Maximum width of the drawing.
   * @since 8
   */
  /**
   * Fills the specified text at the specified location
   * @param text Text string to be drawn.
   * @param x The x-axis coordinate of the start point of the text.
   * @param y The y-axis coordinate of the start point of the text.
   * @param maxWidth Maximum width of the drawing.
   * @form
   * @since 9
   */
  fillText(text: string, x: number, y: number, maxWidth?: number): void;

  /**
   * Measure the size of a specified text. For details about the return value, see {@link TextMetrics}.
   * @param text Text string to be measured.
   * @since 8
   */
  /**
   * Measure the size of a specified text. For details about the return value, see {@link TextMetrics}.
   * @param text Text string to be measured.
   * @form
   * @since 9
   */
  measureText(text: string): TextMetrics;

  /**
   * Stroke specified text at specified position
   * @param text Text string to be stroked.
   * @param x The x-axis coordinate of the start point of the text.
   * @param y The y-axis-axis coordinate of the start point of the text.
   * @param maxWidth Maximum width of the stroke.
   * @since 8
   */
  /**
   * Stroke specified text at specified position
   * @param text Text string to be stroked.
   * @param x The x-axis coordinate of the start point of the text.
   * @param y The y-axis-axis coordinate of the start point of the text.
   * @param maxWidth Maximum width of the stroke.
   * @form
   * @since 9
   */
  strokeText(text: string, x: number, y: number, maxWidth?: number): void;

  /**
   * Text drawing direction. For details, see {@link CanvasDirection}.
   * @since 8
   */
  /**
   * Text drawing direction. For details, see {@link CanvasDirection}.
   * @form
   * @since 9
   */
  direction: CanvasDirection;

  /**
   * Font style. The default value is 10px sans-serif.
   * @since 8
   */
  /**
   * Font style. The default value is 10px sans-serif.
   * @form
   * @since 9
   */
  font: string;

  /**
   * Text alignment mode. For details, see {@link CanvasTextAlign}.
   * @since 8
   */
  /**
   * Text alignment mode. For details, see {@link CanvasTextAlign}.
   * @form
   * @since 9
   */
  textAlign: CanvasTextAlign;

  /**
   * Text baseline. For details, see {@link CanvasTextBaseline}.
   * @since 8
   */
  /**
   * Text baseline. For details, see {@link CanvasTextBaseline}.
   * @form
   * @since 9
   */
  textBaseline: CanvasTextBaseline;

  /**
   * Obtains the currently applied transformation matrix.
   * @since 8
   */
  /**
   * Obtains the currently applied transformation matrix.
   * @form
   * @since 9
   */
  getTransform(): Matrix2D;

  /**
   * Resets the current transformation matrix using the identity matrix
   * @since 8
   */
  /**
   * Resets the current transformation matrix using the identity matrix
   * @form
   * @since 9
   */
  resetTransform(): void;

  /**
   * Adds the effect of a rotation
   * @param angle The radian of clockwise rotation, which can be converted to an angle value using the formula:
   *    degree * Math.PI / 180
   * @since 8
   */
  /**
   * Adds the effect of a rotation
   * @param angle The radian of clockwise rotation, which can be converted to an angle value using the formula:
   *    degree * Math.PI / 180
   * @form
   * @since 9
   */
  rotate(angle: number): void;

  /**
   * Increases the scaling effect of the X and Y axes.
   * @param x Horizontal scaling factor
   * @param y Vertical scaling factor
   * @since 8
   */
  /**
   * Increases the scaling effect of the X and Y axes.
   * @param x Horizontal scaling factor
   * @param y Vertical scaling factor
   * @form
   * @since 9
   */
  scale(x: number, y: number): void;

  /**
   * Adds 2D transformation effects, including rotation, translation, and scaling.
   *    The current transformation matrix will not be overwritten. Multiple transformations will be superimposed.
   * @param a Horizontal Zoom
   * @param b Vertical Tilt
   * @param c Horizontal Tilt
   * @param d Vertical Zoom
   * @param e Horizontal movement
   * @param f Vertical movement
   * @since 8
   */
  /**
   * Adds 2D transformation effects, including rotation, translation, and scaling.
   *    The current transformation matrix will not be overwritten. Multiple transformations will be superimposed.
   * @param a Horizontal Zoom
   * @param b Vertical Tilt
   * @param c Horizontal Tilt
   * @param d Vertical Zoom
   * @param e Horizontal movement
   * @param f Vertical movement
   * @form
   * @since 9
   */
  setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;

  /**
   * The 2D transformation effect is added. The current transformation matrix is not overwritten and
   *    the transformations are superimposed for multiple times.
   * @param transform 2D transformation matrix. For details, see {@link Matrix2D}.
   * @since 8
   */
  /**
   * The 2D transformation effect is added. The current transformation matrix is not overwritten and
   *    the transformations are superimposed for multiple times.
   * @param transform 2D transformation matrix. For details, see {@link Matrix2D}.
   * @form
   * @since 9
   */
  setTransform(transform?: Matrix2D): void;

  /**
   * Adds the 2D transformation effect, including rotation, translation, and scaling,
   *    and overwrites the current transformation matrix.
   * @param a Horizontal Zoom
   * @param b Vertical Tilt
   * @param c Horizontal Tilt
   * @param d Vertical Zoom
   * @param e Horizontal movement
   * @param f Vertical movement
   * @since 8
   */
  /**
   * Adds the 2D transformation effect, including rotation, translation, and scaling,
   *    and overwrites the current transformation matrix.
   * @param a Horizontal Zoom
   * @param b Vertical Tilt
   * @param c Horizontal Tilt
   * @param d Vertical Zoom
   * @param e Horizontal movement
   * @param f Vertical movement
   * @form
   * @since 9
   */
  transform(a: number, b: number, c: number, d: number, e: number, f: number): void;

  /**
   * Increases the translation effect of the X and Y axes
   * @param x Horizontal movement distance
   * @param y Vertical travel distance
   * @since 8
   */
  /**
   * Increases the translation effect of the X and Y axes
   * @param x Horizontal movement distance
   * @param y Vertical travel distance
   * @form
   * @since 9
   */
  translate(x: number, y: number): void;

  /**
   * Set a PixelMap to the current context. The drawing content is synchronized to the PixelMap.
   * @param value PixelMap object
   * @since 8
   */
  setPixelMap(value?: PixelMap): void;

  /**
   * transfer ImageBitmap to content.
   * @param ImageBitmap
   * @since 8
   */
  /**
   * transfer ImageBitmap to content.
   * @param ImageBitmap
   * @form
   * @since 9
   */
  transferFromImageBitmap(bitmap: ImageBitmap): void;
}

/**
 * Draw context object for the Canvas component.
 * @since 8
 */
/**
 * Draw context object for the Canvas component.
 * @form
 * @since 9
 */
declare class CanvasRenderingContext2D extends CanvasRenderer {
  /**
   * The default value is 0, which is bound to the height of the specified canvas. The value is read-only.
   * @since 8
   */
  /**
   * The default value is 0, which is bound to the height of the specified canvas. The value is read-only.
   * @form
   * @since 9
   */
  readonly height: number;

  /**
   * The default value is 0, which is bound to the width of the specified canvas. The value is read-only.
   * @since 8
   */
  /**
   * The default value is 0, which is bound to the width of the specified canvas. The value is read-only.
   * @form
   * @since 9
   */
  readonly width: number;

  /**
   * Generate a character string in the data url format.
   * @param type Image format. The default value is image/png.
   * @param quality If the image format is image/jpeg or image/webp, you can select the image quality from 0 to 1.
   *    If the value is out of the range, the default value 0.92 is used.
   * @since 8
   */
  /**
   * Generate a character string in the data url format.
   * @param type Image format. The default value is image/png.
   * @param quality If the image format is image/jpeg or image/webp, you can select the image quality from 0 to 1.
   *    If the value is out of the range, the default value 0.92 is used.
   * @form
   * @since 9
   */
  toDataURL(type?: string, quality?: any): string;

  /**
   * Constructor of the canvas drawing context object, which is used to create a drawing context object.
   * @param settings Drawing attribute. For details, see {@link RenderingContextSettings}.
   * @since 8
   */
  /**
   * Constructor of the canvas drawing context object, which is used to create a drawing context object.
   * @param settings Drawing attribute. For details, see {@link RenderingContextSettings}.
   * @form
   * @since 9
   */
  constructor(settings?: RenderingContextSettings);
}

/**
 * Draw context object for the OffscreenCanvas component.
 * @since 8
 */
/**
 * Draw context object for the OffscreenCanvas component.
 * @form
 * @since 9
 */
declare class OffscreenCanvasRenderingContext2D extends CanvasRenderer {
  /**
   * Generate a character string in the data url format.
   * @param type Image format. The default value is image/png.
   * @param quality If the image format is image/jpeg or image/webp, you can select the image quality from 0 to 1.
   *    If the value is out of the range, the default value 0.92 is used.
   * @since 8
   */
  /**
   * Generate a character string in the data url format.
   * @param type Image format. The default value is image/png.
   * @param quality If the image format is image/jpeg or image/webp, you can select the image quality from 0 to 1.
   *    If the value is out of the range, the default value 0.92 is used.
   * @form
   * @since 9
   */
  toDataURL(type?: string, quality?: any): string;

  /**
   * transfer the content to ImageBitmap
   * @since 8
   */
  /**
   * transfer the content to ImageBitmap
   * @form
   * @since 9
   */
  transferToImageBitmap(): ImageBitmap;

  /**
   * Constructor of the canvas drawing context object, which is used to create a drawing context object.
   * @param width the width of the OffscreenCanvas
   * @param height the height of the OffscreenCanvas
   * @param settings Drawing attribute. For details, see {@link RenderingContextSettings}.
   * @since 8
   */
  /**
   * Constructor of the canvas drawing context object, which is used to create a drawing context object.
   * @param width the width of the OffscreenCanvas
   * @param height the height of the OffscreenCanvas
   * @param settings Drawing attribute. For details, see {@link RenderingContextSettings}.
   * @form
   * @since 9
   */
  constructor(width: number, height: number, settings?: RenderingContextSettings);
}

/**
 * Draw an object off the screen. The drawing content is not directly displayed on the screen.
 * @since 8
 */
/**
 * Draw an object off the screen. The drawing content is not directly displayed on the screen.
 * @form
 * @since 9
 */
declare class OffscreenCanvas extends CanvasRenderer {
  /**
   * Height of the off-screen canvas.
   * @since 8
   */
  /**
   * Height of the off-screen canvas.
   * @form
   * @since 9
   */
  height: number;

  /**
   * Width of the off-screen canvas.
   * @since 8
   */
  /**
   * Width of the off-screen canvas.
   * @form
   * @since 9
   */
  width: number;

  /**
   * Exports rendered content as an ImageBitmap object
   * @since 8
   */
  /**
   * Exports rendered content as an ImageBitmap object
   * @form
   * @since 9
   */
  transferToImageBitmap(): ImageBitmap;

  /**
   * Constructor of the off-screen canvas, which is used to create an off-screen canvas object.
   * @param width Width of the off-screen canvas.
   * @param height Height of the off-screen canvas.
   * @since 8
   */
  /**
   * Constructor of the off-screen canvas, which is used to create an off-screen canvas object.
   * @param width Width of the off-screen canvas.
   * @param height Height of the off-screen canvas.
   * @form
   * @since 9
   */
  constructor(width: number, height: number);
}

/**
 *TextTimer component, which provides the text timer capability.
 * @since 8
 */
/**
 *TextTimer component, which provides the text timer capability.
 * @form
 * @since 9
 */
interface CanvasInterface {
  /**
   * Construct a canvas component.
   * @param context Canvas context object. For details, see {@link CanvasRenderingContext2D}.
   * @since 8
   */
  /**
   * Construct a canvas component.
   * @param context Canvas context object. For details, see {@link CanvasRenderingContext2D}.
   * @form
   * @since 9
   */
  (context?: CanvasRenderingContext2D): CanvasAttribute;
}

declare class CanvasAttribute extends CommonMethod<CanvasAttribute> {
  /**
   * Event notification after the canvas component is constructed. You can draw the canvas at this time.
   * @since 8
   */
  /**
   * Event notification after the canvas component is constructed. You can draw the canvas at this time.
   * @form
   * @since 9
   */
  onReady(event: () => void): CanvasAttribute;
}

/**
 * Defines Canvas Component.
 * @since 8
 */
/**
 * Defines Canvas Component.
 * @form
 * @since 9
 */
declare const Canvas: CanvasInterface;

/**
 * Defines Canvas Component instance.
 * @since 8
 */
/**
 * Defines Canvas Component instance.
 * @form
 * @since 9
 */
declare const CanvasInstance: CanvasAttribute;
