/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 *
 * HDF is dual licensed: you can use it either under the terms of
 * the GPL, or the BSD license, at your option.
 * See the LICENSE file in the root of this repository for complete details.
 */

#ifndef OHOS_HDI_LEXER_H
#define OHOS_HDI_LEXER_H

#include <cstdlib>
#include <ctype.h>
#include <memory>
#include <unordered_map>

#include "lexer/token.h"
#include "util/file.h"

namespace OHOS {
namespace HDI {
class Lexer {
public:
    enum class ParseMode {
        DECL_MODE,
        EXPR_MODE,
    };

    Lexer();

    ~Lexer() = default;

    bool Reset(const std::string &filePath);

    inline std::string GetFilePath() const
    {
        return (file_ != nullptr) ? file_->GetPath() : "";
    }

    Token PeekToken(bool skipComment = true);

    Token GetToken(bool skipComment = true);

    void SkipCurrentLine();

    bool SkipCurrentLine(char untilChar);

    void Skip(char untilChar);

    void SkipToken(TokenType tokenType);

    void SkipUntilToken(TokenType tokenType);

    void SkipEof();

    inline void SetParseMode(ParseMode mode)
    {
        mode_ = mode;
    }

private:
    void ReadToken(Token &token, bool skipComment = true);

    void InitCurToken(Token &token);

    void ReadId(Token &token);

    void ReadNum(Token &token);

    void ReadBinaryNum(Token &token);

    void ReadOctNum(Token &token);

    void ReadHexNum(Token &token);

    void ReadDecNum(Token &token);

    void ReadShiftLeftOp(Token &token);

    void ReadShiftRightOp(Token &token);

    void ReadPPlusOp(Token &token);

    void ReadMMinusOp(Token &token);

    void ReadComment(Token &token);

    void ReadLineComment(Token &token);

    void ReadBlockComment(Token &token);

    void ReadSymbolToken(Token &token);

private:
    std::string filePath_;
    std::unique_ptr<File> file_;

    ParseMode mode_;
    bool havePeek_;
    Token curToken_;

private:
    using StrTokenTypeMap = std::unordered_map<std::string, TokenType>;
    static StrTokenTypeMap keyWords_;
    static StrTokenTypeMap symbols_;
};
} // namespace HDI
} // namespace OHOS

#endif // OHOS_HDI_LEXER_H