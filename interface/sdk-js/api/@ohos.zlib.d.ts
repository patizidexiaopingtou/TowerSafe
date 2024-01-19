/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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

import { AsyncCallback } from './basic';

declare namespace zlib {
/**
 * @name ErrorCode
 * @since 7
 * @syscap SystemCapability.BundleManager.Zlib
 * @deprecated since 9
 */
  export enum ErrorCode {
    ERROR_CODE_OK = 0,
    ERROR_CODE_ERRNO = -1
  }

/**
 * @name CompressLevel
 * @since 7
 * @syscap SystemCapability.BundleManager.Zlib
 */
  export enum CompressLevel {
    COMPRESS_LEVEL_NO_COMPRESSION = 0,
    COMPRESS_LEVEL_BEST_SPEED = 1,
    COMPRESS_LEVEL_BEST_COMPRESSION = 9,
    COMPRESS_LEVEL_DEFAULT_COMPRESSION = -1
  }

/**
 * @name CompressStrategy
 * @since 7
 * @syscap SystemCapability.BundleManager.Zlib
 */
  export enum CompressStrategy {
    COMPRESS_STRATEGY_DEFAULT_STRATEGY = 0,
    COMPRESS_STRATEGY_FILTERED = 1,
    COMPRESS_STRATEGY_HUFFMAN_ONLY = 2,
    COMPRESS_STRATEGY_RLE = 3,
    COMPRESS_STRATEGY_FIXED = 4
  }

/**
 * @name MemLevel
 * @since 7
 * @syscap SystemCapability.BundleManager.Zlib
 */
  export enum MemLevel {
    MEM_LEVEL_MIN = 1,
    MEM_LEVEL_MAX = 9,
    MEM_LEVEL_DEFAULT = 8
  }

/**
 * @name Options
 * @since 7
 * @syscap SystemCapability.BundleManager.Zlib
 */
  interface Options {
    level?: CompressLevel;
    memLevel?: MemLevel;
    strategy?: CompressStrategy;
  }

  /**
   * Compress the specified file.
   *
   * @since 7
   * @syscap SystemCapability.BundleManager.Zlib
   * @param inFile Indicates the path of the file to be compressed.
   * @param outFile Indicates the path of the output compressed file.
   * @returns Returns error code.
   * @deprecated since 9
   * @useinstead ohos.zlib#compressFile
   */
  function zipFile(inFile:string, outFile:string, options: Options): Promise<void>;

  /**
   * Decompress the specified file.
   *
   * @since 7
   * @syscap SystemCapability.BundleManager.Zlib
   * @param inFile Indicates the path of the file to be decompressed.
   * @param outFile Indicates the path of the decompressed file.
   * @returns Returns error code.
   * @deprecated since 9
   * @useinstead ohos.zlib#decompressFile
   */
  function unzipFile(inFile:string, outFile:string, options: Options): Promise<void>;

  /**
   * Compress the specified file.
   * @param {string} inFile Indicates the path of the file to be compressed.
   * @param {string} outFile Indicates the path of the output compressed file.
   * @param {Options} options Indicates the options of compressing file.
   * @param {AsyncCallback<void>} callback - The callback of compressing file result.
   * @throws {BusinessError} 401 - The parameter check failed.
   * @throws {BusinessError} 900001 - The input source file is invalid.
   * @throws {BusinessError} 900002 - The input destination file is invalid.
   * @syscap SystemCapability.BundleManager.Zlib
   * @since 9
   */
   function compressFile(inFile: string, outFile: string, options: Options, callback: AsyncCallback<void>): void;

    /**
   * Compress the specified file.
   * @param {string} inFile Indicates the path of the file to be compressed.
   * @param {string} outFile Indicates the path of the output compressed file.
   * @param {Options} options Indicates the options of compressing file.
   * @returns {Promise<void>} Returns the result of compressFile file.
   * @throws {BusinessError} 401 - The parameter check failed.
   * @throws {BusinessError} 900001 - The input source file is invalid.
   * @throws {BusinessError} 900002 - The input destination file is invalid.
   * @syscap SystemCapability.BundleManager.Zlib
   * @since 9
   */
  function compressFile(inFile:string, outFile:string, options: Options): Promise<void>;

  /**
   * Decompress the specified file.
   * @param {string} inFile Indicates the path of the file to be decompressed.
   * @param {string} outFile Indicates the path of the output decompressed file.
   * @param {Options} options Indicates the options of decompressing file.
   * @param {AsyncCallback<void>} callback - The callback of decompressing file result.
   * @throws {BusinessError} 401 - The parameter check failed.
   * @throws {BusinessError} 900001 - The input source file is invalid.
   * @throws {BusinessError} 900002 - The input destination file is invalid.
   * @syscap SystemCapability.BundleManager.Zlib
   * @since 9
   */
   function decompressFile(inFile: string, outFile: string, options: Options, callback: AsyncCallback<void>): void;

  /**
   * Decompress the specified file.
   * @param {string} inFile Indicates the path of the file to be decompressed.
   * @param {string} outFile Indicates the path of the output decompressing file.
   * @param {Options} options Indicates the options of decompressing file.
   * @returns {Promise<void>} Returns the result of decompressing file.
   * @throws {BusinessError} 401 - The parameter check failed.
   * @throws {BusinessError} 900001 - The input source file is invalid.
   * @throws {BusinessError} 900002 - The input destination file is invalid.
   * @syscap SystemCapability.BundleManager.Zlib
   * @since 9
   */
  function decompressFile(inFile: string, outFile: string, options: Options): Promise<void>;

}
export default zlib;