# Copyright (c) 2023 Huawei Device Co., Ltd.
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

SET(CMAKE_SYSTEM_NAME Windows)
set(CMAKE_SYSTEM_PROCESSOR x86_64)
set(MINGW_ROOT_PATH ${TOOLCHAIN_PATH})
set(CMAKE_C_COMPILER ${TOOLCHAIN_PATH}/bin/clang)
set(CMAKE_CXX_COMPILER ${TOOLCHAIN_PATH}/bin/clang++)
set(COMPILER_FLAGS "-target x86_64-w64-mingw32 -rtlib=compiler-rt -stdlib=libc++ -fuse-ld=lld -lunwind -Qunused-arguments -fno-common -fno-strict-aliasing -fvisibility=hidden -pipe")
set(CMAKE_C_FLAGS "${COMPILER_FLAGS}")
set(CMAKE_CXX_FLAGS "--driver-mode=g++ ${COMPILER_FLAGS}")