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

#include <hdf_base.h>
#include <hdf_device_desc.h>
#include <hdf_log.h>
#include <hdf_sbuf_ipc.h>

#include "dcamera_provider.h"
#include "v1_0/dcamera_provider_stub.h"

using namespace OHOS::HDI::DistributedCamera::V1_0;

struct HdfDCameraProviderHost {
    struct IDeviceIoService ioService;
    OHOS::sptr<OHOS::IRemoteObject> stub;
};

static int32_t DCameraProviderDriverDispatch(struct HdfDeviceIoClient *client, int cmdId, struct HdfSBuf *data,
    struct HdfSBuf *reply)
{
    auto *hdfDCameraProviderHost = CONTAINER_OF(client->device->service, struct HdfDCameraProviderHost, ioService);

    OHOS::MessageParcel *dataParcel = nullptr;
    OHOS::MessageParcel *replyParcel = nullptr;
    OHOS::MessageOption option;

    if (SbufToParcel(data, &dataParcel) != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:invalid data sbuf object to dispatch", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    if (SbufToParcel(reply, &replyParcel) != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:invalid reply sbuf object to dispatch", __func__);
        return HDF_ERR_INVALID_PARAM;
    }

    return hdfDCameraProviderHost->stub->SendRequest(cmdId, *dataParcel, *replyParcel, option);
}

static int HdfDCameraProviderDriverInit(struct HdfDeviceObject *deviceObject)
{
    HDF_LOGI("HdfDCameraProviderDriverInit enter");
    if (deviceObject == nullptr) {
        HDF_LOGE("HdfDCameraProviderDriverInit:: HdfDeviceObject is NULL !");
        return HDF_FAILURE;
    }

    if (!HdfDeviceSetClass(deviceObject, DEVICE_CLASS_CAMERA)) {
        HDF_LOGE("HdfDCameraProviderDriverInit set camera class failed");
        return HDF_FAILURE;
    }
    return HDF_SUCCESS;
}

static int HdfDCameraProviderDriverBind(struct HdfDeviceObject *deviceObject)
{
    HDF_LOGI("HdfDCameraProviderDriverBind enter");

    auto *hdfDCameraProviderHost = new (std::nothrow) HdfDCameraProviderHost;
    if (hdfDCameraProviderHost == nullptr) {
        HDF_LOGE("%{public}s: failed to create create HdfDCameraProviderHost object", __func__);
        return HDF_FAILURE;
    }

    hdfDCameraProviderHost->ioService.Dispatch = DCameraProviderDriverDispatch;
    hdfDCameraProviderHost->ioService.Open = NULL;
    hdfDCameraProviderHost->ioService.Release = NULL;

    auto serviceImpl = OHOS::DistributedHardware::DCameraProvider::GetInstance();
    if (serviceImpl == nullptr) {
        HDF_LOGE("%{public}s: failed to get of implement service", __func__);
        delete hdfDCameraProviderHost;
        return HDF_FAILURE;
    }

    hdfDCameraProviderHost->stub = OHOS::HDI::ObjectCollector::GetInstance().GetOrNewObject(serviceImpl,
        IDCameraProvider::GetDescriptor());
    if (hdfDCameraProviderHost->stub == nullptr) {
        HDF_LOGE("%{public}s: failed to get stub object", __func__);
        delete hdfDCameraProviderHost;
        return HDF_FAILURE;
    }

    deviceObject->service = &hdfDCameraProviderHost->ioService;
    return HDF_SUCCESS;
}

static void HdfDCameraProviderDriverRelease(struct HdfDeviceObject *deviceObject)
{
    HDF_LOGI("HdfDCameraProviderDriverRelease enter");
    if (deviceObject == nullptr || deviceObject->service == nullptr) {
        HDF_LOGE("%{public}s: params invalid.", __func__);
        return;
    }
    auto *hdfDCameraProviderHost = CONTAINER_OF(deviceObject->service, struct HdfDCameraProviderHost, ioService);
    delete hdfDCameraProviderHost;
}

static struct HdfDriverEntry g_dcameraproviderDriverEntry = {
    .moduleVersion = 1,
    .moduleName = "distributed_camera_provider_service",
    .Bind = HdfDCameraProviderDriverBind,
    .Init = HdfDCameraProviderDriverInit,
    .Release = HdfDCameraProviderDriverRelease,
};

#ifdef __cplusplus
extern "C" {
#endif /* __cplusplus */
HDF_INIT(g_dcameraproviderDriverEntry);
#ifdef __cplusplus
}
#endif /* __cplusplus */
