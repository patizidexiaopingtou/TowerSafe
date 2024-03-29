/*
 * Copyright (c) 2020-2022 Huawei Device Co., Ltd.
 *
 * HDF is dual licensed: you can use it either under the terms of
 * the GPL, or the BSD license, at your option.
 * See the LICENSE file in the root of this repository for complete details.
 */

#ifndef GPIO_TEST_H
#define GPIO_TEST_H

#include "hdf_base.h"

#ifdef __cplusplus
extern "C" {
#endif

#define NAME_SIZE_MAX 100

int32_t GpioTestExecute(int cmd);
void GpioTestExecuteAll(void);

enum GpioTestCmd {
    GPIO_TEST_SET_GET_DIR = 0,
    GPIO_TEST_WRITE_READ = 1,
    GPIO_TEST_IRQ_LEVEL = 2,
    GPIO_TEST_IRQ_EDGE = 3,
    GPIO_TEST_IRQ_THREAD = 4,
    GPIO_TEST_GET_NUM_BY_NAME = 5,
    GPIO_TEST_RELIABILITY = 6,
    GPIO_TEST_PERFORMANCE = 7,
    GPIO_TEST_MAX = 8,
};

struct GpioTestConfig {
    char testNameOne[NAME_SIZE_MAX];
    char testNameTwo[NAME_SIZE_MAX];
    uint16_t gpio;
    uint16_t gpioTestTwo;
    uint16_t gpioIrq;
    uint16_t testUserApi;
};

struct GpioTester {
    struct GpioTestConfig cfg;
    uint16_t oldDir;
    uint16_t oldVal;
    uint16_t irqCnt;
    uint16_t total;
    uint16_t fails;
    uint32_t irqTimeout;
};

#ifdef __cplusplus
}
#endif

#endif /* GPIO_TEST_H */
