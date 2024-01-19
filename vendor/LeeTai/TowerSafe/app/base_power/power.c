/*
 * Copyright (c) 2022 Diemit <598757652@qq.com>
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

#include <stdio.h>
#include "ohos_run.h"
#include "gpio_if.h"
#include "i2c_if.h"
#include "axp192.h"


static void PowerTest(void)
{

    EnvInit();
    Axp192Init();
   

    while (1) {
        
        SetLed(true);

        osDelay(100);

        SetLed(false);

        osDelay(100);
    }

    return;
}

/* 声明应用程序函数入口 */
OHOS_APP_RUN(PowerTest);
