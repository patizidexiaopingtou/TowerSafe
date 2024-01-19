/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
 *
 * HDF is dual licensed: you can use it either under the terms of
 * the GPL, or the BSD license, at your option.
 * See the LICENSE file in the root of this repository for complete details.
 */

#include "dac_test.h"
#include "hdf_io_service_if.h"
#include "hdf_log.h"
#include "osal_thread.h"
#include "osal_time.h"
#include "securec.h"

#define HDF_LOG_TAG dac_test_c
#define DAC_TEST_WAIT_TIMES        100
#define TEST_DAC_VAL_NUM           50
#define DAC_TEST_STACK_SIZE        (1024 * 64)
#define DAC_TEST_WAIT_TIMEOUT      20

static int32_t DacTestGetConfig(struct DacTestConfig *config)
{
    int32_t ret;
    struct HdfSBuf *reply = NULL;
    struct HdfIoService *service = NULL;
    const void *buf = NULL;
    uint32_t len;

    service = HdfIoServiceBind("DAC_TEST");
    if (service == NULL) {
        return HDF_ERR_NOT_SUPPORT;
    }

    do {
        reply = HdfSbufObtain(sizeof(*config) + sizeof(uint64_t));
        if (reply == NULL) {
            HDF_LOGE("%s: failed to obtain reply", __func__);
            ret = HDF_ERR_MALLOC_FAIL;
            break;
        }

        ret = service->dispatcher->Dispatch(&service->object, 0, NULL, reply);
        if (ret != HDF_SUCCESS) {
            HDF_LOGE("%s: remote dispatch failed", __func__);
            break;
        }

        if (!HdfSbufReadBuffer(reply, &buf, &len)) {
            HDF_LOGE("%s: read buf failed", __func__);
            ret = HDF_ERR_IO;
            break;
        }

        if (len != sizeof(*config)) {
            HDF_LOGE("%s: config size:%zu, read size:%u", __func__, sizeof(*config), len);
            ret = HDF_ERR_IO;
            break;
        }

        if (memcpy_s(config, sizeof(*config), buf, sizeof(*config)) != EOK) {
            HDF_LOGE("%s: memcpy buf failed", __func__);
            ret = HDF_ERR_IO;
            break;
        }
        HDF_LOGD("%s: exit", __func__);
        ret = HDF_SUCCESS;
    } while (0);
    HdfSbufRecycle(reply);
    HdfIoServiceRecycle(service);
    return ret;
}

static struct DacTester *DacTesterGet(void)
{
    int32_t ret;
    static struct DacTester tester;
    static bool hasInit = false;

    if (hasInit) {
        return &tester;
    }
    ret = DacTestGetConfig(&tester.config);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: write config failed:%d", __func__, ret);
        return NULL;
    }
    tester.handle = DacOpen(tester.config.devNum);
    if (tester.handle == NULL) {
        HDF_LOGE("%s: open dac device:%u failed", __func__, tester.config.devNum);
        return NULL;
    }
    hasInit = true;
    return &tester;
}

static int32_t DacTestWrite(void)
{
    struct DacTester *tester = NULL;
    uint32_t value[TEST_DAC_VAL_NUM];
    int32_t ret;
    int i;

    tester = DacTesterGet();
    if (tester == NULL || tester->handle == NULL) {
        HDF_LOGE("%s: get tester failed", __func__);
        return HDF_ERR_INVALID_OBJECT;
    }
    for (i = 0; i < TEST_DAC_VAL_NUM; i++) {
        value[i] = i;
        ret = DacWrite(tester->handle, tester->config.channel, value[i]);
        if (ret != HDF_SUCCESS) {
            HDF_LOGE("%s: write value failed:%u, ret:%d", __func__, value[i], ret);
            return HDF_ERR_IO;
        }
    }

    return HDF_SUCCESS;
}

static int DacTestThreadFunc(void *param)
{
    struct DacTester *tester = NULL;
    uint32_t val;
    uint32_t i;
    int32_t ret;

    tester = DacTesterGet();
    if (tester == NULL) {
        HDF_LOGE("%s: get tester failed", __func__);
        *((int32_t *)param) = 1;
        return HDF_ERR_INVALID_OBJECT;
    }
    for (i = 0; i < DAC_TEST_WAIT_TIMES; i++) {
        val = i;
        ret = DacWrite(tester->handle, tester->config.channel, val);
        if (ret != HDF_SUCCESS) {
            HDF_LOGE("%s: DacWrite failed, ret:%d", __func__, ret);
            *((int32_t *)param) = 1;
            return HDF_ERR_IO;
        }
    }

    *((int32_t *)param) = 1;
    return val;
}

static int32_t DacTestStartThread(struct OsalThread *thread1, struct OsalThread *thread2,
    const int32_t *count1, const int32_t *count2)
{
    int32_t ret;
    uint32_t time = 0;
    struct OsalThreadParam cfg1;
    struct OsalThreadParam cfg2;

    if (memset_s(&cfg1, sizeof(cfg1), 0, sizeof(cfg1)) != EOK ||
        memset_s(&cfg2, sizeof(cfg2), 0, sizeof(cfg2)) != EOK) {
        HDF_LOGE("%s:memset_s failed.", __func__);
        return HDF_ERR_IO;
    }

    cfg1.name = "DacTestThread-1";
    cfg2.name = "DacTestThread-2";
    cfg1.priority = cfg2.priority = OSAL_THREAD_PRI_DEFAULT;
    cfg1.stackSize = cfg2.stackSize = DAC_TEST_STACK_SIZE;

    ret = OsalThreadStart(thread1, &cfg1);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("start test thread1 failed:%d", ret);
        return ret;
    }

    ret = OsalThreadStart(thread2, &cfg2);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("start test thread2 failed:%d", ret);
    }

    while (*count1 == 0 || *count2 == 0) {
        HDF_LOGV("waitting testing thread finish...");
        OsalMSleep(DAC_TEST_WAIT_TIMES);
        time++;
        if (time > DAC_TEST_WAIT_TIMEOUT) {
            break;
        }
    }
    return ret;
}

static int32_t DacTestMultiThread(void)
{
    int32_t ret;
    struct OsalThread thread1;
    struct OsalThread thread2;
    int32_t count1 = 0;
    int32_t count2 = 0;

    ret = OsalThreadCreate(&thread1, (OsalThreadEntry)DacTestThreadFunc, (void *)&count1);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("create test thread1 failed:%d", ret);
        return ret;
    }

    ret = OsalThreadCreate(&thread2, (OsalThreadEntry)DacTestThreadFunc, (void *)&count2);
    if (ret != HDF_SUCCESS) {
        (void)OsalThreadDestroy(&thread1);
        HDF_LOGE("create test thread1 failed:%d", ret);
        return ret;
    }

    ret = DacTestStartThread(&thread1, &thread2, &count1, &count2);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("test start thread failed:%d", ret);
    }

    (void)OsalThreadDestroy(&thread1);
    (void)OsalThreadDestroy(&thread2);
    return ret;
}

static int32_t DacTestReliability(void)
{
    struct DacTester *tester = NULL;
    uint32_t val;

    val = 0;
    tester = DacTesterGet();
    if (tester == NULL || tester->handle == NULL) {
        return HDF_ERR_INVALID_OBJECT;
    }
    HDF_LOGD("%s: test dfr for DacRead ...", __func__);
    // invalid handle
    (void)DacWrite(NULL, tester->config.channel, val);
    // invalid channel
    (void)DacWrite(tester->handle, tester->config.maxChannel + 1, val);
    return HDF_SUCCESS;
}

static int32_t DacIfPerformanceTest(void)
{
#ifdef __LITEOS__
    // liteos the accuracy of the obtained time is too large and inaccurate.
    return HDF_SUCCESS;
#endif

    uint64_t startMs;
    uint64_t endMs;
    uint64_t useTime;    // ms
    struct DacTester *tester = NULL;
    int32_t ret;
    uint32_t val;

    val = 0;
    tester = DacTesterGet();
    if (tester == NULL || tester->handle == NULL) {
        HDF_LOGE("%s: get tester failed", __func__);
        return HDF_ERR_INVALID_OBJECT;
    }

    startMs = OsalGetSysTimeMs();
    ret = DacWrite(tester->handle, tester->config.channel, val);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: write value failed:%u, ret:%d", __func__, val, ret);
        return HDF_ERR_IO;
    }
    endMs = OsalGetSysTimeMs();

    useTime = endMs - startMs;
    HDF_LOGI("----->interface performance test:[start - end] < 1ms[%s]\r\n", useTime < 1 ? "yes" : "no");
    return HDF_SUCCESS;
}

struct DacTestEntry {
    int cmd;
    int32_t (*func)(void);
    const char *name;
};
static struct DacTestEntry g_entry[] = {
    { DAC_TEST_CMD_WRITE, DacTestWrite, "DacTestWrite" },
    { DAC_TEST_CMD_MULTI_THREAD, DacTestMultiThread, "DacTestMultiThread" },
    { DAC_TEST_CMD_RELIABILITY, DacTestReliability, "DacTestReliability" },
    { DAC_TEST_CMD_IF_PERFORMANCE, DacIfPerformanceTest, "DacIfPerformanceTest" },
};

int32_t DacTestExecute(int cmd)
{
    uint32_t i;
    int32_t ret = HDF_ERR_NOT_SUPPORT;

    if (cmd > DAC_TEST_CMD_MAX) {
        HDF_LOGE("%s: invalid cmd:%d", __func__, cmd);
        ret = HDF_ERR_NOT_SUPPORT;
        HDF_LOGE("[%s][======cmd:%d====ret:%d======]", __func__, cmd, ret);
        return ret;
    }

    for (i = 0; i < sizeof(g_entry) / sizeof(g_entry[0]); i++) {
        if (g_entry[i].cmd != cmd || g_entry[i].func == NULL) {
            continue;
        }
        ret = g_entry[i].func();
        break;
    }

    HDF_LOGE("[%s][======cmd:%d====ret:%d======]", __func__, cmd, ret);
    return ret;
}
