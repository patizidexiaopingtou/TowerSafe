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

#include <hwext/gtest-ext.h>
#include <hwext/gtest-tag.h>

#include "client_map.h"
#include "service_entry.h"

using namespace testing::ext;

namespace {
class ClientMapTest : public testing::Test {
public:
    static void SetUpTestCase() {}

    static void TearDownTestCase() {}
    void SetUp() {}
    void TearDown() {}
};

/**
 * @tc.name: Service
 * @tc.desc: Client map performance.
 * @tc.type: FUNC
 */
HWTEST_F(ClientMapTest, ClientSocket, TestSize.Level1)
{
    ServiceEntry serviceEntry;
    ASSERT_EQ(ClientMap::GetInstance().PutClientSocket(1, serviceEntry), 1);
    ASSERT_EQ(ClientMap::GetInstance().AutoRelease(), 1);
}
} // namespace