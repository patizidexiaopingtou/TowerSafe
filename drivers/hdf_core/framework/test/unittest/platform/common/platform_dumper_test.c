/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
 *
 * HDF is dual licensed: you can use it either under the terms of
 * the GPL, or the BSD license, at your option.
 * See the LICENSE file in the root of this repository for complete details.
 */

#include "platform_dumper_test.h"
#include "osal_io.h"
#include "osal_time.h"
#include "platform_assert.h"
#include "platform_dumper.h"
#include "securec.h"

#define HDF_LOG_TAG platform_dumper_test

static const char *g_dumperTestName = "dumperTestName";
struct PlatformDumper *g_dumperTest = NULL;
struct PlatformDumperTestEntry {
    int cmd;
    int32_t (*func)(void);
};

static int32_t PlatformDumperTestAdd(const char *name, enum PlatformDumperDataType type, void *paddr)
{
    int32_t ret;
    struct PlatformDumperData data;
    if (memset_s(&data, sizeof(struct PlatformDumperData), 0, sizeof(struct PlatformDumperData)) != EOK) {
        HDF_LOGE("PlatformDumperTestAddUint8 memset_s fail");
        return HDF_FAILURE;
    }

    data.name = name;
    data.type = type;
    data.paddr = paddr;
    ret = PlatformDumperAddData(g_dumperTest, &data);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddUint8 add data fail");
        return HDF_FAILURE;
    }

    ret = PlatformDumperDump(g_dumperTest);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddUint8 get info fail");
        return HDF_FAILURE;
    }

    return HDF_SUCCESS;
}

static uint8_t g_uint8_test = 80;
static uint16_t g_uint16_test = 1600;
static uint32_t g_uint32_test = 3200;
static uint64_t g_uint64_test = 6400;

static int8_t g_int8_test = 81;
static int16_t g_int16_test = 1601;
static int32_t g_int32_test = 3201;
static int64_t g_int64_test = 6401;

static float g_floatTest = 3.13;
static double g_doubleTest = 3.1314;
static char g_charTest = 'a';
static char *g_stringTest = "abcdefg";
static volatile unsigned char *g_registerLTest = NULL;
static volatile unsigned char *g_registerWTest = NULL;
static volatile unsigned char *g_registerBTest = NULL;

static struct PlatformDumperData g_datas[] = {
    {"arrayDumperTestUint8",  PLATFORM_DUMPER_UINT8,  &g_uint8_test },
    {"arrayDumperTestUint16", PLATFORM_DUMPER_UINT16, &g_uint16_test},
    {"arrayDumperTestUint32", PLATFORM_DUMPER_UINT32, &g_uint32_test},
    {"arrayDumperTestUint64", PLATFORM_DUMPER_UINT64, &g_uint64_test},
    {"arrayDumperTestint64",  PLATFORM_DUMPER_INT64,  &g_int64_test },
    {"arrayDumperTestchar",   PLATFORM_DUMPER_CHAR,   &g_charTest  }
};

static int32_t PlatformDumperTestAddatas(void)
{
    int32_t ret;
    ret = PlatformDumperAddDatas(g_dumperTest, g_datas, sizeof(g_datas) / sizeof(g_datas[0]));
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddatas add data fail");
        return HDF_FAILURE;
    }

    HDF_LOGD("PlatformDumperTestAddatas: add data ok, then print");

    ret = PlatformDumperDump(g_dumperTest);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddatas dumper info fail");
        return HDF_FAILURE;
    }

    return HDF_SUCCESS;
}

static int32_t PlatformDumperTestAddUint8(void)
{
    int32_t ret;
    ret = PlatformDumperTestAdd("dumperTestUint8", PLATFORM_DUMPER_UINT8, &g_uint8_test);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddUint8 add data fail");
        return HDF_FAILURE;
    }

    return HDF_SUCCESS;
}

static int32_t PlatformDumperTestAddUint16(void)
{
    int32_t ret;
    ret = PlatformDumperTestAdd("dumperTestUint16", PLATFORM_DUMPER_UINT16, &g_uint16_test);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddUint16 add data fail");
        return HDF_FAILURE;
    }

    return HDF_SUCCESS;
}

static int32_t PlatformDumperTestAddUint32(void)
{
    int32_t ret;
    ret = PlatformDumperTestAdd("dumperTestUint32", PLATFORM_DUMPER_UINT32, &g_uint32_test);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddUint32 add data fail");
        return HDF_FAILURE;
    }

    return HDF_SUCCESS;
}

static int32_t PlatformDumperTestAddUint64(void)
{
    int32_t ret;
    ret = PlatformDumperTestAdd("dumperTestUint64", PLATFORM_DUMPER_UINT64, &g_uint64_test);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddUint64 add data fail");
        return HDF_FAILURE;
    }

    return HDF_SUCCESS;
}

static int32_t PlatformDumperTestAddInt8(void)
{
    int32_t ret;
    ret = PlatformDumperTestAdd("dumperTestInt8", PLATFORM_DUMPER_INT8, &g_int8_test);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddInt8 add data fail");
        return HDF_FAILURE;
    }

    return HDF_SUCCESS;
}

static int32_t PlatformDumperTestAddInt16(void)
{
    int32_t ret;
    ret = PlatformDumperTestAdd("dumperTestInt16", PLATFORM_DUMPER_INT16, &g_int16_test);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddInt16 add data fail");
        return HDF_FAILURE;
    }

    return HDF_SUCCESS;
}

static int32_t PlatformDumperTestAddInt32(void)
{
    int32_t ret;
    ret = PlatformDumperTestAdd("dumperTestInt32", PLATFORM_DUMPER_INT32, &g_int32_test);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddInt32 add data fail");
        return HDF_FAILURE;
    }

    return HDF_SUCCESS;
}

static int32_t PlatformDumperTestAddInt64(void)
{
    int32_t ret;
    ret = PlatformDumperTestAdd("dumperTestInt64", PLATFORM_DUMPER_INT64, &g_int64_test);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddInt64 add data fail");
        return HDF_FAILURE;
    }

    return HDF_SUCCESS;
}

static int32_t PlatformDumperTestAddFloat(void)
{
    int32_t ret;
    ret = PlatformDumperTestAdd("dumperTestFloat", PLATFORM_DUMPER_FLOAT, &g_floatTest);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddFloat add data fail");
        return HDF_FAILURE;
    }

    return HDF_SUCCESS;
}

static int32_t PlatformDumperTestAddDouble(void)
{
    int32_t ret;
    ret = PlatformDumperTestAdd("dumperTestDouble", PLATFORM_DUMPER_DOUBLE, &g_doubleTest);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddDouble add data fail");
        return HDF_FAILURE;
    }

    return HDF_SUCCESS;
}

static int32_t PlatformDumperTestAddChar(void)
{
    int32_t ret;
    ret = PlatformDumperTestAdd("dumperTestChar", PLATFORM_DUMPER_CHAR, &g_charTest);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddChar add data fail");
        return HDF_FAILURE;
    }

    return HDF_SUCCESS;
}

static int32_t PlatformDumperTestAddString(void)
{
    int32_t ret;
    ret = PlatformDumperTestAdd("dumperTestString", PLATFORM_DUMPER_STRING, g_stringTest);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddString add data fail");
        return HDF_FAILURE;
    }

    return HDF_SUCCESS;
}

#define TIMER0_VALUE 0x12000004
#define GPIO0_VALUE  0x120d0400
#define ADC_VALUE    0x120e0024
static int32_t PlatformDumperTestAddRegister(void)
{
    int32_t ret;
    if (g_registerLTest == NULL) {
        g_registerLTest = OsalIoRemap(TIMER0_VALUE, 0x1000);
    }
    if (g_registerWTest == NULL) {
        g_registerWTest = OsalIoRemap(GPIO0_VALUE, 0x1000);
    }
    if (g_registerBTest == NULL) {
        g_registerBTest = OsalIoRemap(ADC_VALUE, 0x1000);
    }
    ret = PlatformDumperTestAdd("dumperTestRegisterL", PLATFORM_DUMPER_REGISTERL, (void *)g_registerLTest);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddRegister add registerL data fail");
        return HDF_FAILURE;
    }
    ret = PlatformDumperTestAdd("dumperTestRegisterW", PLATFORM_DUMPER_REGISTERW, (void *)g_registerWTest);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddRegister add registerW data fail");
        return HDF_FAILURE;
    }
    ret = PlatformDumperTestAdd("dumperTestRegisterB", PLATFORM_DUMPER_REGISTERB, (void *)g_registerBTest);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddRegister add registerB data fail");
        return HDF_FAILURE;
    }

    return HDF_SUCCESS;
}

static void TestDumperCfgInfo(void)
{
#ifdef __LITEOS__
    dprintf("TestDumperCfgInfo\r\n");
#else
    printk("TestDumperCfgInfo\r\n");
#endif
}

static void TestDumperStatusInfo(void)
{
#ifdef __LITEOS__
    dprintf("TestDumperStatusInfo\r\n");
#else
    printk("TestDumperStatusInfo\r\n");
#endif
}

static void TestDumperStatisInfo(void)
{
#ifdef __LITEOS__
    dprintf("TestDumperStatisInfo\r\n");
#else
    printk("TestDumperStatisInfo\r\n");
#endif
}

static void TestDumperRegisterInfo(void)
{
#ifdef __LITEOS__
    dprintf("TestDumperRegisterInfo\r\n");
#else
    printk("TestDumperRegisterInfo\r\n");
#endif
}

struct PlatformDumperMethod g_ops;
static int32_t PlatformDumperTestSetOps(void)
{
    int32_t ret;
    g_ops.dumperCfgInfo = TestDumperCfgInfo;
    g_ops.dumperStatusInfo = TestDumperStatusInfo;
    g_ops.dumperStatisInfo = TestDumperStatisInfo;
    g_ops.dumperRegisterInfo = TestDumperRegisterInfo;
    ret = PlatformDumperSetMethod(g_dumperTest, &g_ops);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestAddRegister add data fail");
        return HDF_FAILURE;
    }

    return HDF_SUCCESS;
}

static int PlatformDumperTestThreadFunc(void *param)
{
    PlatformDumperTestAddUint8();
    *((int32_t *)param) = 1;
    return HDF_SUCCESS;
}

static int32_t PlatformDumperTestStartThread(struct OsalThread *thread1, struct OsalThread *thread2,
    const int32_t *count1, const int32_t *count2)
{
    int32_t ret;
    uint32_t time = 0;
    struct OsalThreadParam cfg1;
    struct OsalThreadParam cfg2;

    if (memset_s(&cfg1, sizeof(cfg1), 0, sizeof(cfg1)) != EOK ||
        memset_s(&cfg2, sizeof(cfg2), 0, sizeof(cfg2)) != EOK) {
        HDF_LOGE("%s:memset_s fail.", __func__);
        return HDF_ERR_IO;
    }
    cfg1.name = "DumperTestThread-1";
    cfg2.name = "DumperTestThread-2";
    cfg1.priority = cfg2.priority = OSAL_THREAD_PRI_DEFAULT;
    cfg1.stackSize = cfg2.stackSize = PLAT_DUMPER_TEST_STACK_SIZE;

    ret = OsalThreadStart(thread1, &cfg1);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("start test thread1 fail:%d", ret);
        return ret;
    }

    ret = OsalThreadStart(thread2, &cfg2);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("start test thread2 fail:%d", ret);
    }

    while (*count1 == 0 || *count2 == 0) {
        HDF_LOGV("waitting testing dumper thread finish...");
        OsalMSleep(PLAT_DUMPER_TEST_WAIT_TIMES);
        time++;
        if (time > PLAT_DUMPER_TEST_WAIT_TIMEOUT) {
            break;
        }
    }
    return ret;
}

static int32_t PlatformDumperTestMultiThread(void)
{
    int32_t ret;
    struct OsalThread thread1;
    struct OsalThread thread2;
    int32_t count1 = 0;
    int32_t count2 = 0;

    ret = OsalThreadCreate(&thread1, (OsalThreadEntry)PlatformDumperTestThreadFunc, (void *)&count1);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("create test thread1 fail:%d", ret);
        return ret;
    }

    ret = OsalThreadCreate(&thread2, (OsalThreadEntry)PlatformDumperTestThreadFunc, (void *)&count2);
    if (ret != HDF_SUCCESS) {
        (void)OsalThreadDestroy(&thread1);
        HDF_LOGE("create test thread2 fail:%d", ret);
        return ret;
    }

    ret = PlatformDumperTestStartThread(&thread1, &thread2, &count1, &count2);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("test start thread fail:%d", ret);
    }
  
    (void)OsalThreadDestroy(&thread1);
    (void)OsalThreadDestroy(&thread2);
    return ret;
}

static int32_t PlatformDumperTestDelData(void)
{
    int32_t ret;
    ret = PlatformDumperDelData(g_dumperTest, "dumperTestUint8", PLATFORM_DUMPER_UINT8);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestDelData PlatformDumperDelData fail");
        return HDF_FAILURE;
    }

    ret = PlatformDumperDelData(g_dumperTest, "dumperTestUint8", PLATFORM_DUMPER_UINT8);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestDelData PlatformDumperDelData fail");
        return HDF_FAILURE;
    }
    PlatformDumperDump(g_dumperTest);

    ret = PlatformDumperClearDatas(g_dumperTest);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("PlatformDumperTestDelData PlatformDumperClearDatas fail");
        return HDF_FAILURE;
    }
    PlatformDumperDump(g_dumperTest);

    return HDF_SUCCESS;
}

static int32_t PlatformDumperTestReliability(void)
{
    PlatformDumperAddData(g_dumperTest, NULL);
    PlatformDumperAddData(NULL, NULL);
    PlatformDumperDump(NULL);

    return HDF_SUCCESS;
}

static struct PlatformDumperTestEntry g_entry[] = {
    {PLAT_DUMPER_TEST_ADD_UINT8,      PlatformDumperTestAddUint8   },
    {PLAT_DUMPER_TEST_ADD_UINT16,     PlatformDumperTestAddUint16  },
    {PLAT_DUMPER_TEST_ADD_UINT32,     PlatformDumperTestAddUint32  },
    {PLAT_DUMPER_TEST_ADD_UINT64,     PlatformDumperTestAddUint64  },
    {PLAT_DUMPER_TEST_ADD_INT8,       PlatformDumperTestAddInt8    },
    {PLAT_DUMPER_TEST_ADD_INT16,      PlatformDumperTestAddInt16   },
    {PLAT_DUMPER_TEST_ADD_INT32,      PlatformDumperTestAddInt32   },
    {PLAT_DUMPER_TEST_ADD_INT64,      PlatformDumperTestAddInt64   },
    {PLAT_DUMPER_TEST_ADD_FLOAT,      PlatformDumperTestAddFloat   },
    {PLAT_DUMPER_TEST_ADD_DOUBLE,     PlatformDumperTestAddDouble  },
    {PLAT_DUMPER_TEST_ADD_CHAR,       PlatformDumperTestAddChar    },
    {PLAT_DUMPER_TEST_ADD_STRING,     PlatformDumperTestAddString  },
    {PLAT_DUMPER_TEST_ADD_REGISTER,   PlatformDumperTestAddRegister},
    {PLAT_DUMPER_TEST_ADD_ARRAY_DATA, PlatformDumperTestAddatas    },
    {PLAT_DUMPER_TEST_SET_OPS,        PlatformDumperTestSetOps     },
    {PLAT_DUMPER_TEST_MULTI_THREAD,   PlatformDumperTestMultiThread},
    {PLAT_DUMPER_TEST_DEL_DATA,       PlatformDumperTestDelData    },
    {PLAT_DUMPER_TEST_RELIABILITY,    PlatformDumperTestReliability},
};

static void PlatformDumperTestClear(void)
{
    PlatformDumperDestroy(g_dumperTest);
    g_dumperTest = NULL;
    if (g_registerLTest != NULL) {
        OsalIoUnmap((void *)g_registerLTest);
        g_registerLTest = NULL;
    }
    if (g_registerWTest != NULL) {
        OsalIoUnmap((void *)g_registerWTest);
        g_registerWTest = NULL;
    }
    if (g_registerBTest != NULL) {
        OsalIoUnmap((void *)g_registerBTest);
        g_registerBTest = NULL;
    }
}

int PlatformDumperTestExecute(int cmd)
{
    uint32_t i;
    int32_t ret = HDF_ERR_NOT_SUPPORT;
    struct PlatformDumperTestEntry *entry = NULL;

    if (cmd > PLAT_DUMPER_TEST_CMD_MAX) {
        HDF_LOGE("PlatformDumperTestExecute: invalid cmd:%d", cmd);
        ret = HDF_ERR_NOT_SUPPORT;
        HDF_LOGE("[PlatformDumperTestExecute][======cmd:%d====ret:%d======]", cmd, ret);
        return ret;
    }

    if (g_dumperTest == NULL) {
        g_dumperTest = PlatformDumperCreate(g_dumperTestName);
        if (g_dumperTest == NULL) {
            HDF_LOGE("PlatformDumperTestExecute: PlatformDumperCreate failed");
            return HDF_FAILURE;
        }
    }

    for (i = 0; i < sizeof(g_entry) / sizeof(g_entry[0]); i++) {
        if (g_entry[i].cmd != cmd || g_entry[i].func == NULL) {
            continue;
        }
        entry = &g_entry[i];
        break;
    }

    if (entry == NULL) {
        HDF_LOGE("%s: no entry matched, cmd = %d", __func__, cmd);
        return HDF_ERR_NOT_SUPPORT;
    }

    ret = entry->func();
    if (cmd == PLAT_DUMPER_TEST_RELIABILITY) {
        PlatformDumperTestClear();
    }
    HDF_LOGE("[PlatformDumperTestExecute][======cmd:%d====ret:%d======]", cmd, ret);
    return ret;
}
