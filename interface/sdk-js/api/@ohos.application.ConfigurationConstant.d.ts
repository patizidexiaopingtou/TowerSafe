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

/**
 * The definition of ConfigurationConstant.
 *
 * @since 8
 * @syscap SystemCapability.Ability.AbilityBase
 * @permission N/A
 * @deprecated since 9
 * @useinstead ohos.app.ability.ConfigurationConstant
 */
 declare namespace ConfigurationConstant {
    /**
     * @name ColorMode
     * @since 8
     * @syscap SystemCapability.Ability.AbilityBase
     * @permission N/A
     */
    export enum ColorMode {
        COLOR_MODE_NOT_SET = -1,
        COLOR_MODE_DARK = 0,
        COLOR_MODE_LIGHT = 1,
    }
}

export default ConfigurationConstant
