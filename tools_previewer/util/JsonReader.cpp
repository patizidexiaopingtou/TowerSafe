/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

#include "JsonReader.h"

#include <fstream>

#include "PreviewerEngineLog.h"
#include "json.h"

using namespace std;
string JsonReader::ReadFile(const string path)
{
    ifstream inFile(path);
    if (!inFile.is_open()) {
        ELOG("JsonReader: Open json file failed.");
        return string();
    }
    string jsonStr((istreambuf_iterator<char>(inFile)), istreambuf_iterator<char>());
    inFile.close();
    return jsonStr;
}

Json::Value JsonReader::ParseJsonData(const string jsonStr)
{
    Json::Value val;
    Json::CharReaderBuilder builder;
    Json::CharReader* charReader = builder.newCharReader();
    if (charReader == nullptr) {
        ELOG("JsonReader: CharReader memory allocation failed.");
        return val;
    }
    std::unique_ptr<Json::CharReader> reader(charReader);
    if (reader.get() == nullptr) {
        ELOG("JsonReader: CharReader get null.");
        return val;
    }
    string message; // NOLINT
    if (!reader->parse(jsonStr.data(), jsonStr.data() + jsonStr.size(), &val, &message)) {
        ELOG("JsonReader: Failed to parse the json data, errors: %s", message.c_str());
    }
    return val;
}
