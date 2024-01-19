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

#include "object_collector.h"
#include <iremote_object.h>

#include "hdf_base.h"
#include "hdf_log.h"
#include "osal_time.h"

using namespace OHOS::HDI;

ObjectCollector *ObjectCollector::instance_ = new ObjectCollector();

ObjectCollector &ObjectCollector::GetInstance()
{
    return *instance_;
}

bool ObjectCollector::ConstructorRegister(const std::u16string &interfaceName, const Constructor &constructor)
{
    if (interfaceName.empty()) {
        return false;
    }
    std::lock_guard<std::mutex> lock(mutex_);
    constructorMapper_.emplace(interfaceName, std::move(constructor));
    return true;
}

void ObjectCollector::ConstructorUnRegister(const std::u16string &interfaceName)
{
    std::lock_guard<std::mutex> lock(mutex_);
    constructorMapper_.erase(interfaceName);
}

OHOS::sptr<OHOS::IRemoteObject> ObjectCollector::NewObjectLocked(
    const OHOS::sptr<HdiBase> &interface, const std::u16string &interfaceName)
{
    if (interface == nullptr) {
        return nullptr;
    }
    auto constructor = constructorMapper_.find(interfaceName);
    if (constructor != constructorMapper_.end()) {
        return constructor->second(interface);
    }

    return nullptr;
}

OHOS::sptr<OHOS::IRemoteObject> ObjectCollector::NewObject(
    const OHOS::sptr<HdiBase> &interface, const std::u16string &interfaceName)
{
    std::lock_guard<std::mutex> lock(mutex_);
    return NewObjectLocked(interface, interfaceName);
}

OHOS::sptr<OHOS::IRemoteObject> ObjectCollector::GetOrNewObject(
    const OHOS::sptr<HdiBase> &interface, const std::u16string &interfaceName)
{
    if (interface == nullptr) {
        return nullptr;
    }
    mutex_.lock();
RETRY:
    auto it = interfaceObjectCollector_.find(interface.GetRefPtr());
    if (it != interfaceObjectCollector_.end()) {
        if (it->second->GetSptrRefCount() == 0) {
            // may object is releasing, yield to sync
            mutex_.unlock();
            OsalMSleep(1);
            mutex_.lock();
            goto RETRY;
        }
        mutex_.unlock();
        return it->second;
    }
    sptr<IRemoteObject> object = NewObjectLocked(interface, interfaceName);
    interfaceObjectCollector_[interface.GetRefPtr()] = object.GetRefPtr();
    mutex_.unlock();
    return object;
}

bool ObjectCollector::RemoveObject(const OHOS::sptr<HdiBase> &interface)
{
    std::lock_guard<std::mutex> lock(mutex_);
    auto it = interfaceObjectCollector_.find(interface.GetRefPtr());
    if (it == interfaceObjectCollector_.end()) {
        return false;
    }
    interfaceObjectCollector_.erase(it);
    return true;
}
