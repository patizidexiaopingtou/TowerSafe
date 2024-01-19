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
#include <sstream>
#include <algorithm>
#include <unistd.h>
#include <dirent.h>
#include <cstdio>
#include <cstdlib>
#include <climits>
#include "sys/time.h"
#include "include/sp_utils.h"
namespace OHOS {
namespace SmartPerf {
bool SPUtils::FileAccess(const std::string &fileName)
{
    return (access(fileName.c_str(), F_OK) == 0);
}

bool SPUtils::LoadFile(const std::string &filePath, std::string &content)
{
    char realPath[PATH_MAX] = {0x00};
    if (realpath(filePath.c_str(), realPath) == nullptr) {
        std::cout << "" << std::endl;
    }
    std::ifstream file(realPath);
    if (!file.is_open()) {
        return false;
    }

    file.seekg(0, std::ios::end);
    file.tellg();

    content.clear();
    file.seekg(0, std::ios::beg);
    copy(std::istreambuf_iterator<char>(file), std::istreambuf_iterator<char>(), std::back_inserter(content));
    // remove '' \n\r
    ReplaceString(content);
    return true;
}

bool SPUtils::LoadCmd(const std::string &cmd, std::string &result)
{
    std::string cmdExc = cmd;
    FILE *fd = popen(cmdExc.c_str(), "r");
    if (fd == nullptr) {
        return false;
    }
    char buf[1024] = {'\0'};
    int ret = fread(buf, sizeof(buf), 1, fd);
    if (ret >= 0) {
        result = buf;
    }
    if (pclose(fd) == -1) {
        std::cout << "" << std::endl;
    }
    // remove '' \n\r
    ReplaceString(result);
    return ret >= 0 ? true : false;
}

std::string SPUtils::IncludePathDelimiter(const std::string &path)
{
    if (path.rfind("/") != path.size() - 1) {
        return path + "/";
    }

    return path;
}

void SPUtils::ForDirFiles(const std::string &path, std::vector<std::string> &files)
{
    std::string pathStringWithDelimiter;
    DIR *dir = opendir(path.c_str());
    if (dir == nullptr) {
        return;
    }

    while (true) {
        struct dirent *ptr = readdir(dir);
        if (ptr == nullptr) {
            break;
        }

        // current dir OR parent dir
        if ((strcmp(ptr->d_name, ".") == 0) || (strcmp(ptr->d_name, "..") == 0)) {
            continue;
        } else if (ptr->d_type == DT_DIR) {
            pathStringWithDelimiter = IncludePathDelimiter(path) + std::string(ptr->d_name);
            ForDirFiles(pathStringWithDelimiter, files);
        } else {
            files.push_back(IncludePathDelimiter(path) + std::string(ptr->d_name));
        }
    }
    closedir(dir);
}

bool SPUtils::IsSubString(const std::string &str, const std::string &sub)
{
    if (sub.empty() || str.empty()) {
        return false;
    }

    return str.find(sub) != std::string::npos;
}

void SPUtils::StrSplit(const std::string &content, const std::string &sp, std::vector<std::string> &out)
{
    size_t index = 0;
    while (index != std::string::npos) {
        size_t tEnd = content.find_first_of(sp, index);
        std::string tmp = content.substr(index, tEnd - index);
        if (tmp != "" && tmp != " ") {
            out.push_back(tmp);
        }
        if (tEnd == std::string::npos) {
            break;
        }
        index = tEnd + 1;
    }
}

std::string SPUtils::ExtractNumber(const std::string &str)
{
    int cntInt = 0;
    const int shift = 10;
    for (int i = 0; str[i] != '\0'; ++i) {
        if (str[i] >= '0' && str[i] <= '9') {
            cntInt *= shift;
            cntInt += str[i] - '0';
        }
    }
    return std::to_string(cntInt);
}

void SPUtils::ReplaceString(std::string &res)
{
    std::string flagOne = "\r";
    std::string flagTwo = "\n";
    std::string::size_type ret = res.find(flagOne);
    while (ret != res.npos) {
        res.replace(ret, 1, "");
        ret = res.find(flagOne);
    }
    ret = res.find(flagTwo);
    while (ret != res.npos) {
        res.replace(ret, 1, "");
        ret = res.find(flagTwo);
    }
}

long long SPUtils::GetCurTime()
{
    struct timeval tv;
    gettimeofday(&tv, nullptr);
    long long timestamp = tv.tv_sec * 1000 + tv.tv_usec / 1000;
    return timestamp;
}

std::string SPUtils::GetTopPkgName()
{
    std::string cmd = "hidumper -s AbilityManagerService -a '-a' | grep 'bundle name' | head -n 1";
    std::string curTopPkgStr = "";
    LoadCmd(cmd, curTopPkgStr);
    uint64_t left = curTopPkgStr.find_first_of("[");
    uint64_t right = curTopPkgStr.find_first_of("]");
	std::string topPkg = curTopPkgStr.substr(left + 1, right - left - 1);
    return topPkg;
}

}
}
