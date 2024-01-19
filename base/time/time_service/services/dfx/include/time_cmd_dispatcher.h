/*
 * Copyright (c) 2022-2022 Huawei Device Co., Ltd.
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

#ifndef TIME_CMD_DISPATCHER_H
#define TIME_CMD_DISPATCHER_H

#include <map>
#include <string>
#include <vector>
#include "time_cmd_parse.h"

namespace OHOS {
namespace MiscServices {
class TimeCmdDispatcher {
public:
    static TimeCmdDispatcher &GetInstance();
    void RegisterCommand(std::shared_ptr<TimeCmdParse> &cmd);
    bool Dispatch(int fd, const std::vector<std::string> &args);
    std::string getCmdTitle(int fd, const std::vector<std::string> &args);

private:
    std::map<std::string, std::shared_ptr<TimeCmdParse>> cmdHandler;
};
} // namespace MiscServices
} // namespace OHOS
#endif // TIME_CMD_DISPATCHER_H