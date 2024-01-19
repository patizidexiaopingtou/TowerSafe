/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (The type of "License");
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
 * The Buffer class is a global type for dealing with binary data directly. It can be constructed in a variety of ways.
 * @since 
 * @syscap SystemCapability.Utils.Lang
 * @permission N/A
 */
declare namespace buffer {

    type BufferEncoding = 'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'base64url' | 'latin1' | 'binary' | 'hex';

    interface TypedArray extends Int8Array {}
    /**
     * Allocates a new Buffer for a fixed size bytes. If fill is undefined, the Buffer will be zero-filled.
     * @since 9
     * @syscap SystemCapability.Utils.Lang
     * @param size The desired length of the new Buffer
     * @param [fill=0] A value to pre-fill the new Buffer with
     * @param [encoding='utf8']  If `fill` is a string, this is its encoding
     * @returns Return a new allocated Buffer
     * @throws {BusinessError} 401 - if the input parameters are invalid.
     */
    function alloc(size: number, fill?: string | Buffer | number, encoding?: BufferEncoding): Buffer;

    /**
     * Allocates a new Buffer for a fixed size bytes. The Buffer will not be initially filled.
     * @since 9
     * @syscap SystemCapability.Utils.Lang
     * @param size The desired length of the new Buffer
     * @returns Return a new allocated Buffer
     * @throws {BusinessError} 401 - if the input parameters are invalid.
     */
    function allocUninitializedFromPool(size: number): Buffer;
 
    /**
     * Allocates a new un-pooled Buffer for a fixed size bytes. The Buffer will not be initially filled.
     * @since 9
     * @syscap SystemCapability.Utils.Lang
     * @param size The desired length of the new Buffer
     * @returns Return a new allocated Buffer
     * @throws {BusinessError} 401 - if the input parameters are invalid.
     */
    function allocUninitialized(size: number): Buffer;
 
    /**
     * Returns the byte length of a string when encoded using `encoding`.
     * This is not the same as [`String.prototype.length`], which does not account
     * for the encoding that is used to convert the string into bytes.
     * @since 9
     * @syscap SystemCapability.Utils.Lang
     * @param string A value to calculate the length of
     * @param [encoding='utf8'] If `string` is a string, this is its encoding
     * @returns The number of bytes contained within `string`
     * @throws {BusinessError} 401 - if the input parameters are invalid.
     */
    function byteLength(string: string | Buffer | TypedArray | DataView | ArrayBuffer | SharedArrayBuffer, encoding?: BufferEncoding): number;
 
    /**
     * Returns a new `Buffer` which is the result of concatenating all the `Buffer`instances in the `list` together.
     * @since 9
     * @syscap SystemCapability.Utils.Lang
     * @param list List of `Buffer` or Uint8Array instances to concatenate
     * @param totalLength Total length of the `Buffer` instances in `list` when concatenated
     * @returns Return a new allocated Buffer
     * @throws {BusinessError} 401 - if the input parameters are invalid.
     * @throws {BusinessError} 10200001 - The value of "length" is out of range. It must be >= 0 and <= uint32 max. Received value is: [length] 
     */
    function concat(list: Buffer[] | Uint8Array[], totalLength?: number): Buffer;

    /**
     * Allocates a new Buffer using an array of bytes in the range 0 – 255. Array entries outside that range will be truncated to fit into it.
     * @since 9
     * @syscap SystemCapability.Utils.Lang
     * @param array an array of bytes in the range 0 – 255
     * @returns Return a new allocated Buffer
     * @throws {BusinessError} 401 - if the input parameters are invalid.
     */
    function from(array: number[]): Buffer;

    /**
     * This creates a view of the ArrayBuffer without copying the underlying memory. 
     * @since 9
     * @syscap SystemCapability.Utils.Lang
     * @param arrayBuffer An ArrayBuffer, SharedArrayBuffer, for example the .buffer property of a TypedArray.
     * @param [byteOffset = 0] Index of first byte to expose
     * @param [length = arrayBuffer.byteLength - byteOffset] Number of bytes to expose
     * @returns Return a view of the ArrayBuffer
     * @throws {BusinessError} 401 - if the input parameters are invalid.
     * @throws {BusinessError} 10200001 - The value of "[byteOffset/length]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [byteOffset/length]
     */
    function from(arrayBuffer: ArrayBuffer | SharedArrayBuffer, byteOffset?: number, length?: number): Buffer;

    /**
     * Copies the passed buffer data onto a new Buffer instance.
     * @since 9
     * @syscap SystemCapability.Utils.Lang
     * @param buffer An existing Buffer or Uint8Array from which to copy data
     * @returns Return a new allocated Buffer
     * @throws {BusinessError} 401 - if the input parameters are invalid.
     */
    function from(buffer: Buffer | Uint8Array): Buffer;

    /**
     * For the object whose value returned by valueof() function is strictly equal to object
     * or supports symbol To primitive object, a new buffer instance is created.
     * @since 9
     * @syscap SystemCapability.Utils.Lang
     * @param object An object supporting Symbol.toPrimitive or valueOf()
     * @param offsetOrEncoding A byte-offset or encoding
     * @param length A length
     * @returns Return a new allocated Buffer
     * @throws {BusinessError} 401 - if the input parameters are invalid.
     */
    function from(object: Object, offsetOrEncoding: number | string, length: number): Buffer;
    
    /**
     * Creates a new Buffer containing string. The encoding parameter identifies the character encoding
     * to be used when converting string into bytes.
     * @since 9
     * @syscap SystemCapability.Utils.Lang
     * @param string  A string to encode
     * @param [encoding='utf8'] The encoding of string
     * @returns Return a new Buffer containing string
     * @throws {BusinessError} 401 - if the input parameters are invalid.
     */
    function from(string: String, encoding?: BufferEncoding): Buffer;

    /**
     * Returns true if obj is a Buffer, false otherwise
     * @since 9
     * @syscap SystemCapability.Utils.Lang
     * @param obj Objects to be judged
     * @returns true or false
     */
    function isBuffer(obj: Object): boolean;

    /**
     * Returns true if encoding is the name of a supported character encoding, or false otherwise.
     * @since 9
     * @syscap SystemCapability.Utils.Lang
     * @param encoding A character encoding name to check
     * @returns true or false
     */
    function isEncoding(encoding: string):boolean;

    /**
     * Compares buf1 to buf2
     * @since 9
     * @syscap SystemCapability.Utils.Lang
     * @param buf1 A Buffer or Uint8Array instance.
     * @param buf2 A Buffer or Uint8Array instance.
     * @returns 0 is returned if target is the same as buf
     *         1 is returned if target should come before buf when sorted.
     *        -1 is returned if target should come after buf when sorted.
     * @throws {BusinessError} 401 - if the input parameters are invalid.
     */
    function compare(buf1: Buffer | Uint8Array, buf2: Buffer | Uint8Array): -1 | 0 | 1;

    /**
     * Re-encodes the given Buffer or Uint8Array instance from one character encoding to another.
     * @since 9
     * @syscap SystemCapability.Utils.Lang 
     * @param source A Buffer or Uint8Array instance.
     * @param fromEnc The current encoding
     * @param toEnc To target encoding
     * @returns Returns a new Buffer instance
     * @throws {BusinessError} 401 - if the input parameters are invalid.
     */
    function transcode(source: Buffer | Uint8Array, fromEnc: string, toEnc: string): Buffer;



    class Buffer {

        /**
         * Returns the number of bytes in buf
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
	 * @throws {BusinessError} 10200013 - Cannot set property length of Buffer which has only a getter
         */
        length: number;

        /**
         * The underlying ArrayBuffer object based on which this Buffer object is created.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
	 * @throws {BusinessError} 10200013 - Cannot set property buffer of Buffer which has only a getter
         */
        buffer: ArrayBuffer;

        /**
         * The byteOffset of the Buffers underlying ArrayBuffer object
         * @since 9
         * @syscap SystemCapability.Utils.Lang
	 * @throws {BusinessError} 10200013 - Cannot set property byteOffset of Buffer which has only a getter
         */
        byteOffset: number;

        /**
         * Fills buf with the specified value. If the offset and end are not given, the entire buf will be filled.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value The value with which to fill buf
         * @param [offset = 0] Number of bytes to skip before starting to fill buf
         * @param [end = buf.length] Where to stop filling buf (not inclusive)
         * @param [encoding='utf8'] The encoding for value if value is a string
         * @returns A reference to buf
         * @throws {BusinessError} 10200001 - The value of "[offset/end]" is out of range. It must be >= 0 and <= [right range]. Received value is: [offset/end]
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         */
        fill(value: string | Buffer | Uint8Array | number, offset?: number, end?: number, encoding?: BufferEncoding): Buffer;

        /**
         * Compares buf with target and returns a number indicating whether buf comes before, after,
         * or is the same as target in sort order. Comparison is based on the actual sequence of bytes in each Buffer.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param target A Buffer or Uint8Array with which to compare buf
         * @param [targetStart = 0] The offset within target at which to begin comparison
         * @param [targetEnd = target.length] The offset within target at which to end comparison (not inclusive)
         * @param [sourceStart = 0] The offset within buf at which to begin comparison
         * @param [sourceEnd = buf.length] The offset within buf at which to end comparison (not inclusive)
         * @returns 0 is returned if target is the same as buf
         *         1 is returned if target should come before buf when sorted.
         *        -1 is returned if target should come after buf when sorted.
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[targetStart/targetEnd/sourceStart/sourceEnd]" is out of range.
         *         It must be >= 0 and <= [right range]. Received value is: [targetStart/targetEnd/sourceStart/sourceEnd]
         */
        compare(target: Buffer | Uint8Array, targetStart?: number, targetEnd?: number, sourceStart?: number, sourceEnd?: number): -1 | 0 | 1;

        /**
         * Copies data from a region of buf to a region in target, even if the target memory region overlaps with buf.
         * If sourceEnd is greater than the length of the target, the length of the target shall prevail, and the extra part will not be overwritten.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param target A Buffer or Uint8Array to copy into
         * @param [targetStart = 0] The offset within target at which to begin writing
         * @param [sourceStart = 0] The offset within buf from which to begin copying
         * @param [sourceEnd = buf.length] The offset within buf at which to stop copying (not inclusive)
         * @returns The number of bytes copied
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[targetStart/sourceStart/sourceEnd]" is out of range. It must be >= 0. 
         *                                    Received value is: [targetStart/sourceStart/sourceEnd]
         */
        copy(target: Buffer | Uint8Array, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;

        /**
         * Returns true if both buf and otherBuffer have exactly the same bytes, false otherwise
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param otherBuffer A Buffer or Uint8Array with which to compare buf
         * @returns true or false
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         */
        equals(otherBuffer: Uint8Array | Buffer): boolean;

        /**
         * Returns true if value was found in buf, false otherwise
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param value What to search for
         * @param [byteOffset = 0] Where to begin searching in buf. If negative, then offset is calculated from the end of buf
         * @param [encoding='utf8'] If value is a string, this is its encoding
         * @returns true or false
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         */
        includes(value: string | number | Buffer | Uint8Array, byteOffset?: number, encoding?: BufferEncoding): boolean;

        /**
         * The index of the first occurrence of value in buf
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param value What to search for
         * @param [byteOffset = 0] Where to begin searching in buf
         * @param [encoding='utf8'] If value is a string, this is the encoding used to determine the binary representation of the string that will be searched for in buf
         * @returns The index of the first occurrence of value in buf, or -1 if buf does not contain value
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         */
        indexOf(value: string | number | Buffer | Uint8Array, byteOffset?: number, encoding?: BufferEncoding): number;

        /**
         * Creates and returns an iterator of buf keys (indices).
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         */
        keys(): IterableIterator<number>;
        
        /**
         * Creates and returns an iterator for buf values (bytes).
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         */
        values(): IterableIterator<number>;

        /**
         * Creates and returns an iterator of [index, byte] pairs from the contents of buf.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         */
        entries(): IterableIterator<[number, number]>;

        /**
         * The index of the last occurrence of value in buf
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param value What to search for
         * @param [byteOffset = 0] Where to begin searching in buf
         * @param [encoding='utf8'] If value is a string, this is the encoding used to determine the binary representation of the string that will be searched for in buf
         * @returns The index of the last occurrence of value in buf, or -1 if buf does not contain value
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         */
        lastIndexOf(value: string | number | Buffer | Uint8Array, byteOffset?: number, encoding?: BufferEncoding): number;

        /**
         * Reads a signed, big-endian 64-bit integer from buf at the specified offset
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [offset = 0] Number of bytes to skip before starting to read. Must satisfy: 0 <= offset <= buf.length - 8
         * @returns Return a signed, big-endian 64-bit integer 
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 8. Received value is: [offset]
         */
        readBigInt64BE(offset?: number): bigint;

        /**
         * Reads a signed, little-endian 64-bit integer from buf at the specified offset
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [offset = 0] Number of bytes to skip before starting to read. Must satisfy: 0 <= offset <= buf.length - 8
         * @returns Return a signed, little-endian 64-bit integer
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 8. Received value is: [offset]
         */
        readBigInt64LE(offset?: number): bigint;

        /**
         * Reads a unsigned, big-endian 64-bit integer from buf at the specified offset
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [offset = 0] Number of bytes to skip before starting to read. Must satisfy: 0 <= offset <= buf.length - 8
         * @returns Return a unsigned, big-endian 64-bit integer 
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 8. Received value is: [offset]
         */
        readBigUInt64BE(offset?: number): bigint;

        /**
         * Reads a unsigned, little-endian 64-bit integer from buf at the specified offset
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [offset = 0] Number of bytes to skip before starting to read. Must satisfy: 0 <= offset <= buf.length - 8
         * @returns Return a unsigned, little-endian 64-bit integer 
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 8. Received value is: [offset]
         */
        readBigUInt64LE(offset?: number): bigint;

        /**
         * Reads a 64-bit, big-endian double from buf at the specified offset
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [offset = 0] Number of bytes to skip before starting to read. Must satisfy: 0 <= offset <= buf.length - 8
         * @returns Return a 64-bit, big-endian double 
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 8. Received value is: [offset]
         */
        readDoubleBE(offset?: number): number;

        /**
         * Reads a 64-bit, little-endian double from buf at the specified offset
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [offset = 0] Number of bytes to skip before starting to read. Must satisfy: 0 <= offset <= buf.length - 8
         * @returns Return a 64-bit, little-endian double 
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 8. Received value is: [offset]
         */
        readDoubleLE(offset?: number): number;

        /**
         * Reads a 32-bit, big-endian float from buf at the specified offset
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [offset = 0] Number of bytes to skip before starting to read. Must satisfy: 0 <= offset <= buf.length - 4
         * @returns Return  a 32-bit, big-endian float 
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 4. Received value is: [offset]
         */
        readFloatBE(offset?: number): number;

        /**
         * Reads a 32-bit, little-endian float from buf at the specified offset
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [offset = 0] Number of bytes to skip before starting to read. Must satisfy: 0 <= offset <= buf.length - 4
         * @returns Return  a 32-bit, little-endian float
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 4. Received value is: [offset]
         */
        readFloatLE(offset?: number): number;

        /**
         * Reads a signed 8-bit integer from buf at the specified offset
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [offset = 0] Number of bytes to skip before starting to read. Must satisfy: 0 <= offset <= buf.length - 1
         * @returns Return  a signed 8-bit integer
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 1. Received value is: [offset]
         */
        readInt8(offset?: number): number;

        /**
         * Reads a signed, big-endian 16-bit integer from buf at the specified offset
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [offset = 0] Number of bytes to skip before starting to read. Must satisfy: 0 <= offset <= buf.length - 2
         * @returns Return a signed, big-endian 16-bit integer
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 2. Received value is: [offset]
         */
        readInt16BE(offset?: number): number;

        /**
         * Reads a signed, little-endian 16-bit integer from buf at the specified offset
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [offset = 0] Number of bytes to skip before starting to read. Must satisfy: 0 <= offset <= buf.length - 2
         * @returns Return a signed, little-endian 16-bit integer
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 2. Received value is: [offset]
         */
        readInt16LE(offset?: number): number;

        /**
         * Reads a signed, big-endian 32-bit integer from buf at the specified offset
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [offset = 0] Number of bytes to skip before starting to read. Must satisfy: 0 <= offset <= buf.length - 4
         * @returns Return a signed, big-endian 32-bit integer
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 4. Received value is: [offset]
         */
        readInt32BE(offset?: number): number;

        /**
         * Reads a signed, little-endian 32-bit integer from buf at the specified offset
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [offset = 0] Number of bytes to skip before starting to read. Must satisfy: 0 <= offset <= buf.length - 4
         * @returns Return a signed, little-endian 32-bit integer
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 4. Received value is: [offset]
         */
        readInt32LE(offset?: number): number;

        /**
         * Reads byteLength number of bytes from buf at the specified offset and interprets the result as a big-endian,
         * two's complement signed value supporting up to 48 bits of accuracy
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param offset Number of bytes to skip before starting to read. Must satisfy: 0 <= offset <= buf.length - byteLength
         * @param byteLength Number of bytes to read. Must satisfy 0 < byteLength <= 6
         * @returns 
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        readIntBE(offset: number, byteLength: number): number;

        /**
         * Reads byteLength number of bytes from buf at the specified offset and interprets the result as a little-endian,
         * two's complement signed value supporting up to 48 bits of accuracy.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param offset Number of bytes to skip before starting to read. Must satisfy: 0 <= offset <= buf.length - byteLength
         * @param byteLength Number of bytes to read. Must satisfy 0 < byteLength <= 6
         * @returns 
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        readIntLE(offset: number, byteLength: number): number;

        /**
         * Reads an unsigned 8-bit integer from buf at the specified offset
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [offset = 0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 1
         * @returns Reads an unsigned 8-bit integer
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 1. Received value is: [offset]
         */
        readUInt8(offset?: number): number;

        /**
         * Reads an unsigned, big-endian 16-bit integer from buf at the specified offset
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [offset = 0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 2
         * @returns Reads an unsigned, big-endian 16-bit integer
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 2. Received value is: [offset]
         */
        readUInt16BE(offset?: number): number;

        /**
         * Reads an unsigned, little-endian 16-bit integer from buf at the specified offset
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [offset = 0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 2
         * @returns Reads an unsigned, little-endian 16-bit integer
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 2. Received value is: [offset]
         */
        readUInt16LE(offset?: number): number;

        /**
         * Reads an unsigned, big-endian 32-bit integer from buf at the specified offset
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [offset = 0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 4
         * @returns Reads an unsigned, big-endian 32-bit integer
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 4. Received value is: [offset]
         */
        readUInt32BE(offset?: number): number;

        /**
         * Reads an unsigned, little-endian 32-bit integer from buf at the specified offset
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [offset = 0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 4
         * @returns Reads an unsigned, little-endian 32-bit integer
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 4. Received value is: [offset]
         */
        readUInt32LE(offset?: number): number;

        /**
         * Reads byteLength number of bytes from buf at the specified offset and interprets the result as
         * an unsigned big-endian integer supporting up to 48 bits of accuracy.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param offset Number of bytes to skip before starting to read. Must satisfy: 0 <= offset <= buf.length - byteLength
         * @param byteLength Number of bytes to read. Must satisfy 0 < byteLength <= 6
         * @returns 
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        readUIntBE(offset: number, byteLength: number): number;

        /**
         * Reads byteLength number of bytes from buf at the specified offset and interprets the result as an unsigned,
         * little-endian integer supporting up to 48 bits of accuracy.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param offset Number of bytes to skip before starting to read. Must satisfy: 0 <= offset <= buf.length - byteLength
         * @param byteLength Number of bytes to read. Must satisfy 0 < byteLength <= 6
         * @returns 
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        readUIntLE(offset: number, byteLength: number): number;

        /**
         * Returns a new Buffer that references the same memory as the original, but offset and cropped by the start and end indices.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param [start = 0] Where the new Buffer will start
         * @param [end = buf.length] Where the new Buffer will end (not inclusive)
         * @returns Returns a new Buffer that references the same memory as the original
         */
        subarray(start?: number, end?: number): Buffer;

        /**
         * Interprets buf as an array of unsigned 16-bit integers and swaps the byte order in-place.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @returns A reference to buf
         * @throws {BusinessError} 10200009 - Buffer size must be a multiple of 16-bits
         */
        swap16(): Buffer;

        /**
         * Interprets buf as an array of unsigned 32-bit integers and swaps the byte order in-place.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @returns A reference to buf
         * @throws {BusinessError} 10200009 - Buffer size must be a multiple of 32-bits
         */
        swap32(): Buffer;

        /**
         * Interprets buf as an array of unsigned 64-bit integers and swaps the byte order in-place.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @returns A reference to buf
         * @throws {BusinessError} 10200009 - Buffer size must be a multiple of 64-bits
         */
        swap64(): Buffer;

        /**
         * Returns a JSON representation of buf
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @returns Returns a JSON
         */
        toJSON(): Object;

        /**
         * Decodes buf to a string according to the specified character encoding in encoding
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param [encoding='utf8'] The character encoding to use
         * @param [start = 0] The byte offset to start decoding at
         * @param [end = buf.length] The byte offset to stop decoding at (not inclusive)
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         */
        toString(encoding?: string, start?: number, end?: number): string;

        /**
         * Writes string to buf at offset according to the character encoding in encoding
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param str Writes string to buf at offset according to the character encoding in encoding
         * @param [offset = 0] Number of bytes to skip before starting to write string
         * @param [length = buf.length - offset] Maximum number of bytes to write (written bytes will not exceed buf.length - offset)
         * @param [encoding='utf8'] The character encoding of string.
         * @returns Number of bytes written.
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[offset/length]" is out of range. It must be >= 0 and <= buf.length. Received value is: [offset/length]
         */
        write(str: string, offset?: number, length?: number, encoding?: string): number;

        /**
         * Writes value to buf at the specified offset as big-endian.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param [offset = 0]  Number of bytes to skip before starting to write. Must satisfy: 0 <= offset <= buf.length - 8
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        writeBigInt64BE(value: bigint, offset?: number): number;

        /**
         * Writes value to buf at the specified offset as little-endian.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param [offset = 0]  Number of bytes to skip before starting to write. Must satisfy: 0 <= offset <= buf.length - 8
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        writeBigInt64LE(value: bigint, offset?: number): number;

        /**
         * Writes value to buf at the specified offset as big-endian.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param [offset = 0]  Number of bytes to skip before starting to write. Must satisfy: 0 <= offset <= buf.length - 8
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        writeBigUInt64BE(value: bigint, offset?: number): number;

        /**
         * Writes value to buf at the specified offset as little-endian.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param [offset = 0]  Number of bytes to skip before starting to write. Must satisfy: 0 <= offset <= buf.length - 8
         * @returns offset plus the number of bytes written 
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        writeBigUInt64LE(value: bigint, offset?: number): number;

         /**
         * Writes value to buf at the specified offset as big-endian.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param [offset = 0]  Number of bytes to skip before starting to write. Must satisfy: 0 <= offset <= buf.length - 8
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 8. Received value is: [offset]
         */
        writeDoubleBE(value: number, offset?: number): number;

        /**
         * Writes value to buf at the specified offset as little-endian.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param [offset = 0]  Number of bytes to skip before starting to write. Must satisfy: 0 <= offset <= buf.length - 8
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 8. Received value is: [offset]
         */
        writeDoubleLE(value: number, offset?: number): number;

        /**
         * Writes value to buf at the specified offset as big-endian.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param [offset = 0]  Number of bytes to skip before starting to write. Must satisfy: 0 <= offset <= buf.length - 4
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 4. Received value is: [offset]
         */
        writeFloatBE(value: number, offset?: number): number;

        /**
         * Writes value to buf at the specified offset as little-endian.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param [offset = 0]  Number of bytes to skip before starting to write. Must satisfy: 0 <= offset <= buf.length - 4
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "offset" is out of range. It must be >= 0 and <= buf.length - 4. Received value is: [offset]
         */
        writeFloatLE(value: number, offset?: number): number;

        /**
         * Writes value to buf at the specified offset. value must be a valid signed 8-bit integer.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param [offset = 0] Number of bytes to skip before starting to write. Must satisfy: 0 <= offset <= buf.length - 1
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        writeInt8(value: number, offset?: number): number;

        /**
         * Writes value to buf at the specified offset as big-endian. The value must be a valid signed 16-bit integer
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param [offset = 0] Number of bytes to skip before starting to write. Must satisfy: 0 <= offset <= buf.length - 2
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        writeInt16BE(value: number, offset?: number): number;

        /**
         * Writes value to buf at the specified offset as little-endian. The value must be a valid signed 16-bit integer
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param [offset = 0] Number of bytes to skip before starting to write. Must satisfy: 0 <= offset <= buf.length - 2
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        writeInt16LE(value: number, offset?: number): number;

        /**
         * Writes value to buf at the specified offset as big-endian. The value must be a valid signed 32-bit integer.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param [offset = 0] Number of bytes to skip before starting to write. Must satisfy: 0 <= offset <= buf.length - 4
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        writeInt32BE(value: number, offset?: number): number;

        /**
         * Writes value to buf at the specified offset as little-endian. The value must be a valid signed 32-bit integer.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param [offset = 0] Number of bytes to skip before starting to write. Must satisfy: 0 <= offset <= buf.length - 4
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        writeInt32LE(value: number, offset?: number): number;

        /**
         * Writes byteLength bytes of value to buf at the specified offset as big-endian
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param offset Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - byteLength
         * @param byteLength Number of bytes to write. Must satisfy 0 < byteLength <= 6
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        writeIntBE(value: number, offset: number, byteLength: number): number;

        /**
         * Writes byteLength bytes of value to buf at the specified offset as little-endian
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param offset  Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - byteLength
         * @param byteLength Number of bytes to write. Must satisfy 0 < byteLength <= 6
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        writeIntLE(value : number, offset: number, byteLength: number): number;

        /**
         * Writes value to buf at the specified offset. value must be a valid unsigned 8-bit integer
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param [offset = 0] Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - 1
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        writeUInt8(value: number, offset?: number): number;

        /**
         * Writes value to buf at the specified offset as big-endian. The value must be a valid unsigned 16-bit integer.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param [offset = 0] Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - 2
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        writeUInt16BE(value: number, offset?: number): number;

        /**
         * Writes value to buf at the specified offset as little-endian. The value must be a valid unsigned 16-bit integer.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param [offset = 0] Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - 2
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        writeUInt16LE(value: number, offset?: number): number;

        /**
         * Writes value to buf at the specified offset as big-endian. The value must be a valid unsigned 32-bit integer.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param [offset = 0] Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - 4
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        writeUInt32BE(value: number, offset?: number): number;

        /**
         * Writes value to buf at the specified offset as little-endian. The value must be a valid unsigned 32-bit integer.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param [offset = 0] Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - 4
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        writeUInt32LE(value: number, offset?: number): number;

        /**
         * Writes byteLength bytes of value to buf at the specified offset as big-endian
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param offset Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - byteLength
         * @param byteLength Number of bytes to write. Must satisfy 0 < byteLength <= 6
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        writeUIntBE(value: number, offset: number, byteLength: number): number;

        /**
         * Writes byteLength bytes of value to buf at the specified offset as little-endian
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param value Number to be written to buf
         * @param offset Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - byteLength
         * @param byteLength Number of bytes to write. Must satisfy 0 < byteLength <= 6
         * @returns offset plus the number of bytes written
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         * @throws {BusinessError} 10200001 - The value of "[param]" is out of range. It must be >= [left range] and <= [right range]. Received value is: [param]
         */
        writeUIntLE(value: number, offset: number, byteLength: number): number;

    }

    class Blob {

        /**
         * Creates a new Blob object containing a concatenation of the given sources.
         * @since 9
         * @syscap SystemCapability.Utils.Lang
         * @param sources An array of string, <ArrayBuffer>, <TypedArray>, <DataView>, or <Blob> objects, or any mix of such objects, that will be stored within the Blob
         * @param options {endings: string, type: string} 
         *                 endings:  One of either 'transparent' or 'native'. 
         *                 type: The Blob content-type
         * @throws {BusinessError} 401 - if the input parameters are invalid.
         */
        constructor(sources: string[] | ArrayBuffer[] | TypedArray[] | DataView[] | Blob[] , options?: Object);

        /**
         * The total size of the Blob in bytes
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         */
        size: number;

        /**
         * The content-type of the Blob
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         */
        type: string;

         /**
         * Returns a promise that fulfills with an <ArrayBuffer> containing a copy of the Blob data.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         */
        arrayBuffer(): Promise<ArrayBuffer>;

        /**
         * Creates and returns a new Blob containing a subset of this Blob objects data. The original Blob is not altered
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         * @param start The starting index
         * @param end The ending index
         * @param type The content-type for the new Blob
         */
        slice(start?: number, end?: number, type?: string): Blob;

         /**
         * Returns a promise that fulfills with the contents of the Blob decoded as a UTF-8 string.
         * @since 9
         * @syscap SystemCapability.Utils.Lang 
         */
        text(): Promise<string>;
    }

}
export default buffer;
