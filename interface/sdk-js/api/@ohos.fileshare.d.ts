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

import {AsyncCallback, Callback} from "./basic";
import wantConstant from "./@ohos.ability.wantConstant";

/**
 * Provides fileshare APIS
 *
 * @since 9
 * @syscap SystemCapability.FileManagement.AppFileService
 */
declare namespace fileShare {

    /**
     * Provides grant uri permission for app
     * 
     * @since 9
     * @param {string} uri uri
     * @param {string} bundleName bundleName
     * @param {wantConstant.Flags} flag wantConstant.Flags.FLAG_AUTH_READ_URI_PERMISSION or wantConstant.Flags.FLAG_AUTH_WRITE_URI_PERMISSION
     * @throws { BusinessError } 201 - Permission verification failed
     * @throws { BusinessError } 202 - The caller is not a system application
     * @throws { BusinessError } 401 - The input parameter is invalid
     * @throws { BusinessError } 143000001 - IPC error
     * @syscap SystemCapability.FileManagement.AppFileService
     * @returns {void | Promise<void>} no callback return Promise otherwise return void
     * @systemapi
     */
    function grantUriPermission(uri: string, bundleName: string, flag: wantConstant.Flags, callback: AsyncCallback<void>): void;
    function grantUriPermission(uri: string, bundleName: string, flag: wantConstant.Flags): Promise<void>;
}

export default fileShare;
