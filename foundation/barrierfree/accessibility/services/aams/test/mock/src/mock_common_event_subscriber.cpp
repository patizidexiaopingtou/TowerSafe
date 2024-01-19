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

#include "common_event_subscriber.h"

namespace OHOS {
namespace EventFwk {
CommonEventSubscriber::CommonEventSubscriber() : result_(nullptr)
{}

CommonEventSubscriber::CommonEventSubscriber(const CommonEventSubscribeInfo& subscribeInfo)
    : subscribeInfo_(subscribeInfo), result_(nullptr)
{
    (void)subscribeInfo;
}

CommonEventSubscriber::~CommonEventSubscriber()
{}

const CommonEventSubscribeInfo& CommonEventSubscriber::GetSubscribeInfo() const
{
    return subscribeInfo_;
}

bool CommonEventSubscriber::SetCode(const int& code)
{
    return result_->SetCode(code);
}

int CommonEventSubscriber::GetCode() const
{
    return result_->GetCode();
}

bool CommonEventSubscriber::SetData(const std::string& data)
{
    return result_->SetData(data);
}

std::string CommonEventSubscriber::GetData() const
{
    return result_->GetData();
}

bool CommonEventSubscriber::SetCodeAndData(const int& code, const std::string& data)
{
    return result_->SetCodeAndData(code, data);
}

bool CommonEventSubscriber::AbortCommonEvent()
{
    return result_->AbortCommonEvent();
}

bool CommonEventSubscriber::ClearAbortCommonEvent()
{
    return result_->ClearAbortCommonEvent();
}

bool CommonEventSubscriber::GetAbortCommonEvent() const
{
    return result_->GetAbortCommonEvent();
}

std::shared_ptr<AsyncCommonEventResult> CommonEventSubscriber::GoAsyncCommonEvent()
{
    std::shared_ptr<AsyncCommonEventResult> res = result_;
    result_ = nullptr;
    return res;
}

bool CommonEventSubscriber::IsOrderedCommonEvent() const
{
    return (result_ != nullptr) ? result_->IsOrderedCommonEvent() : false;
}

bool CommonEventSubscriber::IsStickyCommonEvent() const
{
    return (result_ != nullptr) ? result_->IsStickyCommonEvent() : false;
}

bool CommonEventSubscriber::SetAsyncCommonEventResult(const std::shared_ptr<AsyncCommonEventResult>& result)
{
    result_ = result;

    return true;
}

std::shared_ptr<AsyncCommonEventResult> CommonEventSubscriber::GetAsyncCommonEventResult()
{
    return result_;
}

bool CommonEventSubscriber::CheckSynchronous() const
{
    return true;
}
} // namespace EventFwk
} // namespace OHOS