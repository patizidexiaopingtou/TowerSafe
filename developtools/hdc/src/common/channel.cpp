/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
#include "channel.h"
namespace Hdc {
HdcChannelBase::HdcChannelBase(const bool serverOrClient, const string &addrString, uv_loop_t *loopMainIn)
{
    SetChannelTCPString(addrString);
    isServerOrClient = serverOrClient;
    loopMain = loopMainIn;
    threadChanneMain = uv_thread_self();
    uv_rwlock_init(&mainAsync);
    uv_async_init(loopMain, &asyncMainLoop, MainAsyncCallback);
    uv_rwlock_init(&lockMapChannel);
}

HdcChannelBase::~HdcChannelBase()
{
    ClearChannels();
    // clear
    if (!uv_is_closing((uv_handle_t *)&asyncMainLoop)) {
        uv_close((uv_handle_t *)&asyncMainLoop, nullptr);
    }

    uv_rwlock_destroy(&mainAsync);
    uv_rwlock_destroy(&lockMapChannel);
}

vector<uint8_t> HdcChannelBase::GetChannelHandshake(string &connectKey) const
{
    vector<uint8_t> ret;
    struct ChannelHandShake handshake = {};
    if (strcpy_s(handshake.banner, sizeof(handshake.banner), HANDSHAKE_MESSAGE.c_str()) != EOK) {
        return ret;
    }
    if (strcpy_s(handshake.connectKey, sizeof(handshake.connectKey), connectKey.c_str()) != EOK) {
        return ret;
    }
    ret.insert(ret.begin(), (uint8_t *)&handshake, (uint8_t *)&handshake + sizeof(ChannelHandShake));
    return ret;
}

bool HdcChannelBase::SetChannelTCPString(const string &addrString)
{
    bool ret = false;
    while (true) {
        if (addrString.find(":") == string::npos) {
            break;
        }
        std::size_t found = addrString.find_last_of(":");
        if (found == string::npos) {
            break;
        }

        string host = addrString.substr(0, found);
        string port = addrString.substr(found + 1);

        channelPort = std::atoi(port.c_str());
        sockaddr_in addrv4;
        sockaddr_in6 addrv6;
        if (!channelPort) {
            break;
        }

        if (uv_ip6_addr(host.c_str(), channelPort, &addrv6) != 0 &&
            uv_ip4_addr(host.c_str(), channelPort, &addrv4) != 0) {
            break;
        }
        channelHost = host;
        channelHostPort = addrString;
        ret = true;
        break;
    }
    if (!ret) {
        channelPort = 0;
        channelHost = STRING_EMPTY;
        channelHostPort = STRING_EMPTY;
    }
    return ret;
}

void HdcChannelBase::ClearChannels()
{
    for (auto v : mapChannel) {
        HChannel hChannel = (HChannel)v.second;
        if (!hChannel->isDead) {
            FreeChannel(hChannel->channelId);
        }
    }
}

void HdcChannelBase::WorkerPendding()
{
    WRITE_LOG(LOG_DEBUG, "Begin host channel pendding");
    uv_run(loopMain, UV_RUN_DEFAULT);
    uv_loop_close(loopMain);
}

void HdcChannelBase::ReadStream(uv_stream_t *tcp, ssize_t nread, const uv_buf_t *buf)
{
    int size = 0;
    int indexBuf = 0;
    int childRet = 0;
    bool needExit = false;
    HChannel hChannel = (HChannel)tcp->data;
    HdcChannelBase *thisClass = (HdcChannelBase *)hChannel->clsChannel;

    if (nread == UV_ENOBUFS) {
        WRITE_LOG(LOG_DEBUG, "HdcChannelBase::ReadStream Pipe IOBuf max");
        return;
    } else if (nread == 0) {
        // maybe just after accept, second client req
        WRITE_LOG(LOG_DEBUG, "HdcChannelBase::ReadStream idle read");
        return;
    } else if (nread < 0) {
        Base::TryCloseHandle((uv_handle_t *)tcp);
        constexpr int bufSize = 1024;
        char buffer[bufSize] = { 0 };
        uv_err_name_r(nread, buffer, bufSize);
        WRITE_LOG(LOG_DEBUG, "HdcChannelBase::ReadStream failed2:%s", buffer);
        needExit = true;
        goto Finish;
    } else {
        hChannel->availTailIndex += nread;
    }
    while (hChannel->availTailIndex > DWORD_SERIALIZE_SIZE) {
        size = ntohl(*reinterpret_cast<uint32_t *>(hChannel->ioBuf + indexBuf));  // big endian
        if (size <= 0 || static_cast<uint32_t>(size) > HDC_BUF_MAX_BYTES) {
            needExit = true;
            break;
        }
        if (hChannel->availTailIndex - DWORD_SERIALIZE_SIZE < size) {
            break;
        }
        childRet = thisClass->ReadChannel(hChannel, reinterpret_cast<uint8_t *>(hChannel->ioBuf) +
                                          DWORD_SERIALIZE_SIZE + indexBuf, size);
        if (childRet < 0) {
            if (!hChannel->keepAlive) {
                needExit = true;
                break;
            }
        }
        // update io
        hChannel->availTailIndex -= (DWORD_SERIALIZE_SIZE + size);
        indexBuf += DWORD_SERIALIZE_SIZE + size;
    }
    if (indexBuf > 0 && hChannel->availTailIndex > 0) {
        if (memmove_s(hChannel->ioBuf, hChannel->bufSize, hChannel->ioBuf + indexBuf, hChannel->availTailIndex)) {
            needExit = true;
            goto Finish;
        }
    }

Finish:
    if (needExit) {
        thisClass->FreeChannel(hChannel->channelId);
        WRITE_LOG(LOG_DEBUG, "Read Stream needExit, FreeChannel finish");
    }
}

void HdcChannelBase::WriteCallback(uv_write_t *req, int status)
{
    HChannel hChannel = (HChannel)req->handle->data;
    --hChannel->ref;
    HdcChannelBase *thisClass = (HdcChannelBase *)hChannel->clsChannel;
    if (status < 0) {
        Base::TryCloseHandle((uv_handle_t *)req->handle);
        if (!hChannel->isDead && !hChannel->ref) {
            thisClass->FreeChannel(hChannel->channelId);
            WRITE_LOG(LOG_DEBUG, "WriteCallback TryCloseHandle");
        }
    }
    delete[]((uint8_t *)req->data);
    delete req;
}

void HdcChannelBase::AsyncMainLoopTask(uv_idle_t *handle)
{
    AsyncParam *param = (AsyncParam *)handle->data;
    HdcChannelBase *thisClass = (HdcChannelBase *)param->thisClass;

    switch (param->method) {
        case ASYNC_FREE_CHANNEL: {
            // alloc/release should pair in main thread.
            thisClass->FreeChannel(param->sid);
            break;
        }
        default:
            break;
    }
    if (param->data) {
        delete[]((uint8_t *)param->data);
    }
    delete param;
    uv_close((uv_handle_t *)handle, Base::CloseIdleCallback);
}

// multiple uv_async_send() calls may be merged by libuv，so not each call will yield callback as expected.
// eg: if uv_async_send() 5 times before callback calling，it will be called only once.
// if uv_async_send() is called again after callback calling, it will be called again.
void HdcChannelBase::MainAsyncCallback(uv_async_t *handle)
{
    HdcChannelBase *thisClass = (HdcChannelBase *)handle->data;
    if (uv_is_closing((uv_handle_t *)thisClass->loopMain)) {
        return;
    }
    list<void *>::iterator i;
    list<void *> &lst = thisClass->lstMainThreadOP;
    uv_rwlock_wrlock(&thisClass->mainAsync);
    for (i = lst.begin(); i != lst.end();) {
        AsyncParam *param = (AsyncParam *)*i;
        Base::IdleUvTask(thisClass->loopMain, param, AsyncMainLoopTask);
        i = lst.erase(i);
    }
    uv_rwlock_wrunlock(&thisClass->mainAsync);
}

void HdcChannelBase::PushAsyncMessage(const uint32_t channelId, const uint8_t method, const void *data,
                                      const int dataSize)
{
    if (uv_is_closing((uv_handle_t *)&asyncMainLoop)) {
        return;
    }
    auto param = new AsyncParam();
    if (!param) {
        return;
    }
    param->sid = channelId;  // Borrow SID storage
    param->thisClass = this;
    param->method = method;
    if (dataSize > 0) {
        param->dataSize = dataSize;
        param->data = new uint8_t[param->dataSize]();
        if (!param->data) {
            delete param;
            return;
        }
        if (memcpy_s((uint8_t *)param->data, param->dataSize, data, dataSize)) {
            delete[]((uint8_t *)param->data);
            delete param;
            return;
        }
    }
    asyncMainLoop.data = this;
    uv_rwlock_wrlock(&mainAsync);
    lstMainThreadOP.push_back(param);
    uv_rwlock_wrunlock(&mainAsync);
    uv_async_send(&asyncMainLoop);
}

// add commandflag ahead real buf data
void HdcChannelBase::SendChannelWithCmd(HChannel hChannel, const uint16_t commandFlag, uint8_t *bufPtr, const int size)
{
    auto data = new uint8_t[size + sizeof(commandFlag)]();
    if (!data) {
        return;
    }

    if (memcpy_s(data, size + sizeof(commandFlag), &commandFlag, sizeof(commandFlag))) {
        delete[] data;
        return;
    }

    if (size > 0 && memcpy_s(data + sizeof(commandFlag), size, bufPtr, size)) {
        delete[] data;
        return;
    }

    SendChannel(hChannel, data, size + sizeof(commandFlag));
    delete[] data;
}

void HdcChannelBase::SendWithCmd(const uint32_t channelId, const uint16_t commandFlag, uint8_t *bufPtr, const int size)
{
    HChannel hChannel = reinterpret_cast<HChannel>(AdminChannel(OP_QUERY_REF, channelId, nullptr));
    if (!hChannel) {
        return;
    }
    do {
        if (hChannel->isDead) {
            break;
        }
        SendChannelWithCmd(hChannel, commandFlag, bufPtr, size);
    } while (false);
    --hChannel->ref;
}

void HdcChannelBase::SendChannel(HChannel hChannel, uint8_t *bufPtr, const int size)
{
    uv_stream_t *sendStream = nullptr;
    int sizeNewBuf = size + DWORD_SERIALIZE_SIZE;
    auto data = new uint8_t[sizeNewBuf]();
    if (!data) {
        return;
    }
    *reinterpret_cast<uint32_t *>(data) = htonl(size);  // big endian
    if (memcpy_s(data + DWORD_SERIALIZE_SIZE, sizeNewBuf - DWORD_SERIALIZE_SIZE, bufPtr, size)) {
        delete[] data;
        return;
    }
    if (hChannel->hWorkThread == uv_thread_self()) {
        sendStream = (uv_stream_t *)&hChannel->hWorkTCP;
    } else {
        sendStream = (uv_stream_t *)&hChannel->hChildWorkTCP;
    }
    if (!uv_is_closing((const uv_handle_t *)sendStream) && uv_is_writable(sendStream)) {
        ++hChannel->ref;
        Base::SendToStreamEx(sendStream, data, sizeNewBuf, nullptr, (void *)WriteCallback, data);
    } else {
        delete[] data;
    }
}

// works only in current working thread
void HdcChannelBase::Send(const uint32_t channelId, uint8_t *bufPtr, const int size)
{
    HChannel hChannel = reinterpret_cast<HChannel>(AdminChannel(OP_QUERY_REF, channelId, nullptr));
    if (!hChannel) {
        return;
    }
    do {
        if (hChannel->isDead) {
            break;
        }
        SendChannel(hChannel, bufPtr, size);
    } while (false);
    --hChannel->ref;
}

void HdcChannelBase::AllocCallback(uv_handle_t *handle, size_t sizeWanted, uv_buf_t *buf)
{
    HChannel context = (HChannel)handle->data;
    Base::ReallocBuf(&context->ioBuf, &context->bufSize, Base::GetMaxBufSize() * 4);
    buf->base = (char *)context->ioBuf + context->availTailIndex;
    buf->len = context->bufSize - context->availTailIndex;
}

uint32_t HdcChannelBase::GetChannelPseudoUid()
{
    uint32_t uid = 0;
    do {
        uid = static_cast<uint32_t>(Base::GetRandom());
    } while (AdminChannel(OP_QUERY, uid, nullptr) != nullptr);
    return uid;
}

uint32_t HdcChannelBase::MallocChannel(HChannel *hOutChannel)
{
    auto hChannel = new HdcChannel();
    if (!hChannel) {
        return 0;
    }
    hChannel->stdinTty.data = nullptr;
    hChannel->stdoutTty.data = nullptr;
    uint32_t channelId = GetChannelPseudoUid();
    if (isServerOrClient) {
        hChannel->serverOrClient = isServerOrClient;
        ++channelId;  // Use different value for serverForClient&client in per process
    }
    uv_tcp_init(loopMain, &hChannel->hWorkTCP);
    ++hChannel->uvHandleRef;
    hChannel->hWorkThread = uv_thread_self();
    hChannel->hWorkTCP.data = hChannel;
    hChannel->clsChannel = this;
    hChannel->channelId = channelId;
    (void)memset_s(&hChannel->hChildWorkTCP, sizeof(hChannel->hChildWorkTCP), 0, sizeof(uv_tcp_t));
    AdminChannel(OP_ADD, channelId, hChannel);
    *hOutChannel = hChannel;
    WRITE_LOG(LOG_DEBUG, "Mallocchannel:%u", channelId);
    return channelId;
}

// work when libuv-handle at struct of HdcSession has all callback finished
void HdcChannelBase::FreeChannelFinally(uv_idle_t *handle)
{
    HChannel hChannel = (HChannel)handle->data;
    HdcChannelBase *thisClass = (HdcChannelBase *)hChannel->clsChannel;
    if (hChannel->uvHandleRef > 0) {
        return;
    }
    thisClass->NotifyInstanceChannelFree(hChannel);
    thisClass->AdminChannel(OP_REMOVE, hChannel->channelId, nullptr);
    WRITE_LOG(LOG_DEBUG, "!!!FreeChannelFinally channelId:%u finish", hChannel->channelId);
    if (!hChannel->serverOrClient) {
        uv_stop(thisClass->loopMain);
    }
    delete hChannel;
    Base::TryCloseHandle((const uv_handle_t *)handle, Base::CloseIdleCallback);
}

void HdcChannelBase::FreeChannelContinue(HChannel hChannel)
{
    auto closeChannelHandle = [](uv_handle_t *handle) -> void {
        if (handle->data == nullptr) {
            WRITE_LOG(LOG_WARN, "FreeChannelContinue handle->data is nullptr");
            return;
        }
        HChannel hChannel = reinterpret_cast<HChannel>(handle->data);
        --hChannel->uvHandleRef;
        Base::TryCloseHandle((uv_handle_t *)handle);
    };
    hChannel->availTailIndex = 0;
    if (hChannel->ioBuf) {
        delete[] hChannel->ioBuf;
        hChannel->ioBuf = nullptr;
    }
    if (!hChannel->serverOrClient) {
        Base::TryCloseHandle((uv_handle_t *)&hChannel->stdinTty, closeChannelHandle);
        Base::TryCloseHandle((uv_handle_t *)&hChannel->stdoutTty, closeChannelHandle);
    }
    if (uv_is_closing((const uv_handle_t *)&hChannel->hWorkTCP)) {
        --hChannel->uvHandleRef;
    } else {
        Base::TryCloseHandle((uv_handle_t *)&hChannel->hWorkTCP, closeChannelHandle);
    }
    Base::IdleUvTask(loopMain, hChannel, FreeChannelFinally);
}

void HdcChannelBase::FreeChannelOpeate(uv_timer_t *handle)
{
    HChannel hChannel = (HChannel)handle->data;
    HdcChannelBase *thisClass = (HdcChannelBase *)hChannel->clsChannel;
    if (hChannel->ref > 0) {
        return;
    }
    if (hChannel->hChildWorkTCP.loop) {
        auto ctrl = HdcSessionBase::BuildCtrlString(SP_DEATCH_CHANNEL, hChannel->channelId, nullptr, 0);
        thisClass->ChannelSendSessionCtrlMsg(ctrl, hChannel->targetSessionId);
        auto callbackCheckFreeChannelContinue = [](uv_timer_t *handle) -> void {
            HChannel hChannel = (HChannel)handle->data;
            HdcChannelBase *thisClass = (HdcChannelBase *)hChannel->clsChannel;
            if (!hChannel->childCleared) {
                return;
            }
            Base::TryCloseHandle((uv_handle_t *)handle, Base::CloseTimerCallback);
            thisClass->FreeChannelContinue(hChannel);
        };
        Base::TimerUvTask(thisClass->loopMain, hChannel, callbackCheckFreeChannelContinue);
    } else {
        thisClass->FreeChannelContinue(hChannel);
    }
    Base::TryCloseHandle((uv_handle_t *)handle, Base::CloseTimerCallback);
}

void HdcChannelBase::FreeChannel(const uint32_t channelId)
{
    if (threadChanneMain != uv_thread_self()) {
        PushAsyncMessage(channelId, ASYNC_FREE_CHANNEL, nullptr, 0);
        return;
    }
    HChannel hChannel = AdminChannel(OP_QUERY, channelId, nullptr);
    do {
        if (!hChannel || hChannel->isDead) {
            break;
        }
        WRITE_LOG(LOG_DEBUG, "Begin to free channel, channelid:%u", channelId);
        Base::TimerUvTask(loopMain, hChannel, FreeChannelOpeate, MINOR_TIMEOUT);  // do immediately
        hChannel->isDead = true;
    } while (false);
}

HChannel HdcChannelBase::AdminChannel(const uint8_t op, const uint32_t channelId, HChannel hInput)
{
    HChannel hRet = nullptr;
    switch (op) {
        case OP_ADD:
            uv_rwlock_wrlock(&lockMapChannel);
            mapChannel[channelId] = hInput;
            uv_rwlock_wrunlock(&lockMapChannel);
            break;
        case OP_REMOVE:
            uv_rwlock_wrlock(&lockMapChannel);
            mapChannel.erase(channelId);
            uv_rwlock_wrunlock(&lockMapChannel);
            break;
        case OP_QUERY:
            uv_rwlock_rdlock(&lockMapChannel);
            if (mapChannel.count(channelId)) {
                hRet = mapChannel[channelId];
            }
            uv_rwlock_rdunlock(&lockMapChannel);
            break;
        case OP_QUERY_REF:
            uv_rwlock_wrlock(&lockMapChannel);
            if (mapChannel.count(channelId)) {
                hRet = mapChannel[channelId];
                ++hRet->ref;
            }
            uv_rwlock_wrunlock(&lockMapChannel);
            break;
        case OP_UPDATE:
            uv_rwlock_wrlock(&lockMapChannel);
            // remove old
            mapChannel.erase(channelId);
            mapChannel[hInput->channelId] = hInput;
            uv_rwlock_wrunlock(&lockMapChannel);
            break;
        default:
            break;
    }
    return hRet;
}

void HdcChannelBase::EchoToClient(HChannel hChannel, uint8_t *bufPtr, const int size)
{
    uv_stream_t *sendStream = nullptr;
    int sizeNewBuf = size + DWORD_SERIALIZE_SIZE;
    auto data = new uint8_t[sizeNewBuf]();
    if (!data) {
        return;
    }
    *reinterpret_cast<uint32_t *>(data) = htonl(size);
    if (memcpy_s(data + DWORD_SERIALIZE_SIZE, sizeNewBuf - DWORD_SERIALIZE_SIZE, bufPtr, size)) {
        delete[] data;
        return;
    }
    sendStream = (uv_stream_t *)&hChannel->hChildWorkTCP;
    if (!uv_is_closing((const uv_handle_t *)sendStream) && uv_is_writable(sendStream)) {
        ++hChannel->ref;
        Base::SendToStreamEx(sendStream, data, sizeNewBuf, nullptr, (void *)WriteCallback, data);
    } else {
        WRITE_LOG(LOG_WARN, "EchoToClient, channelId:%u is unwritable.", hChannel->channelId);
        delete[] data;
    }
}

void HdcChannelBase::EchoToAllChannelsViaSessionId(uint32_t targetSessionId, const string &echo)
{
    for (auto v : mapChannel) {
        HChannel hChannel = (HChannel)v.second;
        if (!hChannel->isDead && hChannel->targetSessionId == targetSessionId) {
            WRITE_LOG(LOG_INFO, "%s:%u %s", __FUNCTION__, targetSessionId, echo.c_str());
            EchoToClient(hChannel, (uint8_t *)echo.c_str(), echo.size());
        }
    }
}
}
