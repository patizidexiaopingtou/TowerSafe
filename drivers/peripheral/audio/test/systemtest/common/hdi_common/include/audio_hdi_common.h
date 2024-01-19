/**
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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

/**
 * @addtogroup Audio
 * @{
 *
 * @brief Defines audio-related APIs, including custom data types and functions for loading drivers,
 * accessing a driver adapter, and rendering and capturing audios.
 *
 * @since 1.0
 * @version 1.0
 */

/**
 * @file audio_adapter.h
 *
 * @brief Declares APIs for operations related to the audio adapter.
 *
 * @since 1.0
 * @version 1.0
 */

#ifndef AUDIO_HDI_COMMON_H
#define AUDIO_HDI_COMMON_H

#include <gtest/gtest.h>
#include "audio_adapter.h"
#include "audio_internal.h"
#include "audio_types.h"
#include "hdf_io_service_if.h"
#include "hdf_sbuf.h"

namespace OHOS {
namespace Audio {

#ifdef __LITEOS__
    const std::string AUDIO_FILE = "/userdata/audiorendertest.wav";
    const std::string LOW_LATENCY_AUDIO_FILE = "/userdata/lowlatencyrendertest.wav";
    const std::string AUDIO_CAPTURE_FILE = "/userdata/audiocapture.wav";
    const std::string AUDIO_LOW_LATENCY_CAPTURE_FILE = "/userdata/lowlatencycapturetest.wav";
#else
    const std::string AUDIO_FILE = "/data/test/audiorendertest.wav";
    const std::string LOW_LATENCY_AUDIO_FILE = "/data/test/lowlatencyrendertest.wav";
    const std::string AUDIO_CAPTURE_FILE = "/data/test/audiocapture.wav";
    const std::string AUDIO_LOW_LATENCY_CAPTURE_FILE = "/data/test/lowlatencycapturetest.wav";
#endif
const std::string ADAPTER_NAME = "primary";
const std::string ADAPTER_NAME_OUT = "primary_ext";

using TestAudioManager = struct AudioManager;
using TestGetAudioManager = TestAudioManager *(*)();
const std::string AUDIO_RIFF = "RIFF";
const std::string AUDIO_WAVE = "WAVE";
const std::string AUDIO_DATA = "data";
const uint32_t INT_32_MAX = 0x7fffffff;
const uint32_t INDEX_END = 555;
const uint32_t MOVE_RIGHT_NUM = 3;
const int MOVE_LEFT_NUM = 8;
const int CHANNELCOUNT = 2;
const int SAMPLERATE = 48000;
const int DEEP_BUFFER_RENDER_PERIOD_SIZE = 4*1024;
const float GAIN_MIN = 0;
const float GAIN_MAX = 15;
const uint64_t INITIAL_VALUE = 0;
const int BUFFER_LENTH = 1024 * 16;
const int FILE_CAPTURE_SIZE = 1024 * 1024 * 1;
const uint64_t MEGABYTE = 1024;
const int FRAME_SIZE = 1024;
const int FRAME_COUNT = 4;
const int ADAPTER_COUNT = 32;
const int TRY_NUM_FRAME = 20;
const int AUDIO_ADAPTER_MAX_NUM = 5;
const int AUDIO_WRITE_COMPELETED_VALUE = 1;
const int AUDIO_RENDER_FULL_VALUE = 2;
const int AUDIO_FLUSH_COMPLETED_VALUE = 3;
const int64_t SECTONSEC = 1000000000;
const int MICROSECOND = 1000000;
const int RANGE = 3;
const std::string HDF_CONTROL_SERVICE = "hdf_audio_control";
const std::string HDF_RENDER_SERVICE = "hdf_audio_render";
const std::string HDF_CAPTURE_SERVICE = "hdf_audio_capture";

const int AUDIODRV_CTL_ELEM_IFACE_MIXER = 2; /* virtual adc device */

constexpr int SAMPLE_RATE_8000 = 8000;
constexpr int SAMPLE_RATE_11025 = 11025;
constexpr int SAMPLE_RATE_22050 = 22050;
constexpr int SAMPLE_RATE_32000 = 32000;
constexpr int SAMPLE_RATE_44100 = 44100;
constexpr int SAMPLE_RATE_48000 = 48000;
constexpr int SAMPLE_RATE_12000 = 12000;
constexpr int SAMPLE_RATE_16000 = 16000;
constexpr int SAMPLE_RATE_24000 = 24000;
constexpr int SAMPLE_RATE_64000 = 64000;
constexpr int SAMPLE_RATE_96000 = 96000;
constexpr int DOUBLE_CHANNEL_COUNT = 2;
constexpr int SINGLE_CHANNEL_COUNT = 1;

enum ControlDispMethodCmd {
    AUDIODRV_CTRL_IOCTRL_ELEM_INFO,
    AUDIODRV_CTRL_IOCTRL_ELEM_READ,
    AUDIODRV_CTRL_IOCTRL_ELEM_WRITE,
    AUDIODRV_CTRL_IOCTRL_ELEM_BUTT,
};

constexpr int PCM_8_BIT  = 8;
constexpr int PCM_16_BIT = 16;
constexpr int PCM_24_BIT = 24;
constexpr int PCM_32_BIT = 32;

constexpr int PCM_BYTE_MIN = 1024;
constexpr int PCM_BYTE_MAX = 8 * 1024;

struct AudioCtlElemId {
    const char *cardServiceName;
    int32_t iface;
    const char *itemName; /* ASCII name of item */
};

struct AudioCtlElemValue {
    struct AudioCtlElemId id;
    int32_t value[2];
};

struct AudioHeadInfo {
    uint32_t testFileRiffId;
    uint32_t testFileRiffSize;
    uint32_t testFileFmt;
    uint32_t audioFileFmtId;
    uint32_t audioFileFmtSize;
    uint16_t audioFileFormat;
    uint16_t audioChannelNum;
    uint32_t audioSampleRate;
    uint32_t audioByteRate;
    uint16_t audioBlockAlign;
    uint16_t audioBitsPerSample;
    uint32_t dataId;
    uint32_t dataSize;
};

struct AudioCharacteristic {
    bool setmute;
    bool getmute;
    float setvolume;
    float getvolume;
    float setgain;
    float getgain;
    float gainthresholdmin;
    float gainthresholdmax;
    uint64_t getframes;
    uint64_t getframesize;
    uint64_t getframecount;
    uint32_t getcurrentchannelId;
    enum AudioChannelMode setmode;
    enum AudioChannelMode getmode;
    bool supported;
    uint32_t latencyTime;
};

struct PrepareAudioPara {
    TestAudioManager *manager;
    enum AudioPortDirection portType;
    const char *adapterName;
    struct AudioAdapter *adapter;
    struct AudioPort *audioPort;
    void *self;
    void *result;
    pthread_t tids;
    enum AudioPortPin pins;
    const char *path;
    struct AudioRender *render;
    struct AudioCapture *capture;
    struct AudioHeadInfo headInfo;
    struct AudioAdapterDescriptor *desc;
    struct AudioAdapterDescriptor *descs;
    char *frame;
    uint64_t requestBytes;
    uint64_t replyBytes;
    uint64_t fileSize;
    struct AudioSampleAttributes attrs;
    struct AudioCharacteristic character;
    struct AudioSampleAttributes attrsValue;
    struct AudioSceneDescriptor scenes;
    struct AudioPortCapability capability;
    enum AudioPortPassthroughMode mode;
    struct AudioTimeStamp time;
    struct timeval start;
    struct timeval end;
    int64_t delayTime;
    int64_t totalTime;
    float averageDelayTime;
    struct AudioDeviceDescriptor devDesc;
};

void InitAttrsCommon(struct AudioSampleAttributes &attrs);

void InitAttrs(struct AudioSampleAttributes &attrs);

void InitAttrsRender(struct AudioSampleAttributes &attrs);

void InitAttrsCapture(struct AudioSampleAttributes &attrs);

int32_t InitDevDesc(struct AudioDeviceDescriptor &devDesc, const uint32_t portId, int pins);

int32_t SwitchAdapter(struct AudioAdapterDescriptor *descs, const std::string &adapterNameCase,
    int portFlag, struct AudioPort *&audioPort, int size);

uint32_t PcmFormatToBits(int format);

uint32_t PcmFramesToBytes(const struct AudioSampleAttributes attrs);

int32_t WavHeadAnalysis(struct AudioHeadInfo &wavHeadInfo, FILE *file, struct AudioSampleAttributes &attrs);

int32_t GetAdapters(TestAudioManager *manager, struct AudioAdapterDescriptor **descs, int &size);

int32_t GetLoadAdapter(TestAudioManager *manager, int portType,
    const std::string &adapterName, struct AudioAdapter **adapter, struct AudioPort *&audioPort);

int32_t AudioCreateRender(TestAudioManager *manager, int pins, const std::string &adapterName,
    struct AudioAdapter **adapter, struct AudioRender **render);

int32_t AudioCreateCapture(TestAudioManager *manager, int pins, const std::string &adapterName,
    struct AudioAdapter **adapter, struct AudioCapture **capture);

int32_t FrameStart(struct AudioHeadInfo wavHeadInfo, struct AudioRender *render, FILE *file,
    struct AudioSampleAttributes attrs);

int32_t FrameStartCapture(struct AudioCapture *capture, FILE *file, const struct AudioSampleAttributes attrs);

int32_t RenderFramePrepare(const std::string &path, char *&frame, uint64_t &numRead);

void FrameStatus(int status);

int32_t StartRecord(struct AudioCapture *capture, FILE *file, uint64_t filesize);

int32_t WriteIdToBuf(struct HdfSBuf *sBuf, struct AudioCtlElemId id);

int32_t WriteEleValueToBuf(struct HdfSBuf *sBuf, struct AudioCtlElemValue elemvalue);

int32_t PowerOff(struct AudioCtlElemValue firstElemValue, struct AudioCtlElemValue secondElemValue);

int32_t CheckRegisterStatus(const struct AudioCtlElemId firstId, const struct AudioCtlElemId secondId,
    const int firstStatus, const int secondStatus);

int32_t AudioCreateStartRender(TestAudioManager *manager, struct AudioRender **render, struct AudioAdapter **adapter,
    const std::string &adapterName);

int32_t AudioRenderStartAndOneFrame(struct AudioRender *render);

int32_t StopAudio(struct PrepareAudioPara &audiopara);

int32_t ThreadRelease(struct PrepareAudioPara &audiopara);

int32_t AudioCreateStartCapture(TestAudioManager *manager, struct AudioCapture **capture,
    struct AudioAdapter **adapter, const std::string &adapterName);

int32_t AudioCaptureStartAndOneFrame(struct AudioCapture *capture);

int32_t PlayAudioFile(struct PrepareAudioPara &audiopara);

int32_t RecordAudio(struct PrepareAudioPara &audiopara);

void InitAttrsUpdate(struct AudioSampleAttributes &attrs, int format, uint32_t channelCount,
    uint32_t sampleRate, uint32_t silenceThreshold = BUFFER_LENTH);

int32_t AudioRenderSetGetSampleAttributes(struct AudioSampleAttributes attrs, struct AudioSampleAttributes &attrsValue,
    struct AudioRender *render);

int32_t AudioCaptureSetGetSampleAttributes(struct AudioSampleAttributes attrs, struct AudioSampleAttributes &attrsValue,
    struct AudioCapture *capture);

int32_t InitMmapDesc(FILE *fp, struct AudioMmapBufferDescripter &desc, int32_t &reqSize, bool flag);

int32_t PlayMapAudioFile(struct PrepareAudioPara &audiopara);

int32_t RecordMapAudio(struct PrepareAudioPara &audiopara);
int32_t AudioRenderCallback(enum AudioCallbackType type, void *reserved, void *cookie);
int32_t CheckFlushValue();
int32_t CheckRenderFullValue();
int32_t CheckWriteCompleteValue();

int32_t ReleaseCaptureSource(struct AudioManager *manager, struct AudioAdapter *&adapter,
    struct AudioCapture *&capture);

int32_t ReleaseRenderSource(struct AudioManager *manager, struct AudioAdapter *&adapter,
    struct AudioRender *&render);
}
}
#endif // AUDIO_HDI_COMMON_H

