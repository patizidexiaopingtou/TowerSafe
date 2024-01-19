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

#include "napi_root_iterator_exporter.h"

#include "hilog_wrapper.h"
#include "napi_root_info_exporter.h"
#include "root_info_entity.h"
#include "root_iterator_entity.h"

namespace OHOS {
namespace FileAccessFwk {
bool NapiRootIteratorExporter::Export()
{
    std::vector<napi_property_descriptor> props = {
        NVal::DeclareNapiFunction("next", Next),
    };

    std::string className = GetClassName();
    bool succ = false;
    napi_value classValue = nullptr;
    std::tie(succ, classValue) = NClass::DefineClass(exports_.env_, className,
        NapiRootIteratorExporter::Constructor, std::move(props));
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

napi_value NapiRootIteratorExporter::Constructor(napi_env env, napi_callback_info info)
{
    NFuncArg funcArg(env, info);
    if (!funcArg.InitArgs(NARG_CNT::ZERO)) {
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }

    auto rootIteratorEntity = std::make_unique<RootIteratorEntity>();
    if (rootIteratorEntity == nullptr) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    if (!NClass::SetEntityFor<RootIteratorEntity>(env, funcArg.GetThisVar(), std::move(rootIteratorEntity))) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    return funcArg.GetThisVar();
}

napi_value NapiRootIteratorExporter::Next(napi_env env, napi_callback_info info)
{
    NFuncArg funcArg(env, info);
    if (!funcArg.InitArgs(NARG_CNT::ZERO)) {
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }

    napi_value thisVar = funcArg.GetThisVar();
    auto rootIterator = NClass::GetEntityOf<RootIteratorEntity>(env, thisVar);
    if (rootIterator == nullptr) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    napi_value objRootInfoExporter = NClass::InstantiateClass(env, NapiRootInfoExporter::className_, {});
    if (objRootInfoExporter == nullptr) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    auto rootInfoEntity = NClass::GetEntityOf<RootInfoEntity>(env, objRootInfoExporter);
    if (rootInfoEntity == nullptr) {
        NError(E_GETRESULT).ThrowErr(env);
        return nullptr;
    }

    auto retNVal = NVal::CreateObject(env);
    bool done = true;
    {
        std::lock_guard<std::mutex> lock(rootIterator->entityOperateMutex);
        auto len = rootIterator->devVec.size();
        rootInfoEntity->fileAccessHelper = rootIterator->fileAccessHelper;
        if (rootIterator->pos < len) {
            rootInfoEntity->rootInfo = rootIterator->devVec[rootIterator->pos];
            done = false;
            rootIterator->pos++;
        } else {
            rootInfoEntity = nullptr;
            objRootInfoExporter = NVal::CreateUndefined(env).val_;
            done = true;
        }
        retNVal.AddProp("value", objRootInfoExporter);
        retNVal.AddProp("done", NVal::CreateBool(env, done).val_);
    }

    return retNVal.val_;
}

std::string NapiRootIteratorExporter::GetClassName()
{
    return NapiRootIteratorExporter::className_;
}
} // namespace FileAccessFwk
} // namespace OHOS