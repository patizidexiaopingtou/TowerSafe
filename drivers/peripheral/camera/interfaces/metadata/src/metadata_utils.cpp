/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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

#include "metadata_utils.h"
#include <securec.h>
#include "metadata_log.h"

namespace OHOS::Camera {
bool MetadataUtils::WriteMetadataDataToVec(const camera_metadata_item_t &entry, std::vector<uint8_t>& cameraAbility)
{
    if (entry.data_type == META_TYPE_BYTE) {
        for (size_t i = 0; i < entry.count; i++) {
            WriteData<int8_t>(*(entry.data.u8 + i), cameraAbility);
        }
    } else if (entry.data_type == META_TYPE_INT32) {
        for (size_t i = 0; i < entry.count; i++) {
            WriteData<int32_t>(*(entry.data.i32 + i), cameraAbility);
        }
    } else if (entry.data_type == META_TYPE_FLOAT) {
        for (size_t i = 0; i < entry.count; i++) {
            WriteData<float>(*(entry.data.f + i), cameraAbility);
        }
    } else if (entry.data_type == META_TYPE_INT64) {
        for (size_t i = 0; i < entry.count; i++) {
            WriteData<int64_t>(*(entry.data.i64 + i), cameraAbility);
        }
    } else if (entry.data_type == META_TYPE_DOUBLE) {
        for (size_t i = 0; i < entry.count; i++) {
            WriteData<double>(*(entry.data.d + i), cameraAbility);
        }
    } else if (entry.data_type == META_TYPE_RATIONAL) {
        for (size_t i = 0; i < entry.count; i++) {
            WriteData<int32_t>((*(entry.data.r + i)).numerator, cameraAbility);
            WriteData<int32_t>((*(entry.data.r + i)).denominator, cameraAbility);
        }
    }

    return true;
}

bool MetadataUtils::ConvertMetadataToVec(const std::shared_ptr<CameraMetadata> &metadata,
    std::vector<uint8_t>& cameraAbility)
{
    if (metadata == nullptr) {
        return false;
    }

    bool bRet = true;
    uint32_t tagCount = 0;
    common_metadata_header_t *meta = metadata->get();
    if (meta != nullptr) {
        tagCount = GetCameraMetadataItemCount(meta);
        WriteData<uint32_t>(tagCount, cameraAbility);
        WriteData<uint32_t>(GetCameraMetadataItemCapacity(meta), cameraAbility);
        WriteData<uint32_t>(GetCameraMetadataDataSize(meta), cameraAbility);
        for (uint32_t i = 0; i < tagCount; i++) {
            camera_metadata_item_t item;
            int ret = GetCameraMetadataItem(meta, i, &item);
            if (ret != CAM_META_SUCCESS) {
                return false;
            }

            WriteData<uint32_t>(item.index, cameraAbility);
            WriteData<uint32_t>(item.item, cameraAbility);
            WriteData<uint32_t>(item.data_type, cameraAbility);
            WriteData<uint32_t>(item.count, cameraAbility);

            bRet = WriteMetadataDataToVec(item, cameraAbility);
        }
    } else {
        cameraAbility.push_back(tagCount);
    }

    return bRet;
}

bool MetadataUtils::EncodeCameraMetadata(const std::shared_ptr<CameraMetadata> &metadata,
                                         MessageParcel &data)
{
    if (metadata == nullptr) {
        return false;
    }

    bool bRet = true;
    uint32_t tagCount = 0;
    common_metadata_header_t *meta = metadata->get();
    if (meta != nullptr) {
        tagCount = GetCameraMetadataItemCount(meta);
        bRet = bRet && data.WriteUint32(tagCount);
        bRet = bRet && data.WriteUint32(GetCameraMetadataItemCapacity(meta));
        bRet = bRet && data.WriteUint32(GetCameraMetadataDataSize(meta));
        for (uint32_t i = 0; i < tagCount; i++) {
            camera_metadata_item_t item;
            int ret = GetCameraMetadataItem(meta, i, &item);
            if (ret != CAM_META_SUCCESS) {
                return false;
            }

            bRet = bRet && data.WriteUint32(item.index);
            bRet = bRet && data.WriteUint32(item.item);
            bRet = bRet && data.WriteUint32(item.data_type);
            bRet = bRet && data.WriteUint32(item.count);
            bRet = bRet && MetadataUtils::WriteMetadata(item, data);
        }
    } else {
        bRet = data.WriteUint32(tagCount);
    }
    return bRet;
}

bool MetadataUtils::ReadMetadataDataFromVec(int32_t &index, camera_metadata_item_t &entry,
    const std::vector<uint8_t>& cameraAbility)
{
    if (entry.data_type == META_TYPE_BYTE) {
        entry.data.u8 = new(std::nothrow) uint8_t[entry.count];
        if (entry.data.u8 != nullptr) {
            for (size_t i = 0; i < entry.count; i++) {
                ReadData<uint8_t>(entry.data.u8[i], index, cameraAbility);
            }
        }
    } else if (entry.data_type == META_TYPE_INT32) {
        entry.data.i32 = new(std::nothrow) int32_t[entry.count];
        if (entry.data.i32 != nullptr) {
            for (size_t i = 0; i < entry.count; i++) {
                ReadData<int32_t>(entry.data.i32[i], index, cameraAbility);
            }
        }
    } else if (entry.data_type == META_TYPE_FLOAT) {
        entry.data.f = new(std::nothrow) float[entry.count];
        if (entry.data.f != nullptr) {
            for (size_t i = 0; i < entry.count; i++) {
                ReadData<float>(entry.data.f[i], index, cameraAbility);
            }
        }
    } else if (entry.data_type == META_TYPE_INT64) {
        entry.data.i64 = new(std::nothrow) int64_t[entry.count];
        if (entry.data.i64 != nullptr) {
            for (size_t i = 0; i < entry.count; i++) {
                ReadData<int64_t>(entry.data.i64[i], index, cameraAbility);
            }
        }
    } else if (entry.data_type == META_TYPE_DOUBLE) {
        entry.data.d = new(std::nothrow) double[entry.count];
        if (entry.data.d != nullptr) {
            for (size_t i = 0; i < entry.count; i++) {
                ReadData<double>(entry.data.d[i], index, cameraAbility);
            }
        }
    } else if (entry.data_type == META_TYPE_RATIONAL) {
        entry.data.r = new(std::nothrow) camera_rational_t[entry.count];
        if (entry.data.r != nullptr) {
            for (size_t i = 0; i < entry.count; i++) {
                ReadData<int32_t>(entry.data.r[i].numerator, index, cameraAbility);
                ReadData<int32_t>(entry.data.r[i].denominator, index, cameraAbility);
            }
        }
    }

    return true;
}

void MetadataUtils::ConvertVecToMetadata(const std::vector<uint8_t>& cameraAbility,
    std::shared_ptr<CameraMetadata> &metadata)
{
    int32_t index = 0;
    uint32_t tagCount = 0;
    uint32_t itemCapacity = 0;
    uint32_t dataCapacity = 0;
    constexpr uint32_t MAX_SUPPORTED_TAGS = 1000;
    constexpr uint32_t MAX_SUPPORTED_ITEMS = 1000;
    constexpr uint32_t MAX_ITEM_CAPACITY = (1000 * 10);
    constexpr uint32_t MAX_DATA_CAPACITY = (1000 * 10 * 10);

    ReadData<uint32_t>(tagCount, index, cameraAbility);
    if (tagCount > MAX_SUPPORTED_TAGS) {
        tagCount = MAX_SUPPORTED_TAGS;
        METADATA_ERR_LOG("MetadataUtils::DecodeCameraMetadata tagCount is more than supported value");
    }
    ReadData<uint32_t>(itemCapacity, index, cameraAbility);
    if (itemCapacity > MAX_ITEM_CAPACITY) {
        itemCapacity = MAX_ITEM_CAPACITY;
        METADATA_ERR_LOG("MetadataUtils::DecodeCameraMetadata itemCapacity is more than supported value");
    }
    ReadData<uint32_t>(dataCapacity, index, cameraAbility);
    if (dataCapacity > MAX_DATA_CAPACITY) {
        dataCapacity = MAX_DATA_CAPACITY;
        METADATA_ERR_LOG("MetadataUtils::DecodeCameraMetadata dataCapacity is more than supported value");
    }

    std::vector<camera_metadata_item_t> items;
    for (uint32_t i = 0; i < tagCount; i++) {
        camera_metadata_item_t item;
        ReadData<uint32_t>(item.index, index, cameraAbility);
        ReadData<uint32_t>(item.item, index, cameraAbility);
        ReadData<uint32_t>(item.data_type, index, cameraAbility);
        ReadData<uint32_t>(item.count, index, cameraAbility);
        if (item.count > MAX_SUPPORTED_ITEMS) {
            item.count = MAX_SUPPORTED_ITEMS;
            METADATA_ERR_LOG("MetadataUtils::DecodeCameraMetadata item.count is more than supported value");
        }
        ReadMetadataDataFromVec(index, item, cameraAbility);
        items.push_back(item);
    }

    metadata = std::make_shared<CameraMetadata>(itemCapacity, dataCapacity);
    common_metadata_header_t *meta = metadata->get();
    for (auto &item_ : items) {
        void *buffer = nullptr;
        MetadataUtils::ItemDataToBuffer(item_, &buffer);
        (void)AddCameraMetadataItem(meta, item_.item, buffer, item_.count);
        FreeMetadataBuffer(item_);
    }
}

void MetadataUtils::DecodeCameraMetadata(MessageParcel &data, std::shared_ptr<CameraMetadata> &metadata)
{
    uint32_t tagCount = data.ReadUint32();
    uint32_t itemCapacity = data.ReadUint32();
    uint32_t dataCapacity = data.ReadUint32();
    constexpr uint32_t MAX_SUPPORTED_TAGS = 1000;
    constexpr uint32_t MAX_SUPPORTED_ITEMS = 1000;
    constexpr uint32_t MAX_ITEM_CAPACITY = (1000 * 10);
    constexpr uint32_t MAX_DATA_CAPACITY = (1000 * 10 * 10);

    if (tagCount > MAX_SUPPORTED_TAGS) {
        tagCount = MAX_SUPPORTED_TAGS;
        METADATA_ERR_LOG("MetadataUtils::DecodeCameraMetadata tagCount is more than supported value");
    }

    if (itemCapacity > MAX_ITEM_CAPACITY) {
        itemCapacity = MAX_ITEM_CAPACITY;
        METADATA_ERR_LOG("MetadataUtils::DecodeCameraMetadata itemCapacity is more than supported value");
    }

    if (dataCapacity > MAX_DATA_CAPACITY) {
        dataCapacity = MAX_DATA_CAPACITY;
        METADATA_ERR_LOG("MetadataUtils::DecodeCameraMetadata dataCapacity is more than supported value");
    }

    std::vector<camera_metadata_item_t> items;
    for (uint32_t i = 0; i < tagCount; i++) {
        camera_metadata_item_t item;
        item.index = data.ReadUint32();
        item.item = data.ReadUint32();
        item.data_type = data.ReadUint32();
        item.count = data.ReadUint32();
        if (item.count > MAX_SUPPORTED_ITEMS) {
            item.count = MAX_SUPPORTED_ITEMS;
            METADATA_ERR_LOG("MetadataUtils::DecodeCameraMetadata item.count is more than supported value");
        }
        MetadataUtils::ReadMetadata(item, data);
        items.push_back(item);
    }

    metadata = std::make_shared<CameraMetadata>(itemCapacity, dataCapacity);
    common_metadata_header_t *meta = metadata->get();
    for (auto &item_ : items) {
        void *buffer = nullptr;
        MetadataUtils::ItemDataToBuffer(item_, &buffer);
        (void)AddCameraMetadataItem(meta, item_.item, buffer, item_.count);
        FreeMetadataBuffer(item_);
    }
}

bool MetadataUtils::WriteMetadata(const camera_metadata_item_t &item, MessageParcel &data)
{
    bool bRet = false;
    size_t i;
    if (item.data_type == META_TYPE_BYTE) {
        std::vector<uint8_t> byteBuffers;
        for (i = 0; i < item.count; i++) {
            byteBuffers.push_back(*(item.data.u8 + i));
        }
        bRet = data.WriteUInt8Vector(byteBuffers);
    } else if (item.data_type == META_TYPE_INT32) {
        std::vector<int32_t> int32Buffers;
        for (i = 0; i < item.count; i++) {
            int32Buffers.push_back(*(item.data.i32 + i));
        }
        bRet = data.WriteInt32Vector(int32Buffers);
    } else if (item.data_type == META_TYPE_FLOAT) {
        std::vector<float> floatBuffers;
        for (i = 0; i < item.count; i++) {
            floatBuffers.push_back(*(item.data.f + i));
        }
        bRet = data.WriteFloatVector(floatBuffers);
    } else if (item.data_type == META_TYPE_UINT32) {
        std::vector<uint32_t> uInt32Buffers;
        for (i = 0; i < item.count; i++) {
            uInt32Buffers.push_back(*(item.data.ui32 + i));
        }
        bRet = data.WriteUInt32Vector(uInt32Buffers);
    } else if (item.data_type == META_TYPE_INT64) {
        std::vector<int64_t> int64Buffers;
        for (i = 0; i < item.count; i++) {
            int64Buffers.push_back(*(item.data.i64 + i));
        }
        bRet = data.WriteInt64Vector(int64Buffers);
    } else if (item.data_type == META_TYPE_DOUBLE) {
        std::vector<double> doubleBuffers;
        for (i = 0; i < item.count; i++) {
            doubleBuffers.push_back(*(item.data.d + i));
        }
        bRet = data.WriteDoubleVector(doubleBuffers);
    } else if (item.data_type == META_TYPE_RATIONAL) {
        std::vector<int32_t> rationalBuffers;
        for (i = 0; i < item.count; i++) {
            rationalBuffers.push_back((*(item.data.r + i)).numerator);
            rationalBuffers.push_back((*(item.data.r + i)).denominator);
        }
        bRet = data.WriteInt32Vector(rationalBuffers);
    }

    return bRet;
}

std::string MetadataUtils::EncodeToString(std::shared_ptr<CameraMetadata> metadata)
{
    int32_t ret, dataLen;
    const int32_t headerLength = sizeof(common_metadata_header_t);
    const int32_t itemLen = sizeof(camera_metadata_item_entry_t);
    const int32_t itemFixedLen = static_cast<int32_t>(offsetof(camera_metadata_item_entry_t, data));

    if (metadata == nullptr || metadata->get() == nullptr) {
        METADATA_ERR_LOG("MetadataUtils::EncodeToString Metadata is invalid");
        return {};
    }

    common_metadata_header_t *meta = metadata->get();
    int32_t encodeDataLen = headerLength + (itemLen * meta->item_count) + meta->data_count;
    std::string s(encodeDataLen, '\0');
    char *encodeData = &s[0];
    ret = memcpy_s(encodeData, encodeDataLen, meta, headerLength);
    if (ret != EOK) {
        METADATA_ERR_LOG("MetadataUtils::EncodeToString Failed to copy memory for metadata header");
        return {};
    }
    encodeData += headerLength;
    encodeDataLen -= headerLength;
    camera_metadata_item_entry_t *item = GetMetadataItems(meta);
    for (uint32_t index = 0; index < meta->item_count; index++, item++) {
        ret = memcpy_s(encodeData, encodeDataLen, item, itemFixedLen);
        if (ret != EOK) {
            METADATA_ERR_LOG("MetadataUtils::EncodeToString Failed to copy memory for item fixed fields");
            return {};
        }
        encodeData += itemFixedLen;
        encodeDataLen -= itemFixedLen;
        dataLen = itemLen - itemFixedLen;
        ret = memcpy_s(encodeData, encodeDataLen,  &(item->data), dataLen);
        if (ret != EOK) {
            METADATA_ERR_LOG("MetadataUtils::EncodeToString Failed to copy memory for item data field");
            return {};
        }
        encodeData += dataLen;
        encodeDataLen -= dataLen;
    }
            
    if (meta->data_count != 0) {
        ret = memcpy_s(encodeData, encodeDataLen, GetMetadataData(meta), meta->data_count);
        if (ret != EOK) {
            METADATA_ERR_LOG("MetadataUtils::EncodeToString Failed to copy memory for data");
            return {};
        }
        encodeData += meta->data_count;
    }
    METADATA_DEBUG_LOG("MetadataUtils::EncodeToString Calculated length: %{public}d, encoded length: %{public}d",
                       s.capacity(), (encodeData - &s[0]));

    return s;
}

std::shared_ptr<CameraMetadata> MetadataUtils::DecodeFromString(std::string setting)
{
    uint32_t ret, dataLen;
    uint32_t totalLen = setting.capacity();
    const uint32_t headerLength = sizeof(common_metadata_header_t);
    const uint32_t itemLen = sizeof(camera_metadata_item_entry_t);
    const uint32_t itemFixedLen = offsetof(camera_metadata_item_entry_t, data);

    if (totalLen < headerLength) {
        METADATA_ERR_LOG("MetadataUtils::DecodeFromString Length is less than metadata header length");
        return {};
    }

    char *decodeData = &setting[0];
    common_metadata_header_t header;
    ret = memcpy_s(&header, headerLength, decodeData, headerLength);
    if (ret != EOK) {
        METADATA_ERR_LOG("MetadataUtils::DecodeFromString Failed to copy memory for metadata header");
        return {};
    }
    std::shared_ptr<CameraMetadata> metadata
        = std::make_shared<CameraMetadata>(header.item_capacity, header.data_capacity);
    common_metadata_header_t *meta = metadata->get();
    if (!meta) {
        METADATA_ERR_LOG("MetadataUtils::DecodeFromString Failed to get metadata header");
        return {};
    }
    ret = memcpy_s(meta, headerLength, &header, headerLength);
    if (ret != EOK) {
        METADATA_ERR_LOG("MetadataUtils::DecodeFromString Failed to copy memory for metadata header");
        return {};
    }
    decodeData += headerLength;
    camera_metadata_item_entry_t *item = GetMetadataItems(meta);
    for (uint32_t index = 0; index < meta->item_count; index++, item++) {
        if (totalLen < ((decodeData - &setting[0]) + itemLen)) {
            METADATA_ERR_LOG("MetadataUtils::DecodeFromString Failed at item index: %{public}d", index);
            return {};
        }
        ret = memcpy_s(item, itemFixedLen, decodeData, itemFixedLen);
        if (ret != EOK) {
            METADATA_ERR_LOG("MetadataUtils::DecodeFromString Failed to copy memory for item fixed fields");
            return {};
        }
        decodeData += itemFixedLen;
        dataLen = itemLen - itemFixedLen;
        ret = memcpy_s(&(item->data), dataLen,  decodeData, dataLen);
        if (ret != EOK) {
            METADATA_ERR_LOG("MetadataUtils::DecodeFromString Failed to copy memory for item data field");
            return {};
        }
        decodeData += dataLen;
    }

    if (meta->data_count != 0) {
        if (totalLen < static_cast<uint32_t>(((decodeData - &setting[0]) + meta->data_count))) {
            METADATA_ERR_LOG("MetadataUtils::DecodeFromString Failed at data copy");
            return {};
        }
        ret = memcpy_s(GetMetadataData(meta), meta->data_count, decodeData, meta->data_count);
        if (ret != EOK) {
            METADATA_ERR_LOG("MetadataUtils::DecodeFromString Failed to copy memory for data");
            return {};
        }
        decodeData += meta->data_count;
    }

    METADATA_DEBUG_LOG("MetadataUtils::DecodeFromString String length: %{public}d, Decoded length: %{public}d",
                       setting.capacity(), (decodeData - &setting[0]));
    return metadata;
}

bool MetadataUtils::ReadMetadata(camera_metadata_item_t &item, MessageParcel &data)
{
    size_t i, j;
    if (item.data_type == META_TYPE_BYTE) {
        std::vector<uint8_t> byteBuffers;
        data.ReadUInt8Vector(&byteBuffers);
        item.data.u8 = new(std::nothrow) uint8_t[item.count];
        if (item.data.u8 != nullptr) {
            for (i = 0; i < item.count; i++) {
                item.data.u8[i] = byteBuffers.at(i);
            }
        }
    } else if (item.data_type == META_TYPE_INT32) {
        std::vector<int32_t> int32Buffers;
        data.ReadInt32Vector(&int32Buffers);
        item.data.i32 = new(std::nothrow) int32_t[item.count];
        if (item.data.i32 != nullptr) {
            for (i = 0; i < item.count; i++) {
                item.data.i32[i] = int32Buffers.at(i);
            }
        }
    } else if (item.data_type == META_TYPE_FLOAT) {
        std::vector<float> floatBuffers;
        data.ReadFloatVector(&floatBuffers);
        item.data.f = new(std::nothrow) float[item.count];
        if (item.data.f != nullptr) {
            for (i = 0; i < item.count; i++) {
                item.data.f[i] = floatBuffers.at(i);
            }
        }
    } else if (item.data_type == META_TYPE_UINT32) {
        std::vector<uint32_t> uInt32Buffers;
        data.ReadUInt32Vector(&uInt32Buffers);
        item.data.ui32 = new(std::nothrow) uint32_t[item.count];
        if (item.data.ui32 != nullptr) {
            for (i = 0; i < item.count; i++) {
                item.data.ui32[i] = uInt32Buffers.at(i);
            }
        }
    } else if (item.data_type == META_TYPE_INT64) {
        std::vector<int64_t> int64uBffers;
        data.ReadInt64Vector(&int64uBffers);
        item.data.i64 = new(std::nothrow) int64_t[item.count];
        if (item.data.i64 != nullptr) {
            for (i = 0; i < item.count; i++) {
                item.data.i64[i] = int64uBffers.at(i);
            }
        }
    } else if (item.data_type == META_TYPE_DOUBLE) {
        std::vector<double> doubleBuffers;
        data.ReadDoubleVector(&doubleBuffers);
        item.data.d = new(std::nothrow) double[item.count];
        if (item.data.d != nullptr) {
            for (i = 0; i < item.count; i++) {
                item.data.d[i] = doubleBuffers.at(i);
            }
        }
    } else if (item.data_type == META_TYPE_RATIONAL) {
        std::vector<int32_t> rationalBuffers;
        data.ReadInt32Vector(&rationalBuffers);
        item.data.r = new(std::nothrow) camera_rational_t[item.count];
        if (item.data.r != nullptr) {
            for (i = 0, j = 0;
                    i < item.count && j < static_cast<size_t>(rationalBuffers.size());
                    i++, j += INDEX_COUNTER) {
                item.data.r[i].numerator = rationalBuffers.at(j);
                item.data.r[i].denominator = rationalBuffers.at(j + 1);
            }
        }
    }
    return true;
}

void MetadataUtils::ItemDataToBuffer(const camera_metadata_item_t &item, void **buffer)
{
    if (buffer == nullptr) {
        METADATA_ERR_LOG("MetadataUtils::ItemDataToBuffer buffer is null");
        return;
    }
    if (item.data_type == META_TYPE_BYTE) {
        *buffer = reinterpret_cast<void *>(item.data.u8);
    } else if (item.data_type == META_TYPE_INT32) {
        *buffer = reinterpret_cast<void *>(item.data.i32);
    } else if (item.data_type == META_TYPE_FLOAT) {
        *buffer = reinterpret_cast<void *>(item.data.f);
    } else if (item.data_type == META_TYPE_UINT32) {
        *buffer = reinterpret_cast<void *>(item.data.ui32);
    } else if (item.data_type == META_TYPE_INT64) {
        *buffer = reinterpret_cast<void *>(item.data.i64);
    } else if (item.data_type == META_TYPE_DOUBLE) {
        *buffer = reinterpret_cast<void *>(item.data.d);
    } else if (item.data_type == META_TYPE_RATIONAL) {
        *buffer = reinterpret_cast<void *>(item.data.r);
    }
}

void MetadataUtils::FreeMetadataBuffer(camera_metadata_item_t &entry)
{
    if (entry.data_type == META_TYPE_BYTE) {
        if (entry.data.u8 != nullptr) {
            delete[] entry.data.u8;
        }
    } else if (entry.data_type == META_TYPE_INT32) {
        if (entry.data.i32 != nullptr) {
            delete[] entry.data.i32;
        }
    } else if (entry.data_type == META_TYPE_FLOAT) {
        if (entry.data.f != nullptr) {
            delete[] entry.data.f;
        }
    } else if (entry.data_type == META_TYPE_INT64) {
        if (entry.data.i64 != nullptr) {
            delete[] entry.data.i64;
        }
    } else if (entry.data_type == META_TYPE_UINT32) {
        if (entry.data.ui32 != nullptr) {
            delete[] entry.data.ui32;
        }
    } else if (entry.data_type == META_TYPE_DOUBLE) {
        if (entry.data.d != nullptr) {
            delete[] entry.data.d;
        }
    } else if (entry.data_type == META_TYPE_RATIONAL) {
        if (entry.data.r != nullptr) {
            delete[] entry.data.r;
        }
    }
}
} // Camera
