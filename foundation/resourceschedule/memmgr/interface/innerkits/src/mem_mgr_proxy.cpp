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

#include "mem_mgr_proxy.h"
#include "memmgr_log.h"

namespace OHOS {
namespace Memory {
namespace {
const std::string TAG = "MemMgrProxy";
}

int32_t MemMgrProxy::GetBundlePriorityList(BundlePriorityList &bundlePrioList)
{
    HILOGE("called");
    sptr<IRemoteObject> remote = Remote();
    MessageParcel data;
    if (!data.WriteInterfaceToken(IMemMgr::GetDescriptor())) {
        HILOGE("write interface token failed");
        return ERR_FLATTEN_OBJECT;
    }
    if (!data.WriteParcelable(&bundlePrioList)) {
        HILOGE("write bundlePrioList failed");
        return ERR_FLATTEN_OBJECT;
    }
    MessageParcel reply;
    MessageOption option;
    int32_t error = remote->SendRequest(IMemMgr::MEM_MGR_GET_BUNDLE_PRIORITY_LIST, data, reply, option);
    if (error != ERR_NONE) {
        HILOGE("transact failed, error: %{public}d", error);
        return error;
    }
    std::shared_ptr<BundlePriorityList> list
        = std::shared_ptr<BundlePriorityList>(reply.ReadParcelable<BundlePriorityList>());
    if (list == nullptr) {
        return -1;
    }
    bundlePrioList = *list;
    return ERR_OK;
}

int32_t MemMgrProxy::NotifyDistDevStatus(int32_t pid, int32_t uid, const std::string &name, bool connected)
{
    HILOGI("called, pid=%{public}d, uid=%{public}d, name=%{public}s, connected=%{public}d", pid, uid, name.c_str(),
        connected);
    sptr<IRemoteObject> remote = Remote();
    MessageParcel data;
    if (!data.WriteInterfaceToken(IMemMgr::GetDescriptor())) {
        HILOGE("write interface token failed");
        return ERR_FLATTEN_OBJECT;
    }
    if (!data.WriteInt32(pid) || !data.WriteInt32(uid) || !data.WriteString(name) || !data.WriteBool(connected)) {
        HILOGE("write params failed");
        return ERR_INVALID_DATA;
    }
    MessageParcel reply;
    MessageOption option;
    int32_t error = remote->SendRequest(IMemMgr::MEM_MGR_NOTIFY_DIST_DEV_STATUS, data, reply, option);
    if (error != ERR_NONE) {
        HILOGE("transact failed, error: %{public}d", error);
        return error;
    }
    int32_t ret;
    if (!reply.ReadInt32(ret)) {
        HILOGE("read result failed");
        return IPC_PROXY_ERR;
    }
    return ret;
}
} // namespace Memory
} // namespace OHOS
