/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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

#ifndef SERVICE_BASE_H
#define SERVICE_BASE_H

#include <mutex>

class SocketContext;

class ServiceBase {
public:
    virtual ~ServiceBase() {}
    virtual bool ProtocolProc(SocketContext& poc, uint32_t pnum, const int8_t* buf, const uint32_t size)
    {
        return false;
    }
    std::timed_mutex mWait_;
    std::string serviceName_;
};

#endif