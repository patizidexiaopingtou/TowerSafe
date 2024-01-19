/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import SPLogger from './SPLogger'
const TAG = "AbilityUtils"
/**
 * 启动ability  since API8
 * @param bundleName
 * @param abilityName
 */
export function commonStartAbility(bundleName: string, abilityName: string, parameters?: { [key: string]: any }) {
    SPLogger.INFO(TAG, "Operation bundleName:" + bundleName + "Operation abilityName:" + abilityName);
    let str = {
        "bundleName": bundleName,
        "abilityName": abilityName,
        "parameters": parameters
    }
    console.info(abilityName + ' Operation after. Cause:');
    globalThis.abilityContext.startAbility(str, (err, data) => {
        if (err) {
            SPLogger.ERROR(TAG,abilityName + ' Operation failed. Cause:' + JSON.stringify(err));
            return;
        }
        SPLogger.INFO(TAG,abilityName + ' Operation successful. Data: ' + JSON.stringify(data))
    });
}





