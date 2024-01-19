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
#include "base.h"
#include <chrono>
#include <cstdio>
#include <cstring>
#include <openssl/bio.h>
#include <openssl/buffer.h>
#include <openssl/evp.h>
#include <openssl/md5.h>
#include <random>
#include <sstream>
#include <thread>
using namespace std::chrono;

namespace Hdc {
namespace Base {
    constexpr int DEF_FILE_PERMISSION = 0750;
    uint8_t GetLogLevel()
    {
        return g_logLevel;
    }
    std::atomic<bool> g_logCache = true;
    uint8_t g_logLevel = LOG_DEBUG;  // tmp set,now debugmode.LOG_OFF when release;;
    void SetLogLevel(const uint8_t logLevel)
    {
        g_logLevel = logLevel;
    }

// Commenting the code will optimize and tune all log codes, and the compilation volume will be greatly reduced
#define ENABLE_DEBUGLOG
#ifdef ENABLE_DEBUGLOG
    void GetLogDebugFunctionName(string &debugInfo, int line, string &threadIdString)
    {
        string tmpString = GetFileNameAny(debugInfo);
        debugInfo = StringFormat("%s:%d", tmpString.c_str(), line);
        if (g_logLevel < LOG_DEBUG) {
            debugInfo = "";
            threadIdString = "";
        } else {
            debugInfo = "[" + debugInfo + "]";
            threadIdString = StringFormat("[%x]", std::hash<std::thread::id> {}(std::this_thread::get_id()));
        }
    }

    bool IsWindowsSupportAnsiColor()
    {
#ifdef _WIN32
        // Set output mode to handle virtual terminal sequences
        HANDLE hOut = GetStdHandle(STD_OUTPUT_HANDLE);
        if (hOut == INVALID_HANDLE_VALUE) {
            return false;
        }
        DWORD dwMode = 0;
        if (!GetConsoleMode(hOut, &dwMode)) {
            return false;
        }
        dwMode |= ENABLE_VIRTUAL_TERMINAL_PROCESSING;
        if (!SetConsoleMode(hOut, dwMode)) {
            return false;
        }
#endif
        return true;
    }

    void GetLogLevelAndTime(uint8_t logLevel, string &logLevelString, string &timeString)
    {
        system_clock::time_point timeNow = system_clock::now();          // now time
        system_clock::duration sinceUnix0 = timeNow.time_since_epoch();  // since 1970
        time_t sSinceUnix0 = duration_cast<seconds>(sinceUnix0).count();
        std::tm *tim = std::localtime(&sSinceUnix0);
        bool enableAnsiColor = false;
#ifdef _WIN32
        enableAnsiColor = IsWindowsSupportAnsiColor();
#else
        enableAnsiColor = true;
#endif
        if (enableAnsiColor) {
            switch (logLevel) {
                case LOG_FATAL:
                    logLevelString = "\033[1;31mF\033[0m";
                    break;
                case LOG_INFO:
                    logLevelString = "\033[1;32mI\033[0m";
                    break;
                case LOG_WARN:
                    logLevelString = "\033[1;33mW\033[0m";
                    break;
                case LOG_DEBUG:  // will reduce performance
                    logLevelString = "\033[1;36mD\033[0m";
                    break;
                default:  // all, just more IO/Memory information
                    logLevelString = "\033[1;38;5;21mA\033[0m";
                    break;
            }
        } else {
            logLevelString = std::to_string(logLevel);
        }
        string msTimeSurplus;
        if (g_logLevel >= LOG_DEBUG) {
            const auto sSinceUnix0Rest = duration_cast<milliseconds>(sinceUnix0).count() % TIME_BASE;
            msTimeSurplus = StringFormat(".%03llu", sSinceUnix0Rest);
        }
        timeString = msTimeSurplus;
        if (tim != nullptr) {
            char buffer[TIME_BUF_SIZE];
            (void)strftime(buffer, TIME_BUF_SIZE, "%Y-%m-%d %H:%M:%S", tim);
            timeString = StringFormat("%s%s", buffer, msTimeSurplus.c_str());
        }
    }

    void LogToPath(const char *path, const char *str)
    {
        // logfile, not thread-safe
#ifdef HDC_DEBUG_UART
        // make a log path print.
        static std::once_flag firstLog;
        std::call_once(firstLog, [&]() { printf("log at %s\n", path); });
        // better than open log file every time.
        static std::unique_ptr<FILE, decltype(&fclose)> file(fopen(path, "w"), &fclose);
        FILE *fp = file.get();
        if (fp == nullptr) {
            return;
        }
        if (fprintf(fp, "%s", str) > 0 && fflush(fp)) {
            // make ci happy
        }
        fclose(fp);
#else
        int flags = UV_FS_O_RDWR | UV_FS_O_APPEND | UV_FS_O_CREAT;
        uv_fs_t req;
        int fd = uv_fs_open(nullptr, &req, path, flags, S_IWUSR | S_IRUSR, nullptr);
        if (fd < 0) {
            char buffer[BUF_SIZE_DEFAULT] = { 0 };
            uv_strerror_r((int)req.result, buffer, BUF_SIZE_DEFAULT);
            uv_fs_req_cleanup(&req);
            PrintMessage("LogToPath uv_fs_open %s error %s", path, buffer);
            return;
        }
        string text(str);
        uv_buf_t wbf = uv_buf_init((char *)str, text.size());
        uv_fs_req_cleanup(&req);
        uv_fs_write(nullptr, &req, fd, &wbf, 1, 0, nullptr);
        uv_fs_close(nullptr, &req, fd, nullptr);
#endif
    }

    void LogToFile(const char *str)
    {
        string path = GetTmpDir() + LOG_FILE_NAME;
        RollLogFile(path.c_str());
        LogToPath(path.c_str(), str);
    }

    void LogToCache(const char *str)
    {
        string path = GetTmpDir() + LOG_CACHE_NAME;
        LogToPath(path.c_str(), str);
    }

    void RollLogFile(const char *path)
    {
        int value = -1;
        uv_fs_t fs;
        value = uv_fs_stat(nullptr, &fs, path, nullptr);
        if (value != 0) {
            constexpr int bufSize = 1024;
            char buf[bufSize] = { 0 };
            uv_strerror_r(value, buf, bufSize);
            PrintMessage("RollLogFile error log file %s not exist %s", path, buf);
            return;
        }
        uint64_t size = fs.statbuf.st_size;
        if (size < LOG_FILE_MAX_SIZE) {
            return;
        }
        string last = StringFormat("%s.%d", path, 0);
        value = uv_fs_unlink(nullptr, &fs, last.c_str(), nullptr);
        if (value != 0) {
            constexpr int bufSize = 1024;
            char buf[bufSize] = { 0 };
            uv_strerror_r(value, buf, bufSize);
            PrintMessage("RollLogFile error unlink last:%s %s", last.c_str(), buf);
        }
        value = uv_fs_rename(nullptr, &fs, path, last.c_str(), nullptr);
        if (value != 0) {
            constexpr int bufSize = 1024;
            char buf[bufSize] = { 0 };
            uv_strerror_r(value, buf, bufSize);
            PrintMessage("RollLogFile error rename %s to %s %s", path, last.c_str(), buf);
        }
    }

    void PrintLogEx(const char *functionName, int line, uint8_t logLevel, const char *msg, ...)
    {
        if (logLevel > g_logLevel) {
            return;
        }
        string debugInfo;
        string logBuf;
        string logLevelString;
        string threadIdString;
        string sep = "\n";
        string timeString;

        va_list vaArgs;
        va_start(vaArgs, msg);
        string logDetail = Base::StringFormat(msg, vaArgs);
        va_end(vaArgs);
        if (logDetail.back() == '\n') {
            sep = "\r\n";
        }
        debugInfo = functionName;
        GetLogDebugFunctionName(debugInfo, line, threadIdString);
        GetLogLevelAndTime(logLevel, logLevelString, timeString);
        logBuf = StringFormat("[%s][%s]%s%s %s%s", logLevelString.c_str(), timeString.c_str(), threadIdString.c_str(),
                              debugInfo.c_str(), logDetail.c_str(), sep.c_str());

        printf("%s", logBuf.c_str());
        fflush(stdout);

        if (!g_logCache) {
            LogToFile(logBuf.c_str());
        } else {
            LogToCache(logBuf.c_str());
        }

        return;
    }
#else   // else ENABLE_DEBUGLOG.If disabled, the entire output code will be optimized by the compiler
    void PrintLogEx(uint8_t logLevel, char *msg, ...)
    {
    }
#endif  // ENABLE_DEBUGLOG

    void PrintMessage(const char *fmt, ...)
    {
        va_list ap;
        va_start(ap, fmt);
        if (vfprintf(stdout, fmt, ap) > 0) {
            fprintf(stdout, "\n");
        }
        va_end(ap);
    }

    // if can linkwith -lstdc++fs, use std::filesystem::path(path).filename();
    string GetFileNameAny(string &path)
    {
        string tmpString = path;
        size_t tmpNum = tmpString.rfind('/');
        if (tmpNum == std::string::npos) {
            tmpNum = tmpString.rfind('\\');
            if (tmpNum == std::string::npos) {
                return tmpString;
            }
        }
        tmpString = tmpString.substr(tmpNum + 1, tmpString.size() - tmpNum);
        return tmpString;
    }

    void SetTcpOptions(uv_tcp_t *tcpHandle)
    {
        if (!tcpHandle) {
            return;
        }
        uv_tcp_keepalive(tcpHandle, 1, GLOBAL_TIMEOUT);
        // if MAX_SIZE_IOBUF==5k,bufMaxSize at least 40k. It must be set to io 8 times is more appropriate,
        // otherwise asynchronous IO is too fast, a lot of IO is wasted on IOloop, transmission speed will decrease
        int bufMaxSize = HDC_SOCKETPAIR_SIZE;
        uv_recv_buffer_size((uv_handle_t *)tcpHandle, &bufMaxSize);
        uv_send_buffer_size((uv_handle_t *)tcpHandle, &bufMaxSize);
    }

    void ReallocBuf(uint8_t **origBuf, int *nOrigSize, size_t sizeWanted)
    {
        if (*nOrigSize > 0)
            return;
        if (sizeWanted <= 0 || sizeWanted >= HDC_BUF_MAX_BYTES) {
            WRITE_LOG(LOG_WARN, "ReallocBuf failed, sizeWanted:%d", sizeWanted);
            return;
        }
        *origBuf = new uint8_t[sizeWanted];
        if (!*origBuf)
            return;
        *nOrigSize = sizeWanted;
    }

    // As an uv_alloc_cb it must keep the same as prototype
    void AllocBufferCallback(uv_handle_t *handle, size_t sizeSuggested, uv_buf_t *buf)
    {
        const int size = GetMaxBufSize();
        buf->base = (char *)new uint8_t[size]();
        if (buf->base) {
            buf->len = size - 1;
        }
    }

    // As an uv_write_cb it must keep the same as prototype
    void SendCallback(uv_write_t *req, int status)
    {
        if (status < 0) {
            constexpr int bufSize = 1024;
            char buf[bufSize] = { 0 };
            uv_strerror_r(status, buf, bufSize);
            WRITE_LOG(LOG_WARN, "SendCallback failed,status:%d %s", status, buf);
        }
        delete[]((uint8_t *)req->data);
        delete req;
    }

    // xxx must keep sync with uv_loop_close/uv_walk etc.
    bool TryCloseLoop(uv_loop_t *ptrLoop, const char *callerName)
    {
        // UV_RUN_DEFAULT: Runs the event loop until the reference count drops to zero. Always returns zero.
        // UV_RUN_ONCE:    Poll for new events once. Note that this function blocks if there are no pending events.
        //                 Returns zero when done (no active handles or requests left), or non-zero if more events are
        //                 expected meaning you should run the event loop again sometime in the future).
        // UV_RUN_NOWAIT:  Poll for new events once but don't block if there are no pending events.
        uint8_t closeRetry = 0;
        bool ret = false;
        constexpr int maxRetry = 3;
        for (closeRetry = 0; closeRetry < maxRetry; ++closeRetry) {
            if (uv_loop_close(ptrLoop) == UV_EBUSY) {
                if (closeRetry > 2) {
                    WRITE_LOG(LOG_WARN, "%s close busy,try:%d", callerName, closeRetry);
                }

                if (ptrLoop->active_handles >= 2) {
                    WRITE_LOG(LOG_DEBUG, "TryCloseLoop issue");
                }
                auto clearLoopTask = [](uv_handle_t *handle, void *arg) -> void { TryCloseHandle(handle); };
                uv_walk(ptrLoop, clearLoopTask, nullptr);
                // If all processing ends, Then return0,this call will block
                if (!ptrLoop->active_handles) {
                    ret = true;
                    break;
                }
                if (!uv_run(ptrLoop, UV_RUN_ONCE)) {
                    ret = true;
                    break;
                }
            } else {
                ret = true;
                break;
            }
        }
        return ret;
    }

    // Some handles may not be initialized or activated yet or have been closed, skip the closing process
    void TryCloseHandle(const uv_handle_t *handle)
    {
        TryCloseHandle(handle, nullptr);
    }

    void TryCloseHandle(const uv_handle_t *handle, uv_close_cb closeCallBack)
    {
        TryCloseHandle(handle, false, closeCallBack);
    }

    void TryCloseHandle(const uv_handle_t *handle, bool alwaysCallback, uv_close_cb closeCallBack)
    {
        bool hasCallClose = false;
        if (handle->loop && !uv_is_closing(handle)) {
            uv_close((uv_handle_t *)handle, closeCallBack);
            hasCallClose = true;
        }
        if (!hasCallClose && alwaysCallback) {
            closeCallBack((uv_handle_t *)handle);
        }
    }

    int SendToStream(uv_stream_t *handleStream, const uint8_t *buf, const int bufLen)
    {
        if (bufLen > static_cast<int>(HDC_BUF_MAX_BYTES)) {
            return ERR_BUF_ALLOC;
        }
        uint8_t *pDynBuf = new uint8_t[bufLen];
        if (!pDynBuf) {
            WRITE_LOG(LOG_WARN, "SendToStream, alloc failed, size:%d", bufLen);
            return ERR_BUF_ALLOC;
        }
        if (memcpy_s(pDynBuf, bufLen, buf, bufLen)) {
            WRITE_LOG(LOG_WARN, "SendToStream, memory copy failed, size:%d", bufLen);
            delete[] pDynBuf;
            return ERR_BUF_COPY;
        }
        return SendToStreamEx(handleStream, pDynBuf, bufLen, nullptr, (void *)SendCallback, (void *)pDynBuf);
    }

    // handleSend is used for pipe thread sending, set nullptr for tcp, and dynamically allocated by malloc when buf
    // is required
    int SendToStreamEx(uv_stream_t *handleStream, const uint8_t *buf, const int bufLen, uv_stream_t *handleSend,
                       const void *finishCallback, const void *pWriteReqData)
    {
        int ret = ERR_GENERIC;
        uv_write_t *reqWrite = new uv_write_t();
        if (!reqWrite) {
            WRITE_LOG(LOG_WARN, "SendToStreamEx, new write_t failed, size:%d", bufLen);
            return ERR_BUF_ALLOC;
        }
        uv_buf_t bfr;
        while (true) {
            reqWrite->data = (void *)pWriteReqData;
            bfr.base = (char *)buf;
            bfr.len = bufLen;
            if (!uv_is_writable(handleStream)) {
                WRITE_LOG(LOG_WARN, "SendToStreamEx, uv_is_writable false, size:%d", bufLen);
                delete reqWrite;
                break;
            }
#ifdef HDC_DEBUG
            WRITE_LOG(LOG_ALL, "SendToStreamEx %p, uv_write %p:%p, size:%lu", handleStream,
                      reqWrite, reqWrite->data, bfr.len);
#endif
            // handleSend must be a TCP socket or pipe, which is a server or a connection (listening or
            // connected state). Bound sockets or pipes will be assumed to be servers.
            if (handleSend) {
                ret = uv_write2(reqWrite, handleStream, &bfr, 1, handleSend, (uv_write_cb)finishCallback);
            } else {
                ret = uv_write(reqWrite, handleStream, &bfr, 1, (uv_write_cb)finishCallback);
            }
            if (ret < 0) {
                WRITE_LOG(LOG_WARN, "SendToStreamEx, uv_write false, size:%d", bufLen);
                delete reqWrite;
                ret = ERR_IO_FAIL;
                break;
            }
            ret = bufLen;
            break;
        }
        return ret;
    }

    uint64_t GetRuntimeMSec()
    {
        struct timespec times = { 0, 0 };
        long time;
        clock_gettime(CLOCK_MONOTONIC, &times);
        time = times.tv_sec * TIME_BASE + times.tv_nsec / (TIME_BASE * TIME_BASE);
        return time;
    }

    uint64_t GetRandom(const uint64_t min, const uint64_t max)
    {
#ifdef HARMONY_PROJECT
        uint64_t ret;
        uv_random(nullptr, nullptr, &ret, sizeof(ret), 0, nullptr);
#else
        uint64_t ret;
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<uint64_t> dis(min, max);
        ret = dis(gen);
#endif
        return ret;
    }

    string GetRandomString(const uint16_t expectedLen)
    {
        srand(static_cast<unsigned int>(GetRandom()));
        string ret = string(expectedLen, '0');
        std::stringstream val;
        for (auto i = 0; i < expectedLen; ++i) {
            val << std::hex << (rand() % BUF_SIZE_MICRO);
        }
        ret = val.str();
        return ret;
    }

    int GetRandomNum(const int min, const int max)
    {
        return static_cast<int>(GetRandom(min, max));
    }

    int ConnectKey2IPPort(const char *connectKey, char *outIP, uint16_t *outPort)
    {
        char bufString[BUF_SIZE_TINY] = "";
        if (strncpy_s(bufString, sizeof(bufString), connectKey, strlen(connectKey))) {
            return ERR_BUF_COPY;
        }
        char *p = strrchr(bufString, ':');
        if (!p) {
            return ERR_PARM_FORMAT;
        }
        *p = '\0';
        if (!strlen(bufString) || strlen(bufString) > 40) { // 40 : bigger than length of ipv6
            return ERR_PARM_SIZE;
        }
        uint16_t wPort = static_cast<uint16_t>(atoi(p + 1));
        if (EOK != strcpy_s(outIP, BUF_SIZE_TINY, bufString)) {
            return ERR_BUF_COPY;
        }
        *outPort = wPort;
        return RET_SUCCESS;
    }

    // After creating the session worker thread, execute it on the main thread
    void FinishWorkThread(uv_work_t *req, int status)
    {
        // This is operated in the main thread
        delete req;
    }

    // at the finish of pFuncAfterThread must free uv_work_t*
    // clang-format off
    int StartWorkThread(uv_loop_t *loop, uv_work_cb pFuncWorkThread,
                        uv_after_work_cb pFuncAfterThread, void *pThreadData)
    {
        uv_work_t *workThread = new uv_work_t();
        if (!workThread) {
            return -1;
        }
        workThread->data = pThreadData;
        uv_queue_work(loop, workThread, pFuncWorkThread, pFuncAfterThread);
        return 0;
    }
    // clang-format on

    char **SplitCommandToArgs(const char *cmdStringLine, int *slotIndex)
    {
        constexpr int extraBufSize = 2;
        char **argv;
        char *temp = nullptr;
        int argc = 0;
        char a = 0;
        size_t i = 0;
        size_t j = 0;
        size_t len = 0;
        bool isQuoted = false;
        bool isText = false;
        bool isSpace = false;

        len = strlen(cmdStringLine);
        if (len < 1) {
            return nullptr;
        }
        i = ((len + extraBufSize) / extraBufSize) * sizeof(void *) + sizeof(void *);
        argv = reinterpret_cast<char **>(new(std::nothrow) char[i + (len + extraBufSize) * sizeof(char)]);
        if (argv == nullptr) {
            WRITE_LOG(LOG_FATAL, "SplitCommandToArgs new argv failed");
            return nullptr;
        }
        temp = reinterpret_cast<char *>((reinterpret_cast<uint8_t *>(argv)) + i);
        argc = 0;
        argv[argc] = temp;
        isQuoted = false;
        isText = false;
        isSpace = true;
        i = 0;
        j = 0;

        while ((a = cmdStringLine[i]) != 0) {
            if (isQuoted) {
                if (a == '\"') {
                    isQuoted = false;
                } else {
                    temp[j] = a;
                    ++j;
                }
            } else {
                switch (a) {
                    case '\"':
                        isQuoted = true;
                        isText = true;
                        if (isSpace) {
                            argv[argc] = temp + j;
                            ++argc;
                        }
                        isSpace = false;
                        break;
                    case ' ':
                    case '\t':
                    case '\n':
                    case '\r':
                        if (isText) {
                            temp[j] = '\0';
                            ++j;
                        }
                        isText = false;
                        isSpace = true;
                        break;
                    default:
                        isText = true;
                        if (isSpace) {
                            argv[argc] = temp + j;
                            ++argc;
                        }
                        temp[j] = a;
                        ++j;
                        isSpace = false;
                        break;
                }
            }
            ++i;
        }
        temp[j] = '\0';
        argv[argc] = nullptr;

        (*slotIndex) = argc;
        return argv;
    }

    bool RunPipeComand(const char *cmdString, char *outBuf, uint16_t sizeOutBuf, bool ignoreTailLf)
    {
        FILE *pipeHandle = popen(cmdString, "r");
        if (pipeHandle == nullptr) {
            return false;
        }
        int bytesRead = 0;
        int bytesOnce = 0;
        while (!feof(pipeHandle)) {
            bytesOnce = fread(outBuf, 1, sizeOutBuf - bytesRead, pipeHandle);
            if (bytesOnce <= 0) {
                break;
            }
            bytesRead += bytesOnce;
        }
        if (bytesRead && ignoreTailLf) {
            if (outBuf[bytesRead - 1] == '\n') {
                outBuf[bytesRead - 1] = '\0';
            }
        }
        pclose(pipeHandle);
        return bytesRead;
    }

    // bufLen == 0: alloc buffer in heap, need free it later
    // >0: read max nBuffLen bytes to *buff
    // ret value: <0 or bytes read
    int ReadBinFile(const char *pathName, void **buf, const size_t bufLen)
    {
        uint8_t *pDst = nullptr;
        size_t byteIO = 0;
        uv_fs_t req;
        int ret = uv_fs_stat(nullptr, &req, pathName, nullptr);
        if (ret < 0) {
            char buffer[BUF_SIZE_DEFAULT] = { 0 };
            uv_strerror_r((int)req.result, buffer, BUF_SIZE_DEFAULT);
            uv_fs_req_cleanup(&req);
            WRITE_LOG(LOG_FATAL, "ReadBinFile uv_fs_stat %s error %s", pathName, buffer);
            return -1;
        }
        size_t nFileSize = req.statbuf.st_size;
        size_t readMax = 0;
        uint8_t dynamicBuf = 0;
        ret = -3;
        if (bufLen == 0) {
            dynamicBuf = 1;
            pDst = new uint8_t[nFileSize + 1]();  // tail \0
            if (!pDst) {
                return -1;
            }
            readMax = nFileSize;
        } else {
            if (nFileSize > bufLen) {
                return -2;
            }
            readMax = nFileSize;
            pDst = reinterpret_cast<uint8_t *>(buf);  // The first address of the static array is the array address
        }

        string srcPath(pathName);
        string resolvedPath = CanonicalizeSpecPath(srcPath);
        uv_buf_t rbf = uv_buf_init((char *)pDst, readMax);
        uv_fs_req_cleanup(&req);
        int fd = uv_fs_open(nullptr, &req, resolvedPath.c_str(), O_RDONLY, 0, nullptr);
        if (fd < 0) {
            char buffer[BUF_SIZE_DEFAULT] = { 0 };
            uv_strerror_r((int)req.result, buffer, BUF_SIZE_DEFAULT);
            WRITE_LOG(LOG_FATAL, "ReadBinFile uv_fs_open %s error %s", resolvedPath.c_str(), buffer);
            goto ReadFileFromPath_Finish;
        }
        uv_fs_req_cleanup(&req);
        byteIO = uv_fs_read(nullptr, &req, fd, &rbf, 1, 0, nullptr);
        uv_fs_close(nullptr, nullptr, fd, nullptr);
        if (byteIO != readMax) {
            char buffer[BUF_SIZE_DEFAULT] = { 0 };
            uv_strerror_r((int)req.result, buffer, BUF_SIZE_DEFAULT);
            WRITE_LOG(LOG_FATAL, "ReadBinFile uv_fs_read %s error %s byteIO:%llu readMax:%llu",
                resolvedPath.c_str(), buffer, byteIO, readMax);
            goto ReadFileFromPath_Finish;
        }
        ret = 0;
    ReadFileFromPath_Finish:
        if (ret) {
            if (dynamicBuf) {
                delete[] pDst;
            }
        } else {
            if (dynamicBuf) {
                *buf = pDst;
            }
            ret = byteIO;
        }
        return ret;
    }

    int WriteBinFile(const char *pathName, const uint8_t *buf, const size_t bufLen, bool newFile)
    {
        string resolvedPath;
        string srcPath(pathName);
        int flags = 0;
        if (newFile) {
            flags = UV_FS_O_RDWR | UV_FS_O_CREAT | UV_FS_O_TRUNC;
            // no std::fs supoort, else std::filesystem::canonical,-lstdc++fs
            if (srcPath.find("..") != string::npos) {
                return ERR_FILE_PATH_CHECK;
            }
            resolvedPath = srcPath.c_str();
        } else {
            flags = UV_FS_O_RDWR | UV_FS_O_CREAT | UV_FS_O_APPEND;
            resolvedPath = CanonicalizeSpecPath(srcPath);
        }
        uv_fs_t req;
        int fd = uv_fs_open(nullptr, &req, resolvedPath.c_str(), flags, S_IWUSR | S_IRUSR, nullptr);
        if (fd < 0) {
            char buffer[BUF_SIZE_DEFAULT] = { 0 };
            uv_strerror_r((int)req.result, buffer, BUF_SIZE_DEFAULT);
            uv_fs_req_cleanup(&req);
            WRITE_LOG(LOG_FATAL, "WriteBinFile uv_fs_open %s error %s", resolvedPath.c_str(), buffer);
            return ERR_FILE_OPEN;
        }
        uv_buf_t wbf = uv_buf_init((char *)buf, bufLen);
        uv_fs_req_cleanup(&req);
        size_t bytesDone = uv_fs_write(nullptr, &req, fd, &wbf, 1, 0, nullptr);
        uv_fs_close(nullptr, &req, fd, nullptr);
        if (bytesDone != bufLen) {
            char buffer[BUF_SIZE_DEFAULT] = { 0 };
            uv_strerror_r((int)req.result, buffer, BUF_SIZE_DEFAULT);
            uv_fs_req_cleanup(&req);
            WRITE_LOG(LOG_FATAL, "WriteBinFile uv_fs_write %s error %s bytesDone:%llu bufLen:%llu",
                resolvedPath.c_str(), buffer, bytesDone, bufLen);
            return ERR_BUF_SIZE;
        }
        return RET_SUCCESS;
    }

    void CloseIdleCallback(uv_handle_t *handle)
    {
        delete (uv_idle_t *)handle;
    };

    void CloseTimerCallback(uv_handle_t *handle)
    {
        delete (uv_timer_t *)handle;
    };

    // return value: <0 error; 0 can start new server instance; >0 server already exists
    int ProgramMutex(const char *procname, bool checkOrNew)
    {
        char bufPath[BUF_SIZE_DEFAULT] = "";
        char buf[BUF_SIZE_DEFAULT] = "";
        char pidBuf[BUF_SIZE_TINY] = "";
        size_t size = sizeof(buf);
        if (uv_os_tmpdir(buf, &size) < 0) {
            WRITE_LOG(LOG_FATAL, "Tmppath failed");
            return ERR_API_FAIL;
        }
        if (snprintf_s(bufPath, sizeof(bufPath), sizeof(bufPath) - 1, "%s%c.%s.pid", buf, Base::GetPathSep(), procname)
            < 0) {
            return ERR_BUF_OVERFLOW;
        }
        int pid = static_cast<int>(getpid());
        if (snprintf_s(pidBuf, sizeof(pidBuf), sizeof(pidBuf) - 1, "%d", pid) < 0) {
            return ERR_BUF_OVERFLOW;
        }
        // no need to CanonicalizeSpecPath, else not work
        umask(0);
        uv_fs_t req;
        int fd = uv_fs_open(nullptr, &req, bufPath, O_RDWR | O_CREAT, 0666, nullptr);  // 0666:permission
        if (fd < 0) {
            char buffer[BUF_SIZE_DEFAULT] = { 0 };
            uv_strerror_r((int)req.result, buffer, BUF_SIZE_DEFAULT);
            uv_fs_req_cleanup(&req);
            WRITE_LOG(LOG_FATAL, "Open mutex file %s failed!!! %s", bufPath, buffer);
            return ERR_FILE_OPEN;
        }
#ifdef _WIN32
        if (snprintf_s(buf, sizeof(buf), sizeof(buf) - 1, "Global\\%s", procname) < 0) {
            uv_fs_close(nullptr, &req, fd, nullptr);
            return ERR_BUF_OVERFLOW;
        }
        HANDLE hMutex = CreateMutex(nullptr, FALSE, buf);
        DWORD dwError = GetLastError();
        if (ERROR_ALREADY_EXISTS == dwError || ERROR_ACCESS_DENIED == dwError) {
            uv_fs_close(nullptr, &req, fd, nullptr);
            WRITE_LOG(LOG_DEBUG, "File \"%s\" locked. proc already exit!!!\n", procname);
            return 1;
        }
        if (checkOrNew) {
            CloseHandle(hMutex);
        }
#else
        struct flock fl;
        fl.l_type = F_WRLCK;
        fl.l_start = 0;
        fl.l_whence = SEEK_SET;
        fl.l_len = 0;
        int retChild = fcntl(fd, F_SETLK, &fl);
        if (-1 == retChild) {
            WRITE_LOG(LOG_DEBUG, "File \"%s\" locked. proc already exit!!!\n", bufPath);
            uv_fs_close(nullptr, &req, fd, nullptr);
            return 1;
        }
#endif
        int rc = 0;
        uv_fs_req_cleanup(&req);
        rc = uv_fs_ftruncate(nullptr, &req, fd, 0, nullptr);
        if (rc == -1) {
            char buffer[BUF_SIZE_DEFAULT] = { 0 };
            uv_strerror_r((int)req.result, buffer, BUF_SIZE_DEFAULT);
            uv_fs_close(nullptr, &req, fd, nullptr);
            WRITE_LOG(LOG_FATAL, "ftruncate file %s failed!!! %s", bufPath, buffer);
            return ERR_FILE_STAT;
        }
        uv_buf_t wbf = uv_buf_init(pidBuf, strlen(pidBuf));
        uv_fs_req_cleanup(&req);
        rc = uv_fs_write(nullptr, &req, fd, &wbf, 1, 0, nullptr);
        if (rc == -1) {
            char buffer[BUF_SIZE_DEFAULT] = { 0 };
            uv_strerror_r((int)req.result, buffer, BUF_SIZE_DEFAULT);
            uv_fs_close(nullptr, &req, fd, nullptr);
            WRITE_LOG(LOG_FATAL, "write file %s failed!!! %s", bufPath, buffer);
            return ERR_FILE_WRITE;
        }
        WRITE_LOG(LOG_DEBUG, "Write mutext to %s, pid:%s", bufPath, pidBuf);
        if (checkOrNew) {
            // close it for check only
            uv_fs_close(nullptr, &req, fd, nullptr);
        }
        // Do not close the file descriptor, the process will be mutext effect under no-Win32 OS
        return RET_SUCCESS;
    }

    void SplitString(const string &origString, const string &seq, vector<string> &resultStrings)
    {
        string::size_type p1 = 0;
        string::size_type p2 = origString.find(seq);

        while (p2 != string::npos) {
            if (p2 == p1) {
                ++p1;
                p2 = origString.find(seq, p1);
                continue;
            }
            resultStrings.push_back(origString.substr(p1, p2 - p1));
            p1 = p2 + seq.size();
            p2 = origString.find(seq, p1);
        }

        if (p1 != origString.size()) {
            resultStrings.push_back(origString.substr(p1));
        }
    }

    string GetShellPath()
    {
        struct stat filecheck;
        string shellPath = "/bin/sh";
        if (stat(shellPath.c_str(), &filecheck) < 0) {
            shellPath = "/system/bin/sh";
            if (stat(shellPath.c_str(), &filecheck) < 0) {
                shellPath = "sh";
            }
        }
        return shellPath;
    }

    // Not supported on some platforms, Can only be achieved manually
    uint64_t HostToNet(uint64_t val)
    {
        if (htonl(1) == 1) {
            return val;
        }
        return ((static_cast<uint64_t>(htonl(val))) << 32) + htonl(val >> 32);
    }

    uint64_t NetToHost(uint64_t val)
    {
        if (htonl(1) == 1) {
            return val;
        }
        return ((static_cast<uint64_t>(ntohl(val))) << 32) + ntohl(val >> 32);
    }

    char GetPathSep()
    {
#ifdef _WIN32
        const char sep = '\\';
#else
        const char sep = '/';
#endif
        return sep;
    }

    string GetFullFilePath(string &s)
    {  // cannot use s.rfind(std::filesystem::path::preferred_separator
        // remove last sep, and update input
        while (s.back() == GetPathSep()) {
            s.pop_back();
        }

        size_t i = s.rfind(GetPathSep(), s.length());
        if (i != string::npos) {
            return (s.substr(i + 1, s.length() - i));
        }
        return s;
    }

    string GetPathWithoutFilename(const string &s)
    {
        size_t i = s.rfind(GetPathSep(), s.length());
        if (i != string::npos) {
            return (s.substr(0, i + 1));
        }
        return s;
    }

    int CreateSocketPair(int *fds)
    {
#ifndef _WIN32
#ifdef HOST_MAC
        int ret = socketpair(AF_UNIX, SOCK_STREAM, 0, fds);
        if (ret == 0) {
            for (auto i = 0; i < 2; ++i) {
                if (fcntl(fds[i], F_SETFD, FD_CLOEXEC) == -1) {
                    CloseFd(fds[0]);
                    CloseFd(fds[1]);
                    constexpr int bufSize = 1024;
                    char buf[bufSize] = { 0 };
                    strerror_r(errno, buf, bufSize);
                    WRITE_LOG(LOG_WARN, "fcntl failed to set FD_CLOEXEC: %s", buf);
                    return -1;
                }
            }
        }
        return ret;
#else
        return socketpair(AF_UNIX, SOCK_STREAM | SOCK_CLOEXEC, 0, fds);
#endif
#else
        struct sockaddr_in addr;
        socklen_t addrlen = sizeof(addr);
        int reuse = 1;
        if (fds == 0) {
            return -1;
        }
        int listener = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
        if (listener == -1) {
            return -2;
        }
        Base::ZeroStruct(addr);
        addr.sin_family = AF_INET;
        addr.sin_addr.s_addr = htonl(INADDR_LOOPBACK);
        addr.sin_port = 0;
        fds[0] = fds[1] = (int)-1;
        do {
            if (setsockopt(listener, SOL_SOCKET, SO_REUSEADDR, (char *)&reuse, (socklen_t)sizeof(reuse))) {
                break;
            }
            if (::bind(listener, (struct sockaddr *)&addr, sizeof(addr))) {
                break;
            }
            if (getsockname(listener, (struct sockaddr *)&addr, &addrlen)) {
                break;
            }
            if (listen(listener, 1)) {
                break;
            }
            fds[0] = socket(AF_INET, SOCK_STREAM, 0);
            if (fds[0] == -1) {
                break;
            }
            if (connect(fds[0], (struct sockaddr *)&addr, sizeof(addr)) == -1) {
                break;
            }
            fds[1] = accept(listener, nullptr, nullptr);
            if (fds[1] == -1) {
                break;
            }
            closesocket(listener);
            return 0;
        } while (0);

        closesocket(listener);
        closesocket(fds[0]);
        closesocket(fds[1]);
        return -1;
#endif
    }

    void CloseSocketPair(int *fds)
    {
#ifndef _WIN32
        CloseFd(fds[0]);
        CloseFd(fds[1]);
#else
        closesocket(fds[0]);
        closesocket(fds[1]);
#endif
    }

    int StringEndsWith(string s, string sub)
    {
        return s.rfind(sub) == (s.length() - sub.length()) ? 1 : 0;
    }

    const char *GetFileType(mode_t mode)
    {
        switch (mode & S_IFMT) {
            case S_IFDIR:
                return "directory";
            case S_IFLNK:
                return "symlink";
            case S_IFREG:
                return "regular file";
#ifndef _WIN32
            case S_IFBLK:
                return "block device";
            case S_IFCHR:
                return "character device";
            case S_IFIFO:
                return "FIFO/pipe";
            case S_IFSOCK:
                return "socket";
#endif
            default:
                return "Unknown";
        }
    }

    void BuildErrorString(const char *localPath, const char *op, const char *err, string &str)
    {
        // avoid to use stringstream
        str = op;
        str += " ";
        str += localPath;
        str += " failed, ";
        str += err;
    }

    // Both absolute and relative paths support
    bool CheckDirectoryOrPath(const char *localPath, bool pathOrDir, bool readWrite, string &errStr, mode_t &fm)
    {
        if (pathOrDir) {  // filepath
            uv_fs_t req;
            mode_t mode;
            fm = mode_t(~S_IFMT);
            int r = uv_fs_lstat(nullptr, &req, localPath, nullptr);
            if (r) {
                constexpr int bufSize = 1024;
                char buf[bufSize] = { 0 };
                uv_strerror_r((int)req.result, buf, bufSize);
                BuildErrorString(localPath, "lstat", buf, errStr);
            }

            mode = req.statbuf.st_mode;
            uv_fs_req_cleanup(&req);

            if ((r == 0) && (mode & S_IFDIR)) {
                fm = S_IFDIR;
            } else if ((r == 0) && (mode & S_IFREG)) {  // is file
                uv_fs_access(nullptr, &req, localPath, readWrite ? R_OK : W_OK, nullptr);
                if (req.result) {
                    const char *op = readWrite ? "access R_OK" : "access W_OK";
                    constexpr int bufSize = 1024;
                    char buf[bufSize] = { 0 };
                    uv_strerror_r((int)req.result, buf, bufSize);
                    BuildErrorString(localPath, op, buf, errStr);
                }
                uv_fs_req_cleanup(&req);
                if (req.result == 0) {
                    return true;
                }
            } else if (r == 0) {
                const char *type = GetFileType(mode);
                errStr = "Not support ";
                errStr += type;
                errStr += ": ";
                errStr += localPath;
            }
        } else {  // dir
            errStr = "Not support dir: ";
            errStr += localPath;
        }
        return false;
    }

    bool TryCreateDirectory(const string &path, string &err)
    {
        uv_fs_t req;
        WRITE_LOG(LOG_DEBUG, "TryCreateDirectory path = %s", path.c_str());
        int r = uv_fs_lstat(nullptr, &req, path.c_str(), nullptr);
        mode_t mode = req.statbuf.st_mode;
        uv_fs_req_cleanup(&req);
        if (r < 0) {
            WRITE_LOG(LOG_DEBUG, "path not exist create dir = %s", path.c_str());
            r = uv_fs_mkdir(nullptr, &req, path.c_str(), DEF_FILE_PERMISSION, nullptr);
            uv_fs_req_cleanup(&req);
            if (r < 0) {
                WRITE_LOG(LOG_WARN, "create dir %s failed", path.c_str());
                err = "Error create directory, path:";
                err += path.c_str();
                return false;
            }
        } else {
            if (!((mode & S_IFMT) == S_IFDIR)) {
                WRITE_LOG(LOG_WARN, "%s exist, not directory", path.c_str());
                err = "Not a directoty, path:";
                err += path.c_str();
                return false;
            }
        }
        return true;
    }

    bool CheckDirectoryOrPath(const char *localPath, bool pathOrDir, bool readWrite)
    {
        string strUnused;
        mode_t mode = mode_t(~S_IFMT);
        return CheckDirectoryOrPath(localPath, pathOrDir, readWrite, strUnused, mode);
    }

    // Using openssl encryption and decryption method, high efficiency; when encrypting more than 64 bytes,
    // the carriage return will not be added, and the tail padding 00 is removed when decrypting
    // The return value is the length of the string after Base64
    int Base64EncodeBuf(const uint8_t *input, const int length, uint8_t *bufOut)
    {
        return EVP_EncodeBlock(bufOut, input, length);
    }

    vector<uint8_t> Base64Encode(const uint8_t *input, const int length)
    {
        vector<uint8_t> retVec;
        uint8_t *pBuf = nullptr;
        while (true) {
            if (static_cast<uint32_t>(length) > HDC_BUF_MAX_BYTES) {
                break;
            }
            int base64Size = length * 1.4 + 256;
            if (!(pBuf = new uint8_t[base64Size]())) {
                break;
            }
            int childRet = Base64EncodeBuf(input, length, pBuf);
            if (childRet <= 0) {
                break;
            }
            retVec.insert(retVec.begin(), pBuf, pBuf + childRet);
            break;
        }
        if (pBuf) {
            delete[] pBuf;
        }

        return retVec;
    }

    inline int CalcDecodeLength(const uint8_t *b64input)
    {
        int len = strlen(reinterpret_cast<char *>(const_cast<uint8_t *>(b64input)));
        if (!len) {
            return 0;
        }
        int padding = 0;
        if (b64input[len - 1] == '=' && b64input[len - 2] == '=') {
            // last two chars are =
            padding = 2;  // 2 : last two chars
        } else if (b64input[len - 1] == '=') {
            // last char is =
            padding = 1;
        }
        return static_cast<int>(len * 0.75 - padding);
    }

    // return -1 error; >0 decode size
    int Base64DecodeBuf(const uint8_t *input, const int length, uint8_t *bufOut)
    {
        int nRetLen = CalcDecodeLength(input);
        if (!nRetLen) {
            return 0;
        }

        if (EVP_DecodeBlock(bufOut, input, length) > 0) {
            return nRetLen;
        }
        return 0;
    }

    string Base64Decode(const uint8_t *input, const int length)
    {
        string retString;
        uint8_t *pBuf = nullptr;
        while (true) {
            if (static_cast<uint32_t>(length) > HDC_BUF_MAX_BYTES) {
                break;
            }
            // must less than length
            if (!(pBuf = new uint8_t[length]())) {
                break;
            }
            int childRet = Base64DecodeBuf(input, length, pBuf);
            if (childRet <= 0) {
                break;
            }
            retString = (reinterpret_cast<char *>(pBuf));
            break;
        }
        if (pBuf) {
            delete[] pBuf;
        }
        return retString;
    }

    void ReverseBytes(void *start, int size)
    {
        uint8_t *istart = (uint8_t *)start;
        uint8_t *iend = istart + size;
        std::reverse(istart, iend);
    }

    // clang-format off
    const string StringFormat(const char * const formater, ...)
    {
        va_list vaArgs;
        va_start(vaArgs, formater);
        string ret = StringFormat(formater, vaArgs);
        va_end(vaArgs);
        return ret;
    }

    const string StringFormat(const char * const formater, va_list &vaArgs)
    {
        std::vector<char> args(GetMaxBufSize());
        const int retSize = vsnprintf_s(args.data(), GetMaxBufSize(), args.size() - 1, formater, vaArgs);
        if (retSize < 0) {
            return std::string("");
        } else {
            return std::string(args.data(), retSize);
        }
    }
    // clang-format on

    string GetVersion()
    {
        const uint8_t a = 'a';
        uint8_t major = (HDC_VERSION_NUMBER >> 28) & 0xff;
        uint8_t minor = (HDC_VERSION_NUMBER << 4 >> 24) & 0xff;
        uint8_t version = (HDC_VERSION_NUMBER << 12 >> 24) & 0xff;
        uint8_t fix = (HDC_VERSION_NUMBER << 20 >> 28) & 0xff;  // max 16, tail is p
        string ver = StringFormat("%x.%x.%x%c", major, minor, version, a + fix);
        return "Ver: " + ver;
    }

    bool IdleUvTask(uv_loop_t *loop, void *data, uv_idle_cb cb)
    {
        uv_idle_t *idle = new(std::nothrow) uv_idle_t();
        if (idle == nullptr) {
            return false;
        }
        idle->data = data;
        uv_idle_init(loop, idle);
        uv_idle_start(idle, cb);
        // delete by callback
        return true;
    }

    bool TimerUvTask(uv_loop_t *loop, void *data, uv_timer_cb cb, int repeatTimeout)
    {
        uv_timer_t *timer = new(std::nothrow) uv_timer_t();
        if (timer == nullptr) {
            return false;
        }
        timer->data = data;
        uv_timer_init(loop, timer);
        uv_timer_start(timer, cb, 0, repeatTimeout);
        // delete by callback
        return true;
    }

    // callback, uint8_t flag, string msg, const void * data
    bool DelayDo(uv_loop_t *loop, const int delayMs, const uint8_t flag, string msg, void *data,
                 std::function<void(const uint8_t, string &, const void *)> cb)
    {
        struct DelayDoParam {
            uv_timer_t handle;
            uint8_t flag;
            string msg;
            void *data;
            std::function<void(const uint8_t, string &, const void *)> cb;
        };
        auto funcDelayDo = [](uv_timer_t *handle) -> void {
            DelayDoParam *st = (DelayDoParam *)handle->data;
            st->cb(st->flag, st->msg, st->data);
            uv_close((uv_handle_t *)handle, [](uv_handle_t *handle) {
                DelayDoParam *st = (DelayDoParam *)handle->data;
                delete st;
            });
        };
        DelayDoParam *st = new(std::nothrow) DelayDoParam();
        if (st == nullptr) {
            return false;
        }
        st->cb = cb;
        st->flag = flag;
        st->msg = msg;
        st->data = data;
        st->handle.data = st;
        uv_timer_init(loop, &st->handle);
        uv_timer_start(&st->handle, funcDelayDo, delayMs, 0);
        return true;
    }

    string ReplaceAll(string str, const string from, const string to)
    {
        string::size_type startPos = 0;
        while ((startPos = str.find(from, startPos)) != string::npos) {
            str.replace(startPos, from.length(), to);
            startPos += to.length();  // Handles case where 'to' is a substring of 'from'
        }
        return str;
    }

    string CanonicalizeSpecPath(string &src)
    {
        char resolvedPath[PATH_MAX] = { 0 };
#if defined(_WIN32)
        if (!_fullpath(resolvedPath, src.c_str(), PATH_MAX)) {
            WRITE_LOG(LOG_FATAL, "_fullpath %s failed", src.c_str());
            return "";
        }
#else
        if (realpath(src.c_str(), resolvedPath) == nullptr) {
            WRITE_LOG(LOG_FATAL, "realpath %s failed", src.c_str());
            return "";
        }
#endif
        string res(resolvedPath);
        return res;
    }

    string UnicodeToUtf8(const char *src, bool reverse)
    {
#if defined(_WIN32)
        UINT from = CP_ACP;
        UINT to = CP_UTF8;
        int count = 0;
        if (reverse) {
            from = CP_UTF8;
            to = CP_ACP;
        }
        count = MultiByteToWideChar(from, 0, src, -1, nullptr, 0);
        if (count <= 0) {
            DWORD err = GetLastError();
            WRITE_LOG(LOG_FATAL, "MultiByteToWideChar failed %s error:%lu", src, err);
            return "";
        }
        wchar_t *wstr = new(std::nothrow) wchar_t[count + 1]();
        if (wstr == nullptr) {
            WRITE_LOG(LOG_FATAL, "new wstr failed count:%d", count);
            return "";
        }
        count = MultiByteToWideChar(from, 0, src, -1, wstr, count);
        if (count <= 0) {
            DWORD err = GetLastError();
            WRITE_LOG(LOG_FATAL, "MultiByteToWideChar failed to wstr %s error:%lu", src, err);
            delete[] wstr;
            return "";
        }
        count = WideCharToMultiByte(to, 0, wstr, -1, nullptr, 0, nullptr, nullptr);
        if (count <= 0) {
            DWORD err = GetLastError();
            WRITE_LOG(LOG_FATAL, "WideCharToMultiByte failed %s error:%lu", wstr, err);
            delete[] wstr;
            return "";
        }
        char *ustr = new(std::nothrow) char[count + 1]();
        if (ustr == nullptr) {
            DWORD err = GetLastError();
            WRITE_LOG(LOG_FATAL, "new ustr failed count:%d", count);
            delete[] wstr;
            return "";
        }
        count = WideCharToMultiByte(to, 0, wstr, -1, ustr, count, nullptr, nullptr);
        if (count <= 0) {
            DWORD err = GetLastError();
            WRITE_LOG(LOG_FATAL, "WideCharToMultiByte failed to ustr %s error:%lu", wstr, err);
            delete[] wstr;
            delete[] ustr;
            return "";
        }
        string rc(ustr);
        delete[] wstr;
        delete[] ustr;
        return rc;
#else
        string rc(src);
        return rc;
#endif
    }

    uint8_t CalcCheckSum(const uint8_t *data, int len)
    {
        uint8_t ret = 0;
        for (int i = 0; i < len; ++i) {
            ret += data[i];
        }
        return ret;
    }

    uv_os_sock_t DuplicateUvSocket(uv_tcp_t *tcp)
    {
        uv_os_sock_t dupFd = -1;
#ifdef _WIN32
        WSAPROTOCOL_INFO info;
        ZeroStruct(info);
        if (WSADuplicateSocketA(tcp->socket, GetCurrentProcessId(), &info) < 0) {
            return dupFd;
        }
        dupFd = WSASocketA(0, 0, 0, &info, 0, 0);
#else
        uv_os_fd_t fdOs;
        if (uv_fileno((const uv_handle_t *)tcp, &fdOs) < 0) {
            return ERR_API_FAIL;
        }
        dupFd = dup(uv_open_osfhandle(fdOs));
#endif
        return dupFd;
    }

    string GetCwd()
    {
        int value = -1;
        char path[PATH_MAX] = "";
        size_t size = sizeof(path);
        string res;
        value = uv_cwd(path, &size);
        if (value < 0) {
            constexpr int bufSize = 1024;
            char buf[bufSize] = { 0 };
            uv_strerror_r(value, buf, bufSize);
            WRITE_LOG(LOG_FATAL, "get path failed: %s", buf);
            return res;
        }
        if (strlen(path) >= PATH_MAX - 1) {
            WRITE_LOG(LOG_FATAL, "get path failed: buffer space max");
            return res;
        }
        if (path[strlen(path) - 1] != Base::GetPathSep()) {
            path[strlen(path)] = Base::GetPathSep();
        }
        res = path;
        return res;
    }

    string GetTmpDir()
    {
        string res;
#ifdef HDC_HOST
        int value = -1;
        char path[PATH_MAX] = "";
        size_t size = sizeof(path);
        value = uv_os_tmpdir(path, &size);
        if (value < 0) {
            constexpr int bufSize = 1024;
            char buf[bufSize] = { 0 };
            uv_strerror_r(value, buf, bufSize);
            WRITE_LOG(LOG_FATAL, "get tmppath failed: %s", buf);
            return res;
        }
        if (strlen(path) >= PATH_MAX - 1) {
            WRITE_LOG(LOG_FATAL, "get tmppath failed: buffer space max");
            return res;
        }
        if (path[strlen(path) - 1] != Base::GetPathSep()) {
            path[strlen(path)] = Base::GetPathSep();
        }
        res = path;
#else
        res = "/data/local/tmp/";
#endif
        return res;
    }

    void SetLogCache(bool enable)
    {
        g_logCache = enable;
    }

    void RemoveLogFile()
    {
        if (g_logCache) {
            string path = GetTmpDir() + LOG_FILE_NAME;
            string bakPath = GetTmpDir() + LOG_BAK_NAME;
            string cachePath = GetTmpDir() + LOG_CACHE_NAME;
            unlink(bakPath.c_str());
            rename(path.c_str(), bakPath.c_str());
            rename(cachePath.c_str(), path.c_str());
            g_logCache = false;
        }
    }

    void RemoveLogCache()
    {
        string cachePath = GetTmpDir() + LOG_CACHE_NAME;
        unlink(cachePath.c_str());
    }

    bool IsRoot()
    {
#ifdef _WIN32
        // reserve
        return true;
#else
        if (getuid() == 0) {
            return true;
        }
#endif
        return false;
    }

    bool IsAbsolutePath(string &path)
    {
        bool ret = false;
#ifdef _WIN32
        // shlwapi.h PathIsRelativeA not link in harmony project
        // c:\ or UNC path '\\hostname\share\file'
        ret = path.find(":\\") == 1 || path.find("\\\\") == 0;
#else
        ret = path[0] == '/';
#endif
        return ret;
    }

    int CloseFd(int &fd)
    {
        int rc = 0;
        if (fd > 0) {
            rc = close(fd);
            if (rc < 0) {
                char buffer[BUF_SIZE_DEFAULT] = { 0 };
#ifdef _WIN32
                strerror_s(buffer, BUF_SIZE_DEFAULT, errno);
#else
                strerror_r(errno, buffer, BUF_SIZE_DEFAULT);
#endif
                WRITE_LOG(LOG_WARN, "close failed errno:%d %s", errno, buffer);
            } else {
                fd = -1;
            }
        }
        return rc;
    }

    void InitProcess(void)
    {
#ifndef HDC_HOST
        umask(0);
        signal(SIGPIPE, SIG_IGN);
        signal(SIGCHLD, SIG_IGN);
        signal(SIGALRM, SIG_IGN);
#endif
    }

    void DeInitProcess(void)
    {
#ifndef HDC_HOST
        mode_t writePermission = 022;
        umask(writePermission);
        signal(SIGPIPE, SIG_DFL);
        signal(SIGCHLD, SIG_DFL);
        signal(SIGALRM, SIG_DFL);
#endif
    }
}
}  // namespace Hdc
