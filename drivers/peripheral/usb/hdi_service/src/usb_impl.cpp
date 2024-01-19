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

#include "usb_impl.h"
#include <cerrno>
#include <hdf_base.h>
#include <hdf_log.h>
#include <sys/mman.h>
#include <sys/types.h>
#include <unistd.h>

#include "ddk_pnp_listener_mgr.h"
#include "hdf_slist.h"
#include "osal_mutex.h"
#include "usb_ddk_interface.h"
#include "usb_ddk_pnp_loader.h"
#include "usb_interface_pool.h"
#include "usbd_dispatcher.h"
#include "usbd_function.h"
#include "usbd_load_usb_service.h"
#include "usbd_port.h"

namespace OHOS {
namespace HDI {
namespace Usb {
namespace V1_0 {
HdfDevEventlistener UsbImpl::listenerForLoadService_ = {0};
UsbdSubscriber UsbImpl::subscribers_[MAX_SUBSCRIBER] = {{0}};
bool UsbImpl::isGadgetConnected_ = false;

extern "C" IUsbInterface *UsbInterfaceImplGetInstance(void)
{
    return new (std::nothrow) UsbImpl();
}

UsbImpl::UsbImpl() : session_(nullptr), device_(nullptr)
{
    HdfSListInit(&devList_);
    OsalMutexInit(&lock_);
}

UsbImpl::~UsbImpl()
{
    UsbdReleaseDevices();
}

HostDevice *UsbImpl::FindDevFromService(uint8_t busNum, uint8_t devAddr)
{
    HdfSListIterator it;
    HostDevice *port = nullptr;
    bool flag = false;

    OsalMutexLock(&lock_);
    HdfSListIteratorInit(&it, &devList_);
    while (HdfSListIteratorHasNext(&it)) {
        port = reinterpret_cast<HostDevice *>(HdfSListIteratorNext(&it));
        if (port == nullptr) {
            continue;
        }
        if (port->busNum == busNum && port->devAddr == devAddr) {
            flag = true;
            break;
        }
    }
    OsalMutexUnlock(&lock_);
    if (!flag) {
        return nullptr;
    }
    return port;
}

void UsbImpl::MakeUsbControlParams(
    UsbControlParams *controlParams, uint8_t *buffer, uint16_t length, uint16_t value, uint16_t index)
{
    if (controlParams == nullptr || buffer == nullptr) {
        HDF_LOGE("%{public}s: %{public}d controlParams or buffer is nullptr", __func__, __LINE__);
        return;
    }

    controlParams->request = USB_DDK_REQ_GET_DESCRIPTOR;
    controlParams->target = USB_REQUEST_TARGET_DEVICE;
    controlParams->reqType = USB_REQUEST_TYPE_STANDARD;
    controlParams->directon = USB_REQUEST_DIR_FROM_DEVICE;
    controlParams->value = value;
    controlParams->index = index;
    controlParams->data = buffer;
    controlParams->size = length;
}

void UsbImpl::MakeGetActiveUsbControlParams(
    UsbControlParams *controlParams, uint8_t *buffer, uint16_t length, uint16_t value, uint16_t index)
{
    if (controlParams == nullptr || buffer == nullptr) {
        HDF_LOGE("%{public}s: %{public}d controlParams or buffer is nullptr", __func__, __LINE__);
        return;
    }

    controlParams->request = USB_DDK_REQ_GET_CONFIGURATION;
    controlParams->target = USB_REQUEST_TARGET_DEVICE;
    controlParams->reqType = USB_REQUEST_TYPE_STANDARD;
    controlParams->directon = USB_REQUEST_DIR_FROM_DEVICE;
    controlParams->value = value;
    controlParams->index = index;
    controlParams->data = buffer;
    controlParams->size = length;
}

int32_t UsbImpl::UsbControlTransferEx(HostDevice *dev, UsbControlParams *ctrParams, int32_t timeout)
{
    UsbRequestParams params;
    if (memset_s(&params, sizeof(params), 0, sizeof(params)) != EOK) {
        HDF_LOGE("%{public}s:memset_s params failed", __func__);
        return HDF_FAILURE;
    }

    if (dev == nullptr || dev->ctrDevHandle == nullptr || ctrParams == nullptr || ctrParams->data == nullptr) {
        HDF_LOGE("%{public}s:invalid params", __func__);
        return HDF_ERR_INVALID_PARAM;
    }

    UsbRequest *request = nullptr;
    if (dev->ctrlReq == nullptr) {
        request = UsbAllocRequest(dev->ctrDevHandle, 0, MAX_CONTROL_BUFF_SIZE);
        if (request == nullptr) {
            return HDF_ERR_MALLOC_FAIL;
        }
        dev->ctrlReq = request;
    } else {
        request = dev->ctrlReq;
    }

    UsbdDispatcher::UsbRequestParamsInit(&params, timeout);
    int32_t ret = UsbdDispatcher::UsbControlSetUp(ctrParams, &params.ctrlReq);
    if (ret != HDF_SUCCESS) {
        return ret;
    }
    OsalMutexLock(&dev->lock);
    do {
        ret = UsbFillRequest(request, dev->ctrDevHandle, &params);
        if (ret != HDF_SUCCESS) {
            HDF_LOGE("%{public}s:UsbFillRequest failed, ret = %{public}d", __func__, ret);
            break;
        }

        ret = UsbSubmitRequestSync(request);
        if (ret != HDF_SUCCESS) {
            HDF_LOGE("%{public}s:UsbSubmitRequestSync failed, ret=%{public}d", __func__, ret);
            break;
        }

        if (ctrParams->directon == USB_REQUEST_DIR_FROM_DEVICE) {
            ret = memcpy_s(ctrParams->data, ctrParams->size, request->compInfo.buffer, request->compInfo.actualLength);
            if (ret != EOK) {
                HDF_LOGE("%{public}s: memcpy_s failed, ret  = %{public}d", __func__, ret);
                break;
            }
            ctrParams->size =
                ctrParams->size < request->compInfo.actualLength ? ctrParams->size : request->compInfo.actualLength;
        }
    } while (0);

    OsalMutexUnlock(&dev->lock);
    return ret;
}

void UsbImpl::MakeSetActiveUsbControlParams(
    UsbControlParams *controlParams, uint8_t *buffer, uint16_t length, uint16_t value, uint16_t index)
{
    if (controlParams == nullptr || buffer == nullptr) {
        HDF_LOGE("%{public}s: %{public}d controlParams or buffer is nullptr", __func__, __LINE__);
        return;
    }

    controlParams->request = USB_DDK_REQ_SET_CONFIGURATION;
    controlParams->target = USB_REQUEST_TARGET_DEVICE;
    controlParams->reqType = USB_REQUEST_TYPE_STANDARD;
    controlParams->directon = USB_REQUEST_DIR_FROM_DEVICE;
    controlParams->value = value;
    controlParams->index = index;
    controlParams->data = buffer;
    controlParams->size = length;
}

int32_t UsbImpl::ReOpenDevice(HostDevice *port)
{
    if (port == nullptr) {
        HDF_LOGE("%{public}s:invalid param port", __func__);
        return HDF_FAILURE;
    }

    uint8_t busNum = port->busNum;
    uint8_t devAddr = port->devAddr;
    UsbdDispatcher::UsbdRelease(port);
    port->busNum = busNum;
    port->devAddr = devAddr;
    OsalMutexInit(&port->writeLock);
    OsalMutexInit(&port->readLock);
    OsalMutexInit(&port->lock);
    OsalMutexInit(&port->requestLock);
    OsalMutexInit(&port->reqSyncLock);
    OsalMutexInit(&port->reqASyncLock);
    HdfSListInit(&port->requestQueue);
    HdfSListInit(&port->reqSyncList);
    HdfSListInit(&port->reqASyncList);
    int32_t ret = UsbdDispatcher::UsbdInit(port);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:UsbInit failed ret:%{public}d", __func__, ret);
        UsbdDispatcher::UsbdRelease(port);
        UsbdDispatcher::RemoveDevFromService(port->service, port);
        OsalMemFree(port);
        return ret;
    }

    DataFifoReset(&port->readFifo);
    port->initFlag = true;
    return HDF_SUCCESS;
}

UsbInterfaceHandle *UsbImpl::InterfaceIdToHandle(const HostDevice *dev, uint8_t id)
{
    if (dev == nullptr) {
        HDF_LOGE("%{public}s: invalid param dev is nullptr", __func__);
        return nullptr;
    }

    if (id == MAX_INTERFACEID) {
        return dev->ctrDevHandle;
    } else if (id < USB_MAX_INTERFACES) {
        return dev->devHandle[id];
    }
    return nullptr;
}

int32_t UsbImpl::UsbdRequestSyncReleaseList(HostDevice *port)
{
    if (port == nullptr) {
        HDF_LOGE("%{public}s:invalid param port is nullptr", __func__);
        return HDF_ERR_INVALID_PARAM;
    }

    HdfSListIterator it;
    OsalMutexLock(&port->reqSyncLock);
    HdfSListIteratorInit(&it, &port->reqSyncList);
    while (HdfSListIteratorHasNext(&it)) {
        UsbdRequestSync *req = reinterpret_cast<UsbdRequestSync *>(HdfSListIteratorNext(&it));
        if (req == nullptr) {
            continue;
        }
        HdfSListIteratorRemove(&it);
        int32_t ret = UsbdDispatcher::UsbdRequestSyncRelease(req);
        if (ret != HDF_SUCCESS) {
            HDF_LOGE("%{public}s:UsbdRequestSyncRelease failed", __func__);
        }
    }
    OsalMutexUnlock(&port->reqSyncLock);

    return HDF_SUCCESS;
}

int32_t UsbImpl::UsbdRequestASyncReleaseList(HostDevice *port)
{
    if (port == nullptr) {
        HDF_LOGE("%{public}s:invalid param port", __func__);
        return HDF_ERR_INVALID_PARAM;
    }

    HdfSListIterator it;
    OsalMutexLock(&port->reqASyncLock);
    HdfSListIteratorInit(&it, &port->reqASyncList);
    while (HdfSListIteratorHasNext(&it)) {
        UsbdRequestASync *req = reinterpret_cast<UsbdRequestASync *>(HdfSListIteratorNext(&it));
        if (req == nullptr) {
            continue;
        }
        HdfSListIteratorRemove(&it);
        int32_t ret = UsbdDispatcher::UsbdRequestASyncRelease(req);
        if (ret != HDF_SUCCESS) {
            HDF_LOGW("%{public}s:UsbdRequestASyncRelease failed", __func__);
        }
    }
    OsalMutexUnlock(&port->reqASyncLock);

    return HDF_SUCCESS;
}

int32_t UsbImpl::UsbdBulkASyncListReleasePort(HostDevice *port)
{
    if (port == nullptr || port->bulkASyncList == nullptr) {
        HDF_LOGE("%{public}s: port or port->bulkASyncList is nullptr", __func__);
        return HDF_SUCCESS;
    }

    UsbdBulkASyncList *list = nullptr;
    while (port->bulkASyncList) {
        list = port->bulkASyncList;
        port->bulkASyncList = list->next;
        UsbdDispatcher::UsbdBulkASyncListRelease(list);
        list = nullptr;
    }
    return HDF_SUCCESS;
}

int32_t UsbImpl::UsbdFindRequestSyncAndCreat(
    HostDevice *port, uint8_t interfaceId, uint8_t pipeAddr, UsbdRequestSync **request)
{
    if (port == nullptr || request == nullptr) {
        HDF_LOGE("%{public}s:ifId:%{public}u, epId:%{public}u", __func__, interfaceId, pipeAddr);
        return HDF_ERR_INVALID_PARAM;
    }

    *request = nullptr;
    UsbdRequestSync *requestSync = UsbdDispatcher::UsbdFindRequestSync(port, interfaceId, pipeAddr);
    if (requestSync != nullptr) {
        *request = requestSync;
        return HDF_SUCCESS;
    }

    UsbPipeInfo pipe;
    if (memset_s(&pipe, sizeof(UsbPipeInfo), 0, sizeof(UsbPipeInfo)) != EOK) {
        HDF_LOGE("%{public}s:memset_s pipe failed ", __func__);
        return HDF_FAILURE;
    }

    int32_t ret = UsbdDispatcher::GetPipe(port, interfaceId, pipeAddr, &pipe);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s: get pipe failed ifId:%{public}u, epId:%{public}u", __func__, interfaceId, pipeAddr);
        return HDF_FAILURE;
    }

    UsbInterfaceHandle *ifHandle = InterfaceIdToHandle(port, interfaceId);
    if (ifHandle == nullptr) {
        HDF_LOGE("%{public}s:get interface handle failed", __func__);
        return HDF_ERR_INVALID_PARAM;
    }

    requestSync = UsbdDispatcher::UsbdRequestSyncAlloc();
    if (requestSync == nullptr) {
        HDF_LOGE("%{public}s:fail ifId:%{public}u pipeId:%{public}u", __func__, interfaceId, pipeAddr);
        return HDF_ERR_MALLOC_FAIL;
    }

    ret = UsbdDispatcher::UsbdRequestSyncInit(port, ifHandle, &pipe, requestSync);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:UsbdRequestSyncInit failed ret:%{public}d", __func__, ret);
        int32_t tRet = UsbdDispatcher::UsbdRequestSyncRelease(requestSync);
        requestSync = nullptr;
        if (tRet != HDF_SUCCESS) {
            HDF_LOGE("%{public}s:Release failed ifId:%{public}u pipeId:%{public}u", __func__, interfaceId, pipeAddr);
        }
        return ret;
    }
    *request = requestSync;
    return ret;
}

int32_t UsbImpl::UsbdBulkReadSyncBase(
    int32_t timeout, uint8_t *buffer, uint32_t size, uint32_t *actlength, UsbdRequestSync *requestSync)
{
    if (requestSync == nullptr || requestSync->request == nullptr || buffer == nullptr || actlength == nullptr ||
        size < 1) {
        HDF_LOGE("%{public}s:invalid params", __func__);
        return HDF_ERR_INVALID_PARAM;
    }

    int32_t ret = HDF_FAILURE;
    uint64_t intTimeout = timeout < 0 ? 0 : static_cast<uint64_t>(timeout);
    uint64_t stime = OsalGetSysTimeMs();
    uint32_t tcur = 0;
    OsalMutexLock(&requestSync->lock);
    requestSync->params.timeout = 500; // 500 is timeout
    uint32_t msize = requestSync->pipe.maxPacketSize;
    while (tcur + msize < size) {
        ret = UsbFillRequest(requestSync->request, requestSync->ifHandle, &requestSync->params);
        if (ret != HDF_SUCCESS) {
            HDF_LOGE("%{public}s: UsbFillRequest failed, ret=%{public}d \n", __func__, ret);
            break;
        }

        ret = UsbSubmitRequestSync(requestSync->request);
        if (ret == HDF_SUCCESS) {
            ret = memcpy_s(buffer + tcur, size - tcur, requestSync->request->compInfo.buffer,
                requestSync->request->compInfo.actualLength);
            if (ret != EOK) {
                HDF_LOGE("%{public}s: memcpy_s failed, ret = %{public}d", __func__, ret);
                break;
            }
            tcur += requestSync->request->compInfo.actualLength;
        } else if (ret == HDF_ERR_TIMEOUT) {
            if (tcur > 0) {
                ret = HDF_SUCCESS;
                break;
            }
            uint64_t ntime = OsalGetSysTimeMs();
            if (intTimeout == 0 || (ntime < stime + intTimeout)) {
                continue;
            } else {
                HDF_LOGE("%{public}s:tcur:%{public}u ret:%{public}d", __func__, tcur, ret);
                break;
            }
        } else {
            HDF_LOGE("%{public}s:tcur:%{public}u ret:%{public}d", __func__, tcur, ret);
            break;
        }
    }
    OsalMutexUnlock(&requestSync->lock);

    *actlength = tcur;
    return ret;
}

int32_t UsbImpl::UsbdBulkWriteSyncBase(
    HostDevice *port, UsbdRequestSync *requestSync, const uint8_t *buffer, uint32_t length, int32_t timeout)
{
    if (port == nullptr || requestSync == nullptr || buffer == nullptr || length < 1) {
        HDF_LOGE("%{public}s:invalid param", __func__);
        return HDF_ERR_INVALID_PARAM;
    }

    int32_t ret = HDF_FAILURE;
    OsalMutexLock(&requestSync->lock);
    uint32_t initTimeout = timeout < 0 ? 0 : static_cast<uint32_t>(timeout);
    requestSync->params.timeout = initTimeout;
    requestSync->params.userData = port;
    uint32_t tcur = 0;
    uint32_t msize = static_cast<uint32_t>(requestSync->pipe.maxPacketSize);
    while (tcur < length) {
        uint32_t tsize = (length - tcur) < msize ? (length - tcur) : msize;
        requestSync->params.dataReq.buffer = static_cast<unsigned char *>(const_cast<uint8_t *>(buffer) + tcur);
        requestSync->params.dataReq.length = tsize;
        tcur += tsize;
        ret = UsbFillRequest(requestSync->request, requestSync->ifHandle, &requestSync->params);
        if (ret != HDF_SUCCESS) {
            HDF_LOGE("%{public}s:UsbFillRequest failed, ret:%{public}d, tcur:%{public}u, length:%{public}u", __func__,
                ret, tcur, length);
            break;
        }
        ret = UsbSubmitRequestSync(requestSync->request);
        if (ret != HDF_SUCCESS) {
            HDF_LOGE("%{public}s:UsbSubmitRequestSync failed, ret:%{public}d tcur:%{public}u length:%{public}u",
                __func__, ret, tcur, length);
            break;
        }
    }
    OsalMutexUnlock(&requestSync->lock);
    return ret;
}

UsbdRequestASync *UsbImpl::UsbdFindRequestASync(HostDevice *port, uint8_t interfaceId, uint8_t pipeAddr)
{
    if (port == nullptr) {
        HDF_LOGE("%{public}s:invalid param port", __func__);
        return nullptr;
    }

    UsbdRequestASync *req = nullptr;
    HdfSListIterator it;
    uint8_t reqnum = 0;
    uint8_t usenum = 0;
    bool flag = false;
    OsalMutexLock(&port->reqASyncLock);
    HdfSListIteratorInit(&it, &port->reqASyncList);
    while (HdfSListIteratorHasNext(&it)) {
        req = reinterpret_cast<UsbdRequestASync *>(HdfSListIteratorNext(&it));
        if (req == nullptr) {
            continue;
        }
        if (req->pipe.interfaceId == interfaceId && ((req->pipe.pipeAddress | req->pipe.pipeDirection) == pipeAddr)) {
            reqnum++;
            if (req->status) {
                usenum++;
            } else {
                flag = true;
                break;
            }
        }
    }
    OsalMutexUnlock(&port->reqASyncLock);

    if (flag) {
        if (req) {
            OsalMutexLock(&req->lock);
            req->status = 1;
            OsalMutexUnlock(&req->lock);
        }
        return req;
    } else {
        if (reqnum < MAX_REQUESTASYNC_NUM) {
            req = UsbdDispatcher::UsbdRequestASyncCreatAndInsert(port, interfaceId, pipeAddr);
            if (req) {
                OsalMutexLock(&req->lock);
                req->status = 1;
                OsalMutexUnlock(&req->lock);
            }
            return req;
        }
    }
    return nullptr;
}

int32_t UsbImpl::FunRequestQueueFillAndSubmit(
    HostDevice *port, UsbdRequestASync *reqAsync, const uint8_t *buffer, uint32_t length)
{
    if (port == nullptr || reqAsync == nullptr) {
        HDF_LOGE("%{public}s:invalid param port or reqAsync", __func__);
        return HDF_ERR_INVALID_PARAM;
    }

    UsbdDispatcher::FillReqAyncParams(reqAsync, &reqAsync->pipe, &reqAsync->params, buffer, length);
    int32_t ret = UsbFillRequest(reqAsync->reqMsg.request, reqAsync->ifHandle, &reqAsync->params);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:UsbFillRequest failed, ret:%{public}d", __func__, ret);
        OsalMutexLock(&reqAsync->lock);
        reqAsync->reqMsg.clientData = nullptr;
        reqAsync->reqMsg.clientLength = 0;
        reqAsync->params.dataReq.buffer = nullptr;
        reqAsync->params.dataReq.length = 0;
        reqAsync->status = 0;
        OsalMutexUnlock(&reqAsync->lock);
        return ret;
    }

    UsbIfRequest *requestConvertVal = reinterpret_cast<UsbIfRequest *>(reqAsync->reqMsg.request);
    OsalSemInit(&requestConvertVal->hostRequest->sem, 0);
    ret = UsbSubmitRequestAsync(reqAsync->reqMsg.request);
    if (ret == HDF_SUCCESS) {
        OsalMutexLock(&port->requestLock);
        HdfSListAddTail(&port->requestQueue, &reqAsync->qNode);
        OsalMutexUnlock(&port->requestLock);
    } else {
        HDF_LOGE("%{public}s:UsbSubmitRequestAsync failed, ret:%{public}d", __func__, ret);
        OsalMutexLock(&reqAsync->lock);
        reqAsync->status = 0;
        reqAsync->reqMsg.clientData = nullptr;
        reqAsync->reqMsg.clientLength = 0;
        reqAsync->params.dataReq.buffer = nullptr;
        reqAsync->params.dataReq.length = 0;
        OsalMutexUnlock(&reqAsync->lock);
    }
    return ret;
}

int32_t UsbImpl::GetRequestMsgFromQueue(HostDevice *port, UsbdRequestASync **reqMsg)
{
    if (port == nullptr || reqMsg == nullptr) {
        HDF_LOGE("%{public}s: port or reqMsg is nullptr", __func__);
        return HDF_ERR_INVALID_PARAM;
    }

    HdfSListNode *requestNode = nullptr;
    OsalMutexLock(&port->requestLock);
    if (!HdfSListIsEmpty(&port->requestQueue)) {
        requestNode = HdfSListPop(&port->requestQueue);
    }
    OsalMutexUnlock(&port->requestLock);
    if (requestNode == nullptr) {
        HDF_LOGE("%{public}s:requestNode is nullptr", __func__);
        return HDF_FAILURE;
    }
    *reqMsg = HDF_SLIST_CONTAINER_OF(HdfSListNode, requestNode, UsbdRequestASync, qNode);
    if (*reqMsg == nullptr) {
        HDF_LOGE("%{public}s:request msg is nullptr", __func__);
        return HDF_FAILURE;
    }
    return HDF_SUCCESS;
}

int32_t UsbImpl::GetRequestMsgData(
    HostDevice *port, UsbdRequestASync *reqMsg, int32_t timeout, uint8_t **buffer, uint32_t *length)
{
    if (port == nullptr || reqMsg == nullptr || reqMsg->reqMsg.request == nullptr) {
        HDF_LOGE("%{public}s: invalid param", __func__);
        return HDF_ERR_INVALID_PARAM;
    }

    int32_t ret = HDF_SUCCESS;
    UsbIfRequest *reqValue = reinterpret_cast<UsbIfRequest *>(reqMsg->reqMsg.request);
    if (static_cast<int32_t>(reqMsg->reqMsg.request->compInfo.status) == -1) {
        ret = OsalSemWait(&reqValue->hostRequest->sem, timeout);
        if (ret != HDF_SUCCESS) {
            HDF_LOGE("%{public}s:OsalSemWait failed, ret:%{public}d", __func__, ret);
            OsalMutexLock(&port->requestLock);
            HdfSListAdd(&port->requestQueue, &reqMsg->qNode);
            OsalMutexUnlock(&port->requestLock);
            return ret;
        }
    }

    OsalMutexLock(&reqMsg->lock);
    *length = reqMsg->reqMsg.length;
    *buffer = static_cast<uint8_t *>(reqMsg->reqMsg.buffer);
    reqMsg->reqMsg.buffer = nullptr;
    reqMsg->reqMsg.length = 0;
    reqMsg->status = 0;
    OsalMutexUnlock(&reqMsg->lock);
    return ret;
}

int32_t UsbImpl::UsbdRequestASyncReleaseData(UsbdRequestASync *request)
{
    if (request == nullptr) {
        HDF_LOGE("%{public}s: invalid param request is nullptr", __func__);
        return HDF_ERR_INVALID_PARAM;
    }

    if (request->reqMsg.buffer != nullptr) {
        HDF_LOGI("%{public}s:free buffer\n", __func__);
        OsalMemFree(request->reqMsg.buffer);
        request->reqMsg.buffer = nullptr;
    }
    request->reqMsg.length = 0;
    if (request->reqMsg.clientData) {
        HDF_LOGI("%{public}s:free clientData\n", __func__);
        OsalMemFree(request->reqMsg.clientData);
        request->reqMsg.clientData = nullptr;
    }
    request->reqMsg.clientLength = 0;
    request->status = 0;
    return HDF_SUCCESS;
}

UsbdBulkASyncList *UsbImpl::UsbdBulkASyncListFind(HostDevice *port, uint8_t ifId, uint8_t epId)
{
    if (port == nullptr) {
        HDF_LOGE("%{public}s:invalid param port", __func__);
        return nullptr;
    }

    UsbdBulkASyncList *list = port->bulkASyncList;
    while (list) {
        if (list->epId == epId && list->ifId == ifId) {
            return list;
        }
        list = list->next;
    }
    return nullptr;
}

UsbdBulkASyncList *UsbImpl::UsbdBulkASyncListInit(HostDevice *port, uint8_t ifId, uint8_t epId)
{
    UsbdBulkASyncList *list = UsbdBulkASyncListFind(port, ifId, epId);
    if (list == nullptr) {
        list = UsbdDispatcher::UsbdBulkASyncListAlloc(port, ifId, epId);
        if (list != nullptr) {
            list->next = port->bulkASyncList;
            port->bulkASyncList = list;
        }
    }
    return list;
}

int32_t UsbImpl::InitAsmBufferHandle(UsbdBufferHandle *handle, int32_t fd, int32_t size)
{
    if (handle == nullptr) {
        HDF_LOGE("%{public}s:invalid param handle", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    ReleaseAsmBufferHandle(handle);

    if (fd < 0 || size < 0) {
        HDF_LOGE("%{public}s:invalid param fd or size", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    handle->fd = fd;
    handle->size = static_cast<uint32_t>(size);
    handle->cur = 0;
    handle->rcur = 0;
    handle->cbflg = 0;
    lseek(fd, 0, SEEK_SET);
    handle->starAddr = static_cast<uint8_t *>(mmap(nullptr, size, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0));
    close(fd);
    if (handle->starAddr == nullptr) {
        handle->fd = -1;
        handle->size = 0;
        HDF_LOGE("%{public}s:mmap error:%{public}s", __func__, strerror(errno));
        return HDF_ERR_MALLOC_FAIL;
    }
    return HDF_SUCCESS;
}

int32_t UsbImpl::UsbdBulkReadASyncSubmitStart(UsbdBulkASyncList *list)
{
    if (list == nullptr) {
        HDF_LOGE("%{public}s:invalid param list", __func__);
        return HDF_ERR_INVALID_PARAM;
    }

    uint32_t i = 0;
    int32_t ret = HDF_SUCCESS;
    do {
        UsbdBulkASyncReqNode *req = UsbdDispatcher::UsbdBulkASyncReqGetENode(&list->rList);
        if (req == nullptr) {
            HDF_LOGE("%{public}s:UsbdBulkASyncReqGetENode failed", __func__);
            ret = HDF_ERR_DEVICE_BUSY;
            break;
        } else {
            ret = UsbdDispatcher::UsbdBulkASyncReqReadSubmit(req);
            if (ret != HDF_SUCCESS) {
                HDF_LOGE("%{public}s:UsbdBulkASyncReqReadSubmit failed", __func__);
                break;
            }
        }
        if (++i > USBD_BULKASYNCREQ_NUM_MAX) {
            break;
        }
    } while (!DListIsEmpty(&list->rList.eList));
    return ret;
}

int32_t UsbImpl::UsbdBulkASyncWriteSubmitStart(UsbdBulkASyncList *list)
{
    if (list == nullptr) {
        HDF_LOGE("%{public}s:invalid param list", __func__);
        return HDF_ERR_INVALID_PARAM;
    }

    uint32_t i = 0;
    int32_t ret = HDF_SUCCESS;
    do {
        UsbdBulkASyncReqNode *req = UsbdDispatcher::UsbdBulkASyncReqGetENode(&list->rList);
        if (req == nullptr) {
            HDF_LOGE("%{public}s:UsbdBulkASyncReqGetENode failed", __func__);
            ret = HDF_ERR_DEVICE_BUSY;
            break;
        } else {
            ret = UsbdDispatcher::UsbdBulkASyncReqWriteSubmit(req);
            if (ret != HDF_SUCCESS) {
                HDF_LOGE("%{public}s:UsbdBulkASyncReqWriteSubmit failed", __func__);
                break;
            }
        }
        if (++i > USBD_BULKASYNCREQ_NUM_MAX) {
            break;
        }
    } while (!DListIsEmpty(&list->rList.eList));
    return ret;
}

void UsbImpl::ReleaseAsmBufferHandle(UsbdBufferHandle *handle)
{
    if (handle == nullptr) {
        HDF_LOGE("%{public}s:invalid param handle", __func__);
        return;
    }

    if (handle->size > 0) {
        OsalMutexLock(&handle->lock);
        handle->cur = 0;
        handle->rcur = 0;
        handle->fd = -1;
        handle->cbflg = 0;
        munmap(handle->starAddr, handle->size);
        OsalMutexUnlock(&handle->lock);
    }

    handle->fd = -1;
    handle->cur = 0;
    handle->rcur = 0;
    handle->size = 0;
    handle->cbflg = 0;
    handle->starAddr = nullptr;
}

int32_t UsbImpl::BulkRequestCancel(UsbdBulkASyncList *list)
{
    if (list == nullptr) {
        HDF_LOGE("%{public}s:invalid param list", __func__);
        return HDF_ERR_INVALID_PARAM;
    }

    for (int32_t i = 0; i < USBD_BULKASYNCREQ_NUM_MAX; ++i) {
        if (list->rList.node[i].use == USBD_REQNODE_USE || list->rList.node[i].use == USBD_REQNODE_OTHER) {
            int32_t ret = UsbCancelRequest(list->rList.node[i].request);
            if (ret != HDF_SUCCESS) {
                HDF_LOGE("%{public}s: UsbCancelRequest failed, ret=%{public}d ", __func__, ret);
                return ret;
            }
        }
    }
    OsalMSleep(USB_BULK_CANCEL_SLEEP_TIME);

    for (int32_t i = 0; i < USBD_BULKASYNCREQ_NUM_MAX; ++i) {
        list->rList.node[i].request->compInfo.status = UsbRequestStatus::USB_REQUEST_COMPLETED;
        if (list->rList.node[i].use == USBD_REQNODE_USE || list->rList.node[i].use == USBD_REQNODE_OTHER) {
            list->rList.node[i].request->compInfo.status = UsbRequestStatus::USB_REQUEST_COMPLETED;
            UsbdDispatcher::UsbdBulkASyncReqNodeSetNoUse(&list->rList.node[i]);
        }
    }
    return HDF_SUCCESS;
}

int32_t UsbImpl::UsbdPnpNotifyAddAndRemoveDevice(HdfSBuf *data, UsbdSubscriber *usbdSubscriber, uint32_t id)
{
    if (data == nullptr) {
        HDF_LOGE("%{public}s: data is nullptr", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    sptr<UsbImpl> super = static_cast<UsbImpl *>(usbdSubscriber->impl);
    if (super == nullptr) {
        HDF_LOGE("%{public}s super is nullptr", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    const sptr<IUsbdSubscriber> subscriber = usbdSubscriber->subscriber;

    uint32_t infoSize;
    UsbPnpNotifyMatchInfoTable *infoTable = nullptr;
    bool flag = HdfSbufReadBuffer(data, (const void **)(&infoTable), &infoSize);
    if (!flag || infoTable == nullptr) {
        HDF_LOGE(
            "%{public}s: HdfSbufReadBuffer failed, flag=%{public}d", __func__, flag);
        return HDF_ERR_INVALID_PARAM;
    }

    if (infoTable->deviceInfo.deviceClass == BASE_CLASS_HUB) {
        HDF_LOGI("%{public}s:hub device", __func__);
        if (id == USB_PNP_NOTIFY_REMOVE_DEVICE) {
            HDF_LOGI("%{public}s:UsbdRemoveBusDev busNum:%{public}d", __func__, infoTable->busNum);
            UsbdDispatcher::UsbdRemoveBusDev(super, infoTable->busNum, subscriber);
        }
        return HDF_SUCCESS;
    }

    int32_t ret = HDF_SUCCESS;
    if (id == USB_PNP_NOTIFY_ADD_DEVICE) {
        UsbdDispatcher::UsbdDeviceCreateAndAttach(super, infoTable->busNum, infoTable->devNum);
        USBDeviceInfo info = {ACT_DEVUP, infoTable->busNum, infoTable->devNum};
        if (subscriber == nullptr) {
            HDF_LOGE("%{public}s: subscriber is nullptr, %{public}d", __func__, __LINE__);
            return HDF_FAILURE;
        }
        ret = subscriber->DeviceEvent(info);
    } else if (id == USB_PNP_NOTIFY_REMOVE_DEVICE) {
        UsbdDispatcher::UsbdDeviceDettach(super, infoTable->busNum, infoTable->devNum);
        USBDeviceInfo info = {ACT_DEVDOWN, infoTable->busNum, infoTable->devNum};
        if (subscriber == nullptr) {
            HDF_LOGE("%{public}s: subscriber is nullptr, %{public}d", __func__, __LINE__);
            return HDF_FAILURE;
        }
        ret = subscriber->DeviceEvent(info);
    }
    return ret;
}

int32_t UsbImpl::UsbdPnpLoaderEventReceived(void *priv, uint32_t id, HdfSBuf *data)
{
    UsbdSubscriber *usbdSubscriber = static_cast<UsbdSubscriber *>(priv);
    const sptr<IUsbdSubscriber> subscriber = usbdSubscriber->subscriber;

    int32_t ret = HDF_SUCCESS;
    if (id == USB_PNP_DRIVER_GADGET_ADD) {
        isGadgetConnected_ = true;
        USBDeviceInfo info = {ACT_UPDEVICE, 0, 0};
        if (subscriber == nullptr) {
            HDF_LOGE("%{public}s: subscriber is nullptr, %{public}d", __func__, __LINE__);
            return HDF_FAILURE;
        }
        ret = subscriber->DeviceEvent(info);
        return ret;
    } else if (id == USB_PNP_DRIVER_GADGET_REMOVE) {
        isGadgetConnected_ = false;
        USBDeviceInfo info = {ACT_DOWNDEVICE, 0, 0};
        if (subscriber == nullptr) {
            HDF_LOGE("%{public}s: subscriber is nullptr, %{public}d", __func__, __LINE__);
            return HDF_FAILURE;
        }
        ret = subscriber->DeviceEvent(info);
        return ret;
    } else if (id == USB_PNP_DRIVER_PORT_HOST) {
        return UsbdPort::GetInstance().UpdatePort(PORT_MODE_HOST, subscriber);
    } else if (id == USB_PNP_DRIVER_PORT_DEVICE) {
        return UsbdPort::GetInstance().UpdatePort(PORT_MODE_DEVICE, subscriber);
    }

    ret = UsbdPnpNotifyAddAndRemoveDevice(data, usbdSubscriber, id);
    return ret;
}

int32_t UsbImpl::UsbdLoadServiceCallback(void *priv, uint32_t id, HdfSBuf *data)
{
    (void)priv;
    (void)data;
    if (id == USB_PNP_DRIVER_GADGET_ADD || id == USB_PNP_NOTIFY_ADD_DEVICE) {
        if (UsbdLoadUsbService::LoadUsbService() != 0) {
            HDF_LOGE("usbdev LoadUsbServer error");
            return HDF_FAILURE;
        }
    } else if (id == USB_PNP_DRIVER_GADGET_REMOVE || id == USB_PNP_NOTIFY_REMOVE_DEVICE) {
        if (UsbdLoadUsbService::RemoveUsbService() != 0) {
            HDF_LOGE("usbdev RemoveUsbServer error");
            return HDF_FAILURE;
        }
    }
    return HDF_SUCCESS;
}

int32_t UsbImpl::UsbdEventHandle(const sptr<UsbImpl> &inst)
{
    (void)UsbdLoadUsbService::CloseUsbService();

    listenerForLoadService_.callBack = UsbdLoadServiceCallback;
    if (DdkListenerMgrAdd(&listenerForLoadService_) != HDF_SUCCESS) {
        HDF_LOGE("%{public}s: register listerer failed", __func__);
        return HDF_FAILURE;
    }
    return HDF_SUCCESS;
}

int32_t UsbImpl::UsbdEventHandleRelease(void)
{
    int32_t ret = DdkListenerMgrRemove(&listenerForLoadService_);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s: DdkListenerMgrRemove failed", __func__);
    }
    listenerForLoadService_.callBack = nullptr;
    listenerForLoadService_.priv = nullptr;
    return ret;
}

int32_t UsbImpl::UsbdReleaseDevices()
{
    OsalMutexLock(&lock_);
    while (!HdfSListIsEmpty(&devList_)) {
        HostDevice *port = reinterpret_cast<HostDevice *>(HdfSListPop(&devList_));
        if (port != nullptr) {
            UsbdDispatcher::UsbdRelease(port);
            OsalMemFree(port);
        }
    }
    OsalMutexUnlock(&lock_);
    return HDF_SUCCESS;
}

int32_t UsbImpl::OpenDevice(const UsbDev &dev)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }
    port->initFlag = true;
    return HDF_SUCCESS;
}

int32_t UsbImpl::CloseDevice(const UsbDev &dev)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }
    port->initFlag = false;
    return HDF_SUCCESS;
}

int32_t UsbImpl::GetDeviceDescriptor(const UsbDev &dev, std::vector<uint8_t> &descriptor)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    uint16_t length = MAX_CONTROL_BUFF_SIZE;
    uint8_t buffer[USB_MAX_DESCRIPTOR_SIZE] = {0};
    UsbControlParams controlParams = {0};
    MakeUsbControlParams(&controlParams, buffer, length, static_cast<int32_t>(USB_DDK_DT_DEVICE) << TYPE_OFFSET_8, 0);
    int32_t ret = UsbControlTransferEx(port, &controlParams, USB_CTRL_SET_TIMEOUT);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:UsbControlTransferEx failed, ret:%{public}d", __func__, ret);
        return ret;
    }

    descriptor.assign(buffer, buffer + USB_MAX_DESCRIPTOR_SIZE);
    return HDF_SUCCESS;
}

int32_t UsbImpl::GetStringDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &descriptor)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    uint16_t length = MAX_CONTROL_BUFF_SIZE;
    uint8_t buffer[USB_MAX_DESCRIPTOR_SIZE] = {0};
    UsbControlParams controlParams = {0};
    MakeUsbControlParams(
        &controlParams, buffer, length, (static_cast<int32_t>(USB_DDK_DT_STRING) << TYPE_OFFSET_8) + descId, 0);
    int32_t ret = UsbControlTransferEx(port, &controlParams, GET_STRING_SET_TIMEOUT);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:UsbControlTransferEx failed ret=%{public}d", __func__, ret);
        return ret;
    }

    descriptor.assign(buffer, buffer + USB_MAX_DESCRIPTOR_SIZE);
    return HDF_SUCCESS;
}

int32_t UsbImpl::GetConfigDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &descriptor)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    uint16_t length = MAX_CONTROL_BUFF_SIZE;
    uint8_t buffer[USB_MAX_DESCRIPTOR_SIZE] = {0};
    UsbControlParams controlParams = {0};
    MakeUsbControlParams(
        &controlParams, buffer, length, (static_cast<int32_t>(USB_DDK_DT_CONFIG) << TYPE_OFFSET_8) + descId, 0);
    int32_t ret = UsbControlTransferEx(port, &controlParams, USB_CTRL_SET_TIMEOUT);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:UsbControlTransferEx failed ret=%{public}d", __func__, ret);
        return ret;
    }

    descriptor.assign(buffer, buffer + USB_MAX_DESCRIPTOR_SIZE);
    return HDF_SUCCESS;
}

int32_t UsbImpl::GetRawDescriptor(const UsbDev &dev, std::vector<uint8_t> &descriptor)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr || port->ctrDevHandle == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    UsbInterfaceHandleEntity *handle = reinterpret_cast<UsbInterfaceHandleEntity *>(port->ctrDevHandle);
    OsalMutexLock(&handle->devHandle->lock);
    uint8_t *ptr = static_cast<uint8_t *>(handle->devHandle->dev->descriptors);
    uint32_t length = handle->devHandle->dev->descriptorsLength;
    descriptor.assign(ptr, ptr + length);
    OsalMutexUnlock(&handle->devHandle->lock);
    return HDF_SUCCESS;
}

int32_t UsbImpl::GetFileDescriptor(const UsbDev &dev, int32_t &fd)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr || port->ctrDevHandle == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    UsbInterfaceHandleEntity *handle = reinterpret_cast<UsbInterfaceHandleEntity *>(port->ctrDevHandle);
    OsalMutexLock(&handle->devHandle->lock);
    fd = handle->devHandle->fd;
    OsalMutexUnlock(&handle->devHandle->lock);
    return HDF_SUCCESS;
}

int32_t UsbImpl::SetConfig(const UsbDev &dev, uint8_t configIndex)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    uint8_t configIdOld = 0;
    uint8_t configIdNew = 0;
    uint16_t length = 1;
    UsbControlParams controlParams;
    MakeGetActiveUsbControlParams(&controlParams, &configIdOld, length, 0, 0);
    int32_t ret = UsbControlTransferEx(port, &controlParams, USB_CTRL_SET_TIMEOUT);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:setConfiguration failed ret:%{public}d", __func__, ret);
        return HDF_ERR_INVALID_PARAM;
    }
    if (configIndex == configIdOld) {
        HDF_LOGE("%{public}s:setConfiguration success, configIndex:%{public}d configIdOld:%{public}d", __func__,
            configIndex, configIdOld);
        return HDF_SUCCESS;
    }

    length = 0;
    MakeSetActiveUsbControlParams(&controlParams, &configIndex, length, static_cast<int32_t>(configIndex), 0);
    ret = UsbControlTransferEx(port, &controlParams, USB_CTRL_SET_TIMEOUT);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:setConfiguration failed ret:%{public}d", __func__, ret);
        return HDF_ERR_IO;
    }

    length = 1;
    MakeGetActiveUsbControlParams(&controlParams, &configIdNew, length, 0, 0);
    ret = UsbControlTransferEx(port, &controlParams, USB_CTRL_SET_TIMEOUT);
    if (ret != HDF_SUCCESS || configIndex != configIdNew) {
        HDF_LOGE("%{public}s:getConfiguration failed ret:%{public}d", __func__, ret);
        return HDF_ERR_IO;
    }
    if (configIndex != 0) {
        ret = ReOpenDevice(port);
        if (ret != HDF_SUCCESS) {
            HDF_LOGE("%{public}s:ReOpenDevice failed ret:%{public}d", __func__, ret);
            return ret;
        }
    }
    return ret;
}

int32_t UsbImpl::GetConfig(const UsbDev &dev, uint8_t &configIndex)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    uint16_t length = 1;
    UsbControlParams controlParams;
    MakeGetActiveUsbControlParams(&controlParams, &configIndex, length, 0, 0);
    int32_t ret = UsbControlTransferEx(port, &controlParams, USB_CTRL_SET_TIMEOUT);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:UsbControlTransferEx failed", __func__);
        return HDF_ERR_IO;
    }
    return HDF_SUCCESS;
}

int32_t UsbImpl::ClaimInterface(const UsbDev &dev, uint8_t interfaceid, uint8_t force)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }
    if (interfaceid >= USB_MAX_INTERFACES) {
        HDF_LOGE("%{public}s:interfaceid larger then max num", __func__);
        return HDF_ERR_INVALID_PARAM;
    }

    if (port->iface[interfaceid] == nullptr) {
        if (force) {
            port->iface[interfaceid] =
                UsbClaimInterface(port->service->session_, port->busNum, port->devAddr, interfaceid);
        } else {
            port->iface[interfaceid] =
                UsbClaimInterfaceUnforce(port->service->session_, port->busNum, port->devAddr, interfaceid);
        }
        if (port->iface[interfaceid] == nullptr) {
            HDF_LOGE("%{public}s:UsbClaimInterface failed, busNum=%{public}u, devAddr=%{public}u", __func__,
                port->busNum, port->devAddr);
            return HDF_FAILURE;
        }
    }
    if (port->devHandle[interfaceid] == nullptr) {
        port->devHandle[interfaceid] = UsbOpenInterface(port->iface[interfaceid]);
        if (port->devHandle[interfaceid] == nullptr) {
            HDF_LOGE("%{public}s:UsbOpenInterface failed.", __func__);
            return HDF_FAILURE;
        }
    }
    return HDF_SUCCESS;
}

int32_t UsbImpl::ReleaseInterface(const UsbDev &dev, uint8_t interfaceid)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    if (interfaceid >= USB_MAX_INTERFACES) {
        HDF_LOGE("%{public}s:ReleaseInterface failed.", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    return HDF_SUCCESS;
}

int32_t UsbImpl::SetInterface(const UsbDev &dev, uint8_t interfaceid, uint8_t altIndex)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    UsbInterfaceHandle *interfaceHandle = InterfaceIdToHandle(port, interfaceid);
    if (interfaceHandle == nullptr) {
        HDF_LOGE("%{public}s:interfaceid failed busNum:%{public}u devAddr:%{public}u interfaceid:%{public}u", __func__,
            port->busNum, port->devAddr, interfaceid);
        return HDF_FAILURE;
    }
    if (port->iface[interfaceid] && port->iface[interfaceid]->info.curAltSetting == altIndex) {
        HDF_LOGE("%{public}s:bus:%{public}d devAddr:%{public}d interfaceid:%{public}d cur:%{public}d", __func__,
            port->busNum, port->devAddr, interfaceid, altIndex);
        return HDF_SUCCESS;
    }

    int32_t ret = UsbSelectInterfaceSetting(interfaceHandle, altIndex, &port->iface[interfaceid]);
    if (ret == HDF_SUCCESS) {
        UsbdRequestSyncReleaseList(port);
        UsbdRequestASyncReleaseList(port);
        UsbdBulkASyncListReleasePort(port);
    }
    return ret;
}

int32_t UsbImpl::BulkTransferRead(const UsbDev &dev, const UsbPipe &pipe, int32_t timeout, std::vector<uint8_t> &data)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    uint8_t tbuf[READ_BUF_SIZE] = {0};
    uint32_t tsize = READ_BUF_SIZE;
    uint32_t actlength = 0;
    UsbdRequestSync *requestSync = nullptr;
    int32_t ret = UsbdFindRequestSyncAndCreat(port, pipe.intfId, pipe.endpointId, &requestSync);
    if (ret != HDF_SUCCESS || requestSync == nullptr) {
        HDF_LOGE("%{public}s:UsbdFindRequestSyncAndCreat failed.", __func__);
        return ret;
    }
    if (requestSync->pipe.pipeDirection != USB_PIPE_DIRECTION_IN || requestSync->pipe.pipeType != USB_PIPE_TYPE_BULK) {
        HDF_LOGE("%{public}s:invalid param", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    ret = UsbdBulkReadSyncBase(timeout, tbuf, tsize, &actlength, requestSync);
    if (ret != HDF_SUCCESS) {
        HDF_LOGW("%{public}s:UsbdBulkReadSyncBase ret:%{public}d, actlength:%{public}u", __func__, ret, actlength);
    }

    if (actlength > 0) {
        data.assign(tbuf, tbuf + actlength);
        ret = HDF_SUCCESS;
    }
    return ret;
}

int32_t UsbImpl::BulkTransferWrite(
    const UsbDev &dev, const UsbPipe &pipe, int32_t timeout, const std::vector<uint8_t> &data)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    UsbdRequestSync *requestSync = nullptr;
    int32_t ret = UsbdFindRequestSyncAndCreat(port, pipe.intfId, pipe.endpointId, &requestSync);
    if (ret != HDF_SUCCESS || requestSync == nullptr) {
        HDF_LOGE("%{public}s:read timeout error", __func__);
        return ret;
    }
    if (requestSync->pipe.pipeDirection != USB_PIPE_DIRECTION_OUT || requestSync->pipe.pipeType != USB_PIPE_TYPE_BULK) {
        HDF_LOGE("%{public}s:invalid param", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    ret = UsbdBulkWriteSyncBase(port, requestSync, data.data(), data.size(), timeout);
    return ret;
}

int32_t UsbImpl::ControlTransferRead(const UsbDev &dev, const UsbCtrlTransfer &ctrl, std::vector<uint8_t> &data)
{
    if ((static_cast<uint32_t>(ctrl.requestType) & USB_ENDPOINT_DIR_MASK) == USB_ENDPOINT_DIR_OUT) {
        HDF_LOGE("%{public}s: this function is read, not write", __func__);
        return HDF_FAILURE;
    }

    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr || port->ctrDevHandle == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    UsbControlParams controlParams;
    if (memset_s(&controlParams, sizeof(controlParams), 0, sizeof(controlParams)) != EOK) {
        HDF_LOGE("%{public}s:memset_s failed ", __func__);
        return HDF_FAILURE;
    }
    controlParams.request = static_cast<uint8_t>(ctrl.requestCmd);
    controlParams.value = ctrl.value;
    controlParams.index = ctrl.index;
    controlParams.target = (UsbRequestTargetType)(static_cast<uint32_t>(ctrl.requestType) & USB_RECIP_MASK);
    controlParams.directon = (UsbRequestDirection)((static_cast<uint32_t>(ctrl.requestType) >> DIRECTION_OFFSET_7) &
        ENDPOINT_DIRECTION_MASK);
    controlParams.reqType =
        (UsbControlRequestType)((static_cast<uint32_t>(ctrl.requestType) >> CMD_OFFSET_5) & CMD_TYPE_MASK);
    controlParams.size = MAX_CONTROL_BUFF_SIZE;
    controlParams.data = static_cast<void *>(OsalMemCalloc(controlParams.size));
    if (controlParams.data == nullptr) {
        HDF_LOGE("%{public}s:OsalMemCalloc failed", __func__);
        return HDF_ERR_MALLOC_FAIL;
    }
    int32_t ret = UsbControlTransferEx(port, &controlParams, ctrl.timeout);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:%{public}d UsbControlTransfer failed ret:%{public}d\n", __func__, __LINE__, ret);
    }

    uint8_t *dataValue = static_cast<uint8_t *>(controlParams.data);
    data.assign(dataValue, dataValue + controlParams.size);
    OsalMemFree(controlParams.data);
    return ret;
}

int32_t UsbImpl::ControlTransferWrite(const UsbDev &dev, const UsbCtrlTransfer &ctrl, const std::vector<uint8_t> &data)
{
    if ((static_cast<uint32_t>(ctrl.requestType) & USB_ENDPOINT_DIR_MASK) != USB_ENDPOINT_DIR_OUT) {
        HDF_LOGE("%{public}s: this function is write, not read", __func__);
        return HDF_FAILURE;
    }

    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr || port->ctrDevHandle == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    UsbControlParams controlParams;
    if (memset_s(&controlParams, sizeof(controlParams), 0, sizeof(controlParams)) != EOK) {
        HDF_LOGE("%{public}s:memset_s failed ", __func__);
        return HDF_FAILURE;
    }
    controlParams.request = static_cast<uint8_t>(ctrl.requestCmd);
    controlParams.value = ctrl.value;
    controlParams.index = ctrl.index;
    controlParams.target = (UsbRequestTargetType)(static_cast<uint32_t>(ctrl.requestType) & USB_RECIP_MASK);
    controlParams.directon = (UsbRequestDirection)((static_cast<uint32_t>(ctrl.requestType) >> DIRECTION_OFFSET_7) &
        ENDPOINT_DIRECTION_MASK);
    controlParams.reqType =
        (UsbControlRequestType)((static_cast<uint32_t>(ctrl.requestType) >> CMD_OFFSET_5) & CMD_TYPE_MASK);
    controlParams.data = static_cast<void *>(const_cast<uint8_t *>(data.data()));
    int32_t ret = UsbControlTransferEx(port, &controlParams, ctrl.timeout);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:%{public}d UsbControlTransfer failed ret:%{public}d\n", __func__, __LINE__, ret);
    }
    return ret;
}

int32_t UsbImpl::InterruptTransferRead(
    const UsbDev &dev, const UsbPipe &pipe, int32_t timeout, std::vector<uint8_t> &data)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    uint8_t tbuf[READ_BUF_SIZE] = {0};
    uint32_t tsize = READ_BUF_SIZE;
    uint32_t actlength = 0;
    UsbdRequestSync *requestSync = nullptr;
    int32_t ret = UsbdFindRequestSyncAndCreat(port, pipe.intfId, pipe.endpointId, &requestSync);
    if (ret != HDF_SUCCESS || requestSync == nullptr) {
        HDF_LOGE("%{public}s:read timeout error", __func__);
        return ret;
    }
    if (requestSync->pipe.pipeDirection != USB_PIPE_DIRECTION_IN || requestSync->pipe.pipeType != USB_PIPE_TYPE_BULK) {
        HDF_LOGE("%{public}s:invalid param", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    ret = UsbdBulkReadSyncBase(timeout, tbuf, tsize, &actlength, requestSync);
    if (ret != HDF_SUCCESS) {
        HDF_LOGW("%{public}s:UsbdBulkReadSyncBase ret:%{public}d, actlength:%{public}u", __func__, ret, actlength);
    }

    if (actlength > 0) {
        data.assign(tbuf, tbuf + actlength);
        ret = HDF_SUCCESS;
    }
    return ret;
}

int32_t UsbImpl::InterruptTransferWrite(
    const UsbDev &dev, const UsbPipe &pipe, int32_t timeout, const std::vector<uint8_t> &data)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    UsbdRequestSync *requestSync = nullptr;
    int32_t ret = UsbdFindRequestSyncAndCreat(port, pipe.intfId, pipe.endpointId, &requestSync);
    if (ret != HDF_SUCCESS || requestSync == nullptr) {
        HDF_LOGE("%{public}s:read timeout error", __func__);
        return ret;
    }
    if (requestSync->pipe.pipeDirection != USB_PIPE_DIRECTION_OUT || requestSync->pipe.pipeType != USB_PIPE_TYPE_BULK) {
        HDF_LOGE("%{public}s:invalid param", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    ret = UsbdBulkWriteSyncBase(port, requestSync, data.data(), data.size(), timeout);
    return ret;
}

int32_t UsbImpl::IsoTransferRead(const UsbDev &dev, const UsbPipe &pipe, int32_t timeout, std::vector<uint8_t> &data)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    uint8_t tbuf[READ_BUF_SIZE] = {0};
    uint32_t tsize = READ_BUF_SIZE;
    uint32_t actlength = 0;
    UsbdRequestSync *requestSync = nullptr;
    int32_t ret = UsbdFindRequestSyncAndCreat(port, pipe.intfId, pipe.endpointId, &requestSync);
    if (ret != HDF_SUCCESS || requestSync == nullptr) {
        HDF_LOGE("%{public}s:UsbdFindRequestSyncAndCreat failed of requestSync is nullptr", __func__);
        return ret;
    }

    if (requestSync->pipe.pipeDirection != USB_PIPE_DIRECTION_IN || requestSync->pipe.pipeType != USB_PIPE_TYPE_BULK) {
        HDF_LOGE("%{public}s:invalid param", __func__);
        return HDF_ERR_INVALID_PARAM;
    }

    ret = UsbdBulkReadSyncBase(timeout, tbuf, tsize, &actlength, requestSync);
    if (ret != HDF_SUCCESS) {
        HDF_LOGW("%{public}s:UsbdBulkReadSyncBase failed, ret:%{public}d, len:%{public}u", __func__, ret, actlength);
    }

    if (actlength > 0) {
        data.assign(tbuf, tbuf + actlength);
        ret = HDF_SUCCESS;
    }
    return ret;
}

int32_t UsbImpl::IsoTransferWrite(
    const UsbDev &dev, const UsbPipe &pipe, int32_t timeout, const std::vector<uint8_t> &data)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    UsbdRequestSync *requestSync = nullptr;
    int32_t ret = UsbdFindRequestSyncAndCreat(port, pipe.intfId, pipe.endpointId, &requestSync);
    if (ret != HDF_SUCCESS || requestSync == nullptr) {
        HDF_LOGE("%{public}s:read timeout error", __func__);
        return ret;
    }

    if (requestSync->pipe.pipeDirection != USB_PIPE_DIRECTION_OUT || requestSync->pipe.pipeType != USB_PIPE_TYPE_BULK) {
        HDF_LOGE("%{public}s:invalid param", __func__);
        return HDF_ERR_INVALID_PARAM;
    }

    ret = UsbdBulkWriteSyncBase(port, requestSync, data.data(), data.size(), timeout);
    return ret;
}

int32_t UsbImpl::RequestQueue(
    const UsbDev &dev, const UsbPipe &pipe, const std::vector<uint8_t> &clientData, const std::vector<uint8_t> &buffer)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    UsbdRequestASync *reqAsync = UsbdFindRequestASync(port, pipe.intfId, pipe.endpointId);
    if (reqAsync == nullptr) {
        HDF_LOGE("%{public}s:UsbdFindRequestASync failed", __func__);
        return HDF_ERR_DEVICE_BUSY;
    }

    uint8_t *clientDataAddr = nullptr;
    int32_t ret = UsbdDispatcher::UsbdMallocAndFill(clientDataAddr, clientData);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:clientDataAddr UsbdMallocAndFill failed", __func__);
        return HDF_FAILURE;
    }

    uint8_t *bufferAddr = nullptr;
    ret = UsbdDispatcher::UsbdMallocAndFill(bufferAddr, buffer);
    if (ret != HDF_SUCCESS) {
        OsalMemFree(clientDataAddr);
        clientDataAddr = nullptr;
        HDF_LOGE("%{public}s:bufferAddr UsbdMallocAndFill failed", __func__);
        return HDF_FAILURE;
    }

    reqAsync->reqMsg.clientData = static_cast<void *>(clientDataAddr);
    reqAsync->reqMsg.clientLength = sizeof(uint8_t) * clientData.size();
    ret = FunRequestQueueFillAndSubmit(port, reqAsync, bufferAddr, sizeof(uint8_t) * buffer.size());
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:FunRequestQueueFillAndSubmit failed:%{public}d", __func__, ret);
        OsalMemFree(clientDataAddr);
        clientDataAddr = nullptr;
    }

    OsalMemFree(bufferAddr);
    bufferAddr = nullptr;
    return ret;
}

int32_t UsbImpl::RequestWait(
    const UsbDev &dev, std::vector<uint8_t> &clientData, std::vector<uint8_t> &buffer, int32_t timeout)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    UsbdRequestASync *reqMsg = nullptr;
    int32_t ret = GetRequestMsgFromQueue(port, &reqMsg);
    if (ret != HDF_SUCCESS || reqMsg == nullptr || reqMsg->reqMsg.request == nullptr) {
        HDF_LOGE("%{public}s:GetRequestMsgFromQueue error:%{public}d", __func__, ret);
        return ret;
    }

    UsbIfRequest *reqValue = reinterpret_cast<UsbIfRequest *>(reqMsg->reqMsg.request);
    if (static_cast<int32_t>(reqMsg->reqMsg.request->compInfo.status) == -1) {
        ret = OsalSemWait(&reqValue->hostRequest->sem, timeout);
        if (ret != HDF_SUCCESS) {
            HDF_LOGE("%{public}s:OsalSemWait failed, ret=%{public}d", __func__, ret);
            OsalMutexLock(&port->requestLock);
            HdfSListAdd(&port->requestQueue, &reqMsg->qNode);
            OsalMutexUnlock(&port->requestLock);
            return ret;
        }
    }

    uint32_t length = 0;
    uint8_t *buf = nullptr;
    ret = GetRequestMsgData(port, reqMsg, timeout, &buf, &length);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:GetRequestMsgData failed:%{public}d", __func__, ret);
        return ret;
    }

    uint8_t *clientDataAddr = static_cast<uint8_t *>(reqMsg->reqMsg.clientData);
    uint8_t *bufferAddr = static_cast<uint8_t *>(reqMsg->reqMsg.request->compInfo.buffer);
    clientData.assign(clientDataAddr, clientDataAddr + reqMsg->reqMsg.clientLength);
    buffer.assign(bufferAddr, bufferAddr + reqMsg->reqMsg.request->compInfo.length);
    UsbdRequestASyncReleaseData(reqMsg);
    return ret;
}

int32_t UsbImpl::RequestCancel(const UsbDev &dev, const UsbPipe &pipe)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    UsbdRequestASync *reqMsg = nullptr;
    while (GetRequestMsgFromQueue(port, &reqMsg) == HDF_SUCCESS) {
        if (reqMsg) {
            int32_t ret = UsbCancelRequest(reqMsg->reqMsg.request);
            if (ret != HDF_SUCCESS) {
                HDF_LOGW("%{public}s:request cancel failed = %{public}d", __func__, ret);
            }
            OsalMutexLock(&reqMsg->lock);
            UsbdRequestASyncReleaseData(reqMsg);
            reqMsg->status = 0;
            OsalMutexUnlock(&reqMsg->lock);
        }
    }
    return HDF_SUCCESS;
}

int32_t UsbImpl::GetCurrentFunctions(int32_t &funcs)
{
    funcs = UsbdFunction::UsbdGetFunction();
    return HDF_SUCCESS;
}

int32_t UsbImpl::SetCurrentFunctions(int32_t funcs)
{
    if (!isGadgetConnected_) {
        HDF_LOGE("%{public}s:gadget is not connected", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }
    OsalMutexLock(&lock_);
    int32_t ret = UsbdFunction::UsbdSetFunction(funcs);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:UsbdSetFunction failed, ret:%{public}d", __func__, ret);
        OsalMutexUnlock(&lock_);
        return ret;
    }
    OsalMutexUnlock(&lock_);
    return HDF_SUCCESS;
}

int32_t UsbImpl::SetPortRole(int32_t portId, int32_t powerRole, int32_t dataRole)
{
    int32_t ret = UsbdPort::GetInstance().SetPort(portId, powerRole, dataRole, subscribers_, MAX_SUBSCRIBER);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:FunSetRole failed, ret:%{public}d", __func__, ret);
        return ret;
    }

    return HDF_SUCCESS;
}

int32_t UsbImpl::QueryPort(int32_t &portId, int32_t &powerRole, int32_t &dataRole, int32_t &mode)
{
    int32_t ret = UsbdPort::GetInstance().QueryPort(portId, powerRole, dataRole, mode);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:QueryPort failed, ret:%{public}d", __func__, ret);
        return ret;
    }

    return HDF_SUCCESS;
}

int32_t UsbImpl::BindUsbdSubscriber(const sptr<IUsbdSubscriber> &subscriber)
{
    int32_t i;
    if (subscriber == nullptr) {
        HDF_LOGE("%{public}s:subscriber is  null", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    const sptr<IRemoteObject> &remote = OHOS::HDI::hdi_objcast<IUsbdSubscriber>(subscriber);
    for (i = 0; i < MAX_SUBSCRIBER; i++) {
        if (subscribers_[i].remote == remote) {
            break;
        }
    }
    if (i < MAX_SUBSCRIBER) {
        HDF_LOGI("%{public}s: current subscriber was bind", __func__);
        return HDF_SUCCESS;
    }
    for (i = 0; i < MAX_SUBSCRIBER; i++) {
        if (subscribers_[i].subscriber == nullptr) {
            subscribers_[i].subscriber = subscriber;
            subscribers_[i].impl = this;
            subscribers_[i].usbPnpListener.callBack = UsbdPnpLoaderEventReceived;
            subscribers_[i].usbPnpListener.priv = &subscribers_[i];
            subscribers_[i].remote = remote;
            subscribers_[i].deathRecipient = new UsbImpl::UsbDeathRecipient(subscriber);
            if (subscribers_[i].deathRecipient == nullptr) {
                HDF_LOGE("%{public}s: new deathRecipient failed", __func__);
                return HDF_FAILURE;
            }
            bool result = subscribers_[i].remote->AddDeathRecipient(
                static_cast<UsbDeathRecipient *>(subscribers_[i].deathRecipient));
            if (!result) {
                HDF_LOGE("%{public}s:AddUsbDeathRecipient failed", __func__);
                return HDF_FAILURE;
            }

            HDF_LOGI("%{public}s: index = %{public}d", __func__, i);
            break;
        }
    }
    if (i == MAX_SUBSCRIBER) {
        HDF_LOGE("%{public}s: too many listeners", __func__);
        return HDF_FAILURE;
    }

    if (DdkListenerMgrAdd(&subscribers_[i].usbPnpListener) != HDF_SUCCESS) {
        HDF_LOGE("%{public}s: register listerer failed", __func__);
        return HDF_FAILURE;
    }
    return HDF_SUCCESS;
}

int32_t UsbImpl::UnbindUsbdSubscriber(const sptr<IUsbdSubscriber> &subscriber)
{
    if (subscriber == nullptr) {
        HDF_LOGE("%{public}s:subscriber is  null", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    int32_t i;
    const sptr<IRemoteObject> &remote = OHOS::HDI::hdi_objcast<IUsbdSubscriber>(subscriber);
    for (i = 0; i < MAX_SUBSCRIBER; i++) {
        if (subscribers_[i].remote == remote) {
            break;
        }
    }
    if (i == MAX_SUBSCRIBER) {
        HDF_LOGE("%{public}s: current subscriber not bind", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }
    bool result = remote->RemoveDeathRecipient(static_cast<UsbDeathRecipient *>(subscribers_[i].deathRecipient));
    if (!result) {
        HDF_LOGE("%{public}s:RemoveUsbDeathRecipient failed", __func__);
        return HDF_FAILURE;
    }

    subscribers_[i].subscriber = nullptr;
    subscribers_[i].remote = nullptr;
    subscribers_[i].deathRecipient = nullptr;
    if (DdkListenerMgrRemove(&subscribers_[i].usbPnpListener) != HDF_SUCCESS) {
        HDF_LOGE("%{public}s: remove listerer failed", __func__);
        return HDF_FAILURE;
    }
    return HDF_SUCCESS;
}

void UsbImpl::UsbDeathRecipient::OnRemoteDied(const wptr<IRemoteObject> &object)
{
    int32_t i;
    for (i = 0; i < MAX_SUBSCRIBER; i++) {
        if (UsbImpl::subscribers_[i].subscriber == deathSubscriber_) {
            break;
        }
    }
    if (i == MAX_SUBSCRIBER) {
        HDF_LOGE("%{public}s: current subscriber not bind", __func__);
        return;
    }
    UsbImpl::subscribers_[i].subscriber = nullptr;
    subscribers_[i].remote = nullptr;
    subscribers_[i].deathRecipient = nullptr;
    if (DdkListenerMgrRemove(&UsbImpl::subscribers_[i].usbPnpListener) != HDF_SUCCESS) {
        HDF_LOGE("%{public}s: remove listerer failed", __func__);
    }
    UsbdLoadUsbService::SetUsbLoadRemoveCount(UsbdLoadUsbService::GetUsbLoadRemoveCount());
}

int32_t UsbImpl::RegBulkCallback(const UsbDev &dev, const UsbPipe &pipe, const sptr<IUsbdBulkCallback> &cb)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    UsbdBulkASyncList *list = UsbdBulkASyncListInit(port, pipe.intfId, pipe.endpointId);
    if (list == nullptr) {
        HDF_LOGE("%{public}s:UsbdBulkASyncListFind failed", __func__);
        return HDF_ERR_MALLOC_FAIL;
    }
    list->cb = cb;
    if (list->cb == nullptr) {
        HDF_LOGE("%{public}s:get callback error", __func__);
        return HDF_ERR_IO;
    }

    return HDF_SUCCESS;
}

int32_t UsbImpl::UnRegBulkCallback(const UsbDev &dev, const UsbPipe &pipe)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    UsbdBulkASyncList *list = UsbdBulkASyncListFind(port, pipe.intfId, pipe.endpointId);
    if (list == nullptr) {
        HDF_LOGE("%{public}s:UsbdBulkASyncListFind failed", __func__);
        return HDF_FAILURE;
    }
    list->cb = nullptr;
    return HDF_SUCCESS;
}

int32_t UsbImpl::BulkRead(const UsbDev &dev, const UsbPipe &pipe, const sptr<Ashmem> &ashmem)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    UsbdBulkASyncList *list = UsbdBulkASyncListInit(port, pipe.intfId, pipe.endpointId);
    if (list == nullptr) {
        HDF_LOGE("%{public}s:UsbdBulkASyncListInit failed.", __func__);
        return HDF_ERR_MALLOC_FAIL;
    }

    int32_t ret = InitAsmBufferHandle(&list->asmHandle, ashmem->GetAshmemFd(), ashmem->GetAshmemSize());
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:InitAsmBufferHandle failed ret:%{public}d ashmem fd:%{public}d size:%{public}d", __func__,
            ret, ashmem->GetAshmemFd(), ashmem->GetAshmemSize());
        return ret;
    }

    ret = UsbdBulkReadASyncSubmitStart(list);
    if (ret == HDF_DEV_ERR_NODATA || ret == HDF_DEV_ERR_NO_MEMORY || ret == HDF_ERR_DEVICE_BUSY) {
        ret = HDF_SUCCESS;
    }
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:UsbdBulkReadASyncSubmitStart error ret:%{public}d", __func__, ret);
        return ret;
    }

    return ret;
}

int32_t UsbImpl::BulkWrite(const UsbDev &dev, const UsbPipe &pipe, const sptr<Ashmem> &ashmem)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    UsbdBulkASyncList *list = UsbdBulkASyncListInit(port, pipe.intfId, pipe.endpointId);
    if (list == nullptr) {
        HDF_LOGE("%{public}s:UsbdBulkASyncListInit failed.", __func__);
        return HDF_ERR_MALLOC_FAIL;
    }

    int32_t ret = InitAsmBufferHandle(&list->asmHandle, ashmem->GetAshmemFd(), ashmem->GetAshmemSize());
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:InitAsmBufferHandle failed ret:%{public}d ashmem fd:%{public}d size:%{public}d", __func__,
            ret, ashmem->GetAshmemFd(), ashmem->GetAshmemSize());
        return ret;
    }

    ret = UsbdBulkASyncWriteSubmitStart(list);
    if (ret == HDF_DEV_ERR_NODATA || ret == HDF_DEV_ERR_NO_MEMORY || ret == HDF_ERR_DEVICE_BUSY) {
        ret = HDF_SUCCESS;
    }
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%{public}s:UsbdBulkASyncWriteSubmitStart error ret:%{public}d", __func__, ret);
        return ret;
    }

    return ret;
}

int32_t UsbImpl::BulkCancel(const UsbDev &dev, const UsbPipe &pipe)
{
    HostDevice *port = FindDevFromService(dev.busNum, dev.devAddr);
    if (port == nullptr) {
        HDF_LOGE("%{public}s:FindDevFromService failed", __func__);
        return HDF_DEV_ERR_NO_DEVICE;
    }

    UsbdBulkASyncList *list = UsbdBulkASyncListFind(port, pipe.intfId, pipe.endpointId);
    if (list == nullptr) {
        HDF_LOGW("%{public}s:UsbdBulkASyncListFind failed interfaceId:%{public}u endpointId:%{public}u", __func__,
            pipe.intfId, pipe.endpointId);
        return HDF_FAILURE;
    }
    sptr<IUsbdBulkCallback> tcb = list->cb;
    list->cb = nullptr;
    ReleaseAsmBufferHandle(&list->asmHandle);
    BulkRequestCancel(list);
    list->cb = tcb;
    return HDF_SUCCESS;
}
} // namespace V1_0
} // namespace Usb
} // namespace HDI
} // namespace OHOS
