/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 *
 * HDF is dual licensed: you can use it either under the terms of
 * the GPL, or the BSD license, at your option.
 * See the LICENSE file in the root of this repository for complete details.
 */

#ifndef HDI_FUZZER_H
#define HDI_FUZZER_H

#include "iservstat_listener_hdi.h"

#define FUZZ_PROJECT_NAME "hdi_fuzzer"

namespace OHOS {
namespace HDI {
namespace ServiceManager {
namespace V1_0 {
class ServStatListenerFuzzer : public ServStatListenerStub {
public:
    virtual ~ServStatListenerFuzzer() {}

    void OnReceive(const ServiceStatus &status) override;
};
} // namespace V1_0
} // namespace ServiceManager
} // namespace HDI
} // namespace OHOS

#endif // HDI_FUZZER_H