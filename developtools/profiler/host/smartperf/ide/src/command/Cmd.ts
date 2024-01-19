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
export class Cmd {
    /**
     * exec objdump to disassembling binary and find addr to show 100 line
     * @param command obj dump command
     * @param addr addr of select line
     * @param callback result callback
     */
    static execObjDump(command: string, addr: string, callback: Function) {
        const data = {cmd: command, addr: addr};
        let uri = `http://${window.location.host.split(':')[0]}:${window.location.port}/exec`;
        fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => {
            if (response.ok) {
                let result = response.text();
                result.then(output => {
                    callback(output);
                });
            }
        });
    }

    static execHdcCmd(command: string, callback: Function) {
        const data = {
            cmd: command,
            tag: "shell"
        };
        let uri = `http://${window.location.host.split(':')[0]}:${window.location.port}/hdcCmd`;
        fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => {
            if (response.ok) {
                let result = response.text();
                result.then(output => {
                    callback(output);
                });
            }
        });
    }

    static async execFileRecv(command: string, filePath: string, callback: Function) {
        let fileName = filePath.substring(filePath.lastIndexOf("/") + 1)
        const data = {
            cmd: command,
            tag: "file",
            fileName: fileName
        };
        let uri = `http://${window.location.host.split(':')[0]}:${window.location.port}/hdcCmd`;
        let buf = await fetch(uri, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => res.arrayBuffer());
        callback(buf);
    }

    static execHdcTraceCmd(command: string, serialNumber: string, callback: Function) {
        const data = {
            cmd: command,
            tag: "hiprofiler_cmd",
            serialNumber: serialNumber
        };
        let uri = `http://${window.location.host.split(':')[0]}:${window.location.port}/hdcCmd`;
        fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => {
            if (response.ok) {
                let result = response.text();
                result.then(output => {
                    callback(output);
                });
            }
        });
    }

    static formatString(string: string, params: string[]) {
        if (params.length == 0) {
            return string;
        }
        for (let i = 0; i < params.length; i++) {
            string = string.replace(new RegExp('\\{' + i + '\\}', 'g'), params[i]);
        }
        return string;
    }

    static showSaveFile(callback: Function) {
        let uri = `http://${window.location.host.split(':')[0]}:${window.location.port}/showSaveDialog`;
        fetch(uri, {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                let result = response.text();
                result.then(output => {
                    callback(output);
                });
            }
        });
    }

    static uploadFile(fd: FormData, callback: Function) {
        let uri = `http://${window.location.host.split(':')[0]}:${window.location.port}/upload`;
        fetch(uri, {
            method: 'POST',
            body: fd,
        }).then(response => {
            callback(response);
        });
    }

    static copyFile(fileName: string, distFile: string, callback: Function) {
        const data = {
            filename: fileName,
            distfile: distFile,
        };
        let uri = `http://${window.location.host.split(':')[0]}:${window.location.port}/copyfile`;
        fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => {
            callback(response);
        });
    }

    static async openFileDialog() {
        let uri = `http://${window.location.host.split(':')[0]}:${window.location.port}/showOpenDialog`;
        let res = await fetch(uri, {method: 'POST'})
        let result = res.ok ? await res.text() : "";
        return result;
    }
}