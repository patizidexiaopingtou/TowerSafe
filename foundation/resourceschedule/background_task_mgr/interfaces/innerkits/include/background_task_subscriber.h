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

#ifndef FOUNDATION_RESOURCESCHEDULE_BACKGROUND_TASK_MGR_INTERFACES_INNERKITS_INCLUDE_BACKGROUND_TASK_SUBSCRIBER_H
#define FOUNDATION_RESOURCESCHEDULE_BACKGROUND_TASK_MGR_INTERFACES_INNERKITS_INCLUDE_BACKGROUND_TASK_SUBSCRIBER_H

#include <iremote_broker.h>

#include "ibackground_task_mgr.h"
#include "background_task_subscriber_stub.h"

namespace OHOS {
namespace BackgroundTaskMgr {
class BackgroundTaskSubscriber {
public:
    /**
     * Default constructor used to create a instance.
     */
    BackgroundTaskSubscriber();

    /**
     * Default destructor.
     */
    virtual ~BackgroundTaskSubscriber();

    /**
     * Called back when the subscriber is connected to Background Task Manager Service.
     */
    virtual void OnConnected();

    /**
     * Called back when the subscriber is disconnected from Background Task Manager Service.
     */
    virtual void OnDisconnected();

    /**
     * Called back when a transient task start.
     *
     * @param info Transient task app info.
     **/
    virtual void OnTransientTaskStart(const std::shared_ptr<TransientTaskAppInfo>& info);

    /**
     * Called back when a transient task end.
     *
     * @param info Transient task app info.
     **/
    virtual void OnTransientTaskEnd(const std::shared_ptr<TransientTaskAppInfo>& info);

    /**
     * Called back when the app has transient task.
     *
     * @param info App info of transient task.
     **/
    virtual void OnAppTransientTaskStart(const std::shared_ptr<TransientTaskAppInfo>& info);

    /**
     * Called back when the app does not have transient task.
     *
     * @param info App info transient task .
     **/
    virtual void OnAppTransientTaskEnd(const std::shared_ptr<TransientTaskAppInfo>& info);

    /**
     * Called back when a continuous task start.
     *
     * @param info Transient task app info.
     **/
    virtual void OnContinuousTaskStart(const std::shared_ptr<ContinuousTaskCallbackInfo> &continuousTaskCallbackInfo);

    /**
     * Called back when a continuous task end.
     *
     * @param info Transient task app info.
     **/
    virtual void OnContinuousTaskStop(const std::shared_ptr<ContinuousTaskCallbackInfo> &continuousTaskCallbackInfo);

    /**
     * Called back when the app does not have continuous task.
     *
     * @param uid App uid.
     **/
    virtual void OnAppContinuousTaskStop(int32_t uid);

    /**
     * Called back when the Background Task Manager Service has died.
     */
    virtual void OnRemoteDied(const wptr<IRemoteObject> &object);

    /**
     * @brief Apply or unapply efficiency resources of App.
     *
     * @param resourceInfo Request params.
     */
    virtual void OnAppEfficiencyResourcesApply(const std::shared_ptr<ResourceCallbackInfo> &resourceInfo);

    /**
     * @brief Called back when the efficiency resources of App reset.
     *
     * @param resourceInfo Request params.
     */
    virtual void OnAppEfficiencyResourcesReset(const std::shared_ptr<ResourceCallbackInfo> &resourceInfo);

    /**
     * @brief Apply or unapply efficiency resources of process.
     *
     * @param resourceInfo Request params.
     */
    virtual void OnProcEfficiencyResourcesApply(const std::shared_ptr<ResourceCallbackInfo> &resourceInfo);

    /**
     * @brief Called back when the efficiency resources of process reset.
     *
     * @param resourceInfo Request params.
     */
    virtual void OnProcEfficiencyResourcesReset(const std::shared_ptr<ResourceCallbackInfo> &resourceInfo);

private:
    class BackgroundTaskSubscriberImpl final : public BackgroundTaskSubscriberStub {
    public:
        class DeathRecipient final : public IRemoteObject::DeathRecipient {
        public:
            explicit DeathRecipient(BackgroundTaskSubscriberImpl &subscriberImpl);

            ~DeathRecipient() override;

            /**
             * @brief Called back when remote object has died.
             *
             * @param object Obiect which has died.
             */
            void OnRemoteDied(const wptr<IRemoteObject> &object) override;

        private:
            BackgroundTaskSubscriberImpl &subscriberImpl_;
        };

    public:
        explicit BackgroundTaskSubscriberImpl(BackgroundTaskSubscriber &subscriber);
        ~BackgroundTaskSubscriberImpl() {}

        /**
         * @brief Called back when the subscriber is connected to Background Task Manager Service.
         */
        void OnConnected() override;

        /**
         * @brief Called back when the subscriber is disconnected from Background Task Manager Service.
         */
        void OnDisconnected() override;

        /**
         * @brief Called back when a transient task start.
         *
         * @param info Transient task app info.
         */
        void OnTransientTaskStart(const std::shared_ptr<TransientTaskAppInfo>& info) override;

        /**
         * Called back when the app has transient task.
         *
         * @param info App info of transient task.
         **/
        void OnAppTransientTaskStart(const std::shared_ptr<TransientTaskAppInfo>& info) override;

        /**
         * Called back when the app does not have transient task.
         *
         * @param info App info transient task .
         **/
        void OnAppTransientTaskEnd(const std::shared_ptr<TransientTaskAppInfo>& info) override;

        /**
         * @brief Called back when a transient task end.
         *
         * @param info Transient task app info.
         */
        void OnTransientTaskEnd(const std::shared_ptr<TransientTaskAppInfo>& info) override;

        /**
         * @brief Called back when a continuous task start.
         *
         * @param continuousTaskCallbackInfo Continuous task app info.
         */
        void OnContinuousTaskStart(
            const std::shared_ptr<ContinuousTaskCallbackInfo> &continuousTaskCallbackInfo) override;

        /**
         * @brief Called back when a continuous task stop.
         *
         * @param continuousTaskCallbackInfo Continuous task app info.
         */
        void OnContinuousTaskStop(
            const std::shared_ptr<ContinuousTaskCallbackInfo> &continuousTaskCallbackInfo) override;
        
        /**
         * Called back when the app does not have continuous task.
         *
         * @param uid App uid.
         */
        void OnAppContinuousTaskStop(int32_t uid) override;

        /**
         * @brief Get managed proxy of background tasks.
         *
         * @return True if success, else false.
         */
        bool GetBackgroundTaskMgrProxy();

        /**
         * @brief Apply or unapply efficiency resources of App.
         *
         * @param resourceInfo Request params.
         */
        void OnAppEfficiencyResourcesApply(const std::shared_ptr<ResourceCallbackInfo> &resourceInfo) override;

        /**
         * @brief Called back when the efficiency resources of App reset.
         *
         * @param resourceInfo Request params.
         */
        void OnAppEfficiencyResourcesReset(const std::shared_ptr<ResourceCallbackInfo> &resourceInfo) override;

        /**
         * @brief Apply or unapply efficiency resources of process.
         *
         * @param resourceInfo Request params.
         */
        void OnProcEfficiencyResourcesApply(const std::shared_ptr<ResourceCallbackInfo> &resourceInfo) override;

        /**
         * @brief Called back when the efficiency resources of process reset.
         *
         * @param resourceInfo Request params.
         */
        void OnProcEfficiencyResourcesReset(const std::shared_ptr<ResourceCallbackInfo> &resourceInfo) override;

    public:
        BackgroundTaskSubscriber &subscriber_;
        sptr<DeathRecipient> recipient_ {nullptr};
        sptr<IBackgroundTaskMgr> proxy_ {nullptr};
        std::mutex mutex_ {};
    };

private:
    const sptr<BackgroundTaskSubscriberImpl> GetImpl() const;

private:
    sptr<BackgroundTaskSubscriberImpl> impl_ {nullptr};

    friend class BackgroundTaskManager;
};
}  // namespace BackgroundTaskMgr
}  // namespace OHOS
#endif  // FOUNDATION_RESOURCESCHEDULE_BACKGROUND_TASK_MGR_INTERFACES_INNERKITS_INCLUDE_BACKGROUND_TASK_SUBSCRIBER_H