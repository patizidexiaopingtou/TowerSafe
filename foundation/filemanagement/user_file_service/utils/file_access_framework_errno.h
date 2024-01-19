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

#ifndef FILE_ACCESS_FRAMEWORK_ERRNO_H
#define FILE_ACCESS_FRAMEWORK_ERRNO_H

#include "errors.h"

namespace OHOS {
namespace FileAccessFwk {

const int BASE_OFFSET = 14300001;
enum {
    ERR_OK = 0,
    E_IPCS = BASE_OFFSET,                   // IPC error
    E_URIS,                                 // Invalid uri
    E_GETINFO,                              // Fail to get fileextension info
    E_GETRESULT,                            // Get wrong result
    E_REGISTER,                             // Fail to register notification
    E_REMOVE,                               // Fail to remove notification
    E_INIT_NOTIFY_AGENT,                    // Fail to init notification agent
    E_NOTIFY,                               // Fail to notify agent
    E_CONNECT,                              // Fail to connect file access extension ability
    E_PERMISSION = 201,                     // Permission verification failed
    E_PERMISSION_SYS                        // is not system app
};
} // namespace FileAccessFwk
} // namespace OHOS
#endif // FILE_ACCESS_FRAMEWORK_ERRNO_H