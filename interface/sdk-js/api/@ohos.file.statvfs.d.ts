/*
* Copyright (C) 2022 Huawei Device Co., Ltd.
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

import { AsyncCallback } from "./basic";

/**
 * Provides filesystem statistics APIs
 *
 * @since 9
 * @syscap SystemCapability.FileManagement.File.FileIO
 */
declare namespace statfs {
  /**
   * Get the number of free bytes on the specified path.
   *
   * @syscap SystemCapability.FileManagement.File.FileIO
   * @since 9
   * @param {string} path - path
   * @param {AsyncCallback<number>} [callback] - callback
   * @returns {void | Promise<number>} no callback return Promise otherwise return void
   * @throws { BusinessError } 13900002  - No such file or directory
   * @throws { BusinessError } 13900004  - Interrupted system call
   * @throws { BusinessError } 13900005  - I/O error
   * @throws { BusinessError } 13900008  - Bad file descriptor
   * @throws { BusinessError } 13900011  - Out of memory
   * @throws { BusinessError } 13900012  - Permission denied
   * @throws { BusinessError } 13900013  - Bad address
   * @throws { BusinessError } 13900018  - Not a directory
   * @throws { BusinessError } 13900030  - File name too long
   * @throws { BusinessError } 13900031  - Function not implemented
   * @throws { BusinessError } 13900033  - Too many symbolic links encountered
   * @throws { BusinessError } 13900038  - Value too large for defined data type
   * @throws { BusinessError } 13900042  - Unknown error
   */
  function getFreeSize(path: string): Promise<number>;
  function getFreeSize(path: string, callback: AsyncCallback<number>): void;
  
  /**
   * Get the number of total bytes on the specified path.
   *
   * @syscap SystemCapability.FileManagement.File.FileIO
   * @since 9
   * @param {string} path - path
   * @param {AsyncCallback<number>} [callback] - callback
   * @returns {void | Promise<number>} no callback return Promise otherwise return void
   * @throws { BusinessError } 13900002  - No such file or directory
   * @throws { BusinessError } 13900004  - Interrupted system call
   * @throws { BusinessError } 13900005  - I/O error
   * @throws { BusinessError } 13900008  - Bad file descriptor
   * @throws { BusinessError } 13900011  - Out of memory
   * @throws { BusinessError } 13900012  - Permission denied
   * @throws { BusinessError } 13900013  - Bad address
   * @throws { BusinessError } 13900018  - Not a directory
   * @throws { BusinessError } 13900030  - File name too long
   * @throws { BusinessError } 13900031  - Function not implemented
   * @throws { BusinessError } 13900033  - Too many symbolic links encountered
   * @throws { BusinessError } 13900038  - Value too large for defined data type
   * @throws { BusinessError } 13900042  - Unknown error
   */
  function getTotalSize(path: string): Promise<number>;
  function getTotalSize(path: string, callback: AsyncCallback<number>): void;
}

export default statfs;
