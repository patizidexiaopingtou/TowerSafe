/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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
 * The url module provides utilities for URL resolution and parsing.
 * @since 7
 * @syscap SystemCapability.Utils.Lang
 * @permission N/A
 */
declare namespace url {
    /**
     * The URLSearchParams interface defines some practical methods to process URL query strings.
     * @name URLSearchParams
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.url.URLParams
     * @syscap SystemCapability.Utils.Lang
     */
    class URLSearchParams {
        /**
         * A parameterized constructor used to create an URLSearchParams instance.
         * As the input parameter of the constructor function, init supports four types.
         * The input parameter is a character string two-dimensional array.
         * The input parameter is the object list.
         * The input parameter is a character string.
         * The input parameter is the URLSearchParams object.
         * @deprecated since 9
         * @useinstead ohos.url.URLParams.constructor
         */
        constructor(init?: string[][] | Record<string, string> | string | URLSearchParams);

        /**
         * Appends a specified key/value pair as a new search parameter.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.url.URLParams.append
         * @syscap SystemCapability.Utils.Lang
         * @param name Key name of the search parameter to be inserted.
         * @param value Values of search parameters to be inserted.
         */
        append(name: string, value: string): void;

        /**
         * Deletes the given search parameter and its associated value,from the list of all search parameters.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.url.URLParams.delete
         * @syscap SystemCapability.Utils.Lang
         * @param name Name of the key-value pair to be deleted.
         */
        delete(name: string): void;

        /**
         * Returns all key-value pairs associated with a given search parameter as an array.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.url.URLParams.getAll
         * @syscap SystemCapability.Utils.Lang
         * @param name Specifies the name of a key value.
         * @returns string[] Returns all key-value pairs with the specified name.
         */
        getAll(name: string): string[];

        /**
         * Returns an ES6 iterator. Each item of the iterator is a JavaScript Array.
         * The first item of Array is name, and the second item of Array is value.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.url.URLParams.entries
         * @syscap SystemCapability.Utils.Lang
         * @returns Returns an iterator for ES6.
         */
        entries(): IterableIterator<[string, string]>;

        /**
         * Callback functions are used to traverse key-value pairs on the URLSearchParams instance object.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.url.URLParams.forEach
         * @syscap SystemCapability.Utils.Lang
         * @param value Current traversal key value.
         * @param key Indicates the name of the key that is traversed.
         * @param searchParams The instance object that is currently calling the forEach method.
         * @param thisArg to be used as this value for when callbackFn is called
         */
        forEach(callbackFn: (value: string, key: string, searchParams: this) => void, thisArg?: Object): void;

        /**
         * Returns the first value associated to the given search parameter.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.url.URLParams.get
         * @syscap SystemCapability.Utils.Lang
         * @param name Specifies the name of a key-value pair.
         * @returns Returns the first value found by name. If no value is found, null is returned.
         */
        get(name: string): string | null;

        /**
         * Returns a Boolean that indicates whether a parameter with the specified name exists.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.url.URLParams.has
         * @syscap SystemCapability.Utils.Lang
         * @param name Specifies the name of a key-value pair.
         * @returns Returns a Boolean value that indicates whether a found
         */
        has(name: string): boolean;

        /**
         * Sets the value associated with a given search parameter to the
         * given value. If there were several matching values, this method
         * deletes the others. If the search parameter doesn't exist, this
         * method creates it.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.url.URLParams.set
         * @syscap SystemCapability.Utils.Lang
         * @param name Key name of the parameter to be set.
         * @param value Indicates the parameter value to be set.
         */
        set(name: string, value: string): void;

        /**
         * Sort all key/value pairs contained in this object in place and return undefined.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.url.URLParams.sort
         * @syscap SystemCapability.Utils.Lang
         */
        sort(): void;

        /**
         * Returns an iterator allowing to go through all keys contained in this object.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.url.URLParams.keys
         * @syscap SystemCapability.Utils.Lang
         * @returns Returns an ES6 Iterator over the names of each name-value pair.
         */
        keys(): IterableIterator<string>;

        /**
         * Returns an iterator allowing to go through all values contained in this object.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.url.URLParams.values
         * @syscap SystemCapability.Utils.Lang
         * @returns Returns an ES6 Iterator over the values of each name-value pair.
         */
        values(): IterableIterator<string>;

        /**
         * Returns an iterator allowing to go through all key/value
         * pairs contained in this object.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.url.URLParams.[Symbol.iterator]
         * @syscap SystemCapability.Utils.Lang
         * @returns Returns an ES6 iterator. Each item of the iterator is a JavaScript Array. 
         * The first item of Array is name, and the second item of Array is value.
         */
        [Symbol.iterator](): IterableIterator<[string, string]>;

        /**
         * Returns a query string suitable for use in a URL.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.url.URLParams.toString
         * @syscap SystemCapability.Utils.Lang
         * @returns Returns a search parameter serialized as a string, percent-encoded if necessary.
         */
        toString(): string;
    }

    /**
     * The URLParams interface defines some practical methods to process URL query strings.
     * @name URLParams
     * @since 9
     * @syscap SystemCapability.Utils.Lang
     */
    class URLParams {
        /**
         * A parameterized constructor used to create an URLParams instance.
         * As the input parameter of the constructor function, init supports four types.
         * The input parameter is a character string two-dimensional array.
         * The input parameter is the object list.
         * The input parameter is a character string.
         * The input parameter is the URLParams object.
         * @since 9
         * @throws {BusinessError} 401 - The type of init must be string two-dimensional array or object list
         * or string or URLParams object.
         */
        constructor(init?: string[][] | Record<string, string> | string | URLParams);

        /**
         * Appends a specified key/value pair as a new search parameter.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param name Key name of the search parameter to be inserted.
         * @param value Values of search parameters to be inserted.
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         */
        append(name: string, value: string): void;

        /**
         * Deletes the given search parameter and its associated value,from the list of all search parameters.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param name Name of the key-value pair to be deleted.
         * @throws {BusinessError} 401 - The type of name must be string.
         */
        delete(name: string): void;

        /**
         * Returns all key-value pairs associated with a given search parameter as an array.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param name Specifies the name of a key value.
         * @returns string[] Returns all key-value pairs with the specified name.
         * @throws {BusinessError} 401 - The type of name must be string.
         */
        getAll(name: string): string[];

        /**
         * Returns an ES6 iterator. Each item of the iterator is a JavaScript Array.
         * The first item of Array is name, and the second item of Array is value.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @returns Returns an iterator for ES6.
         */
        entries(): IterableIterator<[string, string]>;

        /**
         * Callback functions are used to traverse key-value pairs on the URLParams instance object.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param value Current traversal key value.
         * @param key Indicates the name of the key that is traversed.
         * @param searchParams The instance object that is currently calling the forEach method.
         * @param thisArg to be used as this value for when callbackFn is called
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         */
        forEach(callbackFn: (value: string, key: string, searchParams: this) => void, thisArg?: Object): void;

        /**
         * Returns the first value associated to the given search parameter.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param name Specifies the name of a key-value pair.
         * @returns Returns the first value found by name. If no value is found, null is returned.
         * @throws {BusinessError} 401 - The type of name must be string.
         */
        get(name: string): string | null;

        /**
         * Returns a Boolean that indicates whether a parameter with the specified name exists.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param name Specifies the name of a key-value pair.
         * @returns Returns a Boolean value that indicates whether a found
         * @throws {BusinessError} 401 - The type of name must be string.
         */
        has(name: string): boolean;

        /**
         * Sets the value associated with a given search parameter to the
         * given value. If there were several matching values, this method
         * deletes the others. If the search parameter doesn't exist, this
         * method creates it.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param name Key name of the parameter to be set.
         * @param value Indicates the parameter value to be set.
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         */
        set(name: string, value: string): void;

        /**
         * Sort all key/value pairs contained in this object in place and return undefined.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         */
        sort(): void;

        /**
         * Returns an iterator allowing to go through all keys contained in this object.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @returns Returns an ES6 Iterator over the names of each name-value pair.
         */
        keys(): IterableIterator<string>;

        /**
         * Returns an iterator allowing to go through all values contained in this object.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @returns Returns an ES6 Iterator over the values of each name-value pair.
         */
        values(): IterableIterator<string>;

        /**
         * Returns an iterator allowing to go through all key/value
         * pairs contained in this object.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @returns Returns an ES6 iterator. Each item of the iterator is a JavaScript Array. 
         * The first item of Array is name, and the second item of Array is value.
         */
        [Symbol.iterator](): IterableIterator<[string, string]>;

        /**
         * Returns a query string suitable for use in a URL.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @returns Returns a search parameter serialized as a string, percent-encoded if necessary.
         */
        toString(): string;
    }

    /**
     * The interface of URL is used to parse, construct, normalize, and encode URLs.
     * @name URL
     * @since 7
     * @syscap SystemCapability.Utils.Lang
     */
    class URL {
        /**
         * URL constructor, which is used to instantiate a URL object.
         * url: Absolute or relative input URL to resolve. Base is required if input is relative.
         * If input is an absolute value, base ignores the value.
         * base: Base URL to parse if input is not absolute.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.url.URL.parseURL
         */
        constructor(url: string, base?: string | URL);

        /**
         * URL constructor, which is used to instantiate a URL object.
         * @since 9
         */
        constructor();

        /**
         * Replaces the original constructor to process arguments and return a url object.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param url Absolute or relative input URL to resolve. Base is required if input is relative.
         * If input is an absolute value, base ignores the value.
         * @param base Base URL to parse if input is not absolute.
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200002 - Invalid url string.
         */
        static parseURL(url: string, base?: string | URL): URL;

        /**
         * Returns the serialized URL as a string.
         * @since 7
         * @syscap SystemCapability.Utils.Lang
         * @returns Returns the serialized URL as a string.
         */
        toString(): string;

        /**
         * Returns the serialized URL as a string.
         * @since 7
         * @syscap SystemCapability.Utils.Lang
         * @returns Returns the serialized URL as a string.
         */
        toJSON(): string;

        /**
         * Gets and sets the fragment portion of the URL.
         * @since 7
         * @syscap SystemCapability.Utils.Lang
         */
        hash: string;

        /**
         * Gets and sets the host portion of the URL.
         * @since 7
         * @syscap SystemCapability.Utils.Lang
         */
        host: string;

        /**
         * Gets and sets the host name portion of the URL，not include the port.
         * @since 7
         * @syscap SystemCapability.Utils.Lang
         */
        hostname: string;

        /**
         * Gets and sets the serialized URL.
         * @since 7
         * @syscap SystemCapability.Utils.Lang
         */
        href: string;

        /**
         * Gets the read-only serialization of the URL's origin.
         * @since 7
         * @syscap SystemCapability.Utils.Lang
         */
        readonly origin: string;

        /**
         * Gets and sets the password portion of the URL.
         * @since 7
         * @syscap SystemCapability.Utils.Lang
         */
        password: string;

        /**
         * Gets and sets the path portion of the URL.
         * @since 7
         * @syscap SystemCapability.Utils.Lang
         */
        pathname: string;

        /**
         * Gets and sets the port portion of the URL.
         * @since 7
         * @syscap SystemCapability.Utils.Lang
         */
        port: string;

        /**
         * Gets and sets the protocol portion of the URL.
         * @since 7
         * @syscap SystemCapability.Utils.Lang
         */
        protocol: string;

        /**
         * Gets and sets the serialized query portion of the URL.
         * @since 7
         * @syscap SystemCapability.Utils.Lang
         */
        search: string;

        /**
         * Gets the URLSearchParams object that represents the URL query parameter.
         * This property is read-only, but URLSearchParams provides an object that can be used to change
         * the URL instance. To replace the entire query parameter for a URL, use url.searchsetter.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.url.URL.params
         * @syscap SystemCapability.Utils.Lang
         */
        readonly searchParams: URLSearchParams;

        /**
         * Gets the URLParams object that represents the URL query parameter.
         * This property is read-only, but URLParams provides an object that can be used to change
         * the URL instance. To replace the entire query parameter for a URL, use url.searchsetter.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         */
        readonly params: URLParams;

        /**
         * Gets and sets the username portion of the URL.
         * @since 7
         * @syscap SystemCapability.Utils.Lang
         */
        username: string;
    }
}
export default url;