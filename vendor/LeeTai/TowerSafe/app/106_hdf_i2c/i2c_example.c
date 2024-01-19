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
#include <hdf_log.h>
#include <i2c_if.h>
#include "cmsis_os2.h"
#include "ohos_run.h"

#include "i2c_sht30.h"

#define HDF_I2C_STACK_SIZE 0x1000
#define HDF_I2C_TASK_NAME "hdf_i2c_test_task"
#define HDF_I2C_TASK_PRIORITY 25
#define HDF_I2C_DELAY_TICKS 100

#define I2C_SUCCESE 1
#define I2C_ERROR 0
#define DEV_SLAVE_ADDR 0x44         // 从机设备地址
#define REG_WR_ADDR 0X44 << 1       // write reg address
#define REG_RD_ADDR (0x44 << 1) + 1 // read reg address
#define I2C_NUM 1
#define BUFF_LEN 6

static int I2cWrite(DevHandle i2c_handle, unsigned char regAddr, unsigned char data)
{
    int ret = I2C_ERROR;
    unsigned char buf[2] = {regAddr, data};
    struct I2cMsg msg = {
        .addr = DEV_SLAVE_ADDR,
        .buf = buf,
        .len = 2,
        .flags = 0,
    };
    ret = I2cTransfer(i2c_handle, &msg, 1);
    if (ret != 0)
    {
        printf("I2cWrite msg failed\n");
        return I2C_ERROR;
    }
    return I2C_SUCCESE;
}

static int I2cRead(DevHandle i2c_handle, unsigned char regAddr, unsigned char *data, int datalen)
{
    int ret = I2C_ERROR;
    struct I2cMsg writeMsg = {
        .addr = DEV_SLAVE_ADDR,
        .buf = &regAddr,
        .len = 1,
        .flags = 0,
    };
    ret = I2cTransfer(i2c_handle, &writeMsg, 1);
    if (ret != 0)
    {
        printf("I2cRead writeMsg failed\n");
        return I2C_ERROR;
    }

    struct I2cMsg readMsg = {
        .addr = DEV_SLAVE_ADDR,
        .buf = data,
        .len = datalen,
        .flags = I2C_FLAG_READ,
    };
    ret = I2cTransfer(i2c_handle, &readMsg, 1);
    if (ret != 0)
    {
        printf("I2cRead readMsg failed\n");
        return I2C_ERROR;
    }
    return I2C_SUCCESE;
}
// 写8bit指令（自动包含了器件地址,Addr为写地址，Data为写入的指令）
static void Write1Byte(DevHandle i2c_handle, uint8_t Addr, uint8_t Data)
{
    int ret;
    uint8_t buf[2] = {Addr, Data};
    struct I2cMsg msg = {
        .addr = REG_WR_ADDR,
        .buf = buf,
        .len = 2,
        .flags = 0,
    };
    ret = I2cTransfer(i2c_handle, &msg, 1);
    if (ret != 0)
    {
        printf("Write1Byte msg failed\n");
        return;
    }
}

static void ReadBuff(DevHandle i2c_handle, uint8_t Addr, uint8_t Size, uint8_t *Buff)
{

    struct I2cMsg writeMsg = {
        .addr = DEV_SLAVE_ADDR,
        .buf = &Addr,
        .len = 1,
        .flags = 0,
    };
    int ret = I2cTransfer(i2c_handle, &writeMsg, 1);
    if (ret != 0)
    {
        printf("ReadBuff writeMsg failed\n");
        return;
    }

    struct I2cMsg readMsg = {
        .addr = DEV_SLAVE_ADDR,
        .buf = Buff,
        .len = Size,
        .flags = I2C_FLAG_READ,
    };
    ret = I2cTransfer(i2c_handle, &readMsg, 1);
    if (ret != 0)
    {
        printf("ReadBuff readMsg failed\n");
        return;
    }
}
// 读16bit数据
static uint16_t Read16bit(DevHandle i2c_handle, uint8_t Addr)
{
    uint16_t ReData = 0;
    uint8_t buf[2];
    ReadBuff(i2c_handle, Addr, 2, buf);
    for (int i = 0; i < 2; i++)
    {
        ReData <<= 8;
        ReData |= buf[i];
    }
    return ReData;
}

static void *HdfI2CTestEntry(uint32_t arg)
{
    (void *)arg;
    int32_t ret;
    DevHandle i2c_handle = NULL;
    char data[BUFF_LEN] = {0};
    i2c_handle = I2cOpen(I2C_NUM); // 打开 I2C
    if (i2c_handle == NULL)
    {
        printf("I2c %d Open fail!!\n", I2C_NUM);
        return NULL;
    }
    printf("i2c_handle %d,i2c_open succeseful----01\n", i2c_handle);
    float cTemp = 0;
    float fTemp = 0;
    float humidity = 0;
    while (1)
    {
        LOS_TaskDelay(50);                /* 0.2 Seconds */
        I2cWrite(i2c_handle, 0x2C, 0x06); // 往寄存器地址中写入一个字节
        // I2cWrite(i2c_handle, 0x2C, 0x06); 
        LOS_TaskDelay(50);
        if (I2cRead(i2c_handle, READOUT_FOR_PERIODIC_MODE, data, BUFF_LEN) == I2C_SUCCESE)// 从寄存器地址读取6个字节
        {
            cTemp = ((((data[0] * 256.0) + data[1]) * 175) / 65535.0) - 45;
            fTemp = (cTemp * 1.8) + 32;
            humidity = ((((data[3] * 256.0) + data[4]) * 100) / 65535.0);

            printf("cTemp---=%.2f\r\n", cTemp);
            printf("Temp---=%.2f\r\n", fTemp);
            printf("humidity---=%.2f\r\n", humidity);

        } 
    }
    I2cClose(i2c_handle);
}

void StartHdfI2CTest(void)
{
    osThreadAttr_t attr;
    attr.name = HDF_I2C_TASK_NAME;
    attr.attr_bits = 0U;
    attr.cb_mem = NULL;
    attr.cb_size = 0U;
    attr.stack_mem = NULL;
    attr.stack_size = HDF_I2C_STACK_SIZE;
    attr.priority = HDF_I2C_TASK_PRIORITY;

    if (osThreadNew((osThreadFunc_t)HdfI2CTestEntry, NULL, &attr) == NULL)
    {
        printf("Failed to create %d!\n", HDF_I2C_TASK_NAME);
    }
}

OHOS_APP_RUN(StartHdfI2CTest);