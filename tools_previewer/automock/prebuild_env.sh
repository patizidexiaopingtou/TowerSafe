#!/bin/bash
# Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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

#设置执行失败，退出脚本执行
set -e

#$0表示脚本本身
#dirname去除文件名中的非目录部分，删除最后一个“\”后面的路径，得到文件夹路径
#获取当前脚本目录
script_path=$(cd $(dirname $0);pwd)
#获取项目根目录路径
code_dir=$(dirname ${script_path})/../
#系统内核的名字
case $(uname -s) in
    Linux)
        host_platform=linux
        ;;
    Darwin)
        host_platform=darwin
        ;;
    *)
        echo "Unsupported host platform: $(uname -s)"
        exit 1
esac
#设置nodejs版本
node_js_ver=v12.18.4
#nodejs文件夹名称
node_js_name=node-${node_js_ver}-${host_platform}-x64
#到automock目录
cd ${code_dir}/ace/automock/mock-generate/
#设置环境变量为下载的nodejs
export PATH=${code_dir}/prebuilts/build-tools/common/nodejs/${node_js_name}/bin:$PATH
#设置镜像地址
npm config set registry https://repo.huaweicloud.com/repository/npm/
#执行安装
npm install
#跳根目录
cd ${code_dir}
#判断目录是否存在
if [ -d "${code_dir}/prebuilts/build-tools/common/automock/mock-generate" ]; then
    #转义输出，不换行
    echo -e "\n"
    echo "${code_dir}/prebuilts/build-tools/common/automock/mock-generate already exist, it will be replaced with node-${node_js_ver}"
    #删除原目录
    /bin/rm -rf ${code_dir}/prebuilts/build-tools/common/automock/mock-generate
    echo -e "\n"
fi
#创建新目录
mkdir -p ${code_dir}/prebuilts/build-tools/common/automock/mock-generate
#拷贝node_modules过去
/bin/cp -rf ${code_dir}/ace/automock/mock-generate/node_modules ${code_dir}/prebuilts/build-tools/common/automock/mock-generate/
