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
import {thread, ThreadStruct,ThreadRender} from "../../../../dist/trace/database/ui-worker/ProcedureWorkerThread.js";
// @ts-ignore
import {Rect} from "../../../../dist/trace/component/trace/timer-shaft/Rect.js";

describe(' ThreadTest', () => {

    let frame={
        x:0,
        y:9,
        width:10,
        height:10
    }
    it('ThreadTest01', () => {
        let dataList = new Array();
        dataList.push({startTime: 0, dur: 10, frame: {x:0, y:9, width:10, height:10}})
        dataList.push({startTime: 1, dur: 111})
        let rect = new Rect(0, 10, 10, 10);
        thread(dataList, [{length: 0}], 1, 100254, 100254, frame,true)
    })

    it('ThreadTest02', () => {
        let dataList = new Array();
        dataList.push({startTime: 0, dur: 10, frame: {x:0, y:9, width:10, height:10}})
        dataList.push({startTime: 1, dur: 111, frame: {x:0, y:9, width:10, height:10}})
        let rect = new Rect(0, 10, 10, 10);
        thread(dataList, [{length: 0}], 1, 100254, 100254, frame,false)
    })

    it('ThreadTest03', () => {
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
        expect(ThreadStruct.draw(ctx, data)).toBeUndefined()
    })

    it('ThreadTest04', () => {
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
            value: 50,
            state:"S"
        }
        expect(ThreadStruct.draw(ctx, data)).toBeUndefined()
    })

    it('ThreadTest05', () => {
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
            value: 50,
            state:"R"
        }
        expect(ThreadStruct.draw(ctx, data)).toBeUndefined()
    })

    it('ThreadTest06', () => {
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
            value: 50,
            state:"D"
        }
        expect(ThreadStruct.draw(ctx, data)).toBeUndefined()
    })

    it('ThreadTest07', () => {
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
            value: 50,
            state:"Running"
        }
        expect(ThreadStruct.draw(ctx, data)).toBeUndefined()
    })

    it('ThreadTest08', () => {
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
            value: 50,
            state:"T"
        }
        expect(ThreadStruct.draw(ctx, data)).toBeUndefined()
    })

    it('ThreadTest09', () => {
        const d1 = {
            cpu:1,
            tid:1,
            state:"",
            startTime:1,
            dur:1
        }
        const d2 = {
            cpu:1,
            tid:1,
            state:"",
            startTime:1,
            dur:1
        }
        expect(ThreadStruct.equals(d1, d2)).toBeTruthy()
    })

    it('ThreadTest10', function () {
        let threadRender = new ThreadRender()
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
        expect(threadRender.render(req,[],[])).toBeUndefined()
    });
});