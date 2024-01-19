/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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

#ifndef HIPERF_MODULE_H
#define HIPERF_MODULE_H

#include "plugin_module_api.h"

int HiperfPluginSessionStart(const uint8_t* configData, const uint32_t configSize);

int HiperfRegisterWriterStruct(const WriterStruct* writer);

int HiperfPluginSessionStop(void);

#endif // HIPERF_MODULE_H