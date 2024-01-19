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

import Want from './@ohos.app.ability.Want';

/**
 * interface of formInfo.
 * @namespace formInfo
 * @syscap SystemCapability.Ability.Form
 * @since 9
 */
declare namespace formInfo {
    /**
     * Provides information about a form.
     * @typedef FormInfo
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    interface FormInfo {
        /**
         * Obtains the bundle name of the application to which this form belongs.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        bundleName: string;

        /**
         * Obtains the name of the application module to which this form belongs.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        moduleName: string;

        /**
         * Obtains the class name of the ability to which this form belongs.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        abilityName: string;

        /**
         * Obtains the name of this form.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        name: string;

        /**
         * Obtains the name of this form.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        description: string;

        /**
         * Obtains the type of this form. Currently, JS forms are supported.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        type: FormType;

        /**
         * Obtains the JS component name of this JS form.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        jsComponentName: string;

        /**
         * Obtains the color mode of this form.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        colorMode: ColorMode;

        /**
         * Checks whether this form is a default form.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        isDefault: boolean;

        /**
         * Obtains the updateEnabled.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        updateEnabled: boolean;

        /**
         * Obtains whether notify visible of this form.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        formVisibleNotify: boolean;

        /**
         * Obtains the scheduledUpdateTime.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        scheduledUpdateTime: string;

        /**
         * Obtains the form config ability about this form.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        formConfigAbility: string;

        /**
         * Obtains the updateDuration.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        updateDuration: number;

        /**
         * Obtains the default grid style of this form.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        defaultDimension: number;

        /**
         * Obtains the grid styles supported by this form.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        supportDimensions: Array<number>;

        /**
         * Obtains the custom data defined in this form.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        customizeData: {[key: string]: [value: string]};
    }

    /**
     * Type of form.
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @since 9
    */
    enum FormType {
        /**
         * JS form.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        JS = 1,

        /**
         * eTS form.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        eTS = 2
    }

    /**
     * Color mode.
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @since 9
    */
    enum ColorMode {
        /**
         * Automatic mode.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        MODE_AUTO = -1,

        /**
         * Dark mode.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        MODE_DARK = 0,

        /**
         * Light mode.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        MODE_LIGHT = 1
    }

    /**
     * Provides state information about a form.
     * @typedef FormStateInfo
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    interface FormStateInfo {
        /**
         * Obtains the form state.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        formState: FormState;

        /**
         * Obtains the want form .
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        want: Want;
    }

    /**
     * Provides state about a form.
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    enum FormState {
        /**
         * Indicates that the form status is unknown due to an internal error.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        UNKNOWN = -1,

        /**
         * Indicates that the form is in the default state.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        DEFAULT = 0,

        /**
         * Indicates that the form is ready.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        READY = 1,
    }

    /**
     * Parameter of form.
     * @enum { string }
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    enum FormParam {
        /**
         * Indicates the key specifying the ID of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       IDENTITY_KEY: "119476135"
         *    }
         * }.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        IDENTITY_KEY = "ohos.extra.param.key.form_identity",

        /**
         * Indicates the key specifying the grid style of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       DIMENSION_KEY: FormDimension.Dimension_1_2
         *    }
         * }.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        DIMENSION_KEY = "ohos.extra.param.key.form_dimension",

        /**
         * Indicates the key specifying the name of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       NAME_KEY: "formName"
         *    }
         * }.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        NAME_KEY = "ohos.extra.param.key.form_name",

        /**
         * Indicates the key specifying the name of the module to which the form to be obtained belongs, which is
         * represented as
         * want: {
         *   "parameters": {
         *       MODULE_NAME_KEY: "formEntry"
         *    }
         * }
         * This constant is mandatory.
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        MODULE_NAME_KEY = "ohos.extra.param.key.module_name",

        /**
         * Indicates the key specifying the width of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       WIDTH_KEY: 800
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        WIDTH_KEY = "ohos.extra.param.key.form_width",

        /**
         * Indicates the key specifying the height of the form to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       HEIGHT_KEY: 400
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        HEIGHT_KEY = "ohos.extra.param.key.form_height",

        /**
         * Indicates the key specifying whether a form is temporary, which is represented as
         * want: {
         *   "parameters": {
         *       TEMPORARY_KEY: true
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        TEMPORARY_KEY = "ohos.extra.param.key.form_temporary",

        /**
         * Indicates the key specifying the name of the bundle to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       BUNDLE_NAME_KEY: "bundleName"
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        BUNDLE_NAME_KEY = "ohos.extra.param.key.bundle_name",

        /**
         * Indicates the key specifying the name of the ability to be obtained, which is represented as
         * want: {
         *   "parameters": {
         *       ABILITY_NAME_KEY: "abilityName"
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        ABILITY_NAME_KEY = "ohos.extra.param.key.ability_name",

        /**
         * Indicates the key specifying the the device ID, which is represented as
         * want: {
         *   "parameters": {
         *       DEVICE_ID_KEY : "EFC11C0C53628D8CC2F8CB5052477E130D075917034613B9884C55CD22B3DEF2"
         *    }
         * }
         *
         * @syscap SystemCapability.Ability.Form
         * @systemapi
         * @since 9
         */
        DEVICE_ID_KEY = "ohos.extra.param.key.device_id"
    }

    /**
     * The optional options used as filters to ask
     * getFormsInfo to return formInfos from only forms that match the options.
     * @typedef FormInfoFilter
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    interface FormInfoFilter {
        /**
         * optional moduleName that used to ask getFormsInfo to return
         * form infos with the same moduleName.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        moduleName?: string;
    }

    /**
     * Defines the FormDimension enum.
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    enum FormDimension {
        /**
         * 1 x 2 form
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        Dimension_1_2 = 1,

        /**
         * 2 x 2 form
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        Dimension_2_2,

        /**
         * 2 x 4 form
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        Dimension_2_4,

        /**
         * 4 x 4 form
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        Dimension_4_4,

        /**
         * 2 x 1 form
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        Dimension_2_1,
    }
    /**
     * The visibility of a form.
     * @enum { number }
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    enum VisibilityType {
        /**
         * Indicates the type of the form is visible.
         * Often used as a condition variable in function OnVisibilityChange to specify actions only on forms that are
         * changing to visible.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        FORM_VISIBLE = 1,
        /**
         * Indicates the type of the form is invisible.
         * Often used as a condition variable in function OnVisibilityChange to specify actions only on forms that are
         * changing to invisible.
         * @syscap SystemCapability.Ability.Form
         * @since 9
         */
        FORM_INVISIBLE,
    }
}
export default formInfo;