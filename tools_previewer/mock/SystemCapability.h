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

#ifndef SYSTEMCAPABILITY_H
#define SYSTEMCAPABILITY_H
#include <map>
#include <string>

class SystemCapability final {
public:
    SystemCapability(const SystemCapability&) = delete;
    SystemCapability& operator=(const SystemCapability&) = delete;
    bool HasSystemCapability(const char* sysCapName);
    static SystemCapability& GetInstance();

private:
    SystemCapability();
    virtual ~SystemCapability() {};
    void ReadCapability();
    std::map<std::string, bool> capabilities;
};

#endif // SYSTEMCAPABILITY_H
