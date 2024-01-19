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

#ifndef MODELMANAGER_H
#define MODELMANAGER_H

#include <vector>

#include "ModelConfig.h"
class ModelManager final {
public:
    ModelManager(const ModelManager&) = delete;
    ModelManager& operator=(const ModelManager&) = delete;
    static const ModelConfig &GetConfig(std::string device);
    static const ModelConfig &GetConfig();

    static std::string GetCurrentModel();
    static std::string GetAllModelName();
    static void SetCurrentDevice(const std::string& value);

private:
    ModelManager() = default;
    virtual ~ModelManager() = default;

    static std::vector<ModelConfig> configList;
    static std::string currentDevice;
};

#endif // MODELMANAGER_H
