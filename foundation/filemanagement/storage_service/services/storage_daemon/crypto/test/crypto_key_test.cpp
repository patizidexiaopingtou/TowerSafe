/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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

#include <gtest/gtest.h>
#include <string>
#include <vector>

#include <stdlib.h>
#include <sys/wait.h>
#include <unistd.h>

#include "directory_ex.h"
#include "fbex.h"
#include "file_ex.h"
#include "fscrypt_key_v1_ext.h"
#include "fscrypt_key_v1.h"
#include "fscrypt_key_v2.h"
#include "huks_master.h"
#include "key_blob.h"
#include "key_manager.h"
#include "libfscrypt/fscrypt_control.h"
#include "libfscrypt/fscrypt_sysparam.h"
#include "libfscrypt/fscrypt_utils.h"
#include "libfscrypt/key_control.h"
#include "securec.h"

using namespace testing::ext;
using namespace OHOS::StorageDaemon;

namespace {
const std::string TEST_MNT = "/data";
const std::string TEST_DIR_LEGACY = "/data/test/crypto_dir_legacy";
const std::string TEST_DIR_V2 = "/data/test/crypto_dir";
const std::string TEST_KEYPATH = "/data/test/key/el2/80";
const std::string TEST_KEYPATH_BAD = "/sys/test/keypath";
const std::string TEST_KEYDIR_VERSION0 = "/version_0";
const std::string TEST_KEYDIR_VERSION1 = "/version_1";
const std::string TEST_KEYDIR_VERSION2 = "/version_2";
const std::string TEST_KEYDIR_LATEST = "/latest";
const std::string TEST_KEYDIR_LATEST_BACKUP = "/latest_bak";
const std::string TEST_POLICY = "/data/test/policy";
const std::string USER_KEY_DIR = "/data/service/el1/public/storage_daemon/sd";
const std::string USER_KEY_EL1_DIR = USER_KEY_DIR + "/el1";
const std::string USER_KEY_EL2_DIR = USER_KEY_DIR + "/el2";
FscryptKeyV1 g_testKeyV1 {TEST_KEYPATH};
FscryptKeyV2 g_testKeyV2 {TEST_KEYPATH};
}

class CryptoKeyTest : public testing::Test {
public:
    static void SetUpTestCase(void);
    static void TearDownTestCase(void);
    static int32_t ExecSdcBinary(std::vector<std::string> params, int isCrypt);
    void SetUp();
    void TearDown();
    UserAuth emptyUserAuth {};
};

void CryptoKeyTest::SetUpTestCase(void)
{
    // input testsuit setup step，setup invoked before all testcases
}

void CryptoKeyTest::TearDownTestCase(void)
{
    // input testsuit teardown step，teardown invoked after all testcases
}

void CryptoKeyTest::SetUp(void)
{
    // input testcase setup step，setup invoked before each testcases
}

void CryptoKeyTest::TearDown(void)
{
    // input testcase teardown step，teardown invoked after each testcases
}

int32_t CryptoKeyTest::ExecSdcBinary(std::vector<std::string> params, int isCrypt)
{
    pid_t pid = fork();
    if (pid < 0) {
        return -EINVAL;
    }
    if (pid == 0) {
        int ret = -EINVAL;
        if (!isCrypt) {
             char * const argv[] = {
                (char *)"/system/bin/sdc",
                (char *)"nullcmd",
                NULL
            };
            ret = execv(argv[0], argv);
        } else if (params.size() == 0) {
            char * const argv[] = {
                (char *)"/system/bin/sdc",
                NULL
            };
            ret = execv(argv[0], argv);
        } else if (params.size() == 1) {
            char * const argv[] = {
                (char *)"/system/bin/sdc",
                (char *)"filecrypt",
                (char *)params[0].c_str(),
                NULL
            };
            ret = execv(argv[0], argv);
        } else if (params.size() == 2) {
            char * const argv[] = {
                (char *)"/system/bin/sdc",
                (char *)"filecrypt",
                (char *)params[0].c_str(),
                (char *)params[1].c_str(),
                NULL
            };
            ret = execv(argv[0], argv);
        } else if (params.size() == 3) {
             char * const argv[] = {
                (char *)"/system/bin/sdc",
                (char *)"filecrypt",
                (char *)params[0].c_str(),
                (char *)params[1].c_str(),
                (char *)params[2].c_str(),
                NULL
            };
            ret = execv(argv[0], argv);
        } else if (params.size() == 4) {
             char * const argv[] = {
                (char *)"/system/bin/sdc",
                (char *)"filecrypt",
                (char *)params[0].c_str(),
                (char *)params[1].c_str(),
                (char *)params[2].c_str(),
                (char *)params[3].c_str(),
                NULL
            };
            ret = execv(argv[0], argv);
        }
        if (ret) {
            return -EINVAL;
        }

    }
    int status;
    pid_t ret = waitpid(pid, &status, 0);
    if (ret != pid) {
        return -EINVAL;
    }

    return 0;
}

/**
 * @tc.name: fscrypt_key_v1_init
 * @tc.desc: Verify the InitKey function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BP
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v1_init, TestSize.Level1)
{
    EXPECT_TRUE(g_testKeyV1.InitKey());
    EXPECT_FALSE(g_testKeyV1.InitKey()); // rawkey not empty

    EXPECT_EQ(FSCRYPT_V1, g_testKeyV1.keyInfo_.version);
    EXPECT_EQ(CRYPTO_AES_256_XTS_KEY_SIZE, g_testKeyV1.keyInfo_.key.size);
    EXPECT_NE(nullptr, g_testKeyV1.keyInfo_.key.data.get());
    g_testKeyV1.keyInfo_.key.Clear();
}

/**
 * @tc.name: fscrypt_key_v2_init
 * @tc.desc: Verify the InitKey function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BP
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v2_init, TestSize.Level1)
{
#ifdef SUPPORT_FSCRYPT_V2
    if (KeyCtrlGetFscryptVersion(TEST_MNT.c_str()) == FSCRYPT_V1) {
        return;
    }
    EXPECT_TRUE(g_testKeyV2.InitKey());
    EXPECT_EQ(FSCRYPT_V2, g_testKeyV2.keyInfo_.version);
    EXPECT_EQ(CRYPTO_AES_256_XTS_KEY_SIZE, g_testKeyV2.keyInfo_.key.size);
    EXPECT_NE(nullptr, g_testKeyV2.keyInfo_.key.data.get());
    g_testKeyV2.keyInfo_.key.Clear();
#else
    EXPECT_FALSE(g_testKeyV2.InitKey());
    EXPECT_FALSE(g_testKeyV2.ActiveKey());
    EXPECT_FALSE(g_testKeyV2.InactiveKey());
#endif
}

/**
 * @tc.name: fscrypt_key_v1_store
 * @tc.desc: Verify the StoreKey function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BP
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v1_store, TestSize.Level1)
{
    EXPECT_TRUE(g_testKeyV1.InitKey());
    EXPECT_TRUE(g_testKeyV1.StoreKey(emptyUserAuth));

    std::string buf {};
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_VERSION0 + PATH_SHIELD));
    EXPECT_TRUE(OHOS::LoadStringFromFile(TEST_KEYPATH + TEST_KEYDIR_VERSION0 + PATH_SHIELD, buf));

    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_VERSION0 + PATH_SECDISC));
    EXPECT_TRUE(OHOS::LoadStringFromFile(TEST_KEYPATH + TEST_KEYDIR_VERSION0 + PATH_SECDISC, buf));
    EXPECT_EQ(CRYPTO_KEY_SECDISC_SIZE, buf.size());

    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_VERSION0 + PATH_ENCRYPTED));
    EXPECT_TRUE(OHOS::LoadStringFromFile(TEST_KEYPATH + TEST_KEYDIR_VERSION0 + PATH_ENCRYPTED, buf));
    // the plaintext of 64 bytes, encrypted to 80 bytes size by huks.
    EXPECT_EQ(80U, buf.size());

    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + PATH_FSCRYPT_VER));
    EXPECT_TRUE(OHOS::LoadStringFromFile(TEST_KEYPATH + PATH_FSCRYPT_VER, buf));
    EXPECT_EQ(1U, buf.length());
    EXPECT_EQ('1', buf[0]);

    FscryptKeyV1 g_testKeyV1BadDir {TEST_KEYPATH_BAD};
    EXPECT_TRUE(g_testKeyV1BadDir.InitKey());
    EXPECT_FALSE(g_testKeyV1BadDir.StoreKey(emptyUserAuth));
    EXPECT_FALSE(g_testKeyV1BadDir.UpdateKey());
    EXPECT_FALSE(g_testKeyV1BadDir.ActiveKey());
}

#ifdef SUPPORT_FSCRYPT_V2
/**
 * @tc.name: fscrypt_key_v2_store
 * @tc.desc: Verify the StoreKey function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BP
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v2_store, TestSize.Level1)
{
    if (KeyCtrlGetFscryptVersion(TEST_MNT.c_str()) == FSCRYPT_V1) {
        return;
    }
    g_testKeyV2.ClearKey();
    EXPECT_TRUE(g_testKeyV2.InitKey());
    EXPECT_TRUE(g_testKeyV2.StoreKey(emptyUserAuth));
    EXPECT_TRUE(g_testKeyV2.StoreKey(emptyUserAuth));

    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_VERSION0 + PATH_SHIELD));
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_VERSION0 + PATH_SECDISC));
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_VERSION0 + PATH_ENCRYPTED));
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_VERSION1 + PATH_SHIELD));
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_VERSION1 + PATH_SECDISC));
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_VERSION1 + PATH_ENCRYPTED));

    std::string buf {};
    OHOS::LoadStringFromFile(TEST_KEYPATH + PATH_FSCRYPT_VER, buf);
    EXPECT_EQ(1U, buf.length());
    EXPECT_EQ('2', buf[0]);
}

/**
 * @tc.name: fscrypt_key_v2_update
 * @tc.desc: Verify the UpdateKey function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BP
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v2_update, TestSize.Level1)
{
    if (KeyCtrlGetFscryptVersion(TEST_MNT.c_str()) == FSCRYPT_V1) {
        return;
    }
    std::string buf {};
    EXPECT_TRUE(g_testKeyV2.UpdateKey());

    EXPECT_FALSE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_VERSION0 + PATH_SHIELD));
    EXPECT_FALSE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_VERSION1 + PATH_SHIELD));
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_LATEST + PATH_SHIELD));
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_LATEST + PATH_SECDISC));
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_LATEST + PATH_ENCRYPTED));
    OHOS::LoadStringFromFile(TEST_KEYPATH + PATH_FSCRYPT_VER, buf);
    EXPECT_EQ(1U, buf.length());
    EXPECT_EQ('2', buf[0]);
}

/**
 * @tc.name: fscrypt_key_v1_restore_fail_wrong_version
 * @tc.desc: Verify the RestoreKey function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BP
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v1_restore_fail_wrong_version, TestSize.Level1)
{
    if (KeyCtrlGetFscryptVersion(TEST_MNT.c_str()) == FSCRYPT_V1) {
        return;
    }
    g_testKeyV1.keyInfo_.key.Clear();
    // the version loaded is v2, not expected v1.
    EXPECT_FALSE(g_testKeyV1.RestoreKey(emptyUserAuth));
}
#endif

/**
 * @tc.name: fscrypt_key_v1_restore
 * @tc.desc: Verify the RestoreKey function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BP
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v1_restore, TestSize.Level1)
{
    g_testKeyV1.ClearKey();
    EXPECT_TRUE(g_testKeyV1.InitKey());
    EXPECT_TRUE(g_testKeyV1.StoreKey(emptyUserAuth));
    EXPECT_TRUE(g_testKeyV1.UpdateKey());
    EXPECT_TRUE(g_testKeyV1.RestoreKey(emptyUserAuth));

    EXPECT_EQ(CRYPTO_AES_256_XTS_KEY_SIZE, g_testKeyV1.keyInfo_.key.size);
    EXPECT_NE(nullptr, g_testKeyV1.keyInfo_.key.data.get());
    EXPECT_EQ(FSCRYPT_V1, g_testKeyV1.keyInfo_.version);
    EXPECT_TRUE(OHOS::SaveStringToFile(TEST_KEYPATH + TEST_KEYDIR_LATEST + PATH_SECDISC, "bad secdesc"));
    EXPECT_FALSE(g_testKeyV1.RestoreKey(emptyUserAuth)); // should decrypt failed
    remove(std::string(TEST_KEYPATH + TEST_KEYDIR_LATEST + PATH_SECDISC).c_str());
    EXPECT_FALSE(g_testKeyV1.RestoreKey(emptyUserAuth));
    remove(std::string(TEST_KEYPATH + TEST_KEYDIR_LATEST + PATH_SHIELD).c_str());
    EXPECT_FALSE(g_testKeyV1.RestoreKey(emptyUserAuth));
    remove(std::string(TEST_KEYPATH + TEST_KEYDIR_LATEST + PATH_ENCRYPTED).c_str());
    EXPECT_FALSE(g_testKeyV1.RestoreKey(emptyUserAuth));
    remove(std::string(TEST_KEYPATH + "/fscrypt_version").c_str());
    EXPECT_FALSE(g_testKeyV1.RestoreKey(emptyUserAuth));
}

/**
 * @tc.name: fscrypt_key_v1_active
 * @tc.desc: Verify the ActiveKey function of v1 key.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BP
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v1_active, TestSize.Level1)
{
    g_testKeyV1.ClearKey();
    EXPECT_FALSE(g_testKeyV1.ActiveKey()); // active empty key should fail
    EXPECT_TRUE(g_testKeyV1.InitKey());
    EXPECT_TRUE(g_testKeyV1.StoreKey(emptyUserAuth));
    EXPECT_FALSE(g_testKeyV1.keyInfo_.key.IsEmpty());
    EXPECT_EQ(FSCRYPT_V1, g_testKeyV1.keyInfo_.version);

    EXPECT_TRUE(g_testKeyV1.ActiveKey(FIRST_CREATE_KEY));
    // raw key should be erase after install to kernel.
    EXPECT_TRUE(g_testKeyV1.keyInfo_.key.IsEmpty());
    EXPECT_TRUE(g_testKeyV1.keyInfo_.keyId.IsEmpty());
    // key desc saved in memory for later clear key.
    EXPECT_FALSE(g_testKeyV1.keyInfo_.keyDesc.IsEmpty());

    // v1 key installed, and key_desc was saved on disk.
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + PATH_KEYDESC));

    FscryptKeyV1 g_testKeyV1BadLen {TEST_KEYPATH, CRYPTO_AES_256_XTS_KEY_SIZE * 2};
    EXPECT_TRUE(g_testKeyV1BadLen.InitKey());
    EXPECT_FALSE(g_testKeyV1BadLen.InactiveKey());
    EXPECT_FALSE(g_testKeyV1BadLen.ActiveKey());
}

/**
 * @tc.name: fscrypt_key_v1_clear
 * @tc.desc: Verify the ClearKey function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BP
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v1_clear, TestSize.Level1)
{
    EXPECT_TRUE(g_testKeyV1.ClearKey());
    EXPECT_TRUE(g_testKeyV1.keyInfo_.key.IsEmpty());
    EXPECT_FALSE(OHOS::FileExists(TEST_KEYPATH + PATH_KEYDESC));
    EXPECT_FALSE(OHOS::FileExists(TEST_KEYPATH + PATH_FSCRYPT_VER));
    EXPECT_FALSE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_LATEST + PATH_SHIELD));
}


/**
 * @tc.name: fscrypt_key_v1_policy_set
 * @tc.desc: Verify the fscrypt V1 KeyCtrl::SetPolicy function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BO
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v1_policy_set, TestSize.Level1)
{
    EXPECT_TRUE(g_testKeyV1.InitKey());
    EXPECT_TRUE(g_testKeyV1.StoreKey(emptyUserAuth));
    EXPECT_TRUE(g_testKeyV1.ActiveKey(FIRST_CREATE_KEY));

    FscryptPolicy arg;
    (void)memset_s(&arg, sizeof(arg), 0, sizeof(arg));
    arg.v1.version = FSCRYPT_POLICY_V1;
    (void)memcpy_s(arg.v1.master_key_descriptor, FSCRYPT_KEY_DESCRIPTOR_SIZE, g_testKeyV1.keyInfo_.keyDesc.data.get(),
        g_testKeyV1.keyInfo_.keyDesc.size);
    arg.v1.contents_encryption_mode = FSCRYPT_MODE_AES_256_XTS;
    arg.v1.filenames_encryption_mode = FSCRYPT_MODE_AES_256_CTS;
    arg.v1.flags = FSCRYPT_POLICY_FLAGS_PAD_32;
    // Default to maximum zero-padding to leak less info about filename lengths.
    OHOS::ForceRemoveDirectory(TEST_DIR_LEGACY);
    EXPECT_TRUE(OHOS::ForceCreateDirectory(TEST_DIR_LEGACY));
    EXPECT_TRUE(KeyCtrlSetPolicy(TEST_DIR_LEGACY.c_str(), &arg));

    EXPECT_TRUE(OHOS::ForceCreateDirectory(TEST_DIR_LEGACY + "/test_dir"));
    EXPECT_TRUE(OHOS::SaveStringToFile(TEST_DIR_LEGACY + "/test_file1", "hello, world!\n"));
    EXPECT_TRUE(OHOS::SaveStringToFile(TEST_DIR_LEGACY + "/test_file2", "AA"));
}

/**
 * @tc.name: fscrypt_key_v1_policy_get
 * @tc.desc: Verify the fscrypt V1 KeyCtrl::GetPolicy function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BO
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v1_policy_get, TestSize.Level1)
{
    struct fscrypt_policy arg;
    (void)memset_s(&arg, sizeof(arg), 0, sizeof(arg));
    EXPECT_TRUE(KeyCtrlGetPolicy(TEST_DIR_LEGACY.c_str(), &arg));
    EXPECT_EQ(FSCRYPT_POLICY_V1, arg.version);

    std::string testDir = TEST_DIR_LEGACY + "/test_dir";
    (void)memset_s(&arg, sizeof(arg), 0, sizeof(arg));
    EXPECT_TRUE(KeyCtrlGetPolicy(testDir.c_str(), &arg));
    EXPECT_EQ(FSCRYPT_POLICY_V1, arg.version);

    EXPECT_FALSE(KeyCtrlGetPolicy(NULL, NULL));
    EXPECT_FALSE(KeyCtrlGetPolicy(testDir.c_str(), NULL));

}

/**
 * @tc.name: fscrypt_key_v1_key_inactive
 * @tc.desc: Verify the FscryptKeyV1 InactiveKey function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BO
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v1_key_inactive, TestSize.Level1)
{
    EXPECT_TRUE(g_testKeyV1.InactiveKey(USER_DESTROY));

#ifdef SUPPORT_FSCRYPT_V2
    EXPECT_FALSE(OHOS::ForceCreateDirectory(TEST_DIR_LEGACY + "/test_dir1"));
    EXPECT_FALSE(OHOS::SaveStringToFile(TEST_DIR_LEGACY + "/test_file3", "AAA"));
    // earlier kernels may have different behaviour.
#endif
}

#ifdef SUPPORT_FSCRYPT_V2
/**
 * @tc.name: fscrypt_key_v2_active
 * @tc.desc: Verify the fscrypt V2 active function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BP
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v2_active, TestSize.Level1)
{
    if (KeyCtrlGetFscryptVersion(TEST_MNT.c_str()) == FSCRYPT_V1) {
        return;
    }
    g_testKeyV2.ClearKey();
    EXPECT_TRUE(g_testKeyV2.InitKey());
    EXPECT_TRUE(g_testKeyV2.StoreKey(emptyUserAuth));
    EXPECT_TRUE(g_testKeyV2.ActiveKey());

    // raw key should be erase after install to kernel.
    EXPECT_TRUE(g_testKeyV2.keyInfo_.key.IsEmpty());
    EXPECT_TRUE(g_testKeyV2.keyInfo_.keyDesc.IsEmpty());
    EXPECT_EQ(static_cast<unsigned int>(FSCRYPT_KEY_IDENTIFIER_SIZE), g_testKeyV2.keyInfo_.keyId.size);
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + PATH_KEYID));
}

/**
 * @tc.name: fscrypt_key_v2_policy_set
 * @tc.desc: Verify the fscrypt V2 setpolicy function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BO
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v2_policy_set, TestSize.Level1)
{
    if (KeyCtrlGetFscryptVersion(TEST_MNT.c_str()) == FSCRYPT_V1) {
        return;
    }
    EXPECT_EQ(FSCRYPT_V2, g_testKeyV2.keyInfo_.version);
    FscryptPolicy arg;
    (void)memset_s(&arg, sizeof(arg), 0, sizeof(arg));
    arg.v2.version = FSCRYPT_POLICY_V2;
    (void)memcpy_s(arg.v2.master_key_identifier, FSCRYPT_KEY_IDENTIFIER_SIZE, g_testKeyV2.keyInfo_.keyId.data.get(),
                  g_testKeyV2.keyInfo_.keyId.size);
    arg.v2.contents_encryption_mode = FSCRYPT_MODE_AES_256_XTS;
    arg.v2.filenames_encryption_mode = FSCRYPT_MODE_AES_256_CTS;
    arg.v2.flags = FSCRYPT_POLICY_FLAGS_PAD_32;
    // Default to maximum zero-padding to leak less info about filename lengths.
    OHOS::ForceRemoveDirectory(TEST_DIR_V2);
    EXPECT_TRUE(OHOS::ForceCreateDirectory(TEST_DIR_V2));
    EXPECT_TRUE(KeyCtrlSetPolicy(TEST_DIR_V2.c_str(), &arg));

    EXPECT_TRUE(OHOS::ForceCreateDirectory(TEST_DIR_V2 + "/test_dir"));
    EXPECT_TRUE(OHOS::SaveStringToFile(TEST_DIR_V2 + "/test_file1", "hello, world!\n"));
    EXPECT_TRUE(OHOS::SaveStringToFile(TEST_DIR_V2 + "/test_file2", "AA"));
}

/**
 * @tc.name: fscrypt_key_v2_policy_get
 * @tc.desc: Verify the fscrypt V2 getpolicy function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BO
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v2_policy_get, TestSize.Level1)
{
    if (KeyCtrlGetFscryptVersion(TEST_MNT.c_str()) == FSCRYPT_V1) {
        return;
    }
    struct fscrypt_get_policy_ex_arg arg;
    (void)memset_s(&arg, sizeof(arg), 0, sizeof(arg));
    arg.policy_size = sizeof(arg.policy);
    EXPECT_TRUE(KeyCtrlGetPolicyEx(TEST_DIR_V2.c_str(), &arg));
    EXPECT_EQ(FSCRYPT_POLICY_V2, arg.policy.version);

    (void)memset_s(&arg, sizeof(arg), 0, sizeof(arg));
    arg.policy_size = sizeof(arg.policy);
    std::string testDir = TEST_DIR_V2 + "/test_dir";
    EXPECT_TRUE(KeyCtrlGetPolicyEx(testDir.c_str(), &arg));
    EXPECT_EQ(FSCRYPT_POLICY_V2, arg.policy.version);
}

/**
 * @tc.name: fscrypt_key_v2_policy_inactive
 * @tc.desc: Verify the fscryptV2 InactiveKey function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BP
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v2_policy_inactive, TestSize.Level1)
{
    if (KeyCtrlGetFscryptVersion(TEST_MNT.c_str()) == FSCRYPT_V1) {
        return;
    }
    EXPECT_TRUE(g_testKeyV2.InactiveKey());
    // When the v2 policy removed, the files are encrypted.
    EXPECT_FALSE(OHOS::FileExists(TEST_DIR_V2 + "/test_dir"));
    EXPECT_FALSE(OHOS::FileExists(TEST_DIR_V2 + "/test_file1"));
    EXPECT_FALSE(OHOS::FileExists(TEST_DIR_V2 + "/test_file2"));
}

/**
 * @tc.name: fscrypt_key_v2_policy_restore
 * @tc.desc: Verify the fscrypt V2 restore and decrypt.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BP
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v2_policy_restore, TestSize.Level1)
{
    if (KeyCtrlGetFscryptVersion(TEST_MNT.c_str()) == FSCRYPT_V1) {
        return;
    }
    EXPECT_TRUE(g_testKeyV2.RestoreKey(emptyUserAuth));
    EXPECT_EQ(FSCRYPT_V2, g_testKeyV2.keyInfo_.version);
    EXPECT_TRUE(g_testKeyV2.ActiveKey());

    // the files is decrypted now
    EXPECT_TRUE(OHOS::FileExists(TEST_DIR_V2 + "/test_dir"));
    EXPECT_TRUE(OHOS::FileExists(TEST_DIR_V2 + "/test_file1"));
    EXPECT_TRUE(OHOS::FileExists(TEST_DIR_V2 + "/test_file2"));

    EXPECT_TRUE(g_testKeyV2.ClearKey());
}

/**
 * @tc.name: fscrypt_key_v2_load_and_set_policy_default
 * @tc.desc: Verify the KeyCtrl::LoadAndSetPolicy function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BO
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v2_load_and_set_policy_default, TestSize.Level1)
{
    if (KeyCtrlGetFscryptVersion(TEST_MNT.c_str()) == FSCRYPT_V1) {
        return;
    }
    g_testKeyV2.ClearKey();
    EXPECT_TRUE(g_testKeyV2.InitKey());
    EXPECT_TRUE(g_testKeyV2.StoreKey(emptyUserAuth));
    EXPECT_TRUE(g_testKeyV2.ActiveKey());

    EXPECT_EQ(0, SetFscryptSysparam("2:aes-256-cts:aes-256-xts"));
    EXPECT_EQ(0, InitFscryptPolicy());

    OHOS::ForceRemoveDirectory(TEST_DIR_V2);
    OHOS::ForceCreateDirectory(TEST_DIR_V2);
    EXPECT_EQ(0, LoadAndSetPolicy(g_testKeyV2.GetDir().c_str(), TEST_DIR_V2.c_str()));

    EXPECT_TRUE(OHOS::ForceCreateDirectory(TEST_DIR_V2 + "/test_dir"));
    EXPECT_TRUE(OHOS::SaveStringToFile(TEST_DIR_V2 + "/test_file1", "hello, world!\n"));
    EXPECT_TRUE(OHOS::SaveStringToFile(TEST_DIR_V2 + "/test_file2", "AA"));
    EXPECT_TRUE(OHOS::SaveStringToFile(TEST_DIR_V2 + "/111111111111111111111111111111111111111111111111", "AA"));

    EXPECT_TRUE(g_testKeyV2.ClearKey());
}
#endif

/**
 * @tc.name: fscrypt_key_v1_load_and_set_policy_default
 * @tc.desc: Verify the fscrypt V1 setpolicy function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BO
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v1_load_and_set_policy_default, TestSize.Level1)
{
    g_testKeyV1.ClearKey();
    EXPECT_TRUE(g_testKeyV1.InitKey());
    EXPECT_TRUE(g_testKeyV1.StoreKey(emptyUserAuth));
    EXPECT_TRUE(g_testKeyV1.ActiveKey(FIRST_CREATE_KEY));

    EXPECT_EQ(0, SetFscryptSysparam("1:aes-256-cts:aes-256-xts"));
    EXPECT_EQ(0, InitFscryptPolicy());

    OHOS::ForceRemoveDirectory(TEST_DIR_LEGACY);
    OHOS::ForceCreateDirectory(TEST_DIR_LEGACY);
    EXPECT_EQ(0, LoadAndSetPolicy(g_testKeyV1.GetDir().c_str(), TEST_DIR_LEGACY.c_str()));

    EXPECT_TRUE(OHOS::ForceCreateDirectory(TEST_DIR_LEGACY + "/test_dir"));
    EXPECT_TRUE(OHOS::SaveStringToFile(TEST_DIR_LEGACY + "/test_file1", "hello, world!\n"));
    EXPECT_TRUE(OHOS::SaveStringToFile(TEST_DIR_LEGACY + "/test_file2", "AA"));
    EXPECT_TRUE(OHOS::SaveStringToFile(TEST_DIR_LEGACY + "/111111111111111111111111111111111111111111111111", "AA"));

    EXPECT_TRUE(g_testKeyV1.ClearKey());
}

/**
 * @tc.name: fscrypt_key_storekey_version_test_1
 * @tc.desc: Verify the fscrypt storekey function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BO
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_storekey_version_test_1, TestSize.Level1)
{
    EXPECT_TRUE(g_testKeyV1.InitKey());

    // storekey to version 0
    EXPECT_TRUE(g_testKeyV1.StoreKey(emptyUserAuth));
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_VERSION0 + PATH_SHIELD));
    std::string keyShieldV0;
    EXPECT_TRUE(OHOS::LoadStringFromFile(TEST_KEYPATH + TEST_KEYDIR_VERSION0 + PATH_SHIELD, keyShieldV0));

    // storekey to version 1
    EXPECT_TRUE(g_testKeyV1.StoreKey(emptyUserAuth));
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_VERSION1 + PATH_SHIELD));
    std::string keyShieldV1;
    EXPECT_TRUE(OHOS::LoadStringFromFile(TEST_KEYPATH + TEST_KEYDIR_VERSION1 + PATH_SHIELD, keyShieldV1));
    EXPECT_NE(keyShieldV0, keyShieldV1);

    // storekey to version 2
    EXPECT_TRUE(g_testKeyV1.StoreKey(emptyUserAuth));
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_VERSION2 + PATH_SHIELD));
    std::string keyShieldV2;
    EXPECT_TRUE(OHOS::LoadStringFromFile(TEST_KEYPATH + TEST_KEYDIR_VERSION2 + PATH_SHIELD, keyShieldV2));
    EXPECT_NE(keyShieldV1, keyShieldV2);

    // updatekey will rename version 2 to latest
    EXPECT_TRUE(g_testKeyV1.UpdateKey());
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_LATEST + PATH_SHIELD));
    EXPECT_FALSE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_LATEST_BACKUP + PATH_SHIELD));
    std::string keyShieldLatest;
    EXPECT_TRUE(OHOS::LoadStringFromFile(TEST_KEYPATH + TEST_KEYDIR_LATEST + PATH_SHIELD, keyShieldLatest));
    EXPECT_EQ(keyShieldLatest, keyShieldV2);
}

/**
 * @tc.name: fscrypt_key_storekey_version_test_2
 * @tc.desc: Verify the fscrypt storekey function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BO
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_storekey_version_test_2, TestSize.Level1)
{
    EXPECT_TRUE(g_testKeyV1.RestoreKey(emptyUserAuth));

    // storekey to version 0
    EXPECT_TRUE(g_testKeyV1.StoreKey(emptyUserAuth));
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_VERSION0 + PATH_SHIELD));
    std::string keyShieldV0;
    EXPECT_TRUE(OHOS::LoadStringFromFile(TEST_KEYPATH + TEST_KEYDIR_VERSION0 + PATH_SHIELD, keyShieldV0));

    // storekey to version 1
    EXPECT_TRUE(g_testKeyV1.StoreKey(emptyUserAuth));
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_VERSION1 + PATH_SHIELD));
    std::string keyShieldV1;
    EXPECT_TRUE(OHOS::LoadStringFromFile(TEST_KEYPATH + TEST_KEYDIR_VERSION1 + PATH_SHIELD, keyShieldV1));

    // restorekey will decrypt from versions and rename first success one to latest
    EXPECT_TRUE(g_testKeyV1.RestoreKey(emptyUserAuth));
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_LATEST + PATH_SHIELD));
    EXPECT_FALSE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_LATEST_BACKUP + PATH_SHIELD));
    std::string keyShieldLatest;
    EXPECT_TRUE(OHOS::LoadStringFromFile(TEST_KEYPATH + TEST_KEYDIR_LATEST + PATH_SHIELD, keyShieldLatest));
    EXPECT_EQ(keyShieldLatest, keyShieldV1);
}

/**
 * @tc.name: fscrypt_key_storekey_version_test_3
 * @tc.desc: Verify the fscrypt storekey function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BO
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_storekey_version_test_3, TestSize.Level1)
{
    // storekey to version 0
    EXPECT_TRUE(g_testKeyV1.StoreKey(emptyUserAuth));
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_VERSION0 + PATH_SHIELD));
    std::string keyShieldV0A;
    EXPECT_TRUE(OHOS::LoadStringFromFile(TEST_KEYPATH + TEST_KEYDIR_VERSION0 + PATH_SHIELD, keyShieldV0A));

    // latest dir broken, not affect restore and update operation
    OHOS::ForceRemoveDirectory(TEST_KEYPATH + TEST_KEYDIR_LATEST);
    OHOS::SaveStringToFile(TEST_KEYPATH + TEST_KEYDIR_LATEST, "latest is a file");
    EXPECT_TRUE(g_testKeyV1.RestoreKey(emptyUserAuth));
    EXPECT_TRUE(OHOS::FileExists(TEST_KEYPATH + TEST_KEYDIR_VERSION0 + PATH_SHIELD));
    std::string keyShieldV0B;
    EXPECT_TRUE(OHOS::LoadStringFromFile(TEST_KEYPATH + TEST_KEYDIR_VERSION0 + PATH_SHIELD, keyShieldV0B));
    EXPECT_TRUE(keyShieldV0A == keyShieldV0B);
    EXPECT_TRUE(g_testKeyV1.RestoreKey(emptyUserAuth));
    EXPECT_FALSE(g_testKeyV1.UpdateKey());

    // latest dir backup also broken, not affect restore and update operation
    OHOS::SaveStringToFile(TEST_KEYPATH + TEST_KEYDIR_LATEST_BACKUP, "latest_backup is a file");
    EXPECT_FALSE(g_testKeyV1.UpdateKey());
    EXPECT_TRUE(g_testKeyV1.RestoreKey(emptyUserAuth));
}

#ifdef SUPPORT_FSCRYPT_V2
/**
 * @tc.name: fscrypt_key_v2_load_and_set_policy_padding_4
 * @tc.desc: Verify the KeyCtrl::LoadAndSetPolicy function.
 * @tc.type: FUNC
 * @tc.require: AR000GK0BO
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_v2_load_and_set_policy_padding_4, TestSize.Level1)
{
    if (KeyCtrlGetFscryptVersion(TEST_MNT.c_str()) == FSCRYPT_V1) {
        return;
    }
    g_testKeyV2.ClearKey();
    EXPECT_TRUE(g_testKeyV2.InitKey());
    EXPECT_TRUE(g_testKeyV2.StoreKey(emptyUserAuth));
    EXPECT_TRUE(g_testKeyV2.ActiveKey());

    EXPECT_EQ(0, SetFscryptSysparam("2:aes-256-cts:aes-256-xts"));
    EXPECT_EQ(0, InitFscryptPolicy());

    OHOS::ForceRemoveDirectory(TEST_DIR_V2);
    OHOS::ForceCreateDirectory(TEST_DIR_V2);
    EXPECT_EQ(0, LoadAndSetPolicy(g_testKeyV2.GetDir().c_str(), TEST_DIR_V2.c_str()));

    EXPECT_TRUE(OHOS::ForceCreateDirectory(TEST_DIR_V2 + "/test_dir"));
    EXPECT_TRUE(OHOS::SaveStringToFile(TEST_DIR_V2 + "/test_file1", "hello, world!\n"));
    EXPECT_TRUE(OHOS::SaveStringToFile(TEST_DIR_V2 + "/test_file2", "AA"));
    EXPECT_TRUE(OHOS::SaveStringToFile(TEST_DIR_V2 + "/111111111111111111111111111111111111111111111111", "AA"));

    struct fscrypt_get_policy_ex_arg arg;
    (void)memset_s(&arg, sizeof(arg), 0, sizeof(arg));
    arg.policy_size = sizeof(arg.policy);
    EXPECT_TRUE(KeyCtrlGetPolicyEx(TEST_DIR_V2.c_str(), &arg));
    EXPECT_EQ(FSCRYPT_POLICY_V2, arg.policy.version);
    EXPECT_EQ(FSCRYPT_MODE_AES_256_CTS, arg.policy.v2.filenames_encryption_mode);
    EXPECT_EQ(FSCRYPT_MODE_AES_256_XTS, arg.policy.v2.contents_encryption_mode);

    EXPECT_TRUE(g_testKeyV2.ClearKey());
}
#endif

/**
 * @tc.name: key_manager_generate_delete_user_keys
 * @tc.desc: Verify the KeyManager GenerateUserKeys and DeleteUserKeys
 * @tc.type: FUNC
 * @tc.require: SR000H0CM9
 */
HWTEST_F(CryptoKeyTest, key_manager_generate_delete_user_keys, TestSize.Level1)
{
    uint32_t userId = 81;
    const string USER_EL1_DIR = "/data/test/user/el1";
    const string USER_EL2_DIR = "/data/test/user/el2";

    EXPECT_EQ(0, SetFscryptSysparam("2:aes-256-cts:aes-256-xts"));
    EXPECT_EQ(0, InitFscryptPolicy());
    OHOS::ForceRemoveDirectory(USER_EL1_DIR);
    OHOS::ForceRemoveDirectory(USER_EL2_DIR);
    MkDirRecurse(USER_EL1_DIR, S_IRWXU);
    MkDirRecurse(USER_EL2_DIR, S_IRWXU);

    OHOS::ForceRemoveDirectory(USER_KEY_EL1_DIR);
    OHOS::ForceRemoveDirectory(USER_KEY_EL2_DIR);
    EXPECT_EQ(-ENOENT, KeyManager::GetInstance()->GenerateUserKeys(userId, 0)); // no user_el1_dir

    KeyManager::GetInstance()->InitGlobalDeviceKey();
    KeyManager::GetInstance()->InitGlobalUserKeys();
    EXPECT_EQ(0, KeyManager::GetInstance()->GenerateUserKeys(userId, 0));
    EXPECT_EQ(-EEXIST, KeyManager::GetInstance()->GenerateUserKeys(userId, 0)); // key existed
    EXPECT_EQ(0, KeyManager::GetInstance()->SetDirectoryElPolicy(userId, EL1_KEY, {{userId, USER_EL1_DIR}}));
    EXPECT_EQ(0, KeyManager::GetInstance()->SetDirectoryElPolicy(userId, EL2_KEY, {{userId, USER_EL2_DIR}}));
    EXPECT_EQ(0, KeyManager::GetInstance()->UpdateUserAuth(userId, {}, {}, {}));
    EXPECT_EQ(0, KeyManager::GetInstance()->UpdateKeyContext(userId));
    KeyManager::GetInstance()->UpdateUserAuth(userId, {'t', 'o', 'k', 'e', 'n'}, {}, {'s', 'e', 'c', 'r', 'e', 't'});
    EXPECT_EQ(-EFAULT, KeyManager::GetInstance()->UpdateKeyContext(userId)); // no need to update keycontext
    KeyManager::GetInstance()->InActiveUserKey(userId);                      // may fail on some platforms
    EXPECT_EQ(0, KeyManager::GetInstance()->ActiveUserKey(userId, {}, {}));
    EXPECT_EQ(0, KeyManager::GetInstance()->ActiveUserKey(userId, {}, {})); /// have been actived, also return 0
    EXPECT_EQ(0, KeyManager::GetInstance()->DeleteUserKeys(userId));

    EXPECT_EQ(0, SetFscryptSysparam("1:aes-256-cts:aes-256-xts"));
    KeyManager::GetInstance()->InitGlobalDeviceKey();
    KeyManager::GetInstance()->InitGlobalUserKeys();
    userId = 801; // bad userId, not generated
    EXPECT_EQ(-ENOENT, KeyManager::GetInstance()->SetDirectoryElPolicy(userId, EL1_KEY, {{userId, USER_EL1_DIR}}));
    EXPECT_EQ(-ENOENT, KeyManager::GetInstance()->SetDirectoryElPolicy(userId, EL2_KEY, {{userId, USER_EL2_DIR}}));
    EXPECT_EQ(0, KeyManager::GetInstance()->SetDirectoryElPolicy(userId, static_cast<KeyType>(0),
                                                                 {{userId, USER_EL2_DIR}})); // bad keytype
    EXPECT_EQ(-ENOENT, KeyManager::GetInstance()->UpdateUserAuth(userId, {}, {}, {}));
    EXPECT_EQ(-ENOENT, KeyManager::GetInstance()->UpdateKeyContext(userId));
    EXPECT_EQ(-ENOENT, KeyManager::GetInstance()->InActiveUserKey(userId));
    EXPECT_EQ(-ENOENT, KeyManager::GetInstance()->ActiveUserKey(userId, {}, {}));
    EXPECT_EQ(-EFAULT, KeyManager::GetInstance()->DeleteUserKeys(userId));
}

/**
 * @tc.name: fscrypt_key_secure_access_control
 * @tc.desc: Verify the secure access when user have pin code.
 * @tc.type: FUNC
 * @tc.require: SR000H0CLT
 */
HWTEST_F(CryptoKeyTest, fscrypt_key_secure_access_control, TestSize.Level1)
{
    g_testKeyV1.ClearKey();
    EXPECT_TRUE(g_testKeyV1.InitKey());
    EXPECT_TRUE(g_testKeyV1.StoreKey(emptyUserAuth));

    std::string token = "bad_token";
    std::string secret = "bad_secret";
    std::vector<uint8_t> badToken(token.begin(), token.end());
    std::vector<uint8_t> badSecret(secret.begin(), secret.end());
    UserAuth badUserAuth {
        .token = badToken,
        .secret = badSecret
    };
    EXPECT_FALSE(g_testKeyV1.RestoreKey(badUserAuth));
    EXPECT_TRUE(g_testKeyV1.ClearKey());
}

/**
 * @tc.name: fscrypt_sdc_filecrypt
 * @tc.desc: Verify the sdc interface.
 * @tc.type: FUNC
 * @tc.require: SR000H0CLT
 */
HWTEST_F(CryptoKeyTest, fscrypt_sdc_filecrypt, TestSize.Level1)
{
    std::vector<std::string> params;

    // test no param
    params.clear();
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 0));

    // test not filecrypt param
    params.clear();
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));

    // test filecrypt cmd not existed
    params.push_back("noexisted");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));

    // test sdc enable
    params.push_back("enable");
    params.push_back("2:abs-256-cts:aes-256-xts");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("enable");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();

    // test sdc init_global_key
    params.push_back("init_global_key");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();

    // test sdc init_main_user
    params.push_back("init_main_user");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();

    // test sdc inactive_user_key
    params.push_back("inactive_user_key");
    params.push_back("id");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("inactive_user_key");
    params.push_back("10");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("inactive_user_key");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();

    // test sdc update_key_context
    params.push_back("update_key_context");
    params.push_back("id");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("update_key_context");
    params.push_back("10");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("update_key_context");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();

    // test sdc delete_user_keys
    params.push_back("delete_user_keys");
    params.push_back("id");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("delete_user_keys");
    params.push_back("10");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("delete_user_keys");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();

    // test sdc generate_user_keys
    params.push_back("generate_user_keys");
    params.push_back("id");
    params.push_back("flag");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("generate_user_keys");
    params.push_back("10");
    params.push_back("0");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("generate_user_keys");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();

    // test sdc prepare_user_space
    params.push_back("prepare_user_space");
    params.push_back("id");
    params.push_back("flag");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("prepare_user_space");
    params.push_back("10");
    params.push_back("0");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("prepare_user_space");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();

    // test sdc destroy_user_space
    params.push_back("destroy_user_space");
    params.push_back("id");
    params.push_back("flag");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("destroy_user_space");
    params.push_back("10");
    params.push_back("0");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("destroy_user_space");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();

    // test sdc update_user_auth
    params.push_back("update_user_auth");
    params.push_back("id");
    params.push_back("01234567890abcd");
    params.push_back("01234567890abcd");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("update_user_auth");
    params.push_back("10");
    params.push_back("01234567890abcd");
    params.push_back("01234567890abcd");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("update_user_auth");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("update_user_auth");
    params.push_back("10");
    params.push_back("01234567890abcd");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();

    // test sdc active_user_key
    params.push_back("active_user_key");
    params.push_back("id");
    params.push_back("01234567890abcd");
    params.push_back("01234567890abcd");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("active_user_key");
    params.push_back("10");
    params.push_back("01234567890abcd");
    params.push_back("01234567890abcd");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("active_user_key");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
    params.push_back("active_user_key");
    params.push_back("10");
    params.push_back("01234567890abcd");
    EXPECT_EQ(0, CryptoKeyTest::ExecSdcBinary(params, 1));
    params.clear();
}

/**
 * @tc.name: libfscrypt api test
 * @tc.desc: Verify the libfscrypt interface.
 * @tc.type: FUNC
 * @tc.require: SR000H0CLT
 */
HWTEST_F(CryptoKeyTest, fscrypt_libfscrypt_api, TestSize.Level1)
{
    // test api in sysparam_dynamic.c
    EXPECT_NE(0, GetFscryptParameter(NULL, NULL, NULL, NULL));
    EXPECT_NE(0, SetFscryptParameter(NULL, NULL));

    // test api in fscrypt_utils.c
    EXPECT_NE(0, FscryptPolicyEnable(NULL));
    EXPECT_EQ(0, FscryptPolicyEnable("/data/test/badpath"));
    FscryptPolicyEnable("/data/app/el1/bundle/public");
    EXPECT_NE(0, SetFscryptSysparam(NULL));

    // test api in key_control.c
    EXPECT_EQ(FSCRYPT_INVALID, KeyCtrlLoadVersion(NULL));
    EXPECT_EQ(FSCRYPT_INVALID, KeyCtrlLoadVersion("/nofile"));
    EXPECT_EQ(FSCRYPT_INVALID, KeyCtrlGetFscryptVersion(NULL));
    // version iss not digit
    OHOS::ForceRemoveDirectory(TEST_DIR_LEGACY);
    EXPECT_TRUE(OHOS::ForceCreateDirectory(TEST_DIR_LEGACY));
    std::string testVersionFile = TEST_DIR_LEGACY + "/fscrypt_version";
    EXPECT_TRUE(OHOS::SaveStringToFile(testVersionFile, "not-digit\n"));
    EXPECT_EQ(FSCRYPT_INVALID, KeyCtrlLoadVersion(TEST_DIR_LEGACY.c_str()));
    // bad version
    OHOS::ForceRemoveDirectory(TEST_DIR_LEGACY);
    EXPECT_TRUE(OHOS::ForceCreateDirectory(TEST_DIR_LEGACY));
    testVersionFile = TEST_DIR_LEGACY + "/fscrypt_version";
    EXPECT_TRUE(OHOS::SaveStringToFile(testVersionFile, "10\n"));
    EXPECT_EQ(FSCRYPT_INVALID, KeyCtrlLoadVersion(TEST_DIR_LEGACY.c_str()));

    key_serial_t id = 1;
    EXPECT_NE(0, KeyCtrlGetKeyringId(id, 0));

    // test api in fscrypt_control.c
    EXPECT_NE(0, LoadAndSetPolicy(NULL, NULL));
    EXPECT_NE(0, FscryptSetSysparam("2:abs-256-cts"));
    EXPECT_NE(0, FscryptSetSysparam("2:abs-256-cts:bad-param"));
    EXPECT_NE(0, FscryptSetSysparam(NULL));
}

/**
 * @tc.name: fscrypt_fbex_utils
 * @tc.desc: Verify the fbex utils.
 * @tc.type: FUNC
 * @tc.require: SR000HE9U7
 */
HWTEST_F(CryptoKeyTest, fscrypt_fbex_utils, TestSize.Level1)
{
    if (KeyCtrlGetFscryptVersion(TEST_MNT.c_str()) != FSCRYPT_V1) {
        return; // skip not v1 fscrypt
    }
    if (!FBEX::IsFBEXSupported()) {
        return; // skip no fbex support
    }
    (void)FBEX::IsMspReady();
    (void)FBEX::GetStatus();

    constexpr uint32_t userId = 82; // test userid
    uint8_t buf[FBEX_IV_SIZE] = {0};
    buf[0] = 0xfb; // fitst byte const to kernel
    buf[1] = 0x30; // second byte const to kernel
    EXPECT_EQ(0, FBEX::InstallKeyToKernel(userId, TYPE_EL2, buf, FBEX_IV_SIZE, FIRST_CREATE_KEY));
    EXPECT_EQ(0, FBEX::LockScreenToKernel(userId));
    EXPECT_EQ(0, FBEX::UnlockScreenToKernel(userId, TYPE_EL3, buf, FBEX_IV_SIZE));
    uint8_t buf1[FBEX_IV_SIZE] = {0};
    buf1[0] = 0xfb; // fitst byte const to kernel
    buf1[1] = 0x30; // second byte const to kernel
    EXPECT_EQ(0, FBEX::UninstallOrLockUserKeyToKernel(userId, TYPE_EL2, buf1, FBEX_IV_SIZE, USER_DESTROY));
}
