/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

/**
 * This module provides the capability to parse file or device information.
 *
 * @since 9
 * @syscap SystemCapability.FileManagement.UserFileService
 * @systemapi
 */
declare namespace fileExtensionInfo {
    /**
     * DeviceType Indicates the type of device connected to the fileaccess server.
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     * @systemapi
     * @StageModelOnly
     */
    enum DeviceType {
        DEVICE_LOCAL_DISK = 1,              // Local c,d... disk
        DEVICE_SHARED_DISK,                 // Multi-user shared disk
        DEVICE_SHARED_TERMINAL,             // Distributed networking terminal device
        DEVICE_NETWORK_NEIGHBORHOODS,       // Network neighbor device
        DEVICE_EXTERNAL_MTP,                // MTP device
        DEVICE_EXTERNAL_USB,                // USB device
        DEVICE_EXTERNAL_CLOUD               // Cloud disk device
    }

    /**
     * Indicates the supported capabilities of the device.
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     * @systemapi
     * @StageModelOnly
     */
    namespace DeviceFlag {
        const SUPPORTS_READ = 0b1;
        const SUPPORTS_WRITE = 0b10;
    }

    /**
     * Indicate the supported capabilities of the file or directory.
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     * @systemapi
     * @StageModelOnly
     */
    namespace DocumentFlag {
        const REPRESENTS_FILE = 0b1;
        const REPRESENTS_DIR = 0b10;
        const SUPPORTS_READ = 0b100;
        const SUPPORTS_WRITE = 0b1000;
    }
}

export default fileExtensionInfo;
