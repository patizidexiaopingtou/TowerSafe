/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 *
 * HDF is dual licensed: you can use it either under the terms of
 * the GPL, or the BSD license, at your option.
 * See the LICENSE file in the root of this repository for complete details.
 */

#include <iomanip>
#include <map>

#include "token.h"

using namespace OHOS::Hardware;

static constexpr int WIDTH_ZERO = 0;
static constexpr int WIDTH_EIGHT = 8;
static constexpr int WIDTH_EIGHTEEN = 18;
static constexpr int WIDTH_TWENTY = 20;

std::string OHOS::Hardware::TokenType2String(int32_t type)
{
    static std::map<int32_t, std::string> tokenTypeMap = {
        {NUMBER,    "NUMBER"   },
        {TEMPLATE,  "TEMPLATE" },
        {LITERAL,   "LITERAL"  },
        {ROOT,      "ROOT"     },
        {INCLUDE,   "INCLUDE"  },
        {DELETE,    "DELETE"   },
        {STRING,    "STRING"   },
        {REF_PATH,  "REF_PATH" },
        {FILE_PATH, "FILE_PATH"}
    };

    std::string str;
    if (type < '~') {
        str.push_back(static_cast<char>(type));
        return str;
    } else if (tokenTypeMap.find(type) != tokenTypeMap.end()) {
        str = tokenTypeMap[type];
    }

    return str;
}

std::ostream &OHOS::Hardware::operator<<(std::ostream &stream, const OHOS::Hardware::Token &token)
{
    stream << "Token: type: " << std::setw(WIDTH_EIGHT) << ::std::left << TokenType2String(token.type);
    stream << " value: " << std::setw(WIDTH_EIGHT) << ::std::left;
    token.type != NUMBER ? stream << std::setw(WIDTH_TWENTY) << token.strval
                     : stream << std::setw(WIDTH_ZERO) << "0x" << std::setw(WIDTH_EIGHTEEN) <<
                       std::hex << token.numval;
    stream << " lineno:" << token.lineNo;
    return stream;
}

Token::Token() : type(0), strval(), numval(0), src(), lineNo(0) {}

bool Token::operator==(int32_t otherType) const
{
    return otherType == type;
}

bool Token::operator!=(int32_t otherType) const
{
    return otherType != type;
}
bool Token::operator==(const Token &token) const
{
    return token.type == type && token.numval == numval && token.strval == strval;
}

bool Token::operator!=(const Token &token) const
{
    return token.type != type || token.numval != numval || token.strval != strval;
}
