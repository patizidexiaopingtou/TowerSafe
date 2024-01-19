/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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

#ifndef ROOT_ITERATOR_ENTITY_H
#define ROOT_ITERATOR_ENTITY_H

#include <mutex>
#include <vector>

#include "file_access_extension_info.h"
#include "file_access_helper.h"

namespace OHOS {
namespace FileAccessFwk {
struct RootIteratorEntity {
    FileAccessHelper *fileAccessHelper { nullptr };
    std::vector<RootInfo> devVec;
    std::mutex entityOperateMutex;
    uint64_t pos { 0 };
};
} // namespace FileAccessFwk
} // namespace OHOS
#endif // ROOT_ITERATOR_ENTITY_H