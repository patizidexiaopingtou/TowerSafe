/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { AsyncCallback } from './basic'

/**
 * Hash
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare namespace hash {
    /**
     * Hash file.
     * @static
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @param {string} path - path.
     * @param {string} algorithm - algorithm md5 sha1 sha256.
     * @param {AsyncCallback<string>} [callback] - callback.
     * @returns {void | Promise<string>} no callback return Promise otherwise return void
     * @throws { BusinessError } 13900020  - Invalid argument
     * @throws { BusinessError } 13900042  - Unknown error
     */
    function hash(path: string, algorithm: string): Promise<string>;
    function hash(path: string, algorithm: string, callback: AsyncCallback<string>): void;
}

export default hash;
 