

#include <stdio.h>
#include "stdint.h"
#include "ohos_run.h"
#include "gpio_if.h"
#include "axp192.h"
#include "lvgl.h"
#include "App/App.h"
#include "HAL/HAL.h"

#define SYS_DELAY_TICKS 100

#define ADC_DEVICE_NUM 1
#define ADC_CHANNEL_NUM 7

extern void adc_task(void);


void DeviceInit(void){
    Hal_init();

}

void display_test(void)
{
    //初始化设备
    DeviceInit();

    lv_init();

    lv_port_disp_init();

    lv_port_indev_init();

    printf("base_lvgl_init\n");

   
    ui_init();
    
   // 灌溉系统
    Irrigation_Task();

    while (1) {
        LOS_TaskDelay(1); /* 1 Seconds */
        lv_task_handler();
    }

}

OHOS_APP_RUN(display_test);