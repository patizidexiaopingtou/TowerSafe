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

#ifndef THERMAL_HDF_CONFIG_H
#define THERMAL_HDF_CONFIG_H

#include <string>
#include <vector>
#include <memory>
#include <map>
#include <libxml/xpath.h>
#include <libxml/tree.h>
#include <libxml/parser.h>

#include "base_info_config.h"
#include "sensor_info_config.h"

namespace OHOS {
namespace HDI {
namespace Thermal {
namespace V1_0 {
struct XMLThermal {
    std::string version;
    std::string product;
};

struct DfxTraceInfo {
    std::string title;
    std::string value;
};

struct XMLTracingInfo {
    std::string interval;
    std::string outpath;
};

class ThermalHdfConfig {
public:
    using ThermalTypeMap = std::map<std::string, std::shared_ptr<SensorInfoConfig>>;
    ThermalHdfConfig() {};
    ~ThermalHdfConfig() = default;
    ThermalHdfConfig(const ThermalHdfConfig&) = delete;
    ThermalHdfConfig& operator=(const ThermalHdfConfig&) = delete;
    static ThermalHdfConfig& GetInsance();

    int32_t ThermalHDIConfigInit(const std::string& path);
    int32_t ParseThermalHdiXMLConfig(const std::string& path);
    void ParseBaseNode(xmlNodePtr node);
    void ParsePollingNode(xmlNodePtr node);
    void ParsePollingSubNode(xmlNodePtr node, XMLThermalNodeInfo& tn);
    void ParseTracingNode(xmlNodePtr node);
    void ParseTracingSubNode(xmlNodePtr node);
    void ParseConfigInfo(const xmlNode* cur, std::vector<XMLThermalZoneInfo>& tzInfoList,
        std::vector<XMLThermalNodeInfo>& tnInfoList);
    ThermalTypeMap GetSensorTypeMap();
    void SetSensorTypeMap(const ThermalTypeMap& typesMap)
    {
        typesMap_ = typesMap;
    }
    void GetThermalZoneNodeInfo(XMLThermalZoneInfo& tz, const xmlNode* node);
    std::shared_ptr<BaseInfoConfig> GetBaseConfig()
    {
        return baseConfig_;
    }
    std::vector<DfxTraceInfo> GetTracingInfo()
    {
        return traceInfo_;
    }
    XMLTracingInfo GetXmlTraceInfo()
    {
        return trace_;
    }
private:
    std::shared_ptr<BaseInfoConfig> baseConfig_;
    ThermalTypeMap typesMap_;
    XMLThermal thermal_;
    XMLTracingInfo trace_;
    std::vector<DfxTraceInfo> traceInfo_;
};
} // V1_0
} // Thermal
} // HDI
} // OHOS

#endif // THERMAL_HDF_CONFIG_H
