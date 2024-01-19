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

#include "meta_table.h"

namespace SysTuning {
namespace TraceStreamer {
namespace {
enum Index { NAMEINDEX = 0, VALUE };
}
MetaTable::MetaTable(const TraceDataCache* dataCache) : TableBase(dataCache)
{
    tableColumn_.push_back(TableBase::ColumnInfo("name", "TEXT"));
    tableColumn_.push_back(TableBase::ColumnInfo("value", "TEXT"));
    tablePriKey_.push_back("name");
}

MetaTable::~MetaTable() {}

std::unique_ptr<TableBase::Cursor> MetaTable::CreateCursor()
{
    return std::make_unique<Cursor>(dataCache_, this);
}

MetaTable::Cursor::Cursor(const TraceDataCache* dataCache, TableBase* table)
    : TableBase::Cursor(dataCache, table, METADATA_ITEM_MAX)
{
}

MetaTable::Cursor::~Cursor() {}

int MetaTable::Cursor::Column(int column) const
{
    switch (column) {
        case NAMEINDEX:
            sqlite3_result_text(context_, dataCache_->GetConstMetaData().Name(CurrentRow()).c_str(), STR_DEFAULT_LEN,
                                nullptr);
            break;
        case VALUE:
            sqlite3_result_text(context_, dataCache_->GetConstMetaData().Value(CurrentRow()).c_str(), STR_DEFAULT_LEN,
                                nullptr);
            break;
        default:
            TS_LOGF("Unregistered column : %d", column);
            break;
    }
    return SQLITE_OK;
}
} // namespace TraceStreamer
} // namespace SysTuning
