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
const result = require("../check_result.json");

// print compile info
function addAPICheckErrorLogs(node, sourcefile, fileName, errorType, errorInfo) {
  const checkFailFileNameSet = new Set(result.apiFiles);
    if (!checkFailFileNameSet.has(fileName)) {
      result.apiFiles.push(fileName);
    }
    const posOfNode = sourcefile.getLineAndCharacterOfPosition(node.pos);
    // const errorMessage = {
    //   "error_type": "misspell words",
    //   "file": fileName,
    //   "pos": node.pos,
    //   "column": posOfNode.character + 1,
    //   "line": posOfNode.line + 1,
    //   "error_info": `Error basic words in [${nodeText}]: ${errorWords}. ` +
    //     `Do you want to spell it as [${suggest}]?`
    // };
    const errorMessage = `API check error of [${errorType}] in ${fileName}(line:${posOfNode.line + 1}, col:` +
      `${posOfNode.character + 1}): ${errorInfo}`;
    const scanResultSet = new Set(result.scanResult);
    scanResultSet.add(errorMessage);
    result.scanResult = [...scanResultSet];
}
exports.addAPICheckErrorLogs = addAPICheckErrorLogs;
