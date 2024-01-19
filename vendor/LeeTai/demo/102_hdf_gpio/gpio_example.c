/*
 * Copyright (c) 2022 Hunan OpenValley Digital Industry Development Co., Ltd.
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
#include "gpio_types.h"
#include "gpio_if.h"
#include "cmsis_os2.h"
#include "hdf_log.h"
#include "ohos_run.h"

#define SYS_DELAY_TICKS 200
#define TASK_STACK_SIZE 4096
#define TASK_PRIO 25

#define LED_OFF 0
#define LED_ON  1

// 在hcs文件中对应具体的GPIO口
#define BUTTON_KEY_PIN_INDEX1 0      // 独立按键1
#define BUTTON_KEY_PIN_INDEX2 1      // 独立按键2
#define BUTTON_KEY_PIN_INDEX3 2      // 独立按键3

osThreadId_t g_taskID = NULL;

/**
 * @brief 中断回调函数
 *
 */
static int32_t GpioIrqCallback(uint16_t gpio, int data)
{
    (void *)data;
    HDF_LOGE("---> hdf gpio index %d intterrupt!!", gpio);
}

static void gpio_test(void)
{
    uint16_t key_state1 = 0;
    uint16_t key_state2 = 0;
    uint16_t key_state3 = 0;
    GpioSetDir(BUTTON_KEY_PIN_INDEX1, GPIO_DIR_IN);    // LED 配置为输出
    GpioSetDir(BUTTON_KEY_PIN_INDEX2, GPIO_DIR_IN);
    GpioSetDir(BUTTON_KEY_PIN_INDEX3, GPIO_DIR_IN);  // 按键配置为输入
    GpioSetIrq(BUTTON_KEY_PIN_INDEX1, GPIO_IRQ_TRIGGER_FALLING, (GpioIrqFunc)GpioIrqCallback, NULL); // 设置中断、上升下降沿触发
    GpioSetIrq(BUTTON_KEY_PIN_INDEX2, GPIO_IRQ_TRIGGER_FALLING, (GpioIrqFunc)GpioIrqCallback, NULL); 
    GpioSetIrq(BUTTON_KEY_PIN_INDEX3, GPIO_IRQ_TRIGGER_FALLING, (GpioIrqFunc)GpioIrqCallback, NULL); 

    GpioEnableIrq(BUTTON_KEY_PIN_INDEX1);            // 使能中断
    GpioEnableIrq(BUTTON_KEY_PIN_INDEX2);
    GpioEnableIrq(BUTTON_KEY_PIN_INDEX3);
    while (1) {
        // GpioWrite(RED_LED_PIN_INDEX, LED_ON);       // 设置GPIO状态
        // GpioWrite(BLUE_LED_PIN_INDEX, LED_ON);      // 设置GPIO状态
        GpioRead(BUTTON_KEY_PIN_INDEX1, &key_state1); // 读取GPIO状态
        GpioRead(BUTTON_KEY_PIN_INDEX2, &key_state2);
        GpioRead(BUTTON_KEY_PIN_INDEX3, &key_state3);
        printf("--> The Button1 has been %s\r\n", key_state1 ? "released" : "pressed");
        printf("--> The Button2 has been %s\r\n", key_state2 ? "released" : "pressed");
        printf("--> The Button3 has been %s\r\n", key_state3 ? "released" : "pressed");
        osDelay(SYS_DELAY_TICKS);
        // GpioWrite(RED_LED_PIN_INDEX, LED_OFF);
        // GpioWrite(BLUE_LED_PIN_INDEX, LED_OFF);
        GpioRead(BUTTON_KEY_PIN_INDEX1, &key_state1);
        GpioRead(BUTTON_KEY_PIN_INDEX2, &key_state2);
        GpioRead(BUTTON_KEY_PIN_INDEX3, &key_state3);
        printf("--> The Button1 has been %s\r\n", key_state1 ? "released" : "pressed");
        printf("--> The Button2 has been %s\r\n", key_state2 ? "released" : "pressed");
        printf("--> The Button3 has been %s\r\n", key_state3 ? "released" : "pressed");
        osDelay(SYS_DELAY_TICKS);
    }
    GpioUnsetIrq(BUTTON_KEY_PIN_INDEX1, NULL);
    GpioUnsetIrq(BUTTON_KEY_PIN_INDEX2, NULL);
    GpioUnsetIrq(BUTTON_KEY_PIN_INDEX3, NULL);
    GpioDisableIrq(BUTTON_KEY_PIN_INDEX1);
    GpioDisableIrq(BUTTON_KEY_PIN_INDEX2);
    GpioDisableIrq(BUTTON_KEY_PIN_INDEX3);
}

static void gpio_example_task(void)
{
    HDF_LOGE("into gpio hdf example!\n");
    osThreadAttr_t attr;
    attr.name = "adc_test";
    attr.attr_bits = 0U;
    attr.cb_mem = NULL;
    attr.cb_size = 0U;
    attr.stack_mem = NULL;
    attr.stack_size = TASK_STACK_SIZE;
    attr.priority = TASK_PRIO;
    g_taskID = osThreadNew((osThreadFunc_t)gpio_test, NULL, &attr);
    if (g_taskID == NULL) {
        HDF_LOGE("Falied to create Test GPIO thread!\n");
    }
}

OHOS_APP_RUN(gpio_example_task);
