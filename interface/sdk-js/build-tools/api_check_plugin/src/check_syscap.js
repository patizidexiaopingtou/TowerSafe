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
const ts = require(path.resolve(__dirname, "../node_modules/typescript"));
const fs = require("fs");
const result = require("../check_result.json");
const rules = require("../code_style_rule.json");
const { getAPINote, error_type } = require('./utils');
const { addAPICheckErrorLogs } = require('./compile_info');


function checkSyscap(node, sourcefile, fileName) {
    // check invalid import
    const program = ts.createProgram({ rootNames: fileName, option: {} });
    const diagnostic = program.getSuggestionDiagnostics(sourcefile);
    const invalidImport = '';
    if (invalidImport !== "") {
        invalidImport += `,${diagnostic}`;
    } else {
        invalidImport += diagnostic;
    }
    addAPICheckErrorLogs(node, sourcefile, fileName, error_type.INVALID_IMPORT, invalidImport);
    // check syscap
    const syscapTags = rules.syscap.SystemCapability;
    const syscapRuleSet = new Set();
    for (const i in syscapTags) {
        syscapTags[i].forEach(syscap => {
            const syscapTag = 'SystemCapability.' + i + '.' + syscap;
            syscapRuleSet.add(syscapTag);
        });
    }
    const apiNote = getAPINote(node);
    const apiNoteArr = apiNote.split('*');
    let errorInfo = "";
    apiNoteArr.forEach(note => {
        if (note.match(new RegExp('@syscap'))) {
            const syscapNote = note.replace('@syscap', '').trim();
            if (!syscapRuleSet.has(syscapNote)) {
                if (errorInfo !== "") {
                    errorInfo += `,${syscapNote}`;
                } else {
                    errorInfo += syscapNote;
                }
                addAPICheckErrorLogs(node, sourcefile, fileName, error_type.UNKNOW_SYSCAP, errorInfo);
            }
        }
    });
}
exports.checkSyscap = checkSyscap;