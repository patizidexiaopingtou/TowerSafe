/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = require('path');
const ts = require(path.resolve(__dirname, "../node_modules/typescript"));
const { error_type } = require('./utils');
const rules = require("../code_style_rule.json");
const { addAPICheckErrorLogs } = require('./compile_info');

function checkAPINameOfHump(node, sourcefile, fileName) {
  let errorInfo = '';
  if (node.parent && !ts.isImportClause(node.parent) && !ts.isImportSpecifier(node.parent) &&
    (ts.isInterfaceDeclaration(node.parent) || ts.isClassDeclaration(node.parent) ||
    ts.isEnumDeclaration(node.parent))) {
    if (!checkLargeHump(node.escapedText.toString())) {
      errorInfo = `This moduleName [${node.escapedText.toString()}] should be used by large hump.`;
    }
  } else if (!node.parent || (!ts.isImportClause(node.parent) && !ts.isImportSpecifier(node.parent) &&
    !ts.isTypeReferenceNode(node.parent) && !ts.isQualifiedName(node.parent) &&
    !ts.isTypeParameterDeclaration(node.parent))) {
    if (!checkSmallHump(node.escapedText.toString())) {
      errorInfo = `This moduleName [${node.escapedText.toString()}] should be used by small hump.`;
    }
  }
  if (errorInfo !== '') {
    addAPICheckErrorLogs(node, sourcefile, fileName, error_type.NAMING_ERRORS, errorInfo);
  }
}
exports.checkAPINameOfHump = checkAPINameOfHump;

function checkAPIFileName(sourcefile, fileName) {
  const moduleNames = new Set([]);
  const exportAssignments = new Set([]);
  sourcefile.statements.forEach((statement, index) => {
    if (ts.isModuleDeclaration(statement) && statement.name && ts.isIdentifier(statement.name)) {
      moduleNames.add(statement.name.escapedText.toString());
    }
    if (ts.isExportAssignment(statement) && statement.expression && ts.isIdentifier(statement.expression)) {
      exportAssignments.add(statement.expression.escapedText.toString());
    }
  });
  if (exportAssignments.size > 1) {
    addAPICheckErrorLogs(sourcefile, sourcefile, fileName, error_type.NAMING_ERRORS,
      `This API file can only have one export default statement.`);
  } else if (exportAssignments.size === 1) {
    const basename = path.basename(fileName);
    if (/^@ohos|@system/g.test(basename)) {
      for (const exportAssignment of exportAssignments) {
        const lastModuleName = basename.split('.').at(-1);
        if (moduleNames.has(exportAssignment) && !checkSmallHump(lastModuleName)) {
          addAPICheckErrorLogs(sourcefile, sourcefile, fileName, error_type.NAMING_ERRORS,
            `This API file should be named by small hump.`);
        } else if (!checkLargeHump(lastModuleName)) {
          addAPICheckErrorLogs(sourcefile, sourcefile, fileName, error_type.NAMING_ERRORS,
            `This API file should be named by large hump.`);
        }
      }
    } else if (!checkSmallHump(basename)) {
      addAPICheckErrorLogs(sourcefile, sourcefile, fileName, error_type.NAMING_ERRORS,
        `This API file should be named by small hump.`);
    }
  }
}

function spliteByHump(word) {
  let firstBasicWord = word;
  if (/(?<!^)(?=[A-Z])/g.test(word)) {
    firstBasicWord = word.split(/(?<!^)(?=[A-Z])/g)[0];
  }
  return firstBasicWord;
}

function checkLargeHump(word) {
  return /^[A-Z]/.test(spliteByHump(word));
}

function checkSmallHump(word) {
  const namingWhitelistSet = new Set(rules.namingWhitelist)
  if (namingWhitelistSet.has(word)) {
    return true;
  }
  return /^[a-z]/.test(spliteByHump(word));
}
