/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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

export default fileIo;

/**
 * FileIO
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare namespace fileIo {
    export { access };
    export { accessSync };
    export { close };
    export { closeSync };
    export { copyFile };
    export { copyFileSync };
    export { createStream };
    export { createStreamSync };
    export { fdatasync };
    export { fdatasyncSync };
    export { fdopenStream };
    export { fdopenStreamSync };
    export { fsync };
    export { fsyncSync };
    export { listFile };
    export { listFileSync };
    export { lstat };
    export { lstatSync };
    export { mkdir };
    export { mkdirSync };
    export { mkdtemp };
    export { mkdtempSync };
    export { moveFile }
    export { moveFileSync }
    export { open };
    export { openSync };
    export { read };
    export { readSync };
    export { readText };
    export { readTextSync };
    export { rename };
    export { renameSync };
    export { rmdir };
    export { rmdirSync };
    export { stat };
    export { statSync };
    export { symlink };
    export { symlinkSync };
    export { truncate };
    export { truncateSync };
    export { unlink };
    export { unlinkSync };
    export { write };
    export { writeSync };
    export { File };
    export { OpenMode };
    export { Stat };
    export { Stream };

    /**
     * Mode Indicates the open flags.
     * @since 9
     * @syscap SystemCapability.FileManagement.File.FileIO
     */
    namespace OpenMode  {
        const READ_ONLY = 0o0;              // Read only Permission
        const WRITE_ONLY = 0o1;             // Write only Permission
        const READ_WRITE = 0o2;             // Write and Read Permission
        const CREATE = 0o100;               // If not exist, create file
        const TRUNC = 0o1000;               // File truncate len 0
        const APPEND = 0o2000;              // File append write
        const NONBLOCK = 0o4000;            // File open in nonblocking mode
        const DIR = 0o200000;               // File is Dir
        const NOFOLLOW = 0o400000;          // File is not symbolic link
        const SYNC = 0o4010000;             // SYNC IO
    }
}

/**
 * Access file.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} path - path.
 * @param {AsyncCallback<boolean>} [callback] - callback.
 * @returns {void | Promise<boolean>} no callback return Promise otherwise return void
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900023  - Text file busy
 * @throws { BusinessError } 13900030  - File name too long
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function access(path: string): Promise<boolean>;
declare function access(path: string, callback: AsyncCallback<boolean>): void;

/**
 * Access file with sync interface.
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} path - path.
 * @returns {boolean} access success
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900023  - Text file busy
 * @throws { BusinessError } 13900030  - File name too long
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function accessSync(path: string): boolean;

/**
 * Close file or fd.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {number | File} file - file object or fd.
 * @param {AsyncCallback<void>} [callback] - callback.
 * @returns {void | Promise<void>} no callback return Promise otherwise return void
 * @throws { BusinessError } 13900004  - Interrupted system call
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function close(file: number | File): Promise<void>;
declare function close(file: number | File, callback: AsyncCallback<void>): void;

/**
 * Close file or fd with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @permission N/A
 * @param {number | File} file - file object or fd.
 * @returns {void} close success
 * @throws { BusinessError } 13900004  - Interrupted system call
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function closeSync(fd: number | File): void;

/**
 * Copy file.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string | number} src - src.
 * @param {string | number} dest - dest.
 * @param {number} [mode = 0] - mode.
 * @param {AsyncCallback<void>} [callback] - callback.
 * @returns {void | Promise<void>} no callback return Promise otherwise return void
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900004  - Interrupted system call
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900010  - Try again
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900019  - Is a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900030  - File name too long
 * @throws { BusinessError } 13900031  - Function not implemented
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900034  - Operation would block
 * @throws { BusinessError } 13900038  - Value too large for defined data type
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function copyFile(src: string | number, dest: string | number, mode?: number): Promise<void>;
declare function copyFile(src: string | number, dest: string | number, callback: AsyncCallback<void>): void;
declare function copyFile(src: string | number, dest: string | number, mode: number, callback: AsyncCallback<void>): void;

/**
 * Copy file with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string | number} src - src.
 * @param {string | number} dest - dest.
 * @param {number} [mode = 0] - mode.
 * @returns {void} copyFile success
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900004  - Interrupted system call
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900010  - Try again
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900019  - Is a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900030  - File name too long
 * @throws { BusinessError } 13900031  - Function not implemented
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900034  - Operation would block
 * @throws { BusinessError } 13900038  - Value too large for defined data type
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function copyFileSync(src: string | number, dest: string | number, mode?: number): void;

/**
 * Create class Stream.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} path - path.
 * @param {string} mode - mode.
 * @param {AsyncCallback<Stream>} [callback] - callback.
 * @returns {void | Promise<Stream>} no callback return Promise otherwise return Stream
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
 */
declare function createStream(path: string, mode: string): Promise<Stream>;
declare function createStream(path: string, mode: string, callback: AsyncCallback<Stream>): void;

/**
 * Create class Stream with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} path - path.
 * @param {string} mode - mode.
 * @returns {Stream} createStream
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
 */
declare function createStreamSync(path: string, mode: string): Stream;

/**
 * Synchronize file metadata.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {number} fd - fd.
 * @param {AsyncCallback<void>} [callback] - callback.
 * @returns {void | Promise<void>} no callback return Promise otherwise return void
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900027  - Read-only file system
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function fdatasync(fd: number): Promise<void>;
declare function fdatasync(fd: number, callback: AsyncCallback<void>): void;

/**
 * Synchronize file metadata with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {number} fd - fd.
 * @returns {void} fdatasync success
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900027  - Read-only file system
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function fdatasyncSync(fd: number): void;

/**
 * Create class Stream by using fd.
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {number} fd - fd.
 * @param {string} mode - mode.
 * @param {AsyncCallback<Stream>} [callback] - callback.
 * @returns {void | Promise<Stream>} no callback return Promise otherwise return void
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900004  - Interrupted system call
 * @throws { BusinessError } 13900006  - No such device or address
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900010  - Try again
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
 */
declare function fdopenStream(fd: number, mode: string): Promise<Stream>;
declare function fdopenStream(fd: number, mode: string, callback: AsyncCallback<Stream>): void;

/**
 * Create class Stream by using fd with sync interface.
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {number} fd - fd.
 * @param {string} mode - mode.
 * @returns {Stream} open stream from fd
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900004  - Interrupted system call
 * @throws { BusinessError } 13900006  - No such device or address
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900010  - Try again
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
  */
declare function fdopenStreamSync(fd: number, mode: string): Stream;

/**
 * Synchronize file.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {number} fd - fd.
 * @param {AsyncCallback<void>} [callback] - callback.
 * @returns {void | Promise<void>} no callback return Promise otherwise return void
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900027  - Read-only file system
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function fsync(fd: number): Promise<void>;
declare function fsync(fd: number, callback: AsyncCallback<void>): void;

/**
 * Synchronize file with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {number} fd - fd.
 * @returns {void} fsync success
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900027  - Read-only file system
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function fsyncSync(fd: number): void;

/**
 * List file.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} path - path.
 * @param {Object} [options] - options.
 * @param {boolean} [options.recursion = false] - whether to list recursively
 * @param {number} [options.listNum = 0] - the number of listing file.
 * @param {Filter} [options.filter] - file filter.
 * @returns {Promise<string[]>} return Promise
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function listFile(path: string, options?: {
    recursion?: boolean;
    listNum?: number;
    filter?: Filter;
}): Promise<string[]>;

/**
 * List file.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} path - path.
 * @param {Object} [options] - options.
 * @param {boolean} [options.recursion = false] - whether to list recursively
 * @param {number} [options.listNum = 0] - the number of listing file.
 * @param {Filter} [options.filter] - file filter.
 * @param {AsyncCallback<string[]>} callback - callback.
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function listFile(path: string, callback: AsyncCallback<string[]>): void;
declare function listFile(path: string, options: {
    recursion?: boolean;
    listNum?: number;
    filter?: Filter;
}, callback: AsyncCallback<string[]>): void;

/**
 * List file with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} path - path.
 * @param {Object} [options] - options.
 * @param {boolean} [options.recursion = false] - whether to list recursively
 * @param {number} [options.listNum = 0] - the number of listing file.
 * @param {Filter} [options.filter] - file filter.
 * @returns {string[]} array of file name
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function listFileSync(path: string, options?: {
    recursion?: boolean;
    listNum?: number;
    filter?: Filter;
}): string[];

/**
 * Stat link file.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} path - path.
 * @param {AsyncCallback<Stat>} [callback] - callback.
 * @returns {void | Promise<Stat>} no callback return Promise otherwise return void
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900030  - File name too long
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900038  - Value too large for defined data type
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function lstat(path: string): Promise<Stat>;
declare function lstat(path: string, callback: AsyncCallback<Stat>): void;

/**
 * Stat link file with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} path - path.
 * @returns {Stat} lstat success
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900030  - File name too long
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900038  - Value too large for defined data type
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function lstatSync(path: string): Stat;
 
/**
 * Make dir.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} path - path.
 * @param {AsyncCallback<void>} [callback] - callback.
 * @returns {void | Promise<void>} no callback return Promise otherwise return void
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900015  - File exists
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900028  - Too many links
 * @throws { BusinessError } 13900030  - File name too long
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function mkdir(path: string): Promise<void>;
declare function mkdir(path: string, callback: AsyncCallback<void>): void;

/**
 * Make dir with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} path - path.
 * @returns {void} mkdir success
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900015  - File exists
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900028  - Too many links
 * @throws { BusinessError } 13900030  - File name too long
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function mkdirSync(path: string): void;

/**
 * Make temp dir.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} prefix - dir prefix.
 * @param {AsyncCallback<string>} [callback] - callback.
 * @returns {void | Promise<string>} no callback return Promise otherwise return void
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900015  - File exists
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900028  - Too many links
 * @throws { BusinessError } 13900030  - File name too long
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function mkdtemp(prefix: string): Promise<string>;
declare function mkdtemp(prefix: string, callback: AsyncCallback<string>): void;

/**
 * Make temp dir with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} prefix - dir prefix.
 * @returns {string} directory name
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900015  - File exists
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900028  - Too many links
 * @throws { BusinessError } 13900030  - File name too long
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function mkdtempSync(prefix: string): string;

/**
 * Move file.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} src - source file path.
 * @param {string} dest - destination file path.
 * @param {number} [mode = 0] - move mode when duplicate file name exists.
 * @returns {Promise<void>} return Promise
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900014  - Device or resource busy
 * @throws { BusinessError } 13900015  - File exists
 * @throws { BusinessError } 13900015  - Cross-device link
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900019  - Is a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900027  - Read-only file system
 * @throws { BusinessError } 13900028  - Too many links
 * @throws { BusinessError } 13900032  - Directory not empty
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function moveFile(src: string, dest: string, mode?: number): Promise<void>;

/**
 * Move file.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} src - source file path.
 * @param {string} dest - destination file path.
 * @param {number} [mode = 0] - move mode when duplicate file name exists.
 * @param {AsyncCallback<void>} callback - callback.
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900014  - Device or resource busy
 * @throws { BusinessError } 13900015  - File exists
 * @throws { BusinessError } 13900015  - Cross-device link
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900019  - Is a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900027  - Read-only file system
 * @throws { BusinessError } 13900028  - Too many links
 * @throws { BusinessError } 13900032  - Directory not empty
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function moveFile(src: string, dest: string, callback: AsyncCallback<void>): void;
declare function moveFile(src: string, dest: string, mode: number, callback: AsyncCallback<void>): void;

/**
 * Move file with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} src - source file path.
 * @param {string} dest - destination file path.
 * @param {number} [mode = 0] - move mode when duplicate file name exists.
 * @returns {void} move success
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900014  - Device or resource busy
 * @throws { BusinessError } 13900015  - File exists
 * @throws { BusinessError } 13900015  - Cross-device link
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900019  - Is a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900027  - Read-only file system
 * @throws { BusinessError } 13900028  - Too many links
 * @throws { BusinessError } 13900032  - Directory not empty
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function moveFileSync(src: string, dest: string, mode?: number): void;

/**
 * Open file.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} path - path.
 * @param {number} [mode = OpenMode.READ_ONLY] - mode.
 * @param {AsyncCallback<File>} [callback] - callback.
 * @returns {void | Promise<File>} no callback return Promise otherwise return void
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
 */
declare function open(path: string, mode?: number): Promise<File>;
declare function open(path: string, callback: AsyncCallback<File>): void;
declare function open(path: string, mode: number, callback: AsyncCallback<File>): void;

/**
 * Open file with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} path - path.
 * @param {number} [mode = OpenMode.READ_ONLY] - mode.
 * @returns {File} open fd
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
 */
declare function openSync(path: string, mode?: number): File;

/**
 * Read file.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {number} fd - file descriptor.
 * @param {ArrayBuffer} buffer - file descriptor.
 * @param {Object} [options] - options.
 * @param {number} [options.offset = 0] - offset.
 * @param {number} [options.length = 0] - length.
 * @param {AsyncCallback<number>} [callback] - callback.
 * @returns {void | Promise<number>} no callback return Promise otherwise return void
 * @throws { BusinessError } 13900004  - Interrupted system call
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900010  - Try again
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900019  - Is a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900034  - Operation would block
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function read(fd: number, buffer: ArrayBuffer, options?: {
    offset?: number;
    length?: number;
}): Promise<number>;
declare function read(fd: number, buffer: ArrayBuffer, callback: AsyncCallback<number>): void;
declare function read(fd: number, buffer: ArrayBuffer, options: {
    offset?: number;
    length?: number;
}, callback: AsyncCallback<number>): void;

/**
 * Read file with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {number} fd - file descriptor.
 * @param {ArrayBuffer} buffer - file descriptor.
 * @param {Object} [options] - options.
 * @param {number} [options.offset = 0] - offset.
 * @param {number} [options.length = 0] - length.
 * @returns {number} number of bytesRead
 * @throws { BusinessError } 13900004  - Interrupted system call
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900010  - Try again
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900019  - Is a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900034  - Operation would block
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function readSync(fd: number, buffer: ArrayBuffer, options?: {
    offset?: number;
    length?: number;
}): number;

/**
 * Read text.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} filePath - file path.
 * @param {Object} [options] - options.
 * @param {number} [options.offset = 0] - offset in bytes.
 * @param {number} [options.length = 0] - length in bytes.
 * @param {number} [options.encoding = 'utf-8'] - encoding.
 * @param {AsyncCallback<string>} [callback] - callback.
 * @returns {void | Promise<string>} no callback return Promise otherwise return void
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900004  - Interrupted system call
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900010  - Try again
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900019  - Is a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900024  - File too large
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900034  - Operation would block
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */

declare function readText(filePath: string, options?: {
    offset?: number;
    length?: number;
    encoding?: string;
}): Promise<string>;
declare function readText(filePath: string, callback: AsyncCallback<string>): void;
declare function readText(filePath: string, options: {
    offset?: number;
    length?: number;
    encoding?: string;
}, callback: AsyncCallback<string>): void;

/**
 * Read text with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} filePath - file path.
 * @param {Object} [options] - options.
 * @param {number} [options.offset = 0] - offset in bytes.
 * @param {number} [options.length = 0] - length in bytes.
 * @param {number} [options.encoding = 'utf-8'] - encoding.
 * @returns {string} readout result
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900004  - Interrupted system call
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900010  - Try again
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900019  - Is a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900024  - File too large
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900034  - Operation would block
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function readTextSync(filePath: string, options?: {
    offset?: number;
    length?: number;
    encoding?: string;
}): string;

/**
 * Rename file.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} oldPath - oldPath.
 * @param {string} newPath - newPath.
 * @param {AsyncCallback<void>} [callback] - callback.
 * @returns {void | Promise<void>} no callback return Promise otherwise return void
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900014  - Device or resource busy
 * @throws { BusinessError } 13900015  - File exists
 * @throws { BusinessError } 13900015  - Cross-device link
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900019  - Is a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900027  - Read-only file system
 * @throws { BusinessError } 13900028  - Too many links
 * @throws { BusinessError } 13900032  - Directory not empty
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function rename(oldPath: string, newPath: string): Promise<void>;
declare function rename(oldPath: string, newPath: string, callback: AsyncCallback<void>): void;

/**
 * Rename file with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} oldPath - oldPath.
 * @param {string} newPath - newPath.
 * @returns {void} rename success
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900014  - Device or resource busy
 * @throws { BusinessError } 13900015  - File exists
 * @throws { BusinessError } 13900015  - Cross-device link
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900019  - Is a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900027  - Read-only file system
 * @throws { BusinessError } 13900028  - Too many links
 * @throws { BusinessError } 13900032  - Directory not empty
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
  */
declare function renameSync(oldPath: string, newPath: string): void;

/**
 * Delete dir.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} path - path.
 * @param {AsyncCallback<void>} [callback] - callback.
 * @returns {void | Promise<void>} no callback return Promise otherwise return void
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900014  - Device or resource busy
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900027  - Read-only file system1
 * @throws { BusinessError } 13900030  - File name too long
 * @throws { BusinessError } 13900032  - Directory not empty
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function rmdir(path: string): Promise<void>;
declare function rmdir(path: string, callback: AsyncCallback<void>): void;

/**
 * Delete dir with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} path - path.
 * @returns {void} rmdir success
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900014  - Device or resource busy
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900027  - Read-only file system1
 * @throws { BusinessError } 13900030  - File name too long
 * @throws { BusinessError } 13900032  - Directory not empty
 * @throws { BusinessError } 13900042  - Unknown error
  */
declare function rmdirSync(path: string): void;

/**
 * Get file information.
 * @static
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string | number} file - path or file descriptor.
 * @param {AsyncCallback<Stat>} [callback] - callback.
 * @returns {void | Promise<Stat>} no callback return Promise otherwise return void
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
declare function stat(file: string | number): Promise<Stat>;
declare function stat(file: string | number, callback: AsyncCallback<Stat>): void;

/**
 * Get file information with sync interface.
 * @static
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string | number} file - path or file descriptor.
 * @returns {Stat} stat success
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
declare function statSync(file: string | number): Stat;

/**
 * Link file.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} target - target.
 * @param {string} srcPath - srcPath.
 * @param {AsyncCallback<void>} [callback] - callback.
 * @returns {void | Promise<void>} no callback return Promise otherwise return void
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900015  - File exists
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900027  - Read-only file system
 * @throws { BusinessError } 13900030  - File name too long
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function symlink(target: string, srcPath: string): Promise<void>;
declare function symlink(target: string, srcPath: string, callback: AsyncCallback<void>): void;

/**
 * Link file with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} target - target.
 * @param {string} srcPath - srcPath.
 * @returns {void} symlink success
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900015  - File exists
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900027  - Read-only file system
 * @throws { BusinessError } 13900030  - File name too long
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
  */
declare function symlinkSync(target: string, srcPath: string): void;

/**
 * Truncate file.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string | number} file - path or file descriptor.
 * @param {number} [len = 0] - len.
 * @param {AsyncCallback<void>} [callback] - callback.
 * @returns {void | Promise<void>} no callback return Promise otherwise return void
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900004  - Interrupted system call
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900019  - Is a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900023  - Text file busy
 * @throws { BusinessError } 13900024  - File too large
 * @throws { BusinessError } 13900027  - Read-only file system
 * @throws { BusinessError } 13900030  - File name too long
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function truncate(file: string | number, len?: number): Promise<void>;
declare function truncate(file: string | number, callback: AsyncCallback<void>): void;
declare function truncate(file: string | number, len: number, callback: AsyncCallback<void>): void;

/**
 * Truncate file with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string | number} file - path or file descriptor.
 * @param {number} [len = 0] - len.
 * @returns {void} truncate success
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900004  - Interrupted system call
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900019  - Is a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900023  - Text file busy
 * @throws { BusinessError } 13900024  - File too large
 * @throws { BusinessError } 13900027  - Read-only file system
 * @throws { BusinessError } 13900030  - File name too long
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function truncateSync(file: string | number, len?: number): void;

/**
 * Delete file.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} path - path.
 * @param {AsyncCallback<void>} [callback] - callback.
 * @returns {void | Promise<void>} no callback return Promise otherwise return void
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900014  - Device or resource busy
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900019  - Is a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900027  - Read-only file system
 * @throws { BusinessError } 13900030  - File name too long
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function unlink(path: string): Promise<void>;
declare function unlink(path: string, callback: AsyncCallback<void>): void;

/**
 * Delete file with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {string} path - path.
 * @returns {void} unlink success
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900002  - No such file or directory
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900011  - Out of memory
 * @throws { BusinessError } 13900012  - Permission denied
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900014  - Device or resource busy
 * @throws { BusinessError } 13900018  - Not a directory
 * @throws { BusinessError } 13900019  - Is a directory
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900027  - Read-only file system
 * @throws { BusinessError } 13900030  - File name too long
 * @throws { BusinessError } 13900033  - Too many symbolic links encountered
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function unlinkSync(path: string): void;

/**
 * Write file.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {number} fd - file descriptor.
 * @param {ArrayBuffer | string} buffer - file descriptor.
 * @param {Object} [options] - options.
 * @param {number} [options.offset = 0] - offset.
 * @param {number} [options.length = 0] - length.
 * @param {string} [options.encoding = 'utf-8'] - encoding.
 * @param {AsyncCallback<number>} [callback] - callback.
 * @returns {void | Promise<number>} no callback return Promise otherwise return void
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900004  - Interrupted system call
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900010  - Try again
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900024  - File too large
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900034  - Operation would block
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function write(fd: number, buffer: ArrayBuffer | string, options?: {
    offset?: number;
    length?: number;
    encoding?: string;
}): Promise<number>;
declare function write(fd: number, buffer: ArrayBuffer | string, callback: AsyncCallback<number>): void;
declare function write(fd: number, buffer: ArrayBuffer | string, options: {
    offset?: number;
    length?: number;
    encoding?: string;
}, callback: AsyncCallback<number>): void;

/**
 * Write file with sync interface.
 *
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 * @param {number} fd - file descriptor.
 * @param {ArrayBuffer | string} buffer - file descriptor.
 * @param {Object} [options] - options.
 * @param {number} [options.offset = 0] - offset.
 * @param {number} [options.length = 0] - length.
 * @param {string} [options.encoding = 'utf-8'] -  encoding.
 * @returns {number} on success number of bytesRead
 * @throws { BusinessError } 13900001  - Operation not permitted
 * @throws { BusinessError } 13900004  - Interrupted system call
 * @throws { BusinessError } 13900005  - I/O error
 * @throws { BusinessError } 13900008  - Bad file descriptor
 * @throws { BusinessError } 13900010  - Try again
 * @throws { BusinessError } 13900013  - Bad address
 * @throws { BusinessError } 13900020  - Invalid argument
 * @throws { BusinessError } 13900024  - File too large
 * @throws { BusinessError } 13900025  - No space left on device
 * @throws { BusinessError } 13900034  - Operation would block
 * @throws { BusinessError } 13900041  - Quota exceeded
 * @throws { BusinessError } 13900042  - Unknown error
 */
declare function writeSync(fd: number, buffer: ArrayBuffer | string, options?: {
    offset?: number;
    length?: number;
    encoding?: string;
}): number;

/**
 * File object.
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare interface File {
    /**
     * @type {number}
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @readonly
     */
    readonly fd: number;

    /**
     * Lock file with blocking method.
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @param {boolean} exclusive - whether lock is exclusive.
     * @returns {Promise<void>} return Promise
     * @throws { BusinessError } 13900004  - Interrupted system call
     * @throws { BusinessError } 13900008  - Bad file descriptor
     * @throws { BusinessError } 13900020  - Invalid argument
     * @throws { BusinessError } 13900034  - Operation would block
     * @throws { BusinessError } 13900042  - Unknown error
     * @throws { BusinessError } 13900043  - No record locks available
     */
    lock(exclusive?: boolean): Promise<void>;

    /**
     * Lock file with blocking method.
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @param {boolean} exclusive - whether lock is exclusive.
     * @param {AsyncCallback<void>} callback - callback.
     * @throws { BusinessError } 13900004  - Interrupted system call
     * @throws { BusinessError } 13900008  - Bad file descriptor
     * @throws { BusinessError } 13900020  - Invalid argument
     * @throws { BusinessError } 13900034  - Operation would block
     * @throws { BusinessError } 13900042  - Unknown error
     * @throws { BusinessError } 13900043  - No record locks available
     */
    lock(callback: AsyncCallback<void>): void;
    lock(exclusive: boolean, callback: AsyncCallback<void>): void;

    /**
     * Try to lock file with returning results immediately.
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @param {boolean} exclusive - whether lock is exclusive.
     * @returns {void} tryLock success
     * @throws { BusinessError } 13900004  - Interrupted system call
     * @throws { BusinessError } 13900008  - Bad file descriptor
     * @throws { BusinessError } 13900020  - Invalid argument
     * @throws { BusinessError } 13900034  - Operation would block
     * @throws { BusinessError } 13900042  - Unknown error
     * @throws { BusinessError } 13900043  - No record locks available
     */
    tryLock(exclusive?: boolean): void;

    /**
     * Unlock file.
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @returns {void} unlock success
     * @throws { BusinessError } 13900004  - Interrupted system call
     * @throws { BusinessError } 13900008  - Bad file descriptor
     * @throws { BusinessError } 13900020  - Invalid argument
     * @throws { BusinessError } 13900034  - Operation would block
     * @throws { BusinessError } 13900042  - Unknown error
     * @throws { BusinessError } 13900043  - No record locks available
     */
    unlock(): void;
}
/**
 * Stat object.
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare interface Stat {
    /**
     * @type {number}
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @readonly
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900042  - Unknown error
     */
    readonly ino: bigint;
    /**
     * @type {bigint}
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @readonly
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900042  - Unknown error
     */
    readonly mode: number;
    /**
     * @type {number}
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @readonly
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900042  - Unknown error
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900042  - Unknown error
     */
    readonly uid: number;
    /**
     * @type {number}
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @readonly
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900042  - Unknown error
     */
    readonly gid: number;
    /**
     * @type {number}
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @readonly
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900042  - Unknown error
     */
    readonly size: number;
    /**
     * @type {number}
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @readonly
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900042  - Unknown error
     */
    readonly atime: number;
    /**
     * @type {number}
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @readonly
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900042  - Unknown error
     */
    readonly mtime: number;
    /**
     * @type {number}
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @readonly
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900042  - Unknown error
     */
    readonly ctime: number;
    /**
     * Whether path/fd is block device.
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @returns {boolean} is or not
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900042  - Unknown error
     */
    isBlockDevice(): boolean;
    /**
     * Whether path/fd is character device.
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @returns {boolean} is or not
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900042  - Unknown error
     */
    isCharacterDevice(): boolean;
    /**
     * Whether path/fd is directory.
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @returns {boolean} is or not
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900042  - Unknown error
     */
    isDirectory(): boolean;
    /**
     * Whether path/fd is fifo.
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @returns {boolean} is or not
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900042  - Unknown error
     */
    isFIFO(): boolean;
    /**
     * Whether path/fd is file.
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @returns {boolean} is or not
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900042  - Unknown error
     */
    isFile(): boolean;
    /**
     * Whether path/fd is socket.
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @returns {boolean} is or not
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900042  - Unknown error
     */
    isSocket(): boolean;
    /**
     * Whether path/fd is symbolic link.
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @returns {boolean} is or not
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900042  - Unknown error
     */
    isSymbolicLink(): boolean;
}

/**
 * Stream object
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare interface Stream {
    /**
     * Close stream.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @param {AsyncCallback<void>} [callback] - callback.
     * @returns {void | Promise<void>} close success
     * @throws { BusinessError } 13900004  - Interrupted system call
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900008  - Bad file descriptor
     * @throws { BusinessError } 13900025  - No space left on device
     * @throws { BusinessError } 13900041  - Quota exceeded
     * @throws { BusinessError } 13900042  - Unknown error
     * 
     */
    close(): Promise<void>;
    close(callback: AsyncCallback<void>): void;

    /**
     * Close stream with sync interface.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @returns {void} close success
     * @throws { BusinessError } 13900004  - Interrupted system call
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900008  - Bad file descriptor
     * @throws { BusinessError } 13900025  - No space left on device
     * @throws { BusinessError } 13900041  - Quota exceeded
     * @throws { BusinessError } 13900042  - Unknown error
     */
    closeSync(): void;
    /**
     * Flush stream.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @param {AsyncCallback<void>} [callback] - callback.
     * @returns {void | Promise<void>} no callback return Promise otherwise return void
     * @throws { BusinessError } 13900001  - Operation not permitted
     * @throws { BusinessError } 13900004  - Interrupted system call
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900008  - Bad file descriptor
     * @throws { BusinessError } 13900010  - Try again
     * @throws { BusinessError } 13900013  - Bad address
     * @throws { BusinessError } 13900020  - Invalid argument
     * @throws { BusinessError } 13900024  - File too large
     * @throws { BusinessError } 13900025  - No space left on device
     * @throws { BusinessError } 13900034  - Operation would block
     * @throws { BusinessError } 13900041  - Quota exceeded
     * @throws { BusinessError } 13900042  - Unknown error
     */
    flush(): Promise<void>;
    flush(callback: AsyncCallback<void>): void;
    /**
     * Flush stream with sync interface.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @returns {void} flush success
     * @throws { BusinessError } 13900001  - Operation not permitted
     * @throws { BusinessError } 13900004  - Interrupted system call
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900008  - Bad file descriptor
     * @throws { BusinessError } 13900010  - Try again
     * @throws { BusinessError } 13900013  - Bad address
     * @throws { BusinessError } 13900020  - Invalid argument
     * @throws { BusinessError } 13900024  - File too large
     * @throws { BusinessError } 13900025  - No space left on device
     * @throws { BusinessError } 13900034  - Operation would block
     * @throws { BusinessError } 13900041  - Quota exceeded
     * @throws { BusinessError } 13900042  - Unknown error
     */
    flushSync(): void;
    /**
     * Write stream.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @param {ArrayBuffer | string} buffer - file description.
     * @param {Object} [options] - options.
     * @param {number} [options.length = 0] - length(bytes) ignored when buffer is string.
     * @param {number} [options.offset = 0] - offset(bytes) where start to write < 0 use read, else use pread.
     * @param {string} [options.encoding = 'utf-8'] -  encoding.
     * @param {AsyncCallback<number>} [callback] - callback.
     * @returns {void | Promise<number>} no callback return Promise otherwise return void
     * @throws { BusinessError } 13900001  - Operation not permitted
     * @throws { BusinessError } 13900004  - Interrupted system call
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900008  - Bad file descriptor
     * @throws { BusinessError } 13900010  - Try again
     * @throws { BusinessError } 13900013  - Bad address
     * @throws { BusinessError } 13900020  - Invalid argument
     * @throws { BusinessError } 13900024  - File too large
     * @throws { BusinessError } 13900025  - No space left on device
     * @throws { BusinessError } 13900034  - Operation would block
     * @throws { BusinessError } 13900041  - Quota exceeded
     * @throws { BusinessError } 13900042  - Unknown error
     */
    write(buffer: ArrayBuffer | string, options?: {
        offset?: number;
        length?: number;
        encoding?: string;
    }): Promise<number>;
    write(buffer: ArrayBuffer | string, callback: AsyncCallback<number>): void;
    write(buffer: ArrayBuffer | string, options: {
        offset?: number;
        length?: number;
        encoding?: string;
    }, callback: AsyncCallback<number>): void;
    /**
     * Write stream with sync interface.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @param {ArrayBuffer | string} buffer - file description.
     * @param {Object} [options] - options.
     * @param {number} [options.length = 0] - length(bytes) ignored when buffer is string.
     * @param {number} [options.offset = 0] - offset(bytes) where start to write < 0 use read, else use pread.
     * @param {string} [options.encoding = 'utf-8'] -  encoding.
     * @returns {number} on success number of bytes written
     * @throws { BusinessError } 13900001  - Operation not permitted
     * @throws { BusinessError } 13900004  - Interrupted system call
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900008  - Bad file descriptor
     * @throws { BusinessError } 13900010  - Try again
     * @throws { BusinessError } 13900013  - Bad address
     * @throws { BusinessError } 13900020  - Invalid argument
     * @throws { BusinessError } 13900024  - File too large
     * @throws { BusinessError } 13900025  - No space left on device
     * @throws { BusinessError } 13900034  - Operation would block
     * @throws { BusinessError } 13900041  - Quota exceeded
     * @throws { BusinessError } 13900042  - Unknown error
     */
    writeSync(buffer: ArrayBuffer | string, options?: {
        offset?: number;
        length?: number;
        encoding?: string;
    }): number;
    /**
     * Read stream.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @param {ArrayBuffer} buffer - file description.
     * @param {Object} [options] - options.
     * @param {number} [options.offset = 0] - offset.
     * @param {number} [options.length = 0] - length.
     * @param {AsyncCallback<number>} [callback] - callback.
     * @returns {void | Promise<number>} no callback return Promise otherwise return void
     * @throws { BusinessError } 13900004  - Interrupted system call
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900008  - Bad file descriptor
     * @throws { BusinessError } 13900010  - Try again
     * @throws { BusinessError } 13900013  - Bad address
     * @throws { BusinessError } 13900019  - Is a directory
     * @throws { BusinessError } 13900020  - Invalid argument
     * @throws { BusinessError } 13900034  - Operation would block
     * @throws { BusinessError } 13900042  - Unknown error
     */
    read(buffer: ArrayBuffer, options?: {
        offset?: number;
        length?: number;
    }): Promise<number>;
    read(buffer: ArrayBuffer, callback: AsyncCallback<number>): void;
    read(buffer: ArrayBuffer, options: {
        offset?: number;
        length?: number;
    }, callback: AsyncCallback<number>): void;

    /**
     * Read stream with sync interface.
     *
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     * @param {ArrayBuffer} buffer - file description.
     * @param {Object} [options] - options.
     * @param {number} [options.offset = 0] - offset.
     * @param {number} [options.length = 0] - length.
     * @returns {number} number of bytesRead
     * @throws { BusinessError } 13900004  - Interrupted system call
     * @throws { BusinessError } 13900005  - I/O error
     * @throws { BusinessError } 13900008  - Bad file descriptor
     * @throws { BusinessError } 13900010  - Try again
     * @throws { BusinessError } 13900013  - Bad address
     * @throws { BusinessError } 13900019  - Is a directory
     * @throws { BusinessError } 13900020  - Invalid argument
     * @throws { BusinessError } 13900034  - Operation would block
     * @throws { BusinessError } 13900042  - Unknown error
     */
    readSync(buffer: ArrayBuffer, options?: {
        offset?: number;
        length?: number;
    }): number;
}

/**
 * File filter type 
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
export type Filter = {
    /**
     * @type {Array<string>}
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @systemapi
     * @since 9
     * @readonly
     */
    suffix?: Array<string>;
    /**
     * @type {Array<string>}
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @systemapi
     * @since 9
     * @readonly
     */
    displayName?: Array<string>;
    /**
     * @type {Array<string>}
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @systemapi
     * @since 9
     * @readonly
     */
    mimeType?: Array<string>;
    /**
     * @type {number}
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @systemapi
     * @since 9
     * @readonly
     */
    fileSizeOver?: number;
    /**
     * @type {number}
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @systemapi
     * @since 9
     * @readonly
     */
    lastModifiedAfter?: number;
    /**
     * @type {boolean}
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @systemapi
     * @since 9
     * @readonly
     */
    excludeMedia?: boolean;
}
