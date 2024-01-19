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

#include "account_observer.h"
#include "reclaim_priority_manager.h"
#include "memmgr_log.h"
#include "os_account_manager.h"

namespace OHOS {
namespace Memory {
namespace {
const std::string TAG = "AccountObserver";
}

AccountObserver::AccountObserver(const AccountSA::OsAccountSubscribeInfo &subscriberInfo)
    : AccountSA::OsAccountSubscriber(subscriberInfo)
{}

AccountObserver::~AccountObserver()
{}

void AccountObserver::OnAccountsChanged(const int &id)
{
    HILOGI("account changed=<%{public}d>", id);
    // notify reclaim priority manager
    AccountSA::OS_ACCOUNT_SWITCH_MOD switchMod = AccountSA::OsAccountManager::GetOsAccountSwitchMod();
    ReclaimPriorityManager::GetInstance().OsAccountChanged(id, switchMod);
}
} // namespace Memory
} // namespace OHOS
