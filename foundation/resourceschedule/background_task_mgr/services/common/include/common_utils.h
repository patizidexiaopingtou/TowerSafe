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

#ifndef FOUNDATION_RESOURCESCHEDULE_BACKGROUND_TASK_MGR_CONTINUOUS_TASK_COMMON_UTILS_H
#define FOUNDATION_RESOURCESCHEDULE_BACKGROUND_TASK_MGR_CONTINUOUS_TASK_COMMON_UTILS_H

#include "nlohmann/json.hpp"

namespace OHOS {
namespace BackgroundTaskMgr {
class CommonUtils {
public:
    static bool CheckJsonValue(const nlohmann::json &value, std::initializer_list<std::string> params)
    {
        for (auto param : params) {
            if (value.find(param) == value.end()) {
                return false;
            }
        }
        return true;
    }

public:
    static constexpr int32_t jsonFormat_ = 4;
};
}  // namespace BackgroundTaskMgr
}  // namespace OHOS
#endif  // FOUNDATION_RESOURCESCHEDULE_BACKGROUND_TASK_MGR_CONTINUOUS_TASK_COMMON_UTILS_H