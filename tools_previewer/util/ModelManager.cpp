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

#include "ModelManager.h"

#include "Interrupter.h"
#include "PreviewerEngineLog.h"

using namespace std;

vector<ModelConfig> ModelManager::configList = { // NOLINT
    {"liteWearable", "***", "***", "***", "***", 2},
    {"smartVision", "***", "***", "***", "***", 2},
};

string ModelManager::currentDevice;

string ModelManager::GetCurrentModel()
{
    return currentDevice;
}

string ModelManager::GetAllModelName()
{
    string allNames;
    for (ModelConfig const& config : configList) {
        allNames += string(config.modelName);
        allNames += " ";
    }
    return allNames;
}

void ModelManager::SetCurrentDevice(const string& value)
{
    currentDevice = value;
    ILOG("Start Simulator: %s", GetConfig().modelName.c_str());
}

/*
 * Get the model configuration based on the model name.
 */
const ModelConfig& ModelManager::GetConfig(string device)
{
    for (ModelConfig const& config : configList) {
        if (config.deviceType == device) {
            return config;
        }
    }
    FLOG("ModelManager::GetConfig current device model not exists. device : %s", currentDevice.c_str());
    Interrupter::Interrupt();
    return *configList.begin();
}

const ModelConfig& ModelManager::GetConfig()
{
    return GetConfig(currentDevice);
}
