/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

#include "listfile.h"

#include <fnmatch.h>
#include <memory>
#include <securec.h>
#include <string>
#include <string_view>
#include <sys/stat.h>
#include <thread>
#include <tuple>

#include "filemgmt_libhilog.h"

namespace OHOS::FileManagement::ModuleFileIO {
using namespace std;
using namespace OHOS::FileManagement::LibN;

thread_local OptionArgs g_optionArgs;

static bool CheckSuffix(const vector<string> &suffixs)
{
    for (string suffix : suffixs) {
        if (suffix.length() <= 1 || suffix.length() > MAX_SUFFIX_LENGTH) {
            return false;
        }
        if (suffix[0] != '.') {
            return false;
        }
        for (size_t i = 1; i < suffix.length(); i++) {
            if (!isalnum(suffix[i])) {
                return false;
            }
        }
    }
    return true;
}

static bool GetFileFilterParam(const NVal &argv, OHOS::DistributedFS::FileFilter *filter)
{
    bool ret = false;
    if (argv.HasProp("suffix")) {
        vector<string> suffixs;
        tie(ret, suffixs, ignore) = argv.GetProp("suffix").ToStringArray();
        if (!ret) {
            HILOGE("Failed to get suffix prop.");
            return false;
        }
        if (!CheckSuffix(suffixs) || suffixs.size() == 0) {
            HILOGE("Invalid suffix.");
            return false;
        }
        filter->SetSuffix(suffixs);
    }
    if (argv.HasProp("displayName")) {
        vector<string> displayNames;
        tie(ret, displayNames, ignore) = argv.GetProp("displayName").ToStringArray();
        if (!ret) {
            HILOGE("Failed to get displayname prop.");
            return false;
        }
        if (displayNames.size() == 0) {
            HILOGE("Invalid displayName.");
            return false;
        }
        filter->SetDisplayName(displayNames);
    }
    if (argv.HasProp("fileSizeOver")) {
        int64_t fileSizeOver;
        tie(ret, fileSizeOver) = argv.GetProp("fileSizeOver").ToInt64();
        if (!ret || fileSizeOver < 0) {
            HILOGE("Failed to get fileSizeOver prop.");
            return false;
        }
        filter->SetFileSizeOver(fileSizeOver);
    }
    if (argv.HasProp("lastModifiedAfter")) {
        double lastModifiedAfter;
        tie(ret, lastModifiedAfter) = argv.GetProp("lastModifiedAfter").ToDouble();
        if (!ret || lastModifiedAfter < 0) {
            HILOGE("Failed to get lastModifiedAfter prop.");
            return false;
        }
        filter->SetLastModifiedAfter(lastModifiedAfter);
    }
    return true;
}

static bool GetOptionParam(const NVal &argv, OptionArgs *optionArgs)
{
    bool succ = false;
    if (argv.HasProp("listNum")) {
        tie(succ, optionArgs->listNum) = argv.GetProp("listNum").ToInt64();
        if (!succ) {
            HILOGE("Failed to get listNum prop.");
            return false;
        } else if (optionArgs->listNum < 0) {
            HILOGE("Invalid listNum.");
            return false;
        }
    }

    if (argv.HasProp("recursion")) {
        tie(succ, optionArgs->recursion) = argv.GetProp("recursion").ToBool();
        if (!succ) {
            HILOGE("Failed to get recursion prop.");
            return false;
        }
    }

    if (argv.HasProp("filter")) {
        NVal(filterProp) = argv.GetProp("filter");
        auto ret = GetFileFilterParam(NVal(filterProp), &optionArgs->filter);
        if (!ret) {
            HILOGE("Failed to get filter prop.");
            return false;
        }
    }
    return true;
}

static bool GetOptionArg(napi_env env, const NFuncArg &funcArg, OptionArgs &optionArgs, const string &path)
{
    auto options = NVal(env, funcArg[NARG_POS::SECOND]);
    if (funcArg.GetArgc() >= NARG_CNT::TWO && options.TypeIs(napi_object)) {
        if (!GetOptionParam(options, &optionArgs)) {
            HILOGE("Invalid options");
            return false;
        }
    } else if (funcArg.GetArgc() >= NARG_CNT::TWO && !options.TypeIs(napi_function)) {
        HILOGE("Invalid options");
        return false;
    }
    optionArgs.path = path;
    return true;
}

static bool FilterSuffix(const vector<string>& suffixs, const struct dirent& filename)
{
    if (filename.d_type == DT_DIR) {
        return true;
    }
    size_t found = string(filename.d_name).rfind('.');
    if (found == std::string::npos) {
        return false;
    }
    string suffixStr = string(filename.d_name).substr(found);
    for (const auto &iter : suffixs) {
        if (iter == suffixStr) {
            return true;
        }
    }
    return false;
}

static bool FilterDisplayname(const vector<string>& displaynames, const struct dirent& filename)
{
    for (const auto &iter : displaynames) {
        int ret = fnmatch(iter.c_str(), filename.d_name, FNM_PATHNAME | FNM_PERIOD);
        if (ret == 0) {
            return true;
        }
    }
    return false;
}

static bool FilterFilesizeOver(const int64_t fFileSizeOver, const struct dirent& filename)
{
    struct stat info;
    string stPath = (g_optionArgs.path + '/' + string(filename.d_name));
    int32_t res = stat(stPath.c_str(), &info);
    if (res != 0) {
        HILOGE("Failed to stat file.");
        return false;
    }
    if (fFileSizeOver > info.st_size) {
        return false;
    }
    return true;
}

static bool FilterLastModifyTime(const double lastModifiedAfter, const struct dirent& filename)
{
    struct stat info;
    string stPath = g_optionArgs.path + '/' + string(filename.d_name);
    int32_t res = stat(stPath.c_str(), &info);
    if (res != 0) {
        HILOGE("Failed to stat file.");
        return false;
    }
    if (lastModifiedAfter > time(&info.st_mtime)) {
        return false;
    }
    return true;
}

static bool FilterResult(const struct dirent &filename)
{
    vector<string> fSuffixs = g_optionArgs.filter.GetSuffix();
    if (!FilterSuffix(fSuffixs, filename) && fSuffixs.size() > 0) {
        return false;
    }
    vector<string> fDisplaynames = g_optionArgs.filter.GetDisplayName();
    if (!FilterDisplayname(fDisplaynames, filename) && fDisplaynames.size() > 0) {
        return false;
    }
    int64_t fFileSizeOver = g_optionArgs.filter.GetFileSizeOver();
    if (!FilterFilesizeOver(fFileSizeOver, filename) && fFileSizeOver > 0) {
        return false;
    }
    double fLastModifiedAfter = g_optionArgs.filter.GetLastModifiedAfter();
    if (!FilterLastModifyTime(fLastModifiedAfter, filename) && fLastModifiedAfter > 0) {
        return false;
    }
    g_optionArgs.countNum++;
    return true;
}

static int32_t FilterFunc(const struct dirent *filename)
{
    if (string_view(filename->d_name) == "." || string_view(filename->d_name) == "..") {
        return FILTER_DISMATCH;
    }

    if (g_optionArgs.countNum < g_optionArgs.listNum || g_optionArgs.listNum == 0) {
        if ((filename->d_type == DT_DIR && g_optionArgs.recursion) || FilterResult(*filename)) {
            return FILTER_MATCH;
        }
    }
    return FILTER_DISMATCH;
}

static vector<struct dirent> FilterFileRes(const string &path)
{
    struct dirent** namelist;
    int num = scandir(path.c_str(), &(namelist), FilterFunc, alphasort);
    vector<struct dirent> dirents;
    for (int i = 0; i < num; i++) {
        struct dirent tmpDirent;
        if (EOK == memcpy_s(&tmpDirent, sizeof(dirent), namelist[i], namelist[i]->d_reclen)) {
            dirents.emplace_back(tmpDirent);
        }
        free(namelist[i]);
    }
    free(namelist);
    return dirents;
}

static void RecursiveFunc(const string &path, vector<struct dirent> &dirents)
{
    struct dirent** namelist;
    int num = scandir(path.c_str(), &(namelist), FilterFunc, alphasort);
    for (int i = 0; i < num; i++) {
        if ((*namelist[i]).d_type == DT_REG) {
            struct dirent tmpDirent;
            if (EOK == memcpy_s(&tmpDirent, sizeof(dirent), namelist[i], namelist[i]->d_reclen)) {
                dirents.emplace_back(tmpDirent);
            }
        } else if ((*(namelist)[i]).d_type == DT_DIR) {
            string pathTemp = g_optionArgs.path;
            g_optionArgs.path += '/' + string((*namelist[i]).d_name);
            RecursiveFunc(g_optionArgs.path, dirents);
            g_optionArgs.path = pathTemp;
        }
        free(namelist[i]);
    }
    free(namelist);
}

static napi_value DoListFileVector2NV(napi_env env, vector<dirent> &dirents)
{
    vector<string> strs;
    for (size_t i = 0; i < dirents.size(); i++) {
        strs.emplace_back(dirents[i].d_name);
    }
    return NVal::CreateArrayString(env, strs).val_;
}

static NVal DoListFileCompile(napi_env env, NError err, shared_ptr<ListFileArgs> arg)
{
    if (err) {
        return { env, err.GetNapiErr(env) };
    } else {
        return { env, DoListFileVector2NV(env, arg->dirents) };
    }
}

napi_value ListFile::Sync(napi_env env, napi_callback_info info)
{
    NFuncArg funcArg(env, info);
    if (!funcArg.InitArgs(NARG_CNT::ONE, NARG_CNT::TWO)) {
        HILOGE("Number of arguments unmatched");
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }
    auto [succPath, path, unused] = NVal(env, funcArg[NARG_POS::FIRST]).ToUTF8String();
    if (!succPath) {
        HILOGE("Invalid path");
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }
    if (!GetOptionArg(env, funcArg, g_optionArgs, string(path.get()))) {
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }
    vector<struct dirent> direntsRes;
    if (g_optionArgs.recursion) {
        RecursiveFunc(path.get(), direntsRes);
    } else {
        direntsRes = FilterFileRes(path.get());
    }
    g_optionArgs.Clear();
    return DoListFileVector2NV(env, direntsRes);
}

napi_value ListFile::Async(napi_env env, napi_callback_info info)
{
    NFuncArg funcArg(env, info);
    if (!funcArg.InitArgs(NARG_CNT::ONE, NARG_CNT::THREE)) {
        HILOGE("Number of arguments unmatched");
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }

    auto [succPath, path, unused] = NVal(env, funcArg[NARG_POS::FIRST]).ToUTF8String();
    if (!succPath) {
        HILOGE("Invalid path");
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }

    OptionArgs optionArgsTmp = {};
    if (!GetOptionArg(env, funcArg, optionArgsTmp, string(path.get()))) {
        NError(EINVAL).ThrowErr(env);
        return nullptr;
    }

    auto arg = make_shared<ListFileArgs>();
    if (!arg) {
        HILOGE("Failed to request heap memory.");
        NError(ENOMEM).ThrowErr(env);
        return nullptr;
    }

    auto cbExec = [arg, optionArgsTmp]() -> NError {
        g_optionArgs = optionArgsTmp;
        if (g_optionArgs.recursion) {
            RecursiveFunc(g_optionArgs.path, arg->dirents);
        } else {
            arg->dirents = FilterFileRes(g_optionArgs.path);
        }
        g_optionArgs.Clear();
        return NError(ERRNO_NOERR);
    };

    auto cbCompl = [arg](napi_env env, NError err) -> NVal {
        if (err) {
            return { env, err.GetNapiErr(env) };
        }
        return DoListFileCompile(env, err, arg);
    };

    NVal thisVar(env, funcArg.GetThisVar());

    if (funcArg.GetArgc() == NARG_CNT::ONE || (funcArg.GetArgc() == NARG_CNT::TWO &&
            NVal(env, funcArg[NARG_POS::SECOND]).TypeIs(napi_object))) {
        return NAsyncWorkPromise(env, thisVar).Schedule(LIST_FILE_PRODUCE_NAME, cbExec, cbCompl).val_;
    } else {
        int32_t cbIdx = (funcArg.GetArgc() == NARG_CNT::TWO) ? NARG_POS::SECOND : NARG_POS::THIRD;
        NVal cb(env, funcArg[cbIdx]);
        return NAsyncWorkCallback(env, thisVar, cb).Schedule(LIST_FILE_PRODUCE_NAME, cbExec, cbCompl).val_;
    }
}
} // namespace OHOS::FileManagement::ModuleFileIO