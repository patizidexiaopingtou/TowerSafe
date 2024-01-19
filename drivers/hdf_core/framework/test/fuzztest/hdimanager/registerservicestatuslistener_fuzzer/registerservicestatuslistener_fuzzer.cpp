/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 *
 * HDF is dual licensed: you can use it either under the terms of
 * the GPL, or the BSD license, at your option.
 * See the LICENSE file in the root of this repository for complete details.
 */

#include "registerservicestatuslistener_fuzzer.h"
#include <cstddef>
#include <cstdint>
#include <hdf_base.h>
#include <hdi_base.h>
#include <iremote_broker.h>
#include <refbase.h>
#include "hdf_log.h"
#include "iservmgr_hdi.h"
#include "iservstat_listener_hdi.h"
#include "parcel.h"
#include "osal_time.h"

using namespace OHOS::HDI::ServiceManager::V1_0;

namespace OHOS {
namespace HDI {
namespace ServiceManager {
namespace V1_0 {
void RegisterServStatListenerFuzzer::OnReceive(const ServiceStatus &status)
{
    (void)status;
}
} // namespace V1_0
} // namespace ServiceManager
} // namespace HDI
} // namespace OHOS

namespace OHOS {
constexpr size_t THRESHOLD = 10;
constexpr size_t WAIT_THRESHOLD = 100;
sptr<IServiceManager> g_servManager = IServiceManager::Get();
sptr<IServStatListener> g_servStatListener = new RegisterServStatListenerFuzzer();

bool RegisterServiceStatusListenerFuzzTest(const uint8_t *data, size_t size)
{
    bool result = false;
    if (data == nullptr) {
        HDF_LOGE("%{public}s: data is nullptr!", __func__);
        return false;
    }

    Parcel parcel;
    parcel.WriteBuffer(data, size);
    auto deviceclass = parcel.ReadUint16();
    if (g_servManager != nullptr &&
        g_servManager->RegisterServiceStatusListener(g_servStatListener, deviceclass) == HDF_SUCCESS) {
        g_servManager->UnregisterServiceStatusListener(g_servStatListener);
        result = true;
    }

    OsalMSleep(WAIT_THRESHOLD);
    return result;
}
} // namespace OHOS

extern "C" int LLVMFuzzerTestOneInput(const uint8_t *data, size_t size)
{
    if (size < OHOS::THRESHOLD) {
        return HDF_SUCCESS;
    }

    OHOS::RegisterServiceStatusListenerFuzzTest(data, size);
    return HDF_SUCCESS;
}
