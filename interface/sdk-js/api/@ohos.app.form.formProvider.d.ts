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

import { AsyncCallback } from "./basic";
import formBindingData from "./@ohos.app.form.formBindingData";
import formInfo from "./@ohos.app.form.formInfo";
import Want from "./@ohos.app.ability.Want";

/**
 * Interface of formProvider.
 * @namespace formProvider
 * @syscap SystemCapability.Ability.Form
 * @since 9
 */
declare namespace formProvider {
    /**
     * Set next update time for a specified form.
     * @param { string } formId - Indicates the form ID.
     * @param { number } minute - Indicates duration minute before next update.
     * @param { AsyncCallback<void> } callback - The callback of setFormNextRefreshTime.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    function setFormNextRefreshTime(formId: string, minute: number, callback: AsyncCallback<void>): void;

    /**
     * Set next update time for a specified form.
     * @param { string } formId - Indicates the form ID.
     * @param { number } minute - Indicates duration minute before next update.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    function setFormNextRefreshTime(formId: string, minute: number): Promise<void>;

    /**
     * Update a specified form.
     * Client to communication with FormManagerService.
     * @param { string } formId - Indicates the form ID.
     * @param { formBindingData.FormBindingData } formBindingData - Indicates the form data.
     * @param { AsyncCallback<void> } callback - The callback of updateForm.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    function updateForm(formId: string, formBindingData: formBindingData.FormBindingData, callback: AsyncCallback<void>): void;

    /**
     * Update a specified form.
     * Client to communication with FormManagerService.
     * @param { string } formId - Indicates the form ID.
     * @param { formBindingData.FormBindingData } formBindingData - Indicates the form data.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    function updateForm(formId: string, formBindingData: formBindingData.FormBindingData): Promise<void>;

    /**
     * Get info of all forms belonging to current bundle.
     * Client to communication with FormManagerService.
     * @param { formInfo.FormInfoFilter } filter - Indicates the requirements the forms that the formInfos belong to have to meet.
     * @param { AsyncCallback<Array<formInfo.FormInfo>> } callback - The callback is used to return the formInfo.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    function getFormsInfo(filter: formInfo.FormInfoFilter, callback: AsyncCallback<Array<formInfo.FormInfo>>): void;

    /**
     * Get infos of all forms belonging to current bundle.
     * Client to communication with FormManagerService.
     * @param { AsyncCallback<Array<formInfo.FormInfo>> } callback - The callback is used to return the formInfo.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    function getFormsInfo(callback: AsyncCallback<Array<formInfo.FormInfo>>): void;

    /**
     * Get infos of all forms belonging to current bundle.
     * Client to communication with FormManagerService.
     * @param { formInfo.FormInfoFilter } filter - Indicates the requirements the forms that the formInfos belong to have to meet.
     * @returns { Promise<Array<formInfo.FormInfo>> } Returns the formInfo.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @since 9
     */
    function getFormsInfo(filter?: formInfo.FormInfoFilter): Promise<Array<formInfo.FormInfo>>;

    /**
     * Request to publish a form to the form host.
     * @param { Want } want - The want of the form to publish.
     * @param { formBindingData.FormBindingData } formBindingData - Indicates the form data.
     * @param { AsyncCallback<string> } callback - The callback is used to return the form id.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function requestPublishForm(want: Want, formBindingData: formBindingData.FormBindingData, callback: AsyncCallback<string>): void;

    /**
     * Request to publish a form to the form host.
     * @param { Want } want - The want of the form to publish.
     * @param { AsyncCallback<string> } callback - The callback is used to return the form id.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function requestPublishForm(want: Want, callback: AsyncCallback<string>): void;

    /**
     * Request to publish a form to the form host.
     * @param { Want } want - The want of the form to publish.
     * @param { formBindingData.FormBindingData } formBindingData - Indicates the form data.
     * @returns { Promise<string> } Returns the form id.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function requestPublishForm(want: Want, formBindingData?: formBindingData.FormBindingData): Promise<string>;

    /**
     * Check if the request of publishing a form is supported by the host
     * @param { AsyncCallback<boolean> } callback - The callback is used to return true if the request is supported.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function isRequestPublishFormSupported(callback: AsyncCallback<boolean>): void;

    /**
     * Check if the request of publishing a form is supported by the host
     * @returns { Promise<boolean> } Returns true if the request is supported.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function isRequestPublishFormSupported(): Promise<boolean>;
}
export default formProvider;