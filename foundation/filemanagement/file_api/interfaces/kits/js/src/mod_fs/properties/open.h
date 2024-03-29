/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#ifndef INTERFACES_KITS_JS_SRC_MOD_FS_PROPERTIES_OPEN_H
#define INTERFACES_KITS_JS_SRC_MOD_FS_PROPERTIES_OPEN_H

#include "filemgmt_libn.h"
#include "iremote_broker.h"

namespace OHOS {
namespace FileManagement {
namespace ModuleFileIO {
class Open final {
public:
    static napi_value Async(napi_env env, napi_callback_info info);
    static napi_value Sync(napi_env env, napi_callback_info info);
};

class FileIoToken : public IRemoteBroker {
public:
    DECLARE_INTERFACE_DESCRIPTOR(u"ohos.fileio.open");

    FileIoToken() = default;
    virtual ~FileIoToken() noexcept = default;
};

const std::string PROCEDURE_OPEN_NAME = "FileIOOpen";
const std::string MEDIALIBRARY_DATA_URI = "datashare:///media";
const std::string FILE_DATA_URI = "file://";
const std::string PATH_SHARE = "/data/storage/el2/share";
const std::string MODE_RW = "/rw/";
const std::string MODE_R = "/r/";
} // namespace ModuleFileIO
} // namespace FileManagement
} // namespace OHOS
#endif // INTERFACES_KITS_JS_SRC_MOD_FS_PROPERTIES_OPEN_H