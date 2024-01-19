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

import {AsyncCallback, Callback} from './basic';

/**
 * Provides a set of encryption and decryption algorithm library framework, shields the underlying differences,
 * encapsulate the relevant algorithm library, and provides a unified functional interface upward.
 * @namespace cryptoFramework
 * @syscap SystemCapability.Security.CryptoFramework
 * @since 9
 */
declare namespace cryptoFramework {
    /**
     * Enum for result code.
     * @enum {number}
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    enum Result {
        /** Indicates that input parameters is invalid.
         * @since 9
         */
        INVALID_PARAMS = 401,

        /** Indicates that function or algorithm is not supported.
         * @since 9
         */
        NOT_SUPPORT = 801,

        /** Indicates the memory error.
         * @since 9
         */
        ERR_OUT_OF_MEMORY = 17620001,

        /** Indicates that runtime error.
         * @since 9
         */
        ERR_RUNTIME_ERROR = 17620002,

        /** Indicates that crypto operation error.
         * @since 9
         */
        ERR_CRYPTO_OPERATION = 17630001,
    }

    /**
     * Provides the data blob type.
     * @typedef DataBlob
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    interface DataBlob {
        data : Uint8Array;
    }

    /**
     * Provides the ParamsSpec type, including the algorithm name.
     * @typedef ParamsSpec
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    interface ParamsSpec {
        /**
         * Indicates the algorithm name. Should be set before initialization of a cipher object.
         * @type { string }
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        algName : string;
    }

    /**
     * Provides the IvParamsSpec type, including the parameter iv.
     * @typedef IvParamsSpec
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    interface IvParamsSpec extends ParamsSpec {
        /**
         * Indicates the algorithm parameters such as iv.
         * @type { DataBlob }
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        iv : DataBlob;
    }

    /**
     * Provides the GcmParamsSpec type, including the parameter iv, aad and authTag.
     * @typedef GcmParamsSpec
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    interface GcmParamsSpec extends ParamsSpec {
        /**
         * Indicates the GCM algorithm parameters such as iv.
         * @type { DataBlob }
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        iv : DataBlob;

        /**
         * Indicates the additional Authenticated Data in GCM mode.
         * @type { DataBlob }
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        aad : DataBlob;

        /**
         * Indicates the output tag from the encryption operation. The tag is used for integrity check.
         * @type { DataBlob }
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        authTag : DataBlob;
    }

    /**
     * Provides the CcmParamsSpec type, including the parameter iv, aad and authTag.
     * @typedef CcmParamsSpec
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    interface CcmParamsSpec extends ParamsSpec {
        /**
         * Indicates the GCM algorithm parameters such as IV.
         * @type { DataBlob }
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        iv : DataBlob;

        /**
         * Indicates the Additional Authenticated Data in CCM mode.
         * @type { DataBlob }
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        aad : DataBlob;

        /**
         * Indicates the output tag from the encryption operation. The tag is used for integrity check.
         * @type { DataBlob }
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        authTag : DataBlob;
    }

    /**
     * Enum for obtain the crypto operation.
     * @enum { number }
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    enum CryptoMode {
        /**
         * The value of encryption operation for AES, 3DES and RSA.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        ENCRYPT_MODE = 0,

        /**
         * The value of decryption operation for AES, 3DES and RSA.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        DECRYPT_MODE = 1,
    }

    /**
     * Provides the Key type, which is the common parent class of keys.
     * @typedef Key
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    interface Key {
        /**
         * Encode the key object to binary data.
         * @returns { DataBlob } the binary data of the key object.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        getEncoded() : DataBlob;

        /**
         * Indicates the format of the key object.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        readonly format : string;

        /**
         * Indicates the algorithm name of the key object.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        readonly algName : string;
    }

    /**
     * Provides the SymKey type, which is used for symmetric cryptography.
     * @typedef SymKey
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    interface SymKey extends Key {
        /**
         * Reset the key data to zero in the memory.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        clearMem() : void;
    }

    /**
     * Provides the private key type.
     * @typedef PriKey
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    interface PriKey extends Key {

        /**
         * Clear memory of private key.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        clearMem() : void;
    }

    /**
     * The public key class of asymmetrical key.
     * @typedef PubKey
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    interface PubKey extends Key {}

    /**
     * The keyPair class of  asymmetrical key. Include privateKey and publickey.
     * @typedef KeyPair
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    interface KeyPair {

        /**
         * KeyPair's private key.
         * @type { PriKey }
         * @readonly
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        readonly priKey : PriKey;

        /**
         * KeyPair's public key.
         * @type { PubKey }
         * @readonly
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        readonly pubKey : PubKey;
    }

    /**
     * Provides the random interface.
     * @typedef Random
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    interface Random {
        /**
         * Generate random DataBlob by given length.
         * @param len Indicates the length of random DataBlob.
         * @returns Returns the generated random blob.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        generateRandom(len : number, callback: AsyncCallback<DataBlob>) : void;
        generateRandom(len : number) : Promise<DataBlob>;

        /**
         * Set seed by given DataBlob.
         * @param seed Indicates the seed DataBlob.
         * @throws { BusinessError } 17620001 - memory error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        setSeed(seed : DataBlob) : void;
    }

    /**
     * Provides the rand create func.
     * @returns Returns the created rand instance.
     * @throws { BusinessError } 17620001 - memory error.
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    function createRandom() : Random;

    /**
     * The AsyKeyGenerator provides the ability to generate or convert keyPair.
     * @typedef AsyKeyGenerator
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
     interface AsyKeyGenerator {
        /**
         * Used to generate asymmetric key pair.
         * @param { AsyncCallback<KeyPair> } callback - the callback used to return keypair.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        generateKeyPair(callback : AsyncCallback<KeyPair>) : void;

        /**
         * Used to generate asymmetric key pair.
         * @returns { Promise<KeyPair> } - the promise used to return keypair.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        generateKeyPair() : Promise<KeyPair>;

        /**
         * Used to convert asymmetric key pair .
         * @param { DataBlob } pubKey - the public key data blob.
         * @param { DataBlob } priKey - the private key data blob.
         * @param { AsyncCallback<KeyPair> } callback - the callback used to return keypair.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        convertKey(pubKey : DataBlob, priKey : DataBlob, callback : AsyncCallback<KeyPair>) : void;

        /**
         * Used to convert asymmetric key pair.
         * @param { DataBlob } pubKey - the public key data blob.
         * @param { DataBlob } priKey - the private key data blob.
         * @returns { promise<KeyPair> } - the promise used to return keypair.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        convertKey(pubKey : DataBlob, priKey : DataBlob) : Promise<KeyPair>;

        /**
         * The algName of the AsyKeyGenerator.
         * @type { string }
         * @syscap SystemCapability.Security.CryptoFramework
         * @readonly
         * @since 9
         */
        readonly algName : string;
    }

    /**
     * Provides the SymKeyGenerator type, which is used for generating symmetric key.
     * @typedef SymKeyGenerator
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    interface SymKeyGenerator {
        /**
         * Generate a symmetric key object randomly.
         * @param { AsyncCallback<SymKey> } callback - the callback of generateSymKey.
         * @throws { BusinessError } 17620001 - memory error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        generateSymKey(callback : AsyncCallback<SymKey>) : void;

        /**
         * Generate a symmetric key object randomly.
         * @returns { Promise<SymKey> } the promise returned by the function.
         * @throws { BusinessError } 17620001 - memory error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        generateSymKey() : Promise<SymKey>;

        /**
         * Generate a symmetric key object according to the provided binary key data.
         * @param { AsyncCallback<SymKey> } callback - the callback of generateSymKey.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        convertKey(key : DataBlob, callback : AsyncCallback<SymKey>) : void;

        /**
         * Generate a symmetric key object according to the provided binary key data.
         * @returns { Promise<SymKey> } the promise returned by the function.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        convertKey(key : DataBlob) : Promise<SymKey>;

        /**
         * Indicates the algorithm name of the SymKeyGenerator object.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        readonly algName : string;
    }

    /**
     * Provides the asymmetrical key generator instance func.
     * @param { string } algName Indicates the algorithm name.
     * @returns {AsyKeyGenerator} the generator obj create by algName.
     * @throws { BusinessError } 401 - invalid parameters.
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    function createAsyKeyGenerator(algName : string) : AsyKeyGenerator;

    /**
     * Create a symmetric key generator according to the given algorithm name.
     * @param { string } algName - indicates the algorithm name.
     * @returns { SymKeyGenerator } the symmetric key generator instance.
     * @throws { BusinessError } 401 - invalid parameters.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    function createSymKeyGenerator(algName : string) : SymKeyGenerator;

    interface Mac {
        /**
         * Init hmac with given SymKey.
         * @param key Indicates the SymKey.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        init(key : SymKey, callback : AsyncCallback<void>) : void;
        init(key : SymKey) : Promise<void>;

        /**
         * Update hmac with DataBlob.
         * @param input Indicates the DataBlob.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        update(input : DataBlob, callback : AsyncCallback<void>) : void;
        update(input : DataBlob) : Promise<void>;

        /**
         * Output the result of hmac calculation.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        doFinal(callback : AsyncCallback<DataBlob>) : void;
        doFinal() : Promise<DataBlob>;

        /**
         * Output the length of hmac result.
         * @returns Returns the length of the hmac result.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        getMacLength() : number;

        /**
         * Indicates the algorithm name.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        readonly algName : string;
    }

    /**
     * Provides the mac create func.
     * @param algName Indicates the mac algorithm name.
     * @returns Returns the created mac instance.
     * @throws { BusinessError } 401 - invalid parameters.
     * @throws { BusinessError } 17620001 - memory error.
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    function createMac(algName : string) : Mac;

    interface Md {
        /**
         * Update md with DataBlob.
         * @param input Indicates the DataBlob.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        update(input : DataBlob, callback : AsyncCallback<void>) : void;
        update(input : DataBlob) : Promise<void>;

        /**
         * Output the result of md calculation.
         * @returns Returns the calculated hmac result.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        digest(callback : AsyncCallback<DataBlob>) : void;
        digest() : Promise<DataBlob>;

        /**
         * Output the length of md result.
         * @returns Returns the length of the hmac result.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        getMdLength() : number;

        /**
         * Indicates the algorithm name.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        readonly algName : string;
    }

    /**
     * Provides the md create func.
     * @param algName Indicates the md algorithm name.
     * @returns Returns the created md instance.
     * @throws { BusinessError } 401 - invalid parameters.
     * @throws { BusinessError } 17620001 - memory error.
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    function createMd(algName : string) : Md;

    /**
     * Provides the Cipher type, which is used for encryption and decryption operations.
     * @typedef Cipher
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    interface Cipher {
        /**
         * Init the crypto operation with the given crypto mode, key and parameters.
         * @param { CryptoMode } opMode - indicates the crypto mode is encryption or decryption.
         * @param { Key } key - indicates the symmetric key or the asymmetric key.
         * @param { ParamsSpec } params - indicates the algorithm parameters such as IV.
         * @param { AsyncCallback<void> } callback - the callback of the init function.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        init(opMode : CryptoMode, key : Key, params : ParamsSpec, callback : AsyncCallback<void>) : void;

        /**
         * Init the crypto operation with the given crypto mode, key and parameters.
         * @param { CryptoMode } opMode - indicates the crypto mode is encryption or decryption.
         * @param { Key } key - indicates the symmetric key or the asymmetric key.
         * @param { ParamsSpec } params - indicates the algorithm parameters such as IV.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        init(opMode : CryptoMode, key : Key, params : ParamsSpec) : Promise<void>;

        /**
         * Update the crypto operation with the input data, and feed back the encrypted or decrypted data
         * this time. RSA is not supported in this function.
         * @param { DataBlob } data - indicates the data to be encrypted or decrypted.
         * @param { AsyncCallback<DataBlob> } callback - the callback of the update function.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        update(data : DataBlob, callback : AsyncCallback<DataBlob>) : void;

        /**
         * Update the crypto operation with the input data, and feed back the encrypted or decrypted data
         * this time. RSA is not supported in this function.
         * @param { DataBlob } data - indicates the data to be encrypted or decrypted.
         * @returns { Promise<DataBlob> } the promise returned by the function.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        update(data : DataBlob) : Promise<DataBlob>;

        /**
         * Finish the crypto operation, encrypt or decrypt the input data, and then feed back the output data.
         * Data cannot be updated after the crypto operation is finished.
         * @param { DataBlob } data - indicates the data to be finally encrypted or decrypted.
         * @param { AsyncCallback<DataBlob> } callback - the callback of the doFinal function.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        doFinal(data : DataBlob, callback : AsyncCallback<DataBlob>) : void;

        /**
         * Finish the crypto operation, encrypt or decrypt the input data, and then feed back the output data.
         * Data cannot be updated after the crypto operation is finished.
         * @param { DataBlob } data - indicates the data to be finally encrypted or decrypted.
         * @returns { Promise<DataBlob> } the promise returned by the function.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        doFinal(data : DataBlob) : Promise<DataBlob>;

        /**
         * Indicates the algorithm name of the Cipher object.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        readonly algName : string;
    }

    /**
     * Create a cipher object for encryption and decryption operations according to the given specifications.
     * Two different Cipher objects should be created when using RSA encryption and decryption,
     * even with the same specifications.
     * @param { string } transformation - Indicates the description to be transformed to cipher specifications.
     * @returns { Cipher } the cipher object returned by the function.
     * @throws { BusinessError } 401 - invalid parameters.
     * @throws { BusinessError } 801 - this operation is not supported.
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    function createCipher(transformation : string) : Cipher;

    /**
     * Provides sign function.
     * @typedef Sign
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    interface Sign {
        /**
         * Used to init environment.
         * @param { PriKey } priKey - the private key.
         * @param { AsyncCallback<void> } callback - return nothing.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        init(priKey : PriKey, callback : AsyncCallback<void>) : void;

         /**
         * Used to init environment.
         * @param { PriKey } priKey - the private key.
         * @returns { promise<void> } - return nothing.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        init(priKey : PriKey) : Promise<void>;

        /**
         * Used to append the message need to be signed.
         * @param { DataBlob } data - the data need to be signed.
         * @param { AsyncCallback<void> } callback - return nothing.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        update(data : DataBlob, callback : AsyncCallback<void>) : void;

        /**
         * Used to append the message need to be signed.
         * @param { DataBlob } data - the data need to be signed.
         * @returns { promise<void> } - return nothing.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        update(data : DataBlob) : Promise<void>;

        /**
         * Used to sign message, include the update data.
         * @param { DataBlob } data - the data need to be signed.
         * @param { AsyncCallback<DataBlob> } callback - return the signed message.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        sign(data : DataBlob, callback : AsyncCallback<DataBlob>) : void;

        /**
         * Used to append the message need to be signed.
         * @param { DataBlob } data - the private key.
         * @returns { promise<DataBlob> } - return the signed message.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        sign(data : DataBlob) : Promise<DataBlob>;

        /**
         * The sign algName.
         * @type { string }
         * @syscap SystemCapability.Security.CryptoFramework
         * @readonly
         * @since 9
         */
        readonly algName : string;
    }

    /**
     * Provides verify function.
     * @typedef Verify
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    interface Verify {
        /**
         * Used to init environment.
         * @param { PubKey } pubKey - the public key.
         * @param { AsyncCallback<void> } callback - return nothing.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        init(pubKey : PubKey, callback : AsyncCallback<void>) : void;

        /**
         * Used to init environment.
         * @param { PubKey } pubKey - the public key.
         * @returns { promise<void> } - return nothing.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        init(pubKey : PubKey) : Promise<void>;

        /**
         * Used to append the message need to be verified.
         * @param { DataBlob } data - the data need to be verified.
         * @param { AsyncCallback<void> } callback - return nothing.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        update(data : DataBlob, callback : AsyncCallback<void>) : void;

        /**
         * Used to append the message need to be verified.
         * @param { DataBlob } data - the data need to be verified.
         * @returns { promise<void> } - return nothing.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        update(data : DataBlob) : Promise<void>;

        /**
         * Used to verify message, include the update data.
         * @param { DataBlob } data - the data need to be verified.
         * @param { DataBlob } signatureData - the signature data.
         * @param { AsyncCallback<boolean> } callback - return the verify result.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        verify(data : DataBlob, signatureData : DataBlob, callback : AsyncCallback<boolean>) : void;

        /**
         * Used to verify message, include the update data.
         * @param { DataBlob } data - the data need to be verified.
         * @param { DataBlob } signatureData - the signature data.
         * @returns { Promise<boolean> } callback - return the verify result.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        verify(data : DataBlob, signatureData : DataBlob) : Promise<boolean>;

        /**
         * Indicates the verify algorithm name.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        readonly algName : string;
    }

    /**
     * Create sign class.
     * @param { string } algName - Indicates the algorithm name and params.
     * @returns { Sign } the sign class.
     * @throws { BusinessError } 401 - invalid parameters.
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    function createSign(algName : string) : Sign;

     /**
      * Create verify class.
      * @param { string } algName - Indicates the algorithm name and params.
      * @returns { Verify } the verify class.
      * @throws { BusinessError } 401 - invalid parameters.
      * @syscap SystemCapability.Security.CryptoFramework
      * @since 9
      */
     function createVerify(algName : string) : Verify;

    /**
     * Provides key agreement function.
     * @typedef KeyAgreement
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
     interface KeyAgreement {
        /**
         * Used to generate secret.
         * @param { PriKey } priKey - the private key.
         * @param { PubKey } pubKey - the public key.
         * @param { AsyncCallback<DataBlob> } callback - return the secret.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        generateSecret(priKey : PriKey, pubKey : PubKey, callback : AsyncCallback<DataBlob>) : void;

        /**
         * Used to generate secret.
         * @param { PriKey } priKey - the private key.
         * @param { PubKey } pubKey - the public key.
         * @returns { Promise<DataBlob> } the promise used to return secret.
         * @throws { BusinessError } 401 - invalid parameters.
         * @throws { BusinessError } 17620001 - memory error.
         * @throws { BusinessError } 17620002 - runtime error.
         * @throws { BusinessError } 17630001 - crypto operation error.
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        generateSecret(priKey : PriKey, pubKey : PubKey) : Promise<DataBlob>;

        /**
         * Indicates the algorithm name.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Security.CryptoFramework
         * @since 9
         */
        readonly algName : string;
    }

    /**
     * Create key agreement class.
     * @param { string } algName - Indicates the algorithm name and params.
     * @returns { KeyAgreement } the key agreement class.
     * @throws { BusinessError } 401 - invalid parameters.
     * @syscap SystemCapability.Security.CryptoFramework
     * @since 9
     */
    function createKeyAgreement(algName : string) : KeyAgreement;
}

export default cryptoFramework;
