/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 *
 * HDF is dual licensed: you can use it either under the terms of
 * the GPL, or the BSD license, at your option.
 * See the LICENSE file in the root of this repository for complete details.
 */

#ifndef OHOS_HDI_ASTNODE_H
#define OHOS_HDI_ASTNODE_H

#include <string>

#include "util/common.h"
#include "util/light_refcount_base.h"
#include "util/string_helper.h"

namespace OHOS {
namespace HDI {
class ASTNode : public LightRefCountBase {
public:
    virtual ~ASTNode();

    virtual std::string ToString() const;

    virtual std::string Dump(const std::string &prefix);
};
} // namespace HDI
} // namespace OHOS

#endif // OHOS_HDI_ASTNODE_H