/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
#ifndef BASE_STARTUP_APPSPAWN_MESSAGE_H
#define BASE_STARTUP_APPSPAWN_MESSAGE_H
#include <stdint.h>
#include <stdlib.h>

#include "appspawn_server.h"
#include "appspawn_service.h"

#ifdef __cplusplus
#if __cplusplus
extern "C" {
#endif /* __cplusplus */
#endif /* __cplusplus */

typedef struct {
    char *bundleName;
    char *identityID;
    int uID;
    int gID;
    unsigned int *caps;
    unsigned int capsCnt;
} MessageSt;

typedef struct {
    AppSpawnClient client;
    MessageSt message;
} AppSpawnClientLite;

typedef struct {
    AppSpawnContent content;
} AppSpawnContentLite;

void SetContentFunction(AppSpawnContent *content);
int SplitMessage(const char *msg, unsigned int msgLen, MessageSt *msgSt);
void FreeMessageSt(MessageSt *targetSt);

#ifdef __cplusplus
#if __cplusplus
}
#endif
#endif

#endif  // BASE_STARTUP_APPSPAWN_MESSAGE_H
