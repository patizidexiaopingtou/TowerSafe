/*
 * Copyright (c) 2020-2022 Huawei Device Co., Ltd.
 *
 * HDF is dual licensed: you can use it either under the terms of
 * the GPL, or the BSD license, at your option.
 * See the LICENSE file in the root of this repository for complete details.
 */

#include "hdf_platform_entry_test.h"

#include "can_test.h"
#include "hdf_log.h"
#include "platform_device_test.h"
#include "platform_dumper_test.h"
#include "platform_event_test.h"
#include "platform_manager_test.h"
#include "platform_queue_test.h"
#if defined(LOSCFG_DRIVERS_HDF_PLATFORM_TRACE) || defined(CONFIG_DRIVERS_HDF_PLATFORM_TRACE)
#include "platform_trace_test.h"
#endif

#define HDF_LOG_TAG hdf_platform_entry_test

int32_t HdfPlatformEventTestEntry(HdfTestMsg *msg)
{
    if (msg != NULL) {
        msg->result = PlatformEventTestExecute(msg->subCmd);
    }
    return HDF_SUCCESS;
}

int32_t HdfPlatformQueueTestEntry(HdfTestMsg *msg)
{
    if (msg != NULL) {
        msg->result = PlatformQueueTestExecute(msg->subCmd);
    }
    return HDF_SUCCESS;
}

int32_t HdfPlatformDeviceTestEntry(HdfTestMsg *msg)
{
    if (msg != NULL) {
        msg->result = PlatformDeviceTestExecute(msg->subCmd);
    }
    return HDF_SUCCESS;
}

int32_t HdfPlatformManagerTestEntry(HdfTestMsg *msg)
{
    if (msg != NULL) {
        msg->result = PlatformManagerTestExecute(msg->subCmd);
    }
    return HDF_SUCCESS;
}

// Platform DFX Modules
int32_t HdfPlatformDumperTestEntry(HdfTestMsg *msg)
{
    if (msg != NULL) {
#if defined(LOSCFG_DRIVERS_HDF_PLATFORM_DUMPER) || defined(CONFIG_DRIVERS_HDF_PLATFORM_DUMPER)
        msg->result = PlatformDumperTestExecute(msg->subCmd);
#endif
    }
    return HDF_SUCCESS;
}

#if defined(LOSCFG_DRIVERS_HDF_PLATFORM_TRACE) || defined(CONFIG_DRIVERS_HDF_PLATFORM_TRACE)
int32_t HdfPlatformTraceTestEntry(HdfTestMsg *msg)
{
    HDF_LOGD("HdfPlatformTraceTestEntry enter:");
    if (msg != NULL) {
        msg->result = PlatformTraceTestExecute(msg->subCmd);
    }
    return HDF_SUCCESS;
}
#endif

// Platform Bussiness Modules
int32_t HdfCanTestEntry(HdfTestMsg *msg)
{
    if (msg != NULL) {
#if defined(LOSCFG_DRIVERS_HDF_PLATFORM_CAN) || defined(CONFIG_DRIVERS_HDF_PLATFORM_CAN)
        msg->result = CanTestExecute(msg->subCmd);
#else
        msg->result = HDF_SUCCESS;
#endif
    }
    return HDF_SUCCESS;
}
