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

#ifndef BUNDLE_ACTIVE_ACCOUNT_HELPER_H
#define BUNDLE_ACTIVE_ACCOUNT_HELPER_H

#include "errors.h"
#ifdef OS_ACCOUNT_PART_ENABLED
#include "os_account_manager.h"
#endif // OS_ACCOUNT_PART_ENABLED

namespace OHOS {
namespace DeviceUsageStats {
class BundleActiveAccountHelper {
public:
    static ErrCode GetUserId(const int32_t uid, int32_t& userId);
};
}  // namespace DeviceUsageStats
}  // namespace OHOS
#endif  // BUNDLE_ACTIVE_ACCOUNT_HELPER_H

