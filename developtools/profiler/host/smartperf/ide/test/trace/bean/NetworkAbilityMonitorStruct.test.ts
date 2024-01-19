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
// @ts-ignore
import {NetworkAbilityMonitorStruct} from "../../../dist/trace/bean/NetworkAbilityMonitorStruct.js"

describe('NetworkAbilityMonitorStruct Test', ()=> {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');

    const data = {
        frame: {
            x: 20,
            y: 20,
            width: 100,
            height: 100
        },
        startNS: 200,
        value: 50
    }

    const Sourcedate = {
        frame: {
            x: 20,
            y: 20,
            width: 100,
            height: 100
        },
        value: 50,
        maxNetworkRate: 50

    }

    it('NetworkAbilityMonitorStructTest01', function () {
        expect(NetworkAbilityMonitorStruct.draw(ctx, data)).toBeUndefined()
    });

    it('NetworkAbilityMonitorStructTest02', function () {
        expect(NetworkAbilityMonitorStruct.draw(ctx, Sourcedate)).toBeUndefined()
    });

})