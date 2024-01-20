

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
