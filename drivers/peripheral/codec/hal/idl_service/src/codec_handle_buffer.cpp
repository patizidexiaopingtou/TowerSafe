/*
 * Copyright 2022 Shenzhen Kaihong DID Co., Ltd..
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "codec_handle_buffer.h"
#include <hdf_base.h>
#include <securec.h>
#include <unistd.h>
#include "codec_log_wrapper.h"
#include "v1_0/codec_types.h"
using namespace OHOS::HDI::Codec::V1_0;
namespace OHOS {
namespace Codec {
namespace Omx {
CodecHandleBuffer::CodecHandleBuffer(struct OmxCodecBuffer &codecBuffer) : ICodecBuffer(codecBuffer)
{}

CodecHandleBuffer::~CodecHandleBuffer()
{
    if (bufferHandle_ != nullptr) {
        FreeBufferHandle(bufferHandle_);
        bufferHandle_ = nullptr;
    }
}

sptr<ICodecBuffer> CodecHandleBuffer::Create(struct OmxCodecBuffer &codecBuffer)
{
    if (codecBuffer.bufferhandle == nullptr) {
        CODEC_LOGE("bufferHandle is null");
        return nullptr;
    }
    auto bufferHandle = codecBuffer.bufferhandle->Move();
    codecBuffer.bufferhandle = nullptr;
    CodecHandleBuffer *buffer = new CodecHandleBuffer(codecBuffer);
    buffer->bufferHandle_ = bufferHandle;
    return sptr<ICodecBuffer>(buffer);
}

int32_t CodecHandleBuffer::FillOmxBuffer(struct OmxCodecBuffer &codecBuffer, OMX_BUFFERHEADERTYPE &omxBuffer)
{
    if (!CheckInvalid(codecBuffer)) {
        CODEC_LOGE("CheckInvalid return false or mem has no right to write ");
        return HDF_ERR_INVALID_PARAM;
    }
    ResetBuffer(codecBuffer, omxBuffer);

    int fenceFd = codecBuffer.fenceFd;
    if (fenceFd >= 0) {
        auto ret = SyncWait(fenceFd, TIME_WAIT_MS);
        if (ret != EOK) {
            CODEC_LOGW("SyncWait ret err");
        }
        close(codecBuffer.fenceFd);
        codecBuffer.fenceFd = -1;
    }
    return ICodecBuffer::FillOmxBuffer(codecBuffer, omxBuffer);
}

int32_t CodecHandleBuffer::EmptyOmxBuffer(struct OmxCodecBuffer &codecBuffer, OMX_BUFFERHEADERTYPE &omxBuffer)
{
    CODEC_LOGE("bufferHandle is not support in EmptyThisBuffer");
    (void)codecBuffer;
    (void)omxBuffer;
    return HDF_ERR_INVALID_PARAM;
}

int32_t CodecHandleBuffer::FreeBuffer(struct OmxCodecBuffer &codecBuffer)
{
    if (!CheckInvalid(codecBuffer)) {
        CODEC_LOGE("shMem_ is null or CheckInvalid return false");
        return HDF_ERR_INVALID_PARAM;
    }
    codecBuffer.bufferhandle = nullptr;
    if (bufferHandle_ != nullptr) {
        FreeBufferHandle(bufferHandle_);
        bufferHandle_ = nullptr;
    }

    return HDF_SUCCESS;
}

int32_t CodecHandleBuffer::EmptyOmxBufferDone(OMX_BUFFERHEADERTYPE &omxBuffer)
{
    CODEC_LOGE("bufferHandle is not support in EmptyThisBuffer");
    (void)omxBuffer;
    return HDF_ERR_INVALID_PARAM;
}

int32_t CodecHandleBuffer::FillOmxBufferDone(OMX_BUFFERHEADERTYPE &omxBuffer)
{
    return ICodecBuffer::FillOmxBufferDone(omxBuffer);
}

uint8_t *CodecHandleBuffer::GetBuffer()
{
    return reinterpret_cast<uint8_t *>(bufferHandle_);
}

bool CodecHandleBuffer::CheckInvalid(struct OmxCodecBuffer &codecBuffer)
{
    if (!ICodecBuffer::CheckInvalid(codecBuffer) || bufferHandle_ == nullptr) {
        CODEC_LOGE("bufferHandle_ is null or CheckInvalid return false");
        return false;
    }
    return true;
}

void CodecHandleBuffer::ResetBuffer(struct OmxCodecBuffer &codecBuffer, OMX_BUFFERHEADERTYPE &omxBuffer)
{
    if (codecBuffer.bufferhandle == nullptr) {
        return;
    }
    auto bufferHandle = codecBuffer.bufferhandle->Move();
    codecBuffer.bufferhandle = nullptr;
    // if recv new BufferHandle, save it, and save the new bufferhandle to omxbuffer
    if (bufferHandle == nullptr) {
        return;
    }
    if (bufferHandle_ != nullptr) {
        FreeBufferHandle(bufferHandle_);
    }
    bufferHandle_ = bufferHandle;
    omxBuffer.pBuffer = reinterpret_cast<uint8_t *>(bufferHandle_);
}
}  // namespace Omx
}  // namespace Codec
}  // namespace OHOS