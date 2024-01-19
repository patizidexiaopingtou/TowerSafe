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

#ifndef OHOS_HDI_USB_V1_0_USBIMPL_H
#define OHOS_HDI_USB_V1_0_USBIMPL_H
#include "hdf_slist.h"
#include "iproxy_broker.h"
#include "iremote_object.h"
#include "osal_mutex.h"
#include "usb_session.h"
#include "usbd.h"
#include "v1_0/iusb_interface.h"

#define BASE_CLASS_HUB 0x09

constexpr uint8_t MAX_INTERFACEID = 0xFF;

namespace OHOS {
namespace HDI {
namespace Usb {
namespace V1_0 {
class UsbImpl : public IUsbInterface {
public:
    OsalMutex lock_;
    HdfSList devList_;
    UsbSession *session_;
    HdfDeviceObject *device_;

    UsbImpl();
    virtual ~UsbImpl();
    int32_t OpenDevice(const UsbDev &dev) override;
    int32_t CloseDevice(const UsbDev &dev) override;
    int32_t GetDeviceDescriptor(const UsbDev &dev, std::vector<uint8_t> &decriptor) override;
    int32_t GetStringDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &decriptor) override;
    int32_t GetConfigDescriptor(const UsbDev &dev, uint8_t descId, std::vector<uint8_t> &decriptor) override;
    int32_t GetRawDescriptor(const UsbDev &dev, std::vector<uint8_t> &decriptor) override;
    int32_t GetFileDescriptor(const UsbDev &dev, int32_t &fd) override;
    int32_t SetConfig(const UsbDev &dev, uint8_t configIndex) override;
    int32_t GetConfig(const UsbDev &dev, uint8_t &configIndex) override;
    int32_t ClaimInterface(const UsbDev &dev, uint8_t interfaceid, uint8_t force) override;
    int32_t ReleaseInterface(const UsbDev &dev, uint8_t interfaceid) override;
    int32_t SetInterface(const UsbDev &dev, uint8_t interfaceid, uint8_t altIndex) override;
    int32_t BulkTransferRead(
        const UsbDev &dev, const UsbPipe &pipe, int32_t timeout, std::vector<uint8_t> &data) override;
    int32_t BulkTransferWrite(
        const UsbDev &dev, const UsbPipe &pipe, int32_t timeout, const std::vector<uint8_t> &data) override;
    int32_t ControlTransferRead(const UsbDev &dev, const UsbCtrlTransfer &ctrl, std::vector<uint8_t> &data) override;
    int32_t ControlTransferWrite(
        const UsbDev &dev, const UsbCtrlTransfer &ctrl, const std::vector<uint8_t> &data) override;
    int32_t InterruptTransferRead(
        const UsbDev &dev, const UsbPipe &pipe, int32_t timeout, std::vector<uint8_t> &data) override;
    int32_t InterruptTransferWrite(
        const UsbDev &dev, const UsbPipe &pipe, int32_t timeout, const std::vector<uint8_t> &data) override;
    int32_t IsoTransferRead(
        const UsbDev &dev, const UsbPipe &pipe, int32_t timeout, std::vector<uint8_t> &data) override;
    int32_t IsoTransferWrite(
        const UsbDev &dev, const UsbPipe &pipe, int32_t timeout, const std::vector<uint8_t> &data) override;
    int32_t RequestQueue(const UsbDev &dev, const UsbPipe &pipe, const std::vector<uint8_t> &clientData,
        const std::vector<uint8_t> &buffer) override;
    int32_t RequestWait(
        const UsbDev &dev, std::vector<uint8_t> &clientData, std::vector<uint8_t> &buffer, int32_t timeout) override;
    int32_t RequestCancel(const UsbDev &dev, const UsbPipe &pipe) override;
    int32_t GetCurrentFunctions(int32_t &funcs) override;
    int32_t SetCurrentFunctions(int32_t funcs) override;
    int32_t SetPortRole(int32_t portId, int32_t powerRole, int32_t dataRole) override;
    int32_t QueryPort(int32_t &portId, int32_t &powerRole, int32_t &dataRole, int32_t &mode) override;
    int32_t BindUsbdSubscriber(const sptr<IUsbdSubscriber> &subscriber) override;
    int32_t UnbindUsbdSubscriber(const sptr<IUsbdSubscriber> &subscriber) override;
    int32_t RegBulkCallback(const UsbDev &dev, const UsbPipe &pipe, const sptr<IUsbdBulkCallback> &cb) override;
    int32_t UnRegBulkCallback(const UsbDev &dev, const UsbPipe &pipe) override;
    int32_t BulkRead(const UsbDev &dev, const UsbPipe &pipe, const sptr<Ashmem> &ashmem) override;
    int32_t BulkWrite(const UsbDev &dev, const UsbPipe &pipe, const sptr<Ashmem> &ashmem) override;
    int32_t BulkCancel(const UsbDev &dev, const UsbPipe &pipe) override;

    static int32_t UsbdRequestSyncReleaseList(HostDevice *port);
    static int32_t UsbdRequestASyncReleaseList(HostDevice *port);
    static int32_t UsbdBulkASyncListReleasePort(HostDevice *port);
    static int32_t UsbdRequestASyncReleaseData(UsbdRequestASync *request);
    static UsbInterfaceHandle *InterfaceIdToHandle(const HostDevice *dev, uint8_t id);
    static int32_t UsbdEventHandle(const sptr<UsbImpl> &inst);
    static int32_t UsbdEventHandleRelease(void);

    HostDevice *FindDevFromService(uint8_t busNum, uint8_t devAddr);

private:
    void MakeUsbControlParams(
        UsbControlParams *controlParams, uint8_t *buffer, uint16_t length, uint16_t value, uint16_t index);
    void MakeGetActiveUsbControlParams(
        UsbControlParams *controlParams, uint8_t *buffer, uint16_t length, uint16_t value, uint16_t index);
    int32_t UsbControlTransferEx(HostDevice *dev, UsbControlParams *ctrParams, int32_t timeout);
    void MakeSetActiveUsbControlParams(
        UsbControlParams *controlParams, uint8_t *buffer, uint16_t length, uint16_t value, uint16_t index);
    static int32_t ReOpenDevice(HostDevice *port);
    int32_t UsbdFindRequestSyncAndCreat(
        HostDevice *port, uint8_t interfaceId, uint8_t pipeAddr, UsbdRequestSync **request);
    int32_t UsbdBulkReadSyncBase(
        int32_t timeout, uint8_t *buffer, uint32_t size, uint32_t *actlength, UsbdRequestSync *requestSync);
    int32_t UsbdBulkWriteSyncBase(
        HostDevice *port, UsbdRequestSync *requestSync, const uint8_t *buffer, uint32_t length, int32_t timeout);
    UsbdRequestASync *UsbdFindRequestASync(HostDevice *port, uint8_t interfaceId, uint8_t pipeAddr);
    int32_t FunRequestQueueFillAndSubmit(
        HostDevice *port, UsbdRequestASync *reqAsync, const uint8_t *buffer, uint32_t length);
    int32_t GetRequestMsgFromQueue(HostDevice *port, UsbdRequestASync **reqMsg);
    int32_t GetRequestMsgData(
        HostDevice *port, UsbdRequestASync *reqMsg, int32_t timeout, uint8_t **buffer, uint32_t *length);

    int32_t BindUsbSubscriber(const sptr<IUsbdSubscriber> &subscriber);

    UsbdBulkASyncList *UsbdBulkASyncListInit(HostDevice *port, uint8_t ifId, uint8_t epId);
    UsbdBulkASyncList *UsbdBulkASyncListFind(HostDevice *port, uint8_t ifId, uint8_t epId);
    int32_t InitAsmBufferHandle(UsbdBufferHandle *handle, int32_t fd, int32_t size);
    int32_t UsbdBulkReadASyncSubmitStart(UsbdBulkASyncList *list);
    int32_t UsbdBulkASyncWriteSubmitStart(UsbdBulkASyncList *list);
    void ReleaseAsmBufferHandle(UsbdBufferHandle *handle);
    int32_t BulkRequestCancel(UsbdBulkASyncList *list);
    int32_t HdfReadDevice(int32_t *count, int32_t *size, HdfSBuf *reply);
    int32_t UsbdReleaseDevices();

    static int32_t UsbdPnpNotifyAddAndRemoveDevice(HdfSBuf *data, UsbdSubscriber *usbdSubscriber, uint32_t id);
    static int32_t UsbdPnpLoaderEventReceived(void *priv, uint32_t id, HdfSBuf *data);
    static int32_t UsbdLoadServiceCallback(void *priv, uint32_t id, HdfSBuf *data);
    class UsbDeathRecipient : public IRemoteObject::DeathRecipient {
    public:
        explicit UsbDeathRecipient(const sptr<IUsbdSubscriber> &deathSubscriber) : deathSubscriber_(deathSubscriber) {};
        ~UsbDeathRecipient() override {};
        void OnRemoteDied(const wptr<IRemoteObject> &object) override;

    private:
        sptr<IUsbdSubscriber> deathSubscriber_;
    };

private:
    static HdfDevEventlistener listenerForLoadService_;
    static UsbdSubscriber subscribers_[MAX_SUBSCRIBER];
    static bool isGadgetConnected_;
};
} // namespace V1_0
} // namespace Usb
} // namespace HDI
} // namespace OHOS
#endif // OHOS_HDI_USB_V1_0_USBIMPL_H
