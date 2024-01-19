/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
#ifndef HDC_TRANSFER_H
#define HDC_TRANSFER_H
#include "common.h"

namespace Hdc {
class HdcTransferBase : public HdcTaskBase {
public:
    enum CompressType { COMPRESS_NONE, COMPRESS_LZ4, COMPRESS_LZ77, COMPRESS_LZMA, COMPRESS_BROTLI };
    // used for child class
    struct TransferConfig {
        uint64_t fileSize;
        uint64_t atime;  // ns
        uint64_t mtime;  // ns
        string options;
        string path;
        string optionalName;
        bool updateIfNew;
        uint8_t compressType;
        bool holdTimestamp;
        string functionName;
        string clientCwd;
        string reserve1;
        string reserve2;
    };
    struct FileMode {
        uint64_t perm;
        uint64_t u_id;
        uint64_t g_id;
        string context;
        string fullName;
    };
    // used for HdcTransferBase. just base class use, not public
    struct TransferPayload {
        uint64_t index;
        uint8_t compressType;
        uint32_t compressSize;
        uint32_t uncompressSize;
    };
    HdcTransferBase(HTaskInfo hTaskInfo);
    virtual ~HdcTransferBase();
    virtual void StopTask()
    {
    }
    bool CommandDispatch(const uint16_t command, uint8_t *payload, const int payloadSize);

protected:
    // Static file context
    struct CtxFile {  // The structure cannot be initialized by MEMSET, will rename to CtxTransfer
        uint64_t fileSize;
        uint64_t dirSize;
        uint64_t indexIO; // Id or written IO bytes
        uint32_t fileCnt; // add for directory mode
        bool isDir;       // add for directory mode
        bool targetDirNotExist;
        uint64_t transferBegin;
        uint64_t transferDirBegin;
        string localName;
        string localPath;
        string remotePath;
        string localDirName;
        bool fileModeSync;
        bool master;  // Document transmission initiative
        bool closeNotify;
        bool ioFinish;
        void *thisClass;
        uint32_t lastErrno;
        uv_loop_t *loop;
        uv_fs_t fsOpenReq;
        uv_fs_t fsCloseReq;
        uv_fs_cb cb;
        vector<string> taskQueue;  // save file list if directory send mode
        TransferConfig transferConfig;  // Used for network IO configuration initialization
        FileMode fileMode;
        vector<FileMode> dirMode; // save dir mode on master
        map<string, FileMode> dirModeMap; // save dir mode on slave
    };
    // Just app-mode use
    enum AppModType {
        APPMOD_NONE,
        APPMOD_INSTALL,
        APPMOD_UNINSTALL,
        APPMOD_SIDELOAD,
    };

    static void OnFileOpen(uv_fs_t *req);
    static void OnFileClose(uv_fs_t *req);
    int GetSubFiles(const char *path, string filter, vector<string> *out);
    int GetSubFilesRecursively(string path, string currentDirname, vector<string> *out);
    virtual void CheckMaster(CtxFile *context)
    {
    }
    virtual void WhenTransferFinish(CtxFile *context)
    {
    }
    bool MatchPackageExtendName(string fileName, string extName);
    bool ResetCtx(CtxFile *context, bool full = false);
    bool SmartSlavePath(string &cwd, string &localPath, const char *optName);
    bool CheckLocalPath(string &localPath, string &optName, string &errStr);
    bool CheckFilename(string &localPath, string &optName, string &errStr);
    void SetFileTime(CtxFile *context);
    void ExtractRelativePath(string &cwd, string &path);

    CtxFile ctxNow;
    uint16_t commandBegin;
    uint16_t commandData;
    const string CMD_OPTION_CLIENTCWD = "-cwd";

private:
    // dynamic IO context
    struct CtxFileIO {
        uv_fs_t fs;
        uint8_t *bufIO;
        CtxFile *context;
    };
    static const uint8_t payloadPrefixReserve = 64;
    static void OnFileIO(uv_fs_t *req);
    int SimpleFileIO(CtxFile *context, uint64_t index, uint8_t *sendBuf, int bytes);
    bool SendIOPayload(CtxFile *context, uint64_t index, uint8_t *data, int dataSize);
    bool RecvIOPayload(CtxFile *context, uint8_t *data, int dataSize);
    double maxTransferBufFactor = 0.8;  // Make the data sent by each IO in one hdc packet
};
}  // namespace Hdc

#endif
