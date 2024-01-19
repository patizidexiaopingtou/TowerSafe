/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

#ifndef JSAPPIMPL_H
#define JSAPPIMPL_H

#include <atomic>
#include <memory>
#include <thread>

#include "JsApp.h"
#include "ace_ability.h"
#include "ace_run_args.h"
#include "device_config.h"
#include "device_type.h"

class JsAppImpl : public JsApp {
public:
    JsAppImpl();
    ~JsAppImpl() {}
    JsAppImpl& operator=(const JsAppImpl&) = delete;
    JsAppImpl(const JsAppImpl&) = delete;

    static JsAppImpl& GetInstance();
    void Start() override;
    void Restart() override;
    void Interrupt() override;
    std::string GetJSONTree() override;
    std::string GetDefaultJSONTree() override;
    void OrientationChanged(std::string commandOrientation) override;
    void ResolutionChanged(int32_t changedOriginWidth, int32_t changedOriginHeight,
                           int32_t changedWidth, int32_t changedHeight, int32_t screenDensity) override;
    void SetArgsColorMode(const std::string& value) override;
    void SetArgsAceVersion(const std::string& value) override;
    void SetDeviceOrentation(const std::string& value);
    std::string GetOrientation() const override;
    std::string GetColorMode() const override;
    void ColorModeChanged(const std::string commandColorMode) override;
    void ReloadRuntimePage(const std::string currentPage) override;
    void SetScreenDensity(const std::string value) override;
    void SetConfigChanges(const std::string value) override;
    bool MemoryRefresh(const std::string memoryRefreshArgs) const override;
    void LoadDocument(const std::string, const std::string, const Json::Value) override;

protected:
    void SetJsAppArgs(OHOS::Ace::Platform::AceRunArgs& args);
    void RunJsApp();
    double watchScreenDensity = 320;  // Watch Screen Density
    double phoneScreenDensity = 480;  // Phone Screen Density
    double tvScreenDensity = 320;     // TV Screen Density
    double tabletScreenDensity = 400; // Tablet Screen Density
    double carScreenDensity = 320;    // Car Screen Density

private:
    void SetAssetPath(OHOS::Ace::Platform::AceRunArgs& args, const std::string) const;
    void SetProjectModel(OHOS::Ace::Platform::AceRunArgs& args) const;
    void SetPageProfile(OHOS::Ace::Platform::AceRunArgs& args, const std::string) const;
    void SetDeviceWidth(OHOS::Ace::Platform::AceRunArgs& args, const int32_t) const;
    void SetDeviceHeight(OHOS::Ace::Platform::AceRunArgs& args, const int32_t) const;
    void SetWindowTitle(OHOS::Ace::Platform::AceRunArgs& args, const std::string) const;
    void SetUrl(OHOS::Ace::Platform::AceRunArgs& args, const std::string) const;
    void SetConfigChanges(OHOS::Ace::Platform::AceRunArgs& args, const std::string) const;
    void SetColorMode(OHOS::Ace::Platform::AceRunArgs& args, const std::string) const;
    void SetOrientation(OHOS::Ace::Platform::AceRunArgs& args, const std::string) const;
    void SetAceVersionArgs(OHOS::Ace::Platform::AceRunArgs& args, const std::string) const;
    void SetLanguage(OHOS::Ace::Platform::AceRunArgs& args, const std::string) const;
    void SetRegion(OHOS::Ace::Platform::AceRunArgs& args, const std::string) const;
    void SetScript(OHOS::Ace::Platform::AceRunArgs& args, const std::string) const;
    void SetSystemResourcesPath(OHOS::Ace::Platform::AceRunArgs& args) const;
    void SetAppResourcesPath(OHOS::Ace::Platform::AceRunArgs& args, const std::string) const;
    void SetFormsEnabled(OHOS::Ace::Platform::AceRunArgs& args, bool formsEnabled) const;
    void SetContainerSdkPath(OHOS::Ace::Platform::AceRunArgs& args, const std::string) const;
    void SetOnRender(OHOS::Ace::Platform::AceRunArgs& args) const;
    void SetOnRouterChange(OHOS::Ace::Platform::AceRunArgs& args) const;
    void SetOnError(OHOS::Ace::Platform::AceRunArgs& args) const;
    void AssignValueForWidthAndHeight(const int32_t origWidth, const int32_t origHeight,
                                      const int32_t compWidth, const int32_t compHeight);
    void AdaptDeviceType(OHOS::Ace::Platform::AceRunArgs& args, const std::string,
                         const int32_t, double screenDendity = 0) const;
    void ParseSystemParams(OHOS::Ace::Platform::AceRunArgs& args, Json::Value paramObj);
    void SetSystemParams(OHOS::Ace::Platform::SystemParams& args, Json::Value paramObj);
    void SetDeviceScreenDensity(const int32_t screenDensity, const std::string type);
    std::string GetDeviceTypeName(const OHOS::Ace::DeviceType) const;
    const double BASE_SCREEN_DENSITY = 160; // Device Baseline Screen Density
    std::unique_ptr<OHOS::Ace::Platform::AceAbility> ability;
    std::atomic<bool> isStop;
    int32_t width = 0;
    int32_t height = 0;
    int32_t orignalWidth = 0;
    int32_t orignalHeight = 0;
    OHOS::Ace::Platform::AceRunArgs aceRunArgs;
};

#endif // JSAPPIMPL_H
