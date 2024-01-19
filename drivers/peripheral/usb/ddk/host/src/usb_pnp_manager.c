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

#include "usb_pnp_manager.h"
#include <pthread.h>
#include <unistd.h>

#include "ddk_device_manager.h"
#include "ddk_pnp_listener_mgr.h"
#include "ddk_uevent_handle.h"
#include "devsvc_manager_clnt.h"
#include "hdf_base.h"
#include "hdf_device_desc.h"
#include "hdf_device_object.h"
#include "hdf_io_service_if.h"
#include "hdf_log.h"
#include "osal_mem.h"
#include "securec.h"
#include "usb_ddk_pnp_loader.h"

#define HDF_LOG_TAG    usb_pnp_manager
#define MODULENAMESIZE 128

bool UsbPnpManagerWriteModuleName(struct HdfSBuf *sbuf, const char *moduleName)
{
    char modName[MODULENAMESIZE] = {0};
    if (sprintf_s(modName, MODULENAMESIZE, "lib%s.z.so", moduleName) < 0) {
        HDF_LOGE("%{public}s: sprintf_s modName failed", __func__);
        return false;
    }

    return HdfSbufWriteString(sbuf, modName);
}

static int32_t UsbPnpManagerDispatch(
    struct HdfDeviceIoClient *client, int32_t cmd, struct HdfSBuf *data, struct HdfSBuf *reply)
{
    (void)client;
    (void)cmd;
    (void)data;
    (void)reply;

    HDF_LOGI("received cmd = %d", cmd);
    return HDF_SUCCESS;
}

static int32_t UsbPnpManagerBind(struct HdfDeviceObject *device)
{
    static struct IDeviceIoService pnpLoaderService = {
        .Dispatch = UsbPnpManagerDispatch,
    };

    if (device == NULL) {
        return HDF_ERR_INVALID_OBJECT;
    }

    device->service = &pnpLoaderService;
    HDF_LOGI("usb pnp manager bind success\n");

    return HDF_SUCCESS;
}

#ifdef USB_EVENT_NOTIFY_LINUX_NATIVE_MODE
int32_t UsbPnpManagerStartUeventThread(void)
{
    pthread_t tid;
    int32_t ret = pthread_create(&tid, NULL, DdkUeventMain, NULL);
    if (ret != 0) {
        HDF_LOGE("%{public}s: create thread failed:%{public}d", __func__, ret);
        return ret;
    }

    ret = pthread_setname_np(tid, "usbpnpUeventThd");
    if (ret != 0) {
        HDF_LOGE("%{public}s: set thread name failed:%{public}d", __func__, ret);
    }
    return ret;
}
#endif

static int32_t UsbPnpManagerInit(struct HdfDeviceObject *device)
{
    static struct HdfDevEventlistener usbPnpListener = {
        .callBack = UsbDdkPnpLoaderEventReceived,
    };
    usbPnpListener.priv = (void *)(device);

    int32_t ret = DdkDevMgrInit();
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s: DdkDevMgrInit error", __func__);
        return HDF_FAILURE;
    }

    ret = DdkListenerMgrInit();
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s: DdkListenerMgrInit error", __func__);
        return HDF_FAILURE;
    }

    ret = DdkUeventInit();
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s: DdkUeventInit error", __func__);
        return ret;
    }
#ifdef USB_EVENT_NOTIFY_LINUX_NATIVE_MODE
    if (UsbPnpManagerStartUeventThread() != HDF_SUCCESS) {
        HDF_LOGE("%{public}s: start uevent thread failed", __func__);
        return HDF_FAILURE;
    }
#endif
    ret = UsbDdkPnpLoaderEventHandle();
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s: UsbDdkPnpLoaderEventHandle failed", __func__);
        return ret;
    }
    if (DdkListenerMgrAdd(&usbPnpListener) != HDF_SUCCESS) {
        HDF_LOGE("%{public}s: add listener failed", __func__);
        return HDF_FAILURE;
    }
    HDF_LOGI("UsbPnpManagerInit done");
    return HDF_SUCCESS;
}

static void UsbPnpManagerRelease(struct HdfDeviceObject *device)
{
    (void)device;
    return;
}

struct HdfDriverEntry g_usbPnpManagerEntry = {
    .moduleVersion = 1,
    .Bind = UsbPnpManagerBind,
    .Init = UsbPnpManagerInit,
    .Release = UsbPnpManagerRelease,
    .moduleName = "HDF_USB_PNP_MANAGER",
};

HDF_INIT(g_usbPnpManagerEntry);
