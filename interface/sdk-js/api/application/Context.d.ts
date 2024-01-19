/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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

import { ApplicationInfo } from "../bundleManager/ApplicationInfo";
import resmgr from "../@ohos.resourceManager";
import BaseContext from "./BaseContext";
import EventHub from "./EventHub";
import ApplicationContext from "./ApplicationContext";
import contextConstant from "../@ohos.app.ability.contextConstant"

/**
 * The base context of an ability or an application. It allows access to
 * application-specific resources.
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @StageModelOnly
 * @since 9
 */
export default class Context extends BaseContext {
    /**
     * Indicates the capability of accessing application resources.
     * @type { resmgr.ResourceManager }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    resourceManager: resmgr.ResourceManager;

    /**
     * Indicates configuration information about an application.
     * @type { ApplicationInfo }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    applicationInfo: ApplicationInfo;

    /**
     * Indicates app cache dir.
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    cacheDir: string;

    /**
     * Indicates app temp dir.
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    tempDir: string;

    /**
     * Indicates app files dir.
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    filesDir: string;

    /**
     * Indicates app database dir.
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    databaseDir: string;

    /**
     * Indicates app preferences dir.
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    preferencesDir: string;

    /**
     * Indicates app bundle code dir.
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    bundleCodeDir: string;

    /**
     * Indicates app distributed files dir.
     * @type { string }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    distributedFilesDir: string;

    /**
     * Indicates event hub.
     * @type { EventHub }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    eventHub: EventHub;

    /**
     * Indicates file area.
     * @type { AreaMode }
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    area: contextConstant.AreaMode;

    /**
     * Create a bundle context
     * @permission ohos.permission.GET_BUNDLE_INFO_PRIVILEGED
     * @param { string } bundleName - Indicates the bundle name.
     * @returns { Context } Returns the application context.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    createBundleContext(bundleName: string): Context;

    /**
     * Create a module context
     * @param { string } moduleName - Indicates the module name.
     * @returns { Context } Returns the application context.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    createModuleContext(moduleName: string): Context;

    /**
     * Create a module context
     * @param { string } bundleName - Indicates the bundle name.
     * @param { string } moduleName - Indicates the module name.
     * @returns { Context } Returns the application context.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    createModuleContext(bundleName: string, moduleName: string): Context;

    /**
     * Get application context
     * @returns { ApplicationContext } Returns the application context.
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     * @since 9
     */
    getApplicationContext(): ApplicationContext;
}
