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
#ifndef FOUNDATION_RESOURCESCHEDULE_WORKSCHEDULER_IPOLICY_FILTER_H
#define FOUNDATION_RESOURCESCHEDULE_WORKSCHEDULER_IPOLICY_FILTER_H

#include <memory>

namespace OHOS {
namespace WorkScheduler {
class IPolicyFilter {
public:
    virtual ~IPolicyFilter() = default;
    /**
     * @brief Get policy max running.
     *
     * @return Res.
     */
    virtual int32_t GetPolicyMaxRunning();
};
} // namespace WorkScheduler
} // namespace OHOS
#endif // FOUNDATION_RESOURCESCHEDULE_WORKSCHEDULER_IPOLICY_FILTER_H