/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 *
 * HDF is dual licensed: you can use it either under the terms of
 * the GPL, or the BSD license, at your option.
 * See the LICENSE file in the root of this repository for complete details.
 */

#include "ioservicelisten_fuzzer.h"
#include <cstddef>
#include <cstdint>
#include "hdf_base.h"
#include "hdf_log.h"
#include "hdf_io_service.h"
#include "osal_time.h"
#include "parcel.h"

namespace OHOS {
struct Eventlistener {
    struct HdfDevEventlistener listener;
    int32_t eventCount;
};
static int OnDevEventReceived(
    struct HdfDevEventlistener *listener, struct HdfIoService *service, uint32_t id, struct HdfSBuf *data);

static struct Eventlistener g_listener0 = {
    .listener.onReceive = OnDevEventReceived,
    .listener.priv = const_cast<void *>(static_cast<const void *>("listener0")),
    .eventCount = 0,
};

static int OnDevEventReceived(
    struct HdfDevEventlistener *listener, struct HdfIoService *service, uint32_t id, struct HdfSBuf *data)
{
    OsalTimespec time;
    OsalGetTime(&time);
    (void)service;
    (void)id;
    const char *string = HdfSbufReadString(data);
    if (string == nullptr) {
        HDF_LOGE("failed to read string in event data");
        return HDF_SUCCESS;
    }
    struct Eventlistener *listenercount = CONTAINER_OF(listener, struct Eventlistener, listener);
    listenercount->eventCount++;
    return HDF_SUCCESS;
}

bool IoserviceListenFuzzTest(const uint8_t *data, size_t size)
{
    bool result = false;
    Parcel parcel;
    parcel.WriteBuffer(data, size);
    auto servicename = parcel.ReadCString();
    struct HdfIoService *serv = HdfIoServiceBind(servicename);
    if (serv == nullptr) {
        HDF_LOGE("%{public}s: HdfIoServiceBind failed!", __func__);
        return false;
    }
    if (HdfDeviceRegisterEventListener(serv, &g_listener0.listener) == HDF_SUCCESS) {
        int ret = HdfDeviceUnregisterEventListener(serv, &g_listener0.listener);
        if (ret != HDF_SUCCESS) {
            HdfIoServiceRecycle(serv);
            return false;
        }
        result = true;
    }
    HdfIoServiceRecycle(serv);
    return result;
}
} // namespace OHOS

extern "C" int LLVMFuzzerTestOneInput(const uint8_t *data, size_t size)
{
    OHOS::IoserviceListenFuzzTest(data, size);
    return HDF_SUCCESS;
}
