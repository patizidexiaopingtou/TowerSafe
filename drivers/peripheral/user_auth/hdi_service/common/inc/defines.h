/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#ifndef COMMON_DEFINES_H
#define COMMON_DEFINES_H

#include "stdint.h"

#ifdef __cplusplus
extern "C" {
#endif

enum InnerKitResultCode {
    INNER_RESULT_SUCCESS = 0,
    INNER_RESULT_FAIL = 1,
    INNER_RESULT_GENERAL_ERROR = 2,
    INNER_RESULT_CANCELED = 3,
    INNER_RESULT_TIMEOUT = 4,
    INNER_RESULT_TYPE_NOT_SUPPORT = 5,
    INNER_RESULT_TRUST_LEVEL_NOT_SUPPORT = 6,
    INNER_RESULT_BUSY = 7,
    INNER_RESULT_INVALID_PARAMETERS = 8,
    INNER_RESULT_LOCKED = 9,
    INNER_RESULT_NOT_ENROLLED = 10,
    INNER_RESULT_HARDWARE_NOT_SUPPORTED = 11,
    INNER_RESULT_SYSTEM_ERROR_CODE_BEGIN = 1000, // error code for system
    INNER_RESULT_IPC_ERROR = 1001,
    INNER_RESULT_INVALID_CONTEXT_ID = 1002,
    INNER_RESULT_READ_PARCEL_ERROR = 1003,
    INNER_RESULT_WRITE_PARCEL_ERROR = 1004,
    INNER_RESULT_CHECK_PERMISSION_FAILED = 1005,
    INNER_RESULT_INVALID_HDI_INTERFACE = 1006,
    INNER_RESULT_VENDOR_ERROR_CODE_BEGIN = 10000, // error code for vendor
};

typedef enum ResultCode {
    RESULT_SUCCESS = INNER_RESULT_SUCCESS,
    RESULT_GENERAL_ERROR = INNER_RESULT_GENERAL_ERROR,
    RESULT_BAD_PARAM = INNER_RESULT_INVALID_PARAMETERS,
    RESULT_NOT_ENROLLED = INNER_RESULT_NOT_ENROLLED,
    RESULT_TYPE_NOT_SUPPORT = INNER_RESULT_TYPE_NOT_SUPPORT,
    RESULT_BAD_COPY = INNER_RESULT_VENDOR_ERROR_CODE_BEGIN + 0x3,
    RESULT_NO_MEMORY = INNER_RESULT_VENDOR_ERROR_CODE_BEGIN + 0x4,
    RESULT_NEED_INIT = INNER_RESULT_VENDOR_ERROR_CODE_BEGIN + 0x5,
    RESULT_NOT_FOUND = INNER_RESULT_VENDOR_ERROR_CODE_BEGIN + 0x6,
    RESULT_REACH_LIMIT = INNER_RESULT_VENDOR_ERROR_CODE_BEGIN + 0x7,
    RESULT_DUPLICATE_CHECK_FAILED = INNER_RESULT_VENDOR_ERROR_CODE_BEGIN + 0x8,
    RESULT_BAD_READ = INNER_RESULT_VENDOR_ERROR_CODE_BEGIN + 0x9,
    RESULT_BAD_WRITE = INNER_RESULT_VENDOR_ERROR_CODE_BEGIN + 0xA,
    RESULT_BAD_DEL = INNER_RESULT_VENDOR_ERROR_CODE_BEGIN + 0xB,
    RESULT_UNKNOWN = INNER_RESULT_VENDOR_ERROR_CODE_BEGIN + 0xC,
    RESULT_BAD_MATCH = INNER_RESULT_VENDOR_ERROR_CODE_BEGIN + 0xD,
    RESULT_BAD_SIGN = INNER_RESULT_VENDOR_ERROR_CODE_BEGIN + 0xE,
    RESULT_BUSY = INNER_RESULT_BUSY,
    RESULT_TOKEN_TIMEOUT = INNER_RESULT_VENDOR_ERROR_CODE_BEGIN + 0x10,
    RESULT_VERIFY_TOKEN_FAIL = INNER_RESULT_VENDOR_ERROR_CODE_BEGIN + 0x11,
    RESULT_EXCEED_LIMIT = INNER_RESULT_VENDOR_ERROR_CODE_BEGIN + 0x12,
    RESULT_IDM_SESSION_TIMEOUT = INNER_RESULT_VENDOR_ERROR_CODE_BEGIN + 0x13,

    RESULT_AUTH_NOT_COMPELETED = INNER_RESULT_VENDOR_ERROR_CODE_BEGIN + 0x10001,
} ResultCode;

typedef enum AuthType {
    DEFAULT_AUTH_TYPE = 0,
    PIN_AUTH = 1,
    FACE_AUTH = 2,
    FINGER_AUTH = 4,
} AuthType;

typedef enum ScheduleMode {
    SCHEDULE_MODE_ENROLL = 0,
    SCHEDULE_MODE_AUTH = 1,
    SCHEDULE_MODE_IDENTIFY = 2,
} ScheduleMode;

typedef enum AuthSubType {
    DEFAULT_TYPE = 0,
} AuthSubType;

typedef struct TemplateIdArrays {
    uint64_t *value;
    uint32_t num;
} TemplateIdArrays;

typedef enum AuthPropertyMode {
    PROPERMODE_DELETE = 0,
    PROPERMODE_GET = 1,
    PROPERMODE_SET = 2,
    PROPERMODE_LOCK = 3,
    PROPERMODE_UNLOCK = 4,
    PROPERMODE_INIT_ALGORITHM = 5,
    PROPERMODE_RELEASE_ALGORITHM = 6,
    PROPERMODE_SET_SURFACE_ID = 100,
} AuthPropertyMode;

#define MAX_DUPLICATE_CHECK 100
#define INVALID_SENSOR_HINT 0
#define MAX_TEMPLATE_OF_SCHEDULE 10
#define CHALLENGE_LEN 32

#ifdef __cplusplus
}
#endif

#endif
