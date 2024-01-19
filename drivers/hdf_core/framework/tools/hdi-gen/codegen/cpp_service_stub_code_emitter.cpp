/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 *
 * HDF is dual licensed: you can use it either under the terms of
 * the GPL, or the BSD license, at your option.
 * See the LICENSE file in the root of this repository for complete details.
 */

#include "codegen/cpp_service_stub_code_emitter.h"
#include "util/file.h"
#include "util/logger.h"

namespace OHOS {
namespace HDI {
bool CppServiceStubCodeEmitter::ResolveDirectory(const std::string &targetDirectory)
{
    if (ast_->GetASTFileType() == ASTFileType::AST_IFACE || ast_->GetASTFileType() == ASTFileType::AST_ICALLBACK) {
        directory_ = GetFileParentPath(targetDirectory);
    } else {
        return false;
    }

    if (!File::CreateParentDir(directory_)) {
        Logger::E("CppServiceStubCodeEmitter", "Create '%s' failed!", directory_.c_str());
        return false;
    }

    return true;
}

void CppServiceStubCodeEmitter::EmitCode()
{
    if (!Options::GetInstance().DoPassthrough()) {
        EmitStubHeaderFile();
        EmitStubSourceFile();
    }
}

void CppServiceStubCodeEmitter::EmitStubHeaderFile()
{
    std::string filePath =
        File::AdapterPath(StringHelper::Format("%s/%s.h", directory_.c_str(), FileName(stubName_).c_str()));
    File file(filePath, File::WRITE);
    StringBuilder sb;

    EmitLicense(sb);
    EmitHeadMacro(sb, stubFullName_);
    sb.Append("\n");
    EmitStubHeaderInclusions(sb);
    sb.Append("\n");
    EmitStubDecl(sb);
    sb.Append("\n");
    EmitTailMacro(sb, stubFullName_);

    std::string data = sb.ToString();
    file.WriteData(data.c_str(), data.size());
    file.Flush();
    file.Close();
}

void CppServiceStubCodeEmitter::EmitStubHeaderInclusions(StringBuilder &sb)
{
    HeaderFile::HeaderFileSet headerFiles;

    headerFiles.emplace(HeaderFileType::OWN_MODULE_HEADER_FILE, EmitVersionHeaderName(interfaceName_));
    GetHeaderOtherLibInclusions(headerFiles);

    for (const auto &file : headerFiles) {
        sb.AppendFormat("%s\n", file.ToString().c_str());
    }
}

void CppServiceStubCodeEmitter::GetHeaderOtherLibInclusions(HeaderFile::HeaderFileSet &headerFiles)
{
    headerFiles.emplace(HeaderFileType::OTHER_MODULES_HEADER_FILE, "message_parcel");
    headerFiles.emplace(HeaderFileType::OTHER_MODULES_HEADER_FILE, "message_option");
    headerFiles.emplace(HeaderFileType::OTHER_MODULES_HEADER_FILE, "ipc_object_stub");
    headerFiles.emplace(HeaderFileType::OTHER_MODULES_HEADER_FILE, "object_collector");
    headerFiles.emplace(HeaderFileType::OTHER_MODULES_HEADER_FILE, "refbase");
}

void CppServiceStubCodeEmitter::EmitStubDecl(StringBuilder &sb)
{
    EmitBeginNamespace(sb);
    sb.Append("\n");
    EmitStubUsingNamespace(sb);
    sb.AppendFormat("class %s : public IPCObjectStub {\n", stubName_.c_str());
    EmitStubBody(sb, TAB);
    sb.Append("};\n");
    EmitEndNamespace(sb);
}

void CppServiceStubCodeEmitter::EmitStubUsingNamespace(StringBuilder &sb)
{
    sb.Append("using namespace OHOS;\n");
}

void CppServiceStubCodeEmitter::EmitStubBody(StringBuilder &sb, const std::string &prefix)
{
    sb.Append("public:\n");
    EmitStubConstructorDecl(sb, prefix);
    sb.Append("\n");
    EmitStubOnRequestDecl(sb, prefix);
    sb.Append("\n");
    EmitStubMethodDecls(sb, prefix);
    sb.Append("\n");
    EmitStubPrivateData(sb, prefix);
}

void CppServiceStubCodeEmitter::EmitStubConstructorDecl(StringBuilder &sb, const std::string &prefix)
{
    sb.Append(prefix).AppendFormat("explicit %s(const sptr<%s> &impl);\n", stubName_.c_str(), interfaceName_.c_str());
    sb.Append(prefix).AppendFormat("virtual ~%s();\n", stubName_.c_str());
}

void CppServiceStubCodeEmitter::EmitStubOnRequestDecl(StringBuilder &sb, const std::string &prefix)
{
    sb.Append(prefix).Append("int32_t OnRemoteRequest(uint32_t code, MessageParcel &data, MessageParcel &reply, ");
    sb.Append("MessageOption &option) override;\n");
}

void CppServiceStubCodeEmitter::EmitStubMethodDecls(StringBuilder &sb, const std::string &prefix)
{
    sb.Append("private:\n");
    for (size_t i = 0; i < interface_->GetMethodNumber(); i++) {
        AutoPtr<ASTMethod> method = interface_->GetMethod(i);
        EmitStubMethodDecl(method, sb, prefix);
        sb.Append("\n");
    }
    EmitStubMethodDecl(interface_->GetVersionMethod(), sb, prefix);
}

void CppServiceStubCodeEmitter::EmitStubMethodDecl(
    const AutoPtr<ASTMethod> &method, StringBuilder &sb, const std::string &prefix)
{
    sb.Append(prefix).AppendFormat("int32_t %s%s(MessageParcel& %s, MessageParcel& %s, MessageOption& %s);\n",
        stubName_.c_str(), method->GetName().c_str(), dataParcelName_.c_str(), replyParcelName_.c_str(),
        optionName_.c_str());
}

void CppServiceStubCodeEmitter::EmitStubPrivateData(StringBuilder &sb, const std::string &prefix)
{
    sb.Append("private:\n");
    sb.Append(prefix).AppendFormat(
        "static inline ObjectDelegator<%s, %s> objDelegator_;\n", stubName_.c_str(), interfaceName_.c_str());
    sb.Append(prefix).AppendFormat("sptr<%s> impl_;\n", interfaceName_.c_str());
}

void CppServiceStubCodeEmitter::EmitStubSourceFile()
{
    std::string filePath =
        File::AdapterPath(StringHelper::Format("%s/%s.cpp", directory_.c_str(), FileName(stubName_).c_str()));
    File file(filePath, File::WRITE);
    StringBuilder sb;

    EmitLicense(sb);
    EmitStubSourceInclusions(sb);
    sb.Append("\n");
    EmitLogTagMacro(sb, FileName(stubName_));
    sb.Append("\n");
    EmitBeginNamespace(sb);
    UtilMethodMap utilMethods;
    GetUtilMethods(utilMethods);
    EmitUtilMethods(sb, "", utilMethods, true);
    sb.Append("\n");
    EmitUtilMethods(sb, "", utilMethods, false);
    sb.Append("\n");
    EmitInterfaceGetMethodImpl(sb, "");
    sb.Append("\n");
    EmitStubConstructorImpl(sb, "");
    sb.Append("\n");
    EmitStubOnRequestMethodImpl(sb, "");
    sb.Append("\n");
    EmitStubMethodImpls(sb, "");
    EmitEndNamespace(sb);

    std::string data = sb.ToString();
    file.WriteData(data.c_str(), data.size());
    file.Flush();
    file.Close();
}

void CppServiceStubCodeEmitter::EmitStubSourceInclusions(StringBuilder &sb)
{
    HeaderFile::HeaderFileSet headerFiles;
    headerFiles.emplace(HeaderFileType::OWN_HEADER_FILE, EmitVersionHeaderName(stubName_));
    GetSourceOtherLibInclusions(headerFiles);

    for (const auto &file : headerFiles) {
        sb.AppendFormat("%s\n", file.ToString().c_str());
    }
}

void CppServiceStubCodeEmitter::GetSourceOtherLibInclusions(HeaderFile::HeaderFileSet &headerFiles)
{
    if (!interface_->IsSerializable()) {
        headerFiles.emplace(HeaderFileType::OTHER_MODULES_HEADER_FILE, "securec");
        headerFiles.emplace(HeaderFileType::OTHER_MODULES_HEADER_FILE, "string_ex");
        headerFiles.emplace(HeaderFileType::OTHER_MODULES_HEADER_FILE, "hdi_support");
    } else {
        const AST::TypeStringMap &types = ast_->GetTypes();
        for (const auto &pair : types) {
            AutoPtr<ASTType> type = pair.second;
            if (type->GetTypeKind() == TypeKind::TYPE_UNION) {
                headerFiles.emplace(HeaderFileType::OTHER_MODULES_HEADER_FILE, "securec");
                break;
            }
        }
    }

    for (size_t methodIndex = 0; methodIndex < interface_->GetMethodNumber(); methodIndex++) {
        AutoPtr<ASTMethod> method = interface_->GetMethod(methodIndex);
        for (size_t paramIndex = 0; paramIndex < method->GetParameterNumber(); paramIndex++) {
            AutoPtr<ASTParameter> param = method->GetParameter(paramIndex);
            AutoPtr<ASTType> paramType = param->GetType();
            if (param->GetAttribute() == ParamAttr::PARAM_IN &&
                (param->GetType()->IsInterfaceType() || paramType->HasInnerType(TypeKind::TYPE_INTERFACE))) {
                headerFiles.emplace(HeaderFileType::OTHER_MODULES_HEADER_FILE, "iproxy_broker");
            }

            if (param->GetAttribute() == ParamAttr::PARAM_OUT &&
                (param->GetType()->IsInterfaceType() || paramType->HasInnerType(TypeKind::TYPE_INTERFACE))) {
                headerFiles.emplace(HeaderFileType::OTHER_MODULES_HEADER_FILE, "object_collector");
            }
        }
    }

    headerFiles.emplace(HeaderFileType::OTHER_MODULES_HEADER_FILE, "hdf_base");
    headerFiles.emplace(HeaderFileType::OTHER_MODULES_HEADER_FILE, "hdf_log");
}

void CppServiceStubCodeEmitter::EmitInterfaceGetMethodImpl(StringBuilder &sb, const std::string &prefix)
{
    if (!interface_->IsSerializable()) {
        EmitGetMethodImpl(sb, prefix);
        sb.Append(prefix).Append("\n");
        EmitGetInstanceMethodImpl(sb, prefix);
        sb.Append(prefix).Append("\n");
    }
}

void CppServiceStubCodeEmitter::EmitGetMethodImpl(StringBuilder &sb, const std::string &prefix)
{
    sb.Append(prefix).AppendFormat(
        "sptr<%s> %s::Get(bool isStub)\n", interface_->GetName().c_str(), interface_->GetName().c_str());
    sb.Append(prefix).Append("{\n");
    sb.Append(prefix + TAB)
        .AppendFormat("return %s::Get(\"%s\", isStub);\n", interfaceName_.c_str(), FileName(implName_).c_str());
    sb.Append(prefix).Append("}\n");
}

void CppServiceStubCodeEmitter::EmitGetInstanceMethodImpl(StringBuilder &sb, const std::string &prefix)
{
    sb.Append(prefix).AppendFormat("sptr<%s> %s::Get(const std::string& serviceName, bool isStub)\n",
        interface_->GetName().c_str(), interface_->GetName().c_str());
    sb.Append(prefix).Append("{\n");

    sb.Append(prefix + TAB).Append("if (!isStub) {\n");
    sb.Append(prefix + TAB + TAB).Append("return nullptr;\n");
    sb.Append(prefix + TAB).Append("}\n");

    sb.Append(prefix + TAB)
        .AppendFormat("std::string desc = Str16ToStr8(%s::GetDescriptor());\n", interfaceName_.c_str());
    sb.Append(prefix + TAB).Append("void *impl = LoadHdiImpl(desc.c_str(), ");
    sb.AppendFormat("serviceName == \"%s\" ? \"service\" : serviceName.c_str());\n", FileName(implName_).c_str());
    sb.Append(prefix + TAB).Append("if (impl == nullptr) {\n");
    sb.Append(prefix + TAB + TAB).Append("HDF_LOGE(\"failed to load hdi impl %{public}s\", desc.c_str());\n");
    sb.Append(prefix + TAB + TAB).Append("return nullptr;\n");
    sb.Append(prefix + TAB).Append("}\n");
    sb.Append(prefix + TAB).AppendFormat("return reinterpret_cast<%s *>(impl);\n", interfaceName_.c_str());
    sb.Append(prefix).Append("}\n");
}

void CppServiceStubCodeEmitter::EmitStubConstructorImpl(StringBuilder &sb, const std::string &prefix)
{
    sb.Append(prefix).AppendFormat(
        "%s::%s(const sptr<%s> &impl)\n", stubName_.c_str(), stubName_.c_str(), interfaceName_.c_str());
    sb.Append(prefix + TAB).AppendFormat(": IPCObjectStub(%s::GetDescriptor()), impl_(impl)\n", interfaceName_.c_str());
    sb.Append(prefix).Append("{\n");
    sb.Append(prefix).Append("}\n\n");

    sb.Append(prefix).AppendFormat("%s::~%s()\n", stubName_.c_str(), stubName_.c_str());
    sb.Append(prefix).Append("{\n");
    sb.Append(prefix + TAB).Append("ObjectCollector::GetInstance().RemoveObject(impl_);\n");
    sb.Append(prefix).Append("}\n");
}

void CppServiceStubCodeEmitter::EmitStubOnRequestMethodImpl(StringBuilder &sb, const std::string &prefix)
{
    sb.Append(prefix).AppendFormat("int32_t %s::OnRemoteRequest(uint32_t code, ", stubName_.c_str());
    sb.Append("MessageParcel& data, MessageParcel& reply, MessageOption& option)\n");
    sb.Append(prefix).Append("{\n");

    sb.Append(prefix + TAB).Append("switch (code) {\n");

    for (size_t i = 0; i < interface_->GetMethodNumber(); i++) {
        AutoPtr<ASTMethod> method = interface_->GetMethod(i);
        sb.Append(prefix + TAB + TAB).AppendFormat("case %s:\n", EmitMethodCmdID(method).c_str());
        sb.Append(prefix + TAB + TAB + TAB)
            .AppendFormat("return %sStub%s(data, reply, option);\n", baseName_.c_str(), method->GetName().c_str());
    }

    AutoPtr<ASTMethod> getVerMethod = interface_->GetVersionMethod();
    sb.Append(prefix + TAB + TAB).AppendFormat("case %s:\n", EmitMethodCmdID(getVerMethod).c_str());
    sb.Append(prefix + TAB + TAB + TAB)
        .AppendFormat("return %sStub%s(data, reply, option);\n", baseName_.c_str(), getVerMethod->GetName().c_str());

    sb.Append(prefix + TAB + TAB).Append("default: {\n");
    sb.Append(prefix + TAB + TAB + TAB)
        .Append("HDF_LOGE(\"%{public}s: cmd %{public}d is not supported\", __func__, code);\n");
    sb.Append(prefix + TAB + TAB + TAB).Append("return IPCObjectStub::OnRemoteRequest(code, data, reply, option);\n");
    sb.Append(prefix + TAB + TAB).Append("}\n");
    sb.Append(prefix + TAB).Append("}\n");
    sb.Append("}\n");
}

void CppServiceStubCodeEmitter::EmitStubMethodImpls(StringBuilder &sb, const std::string &prefix)
{
    for (size_t i = 0; i < interface_->GetMethodNumber(); i++) {
        AutoPtr<ASTMethod> method = interface_->GetMethod(i);
        EmitStubMethodImpl(method, sb, prefix);
        sb.Append("\n");
    }

    EmitStubMethodImpl(interface_->GetVersionMethod(), sb, prefix);
}

void CppServiceStubCodeEmitter::EmitStubMethodImpl(
    const AutoPtr<ASTMethod> &method, StringBuilder &sb, const std::string &prefix)
{
    sb.Append(prefix).AppendFormat("int32_t %s::%s%s(MessageParcel& %s, MessageParcel& %s, MessageOption& %s)\n",
        stubName_.c_str(), stubName_.c_str(), method->GetName().c_str(), dataParcelName_.c_str(),
        replyParcelName_.c_str(), optionName_.c_str());
    sb.Append(prefix).Append("{\n");

    // read interface token and check it
    EmitStubReadInterfaceToken(dataParcelName_, sb, prefix + TAB);
    sb.Append("\n");

    EmitStubReadMemFlag(method, dataParcelName_, sb, prefix + TAB);

    for (size_t i = 0; i < method->GetParameterNumber(); i++) {
        AutoPtr<ASTParameter> param = method->GetParameter(i);
        if (param->GetAttribute() == ParamAttr::PARAM_IN) {
            EmitReadMethodParameter(param, dataParcelName_, true, sb, prefix + TAB);
            sb.Append("\n");
        } else {
            EmitLocalVariable(param, dataParcelName_, sb, prefix + TAB);
            sb.Append("\n");
        }
    }

    EmitStubCallMethod(method, sb, prefix + TAB);
    sb.Append("\n");

    if (!method->IsOneWay()) {
        for (size_t i = 0; i < method->GetParameterNumber(); i++) {
            AutoPtr<ASTParameter> param = method->GetParameter(i);
            if (param->GetAttribute() == ParamAttr::PARAM_OUT) {
                EmitWriteMethodParameter(param, replyParcelName_, sb, prefix + TAB);
                sb.Append("\n");
            }
        }
    }

    sb.Append(prefix + TAB).AppendFormat("return %s;\n", errorCodeName_.c_str());
    sb.Append("}\n");
}

void CppServiceStubCodeEmitter::EmitStubCallMethod(
    const AutoPtr<ASTMethod> &method, StringBuilder &sb, const std::string &prefix)
{
    sb.Append(prefix).AppendFormat("int32_t %s = impl_->%s(", errorCodeName_.c_str(), method->GetName().c_str());
    for (size_t i = 0; i < method->GetParameterNumber(); i++) {
        AutoPtr<ASTParameter> param = method->GetParameter(i);
        sb.Append(param->GetName());
        if (i + 1 < method->GetParameterNumber()) {
            sb.Append(", ");
        }
    }
    sb.Append(");\n");

    sb.Append(prefix).AppendFormat("if (%s != HDF_SUCCESS) {\n", errorCodeName_.c_str());
    sb.Append(prefix + TAB)
        .AppendFormat("HDF_LOGE(\"%%{public}s failed, error code is %%d\", __func__, %s);\n", errorCodeName_.c_str());
    sb.Append(prefix + TAB).AppendFormat("return %s;\n", errorCodeName_.c_str());
    sb.Append(prefix).Append("}\n");
}

void CppServiceStubCodeEmitter::EmitStubReadInterfaceToken(
    const std::string &parcelName, StringBuilder &sb, const std::string &prefix)
{
    sb.Append(prefix).AppendFormat(
        "if (%s.ReadInterfaceToken() != %s::GetDescriptor()) {\n", parcelName.c_str(), interfaceName_.c_str());
    sb.Append(prefix + TAB).AppendFormat("HDF_LOGE(\"%%{public}s: interface token check failed!\", __func__);\n");
    sb.Append(prefix + TAB).AppendFormat("return HDF_ERR_INVALID_PARAM;\n");
    sb.Append(prefix).Append("}\n");
}

void CppServiceStubCodeEmitter::EmitStubReadMemFlag(
    const AutoPtr<ASTMethod> &method, const std::string &parcelName, StringBuilder &sb, const std::string &prefix)
{
    if (NeedFlag(method)) {
        sb.Append(prefix).AppendFormat("bool %s = false;\n", flagOfSetMemName_.c_str());
        sb.Append(prefix).AppendFormat("if (!%s.ReadBool(%s)) {\n", parcelName.c_str(), flagOfSetMemName_.c_str());
        sb.Append(prefix + TAB)
            .AppendFormat("HDF_LOGE(\"%%{public}s: failed to read %s\", __func__);\n", flagOfSetMemName_.c_str());
        sb.Append(prefix + TAB).Append("return HDF_ERR_INVALID_PARAM;\n");
        sb.Append(prefix).Append("}\n");
    }
}

void CppServiceStubCodeEmitter::EmitLocalVariable(
    const AutoPtr<ASTParameter> &param, const std::string &parcelName, StringBuilder &sb, const std::string &prefix)
{
    sb.Append(prefix).Append(param->EmitCppLocalVar()).Append("\n");
    AutoPtr<ASTType> type = param->GetType();
    if (!type->IsStringType() && !type->IsArrayType() && !type->IsListType()) {
        return;
    }

    sb.Append(prefix).AppendFormat("if (%s) {\n", flagOfSetMemName_.c_str());
    std::string capacityName = "capacity";
    sb.Append(prefix + TAB).AppendFormat("uint32_t %s = 0;\n", capacityName.c_str());
    sb.Append(prefix + TAB).AppendFormat("if (!%s.ReadUint32(%s)) {\n", parcelName.c_str(), capacityName.c_str());
    sb.Append(prefix + TAB + TAB).AppendFormat("HDF_LOGE(\"%%{public}s: failed to read %s\", __func__);\n",
        capacityName.c_str());
    sb.Append(prefix + TAB + TAB).Append("return HDF_ERR_INVALID_PARAM;\n");
    sb.Append(prefix + TAB).Append("}\n");

    if (type->IsStringType()) {
        sb.Append(prefix + TAB).AppendFormat("%s(%s, >, %s / sizeof(char), HDF_ERR_INVALID_PARAM);\n",
            CHECK_VALUE_RETURN_MACRO, capacityName.c_str(), MAX_BUFF_SIZE_MACRO);
    } else {
        AutoPtr<ASTArrayType> arrayType = dynamic_cast<ASTArrayType *>(type.Get());
        sb.Append(prefix + TAB).AppendFormat("%s(%s, >, %s / sizeof(%s), HDF_ERR_INVALID_PARAM);\n",
            CHECK_VALUE_RETURN_MACRO, capacityName.c_str(), MAX_BUFF_SIZE_MACRO,
            arrayType->GetElementType()->EmitCppType().c_str());
    }
    sb.Append(prefix + TAB).AppendFormat("%s.reserve(%s);\n", param->GetName().c_str(), capacityName.c_str());
    sb.Append(prefix).Append("}\n");
}

void CppServiceStubCodeEmitter::GetUtilMethods(UtilMethodMap &methods)
{
    for (size_t methodIndex = 0; methodIndex < interface_->GetMethodNumber(); methodIndex++) {
        AutoPtr<ASTMethod> method = interface_->GetMethod(methodIndex);
        for (size_t paramIndex = 0; paramIndex < method->GetParameterNumber(); paramIndex++) {
            AutoPtr<ASTParameter> param = method->GetParameter(paramIndex);
            AutoPtr<ASTType> paramType = param->GetType();
            if (param->GetAttribute() == ParamAttr::PARAM_IN) {
                paramType->RegisterReadMethod(Options::GetInstance().GetTargetLanguage(), SerMode::STUB_SER, methods);
            } else {
                paramType->RegisterWriteMethod(Options::GetInstance().GetTargetLanguage(), SerMode::STUB_SER, methods);
            }
        }
    }
}
} // namespace HDI
} // namespace OHOS