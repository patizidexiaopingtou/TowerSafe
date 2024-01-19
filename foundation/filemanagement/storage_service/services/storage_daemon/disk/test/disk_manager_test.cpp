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

#include <fstream>
#include <gtest/gtest.h>
#include <sys/sysmacros.h>

#include "disk/disk_manager.h"
#include "message_parcel.h"
#include "netlink/netlink_data.h"
#include "storage_service_errno.h"
#include "storage_service_log.h"
#include "utils/string_utils.h"
#include "volume/external_volume_info.h"

namespace OHOS {
namespace StorageDaemon {
using namespace testing::ext;

const int CONFIG_PARAM_NUM = 6;
static const std::string CONFIG_PTAH = "/system/etc/init/config.txt";

class DiskManagerTest : public testing::Test {
public:
    static void SetUpTestCase(void) {};
    static void TearDownTestCase(void) {};
    void SetUp();
    void TearDown() {};
};

void DiskManagerTest::SetUp()
{
    DiskManager *diskManager = DiskManager::Instance();
    std::ifstream infile;
    infile.open(CONFIG_PTAH);
    if (!infile) {
        LOGE("Cannot open config");
        return ;
    }

    while (infile) {
        std::string line;
        std::getline(infile, line);
        if (line.empty()) {
            LOGI("Param config complete");
            break;
        }

        std::string token = " ";
        auto split = SplitLine(line, token);
        if (split.size() != CONFIG_PARAM_NUM) {
            LOGE("Invalids config line: number of parameters is incorrect");
            continue;
        }

        auto it = split.begin();
        if (*it != "sysPattern") {
            LOGE("Invalids config line: no sysPattern");
            continue;
        }

        auto sysPattern = *(++it);
        if (*(++it) != "label") {
            LOGE("Invalids config line: no label");
            continue;
        }

        auto label = *(++it);
        if (*(++it) != "flag") {
            LOGE("Invalids config line: no flag");
            continue;
        }

        it++;
        int flag = std::atoi((*it).c_str());
        auto diskConfig =  std::make_shared<DiskConfig>(sysPattern, label, flag);
        diskManager->AddDiskConfig(diskConfig);
    }
    infile.close();
}
/**
 * @tc.name: Storage_Service_DiskManagerTest_Instance_001
 * @tc.desc: Verify the Instance function.
 * @tc.type: FUNC
 * @tc.require: SR000GGUOT
 */
HWTEST_F(DiskManagerTest, Storage_Service_DiskManagerTest_Instance_001, TestSize.Level1)
{
    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_Instance_001 start";

    DiskManager *diskManager = DiskManager::Instance();
    ASSERT_TRUE(diskManager != nullptr);

    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_Instance_001 end";
}

/**
 * @tc.name: Storage_Service_DiskManagerTest_Instance_002
 * @tc.desc: Verify the Instance function.
 * @tc.type: FUNC
 * @tc.require: SR000GGUOT
 */
HWTEST_F(DiskManagerTest, Storage_Service_DiskManagerTest_Instance_002, TestSize.Level1)
{
    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_Instance_002 start";

    DiskManager *diskManagerFirst = DiskManager::Instance();
    ASSERT_TRUE(diskManagerFirst != nullptr);

    DiskManager *diskManagerSecond = DiskManager::Instance();
    ASSERT_TRUE(diskManagerSecond != nullptr);

    EXPECT_TRUE(diskManagerFirst == diskManagerSecond);

    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_Instance_002 end";
}

/**
 * @tc.name: Storage_Service_DiskManagerTest_CreateDisk_001
 * @tc.desc: Verify the CreateDisk function.
 * @tc.type: FUNC
 * @tc.require: SR000GGUOT
 */
HWTEST_F(DiskManagerTest, Storage_Service_DiskManagerTest_CreateDisk_001, TestSize.Level1)
{
    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_CreateDisk_001 start";

    DiskManager *diskManager = DiskManager::Instance();
    ASSERT_TRUE(diskManager != nullptr);

    char msg[1024] = { "add@/class/input/input9/mouse2\0ACTION=add\0DEVTYPE=disk\0\
                        \0DEVPATH=/devices/platform/fe2b0000.dwmmc/*\0SUBSYSTEM=input\0SEQNUM=1064\0\
                        \0PHYSDEVPATH=/devices/pci0000:00/0000:00:1d.1/usb2/2?2/2?2:1.0\0\
                        \0PHYSDEVBUS=usb\0PHYSDEVDRIVER=usbhid\0MAJOR=13\0MINOR=34\0"};
    auto data = std::make_unique<NetlinkData>();
    data->Decode(msg);
    auto diskInfo = diskManager->MatchConfig(data.get());
    EXPECT_TRUE(diskInfo != nullptr);
    diskManager->CreateDisk(diskInfo);

    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_CreateDisk_001 end";
}

/**
 * @tc.name: Storage_Service_DiskManagerTest_DestroyDisk_001
 * @tc.desc: Verify the DestroyDisk function.
 * @tc.type: FUNC
 * @tc.require: SR000GGUOT
 */
HWTEST_F(DiskManagerTest, Storage_Service_DiskManagerTest_DestroyDisk_001, TestSize.Level1)
{
    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_DestroyDisk_001 start";

    DiskManager *diskManager = DiskManager::Instance();
    ASSERT_TRUE(diskManager != nullptr);

    char msg[1024] = { "add@/class/input/input9/mouse2\0ACTION=remove\0DEVTYPE=disk\0\
                        \0DEVPATH=/devices/platform/fe2b0000.dwmmc/*\0SUBSYSTEM=input\0SEQNUM=1064\0\
                        \0PHYSDEVPATH=/devices/pci0000:00/0000:00:1d.1/usb2/2?2/2?2:1.0\0\
                        \0PHYSDEVBUS=usb\0PHYSDEVDRIVER=usbhid\0MAJOR=13\0MINOR=34\0"};
    auto data = std::make_unique<NetlinkData>();
    data->Decode(msg);
    unsigned int major = (unsigned int) std::stoi(data.get()->GetParam("MAJOR"));
    unsigned int minor = (unsigned int) std::stoi(data.get()->GetParam("MINOR"));
    dev_t device = makedev(major, minor);
    diskManager->DestroyDisk(device);

    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_DestroyDisk_001 end";
}

/**
 * @tc.name: Storage_Service_DiskManagerTest_ChangeDisk_001
 * @tc.desc: Verify the ChangeDisk function.
 * @tc.type: FUNC
 * @tc.require: SR000GGUOT
 */
HWTEST_F(DiskManagerTest, Storage_Service_DiskManagerTest_ChangeDisk_001, TestSize.Level1)
{
    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_ChangeDisk_001 start";

    DiskManager *diskManager = DiskManager::Instance();
    ASSERT_TRUE(diskManager != nullptr);

    char msg[1024] = { "add@/class/input/input9/mouse2\0ACTION=change\0DEVTYPE=disk\0\
                        \0DEVPATH=/devices/platform/fe2b0000.dwmmc/*\0SUBSYSTEM=input\0SEQNUM=1064\0\
                        \0PHYSDEVPATH=/devices/pci0000:00/0000:00:1d.1/usb2/2?2/2?2:1.0\0\
                        \0PHYSDEVBUS=usb\0PHYSDEVDRIVER=usbhid\0MAJOR=13\0MINOR=34\0"};
    auto data = std::make_unique<NetlinkData>();
    data->Decode(msg);
    unsigned int major = std::stoi(data->GetParam("MAJOR"));
    unsigned int minor = std::stoi(data->GetParam("MINOR"));
    dev_t device = makedev(major, minor);

    diskManager->ChangeDisk(device);

    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_ChangeDisk_001 end";
}

/**
 * @tc.name: Storage_Service_DiskManagerTest_GetDisk_001
 * @tc.desc: Verify the GetDisk function.
 * @tc.type: FUNC
 * @tc.require: SR000GGUOT
 */
HWTEST_F(DiskManagerTest, Storage_Service_DiskManagerTest_GetDisk_001, TestSize.Level1)
{
    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_GetDisk_001 start";

    DiskManager *diskManager = DiskManager::Instance();
    ASSERT_TRUE(diskManager != nullptr);

    char msg[1024] = { "add@/class/input/input9/mouse2\0ACTION=add\0DEVTYPE=disk\0\
                        \0DEVPATH=/devices/platform/fe2b0000.dwmmc/*\0SUBSYSTEM=input\0SEQNUM=1064\0\
                        \0PHYSDEVPATH=/devices/pci0000:00/0000:00:1d.1/usb2/2?2/2?2:1.0\0\
                        \0PHYSDEVBUS=usb\0PHYSDEVDRIVER=usbhid\0MAJOR=13\0MINOR=34\0"};
    auto data = std::make_unique<NetlinkData>();
    data->Decode(msg);
    unsigned int major = std::stoi(data->GetParam("MAJOR"));
    unsigned int minor = std::stoi(data->GetParam("MINOR"));
    dev_t device = makedev(major, minor);

    auto diskInfo = diskManager->GetDisk(device);
    EXPECT_TRUE(diskInfo == nullptr);

    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_GetDisk_001 end";
}

/**
 * @tc.name: Storage_Service_DiskManagerTest_GetDisk_002
 * @tc.desc: Verify the GetDisk function.
 * @tc.type: FUNC
 * @tc.require: SR000GGUOT
 */
HWTEST_F(DiskManagerTest, Storage_Service_DiskManagerTest_GetDisk_002, TestSize.Level1)
{
    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_GetDisk_002 start";

    DiskManager *diskManager = DiskManager::Instance();
    ASSERT_TRUE(diskManager != nullptr);

    char msg[1024] = { "add@/class/input/input9/mouse2\0ACTION=add\0DEVTYPE=disk\0\
                        \0DEVPATH=/devices/platform/fe2b0000.dwmmc/*\0SUBSYSTEM=input\0SEQNUM=1064\0\
                        \0PHYSDEVPATH=/devices/pci0000:00/0000:00:1d.1/usb2/2?2/2?2:1.0\0\
                        \0PHYSDEVBUS=usb\0PHYSDEVDRIVER=usbhid\0MAJOR=13\0MINOR=34\0"};
    auto data = std::make_unique<NetlinkData>();
    data->Decode(msg);
    unsigned int major = std::stoi(data->GetParam("MAJOR"));
    unsigned int minor = std::stoi(data->GetParam("MINOR"));
    dev_t device = makedev(major, minor);

    auto diskInfo = diskManager->MatchConfig(data.get());
    EXPECT_TRUE(diskInfo != nullptr);
    diskManager->CreateDisk(diskInfo);
    diskInfo = diskManager->GetDisk(device);
    dev_t device1 = diskInfo->GetDevice();
    EXPECT_TRUE(device1 == device);

    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_GetDisk_002 end";
}

/**
 * @tc.name: Storage_Service_DiskManagerTest_HandleDiskEvent_001
 * @tc.desc: Verify the HandleDiskEvent function.
 * @tc.type: FUNC
 * @tc.require: SR000GGUOT
 */
HWTEST_F(DiskManagerTest, Storage_Service_DiskManagerTest_HandleDiskEvent_001, TestSize.Level1)
{
    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_HandleDiskEvent_001 start";

    DiskManager *diskManager = DiskManager::Instance();
    ASSERT_TRUE(diskManager != nullptr);

    char msg[1024] = { "add@/class/input/input9/mouse2\0ACTION=add\0DEVTYPE=disk\0\
                        \0DEVPATH=/devices/platform/fe2b0000.dwmmc/*\0SUBSYSTEM=input\0SEQNUM=1064\0\
                        \0PHYSDEVPATH=/devices/pci0000:00/0000:00:1d.1/usb2/2?2/2?2:1.0\0\
                        \0PHYSDEVBUS=usb\0PHYSDEVDRIVER=usbhid\0MAJOR=13\0MINOR=34\0"};
    auto data = std::make_unique<NetlinkData>();
    data.get()->Decode(msg);

    diskManager->HandleDiskEvent(data.get());

    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_HandleDiskEvent_001 end";
}

/**
 * @tc.name: Storage_Service_DiskManagerTest_HandleDiskEvent_002
 * @tc.desc: Verify the HandleDiskEvent function.
 * @tc.type: FUNC
 * @tc.require: SR000GGUOT
 */
HWTEST_F(DiskManagerTest, Storage_Service_DiskManagerTest_HandleDiskEvent_002, TestSize.Level1)
{
    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_HandleDiskEvent_002 start";

    DiskManager *diskManager = DiskManager::Instance();
    ASSERT_TRUE(diskManager != nullptr);

    char msg[1024] = { "add@/class/input/input9/mouse2\0ACTION=change\0DEVTYPE=disk\0\
                        \0DEVPATH=/devices/platform/fe2b0000.dwmmc/*\0SUBSYSTEM=input\0SEQNUM=1064\0\
                        \0PHYSDEVPATH=/devices/pci0000:00/0000:00:1d.1/usb2/2?2/2?2:1.0\0\
                        \0PHYSDEVBUS=usb\0PHYSDEVDRIVER=usbhid\0MAJOR=13\0MINOR=34\0"};
    auto data = std::make_unique<NetlinkData>();
    data.get()->Decode(msg);

    diskManager->HandleDiskEvent(data.get());

    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_HandleDiskEvent_002 end";
}

/**
 * @tc.name: Storage_Service_DiskManagerTest_HandleDiskEvent_003
 * @tc.desc: Verify the HandleDiskEvent function.
 * @tc.type: FUNC
 * @tc.require: SR000GGUOT
 */
HWTEST_F(DiskManagerTest, Storage_Service_DiskManagerTest_HandleDiskEvent_003, TestSize.Level1)
{
    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_HandleDiskEvent_003 start";

    DiskManager *diskManager = DiskManager::Instance();
    ASSERT_TRUE(diskManager != nullptr);

    char msg[1024] = { "add@/class/input/input9/mouse2\0ACTION=remove\0DEVTYPE=disk\0\
                        \0DEVPATH=/devices/platform/fe2b0000.dwmmc/*\0SUBSYSTEM=input\0SEQNUM=1064\0\
                        \0PHYSDEVPATH=/devices/pci0000:00/0000:00:1d.1/usb2/2?2/2?2:1.0\0\
                        \0PHYSDEVBUS=usb\0PHYSDEVDRIVER=usbhid\0MAJOR=13\0MINOR=34\0"};
    auto data = std::make_unique<NetlinkData>();
    data.get()->Decode(msg);

    diskManager->HandleDiskEvent(data.get());

    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_HandleDiskEvent_003 end";
}

/**
 * @tc.name: Storage_Service_DiskManagerTest_AddDiskConfig_001
 * @tc.desc: Verify the AddDiskConfig function.
 * @tc.type: FUNC
 * @tc.require: SR000GGUOT
 */
HWTEST_F(DiskManagerTest, Storage_Service_DiskManagerTest_AddDiskConfig_001, TestSize.Level1)
{
    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_AddDiskConfig_001 start";

    DiskManager *diskManager = DiskManager::Instance();
    ASSERT_TRUE(diskManager != nullptr);

    std::string sysPattern = "/devices/platform/fe2b0000.dwmmc/*";
    std::string lable = "disk";
    int flag = 0;
    auto diskConfig = std::make_shared<DiskConfig>(sysPattern, lable, flag);
    diskManager->AddDiskConfig(diskConfig);
    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_AddDiskConfig_001 end";
}

/**
 * @tc.name: Storage_Service_DiskManagerTest_ReplayUevent_001
 * @tc.desc: Verify the ReplayUevent function.
 * @tc.type: FUNC
 * @tc.require: SR000GGUOT
 */
HWTEST_F(DiskManagerTest, Storage_Service_DiskManagerTest_ReplayUevent_001, TestSize.Level1)
{
    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_ReplayUevent_001 start";

    DiskManager *diskManager = DiskManager::Instance();
    ASSERT_TRUE(diskManager != nullptr);

    diskManager->ReplayUevent();

    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_ReplayUevent_001 end";
}

/**
 * @tc.name: Storage_Service_DiskManagerTest_MatchConfig_001
 * @tc.desc: Verify the MatchConfig function.
 * @tc.type: FUNC
 * @tc.require: SR000GGUOT
 */
HWTEST_F(DiskManagerTest, Storage_Service_DiskManagerTest_MatchConfig_001, TestSize.Level1)
{
    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_MatchConfig_001 start";

    DiskManager *diskManager = DiskManager::Instance();
    ASSERT_TRUE(diskManager != nullptr);

    char msg[1024] = { "add@/class/input/input9/mouse2\0ACTION=add\0DEVTYPE=disk\0\
                        \0DEVPATH=/class/input/input9/mouse2\0SUBSYSTEM=input\0SEQNUM=1064\0\
                        \0PHYSDEVPATH=/devices/pci0000:00/0000:00:1d.1/usb2/2?2/2?2:1.0\0\
                        \0PHYSDEVBUS=usb\0PHYSDEVDRIVER=usbhid\0MAJOR=13\0MINOR=34\0"};
    auto data = std::make_unique<NetlinkData>();
    data->Decode(msg);
    auto diskInfo = diskManager->MatchConfig(data.get());
    ASSERT_TRUE(diskInfo == nullptr);

    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_MatchConfig_001 end";
}

/**
 * @tc.name: Storage_Service_DiskManagerTest_MatchConfig_002
 * @tc.desc: Verify the MatchConfig function.
 * @tc.type: FUNC
 * @tc.require: SR000GGUOT
 */
HWTEST_F(DiskManagerTest, Storage_Service_DiskManagerTest_MatchConfig_002, TestSize.Level1)
{
    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_MatchConfig_002 start";

    DiskManager *diskManager = DiskManager::Instance();
    ASSERT_TRUE(diskManager != nullptr);

    char msg[1024] = { "add@/class/input/input9/mouse2\0ACTION=add\0DEVTYPE=disk\0\
                        \0DEVPATH=/devices/platform/fe2b0000.dwmmc/*\0SUBSYSTEM=input\0SEQNUM=1064\0\
                        \0PHYSDEVPATH=/devices/pci0000:00/0000:00:1d.1/usb2/2?2/2?2:1.0\0\
                        \0PHYSDEVBUS=usb\0PHYSDEVDRIVER=usbhid\0MAJOR=13\0MINOR=34\0"};
    auto data = std::make_unique<NetlinkData>();
    data.get()->Decode(msg);

    auto diskInfo1 = diskManager->MatchConfig(data.get());

    EXPECT_TRUE(diskInfo1 != nullptr);

    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_MatchConfig_002 end";
}

/**
 * @tc.name: Storage_Service_DiskManagerTest_HandlePartition_001
 * @tc.desc: Verify the HandlePartition function.
 * @tc.type: FUNC
 * @tc.require: SR000GGUOT
 */
HWTEST_F(DiskManagerTest, Storage_Service_DiskManagerTest_HandlePartition_001, TestSize.Level1)
{
    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_HandlePartition_001 start";

    DiskManager *diskManager = DiskManager::Instance();
    ASSERT_TRUE(diskManager != nullptr);

    MessageParcel data;
    std::string diskId = data.ReadString();
    int ret = diskManager->HandlePartition(diskId);
    EXPECT_TRUE(ret == E_NON_EXIST);

    GTEST_LOG_(INFO) << "Storage_Service_DiskManagerTest_HandlePartition_001 end";
}
} // STORAGE_DAEMON
} // OHOS
