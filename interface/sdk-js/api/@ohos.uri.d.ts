/*
* Copyright (c) 2021-2022 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/**
 * The uri module provides utilities for URI resolution and parsing.
 * @since 8
 * @syscap SystemCapability.Utils.Lang
 * @permission N/A
 */
declare namespace uri {

    /**
     * URI Represents a Uniform Resource Identifier (URI) reference.
     * @name URI
     * @since 8
     * @syscap SystemCapability.Utils.Lang
     */
    class URI {
        /**
         * URI constructor, which is used to instantiate a URI object.
         * uri: Constructs a URI by parsing a given string.
         * @throws {BusinessError} 401 - if the input parameters are invalid.
	 * @throws {BusinessError} 10200002 - Invalid uri string.
         */
        constructor(uri: string);

        /**
         * Returns the serialized URI as a string.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         * @returns Returns the serialized URI as a string.
         */
        toString(): string;

        /**
         * Check whether this URI is equivalent to other URI objects.
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.uri.URI.equalsTo
         * @syscap SystemCapability.Utils.Lang
         * @param other URI object to be compared
         * @returns boolean Tests whether this URI is equivalent to other URI objects.
         */
        equals(other: URI): boolean;

        /**
         * Check whether this URI is equivalent to other URI objects.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param other URI object to be compared
         * @returns boolean Tests whether this URI is equivalent to other URI objects.
         * @throws {BusinessError} 401 - The type of other must be URI.
         */
        equalsTo(other: URI): boolean;

        /**
         * Indicates whether this URI is an absolute URI.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         * @returns boolean Indicates whether the URI is an absolute URI (whether the scheme component is defined).
         */
        checkIsAbsolute(): boolean;

        /**
         * Normalize the path of this URI.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         * @returns URI Used to normalize the path of this URI and return a URI object whose path has been normalized.
         */
        normalize(): URI;

        /**
         * Gets the protocol part of the URI.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         */
        scheme: string;

        /**
         * Obtains the user information part of the URI.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         */
        userInfo: string;

        /**
         * Gets the hostname portion of the URI without a port.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         */
        host: string;

        /**
         * Gets the port portion of the URI.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         */
        port: string;

        /**
         * Gets the path portion of the URI.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         */
        path: string;

        /**
         * Gets the query portion of the URI
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         */
        query: string;

        /**
         * Gets the fragment part of the URI.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         */
        fragment: string;

        /**
         * Gets the decoding permission component part of this URI.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         */
        authority: string;

        /**
         * Gets the decoding scheme-specific part of the URI.
         * @since 8
         * @syscap SystemCapability.Utils.Lang
         */
        ssp: string;
    }
}
export default uri;