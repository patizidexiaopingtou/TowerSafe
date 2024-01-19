/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 *
 * HDF is dual licensed: you can use it either under the terms of
 * the GPL, or the BSD license, at your option.
 * See the LICENSE file in the root of this repository for complete details.
 */

#include "codegen/c_code_emitter.h"
#include "util/options.h"

namespace OHOS {
namespace HDI {
void CCodeEmitter::GetImportInclusions(HeaderFile::HeaderFileSet &headerFiles)
{
    for (const auto &importPair : ast_->GetImports()) {
        AutoPtr<AST> importAst = importPair.second;
        std::string fileName = PackageToFilePath(importAst->GetFullName());
        headerFiles.emplace(HeaderFileType::OWN_MODULE_HEADER_FILE, fileName);
    }
}

void CCodeEmitter::EmitInterfaceMethodParameter(
    const AutoPtr<ASTParameter> &parameter, StringBuilder &sb, const std::string &prefix)
{
    sb.Append(prefix).Append(parameter->EmitCParameter());
}

void CCodeEmitter::EmitMethodNeedLoopVar(
    const AutoPtr<ASTMethod> &method, bool needRW, bool needFree, StringBuilder &sb, const std::string &prefix)
{
    if (!isKernelCode_) {
        return;
    }

    for (size_t i = 0; i < method->GetParameterNumber(); i++) {
        AutoPtr<ASTParameter> param = method->GetParameter(i);
        if (EmitNeedLoopVar(param->GetType(), needRW, needFree)) {
            sb.Append(prefix).Append("uint32_t i = 0;\n");
            break;
        }
    }
}

bool CCodeEmitter::EmitNeedLoopVar(const AutoPtr<ASTType> &type, bool needRW, bool needFree)
{
    if (type == nullptr) {
        return false;
    }

    auto rwNeedLoopVar = [needRW](const AutoPtr<ASTType> &elementType) -> bool {
        if (!needRW) {
            return false;
        }

        if (elementType->IsPod()) {
            return elementType->IsBooleanType() ? true : false;
        }

        return elementType->IsStringType() ? false : true;
    };

    auto freeNeedLoopVar = [needFree](const AutoPtr<ASTType> &elementType) -> bool {
        if (!needFree) {
            return false;
        }
        return elementType->IsPod() ? false : true;
    };

    if (type->IsArrayType()) {
        AutoPtr<ASTArrayType> ArrType = dynamic_cast<ASTArrayType *>(type.Get());
        if (rwNeedLoopVar(ArrType->GetElementType()) || freeNeedLoopVar(ArrType->GetElementType())) {
            return true;
        }
    } else if (type->IsListType()) {
        AutoPtr<ASTListType> ListType = dynamic_cast<ASTListType *>(type.Get());
        if (rwNeedLoopVar(ListType->GetElementType()) || freeNeedLoopVar(ListType->GetElementType())) {
            return true;
        }
    }

    return false;
}

void CCodeEmitter::EmitErrorHandle(const AutoPtr<ASTMethod> &method, const std::string &gotoLabel, bool isClient,
    StringBuilder &sb, const std::string &prefix)
{
    if (!isClient) {
        sb.Append(prefix).AppendFormat("%s:\n", gotoLabel.c_str());
        for (size_t i = 0; i < method->GetParameterNumber(); i++) {
            AutoPtr<ASTParameter> param = method->GetParameter(i);
            AutoPtr<ASTType> paramType = param->GetType();
            paramType->EmitMemoryRecycle(param->GetName(), isClient, true, sb, prefix + TAB);
        }
        return;
    }
}

void CCodeEmitter::EmitLicense(StringBuilder &sb)
{
    if (ast_->GetLicense().empty()) {
        return;
    }
    sb.Append(ast_->GetLicense()).Append("\n\n");
}

void CCodeEmitter::EmitHeadMacro(StringBuilder &sb, const std::string &fullName)
{
    std::string macroName = MacroName(fullName);
    sb.Append("#ifndef ").Append(macroName).Append("\n");
    sb.Append("#define ").Append(macroName).Append("\n");
}

void CCodeEmitter::EmitTailMacro(StringBuilder &sb, const std::string &fullName)
{
    std::string macroName = MacroName(fullName);
    sb.Append("#endif // ").Append(macroName);
}

void CCodeEmitter::EmitHeadExternC(StringBuilder &sb)
{
    sb.Append("#ifdef __cplusplus\n");
    sb.Append("extern \"C\" {\n");
    sb.Append("#endif /* __cplusplus */\n");
}

void CCodeEmitter::EmitTailExternC(StringBuilder &sb)
{
    sb.Append("#ifdef __cplusplus\n");
    sb.Append("}\n");
    sb.Append("#endif /* __cplusplus */\n");
}

std::string CCodeEmitter::MacroName(const std::string &name)
{
    if (name.empty()) {
        return name;
    }

    std::string macro = StringHelper::StrToUpper(StringHelper::Replace(name, '.', '_')) + "_H";
    return macro;
}

std::string CCodeEmitter::SpecificationParam(StringBuilder &paramSb, const std::string &prefix)
{
    size_t maxLineLen = 120;
    size_t replaceLen = 2;
    std::string paramStr = paramSb.ToString();
    size_t preIndex = 0;
    size_t curIndex = 0;

    std::string insertStr = StringHelper::Format("\n%s", prefix.c_str());
    for (; curIndex < paramStr.size(); curIndex++) {
        if (curIndex == maxLineLen && preIndex > 0) {
            StringHelper::Replace(paramStr, preIndex, replaceLen, ",");
            paramStr.insert(preIndex + 1, insertStr);
        } else {
            if (paramStr[curIndex] == ',') {
                preIndex = curIndex;
            }
        }
    }
    return paramStr;
}
} // namespace HDI
} // namespace OHOS