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

#include "taskpool.h"

/*
 * module define
 */
static napi_module g_taskPoolModule = {
    .nm_version = 1,
    .nm_flags = 0,
    .nm_filename = nullptr,
    .nm_register_func = Commonlibrary::Concurrent::TaskPoolModule::TaskPool::InitTaskPool,
    .nm_modname = "taskpool",
    .nm_priv = reinterpret_cast<void*>(0),
    .reserved = { 0 },
};

/*
 * module register
 */
extern "C" __attribute__((constructor)) void Register()
{
    napi_module_register(&g_taskPoolModule);
}