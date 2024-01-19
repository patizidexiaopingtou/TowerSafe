

#include "hal_sys_param.h"

static const char OHOS_DEVICE_NAME[] = { "TOWERSafe" };
static const char OHOS_CONTRACT_NO[] = { "" };
static const char OHOS_OS_VERSION[] = { "OpenHarmony3.2" };
static const char OHOS_DEVICE_TYPE[] = { "ESP32" };
static const char OHOS_DISPLAY_VERSION[] = { "01.00.00" };
static const char OHOS_MANUFACTURE[] = { "TOWERSafe" };
static const char OHOS_BRAND[] = { "TOWERSafe" };
static const char OHOS_MARKET_NAME[] = { "TOWERSafe" };
static const char OHOS_PRODUCT_SERIES[] = { "TOWERSafe" };
static const char OHOS_PRODUCT_MODEL[] = { "TOWERSafe" };
static const char OHOS_SOFTWARE_MODEL[] = { "ESP32-IDF-OM" };
static const char OHOS_HARDWARE_MODEL[] = { "TOWERSafe-OM" };
static const char OHOS_HARDWARE_PROFILE[] = { "wlan:true" };
static const char OHOS_BOOTLOADER_VERSION[] = { "bootloader" };
static const char OHOS_ABI_LIST[] = { "xtensa-liteos" };
static const char OHOS_SECURITY_PATCH_TAG[] = { "2022/3/18" };
static const char OHOS_SERIAL[] = { "1234567890" };
static const int OHOS_FIRST_API_VERSION = 1;

const char* HalGetDeviceName(void)
{
    return OHOS_DEVICE_NAME;
}

const char* HalGetContractNo(void)
{
    return OHOS_CONTRACT_NO;
}

const char* HalGetOsVersion(void)
{
    return OHOS_OS_VERSION;
}

const char* HalGetSecurityPatchTag(void)
{
    return OHOS_SECURITY_PATCH_TAG;
}

const char* HalGetDeviceType(void)
{
    return OHOS_DEVICE_TYPE;
}

const char* HalGetManufacture(void)
{
    return OHOS_MANUFACTURE;
}

const char* HalGetBrand(void)
{
    return OHOS_BRAND;
}

const char* HalGetMarketName(void)
{
    return OHOS_MARKET_NAME;
}

const char* HalGetProductSeries(void)
{
    return OHOS_PRODUCT_SERIES;
}

const char* HalGetProductModel(void)
{
    return OHOS_PRODUCT_MODEL;
}

const char* HalGetSoftwareModel(void)
{
    return OHOS_SOFTWARE_MODEL;
}

const char* HalGetHardwareModel(void)
{
    return OHOS_HARDWARE_MODEL;
}

const char* HalGetHardwareProfile(void)
{
    return OHOS_HARDWARE_PROFILE;
}

const char* HalGetSerial(void)
{
    return OHOS_SERIAL;
}

const char* HalGetBootloaderVersion(void)
{
    return OHOS_BOOTLOADER_VERSION;
}

const char* HalGetAbiList(void)
{
    return OHOS_ABI_LIST;
}

const char* HalGetDisplayVersion(void)
{
    return OHOS_DISPLAY_VERSION;
}

const char* HalGetIncrementalVersion(void)
{
    return INCREMENTAL_VERSION;
}

const char* HalGetBuildType(void)
{
    return BUILD_TYPE;
}

const char* HalGetBuildUser(void)
{
    return BUILD_USER;
}

const char* HalGetBuildHost(void)
{
    return BUILD_HOST;
}

const char* HalGetBuildTime(void)
{
    return BUILD_TIME;
}

int HalGetFirstApiVersion(void)
{
    return OHOS_FIRST_API_VERSION;
}
