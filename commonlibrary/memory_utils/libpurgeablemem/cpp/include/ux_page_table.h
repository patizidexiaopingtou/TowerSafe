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

#ifndef OHOS_UTILS_MEMORY_LIBPURGEABLEMEM_CPP_INCLUDE_UX_PAGE_TABLE_H
#define OHOS_UTILS_MEMORY_LIBPURGEABLEMEM_CPP_INCLUDE_UX_PAGE_TABLE_H

#include <string> /* std::string */

#include "../../common/include/ux_page_table_c.h" /* UxPageTableStruct */

namespace OHOS {
namespace PurgeableMem {
class UxPageTable {
public:
    UxPageTable(uint64_t startAddr, size_t size);
    ~UxPageTable();

private:
    UxPageTableStruct *uxpt_;
    friend class PurgeableMem;
    /* only called by its friend */
    void GetUxpte(uint64_t addr, size_t len);
    void PutUxpte(uint64_t addr, size_t len);
    bool CheckPresent(uint64_t addr, size_t len);
    std::string ToString() const;
};
} /* namespace PurgeableMem */
} /* namespace OHOS */
#endif /* OHOS_UTILS_MEMORY_LIBPURGEABLEMEM_CPP_INCLUDE_UX_PAGE_TABLE_H */
