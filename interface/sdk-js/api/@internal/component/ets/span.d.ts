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
 * Provide text decoration.
 * @since 7
 */
/**
 * Provide text decoration.
 * @form
 * @since 9
 */
interface SpanInterface {
  /**
   * Called when text is entered in span.
   * @since 7
   */
  /**
   * Called when text is entered in span.
   * @form
   * @since 9
   */
  (value: string | Resource): SpanAttribute;
}

/**
 * @since 7
 */
/**
 * @form
 * @since 9
 */
declare class SpanAttribute extends CommonMethod<SpanAttribute> {
  /**
   * Called when the font color is set.
   * @since 7
   */
  /**
   * Called when the font color is set.
   * @form
   * @since 9
   */
  fontColor(value: ResourceColor): SpanAttribute;

  /**
   * Called when the font size is set.
   * @since 7
   */
  /**
   * Called when the font size is set.
   * @form
   * @since 9
   */
  fontSize(value: number | string | Resource): SpanAttribute;

  /**
   * Called when the font style of a font is set.
   * @since 7
   */
  /**
   * Called when the font style of a font is set.
   * @form
   * @since 9
   */
  fontStyle(value: FontStyle): SpanAttribute;

  /**
   * Called when the font weight is set.
   * @since 7
   */
  /**
   * Called when the font weight is set.
   * @form
   * @since 9
   */
  fontWeight(value: number | FontWeight | string): SpanAttribute;

  /**
   * Called when the font list of text is set.
   * @since 7
   */
  /**
   * Called when the font list of text is set.
   * @form
   * @since 9
   */
  fontFamily(value: string | Resource): SpanAttribute;

  /**
   * Called when the text decoration of the text is set.
   * @since 7
   */
  /**
   * Called when the text decoration of the text is set.
   * @form
   * @since 9
   */
  decoration(value: { type: TextDecorationType; color?: ResourceColor }): SpanAttribute;

  /**
   * Called when the distance between text fonts is set.
   * @since 7
   */
  /**
   * Called when the distance between text fonts is set.
   * @form
   * @since 9
   */
  letterSpacing(value: number | string): SpanAttribute;

  /**
   * Called when the type of letter in the text font is set.
   */
  /**
   * Called when the type of letter in the text font is set.
   * @form
   * @since 9
   */
  textCase(value: TextCase): SpanAttribute;
}

/**
 * Defines Span Component.
 * @since 7
 */
/**
 * Defines Span Component.
 * @form
 * @since 9
 */
declare const Span: SpanInterface;

/**
 * Defines Span Component instance.
 * @since 7
 */
/**
 * Defines Span Component instance.
 * @form
 * @since 9
 */
declare const SpanInstance: SpanAttribute;
