/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

#include "fdatasync.h"

#include <cstring>
#include <fcntl.h>
#include <tuple>
#include <unistd.h>
#include <sys/stat.h>

#include "common_func.h"
#include "filemgmt_libhilog.h"

namespace OHOS::FileManagement::ModuleFileIO {
using namespace std;
using namespace OHOS::FileManagement::LibN;

napi_value Fdatasync::Sync(napi_env env, napi_callback_info info)
{
    NFuncArg funcArg(env, info);
    if (!funcArg.InitArgs(NARG_CNT::ONE)) {
        HILOGE("Number of arguments unmatched");
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }

    auto [resGetFirstArg, fd] = NVal(env, funcArg[NARG_POS::FIRST]).ToInt32();
    if (!resGetFirstArg) {
        HILOGE("Invalid fd");
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }

    std::unique_ptr<uv_fs_t, decltype(CommonFunc::fs_req_cleanup)*> fdatasync_req = {
        new uv_fs_t, CommonFunc::fs_req_cleanup };
    if (!fdatasync_req) {
        HILOGE("Failed to request heap memory.");
        NError(ENOMEM).ThrowErr(env);
        return nullptr;
    }
    int ret = uv_fs_fdatasync(nullptr, fdatasync_req.get(), fd, nullptr);
    if (ret < 0) {
        HILOGE("Failed to transfer data associated with file descriptor: %{public}d, ret:%{public}d", fd, ret);
        NError(errno).ThrowErr(env);
        return nullptr;
    }

    return NVal::CreateUndefined(env).val_;
}

napi_value Fdatasync::Async(napi_env env, napi_callback_info info)
{
    NFuncArg funcArg(env, info);
    if (!funcArg.InitArgs(NARG_CNT::ONE, NARG_CNT::TWO)) {
        HILOGE("Number of arguments unmatched");
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }

    auto [resGetFirstArg, fd] = NVal(env, funcArg[NARG_POS::FIRST]).ToInt32();
    if (!resGetFirstArg) {
        HILOGE("Invalid fd");
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }

    auto cbExec = [fd = fd]() -> NError {
        std::unique_ptr<uv_fs_t, decltype(CommonFunc::fs_req_cleanup)*> fdatasync_req = {
            new uv_fs_t, CommonFunc::fs_req_cleanup };
        if (!fdatasync_req) {
            HILOGE("Failed to request heap memory.");
            return NError(ERRNO_NOERR);
        }
        int ret = uv_fs_fdatasync(nullptr, fdatasync_req.get(), fd, nullptr);
        if (ret < 0) {
            HILOGE("Failed to transfer data associated with file descriptor: %{public}d", fd);
            return NError(errno);
        } else {
            return NError(ERRNO_NOERR);
        }
    };

    auto cbComplCallback = [](napi_env env, NError err) -> NVal {
        if (err) {
            return {env, err.GetNapiErr(env)};
        }
        return {NVal::CreateUndefined(env)};
    };

    NVal thisVar(env, funcArg.GetThisVar());
    if (funcArg.GetArgc() == NARG_CNT::ONE) {
        return NAsyncWorkPromise(env, thisVar).Schedule(PROCEDURE_FDATASYNC_NAME, cbExec, cbComplCallback).val_;
    } else {
        NVal cb(env, funcArg[NARG_POS::SECOND]);
        return NAsyncWorkCallback(env, thisVar, cb).Schedule(PROCEDURE_FDATASYNC_NAME, cbExec, cbComplCallback).val_;
    }
}
} // OHOS::FileManagement::ModuleFileIO