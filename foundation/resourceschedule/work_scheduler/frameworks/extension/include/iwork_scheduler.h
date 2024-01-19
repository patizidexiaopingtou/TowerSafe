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

#ifndef OHOS_ZIDL_I_WORK_SCHED_H
#define OHOS_ZIDL_I_WORK_SCHED_H

#include <string_ex.h>
#include <iremote_broker.h>
#include "work_info.h"

namespace OHOS {
namespace WorkScheduler {
class IWorkScheduler : public IRemoteBroker {
public:
    DECLARE_INTERFACE_DESCRIPTOR(u"OHOS.WorkScheduler.IWorkScheduler");
    /**
     * @brief The OnWorkStart callback.
     *
     * @param workInfo The info of work.
     */
    virtual void OnWorkStart(WorkInfo& workInfo) = 0;
    /**
     * @brief The OnWorkStop callback.
     *
     * @param workInfo The info of work.
     */
    virtual void OnWorkStop(WorkInfo& workInfo) = 0;
};
} // namespace WorkScheduler
} // namespace OHOS
#endif // OHOS_ZIDL_I_WORK_SCHED_H