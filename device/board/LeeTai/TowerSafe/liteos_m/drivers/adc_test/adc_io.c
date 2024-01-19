

#include <stdio.h>
#include "adc_if.h"
#include "cmsis_os2.h"
#include "hdf_log.h"
#include "ohos_run.h"
#include "osal_irq.h"

#define SYS_DELAY_TICKS 100

#define ADC_DEVICE_NUM 1
#define ADC_CHANNEL_NUM 6



void adc_test(void)
{
    DevHandle adcHandle;
    uint32_t readVal = 0;

    adcHandle = AdcOpen(ADC_DEVICE_NUM);
    if (adcHandle == NULL) {
        HDF_LOGE("test-AdcOpen fail!\r\n");
        return;
    }

    for (;;) {
        if (AdcRead(adcHandle, ADC_CHANNEL_NUM, &readVal) != HDF_SUCCESS) {
            HDF_LOGE("%s: read adc fail!\r\n", __func__);
            AdcClose(adcHandle);
            return;
        }

        HDF_LOGE("Read adc value: %d\r\n", readVal);
        osDelay(SYS_DELAY_TICKS);
    }
}

