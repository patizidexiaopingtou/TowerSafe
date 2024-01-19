/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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
import tag from '../@ohos.nfc.tag';
import { TagSession } from './tagSession';
import { AsyncCallback, Callback } from '../basic';

/**
 * Provides interfaces to control the read and write of tags that support the NFC-A technology.
 *
 * <p>This class is inherited from the {@link TagSession} abstract class, and provides methods to create
 * {@code NfcATag} objects and obtain the ATQA and SAK.
 *
 * @since 7
 * @syscap SystemCapability.Communication.NFC.Tag
 */
export interface NfcATag extends TagSession {
  /**
   * Obtains the SAK of an NFC-A tag.
   *
   * @returns Returns the SAK of the NFC-A tag.
   * @since 7
   */
  getSak(): number;

  /**
   * Obtains the ATQA of an NFC-A tag.
   *
   * @returns Returns the ATQA of the NFC-A tag.
   * @since 7
   */
  getAtqa(): number[];
}

/**
 * Provides interfaces to create an {@code NfcBTag} and perform I/O operations on the tag.
 *
 * <p>This class inherits from the {@link TagSession} abstract class and provides interfaces to create an
 * {@code NfcBTag} and obtain the tag information.
 *
 * @since 7
 * @syscap SystemCapability.Communication.NFC.Tag
 */
export interface NfcBTag extends TagSession {
  /**
   * Obtains the application data of a tag.
   *
   * @returns Returns the application data of the tag.
   * @since 7
   */
  getRespAppData(): number[];

  /**
   * Obtains the protocol information of a tag.
   *
   * @returns Returns the protocol information of the tag.
   * @since 7
   */
  getRespProtocol(): number[];
}

/**
 * Provides methods for creating an NFC-F tag, obtaining tag information, and controlling tag read and write.
 *
 * <p>This class inherits from the {@link TagSession} abstract class and provides interfaces to create an
 * {@code NfcFTag} and obtain the tag information.
 *
 * @since 7
 * @syscap SystemCapability.Communication.NFC.Tag
 */
export interface NfcFTag extends TagSession {
  /**
   * Obtains the system code from this {@code NfcFTag} instance.
   *
   * @returns Returns the system code.
   * @since 7
   */
  getSystemCode(): number[];

  /**
   * Obtains the PMm (consisting of the IC code and manufacturer parameters) from this {@code NfcFTag} instance.
   *
   * @returns Returns the PMm.
   * @since 7
   */
  getPmm(): number[];
}

/**
 * Provides methods for creating an NFC-V tag, obtaining tag information, and controlling tag read and write.
 *
 * <p>This class inherits from the {@link TagSession} abstract class and provides interfaces to create an
 * {@code NfcVTag} and obtain the tag information.
 *
 * @since 7
 * @syscap SystemCapability.Communication.NFC.Tag
 */
export interface NfcVTag extends TagSession {
  /**
   * Obtains the response flags from this {@code NfcVTag} instance.
   *
   * @returns Returns the response flags.
   * @since 7
   */
  getResponseFlags(): number;

  /**
   * Obtains the data storage format identifier (DSFID) from this {@code NfcVTag} instance.
   *
   * @returns Returns the DSFID.
   * @since 7
   */
  getDsfId(): number;
}

/**
 * Provides methods for accessing IsoDep tag.
 *
 * @since 9
 * @syscap SystemCapability.Communication.NFC.Tag
 */
export interface IsoDepTag extends TagSession {
 /**
  * Gets IsoDep Historical bytes of the tag, which is based on NfcA RF technology.
  * It could be null if not based on NfcA.
  *
  * @returns { number[] } Returns the Historical bytes, the length could be 0.
  * @since 9
  */
  getHistoricalBytes(): number[];

 /**
  * Gets IsoDep HiLayer Response bytes of the tag, which is based on NfcB RF technology.
  * It could be null if not based on NfcB.
  *
  * @returns { number[] } Returns HiLayer Response bytes, the length could be 0.
  * @since 9
  */
  getHiLayerResponse(): number[];

 /**
  * Checks if extended apdu length supported or not.
  *
  * @returns { boolean } Returns true if extended apdu length supported, otherwise false.
  * @permission ohos.permission.NFC_TAG
  * @throws { BusinessError } 201 - Permission denied.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
  * @since 9
  */
  isExtendedApduSupported(): Promise<boolean>;
  isExtendedApduSupported(callback: AsyncCallback<boolean>): void;
}

export interface NdefMessage {
 /**
  * Obtains all records of an NDEF message.
  *
  * @returns { tag.NdefRecord[] } Records the list of NDEF records.
  * @syscap SystemCapability.Communication.NFC.Tag
  * @since 9
  */
  getNdefRecords(): tag.NdefRecord[];
}

/**
 * Provides methods for accessing NDEF tag.
 *
 * @since 9
 * @syscap SystemCapability.Communication.NFC.Tag
 */
export interface NdefTag extends TagSession {
 /**
  * Gets the type of NDEF tag.
  *
  * @returns { tag.NfcForumType } The type of NDEF tag.
  * @since 9
  */
  getNdefTagType(): tag.NfcForumType;

 /**
  * Gets the NDEF message that was read from NDEF tag when tag discovery.
  *
  * @returns { NdefMessage } The instance of NdefMessage.
  * @since 9
  */
  getNdefMessage(): NdefMessage;

 /**
  * Checks if NDEF tag is writable.
  *
  * @returns { boolean } Returns true if the tag is writable, otherwise returns false.
  * @since 9
  */
  isNdefWritable(): boolean;

 /**
  * Reads NDEF message on this tag.
  *
  * @returns { NdefMessage } The NDEF message in tag.
  * @permission ohos.permission.NFC_TAG
  * @throws { BusinessError } 201 - Permission denied.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
  * @since 9
  */
  readNdef(): Promise<NdefMessage>;
  readNdef(callback: AsyncCallback<NdefMessage>): void;

 /**
  * Writes NDEF message into this tag.
  *
  * @param { NdefMessage } msg - The NDEF message to be written.
  * @permission ohos.permission.NFC_TAG
  * @throws { BusinessError } 201 - Permission denied.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
  * @since 9
  */
  writeNdef(msg: NdefMessage): Promise<void>;
  writeNdef(msg: NdefMessage, callback: AsyncCallback<void>): void;

 /**
  * Checks NDEF tag can be set read-only.
  *
  * @returns { boolean } Returns true if the tag can be set readonly, otherwise returns false.
  * @permission ohos.permission.NFC_TAG
  * @throws { BusinessError } 201 - Permission denied.
  * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
  * @since 9
  */
  canSetReadOnly(): boolean;

 /**
  * Sets the NDEF tag read-only.
  *
  * @permission ohos.permission.NFC_TAG
  * @throws { BusinessError } 201 - Permission denied.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
  * @since 9
  */
  setReadOnly(): Promise<void>;
  setReadOnly(callback: AsyncCallback<void>): void;

 /**
  * Converts the NFC forum type into string defined in NFC forum.
  *
  * @param { tag.NfcForumType } type - NFC forum type of NDEF tag.
  * @returns { string } The NFC forum string type.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @since 9
  */
  getNdefTagTypeString(type: tag.NfcForumType): string;
}

/**
 * Provides methods for accessing MifareClassic tag.
 *
 * @since 9
 * @syscap SystemCapability.Communication.NFC.Tag
 */
export interface MifareClassicTag extends TagSession {
 /**
  * Authenticates a sector with the key.Only successful authentication sector can be operated.
  *
  * @param { number } sectorIndex - Index of sector to authenticate.
  * @param { number[] } key - The key(6-bytes) to authenticate.
  * @param { boolean } isKeyA - KeyA flag. true means KeyA, otherwise KeyB.
  * @permission ohos.permission.NFC_TAG
  * @throws { BusinessError } 201 - Permission denied.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
  * @since 9
  */
  authenticateSector(sectorIndex: number, key: number[], isKeyA: boolean): Promise<void>;
  authenticateSector(sectorIndex: number, key: number[], isKeyA: boolean, callback: AsyncCallback<void>): void;

 /**
  * Reads a block, one block size is 16 bytes.
  *
  * @param { number } blockIndex - The index of block to read.
  * @returns { number[] } Returns the block data.
  * @permission ohos.permission.NFC_TAG
  * @throws { BusinessError } 201 - Permission denied.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
  * @since 9
  */
  readSingleBlock(blockIndex: number): Promise<number[]>;
  readSingleBlock(blockIndex: number, callback: AsyncCallback<number[]>): void;

 /**
  * Writes a block, one block size is 16 bytes.
  *
  * @param { number } blockIndex - The index of block to write.
  * @param { number } data - The block data to write.
  * @permission ohos.permission.NFC_TAG
  * @throws { BusinessError } 201 - Permission denied.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
  * @since 9
  */
  writeSingleBlock(blockIndex: number, data: number[]): Promise<void>;
  writeSingleBlock(blockIndex: number, data: number[], callback: AsyncCallback<void>): void;

 /**
  * Increments the contents of a block, and stores the result in the internal transfer buffer.
  *
  * @param { number } blockIndex - The index of block to increment.
  * @param { number } value - The value to increment, none-negative.
  * @permission ohos.permission.NFC_TAG
  * @throws { BusinessError } 201 - Permission denied.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
  * @since 9
  */
  incrementBlock(blockIndex: number, value: number): Promise<void>;
  incrementBlock(blockIndex: number, value: number, callback: AsyncCallback<void>): void;

 /**
  * Decreases the contents of a block, and stores the result in the internal transfer buffer.
  *
  * @param { number } blockIndex - The index of block to decrease.
  * @param { number } value - The value to decrease, none-negative.
  * @permission ohos.permission.NFC_TAG
  * @throws { BusinessError } 201 - Permission denied.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
  * @since 9
  */
  decrementBlock(blockIndex: number, value: number): Promise<void>;
  decrementBlock(blockIndex: number, value: number, callback: AsyncCallback<void>): void;

 /**
  * Writes the contents of the internal transfer buffer to a value block.
  *
  * @param { number } blockIndex - The index of value block to be written.
  * @permission ohos.permission.NFC_TAG
  * @throws { BusinessError } 201 - Permission denied.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
  * @since 9
  */
  transferToBlock(blockIndex: number): Promise<void>;
  transferToBlock(blockIndex: number, callback: AsyncCallback<void>): void;

 /**
  * Moves the contents of a block into the internal transfer buffer.
  *
  * @param { number } blockIndex - The index of value block to be moved from.
  * @permission ohos.permission.NFC_TAG
  * @throws { BusinessError } 201 - Permission denied.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
  * @since 9
  */
  restoreFromBlock(blockIndex: number): Promise<void>;
  restoreFromBlock(blockIndex: number, callback: AsyncCallback<void>): void;

 /**
  * Gets the number of sectors in MifareClassic tag.
  *
  * @returns { number } Returns the number of sectors.
  * @since 9
  */
  getSectorCount(): number;

 /**
  * Gets the number of blocks in the sector.
  *
  * @param { number } sectorIndex - The index of sector.
  * @returns { number } Returns the number of blocks.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @since 9
  */
  getBlockCountInSector(sectorIndex: number): number;

 /**
  * Gets the type of the MifareClassic tag.
  *
  * @returns { tag.MifareClassicType } Returns type of MifareClassic tag.
  * @since 9
  */
  getType(): tag.MifareClassicType;

 /**
  * Gets size of the tag in bytes.
  *
  * @returns { number } Returns the size of the tag.
  * @since 9
  */
  getTagSize(): number;

 /**
  * Checks if the tag is emulated or not.
  *
  * @returns { boolean } Returns true if tag is emulated, otherwise false.
  * @since 9
  */
  isEmulatedTag(): boolean;

 /**
  * Gets the first block of the specific sector.
  *
  * @param { number } sectorIndex - The index of sector.
  * @returns { number } Returns index of first block in the sector.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @since 9
  */
  getBlockIndex(sectorIndex: number): number;

 /**
  * Gets the sector index, that the sector contains the specific block.
  *
  * @param { number } blockIndex - The index of block.
  * @returns { number } Returns the sector index.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @since 9
  */
  getSectorIndex(blockIndex: number): number;
}

/**
 * Provides methods for accessing MifareUltralight tag.
 *
 * @since 9
 * @syscap SystemCapability.Communication.NFC.Tag
 */
export interface MifareUltralightTag extends TagSession {
 /**
  * Reads 4 pages, total is 16 bytes. Page size is 4 bytes.
  *
  * @param { number } pageIndex - The index of page to read.
  * @returns { number[] } Returns 4 pages data.
  * @permission ohos.permission.NFC_TAG
  * @throws { BusinessError } 201 - Permission denied.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
  * @since 9
  */
  readMultiplePages(pageIndex: number): Promise<number[]>;
  readMultiplePages(pageIndex: number, callback: AsyncCallback<number[]>): void;

 /**
  * Writes a page, total 4 bytes.
  *
  * @param { number } pageIndex - The index of page to write.
  * @param { number[] } data - The page data to write.
  * @permission ohos.permission.NFC_TAG
  * @throws { BusinessError } 201 - Permission denied.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
  * @since 9
  */
  writeSinglePage(pageIndex: number, data: number[]): Promise<void>;
  writeSinglePage(pageIndex: number, data: number[], callback: AsyncCallback<void>): void;

  /**
  * Gets the type of the MifareUltralight tag.
  *
  * @returns { tag.MifareUltralightType } Returns the type of MifareUltralight tag.
  * @since 9
  */
  getType(): tag.MifareUltralightType;
}

/**
 * Provides methods for accessing NdefFormatable tag.
 *
 * @since 9
 * @syscap SystemCapability.Communication.NFC.Tag
 */
export interface NdefFormatableTag extends TagSession {
 /**
  * Formats a tag as NDEF tag, writes NDEF message into the NDEF Tag.
  *
  * @param { NdefMessage } message - NDEF message to write while format. It can be null, then only format the tag.
  * @permission ohos.permission.NFC_TAG
  * @throws { BusinessError } 201 - Permission denied.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
  * @since 9
  */
  format(message: NdefMessage): Promise<void>;
  format(message: NdefMessage, callback: AsyncCallback<void>): void;

 /**
  * Formats a tag as NDEF tag, writes NDEF message into the NDEF Tag, then sets the tag readonly.
  *
  * @param { NdefMessage } message - NDEF message to write while format. It can be null, then only format the tag.
  * @permission ohos.permission.NFC_TAG
  * @throws { BusinessError } 201 - Permission denied.
  * @throws { BusinessError } 401 - The parameter check failed.
  * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
  * @since 9
  */
  formatReadOnly(message: NdefMessage): Promise<void>;
  formatReadOnly(message: NdefMessage, callback: AsyncCallback<void>): void;
}