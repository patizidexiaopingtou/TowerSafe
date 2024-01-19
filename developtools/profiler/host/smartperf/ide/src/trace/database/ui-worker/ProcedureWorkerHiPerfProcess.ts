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

import { ColorUtils } from "../../component/trace/base/ColorUtils.js";
import {
    BaseStruct,
    drawFlagLine,
    drawLines,
    drawLoading,
    drawSelection, PerfRender,
    RequestMessage
} from "./ProcedureWorkerCommon.js";
import {HiPerfCpuStruct} from "./ProcedureWorkerHiPerfCPU.js";

export class HiperfProcessRender  extends PerfRender{
    render(req: RequestMessage, list: Array<any>, filter: Array<any>, dataList2: Array<any>) {
        let groupBy10MS = req.scale > 100_000_000;
        if (req.lazyRefresh) {
            hiPerfProcess(list, filter, req.startNS, req.endNS, req.totalNS, req.frame, groupBy10MS, req.intervalPerf, req.useCache || !req.range.refresh);
        } else {
            if (!req.useCache) {
                hiPerfProcess(list, filter, req.startNS, req.endNS, req.totalNS, req.frame, groupBy10MS, req.intervalPerf, false);
            }
        }
        if (req.canvas) {
            req.context.clearRect(0, 0, req.frame.width, req.frame.height);
            let arr = filter;
            if (arr.length > 0 && !req.range.refresh && !req.useCache && req.lazyRefresh) {
                drawLoading(req.context, req.startNS, req.endNS, req.totalNS, req.frame, arr[0].startNS, arr[arr.length - 1].startNS + arr[arr.length - 1].dur)
            }
            drawLines(req.context, req.xs, req.frame.height, req.lineColor)
            req.context.stroke();
            req.context.beginPath();
            HiPerfProcessStruct.hoverStruct = undefined;
            req.context.fillStyle = ColorUtils.FUNC_COLOR[0];
            req.context.strokeStyle = ColorUtils.FUNC_COLOR[0];
            if (req.isHover) {
                let offset = groupBy10MS ? 0 : 3;
                for (let re of filter) {
                    if (re.frame && req.hoverX >= re.frame.x - offset && req.hoverX <= re.frame.x + re.frame.width + offset) {//&& req.hoverY >= re.frame.y && req.hoverY <= re.frame.y + re.frame.height
                        HiPerfProcessStruct.hoverStruct = re;
                        break;
                    }
                }
            } else {
                HiPerfProcessStruct.hoverStruct = req.params.hoverStruct;
            }
            HiPerfProcessStruct.selectStruct = req.params.selectStruct;
            let path = new Path2D();
            for (let re of filter) {
                HiPerfProcessStruct.draw(req.context, path, re, groupBy10MS);
            }
            groupBy10MS ? req.context.fill(path) : req.context.stroke(path);
            req.context.closePath();
            drawSelection(req.context, req.params);
            drawFlagLine(req.context, req.flagMoveInfo, req.flagSelectedInfo, req.startNS, req.endNS, req.totalNS, req.frame, req.slicesTime);
        }
        // @ts-ignore
        self.postMessage({
            id: req.id,
            type: req.type,
            results: req.canvas ? undefined : filter,
            hover: HiPerfProcessStruct.hoverStruct
        });
    }
}

export function hiPerfProcess(arr: Array<any>, res: Array<any>, startNS: number, endNS: number, totalNS: number, frame: any, groupBy10MS: boolean, intervalPerf: number, use: boolean) {
    if (use && res.length > 0) {
        let pns = (endNS - startNS) / frame.width;
        let y = frame.y;
        for (let i = 0; i < res.length; i++) {
            let it = res[i];
            if ((it.startNS || 0) + (it.dur || 0) > startNS && (it.startNS || 0) < endNS) {
                if (!it.frame) {
                    it.frame = {};
                    it.frame.y = y;
                }
                it.frame.height = it.height;
                HiPerfProcessStruct.setFrame(it, pns, startNS, endNS, frame);
            } else {
                it.frame = null;
            }
        }
        return;
    }
    res.length = 0;
    if (arr) {
        let list = groupBy10MS ? HiPerfProcessStruct.groupBy10MS(arr, intervalPerf) : arr;
        let pns = (endNS - startNS) / frame.width;
        let y = frame.y;
        for (let i = 0, len = list.length; i < len; i++) {
            let it = list[i];
            if ((it.startNS || 0) + (it.dur || 0) > startNS && (it.startNS || 0) < endNS) {
                if (!list[i].frame) {
                    list[i].frame = {};
                    list[i].frame.y = y;
                }
                list[i].frame.height = it.height;
                HiPerfProcessStruct.setFrame(list[i], pns, startNS, endNS, frame)
                if (groupBy10MS) {
                    if (i > 0 && ((list[i - 1].frame?.x || 0) == (list[i].frame?.x || 0)
                        && ((list[i - 1].frame?.width || 0) == (list[i].frame?.width || 0))
                        && ((list[i - 1].frame?.height || 0) == (list[i].frame?.height || 0))
                    )) {
                    } else {
                        res.push(list[i])
                    }
                } else {
                    if (i > 0 && (Math.abs((list[i - 1].frame?.x || 0) - (list[i].frame?.x || 0)) < 4)) {
                    } else {
                        res.push(list[i])
                    }
                }

            }
        }
    }
}

export class HiPerfProcessStruct extends BaseStruct {
    static hoverStruct: HiPerfProcessStruct | undefined;
    static selectStruct: HiPerfProcessStruct | undefined;
    id: number | undefined;
    callchain_id: number | undefined;
    timestamp: number | undefined;
    thread_id: number | undefined;
    event_count: number | undefined;
    event_type_id: number | undefined;
    cpu_id: number | undefined;
    thread_state: string | undefined;
    //------------------------------------------------------
    startNS: number | undefined;
    endNS: number | undefined;
    dur: number | undefined;
    height: number | undefined;
    cpu: number | undefined;
    group: number | undefined;

    static draw(ctx: CanvasRenderingContext2D, path: Path2D, data: HiPerfProcessStruct, groupBy10MS: boolean) {
        if (data.frame) {
            if (groupBy10MS) {
                let width = data.frame.width;
                path.rect(data.frame.x, 40 - (data.height || 0), width, data.height || 0)
            } else {
                path.moveTo(data.frame.x + 7, 20);
                HiPerfCpuStruct.drawRoundRectPath(path, data.frame.x - 7, 20 - 7, 14, 14, 3)
                path.moveTo(data.frame.x, 27);
                path.lineTo(data.frame.x, 33);
            }
        }
    }

    static setFrame(node: any, pns: number, startNS: number, endNS: number, frame: any) {
        if ((node.startNS || 0) < startNS) {
            node.frame.x = 0;
        } else {
            node.frame.x = Math.floor(((node.startNS || 0) - startNS) / pns);
        }
        if ((node.startNS || 0) + (node.dur || 0) > endNS) {
            node.frame.width = frame.width - node.frame.x;
        } else {
            node.frame.width = Math.ceil(((node.startNS || 0) + (node.dur || 0) - startNS) / pns - node.frame.x);
        }
        if (node.frame.width < 1) {
            node.frame.width = 1;
        }
    }

    static groupBy10MS(array: Array<any>, intervalPerf: number): Array<any> {
        let obj = array.map(it => {
            it.timestamp_group = Math.trunc(it.startNS / 1_000_000_0) * 1_000_000_0;
            return it;
        }).reduce((pre, current) => {
            (pre[current["timestamp_group"]] = pre[current["timestamp_group"]] || []).push(current);
            return pre;
        }, {});
        let arr: any[] = [];
        for (let aKey in obj) {
            let ns = parseInt(aKey);
            let height: number = 0;
            height = Math.floor(obj[aKey].length / (10 / intervalPerf) * 40);
            arr.push({
                startNS: ns,
                height: height,
                dur: 1_000_000_0,
            })
        }
        return arr;
    }
}
