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
import { Callback } from "./basic";
import Want from './@ohos.app.ability.Want';
import formInfo from './@ohos.app.form.formInfo';

/**
 * Interface of formHost.
 * @namespace formHost
 * @syscap SystemCapability.Ability.Form
 * @systemapi
 * @since 9
 */
declare namespace formHost {
    /**
     * Deletes an obtained form by its ID.
     * <p>After this method is called, the form won't be available for use by the application and the Form Manager
     * Service no longer keeps the cache information about the form.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { string } formId - Indicates the form ID.
     * @param { AsyncCallback<void> } callback - The callback of deleteForm.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function deleteForm(formId: string, callback: AsyncCallback<void>): void;

    /**
     * Deletes an obtained form by its ID.
     * <p>After this method is called, the form won't be available for use by the application and the Form Manager
     * Service no longer keeps the cache information about the form.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { string } formId - Indicates the form ID.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function deleteForm(formId: string): Promise<void>;

    /**
     * Releases an obtained form by its ID.
     * <p>After this method is called, the form won't be available for use by the application, but the Form Manager
     * Service still keeps the cache information about the form, so that the application can quickly obtain it based on
     * the {@code formId}.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { string } formId - Indicates the form ID
     * @param { AsyncCallback<void> } callback - The callback of releaseForm.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function releaseForm(formId: string, callback: AsyncCallback<void>): void;

    /**
     * Releases an obtained form by its ID.
     * <p>After this method is called, the form won't be available for use by the application, but the Form Manager
     * Service still keeps the cache information about the form, so that the application can quickly obtain it based on
     * the {@code formId}.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { string } formId - Indicates the form ID
     * @param { boolean } isReleaseCache - Indicates whether release cache or not.
     * @param { AsyncCallback<void> } callback - The callback of releaseForm.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function releaseForm(formId: string, isReleaseCache: boolean, callback: AsyncCallback<void>): void;

    /**
     * Releases an obtained form by its ID.
     * <p>After this method is called, the form won't be available for use by the application, but the Form Manager
     * Service still keeps the cache information about the form, so that the application can quickly obtain it based on
     * the {@code formId}.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { string } formId - Indicates the form ID
     * @param { boolean } isReleaseCache - Indicates whether release cache or not.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function releaseForm(formId: string, isReleaseCache?: boolean): Promise<void>;

    /**
     * Requests for form update.
     * <p>This method must be called when the application has detected that a system setting item (such as the language,
     * resolution, or screen orientation) being listened for has changed. Upon receiving the update request, the form
     * provider automatically updates the form data (if there is any update) through the form framework, with the update
     * process being unperceivable by the application.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { string } formId - Indicates the ID of the form to update.
     * @param { AsyncCallback<void> } callback - The callback of requestForm.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function requestForm(formId: string, callback: AsyncCallback<void>): void;

    /**
     * Requests for form update.
     * <p>This method must be called when the application has detected that a system setting item (such as the language,
     * resolution, or screen orientation) being listened for has changed. Upon receiving the update request, the form
     * provider automatically updates the form data (if there is any update) through the form framework, with the update
     * process being unperceivable by the application.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { string } formId - Indicates the ID of the form to update.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function requestForm(formId: string): Promise<void>;

    /**
     * Converts a specified temporary form that has been obtained by the application into a normal form.
     * @permission ohos.permission.REQUIRE_FORM
     * @param { string } formId - Indicates the ID of the temporary form to convert.
     * @param { AsyncCallback<void> } callback - The callback of castToNormalForm.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function castToNormalForm(formId: string, callback: AsyncCallback<void>): void;

    /**
     * Converts a specified temporary form that has been obtained by the application into a normal form.
     * @permission ohos.permission.REQUIRE_FORM
     * @param { string } formId - Indicates the ID of the temporary form to convert.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function castToNormalForm(formId: string): Promise<void>;

    /**
     * Sends a notification to the form framework to make the specified forms visible.
     * <p>After this method is successfully called, onVisibilityChange will be called to notify the form provider of
     * the form visibility change event.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { Array<string> } formIds - Indicates the IDs of the forms to be made visible.
     * @param { AsyncCallback<void> } callback - The callback of notifyVisibleForms.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function notifyVisibleForms(formIds: Array<string>, callback: AsyncCallback<void>): void;

    /**
     * Sends a notification to the form framework to make the specified forms visible.
     * <p>After this method is successfully called, onVisibilityChange will be called to notify the form provider of
     * the form visibility change event.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { Array<string> } formIds - Indicates the IDs of the forms to be made visible.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function notifyVisibleForms(formIds: Array<string>): Promise<void>;

    /**
     * Sends a notification to the form framework to make the specified forms invisible.
     * <p>After this method is successfully called, onVisibilityChange will be called to notify the form provider of
     * the form visibility change event.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { Array<string> } formIds - Indicates the IDs of the forms to be made invisible.
     * @param { AsyncCallback<void> } callback - The callback of notifyInvisibleForms.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function notifyInvisibleForms(formIds: Array<string>, callback: AsyncCallback<void>): void;

    /**
     * Sends a notification to the form framework to make the specified forms invisible.
     * <p>After this method is successfully called, onVisibilityChange will be called to notify the form provider of
     * the form visibility change event.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { Array<string> } formIds - Indicates the IDs of the forms to be made invisible.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function notifyInvisibleForms(formIds: Array<string>): Promise<void>;

    /**
     * Notify the form framework to make the specified forms updatable.
     * <p>You can use this method to set form refresh state to true, the form can receive new
     * update from service.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { Array<string> } formIds - Indicates the IDs of the forms to be made invisible.
     * @param { AsyncCallback<void> } callback - The callback of enableFormsUpdate.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function enableFormsUpdate(formIds: Array<string>, callback: AsyncCallback<void>): void;

    /**
     * Notify the form framework to make the specified forms updatable.
     * <p>You can use this method to set form refresh state to true, the form can receive new
     * update from service.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { Array<string> } formIds - Indicates the IDs of the forms to be made invisible.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function enableFormsUpdate(formIds: Array<string>): Promise<void>;

    /**
     * Notify the form framework to make the specified forms non-updatable.
     * <p>You can use this method to set form refresh state to false, the form do not receive
     * new update from service.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { Array<string> } formIds - Indicates the IDs of the forms to be made invisible.
     * @param { AsyncCallback<void> } callback - The callback of disableFormsUpdate.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function disableFormsUpdate(formIds: Array<string>, callback: AsyncCallback<void>): void;

    /**
     * Notify the form framework to make the specified forms non updatable.
     * <p>You can use this method to set form refresh state to false, the form do not receive
     * new update from service.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { Array<string> } formIds - Indicates the IDs of the forms to be made invisible.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function disableFormsUpdate(formIds: Array<string>): Promise<void>;

    /**
     * Checks whether the system is ready.
     * <p>You can use this method to obtain the system is ready.</p>
     * @param { AsyncCallback<void> } callback - The callback of isSystemReady.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function isSystemReady(callback: AsyncCallback<void>): void;

    /**
     * Checks whether the system is ready.
     * <p>You can use this method to obtain the system is ready.</p>
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function isSystemReady(): Promise<void>;

    /**
     * Obtains the FormInfo objects provided by all applications on the device.
     * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
     * @param { AsyncCallback<Array<formInfo.FormInfo>> } callback - The callback is used to return the FormInfo.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function getAllFormsInfo(callback: AsyncCallback<Array<formInfo.FormInfo>>): void;

    /**
     * Obtains the FormInfo objects provided by all applications on the device.
     * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
     * @returns { Promise<Array<formInfo.FormInfo>> } Returns the FormInfo.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function getAllFormsInfo(): Promise<Array<formInfo.FormInfo>>;

    /**
     * Obtains the FormInfo objects provided by a specified application on the device.
     * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
     * @param { string } bundleName - Indicates the bundle name of the application.
     * @param { AsyncCallback<Array<formInfo.FormInfo>> } callback - The callback is used to return the FormInfo.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function getFormsInfo(bundleName: string, callback: AsyncCallback<Array<formInfo.FormInfo>>): void;

    /**
     * Obtains the FormInfo objects provided by a specified application on the device.
     * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
     * @param { string } bundleName - Indicates the bundle name of the application.
     * @param { string } moduleName - Indicates the module name of the application.
     * @param { AsyncCallback<Array<formInfo.FormInfo>> } callback - The callback is used to return the FormInfo.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function getFormsInfo(bundleName: string, moduleName: string, callback: AsyncCallback<Array<formInfo.FormInfo>>): void;

    /**
     * Obtains the FormInfo objects provided by a specified application on the device.
     * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
     * @param { string } bundleName - Indicates the bundle name of the application.
     * @param { string } moduleName - Indicates the module name of the application.
     * @returns { Promise<Array<formInfo.FormInfo>> } Returns the FormInfo.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function getFormsInfo(bundleName: string, moduleName?: string): Promise<Array<formInfo.FormInfo>>;

    /**
     * Deletes invalid forms of the application in the Form Manager Service based on the list of.
     * <p>You can use this method to delete invalid forms of the application.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { Array<string> } formIds - Indicates the specified form id.
     * @param { AsyncCallback<number> } callback - The callback is used to return the number of invalid forms deleted
     *                                             by the Form Manager Service.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function deleteInvalidForms(formIds: Array<string>, callback: AsyncCallback<number>): void;

    /**
     * Deletes invalid forms of the application in the Form Manager Service based on the list of.
     * <p>You can use this method to delete invalid forms of the application.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { Array<string> } formIds - Indicates the specified form id.
     * @returns { Promise<number> } Returns the number of invalid forms deleted by the Form Manager Service.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function deleteInvalidForms(formIds: Array<string>): Promise<number>;

    /**
     * Obtains the Form state.
     * <p>You can use this method to obtains the form state.</p>
     * @permission ohos.permission.REQUIRE_FORM and ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
     * @param { Want } want - Indicates want of the form.
     * @param { AsyncCallback<formInfo.FormStateInfo> } callback - The callback is used to return the form state.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function acquireFormState(want: Want, callback: AsyncCallback<formInfo.FormStateInfo>): void;

    /**
     * Obtains the Form state.
     * <p>You can use this method to obtains the form state.</p>
     * @permission ohos.permission.REQUIRE_FORM and ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
     * @param { Want } want - Indicates want of the form.
     * @returns { Promise<formInfo.FormStateInfo> } Returns the form state.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function acquireFormState(want: Want): Promise<formInfo.FormStateInfo>;

    /**
     * Listens to the event of uninstall form.
     * <p>You can use this method to listen to the event of uninstall form.</p>
     * @param { string } type - Indicates event type.
     * @param { Callback<string> } callback - The callback of formUninstall.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function on(type: "formUninstall", callback: Callback<string>): void;

    /**
     * Cancels listening to the event of uninstall form.
     * <p>You can use this method to cancel listening to the event of uninstall form.</p>
     * @param { string } type - Indicates event type.
     * @param { Callback<string> } callback - The callback of formUninstall.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function off(type: "formUninstall", callback?: Callback<string>): void;

    /**
     * Notify form is Visible
     * <p>You can use this method to notify form visible state.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { Array<string> } formIds - Indicates the specified form id.
     * @param { boolean } isVisible - Indicates whether visible.
     * @param { AsyncCallback<void> } callback - The callback of notifyFormsVisible.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function notifyFormsVisible(formIds: Array<string>, isVisible: boolean, callback: AsyncCallback<void>): void;

    /**
     * Notify form is Visible
     * <p>You can use this method to notify form visible state.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { Array<string> } formIds - Indicates the specified form id.
     * @param { boolean } isVisible - Indicates whether visible.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function notifyFormsVisible(formIds: Array<string>, isVisible: boolean): Promise<void>;

    /**
     * Notify form enable update state.
     * <p>You can use this method to notify form enable update state.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { Array<string> } formIds - Indicates the specified form id.
     * @param { boolean } isEnableUpdate - Indicates whether enable update.
     * @param { AsyncCallback<void> } callback - The callback of notifyFormsEnableUpdate.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function notifyFormsEnableUpdate(formIds: Array<string>, isEnableUpdate: boolean, callback: AsyncCallback<void>): void;

    /**
     * Notify form enable update state.
     * <p>You can use this method to notify form enable update state.</p>
     * @permission ohos.permission.REQUIRE_FORM
     * @param { Array<string> } formIds - Indicates the specified form id.
     * @param { boolean } isEnableUpdate - Indicates whether enable update.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function notifyFormsEnableUpdate(formIds: Array<string>, isEnableUpdate: boolean): Promise<void>;

    /**
     * Share form by formId and deviceId.
     * @permission ohos.permission.REQUIRE_FORM and ohos.permission.DISTRIBUTED_DATASYNC
     * @param { string } formId - Indicates the form ID.
     * @param { string } deviceId - Indicates the remote device ID.
     * @param { AsyncCallback<void> } callback - The callback of shareForm.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function shareForm(formId: string, deviceId: string, callback: AsyncCallback<void>): void;

    /**
     * Share form by formId and deviceId.
     * @permission ohos.permission.REQUIRE_FORM and ohos.permission.DISTRIBUTED_DATASYNC
     * @param { string } formId - Indicates the form ID.
     * @param { string } deviceId - Indicates the remote device ID.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function shareForm(formId: string, deviceId: string): Promise<void>;

    /**
     * Notify form that privacy whether to be protected.
     * @permission ohos.permission.REQUIRE_FORM
     * @param { Array<string> } formIds - Indicates the specified form id.
     * @param { boolean } isProtected - Indicates whether to be protected.
     * @param { AsyncCallback<void> } callback - The callback of notifyFormsPrivacyProtected.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function notifyFormsPrivacyProtected(formIds: Array<string>, isProtected: boolean, callback: AsyncCallback<void>): void;

    /**
     * Notify form that privacy whether to be protected.
     * @permission ohos.permission.REQUIRE_FORM
     * @param { Array<string> } formIds - Indicates the specified form id.
     * @param { boolean } isProtected - Indicates whether to be protected.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.Form
     * @systemapi
     * @since 9
     */
    function notifyFormsPrivacyProtected(formIds: Array<string>, isProtected: boolean): Promise<void>;
}
export default formHost;