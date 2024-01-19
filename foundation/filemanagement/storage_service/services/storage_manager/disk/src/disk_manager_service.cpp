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

#include "disk/disk_manager_service.h"

#include "storage_daemon_communication/storage_daemon_communication.h"
#include "storage_service_errno.h"
#include "storage_service_log.h"

namespace OHOS {
namespace StorageManager {
DiskManagerService::DiskManagerService() {}
DiskManagerService::~DiskManagerService() {}

std::shared_ptr<Disk> DiskManagerService::GetDiskById(std::string diskId)
{
    if (!diskMap_.Contains(diskId)) {
        return nullptr;
    }
    return diskMap_[diskId];
}

void DiskManagerService::OnDiskCreated(Disk disk)
{
    if (diskMap_.Contains(disk.GetDiskId())) {
        LOGE("DiskManagerService::OnDiskCreated the disk %{public}s already exists", disk.GetDiskId().c_str());
        return;
    }
    auto diskPtr = std::make_shared<Disk>(disk);
    diskMap_.Insert(diskPtr->GetDiskId(), diskPtr);
}

void DiskManagerService::OnDiskDestroyed(std::string diskId)
{
    if (!diskMap_.Contains(diskId)) {
        LOGE("DiskManagerService::OnDiskDestroyed the disk %{public}s doesn't exist", diskId.c_str());
        return;
    }
    diskMap_.Erase(diskId);
}

int32_t DiskManagerService::Partition(std::string diskId, int32_t type)
{
    if (!diskMap_.Contains(diskId)) {
        LOGE("DiskManagerService::Partition the disk %{public}s doesn't exist", diskId.c_str());
        return E_NON_EXIST;
    }
    std::shared_ptr<StorageDaemonCommunication> sdCommunication;
    sdCommunication = DelayedSingleton<StorageDaemonCommunication>::GetInstance();
    int32_t err = sdCommunication->Partition(diskId, type);
    return err;
}

std::vector<Disk> DiskManagerService::GetAllDisks()
{
    std::vector<Disk> result;
    for (auto it = diskMap_.Begin(); it != diskMap_.End(); ++it) {
        Disk disk = *(it->second);
        result.push_back(disk);
    }
    return result;
}

int32_t DiskManagerService::GetDiskById(std::string diskId, Disk &disk)
{
    if (diskMap_.Contains(diskId)) {
        disk = *diskMap_[diskId];
        return E_OK;
    }
    return E_NON_EXIST;
}
}
}
