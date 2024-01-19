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
#define HILOG_TAG "RingBuffer"

#include "ring_buffer.h"

namespace OHOS {
namespace Developtools {
namespace HiPerf {
RingBuffer::RingBuffer(size_t size) : size_(size)
{
    if (size > 0) {
        buf_ = std::make_unique<uint8_t[]>(size);
    }
}

RingBuffer::~RingBuffer() {}

// get size of the writable space
size_t RingBuffer::GetFreeSize() const
{
    return size_ - (head_.load(std::memory_order_relaxed) - tail_.load(std::memory_order_relaxed));
}

uint8_t *RingBuffer::AllocForWrite(size_t writeSize)
{
    size_t writeHead = head_.load(std::memory_order_relaxed);
    size_t readHead = tail_.load(std::memory_order_acquire);
    size_t writePos = writeHead % size_;
    size_t readPos = readHead % size_;
    writeSize_ = writeSize;
    if (writePos < readPos) {
        // |---writePos<---writeSize--->readPos---|
        if (writePos + writeSize > readPos) {
            return nullptr;
        }
    } else if (writePos == readPos and writeHead != readHead) {
        // writePos catch up with readPos, but buffer is full
        return nullptr;
    } else {
        // two cases: 1, writePos catch up with readPos, but buffer is empty
        //            2, |---readPos---writePos<---writeSize--->|
        if (writePos + writeSize > size_) {
            // no enough space at the end
            if (readPos < writeSize) {
                return nullptr;
            }
            // wrap to the start, set mark byte
            buf_.get()[writePos] = MARGIN_BYTE;
            writeSize_ += (size_ - writePos);
            writePos = 0;
        }
    }

    return buf_.get() + writePos;
}

void RingBuffer::EndWrite()
{
    size_t head = head_.load(std::memory_order_relaxed);
    head += writeSize_;
    head_.store(head, std::memory_order_release);
}

uint8_t *RingBuffer::GetReadData()
{
    size_t writeHead = head_.load(std::memory_order_acquire);
    size_t readHead = tail_.load(std::memory_order_relaxed);
    if (writeHead == readHead) {
        return nullptr;
    }

    readSize_ = 0;
    size_t writePos = writeHead % size_;
    size_t readPos = readHead % size_;
    if (writePos <= readPos) {
        // |<---data2--->writePos---readPos<---data1--->|
        if (buf_.get()[readPos] == MARGIN_BYTE) {
            if (writePos == 0) {
                return nullptr;
            }
            readSize_ = (size_ - readPos);
            readPos = 0;
        }
    }
    // else |---readPos<---data--->writePos---|
    perf_event_header *header = reinterpret_cast<perf_event_header *>(buf_.get() + readPos);
    readSize_ += header->size;
    return buf_.get() + readPos;
}

void RingBuffer::EndRead()
{
    size_t tail = tail_.load(std::memory_order_relaxed);
    tail += readSize_;
    tail_.store(tail, std::memory_order_release);
}
} // namespace HiPerf
} // namespace Developtools
} // namespace OHOS
