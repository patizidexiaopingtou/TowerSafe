/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 *
 * HDF is dual licensed: you can use it either under the terms of
 * the GPL, or the BSD license, at your option.
 * See the LICENSE file in the root of this repository for complete details.
 */

#include "preprocessor/preprocessor.h"

#include <algorithm>
#include <queue>

#include "util/common.h"
#include "util/file.h"
#include "util/logger.h"
#include "util/options.h"
#include "util/string_builder.h"

namespace OHOS {
namespace HDI {
std::string FileDetail::Dump() const
{
    StringBuilder sb;
    sb.AppendFormat("filePath:%s\n", filePath_.c_str());
    sb.AppendFormat("fileName:%s\n", fileName_.c_str());
    sb.AppendFormat("packageName:%s\n", packageName_.c_str());
    if (imports_.size() == 0) {
        sb.Append("import:[]\n");
    } else {
        sb.Append("import:[\n");
        for (const auto &importStr : imports_) {
            sb.AppendFormat("%s,\n", importStr.c_str());
        }
        sb.Append("]\n");
    }
    return sb.ToString();
}

bool Preprocessor::Preprocess(std::vector<std::string> &compileSourceFiles)
{
    std::vector<std::string> sourceFiles = Options::GetInstance().GetSourceFiles();

    // check all path of idl files
    if (!CheckAllFilesPath(sourceFiles)) {
        return false;
    }

    // analyse impirt infomation of all idl file
    FileDetailMap allFileDetails;
    if (!AnalyseImportInfo(sourceFiles, allFileDetails)) {
        return false;
    }

    // calculate the order of idl files to compile by counter-topological sorting
    if (!CheckCircularReference(allFileDetails, compileSourceFiles)) {
        return false;
    }
    return true;
}

bool Preprocessor::CheckAllFilesPath(const std::vector<std::string> &sourceFiles)
{
    if (sourceFiles.empty()) {
        Logger::E(TAG, "no source files");
        return false;
    }

    bool ret = true;
    for (const auto &filePath : sourceFiles) {
        if (!File::CheckValid(filePath)) {
            Logger::E(TAG, "invailed file path '%s'.", filePath.c_str());
            ret = false;
        }
    }

    return ret;
}

bool Preprocessor::AnalyseImportInfo(const std::vector<std::string> &sourceFiles, FileDetailMap &allFileDetails)
{
    if (sourceFiles.size() == 1) {
        FileDetail info;
        if (!ParseFileDetail(sourceFiles[0], info)) {
            return false;
        }
        allFileDetails[info.GetFullName()] = info;
        if (!LoadOtherIdlFiles(info, allFileDetails)) {
            return false;
        }
    } else {
        for (const auto &sourceFile : sourceFiles) {
            FileDetail info;
            if (!ParseFileDetail(sourceFile, info)) {
                return false;
            }
            allFileDetails[info.GetFullName()] = info;
        }
    }
    return true;
}

bool Preprocessor::ParseFileDetail(const std::string &sourceFile, FileDetail &info)
{
    Lexer lexer;
    if (!lexer.Reset(sourceFile)) {
        Logger::E(TAG, "failed to open file '%s'.", sourceFile.c_str());
        return false;
    }

    info.filePath_ = lexer.GetFilePath();
    size_t startIndex = info.filePath_.rfind(SEPARATOR);
    size_t endIndex = info.filePath_.rfind(".idl");
    if (startIndex == std::string::npos || endIndex == std::string::npos || (startIndex >= endIndex)) {
        Logger::E(TAG, "failed to get file name from '%s'.", info.filePath_.c_str());
        return false;
    }
    info.fileName_ = StringHelper::SubStr(info.filePath_, startIndex + 1, endIndex);

    if (!ParsePackage(lexer, info)) {
        return false;
    }

    if (!ParseImports(lexer, info)) {
        return false;
    }
    return true;
}

bool Preprocessor::ParsePackage(Lexer &lexer, FileDetail &info)
{
    Token token = lexer.PeekToken();
    if (token.kind_ != TokenType::PACKAGE) {
        Logger::E(TAG, "%s: expected 'package' before '%s' token", LocInfo(token).c_str(), token.value_.c_str());
        return false;
    }
    lexer.GetToken();

    token = lexer.PeekToken();
    if (token.kind_ != TokenType::ID) {
        Logger::E(TAG, "%s: expected package name before '%s' token", LocInfo(token).c_str(), token.value_.c_str());
        return false;
    }
    info.packageName_ = token.value_;
    lexer.GetToken();

    token = lexer.PeekToken();
    if (token.kind_ != TokenType::SEMICOLON) {
        Logger::E(TAG, "%s:expected ';' before '%s' token", LocInfo(token).c_str(), token.value_.c_str());
        return false;
    }
    lexer.GetToken();
    return true;
}

bool Preprocessor::ParseImports(Lexer &lexer, FileDetail &info)
{
    Token token = lexer.PeekToken();
    while (token.kind_ != TokenType::END_OF_FILE) {
        if (token.kind_ != TokenType::IMPORT) {
            lexer.GetToken();
            token = lexer.PeekToken();
            continue;
        }

        lexer.GetToken();
        token = lexer.PeekToken();
        if (token.kind_ != TokenType::ID) {
            Logger::E(TAG, "%s: expected import name before '%s' token", LocInfo(token).c_str(), token.value_.c_str());
            return false;
        }

        if (!File::CheckValid(Options::GetInstance().GetImportFilePath(token.value_))) {
            Logger::E(TAG, "%s: import invalid package '%s'", LocInfo(token).c_str(), token.value_.c_str());
            return false;
        }

        info.imports_.emplace(token.value_);
        lexer.GetToken();

        token = lexer.PeekToken();
        if (token.kind_ != TokenType::SEMICOLON) {
            Logger::E(TAG, "%s:expected ';' before '%s' token", LocInfo(token).c_str(), token.value_.c_str());
            return false;
        }
        lexer.GetToken();

        token = lexer.PeekToken();
    }
    return true;
}

bool Preprocessor::LoadOtherIdlFiles(const FileDetail &ownerFileDetail, FileDetailMap &allFileDetails)
{
    for (const auto &importName : ownerFileDetail.imports_) {
        if (allFileDetails.find(importName) != allFileDetails.end()) {
            continue;
        }

        std::string otherFilePath = Options::GetInstance().GetImportFilePath(importName);
        FileDetail otherFileDetail;
        if (!ParseFileDetail(otherFilePath, otherFileDetail)) {
            return false;
        }

        allFileDetails[otherFileDetail.GetFullName()] = otherFileDetail;
        if (!LoadOtherIdlFiles(otherFileDetail, allFileDetails)) {
            Logger::E(TAG, "failed to load file detail by import '%s'", otherFileDetail.filePath_.c_str());
            return false;
        }
    }
    return true;
}

bool Preprocessor::CheckCircularReference(FileDetailMap &allFileDetails, std::vector<std::string> &compileSourceFiles)
{
    std::queue<FileDetail> fileQueue;
    for (const auto &filePair : allFileDetails) {
        const FileDetail &file = filePair.second;
        if (file.imports_.size() == 0) {
            fileQueue.push(file);
        }
    }

    compileSourceFiles.clear();
    while (!fileQueue.empty()) {
        FileDetail curFile = fileQueue.front();
        fileQueue.pop();
        compileSourceFiles.push_back(curFile.filePath_);

        for (auto &filePair : allFileDetails) {
            FileDetail &otherFile = filePair.second;
            if (otherFile.imports_.empty()) {
                continue;
            }

            auto position = otherFile.imports_.find(curFile.GetFullName());
            if (position != otherFile.imports_.end()) {
                otherFile.imports_.erase(position);
            }

            if (otherFile.imports_.size() == 0) {
                fileQueue.push(otherFile);
            }
        }
    }

    if (compileSourceFiles.size() == allFileDetails.size()) {
        return true;
    }

    PrintCyclefInfo(allFileDetails);
    return false;
}

void Preprocessor::PrintCyclefInfo(FileDetailMap &allFileDetails)
{
    for (FileDetailMap::iterator it = allFileDetails.begin(); it != allFileDetails.end();) {
        if (it->second.imports_.size() == 0) {
            it = allFileDetails.erase(it);
        } else {
            ++it;
        }
    }

    for (const auto &filePair : allFileDetails) {
        std::vector<std::string> traceNodes;
        FindCycle(filePair.second.GetFullName(), allFileDetails, traceNodes);
    }
}

void Preprocessor::FindCycle(const std::string &curNode, FileDetailMap &allFiles, std::vector<std::string> &trace)
{
    auto iter = std::find_if(trace.begin(), trace.end(), [curNode](const std::string &name) {
        return name == curNode;
    });
    if (iter != trace.end()) {
        if (iter == trace.begin()) {
            // print circular reference infomation
            StringBuilder sb;
            for (const auto &nodeName : trace) {
                sb.AppendFormat("%s -> ", nodeName.c_str());
            }
            sb.AppendFormat("%s", curNode.c_str());
            Logger::E(TAG, "error: there are circular reference:\n%s", sb.ToString().c_str());
        }
        return;
    }

    trace.push_back(curNode);
    for (const auto &importFileName : allFiles[curNode].imports_) {
        FindCycle(importFileName, allFiles, trace);
    }

    trace.pop_back();
}
} // namespace HDI
} // namespace OHOS