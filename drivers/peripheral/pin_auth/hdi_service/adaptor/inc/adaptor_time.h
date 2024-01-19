/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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

#ifndef ADAPTOR_TIME_H
#define ADAPTOR_TIME_H

#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif // __cplusplus

uint64_t GetSystemTime(void);
uint64_t GetRtcTime(void);

#ifdef __cplusplus
}
#endif // __cplusplus
#endif // ADAPTOR_TIME_H