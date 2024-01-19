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

#include <ctype.h>
#include <locale.h>
#include <stdlib.h>
#include "functionalext.h"

const int COUNT = 62;
const int SIZE = 128;

/**
 * @tc.name      : isalnum_l_0100
 * @tc.desc      : Verify isalnum_l process success. The parameter c is an English letter,
 *                 and it is judged that the input character is a letter
 * @tc.level     : Level 0
 */
void isalnum_l_0100(void)
{
    locale_t m_locale = newlocale(LC_ALL_MASK, "en_US.UTF-8", NULL);
    int ret = isalnum_l('a', m_locale);
    EXPECT_NE("isalnum_l_0100", ret, 0);
}

/**
 * @tc.name      : isalnum_l_0200
 * @tc.desc      : Verify isalnum_l process success. The parameter c is an English number,
 *                 and it is judged that the input character is a number
 * @tc.level     : Level 0
 */
void isalnum_l_0200(void)
{
    locale_t m_locale = newlocale(LC_ALL_MASK, "en_US.UTF-8", NULL);
    int ret = isalnum_l('1', m_locale);
    EXPECT_NE("isalnum_l_0200", ret, 0);
}

/**
 * @tc.name      : isalnum_l_0300
 * @tc.desc      : Verify isalnum_l process success. The parameter c is an special character,
 *                 and it is judged that the input character is not a letter or a number
 * @tc.level     : Level 2
 */
void isalnum_l_0300(void)
{
    locale_t m_locale = newlocale(LC_ALL_MASK, "en_US.UTF-8", NULL);
    int ret = isalnum_l('*', m_locale);
    EXPECT_EQ("isalnum_l_0300", ret, 0);
}

/**
 * @tc.name      : isalnum_l_0400
 * @tc.desc      : Verify isalnum_l process success. Determine the number of letters and numbers
 *                 in the ascii code table
 * @tc.level     : Level 1
 */
void isalnum_l_0400(void)
{
    locale_t m_locale = newlocale(LC_ALL_MASK, "en_US.UTF-8", NULL);
    int total = 0;
    for (int i = 0; i < SIZE; i++) {
        int ret = isalnum_l((char)i, m_locale);
        if (ret) {
            total++;
        }
    }
    EXPECT_EQ("isalnum_l_0400", total, COUNT);
}

int main(void)
{
    isalnum_l_0100();
    isalnum_l_0200();
    isalnum_l_0300();
    isalnum_l_0400();
    return t_status;
}