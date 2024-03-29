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

import {BaseStruct} from "./BaseStruct.js";
import {Rect} from "../component/trace/timer-shaft/Rect.js";

const padding = 1;

export class ThreadStruct extends BaseStruct {
    static runningColor: string = "#467b3b";
    static rColor = "#a0b84d";
    static uninterruptibleSleepColor = "#f19d38";
    static sColor = "#FBFBFB";
    static hoverThreadStruct: ThreadStruct | undefined;
    static selectThreadStruct: ThreadStruct | undefined;
    static statusMap: any = {
        "D": "Uninterruptible Sleep",
        "S": "Sleeping",
        "R": "Runnable",
        "Running": "Running",
        "R+": "Runnable (Preempted)",
        "DK": "Uninterruptible Sleep + Wake Kill",
        "I": "Task Dead",
        "T": "Stopped",
        "t": "Traced",
        "X": "Exit (Dead)",
        "Z": "Exit (Zombie)",
        "K": "Wake Kill",
        "W": "Waking",
        "P": "Parked",
        "N": "No Load"
    }
    hasSched: number | undefined;
    pid: number | undefined;
    processName: string | undefined;
    threadName: string | undefined;
    tid: number | undefined;
    upid: number | undefined;
    utid: number | undefined;
    cpu: number | undefined;
    dur: number | undefined;
    end_ts: number | undefined;
    id: number | undefined;
    is_main_thread: number | undefined;
    name: string | undefined;
    startTime: number | undefined;
    start_ts: number | undefined;
    state: string | undefined;
    type: string | undefined;

    static draw(ctx: CanvasRenderingContext2D, data: ThreadStruct) {
        if (data.frame) {
            ctx.globalAlpha = 1
            let stateText = data.state || '';
            if ("S" == data.state) {
                ctx.fillStyle = ThreadStruct.sColor;
                ctx.globalAlpha = 0.2; // transparency
                ctx.fillRect(data.frame.x, data.frame.y + padding, data.frame.width, data.frame.height - padding * 2)
                ctx.globalAlpha = 1; // transparency
            } else if ("R" == data.state) {
                ctx.fillStyle = ThreadStruct.rColor;
                ctx.fillRect(data.frame.x, data.frame.y + padding, data.frame.width, data.frame.height - padding * 2)
                ctx.fillStyle = "#fff";
                ThreadStruct.drawString(ctx, ThreadStruct.getEndState(data.state || ''), 2, data.frame);
            } else if ("D" == data.state) {
                ctx.fillStyle = ThreadStruct.uninterruptibleSleepColor;
                ctx.fillRect(data.frame.x, data.frame.y + padding, data.frame.width, data.frame.height - padding * 2)
                ctx.fillStyle = "#fff";
                ThreadStruct.drawString(ctx, ThreadStruct.getEndState(data.state || ''), 2, data.frame);
            } else if ("Running" == data.state) {
                ctx.fillStyle = ThreadStruct.runningColor;
                ctx.fillRect(data.frame.x, data.frame.y + padding, data.frame.width, data.frame.height - padding * 2)
                ctx.fillStyle = "#fff";
                ThreadStruct.drawString(ctx, ThreadStruct.getEndState(data.state || ''), 2, data.frame);
            } else {
                ctx.fillStyle = ThreadStruct.rColor;
                ctx.fillRect(data.frame.x, data.frame.y + padding, data.frame.width, data.frame.height - padding * 2)
                ctx.fillStyle = "#fff";
                ThreadStruct.drawString(ctx, ThreadStruct.getEndState(data.state || ''), 2, data.frame);
            }
            if (ThreadStruct.selectThreadStruct && ThreadStruct.equals(ThreadStruct.selectThreadStruct, data) && ThreadStruct.selectThreadStruct.state != "S") {
                ctx.strokeStyle = '#232c5d'
                ctx.lineWidth = 2
                ctx.strokeRect(data.frame.x, data.frame.y + padding, data.frame.width - 2, data.frame.height - padding * 2)
            }
        }
    }

    static drawString(ctx: CanvasRenderingContext2D, str: string, textPadding: number, frame: Rect) {
        let textMetrics = ctx.measureText(str);
        let charWidth = Math.round(textMetrics.width / str.length)
        if (textMetrics.width < frame.width - textPadding * 2) {
            let x2 = Math.floor(frame.width / 2 - textMetrics.width / 2 + frame.x + textPadding)
            ctx.textBaseline = "middle"
            ctx.fillText(str, x2, Math.floor(frame.y + frame.height / 2), frame.width - textPadding * 2)
            return;
        }
        if (frame.width - textPadding * 2 > charWidth * 4) {
            let chatNum = (frame.width - textPadding * 2) / charWidth;
            let x1 = frame.x + textPadding
            ctx.textBaseline = "middle"
            ctx.fillText(str.substring(0, chatNum - 4) + '...', x1, Math.floor(frame.y + frame.height / 2), frame.width - textPadding * 2)
            return;
        }
    }

    static getEndState(state: string): string {
        let statusMapElement = ThreadStruct.statusMap[state];
        if (statusMapElement) {
            return statusMapElement
        } else {
            if ("" == statusMapElement || statusMapElement == null) {
                return "";
            }
            return "Unknown State";
        }
    }

    static equals(d1: ThreadStruct, d2: ThreadStruct): boolean {
        if (d1 && d2 && d1.cpu == d2.cpu &&
            d1.tid == d2.tid &&
            d1.state == d2.state &&
            d1.startTime == d2.startTime &&
            d1.dur == d2.dur) {
            return true;
        } else {
            return false;
        }
    }
}
