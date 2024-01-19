/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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

#include "report_data_callback.h"
#include "sensors_errors.h"

namespace OHOS {
namespace Sensors {
using namespace OHOS::HiviewDFX;

namespace {
constexpr HiLogLabel LABEL = {LOG_CORE, SENSOR_LOG_DOMAIN, "ReportDataCallback"};
}  // namespace
ReportDataCallback::ReportDataCallback()
{
    eventsBuf_.circularBuf = new (std::nothrow) SensorEvent[CIRCULAR_BUF_LEN];
    CHKPL(eventsBuf_.circularBuf);
    eventsBuf_.readPos = 0;
    eventsBuf_.writePosition = 0;
    eventsBuf_.eventNum = 0;
}

ReportDataCallback::~ReportDataCallback()
{
    if (eventsBuf_.circularBuf != nullptr) {
        delete[] eventsBuf_.circularBuf;
        eventsBuf_.circularBuf = nullptr;
    }
    eventsBuf_.circularBuf = nullptr;
    eventsBuf_.readPos = 0;
    eventsBuf_.writePosition = 0;
    eventsBuf_.eventNum = 0;
}

int32_t ReportDataCallback::ReportEventCallback(SensorEvent* event, sptr<ReportDataCallback> cb)
{
    CHKPR(event, ERROR);
    if (cb == nullptr || cb->eventsBuf_.circularBuf == nullptr) {
        SEN_HILOGE("callback or circularBuf or event cannot be null");
        if (event->data != nullptr) {
            delete[] event->data;
            event->data = nullptr;
        }
        return ERROR;
    }
    int32_t leftSize = CIRCULAR_BUF_LEN - cb->eventsBuf_.eventNum;
    int32_t toEndLen = CIRCULAR_BUF_LEN - cb->eventsBuf_.writePosition;
    if (leftSize < 0 || toEndLen < 0) {
        SEN_HILOGE("Leftsize and toendlen cannot be less than zero");
        if (event->data != nullptr) {
            delete[] event->data;
            event->data = nullptr;
        }
        return ERROR;
    }
    if (toEndLen == 0) {
            cb->eventsBuf_.circularBuf[0] = *event;
            cb->eventsBuf_.writePosition = 1 - toEndLen;
    } else {
            cb->eventsBuf_.circularBuf[cb->eventsBuf_.writePosition] = *event;
            cb->eventsBuf_.writePosition += 1;
    }
    if (leftSize < 1) {
        cb->eventsBuf_.readPos = cb->eventsBuf_.writePosition;
    }
    cb->eventsBuf_.eventNum += 1;
    if (cb->eventsBuf_.eventNum >= CIRCULAR_BUF_LEN) {
        cb->eventsBuf_.eventNum = CIRCULAR_BUF_LEN;
    }
    if (cb->eventsBuf_.writePosition == CIRCULAR_BUF_LEN) {
        cb->eventsBuf_.writePosition = 0;
    }
    return ERR_OK;
}

CircularEventBuf &ReportDataCallback::GetEventData()
{
    return eventsBuf_;
}
}  // namespace Sensors
}  // namespace OHOS
