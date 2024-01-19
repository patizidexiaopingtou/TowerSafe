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

#ifndef GET_SELF_PERMISSIONS_H
#define GET_SELF_PERMISSIONS_H

#include <string>
#include <vector>

namespace OHOS {
namespace StorageManager {
class PermissionUtilsTest {
public:
    static void SetAccessTokenPermission(const std::string &processName,
        const std::vector<std::string> &permission, uint64_t &tokenId);
};
} // namespace StorageManager
} // namespace OHOS
#endif // GET_SELF_PERMISSIONS_H
