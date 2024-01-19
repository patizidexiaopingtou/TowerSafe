/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
import { AsyncCallback } from './basic';
import Want from './@ohos.app.ability.Want';
import image from './@ohos.multimedia.image';

/**
 * systemPasteboard
 * @syscap SystemCapability.MiscServices.Pasteboard
 */
declare namespace pasteboard {
  /**
   * Indicates the maximum number of records allowed in a PasteData object.
   * @since 7
   */
  const MAX_RECORD_NUM: number;
  /**
   * Indicates MIME types of HTML text.
   * @since 7
   */
  const MIMETYPE_TEXT_HTML: string;
  /**
   * Indicates MIME types of wants.
   * @since 7
   */
  const MIMETYPE_TEXT_WANT: string;
  /**
   * Indicates MIME types of plain text.
   * @since 7
   */
  const MIMETYPE_TEXT_PLAIN: string;
  /**
   * Indicates MIME types of URIs.
   * @since 7
   */
  const MIMETYPE_TEXT_URI: string;
  /**
   * Indicates MIME type of PixelMap.
   * @syscap SystemCapability.MiscServices.Pasteboard
   * @since 9
   */
  const MIMETYPE_PIXELMAP: string;

  /**
   * Indicates type of value.
   * @syscap SystemCapability.MiscServices.Pasteboard
   * @since 9
   */
  type ValueType = string | image.PixelMap | Want | ArrayBuffer;

  /**
   * Creates a PasteData object for PasteData#MIMETYPE_TEXT_HTML.
   * @param htmlText To save the Html text content.
   * @returns Containing the contents of the clipboard content object.
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.pasteboard.pasteboard#createData
   */
  function createHtmlData(htmlText: string): PasteData;

  /**
   * Creates a PasteData object for PasteData#MIMETYPE_TEXT_WANT.
   * @param want To save the want of content.
   * @returns Containing the contents of the clipboard content object.
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.pasteboard.pasteboard#createData
   */
  function createWantData(want: Want): PasteData;

  /**
   * Creates a PasteData object for PasteData#MIMETYPE_TEXT_PLAIN.
   * @param text To save the text of content.
   * @returns Containing the contents of the clipboard content object.
   * @since 6
   * @deprecated since 9
   * @useinstead ohos.pasteboard.pasteboard#createData
   */
  function createPlainTextData(text: string): PasteData;

  /**
   * Creates a PasteData object for PasteData#MIMETYPE_TEXT_URI.
   * @param uri To save the uri of content.
   * @returns Containing the contents of the clipboard content object.
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.pasteboard.pasteboard#createData
   */
  function createUriData(uri: string): PasteData;

  /**
   * Creates a PasteData object with MIME type and value.
   * @param { string } mimeType - indicates MIME type of value.
   * @param { ValueType } value - indicates the content that is set to PasteData.
   * @returns { PasteData } a new PasteData object which contains mimeType and value.
   * @throws { BusinessError } 401 - if type of mimeType is not string, or the value can not match the mimeType correctly.
   * @syscap SystemCapability.MiscServices.Pasteboard
   * @since 9
   */
  function createData(mimeType: string, value: ValueType): PasteData;

  /**
   * Creates a Record object for PasteData#MIMETYPE_TEXT_HTML.
   * @param htmlText To save the Html text content.
   * @returns The content of a new record
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.pasteboard.pasteboard#createRecord
   */
  function createHtmlTextRecord(htmlText: string): PasteDataRecord;

  /**
   * Creates a Record object for PasteData#MIMETYPE_TEXT_WANT.
   * @param want To save the want of content.
   * @returns The content of a new record
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.pasteboard.pasteboard#createRecord
   */
  function createWantRecord(want: Want): PasteDataRecord;

  /**
   * Creates a Record object for PasteData#MIMETYPE_TEXT_PLAIN.
   * @param text To save the text of content.
   * @returns The content of a new record
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.pasteboard.pasteboard#createRecord
   */
  function createPlainTextRecord(text: string): PasteDataRecord;

  /**
   * Creates a Record object for PasteData#MIMETYPE_TEXT_URI.
   * @param uri To save the uri of content.
   * @returns The content of a new record
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.pasteboard.pasteboard#createRecord
   */
  function createUriRecord(uri: string): PasteDataRecord;

  /**
   * Creates a record object with MIME type and value.
   * @param { string } mimeType - indicates MIME type of value.
   * @param { ValueType } value - content to be saved.
   * @returns { PasteDataRecord } a new PasteDataRecord object which contains mimeType and value.
   * @throws { BusinessError } 401 - if type of mimeType is not string, or the value can not match the mimeType correctly.
   * @syscap SystemCapability.MiscServices.Pasteboard
   * @since 9
   */
  function createRecord(mimeType: string, value: ValueType): PasteDataRecord;

  /**
   * get SystemPasteboard
   * @returns The system clipboard object
   * @since 6
   */
  function getSystemPasteboard(): SystemPasteboard;

  /**
   * Types of scope that PasteData can be pasted.
   * @enum { number }
   * @syscap SystemCapability.MiscServices.Pasteboard
   * @since 9
   */
  enum ShareOption {
    /**
     * INAPP indicates that only paste in the same app is allowed.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    INAPP,
    /**
     * LOCALDEVICE indicates that paste in any app in this device is allowed.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    LOCALDEVICE,
    /**
     * CROSSDEVICE indicates that paste in any app across devices is allowed.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    CROSSDEVICE
  }

  interface PasteDataProperty {
    /**
     * additional property data. key-value pairs.
     * @since 7
     */
    additions: {
      [key: string]: object
    }
    /**
     * non-repeating MIME types of all records in PasteData.
     * @since 7
     */
    readonly mimeTypes: Array<string>;
    /**
     * the user-defined tag of a PasteData object.
     * @since 7
     */
    tag: string;
    /**
     * a timestamp, which indicates when data is written to the system pasteboard.
     * @since 7
     */
    readonly timestamp: number;
    /**
     * Checks whether PasteData is set for local access only.
     * @since 7
     */
    localOnly: boolean;
    /**
     * Indicates the scope of clipboard data which can be pasted.
     * If it is not set or is incorrectly set, The default value is CrossDevice.
     * @type { ShareOption }
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    shareOption: ShareOption;
  }

  interface PasteDataRecord {
    /**
     * HTML text in a record.
     * @since 7
     */
    htmlText: string;
    /**
     * an want in a record.
     * @since 7
     */
    want: Want;
    /**
     * MIME types of a record.
     * @since 7
     */
    mimeType: string;
    /**
     * plain text in a record.
     * @since 7
     */
    plainText: string;
    /**
     * an URI in a record.
     * @since 7
     */
    uri: string;
    /**
     * PixelMap in a record.
     * @type { image.PixelMap }
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    pixelMap: image.PixelMap;
    /**
     * Custom data in a record, mimeType indicates the MIME type of custom data, ArrayBuffer indicates the value of custom data.
     * @type { object }
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    data: {
      [mimeType: string]: ArrayBuffer
    }

    /**
     * Converts data in PasteData to text format.
     * @returns callback Type string callback function
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#convertToTextV9
     */
    convertToText(callback: AsyncCallback<string>): void;
    convertToText(): Promise<string>;

    /**
     * Converts data in PasteData to text format.
     * @returns { string } the string returned by the function.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    toPlainText(): string;
  }

  interface PasteData {
    /**
     * Adds a Record for HTML text to a PasteData object, and updates the MIME type to PasteData#MIMETYPE_TEXT_HTML in DataProperty.
     * @param htmlText To save the Html text content.
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#addRecord
     */
    addHtmlRecord(htmlText: string): void;

    /**
     * Adds an want Record to a PasteData object, and updates the MIME type to PasteData#MIMETYPE_TEXT_WANT in DataProperty.
     * @param want To save the want content.
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#addRecord
     */
    addWantRecord(want: Want): void;

    /**
     * Adds a PasteRecord to a PasteData object and updates MIME types in DataProperty.
     * @param record The content of a new record.
     * @since 7
     */
    addRecord(record: PasteDataRecord): void;

    /**
     * Adds a Record for plain text to a PasteData object, and updates the MIME type to PasteData#MIMETYPE_TEXT_PLAIN in DataProperty.
     * @param text To save the text of content.
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#addRecord
     */
    addTextRecord(text: string): void;

    /**
     * Adds a URI Record to a PasteData object, and updates the MIME type to PasteData#MIMETYPE_TEXT_URI in DataProperty.
     * @param uri To save the uri of content.
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#addRecord
     */
    addUriRecord(uri: string): void;

    /**
     * Adds a record with mimeType and value to a PasteData object.
     * @param { string } mimeType - indicates the MIME type of value.
     * @param { ValueType } value - content to be saved.
     * @throws { BusinessError } 401 - if type of mimeType is not string, or the value can not match the mimeType correctly.
     * @throws { BusinessError } 12900002 - The number of record exceeds the maximum limit.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    addRecord(mimeType: string, value: ValueType): void;

    /**
     * MIME types of all content on the pasteboard.
     * @returns string type of array
     * @since 7
     */
    getMimeTypes(): Array<string>;

    /**
     * HTML text of the primary record in a PasteData object.
     * @returns string type of htmltext
     * @since 7
     */
    getPrimaryHtml(): string;

    /**
     * the want of the primary record in a PasteData object.
     * @returns want type of want
     * @since 7
     */
    getPrimaryWant(): Want;

    /**
     * the MIME type of the primary record in a PasteData object.
     * @returns string type of mimetype
     * @since 7
     */
    getPrimaryMimeType(): string;

    /**
     * the plain text of the primary record in a PasteData object.
     * @returns string type of text
     * @since 6
     */
    getPrimaryText(): string;

    /**
     * the URI of the primary record in a PasteData object.
     * @returns string type of uri
     * @since 7
     */
    getPrimaryUri(): string;

    /**
     * Gets the primary PixelMap record in a PasteData object.
     * @returns {image.PixelMap} pixelMap
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    getPrimaryPixelMap(): image.PixelMap;

    /**
     * DataProperty of a PasteData object.
     * @returns PasteDataProperty type of PasteDataProperty
     * @since 7
     */
    getProperty(): PasteDataProperty;

    /**
     * Sets PasteDataProperty to a PasteData object, Modifying shareOption is supported only.
     * @param { PasteDataProperty } property - save property to PasteData object.
     * @throws { BusinessError } 401 - if type of property is not PasteDataProperty.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    setProperty(property: PasteDataProperty): void;

    /**
     * a Record based on a specified index.
     * @param index The index to specify the content item
     * @returns PasteDataRecord type of PasteDataRecord
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#getRecord
     */
    getRecordAt(index: number): PasteDataRecord;

    /**
     * Gets record by index in PasteData.
     * @param { number } index - indicates the record index in PasteData.
     * @returns { PasteDataRecord } the record in PasteData with index.
     * @throws { BusinessError } 401 - if type of index is not number.
     * @throws { BusinessError } 12900001 - The index is out of the record.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    getRecord(index: number): PasteDataRecord;

    /**
     * the number of records in a PasteData object.
     * @returns The number of the clipboard contents
     * @since 7
     */
    getRecordCount(): number;

    /**
     * the user-defined tag of a PasteData object.
     * @returns string type of tag
     * @since 7
     */
    getTag(): string;

    /**
     * Checks whether there is a specified MIME type of data in DataProperty.
     * @param mimeType To query data types.
     * @returns if having mimeType in PasteData returns true, else returns false.
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#hasType
     */
    hasMimeType(mimeType: string): boolean;

    /**
     * Checks whether there is a specified MIME type of data in DataProperty.
     * @param { string } mimeType - indicates to query data type.
     * @returns { boolean } if having mimeType in PasteData returns true, else returns false.
     * @throws { BusinessError } 401 - if type of path is not string.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    hasType(mimeType: string): boolean;

    /**
     * Removes a Record based on a specified index.
     * @param index The index to specify the content item.
     * @returns The query returns True on success, or False on failure.
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#removeRecord
     */
    removeRecordAt(index: number): boolean;

    /**
     * Removes a Record based on a specified index.
     * @param { number } index - indicates the record index in PasteData.
     * @throws { BusinessError } 401 - if type of index is not number.
     * @throws { BusinessError } 12900001 - The index is out of the record.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    removeRecord(index: number): void;

    /**
     * Replaces a specified record with a new one.
     * @param index The index to specify the content item. record record The content of a new record.
     * @returns The query returns True on success, or False on failure.
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#replaceRecord
     */
    replaceRecordAt(index: number, record: PasteDataRecord): boolean;

    /**
     * Replaces a specified record with a new one.
     * @param { number } index - indicates the record index in PasteData.
     * @param { PasteDataRecord } record - the content of a new record.
     * @throws { BusinessError } 401 - if type of index is not number or type of record is not PasteDataRecord.
     * @throws { BusinessError } 12900001 - The index is out of the record.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    replaceRecord(index: number, record: PasteDataRecord): void;
  }

  interface SystemPasteboard {
    /**
     * Callback invoked when pasteboard content changes.
     * @param { string } type - indicates pasteboard content changed.
     * @param { () => void } callback - the callback to add.
     * @throws { BusinessError } 401 - if type is not string or callback is not () => void.
     * @since 7
     */
    on(type: 'update', callback: () => void): void;
    /**
     * Remove a callback invoked when pasteboard content changes.
     * @param { string } type - indicates pasteboard content changed.
     * @param { () => void } [callback] - the callback to remove.
     * @throws { BusinessError } 401 - if type is not string or callback is not () => void.
     * @since 7
     */
    off(type: 'update', callback?: () => void): void;

    /**
     * Clears the pasteboard.
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#clearData
     */
    clear(callback: AsyncCallback<void>): void;
    clear(): Promise<void>;

    /**
     * Clears the pasteboard.
     * @param { AsyncCallback<void> } callback - the callback of clearData.
     * @throws { BusinessError } 401 - if callback is not AsyncCallback<void>.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    clearData(callback: AsyncCallback<void>): void;

    /**
     * Clears the pasteboard.
     * @returns { Promise<void> } the promise returned by the clearData.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    clearData(): Promise<void>;

    /**
     * data in a PasteData object.
     * @returns PasteData callback data in a PasteData object.
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#getData
     */
    getPasteData(callback: AsyncCallback<PasteData>): void;
    getPasteData(): Promise<PasteData>;

    /**
     * Gets pastedata from the system pasteboard.
     * @param { AsyncCallback<PasteData> } callback - the callback of getData.
     * @throws { BusinessError } 401 - if type of callback is not AsyncCallback<PasteData>.
     * @throws { BusinessError } 12900003 - Another copy or paste is in progress.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    getData(callback: AsyncCallback<PasteData>): void;

    /**
     * Gets pastedata from the system pasteboard.
     * @returns { Promise<PasteData> } the promise returned by the getData.
     * @throws { BusinessError } 12900003 - Another copy or paste is in progress.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    getData(): Promise<PasteData>;

    /**
     * Checks whether there is content in the pasteboard.
     * @returns boolean The callback success to true to false failure
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#hasData
     */
    hasPasteData(callback: AsyncCallback<boolean>): void;
    hasPasteData(): Promise<boolean>;

    /**
     * Checks whether there is content in the system pasteboard.
     * @param { AsyncCallback<boolean> } callback - the callback of hasData.
     * @throws { BusinessError } 401 - if type of callback is not AsyncCallback<boolean>.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    hasData(callback: AsyncCallback<boolean>): void;

    /**
     * Checks whether there is content in the system pasteboard.
     * @returns { Promise<boolean> } the promise returned by the function.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    hasData(): Promise<boolean>;

    /**
     * Writes PasteData to the pasteboard.
     * @param  data Containing the contents of the clipboard content object.
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.pasteboard.pasteboard#setData
     */
    setPasteData(data: PasteData, callback: AsyncCallback<void>): void;
    setPasteData(data: PasteData): Promise<void>;

    /**
     * Writes PasteData to the system pasteboard.
     * @param { PasteData } data - PasteData will be written to the clipboard
     * @param { AsyncCallback<void> } callback - the callback of setData.
     * @throws { BusinessError } 401 - if type of data is not PasteData or type of callback is not AsyncCallback<void>.
     * @throws { BusinessError } 12900003 - Another copy or paste is in progress.
     * @throws { BusinessError } 12900004 - Replication is prohibited.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    setData(data: PasteData, callback: AsyncCallback<void>): void;

    /**
     * Writes PasteData to the system pasteboard.
     * @param { PasteData } data - PasteData will be written to the clipboard.
     * @returns { Promise<void> } the promise returned by the function.
     * @throws { BusinessError } 401 - if type of data is not PasteData.
     * @throws { BusinessError } 12900003 - Another copy or paste is in progress.
     * @throws { BusinessError } 12900004 - Replication is prohibited.
     * @syscap SystemCapability.MiscServices.Pasteboard
     * @since 9
     */
    setData(data: PasteData): Promise<void>;
  }
}

export default pasteboard;