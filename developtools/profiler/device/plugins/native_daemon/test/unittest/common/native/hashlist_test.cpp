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
#include "hashlist_test.h"

#include <string>

using namespace testing::ext;
using namespace std;
using namespace OHOS::HiviewDFX;

namespace OHOS {
namespace Developtools {
namespace NativeDaemon {
class HashListTest : public testing::Test {
public:
    static void SetUpTestCase(void);
    static void TearDownTestCase(void);
    void SetUp();
    void TearDown();
    const std::size_t size_ {20};
};

void HashListTest::SetUpTestCase(void) {}
void HashListTest::TearDownTestCase(void) {}
void HashListTest::SetUp() {}
void HashListTest::TearDown() {}

HWTEST_F(HashListTest, size, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    ASSERT_TRUE(hashList.empty());
    ASSERT_FALSE(hashList.IsFull());
    ASSERT_EQ(hashList.capacity(), size_);
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_back(curSize, curSize);
        EXPECT_EQ(hashList.size(), curSize + 1);
    }
}

HWTEST_F(HashListTest, empty, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    EXPECT_TRUE(hashList.empty());
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_back(curSize, curSize);
        EXPECT_FALSE(hashList.empty());
    }
}

HWTEST_F(HashListTest, count, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    std::size_t temp {125};
    EXPECT_EQ(hashList.count(temp), 0u);
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_back(curSize, curSize);
        EXPECT_EQ(hashList.count(curSize), 1u);
    }
}

HWTEST_F(HashListTest, begin, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_back(curSize, curSize);
    }
    for (std::size_t count = 0; count < size_; ++count) {
        auto first = hashList.begin();
        EXPECT_EQ(*first, count);
        hashList.pop_front();
    }
}

HWTEST_F(HashListTest, cbegin, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_back(curSize, curSize);
    }
    for (std::size_t count = 0; count < size_; ++count) {
        const auto first = hashList.cbegin();
        EXPECT_EQ(*first, count);
        hashList.pop_front();
    }
}

HWTEST_F(HashListTest, end, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_back(curSize, curSize);
    }
    for (std::size_t count = size_ - 1; count > 0; --count) {
        auto last = hashList.end();
        last--;
        EXPECT_EQ(*last, count);
        hashList.pop_back();
    }
}

HWTEST_F(HashListTest, cend, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_back(curSize, curSize);
    }
    for (std::size_t count = size_ - 1; count > 0; --count) {
        const auto last = hashList.cend();
        auto temp = last;
        temp--;
        EXPECT_EQ(*temp, count);
        hashList.pop_back();
    }
}

HWTEST_F(HashListTest, rbegin, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_back(curSize, curSize);
    }
    for (std::size_t count = size_ - 1; count > 0; --count) {
        auto last = hashList.rbegin();
        EXPECT_EQ(*last, count);
        hashList.pop_back();
    }
}

HWTEST_F(HashListTest, crbegin, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_back(curSize, curSize);
    }
    for (std::size_t count = size_ - 1; count > 0; --count) {
        const auto last = hashList.crbegin();
        EXPECT_EQ(*last, count);
        hashList.pop_back();
    }
}

HWTEST_F(HashListTest, rend, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_back(curSize, curSize);
    }
    for (std::size_t count = 0; count < size_; ++count) {
        auto first = hashList.rend();
        --first;
        EXPECT_EQ(*first, count);
        hashList.pop_front();
    }
}

HWTEST_F(HashListTest, crend, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_back(curSize, curSize);
    }
    for (std::size_t count = 0; count < size_; ++count) {
        const auto first = hashList.rend();
        auto temp = first;
        --temp;
        EXPECT_EQ(*temp, count);
        hashList.pop_front();
    }
}

HWTEST_F(HashListTest, front, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_back(curSize, curSize);
    }
    for (std::size_t count = 0; count < size_; ++count) {
        auto first1 = hashList.front();
        const auto first2 = hashList.front();
        EXPECT_EQ(first1, count);
        EXPECT_EQ(first2, count);
        hashList.pop_front();
    }
}

HWTEST_F(HashListTest, back, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_back(curSize, curSize);
    }
    for (std::size_t count = size_ - 1; count > 0; --count) {
        auto last1 = hashList.back(true);
        auto last2 = hashList.front();
        EXPECT_EQ(last1, count);
        EXPECT_EQ(last2, count);
    }
}

HWTEST_F(HashListTest, subscription, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_back(curSize, curSize);
    }
    for (std::size_t count = 0; count < size_; ++count) {
        auto val1 = hashList[count];
        auto val2 = hashList.front();
        EXPECT_EQ(val1, val2);
    }
}

HWTEST_F(HashListTest, find, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_back(curSize, curSize);
    }
    for (std::size_t count = 0; count < (size_ + size_); ++count) {
        auto itr = hashList.find(count);
        if (count < size_) {
            EXPECT_EQ(*itr, count);
        } else {
            EXPECT_TRUE(itr == hashList.end());
        }
    }
}

HWTEST_F(HashListTest, push_front, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    constexpr std::size_t size_ {20};
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_front(curSize, curSize);
        std::size_t tmp = hashList.front();
        EXPECT_EQ(tmp, curSize);
    }
}

HWTEST_F(HashListTest, push_back, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    constexpr std::size_t size_ {20};
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_back(curSize, curSize);
        std::size_t tmp = hashList.back();
        EXPECT_EQ(tmp, curSize);
    }
}

HWTEST_F(HashListTest, pop_front, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_back(curSize, curSize);
    }
    for (std::size_t count = 0; count < size_; ++count) {
        std::size_t tmp = hashList.front();
        EXPECT_EQ(tmp, count);
        EXPECT_EQ(hashList.size(), size_ - count);
        hashList.pop_front();
    }
    EXPECT_TRUE(hashList.empty());
}

HWTEST_F(HashListTest, pop_back, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_front(curSize, curSize);
    }
    for (std::size_t count = 0; count < size_; ++count) {
        std::size_t tmp = hashList.back();
        EXPECT_EQ(tmp, count);
        EXPECT_EQ(static_cast<std::size_t>(hashList.size()), size_ - count);
        hashList.pop_back();
    }
    EXPECT_TRUE(hashList.empty());
}

HWTEST_F(HashListTest, erase, TestSize.Level1)
{
    HashList<std::size_t, std::size_t> hashList {size_};
    for (std::size_t curSize = 0; curSize < size_; ++curSize) {
        hashList.push_back(curSize, curSize);
    }
    for (std::size_t count = 0; count < size_; ++count) {
        std::size_t tmp = hashList.front();
        EXPECT_EQ(tmp, count);
        EXPECT_EQ(static_cast<std::size_t>(hashList.size()), size_ - count);
        hashList.erase(count);
    }
    EXPECT_TRUE(hashList.empty());
}
} // end of namespace NativeDaemon
} // end of namespace Developtools
} // end of namespace OHOS