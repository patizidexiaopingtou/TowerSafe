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

#include "engines/gfx/gfx_engine_manager.h"
#include "font/ui_font.h"
#include "font/ui_font_bitmap.h"
#include "font/ui_font_header.h"
#include "font/ui_font_vector.h"
#include "font/ui_line_break.h"
#include "font/ui_text_shaping.h"
#include "gfx_utils/color.h"
#include "gfx_utils/file.h"
#include "global.h"
#include "graphic_startup.h"
#include "input_device_manager.h"
#include "js_debugger_config.h"
#include "product_adapter.h"
#include "screen_device.h"

#include "AsyncWorkManager.h"
#include "CommandParser.h"
#include "CppTimerManager.h"
#include "FileSystem.h"
#include "LanguageManagerImpl.h"
#include "MouseInputImpl.h"
#include "MouseWheelImpl.h"
#include "PreviewerEngineLog.h"
#include "SharedData.h"
#include "TimerTaskHandler.h"
#include "TraceTool.h"
#include "VirtualScreenImpl.h"
#include "json.h"
#include "ui_text_language.h"

using namespace OHOS;
using namespace ACELite;
using namespace std;

static uint8_t g_fontPsramBaseAddr[MIN_FONT_PSRAM_LENGTH];
#if defined(LITEWEARABLE_SUPPORTED)
static uint8_t g_shapePsramBaseAddr[MIN_SHAPING_PSRAM_LENGTH];
#endif
static void InitSmartVisionFont(UIFont* font, const string fontPath)
{
    ProductAdapter::SetDefaultFontStyle("SourceHanSansSC-Regular.otf", JsAppImpl::FONT_SIZE_DEFAULT);
    BaseFont* currentFont = new UIFontVector();
    if (currentFont == nullptr) {
        FLOG("InitSmartVisionFont currentFont memory allocation failed");
        return;
    }
    font->SetFont(currentFont);
    font->SetPsramMemory(reinterpret_cast<uintptr_t>(g_fontPsramBaseAddr), MIN_FONT_PSRAM_LENGTH);
    int8_t ret = font->SetFontPath(fontPath.data(), BaseFont::DYNAMIC_FONT);
    if (ret != 0) {
        ELOG("The vector font path does not exist ! fontPath : %s", fontPath.data());
        FLOG("InitFontEngine SetFontPath failed. vector fontPath: %s", fontPath.data());
    }
    font->RegisterFontInfo("SourceHanSansSC-Regular.otf");
    font->RegisterFontInfo("HYQiHei-65S.otf");
    font->RegisterFontInfo("RobotoCondensed-Regular.ttf");
}

static void InitLiteWearable(UIFont* font, const string fontPath)
{
    ProductAdapter::SetDefaultFontStyle("HYQiHei-65S", JsAppImpl::FONT_SIZE_DEFAULT);
    BitmapFontInit();
    BaseFont* currentFont = new UIFontBitmap();
    if (currentFont == nullptr) {
        FLOG("InitLiteWearable currentFont memory allocation failed");
        return;
    }
    font->SetFont(currentFont);
    font->SetPsramMemory(reinterpret_cast<uintptr_t>(g_fontPsramBaseAddr), MIN_FONT_PSRAM_LENGTH);
    int8_t retDynamic = font->SetFontPath(string(fontPath + "font.bin").data(), BaseFont::DYNAMIC_FONT);
    int8_t retStatic = font->SetFontPath(string(fontPath + "glyphs.bin").data(), BaseFont::STATIC_FONT);
    if ((retDynamic != 0) || (retStatic != 0)) {
        ELOG("The bitmap font path does not exist ! bitmap fontPath : %s",
             string(fontPath + "font.bin").data());
        FLOG("InitFontEngine SetFontPath failed. bitmap fontPath: %s", string(fontPath + "font.bin").data());
    }
    if (SharedData<string>::GetData(SharedDataType::LANGUAGE) == "zh-CN") {
        font->SetCurrentLangId(LANGUAGE_CH);
    }
    if (SharedData<string>::GetData(SharedDataType::LANGUAGE) == "en-US") {
        font->SetCurrentLangId(LANGUAGE_GB);
    }
}

static void InitFontEngine()
{
    UIFont* font = UIFont::GetInstance();
    if (font == nullptr) {
        ELOG("InitFontEngine:font is nullptr");
        return;
    }
    std::string deviceType = CommandParser::GetInstance().GetDeviceType();
    std::string separator = FileSystem::GetSeparator();
    std::string fontPath = FileSystem::GetApplicationPath() + separator + ".." + separator + "config" + separator;
    if (deviceType == "smartVision") {
        InitSmartVisionFont(font, fontPath);
    }
    if (deviceType == "liteWearable") {
        InitLiteWearable(font, fontPath);
    }

#if defined(LITEWEARABLE_SUPPORTED)
    UITextShaping* pShaping = UITextShaping::GetInstance();
    int8_t ret = pShaping->SetPsramMemory(reinterpret_cast<uintptr_t>(g_shapePsramBaseAddr), MIN_SHAPING_PSRAM_LENGTH);
    if (ret != INVALID_RET_VALUE) {
        int32_t fp = 0;
        string fileName = fontPath + "line_cj.brk";
#ifdef _WIN32
        fp = open(fileName.c_str(), O_RDONLY | O_BINARY);
#else
        fp = open(fileName.c_str(), O_RDONLY);
#endif
        if (fp < 0) {
            ELOG("Open font path failed.");
            return;
        }
        uint32_t lineBrkSize = lseek(fp, 0, SEEK_END);
        lseek(fp, 0, SEEK_SET);
        UILineBreakEngine& lbEngine = UILineBreakEngine::GetInstance();
        lbEngine.SetRuleBinInfo(fp, 0, lineBrkSize);
        lbEngine.Init();
    }
#endif
}

static void InitHalScreen()
{
    InputDeviceManager::GetInstance()->Add(&MouseInputImpl::GetInstance());
    InputDeviceManager::GetInstance()->Add(&MouseWheelImpl::GetInstance());
}

JsAppImpl::JsAppImpl()
    : isInterrupt(false),
      taskHandleTimer(nullptr),
      deviceCheckTimer(nullptr),
      jsCheckTimer(nullptr),
      jsAbility(nullptr),
      jsThread(nullptr)
{
}

JsAppImpl::~JsAppImpl() {}

JsAppImpl& JsAppImpl::GetInstance()
{
    static JsAppImpl instance;
    return instance;
}

void JsAppImpl::Start()
{
    if (jsThread != nullptr) {
        delete jsThread;
        jsThread = nullptr;
    }

    isFinished = false;
    isInterrupt = false;
    jsThread = new thread(&JsAppImpl::ThreadCallBack, &JsAppImpl::GetInstance());
    if (jsThread == nullptr) {
        ELOG("JsApp::Start jsThread memory allocation failed");
    }
    jsThread->detach();
}

void JsAppImpl::Restart()
{
    Stop();
    Start();
}

void JsAppImpl::Interrupt()
{
    AsyncWorkManager::GetInstance().ClearAllAsyncWork();
    jsAbility->Hide();
    jsAbility->TransferToDestroy();
    jsAbility.reset();
    isFinished = true;
    isInterrupt = true;
    ILOG("JsAppImpl::ThreadCallBack finished");
}

void JsAppImpl::ThreadCallBack()
{
    OHOS::GraphicStartUp::Init();
    GLOBAL_ConfigLanguage(SharedData<string>::GetData(SharedDataType::LANGUAGE).data());
    InitHalScreen();
    InitFontEngine();
    VirtualScreenImpl::GetInstance().InitAll(pipeName, pipePort);
    StartJsApp();
    InitTimer();

    thread::id curThreadId = this_thread::get_id();
    SharedData<string>::AppendNotify(SharedDataType::LANGUAGE, TimerTaskHandler::CheckLanguageChanged, curThreadId);

    CppTimerManager& manager = CppTimerManager::GetTimerManager();
    while (!isInterrupt) {
        this_thread::sleep_for(chrono::milliseconds(1));
        manager.RunTimerTick();
    }
}

void JsAppImpl::InitTimer()
{
    taskHandleTimer = make_unique<CppTimer>(TimerTaskHandler::TaskHandle);
    if (taskHandleTimer == nullptr) {
        ELOG("JsApp::InitTimer taskHandleTimer memory allocation failed.");
        return;
    }
    CppTimerManager::GetTimerManager().AddCppTimer(*taskHandleTimer);
    taskHandleTimer->Start(TASK_HANDLE_TIMER_INTERVAL);

    deviceCheckTimer = make_unique<CppTimer>(TimerTaskHandler::CheckDevice);
    if (deviceCheckTimer == nullptr) {
        ELOG("JsApp::InitTimer deviceCheckTimer memory allocation failed.");
        return;
    }
    CppTimerManager::GetTimerManager().AddCppTimer(*deviceCheckTimer);
    deviceCheckTimer->Start(DEVICE_CHECK_TIMER_INTERVAL);

    jsCheckTimer = make_unique<CppTimer>(TimerTaskHandler::CheckJsRunning);
    if (jsCheckTimer == nullptr) {
        ELOG("JsApp::InitTimer jsCheckTimer memory allocation failed.");
        return;
    }
    CppTimerManager::GetTimerManager().AddCppTimer(*jsCheckTimer);
    jsCheckTimer->Start(JS_CHECK_TIMER_INTERVAL);
}

void JsAppImpl::StartJsApp()
{
    if (jsAbility != nullptr) {
        FLOG("JsApp::StartJsApp jsAbility is not null.");
        return;
    }

    jsAbility = make_unique<OHOS::ACELite::JSAbility>();
    if (jsAbility == nullptr) {
        FLOG("JsApp::StartJsApp jsAbility memory allocation failed");
        return;
    }

    DebuggerConfig config;
    config.startDebuggerServer = isDebug;
    ILOG("Launch JS APP.");
    ILOG("Debug Server Enable: %d", config.startDebuggerServer);
    config.snapshotMode = false;
    config.heapSize = jsHeapSize;
    if (isDebug && debugServerPort) {
        config.port = debugServerPort;
        config.startDebuggerServer = isDebug;
        config.snapshotMode = false;
        ILOG("Debug Server Port: %d", debugServerPort);
    }
    Debugger::GetInstance().ConfigEngineDebugger(config);
    ILOG("Launch Js app");
    TraceTool::GetInstance().HandleTrace("Launch Js app");
    if (urlPath.empty()) {
        jsAbility->Launch(jsAppPath.c_str(), bundleName.c_str(), 0);
        jsAbility->Show();
        ILOG("JsApp::StartJsApp launch finished.");
        return;
    }
    Json::Value val;
    val["uri"] = urlPath;
    string routerInfo = val.toStyledString();
    jsAbility->Launch(jsAppPath.c_str(), bundleName.c_str(), 0, routerInfo.data());
    jsAbility->Show();
    ILOG("JsApp::StartJsApp launch with single page mode finished.");
    isFinished = false;
}
