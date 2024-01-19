/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
#ifndef OHOS_STORAGE_DAEMON_ACL_H
#define OHOS_STORAGE_DAEMON_ACL_H

#include <iosfwd>
#include <set>
#include "__functional_base"

namespace OHOS {
namespace StorageDaemon {
/*
 * ACL extended attributes (xattr) names
 */
constexpr const char *ACL_XATTR_ACCESS  = "system.posix_acl_access";
constexpr const char *ACL_XATTR_DEFAULT = "system.posix_acl_default";

/*
 * ACL tag values
 */
enum class ACL_TAG : uint16_t {
    UNDEFINED = 0x00,
    USER_OBJ  = 0x01,
    USER      = 0x02,
    GROUP_OBJ = 0x04,
    GROUP     = 0x08,
    MASK      = 0x10,
    OTHER     = 0x20,
};

/*
 * ACL perm values
 */
class ACL_PERM {
    uint16_t value = 0;
    enum Value : uint16_t {
        READ    = 0x04,
        WRITE   = 0x02,
        EXECUTE = 0x01,
    };
public:
    ACL_PERM() = default;
    ACL_PERM(const uint16_t x)
    {
        value = (x & READ) | (x & WRITE) | (x & EXECUTE);
    }
    void SetR()
    {
        value |= READ;
    }
    void SetW()
    {
        value |= WRITE;
    }
    void SetE()
    {
        value |= EXECUTE;
    }
    bool IsReadable() const
    {
        return value & READ;
    }
    bool IsWritable() const
    {
        return value & WRITE;
    }
    bool IsExecutable() const
    {
        return value & EXECUTE;
    }
    void Merge(const ACL_PERM &acl_perm)
    {
        value |= acl_perm.value;
    }
};

/*
 * Other constants
 */
constexpr uint32_t ACL_EA_VERSION = 0x0002;
constexpr uint32_t ACL_UNDEFINED_ID = (uint32_t)-1;

/*
 * ACL data structure
 */
struct AclXattrHeader {
    uint32_t version = ACL_EA_VERSION;
};

struct AclXattrEntry {
    ACL_TAG tag = ACL_TAG::UNDEFINED;
    ACL_PERM perm = {};
    uint32_t id = ACL_UNDEFINED_ID;
    bool IsValid() const
    {
        if (tag == ACL_TAG::USER || tag == ACL_TAG::GROUP) {
            return id != ACL_UNDEFINED_ID;
        }
        return tag != ACL_TAG::UNDEFINED;
    }
    bool operator<(const AclXattrEntry &rhs) const
    {
        if (tag == rhs.tag) {
            return id < rhs.id;
        }
        return tag < rhs.tag;
    }
    friend inline bool operator<(const AclXattrEntry &lhs, const ACL_TAG &rhs)
    {
        return lhs.tag < rhs;
    }
    friend inline bool operator<(const ACL_TAG &lhs, const AclXattrEntry &rhs)
    {
        return lhs < rhs.tag;
    }
};

class Acl {
    AclXattrHeader header;
    /*
     * Only one entry should exist for the following types:
     *     ACL_USER_OBJ
     *     ACL_GROUP_OBJ
     *     ACL_MASK
     *     ACL_OTHER
     * While for these types, multiple entries could exist, but one entry
     * for each id (i.e. uid/gid):
     *     ACL_USER
     *     ACL_GROUP
     */
    std::set<AclXattrEntry, std::less<>> entries;
    char *buf = nullptr;
    unsigned maskDemand = 0;
    constexpr static size_t ENTRIES_MAX_NUM = 100; // just heuristic
    constexpr static size_t BUF_MAX_SIZE = sizeof(AclXattrHeader) + sizeof(AclXattrEntry) * ENTRIES_MAX_NUM;
    ACL_PERM ReCalcMaskPerm();
public:
    bool IsEmpty();
    bool IsValid();
    int InsertEntry(const AclXattrEntry &entry);
    char *Serialize(size_t &bufSize);
    int DeSerialize(const char *p, size_t size);
    ~Acl();
};

int AclSetDefault(const std::string &targetFile, const std::string &entryTxt);
} // STORAGE_DAEMON
} // OHOS

#endif // OHOS_STORAGE_DAEMON_ACL_H
