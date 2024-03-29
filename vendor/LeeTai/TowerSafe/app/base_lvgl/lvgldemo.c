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
#include "stdint.h"
#include "ohos_run.h"
#include "gpio_if.h"
#include "axp192.h"
#include "ili9342c.h"
#include "lvgl.h"
#include "lv_demos.h"

void DeviceInit(void){
    Axp192Init();

}

void display_test(void)
{
    //初始化设备
    DeviceInit();

    lv_init();

    lv_port_disp_init();

    lv_port_indev_init();

    // lv_demo_benchmark();
    // lv_demo_widgets();
    // lv_demo_music();
    printf("base_lvgl_init\n");

    while (1) {
        LOS_TaskDelay(1); /* 2 Seconds */
        lv_task_handler();
        
    }

}

OHOS_APP_RUN(display_test);