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
 * Input method subtype
 * @since 9
 * @syscap SystemCapability.MiscServices.InputMethodFramework
 */
 export default interface InputMethodSubtype {
    /**
     * The label of input method subtype.
     * @since 9
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    readonly label?: string;

    /**
     * The name of input method.
     * @since 9
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    readonly name: string;

    /**
     * The id of input method subtype.
     * @since 9
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    readonly id: string;

    /**
     * The mode of input method subtype.
     * @since 9
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    readonly mode?: 'upper'|'lower';

    /**
     * The locale of input method subtype.
     * @since 9
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    readonly locale: string;

    /**
     * The language of input method subtype.
     * @since 9
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    readonly language: string;

    /**
     * The icon of input method subtype.
     * @since 9
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    readonly icon?: string;

    /**
     * The icon id of input method subtype.
     * @since 9
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    readonly iconId?: number;

    /**
     * The extra info of input method subtype.
     * @since 9
     * @syscap SystemCapability.MiscServices.InputMethodFramework
     */
    extra: object;
}