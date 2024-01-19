/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

#ifndef VIRTUALSREENIMPL_H
#define VIRTUALSREENIMPL_H

#include "VirtualScreen.h"

class VirtualScreenImpl : public VirtualScreen {
public:
    VirtualScreenImpl(const VirtualScreenImpl&) = delete;
    VirtualScreenImpl& operator=(const VirtualScreenImpl&) = delete;
    static VirtualScreenImpl& GetInstance();
    static void StartTimer();
    static bool LoadDocCallback(const void* data, const size_t length,
                                const int32_t width, const int32_t height);
    static bool CallBack(const void* data, const size_t length, const int32_t width, const int32_t height);
    static bool PageCallBack(const std::string currentRouterPath);
    static void FastPreviewCallBack(const std::string& jsonStr);
    void InitAll(std::string pipeName, std::string pipePort);

private:
    VirtualScreenImpl();
    ~VirtualScreenImpl();
    void Send(const void* data, int32_t retWidth, int32_t retHeight);
    bool SendPixmap(const void* data, size_t length, int32_t retWidth, int32_t retHeight);
    void FreeJpgMemory();
    template<class T, class = typename std::enable_if<std::is_integral<T>::value>::type>
    void WriteBuffer(const T data)
    {
        T dataToSend = EndianUtil::ToNetworkEndian<T>(data);
        unsigned char* startPos = reinterpret_cast<unsigned char*>(&dataToSend);
        std::copy(startPos, startPos + sizeof(dataToSend), screenBuffer + currentPos);
        currentPos += sizeof(dataToSend);
    }

    bool isFirstSend;
    bool isFirstRender;
    size_t writed;
    uint8_t* wholeBuffer;
    uint8_t* screenBuffer;
    uint64_t bufferSize;
    unsigned long long currentPos;
    static constexpr int SEND_IMG_DURATION_MS = 300;

    uint8_t* loadDocTempBuffer;
    uint8_t* loadDocCopyBuffer;
    size_t lengthTemp;
    int32_t widthTemp;
    int32_t heightTemp;
};

#endif // VIRTUALSREENIMPL_H
