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
import {TabPaneCpuByProcess} from "../../../../../dist/trace/component/trace/sheet/TabPaneCpuByProcess.js"
const sqlit = require("../../../../../dist/trace/database/SqlLite.js")
jest.mock("../../../../../dist/trace/database/SqlLite.js");
describe('TabPaneCpuByProcess Test', () => {
    let tabPaneCpuByProcess = new TabPaneCpuByProcess();
    // tabPaneCpuByProcess.sortByColumn = jest.fn(()=> true)

    it('TabPaneCpuByProcessTest01', function () {
        expect(tabPaneCpuByProcess.sortByColumn({
            key: 'number',
        })).toBeUndefined();
    });

    it('TabPaneCpuByProcessTest05', function () {
        expect(tabPaneCpuByProcess.sortByColumn({
            sort: () => {
            }
        })).toBeUndefined();
    });

    it('TabPaneCpuByProcessTest04', function () {
        expect(tabPaneCpuByProcess.sortByColumn({
            key: 'pid'||'wallDuration'||'avgDuration'||'occurrences',
        })).toBeUndefined();
    });

    it('TabPaneCpuByProcessTest02', function () {
        let mockgetTabCpuByProcess = sqlit.getTabCpuByProcess
        mockgetTabCpuByProcess.mockResolvedValue([{process  : "test",
               wallDuration: 10,
               occurrences: 10
            },
            {process  : "test2",
            wallDuration: 11,
            occurrences: 11
            }]
        )
        let a = {rightNs: 1, cpus: [11, 12, 13]}
        expect(tabPaneCpuByProcess.data = a).toBeTruthy();
    });

    it('TabPaneCpuByProcessTest03', function () {
        let mockgetTabCpuByProcess = sqlit.getTabCpuByProcess
        mockgetTabCpuByProcess.mockResolvedValue([])
        let a = {rightNs: 1, cpus: [11, 12, 13]}
        expect(tabPaneCpuByProcess.data = a).toBeTruthy();
    });

    it('TabPaneCpuByProcessTest04', function () {
        expect(tabPaneCpuByProcess.initHtml()).toMatchInlineSnapshot(`
"
        <style>
        :host{
            display: flex;
            flex-direction: column;
            padding: 10px 10px;
        }
        </style>
        <label id=\\"time-range\\" style=\\"width: 100%;height: 20px;text-align: end;font-size: 10pt;margin-bottom: 5px\\">Selected range:0.0 ms</label>
        <lit-table id=\\"tb-cpu-process\\" style=\\"height: auto\\">
            <lit-table-column order width=\\"30%\\" title=\\"Process\\" data-index=\\"process\\" key=\\"process\\" align=\\"flex-start\\" order>
            </lit-table-column>
            <lit-table-column order width=\\"1fr\\" title=\\"PID\\" data-index=\\"pid\\" key=\\"pid\\" align=\\"flex-start\\" order>
            </lit-table-column>
            <lit-table-column order width=\\"1fr\\" title=\\"Wall duration(ms)\\" data-index=\\"wallDuration\\" key=\\"wallDuration\\" align=\\"flex-start\\" order>
            </lit-table-column>
            <lit-table-column order width=\\"1fr\\" title=\\"Avg Wall duration(ms)\\" data-index=\\"avgDuration\\" key=\\"avgDuration\\" align=\\"flex-start\\" order>
            </lit-table-column>
            <lit-table-column order width=\\"1fr\\" title=\\"Occurrences\\" data-index=\\"occurrences\\" key=\\"occurrences\\" align=\\"flex-start\\" order>
            </lit-table-column>
        </lit-table>
        "
`)
    });
})
