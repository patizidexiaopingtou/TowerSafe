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

#include "pin_func_test.h"

#include <gtest/gtest.h>

#include "pin_func.h"
#include "securec.h"

namespace OHOS {
namespace UserIam {
namespace PinAuth {
using namespace testing;
using namespace testing::ext;

void PinFuncTest::SetUpTestCase()
{
}

void PinFuncTest::TearDownTestCase()
{
}

void PinFuncTest::SetUp()
{
}

void PinFuncTest::TearDown()
{
}

/**
 * @tc.name: DoEnrollPin test
 * @tc.desc: verify DoEnrollPin
 * @tc.type: FUNC
 * @tc.require: #I64XCB
 */
HWTEST_F(PinFuncTest, DoEnrollPin_test, TestSize.Level1)
{
    PinEnrollParam *pinEnrollParam = new (std::nothrow) PinEnrollParam();
    EXPECT_NE(pinEnrollParam, nullptr);

    pinEnrollParam->scheduleId = 1;
    pinEnrollParam->subType = 10010;
    std::vector<uint8_t> salt(CONST_SALT_LEN, 1);
    std::vector<uint8_t> pinData(CONST_PIN_DATA_LEN, 1);
    (void)memcpy_s(&(pinEnrollParam->salt[0]), CONST_SALT_LEN, &salt[0], CONST_SALT_LEN);
    (void)memcpy_s(&(pinEnrollParam->pinData[0]), CONST_PIN_DATA_LEN, &pinData[0], CONST_PIN_DATA_LEN);
    Buffer *retTlv = CreateBufferBySize(RESULT_TLV_LEN);
    EXPECT_NE(retTlv, nullptr);

    uint32_t result = DoEnrollPin(nullptr, retTlv);
    EXPECT_EQ(result, RESULT_BAD_PARAM);

    retTlv->contentSize = retTlv->maxSize + 1;
    result = DoEnrollPin(pinEnrollParam, retTlv);
    EXPECT_EQ(result, RESULT_BAD_PARAM);
    delete pinEnrollParam;
    DestoryBuffer(retTlv);
}

/**
 * @tc.name: DoAuthPin test
 * @tc.desc: verify DoAuthPin
 * @tc.type: FUNC
 * @tc.require: #I64XCB
 */
HWTEST_F(PinFuncTest, DoAuthPin_test, TestSize.Level1)
{
    PinAuthParam *pinAuthParam = new (std::nothrow) PinAuthParam();
    EXPECT_NE(pinAuthParam, nullptr);

    pinAuthParam->scheduleId = 1;
    pinAuthParam->templateId = 12131415;
    std::vector<uint8_t> pinData(CONST_PIN_DATA_LEN, 1);
    (void)memcpy_s(&(pinAuthParam->pinData[0]), CONST_PIN_DATA_LEN, &pinData[0], CONST_PIN_DATA_LEN);
    Buffer *retTlv = CreateBufferBySize(RESULT_TLV_LEN);
    EXPECT_NE(retTlv, nullptr);

    uint32_t result = DoAuthPin(nullptr, retTlv);
    EXPECT_EQ(result, RESULT_BAD_PARAM);

    retTlv->contentSize = retTlv->maxSize + 1;
    result = DoAuthPin(pinAuthParam, retTlv);
    EXPECT_EQ(result, RESULT_BAD_PARAM);
    delete pinAuthParam;
    DestoryBuffer(retTlv);
}

/**
 * @tc.name: DoQueryPinInfo test
 * @tc.desc: verify DoQueryPinInfo
 * @tc.type: FUNC
 * @tc.require: #I64XCB
 */
HWTEST_F(PinFuncTest, DoQueryPinInfo_test, TestSize.Level1)
{
    PinCredentialInfos *pinCredentialInfo = new (std::nothrow) PinCredentialInfos();
    EXPECT_NE(pinCredentialInfo, nullptr);

    uint32_t result = DoQueryPinInfo(INVALID_TEMPLATE_ID, pinCredentialInfo);
    EXPECT_EQ(result, RESULT_BAD_PARAM);

    result = DoQueryPinInfo(0, nullptr);
    EXPECT_EQ(result, RESULT_BAD_PARAM);

    result = DoQueryPinInfo(0, pinCredentialInfo);
    EXPECT_EQ(result, RESULT_BAD_MATCH);
    delete pinCredentialInfo;
}

/**
 * @tc.name: DoDeleteTemplate test
 * @tc.desc: verify DoDeleteTemplate
 * @tc.type: FUNC
 * @tc.require: #I64XCB
 */
HWTEST_F(PinFuncTest, DoDeleteTemplate_test, TestSize.Level1)
{
    uint32_t result = DoDeleteTemplate(INVALID_TEMPLATE_ID);
    EXPECT_EQ(result, RESULT_BAD_DEL);
}

/**
 * @tc.name: GenerateRetTlv test
 * @tc.desc: verify GenerateRetTlv
 * @tc.type: FUNC
 * @tc.require: #I64XCB
 */
HWTEST_F(PinFuncTest, GenerateRetTlv_test, TestSize.Level1)
{
    Buffer *rootSecret = CreateBufferBySize(ROOT_SECRET_LEN);
    EXPECT_NE(rootSecret, nullptr);
    uint32_t result =GenerateRetTlv(0, 1, 2, nullptr, rootSecret);
    EXPECT_EQ(result, RESULT_BAD_PARAM);
}

/**
 * @tc.name: DoGetExecutorInfo test
 * @tc.desc: verify DoGetExecutorInfo
 * @tc.type: FUNC
 * @tc.require: #I64XCB
 */
HWTEST_F(PinFuncTest, DoGetExecutorInfo_test, TestSize.Level1)
{
    uint32_t result = DoGetExecutorInfo(nullptr);
    EXPECT_EQ(result, RESULT_BAD_PARAM);
}

/**
 * @tc.name: DoVerifyTemplateData test
 * @tc.desc: verify DoVerifyTemplateData
 * @tc.type: FUNC
 * @tc.require: #I64XCB
 */
HWTEST_F(PinFuncTest, DoVerifyTemplateData_test, TestSize.Level1)
{
    std::vector<uint64_t> templateIdList = {1, 0};
    uint32_t templateIdListLen = 2;
    uint32_t result = DoVerifyTemplateData(nullptr, templateIdListLen);
    EXPECT_EQ(result, RESULT_BAD_PARAM);

    result = DoVerifyTemplateData(&templateIdList[0], templateIdListLen);
    EXPECT_EQ(result, RESULT_SUCCESS);
}
} // namespace PinAuth
} // namespace UserIam
} // namespace OHOS
