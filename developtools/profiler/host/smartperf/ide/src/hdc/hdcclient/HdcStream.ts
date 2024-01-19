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

import {DataMessage} from "../message/DataMessage.js";
import {HdcClient} from "./HdcClient.js";
import {FormatCommand} from "./FormatCommand.js";
import {HdcCommand} from "./HdcCommand.js";
import {Utils} from "../common/Utils.js";
import {AsyncQueue} from "./AsyncQueue.js";
import {toHex16} from "../common/BaseConversion.js";
import {PayloadHead} from "../message/PayloadHead.js";
import {Serialize} from "../common/Serialize.js";

export class HdcStream {
    private dataMessages: AsyncQueue<DataMessage> = new AsyncQueue<DataMessage>();
    private readonly channelId: number
    private interactiveShellMode: boolean = false;
    private hdcClient: HdcClient;
    public fileSize: number = -1;

    constructor(hdcClient: HdcClient, isStopCmd:boolean) {
        this.hdcClient = hdcClient;
        this.channelId = Utils.getLocalId();
        if (isStopCmd) {
            this.hdcClient.bindStopStream(this.channelId, this);
        } else {
            this.hdcClient.bindStream(this.channelId, this);
        }
    }

    public async DoCommand(cmd: string): Promise<boolean> {
        let formatCommand;
        if (this.interactiveShellMode) {
            formatCommand = new FormatCommand(HdcCommand.CMD_SHELL_DATA, cmd, false);
        } else {
            formatCommand = Utils.formatCommand(cmd);
        }
        return this.DoCommandRemote(formatCommand);
    }

    public async DoCommandRemote(command: FormatCommand): Promise<boolean> {
        switch (command.cmdFlag) {
            case HdcCommand.CMD_SHELL_INIT:
            case HdcCommand.CMD_SHELL_DATA:
            case HdcCommand.CMD_UNITY_EXECUTE:
            case HdcCommand.CMD_UNITY_TERMINATE:
            case HdcCommand.CMD_UNITY_REMOUNT:
            case HdcCommand.CMD_UNITY_REBOOT:
            case HdcCommand.CMD_UNITY_RUNMODE:
            case HdcCommand.CMD_UNITY_HILOG: {
                let textEncoder = new TextEncoder();
                let data = textEncoder.encode(command.parameters);
                let sendResult = await this.sendToDaemon(command, data, data.length);
                if (sendResult) {
                    if (HdcCommand.CMD_SHELL_INIT == command.cmdFlag) {
                        this.interactiveShellMode = true;
                    }
                }
                break;
            }
            case HdcCommand.CMD_FILE_INIT: {
                await this.FileRecvCommand(command);
                break;
            }
            case HdcCommand.CMD_FILE_FINISH:
            case HdcCommand.CMD_KERNEL_CHANNEL_CLOSE: {
                let dataView = new DataView(new ArrayBuffer(1));
                if (command.parameters == "0") {
                    dataView.setUint8(0, 0);
                } else {
                    dataView.setUint8(0, 1);
                }
                await this.sendToDaemon(command, new Uint8Array(dataView.buffer), 1);
                break;
            }
        }
        return false;
    }

    async FileRecvCommand(command: FormatCommand) {
        let sizeSend = command.parameters.length;
        let cmdFlag: string = '';
        let sizeCmdFlag: number = 0;
        if (HdcCommand.CMD_FILE_INIT == command.cmdFlag) {
            cmdFlag = "send ";
            sizeCmdFlag = 5;  // 5: cmdFlag send size
        }
        if (!(command.parameters.length > cmdFlag.length)) {
        } else {
            let textEncoder = new TextEncoder();
            let data = textEncoder.encode(command.parameters);
            let aa = data.slice(5);
            await this.sendToDaemon(command, aa, aa.length);
            let dataMessage = await this.getMessage();
            let playHeadArray = dataMessage.body!.buffer.slice(0, PayloadHead.getPayloadHeadLength())
            let resultPayloadHead: PayloadHead = PayloadHead.parsePlayHead(new DataView(playHeadArray));
            let headSize = resultPayloadHead.headSize;
            let dataSize = resultPayloadHead.dataSize;
            let resPlayProtectBuffer = dataMessage.body!.buffer.slice(11, 11 + headSize);
            let payloadProtect = Serialize.parsePayloadProtect(resPlayProtectBuffer);
            await this.handleCommandFileCheck()
        }
    }

    private async handleCommandFileCheck() {
        let dataMessage = await this.getMessage();
        let playHeadArray = dataMessage.body!.buffer.slice(0, PayloadHead.getPayloadHeadLength())
        let resultPayloadHead: PayloadHead = PayloadHead.parsePlayHead(new DataView(playHeadArray));
        let headSize = resultPayloadHead.headSize;
        let dataSize = resultPayloadHead.dataSize;
        let resPlayProtectBuffer = dataMessage.body!.buffer.slice(PayloadHead.getPayloadHeadLength(), PayloadHead.getPayloadHeadLength() + headSize);
        let payloadProtect = Serialize.parsePayloadProtect(resPlayProtectBuffer);
        if (payloadProtect.commandFlag == HdcCommand.CMD_FILE_CHECK) {
            if (dataSize > 0) {
                let transferConfigBuffer = dataMessage.body!.buffer.slice(PayloadHead.getPayloadHeadLength() + headSize, PayloadHead.getPayloadHeadLength() + headSize + dataSize);
                let transferConfig = Serialize.parseTransferConfig(transferConfigBuffer);
                this.fileSize = transferConfig.fileSize;
            }
            let fileBegin = new FormatCommand(HdcCommand.CMD_FILE_BEGIN, "", false);
            await this.sendToDaemon(fileBegin, new Uint8Array(0), 0);
        }
    }

    async sendToDaemon(command: FormatCommand, payload: Uint8Array, dataLength: number): Promise<boolean> {
        return await this.hdcClient.readDataProcessing.send(this.hdcClient.sessionId, this.channelId, command.cmdFlag, payload, dataLength);
    }

    putMessageInQueue(dataMessage: DataMessage) {
        this.dataMessages.enqueue(dataMessage);
    }

    getMessage(): Promise<DataMessage> {
        return this.dataMessages.dequeue();
    }

    closeStream() {
        this.hdcClient.unbindStream(this.channelId);
    }

    closeStopStream() {
        this.hdcClient.unbindStopStream(this.channelId);
    }
}



