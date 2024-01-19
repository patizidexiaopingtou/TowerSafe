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
#include "utilities.h"

#include <zlib.h>
#if is_mingw
#include <io.h>
#endif
#include "logging.h"

namespace OHOS {
namespace Developtools {
namespace NativeDaemon {
uint32_t RoundUp(uint32_t x, const int align)
{
    return (((x) + (align)-1) / (align)) * (align);
}

std::string StringReplace(std::string source, const std::string &from, const std::string &to)
{
    size_t pos = 0;
    std::string result;
    // find
    while ((pos = source.find(from)) != std::string::npos) {
        // replace
        result.append(source.substr(0, pos) + to);
        source.erase(0, pos + from.length());
    }
    // add last token
    result.append(source);
    return result;
}

size_t SubStringCount(const std::string &source, const std::string &sub)
{
    size_t count(0);
    size_t pos(0);
    if (sub.empty()) {
        return source.size();
    }
    while ((pos = source.find(sub, pos)) != std::string::npos) {
        pos += sub.size();
        count++;
    }
    return count;
}

std::vector<std::string> StringSplit(std::string source, std::string split)
{
    size_t pos = 0;
    std::vector<std::string> result;

    // find
    if (!split.empty()) {
        while ((pos = source.find(split)) != std::string::npos) {
            // split
            std::string token = source.substr(0, pos);
            if (!token.empty()) {
                result.push_back(token);
            }
            source.erase(0, pos + split.length());
        }
    }
    // add last token
    if (!source.empty()) {
        result.push_back(source);
    }
    return result;
}
StdoutRecord::StdoutRecord(const std::string &tempFile, const std::string &mode)
{
    if (!tempFile.empty()) {
        recordFile_ = fopen(tempFile.c_str(), mode.c_str());
        if (recordFile_ == nullptr) {
            HLOGE("tmpfile create failed '%s' with mode '%s'", tempFile.c_str(), mode.c_str());
        } else {
            // auto start it
            Start();
        }
    }
}
bool StdoutRecord::Start()
{
    content_ = EMPTY_STRING;
    fflush(stdout);

    // we will save output here
    if (recordFile_ == nullptr) {
        recordFile_ = std::tmpfile();
    }
    if (recordFile_ == nullptr) {
        // try second way
        std::string fileName = "/data/local/tmp/temp.stdout";
        recordFile_ = fopen(fileName.c_str(), "w+");
        if (recordFile_ == nullptr) {
            HLOGF("tmpfile create failed '%s'", fileName.c_str());
            return false;
        }
    }

    // we save the stdout
    stdoutFile_ = OHOS::UniqueFd(dup(STDOUT_FILENO));
    if (stdoutFile_ == -1) {
        HLOGF("std dup failed");
        return false;
    }

    // setup temp file as stdout
    if (dup2(fileno(recordFile_), STDOUT_FILENO) != -1) {
        stop_ = false;
        return true;
    } else {
        HLOGF("std dup2 failed");
        return false;
    }
}

std::string StdoutRecord::Stop()
{
    if (stop_)
        return content_;
    fflush(stdout);
    // restore fd
    dup2(stdoutFile_, STDOUT_FILENO);

    // return file content
    if (recordFile_ != nullptr) {
        const long fileLength = lseek(fileno(recordFile_), 0, SEEK_END);
        content_.resize(fileLength);
        lseek(fileno(recordFile_), 0, SEEK_SET);
        const long len = read(fileno(recordFile_), content_.data(), fileLength);
        std::fclose(recordFile_);
        recordFile_ = nullptr;
        if (len < 0) {
            HLOGE("tmp file read failed (try read %ld)", fileLength);
        } else if (len < fileLength) {
            HLOGE("not all the data is read, lost %ld/%ld bytes", fileLength - len, fileLength);
        }
    } else {
        HLOGE("recordFile_ is nullptr");
    }
    stop_ = true;
    return content_;
}

bool IsDigits(const std::string &str)
{
    if (str.empty()) {
        return false;
    } else {
        return std::all_of(str.begin(), str.end(), ::isdigit);
    }
}

bool IsHexDigits(const std::string &str)
{
    if (str.empty()) {
        return false;
    }
    const std::string prefix {"0x"};
    std::string effectStr {str};
    if (prefix.compare(0, prefix.size(), effectStr.substr(0, prefix.size())) == 0) {
        effectStr = effectStr.substr(prefix.size(), effectStr.size() - prefix.size());
    }
    if (effectStr.empty()) {
        return false;
    }
    std::size_t start {0};
    for (; start < effectStr.size(); ++start) {
        if (effectStr[start] == '0') {
            continue;
        }
        break;
    }
    if (start == effectStr.size()) {
        effectStr = "0";
    }
    return std::all_of(effectStr.begin(), effectStr.end(), ::isxdigit);
}

bool IsDir(const std::string &path)
{
    struct stat st;
    if (stat(path.c_str(), &st) == 0) {
        return S_ISDIR(st.st_mode);
    }
    return false;
}

bool IsPath(const std::string &fileName)
{
    HLOG_ASSERT(!fileName.empty());
    if (fileName[0] == PATH_SEPARATOR) {
        return true;
    }
    const int prefixPathLen = 2;
    if (fileName.substr(0, prefixPathLen) == "./") {
        return true;
    }
    return false;
}

std::string PlatformPathConvert(const std::string &path)
{
#if is_mingw
    return StringReplace(path, "/", "\\");
#else
    return path;
#endif
}

std::string ReadFileToString(const std::string &fileName)
{
    std::ifstream inputString(fileName, std::ios::in);
    if (!inputString) {
        return EMPTY_STRING;
    }
    std::istreambuf_iterator<char> firstIt = {inputString};
    std::istreambuf_iterator<char> lastIt = {};

    std::string content(firstIt, lastIt);
    return content;
}

bool ReadFileToString(const std::string &fileName, std::string &fileData, size_t fileSize)
{
    fileData.clear();
    OHOS::UniqueFd fd(open(fileName.c_str(), O_RDONLY | O_BINARY));
    if (fileSize == 0) {
        struct stat fileStat;
        if (fstat(fd.Get(), &fileStat) != -1 && fileStat.st_size > 0) {
            fileData.reserve(fileStat.st_size);
        }
    } else {
        fileData.reserve(fileSize);
    }

    char buf[BUFSIZ] __attribute__((__uninitialized__));
    ssize_t readSize;
    while ((readSize = read(fd.Get(), &buf[0], sizeof(buf))) > 0) {
        fileData.append(buf, readSize);
    }
    return (readSize == 0) ? true : false;
}

bool WriteStringToFile(const std::string &fileName, const std::string &value)
{
    std::ofstream output(fileName, std::ios::out);
    if (!output) {
        return false;
    }
    output << value;

    return output.good();
}

bool IsRoot()
{
#if is_linux || is_ohos
    static bool isRoot = (getuid() == 0);
    return isRoot;
#else
    return true;
#endif
}

bool PowerOfTwo(int n)
{
    return n && (!(n & (n - 1)));
}

bool ReadIntFromProcFile(const std::string &path, int &value)
{
    std::string s = ReadFileToString(path);
    if (s.empty()) {
        return false;
    }
    value = std::stoi(s);
    return true;
}

bool WriteIntToProcFile(const std::string &path, int value)
{
    std::string s = std::to_string(value);

    return WriteStringToFile(path, s);
}

// compress specified dataFile into gzip file
bool CompressFile(const std::string &dataFile, const std::string &destFile)
{
    FILE *fp = fopen(dataFile.c_str(), "rb");
    if (fp == nullptr) {
        HLOGE("Fail to open data file %s", dataFile.c_str());
        perror("Fail to fopen(rb)");
        return false;
    }

    std::unique_ptr<gzFile_s, decltype(&gzclose)> fgz(gzopen(destFile.c_str(), "wb"), gzclose);
    if (fgz == nullptr) {
        HLOGE("Fail to call gzopen(%s)", destFile.c_str());
        fclose(fp);
        return false;
    }

    std::vector<char> buf(COMPRESS_READ_BUF_SIZE);
    size_t len = 0;
    while ((len = fread(buf.data(), sizeof(uint8_t), buf.size(), fp))) {
        if (gzwrite(fgz.get(), buf.data(), len) == 0) {
            HLOGE("Fail to call gzwrite for %zu bytes", len);
            fclose(fp);
            return false;
        }
    }
    if (!feof(fp)) {
        if (ferror(fp) != 0) {
            HLOGE("ferror return err");
            fclose(fp);
            return false;
        }
    }
    const int errBufSize = 256;
    char errBuf[errBufSize] = { 0 };
    strerror_r(errno, errBuf, errBufSize);
    CHECK_TRUE(fclose(fp) == 0, false, "fclose failed! errno(%d:%s)", errno, errBuf);
    return true;
}

// uncompress specified gzip file into dataFile
bool UncompressFile(const std::string &gzipFile, const std::string &dataFile)
{
    FILE *fp = fopen(dataFile.c_str(), "wb");
    if (fp == nullptr) {
        HLOGE("Fail to open data file %s", dataFile.c_str());
        perror("Fail to fopen(rb)");
        return false;
    }
    std::unique_ptr<gzFile_s, decltype(&gzclose)> fgz(gzopen(gzipFile.c_str(), "rb"), gzclose);
    if (fgz == nullptr) {
        HLOGE("Fail to call gzopen(%s)", gzipFile.c_str());
        fclose(fp);
        return false;
    }

    std::vector<char> buf(COMPRESS_READ_BUF_SIZE);
    z_size_t len = 0;
    while ((len = gzfread(buf.data(), sizeof(uint8_t), buf.size(), fgz.get()))) {
        if (len != fwrite(buf.data(), sizeof(uint8_t), len, fp)) {
            HLOGE("Fail to call fwrite for %zu bytes", len);
            fclose(fp);
            return false;
        }
    }
    if (!gzeof(fgz.get())) {
        int rc = 0;
        const char *err = gzerror(fgz.get(), &rc);
        if (rc != Z_OK) {
            HLOGE("gzfread return %d:%s", rc, err);
            fclose(fp);
            return false;
        }
    }
    const int size = 256;
    char errBuf[size] = { 0 };
    strerror_r(errno, errBuf, size);
    CHECK_TRUE(fclose(fp) == 0, false, "fclose failed! errno(%d:%s)", errno, errBuf);
    return true;
}

std::string &StringTrim(std::string &string)
{
    if (!string.empty()) {
        string.erase(0, string.find_first_not_of(" "));
        string.erase(string.find_last_not_of(" ") + 1);
    }
    return string;
}

std::vector<std::string> GetEntriesInDir(const std::string &basePath)
{
    std::vector<std::string> result;
    DIR *dir = opendir(basePath.c_str());
    if (dir == nullptr) {
        return result;
    }
    dirent *entry;
    while ((entry = readdir(dir)) != nullptr) {
        if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0) {
            continue;
        }
        result.push_back(entry->d_name);
    }
    closedir(dir);
    return result;
}

std::vector<std::string> GetSubDirs(const std::string &basePath)
{
    std::vector<std::string> entries = GetEntriesInDir(basePath);
    std::vector<std::string> result = {};
    for (std::size_t index = 0; index < entries.size(); ++index) {
        if (IsDir(basePath + "/" + entries[index])) {
            result.push_back(std::move(entries[index]));
        }
    }
    return result;
}

bool IsSameCommand(std::string cmdLine, std::string cmdName)
{
    std::vector<std::string> cmdpaths = StringSplit(cmdLine, "/");
    if (!cmdpaths.empty()) {
        if (strcmp(cmdpaths.back().c_str(), cmdName.c_str()) == 0) {
            return true;
        }
    }
    return false;
}

std::vector<pid_t> GetSubthreadIDs(const pid_t pid)
{
    std::string path {"/proc/"};
    path += std::to_string(pid);
    path += "/task/";
    auto tids = GetSubDirs(path);
    std::vector<pid_t> res {};
    for (auto tidStr : tids) {
        pid_t tid = static_cast<pid_t>(std::stoul(tidStr, nullptr));
        if (tid == pid) {
            continue;
        }
        res.push_back(tid);
    }
    return res;
}

bool StringStartsWith(const std::string &string, const std::string &with)
{
    return string.find(with) == 0;
}

bool StringEndsWith(const std::string &string, const std::string &with)
{
    if (string.empty()) {
        // empty string only end with empty string
        if (with.empty()) {
            return true;
        } else {
            return false;
        }
    }
    return string.rfind(with) == (string.length() - with.length());
}

void HexDump(const uint8_t *buf, size_t size, size_t maxSize)
{
    const unsigned char *byteBuf = static_cast<const unsigned char *>(buf);
    const size_t dumpByteEachLine = 8;
    size_t outputBytes = 0;
    if (!maxSize) {
        outputBytes = size;
    } else {
        outputBytes = std::min(size, maxSize);
    }

    for (size_t i = 0; i <= outputBytes; i += dumpByteEachLine) {
        HLOGM(" %02zu: %s ", i, BufferToHexString(byteBuf, dumpByteEachLine).c_str());
        byteBuf += dumpByteEachLine;
    }
}

std::string BufferToHexString(const std::vector<unsigned char> &vec)
{
    return BufferToHexString(vec.data(), vec.size());
}

std::string BufferToHexString(const unsigned char buf[], size_t size)
{
    std::stringstream ss;
    ss << size << ":";
    for (size_t i = 0; i < size; i++) {
        ss << " 0x" << std::setfill('0') << std::setw(BYTE_PRINT_WIDTH) << std::hex
           << (unsigned short)buf[i];
    }
    return ss.str();
}
} // namespace NativeDaemon
} // namespace Developtools
} // namespace OHOS

// this will also used for libunwind head (out of namespace)
#if is_mingw
using namespace OHOS::Developtools::NativeDaemon;
std::string GetLastErrorString()
{
    LPVOID lpMsgBuf;
    FormatMessage(FORMAT_MESSAGE_ALLOCATE_BUFFER | FORMAT_MESSAGE_FROM_SYSTEM |
                  FORMAT_MESSAGE_IGNORE_INSERTS,
                  NULL, GetLastError(), 0, (LPTSTR)&lpMsgBuf, 0, NULL);
    std::string error((LPTSTR)lpMsgBuf);
    LocalFree(lpMsgBuf);
    return error;
}

void *mmap(void *addr, size_t length, int prot, int flags, int fd, size_t offset)
{
    HANDLE FileHandle = reinterpret_cast<HANDLE>(_get_osfhandle(fd));
    if (FileHandle == INVALID_HANDLE_VALUE) {
        return MMAP_FAILED;
    }

    HLOGV("fd is %d", fd);

    HANDLE FileMappingHandle = ::CreateFileMappingW(FileHandle, 0, PAGE_READONLY, 0, 0, 0);
    if (FileMappingHandle == nullptr) {
        HLOGE("CreateFileMappingW %zu Failed with %ld:%s", length, GetLastError(),
              GetLastErrorString().c_str());
        return MMAP_FAILED;
    }

    void *mapAddr = ::MapViewOfFile(FileMappingHandle, FILE_MAP_READ, 0, 0, 0);
    if (mapAddr == nullptr) {
        HLOGE("MapViewOfFile %zu Failed with %ld:%s", length, GetLastError(),
              GetLastErrorString().c_str());
        return MMAP_FAILED;
    }

    // Close all the handles except for the view. It will keep the other handles
    // alive.
    ::CloseHandle(FileMappingHandle);
    return mapAddr;
}

int munmap(void *addr, size_t)
{
    /*
        On success, munmap() returns 0.  On failure, it returns -1, and
        errno is set to indicate the error (probably to EINVAL).

        UnmapViewOfFile function (memoryapi.h)

        If the function succeeds, the return value is nonzero.
        If the function fails, the return value is zero. To get extended error information, call
    GetLastError.
    */
    return !UnmapViewOfFile(addr);
}
#endif