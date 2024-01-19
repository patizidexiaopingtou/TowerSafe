/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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
#define HILOG_TAG "Report"

#include <set>
#include "report_json_file.h"

#if is_mingw
#include <windows.h>
#else
#include <sys/ioctl.h>
#endif

namespace OHOS {
namespace Developtools {
namespace HiPerf {
bool ReportJsonFile::debug_ = false;
void ReportJsonFile::addNewFunction(int libId, std::string_view name)
{
    functionList_.emplace_back(functionKey(libId, name));
    functionMap_.emplace(functionMap_.size(), ReportFuncMapItem(libId, name));
}
void ReportJsonFile::ProcessSymbolsFiles(
    const std::vector<std::unique_ptr<SymbolsFile>> &symbolsFiles)
{
    auto symbolsFileIt = symbolsFiles.begin();
    while (symbolsFileIt != symbolsFiles.end()) {
        size_t libId = libList_.size();
        libList_.emplace_back(symbolsFileIt->get()->filePath_);
        const auto &symbols = symbolsFileIt->get()->GetSymbols();
        auto symbolIt = symbols.begin();
        while (symbolIt != symbols.end()) {
            addNewFunction(libId, symbolIt->Name());
            symbolIt++;
        }
        symbolsFileIt++;
    }
}

void ReportJsonFile::UpdateCallNodeEventCount()
{
    for (auto &config : reportConfigItems_) {
        HLOGV("Config %s", config.second.eventName_.c_str());
        for (auto &process : config.second.processes_) {
            for (auto &thread : process.second.threads_) {
                thread.second.callNode.UpdateChildrenEventCount();
                thread.second.callNodeReverse.UpdateChildrenEventCount();
            }
        }
    }
}

ReportConfigItem &ReportJsonFile::GetConfig(uint64_t id)
{
    for (auto &configpair : reportConfigItems_) {
        if (find(configpair.first.begin(), configpair.first.end(), id) != configpair.first.end()) {
            return configpair.second;
        }
    }
    HLOGE("unable found config item for config id %" PRIu64 "", id);
    // return default one
    return reportConfigItems_.begin()->second;
}

int ReportJsonFile::GetFuncionID(int libId, std::string_view function)
{
    auto it = find(functionList_.begin(), functionList_.end(), functionKey(libId, function));
    if (it != functionList_.end()) {
        return it - functionList_.begin();
    } else {
        HLOGW("'%s' not found in function list in lib %d", function.data(), libId);
        // make a new function for unknown name
        addNewFunction(libId, function);
        // retuen the last index
        return functionList_.size() - 1;
    }
}

void ReportJsonFile::UpdateReportSample(uint64_t id, pid_t pid, pid_t tid, uint64_t eventCount)
{
    auto &config = GetConfig(id);

    config.eventCount_ += eventCount;
    auto &process = GetOrCreateMapItem(config.processes_, pid);
    process.eventCount_ += eventCount;
    auto &thread = GetOrCreateMapItem(process.threads_, tid);
    thread.eventCount_ += eventCount;
    thread.sampleCount_++;
    sampleCount_++;
}

void ReportJsonFile::AddReportCallStack(uint64_t eventCount, ReportCallNodeItem &callNode,
                                        const std::vector<CallFrame> &frames)
{
    std::map<int, ReportCallNodeItem> *child = &callNode.childrenMap;
    auto it = frames.begin();
    while (it != frames.end()) {
        int libId = GetLibID(it->filePath_);
        if (libId >= 0) {
            int funcId = GetFuncionID(libId, it->symbolName_);
            // new children funid
            ReportCallNodeItem &grandchildren = GetOrCreateMapItem(*child, funcId);
            if (debug_) {
                grandchildren.nodeIndex_ = nodeIndex_++;
                grandchildren.funcName_ = std::get<keyfuncName>(functionList_.at(funcId));
                grandchildren.reverseCaller_ = true;
            }
            // only the last one need count
            if (it + 1 == frames.end()) {
                grandchildren.selfEventCount_ += eventCount;
            }
            // new children's children
            child = &grandchildren.childrenMap;

            HLOGV("add child %*s %d-%d %s @%d %s", static_cast<int>(it - frames.begin()), "", libId,
                  funcId, it->symbolName_.data(), grandchildren.nodeIndex_, it->filePath_.data());
        } else {
            HLOGV("add child failed at %s", it->ToSymbolString().c_str());
        }
        it++;
    }
}

void ReportJsonFile::AddReportCallStackReverse(uint64_t eventCount, ReportCallNodeItem &callNode,
                                               const std::vector<CallFrame> &frames)
{
    std::map<int, ReportCallNodeItem> *child = &callNode.childrenMap;
    auto it = frames.rbegin();
    while (it != frames.rend()) {
        int libId = GetLibID(it->filePath_);
        if (libId >= 0) {
            int funcId = GetFuncionID(libId, it->symbolName_);
            // new children funid
            ReportCallNodeItem &grandchildren = GetOrCreateMapItem(*child, funcId);
            if (debug_) {
                grandchildren.nodeIndex_ = nodeIndex_++;
                grandchildren.funcName_ = std::get<keyfuncName>(functionList_.at(funcId));
            }
            // only the last one need count
            if (it + 1 == frames.rend()) {
                grandchildren.selfEventCount_ += eventCount;
            }
            // new children's children
            child = &grandchildren.childrenMap;

            HLOGV("add child %*s %d-%d %s @%d %s", static_cast<int>(it - frames.rbegin()), "",
                  libId, funcId, it->symbolName_.data(), grandchildren.nodeIndex_,
                  it->filePath_.data());
        } else {
            HLOGV("add child failed at %s", it->ToSymbolString().c_str());
        }
        it++;
    }
}

uint32_t ReportJsonFile::GetConfigIndex(uint64_t id)
{
    return GetConfig(id).index_;
}

std::string ReportJsonFile::GetConfigName(uint64_t id)
{
    auto &config = GetConfig(id);
    return config.eventName_;
}

int ReportJsonFile::GetLibID(std::string_view filepath)
{
    auto it = find(libList_.begin(), libList_.end(), filepath);
    if (it != libList_.end()) {
        return it - libList_.begin();
    } else {
        HLOGE("'%s' not found in lib list", filepath.data());
        return -1;
    }
}

void ReportJsonFile::UpdateReportCallStack(uint64_t id, pid_t pid, pid_t tid, uint64_t eventCount,
                                           std::vector<CallFrame> &frames)
{
    auto &config = GetConfig(id);
    std::set<int> RepeatFunctionId;
    if (frames.size() == 0) {
        return; // do nothing with no frame
    }
    auto &process = GetOrCreateMapItem(config.processes_, pid);
    auto &thread = GetOrCreateMapItem(process.threads_, tid);
    auto it = frames.begin();
    while (it != frames.end()) {
        int libId = GetLibID(it->filePath_);
        if (libId < 0) {
            HLOGW("not found lib path %s", it->filePath_.data());
            it++;
            continue;
        }
        ReportLibItem &lib = thread.libs_[libId];
        lib.libId_ = libId;
        int funcId = GetFuncionID(libId, it->symbolName_);
        // we will always have a funId, it will create a new one if not found
        // so that we can see abc+0x123 in the html
        HLOG_ASSERT(funcId >= 0);
        if (RepeatFunctionId.count(funcId) != 0) {
            it++;
            continue;
        } else {
            RepeatFunctionId.emplace(funcId);
        }

        ReportFuncItem &func = GetOrCreateMapItem(lib.funcs_, funcId);

        // always count subtree
        func.subTreeEventCount_ += eventCount;

        // only calc the first frame event count
        if (it == frames.begin()) {
            func.eventCount_ += eventCount;
            func.sampleCount_ += 1;
            lib.eventCount_ += eventCount;
        }
        // go on next frame
        it++;
    }
    /*
        frames are the other way around
        0 is the last called.
        So the order of json callstack should be 0 at the end
        callNode is Reverse Order of frames
        callNodeReverse is Normal Order frames
    */
    AddReportCallStackReverse(eventCount, thread.callNode, frames);
    AddReportCallStack(eventCount, thread.callNodeReverse, frames);
}

void ReportJsonFile::OutputJsonFeatureString()
{
    OutputJsonPair(output_, "deviceTime",
                   recordFileReader_->GetFeatureString(FEATURE::HIPERF_RECORD_TIME), true);
    std::string device = recordFileReader_->GetFeatureString(FEATURE::HOSTNAME);
    device.append(" " + recordFileReader_->GetFeatureString(FEATURE::OSRELEASE));
    device.append(" " + recordFileReader_->GetFeatureString(FEATURE::ARCH));

    OutputJsonPair(output_, "deviceType", device);

    OutputJsonPair(output_, "osVersion", recordFileReader_->GetFeatureString(FEATURE::OSRELEASE));

    OutputJsonPair(output_, "deviceCommandLine",
                   recordFileReader_->GetFeatureString(FEATURE::CMDLINE));

    OutputJsonPair(output_, "totalRecordSamples", sampleCount_);
}

void ReportJsonFile::OutputJsonRuntimeInfo()
{
    const auto &threadMaps = virtualRuntime_.GetThreads();
    std::map<std::string, std::string> jsonProcesses;
    std::map<std::string, std::string> jsonThreads;
    for (const auto &pair : threadMaps) {
        const VirtualThread &thread = pair.second;
        if (thread.pid_ == thread.tid_) {
            jsonProcesses.emplace(std::to_string(thread.pid_), thread.name_);
        }
        // process also is a thread.
        jsonThreads.emplace(std::to_string(thread.tid_), thread.name_);
    }

    OutputJsonMap(output_, "processNameMap", jsonProcesses);

    OutputJsonMap(output_, "threadNameMap", jsonThreads);

    const auto &symbolsFiles = virtualRuntime_.GetSymbolsFiles();
    jsonStringVector jsonFilePaths;
    for (const auto &symbolsFile : symbolsFiles) {
        jsonFilePaths.emplace_back(symbolsFile->filePath_);
    }

    OutputJsonVectorList(output_, "symbolsFileList", jsonFilePaths);
    if (fprintf(output_, ",") < 0) {
        return;
    }

    OutputJsonMap(output_, "SymbolMap", functionMap_, true);
    if (fprintf(output_, ",") < 0) {
        return;
    }

    OutputJsonMapList(output_, "recordSampleInfo", reportConfigItems_, true);
}

bool ReportJsonFile::OutputJson(FILE *output)
{
    if (output == nullptr) {
        return false;
    }
    output_ = output;
    if (fprintf(output, "{") < 0) {
        return false;
    }
    OutputJsonFeatureString();
    OutputJsonRuntimeInfo();

    if (fprintf(output, "}") < 0) {
        return false;
    }
    return true;
}
} // namespace HiPerf
} // namespace Developtools
} // namespace OHOS
