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

#include <iostream>

#include "server.h"
#include "server_for_client.h"

#ifndef HARMONY_PROJECT
#include "../test/ut_command.h"
using namespace HdcTest;
#endif

#include "server.h"
#include "server_for_client.h"
#include "ext_client.h"
using namespace Hdc;

namespace {
    bool g_isServerMode = false;
    bool g_isPullServer = true;
    bool g_isPcDebugRun = false;
    bool g_isTCPorUSB = false;
    bool g_isCustomLoglevel = false;
    int g_isTestMethod = 0;
    string g_connectKey = "";
    string g_serverListenString = "";
    string g_containerInOut = "";
}

namespace Hdc {
// return value: 0 == not command, 1 == one command, 2 == double command
int IsRegisterCommand(string &outCommand, const char *cmd, const char *cmdnext)
{
    string sCmdNext = cmdnext == nullptr ? string("") : string(cmdnext);
    string doubleCommand = cmd + string(" ") + sCmdNext;
    vector<string> registerCommand;
    registerCommand.push_back(CMDSTR_SOFTWARE_VERSION);
    registerCommand.push_back(CMDSTR_SOFTWARE_HELP);
    registerCommand.push_back(CMDSTR_TARGET_DISCOVER);
    registerCommand.push_back(CMDSTR_LIST_TARGETS);
    registerCommand.push_back(CMDSTR_CHECK_SERVER);
    registerCommand.push_back(CMDSTR_CHECK_DEVICE);
    registerCommand.push_back(CMDSTR_WAIT_FOR);
    registerCommand.push_back(CMDSTR_CONNECT_ANY);
    registerCommand.push_back(CMDSTR_CONNECT_TARGET);
    registerCommand.push_back(CMDSTR_SHELL);
    registerCommand.push_back(CMDSTR_FILE_SEND);
    registerCommand.push_back(CMDSTR_FILE_RECV);
    registerCommand.push_back(CMDSTR_FORWARD_FPORT);
    registerCommand.push_back(CMDSTR_FORWARD_RPORT);
    registerCommand.push_back(CMDSTR_SERVICE_KILL);
    registerCommand.push_back(CMDSTR_SERVICE_START);
    registerCommand.push_back(CMDSTR_GENERATE_KEY);
    registerCommand.push_back(CMDSTR_KILL_SERVER);
    registerCommand.push_back(CMDSTR_KILL_DAEMON);
    registerCommand.push_back(CMDSTR_APP_INSTALL);
    registerCommand.push_back(CMDSTR_APP_UNINSTALL);
    registerCommand.push_back(CMDSTR_TARGET_MOUNT);
    registerCommand.push_back(CMDSTR_HILOG);
    registerCommand.push_back(CMDSTR_STARTUP_MODE);
    registerCommand.push_back(CMDSTR_BUGREPORT);
    registerCommand.push_back(CMDSTR_TARGET_MODE);
    registerCommand.push_back(CMDSTR_APP_SIDELOAD);
    registerCommand.push_back(CMDSTR_TARGET_REBOOT);
    registerCommand.push_back(CMDSTR_LIST_JDWP);
    registerCommand.push_back(CMDSTR_TRACK_JDWP);
    registerCommand.push_back(CMDSTR_FLASHD_UPDATE);
    registerCommand.push_back(CMDSTR_FLASHD_FLASH);
    registerCommand.push_back(CMDSTR_FLASHD_ERASE);
    registerCommand.push_back(CMDSTR_FLASHD_FORMAT);

    for (string v : registerCommand) {
        if (doubleCommand == v) {
            outCommand = doubleCommand;
            return 2;
        }
        if (cmd == v || !strncmp(cmd, CMDSTR_WAIT_FOR.c_str(), CMDSTR_WAIT_FOR.size())) {
            outCommand = cmd;
            return 1;
        }
    }
    return 0;
}

void AppendCwdWhenTransfer(string &outCommand)
{
    if (outCommand != CMDSTR_FILE_SEND && outCommand != CMDSTR_FILE_RECV && outCommand != CMDSTR_APP_INSTALL &&
        outCommand != CMDSTR_APP_SIDELOAD) {
        return;
    }
    int value = -1;
    char path[PATH_MAX] = "";
    size_t size = sizeof(path);
    value = uv_cwd(path, &size);
    if (value < 0) {
        constexpr int bufSize = 1024;
        char buf[bufSize] = { 0 };
        uv_strerror_r(value, buf, bufSize);
        WRITE_LOG(LOG_FATAL, "append cwd path failed: %s", buf);
        return;
    }
    if (strlen(path) >= PATH_MAX - 1) {
        WRITE_LOG(LOG_FATAL, "append cwd path failed: buffer space max");
        return;
    }
    if (path[strlen(path) - 1] != Base::GetPathSep()) {
        path[strlen(path)] = Base::GetPathSep();
    }
    outCommand += outCommand.size() ? " " : "";
    outCommand += CMDSTR_REMOTE_PARAMETER;
    outCommand += outCommand.size() ? " -cwd " : "-cwd ";
    string utf8Path = Base::UnicodeToUtf8(path, true);
    outCommand += Base::StringFormat("\"%s\"", utf8Path.c_str());
}

int SplitOptionAndCommand(int argc, const char **argv, string &outOption, string &outCommand)
{
    bool foundCommand = false;
    int resultChild = 0;
    // we want to start from 1, ignore argv[0], but it has issue
    for (int i = 0; i < argc; ++i) {
        if (!foundCommand) {
            resultChild = IsRegisterCommand(outCommand, argv[i], (i == argc - 1) ? nullptr : argv[i + 1]);
            if (resultChild > 0) {
                foundCommand = true;
                if (resultChild == 2) {
                    ++i;
                }
                AppendCwdWhenTransfer(outCommand);
                continue;
            }
        }
        if (foundCommand) {
            outCommand += outCommand.size() ? " " : "";
            string rawCmd = argv[i];
            string packageCmd = Base::StringFormat("\"%s\"", argv[i]);
            outCommand += rawCmd.find(" ") == string::npos ? rawCmd : packageCmd;
        } else {
            outOption += outOption.size() ? " " : "";
            if (i == 0) {
                outOption += Base::StringFormat("\"%s\"", argv[i]);
            } else {
                outOption += argv[i];
            }
        }
    }
    return 0;
}

int RunServerMode(string &serverListenString)
{
    if (serverListenString.empty()) {
        return -1;
    }
    HdcServer server(true);
    if (!server.Initial(serverListenString.c_str())) {
        Base::PrintMessage("Initial failed");
        return -1;
    }
    server.WorkerPendding();
    return 0;
}

int RunPcDebugMode(bool isPullServer, bool isTCPorUSB, int isTestMethod)
{
#ifdef HARMONY_PROJECT
    Base::PrintMessage("Not support command...");
#else
    pthread_t pt;
    if (isPullServer) {
        pthread_create(&pt, nullptr, TestBackgroundServerForClient, nullptr);
        uv_sleep(200);  // give time to start serverForClient,at least 200ms
    }
    TestRuntimeCommandSimple(isTCPorUSB, isTestMethod, true);
    if (isPullServer) {
        pthread_join(pt, nullptr);
        WRITE_LOG(LOG_DEBUG, "!!!!!!!!!Server finish");
    }
#endif
    return 0;
}

int RunClientMode(string &commands, string &serverListenString, string &connectKey, bool isPullServer)
{
    if (serverListenString.empty()) {
        return -1;
    }
    uv_loop_t loopMain;
    uv_loop_init(&loopMain);
    HdcClient client(false, serverListenString, &loopMain, commands == CMDSTR_CHECK_SERVER);
    if (!commands.size()) {
        Base::PrintMessage("Unknown operation command...");
        std::cerr << TranslateCommand::Usage();
        return 0;
    }
    if (!strncmp(commands.c_str(), CMDSTR_SERVICE_START.c_str(), CMDSTR_SERVICE_START.size()) ||
        !strncmp(commands.c_str(), CMDSTR_SERVICE_KILL.c_str(), CMDSTR_SERVICE_KILL.size()) ||
        !strncmp(commands.c_str(), CMDSTR_GENERATE_KEY.c_str(), CMDSTR_GENERATE_KEY.size())) {
        client.CtrlServiceWork(commands.c_str());
        return 0;
    }
    if (isPullServer && Base::ProgramMutex(SERVER_NAME.c_str(), true) == 0) {
        // default pullup, just default listenstr.If want to customer listen-string, please use 'hdc -m -s lanip:port'
        HdcServer::PullupServer(serverListenString.c_str());
        uv_sleep(300);  // give time to start serverForClient,at least 200ms
    }
    client.Initial(connectKey);
    client.ExecuteCommand(commands.c_str());
    return 0;
}

bool ParseServerListenString(string &serverListenString, char *optarg)
{
    if (strlen(optarg) > strlen("0000::0000:0000:0000:0000:65535")) {
        Base::PrintMessage("Unknown content of parament '-s'");
        return false;
    }
    char buf[BUF_SIZE_TINY] = "";
    if (strcpy_s(buf, sizeof(buf), optarg) != 0) {
        Base::PrintMessage("strcpy_s error %d", errno);
        return false;
    }
    char *p = strrchr(buf, ':');
    if (!p) {  // Only port
        if (strlen(buf) > 5) {
            Base::PrintMessage("The port-string's length must < 5");
            return false;
        }
        size_t len = strlen(buf);
        for (size_t i = 0; i < len; i++) {
            if (isdigit(buf[i]) == 0) {
                Base::PrintMessage("The port must be digit buf:%s", buf);
                return false;
            }
        }
        int port = atoi(buf);
        if (port <= 0 || port > MAX_IP_PORT) {
            Base::PrintMessage("Port range incorrect");
            return false;
        }
        (void)snprintf_s(buf, sizeof(buf), sizeof(buf) - 1, "::ffff:127.0.0.1:%d", port);
        serverListenString = buf;
    } else {
        *p = '\0';
        char *str = p + 1;
        size_t len = strlen(str);
        for (size_t i = 0; i < len; i++) {
            if (isdigit(str[i]) == 0) {
                Base::PrintMessage("The port must be digit str:%s", str);
                return false;
            }
        }
        int port = atoi(p + 1);
        sockaddr_in addrv4;
        sockaddr_in6 addrv6;

        if ((port <= 0 || port > MAX_IP_PORT)) {
            Base::PrintMessage("-s content port incorrect.");
            return false;
        }

        if (uv_ip4_addr(buf, port, &addrv4) == 0) {
            serverListenString = IPV4_MAPPING_PREFIX;
            serverListenString += optarg;
        } else if (uv_ip6_addr(buf, port, &addrv6) == 0) {
            serverListenString = optarg;
        } else {
            Base::PrintMessage("-s content IP incorrect.");
            return false;
        }
    }
    return true;
}

bool GetCommandlineOptions(int optArgc, const char *optArgv[])
{
    int ch = 0;
    bool needExit = false;
    opterr = 0;
    // get option parameters first
    while ((ch = getopt(optArgc, const_cast<char *const*>(optArgv), "hvpfmncs:d:t:l:")) != -1) {
        switch (ch) {
            case 'h': {
                string usage = Hdc::TranslateCommand::Usage();
                fprintf(stderr, "%s", usage.c_str());
                needExit = true;
                return needExit;
            }
            case 'v': {
                string ver = Base::GetVersion();
                fprintf(stdout, "%s\n", ver.c_str());
                needExit = true;
                return needExit;
            }
            case 'f': {  // [not-publish]
                break;
            }
            case 'l': {
                int logLevel = atoi(optarg);
                if (logLevel < 0 || logLevel > LOG_LAST) {
                    Base::PrintMessage("Loglevel error!");
                    needExit = true;
                    return needExit;
                }
                g_isCustomLoglevel = true;
                Base::SetLogLevel(logLevel);
                break;
            }
            case 'm': {  // [not-publish] is server mode，or client mode
                g_isServerMode = true;
                break;
            }
            case 'n': {
                g_containerInOut = "-n";
                break;
            }
            case 'c': {
                g_containerInOut = "-c";
                break;
            }
            case 'p': {  // [not-publish]  not pullup server
                g_isPullServer = false;
                break;
            }
            case 't': {  // key
                if (strlen(optarg) > MAX_CONNECTKEY_SIZE) {
                    Base::PrintMessage("Sizeo of of parament '-t' %d is too long", strlen(optarg));
                    needExit = true;
                    return needExit;
                }
                g_connectKey = optarg;
                break;
            }
            case 's': {
                if (!Hdc::ParseServerListenString(g_serverListenString, optarg)) {
                    needExit = true;
                    return needExit;
                }
                break;
            }
            case 'd':  // [Undisclosed parameters] debug mode
                g_isPcDebugRun = true;
                if (optarg[0] == 't') {
                    g_isTCPorUSB = true;
                } else if (optarg[0] == 'u') {
                    g_isTCPorUSB = false;
                } else {
                    Base::PrintMessage("Unknown debug parameters");
                    needExit = true;
                    return needExit;
                }
                g_isTestMethod = atoi(optarg + 1);
                break;
            case '?':
                break;
            default: {
                Base::PrintMessage("Unknown parameters");
                needExit = true;
                return needExit;
            }
        }
    }
    return needExit;
}

void InitServerAddr(void)
{
    int port;
    do {
        char *env = getenv(ENV_SERVER_PORT.c_str());
        if (!env) {
            port = DEFAULT_PORT;
            break;
        }

        size_t len = strlen(env);
        size_t maxLen = 5;
        if (len > maxLen) {
            fprintf(stderr, "OHOS_HDC_SERVER_PORT %s is too long for the (0, 65535] range\n", env);
            return;
        }

        for (size_t i = 0; i < len; i++) {
            if (isdigit(env[i]) == 0) {
                fprintf(stderr, "OHOS_HDC_SERVER_PORT %s is not digit\n", env);
                return;
            }
        }

        port = atoi(env);
	if (port > 65535 || port <= 0) {
            fprintf(stderr, "OHOS_HDC_SERVER_PORT %s is not in (0, 65535] range\n", env);
            return;
	}
    } while (0);

    g_serverListenString = DEFAULT_SERVER_ADDR_IP;
    g_serverListenString += ":";
    g_serverListenString += std::to_string(port);
}

void RunExternalClient(string &str, string &connectKey, string &containerInOut)
{
    ExtClient extClient;
    extClient.connectKey = connectKey;
    extClient.containerInOut = containerInOut;
    extClient.ExecuteCommand(str);
}
}

#ifndef UNIT_TEST
// hdc -l4 -m -s ip:port|hdc -l4 -m
// hdc -l4 - s ip:port list targets
int main(int argc, const char *argv[])
{
    string options;
    string commands;
    Hdc::SplitOptionAndCommand(argc, argv, options, commands);
    uv_setup_args(argc, const_cast<char **>(argv));
    int optArgc = 0;
    char **optArgv = Base::SplitCommandToArgs(options.c_str(), &optArgc);
    bool cmdOptionResult;

    InitServerAddr();
    cmdOptionResult = GetCommandlineOptions(optArgc, const_cast<const char **>(optArgv));
    delete[](reinterpret_cast<char*>(optArgv));
    if (cmdOptionResult) {
        return 0;
    }
    if (g_isServerMode) {
        // -m server.Run alone in the background, no -s will be listen loopback address
        Hdc::RunServerMode(g_serverListenString);
    } else if (g_isPcDebugRun) {
        Hdc::RunPcDebugMode(g_isPullServer, g_isTCPorUSB, g_isTestMethod);
    } else {
        if (!g_isCustomLoglevel) {
            Base::SetLogLevel(LOG_INFO);
        }
        bool exist = ExtClient::SharedLibraryExist();
        if (!exist) {
            Hdc::RunClientMode(commands, g_serverListenString, g_connectKey, g_isPullServer);
            Hdc::Base::RemoveLogCache();
            return 0;
        }
        string str = "list targets";
        if (!strncmp(commands.c_str(), CMDSTR_LIST_TARGETS.c_str(), CMDSTR_LIST_TARGETS.size())) {
            string lista = "list targets -a";
            if (!strncmp(commands.c_str(), lista.c_str(), lista.size())) {
                str = "list targets -v";
            } else {
                str = commands;
            }
            Hdc::RunExternalClient(str, g_connectKey, g_containerInOut);
            Hdc::RunClientMode(str, g_serverListenString, g_connectKey, g_isPullServer);
        } else if (!strncmp(commands.c_str(), CMDSTR_SOFTWARE_VERSION.c_str(), CMDSTR_SOFTWARE_VERSION.size()) ||
                   !strncmp(commands.c_str(), CMDSTR_SOFTWARE_HELP.c_str(), CMDSTR_SOFTWARE_HELP.size()) ||
                   !strncmp(commands.c_str(), CMDSTR_TARGET_DISCOVER.c_str(), CMDSTR_TARGET_DISCOVER.size()) ||
                   !strncmp(commands.c_str(), CMDSTR_SERVICE_START.c_str(), CMDSTR_SERVICE_START.size()) ||
                   !strncmp(commands.c_str(), CMDSTR_SERVICE_KILL.c_str(), CMDSTR_SERVICE_KILL.size()) ||
                   !strncmp(commands.c_str(), CMDSTR_WAIT_FOR.c_str(), CMDSTR_WAIT_FOR.size())) {
            Hdc::RunExternalClient(commands, g_connectKey, g_containerInOut);
            Hdc::RunClientMode(commands, g_serverListenString, g_connectKey, g_isPullServer);
        } else if (!strncmp(commands.c_str(), CMDSTR_CONNECT_TARGET.c_str(), CMDSTR_CONNECT_TARGET.size())) {
            Hdc::RunExternalClient(commands, g_connectKey, g_containerInOut);
        } else {
            g_show = false;
            Hdc::RunExternalClient(str, g_connectKey, g_containerInOut);
            Hdc::RunClientMode(str, g_serverListenString, g_connectKey, g_isPullServer);
            g_show = true;
            if (g_connectKey.empty()) {
                if (g_lists.size() == 0) {
                    Base::PrintMessage("No any target");
                } else if (g_lists.size() == 1) {
                    auto iter = g_lists.begin();
                    g_connectKey = iter->first;
                } else {
                    Base::PrintMessage("Specify one target");
                }
            }
            if (g_lists[g_connectKey] == "external") {
                Hdc::RunExternalClient(commands, g_connectKey, g_containerInOut);
            } else if (g_lists[g_connectKey] == "hdc") {
                Hdc::RunClientMode(commands, g_serverListenString, g_connectKey, g_isPullServer);
            }
        }
    }
    WRITE_LOG(LOG_DEBUG, "!!!!!!!!!Main finish main");
    Hdc::Base::RemoveLogCache();
    return 0;
}
#endif  // no UNIT_TEST
