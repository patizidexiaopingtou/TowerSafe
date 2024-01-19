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

import { AsyncCallback, Callback } from "./basic";
import Want from './@ohos.app.ability.Want';
import Context from './application/Context';
import { Filter } from './@ohos.fileio';

/**
 * This module provides the capability to access user public files.
 *
 * @since 9
 * @syscap SystemCapability.FileManagement.UserFileService
 */
declare namespace fileAccess {
    /**
     * Query the want information of HAP configured with fileaccess.
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     * @StageModelOnly
     * @systemapi
     * @permission ohos.permission.FILE_ACCESS_MANAGER and ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
     * @returns {(void | Promise<Array<Want>>)} Returns the wants.
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900002 - No such file or directory
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900006 - No such device or address
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900011 - Out of memory
     * @throws { BusinessError } 13900012 - Permission denied
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900014 - Device or resource busy
     * @throws { BusinessError } 13900015 - File exists
     * @throws { BusinessError } 13900017 - No such device
     * @throws { BusinessError } 13900018 - Not a directory
     * @throws { BusinessError } 13900019 - Is a directory
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900022 - Too many open files
     * @throws { BusinessError } 13900023 - Text file busy
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900027 - Read-only file system
     * @throws { BusinessError } 13900029 - Resource deadlock would occur
     * @throws { BusinessError } 13900030 - File name too long
     * @throws { BusinessError } 13900033 - Too many symbolic links encountered
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900038 - Value too large for defined data type
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @throws { BusinessError } 14300001 - IPC error
     * @throws { BusinessError } 14300002 - Invalid uri
     * @throws { BusinessError } 14300003 - Fail to get fileextension info
     * @throws { BusinessError } 14300004 - Get wrong result
     */
    function getFileAccessAbilityInfo(callback: AsyncCallback<Array<Want>>): void;
    function getFileAccessAbilityInfo(): Promise<Array<Want>>;

    /**
     * Obtains the fileAccessHelper that connects all fileaccess servers in the system.
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     * @StageModelOnly
     * @systemapi
     * @permission ohos.permission.FILE_ACCESS_MANAGER and ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
     * @param context Indicates the application context.
     * @returns { FileAccessHelper } Returns the fileAccessHelper.
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900002 - No such file or directory
     * @throws { BusinessError } 13900004 - Interrupted system call
     * @throws { BusinessError } 13900006 - No such device or address
     * @throws { BusinessError } 13900008 - Bad file descriptor
     * @throws { BusinessError } 13900011 - Out of memory
     * @throws { BusinessError } 13900012 - Permission denied
     * @throws { BusinessError } 13900013 - Bad address
     * @throws { BusinessError } 13900014 - Device or resource busy
     * @throws { BusinessError } 13900015 - File exists
     * @throws { BusinessError } 13900017 - No such device
     * @throws { BusinessError } 13900018 - Not a directory
     * @throws { BusinessError } 13900019 - Is a directory
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900022 - Too many open files
     * @throws { BusinessError } 13900023 - Text file busy
     * @throws { BusinessError } 13900024 - File too large
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900027 - Read-only file system
     * @throws { BusinessError } 13900029 - Resource deadlock would occur
     * @throws { BusinessError } 13900030 - File name too long
     * @throws { BusinessError } 13900033 - Too many symbolic links encountered
     * @throws { BusinessError } 13900034 - Operation would block
     * @throws { BusinessError } 13900038 - Value too large for defined data type
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @throws { BusinessError } 14300001 - IPC error
     * @throws { BusinessError } 14300002 - Invalid uri
     * @throws { BusinessError } 14300003 - Fail to get fileextension info
     * @throws { BusinessError } 14300004 - Get wrong result
     */
    function createFileAccessHelper(context: Context): FileAccessHelper;

    /**
     * Obtains the fileAccessHelper that connects some specified fileaccess servers in the system.
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     * @StageModelOnly
     * @systemapi
     * @permission ohos.permission.FILE_ACCESS_MANAGER and ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
     * @param context Indicates the application context.
     * @param want Represents the connected data provider.
     * @returns { FileAccessHelper } Returns the fileAccessHelper.
     * @throws { BusinessError } 13900001  - Operation not permitted
     * @throws { BusinessError } 13900002  - No such file or directory
     * @throws { BusinessError } 13900004  - Interrupted system call
     * @throws { BusinessError } 13900006  - No such device or address
     * @throws { BusinessError } 13900008  - Bad file descriptor
     * @throws { BusinessError } 13900011  - Out of memory
     * @throws { BusinessError } 13900012  - Permission denied
     * @throws { BusinessError } 13900013  - Bad address
     * @throws { BusinessError } 13900014  - Device or resource busy
     * @throws { BusinessError } 13900015  - File exists
     * @throws { BusinessError } 13900017  - No such device
     * @throws { BusinessError } 13900018  - Not a directory
     * @throws { BusinessError } 13900019  - Is a directory
     * @throws { BusinessError } 13900020  - Invalid argument
     * @throws { BusinessError } 13900022  - Too many open files
     * @throws { BusinessError } 13900023  - Text file busy
     * @throws { BusinessError } 13900024  - File too large
     * @throws { BusinessError } 13900025  - No space left on device
     * @throws { BusinessError } 13900027  - Read-only file system
     * @throws { BusinessError } 13900029  - Resource deadlock would occur
     * @throws { BusinessError } 13900030  - File name too long
     * @throws { BusinessError } 13900033  - Too many symbolic links encountered
     * @throws { BusinessError } 13900034  - Operation would block
     * @throws { BusinessError } 13900038  - Value too large for defined data type
     * @throws { BusinessError } 13900041  - Quota exceeded
     * @throws { BusinessError } 13900042  - Unknown error
     * @throws { BusinessError } 14300001  - IPC error
     * @throws { BusinessError } 14300002  - Invalid uri
     * @throws { BusinessError } 14300003  - Fail to get fileextension info
     * @throws { BusinessError } 14300004  - Get wrong result
     */
    function createFileAccessHelper(context: Context, wants: Array<Want>): FileAccessHelper;

    /**
     * File Object
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     * @StageModelOnly
     * @systemapi
     * @permission ohos.permission.FILE_ACCESS_MANAGER
     * @param uri Indicates the path of the file.
     * @param fileName Indicates the name of the file.
     * @param mode Indicates the mode of the file.
     * @param size Indicates the size of the file.
     * @param mtime Indicates the mtime of the file.
     * @param mimeType Indicates the mimeType of the file.
     */
    interface FileInfo {
        /**
         * @type {string}
         * @readonly
         */
        uri: string;
        /**
         * @type {string}
         * @readonly
         */
        fileName: string;
        /**
         * @type {number}
         * @readonly
         */
        mode: number;
        /**
         * @type {number}
         * @readonly
         */
        size: number;
        /**
         * @type {number}
         * @readonly
         */
        mtime: number;
        /**
         * @type {string}
         * @readonly
         */
        mimeType: string;

        /**
         * List files in the current directory.
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService
         * @StageModelOnly
         * @systemapi
         * @permission ohos.permission.FILE_ACCESS_MANAGER
         * @param filter Indicates the filter of file.
         * @returns { FileIterator } Returns the FileIterator Object.
         * @throws { BusinessError } 13900001 - Operation not permitted
         * @throws { BusinessError } 13900002 - No such file or directory
         * @throws { BusinessError } 13900004 - Interrupted system call
         * @throws { BusinessError } 13900006 - No such device or address
         * @throws { BusinessError } 13900008 - Bad file descriptor
         * @throws { BusinessError } 13900011 - Out of memory
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900013 - Bad address
         * @throws { BusinessError } 13900014 - Device or resource busy
         * @throws { BusinessError } 13900015 - File exists
         * @throws { BusinessError } 13900017 - No such device
         * @throws { BusinessError } 13900018 - Not a directory
         * @throws { BusinessError } 13900019 - Is a directory
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 13900022 - Too many open files
         * @throws { BusinessError } 13900023 - Text file busy
         * @throws { BusinessError } 13900024 - File too large
         * @throws { BusinessError } 13900025 - No space left on device
         * @throws { BusinessError } 13900027 - Read-only file system
         * @throws { BusinessError } 13900029 - Resource deadlock would occur
         * @throws { BusinessError } 13900030 - File name too long
         * @throws { BusinessError } 13900033 - Too many symbolic links encountered
         * @throws { BusinessError } 13900034 - Operation would block
         * @throws { BusinessError } 13900038 - Value too large for defined data type
         * @throws { BusinessError } 13900041 - Quota exceeded
         * @throws { BusinessError } 13900042 - Unknown error
         * @throws { BusinessError } 14000001 - Invalid display name
         * @throws { BusinessError } 14000002 - Invalid uri
         * @throws { BusinessError } 14000003 - Invalid file extension
         * @throws { BusinessError } 14000004 - File has been put into trash bin
         * @throws { BusinessError } 14300001 - IPC error
         * @throws { BusinessError } 14300002 - Invalid uri
         * @throws { BusinessError } 14300003 - Fail to get fileextension info
         * @throws { BusinessError } 14300004 - Get wrong result
         */
        listFile(filter?: Filter): FileIterator;

        /**
         * Recursively list all files in the current directory.
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService
         * @StageModelOnly
         * @systemapi
         * @permission ohos.permission.FILE_ACCESS_MANAGER
         * @param filter Indicates the filter of file.
         * @returns { FileIterator } Returns the FileIterator Object.
         * @throws { BusinessError } 13900001 - Operation not permitted
         * @throws { BusinessError } 13900002 - No such file or directory
         * @throws { BusinessError } 13900004 - Interrupted system call
         * @throws { BusinessError } 13900006 - No such device or address
         * @throws { BusinessError } 13900008 - Bad file descriptor
         * @throws { BusinessError } 13900011 - Out of memory
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900013 - Bad address
         * @throws { BusinessError } 13900014 - Device or resource busy
         * @throws { BusinessError } 13900015 - File exists
         * @throws { BusinessError } 13900017 - No such device
         * @throws { BusinessError } 13900018 - Not a directory
         * @throws { BusinessError } 13900019 - Is a directory
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 13900022 - Too many open files
         * @throws { BusinessError } 13900023 - Text file busy
         * @throws { BusinessError } 13900024 - File too large
         * @throws { BusinessError } 13900025 - No space left on device
         * @throws { BusinessError } 13900027 - Read-only file system
         * @throws { BusinessError } 13900029 - Resource deadlock would occur
         * @throws { BusinessError } 13900030 - File name too long
         * @throws { BusinessError } 13900033 - Too many symbolic links encountered
         * @throws { BusinessError } 13900034 - Operation would block
         * @throws { BusinessError } 13900038 - Value too large for defined data type
         * @throws { BusinessError } 13900041 - Quota exceeded
         * @throws { BusinessError } 13900042 - Unknown error
         * @throws { BusinessError } 14000001 - Invalid display name
         * @throws { BusinessError } 14000002 - Invalid uri
         * @throws { BusinessError } 14000003 - Invalid file extension
         * @throws { BusinessError } 14000004 - File has been put into trash bin
         * @throws { BusinessError } 14300001 - IPC error
         * @throws { BusinessError } 14300002 - Invalid uri
         * @throws { BusinessError } 14300003 - Fail to get fileextension info
         * @throws { BusinessError } 14300004 - Get wrong result
         */
        scanFile(filter?: Filter): FileIterator;
    }

    /**
     * FileIterator Object
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     * @StageModelOnly
     * @systemapi
     * @permission ohos.permission.FILE_ACCESS_MANAGER
     */
    interface FileIterator {
        /**
         * Get the next fileInfo.
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService
         * @StageModelOnly
         * @systemapi
         * @permission ohos.permission.FILE_ACCESS_MANAGER
         * @returns { FileInfo } Returns the FileInfo Object.
         * @throws { BusinessError } 13900001 - Operation not permitted
         * @throws { BusinessError } 13900002 - No such file or directory
         * @throws { BusinessError } 13900004 - Interrupted system call
         * @throws { BusinessError } 13900006 - No such device or address
         * @throws { BusinessError } 13900008 - Bad file descriptor
         * @throws { BusinessError } 13900011 - Out of memory
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900013 - Bad address
         * @throws { BusinessError } 13900014 - Device or resource busy
         * @throws { BusinessError } 13900015 - File exists
         * @throws { BusinessError } 13900017 - No such device
         * @throws { BusinessError } 13900018 - Not a directory
         * @throws { BusinessError } 13900019 - Is a directory
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 13900022 - Too many open files
         * @throws { BusinessError } 13900023 - Text file busy
         * @throws { BusinessError } 13900024 - File too large
         * @throws { BusinessError } 13900025 - No space left on device
         * @throws { BusinessError } 13900027 - Read-only file system
         * @throws { BusinessError } 13900029 - Resource deadlock would occur
         * @throws { BusinessError } 13900030 - File name too long
         * @throws { BusinessError } 13900033 - Too many symbolic links encountered
         * @throws { BusinessError } 13900034 - Operation would block
         * @throws { BusinessError } 13900038 - Value too large for defined data type
         * @throws { BusinessError } 13900041 - Quota exceeded
         * @throws { BusinessError } 13900042 - Unknown error
         * @throws { BusinessError } 14000001 - Invalid display name
         * @throws { BusinessError } 14000002 - Invalid uri
         * @throws { BusinessError } 14000003 - Invalid file extension
         * @throws { BusinessError } 14000004 - File has been put into trash bin
         * @throws { BusinessError } 14300001 - IPC error
         * @throws { BusinessError } 14300002 - Invalid uri
         * @throws { BusinessError } 14300003 - Fail to get fileextension info
         * @throws { BusinessError } 14300004 - Get wrong result
         */
        next(): {value: FileInfo, done: boolean}
    }

    /**
     * Root Object
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     * @StageModelOnly
     * @systemapi
     * @permission ohos.permission.FILE_ACCESS_MANAGER
     */
    interface RootInfo {
        /**
         * @type {number}
         * @readonly
         */
        deviceType: number;
        /**
         * @type {string}
         * @readonly
         */
        uri: string;
        /**
         * @type {string}
         * @readonly
         */
        displayName: string;
        /**
         * @type {number}
         * @readonly
         */
        deviceFlags: number;

        /**
         * List files in the current directory.
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService
         * @StageModelOnly
         * @systemapi
         * @permission ohos.permission.FILE_ACCESS_MANAGER
         * @param filter Indicates the filter of file.
         * @returns { FileIterator } Returns the FileIterator Object.
         * @throws { BusinessError } 13900001 - Operation not permitted
         * @throws { BusinessError } 13900002 - No such file or directory
         * @throws { BusinessError } 13900004 - Interrupted system call
         * @throws { BusinessError } 13900006 - No such device or address
         * @throws { BusinessError } 13900008 - Bad file descriptor
         * @throws { BusinessError } 13900011 - Out of memory
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900013 - Bad address
         * @throws { BusinessError } 13900014 - Device or resource busy
         * @throws { BusinessError } 13900015 - File exists
         * @throws { BusinessError } 13900017 - No such device
         * @throws { BusinessError } 13900018 - Not a directory
         * @throws { BusinessError } 13900019 - Is a directory
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 13900022 - Too many open files
         * @throws { BusinessError } 13900023 - Text file busy
         * @throws { BusinessError } 13900024 - File too large
         * @throws { BusinessError } 13900025 - No space left on device
         * @throws { BusinessError } 13900027 - Read-only file system
         * @throws { BusinessError } 13900029 - Resource deadlock would occur
         * @throws { BusinessError } 13900030 - File name too long
         * @throws { BusinessError } 13900033 - Too many symbolic links encountered
         * @throws { BusinessError } 13900034 - Operation would block
         * @throws { BusinessError } 13900038 - Value too large for defined data type
         * @throws { BusinessError } 13900041 - Quota exceeded
         * @throws { BusinessError } 13900042 - Unknown error
         * @throws { BusinessError } 14000001 - Invalid display name
         * @throws { BusinessError } 14000002 - Invalid uri
         * @throws { BusinessError } 14000003 - Invalid file extension
         * @throws { BusinessError } 14000004 - File has been put into trash bin
         * @throws { BusinessError } 14300001 - IPC error
         * @throws { BusinessError } 14300002 - Invalid uri
         * @throws { BusinessError } 14300003 - Fail to get fileextension info
         * @throws { BusinessError } 14300004 - Get wrong result
         */
        listFile(filter?: Filter): FileIterator;

        /**
         * Recursively list all files in the current directory.
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService
         * @StageModelOnly
         * @systemapi
         * @permission ohos.permission.FILE_ACCESS_MANAGER
         * @param filter Indicates the filter of file.
         * @returns { FileIterator } Returns the RootIterator Object.
         * @throws { BusinessError } 13900001 - Operation not permitted
         * @throws { BusinessError } 13900002 - No such file or directory
         * @throws { BusinessError } 13900004 - Interrupted system call
         * @throws { BusinessError } 13900006 - No such device or address
         * @throws { BusinessError } 13900008 - Bad file descriptor
         * @throws { BusinessError } 13900011 - Out of memory
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900013 - Bad address
         * @throws { BusinessError } 13900014 - Device or resource busy
         * @throws { BusinessError } 13900015 - File exists
         * @throws { BusinessError } 13900017 - No such device
         * @throws { BusinessError } 13900018 - Not a directory
         * @throws { BusinessError } 13900019 - Is a directory
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 13900022 - Too many open files
         * @throws { BusinessError } 13900023 - Text file busy
         * @throws { BusinessError } 13900024 - File too large
         * @throws { BusinessError } 13900025 - No space left on device
         * @throws { BusinessError } 13900027 - Read-only file system
         * @throws { BusinessError } 13900029 - Resource deadlock would occur
         * @throws { BusinessError } 13900030 - File name too long
         * @throws { BusinessError } 13900033 - Too many symbolic links encountered
         * @throws { BusinessError } 13900034 - Operation would block
         * @throws { BusinessError } 13900038 - Value too large for defined data type
         * @throws { BusinessError } 13900041 - Quota exceeded
         * @throws { BusinessError } 13900042 - Unknown error
         * @throws { BusinessError } 14000001 - Invalid display name
         * @throws { BusinessError } 14000002 - Invalid uri
         * @throws { BusinessError } 14000003 - Invalid file extension
         * @throws { BusinessError } 14000004 - File has been put into trash bin
         * @throws { BusinessError } 14300001 - IPC error
         * @throws { BusinessError } 14300002 - Invalid uri
         * @throws { BusinessError } 14300003 - Fail to get fileextension info
         * @throws { BusinessError } 14300004 - Get wrong result
         */
        scanFile(filter?: Filter): FileIterator;
    }

    /**
     * RootIterator Object
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     * @StageModelOnly
     * @systemapi
     * @permission ohos.permission.FILE_ACCESS_MANAGER
     */
    interface RootIterator {
        /**
         * Get a next RootInfo.
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService
         * @StageModelOnly
         * @systemapi
         * @permission ohos.permission.FILE_ACCESS_MANAGER
         * @returns { FileInfo } Returns the RootInfo Object.
         * @throws { BusinessError } 13900001 - Operation not permitted
         * @throws { BusinessError } 13900002 - No such file or directory
         * @throws { BusinessError } 13900004 - Interrupted system call
         * @throws { BusinessError } 13900006 - No such device or address
         * @throws { BusinessError } 13900008 - Bad file descriptor
         * @throws { BusinessError } 13900011 - Out of memory
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900013 - Bad address
         * @throws { BusinessError } 13900014 - Device or resource busy
         * @throws { BusinessError } 13900015 - File exists
         * @throws { BusinessError } 13900017 - No such device
         * @throws { BusinessError } 13900018 - Not a directory
         * @throws { BusinessError } 13900019 - Is a directory
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 13900022 - Too many open files
         * @throws { BusinessError } 13900023 - Text file busy
         * @throws { BusinessError } 13900024 - File too large
         * @throws { BusinessError } 13900025 - No space left on device
         * @throws { BusinessError } 13900027 - Read-only file system
         * @throws { BusinessError } 13900029 - Resource deadlock would occur
         * @throws { BusinessError } 13900030 - File name too long
         * @throws { BusinessError } 13900033 - Too many symbolic links encountered
         * @throws { BusinessError } 13900034 - Operation would block
         * @throws { BusinessError } 13900038 - Value too large for defined data type
         * @throws { BusinessError } 13900041 - Quota exceeded
         * @throws { BusinessError } 13900042 - Unknown error
         * @throws { BusinessError } 14000001 - Invalid display name
         * @throws { BusinessError } 14000002 - Invalid uri
         * @throws { BusinessError } 14000003 - Invalid file extension
         * @throws { BusinessError } 14000004 - File has been put into trash bin
         * @throws { BusinessError } 14300001 - IPC error
         * @throws { BusinessError } 14300002 - Invalid uri
         * @throws { BusinessError } 14300003 - Fail to get fileextension info
         * @throws { BusinessError } 14300004 - Get wrong result
         */
        next(): {value: RootInfo, done: boolean}
    }

    /**
     * OPENFLAGS represents the way to open the file.
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     * @StageModelOnly
     * @systemapi
     */
    enum OPENFLAGS {
        /** file is openFile only_read */
        READ = 0o0,
        /** file is openFile only_write */
        WRITE = 0o1,
        /** file is openFile write_read */
        WRITE_READ = 0o2
    }

    /**
     * FileAccessHelper Object
     * @since 9
     * @syscap SystemCapability.FileManagement.UserFileService
     * @StageModelOnly
     * @systemapi
     * @permission ohos.permission.FILE_ACCESS_MANAGER
     */
    interface FileAccessHelper {
        /**
         * Open a file.
         *
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService
         * @StageModelOnly
         * @systemapi
         * @permission ohos.permission.FILE_ACCESS_MANAGER
         * @param uri Indicates the path of the file to open.
         * @param flags Indicate options of opening a file. The default value is read-only.
         * @returns {(void | Promise<number>)} Returns the file descriptor.
         * @throws { BusinessError } 13900001 - Operation not permitted
         * @throws { BusinessError } 13900002 - No such file or directory
         * @throws { BusinessError } 13900004 - Interrupted system call
         * @throws { BusinessError } 13900006 - No such device or address
         * @throws { BusinessError } 13900008 - Bad file descriptor
         * @throws { BusinessError } 13900011 - Out of memory
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900013 - Bad address
         * @throws { BusinessError } 13900014 - Device or resource busy
         * @throws { BusinessError } 13900015 - File exists
         * @throws { BusinessError } 13900017 - No such device
         * @throws { BusinessError } 13900018 - Not a directory
         * @throws { BusinessError } 13900019 - Is a directory
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 13900022 - Too many open files
         * @throws { BusinessError } 13900023 - Text file busy
         * @throws { BusinessError } 13900024 - File too large
         * @throws { BusinessError } 13900025 - No space left on device
         * @throws { BusinessError } 13900027 - Read-only file system
         * @throws { BusinessError } 13900029 - Resource deadlock would occur
         * @throws { BusinessError } 13900030 - File name too long
         * @throws { BusinessError } 13900033 - Too many symbolic links encountered
         * @throws { BusinessError } 13900034 - Operation would block
         * @throws { BusinessError } 13900038 - Value too large for defined data type
         * @throws { BusinessError } 13900041 - Quota exceeded
         * @throws { BusinessError } 13900042 - Unknown error
         * @throws { BusinessError } 14000001 - Invalid display name
         * @throws { BusinessError } 14000002 - Invalid uri
         * @throws { BusinessError } 14000003 - Invalid file extension
         * @throws { BusinessError } 14000004 - File has been put into trash bin
         * @throws { BusinessError } 14300001 - IPC error
         * @throws { BusinessError } 14300002 - Invalid uri
         * @throws { BusinessError } 14300003 - Fail to get fileextension info
         * @throws { BusinessError } 14300004 - Get wrong result
         */
        openFile(uri: string, flags: OPENFLAGS) : Promise<number>;
        openFile(uri: string, flags: OPENFLAGS, callback: AsyncCallback<number>) : void;

        /**
         * Create a file.
         *
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService
         * @StageModelOnly
         * @systemapi
         * @permission ohos.permission.FILE_ACCESS_MANAGER
         * @param uri Represents a specific parent directory.
         * @param displayName Indicates the new file name, and supports with suffix.
         * @returns {(void | Promise<string>)} Returns the new file's URI.
         * @throws { BusinessError } 13900001 - Operation not permitted
         * @throws { BusinessError } 13900002 - No such file or directory
         * @throws { BusinessError } 13900004 - Interrupted system call
         * @throws { BusinessError } 13900006 - No such device or address
         * @throws { BusinessError } 13900008 - Bad file descriptor
         * @throws { BusinessError } 13900011 - Out of memory
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900013 - Bad address
         * @throws { BusinessError } 13900014 - Device or resource busy
         * @throws { BusinessError } 13900015 - File exists
         * @throws { BusinessError } 13900017 - No such device
         * @throws { BusinessError } 13900018 - Not a directory
         * @throws { BusinessError } 13900019 - Is a directory
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 13900022 - Too many open files
         * @throws { BusinessError } 13900023 - Text file busy
         * @throws { BusinessError } 13900024 - File too large
         * @throws { BusinessError } 13900025 - No space left on device
         * @throws { BusinessError } 13900027 - Read-only file system
         * @throws { BusinessError } 13900029 - Resource deadlock would occur
         * @throws { BusinessError } 13900030 - File name too long
         * @throws { BusinessError } 13900033 - Too many symbolic links encountered
         * @throws { BusinessError } 13900034 - Operation would block
         * @throws { BusinessError } 13900038 - Value too large for defined data type
         * @throws { BusinessError } 13900041 - Quota exceeded
         * @throws { BusinessError } 13900042 - Unknown error
         * @throws { BusinessError } 14000001 - Invalid display name
         * @throws { BusinessError } 14000002 - Invalid uri
         * @throws { BusinessError } 14000003 - Invalid file extension
         * @throws { BusinessError } 14000004 - File has been put into trash bin
         * @throws { BusinessError } 14300001 - IPC error
         * @throws { BusinessError } 14300002 - Invalid uri
         * @throws { BusinessError } 14300003 - Fail to get fileextension info
         * @throws { BusinessError } 14300004 - Get wrong result
         */
        createFile(uri: string, displayName: string) : Promise<string>;
        createFile(uri: string, displayName: string, callback: AsyncCallback<string>) : void;

        /**
         * Create a Directory.
         *
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService
         * @StageModelOnly
         * @systemapi
         * @permission ohos.permission.FILE_ACCESS_MANAGER
         * @param parentUri Represents a specific parent directory.
         * @param displayName Indicates the new directory name.
         * @returns {(void | Promise<string>)} Returns the new directory's URI.
         * @throws { BusinessError } 13900001 - Operation not permitted
         * @throws { BusinessError } 13900002 - No such file or directory
         * @throws { BusinessError } 13900004 - Interrupted system call
         * @throws { BusinessError } 13900006 - No such device or address
         * @throws { BusinessError } 13900008 - Bad file descriptor
         * @throws { BusinessError } 13900011 - Out of memory
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900013 - Bad address
         * @throws { BusinessError } 13900014 - Device or resource busy
         * @throws { BusinessError } 13900015 - File exists
         * @throws { BusinessError } 13900017 - No such device
         * @throws { BusinessError } 13900018 - Not a directory
         * @throws { BusinessError } 13900019 - Is a directory
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 13900022 - Too many open files
         * @throws { BusinessError } 13900023 - Text file busy
         * @throws { BusinessError } 13900024 - File too large
         * @throws { BusinessError } 13900025 - No space left on device
         * @throws { BusinessError } 13900027 - Read-only file system
         * @throws { BusinessError } 13900029 - Resource deadlock would occur
         * @throws { BusinessError } 13900030 - File name too long
         * @throws { BusinessError } 13900033 - Too many symbolic links encountered
         * @throws { BusinessError } 13900034 - Operation would block
         * @throws { BusinessError } 13900038 - Value too large for defined data type
         * @throws { BusinessError } 13900041 - Quota exceeded
         * @throws { BusinessError } 13900042 - Unknown error
         * @throws { BusinessError } 14000001 - Invalid display name
         * @throws { BusinessError } 14000002 - Invalid uri
         * @throws { BusinessError } 14000003 - Invalid file extension
         * @throws { BusinessError } 14000004 - File has been put into trash bin
         * @throws { BusinessError } 14300001 - IPC error
         * @throws { BusinessError } 14300002 - Invalid uri
         * @throws { BusinessError } 14300003 - Fail to get fileextension info
         * @throws { BusinessError } 14300004 - Get wrong result
         */
        mkDir(parentUri: string, displayName: string) : Promise<string>;
        mkDir(parentUri: string, displayName: string, callback: AsyncCallback<string>) : void;

        /**
         * Delete a file or delete a directory recursively.
         *
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService
         * @StageModelOnly
         * @systemapi
         * @permission ohos.permission.FILE_ACCESS_MANAGER
         * @param uri Indicates the file or directory to be deleted.
         * @throws { BusinessError } 13900001 - Operation not permitted
         * @throws { BusinessError } 13900002 - No such file or directory
         * @throws { BusinessError } 13900004 - Interrupted system call
         * @throws { BusinessError } 13900006 - No such device or address
         * @throws { BusinessError } 13900008 - Bad file descriptor
         * @throws { BusinessError } 13900011 - Out of memory
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900013 - Bad address
         * @throws { BusinessError } 13900014 - Device or resource busy
         * @throws { BusinessError } 13900015 - File exists
         * @throws { BusinessError } 13900017 - No such device
         * @throws { BusinessError } 13900018 - Not a directory
         * @throws { BusinessError } 13900019 - Is a directory
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 13900022 - Too many open files
         * @throws { BusinessError } 13900023 - Text file busy
         * @throws { BusinessError } 13900024 - File too large
         * @throws { BusinessError } 13900025 - No space left on device
         * @throws { BusinessError } 13900027 - Read-only file system
         * @throws { BusinessError } 13900029 - Resource deadlock would occur
         * @throws { BusinessError } 13900030 - File name too long
         * @throws { BusinessError } 13900033 - Too many symbolic links encountered
         * @throws { BusinessError } 13900034 - Operation would block
         * @throws { BusinessError } 13900038 - Value too large for defined data type
         * @throws { BusinessError } 13900041 - Quota exceeded
         * @throws { BusinessError } 13900042 - Unknown error
         * @throws { BusinessError } 14000001 - Invalid display name
         * @throws { BusinessError } 14000002 - Invalid uri
         * @throws { BusinessError } 14000003 - Invalid file extension
         * @throws { BusinessError } 14000004 - File has been put into trash bin
         * @throws { BusinessError } 14300001 - IPC error
         * @throws { BusinessError } 14300002 - Invalid uri
         * @throws { BusinessError } 14300003 - Fail to get fileextension info
         * @throws { BusinessError } 14300004 - Get wrong result
         */
        delete(uri: string) : Promise<number>;
        delete(uri: string, callback: AsyncCallback<number>) : void;

        /**
         * Move a file or move a directory recursively.
         *
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService
         * @StageModelOnly
         * @systemapi
         * @permission ohos.permission.FILE_ACCESS_MANAGER
         * @param sourceFile Indicates the file or directory to be moved.
         * @param destFile Represents the destination folder.
         * @returns {(void | Promise<string>)} Returns the generated new file or directory.
         * @throws { BusinessError } 13900001 - Operation not permitted
         * @throws { BusinessError } 13900002 - No such file or directory
         * @throws { BusinessError } 13900004 - Interrupted system call
         * @throws { BusinessError } 13900006 - No such device or address
         * @throws { BusinessError } 13900008 - Bad file descriptor
         * @throws { BusinessError } 13900011 - Out of memory
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900013 - Bad address
         * @throws { BusinessError } 13900014 - Device or resource busy
         * @throws { BusinessError } 13900015 - File exists
         * @throws { BusinessError } 13900017 - No such device
         * @throws { BusinessError } 13900018 - Not a directory
         * @throws { BusinessError } 13900019 - Is a directory
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 13900022 - Too many open files
         * @throws { BusinessError } 13900023 - Text file busy
         * @throws { BusinessError } 13900024 - File too large
         * @throws { BusinessError } 13900025 - No space left on device
         * @throws { BusinessError } 13900027 - Read-only file system
         * @throws { BusinessError } 13900029 - Resource deadlock would occur
         * @throws { BusinessError } 13900030 - File name too long
         * @throws { BusinessError } 13900033 - Too many symbolic links encountered
         * @throws { BusinessError } 13900034 - Operation would block
         * @throws { BusinessError } 13900038 - Value too large for defined data type
         * @throws { BusinessError } 13900041 - Quota exceeded
         * @throws { BusinessError } 13900042 - Unknown error
         * @throws { BusinessError } 14000001 - Invalid display name
         * @throws { BusinessError } 14000002 - Invalid uri
         * @throws { BusinessError } 14000003 - Invalid file extension
         * @throws { BusinessError } 14000004 - File has been put into trash bin
         * @throws { BusinessError } 14300001 - IPC error
         * @throws { BusinessError } 14300002 - Invalid uri
         * @throws { BusinessError } 14300003 - Fail to get fileextension info
         * @throws { BusinessError } 14300004 - Get wrong result
         */
        move(sourceFile: string, destFile: string) : Promise<string>;
        move(sourceFile: string, destFile: string, callback: AsyncCallback<string>) : void;

        /**
         * Rename the selected file or directory.
         *
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService
         * @StageModelOnly
         * @systemapi
         * @permission ohos.permission.FILE_ACCESS_MANAGER
         * @param uri Indicates the selected file or directory.
         * @param displayName Indicates the new directory or file name.
         * @returns {(void | Promise<string>)} Returns a URI representing the new file or directory.
         * @throws { BusinessError } 13900001 - Operation not permitted
         * @throws { BusinessError } 13900002 - No such file or directory
         * @throws { BusinessError } 13900004 - Interrupted system call
         * @throws { BusinessError } 13900006 - No such device or address
         * @throws { BusinessError } 13900008 - Bad file descriptor
         * @throws { BusinessError } 13900011 - Out of memory
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900013 - Bad address
         * @throws { BusinessError } 13900014 - Device or resource busy
         * @throws { BusinessError } 13900015 - File exists
         * @throws { BusinessError } 13900017 - No such device
         * @throws { BusinessError } 13900018 - Not a directory
         * @throws { BusinessError } 13900019 - Is a directory
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 13900022 - Too many open files
         * @throws { BusinessError } 13900023 - Text file busy
         * @throws { BusinessError } 13900024 - File too large
         * @throws { BusinessError } 13900025 - No space left on device
         * @throws { BusinessError } 13900027 - Read-only file system
         * @throws { BusinessError } 13900029 - Resource deadlock would occur
         * @throws { BusinessError } 13900030 - File name too long
         * @throws { BusinessError } 13900033 - Too many symbolic links encountered
         * @throws { BusinessError } 13900034 - Operation would block
         * @throws { BusinessError } 13900038 - Value too large for defined data type
         * @throws { BusinessError } 13900041 - Quota exceeded
         * @throws { BusinessError } 13900042 - Unknown error
         * @throws { BusinessError } 14000001 - Invalid display name
         * @throws { BusinessError } 14000002 - Invalid uri
         * @throws { BusinessError } 14000003 - Invalid file extension
         * @throws { BusinessError } 14000004 - File has been put into trash bin
         * @throws { BusinessError } 14300001 - IPC error
         * @throws { BusinessError } 14300002 - Invalid uri
         * @throws { BusinessError } 14300003 - Fail to get fileextension info
         * @throws { BusinessError } 14300004 - Get wrong result
         */
        rename(uri: string, displayName: string) : Promise<string>;
        rename(uri: string, displayName: string, callback: AsyncCallback<string>) : void;

        /**
         * Obtain the status of a file or directory.
         *
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService
         * @StageModelOnly
         * @systemapi
         * @permission ohos.permission.FILE_ACCESS_MANAGER
         * @param uri Indicates the selected file or directory.
         * @returns {(void | Promise<boolean>)} Returns whether it exists.
         * @throws { BusinessError } 13900001 - Operation not permitted
         * @throws { BusinessError } 13900002 - No such file or directory
         * @throws { BusinessError } 13900004 - Interrupted system call
         * @throws { BusinessError } 13900006 - No such device or address
         * @throws { BusinessError } 13900008 - Bad file descriptor
         * @throws { BusinessError } 13900011 - Out of memory
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900013 - Bad address
         * @throws { BusinessError } 13900014 - Device or resource busy
         * @throws { BusinessError } 13900015 - File exists
         * @throws { BusinessError } 13900017 - No such device
         * @throws { BusinessError } 13900018 - Not a directory
         * @throws { BusinessError } 13900019 - Is a directory
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 13900022 - Too many open files
         * @throws { BusinessError } 13900023 - Text file busy
         * @throws { BusinessError } 13900024 - File too large
         * @throws { BusinessError } 13900025 - No space left on device
         * @throws { BusinessError } 13900027 - Read-only file system
         * @throws { BusinessError } 13900029 - Resource deadlock would occur
         * @throws { BusinessError } 13900030 - File name too long
         * @throws { BusinessError } 13900033 - Too many symbolic links encountered
         * @throws { BusinessError } 13900034 - Operation would block
         * @throws { BusinessError } 13900038 - Value too large for defined data type
         * @throws { BusinessError } 13900041 - Quota exceeded
         * @throws { BusinessError } 13900042 - Unknown error
         * @throws { BusinessError } 14000001 - Invalid display name
         * @throws { BusinessError } 14000002 - Invalid uri
         * @throws { BusinessError } 14000003 - Invalid file extension
         * @throws { BusinessError } 14000004 - File has been put into trash bin
         * @throws { BusinessError } 14300001 - IPC error
         * @throws { BusinessError } 14300002 - Invalid uri
         * @throws { BusinessError } 14300003 - Fail to get fileextension info
         * @throws { BusinessError } 14300004 - Get wrong result
         */
        access(sourceFileUri: string) : Promise<boolean>;
        access(sourceFileUri: string, callback: AsyncCallback<boolean>) : void;

        /**
         * Get a RootIterator.
         *
         * @since 9
         * @syscap SystemCapability.FileManagement.UserFileService
         * @StageModelOnly
         * @systemapi
         * @permission ohos.permission.FILE_ACCESS_MANAGER
         * @returns {(void | Promise<RootIterator>)} Returns a RootIterator.
         * @throws { BusinessError } 13900001 - Operation not permitted
         * @throws { BusinessError } 13900002 - No such file or directory
         * @throws { BusinessError } 13900004 - Interrupted system call
         * @throws { BusinessError } 13900006 - No such device or address
         * @throws { BusinessError } 13900008 - Bad file descriptor
         * @throws { BusinessError } 13900011 - Out of memory
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900013 - Bad address
         * @throws { BusinessError } 13900014 - Device or resource busy
         * @throws { BusinessError } 13900015 - File exists
         * @throws { BusinessError } 13900017 - No such device
         * @throws { BusinessError } 13900018 - Not a directory
         * @throws { BusinessError } 13900019 - Is a directory
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 13900022 - Too many open files
         * @throws { BusinessError } 13900023 - Text file busy
         * @throws { BusinessError } 13900024 - File too large
         * @throws { BusinessError } 13900025 - No space left on device
         * @throws { BusinessError } 13900027 - Read-only file system
         * @throws { BusinessError } 13900029 - Resource deadlock would occur
         * @throws { BusinessError } 13900030 - File name too long
         * @throws { BusinessError } 13900033 - Too many symbolic links encountered
         * @throws { BusinessError } 13900034 - Operation would block
         * @throws { BusinessError } 13900038 - Value too large for defined data type
         * @throws { BusinessError } 13900041 - Quota exceeded
         * @throws { BusinessError } 13900042 - Unknown error
         * @throws { BusinessError } 14000001 - Invalid display name
         * @throws { BusinessError } 14000002 - Invalid uri
         * @throws { BusinessError } 14000003 - Invalid file extension
         * @throws { BusinessError } 14000004 - File has been put into trash bin
         * @throws { BusinessError } 14300001 - IPC error
         * @throws { BusinessError } 14300002 - Invalid uri
         * @throws { BusinessError } 14300003 - Fail to get fileextension info
         * @throws { BusinessError } 14300004 - Get wrong result
         */
        getRoots(): Promise<RootIterator>;
        getRoots(callback:AsyncCallback<RootIterator>) : void;
    }
}

export default fileAccess;
