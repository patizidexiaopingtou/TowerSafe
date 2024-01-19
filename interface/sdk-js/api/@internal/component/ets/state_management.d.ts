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

/**
 * Defines the ColorMode of device.
 * @since 7
 */
declare enum ColorMode {
  /**
   * Light mode.
   * @since 7
   */
  LIGHT = 0,

  /**
   * Dark mode.
   * @since 7
   */
  DARK,
}

/**
 * Defines the LayoutDirection of device.
 * @since 7
 */
declare enum LayoutDirection {
  /**
   * Elements are laid out from left to right.
   * @since 7
   */
  LTR,

  /**
   * Elements are laid out from right to left.
   * @since 7
   */
  RTL,

  /**
   * Elements are laid out from auto.
   * @since 8
   */
  Auto,
}

/**
 * Defines the base class of storage.
 * @since 7
 * @systemapi
 */
declare class Storage {
  /**
   * Constructor parameters.
   * @since 7
   * @systemapi
   */
  constructor(needCrossThread?: boolean, file?: string);

  /**
   * Called when data is obtained.
   * @since 7
   * @systemapi
   */
  get(key: string): string | undefined;

  /**
   * Called when setting.
   * @since 7
   * @systemapi
   */
  set(key: string, val: any): void;

  /**
   * Called when data is cleared.
   * @since 7
   * @systemapi
   */
  clear(): void;

  /**
   * Called when data is deleted.
   * @since 7
   * @systemapi
   */
  delete(key: string): void;
}
