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

import { Callback } from './basic';

/**
 * Provides methods to operate or manage NFC.
 *
 * @since 7
 * @syscap SystemCapability.Communication.NFC.Core
 */
declare namespace nfcController {
  enum NfcState {
    /** Indicates that NFC is disabled. */
    STATE_OFF = 1,

    /** Indicates that NFC is being enabled. */
    STATE_TURNING_ON = 2,

    /** Indicates that NFC is enabled. */
    STATE_ON = 3,

    /** Indicates that NFC is being disabled. */
    STATE_TURNING_OFF = 4,
  }

  /**
   * Checks whether a device supports NFC.
   *
   * @returns Returns {@code true} if the device supports NFC; returns {@code false} otherwise.
   * @since 7
   * @deprecated since 9
   * @useinstead global#canIUse("SystemCapability.Communication.NFC.Core")
   */
  function isNfcAvailable(): boolean

  /**
   * register nfc state changed event.
   *
   * @param type the type to register.
   * @param callback Callback used to listen to the nfc state changed event.
   * @since 7
   */
  function on(type: "nfcStateChange", callback: Callback<NfcState>): void

  /**
   * unregister nfc state changed event.
   *
   * @param type the type to unregister.
   * @param callback Callback used to listen to the nfc state changed event.
   * @since 7
   */
  function off(type: "nfcStateChange", callback?: Callback<NfcState>): void

  /**
   * Enables NFC.
   *
   * @returns Returns {@code true} if NFC is enabled or has been enabled; returns {@code false} otherwise.
   * @permission ohos.permission.MANAGE_SECURE_SETTINGS
   * @since 7
   * @deprecated since 9
   * @useinstead @ohos.nfc.controller.nfcController#enableNfc
   */
  function openNfc(): boolean

  /**
   * Enables NFC.
   *
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 3100101 - NFC state is abnormal in service.
   * @permission ohos.permission.MANAGE_SECURE_SETTINGS
   * @since 9
   */
  function enableNfc(): void

  /**
   * Disables NFC.
   *
   * @returns Returns {@code true} if NFC is disabled or has been disabled; returns {@code false} otherwise.
   * @permission ohos.permission.MANAGE_SECURE_SETTINGS
   * @since 7
   * @deprecated since 9
   * @useinstead @ohos.nfc.controller.nfcController#disableNfc
   */
  function closeNfc(): boolean

  /**
   * Disables NFC.
   *
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 801 - Capability not supported.
   * @throws { BusinessError } 3100101 - NFC state is abnormal in service.
   * @permission ohos.permission.MANAGE_SECURE_SETTINGS
   * @since 9
   */
   function disableNfc(): void

  /**
   * Checks whether NFC is enabled.
   *
   * @returns Returns {@code true} if NFC is enabled; returns {@code false} otherwise.
   * @since 7
   */
  function isNfcOpen(): boolean

  /**
   * Obtains the NFC status.
   *
   * <p>The NFC status can be any of the following: <ul><li>{@link #STATE_OFF}: Indicates that NFC
   * is disabled. <li>{@link #STATE_TURNING_ON}: Indicates that NFC is being enabled.
   * <li>{@link #STATE_ON}: Indicates that NFC is enabled. <li>{@link #STATE_TURNING_OFF}: Indicates
   * that NFC is being disabled.</ul>
   *
   * @returns Returns the NFC status.
   * @since 7
   */
  function getNfcState(): NfcState
}

export default nfcController;
