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

/**
 * Provides fileuri APIS
 *
 * @since 9
 * @syscap SystemCapability.FileManagement.AppFileService
 */
declare namespace fileUri {

    /**
     * Get the uri from the path of file in app sandbox
     * 
     * @since 9
     * @param {string} path the path of file in app sandbox
     * @throws { BusinessError } 401 - The input parameter is invalid
     * @syscap SystemCapability.FileManagement.AppFileService
     * @returns Return the file uri
     */
    function getUriFromPath(path: string): string;
}

export default fileUri;
