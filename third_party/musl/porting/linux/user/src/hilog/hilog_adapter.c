/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

#define _GNU_SOURCE

#include <hilog_adapter.h>

#include <errno.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/time.h>
#include <sys/uio.h>
#include <sys/un.h>
#include <time.h>
#include <unistd.h>

#include "hilog_common.h"
#ifdef OHOS_ENABLE_PARAMETER
#include "sys_param.h"
#endif
#include "vsnprintf_s_p.h"

#define LOG_LEN 3
#define ERROR_FD 2
#ifdef OHOS_ENABLE_PARAMETER
#define SYSPARAM_LENGTH 32
#endif

const int SOCKET_TYPE = SOCK_DGRAM | SOCK_NONBLOCK | SOCK_CLOEXEC;
const int INVALID_SOCKET = -1;
const struct sockaddr_un SOCKET_ADDR = {AF_UNIX, SOCKET_FILE_DIR INPUT_SOCKET_NAME};

static bool musl_log_enable = false;

#ifdef OHOS_ENABLE_PARAMETER
static const char *param_name = "musl.log.enable";
#endif

static int SendMessage(HilogMsg *header, const char *tag, uint16_t tagLen, const char *fmt, uint16_t fmtLen)
{
    int socketFd = TEMP_FAILURE_RETRY(socket(AF_UNIX, SOCKET_TYPE, 0));
    if (socketFd < 0) {
        dprintf(ERROR_FD, "HiLogAdapter: Can't create socket! Errno: %d\n", errno);
        return socketFd;
    }

    long int result =
        TEMP_FAILURE_RETRY(connect(socketFd, (const struct sockaddr *)(&SOCKET_ADDR), sizeof(SOCKET_ADDR)));
    if (result < 0) {
        dprintf(ERROR_FD, "HiLogAdapter: Can't connect to server. Errno: %d\n", errno);
        if (socketFd >= 0) {
            close(socketFd);
        }
        return result;
    }
    struct timespec ts = {0};
    (void)clock_gettime(CLOCK_REALTIME, &ts);
    struct timespec ts_mono = {0};
    (void)clock_gettime(CLOCK_MONOTONIC, &ts_mono);
    header->tv_sec = (uint32_t)(ts.tv_sec);
    header->tv_nsec = (uint32_t)(ts.tv_nsec);
    header->mono_sec = (uint32_t)(ts_mono.tv_sec);
    header->len = sizeof(HilogMsg) + tagLen + fmtLen;
    header->tag_len = tagLen;

    struct iovec vec[LOG_LEN] = {0};
    vec[0].iov_base = header;                   // 0 : index of hos log header
    vec[0].iov_len = sizeof(HilogMsg);          // 0 : index of hos log header
    vec[1].iov_base = (void *)((char *)(tag));  // 1 : index of log tag
    vec[1].iov_len = tagLen;                    // 1 : index of log tag
    vec[2].iov_base = (void *)((char *)(fmt));  // 2 : index of log content
    vec[2].iov_len = fmtLen;                    // 2 : index of log content
    int ret = TEMP_FAILURE_RETRY(writev(socketFd, vec, LOG_LEN));
    if (socketFd >= 0) {
        close(socketFd);
    }
    return ret;
}

HILOG_LOCAL_API
int HiLogAdapterPrintArgs(
    const LogType type, const LogLevel level, const unsigned int domain, const char *tag, const char *fmt, va_list ap)
{
    char buf[MAX_LOG_LEN] = {0};

    vsnprintfp_s(buf, MAX_LOG_LEN, MAX_LOG_LEN - 1, true, fmt, ap);

    size_t tagLen = strnlen(tag, MAX_TAG_LEN - 1);
    size_t logLen = strnlen(buf, MAX_LOG_LEN - 1);
    HilogMsg header = {0};
    header.type = type;
    header.level = level;
#ifndef __RECV_MSG_WITH_UCRED_
    header.pid = getpid();
#endif
    header.tid = (uint32_t)(gettid());
    header.domain = domain;

    return SendMessage(&header, tag, tagLen + 1, buf, logLen + 1);
}

HILOG_LOCAL_API
int HiLogAdapterPrint(LogType type, LogLevel level, unsigned int domain, const char *tag, const char *fmt, ...)
{
    if (!HiLogAdapterIsLoggable(domain, tag, level)) {
        return -1;
    }

    int ret;
    va_list ap;
    va_start(ap, fmt);
    ret = HiLogAdapterPrintArgs(type, level, domain, tag, fmt, ap);
    va_end(ap);
    return ret;
}

bool is_musl_log_enable()
{
    if (getpid() == 1) {
        return false;
    }
    return musl_log_enable;
}

bool HiLogAdapterIsLoggable(unsigned int domain, const char *tag, LogLevel level)
{
    if (!is_musl_log_enable()) {
        return false;
    }

    if ((level <= LOG_LEVEL_MIN) || (level >= LOG_LEVEL_MAX) || tag == NULL) {
        return false;
    }
    return true;
}

#ifdef OHOS_ENABLE_PARAMETER
bool get_bool_sysparam(CachedHandle cachedhandle)
{
    char *param_value = CachedParameterGet(cachedhandle);
    if (param_value != NULL) {
        if (strcmp(param_value, "true") == 0) {
            return true;
        }
    }
    return false;
}
#endif

void musl_log_reset()
{
#if (defined(OHOS_ENABLE_PARAMETER))
    static CachedHandle musl_log_Handle = NULL;
    if (musl_log_Handle == NULL) {
        musl_log_Handle = CachedParameterCreate(param_name, "false");
    }
    musl_log_enable = get_bool_sysparam(musl_log_Handle);
#elif (defined(ENABLE_MUSL_LOG))
    musl_log_enable = true;
#endif
}
