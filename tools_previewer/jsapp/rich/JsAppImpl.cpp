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

#include "JsAppImpl.h"

#include "CommandParser.h"
#include "FileSystem.h"
#include "JsonReader.h"
#include "PreviewerEngineLog.h"
#include "SharedData.h"
#include "TraceTool.h"
#include "VirtualScreenImpl.h"
#include "KeyInputImpl.h"

using namespace std;
using namespace OHOS::Ace;

JsAppImpl::JsAppImpl() : ability(nullptr), isStop(false) {}

JsAppImpl& JsAppImpl::GetInstance()
{
    static JsAppImpl instance;
    return instance;
}

void JsAppImpl::Start()
{
    VirtualScreenImpl::GetInstance().InitVirtualScreen();
    VirtualScreenImpl::GetInstance().InitAll(pipeName, pipePort);
    isFinished = false;
    while (!isStop) {
        ILOG("Start run js app");
        RunJsApp();
        ILOG("Js app run finished");
    }
    isFinished = true;
}

void JsAppImpl::Restart()
{
    Platform::AceAbility::Stop();
}

std::string JsAppImpl::GetJSONTree()
{
    std::string jsongTree = ability->GetJSONTree();
    Json::Value jsonData = JsonReader::ParseJsonData(jsongTree);
    Json::StreamWriterBuilder builder;
    builder["indentation"] = "";
    builder["emitUTF8"] = true;
    return Json::writeString(builder, jsonData);
}

std::string JsAppImpl::GetDefaultJSONTree()
{
    ILOG("Start getDefaultJsontree.");
    std::string jsongTree = ability->GetDefaultJSONTree();
    Json::Value jsonData = JsonReader::ParseJsonData(jsongTree);
    ILOG("GetDefaultJsontree finished.");
    Json::StreamWriterBuilder builder;
    builder["indentation"] = "";
    builder["emitUTF8"] = true;
    return Json::writeString(builder, jsonData);
}

void JsAppImpl::OrientationChanged(std::string commandOrientation)
{
    aceRunArgs.deviceWidth = height;
    aceRunArgs.deviceHeight = width;
    VirtualScreenImpl::GetInstance().WidthAndHeightReverse();
    AdaptDeviceType(aceRunArgs, CommandParser::GetInstance().GetDeviceType(),
                    VirtualScreenImpl::GetInstance().GetOrignalWidth());
    AssignValueForWidthAndHeight(VirtualScreenImpl::GetInstance().GetOrignalWidth(),
                                 VirtualScreenImpl::GetInstance().GetOrignalHeight(),
                                 VirtualScreenImpl::GetInstance().GetCompressionWidth(),
                                 VirtualScreenImpl::GetInstance().GetCompressionHeight());
    if (commandOrientation == "portrait") {
        aceRunArgs.deviceConfig.orientation = DeviceOrientation::PORTRAIT;
    } else {
        aceRunArgs.deviceConfig.orientation = DeviceOrientation::LANDSCAPE;
    }

    orientation = commandOrientation;
    ILOG("OrientationChanged: %s %d %d %f", orientation.c_str(), aceRunArgs.deviceWidth,
         aceRunArgs.deviceHeight, aceRunArgs.deviceConfig.density);
    if (ability != nullptr) {
        ability->SurfaceChanged(aceRunArgs.deviceConfig.orientation, aceRunArgs.deviceConfig.density,
                                aceRunArgs.deviceWidth, aceRunArgs.deviceHeight);
    }
}

void JsAppImpl::ColorModeChanged(const std::string commandColorMode)
{
    if (commandColorMode == "light") {
        aceRunArgs.deviceConfig.colorMode = ColorMode::LIGHT;
    } else {
        aceRunArgs.deviceConfig.colorMode = ColorMode::DARK;
    }

    if (ability != nullptr) {
        ability->OnConfigurationChanged(aceRunArgs.deviceConfig);
    }
}

void JsAppImpl::Interrupt()
{
    isStop = true;
    Platform::AceAbility::Stop();
}

void JsAppImpl::SetJsAppArgs(OHOS::Ace::Platform::AceRunArgs& args)
{
    SetAssetPath(args, jsAppPath);
    SetProjectModel(args);
    SetPageProfile(args, CommandParser::GetInstance().GetPages());
    SetDeviceWidth(args, width);
    SetDeviceHeight(args, height);
    SetWindowTitle(args, "Ace");
    SetUrl(args, urlPath);
    SetConfigChanges(args, configChanges);
    SetColorMode(args, colorMode);
    SetOrientation(args, orientation);
    SetAceVersionArgs(args, aceVersion);
    SetDeviceScreenDensity(atoi(screenDensity.c_str()),
                           CommandParser::GetInstance().GetDeviceType());
    SetLanguage(args, SharedData<string>::GetData(SharedDataType::LAN));
    SetRegion(args, SharedData<string>::GetData(SharedDataType::REGION));
    SetScript(args, "");
    SetSystemResourcesPath(args);
    SetAppResourcesPath(args, CommandParser::GetInstance().GetAppResourcePath());
    SetFormsEnabled(args, CommandParser::GetInstance().IsCardDisplay());
    SetContainerSdkPath(args, CommandParser::GetInstance().GetContainerSdkPath());
    AdaptDeviceType(args, CommandParser::GetInstance().GetDeviceType(),
                    VirtualScreenImpl::GetInstance().GetOrignalWidth());
    SetOnRender(args);
    SetOnRouterChange(args);
    SetOnError(args);
    ILOG("start abilit: %d %d %f", args.deviceWidth, args.deviceHeight, args.deviceConfig.density);
}

void JsAppImpl::RunJsApp()
{
    KeyInputImpl::GetInstance().SetDelegate();
    AssignValueForWidthAndHeight(VirtualScreenImpl::GetInstance().GetOrignalWidth(),
                                 VirtualScreenImpl::GetInstance().GetOrignalHeight(),
                                 VirtualScreenImpl::GetInstance().GetCompressionWidth(),
                                 VirtualScreenImpl::GetInstance().GetCompressionHeight());
    SetJsAppArgs(aceRunArgs);
    if (ability != nullptr) {
        ability.reset();
    }
    ILOG("Launch Js App");
    TraceTool::GetInstance().HandleTrace("Launch Js App");
    ability = Platform::AceAbility::CreateInstance(aceRunArgs);
    if (ability == nullptr) {
        ELOG("JsApp::Run ability create failed.");
        return;
    }
    ability->InitEnv();
    ability->Start();
}

void JsAppImpl::AdaptDeviceType(Platform::AceRunArgs& args, const std::string type,
                                const int32_t realDeviceWidth, double screenDendity) const
{
    if (type == "wearable") {
        args.deviceConfig.deviceType = DeviceType::WATCH;
        double density = screenDendity > 0 ? screenDendity : watchScreenDensity;
        double adaptWidthWatch = realDeviceWidth * BASE_SCREEN_DENSITY / density;
        args.deviceConfig.density = args.deviceWidth / adaptWidthWatch;
        return;
    }
    if (type == "tv") {
        args.deviceConfig.deviceType = DeviceType::TV;
        double density = screenDendity > 0 ? screenDendity : tvScreenDensity;
        double adaptWidthTv = realDeviceWidth * BASE_SCREEN_DENSITY / density;
        args.deviceConfig.density = args.deviceWidth / adaptWidthTv;
        return;
    }
    if (type == "phone") {
        args.deviceConfig.deviceType = DeviceType::PHONE;
        double density = screenDendity > 0 ? screenDendity : phoneScreenDensity;
        double adaptWidthPhone = realDeviceWidth * BASE_SCREEN_DENSITY / density;
        args.deviceConfig.density = args.deviceWidth / adaptWidthPhone;
        return;
    }
    if (type == "tablet") {
        args.deviceConfig.deviceType = DeviceType::TABLET;
        double density = screenDendity > 0 ? screenDendity : tabletScreenDensity;
        double adaptWidthTablet = realDeviceWidth * BASE_SCREEN_DENSITY / density;
        args.deviceConfig.density = args.deviceWidth / adaptWidthTablet;
        return;
    }
    if (type == "car") {
        args.deviceConfig.deviceType = DeviceType::CAR;
        double density = screenDendity > 0 ? screenDendity : carScreenDensity;
        double adaptWidthCar = realDeviceWidth * BASE_SCREEN_DENSITY / density;
        args.deviceConfig.density = args.deviceWidth / adaptWidthCar;
        return;
    }
    ELOG("DeviceType not supported : %s", type.c_str());
    return;
}

void JsAppImpl::SetAssetPath(Platform::AceRunArgs& args, const std::string assetPath) const
{
    args.assetPath = assetPath;
}

void JsAppImpl::SetProjectModel(Platform::AceRunArgs& args) const
{
    int idxVal = CommandParser::GetInstance().GetProjectModelEnumValue();
    ILOG("ProjectModel: %s", CommandParser::GetInstance().GetProjectModelEnumName(idxVal).c_str());
    args.projectModel = Platform::ProjectModel(idxVal);
}

void JsAppImpl::SetPageProfile(Platform::AceRunArgs& args, const std::string pageProfile) const
{
    args.pageProfile = pageProfile;
}

void JsAppImpl::SetDeviceWidth(Platform::AceRunArgs& args, const int32_t deviceWidth) const
{
    args.deviceWidth = deviceWidth;
}

void JsAppImpl::SetDeviceHeight(Platform::AceRunArgs& args, const int32_t deviceHeight) const
{
    args.deviceHeight = deviceHeight;
}

void JsAppImpl::SetWindowTitle(Platform::AceRunArgs& args, const std::string windowTitle) const
{
    args.windowTitle = windowTitle;
}

void JsAppImpl::SetUrl(Platform::AceRunArgs& args, const std::string urlPath) const
{
    args.url = urlPath;
}

void JsAppImpl::SetConfigChanges(Platform::AceRunArgs& args, const std::string configChanges) const
{
    args.configChanges = configChanges;
}

void JsAppImpl::SetColorMode(Platform::AceRunArgs& args, const std::string colorMode) const
{
    ILOG("JsAppImpl::RunJsApp SetColorMode: %s", colorMode.c_str());
    if (colorMode == "dark") {
        args.deviceConfig.colorMode = ColorMode::DARK;
    } else {
        args.deviceConfig.colorMode = ColorMode::LIGHT;
    }
}

void JsAppImpl::SetOrientation(Platform::AceRunArgs& args, const std::string orientation) const
{
    ILOG("JsAppImpl::RunJsApp SetOrientation: %s", orientation.c_str());
    if (orientation == "landscape") {
        args.deviceConfig.orientation = DeviceOrientation::LANDSCAPE;
    } else {
        args.deviceConfig.orientation = DeviceOrientation::PORTRAIT;
    }
}

void JsAppImpl::SetAceVersionArgs(Platform::AceRunArgs& args, const std::string aceVersion) const
{
    ILOG("JsAppImpl::RunJsApp SetAceVersionArgs: %s", aceVersion.c_str());
    if (aceVersion == "ACE_2_0") {
        args.aceVersion = Platform::AceVersion::ACE_2_0;
    } else {
        args.aceVersion = Platform::AceVersion::ACE_1_0;
    }
}

void JsAppImpl::SetLanguage(Platform::AceRunArgs& args, const std::string language) const
{
    args.language = language;
}

void JsAppImpl::SetRegion(Platform::AceRunArgs& args, const std::string region) const
{
    args.region = region;
}

void JsAppImpl::SetScript(Platform::AceRunArgs& args, const std::string script) const
{
    args.script = script;
}

void JsAppImpl::SetSystemResourcesPath(Platform::AceRunArgs& args) const
{
    string sep = FileSystem::GetSeparator();
    string rPath = FileSystem::GetApplicationPath();
    int idx = rPath.find_last_of(sep);
    rPath = rPath.substr(0, idx + 1) + "resources";
    args.systemResourcesPath = rPath;
}

void JsAppImpl::SetAppResourcesPath(Platform::AceRunArgs& args, const std::string appResourcesPath) const
{
    args.appResourcesPath = appResourcesPath;
}

void JsAppImpl::SetFormsEnabled(Platform::AceRunArgs& args, bool formsEnabled) const
{
    args.formsEnabled = formsEnabled;
}

void JsAppImpl::SetContainerSdkPath(Platform::AceRunArgs& args, const std::string containerSdkPath) const
{
    args.containerSdkPath = containerSdkPath;
}

void JsAppImpl::SetOnRender(Platform::AceRunArgs& args) const
{
    args.onRender = std::move(VirtualScreenImpl::CallBack);
}

void JsAppImpl::SetOnRouterChange(Platform::AceRunArgs& args) const
{
    args.onRouterChange = std::move(VirtualScreenImpl::PageCallBack);
}

void JsAppImpl::SetOnError(Platform::AceRunArgs& args) const
{
    args.onError = std::move(VirtualScreenImpl::FastPreviewCallBack);
}

void JsAppImpl::AssignValueForWidthAndHeight(const int32_t origWidth,
                                             const int32_t origHeight,
                                             const int32_t compWidth,
                                             const int32_t compHeight)
{
    orignalWidth = origWidth;
    orignalHeight = origHeight;
    width = compWidth;
    height = compHeight;
    ILOG("AssignValueForWidthAndHeight: %d %d %d %d", orignalWidth, orignalHeight, width, height);
}

void JsAppImpl::ResolutionChanged(int32_t changedOriginWidth,
                                  int32_t changedOriginHeight,
                                  int32_t changedWidth,
                                  int32_t changedHeight,
                                  int32_t screenDensity)
{
    SetDeviceWidth(aceRunArgs, changedWidth);
    SetDeviceHeight(aceRunArgs, changedHeight);
    orignalWidth = changedOriginWidth;
    orignalHeight = changedOriginHeight;
    VirtualScreenImpl::GetInstance().SetVirtualScreenWidthAndHeight(changedOriginWidth, changedOriginHeight,
                                                                    changedWidth, changedHeight);
    SetDeviceScreenDensity(screenDensity,
                           CommandParser::GetInstance().GetDeviceType());
    AdaptDeviceType(aceRunArgs, CommandParser::GetInstance().GetDeviceType(),
                    VirtualScreenImpl::GetInstance().GetOrignalWidth());
    AssignValueForWidthAndHeight(VirtualScreenImpl::GetInstance().GetOrignalWidth(),
                                 VirtualScreenImpl::GetInstance().GetOrignalHeight(),
                                 VirtualScreenImpl::GetInstance().GetCompressionWidth(),
                                 VirtualScreenImpl::GetInstance().GetCompressionHeight());
    // Runtime change device orientation
    if (changedWidth <= changedHeight) {
        JsAppImpl::GetInstance().SetDeviceOrentation("portrait");
    } else {
        JsAppImpl::GetInstance().SetDeviceOrentation("landscape");
    }
    SetOrientation(aceRunArgs, orientation);

    ILOG("ResolutionChanged: %s %d %d %f", orientation.c_str(), aceRunArgs.deviceWidth,
         aceRunArgs.deviceHeight, aceRunArgs.deviceConfig.density);
    if (ability != nullptr) {
        ability->SurfaceChanged(aceRunArgs.deviceConfig.orientation, aceRunArgs.deviceConfig.density,
                                aceRunArgs.deviceWidth, aceRunArgs.deviceHeight);
    }
}

void JsAppImpl::SetArgsColorMode(const string& value)
{
    colorMode = value;
}

void JsAppImpl::SetArgsAceVersion(const string& value)
{
    aceVersion = value;
}

void JsAppImpl::SetDeviceOrentation(const string& value)
{
    orientation = value;
}

std::string JsAppImpl::GetOrientation() const
{
    return orientation;
}

std::string JsAppImpl::GetColorMode() const
{
    return colorMode;
}

void JsAppImpl::SetDeviceScreenDensity(const int32_t screenDensity, const std::string type)
{
    if (type == "wearable" && screenDensity != 0) {
        watchScreenDensity = screenDensity;
        return;
    }
    if (type == "tv" && screenDensity != 0) {
        tvScreenDensity = screenDensity;
        return;
    }
    if (type == "phone" && screenDensity != 0) {
        phoneScreenDensity = screenDensity;
        return;
    }
    if (type == "tablet" && screenDensity != 0) {
        tabletScreenDensity = screenDensity;
        return;
    }
    if (type == "car" && screenDensity != 0) {
        carScreenDensity = screenDensity;
        return;
    }
    ILOG("DeviceType not supported to SetDeviceScreenDensity: %s", type.c_str());
    return;
}

void JsAppImpl::ReloadRuntimePage(const std::string currentPage)
{
    std::string params = "";
    if (ability != nullptr) {
        ability->ReplacePage(currentPage, params);
    }
}

void JsAppImpl::SetScreenDensity(const std::string value)
{
    screenDensity = value;
}

void JsAppImpl::SetConfigChanges(const std::string value)
{
    configChanges = value;
}

bool JsAppImpl::MemoryRefresh(const std::string memoryRefreshArgs) const
{
    ILOG("MemoryRefresh.");
    if (ability != nullptr) {
        return ability->OperateComponent(memoryRefreshArgs);
    }
    return false;
}

void JsAppImpl::ParseSystemParams(OHOS::Ace::Platform::AceRunArgs& args, Json::Value paramObj)
{
    if (paramObj == Json::nullValue) {
        SetDeviceWidth(args, VirtualScreenImpl::GetInstance().GetCompressionWidth());
        SetDeviceHeight(args, VirtualScreenImpl::GetInstance().GetCompressionHeight());
        AssignValueForWidthAndHeight(args.deviceWidth, args.deviceHeight,
                                     args.deviceWidth, args.deviceHeight);
        SetColorMode(args, colorMode);
        SetOrientation(args, orientation);
        SetDeviceScreenDensity(atoi(screenDensity.c_str()),
                               CommandParser::GetInstance().GetDeviceType());
        AdaptDeviceType(args, CommandParser::GetInstance().GetDeviceType(),
                        VirtualScreenImpl::GetInstance().GetOrignalWidth());
        SetLanguage(args, SharedData<string>::GetData(SharedDataType::LAN));
        SetRegion(args, SharedData<string>::GetData(SharedDataType::REGION));
    } else {
        SetDeviceWidth(args, paramObj["width"].asInt());
        SetDeviceHeight(args, paramObj["height"].asInt());
        AssignValueForWidthAndHeight(args.deviceWidth, args.deviceHeight,
                                     args.deviceWidth, args.deviceHeight);
        SetColorMode(args, paramObj["colorMode"].asString());
        SetOrientation(args, paramObj["orientation"].asString());
        string deviceType = paramObj["deviceType"].asString();
        SetDeviceScreenDensity(atoi(screenDensity.c_str()), deviceType);
        AdaptDeviceType(args, deviceType, args.deviceWidth, paramObj["dpi"].asDouble());
        string lanInfo = paramObj["locale"].asString();
        SetLanguage(args, lanInfo.substr(0, lanInfo.find("_")));
        SetRegion(args, lanInfo.substr(lanInfo.find("_") + 1, lanInfo.length() - 1));
    }
}

void JsAppImpl::SetSystemParams(OHOS::Ace::Platform::SystemParams& params, Json::Value paramObj)
{
    ParseSystemParams(aceRunArgs, paramObj);
    params.deviceWidth = aceRunArgs.deviceWidth;
    params.deviceHeight = aceRunArgs.deviceHeight;
    params.language = aceRunArgs.language;
    params.region = aceRunArgs.region;
    params.colorMode = aceRunArgs.deviceConfig.colorMode;
    params.orientation = aceRunArgs.deviceConfig.orientation;
    params.deviceType = aceRunArgs.deviceConfig.deviceType;
    params.density = aceRunArgs.deviceConfig.density;
    params.isRound = (paramObj == Json::nullValue) ?
                     (CommandParser::GetInstance().GetScreenShape() == "circle") :
                     paramObj["roundScreen"].asBool();
}

void JsAppImpl::LoadDocument(const std::string filePath,
                             const std::string componentName,
                             Json::Value previewContext)
{
    ILOG("LoadDocument.");
    if (ability != nullptr) {
        OHOS::Ace::Platform::SystemParams params;
        SetSystemParams(params, previewContext);
        ILOG("LoadDocument params is density: %f region: %s language: %s deviceWidth: %d\
             deviceHeight: %d isRound:%d colorMode:%s orientation: %s deviceType: %s",
             params.density,
             params.region.c_str(),
             params.language.c_str(),
             params.deviceWidth,
             params.deviceHeight,
             (params.isRound ? "true" : "false"),
             ((params.colorMode == ColorMode::DARK) ? "dark" : "light"),
             ((params.orientation == DeviceOrientation::LANDSCAPE) ? "landscape" : "portrait"),
             GetDeviceTypeName(params.deviceType).c_str());
        ability->LoadDocument(filePath, componentName, params);
    }
}

string JsAppImpl::GetDeviceTypeName(const OHOS::Ace::DeviceType type) const
{
    switch (type) {
        case DeviceType::WATCH:
            return "watch";
        case DeviceType::TV:
            return "tv";
        case DeviceType::PHONE:
            return "phone";
        case DeviceType::TABLET:
            return "tablet";
        case DeviceType::CAR:
            return "car";
        default:
            return "";
    }
}