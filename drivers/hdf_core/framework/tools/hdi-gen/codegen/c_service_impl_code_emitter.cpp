/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 *
 * HDF is dual licensed: you can use it either under the terms of
 * the GPL, or the BSD license, at your option.
 * See the LICENSE file in the root of this repository for complete details.
 */

#include "codegen/c_service_impl_code_emitter.h"
#include "util/file.h"
#include "util/logger.h"

namespace OHOS {
namespace HDI {
bool CServiceImplCodeEmitter::ResolveDirectory(const std::string &targetDirectory)
{
    if (ast_->GetASTFileType() == ASTFileType::AST_IFACE || ast_->GetASTFileType() == ASTFileType::AST_ICALLBACK) {
        directory_ = GetFileParentPath(targetDirectory);
    } else {
        return false;
    }

    if (!File::CreateParentDir(directory_)) {
        Logger::E("CServiceImplCodeEmitter", "Create '%s' failed!", directory_.c_str());
        return false;
    }

    return true;
}

void CServiceImplCodeEmitter::EmitCode()
{
    if (isKernelCode_ || interface_->IsSerializable()) {
        EmitServiceImplHeaderFile();
    }

    EmitServiceImplSourceFile();
}

void CServiceImplCodeEmitter::EmitServiceImplHeaderFile()
{
    std::string filePath =
        File::AdapterPath(StringHelper::Format("%s/%s.h", directory_.c_str(), FileName(baseName_ + "Service").c_str()));
    File file(filePath, File::WRITE);
    StringBuilder sb;

    EmitLicense(sb);
    EmitHeadMacro(sb, implFullName_);
    sb.Append("\n");
    EmitServiceImplHeaderInclusions(sb);
    sb.Append("\n");
    EmitHeadExternC(sb);
    if (isKernelCode_) {
        sb.Append("\n");
        EmitKernelServiceImplDef(sb);
    } else if (interface_->IsSerializable()) {
        sb.Append("\n");
        EmitServiceImplDef(sb);
    }
    sb.Append("\n");
    EmitServiceImplConstructDecl(sb);
    sb.Append("\n");
    EmitTailExternC(sb);
    sb.Append("\n");
    EmitTailMacro(sb, implFullName_);

    std::string data = sb.ToString();
    file.WriteData(data.c_str(), data.size());
    file.Flush();
    file.Close();
}

void CServiceImplCodeEmitter::EmitServiceImplHeaderInclusions(StringBuilder &sb)
{
    HeaderFile::HeaderFileSet headerFiles;

    if (isKernelCode_) {
        headerFiles.emplace(HeaderFileType::OWN_MODULE_HEADER_FILE, EmitVersionHeaderName(stubName_));
    } else {
        headerFiles.emplace(HeaderFileType::OWN_MODULE_HEADER_FILE, EmitVersionHeaderName(interfaceName_));
    }

    for (const auto &file : headerFiles) {
        sb.AppendFormat("%s\n", file.ToString().c_str());
    }
}

void CServiceImplCodeEmitter::EmitServiceImplConstructDecl(StringBuilder &sb)
{
    std::string instTypeName = interface_->IsSerializable() ? interfaceName_ : implName_;
    sb.AppendFormat("struct %s *%sServiceGet(void);\n\n", instTypeName.c_str(), baseName_.c_str());
    sb.AppendFormat("void %sServiceRelease(struct %s *instance);\n", baseName_.c_str(), instTypeName.c_str());
}

void CServiceImplCodeEmitter::EmitServiceImplSourceFile()
{
    std::string filePath =
        File::AdapterPath(StringHelper::Format("%s/%s.c", directory_.c_str(), FileName(implName_).c_str()));
    File file(filePath, File::WRITE);
    StringBuilder sb;

    EmitLicense(sb);
    EmitServiceImplSourceInclusions(sb);
    sb.Append("\n");
    EmitLogTagMacro(sb, FileName(implName_));
    if (!isKernelCode_ && !interface_->IsSerializable()) {
        sb.Append("\n");
        EmitServiceImplDef(sb);
    }

    sb.Append("\n");
    EmitServiceImplMethodImpls(sb, "");
    if (isKernelCode_) {
        sb.Append("\n");
        EmitKernelServiceImplGetMethod(sb);
        sb.Append("\n");
        EmitKernelServiceImplReleaseMethod(sb);
    } else {
        sb.Append("\n");
        EmitServiceImplGetMethod(sb);
        sb.Append("\n");
        EmitServiceImplReleaseMethod(sb);
    }

    std::string data = sb.ToString();
    file.WriteData(data.c_str(), data.size());
    file.Flush();
    file.Close();
}

void CServiceImplCodeEmitter::EmitServiceImplSourceInclusions(StringBuilder &sb)
{
    HeaderFile::HeaderFileSet headerFiles;

    if (isKernelCode_ || interface_->IsSerializable()) {
        headerFiles.emplace(HeaderFileType::OWN_HEADER_FILE, EmitVersionHeaderName(implName_));
    } else {
        headerFiles.emplace(HeaderFileType::OWN_MODULE_HEADER_FILE, EmitVersionHeaderName(interfaceName_));
    }
    GetSourceOtherLibInclusions(headerFiles);

    for (const auto &file : headerFiles) {
        sb.AppendFormat("%s\n", file.ToString().c_str());
    }
}

void CServiceImplCodeEmitter::GetSourceOtherLibInclusions(HeaderFile::HeaderFileSet &headerFiles)
{
    headerFiles.emplace(HeaderFileType::OTHER_MODULES_HEADER_FILE, "hdf_base");
    headerFiles.emplace(HeaderFileType::OTHER_MODULES_HEADER_FILE, "hdf_log");
    headerFiles.emplace(HeaderFileType::OTHER_MODULES_HEADER_FILE, "osal_mem");
    headerFiles.emplace(HeaderFileType::OTHER_MODULES_HEADER_FILE, "securec");
}

void CServiceImplCodeEmitter::EmitKernelServiceImplDef(StringBuilder &sb)
{
    sb.AppendFormat("struct %sService {\n", baseName_.c_str());
    sb.Append(TAB).AppendFormat("struct %sStub stub;\n\n", baseName_.c_str());
    sb.Append(TAB).Append("// please add private data here\n");
    sb.Append("};\n");
}

void CServiceImplCodeEmitter::EmitServiceImplDef(StringBuilder &sb)
{
    sb.AppendFormat("struct %sService {\n", baseName_.c_str());
    sb.Append(TAB).AppendFormat("struct %s interface;\n", interfaceName_.c_str());
    sb.Append("};\n");
}

void CServiceImplCodeEmitter::EmitServiceImplMethodImpls(StringBuilder &sb, const std::string &prefix)
{
    for (size_t i = 0; i < interface_->GetMethodNumber(); i++) {
        AutoPtr<ASTMethod> method = interface_->GetMethod(i);
        EmitServiceImplMethodImpl(method, sb, prefix);
        if (i + 1 < interface_->GetMethodNumber()) {
            sb.Append("\n");
        }
    }

    sb.Append("\n");
    EmitServiceImplGetVersionMethod(sb, prefix);
}

void CServiceImplCodeEmitter::EmitServiceImplMethodImpl(
    const AutoPtr<ASTMethod> &method, StringBuilder &sb, const std::string &prefix)
{
    if (method->GetParameterNumber() == 0) {
        sb.Append(prefix).AppendFormat("static int32_t %s%s(struct %s *self)\n", baseName_.c_str(),
            method->GetName().c_str(), interfaceName_.c_str());
    } else {
        StringBuilder paramStr;
        paramStr.Append(prefix).AppendFormat("static int32_t %s%s(struct %s *self, ", baseName_.c_str(),
            method->GetName().c_str(), interfaceName_.c_str());
        for (size_t i = 0; i < method->GetParameterNumber(); i++) {
            AutoPtr<ASTParameter> param = method->GetParameter(i);
            EmitInterfaceMethodParameter(param, paramStr, "");
            if (i + 1 < method->GetParameterNumber()) {
                paramStr.Append(", ");
            }
        }

        paramStr.Append(")");
        sb.Append(SpecificationParam(paramStr, prefix + TAB));
        sb.Append("\n");
    }

    sb.Append(prefix).Append("{\n");
    sb.Append(prefix + TAB).Append("return HDF_SUCCESS;\n");
    sb.Append(prefix).Append("}\n");
}

void CServiceImplCodeEmitter::EmitServiceImplGetVersionMethod(StringBuilder &sb, const std::string &prefix)
{
    AutoPtr<ASTMethod> method = interface_->GetVersionMethod();
    sb.Append(prefix).AppendFormat("static int32_t %s%s(struct %s *self, ", baseName_.c_str(),
        method->GetName().c_str(), interfaceName_.c_str());
    for (size_t i = 0; i < method->GetParameterNumber(); i++) {
        AutoPtr<ASTParameter> param = method->GetParameter(i);
        EmitInterfaceMethodParameter(param, sb, "");
        if (i + 1 < method->GetParameterNumber()) {
            sb.Append(", ");
        }
    }
    sb.Append(")\n");
    sb.Append(prefix).Append("{\n");
    AutoPtr<ASTParameter> majorParam = method->GetParameter(0);
    sb.Append(prefix + TAB).AppendFormat("*%s = %s;\n", majorParam->GetName().c_str(), majorVerName_.c_str());
    AutoPtr<ASTParameter> minorParam = method->GetParameter(1);
    sb.Append(prefix + TAB).AppendFormat("*%s = %s;\n", minorParam->GetName().c_str(), minorVerName_.c_str());
    sb.Append(prefix + TAB).Append("return HDF_SUCCESS;\n");
    sb.Append(prefix).Append("}\n");
}

void CServiceImplCodeEmitter::EmitKernelServiceImplGetMethod(StringBuilder &sb)
{
    std::string objName = "service";
    sb.AppendFormat("struct %s *%sGet(void)\n", implName_.c_str(), implName_.c_str());
    sb.Append("{\n");
    sb.Append(TAB).AppendFormat("struct %s *%s = (struct %s *)OsalMemCalloc(sizeof(struct %s));\n",
        implName_.c_str(), objName.c_str(), implName_.c_str(), implName_.c_str());
    sb.Append(TAB).AppendFormat("if (%s == NULL) {\n", objName.c_str());
    sb.Append(TAB).Append(TAB).AppendFormat(
        "HDF_LOGE(\"%%{public}s: malloc %s obj failed!\", __func__);\n", implName_.c_str());
    sb.Append(TAB).Append(TAB).Append("return NULL;\n");
    sb.Append(TAB).Append("}\n\n");
    sb.Append(TAB).AppendFormat("if (!%sStubConstruct(&%s->stub)) {\n", baseName_.c_str(), objName.c_str());
    sb.Append(TAB).Append(TAB).AppendFormat(
        "HDF_LOGE(\"%%{public}s: construct %sStub obj failed!\", __func__);\n", baseName_.c_str());
    sb.Append(TAB).Append(TAB).AppendFormat("OsalMemFree(%s);\n", objName.c_str());
    sb.Append(TAB).Append(TAB).Append("return NULL;\n");
    sb.Append(TAB).Append("}\n\n");

    for (size_t i = 0; i < interface_->GetMethodNumber(); i++) {
        AutoPtr<ASTMethod> method = interface_->GetMethod(i);
        sb.Append(TAB).AppendFormat("%s->stub.interface.%s = %s%s;\n", objName.c_str(), method->GetName().c_str(),
            baseName_.c_str(), method->GetName().c_str());
    }

    sb.Append(TAB).AppendFormat("return service;\n", objName.c_str());
    sb.Append("}\n");
}

void CServiceImplCodeEmitter::EmitServiceImplGetMethod(StringBuilder &sb)
{
    std::string objName = "service";
    if (interface_->IsSerializable()) {
        sb.AppendFormat("struct %s *%sServiceGet(void)\n", interfaceName_.c_str(), baseName_.c_str());
    } else {
        sb.AppendFormat("struct %s *%sImplGetInstance(void)\n", interfaceName_.c_str(), baseName_.c_str());
    }

    sb.Append("{\n");
    sb.Append(TAB).AppendFormat("struct %s *%s = (struct %s *)OsalMemCalloc(sizeof(struct %s));\n",
        implName_.c_str(), objName.c_str(), implName_.c_str(), implName_.c_str());
    sb.Append(TAB).AppendFormat("if (%s == NULL) {\n", objName.c_str());
    sb.Append(TAB).Append(TAB).AppendFormat(
        "HDF_LOGE(\"%%{public}s: malloc %s obj failed!\", __func__);\n", implName_.c_str());
    sb.Append(TAB).Append(TAB).Append("return NULL;\n");
    sb.Append(TAB).Append("}\n\n");

    for (size_t i = 0; i < interface_->GetMethodNumber(); i++) {
        AutoPtr<ASTMethod> method = interface_->GetMethod(i);
        sb.Append(TAB).AppendFormat("%s->interface.%s = %s%s;\n", objName.c_str(), method->GetName().c_str(),
            baseName_.c_str(), method->GetName().c_str());
    }

    AutoPtr<ASTMethod> method = interface_->GetVersionMethod();
    sb.Append(TAB).AppendFormat("%s->interface.%s = %s%s;\n", objName.c_str(), method->GetName().c_str(),
        baseName_.c_str(), method->GetName().c_str());

    sb.Append(TAB).AppendFormat("return &%s->interface;\n", objName.c_str());
    sb.Append("}\n");
}

void CServiceImplCodeEmitter::EmitKernelServiceImplReleaseMethod(StringBuilder &sb)
{
    std::string instName = "instance";
    sb.AppendFormat(
        "void %sRelease(struct %s *%s)\n", implName_.c_str(), implName_.c_str(), instName.c_str());
    sb.Append("{\n");
    sb.Append(TAB).AppendFormat("if (%s == NULL) {\n", instName.c_str());
    sb.Append(TAB).Append(TAB).Append("return;\n");
    sb.Append(TAB).Append("}\n\n");
    sb.Append(TAB).AppendFormat("OsalMemFree(%s);\n", instName.c_str());
    sb.Append("}\n");
}

void CServiceImplCodeEmitter::EmitServiceImplReleaseMethod(StringBuilder &sb)
{
    if (interface_->IsSerializable()) {
        sb.AppendFormat("void %sServiceRelease(struct %s *instance)\n", baseName_.c_str(), interfaceName_.c_str());
    } else {
        sb.AppendFormat("void %sImplRelease(struct %s *instance)\n", baseName_.c_str(), interfaceName_.c_str());
    }
    sb.Append("{\n");
    sb.Append(TAB).Append("if (instance == NULL) {\n");
    sb.Append(TAB).Append(TAB).Append("return;\n");
    sb.Append(TAB).Append("}\n");
    sb.Append(TAB).Append("OsalMemFree(instance);\n");
    sb.Append("}\n");
}
} // namespace HDI
} // namespace OHOS