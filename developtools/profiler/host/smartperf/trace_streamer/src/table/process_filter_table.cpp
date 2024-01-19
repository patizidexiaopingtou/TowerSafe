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

#include "process_filter_table.h"

namespace SysTuning {
namespace TraceStreamer {
namespace {
enum Index { ID = 0, TYPE, NAME, INTERNAL_PID };
}
ProcessFilterTable::ProcessFilterTable(const TraceDataCache* dataCache) : TableBase(dataCache)
{
    tableColumn_.push_back(TableBase::ColumnInfo("id", "INTEGER"));
    tableColumn_.push_back(TableBase::ColumnInfo("type", "TEXT"));
    tableColumn_.push_back(TableBase::ColumnInfo("name", "TEXT"));
    tableColumn_.push_back(TableBase::ColumnInfo("ipid", "INTEGER"));
    tablePriKey_.push_back("id");
}

ProcessFilterTable::~ProcessFilterTable() {}

std::unique_ptr<TableBase::Cursor> ProcessFilterTable::CreateCursor()
{
    return std::make_unique<Cursor>(dataCache_, this);
}

ProcessFilterTable::Cursor::Cursor(const TraceDataCache* dataCache, TableBase* table)
    : TableBase::Cursor(dataCache, table, static_cast<uint32_t>(dataCache->GetConstProcessFilterData().Size())),
      processFilterObj_(dataCache->GetConstProcessFilterData())
{
}

ProcessFilterTable::Cursor::~Cursor() {}

int ProcessFilterTable::Cursor::Column(int col) const
{
    switch (col) {
        case ID:
            sqlite3_result_int64(context_, static_cast<sqlite3_int64>(processFilterObj_.IdsData()[CurrentRow()]));
            break;
        case TYPE:
            sqlite3_result_text(context_, "process_filter", STR_DEFAULT_LEN, nullptr);
            break;
        case NAME: {
            DataIndex stringIdentity = static_cast<DataIndex>(processFilterObj_.NamesData()[CurrentRow()]);
            sqlite3_result_text(context_, dataCache_->GetDataFromDict(stringIdentity).c_str(), STR_DEFAULT_LEN,
                                nullptr);
            break;
        }
        case INTERNAL_PID:
            sqlite3_result_int64(context_, static_cast<sqlite3_int64>(processFilterObj_.UpidsData()[CurrentRow()]));
            break;
        default:
            TS_LOGF("Unregistered column : %d", col);
            break;
    }
    return SQLITE_OK;
}
} // namespace TraceStreamer
} // namespace SysTuning
