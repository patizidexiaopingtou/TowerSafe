#!/bin/bash
# Copyright (c) 2021 Huawei Device Co., Ltd.
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -e
echo "copy source code..."
prebuilts_path=${10}
# copy dependency file to generate dir of gn
# the params come from .gn

# copy runtime to target out, and runtime/css-what is solt link, copy it always follow symbolic links in SOURCE
if [ "${9}" == 'true' ];then
  cp -R -L $3 $8
  if [ "${13}" == 'true' ];then
    cp -R ${12} $8
  fi
else
  cp -r -L $3 $8
  if [ "${13}" == 'true' ];then
    cp -r ${12} $8
  fi
fi

# $2 => node $4 => node_modules
cp -f $5 $8

if [ -d "$prebuilts_path" ]; then
  echo "copy node_modules..."
  if [ "${9}" == 'true' ];then
    cp -R $4 $8
  else
    cp -r $4 $8
  fi
else
  echo "download node_modules..."
  npm install
  cp -r ./node_modules ../../tools_previewer/automock/mock-generate
fi

cp -f $6 $8
cp -f $7 $8
cp -f $1 $8
if [ -d "$prebuilts_path" ]; then
  echo "prebuilts exists"
  # address problme of parallzing compile
  rm -rf "$8/node-v12.18.4-linux-x64"
  rm -rf "$8/node-v12.18.4-darwin-x64"
  cp -r $2 $8
  cd $8
  if [ "${9}" == 'true' ];then
    if [ "${13}" == 'true' ];then
      ./node-v12.18.4-darwin-x64/bin/node ./mock-generate/build.js
    fi
    ./node-v12.18.4-darwin-x64/bin/node build_jsmock_system_plugin.js || exit 1 &
    wait
  else
    if [ "${13}" == 'true' ];then
      ./node-v12.18.4-linux-x64/bin/node ./mock-generate/build.js
    fi
    ./node-v12.18.4-linux-x64/bin/node build_jsmock_system_plugin.js || exit 1 &
    wait
  fi
else
  npm run build
fi

# after running, remove dependency file
# rm -rf ./node_modules
# if [ "${9}" == 'true' ];then
  rm -rf ./node-v12.18.4-darwin-x64
# else
#   rm -rf ./node-v12.18.4-linux-x64
# fi
# rm -rf ./runtime
# rm -rf ./tsconfig.json
# rm -rf build_jsmock_system_plugin.js
# rm -rf ./test
# rm -rf ./.eslintrc
# rm -rf ./.babelrc
# rm -rf ./package.json
# if [ "${13}" == 'true' ];then
#   rm -rf ./mock-generate
# fi
