/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
#include "stream_plugin.h"
#include "securec.h"

#include <sys/syscall.h>
#include <sys/types.h>
#include <unistd.h>

StreamPlugin::StreamPlugin() {}

StreamPlugin::~StreamPlugin() {}

int StreamPlugin::Start(const uint8_t* configData, uint32_t configSize)
{
    // 反序列化
    if (protoConfig_.ParseFromArray(configData, configSize) <= 0) {
        HILOG_ERROR(LOG_CORE, "%s:parseFromArray failed!", __func__);
        return -1;
    }
    // 启动线程写数据
    std::unique_lock<std::mutex> locker(mutex_);
    running_ = true;
    writeThread_ = std::thread(&StreamPlugin::Loop, this);

    return 0;
}

int StreamPlugin::Stop()
{
    std::unique_lock<std::mutex> locker(mutex_);
    running_ = false;
    locker.unlock();
    if (writeThread_.joinable()) {
        writeThread_.join();
    }
    HILOG_INFO(LOG_CORE, "%s:stop success!", __func__);
    return 0;
}

int StreamPlugin::SetWriter(WriterStruct* writer)
{
    resultWriter_ = writer;
    return 0;
}

uint64_t StreamPlugin::GetTimeMS()
{
    const int MS_PER_S = 1000;
    const int NS_PER_MS = 1000000;
    struct timespec ts;
    clock_gettime(CLOCK_BOOTTIME, &ts);
    return ts.tv_sec * MS_PER_S + ts.tv_nsec / NS_PER_MS;
}

void StreamPlugin::Loop(void)
{
    HILOG_INFO(LOG_CORE, "%s:transporter thread %d start !!!!!", __func__, gettid());
    uint32_t index = 0;
    while (running_) {
        StreamData dataProto;
        dataProto.set_intdata(index);
        dataProto.set_stringdata(std::to_string(index));
        buffer_.resize(dataProto.ByteSizeLong());
        dataProto.SerializeToArray(buffer_.data(), buffer_.size());

        if (index < 50) {
            if (resultWriter_->write != nullptr) {
                resultWriter_->write(resultWriter_, buffer_.data(), buffer_.size());
                resultWriter_->flush(resultWriter_);
            }
        }
        index++;
    }
    resultWriter_->flush(resultWriter_);
    HILOG_INFO(LOG_CORE, "%s:transporter thread %d exit !!!!!", __func__, gettid());
}