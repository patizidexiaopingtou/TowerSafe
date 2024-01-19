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

#ifndef OHOS_HDI_USB_V1_0_USBD_FUNCTION_H
#define OHOS_HDI_USB_V1_0_USBD_FUNCTION_H

#include <stdint.h>

#define USB_FUNCTION_NONE    0
#define USB_FUNCTION_ACM     (1 << 0)
#define USB_FUNCTION_ECM     (1 << 1)
#define USB_FUNCTION_HDC     (1 << 2)
#define USB_FUNCTION_RNDIS   (1 << 5)
#define USB_FUNCTION_STORAGE (1 << 9)
#define USB_FUNCTION_SUPPORT \
    (USB_FUNCTION_ACM | USB_FUNCTION_ECM | USB_FUNCTION_HDC | USB_FUNCTION_RNDIS | USB_FUNCTION_STORAGE)

#define DEV_SERVICE_NAME "usbfn_master"
#define ACM_SERVICE_NAME "usbfn_cdcacm"
#define ECM_SERVICE_NAME "usbfn_cdcecm"

#define SYS_USB_CONFIGFS       "sys.usb.configfs"
#define SYS_USB_CONFIG         "sys.usb.config"
#define HDC_CONFIG_OFF         "none"
#define HDC_CONFIG_ON          "hdc"
#define HDC_CONFIG_RNDIS       "rndis"
#define HDC_CONFIG_STORAGE     "storage"
#define HDC_CONFIG_RNDIS_HDC   "rndis_hdc"
#define HDC_CONFIG_STORAGE_HDC "storage_hdc"
#define HDC_CONFIGFS_OFF       "0"
#define HDC_CONFIGFS_ON        "1"

#define FUNCTION_ADD 1
#define FUNCTION_DEL 2

#define ACM_INIT    100
#define ACM_RELEASE 101
#define ECM_INIT    100
#define ECM_RELEASE 101

#define USB_DDK_FUNCTION_SUPPORT (USB_FUNCTION_ACM | USB_FUNCTION_ECM)
namespace OHOS {
namespace HDI {
namespace Usb {
namespace V1_0 {
class UsbdFunction {
public:
    UsbdFunction() = default;
    ~UsbdFunction() = default;
    static int32_t UsbdSetFunction(uint32_t funcs);
    static int32_t UsbdGetFunction();

private:
    static int32_t SendCmdToService(const char *name, int32_t cmd, unsigned char funcMask);
    static int32_t RemoveHdc();
    static int32_t AddHdc();
    static int32_t SetFunctionToNone();
    static int32_t SetFunctionToRndis();
    static int32_t SetFunctionToStorage();
    static int32_t SetFunctionToRndisHdc();
    static int32_t SetFunctionToStorageHdc();
    static int32_t SetDDKFunction(uint32_t funcs);
    static int32_t UsbdEnableDevice();
    static int32_t UsbdWaitUdc();
    static int32_t UsbdInitDDKFunction(uint32_t funcs);
    static int32_t UsbdSetKernelFunction(int32_t kfuns);
    static uint32_t currentFuncs_;
};
} // namespace V1_0
} // namespace Usb
} // namespace HDI
} // namespace OHOS
#endif // OHOS_HDI_USB_V1_0_USBD_FUNCTION_H
