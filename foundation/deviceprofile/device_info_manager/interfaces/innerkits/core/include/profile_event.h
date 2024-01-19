/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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

#ifndef OHOS_DEVICE_PROFILE_PROFILE_EVENT_H
#define OHOS_DEVICE_PROFILE_PROFILE_EVENT_H

#include <bitset>

namespace OHOS {
namespace DeviceProfile {
enum ProfileEvent : uint32_t {
    EVENT_UNKNOWN = 0,
    EVENT_SYNC_COMPLETED = 1,
    EVENT_PROFILE_CHANGED = 2,
    EVENT_PROFILE_END,
};

using ProfileEvents = std::bitset<EVENT_PROFILE_END>;
}  // namespace DeviceProfile
}  // namespace OHOS
#endif  // OHOS_DEVICE_PROFILE_PROFILE_EVENT_H