

#include "hal_token.h"
#include "ohos_errno.h"
#include "ohos_types.h"

 /* productkey adn ProductSecret */
static char ProductSecret[] = { "ec76e4a427446224" };
static char ProductKey[] = { "k0bvhXvUX" };  // ProductKey by OEM.

static int OEMReadToken(char* token, unsigned int len)
{
    // OEM need add here, read token from device
    (void)(token);
    (void)(len);
    return EC_SUCCESS;
}

static int OEMWriteToken(const char* token, unsigned int len)
{
    // OEM need add here, write token to device
    (void)(token);
    (void)(len);
    return EC_SUCCESS;
}

static int OEMGetAcKey(char* acKey, unsigned int len)
{
    // OEM need add here, get AcKey
    (void)(acKey);
    (void)(len);
    return EC_SUCCESS;
}

static int OEMGetProdId(char* productId, unsigned int len)
{
    // OEM need add here, get ProdId
    (void)(productId);
    (void)(len);
    return EC_SUCCESS;
}

static int OEMGetProdKey(char* productKey, unsigned int len)
{
    int ret;
    ret = memcpy_s(productKey, len, ProductKey, strlen(ProductKey));
    if (ret != 0) {
        return EC_FAILURE;
    }
    return EC_SUCCESS;
}
static int OEMGetProductSecret(char* productSecret, unsigned int len)
{
    int ret;
    ret = memcpy_s(productSecret, len, ProductSecret, strlen(ProductSecret));
    if (ret != 0) {
        return EC_FAILURE;
    }
    return EC_SUCCESS;
}

int HalReadToken(char* token, unsigned int len)
{
    if (token == NULL) {
        return EC_FAILURE;
    }
    return OEMReadToken(token, len);
}

int HalWriteToken(const char* token, unsigned int len)
{
    if (token == NULL) {
        return EC_FAILURE;
    }
    return OEMWriteToken(token, len);
}

int HalGetAcKey(char* acKey, unsigned int len)
{
    if (acKey == NULL) {
        return EC_FAILURE;
    }
    return OEMGetAcKey(acKey, len);
}

int HalGetProdId(char* productId, unsigned int len)
{
    if (productId == NULL) {
        return EC_FAILURE;
    }
    return OEMGetProdId(productId, len);
}

int HalGetProdKey(char* productKey, unsigned int len)
{
    if (productKey == NULL) {
        return EC_FAILURE;
    }
    return OEMGetProdKey(productKey, len);
}

int HalGetProductSecret(char* productSecret, unsigned int len)
{
    if (productSecret == NULL) {
        return EC_FAILURE;
    }
    return OEMGetProductSecret(productSecret, len);
}
