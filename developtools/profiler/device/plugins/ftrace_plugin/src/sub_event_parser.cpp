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
#include "sub_event_parser.h"
#include "logging.h"

FTRACE_NS_BEGIN
SubEventParser& SubEventParser::GetInstance()
{
    static SubEventParser instance;
    return instance;
}

SubEventParser::SubEventParser()
{
    HILOG_INFO(LOG_CORE, "SubEventParser create!");
}

SubEventParser::~SubEventParser()
{
    HILOG_INFO(LOG_CORE, "SubEventParser destroy!");
}

bool SubEventParser::IsSupport(uint32_t eventId) const
{
    return idToFunctions_.count(eventId);
}

bool SubEventParser::IsSupport(const std::string& eventName) const
{
    return nameToFunctions_.count(eventName) > 0;
}

bool SubEventParser::ParseEvent(FtraceEvent& event, uint8_t data[], size_t size, const EventFormat& format) const
{
    auto iter = idToFunctions_.find(format.eventId);
    if (iter != idToFunctions_.end()) {
        iter->second(event, data, size, format);
        return true;
    }
    return false;
}

bool SubEventParser::SetupEvent(const EventFormat& format)
{
    auto it = nameToFunctions_.find(format.eventName);
    if (it != nameToFunctions_.end()) {
        idToFunctions_[format.eventId] = it->second;
        return true;
    }
    return false;
}

void SubEventParser::RegisterParseFunction(const std::string& name, ParseFunction&& fun)
{
    CHECK_TRUE(nameToFunctions_.count(name) == 0, NO_RETVAL, "parse function for %s already registered!", name.c_str());
    nameToFunctions_[name] = fun;
}

void SubEventParser::UnregisterParseFunction(const std::string& name)
{
    CHECK_TRUE(nameToFunctions_.count(name) > 0, NO_RETVAL, "parse function for %s not registered!", name.c_str());
    nameToFunctions_.erase(name);
}

SubEventParserRegisterar::SubEventParserRegisterar(const std::string& name, SubEventParser::ParseFunction&& func)
    : name_(name)
{
    SubEventParser::GetInstance().RegisterParseFunction(name, std::move(func));
}

SubEventParserRegisterar::~SubEventParserRegisterar()
{
    SubEventParser::GetInstance().UnregisterParseFunction(name_);
}
FTRACE_NS_END
