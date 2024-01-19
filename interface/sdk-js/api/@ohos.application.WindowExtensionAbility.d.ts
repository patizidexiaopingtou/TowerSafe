/*
 * Copyright (c) 2022-2022 Huawei Device Co., Ltd.
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

import rpc from "./@ohos.rpc";
import WindowExtensionContext from "./application/WindowExtensionContext";
import Want from './@ohos.app.ability.Want';
import window from './@ohos.window';

/**
 * class of window extension ability.
 *
 * @since 9
 * @syscap SystemCapability.WindowManager.WindowManager.Core
 * @systemapi hide for inner use.
 * @StageModelOnly
 */
export default class WindowExtensionAbility {
    /**
     * Indicates window extension ability context.
     *
     * @since 9
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @systemapi hide for inner use.
     * @StageModelOnly
     */
    context: WindowExtensionContext;

    /**
     * Called back when a window extension is first connected to an ability.
     *
     * @since 9
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @param want Indicates connection information about the Window ability.
     * @systemapi hide for inner use.
     * @StageModelOnly
     */
    onConnect(want: Want): void;

    /**
     * Called back when all abilities connected to a window extension are disconnected.
     *
     * @since 9
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @param want Indicates disconnection information about the window extension.
     * @systemapi hide for inner use.
     * @StageModelOnly
     */
    onDisconnect(want: Want): void;

    /**
     * Called back when window is created.
     *
     * @since 9
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @systemapi hide for inner use.
     * @StageModelOnly
     */
    onWindowReady(window: window.Window): void;
}

