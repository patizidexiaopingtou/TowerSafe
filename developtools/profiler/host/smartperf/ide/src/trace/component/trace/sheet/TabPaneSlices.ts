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

import {BaseElement, element} from "../../../../base-ui/BaseElement.js";
import {LitTable} from "../../../../base-ui/table/lit-table.js";
import {SelectionData, SelectionParam} from "../../../bean/BoxSelection.js";
import {getTabSlices, getTabSlicesAsyncFunc} from "../../../database/SqlLite.js";

@element('tabpane-slices')
export class TabPaneSlices extends BaseElement {
    private tbl: LitTable | null | undefined;
    private range: HTMLLabelElement | null | undefined;
    private source: Array<SelectionData> = []

    set data(val: SelectionParam | any) {
        this.range!.textContent = "Selected range: " + parseFloat(((val.rightNs - val.leftNs) / 1000000.0).toFixed(5)) + " ms"
        let asyncNames: Array<string> = [];
        let asyncPid: Array<number> = [];
        val.funAsync.forEach((it: any) => {
            asyncNames.push(it.name)
            asyncPid.push(it.pid)
        })
        getTabSlicesAsyncFunc(asyncNames, asyncPid, val.leftNs, val.rightNs).then(res => {
            getTabSlices(val.funTids, val.leftNs, val.rightNs).then((res2) => {
                let result = (res || []).concat(res2 || []);
                if (result != null && result.length > 0) {
                    let sumWall = 0.0;
                    let sumOcc = 0;
                    for (let e of result) {
                        e.name = e.name == null ? "" : e.name
                        sumWall += e.wallDuration
                        sumOcc += e.occurrences
                        e.wallDuration = parseFloat((e.wallDuration / 1000000.0).toFixed(5));
                        e.avgDuration = parseFloat((e.avgDuration / 1000000.0).toFixed(5));
                    }
                    let count = new SelectionData()
                    count.process = " ";
                    count.wallDuration = parseFloat((sumWall / 1000000.0).toFixed(5));
                    count.occurrences = sumOcc;
                    result.splice(0, 0, count)
                    this.source = result
                    this.tbl!.recycleDataSource = result
                } else {
                    this.source = [];
                    this.tbl!.recycleDataSource = this.source;
                }
            });
        });
    }

    initElements(): void {
        this.tbl = this.shadowRoot?.querySelector<LitTable>('#tb-slices');
        this.range = this.shadowRoot?.querySelector('#time-range');
        this.tbl!.addEventListener('column-click', (evt) => {
            // @ts-ignore
            this.sortByColumn(evt.detail)
        });
        new ResizeObserver((entries) => {
            if (this.parentElement?.clientHeight != 0) {
                // @ts-ignore
                this.tbl?.shadowRoot.querySelector(".table").style.height = (this.parentElement.clientHeight - 45) + "px"
                this.tbl?.reMeauseHeight()
            }
        }).observe(this.parentElement!)
    }

    initHtml(): string {
        return `
        <style>
        :host{
            display: flex;
            flex-direction: column;
            padding: 10px 10px;
        }
        </style>
        <label id="time-range" style="width: 100%;height: 20px;text-align: end;font-size: 10pt;margin-bottom: 5px">Selected range:0.0 ms</label>
        <lit-table id="tb-slices" style="height: auto">
            <lit-table-column title="Name" width="500px" data-index="name" key="name"  align="flex-start" order>
            </lit-table-column>
            <lit-table-column title="Wall duration(ms)" width="1fr" data-index="wallDuration" key="wallDuration"  align="flex-start" order >
            </lit-table-column>
            <lit-table-column title="Avg Wall duration(ms)" width="1fr" data-index="avgDuration" key="avgDuration"  align="flex-start" order >
            </lit-table-column>
            <lit-table-column title="Occurrences" width="1fr" data-index="occurrences" key="occurrences"  align="flex-start" order >
            </lit-table-column>
        </lit-table>
        `;
    }

    sortByColumn(detail: any) {
        // @ts-ignore
        function compare(property, sort, type) {
            return function (a: SelectionData, b: SelectionData) {
                if (a.process == " " || b.process == " ") {
                    return 0;
                }
                if (type === 'number') {
                    // @ts-ignore
                    return sort === 2 ? parseFloat(b[property]) - parseFloat(a[property]) : parseFloat(a[property]) - parseFloat(b[property]);
                } else {
                    // @ts-ignore
                    if (b[property] > a[property]) {
                        return sort === 2 ? 1 : -1;
                    } else { // @ts-ignore
                        if (b[property] == a[property]) {
                            return 0;
                        } else {
                            return sort === 2 ? -1 : 1;
                        }
                    }
                }
            }
        }

        if (detail.key === "name") {
            this.source.sort(compare(detail.key, detail.sort, 'string'))
        } else {
            this.source.sort(compare(detail.key, detail.sort, 'number'))
        }
        this.tbl!.recycleDataSource = this.source;
    }

}