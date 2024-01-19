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
import {TabPaneThreadStates} from "../../../../../dist/trace/component/trace/sheet/TabPaneThreadStates.js"

const sqlit = require("../../../../../dist/trace/database/SqlLite.js")
jest.mock("../../../../../dist/trace/database/SqlLite.js");
describe('TabPaneThreadStates Test', () => {
    let tabPaneThreadStates = new TabPaneThreadStates();

    it('TabPaneThreadStatesTest01', function () {
        expect(tabPaneThreadStates.sortByColumn({
            key: 'name' ||  "thread" || "state",
            sort: () => {
            }
        })).toBeUndefined();
    });

    it('TabPaneThreadStatesTest05', function () {
        expect(tabPaneThreadStates.sortByColumn({
            key: !'name' || ! "thread" || !"state",
            sort: () => {
            }
        })).toBeUndefined();
    });


    it('TabPaneThreadStatesTest02', function () {
        // @ts-ignore
        let mockgetTabThreadStates = sqlit.getTabThreadStates
        mockgetTabThreadStates.mockResolvedValue(
            [{process: "11",
                thread: "222",
                wallDuration: 10,
                occurrences: 10,
                state: "sss",
                stateJX: "mm"
            },{process: "11",
                thread: "222",
                wallDuration: 10,
                occurrences: 10,
                state: "sss",
                stateJX: "mm"
            }]
        )
        let a = {rightNs: 1, leftNs: 0, threadIds: [11, 12, 13]}
        expect(tabPaneThreadStates.data = a).toBeTruthy();
    });

    it('TabPaneThreadStatesTest03', function () {
        // @ts-ignore
        let mockgetTabThreadStates = sqlit.getTabThreadStates
        mockgetTabThreadStates.mockResolvedValue([])
        let a = {rightNs: 1, leftNs: 0, threadIds: [11, 12, 13]}
        expect(tabPaneThreadStates.data = a).toBeTruthy();
    });

    it('TabPaneThreadStatesTest04', function () {
        expect(tabPaneThreadStates.initHtml()).toMatchInlineSnapshot(`
"
        <style>
        :host{
            display: flex;
            flex-direction: column;
            padding: 10px 10px;
        }
        </style>
        <div style=\\"display: flex;height: 20px;align-items: center;flex-direction: row;margin-bottom: 5px\\">
            <stack-bar id=\\"stack-bar\\" style=\\"flex: 1\\"></stack-bar>
            <label id=\\"time-range\\"  style=\\"width: auto;text-align: end;font-size: 10pt;\\">Selected range:0.0 ms</label>
        </div>
        <lit-table id=\\"tb-thread-states\\" style=\\"height: auto\\">
            <lit-table-column width=\\"25%\\" title=\\"Process\\" data-index=\\"process\\" key=\\"process\\"  align=\\"flex-start\\" order>
            </lit-table-column>
            <lit-table-column width=\\"1fr\\" title=\\"PID\\" data-index=\\"pid\\" key=\\"pid\\"  align=\\"flex-start\\" order >
            </lit-table-column>
            <lit-table-column width=\\"20%\\" title=\\"Thread\\" data-index=\\"thread\\" key=\\"thread\\"  align=\\"flex-start\\" order >
            </lit-table-column>
            <lit-table-column width=\\"1fr\\" title=\\"TID\\" data-index=\\"tid\\" key=\\"tid\\"  align=\\"flex-start\\" order >
            </lit-table-column>
            <lit-table-column width=\\"1fr\\" title=\\"State\\" data-index=\\"state\\" key=\\"state\\"  align=\\"flex-start\\" order >
            </lit-table-column>
            <lit-table-column width=\\"1fr\\" title=\\"Wall duration(ms)\\" data-index=\\"wallDuration\\" key=\\"wallDuration\\"  align=\\"flex-start\\" order >
            </lit-table-column>
            <lit-table-column width=\\"1fr\\" title=\\"Avg Wall duration(ms)\\" data-index=\\"avgDuration\\" key=\\"avgDuration\\"  align=\\"flex-start\\" order >
            </lit-table-column>
            <lit-table-column width=\\"1fr\\" title=\\"Occurrences\\" data-index=\\"occurrences\\" key=\\"occurrences\\"  align=\\"flex-start\\" order >
            </lit-table-column>
        </lit-table>
        "
`);
    });
})
