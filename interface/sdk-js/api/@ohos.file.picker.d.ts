/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

import { AsyncCallback, Callback } from "./basic";

/**
 * This module provides the capabilities to use different pickers.
 *
 * @since 9
 * @syscap SystemCapability.FileManagement.UserFileService
 */
declare namespace picker {
    /**
     * PhotoViewMIMETypes represents the type of media resource that photo picker selects.
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     */
    enum PhotoViewMIMETypes {
        IMAGE_TYPE = "image/*",
        VIDEO_TYPE = "video/*",
        IMAGE_VIDEO_TYPE = "*/*"
    }

    /**
     * PhotoSelectOptions Object
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     */
    class PhotoSelectOptions {
        /**
         * The Type of the file in the picker window.
         * @type {PhotoViewMIMETypes}
         * @since 9
         */
        MIMEType?: PhotoViewMIMETypes;
        
        /**
         * Maximum number of images for a single selection.
         * @type {number}
         * @since 9
         */
        maxSelectNumber?: number;
    }

    /**
     * PhotoSelectResult Object
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     */
    class PhotoSelectResult {
        /**
         * The uris for the selected files.
         * @type {Array<string>}
         * @since 9
         */
        photoUris: Array<string>;
        
        /**
         * Original option.
         * @type {boolean}
         * @since 9
         */
        isOriginalPhoto: boolean;
    }

    /**
     * PhotoSaveOptions Object
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     */
    class PhotoSaveOptions {
        /**
         * The names of the files to be saved.
         * @type {Array<string>}
         * @since 9
         */
        newFileNames?: Array<string>;
    }

    /**
     * PhotoViewPicker Object
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     */
    class PhotoViewPicker {
        /**
         * Pull up the photo picker based on the selection mode.
         *
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService
         * @param PhotoSelectOptions represents the options provided in select mode.
         * @returns {(void | Promise<PhotoSelectResult>)} Returns the uris for the selected files.
         */
        select(option?: PhotoSelectOptions) : Promise<PhotoSelectResult>;
        select(option: PhotoSelectOptions, callback: AsyncCallback<PhotoSelectResult>) : void;
        select(callback: AsyncCallback<PhotoSelectResult>) : void;

        /**
         * Pull up the photo picker based on the save mode.
         *
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService
         * @param PhotoSaveOptions represents the options provided in save mode.
         * @returns {(void | Promise<Array<string>>)} Returns the uris for the saved files.
         */
        save(option?: PhotoSaveOptions) : Promise<Array<string>>;
        save(option: PhotoSaveOptions, callback: AsyncCallback<Array<string>>) : void;
        save(callback: AsyncCallback<Array<string>>) : void;
    }

    /**
     * DocumentSelectOptions Object. Currently not supported.
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     */
    class DocumentSelectOptions {
    }

    /**
     * DocumentSaveOptions Object
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     */
    class DocumentSaveOptions {
        /**
         * The names of the files to be saved.
         * Currently, only single file is supported.
         * @type {Array<string>}
         * @since 9
         */
        newFileNames?: Array<string>;
    }

    /**
     * DocumentViewPicker Object
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     */    
    class DocumentViewPicker {
        /**
         * Pull up the document picker based on the selection mode.
         * Currently, only single file is supported.
         *
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService         
         * @param DocumentSelectOptions represents the options provided in select mode.
         * @returns {(void | Promise<Array<string>>)} Returns the uris for the selected files.
         */
        select(option?: DocumentSelectOptions) : Promise<Array<string>>;
        select(option: DocumentSelectOptions, callback: AsyncCallback<Array<string>>) : void;
        select(callback: AsyncCallback<Array<string>>) : void;

        /**
         * Pull up the document picker based on the save mode.
         * Currently, only single file is supported.
         *
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService         
         * @param DocumentSaveOptions represents the options provided in save mode.
         * @returns {(void | Promise<Array<string>>)} Returns the uris for the saved files.
         */
        save(option?: DocumentSaveOptions) : Promise<Array<string>>;
        save(option: DocumentSaveOptions, callback: AsyncCallback<Array<string>>) : void;
        save(callback: AsyncCallback<Array<string>>) : void;
    }

    /**
     * AudioSelectOptions Object. Currently not supported.
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     */
    class AudioSelectOptions {
    }

    /**
     * AudioSaveOptions Object
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     */
    class AudioSaveOptions {
        /**
         * The names of the files to be saved.
         * Currently, only single file is supported.
         * @type {Array<string>}
         * @since 9
         */
        newFileNames?: Array<string>;
    }

    /**
     * AudioViewPicker Object
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     */ 
    class AudioViewPicker {
        /**
         * Pull up the audio picker based on the selection mode.
         * Currently, only single file is supported.
         *
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService
         * @param AudioSelectOptions represents the options provided in select mode.
         * @returns {(void | Promise<Array<string>>)} Returns the uris for the selected files.
         */
        select(option?: AudioSelectOptions) : Promise<Array<string>>;
        select(option: AudioSelectOptions, callback: AsyncCallback<Array<string>>) : void;
        select(callback: AsyncCallback<Array<string>>) : void;

        /**
         * Pull up the audio picker based on the save mode.
         * Currently, only single file is supported.
         *
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService         
         * @param AudioSaveOptions represents the options provided in save mode.
         * @returns {(void | Promise<Array<string>>)} Returns the uris for the saved files.
         */
        save(option?: AudioSaveOptions) : Promise<Array<string>>;
        save(option: AudioSaveOptions, callback: AsyncCallback<Array<string>>) : void;
        save(callback: AsyncCallback<Array<string>>) : void;
    }
}

export default picker;