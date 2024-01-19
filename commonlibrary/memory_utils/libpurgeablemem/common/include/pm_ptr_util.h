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

#ifndef OHOS_UTILS_MEMORY_LIBPURGEABLEMEM_COMMON_INCLUDE_PM_PTR_UTIL_H
#define OHOS_UTILS_MEMORY_LIBPURGEABLEMEM_COMMON_INCLUDE_PM_PTR_UTIL_H

#include "hilog/log_c.h"

#define IF_NULL_LOG_ACTION(pointer, log, action)       \
    do {                                               \
        if (!(pointer)) {                              \
            HILOG_ERROR(LOG_CORE, "%{public}s:", log); \
            action;                                    \
        }                                              \
    } while (0)

#define IF_NULL_LOG(pointer, log)                      \
    do {                                               \
        if (!(pointer)) {                              \
            HILOG_ERROR(LOG_CORE, "%{public}s:", log); \
        }                                              \
    } while (0)

#endif /* OHOS_UTILS_MEMORY_LIBPURGEABLEMEM_COMMON_INCLUDE_PM_PTR_UTIL_H */
