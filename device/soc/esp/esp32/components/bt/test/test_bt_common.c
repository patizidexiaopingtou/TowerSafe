/*
 * Copyright (c) 2022 OpenValley Digital Co. LTD.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 Tests for the BT common things implementation
*/

#include <stdbool.h>

#include "unity.h"

extern bool btdm_controller_compile_version_check(void);

TEST_CASE("bt_controller_git_commit_check", "[bt_common]")
{
    TEST_ASSERT(btdm_controller_compile_version_check() == true);
}
