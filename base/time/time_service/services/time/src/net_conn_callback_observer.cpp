/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

#include "net_conn_callback_observer.h"
#include "ntp_update_time.h"
#include "time_common.h"

using namespace OHOS::NetManagerStandard;

namespace OHOS {
namespace MiscServices {
int32_t NetConnCallbackObserver::NetAvailable(sptr<NetHandle> &netHandle)
{
    return 0;
}

int32_t NetConnCallbackObserver::NetCapabilitiesChange(sptr<NetHandle> &netHandle,
                                                       const sptr<NetAllCapabilities> &netAllCap)
{
    TIME_HILOGD(TIME_MODULE_SERVICE, "Observe net capabilities change. start");
    if (netAllCap->netCaps_.count(NetCap::NET_CAPABILITY_INTERNET)) {
        TIME_HILOGD(TIME_MODULE_SERVICE, "Net Capability Internet");
        DelayedSingleton<NtpUpdateTime>::GetInstance()->SetSystemTime();
    }
    TIME_HILOGD(TIME_MODULE_SERVICE, "Observe net capabilities change. end");
    return 0;
}

int32_t NetConnCallbackObserver::NetConnectionPropertiesChange(sptr<NetHandle> &netHandle,
                                                               const sptr<NetLinkInfo> &info)
{
    return 0;
}

int32_t NetConnCallbackObserver::NetLost(sptr<NetHandle> &netHandle)
{
    return 0;
}

int32_t NetConnCallbackObserver::NetUnavailable()
{
    return 0;
}

int32_t NetConnCallbackObserver::NetBlockStatusChange(sptr<NetHandle> &netHandle, bool blocked)
{
    return 0;
}
} // namespace MiscServices
} // namespace OHOS
