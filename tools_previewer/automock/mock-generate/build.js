/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

const fs = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');
const os = require('os');
function compileMock() {
  const mockJsPath = path.join(__dirname, '..', './runtime/main/extend/systemplugin');
  let nodeDir = '';
  if (os.platform() === 'linux') {
    nodeDir = './node-v12.18.4-linux-x64/bin/node';
  } else {
    nodeDir = './node-v12.18.4-darwin-x64/bin/node';
  }
  
  const bat = spawnSync(`
  ${path.join(__dirname, '..', nodeDir)} ${path.join(__dirname, '..','./node_modules/typescript/bin/tsc')} && 
  ${path.join(__dirname, '..', nodeDir)} ${path.join(__dirname, 'dist')}/main.js && 
  ${path.join(__dirname, '..', nodeDir)} ${path.join(__dirname, '..', './node_modules/eslint/bin/eslint.js')} 
  -c .eslintrc --fix ${mockJsPath}/**/*.js`, {
    cwd: __dirname,
    shell: true
  });
}

compileMock();
