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

#ifndef FOUNDATION_RESOURCESCHEDULE_BACKGROUND_TASK_MGR_INTERFACES_INNERKITS_INCLUDE_EXPIRED_CALLBACK_H
#define FOUNDATION_RESOURCESCHEDULE_BACKGROUND_TASK_MGR_INTERFACES_INNERKITS_INCLUDE_EXPIRED_CALLBACK_H

#include <iremote_broker.h>

#include "expired_callback_stub.h"
#include "ibackground_task_mgr.h"

namespace OHOS {
namespace BackgroundTaskMgr {
class ExpiredCallback : public std::enable_shared_from_this<ExpiredCallback> {
public:
    /**
     * @brief Default constructor used to create a instance.
     */
    ExpiredCallback();

    /**
     * @brief Init something necessary.
     */
    void Init();

    /**
     * @brief Default destructor.
     */
    virtual ~ExpiredCallback();

    /**
     * @brief Callback when the transient task will be overtime.
     */
    virtual void OnExpired() = 0;

private:
    class ExpiredCallbackImpl final : public ExpiredCallbackStub {
    public:
        explicit ExpiredCallbackImpl(const std::shared_ptr<ExpiredCallback> &callback);
        ~ExpiredCallbackImpl() {}

        /**
         * @brief Notify the delayed transition to the suspended state times out.
         */
        void OnExpired() override;

    public:
        std::weak_ptr<ExpiredCallback> callback_;
    };

private:
    const sptr<ExpiredCallbackImpl> GetImpl() const;

private:
    sptr<ExpiredCallbackImpl> impl_ = nullptr;

    friend class BackgroundTaskManager;
};
}  // namespace BackgroundTaskMgr
}  // namespace OHOS
#endif  // FOUNDATION_RESOURCESCHEDULE_BACKGROUND_TASK_MGR_INTERFACES_INNERKITS_INCLUDE_EXPIRED_CALLBACK_H