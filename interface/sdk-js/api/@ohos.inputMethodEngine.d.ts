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
 * Input method engine
 *
 * @since 8
 * @syscap SystemCapability.MiscServices.InputMethodFramework
 */
declare namespace inputMethodEngine {
    /**
     * When "enter" key is pressed, there is no action
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const ENTER_KEY_TYPE_UNSPECIFIED: number;

    /**
     * When "enter" key is pressed, it means GO
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const ENTER_KEY_TYPE_GO: number;

    /**
     * When "enter" key is pressed, it means SEARCH
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const ENTER_KEY_TYPE_SEARCH: number;

    /**
     * When "enter" key is pressed, it means SEND
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const ENTER_KEY_TYPE_SEND: number;

    /**
     * When "enter" key is pressed, it means NEXT
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const ENTER_KEY_TYPE_NEXT: number;

    /**
     * When "enter" key is pressed, it means DONE
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const ENTER_KEY_TYPE_DONE: number;

    /**
     * When "enter" key is pressed, it means PREVIOUS
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const ENTER_KEY_TYPE_PREVIOUS: number;

    /**
     * Editor with no special function
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const PATTERN_NULL: number;

    /**
     * Editor of type TEXT
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const PATTERN_TEXT: number;

    /**
     * Editor of type NUMBER
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const PATTERN_NUMBER: number;

    /**
     * Editor of type PHONE NUMBER
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const PATTERN_PHONE: number;

    /**
     * Editor of type DATETIME
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const PATTERN_DATETIME: number;

    /**
     * Editor of type EMAIL
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const PATTERN_EMAIL: number;

    /**
     * Editor of type URI
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const PATTERN_URI: number;

    /**
     * Editor of type PASSWORD
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const PATTERN_PASSWORD: number;

    /**
     * Editor in SELECTING state
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const FLAG_SELECTING: number;

    /**
     * Editor in SINGLE_LINE state
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const FLAG_SINGLE_LINE: number;

    /**
     * The Editor displays in PART mode
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const DISPLAY_MODE_PART: number;

    /**
     * The Editor displays in FULL mode
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const DISPLAY_MODE_FULL: number;

    /**
     * Allows ASCII to be inputted
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const OPTION_ASCII: number;

    /**
     * Do not specify Editor's input type
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const OPTION_NONE: number;

    /**
     * Allows CHARACTERS to be inputted
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const OPTION_AUTO_CAP_CHARACTERS: number;

    /**
     * Allows SENTENCES to be inputted
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const OPTION_AUTO_CAP_SENTENCES: number;

    /**
     * Allows WORDS to be inputted
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const OPTION_AUTO_WORDS: number;

    /**
     * Allows MULTI_LINE to be inputted
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const OPTION_MULTI_LINE: number;

    /**
     * Half-screen mode
     * @since 8
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const OPTION_NO_FULLSCREEN: number;

    /**
     * The move direction of cursor: UP
     * @since 9
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const CURSOR_UP: number;

    /**
     * The move direction of cursor: DOWN
     * @since 9
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const CURSOR_DOWN: number;

    /**
     * The move direction of cursor: LEFT
     * @since 9
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const CURSOR_LEFT: number;

    /**
     * The move direction of cursor: RIGHT
     * @since 9
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const CURSOR_RIGHT: number;

    /**
     * The window styles for input method ability.
     * @since 9
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    const WINDOW_TYPE_INPUT_METHOD_FLOAT: number;

    /**
     * Get InputMethodAbility object to subscribe events about IME.
     * @returns { InputMethodAbility } the object of the InputMethodAbility.
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
    function getInputMethodAbility(): InputMethodAbility;

    /**
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.inputMethodEngine.getInputMethodAbility
     */
    function getInputMethodEngine(): InputMethodEngine;

    /**
     * Get KeyboardDelegate object to subscribe key event or events about editor.
     * @returns { KeyboardDelegate } the object of KeyboardDelegate.
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
    function getKeyboardDelegate(): KeyboardDelegate;

    /**
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.inputMethodEngine.getKeyboardDelegate
     */
    function createKeyboardDelegate(): KeyboardDelegate;

    /**
     * @since 8
     */
    interface KeyboardController {
        /**
         * Hide soft keyboard
         * @throws {BusinessError} 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        hide(callback: AsyncCallback<void>): void;

        /**
         * Hide soft keyboard
         * @throws {BusinessError} 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        hide(): Promise<void>;

        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethodEngine.KeyboardController.hide
         */
        hideKeyboard(callback: AsyncCallback<void>): void;

        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethodEngine.KeyboardController.hide
         */
        hideKeyboard(): Promise<void>;
    }

    /**
     * @since 8
     */
    interface InputMethodEngine {
        /**
         * Subscribe 'inputStart'
         * @since 8
         * @param type inputStart
         * @param callback give keyboard controller and text input client
         */
        on(type: 'inputStart', callback: (kbController: KeyboardController, textInputClient: TextInputClient) => void): void;

        /**
         * Unsubscribe 'inputStart'
         * @since 8
         * @param type inputStart
         * @param callback optional, give keyboard controller and text input client
         */
        off(type: 'inputStart', callback?: (kbController: KeyboardController, textInputClient: TextInputClient) => void): void;

        /**
         * Subscribe 'keyboardShow'|'keyboardHide'
         * @since 8
         * @param type keyboardShow|keyboardHide
         */
        on(type: 'keyboardShow'|'keyboardHide', callback: () => void): void;

        /**
         * Unsubscribe 'keyboardShow'|'keyboardHide'
         * @since 8
         * @param type keyboardShow|keyboardHide
         */
        off(type: 'keyboardShow'|'keyboardHide', callback?: () => void): void;
    }

    /**
     * <p>Control events about IME.</p>
     * <p>Events provided for IME to subscribe with callback function. When those events occur, the corresponding callback
     * will be invoked.</p>
     * @interface InputMethodAbility
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
     interface InputMethodAbility {
        /**
         * Subscribe 'inputStart' event.
         * @since 9
         * @param { 'inputStart' } type - the type of subscribe event.
         * @param { (kbController: KeyboardController, inputClient: InputClient) => void) } callback - the callback of on('inputStart').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        on(type: 'inputStart', callback: (kbController: KeyboardController, inputClient: InputClient) => void): void;

        /**
         * Unsubscribe 'inputStart' event.
         * @since 9
         * @param { 'inputStart' } type - the type of unsubscribe event.
         * @param { (kbController: KeyboardController, inputClient: InputClient) => void) } [callback] - the callback of off('inputStart').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        off(type: 'inputStart', callback?: (kbController: KeyboardController, inputClient: InputClient) => void): void;

        /**
         * Subscribe 'inputStop'.
         * @since 9
         * @param { 'inputStop' } type - the type of subscribe event.
         * @param { () => void } callback - the callback of on('inputStop').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        on(type: 'inputStop', callback: () => void): void;

        /**
         * Unsubscribe 'inputStop'.
         * @since 9
         * @param { 'inputStop' } type - the type of unsubscribe event.
         * @param { () => void } callback - the callback of off('inputStop').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        off(type: 'inputStop', callback: () => void): void;

        /**
         * Subscribe 'setCallingWindow'.
         * @since 9
         * @param { 'setCallingWindow' } type - the type of subscribe event.
         * @param { (wid:number) => void } callback - the callback of on('setCallingWindow').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        on(type: 'setCallingWindow', callback: (wid:number) => void): void;

        /**
         * Unsubscribe 'setCallingWindow'.
         * @since 9
         * @param { 'setCallingWindow' } type - the type of unsubscribe event.
         * @param { (wid:number) => void } callback - the callback of off('setCallingWindow').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        off(type: 'setCallingWindow', callback: (wid:number) => void): void;

        /**
         * Subscribe 'keyboardShow'|'keyboardHide'.
         * @since 9
         * @param { 'keyboardShow'|'keyboardHide' } type - the type of subscribe event.
         * @param { () => void } callback - the callback of on('keyboardShow'|'keyboardHide').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        on(type: 'keyboardShow'|'keyboardHide', callback: () => void): void;

        /**
         * Unsubscribe 'keyboardShow'|'keyboardHide'.
         * @since 9
         * @param { 'keyboardShow'|'keyboardHide' } type - the type of unsubscribe event.
         * @param { () => void } [callback] - the callback of off('keyboardShow'|'keyboardHide').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        off(type: 'keyboardShow'|'keyboardHide', callback?: () => void): void;

        /**
         * Subscribe 'setSubtype'.
         * @since 9
         * @param { 'setSubtype' } type - the type of subscribe event.
         * @param { (inputMethodSubtype: InputMethodSubtype) => void } callback - the callback of on('setSubtype').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        on(type: 'setSubtype', callback: (inputMethodSubtype: InputMethodSubtype) => void): void;

        /**
         * Unsubscribe 'setSubtype'.
         * @since 9
         * @param { 'setSubtype' } type - the type of subscribe event.
         * @param { (inputMethodSubtype: InputMethodSubtype) => void } [callback] - the callback of off('setSubtype').
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        off(type: 'setSubtype', callback?: (inputMethodSubtype: InputMethodSubtype) => void): void;
    }

    /**
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.inputMethodEngine.InputClient
     */
    interface TextInputClient {
        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethodEngine.InputClient.sendKeyFunction
         */
        sendKeyFunction(action: number, callback: AsyncCallback<boolean>): void;

        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethodEngine.InputClient.sendKeyFunction
         */
        sendKeyFunction(action: number): Promise<boolean>;

        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethodEngine.InputClient.deleteForward
         */
        deleteForward(length: number, callback: AsyncCallback<boolean>): void;

        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethodEngine.InputClient.deleteForward
         */
        deleteForward(length: number): Promise<boolean>;

        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethodEngine.InputClient.deleteBackward
         */
        deleteBackward(length: number, callback: AsyncCallback<boolean>): void;

        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethodEngine.InputClient.deleteBackward
         */
        deleteBackward(length: number): Promise<boolean>;

        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethodEngine.InputClient.insertText
         */
        insertText(text: string, callback: AsyncCallback<boolean>): void;

        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethodEngine.InputClient.insertText
         */
        insertText(text: string): Promise<boolean>;

        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethodEngine.InputClient.getForward
         */
        getForward(length: number, callback: AsyncCallback<string>): void;

        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethodEngine.InputClient.getForward
         */
        getForward(length: number): Promise<string>;

        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethodEngine.InputClient.getBackward
         */
        getBackward(length: number, callback: AsyncCallback<string>): void;

        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethodEngine.InputClient.getBackward
         */
        getBackward(length: number): Promise<string>;

        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethodEngine.InputClient.getEditorAttribute
         */
        getEditorAttribute(callback: AsyncCallback<EditorAttribute>): void;

        /**
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.inputMethodEngine.InputClient.getEditorAttribute
         */
        getEditorAttribute(): Promise<EditorAttribute>;
    }

    /**
     * Control events about Editor.
     * @interface InputClient
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     * @since 9
     */
     interface InputClient {
        /**
         * Send the function of the key.
         * @since 9
         * @param { number } action - action indicates the function of "enter" key.
         * @param { AsyncCallback<boolean> } callback - the callback of sendKeyFunction.
         * @throws { BusinessError } 401 - parameter error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        sendKeyFunction(action: number, callback: AsyncCallback<boolean>): void;

        /**
         * Send the function of the key.
         * @since 9
         * @param { number } action - action indicates the function of "enter" key.
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        sendKeyFunction(action: number): Promise<boolean>;

        /**
         * Delete text forward.
         * @since 9
         * @param { number } length - length of text which will be deleted forward.
         * @param { AsyncCallback<boolean> } callback - the callback of deleteForward.
         * @throws { BusinessError } 401 - parameter error.
         * @throws { BusinessError } 12800002 - Input method engine error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        deleteForward(length: number, callback: AsyncCallback<boolean>): void;

        /**
         * Delete text forward.
         * @param { number } length - length of text which will be deleted forward.
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error.
         * @throws { BusinessError } 12800002 - Input method engine error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        deleteForward(length: number): Promise<boolean>;

        /**
         * Delete text backward.
         * @param { number } length - length of text which will be deleted backward.
         * @param { AsyncCallback<boolean> } callback - the callback of deleteBackward.
         * @throws { BusinessError } 401 - parameter error.
         * @throws { BusinessError } 12800002 - Input method engine error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        deleteBackward(length: number, callback: AsyncCallback<boolean>): void;

        /**
         * Delete text backward.
         * @param { number } length - length of text which will be deleted backward.
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error.
         * @throws { BusinessError } 12800002 - Input method engine error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        deleteBackward(length: number): Promise<boolean>;

        /**
         * Insert text into Editor.
         * @param { string } text - text which will be inserted.
         * @param { AsyncCallback<boolean> } callback - the callback of insertText.
         * @throws { BusinessError } 401 - parameter error.
         * @throws { BusinessError } 12800002 - Input method engine error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        insertText(text: string, callback: AsyncCallback<boolean>): void;

        /**
         * Insert text into Editor.
         * @param { string } text - text which will be inserted.
         * @returns { Promise<boolean> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error.
         * @throws { BusinessError } 12800002 - Input method engine error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        insertText(text: string): Promise<boolean>;

        /**
         * Get the text before cursor.
         * @param { number } length - the length of text which will be got.
         * @param { AsyncCallback<string> } callback - the callback of getForward.
         * @throws { BusinessError } 401 - parameter error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800006 - Input method controller error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        getForward(length: number, callback: AsyncCallback<string>): void;

        /**
         * Get the text before cursor.
         * @param { number } length - the length of text which will be got.
         * @returns { Promise<string> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800006 - Input method controller error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        getForward(length: number): Promise<string>;

        /**
         * Get the text after cursor.
         * @param { number } length - the length of text which will be got.
         * @param { AsyncCallback<string> } callback - the callback of getBackward.
         * @throws { BusinessError } 401 - parameter error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800006 - Input method controller error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        getBackward(length: number, callback: AsyncCallback<string>): void;

        /**
         * Get the text after cursor.
         * @param { number } length - the length of text which will be got.
         * @returns { Promise<string> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error.
         * @throws { BusinessError } 12800003 - input method client error.
         * @throws { BusinessError } 12800006 - Input method controller error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        getBackward(length: number): Promise<string>;

        /**
         * Get attribute about editor.
         * @param { AsyncCallback<EditorAttribute> } callback - the callback of getEditorAttribute.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @since 9
         */
        getEditorAttribute(callback: AsyncCallback<EditorAttribute>): void;

        /**
         * Get attribute about editor.
         * @since 9
         * @returns { Promise<EditorAttribute> } the promise returned by the function.
         * @throws { BusinessError } 12800003 - input method client error.
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        getEditorAttribute(): Promise<EditorAttribute>;

        /**
         * Move cursor from input method.
         *
         * @since 9
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @param { number } direction - Indicates the distance of cursor to be moved.
         * @param { AsyncCallback<void> } callback - the callback of moveCursor.
         * @throws { BusinessError } 401 - parameter error.
         * @throws { BusinessError } 12800003 - input method client error.
         */
        moveCursor(direction: number, callback: AsyncCallback<void>): void;

        /**
         * Move cursor from input method.
         *
         * @since 9
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         * @param { number } direction - Indicates the distance of cursor to be moved.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - parameter error.
         * @throws { BusinessError } 12800003 - input method client error.
         */
        moveCursor(direction: number): Promise<void>;
    }

    /**
     * @since 8
     */
    interface KeyboardDelegate {
        /**
         * Subscribe key up or down event
         *
         * @since 8
         */
        on(type: 'keyDown'|'keyUp', callback: (event: KeyEvent) => boolean): void;

        /**
         * Unsubscribe key up or down event
         *
         * @since 8
         */
        off(type: 'keyDown'|'keyUp', callback?: (event: KeyEvent) => boolean): void;

        /**
         * Subscribe cursor context change
         *
         * @since 8
         */
        on(type: 'cursorContextChange', callback: (x: number, y: number, height: number) => void): void;

        /**
         * Unsubscribe cursor context change
         *
         * @since 8
         */
        off(type: 'cursorContextChange', callback?: (x: number, y: number, height: number) => void): void;

        /**
         * Subscribe selection change
         *
         * @since 8
         */
        on(type: 'selectionChange', callback: (oldBegin: number, oldEnd: number, newBegin: number, newEnd: number) => void): void;

        /**
         * Unsubscribe selection change
         *
         * @since 8
         */
        off(type: 'selectionChange', callback?: (oldBegin: number, oldEnd: number, newBegin: number, newEnd: number) => void): void;

        /**
         * Subscribe text change
         *
         * @since 8
         */
        on(type: 'textChange', callback: (text: string) => void): void;

        /**
         * Unsubscribe text change
         *
         * @since 8
         */
        off(type: 'textChange', callback?: (text: string) => void): void;
    }

    /**
     * @since 8
     */
    interface EditorAttribute {
        /**
         * Editor's pattern
         *
         * @since 8
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        readonly inputPattern: number;

        /**
         * Editor's key type
         *
         * @since 8
         * @syscap SystemCapability.MiscServices.InputMethodFramework
         */
        readonly enterKeyType: number;
    }

    /**
     * @since 8
     */
    interface KeyEvent {
        /**
         * Key code
         *
         * @since 8
         */
        readonly keyCode: number;

        /**
         * Key action
         *
         * @since 8
         */
        readonly keyAction: number;
    }
}

export default inputMethodEngine;
