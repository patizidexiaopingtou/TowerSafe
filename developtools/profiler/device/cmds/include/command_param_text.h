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

#ifndef COMMAND_TEXT_H
#define COMMAND_TEXT_H

#include "command_param.h"

class CommandParamText : public CommandParam {
public:
    CommandParamText(std::string& s);
    ~CommandParamText() {}
    void SetValue(const std::string& s);

private:
    std::string& stringText_;
};

#endif