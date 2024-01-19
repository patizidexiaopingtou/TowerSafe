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

import {BaseElement, element} from "../../../../../base-ui/BaseElement.js";
import {LitTable} from "../../../../../base-ui/table/lit-table.js";
import {SelectionParam} from "../../../../bean/BoxSelection.js";
import {getTabPowerBatteryData} from "../../../../database/SqlLite.js";
import {SpHiSysEventChart} from "../../../chart/SpHiSysEventChart.js";
import "../../../../../base-ui/table/lit-table.js";

@element('tabpane-power-battery')
export class TabPanePowerBattery extends BaseElement {
    private tbl: LitTable | null | undefined;

    set data(val: SelectionParam | any) {
        this.queryDataByDB(val)
    }

    connectedCallback() {
        super.connectedCallback();
        new ResizeObserver((entries) => {
            if (this.parentElement?.clientHeight != 0) {
                // @ts-ignore
                this.tbl!.shadowRoot.querySelector(".table").style.height = (this.parentElement.clientHeight - 45) + "px"
                this.tbl!.reMeauseHeight()
            }
        }).observe(this.parentElement!);
    }

    initElements(): void {
        this.tbl = this.shadowRoot?.querySelector<LitTable>('#tb-power-battery-energy');
    }

    queryDataByDB(val: SelectionParam | any) {
        getTabPowerBatteryData(val.rightNs).then(result => {
            let list: Array<any> = []
            let powerData: any = {
                "POWER_IDE_BATTERY": {
                    gas_gauge: [],
                    charge: [],
                    screen: [],
                    level: [],
                    current: [],
                    capacity: [],
                    appName: "",
                    uid: [],
                }
            }
            result.forEach(item => {
                let powerDatum: any = powerData[item.eventName];
                if (item.appKey.toLocaleLowerCase() === "appname") {
                    powerDatum['appName'] = SpHiSysEventChart.app_name
                } else {
                    let eventData: Array<string> = item.eventValue.split(",");
                    if (eventData.length > 0) {
                        let i = eventData.length - 1 >= 0 ? eventData.length - 1 : 0
                        powerDatum[item.appKey.toLocaleLowerCase()] = eventData[i]
                    } else {
                        powerDatum[item.appKey.toLocaleLowerCase()] = eventData.toString()
                    }
                }
            })
            list.push({name: 'gasGauge', value: powerData["POWER_IDE_BATTERY"].gas_gauge})
            list.push({name: 'charge', value: powerData["POWER_IDE_BATTERY"].charge})
            list.push({name: 'screen', value: powerData["POWER_IDE_BATTERY"].screen})
            list.push({name: 'level', value: powerData["POWER_IDE_BATTERY"].level})
            list.push({name: 'current', value: powerData["POWER_IDE_BATTERY"].current})
            list.push({name: 'capacity', value: powerData["POWER_IDE_BATTERY"].capacity})
            list.push({name: 'uid', value: powerData["POWER_IDE_BATTERY"].uid})
            list.push({name: 'appName', value: SpHiSysEventChart.app_name!})
            if (list.length > 0) {
                this.tbl!.recycleDataSource = list
            } else {
                this.tbl!.recycleDataSource = []
            }
            this.tbl?.shadowRoot?.querySelectorAll<HTMLDivElement>(".tr").forEach(tr => {
                let td = tr.querySelectorAll<HTMLDivElement>(".td");
                this.setTableStyle(td[0], "0.9", "16px")
                this.setTableStyle(td[1], "0.6", "20px")

            })
        })
    }

    setTableStyle(td: HTMLDivElement, opacity: string, lineHeight: string) {
        td.style.fontWeight = "400"
        td.style.fontSize = "14px"
        td.style.opacity = opacity
        td.style.lineHeight = lineHeight
    }

    initHtml(): string {
        return `
        <style>
            .current-static{
                width: 100%;
                display: flex;
                top: 0;
                background: var(--dark-background,#ffffff);
                position: sticky;
            }
            .current-static h2{
                width: 50%;
                padding: 0 10px;
                font-size: 16px;
                font-weight: 400;
                visibility: visible;
            }
            .bottom-scroll-area{
                display: flex;
                height: auto;
                overflow-y: auto;
                margin-top: 1.2em;
            }
            .battery-canvas{
                width: 50%;
                padding: 0 10px;
            }
            
            #batteryTitle{
                opacity: 0.9;
                font-size: 14px;
                color: #000000;
                text-align: left;
                line-height: 16px;
                font-weight: 700;
            }
        </style>
        <div style="width: 100%;height: auto;position: relative">
            <div class="bottom-scroll-area">
                <div class="battery-canvas">
                    <lit-table id="tb-power-battery-energy" no-head style="height: auto">
                        <lit-table-column title="name" data-index="name" key="name" align="flex-start"  width="180px"></lit-table-column>
                        <lit-table-column title="value" data-index="value" key="value" align="flex-start" ></lit-table-column>
                    </lit-table>
                </div>
            </div>
        </div>
        `;
    }
}
