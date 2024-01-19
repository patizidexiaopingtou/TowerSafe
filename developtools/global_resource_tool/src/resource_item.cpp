/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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

#include "resource_item.h"
#include <iostream>
#include "securec.h"

namespace OHOS {
namespace Global {
namespace Restool {
using namespace std;
ResourceItem::ResourceItem()
{
}

ResourceItem::ResourceItem(const ResourceItem &other)
{
    CopyFrom(other);
}

ResourceItem::ResourceItem(const string &name, const vector<KeyParam> &keyparams, ResType type)
    : data_(nullptr), dataLen_(0), name_(name), keyparams_(keyparams), type_(type)
{
}

ResourceItem::~ResourceItem()
{
    ReleaseData();
}

bool ResourceItem::SetData(const string &data)
{
    return SetData(reinterpret_cast<const int8_t *>(data.c_str()), data.length() + 1);
}

bool ResourceItem::SetData(const int8_t *data, uint32_t length)
{
    if (data == nullptr || length <= 0) {
        return false;
    }

    ReleaseData();
    int8_t *buffer = reinterpret_cast<int8_t *>(new (nothrow) int8_t[length]);
    if (buffer == nullptr) {
        return false;
    }

    bool result = (memset_s(buffer, length, 0, length) == EOK);
    result = result && (memcpy_s(buffer, length, data, length) == EOK);
    data_ = buffer;
    dataLen_ = length;
    return result;
}

void ResourceItem::SetFilePath(const string &filePath)
{
    filePath_ = filePath;
}

void ResourceItem::SetLimitKey(const string &limitKey)
{
    limitKey_ = limitKey;
}

void ResourceItem::SetName(const string &name)
{
    name_ = name;
}

const int8_t *ResourceItem::GetData() const
{
    return data_;
}

uint32_t ResourceItem::GetDataLength() const
{
    return dataLen_;
}

const string &ResourceItem::GetName() const
{
    return name_;
}

const ResType &ResourceItem::GetResType() const
{
    return type_;
}

const vector<KeyParam> &ResourceItem::GetKeyParam() const
{
    return keyparams_;
}

const string &ResourceItem::GetFilePath() const
{
    return filePath_;
}

const string &ResourceItem::GetLimitKey() const
{
    return limitKey_;
}

ResourceItem &ResourceItem::operator=(const ResourceItem &other)
{
    if (this == &other) {
        return *this;
    }
    CopyFrom(other);
    return *this;
}

// below private founction
void ResourceItem::ReleaseData()
{
    if (data_ != nullptr) {
        delete[] data_;
        data_ = nullptr;
        dataLen_ = 0;
    }
}

void ResourceItem::CopyFrom(const ResourceItem &other)
{
    name_ = other.name_;
    keyparams_ = other.keyparams_;
    type_ = other.type_;
    dataLen_ = other.dataLen_;
    filePath_ = other.filePath_;
    limitKey_ = other.limitKey_;
    if (!SetData(other.data_, other.dataLen_)) {
        ReleaseData();
    }
}
}
}
}