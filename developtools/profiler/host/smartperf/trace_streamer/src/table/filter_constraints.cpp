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

#include "filter_constraints.h"

#include "log.h"

namespace SysTuning {
namespace TraceStreamer {
void FilterConstraints::AddConstraint(int idx, int col, unsigned char op, bool isSupport)
{
    Constraint& c = constraints_.emplace_back();
    c.idxInaConstraint = idx;
    c.col = col;
    c.op = op;
    c.isSupport = isSupport;
}

void FilterConstraints::UpdateConstraint(int idx, bool isSupport)
{
    if (idx >= 0 && static_cast<size_t>(idx) < constraints_.size()) {
        constraints_[idx].isSupport = isSupport;
    }
}

void FilterConstraints::AddOrderBy(int col, unsigned char desc)
{
    OrderBy& o = orderBys_.emplace_back();
    o.iColumn = col;
    o.desc = desc;
}

void FilterConstraints::Clear()
{
    constraints_.clear();
    orderBys_.clear();
}

void FilterConstraints::ToString(std::string& idxStr) const
{
    idxStr.clear();
    idxStr.reserve(idxStrSize_);
    idxStr = "C" + std::to_string(constraints_.size());
    for (size_t i = 0; i < constraints_.size(); i++) {
        idxStr += " " + std::to_string(constraints_[i].col);
        idxStr += " " + std::to_string(constraints_[i].op);
    }
    idxStr += " O" + std::to_string(orderBys_.size());
    for (size_t i = 0; i < orderBys_.size(); i++) {
        idxStr += " " + std::to_string(orderBys_[i].iColumn);
        idxStr += " " + std::to_string(orderBys_[i].desc);
    }
}

void FilterConstraints::FromString(const std::string& idxStr)
{
    const char* p = static_cast<const char*>(idxStr.c_str());
    char* pNext = nullptr;
    TS_ASSERT(*p == 'C');
    errno = 0;
    int constraintCount = static_cast<int>(strtol(p + 1, &pNext, 10));
    if (errno != 0) {
        TS_LOGW("strtol failed!");
        return;
    }
    TS_ASSERT(p != pNext);
    for (int i = 0; i < constraintCount; i++) {
        p = pNext;
        errno = 0;
        int col = static_cast<int>(strtol(p, &pNext, 10));
        if (errno != 0) {
            TS_LOGW("strtol failed!");
            return;
        }
        TS_ASSERT(p != pNext);
        p = pNext;
        errno = 0;
        unsigned char op = static_cast<unsigned char>(strtol(p, &pNext, 10));
        if (errno != 0) {
            TS_LOGW("strtol failed!");
            return;
        }
        TS_ASSERT(p != pNext);

        AddConstraint(i, col, op);
    }

    pNext++; // jump the ' '
    p = pNext;
    TS_ASSERT(*p == 'O');
    errno = 0;
    int orderbyCount = static_cast<int>(strtol(p + 1, &pNext, 10));
    if (errno != 0) {
        TS_LOGW("strtol failed!");
        return;
    }
    TS_ASSERT(p != pNext);
    for (int i = 0; i < orderbyCount; i++) {
        p = pNext;
        errno = 0;
        int col = static_cast<int>(strtol(p, &pNext, 10));
        if (errno != 0) {
            TS_LOGW("strtol failed!");
            return;
        }
        TS_ASSERT(p != pNext);
        p = pNext;
        errno = 0;
        unsigned char desc = static_cast<unsigned char>(strtol(p, &pNext, 10));
        if (errno != 0) {
            TS_LOGW("strtol failed!");
            return;
        }
        TS_ASSERT(p != pNext);

        AddOrderBy(col, desc);
    }
}
} // namespace TraceStreamer
} // namespace SysTuning
