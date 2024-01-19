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

#include <math.h>
#include <sys/mman.h>
#include "hdf_types.h"
#include "osal_mem.h"
#include "audio_adapter_info_common.h"
#include "audio_common.h"
#include "audio_interface_lib_capture.h"
#include "audio_internal.h"
#include "audio_uhdf_log.h"
#include "v1_0/iaudio_capture.h"

#define HDF_LOG_TAG AUDIO_HDI_IMPL

#define FRAME_SIZE        1024
#define CONFIG_FRAME_SIZE ((FRAME_SIZE) * 2)

#define CONFIG_FRAME_COUNT ((8000 * 2 + ((CONFIG_FRAME_SIZE) - 1)) / (CONFIG_FRAME_SIZE))
#define BITS_TO_FROMAT    3
#define VOLUME_AVERAGE    2
#define INTEGER_TO_DEC    10
#define DECIMAL_PART      5

/* add For Capture Bytes To Frames */
int32_t AudioCaptureStart(struct IAudioCapture *handle)
{
    struct AudioHwCapture *hwCapture = (struct AudioHwCapture *)handle;
    if (hwCapture == NULL) {
        AUDIO_FUNC_LOGE("The hwCapture is NULL");
        return AUDIO_ERR_INVALID_PARAM;
    }

    InterfaceLibModeCapturePassthrough *pInterfaceLibModeCapture = AudioPassthroughGetInterfaceLibModeCapture();
    if (pInterfaceLibModeCapture == NULL || *pInterfaceLibModeCapture == NULL) {
        AUDIO_FUNC_LOGE("pInterfaceLibModeCapture Fail!");
        return AUDIO_ERR_INTERNAL;
    }
    if (hwCapture->captureParam.frameCaptureMode.buffer != NULL) {
        AUDIO_FUNC_LOGE("IAudioCapture already start!");
        return AUDIO_ERR_AI_BUSY; // capture is busy now
    }
    if (hwCapture->devDataHandle == NULL) {
        AUDIO_FUNC_LOGE("CaptureStart Bind Fail!");
        return AUDIO_ERR_INTERNAL;
    }

    int32_t ret = (*pInterfaceLibModeCapture)(
        hwCapture->devDataHandle, &hwCapture->captureParam, AUDIO_DRV_PCM_IOCTRL_START_CAPTURE);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("AudioCaptureStart SetParams FAIL");
        return AUDIO_ERR_INTERNAL;
    }

    char *tbuffer = (char *)OsalMemCalloc(FRAME_DATA);
    if (tbuffer == NULL) {
        AUDIO_FUNC_LOGE("Calloc Capture tbuffer Fail!");
        return AUDIO_ERR_MALLOC_FAIL;
    }

    hwCapture->captureParam.frameCaptureMode.buffer = tbuffer;

    AudioLogRecord(AUDIO_INFO, "[%s]-[%s]-[%d] :> [%s]", __FILE__, __func__, __LINE__, "Audio Capture Start");
    return AUDIO_SUCCESS;
}

int32_t AudioCaptureStop(struct IAudioCapture *handle)
{
    struct AudioHwCapture *hwCapture = (struct AudioHwCapture *)handle;
    if (hwCapture == NULL) {
        AUDIO_FUNC_LOGE("hwCapture is null");
        return AUDIO_ERR_INVALID_PARAM;
    }
    if (hwCapture->devDataHandle == NULL) {
        AUDIO_FUNC_LOGE("CaptureStart Bind Fail!");
        return AUDIO_ERR_INTERNAL;
    }
    if (hwCapture->captureParam.frameCaptureMode.buffer != NULL) {
        AudioMemFree((void **)&hwCapture->captureParam.frameCaptureMode.buffer);
    } else {
        AUDIO_FUNC_LOGE("Repeat invalid stop operation!");
        return AUDIO_ERR_NOT_SUPPORT;
    }

    InterfaceLibModeCapturePassthrough *pInterfaceLibModeCapture = AudioPassthroughGetInterfaceLibModeCapture();
    if (pInterfaceLibModeCapture == NULL || *pInterfaceLibModeCapture == NULL) {
        AUDIO_FUNC_LOGE("pInterfaceLibModeCapture Fail!");
        return AUDIO_ERR_INTERNAL;
    }

    int32_t ret = (*pInterfaceLibModeCapture)(
        hwCapture->devDataHandle, &hwCapture->captureParam, AUDIO_DRV_PCM_IOCTRL_STOP_CAPTURE);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("AudioCaptureStop SetParams FAIL");
        return AUDIO_ERR_INTERNAL;
    }

    AudioLogRecord(AUDIO_INFO, "[%s]-[%s]-[%d] :> [%s]", __FILE__, __func__, __LINE__, "Audio Capture Stop");
    return AUDIO_SUCCESS;
}

int32_t AudioCapturePause(struct IAudioCapture *handle)
{
    struct AudioHwCapture *hwCapture = (struct AudioHwCapture *)handle;
    if (hwCapture == NULL) {
        AUDIO_FUNC_LOGE("hwCapture is empty");
        return AUDIO_ERR_INVALID_PARAM;
    }
    if (hwCapture->captureParam.frameCaptureMode.buffer == NULL) {
        AUDIO_FUNC_LOGE("IAudioCapture already stop!");
        return AUDIO_ERR_INTERNAL;
    }
    if (hwCapture->captureParam.captureMode.ctlParam.pause) {
        AUDIO_FUNC_LOGE("Audio capture is already pause!");
        return AUDIO_ERR_NOT_SUPPORT;
    }
    if (hwCapture->devDataHandle == NULL) {
        AUDIO_FUNC_LOGE("CaptureStart Bind Fail!");
        return AUDIO_ERR_INTERNAL;
    }

    InterfaceLibModeCapturePassthrough *pInterfaceLibModeCapture = AudioPassthroughGetInterfaceLibModeCapture();
    if (pInterfaceLibModeCapture == NULL || *pInterfaceLibModeCapture == NULL) {
        AUDIO_FUNC_LOGE("pInterfaceLibModeCapture Fail!");
        return AUDIO_ERR_INTERNAL;
    }

    bool pauseStatus = hwCapture->captureParam.captureMode.ctlParam.pause;
    hwCapture->captureParam.captureMode.ctlParam.pause = true;

    int32_t ret = (*pInterfaceLibModeCapture)(
        hwCapture->devDataHandle, &hwCapture->captureParam, AUDIODRV_CTL_IOCTL_PAUSE_WRITE_CAPTURE);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("Audio Capture Pause FAIL!");
        hwCapture->captureParam.captureMode.ctlParam.pause = pauseStatus;
        return AUDIO_ERR_INTERNAL;
    }

    AudioLogRecord(AUDIO_INFO, "[%s]-[%s]-[%d] :> [%s]", __FILE__, __func__, __LINE__, "Audio Capture Pause");
    return AUDIO_SUCCESS;
}

int32_t AudioCaptureResume(struct IAudioCapture *handle)
{
    struct AudioHwCapture *hwCapture = (struct AudioHwCapture *)handle;
    if (hwCapture == NULL) {
        AUDIO_FUNC_LOGE("hwCapture is empty");
        return AUDIO_ERR_INVALID_PARAM;
    }
    if (!hwCapture->captureParam.captureMode.ctlParam.pause) {
        AUDIO_FUNC_LOGE("Audio capture is already Resume !");
        return AUDIO_ERR_NOT_SUPPORT;
    }
    if (hwCapture->devDataHandle == NULL) {
        AUDIO_FUNC_LOGE("Capture Start Bind Fail!");
        return AUDIO_ERR_INTERNAL;
    }

    InterfaceLibModeCapturePassthrough *pInterfaceLibModeCapture = AudioPassthroughGetInterfaceLibModeCapture();
    if (pInterfaceLibModeCapture == NULL || *pInterfaceLibModeCapture == NULL) {
        AUDIO_FUNC_LOGE("pInterfaceLibModeCapture Fail!");
        return AUDIO_ERR_INTERNAL;
    }

    bool resumeStatus = hwCapture->captureParam.captureMode.ctlParam.pause;
    hwCapture->captureParam.captureMode.ctlParam.pause = false;

    int32_t ret = (*pInterfaceLibModeCapture)(
        hwCapture->devDataHandle, &hwCapture->captureParam, AUDIODRV_CTL_IOCTL_PAUSE_WRITE_CAPTURE);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("Audio capture Resume FAIL!");
        hwCapture->captureParam.captureMode.ctlParam.pause = resumeStatus;
        return AUDIO_ERR_INTERNAL;
    }

    AudioLogRecord(AUDIO_INFO, "[%s]-[%s]-[%d] :> [%s]", __FILE__, __func__, __LINE__, "Audio Capture Resume");
    return AUDIO_SUCCESS;
}

int32_t AudioCaptureFlush(struct IAudioCapture *handle)
{
    struct AudioHwCapture *hwCapture = (struct AudioHwCapture *)handle;
    if (hwCapture == NULL) {
        AUDIO_FUNC_LOGE("hwCapture is empty");
        return AUDIO_ERR_INVALID_PARAM;
    }
    return AUDIO_ERR_NOT_SUPPORT;
}

int32_t AudioCaptureGetFrameSize(struct IAudioCapture *handle, uint64_t *size)
{
    struct AudioHwCapture *hwCapture = (struct AudioHwCapture *)handle;
    if (hwCapture == NULL || size == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }

    uint32_t channelCount = hwCapture->captureParam.frameCaptureMode.attrs.channelCount;
    enum AudioFormat format = hwCapture->captureParam.frameCaptureMode.attrs.format;
    uint32_t formatBitsCapture = 0;

    int32_t ret = FormatToBits(format, &formatBitsCapture);
    if (ret != AUDIO_SUCCESS) {
        return ret;
    }

    *size = FRAME_SIZE * channelCount * (formatBitsCapture >> BITS_TO_FROMAT);
    return AUDIO_SUCCESS;
}

int32_t AudioCaptureGetFrameCount(struct IAudioCapture *handle, uint64_t *count)
{
    struct AudioHwCapture *hwCapture = (struct AudioHwCapture *)handle;
    if (hwCapture == NULL || count == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }

    *count = hwCapture->captureParam.frameCaptureMode.frames;
    return AUDIO_SUCCESS;
}

int32_t AudioCaptureSetSampleAttributes(struct IAudioCapture *handle, const struct AudioSampleAttributes *attrs)
{
    struct AudioHwCapture *hwCapture = (struct AudioHwCapture *)handle;
    if (hwCapture == NULL || attrs == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }

    int32_t ret = AudioCheckParaAttr(attrs);
    if (ret != AUDIO_SUCCESS) {
        AUDIO_FUNC_LOGE("AudioCheckParaAttr error!");
        return ret;
    }

    struct AudioSampleAttributes tempAttrs = hwCapture->captureParam.frameCaptureMode.attrs;
    hwCapture->captureParam.frameCaptureMode.attrs = *attrs;

    InterfaceLibModeCapturePassthrough *pInterfaceLibModeCapture = AudioPassthroughGetInterfaceLibModeCapture();
    if (pInterfaceLibModeCapture == NULL || *pInterfaceLibModeCapture == NULL) {
        hwCapture->captureParam.frameCaptureMode.attrs = tempAttrs;
        AUDIO_FUNC_LOGE("pInterfaceLibModeCapture Fail!");
        return AUDIO_ERR_INTERNAL;
    }
    if (hwCapture->devDataHandle == NULL) {
        hwCapture->captureParam.frameCaptureMode.attrs = tempAttrs;
        return AUDIO_ERR_INTERNAL;
    }

    ret = (*pInterfaceLibModeCapture)
        (hwCapture->devDataHandle, &hwCapture->captureParam, AUDIO_DRV_PCM_IOCTL_HW_PARAMS);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("CaptureSetSampleAttributes FAIL");
        hwCapture->captureParam.frameCaptureMode.attrs = tempAttrs;
        return AUDIO_ERR_INTERNAL;
    }
    return AUDIO_SUCCESS;
}

int32_t AudioCaptureGetSampleAttributes(struct IAudioCapture *handle, struct AudioSampleAttributes *attrs)
{
    struct AudioHwCapture *hwCapture = (struct AudioHwCapture *)handle;
    if (hwCapture == NULL || attrs == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }
    attrs->format = hwCapture->captureParam.frameCaptureMode.attrs.format;
    attrs->sampleRate = hwCapture->captureParam.frameCaptureMode.attrs.sampleRate;
    attrs->channelCount = hwCapture->captureParam.frameCaptureMode.attrs.channelCount;
    attrs->interleaved = hwCapture->captureParam.frameCaptureMode.attrs.interleaved;
    attrs->type = hwCapture->captureParam.frameCaptureMode.attrs.type;
    attrs->period = hwCapture->captureParam.frameCaptureMode.attrs.period;
    attrs->frameSize = hwCapture->captureParam.frameCaptureMode.attrs.frameSize;
    attrs->isBigEndian = hwCapture->captureParam.frameCaptureMode.attrs.isBigEndian;
    attrs->isSignedData = hwCapture->captureParam.frameCaptureMode.attrs.isSignedData;
    attrs->startThreshold = hwCapture->captureParam.frameCaptureMode.attrs.startThreshold;
    attrs->stopThreshold = hwCapture->captureParam.frameCaptureMode.attrs.stopThreshold;
    attrs->silenceThreshold = hwCapture->captureParam.frameCaptureMode.attrs.silenceThreshold;
    return AUDIO_SUCCESS;
}

int32_t AudioCaptureGetCurrentChannelId(struct IAudioCapture *handle, uint32_t *channelId)
{
    struct AudioHwCapture *hwCapture = (struct AudioHwCapture *)handle;
    if (hwCapture == NULL || channelId == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }

    *channelId = hwCapture->captureParam.frameCaptureMode.attrs.channelCount;
    return AUDIO_SUCCESS;
}

int32_t AudioCaptureCheckSceneCapability(
    struct IAudioCapture *handle, const struct AudioSceneDescriptor *scene, bool *supported)
{
    struct AudioHwCapture *hwCapture = (struct AudioHwCapture *)handle;
    if (hwCapture == NULL || scene == NULL || supported == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }
#ifndef AUDIO_HAL_NOTSUPPORT_PATHSELECT
    *supported = false;
    /* Temporary storage does not save the structure */
    struct AudioHwCaptureParam captureParam = hwCapture->captureParam;
    captureParam.frameCaptureMode.attrs.type = (enum AudioCategory)scene->scene.id;
    captureParam.captureMode.hwInfo.deviceDescript.pins = scene->desc.pins;

    PathSelAnalysisJson *pPathSelAnalysisJson = AudioPassthroughGetPathSelAnalysisJson();
    if (pPathSelAnalysisJson == NULL || *pPathSelAnalysisJson == NULL) {
        AUDIO_FUNC_LOGE("pPathSelAnalysisJson Is NULL!");
        return AUDIO_ERR_NOT_SUPPORT;
    }

    int32_t ret = (*pPathSelAnalysisJson)((void *)&captureParam, CHECKSCENE_PATH_SELECT_CAPTURE);
    if (ret < 0) {
        if (ret == AUDIO_ERR_NOT_SUPPORT) {
            AUDIO_FUNC_LOGE("AudioCaptureCheckSceneCapability not Support!");
            return AUDIO_ERR_NOT_SUPPORT;
        } else {
            AUDIO_FUNC_LOGE("AudioCaptureCheckSceneCapability fail!");
            return AUDIO_ERR_INTERNAL;
        }
    }
    *supported = true;
    return AUDIO_SUCCESS;
#else
    return AUDIO_ERR_NOT_SUPPORT;
#endif
}

int32_t AudioCaptureSelectScene(struct IAudioCapture *handle, const struct AudioSceneDescriptor *scene)
{
    struct AudioHwCapture *hwCapture = (struct AudioHwCapture *)handle;
    if (hwCapture == NULL || scene == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }
    if (hwCapture->devCtlHandle == NULL) {
        AUDIO_FUNC_LOGE("CaptureSelectScene Bind Fail!");
        return AUDIO_ERR_INTERNAL;
    }
#ifndef AUDIO_HAL_NOTSUPPORT_PATHSELECT
    PathSelAnalysisJson *pPathSelAnalysisJson = AudioPassthroughGetPathSelAnalysisJson();
    if (pPathSelAnalysisJson == NULL || *pPathSelAnalysisJson == NULL) {
        AUDIO_FUNC_LOGE("pPathSelAnalysisJson Is NULL!");
        return AUDIO_ERR_NOT_SUPPORT;
    }

    enum AudioCategory typeTemp = hwCapture->captureParam.frameCaptureMode.attrs.type;
    enum AudioPortPin pinsTemp = hwCapture->captureParam.captureMode.hwInfo.deviceDescript.pins;

    hwCapture->captureParam.frameCaptureMode.attrs.type = (enum AudioCategory)(scene->scene.id);
    hwCapture->captureParam.captureMode.hwInfo.deviceDescript.pins = scene->desc.pins;
    if ((*pPathSelAnalysisJson)((void *)&hwCapture->captureParam, CAPTURE_PATH_SELECT) < 0) {
        AUDIO_FUNC_LOGE("AudioCaptureSelectScene Fail!");
        hwCapture->captureParam.frameCaptureMode.attrs.type = typeTemp;
        hwCapture->captureParam.captureMode.hwInfo.deviceDescript.pins = pinsTemp;
        return AUDIO_ERR_INTERNAL;
    }

    InterfaceLibModeCapturePassthrough *pInterfaceLibModeCapture = AudioPassthroughGetInterfaceLibModeCapture();
    if (pInterfaceLibModeCapture == NULL || *pInterfaceLibModeCapture == NULL) {
        AUDIO_FUNC_LOGE("pInterfaceLibModeCapture Is NULL");
        hwCapture->captureParam.frameCaptureMode.attrs.type = typeTemp;
        hwCapture->captureParam.captureMode.hwInfo.deviceDescript.pins = pinsTemp;
        return AUDIO_ERR_INTERNAL;
    }

    int32_t ret = (*pInterfaceLibModeCapture)(
        hwCapture->devCtlHandle, &hwCapture->captureParam, AUDIODRV_CTL_IOCTL_SCENESELECT_CAPTURE);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("SetSelectSceneParams FAIL!");
        hwCapture->captureParam.frameCaptureMode.attrs.type = typeTemp;
        hwCapture->captureParam.captureMode.hwInfo.deviceDescript.pins = pinsTemp;
        return AUDIO_ERR_INTERNAL;
    }
    return AUDIO_SUCCESS;
#else
    return AUDIO_ERR_NOT_SUPPORT;
#endif
}

int32_t AudioCaptureSetMute(struct IAudioCapture *handle, bool mute)
{
    struct AudioHwCapture *impl = (struct AudioHwCapture *)handle;
    if (impl == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }
    if (impl->devCtlHandle == NULL) {
        AUDIO_FUNC_LOGE("CaptureSetMute Bind Fail!");
        return AUDIO_ERR_INTERNAL;
    }

    InterfaceLibModeCapturePassthrough *pInterfaceLibModeCapture = AudioPassthroughGetInterfaceLibModeCapture();
    if (pInterfaceLibModeCapture == NULL || *pInterfaceLibModeCapture == NULL) {
        AUDIO_FUNC_LOGE("pInterfaceLibModeCapture Fail!");
        return AUDIO_ERR_INTERNAL;
    }

    bool muteStatus = impl->captureParam.captureMode.ctlParam.mute;
    impl->captureParam.captureMode.ctlParam.mute = mute;

    int32_t ret =
        (*pInterfaceLibModeCapture)(impl->devCtlHandle, &impl->captureParam, AUDIODRV_CTL_IOCTL_MUTE_WRITE_CAPTURE);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("SetMute SetParams FAIL");
        impl->captureParam.captureMode.ctlParam.mute = muteStatus;
        return AUDIO_ERR_INTERNAL;
    }

    AudioLogRecord(AUDIO_INFO, "[%s]-[%s]-[%d] :> [Setmute = %d]", __FILE__, __func__, __LINE__, mute);
    return AUDIO_SUCCESS;
}

int32_t AudioCaptureGetMute(struct IAudioCapture *handle, bool *mute)
{
    struct AudioHwCapture *impl = (struct AudioHwCapture *)handle;
    if (impl == NULL || mute == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }
    if (impl->devCtlHandle == NULL) {
        AUDIO_FUNC_LOGE("CaptureGetMute Bind Fail!");
        return AUDIO_ERR_INTERNAL;
    }

    InterfaceLibModeCapturePassthrough *pInterfaceLibModeCapture = AudioPassthroughGetInterfaceLibModeCapture();
    if (pInterfaceLibModeCapture == NULL || *pInterfaceLibModeCapture == NULL) {
        AUDIO_FUNC_LOGE("pInterfaceLibModeCapture Fail!");
        return AUDIO_ERR_INTERNAL;
    }

    int32_t ret =
        (*pInterfaceLibModeCapture)(impl->devCtlHandle, &impl->captureParam, AUDIODRV_CTL_IOCTL_MUTE_READ_CAPTURE);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("GetMute SetParams FAIL");
        return AUDIO_ERR_INTERNAL;
    }

    *mute = impl->captureParam.captureMode.ctlParam.mute;

    AUDIO_FUNC_LOGI("Get Mute SUCCESS!");
    return AUDIO_SUCCESS;
}

int32_t AudioCaptureSetVolume(struct IAudioCapture *handle, float volume)
{
    struct AudioHwCapture *hwCapture = (struct AudioHwCapture *)handle;
    if (hwCapture == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }

    float volumeTemp = hwCapture->captureParam.captureMode.ctlParam.volume;
    float volMax = (float)hwCapture->captureParam.captureMode.ctlParam.volThreshold.volMax;
    float volMin = (float)hwCapture->captureParam.captureMode.ctlParam.volThreshold.volMin;
    if (hwCapture->devCtlHandle == NULL) {
        AUDIO_FUNC_LOGE("Bind Fail!");
        return AUDIO_ERR_INTERNAL;
    }
    if (volume < 0 || volume > 1) {
        AUDIO_FUNC_LOGE("volume param Is error!");
        return AUDIO_ERR_INVALID_PARAM;
    }

    InterfaceLibModeCapturePassthrough *pInterfaceLibModeCapture = AudioPassthroughGetInterfaceLibModeCapture();
    if (pInterfaceLibModeCapture == NULL || *pInterfaceLibModeCapture == NULL) {
        AUDIO_FUNC_LOGE("pInterfaceLibModeCapture Fail!");
        return AUDIO_ERR_INTERNAL;
    }

    volume = (volume == 0) ? 1 : (volume * VOLUME_CHANGE);

    /* change volume to db */
    float volTemp = ((volMax - volMin) / 2) * log10(volume) + volMin;
    if (volTemp < volMin || volTemp > volMax) {
        AUDIO_FUNC_LOGE("volTemp fail");
        return AUDIO_ERR_INTERNAL;
    }

    hwCapture->captureParam.captureMode.ctlParam.volume = volTemp;

    int32_t ret = (*pInterfaceLibModeCapture)(
        hwCapture->devCtlHandle, &hwCapture->captureParam, AUDIODRV_CTL_IOCTL_ELEM_WRITE_CAPTURE);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("SetParams FAIL!");
        hwCapture->captureParam.captureMode.ctlParam.volume = volumeTemp;
        return AUDIO_ERR_INTERNAL;
    }
    return AUDIO_SUCCESS;
}

int32_t AudioCaptureGetVolume(struct IAudioCapture *handle, float *volume)
{
    struct AudioHwCapture *hwCapture = (struct AudioHwCapture *)handle;
    if (hwCapture == NULL || volume == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }

    if (hwCapture->devCtlHandle == NULL) {
        AUDIO_FUNC_LOGE("CaptureStart Bind Fail!");
        return AUDIO_ERR_INTERNAL;
    }

    InterfaceLibModeCapturePassthrough *pInterfaceLibModeCapture = AudioPassthroughGetInterfaceLibModeCapture();
    if (pInterfaceLibModeCapture == NULL || *pInterfaceLibModeCapture == NULL) {
        AUDIO_FUNC_LOGE("pInterfaceLibModeCapture Fail!");
        return AUDIO_ERR_INTERNAL;
    }

    int32_t ret = (*pInterfaceLibModeCapture)(
        hwCapture->devCtlHandle, &hwCapture->captureParam, AUDIODRV_CTL_IOCTL_ELEM_READ_CAPTURE);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("Get Volume FAIL!");
        return AUDIO_ERR_INTERNAL;
    }

    float volumeTemp = hwCapture->captureParam.captureMode.ctlParam.volume;
    float volMax = (float)hwCapture->captureParam.captureMode.ctlParam.volThreshold.volMax;
    float volMin = (float)hwCapture->captureParam.captureMode.ctlParam.volThreshold.volMin;
    if ((volMax - volMin) == 0) {
        AUDIO_FUNC_LOGE("Divisor cannot be zero!");
        return AUDIO_ERR_INTERNAL;
    }
    volumeTemp = (volumeTemp - volMin) / ((volMax - volMin) / VOLUME_AVERAGE);

    int volumeT = (int)((pow(INTEGER_TO_DEC, volumeTemp) + DECIMAL_PART) / INTEGER_TO_DEC); // delet 0.X num

    *volume = (float)volumeT / INTEGER_TO_DEC;                                               // get volume (0-1)
    return AUDIO_SUCCESS;
}

int32_t AudioCaptureGetGainThreshold(struct IAudioCapture *handle, float *min, float *max)
{
    struct AudioHwCapture *hwCapture = (struct AudioHwCapture *)handle;
    if (hwCapture == NULL || min == NULL || max == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }
    if (hwCapture->devCtlHandle == NULL) {
        AUDIO_FUNC_LOGE("AudioCaptureGetGainThreshold Bind Fail!");
        return AUDIO_ERR_INTERNAL;
    }

    InterfaceLibModeCapturePassthrough *pInterfaceLibModeCapture = AudioPassthroughGetInterfaceLibModeCapture();
    if (pInterfaceLibModeCapture == NULL || *pInterfaceLibModeCapture == NULL) {
        AUDIO_FUNC_LOGE("pInterfaceLibModeCapture Is NULL");
        return AUDIO_ERR_INTERNAL;
    }

    int32_t ret = (*pInterfaceLibModeCapture)(
        hwCapture->devCtlHandle, &hwCapture->captureParam, AUDIODRV_CTL_IOCTL_GAINTHRESHOLD_CAPTURE);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("SetParams FAIL!");
        return AUDIO_ERR_INTERNAL;
    }

    *max = hwCapture->captureParam.captureMode.ctlParam.audioGain.gainMax;
    *min = hwCapture->captureParam.captureMode.ctlParam.audioGain.gainMin;
    return AUDIO_SUCCESS;
}

int32_t AudioCaptureGetGain(struct IAudioCapture *handle, float *gain)
{
    struct AudioHwCapture *impl = (struct AudioHwCapture *)handle;
    if (impl == NULL || gain == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }
    if (impl->devCtlHandle == NULL) {
        AUDIO_FUNC_LOGE("CaptureStart Bind Fail!");
        return AUDIO_ERR_INTERNAL;
    }

    InterfaceLibModeCapturePassthrough *pInterfaceLibModeCapture = AudioPassthroughGetInterfaceLibModeCapture();
    if (pInterfaceLibModeCapture == NULL || *pInterfaceLibModeCapture == NULL) {
        AUDIO_FUNC_LOGE("pInterfaceLibModeCapture Fail!");
        return AUDIO_ERR_INTERNAL;
    }

    int32_t ret =
        (*pInterfaceLibModeCapture)(impl->devCtlHandle, &impl->captureParam, AUDIODRV_CTL_IOCTL_GAIN_READ_CAPTURE);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("Get Volume FAIL!");
        return AUDIO_ERR_INTERNAL;
    }

    *gain = impl->captureParam.captureMode.ctlParam.audioGain.gain;
    return AUDIO_SUCCESS;
}

int32_t AudioCaptureSetGain(struct IAudioCapture *handle, float gain)
{
    struct AudioHwCapture *impl = (struct AudioHwCapture *)handle;
    if (impl == NULL || gain < 0) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }
    if (impl->devCtlHandle == NULL) {
        AUDIO_FUNC_LOGE("CaptureSetGain Bind Fail!");
        return AUDIO_ERR_INTERNAL;
    }

    float gainTemp = impl->captureParam.captureMode.ctlParam.audioGain.gain;
    impl->captureParam.captureMode.ctlParam.audioGain.gain = gain;

    InterfaceLibModeCapturePassthrough *pInterfaceLibModeCapture = AudioPassthroughGetInterfaceLibModeCapture();
    if (pInterfaceLibModeCapture == NULL || *pInterfaceLibModeCapture == NULL) {
        AUDIO_FUNC_LOGE("pInterfaceLibModeCapture Fail!");
        impl->captureParam.captureMode.ctlParam.audioGain.gain = gainTemp;
        return AUDIO_ERR_INTERNAL;
    }

    int32_t ret =
        (*pInterfaceLibModeCapture)(impl->devCtlHandle, &impl->captureParam, AUDIODRV_CTL_IOCTL_GAIN_WRITE_CAPTURE);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("CaptureSetGain FAIL!");
        impl->captureParam.captureMode.ctlParam.audioGain.gain = gainTemp;
        return AUDIO_ERR_INTERNAL;
    }
    return AUDIO_SUCCESS;
}

static int32_t LogErrorGetRensonAndTime(struct AudioHwCapture *hwCapture, int errorReason)
{
    if (hwCapture == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }
    if (hwCapture->errorLog.iter >= ERROR_LOG_MAX_NUM) {
        AUDIO_FUNC_LOGE("Capture item more then %{public}d.", ERROR_LOG_MAX_NUM);
        return AUDIO_ERR_INTERNAL;
    }
    if (hwCapture->errorLog.errorDump[hwCapture->errorLog.iter].reason == NULL) {
        hwCapture->errorLog.errorDump[hwCapture->errorLog.iter].reason = (char *)OsalMemCalloc(ERROR_REASON_DESC_LEN);
        if (hwCapture->errorLog.errorDump[hwCapture->errorLog.iter].reason == NULL) {
            AUDIO_FUNC_LOGE("Calloc reasonDesc Fail!");
            return AUDIO_ERR_MALLOC_FAIL;
        }
    }

    if (hwCapture->errorLog.errorDump[hwCapture->errorLog.iter].currentTime == NULL) {
        hwCapture->errorLog.errorDump[hwCapture->errorLog.iter].currentTime =
            (char *)OsalMemCalloc(ERROR_REASON_DESC_LEN);
        if (hwCapture->errorLog.errorDump[hwCapture->errorLog.iter].currentTime == NULL) {
            AUDIO_FUNC_LOGE("Calloc time Fail!");
            return AUDIO_ERR_MALLOC_FAIL;
        }
    }

    memset_s(hwCapture->errorLog.errorDump[hwCapture->errorLog.iter].reason, ERROR_REASON_DESC_LEN, 0,
        ERROR_REASON_DESC_LEN);
    memset_s(hwCapture->errorLog.errorDump[hwCapture->errorLog.iter].currentTime, ERROR_REASON_DESC_LEN, 0,
        ERROR_REASON_DESC_LEN);

    int32_t ret = GetErrorReason(errorReason, hwCapture->errorLog.errorDump[hwCapture->errorLog.iter].reason);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("Capture GetErrorReason failed!");
        return AUDIO_ERR_INTERNAL;
    }

    ret = GetCurrentTime(hwCapture->errorLog.errorDump[hwCapture->errorLog.iter].currentTime);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("Capture GetCurrentTime failed!");
        return AUDIO_ERR_INTERNAL;
    }
    return AUDIO_SUCCESS;
}

static void LogErrorCapture(AudioHandle handle, int errorCode, int reason)
{
    struct AudioHwCapture *hwCapture = (struct AudioHwCapture *)handle;
    if (hwCapture == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return;
    }

    hwCapture->errorLog.totalErrors++;
    if (hwCapture->errorLog.iter >= ERROR_LOG_MAX_NUM) {
        hwCapture->errorLog.iter = 0;
    }

    int32_t ret = LogErrorGetRensonAndTime(hwCapture, reason);
    if (ret < 0) {
        return;
    }
    if (errorCode == WRITE_FRAME_ERROR_CODE) {
        hwCapture->errorLog.errorDump[hwCapture->errorLog.iter].errorCode = errorCode;
        hwCapture->errorLog.errorDump[hwCapture->errorLog.iter].count = hwCapture->errorLog.iter;
        hwCapture->errorLog.errorDump[hwCapture->errorLog.iter].frames =
            hwCapture->captureParam.frameCaptureMode.frames;
        hwCapture->errorLog.iter++;
    }
}

int32_t AudioCaptureCaptureFrame(
    struct IAudioCapture *capture, int8_t *frame, uint32_t *frameLen, uint64_t requestBytes)
{
    struct AudioHwCapture *hwCapture = (struct AudioHwCapture *)capture;
    if (hwCapture == NULL || frame == NULL || frameLen == NULL ||
        hwCapture->captureParam.frameCaptureMode.buffer == NULL) {
        AUDIO_FUNC_LOGE("Param is NULL Fail!");
        return AUDIO_ERR_INVALID_PARAM;
    }

    InterfaceLibModeCapturePassthrough *pInterfaceLibModeCapture = AudioPassthroughGetInterfaceLibModeCapture();
    if (pInterfaceLibModeCapture == NULL || *pInterfaceLibModeCapture == NULL) {
        AUDIO_FUNC_LOGE("pInterfaceLibModeCapture Fail!");
        return AUDIO_ERR_INTERNAL;
    }
    if (hwCapture->devDataHandle == NULL) {
        return AUDIO_ERR_INTERNAL;
    }

    int32_t ret =
        (*pInterfaceLibModeCapture)(hwCapture->devDataHandle, &hwCapture->captureParam, AUDIO_DRV_PCM_IOCTL_READ);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("Capture Frame FAIL!");
        LogErrorCapture(capture, WRITE_FRAME_ERROR_CODE, ret);
        return AUDIO_ERR_INTERNAL;
    }
    if (requestBytes < hwCapture->captureParam.frameCaptureMode.bufferSize) {
        AUDIO_FUNC_LOGE("Capture Frame requestBytes too little!");
        return AUDIO_ERR_INTERNAL;
    }

    ret = memcpy_s(frame, (size_t)requestBytes, hwCapture->captureParam.frameCaptureMode.buffer,
        (size_t)hwCapture->captureParam.frameCaptureMode.bufferSize);
    if (ret != EOK) {
        AUDIO_FUNC_LOGE("memcpy_s fail");
        return AUDIO_ERR_INTERNAL;
    }

    *frameLen = (uint32_t)hwCapture->captureParam.frameCaptureMode.bufferSize;

    hwCapture->captureParam.frameCaptureMode.frames += hwCapture->captureParam.frameCaptureMode.bufferFrameSize;
    if (hwCapture->captureParam.frameCaptureMode.attrs.sampleRate == 0) {
        AUDIO_FUNC_LOGE("Divisor cannot be zero!");
        return AUDIO_ERR_INTERNAL;
    }
    if (TimeToAudioTimeStamp(hwCapture->captureParam.frameCaptureMode.bufferFrameSize,
        &hwCapture->captureParam.frameCaptureMode.time,
        hwCapture->captureParam.frameCaptureMode.attrs.sampleRate) == HDF_FAILURE) {
        AUDIO_FUNC_LOGE("Frame is NULL");
        return AUDIO_ERR_INTERNAL;
    }
    return AUDIO_SUCCESS;
}

int32_t AudioCaptureGetCapturePosition(struct IAudioCapture *capture, uint64_t *frames, struct AudioTimeStamp *time)
{
    struct AudioHwCapture *impl = (struct AudioHwCapture *)capture;
    if (impl == NULL || frames == NULL || time == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }

    *frames = impl->captureParam.frameCaptureMode.frames;
    *time = impl->captureParam.frameCaptureMode.time;
    return AUDIO_SUCCESS;
}

static int32_t SetValueCapture(struct ExtraParams mExtraParams, struct AudioHwCapture *capture)
{
    if (capture == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return HDF_FAILURE;
    }
    if (mExtraParams.route != -1) {
        capture->captureParam.captureMode.hwInfo.pathroute = mExtraParams.route;
    }
    if (mExtraParams.format != -1) {
        capture->captureParam.frameCaptureMode.attrs.format = mExtraParams.format;
    }
    if (mExtraParams.channels != 0) {
        capture->captureParam.frameCaptureMode.attrs.channelCount = mExtraParams.channels;
    }
    if (mExtraParams.flag) {
        capture->captureParam.frameCaptureMode.frames = mExtraParams.frames;
    }
    if (mExtraParams.sampleRate != 0) {
        capture->captureParam.frameCaptureMode.attrs.sampleRate = mExtraParams.sampleRate;
    }
    return HDF_SUCCESS;
}

int32_t AudioCaptureSetExtraParams(struct IAudioCapture *handle, const char *keyValueList)
{
    int32_t check = 0;
    int32_t count = 0;
    struct ExtraParams mExtraParams;

    struct AudioHwCapture *capture = (struct AudioHwCapture *)handle;
    if (capture == NULL || keyValueList == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }

    if (AudioSetExtraParams(keyValueList, &count, &mExtraParams, &check) < 0) {
        return AUDIO_ERR_INTERNAL;
    }
    if (count != 0 && check == count) {
        SetValueCapture(mExtraParams, capture);
        return AUDIO_SUCCESS;
    } else {
        AUDIO_FUNC_LOGE("AudioSetExtraParams error!");
        return AUDIO_ERR_INTERNAL;
    }
}

int32_t AudioCaptureGetExtraParams(struct IAudioCapture *handle, char *keyValueList, uint32_t listLenth)
{
    int32_t ret;
    struct AudioHwCapture *capture = (struct AudioHwCapture *)handle;
    if (capture == NULL || keyValueList == NULL || listLenth == 0) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }

    uint32_t bufferSize = strlen(ROUTE_SAMPLE) + strlen(FORMAT_SAMPLE) + strlen(CHANNELS_SAMPLE) +
        strlen(FRAME_COUNT_SAMPLE) + strlen(SAMPLING_RATE_SAMPLE) + 1;
    if (listLenth < bufferSize) {
        AUDIO_FUNC_LOGE("listLenth < bufferSize error!");
        return AUDIO_ERR_INTERNAL;
    }

    ret = AddElementToList(
        keyValueList, listLenth, AUDIO_ATTR_PARAM_ROUTE, &capture->captureParam.captureMode.hwInfo.pathroute);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("AddElementToList hwInfo.pathroute failed!");
        return AUDIO_ERR_INTERNAL;
    }

    ret = AddElementToList(
        keyValueList, listLenth, AUDIO_ATTR_PARAM_FORMAT, &capture->captureParam.frameCaptureMode.attrs.format);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("AddElementToList attrs.format failed!");
        return AUDIO_ERR_INTERNAL;
    }

    ret = AddElementToList(
        keyValueList, listLenth, AUDIO_ATTR_PARAM_CHANNELS, &capture->captureParam.frameCaptureMode.attrs.channelCount);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("AddElementToList attrs.channelCount failed!");
        return AUDIO_ERR_INTERNAL;
    }

    ret = AddElementToList(
        keyValueList, listLenth, AUDIO_ATTR_PARAM_FRAME_COUNT, &capture->captureParam.frameCaptureMode.frames);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("AddElementToList frameCaptureMode.frames failed!");
        return AUDIO_ERR_INTERNAL;
    }

    ret = AddElementToList(keyValueList, listLenth, AUDIO_ATTR_PARAM_SAMPLING_RATE,
        &capture->captureParam.frameCaptureMode.attrs.sampleRate);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("AddElementToList attrs.sampleRate failed!");
        return AUDIO_ERR_INTERNAL;
    }
    return AUDIO_SUCCESS;
}

static int32_t AudioCaptureReqMmapBufferInit(
    struct AudioHwCapture *capture, int32_t reqSize, const struct AudioMmapBufferDescripter *tempDesc)
{
    if (capture == NULL || capture->devDataHandle == NULL || tempDesc == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }
    int32_t flags = 0;
    int64_t fileSize = 0;
    struct AudioMmapBufferDescripter desc = *tempDesc;
    uint32_t formatBits = 0;
    int32_t ret = FormatToBits(capture->captureParam.frameCaptureMode.attrs.format, &formatBits);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("FormatToBits failed!");
        return ret;
    }

    FILE *fp = fopen(desc.filePath, "rb+");
    if (fp == NULL) {
        AUDIO_FUNC_LOGE("Open file failed!");
        return AUDIO_ERR_INTERNAL;
    }
    ret = SetDescParam(&desc, fp, reqSize, &fileSize, &flags);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("SetDescParam failed!");
        fclose(fp);
        return AUDIO_ERR_INTERNAL;
    }
    // formatBits Move right 3
    desc.totalBufferFrames = reqSize / (capture->captureParam.frameCaptureMode.attrs.channelCount * (formatBits >> 3));
    InterfaceLibModeCapturePassthrough *pInterfaceLibModeCapture = AudioPassthroughGetInterfaceLibModeCapture();
    if (pInterfaceLibModeCapture == NULL || *pInterfaceLibModeCapture == NULL) {
        AUDIO_FUNC_LOGE("pInterfaceLibModeCapture Is NULL");
        munmap(desc.memoryAddress, reqSize);
        fclose(fp);
        return AUDIO_ERR_INTERNAL;
    }
    capture->captureParam.frameCaptureMode.mmapBufDesc = desc;
    ret = (*pInterfaceLibModeCapture)(
        capture->devDataHandle, &capture->captureParam, AUDIO_DRV_PCM_IOCTL_MMAP_BUFFER_CAPTURE);
    if (msync(desc.memoryAddress, fileSize, MS_ASYNC) < 0) {
        AUDIO_FUNC_LOGE("sync fail!");
    }
    munmap(desc.memoryAddress, reqSize);
    (void)fclose(fp);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("AudioCaptureReqMmapBuffer FAIL!");
    }
    return ret;
}

int32_t AudioCaptureReqMmapBuffer(
    struct IAudioCapture *handle, int32_t reqSize, const struct AudioMmapBufferDescripter *desc)
{
    struct AudioHwCapture *capture = (struct AudioHwCapture *)handle;
    if (capture == NULL || capture->devDataHandle == NULL || desc == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }

    int32_t ret = AudioCaptureReqMmapBufferInit(capture, reqSize, desc);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("AudioCaptureReqMmapBufferInit failed!");
        return ret;
    }

    AUDIO_FUNC_LOGI("AudioCaptureReqMmapBuffer Success!");
    return AUDIO_SUCCESS;
}

int32_t AudioCaptureGetMmapPosition(struct IAudioCapture *handle, uint64_t *frames, struct AudioTimeStamp *time)
{
    struct AudioHwCapture *capture = (struct AudioHwCapture *)handle;
    if (capture == NULL || frames == NULL || time == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }

    InterfaceLibModeCapturePassthrough *pInterfaceLibModeCapture = AudioPassthroughGetInterfaceLibModeCapture();
    if (pInterfaceLibModeCapture == NULL || *pInterfaceLibModeCapture == NULL) {
        AUDIO_FUNC_LOGE("pInterfaceLibModeCapture Fail!");
        return AUDIO_ERR_INTERNAL;
    }

    if (capture->devDataHandle == NULL) {
        return AUDIO_ERR_INTERNAL;
    }

    int32_t ret = (*pInterfaceLibModeCapture)(
        capture->devDataHandle, &capture->captureParam, AUDIO_DRV_PCM_IOCTL_MMAP_POSITION_CAPTURE);
    if (ret < 0) {
        AUDIO_FUNC_LOGE("GetMmapPosition SetParams FAIL");
        return AUDIO_ERR_INTERNAL;
    }

    *frames = capture->captureParam.frameCaptureMode.frames;

    capture->captureParam.frameCaptureMode.time.tvSec = (int64_t)(capture->captureParam.frameCaptureMode.frames /
        capture->captureParam.frameCaptureMode.attrs.sampleRate);

    uint64_t lastBufFrames =
        capture->captureParam.frameCaptureMode.frames % capture->captureParam.frameCaptureMode.attrs.sampleRate;

    capture->captureParam.frameCaptureMode.time.tvNSec =
        (int64_t)((lastBufFrames * SEC_TO_NSEC) / capture->captureParam.frameCaptureMode.attrs.sampleRate);

    *time = capture->captureParam.frameCaptureMode.time;
    return AUDIO_SUCCESS;
}

int32_t AudioCaptureTurnStandbyMode(struct IAudioCapture *handle)
{
    struct AudioHwCapture *capture = (struct AudioHwCapture *)handle;
    if (capture == NULL) {
        AUDIO_FUNC_LOGE("capture is null");
        return AUDIO_ERR_INVALID_PARAM;
    }

    capture->captureParam.captureMode.hwInfo.deviceDescript.pins = PIN_NONE;

    int32_t ret = AudioCaptureStop((AudioHandle)capture);
    if (ret < 0) {
        return AUDIO_ERR_INTERNAL;
    }
    return AUDIO_SUCCESS;
}

int32_t AudioCaptureAudioDevDump(struct IAudioCapture *handle, int32_t range, int32_t fd)
{
    struct AudioHwCapture *capture = (struct AudioHwCapture *)handle;
    if (capture == NULL) {
        AUDIO_FUNC_LOGE("Parameter error!");
        return AUDIO_ERR_INVALID_PARAM;
    }

    dprintf(fd, "%s%d\n", "Number of errors: ", capture->errorLog.totalErrors);

    if (range < RANGE_MIN - 1 || range > RANGE_MAX) {
        dprintf(fd, "%s\n", "Out of range, invalid output");
        return AUDIO_SUCCESS;
    }

    uint32_t mSize = capture->errorLog.iter;
    if (range < RANGE_MIN) {
        dprintf(fd, "%-5s  %-10s  %s\n", "count", "errorCode", "Time");
        for (uint32_t i = 0; i < mSize; i++) {
            dprintf(fd, FORMAT_TWO, capture->errorLog.errorDump[i].count + 1, capture->errorLog.errorDump[i].errorCode,
                capture->errorLog.errorDump[i].currentTime);
        }
    } else {
        dprintf(fd, "%-5s  %-10s  %-20s  %-15s  %s\n", "count", "errorCode", "frames", "fail reason", "Time");
        for (uint32_t i = 0; i < mSize; i++) {
            dprintf(fd, FORMAT_ONE, capture->errorLog.errorDump[i].count + 1, capture->errorLog.errorDump[i].errorCode,
                capture->errorLog.errorDump[i].frames, capture->errorLog.errorDump[i].reason,
                capture->errorLog.errorDump[i].currentTime);
        }
    }
    return AUDIO_SUCCESS;
}

void AudioCaptureRelease(struct IAudioCapture *instance)
{
    (void)instance;
}
