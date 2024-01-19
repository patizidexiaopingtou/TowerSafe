
// LVGL version: 8.3.6
// Project name: display_sensor_data
// 获取湿度 humidity
// 获取光照强度 light
// 获取温度 temperature
// 手动控制水泵开关 watering pump
#include "ui.h"

#include <stdio.h>
#include <string.h>
#include <unistd.h>

#include "gpio_types.h"
#include "gpio_if.h"

#include "adc_if.h"
#include "cmsis_os2.h"
#include "ohos_run.h"
#include "osal_irq.h"
#include "hdf_log.h"
#include "los_swtmr.h"
#include <i2c_if.h>
#include "i2c_sht30.h"

#define ADC_DEVICE_NUM 1
#define ADC_CHANNEL_NUM 0 // port B GPIO36 Humidity GPIO36

#define ADC2_DEVICE_NUM 2
#define ADC2_CHANNEL_NUM 4 // port C GPIO13 Light

#define SYS_DELAY_TICKS 100
#define TASK_STACK_SIZE 4096
#define TASK_PRIO 25

#define MAX_LIGHT 3441    // light sensor max adc value
#define MAX_HUMIDITY 3441 // humidity sensor max adc value
#define HUMIDITY_REF 55   // humidity sensor reference value

#define PUMP_GPIO_26 2 // port B GPIO26 pump control
#define PUMP_OFF 0
#define PUMP_ON 1

#define I2C_SUCCESE 1
#define I2C_ERROR 0
#define DEV_SLAVE_ADDR 0x44         // 从机设备地址

#define I2C_NUM 1
#define BUFF_LEN 6

DevHandle i2c_handle = NULL;
DevHandle g_adcHandle;
uint32_t g_readVal = 0;
lv_coord_t temperature_arry[10]={0};
int g_temp_index = -1; // 温度数据的下标

struct irrigation
{
    float humidity;
    float light;
    float temperature;
    uint16_t pump_status;
} MyIrrigationSys;

static void i2c_temperature(void);
static void adc_humidity(void);
static int I2cWrite(DevHandle i2c_handle, unsigned char regAddr, unsigned char data);
static int I2cRead(DevHandle i2c_handle, unsigned char regAddr, unsigned char *data, int datalen);
static void adc_light(void);

// button
void GetHumiData(lv_event_t *e)
{
    char temp_data[10] = {0};
    // MyIrrigationSys.humidity = 51.9;
    sprintf((char *)temp_data, "%.1f", MyIrrigationSys.humidity); // 格式化输出 浮点数转成字符串输出
    lv_label_set_text_fmt(ui_LabelHumi, "%s", (const char *)temp_data);
    lv_bar_set_value(ui_humidityBar, (int)MyIrrigationSys.humidity, LV_ANIM_ON);
}
// auto
void SetHumiData()
{
    char temp_data[10] = {0};
    // MyIrrigationSys.humidity = 51.9;
    sprintf((char *)temp_data, "%.1f", MyIrrigationSys.humidity); // 格式化输出 浮点数转成字符串输出
    lv_label_set_text_fmt(ui_LabelHumi, "%s", (const char *)temp_data);
    lv_bar_set_value(ui_humidityBar, (int)MyIrrigationSys.humidity, LV_ANIM_ON);
}

// button
void GetLightData(lv_event_t *e)
{
    char temp_data[10] = {0};
    //   MyIrrigationSys.light = 66.6;
    sprintf((char *)temp_data, "%.1f", MyIrrigationSys.light); // 格式化输出 浮点数转成字符串输出
    lv_label_set_text_fmt(ui_LabelLight, "%s", (const char *)temp_data);
    lv_bar_set_value(ui_LightBar, (int)MyIrrigationSys.light, LV_ANIM_ON);
}
// auto
void SetLightData()
{
    char temp_data[10] = {0};
    //   MyIrrigationSys.light = 66.6;
    sprintf((char *)temp_data, "%.1f", MyIrrigationSys.light); // 格式化输出 浮点数转成字符串输出
    lv_label_set_text_fmt(ui_LabelLight, "%s", (const char *)temp_data);
    lv_bar_set_value(ui_LightBar, (int)MyIrrigationSys.light, LV_ANIM_ON);
}

// button
void GetTepmData(lv_event_t *e)
{
    char temp_data[10] = {0};
    MyIrrigationSys.temperature = 37.9;
    sprintf((char *)temp_data, "%.1f", MyIrrigationSys.temperature); // 格式化输出 浮点数转成字符串输出
    lv_label_set_text_fmt(ui_LabelTemp, "%s", (const char *)temp_data);
}
// auto
void SetTepmData()
{
    char temp_data[10] = {0};
    // MyIrrigationSys.temperature = 37.9;
    sprintf((char *)temp_data, "%.1f", MyIrrigationSys.temperature); // 格式化输出 浮点数转成字符串输出
    lv_label_set_text_fmt(ui_LabelTemp, "%s", (const char *)temp_data);
}

void WateringCtrl(lv_event_t *e)
{
    if (lv_obj_has_state(ui_SwitchWater, LV_STATE_CHECKED))
    {
        lv_label_set_text(ui_LableWaterStatus, "ON");
        MyIrrigationSys.pump_status = PUMP_ON;
        HDF_LOGE("PUMP should be ON!\r\n");
    }
    else
    {
        lv_label_set_text(ui_LableWaterStatus, "OFF");
        MyIrrigationSys.pump_status = PUMP_OFF;
        HDF_LOGE("PUMP should be OFF!\r\n");
    }
    GpioWrite(PUMP_GPIO_26, MyIrrigationSys.pump_status);
    HDF_LOGE("PUMP GPIO26 Write\r\n");
}

static void adc_humidity(void)
{
    if (AdcRead(g_adcHandle, ADC_CHANNEL_NUM, &g_readVal) != HDF_SUCCESS)
    {
        HDF_LOGE("%s: read adc1 humidity fail!\r\n", __func__);
        AdcClose(g_adcHandle);
        return;
    }
    MyIrrigationSys.humidity = (float)(100 * (MAX_HUMIDITY - g_readVal) / MAX_HUMIDITY); // 百分化处理
}

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
    //1. 写入要读取的寄存器地址  温度传感器不需要该操作
    // struct I2cMsg writeMsg = {
    //     .addr = DEV_SLAVE_ADDR,
    //     .buf = &regAddr,
    //     .len = 1,
    //     .flags = 0,
    // };
    // ret = I2cTransfer(i2c_handle, &writeMsg, 1);
    // if (ret != 0)
    // {
    //     printf("I2cRead writeMsg failed\n");
    //     return I2C_ERROR;
    // }
    // LOS_TaskDelay(50); // 要加延时，给传感器准备数据

    // 2. 读取指定长度数据
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

/* 
获取温度，该传感器也提供湿度，但不需要
*/
static void i2c_temperature(void)
{
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
    I2cWrite(i2c_handle, 0x2C, 0x06);
    LOS_TaskDelay(50); // 要加延时，给传感器准备数据
    if (I2cRead(i2c_handle, HIGH_ENABLED_CMD, data, BUFF_LEN) == I2C_SUCCESE) // 从寄存器地址读取6个字节
    {
        cTemp = ((((data[0] * 256.0) + data[1]) * 175) / 65535.0) - 45;
        fTemp = (cTemp * 1.8) + 32;
        humidity = ((((data[3] * 256.0) + data[4]) * 100) / 65535.0); // 参考数据手册获取

        printf("cTemp---=%.2f\r\n", cTemp);
        printf("Temp---=%.2f\r\n", fTemp);
        printf("humidity---=%.2f\r\n", humidity);
        MyIrrigationSys.temperature = cTemp; //我们只需要摄氏度
       
       // 历史10次温度，存储在数组中
        g_temp_index++;
        if(g_temp_index>=10)
        {
            g_temp_index = 0;
        }
        temperature_arry[g_temp_index] = (int)cTemp;
    }
    I2cClose(i2c_handle);
}

static void adc_light(void)
{
    if (AdcRead(g_adcHandle, ADC_CHANNEL_NUM, &g_readVal) != HDF_SUCCESS)
    {
        HDF_LOGE("%s: read adc2 fail!\r\n", __func__);
        AdcClose(g_adcHandle);
        return;
    }
    MyIrrigationSys.light = (float)(100 * (MAX_LIGHT - g_readVal) / MAX_LIGHT); // 百分化处理
    HDF_LOGE("Read adc2 light value: %d\r\n", g_readVal);
}

static void Irrigation_system(void)
{
    GpioSetDir(PUMP_GPIO_26, GPIO_DIR_OUT); // PUMP GPIO26 配置为输出
    GpioWrite(PUMP_GPIO_26, PUMP_OFF);
    g_adcHandle = AdcOpen(ADC_DEVICE_NUM);
    if (g_adcHandle == NULL)
    {
        HDF_LOGE("AdcOpen1 fail!\r\n");
        return;
    }

    for (;;)
    {
        // 湿度
        adc_humidity();
        SetHumiData();

        // 灌溉
        if ((MyIrrigationSys.humidity < HUMIDITY_REF) | (MyIrrigationSys.pump_status == PUMP_ON))
        {
            GpioWrite(PUMP_GPIO_26, PUMP_ON);
        }
        else
        {
            GpioWrite(PUMP_GPIO_26, PUMP_OFF);
        }
        HDF_LOGE("MyIrrigationSys.humidity: %.lf\r\n", MyIrrigationSys.humidity);

        // 光照 需要接到portB 和 灌溉共用一个接口
        adc_light();
        SetLightData();

        // 温度
        i2c_temperature();
        SetTepmData();
        // 绘制温度曲线
        lv_chart_series_t * ui_Chart2_series_1 = lv_chart_add_series(ui_Chart2, lv_color_hex(0x87CEFA), //浅蓝色
                                                                 LV_CHART_AXIS_PRIMARY_Y);
        static lv_coord_t ui_Chart2_series_1_array[] = { 0, 10, 20, 40, 80, 80, 40, 20, 10, 0 };
        lv_chart_set_ext_y_array(ui_Chart2, ui_Chart2_series_1, temperature_arry);

        LOS_TaskDelay(50); /* 0.05 Seconds */
    }
}

void Irrigation_Task(void)
{
    HDF_LOGE("into Irrigation system example!\n");

    osThreadAttr_t attr;
    osThreadId_t g_taskID = NULL;

    attr.name = "Irrigation_system+";
    attr.attr_bits = 0U;
    attr.cb_mem = NULL;
    attr.cb_size = 0U;
    attr.stack_mem = NULL;
    attr.stack_size = TASK_STACK_SIZE;
    attr.priority = TASK_PRIO;

    g_taskID = osThreadNew((osThreadFunc_t)Irrigation_system, NULL, &attr);
    if (g_taskID == NULL)
    {
        HDF_LOGE("Falied to create Irrigation_task thread!\n");
    }
}