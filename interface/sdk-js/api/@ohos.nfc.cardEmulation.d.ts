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
import { AsyncCallback } from './basic';
import { ElementName }  from './bundleManager/ElementName';

/**
 * Provides methods to operate or manage NFC card emulation.
 *
 * @since 6
 * @syscap SystemCapability.Communication.NFC.CardEmulation
 */
declare namespace cardEmulation {
  /**
   * Defines the capability type.
   *
   * @since 6
   * @deprecated since 9
   * @useinstead ohos.nfc.cardEmulation/cardEmulation#hasHceCapability
   */
  enum FeatureType {
    /** This constant is used to check whether HCE card emulation is supported. */
    HCE = 0,

    /** This constant is used to check whether SIM card emulation is supported. */
    UICC = 1,

    /** This constant is used to check whether eSE card emulation is supported. */
    ESE = 2,
  }

  /**
   * Define the card emulation type, payment or other.
   *
   * @since 9
   */
  enum CardType {
    /** Payment type of card emulation */
    PAYMENT = "payment",

    /** Other type of card emulation */
    OTHER = "other",
  }

  /**
   * Checks whether a specified type of card emulation is supported.
   *
   * <p>This method is used to check Whether the host or secure element supports card emulation.
   *
   * @param feature Indicates the card emulation type, {@code HCE}, {@code UICC}, or {@code ESE}.
   * @returns Returns {@code true} if the specified type of card emulation is supported; returns
   * {@code false} otherwise.
   * @since 6
   * @deprecated since 9
   * @useinstead ohos.nfc.cardEmulation/cardEmulation#hasHceCapability
   */
  function isSupported(feature: number): boolean;

  /**
   * Checks whether Host Card Emulation(HCE) capability is supported.
   *
   * @returns { boolean } Returns true if HCE is supported, otherwise false.
   * @permission ohos.permission.NFC_CARD_EMULATION
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 801 - Capability not supported.
   * @since 9
   */
  function hasHceCapability(): boolean;

  /**
   * Checks whether a service is default for given type.
   *
   * @param { ElementName } elementName - The element name of the service ability
   * @param { CardType } type - The type to query, pyament or other.
   * @returns { boolean } Returns true if the service is default, otherwise false.
   * @permission ohos.permission.NFC_CARD_EMULATION
   * @throws { BusinessError } 201 - Permission denied.
   * @throws { BusinessError } 401 - The parameter check failed.
   * @throws { BusinessError } 801 - Capability not supported.
   * @since 9
   */
  function isDefaultService(elementName: ElementName, type: CardType): boolean;

  /**
   * A class for NFC host application.
   *
   * <p>The NFC host application use this class, then Nfc service can access the application
   * installation information and connect to services of the application.
   *
   * @since 8
   * @syscap SystemCapability.Communication.NFC.CardEmulation
   */
  export class HceService {
    /**
     * start HCE
     *
     * @returns Returns {@code true} if HCE is enabled or has been enabled; returns {@code false} otherwise.
     * @permission ohos.permission.NFC_CARD_EMULATION
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.nfc.cardEmulation/cardEmulation.HceService#start
     */
    startHCE(aidList: string[]): boolean;

    /**
     * Starts the HCE, regitser more aids and allows this application to be preferred while in foreground.
     *
     * @param { ElementName } elementName - The element name of the service ability
     * @param { string[] } aidList - The aid list to be registered by this service, allowed to be empty.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100301 - Card emulation running state is abnormal in service.
     * @permission ohos.permission.NFC_CARD_EMULATION
     * @since 9
     */
     start(elementName: ElementName, aidList: string[]): void

    /**
     * stop HCE
     *
     * @returns Returns {@code true} if HCE is disabled or has been disabled; returns {@code false} otherwise.
     * @permission ohos.permission.NFC_CARD_EMULATION
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.nfc.cardEmulation/cardEmulation.HceService#stop
     */
    stopHCE(): boolean;

    /**
     * Stops the HCE, and unset the preferred service while in foreground.
     *
     * @param { ElementName } elementName - The element name of the service ability
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100301 - Card emulation running state is abnormal in service.
     * @permission ohos.permission.NFC_CARD_EMULATION
     * @since 9
     */
    stop(elementName: ElementName): void

    /**
     * register HCE event to receive the APDU data.
     *
     * @param type the type to register.
     * @param callback Callback used to listen to HCE data that local device received.
     * @permission ohos.permission.NFC_CARD_EMULATION
     * @since 8
     */
    on(type: "hceCmd", callback: AsyncCallback<number[]>): void;

    /**
     * Sends a response APDU to the remote device.
     *
     * <p>This method is used by a host application when swiping card.
     *
     * @param responseApdu Indicates the response, which is a byte array.
     * @permission ohos.permission.NFC_CARD_EMULATION
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.nfc.cardEmulation/cardEmulation.HceService#transmit
     */
    sendResponse(responseApdu: number[]): void;

    /**
     * Sends a response APDU to the remote device.
     *
     * @param response Indicates the response to send, which is a byte array.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3100301 - Card emulation running state is abnormal in service.
     * @permission ohos.permission.NFC_CARD_EMULATION
     * @since 9
     */
    transmit(response: number[]): Promise<void>;
    transmit(response: number[], callback: AsyncCallback<void>): void;
  }
}
export default cardEmulation;
