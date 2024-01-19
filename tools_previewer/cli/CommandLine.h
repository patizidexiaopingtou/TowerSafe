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

#ifndef COMMANDLINE_H
#define COMMANDLINE_H

#include <json.h>

#include "LocalSocket.h"

class CommandLine {
public:
    enum class CommandType { SET = 0, GET, ACTION, INVALID };

    CommandLine(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    virtual ~CommandLine();
    void CheckAndRun();
    void SetCommandResult(const std::string& type, const Json::Value& resultContent);
    void SetResultToManager(const std::string& type, const Json::Value& resultContent, const std::string& messageType);
    void RunAndSendResultToManager();
    void SendResultToManager();
    void SendResult();
    virtual void RunSet() {}
    bool IsArgValid() const;
    uint8_t ToUint8(std::string str) const;
    void SetCommandName(std::string command);

protected:
    Json::Value args;
    const LocalSocket& cliSocket;
    Json::Value commandResult;
    Json::Value commandResultToManager;
    CommandType type;
    std::string commandName;
    const std::vector<std::string> liteSupportedLanguages = {"zh-CN", "en-US"};
    const std::vector<std::string> richSupportedLanguages = {
        "zh_CN", "zh_HK", "zh_TW", "en_US", "en_GB", "ar_AE", "bg_BG", "bo_CN", "cs_CZ", "da_DK",
        "de_DE", "el_GR", "en_PH", "es_ES", "es_LA", "fi_FI", "fr_FR", "he_IL", "hi_IN", "hu_HU",
        "id_ID", "it_IT", "ja_JP", "kk_KZ", "ms_MY", "nl_NL", "no_NO", "pl_PL", "pt_BR", "pt_PT",
        "ro_RO", "ru_RU", "sr_RS", "sv_SE", "th_TH", "tr_TR", "ug_CN", "uk_UA", "vi_VN"
    };
    const std::vector<std::string> LoadDocDevs = {"phone", "tablet", "wearable", "car", "tv"};
    const int maxWidth = 3000;
    const int minWidth = 50;
    const int maxDpi = 640;
    const int minDpi = 120;
    const int maxKeyVal = 2119;
    const int minKeyVal = 2000;
    const int maxActionVal = 2;
    const int minActionVal = 0;
    const int maxLoadDocWidth = 3000;
    const int minLoadDocWidth = 20;

    virtual bool IsSetArgValid() const
    {
        return true;
    }
    virtual bool IsGetArgValid() const
    {
        return true;
    }
    virtual bool IsActionArgValid() const
    {
        return true;
    }
    virtual void RunGet() {}
    virtual void RunAction() {}

    bool IsBoolType(std::string arg) const;
    bool IsIntType(std::string arg) const;
    bool IsOneDigitFloatType(std::string arg) const;

private:
    void Run();
};

class TouchPressCommand : public CommandLine {
public:
    TouchPressCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~TouchPressCommand() override {}

protected:
    void RunAction() override;
    bool IsActionArgValid() const override;
};

class TouchMoveCommand : public CommandLine {
public:
    TouchMoveCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~TouchMoveCommand() override {}

protected:
    void RunAction() override;
    bool IsActionArgValid() const override;
};

class TouchReleaseCommand : public CommandLine {
public:
    TouchReleaseCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~TouchReleaseCommand() override {}

protected:
    void RunAction() override;
};

class MouseWheelCommand : public CommandLine {
public:
    MouseWheelCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~MouseWheelCommand() override {}

protected:
    void RunAction() override;
    bool IsActionArgValid() const override;
};

class BackClickedCommand : public CommandLine {
public:
    BackClickedCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~BackClickedCommand() override {}

protected:
    void RunAction() override;
};

class RestartCommand : public CommandLine {
public:
    RestartCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~RestartCommand() override {}

protected:
    void RunAction() override;
};

class PowerCommand : public CommandLine {
public:
    PowerCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~PowerCommand() override {}
    void RunSet() override;

protected:
    void RunGet() override;
    bool IsSetArgValid() const override;
};

class VolumeCommand : public CommandLine {
public:
    VolumeCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~VolumeCommand() override {}
    void RunSet() override;

protected:
    void RunGet() override;
    bool IsSetArgValid() const override;
};

class BarometerCommand : public CommandLine {
public:
    BarometerCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~BarometerCommand() override {}
    void RunSet() override;

protected:
    void RunGet() override;
    bool IsSetArgValid() const override;
};

class ResolutionSwitchCommand : public CommandLine {
public:
    ResolutionSwitchCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~ResolutionSwitchCommand() override {}
    void RunSet() override;

protected:
    bool IsSetArgValid() const override;
    bool IsIntValValid(const Json::Value& args) const;
};

class OrientationCommand : public CommandLine {
public:
    OrientationCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~OrientationCommand() override {}
    void RunSet() override;

protected:
    bool IsSetArgValid() const override;
};

class ColorModeCommand : public CommandLine {
public:
    ColorModeCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~ColorModeCommand() override {}
    void RunSet() override;

protected:
    bool IsSetArgValid() const override;
};

class LanguageCommand : public CommandLine {
public:
    LanguageCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~LanguageCommand() override {}
    void RunSet() override;

protected:
    void RunGet() override;
    bool IsSetArgValid() const override;
};

class FontSelectCommand : public CommandLine {
public:
    FontSelectCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~FontSelectCommand() override {}
    void RunSet() override;

protected:
    bool IsSetArgValid() const override;
};

class MemoryRefreshCommand : public CommandLine {
public:
    MemoryRefreshCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~MemoryRefreshCommand() override {}
    void RunSet() override;

protected:
    bool IsSetArgValid() const override;
};

class LoadDocumentCommand : public CommandLine {
public:
    LoadDocumentCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~LoadDocumentCommand() override {}
    void RunSet() override;

protected:
    bool IsSetArgValid() const override;
    bool IsIntValValid(const Json::Value& previewParam) const;
    bool IsStrValVailid(const Json::Value& previewParam) const;
};

class ReloadRuntimePageCommand : public CommandLine {
public:
    ReloadRuntimePageCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~ReloadRuntimePageCommand() override {}
    void RunSet() override;

protected:
    bool IsSetArgValid() const override;
};

class CurrentRouterCommand : public CommandLine {
public:
    CurrentRouterCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~CurrentRouterCommand() override {}

protected:
    void RunGet() override;
};

class SupportedLanguagesCommand : public CommandLine {
public:
    SupportedLanguagesCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~SupportedLanguagesCommand() override {}

protected:
    void RunGet() override;
};

class LocationCommand : public CommandLine {
public:
    LocationCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~LocationCommand() override {}
    void RunSet() override;

protected:
    void RunGet() override;
    bool IsSetArgValid() const override;
};

class DistributedCommunicationsCommand : public CommandLine {
public:
    DistributedCommunicationsCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~DistributedCommunicationsCommand() override {}

protected:
    void RunAction() override;
    bool IsActionArgValid() const override;
    std::vector<char> StringToCharVector(std::string str) const;
};

class KeepScreenOnStateCommand : public CommandLine {
public:
    KeepScreenOnStateCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~KeepScreenOnStateCommand() override {}
    void RunSet() override;

protected:
    void RunGet() override;
    bool IsSetArgValid() const override;
};

class WearingStateCommand : public CommandLine {
public:
    WearingStateCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~WearingStateCommand() override {}
    void RunSet() override;

protected:
    void RunGet() override;
    bool IsSetArgValid() const override;
};

class BrightnessModeCommand : public CommandLine {
public:
    BrightnessModeCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~BrightnessModeCommand() override {}
    void RunSet() override;

protected:
    void RunGet() override;
    bool IsSetArgValid() const override;
};

class ChargeModeCommand : public CommandLine {
public:
    ChargeModeCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~ChargeModeCommand() override {}
    void RunSet() override;

protected:
    void RunGet() override;
    bool IsSetArgValid() const override;
};

class BrightnessCommand : public CommandLine {
public:
    BrightnessCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~BrightnessCommand() override {}
    void RunSet() override;

protected:
    void RunGet() override;
    bool IsSetArgValid() const override;
};

class HeartRateCommand : public CommandLine {
public:
    HeartRateCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~HeartRateCommand() override {}
    void RunSet() override;

protected:
    void RunGet() override;
    bool IsSetArgValid() const override;
};

class StepCountCommand : public CommandLine {
public:
    StepCountCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~StepCountCommand() override {}
    void RunSet() override;

protected:
    void RunGet() override;
    bool IsSetArgValid() const override;
};

class ExitCommand : public CommandLine {
public:
    ExitCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~ExitCommand() override {}

protected:
    void RunAction() override;
};

class InspectorJSONTree : public CommandLine {
public:
    InspectorJSONTree(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~InspectorJSONTree() override {}

protected:
    void RunAction() override;
};

class InspectorDefault : public CommandLine {
public:
    InspectorDefault(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~InspectorDefault() override {}

protected:
    void RunAction() override;
};

class DeviceTypeCommand : public CommandLine {
public:
    DeviceTypeCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~DeviceTypeCommand() override {}

protected:
    void RunSet() override;
};

class ResolutionCommand : public CommandLine {
public:
    ResolutionCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~ResolutionCommand() override {}

protected:
    void RunSet() override;
};

class FastPreviewMsgCommand : public CommandLine {
public:
    FastPreviewMsgCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~FastPreviewMsgCommand() override {}

protected:
    void RunGet() override;
};

class DropFrameCommand : public CommandLine {
public:
    DropFrameCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~DropFrameCommand() override {}
    void RunSet() override;

protected:
    bool IsSetArgValid() const override;
};

class KeyPressCommand : public CommandLine {
public:
    KeyPressCommand(CommandType commandType, const Json::Value& arg, const LocalSocket& socket);
    ~KeyPressCommand() override {}

protected:
    void RunAction() override;
    bool IsActionArgValid() const override;
    bool IsImeArgsValid() const;
    bool IsKeyArgsValid() const;
};
#endif // COMMANDLINE_H
