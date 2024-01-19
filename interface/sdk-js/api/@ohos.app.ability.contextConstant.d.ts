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
 * The context of an application. It allows access to application-specific resources.
 *
 * @since 9
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @StageModelOnly
 */
 declare namespace contextConstant {

    /**
     * File area mode
     *
     * @since 9
     * @syscap SystemCapability.Ability.AbilityRuntime.Core
     * @StageModelOnly
     */
    export enum AreaMode {
        /**
         * System level device encryption area
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         */
        EL1 = 0,

        /**
         * User credential encryption area
         * @syscap SystemCapability.Ability.AbilityRuntime.Core
         */
        EL2 = 1
    }
}

export default contextConstant;