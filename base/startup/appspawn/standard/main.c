/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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
#include <signal.h>
#include "appspawn_adapter.h"
#include "appspawn_msg.h"
#include "appspawn_server.h"
#include "appspawn_service.h"
#include "securec.h"
#include "init_param.h"
#include "syspara/parameter.h"

int main(int argc, char *const argv[])
{
    if (argc <= 0) {
        return 0;
    }

    (void)signal(SIGPIPE, SIG_IGN);
    uint32_t argvSize = 0;
    int mode = 0;
    int32_t loglevel = GetIntParameter("persist.init.debug.loglevel", INIT_ERROR);
    SetInitLogLevel(loglevel);
    if ((argc > PARAM_INDEX) && (strcmp(argv[START_INDEX], "cold-start") == 0)) {
        argvSize = APP_LEN_PROC_NAME;
        mode = 1;
    } else {
        // calculate child process long name size
        uintptr_t start = (uintptr_t)argv[0];
        uintptr_t end = (uintptr_t)strchr(argv[argc - 1], 0);
        if (end == 0) {
            return -1;
        }
        argvSize = end - start;
        if (argvSize > APP_MSG_MAX_SIZE) {
            return -1;
        }
        int isRet = memset_s(argv[0], argvSize, 0, (size_t)argvSize) != EOK;
        APPSPAWN_CHECK(!isRet, return -EINVAL, "Failed to memset argv[0]");
        isRet = strncpy_s(argv[0], argvSize, APPSPAWN_SERVER_NAME, strlen(APPSPAWN_SERVER_NAME)) != EOK;
        APPSPAWN_CHECK(!isRet, return -EINVAL, "strncpy_s appspawn server name error: %d", errno);
    }

    APPSPAWN_LOGI("AppSpawnCreateContent argc %d mode %d %u", argc, mode, argvSize);
    AppSpawnContent *content = AppSpawnCreateContent(APPSPAWN_SOCKET_NAME, argv[0], argvSize, mode);
    APPSPAWN_CHECK(content != NULL, return -1, "Invalid content for appspawn");
    APPSPAWN_CHECK(content->initAppSpawn != NULL, return -1, "Invalid content for appspawn");
    APPSPAWN_CHECK(content->runAppSpawn != NULL, return -1, "Invalid content for appspawn");

    // set common operation
    content->loadExtendLib = LoadExtendLib;
    content->runChildProcessor = RunChildProcessor;
    content->setUidGidFilter = SetUidGidFilter;
    content->initAppSpawn(content);
    if (mode == 0) {
        SystemSetParameter("bootevent.appspawn.started", "true");
    }
    content->runAppSpawn(content, argc, argv);

    _Exit(0);
}
