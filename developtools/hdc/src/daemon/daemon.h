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
#ifndef HDC_DAEMON_H
#define HDC_DAEMON_H
#include "daemon_common.h"

namespace Hdc {
class HdcDaemon : public HdcSessionBase {
public:
#ifdef USE_CONFIG_UV_THREADS
    HdcDaemon(bool serverOrDaemonIn, size_t uvThreadSize = SIZE_THREAD_POOL);
#else
    HdcDaemon(bool serverOrDaemonIn);
#endif
    virtual ~HdcDaemon();
#ifdef HDC_SUPPORT_UART
    void InitMod(bool bEnableTCP, bool bEnableUSB, bool bEnableUART);
#else
    void InitMod(bool bEnableTCP, bool bEnableUSB);
#endif
    bool FetchCommand(HSession hSession, const uint32_t channelId, const uint16_t command, uint8_t *payload,
                      const int payloadSize) override;
    bool ServerCommand(const uint32_t sessionId, const uint32_t channelId, const uint16_t command, uint8_t *bufPtr,
                       const int size) override;
    void *clsTCPServ;
    void *clsUSBServ;
#ifdef HDC_SUPPORT_UART
    void *clsUARTServ;
#endif
    void *clsJdwp;

private:
    bool RemoveInstanceTask(const uint8_t op, HTaskInfo hTask) override;
    bool RedirectToTask(HTaskInfo hTaskInfo, HSession hSession, const uint32_t channelId, const uint16_t command,
                        uint8_t *payload, const int payloadSize) override;
    void JdwpNewFileDescriptor(const uint8_t *buf, const int bytesIO) override;
    bool HandDaemonAuth(HSession hSession, const uint32_t channelId, SessionHandShake &handshake);
    void ClearInstanceResource() override;
    bool DaemonSessionHandshake(HSession hSession, const uint32_t channelId, uint8_t *payload, int payloadSize);
    void TryStopInstance();
// deprecated, remove later
#ifdef HDC_SUPPORT_FLASHD
// null
#else
    void NotifyInstanceSessionFree(HSession hSession, bool freeOrClear) override;
#endif

    bool enableSecure;
};
}  // namespace Hdc
#endif
