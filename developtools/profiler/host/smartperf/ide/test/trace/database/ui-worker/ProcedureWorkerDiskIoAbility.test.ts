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
import {DiskAbilityMonitorStruct,diskIoAbility,DiskIoAbilityRender} from "../../../../dist/trace/database/ui-worker/ProcedureWorkerDiskIoAbility.js";
//@ts-ignore
import {Rect} from "../../../dist/trace/database/ProcedureWorkerCommon";

describe('ProcedureWorkerDiskIoAbility Test', () => {
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
        maxDiskRate: 200,
        value: 50
    }
    let res = [{
        startNS: 0,
        dur: 10,
        frame: {
            x:0,
            y:9,
            width:10,
            height:10
        }
    }]

    it('ProcedureWorkerDiskIoAbilityTest01', function () {
        expect(DiskAbilityMonitorStruct.draw(ctx, data)).toBeUndefined()
    });

    it('ProcedureWorkerDiskIoAbilityTest03', function () {
        expect(DiskAbilityMonitorStruct.draw(ctx, Sourcedata)).toBeUndefined()
    });
    it('CpuAbilityMonitorStructTest02', function () {
        let dataList = new Array();
        dataList.push({startNS: 0, dur: 10, frame: {x:0, y:9, width:10, height:10}})
        dataList.push({startNS: 1, dur: 111})
        diskIoAbility(dataList, [{length: 1}], 1, 100254, 100254, "",true)
    });

    it('CpuAbilityMonitorStructTest03', function () {
        let dataList = new Array();
        dataList.push({startNS: 0, dur: 10, frame: {x:0, y:9, width:10, height:10}})
        dataList.push({startNS: 1, dur: 111})
        diskIoAbility(dataList, [{length: 0}], 1, 100254, 100254, "",false)
    });

    it('CpuAbilityMonitorStructTest04', function () {
        let diskIoAbilityRender = new DiskIoAbilityRender()
        let  req = {
            lazyRefresh:true,
            type:"",
            startNS:1,
            endNS:1,
            totalNS:1,
            frame: {
                x: 20,
                y: 20,
                width: 100,
                height: 100
            },
            useCache:false,
            range:{
                refresh:"",
            },
            canvas:'',
            context:{
                font:"11px sans-serif",
                fillStyle:"#ec407a",
                globalAlpha:0.6,
            },
            lineColor:'',
            isHover:'',
            hoverX:1,
            params:'',
            wakeupBean:undefined,
            flagMoveInfo:'',
            flagSelectedInfo:'',
            slicesTime:3,
            id:1,
            x: 20,
            y: 20,
            width: 100,
            height: 100
        }
        window.postMessage = jest.fn(()=>true)
        expect(diskIoAbilityRender.render(req,[],[])).toBeUndefined()
    });
})