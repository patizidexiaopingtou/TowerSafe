/*
 * Copyright (C) 2021-2022 Huawei Device Co., Ltd.
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

import {AsyncCallback, Callback} from "./basic";

/**
 * Provides http related APIs.
 *
 * @since 6
 * @syscap SystemCapability.Communication.NetStack
 */
declare namespace http {
  /**
   * Creates an HTTP request task.
   */
  function createHttp(): HttpRequest;

  export interface HttpRequestOptions {
    /**
     * Request method.
     */
    method?: RequestMethod; // default is GET

    /**
     * Additional data of the request.
     * extraData can be a string or an Object (API 6) or an ArrayBuffer(API 8).
     */
    extraData?: string | Object | ArrayBuffer;

    /**
     * Data type to be returned. If this parameter is set, the system preferentially returns the specified type.
     *
     * @since 9
     */
    expectDataType?: HttpDataType;

    /**
     * @since 9
     */
    usingCache?: boolean; // default is true

    /**
     * @since 9
     */
    priority?: number; // [1, 1000], default is 1.

    /**
     * HTTP request header.
     */
    header?: Object; // default is 'content-type': 'application/json'

    /**
     * Read timeout period. The default value is 60,000, in ms.
     */
    readTimeout?: number; // default is 60s

    /**
     * Connection timeout interval. The default value is 60,000, in ms.
     */
    connectTimeout?: number; // default is 60s.

    /**
     * @since 9
     */
    usingProtocol?: HttpProtocol; // default is automatically specified by the system.
  }

  export interface HttpRequest {
    /**
     * Initiates an HTTP request to a given URL.
     *
     * @param url URL for initiating an HTTP request.
     * @param options Optional parameters {@link HttpRequestOptions}.
     * @param callback Returns {@link HttpResponse}.
     * @permission ohos.permission.INTERNET
     * @throws {BusinessError} 401 - Parameter error.
     * @throws {BusinessError} 201 - Permission denied.
     * @throws {BusinessError} 2300001 - Unsupported protocol.
     * @throws {BusinessError} 2300003 - URL using bad/illegal format or missing URL.
     * @throws {BusinessError} 2300005 - Couldn't resolve proxy name.
     * @throws {BusinessError} 2300006 - Couldn't resolve host name.
     * @throws {BusinessError} 2300007 - Couldn't connect to server.
     * @throws {BusinessError} 2300008 - Weird server reply.
     * @throws {BusinessError} 2300009 - Access denied to remote resource.
     * @throws {BusinessError} 2300016 - Error in the HTTP2 framing layer.
     * @throws {BusinessError} 2300018 - Transferred a partial file.
     * @throws {BusinessError} 2300023 - Failed writing received data to disk/application.
     * @throws {BusinessError} 2300025 - Upload failed.
     * @throws {BusinessError} 2300026 - Failed to open/read local data from file/application.
     * @throws {BusinessError} 2300027 - Out of memory.
     * @throws {BusinessError} 2300028 - Timeout was reached.
     * @throws {BusinessError} 2300047 - Number of redirects hit maximum amount.
     * @throws {BusinessError} 2300052 - Server returned nothing (no headers, no data).
     * @throws {BusinessError} 2300055 - Failed sending data to the peer.
     * @throws {BusinessError} 2300056 - Failure when receiving data from the peer.
     * @throws {BusinessError} 2300058 - Problem with the local SSL certificate.
     * @throws {BusinessError} 2300059 - Couldn't use specified SSL cipher.
     * @throws {BusinessError} 2300060 - SSL peer certificate or SSH remote key was not OK.
     * @throws {BusinessError} 2300061 - Unrecognized or bad HTTP Content or Transfer-Encoding.
     * @throws {BusinessError} 2300063 - Maximum file size exceeded.
     * @throws {BusinessError} 2300070 - Disk full or allocation exceeded.
     * @throws {BusinessError} 2300073 - Remote file already exists.
     * @throws {BusinessError} 2300077 - Problem with the SSL CA cert (path? access rights?).
     * @throws {BusinessError} 2300078 - Remote file not found.
     * @throws {BusinessError} 2300094 - An authentication function returned an error.
     * @throws {BusinessError} 2300999 - Unknown Other Error.
     */
    request(url: string, callback: AsyncCallback<HttpResponse>): void;
    request(url: string, options: HttpRequestOptions, callback: AsyncCallback<HttpResponse>): void;
    request(url: string, options?: HttpRequestOptions): Promise<HttpResponse>;

    /**
     * Destroys an HTTP request.
     */
    destroy(): void;

    /**
     * Registers an observer for HTTP Response Header events.
     *
     * @deprecated since 8
     * @useinstead on_headersReceive
     */
    on(type: "headerReceive", callback: AsyncCallback<Object>): void;

    /**
     * Unregisters the observer for HTTP Response Header events.
     *
     * @deprecated since 8
     * @useinstead off_headersReceive
     */
    off(type: "headerReceive", callback?: AsyncCallback<Object>): void;

    /**
     * Registers an observer for HTTP Response Header events.
     *
     * @since 8
     */
    on(type: "headersReceive", callback: Callback<Object>): void;

    /**
     * Unregisters the observer for HTTP Response Header events.
     *
     * @since 8
     */
    off(type: "headersReceive", callback?: Callback<Object>): void;

    /**
     * Registers a one-time observer for HTTP Response Header events.
     *
     * @since 8
     */
    once(type: "headersReceive", callback: Callback<Object>): void;
  }

  export enum RequestMethod {
    OPTIONS = "OPTIONS",
    GET = "GET",
    HEAD = "HEAD",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    TRACE = "TRACE",
    CONNECT = "CONNECT"
  }

  export enum ResponseCode {
    OK = 200,
    CREATED,
    ACCEPTED,
    NOT_AUTHORITATIVE,
    NO_CONTENT,
    RESET,
    PARTIAL,
    MULT_CHOICE = 300,
    MOVED_PERM,
    MOVED_TEMP,
    SEE_OTHER,
    NOT_MODIFIED,
    USE_PROXY,
    BAD_REQUEST = 400,
    UNAUTHORIZED,
    PAYMENT_REQUIRED,
    FORBIDDEN,
    NOT_FOUND,
    BAD_METHOD,
    NOT_ACCEPTABLE,
    PROXY_AUTH,
    CLIENT_TIMEOUT,
    CONFLICT,
    GONE,
    LENGTH_REQUIRED,
    PRECON_FAILED,
    ENTITY_TOO_LARGE,
    REQ_TOO_LONG,
    UNSUPPORTED_TYPE,
    INTERNAL_ERROR = 500,
    NOT_IMPLEMENTED,
    BAD_GATEWAY,
    UNAVAILABLE,
    GATEWAY_TIMEOUT,
    VERSION
  }

  /**
   * Supported protocols.
   *
   * @since 9
   */
  export enum HttpProtocol {
    HTTP1_1,
    HTTP2,
  }

  /**
   * Indicates the type of the returned data.
   *
   * @since 9
   */
  export enum HttpDataType {
    STRING,
    OBJECT = 1,
    ARRAY_BUFFER = 2,
  }

  export interface HttpResponse {
    /**
     * result can be a string (API 6) or an ArrayBuffer(API 8). Object is deprecated from API 8.
     * If {@link HttpRequestOptions#expectDataType} is set, the system preferentially returns this parameter.
     */
    result: string | Object | ArrayBuffer;

    /**
     * If the resultType is string, you can get result directly.
     * If the resultType is Object, you can get result such as this: result['key'].
     * If the resultType is ArrayBuffer, you can use ArrayBuffer to create the binary objects.
     *
     * @since 9
     */
    resultType: HttpDataType;

    /**
     * Server status code.
     */
    responseCode: ResponseCode | number;

    /**
     * All headers in the response from the server.
     */
    header: Object;

    /**
     * @since 8
     */
    cookies: string;
  }

  /**
   * Creates a default {@code HttpResponseCache} object to store the responses of HTTP access requests.
   *
   * @param cacheSize the size of cache(max value is 10MB), default is 10*1024*1024(10MB).
   * @since 9
   */
  function createHttpResponseCache(cacheSize?: number): HttpResponseCache;

  /**
   * @since 9
   */
  export interface HttpResponseCache {
    /**
     * Writes data in the cache to the file system so that all the cached data can be accessed in the next HTTP request.
     */
    flush(callback: AsyncCallback<void>): void;
    flush(): Promise<void>;

    /**
     * Disables a cache and deletes the data in it.
     */
    delete(callback: AsyncCallback<void>): void;
    delete(): Promise<void>;
  }
}

export default http;
