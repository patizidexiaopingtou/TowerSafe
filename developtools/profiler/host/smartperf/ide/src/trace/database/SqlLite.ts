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

import './sql-wasm.js'
import {CpuStruct} from "../bean/CpuStruct.js";
import {CpuFreqStruct} from "../bean/CpuFreqStruct.js";
import {ThreadStruct} from "../bean/ThreadStruct.js";
import {ProcessMemStruct} from "../bean/ProcessMemStruct.js";
import {Counter, Fps, SelectionData} from "../bean/BoxSelection.js";
import {FuncStruct} from "../bean/FuncStruct.js";
import {WakeUpTimeBean} from "../bean/WakeUpTimeBean.js";
import {WakeupBean} from "../bean/WakeupBean.js";
import {BinderArgBean} from "../bean/BinderArgBean.js";
import {FpsStruct} from "../bean/FpsStruct.js";
import {SPT, SPTChild} from "../bean/StateProcessThread.js";
import {CpuUsage, Freq} from "../bean/CpuUsage.js";
import {HeapTreeDataBean} from "../bean/HeapTreeDataBean.js";
import {
    NativeEvent,
    NativeEventHeap,
    NativeHookMalloc,
    NativeHookProcess,
    NativeHookSampleQueryInfo,
    NativeHookStatistics
} from "../bean/NativeHook.js";
import {
    LiveProcess,
    ProcessHistory,
    SystemCpuSummary,
    SystemDiskIOSummary,
    SystemNetworkSummary
} from "../bean/AbilityMonitor.js";
import {NetworkAbilityMonitorStruct} from "../bean/NetworkAbilityMonitorStruct.js";
import {DiskAbilityMonitorStruct} from "../bean/DiskAbilityMonitorStruct.js";
import {MemoryAbilityMonitorStruct} from "../bean/MemoryAbilityMonitorStruct.js";
import {CpuAbilityMonitorStruct} from "../bean/CpuAbilityMonitorStruct.js";
import {
    PerfCall,
    PerfCallChain,
    PerfCmdLine,
    PerfFile,
    PerfSample,
    PerfStack,
    PerfThread
} from "../bean/PerfProfile.js";
import {SearchFuncBean} from "../bean/SearchFuncBean.js";
import {info} from "../../log/Log.js";
import {CounterStruct, SdkSliceStruct} from "../bean/SdkStruct.js";
import {CounterSummary, SdkSliceSummary} from "../bean/SdkSummary.js";
import {
    EnergyAnomalyStruct,
    EnergyPowerStruct,
    EnergyStateStruct,
    EnergySystemStruct,
    PowerBatteryEnergy,
    PowerDetailsEnergy, SystemDetailsEnergy
} from "../bean/EnergyStruct.js";
import {Smaps} from "../bean/SmapsStruct.js";
import {CpuFreqRowLimit} from "../component/chart/SpFreqChart.js";
import {CpuFreqLimitsStruct} from "./ui-worker/ProcedureWorkerCpuFreqLimits.js";

class DbThread extends Worker {
    busy: boolean = false;
    isCancelled: boolean = false;
    id: number = -1;
    taskMap: any = {};
    cacheArray: Array<any> = [];

    uuid(): string {
        // @ts-ignore
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11)
            .replace(/[018]/g, (c: any) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
    }

    queryFunc(name: string, sql: string, args: any, handler: Function, action: string | null) {
        this.busy = true;
        let id = this.uuid();
        this.taskMap[id] = handler
        let msg = {
            id: id,
            name: name,
            action: action || "exec",
            sql: sql,
            params: args,
        }
        this.postMessage(msg);
    }

    dbOpen = async (sdkWasmConfig?:string): Promise<{ status: boolean, msg: string, buffer: ArrayBuffer, sdkConfigMap: any}> => {
        return new Promise<any>((resolve, reject) => {
            let id = this.uuid();
            this.taskMap[id] = (res: any) => {
                if (res.init) {
                    resolve({status: res.init, msg: res.msg, sdkConfigMap:res.configSqlMap, buffer: res.buffer});
                } else {
                    resolve({status: res.init, msg: res.msg});
                }
            }
            this.postMessage({
                id: id,
                action: "open",
                wasmConfig: sdkWasmConfig,
                buffer: DbPool.sharedBuffer!, /*Optional. An ArrayBuffer representing an SQLite Database file*/
            }, [DbPool.sharedBuffer!]);
        })
    }
}

export class DbPool {
    static sharedBuffer: ArrayBuffer | null = null;
    maxThreadNumber: number = 0;
    works: Array<DbThread> = [];
    progress: Function | undefined | null;
    num = Math.floor(Math.random() * 10 + 1) + 20;
    init = async (type: string, threadBuild: (() => DbThread) | undefined = undefined) => { // wasm | server | sqlite
        await this.close();
        if (type === "wasm") {
            this.maxThreadNumber = 1;
        } else if (type === "server") {
            this.maxThreadNumber = 1;
        } else if (type === "sqlite") {
            this.maxThreadNumber = 1;
        } else if (type === "duck") {
            this.maxThreadNumber = 1;
        }
        for (let i = 0; i < this.maxThreadNumber; i++) {
            let thread: DbThread
            if (threadBuild) {
                thread = threadBuild()
            } else {
                if (type === "wasm") {
                    thread = new DbThread("trace/database/TraceWorker.js")
                } else if (type === "server") {
                    thread = new DbThread("trace/database/SqlLiteWorker.js")
                } else if (type === "sqlite") {
                    thread = new DbThread("trace/database/SqlLiteWorker.js")
                }
            }
            thread!.onmessage = (event: MessageEvent) => {
                thread.busy = false;
                if (Reflect.has(thread.taskMap, event.data.id)) {
                    if (event.data.results) {
                        let fun = thread.taskMap[event.data.id];
                        if (fun) {
                            fun(event.data.results);
                        }
                        Reflect.deleteProperty(thread.taskMap, event.data.id);
                    } else if (Reflect.has(event.data, 'ready')) {
                        this.progress!("database opened", this.num + event.data.index)
                    } else if (Reflect.has(event.data, 'init')) {
                        this.progress!("database ready", 40)
                        let fun = thread.taskMap[event.data.id];
                        if (fun) {
                            fun(event.data)
                        }
                        Reflect.deleteProperty(thread.taskMap, event.data.id)
                    } else {
                        let fun = thread.taskMap[event.data.id];
                        if (fun) {
                            fun([])
                        }
                        Reflect.deleteProperty(thread.taskMap, event.data.id)
                    }

                }
            }
            thread!.onmessageerror = e => {
            }
            thread!.onerror = e => {
            }
            thread!.id = i;
            thread!.busy = false;
            this.works?.push(thread!);
        }
    }

    initServer = async (url: string, progress: Function) => {
        this.progress = progress;
        progress("database loaded", 15)
        let buf = await fetch(url).then(res => res.arrayBuffer());
        DbPool.sharedBuffer = buf;
        progress("open database", 20)
        for (let i = 0; i < this.works.length; i++) {
            let thread = this.works[i];
            let {status, msg} = await thread.dbOpen()
            if (!status) {
                return {status, msg}
            }
        }
        return {status: true, msg: "ok"};
    }
    initSqlite = async (buf: ArrayBuffer, sdkWasmConfig: string, progress: Function) => {
        this.progress = progress;
        progress("database loaded", 15)
        DbPool.sharedBuffer = buf;
        progress("parse database", 20)
        let configMap;
        for (let i = 0; i < this.works.length; i++) {
            let thread = this.works[i];
            let {status, msg, buffer, sdkConfigMap} = await thread.dbOpen(sdkWasmConfig)
            if (!status) {
                return {status, msg}
            } else {
                configMap = sdkConfigMap;
                DbPool.sharedBuffer = buffer;
            }
        }
        return {status: true, msg: "ok", sdkConfigMap: configMap};
    }

    close = async () => {
        for (let i = 0; i < this.works.length; i++) {
            let thread = this.works[i];
            thread.terminate();
        }
        this.works.length = 0;
    }

    submit(name: string, sql: string, args: any, handler: Function, action: string | null) {
        let noBusyThreads = this.works.filter(it => !it.busy);
        let thread: DbThread
        if (noBusyThreads.length > 0) { //取第一个空闲的线程进行任务
            thread = noBusyThreads[0];
            thread.queryFunc(name, sql, args, handler, action)
        } else { // 随机插入一个线程中
            thread = this.works[Math.floor(Math.random() * this.works.length)]
            thread.queryFunc(name, sql, args, handler, action)
        }
    }
}

export const threadPool = new DbPool()

export function query<T extends any>(name: string, sql: string, args: any = null, action: string | null = null): Promise<Array<T>> {
    return new Promise<Array<T>>((resolve, reject) => {
        threadPool.submit(name, sql, args, (res: any) => {
            resolve(res)
        }, action);
    })
}

export const queryEventCountMap = ():Promise<Array<{
    eventName:string,
    count:number
}>> => query("queryEventCountMap",`select event_name as eventName,count from stat where stat_type = 'received';`);

export const queryProcess = (): Promise<Array<{
    pid: number | null
    processName: string | null
}>> =>
    query("queryProcess", `
    SELECT
      pid, processName
    FROM
      temp_query_process where pid != 0`)

export const queryProcessByTable = (): Promise<Array<{
    pid: number | null
    processName: string | null
}>> =>
    query("queryProcessByTable", `
    SELECT
      pid, name as processName
    FROM
      process where pid != 0`)

export const queryProcessAsyncFunc = ():Promise<Array<any>> => query("queryProcessAsyncFunc",`
select tid,
    P.pid,
    A.name as threadName,
    is_main_thread,
    c.callid as track_id,
    c.ts-D.start_ts as startTs,
    c.dur,
    c.name as funName,
    c.parent_id,
    c.id,
    c.cookie,
    c.depth,
    c.argsetid
from thread A,trace_range D
left join callstack C on A.id = C.callid
left join process P on P.id = A.ipid
where startTs not null and cookie not null ;`, {})

export const queryTotalTime = (): Promise<Array<{ total: number ,recordStartNS:number,recordEndNS:number}>> =>
    query("queryTotalTime", `
    select
      start_ts as recordStartNS,end_ts as recordEndNS,end_ts-start_ts as total
    from
      trace_range;`)

export const getAsyncEvents = (): Promise<Array<any>> =>
    query("getAsyncEvents", `
    select
      *,
      p.pid as pid,
      c.ts - t.start_ts as "startTime"
    from
      callstack c,trace_range t
    left join
      process p
    on
      c.callid = p.id
    where
      cookie is not null;`)

export const getCpuUtilizationRate = (startNS: number, endNS: number): Promise<Array<{
    cpu: number
    ro: number
    rate: number
}>> =>
    query("getCpuUtilizationRate", `
    with cpu as (
    select
      cpu,
      ts,
      dur,
      (case when ro < 99 then ro else 99 end) as ro ,
      (case when ro < 99 then stime+ro*cell else stime + 99 * cell end) as st,
      (case when ro < 99 then stime + (ro+1)*cell else etime end) as et
    from (
        select
          cpu,
          ts,
          A.dur,
          ((ts+A.dur)-D.start_ts)/((D.end_ts-D.start_ts)/100) as ro,
          D.start_ts as stime,
          D.end_ts etime,
          (D.end_ts-D.start_ts)/100 as cell
        from
          sched_slice A
        left join
          trace_range D
        left join
          thread B on A.itid = B.id
        left join
          process C on B.ipid = C.id
        where
          tid != 0
        and (A.ts)
          between D.start_ts and D.end_ts))
    select cpu,ro,
       sum(case
               when ts <= st and ts + dur <= et then (ts + dur - st)
               when ts <= st and ts + dur > et then et-st
               when ts > st and ts + dur <= et then dur
               when ts > st and ts + dur > et then et - ts end)/cast(et-st as float) as rate
    from cpu
    group by cpu,ro;`, {})

export const getFps = () =>
    query<FpsStruct>("getFps", `
    select
      distinct(ts-tb.start_ts) as startNS, fps
    from
      hidump c ,trace_range tb
    where
      startNS >= 0
    --order by startNS;
    `, {})

export const getFunDataByTid = (tid: number): Promise<Array<FuncStruct>> =>
    query("getFunDataByTid", `
    select 
    --tid,
    --A.name as threadName,
    c.ts-D.start_ts as startTs,
    c.dur,
    c.name as funName,
    c.argsetid,
    c.depth
from thread A,trace_range D
left join callstack C on A.id = C.callid
where startTs not null and c.cookie is null and tid = $tid`, {$tid: tid})

export const getStatesProcessThreadDataByRange = (leftNs: number, rightNs: number): Promise<Array<SPT>> =>
    query<SPT>("getStatesProcessThreadDataByRange", `
    select
      IP.name as process,
      IP.pid as processId,
      A.name as thread,
      B.state as state,
      A.tid as threadId,
      B.dur,
      (B.ts - TR.start_ts + B.dur) as end_ts,
      (B.ts - TR.start_ts) as start_ts,
      B.cpu
    from
      thread_state as B 
    left join thread as A on B.itid = A.id
    left join process as IP on A.ipid = IP.id
    left join trace_range as TR
    where B.dur > 0
    and IP.pid not null
    and (B.ts - TR.start_ts) >= $leftNs 
    and (B.ts - TR.start_ts + B.dur) <= $rightNs
`, {$leftNs:leftNs,$rightNs:rightNs});

export const getTabBoxChildData = (leftNs: number, rightNs: number, state: string | undefined,
                                   processId: number | undefined, threadId: number | undefined): Promise<Array<SPTChild>> =>
    query<SPTChild>("getTabBoxChildData", `
    select
      IP.name as process,
      IP.pid as processId,
      A.name as thread,
      B.state as state,
      A.tid as threadId,
      B.dur as duration,
      B.ts - TR.start_ts as startNs,
      B.cpu,
      C.priority
    from
      thread_state AS B
    left join
      thread as A
    on
      B.itid = A.id
    left join
      process AS IP
    on
      A.ipid = IP.id
    left join
      trace_range AS TR
    left join
      sched_slice as C
    on
      B.itid = C.itid
    and
      C.ts = B.ts
    where
      B.dur > 0
    and
      IP.pid not null
    and
      not ((B.ts - TR.start_ts + B.dur < $leftNS) or (B.ts - TR.start_ts > $rightNS))
      ${state != undefined && state != '' ? 'and B.state = $state' : ''}
      ${processId != undefined && processId != -1 ? 'and IP.pid = $processID' : ''}
      ${threadId != undefined && threadId != -1 ? 'and A.tid = $threadID' : ''}
    `, {$leftNS: leftNs, $rightNS: rightNs, $state: state, $processID: processId, $threadID: threadId})

export const getTabCpuUsage = (cpus: Array<number>, leftNs: number, rightNs: number): Promise<Array<CpuUsage>> =>
    query<CpuUsage>("getTabCpuUsage", `
    select
      cpu,
      sum(case
        when (A.ts - B.start_ts) < $leftNS
          then (A.ts - B.start_ts + A.dur - $leftNS)
        when (A.ts - B.start_ts) >= $leftNS
          and (A.ts - B.start_ts + A.dur) <= $rightNS
          then A.dur
        when (A.ts - B.start_ts + A.dur) > $rightNS
          then ($rightNS - (A.ts - B.start_ts)) end) / cast($rightNS - $leftNS as float) as usage
    from
      thread_state A,
      trace_range B
    where
      (A.ts - B.start_ts) > 0 and A.dur > 0
    and
      cpu in (${cpus.join(",")})
    and
      (A.ts - B.start_ts + A.dur) > $leftNS
    and
      (A.ts - B.start_ts) < $rightNS
    group by
      cpu`, {$leftNS: leftNs, $rightNS: rightNs})

export const getTabCpuFreq = (cpus: Array<number>, leftNs: number, rightNs: number): Promise<Array<Freq>> =>
    query<Freq>("getTabCpuFreq", `
    select
      cpu,
      value,
      (ts - tb.start_ts) as startNs
    from
      measure c,
      trace_range tb
    inner join
      cpu_measure_filter t
    on
      c.filter_id = t.id
    where
      (name = 'cpufreq' or name='cpu_frequency')
    and
      cpu in (${cpus.join(",")})
    and
      startNs > 0
    and
      startNs < $rightNS
    --order by startNs
    `, {$leftNS: leftNs, $rightNS: rightNs})

export const getTabFps = (leftNs: number, rightNs: number): Promise<Array<Fps>> =>
    query<Fps>("getTabFps", `
    select
      distinct(ts-tb.start_ts) as startNS,
      fps
    from
      hidump c,
      trace_range tb
    where
      startNS <= $rightNS
    and
      startNS >= 0
    --order by startNS;
    `, {$leftNS: leftNs, $rightNS: rightNs})

export const getTabCounters = (processFilterIds: Array<number>,virtualFilterIds:Array<number>, startTime: number) =>
    query<Counter>("getTabCounters", `
    select
      t1.filter_id as trackId,
      t2.name,
      value,
      t1.ts - t3.start_ts as startTime
    from
      process_measure t1
    left join
      process_measure_filter t2
    on
      t1.filter_id = t2.id
    left join
      trace_range t3
    where
      filter_id in (${processFilterIds.join(",")})
    and
      startTime <= $startTime
union
 select
      t1.filter_id as trackId,
      t2.name,
      value,
      t1.ts - t3.start_ts as startTime
    from
      sys_mem_measure t1
    left join
      sys_event_filter t2
    on
      t1.filter_id = t2.id
    left join
      trace_range t3
    where
      filter_id in (${virtualFilterIds.join(",")})
    and
      startTime <= $startTime
    `, {$startTime: startTime})

export const getTabVirtualCounters = (virtualFilterIds:Array<number>, startTime: number) =>
    query<Counter>("getTabVirtualCounters", `
    select
      t1.filter_id as trackId,
      t2.name,
      value,
      t1.ts - t3.start_ts as startTime
    from
      sys_mem_measure t1
    left join
      sys_event_filter t2
    on
      t1.filter_id = t2.id
    left join
      trace_range t3
    where
      filter_id in (${virtualFilterIds.join(",")})
    and
      startTime <= $startTime
    `, {$startTime: startTime})

export const getTabCpuByProcess = (cpus: Array<number>, leftNS: number, rightNS: number) =>
    query<SelectionData>("getTabCpuByProcess", `
    select
      IP.name as process,
      IP.pid as pid,
      sum(B.dur) as wallDuration,
      avg(B.dur) as avgDuration,
      count(A.tid) as occurrences
    from
      thread_state AS B
    left join
      thread as A
    on
      B.itid = A.id
    left join
      trace_range AS TR
    left join
      process AS IP
    on
      A.ipid = IP.id
    where
      B.cpu in (${cpus.join(",")})
    and
      not ((B.ts - TR.start_ts + B.dur < $leftNS) or (B.ts - TR.start_ts > $rightNS ))
    group by
      IP.name,
      IP.pid
    order by
      wallDuration desc;`, {$rightNS: rightNS, $leftNS: leftNS})

export const getTabCpuByThread = (cpus: Array<number>, leftNS: number, rightNS: number) =>
    query<SelectionData>("getTabCpuByThread", `
    select
      IP.name as process,
      IP.pid as pid,
      A.name as thread,
      A.tid as tid,
      sum(B.dur) as wallDuration,
      avg(B.dur) as avgDuration,
      count(A.tid) as occurrences
    from
      thread_state AS B
    left join
      thread as A
    on
      B.itid = A.id
    left join
      trace_range AS TR
    left join
      process AS IP
    on
      A.ipid = IP.id
    where
      B.cpu in (${cpus.join(",")})
    and
      not ((B.ts - TR.start_ts + B.dur < $leftNS) or (B.ts - TR.start_ts > $rightNS))
    group by
      IP.name,
      IP.pid,
      A.name,
      A.tid
    order by
      wallDuration desc;`, {$rightNS: rightNS, $leftNS: leftNS})

export const getTabSlices = (funTids: Array<number>, leftNS: number, rightNS: number): Promise<Array<any>> =>
    query<SelectionData>("getTabSlices", `
    select
      c.name as name,
      sum(c.dur) as wallDuration,
      avg(c.dur) as avgDuration,
      count(c.name) as occurrences
    from
      thread A, trace_range D
    left join
      callstack C
    on
      A.id = C.callid
    where
      C.ts not null
    and
      c.dur >= 0
    and
      A.tid in (${funTids.join(",")})
    and
      c.name != 'binder transaction async'
    and
      c.name != 'binder async rcv'
    and
      c.cookie is null
    and
      not ((C.ts - D.start_ts + C.dur < $leftNS) or (C.ts - D.start_ts > $rightNS))
    group by
      c.name
    order by
      wallDuration desc;`, {$leftNS: leftNS, $rightNS: rightNS})

export const getTabSlicesAsyncFunc = (asyncNames:Array<string>,asyncPid: Array<number>, leftNS: number, rightNS: number): Promise<Array<any>> =>
    query<SelectionData>("getTabSlicesAsyncFunc", `
    select
      c.name as name,
      sum(c.dur) as wallDuration,
      avg(c.dur) as avgDuration,
      count(c.name) as occurrences
    from
      thread A, trace_range D
    left join
      callstack C
    on
      A.id = C.callid
    left join process P on P.id = A.ipid
    where
      C.ts not null
    and
      c.dur >= -1
    and 
      c.cookie not null
    and
      P.pid in (${asyncPid.join(",")})
    and
      c.name in (${asyncNames.map(it=>"'"+it+"'").join(",")})
    and
      not ((C.ts - D.start_ts + C.dur < $leftNS) or (C.ts - D.start_ts > $rightNS))
    group by
      c.name
    order by
      wallDuration desc;`, {$leftNS: leftNS, $rightNS: rightNS})

export const getTabThreadStates = (tIds: Array<number>, leftNS: number, rightNS: number): Promise<Array<any>> =>
    query<SelectionData>("getTabThreadStates", `
    select
      IP.name as process,
      IP.pid,
      A.name as thread,
      A.tid,
      B.state,
      sum(B.dur) as wallDuration,
      avg(ifnull(B.dur,0)) as avgDuration,
      count(A.tid) as occurrences
    from
      thread_state AS B
    left join
      thread as A
    on
      A.id = B.itid
    left join
      trace_range AS TR
    left join
      process AS IP
    on
      IP.id=A.ipid
    where
      A.tid in (${tIds.join(",")})
    and
      not ((B.ts - TR.start_ts + ifnull(B.dur,0) < $leftNS) or (B.ts - TR.start_ts > $rightNS))
    group by
      IP.name, IP.pid, A.name, A.tid, B.state
    order by
      wallDuration desc;`, {$leftNS: leftNS, $rightNS: rightNS})

export const queryBinderArgsByArgset = (argset: number): Promise<Array<BinderArgBean>> =>
    query("queryBinderArgsByArgset", `
    select
      *
    from
      args_view
    where
      argset = $argset;`, {$argset: argset})

export const queryCpuData = (cpu: number, startNS: number, endNS: number): Promise<Array<CpuStruct>> =>
    query("queryCpuData", `
    SELECT
    IP.name as processName,
    IP.name processCmdLine,
    IP.pid as processId,
    B.cpu,
    A.name,
    C.id as schedId,
    A.tid,
    A.id,
    A.type,
    B.dur,
    B.ts - TR.start_ts AS startTime,
    C.priority,
    C.end_state
from thread_state AS B
    left join  thread as A on B.itid = A.id
    left join sched_slice AS C on B.itid = C.itid and B.ts = C.ts
    left join trace_range AS TR
    left join process AS IP on A.ipid = IP.id
where C.itid is not null 
    and
      B.cpu = $cpu
    and
      startTime between $startNS and $endNS;`, {
        $cpu: cpu,
        $startNS: startNS,
        $endNS: endNS
    })

export const queryCpuFreq = (): Promise<Array<{ cpu: number,filterId:number }>> =>
    query("queryCpuFreq", `
    select
      cpu,id as filterId
    from
      cpu_measure_filter
    where
      (name='cpufreq' or name='cpu_frequency')
    order by cpu;
    `)

export const queryCpuFreqData = (cpu: number): Promise<Array<CpuFreqStruct>> =>
    query<CpuFreqStruct>("queryCpuFreqData", `
    select
      cpu,
      value,
      ts-tb.start_ts as startNS
    from
      measure c,
      trace_range tb
    inner join
      cpu_measure_filter t
    on
      c.filter_id = t.id
    where
      (name = 'cpufreq' or name='cpu_frequency')
    and
      cpu= $cpu
    --order by ts;
    `, {$cpu: cpu},);

export const queryCpuMax = (): Promise<Array<any>> =>
    query("queryCpuMax", `
    select
      cpu
    from
      sched_slice
    order by
      cpu
    desc limit 1;`)

export const queryCpuStateFilter = ():Promise<Array<any>> =>
    query("queryCpuStateFilter",`select cpu,id as filterId from cpu_measure_filter where name = 'cpu_idle' order by cpu;`,{})

export const queryCpuState = (cpuFilterId:number) :Promise<Array<any>> =>
    query('queryCpuState',`
        select (A.ts - B.start_ts) as startTs,
            value
        from measure A,trace_range B
        where filter_id = $filterId;`,{$filterId:cpuFilterId},"exec-buf")

export const queryCpuMaxFreq = (): Promise<Array<any>> =>
    query("queryCpuMaxFreq", `
    select
      max(value) as maxFreq
    from
      measure c
    inner join
      cpu_measure_filter t
    on
      c.filter_id = t.id
    where
      (name = 'cpufreq' or name='cpu_frequency');`)

export const queryProcessData = (pid:number,startNS:number,endNS:number):Promise<Array<any>> =>
    query("queryProcessData",`
    select  ta.cpu,
        dur, 
        ts-${(window as any).recordStartNS} as startTime
from thread_state ta
where ta.cpu is not null and pid=$pid and startTime between $startNS and $endNS;`, {
        $pid: pid,
        $startNS: startNS,
        $endNS: endNS
    });

export const queryProcessMem = (): Promise<Array<any>> =>
    query("queryProcessMem", `
    select
      process_measure_filter.id as trackId,
      process_measure_filter.name as trackName,
      ipid as upid,
      process.pid,
      process.name as processName
    from
      process_measure_filter
    join
      process using (ipid)
    order by trackName;`)

export const queryProcessThreadDataCount = ():Promise<Array<any>> =>
    query(`queryProcessThreadDataCount`,`select pid,count(id) as count 
    from thread_state 
    where ts between ${(window as any).recordStartNS} and ${(window as any).recordEndNS} group by pid;`,{});

export const queryProcessFuncDataCount = ():Promise<Array<any>> =>
    query(`queryProcessFuncDataCount`,`select
        P.pid,
        count(tid) as count
    from callstack C
    left join thread A on A.id = C.callid
    left join process AS P on P.id = A.ipid
    where  C.ts between ${(window as any).recordStartNS} and ${(window as any).recordEndNS} 
    group by pid;`,{});

export const queryProcessMemDataCount = ():Promise<Array<any>> =>
    query(`queryProcessMemDataCount`,`select
      p.pid as pid, count(value) count
    from process_measure c
    left join process_measure_filter f on f.id = c.filter_id
    left join process p on p.ipid = f.ipid
where f.id not NULL and value>0 
 and c.ts between ${(window as any).recordStartNS} and ${(window as any).recordEndNS}
group by p.pid`,{});

export const queryProcessMemData = (trackId: number): Promise<Array<ProcessMemStruct>> =>
    query("queryProcessMemData", `
    select
      c.type,
      ts,
      value,
      filter_id as track_id,
      c.ts-tb.start_ts startTime
    from
      process_measure c,
      trace_range tb
    where
      filter_id = $id;`, {$id: trackId})

export const queryDataDICT = (): Promise<Array<any>> =>
    query("queryDataDICT", `select * from data_dict;`)
export const queryProcessContentCount = ():Promise<Array<any>> =>
    query(`queryProcessContentCount`,`select pid,swtich_count as switch_count,thread_count,slice_count,mem_count from process;`);
export const queryProcessThreadsByTable = (): Promise<Array<ThreadStruct>> =>
    query("queryProcessThreadsByTable", `
        select p.pid as pid,t.tid as tid,p.name as processName,t.name as threadName from thread t left join process  p on t.ipid = p.id where t.tid != 0;
    `)
export const queryVirtualMemory = ():Promise<Array<any>> =>
    query("queryVirtualMemory",`select id,name from sys_event_filter where type='sys_virtual_memory_filter'`);
export const queryVirtualMemoryData = (filterId:number):Promise<Array<any>> =>
    query("queryVirtualMemoryData",`select ts-${(window as any).recordStartNS} as startTime,value,filter_id as filterID from sys_mem_measure where filter_id=$filter_id`,{$filter_id:filterId});
export const queryProcessThreads = (): Promise<Array<ThreadStruct>> =>
    query("queryProcessThreads", `
    select
      the_tracks.ipid as upid,
      the_tracks.itid as utid,
      total_dur as hasSched,
      process.pid as pid,
      thread.tid as tid,
      process.name as processName,
      thread.name as threadName
    from (
      select ipid,itid from sched_slice group by itid
    ) the_tracks
    left join (select itid,sum(dur) as total_dur from thread_state where state != 'S' group by itid) using(itid)
    left join thread using(itid)
    left join process using(ipid)
    order by total_dur desc,the_tracks.ipid,the_tracks.itid;`, {})

export const queryThreadData = (tid: number): Promise<Array<ThreadStruct>> =>
    query("queryThreadData", `
    select 
      A.id
     , B.tid
     , A.name
     , B.cpu
     , B.ts - TR.start_ts AS startTime
     , B.dur
     , B.state
     , B.pid
     , IP.name            as processName
from thread_state AS B
         left join thread as A on A.id = B.itid
         left join trace_range AS TR
         left join process AS IP on IP.id = A.ipid
where B.tid = $tid;`, {$tid: tid})

export const queryWakeUpThread_Desc = (): Promise<Array<any>> =>
    query("queryWakeUpThread_Desc", `This is the interval from when the task became eligible to run
(e.g.because of notifying a wait queue it was a suspended on) to when it started running.`)

/*-------------------------------------------------------------------------------------*/
export const queryWakeUpFromThread_WakeThread = (wakets: number): Promise<Array<WakeupBean>> =>
    query("queryWakeUpFromThread_WakeThread", `select TB.tid,TB.name as thread,TA.cpu,(TA.ts - TR.start_ts) as ts,TC.pid,TC.name as process
from sched_slice TA
left join thread TB on TA.itid = TB.id
left join process TC on TB.ipid = TC.id
left join trace_range TR
where TA.itid = (select itid from raw where name = 'sched_waking' and ts = $wakets )
    and TA.ts < $wakets
    and TA.ts + Ta.dur >= $wakets`, {$wakets: wakets})

/*-------------------------------------------------------------------------------------*/
export const queryWakeUpFromThread_WakeTime = (itid: number, startTime: number): Promise<Array<WakeUpTimeBean>> =>
    query("queryWakeUpFromThread_WakeTime", `select * from
    ( select ts as wakeTs,start_ts as startTs from instant,trace_range
       where name = 'sched_waking'
       and ref = $itid
       and ts < start_ts + $startTime
       order by ts desc limit 1) TA
       left join
    (select ts as preRow from sched_slice,trace_range
       where itid = $itid
       and ts < start_ts + $startTime
       order by ts desc limit 1) TB`, {$itid: itid, $startTime: startTime})
/*-------------------------------------------------------------------------------------*/

export const queryThreadWakeUp = (itid: number, startTime: number,dur:number): Promise<Array<WakeupBean>> =>
    query("queryThreadWakeUp", `
select TA.tid,min(TA.ts - TR.start_ts) as ts,TA.pid
from
  (select min(ts) as wakeTs,ref as itid from instant,trace_range
       where name = 'sched_wakeup'
       and wakeup_from = $itid
       and ts > start_ts + $startTime
       and ts < start_ts + $startTime + $dur
      group by ref
       ) TW
left join thread_state TA on TW.itid = TA.itid
left join trace_range TR
where TA.ts > TW.wakeTs
group by TA.tid,TA.pid;
    `, {$itid: itid, $startTime: startTime,$dur:dur})

export const queryThreadWakeUpFrom = (itid: number, startTime: number,dur:number): Promise<Array<WakeupBean>> =>
    query("queryThreadWakeUpFrom", `
select TA.tid,TA.cpu,(TA.ts - TR.start_ts) as ts,TA.pid
from
  (select ts as wakeTs,wakeup_from as wakeupFromTid from instant,trace_range
       where name = 'sched_wakeup'
       and ref = $itid
       and ts > start_ts + $startTime
       and ts < start_ts + $startTime + $dur) TW
left join thread_state TA on TW.wakeupFromTid = TA.itid
left join trace_range TR
where TA.ts < TW.wakeTs and TA.ts + TA.dur >= TW.wakeTs
limit 1;
    `, {$itid: itid, $startTime: startTime,$dur:dur})
/*-------------------------------------------------------------------------------------*/

export const queryHeapGroupByEvent = (): Promise<Array<NativeEventHeap>> =>
    query("queryHeapGroupByEvent", `
    select
      event_type as eventType,
      sum(heap_size) as sumHeapSize
    from
      native_hook
    where event_type = 'AllocEvent' or event_type = 'MmapEvent'
    group by event_type`, {})

export const queryAllHeapByEvent = (): Promise<Array<NativeEvent>> =>
    query("queryAllHeapByEvent", `
    select * from (
      select h.start_ts - t.start_ts as startTime,
       h.heap_size as heapSize,
       h.event_type as eventType
from native_hook h ,trace_range t
where h.start_ts >= t.start_ts and h.start_ts <= t.end_ts
and (h.event_type = 'AllocEvent' or h.event_type = 'MmapEvent')
union
select h.end_ts - t.start_ts as startTime,
       h.heap_size as heapSize,
       (case when h.event_type = 'AllocEvent' then 'FreeEvent' else 'MunmapEvent' end) as eventType
from native_hook h ,trace_range t
where h.start_ts >= t.start_ts and h.start_ts <= t.end_ts
and (h.event_type = 'AllocEvent' or h.event_type = 'MmapEvent')
and h.end_ts not null ) order by startTime;
`, {})

export const queryHeapAllData = (startTs: number, endTs: number, ipids: Array<number>): Promise<Array<HeapTreeDataBean>> =>
    query("queryHeapAllData", `
    select
      h.start_ts - t.start_ts as startTs,
      h.end_ts - t.start_ts as endTs,
      h.heap_size as heapSize,
      h.event_type as eventType,
      h.callchain_id as eventId
    from
      native_hook h
    inner join
      trace_range  t
    where
      event_type = 'AllocEvent'
    and
      ipid in (${ipids.join(",")})
    and
      (h.start_ts - t.start_ts between ${startTs} and ${endTs} or h.end_ts - t.start_ts between ${startTs} and ${endTs})`,
        {ipids: ipids, $startTs: startTs, $endTs: endTs})

export const queryNativeHookStatistics = (leftNs: number, rightNs: number): Promise<Array<NativeHookMalloc>> =>
    query("queryNativeHookStatistics", `
    select
      event_type as eventType,
      sub_type_id as subTypeId,
      max(heap_size) as max,
      sum(case when ((A.start_ts - B.start_ts) between ${leftNs} and ${rightNs}) then heap_size else 0 end) as allocByte,
      sum(case when ((A.start_ts - B.start_ts) between ${leftNs} and ${rightNs}) then 1 else 0 end) as allocCount,
      sum(case when ((A.end_ts - B.start_ts) between ${leftNs} and ${rightNs} ) then heap_size else 0 end) as freeByte,
      sum(case when ((A.end_ts - B.start_ts) between ${leftNs} and ${rightNs} ) then 1 else 0 end) as freeCount
    from
      native_hook A,
      trace_range B
    where
      (A.start_ts - B.start_ts) between ${leftNs} and ${rightNs}
     and (event_type = 'AllocEvent' or event_type = 'MmapEvent')
    group by event_type;`, {$leftNs: leftNs, $rightNs: rightNs})

export const queryNativeHookStatisticsMalloc = (leftNs: number, rightNs: number): Promise<Array<NativeHookMalloc>> =>
    query('queryNativeHookStatisticsMalloc', `
    select
      event_type as eventType,
      heap_size as heapSize,
      sum(case when ((A.start_ts - B.start_ts) between ${leftNs} and ${rightNs}) then heap_size else 0 end) as allocByte,
      sum(case when ((A.start_ts - B.start_ts) between ${leftNs} and ${rightNs}) then 1 else 0 end) as allocCount,
      sum(case when ((A.end_ts - B.start_ts) between ${leftNs} and ${rightNs} ) then heap_size else 0 end) as freeByte,
      sum(case when ((A.end_ts - B.start_ts) between ${leftNs} and ${rightNs} ) then 1 else 0 end) as freeCount
    from
      native_hook A,
      trace_range B
    where
      (A.start_ts - B.start_ts) between ${leftNs} and ${rightNs}
    and
      (event_type = 'AllocEvent' or event_type = 'MmapEvent')
    and 
      sub_type_id is null
    group by
      event_type,
      heap_size
    order by heap_size desc
    `, {$leftNs: leftNs, $rightNs: rightNs})

export const queryNativeHookStatisticsSubType = (leftNs: number, rightNs: number): Promise<Array<NativeHookMalloc>> =>
    query('queryNativeHookStatisticsSubType', `
    select
      event_type as eventType,
      sub_type_id as subTypeId,
      max(heap_size) as max,
      sum(case when ((A.start_ts - B.start_ts) between ${leftNs} and ${rightNs}) then heap_size else 0 end) as allocByte,
      sum(case when ((A.start_ts - B.start_ts) between ${leftNs} and ${rightNs}) then 1 else 0 end) as allocCount,
      sum(case when ((A.end_ts - B.start_ts) between ${leftNs} and ${rightNs} ) then heap_size else 0 end) as freeByte,
      sum(case when ((A.end_ts - B.start_ts) between ${leftNs} and ${rightNs} ) then 1 else 0 end) as freeCount
    from
      native_hook A,
      trace_range B
    where
      (A.start_ts - B.start_ts) between ${leftNs} and ${rightNs}
    and
      (event_type = 'MmapEvent')
    group by
      event_type,sub_type_id;
        `, {$leftNs: leftNs, $rightNs: rightNs})


export const queryNativeHookEventTid = (leftNs: number, rightNs: number, types: Array<string>): Promise<Array<NativeHookStatistics>> =>
    query("queryNativeHookEventTid", `
    select
      callchain_id as eventId,
      event_type as eventType,
      heap_size as heapSize,
      addr,
      (A.start_ts - B.start_ts) as startTs,
      (A.end_ts - B.start_ts) as endTs,
      tid,
      t.name as threadName
    from
      native_hook A,
      trace_range B
    left join
      thread t
    on
      A.itid = t.id
    where
      A.start_ts - B.start_ts
    between ${leftNs} and ${rightNs} and A.event_type in (${types.join(",")})`
        , {$leftNs: leftNs, $rightNs: rightNs, $types: types})

export const queryNativeHookProcess = (): Promise<Array<NativeHookProcess>> =>
    query("queryNativeHookProcess", `
    select
      distinct native_hook.ipid,
      pid,
      name
    from
      native_hook
    left join
      process p
    on
      native_hook.ipid = p.id`, {})

export const queryNativeHookSnapshotTypes = (): Promise<Array<NativeHookSampleQueryInfo>> =>
    query("queryNativeHookSnapshotTypes", `
select
      event_type as eventType,
      data as subType
    from
      native_hook left join data_dict on native_hook.sub_type_id = data_dict.id
    where
      (event_type = 'AllocEvent' or event_type = 'MmapEvent')
    group by
      event_type,data;`, {})

export const queryAllHookData = (rightNs: number): Promise<Array<NativeHookSampleQueryInfo>> =>
    query("queryAllHookData", `
    select
      callchain_id as eventId,
      event_type as eventType,
      data as subType,
      addr,
      heap_size as growth,
      (n.start_ts - t.start_ts) as startTs,
      (n.end_ts - t.start_ts) as endTs
    from
      native_hook n left join data_dict on n.sub_type_id = data_dict.id,
      trace_range t
    where
      (event_type = 'AllocEvent' or event_type = 'MmapEvent')
    and
      n.start_ts between t.start_ts and ${rightNs} + t.start_ts`, {$rightNs: rightNs})


/**
 * HiPerf
 */
export const queryHiPerfEventList = (): Promise<Array<any>> => query("queryHiPerfEventList", `select id,report_value from perf_report where report_type='config_name'`, {},"exec-buf")
export const queryHiPerfEventListData = (eventTypeId:number): Promise<Array<any>> => query("queryHiPerfEventListData", `
    select s.*,(s.timestamp_trace-t.start_ts) startNS from perf_sample s,trace_range t where event_type_id=${eventTypeId} and s.thread_id != 0;
`, {$eventTypeId:eventTypeId},"exec-buf")
export const queryHiPerfEventData = (eventTypeId:number,cpu:number): Promise<Array<any>> => query("queryHiPerfEventList", `
    select s.*,(s.timestamp_trace-t.start_ts) startNS from perf_sample s,trace_range t where event_type_id=${eventTypeId} and cpu_id=${cpu} and s.thread_id != 0;
`, {$eventTypeId:eventTypeId,$cpu:cpu},"exec-buf")
export const queryHiPerfCpuData = (cpu: number): Promise<Array<any>> =>
    query("queryHiPerfCpuData", `select s.*,(s.timestamp_trace-t.start_ts) startNS from perf_sample s,trace_range t where cpu_id=${cpu} and s.thread_id != 0;`, {$cpu: cpu},"exec-buf")
export const queryHiPerfCpuMergeData = (): Promise<Array<any>> =>
    query("queryHiPerfCpuData", `select s.*,(s.timestamp_trace-t.start_ts) startNS from perf_sample s,trace_range t where s.thread_id != 0;`, {},"exec-buf")
export const queryHiPerfCpuMergeData2 = (): Promise<Array<any>> =>
    query("queryHiPerfCpuData2", `select s.*,(s.timestamp_trace-t.start_ts) startNS from perf_sample s,trace_range t where s.thread_id != 0;`, {})

export const queryHiPerfProcessData = (pid: number): Promise<Array<any>> => query("queryHiPerfProcessData", `SELECT sp.*,
       th.thread_name,
       th.thread_id                     tid,
       th.process_id                    pid,
       sp.timestamp_trace - tr.start_ts startNS
from perf_sample sp,
     trace_range tr
         left join perf_thread th on th.thread_id = sp.thread_id
where pid = ${pid} and sp.thread_id != 0;;`, {$pid: pid},"exec-buf")

export const queryHiPerfThreadData = (tid: number): Promise<Array<any>> => query("queryHiPerfThreadData", `SELECT sp.*,
       th.thread_name,
       th.thread_id                     tid,
       th.process_id                    pid,
       sp.timestamp_trace - tr.start_ts startNS
from perf_sample sp,
     trace_range tr
         left join perf_thread th on th.thread_id = sp.thread_id
where tid = ${tid} and sp.thread_id != 0;`, {$tid: tid},"exec-buf")

export const querySelectTraceStats = (): Promise<Array<{
    event_name: string
    stat_type: string
    count: number
    source: string
    serverity: string
}>> =>
    query('querySelectTraceStats', 'select event_name,stat_type,count,source,serverity from stat');

export const queryCustomizeSelect = (sql: string): Promise<Array<any>> =>
    query('queryCustomizeSelect', sql);

export const queryDistributedTerm = (): Promise<Array<{
    threadId: string
    threadName: string
    processId: string
    processName: string
    funName: string
    dur: string
    ts: string
    chainId: string
    spanId: string
    parentSpanId: string
    flag: string
    trace_name: string
}>> =>
    query('queryDistributedTerm', `
    select
      group_concat(thread.id,',') as threadId,
      group_concat(thread.name,',') as threadName,
      group_concat(process.id,',') as processId,
      group_concat(process.name,',') as processName,
      group_concat(callstack.name,',') as funName,
      group_concat(callstack.dur,',') as dur,
      group_concat(callstack.ts,',') as ts,
      cast(callstack.chainId as varchar) as chainId,
      callstack.spanId as spanId,
      callstack.parentSpanId as parentSpanId,
      group_concat(callstack.flag,',') as flag,
      (select
        value
      from
        meta
      where
        name='source_name') as trace_name
      from
        callstack
      inner join thread on callstack.callid = thread.id
      inner join process on process.id = thread.ipid
      where (callstack.flag='S' or callstack.flag='C')
      group by callstack.chainId,callstack.spanId,callstack.parentSpanId`);

export const queryTraceCpu = (): Promise<Array<{
    tid: string
    pid: string
    cpu: string
    dur: string
    min_freq: string
    max_freq: string
    avg_frequency: string
}>> =>
    query('queryTraceCpu', `SELECT 
        itid AS tid, 
        ipid AS pid, 
        group_concat(cpu, ',') AS cpu, 
        group_concat(dur, ',') AS dur, 
        group_concat(min_freq, ',') AS min_freq, 
        group_concat(max_freq, ',') AS max_freq, 
        group_concat(avg_frequency, ',') AS avg_frequency 
        FROM 
        (SELECT 
            itid, 
            ipid, 
            cpu, 
            CAST (SUM(dur) AS INT) AS dur, 
            CAST (MIN(freq) AS INT) AS min_freq, 
            CAST (MAX(freq) AS INT) AS max_freq, 
            CAST ( (SUM(dur * freq) / SUM(dur) ) AS INT) AS avg_frequency 
            from 
            result 
            group by 
            itid, cpu
        ) 
        GROUP BY 
        ipid, itid 
        ORDER BY 
        ipid
    `);

export const queryTraceCpuTop = (): Promise<Array<{
    tid: string
    pid: string
    cpu: string
    duration: string
    min_freq: string
    max_freq: string
    avg_frequency: string
    sumNum: string
}>> =>
    query('queryTraceCpuTop', `SELECT 
        itid AS tid, 
        ipid AS pid, 
        group_concat(cpu, ',') AS cpu, 
        group_concat(dur, ',') AS dur, 
        group_concat(min_freq, ',') AS min_freq, 
        group_concat(max_freq, ',') AS max_freq, 
        group_concat(avg_frequency, ',') AS avg_frequency, 
        sum(dur * avg_frequency) AS sumNum 
        FROM 
        (SELECT 
            itid, 
            ipid, 
            cpu, 
            CAST (SUM(dur) AS INT) AS dur, 
            CAST (MIN(freq) AS INT) AS min_freq, 
            CAST (MAX(freq) AS INT) AS max_freq, 
            CAST ( (SUM(dur * freq) / SUM(dur) ) AS INT) AS avg_frequency 
            from result group by itid, cpu
        ) 
        GROUP BY 
        ipid, itid 
        ORDER BY 
        sumNum 
        DESC 
        LIMIT 10;
    `);

export const queryTraceMemory = (): Promise<Array<{
    maxNum: string
    minNum: string
    avgNum: string
    name: string
    processName: string
}>> =>
    query('queryTraceMemory', `
    select
        max(value) as maxNum,
        min(value) as minNum,
        avg(value) as avgNum,
        filter.name as name,
        p.name as processName
        from process_measure
        left join process_measure_filter as filter on filter.id= filter_id
        left join process as p on p.id = filter.ipid
    where 
    filter_id > 0 
    and 
    filter.name = 'mem.rss.anon' 
    group by 
    filter_id 
    order by 
    avgNum desc`);

export const queryTraceMemoryTop = (): Promise<Array<{
    maxNum: string
    minNum: string
    avgNum: string
    name: string
    processName: string
}>> =>
    query('queryTraceMemoryTop', `
    select
        max(value) as maxNum,
        min(value) as minNum,
        avg(value) as avgNum,
        filter.name as name,
        p.name as processName
        from process_measure
        left join process_measure_filter as filter on filter.id= filter_id
        left join process as p on p.id = filter.ipid
    where 
    filter_id > 0 
    and 
    filter.name = 'mem.rss.anon' 
    group by 
    filter_id 
    order by 
    avgNum desc limit 10`);

export const queryTraceMemoryUnAgg = (): Promise<Array<{
    processName: string
    name: string
    value: string
    ts: string
}>> =>
    query('queryTraceMemoryUnAgg', `
    select
        p.name as processName,
        group_concat(filter.name) as name,
        cast(group_concat(value) as varchar) as value,
        cast(group_concat(ts) as varchar) as ts
        from process_measure m
        left join process_measure_filter as filter on filter.id= m.filter_id
        left join process as p on p.id = filter.ipid
        where 
        filter.name = 'mem.rss.anon' 
        or 
        filter.name = 'mem.rss.file' 
        or 
        filter.name = 'mem.swap' 
        or 
        filter.name = 'oom_score_adj'
    group by 
    p.name,filter.ipid 
    order by 
    filter.ipid`);

export const queryTraceTaskName = (): Promise<Array<{
    id: string
    pid: string
    process_name: string
    thread_name: string
}>> =>
    query('queryTraceTaskName', `
    select
        P.id as id,
        P.pid as pid,
        P.name as process_name,
        group_concat(T.name,',') as thread_name
    from process as P left join thread as T where P.id = T.ipid
    group by pid`);

export const queryTraceMetaData = (): Promise<Array<{
    name: string
    valueText: string
}>> =>
    query('queryTraceMetaData', `
    select
        cast(name as varchar) as name,
        cast(value as varchar) as valueText 
        from meta
        UNION
        select 'start_ts',cast(start_ts as varchar) from trace_range
        UNION
        select 'end_ts',cast(end_ts as varchar) from trace_range`);

export const querySystemCalls = (): Promise<Array<{
    frequency: string
    minDur: string
    maxDur: string
    avgDur: string
    funName: string
}>> =>
    query('querySystemCalls', `
    select
      count(*) as frequency,
      min(dur) as minDur,
      max(dur) as maxDur,
      avg(dur) as avgDur,
      name as funName
    from
      callstack
      group by name
      order by
    frequency desc limit 100`);

export const querySystemCallsTop = (): Promise<Array<{
    tid: string
    pid: string
    funName: string
    frequency: string
    minDur: string
    maxDur: string
    avgDur: string
}>> =>
    query('querySystemCallsTop', `SELECT 
        cpu.tid AS tid, 
        cpu.pid AS pid, 
        callstack.name AS funName, 
        count(callstack.name) AS frequency, 
        min(callstack.dur) AS minDur, 
        max(callstack.dur) AS maxDur, 
        round(avg(callstack.dur)) AS avgDur 
        FROM 
        callstack 
        INNER JOIN 
        (SELECT 
            itid AS tid, 
            ipid AS pid, 
            group_concat(cpu, ',') AS cpu, 
            group_concat(dur, ',') AS dur, 
            group_concat(min_freq, ',') AS min_freq, 
            group_concat(max_freq, ',') AS max_freq, 
            group_concat(avg_frequency, ',') AS avg_frequency, 
            sum(dur * avg_frequency) AS sumNum 
            FROM 
            (SELECT 
                itid, 
                ipid, 
                cpu, 
                CAST (SUM(dur) AS INT) AS dur, 
                CAST (MIN(freq) AS INT) AS min_freq, 
                CAST (MAX(freq) AS INT) AS max_freq, 
                CAST ( (SUM(dur * freq) / SUM(dur) ) AS INT) AS avg_frequency 
                FROM 
                result 
                GROUP BY 
                itid, cpu
            ) 
            GROUP BY 
            ipid, itid 
            ORDER BY 
            sumNum 
            DESC 
            LIMIT 10
        ) AS cpu 
        ON 
        callstack.callid = cpu.tid 
        GROUP BY 
        callstack.name 
        ORDER BY 
        frequency 
        DESC
    LIMIT 10`);

export const getTabLiveProcessData = (leftNs: number, rightNs: number): Promise<Array<LiveProcess>> =>
    query<LiveProcess>("getTabLiveProcessData", `SELECT
        process.id as processId,
        process.name as processName,
        process.ppid as responsibleProcess,
        process.uud as userName,
        process.usag as cpu,
        process.threadN as threads,
        process.pss as memory,
        process.cpu_time as cpuTime,
        process.disk_reads as diskReads,
        process.disk_writes as diskWrite
        FROM
        (
        SELECT
        tt.process_id AS id,
        tt.process_name AS name,
        tt.parent_process_id AS ppid,
        tt.uid as uud,
        tt.cpu_usage as usag,
        tt.thread_num AS threadN,
        mt.maxTT - TR.start_ts as endTs,
        tt.pss_info as pss,
        tt.cpu_time,
        tt.disk_reads,
        tt.disk_writes
        FROM
        live_process tt
        LEFT JOIN trace_range AS TR 
        LEFT JOIN (select re.process_id as idd, max(re.ts) as maxTT, min(re.ts) as minTT 
        from live_process re GROUP BY re.process_name, re.process_id ) mt
        on mt.idd = tt.process_id where endTs >= $rightNS
        GROUP BY
        tt.process_name,
        tt.process_id 
        ) process ;`, {$leftNS: leftNs, $rightNS: rightNs})

export const getTabProcessHistoryData = (leftNs: number, rightNs: number,
                                         processId: number | undefined, threadId: number | undefined): Promise<Array<ProcessHistory>> =>
    query<ProcessHistory>("getTabProcessHistoryData", `SELECT
        process.id as processId,
        process.isD as alive,
        process.startTS as firstSeen,
        process.endTs as lastSeen,
        process.name as processName,
        process.ppid as responsibleProcess,
        process.uuid as userName,
        process.cpu_time as cpuTime,
        0 as pss
        FROM
        (
        SELECT
        tt.process_id AS id,
        tt.process_name AS name,
        tt.parent_process_id AS ppid,
        tt.uid AS uuid,
        tt.cpu_time,
        (mt.minTT - TR.start_ts ) AS startTS,
        mt.maxTT - TR.start_ts as endTs,
        (mt.maxTT - TR.start_ts - $rightNS) > 0 as isD
        FROM
        live_process tt
        LEFT JOIN trace_range AS TR 
        LEFT JOIN (select re.process_id as idd, max(re.ts) as maxTT, min(re.ts) as minTT 
        from live_process re GROUP BY re.process_name, re.process_id ) mt
        on mt.idd = tt.process_id 
        GROUP BY
        tt.process_name,
        tt.process_id 
        ) process;`
        , {$leftNS: leftNs, $rightNS: rightNs, $processID: processId, $threadID: threadId})

export const getTabCpuAbilityData = (leftNs: number, rightNs: number): Promise<Array<SystemCpuSummary>> =>
    query<SystemCpuSummary>("getTabCpuAbilityData", `SELECT
        ( n.ts - TR.start_ts ) AS startTime,
        n.dur AS duration,
        n.total_load AS totalLoad,
        n.user_load AS userLoad,
        n.system_load AS systemLoad,
        n.process_num AS threads 
        FROM
        cpu_usage AS n,
        trace_range AS TR 
        WHERE
        ( n.ts - TR.start_ts ) >= ifnull((
        SELECT
        ( usage.ts - TR.start_ts ) 
        FROM
        cpu_usage usage,
        trace_range TR 
        WHERE
        ( usage.ts - TR.start_ts ) <= $leftNS 
        ORDER BY
        usage.ts DESC 
        LIMIT 1 
        ),0)
        AND ( n.ts - TR.start_ts ) <= $rightNS 
        ORDER BY
        startTime ASC;
    `, {$leftNS: leftNs, $rightNS: rightNs})

export const getTabMemoryAbilityData = (leftNs: number, rightNs: number): Promise<Array<{
    startTime: number,
    value: string,
    name: string;
}>> =>
    query("getTabMemoryAbilityData", `SELECT
        m.ts AS startTime,
        GROUP_CONCAT( IFNULL( m.value, 0 ) ) AS value,
        GROUP_CONCAT( f.name ) AS name 
        FROM
        sys_mem_measure AS m
        INNER JOIN sys_event_filter AS f ON m.filter_id = f.id 
        AND (f.name = 'sys.mem.total' 
         or f.name = 'sys.mem.free'
         or f.name = 'sys.mem.buffers'
         or f.name = 'sys.mem.cached' 
         or f.name = 'sys.mem.shmem'
         or f.name = 'sys.mem.slab'
         or f.name = 'sys.mem.swap.total'
         or f.name = 'sys.mem.swap.free'
         or f.name = 'sys.mem.mapped'
         or f.name = 'sys.mem.vmalloc.used'
         or f.name = 'sys.mem.page.tables'
         or f.name = 'sys.mem.kernel.stack'
         or f.name = 'sys.mem.active'
         or f.name = 'sys.mem.inactive'
         or f.name = 'sys.mem.unevictable'
         or f.name = 'sys.mem.vmalloc.total'
         or f.name = 'sys.mem.slab.unreclaimable'
         or f.name = 'sys.mem.cma.total'
         or f.name = 'sys.mem.cma.free'
         or f.name = 'sys.mem.kernel.reclaimable'
         or f.name = 'sys.mem.zram'
         ) 
        AND m.ts >= ifnull((
        SELECT
        m.ts AS startTime 
        FROM
        sys_mem_measure AS m
        INNER JOIN sys_event_filter AS f ON m.filter_id = f.id 
        AND m.ts <= $leftNS 
        AND (f.name = 'sys.mem.total' 
         or f.name = 'sys.mem.free'
         or f.name = 'sys.mem.buffers'
         or f.name = 'sys.mem.cached' 
         or f.name = 'sys.mem.shmem'
         or f.name = 'sys.mem.slab'
         or f.name = 'sys.mem.swap.total'
         or f.name = 'sys.mem.swap.free'
         or f.name = 'sys.mem.mapped'
         or f.name = 'sys.mem.vmalloc.used'
         or f.name = 'sys.mem.page.tables'
         or f.name = 'sys.mem.kernel.stack'
         or f.name = 'sys.mem.active'
         or f.name = 'sys.mem.inactive'
         or f.name = 'sys.mem.unevictable'
         or f.name = 'sys.mem.vmalloc.total'
         or f.name = 'sys.mem.slab.unreclaimable'
         or f.name = 'sys.mem.cma.total'
         or f.name = 'sys.mem.cma.free'
         or f.name = 'sys.mem.kernel.reclaimable'
         or f.name = 'sys.mem.zram'
         ) 
        ORDER BY
        m.ts DESC 
        LIMIT 1 
        ),0)
        AND m.ts <= $rightNS GROUP BY m.ts;`, {$leftNS: leftNs, $rightNS: rightNs})

export const getTabNetworkAbilityData = (leftNs: number, rightNs: number): Promise<Array<SystemNetworkSummary>> =>
    query<SystemNetworkSummary>("getTabNetworkAbilityData", `SELECT
            ( n.ts - TR.start_ts ) AS startTime,
            n.dur AS duration,
            n.rx AS dataReceived,
            n.tx_speed AS dataReceivedSec,
            n.tx AS dataSend,
            n.rx_speed AS dataSendSec,
            n.packet_in AS packetsIn,
            n.packet_in_sec AS packetsInSec,
            n.packet_out AS packetsOut,
            n.packet_out_sec AS packetsOutSec 
            FROM
            network AS n,
            trace_range AS TR 
            WHERE
            ( n.ts - TR.start_ts ) >= ifnull((
            SELECT
            ( nn.ts - T.start_ts ) AS startTime 
            FROM
            network nn,
            trace_range T 
            WHERE
            ( nn.ts - T.start_ts ) <= $leftNS
            ORDER BY
            nn.ts DESC 
            LIMIT 1 
            ),0)  
            AND ( n.ts - TR.start_ts ) <= $rightNS 
            ORDER BY
            startTime ASC`, {$leftNS: leftNs, $rightNS: rightNs})

/*-------------------------------------------------------------------------------------*/
export const getTabDiskAbilityData = (leftNs: number, rightNs: number): Promise<Array<SystemDiskIOSummary>> =>
    query<SystemDiskIOSummary>("getTabDiskAbilityData", `SELECT
        ( n.ts - TR.start_ts ) AS startTime,
        n.dur AS duration,
        n.rd AS dataRead,
        n.rd_speed AS dataReadSec,
        n.wr AS dataWrite,
        n.wr_speed AS dataWriteSec,
        n.rd_count AS readsIn,
        n.rd_count_speed AS readsInSec,
        n.wr_count AS writeOut,
        n.wr_count_speed AS writeOutSec 
        FROM
        diskio AS n,
        trace_range AS TR 
        WHERE
        ( n.ts - TR.start_ts ) >= ifnull((
        SELECT
        ( nn.ts - T.start_ts ) AS startTime 
        FROM
        diskio AS nn,
        trace_range AS T 
        WHERE
        ( nn.ts - T.start_ts ) <= $leftNS 
        ORDER BY
        nn.ts DESC 
        LIMIT 1 
        ),0)
        AND ( n.ts - TR.start_ts ) <= $rightNS 
        ORDER BY
        startTime ASC;
    `, {$leftNS: leftNs, $rightNS: rightNs})

export const queryCpuAbilityData = (): Promise<Array<CpuAbilityMonitorStruct>> =>
    query("queryCpuAbilityData", `select 
        (t.total_load) as value,
        (t.ts - TR.start_ts) as startNS
        from cpu_usage t, trace_range AS TR;`)

export const queryCpuAbilityUserData = (): Promise<Array<CpuAbilityMonitorStruct>> =>
    query("queryCpuAbilityUserData", `select 
        t.user_load as value,
        (t.ts - TR.start_ts) as startNS
        from cpu_usage t, trace_range AS TR;`)

export const queryCpuAbilitySystemData = (): Promise<Array<CpuAbilityMonitorStruct>> =>
    query("queryCpuAbilitySystemData", `select 
        t.system_load as value,
        (t.ts - TR.start_ts) as startNS
        from cpu_usage t, trace_range AS TR;`)

export const queryMemoryUsedAbilityData = (id: string): Promise<Array<MemoryAbilityMonitorStruct>> =>
    query("queryMemoryUsedAbilityData", `select 
        t.value as value,
        (t.ts - TR.start_ts) as startNS
        from sys_mem_measure t, trace_range AS TR where t.filter_id = $id;`, {$id: id})

export const queryCachedFilesAbilityData = (id: string): Promise<Array<MemoryAbilityMonitorStruct>> =>
    query("queryCachedFilesAbilityData", `select 
        t.value as value,
        (t.ts - TR.start_ts) as startNS
        from sys_mem_measure t, trace_range AS TR where t.filter_id = $id;`, {$id: id})

export const queryCompressedAbilityData = (id: string): Promise<Array<MemoryAbilityMonitorStruct>> =>
    query("queryCompressedAbilityData", `select 
        t.value as value,
        (t.ts - TR.start_ts) as startNS
        from sys_mem_measure t, trace_range AS TR where t.filter_id = $id;`, {$id: id})

export const querySwapUsedAbilityData = (id: string): Promise<Array<MemoryAbilityMonitorStruct>> =>
    query("querySwapUsedAbilityData", `select 
        t.value as value,
        (t.ts - TR.start_ts) as startNS
        from sys_mem_measure t, trace_range AS TR where t.filter_id = $id;`, {$id: id})

export const queryBytesReadAbilityData = (): Promise<Array<DiskAbilityMonitorStruct>> =>
    query("queryBytesReadAbilityData", `select 
        t.rd_speed as value,
        (t.ts - TR.start_ts) as startNS
        from diskio t, trace_range AS TR;`)

export const queryBytesWrittenAbilityData = (): Promise<Array<DiskAbilityMonitorStruct>> =>
    query("queryBytesWrittenAbilityData", `select 
        t.wr_speed as value,
        (t.ts - TR.start_ts) as startNS
        from diskio t, trace_range AS TR;`)

export const queryReadAbilityData = (): Promise<Array<DiskAbilityMonitorStruct>> =>
    query("queryReadAbilityData", `select 
        t.rd_count_speed as value,
        (t.ts - TR.start_ts) as startNS
        from diskio t, trace_range AS TR;`)


export const queryWrittenAbilityData = (): Promise<Array<DiskAbilityMonitorStruct>> =>
    query("queryWrittenAbilityData", `select 
        t.wr_count_speed as value,
        (t.ts - TR.start_ts) as startNS
        from diskio t, trace_range AS TR;`)

export const queryBytesInAbilityData = (): Promise<Array<NetworkAbilityMonitorStruct>> =>
    query("queryBytesInAbilityData", `select 
        t.tx_speed as value,
        (t.ts - TR.start_ts) as startNS
        from network t, trace_range AS TR;`)

export const queryBytesOutAbilityData = (): Promise<Array<NetworkAbilityMonitorStruct>> =>
    query("queryBytesOutAbilityData", `select 
        t.rx_speed as value,
        (t.ts - TR.start_ts) as startNS
        from network t, trace_range AS TR;`,)

export const queryPacketsInAbilityData = (): Promise<Array<NetworkAbilityMonitorStruct>> =>
    query("queryPacketsInAbilityData", `select 
        t.packet_in_sec as value,
        (t.ts - TR.start_ts) as startNS
        from network t, trace_range AS TR;`,)

export const queryPacketsOutAbilityData = (): Promise<Array<NetworkAbilityMonitorStruct>> =>
    query("queryPacketsOutAbilityData", `select 
        t.packet_out_sec as value,
        (t.ts - TR.start_ts) as startNS
        from network t, trace_range AS TR;`)

export const queryNetWorkMaxData = (): Promise<Array<any>> =>
    query("queryNetWorkMaxData", `select 
     ifnull(max(tx_speed),0) as maxIn, 
     ifnull(max(rx_speed),0) as maxOut,
     ifnull(max(packet_in_sec),0) as maxPacketIn,
     ifnull(max(packet_in_sec),0) as maxPacketOut
     from network`)

export const queryMemoryMaxData = (memoryName: string): Promise<Array<any>> =>
    query("queryMemoryMaxData",
        `SELECT ifnull(max(m.value),0) as maxValue,
            filter_id 
            from sys_mem_measure m 
            WHERE m.filter_id =
            (SELECT id FROM sys_event_filter WHERE name = $memoryName)
`, {$memoryName: memoryName})

export const queryDiskIoMaxData = (): Promise<Array<any>> =>
    query("queryDiskIoMaxData", `select
    ifnull(max(rd_speed),0) as bytesRead, 
    ifnull(max(wr_speed),0) as bytesWrite,
    ifnull(max(rd_count_speed),0) as readOps,
    ifnull(max(wr_count_speed),0)  as writeOps
    from diskio`)

export const queryAbilityExits = (): Promise<Array<any>> =>
    query("queryAbilityExits", `select 
      event_name 
      from stat s 
      where s.event_name in ('trace_diskio','trace_network', 'trace_cpu_usage','sys_memory') 
      and s.stat_type ='received' and s.count > 0`)

export const queryStartTime = (): Promise<Array<any>> =>
    query("queryStartTime", `SELECT start_ts FROM trace_range`)

export const queryPerfFiles = (): Promise<Array<PerfFile>> =>
    query("queryPerfFiles", `select file_id as fileId,symbol,path from perf_files`, {})

export const queryPerfProcess = (): Promise<Array<PerfThread>> =>
    query("queryPerfThread", `select process_id as pid,thread_name as processName from perf_thread where process_id = thread_id`, {})

export const queryPerfThread = (): Promise<Array<PerfThread>> =>
    query("queryPerfThread", `select a.thread_id as tid,a.thread_name as threadName,a.process_id as pid,b.thread_name as processName from perf_thread a left join (select * from perf_thread where thread_id = process_id) b on a.process_id = b.thread_id`, {})

export const queryPerfSampleListByTimeRange = (leftNs: number, rightNs: number, cpus: Array<number>, processes: Array<number>, threads: Array<number>): Promise<Array<PerfSample>> => {
    let sql = `
select A.callchain_id as sampleId,
       A.thread_id as tid,
       C.thread_name as threadName,
       A.thread_state as state,
       C.process_id as pid,
       (timestamp_trace - R.start_ts) as time,
       cpu_id as core
from perf_sample A,trace_range R
left join perf_thread C on A.thread_id = C.thread_id
where time >= $leftNs and time <= $rightNs and A.thread_id != 0
    `
    if (cpus.length != 0 || processes.length != 0 || threads.length != 0) {
        let arg1 = cpus.length > 0 ? `or core in (${cpus.join(",")}) ` : '';
        let arg2 = processes.length > 0 ? `or pid in (${processes.join(",")}) ` : '';
        let arg3 = threads.length > 0 ? `or tid in (${threads.join(",")})` : '';
        let arg = `${arg1}${arg2}${arg3}`.substring(3);
        sql = `${sql} and (${arg})`
    }
    return query("queryPerfSampleListByTimeRange", sql, {$leftNs: leftNs, $rightNs: rightNs});
}

export const queryPerfSampleIdsByTimeRange = (leftNs: number, rightNs: number, cpus: Array<number>, processes: Array<number>, threads: Array<number>): Promise<Array<PerfSample>> => {
    let sql = `
select A.callchain_id as sampleId 
from perf_sample A,trace_range R
left join perf_thread C on A.thread_id = C.thread_id
where (timestamp_trace - R.start_ts) >= $leftNs and (timestamp_trace - R.start_ts) <= $rightNs and A.thread_id != 0 
    `
    if (cpus.length != 0 || processes.length != 0 || threads.length != 0) {
        let arg1 = cpus.length > 0 ? `or A.cpu_id in (${cpus.join(",")}) ` : '';
        let arg2 = processes.length > 0 ? `or C.process_id in (${processes.join(",")}) ` : '';
        let arg3 = threads.length > 0 ? `or A.thread_id in (${threads.join(",")})` : '';
        let arg = `${arg1}${arg2}${arg3}`.substring(3);
        sql = `${sql} and (${arg})`
    }
    return query("queryPerfSampleIdsByTimeRange", sql, {$leftNs: leftNs, $rightNs: rightNs});
}

export const queryPerfSampleCallChain = (sampleId: number): Promise<Array<PerfStack>> =>
    query("queryPerfSampleCallChain", `
    select
    callchain_id as callChainId,
    callchain_id as sampleId,
    file_id as fileId,
    symbol_id as symbolId,
    vaddr_in_file as vaddrInFile,
    name as symbol
from perf_callchain where callchain_id = $sampleId and symbol_id != -1 and vaddr_in_file != 0;
    `, {$sampleId: sampleId})

export const queryPerfCmdline = ():Promise<Array<PerfCmdLine>> =>
    query("queryPerfCmdline",`
    select report_value from perf_report  where report_type = 'cmdline'
    `,{})

export const queryCPuAbilityMaxData = (): Promise<Array<any>> =>
    query("queryCPuAbilityMaxData",
        `select ifnull(max(total_load),0) as totalLoad, 
                ifnull(max(user_load),0) as userLoad,
                ifnull(max(system_load),0) as systemLoad
                from cpu_usage`)

export const querySearchFunc = (search:string):Promise<Array<SearchFuncBean>> =>
    query("querySearchFunc",`
   select c.id,c.name as funName,c.ts - r.start_ts as startTime,c.dur,c.depth,t.tid,t.name as threadName
   ,p.pid ,'func' as type from callstack c left join thread t on c.callid = t.id left join process p on t.ipid = p.id 
   left join trace_range r 
   where c.name like '%${search}%' and startTime > 0;
    `,{$search:search})

export const queryBinderBySliceId = (id:number): Promise<Array<any>> =>
    query("queryBinderBySliceId",
        `select c.ts-D.start_ts as startTime,
    c.dur,
    t.tid,p.pid,c.depth 
    from callstack c,trace_range D
    left join thread t on c.callid = t.id
    left join process p on p.id = t.ipid
where cat = 'binder' and c.id = $id;`,{$id:id})

export const queryBinderByArgsId = (id:number,startTime:number,isNext:boolean): Promise<Array<any>> =>{
    let sql = `select c.ts - D.start_ts as startTime,
    c.dur,
    t.tid,p.pid,c.depth 
    from callstack c,trace_range D
    left join thread t on c.callid = t.id
    left join process p on p.id = t.ipid
where cat = 'binder' and  c.argsetid = $id`
    if(isNext){
        sql += " and c.ts > $startTime +  D.start_ts"
    }else {
        sql += " and c.ts < $startTime +  D.start_ts"
    }
    return query("queryBinderByArgsId",sql,{$id:id,$startTime:startTime})
}

export const getTabPaneFilesystemStatisticsFather = (leftNs: number, rightNs: number): Promise<Array<any>> =>
    query("getTabPaneFilesystemStatisticsFather", `
        select SUM(dur)    as allDuration,
        count(f.type) as count,
        min(dur)    as minDuration,
        max(dur)    as maxDuration,
        round(avg(dur),2)    as avgDuration,
        p.name,
        f.type,
        p.pid,
        sum(ifnull(size,0))    as size
        from file_system_sample as f left join process as p on f.ipid=p.ipid
        where f.start_ts >= $leftNs
        and end_ts <= $rightNs
        group by f.type;
`, {$leftNs:leftNs,$rightNs:rightNs});

export const getTabPaneFilesystemStatisticsChild = (leftNs: number, rightNs: number): Promise<Array<any>> =>
    query("getTabPaneFilesystemStatisticsChild", `
    select SUM(dur)    as allDuration,
        count(f.type) as count,
        min(dur)    as minDuration,
        max(dur)    as maxDuration,
        round(avg(dur),2)    as avgDuration,
        p.name,
        f.type,
        p.pid,
        sum(ifnull(size,0))    as size
        from file_system_sample as f left join process as p on f.ipid=p.ipid
        where f.start_ts >= $leftNs
        and end_ts <= $rightNs
        group by f.type, f.ipid;
`, {$leftNs:leftNs,$rightNs:rightNs});

export const getTabPaneFilesystemStatisticsAll = (leftNs: number, rightNs: number): Promise<Array<any>> =>
    query("getTabPaneFilesystemStatisticsAll", `
    select SUM(dur)    as allDuration,
       count(type) as count,
       min(dur)    as minDuration,
       max(dur)    as maxDuration,
       round(avg(dur),2)    as avgDuration,
       type
    from file_system_sample
    where start_ts >= $leftNs
    and end_ts <= $rightNs;
`, {$leftNs:leftNs,$rightNs:rightNs});

export const getTabPaneFilesystemStatistics = (leftNs: number, rightNs: number): Promise<Array<any>> =>
    query("getTabPaneFilesystemStatistics", `
    select p.pid,
       ifnull(p.name,'Process') as name,
       f.type,
       count(f.ipid) as count,
       sum(ifnull(size,0)) as size,
       sum(case when f.type = 2 then ifnull(size,0) else 0 end) as logicalReads,
       sum(case when f.type = 3 then ifnull(size,0) else 0 end) as logicalWrites,
       sum(case when f.type != 2 and f.type != 3 then ifnull(size,0) else 0 end) as otherFile,
       sum(dur) as allDuration,
       min(dur) as minDuration,
       max(dur) as maxDuration,
       avg(dur) as avgDuration
    from file_system_sample as f left join process as p on f.ipid=p.ipid
    where end_ts >= $leftNs
    and end_ts <= $rightNs
    group by f.type,f.ipid
    order by f.type;
`, {$leftNs:leftNs,$rightNs:rightNs});

export const getTabPaneVirtualMemoryStatisticsData = (leftNs: number, rightNs: number): Promise<Array<any>> =>
    query("getTabPaneVirtualMemoryStatisticsData", `
    select p.pid,
       t.tid,
       ifnull(p.name,'Process') as pname,
       ifnull(t.name,'Thread') as tname,
       f.type,
       f.ipid,
       f.itid,
       count(f.ipid) as count,
       sum(dur) as allDuration,
       min(dur) as minDuration,
       max(dur) as maxDuration,
       avg(dur) as avgDuration
    from virtual_memory_sample as f left join process as p on f.ipid=p.ipid left join thread as t on f.itid=t.itid
    where f.end_ts >= $leftNs
    and f.end_ts <= $rightNs
    group by f.type,f.ipid,f.itid
    order by f.type;
`, {$leftNs:leftNs,$rightNs:rightNs});

export const getTabPaneIOTierStatisticsData = (leftNs: number, rightNs: number, diskIOipids:Array<number>): Promise<Array<any>> =>{
    let str = "";
    if (diskIOipids.length > 0) {
        str = ` and f.ipid in (${diskIOipids.join(",")})`;
    }
    return query("getTabPaneIOTierStatisticsData", `
    select p.pid,
       ifnull(p.name,'Process') as pname,
       i.tier,
       i.ipid,
       path,
       count(i.ipid) as count,
       sum(latency_dur) as allDuration,
       min(latency_dur) as minDuration,
       max(latency_dur) as maxDuration,
       avg(latency_dur) as avgDuration
    from io_latency_sample as i left join process as p on i.ipid=p.ipid
    where i.start_ts >= $leftNs
    and i.start_ts+latency_dur <= $rightNs
    ${str}
    group by i.tier,i.ipid,i.path
    order by i.tier;
`, {$leftNs:leftNs,$rightNs:rightNs})
};

export const getTabPaneCounterSampleData = (leftNs: number, rightNs: number, cpuStateFilterIds: Array<number>): Promise<Array<any>> =>{
    let str = "";
    if (cpuStateFilterIds.length > 0) {
        str = ` and filter_id in (${cpuStateFilterIds.join(",")})`;
    }
    return query("getTabPaneCounterSampleData", `
    select value, filter_id as filterId, ts, f.cpu
    from measure left join cpu_measure_filter as f on f.id=filter_id
    where
    ts <= $rightNs${str} order by ts asc;
`, {$leftNs:leftNs,$rightNs:rightNs})
};

export const getTabPaneFrequencySampleData = (leftNs: number, rightNs: number, cpuFreqFilterIds: Array<number>): Promise<Array<any>> =>{
    let str = "";
    if (cpuFreqFilterIds.length > 0) {
        str = ` and filter_id in (${cpuFreqFilterIds.join(",")})`;
    }
    return query("getTabPaneFrequencySampleData", `
    select value, filter_id as filterId, ts, f.cpu
    from measure left join cpu_measure_filter as f on f.id=filter_id
    where
    ts <= $rightNs${str} order by ts asc;
`, {$leftNs:leftNs,$rightNs:rightNs})
};

export const hasFileSysData = () : Promise<Array<any>> =>
    query("hasFileSysData",`
    select 
        fsCount,
        vmCount,
         0 as ioCount from
        (select count(1) as fsCount from file_system_sample)
        ,(select count(1) as vmCount from virtual_memory_sample)
        --,(select count(1) as ioCount from io_latency_sample);
    `,{})

export const getFileSysChartDataByType = (type:number) : Promise<Array<any>> =>
    query("getFileSysChartData",`
    select
       (A.start_ts -B.start_ts) as startNS,
       (A.end_ts - B.start_ts) as endNS,
       dur
    from file_system_sample A,trace_range B
    where type = $type and startNS > 0;`,{$type:type},"exec-buf")

export const getFileSysVirtualMemoryChartData = () : Promise<Array<any>> =>
    query("getFileSysVirtualMemoryChartData",`
    select
       (A.start_ts -B.start_ts) as startNS,
       (A.end_ts - B.start_ts) as endNS,
       dur as dur
    from virtual_memory_sample A,trace_range B
    where startNS > 0
    order by A.start_ts;`,{},"exec-buf")

export const getDiskIOProcess = () : Promise<Array<any>> =>
    query("getDiskIOProcess",`
    select name,B.ipid,pid
    from (select distinct ipid from io_latency_sample) A
    left join process B on A.ipid = B.ipid;`,{})

export const getDiskIOLatencyChartDataByProcess = (all:boolean,ipid:number,typeArr:Array<number>) : Promise<Array<any>> =>
    query("getDiskIOLatencyChartDataByProcess",`
    select
       (A.start_ts -B.start_ts) as startNS,
       (A.start_ts - B.start_ts + A.latency_dur) as endNS,
       latency_dur as dur
    from io_latency_sample A,trace_range B
    where type in (${typeArr.join(",")}) and startNS > 0
        ${ all ? '' : 'and ipid = ' + ipid }
    order by A.start_ts;`,{},"exec-buf")

export const querySdkCount = (sql:string, componentId:number ): Promise<Array<any>> =>
    query("querySdkCount", sql,{},"exec-sdk-" + componentId)

export const querySdkCounterData = (sql:string, counter_id:number, componentId:number): Promise<Array<CounterStruct>> =>
    query("querySdkCounterData", sql,{$counter_id:counter_id}, "exec-sdk-" + componentId)

export const getTabSdkCounterData = (sqlStr: string, startTime: number, leftNs: number, rightNs: number, counters: Array<string>, componentId: number): Promise<Array<CounterSummary>> =>
    query<CounterSummary>("getTabSdkCounterData", sqlStr, {
        $startTime:startTime,
        $leftNs: leftNs,
        $rightNs: rightNs,
        $counters:counters
    },"exec-sdk-" + componentId)


export const getTabSdkCounterLeftData = (sqlStr: string, leftNs: number, counters: Array<string>, componentId: number): Promise<Array<any>> =>
    query<any>("getTabSdkCounterLeftData", sqlStr, {
        $leftNs: leftNs,
        $counters:counters
    },"exec-sdk-" + componentId)

export const getTabSdkSliceData = (sqlStr: string, startTime:number, leftNs: number, rightNs: number, slices: Array<string>,componentId: number): Promise<Array<SdkSliceSummary>> =>
    query<SdkSliceSummary>("getTabSdkSliceData", sqlStr, {
        $startTime:startTime,
        $leftNs: leftNs,
        $rightNs: rightNs,
        $slices: slices
    },"exec-sdk-" + componentId)

export const querySdkSliceData = (sqlStr:string, column_id: number, startNS: number, endNS: number, componentId:number): Promise<Array<SdkSliceStruct>> =>
    query("querySdkSliceData", sqlStr, {$column_id: column_id, $startNS: startNS, $endNS: endNS},"exec-sdk-" + componentId)

export const queryCounterMax = (sqlStr:string, counter_id:number, componentId:number): Promise<Array<any>> =>
    query("queryCounterMax", sqlStr,{$counter_id:counter_id}, "exec-sdk-" + componentId)

export const queryAnomalyData = (): Promise<Array<EnergyAnomalyStruct>> =>
    query("queryAnomalyData", `select 
      (S.ts - TR.start_ts) as startNS,
      D.data as eventName,
      D2.data as appKey, 
      (case when S.type==1 then group_concat(S.string_value,',') else group_concat(S.int_value,',') end) as Value
      from trace_range AS TR,hisys_event_measure as S 
      left join data_dict as D on D.id=S.name_id 
      left join app_name as APP on APP.id=S.key_id 
      left join data_dict as D2 on D2.id=APP.app_key
      where D.data in ('ANOMALY_SCREEN_OFF_ENERGY','ANOMALY_KERNEL_WAKELOCK','ANOMALY_CPU_HIGH_FREQUENCY','ANOMALY_WAKEUP')
     or (D.data in ('ANOMALY_RUNNINGLOCK','ANORMALY_APP_ENERGY','ANOMALY_GNSS_ENERGY','ANOMALY_CPU_ENERGY','ANOMALY_ALARM_WAKEUP') and D2.data in ("APPNAME")) 
      group by S.ts,D.data`)

export const querySystemData = (): Promise<Array<{
    startNs: string
    eventName: string
    type: string
    state: string
}>> =>
    query("querySystemData", `SELECT
        ( S.ts - TR.start_ts ) AS ts,
        D.data AS eventName,
        D2.data AS appKey,
        group_concat( ( CASE WHEN S.type == 1 THEN S.string_value ELSE S.int_value END ), ',' ) AS Value 
        FROM
        trace_range AS TR,
        hisys_event_measure AS S
        LEFT JOIN data_dict AS D ON D.id = S.name_id
        LEFT JOIN app_name AS APP ON APP.id = S.key_id
        LEFT JOIN data_dict AS D2 ON D2.id = APP.app_key 
        WHERE
        ( D.data = 'POWER_RUNNINGLOCK' AND D2.data = 'TAG' ) 
        OR ( D.data = 'GNSS_STATE' AND D2.data = 'STATE' ) 
        OR ( D.data IN ( 'WORK_REMOVE', 'WORK_STOP', 'WORK_ADD' ) AND D2.data = 'TYPE' ) 
        GROUP BY
        S.ts,
        APP.app_key,
        D.data,
        D2.data;`)

export const querySystemDetailsData = (leftNs: number, rightNs: number): Promise<Array<SystemDetailsEnergy>> =>
    query("querySystemDetailsData", `SELECT
        ( S.ts - TR.start_ts ) AS ts,
        D.data AS eventName,
        D2.data AS appKey,
        group_concat( ( CASE WHEN S.type == 1 THEN S.string_value ELSE S.int_value END ), ',' ) AS appValue 
        FROM
        trace_range AS TR,
        hisys_event_measure AS S
        LEFT JOIN data_dict AS D ON D.id = S.name_id
        LEFT JOIN app_name AS APP ON APP.id = S.key_id
        LEFT JOIN data_dict AS D2 ON D2.id = APP.app_key 
        WHERE
        D.data in ('POWER_RUNNINGLOCK', 'GNSS_STATE', 'WORK_REMOVE', 'WORK_STOP', 'WORK_ADD', 'WORK_START') 
        and 
        D2.data in ('UID', 'TYPE', 'WORKID', 'NAME', 'INTERVAL', 'TAG', 'STATE', 'STACK', 'APPNAME', 'MESSAGE', 'PID', 'LOG_LEVEL')
        and (S.ts - TR.start_ts) >= $leftNS
        and (S.ts - TR.start_ts) <= $rightNS
        GROUP BY
        S.ts,
        APP.app_key,
        D.data,
        D2.data;`, {$leftNS: leftNs, $rightNS: rightNs})

export const queryMaxPowerValue = (appName: string): Promise<Array<{
    maxValue: number
}>> =>
    query("queryMaxPowerValue", `SELECT
        max( item ) AS maxValue 
        FROM
        (
            SELECT 
            sum( energy + background_energy + screen_on_energy + screen_off_energy + foreground_energy ) AS item 
            FROM 
            energy 
            WHERE 
            app_name = $appName 
            GROUP BY 
            startNs);`, {$appName: appName})

export const queryPowerData = (): Promise<Array<{
    startNS: number,
    eventName: string,
    appKey: string,
    eventValue: string
}>> =>
    query("queryPowerData", `SELECT
        ( S.ts - TR.start_ts ) AS startNS,
        D.data AS eventName,
        D2.data AS appKey,
        group_concat( ( CASE WHEN S.type == 1 THEN S.string_value ELSE S.int_value END ), ',' ) AS eventValue 
        FROM
        trace_range AS TR,
        hisys_event_measure AS S
        LEFT JOIN data_dict AS D ON D.id = S.name_id
        LEFT JOIN app_name AS APP ON APP.id = S.key_id
        LEFT JOIN data_dict AS D2 ON D2.id = APP.app_key 
        where 
        D.data in ('POWER_IDE_CPU','POWER_IDE_LOCATION','POWER_IDE_GPU','POWER_IDE_DISPLAY','POWER_IDE_CAMERA','POWER_IDE_BLUETOOTH','POWER_IDE_FLASHLIGHT','POWER_IDE_AUDIO','POWER_IDE_WIFISCAN')
        and 
        D2.data in ('BACKGROUND_ENERGY','FOREGROUND_ENERGY','SCREEN_ON_ENERGY','SCREEN_OFF_ENERGY','ENERGY','APPNAME')
        GROUP BY
        S.ts,
        APP.app_key,
        D.data,
        D2.data 
        ORDER BY
        eventName;`,{})

export const getTabPowerDetailsData = (leftNs: number, rightNs: number): Promise<Array<{
    startNS: number,
    eventName: string,
    appKey: string,
    eventValue: string,
}>> =>
    query("getTabPowerDetailsData", `SELECT
        ( S.ts - TR.start_ts ) AS startNS,
        D.data AS eventName,
        D2.data AS appKey,
        group_concat( ( CASE WHEN S.type == 1 THEN S.string_value ELSE S.int_value END ), ',' ) AS eventValue 
        FROM
        trace_range AS TR,
        hisys_event_measure AS S
        LEFT JOIN data_dict AS D ON D.id = S.name_id
        LEFT JOIN app_name AS APP ON APP.id = S.key_id
        LEFT JOIN data_dict AS D2 ON D2.id = APP.app_key 
        where 
        D.data in ('POWER_IDE_CPU','POWER_IDE_LOCATION','POWER_IDE_GPU','POWER_IDE_DISPLAY','POWER_IDE_CAMERA','POWER_IDE_BLUETOOTH','POWER_IDE_FLASHLIGHT','POWER_IDE_AUDIO','POWER_IDE_WIFISCAN')
        and 
        D2.data in ('APPNAME')
        GROUP BY
        S.ts,
        APP.app_key,
        D.data,
        D2.data
        UNION
        SELECT
        ( S.ts - TR.start_ts ) AS startNS,
        D.data AS eventName,
        D2.data AS appKey,
        group_concat( ( CASE WHEN S.type == 1 THEN S.string_value ELSE S.int_value END ), ',' ) AS eventValue 
        FROM
        trace_range AS TR,
        hisys_event_measure AS S
        LEFT JOIN data_dict AS D ON D.id = S.name_id
        LEFT JOIN app_name AS APP ON APP.id = S.key_id
        LEFT JOIN data_dict AS D2 ON D2.id = APP.app_key 
        where 
        D.data in ('POWER_IDE_CPU','POWER_IDE_LOCATION','POWER_IDE_GPU','POWER_IDE_DISPLAY','POWER_IDE_CAMERA','POWER_IDE_BLUETOOTH','POWER_IDE_FLASHLIGHT','POWER_IDE_AUDIO','POWER_IDE_WIFISCAN')
        and 
        D2.data in ('CHARGE','BACKGROUND_TIME','SCREEN_ON_TIME','SCREEN_OFF_TIME','LOAD','USAGE','DURATION','CAMERA_ID', 
        'FOREGROUND_COUNT','BACKGROUND_COUNT','SCREEN_ON_COUNT','SCREEN_OFF_COUNT','COUNT','UID','FOREGROUND_DURATION',
        'FOREGROUND_ENERGY','BACKGROUND_DURATION','BACKGROUND_ENERGY','SCREEN_ON_DURATION','SCREEN_ON_ENERGY',
        'SCREEN_OFF_DURATION','SCREEN_OFF_ENERGY','ENERGY')
        and 
        (S.ts - TR.start_ts) >= $leftNS
        and (S.ts - TR.start_ts) <= $rightNS
        GROUP BY
        S.ts,
        APP.app_key,
        D.data,
        D2.data 
        ORDER BY
        eventName;`, {$leftNS: leftNs, $rightNS: rightNs})

export const getTabPowerBatteryData = (rightNs: number): Promise<Array<{
    ts: number,
    eventName: string,
    appKey: string
    eventValue: string
}>> =>
    query("getTabPowerBatteryData", `select
      MAX(S.ts) as ts,
      D.data as eventName,
      D2.data as appKey, 
      group_concat((case when S.type==1 then S.string_value else S.int_value end), ',') as eventValue 
      from 
      trace_range AS TR,
      hisys_event_measure as S 
      left join 
      data_dict as D 
      on 
      D.id=S.name_id 
      left join 
      app_name as APP 
      on 
      APP.id=S.key_id 
      left join 
      data_dict as D2 
      on 
      D2.id=APP.app_key
      where 
      D.data = 'POWER_IDE_BATTERY'
      and D2.data in ('GAS_GAUGE','CHARGE','SCREEN','LEVEL','CURRENT','CAPACITY')
      and (S.ts - TR.start_ts) >= 0
      and (S.ts - TR.start_ts) <= $rightNS 
      group by APP.app_key,D.data,D2.data;`, {$rightNS: rightNs})

export const queryMaxStateValue = (eventName: string): Promise<Array<{
    type: string
    maxValue: number
}>> =>
    query("queryMaxStateValue", `select 
  D.data as type,
  max(S.int_value) as maxValue 
  from trace_range AS TR,hisys_event_measure as S 
  left join data_dict as D on D.id=S.name_id 
  left join app_name as APP on APP.id=S.key_id 
  left join data_dict as D2 on D2.id=APP.app_key
  where (case when 'SENSOR_STATE'==$eventName then D.data like '%SENSOR%' else D.data = $eventName end)
  and D2.data in ('BRIGHTNESS','STATE','VALUE','LEVEL','VOLUME','OPER_TYPE','VOLUME')
  group by APP.app_key,D.data,D2.data;`, {$eventName: eventName})

export const queryStateData = (eventName: string): Promise<Array<EnergyStateStruct>> =>
    query("queryStateData", `select
  (S.ts-TR.start_ts) as startNs,
  D.data as type,
  D2.data as appKey, 
  S.int_value as value 
  from trace_range AS TR,hisys_event_measure as S 
  left join data_dict as D on D.id=S.name_id 
  left join app_name as APP on APP.id=S.key_id 
  left join data_dict as D2 on D2.id=APP.app_key
  where (case when 'SENSOR_STATE'==$eventName then D.data like '%SENSOR%' else D.data = $eventName end)
  and D2.data in ('BRIGHTNESS','STATE','VALUE','LEVEL','VOLUME','OPER_TYPE','VOLUME')
  group by S.ts,APP.app_key,D.data,D2.data;`, {$eventName: eventName})

export const querySyseventAppName = (): Promise<Array<{
    string_value: string | null
}>> =>
    query("querySyseventAppName", `
    SELECT
    DISTINCT hisys_event_measure.string_value from data_dict 
    left join app_name on app_name.app_key=data_dict.id 
    left join hisys_event_measure on hisys_event_measure.key_id = app_name.id
    where data_dict.data = "APPNAME"`)

export const queryAnomalyDetailedData = (leftNs: number, rightNs: number): Promise<Array<EnergyAnomalyStruct>> =>
    query<EnergyAnomalyStruct>("queryAnomalyDetailedData", `select
  S.ts,
  D.data as eventName,
  D2.data as appKey, 
  group_concat((case when S.type==1 then S.string_value else S.int_value end), ',') as Value 
  from trace_range AS TR,hisys_event_measure as S 
  left join data_dict as D on D.id=S.name_id 
  left join app_name as APP on APP.id=S.key_id 
  left join data_dict as D2 on D2.id=APP.app_key
  where D.data in ('ANOMALY_SCREEN_OFF_ENERGY','ANOMALY_ALARM_WAKEUP','ANOMALY_KERNEL_WAKELOCK',
  'ANOMALY_RUNNINGLOCK','ANORMALY_APP_ENERGY','ANOMALY_GNSS_ENERGY','ANOMALY_CPU_HIGH_FREQUENCY','ANOMALY_CPU_ENERGY','ANOMALY_WAKEUP')
  and D2.data in ('APPNAME')
  and (S.ts - TR.start_ts) >= $leftNS
   and (S.ts - TR.start_ts) <= $rightNS 
  group by S.ts,APP.app_key,D.data,D2.data
  union 
  select
  S.ts,
  D.data as eventName,
  D2.data as appKey, 
  group_concat((case when S.type==1 then S.string_value else S.int_value end), ',') as Value 
  from trace_range AS TR,hisys_event_measure as S 
  left join data_dict as D on D.id=S.name_id 
  left join app_name as APP on APP.id=S.key_id 
  left join data_dict as D2 on D2.id=APP.app_key
  where D.data in ('ANOMALY_SCREEN_OFF_ENERGY','ANOMALY_ALARM_WAKEUP','ANOMALY_KERNEL_WAKELOCK',
  'ANOMALY_RUNNINGLOCK','ANORMALY_APP_ENERGY','ANOMALY_GNSS_ENERGY','ANOMALY_CPU_HIGH_FREQUENCY','ANOMALY_CPU_ENERGY','ANOMALY_WAKEUP')
  and D2.data not in ('pid_','tid_','type_','tz_','uid_','domain_', 'id_', 'level_', 'info_', 'tag_', 'APPNAME')
  and (S.ts - TR.start_ts) >= $leftNS
   and (S.ts - TR.start_ts) <= $rightNS 
  group by S.ts,APP.app_key,D.data,D2.data;`, {$leftNS: leftNs, $rightNS: rightNs})

export const querySmapsExits = (): Promise<Array<any>> =>
    query("querySmapsExits", `select 
      event_name 
      from stat s 
      where s.event_name = 'trace_smaps' 
      and s.stat_type ='received' and s.count > 0`)

export const querySmapsData = (columnName: string): Promise<Array<any>> =>
    query("querySmapsCounterData",
        `SELECT (A.timestamp - B.start_ts) as startNS, sum(${columnName}) as value FROM smaps A,trace_range B GROUP by A.timestamp;`)

export const querySmapsDataMax = (columnName: string): Promise<Array<any>> =>
    query("querySmapsDataMax", `
   SELECT (A.timestamp - B.start_ts) as startNS,sum(${columnName}) as max_value FROM smaps A,trace_range B GROUP by A.timestamp order by max_value desc LIMIT 1`)

export const getTabSmapsMaxRss = (leftNs: number, rightNs: number): Promise<Array<any>> =>
    query<Smaps>("getTabSmapsMaxRss", `
SELECT (A.timestamp - B.start_ts) as startNS, sum(resident_size) as max_value FROM smaps A,trace_range B where startNS <= $rightNs`, {$rightNs:rightNs})

export const getTabSmapsData = (leftNs: number, rightNs: number): Promise<Array<Smaps>> =>
    query<Smaps>("getTabSmapsData", `
    SELECT 
     (A.timestamp - t.start_ts) AS tsNS,
     start_addr,
     end_addr,
     dirty,
     swapper,
     resident_size AS rss, 
     pss,virtaul_size AS size,reside,f.data AS permission,d.data AS path 
     FROM smaps A 
     LEFT JOIN data_dict d ON a.path_id = d.id LEFT 
     JOIN data_dict f ON a.protection_id = f.id, 
     trace_range AS t 
     WHERE tsNS <= $rightNs`, {$rightNs : rightNs},"exec")

export const getTabVirtualMemoryType = (startTime: number, endTime: number): Promise<Array<string>> =>
    query("getTabVirtualMemoryType", `
    SELECT type from virtual_memory_sample s,trace_range t
     WHERE s.end_ts between $startTime + t.start_ts and $endTime + t.start_ts group by type`, {$startTime : startTime,$endTime:endTime},"exec")

export const getCpuLimitFreqId = (): Promise<Array<CpuFreqRowLimit>> =>
    query("getCpuMaxMinFreqId", `
    select cpu,MAX(iif(name = 'cpu_frequency_limits_max',id,0)) as maxFilterId,MAX(iif(name = 'cpu_frequency_limits_min',id,0)) as minFilterId from cpu_measure_filter where name in ('cpu_frequency_limits_max','cpu_frequency_limits_min') group by cpu
`, {})

export const getCpuLimitFreqMax = (filterIds:string): Promise<Array<any>> =>{
    return query("getCpuLimitFreqMax", `
    select max(value) as maxValue,filter_id as filterId from measure where filter_id in (${filterIds}) group by filter_id
`, {})
}

export const getCpuLimitFreq = (maxId: number, minId: number,cpu:number): Promise<Array<CpuFreqLimitsStruct>> =>
    query("getCpuLimitFreq", `
    select ts - T.start_ts as startNs,max(value) as max,min(value) as min,$cpu as cpu from measure,trace_range T where filter_id in ($maxId,$minId) group by ts
`, {$maxId : maxId,$minId : minId,$cpu : cpu})

export const queryHisystemEventExits = (): Promise<Array<any>> =>
    query("queryHisystemEventExits", `select 
      event_name 
      from stat s 
      where s.event_name = 'trace_hisys_event' 
      and s.stat_type ='received' and s.count > 0`)

