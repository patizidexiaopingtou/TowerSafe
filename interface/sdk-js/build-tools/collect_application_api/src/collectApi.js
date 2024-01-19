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
const ExcelJS = require('exceljs');
const applicationModules = [];

const typeCollection = false;
const isNotMerge = false;

function parse(files) {
    const fileContentList = [];
    files.forEach(file => {
        let fileContent = fs.readFileSync(file, 'utf-8');
        fileContentList.push({
            fileName: path.basename(file).replace(/.d.ts$/g, '.ts'),
            fileContent: fileContent,
            fileRoot: file.replace(dir, "")
        })
    });
    const api = [];
    const exportApi = [];
    const returnDeclarationArr = new Set([]);
    const hash = new Set([]);
    fileContentList.forEach(item => {
        const fileName = item.fileName.replace(/\.d.ts$/g, '.ts');
        let packageName = item.fileRoot.indexOf("component\\ets\\") >= 0 ||
            item.fileRoot.indexOf("component/ets/") >= 0 ? "ArkUI" : fileName.replace(/\@|.ts$/g, "").replace(/D:\\/g, "");
        ts.transpileModule(item.fileContent, {
            compilerOptions: {
                "target": ts.ScriptTarget.ES2017
            },
            fileName: fileName,
            transformers: { before: [getReturnDeclarationArr(packageName, exportApi, returnDeclarationArr, fileName)] }
        })
    });
    fileContentList.forEach(item => {
        const fileName = item.fileName.replace(/\.d.ts$/g, '.ts');
        let packageName = item.fileRoot.indexOf("component\\ets\\") >= 0 ||
            item.fileRoot.indexOf("component/ets/") >= 0 ? "ArkUI" : fileName.replace(/\@|.ts$/g, "").replace(/D:\\/g, "");
        ts.transpileModule(item.fileContent, {
            compilerOptions: {
                "target": ts.ScriptTarget.ES2017
            },
            fileName: fileName,
            transformers: { before: [processDeclarationSourceFile(packageName, api, exportApi, returnDeclarationArr, hash)] }
        })
    });
    return api;
}
exports.parse = parse;


function visitAllNode(node, returnDeclarationArr, packageName) {
    if ((ts.isMethodDeclaration(node) || ts.isFunctionDeclaration(node)) && node && node.type &&
        ts.isTypeReferenceNode(node.type)) {
        returnDeclarationArr.add(node.type.typeName.getText())
    }
    if (ts.isModuleDeclaration(node) && ts.isModuleBlock(node.body) && node.body && node.body.statements) {
        node.body.statements.forEach(statement => {
            if (statement.name) {
                applicationModules.push({
                    packageName: packageName,
                    className: node.name.escapedText,
                    methodName: statement.name.escapedText
                })
            }
        })
    }
    node.getChildren().forEach(item => visitAllNode(item, returnDeclarationArr, packageName));
}
function getExportApi(node, packageName, exportApi) {
    node.statements.forEach(stat => {
        if (ts.isModuleDeclaration(stat)) {
            if (stat.getText().indexOf('namespace') > 0) {
                let apiInfo = {
                    isSystemApi: '公开API',
                    version: '',
                    deprecated: '',
                    permission: 'N/A',
                    sysCap: 'N/A',
                    model: ''
                }
                exportApi.push({
                    packageName: packageName,
                    className: stat.name.escapedText.toString(),
                    methodName: '',
                    apiInfo: getApiInfo(stat, apiInfo)
                })
            }
        }
    });
}
const applicationModule = [];
const getReturnDeclarationArr = (packageName, exportApi, returnDeclarationArr, fileName) => {
    return (context) => {
        return (node) => {
            visitAllNode(node, returnDeclarationArr, packageName);
            getExportApi(node, packageName, exportApi);
            return node;
        }
    }
}
exports.applicationModules = applicationModules;

function processDeclarationSourceFile(packageName, api, exportApi, returnDeclarationArr, hash) {
    return (context) => {
        return (node) => {
            const statements = node.statements;
            const currentClassFunSet = new Set([]);
            const currentTypeList = new Array();
            statements.forEach(stat => {
                if (ts.isTypeAliasDeclaration(stat)) {
                    if (stat.type.types) {
                        let typeObj = {
                            name: stat.name.escapedText,
                            value: []
                        }
                        stat.type.types.forEach(type => {
                            if (type.literal && type.literal.text) {
                                typeObj.value.push(type.literal.text);
                            }
                        });
                        if (typeObj.value.length > 0) {
                            currentTypeList.push(typeObj);
                        }
                    }
                }
            })
            statements.forEach(stat => {
                let apiInfo = {
                    isSystemApi: '公开API',
                    version: '',
                    deprecated: '',
                    permission: 'N/A',
                    sysCap: 'N/A',
                    model: ''
                }
                if (ts.isInterfaceDeclaration(stat)) {
                    collectInterfaceDeclaration(stat, packageName, api, exportApi, returnDeclarationArr, hash, apiInfo, currentTypeList);
                } else if (ts.isModuleDeclaration(stat)) {
                    collectModuleDeclaration(stat, packageName, api, exportApi, returnDeclarationArr, hash, apiInfo, currentTypeList);
                } else if (ts.isClassDeclaration(stat)) {
                    collectClassDeclaration(stat, packageName, api, exportApi, returnDeclarationArr, hash, apiInfo, currentTypeList);
                } else if (ts.isEnumDeclaration(stat)) {
                    collectEnumDeclaration(stat, packageName, api, exportApi, returnDeclarationArr, hash, apiInfo, currentTypeList);
                } else if (ts.isTypeAliasDeclaration(stat)) {

                } else {
                    if (ts.isMethodDeclaration(stat) || ts.isMethodSignature(stat) || ts.isFunctionDeclaration(stat)) {
                        var methodName = stat.name.escapedText ? stat.name.escapedText.toString() : stat.name.text.toString();
                        let className = '';
                        exportApi.forEach(item => {
                            if (item.methodName == methodName && item.packageName == packageName) {
                                className = item.className
                                if (item.apiInfo) {
                                    apiInfo = item.apiInfo;
                                }
                            }
                        })
                        addFunctionOnOffApi(packageName, className, methodName, getApiInfo(stat, apiInfo), 'Method', api,
                            hash, currentClassFunSet, stat);
                    }
                }
            })
            return node;
        }
    }
}

function collectInterfaceDeclaration(stat, packageName, api, exportApi, returnDeclarationArr, hash, apiInfo, currentTypeList) {
    const className = stat.name.escapedText.toString();
    const interfaceChildren = stat.members;
    collectEachChildNode(interfaceChildren, packageName, className, 'Field', api, exportApi, returnDeclarationArr, hash,
        getApiInfo(stat, apiInfo), currentTypeList)
}

function collectClassDeclaration(stat, packageName, api, exportApi, returnDeclarationArr, hash, apiInfo, currentTypeList) {
    const className = stat.name.escapedText.toString();
    const classChildren = stat.members;
    collectEachChildNode(classChildren, packageName, className, 'Field', api, exportApi, returnDeclarationArr, hash,
        getApiInfo(stat, apiInfo), currentTypeList)
}

function collectEnumDeclaration(stat, packageName, api, exportApi, returnDeclarationArr, hash, apiInfo, currentTypeList) {
    const className = stat.name.escapedText.toString();
    const enumChildren = stat.members;
    collectEachChildNode(enumChildren, packageName, className, 'Enum', api, exportApi, returnDeclarationArr, hash,
        getApiInfo(stat, apiInfo), currentTypeList)
}

function collectModuleDeclaration(stat, packageName, api, exportApi, returnDeclarationArr, hash, apiInfo, currentTypeList) {
    const className = stat.name.escapedText ? stat.name.escapedText.toString() : stat.name.text.toString();
    const moduleChildren = stat.body.statements;
    collectEachChildNode(moduleChildren, packageName, className, 'Field', api, exportApi, returnDeclarationArr, hash,
        getApiInfo(stat, apiInfo), currentTypeList)
}

function collectEachChildNode(children, packageName, className, faterApiType, api, exportApi, returnDeclarationArr,
    hash, apiInfo, currentTypeList) {
    const currentClassFunSet = new Set([]);
    children.forEach(child => {
        if (ts.isTypeAliasDeclaration(child)) {
            if (child.type) {
                let typeObj = {
                    name: child.name.escapedText,
                    value: []
                }
                if (child.type.types) {
                    child.type.types?.forEach(type => {
                        if (type.literal && type.literal.text) {
                            typeObj.value.push(type.literal.text);
                            if (typeCollection) {
                                let faterApiInfo = JSON.parse(JSON.stringify(apiInfo));
                                addApi(packageName, child.name.escapedText, type.literal.text, child.getText(),
                                    getApiInfo(child, faterApiInfo), 'Type', api, hash);
                            }
                        } else {
                            if (type.getText() != '') {
                                typeObj.value.push(type.getText());
                                if (typeCollection) {
                                    let faterApiInfo = JSON.parse(JSON.stringify(apiInfo));
                                    addApi(packageName, child.name.escapedText, type.getText(), child.getText(),
                                        getApiInfo(child, faterApiInfo), 'Type', api, hash);
                                }
                            }
                        }
                    });
                } else if (child.type.members) {
                    child.type.members?.forEach(member => {
                        member.type.types?.forEach(type => {
                            if (type.literal && type.literal.text) {
                                typeObj.value.push(type.literal.text);
                                if (typeCollection) {
                                    let faterApiInfo = JSON.parse(JSON.stringify(apiInfo));
                                    addApi(packageName, child.name.escapedText, type.literal.text, child.getText(),
                                        getApiInfo(child, faterApiInfo), 'Type', api, hash);
                                }
                            } else {
                                if (type.getText() != '') {
                                    typeObj.value.push(type.getText());
                                    if (typeCollection) {
                                        let faterApiInfo = JSON.parse(JSON.stringify(apiInfo));
                                        addApi(packageName, className, child.name.escapedText, child.getText(),
                                            getApiInfo(child, faterApiInfo), 'Type', api, hash);
                                    }
                                }
                            }
                        });
                    })
                }
                if (typeObj.value.length > 0) {
                    currentTypeList.push(typeObj)
                }
            }
        }
    });
    children.forEach(child => {
        let faterApiInfo = JSON.parse(JSON.stringify(apiInfo));
        let apiType = new String(faterApiType);
        if (/export.*\{.*\}/g.test(child.getText())) {
            exportApi.push({
                packageName: packageName,
                className: className,
                methodName: child.getText().replace("export", '').replace('{', '').replace('}', '').replace(';', '').trim(),
                apiInfo: faterApiInfo
            })
            return
        }
        if (ts.isInterfaceDeclaration(child)) {
            collectInterfaceDeclaration(child, packageName, api, exportApi, returnDeclarationArr, hash, faterApiInfo);
        } else if (ts.isModuleDeclaration(child)) {
            collectModuleDeclaration(child, packageName, api, exportApi, returnDeclarationArr, hash, faterApiInfo);
        } else if (ts.isClassDeclaration(child)) {
            collectClassDeclaration(child, packageName, api, exportApi, returnDeclarationArr, hash, faterApiInfo);
        } else if (ts.isEnumDeclaration(child)) {
            collectEnumDeclaration(child, packageName, api, exportApi, returnDeclarationArr, hash, faterApiInfo);
        } else if (ts.isTypeAliasDeclaration(child)) {

        } else {
            if ((ts.isMethodDeclaration(child) || ts.isMethodSignature(child) || ts.isFunctionDeclaration(child)) &&
                (child.name.escapedText === 'on' || child.name.escapedText === 'off') && child.parameters && child.parameters.length > 0) {
                apiType = 'Method'
                for (let i = 0; i < child.parameters.length; i++) {
                    const param = child.parameters[i];
                    if (param.name.escapedText === 'type' || param.name.escapedText === 'event' ||
                        param.name.escapedText === 'eventType') {
                        if (param.type && param.type.literal && param.type.literal.text) {
                            const typeTextArr = param.getText().replace(/\s*/g, "").split(':');
                            if (typeTextArr[0] === "type" || typeTextArr[0] === "event") {
                                let methodName = child.name.escapedText + '_' + param.type.literal.text;
                                addFunctionOnOffApi(packageName, className, methodName, faterApiInfo, apiType, api,
                                    hash, currentClassFunSet, child);
                            }
                        } else if (param.type && param.type.types && param.type.types.length > 0) {
                            param.type.types.forEach(type => {
                                if (type.literal && type.literal.text) {
                                    let methodName = child.name.escapedText + "_" + type.literal.text;
                                    addFunctionOnOffApi(packageName, className, methodName, faterApiInfo, apiType, api,
                                        hash, currentClassFunSet, child);
                                }
                            });
                        } else if (param.type && param.type.typeName && param.type.typeName.escapedText) {
                            if (currentTypeList && currentTypeList.length > 0) {
                                currentTypeList.forEach(type => {
                                    if (type.name == param.type.typeName.escapedText) {
                                        type.value.forEach(typeString => {
                                            let methodName = child.name.escapedText + "_" + typeString;
                                            addFunctionOnOffApi(packageName, className, methodName, faterApiInfo, apiType, api,
                                                hash, currentClassFunSet, child);
                                        });
                                    }
                                });
                            } else {
                                let methodName = child.name.escapedText;
                                addFunctionOnOffApi(packageName, className, methodName, faterApiInfo, apiType, api,
                                    hash, currentClassFunSet, child);
                            }
                        } else {
                            let methodName = child.name.escapedText;
                            addFunctionOnOffApi(packageName, className, methodName, faterApiInfo, apiType, api,
                                hash, currentClassFunSet, child);
                        }
                        break;
                    } else {
                        let methodName = child.name.escapedText;
                        addFunctionOnOffApi(packageName, className, methodName, faterApiInfo, apiType, api,
                            hash, currentClassFunSet, child);
                    }

                }
            } else {
                let methodName = "";
                let methodText = "";
                if (ts.isMethodDeclaration(child) || ts.isMethodSignature(child) || ts.isFunctionDeclaration(child) ||
                    ts.isCallSignatureDeclaration(child) || ts.isConstructSignatureDeclaration(child) ||
                    ts.isIndexSignatureDeclaration(child)) {
                    if (child.name) {
                        methodName = child.name.getText();
                    } else {
                        methodName = className;
                    }
                    apiType = 'Method'
                } else if (ts.isPropertyDeclaration(child) || ts.isPropertySignature(child)) {
                    if (child.type && child.type.parameters) {
                        methodName = child.name.escapedText;
                        apiType = 'Method'
                    } else {
                        methodName = child.name.escapedText;
                        apiType = 'Field';
                    }
                } else {
                    if (child.name) {
                        methodName = child.name.getText();
                    }
                }
                if (methodName !== "") {
                    addFunctionOnOffApi(packageName, className, methodName, faterApiInfo, apiType, api,
                        hash, currentClassFunSet, child);
                } else {
                    if (child.getText().indexOf("construnctor") == 0) {
                        methodName = 'constructor';
                        apiType = 'Method';
                    } else if (child.getText().indexOf("const") == 0) {
                        if (child.getText().replace("const", "").indexOf(":") > 0) {
                            if (returnDeclarationArr.has(child.getText().replace("const", "").split(":")[1].trim())) {
                                apiType = 'Field';
                            } else {
                                apiType = 'Constant';
                            }
                            methodName = child.getText().replace('const', "").split(":")[0].trim();
                        } else if (child.getText().replace("const", "").indexOf("=") > 0) {
                            if (returnDeclarationArr.has(child.getText().replace("const", "").split("=")[1].trim())) {
                                apiType = 'Field';
                            } else {
                                apiType = 'Constant';
                            }
                            methodName = child.getText().replace('const', "").split("=")[0].trim();
                        }
                    } else if (/\w+:\s*\w+/g.test(child.getText())) {
                        apiType = 'Field';
                        methodName = child.getText().split(":")[0].trim()
                    }
                    if (methodName != '') {
                        addApi(packageName, className, methodName, child.getText(),
                            getApiInfo(child, faterApiInfo), apiType, api, hash);
                    }
                }
            }
        }
    });
}

function addFunctionOnOffApi(packageName, className, methodName, apiInfo, apiType, api,
    hash, currentClassFunSet, childNode) {
    if (currentClassFunSet.has(methodName) && !isNotMerge) {
        for (let i = 0; i < api.length; i++) {
            const curApi = api[i];
            if (curApi.packageName === packageName && curApi.className === className &&
                curApi.methodName === methodName) {
                if (curApi.methodText.indexOf(`${childNode.getText().replace('declare', '').trim()}`) < 0) {
                    curApi.methodText += `<br>${childNode.getText().replace('declare', '').trim()}`;
                    break;
                }
            }
        }
    } else {
        if (!currentClassFunSet.has(methodName)) {
            currentClassFunSet.add(methodName);
            addApi(packageName, className, methodName, childNode.getText().replace('declare', '').trim(),
                getApiInfo(childNode, apiInfo), apiType, api, hash);
        } else {
            if (childNode.getFullText().indexOf('\/**') >= 0) {
                addApi(packageName, className, methodName, childNode.getText().replace('declare', '').trim(),
                    getApiInfo(childNode, apiInfo), apiType, api, hash);
            } else {
                let firstApiInfo = {};
                for (let i = 0; i < api.length; i++) {
                    const curApi = api[i];
                    if (curApi.packageName === packageName && curApi.className === className &&
                        curApi.methodName === methodName) {
                        firstApiInfo.isSystemApi = curApi.isSystemApi;
                        firstApiInfo.version = curApi.version;
                        firstApiInfo.sysCap = curApi.sysCap;
                        firstApiInfo.permission = curApi.permission;
                        firstApiInfo.model = curApi.model;
                    }

                }
                addApi(packageName, className, methodName, childNode.getText().replace('declare', '').trim(),
                    firstApiInfo, apiType, api, hash);
            }
        }
    }
}
function getApiInfo(node, apiInfo) {
    const notesStr = node.getFullText().replace(node.getText(), "");
    if (notesStr !== "") {
        if (/\@[S|s][Y|y][S|s][T|t][E|e][M|m][A|a][P|p][I|i]/g.test(notesStr)) {
            apiInfo.isSystemApi = '系统API'
        }
        if (/\@[S|s][I|i][N|n][C|c][E|e]\s*(\d+)/g.test(notesStr)) {
            notesStr.replace(/\@[S|s][I|i][N|n][C|c][E|e]\s*(\d+)/g, (versionInfo) => {
                apiInfo.version = versionInfo.replace(/\@[S|s][I|i][N|n][C|c][E|e]/g, '').trim();
            })
        }
        if (/\@[D|d][E|e][P|p][R|r][E|e][C|c][A|a][T|t][E|e][D|d].*[S|s][I|i][N|n][C|c][E|e]\s*(\d+)/g.test(notesStr)) {
            notesStr.replace(/\@[D|d][E|e][P|p][R|r][E|e][C|c][A|a][T|t][E|e][D|d].*[S|s][I|i][N|n][C|c][E|e]\s*(\d+)/g,
                versionInfo => {
                    apiInfo.deprecated = versionInfo.replace(
                        /\@[D|d][E|e][P|p][R|r][E|e][C|c][A|a][T|t][E|e][D|d].*[S|s][I|i][N|n][C|c][E|e]\s*/g, '').trim();
                })
        }
        if (/\@[F|f][A|a][M|m][O|o][D|d][E|e][L|l][O|o][N|n][L|l][Y|y]/g.test(notesStr)) {
            notesStr.replace(/\@[F|f][A|a][M|m][O|o][D|d][E|e][L|l][O|o][N|n][L|l][Y|y]/g, modelInfo => {
                apiInfo.model = modelInfo;
            })
        } else if (/\@[S|s][T|t][A|a][G|g][E|e][M|m][O|o][D|d][E|e][L|l][O|o][N|n][L|l][Y|y]/g.test(notesStr)) {
            notesStr.replace(/\@[S|s][T|t][A|a][G|g][E|e][M|m][O|o][D|d][E|e][L|l][O|o][N|n][L|l][Y|y]/g, modelInfo => {
                apiInfo.model = modelInfo;
            })
        }
        if (/\@[S|s][Y|y][S|s][C|c][A|a][P|p]\s*((\w|\.|\/|\{|\@|\}|\s)+)/g.test(notesStr)) {
            notesStr.replace(/\@[S|s][Y|y][S|s][C|c][A|a][P|p]\s*((\w|\.|\/|\{|\@|\}|\s)+)/g, sysCapInfo => {
                apiInfo.sysCap = sysCapInfo.replace(/\@[S|s][Y|y][S|s][C|c][A|a][P|p]/g, '').trim();
            })
        }
        if (/\@[P|p][E|e][R|r][M|m][I|i][S|s][S|s][I|i][O|o][N|n]\s*((\w|\.|\/|\{|\@|\}|\s)+)/g.test(notesStr)) {
            notesStr.replace(/\@[P|p][E|e][R|r][M|m][I|i][S|s][S|s][I|i][O|o][N|n]\s*((\w|\.|\/|\{|\@|\}|\s)+)/g,
                permissionInfo => {
                    apiInfo.permission = permissionInfo.replace(/\@[P|p][E|e][R|r][M|m][I|i][S|s][S|s][I|i][O|o][N|n]/g, '').trim();
                })
        }
    }
    return apiInfo;
}

function addApi(packageName, className, methodName, methodText, apiInfo, apiType, api, hash) {
    let recard = isNotMerge ? `${packageName}.${className}/${methodName}/${methodText}` :
        `${packageName}.${className}/${methodName}`
    if (!hash.has(recard)) {
        hash.add(recard);
        api.push({
            namespace: '',
            packageName: packageName,
            className: className,
            methodName: methodName,
            count: 0,
            methodText: methodText.replace(/export\s/g, ""),
            isSystemApi: apiInfo.isSystemApi,
            version: apiInfo.version,
            deprecated: apiInfo.deprecated,
            apiType: apiType,
            sysCap: apiInfo.sysCap,
            permission: apiInfo.permission,
            model: apiInfo.model,
            applicationFile: ''
        })
    }
}

async function buildExportData(fileContentList) {
    const api = parse(fileContentList);
    return await getExcelBuffer(api)
}
async function getExcelBuffer(api) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Js Api', { views: [{ xSplit: 1 }] });
    sheet.getRow(1).values = ['模块名', 'namespace', '类名', '方法名', '调用次数', '函数', '类型', 'SysCap',
        '权限', '支持起始版本', '访问级别']
    for (let i = 1; i <= api.length; i++) {
        const apiData = api[i - 1];
        sheet.getRow(i + 1).values = [apiData.packageName, apiData.namespace, apiData.className, apiData.methodName,
        apiData.count, apiData.methodText, apiData.apiType, apiData.sysCap, apiData.permission,
        apiData.version, apiData.isSystemApi]
    }
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}
exports.getExcelBuffer = getExcelBuffer;

function readFile(dir, utFiles) {
    try {
        const files = fs.readdirSync(dir);
        files.forEach((element) => {
            const filePath = path.join(dir, element);
            const status = fs.statSync(filePath);
            if (status.isDirectory()) {
                readFile(filePath, utFiles);
            } else {
                if (/\.d\.ts/.test(filePath)) {
                    utFiles.push(filePath)
                }
            }
        })
    } catch (e) {
        console.error('ETS ERROR: ' + e);
    }
}
exports.readFile = readFile;

async function excel(api) {
    let buffer = await getExcelBuffer(api)
    fs.writeFile('Js_Api.xlsx', buffer, function (err) {
        if (err) {
            console.error(err);
            return;
        }
    });
}
exports.excel = excel;
const dir = 'D:\\web\\API 管\\api\\@internal\\1';