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
#ifndef HDC_JDWP_H
#define HDC_JDWP_H
#include "daemon_common.h"
#include <poll.h>
#include <unordered_map>
namespace Hdc {
class HdcJdwp {
public:
    HdcJdwp(uv_loop_t *loopIn);
    virtual ~HdcJdwp();
    int Initial();
    void Stop();
    bool CreateJdwpTracker(HTaskInfo taskInfo);
    void RemoveJdwpTracker(HTaskInfo taskInfo);
    bool ReadyForRelease();
    string GetProcessList();
    bool SendJdwpNewFD(uint32_t targetPID, int fd);
    bool CheckPIDExist(uint32_t targetPID);

private:
#ifdef JS_JDWP_CONNECT
    static constexpr uint8_t JS_PKG_MIN_SIZE = 15;  // JsMsgHeader + "pkgName:"uint8_t[7~127]
    static constexpr uint8_t JS_PKG_MX_SIZE = 135;
    struct JsMsgHeader {
        uint32_t msgLen;
        uint32_t pid;
    };
    string GetProcessListExtendPkgName();
#endif // JS_JDWP_CONNECT
    struct _PollFd {
        int fd;
        short events;
        short revents;
    };
    struct PollNode {
        _PollFd pollfd;
        uint32_t ppid;
        PollNode(int fd, uint32_t pid)
        {
            Base::ZeroStruct(pollfd);
            pollfd.fd = fd;
            pollfd.events = POLLNVAL | POLLRDHUP | POLLHUP | POLLERR;
            pollfd.revents = 0;
            ppid = pid;
        }
    };
    struct ContextJdwp {
        uint32_t pid;
        uv_pipe_t pipe;
        HdcJdwp *thisClass;
        bool finish;
#ifdef JS_JDWP_CONNECT
        char buf[JS_PKG_MX_SIZE];
        string pkgName;
#else
        char buf[sizeof(uint32_t)];
#endif  // JS_JDWP_CONNECT
        uint8_t dummy;
        uv_tcp_t jvmTCP;
    };
    using HCtxJdwp = struct ContextJdwp *;

    bool JdwpListen();
    static int UvPipeBind(uv_pipe_t* handle, const char* name, size_t size);
    static void AcceptClient(uv_stream_t *server, int status);
    static void ReadStream(uv_stream_t *pipe, ssize_t nread, const uv_buf_t *buf);
    static void SendCallbackJdwpNewFD(uv_write_t *req, int status);
    static void *FdEventPollThread(void *args);
    void RemoveFdFromPollList(uint32_t pid);
    size_t JdwpProcessListMsg(char *buffer, size_t bufferlen);
    void *MallocContext();
    void FreeContext(HCtxJdwp ctx);
    void *AdminContext(const uint8_t op, const uint32_t pid, HCtxJdwp ctxJdwp);
    int CreateFdEventPoll();
    void ProcessListUpdated(HTaskInfo task = nullptr);
    void SendProcessList(HTaskInfo t, string data);
    void DrainAwakenPollThread() const;
    void WakePollThread();
    uv_loop_t *loop;
    uv_pipe_t listenPipe = {};
    uint32_t refCount;
    int32_t awakenPollFd;
    map<uint32_t, HCtxJdwp> mapCtxJdwp;
    uv_rwlock_t lockMapContext;
    uv_rwlock_t lockJdwpTrack;
    std::unordered_map<int, PollNode> pollNodeMap;  // fd, PollNode
    std::vector<HTaskInfo> jdwpTrackers;
    bool stop;
    std::mutex freeContextMutex;
};
} // namespace Hdc
#endif
