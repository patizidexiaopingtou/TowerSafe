

#include <stdio.h>
#include "ohos_run.h"

/* HelloWorld例子 */
static void HelloWorld(void)
{
    printf("**********************\n");
    printf("*  [Openvalley/Niobeu4] *\n");
    printf("*    Hello world.    *\n");
    printf("**********************\n");
    return;
}

/* 声明应用程序函数入口 */
OHOS_APP_RUN(HelloWorld);
