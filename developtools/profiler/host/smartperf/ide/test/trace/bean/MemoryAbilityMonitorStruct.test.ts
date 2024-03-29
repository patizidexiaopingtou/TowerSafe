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
import {MemoryAbilityMonitorStruct} from "../../../dist/trace/bean/MemoryAbilityMonitorStruct.js"

describe('MemoryAbilityMonitorStruct Test', ()=> {
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


    const Sourcedata = {
        frame: {
            x: 20,
            y: 20,
            width: 100,
            height: 100
        },
        maxMemoryByte: 200,
        value: 50
    }

    it('MemoryAbilityMonitorStructTest01', function () {
        expect(MemoryAbilityMonitorStruct.draw(ctx, data)).toBeUndefined()
    });

    it('MemoryAbilityMonitorStructTest02', function () {
        expect(MemoryAbilityMonitorStruct.draw(ctx, Sourcedata)).toBeUndefined()
    });



})