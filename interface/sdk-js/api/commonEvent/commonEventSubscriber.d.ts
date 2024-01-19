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
import { AsyncCallback } from './../basic';
import { CommonEventSubscribeInfo } from './commonEventSubscribeInfo';

/**
 * the subscriber of common event
 * @name CommonEventSubscriber
 * @since 7
 * @syscap SystemCapability.Notification.CommonEvent
 * @permission N/A
 */
export interface CommonEventSubscriber {
  /**
   * Obtains the result code of the current ordered common event.
   *
   * @since 7
   * @param callback Indicate the callback function to receive the common event.
   * @returns -
   */
  getCode(callback: AsyncCallback<number>): void;

  /**
   * Obtains the result code of the current ordered common event.
   *
   * @since 7
   * @returns Returns code of this common event
   */
  getCode(): Promise<number>;

  /**
   * Sets the result code of the current ordered common event.
   *
   * @since 7
   * @param code Indicates the custom result code to set. You can set it to any value.
   * @param callback Indicate the callback function to receive the common event.
   * @returns -
   */
  setCode(code: number, callback: AsyncCallback<void>): void;

  /**
   * Sets the result code of the current ordered common event.
   *
   * @since 7
   * @param code Indicates the custom result code to set. You can set it to any value.
   * @returns -
   */
  setCode(code: number): Promise<void>;

  /**
   * Obtains the result data of the current ordered common event.
   *
   * @since 7
   * @param callback Indicate the callback function to receive the common event.
   * @returns -
   */
  getData(callback: AsyncCallback<string>): void;

  /**
   * Obtains the result data of the current ordered common event.
   *
   * @since 7
   * @returns Returns data of this common event
   */
  getData(): Promise<string>;

  /**
   * Sets the result data of the current ordered common event.
   *
   * @since 7
   * @param data Indicates the custom result data to set. You can set it to any character string.
   * @param callback Indicate the callback function to receive the common event.
   * @returns -
   */
  setData(data: string, callback: AsyncCallback<void>): void;

  /**
   * Sets the result data of the current ordered common event.
   *
   * @since 7
   * @param data Indicates the custom result data to set. You can set it to any character string.
   * @returns -
   */
  setData(data: string): Promise<void>;

  /**
   * Sets the result of the current ordered common event.
   *
   * @since 7
   * @param code Indicates the custom result code to set. You can set it to any value.
   * @param data Indicates the custom result data to set. You can set it to any character string.
   * @param callback Indicate the callback function to receive the common event.
   * @returns -
   */
  setCodeAndData(code: number, data: string, callback: AsyncCallback<void>): void;

  /**
   * Sets the result of the current ordered common event.
   *
   * @since 7
   * @param code Indicates the custom result code to set. You can set it to any value.
   * @param data Indicates the custom result data to set. You can set it to any character string.
   * @returns -
   */
  setCodeAndData(code: number, data: string): Promise<void>;

  /**
   * Checks whether the current common event is an ordered common event.
   *
   * @since 7
   * @param callback Indicate the callback function to receive the common event.
   * @returns -
   */
  isOrderedCommonEvent(callback: AsyncCallback<boolean>): void;

  /**
   * Checks whether the current common event is an ordered common event.
   *
   * @since 7
   * @returns Returns true if this common event is ordered, false otherwise
   */
  isOrderedCommonEvent(): Promise<boolean>;

  /**
   * Checks whether the current common event is a sticky common event.
   *
   * @since 7
   * @param callback Indicate the callback function to receive the common event.
   * @returns -
   */
  isStickyCommonEvent(callback: AsyncCallback<boolean>): void;

  /**
   * Checks whether the current common event is a sticky common event.
   *
   * @since 7
   * @returns Returns true if this common event is sticky, false otherwise
   */
  isStickyCommonEvent(): Promise<boolean>;

  /**
   * Abort the current ordered common event.
   *
   * @since 7
   * @param callback Indicate the callback function to receive the common event.
   * @returns -
   */
  abortCommonEvent(callback: AsyncCallback<void>): void;

  /**
   * Abort the current ordered common event.
   *
   * @since 7
   * @returns -
   */
  abortCommonEvent(): Promise<void>;

  /**
   * Clears the abort state of the current ordered common event
   *
   * @since 7
   * @param callback Indicate the callback function to receive the common event.
   * @returns -
   */
  clearAbortCommonEvent(callback: AsyncCallback<void>): void;

  /**
   * Clears the abort state of the current ordered common event
   *
   * @since 7
   * @returns -
   */
  clearAbortCommonEvent(): Promise<void>;

  /**
   * Checks whether the current ordered common event should be aborted.
   *
   * @since 7
   * @param callback Indicate the callback function to receive the common event.
   * @returns -
   */
  getAbortCommonEvent(callback: AsyncCallback<boolean>): void;

  /**
   * Checks whether the current ordered common event should be aborted.
   *
   * @since 7
   * @returns Returns true if this common event is aborted, false otherwise
   */
  getAbortCommonEvent(): Promise<boolean>;

  /**
   * get the CommonEventSubscribeInfo of this CommonEventSubscriber.
   *
   * @since 7
   * @param callback Indicate the callback function to receive the common event.
   * @returns -
   */
  getSubscribeInfo(callback: AsyncCallback<CommonEventSubscribeInfo>): void;

  /**
   * get the CommonEventSubscribeInfo of this CommonEventSubscriber.
   *
   * @since 7
   * @returns Returns the commonEvent subscribe information
   */
  getSubscribeInfo(): Promise<CommonEventSubscribeInfo>;

  /**
   * finish the current ordered common event.
   *
   * @since 9
   * @param callback Indicate the callback function after the ordered common event is finished.
   * @returns -
   */
  finishCommonEvent(callback: AsyncCallback<void>): void;

  /**
   * finish the current ordered common event.
   *
   * @since 9
   * @returns -
   */
  finishCommonEvent(): Promise<void>;
}
