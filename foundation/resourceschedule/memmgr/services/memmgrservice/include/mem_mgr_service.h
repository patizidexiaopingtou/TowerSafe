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

#ifndef OHOS_MEMORY_MEMMGR_SERVICE_H
#define OHOS_MEMORY_MEMMGR_SERVICE_H

#include "mem_mgr_stub.h"
#include "single_instance.h"
#include "system_ability.h"

namespace OHOS {
namespace Memory {
class MemMgrService : public SystemAbility, public MemMgrStub {
    DECLARE_SYSTEM_ABILITY(MemMgrService);
    DECLARE_SINGLE_INSTANCE_BASE(MemMgrService);

public:
    MemMgrService();
    ~MemMgrService() = default;
    virtual int32_t GetBundlePriorityList(BundlePriorityList &bundlePrioList) override;
    virtual int32_t NotifyDistDevStatus(int32_t pid, int32_t uid, const std::string &name, bool connected) override;
    virtual void OnAddSystemAbility(int32_t systemAbilityId, const std::string& deviceId) override;
    virtual void OnRemoveSystemAbility(int32_t systemAbilityId, const std::string& deviceId) override;
    virtual int Dump(int fd, const std::vector<std::u16string> &args) override;

protected:
    void OnStart() override;
    void OnStop() override;

private:
    bool Init();
};
} // namespace Memory
} // namespace OHOS
#endif // OHOS_MEMORY_MEMMGR_SERVICE_H
