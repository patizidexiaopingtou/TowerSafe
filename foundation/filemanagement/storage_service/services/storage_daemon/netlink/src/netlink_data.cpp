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
#include "netlink/netlink_data.h"

#include "ipc/storage_daemon.h"
#include "storage_service_errno.h"
#include "storage_service_log.h"

constexpr int ACTION_PRE_LEN = 7;
constexpr int DEVPATH_PRE_LEN = 8;
constexpr int SUBSYSTEM_PRE_LEN = 10;
constexpr int NL_PARAMS_MAX = 128;

namespace OHOS {
namespace StorageDaemon {
void NetlinkData::Decode(const char *msg)
{
    int32_t paramIdx = 0;

    while (*msg) {
        if (!strncmp(msg, "ACTION=", ACTION_PRE_LEN)) {
            msg += ACTION_PRE_LEN;
            auto iter = actionMaps.find(msg);
            if (iter != actionMaps.end()) {
                action_ = iter->second;
            }
        } else if (!strncmp(msg, "DEVPATH=", DEVPATH_PRE_LEN)) {
            msg += DEVPATH_PRE_LEN;
            devPath_ = std::string(msg);
            sysPath_ = "/sys" + devPath_;
        } else if (!strncmp(msg, "SUBSYSTEM=", SUBSYSTEM_PRE_LEN)) {
            msg += SUBSYSTEM_PRE_LEN;
            subSystem_ = std::string(msg);
        } else if (paramIdx < NL_PARAMS_MAX) {
            params_.push_back(std::string(msg));
            ++paramIdx;
        }
        while (*msg++);
    }
    return;
}

std::string NetlinkData::GetSyspath()
{
    return sysPath_.empty() ? "" : sysPath_;
}

std::string NetlinkData::GetDevpath()
{
    return devPath_.empty() ? "" : devPath_;
}

std::string NetlinkData::GetSubsystem()
{
    return subSystem_.empty() ? "" : subSystem_;
}

NetlinkData::Actions NetlinkData::GetAction()
{
    return action_;
}

const std::string NetlinkData::GetParam(const std::string paramName)
{
    size_t len = paramName.size();

    std::vector<std::string>::iterator iter;
    for (iter = params_.begin(); iter != params_.end(); ++iter) {
        const char *ptr = iter->c_str() + len;
        if (strncmp(iter->c_str(), paramName.c_str(), len) == 0 && *ptr == '=') {
            return ++ptr;
        }
    }

    return "";
}
} // StorageDaemon
} // OHOS
