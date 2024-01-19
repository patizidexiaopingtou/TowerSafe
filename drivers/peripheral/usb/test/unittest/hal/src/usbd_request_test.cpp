/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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

#include "usbd_request_test.h"

#include <iostream>
#include <vector>

#include "UsbSubscriberTest.h"
#include "hdf_log.h"
#include "v1_0/iusb_interface.h"
#include "v1_0/usb_types.h"

const int SLEEP_TIME = 3;
const uint8_t INDEX_0 = 0;
const uint8_t INDEX_1 = 1;
const uint8_t INDEX_255 = 255;
const uint8_t CONFIG_ID_0 = 0;
const uint8_t CONFIG_ID_1 = 1;
const uint8_t CONFIG_ID_222 = 222;
const uint8_t BUS_NUM_255 = 255;
const uint8_t DEV_ADDR_255 = 255;
const uint8_t BUS_NUM_222 = 222;
const uint8_t STRING_ID_233 = 233;
const uint8_t DEV_ADDR_222 = 222;
const uint32_t LENGTH_NUM_255 = 255;
const uint32_t TAG_LENGTH_NUM_1000 = 1000;
const int TAG_NUM_10 = 10;
const int TAG_NUM_11 = 11;
const uint8_t INTERFACEID_1 = 1;
const uint8_t INTERFACEID_255 = 255;
const int32_t INT32_INTERFACEID_1 = 1;
const int32_t INT32_INTERFACEID_255 = 255;
const uint8_t POINTID_1 = 1;
const uint8_t POINTID_129 = 130;
const uint8_t POINTID_158 = 158;
const uint8_t POINTID_255 = 255;
const uint8_t POINTID_BULK_IN = 0x82;
const uint8_t POINTID_BULK_OUT = 0x01;
UsbDev UsbdRequestTest::dev_ = {0, 0};

using namespace testing::ext;
using namespace OHOS;
using namespace OHOS::USB;
using namespace std;
using namespace OHOS::HDI::Usb::V1_0;

namespace {
sptr<IUsbInterface> g_usbInterface = nullptr;

void UsbdRequestTest::SetUpTestCase(void)
{
    g_usbInterface = IUsbInterface::Get();
    if (g_usbInterface == nullptr) {
        HDF_LOGE("%{public}s:IUsbInterface::Get() failed.", __func__);
        exit(0);
    }
    auto ret = g_usbInterface->SetPortRole(1, 1, 1);
    sleep(SLEEP_TIME);
    HDF_LOGI("UsbdRequestTest::[Device] %{public}d SetPortRole=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    if (ret != 0) {
        exit(0);
    }

    sptr<UsbSubscriberTest> subscriber = new UsbSubscriberTest();
    if (g_usbInterface->BindUsbdSubscriber(subscriber) != HDF_SUCCESS) {
        HDF_LOGE("%{public}s: bind usbd subscriber failed", __func__);
        exit(0);
    }

    std::cout << "please connect device, press enter to continue" << std::endl;
    int c;
    while ((c = getchar()) != '\n' && c != EOF) {}
    dev_ = {subscriber->busNum_, subscriber->devAddr_};

    ret = g_usbInterface->OpenDevice(dev_);
    HDF_LOGI("UsbdRequestTest:: %{public}d OpenDevice=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
}

void UsbdRequestTest::TearDownTestCase(void)
{
    sptr<UsbSubscriberTest> subscriber = new UsbSubscriberTest();
    if (g_usbInterface->BindUsbdSubscriber(subscriber) != HDF_SUCCESS) {
        HDF_LOGE("%{public}s: bind usbd subscriber failed", __func__);
        exit(0);
    }
    dev_ = {subscriber->busNum_, subscriber->devAddr_};
    auto ret = g_usbInterface->CloseDevice(dev_);
    HDF_LOGI("UsbdRequestTest:: %{public}d Close=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
}

void UsbdRequestTest::SetUp(void) {}

void UsbdRequestTest::TearDown(void) {}

/**
 * @tc.name: UsbdConfig001
 * @tc.desc: Test functions to SetConfig
 * @tc.desc: int32_t SetConfig(const UsbDev &dev, uint8_t configIndex);
 * @tc.desc: Positive test: parameters correctly
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdSetConfig001, TestSize.Level1)
{
    uint8_t configIndex = INDEX_1;
    struct UsbDev dev = dev_;
    auto ret = g_usbInterface->SetConfig(dev, configIndex);
    HDF_LOGI("UsbdRequestTest::UsbdSetConfigConfig001 %{public}d SetConfig=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdConfig002
 * @tc.desc: Test functions to SetConfig
 * @tc.desc: int32_t SetConfig(const UsbDev &dev, uint8_t configIndex);
 * @tc.desc: Negative test: parameters exception, busNum error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdSetConfig002, TestSize.Level1)
{
    uint8_t configIndex = INDEX_1;
    struct UsbDev dev = {BUS_NUM_222, dev_.devAddr};
    auto ret = g_usbInterface->SetConfig(dev, configIndex);
    HDF_LOGI("UsbdRequestTest::UsbdSetConfig002 %{public}d SetConfig=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdConfig003
 * @tc.desc: Test functions to SetConfig
 * @tc.desc: int32_t SetConfig(const UsbDev &dev, uint8_t configIndex);
 * @tc.desc: Negative test: parameters exception, devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdSetConfig003, TestSize.Level1)
{
    uint8_t configIndex = INDEX_1;
    struct UsbDev dev = {dev_.busNum, DEV_ADDR_222};
    auto ret = g_usbInterface->SetConfig(dev, configIndex);
    HDF_LOGI("UsbdRequestTest::UsbdSetConfig003 %{public}d SetConfig=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdConfig004
 * @tc.desc: Test functions to SetConfig
 * @tc.desc: int32_t SetConfig(const UsbDev &dev, uint8_t configIndex);
 * @tc.desc: Negative test: parameters exception, configIndex error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdSetConfig004, TestSize.Level1)
{
    uint8_t configIndex = INDEX_255;
    struct UsbDev dev = dev_;
    auto ret = g_usbInterface->SetConfig(dev, configIndex);
    ASSERT_NE(ret, 0);
    configIndex = INDEX_1;
    ret = g_usbInterface->SetConfig(dev, configIndex);
    HDF_LOGI("UsbdRequestTest::UsbdSetConfig004 %{public}d SetConfig=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdConfig005
 * @tc.desc: Test functions to SetConfig
 * @tc.desc: int32_t SetConfig(const UsbDev &dev, uint8_t configIndex);
 * @tc.desc: Negative test: parameters exception, busNum && devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdSetConfig005, TestSize.Level1)
{
    uint8_t configIndex = INDEX_1;
    struct UsbDev dev = {BUS_NUM_222, DEV_ADDR_222};
    auto ret = g_usbInterface->SetConfig(dev, configIndex);
    HDF_LOGI("UsbdRequestTest::UsbdSetConfig005 %{public}d SetConfig=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdConfig006
 * @tc.desc: Test functions to SetConfig
 * @tc.desc: int32_t SetConfig(const UsbDev &dev, uint8_t configIndex);
 * @tc.desc: Negative test: parameters exception, busNum && configIndex error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdSetConfig006, TestSize.Level1)
{
    uint8_t configIndex = INDEX_255;
    struct UsbDev dev = {BUS_NUM_222, dev_.devAddr};
    auto ret = g_usbInterface->SetConfig(dev, configIndex);
    HDF_LOGI("UsbdRequestTest::UsbdSetConfig006 %{public}d SetConfig=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdConfig007
 * @tc.desc: Test functions to SetConfig
 * @tc.desc: int32_t SetConfig(const UsbDev &dev, uint8_t configIndex);
 * @tc.desc: Negative test: parameters exception, devAddr && configIndex error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdSetConfig007, TestSize.Level1)
{
    uint8_t configIndex = INDEX_255;
    struct UsbDev dev = {dev_.busNum, DEV_ADDR_222};
    auto ret = g_usbInterface->SetConfig(dev, configIndex);
    HDF_LOGI("UsbdRequestTest::UsbdSetConfig007 %{public}d SetConfig=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdConfig008
 * @tc.desc: Test functions to SetConfig
 * @tc.desc: int32_t SetConfig(const UsbDev &dev, uint8_t configIndex);
 * @tc.desc: Negative test: parameters exception, busNum && devAddr && configIndex error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdSetConfig008, TestSize.Level1)
{
    uint8_t configIndex = INDEX_255;
    struct UsbDev dev = {BUS_NUM_222, DEV_ADDR_222};
    auto ret = g_usbInterface->SetConfig(dev, configIndex);
    HDF_LOGI("UsbdRequestTest::UsbdSetConfig008 %{public}d SetConfig=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**********************************************************************************************************/

/**
 * @tc.name: UsbdConfig001
 * @tc.desc: Test functions to GetConfig
 * @tc.desc: int32_t GetConfig(const UsbDev &dev, uint8_t &configIndex);
 * @tc.desc: Positive test: parameters correctly
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetConfig001, TestSize.Level1)
{
    uint8_t configIndex = INDEX_1;
    struct UsbDev dev = dev_;
    auto ret = g_usbInterface->GetConfig(dev, configIndex);
    HDF_LOGI("UsbdRequestTest::UsbdGetConfig001 %{public}d GetConfig=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdConfig002
 * @tc.desc: Test functions to GetConfig
 * @tc.desc: int32_t GetConfig(const UsbDev &dev, uint8_t &configIndex);
 * @tc.desc: Negative test: parameters exception, busNum error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetConfig002, TestSize.Level1)
{
    uint8_t configIndex = INDEX_1;
    struct UsbDev dev = {BUS_NUM_222, dev_.devAddr};
    auto ret = g_usbInterface->GetConfig(dev, configIndex);
    HDF_LOGI("UsbdRequestTest::UsbdGetConfig002 %{public}d GetConfig=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdConfig003
 * @tc.desc: Test functions to GetConfig
 * @tc.desc: int32_t GetConfig(const UsbDev &dev, uint8_t &configIndex);
 * @tc.desc: Negative test: parameters exception, devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetConfig003, TestSize.Level1)
{
    uint8_t configIndex = INDEX_1;
    struct UsbDev dev = {dev_.busNum, DEV_ADDR_222};
    auto ret = g_usbInterface->GetConfig(dev, configIndex);
    HDF_LOGI("UsbdRequestTest::UsbdGetConfig003 %{public}d GetConfig=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdConfig004
 * @tc.desc: Test functions to GetConfig
 * @tc.desc: int32_t GetConfig(const UsbDev &dev, uint8_t &configIndex);
 * @tc.desc: Negative test: parameters exception, busNum && devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetConfig004, TestSize.Level1)
{
    uint8_t configIndex = INDEX_1;
    struct UsbDev dev = {BUS_NUM_222, DEV_ADDR_222};
    auto ret = g_usbInterface->GetConfig(dev, configIndex);
    HDF_LOGI("UsbdRequestTest::UsbdGetConfig004 %{public}d GetConfig=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdClaimInterface001
 * @tc.desc: Test functions to ClaimInterface
 * @tc.desc: int32_t  ClaimInterface(const UsbDev &dev, uint8_t interfaceId);
 * @tc.desc: Positive test: parameters correctly
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdClaimInterface001, TestSize.Level1)
{
    uint8_t interfaceId = INTERFACEID_1;
    struct UsbDev dev = dev_;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdClaimInterface001 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdClaimInterface002
 * @tc.desc: Test functions to ClaimInterface
 * @tc.desc: int32_t  ClaimInterface(const UsbDev &dev, uint8_t interfaceId);
 * @tc.desc: Negative test: parameters exception, busNum error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdClaimInterface002, TestSize.Level1)
{
    uint8_t interfaceId = INTERFACEID_1;
    struct UsbDev dev = dev_;
    dev.busNum = 20;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdClaimInterface002 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdClaimInterface003
 * @tc.desc: Test functions to ClaimInterface
 * @tc.desc: int32_t  ClaimInterface(const UsbDev &dev, uint8_t interfaceId);
 * @tc.desc: Negative test: parameters exception, devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdClaimInterface003, TestSize.Level1)
{
    uint8_t interfaceId = INTERFACEID_1;
    struct UsbDev dev = {dev_.busNum, DEV_ADDR_255};
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdClaimInterface003 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdClaimInterface004
 * @tc.desc: Test functions to ClaimInterface
 * @tc.desc: int32_t  ClaimInterface(const UsbDev &dev, uint8_t interfaceId);
 * @tc.desc: Negative test: parameters exception, interfaceid error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdClaimInterface004, TestSize.Level1)
{
    uint8_t interfaceId = INTERFACEID_1;
    struct UsbDev dev = dev_;
    interfaceId = INTERFACEID_255;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdClaimInterface004 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdClaimInterface005
 * @tc.desc: Test functions to ClaimInterface
 * @tc.desc: int32_t  ClaimInterface(const UsbDev &dev, uint8_t interfaceId);
 * @tc.desc: Negative test: parameters exception, busNum && devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdClaimInterface005, TestSize.Level1)
{
    uint8_t interfaceId = INTERFACEID_1;
    struct UsbDev dev = {BUS_NUM_255, DEV_ADDR_255};
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdClaimInterface005 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdClaimInterface006
 * @tc.desc: Test functions to ClaimInterface
 * @tc.desc: int32_t  ClaimInterface(const UsbDev &dev, uint8_t interfaceId);
 * @tc.desc: Negative test: parameters exception, busNum && interfaceid error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdClaimInterface006, TestSize.Level1)
{
    uint8_t interfaceId = INTERFACEID_255;
    struct UsbDev dev = {BUS_NUM_255, dev_.devAddr};
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdClaimInterface006 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdClaimInterface007
 * @tc.desc: Test functions to ClaimInterface
 * @tc.desc: int32_t  ClaimInterface(const UsbDev &dev, uint8_t interfaceId);
 * @tc.desc: Negative test: parameters exception, devAddr && interfaceid error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdClaimInterface007, TestSize.Level1)
{
    uint8_t interfaceId = INTERFACEID_255;
    struct UsbDev dev = {dev_.busNum, DEV_ADDR_255};
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdClaimInterface007 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdClaimInterface008
 * @tc.desc: Test functions to ClaimInterface
 * @tc.desc: int32_t  ClaimInterface(const UsbDev &dev, uint8_t interfaceId);
 * @tc.desc: Negative test: parameters exception, busNum && devAddr && interfaceid error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdClaimInterface008, TestSize.Level1)
{
    uint8_t interfaceId = INTERFACEID_255;
    struct UsbDev dev = {BUS_NUM_255, DEV_ADDR_255};
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdClaimInterface008 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**********************************************************************************************************/

/**
 * @tc.name: UsbdSetInterface001
 * @tc.desc: Test functions to SetInterface
 * @tc.desc: int32_t SetInterface(const UsbDev &dev, uint8_t interfaceId, uint8_t altIndex);
 * @tc.desc: Positive test: parameters correctly
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdSetInterface001, TestSize.Level1)
{
    uint8_t interfaceId = INTERFACEID_1;
    uint8_t altIndex = INDEX_0;
    struct UsbDev dev = dev_;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdClaimInterface001 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    ret = g_usbInterface->SetInterface(dev, interfaceId, altIndex);
    HDF_LOGI("UsbdRequestTest::UsbdSetInterface001 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdSetInterface002
 * @tc.desc: Test functions to SetInterface
 * @tc.desc: int32_t SetInterface(const UsbDev &dev, uint8_t interfaceId, uint8_t altIndex);
 * @tc.desc: Negative test: parameters exception, busNum error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdSetInterface002, TestSize.Level1)
{
    uint8_t interfaceId = INTERFACEID_1;
    uint8_t altIndex = INDEX_0;
    struct UsbDev dev = dev_;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdSetInterface002 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    dev.busNum = BUS_NUM_222;
    ret = g_usbInterface->SetInterface(dev, interfaceId, altIndex);
    HDF_LOGI("UsbdRequestTest::UsbdSetInterface002 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdSetInterface003
 * @tc.desc: Test functions to SetInterface
 * @tc.desc: int32_t SetInterface(const UsbDev &dev, uint8_t interfaceId, uint8_t altIndex);
 * @tc.desc: Negative test: parameters exception, devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdSetInterface003, TestSize.Level1)
{
    uint8_t interfaceId = INTERFACEID_1;
    uint8_t altIndex = INDEX_255;
    struct UsbDev dev = dev_;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdSetInterface003 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    dev.devAddr = DEV_ADDR_222;
    ret = g_usbInterface->SetInterface(dev, interfaceId, altIndex);
    HDF_LOGI("UsbdRequestTest::UsbdSetInterface003 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdSetInterface004
 * @tc.desc: Test functions to SetInterface
 * @tc.desc: int32_t SetInterface(const UsbDev &dev, uint8_t interfaceId, uint8_t altIndex);
 * @tc.desc: Negative test: parameters exception, interfaceId error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdSetInterface004, TestSize.Level1)
{
    uint8_t interfaceId = INTERFACEID_1;
    uint8_t altIndex = INDEX_255;
    struct UsbDev dev = dev_;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdSetInterface004 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    interfaceId = INTERFACEID_255;
    ret = g_usbInterface->SetInterface(dev, interfaceId, altIndex);
    HDF_LOGI("UsbdRequestTest::UsbdSetInterface004 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdSetInterface005
 * @tc.desc: Test functions to SetInterface
 * @tc.desc: int32_t SetInterface(const UsbDev &dev, uint8_t interfaceId, uint8_t altIndex);
 * @tc.desc: Negative test: parameters exception, busNum && devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdSetInterface005, TestSize.Level1)
{
    uint8_t interfaceId = INTERFACEID_1;
    uint8_t altIndex = INDEX_0;
    struct UsbDev dev = dev_;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdSetInterface005 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    dev.busNum = BUS_NUM_222;
    dev.devAddr = DEV_ADDR_222;
    ret = g_usbInterface->SetInterface(dev, interfaceId, altIndex);
    HDF_LOGI("UsbdRequestTest::UsbdSetInterface005 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdSetInterface006
 * @tc.desc: Test functions to SetInterface
 * @tc.desc: int32_t SetInterface(const UsbDev &dev, uint8_t interfaceId, uint8_t altIndex);
 * @tc.desc: Negative test: parameters exception, busNum && interfaceId error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdSetInterface006, TestSize.Level1)
{
    int32_t interfaceId = INT32_INTERFACEID_1;
    uint8_t altIndex = INDEX_1;
    struct UsbDev dev = dev_;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdSetInterface006 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    dev.busNum = BUS_NUM_255;
    interfaceId = INT32_INTERFACEID_255;
    ret = g_usbInterface->SetInterface(dev, interfaceId, altIndex);
    HDF_LOGI("UsbdRequestTest::UsbdSetInterface006 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdSetInterface007
 * @tc.desc: Test functions to SetInterface
 * @tc.desc: int32_t SetInterface(const UsbDev &dev, uint8_t interfaceId, uint8_t altIndex);
 * @tc.desc: Negative test: parameters exception, devAddr && interfaceId error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdSetInterface007, TestSize.Level1)
{
    int32_t interfaceId = INT32_INTERFACEID_1;
    uint8_t altIndex = INDEX_255;
    struct UsbDev dev = dev_;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdSetInterface007 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    dev.devAddr = DEV_ADDR_255;
    interfaceId = INT32_INTERFACEID_255;
    ret = g_usbInterface->SetInterface(dev, interfaceId, altIndex);
    HDF_LOGI("UsbdRequestTest::UsbdSetInterface007 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdSetInterface008
 * @tc.desc: Test functions to SetInterface
 * @tc.desc: int32_t SetInterface(const UsbDev &dev, uint8_t interfaceId, uint8_t altIndex);
 * @tc.desc: Negative test: parameters exception, busNum && devAddr && interfaceId error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdSetInterface008, TestSize.Level1)
{
    uint8_t altIndex = INDEX_255;
    int32_t interfaceId = INT32_INTERFACEID_1;
    struct UsbDev dev = dev_;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdSetInterface008 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    dev.busNum = BUS_NUM_255;
    dev.devAddr = DEV_ADDR_255;
    interfaceId = INT32_INTERFACEID_255;
    ret = g_usbInterface->SetInterface(dev, interfaceId, altIndex);
    HDF_LOGI("UsbdRequestTest::UsbdSetInterface008 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdDescriptor001
 * @tc.desc: Test functions to GetDeviceDescriptor
 * @tc.desc: int32_t GetDeviceDescriptor(const UsbDev &dev, std::vector<uint8_t> &descriptor);
 * @tc.desc: Positive test: parameters correctly
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetDeviceDescriptor001, TestSize.Level1)
{
    uint32_t length = LENGTH_NUM_255;
    uint8_t buffer[LENGTH_NUM_255] = {0};
    struct UsbDev dev = dev_;
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetDeviceDescriptor(dev, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetDeviceDescriptor001 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdDescriptor002
 * @tc.desc: Test functions to GetDeviceDescriptor
 * @tc.desc: int32_t GetDeviceDescriptor(const UsbDev &dev, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, busNum error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetDeviceDescriptor002, TestSize.Level1)
{
    uint8_t buffer[LENGTH_NUM_255] = {0};
    uint32_t length = LENGTH_NUM_255;
    struct UsbDev dev = {BUS_NUM_222, dev_.devAddr};
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetDeviceDescriptor(dev, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetDeviceDescriptor002 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdDescriptor003
 * @tc.desc: Test functions to GetDeviceDescriptor
 * @tc.desc: int32_t GetDeviceDescriptor(const UsbDev &dev, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetDeviceDescriptor003, TestSize.Level1)
{
    uint8_t devAddr = DEV_ADDR_222;
    uint8_t buffer[LENGTH_NUM_255] = {0};
    uint32_t length = LENGTH_NUM_255;
    struct UsbDev dev = {dev_.busNum, devAddr};
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetDeviceDescriptor(dev, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetDeviceDescriptor003 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdDescriptor004
 * @tc.desc: Test functions to GetDeviceDescriptor
 * @tc.desc: int32_t GetDeviceDescriptor(const UsbDev &dev, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, length error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetDeviceDescriptor004, TestSize.Level1)
{
    uint8_t buffer[LENGTH_NUM_255] = {};
    uint32_t length = 0;
    struct UsbDev dev = dev_;
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetDeviceDescriptor(dev, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetDeviceDescriptor004 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdDescriptor005
 * @tc.desc: Test functions to GetDeviceDescriptor
 * @tc.desc: int32_t GetDeviceDescriptor(const UsbDev &dev, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, busNum && devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetDeviceDescriptor005, TestSize.Level1)
{
    uint8_t busNum = BUS_NUM_222;
    uint8_t devAddr = DEV_ADDR_222;
    uint8_t buffer[LENGTH_NUM_255] = {};
    uint32_t length = LENGTH_NUM_255;
    struct UsbDev dev = {busNum, devAddr};
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetDeviceDescriptor(dev, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetDeviceDescriptor005 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdDescriptor006
 * @tc.desc: Test functions to GetDeviceDescriptor
 * @tc.desc: int32_t GetDeviceDescriptor(const UsbDev &dev, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, busNum && length error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetDeviceDescriptor006, TestSize.Level1)
{
    uint8_t buffer[LENGTH_NUM_255] = {};
    uint32_t length = 0;
    struct UsbDev dev = {BUS_NUM_222, dev_.devAddr};
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetDeviceDescriptor(dev, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetDeviceDescriptor006 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdDescriptor007
 * @tc.desc: Test functions to GetDeviceDescriptor
 * @tc.desc: int32_t GetDeviceDescriptor(const UsbDev &dev, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, devAddr && length error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetDeviceDescriptor007, TestSize.Level1)
{
    uint8_t buffer[] = {};
    uint32_t length = 0;
    struct UsbDev dev = {dev_.busNum, DEV_ADDR_222};
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetDeviceDescriptor(dev, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetDeviceDescriptor007 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdDescriptor008
 * @tc.desc: Test functions to GetDeviceDescriptor
 * @tc.desc: int32_t GetDeviceDescriptor(const UsbDev &dev, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, busNum && devAddr && length error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetDeviceDescriptor008, TestSize.Level1)
{
    uint8_t busNum = BUS_NUM_222;
    uint8_t devAddr = DEV_ADDR_222;
    uint8_t buffer[] = {};
    uint32_t length = 0;
    struct UsbDev dev = {busNum, devAddr};
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetDeviceDescriptor(dev, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetDeviceDescriptor008 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_NE(ret, 0);
}

/**********************************************************************************************************/

/**
 * @tc.name: UsbdDescriptor001
 * @tc.desc: Test functions to GetStringDescriptor
 * @tc.desc: int32_t GetStringDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &descriptor);
 * @tc.desc: Positive test: parameters correctly
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetStringDescriptor001, TestSize.Level1)
{
    uint8_t stringId = 0;
    uint8_t buffer[LENGTH_NUM_255] = {0};
    uint32_t length = LENGTH_NUM_255;
    struct UsbDev dev = dev_;
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetStringDescriptor(dev, stringId, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetStringDescriptor001 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdDescriptor002
 * @tc.desc: Test functions to GetStringDescriptor
 * @tc.desc: int32_t GetStringDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, busNum error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetStringDescriptor002, TestSize.Level1)
{
    uint8_t stringId = 1;
    uint8_t buffer[LENGTH_NUM_255] = {0};
    uint32_t length = LENGTH_NUM_255;
    struct UsbDev dev = dev_;
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetStringDescriptor(dev, stringId, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetStringDescriptor002 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdDescriptor003
 * @tc.desc: Test functions to GetStringDescriptor
 * @tc.desc: int32_t GetStringDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, stringId error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetStringDescriptor003, TestSize.Level1)
{
    uint8_t stringId = 222;
    uint8_t buffer[LENGTH_NUM_255] = {0};
    uint32_t length = LENGTH_NUM_255;
    struct UsbDev dev = dev_;
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetStringDescriptor(dev, stringId, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetStringDescriptor003 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdDescriptor004
 * @tc.desc: Test functions to GetStringDescriptor
 * @tc.desc: int32_t GetStringDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetStringDescriptor004, TestSize.Level1)
{
    uint8_t stringId = 0;
    uint8_t buffer[LENGTH_NUM_255] = {0};
    uint32_t length = 8;
    struct UsbDev dev = {dev_.busNum, DEV_ADDR_255};
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetStringDescriptor(dev, stringId, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetStringDescriptor004 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdDescriptor005
 * @tc.desc: Test functions to GetStringDescriptor
 * @tc.desc: int32_t GetStringDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, busNum && devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetStringDescriptor005, TestSize.Level1)
{
    uint8_t stringId = 0;
    uint8_t buffer[LENGTH_NUM_255] = {0};
    uint32_t length = 8;
    struct UsbDev dev = {BUS_NUM_222, DEV_ADDR_222};
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetStringDescriptor(dev, stringId, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetStringDescriptor005 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdDescriptor006
 * @tc.desc: Test functions to GetStringDescriptor
 * @tc.desc: int32_t GetStringDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, busNum error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetStringDescriptor006, TestSize.Level1)
{
    uint8_t stringId = 0;
    uint8_t buffer[LENGTH_NUM_255] = {0};
    uint32_t length = LENGTH_NUM_255;
    struct UsbDev dev = {BUS_NUM_222, dev_.devAddr};
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetStringDescriptor(dev, stringId, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetStringDescriptor006 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdDescriptor007
 * @tc.desc: Test functions to GetStringDescriptor
 * @tc.desc: int32_t GetStringDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, devAddr && stringID error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetStringDescriptor007, TestSize.Level1)
{
    uint8_t stringId = STRING_ID_233;
    uint8_t buffer[LENGTH_NUM_255] = {0};
    uint32_t length = LENGTH_NUM_255;
    struct UsbDev dev = {dev_.busNum, DEV_ADDR_222};
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetStringDescriptor(dev, stringId, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetStringDescriptor007 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdDescriptor008
 * @tc.desc: Test functions to GetStringDescriptor
 * @tc.desc: int32_t GetStringDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, busNum && devAddr && stringID error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetStringDescriptor008, TestSize.Level1)
{
    uint8_t stringId = STRING_ID_233;
    uint8_t buffer[LENGTH_NUM_255] = {0};
    uint32_t length = LENGTH_NUM_255;
    struct UsbDev dev = {BUS_NUM_222, DEV_ADDR_222};
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetStringDescriptor(dev, stringId, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetStringDescriptor008 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_NE(ret, 0);
}

/**********************************************************************************************************/

/**
 * @tc.name: UsbdDescriptor001
 * @tc.desc: Test functions to GetConfigDescriptor
 * @tc.desc: int32_t GetConfigDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &descriptor);
 * @tc.desc: Positive test: parameters correctly
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetConfigDescriptor001, TestSize.Level1)
{
    uint8_t configId = CONFIG_ID_0;
    uint8_t buffer[LENGTH_NUM_255] = {};
    uint32_t length = LENGTH_NUM_255;
    struct UsbDev dev = dev_;
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetConfigDescriptor(dev, configId, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetConfigDescriptor001 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdDescriptor002
 * @tc.desc: Test functions to GetConfigDescriptor
 * @tc.desc: int32_t GetConfigDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, busNum error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetConfigDescriptor002, TestSize.Level1)
{
    uint8_t configId = CONFIG_ID_1;
    uint8_t buffer[LENGTH_NUM_255] = {};
    uint32_t length = LENGTH_NUM_255;
    struct UsbDev dev = {BUS_NUM_222, dev_.devAddr};
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetConfigDescriptor(dev, configId, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetConfigDescriptor002 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdDescriptor003
 * @tc.desc: Test functions to GetConfigDescriptor
 * @tc.desc: int32_t GetConfigDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetConfigDescriptor003, TestSize.Level1)
{
    uint8_t configId = CONFIG_ID_1;
    uint8_t buffer[LENGTH_NUM_255] = {};
    uint32_t length = LENGTH_NUM_255;
    struct UsbDev dev = {dev_.busNum, DEV_ADDR_222};
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetConfigDescriptor(dev, configId, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetConfigDescriptor003 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdDescriptor004
 * @tc.desc: Test functions to GetConfigDescriptor
 * @tc.desc: int32_t GetConfigDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, configId error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetConfigDescriptor004, TestSize.Level1)
{
    uint8_t configId = CONFIG_ID_1;
    uint8_t buffer[LENGTH_NUM_255] = {};
    uint32_t length = LENGTH_NUM_255;
    struct UsbDev dev = dev_;
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetConfigDescriptor(dev, configId, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetConfigDescriptor004 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdDescriptor005
 * @tc.desc: Test functions to GetConfigDescriptor
 * @tc.desc: int32_t GetConfigDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, busNum && devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetConfigDescriptor005, TestSize.Level1)
{
    uint8_t configId = CONFIG_ID_1;
    uint8_t buffer[LENGTH_NUM_255] = {};
    uint32_t length = LENGTH_NUM_255;
    struct UsbDev dev = {BUS_NUM_222, DEV_ADDR_222};
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetConfigDescriptor(dev, configId, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetConfigDescriptor005 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdDescriptor006
 * @tc.desc: Test functions to GetConfigDescriptor
 * @tc.desc: int32_t GetConfigDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, busNum && configId error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetConfigDescriptor006, TestSize.Level1)
{
    uint8_t configId = CONFIG_ID_222;
    uint8_t buffer[LENGTH_NUM_255] = {0};
    uint32_t length = LENGTH_NUM_255;
    struct UsbDev dev = {BUS_NUM_222, dev_.devAddr};
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetConfigDescriptor(dev, configId, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetConfigDescriptor006 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdDescriptor007
 * @tc.desc: Test functions to GetConfigDescriptor
 * @tc.desc: int32_t GetConfigDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, devAddr && configId error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetConfigDescriptor007, TestSize.Level1)
{
    uint8_t configId = CONFIG_ID_222;
    uint8_t buffer[LENGTH_NUM_255] = {0};
    uint32_t length = LENGTH_NUM_255;
    struct UsbDev dev = {dev_.busNum, DEV_ADDR_222};
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetConfigDescriptor(dev, configId, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetConfigDescriptor007 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdDescriptor008
 * @tc.desc: Test functions to GetConfigDescriptor
 * @tc.desc: int32_t GetConfigDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, busNum && devAddr && configId error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetConfigDescriptor008, TestSize.Level1)
{
    uint8_t configId = CONFIG_ID_222;
    uint8_t buffer[LENGTH_NUM_255] = {0};
    uint32_t length = LENGTH_NUM_255;
    struct UsbDev dev = {BUS_NUM_222, DEV_ADDR_222};
    std::vector<uint8_t> devdata(buffer, buffer + length);
    auto ret = g_usbInterface->GetConfigDescriptor(dev, configId, devdata);
    HDF_LOGI("UsbdRequestTest::UsbdGetConfigDescriptor008 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        devdata.size(), sizeof(devdata), ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdGetRawDescriptor001
 * @tc.desc: Test functions to GetRawDescriptor
 * @tc.desc: int32_t GetRawDescriptor(const UsbDev &dev, std::vector<uint8_t> &descriptor);
 * @tc.desc: Positive test: parameters correctly
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetRawDescriptor001, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    std::vector<uint8_t> rawData;
    auto ret = g_usbInterface->GetRawDescriptor(dev, rawData);
    HDF_LOGI("UsbdRequestTest::UsbdGetRawDescriptor001 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        rawData.size(), sizeof(rawData), ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdGetRawDescriptor002
 * @tc.desc: Test functions to GetRawDescriptor
 * @tc.desc: int32_t GetRawDescriptor(const UsbDev &dev, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, busNum error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetRawDescriptor002, TestSize.Level1)
{
    struct UsbDev dev = {BUS_NUM_222, dev_.devAddr};
    std::vector<uint8_t> rawData;
    auto ret = g_usbInterface->GetRawDescriptor(dev, rawData);
    HDF_LOGI("UsbdRequestTest::UsbdGetRawDescriptor002 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        rawData.size(), sizeof(rawData), ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdGetRawDescriptor003
 * @tc.desc: Test functions to GetRawDescriptor
 * @tc.desc: int32_t GetRawDescriptor(const UsbDev &dev, std::vector<uint8_t> &descriptor);
 * @tc.desc: Negative test: parameters exception, devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdGetRawDescriptor003, TestSize.Level1)
{
    struct UsbDev dev = {dev_.busNum, DEV_ADDR_222};
    std::vector<uint8_t> rawData;
    auto ret = g_usbInterface->GetRawDescriptor(dev, rawData);
    HDF_LOGI("UsbdRequestTest::UsbdGetRawDescriptor003 length=%{public}zu buffer=%{public}zu ret=%{public}d",
        rawData.size(), sizeof(rawData), ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: GetFileDescriptor001
 * @tc.desc: Test functions to GetFileDescriptor
 * @tc.desc: int32_t GetFileDescriptor(const UsbDev &dev, int32_t &fd);
 * @tc.desc: Positive test: parameters correctly
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, GetFileDescriptor001, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    int32_t fd = 0;
    auto ret = g_usbInterface->GetFileDescriptor(dev, fd);
    HDF_LOGI("UsbdRequestTest::GetFileDescriptor001 %{public}d fd=%{public}d ret=%{public}d", __LINE__, fd, ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: GetFileDescriptor002
 * @tc.desc: Test functions to GetFileDescriptor
 * @tc.desc: int32_t GetFileDescriptor(const UsbDev &dev, int32_t &fd);
 * @tc.desc: Negative test: parameters exception, busNum error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, GetFileDescriptor002, TestSize.Level1)
{
    struct UsbDev dev = {BUS_NUM_222, dev_.devAddr};
    int32_t fd = 0;
    auto ret = g_usbInterface->GetFileDescriptor(dev, fd);
    HDF_LOGI("UsbdRequestTest::GetFileDescriptor002 %{public}d fd=%{public}d ret=%{public}d", __LINE__, fd, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: GetFileDescriptor003
 * @tc.desc: Test functions to GetFileDescriptor
 * @tc.desc: int32_t GetFileDescriptor(const UsbDev &dev, int32_t &fd);
 * @tc.desc: Negative test: parameters exception, devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, GetFileDescriptor003, TestSize.Level1)
{
    struct UsbDev dev = {dev_.busNum, DEV_ADDR_222};
    int32_t fd = 0;
    auto ret = g_usbInterface->GetFileDescriptor(dev, fd);
    HDF_LOGI("UsbdRequestTest::GetFileDescriptor003 %{public}d fd=%{public}d ret=%{public}d", __LINE__, fd, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: GetFileDescriptor004
 * @tc.desc: Test functions to GetFileDescriptor
 * @tc.desc: int32_t GetFileDescriptor(const UsbDev &dev, int32_t &fd);
 * @tc.desc: Negative test: parameters exception, fd error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, GetFileDescriptor004, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    int32_t fd = LENGTH_NUM_255;
    auto ret = g_usbInterface->GetFileDescriptor(dev, fd);
    HDF_LOGI("UsbdRequestTest::GetFileDescriptor004 %{public}d fd=%{public}d ret=%{public}d", __LINE__, fd, ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdRequest001
 * @tc.desc: Test functions to RequestQueue
 * @tc.desc: int32_t RequestQueue(const UsbDev &dev, const UsbPipe &pipe, std::vector<uint8_t> &clientData,
        std::vector<uint8_t> &buffer);
 * @tc.desc: Positive test: parameters correctly
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestQueue001, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    uint8_t interfaceId = INTERFACEID_1;
    uint8_t pointid = POINTID_129;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestQueue001 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue read";
    uint8_t buffer[LENGTH_NUM_255] = {0};
    uint32_t length = LENGTH_NUM_255;
    struct UsbPipe pipe = {interfaceId, pointid};
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_10};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestQueue001 interfaceId=%{public}d pointid=%{public}d ret=%{public}d",
        interfaceId, pointid, ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdRequest002
 * @tc.desc: Test functions to RequestQueue
 * @tc.desc: int32_t RequestQueue(const UsbDev &dev, const UsbPipe &pipe, std::vector<uint8_t> &clientData,
        std::vector<uint8_t> &buffer);
 * @tc.desc: Negative test: parameters exception, busNum && devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestQueue002, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    uint8_t pointid = POINTID_129;
    uint8_t interfaceId = INTERFACEID_1;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestQueue002 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue read";
    uint8_t buffer[LENGTH_NUM_255] = {0};
    uint32_t length = LENGTH_NUM_255;
    dev = {BUS_NUM_222, DEV_ADDR_222};
    struct UsbPipe pipe = {interfaceId, pointid};
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_10};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestQueue002 interfaceId=%{public}d pointid=%{public}d ret=%{public}d",
        interfaceId, pointid, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdRequest003
 * @tc.desc: Test functions to RequestQueue
 * @tc.desc: int32_t RequestQueue(const UsbDev &dev, const UsbPipe &pipe, std::vector<uint8_t> &clientData,
        std::vector<uint8_t> &buffer);
 * @tc.desc: Negative test: parameters exception, devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestQueue003, TestSize.Level1)
{
    uint8_t pointid = POINTID_129;
    uint8_t interfaceId = INTERFACEID_1;
    uint8_t buffer[LENGTH_NUM_255] = {0};
    struct UsbDev dev = dev_;
    uint32_t length = LENGTH_NUM_255;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestQueue003 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue read";
    dev.devAddr = DEV_ADDR_222;
    struct UsbPipe pipe = {interfaceId, pointid};
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_10};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestQueue003 interfaceId=%{public}d pointid=%{public}d ret=%{public}d",
        interfaceId, pointid, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdRequest004
 * @tc.desc: Test functions to RequestQueue
 * @tc.desc: int32_t RequestQueue(const UsbDev &dev, const UsbPipe &pipe, std::vector<uin        t8_t> &clientData,
        std::vector<uint8_t> &buffer);
 * @tc.desc: Negative test: parameters exception, busNum && configIndex error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestQueue004, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    uint8_t pointid = POINTID_129;
    uint8_t interfaceId = INTERFACEID_1;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestQueue004 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue read";
    interfaceId = 222;
    dev.busNum = BUS_NUM_222;
    uint8_t buffer[LENGTH_NUM_255] = {0};
    uint32_t length = LENGTH_NUM_255;
    struct UsbPipe pipe = {interfaceId, pointid};
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_10};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestQueue004 interfaceId=%{public}d pointid=%{public}d ret=%{public}d",
        interfaceId, pointid, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdRequest005
 * @tc.desc: Test functions to RequestQueue
 * @tc.desc: int32_t RequestQueue(const UsbDev &dev, const UsbPipe &pipe, std::vector<uint8_t> &clientData,
        std::vector<uint8_t> &buffer);
 * @tc.desc: Negative test: parameters exception, busNum error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestQueue005, TestSize.Level1)
{
    uint8_t buffer[LENGTH_NUM_255] = {};
    uint32_t length = LENGTH_NUM_255;
    struct UsbDev dev = dev_;
    uint8_t pointid = POINTID_129;
    uint8_t interfaceId = INTERFACEID_1;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestQueue005 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue read";
    dev.busNum = BUS_NUM_222;
    struct UsbPipe pipe = {interfaceId, pointid};
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_10};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestQueue005 %{public}d RequestQueue=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdRequest006
 * @tc.desc: Test functions to RequestQueue
 * @tc.desc: int32_t RequestQueue(const UsbDev &dev, const UsbPipe &pipe, std::vector<uint8_t> &clientData,
        std::vector<uint8_t> &buffer);
 * @tc.desc: Negative test: parameters exception, busNum && interfaceId && pointid error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestQueue006, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    uint8_t buffer[LENGTH_NUM_255] = {};
    uint8_t pointid = POINTID_129;
    uint8_t interfaceId = INTERFACEID_1;
    uint32_t length = LENGTH_NUM_255;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestQueue006 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue read";
    dev.busNum = BUS_NUM_222;
    interfaceId = 222;
    pointid = 222;
    struct UsbPipe pipe = {interfaceId, pointid};
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_10};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestQueue006 %{public}d RequestQueue=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdRequest007
 * @tc.desc: Test functions to RequestQueue
 * @tc.desc: int32_t RequestQueue(const UsbDev &dev, const UsbPipe &pipe, std::vector<uint8_t> &clientData,
        std::vector<uint8_t> &buffer);
 * @tc.desc: Positive test: parameters correctly
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestQueue007, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    uint8_t buffer[LENGTH_NUM_255] = "request 007";
    uint32_t length = LENGTH_NUM_255;
    uint8_t pointid = POINTID_1;
    uint8_t interfaceId = INTERFACEID_1;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestQueue007 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue write";
    struct UsbPipe pipe = {interfaceId, pointid};
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_11};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestQueue007 %{public}d RequestQueue=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdRequest008
 * @tc.desc: Test functions to RequestQueue
 * @tc.desc: int32_t RequestQueue(const UsbDev &dev, const UsbPipe &pipe, std::vector<uint8_t> &clientData,
        std::vector<uint8_t> &buffer);
 * @tc.desc: Negative test: parameters exception, interfaceId error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestQueue008, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    uint8_t buffer[LENGTH_NUM_255] = "reuquest008";
    uint32_t length = LENGTH_NUM_255;
    uint8_t pointid = POINTID_1;
    uint8_t interfaceId = INTERFACEID_1;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestQueue008 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue write";
    interfaceId = 222;
    struct UsbPipe pipe = {interfaceId, pointid};
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_11};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestQueue008 %{public}d RequestQueue=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdRequest009
 * @tc.desc: Test functions to RequestQueue
 * @tc.desc: int32_t RequestQueue(const UsbDev &dev, const UsbPipe &pipe, std::vector<uint8_t> &clientData,
        std::vector<uint8_t> &buffer);
 * @tc.desc: Negative test: parameters exception, interfaceId && pointid error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestQueue009, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    uint8_t buffer[LENGTH_NUM_255] = "request 009";
    uint32_t length = LENGTH_NUM_255;
    uint8_t pointid = POINTID_1;
    uint8_t interfaceId = INTERFACEID_1;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestQueue009 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue write";
    interfaceId = 222;
    pointid = 222;
    struct UsbPipe pipe = {interfaceId, pointid};
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_11};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestQueue009 %{public}d RequestQueue=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**********************************************************************************************************/

/**
 * @tc.name: UsbdRequest001
 * @tc.desc: Test functions to RequestWait
 * @tc.desc: int32_t RequestWait(const UsbDev &dev, std::vector<uint8_t> &clientData, std::vector<uint8_t> &buffer,
 * int32_t timeout);
 * @tc.desc: Positive test: parameters correctly
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestWait001, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    uint8_t pointid = POINTID_129;
    uint8_t interfaceId = INTERFACEID_1;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestWait001 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t buffer[LENGTH_NUM_255] = {};
    uint32_t length = LENGTH_NUM_255;
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue read";
    struct UsbPipe pipe = {interfaceId, pointid};
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_10};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestWait001 %{public}d RequestQueue=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t *clientObj = new uint8_t[10];
    std::vector<uint8_t> waitdata = {clientObj, clientObj + 10};
    ret = g_usbInterface->RequestWait(dev, waitdata, bufferdata, 10000);
    HDF_LOGI("UsbdRequestTest::UsbdRequestWait001 %{public}d RequestWait=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    delete[] clientObj;
    clientObj = nullptr;
}

/**
 * @tc.name: UsbdRequest002
 * @tc.desc: Test functions to RequestWait
 * @tc.desc: int32_t RequestWait(const UsbDev &dev, std::vector<uint8_t> &clientData, std::vector<uint8_t> &buffer,
 * int32_t timeout);
 * @tc.desc: Negative test: parameters exception, busNum error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestWait002, TestSize.Level1)
{
    uint8_t pointid = POINTID_129;
    uint8_t interfaceId = INTERFACEID_1;
    struct UsbDev dev = dev_;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestWait002 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t buffer[LENGTH_NUM_255] = {};
    uint32_t length = LENGTH_NUM_255;
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue read";
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_10};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    struct UsbPipe pipe = {interfaceId, pointid};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestWait002 %{public}d RequestQueue=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    dev.busNum = BUS_NUM_222;
    uint8_t *clientObj = new uint8_t[10];
    std::vector<uint8_t> waitdata = {clientObj, clientObj + 10};
    ret = g_usbInterface->RequestWait(dev, waitdata, bufferdata, 10000);
    HDF_LOGI("UsbdRequestTest::UsbdRequestWait002 %{public}d RequestWait=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
    delete[] clientObj;
    clientObj = nullptr;
}

/**
 * @tc.name: UsbdRequest003
 * @tc.desc: Test functions to RequestWait
 * @tc.desc: int32_t RequestWait(const UsbDev &dev, std::vector<uint8_t> &clientData, std::vector<uint8_t> &buffer,
 * int32_t timeout);
 * @tc.desc: Negative test: parameters exception, devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestWait003, TestSize.Level1)
{
    uint8_t pointid = POINTID_129;
    uint8_t interfaceId = INTERFACEID_1;
    struct UsbDev dev = dev_;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestWait003 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue read";
    uint8_t buffer[LENGTH_NUM_255] = {};
    uint32_t length = LENGTH_NUM_255;
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_10};
    struct UsbPipe pipe = {interfaceId, pointid};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestWait003 %{public}d RequestQueue=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t *clientObj = new uint8_t[10];
    dev.devAddr = DEV_ADDR_222;
    std::vector<uint8_t> waitdata = {clientObj, clientObj + 10};
    ret = g_usbInterface->RequestWait(dev, waitdata, bufferdata, 10000);
    HDF_LOGI("UsbdRequestTest::UsbdRequestWait003 %{public}d RequestWait=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
    delete[] clientObj;
    clientObj = nullptr;
}

/**
 * @tc.name: UsbdRequest004
 * @tc.desc: Test functions to RequestWait
 * @tc.desc: int32_t RequestWait(const UsbDev &dev, std::vector<uint8_t> &clientData, std::vector<uint8_t> &buffer,
 * int32_t timeout);
 * @tc.desc: Negative test: parameters exception, timeout error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestWait004, TestSize.Level1)
{
    uint8_t pointid = POINTID_129;
    uint8_t interfaceId = INTERFACEID_1;
    struct UsbDev dev = dev_;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestWait004 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t buffer[LENGTH_NUM_255] = {};
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue read";
    uint32_t length = LENGTH_NUM_255;
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_10};
    struct UsbPipe pipe = {interfaceId, pointid};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestWait004 %{public}d RequestQueue=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t *clientObj = new uint8_t[10];
    std::vector<uint8_t> waitdata = {clientObj, clientObj + 10};
    ret = g_usbInterface->RequestWait(dev, waitdata, bufferdata, -10000);
    HDF_LOGI("UsbdRequestTest::UsbdRequestWait004 %{public}d RequestWait=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    delete[] clientObj;
    clientObj = nullptr;
}

/**
 * @tc.name: UsbdRequest005
 * @tc.desc: Test functions to RequestWait
 * @tc.desc: int32_t RequestWait(const UsbDev &dev, std::vector<uint8_t> &clientData, std::vector<uint8_t> &buffer,
 * int32_t timeout);
 * @tc.desc: Negative test: parameters exception, busNum && devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestWait005, TestSize.Level1)
{
    uint8_t pointid = POINTID_129;
    uint8_t interfaceId = INTERFACEID_1;
    struct UsbDev dev = dev_;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestWait005 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint32_t length = LENGTH_NUM_255;
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue read";
    uint8_t buffer[LENGTH_NUM_255] = {};
    struct UsbPipe pipe = {interfaceId, pointid};
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_10};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestWait005 %{public}d RequestQueue=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t *clientObj = new uint8_t[10];
    std::vector<uint8_t> waitdata = {clientObj, clientObj + 10};
    dev.devAddr = DEV_ADDR_255;
    dev.busNum = BUS_NUM_255;
    ret = g_usbInterface->RequestWait(dev, waitdata, bufferdata, 10000);
    HDF_LOGI("UsbdRequestTest::UsbdRequestWait005 %{public}d RequestWait=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
    delete[] clientObj;
    clientObj = nullptr;
}

/**********************************************************************************************************/

/**
 * @tc.name: UsbdRequest001
 * @tc.desc: Test functions to RequestCancel
 * @tc.desc: int32_t RequestCancel(const UsbDev &dev, const UsbPipe &pipe);
 * @tc.desc: Positive test: parameters correctly
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestCancel001, TestSize.Level1)
{
    uint8_t pointid = POINTID_129;
    uint8_t interfaceId = INTERFACEID_1;
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue read";
    struct UsbDev dev = dev_;
    uint8_t buffer[LENGTH_NUM_255] = "request001";
    uint32_t length = LENGTH_NUM_255;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel001 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    struct UsbPipe pipe = {interfaceId, pointid};
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_10};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel001 %{public}d RequestQueue=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    ret = g_usbInterface->RequestCancel(dev, pipe);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel001 %{public}d RequestCancel=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdRequest002
 * @tc.desc: Test functions to RequestCancel
 * @tc.desc: int32_t RequestCancel(const UsbDev &dev, const UsbPipe &pipe);
 * @tc.desc: Negative test: parameters exception, busNum error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestCancel002, TestSize.Level1)
{
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue read";
    struct UsbDev dev = dev_;
    uint32_t length = LENGTH_NUM_255;
    uint8_t pointid = POINTID_129;
    uint8_t interfaceId = INTERFACEID_1;
    uint8_t buffer[LENGTH_NUM_255] = "request002";
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel002 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    struct UsbPipe pipe = {interfaceId, pointid};
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_10};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ;
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel002 %{public}d RequestQueue=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    dev.busNum = BUS_NUM_222;
    ret = g_usbInterface->RequestCancel(dev, pipe);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel002 %{public}d RequestCancel=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
    dev = dev_;
    ret = g_usbInterface->RequestCancel(dev, pipe);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel002 again %{public}d RequestCancel=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdRequest003
 * @tc.desc: Test functions to RequestCancel
 * @tc.desc: int32_t RequestCancel(const UsbDev &dev, const UsbPipe &pipe);
 * @tc.desc: Negative test: parameters exception, devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestCancel003, TestSize.Level1)
{
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue read";
    struct UsbDev dev = dev_;
    uint8_t buffer[LENGTH_NUM_255] = "request003";
    uint32_t length = LENGTH_NUM_255;
    uint8_t pointid = POINTID_129;
    uint8_t interfaceId = INTERFACEID_1;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel003 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_10};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    struct UsbPipe pipe = {interfaceId, pointid};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel003 %{public}d RequestQueue=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    dev.devAddr = DEV_ADDR_222;
    ret = g_usbInterface->RequestCancel(dev, pipe);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel003 %{public}d RequestCancel=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
    dev = dev_;
    ret = g_usbInterface->RequestCancel(dev, pipe);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel003 again %{public}d RequestCancel=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdRequest004
 * @tc.desc: Test functions to RequestCancel
 * @tc.desc: int32_t RequestCancel(const UsbDev &dev, const UsbPipe &pipe);
 * @tc.desc: Positive test: intfId && endpointId error in pipe but not used
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestCancel004, TestSize.Level1)
{
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue read";
    struct UsbDev dev = dev_;
    uint32_t length = LENGTH_NUM_255;
    uint8_t buffer[LENGTH_NUM_255] = "request004";
    uint8_t pointid = POINTID_BULK_OUT;
    uint8_t interfaceId = INTERFACEID_1;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel004 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    struct UsbPipe pipe = {interfaceId, pointid};
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_10};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel004 %{public}d RequestQueue=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    pipe.intfId = INTERFACEID_255;
    pipe.endpointId = POINTID_255;
    ret = g_usbInterface->RequestCancel(dev, pipe);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel004 %{public}d RequestCancel=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    pipe = {interfaceId, pointid};
    ret = g_usbInterface->RequestCancel(dev, pipe);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel004 %{public}d again RequestCancel=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdRequest005
 * @tc.desc: Test functions to RequestCancel
 * @tc.desc: int32_t RequestCancel(const UsbDev &dev, const UsbPipe &pipe);
 * @tc.desc: Negative test: call twice
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestCancel005, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    uint8_t buffer[LENGTH_NUM_255] = "request005";
    uint32_t length = LENGTH_NUM_255;
    uint8_t pointid = POINTID_1;
    uint8_t interfaceId = INTERFACEID_1;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel005 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    struct UsbPipe pipe = {interfaceId, pointid};
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue Write";
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_11};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel005 %{public}d RequestQueue=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    ret = g_usbInterface->RequestCancel(dev, pipe);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel005 %{public}d RequestCancel=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    dev = dev_;
    pipe = {interfaceId, pointid};
    ret = g_usbInterface->RequestCancel(dev, pipe);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdRequest006
 * @tc.desc: Test functions to RequestCancel
 * @tc.desc: int32_t RequestCancel(const UsbDev &dev, const UsbPipe &pipe);
 * @tc.desc: Negative test: parameters exception, busNum error && interfaceid ignore
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestCancel006, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    uint8_t buffer[LENGTH_NUM_255] = "request006";
    uint32_t length = LENGTH_NUM_255;
    uint8_t pointid = POINTID_1;
    uint8_t interfaceId = INTERFACEID_1;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel006 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue Write";
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_11};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    struct UsbPipe pipe = {interfaceId, pointid};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel006 %{public}d RequestQueue=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    dev.busNum = BUS_NUM_255;
    pipe.intfId = 224;
    ret = g_usbInterface->RequestCancel(dev, pipe);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel006 %{public}d RequestCancel=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
    dev.busNum = dev_.busNum;
    pipe.intfId = INTERFACEID_1;
    ret = g_usbInterface->RequestCancel(dev, pipe);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdRequest007
 * @tc.desc: Test functions to RequestCancel
 * @tc.desc: int32_t RequestCancel(const UsbDev &dev, const UsbPipe &pipe);
 * @tc.desc: Negative test: parameters exception, devAddr error && interfaceid ignore
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestCancel007, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    uint8_t buffer[LENGTH_NUM_255] = "request007";
    uint32_t length = LENGTH_NUM_255;
    uint8_t pointid = POINTID_1;
    uint8_t interfaceId = INTERFACEID_1;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel007 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    struct UsbPipe pipe = {interfaceId, pointid};
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue Write";
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_11};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel007 %{public}d RequestQueue=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    dev.devAddr = DEV_ADDR_222;
    pipe.intfId = INTERFACEID_255;
    ret = g_usbInterface->RequestCancel(dev, pipe);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel007 %{public}d RequestCancel=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
    dev.devAddr = dev_.devAddr;
    pipe.intfId = INTERFACEID_1;
    ret = g_usbInterface->RequestCancel(dev, pipe);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdRequest008
 * @tc.desc: Test functions to RequestCancel
 * @tc.desc: int32_t RequestCancel(const UsbDev &dev, const UsbPipe &pipe);
 * @tc.desc: Negative test: parameters exception, busNum error && devAddr error && interfaceid ignore
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdRequestCancel008, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    uint8_t buffer[LENGTH_NUM_255] = "request008";
    uint8_t pointid = POINTID_1;
    uint8_t interfaceId = INTERFACEID_1;
    uint32_t length = LENGTH_NUM_255;
    auto ret = g_usbInterface->ClaimInterface(dev, interfaceId, 1);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel008 %{public}d ClaimInterface=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    uint8_t tag[TAG_LENGTH_NUM_1000] = "queue Write";
    struct UsbPipe pipe = {interfaceId, pointid};
    std::vector<uint8_t> clientdata = {tag, tag + TAG_NUM_11};
    std::vector<uint8_t> bufferdata = {buffer, buffer + length};
    ret = g_usbInterface->RequestQueue(dev, pipe, clientdata, bufferdata);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel008 %{public}d RequestQueue=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    dev.busNum = BUS_NUM_222;
    dev.devAddr = DEV_ADDR_222;
    pipe.intfId = INTERFACEID_255;
    ret = g_usbInterface->RequestCancel(dev, pipe);
    HDF_LOGI("UsbdRequestTest::UsbdRequestCancel008 %{public}d RequestCancel=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
    dev = dev_;
    pipe.intfId = INTERFACEID_1;
    ret = g_usbInterface->RequestCancel(dev, pipe);
    ASSERT_EQ(0, ret);
}

/**********************************************************************************************************/

/**
 * @tc.name: UsbdReleaseInterface001
 * @tc.desc: Test functions to ReleaseInterface
 * @tc.desc: int32_t ReleaseInterface(const UsbDev &dev, uint8_t interfaceId);
 * @tc.desc: Positive test: parameters correctly
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdReleaseInterface001, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    uint8_t interfaceId = INTERFACEID_1;
    auto ret = g_usbInterface->ReleaseInterface(dev, interfaceId);
    HDF_LOGI("UsbdRequestTest::UsbdReleaseInterface001 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
}

/**
 * @tc.name: UsbdReleaseInterface002
 * @tc.desc: Test functions to ReleaseInterface
 * @tc.desc: int32_t ReleaseInterface(const UsbDev &dev, uint8_t interfaceId);
 * @tc.desc: Negative test: parameters exception, busNum error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdReleaseInterface002, TestSize.Level1)
{
    uint8_t interfaceId = INTERFACEID_1;
    struct UsbDev dev = {BUS_NUM_255, dev_.devAddr};
    auto ret = g_usbInterface->ReleaseInterface(dev, interfaceId);
    HDF_LOGI("UsbdRequestTest::UsbdReleaseInterface002 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdReleaseInterface003
 * @tc.desc: Test functions to ReleaseInterface
 * @tc.desc: int32_t ReleaseInterface(const UsbDev &dev, uint8_t interfaceId);
 * @tc.desc: Negative test: parameters exception, devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdReleaseInterface003, TestSize.Level1)
{
    uint8_t interfaceId = INTERFACEID_1;
    struct UsbDev dev = {dev_.busNum, DEV_ADDR_255};
    auto ret = g_usbInterface->ReleaseInterface(dev, interfaceId);
    HDF_LOGI("UsbdRequestTest::UsbdReleaseInterface003 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdReleaseInterface004
 * @tc.desc: Test functions to ReleaseInterface
 * @tc.desc: int32_t ReleaseInterface(const UsbDev &dev, uint8_t interfaceId);
 * @tc.desc: Negative test: parameters exception, interfaceid error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdReleaseInterface004, TestSize.Level1)
{
    uint8_t interfaceId = INTERFACEID_255;
    struct UsbDev dev = dev_;
    auto ret = g_usbInterface->ReleaseInterface(dev, interfaceId);
    HDF_LOGI("UsbdRequestTest::UsbdReleaseInterface004 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdReleaseInterface005
 * @tc.desc: Test functions to ReleaseInterface
 * @tc.desc: int32_t ReleaseInterface(const UsbDev &dev, uint8_t interfaceId);
 * @tc.desc: Negative test: parameters exception, busNum && devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdReleaseInterface005, TestSize.Level1)
{
    uint8_t interfaceId = INTERFACEID_1;
    struct UsbDev dev = {BUS_NUM_255, DEV_ADDR_255};
    auto ret = g_usbInterface->ReleaseInterface(dev, interfaceId);
    HDF_LOGI("UsbdRequestTest::UsbdReleaseInterface005 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdReleaseInterface006
 * @tc.desc: Test functions to ReleaseInterface
 * @tc.desc: int32_t ReleaseInterface(const UsbDev &dev, uint8_t interfaceId);
 * @tc.desc: Negative test: parameters exception, busNum && interfaceid error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdReleaseInterface006, TestSize.Level1)
{
    int32_t interfaceId = INTERFACEID_255;
    struct UsbDev dev = {DEV_ADDR_255, dev_.devAddr};
    auto ret = g_usbInterface->ReleaseInterface(dev, interfaceId);
    HDF_LOGI("UsbdRequestTest::UsbdReleaseInterface006 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdReleaseInterface007
 * @tc.desc: Test functions to ReleaseInterface
 * @tc.desc: int32_t ReleaseInterface(const UsbDev &dev, uint8_t interfaceId);
 * @tc.desc: Negative test: parameters exception, devAddr && interfaceid error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdReleaseInterface007, TestSize.Level1)
{
    int32_t interfaceId = INTERFACEID_255;
    struct UsbDev dev = {dev_.busNum, DEV_ADDR_255};
    auto ret = g_usbInterface->ReleaseInterface(dev, interfaceId);
    HDF_LOGI("UsbdRequestTest::UsbdReleaseInterface007 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: UsbdReleaseInterface008
 * @tc.desc: Test functions to ReleaseInterface
 * @tc.desc: int32_t ReleaseInterface(const UsbDev &dev, uint8_t interfaceId);
 * @tc.desc: Negative test: parameters exception, busNum && devAddr && interfaceid error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, UsbdReleaseInterface008, TestSize.Level1)
{
    int32_t interfaceId = INTERFACEID_255;
    struct UsbDev dev = {BUS_NUM_255, DEV_ADDR_255};
    auto ret = g_usbInterface->ReleaseInterface(dev, interfaceId);
    HDF_LOGI("UsbdRequestTest::UsbdReleaseInterface008 %{public}d ret=%{public}d", __LINE__, ret);
    ASSERT_NE(ret, 0);
}

/**
 * @tc.name: BulkCancel001
 * @tc.desc: Test functions to BulkCancel
 * @tc.desc: int32_t BulkCancel(const UsbDev &dev, const UsbPipe &pipe);
 * @tc.desc: Positive test: parameters correctly
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, BulkCancel001, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    uint8_t interfaceId = INTERFACEID_1;
    uint8_t pointid = POINTID_BULK_IN;
    struct UsbPipe pipe = {interfaceId, pointid};
    sptr<UsbdBulkCallbackTest> usbdBulkCallback = new UsbdBulkCallbackTest();
    auto ret = g_usbInterface->RegBulkCallback(dev, pipe, usbdBulkCallback);
    HDF_LOGI("UsbdTransferTest::BulkCancel001 %{public}d RegBulkCallback=%{public}d", __LINE__, ret);
    ASSERT_EQ(ret, 0);
    ret = g_usbInterface->BulkCancel(dev, pipe);
    HDF_LOGI("UsbdRequestTest::BulkCancel001 %{public}d BulkCancel=%{public}d", __LINE__, ret);
    ASSERT_EQ(0, ret);
    ret = g_usbInterface->UnRegBulkCallback(dev, pipe);
    HDF_LOGI("UsbdTransferTest::BulkCancel001 %{public}d UnRegBulkCallback=%{public}d", __LINE__, ret);
    ASSERT_EQ(ret, 0);
}

/**
 * @tc.name: BulkCancel002
 * @tc.desc: Test functions to BulkCancel
 * @tc.desc: int32_t BulkCancel(const UsbDev &dev, const UsbPipe &pipe);
 * @tc.desc: Negative test: parameters exception, busNum error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, BulkCancel002, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    uint8_t interfaceId = INTERFACEID_1;
    uint8_t pointid = POINTID_BULK_IN;
    struct UsbPipe pipe = {interfaceId, pointid};
    sptr<UsbdBulkCallbackTest> usbdBulkCallback = new UsbdBulkCallbackTest();
    auto ret = g_usbInterface->RegBulkCallback(dev, pipe, usbdBulkCallback);
    HDF_LOGI("UsbdTransferTest::BulkCancel002 %{public}d RegBulkCallback=%{public}d", __LINE__, ret);
    ASSERT_EQ(ret, 0);
    dev.busNum = BUS_NUM_222;
    ret = g_usbInterface->BulkCancel(dev, pipe);
    HDF_LOGI("UsbdRequestTest::BulkCancel002 %{public}d BulkCancel=%{public}d", __LINE__, ret);
    ASSERT_NE(0, ret);
    dev = dev_;
    ret = g_usbInterface->UnRegBulkCallback(dev, pipe);
    HDF_LOGI("UsbdTransferTest::BulkCancel002 %{public}d UnRegBulkCallback=%{public}d", __LINE__, ret);
    ASSERT_EQ(ret, 0);
}

/**
 * @tc.name: BulkCancel003
 * @tc.desc: Test functions to BulkCancel
 * @tc.desc: int32_t BulkCancel(const UsbDev &dev, const UsbPipe &pipe);
 * @tc.desc: Negative test: parameters exception, devAddr error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, BulkCancel003, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    uint8_t interfaceId = INTERFACEID_1;
    uint8_t pointid = POINTID_BULK_IN;
    struct UsbPipe pipe = {interfaceId, pointid};
    sptr<UsbdBulkCallbackTest> usbdBulkCallback = new UsbdBulkCallbackTest();
    auto ret = g_usbInterface->RegBulkCallback(dev, pipe, usbdBulkCallback);
    HDF_LOGI("UsbdTransferTest::BulkCancel003 %{public}d RegBulkCallback=%{public}d", __LINE__, ret);
    ASSERT_EQ(ret, 0);
    dev.devAddr = DEV_ADDR_222;
    ret = g_usbInterface->BulkCancel(dev, pipe);
    HDF_LOGI("UsbdRequestTest::BulkCancel003 %{public}d BulkCancel=%{public}d", __LINE__, ret);
    ASSERT_NE(0, ret);
    dev = dev_;
    ret = g_usbInterface->UnRegBulkCallback(dev, pipe);
    HDF_LOGI("UsbdTransferTest::BulkCancel003 %{public}d UnRegBulkCallback=%{public}d", __LINE__, ret);
    ASSERT_EQ(ret, 0);
}

/**
 * @tc.name: BulkCancel004
 * @tc.desc: Test functions to BulkCancel
 * @tc.desc: int32_t BulkCancel(const UsbDev &dev, const UsbPipe &pipe);
 * @tc.desc: Negative test: parameters exception, busNum && devAddr && interfaceid error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, BulkCancel004, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    uint8_t interfaceId = INTERFACEID_1;
    uint8_t pointid = POINTID_BULK_IN;
    struct UsbPipe pipe = {interfaceId, pointid};
    sptr<UsbdBulkCallbackTest> usbdBulkCallback = new UsbdBulkCallbackTest();
    auto ret = g_usbInterface->RegBulkCallback(dev, pipe, usbdBulkCallback);
    HDF_LOGI("UsbdTransferTest::BulkCancel004 %{public}d RegBulkCallback=%{public}d", __LINE__, ret);
    ASSERT_EQ(ret, 0);
    dev.busNum = BUS_NUM_222;
    dev.devAddr = DEV_ADDR_222;
    pipe.intfId = POINTID_255;
    ret = g_usbInterface->BulkCancel(dev, pipe);
    HDF_LOGI("UsbdRequestTest::BulkCancel004 %{public}d BulkCancel=%{public}d", __LINE__, ret);
    ASSERT_NE(0, ret);
    dev = dev_;
    pipe = {interfaceId, pointid};
    ret = g_usbInterface->UnRegBulkCallback(dev, pipe);
    HDF_LOGI("UsbdTransferTest::BulkCancel004 %{public}d UnRegBulkCallback=%{public}d", __LINE__, ret);
    ASSERT_EQ(ret, 0);
}

/**
 * @tc.name: BulkCancel005
 * @tc.desc: Test functions to BulkCancel
 * @tc.desc: int32_t BulkCancel(const UsbDev &dev, const UsbPipe &pipe);
 * @tc.desc: Negative test: parameters exception, intfId error
 * @tc.type: FUNC
 */
HWTEST_F(UsbdRequestTest, BulkCancel005, TestSize.Level1)
{
    struct UsbDev dev = dev_;
    uint8_t interfaceId = INTERFACEID_1;
    uint8_t pointid = POINTID_BULK_IN;
    struct UsbPipe pipe = {interfaceId, pointid};
    sptr<UsbdBulkCallbackTest> usbdBulkCallback = new UsbdBulkCallbackTest();
    auto ret = g_usbInterface->RegBulkCallback(dev, pipe, usbdBulkCallback);
    HDF_LOGI("UsbdTransferTest::BulkCancel004 %{public}d RegBulkCallback=%{public}d", __LINE__, ret);
    ASSERT_EQ(ret, 0);
    pipe.intfId = POINTID_158;
    ret = g_usbInterface->BulkCancel(dev, pipe);
    HDF_LOGI("UsbdRequestTest::BulkCancel004 %{public}d BulkCancel=%{public}d", __LINE__, ret);
    ASSERT_NE(0, ret);
    pipe = {interfaceId, pointid};
    ret = g_usbInterface->UnRegBulkCallback(dev, pipe);
    HDF_LOGI("UsbdTransferTest::BulkCancel004 %{public}d UnRegBulkCallback=%{public}d", __LINE__, ret);
    ASSERT_EQ(ret, 0);
}
} // namespace
