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

/**
 * @since 3
 * @syscap SystemCapability.DistributedDataManager.Preferences.Core
 * @deprecated since 6
 * @FAModelOnly
 */
export interface GetStorageOptions {
  /**
   * Content index.
   * the value contains a maximum of 32 characters and cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
   * @since 3
   * @deprecated since 6
   * @FAModelOnly
   */
  key: string;

  /**
   * Default value returned when the key does not exist.
   * If this parameter is not specified, an empty string is returned.
   * @since 3
   * @deprecated since 6
   * @FAModelOnly
   */
  default?: string;

  /**
   * Called when the stored content is read successfully.
   * @since 3
   * @deprecated since 6
   * @FAModelOnly
   */
  success?: (data: any) => void;

  /**
   * Called when the stored content fails to be read.
   * @since 3
   * @deprecated since 6
   * @FAModelOnly
   */
  fail?: (data: string, code: number) => void;

  /**
   * Called when the execution is completed.
   * @since 3
   * @deprecated since 6
   * @FAModelOnly
   */
  complete?: () => void;
}

/**
 * @since 3
 * @syscap SystemCapability.DistributedDataManager.Preferences.Core
 * @deprecated since 6
 * @FAModelOnly
 */
export interface SetStorageOptions {
  /**
   * Index of the stored content to be modified.
   * the value contains a maximum of 32 characters and cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
   * @since 3
   * @deprecated since 6
   * @FAModelOnly
   */
  key: string;

  /**
   * Target storage content.
   * @since 3
   * @deprecated since 6
   * @FAModelOnly
   */
  value: string;

  /**
   * Called when the stored content is modified successfully.
   * @since 3
   * @deprecated since 6
   * @FAModelOnly
   */
  success?: () => void;

  /**
   * Called when the stored content fails to be modified.
   * @since 3
   * @deprecated since 6
   * @FAModelOnly
   */
  fail?: (data: string, code: number) => void;

  /**
   * Called when the execution is completed.
   * @since 3
   * @deprecated since 6
   * @FAModelOnly
   */
  complete?: () => void;
}

/**
 * @since 3
 * @syscap SystemCapability.DistributedDataManager.Preferences.Core
 * @deprecated since 6
 * @FAModelOnly
 */
export interface ClearStorageOptions {
  /**
   * Called when the stored content is cleared successfully.
   * @since 3
   * @deprecated since 6
   * @FAModelOnly
   */
  success?: () => void;

  /**
   * Called when the stored content fails to be cleared.
   * @since 3
   * @deprecated since 6
   * @FAModelOnly
   */
  fail?: (data: string, code: number) => void;

  /**
   * Called when the execution is completed.
   * @since 3
   * @deprecated since 6
   * @FAModelOnly
   */
  complete?: () => void;
}

/**
 * @since 3
 * @deprecated since 6
 * @FAModelOnly
 * @syscap SystemCapability.DistributedDataManager.Preferences.Core
 */
export interface DeleteStorageOptions {
  /**
   * Content index.
   * the value contains a maximum of 32 characters and cannot contain special characters such as \/"*+,:;<=>?[]|\x7F.
   * @since 3
   * @deprecated since 6
   * @FAModelOnly
   */
  key: string;

  /**
   * Called when the stored content is deleted successfully.
   * @since 3
   * @deprecated since 6
   * @FAModelOnly
   */
  success?: () => void;

  /**
   * Called when the stored content fails to be deleted.
   * @since 3
   * @deprecated since 6
   * @FAModelOnly
   */
  fail?: (data: string, code: number) => void;

  /**
   * Called when the execution is completed.
   * @since 3
   * @deprecated since 6
   * @FAModelOnly
   */
  complete?: () => void;
}

/**
 * @since 3
 * @syscap SystemCapability.DistributedDataManager.Preferences.Core
 * @deprecated since 6
 * @FAModelOnly
 */
export default class Storage {
  /**
   * Reads the stored content.
   * @param options Options.
   * @deprecated since 6
   * @useinstead ohos.preferences.preferences.get
   * @FAModelOnly
   */
  static get(options: GetStorageOptions): void;

  /**
   * Modifies the stored content.
   * @param options Options.
   * @deprecated since 6
   * @FAModelOnly
   */
  static set(options: SetStorageOptions): void;

  /**
   * Clears the stored content.
   * @param options Options.
   * @deprecated since 6
   * @useinstead ohos.preferences.preferences.clear
   * @FAModelOnly
   */
  static clear(options?: ClearStorageOptions): void;

  /**
   * Deletes the stored content.
   * @param options Options.
   * @deprecated since 6
   * @useinstead ohos.preferences.preferences.delete
   * @FAModelOnly
   */
  static delete(options: DeleteStorageOptions): void;
}
