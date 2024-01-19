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
import "../TabPaneFilter.js";
import {FilterData, TabPaneFilter} from "../TabPaneFilter.js";
import {SelectionParam} from "../../../../bean/BoxSelection.js";
import {PerfCallChainMerageData} from "../../../../bean/PerfProfile.js";
import "../../../chart/FrameChart.js";
import {FrameChart} from "../../../chart/FrameChart.js";
import {ChartMode} from "../../../../bean/FrameChartStruct.js";
import '../../../DisassemblingWindow.js'
import {DisassemblingWindow} from "../../../DisassemblingWindow.js";
import {Cmd} from "../../../../../command/Cmd.js";
import {SpApplication} from "../../../../SpApplication.js";
import "../../../../../base-ui/slicer/lit-slicer.js";
import "../../../../../base-ui/progress-bar/LitProgressBar.js";
import {query, queryPerfSampleIdsByTimeRange} from "../../../../database/SqlLite.js";
import {LitProgressBar} from "../../../../../base-ui/progress-bar/LitProgressBar.js";
import {procedurePool} from "../../../../database/Procedure.js";
import {SpHiPerf} from "../../../chart/SpHiPerf.js";

@element('tabpane-perf-profile')
export class TabpanePerfProfile extends BaseElement {
    private tbl: LitTable | null | undefined;
    private tbr: LitTable | null | undefined;
    private progressEL:LitProgressBar | null | undefined;
    private rightSource: Array<PerfCallChainMerageData> = [];
    private filter: any
    private dataSource: any[] = []
    private sortKey = "weight";
    private sortType = 0;
    private currentSelectedData: any = undefined
    private frameChart: FrameChart | null | undefined;
    private isChartShow: boolean = false;
    private systmeRuleName = "/system/"
    private numRuleName = "/max/min/"
    private modal: DisassemblingWindow | null | undefined;
    private needShowMenu = true;
    private searchValue: string = ""
    private loadingList:number[] = []
    private loadingPage:any;
    private currentSelection:SelectionParam|undefined
    private isCurrentIsTopDown:boolean = true

    set data(val: SelectionParam | any) {
        this.currentSelection = val
        this.modal!.style.display = 'none';
        this.tbl!.style.visibility = "visible";
        if (this.parentElement!.clientHeight > this.filter!.clientHeight) {
            this.filter!.style.display = "flex";
        } else {
            this.filter!.style.display = "none";
        }
        this.filter!.initializeFilterTree(true, true, true)
        this.filter!.filterValue = ""
        this.progressEL!.loading = true
        this.loadingPage.style.visibility = "visible"
        this.isCurrentIsTopDown = true;
        this.getDataByWorker([{
            funcName: "setSearchValue",
            funcArgs: [""]
        }, {
            funcName: "getCurrentDataFromDb",
            funcArgs: [val]
        }], (results: any[]) => {
            this.setLTableData(results)
            this.tbr!.recycleDataSource = []
            this.frameChart!.mode = ChartMode.Count;
            this.frameChart!.data = this.dataSource;
            this.frameChart?.updateCanvas(true, this.clientWidth);
            this.frameChart?.calculateChartData();
        })
    }

    getParentTree(src: Array<PerfCallChainMerageData>, target: PerfCallChainMerageData, parents: Array<PerfCallChainMerageData>): boolean {
        for (let call of src) {
            if (call.id == target.id) {
                parents.push(call)
                return true
            } else {
                if (this.getParentTree(call.children as Array<PerfCallChainMerageData>, target, parents)) {
                    parents.push(call);
                    return true;
                }
            }
        }
        return false;
    }

    getChildTree(src: Array<PerfCallChainMerageData>, id: string, children: Array<PerfCallChainMerageData>): boolean {
        for (let call of src) {
            if (call.id == id && call.children.length == 0) {
                children.push(call)
                return true
            } else {
                if (this.getChildTree(call.children as Array<PerfCallChainMerageData>, id, children)) {
                    children.push(call);
                    return true;
                }
            }
        }
        return false;
    }

    setRightTableData(call: PerfCallChainMerageData) {
        let parents: Array<PerfCallChainMerageData> = [];
        let children: Array<PerfCallChainMerageData> = [];
        this.getParentTree(this.dataSource, call, parents);
        let maxId = call.id;
        let maxDur = 0;

        function findMaxStack(call: PerfCallChainMerageData) {
            if (call.children.length == 0) {
                if (call.dur > maxDur) {
                    maxDur = call.dur;
                    maxId = call.id;
                }
            } else {
                call.children.map((callChild) => {
                    findMaxStack(<PerfCallChainMerageData>callChild);
                })
            }
        }

        findMaxStack(call);
        this.getChildTree(call.children as Array<PerfCallChainMerageData>, maxId, children);
        let arr = parents.reverse().concat(children.reverse());
        for (let data of arr) {
            data.type = (data.libName.endsWith(".so.1") || data.libName.endsWith(".dll") || data.libName.endsWith(".so")) ? 0 : 1;
        }
        let len = arr.length;
        this.rightSource = arr;
        let rightSource:Array<any> = []
        if(len != 0){
            rightSource = this.rightSource.filter((item)=>{
                return item.canCharge
            })
        }
        this.tbr!.dataSource = rightSource;
    }

    showButtomMenu(isShow: boolean) {
        if (isShow) {
            this.filter.setAttribute('tree', '');
            this.filter.setAttribute('input', '');
            this.filter.setAttribute('inputLeftText', '');
        } else {
            this.filter.removeAttribute('tree');
            this.filter.removeAttribute('input');
            this.filter.removeAttribute('inputLeftText')
        }
    }

    initElements(): void {
        this.tbl = this.shadowRoot?.querySelector<LitTable>('#tb-perf-profile');
        this.progressEL = this.shadowRoot?.querySelector('.progress') as LitProgressBar
        this.frameChart = this.shadowRoot?.querySelector<FrameChart>('#framechart');
        this.modal = this.shadowRoot?.querySelector<DisassemblingWindow>('tab-native-data-modal');
        this.loadingPage = this.shadowRoot?.querySelector('.loading');
        this.frameChart!.addChartClickListener((needShowMenu: boolean) => {
            this.parentElement!.scrollTo(0, 0);
            this.showButtomMenu(needShowMenu)
            this.needShowMenu = needShowMenu;
        });
        this.tbl!.rememberScrollTop = true;
        this.filter = this.shadowRoot?.querySelector<TabPaneFilter>("#filter")
        this.tbl!.addEventListener('row-click', (evt: any) => {
            // @ts-ignore
            let data = (evt.detail.data as PerfCallChainMerageData);
            this.setRightTableData(data);
            data.isSelected = true;
            this.currentSelectedData = data;
            this.tbr?.clearAllSelection(data);
            this.tbr?.setCurrentSelection(data);
            // @ts-ignore
            if ((evt.detail as any).callBack) {
                // @ts-ignore
                (evt.detail as any).callBack(true)
            }
        })
        this.tbr = this.shadowRoot?.querySelector<LitTable>('#tb-perf-list');
        let lastClikTime = 0;
        this.tbr!.addEventListener('row-click', (evt: any) => {
            // @ts-ignore
            let data = (evt.detail.data as PerfCallChainMerageData);
            this.tbl?.clearAllSelection(data);
            (data as any).isSelected = true
            this.tbl!.scrollToData(data)
            // @ts-ignore
            if ((evt.detail as any).callBack) {
                // @ts-ignore
                (evt.detail as any).callBack(true)
            }
            let spApplication = <SpApplication>document.getElementsByTagName("sp-application")[0];
            if (Date.now() - lastClikTime < 200 && spApplication.vs) {
                this.tbl!.style.visibility = "hidden";
                this.filter.style.display = "none";
                new ResizeObserver((entries) => {
                    this.modal!.style.width = this.tbl!.clientWidth + 'px';
                    this.modal!.style.height = this.tbl!.clientHeight + 'px';
                }).observe(this.tbl!)
                this.modal!.showLoading();
                // @ts-ignore
                let data = (evt.detail.data as PerfCallChainMerageData);
                let path = data.path;
                let addr = data.vaddrInFile;
                let addrHex = addr.toString(16);
                if (path.trim() === '[kernel.kallsyms]') {
                    this.modal?.showContent(`error : Symbol ${data.symbol} lib is [kernel.kallsyms] ,not support `, addrHex);
                } else if (path.trim() === '') {
                    this.modal?.showContent(`error : Symbol ${data.symbol} lib is null `, addrHex);
                } else if (addr < 0) {
                    this.modal?.showContent(`error : Symbol ${data.symbol} current addr is error ` + addrHex, addrHex);
                } else {
                    const binDir = 'C:/binary_cache';
                    let binPath = binDir + path;
                    let cmd = 'C:/binary_cache/llvm-objdump.exe -S ' + binPath;
                    Cmd.execObjDump(cmd, addrHex, (result: any) => {
                        this.modal?.showContent(result, addrHex);
                    })
                }
            }
            lastClikTime = Date.now();
        })
        this.modal!.setCloseListener(() => {
            this.modal!.style.display = 'none';
            this.tbl!.style.visibility = "visible";
            this.shadowRoot!.querySelector<TabPaneFilter>("#filter")!.style.display = 'flex';
        });
        this.tbr = this.shadowRoot?.querySelector<LitTable>('#tb-perf-list');
        let filterFunc = (data: any) => {
            let args: any[] = []
            if (data.type == "check") {
                if (data.item.checked) {
                    args.push({
                        funcName: "splitTree",
                        funcArgs: [data.item.name, data.item.select == "0", data.item.type == "symbol"]
                    })
                } else {
                    args.push({
                        funcName: "resotreAllNode",
                        funcArgs: [[data.item.name]]
                    })
                    args.push({
                        funcName: "resetAllNode",
                        funcArgs: []
                    })
                    args.push({
                        funcName: "clearSplitMapData",
                        funcArgs: [data.item.name]
                    })
                }
            } else if (data.type == "select") {
                args.push({
                    funcName: "resotreAllNode",
                    funcArgs: [[data.item.name]]
                })
                args.push({
                    funcName: "clearSplitMapData",
                    funcArgs: [data.item.name]
                })
                args.push({
                    funcName: "splitTree",
                    funcArgs: [data.item.name, data.item.select == "0", data.item.type == "symbol"]
                })
            } else if (data.type == "button") {
                if (data.item == "symbol") {
                    if (this.currentSelectedData && !this.currentSelectedData.canCharge) {
                        return
                    }
                    if (this.currentSelectedData != undefined) {
                        this.filter!.addDataMining({name: this.currentSelectedData.symbolName}, data.item)
                        args.push({
                            funcName: "splitTree",
                            funcArgs: [this.currentSelectedData.symbolName, false, true]
                        })
                    } else {
                        return
                    }
                } else if (data.item == "library") {
                    if (this.currentSelectedData && !this.currentSelectedData.canCharge) {
                        return
                    }
                    if (this.currentSelectedData != undefined && this.currentSelectedData.libName != "") {
                        this.filter!.addDataMining({name: this.currentSelectedData.libName}, data.item)
                        args.push({
                            funcName: "splitTree",
                            funcArgs: [this.currentSelectedData.libName, false, false]
                        })
                    } else {
                        return
                    }
                } else if (data.item == "restore") {
                    if (data.remove != undefined && data.remove.length > 0) {
                        let list = data.remove.map((item: any) => {
                            return item.name
                        })
                        args.push({
                            funcName: "resotreAllNode",
                            funcArgs: [list]
                        })
                        args.push({
                            funcName: "resetAllNode",
                            funcArgs: []
                        })
                        list.forEach((symbolName: string) => {
                            args.push({
                                funcName: "clearSplitMapData",
                                funcArgs: [symbolName]
                            })
                        })
                    }
                }
            }
            this.getDataByWorker(args, (result: any[]) => {
                this.setLTableData(result)
                this.frameChart!.data = this.dataSource;
                if (this.isChartShow) this.frameChart?.calculateChartData();
                this.tbl!.move1px()
                if (this.currentSelectedData) {
                    this.currentSelectedData.isSelected = false;
                    this.tbl?.clearAllSelection(this.currentSelectedData)
                    this.tbr!.recycleDataSource = []
                    this.currentSelectedData = undefined
                }
            })
        }
        this.filter!.getDataLibrary(filterFunc)
        this.filter!.getDataMining(filterFunc)
        this.filter!.getCallTreeData((data: any) => {
            if (data.value == 0) {
                this.refreshAllNode({...this.filter!.getFilterTreeData(), callTree: data.checks})
            } else {
                let args: any[] = []
                if (data.checks[1]) {
                    args.push({
                        funcName: "hideSystemLibrary",
                        funcArgs: []
                    })
                    args.push({
                        funcName: "resetAllNode",
                        funcArgs: []
                    })
                } else {
                    args.push({
                        funcName: "resotreAllNode",
                        funcArgs: [[this.systmeRuleName]]
                    })
                    args.push({
                        funcName: "resetAllNode",
                        funcArgs: []
                    })
                    args.push({
                        funcName: "clearSplitMapData",
                        funcArgs: [this.systmeRuleName]
                    })
                }
                this.getDataByWorker(args, (result: any[]) => {
                    this.setLTableData(result)
                    this.frameChart!.data = this.dataSource;
                    if (this.isChartShow) this.frameChart?.calculateChartData();
                })

            }
        })
        this.filter!.getCallTreeConstraintsData((data: any) => {
            let args: any[] = [{
                funcName: "resotreAllNode",
                funcArgs: [[this.numRuleName]]
            }, {
                funcName: "clearSplitMapData",
                funcArgs: [this.numRuleName]
            }]
            if (data.checked) {
                args.push({
                    funcName: "hideNumMaxAndMin",
                    funcArgs: [parseInt(data.min), data.max]
                })
            }
            args.push({
                funcName: "resetAllNode",
                funcArgs: []
            })
            this.getDataByWorker(args, (result: any[]) => {
                this.setLTableData(result)
                this.frameChart!.data = this.dataSource;
                if (this.isChartShow) this.frameChart?.calculateChartData();
            })

        })
        this.filter!.getFilterData((data: FilterData) => {
            if (this.searchValue != this.filter!.filterValue) {
                this.searchValue = this.filter!.filterValue
                let args = [
                    {
                        funcName: "setSearchValue",
                        funcArgs: [this.searchValue]
                    },
                    {
                        funcName: "resetAllNode",
                        funcArgs: []
                    }
                ]
                this.getDataByWorker(args, (result: any[]) => {
                    this.setLTableData(result)
                    this.frameChart!.data = this.dataSource;
                    this.switchFlameChart(data)
                })
            }else {
                this.switchFlameChart(data)
            }

        })
        this.tbl!.addEventListener('column-click', (evt) => {
            // @ts-ignore
            this.sortKey = evt.detail.key
            // @ts-ignore
            this.sortType = evt.detail.sort
            // @ts-ignore
            this.setLTableData(this.dataSource)
            this.frameChart!.data = this.dataSource;
        });
    }

    connectedCallback() {
        super.connectedCallback();
        this.parentElement!.onscroll = () => {
            this.frameChart!.tabPaneScrollTop = this.parentElement!.scrollTop;
        };
        let filterHeight = 0;
        new ResizeObserver((entries) => {
            let tabPaneFilter = this.shadowRoot!.querySelector("#filter") as HTMLElement;
            if (tabPaneFilter.clientHeight > 0) filterHeight = tabPaneFilter.clientHeight;
            if (this.parentElement!.clientHeight > filterHeight) {
                tabPaneFilter.style.display = "flex";
            } else {
                tabPaneFilter.style.display = "none";
            }
            this.modal!.style.height = this.tbl!.clientHeight - 2 + 'px'; //2 is borderWidth
            if (this.tbl!.style.visibility == "hidden") {
                tabPaneFilter.style.display = "none";
            }
            if (this.parentElement?.clientHeight != 0) {
                if (this.isChartShow) {
                    this.frameChart?.updateCanvas(false, entries[0].contentRect.width);
                    this.frameChart?.calculateChartData();
                }
                // @ts-ignore
                this.tbl?.shadowRoot.querySelector(".table").style.height = (this.parentElement.clientHeight - 10 - 35) + "px"
                this.tbl?.reMeauseHeight()
                // @ts-ignore
                this.tbr?.shadowRoot.querySelector(".table").style.height = (this.parentElement.clientHeight - 45 - 21) + "px"
                this.tbr?.reMeauseHeight()
                this.loadingPage.style.height = (this.parentElement!.clientHeight - 24) + "px"
            }
        }).observe(this.parentElement!);
    }

    switchFlameChart(data:any){
        let pageTab = this.shadowRoot?.querySelector('#show_table');
        let pageChart = this.shadowRoot?.querySelector('#show_chart');
        if (data.icon == 'block') {
            pageChart?.setAttribute('class', 'show');
            pageTab?.setAttribute('class', '');
            this.isChartShow = true;
            this.filter!.disabledMining = true;
            this.showButtomMenu(this.needShowMenu);
            this.frameChart!.data = this.dataSource;
            this.frameChart?.calculateChartData();
        } else if (data.icon == 'tree') {
            pageChart?.setAttribute('class', '');
            pageTab?.setAttribute('class', 'show');
            this.showButtomMenu(true);
            this.isChartShow = false;
            this.filter!.disabledMining = false;
            this.frameChart!.clearCanvas();
            this.tbl!.reMeauseHeight()
        }
    }


    refreshAllNode(filterData: any) {
        let args:any[] = []
        let isTopDown: boolean = !filterData.callTree[0];
        this.isCurrentIsTopDown = isTopDown
        let isHideSystemLibrary = filterData.callTree[1];
        let list = filterData.dataMining.concat(filterData.dataLibrary);
        args.push({
            funcName: "getCallChainsBySampleIds",
            funcArgs: [isTopDown]
        })
        this.tbr!.recycleDataSource = []
        if (isHideSystemLibrary) {
            args.push({
                funcName: "hideSystemLibrary",
                funcArgs: []
            })
        }
        if (filterData.callTreeConstraints.checked) {
            args.push({
                funcName: "hideNumMaxAndMin",
                funcArgs: [parseInt(filterData.callTreeConstraints.inputs[0]), filterData.callTreeConstraints.inputs[1]]
            })
        }
        args.push({
            funcName: "splitAllProcess",
            funcArgs: [list]
        })
        args.push({
            funcName: "resetAllNode",
            funcArgs: []
        })
        this.getDataByWorker(args, (result: any[]) => {
            this.setLTableData(result)
            this.frameChart!.data = this.dataSource;
            if (this.isChartShow) this.frameChart?.calculateChartData();
        })
    }

    setLTableData(resultData:any[]) {
        this.dataSource = this.sortTree(resultData)
        this.tbl!.recycleDataSource = this.dataSource
    }

    sortTree(arr: Array<any>): Array<any> {
        let sortArr = arr.sort((a, b) => {
            if (this.sortKey == 'self') {
                if (this.sortType == 0) {
                    return b.dur - a.dur;
                } else if (this.sortType == 1) {
                    return a.selfDur - b.selfDur;
                } else {
                    return b.selfDur - a.selfDur;
                }
            } else {
                if (this.sortType == 0) {
                    return b.dur - a.dur;
                } else if (this.sortType == 1) {
                    return a.dur - b.dur;
                } else {
                    return b.dur - a.dur;
                }
            }
        })
        sortArr.map((call) => {
            call.children = this.sortTree(call.children);
        })
        return sortArr;
    }

    getDataByWorker(args: any[], handler: Function) {
        this.loadingList.push(1)
        this.progressEL!.loading = true
        this.loadingPage.style.visibility = "visible"
        procedurePool.submitWithName("logic0","perf-action",args,undefined,(results:any)=>{
            handler(results)
            this.loadingList.splice(0,1)
            if(this.loadingList.length == 0) {
                this.progressEL!.loading = false
                this.loadingPage.style.visibility = "hidden"
            }
        })
    }

    initHtml(): string {
        return `
        <style>
        :host{
            display: flex;
            flex-direction: column;
            padding: 10px 10px 0 10px;
        }
        tab-pane-filter {
            border: solid rgb(216,216,216) 1px;
            float: left;
            position: fixed;
            bottom: 0;
            width: 100%;
        }
        selector{
            display: none;
        }
        .show{
            display: flex;
            flex: 1;
        }
        .progress{
            bottom: 33px;
            position: absolute;
            height: 1px;
            left: 0;
            right: 0;
        }
        .loading{
            bottom: 0;
            position: absolute;
            left: 0;
            right: 0;
            width:100%;
            background:transparent;
            z-index: 999999;
        }
    </style>
    <div style="display: flex;flex-direction: row">
    
    <selector id='show_table' class="show">
        <lit-slicer style="width:100%">
        <div id="left_table" style="width: 65%">
            <tab-native-data-modal id="modal"></tab-native-data-modal>
            <lit-table id="tb-perf-profile" style="height: auto" tree>
                <lit-table-column width="70%" title="Call Stack" data-index="symbol" key="symbol"  align="flex-start" ></lit-table-column>
                <lit-table-column width="1fr" title="Local" data-index="self" key="self"  align="flex-start"  order></lit-table-column>
                <lit-table-column width="1fr" title="Weight" data-index="weight" key="weight"  align="flex-start"  order></lit-table-column>
                <lit-table-column width="1fr" title="%" data-index="weightPercent" key="weightPercent"  align="flex-start"  order></lit-table-column>
            </lit-table>
            
        </div>
        <lit-slicer-track ></lit-slicer-track>
        <lit-table id="tb-perf-list" no-head style="height: auto;border-left: 1px solid var(--dark-border1,#e2e2e2)">
            <span slot="head">Heaviest Stack Trace</span>
            <lit-table-column width="60px" title="" data-index="type" key="type"  align="flex-start" >
                <template>
                    <img src="img/library.png" size="20" v-if=" type == 1 ">
                    <img src="img/function.png" size="20" v-if=" type == 0 ">
                </template>
            </lit-table-column>
            <lit-table-column width="1fr" title="" data-index="symbolName" key="symbolName"  align="flex-start"></lit-table-column>
        </lit-table>
        </div>
        </lit-slicer>
     </selector>
     <tab-pane-filter id="filter" input inputLeftText icon tree></tab-pane-filter>
     <lit-progress-bar class="progress"></lit-progress-bar>
    <selector id='show_chart'>
        <tab-framechart id='framechart' style='width: 100%;height: auto'> </tab-framechart>
    </selector>  
    <div class="loading"></div>
    </div>`;
    }
}
