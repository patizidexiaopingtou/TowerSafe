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
 * Class of the enterprise admin extension ability.
 *
 * @since 9
 * @syscap SystemCapability.Customization.EnterpriseDeviceManager
 * @systemapi
 * @StageModelOnly
 */
export default class EnterpriseAdminExtensionAbility {
    /**
     * Called back when an application is enabled.
     *
     * @since 9
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @systemapi
     * @StageModelOnly
     */
    onAdminEnabled(): void;

    /**
     * Called back when an application is disabled.
     *
     * @since 9
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @systemapi
     * @StageModelOnly
     */
    onAdminDisabled(): void;

    /**
     * Called back when a bundle is installed.
     * @param { string } bundleName - bundleName indicates the name of the bundle installed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    onBundleAdded(bundleName: string): void;

    /**
     * Called back when a bundle is uninstalled.
     * @param { string } bundleName - bundleName indicates the name of the bundle uninstalled.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    onBundleRemoved(bundleName: string): void;
}