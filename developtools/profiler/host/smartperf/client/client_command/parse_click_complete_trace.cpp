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
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <cstdio>
#include <sstream>
#include <iomanip>
#include "include/parse_click_complete_trace.h"
#include "include/sp_utils.h"
namespace OHOS {
    namespace SmartPerf {
        float ParseClickCompleteTrace::ParseCompleteTrace(std::string fileNamePath)
        {
            int conversion = 1000;
            infile.open(fileNamePath);
            if (infile.fail()) {
                std::cout << "File " << "open fail" << std::endl;
                return 0;
            } else {
                completeTime = SmartPerf::ParseClickCompleteTrace::GetLineTime();
            }
            infile.close();
            return completeTime * conversion;
        }
        float ParseClickCompleteTrace::GetLineTime()
        {
            std::string line;
            std::string endTime = "0";
            std::string::size_type doComposition;
            while (getline(infile, line)) {
                appPid = SmartPerf::ParseClickCompleteTrace::GetPid(line, "pid", appPid);
                startTime = SmartPerf::ParseClickCompleteTrace::GetStartTime(line, startTime);
                doComposition = line.find("H:RSMainThread::DoComposition");
                if (doComposition != std::string::npos) {
                    size_t subNum = 5;
                    size_t position1 = line.find("....");
                    size_t position2 = line.find(":");
                    endTime = line.substr(position1 + subNum, position2 - position1 - subNum);
                    int endNum = std::stof(endTime);
                    int endFlagNum = std::stof(endTimeFlag);
                    int startNum = std::stof(startTime);
                    int timeNum = endNum - endFlagNum;
                    float interval = 0.3;
                    if (timeNum < interval) {
                        endTimeFlag = endTime;
                    } else {
                        if (std::stof(endTimeFlag) == 0) {
                            endTimeFlag = endTime;
                        } else if (endFlagNum != 0 && startNum != 0 && timeNum > interval) {
                            break;
                        } else {
                            endTimeFlag = endTime;
                        }
                    }
                }
            }
            completeTime = SmartPerf::ParseClickCompleteTrace::GetTime(endTime);
            return completeTime;
        }
        float ParseClickCompleteTrace::GetTime(std::string endTime)
        {
            size_t point = endTime.find(".");
            float subNum = 2;
            endTime = endTime.substr(point - subNum);
            startTime = startTime.substr(point - subNum);
            if (std::stof(endTime) == 0 || std::stof(startTime) == 0) {
            } else {
                float displayTime = 0.032;
                completeTime = std::stof(endTime) - std::stof(startTime) + displayTime;
            }
            return completeTime;
        }
        std::string  ParseClickCompleteTrace::GetPid(std::string line, const std::string &pn, const std::string &pb)
        {
            if (appPidnum == 0) {
                std::string::size_type positionPackgeName;
                size_t packageNameNumSize = 5;
                if (pn.length() < packageNameNumSize) {
                    std::string::size_type positionAppspawn;
                    positionPackgeName = line.find("task_newtask: pid=");
                    positionAppspawn = line.find("comm=appspawn");
                    if (positionPackgeName != std::string::npos && positionAppspawn != std::string::npos) {
                        size_t position1 = line.find("pid=");
                        size_t position2 = line.find(" comm=appspawn");
                        size_t subNum = 4;
                        appPid = line.substr(position1 + subNum, position2 - position1 - subNum);
                        appPidnum++;
                    } else {
                        appPid = pb;
                    }
                } else {
                    positionPackgeName = line.find(pn);
                    if (positionPackgeName != std::string::npos) {
                        size_t p1 = line.find(pn);
                        size_t p2 = line.find(" prio");
                        appPid = line.substr(p1 + pn.length(), p2 - p1 - pn.length());
                        appPidnum++;
                    } else {
                        appPid = pb;
                    }
                }
            }
            return appPid;
        }
        std::string  ParseClickCompleteTrace::GetStartTime(std::string line, const std::string &startTimeBefore)
        {
            std::string::size_type touchEventDisPos = line.find("H:touchEventDispatch");
            std::string::size_type mTouchEventDisPos = line.find("H:TouchEventDispatch");
            if (mTouchEventDisPos != std::string::npos || touchEventDisPos != std::string::npos) {
                size_t touchNum = 3;
                if (flagTouch <= touchNum) {
                    size_t position1 = line.find("....");
                    size_t position2 = line.find(":");
                    size_t subNum = 5;
                    startTime = line.substr(position1 + subNum, position2 - position1 - subNum);
                    flagTime = "0";
                    flagTouch++;
                } else {
                    startTime = startTimeBefore;
                }
            } else {
                startTime = startTimeBefore;
            }
            return startTime;
        }
    }
}