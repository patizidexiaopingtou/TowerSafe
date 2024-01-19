/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 *
 * HDF is dual licensed: you can use it either under the terms of
 * the GPL, or the BSD license, at your option.
 * See the LICENSE file in the root of this repository for complete details.
 */

#include "gpio_if.h"
#include "gpio/gpio_service.h"
#include "hdf_base.h"
#include "hdf_io_service_if.h"
#include "osal_mem.h"
#include "platform_core.h"
#include "platform_listener_u.h"

#define PLAT_LOG_TAG gpio_if_u

#define GPIO_NAME_LEN    16

static struct HdfIoService *GpioManagerServiceGet(void)
{
    static struct HdfIoService *service = NULL;

    if (service != NULL) {
        return service;
    }
    service = HdfIoServiceBind("HDF_PLATFORM_GPIO_MANAGER");
    if (service == NULL) {
        HDF_LOGE("%s: failed to get gpio manager service!", __func__);
        return NULL;
    }

    if (service->priv == NULL) {
        struct PlatformUserListenerManager *manager = PlatformUserListenerManagerGet(PLATFORM_MODULE_GPIO);
        if (manager == NULL) {
            HDF_LOGE("%s: failed to get PlatformUserListenerManager!", __func__);
            return service;
        }
        service->priv = manager;
        manager->service = service;
    }
    return service;
}

int32_t GpioRead(uint16_t gpio, uint16_t *val)
{
    int32_t ret;
    struct HdfIoService *service = NULL;
    struct HdfSBuf *data = NULL;
    struct HdfSBuf *reply = NULL;

    service = GpioManagerServiceGet();
    if (service == NULL || service->dispatcher == NULL || service->dispatcher->Dispatch == NULL) {
        HDF_LOGE("%s: failed to get gpio manager service!", __func__);
        return HDF_PLT_ERR_DEV_GET;
    }

    data = HdfSbufObtainDefaultSize();
    if (data == NULL) {
        HDF_LOGE("%s: failed to obtain data!", __func__);
        return HDF_ERR_MALLOC_FAIL;
    }

    reply = HdfSbufObtainDefaultSize();
    if (reply == NULL) {
        HDF_LOGE("%s: failed to obtain reply!", __func__);
        HdfSbufRecycle(data);
        return HDF_ERR_MALLOC_FAIL;
    }

    if (!HdfSbufWriteUint16(data, (uint16_t)gpio)) {
        HDF_LOGE("%s: failed to write gpio number!", __func__);
        HdfSbufRecycle(data);
        HdfSbufRecycle(reply);
        return HDF_ERR_IO;
    }

    ret = service->dispatcher->Dispatch(&service->object, GPIO_IO_READ, data, reply);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: service call GPIO_IO_READ failed:%d!", __func__, ret);
        HdfSbufRecycle(data);
        HdfSbufRecycle(reply);
        return ret;
    }

    if (!HdfSbufReadUint16(reply, val)) {
        HDF_LOGE("%s: failed to read sbuf!", __func__);
        HdfSbufRecycle(data);
        HdfSbufRecycle(reply);
        return HDF_ERR_IO;
    }

    HdfSbufRecycle(data);
    HdfSbufRecycle(reply);
    return HDF_SUCCESS;
}

int32_t GpioWrite(uint16_t gpio, uint16_t val)
{
    int32_t ret;
    struct HdfIoService *service = NULL;
    struct HdfSBuf *data = NULL;

    service = GpioManagerServiceGet();
    if (service == NULL || service->dispatcher == NULL || service->dispatcher->Dispatch == NULL) {
        HDF_LOGE("%s: failed to get gpio manager service!", __func__);
        return HDF_PLT_ERR_DEV_GET;
    }

    data = HdfSbufObtainDefaultSize();
    if (data == NULL) {
        HDF_LOGE("%s: failed to obtain data!", __func__);
        return HDF_ERR_MALLOC_FAIL;
    }

    if (!HdfSbufWriteUint16(data, (uint16_t)gpio)) {
        HDF_LOGE("%s: failed to write gpio number!", __func__);
        HdfSbufRecycle(data);
        return HDF_ERR_IO;
    }

    if (!HdfSbufWriteUint16(data, (uint16_t)val)) {
        HDF_LOGE("%s: failed to write gpio value!", __func__);
        HdfSbufRecycle(data);
        return HDF_ERR_IO;
    }

    ret = service->dispatcher->Dispatch(&service->object, GPIO_IO_WRITE, data, NULL);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: service call GPIO_IO_WRITE failed:%d!", __func__, ret);
        HdfSbufRecycle(data);
        return ret;
    }

    HdfSbufRecycle(data);
    return HDF_SUCCESS;
}

int32_t GpioGetDir(uint16_t gpio, uint16_t *dir)
{
    int32_t ret;
    struct HdfIoService *service = NULL;
    struct HdfSBuf *data = NULL;
    struct HdfSBuf *reply = NULL;

    if (dir == NULL) {
        HDF_LOGE("%s: dir is NULL!", __func__);
        return HDF_ERR_INVALID_OBJECT;
    }

    service = GpioManagerServiceGet();
    if (service == NULL || service->dispatcher == NULL || service->dispatcher->Dispatch == NULL) {
        HDF_LOGE("%s: failed to get gpio manager service!", __func__);
        return HDF_PLT_ERR_DEV_GET;
    }

    data = HdfSbufObtainDefaultSize();
    if (data == NULL) {
        HDF_LOGE("%s: failed to obtain data!", __func__);
        return HDF_ERR_MALLOC_FAIL;
    }

    reply = HdfSbufObtainDefaultSize();
    if (reply == NULL) {
        HDF_LOGE("%s: failed to obtain reply!", __func__);
        HdfSbufRecycle(data);
        return HDF_ERR_MALLOC_FAIL;
    }

    if (!HdfSbufWriteUint16(data, (uint16_t)gpio)) {
        HDF_LOGE("%s: failed to write gpio number!", __func__);
        HdfSbufRecycle(data);
        HdfSbufRecycle(reply);
        return HDF_ERR_IO;
    }

    ret = service->dispatcher->Dispatch(&service->object, GPIO_IO_GETDIR, data, reply);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: service call GPIO_IO_GETDIR failed:%d!", __func__, ret);
        HdfSbufRecycle(data);
        HdfSbufRecycle(reply);
        return ret;
    }

    if (!HdfSbufReadUint16(reply, dir)) {
        HDF_LOGE("%s: failed to read sbuf!", __func__);
        HdfSbufRecycle(data);
        HdfSbufRecycle(reply);
        return HDF_ERR_IO;
    }

    HdfSbufRecycle(data);
    HdfSbufRecycle(reply);
    return HDF_SUCCESS;
}

int32_t GpioSetDir(uint16_t gpio, uint16_t dir)
{
    int32_t ret;
    struct HdfIoService *service = NULL;
    struct HdfSBuf *data = NULL;

    service = GpioManagerServiceGet();
    if (service == NULL || service->dispatcher == NULL || service->dispatcher->Dispatch == NULL) {
        HDF_LOGE("%s: failed to get gpio manager service!", __func__);
        return HDF_PLT_ERR_DEV_GET;
    }

    data = HdfSbufObtainDefaultSize();
    if (data == NULL) {
        HDF_LOGE("%s: failed to obtain data!", __func__);
        return HDF_ERR_MALLOC_FAIL;
    }

    if (!HdfSbufWriteUint16(data, (uint16_t)gpio)) {
        HDF_LOGE("%s: failed to write gpio number!", __func__);
        HdfSbufRecycle(data);
        return HDF_ERR_IO;
    }

    if (!HdfSbufWriteUint16(data, (uint16_t)dir)) {
        HDF_LOGE("%s: failed to write gpio value!", __func__);
        HdfSbufRecycle(data);
        return HDF_ERR_IO;
    }

    ret = service->dispatcher->Dispatch(&service->object, GPIO_IO_SETDIR, data, NULL);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: service call GPIO_IO_SETDIR failed:%d!", __func__, ret);
        HdfSbufRecycle(data);
        return ret;
    }

    HdfSbufRecycle(data);
    return HDF_SUCCESS;
}

static int32_t GpioRegListener(struct HdfIoService *service, uint16_t gpio, GpioIrqFunc func, void *arg)
{
    struct PlatformUserListenerGpioParam *param = NULL;

    param = OsalMemCalloc(sizeof(struct PlatformUserListenerGpioParam));
    if (param == NULL) {
        HDF_LOGE("%s: failed to calloc for param!", __func__);
        return HDF_ERR_IO;
    }
    param->gpio = gpio;
    param->func = func;
    param->data = arg;

    if (PlatformUserListenerReg((struct PlatformUserListenerManager *)service->priv, gpio, (void *)param,
        GpioOnDevEventReceive) != HDF_SUCCESS) {
        HDF_LOGE("%s: PlatformUserListenerReg failed!", __func__);
        OsalMemFree(param);
        return HDF_ERR_IO;
    }
    return HDF_SUCCESS;
}

int32_t GpioSetIrq(uint16_t gpio, uint16_t mode, GpioIrqFunc func, void *arg)
{
    int32_t ret;
    struct HdfIoService *service = NULL;
    struct HdfSBuf *data = NULL;

    if (func == NULL) {
        HDF_LOGE("%s: func is NULL!", __func__);
        return HDF_ERR_INVALID_PARAM;
    }

    service = GpioManagerServiceGet();
    if (service == NULL || service->dispatcher == NULL || service->dispatcher->Dispatch == NULL) {
        HDF_LOGE("%s: failed to get gpio manager service!", __func__);
        return HDF_PLT_ERR_DEV_GET;
    }

    if (GpioRegListener(service, gpio, func, arg) != HDF_SUCCESS) {
        HDF_LOGE("%s: GpioGetListener failed!", __func__);
        return HDF_FAILURE;
    }

    data = HdfSbufObtainDefaultSize();
    if (data == NULL) {
        HDF_LOGE("%s: failed to obtain data!", __func__);
        PlatformUserListenerDestory((struct PlatformUserListenerManager *)service->priv, gpio);
        return HDF_ERR_MALLOC_FAIL;
    }

    if (!HdfSbufWriteUint16(data, gpio)) {
        HDF_LOGE("%s: failed to write gpio number!", __func__);
        PlatformUserListenerDestory((struct PlatformUserListenerManager *)service->priv, gpio);
        HdfSbufRecycle(data);
        return HDF_ERR_IO;
    }

    if (!HdfSbufWriteUint16(data, mode)) {
        HDF_LOGE("%s: failed to write gpio mode!", __func__);
        PlatformUserListenerDestory((struct PlatformUserListenerManager *)service->priv, gpio);
        HdfSbufRecycle(data);
        return HDF_ERR_IO;
    }

    ret = service->dispatcher->Dispatch(&service->object, GPIO_IO_SETIRQ, data, NULL);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: service call GPIO_IO_SETIRQ failed:%d %d!", __func__, ret, gpio);
        PlatformUserListenerDestory((struct PlatformUserListenerManager *)service->priv, gpio);
        HdfSbufRecycle(data);
        return ret;
    }

    HdfSbufRecycle(data);
    return HDF_SUCCESS;
}

int32_t GpioUnsetIrq(uint16_t gpio, void *arg)
{
    int32_t ret;
    struct HdfIoService *service = NULL;
    struct HdfSBuf *data = NULL;

    (void)arg;

    service = GpioManagerServiceGet();
    if (service == NULL || service->dispatcher == NULL || service->dispatcher->Dispatch == NULL) {
        HDF_LOGE("%s: failed to get gpio manager service!", __func__);
        return HDF_PLT_ERR_DEV_GET;
    }

    data = HdfSbufObtainDefaultSize();
    if (data == NULL) {
        HDF_LOGE("%s: failed to obtain data!", __func__);
        return HDF_ERR_MALLOC_FAIL;
    }

    if (!HdfSbufWriteUint16(data, gpio)) {
        HDF_LOGE("%s: failed to write gpio number!", __func__);
        HdfSbufRecycle(data);
        return HDF_ERR_IO;
    }

    ret = service->dispatcher->Dispatch(&service->object, GPIO_IO_UNSETIRQ, data, NULL);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: service call GPIO_IO_UNSETIRQ failed:%d!", __func__, ret);
        HdfSbufRecycle(data);
        return ret;
    }

    HdfSbufRecycle(data);
    PlatformUserListenerDestory((struct PlatformUserListenerManager *)service->priv, gpio);
    return HDF_SUCCESS;
}

int32_t GpioEnableIrq(uint16_t gpio)
{
    int32_t ret;
    struct HdfIoService *service = NULL;
    struct HdfSBuf *data = NULL;

    service = GpioManagerServiceGet();
    if (service == NULL || service->dispatcher == NULL || service->dispatcher->Dispatch == NULL) {
        HDF_LOGE("%s: failed to get gpio manager service!", __func__);
        return HDF_PLT_ERR_DEV_GET;
    }

    data = HdfSbufObtainDefaultSize();
    if (data == NULL) {
        HDF_LOGE("%s: failed to obtain data!", __func__);
        return HDF_ERR_MALLOC_FAIL;
    }

    if (!HdfSbufWriteUint16(data, (uint16_t)gpio)) {
        HDF_LOGE("%s: failed to write gpio number!", __func__);
        HdfSbufRecycle(data);
        return HDF_ERR_IO;
    }

    ret = service->dispatcher->Dispatch(&service->object, GPIO_IO_ENABLEIRQ, data, NULL);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: service call GPIO_IO_ENABLEIRQ failed:%d!", __func__, ret);
        HdfSbufRecycle(data);
        return ret;
    }

    HdfSbufRecycle(data);
    return HDF_SUCCESS;
}

int32_t GpioDisableIrq(uint16_t gpio)
{
    int32_t ret;
    struct HdfIoService *service = NULL;
    struct HdfSBuf *data = NULL;

    service = GpioManagerServiceGet();
    if (service == NULL || service->dispatcher == NULL || service->dispatcher->Dispatch == NULL) {
        HDF_LOGE("%s: failed to get gpio manager service!", __func__);
        return HDF_PLT_ERR_DEV_GET;
    }

    data = HdfSbufObtainDefaultSize();
    if (data == NULL) {
        HDF_LOGE("%s: failed to obtain data!", __func__);
        return HDF_ERR_MALLOC_FAIL;
    }

    if (!HdfSbufWriteUint16(data, (uint16_t)gpio)) {
        HDF_LOGE("%s: failed to write gpio number!", __func__);
        HdfSbufRecycle(data);
        return HDF_ERR_IO;
    }

    ret = service->dispatcher->Dispatch(&service->object, GPIO_IO_DISABLEIRQ, data, NULL);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: service call GPIO_IO_DISABLEIRQ failed:%d!", __func__, ret);
        HdfSbufRecycle(data);
        return ret;
    }

    HdfSbufRecycle(data);
    return HDF_SUCCESS;
}

int32_t GpioGetByName(const char *gpioName)
{
    int32_t ret;
    struct HdfIoService *service = NULL;
    struct HdfSBuf *data = NULL;
    struct HdfSBuf *reply = NULL;

    if (gpioName == NULL || strlen(gpioName) > GPIO_NAME_LEN) {
        HDF_LOGE("%s: gpioName is NULL or gpioName len out of range!", __func__);
        return HDF_ERR_INVALID_OBJECT;
    }

    service = GpioManagerServiceGet();
    if (service == NULL || service->dispatcher == NULL || service->dispatcher->Dispatch == NULL) {
        HDF_LOGE("%s: failed to get gpio manager service!", __func__);
        return HDF_PLT_ERR_DEV_GET;
    }

    data = HdfSbufObtainDefaultSize();
    if (data == NULL) {
        HDF_LOGE("%s: failed to obtain data!", __func__);
        return HDF_ERR_MALLOC_FAIL;
    }

    reply = HdfSbufObtainDefaultSize();
    if (reply == NULL) {
        HDF_LOGE("%s: failed to obtain reply!", __func__);
        HdfSbufRecycle(data);
        return HDF_ERR_MALLOC_FAIL;
    }

    if (!HdfSbufWriteString(data, gpioName)) {
        HDF_LOGE("%s: failed to write gpioName!", __func__);
        HdfSbufRecycle(data);
        HdfSbufRecycle(reply);
        return HDF_ERR_IO;
    }

    ret = service->dispatcher->Dispatch(&service->object, GPIO_IO_GET_NUM_BY_NAME, data, reply);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: service call GPIO_IO_GET_NUM_BY_NAME failed:%d!", __func__, ret);
        HdfSbufRecycle(data);
        HdfSbufRecycle(reply);
        return ret;
    }

    if (!HdfSbufReadInt32(reply, &ret)) {
        HDF_LOGE("%s: failed to read gpio global number!", __func__);
        HdfSbufRecycle(data);
        HdfSbufRecycle(reply);
        return HDF_ERR_IO;
    }

    HdfSbufRecycle(data);
    HdfSbufRecycle(reply);
    return ret;
}
