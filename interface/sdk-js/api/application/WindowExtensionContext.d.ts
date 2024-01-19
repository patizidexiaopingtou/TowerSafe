/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

import { AsyncCallback } from "../basic";
import ExtensionContext from "./ExtensionContext";
import Want from "../@ohos.application.Want";
import StartOptions from "../@ohos.app.ability.StartOptions";

/**
 * The context of window extension. It allows access to
 * windowExtension-specific resources.
 * @syscap SystemCapability.WindowManager.WindowManager.Core
 * @systemapi
 * @stagemodelonly
 * @since 9
 */
export default class WindowExtensionContext extends ExtensionContext {
    /**
     * Window extension uses this method to start a specific ability.
     * @param { Want } want - Indicates the ability to start.
     * @param { StartOptions } options - Indicates the start options.
     * @param { AsyncCallback<void> } callback - The callback of startAbility.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @systemapi
     * @stagemodelonly
     * @since 9
     */
    startAbility(want: Want, options: StartOptions, callback: AsyncCallback<void>): void;

    /**
     * Window extension uses this method to start a specific ability.
     * @param { Want } want - Indicates the ability to start.
     * @param { StartOptions } options - Indicates the start options.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - If the input parameter is not valid parameter.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @systemapi
     * @stagemodelonly
     * @since 9
     */
    startAbility(want: Want, options?: StartOptions): Promise<void>;
}