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

#ifndef AUDIO_PATHSELECT_H
#define AUDIO_PATHSELECT_H

#include "audio_types.h"
#include "audio_common.h"
#include "audio_internal.h"
#include "cJSON.h"

#define CJSONFILE_CONFIG_PATH HDF_CONFIG_DIR"/audio_paths.json"

int32_t AudioPathSelGetConfToJsonObj();
int32_t AudioPathSelAnalysisJson(const AudioHandle adapterParam, enum AudioAdaptType adaptType);

#endif
