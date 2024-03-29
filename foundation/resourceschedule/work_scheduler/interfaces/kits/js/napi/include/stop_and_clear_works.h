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
#ifndef FOUNDATION_RESOURCESCHEDULE_WORKSCHEDULER_INTERFACES_KITS_NAPI_INCLUDE_STOP_AND_CLEAR_WORKS
#define FOUNDATION_RESOURCESCHEDULE_WORKSCHEDULER_INTERFACES_KITS_NAPI_INCLUDE_STOP_AND_CLEAR_WORKS

#include "napi/native_api.h"
#include "napi/native_node_api.h"

namespace OHOS {
namespace WorkScheduler {
    napi_value StopAndClearWorks(napi_env env, napi_callback_info info);

    napi_value StopAndClearWorksWithRet(napi_env env, napi_callback_info info);
}
}
#endif // FOUNDATION_RESOURCESCHEDULE_WORKSCHEDULER_INTERFACES_KITS_NAPI_INCLUDE_STOP_AND_CLEAR_WORKS