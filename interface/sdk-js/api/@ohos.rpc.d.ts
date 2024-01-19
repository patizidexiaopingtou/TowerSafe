/*
 * Copyright (C) 2021-2022 Huawei Device Co., Ltd.
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

declare namespace rpc {
    /**
     * The error code of rpc.
     * @syscap SystemCapability.Communication.IPC.Core
     * @since 9
     */
    enum ErrorCode {
        /* Check param failed */
        CHECK_PARAM_ERROR = 401,

        /* Os mmap function failed */
        OS_MMAP_ERROR = 1900001,

        /* Os ioctl function failed */
        OS_IOCTL_ERROR = 1900002,

        /* Write to ashmem failed */
        WRITE_TO_ASHMEM_ERROR = 1900003,

        /* Read from ashmem failed */
        READ_FROM_ASHMEM_ERROR = 1900004,

        /* Only proxy object permitted */
        ONLY_PROXY_OBJECT_PERMITTED_ERROR = 1900005,

        /* Only remote object permitted */
        ONLY_REMOTE_OBJECT_PERMITTED_ERROR = 1900006,

        /* Communication failed */
        COMMUNICATION_ERROR = 1900007,

        /* Proxy or remote object is invalid */
        PROXY_OR_REMOTE_OBJECT_INVALID_ERROR = 1900008,

        /* Write data to message sequence failed */
        WRITE_DATA_TO_MESSAGE_SEQUENCE_ERROR = 1900009,

        /* Read data from message sequence failed */
        READ_DATA_FROM_MESSAGE_SEQUENCE_ERROR = 1900010,

        /* Parcel memory alloc failed */
        PARCEL_MEMORY_ALLOC_ERROR = 1900011,

        /* Call js method failed */
        CALL_JS_METHOD_ERROR = 1900012,

        /* Os dup function failed */
        OS_DUP_ERROR = 1900013
    }

    /**
     * A data object used for remote procedure call (RPC).
     * <p>
     * During RPC, the sender can use the write methods provided by {@link MessageParcel} to
     * write the to-be-sent data into a {@link MessageParcel} object in a specific format, and the receiver can use the
     * read methods provided by {@link MessageParcel} to read data of the specific format from the {@link MessageParcel} object.
     * <p>
     * <p>
     * The default capacity of a {@link MessageParcel} instance is 200KB. If you want more or less, use {@link #setCapacity(int)}
     * to change it.
     * </p>
     * <b>Note</b>: Only data of the following data types can be written into or read from a {@link MessageParcel}: byte,
     * byteArray, short, shortArray, int, intArray, long, longArray, float, floatArray, double, doubleArray, boolean,
     * booleanArray, char, charArray, String, StringArray, {@link IRemoteObject}, IRemoteObjectArray,
     * {@link Sequenceable}, and SequenceableArray.
     *
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.rpc.MessageSequence
     * @syscap SystemCapability.Communication.IPC.Core
     */
    class MessageParcel {
        /**
         * Creates an empty {@link MessageParcel} object.
         * @returns Return the object created.
         * @since 7
         */
        static create(): MessageParcel;

        /**
         * Reclaim the {@link MessageParcel} object.
         * @since 7
         */
        reclaim(): void;

        /**
         * Serialize a remote object and writes it to the {@link MessageParcel} object.
         * @param object Remote object to serialize.
         * @returns Return true if it is successful; return false otherwise.
         * @since 7
         */
        writeRemoteObject(object: IRemoteObject): boolean;

        /**
         * Reads a remote object from {@link MessageParcel} object.
         * @returns Return the remote object.
         * @since 7
         */
        readRemoteObject(): IRemoteObject;

        /**
         * Writes an interface token into the {@link MessageParcel} object.
         * @param token Interface descriptor to write.
         * @returns Return {@code true} if the interface token has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @since 7
         */
        writeInterfaceToken(token: string): boolean;

        /**
         * Reads an interface token from the {@link MessageParcel} object.
         * @returns Return a string value.
         * @since 7
         */
        readInterfaceToken(): string;

        /**
         * Obtains the size of data (in bytes) contained in the {@link MessageParcel} object.
         * @returns Return the size of data contained in the {@link MessageParcel} object.
         * @since 7
         */
        getSize(): number;

        /**
         * Obtains the storage capacity (in bytes) of the {@link MessageParcel} object.
         * @returns Return the storage capacity of the {@link MessageParcel} object.
         * @since 7
         */
        getCapacity(): number;

        /**
         * Sets the size of data (in bytes) contained in the {@link MessageParcel} object.
         * <p>{@code false} is returned if the data size set in this method is greater
         * than the storage capacity of the {@link MessageParcel}.
         *
         * @param size Indicates the data size of the {@link MessageParcel} object.
         * @returns Return {@code true} if the setting is successful; return {@code false} otherwise.
         * @since 7
         */
        setSize(size: number): boolean;

        /**
         * Sets the storage capacity (in bytes) of the {@link MessageParcel} object.
         * <p>{@code false} is returned if the capacity set in this method is less than
         * the size of data contained in the {@link MessageParcel}.
         *
         * @param size Indicates the storage capacity of the {@link MessageParcel} object.
         * @returns Return {@code true} if the setting is successful; return {@code false} otherwise.
         * @since 7
         */
        setCapacity(size: number): boolean;

        /**
         * Obtains the writable data space (in bytes) in the {@link MessageParcel} object.
         * <p>Writable data space = Storage capacity of the {@link MessageParcel} – Size of data contained in the {@link MessageParcel}.
         *
         * @returns Return the writable data space of the {@link MessageParcel} object.
         * @since 7
         */
        getWritableBytes(): number;

        /**
         * Obtains the readable data space (in bytes) in the {@link MessageParcel} object.
         * <p>Readable data space = Size of data contained in the {@link MessageParcel} – Size of data that has been read.
         *
         * @returns Return the readable data space of the {@link MessageParcel} object.
         * @since 7
         */
        getReadableBytes(): number;

        /**
         * Obtains the current read position in the {@link MessageParcel} object.
         * @returns Return the current read position in the {@link MessageParcel} object.
         * @since 7
         */
        getReadPosition(): number;

        /**
         * Obtains the current write position in the {@link MessageParcel} object.
         * @returns Return the current write position in the {@link MessageParcel} object.
         * @since 7
         */
        getWritePosition(): number;

        /**
         * Changes the current read position in the {@link MessageParcel} object.
         * <p>Generally, you are advised not to change the current read position. If you must
         * change it, change it to an accurate position. Otherwise, the read data may be incorrect.
         *
         * @param pos Indicates the target position to start data reading.
         * @returns Return {@code true} if the read position is changed; return {@code false} otherwise.
         * @since 7
         */
        rewindRead(pos: number): boolean;

        /**
         * Changes the current write position in the {@link MessageParcel} object.
         * <p>Generally, you are advised not to change the current write position. If you must
         * change it, change it to an accurate position. Otherwise, the data to be read may be incorrect.
         *
         * @param pos Indicates the target position to start data writing.
         * @returns Return {@code true} if the write position is changed; return {@code false} otherwise.
         * @since 7
         */
        rewindWrite(pos: number): boolean;

        /**
         * Writes information to this MessageParcel object indicating that no exception occurred.
         * <p>After handling requests, you should call this method before writing any data to reply {@link MessageParcel}.
         * @since 8
         */
        writeNoException(): void;

        /**
         * Reads the exception information from this MessageParcel object.
         * <p>If exception was thrown in server side, it will be thrown here.
         * This method should be called before reading any data from reply {@link MessageParcel}
         * if {@link writeNoException} was invoked in server side.
         * @throws Throws an exception if it thrown in server side.
         * @since 8
         */
        readException(): void;

        /**
         * Writes a byte value into the {@link MessageParcel} object.
         * @param val Indicates the byte value to write.
         * @returns Return {@code true} if the value has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeByte(val: number): boolean;

        /**
         * Writes a short integer value into the {@link MessageParcel} object.
         * @param val Indicates the short integer value to write.
         * @returns Return {@code true} if the value has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeShort(val: number): boolean;

        /**
         * Writes an integer value into the {@link MessageParcel} object.
         * @param val Indicates the integer value to write.
         * @returns Return {@code true} if the value has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeInt(val: number): boolean;

        /**
         * Writes a long integer value into the {@link MessageParcel} object.
         * @param val Indicates the long integer value to write.
         * @returns Return {@code true} if the value has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeLong(val: number): boolean;

        /**
         * Writes a floating point value into the {@link MessageParcel} object.
         * @param val Indicates the floating point value to write.
         * @returns Return {@code true} if the value has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeFloat(val: number): boolean;

        /**
         * Writes a double-precision floating point value into the {@link MessageParcel} object.
         * @param val Indicates the double-precision floating point value to write.
         * @returns Return {@code true} if the value has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeDouble(val: number): boolean;

        /**
         * Writes a boolean value into the {@link MessageParcel} object.
         * @param val Indicates the boolean value to write.
         * @returns Return {@code true} if the value has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeBoolean(val: boolean): boolean;

        /**
         * Writes a single character value into the {@link MessageParcel} object.
         * @param val Indicates the single character value to write.
         * @returns Return {@code true} if the value has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeChar(val: number): boolean;

        /**
         * Writes a string value into the {@link MessageParcel} object.
         * @param val Indicates the string value to write.
         * @returns Return {@code true} if the value has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeString(val: string): boolean;

        /**
         * Writes a {@link Sequenceable} object into the {@link MessageParcel} object.
         * @param val Indicates the {@link Sequenceable} object to write.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeSequenceable(val: Sequenceable): boolean;

        /**
         * Writes a byte array into the {@link MessageParcel} object.
         * @param byteArray Indicates the byte array to write.
         * @returns Return {@code true} if the array has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeByteArray(byteArray: number[]): boolean;

        /**
         * Writes a short integer array into the {@link MessageParcel} object.
         * Ensure that the data type and size comply with the interface definition.
         * Otherwise,data may be truncated.
         * @param shortArray Indicates the short integer array to write.
         * @returns Return {@code true} if the array has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeShortArray(shortArray: number[]): boolean;

        /**
         * Writes an integer array into the {@link MessageParcel} object.
         * Ensure that the data type and size comply with the interface definition.
         * Otherwise,data may be truncated.
         * @param intArray Indicates the integer array to write.
         * @returns Return {@code true} if the array has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeIntArray(intArray: number[]): boolean;

        /**
         * Writes a long integer array into the {@link MessageParcel} object.
         * Ensure that the data type and size comply with the interface definition.
         * Otherwise,data may be truncated.
         * @param longArray Indicates the long integer array to write.
         * @returns Return {@code true} if the array has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeLongArray(longArray: number[]): boolean;

        /**
         * Writes a floating point array into the {@link MessageParcel} object.
         * Ensure that the data type and size comply with the interface definition.
         * Otherwise,data may be truncated.
         * @param floatArray Indicates the floating point array to write.
         * @returns Return {@code true} if the array has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeFloatArray(floatArray: number[]): boolean;

        /**
         * Writes a double-precision floating point array into the {@link MessageParcel} object.
         * Ensure that the data type and size comply with the interface definition.
         * Otherwise,data may be truncated.
         * @param doubleArray Indicates the double-precision floating point array to write.
         * @returns Return {@code true} if the array has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeDoubleArray(doubleArray: number[]): boolean;

        /**
         * Writes a boolean array into the {@link MessageParcel} object.
         * Ensure that the data type and size comply with the interface definition.
         * Otherwise,data may be truncated.
         * @param booleanArray Indicates the boolean array to write.
         * @returns Return {@code true} if the array has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeBooleanArray(booleanArray: boolean[]): boolean;

        /**
         * Writes a single character array into the {@link MessageParcel} object.
         * Ensure that the data type and size comply with the interface definition.
         * Otherwise,data may be truncated.
         * @param charArray Indicates the single character array to write.
         * @returns Return {@code true} if the array has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeCharArray(charArray: number[]): boolean;

        /**
         * Writes a string array into the {@link MessageParcel} object.
         * Ensure that the data type and size comply with the interface definition.
         * Otherwise,data may be truncated.
         * @param stringArray Indicates the string array to write.
         * @returns Return {@code true} if the array has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeStringArray(stringArray: string[]): boolean;

        /**
         * Writes a {@link Sequenceable} object array into the {@link MessageParcel} object.
         * @param sequenceableArray Indicates the {@link Sequenceable} object array to write.
         * @returns Return {@code true} if the array has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this parcel is insufficient,
         *         exception message: {@link ParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        writeSequenceableArray(sequenceableArray: Sequenceable[]): boolean;

        /**
         * Writes an array of {@link IRemoteObject} objects to this {@link MessageParcel} object.
         * @param objectArray Array of {@link IRemoteObject} objects to write.
         * @returns Return {@code true} if the {@link IRemoteObject} array is successfully written to the {@link MessageParcel};
         *          return false if the {@link IRemoteObject} array is null or fails to be written to the {@link MessageParcel}.
         * @since 8
         */
        writeRemoteObjectArray(objectArray: IRemoteObject[]): boolean;

        /**
         * Reads a byte value from the {@link MessageParcel} object.
         * @returns Return a byte value.
         * @since 7
         */
        readByte(): number;

        /**
         * Reads a short integer value from the {@link MessageParcel} object.
         * @returns Return a short integer value.
         * @since 7
         */
        readShort(): number;

        /**
         * Reads an integer value from the {@link MessageParcel} object.
         * @returns Return an integer value.
         * @since 7
         */
        readInt(): number;

        /**
         * Reads a long integer value from the {@link MessageParcel} object.
         * @returns Return a long integer value.
         * @since 7
         */
        readLong(): number;

        /**
         * Reads a floating point value from the {@link MessageParcel} object.
         * @returns Return a floating point value.
         * @since 7
         */
        readFloat(): number;

        /**
         * Reads a double-precision floating point value from the {@link MessageParcel} object.
         * @returns Return a double-precision floating point value.
         * @since 7
         */
        readDouble(): number;

        /**
         * Reads a boolean value from the {@link MessageParcel} object.
         * @returns Return a boolean value.
         * @since 7
         */
        readBoolean(): boolean;

        /**
         * Reads a single character value from the {@link MessageParcel} object.
         * @returns Return a single character value.
         * @since 7
         */
        readChar(): number;

        /**
         * Reads a string value from the {@link MessageParcel} object.
         * @returns Return a string value.
         * @since 7
         */
        readString(): string;

        /**
         * Reads a {@link Sequenceable} object from the {@link MessageParcel} instance.
         * @param dataIn Indicates the {@link Sequenceable} object that needs to perform the {@code unmarshalling} operation
         *        using the {@link MessageParcel}.
         * @returns Return {@code true} if the unmarshalling is successful; return {@code false} otherwise.
         * @since 7
         */
        readSequenceable(dataIn: Sequenceable) : boolean;

        /**
         * Writes a byte array into the {@link MessageParcel} object.
         * @param dataIn Indicates the byte array read from MessageParcel.
         * @returns Return {@code true} if the array has been written into the {@link MessageParcel};
         *          return {@code false} otherwise.
         * @throws ParcelException When capacity in this MessageParcel is insufficient,
         *         exception message: {@link *MessageParcelException#NO_CAPACITY_ERROR}.
         * @since 7
         */
        readByteArray(dataIn: number[]) : void;

        /**
         * Reads a byte array from the {@link MessageParcel} object.
         * @returns Return a byte array.
         * @since 7
         */
        readByteArray(): number[];

        /**
         * Reads a short integer array from the {@link MessageParcel} object.
         * @param dataIn Indicates the short integer array read from MessageParcel.
         * @since 7
         */
        readShortArray(dataIn: number[]) : void;

        /**
         * Reads a short integer array from the {@link MessageParcel} object.
         * @returns Return a short integer array.
         * @since 7
         */
        readShortArray(): number[];

        /**
         * Reads an integer array from the {@link MessageParcel} object.
         * @param dataIn Indicates the integer array to read.
         * @throws ParcelException Throws this exception if reading the integer array fails.
         * @since 7
         */
        readIntArray(dataIn: number[]) : void;

        /**
         * Reads an integer array from the {@link MessageParcel} object.
         * @returns Return an integer array.
         * @since 7
         */
        readIntArray(): number[];

        /**
         * Reads a long integer array from the {@link MessageParcel} object.
         * @param dataIn Indicates the long integer array to read.
         * @throws ParcelException Throws this exception if reading the long array fails.
         * @since 7
         */
        readLongArray(dataIn: number[]) : void;

        /**
         * Reads a long integer array from the {@link MessageParcel} object.
         * @returns Return a long integer array.
         * @since 7
         */
        readLongArray(): number[];

        /**
         * Reads a floating point array from the {@link MessageParcel} object.
         * @param dataIn Indicates the floating point array to read.
         * @throws ParcelException Throws this exception if reading the float array fails.
         * @since 7
         */
        readFloatArray(dataIn: number[]) : void;

        /**
         * Reads a floating point array from the {@link MessageParcel} object.
         * @returns Return a floating point array.
         * @since 7
         */
        readFloatArray(): number[];

        /**
         * Reads a double-precision floating point array from the {@link MessageParcel} object.
         * @param dataIn Indicates the double-precision floating point array to read.
         * @throws ParcelException Throws this exception if reading the double array fails.
         * @since 7
         */
        readDoubleArray(dataIn: number[]) : void;

        /**
         * Reads a double-precision floating point array from the {@link MessageParcel} object.
         * @returns Return a double-precision floating point array.
         * @since 7
         */
        readDoubleArray(): number[];

        /**
         * Reads a boolean array from the {@link MessageParcel} object.
         * @param dataIn Indicates the boolean array to read.
         * @throws ParcelException Throws this exception if reading the boolean array fails.
         * @since 7
         */
        readBooleanArray(dataIn: boolean[]) : void;

        /**
         * Reads a boolean array from the {@link MessageParcel} object.
         * @returns Return a boolean array.
         * @since 7
         */
        readBooleanArray(): boolean[];

        /**
         * Reads a single character array from the {@link MessageParcel} object.
         * @param dataIn Indicates the single character array to read.
         * @throws ParcelException Throws this exception if reading the char array fails.
         * @since 7
         */
        readCharArray(dataIn: number[]) : void;

        /**
         * Reads a single character array from the {@link MessageParcel} object.
         * @returns Return a single character array.
         * @since 7
         */
        readCharArray(): number[];

        /**
         * Reads a string array from the {@link MessageParcel} object.
         * @param dataIn Indicates the string array to read.
         * @throws ParcelException Throws this exception if reading the string array fails.
         * @since 7
         */
        readStringArray(dataIn: string[]) : void;

        /**
         * Reads a string array from the {@link MessageParcel} object.
         * @returns Return a string array.
         * @since 7
         */
        readStringArray(): string[];

        /**
         * Reads the specified {@link Sequenceable} array from this {@link MessageParcel} object.
         * @param sequenceableArray Sequenceable array to read.
         * @since 8
         */
        readSequenceableArray(sequenceableArray: Sequenceable[]): void;

        /**
         * Reads the specified {@link IRemoteObject} array from this {@link MessageParcel} object.
         * @param objects Reads data from this {@link MessageParcel} object to the specified {@link IRemoteObject} array.
         * @since 8
         */
        readRemoteObjectArray(objects: IRemoteObject[]): void;

        /**
         * Reads {@link IRemoteObject} objects from this {@link MessageParcel} object.
         * @returns An array of {@link IRemoteObject} objects obtained.
         * @since 8
         */
        readRemoteObjectArray(): IRemoteObject[];

        /**
         * Closes the specified file descriptor.
         * @param fd File descriptor to be closed.
         * @since 8
         */
        static closeFileDescriptor(fd: number): void;

        /**
         * Duplicates the specified file descriptor.
         * @param fd File descriptor to be duplicated.
         * @returns A duplicated file descriptor.
         * @since 8
         */
        static dupFileDescriptor(fd: number) :number;

        /**
         * Checks whether this {@link MessageParcel} object contains a file descriptor.
         * @returns Return true if the {@link MessageParcel} object contains a file descriptor;
         * return false otherwise.
         * @since 8
         */
        containFileDescriptors(): boolean;

        /**
         * Writes a file descriptor to this {@link MessageParcel} object.
         * @param fd File descriptor to wrote.
         * @returns Return true if the operation is successful; return false otherwise.
         * @since 8
         */
        writeFileDescriptor(fd: number): boolean;

        /**
         * Reads a file descriptor from this {@link MessageParcel} object.
         * @returns File descriptor obtained.
         * @since 8
         */
        readFileDescriptor(): number;

        /**
         * Writes an anonymous shared memory object to this {@link MessageParcel} object.
         * @param ashmem Anonymous shared memory object to wrote.
         * @returns Return true if the operation is successful; return false otherwise.
         * @since 8
         */
        writeAshmem(ashmem: Ashmem): boolean;

        /**
         * Reads the anonymous shared memory object from this {@link MessageParcel} object.
         * @returns Anonymous share object obtained.
         * @since 8
         */
        readAshmem(): Ashmem;

        /**
         * Obtains the maximum amount of raw data that can be sent in a time.
         * @returns 128 MB.
         * @since 8
         */
        getRawDataCapacity(): number;

        /**
         * Writes raw data to this {@link MessageParcel} object.
         * @param rawData Raw data to wrote.
         * @param size Size of the raw data, in bytes.
         * @returns Return true if the operation is successful; return false otherwise.
         * @since 8
         */
        writeRawData(rawData: number[], size: number): boolean;

        /**
         * Reads raw data from this {@link MessageParcel} object.
         * @param size Size of the raw data to read.
         * @returns Raw data obtained, in bytes.
         * @since 8
         */
        readRawData(size: number): number[];
    }

    /**
     * A data object used for remote procedure call (RPC).
     * <p>
     * During RPC, the sender can use the write methods provided by {@link MessageSequence} to
     * write the to-be-sent data into a {@link MessageSequence} object in a specific format, and the receiver can use the
     * read methods provided by {@link MessageSequence} to read data of the specific format from the {@link MessageSequence} object.
     * <p>
     * <p>
     * The default capacity of a {@link MessageSequence} instance is 200KB. If you want more or less, use {@link #setCapacity(int)}
     * to change it.
     * </p>
     * <b>Note</b>: Only data of the following data types can be written into or read from a {@link MessageSequence}: byte,
     * byteArray, short, shortArray, int, intArray, long, longArray, float, floatArray, double, doubleArray, boolean,
     * booleanArray, char, charArray, String, StringArray, {@link IRemoteObject}, IRemoteObjectArray,
     * {@link Parcelable}, and ParcelableArray.
     *
     * @since 9
     * @syscap SystemCapability.Communication.IPC.Core
     */
    class MessageSequence {
        /**
         * Creates an empty {@link MessageSequence} object.
         * @returns Return the object created.
         * @since 9
         */
        static create(): MessageSequence;

        /**
         * Reclaim the {@link MessageSequence} object.
         * @since 9
         */
        reclaim(): void;

        /**
         * Serialize a remote object and writes it to the {@link MessageSequence} object.
         * @param object Remote object to serialize.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900008 - proxy or remote object is invalid
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeRemoteObject(object: IRemoteObject): void;

        /**
         * Reads a remote object from {@link MessageSequence} object.
         * @returns Return the remote object.
         * @throws { BusinessError } 1900008 - proxy or remote object is invalid
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readRemoteObject(): IRemoteObject;

        /**
         * Writes an interface token into the {@link MessageSequence} object.
         * @param token Interface descriptor to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeInterfaceToken(token: string): void;

        /**
         * Reads an interface token from the {@link MessageSequence} object.
         * @returns Return a string value.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readInterfaceToken(): string;

        /**
         * Obtains the size of data (in bytes) contained in the {@link MessageSequence} object.
         * @returns Return the size of data contained in the {@link MessageSequence} object.
         * @since 9
         */
        getSize(): number;

        /**
         * Obtains the storage capacity (in bytes) of the {@link MessageSequence} object.
         * @returns Return the storage capacity of the {@link MessageSequence} object.
         * @since 9
         */
        getCapacity(): number;

        /**
         * Sets the size of data (in bytes) contained in the {@link MessageSequence} object.
         * <p>{@code false} is returned if the data size set in this method is greater
         * than the storage capacity of the {@link MessageSequence}.
         *
         * @param size Indicates the data size of the {@link MessageSequence} object.
         * @throws { BusinessError } 401 - check param failed
         * @since 9
         */
        setSize(size: number): void;

        /**
         * Sets the storage capacity (in bytes) of the {@link MessageSequence} object.
         * <p>{@code false} is returned if the capacity set in this method is less than
         * the size of data contained in the {@link MessageSequence}.
         *
         * @param size Indicates the storage capacity of the {@link MessageSequence} object.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900011 - parcel memory alloc failed
         * @since 9
         */
        setCapacity(size: number): void;

        /**
         * Obtains the writable data space (in bytes) in the {@link MessageSequence} object.
         * <p>Writable data space = Storage capacity of the {@link MessageSequence} – Size of data contained in the {@link MessageSequence}.
         *
         * @returns Return the writable data space of the {@link MessageSequence} object.
         * @since 9
         */
        getWritableBytes(): number;

        /**
         * Obtains the readable data space (in bytes) in the {@link MessageSequence} object.
         * <p>Readable data space = Size of data contained in the {@link MessageSequence} – Size of data that has been read.
         *
         * @returns Return the readable data space of the {@link MessageSequence} object.
         * @since 9
         */
        getReadableBytes(): number;

        /**
         * Obtains the current read position in the {@link MessageSequence} object.
         * @returns Return the current read position in the {@link MessageSequence} object.
         * @since 9
         */
        getReadPosition(): number;

        /**
         * Obtains the current write position in the {@link MessageSequence} object.
         * @returns Return the current write position in the {@link MessageSequence} object.
         * @since 9
         */
        getWritePosition(): number;

        /**
         * Changes the current read position in the {@link MessageSequence} object.
         * <p>Generally, you are advised not to change the current read position. If you must
         * change it, change it to an accurate position. Otherwise, the read data may be incorrect.
         *
         * @param pos Indicates the target position to start data reading.
         * @throws { BusinessError } 401 - check param failed
         * @since 9
         */
        rewindRead(pos: number): void;

        /**
         * Changes the current write position in the {@link MessageSequence} object.
         * <p>Generally, you are advised not to change the current write position. If you must
         * change it, change it to an accurate position. Otherwise, the data to be read may be incorrect.
         *
         * @param pos Indicates the target position to start data writing.
         * @throws { BusinessError } 401 - check param failed
         * @since 9
         */
        rewindWrite(pos: number): void;

        /**
         * Writes information to this MessageSequence object indicating that no exception occurred.
         * <p>After handling requests, you should call this method before writing any data to reply {@link MessageSequence}.
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeNoException(): void;

        /**
         * Reads the exception information from this MessageSequence object.
         * <p>If exception was thrown in server side, it will be thrown here.
         * This method should be called before reading any data from reply {@link MessageSequence}
         * if {@link writeNoException} was invoked in server side.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readException(): void;

        /**
         * Writes a byte value into the {@link MessageSequence} object.
         * @param val Indicates the byte value to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeByte(val: number): void;

        /**
         * Writes a short integer value into the {@link MessageSequence} object.
         * @param val Indicates the short integer value to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeShort(val: number): void;

        /**
         * Writes an integer value into the {@link MessageSequence} object.
         * @param val Indicates the integer value to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeInt(val: number): void;

        /**
         * Writes a long integer value into the {@link MessageSequence} object.
         * @param val Indicates the long integer value to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeLong(val: number): void;

        /**
         * Writes a floating point value into the {@link MessageSequence} object.
         * @param val Indicates the floating point value to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeFloat(val: number): void;

        /**
         * Writes a double-precision floating point value into the {@link MessageSequence} object.
         * @param val Indicates the double-precision floating point value to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeDouble(val: number): void;

        /**
         * Writes a boolean value into the {@link MessageSequence} object.
         * @param val Indicates the boolean value to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeBoolean(val: boolean): void;

        /**
         * Writes a single character value into the {@link MessageSequence} object.
         * @param val Indicates the single character value to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeChar(val: number): void;

        /**
         * Writes a string value into the {@link MessageSequence} object.
         * @param val Indicates the string value to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeString(val: string): void;

        /**
         * Writes a {@link Parcelable} object into the {@link MessageSequence} object.
         * @param val Indicates the {@link Parcelable} object to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeParcelable(val: Parcelable): void;

        /**
         * Writes a byte array into the {@link MessageSequence} object.
         * @param byteArray Indicates the byte array to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeByteArray(byteArray: number[]): void;

        /**
         * Writes a short integer array into the {@link MessageSequence} object.
         * Ensure that the data type and size comply with the interface definition.
         * Otherwise,data may be truncated.
         * @param shortArray Indicates the short integer array to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeShortArray(shortArray: number[]): void;

        /**
         * Writes an integer array into the {@link MessageSequence} object.
         * Ensure that the data type and size comply with the interface definition.
         * Otherwise,data may be truncated.
         * @param intArray Indicates the integer array to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeIntArray(intArray: number[]): void;

        /**
         * Writes a long integer array into the {@link MessageSequence} object.
         * Ensure that the data type and size comply with the interface definition.
         * Otherwise,data may be truncated.
         * @param longArray Indicates the long integer array to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeLongArray(longArray: number[]): void;

        /**
         * Writes a floating point array into the {@link MessageSequence} object.
         * Ensure that the data type and size comply with the interface definition.
         * Otherwise,data may be truncated.
         * @param floatArray Indicates the floating point array to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeFloatArray(floatArray: number[]): void;

        /**
         * Writes a double-precision floating point array into the {@link MessageSequence} object.
         * Ensure that the data type and size comply with the interface definition.
         * Otherwise,data may be truncated.
         * @param doubleArray Indicates the double-precision floating point array to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeDoubleArray(doubleArray: number[]): void;

        /**
         * Writes a boolean array into the {@link MessageSequence} object.
         * Ensure that the data type and size comply with the interface definition.
         * Otherwise,data may be truncated.
         * @param booleanArray Indicates the boolean array to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeBooleanArray(booleanArray: boolean[]): void;

        /**
         * Writes a single character array into the {@link MessageSequence} object.
         * Ensure that the data type and size comply with the interface definition.
         * Otherwise,data may be truncated.
         * @param charArray Indicates the single character array to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeCharArray(charArray: number[]): void;

        /**
         * Writes a string array into the {@link MessageSequence} object.
         * Ensure that the data type and size comply with the interface definition.
         * Otherwise,data may be truncated.
         * @param stringArray Indicates the string array to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeStringArray(stringArray: string[]): void;

        /**
         * Writes a {@link Parcelable} object array into the {@link MessageSequence} object.
         * @param parcelableArray Indicates the {@link Parcelable} object array to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeParcelableArray(parcelableArray: Parcelable[]): void;

        /**
         * Writes an array of {@link IRemoteObject} objects to this {@link MessageSequence} object.
         * @param objectArray Array of {@link IRemoteObject} objects to write.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeRemoteObjectArray(objectArray: IRemoteObject[]): void;

        /**
         * Reads a byte value from the {@link MessageParcel} object.
         * @returns Return a byte value.
         * @throws { BusinessError } 1900010 read data from message sequence failed
         * @since 9
         */
        readByte(): number;

        /**
         * Reads a short integer value from the {@link MessageSequence} object.
         * @returns Return a short integer value.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readShort(): number;

        /**
         * Reads an integer value from the {@link MessageSequence} object.
         * @returns Return an integer value.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readInt(): number;

        /**
         * Reads a long integer value from the {@link MessageSequence} object.
         * @returns Return a long integer value.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readLong(): number;

        /**
         * Reads a floating point value from the {@link MessageSequence} object.
         * @returns Return a floating point value.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readFloat(): number;

        /**
         * Reads a double-precision floating point value from the {@link MessageSequence} object.
         * @returns Return a double-precision floating point value.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readDouble(): number;

        /**
         * Reads a boolean value from the {@link MessageSequence} object.
         * @returns Return a boolean value.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readBoolean(): boolean;

        /**
         * Reads a single character value from the {@link MessageSequence} object.
         * @returns Return a single character value.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readChar(): number;

        /**
         * Reads a string value from the {@link MessageSequence} object.
         * @returns Return a string value.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readString(): string;

        /**
         * Reads a {@link Parcelable} object from the {@link MessageSequence} instance.
         * @param dataIn Indicates the {@link Parcelable} object that needs to perform the {@code unmarshalling} operation
         *        using the {@link MessageSequence}.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @throws { BusinessError } 1900012 - call js callback function failed
         * @since 9
         */
        readParcelable(dataIn: Parcelable) : void;

        /**
         * Writes a byte array into the {@link MessageSequence} object.
         * @param dataIn Indicates the byte array read from MessageSequence.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readByteArray(dataIn: number[]) : void;

        /**
         * Reads a byte array from the {@link MessageSequence} object.
         * @returns Return a byte array.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readByteArray(): number[];

        /**
         * Reads a short integer array from the {@link MessageSequence} object.
         * @param dataIn Indicates the short integer array read from MessageSequence.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readShortArray(dataIn: number[]) : void;

        /**
         * Reads a short integer array from the {@link MessageSequence} object.
         * @returns Return a short integer array.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readShortArray(): number[];

        /**
         * Reads an integer array from the {@link MessageSequence} object.
         * @param dataIn Indicates the integer array to read.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readIntArray(dataIn: number[]) : void;

        /**
         * Reads an integer array from the {@link MessageSequence} object.
         * @returns Return an integer array.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readIntArray(): number[];

        /**
         * Reads a long integer array from the {@link MessageSequence} object.
         * @param dataIn Indicates the long integer array to read.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readLongArray(dataIn: number[]) : void;

        /**
         * Reads a long integer array from the {@link MessageSequence} object.
         * @returns Return a long integer array.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readLongArray(): number[];

        /**
         * Reads a floating point array from the {@link MessageSequence} object.
         * @param dataIn Indicates the floating point array to read.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readFloatArray(dataIn: number[]) : void;

        /**
         * Reads a floating point array from the {@link MessageSequence} object.
         * @returns Return a floating point array.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readFloatArray(): number[];

        /**
         * Reads a double-precision floating point array from the {@link MessageSequence} object.
         * @param dataIn Indicates the double-precision floating point array to read.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readDoubleArray(dataIn: number[]) : void;

        /**
         * Reads a double-precision floating point array from the {@link MessageSequence} object.
         * @returns Return a double-precision floating point array.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readDoubleArray(): number[];

        /**
         * Reads a boolean array from the {@link MessageSequence} object.
         * @param dataIn Indicates the boolean array to read.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readBooleanArray(dataIn: boolean[]) : void;

        /**
         * Reads a boolean array from the {@link MessageSequence} object.
         * @returns Return a boolean array.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readBooleanArray(): boolean[];

        /**
         * Reads a single character array from the {@link MessageSequence} object.
         * @param dataIn Indicates the single character array to read.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readCharArray(dataIn: number[]) : void;

        /**
         * Reads a single character array from the {@link MessageSequence} object.
         * @returns Return a single character array.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readCharArray(): number[];

        /**
         * Reads a string array from the {@link MessageSequence} object.
         * @param dataIn Indicates the string array to read.
         * @throws ParcelException Throws this exception if reading the string array fails.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readStringArray(dataIn: string[]) : void;

        /**
         * Reads a string array from the {@link MessageSequence} object.
         * @returns Return a string array.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readStringArray(): string[];

        /**
         * Reads the specified {@link Parcelable} array from this {@link MessageSequence} object.
         * @param parcelableArray Parcelable array to read.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @throws { BusinessError } 1900012 - call js callback function failed
         * @since 9
         */
        readParcelableArray(parcelableArray: Parcelable[]): void;

        /**
         * Reads the specified {@link IRemoteObject} array from this {@link MessageSequence} object.
         * @param objects Reads data from this {@link MessageSequence} object to the specified {@link IRemoteObject} array.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readRemoteObjectArray(objects: IRemoteObject[]): void;

        /**
         * Reads {@link IRemoteObject} objects from this {@link MessageSequence} object.
         * @returns An array of {@link IRemoteObject} objects obtained.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readRemoteObjectArray(): IRemoteObject[];

        /**
         * Closes the specified file descriptor.
         * @param fd File descriptor to be closed.
         * @throws { BusinessError } 401 - check param failed
         * @since 9
         */
        static closeFileDescriptor(fd: number): void;

        /**
         * Duplicates the specified file descriptor.
         * @param fd File descriptor to be duplicated.
         * @returns A duplicated file descriptor.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900013 - call os dup function failed
         * @since 9
         */
        static dupFileDescriptor(fd: number) :number;

        /**
         * Checks whether this {@link MessageSequence} object contains a file descriptor.
         * @returns Return true if the {@link MessageSequence} object contains a file descriptor;
         * return false otherwise.
         * @since 9
         */
        containFileDescriptors(): boolean;

        /**
         * Writes a file descriptor to this {@link MessageSequence} object.
         * @param fd File descriptor to wrote.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeFileDescriptor(fd: number): void;

        /**
         * Reads a file descriptor from this {@link MessageSequence} object.
         * @returns File descriptor obtained.
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readFileDescriptor(): number;

        /**
         * Writes an anonymous shared memory object to this {@link MessageSequence} object.
         * @param ashmem Anonymous shared memory object to wrote.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900003 - write to ashmem failed
         * @since 9
         */
        writeAshmem(ashmem: Ashmem): void;

        /**
         * Reads the anonymous shared memory object from this {@link MessageSequence} object.
         * @returns Anonymous share object obtained.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900004 - read from ashmem failed
         * @since 9
         */
        readAshmem(): Ashmem;

        /**
         * Obtains the maximum amount of raw data that can be sent in a time.
         * @returns 128 MB.
         * @since 9
         */
        getRawDataCapacity(): number;

        /**
         * Writes raw data to this {@link MessageSequence} object.
         * @param rawData Raw data to wrote.
         * @param size Size of the raw data, in bytes.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900009 - write data to message sequence failed
         * @since 9
         */
        writeRawData(rawData: number[], size: number): void;

        /**
         * Reads raw data from this {@link MessageSequence} object.
         * @param size Size of the raw data to read.
         * @returns Raw data obtained, in bytes.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900010 - read data from message sequence failed
         * @since 9
         */
        readRawData(size: number): number[];
    }

    /**
     * @syscap SystemCapability.Communication.IPC.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.rpc.Parcelable
     */
    interface Sequenceable {
        /**
         * Marshal this {@code Sequenceable} object into a {@link MessageParcel}.
         *
         * @param dataOut Indicates the {@link MessageParcel} object to which the {@code Sequenceable}
         *        object will be marshalled..
         * @returns Return {@code true} if the marshalling is successful; return {@code false} otherwise.
         * @throws ParcelException Throws this exception if the operation fails.
         * @since 7
         */
        marshalling(dataOut: MessageParcel): boolean;

        /**
         * Unmarshal this {@code Sequenceable} object from a {@link MessageParcel}.
         *
         * @param dataIn Indicates the {@link MessageParcel} object into which the {@code Sequenceable}
         *        object has been marshalled.
         * @returns Return {@code true} if the unmarshalling is successful; return {@code false} otherwise.
         * @throws ParcelException Throws this exception if the operation fails.
         * @since 7
         */
        unmarshalling(dataIn: MessageParcel) : boolean;
    }

    /**
     * @syscap SystemCapability.Communication.IPC.Core
     * @since 9
     */
    interface Parcelable {
        /**
         * Marshal this {@code Parcelable} object into a {@link MessageSequence}.
         *
         * @param dataOut Indicates the {@link MessageSequence} object to which the {@code Parcelable}
         *        object will be marshalled..
         * @returns Return {@code true} if the marshalling is successful; return {@code false} otherwise.
         * @throws ParcelException Throws this exception if the operation fails.
         * @since 9
         */
        marshalling(dataOut: MessageSequence): boolean;

        /**
         * Unmarshal this {@code Parcelable} object from a {@link MessageSequence}.
         *
         * @param dataIn Indicates the {@link MessageSequence} object into which the {@code Parcelable}
         *        object has been marshalled.
         * @returns Return {@code true} if the unmarshalling is successful; return {@code false} otherwise.
         * @throws ParcelException Throws this exception if the operation fails.
         * @since 9
         */
        unmarshalling(dataIn: MessageSequence) : boolean;
    }

    /**
     * Defines the response to the request.
     * <p> SendRequestResult object contains four members,
     * namely error code of this operation, request code, data parcel
     * and reply parcel.
     * @syscap SystemCapability.Communication.IPC.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.rpc.RequestResult
     */
    interface SendRequestResult {
        /**
         * Error code. 0 indicates successful, otherwise it is failed.
         * @since 8
         */
        errCode: number;

        /**
         * Message code. It is same as the code in {@link SendRequest} method.
         * @since 8
         */
        code: number;

        /**
         * MessageParcel object sent to the peer process.
         * It is the same object in {@link SendRequest} method.
         * @since 8
         */
        data: MessageParcel;

        /**
         * MessageParcel object returned by the peer process.
         * It is the same object in {@link SendRequest} method.
         * @since 8
         */
        reply: MessageParcel;
    }

    /**
    * Defines the response to the request.
    * <p> SendRequestResult object contains four members,
    * namely error code of this operation, request code, data parcel
    * and reply parcel.
    * @syscap SystemCapability.Communication.IPC.Core
    * @since 9
    */
    interface RequestResult {
        /**
         * Error code. 0 indicates successful, otherwise it is failed.
         * @since 9
         */
        errCode: number;

        /**
         * Message code. It is same as the code in {@link SendRequest} method.
         * @since 9
         */
        code: number;

        /**
         * MessageSequence object sent to the peer process.
         * It is the same object in {@link SendRequest} method.
         * @since 9
         */
        data: MessageSequence;

        /**
         * MessageSequence object returned by the peer process.
         * It is the same object in {@link SendRequest} method.
         * @since 9
         */
        reply: MessageSequence;
    }

    /**
     * @syscap SystemCapability.Communication.IPC.Core
     * @since 7
     */
    abstract class IRemoteObject {
        /**
         * Queries the description of an interface.
         *
         * <p>A valid {@link IRemoteBroker} object is returned for an interface used by the service provider;
         * {@code null} is returned for an interface used by the service user,
         * indicating that the interface is not a local one.
         *
         * @param descriptor Indicates the interface descriptor.
         * @returns Return the {@link IRemoteBroker} object bound to the specified interface descriptor.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.rpc.IRemoteObject#getLocalInterface
         */
        queryLocalInterface(descriptor: string): IRemoteBroker;

        /**
         * Queries the description of an interface.
         *
         * <p>A valid {@link IRemoteBroker} object is returned for an interface used by the service provider;
         * {@code null} is returned for an interface used by the service user,
         * indicating that the interface is not a local one.
         *
         * @param descriptor Indicates the interface descriptor.
         * @returns Return the {@link IRemoteBroker} object bound to the specified interface descriptor.
         * @throws { BusinessError } 401 - check param failed
         * @since 9
         */
        getLocalInterface(descriptor: string): IRemoteBroker;

        /**
         * Sends a {@link MessageParcel} message to the peer process in synchronous or asynchronous mode.
         *
         * <p>If asynchronous mode is set for {@code option}, a response is returned immediately.
         * If synchronous mode is set for {@code option}, the interface will wait for a response from the peer process
         * until the request times out. The user must prepare {@code reply} for receiving the execution result
         * given by the peer process.
         *
         * @param code Indicates the message code, which is determined by both sides of the communication.
         * If the interface is generated by the IDL tool, the message code is automatically generated by IDL.
         * @param data Indicates the {@link MessageParcel} object sent to the peer process.
         * @param reply Indicates the {@link MessageParcel} object returned by the peer process.
         * @param options Indicates the synchronous or asynchronous mode to send messages.
         * @returns Return {@code true} if the method is called successfully; return {@code false} otherwise.
         * @throws RemoteException Throws this exception if the method fails to be called.
         * @since 7
         * @deprecated since 9
         */
        sendRequest(code: number, data: MessageParcel, reply: MessageParcel, options: MessageOption): boolean;

        /**
         * Sends a {@link MessageParcel} message to the peer process in synchronous or asynchronous mode.
         *
         * <p>If options indicates the asynchronous mode, a promise will be fulfilled immediately
         * and the reply message does not contain any content. If options indicates the synchronous mode,
         * a promise will be fulfilled when the response to sendRequest is returned,
         * and the reply message contains the returned information.
         * param code Message code called by the request, which is determined by the client and server.
         * If the method is generated by an IDL tool, the message code is automatically generated by the IDL tool.
         * param data {@link MessageParcel} object holding the data to send.
         * param reply {@link MessageParcel} object that receives the response.
         * param operations Indicates the synchronous or asynchronous mode to send messages.
         * @returns Promise used to return the {@link SendRequestResult} instance.
         * @throws Throws an exception if the method fails to be called.
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.rpc.IRemoteObject#sendMessageRequest
         */
        sendRequest(code: number, data: MessageParcel, reply: MessageParcel, options: MessageOption): Promise<SendRequestResult>;

        /**
         * Sends a {@link MessageSequence} message to the peer process asynchronously.
         *
         * <p>If options indicates the asynchronous mode, a promise will be fulfilled immediately
         * and the reply message does not contain any content. If options indicates the synchronous mode,
         * a promise will be fulfilled when the response to sendMessageRequest is returned,
         * and the reply message contains the returned information.
         * param code Message code called by the request, which is determined by the client and server.
         * If the method is generated by an IDL tool, the message code is automatically generated by the IDL tool.
         * param data {@link MessageSequence} object holding the data to send.
         * param reply {@link MessageSequence} object that receives the response.
         * param operations Indicates the synchronous or asynchronous mode to send messages.
         * @returns Promise used to return the {@link RequestResult} instance.
         * @throws { BusinessError } 401 - check param failed
         * @since 9
         */
        sendMessageRequest(code: number, data: MessageSequence, reply: MessageSequence, options: MessageOption): Promise<RequestResult>;

        /**
         * Sends a {@link MessageParcel} message to the peer process in synchronous or asynchronous mode.
         *
         * <p>If options indicates the asynchronous mode, a callback will be invoked immediately
         * and the reply message does not contain any content. If options indicates the synchronous mode,
         * a callback will be invoked when the response to sendRequest is returned,
         * and the reply message contains the returned information.
         * param code Message code called by the request, which is determined by the client and server.
         * If the method is generated by an IDL tool, the message code is automatically generated by the IDL tool.
         * param data {@link MessageParcel} object holding the data to send.
         * param reply {@link MessageParcel} object that receives the response.
         * param operations Indicates the synchronous or asynchronous mode to send messages.
         * param callback Callback for receiving the sending result.
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.rpc.IRemoteObject#sendMessageRequest
         *
         */
        sendRequest(code: number, data: MessageParcel, reply: MessageParcel, options: MessageOption, callback: AsyncCallback<SendRequestResult>): void;

        /**
         * Sends a {@link MessageSequence} message to the peer process in synchronous or asynchronous mode.
         *
         * <p>If options indicates the asynchronous mode, a callback will be invoked immediately
         * and the reply message does not contain any content. If options indicates the synchronous mode,
         * a callback will be invoked when the response to sendMessageRequest is returned,
         * and the reply message contains the returned information.
         * param code Message code called by the request, which is determined by the client and server.
         * If the method is generated by an IDL tool, the message code is automatically generated by the IDL tool.
         * param data {@link MessageSequence} object holding the data to send.
         * param reply {@link MessageSequence} object that receives the response.
         * param operations Indicates the synchronous or asynchronous mode to send messages.
         * param callback Callback for receiving the sending result.
         * @throws { BusinessError } 401 - check param failed
         * @since 9
         */
        sendMessageRequest(code: number, data: MessageSequence, reply: MessageSequence, options: MessageOption, callback: AsyncCallback<RequestResult>): void;

        /**
         * Register a callback used to receive notifications of the death of a remote object.
         *
         * @param recipient Indicates the callback to be registered.
         * @param flags Indicates the flag of the death notification.
         * @returns Return {@code true} if the callback is registered successfully; return {@code false} otherwise.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.rpc.IRemoteObject#registerDeathRecipient
         */
        addDeathRecipient(recipient: DeathRecipient, flags: number): boolean;

        /**
         * Register a callback used to receive notifications of the death of a remote object.
         *
         * @param recipient Indicates the callback to be registered.
         * @param flags Indicates the flag of the death notification.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900008 - proxy or remote object is invalid
         * @since 9
         */
        registerDeathRecipient(recipient: DeathRecipient, flags: number): void;

        /**
         * Unregister a callback used to receive notifications of the death of a remote object.
         *
         * @param recipient Indicates the callback to be unregister.
         * @param flags Indicates the flag of the death notification.
         * @returns Return {@code true} if the callback is unregister successfully; return {@code false} otherwise.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.rpc.IRemoteObject#unregisterDeathRecipient
         */
        removeDeathRecipient(recipient: DeathRecipient, flags: number): boolean;

        /**
         * Unregister a callback used to receive notifications of the death of a remote object.
         *
         * @param recipient Indicates the callback to be unregister.
         * @param flags Indicates the flag of the death notification.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900008 - proxy or remote object is invalid
         * @since 9
         */
        unregisterDeathRecipient(recipient: DeathRecipient, flags: number): void;

        /**
         * Obtains the interface descriptor of an object.
         *
         * <p>The interface descriptor is a character string.
         *
         * @returns Return the interface descriptor.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.rpc.IRemoteObject#getDescriptor
         */
        getInterfaceDescriptor(): string;

        /**
         * Obtains the interface descriptor of an object.
         *
         * <p>The interface descriptor is a character string.
         *
         * @returns Return the interface descriptor.
         * @throws { BusinessError } 1900008 - proxy or remote object is invalid
         * @since 9
         */
        getDescriptor(): string;

        /**
         * Checks whether an object is dead.
         *
         * @returns Return {@code true} if the object is dead; return {@code false} otherwise.
         * @since 7
         */
        isObjectDead(): boolean;
    }

    /**
     * @syscap SystemCapability.Communication.IPC.Core
     * @since 7
     */
    interface IRemoteBroker {
        /**
         * Obtains a proxy or remote object. This method must be implemented by its derived classes.
         *
         * @returns Return the RemoteObject if the caller is a RemoteObject; return the IRemoteObject,
         * that is, the holder of this RemoteProxy object, if the caller is a RemoteProxy object.
         * @since 7
         */
        asObject(): IRemoteObject;
    }

    /**
     * @since 7
     * @syscap SystemCapability.Communication.IPC.Core
     */
    interface DeathRecipient {
        /**
         * Called to perform subsequent operations when a death notification of the remote object is received.
         *
         * @since 7
         */
        onRemoteDied(): void;
    }

    /**
     * @syscap SystemCapability.Communication.IPC.Core
     * @since 7
     */
    class MessageOption {
        /**
         * Indicates synchronous call.
         *
         * @constant
         * @default 0
         * @since 7
         */
        TF_SYNC: number;

        /**
         * Indicates asynchronous call.
         *
         * @constant
         * @default 1
         * @since 7
         */
        TF_ASYNC: number;

        /**
         * Indicates the sendRequest API for returning the file descriptor.
         *
         * @constant
         * @default 16
         * @since 7
         */
        TF_ACCEPT_FDS: number;

        /**
         * Indicates the wait time for RPC, in seconds. It is NOT used in IPC case.
         *
         * @constant
         * @default 4
         * @since 7
         */
        TF_WAIT_TIME: number;

        /**
         * A constructor used to create a MessageOption instance.
         *
         * @param syncFlags Specifies whether the SendRequest is called synchronously (default) or asynchronously.
         * @param waitTime Maximum wait time for a RPC call. The default value is TF_WAIT_TIME.
         * @since 7
         */
        constructor(syncFlags?: number, waitTime?: number);

        /**
         * A constructor used to create a MessageOption instance.
         *
         * @param async Specifies whether the SendRequest is called synchronously (default) or asynchronously.
         * @param waitTime Maximum wait time for a RPC call.
         * @since 9
         */
        constructor(async?: boolean);

        /**
         * Obtains the SendRequest call flag, which can be synchronous or asynchronous.
         *
         * @returns Return whether the SendRequest is called synchronously or asynchronously.
         * @since 7
         */
        getFlags(): number;

        /**
         * Sets the SendRequest call flag, which can be synchronous or asynchronous.
         *
         * @param flags Indicates the call flag, which can be synchronous or asynchronous.
         * @since 7
         */
        setFlags(flags: number): void;

        /**
         * Obtains the SendRequest call flag, which can be synchronous or asynchronous.
         *
         * @returns Return whether the SendRequest is called synchronously or asynchronously.
         * @since 9
         */
        isAsync(): boolean;

        /**
         * Sets the SendRequest call flag, which can be synchronous or asynchronous.
         *
         * @param flags Indicates the call flag, which can be synchronous or asynchronous.
         * @since 9
         */
        setAsync(async: boolean): void;

        /**
         * Obtains the maximum wait time for this RPC call.
         *
         * @returns Return maximum wait time obtained.
         * @since 7
         */
        getWaitTime(): number;

        /**
         * Sets the maximum wait time for this RPC call.
         *
         * @param waitTime Indicates maximum wait time to set.
         * @since 7
         */
        setWaitTime(waitTime: number): void;
    }

    /**
     * @syscap SystemCapability.Communication.IPC.Core
     * @since 7
     */
    class RemoteObject extends IRemoteObject {
        /**
         * A constructor to create a RemoteObject instance.
         *
         * @param descriptor Specifies interface descriptor.
         * @since 7
         */
        constructor(descriptor: string);

        /**
         * Queries a remote object using an interface descriptor.
         *
         * @param descriptor Indicates the interface descriptor used to query the remote object.
         * @returns Return the remote object matching the interface descriptor; return null
         * if no such remote object is found.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.rpc.RemoteObject#getLocalInterface
         */
        queryLocalInterface(descriptor: string): IRemoteBroker;

        /**
         * Queries a remote object using an interface descriptor.
         *
         * @param descriptor Indicates the interface descriptor used to query the remote object.
         * @returns Return the remote object matching the interface descriptor; return null
         * if no such remote object is found.
         * @throws { BusinessError } 401 - check param failed
         * @since 9
         */
        getLocalInterface(descriptor: string): IRemoteBroker;

        /**
         * Queries an interface descriptor.
         *
         * @returns Return the interface descriptor.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.rpc.RemoteObject#getDescriptor
         */
        getInterfaceDescriptor(): string;

        /**
         * Queries an interface descriptor.
         *
         * @returns Return the interface descriptor.
         * @throws { BusinessError } 1900008 - proxy or remote object is invalid
         * @since 9
         */
        getDescriptor(): string;

        /**
         * Sets an entry for receiving requests.
         *
         * <p>This method is implemented by the remote service provider. You need to override this method with
         * your own service logic when you are using IPC.
         *
         * @param code Indicates the service request code sent from the peer end.
         * @param data Indicates the {@link MessageParcel} object sent from the peer end.
         * @param reply Indicates the response message object sent from the remote service.
         * The local service writes the response data to the {@link MessageParcel} object.
         * @param options Indicates whether the operation is synchronous or asynchronous.
         * @returns
         * Return a simple boolean which is {@code true} if the operation succeeds; {{@code false} otherwise} when the function call is synchronous.
         * Return a promise object with a boolean when the function call is asynchronous.
         * @since 9
         */
        onRemoteMessageRequest(code: number, data: MessageSequence, reply: MessageSequence, options: MessageOption): boolean | Promise<boolean>;

        /**
         * Sets an entry for receiving requests.
         *
         * <p>This method is implemented by the remote service provider. You need to override this method with
         * your own service logic when you are using IPC.
         *
         * @param code Indicates the service request code sent from the peer end.
         * @param data Indicates the {@link MessageParcel} object sent from the peer end.
         * @param reply Indicates the response message object sent from the remote service.
         * The local service writes the response data to the {@link MessageParcel} object.
         * @param options Indicates whether the operation is synchronous or asynchronous.
         * @returns Return {@code true} if the operation succeeds; return {@code false} otherwise.
         * @throws RemoteException Throws this exception if a remote service error occurs.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.rpc.RemoteObject#onRemoteMessageRequest
         */
        onRemoteRequest(code: number, data: MessageParcel, reply: MessageParcel, options: MessageOption): boolean;

        /**
         * Sends a request to the peer object.
         *
         * <p>If the peer object and {@code RemoteObject} are on the same device, the request is sent by the IPC driver.
         * If they are on different devices, the request is sent by the socket driver.
         *
         * @param code Indicates the message code of the request.
         * @param data Indicates the {@link MessageParcel} object storing the data to be sent.
         * @param reply Indicates the {@link MessageParcel} object receiving the response data.
         * @param options Indicates a synchronous (default) or asynchronous request.
         * @returns Return {@code true} if the operation succeeds; return {@code false} otherwise.
         * @since 7
         * @deprecated since 8
         */
        sendRequest(code: number, data: MessageParcel, reply: MessageParcel, options: MessageOption): boolean;

        /**
         * Sends a {@link MessageParcel} message to the peer process in synchronous or asynchronous mode.
         *
         * <p>If options indicates the asynchronous mode, a promise will be fulfilled immediately
         * and the reply message does not contain any content. If options indicates the synchronous mode,
         * a promise will be fulfilled when the response to sendRequest is returned,
         * and the reply message contains the returned information.
         * param code Message code called by the request, which is determined by the client and server.
         * If the method is generated by an IDL tool, the message code is automatically generated by the IDL tool.
         * param data {@link MessageParcel} object holding the data to send.
         * param reply {@link MessageParcel} object that receives the response.
         * param operations Indicates the synchronous or asynchronous mode to send messages.
         * @returns Promise used to return the {@link SendRequestResult} instance.
         * @throws Throws an exception if the method fails to be called.
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.rpc.RemoteObject#sendMessageRequest
         */
        sendRequest(code: number, data: MessageParcel, reply: MessageParcel, options: MessageOption): Promise<SendRequestResult>;

        /**
         * Sends a {@link MessageSequence} message to the peer process in synchronous or asynchronous mode.
         *
         * <p>If options indicates the asynchronous mode, a promise will be fulfilled immediately
         * and the reply message does not contain any content. If options indicates the synchronous mode,
         * a promise will be fulfilled when the response to sendMessageRequest is returned,
         * and the reply message contains the returned information.
         * param code Message code called by the request, which is determined by the client and server.
         * If the method is generated by an IDL tool, the message code is automatically generated by the IDL tool.
         * param data {@link MessageSequence} object holding the data to send.
         * param reply {@link MessageSequence} object that receives the response.
         * param operations Indicates the synchronous or asynchronous mode to send messages.
         * @returns Promise used to return the {@link RequestResult} instance.
         * @throws { BusinessError } 401 - check param failed
         * @since 9
         */
        sendMessageRequest(code: number, data: MessageSequence, reply: MessageSequence, options: MessageOption): Promise<RequestResult>;

        /**
         * Sends a {@link MessageParcel} message to the peer process in synchronous or asynchronous mode.
         *
         * <p>If options indicates the asynchronous mode, a callback will be invoked immediately
         * and the reply message does not contain any content. If options indicates the synchronous mode,
         * a callback will be invoked when the response to sendRequest is returned,
         * and the reply message contains the returned information.
         * param code Message code called by the request, which is determined by the client and server.
         * If the method is generated by an IDL tool, the message code is automatically generated by the IDL tool.
         * param data {@link MessageParcel} object holding the data to send.
         * param reply {@link MessageParcel} object that receives the response.
         * param operations Indicates the synchronous or asynchronous mode to send messages.
         * param callback Callback for receiving the sending result.
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.rpc.RemoteObject#sendMessageRequest
         */
        sendRequest(code: number, data: MessageParcel, reply: MessageParcel, options: MessageOption, callback: AsyncCallback<SendRequestResult>): void;

        /**
         * Sends a {@link MessageSequence} message to the peer process in synchronous or asynchronous mode.
         *
         * <p>If options indicates the asynchronous mode, a callback will be invoked immediately
         * and the reply message does not contain any content. If options indicates the synchronous mode,
         * a callback will be invoked when the response to sendMessageRequest is returned,
         * and the reply message contains the returned information.
         * param code Message code called by the request, which is determined by the client and server.
         * If the method is generated by an IDL tool, the message code is automatically generated by the IDL tool.
         * param data {@link MessageSequence} object holding the data to send.
         * param reply {@link MessageSequence} object that receives the response.
         * param operations Indicates the synchronous or asynchronous mode to send messages.
         * param callback Callback for receiving the sending result.
         * @throws { BusinessError } 401 - check param failed
         * @since 9
         */
        sendMessageRequest(code: number, data: MessageSequence, reply: MessageSequence, options: MessageOption, callback: AsyncCallback<RequestResult>): void;

        /**
         * Obtains the PID of the {@link RemoteProxy} object.
         *
         * @returns Return the PID of the {@link RemoteProxy} object.
         * @since 7
         */
        getCallingPid(): number;

        /**
         * Obtains the UID of the {@link RemoteProxy} object.
         *
         * @returns Return the UID of the {@link RemoteProxy} object.
         * @since 7
         */
        getCallingUid(): number;

        /**
         * Modifies the description of the current {@code RemoteObject}.
         *
         * <p>This method is used to change the default descriptor specified during the creation of {@code RemoteObject}.
         *
         * @param localInterface Indicates the {@code RemoteObject} whose descriptor is to be changed.
         * @param descriptor Indicates the new descriptor of the {@code RemoteObject}.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.rpc.RemoteObject#modifyLocalInterface
         */
        attachLocalInterface(localInterface: IRemoteBroker, descriptor: string): void;

        /**
         * Modifies the description of the current {@code RemoteObject}.
         *
         * <p>This method is used to change the default descriptor specified during the creation of {@code RemoteObject}.
         *
         * @param localInterface Indicates the {@code RemoteObject} whose descriptor is to be changed.
         * @param descriptor Indicates the new descriptor of the {@code RemoteObject}.
         * @throws { BusinessError } 401 - check param failed
         * @since 9
         */
        modifyLocalInterface(localInterface: IRemoteBroker, descriptor: string): void;
    }

    /**
     * @syscap SystemCapability.Communication.IPC.Core
     * @since 7
     */
    class RemoteProxy implements IRemoteObject {
        /**
         * Indicates the message code for a Ping operation.
         *
         * @constant
         * @default 1599098439
         * @since 7
         */
        PING_TRANSACTION: number;

        /**
         * Indicates the message code for a dump operation.
         *
         * @constant
         * @default 1598311760
         * @since 7
         */
        DUMP_TRANSACTION: number;

        /**
         * Indicates the message code for a transmission.
         *
         * @constant
         * @default 1598968902
         * @since 7
         */
        INTERFACE_TRANSACTION: number;

        /**
         * Indicates the minimum value of a valid message code.
         *
         * <p>This constant is used to check the validity of an operation.
         *
         * @constant
         * @default 0x1
         * @since 7
         */
        MIN_TRANSACTION_ID: number;

        /**
         * Indicates the maximum value of a valid message code.
         *
         * <p>This constant is used to check the validity of an operation.
         *
         * @constant
         * @default 0x00FFFFFF
         * @since 7
         */
        MAX_TRANSACTION_ID: number;

        /**
         * Queries a local interface with a specified descriptor.
         *
         * @param descriptor Indicates the descriptor of the interface to query.
         * @returns Return null by default, indicating a proxy interface.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.rpc.RemoteProxy#getLocalInterface
         */
        queryLocalInterface(interface: string): IRemoteBroker;

        /**
         * Queries a local interface with a specified descriptor.
         *
         * @param descriptor Indicates the descriptor of the interface to query.
         * @returns Return null by default, indicating a proxy interface.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900006 - only remote object permitted
         * @since 9
         */
        getLocalInterface(interface: string): IRemoteBroker;

        /**
         * Register a callback used to receive death notifications of a remote object.
         *
         * @param recipient Indicates the callback to be registered.
         * @param flags Indicates the flag of the death notification. This is a reserved parameter. Set it to {@code 0}.
         * @returns Return {@code true} if the callback is registered successfully; return {@code false} otherwise.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.rpc.RemoteProxy#registerDeathRecipient
         */
        addDeathRecipient(recipient: DeathRecipient, flags: number): boolean;

        /**
         * Register a callback used to receive death notifications of a remote object.
         *
         * @param recipient Indicates the callback to be registered.
         * @param flags Indicates the flag of the death notification. This is a reserved parameter. Set it to {@code 0}.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900008 - proxy or remote object is invalid
         * @since 9
         */
        registerDeathRecipient(recipient: DeathRecipient, flags: number): void;

        /**
         * Unregister a callback used to receive death notifications of a remote object.
         *
         * @param recipient Indicates the callback to be unregister.
         * @param flags Indicates the flag of the death notification. This is a reserved parameter. Set it to {@code 0}.
         * @returns Return {@code true} if the callback is unregister successfully; return {@code false} otherwise.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.rpc.RemoteProxy#unregisterDeathRecipient
         */
        removeDeathRecipient(recipient: DeathRecipient, flags: number): boolean;

        /**
         * Unregister a callback used to receive death notifications of a remote object.
         *
         * @param recipient Indicates the callback to be unregister.
         * @param flags Indicates the flag of the death notification. This is a reserved parameter. Set it to {@code 0}.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900008 - proxy or remote object is invalid
         * @since 9
         */
        unregisterDeathRecipient(recipient: DeathRecipient, flags: number): void;

        /**
         * Queries the interface descriptor of remote object.
         *
         * @returns Return the interface descriptor.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.rpc.RemoteProxy#getDescriptor
         */
        getInterfaceDescriptor(): string;

        /**
         * Queries the interface descriptor of remote object.
         *
         * @returns Return the interface descriptor.
         * @throws { BusinessError } 1900007 - communication failed
         * @throws { BusinessError } 1900008 - proxy or remote object is invalid
         * @since 9
         */
        getDescriptor(): string;

        /**
         * Sends a request to the peer object.
         *
         * <p>If the peer object and {@code RemoteProxy} are on the same device, the request is sent by the IPC driver.
         * If they are on different devices, the request is sent by the socket driver.
         *
         * @param code Indicates the message code of the request.
         * @param data Indicates the {@link MessageParcel} object storing the data to be sent.
         * @param reply Indicates the {@link MessageParcel} object receiving the response data.
         * @param options Indicates a synchronous (default) or asynchronous request.
         * @returns Return {@code true} if the operation succeeds; return {@code false} otherwise.
         * @throws RemoteException Throws this exception if a remote object exception occurs.
         * @since 7
         * @deprecated since 8
         */
        sendRequest(code: number, data: MessageParcel, reply: MessageParcel, options: MessageOption): boolean;

        /**
         * Sends a {@link MessageParcel} message to the peer process in synchronous or asynchronous mode.
         *
         * <p>If options indicates the asynchronous mode, a promise will be fulfilled immediately
         * and the reply message does not contain any content. If options indicates the synchronous mode,
         * a promise will be fulfilled when the response to sendRequest is returned,
         * and the reply message contains the returned information.
         * param code Message code called by the request, which is determined by the client and server.
         * If the method is generated by an IDL tool, the message code is automatically generated by the IDL tool.
         * param data {@link MessageParcel} object holding the data to send.
         * param reply {@link MessageParcel} object that receives the response.
         * param operations Indicates the synchronous or asynchronous mode to send messages.
         * @returns Promise used to return the {@link sendRequestResult} instance.
         * @throws Throws an exception if the method fails to be called.
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.rpc.RemoteProxy#sendMessageRequest
         */
        sendRequest(code: number, data: MessageParcel, reply: MessageParcel, options: MessageOption): Promise<SendRequestResult>;

        /**
         * Sends a {@link MessageSequence} message to the peer process in synchronous or asynchronous mode.
         *
         * <p>If options indicates the asynchronous mode, a promise will be fulfilled immediately
         * and the reply message does not contain any content. If options indicates the synchronous mode,
         * a promise will be fulfilled when the response to sendMessageRequest is returned,
         * and the reply message contains the returned information.
         * param code Message code called by the request, which is determined by the client and server.
         * If the method is generated by an IDL tool, the message code is automatically generated by the IDL tool.
         * param data {@link MessageSequence} object holding the data to send.
         * param reply {@link MessageSequence} object that receives the response.
         * param operations Indicates the synchronous or asynchronous mode to send messages.
         * @returns Promise used to return the {@link RequestResult} instance.
         * @throws { BusinessError } 401 - check param failed
         * @since 9
         */
        sendMessageRequest(code: number, data: MessageSequence, reply: MessageSequence, options: MessageOption): Promise<RequestResult>;

        /**
         * Sends a {@link MessageParcel} message to the peer process in synchronous or asynchronous mode.
         *
         * <p>If options indicates the asynchronous mode, a callback will be invoked immediately
         * and the reply message does not contain any content. If options indicates the synchronous mode,
         * a callback will be invoked when the response to sendRequest is returned,
         * and the reply message contains the returned information.
         * param code Message code called by the request, which is determined by the client and server.
         * If the method is generated by an IDL tool, the message code is automatically generated by the IDL tool.
         * param data {@link MessageParcel} object holding the data to send.
         * param reply {@link MessageParcel} object that receives the response.
         * param operations Indicates the synchronous or asynchronous mode to send messages.
         * param callback Callback for receiving the sending result.
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.rpc.RemoteProxy#sendMessageRequest
         */
        sendRequest(code: number, data: MessageParcel, reply: MessageParcel, options: MessageOption, callback: AsyncCallback<SendRequestResult>): void;

        /**
         * Sends a {@link MessageSequence} message to the peer process in synchronous or asynchronous mode.
         *
         * <p>If options indicates the asynchronous mode, a callback will be invoked immediately
         * and the reply message does not contain any content. If options indicates the synchronous mode,
         * a callback will be invoked when the response to sendRequest is returned,
         * and the reply message contains the returned information.
         * param code Message code called by the request, which is determined by the client and server.
         * If the method is generated by an IDL tool, the message code is automatically generated by the IDL tool.
         * param data {@link MessageSequence} object holding the data to send.
         * param reply {@link MessageSequence} object that receives the response.
         * param operations Indicates the synchronous or asynchronous mode to send messages.
         * param callback Callback for receiving the sending result.
         * @throws { BusinessError } 401 - check param failed
         * @since 9
         */
        sendMessageRequest(code: number, data: MessageSequence, reply: MessageSequence, options: MessageOption, callback: AsyncCallback<RequestResult>): void;

        /**
         * Checks whether the {@code RemoteObject} corresponding to a {@code RemoteProxy} is dead.
         *
         * @returns Return {@code true} if the {@code RemoteObject} is dead; return {@code false} otherwise.
         * @since 7
         */
        isObjectDead(): boolean;
    }

    /**
     * @syscap SystemCapability.Communication.IPC.Core
     * @since 7
     */
    class IPCSkeleton {
        /**
         * Obtains a local {@link IRemoteObject} reference of a registered service.
         *
         * <p>This method is static.
         *
         * @returns Return an {@link IRemoteObject} reference of the registered service.
         * @since 7
         */
        static getContextObject(): IRemoteObject;

        /**
         * Obtains the PID of a proxy.
         *
         * <p>This method is static. The PID is a positive integer during the communication between
         * the {@link RemoteProxy} object and {@link RemoteObject} object, and resumes to {@code 0}
         * when the communication ends. If this method is called from the {@link RemoteProxy} object,
         * {@code 0} is returned; if this method is called from the {@link RemoteObject} object,
         * the PID of the corresponding {@link RemoteProxy} object is returned.
         *
         * @returns Return the PID of the proxy.
         * @since 7
         */
        static getCallingPid(): number;

        /**
         * Obtains the UID of a proxy.
         *
         * <p>This method is static. The UID is a positive integer during the communication between
         * the {@link RemoteProxy} object and {@link RemoteObject} object, and resumes to {@code 0}
         * when the communication ends. If this method is called from the {@link RemoteProxy} object,
         * {@code 0} is returned; if this method is called from the {@link RemoteObject} object,
         * the UID of the corresponding {@link RemoteProxy} object is returned.
         *
         * @returns Return the UID of the proxy.
         * @since 7
         */
        static getCallingUid(): number;

        /**
         * Obtains the TOKENID.
         *
         * <p>This method is static.
         *
         * @returns Return the TOKENID.
         * @since 8
         */
        static getCallingTokenId(): number;

        /**
         * Obtains the ID of the device where the peer process resides.
         *
         * <p>This method is static.
         *
         * @returns Return the ID of the device where the peer process resides.
         * @since 7
         */
        static getCallingDeviceID(): string;

        /**
         * Obtains the ID of the local device.
         *
         * <p>This method is static.
         *
         * @returns Return the ID of the local device.
         * @since 7
         */
        static getLocalDeviceID(): string;

        /**
         * Checks whether a call is made on the same device.
         *
         * <p>This method is static.
         *
         * @returns Return {@code true} if the call is made on the same device; return {@code false} otherwise.
         * @since 7
         */
        static isLocalCalling(): boolean;

        /**
         * Flush all pending commands from a specified {@link RemoteProxy} to the corresponding {@link RemoteObject}.
         *
         * <p>This method is static. You are advised to call this method before performing any time-sensitive operations.
         *
         * @param object Indicates the specified {@link RemoteProxy}.
         * @returns Return {@code 0} if the operation succeeds; return an error code if the input object is empty
         * or {@link RemoteObject}, or the operation fails.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.rpc.IPCSkeleton#flushCmdBuffer
         */
        static flushCommands(object: IRemoteObject): number;

        /**
         * Flush all pending commands from a specified {@link RemoteProxy} to the corresponding {@link RemoteObject}.
         *
         * <p>This method is static. You are advised to call this method before performing any time-sensitive operations.
         *
         * @param object Indicates the specified {@link RemoteProxy}.
         * @throws { BusinessError } 401 - check param failed
         * @since 9
         */
        static flushCmdBuffer(object: IRemoteObject): void;

        /**
         * Replaces the UID and PID of the remote user with those of the local user.
         *
         * <p>This method is static. It can be used in scenarios like authentication.
         *
         * @returns Return a string containing the UID and PID of the remote user.
         * @since 7
         */
        static resetCallingIdentity(): string;

        /**
         * Restore the UID and PID to those of the remote user.
         *
         * <p>This method is static. It is usually called after {@code resetCallingIdentity} is used
         * and requires the UID and PID of the remote user returned by {@code resetCallingIdentity}.
         *
         * @param identity Indicates the string containing the UID and PID of the remote user,
         * which is returned by {@code resetCallingIdentity}.
         * @returns Return {@code true} if the operation succeeds; return {@code false} otherwise.
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.rpc.IPCSkeleton#restoreCallingIdentity
         */
        static setCallingIdentity(identity: string): boolean;

        /**
         * Restore the UID and PID to those of the remote user.
         *
         * <p>This method is static. It is usually called after {@code resetCallingIdentity} is used
         * and requires the UID and PID of the remote user returned by {@code resetCallingIdentity}.
         *
         * @param identity Indicates the string containing the UID and PID of the remote user,
         * which is returned by {@code resetCallingIdentity}.
         * @throws { BusinessError } 401 - check param failed
         * @since 9
         */
        static restoreCallingIdentity(identity: string): void;
    }

    /**
     * Provides methods related to anonymous shared memory objects,
     * including creating, closing, mapping, and unmapping an Ashmem object,
     * reading data from and writing data to an Ashmem object,
     * obtaining the Ashmem size, and setting Ashmem protection.
     * @syscap SystemCapability.Communication.IPC.Core
     * @since 8
     */
    class Ashmem {
        /**
         * The mapped memory is executable.
         *
         * @constant
         * @default 4
         * @since 8
         */
        PROT_EXEC: number;

        /**
         * The mapped memory is inaccessible.
         *
         * @constant
         * @default 0
         * @since 8
         */
        PROT_NONE: number;

        /**
         * The mapped memory is readable.
         *
         * @constant
         * @default 1
         * @since 8
         */
        PROT_READ: number;

        /**
         * The mapped memory is writable.
         *
         * @constant
         * @default 2
         * @since 8
         */
        PROT_WRITE: number;

        /**
         * Creates an Ashmem object with the specified name and size.
         * @param name Name of the Ashmem object to create.
         * @param size Size (in bytes) of the Ashmem object to create.
         * @returns Return the Ashmem object if it is created successfully; return null otherwise.
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.rpc.Ashmem#create
         */
        static createAshmem(name: string, size: number): Ashmem;

        /**
         * Creates an Ashmem object with the specified name and size.
         * @param name Name of the Ashmem object to create.
         * @param size Size (in bytes) of the Ashmem object to create.
         * @returns Return the Ashmem object if it is created successfully; return null otherwise.
         * @throws { BusinessError } 401 - check param failed
         * @since 9
         */
        static create(name: string, size: number): Ashmem;

        /**
         * Creates an Ashmem object by copying the file descriptor (FD) of an existing Ashmem object.
         * The two Ashmem objects point to the same shared memory region.
         * @param ashmem Existing Ashmem object.
         * @returns Ashmem object created.
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.rpc.Ashmem#create
         */
        static createAshmemFromExisting(ashmem: Ashmem): Ashmem;

        /**
         * Creates an Ashmem object by copying the file descriptor (FD) of an existing Ashmem object.
         * The two Ashmem objects point to the same shared memory region.
         * @param ashmem Existing Ashmem object.
         * @returns Ashmem object created.
         * @throws { BusinessError } 401 - check param failed
         * @since 9
         */
        static create(ashmem: Ashmem): Ashmem;

        /**
         * Closes this Ashmem object.
         * @since 8
         */
        closeAshmem(): void;

        /**
         * Deletes the mappings for the specified address range of this Ashmem object.
         * @since 8
         */
        unmapAshmem(): void;

        /**
         * Obtains the mapped memory size of this Ashmem object.
         * @returns Memory size mapped.
         * @since 8
         */
        getAshmemSize(): number;

        /**
         * Creates the shared file mapping on the virtual address space of this process.
         * The size of the mapping region is specified by this Ashmem object.
         * @param mapType Protection level of the memory region to which the shared file is mapped.
         * @returns Return true if the operation is successful; return false otherwise.
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.rpc.Ashmem#mapTypedAshmem
         */
        mapAshmem(mapType: number): boolean;

        /**
         * Creates the shared file mapping on the virtual address space of this process.
         * The size of the mapping region is specified by this Ashmem object.
         * @param mapType Protection level of the memory region to which the shared file is mapped.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900001 - call mmap function failed
         * @since 9
         */
        mapTypedAshmem(mapType: number): void;

        /**
         * Maps the shared file to the readable and writable virtual address space of the process.
         * @returns Return true if the operation is successful; return false otherwise.
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.rpc.Ashmem#mapReadWriteAshmem
         */
        mapReadAndWriteAshmem(): boolean;

        /**
         * Maps the shared file to the readable and writable virtual address space of the process.
         * @throws { BusinessError } 1900001 - call mmap function failed
         * @since 9
         */
        mapReadWriteAshmem(): void;

        /**
         * Maps the shared file to the read-only virtual address space of the process.
         * @returns Return true if the operation is successful; return false otherwise.
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.rpc.Ashmem#mapReadonlyAshmem
         */
        mapReadOnlyAshmem(): boolean;

        /**
         * Maps the shared file to the read-only virtual address space of the process.
         * @throws { BusinessError } 1900001 - call mmap function failed
         * @since 9
         */
        mapReadonlyAshmem(): void;

        /**
         * Sets the protection level of the memory region to which the shared file is mapped.
         * @param protectionType Protection type to set.
         * @returns Return true if the operation is successful; return false otherwise.
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.rpc.Ashmem#setProtectionType
         */
        setProtection(protectionType: number): boolean;

        /**
         * Sets the protection level of the memory region to which the shared file is mapped.
         * @param protectionType Protection type to set.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900002 - os ioctl function failed
         * @since 9
         */
        setProtectionType(protectionType: number): void;

        /**
         * Writes data to the shared file associated with this Ashmem object.
         * @param buf Data to write
         * @param size Size of the data to write
         * @param offset Start position of the data to write in the memory region associated with this Ashmem object.
         * @returns Return true is the data is written successfully; return false otherwise.
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.rpc.Ashmem#writeAshmem
         */
        writeToAshmem(buf: number[], size: number, offset: number): boolean;

        /**
         * Writes data to the shared file associated with this Ashmem object.
         * @param buf Data to write
         * @param size Size of the data to write
         * @param offset Start position of the data to write in the memory region associated with this Ashmem object.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900003 - write to ashmem failed
         * @since 9
         */
        writeAshmem(buf: number[], size: number, offset: number): void;

        /**
         * Reads data from the shared file associated with this Ashmem object.
         * @param size Size of the data to read.
         * @param offset Start position of the data to read in the memory region associated with this Ashmem object.
         * @returns Data read.
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.rpc.Ashmem#readAshmem
         */
        readFromAshmem(size: number, offset: number): number[];

        /**
         * Reads data from the shared file associated with this Ashmem object.
         * @param size Size of the data to read.
         * @param offset Start position of the data to read in the memory region associated with this Ashmem object.
         * @returns Data read.
         * @throws { BusinessError } 401 - check param failed
         * @throws { BusinessError } 1900004 - read from ashmem failed
         * @since 9
         */
        readAshmem(size: number, offset: number): number[];
    }
}

export default rpc;