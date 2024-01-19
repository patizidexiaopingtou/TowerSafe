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
#./build.sh sdkdemotest clean
./build.sh sdkdemotest
rm out/sdkdemotest/*.xml
find out/sdkdemotest -name "*.gcda" -print0 | xargs -0 rm
mkdir -p out/sdkdemotest/data/resource
cp sdkdemotest/resource/* out/sdkdemotest/data/resource/
cd out/sdkdemotest
./trace_streamer_sdk_ut
