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
#include "host_app.h"

namespace Hdc {
HdcHostApp::HdcHostApp(HTaskInfo hTaskInfo)
    : HdcTransferBase(hTaskInfo)
{
    commandBegin = CMD_APP_BEGIN;
    commandData = CMD_APP_DATA;
}

HdcHostApp::~HdcHostApp()
{
}

bool HdcHostApp::BeginInstall(CtxFile *context, const char *command)
{
    int argc = 0;
    bool ret = false;
    string options;
    char **argv = Base::SplitCommandToArgs(command, &argc);
    if (argc < 1) {
        goto Finish;
    }

    for (int i = 0; i < argc; ++i) {
        if (!strcmp(argv[i], CMD_OPTION_CLIENTCWD.c_str())) {
            if (i + 1 < argc) {
                context->transferConfig.clientCwd = argv[i + 1];
                i += 1;  // add content index
            }
        } else if (!strncmp(argv[i], "-", 1)) {
            if (options.size()) {
                options += " ";
            }
            options += argv[i];
        } else {
            string path = argv[i];
            ExtractRelativePath(context->transferConfig.clientCwd, path);
            if (MatchPackageExtendName(path, ".hap") || MatchPackageExtendName(path, ".hsp")) {
                context->taskQueue.push_back(path);
            } else {
                GetSubFiles(argv[i], ".hap", &context->taskQueue);
                GetSubFiles(argv[i], ".hsp", &context->taskQueue);
            }
        }
    }
    if (!context->taskQueue.size()) {
        LogMsg(MSG_FAIL, "Not any installation package was found");
        goto Finish;
    }
    // remove repeate
    sort(context->taskQueue.begin(), context->taskQueue.end());
    context->taskQueue.erase(unique(context->taskQueue.begin(), context->taskQueue.end()), context->taskQueue.end());

    context->transferConfig.options = options;
    context->transferConfig.functionName = CMDSTR_APP_INSTALL;
    RunQueue(context);
    ret = true;
Finish:
    if (argv) {
        delete[](reinterpret_cast<char *>(argv));
    }
    return ret;
}

bool HdcHostApp::BeginSideload(CtxFile *context, const char *localPath)
{
    bool ret = false;
    context->transferConfig.functionName = CMDSTR_APP_SIDELOAD;
    context->taskQueue.push_back(localPath);
    RunQueue(context);
    ret = true;
    return ret;
}

void HdcHostApp::RunQueue(CtxFile *context)
{
    ++refCount;
    context->localPath = context->taskQueue.back();
    uv_fs_open(loopTask, &context->fsOpenReq, context->localPath.c_str(), O_RDONLY, 0, OnFileOpen);
    context->master = true;
}

void HdcHostApp::CheckMaster(CtxFile *context)
{
    uv_fs_t fs = {};
    uv_fs_fstat(nullptr, &fs, context->fsOpenReq.result, nullptr);
    context->transferConfig.fileSize = fs.statbuf.st_size;
    uv_fs_req_cleanup(&fs);

    context->transferConfig.optionalName
        = Base::GetRandomString(9);  // Prevent the name of illegal APP leads to pm unable to install
    if (context->localPath.find(".hap") != static_cast<size_t>(-1)) {
        context->transferConfig.optionalName += ".hap";
    } else if (context->localPath.find(".hsp") != static_cast<size_t>(-1)) {
        context->transferConfig.optionalName += ".hsp";
    } else {
        context->transferConfig.optionalName += ".bundle";
    }
    string bufString = SerialStruct::SerializeToString(context->transferConfig);
    SendToAnother(CMD_APP_CHECK, const_cast<uint8_t *>(reinterpret_cast<const uint8_t *>(bufString.c_str())),
                  bufString.size());
}

bool HdcHostApp::CheckInstallContinue(AppModType mode, bool lastResult, const char *msg)
{
    string modeDesc;
    switch (mode) {
        case APPMOD_INSTALL:
            modeDesc = "App install";
            break;
        case APPMOD_UNINSTALL:
            modeDesc = "App uninstall";
            break;
        case APPMOD_SIDELOAD:
            modeDesc = "Side load";
            break;
        default:
            modeDesc = "Unknown";
            break;
    }
    if (ctxNow.taskQueue.size() > 0) {
        ctxNow.taskQueue.pop_back();
    }
    LogMsg(MSG_INFO, "%s path:%s, queuesize:%d, msg:%s", modeDesc.c_str(), ctxNow.localPath.c_str(),
           ctxNow.taskQueue.size(), msg);
    if (singalStop || !ctxNow.taskQueue.size()) {
        LogMsg(MSG_OK, "AppMod finish");
        return false;
    }
    RunQueue(&ctxNow);
    return true;
}

bool HdcHostApp::CommandDispatch(const uint16_t command, uint8_t *payload, const int payloadSize)
{
    if (!HdcTransferBase::CommandDispatch(command, payload, payloadSize)) {
        return false;
    }
    bool ret = true;
    constexpr int cmdOffset = 2;
    switch (command) {
        case CMD_APP_INIT: {
            ret = BeginInstall(&ctxNow, (const char *)payload);
            break;
        }
        case CMD_APP_FINISH: {
            AppModType mode = static_cast<AppModType>(payload[0]);
            bool result = static_cast<bool>(payload[1]);
            string s(reinterpret_cast<char *>(payload + cmdOffset), payloadSize - cmdOffset);
            ret = CheckInstallContinue(mode, result, s.c_str());
            break;
        }
        case CMD_APP_UNINSTALL: {
            SendToAnother(CMD_APP_UNINSTALL, payload, payloadSize);
            ctxNow.taskQueue.push_back(reinterpret_cast<char *>(payload));  // just compatible
            break;
        }
        case CMD_APP_SIDELOAD: {
            BeginSideload(&ctxNow, (const char *)payload);
            break;
        }
        default:
            break;
    }
    return ret;
};
}
