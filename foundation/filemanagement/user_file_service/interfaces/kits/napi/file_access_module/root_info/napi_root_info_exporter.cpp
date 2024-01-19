/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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

#ifndef NAPI_FILEACCESS_HELPER_H
#define NAPI_FILEACCESS_HELPER_H

#include "napi_root_info_exporter.h"

#include "file_access_framework_errno.h"
#include "file_filter.h"
#include "file_iterator_entity.h"
#include "hilog_wrapper.h"
#include "napi_file_iterator_exporter.h"
#include "napi_utils.h"
#include "root_info_entity.h"

namespace OHOS {
namespace FileAccessFwk {
bool NapiRootInfoExporter::Export()
{
    std::vector<napi_property_descriptor> props = {
        NVal::DeclareNapiFunction("listFile", ListFile),
        NVal::DeclareNapiFunction("scanFile", ScanFile),
        NVal::DeclareNapiGetter("deviceType", GetDeviceType),
        NVal::DeclareNapiGetter("uri", GetUri),
        NVal::DeclareNapiGetter("displayName", GetDisplayName),
        NVal::DeclareNapiGetter("deviceFlags", GetDeviceFlags)
    };

    std::string className = GetClassName();
    bool succ = false;
    napi_value classValue = nullptr;
    std::tie(succ, classValue) = NClass::DefineClass(exports_.env_, className,
        NapiRootInfoExporter::Constructor, std::move(props));
    if (!succ) {
        NError(E_GETRESULT).ThrowErr(exports_.env_);
        return false;
    }

    succ = NClass::SaveClass(exports_.env_, className, classValue);
    if (!succ) {
        NError(E_GETRESULT).ThrowErr(exports_.env_);
        return false;
    }

    return exports_.AddProp(className, classValue);
}

napi_value NapiRootInfoExporter::Constructor(napi_env env, napi_callback_info info)
{
    NFuncArg funcArg(env, info);
    if (!funcArg.InitArgs(NARG_CNT::ZERO)) {
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }

    auto rootInfoEntity = std::make_unique<RootInfoEntity>();
    if (rootInfoEntity == nullptr) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    if (!NClass::SetEntityFor<RootInfoEntity>(env, funcArg.GetThisVar(), std::move(rootInfoEntity))) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    return funcArg.GetThisVar();
}

napi_value NapiRootInfoExporter::ListFile(napi_env env, napi_callback_info info)
{
    NFuncArg funcArg(env, info);
    if (!funcArg.InitArgs(NARG_CNT::ZERO, NARG_CNT::ONE)) {
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }

    FileFilter filter({}, {}, {}, 0, 0, false, false);
    if (funcArg.GetArgc() == NARG_CNT::ONE) {
        auto ret = GetFileFilterParam(NVal(env, funcArg.GetArg(NARG_POS::FIRST)), filter);
        if (ret != ERR_OK) {
            NError(ret).ThrowErr(env);
            return nullptr;
        }
    }

    auto rootEntity = NClass::GetEntityOf<RootInfoEntity>(env, funcArg.GetThisVar());
    if (rootEntity == nullptr) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    if (rootEntity->fileAccessHelper == nullptr) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    napi_value objFileIteratorExporter = NClass::InstantiateClass(env, NapiFileIteratorExporter::className_, {});
    if (objFileIteratorExporter == nullptr) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    auto fileIteratorEntity = NClass::GetEntityOf<FileIteratorEntity>(env, objFileIteratorExporter);
    if (fileIteratorEntity == nullptr) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    FileInfo fileInfo;
    fileInfo.uri = rootEntity->rootInfo.uri;
    fileInfo.mode = DOCUMENT_FLAG_REPRESENTS_DIR | DOCUMENT_FLAG_SUPPORTS_READ | DOCUMENT_FLAG_SUPPORTS_WRITE;
    {
        std::lock_guard<std::mutex> lock(fileIteratorEntity->entityOperateMutex);
        fileIteratorEntity->fileAccessHelper = rootEntity->fileAccessHelper;
        fileIteratorEntity->fileInfo = fileInfo;
        fileIteratorEntity->fileInfoVec.clear();
        fileIteratorEntity->offset = 0;
        fileIteratorEntity->pos = 0;
        fileIteratorEntity->filter = std::move(filter);
        fileIteratorEntity->flag = 0;
        auto ret = rootEntity->fileAccessHelper->ListFile(fileInfo, fileIteratorEntity->offset,
            MAX_COUNT, filter, fileIteratorEntity->fileInfoVec);
        if (ret != ERR_OK) {
            NError(ret).ThrowErr(env);
            return nullptr;
        }
    }

    return NVal(env, objFileIteratorExporter).val_;
}

napi_value NapiRootInfoExporter::ScanFile(napi_env env, napi_callback_info info)
{
    NFuncArg funcArg(env, info);
    if (!funcArg.InitArgs(NARG_CNT::ZERO, NARG_CNT::ONE)) {
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }

    FileFilter filter({}, {}, {}, 0, 0, false, false);
    if (funcArg.GetArgc() == NARG_CNT::ONE) {
        auto ret = GetFileFilterParam(NVal(env, funcArg.GetArg(NARG_POS::FIRST)), filter);
        if (ret != ERR_OK) {
            NError(ret).ThrowErr(env);
            return nullptr;
        }
    }

    auto rootEntity = NClass::GetEntityOf<RootInfoEntity>(env, funcArg.GetThisVar());
    if (rootEntity == nullptr) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    if (rootEntity->fileAccessHelper == nullptr) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    napi_value objFileIteratorExporter = NClass::InstantiateClass(env, NapiFileIteratorExporter::className_, {});
    if (objFileIteratorExporter == nullptr) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    auto fileIteratorEntity = NClass::GetEntityOf<FileIteratorEntity>(env, objFileIteratorExporter);
    if (fileIteratorEntity == nullptr) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    FileInfo fileInfo;
    fileInfo.uri = rootEntity->rootInfo.uri;
    fileInfo.mode = DOCUMENT_FLAG_REPRESENTS_DIR | DOCUMENT_FLAG_SUPPORTS_READ | DOCUMENT_FLAG_SUPPORTS_WRITE;
    {
        std::lock_guard<std::mutex> lock(fileIteratorEntity->entityOperateMutex);
        fileIteratorEntity->fileAccessHelper = rootEntity->fileAccessHelper;
        fileIteratorEntity->fileInfo = fileInfo;
        fileIteratorEntity->fileInfoVec.clear();
        fileIteratorEntity->offset = 0;
        fileIteratorEntity->pos = 0;
        fileIteratorEntity->filter = std::move(filter);
        fileIteratorEntity->flag = 1;
        auto ret = rootEntity->fileAccessHelper->ScanFile(fileInfo, fileIteratorEntity->offset,
            MAX_COUNT, filter, fileIteratorEntity->fileInfoVec);
        if (ret != ERR_OK) {
            NError(ret).ThrowErr(env);
            return nullptr;
        }
    }

    return NVal(env, objFileIteratorExporter).val_;
}

napi_value NapiRootInfoExporter::GetDeviceType(napi_env env, napi_callback_info info)
{
    NFuncArg funcArg(env, info);
    if (!funcArg.InitArgs(NARG_CNT::ZERO)) {
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }

    auto rootInfoEntity = NClass::GetEntityOf<RootInfoEntity>(env, funcArg.GetThisVar());
    if (rootInfoEntity == nullptr) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    return NVal::CreateInt64(env, (int64_t)(rootInfoEntity->rootInfo.deviceType)).val_;
}

napi_value NapiRootInfoExporter::GetUri(napi_env env, napi_callback_info info)
{
    NFuncArg funcArg(env, info);
    if (!funcArg.InitArgs(NARG_CNT::ZERO)) {
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }

    auto rootInfoEntity = NClass::GetEntityOf<RootInfoEntity>(env, funcArg.GetThisVar());
    if (rootInfoEntity == nullptr) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    return NVal::CreateUTF8String(env, rootInfoEntity->rootInfo.uri).val_;
}

napi_value NapiRootInfoExporter::GetDisplayName(napi_env env, napi_callback_info info)
{
    NFuncArg funcArg(env, info);
    if (!funcArg.InitArgs(NARG_CNT::ZERO)) {
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }

    auto rootInfoEntity = NClass::GetEntityOf<RootInfoEntity>(env, funcArg.GetThisVar());
    if (rootInfoEntity == nullptr) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    return NVal::CreateUTF8String(env, rootInfoEntity->rootInfo.displayName).val_;
}

napi_value NapiRootInfoExporter::GetDeviceFlags(napi_env env, napi_callback_info info)
{
    NFuncArg funcArg(env, info);
    if (!funcArg.InitArgs(NARG_CNT::ZERO)) {
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }

    auto rootInfoEntity = NClass::GetEntityOf<RootInfoEntity>(env, funcArg.GetThisVar());
    if (rootInfoEntity == nullptr) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    return NVal::CreateInt64(env, rootInfoEntity->rootInfo.deviceFlags).val_;
}

std::string NapiRootInfoExporter::GetClassName()
{
    return NapiRootInfoExporter::className_;
}
} // namespace FileAccessFwk
} // namespace OHOS
#endif // NAPI_FILEACCESS_HELPER_H