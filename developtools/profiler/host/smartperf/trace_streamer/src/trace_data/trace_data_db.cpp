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

#include "trace_data_db.h"
#include <chrono>
#include <cmath>
#include <cstdio>
#include <cstring>
#include <fcntl.h>
#include <functional>
#include <sqlite3.h>
#include <string_view>
#include <unistd.h>

#include "codec_cov.h"
#include "ext/sqlite_ext_funcs.h"
#include "file.h"
#include "log.h"
#include "string_help.h"

const int ONCE_MAX_MB = 1024 * 1024 * 4;
namespace SysTuning {
namespace TraceStreamer {
#define UNUSED(expr)  \
    do {              \
        static_cast<void>(expr); \
    } while (0)
using namespace SysTuning::base;
TraceDataDB::TraceDataDB() : db_(nullptr)
{
    if (sqlite3_threadsafe() > 0) {
        int retCode = sqlite3_config(SQLITE_CONFIG_SERIALIZED);
        if (retCode == SQLITE_OK) {
            TS_LOGI("Can now use sqlite on multiple threads, using the same connection");
        } else {
            TS_LOGE("setting sqlite thread safe mode to serialized failed!!! return code: %d", retCode);
        }
    } else {
        TS_LOGE("Your SQLite database is not compiled to be threadsafe.");
    }
    if (sqlite3_open(":memory:", &db_)) {
        TS_LOGF("open :memory db failed");
    }
    ts_create_extend_function(db_);
}

TraceDataDB::~TraceDataDB()
{
    sqlite3_close(db_);
}

void TraceDataDB::AppendNewTable(std::string tableName)
{
    internalTables_.push_back(tableName);
}
void TraceDataDB::EnableMetaTable(bool enabled)
{
    exportMetaTable_ = enabled;
}
int TraceDataDB::ExportDatabase(const std::string& outputName)
{
    {
        int fd(base::OpenFile(outputName, O_CREAT | O_RDWR, 0600));
        if (!fd) {
            fprintf(stdout, "Failed to create file: %s", outputName.c_str());
            return 1;
        }
        auto ret = ftruncate(fd, 0);
        UNUSED(ret);
        close(fd);
    }

    std::string attachSql("ATTACH DATABASE '" + outputName + "' AS systuning_export");
#ifdef _WIN32
    if (!base::GetCoding(reinterpret_cast<const uint8_t*>(attachSql.c_str()), attachSql.length())) {
        attachSql = base::GbkToUtf8(attachSql.c_str());
    }
#endif
    ExecuteSql(attachSql);

    for (auto itor = internalTables_.begin(); itor != internalTables_.end(); itor++) {
#ifndef USE_VTABLE
        if (*itor == "_meta" && !exportMetaTable_) {
            continue;
        } else {
            std::string exportSql("CREATE TABLE systuning_export." + (*itor).substr(1, -1) + " AS SELECT * FROM " +
                                  *itor);
            ExecuteSql(exportSql);
        }
#else
        if (*itor == "meta" && !exportMetaTable_) {
            continue;
        } else {
            std::string exportSql("CREATE TABLE systuning_export." + (*itor) + " AS SELECT * FROM " + *itor);
            ExecuteSql(exportSql);
        }
#endif
    }
    std::string createArgsView =
        "create view systuning_export.args_view AS select A.argset, V2.data as keyName, A.id, D.desc, (case when "
        "A.datatype==1 then V.data else A.value end) as strValue from args as A left join data_type as D on (D.typeId "
        "= A.datatype) left join data_dict as V on V.id = A.value left join data_dict as V2 on V2.id = A.key";
    ExecuteSql(createArgsView);
    std::string updateProcessName =
        "update process set name =  (select name from thread t where t.ipid = process.id and t.name is not null and "
        "is_main_thread = 1)";
    ExecuteSql(updateProcessName);
    std::string detachSql("DETACH DATABASE systuning_export");
    ExecuteSql(detachSql);
    return 0;
}
void TraceDataDB::Prepare()
{
    if (pared_) {
        return;
    }
    pared_ = true;
#ifndef USE_VTABLE
    for (auto itor = internalTables_.begin(); itor != internalTables_.end(); itor++) {
        std::string exportSql("CREATE TABLE " + (*itor).substr(1, -1) + " AS SELECT * FROM " + *itor);
        ExecuteSql(exportSql);
    }
#endif
    std::string createArgsView =
        "create view args_view AS select A.argset, V2.data as keyName, A.id, D.desc, (case when "
        "A.datatype==1 then V.data else A.value end) as strValue from args as A left join data_type as D on "
        "(D.typeId "
        "= A.datatype) left join data_dict as V on V.id = A.value left join data_dict as V2 on V2.id = A.key";
    ExecuteSql(createArgsView);

    std::string updateProcessNewName =
        "update process set name =  (select name from thread t where t.ipid = process.id and t.name is not "
        "null and "
        "is_main_thread = 1)";
    ExecuteSql(updateProcessNewName);
}
void TraceDataDB::ExecuteSql(const std::string_view& sql)
{
    sqlite3_stmt* stmt = nullptr;
    int ret = sqlite3_prepare_v2(db_, sql.data(), static_cast<int>(sql.size()), &stmt, nullptr);

    while (!ret) {
        int err = sqlite3_step(stmt);
        if (err == SQLITE_ROW) {
            continue;
        }
        if (err == SQLITE_DONE) {
            break;
        }
        ret = err;
    }

    sqlite3_finalize(stmt);
}
int TraceDataDB::SearchData()
{
    Prepare();
    std::string line;
    bool printResult = false;
    for (;;) {
        std::cout << "> ";
        getline(std::cin, line);
        if (line.empty()) {
            std::cout << "If you want to quit either type -q or press CTRL-Z" << std::endl;
            continue;
        }
        if (!line.compare("-q") || !line.compare("-quit")) {
            break;
        } else if (!line.compare("-e")) {
            TS_LOGI("the db file will be at current folder, the name is default.db");
            return ExportDatabase("default.db");
        } else if (!line.compare("-help") || !line.compare("-h")) {
            std::cout << "use info" << std::endl;
            continue;
        } else if (!line.compare("-p")) {
            std::cout << "will print result of query" << std::endl;
            printResult = true;
            continue;
        } else if (!line.compare("-up")) {
            std::cout << "will not print result of query" << std::endl;
            printResult = false;
            continue;
        } else if (line.find("-c:") == 0) {
            line = line.substr(strlen("-c:"));
            if (OperateDatabase(line) == SQLITE_OK) {
                printf("operate SQL success\n");
            }
            continue;
        }

        using namespace std::chrono;
        const auto start = steady_clock::now();
        int rowCount = SearchDatabase(line, printResult);
        std::chrono::nanoseconds searchDur = duration_cast<nanoseconds>(steady_clock::now() - start);
        printf("\"%s\"\n\tused %.3fms row: %d\n", line.c_str(), searchDur.count() / 1E6, rowCount);
    }
    return 0;
}
int TraceDataDB::SearchDatabase(const std::string& sql, bool print)
{
    Prepare();
    int rowCount = 0;
    sqlite3_stmt* stmt = nullptr;
    int ret = sqlite3_prepare_v2(db_, sql.c_str(), static_cast<int>(sql.size()), &stmt, nullptr);
    if (ret != SQLITE_OK) {
        TS_LOGE("sqlite3_prepare_v2(%s) failed: %d:%s", sql.c_str(), ret, sqlite3_errmsg(db_));
        return 0;
    }

    int colCount = sqlite3_column_count(stmt);
    if (colCount == 0) {
        TS_LOGI("sqlite3_column_count(%s) no column", sql.c_str());
        sqlite3_finalize(stmt);
        return 0;
    }
    if (print) {
        for (int i = 0; i < colCount; i++) {
            printf("%s\t", sqlite3_column_name(stmt, i));
        }
        printf("\n");
    }

    while (sqlite3_step(stmt) == SQLITE_ROW) {
        rowCount++;
        for (int i = 0; i < colCount; i++) {
            const char* p = reinterpret_cast<const char*>(sqlite3_column_text(stmt, i));
            int type = sqlite3_column_type(stmt, i);
            if (!print) {
                continue;
            }
            if (p == nullptr) {
                printf("null\t");
                continue;
            }
            if (type == SQLITE_TEXT) {
                printf("\"%s\"\t", p);
            } else {
                printf("%s\t", p);
            }
        }
        if (print) {
            printf("\n");
        }
    }
    sqlite3_finalize(stmt);
    return rowCount;
}
int TraceDataDB::OperateDatabase(const std::string& sql)
{
    Prepare();
    char* errmsg = nullptr;
    int ret = sqlite3_exec(db_, sql.c_str(), NULL, NULL, &errmsg);
    if (ret != SQLITE_OK && errmsg) {
        TS_LOGE("sqlite3_exec(%s) failed: %d:%s", sql.c_str(), ret, errmsg);
        sqlite3_free(errmsg);
    }
    return ret;
}
int TraceDataDB::SearchDatabase(const std::string& sql, ResultCallBack resultCallBack)
{
    Prepare();
    sqlite3_stmt* stmt = nullptr;
    int ret = sqlite3_prepare_v2(db_, sql.c_str(), static_cast<int>(sql.size()), &stmt, nullptr);
    if (ret != SQLITE_OK) {
        resultCallBack("false\r\n", SEND_FINISH);
        TS_LOGE("sqlite3_prepare_v2(%s) failed: %d:%s", sql.c_str(), ret, sqlite3_errmsg(db_));
        return ret;
    }
    if (!resultCallBack) {
        return ret;
    }

    std::string res = "ok\r\n";
    int colCount = sqlite3_column_count(stmt);
    if (colCount == 0) {
        resultCallBack(res, SEND_FINISH);
        return ret;
    }
    res += "{\"columns\":[";
    for (int i = 0; i < colCount; i++) {
        res += "\"";
        res += sqlite3_column_name(stmt, i);
        res += "\",";
    }
    res.pop_back(); // remove the last ","
    res += "],\"values\":[";
    bool hasRow = false;
    constexpr int defaultLenRowString = 1024;
    std::string row;
    row.reserve(defaultLenRowString);
    while (sqlite3_step(stmt) == SQLITE_ROW) {
        hasRow = true;
        GetRowString(stmt, colCount, row);
        res += row + ",";
        if (res.size() >= ONCE_MAX_MB) {
            resultCallBack(res, SEND_CONTINUE);
            res = "";
        }
    }
    if (hasRow) {
        res.pop_back(); // remove the last ','
    }
    res += "]}\r\n";
    resultCallBack(res, SEND_FINISH);

    sqlite3_finalize(stmt);
    return ret;
}
int TraceDataDB::SearchDatabase(const std::string& sql, uint8_t* out, int outLen)
{
    Prepare();
    sqlite3_stmt* stmt = nullptr;
    int ret = sqlite3_prepare_v2(db_, sql.c_str(), static_cast<int>(sql.size()), &stmt, nullptr);
    if (ret != SQLITE_OK) {
        TS_LOGE("sqlite3_prepare_v2(%s) failed: %d:%s", sql.c_str(), ret, sqlite3_errmsg(db_));
        return -1;
    }
    char* res = reinterpret_cast<char*>(out);
    int retSnprintf = snprintf_s(res, outLen, 1, "ok\r\n");
    if (retSnprintf < 0) {
        return -1;
    }
    int pos = retSnprintf;
    int colCount = sqlite3_column_count(stmt);
    if (colCount == 0) {
        return pos;
    }
    retSnprintf = snprintf_s(res + pos, outLen - pos, 1, "%s", "{\"columns\":[");
    if (retSnprintf < 0) {
        return -1;
    }
    pos += retSnprintf;
    for (int i = 0; i < colCount; i++) {
        retSnprintf = snprintf_s(res + pos, outLen - pos, 1, "%s%s%s", "\"", sqlite3_column_name(stmt, i), "\",");
        if (retSnprintf < 0) {
            return -1;
        }
        pos += retSnprintf;
    }
    pos--; // rmove the last ','
    retSnprintf = snprintf_s(res + pos, outLen - pos, 1, "],\"values\":[");
    if (retSnprintf < 0) {
        return -1;
    }
    pos += retSnprintf;
    bool hasRow = false;
    constexpr int defaultLenRowString = 1024;
    std::string row;
    row.reserve(defaultLenRowString);
    while (sqlite3_step(stmt) == SQLITE_ROW) {
        hasRow = true;
        GetRowString(stmt, colCount, row);
        if (pos + row.size() + strlen(",]}\r\n") >= size_t(outLen)) {
            retSnprintf = snprintf_s(res + pos, outLen - pos, 1, "]}\r\n");
            if (retSnprintf < 0) {
                return -1;
            }
            pos += retSnprintf;
            sqlite3_finalize(stmt);
            return pos;
        }
        retSnprintf = snprintf_s(res + pos, outLen - pos, 1, "%s%s", row.c_str(), ",");
        if (retSnprintf < 0) {
            return -1;
        }
        pos += retSnprintf;
    }
    if (hasRow) {
        pos--; // remove the last ','
    }
    retSnprintf = snprintf_s(res + pos, outLen - pos, 1, "]}\r\n");
    if (retSnprintf < 0) {
        return -1;
    }
    pos += retSnprintf;
    sqlite3_finalize(stmt);
    return pos;
}
void TraceDataDB::SetCancel(bool cancel)
{
    cancelQuery_ = cancel;
}
void TraceDataDB::GetRowString(sqlite3_stmt* stmt, int colCount, std::string& rowStr)
{
    rowStr.clear();
    rowStr = "[";
    for (int i = 0; i < colCount; i++) {
        const char* p = reinterpret_cast<const char*>(sqlite3_column_text(stmt, i));
        if (p == nullptr) {
            rowStr += "null,";
            continue;
        }
        int type = sqlite3_column_type(stmt, i);
        switch (type) {
            case SQLITE_TEXT:
                rowStr += "\"";
                rowStr += p;
                rowStr += "\"";
                break;
            default:
                rowStr += p;
                break;
        }
        rowStr += ",";
    }
    rowStr.pop_back(); // remove the last ','
    rowStr += "]";
}
} // namespace TraceStreamer
} // namespace SysTuning
