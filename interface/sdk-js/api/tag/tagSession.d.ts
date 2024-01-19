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
import { AsyncCallback } from '../basic';

/**
 * Controls tag read and write.
 *
 * <p>Classes for different types of tags inherit from this abstract class to control connections to
 * tags, read data from tags, and write data to tags.
 *
 * @since 7
 * @syscap SystemCapability.Communication.NFC.Tag
 */
export interface TagSession {
  /**
   * Obtains the tag information.
   *
   * @returns Returns the tag information, which is a {@link TagInfo} object.
   * @permission ohos.permission.NFC_TAG
   * @since 7
   * @deprecated since 9
   * @useinstead ohos.nfc.tag/tag#getTagInfo
   */
  getTagInfo(): tag.TagInfo;

  /**
   * Connects to a tag.
   *
   * <p>This method must be called before data is read from or written to the tag.
   *
   * @returns Returns {@code true} if the connection is set up; returns {@code false} otherwise.
   * @permission ohos.permission.NFC_TAG
   * @since 7
   * @deprecated since 9
   * @useinstead tagSession.TagSession#connect
   */
  connectTag(): boolean;

  /**
   * Connects to a tag. Must be called before data is read from or written to the tag.
   *
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
   * @permission ohos.permission.NFC_TAG
   * @since 9
   */
  connect(): void;

  /**
   * Resets a connection with a tag and restores the default timeout duration for writing data to the tag.
   *
   * @permission ohos.permission.NFC_TAG
   * @since 7
   * @deprecated since 9
   * @useinstead tagSession.TagSession#resetConnection
   */
  reset(): void;

  /**
   * Resets a connection with a tag and restores the default timeout duration for writing data to the tag.
   *
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
   * @permission ohos.permission.NFC_TAG
   * @since 9
   */
  resetConnection(): void;

  /**
   * Checks whether a connection has been set up with a tag.
   *
   * @returns Returns {@code true} if a connection has been set up with the tag;
   * returns {@code false} otherwise.
   * @since 7
   * @deprecated since 9
   * @useinstead tagSession.TagSession#isConnected
   */
  isTagConnected(): boolean;

  /**
   * Checks whether a connection has been set up with a tag.
   *
   * @returns Returns true if tag connected, otherwise false.
   * @throws { BusinessError } 801 - Capability not supported.
   * @since 9
   */
   isConnected(): boolean;

  /**
   * Sets the timeout duration (ms) for sending data to a tag.
   *
   * <p>If data is not sent to the tag within the duration, data sending fails.
   *
   * @param timeout Indicates the timeout duration to be set.
   * @returns Returns {@code true} if the setting is successful; returns {@code false} otherwise.
   * @permission ohos.permission.NFC_TAG
   * @since 7
   * @deprecated since 9
   * @useinstead tagSession.TagSession#setTimeout
   */
  setSendDataTimeout(timeout: number): boolean;

  /**
   * Sets the timeout duration (ms) for sending data to a tag.
   *
   * @param timeout Indicates the timeout duration to be set.
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
   * @permission ohos.permission.NFC_TAG
   * @since 9
   */
   setTimeout(timeout: number): void;

  /**
   * Queries the timeout duration (ms) for sending data to a tag.
   *
   * @returns Returns the timeout duration.
   * @permission ohos.permission.NFC_TAG
   * @since 7
   * @deprecated since 9
   * @useinstead tagSession.TagSession#getTimeout
   */
  getSendDataTimeout(): number;

  /**
   * Obtains the timeout duration (ms) for sending data to a tag.
   *
   * @returns Returns the timeout duration.
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
   * @permission ohos.permission.NFC_TAG
   * @since 9
   */
  getTimeout(): number;

  /**
   * Writes data to a tag.
   *
   * @param data Indicates the data to be written to the tag.
   * @returns Returns bytes received in response. Or bytes with a length of 0 if the
   * data fails to be written to the tag.
   *
   * @permission ohos.permission.NFC_TAG
   * @since 7
   * @deprecated since 9
   * @useinstead tagSession.TagSession#transmit
   */
  sendData(data: number[]): Promise<number[]>;
  sendData(data: number[], callback: AsyncCallback<number[]>): void;

  /**
   * Writes data to a tag.
   *
   * @param data Indicates the data to be written to the tag.
   * @returns Returns bytes received in response. Or bytes with a length of 0 if the
   * data fails to be written to the tag.
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
   * @permission ohos.permission.NFC_TAG
   * @since 9
   */
  transmit(data: number[]): Promise<number[]>;
  transmit(data: number[], callback: AsyncCallback<number[]>): void;

  /**
   * Queries the maximum length of data that can be sent to a tag.
   *
   * @returns Returns the maximum length of the data to be sent to the tag.
   *
   * @permission ohos.permission.NFC_TAG
   * @since 7
   * @deprecated since 9
   * @useinstead tagSession.TagSession#getMaxTransmitSize
   */
  getMaxSendLength(): number;

  /**
   * Obtains the maximum length of data that can be sent to a tag.
   *
   * @returns Returns the maximum length of the data to be sent to the tag.
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 3100201 - Tag running state is abnormal in service.
   * @permission ohos.permission.NFC_TAG
   * @since 9
   */
   getMaxTransmitSize(): number;
}
