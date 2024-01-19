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

THIS_DIR=$(dirname ${BASH_SOURCE[0]})
PROJECT_TOP=$(realpath $THIS_DIR/../../..)

OHOS_X64_OUT=$PROJECT_TOP/$2/
LIBCXX_X64_OUT=$PROJECT_TOP/$1/ndk/libcxx/linux_x86_64
SUBSYS_X64_OUT=$PROJECT_TOP/$2/developtools/profiler
PROTOC=$PROJECT_TOP/$2/developtools/profiler/protoc
PYTHON_SHELL=$THIS_DIR/make_standard_proto.py # shell path
TMP=$2
PROTO_OUT_DIR="$PROJECT_TOP/${TMP%/*}/$3" # path of the new proto file

echo "1 = $1"
echo "2 = $2"
PARAMS=$*
PARAMS_FILTER="$1 $2 $3"
# for python : copy and change source .proto file
TARFLAG="--proto_path"
PARAMS_SOURCE_TMP="${PARAMS#*${TARFLAG}}" # get source proto file path
PARAMS_SOURCES=""
NUM=0
for ITM in ${PARAMS_SOURCE_TMP[@]} # filter the TARGLAG
do
  if [ $NUM -gt 0 ]; then
    PARAMS_SOURCES="$PARAMS_SOURCES$ITM "
  fi
  NUM=$[$NUM + 1]
done
PARAMS_PRINT="$PROTO_OUT_DIR $PARAMS_SOURCES" # splice the python args
echo "EXEC: python $PYTHON_SHELL $PARAMS_PRINT"
python $PYTHON_SHELL $PARAMS_PRINT
# end python

# creat pb file
PARAMS_SRC=${PARAMS:${#PARAMS_FILTER}}
PARAMS_REPLACE=${PARAMS_SOURCES//.proto/_standard.proto} # make the new proto file name. like "_standard.proto"
PARAMS_STANDARD=" --proto_path $PROTO_OUT_DIR " # add proto_path，$PROTO_OUT_DIR is the pb file path
for VAR in ${PARAMS_REPLACE[@]}
do
  PARAMS_STANDARD="$PARAMS_STANDARD$PROTO_OUT_DIR/${VAR##*/} " # add .proto file name to args
done
PARAMS_ALL="$PARAMS_SRC $PARAMS_STANDARD" # add new argument list to old argument list

echo "EXEC: LD_LIBRARY_PATH=$LIBCXX_X64_OUT:$SUBSYS_X64_OUT $PROTOC $PARAMS_ALL"
LD_LIBRARY_PATH=$LIBCXX_X64_OUT:$SUBSYS_X64_OUT exec $PROTOC $PARAMS_ALL
