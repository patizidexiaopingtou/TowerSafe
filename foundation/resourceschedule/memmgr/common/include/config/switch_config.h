/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

#ifndef OHOS_MEMORY_MEMMGR_COMMON_INCLUDE_CONFIG_SWITCH_VALUE_CONFIG_H
#define OHOS_MEMORY_MEMMGR_COMMON_INCLUDE_CONFIG_SWITCH_VALUE_CONFIG_H

#include "libxml/parser.h"

namespace OHOS {
namespace Memory {
class SwitchConfig {
public:
    void ParseConfig(const xmlNodePtr &rootNodePtr);
    void SetBigMemKillSwitch(unsigned long long bigMemKillSwitch);
    unsigned long long GetBigMemKillSwitch(void);
    void Dump(int fd);

private:
    unsigned long long bigMemKillSwitch_ = 0;
};
} // namespace Memory
} // namespace OHOS
#endif // OHOS_MEMORY_MEMMGR_COMMON_INCLUDE_CONFIG_SWITCH_VALUE_CONFIG_H
