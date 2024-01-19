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

#include "trace_stdtype.h"
#include <algorithm>
#include <ctime>
namespace SysTuning {
namespace TraceStdtype {
void CpuCacheBase::SetDur(uint64_t index, uint64_t dur)
{
    durs_[index] = dur;
}
TableRowId ThreadState::AppendThreadState(InternalTime ts,
                                          InternalTime dur,
                                          InternalCpu cpu,
                                          InternalTid itid,
                                          TableRowId idState)
{
    timeStamps_.emplace_back(ts);
    durations_.emplace_back(dur);
    itids_.emplace_back(itid);
    tids_.emplace_back(INVALID_UINT32);
    pids_.emplace_back(INVALID_UINT32);
    states_.emplace_back(idState);
    cpus_.emplace_back(cpu);
    return itids_.size() - 1;
}

void ThreadState::SetDuration(TableRowId index, InternalTime dur)
{
    durations_[index] = dur;
}

void DataDict::Finish()
{
    std::string::size_type pos(0);
    for (auto i = 0; i < dataDict_.size(); i++) {
        while ((pos = dataDict_[i].find("\"")) != std::string::npos) {
            dataDict_[i].replace(pos, 1, "\'");
        }
        if (dataDict_[i].find("ispreproc") != std::string::npos) {
            TS_LOGI("xx");
        }
        while (dataDict_[i].back() >= '\001' && dataDict_[i].back() <= '\007') {
            dataDict_[i].pop_back();
        }
    }
}
TableRowId ThreadState::UpdateDuration(TableRowId index, InternalTime ts)
{
    if (durations_[index] == INVALID_TIME) {
        durations_[index] = ts - timeStamps_[index];
    }
    return itids_[index];
}

void ThreadState::UpdateState(TableRowId index, TableRowId idState)
{
    states_[index] = idState;
}

void ThreadState::UpdateDuration(TableRowId index, InternalTime ts, TableRowId idState)
{
    durations_[index] = ts - timeStamps_[index];
    states_[index] = idState;
}

void ThreadState::UpdateTidAndPid(TableRowId index, InternalTid tid, InternalTid pid)
{
    tids_[index] = tid;
    pids_[index] = pid;
}

TableRowId ThreadState::UpdateDuration(TableRowId index, InternalTime ts, InternalCpu cpu, TableRowId idState)
{
    cpus_[index] = cpu;
    durations_[index] = ts - timeStamps_[index];
    states_[index] = idState;
    return itids_[index];
}

size_t SchedSlice::AppendSchedSlice(uint64_t ts,
                                    uint64_t dur,
                                    uint64_t cpu,
                                    uint64_t internalTid,
                                    uint64_t endState,
                                    uint64_t priority)
{
    timeStamps_.emplace_back(ts);
    durs_.emplace_back(dur);
    cpus_.emplace_back(cpu);
    tsEnds_.emplace_back(0);
    internalTids_.emplace_back(internalTid);
    endStates_.emplace_back(endState);
    priority_.emplace_back(priority);
    return Size() - 1;
}

void SchedSlice::SetDuration(size_t index, uint64_t duration)
{
    durs_[index] = duration;
    tsEnds_[index] = timeStamps_[index] + duration;
}

void SchedSlice::Update(uint64_t index, uint64_t ts, uint64_t state, uint64_t pior)
{
    durs_[index] = ts - timeStamps_[index];
    endStates_[index] = state;
    priority_[index] = pior;
}

size_t CallStack::AppendInternalAsyncSlice(uint64_t startT,
                                           uint64_t durationNs,
                                           InternalTid internalTid,
                                           DataIndex cat,
                                           uint16_t nameIdentify,
                                           DataIndex name,
                                           uint8_t depth,
                                           uint64_t cookid,
                                           const std::optional<uint64_t>& parentId)
{
    AppendCommonInfo(startT, durationNs, internalTid);
    AppendCallStack(cat, name, depth, parentId);
    AppendDistributeInfo();
    cookies_.emplace_back(cookid);
    ids_.emplace_back(ids_.size());
    identifys_.emplace_back(nameIdentify + depth);
    return Size() - 1;
}
size_t CallStack::AppendInternalSlice(uint64_t startT,
                                      uint64_t durationNs,
                                      InternalTid internalTid,
                                      DataIndex cat,
                                      uint16_t nameIdentify,
                                      DataIndex name,
                                      uint8_t depth,
                                      const std::optional<uint64_t>& parentId)
{
    AppendCommonInfo(startT, durationNs, internalTid);
    AppendCallStack(cat, name, depth, parentId);
    identifys_.emplace_back(nameIdentify + depth);
    ids_.emplace_back(ids_.size());
    cookies_.emplace_back(INVALID_UINT64);
    AppendDistributeInfo();
    return Size() - 1;
}

void CallStack::AppendCommonInfo(uint64_t startT, uint64_t durationNs, InternalTid internalTid)
{
    timeStamps_.emplace_back(startT);
    durs_.emplace_back(durationNs);
    callIds_.emplace_back(internalTid);
}
void CallStack::AppendCallStack(DataIndex cat, DataIndex name, uint8_t depth, std::optional<uint64_t> parentId)
{
    parentIds_.emplace_back(parentId);
    cats_.emplace_back(cat);
    names_.emplace_back(name);
    depths_.emplace_back(depth);
}
void CallStack::SetDistributeInfo(size_t index,
                                  const std::string& chainId,
                                  const std::string& spanId,
                                  const std::string& parentSpanId,
                                  const std::string& flag,
                                  const std::string& args)
{
    chainIds_[index] = chainId;
    spanIds_[index] = spanId;
    parentSpanIds_[index] = parentSpanId;
    flags_[index] = flag;
    args_[index] = args;
    argSet_[index] = INVALID_UINT32;
}
void CallStack::AppendDistributeInfo(const std::string& chainId,
                                     const std::string& spanId,
                                     const std::string& parentSpanId,
                                     const std::string& flag,
                                     const std::string& args)
{
    chainIds_.emplace_back(chainId);
    spanIds_.emplace_back(spanId);
    parentSpanIds_.emplace_back(parentSpanId);
    flags_.emplace_back(flag);
    args_.emplace_back(args);
    argSet_.emplace_back(INVALID_UINT32);
}
void CallStack::AppendDistributeInfo()
{
    chainIds_.emplace_back("");
    spanIds_.emplace_back("");
    parentSpanIds_.emplace_back("");
    flags_.emplace_back("");
    args_.emplace_back("");
    argSet_.emplace_back(INVALID_UINT32);
}
void CallStack::SetDuration(size_t index, uint64_t timestamp)
{
    durs_[index] = timestamp - timeStamps_[index];
}

void CallStack::SetIrqDurAndArg(size_t index, uint64_t timestamp, uint32_t argSetId)
{
    SetTimeStamp(index, timestamp);
    argSet_[index] = argSetId;
}
void CallStack::SetTimeStamp(size_t index, uint64_t timestamp)
{
    timeStamps_[index] = timestamp;
}

void CallStack::SetDepth(size_t index, uint8_t depth)
{
    depths_[index] = depth;
}
void CallStack::SetArgSetId(size_t index, uint32_t argSetId)
{
    argSet_[index] = argSetId;
}
const std::deque<std::optional<uint64_t>>& CallStack::ParentIdData() const
{
    return parentIds_;
}
const std::deque<DataIndex>& CallStack::CatsData() const
{
    return cats_;
}
const std::deque<uint16_t>& CallStack::IdentifysData() const
{
    return identifys_;
}
const std::deque<DataIndex>& CallStack::NamesData() const
{
    return names_;
}
const std::deque<uint8_t>& CallStack::Depths() const
{
    return depths_;
}
const std::deque<uint64_t>& CallStack::Cookies() const
{
    return cookies_;
}
const std::deque<uint32_t>& CallStack::CallIds() const
{
    return callIds_;
}
const std::deque<std::string>& CallStack::ChainIds() const
{
    return chainIds_;
}
const std::deque<std::string>& CallStack::SpanIds() const
{
    return spanIds_;
}
const std::deque<std::string>& CallStack::ParentSpanIds() const
{
    return parentSpanIds_;
}
const std::deque<std::string>& CallStack::Flags() const
{
    return flags_;
}
const std::deque<std::string>& CallStack::ArgsData() const
{
    return args_;
}
const std::deque<uint32_t>& CallStack::ArgSetIdsData() const
{
    return argSet_;
}

size_t ArgSet::AppendNewArg(DataIndex nameId, BaseDataType dataType, int64_t value, size_t argSet)
{
    dataTypes_.emplace_back(dataType);
    argset_.emplace_back(argSet);
    ids_.emplace_back(Size());
    values_.emplace_back(value);
    names_.emplace_back(nameId);
    return Size() - 1;
}
const std::deque<BaseDataType>& ArgSet::DataTypes() const
{
    return dataTypes_;
}
const std::deque<int64_t>& ArgSet::ValuesData() const
{
    return values_;
}
const std::deque<uint64_t>& ArgSet::ArgsData() const
{
    return argset_;
}
const std::deque<DataIndex>& ArgSet::NamesData() const
{
    return names_;
}

size_t SysMeasureFilter::AppendNewFilter(uint64_t filterId, DataIndex type, DataIndex nameId)
{
    ids_.emplace_back(filterId);
    names_.emplace_back(nameId);
    types_.emplace_back(type);
    return ids_.size() - 1;
}
const std::deque<DataIndex>& SysMeasureFilter::NamesData() const
{
    return names_;
}

const std::deque<DataIndex>& SysMeasureFilter::TypesData() const
{
    return types_;
}
size_t DataType::AppendNewDataType(BaseDataType dataType, DataIndex dataDescIndex)
{
    ids_.emplace_back(Size());
    dataTypes_.emplace_back(dataType);
    descs_.emplace_back(dataDescIndex);
    return Size() - 1;
}

const std::deque<BaseDataType>& DataType::DataTypes() const
{
    return dataTypes_;
}
const std::deque<DataIndex>& DataType::DataDesc() const
{
    return descs_;
}
size_t Filter::AppendNewFilterData(std::string type, std::string name, uint64_t sourceArgSetId)
{
    nameDeque_.emplace_back(name);
    sourceArgSetId_.emplace_back(sourceArgSetId);
    ids_.emplace_back(Size());
    typeDeque_.emplace_back(type);
    return Size() - 1;
}

size_t Measure::AppendMeasureData(uint32_t type, uint64_t timestamp, int64_t value, uint32_t filterId)
{
    valuesDeque_.emplace_back(value);
    filterIdDeque_.emplace_back(filterId);
    typeDeque_.emplace_back(type);
    timeStamps_.emplace_back(timestamp);
    return Size() - 1;
}

size_t Raw::AppendRawData(uint32_t id, uint64_t timestamp, uint32_t name, uint32_t cpu, uint32_t internalTid)
{
    ids_.emplace_back(id);
    timeStamps_.emplace_back(timestamp);
    nameDeque_.emplace_back(name);
    cpuDeque_.emplace_back(cpu);
    itidDeque_.emplace_back(internalTid);
    return Size() - 1;
}

size_t ThreadMeasureFilter::AppendNewFilter(uint64_t filterId, uint32_t nameIndex, uint64_t internalTid)
{
    filterId_.emplace_back(filterId);
    nameIndex_.emplace_back(nameIndex);
    internalTids_.emplace_back(internalTid);
    return Size() - 1;
}

size_t Instants::AppendInstantEventData(uint64_t timestamp,
                                        DataIndex nameIndex,
                                        int64_t internalTid,
                                        int64_t wakeupFromInternalPid)
{
    internalTids_.emplace_back(internalTid);
    timeStamps_.emplace_back(timestamp);
    NameIndexs_.emplace_back(nameIndex);
    wakeupFromInternalPids_.emplace_back(wakeupFromInternalPid);
    return Size() - 1;
}
size_t LogInfo::AppendNewLogInfo(uint64_t seq,
                                 uint64_t timestamp,
                                 uint32_t pid,
                                 uint32_t tid,
                                 DataIndex level,
                                 DataIndex tag,
                                 DataIndex context,
                                 uint64_t originTs)
{
    hilogLineSeqs_.emplace_back(seq);
    timeStamps_.emplace_back(timestamp);
    pids_.emplace_back(pid);
    tids_.emplace_back(tid);
    levels_.emplace_back(level);
    tags_.emplace_back(tag);
    contexts_.emplace_back(context);
    originTs_.emplace_back(originTs);
    return Size() - 1;
}
const std::deque<uint64_t>& LogInfo::HilogLineSeqs() const
{
    return hilogLineSeqs_;
}
const std::deque<uint32_t>& LogInfo::Pids() const
{
    return pids_;
}
const std::deque<uint32_t>& LogInfo::Tids() const
{
    return tids_;
}
const std::deque<DataIndex>& LogInfo::Levels() const
{
    return levels_;
}
const std::deque<DataIndex>& LogInfo::Tags() const
{
    return tags_;
}
const std::deque<DataIndex>& LogInfo::Contexts() const
{
    return contexts_;
}
const std::deque<uint64_t>& LogInfo::OriginTimeStamData() const
{
    return originTs_;
}

size_t NativeHook::AppendNewNativeHookData(uint64_t callChainId,
                                           uint32_t ipid,
                                           uint32_t itid,
                                           std::string eventType,
                                           DataIndex subType,
                                           uint64_t timestamp,
                                           uint64_t endTimestamp,
                                           uint64_t duration,
                                           uint64_t addr,
                                           int64_t memSize,
                                           int64_t allMemSize)
{
    callChainIds_.emplace_back(callChainId);
    ipids_.emplace_back(ipid);
    itids_.emplace_back(itid);
    eventTypes_.emplace_back(eventType);
    subTypes_.emplace_back(subType);
    timeStamps_.emplace_back(timestamp);
    endTimestamps_.emplace_back(endTimestamp);
    durations_.emplace_back(duration);
    addrs_.emplace_back(addr);
    memSizes_.emplace_back(memSize);
    if (eventType == ALLOC_EVET || eventType == FREE_EVENT) {
        countHeapSizes_ += allMemSize;
        allMemSizes_.emplace_back(countHeapSizes_);
    } else if (eventType == MMAP_EVENT || eventType == MUNMAP_EVENT) {
        countMmapSizes_ += allMemSize;
        allMemSizes_.emplace_back(countMmapSizes_);
    }
    currentSizeDurs_.emplace_back(0);
    lastCallerPathIndexs_.emplace_back(INVALID_UINT64);
    return Size() - 1;
}
void NativeHook::UpdateHeapDuration(size_t row, uint64_t endTimestamp)
{
    endTimestamps_[row] = endTimestamp;
    durations_[row] = endTimestamp - timeStamps_[row];
}
void NativeHook::UpdateCurrentSizeDur(size_t row, uint64_t timeStamp)
{
    currentSizeDurs_[row] = timeStamp - timeStamps_[row];
}
void NativeHook::UpdateMemMapSubType()
{
    if (addrToMmapTag_.Empty()) {
        return;
    }
    for (auto i = 0; i < Size(); ++i) {
        if (eventTypes_[i].compare(MMAP_EVENT) == 0) {
            auto tagId = addrToMmapTag_.Find(addrs_[i], memSizes_[i]);
            if (tagId != INVALID_UINT64) {
                subTypes_[i] = tagId;
            }
        }
    }
}
void NativeHook::UpdateAddrToMemMapSubType(uint64_t addr, int64_t size, uint64_t tagId)
{
    addrToMmapTag_.Insert(addr, size, tagId);
}
void NativeHook::UpdateLastCallerPathIndexs(std::map<uint64_t, uint64_t>& callIdToLasLibId)
{
    if (callIdToLasLibId.empty()) {
        return;
    }
    for (auto i = 0; i < Size(); ++i) {
        auto symbolIt = callIdToLasLibId.find(callChainIds_[i]);
        if (symbolIt != callIdToLasLibId.end()) {
            lastCallerPathIndexs_[i] = symbolIt->second;
        } else {
            lastCallerPathIndexs_[i] = INVALID_UINT64;
        }
    }
}
const std::deque<uint64_t>& NativeHook::CallChainIds() const
{
    return callChainIds_;
}
const std::deque<uint32_t>& NativeHook::Ipids() const
{
    return ipids_;
}
const std::deque<uint32_t>& NativeHook::Itids() const
{
    return itids_;
}
const std::deque<std::string>& NativeHook::EventTypes() const
{
    return eventTypes_;
}
const std::deque<DataIndex>& NativeHook::SubTypes() const
{
    return subTypes_;
}
const std::deque<uint64_t>& NativeHook::EndTimeStamps() const
{
    return endTimestamps_;
}
const std::deque<uint64_t>& NativeHook::Durations() const
{
    return durations_;
}
const std::deque<uint64_t>& NativeHook::Addrs() const
{
    return addrs_;
}
const std::deque<int64_t>& NativeHook::MemSizes() const
{
    return memSizes_;
}
const std::deque<int64_t>& NativeHook::AllMemSizes() const
{
    return allMemSizes_;
}
const std::deque<uint64_t>& NativeHook::CurrentSizeDurs() const
{
    return currentSizeDurs_;
}
const std::deque<uint64_t>& NativeHook::LastCallerPathIndexs() const
{
    return lastCallerPathIndexs_;
}
size_t NativeHookFrame::AppendNewNativeHookFrame(uint64_t callChainId,
                                                 uint64_t depth,
                                                 uint64_t ip,
                                                 uint64_t sp,
                                                 DataIndex symbolName,
                                                 DataIndex filePath,
                                                 uint64_t offset,
                                                 uint64_t symbolOffset)
{
    callChainIds_.emplace_back(callChainId);
    ips_.emplace_back(ip);
    sps_.emplace_back(sp);
    depths_.emplace_back(depth);
    symbolNames_.emplace_back(symbolName);
    filePaths_.emplace_back(filePath);
    offsets_.emplace_back(offset);
    symbolOffsets_.emplace_back(symbolOffset);
    return Size() - 1;
}
void NativeHookFrame::UpdateSymbolIdToNameMap(uint64_t originSymbolId, uint64_t symbolId)
{
    symbolIdToSymbolName_.insert(std::make_pair(originSymbolId, symbolId));
}

void NativeHookFrame::UpdateSymbolId()
{
    if (symbolIdToSymbolName_.empty()) {
        return;
    }
    for (auto i = 0; i < Size(); ++i) {
        auto symbolIt = symbolIdToSymbolName_.find(symbolNames_[i]);
        if (symbolIt != symbolIdToSymbolName_.end()) {
            symbolNames_[i] = symbolIt->second;
        }
    }
}
void NativeHookFrame::UpdateFileId(std::map<uint32_t, uint64_t>& filePathIdToFilePathName)
{
    if (filePathIdToFilePathName.empty()) {
        return;
    }
    for (auto i = 0; i < Size(); ++i) {
        auto symbolIt = filePathIdToFilePathName.find(filePaths_[i]);
        if (symbolIt != filePathIdToFilePathName.end()) {
            filePaths_[i] = symbolIt->second;
        }
    }
}
void NativeHookFrame::GetCallIdToLastLibId(const std::set<DataIndex>& invalidLibs,
                                           std::map<uint64_t, uint64_t>& callIdToLastCallerPathIndex)
{
    uint64_t lastLibId = INVALID_UINT64;
    auto size = static_cast<int64_t>(Size());
    uint32_t lastCallChainId = INVALID_UINT32;
    bool foundLast = false;
    for (auto i = size - 1; i > -1; i--) {
        auto callChainId = callChainIds_[i];
        if (callChainId == lastCallChainId) {
            if (foundLast) {
                continue;
            }
        }
        if (callChainId != lastCallChainId) {
            lastCallChainId = callChainId;
            foundLast = false;
        }
        auto lower = std::lower_bound(invalidLibs.begin(), invalidLibs.end(), filePaths_[i]);
        if (lower == invalidLibs.end() || *lower != filePaths_[i]) { // found
            callIdToLastCallerPathIndex.insert(std::make_pair(callChainIds_[i], filePaths_[i]));
            foundLast = true;
        }
    }
}
const std::deque<uint64_t>& NativeHookFrame::CallChainIds() const
{
    return callChainIds_;
}
const std::deque<uint64_t>& NativeHookFrame::Depths() const
{
    return depths_;
}
const std::deque<uint64_t>& NativeHookFrame::Ips() const
{
    return ips_;
}
const std::deque<uint64_t>& NativeHookFrame::Sps() const
{
    return sps_;
}
const std::deque<DataIndex>& NativeHookFrame::SymbolNames() const
{
    return symbolNames_;
}
const std::deque<DataIndex>& NativeHookFrame::FilePaths() const
{
    return filePaths_;
}
const std::deque<uint64_t>& NativeHookFrame::Offsets() const
{
    return offsets_;
}
const std::deque<uint64_t>& NativeHookFrame::SymbolOffsets() const
{
    return symbolOffsets_;
}

size_t Hidump::AppendNewHidumpInfo(uint64_t timestamp, uint32_t fps)
{
    timeStamps_.emplace_back(timestamp);
    fpss_.emplace_back(fps);
    return Size() - 1;
}
const std::deque<uint32_t>& Hidump::Fpss() const
{
    return fpss_;
}

size_t PerfCallChain::AppendNewPerfCallChain(uint64_t sampleId,
                                             uint64_t callChainId,
                                             uint64_t vaddrInFile,
                                             uint64_t fileId,
                                             uint64_t symbolId)
{
    ids_.emplace_back(Size());
    sampleIds_.emplace_back(sampleId);
    callChainIds_.emplace_back(callChainId);
    vaddrInFiles_.emplace_back(vaddrInFile);
    fileIds_.emplace_back(fileId);
    symbolIds_.emplace_back(symbolId);
    names_.emplace_back("");
    return Size() - 1;
}
const std::deque<uint64_t>& PerfCallChain::SampleIds() const
{
    return sampleIds_;
}
const std::deque<uint64_t>& PerfCallChain::CallChainIds() const
{
    return callChainIds_;
}
const std::deque<uint64_t>& PerfCallChain::VaddrInFiles() const
{
    return vaddrInFiles_;
}
const std::deque<uint64_t>& PerfCallChain::FileIds() const
{
    return fileIds_;
}
const std::deque<uint64_t>& PerfCallChain::SymbolIds() const
{
    return symbolIds_;
}

const std::deque<std::string>& PerfCallChain::Names() const
{
    return names_;
}
void PerfCallChain::SetName(uint64_t index, const std::string& name)
{
    names_[index] = name;
}
size_t PerfFiles::AppendNewPerfFiles(uint64_t fileIds, uint32_t serial, DataIndex symbols, DataIndex filePath)
{
    ids_.emplace_back(Size());
    fileIds_.emplace_back(fileIds);
    serials_.emplace_back(serial);
    symbols_.emplace_back(symbols);
    filePaths_.emplace_back(filePath);
    return Size() - 1;
}
const std::deque<uint64_t>& PerfFiles::FileIds() const
{
    return fileIds_;
}

const std::deque<uint32_t>& PerfFiles::Serials() const
{
    return serials_;
}
const std::deque<DataIndex>& PerfFiles::Symbols() const
{
    return symbols_;
}
const std::deque<DataIndex>& PerfFiles::FilePaths() const
{
    return filePaths_;
}

size_t PerfSample::AppendNewPerfSample(uint64_t sampleId,
                                       uint64_t timestamp,
                                       uint64_t tid,
                                       uint64_t eventCount,
                                       uint64_t eventTypeId,
                                       uint64_t timestampTrace,
                                       uint64_t cpuId,
                                       uint64_t threadState)
{
    ids_.emplace_back(Size());
    sampleIds_.emplace_back(sampleId);
    timeStamps_.emplace_back(timestamp);
    tids_.emplace_back(tid);
    eventCounts_.emplace_back(eventCount);
    eventTypeIds_.emplace_back(eventTypeId);
    timestampTraces_.emplace_back(timestampTrace);
    cpuIds_.emplace_back(cpuId);
    threadStates_.emplace_back(threadState);
    return Size() - 1;
}
const std::deque<uint64_t>& PerfSample::SampleIds() const
{
    return sampleIds_;
}
const std::deque<uint64_t>& PerfSample::Tids() const
{
    return tids_;
}
const std::deque<uint64_t>& PerfSample::EventCounts() const
{
    return eventCounts_;
}
const std::deque<uint64_t>& PerfSample::EventTypeIds() const
{
    return eventTypeIds_;
}
const std::deque<uint64_t>& PerfSample::TimestampTraces() const
{
    return timestampTraces_;
}
const std::deque<uint64_t>& PerfSample::CpuIds() const
{
    return cpuIds_;
}
const std::deque<DataIndex>& PerfSample::ThreadStates() const
{
    return threadStates_;
}

size_t PerfThread::AppendNewPerfThread(uint64_t pid, uint64_t tid, DataIndex threadName)
{
    ids_.emplace_back(Size());
    pids_.emplace_back(pid);
    tids_.emplace_back(tid);
    threadNames_.emplace_back(threadName);
    return Size() - 1;
}
const std::deque<uint64_t>& PerfThread::Pids() const
{
    return pids_;
}
const std::deque<uint64_t>& PerfThread::Tids() const
{
    return tids_;
}
const std::deque<DataIndex>& PerfThread::ThreadNames() const
{
    return threadNames_;
}
size_t PerfReport::AppendNewPerfReport(DataIndex type, DataIndex value)
{
    ids_.emplace_back(Size());
    types_.emplace_back(type);
    values_.emplace_back(value);
    return Size() - 1;
}
const std::deque<DataIndex>& PerfReport::Types() const
{
    return types_;
}
const std::deque<DataIndex>& PerfReport::Values() const
{
    return values_;
}
size_t ProcessMeasureFilter::AppendNewFilter(uint64_t id, DataIndex name, uint32_t internalPid)
{
    internalPids_.emplace_back(internalPid);
    ids_.emplace_back(id);
    names_.emplace_back(name);
    return Size() - 1;
}
size_t ClockEventData::AppendNewFilter(uint64_t id, DataIndex type, DataIndex name, uint64_t cpu)
{
    cpus_.emplace_back(cpu);
    ids_.emplace_back(id);
    types_.emplace_back(type);
    names_.emplace_back(name);
    return Size() - 1;
}
size_t ClkEventData::AppendNewFilter(uint64_t id, uint64_t rate, DataIndex name, uint64_t cpu)
{
    ids_.emplace_back(id);
    rates_.emplace_back(rate);
    names_.emplace_back(name);
    cpus_.emplace_back(cpu);
    return Size() - 1;
}
size_t SysCall::AppendSysCallData(int64_t sysCallNum, DataIndex type, uint64_t ipid, uint64_t timestamp, int64_t ret)
{
    sysCallNums_.emplace_back(sysCallNum);
    types_.emplace_back(type);
    ipids_.emplace_back(ipid);
    timeStamps_.emplace_back(timestamp);
    rets_.emplace_back(ret);
    return Size() - 1;
}
StatAndInfo::StatAndInfo()
{
    // sched_switch_received | sched_switch_not_match | sched_switch_not_not_supported etc.
    for (int i = TRACE_EVENT_START; i < TRACE_EVENT_MAX; i++) {
        event_[i] = config_.eventNameMap_.at(static_cast<SupportedTraceEventType>(i));
    }
    for (int j = STAT_EVENT_START; j < STAT_EVENT_MAX; j++) {
        stat_[j] = config_.eventErrorDescMap_.at(static_cast<StatType>(j));
    }

    for (int i = TRACE_EVENT_START; i < TRACE_EVENT_MAX; i++) {
        for (int j = STAT_EVENT_START; j < STAT_EVENT_MAX; j++) {
            statSeverity_[i][j] = config_.eventParserStatSeverityDescMap_.at(static_cast<SupportedTraceEventType>(i))
                                      .at(static_cast<StatType>(j));
        }
    }

    for (int i = TRACE_EVENT_START; i < TRACE_EVENT_MAX; i++) {
        for (int j = STAT_EVENT_START; j < STAT_EVENT_MAX; j++) {
            statSeverityDesc_[i][j] = config_.serverityLevelDescMap_.at(statSeverity_[i][j]);
        }
    }

    for (int i = TRACE_EVENT_START; i < TRACE_EVENT_MAX; i++) {
        for (int j = STAT_EVENT_START; j < STAT_EVENT_MAX; j++) {
            statCount_[i][j] = 0;
        }
    }
    clockid2ClockNameMap_ = {
        {TS_CLOCK_UNKNOW, "unknown"},        {TS_CLOCK_BOOTTIME, "boottime"},
        {TS_CLOCK_REALTIME, "realtime"},     {TS_CLOCK_REALTIME_COARSE, "realtime_corse"},
        {TS_MONOTONIC, "monotonic"},         {TS_MONOTONIC_COARSE, "monotonic-coarse"},
        {TS_MONOTONIC_RAW, "monotonic-raw"},
    };
}
void StatAndInfo::IncreaseStat(SupportedTraceEventType eventType, StatType type)
{
    statCount_[eventType][type]++;
}
const uint32_t& StatAndInfo::GetValue(SupportedTraceEventType eventType, StatType type) const
{
    return statCount_[eventType][type];
}
const std::string& StatAndInfo::GetEvent(SupportedTraceEventType eventType) const
{
    return event_[eventType];
}
const std::string& StatAndInfo::GetStat(StatType type) const
{
    return stat_[type];
}
const std::string& StatAndInfo::GetSeverityDesc(SupportedTraceEventType eventType, StatType type) const
{
    return statSeverityDesc_[eventType][type];
}
const StatSeverityLevel& StatAndInfo::GetSeverity(SupportedTraceEventType eventType, StatType type) const
{
    return statSeverity_[eventType][type];
}

uint64_t SymbolsData::Size() const
{
    return addrs_.size();
}
void SymbolsData::InsertSymbol(const DataIndex& name, const uint64_t& addr)
{
    addrs_.emplace_back(addr);
    funcName_.emplace_back(name);
}
const std::deque<DataIndex>& SymbolsData::GetConstFuncNames() const
{
    return funcName_;
}
const std::deque<uint64_t>& SymbolsData::GetConstAddrs() const
{
    return addrs_;
}
MetaData::MetaData()
{
    columnNames_.resize(METADATA_ITEM_MAX);
    values_.resize(METADATA_ITEM_MAX);
    columnNames_[METADATA_ITEM_DATASIZE] = METADATA_ITEM_DATASIZE_COLNAME;
    columnNames_[METADATA_ITEM_PARSETOOL_NAME] = METADATA_ITEM_PARSETOOL_NAME_COLNAME;
    columnNames_[METADATA_ITEM_PARSERTOOL_VERSION] = METADATA_ITEM_PARSERTOOL_VERSION_COLNAME;
    columnNames_[METADATA_ITEM_PARSERTOOL_PUBLISH_DATETIME] = METADATA_ITEM_PARSERTOOL_PUBLISH_DATETIME_COLNAME;
    columnNames_[METADATA_ITEM_SOURCE_FILENAME] = METADATA_ITEM_SOURCE_FILENAME_COLNAME;
    columnNames_[METADATA_ITEM_OUTPUT_FILENAME] = METADATA_ITEM_OUTPUT_FILENAME_COLNAME;
    columnNames_[METADATA_ITEM_PARSERTIME] = METADATA_ITEM_PARSERTIME_COLNAME;
    columnNames_[METADATA_ITEM_TRACE_DURATION] = METADATA_ITEM_TRACE_DURATION_COLNAME;
    columnNames_[METADATA_ITEM_SOURCE_DATETYPE] = METADATA_ITEM_SOURCE_DATETYPE_COLNAME;
    values_[METADATA_ITEM_PARSETOOL_NAME] = "trace_streamer";
}
void MetaData::SetTraceType(const std::string& traceType)
{
    values_[METADATA_ITEM_SOURCE_DATETYPE] = traceType;
}
void MetaData::SetSourceFileName(const std::string& fileName)
{
    MetaData::values_[METADATA_ITEM_SOURCE_FILENAME] = fileName;
}
void MetaData::SetOutputFileName(const std::string& fileName)
{
    MetaData::values_[METADATA_ITEM_OUTPUT_FILENAME] = fileName;
}
void MetaData::SetParserToolVersion(const std::string& version)
{
    values_[METADATA_ITEM_PARSERTOOL_VERSION] = version;
}
void MetaData::SetParserToolPublishDateTime(const std::string& datetime)
{
    values_[METADATA_ITEM_PARSERTOOL_PUBLISH_DATETIME] = datetime;
}
void MetaData::SetTraceDataSize(uint64_t dataSize)
{
    std::stringstream ss;
    ss << dataSize;
    values_[METADATA_ITEM_DATASIZE] = ss.str();
    // 	Function 'time' may return error. It is not allowed to do anything that might fail inside the constructor.
    time_t rawtime;
    struct tm* timeinfo = nullptr;
    void(time(&rawtime));
    timeinfo = localtime(&rawtime);
    values_[METADATA_ITEM_PARSERTIME] = asctime(timeinfo);
    // sometimes there will be a extra \n at last
    values_[METADATA_ITEM_PARSERTIME].pop_back();
}
void MetaData::SetTraceDuration(uint64_t dur)
{
    values_[METADATA_ITEM_TRACE_DURATION] = std::to_string(dur) + " s";
}
const std::string& MetaData::Value(uint64_t row) const
{
    return values_[row];
}
const std::string& MetaData::Name(uint64_t row) const
{
    return columnNames_[row];
}
DataIndex DataDict::GetStringIndex(std::string_view str)
{
    auto hashValue = hashFun(str);
    auto itor = dataDictInnerMap_.find(hashValue);
    if (itor != dataDictInnerMap_.end()) {
        return itor->second;
    }
    mutex_.lock();
    dataDict_.emplace_back(std::string(str));
    DataIndex stringIdentity = dataDict_.size() - 1;
    dataDictInnerMap_.emplace(hashValue, stringIdentity);
    mutex_.unlock();
    return stringIdentity;
}
DataIndex DataDict::GetStringIndexNoWrite(std::string_view str) const
{
    auto hashValue = hashFun(str);
    auto itor = dataDictInnerMap_.find(hashValue);
    if (itor != dataDictInnerMap_.end()) {
        return itor->second;
    }
    return INVALID_UINT64;
}
size_t CpuUsageDetailData::AppendNewData(uint64_t newTimeStamp,
                                         uint64_t dur,
                                         double totalLoad,
                                         double userLoad,
                                         double systemLoad,
                                         int64_t threads)
{
    timeStamps_.emplace_back(newTimeStamp);
    durs_.emplace_back(dur);
    totalLoad_.emplace_back(totalLoad);
    userLoad_.emplace_back(userLoad);
    systemLoad_.emplace_back(systemLoad);
    threads_.emplace_back(threads);
    return Size() - 1;
}
const std::deque<uint64_t>& CpuUsageDetailData::Durs() const
{
    return durs_;
}
const std::deque<double>& CpuUsageDetailData::TotalLoad() const
{
    return totalLoad_;
}
const std::deque<double>& CpuUsageDetailData::UserLoad() const
{
    return userLoad_;
}
const std::deque<double>& CpuUsageDetailData::SystemLoad() const
{
    return systemLoad_;
}
const std::deque<int64_t>& CpuUsageDetailData::Threads() const
{
    return threads_;
}
size_t LiveProcessDetailData::AppendNewData(uint64_t newTimeStamp,
                                            uint64_t dur,
                                            int32_t processID,
                                            std::string processName,
                                            int32_t parentProcessID,
                                            int32_t uid,
                                            std::string userName,
                                            double cpuUsage,
                                            int32_t pssInfo,
                                            uint64_t cpuTime,
                                            int32_t threads,
                                            int64_t diskWrites,
                                            int64_t diskReads)
{
    timeStamps_.emplace_back(newTimeStamp);
    durs_.emplace_back(dur);
    processID_.emplace_back(processID);
    processName_.emplace_back(processName);
    parentProcessID_.emplace_back(parentProcessID);
    uid_.emplace_back(uid);
    userName_.emplace_back(userName);
    cpuUsage_.emplace_back(cpuUsage);
    pssInfo_.emplace_back(pssInfo);
    threads_.emplace_back(threads);
    diskWrites_.emplace_back(diskWrites);
    diskReads_.emplace_back(diskReads);
    cpuTimes_.emplace_back(cpuTime);
    return Size() - 1;
}
const std::deque<uint64_t>& LiveProcessDetailData::Durs() const
{
    return durs_;
}
const std::deque<int32_t>& LiveProcessDetailData::ProcessID() const
{
    return processID_;
}
const std::deque<std::string>& LiveProcessDetailData::ProcessName() const
{
    return processName_;
}
const std::deque<int32_t>& LiveProcessDetailData::ParentProcessID() const
{
    return parentProcessID_;
}
const std::deque<int32_t>& LiveProcessDetailData::Uid() const
{
    return uid_;
}
const std::deque<std::string>& LiveProcessDetailData::UserName() const
{
    return userName_;
}
const std::deque<double>& LiveProcessDetailData::CpuUsage() const
{
    return cpuUsage_;
}
const std::deque<int32_t>& LiveProcessDetailData::PssInfo() const
{
    return pssInfo_;
}
const std::deque<int32_t>& LiveProcessDetailData::Threads() const
{
    return threads_;
}
const std::deque<int64_t>& LiveProcessDetailData::DiskWrites() const
{
    return diskWrites_;
}
const std::deque<int64_t>& LiveProcessDetailData::DiskReads() const
{
    return diskReads_;
}

const std::deque<uint64_t>& LiveProcessDetailData::CpuTimes() const
{
    return cpuTimes_;
}

size_t NetDetailData::AppendNewNetData(uint64_t newTimeStamp,
                                       uint64_t tx,
                                       uint64_t rx,
                                       uint64_t dur,
                                       double rxSpeed,
                                       double txSpeed,
                                       uint64_t packetIn,
                                       double packetInSec,
                                       uint64_t packetOut,
                                       double packetOutSec,
                                       const std::string& netType)
{
    timeStamps_.emplace_back(newTimeStamp);
    txs_.emplace_back(tx);
    rxs_.emplace_back(rx);
    durs_.emplace_back(dur);
    txSpeeds_.emplace_back(txSpeed);
    rxSpeeds_.emplace_back(rxSpeed);
    netTypes_.emplace_back(netType);
    packetIn_.emplace_back(packetIn);
    packetInSec_.emplace_back(packetInSec);
    packetOut_.emplace_back(packetOut);
    packetOutSec_.emplace_back(packetOutSec);

    return Size() - 1;
}
const std::deque<uint64_t>& NetDetailData::Durs() const
{
    return durs_;
}
const std::deque<double>& NetDetailData::RxSpeed() const
{
    return rxSpeeds_;
}
const std::deque<double>& NetDetailData::TxSpeed() const
{
    return txSpeeds_;
}
const std::deque<std::string>& NetDetailData::NetTypes() const
{
    return netTypes_;
}
const std::deque<uint64_t>& NetDetailData::RxDatas() const
{
    return rxs_;
}
const std::deque<uint64_t>& NetDetailData::TxDatas() const
{
    return txs_;
}
const std::deque<uint64_t>& NetDetailData::PacketIn() const
{
    return packetIn_;
}
const std::deque<double>& NetDetailData::PacketInSec() const
{
    return packetInSec_;
}
const std::deque<uint64_t>& NetDetailData::PacketOut() const
{
    return packetOut_;
}
const std::deque<double>& NetDetailData::PacketOutSec() const
{
    return packetOutSec_;
}

void DiskIOData::AppendNewData(uint64_t ts,
                               uint64_t dur,
                               uint64_t rd,
                               uint64_t wr,
                               uint64_t rdPerSec,
                               uint64_t wrPerSec,
                               double rdCountPerSec,
                               double wrCountPerSec,
                               uint64_t rdCount,
                               uint64_t wrCount)
{
    timeStamps_.emplace_back(ts);
    durs_.emplace_back(dur);
    rdDatas_.emplace_back(rd);
    wrDatas_.emplace_back(wr);
    rdPerSec_.emplace_back(rdPerSec);
    wrPerSec_.emplace_back(wrPerSec);
    rdCountPerSec_.emplace_back(rdCountPerSec);
    wrCountPerSec_.emplace_back(wrCountPerSec);
    rdCountDatas_.emplace_back(rdCount);
    wrCountDatas_.emplace_back(wrCount);
}
const std::deque<uint64_t>& DiskIOData::Durs() const
{
    return durs_;
}
const std::deque<uint64_t>& DiskIOData::RdDatas() const
{
    return rdDatas_;
}
const std::deque<uint64_t>& DiskIOData::WrDatas() const
{
    return wrDatas_;
}
const std::deque<double>& DiskIOData::RdSpeedDatas() const
{
    return rdPerSec_;
}
const std::deque<double>& DiskIOData::WrSpeedDatas() const
{
    return wrPerSec_;
}

const std::deque<double>& DiskIOData::RdCountPerSecDatas() const
{
    return rdCountPerSec_;
}
const std::deque<double>& DiskIOData::WrCountPerSecDatas() const
{
    return wrCountPerSec_;
}
const std::deque<uint64_t>& DiskIOData::RdCountDatas() const
{
    return rdCountDatas_;
}
const std::deque<uint64_t>& DiskIOData::WrCountDatas() const
{
    return wrCountDatas_;
}

size_t FileSystemSample::AppendNewData(uint64_t callChainId,
                                       uint16_t type,
                                       uint32_t ipid,
                                       uint32_t itid,
                                       uint64_t startTs,
                                       uint64_t endTs,
                                       uint64_t dur,
                                       DataIndex returnValue,
                                       DataIndex errorCode,
                                       size_t size,
                                       int32_t fd,
                                       DataIndex fileId,
                                       DataIndex firstArgument,
                                       DataIndex secondArgument,
                                       DataIndex thirdArgument,
                                       DataIndex fourthArgument)
{
    callChainIds_.emplace_back(callChainId);
    types_.emplace_back(type);
    ipids_.emplace_back(ipid);
    itids_.emplace_back(itid);
    startTs_.emplace_back(startTs);
    endTs_.emplace_back(endTs);
    durs_.emplace_back(dur);
    returnValues_.emplace_back(returnValue);
    errorCodes_.emplace_back(errorCode);
    fds_.emplace_back(fd);
    fileIds_.emplace_back(fileId);
    Sizes_.emplace_back(size);
    firstArguments_.emplace_back(firstArgument);
    secondArguments_.emplace_back(secondArgument);
    thirdArguments_.emplace_back(thirdArgument);
    fourthArguments_.emplace_back(fourthArgument);
    ids_.emplace_back(Size());
    return Size() - 1;
}
const std::deque<uint64_t>& FileSystemSample::CallChainIds() const
{
    return callChainIds_;
}
const std::deque<uint16_t>& FileSystemSample::Types() const
{
    return types_;
}
const std::deque<uint32_t>& FileSystemSample::Ipids() const
{
    return ipids_;
}
const std::deque<uint32_t>& FileSystemSample::Itids() const
{
    return itids_;
}
const std::deque<uint64_t>& FileSystemSample::StartTs() const
{
    return startTs_;
}
const std::deque<uint64_t>& FileSystemSample::EndTs() const
{
    return endTs_;
}
const std::deque<uint64_t>& FileSystemSample::Durs() const
{
    return durs_;
}
const std::deque<DataIndex>& FileSystemSample::ReturnValues() const
{
    return returnValues_;
}
const std::deque<DataIndex>& FileSystemSample::ErrorCodes() const
{
    return errorCodes_;
}
const std::deque<int32_t>& FileSystemSample::Fds() const
{
    return fds_;
}
const std::deque<DataIndex>& FileSystemSample::FileIds() const
{
    return fileIds_;
}
const std::deque<size_t>& FileSystemSample::Sizes() const
{
    return Sizes_;
}
const std::deque<DataIndex>& FileSystemSample::FirstArguments() const
{
    return firstArguments_;
}
const std::deque<DataIndex>& FileSystemSample::SecondArguments() const
{
    return secondArguments_;
}
const std::deque<DataIndex>& FileSystemSample::ThirdArguments() const
{
    return thirdArguments_;
}
const std::deque<DataIndex>& FileSystemSample::FourthArguments() const
{
    return fourthArguments_;
}

size_t PagedMemorySampleData::AppendNewData(uint64_t callChainId,
                                              uint16_t type,
                                              uint32_t ipid,
                                              uint64_t startTs,
                                              uint64_t endTs,
                                              uint64_t dur,
                                              size_t size,
                                              DataIndex addr,
                                              uint32_t itid)
{
    callChainIds_.emplace_back(callChainId);
    types_.emplace_back(type);
    ipids_.emplace_back(ipid);
    startTs_.emplace_back(startTs);
    endTs_.emplace_back(endTs);
    durs_.emplace_back(dur);
    Sizes_.emplace_back(size);
    addrs_.emplace_back(addr);
    itids_.emplace_back(itid);
    ids_.emplace_back(Size());
    return Size() - 1;
}
const std::deque<uint64_t>& PagedMemorySampleData::CallChainIds() const
{
    return callChainIds_;
}
const std::deque<uint16_t>& PagedMemorySampleData::Types() const
{
    return types_;
}
const std::deque<uint32_t>& PagedMemorySampleData::Ipids() const
{
    return ipids_;
}
const std::deque<uint32_t>& PagedMemorySampleData::Itids() const
{
    return itids_;
}
const std::deque<uint64_t>& PagedMemorySampleData::StartTs() const
{
    return startTs_;
}
const std::deque<uint64_t>& PagedMemorySampleData::EndTs() const
{
    return endTs_;
}
const std::deque<uint64_t>& PagedMemorySampleData::Durs() const
{
    return durs_;
}
const std::deque<size_t>& PagedMemorySampleData::Sizes() const
{
    return Sizes_;
}
const std::deque<DataIndex>& PagedMemorySampleData::Addr() const
{
    return addrs_;
}

size_t EbpfCallStackData::AppendNewData(uint64_t callChainId,
                                        uint32_t depth,
                                        uint64_t ip,
                                        uint64_t symbolId,
                                        uint64_t filePathId)
{
    callChainIds_.emplace_back(callChainId);
    depths_.emplace_back(depth);
    ips_.emplace_back(ip);
    symbolIds_.emplace_back(symbolId);
    filePathIds_.emplace_back(filePathId);
    ids_.emplace_back(Size());
    return Size() - 1;
}
const std::deque<uint64_t>& EbpfCallStackData::CallChainIds() const
{
    return callChainIds_;
}
const std::deque<uint32_t>& EbpfCallStackData::Depths() const
{
    return depths_;
}
const std::deque<uint64_t>& EbpfCallStackData::Ips() const
{
    return ips_;
}
const std::deque<uint64_t>& EbpfCallStackData::SymbolIds() const
{
    return symbolIds_;
}
const std::deque<uint64_t>& EbpfCallStackData::FilePathIds() const
{
    return filePathIds_;
}
#if WITH_EBPF_HELP
size_t EbpfProcessMaps::AppendNewData(uint64_t start,
                                      uint64_t end,
                                      uint32_t offset,
                                      uint32_t pid,
                                      uint32_t fileNameLen,
                                      uint64_t fileNameIndex)
{
    starts_.emplace_back(start);
    ends_.emplace_back(end);
    offsets_.emplace_back(offset);
    pids_.emplace_back(pid);
    fileNameLens_.emplace_back(fileNameLen);
    fileNameIndexs_.emplace_back(fileNameIndex);
    ids_.emplace_back(Size());
    return Size() - 1;
}

const std::deque<uint64_t>& EbpfProcessMaps::Starts() const
{
    return starts_;
}
const std::deque<uint64_t>& EbpfProcessMaps::Ends() const
{
    return ends_;
}
const std::deque<uint32_t>& EbpfProcessMaps::Offsets() const
{
    return offsets_;
}
const std::deque<uint32_t>& EbpfProcessMaps::Pids() const
{
    return pids_;
}
const std::deque<uint32_t>& EbpfProcessMaps::FileNameLens() const
{
    return fileNameLens_;
}
const std::deque<uint64_t>& EbpfProcessMaps::FileNameIndexs() const
{
    return fileNameIndexs_;
}

size_t EbpfElf::AppendNewData(uint64_t elfId,
                              uint64_t textVaddr,
                              uint32_t textOffset,
                              uint32_t strTabLen,
                              uint32_t symTabLen,
                              uint32_t fileNameLen,
                              uint32_t symEntLen,
                              uint64_t fileNameIndex)
{
    elfIds_.emplace_back(elfId);
    textVaddrs_.emplace_back(textVaddr);
    textOffsets_.emplace_back(textOffset);
    strTabLens_.emplace_back(strTabLen);
    symTabLens_.emplace_back(symTabLen);
    fileNameLens_.emplace_back(fileNameLen);
    symEntLens_.emplace_back(symEntLen);
    fileNameIndexs_.emplace_back(fileNameIndex);
    ids_.emplace_back(Size());
    return Size() - 1;
}
const std::deque<uint64_t>& EbpfElf::ElfIds() const
{
    return elfIds_;
}
const std::deque<uint64_t>& EbpfElf::TextVaddrs() const
{
    return textVaddrs_;
}
const std::deque<uint32_t>& EbpfElf::TextOffsets() const
{
    return textOffsets_;
}
const std::deque<uint32_t>& EbpfElf::StrTabLens() const
{
    return strTabLens_;
}
const std::deque<uint32_t>& EbpfElf::SymTabLens() const
{
    return symTabLens_;
}
const std::deque<uint32_t>& EbpfElf::FileNameLens() const
{
    return fileNameLens_;
}
const std::deque<uint32_t>& EbpfElf::SymEntLens() const
{
    return symEntLens_;
}
const std::deque<uint64_t>& EbpfElf::FileNameIndexs() const
{
    return fileNameIndexs_;
}

size_t EbpfElfSymbol::AppendNewData(uint64_t elfId, uint32_t stName, uint64_t stValue, uint64_t stSize)
{
    elfIds_.emplace_back(elfId);
    stNames_.emplace_back(stName);
    stValues_.emplace_back(stValue);
    stSizes_.emplace_back(stSize);
    ids_.emplace_back(Size());
    return Size() - 1;
}
const std::deque<uint64_t>& EbpfElfSymbol::ElfIds() const
{
    return elfIds_;
}
const std::deque<uint32_t>& EbpfElfSymbol::StNames() const
{
    return stNames_;
}
const std::deque<uint64_t>& EbpfElfSymbol::StValues() const
{
    return stValues_;
}
const std::deque<uint64_t>& EbpfElfSymbol::StSizes() const
{
    return stSizes_;
}
#endif
uint32_t AppNames::AppendAppName(uint8_t flags, DataIndex eventSource, DataIndex appName)
{
    flags_.push_back(flags);
    appNames_.push_back(eventSource);
    keyNames_.push_back(appName);
    ids_.push_back(keyNames_.size() - 1);
    return Size() - 1;
}
const std::deque<uint8_t>& AppNames::Falgs() const
{
    return flags_;
}
const std::deque<DataIndex>& AppNames::EventSourceId() const
{
    return appNames_;
}
const std::deque<DataIndex>& AppNames::AppName() const
{
    return keyNames_;
}

void SysEventMeasureData::AppendData(uint64_t serial,
                                     uint64_t ts,
                                     uint32_t nameId,
                                     uint32_t keyId,
                                     int32_t type,
                                     double numericValue,
                                     DataIndex stringValue)
{
    serial_.emplace_back(serial);
    ts_.emplace_back(ts);
    nameFilterIds_.emplace_back(nameId);
    appKeyFilterIds_.emplace_back(keyId);
    types_.emplace_back(type);
    numValues_.emplace_back(numericValue);
    stringValues_.emplace_back(stringValue);
    ids_.push_back(rowCount_);
    rowCount_++;
}
const std::deque<uint64_t>& SysEventMeasureData::Serial() const
{
    return serial_;
}
const std::deque<uint64_t>& SysEventMeasureData::Ts() const
{
    return ts_;
}
const std::deque<uint32_t>& SysEventMeasureData::NameFilterId() const
{
    return nameFilterIds_;
}
const std::deque<uint32_t>& SysEventMeasureData::AppKeyFilterId() const
{
    return appKeyFilterIds_;
}
const std::deque<int32_t>& SysEventMeasureData::Type() const
{
    return types_;
}
const std::deque<double>& SysEventMeasureData::NumValue() const
{
    return numValues_;
}
const std::deque<DataIndex>& SysEventMeasureData::StringValue() const
{
    return stringValues_;
}
void DeviceStateData::AppendNewData(int32_t brightness,
                                    int32_t btState,
                                    int32_t location,
                                    int32_t wifi,
                                    int32_t streamDefault,
                                    int32_t voiceCall,
                                    int32_t music,
                                    int32_t streamRing,
                                    int32_t media,
                                    int32_t voiceAssistant,
                                    int32_t system,
                                    int32_t alarm,
                                    int32_t notification,
                                    int32_t btSco,
                                    int32_t enforcedAudible,
                                    int32_t streamDtmf,
                                    int32_t streamTts,
                                    int32_t accessibility,
                                    int32_t recording,
                                    int32_t streamAll)
{
    brightness_.emplace_back(brightness);
    btStates_.emplace_back(btState);
    locations_.emplace_back(location);
    wifis_.emplace_back(wifi);
    streamDefaults_.emplace_back(streamDefault);
    voiceCalls_.emplace_back(voiceCall);
    musics_.emplace_back(music);
    streamRings_.emplace_back(streamRing);
    medias_.emplace_back(media);
    voiceAssistants_.emplace_back(voiceAssistant);
    systems_.emplace_back(system);
    alarms_.emplace_back(alarm);
    notifications_.emplace_back(notification);
    btScos_.emplace_back(btSco);
    enforcedAudibles_.emplace_back(enforcedAudible);
    streamDtmfs_.emplace_back(streamDtmf);
    streamTts_.emplace_back(streamTts);
    accessibilitys_.emplace_back(accessibility);
    recordings_.emplace_back(recording);
    streamAlls_.emplace_back(streamAll);
    ids_.push_back(rowCounts_);
    rowCounts_++;
}
const std::deque<int32_t>& DeviceStateData::Brightness() const
{
    return brightness_;
}
const std::deque<int32_t>& DeviceStateData::BtState() const
{
    return btStates_;
}
const std::deque<int32_t>& DeviceStateData::Location() const
{
    return locations_;
}
const std::deque<int32_t>& DeviceStateData::Wifi() const
{
    return wifis_;
}
const std::deque<int32_t>& DeviceStateData::StreamDefault() const
{
    return streamDefaults_;
}
const std::deque<int32_t>& DeviceStateData::VoiceCall() const
{
    return voiceCalls_;
}
const std::deque<int32_t>& DeviceStateData::Music() const
{
    return musics_;
}
const std::deque<int32_t>& DeviceStateData::StreamRing() const
{
    return streamRings_;
}
const std::deque<int32_t>& DeviceStateData::Media() const
{
    return medias_;
}
const std::deque<int32_t>& DeviceStateData::VoiceAssistant() const
{
    return voiceAssistants_;
}
const std::deque<int32_t>& DeviceStateData::System() const
{
    return systems_;
}
const std::deque<int32_t>& DeviceStateData::Alarm() const
{
    return alarms_;
}
const std::deque<int32_t>& DeviceStateData::Notification() const
{
    return notifications_;
}
const std::deque<int32_t>& DeviceStateData::BtSco() const
{
    return btScos_;
}
const std::deque<int32_t>& DeviceStateData::EnforcedAudible() const
{
    return enforcedAudibles_;
}
const std::deque<int32_t>& DeviceStateData::StreamDtmf() const
{
    return streamDtmfs_;
}
const std::deque<int32_t>& DeviceStateData::StreamTts() const
{
    return streamTts_;
}
const std::deque<int32_t>& DeviceStateData::Accessibility() const
{
    return accessibilitys_;
}
const std::deque<int32_t>& DeviceStateData::Recording() const
{
    return recordings_;
}
const std::deque<int32_t>& DeviceStateData::StreamAll() const
{
    return streamAlls_;
}
void SmapsData::AppendNewData(uint64_t timeStamp,
                              std::string startAddr,
                              std::string endAddr,
                              uint64_t dirty,
                              uint64_t swapper,
                              uint64_t rss,
                              uint64_t pss,
                              uint64_t size,
                              double reside,
                              DataIndex protectionId,
                              DataIndex pathId)
{
    timeStamps_.emplace_back(timeStamp);
    startAddrs_.emplace_back(startAddr);
    endAddrs_.emplace_back(endAddr);
    dirtys_.emplace_back(dirty);
    swappers_.emplace_back(swapper);
    rss_.emplace_back(rss);
    pss_.emplace_back(pss);
    sizes_.emplace_back(size);
    resides_.emplace_back(reside);
    protectionIds_.emplace_back(protectionId);
    pathIds_.emplace_back(pathId);
    ids_.push_back(rowCount_);
    rowCount_++;
}
const std::deque<uint64_t>& SmapsData::TimeStamps() const
{
    return timeStamps_;
}
const std::deque<std::string>& SmapsData::StartAddrs() const
{
    return startAddrs_;
}
const std::deque<std::string>& SmapsData::EndAddrs() const
{
    return endAddrs_;
}
const std::deque<uint64_t>& SmapsData::Dirtys() const
{
    return dirtys_;
}
const std::deque<uint64_t>& SmapsData::Swappers() const
{
    return swappers_;
}
const std::deque<uint64_t>& SmapsData::Rss() const
{
    return rss_;
}
const std::deque<uint64_t>& SmapsData::Pss() const
{
    return pss_;
}
const std::deque<uint64_t>& SmapsData::Sizes() const
{
    return sizes_;
}
const std::deque<double>& SmapsData::Resides() const
{
    return resides_;
}
const std::deque<DataIndex>& SmapsData::ProtectionIds() const
{
    return protectionIds_;
}
const std::deque<DataIndex>& SmapsData::PathIds() const
{
    return pathIds_;
}
void BioLatencySampleData::AppendNewData(uint64_t callChainId,
                                        uint64_t type,
                                        uint64_t ipid,
                                        uint64_t itid,
                                        uint64_t startTs,
                                        uint64_t endTs,
                                        uint64_t latencyDur,
                                        uint32_t tier,
                                        uint64_t size,
                                        uint64_t blockNumber,
                                        uint64_t filePathId,
                                        uint64_t durPer4k)
{
    callChainIds_.emplace_back(callChainId);
    types_.emplace_back(type);
    ipids_.emplace_back(ipid);
    itids_.emplace_back(itid);
    startTs_.emplace_back(startTs);
    endTs_.emplace_back(endTs);
    latencyDurs_.emplace_back(latencyDur);
    tiers_.emplace_back(tier);
    sizes_.emplace_back(size);
    blockNumbers_.emplace_back(blockNumber);
    filePathIds_.emplace_back(filePathId);
    durPer4ks_.emplace_back(durPer4k);
    ids_.emplace_back(rowCount_);
    rowCount_++;
}
const std::deque<uint64_t>& BioLatencySampleData::CallChainIds() const
{
    return callChainIds_;
}
const std::deque<uint64_t>& BioLatencySampleData::Types() const
{
    return types_;
}
const std::deque<uint64_t>& BioLatencySampleData::Ipids() const
{
    return ipids_;
}
const std::deque<uint64_t>& BioLatencySampleData::Itids() const
{
    return itids_;
}
const std::deque<uint64_t>& BioLatencySampleData::StartTs() const
{
    return startTs_;
}
const std::deque<uint64_t>& BioLatencySampleData::EndTs() const
{
    return endTs_;
}
const std::deque<uint64_t>& BioLatencySampleData::LatencyDurs() const
{
    return latencyDurs_;
}
const std::deque<uint32_t>& BioLatencySampleData::Tiers() const
{
    return tiers_;
}
const std::deque<uint64_t>& BioLatencySampleData::Sizes() const
{
    return sizes_;
}
const std::deque<uint64_t>& BioLatencySampleData::BlockNumbers() const
{
    return blockNumbers_;
}
const std::deque<uint64_t>& BioLatencySampleData::FilePathIds() const
{
    return filePathIds_;
}
const std::deque<uint64_t>& BioLatencySampleData::DurPer4k() const
{
    return durPer4ks_;
}
DataSourceClockIdData::DataSourceClockIdData()
{
    dataSource2PluginNameMap_ = {
        {DATA_SOURCE_TYPE_TRACE, "ftrace-plugin"},    {DATA_SOURCE_TYPE_MEM, "memory-plugin"},
        {DATA_SOURCE_TYPE_HILOG, "hilog-plugin"},     {DATA_SOURCE_TYPE_ALLOCATION, "nativehook"},
        {DATA_SOURCE_TYPE_FPS, "hidump-plugin"},      {DATA_SOURCE_TYPE_NETWORK, "network-plugin"},
        {DATA_SOURCE_TYPE_DISKIO, "diskio-plugin"},   {DATA_SOURCE_TYPE_CPU, "cpu-plugin"},
        {DATA_SOURCE_TYPE_PROCESS, "process-plugin"}, {DATA_SOURCE_TYPE_HISYSEVENT, "hisysevent-plugin"}};
    dataSource2ClockIdMap_ = {
        {DATA_SOURCE_TYPE_TRACE, TS_CLOCK_UNKNOW},   {DATA_SOURCE_TYPE_MEM, TS_CLOCK_UNKNOW},
        {DATA_SOURCE_TYPE_HILOG, TS_CLOCK_UNKNOW},   {DATA_SOURCE_TYPE_ALLOCATION, TS_CLOCK_UNKNOW},
        {DATA_SOURCE_TYPE_FPS, TS_CLOCK_UNKNOW},     {DATA_SOURCE_TYPE_NETWORK, TS_CLOCK_UNKNOW},
        {DATA_SOURCE_TYPE_DISKIO, TS_CLOCK_UNKNOW},  {DATA_SOURCE_TYPE_CPU, TS_CLOCK_UNKNOW},
        {DATA_SOURCE_TYPE_PROCESS, TS_CLOCK_UNKNOW}, {DATA_SOURCE_TYPE_HISYSEVENT, TS_CLOCK_UNKNOW}};
}

void DataSourceClockIdData::Finish()
{
    for (auto i = dataSource2ClockIdMap_.begin(); i != dataSource2ClockIdMap_.end(); i++) {
        if (i->second) { // ignore the empty datasource, for which the clockid is default TS_CLOCK_UNKNOW 0
            dataSourceNames_.emplace_back(dataSource2PluginNameMap_.at(i->first));
            clockIds_.emplace_back(i->second);
        }
    }
}
void DataSourceClockIdData::SetDataSourceClockId(DataSourceType source, uint32_t id)
{
    dataSource2ClockIdMap_.at(source) = id;
}
} // namespace TraceStdtype
} // namespace SysTuning
