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
#include "reclaim_priority_config.h"
#include "memmgr_ptr_util.h"
#include "kernel_interface.h"
#include "reclaim_priority_manager.h"
#include "memmgr_config_manager.h"
#include "memmgr_log.h"
#include "xml_helper.h"

namespace OHOS {
namespace Memory {
namespace {
    const std::string TAG = "ReclaimPriorityConfig";
}

void ReclaimPriorityConfig::ParseConfig(const xmlNodePtr &rootNodePtr)
{
    if (!XmlHelper::CheckNode(rootNodePtr) || !XmlHelper::HasChild(rootNodePtr)) {
        HILOGD("Node exsist:%{public}d,has child node:%{public}d",
               XmlHelper::CheckNode(rootNodePtr), XmlHelper::HasChild(rootNodePtr));
        return;
    }
    for (xmlNodePtr currNode = rootNodePtr->xmlChildrenNode; currNode != nullptr; currNode = currNode->next) {
        if (!XmlHelper::CheckNode(currNode)) {
            return;
        }
        std::string name = std::string(reinterpret_cast<const char *>(currNode->name));
        if (name.compare("killalbeSystemApps") == 0) {
            ParseReclaimPriorityKillableSystemAppsConfig(currNode);
            continue;
        }
        HILOGW("unknown node :<%{public}s>", name.c_str());
        return;
    }
    return;
}

void ReclaimPriorityConfig::ParseReclaimPriorityKillableSystemAppsConfig(const xmlNodePtr &rootNodePtr)
{
    if (!XmlHelper::CheckNode(rootNodePtr) || !XmlHelper::HasChild(rootNodePtr)) {
        HILOGD("Node exsist:%{public}d,has child node:%{public}d",
               XmlHelper::CheckNode(rootNodePtr), XmlHelper::HasChild(rootNodePtr));
        return;
    }
    for (xmlNodePtr currNode = rootNodePtr->xmlChildrenNode; currNode != nullptr; currNode = currNode->next) {
        if (!XmlHelper::CheckNode(currNode)) {
            return;
        }
        std::string name = std::string(reinterpret_cast<const char *>(currNode->name));
        if (name.compare("killableSysApp") == 0) {
            auto contentPtr = xmlNodeGetContent(currNode);
            if (contentPtr == nullptr) {
                continue;
            }
            std::string value = std::string(reinterpret_cast<char *>(contentPtr));
            HILOGW("read a killable app: %{public}s", value.c_str());
            if (value.size() == 0) {
                HILOGE("read a empty killable app: %{public}s, ignore it!", value.c_str());
                continue;
            }
            killalbeSystemApps_.insert(value);
            xmlFree(contentPtr);
            continue;
        }
        HILOGW("unknown node :<%{public}s>", name.c_str());
        return;
    }
    return;
}

std::set<std::string> ReclaimPriorityConfig::GetkillalbeSystemApps()
{
    return killalbeSystemApps_;
}
} // namespace Memory
} // namespace OHOS
