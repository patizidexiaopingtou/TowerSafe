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

import {LogicHandler,ChartStruct,convertJSON} from "./ProcedureLogicWorkerCommon.js";


export class ProcedureLogicWorkerPerf extends LogicHandler{
    systmeRuleName = "/system/"
    numRuleName = "/max/min/"
    filesData: any = {}
    samplesData: any = {}
    threadData: any = {}
    callChainData: any = {}
    splitMapData: any = {}
    currentTreeMapData: any = {}
    currentTreeList: any[] = []
    searchValue: string = ""
    dataSource:PerfCallChainMerageData[] = []
    allProcess:PerfCallChainMerageData[] = []
    callChainMap: Map<number,PerfCall> = new Map<number, PerfCall>()
    queryFunc:Function|undefined = undefined
    isActualQuery:boolean = false;
    static cmdLineResult:any = undefined
    currentEventId:string = ""

    handle(data:any): void {
        this.currentEventId = data.id
        if (data&&data.type) {
            switch(data.type){
                case "perf-init":
                    ProcedureLogicWorkerPerf.cmdLineResult = data.params;
                    this.initPerfFiles()
                    break
                case "perf-queryPerfFiles":
                    let files = convertJSON(data.params.list)||[]
                    files.forEach((file:any) => {
                        this.filesData[file.fileId] = this.filesData[file.fileId] || []
                        PerfFile.setFileName(file)
                        this.filesData[file.fileId].push(file)
                    })
                    this.initPerfThreads()
                    break;
                case "perf-queryPerfThread":
                    let threads = convertJSON(data.params.list)||[]
                    threads.forEach((thread:any) => {
                        this.threadData[thread.tid] = thread
                    })
                    this.initPerfCalls()
                    break;
                case "perf-queryPerfCalls":
                    let perfCalls = convertJSON(data.params.list)||[]
                    if (perfCalls.length != 0) {
                        perfCalls.forEach((perfCall:any)=>{
                            this.callChainMap.set(perfCall.sampleId,perfCall)
                        })
                    }
                    this.initPerfCallchains()
                    break;
                case "perf-queryPerfCallchains":
                    let arr = convertJSON(data.params.list)||[]
                    this.initCallChainTopDown(arr)
                    // @ts-ignore
                    self.postMessage({id: data.id, action: data.action, results: this.callChainMap});
                    break;
                case "perf-queryCallchainsGroupSample":
                    this.samplesData = convertJSON(data.params.list)||[]
                    self.postMessage({id: data.id, action: data.action, results: this.resolvingAction([{
                            funcName:"getCallChainsBySampleIds",
                            funcArgs:[true]
                        }])});
                    break;
                case "perf-action":
                    if(data.params){
                        let filter = data.params.filter((item:any) => item.funcName == "getCurrentDataFromDb");
                        if (filter.length == 0) {
                            // @ts-ignore
                            self.postMessage({id: data.id, action: data.action, results: this.resolvingAction(data.params)});
                        }else {
                            this.resolvingAction(data.params)
                        }
                    }
                    break;
            }
        }
    }

    queryData(queryName:string,sql:string,args:any){
        self.postMessage({
            id:this.currentEventId,
            type:queryName,
            isQuery:true,
            args:args,
            sql:sql
        })
    }

    initPerfFiles() {
        this.clearAll()
        this.queryData("perf-queryPerfFiles", `select file_id as fileId,symbol,path from perf_files`, {})
    }

    initPerfThreads(){
        this.queryData("perf-queryPerfThread", `select a.thread_id as tid,a.thread_name as threadName,a.process_id as pid,b.thread_name as processName from perf_thread a left join (select * from perf_thread where thread_id = process_id) b on a.process_id = b.thread_id`, {})
    }

    initPerfCalls(){
        this.queryData("perf-queryPerfCalls",`select count(callchain_id) as depth,callchain_id as sampleId,name from perf_callchain group by callchain_id`,{})
    }

    initPerfCallchains(){
        this.queryData("perf-queryPerfCallchains",`select c.name,c.callchain_id as sampleId,c.vaddr_in_file as vaddrInFile,c.file_id as fileId,c.symbol_id as symbolId  from perf_callchain c`,
            {})
    }

    getCurrentDataFromDb(selectionParam:any){
            let cpus = selectionParam.perfAll ? [] : selectionParam.perfCpus
            let processes =  selectionParam.perfAll ? [] : selectionParam.perfProcess
            let threads = selectionParam.perfAll ? [] : selectionParam.perfThread
            let sql = ''
            if (cpus.length != 0 || processes.length != 0 || threads.length != 0) {
                let arg1 = cpus.length > 0 ? `or s.cpu_id in (${cpus.join(",")}) ` : '';
                let arg2 = processes.length > 0 ? `or thread.process_id in (${processes.join(",")}) ` : '';
                let arg3 = threads.length > 0 ? `or s.thread_id in (${threads.join(",")})` : '';
                let arg = `${arg1}${arg2}${arg3}`.substring(3);
                sql = ` and (${arg})`
            }
            this.queryData("perf-queryCallchainsGroupSample",`
select p.callchain_id as sampleId,p.thread_state as threadState,p.thread_id as tid,p.count,p.process_id as pid from (select callchain_id,s.thread_id,thread_state,process_id,count(callchain_id) as count
from perf_sample s,trace_range t left join perf_thread thread on s.thread_id = thread.thread_id
where timestamp_trace between $startTime + t.start_ts and $endTime  + t.start_ts and callchain_id != -1 and s.thread_id != 0 ${sql}
group by callchain_id,s.thread_id,thread_state,process_id) p`
                ,{$startTime:selectionParam.leftNs,$endTime:selectionParam.rightNs,$sql:sql})
    }

    clearAll(){
        this.filesData = {}
        this.samplesData = {}
        this.threadData= {}
        this.callChainData = {}
        this.splitMapData = {}
        this.currentTreeMapData = {}
        this.currentTreeList = []
        this.searchValue = ""
        this.dataSource = []
        this.allProcess = []
        this.callChainMap = new Map<number, PerfCall>()
    }

    initCallChainBottomUp(callChains: PerfCallChain[]) {
        callChains.forEach((callChain, index) => {
            if (this.threadData[callChain.tid] == undefined) {
                return
            }
            this.setCallChainName(callChain);
            this.addGroupData(callChain)
            if (index + 1 < callChains.length && callChains[index + 1].sampleId == callChain.sampleId) {
                PerfCallChain.setPreviousNode(callChain, callChains[index + 1])
            }
            if (callChains.length == index + 1 || callChains[index + 1].sampleId != callChain.sampleId) {
                this.addProcessThreadStateData(callChain)
            }
        })
    }

    initCallChainTopDown(callChains: PerfCallChain[]) {
        this.callChainData = {}
        callChains.forEach((callChain, index) => {
            this.setCallChainName(callChain);
            this.addGroupData(callChain)
            let callChainDatum = this.callChainData[callChain.sampleId];
            if(callChainDatum.length > 1){
                PerfCallChain.setNextNode(callChainDatum[callChainDatum.length - 2], callChainDatum[callChainDatum.length - 1])
            }
        })
    }

    setCallChainName(callChain: PerfCallChain) {//设置调用栈的名称
        callChain.canCharge = true;
        if (callChain.symbolId == -1) {
            if (this.filesData[callChain.fileId] && this.filesData[callChain.fileId].length > 0) {
                callChain.fileName = this.filesData[callChain.fileId][0].fileName
                callChain.path = this.filesData[callChain.fileId][0].path
            } else {
                callChain.fileName = "unkown"
            }
        } else {
            if (this.filesData[callChain.fileId] && this.filesData[callChain.fileId].length > callChain.symbolId) {
                callChain.fileName = this.filesData[callChain.fileId][callChain.symbolId].fileName
                callChain.path = this.filesData[callChain.fileId][callChain.symbolId].path
            } else {
                callChain.fileName = "unkown"
            }
        }
    }

    addProcessThreadStateData(callChain: PerfCallChain) {//当调用栈为调用的根节点时
        this.addPerfCallData(callChain)
        let threadCallChain = new PerfCallChain()//新增的线程数据
        threadCallChain.depth = 0
        PerfCallChain.merageCallChain(threadCallChain, callChain)
        threadCallChain.canCharge = false
        threadCallChain.name = this.threadData[callChain.tid].threadName||"Thead" + "(" + callChain.tid + ")"
        let threadStateCallChain = new PerfCallChain()//新增的线程状态数据
        PerfCallChain.merageCallChain(threadStateCallChain, callChain)
        threadStateCallChain.name = callChain.threadState || "Unkown State"
        threadStateCallChain.fileName = threadStateCallChain.name == "-" ? "Unkown Thead State" : ""
        threadStateCallChain.canCharge = false
        this.addGroupData(threadCallChain)
        this.addGroupData(threadStateCallChain)
        PerfCallChain.setNextNode(threadCallChain, threadStateCallChain)
        PerfCallChain.setNextNode(threadStateCallChain, callChain)
    }

    addPerfCallData(callChain: PerfCallChain){
        let perfCall = new PerfCall()
        perfCall.depth = this.callChainData[callChain.sampleId]?.length||0
        perfCall.sampleId = callChain.sampleId
        perfCall.name = callChain.name
        this.callChainMap.set(callChain.sampleId,perfCall)
    }

    addGroupData(callChain: PerfCallChain) {
        this.callChainData[callChain.sampleId] = this.callChainData[callChain.sampleId] || []
        this.callChainData[callChain.sampleId].push(callChain)
    }

    getCallChainsBySampleIds(sampleIds: string[], isTopDown: boolean) {
        this.allProcess = this.groupNewTreeNoId(sampleIds, isTopDown)
        return this.allProcess
    }

    addOtherCallchainData(countSample: PerfCountSample,list:any[]) {
        let threadCallChain = new PerfCallChain()//新增的线程数据
        threadCallChain.tid = countSample.tid
        threadCallChain.canCharge = false
        threadCallChain.name = this.threadData[countSample.tid].threadName||"Thead" + "(" + countSample.tid + ")"
        let threadStateCallChain = new PerfCallChain()//新增的线程状态数据
        threadStateCallChain.tid = countSample.tid
        threadStateCallChain.name = countSample.threadState || "Unkown State"
        threadStateCallChain.fileName = threadStateCallChain.name == "-" ? "Unkown Thead State" : ""
        threadStateCallChain.canCharge = false
        list.unshift(threadCallChain,threadStateCallChain)

    }

    freshCurrentCallchains(samples: PerfCountSample[] , isTopDown: boolean){
        this.currentTreeMapData = {}
        this.currentTreeList = []
        let totalCount = 0
        samples.forEach((sample) => {
            totalCount+=sample.count
            let callChains = [...this.callChainData[sample.sampleId]]
            this.addOtherCallchainData(sample,callChains)
            let topIndex = isTopDown ? 0 : (callChains.length - 1);
            if (callChains.length > 0) {
                let root = this.currentTreeMapData[callChains[topIndex].name +sample.pid];
                if (root == undefined) {
                    root = new PerfCallChainMerageData();
                    this.currentTreeMapData[callChains[topIndex].name + sample.pid] = root;
                    this.currentTreeList.push(root)
                }
                PerfCallChainMerageData.merageCallChainSample(root, callChains[topIndex],sample, false);
                this.merageChildrenByIndex(root, callChains,topIndex,sample , isTopDown);
            }
        })
        let rootMerageMap: any = {}
        Object.values(this.currentTreeMapData).forEach((merageData: any) => {
            if (rootMerageMap[merageData.pid] == undefined) {
                let processMerageData = new PerfCallChainMerageData()//新增进程的节点数据
                processMerageData.canCharge = false
                processMerageData.symbolName = this.threadData[merageData.tid].processName||`Process(${merageData.pid})`
                processMerageData.symbol = processMerageData.symbolName
                processMerageData.tid = merageData.tid
                processMerageData.children.push(merageData)
                processMerageData.initChildren.push(merageData)
                processMerageData.dur = merageData.dur;
                processMerageData.count = merageData.dur;
                processMerageData.total = totalCount;
                rootMerageMap[merageData.pid] = processMerageData
            } else {
                rootMerageMap[merageData.pid].children.push(merageData)
                rootMerageMap[merageData.pid].initChildren.push(merageData)
                rootMerageMap[merageData.pid].dur += merageData.dur;
                rootMerageMap[merageData.pid].count += merageData.dur;
                rootMerageMap[merageData.pid].total = totalCount;
            }
            merageData.parentNode = rootMerageMap[merageData.pid]//子节点添加父节点的引用
        })
        let id = 0;
        this.currentTreeList.forEach((node) => {
            node.total = totalCount;
            if (node.id == "") {
                node.id = id + ""
                id++
            }
            if(node.parentNode){
                if (node.parentNode.id == "") {
                    node.parentNode.id = id + ""
                    id++
                }
                node.parentId = node.parentNode.id
            }
        })
        this.allProcess = Object.values(rootMerageMap)
    }

    merageChildrenByIndex(currentNode:PerfCallChainMerageData, callChainDataList:any[],index:number,sample: PerfCountSample , isTopDown:boolean){
        isTopDown?index++:index--;
        let isEnd = isTopDown?(callChainDataList.length == index + 1):(index == 0)
        let node;
        if (currentNode.initChildren.filter((child: PerfCallChainMerageData) => {
            if (child.symbolName == callChainDataList[index]?.name) {
                node = child;
                PerfCallChainMerageData.merageCallChainSample(child, callChainDataList[index],sample, isEnd)
                return true;
            }
            return false;
        }).length == 0) {
            node = new PerfCallChainMerageData()
            PerfCallChainMerageData.merageCallChainSample(node, callChainDataList[index],sample, isEnd)
            currentNode.children.push(node)
            currentNode.initChildren.push(node)
            this.currentTreeList.push(node)
            node.parentNode = currentNode
        }
        if (node&&!isEnd) this.merageChildrenByIndex(node, callChainDataList,index,sample, isTopDown)
    }






    groupNewTreeNoId(sampleIds: string[], isTopDown: boolean):any[] {
        this.currentTreeMapData = {}
        this.currentTreeList = []
        for (let i = 0; i < sampleIds.length; i++) {
            let callChains = this.callChainData[sampleIds[i]]
            if (callChains == undefined) continue
            let topIndex = isTopDown ? 0 : (callChains.length - 1);
            if (callChains.length > 0) {
                let root = this.currentTreeMapData[callChains[topIndex].name + callChains[topIndex].pid];
                if (root == undefined) {
                    root = new PerfCallChainMerageData();
                    this.currentTreeMapData[callChains[topIndex].name + callChains[topIndex].pid] = root;
                    this.currentTreeList.push(root)
                }
                PerfCallChainMerageData.merageCallChain(root, callChains[topIndex], isTopDown);
                this.merageChildren(root, callChains[topIndex], isTopDown);
            }
        }
        let rootMerageMap: any = {}
        Object.values(this.currentTreeMapData).forEach((merageData: any) => {
            if (rootMerageMap[merageData.pid] == undefined) {
                let processMerageData = new PerfCallChainMerageData()//新增进程的节点数据
                processMerageData.canCharge = false
                processMerageData.symbolName = this.threadData[merageData.tid].processName||`Process(${merageData.pid})`
                processMerageData.symbol = processMerageData.symbolName
                processMerageData.tid = merageData.tid
                processMerageData.children.push(merageData)
                processMerageData.initChildren.push(merageData)
                processMerageData.dur = merageData.dur;
                processMerageData.count = merageData.dur;
                processMerageData.total = sampleIds.length;
                rootMerageMap[merageData.pid] = processMerageData
            } else {
                rootMerageMap[merageData.pid].children.push(merageData)
                rootMerageMap[merageData.pid].initChildren.push(merageData)
                rootMerageMap[merageData.pid].dur += merageData.dur;
                rootMerageMap[merageData.pid].count += merageData.dur;
                rootMerageMap[merageData.pid].total = sampleIds.length;
            }
            merageData.parentNode = rootMerageMap[merageData.pid]//子节点添加父节点的引用
        })
        let id = 0;
        this.currentTreeList.forEach((node) => {
            node.total = sampleIds.length;
            if (node.id == "") {
                node.id = id + ""
                id++
            }
            if(node.parentNode){
                if (node.parentNode.id == "") {
                    node.parentNode.id = id + ""
                    id++
                }
                node.parentId = node.parentNode.id
            }
        })
        return Object.values(rootMerageMap)
    }

    merageChildren(currentNode: PerfCallChainMerageData, callChain: any, isTopDown: boolean) {
        let nextNodeKey = isTopDown ? "nextNode" : "previousNode"
        if (callChain[nextNodeKey] == undefined) return
        let node;
        if (currentNode.initChildren.filter((child: PerfCallChainMerageData) => {
            if (child.symbolName == callChain[nextNodeKey]?.name) {
                node = child;
                PerfCallChainMerageData.merageCallChain(child, callChain[nextNodeKey], isTopDown)
                return true;
            }
            return false;
        }).length == 0) {
            node = new PerfCallChainMerageData()
            PerfCallChainMerageData.merageCallChain(node, callChain[nextNodeKey], isTopDown)
            currentNode.children.push(node)
            currentNode.initChildren.push(node)
            this.currentTreeList.push(node)
            node.parentNode = currentNode
        }
        if (node) this.merageChildren(node, callChain[nextNodeKey], isTopDown)
    }

    //所有的操作都是针对整个树结构的 不区分特定的数据
    splitTree(data: PerfCallChainMerageData[], name: string, isCharge: boolean, isSymbol: boolean) {
        data.forEach((process) => {
            process.children = []
            if (isCharge) {
                this.recursionChargeInitTree(process, name, isSymbol)
            } else {
                this.recursionPruneInitTree(process, name, isSymbol)
            }
        })
        this.resetAllNode(data)
    }

    recursionChargeInitTree(node: PerfCallChainMerageData, symbolName: string, isSymbol: boolean) {
        if ((isSymbol && node.symbolName == symbolName) || (!isSymbol && node.libName == symbolName)) {
            (this.splitMapData[symbolName] = this.splitMapData[symbolName] || []).push(node)
            node.isStore++;
        }
        if (node.initChildren.length > 0) {
            node.initChildren.forEach((child) => {
                this.recursionChargeInitTree(child, symbolName, isSymbol)
            })
        }
    }

    //symbol lib charge
    recursionChargeTree(node: PerfCallChainMerageData, symbolName: string, isSymbol: boolean) {
        if ((isSymbol && node.symbolName == symbolName) || (!isSymbol && node.libName == symbolName)) {
            node.currentTreeParentNode && node.currentTreeParentNode.children.splice(node.currentTreeParentNode.children.indexOf(node), 1, ...node.children);
            node.children.forEach((child) => {
                child.currentTreeParentNode = node.currentTreeParentNode
            })
        }
        if (node.children.length > 0) {
            node.children.forEach((child) => {
                this.recursionChargeTree(child, symbolName, isSymbol)
            })
        }
    }

    recursionPruneInitTree(node: PerfCallChainMerageData, symbolName: string, isSymbol: boolean) {
        if (isSymbol && node.symbolName == symbolName || (!isSymbol && node.libName == symbolName)) {
            (this.splitMapData[symbolName] = this.splitMapData[symbolName] || []).push(node)
            node.isStore++;
            this.pruneChildren(node, symbolName)
        } else if (node.initChildren.length > 0) {
            node.initChildren.forEach((child) => {
                this.recursionPruneInitTree(child, symbolName, isSymbol)
            })
        }
    }

    //symbol lib prune
    recursionPruneTree(node: PerfCallChainMerageData, symbolName: string, isSymbol: boolean) {
        if (isSymbol && node.symbolName == symbolName || (!isSymbol && node.libName == symbolName)) {
            node.currentTreeParentNode && node.currentTreeParentNode.children.splice(node.currentTreeParentNode.children.indexOf(node), 1);
        } else {
            node.children.forEach((child) => {
                this.recursionPruneTree(child, symbolName, isSymbol)
            })
        }
    }

    recursionChargeByRule(node: PerfCallChainMerageData, ruleName: string, rule: (node: PerfCallChainMerageData) => boolean) {
        if (node.initChildren.length > 0) {
            node.initChildren.forEach((child) => {
                if (rule(child)) {
                    (this.splitMapData[ruleName] = this.splitMapData[ruleName] || []).push(child)
                    child.isStore++;
                }
                this.recursionChargeByRule(child, ruleName, rule)
            })
        }
    }

    pruneChildren(node: PerfCallChainMerageData, symbolName: string) {
        if (node.initChildren.length > 0) {
            node.initChildren.forEach((child) => {
                child.isStore++;
                (this.splitMapData[symbolName] = this.splitMapData[symbolName] || []).push(child);
                this.pruneChildren(child, symbolName)
            })
        }
    }

    hideSystemLibrary(){
        this.allProcess.forEach((item)=>{
            item.children = []
            this.recursionChargeByRule(item,this.systmeRuleName,(node)=>{
                return node.path.startsWith(this.systmeRuleName)
            })
        })
    }

    hideNumMaxAndMin(startNum:number,endNum:string){
        let max = endNum == "∞"?Number.POSITIVE_INFINITY :parseInt(endNum)
        this.allProcess.forEach((item)=>{
            item.children = []
            this.recursionChargeByRule(item,this.numRuleName,(node)=>{
                return node.dur < startNum || node.dur > max
            })
        })
    }

    clearSplitMapData(symbolName: string) {
        delete this.splitMapData[symbolName]
    }

    resotreAllNode(symbols: string[]) {
        symbols.forEach((symbol) => {
            let list = this.splitMapData[symbol];
            if (list != undefined) {
                list.forEach((item: any) => {
                    item.isStore--
                })
            }
        })
    }

    resetAllNode(data: PerfCallChainMerageData[]) {
        this.clearSearchNode()
        data.forEach((process) => {
            process.searchShow = true
        })
        this.resetNewAllNode(data)
        if (this.searchValue != "") {
            this.findSearchNode(data, this.searchValue, false)
            this.resetNewAllNode(data)
        }
    }

    resetNewAllNode(data: PerfCallChainMerageData[]) {
        data.forEach((process) => {
            process.children = []
        })
        let values = this.currentTreeList.map((item: any) => {
            item.children = []
            return item
        })
        values.forEach((item: any) => {
            if (item.parentNode != undefined) {
                if (item.isStore == 0 && item.searchShow) {
                    let parentNode = item.parentNode
                    while (parentNode != undefined && !(parentNode.isStore == 0 && parentNode.searchShow)) {
                        parentNode = parentNode.parentNode
                    }
                    if (parentNode) {
                        item.currentTreeParentNode = parentNode
                        parentNode.children.push(item)
                    }
                }
            }
        })
    }

    findSearchNode(data: PerfCallChainMerageData[], search: string, parentSearch: boolean) {
        data.forEach((node) => {
            if ((node.symbol&&node.symbol.includes(search)) || parentSearch) {
                node.searchShow = true
                let parentNode = node.currentTreeParentNode
                while (parentNode != undefined && !parentNode.searchShow) {
                    parentNode.searchShow = true
                    parentNode = parentNode.currentTreeParentNode
                }
            } else {
                node.searchShow = false
            }
            if (node.children.length > 0) {
                this.findSearchNode(node.children, search, node.searchShow)
            }
        })
    }

    clearSearchNode() {
        this.currentTreeList.forEach((node) => {
            node.searchShow = true
        })
    }

    splitAllProcess(list:any[]){
        list.forEach((item:any)=>{
            this.allProcess.forEach((process)=>{
                if(item.select == "0"){
                    this.recursionChargeInitTree(process, item.name, item.type == "symbol")
                }else {
                    this.recursionPruneInitTree(process, item.name, item.type == "symbol")
                }
            })
            if(!item.checked){
                this.resotreAllNode([item.name])
            }
        })
    }

    resolvingAction(params:any[]) {
        if (params.length > 0) {
            params.forEach((item) => {
                if (item.funcName && item.funcArgs) {
                    switch (item.funcName) {
                        case "getCallChainsBySampleIds":
                            this.freshCurrentCallchains(this.samplesData,item.funcArgs[0])
                            break
                        case "getCurrentDataFromDb":
                            this.getCurrentDataFromDb(item.funcArgs[0]);
                            break
                        case "hideSystemLibrary":
                            this.hideSystemLibrary();
                            break
                        case "hideNumMaxAndMin":
                            this.hideNumMaxAndMin(item.funcArgs[0], item.funcArgs[1])
                            break
                        case "splitAllProcess":
                            this.splitAllProcess(item.funcArgs[0])
                            break
                        case "resetAllNode":
                            this.resetAllNode(this.allProcess)
                            break
                        case "resotreAllNode":
                            this.resotreAllNode(item.funcArgs[0])
                            break
                        case "clearSplitMapData":
                            this.clearSplitMapData(item.funcArgs[0])
                            break
                        case "splitTree":
                            this.splitTree(this.allProcess, item.funcArgs[0], item.funcArgs[1], item.funcArgs[2]);
                            break
                        case "setSearchValue":
                            this.searchValue = item.funcArgs[0]
                            break
                    }
                }
            })
            this.dataSource = this.allProcess.filter((process) => {
                return process.children && process.children.length > 0
            })
        }
        return this.dataSource
    }
}


export class PerfFile {
    fileId: number = 0;
    symbol: string = ""
    path: string = ""
    fileName: string = ""

    static setFileName(data: PerfFile) {
        if (data.path) {
            let number = data.path.lastIndexOf("/");
            if (number > 0) {
                data.fileName = data.path.substring(number + 1)
                return
            }
        }
        data.fileName = data.path
    }

    setFileName() {
        if (this.path) {
            let number = this.path.lastIndexOf("/");
            if (number > 0) {
                this.fileName = this.path.substring(number + 1)
                return
            }
        }
        this.fileName = this.path
    }
}

export class PerfThread {
    tid: number = 0;
    pid: number = 0;
    threadName: string = "";
    processName: string = "";
}

export class PerfCallChain {
    tid: number = 0;
    pid: number = 0;
    name: string = ""
    fileName: string = "";
    threadState: string = "";
    startNS: number = 0;
    dur: number = 0;
    sampleId: number = 0;
    callChainId: number = 0;
    vaddrInFile: number = 0;
    fileId: number = 0;
    symbolId: number = 0;
    path: string = "";
    count:number = 0;
    parentId: string = ""//合并之后区分的id
    id: string = ""
    topDownMerageId: string = ""//top down合并使用的id
    topDownMerageParentId: string = ""//top down合并使用的id
    bottomUpMerageId: string = ""//bottom up合并使用的id
    bottomUpMerageParentId: string = ""//bottom up合并使用的id
    depth: number = 0;
    canCharge:boolean = true
    previousNode: PerfCallChain | undefined = undefined;//将list转换为一个链表结构
    nextNode: PerfCallChain | undefined = undefined;

    static setNextNode(currentNode: PerfCallChain, nextNode: PerfCallChain) {
        currentNode.nextNode = nextNode
        nextNode.previousNode = currentNode
    }

    static setPreviousNode(currentNode: PerfCallChain, prevNode: PerfCallChain) {
        currentNode.previousNode = prevNode
        prevNode.nextNode = currentNode
    }

    static merageCallChain(currentNode: PerfCallChain, callChain: PerfCallChain) {
        currentNode.startNS = callChain.startNS
        currentNode.tid = callChain.tid
        currentNode.pid = callChain.pid
        currentNode.sampleId = callChain.sampleId
        currentNode.dur = callChain.dur
        currentNode.count = callChain.count
    }

}



export class PerfCallChainMerageData extends ChartStruct {
    #parentNode: PerfCallChainMerageData | undefined = undefined
    #total = 0
    id: string = "";
    parentId: string = "";
    currentTreeParentNode: PerfCallChainMerageData | undefined = undefined;
    symbolName: string = "";
    symbol: string = ""
    libName: string = ""
    path: string = ""
    self: string = "0s"
    weight: string = ""
    weightPercent: string = ""
    selfDur: number = 0;
    dur: number = 0;
    tid: number = 0;
    pid: number = 0;
    isStore = 0;
    canCharge:boolean = true
    children: PerfCallChainMerageData[] = []
    initChildren: PerfCallChainMerageData[] = []
    type: number = 0;
    vaddrInFile: number = 0;
    isSelected: boolean = false;
    searchShow: boolean = true;

    set parentNode(data: PerfCallChainMerageData | undefined) {
        this.currentTreeParentNode = data;
        this.#parentNode = data;
    }

    get parentNode() {
        return this.#parentNode
    }

    set total(data: number) {
        this.#total = data;
        this.weight = `${timeMsFormat2p(this.dur * (ProcedureLogicWorkerPerf.cmdLineResult?.fValue || 1))}`
        this.weightPercent = `${(this.dur / data * 100).toFixed(1)}%`
    }

    get total() {
        return this.#total;
    }

    static merageCallChain(currentNode: PerfCallChainMerageData, callChain: PerfCallChain, isTopDown: boolean) {
        if (currentNode.symbolName == "") {
            currentNode.symbol = `${callChain.name}  ${callChain.fileName ? `(${callChain.fileName})` : ""}`
            currentNode.symbolName = callChain.name
            currentNode.pid = callChain.pid
            currentNode.tid = callChain.tid
            currentNode.libName = callChain.fileName
            currentNode.vaddrInFile = callChain.vaddrInFile;
            currentNode.canCharge = callChain.canCharge
            if (callChain.path) {
                currentNode.path = callChain.path
            }
        }
        if (callChain[isTopDown ? "nextNode" : "previousNode"] == undefined) {
            currentNode.selfDur+=callChain.count;
            currentNode.self = timeMsFormat2p(currentNode.selfDur * (ProcedureLogicWorkerPerf.cmdLineResult?.fValue || 1))
        }
        currentNode.dur+=callChain.count;
        currentNode.count+=callChain.count;
    }

    static merageCallChainSample(currentNode: PerfCallChainMerageData, callChain: PerfCallChain,sample: PerfCountSample, isEnd: boolean) {
        if (currentNode.symbolName == "") {
            currentNode.symbol = `${callChain.name}  ${callChain.fileName ? `(${callChain.fileName})` : ""}`
            currentNode.symbolName = callChain.name
            currentNode.pid = sample.pid
            currentNode.tid = sample.tid
            currentNode.libName = callChain.fileName
            currentNode.vaddrInFile = callChain.vaddrInFile;
            currentNode.canCharge = callChain.canCharge
            if (callChain.path) {
                currentNode.path = callChain.path
            }
        }
        if (isEnd) {
            currentNode.selfDur+=sample.count;
            currentNode.self = timeMsFormat2p(currentNode.selfDur * (ProcedureLogicWorkerPerf.cmdLineResult?.fValue || 1))
        }
        currentNode.dur+=sample.count;
        currentNode.count+=sample.count;
    }
}

export class PerfCountSample {
    sampleId: number = 0;
    tid: number = 0;
    count:number = 0;
    threadState:string = '';
    pid: number = 0
}

export class PerfStack {
    symbol: string = "";
    path: string = "";
    fileId: number = 0;
    type: number = 0;
    vaddrInFile: number = 0;
}

export class PerfCmdLine {
    report_value: string = "";
}

export class PerfCall{
    sampleId: number = 0;
    depth: number = 0;
    name: string = "";
}

export function timeMsFormat2p(ns: number) {
    let currentNs = ns
    let hour1 = 3600_000
    let minute1 = 60_000
    let second1 = 1_000; // 1 second
    let res = ""
    if (currentNs >= hour1) {
        res += Math.floor(currentNs / hour1).toFixed(2) + "h"
        return res
    }
    if (currentNs >= minute1) {
        res += Math.floor(currentNs / minute1).toFixed(2) + "min"
        return res
    }
    if (currentNs >= second1) {
        res += Math.floor(currentNs / second1).toFixed(2) + "s"
        return res
    }
    if (currentNs > 0) {
        res += currentNs.toFixed(2) + "ms";
        return res
    }
    if (res == "") {
        res = "0s";
    }
    return res
}