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

#include <cstddef>
#include <cstdint>
#include <unistd.h>

#include "UsbSubscriberTest.h"
#include "hdf_log.h"
#include "message_parcel.h"
#include "usb_impl.h"
#include "usbhost_fuzzer.h"
#include "v1_0/usb_interface_stub.h"

using namespace OHOS::HDI::Usb::V1_0;
using OHOS::HDI::Usb::V1_0::UsbDev;
using namespace OHOS::USB;

namespace OHOS {
constexpr size_t THRESHOLD = 10;
constexpr int32_t OFFSET = 4;
const std::u16string USB_INTERFACE_TOKEN = u"ohos.hdi.usb.v1_0.IUsbInterface";
const int32_t SLEEP_TIME = 3;
const int32_t DEFAULT_PORT_ID = 1;
const int32_t DEFAULT_ROLE_HOST = 1;

uint32_t Convert2Uint32(const uint8_t *ptr)
{
    if (ptr == nullptr) {
        return 0;
    }
    /*
     * Move the 0th digit 24 to the left, the first digit 16 to the left, the second digit 8 to the left,
     * and the third digit no left
     */
    return (ptr[0] << 24) | (ptr[1] << 16) | (ptr[2] << 8) | (ptr[3]);
}

bool DoSomethingInterestingWithMyAPI(const uint8_t *rawData, size_t size)
{
    if (rawData == nullptr) {
        return false;
    }
    uint32_t code = Convert2Uint32(rawData);
    rawData = rawData + OFFSET;
    size = size - OFFSET;

    MessageParcel data;
    data.WriteInterfaceToken(USB_INTERFACE_TOKEN);
    data.WriteBuffer(rawData, size);
    data.RewindRead(0);
    MessageParcel reply;
    MessageOption option;

    sptr<IUsbInterface> usbInterface = IUsbInterface::Get(false);
    if (usbInterface == nullptr) {
        HDF_LOGE("%{public}s:IUsbInterface::Get() failed.", __func__);
        return false;
    }

    int32_t ret = usbInterface->SetPortRole(DEFAULT_PORT_ID, DEFAULT_ROLE_HOST, DEFAULT_ROLE_HOST);
    sleep(SLEEP_TIME);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s: set port role as host failed", __func__);
        return ret;
    }

    sptr<UsbSubscriberTest> subscriber = new UsbSubscriberTest();
    ret = usbInterface->BindUsbdSubscriber(subscriber);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s: bind usbd subscriber failed", __func__);
        return ret;
    }

    sleep(1);
    UsbDev dev;
    dev.busNum = subscriber->busNum_;
    dev.devAddr = subscriber->devAddr_;
    ret = usbInterface->OpenDevice(dev);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s: open device failed", __func__);
        return ret;
    }

    sptr<UsbInterfaceStub> impl = new UsbInterfaceStub(usbInterface);
    if (impl == nullptr) {
        HDF_LOGE("%{public}s:new UsbInterfaceStub failed.", __func__);
        return false;
    }
    impl->OnRemoteRequest(code, data, reply, option);

    return true;
}
} // namespace OHOS

/* Fuzzer entry point */
extern "C" int LLVMFuzzerTestOneInput(const uint8_t *data, size_t size)
{
    if (size < OHOS::THRESHOLD) {
        return 0;
    }

    /* Run your code on data */
    OHOS::DoSomethingInterestingWithMyAPI(data, size);
    return 0;
}
