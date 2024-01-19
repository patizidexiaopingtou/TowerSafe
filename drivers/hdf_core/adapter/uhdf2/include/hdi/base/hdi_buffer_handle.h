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

#ifndef HDI_BUFFER_HANDLE_H
#define HDI_BUFFER_HANDLE_H

#include <message_parcel.h>
#include "buffer_handle.h"

namespace OHOS {
namespace HDI {
namespace Base {
using OHOS::MessageParcel;
using OHOS::Parcelable;

class HdiBufferHandle : public Parcelable {
public:
    HdiBufferHandle();
    virtual ~HdiBufferHandle();
    explicit HdiBufferHandle(BufferHandle &handle);

    HdiBufferHandle(const HdiBufferHandle &other);
    HdiBufferHandle(HdiBufferHandle &&other) noexcept;

    HdiBufferHandle &operator=(const HdiBufferHandle &other);
    HdiBufferHandle &operator=(HdiBufferHandle &&other) noexcept;

    bool Marshalling(Parcel &parcel) const override;
    static sptr<HdiBufferHandle> Unmarshalling(Parcel &parcel);
    BufferHandle *Move();
    std::string Dump() const;

private:
    bool ExtractFromParcel(Parcel &parcel);
    static bool WriteReserveData(MessageParcel &messageParcel, const BufferHandle &handle);
    static bool ReadReserveData(MessageParcel &messageParcel, BufferHandle &handle);
    BufferHandle *handle_;
};
} // namespace Base
} // namespace HDI
} // namespace OHOS

#endif // HDI_BUFFER_HANDLE_H