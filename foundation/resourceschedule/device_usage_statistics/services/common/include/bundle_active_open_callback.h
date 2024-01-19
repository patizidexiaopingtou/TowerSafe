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

#ifndef BUNDLE_ACTIVE_OPEN_CALLBACK_H
#define BUNDLE_ACTIVE_OPEN_CALLBACK_H

#include <string>

#include "rdb_open_callback.h"
#include "rdb_errno.h"

namespace OHOS {
namespace DeviceUsageStats {
class BundleActiveOpenCallback : public NativeRdb::RdbOpenCallback {
public:
    BundleActiveOpenCallback();
    ~BundleActiveOpenCallback();
    int32_t OnCreate(NativeRdb::RdbStore &rdbStore) override;
    int32_t OnUpgrade(NativeRdb::RdbStore &rdbStore, int32_t oldVersion, int32_t newVersion) override;
};
}  // namespace DeviceUsageStats
}  // namespace OHOS
#endif  // BUNDLE_ACTIVE_OPEN_CALLBACK_H

