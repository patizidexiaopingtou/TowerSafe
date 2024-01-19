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
import {TabPaneContextSwitch} from "../../../../../dist/trace/component/trace/sheet/TabPaneContextSwitch.js"
window.ResizeObserver = window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));
describe('TabPaneContextSwitch Test', () => {
    let tabPaneContextSwitch = new TabPaneContextSwitch();
    let dataArray = [{
        id: "",
        pid: "",
        title: "",
        children: [],
        process: "",
        processId: 0,
        thread: "",
        threadId: 0,
        state: "",
        wallDuration: 0,
        avgDuration: "",
        count: 0,
        minDuration: 0,
        maxDuration: 0,
        stdDuration: "",
    }]

    it('TabPaneContextSwitchTest01', function () {
        let result = tabPaneContextSwitch.groupByProcessThreadToMap(dataArray);
        expect(result.get(0).length).toBeUndefined();
    });

    it('TabPaneContextSwitchTest02', function () {
        let result = tabPaneContextSwitch.groupByProcessToMap(dataArray)
        expect(result.get(0).length).toBe(1);
    });

    it('TabPaneContextSwitchTest03', function () {
        let result = tabPaneContextSwitch.groupByThreadToMap(dataArray)
        expect(result.get(0).length).toBe(1);
    });

    it('TabPaneContextSwitchTest04', function () {
        expect(tabPaneContextSwitch).not.toBeUndefined();
    });

    it('TabPaneContextSwitchTest05', function () {
        expect(tabPaneContextSwitch.initHtml()).toMatchInlineSnapshot(`
"
        <style>
        :host{
            display: flex;
            flex-direction: column;
            padding: 10px 10px;
        }
        </style>
        <label id=\\"time-range\\" style=\\"width: 100%;height: 20px;text-align: end;font-size: 10pt;margin-bottom: 5px\\">Selected range:0.0 ms</label>
        <lit-table id=\\"tb-cs\\" style=\\"height: auto\\" tree>
            <lit-table-column width=\\"500px\\" title=\\"Process/Thread/Event\\" data-index=\\"title\\" key=\\"title\\" align=\\"flex-start\\">
            </lit-table-column>
            <lit-table-column width=\\"1fr\\" title=\\"Count\\" data-index=\\"count\\" key=\\"count\\" align=\\"flex-start\\" >
            </lit-table-column>
        </lit-table>
        "
`);
    });

    it('TabPaneContextSwitchTest06', function () {
        document.body.innerHTML = `<tabpane-context-switch id="Switch"></tabpane-context-switch>`
        let tabPaneContextSwitch = document.querySelector('#Switch') as TabPaneContextSwitch
        tabPaneContextSwitch.data = false
        expect(tabPaneContextSwitch.data).toBeFalsy();
    });
})
