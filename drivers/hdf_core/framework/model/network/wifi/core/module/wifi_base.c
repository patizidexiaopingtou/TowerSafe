/*
 * Copyright (c) 2020-2022 Huawei Device Co., Ltd.
 *
 * HDF is dual licensed: you can use it either under the terms of
 * the GPL, or the BSD license, at your option.
 * See the LICENSE file in the root of this repository for complete details.
 */
#include "wifi_base.h"
#include "../hdf_wifi_core.h"
#include "eapol.h"
#include "hdf_wifi_event.h"
#include "hdf_wlan_chipdriver_manager.h"
#include "hdf_wlan_config.h"
#include "hdf_wlan_services.h"
#include "hdf_wlan_utils.h"
#include "message/message_router.h"
#include "message/sidecar.h"
#include "securec.h"
#include "wifi_mac80211_ops.h"
#include "wifi_module.h"

#define HDF_LOG_TAG HDF_WIFI_CORE

#ifndef TRUE
#define TRUE 1
#endif
#ifndef FALSE
#define FALSE 0
#endif

#define WIFI_24G_CHANNEL_NUM       14
#define WIFI_MAX_CHANNEL_NUM       24
#define DEFAULT_EAPOL_PACKAGE_SIZE 800
#define RATE_LENGTH 6
Service *g_baseService = NULL;

struct HdfWifiEventToClientMap g_hdfWifiEventToClientMap;
struct HdfWifiEventToClientMap *HdfWifiGetEventToClientMap(void)
{
    return &g_hdfWifiEventToClientMap;
}

inline static uint32_t EnableEapol(struct NetDevice *netdev, WifiEnableEapol *param)
{
    const struct Eapol *eapol = EapolGetInstance();
    return eapol->eapolOp->enableEapol(netdev, (struct EapolEnable *)param);
}
inline static uint32_t DisableEapol(struct NetDevice *netdev)
{
    const struct Eapol *eapol = EapolGetInstance();
    return eapol->eapolOp->disableEapol(netdev);
}
inline static uint32_t SendEapol(struct NetDevice *netdev, WifiTxEapol *txData)
{
    const struct Eapol *eapol = EapolGetInstance();
    return eapol->eapolOp->sendEapol(netdev, (struct EapolTx *)txData);
}
inline static uint32_t ReceiveEapol(struct NetDevice *netdev, WifiRxEapol *rxData)
{
    const struct Eapol *eapol = EapolGetInstance();
    return eapol->eapolOp->getEapol(netdev, (struct EapolRx *)rxData);
}

static uint32_t SetMode(struct NetDevice *netDev, uint8_t iftype)
{
    struct HdfChipDriver *chipDriver = GetChipDriver(netDev);
    if (chipDriver == NULL) {
        HDF_LOGE("%s:bad net device found!", __func__);
        return HDF_FAILURE;
    }
    RETURN_IF_CHIPOPS_NOT_IMPLEMENT(chipDriver->ops, SetMode);
    return chipDriver->ops->SetMode(netDev, iftype);
}

static uint32_t AddKey(
    struct NetDevice *netDev, uint8_t keyIndex, bool pairwise, const uint8_t *macAddr, struct KeyParams *params)
{
    struct HdfChipDriver *chipDriver = GetChipDriver(netDev);
    if (chipDriver == NULL) {
        HDF_LOGE("%s:bad net device found!", __func__);
        return HDF_FAILURE;
    }
    RETURN_IF_CHIPOPS_NOT_IMPLEMENT(chipDriver->ops, AddKey);
    return chipDriver->ops->AddKey(netDev, keyIndex, pairwise, macAddr, params);
}

static uint32_t DelKey(struct NetDevice *netDev, uint8_t keyIndex, bool pairwise, const uint8_t *macAddr)
{
    struct HdfChipDriver *chipDriver = GetChipDriver(netDev);
    if (chipDriver == NULL) {
        HDF_LOGE("%s:bad net device found!", __func__);
        return HDF_FAILURE;
    }
    RETURN_IF_CHIPOPS_NOT_IMPLEMENT(chipDriver->ops, DelKey);
    return chipDriver->ops->DelKey(netDev, keyIndex, pairwise, macAddr);
}

static uint32_t SetDefaultKey(struct NetDevice *netDev, uint8_t keyIndex, bool unicast, bool multicast)
{
    struct HdfChipDriver *chipDriver = GetChipDriver(netDev);
    if (chipDriver == NULL) {
        HDF_LOGE("%s:bad net device found!", __func__);
        return HDF_FAILURE;
    }
    RETURN_IF_CHIPOPS_NOT_IMPLEMENT(chipDriver->ops, SetDefaultKey);
    return chipDriver->ops->SetDefaultKey(netDev, keyIndex, unicast, multicast);
}

static void WifiSetKeyParams(const WifiKeyExt *keyExt, struct KeyParams *params, int8_t *pairwise)
{
    params->key = (uint8_t *)(keyExt->key);
    params->keyLen = (int32_t)keyExt->keyLen;
    params->seqLen = (int32_t)keyExt->seqLen;
    params->seq = keyExt->seq;
    params->cipher = keyExt->cipher;
    *pairwise = (keyExt->type == WIFI_KEYTYPE_PAIRWISE);
}

static int32_t WifiCmdFillKeyInner(struct HdfSBuf *reqData, WifiKeyExt *keyExt)
{
    uint32_t len = 0;

    if (!HdfSbufReadInt32(reqData, &(keyExt->type)) || keyExt == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "type");
        return HDF_FAILURE;
    }
    if (!HdfSbufReadUint32(reqData, &(keyExt->keyIdx)) || keyExt == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "keyIdx");
        return HDF_FAILURE;
    }
    if (!HdfSbufReadUint32(reqData, &(keyExt->cipher)) || keyExt == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "cipher");
        return HDF_FAILURE;
    }
    if (!HdfSbufReadUint8(reqData, &(keyExt->def)) || keyExt == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "def");
        return HDF_FAILURE;
    }
    if (!HdfSbufReadUint8(reqData, &(keyExt->defMgmt)) || keyExt == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "defMgmt");
        return HDF_FAILURE;
    }
    if (!HdfSbufReadUint8(reqData, &(keyExt->defaultTypes)) || keyExt == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "defaultTypes");
        return HDF_FAILURE;
    }
    if (!HdfSbufReadUint8(reqData, &(keyExt->resv)) || keyExt == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "resv");
        return HDF_FAILURE;
    }
    if (!HdfSbufReadBuffer(reqData, (const void **)&(keyExt->addr), &len)) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "addr");
        return HDF_FAILURE;
    }
    if (!HdfSbufReadBuffer(reqData, (const void **)&(keyExt->key), &(keyExt->keyLen))) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "key");
        return HDF_FAILURE;
    }
    if (!HdfSbufReadBuffer(reqData, (const void **)&(keyExt->seq), &(keyExt->seqLen))) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "seq");
        return HDF_FAILURE;
    }
    return HDF_SUCCESS;
}

static int32_t WifiCmdNewKey(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    struct NetDevice *netDev = NULL;
    struct KeyParams params;
    int8_t pairwise;
    WifiKeyExt *keyExt = NULL;
    const char *ifName = NULL;
    int32_t ret = 0;

    (void)context;
    (void)rspData;
    if (reqData == NULL) {
        HDF_LOGE("%s: reqData is NULL", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }
    keyExt = (WifiKeyExt *)OsalMemCalloc(sizeof(WifiKeyExt));
    if (keyExt == NULL) {
        HDF_LOGE("%s:keyExt OsalMemCalloc failed", __func__);
        return HDF_FAILURE;
    }
    if (WifiCmdFillKeyInner(reqData, keyExt) != HDF_SUCCESS) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "keyExt");
        OsalMemFree(keyExt);
        return HDF_FAILURE;
    }

    netDev = NetDeviceGetInstByName(ifName);
    if (netDev == NULL) {
        HDF_LOGE("%s:netDev not found!ifName=%s", __func__, ifName);
        OsalMemFree(keyExt);
        return HDF_FAILURE;
    }

    (void)memset_s(&params, sizeof(struct KeyParams), 0, sizeof(struct KeyParams));
    WifiSetKeyParams(keyExt, &params, &pairwise);
    ret = AddKey(netDev, keyExt->keyIdx, pairwise, keyExt->addr, &params);
    OsalMemFree(keyExt);
    HDF_LOGD("%s: Wifi cmd newKey finished!", __func__);
    return ret;
}

static int32_t WifiCmdDelKey(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    int8_t pairwise;
    struct NetDevice *netDev = NULL;
    WifiKeyExt *keyExt = NULL;
    const char *ifName = NULL;
    int32_t ret = 0;

    (void)context;
    (void)rspData;
    if (reqData == NULL) {
        HDF_LOGE("%s: reqData is NULL", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }
    keyExt = (WifiKeyExt *)OsalMemCalloc(sizeof(WifiKeyExt));
    if (keyExt == NULL) {
        HDF_LOGE("%s:keyExt OsalMemCalloc failed", __func__);
        return HDF_FAILURE;
    }
    if (WifiCmdFillKeyInner(reqData, keyExt) != HDF_SUCCESS) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "keyExt");
        OsalMemFree(keyExt);
        return HDF_FAILURE;
    }

    netDev = NetDeviceGetInstByName(ifName);
    if (netDev == NULL) {
        HDF_LOGE("%s:netDev not found!ifName=%s", __func__, ifName);
        OsalMemFree(keyExt);
        return HDF_FAILURE;
    }

    pairwise = (keyExt->type == WIFI_KEYTYPE_PAIRWISE);
    ret = DelKey(netDev, keyExt->keyIdx, pairwise, keyExt->addr);
    OsalMemFree(keyExt);
    return ret;
}

static uint8_t WifiGetMulticast(WifiKeyExt *keyExt)
{
    uint8_t multicast = FALSE;

    if (keyExt->def == TRUE) {
        multicast = TRUE;
    }
    if (keyExt->defMgmt == TRUE) {
        multicast = TRUE;
    }
    if (keyExt->defaultTypes == WIFI_KEY_DEFAULT_TYPE_MULTICAST) {
        multicast = TRUE;
    }
    HDF_LOGD("%s: WifiGetMulticast finished!", __func__);
    return multicast;
}

static int32_t WifiCmdSetKey(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    uint8_t index;
    uint8_t unicast;
    uint8_t multicast;
    struct NetDevice *netDev = NULL;
    WifiKeyExt *keyExt = NULL;
    const char *ifName = NULL;
    int32_t ret = 0;

    (void)context;
    (void)rspData;
    if (reqData == NULL) {
        HDF_LOGE("%s: reqData is NULL", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }
    keyExt = (WifiKeyExt *)OsalMemCalloc(sizeof(WifiKeyExt));
    if (keyExt == NULL) {
        HDF_LOGE("%s:keyExt OsalMemCalloc failed", __func__);
        return HDF_FAILURE;
    }
    if (WifiCmdFillKeyInner(reqData, keyExt) != HDF_SUCCESS) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "keyExt");
        OsalMemFree(keyExt);
        return HDF_FAILURE;
    }

    netDev = NetDeviceGetInstByName(ifName);
    if (netDev == NULL) {
        HDF_LOGE("%s:netDev not found!ifName=%s", __func__, ifName);
        OsalMemFree(keyExt);
        return HDF_FAILURE;
    }

    index = (uint8_t)keyExt->keyIdx;
    unicast = TRUE;
    multicast = WifiGetMulticast(keyExt);
    ret = SetDefaultKey(netDev, index, unicast, multicast);
    OsalMemFree(keyExt);
    HDF_LOGD("%s: Wifi cmd setKey finished!", __func__);
    return ret;
}

static int32_t WifiCmdSendEapol(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    WifiTxEapol eapol = {0};
    struct NetDevice *netdev = NULL;
    const char *ifName = NULL;

    (void)context;
    (void)rspData;
    if (reqData == NULL) {
        HDF_LOGE("%s: reqData is NULL", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }

    if (!HdfSbufReadBuffer(reqData, (const void **)&(eapol.buf), &(eapol.len))) {
        HDF_LOGE("%s: %s!ParamName=%s,readSize=%u", __func__, ERROR_DESC_READ_REQ_FAILED, "buf", eapol.len);
        return HDF_FAILURE;
    }

    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL) {
        HDF_LOGE("%s:netdev not found!ifName=%s", __func__, ifName);
        return HDF_FAILURE;
    }
    HDF_LOGD("%s: Wifi cmd sendEapol finished!", __func__);
    return SendEapol(netdev, &eapol);
}

static int32_t WifiCmdReceiveEapol(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    struct NetDevice *netdev = NULL;
    WifiRxEapol eapol = {0};
    const char *ifName = NULL;
    int32_t ret;

    (void)context;
    if (reqData == NULL || rspData == NULL) {
        HDF_LOGE("%s: reqData or rspData is NULL", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }

    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL) {
        HDF_LOGE("%s:netdev not found!ifName=%s", __func__, ifName);
        return HDF_FAILURE;
    }

    eapol.len = DEFAULT_EAPOL_PACKAGE_SIZE;
    eapol.buf = OsalMemCalloc(DEFAULT_EAPOL_PACKAGE_SIZE);
    if (eapol.buf == NULL) {
        HDF_LOGE("%s: oom", __func__);
        return HDF_FAILURE;
    }

    ret = ReceiveEapol(netdev, &eapol);
    HDF_LOGI("%s: ReceiveEapol ret=%d", __func__, ret);
    if (!ret) {
        if (!HdfSbufWriteBuffer(rspData, eapol.buf, eapol.len)) {
            HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
            ret = HDF_ERR_IO;
        }
    }
    OsalMemFree(eapol.buf);
    return ret;
}

static int32_t WifiCmdEnableEapol(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    struct NetDevice *netdev = NULL;
    const char *ifName = NULL;
    WifiEnableEapol eapol;

    (void)context;
    (void)rspData;
    if (reqData == NULL) {
        HDF_LOGE("%s: reqData is NULL", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }
    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL) {
        HDF_LOGE("%s:netdev not found!ifName=%s", __func__, ifName);
        return HDF_FAILURE;
    }
    eapol.callback = (void *)HdfWifiEventEapolRecv;
    eapol.context = NULL;

    HDF_LOGD("%s: Wifi cmd EnableEapol finished", __func__);
    return EnableEapol(netdev, &eapol);
}

static int32_t WifiCmdDisableEapol(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    struct NetDevice *netdev = NULL;
    const char *ifName = NULL;
    (void)context;
    (void)rspData;
    if (reqData == NULL) {
        HDF_LOGE("%s: reqData is NULL", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }
    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL) {
        HDF_LOGE("%s:netdev not found!ifName=%s", __func__, ifName);
        return HDF_FAILURE;
    }

    return DisableEapol(netdev);
}

static int32_t WifiCmdGetAddr(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    struct NetDevice *netdev = NULL;
    const char *ifName = NULL;
    int32_t ret = HDF_SUCCESS;
    (void)context;
    if (reqData == NULL || rspData == NULL) {
        HDF_LOGE("%s: reqData or rspData is NULL", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }
    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL) {
        HDF_LOGE("%s: invalid netdev", __func__);
        return HDF_FAILURE;
    }
    if (!HdfSbufWriteBuffer(rspData, netdev->macAddr, ETH_ADDR_LEN)) {
        HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
        ret = HDF_ERR_IO;
    }
    HDF_LOGD("%s: Wifi cmd getAddr finished!", __func__);
    return ret;
}

static int32_t WifiCmdSetMode(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    struct NetDevice *netdev = NULL;
    WifiSetMode *mode = NULL;
    const char *ifName = NULL;
    uint32_t dataSize = 0;
    int32_t ret;

    (void)context;
    (void)rspData;
    if (reqData == NULL) {
        HDF_LOGE("%s: reqData is NULL", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }
    if (!HdfSbufReadBuffer(reqData, (const void **)&mode, &dataSize) || mode == NULL ||
        dataSize != sizeof(WifiSetMode)) {
        HDF_LOGE("%s: %s!ParamName=%s,readSize=%u", __func__, ERROR_DESC_READ_REQ_FAILED, "mode", dataSize);
        return HDF_FAILURE;
    }
    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL) {
        HDF_LOGE("%s: invalid netdev", __func__);
        return HDF_FAILURE;
    }
    HDF_LOGI("%s: %s changing mode to %u ...", __func__, ifName, mode->iftype);
    ret = SetMode(netdev, mode->iftype);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: fail to do change intf,%d", __func__, ret);
    } else {
        HDF_LOGD("%s: Wifi cmd SetMode successful!", __func__);
    }
    return ret;
}

static void WifiGetChannelData(
    struct WlanBand *band, WifiHwFeatureData **featureData, struct WlanHwCapability *capability, uint32_t iee80211band)
{
    uint32_t loop;
    if (band == NULL || featureData == NULL || *featureData == NULL) {
        HDF_LOGE("%s: band or featureData is NULL", __func__);
        return;
    }

    (*featureData)->bands[iee80211band].channelNum = band->channelCount;
    (*featureData)->htCapab = capability->htCapability;

    for (loop = 0; loop < band->channelCount; ++loop) {
        (*featureData)->bands[iee80211band].iee80211Channel[loop].freq = band->channels[loop].centerFreq;
        (*featureData)->bands[iee80211band].iee80211Channel[loop].flags = band->channels[loop].flags;
        (*featureData)->bands[iee80211band].iee80211Channel[loop].channel = band->channels[loop].channelId;
    }
    HDF_LOGD("%s: WifiGetChannelData finished!", __func__);
}

static int32_t WifiFillHwFeature(struct NetDevice *netdev, WifiHwFeatureData *featureData)
{
    int32_t ret = HDF_SUCCESS;
    struct WlanHwCapability *capability = GetHwCapability(netdev);
    if (capability == NULL) {
        HDF_LOGE("%s:GetHwCapability failed!", __func__);
        return HDF_FAILURE;
    }
    do {
        uint32_t loop;
        char rate[100] = {0};
        char *rateStr = rate;
        if (capability->supportedRateCount > MAX_SUPPORTED_RATE) {
            HDF_LOGE("%s: bitrates %u out of range", __func__, capability->supportedRateCount);
            ret = HDF_FAILURE;
            break;
        }
        for (loop = 0; loop < capability->supportedRateCount; ++loop) {
            if (sprintf_s(rateStr, RATE_LENGTH, "%u,", capability->supportedRates[loop]) < 0) {
                HDF_LOGW("%s: Sprintf_s failed!", __func__);
            }
            rateStr = rate + strlen(rate);
            featureData->bitrate[loop] = capability->supportedRates[loop];
        }
        HDF_LOGD("%s: supported rate %s", __func__, rate);

        if (capability->bands[IEEE80211_BAND_2GHZ] != NULL) {
            struct WlanBand *band = capability->bands[IEEE80211_BAND_2GHZ];
            if (band->channelCount > WIFI_24G_CHANNEL_NUM) {
                HDF_LOGE("%s: channels %u out of range", __func__, band->channelCount);
                ret = HDF_FAILURE;
                break;
            }
            WifiGetChannelData(band, &featureData, capability, IEEE80211_BAND_2GHZ);
        }
        if (capability->bands[IEEE80211_BAND_5GHZ] != NULL) {
            struct WlanBand *band = capability->bands[IEEE80211_BAND_5GHZ];
            if (band->channelCount > WIFI_MAX_CHANNEL_NUM) {
                HDF_LOGE("%s: channels %u out of range", __func__, band->channelCount);
                ret = HDF_FAILURE;
                break;
            }
            WifiGetChannelData(band, &featureData, capability, IEEE80211_BAND_5GHZ);
        }
    } while (false);

    if (capability->Release != NULL) {
        capability->Release(capability);
        capability = NULL;
    }
    HDF_LOGD("%s: WifiFillHwFeature finished!", __func__);
    return ret;
}

static uint32_t GetDeviceMacAddr(struct NetDevice *netdev, int32_t type, uint8_t *mac, uint8_t len)
{
    struct HdfChipDriver *chipDriver = GetChipDriver(netdev);
    if (chipDriver == NULL) {
        HDF_LOGE("%s:bad net device found!", __func__);
        return HDF_FAILURE;
    }

    RETURN_IF_CHIPOPS_NOT_IMPLEMENT(chipDriver->ops, GetDeviceMacAddr);
    return chipDriver->ops->GetDeviceMacAddr(netdev, type, mac, len);
}

static uint32_t SetMacAddr(struct NetDevice *netdev, uint8_t *mac, uint8_t len)
{
    struct HdfChipDriver *chipDriver = GetChipDriver(netdev);
    if (chipDriver == NULL) {
        HDF_LOGE("%s:bad net device found!", __func__);
        return HDF_FAILURE;
    }
    RETURN_IF_CHIPOPS_NOT_IMPLEMENT(chipDriver->ops, SetMacAddr);
    return chipDriver->ops->SetMacAddr(netdev, mac, len);
}

static uint32_t SetTxPower(struct NetDevice *netdev, int32_t power)
{
    struct HdfChipDriver *chipDriver = GetChipDriver(netdev);
    if (chipDriver == NULL) {
        HDF_LOGE("%s:bad net device found!", __func__);
        return HDF_FAILURE;
    }

    RETURN_IF_CHIPOPS_NOT_IMPLEMENT(chipDriver->ops, SetTxPower);
    return chipDriver->ops->SetTxPower(netdev, power);
}

static uint32_t GetValidFreqsWithBand(struct NetDevice *netdev, int32_t band, int32_t *freqs, uint32_t *num)
{
    struct HdfChipDriver *chipDriver = GetChipDriver(netdev);
    if (chipDriver == NULL) {
        HDF_LOGE("%s:bad net device found!", __func__);
        return HDF_FAILURE;
    }

    RETURN_IF_CHIPOPS_NOT_IMPLEMENT(chipDriver->ops, GetValidFreqsWithBand);
    return chipDriver->ops->GetValidFreqsWithBand(netdev, band, freqs, num);
}

static int32_t WifiCmdGetHwFeature(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    struct NetDevice *netdev = NULL;
    WifiHwFeatureData featureData = {0};
    const char *ifName = NULL;
    int32_t ret;

    (void)context;
    if (reqData == NULL || rspData == NULL) {
        HDF_LOGE("%s: reqData or rspData is NULL", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }
    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL) {
        HDF_LOGE("%s: invalid netdev", __func__);
        return HDF_FAILURE;
    }
    ret = WifiFillHwFeature(netdev, &featureData);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: WifiFillHwFeature failed!ret=%d", __func__, ret);
        return HDF_FAILURE;
    }
    if (!HdfSbufWriteBuffer(rspData, &featureData, sizeof(featureData))) {
        HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
        ret = HDF_ERR_IO;
    }
    HDF_LOGD("%s: WifiCmdGetHwFeature finished!", __func__);
    return ret;
}

static int32_t SetNetIfInfo(struct NetDevice *netdev, uint32_t type)
{
    int ret = 0;
    if (netdev != NULL) {
        ret = netdev->netDeviceIf->open(netdev);
        (void)NetIfSetStatus(netdev, NETIF_UP);
    }
    if (type == WIFI_IFTYPE_AP) {
        if (NetIfDhcpsStart(netdev, NULL, 0) == 0) {
            HDF_LOGI("%s: Dhcp servier start ok.", __func__);
        }
    }
    HDF_LOGD("%s: SetNetIfInfo finished!", __func__);
    return ret;
}

static int32_t UnsetNetIfInfo(struct NetDevice *netdev)
{
    (void)netdev->netDeviceIf->stop(netdev);
    (void)NetIfDhcpStop(netdev);
    (void)NetIfDhcpsStop(netdev);
    HDF_LOGD("%s: UnsetNetIfInfo finished!", __func__);
    return NetIfSetStatus(netdev, NETIF_DOWN);
}

static void SetNetworkAddr(struct NetDevice *netdev, uint32_t type)
{
    IpV4Addr ip;
    IpV4Addr netmask;
    IpV4Addr gw;
    if (type == WIFI_IFTYPE_STATION) {
        ip.addr = 0x00000000UL;
        netmask.addr = 0x00000000UL;
        gw.addr = 0x00000000UL;
    } else {
        ip.addr = 0x010ca8c0UL;
        netmask.addr = 0x00ffffffUL;
        gw.addr = 0x010ca8c0UL;
    }

    if (netdev != NULL) {
        NetIfSetAddr(netdev, &ip, &netmask, &gw);
    }
    HDF_LOGD("%s: SetNetworkAddr finished!", __func__);
}

static void UnsetNetworkAddr(struct NetDevice *netdev)
{
    IpV4Addr ip = {0x00000000UL};
    IpV4Addr netmask = {0x00000000UL};
    IpV4Addr gw = {0x00000000UL};
    if (netdev != NULL) {
        NetIfSetAddr(netdev, &ip, &netmask, &gw);
    }
    HDF_LOGD("%s: UnsetNetworkAddr finished!", __func__);
}

static int32_t WifiCmdSetNetdev(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    WifiSetNewDev *info = NULL;
    const char *ifName = NULL;
    uint32_t dataSize = 0;
    int ret = 0;
    struct NetDevice *netdev = NULL;

    (void)context;
    (void)rspData;
    if (reqData == NULL) {
        HDF_LOGE("%s: reqData is NULL", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }

    if (!HdfSbufReadBuffer(reqData, (const void **)&info, &dataSize) || info == NULL ||
        dataSize != sizeof(WifiSetNewDev)) {
        HDF_LOGE("%s: %s!ParamName=%s,readSize=%u", __func__, ERROR_DESC_READ_REQ_FAILED, "devinfo", dataSize);
        return HDF_FAILURE;
    }

    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL || netdev->netDeviceIf == NULL) {
        HDF_LOGE("%s:netdev not found!ifName=%s", __func__, ifName);
        return HDF_FAILURE;
    }

    if (info->status == FALSE && NetDeviceIsInstRunning(netdev) && netdev->netDeviceIf->stop != NULL) {
        UnsetNetworkAddr(netdev);
        ret = UnsetNetIfInfo(netdev);
    } else if (info->status == TRUE && !NetDeviceIsInstRunning(netdev) && netdev->netDeviceIf->open != NULL) {
        SetNetworkAddr(netdev, info->ifType);
        ret = SetNetIfInfo(netdev, info->ifType);
    }
    HDF_LOGD("%s: Wifi cmd setNetdev finished", __func__);
    return ret;
}

static int32_t WifiSendMlme(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    (void)context;
    (void)reqData;
    (void)rspData;
    return HDF_SUCCESS;
}

static int32_t WifiFillActionData(struct HdfSBuf *reqData, WifiActionData *actionData)
{
    uint32_t dataSize = 0;

    if (actionData == NULL) {
        HDF_LOGE("%s:actionData is NULL", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    if (!HdfSbufReadBuffer(reqData, (const void **)&(actionData->bssid), &dataSize) || dataSize != ETH_ADDR_LEN) {
        HDF_LOGE("%s: %s!ParamName=%s,readSize=%u", __func__, ERROR_DESC_READ_REQ_FAILED, "bssid", dataSize);
        return HDF_FAILURE;
    }

    if (!HdfSbufReadBuffer(reqData, (const void **)&(actionData->dst), &dataSize) || dataSize != ETH_ADDR_LEN) {
        HDF_LOGE("%s: %s!ParamName=%s,readSize=%u", __func__, ERROR_DESC_READ_REQ_FAILED, "dst", dataSize);
        return HDF_FAILURE;
    }

    if (!HdfSbufReadBuffer(reqData, (const void **)&(actionData->src), &dataSize) || dataSize != ETH_ADDR_LEN) {
        HDF_LOGE("%s: %s!ParamName=%s,readSize=%u", __func__, ERROR_DESC_READ_REQ_FAILED, "src", dataSize);
        return HDF_FAILURE;
    }

    if (!HdfSbufReadBuffer(reqData, (const void **)&(actionData->data), &(actionData->dataLen))) {
        HDF_LOGE("%s: %s!ParamName=%s,readSize=%u", __func__, ERROR_DESC_READ_REQ_FAILED, "data", actionData->dataLen);
        return HDF_FAILURE;
    }
    if (!HdfSbufReadUint32(reqData, &(actionData->freq)) || actionData == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "freq");
        return HDF_FAILURE;
    }
    if (!HdfSbufReadUint32(reqData, &(actionData->wait)) || actionData == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "wait");
        return HDF_FAILURE;
    }
    if (!HdfSbufReadInt32(reqData, &(actionData->noCck)) || actionData == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "noCck");
        return HDF_FAILURE;
    }
    HDF_LOGD("%s: actionData->freq=%d, actionData->wait=%d, actionData->noCck=%d", __func__, actionData->freq,
        actionData->wait, actionData->noCck);
    return HDF_SUCCESS;
}

int32_t SendAction(struct NetDevice *netdev, WifiActionData *actionData)
{
    struct HdfChipDriver *chipDriver = GetChipDriver(netdev);
    if (chipDriver == NULL) {
        HDF_LOGE("%s:bad net device found!", __func__);
        return HDF_FAILURE;
    }

    RETURN_IF_CHIPOPS_NOT_IMPLEMENT(chipDriver->ops, SendAction);
    return chipDriver->ops->SendAction(netdev, actionData);
}

static int32_t WifiCmdSendAction(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    WifiActionData actionData = {0};
    const char *ifName = NULL;
    struct NetDevice *netdev = NULL;
    int ret;
    (void)context;
    (void)rspData;
    if (reqData == NULL) {
        HDF_LOGE("%s:reqData is NULL", __func__);
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }

    if (WifiFillActionData(reqData, &actionData) != HDF_SUCCESS) {
        HDF_LOGE("%s: fill action data fail", __func__);
        return HDF_FAILURE;
    }
    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL || netdev->netDeviceIf == NULL) {
        HDF_LOGE("%s:netdev not found!ifName=%s", __func__, ifName);
        return HDF_FAILURE;
    }

    ret = SendAction(netdev, &actionData);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: fail to send action, ret=%d", __func__, ret);
    } else {
        HDF_LOGI("%s: send action success!", __func__);
    }
    return ret;
}

static int32_t WifiCmdGetNetworkInfo(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    uint32_t netDevNum;
    char *defaultIfName = "wlan0";
    uint8_t supportMode[PROTOCOL_80211_IFTYPE_NUM] = {0};
    netDevNum = 1;
    (void)context;
    (void)reqData;

    if (!HdfSbufWriteUint32(rspData, netDevNum)) {
        HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
        return HDF_FAILURE;
    }
    if (!HdfSbufWriteString(rspData, defaultIfName)) {
        HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
        return HDF_FAILURE;
    }
    supportMode[PROTOCOL_80211_IFTYPE_STATION] = 1;
    supportMode[PROTOCOL_80211_IFTYPE_AP] = 1;
    if (!HdfSbufWriteBuffer(rspData, supportMode, PROTOCOL_80211_IFTYPE_NUM)) {
        HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
        return HDF_FAILURE;
    }
    return HDF_SUCCESS;
}

static int32_t WifiCmdIsSupportCombo(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    uint8_t isComboValid;
    (void)context;
    if (reqData == NULL || rspData == NULL) {
        return HDF_ERR_INVALID_PARAM;
    }
    isComboValid = false;
    if (!HdfSbufWriteUint8(rspData, isComboValid)) {
        HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
        return HDF_FAILURE;
    }
    return HDF_SUCCESS;
}

static int32_t WifiCmdGetSupportCombo(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    uint8_t isComboValid;
    (void)context;
    if (reqData == NULL || rspData == NULL) {
        return HDF_ERR_INVALID_PARAM;
    }
    isComboValid = false;
    if (!HdfSbufWriteUint8(rspData, isComboValid)) {
        HDF_LOGE("%s: write fail", __func__);
        return HDF_FAILURE;
    }
    return HDF_SUCCESS;
}

static int32_t WifiCmdGetDevMacAddr(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    int32_t ret;
    struct NetDevice *netdev = NULL;
    const char *ifName = NULL;
    uint8_t isEfuseSavedMac;
    int32_t type;
    unsigned char devMac[IEEE80211_MAC_ADDR_LEN] = {0};

    (void)context;
    if (reqData == NULL || rspData == NULL) {
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }
    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL) {
        HDF_LOGE("%s:netdev not found!ifName=%s", __func__, ifName);
        return HDF_FAILURE;
    }
    if (!HdfSbufReadInt32(reqData, &type)) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "type");
        return HDF_FAILURE;
    }
    ret = GetDeviceMacAddr(netdev, type, devMac, IEEE80211_MAC_ADDR_LEN);
    if (ret && ret != HDF_ERR_NOT_SUPPORT) {
        HDF_LOGE("%s: fail to get device mac addr,%d", __func__, ret);
        return ret;
    }
    isEfuseSavedMac = (ret == HDF_ERR_NOT_SUPPORT) ? false : true;
    if (!HdfSbufWriteUint8(rspData, isEfuseSavedMac)) {
        HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
        return HDF_FAILURE;
    }
    if (!HdfSbufWriteBuffer(rspData, devMac, IEEE80211_MAC_ADDR_LEN)) {
        HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
        ret = HDF_FAILURE;
    }
    return ret;
}

static int32_t WifiCmdSetMacAddr(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    int32_t ret;
    struct NetDevice *netdev = NULL;
    const char *ifName = NULL;
    unsigned char *mac = NULL;
    uint32_t replayDataSize;

    (void)context;
    if (reqData == NULL || rspData == NULL) {
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }
    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL) {
        HDF_LOGE("%s:netdev not found!ifName=%s", __func__, ifName);
        return HDF_FAILURE;
    }
    if (!HdfSbufReadBuffer(reqData, (const void **)&mac, &replayDataSize) || mac == NULL ||
        replayDataSize != IEEE80211_MAC_ADDR_LEN) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "mac");
        return HDF_FAILURE;
    }
    ret = SetMacAddr(netdev, mac, IEEE80211_MAC_ADDR_LEN);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: fail to set mac addr,%d", __func__, ret);
    }
    return ret;
}

static int32_t WifiCmdGetValidFreqsWithBand(
    const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    int32_t ret;
    struct NetDevice *netdev = NULL;
    const char *ifName = NULL;
    int32_t band;
    int32_t freqs[WIFI_24G_CHANNEL_NUM] = {0};
    uint32_t num = 0;

    (void)context;
    if (reqData == NULL || rspData == NULL) {
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }
    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL) {
        HDF_LOGE("%s:netdev not found!ifName=%s", __func__, ifName);
        return HDF_FAILURE;
    }
    if (!HdfSbufReadInt32(reqData, &band)) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "band");
        return HDF_FAILURE;
    }
    ret = GetValidFreqsWithBand(netdev, band, freqs, &num);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: fail to get valid freqs,%d", __func__, ret);
        return ret;
    }
    if (!HdfSbufWriteUint32(rspData, num)) {
        HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
        return HDF_FAILURE;
    }
    if (!HdfSbufWriteBuffer(rspData, freqs, num * sizeof(int32_t))) {
        HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
        return HDF_FAILURE;
    }
    return ret;
}

static int32_t WifiCmdSetTxPower(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    int32_t ret;
    struct NetDevice *netdev = NULL;
    const char *ifName = NULL;
    int32_t power;

    (void)context;
    if (reqData == NULL || rspData == NULL) {
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }
    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL) {
        HDF_LOGE("%s:netdev not found!ifName=%s", __func__, ifName);
        return HDF_FAILURE;
    }
    if (!HdfSbufReadInt32(reqData, &power) || power < 0) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "power");
        return HDF_FAILURE;
    }
    ret = SetTxPower(netdev, power);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: fail to set tx power,%d", __func__, ret);
    }
    return ret;
}

static int32_t WifiCmdSetClient(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    uint32_t clientNum = 0;
    struct HdfWifiEventToClientMap *eventToClientMap = NULL;
    (void)rspData;
    if (reqData == NULL || context == NULL) {
        return HDF_ERR_INVALID_PARAM;
    }

    if (!HdfSbufReadUint32(reqData, &clientNum)) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "clientNum");
        return HDF_FAILURE;
    }

    eventToClientMap = HdfWifiGetEventToClientMap();
    if (eventToClientMap == NULL) {
        HDF_LOGE("%s:get HdfWifiEventToClientMap failed", __func__);
        return HDF_FAILURE;
    }

    if (clientNum == WIFI_KERNEL_TO_WPA_CLIENT) {
        eventToClientMap->wpaClient = context->client;
    } else if (clientNum == WIFI_KERNEL_TO_HAL_CLIENT) {
        eventToClientMap->halClient = context->client;
    }
    return HDF_SUCCESS;
}

static int32_t HdfdWlanGetChipId(const char *ifName, uint8_t *chipId)
{
    struct NetDevice *netdev = NULL;
    struct HdfWifiNetDeviceData *netDeviceData = NULL;

    if (ifName == NULL || chipId == NULL) {
        HDF_LOGE("%s: para is NULL", __func__);
        return HDF_FAILURE;
    }
    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL) {
        HDF_LOGE("%s:netdev not found!ifName=%s.", __func__, ifName);
        return HDF_FAILURE;
    }
    netDeviceData = GetPlatformData(netdev);
    if (netDeviceData == NULL) {
        HDF_LOGE("%s:platform netDeviceData is NULL!", __func__);
        return HDF_FAILURE;
    }

    *chipId = netDeviceData->device->id;
    return HDF_SUCCESS;
}

static int32_t WifiCmdGetChipId(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    int32_t ret;
    const char *ifName = NULL;
    uint8_t chipId = 0;

    (void)context;
    if (reqData == NULL || rspData == NULL) {
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }

    ret = HdfdWlanGetChipId(ifName, &chipId);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: fail to get chipId, %d", __func__, ret);
        return HDF_FAILURE;
    }
    HDF_LOGE("%s: chipid = %hhu.", __func__, chipId);
    if (!HdfSbufWriteUint8(rspData, chipId)) {
        HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
        return HDF_FAILURE;
    }
    return ret;
}

static int32_t WifiCmdGetIfNamesByChipId(
    const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    uint8_t chipId;
    uint8_t ifNameCount = 0;
    char *ifNames = NULL;
    int32_t ret = HDF_SUCCESS;

    (void)context;
    if (reqData == NULL || rspData == NULL) {
        return HDF_ERR_INVALID_PARAM;
    }
    if (!HdfSbufReadUint8(reqData, &chipId)) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "chipId");
        return HDF_FAILURE;
    }

    ifNames = HdfWlanGetIfNames(chipId, &ifNameCount);
    if (ifNames == NULL) {
        HDF_LOGE("%s: fail to get ifnames!", __func__);
        return HDF_FAILURE;
    }
    HDF_LOGI("%s: get ifName num: %hhu.\n", __func__, ifNameCount);
    do {
        if (!HdfSbufWriteUint32(rspData, ifNameCount)) {
            HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
            ret = HDF_FAILURE;
            break;
        }

        if (!HdfSbufWriteBuffer(rspData, ifNames, ifNameCount * IFNAMSIZ)) {
            HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
            ret = HDF_FAILURE;
            break;
        }
    } while (false);
    OsalMemFree(ifNames);
    return ret;
}

static int32_t WifiResetEntranceCheck(const uint8_t chipId)
{
    uint8_t i;
    int32_t ret = HDF_SUCCESS;
    uint8_t ifNameCount = 0;
    char *ifNames = NULL;
    struct NetDevice *netdev = NULL;

    ifNames = HdfWlanGetIfNames(chipId, &ifNameCount);
    if (ifNames == NULL) {
        HDF_LOGE("%s: HdfWlanGetIfNames failed!", __func__);
        return HDF_FAILURE;
    }
    /* check the netDevice is busy or not, do reset when it is free. */
    for (i = 0; i < ifNameCount; i++) {
        netdev = NetDeviceGetInstByName(ifNames + i * IFNAMSIZ);
        if (netdev == NULL) {
            HDF_LOGE("%s:netdev not found!ifName=%s", __func__, ifNames + i * IFNAMSIZ);
            continue;
        }
        if (NetDeviceIsInstRunning(netdev)) {
            HDF_LOGE("%s: the netdevice is using!", __func__);
            ret = ERR_NETDEVICE_IS_USING;
            break;
        }
    }
    OsalMemFree(ifNames);
    return ret;
}

static int32_t ResetParaCheck(const RequestContext *context, const struct HdfSBuf *reqData,
    const struct HdfSBuf *rspData)
{
    if (context == NULL || reqData == NULL || rspData == NULL) {
        HDF_LOGE("%s: para is null!", __func__);
        return HDF_FAILURE;
    }

    if (context->senderId != BASE_SERVICE_ID) {
        HDF_LOGE("%s: the senderId is error!", __func__);
        return HDF_FAILURE;
    }
    return HDF_SUCCESS;
}

static int32_t WifiCmdDoResetChip(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    int32_t ret;
    uint8_t chipId;
    const char *ifName = NULL;
    struct HdfWlanDevice *wlanDevice = NULL;

    ret = ResetParaCheck(context, reqData, rspData);
    if (ret != HDF_SUCCESS) {
        return HDF_FAILURE;
    }

    if (!HdfSbufReadUint8(reqData, &chipId)) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "chipId");
        return HDF_FAILURE;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }
    /* callback function use chipId */
    if (!HdfSbufWriteUint8(rspData, chipId)) {
        HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
        return HDF_FAILURE;
    }
    if (!HdfSbufWriteString(rspData, ifName)) {
        HDF_LOGE("%s: Serialize failed!", __func__);
        return HDF_FAILURE;
    }

    ret = WifiResetEntranceCheck(chipId);
    if (ret != HDF_SUCCESS) {
        return ret;
    }

    wlanDevice = HdfWlanGetWlanDevice(chipId);
    if (wlanDevice == NULL || wlanDevice->reset == NULL) {
        HDF_LOGE("%s: wlanDevice or wlanDevice->reset is NULL!", __func__);
        return HDF_FAILURE;
    }

    ret = HdfWifiDeinitDevice(wlanDevice);
    if (ret != HDF_SUCCESS) {
        return ret;
    }

    /* power reset */
    ret = wlanDevice->reset->Reset(wlanDevice->reset);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s:power reset failed!", __func__);
        return ERR_POWER_RESET_FAIL;
    }
    ret = HdfWifiInitDevice(wlanDevice);
    return ret;
}

void SendMessageResetDriverCallBack(
    const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData, ErrorCode rspCode)
{
    uint8_t chipId;
    int32_t ret;
    const char *ifName = NULL;
    (void)context;

    if (rspData == NULL || reqData == NULL) {
        HDF_LOGE("%s: para is null!", __func__);
        return;
    }

    if (!HdfSbufReadUint8(rspData, &chipId)) {
        HDF_LOGE("%s: read data failed! ParamName=%s", __func__, "chipId");
        return;
    }
    ifName = HdfSbufReadString(rspData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return;
    }

    ret = HdfWifiEventResetResult(chipId, rspCode, ifName);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: send resetDriver event fail!", __func__);
    }
    return;
}

static int32_t WifiCmdResetDriver(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    int32_t ret;
    struct HdfSBuf *data = NULL;
    (void)context;
    if (reqData == NULL || rspData == NULL) {
        return HDF_ERR_INVALID_PARAM;
    }

    data = HdfSbufCopy(reqData);
    if (data == NULL) {
        HDF_LOGE("%s: sbuf copy fail", __func__);
        return HDF_FAILURE;
    }

    ret = g_baseService->SendAsyncMessage(
        g_baseService, BASE_SERVICE_ID, CMD_BASE_DO_RESET_PRIVATE, data, SendMessageResetDriverCallBack);
    if (ret != HDF_SUCCESS) {
        HdfSbufRecycle(data);
        HDF_LOGE("%s: fail to reset the driver,%d", __func__, ret);
    }
    return ret;
}

static uint32_t GetIftype(struct NetDevice *netdev, uint8_t *iftype)
{
    struct HdfChipDriver *chipDriver = GetChipDriver(netdev);
    if (chipDriver == NULL) {
        HDF_LOGE("%s:bad net device found!", __func__);
        return HDF_FAILURE;
    }
    RETURN_IF_CHIPOPS_NOT_IMPLEMENT(chipDriver->ops, GetIftype);
    return chipDriver->ops->GetIftype(netdev, iftype);
}

#define MAX_NETDEVICE_COUNT 20
static int32_t WifiCmdGetNetDevInfo(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    uint32_t i;
    uint32_t netdevNum;
    uint8_t iftype;
    struct NetDevice *netDev = NULL;
    (void)context;
    (void)reqData;

    netdevNum = NetDevGetRegisterCount();
    if (!HdfSbufWriteUint32(rspData, netdevNum)) {
        HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
        return HDF_FAILURE;
    }
    for (i = 0; i < MAX_NETDEVICE_COUNT; i++) {
        netDev = NetDeviceGetInstByIndex(i);
        if (netDev != NULL) {
            if (GetIftype(netDev, &iftype) != HDF_SUCCESS) {
                iftype = 0;
            }
            if (!HdfSbufWriteUint32(rspData, i) ||
                !HdfSbufWriteBuffer(rspData, netDev->name, strlen(netDev->name) + 1) ||
                !HdfSbufWriteUint8(rspData, iftype) ||
                !HdfSbufWriteBuffer(rspData, GET_NET_DEV_MAC_ADDR(netDev), ETH_ADDR_LEN)) {
                HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
                return HDF_FAILURE;
            }
        }
    }
    return HDF_SUCCESS;
}

static uint32_t HdfdWlanGetPowerMode(const char *ifName, uint8_t *mode)
{
    struct NetDevice *netdev = NULL;

    if (ifName == NULL || mode == NULL) {
        HDF_LOGE("%s: Invalid parameter", __func__);
        return HDF_FAILURE;
    }
    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL) {
        HDF_LOGE("%s:netdev not found!ifName=%s.", __func__, ifName);
        return HDF_FAILURE;
    }
    struct HdfChipDriver *chipDriver = GetChipDriver(netdev);
    if (chipDriver == NULL) {
        HDF_LOGE("%s:bad net device found!", __func__);
        return HDF_FAILURE;
    }
    if (chipDriver->ops == NULL) {
        return HDF_ERR_INVALID_OBJECT;
    }
    if (chipDriver->ops->GetPowerMode == NULL) {
        *mode = WIFI_POWER_MODE_GENERAL;
        HDF_LOGE("%s: chipDriver->ops->GetPowerMode is null\r\n", __func__);
        return HDF_ERR_NOT_SUPPORT;
    }
    return chipDriver->ops->GetPowerMode(netdev, mode);
}

static int32_t WifiCmdGetPowerMode(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    int32_t ret;
    const char *ifName = NULL;
    uint8_t mode;
    (void)context;

    if (reqData == NULL || rspData == NULL) {
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }
    ret = HdfdWlanGetPowerMode(ifName, &mode);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: fail to get power mode, %d", __func__, ret);
        return ret;
    }
    if (!HdfSbufWriteUint8(rspData, mode)) {
        HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
        return HDF_FAILURE;
    }

    return HDF_SUCCESS;
}

static uint32_t HdfdWlanSetPowerMode(const char *ifName, uint8_t mode)
{
    struct NetDevice *netdev = NULL;

    if (ifName == NULL || mode >= WIFI_POWER_MODE_NUM) {
        HDF_LOGE("%s: Invalid parameter", __func__);
        return HDF_FAILURE;
    }
    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL) {
        HDF_LOGE("%s:netdev not found!ifName=%s.", __func__, ifName);
        return HDF_FAILURE;
    }
    struct HdfChipDriver *chipDriver = GetChipDriver(netdev);
    if (chipDriver == NULL) {
        HDF_LOGE("%s:bad net device found!", __func__);
        return HDF_FAILURE;
    }
    if (chipDriver->ops == NULL) {
        return HDF_ERR_INVALID_OBJECT;
    }

    if (chipDriver->ops->SetPowerMode == NULL) {
        HDF_LOGE("%s: chipDriver->ops->SetPowerMode is null\r\n", __func__);
        return HDF_ERR_NOT_SUPPORT;
    }
    return chipDriver->ops->SetPowerMode(netdev, mode);
}

static int32_t WifiCmdSetPowerMode(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    int32_t ret;
    const char *ifName = NULL;
    uint8_t mode;
    (void)context;

    if (reqData == NULL || rspData == NULL) {
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: %s!ParamName=%s", __func__, ERROR_DESC_READ_REQ_FAILED, "ifName");
        return HDF_FAILURE;
    }
    if (!HdfSbufReadUint8(reqData, &mode)) {
        HDF_LOGE("%s: read data failed! ParamName=%s", __func__, "power mode");
        return HDF_FAILURE;
    }
    ret = HdfdWlanSetPowerMode(ifName, mode);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: fail to set power mode, %d", __func__, ret);
    }

    return ret;
}

static uint32_t HdfWlanStartChannelMeas(const char *ifName,  const MeasParam *measParam)
{
    struct NetDevice *netdev = NULL;

    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL) {
        HDF_LOGE("%s:netdev not found!ifName=%s.", __func__, ifName);
        return HDF_FAILURE;
    }
    struct HdfChipDriver *chipDriver = GetChipDriver(netdev);
    if (chipDriver == NULL) {
        HDF_LOGE("%s:bad net device found!", __func__);
        return HDF_FAILURE;
    }
    if (chipDriver->ops == NULL) {
        HDF_LOGE("%s: chipDriver->ops is null", __func__);
        return HDF_ERR_INVALID_OBJECT;
    }

    if (chipDriver->ops->StartChannelMeas == NULL) {
        HDF_LOGE("%s: chipDriver->ops->StartChannelMeas is null", __func__);
        return HDF_ERR_NOT_SUPPORT;
    }
    return chipDriver->ops->StartChannelMeas(netdev, measParam);
}

static int32_t WifiCmdStartChannelMeas(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    const MeasParam *measParam = NULL;
    int32_t ret;
    uint32_t replayDataSize;
    const char *ifName = NULL;

    (void)context;
    if (reqData == NULL || rspData == NULL) {
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: read ifName failed!", __func__);
        return HDF_FAILURE;
    }
    if (!HdfSbufReadBuffer(reqData, (const void **)&measParam, &replayDataSize)||
        replayDataSize != sizeof(MeasParam)) {
        HDF_LOGE("%s: read commandId failed!", __func__);
        return HDF_FAILURE;
    }
    ret = HdfWlanStartChannelMeas(ifName, measParam);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: fail to get channel meas result, %d", __func__, ret);
        return ret;
    }

    return ret;
}

static int32_t HdfWlanSetProjectionScreenParam(const char *ifName, int cmd, const int8_t *buf, uint32_t bufLen)
{
    struct NetDevice *netdev = NULL;
    struct HdfChipDriver *chipDriver = NULL;
    
    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL) {
        HDF_LOGE("%s:netdev not found!ifName=%s.", __func__, ifName);
        return HDF_FAILURE;
    }
    chipDriver = GetChipDriver(netdev);
    if (chipDriver == NULL) {
        HDF_LOGE("%s:bad net device found!", __func__);
        return HDF_FAILURE;
    }
    if (chipDriver->ops == NULL) {
        HDF_LOGE("%s: chipDriver->ops is null", __func__);
        return HDF_ERR_INVALID_OBJECT;
    }

    if (chipDriver->ops->SetProjectionScreenParam == NULL) {
        HDF_LOGE("%s: chipDriver->ops->SetProjectionScreenParam is null", __func__);
        return HDF_ERR_NOT_SUPPORT;
    }
    return chipDriver->ops->SetProjectionScreenParam(netdev, cmd, buf, bufLen);
}

static int32_t WifiSetProjectionScreenParam(const RequestContext *context, struct HdfSBuf *reqData,
    struct HdfSBuf *rspData)
{
    int32_t ret = HDF_FAILURE;
    const char *ifName = NULL;
    int32_t cmd;
    int8_t *buf = NULL;
    uint32_t bufLen;

    (void)context;
    if (reqData == NULL || rspData == NULL) {
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: read ifName failed!", __func__);
        return ret;
    }
    if (!HdfSbufReadInt32(reqData, &cmd)) {
        HDF_LOGE("%s: read cmd failed!", __func__);
        return ret;
    }
    if (!HdfSbufReadBuffer(reqData, (const void **)&buf, &bufLen)) {
        HDF_LOGE("%s: read buf failed!", __func__);
        return ret;
    }
    ret = HdfWlanSetProjectionScreenParam(ifName, cmd, buf, bufLen);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: fail to config projection screen, %d", __func__, ret);
    }
    return ret;
}

static int32_t HdfWlanSendCmdIoctl(const char *ifName, int32_t cmd, const int8_t *buf, uint32_t bufLen)
{
    struct NetDevice *netdev = NULL;
    struct HdfChipDriver *chipDriver = NULL;
    
    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL) {
        HDF_LOGE("%s:netdev not found!ifName=%s.", __func__, ifName);
        return HDF_FAILURE;
    }
    chipDriver = GetChipDriver(netdev);
    if (chipDriver == NULL) {
        HDF_LOGE("%s:bad net device found!", __func__);
        return HDF_FAILURE;
    }
    if (chipDriver->ops == NULL) {
        HDF_LOGE("%s: chipDriver->ops is null", __func__);
        return HDF_ERR_INVALID_OBJECT;
    }

    if (chipDriver->ops->SendCmdIoctl == NULL) {
        HDF_LOGE("%s: chipDriver->ops->SendCmdIoctl is null", __func__);
        return HDF_ERR_NOT_SUPPORT;
    }
    return chipDriver->ops->SendCmdIoctl(netdev, cmd, buf, bufLen);
}

static int32_t WifiSendCmdIoctl(const RequestContext *context, struct HdfSBuf *reqData, struct HdfSBuf *rspData)
{
    int32_t ret = HDF_FAILURE;
    const char *ifName = NULL;
    int32_t cmd;
    int8_t *buf = NULL;
    uint32_t bufLen;

    (void)context;
    if (reqData == NULL || rspData == NULL) {
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: read ifName failed!", __func__);
        return ret;
    }
    if (!HdfSbufReadInt32(reqData, &cmd)) {
        HDF_LOGE("%s: read cmd failed!", __func__);
        return ret;
    }
    if (!HdfSbufReadBuffer(reqData, (const void **)&buf, &bufLen)) {
        HDF_LOGE("%s: read buf failed!", __func__);
        return ret;
    }
    ret = HdfWlanSendCmdIoctl(ifName, cmd, buf, bufLen);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: fail to config projection screen, %d", __func__, ret);
    }
    return ret;
}

static int32_t HdfWlanGetStationInfo(const char *ifName, StationInfo *info, const uint8_t *mac, uint32_t macLen)
{
    struct NetDevice *netdev = NULL;
    struct HdfChipDriver *chipDriver = NULL;
    
    netdev = NetDeviceGetInstByName(ifName);
    if (netdev == NULL) {
        HDF_LOGE("%s:netdev not found!ifName=%s.", __func__, ifName);
        return HDF_FAILURE;
    }
    chipDriver = GetChipDriver(netdev);
    if (chipDriver == NULL) {
        HDF_LOGE("%s:bad net device found!", __func__);
        return HDF_FAILURE;
    }
    if (chipDriver->ops == NULL) {
        HDF_LOGE("%s: chipDriver->ops is null", __func__);
        return HDF_ERR_INVALID_OBJECT;
    }

    if (chipDriver->ops->GetStationInfo == NULL) {
        HDF_LOGE("%s: chipDriver->ops->GetStationInfo is null", __func__);
        return HDF_ERR_NOT_SUPPORT;
    }
    return chipDriver->ops->GetStationInfo(netdev, info, mac, macLen);
}

static int32_t WifiGetStationInfo(const RequestContext *context, struct HdfSBuf *reqData,
    struct HdfSBuf *rspData)
{
    int32_t ret = HDF_FAILURE;
    const char *ifName = NULL;
    StationInfo info = {0};
    const uint8_t *mac = NULL;
    uint32_t macLen;

    (void)context;
    if (reqData == NULL || rspData == NULL) {
        return HDF_ERR_INVALID_PARAM;
    }
    ifName = HdfSbufReadString(reqData);
    if (ifName == NULL) {
        HDF_LOGE("%s: read ifName failed!", __func__);
        return ret;
    }
    if (!HdfSbufReadBuffer(reqData, (const void **)&mac, &macLen)) {
        HDF_LOGE("%s: read buf failed!", __func__);
        return ret;
    }
    ret = HdfWlanGetStationInfo(ifName, &info, mac, macLen);
    if (ret != HDF_SUCCESS) {
        HDF_LOGE("%s: fail to get station information, %d", __func__, ret);
        return ret;
    }

    if (!HdfSbufWriteBuffer(rspData, &info, sizeof(StationInfo))) {
        HDF_LOGE("%s: %s!", __func__, ERROR_DESC_WRITE_RSP_FAILED);
        ret = HDF_FAILURE;
    }
    return ret;
}

static struct MessageDef g_wifiBaseFeatureCmds[] = {
    DUEMessage(CMD_BASE_NEW_KEY, WifiCmdNewKey, 0),
    DUEMessage(CMD_BASE_DEL_KEY, WifiCmdDelKey, 0),
    DUEMessage(CMD_BASE_SET_DEFAULT_KEY, WifiCmdSetKey, 0),
    DUEMessage(CMD_BASE_SEND_MLME, WifiSendMlme, 0),
    DUEMessage(CMD_BASE_SEND_EAPOL, WifiCmdSendEapol, 0),
    DUEMessage(CMD_BASE_RECEIVE_EAPOL, WifiCmdReceiveEapol, 0),
    DUEMessage(CMD_BASE_ENALBE_EAPOL, WifiCmdEnableEapol, 0),
    DUEMessage(CMD_BASE_DISABLE_EAPOL, WifiCmdDisableEapol, 0),
    DUEMessage(CMD_BASE_GET_ADDR, WifiCmdGetAddr, 0),
    DUEMessage(CMD_BASE_SET_MODE, WifiCmdSetMode, 0),
    DUEMessage(CMD_BASE_GET_HW_FEATURE, WifiCmdGetHwFeature, 0),
    DUEMessage(CMD_BASE_SET_NETDEV, WifiCmdSetNetdev, 0),
    DUEMessage(CMD_BASE_SEND_ACTION, WifiCmdSendAction, 0),
    DUEMessage(CMD_BASE_SET_CLIENT, WifiCmdSetClient, 0),
    DUEMessage(CMD_BASE_GET_NETWORK_INFO, WifiCmdGetNetworkInfo, 0),
    DUEMessage(CMD_BASE_IS_SUPPORT_COMBO, WifiCmdIsSupportCombo, 0),
    DUEMessage(CMD_BASE_GET_SUPPORT_COMBO, WifiCmdGetSupportCombo, 0),
    DUEMessage(CMD_BASE_GET_DEV_MAC_ADDR, WifiCmdGetDevMacAddr, 0),
    DUEMessage(CMD_BASE_SET_MAC_ADDR, WifiCmdSetMacAddr, 0),
    DUEMessage(CMD_BASE_GET_VALID_FREQ, WifiCmdGetValidFreqsWithBand, 0),
    DUEMessage(CMD_BASE_SET_TX_POWER, WifiCmdSetTxPower, 0),
    DUEMessage(CMD_BASE_GET_CHIPID, WifiCmdGetChipId, 0),
    DUEMessage(CMD_BASE_GET_IFNAMES, WifiCmdGetIfNamesByChipId, 0),
    DUEMessage(CMD_BASE_RESET_DRIVER, WifiCmdResetDriver, 0),
    DUEMessage(CMD_BASE_GET_NETDEV_INFO, WifiCmdGetNetDevInfo, 0),
    DUEMessage(CMD_BASE_DO_RESET_PRIVATE, WifiCmdDoResetChip, 0),
    DUEMessage(CMD_BASE_GET_POWER_MODE, WifiCmdGetPowerMode, 0),
    DUEMessage(CMD_BASE_SET_POWER_MODE, WifiCmdSetPowerMode, 0),
    DUEMessage(CMD_BASE_START_CHANNEL_MEAS, WifiCmdStartChannelMeas, 0),
    DUEMessage(CMD_BASE_SET_PROJECTION_SCREEN_PARAM, WifiSetProjectionScreenParam, 0),
    DUEMessage(CMD_BASE_SEND_CMD_IOCTL, WifiSendCmdIoctl, 0),
    DUEMessage(CMD_BASE_GET_STATION_INFO, WifiGetStationInfo, 0),
};
ServiceDefine(BaseService, BASE_SERVICE_ID, g_wifiBaseFeatureCmds);

int32_t BaseInit(void)
{
    if (g_baseService == NULL) {
        ServiceCfg cfg = {.dispatcherId = DEFAULT_DISPATCHER_ID};
        g_baseService = CreateService(BaseService, &cfg);
        if (g_baseService == NULL) {
            HDF_LOGE("%s: The g_baseService is null, CreateService failed!", __func__);
            return HDF_FAILURE;
        }
    }
    return HDF_SUCCESS;
}

int32_t BaseDeinit(void)
{
    if (g_baseService != NULL && g_baseService->Destroy != NULL) {
        g_baseService->Destroy(g_baseService);
        g_baseService = NULL;
    }
    return HDF_SUCCESS;
}
