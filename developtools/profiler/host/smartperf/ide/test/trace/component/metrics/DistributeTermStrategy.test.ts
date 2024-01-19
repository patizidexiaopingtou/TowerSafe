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
import {initDistributedTermData} from "../../../../dist/trace/component/metrics/DistributeTermStrategy.js";

describe('DistributeTermStrategy Test', () => {
    let metricData=[{
        length:1,
        funName:"name",
        ts:"ts",
        dur:"",
        flag: 'fd,fdsf.fds',
        trace_name:"name1",
        chainId:"1",
        spanId:"span",
        parentSpanId:"",
        processId:"",
        threadId:"",
        threadName:"",
        processName:""
    }]
    it('initDistributedTermDataTest01', () => {
        expect(initDistributedTermData(metricData)).toBeTruthy();
    });

})