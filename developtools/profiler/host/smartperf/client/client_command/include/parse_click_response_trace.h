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
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
namespace OHOS {
    namespace SmartPerf {
        class ParseClickResponseTrace {
            public:
                float ParseResponseTrace(std::string fileNamePath);
                float GetTime(std::string startTime, std::string endTime);
                std::string GetPid(std::string line, const std::string &pn, const std::string &pb);
                std::string GetStartTime(std::string line, const std::string &startTimeBefore);
                float GetLineTime();
            private:
                std::string flagTime = "0";
                int flagTouch = 0;
                int appPidnum = 0;
                float completeTime = -1;
                std::ifstream infile;
        };
    }
}