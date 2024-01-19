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
 * The xml module provides utilities for converting XML text to Javascript object, XML generation and parsing.
 * @since 8
 * @syscap SystemCapability.Utils.Lang
 * @permission N/A
 */
declare namespace xml {

    /**
     * The XmlSerializer interface is used to generate an xml file.
     * @name XmlSerializer
     * @since 8
     * @syscap SystemCapability.Utils.Lang
     */
    class XmlSerializer {
        /**
         * A parameterized constructor used to create a new XmlSerializer instance.
         * As the input parameter of the constructor function, init supports three types.
         * The input parameter is an Arrarybuffer.
         * The input parameter is a DataView.
         * The input parameter is an encoding format of string type.
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         */
        constructor(buffer: ArrayBuffer | DataView, encoding?: string);

        /**
         * Write an attribute.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         * @param name Key name of the attribute.
         * @param value Values of attribute.
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         */
        setAttributes(name: string, value: string): void;

        /**
         * Add an empty element.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         * @param name Key name of the attribute.
         * @param value Values of element.
         * @throws {BusinessError} 401 - The type of name must be string.
         */
        addEmptyElement(name: string): void;

        /**
         * Writes xml declaration with encoding. For example: <?xml version="1.0" encoding="utf-8"?>.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         */
        setDeclaration(): void;

        /**
         * Writes a element start tag with the given name.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         * @param name Name of the element.
         * @throws {BusinessError} 401 - The type of name must be string.
         */
        startElement(name: string): void;

        /**
         * Writes end tag of the element.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         */
        endElement(): void;

        /**
         * Writes the namespace of the current element tag.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         * @param prefix Values name of the prefix.
         * @param namespace Values of namespace.
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         */
        setNamespace(prefix: string, namespace: string): void;

        /**
         * Writes the comment.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         * @param text Values of comment.
         * @throws {BusinessError} 401 - The type of text must be string.
         */
        setComment(text: string): void;

        /**
         * Writes the CDATA.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         * @param text Values of CDATA.
         * @throws {BusinessError} 401 - The type of text must be string.
         */
        setCDATA(text: string): void;

        /**
         * Writes the text.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         * @param text Values of text.
         * @throws {BusinessError} 401 - The type of text must be string.
         */
        setText(text: string): void;

        /**
         * Writes the DOCTYPE.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         * @param text Values of docType.
         * @throws {BusinessError} 401 - The type of text must be string.
         */
        setDocType(text: string): void;
    }

    enum EventType {
        /**
          * Start a document.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        START_DOCUMENT,
        /**
          * End a document.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        END_DOCUMENT,
        /**
          * Start a tag.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        START_TAG,
        /**
          * End a tag.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        END_TAG,
        /**
          * Character data.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        TEXT,
        /**
          * A CDATA sections.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        CDSECT,
        /**
          * An XML comment.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        COMMENT,
        /**
          * An XML document type declaration.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        DOCDECL,
        /**
          * An XML processing instruction declaration.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        INSTRUCTION,
        /**
          * An entity reference.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        ENTITY_REFERENCE,
        /**
          * A whitespace.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        WHITESPACE
    }

    /** The current parse info.  */
    interface ParseInfo {
        /**
          * The current column number, starting from 1.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        getColumnNumber(): number;
        /**
          * The current depth of the element.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        getDepth(): number;
        /**
          * The current line number, starting from 1.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        getLineNumber(): number;
        /**
          * The current element's name.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        getName(): string;
        /**
          * The current element's namespace.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        getNamespace(): string;
        /**
          * The current element's prefix.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        getPrefix(): string;
        /**
          * The text content of the current event as String.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        getText(): string;
        /**
          * Returns true if the current element is empty.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        isEmptyElementTag(): boolean;
        /**
          * Checks whether the current TEXT event contains only whitespace characters.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        isWhitespace(): boolean;
        /**
          * Returns the number of attributes of the current start tag.
          * @since 8
          * @syscap SystemCapability.Utils.Lang
          */
        getAttributeCount(): number;
    }

    /** Parse options for XmlPullParser. */
    interface ParseOptions {

        /**
         * Whether to parsing Doctype of the elements.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         */
        supportDoctype?: boolean;

        /**
         * Whether to ignore parsing texts of the elements.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         */
        ignoreNameSpace?: boolean;

        /**
         * Tag value callback function.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         * @param name The current tag name.
         * @param value The current tag value.
         * @returns Returns a Boolean variable for whether parse continually.
         */
        tagValueCallbackFunction?: (name: string, value: string) => boolean;

        /**
         * Attribute value callback function.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         * @param name The current attribute name.
         * @param value The current attribute value.
         * @returns Returns a Boolean variable for whether parse continually.
         */
        attributeValueCallbackFunction?: (name: string, value: string) => boolean;

        /**
         * Token value callback function.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         * @param eventType The current token eventtype.
         * @param value The current token parseinfo.
         * @returns Returns a Boolean variable for whether parse continually.
         */
        tokenValueCallbackFunction?: (eventType: EventType, value: ParseInfo) => boolean;
    }

    /**
     * The XmlPullParser interface is used to parse the existing xml file.
     * @name XmlPullParser
     * @since 8
     * @syscap SystemCapability.Utils.Lang
     */
    class XmlPullParser {
        /**
         * A constructor used to create a new XmlPullParser instance.
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         */
        constructor(buffer: ArrayBuffer | DataView, encoding?: string);

        /**
         * Starts parsing the XML file.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         * @param option parse options for XmlPullParser, the interface including two Boolean variables and three callback functions.
         * @throws {BusinessError} 401 - The type of option must be ParseOptions.
         */
        parse(option: ParseOptions): void;
    }
}
export default xml;