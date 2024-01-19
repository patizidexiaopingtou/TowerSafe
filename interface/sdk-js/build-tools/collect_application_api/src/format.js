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

const { readFile, excel, parse, getExcelBuffer, applicationModules, } = require('./collectApi');
const path = require('path');
const ts = require('typescript')
const { importFiles, applicationApis, finalClassName } = require('./collect_import_name');
function getApiData(fileData) {
    const SDK_API_FILES = [];
    getAllApiFiles(SDK_API_FILES);
    const APP_API_FILES = [];
    fileData.forEach((value, key) => {
        for (let i = 0; i < SDK_API_FILES.length; i++) {
            const filePath = SDK_API_FILES[i];
            if (path.basename(filePath).replace(/\.d\.ts/, '') === key) {
                APP_API_FILES.push(filePath);
                break;
            }
        }
    });
    const apis = parse(APP_API_FILES);
    const newApis = filterData(apis, fileData);
    const finalApis = [];
    for (let i = 0; i < applicationApis.length; i++) {
        for (let j = 0; j < newApis.length; j++) {
            if (!applicationApis[i].value) {
                if (applicationApis[i].moduleName.match(new RegExp(newApis[j].className, 'i')) &&
                    applicationApis[i].apiName == newApis[j].methodName) {
                    finalApis.push(newApis[j]);
                } else if (applicationApis[i].apiName == newApis[j].className) {
                    finalApis.push(newApis[j]);
                } else if (applicationApis[i].apiName == newApis[j].methodName) {
                    finalApis.push(newApis[j]);
                }
            } else {
                if (applicationApis[i].apiName == newApis[j].className &&
                    applicationApis[i].value == newApis[j].methodName) {
                    finalApis.push(newApis[j]);
                }
            }
        }
    }
    for (let i = 0; i < applicationModules.length; i++) {
        for (let j = 0; j < newApis.length; j++) {
            if (applicationModules[i].packageName == newApis[j].packageName &&
                applicationModules[i].methodName == newApis[j].className) {
                newApis[j].namespace = applicationModules[i].className;
            }
        }
    }
    let noRepeatApis = [...new Set(finalApis)];
    count(finalApis, noRepeatApis);
    excel(noRepeatApis);
}

function getAllApiFiles(files) {
    readFile(path.resolve(__dirname, '../sdk'), files);
}

function filterData(apis, rulers) {
    const appApis = [];
    rulers.forEach((value, key) => {
        const modules = rulers.get(key);
        modules.forEach(module => {
            apis.forEach(api => {
                if (key.replace(/^\@/, '') === api.packageName && module.match(new RegExp(api.className, 'i'))) {
                    appApis.push(api);
                } else if (key.replace(/^\@/, '') === api.packageName) {
                    appApis.push(api);
                }
            });
        });
    });
    return appApis;
}

function count(finalApis, noRepeatApis) {
    let newArr = new Array(noRepeatApis.length);
    for (let j = 0; j < noRepeatApis.length; j++) {
        let number = 0;
        for (let k = 0; k < finalApis.length; k++) {
            if (noRepeatApis[j] == finalApis[k]) {
                number++
            }
        }
        noRepeatApis[j].count = number;
    }
}

try {
    getApiData(importFiles);
} catch (error) {
    console.error("FORMAT API ERROR: ", error);
}