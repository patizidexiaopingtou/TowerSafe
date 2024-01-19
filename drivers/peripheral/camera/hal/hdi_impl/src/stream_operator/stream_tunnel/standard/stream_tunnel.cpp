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
#include "stream_tunnel.h"
#include "buffer_adapter.h"
#include "image_buffer.h"
#include "video_key_info.h"

namespace {
constexpr uint32_t REQUEST_TIMEOUT = 0;
constexpr uint32_t STRIDE_ALIGNMENT = 8;
} // namespace

namespace OHOS::Camera {
StreamTunnel::~StreamTunnel()
{
    CAMERA_LOGV("enter");
    DetachBufferQueue();
}

RetCode StreamTunnel::AttachBufferQueue(OHOS::sptr<OHOS::IBufferProducer>& producer)
{
    CHECK_IF_PTR_NULL_RETURN_VALUE(producer, RC_ERROR);
    bufferQueue_ = OHOS::Surface::CreateSurfaceAsProducer(producer);
    CHECK_IF_PTR_NULL_RETURN_VALUE(bufferQueue_, RC_ERROR);
    return RC_OK;
}

RetCode StreamTunnel::DetachBufferQueue()
{
    bufferQueue_ = nullptr;
    return RC_OK;
}

void StreamTunnel::CleanBuffers()
{
    if (stop_ == false) {
        return;
    }
    wakeup_ = true;
    waitCV_.notify_one();

    std::lock_guard<std::mutex> l(lock_);
    buffers.clear();
    bufferQueue_->CleanCache();
    index = -1;
}

std::shared_ptr<IBuffer> StreamTunnel::GetBuffer()
{
    CHECK_IF_PTR_NULL_RETURN_VALUE(bufferQueue_, nullptr);
    OHOS::sptr<OHOS::SurfaceBuffer> sb = nullptr;
    int32_t fence = 0;
    constexpr int32_t SLEEP_TIME = 2000;
    OHOS::SurfaceError sfError = OHOS::SURFACE_ERROR_OK;
    do {
        sfError = bufferQueue_->RequestBuffer(sb, fence, requestConfig_);
        if (sfError == OHOS::SURFACE_ERROR_NO_BUFFER) {
            std::unique_lock<std::mutex> l(waitLock_);
            waitCV_.wait(l, [this] { return wakeup_ == true; });
            usleep(SLEEP_TIME);
        }
        stats_.RequestBufferResult(sfError);
    } while (!stop_ && sfError == OHOS::SURFACE_ERROR_NO_BUFFER);
    wakeup_ = false;

    if (stop_) {
        if (sb != nullptr) {
            int ret = bufferQueue_->CancelBuffer(sb);
            stats_.CancelBufferResult(ret);
        }
        return nullptr;
    }

    if (sfError != OHOS::SURFACE_ERROR_OK) {
        CAMERA_LOGE("get producer buffer failed, error:%{public}s", SurfaceErrorStr(sfError).c_str());
        return nullptr;
    }

    std::shared_ptr<IBuffer> cb = GetCameraBufferAndUpdateInfo(sb);
    restBuffers.fetch_add(1, std::memory_order_release);
    return cb;
}

RetCode StreamTunnel::PutBuffer(const std::shared_ptr<IBuffer>& buffer)
{
    CHECK_IF_PTR_NULL_RETURN_VALUE(buffer, RC_ERROR);
    CHECK_IF_PTR_NULL_RETURN_VALUE(bufferQueue_, RC_ERROR);
    OHOS::sptr<OHOS::SurfaceBuffer> sb = nullptr;
    {
        std::lock_guard<std::mutex> l(lock_);
        auto it = buffers.find(buffer);
        if (it == buffers.end()) {
            CAMERA_LOGE("buffer [%{public}d] doesn't belong to this tunnel.", buffer->GetIndex());
            return RC_ERROR;
        }
        sb = it->second;
    }

    if (buffer->GetBufferStatus() == CAMERA_BUFFER_STATUS_OK) {
        int32_t fence = -1;
        EsFrameInfo esInfo = buffer->GetEsFrameInfo();
        if (esInfo.size != -1) {
            const sptr<OHOS::BufferExtraData>& extraData = sb->GetExtraData();
            if (extraData != nullptr) {
                extraData->ExtraSet(OHOS::Camera::dataSize, esInfo.size);
                extraData->ExtraSet(OHOS::Camera::isKeyFrame, esInfo.isKey);
                extraData->ExtraSet(OHOS::Camera::timeStamp, esInfo.timestamp);
                extraData->ExtraSet(OHOS::Camera::streamId, buffer->GetStreamId());
                extraData->ExtraSet(OHOS::Camera::captureId, buffer->GetCaptureId());
            }
        }
        int ret = bufferQueue_->FlushBuffer(sb, fence, flushConfig_);
        stats_.FlushBufferResult(ret);
        frameCount_++;
    } else {
        int ret = bufferQueue_->CancelBuffer(sb);
        stats_.CancelBufferResult(ret);
    }

    restBuffers.fetch_sub(1, std::memory_order_release);
    finishCV_.notify_all();
    {
        std::unique_lock<std::mutex> l(waitLock_);
        wakeup_ = true;
        waitCV_.notify_one();
    }
    return RC_OK;
}

RetCode StreamTunnel::SetBufferCount(const int32_t n)
{
    CHECK_IF_PTR_NULL_RETURN_VALUE(bufferQueue_, RC_ERROR);
    bufferQueue_->SetQueueSize(n);
    return RC_OK;
}

RetCode StreamTunnel::Config(const TunnelConfig& config)
{
    requestConfig_.width = config.width;
    requestConfig_.height = config.height;
    requestConfig_.format = BufferAdapter::CameraFormatToPixelFormat(config.format);
    requestConfig_.usage = BufferAdapter::CameraUsageToGrallocUsage(config.usage);
    requestConfig_.strideAlignment = STRIDE_ALIGNMENT;
    requestConfig_.timeout = REQUEST_TIMEOUT;

    flushConfig_.damage.w = config.width;
    flushConfig_.damage.h = config.height;

    return RC_OK;
}

uint64_t StreamTunnel::GetFrameCount() const
{
    return frameCount_;
}

void StreamTunnel::NotifyStop()
{
    std::unique_lock<std::mutex> l(waitLock_);
    wakeup_ = true;
    stop_ = true;
    waitCV_.notify_one();
}

void StreamTunnel::NotifyStart()
{
    stop_ = false;
}

void StreamTunnel::WaitForAllBufferReturned()
{
    std::unique_lock<std::mutex> l(finishLock_);
    auto timeout = std::chrono::system_clock::now() + std::chrono::microseconds(1000 * 200); // 200ms
    if (!finishCV_.wait_until(l, timeout, [this] {
            CAMERA_LOGD("%{public}p restBuffers=%{public}u", this, restBuffers.load(std::memory_order_acquire));
            return restBuffers.load(std::memory_order_acquire) == 0;
        })) {
        CAMERA_LOGW(
            "WaitForAllBufferReturned timeout, restBuffers=%{public}u", restBuffers.load(std::memory_order_acquire));
    } else {
        CAMERA_LOGW(
            "WaitForAllBufferReturned done, restBuffers=%{public}u", restBuffers.load(std::memory_order_acquire));
    }
}

void StreamTunnel::DumpStats(int interval)
{
    stats_.DumpStats(interval);
}

void StreamTunnel::SetStreamId(int32_t streamId)
{
    streamId_ = streamId;
    stats_.SetStreamId(streamId);
}

std::shared_ptr<IBuffer> StreamTunnel::GetCameraBufferAndUpdateInfo(OHOS::sptr<OHOS::SurfaceBuffer> sb)
{
    std::shared_ptr<IBuffer> cb = nullptr;
    {
        std::lock_guard<std::mutex> l(lock_);
        for (auto it = buffers.begin(); it != buffers.end(); it++) {
            if (it->second == sb) {
                cb = it->first;
            }
        }
    }
    if (cb == nullptr) {
        cb = std::make_shared<ImageBuffer>(CAMERA_BUFFER_SOURCE_TYPE_EXTERNAL);
        RetCode rc = BufferAdapter::SurfaceBufferToCameraBuffer(sb, cb);
        if (rc != RC_OK || cb == nullptr) {
            CAMERA_LOGE("create tunnel buffer failed.");
            return nullptr;
        }

        cb->SetIndex(++index);
        {
            std::lock_guard<std::mutex> l(lock_);
            buffers[cb] = sb;
        }
    } else {
        cb->SetBufferStatus(CAMERA_BUFFER_STATUS_OK);
    }
    return cb;
}
} // namespace OHOS::Camera
