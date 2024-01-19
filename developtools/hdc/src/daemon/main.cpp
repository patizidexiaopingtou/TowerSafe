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

#include <grp.h>
#include <pwd.h>
#include <unistd.h>
#include <sys/types.h>
#include "daemon_common.h"
using namespace Hdc;

static bool g_enableUsb = false;
#ifdef HDC_SUPPORT_UART
static bool g_enableUart = false;
#endif
static bool g_enableTcp = false;
static bool g_rootRun = false;
static bool g_backgroundRun = false;
namespace Hdc {
bool RestartDaemon(bool forkchild)
{
    char path[256] = "";
    size_t nPathSize = 256;
    uv_exepath(path, &nPathSize);
    execl(path, "hdcd", forkchild ? "-forkchild" : nullptr, nullptr);
    return true;
}

bool ForkChildCheck(int argc, const char *argv[])
{
    // hdcd        #service start foreground
    // hdcd -b     #service start backgroundRun
    // hdcd -fork  #fork
    Base::PrintMessage("Background mode, persist.hdc.mode");
    string workMode;
    SystemDepend::GetDevItem("persist.hdc.mode", workMode);
    workMode = Base::Trim(workMode);
    if (workMode == CMDSTR_TMODE_TCP) {
        WRITE_LOG(LOG_DEBUG, "Property enable TCP");
        g_enableTcp = true;
    } else if (workMode == CMDSTR_TMODE_USB) {
        WRITE_LOG(LOG_DEBUG, "Property enable USB");
        g_enableUsb = true;
#ifdef HDC_SUPPORT_UART
    } else if (workMode == CMDSTR_TMODE_UART) {
        WRITE_LOG(LOG_DEBUG, "Property enable UART");
        g_enableUart = true;
    } else if (workMode == "all") {
#else
    } else if (workMode == "all") {
#endif
        WRITE_LOG(LOG_DEBUG, "Property enable USB and TCP");
        g_enableUsb = true;
        g_enableTcp = true;
#ifdef HDC_SUPPORT_UART
        g_enableUart = true;
#endif
    } else {
        WRITE_LOG(LOG_DEBUG, "Default USB mode");
        g_enableUsb = true;
#ifdef HDC_SUPPORT_UART
        WRITE_LOG(LOG_DEBUG, "Default UART mode");
        g_enableUart = true;
#endif
    }
    if (argc == CMD_ARG1_COUNT) {
        if (!strcmp(argv[1], "-forkchild")) {
            g_backgroundRun = false;  // forkchild,Forced foreground
        } else if (!strcmp(argv[1], "-b")) {
            g_backgroundRun = true;
        }
    }
    return true;
}

size_t CheckUvThreadConfig()
{
    string nThreadsString;
    bool ret = SystemDepend::GetDevItem("persist.hdc.uv.threads", nThreadsString);
    if (!ret) {
        return SIZE_THREAD_POOL;
    }
    size_t nThreads = atoi(nThreadsString.c_str());
    if (nThreads <= 0) {
        nThreads = SIZE_THREAD_POOL;
    }
    return nThreads;
}

int BackgroundRun()
{
    pid_t pc = fork();  // create process as daemon process
    if (pc < 0) {
        return -1;
    } else if (!pc) {
        int i;
        const int MAX_NUM = 64;
        for (i = 0; i < MAX_NUM; ++i) {
            int fd = i;
            Base::CloseFd(fd);
        }
        RestartDaemon(true);
    } else {  // >0 orig process
    }
    return 0;
}

string DaemonUsage()
{
    string ret;
    ret = "\n                         Harmony device connector daemon(HDCD) Usage: hdcd [options]...\n\n"
          "\n"
          "general options:\n"
          " -h                            - Print help\n"
          " -l 0-5                        - Print runtime log\n"
          "\n"
          "daemon mode options:\n"
          " -b                            - Daemon run in background/fork mode\n"
#ifdef HDC_SUPPORT_UART
          " -i                            - Enable UART mode\n"
#endif
          " -u                            - Enable USB mode\n"
          " -t                            - Enable TCP mode\n";
    return ret;
}

bool GetDaemonCommandlineOptions(int argc, const char *argv[])
{
    int ch;
    // hdcd -l4 ...
    WRITE_LOG(LOG_DEBUG, "Foreground cli-mode");
    // Both settings are running with parameters
    while ((ch = getopt(argc, const_cast<char *const *>(argv), "utl:")) != -1) {
        switch (ch) {
            case 'l': {
                int logLevel = atoi(optarg);
                if (logLevel < 0 || logLevel > LOG_LAST) {
                    WRITE_LOG(LOG_DEBUG, "Loglevel error!\n");
                    return -1;
                }
                Base::SetLogLevel(logLevel);
                break;
            }
            case 'u': {
                Base::PrintMessage("Option USB enabled");
                g_enableUsb = true;
                break;
            }
            case 't': {
                Base::PrintMessage("Option TCP enabled");
                g_enableTcp = true;
                break;
            }
#ifdef HDC_SUPPORT_UART
            case 'i': { // enable uart
                Base::PrintMessage("Parament Enable UART");
                g_enableUart = true;
                break;
            }
#endif
            default:
                Base::PrintMessage("Option:%c non-supported!", ch);
                exit(0);
                break;
        }
    }
    return true;
}

bool DropRootPrivileges()
{
    int ret;
    const char *userName = "shell";
    vector<const char *> groupsNames = { "shell", "log", "readproc" };
    struct passwd *user;
    gid_t *gids = nullptr;

    user = getpwnam(userName);
    if (user == nullptr) {
        WRITE_LOG(LOG_FATAL, "getpwuid %s fail, %s", userName, strerror(errno));
        return false;
    }

    gids = static_cast<gid_t *>(calloc(groupsNames.size(), sizeof(gid_t)));
    if (gids == nullptr) {
        WRITE_LOG(LOG_FATAL, "calloc fail");
        return false;
    }

    for (size_t i = 0; i < groupsNames.size(); i++) {
        struct group *group = getgrnam(groupsNames[i]);
        if (group == nullptr) {
            WRITE_LOG(LOG_FATAL, "calloc fail");
        }
        gids[i] = group->gr_gid;
    }

    ret = setuid(user->pw_uid);
    if (ret) {
        WRITE_LOG(LOG_FATAL, "setuid %s fail, %s", userName, strerror(errno));
        free(gids);
        return false;
    }

    ret = setgid(user->pw_gid);
    if (ret) {
        WRITE_LOG(LOG_FATAL, "setgid %s fail, %s", userName, strerror(errno));
        free(gids);
        return false;
    }

    ret = setgroups(groupsNames.size(), gids);
    if (ret) {
        WRITE_LOG(LOG_FATAL, "setgroups %s fail, %s", userName, strerror(errno));
        free(gids);
        return false;
    }

    free(gids);
    return true;
}

bool NeedDropRootPrivileges()
{
    string rootMode;
    string debugMode;
    SystemDepend::GetDevItem("const.debuggable", debugMode);
    SystemDepend::GetDevItem("persist.hdc.root", rootMode);
    if (debugMode == "1") {
        if (rootMode == "1") {
            setuid(0);
            g_rootRun = true;
            WRITE_LOG(LOG_DEBUG, "Root run");
        } else if (rootMode == "0") {
            return DropRootPrivileges();
        }
        // default keep root
    } else {
        return DropRootPrivileges();
    }
    return true;
}
} // namespace Hdc

#ifndef UNIT_TEST
// daemon running with default behavior. options also can be given to custom its behavior including b/t/u/l etc.
int main(int argc, const char *argv[])
{
    Hdc::Base::SetLogCache(false);
    // check property
    if (argc == 2 && !strcmp(argv[1], "-h")) {
        string usage = DaemonUsage();
        fprintf(stderr, "%s", usage.c_str());
        return 0;
    }
    if (argc == CMD_ARG1_COUNT && !strcmp(argv[1], "-v")) {
        string ver = Hdc::Base::GetVersion();
        fprintf(stderr, "%s\n", ver.c_str());
        return 0;
    }
    if (argc == 1 || (argc == CMD_ARG1_COUNT && (!strcmp(argv[1], "-forkchild") || !strcmp(argv[1], "-b")))) {
        Hdc::Base::RemoveLogFile();
        ForkChildCheck(argc, argv);
    } else {
        GetDaemonCommandlineOptions(argc, argv);
    }
    if (!g_enableTcp && !g_enableUsb) {
#ifdef HDC_SUPPORT_UART
        if (!g_enableUart) {
            Base::PrintMessage("TCP, USB and Uart are disable, cannot run continue\n");
            return -1;
        }
#else
        Base::PrintMessage("Both TCP and USB are disable, cannot run continue\n");
        return -1;
#endif
    }
    if (g_backgroundRun) {
        return BackgroundRun();
    }

#ifdef HARMONY_PROJECT
    if (!NeedDropRootPrivileges()) {
        Base::PrintMessage("DropRootPrivileges fail, EXITING...\n");
        return -1;
    }
#endif

    Base::InitProcess();
    WRITE_LOG(LOG_DEBUG, "HdcDaemon main run");
    HdcDaemon daemon(false, CheckUvThreadConfig());

#ifdef HDC_SUPPORT_UART
    daemon.InitMod(g_enableTcp, g_enableUsb, g_enableUart);
#else
    daemon.InitMod(g_enableTcp, g_enableUsb);
#endif
    daemon.WorkerPendding();
    bool wantRestart = daemon.WantRestart();
    WRITE_LOG(LOG_DEBUG, "Daemon finish g_rootRun %d wantRestart %d", g_rootRun, wantRestart);
    // There is no daemon, we can only restart myself.
    if (g_rootRun && wantRestart) {
        // just root can self restart, low privilege will be exit and start by service(root)
        WRITE_LOG(LOG_INFO, "Daemon restart");
        RestartDaemon(false);
    }
#ifdef HDC_SUPPORT_UART
    // when no usb insert , device will hung here , we don't know why.
    // Test the command "smode -r" in uart mode, then execute shell
    // hdcd will not really exit until usb plug in
    // so we use abort here
    abort();
#endif
    return 0;
}
#endif
