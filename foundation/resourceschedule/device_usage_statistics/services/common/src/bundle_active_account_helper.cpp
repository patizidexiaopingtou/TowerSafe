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

#include "bundle_active_account_helper.h"

namespace OHOS {
namespace DeviceUsageStats {
#ifndef OS_ACCOUNT_PART_ENABLED
constexpr int32_t UID_TRANSFORM_DIVISOR = 200000;
#endif
ErrCode BundleActiveAccountHelper::GetUserId(const int32_t uid, int32_t& userId)
{
#ifdef OS_ACCOUNT_PART_ENABLED
    ErrCode ret = OHOS::AccountSA::OsAccountManager::GetOsAccountLocalIdFromUid(uid, userId);
#else // OS_ACCOUNT_PART_ENABLED
    ErrCode ret = ERR_OK;
    userId = uid / UID_TRANSFORM_DIVISOR;
#endif // OS_ACCOUNT_PART_ENABLED
    return ret;
}
}  // namespace DeviceUsageStats
}  // namespace OHOS

