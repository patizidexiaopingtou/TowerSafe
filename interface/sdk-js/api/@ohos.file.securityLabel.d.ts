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
 * Provides securityLabel APIs
 *
 * @since 9
 * @syscap  SystemCapability.FileManagement.File.FileIO
 */

declare namespace securityLabel {

  type DataLevel = 's0'|'s1'|'s2'|'s3'|'s4';
  /**
   * Set the SecurityLabel.
   *
   * @since 9
   * @syscap  SystemCapability.FileManagement.File.FileIO
   * @param {string} path - path
   * @param {AsyncCallback<void>} [callback] - callback
   * @returns {void | Promise<void>} no callback return Promise otherwise return void
   * @throws { BusinessError } 13900001  - Operation not permitted
   * @throws { BusinessError } 13900007  - Arg list too long
   * @throws { BusinessError } 13900015  - File exists
   * @throws { BusinessError } 13900020  - Invalid argument
   * @throws { BusinessError } 13900025  - No space left on device
   * @throws { BusinessError } 13900037  - No data available
   * @throws { BusinessError } 13900041  - Quota exceeded
   * @throws { BusinessError } 13900042  - Unknown error
   */
  function setSecurityLabel(path: string, type: DataLevel): Promise<void>;
  function setSecurityLabel(path: string, type: DataLevel, callback: AsyncCallback<void>): void;

  /**
   * Set the SecurityLabel with sync interface.
   *
   * @since 9
   * @syscap  SystemCapability.FileManagement.File.FileIO
   * @param {string} path - path
   * @param {AsyncCallback<void>} [callback] - callback
   * @returns {void | Promise<void>} no callback return Promise otherwise return void
   * @throws { BusinessError } 13900001  - Operation not permitted
   * @throws { BusinessError } 13900007  - Arg list too long
   * @throws { BusinessError } 13900015  - File exists
   * @throws { BusinessError } 13900020  - Invalid argument
   * @throws { BusinessError } 13900025  - No space left on device
   * @throws { BusinessError } 13900037  - No data available
   * @throws { BusinessError } 13900041  - Quota exceeded
   * @throws { BusinessError } 13900042  - Unknown error
   */
  function setSecurityLabelSync(path: string, type: DataLevel): void;

    /**
   * Get the SecurityLabel.
   *
   * @since 9
   * @syscap  SystemCapability.FileManagement.File.FileIO
   * @param {string} path - path
   * @param {AsyncCallback<void>} [callback] - callback
   * @returns {void | Promise<void>} no callback return Promise otherwise return void
   * @throws { BusinessError } 13900001  - Operation not permitted
   * @throws { BusinessError } 13900007  - Arg list too long
   * @throws { BusinessError } 13900015  - File exists
   * @throws { BusinessError } 13900020  - Invalid argument
   * @throws { BusinessError } 13900025  - No space left on device
   * @throws { BusinessError } 13900037  - No data available
   * @throws { BusinessError } 13900041  - Quota exceeded
   * @throws { BusinessError } 13900042  - Unknown error
   */
  function getSecurityLabel(path: string): Promise<string>;
  function getSecurityLabel(path: string, callback: AsyncCallback<string>): void;

  /**
   * Get the SecurityLabel with sync interface.
   *
   * @since 9
   * @syscap  SystemCapability.FileManagement.File.FileIO
   * @param {string} path - path
   * @param {AsyncCallback<void>} [callback] - callback
   * @returns {void | Promise<void>} no callback return Promise otherwise return void
   * @throws { BusinessError } 13900001  - Operation not permitted
   * @throws { BusinessError } 13900007  - Arg list too long
   * @throws { BusinessError } 13900015  - File exists
   * @throws { BusinessError } 13900020  - Invalid argument
   * @throws { BusinessError } 13900025  - No space left on device
   * @throws { BusinessError } 13900037  - No data available
   * @throws { BusinessError } 13900041  - Quota exceeded
   * @throws { BusinessError } 13900042  - Unknown error
   */
   function getSecurityLabelSync(path: string): string;
}

export default securityLabel;