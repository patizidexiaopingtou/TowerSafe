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

#include <gtest/gtest.h>

#define private public
#define protected public

#include "background_task_manager.h"
#include "bg_continuous_task_mgr.h"
#include "bg_transient_task_mgr.h"
#include "iservice_registry.h"
#include "singleton.h"
#include "system_ability_definition.h"

#undef private
#undef protected

using namespace testing::ext;

namespace OHOS {
namespace BackgroundTaskMgr {
class BgtaskDumpTest : public testing::Test {
public:
    static void SetUpTestCase();
    static void TearDownTestCase();
    void SetUp();
    void TearDown();
};

void BgtaskDumpTest::SetUpTestCase()
{
    DelayedSingleton<BgTransientTaskMgr>::GetInstance()->isReady_.store(true);
}

void BgtaskDumpTest::TearDownTestCase() {}

void BgtaskDumpTest::SetUp() {}

void BgtaskDumpTest::TearDown() {}

/*
 * @tc.name: BgtaskDumpTest_GetServiceObject_001
 * @tc.desc: Get Service Object
 * @tc.type: FUNC
 * @tc.require: SR000GGTET AR000GH86Q
 */
HWTEST_F(BgtaskDumpTest, BgtaskDumpTest_GetServiceObject_001, Function | MediumTest | Level0)
{
    sptr<ISystemAbilityManager> systemAbilityManager =
        SystemAbilityManagerClient::GetInstance().GetSystemAbilityManager();
    EXPECT_NE(systemAbilityManager, nullptr);

    sptr<IRemoteObject> remoteObject =
        systemAbilityManager->GetSystemAbility(BACKGROUND_TASK_MANAGER_SERVICE_ID);
    EXPECT_NE(remoteObject, nullptr);
}

/*
 * @tc.name: BgtaskDumpTest_ShellDump_001
 * @tc.desc: Shell dump
 * @tc.type: FUNC
 * @tc.require: SR000GGTJU AR000GH85V
 */
HWTEST_F(BgtaskDumpTest, BgtaskDumpTest_ShellDump_001, Function | MediumTest | Level0)
{
    std::vector<std::string> infos;
    std::vector<std::string> options;
    options.push_back("-T");
    options.push_back("All");
    auto ret = DelayedSingleton<BgTransientTaskMgr>::GetInstance()->ShellDump(options, infos);
    EXPECT_EQ(ret, 0);
}

/*
 * @tc.name: BgtaskDumpTest_ShellDump_002
 * @tc.desc: Shell dump
 * @tc.type: FUNC
 * @tc.require: SR000GGT80 AR000GH6EQ
 */
HWTEST_F(BgtaskDumpTest, BgtaskDumpTest_ShellDump_002, Function | MediumTest | Level0)
{
    std::vector<std::string> infos;
    std::vector<std::string> options;
    options.push_back("-C");
    options.push_back("--all");
    auto ret = BgContinuousTaskMgr::GetInstance()->ShellDumpInner(options, infos);
    EXPECT_EQ(ret, 0);
}
}  // namespace BackgroundTaskMgr
}  // namespace OHOS
