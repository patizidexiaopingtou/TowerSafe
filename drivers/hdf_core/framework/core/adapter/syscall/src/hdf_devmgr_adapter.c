/*
 * Copyright (c) 2020-2022 Huawei Device Co., Ltd.
 *
 * HDF is dual licensed: you can use it either under the terms of
 * the GPL, or the BSD license, at your option.
 * See the LICENSE file in the root of this repository for complete details.
 */

#include "hdf_base.h"
#include "hdf_io_service.h"
#include "hdf_log.h"
#include "hdf_sbuf.h"

#define HDF_LOG_TAG hdf_devmgr_adapter

int32_t HdfLoadDriverByServiceName(const char *serviceName)
{
    int32_t ret = HDF_FAILURE;
    struct HdfSBuf *data = NULL;
    if (serviceName == NULL || strcmp(serviceName, DEV_MGR_NODE) == 0) {
        return ret;
    }
    struct HdfIoService *ioService = HdfIoServiceBind(DEV_MGR_NODE);
    if (ioService == NULL) {
        HDF_LOGE("HdfLoadDriverByServiceName failed to get %s service", DEV_MGR_NODE);
        return ret;
    }
    data = HdfSbufObtainDefaultSize();
    if (data == NULL) {
        HDF_LOGE("HdfLoadDriverByServiceName failed to obtain sbuf data");
        ret = HDF_DEV_ERR_NO_MEMORY;
        goto OUT;
    }
    if (!HdfSbufWriteString(data, serviceName)) {
        HDF_LOGE("HdfLoadDriverByServiceName failed to write sbuf");
        ret = HDF_FAILURE;
        goto OUT;
    }
    ret = ioService->dispatcher->Dispatch(&ioService->object, DEVMGR_LOAD_SERVICE, data, NULL);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("HdfLoadDriverByServiceName failed to load khdf driver %s", serviceName);
    }
OUT:
    HdfIoServiceRecycle(ioService);
    HdfSbufRecycle(data);
    return ret;
}

int32_t HdfGetServiceNameByDeviceClass(DeviceClass deviceClass, struct HdfSBuf *reply)
{
    int32_t ret = HDF_FAILURE;
    struct HdfSBuf *data = NULL;
    if (reply == NULL) {
        HDF_LOGE("%s input reply is null", __func__);
        return ret;
    }
    struct HdfIoService *ioService = HdfIoServiceBind(DEV_MGR_NODE);
    if (ioService == NULL) {
        HDF_LOGE("HdfGetServiceNameByDeviceClass failed to get %s service", DEV_MGR_NODE);
        return ret;
    }
    data = HdfSbufObtainDefaultSize();
    if (data == NULL) {
        HDF_LOGE("HdfGetServiceNameByDeviceClass failed to obtain sbuf data");
        ret = HDF_DEV_ERR_NO_MEMORY;
        goto OUT;
    }
    if (!HdfSbufWriteInt32(data, deviceClass)) {
        HDF_LOGE("HdfGetServiceNameByDeviceClass failed to write sbuf");
        ret = HDF_FAILURE;
        goto OUT;
    }
    ret = ioService->dispatcher->Dispatch(&ioService->object, DEVMGR_GET_SERVICE, data, reply);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("HdfGetServiceNameByDeviceClass failed to query service by class");
    }
OUT:
    HdfIoServiceRecycle(ioService);
    HdfSbufRecycle(data);
    return ret;
}

int32_t HdfListAllService(struct HdfSBuf *reply)
{
    int32_t ret = HDF_FAILURE;
    if (reply == NULL) {
        HDF_LOGE("HdfListAllService input reply is null");
        return ret;
    }
    struct HdfIoService *ioService = HdfIoServiceBind(DEV_MGR_NODE);
    if (ioService == NULL) {
        HDF_LOGE("HdfListAllService failed to get %s service", DEV_MGR_NODE);
        return ret;
    }

    ret = ioService->dispatcher->Dispatch(&ioService->object, DEVMGR_LIST_ALL_SERVICE, NULL, reply);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("failed to list all service info");
    }
    HdfIoServiceRecycle(ioService);
    return ret;
}

int32_t HdfListAllDevice(struct HdfSBuf *reply)
{
    int32_t ret = HDF_FAILURE;
    if (reply == NULL) {
        HDF_LOGE("HdfListAllDevice input reply is null");
        return ret;
    }
    struct HdfIoService *ioService = HdfIoServiceBind(DEV_MGR_NODE);
    if (ioService == NULL) {
        HDF_LOGE("HdfListAllDevice failed to get %s service", DEV_MGR_NODE);
        return ret;
    }

    ret = ioService->dispatcher->Dispatch(&ioService->object, DEVMGR_LIST_ALL_DEVICE, NULL, reply);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("failed to list all device info");
    }
    HdfIoServiceRecycle(ioService);
    return ret;
}
