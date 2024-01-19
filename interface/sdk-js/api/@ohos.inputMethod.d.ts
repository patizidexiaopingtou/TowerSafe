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

import {AsyncCallback} from './basic';
import InputMethodSubtype from './@ohos.InputMethodSubtype';

/**
 * Input method
 *
 * @since 6
 * @syscap SystemCapability.MiscServices.InputMethodFramework
 */
declare namespace inputMethod {
    /**
     * Keyboard max number
     * @since 8
     */
    const MAX_TYPE_NUM: number

    /**
     * Input method setting
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.inputMethod.getSetting
     */
    function getInputMethodSetting(): InputMethodSetting;

    /**
     * Input method controller
     * @since 6
     * @deprecated since 9
     * @useinstead ohos.inputMethod.getController
     */
    function getInputMethodController(): InputMethodController;

    /**
     * Input method setting
     * @since 9
     * @returns { InputMethodSetting } the object of InputMethodSetting.
     * @throws {BusinessError} 12800007 - settings extension error.
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
     function getSetting(): InputMethodSetting;

    /**
     * Input method controller
     * @since 9
     * @returns { InputMethodController } the object of InputMethodController.
     * @throws {BusinessError} 12800006 - input method controller error.
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    function getController(): InputMethodController;

    /**
     * Switch input method
     * @permission ohos.permission.CONNECT_IME_ABILITY
     * @param { InputMethodProperty } [target] - indicates the input method which will replace the current one.
     * @param { AsyncCallback<boolean> } [callback] - the callback of switchInputMethod.
     * @throws {BusinessError} 201 - permissions check fails.
     * @throws {BusinessError} 401 - parameter error.
     * @throws {BusinessError} 12800005 - configuration persisting error.
     * @throws {BusinessError} 12800008 - input method manager service error.
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
    function switchInputMethod(target: InputMethodProperty, callback: AsyncCallback<boolean>): void;

    /**
     * Switch input method
     * @permission ohos.permission.CONNECT_IME_ABILITY
     * @param {InputMethodProperty} target - Indicates the input method which will replace the current one.
     * @returns {Promise<boolean>} the promise returned by the function.
     * @throws {BusinessError} 201 - permissions check fails.
     * @throws {BusinessError} 401 - parameter error.
     * @throws {BusinessError} 12800005 - configuration persisting error.
     * @throws {BusinessError} 12800008 - input method manager service error.
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
    function switchInputMethod(target: InputMethodProperty): Promise<boolean>;

    /**
     * Get current input method
     * @since 9
     * @returns { InputMethodProperty } the property of current inputmethod.
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    function getCurrentInputMethod(): InputMethodProperty;

    /**
     * Switch current input method subtype
     * @permission ohos.permission.CONNECT_IME_ABILITY
     * @param {InputMethodSubtype} target - Indicates the input method subtype which will replace the current one.
     * @param {AsyncCallback<boolean>} callback - the callback of switchCurrentInputMethodSubtype.
     * @throws {BusinessError} 201 - permissions check fails.
     * @throws {BusinessError} 401 - parameter error.
     * @throws {BusinessError} 12800005 - configuration persisting error.
     * @throws {BusinessError} 12800008 - input method manager service error.
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
    function switchCurrentInputMethodSubtype(target: InputMethodSubtype, callback: AsyncCallback<boolean>): void;

    /**
     * Switch current input method subtype
     * @permission ohos.permission.CONNECT_IME_ABILITY
     * @param {InputMethodSubtype} target - Indicates the input method subtype which will replace the current one.
     * @returns {Promise<boolean>} the promise returned by the function.
     * @throws {BusinessError} 201 - permissions check fails.
     * @throws {BusinessError} 401 - parameter error.
     * @throws {BusinessError} 12800005 - configuration persisting error.
     * @throws {BusinessError} 12800008 - input method manager service error.
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
    function switchCurrentInputMethodSubtype(target: InputMethodSubtype): Promise<boolean>;

    /**
     * Get the current input method subtype
     * @returns {InputMethodSubtype} the subtype of the current input method.
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
    function getCurrentInputMethodSubtype(): InputMethodSubtype;

    /**
     * Switch input method and subtype
     * @permission ohos.permission.CONNECT_IME_ABILITY
     * @param {InputMethodProperty} inputMethodProperty - Indicates the target input method.
     * @param {InputMethodSubtype} inputMethodSubtype - Indicates the target input method subtype.
     * @param {AsyncCallback<boolean>} callback - the callback of switchCurrentInputMethodAndSubtype.
     * @throws {BusinessError} 201 - permissions check fails.
     * @throws {BusinessError} 401 - parameter error.
     * @throws {BusinessError} 12800005 - configuration persisting error.
     * @throws {BusinessError} 12800008 - input method manager service error.
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
    function switchCurrentInputMethodAndSubtype(inputMethodProperty: InputMethodProperty, inputMethodSubtype: InputMethodSubtype, callback: AsyncCallback<boolean>): void;

    /**
     * Switch input method and subtype.
     * @permission ohos.permission.CONNECT_IME_ABILITY
     * @param {InputMethodProperty} inputMethodProperty - Indicates the target input method.
     * @param {InputMethodSubtype} inputMethodSubtype - Indicates the target input method subtype.
     * @returns {Promise<boolean>} the promise returned by the function.
     * @throws {BusinessError} 201 - permissions check fails.
     * @throws {BusinessError} 401 - parameter error.
     * @throws {BusinessError} 12800005 - configuration persisting error.
     * @throws {BusinessError} 12800008 - input method manager service error.
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
    function switchCurrentInputMethodAndSubtype(inputMethodProperty: InputMethodProperty, inputMethodSubtype: InputMethodSubtype): Promise<boolean>;

    /**
     * @since 8
     */
    interface InputMethodSetting {
        /**
         * Subscribe input method or subtype change.
         * @param {string} type - Indicates the event type.
         * @param {(inputMethodProperty: InputMethodProperty, inputMethodSubtype: InputMethodSubtype) => void} callback - the callback of 'imeChange'
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        on(type: 'imeChange', callback: (inputMethodProperty: InputMethodProperty, inputMethodSubtype: InputMethodSubtype) => void): void;

        /**
         * Unsubscribe input method or subtype change.
         * @param {string} type - Indicates the event type.
         * @param {(inputMethodProperty: InputMethodProperty, inputMethodSubtype: InputMethodSubtype) => void} [callback] - the callback of 'imeChange',
         *        when subscriber unsubscribes all callback functions of event 'imeChange', this parameter can be left blank.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
         off(type: 'imeChange', callback?: (inputMethodProperty: InputMethodProperty, inputMethodSubtype: InputMethodSubtype) => void): void;

        /**
         * List subtype of the specified input method.
         * @param {InputMethodProperty} inputMethodProperty - the property of the specified inputmethod.
         * @param {AsyncCallback<Array<InputMethodSubtype>>} callback - the callback of listInputMethodSubtype.
         * @throws {BusinessError} 401 - parameter error.
         * @throws {BusinessError} 12800001 - package manager error.
         * @throws {BusinessError} 12800008 - input method manager service error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        listInputMethodSubtype(inputMethodProperty: InputMethodProperty, callback: AsyncCallback<Array<InputMethodSubtype>>): void;

        /**
         * List subtype of the specified input method.
         * @param {InputMethodProperty} inputMethodProperty - Indicates the specified input method.
         * @returns {Promise<Array<InputMethodSubtype>>} the promise returned by the function.
         * @throws {BusinessError} 401 - parameter error.
         * @throws {BusinessError} 12800001 - package manager error.
         * @throws {BusinessError} 12800008 - input method manager service error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        listInputMethodSubtype(inputMethodProperty: InputMethodProperty): Promise<Array<InputMethodSubtype>>;

        /**
         * List subtype of current input method
         * @param {AsyncCallback<Array<InputMethodSubtype>>} callback - the callback of listCurrentInputMethodSubtype.
         * @throws {BusinessError} 12800001 - package manager error.
         * @throws {BusinessError} 12800008 - input method manager service error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        listCurrentInputMethodSubtype(callback: AsyncCallback<Array<InputMethodSubtype>>): void;

        /**
         * List subtype of current input method
         * @returns {Promise<Array<InputMethodSubtype>>} the promise returned by the function.
         * @throws {BusinessError} 12800001 - package manager error.
         * @throws {BusinessError} 12800008 - input method manager service error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        listCurrentInputMethodSubtype(): Promise<Array<InputMethodSubtype>>;

        /**
         * List input methods
         * @param {boolean} enable :
         *     If true, collect enabled input methods.
         *     If false, collect disabled input methods.
         * @param {AsyncCallback<Array<InputMethodProperty>>} callback - the callback of getInputMethods.
         * @throws {BusinessError} 401 - parameter error.
         * @throws {BusinessError} 12800001 - package manager error.
         * @throws {BusinessError} 12800008 - input method manager service error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        getInputMethods(enable: boolean, callback: AsyncCallback<Array<InputMethodProperty>>): void;

        /**
         * List input methods
         * @param {boolean} enable :
         *     If true, collect enabled input methods.
         *     If false, collect disabled input methods.
         * @returns {Promise<Array<InputMethodProperty>>} the promise returned by the function.
         * @throws {BusinessError} 401 - parameter error.
         * @throws {BusinessError} 12800001 - package manager error.
         * @throws {BusinessError} 12800008 - input method manager service error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        getInputMethods(enable: boolean): Promise<Array<InputMethodProperty>>;

        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethod.InputMethodSetting.getInputMethods
         */
        listInputMethod(callback: AsyncCallback<Array<InputMethodProperty>>): void;
        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethod.InputMethodSetting.getInputMethods
         */
        listInputMethod(): Promise<Array<InputMethodProperty>>;

        /**
         * Show input method setting extension dialog
         * @since 9
         * @param {AsyncCallback<boolean>} callback - the callback of showOptionalInputMethods.
         * @throws {BusinessError} 12800008 - input method manager service error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        showOptionalInputMethods(callback: AsyncCallback<boolean>): void;

        /**
         * Show input method setting extension dialog
         * @since 9
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws {BusinessError} 12800008 - input method manager service error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        showOptionalInputMethods(): Promise<boolean>;

        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethod.InputMethodSetting.showOptionalInputMethods
         */
        displayOptionalInputMethod(callback: AsyncCallback<void>): void;

        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethod.InputMethodSetting.showOptionalInputMethods
         */
        displayOptionalInputMethod(): Promise<void>;
    }

    /**
     * @since 6
     */
    interface InputMethodController {
        /**
         * Stop input session
         * @param {AsyncCallback<boolean>} callback - the callback of stopInputSession.
         * @throws {BusinessError} 12800003 - input method client error.
         * @throws {BusinessError} 12800008 - input method manager service error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        stopInputSession(callback: AsyncCallback<boolean>): void;

        /**
         * Stop input session
         * @returns {Promise<boolean>} the promise returned by the function.
         * @throws {BusinessError} 12800003 - input method client error.
         * @throws {BusinessError} 12800008 - input method manager service error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        stopInputSession(): Promise<boolean>;

        /**
         * Stop input
         * @since 6
         * @deprecated since 9
         * @useinstead ohos.inputMethod.InputMethodController.stopInputSession
         * @syscap SystemCapability.MiscServices.InputMethodFramework
        */
        stopInput(callback: AsyncCallback<boolean>): void;

        /**
         * Stop input
         * @since 6
         * @returns { Promise<boolean> } the promise returned by the function.
         * @deprecated since 9
         * @useinstead ohos.inputMethod.InputMethodController.stopInputSession
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        stopInput(): Promise<boolean>;

        /**
         * Show soft keyboard
         * @permission ohos.permission.CONNECT_IME_ABILITY
         * @param {AsyncCallback<void>} callback - the callback of showSoftKeyboard.
         * @throws {BusinessError} 201 - permissions check fails.
         * @throws {BusinessError} 12800003 - input method client error.
         * @throws {BusinessError} 12800008 - input method manager service error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
        */
        showSoftKeyboard(callback: AsyncCallback<void>): void;

        /**
         * Show soft keyboard
         * @permission ohos.permission.CONNECT_IME_ABILITY
         * @returns {Promise<boolean>} the promise returned by the function.
         * @throws {BusinessError} 201 - permissions check fails.
         * @throws {BusinessError} 12800003 - input method client error.
         * @throws {BusinessError} 12800008 - input method manager service error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        showSoftKeyboard():Promise<void>;

        /**
         * Hide soft keyboard
         * @permission ohos.permission.CONNECT_IME_ABILITY
         * @param {AsyncCallback<void>} callback - the callback of hideSoftKeyboard.
         * @throws {BusinessError} 201 - permissions check fails.
         * @throws {BusinessError} 12800003 - input method client error.
         * @throws {BusinessError} 12800008 - input method manager service error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        hideSoftKeyboard(callback: AsyncCallback<void>): void;

        /**
         * Hide soft keyboard
         * @permission ohos.permission.CONNECT_IME_ABILITY
         * @returns {Promise<void>} the promise returned by the function.
         * @throws {BusinessError} 201 - permissions check fails.
         * @throws {BusinessError} 12800003 - input method client error.
         * @throws {BusinessError} 12800008 - input method manager service error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        hideSoftKeyboard():Promise<void>;
    }

    /**
     * input method property
     * @since 8
     */
    interface InputMethodProperty {
        /**
         * The name of input method
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethod.InputMethodProperty.name
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        readonly packageName: string;

        /**
         * The id of input method
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethod.InputMethodProperty.id
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        readonly methodId: string;

        /**
         * The name of input method
         * @since 9
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
         readonly name: string;

         /**
          * The id of input method
          * @since 9
          * @syscap SystemCapability.MiscServices.InputMethodFramework
          */
         readonly id: string;

        /**
         * The label of input method
         * @since 9
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        readonly label?: string;

        /**
         * The icon of input method
         * @since 9
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        readonly icon?: string;

        /**
         * The icon id of input method
         * @since 9
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        readonly iconId?: number;

        /**
         * The extra info of input method
         * @since 9
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        extra: object;
    }
}

export default inputMethod;