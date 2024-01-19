/*
* Copyright (c) 2021-2022 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { Callback, AsyncCallback } from "./basic";
import { KeyCode } from "./@ohos.multimodalInput.keyCode"

/**
 * The input device management module is configured to obtain an ID and device information of an input device.
 *
 * @since 8
 * @syscap SystemCapability.MultimodalInput.Input.InputDevice
 */
declare namespace inputDevice {
  /**
   * @since 9
   */
  type ChangedType = 'add' | 'remove';

  /**
   * @since 9
   */
  type SourceType = 'keyboard' | 'mouse' | 'touchpad' | 'touchscreen' | 'joystick' | 'trackball';

  /**
   * @since 9
   */
  type AxisType = 'touchMajor' | 'touchMinor' | 'orientation' | 'x' | 'y' | 'pressure' | 'toolMinor' | 'toolMajor' | 'NULL';

  /**
   * @since 9
   */
  enum KeyboardType {
    /**
     * None
     */
    NONE = 0,

    /**
     * Unknown key
     */
    UNKNOWN = 1,

    /**
     * Alphabetical keyboard
     */
    ALPHABETIC_KEYBOARD = 2,

    /**
     * Digital keyboard
     */
    DIGITAL_KEYBOARD = 3,

    /**
     * Stylus
     */
    HANDWRITING_PEN = 4,

    /**
     * Remote control
     */
    REMOTE_CONTROL = 5,
  }

  /**
   * Defines the listener for input device events.
   * 
   * @since 9
   * @syscap SystemCapability.MultimodalInput.Input.InputDevice
   * @param type Type of the input device event. The options are add and remove.
   * @param deviceId ID of the input device for the reported input device event.
   */
  interface DeviceListener {
    type: ChangedType;
    deviceId: number;
  }

  /**
   * Starts listening for an input device event.
   * 
   * @since 9
   * @syscap SystemCapability.MultimodalInput.Input.InputDevice
   * @param type Type of the input device event, which is **change**.
   * @returns Callback for the input device event.
   * @throws {BusinessError} 401 - Parameter error.
   */
  function on(type: "change", listener: Callback<DeviceListener>): void;

  /**
   * Stops listening for an input device event.
   * 
   * @since 9
   * @syscap SystemCapability.MultimodalInput.Input.InputDevice
   * @param type Type of the input device event, which is **change**.
   * @returns Callback for the input device event.
   * @throws {BusinessError} 401 - Parameter error.
   */
  function off(type: "change", listener?: Callback<DeviceListener>): void;

  /**
   * Defines axis information about events that can be reported by an input device.
   * For example, a touchscreen may report information such as x, y, and pressure,
   * which indicate the x-axis coordinate, y-axis coordinate, and pressure, respectively.
   *
   * @since 8
   * @syscap SystemCapability.MultimodalInput.Input.InputDevice
   * @param source Input source type of the axis. For example, if a mouse reports an x-axis event, the source of the x-axis is the mouse.
   * @param axis Type of the axis. for example, the x-axis, y-axis, and pressure axis.
   * @param max Maximum value of the data reported on this axis.
   * @param min Minimum value of the data reported on this axis.
   * @param fuzz Fuzz value of the data reported on this axis.
   * @param flat Flat value of the data reported on this axis.
   * @param resolution Resolution value of the data reported on this axis.
   */
  interface AxisRange {
    /**
     * @since 8
     */
    source: SourceType;

    /**
     * @since 8
     */
    axis: AxisType;

    /**
     * @since 8
     */
    max: number;

    /**
     * @since 8
     */
    min: number;

    /**
     * @since 9
     */
    fuzz: number;

    /**
     * @since 9
     */
    flat: number;

    /**
     * @since 9
     */
    resolution: number;
  }

  /**
   * Defines the information about an input device.
   *
   * @since 8
   * @syscap SystemCapability.MultimodalInput.Input.InputDevice
   * @param name Name of the input device.
   * @param sources Source type supported by the input device. For example, if a keyboard is attached with a touchpad, the device has two input sources: keyboard and touchpad.
   * @param axisRanges Axis range of the input device.
   * @param bus Bus of the input device.
   * @param product Product of the input device.
   * @param vendor Vendor of the input device.
   * @param version Version of the input device.
   * @param phys Physical path of the input device.
   * @param uniq Unique identifier of the input device.
   */
  interface InputDeviceData {
    /**
     * @since 8
     */
    id: number;

    /**
     * @since 8
     */
    name: string;

    /**
     * @since 8
     */
    sources: Array<SourceType>;

    /**
     * @since 8
     */
    axisRanges: Array<AxisRange>;

    /**
     * @since 9
     */
    bus: number;

    /**
     * @since 9
     */
    product: number;

    /**
     * @since 9
     */
    vendor: number;

    /**
     * @since 9
     */
    version: number;

    /**
     * @since 9
     */
    phys: string;

    /**
     * @since 9
     */
    uniq: string;
  }

  /**
   * Obtains the IDs of all input devices.
   *
   * @since 8
   * @syscap SystemCapability.MultimodalInput.Input.InputDevice
   * @param callback Callback function, receive reported data
   * @deprecated since 9
   * @useinstead ohos.multimodalInput.inputDevice#getDeviceList
   */
  function getDeviceIds(callback: AsyncCallback<Array<number>>): void;

  /**
   * Obtains the IDs of all input devices.
   *
   * @since 8
   * @syscap SystemCapability.MultimodalInput.Input.InputDevice
   * @deprecated since 9
   * @useinstead ohos.multimodalInput.inputDevice#getDeviceList
   */
  function getDeviceIds(): Promise<Array<number>>;

  /**
   * Obtain the information about an input device.
   *
   * @since 8
   * @syscap SystemCapability.MultimodalInput.Input.InputDevice
   * @param deviceId ID of the input device whose information is to be obtained.
   * @param callback Callback function, receive reported data
   * @deprecated since 9
   * @useinstead ohos.multimodalInput.inputDevice#getDeviceInfo
   */
  function getDevice(deviceId: number, callback: AsyncCallback<InputDeviceData>): void;

  /**
   * Obtain the information about an input device.
   *
   * @since 8
   * @syscap SystemCapability.MultimodalInput.Input.InputDevice
   * @param deviceId ID of the input device whose information is to be obtained.
   * @deprecated since 9
   * @useinstead ohos.multimodalInput.inputDevice#getDeviceInfo
   */
  function getDevice(deviceId: number): Promise<InputDeviceData>;

  /**
   * Obtains the IDs of all input devices.
   *
   * @since 9
   * @syscap SystemCapability.MultimodalInput.Input.InputDevice
   * @param callback Callback function, receive reported data
   * @throws {BusinessError} 401 - Parameter error.
   */
  function getDeviceList(callback: AsyncCallback<Array<number>>): void;

  /**
   * Obtains the IDs of all input devices.
   *
   * @since 9
   * @syscap SystemCapability.MultimodalInput.Input.InputDevice
   */
  function getDeviceList(): Promise<Array<number>>;

  /**
  * Obtain the information about an input device.
  *
  * @since 9
  * @syscap SystemCapability.MultimodalInput.Input.InputDevice
  * @param deviceId ID of the input device whose information is to be obtained.
  * @param callback Callback function, receive reported data
  * @throws {BusinessError} 401 - Parameter error.
  */
  function getDeviceInfo(deviceId: number, callback: AsyncCallback<InputDeviceData>): void;

  /**
  * Obtain the information about an input device.
  *
  * @since 9
  * @syscap SystemCapability.MultimodalInput.Input.InputDevice
  * @param deviceId ID of the input device whose information is to be obtained.
  * @throws {BusinessError} 401 - Parameter error.
  */
  function getDeviceInfo(deviceId: number): Promise<InputDeviceData>;

  /**
   * Checks whether the specified key codes of an input device are supported.
   *
   * @since 9
   * @syscap SystemCapability.MultimodalInput.Input.InputDevice
   * @param deviceId ID of the input device.
   * @param keys Key codes of the input device, You can query a maximum of five key codes at a time.
   * @returns Returns a result indicating whether the specified key codes are supported.
   * @throws {BusinessError} 401 - Parameter error.
   */
  function supportKeys(deviceId: number, keys: Array<KeyCode>, callback: AsyncCallback<Array<boolean>>): void;

  /**
   * Checks whether the specified key codes of an input device are supported.
   *
   * @since 9
   * @syscap SystemCapability.MultimodalInput.Input.InputDevice
   * @param deviceId ID of the input device.
   * @param keys Key codes of the input device, You can query a maximum of five key codes at a time.
   * @returns Returns a result indicating whether the specified key codes are supported.
   * @throws {BusinessError} 401 - Parameter error.
   */
  function supportKeys(deviceId: number, keys: Array<KeyCode>): Promise<Array<boolean>>;

  /**
   * Query the keyboard type of the input device.
   *
   * @since 9
   * @syscap SystemCapability.MultimodalInput.Input.InputDevice
   * @param deviceId ID of the specified input device.
   * @returns Returns the keyboard type.
   * @throws {BusinessError} 401 - Parameter error.
   */
  function getKeyboardType(deviceId: number, callback: AsyncCallback<KeyboardType>): void;

  /**
   * Query the keyboard type of the input device.
   *
   * @since 9
   * @syscap SystemCapability.MultimodalInput.Input.InputDevice
   * @param deviceId ID of the specified input device.
   * @returns Returns the keyboard type.
   * @throws {BusinessError} 401 - Parameter error.
   */
  function getKeyboardType(deviceId: number): Promise<KeyboardType>;
}

export default inputDevice;