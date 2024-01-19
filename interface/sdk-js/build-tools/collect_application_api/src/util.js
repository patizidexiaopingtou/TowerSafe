
/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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

const path = require('path');
const fs = require('fs');
const ts = require('typescript');
const { isExportSpecifier } = require('typescript');

function readFile(dir, utFiles) {
    try {
        const files = fs.readdirSync(dir);
        files.forEach((element) => {
            const filePath = path.join(dir, element);
            const status = fs.statSync(filePath);
            if (status.isDirectory()) {
                readFile(filePath, utFiles);
            } else {
                utFiles.push(filePath);
            }
        })
    } catch (e) {
        console.log('ETS ERROR: ' + e);
    }
}
exports.readFile=readFile;