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
#ifndef HDC_HOST_UART_H
#define HDC_HOST_UART_H
#include <condition_variable>
#include "host_common.h"
#ifdef HOST_MINGW
#include "tchar.h"
#include "windows.h"
#include <setupapi.h>
#include <winnt.h>
#elif defined(HOST_LINUX)||defined(HOST_MAC)
#include <fcntl.h> // open close
#include <pthread.h>
#include <termios.h> // truct termios
#endif

namespace Hdc {
class HdcServer;

class HdcHostUART : public HdcUARTBase {
public:
    explicit HdcHostUART(HdcServer &, ExternInterface & = HdcUARTBase::defaultInterface);
    ~HdcHostUART();
    int Initial();
    virtual void Stop();
    HSession ConnectDaemonByUart(const HSession hSession,
                                 [[maybe_unused]] const HDaemonInfo = nullptr);

    // logic layer will free the session
    // all the thread maybe need exit if needed.
    void StopSession(HSession hSession) override;
    HSession ConnectDaemon(const std::string &connectKey);
    void SetCheckFlag(bool flag) { isCheck = flag; };

protected:
    virtual void OnTransferError(const HSession session) override;
    virtual HSession GetSession(const uint32_t sessionId, bool create) override;
    virtual void Restartession(const HSession session) override;

private:
    enum UartCheckStatus {
        HOST_UART_EMPTY = 0, // default value
        HOST_UART_IGNORE = 1,
        HOST_UART_READY,
        HOST_UART_REGISTER,
    };
    // review maybe merge to base ?
    virtual bool StartUartSendThread();
    virtual bool StartUartReadThread(HSession hSession);

    size_t SendUARTDev(HSession hSession, uint8_t *data, const size_t length);
    static inline void UvWatchUartDevPlugin(uv_timer_t *handle)
    {
        if (handle != nullptr) {
            HdcHostUART *thisClass = static_cast<HdcHostUART *>(handle->data);
            if (thisClass != nullptr) {
                thisClass->WatchUartDevPlugin();
                return;
            }
        }
        WRITE_LOG(LOG_FATAL, "%s have not got correct class parameter", __FUNCTION__);
    };
    virtual void WatchUartDevPlugin();
    void KickoutZombie(HSession hSession);
    virtual void UpdateUARTDaemonInfo(const std::string &connectKey, HSession hSession, ConnStatus connStatus);
    bool ConnectMyNeed(HUART hUART, std::string connectKey = "");
    virtual int OpenSerialPort(const std::string &portName = "");
    virtual void CloseSerialPort(const HUART hUART);
    virtual RetErrCode StartupUARTWork();

    // we use this function check if the uart read nothing in a timeout
    // if not , that means this uart maybe not our daemon
    // More importantly, the bootloader will output data. We use this to detect whether it is the
    // bootloader stage.
    virtual bool WaitUartIdle(HdcUART &uart, bool retry = true);
    virtual void SendUartSoftReset(HSession hSession, uint32_t sessionId) override;

    virtual bool EnumSerialPort(bool &portChange);
    virtual bool IsDeviceOpened(const HdcUART &uart);
    virtual bool NeedStop(const HSession hSession);
    virtual void UartReadThread(HSession hSession);
#ifdef HOST_MINGW
    int WinSetSerial(HUART hUART, string serialPort, int byteSize, int eqBaudRate);
    bool enumDetailsSerialPorts(bool *portChange);
    static constexpr uint8_t PORT_NAME_LEN = 10;
    static constexpr uint8_t PORT_NUM = 100;
#elif defined(HOST_LINUX)||defined(HOST_MAC)
    void EnumLinuxSerialPort(bool *PortStatusChange);
#endif
    virtual void UartWriteThread();

    uv_timer_t devUartWatcher;
    std::mutex semUartDevCheck;
    uint32_t baudRate = 0;
    const int intervalDevCheck = 3000;
    std::map<string, UartCheckStatus> mapIgnoreDevice;
    std::unordered_set<std::string> connectedPorts;
    std::vector<string> serialPortInfo;
    std::vector<string> serialPortRemoved;
    bool uartOpened = false;
    std::thread sendThread;
    bool isCheck = false;

    std::vector<std::string> StringSplit(std::string source, std::string split = ":");
    bool GetPortFromKey(const std::string &connectKey, std::string &portName, uint32_t &baudRate);
    HdcServer &server;
};
} // namespace Hdc
#endif
