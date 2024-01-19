/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
#include <thread>
#include <ios>
#include <vector>
#include <iostream>
#include <fstream>
#include <regex>
#include "include/startup_delay.h"
#include "include/sp_utils.h"
namespace OHOS {
namespace SmartPerf {
StartUpDelay::StartUpDelay() {}
StartUpDelay::~StartUpDelay() {}
void StartUpDelay::GetTrace(const std::string &sessionID, const std::string &traceName)
{
    std::string result;
    std::string cmdString{"bytrace -t 5 -b 20480 --overwrite idle ace app ohos ability graphic "};
    std::string cmdStringEnd{"sched freq irq sync workq pagecache multimodalinput > "};
    SPUtils::LoadCmd(cmdString + cmdStringEnd + traceName, result);
}
std::thread StartUpDelay::ThreadGetTrace(const std::string &sessionID, const std::string &traceName)
{
    std::thread thGetTrace(&StartUpDelay::GetTrace, this, sessionID, traceName);
    return thGetTrace;
}
void StartUpDelay::GetLayout()
{
    std::string result;
    SPUtils::LoadCmd("uitest dumpLayout", result);
}
std::thread StartUpDelay::ThreadGetLayout()
{
    std::thread thGetLayout(&StartUpDelay::GetLayout, this);
    return thGetLayout;
}
void StartUpDelay::ChangeToBackground()
{
    std::string result;
    SPUtils::LoadCmd("uinput -K -d 2 -u 2", result);
}
std::string StartUpDelay::GetPidByPkg(const std::string &curPkgName)
{
    std::string resultPid;
    SPUtils::LoadCmd("pidof " + curPkgName, resultPid);
    return resultPid;
}
std::string StartUpDelay::GetDeviceType()
{
    std::string cmdResult;
    SPUtils::LoadCmd("param get |grep ohos.boot.hardware", cmdResult);
    size_t splitFlag = cmdResult.find("= ");
    std::string deviceType = cmdResult.substr(splitFlag + 1);
    return deviceType;
}
void StartUpDelay::InitXY2(const std::string &curAppName, const std::string &fileName, const std::string &appPkgName)
{
    std::ifstream file(fileName, std::ios::in);
    std::string strLine = "";
    std::regex pattern("\\d+");
    while (getline(file, strLine)) {
        size_t appIndex = strLine.find(curAppName);
        size_t appPkgIndex = strLine.find(appPkgName);
        if (appIndex > 0 && appPkgIndex < appIndex) {
            size_t bounds = strLine.rfind("bounds", appIndex);
            if (bounds > 0) {
                std::string boundStr = strLine.substr(bounds, 30);
                std::smatch result;
                std::string::const_iterator iterStart = boundStr.begin();
                std::string::const_iterator iterEnd = boundStr.end();
                std::vector<std::string> pointVector;
                while (std::regex_search(iterStart, iterEnd, result, pattern)) {
                    std::string startX = result[0];
                    iterStart = result[0].second;
                    pointVector.push_back(startX);
                }
                size_t num = 3;
                size_t pointNum = pointVector.size();
                if (pointNum > num) {
                    int x = (std::atoi(pointVector[2].c_str()) + std::atoi(pointVector[0].c_str())) / 2;
                    int y = (std::atoi(pointVector[3].c_str()) + std::atoi(pointVector[1].c_str())) / 2;
                    pointXY = std::to_string(x) + " " + std::to_string(y);
                } else {
                    size_t leftStart = boundStr.find_first_of("[");
                    size_t leftEnd = boundStr.find_first_of("]");
                    pointXY = boundStr.substr(leftStart + 1, leftEnd - leftStart - 1);
                    pointXY = pointXY.replace(pointXY.find(","), 1, " ");
                }
                break;
            }
        } else {
            break;
        }
    }
}
}
}
