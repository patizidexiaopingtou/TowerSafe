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

const { readFile } = require('./util');
const path = require('path');
const fs = require('fs');
const ts = require('typescript');
const { visitEachChild } = require('typescript');

let apiList = [];
let importFiles = new Map();
let moduleName = [];
let applicationApis = [];
let classNames = [];
let finalClassName = [];

function collectApi(url) {
    const applicationUrl = path.resolve(__dirname, url);
    const applicationFiles = [];
    readFile(applicationUrl, applicationFiles);
    tsTransform(applicationFiles, getImportFileName);
}

function tsTransform(applicationFiles, callback) {
    applicationFiles.forEach(url => {
        if (/\.ets/.test(path.basename(url)) || /\.ts/.test(path.basename(url))) {
            const content = fs.readFileSync(url, 'utf-8');
            const fileName = path.basename(url).replace(/\.d.ts$/g, 'ts');
            ts.transpileModule(content, {
                compilerOptions: {
                    "target": ts.ScriptTarget.ES2017
                },
                fileName: fileName,
                transformers: { before: [callback(url)] }
            })
        }
    });
}

function getImportFileName(url) {
    return (context) => {
        return (sourcefile) => {
            const statements = sourcefile.statements;
            statements.forEach(item => {
                if (ts.isImportDeclaration(item)) {
                    judgeImportFile(item);
                } else {
                    collectApplicationApi(item, sourcefile);
                }
            })
            return sourcefile;
        }
        function collectApplicationApi(node, sourcefile) {
            if (ts.isPropertyAccessExpression(node) && node.expression && ts.isIdentifier(node.name)) {
                if (ts.isCallExpression(node.expression) && ts.isPropertyAccessExpression(node.expression.expression)) {
                    apiList.push({
                        fileName: path.basename(url),
                        moduleName: node.expression.expression.expression.escapedText,
                        apiName: node.name.escapedText
                    })
                } else if (ts.isPropertyAccessExpression(node.expression) && ts.isIdentifier(node.expression.expression)) {
                    apiList.push({
                        fileName: path.basename(url),
                        moduleName: node.expression.expression.escapedText,
                        apiName: node.expression.name.escapedText,
                        value: node.name.escapedText
                    })
                } else if (ts.isIdentifier(node.expression) && ts.isCallExpression(node.parent)) {
                    if (node.parent.arguments && node.name.escapedText.toString() == 'on' || node.name.escapedText.toString() == 'off') {
                        node.parent.arguments.forEach(argument => {
                            if (ts.isStringLiteral(argument)) {
                                apiList.push({
                                    fileName: path.basename(url),
                                    moduleName: node.expression.escapedText,
                                    apiName: node.name.escapedText + '_' + argument.text
                                })
                            }
                        })
                    } else {
                        apiList.push({
                            fileName: path.basename(url),
                            moduleName: node.expression.escapedText,
                            apiName: node.name.escapedText
                        })
                    }
                }
            } else if (ts.isQualifiedName(node) && ts.isTypeReferenceNode(node.parent)) {
                apiList.push({
                    fileName: path.basename(url),
                    moduleName: node.left.escapedText,
                    apiName: node.right.escapedText
                })
            }
            node.getChildren().forEach(item => collectApplicationApi(item, sourcefile));
        }
    }
}



function judgeImportFile(node) {
    if (ts.isStringLiteral(node.moduleSpecifier)) {
        if ((node.moduleSpecifier.text).indexOf('@ohos.') != -1 || (node.moduleSpecifier.text).indexOf('@system.') != -1) {
            let moduleNames = [];
            if (importFiles.get(node.moduleSpecifier.text)) {
                const moduleNameSet = new Set(importFiles.get(node.moduleSpecifier.text));
                if (!moduleNameSet.has(node.importClause.name.escapedText)) {
                    moduleNameSet.add(node.importClause.name.escapedText);
                    moduleName.push(node.importClause.name.escapedText)
                }
                moduleNames = [...moduleNameSet];
            } else {
                moduleNames.push(node.importClause.name.escapedText);
                moduleName.push(node.importClause.name.escapedText);
            }
            importFiles.set(node.moduleSpecifier.text, moduleNames);
        }
    }
}

function filterApi() {
    moduleName.forEach(module => {
        apiList.forEach(api => {
            if (module == api.moduleName) {
                applicationApis.push(api);
            }
        })
    })

    moduleName.forEach(module => {
        classNames.forEach(className => {
            if (module == className) {
                finalClassName.push(className);
            }
        })
    })
}

try {
    collectApi("../application"); 
    filterApi();   
    exports.importFiles = importFiles;
    exports.applicationApis = applicationApis;
} catch (error) {
    console.error('COLLECT IMPORT NAME ERROR: ', error);
}