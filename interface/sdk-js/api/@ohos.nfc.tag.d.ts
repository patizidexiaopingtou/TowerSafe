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

import { NfcATag as _NfcATag,
         NfcBTag as _NfcBTag,
         NfcFTag as _NfcFTag,
         NfcVTag as _NfcVTag } from './tag/nfctech';
import { IsoDepTag as _IsoDepTag,
         NdefTag as _NdefTag,
         MifareClassicTag as _MifareClassicTag,
         MifareUltralightTag as _MifareUltralightTag,
         NdefFormatableTag as _NdefFormatableTag} from './tag/nfctech';
import { NdefMessage as _NdefMessage } from './tag/nfctech';
import { TagSession as _TagSession } from './tag/tagSession';
import { PacMap } from "./ability/dataAbilityHelper";
import rpc from "./@ohos.rpc";
import { AsyncCallback, Callback } from './basic';
import Want from './@ohos.app.ability.Want';

/**
 * Provides methods to operate or manage NFC tag.
 *
 * @since 7
 * @syscap SystemCapability.Communication.NFC.Tag
 */
declare namespace tag {
  /** Indicates an NFC-A tag. */
  const NFC_A = 1;

  /** Indicates an NFC-B tag. */
  const NFC_B = 2;

  /** Indicates an ISO-DEP tag. */
  const ISO_DEP = 3;

  /** Indicates an NFC-F tag. */
  const NFC_F = 4;

  /** Indicates an NFC-V tag. */
  const NFC_V = 5;

  /** Indicates an NDEF tag. */
  const NDEF = 6;

  /**
   * Indicates an NDEF Formatable tag.
   *
   * @since 9
   */
  const NDEF_FORMATABLE = 7;

  /** Indicates a MIFARE Classic tag. */
  const MIFARE_CLASSIC = 8;

  /** Indicates a MIFARE Ultralight tag. */
  const MIFARE_ULTRALIGHT = 9;

  /**
   * TNF types definitions, see NFCForum-TS-NDEF_1.0.
   *
   * @since 9
   * @syscap SystemCapability.Communication.NFC.Tag
   */
   enum TnfType {
    /** Empty */
    TNF_EMPTY = 0x0,

    /** NFC Forum well-known type [NFC RTD] */
    TNF_WELL_KNOWN = 0x1,

    /** Media-type as defined in RFC 2046 [RFC 2046] */
    TNF_MEDIA = 0x2,

    /** Absolute URI as defined in RFC 3986 [RFC 3986] */
    TNF_ABSOLUTE_URI = 0x3,

    /** NFC Forum external type [NFC RTD] */
    TNF_EXT_APP = 0x4,

    /** Unknown */
    TNF_UNKNOWN = 0x5,

    /** Unchanged (see section 2.3.3) */
    TNF_UNCHANGED = 0x6,
  }

  /**
   * NfcForum Type definition. The NDEF tag may use one of them.
   *
   * @since 9
   * @syscap SystemCapability.Communication.NFC.Tag
   */
  enum NfcForumType {
    /** NFC FORUM TYPE 1 */
    NFC_FORUM_TYPE_1 = 1,

    /** NFC FORUM TYPE 2 */
    NFC_FORUM_TYPE_2 = 2,

    /** NFC FORUM TYPE 3 */
    NFC_FORUM_TYPE_3 = 3,

    /** NFC FORUM TYPE 4 */
    NFC_FORUM_TYPE_4 = 4,

    /** Mifare Classic */
    MIFARE_CLASSIC = 101,
  }

  /**
   * RTD type TEXT, see NFC Record Type Definition (RTD) Specification.
   *
   * @since 9
   */
  const RTD_TEXT: number[];

  /**
   * RTD type URI, see NFC Record Type Definition (RTD) Specification.
   *
   * @since 9
   */
  const RTD_URI: number[];

  /**
   * MifareClassic Type definition
   *
   * @since 9
   * @syscap SystemCapability.Communication.NFC.Tag
   */
  enum MifareClassicType {
    /** Mifare Type unknown */
    TYPE_UNKNOWN = 0,

    /** Mifare Classic */
    TYPE_CLASSIC = 1,

    /** Mifare Plus */
    TYPE_PLUS = 2,

    /** Mifare Pro */
    TYPE_PRO = 3,
  }

  /**
   * MifareClassic Tag size.
   *
   * @since 9
   * @syscap SystemCapability.Communication.NFC.Tag
   */
  enum MifareClassicSize {
    /** 5 sectors per tag, 4 blocks per sector */
    MC_SIZE_MINI = 320,

    /** 16 sectors per tag, 4 blocks per sector */
    MC_SIZE_1K = 1024,

    /** 32 sectors per tag, 4 blocks per sector */
    MC_SIZE_2K = 2048,

    /** 40 sectors per tag, 4 blocks per sector */
    MC_SIZE_4K = 4096,
  }

  /**
   * MifareUltralight Type definition
   *
   * @since 9
   * @syscap SystemCapability.Communication.NFC.Tag
   */
  enum MifareUltralightType {
    /** Mifare Type unknown */
    TYPE_UNKNOWN = 0,

    /** Mifare Ultralight */
    TYPE_ULTRALIGHT = 1,

    /** Mifare UltralightC */
    TYPE_ULTRALIGHT_C = 2
  }

  /**
   * Obtains an {@link NfcATag} object based on the tag information.
   *
   * <p>During tag reading, if the tag supports the NFC-A technology, an {@link NfcATag} object
   * will be created based on the tag information.
   *
   * @param tagInfo Indicates the tag information.
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.nfc.tag/tag#getNfcA
   */
  function getNfcATag(tagInfo: TagInfo): NfcATag

  /**
   * Obtains an {@link NfcATag} object based on the tag information.
   *
   * During tag reading, if the tag supports the NFC-A technology, an {@link NfcATag} object
   * will be created based on the tag information.
   *
   * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
   * @syscap SystemCapability.Communication.NFC.Tag
   * @since 9
   */
   function getNfcA(tagInfo: TagInfo): NfcATag

  /**
   * Obtains an {@link NfcBTag} object based on the tag information.
   *
   * <p>During tag reading, if the tag supports the NFC-B technology, an {@link NfcBTag} object
   * will be created based on the tag information.
   *
   * @param tagInfo Indicates the tag information.
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.nfc.tag/tag#getNfcB
   */
  function getNfcBTag(tagInfo: TagInfo): NfcBTag

  /**
   * Obtains an {@link NfcBTag} object based on the tag information.
   *
   * During tag reading, if the tag supports the NFC-B technology, an {@link NfcBTag} object
   * will be created based on the tag information.
   *
   * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
   * @syscap SystemCapability.Communication.NFC.Tag
   * @since 9
   */
   function getNfcB(tagInfo: TagInfo): NfcBTag

  /**
   * Obtains an {@link NfcFTag} object based on the tag information.
   *
   * <p>During tag reading, if the tag supports the NFC-F technology, an {@link NfcFTag} object
   * will be created based on the tag information.
   *
   * @param tagInfo Indicates the tag information.
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.nfc.tag/tag#getNfcF
   */
  function getNfcFTag(tagInfo: TagInfo): NfcFTag

  /**
   * Obtains an {@link NfcFTag} object based on the tag information.
   *
   * During tag reading, if the tag supports the NFC-F technology, an {@link NfcFTag} object
   * will be created based on the tag information.
   *
   * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
   * @syscap SystemCapability.Communication.NFC.Tag
   * @since 9
   */
   function getNfcF(tagInfo: TagInfo): NfcFTag

  /**
   * Obtains an {@link NfcVTag} object based on the tag information.
   *
   * <p>During tag reading, if the tag supports the NFC-V technology, an {@link NfcVTag} object
   * will be created based on the tag information.
   *
   * @param tagInfo Indicates the tag information.
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.nfc.tag/tag#getNfcV
   */
  function getNfcVTag(tagInfo: TagInfo): NfcVTag

  /**
   * Obtains an {@link NfcVTag} object based on the tag information.
   *
   * During tag reading, if the tag supports the NFC-V technology, an {@link NfcVTag} object
   * will be created based on the tag information.
   *
   * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
   * @syscap SystemCapability.Communication.NFC.Tag
   * @since 9
   */
   function getNfcV(tagInfo: TagInfo): NfcVTag

  /**
   * Obtains an {@link IsoDepTag} object based on the tag information.
   *
   * During tag reading, if the tag supports the IsoDep technology, an {@link IsoDepTag} object
   * will be created based on the tag information.
   *
   * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
   * @syscap SystemCapability.Communication.NFC.Tag
   * @since 9
   */
  function getIsoDep(tagInfo: TagInfo): IsoDepTag

  /**
   * Obtains an {@link NdefTag} object based on the tag information.
   *
   * During tag reading, if the tag supports the NDEF technology, an {@link NdefTag} object
   * will be created based on the tag information.
   *
   * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
   * @syscap SystemCapability.Communication.NFC.Tag
   * @since 9
   */
  function getNdef(tagInfo: TagInfo): NdefTag

  /**
   * Obtains an {@link MifareClassicTag} object based on the tag information.
   *
   * During tag reading, if the tag supports the MIFARE Classic technology,
   * an {@link MifareClassicTag} object will be created based on the tag information.
   *
   * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
   * @syscap SystemCapability.Communication.NFC.Tag
   * @since 9
   */
  function getMifareClassic(tagInfo: TagInfo): MifareClassicTag

   /**
   * Obtains an {@link MifareUltralightTag} object based on the tag information.
   *
   * During tag reading, if the tag supports the MIFARE Ultralight technology,
   * an {@link MifareUltralightTag} object will be created based on the tag information.
   *
   * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
   * @syscap SystemCapability.Communication.NFC.Tag
   * @since 9
   */
  function getMifareUltralight(tagInfo: TagInfo): MifareUltralightTag

  /**
   * Obtains an {@link NdefFormatableTag} object based on the tag information.
   *
   * During tag reading, if the tag supports the NDEF Formatable technology,
   * an {@link NdefFormatableTag} object will be created based on the tag information.
   *
   * @param { TagInfo } tagInfo - Indicates the dispatched tag information.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
   * @syscap SystemCapability.Communication.NFC.Tag
   * @since 9
   */
  function getNdefFormatable(tagInfo: TagInfo): NdefFormatableTag

  /**
   * Parse a {@link TagInfo} object from Want.
   *
   * @param { Want } want - The want object that contains the values of TagInfo.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @syscap SystemCapability.Communication.NFC.Tag
   * @since 9
   */
  function getTagInfo(want: Want): TagInfo

  /**
   * Provides tag information.
   *
   * <p>This class provides the technology a tag supports, for example, NFC-A. Applications can create
   * different tags based on the supported technology.
   *
   * @since 7
   * @syscap SystemCapability.Communication.NFC.Tag
   * @permission ohos.permission.NFC_TAG
   */
  export interface TagInfo {
   /**
    * The uid of this tag, it.
    *
    * @since 9
    */
    uid: number[];

   /**
    * The supported technology list of this tag.
    *
    * @since 9
    */
    technology: number[];

   /**
    * The extra data for each technology of this tag.
    *
    * @since 9
    * @systemapi hide for inner use.
    */
    extrasData: PacMap[];

   /**
    * The the RF discovery id of this tag.
    *
    * @since 9
    * @systemapi hide for inner use.
    */
    tagRfDiscId: number;

   /**
    * The extra data for the technology of this tag.
    *
    * @since 9
    * @systemapi hide for inner use.
    */
    remoteTagService: rpc.RemoteObject;

   /**
    * The supported technology list of this tag.
    *
    * @since 7
    * @deprecated since 9
    * @useinstead ohos.nfc.tag/tag.TagInfo#technology
    */
    supportedProfiles: number[];
  }

  /**
   * NDEF records definition, see NFCForum-TS-NDEF_1.0.
   *
   * @since 9
   * @syscap SystemCapability.Communication.NFC.Tag
   */
  export interface NdefRecord {
    /** tnf of NdefRecord */
    tnf: number;

    /** RTD type of NdefRecord */
    rtdType: number[];

    /** id of NdefRecord */
    id: number[];

    /** payload of NdefRecord */
    payload: number[];
  }

  namespace ndef {
  /**
    * Creates an NDEF record with uri data.
    *
    * @param { string } uri - Uri data for new NDEF record.
    * @returns { NdefRecord } The instance of NdefRecord.
    * @throws { BusinessError } 401 - The parameter check failed.
    * @syscap SystemCapability.Communication.NFC.Tag
    * @since 9
    */
    function makeUriRecord(uri: string): NdefRecord;

  /**
    * Creates an NDEF record with text data.
    *
    * @param { string } text - Text data for new an NDEF record.
    * @param { string } locale - Language code for the NDEF record. if locale is null, use default locale.
    * @returns { NdefRecord } The instance of NdefRecord.
    * @throws { BusinessError } 401 - The parameter check failed.
    * @syscap SystemCapability.Communication.NFC.Tag
    * @since 9
    */
    function makeTextRecord(text: string, locale: string): NdefRecord;

  /**
    * Creates an NDEF record with mime data.
    *
    * @param { string } mimeType type of mime data for new an NDEF record.
    * @param { string } mimeData mime data for new an NDEF record.
    * @returns { NdefRecord } The instance of NdefRecord.
    * @throws { BusinessError } 401 - The parameter check failed.
    * @syscap SystemCapability.Communication.NFC.Tag
    * @since 9
    */
    function makeMimeRecord(mimeType: string, mimeData: number[]): NdefRecord;

  /**
    * Creates an NDEF record with external data.
    *
    * @param { string } domainName - Domain name of issuing organization for the external data.
    * @param { string } type - Domain specific type of data for the external data.
    * @param { number[] } externalData - Data payload of an NDEF record.
    * @returns { NdefRecord } The instance of NdefRecord.
    * @throws { BusinessError } 401 - The parameter check failed.
    * @syscap SystemCapability.Communication.NFC.Tag
    * @since 9
    */
    function makeExternalRecord(domainName: string, type: string, externalData: number[]): NdefRecord;
  /**
    * Creates an NDEF message with raw bytes.
    *
    * @param { number[] } data - The raw bytes to parse NDEF message.
    * @returns { NdefMessage } The instance of NdefMessage.
    * @throws { BusinessError } 401 - The parameter check failed.
    * @syscap SystemCapability.Communication.NFC.Tag
    * @since 9
    */
    function createNdefMessage(data: number[]): NdefMessage;

  /**
    * Creates an NDEF message with record list.
    *
    * @param { NdefRecord[] } ndefRecords - The NDEF records to parse NDEF message.
    * @returns { NdefMessage } The instance of NdefMessage.
    * @throws { BusinessError } 401 - The parameter check failed.
    * @syscap SystemCapability.Communication.NFC.Tag
    * @since 9
    */
    function createNdefMessage(ndefRecords: NdefRecord[]): NdefMessage;

  /**
    * Parses an NDEF message into raw bytes.
    *
    * @param { NdefMessage } ndefMessage - An NDEF message to parse.
    * @returns { number[] } Returns the raw bytes of an NDEF message.
    * @throws { BusinessError } 401 - The parameter check failed.
    * @syscap SystemCapability.Communication.NFC.Tag
    * @since 9
    */
    function messageToBytes(ndefMessage: NdefMessage): number[];
  }

  export type NfcATag = _NfcATag
  export type NfcBTag = _NfcBTag
  export type NfcFTag = _NfcFTag
  export type NfcVTag = _NfcVTag
  export type IsoDepTag = _IsoDepTag
  export type NdefTag = _NdefTag
  export type MifareClassicTag = _MifareClassicTag
  export type MifareUltralightTag = _MifareUltralightTag
  export type NdefFormatableTag = _NdefFormatableTag
  export type NdefMessage = _NdefMessage
  export type TagSession = _TagSession
}
export default tag;