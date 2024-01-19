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

#ifndef TABLE_INDEX_MAP_H
#define TABLE_INDEX_MAP_H

#include <cstdint>
#include <deque>
#include <functional>
#include <sqlite3.h>
#include <vector>
#include "ts_common.h"

namespace SysTuning {
namespace TraceStreamer {
class IndexMap {
public:
    IndexMap() {}
    ~IndexMap() {}

    IndexMap(TableRowId start, TableRowId end);
    void CovertToIndexMap();
    void Sort();
    void Print();
    void Init();
    void Merge(IndexMap * other);
    void FilterId(unsigned char op, sqlite3_value* argv);
    void FilterTS(unsigned char op, sqlite3_value* argv, const std::deque<InternalTime>& times);
    template <class T>
    void MixRange(unsigned char op, T value, const std::deque<T>& dataQueue)
    {
        filters_++;
        auto invalidValue = std::numeric_limits<T>::max();
        bool remove = false;
        if (HasData()) {
            CovertToIndexMap();
            remove = true;
        }
        auto size = dataQueue.size();
        rowIndexBak_.clear();
        bool changed = false;
        switch (op) {
            case SQLITE_INDEX_CONSTRAINT_EQ:
                if (remove) {
                    for (auto i = rowIndex_.begin(); i != rowIndex_.end();) {
                        if (dataQueue[*i] != value) {
                            i++;
                        } else {
                            changed = true;
                            rowIndexBak_.push_back(*i);
                            i++;
                        }
                    }
                    if (changed) {
                        rowIndex_ = rowIndexBak_;
                    }
                } else {
                    for (auto i = 0; i < size; i++) {
                        if (dataQueue[i] == value) {
                            rowIndex_.push_back(i);
                        }
                    }
                }
                indexType_ = INDEX_TYPE_OUTER_INDEX;
                FixSize();
                break;
            case SQLITE_INDEX_CONSTRAINT_NE:
                if (remove) {
                    for (auto i = rowIndex_.begin(); i != rowIndex_.end();) {
                        if (dataQueue[*i] == value) {
                            i++;
                        } else {
                            changed = true;
                            rowIndexBak_.push_back(*i);
                            i++;
                        }
                    }
                    if (changed) {
                        rowIndex_ = rowIndexBak_;
                    }
                } else {
                    for (auto i = 0; i < size; i++) {
                        if (dataQueue[i] != value) {
                            rowIndex_.push_back(i);
                        }
                    }
                }
                indexType_ = INDEX_TYPE_OUTER_INDEX;
                FixSize();
                break;
            case SQLITE_INDEX_CONSTRAINT_ISNULL:
                if (remove) {
                    for (auto i = rowIndex_.begin(); i != rowIndex_.end();) {
                        if (dataQueue[*i] != invalidValue) {
                            i++;
                        } else {
                            changed = true;
                            rowIndexBak_.push_back(*i);
                            i++;
                        }
                    }
                    if (changed) {
                        rowIndex_ = rowIndexBak_;
                    }
                } else {
                    for (auto i = 0; i < size; i++) {
                        if (dataQueue[i] == invalidValue) {
                            rowIndex_.push_back(i);
                        }
                    }
                }
                indexType_ = INDEX_TYPE_OUTER_INDEX;
                FixSize();
                break;
            case SQLITE_INDEX_CONSTRAINT_ISNOTNULL:
                if (remove) {
                    for (auto i = rowIndex_.begin(); i != rowIndex_.end();) {
                        if (dataQueue[*i] == invalidValue) {
                            i++;
                        } else {
                            changed = true;
                            rowIndexBak_.push_back(*i);
                            i++;
                        }
                    }
                    if (changed) {
                        rowIndex_ = rowIndexBak_;
                    }
                } else {
                    for (auto i = 0; i < size; i++) {
                        if (dataQueue[i] != invalidValue) {
                            rowIndex_.push_back(i);
                        }
                    }
                }
                indexType_ = INDEX_TYPE_OUTER_INDEX;
                FixSize();
                break;
            case SQLITE_INDEX_CONSTRAINT_GT:
                if (remove) {
                    for (auto i = rowIndex_.begin(); i != rowIndex_.end();) {
                        if (dataQueue[*i] <= value) {
                            i++;
                        } else {
                            changed = true;
                            rowIndexBak_.push_back(*i);
                            i++;
                        }
                    }
                    if (changed) {
                        rowIndex_ = rowIndexBak_;
                    }
                } else {
                    for (auto i = 0; i < size; i++) {
                        if (dataQueue[i] > value) {
                            rowIndex_.push_back(i);
                        }
                    }
                }
                indexType_ = INDEX_TYPE_OUTER_INDEX;
                FixSize();
                break;
            case SQLITE_INDEX_CONSTRAINT_GE:
                if (remove) {
                    for (auto i = rowIndex_.begin(); i != rowIndex_.end();) {
                        if (dataQueue[*i] < value) {
                            i++;
                        } else {
                            changed = true;
                            rowIndexBak_.push_back(*i);
                            i++;
                        }
                    }
                    if (changed) {
                        rowIndex_ = rowIndexBak_;
                    }
                } else {
                    for (auto i = 0; i < size; i++) {
                        if (dataQueue[i] >= invalidValue) {
                            rowIndex_.push_back(i);
                        }
                    }
                }
                indexType_ = INDEX_TYPE_OUTER_INDEX;
                FixSize();
                break;
            case SQLITE_INDEX_CONSTRAINT_LE:
                if (remove) {
                    for (auto i = rowIndex_.begin(); i != rowIndex_.end();) {
                        if (dataQueue[*i] > value) {
                            i++;
                        } else {
                            changed = true;
                            rowIndexBak_.push_back(*i);
                            i++;
                        }
                    }
                    if (changed) {
                        rowIndex_ = rowIndexBak_;
                    }
                } else {
                    for (auto i = 0; i < size; i++) {
                        if (dataQueue[i] < invalidValue) {
                            rowIndex_.push_back(i);
                        }
                    }
                }
                indexType_ = INDEX_TYPE_OUTER_INDEX;
                FixSize();
                break;
            case SQLITE_INDEX_CONSTRAINT_LT:
                if (remove) {
                    for (auto i = rowIndex_.begin(); i != rowIndex_.end();) {
                        if (dataQueue[*i] >= value) {
                            i++;
                        } else {
                            changed = true;
                            rowIndexBak_.push_back(*i);
                            i++;
                        }
                    }
                    if (changed) {
                        rowIndex_ = rowIndexBak_;
                    }
                } else {
                    for (auto i = 0; i < size; i++) {
                        if (dataQueue[i] < invalidValue) {
                            rowIndex_.push_back(i);
                        }
                    }
                }
                indexType_ = INDEX_TYPE_OUTER_INDEX;
                FixSize();
                break;
            default:
                break;
        } // end of switch (op)
        empty_ = false;
    }
    void FixSize()
    {
        if (indexType_ == INDEX_TYPE_OUTER_INDEX)
        {
            end_ = rowIndex_.size();
            current_ = 0;
        }
    }
    void Remove(TableRowId row)
    {
        std::remove(rowIndex_.begin(), rowIndex_.end(), row);
    }
    void Set(TableRowId start, TableRowId end)
    {
        if (indexType_ == INDEX_TYPE_ID) {
            end_ = std::min(end_, end);
            current_ = start_ = std::max(start_, start);
        }
    }

    size_t Size() const;

    void Next();

    bool Eof() const;

    TableRowId CurrentRow() const;

    void SortBy(bool desc);
    void Intersect(TableRowId start, TableRowId end);

    // the follow functions require that thecolData is sotred
    template<typename Row, typename Val, typename GetV = const Val&(const Row&)>
    void IntersectabcEqual(const std::deque<Row>& rows, Val v, GetV getValue)
    {
        auto start = std::lower_bound(rows.begin() + start_, rows.begin() + end_, v);
        auto end = std::upper_bound(start, rows.begin() + end_, v);
        auto newStart = std::distance(rows.begin(), start);
        auto newEnd = std::distance(rows.begin(), end);
        Intersect(newStart, newEnd);
        return;
    }

    template<typename Row, typename Val, typename GetV = const Val&(const Row&)>
    void IntersectGreaterEqual(const std::deque<Row>& rows, Val v, GetV getValue)
    {
        auto start = std::lower_bound(rows.begin() + start_, rows.begin() + end_, v,
                                      [&](const Row& row, const Val& v) { return v > getValue(row); });
        auto newStart = std::distance(rows.begin(), start);
        Intersect(newStart, INVALID_INT32);
        return;
    }

    template<typename Row, typename Val, typename GetV = const Val&(const Row&)>
    void IntersectLessEqual(const std::deque<Row>& rows, Val v, GetV getValue)
    {
        auto end = std::upper_bound(rows.begin() + start_, rows.begin() + end_, v,
            [&](const Row& row, const Val& v) { return v > getValue(row); });
        auto newEnd = std::distance(rows.begin(), end);
        Intersect(0, newEnd);
        return;
    }
    template<typename T>
    void RemoveNullElements(const std::deque<T>& rows, T v)
    {
        auto invalidValue = std::numeric_limits<T>::max();
        bool remove = false;
        if (HasData()) {
            CovertToIndexMap();
            remove = true;
        }

        if (remove) {
            for (auto i = rowIndex_.begin(); i != rowIndex_.end();) {
                if (rows[*i] == invalidValue) {
                    i = rowIndex_.erase(i);
                } else {
                    i++;
                }
            }
        } else {
            auto size = rows.size();
            for (auto i = 0; i < size; i++) {
                if (rows[i] != invalidValue) {
                    rowIndex_.push_back(i);
                }
            }
        }
        indexType_ = INDEX_TYPE_OUTER_INDEX;
        FixSize();
        return;
    }
    bool HasData();
    std::vector<TableRowId> rowIndex_ = {};
    std::vector<TableRowId> rowIndexBak_ = {};
private:
    TableRowId end_ = INVALID_INT32;
    TableRowId current_ = 0;
    TableRowId start_ = 0;
    enum FindIndexType {
        INDEX_TYPE_ID,
        INDEX_TYPE_OUTER_INDEX,
    };
    FindIndexType indexType_ = INDEX_TYPE_ID;
    uint32_t indexSize_ = 0;
    uint32_t index_ = 0;

    enum IndexType {
        COMPACT,
        SPARSE
    };
    uint8_t type_ = COMPACT;
    bool empty_ = true;
    bool desc_ = false;
    bool converted_ = false;
    uint8_t filters_ = 0;
    bool intersectEable_ = false;
};
} // namespace TraceStreamer
} // namespace SysTuning

#endif // TABLE_INDEX_MAP_H
