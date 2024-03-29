/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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

/**
 * The class of an process running information.
 *
 * @since 8
 * @syscap SystemCapability.Ability.AbilityRuntime.Mission
 * @permission N/A
 * @deprecated since 9
 * @useinstead ProcessInformation
 */
export interface ProcessRunningInfo {
    /**
     * @default process id
     * @since 8
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @deprecated since 9
     * @useinstead ProcessInformation.pid
     */
    pid: number;

    /**
     * @default user id
     * @since 8
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @deprecated since 9
     * @useinstead ProcessInformation.uid
     */
    uid: number;

    /**
     * @default the name of the process
     * @since 8
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @deprecated since 9
     * @useinstead ProcessInformation.processName
     */
    processName: string;

    /**
     * @default an array of the bundleNames running in the process
     * @since 8
     * @syscap SystemCapability.Ability.AbilityRuntime.Mission
     * @deprecated since 9
     * @useinstead ProcessInformation.bundleNames
     */
    bundleNames: Array<string>;
}