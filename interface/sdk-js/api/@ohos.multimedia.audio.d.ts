/*
* Copyright (C) 2021 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import {ErrorCallback, AsyncCallback, Callback} from './basic';

/**
 * @namespace audio
 * @since 7
 */
declare namespace audio {
  /**
   * Enumerates audio errors.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Core
   */
  enum AudioErrors {
    /**
     * Invalid parameter.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    ERROR_INVALID_PARAM = 6800101,
    /**
     * Allocate memory failed.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    ERROR_NO_MEMORY     = 6800102,
    /**
     * Operation not permit at current state.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    ERROR_ILLEGAL_STATE = 6800103,
    /**
     * Unsupported option.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    ERROR_UNSUPPORTED   = 6800104,
    /**
     * Time out.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    ERROR_TIMEOUT       = 6800105,
    /**
     * Audio specific errors.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    ERROR_STREAM_LIMIT  = 6800201,
    /**
     * Default error.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    ERROR_SYSTEM        = 6800301
  }

  /**
   * Define local device network id for audio
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Device
   * @systemapi
   */
  const LOCAL_NETWORK_ID: string;

  /**
   * Define default volume group id for audio
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Volume
   */
  const DEFAULT_VOLUME_GROUP_ID: number;

  /**
   * Define default interrupt group id for audio
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Interrupt
   */
  const DEFAULT_INTERRUPT_GROUP_ID: number;

  /**
   * Obtains an {@link AudioManager} instance.
   * @returns AudioManager object.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Core
   */
  function getAudioManager(): AudioManager;

  /**
   * Obtains an {@link AudioCapturer} instance. This method uses an asynchronous callback to return the capturer instance.
   * @param options Capturer configurations.
   * @param callback Callback used to return the audio capturer instance.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Capturer
   */
  function createAudioCapturer(options: AudioCapturerOptions, callback: AsyncCallback<AudioCapturer>): void;

  /**
   * Obtains an {@link AudioCapturer} instance. This method uses a promise to return the capturer instance.
   * @param options Capturer configurations.
   * @returns Promise used to return the audio capturer instance.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Capturer
   */
  function createAudioCapturer(options: AudioCapturerOptions): Promise<AudioCapturer>;

  /**
   * Obtains an {@link AudioRenderer} instance. This method uses an asynchronous callback to return the renderer instance.
   * @param options Renderer configurations.
   * @param callback Callback used to return the audio renderer instance.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Renderer
   */
  function createAudioRenderer(options: AudioRendererOptions, callback: AsyncCallback<AudioRenderer>): void;

  /**
   * Obtains an {@link AudioRenderer} instance. This method uses a promise to return the renderer instance.
   * @param options Renderer configurations.
   * @returns Promise used to return the audio renderer instance.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Renderer
   */
  function createAudioRenderer(options: AudioRendererOptions): Promise<AudioRenderer>;

  /**
   * Obtains a {@link TonePlayer} instance. This method uses an asynchronous callback to return the renderer instance.
   * @param options Tone playing attribute.
   * @returns Promise used to return the tone player instance.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Tone
   * @systemapi
   */
  function createTonePlayer(options: AudioRendererInfo, callback: AsyncCallback<TonePlayer>): void;

  /**
   * Obtains a {@link TonePlayer} instance. This method uses a promise to return the renderer instance.
   * @param options Tone playing attribute.
   * @returns Promise used to return the tone player instance.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Tone
   * @systemapi
   */
  function createTonePlayer(options: AudioRendererInfo): Promise<TonePlayer>;

  /**
   * Enumerates the audio states.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Core
   */
  enum AudioState {
    /**
     * Invalid state.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    STATE_INVALID = -1,
    /**
     * Create new instance state.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    STATE_NEW = 0,
    /**
     * Prepared state.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    STATE_PREPARED = 1,
    /**
     * Running state.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    STATE_RUNNING = 2,
    /**
     * Stopped state.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    STATE_STOPPED = 3,
    /**
     * Released state.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    STATE_RELEASED = 4,
    /**
     * Paused state.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    STATE_PAUSED = 5
  }

  /**
   * Enumerates audio stream types.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Volume
   */
  enum AudioVolumeType {
    /**
     * Audio streams for voice calls.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    VOICE_CALL = 0,
    /**
     * Audio streams for ringtones.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    RINGTONE = 2,
    /**
     * Audio streams for media purpose.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    MEDIA = 3,
    /**
     * Audio stream for voice assistant.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    VOICE_ASSISTANT = 9,
    /**
     * Audio stream for all common.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @systemapi
     */
    ALL = 100,
  }

  /**
   * Enumerates audio device flags.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Device
   */
  enum DeviceFlag {
    /**
     * None devices.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @systemapi
     */
    NONE_DEVICES_FLAG = 0,
    /**
     * Output devices.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    OUTPUT_DEVICES_FLAG = 1,
    /**
     * Input devices.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    INPUT_DEVICES_FLAG = 2,
    /**
     * All devices.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    ALL_DEVICES_FLAG = 3,
    /**
     * Distributed output devices.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @systemapi
     */
    DISTRIBUTED_OUTPUT_DEVICES_FLAG = 4,
    /**
     * Distributed input devices.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @systemapi
     */
    DISTRIBUTED_INPUT_DEVICES_FLAG = 8,
    /**
     * All Distributed devices.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @systemapi
     */
    ALL_DISTRIBUTED_DEVICES_FLAG = 12,
  }

  /**
   * Enumerates device roles.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Device
   */
  enum DeviceRole {
    /**
     * Input role.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    INPUT_DEVICE = 1,
    /**
     * Output role.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    OUTPUT_DEVICE = 2,
  }

  /**
   * Enumerates device types.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Device
   */
  enum DeviceType {
    /**
     * Invalid device.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    INVALID = 0,
    /**
     * Built-in earpiece.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    EARPIECE = 1,
    /**
     * Built-in speaker.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    SPEAKER = 2,
    /**
     * Wired headset, which is a combination of a pair of earpieces and a microphone.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    WIRED_HEADSET = 3,
    /**
     * A pair of wired headphones.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    WIRED_HEADPHONES = 4,
    /**
     * Bluetooth device using the synchronous connection oriented link (SCO).
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    BLUETOOTH_SCO = 7,
    /**
     * Bluetooth device using advanced audio distribution profile (A2DP).
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    BLUETOOTH_A2DP = 8,
    /**
     * Built-in microphone.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    MIC = 15,
    /**
     * USB audio headset.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    USB_HEADSET = 22,
    /**
     * Default device type.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    DEFAULT = 1000,
  }

  /**
   * Enumerates the active device types.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Device
   * @deprecated since 9
   * @useinstead ohos.multimedia.audio.CommunicationDeviceType
   */
  enum ActiveDeviceType {
    /**
     * Speaker.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.CommunicationDeviceType.SPEAKER
     */
    SPEAKER = 2,
    /**
     * Bluetooth device using the SCO link.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @deprecated since 9
     */
    BLUETOOTH_SCO = 7,
  }

  /**
   * Enumerates the available device types for communication.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Communication
   */
  enum CommunicationDeviceType {
    /**
     * Speaker.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Communication
     */
    SPEAKER = 2
  }

  /**
   * Enumerates ringer modes.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Communication
   */
  enum AudioRingMode {
    /**
     * Silent mode.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Communication
     */
    RINGER_MODE_SILENT = 0,
    /**
     * Vibration mode.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Communication
     */
    RINGER_MODE_VIBRATE = 1,
    /**
     * Normal mode.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Communication
     */
    RINGER_MODE_NORMAL = 2,
  }

  /**
   * Enumerates the audio sample formats.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Core
   */
  enum AudioSampleFormat {
    /**
     * Invalid format.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SAMPLE_FORMAT_INVALID = -1,
    /**
     * Unsigned 8 format.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SAMPLE_FORMAT_U8 = 0,
    /**
     * Signed 16 bit integer, little endian.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SAMPLE_FORMAT_S16LE = 1,
    /**
     * Signed 24 bit integer, little endian.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SAMPLE_FORMAT_S24LE = 2,
    /**
     * Signed 32 bit integer, little endian.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SAMPLE_FORMAT_S32LE = 3,
    /**
     * Signed 32 bit float, little endian.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SAMPLE_FORMAT_F32LE = 4,
  }

  /**
   * Enumerates the audio channel.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Core
   */
  enum AudioChannel {
    /**
     * Channel 1.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    CHANNEL_1 = 0x1 << 0,
    /**
     * Channel 2.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    CHANNEL_2 = 0x1 << 1
  }

  /**
   * Enumerates the audio sampling rate.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Core
   */
  enum AudioSamplingRate {
    /**
     * 8kHz sample rate.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SAMPLE_RATE_8000 = 8000,
    /**
     * 11.025kHz sample rate.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SAMPLE_RATE_11025 = 11025,
    /**
     * 12kHz sample rate.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SAMPLE_RATE_12000 = 12000,
    /**
     * 16kHz sample rate.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SAMPLE_RATE_16000 = 16000,
    /**
     * 22.05kHz sample rate.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SAMPLE_RATE_22050 = 22050,
    /**
     * 24kHz sample rate.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SAMPLE_RATE_24000 = 24000,
    /**
     * 32kHz sample rate.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SAMPLE_RATE_32000 = 32000,
    /**
     * 44.1kHz sample rate.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SAMPLE_RATE_44100 = 44100,
    /**
     * 48kHz sample rate.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SAMPLE_RATE_48000 = 48000,
    /**
     * 64kHz sample rate.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SAMPLE_RATE_64000 = 64000,
    /**
     * 96kHz sample rate.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SAMPLE_RATE_96000 = 96000
  }

  /**
   * Enumerates the audio encoding type.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Core
   */
  enum AudioEncodingType {
    /**
     * Invalid type.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    ENCODING_TYPE_INVALID = -1,
    /**
     * PCM encoding.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    ENCODING_TYPE_RAW = 0
  }

  /**
   * Enumerates the audio content type.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Core
   */
  enum ContentType {
    /**
     * Unknown content.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    CONTENT_TYPE_UNKNOWN = 0,
    /**
     * Speech content.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    CONTENT_TYPE_SPEECH = 1,
    /**
     * Music content.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    CONTENT_TYPE_MUSIC = 2,
    /**
     * Movie content.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    CONTENT_TYPE_MOVIE = 3,
    /**
     * Notification content.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    CONTENT_TYPE_SONIFICATION = 4,
    /**
     * Ringtone content.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    CONTENT_TYPE_RINGTONE = 5,
  }

  /**
   * Enumerates the stream usage.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Core
   */
  enum StreamUsage {
    /**
     * Unknown usage.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    STREAM_USAGE_UNKNOWN = 0,
    /**
     * Media usage.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    STREAM_USAGE_MEDIA = 1,
    /**
     * Voice communication usage.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    STREAM_USAGE_VOICE_COMMUNICATION = 2,
    /**
     * Voice assistant broadcast usage.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    STREAM_USAGE_VOICE_ASSISTANT = 3,
    /**
     * Notification or ringtone usage.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    STREAM_USAGE_NOTIFICATION_RINGTONE = 6
  }

  /**
   * Enumerates the audio interrupt request type.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Interrupt
   * @systemapi
   */
  enum InterruptRequestType {
    /**
     * Default type to request audio interrupt.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Interrupt
     * @systemapi
     */
    INTERRUPT_REQUEST_TYPE_DEFAULT = 0,
  }

  /**
   * Describes audio stream information.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Core
   */
  interface AudioStreamInfo {
    /**
     * Sampling rate.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    samplingRate: AudioSamplingRate;
    /**
     * Audio channels.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    channels: AudioChannel;
    /**
     * Audio sample format.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    sampleFormat: AudioSampleFormat;
    /**
     * Audio encoding type.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    encodingType: AudioEncodingType;
  }

  /**
   * Describes audio renderer information.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Core
   */
  interface AudioRendererInfo {
    /**
     * Content type.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    content: ContentType;
    /**
     * Stream usage.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    usage: StreamUsage;
    /**
     * Audio renderer flags.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    rendererFlags: number;
  }

  /** 
   * Describes audio renderer filter.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Core
   * @systemapi
   */
  interface AudioRendererFilter {
    /**
     * Application uid.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @systemapi
     */
    uid: number;
    /**
     * Renderer information.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @systemapi
     */
    rendererInfo?: AudioRendererInfo;
    /**
     * AudioRenderer id.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @systemapi
     */
    rendererId?: number;
  }

  /**
   * Describes audio renderer configuration options.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Renderer
   */
  interface AudioRendererOptions {
    /**
     * Stream information.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    streamInfo: AudioStreamInfo;
    /**
     * Renderer information.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    rendererInfo: AudioRendererInfo;
  }

  /**
   * Enumerates the interrupt modes.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Interrupt
   */
  enum InterruptMode {
    /**
     * Mode that different stream share one interrupt unit.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Interrupt
     */
    SHARE_MODE = 0,
    /**
     * Mode that each stream has independent interrupt unit.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Interrupt
     */
    INDEPENDENT_MODE = 1
  }

  /**
   * Enumerates the audio renderer rates.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Renderer
   */
  enum AudioRendererRate {
    /**
     * Normal rate.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    RENDER_RATE_NORMAL = 0,
    /**
     * Double rate.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    RENDER_RATE_DOUBLE = 1,
    /**
     * Half rate.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    RENDER_RATE_HALF = 2
  }

  /**
   * Enumerates the interrupt types.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Renderer
   */
  enum InterruptType {
    /**
     * Audio playback interruption started.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    INTERRUPT_TYPE_BEGIN = 1,

    /**
     * Audio playback interruption ended.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    INTERRUPT_TYPE_END = 2
  }

  /**
   * Enumerates the interrupt hints.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Renderer
   */
  enum InterruptHint {
    /**
     * None.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    INTERRUPT_HINT_NONE = 0,
    /**
     * Resume the playback.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    INTERRUPT_HINT_RESUME = 1,

    /**
     * Paused/Pause the playback.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    INTERRUPT_HINT_PAUSE = 2,

    /**
     * Stopped/Stop the playback.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    INTERRUPT_HINT_STOP = 3,

    /**
     * Ducked the playback. (In ducking, the audio volume is reduced, but not silenced.)
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    INTERRUPT_HINT_DUCK = 4,

    /**
     * Unducked the playback.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    INTERRUPT_HINT_UNDUCK = 5,
  }

  /**
   * Enumerates the interrupt force types.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Renderer
   */
  enum InterruptForceType {
    /**
     * Forced action taken by system.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    INTERRUPT_FORCE = 0,
    /**
     * Share type, application can choose to take action or ignore.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    INTERRUPT_SHARE = 1
  }

  /**
   * Describes the interrupt event received by the app when playback is interrupted.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Renderer
   */
  interface InterruptEvent {
    /**
     * Indicates whether the interruption has started or finished.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    eventType: InterruptType;

    /**
     * Indicates whether the action is taken by system or to be taken by the app.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    forceType: InterruptForceType;

    /**
     * Indicates the kind of action.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    hintType: InterruptHint;
  }

  /**
   * Enumerates interrupt action types.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Renderer
   * @deprecated since 9
   */
  enum InterruptActionType {

    /**
     * Focus gain event.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @deprecated since 9
     */
    TYPE_ACTIVATED = 0,

    /**
     * Audio interruption event.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @deprecated since 9
     */
    TYPE_INTERRUPT = 1
  }

  /**
   * Enumerates device change types.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Device
   */
  enum DeviceChangeType {
    /**
     * Device connection.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    CONNECT = 0,

    /**
     * Device disconnection.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    DISCONNECT = 1,
  }

  /**
   * Enumerates audio scenes.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Communication
   */
  enum AudioScene {
    /**
     * Default audio scene
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Communication
     */
    AUDIO_SCENE_DEFAULT = 0,
    /**
     * Ringing audio scene
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Communication
     * @systemapi
     */
    AUDIO_SCENE_RINGING = 1,
    /**
     * Phone call audio scene
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Communication
     * @systemapi
     */
    AUDIO_SCENE_PHONE_CALL = 2,
    /**
     * Voice chat audio scene
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Communication
     */
    AUDIO_SCENE_VOICE_CHAT = 3
  }

  /**
   * Implements audio volume and audio device management.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Core
   */
  interface AudioManager {
    /**
     * Sets the volume for a stream. This method uses an asynchronous callback to return the result.
     * @param volumeType Audio stream type.
     * @param volume Volume to set. The value range can be obtained by calling getMinVolume and getMaxVolume.
     * @param callback Callback used to return the result.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @permission ohos.permission.ACCESS_NOTIFICATION_POLICY
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#setVolume
     */
    setVolume(volumeType: AudioVolumeType, volume: number, callback: AsyncCallback<void>): void;
    /**
     * Sets the volume for a stream. This method uses a promise to return the result.
     * @param volumeType Audio stream type.
     * @param volume Volume to set. The value range can be obtained by calling getMinVolume and getMaxVolume.
     * @returns Promise used to return the result.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @permission ohos.permission.ACCESS_NOTIFICATION_POLICY
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#setVolume
     */
    setVolume(volumeType: AudioVolumeType, volume: number): Promise<void>;
    /**
     * Obtains the volume of a stream. This method uses an asynchronous callback to return the query result.
     * @param volumeType Audio stream type.
     * @param callback Callback used to return the volume.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#getVolume
     */
    getVolume(volumeType: AudioVolumeType, callback: AsyncCallback<number>): void;
    /**
     * Obtains the volume of a stream. This method uses a promise to return the query result.
     * @param volumeType Audio stream type.
     * @returns Promise used to return the volume.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#getVolume
     */
    getVolume(volumeType: AudioVolumeType): Promise<number>;
    /**
     * Obtains the minimum volume allowed for a stream. This method uses an asynchronous callback to return the query result.
     * @param volumeType Audio stream type.
     * @param callback Callback used to return the minimum volume.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#getMinVolume
     */
    getMinVolume(volumeType: AudioVolumeType, callback: AsyncCallback<number>): void;
    /**
     * Obtains the minimum volume allowed for a stream. This method uses a promise to return the query result.
     * @param volumeType Audio stream type.
     * @returns Promise used to return the minimum volume.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#getMinVolume
     */
    getMinVolume(volumeType: AudioVolumeType): Promise<number>;
    /**
     * Obtains the maximum volume allowed for a stream. This method uses an asynchronous callback to return the query result.
     * @param volumeType Audio stream type.
     * @param callback Callback used to return the maximum volume.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#getMaxVolume
     */
    getMaxVolume(volumeType: AudioVolumeType, callback: AsyncCallback<number>): void;
    /**
     * Obtains the maximum volume allowed for a stream. This method uses a promise to return the query result.
     * @param volumeType Audio stream type.
     * @returns Promise used to return the maximum volume.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#getMaxVolume
     */
    getMaxVolume(volumeType: AudioVolumeType): Promise<number>;
    /**
     * Obtains the audio devices with a specific flag. This method uses an asynchronous callback to return the query result.
     * @param deviceFlag Audio device flag.
     * @param callback Callback used to return the device list.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioRoutingManager#getDevices
     */
    getDevices(deviceFlag: DeviceFlag, callback: AsyncCallback<AudioDeviceDescriptors>): void;
    /**
     * Obtains the audio devices with a specific flag. This method uses a promise to return the query result.
     * @param deviceFlag Audio device flag.
     * @returns Promise used to return the device list.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioRoutingManager#getDevices
     */
    getDevices(deviceFlag: DeviceFlag): Promise<AudioDeviceDescriptors>;
    /**
     * Mutes a stream. This method uses an asynchronous callback to return the result.
     * @param volumeType Audio stream type.
     * @param mute Mute status to set. The value true means to mute the stream, and false means the opposite.
     * @param callback Callback used to return the result.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#mute
     */
    mute(volumeType: AudioVolumeType, mute: boolean, callback: AsyncCallback<void>): void;
    /**
     * Mutes a stream. This method uses a promise to return the result.
     * @param volumeType Audio stream type.
     * @param mute Mute status to set. The value true means to mute the stream, and false means the opposite.
     * @returns Promise used to return the result.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#mute
     */
    mute(volumeType: AudioVolumeType, mute: boolean): Promise<void>;
    /**
     * Checks whether a stream is muted. This method uses an asynchronous callback to return the query result.
     * @param volumeType Audio stream type.
     * @param callback Callback used to return the mute status of the stream. The value true means that the stream is
     * muted, and false means the opposite.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#isMute
     */
    isMute(volumeType: AudioVolumeType, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether a stream is muted. This method uses a promise to return the result.
     * @param volumeType Audio stream type.
     * @returns Promise used to return the mute status of the stream. The value true means that the stream is muted,
     * and false means the opposite.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#isMute
     */
    isMute(volumeType: AudioVolumeType): Promise<boolean>;
    /**
     * Checks whether a stream is active. This method uses an asynchronous callback to return the query result.
     * @param volumeType Audio stream type.
     * @param callback Callback used to return the active status of the stream. The value true means that the stream is
     * active, and false means the opposite.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioStreamManager#isActive
     */
    isActive(volumeType: AudioVolumeType, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether a stream is active. This method uses a promise to return the query result.
     * @param volumeType Audio stream type.
     * @returns Promise used to return the active status of the stream. The value true means that the stream is active,
     * and false means the opposite.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioStreamManager#isActive
     */
    isActive(volumeType: AudioVolumeType): Promise<boolean>;
    /**
     * Mutes or unmutes the microphone. This method uses an asynchronous callback to return the result.
     * @param mute Mute status to set. The value true means to mute the microphone, and false means the opposite.
     * @param callback Callback used to return the result.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @permission ohos.permission.MICROPHONE
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#setMicrophoneMute
     */
    setMicrophoneMute(mute: boolean, callback: AsyncCallback<void>): void;
    /**
     * Mutes or unmutes the microphone. This method uses a promise to return the result.
     * @param mute Mute status to set. The value true means to mute the microphone, and false means the opposite.
     * @returns Promise used to return the result.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @permission ohos.permission.MICROPHONE
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#setMicrophoneMute
     */
    setMicrophoneMute(mute: boolean): Promise<void>;
    /**
     * Checks whether the microphone is muted. This method uses an asynchronous callback to return the query result.
     * @param Callback used to return the mute status of the microphone. The value true means that the microphone is
     * muted, and false means the opposite.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @permission ohos.permission.MICROPHONE
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#isMicrophoneMute
     */
    isMicrophoneMute(callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the microphone is muted. This method uses a promise to return the query result.
     * @returns Promise used to return the mute status of the microphone. The value true means that the microphone is
     * muted, and false means the opposite.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @permission ohos.permission.MICROPHONE
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#isMicrophoneMute
     */
    isMicrophoneMute(): Promise<boolean>;
    /**
     * Sets the ringer mode. This method uses an asynchronous callback to return the result.
     * @param mode Ringer mode.
     * @param callback Callback used to return the result.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Communication
     * @permission ohos.permission.ACCESS_NOTIFICATION_POLICY
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#setRingerMode
     */
    setRingerMode(mode: AudioRingMode, callback: AsyncCallback<void>): void;
    /**
     * Sets the ringer mode. This method uses a promise to return the result.
     * @param mode Ringer mode.
     * @returns Promise used to return the result.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Communication
     * @permission ohos.permission.ACCESS_NOTIFICATION_POLICY
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#setRingerMode
     */
    setRingerMode(mode: AudioRingMode): Promise<void>;
    /**
     * Obtains the ringer mode. This method uses an asynchronous callback to return the query result.
     * @param callback Callback used to return the ringer mode.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Communication
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#getRingerMode
     */
    getRingerMode(callback: AsyncCallback<AudioRingMode>): void;
    /**
     * Obtains the ringer mode. This method uses a promise to return the query result.
     * @returns Promise used to return the ringer mode.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Communication
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#getRingerMode
     */
    getRingerMode(): Promise<AudioRingMode>;
    /**
     * Sets an audio parameter. This method uses an asynchronous callback to return the result.
     * @param key Key of the audio parameter to set.
     * @param value Value of the audio parameter to set.
     * @param callback Callback used to return the result.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @permission ohos.permission.MODIFY_AUDIO_SETTINGS
     */
    setAudioParameter(key: string, value: string, callback: AsyncCallback<void>): void;
    /**
     * Sets an audio parameter. This method uses a promise to return the result.
     * @param key Key of the audio parameter to set.
     * @param value Value of the audio parameter to set.
     * @returns Promise used to return the result.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Core
     * @permission ohos.permission.MODIFY_AUDIO_SETTINGS
     */
    setAudioParameter(key: string, value: string): Promise<void>;
    /**
     * Obtains the value of an audio parameter. This method uses an asynchronous callback to return the query result.
     * @param key Key of the audio parameter whose value is to be obtained.
     * @param callback Callback used to return the value of the audio parameter.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    getAudioParameter(key: string, callback: AsyncCallback<string>): void;
    /**
     * Obtains the value of an audio parameter. This method uses a promise to return the query result.
     * @param key Key of the audio parameter whose value is to be obtained.
     * @returns Promise used to return the value of the audio parameter.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    getAudioParameter(key: string): Promise<string>;
    /**
     * Sets a device to the active state. This method uses an asynchronous callback to return the result.
     * @param deviceType Audio device type.
     * @param active Active status to set. The value true means to set the device to the active status, and false
     * means the opposite.
     * @param callback Callback used to return the result.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioRoutingManager#setCommunicationDevice
     */
    setDeviceActive(deviceType: ActiveDeviceType, active: boolean, callback: AsyncCallback<void>): void;
    /**
     * Sets a device to the active state. This method uses a promise to return the result.
     * @param deviceType Audio device type.
     * @param active Active status to set. The value true means to set the device to the active status, and false
     * means the opposite.
     * @returns Promise used to return the result.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioRoutingManager#setCommunicationDevice
     */
    setDeviceActive(deviceType: ActiveDeviceType, active: boolean): Promise<void>;
    /**
     * Checks whether a device is active. This method uses an asynchronous callback to return the query result.
     * @param deviceType Audio device type.
     * @param callback Callback used to return the active status of the device.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioRoutingManager#isCommunicationDeviceActive
     */
    isDeviceActive(deviceType: ActiveDeviceType, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether a device is active. This method uses a promise to return the query result.
     * @param deviceType Audio device type.
     * @returns Promise used to return the active status of the device.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioRoutingManager#isCommunicationDeviceActive
     */
    isDeviceActive(deviceType: ActiveDeviceType): Promise<boolean>;
    /**
     * Listens for system volume change events. This method uses a callback to get volume change events.
     * @param callback Callback used to get the system volume change event.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @systemapi
     * @useinstead ohos.multimedia.audio.AudioVolumeManager#event:volumeChange
     */
    on(type: 'volumeChange', callback: Callback<VolumeEvent>): void;
    /**
     * Listens for ringer mode change events. This method uses a callback to get ringer mode changes.
     * @param callback Callback used to get the updated ringer mode.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Communication
     * @systemapi
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioVolumeGroupManager#event:ringerModeChange
     */
    on(type: 'ringerModeChange', callback: Callback<AudioRingMode>): void;
    /**
     * Sets the audio scene mode to change audio strategies. This method uses an asynchronous callback to return the
     * result.
     * @param scene Audio scene mode.
     * @param callback Callback used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Communication
     * @systemapi
     */
    setAudioScene(scene: AudioScene, callback: AsyncCallback<void> ): void;
    /**
     * Sets the audio scene mode to change audio strategies. This method uses a promise to return the result.
     * @param scene Audio scene mode.
     * @returns Promise used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Communication
     * @systemapi
     */
    setAudioScene(scene: AudioScene): Promise<void>;
    /**
     * Obtains the audio scene mode. This method uses an asynchronous callback to return the query result.
     * @param callback Callback used to return the audio scene mode.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Communication
     */
    getAudioScene(callback: AsyncCallback<AudioScene>): void;
    /**
     * Obtains the audio scene mode. This method uses a promise to return the query result.
     * @returns Promise used to return the audio scene mode.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Communication
     */
    getAudioScene(): Promise<AudioScene>;
    /**
     * Subscribes to device change events. When a device is connected/disconnected, registered clients will receive
     * the callback.
     * @param callback Callback used to obtain the device update details.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioRoutingManager#event:deviceChange
     */
    on(type: 'deviceChange', callback: Callback<DeviceChangeAction>): void;

    /**
     * UnSubscribes to device change events.
     * @param callback Callback used to obtain the device update details.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @deprecated since 9
     * @useinstead ohos.multimedia.audio.AudioRoutingManager#event:deviceChange
     */
    off(type: 'deviceChange', callback?: Callback<DeviceChangeAction>): void;

    /**
     * Listens for audio interruption events. When the audio of an application is interrupted by another application,
     * the callback is invoked to notify the former application.
     * @param type Type of the event to listen for. Only the interrupt event is supported.
     * @param interrupt Parameters of the audio interruption event type.
     * @param callback Callback invoked for the audio interruption event.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    on(type: 'interrupt', interrupt: AudioInterrupt, callback: Callback<InterruptAction>): void;

    /**
     * Cancels the listening of audio interruption events.
     * @param type Type of the event to listen for. Only the interrupt event is supported.
     * @param interrupt Input parameters of the audio interruption event.
     * @param callback Callback invoked for the audio interruption event.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    off(type: 'interrupt', interrupt: AudioInterrupt, callback?: Callback<InterruptAction>): void;

    /**
     * Obtains an {@link AudioVolumeManager} instance.
     * @returns AudioVolumeManager instance.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    getVolumeManager(): AudioVolumeManager;

    /**
     * Obtains an {@link AudioStreamManager} instance.
     * @returns AudioStreamManager instance.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    getStreamManager(): AudioStreamManager;

    /**
     * Obtains an {@link AudioRoutingManager} instance.
     * @returns AudioRoutingManager instance.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    getRoutingManager(): AudioRoutingManager;
  }

  /**
   * Enumerates audio interrupt request result type.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Interrupt
   * @systemapi
   */
  enum InterruptRequestResultType {
    /**
     * Request audio interrupt success
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Interrupt
     * @systemapi
     */
    INTERRUPT_REQUEST_GRANT = 0,
    /**
     * Request audio interrupt fail, may have higher priority type
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Interrupt
     * @systemapi
     */
    INTERRUPT_REQUEST_REJECT = 1
  }

  /**
   * Describes audio interrupt operation results.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Interrupt
   * @systemapi
   */
  interface InterruptResult {
    /**
     * Interrupt request or abandon result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Interrupt
     * @systemapi
     */
    requestResult: InterruptRequestResultType;
    /**
     * Interrupt node as a unit to receive interrupt change event.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Interrupt
     * @systemapi
     */
    interruptNode: number;
  }

  /**
   * Implements audio router management.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Device
   */
  interface AudioRoutingManager {
    /**
     * Obtains the audio devices with a specific flag. This method uses an asynchronous callback to return the query result.
     * @param deviceFlag Audio device flag.
     * @param callback Callback used to return the device list.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    getDevices(deviceFlag: DeviceFlag, callback: AsyncCallback<AudioDeviceDescriptors>): void;
    /**
     * Obtains the audio devices with a specific flag. This method uses a promise to return the query result.
     * @param deviceFlag Audio device flag.
     * @returns Promise used to return the device list.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    getDevices(deviceFlag: DeviceFlag): Promise<AudioDeviceDescriptors>;

    /**
     * Subscribes to device change events. When a device is connected/disconnected, registered clients will receive
     * the callback.
     * @param deviceFlag Audio device flag.
     * @param callback Callback used to obtain the device update details.
     * @throws { BusinessError } 401 - if input parameter type or number mismatch
     * @throws { BusinessError } 6800101 - if input parameter value error
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    on(type: 'deviceChange', deviceFlag: DeviceFlag, callback: Callback<DeviceChangeAction>): void;

    /**
     * UnSubscribes to device change events.
     * @param callback Callback used to obtain the device update details.
     * @throws { BusinessError } 401 - if input parameter type or number mismatch
     * @throws { BusinessError } 6800101 - if input parameter value error
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    off(type: 'deviceChange', callback?: Callback<DeviceChangeAction>): void;

    /**
     * Sets a device to the active state. This method uses an asynchronous callback to return the result.
     * @param deviceType Audio device type.
     * @param active Active status to set. The value true means to set the device to the active status, and false
     * means the opposite.
     * @param callback Callback used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Communication
     */
    setCommunicationDevice(deviceType: CommunicationDeviceType, active: boolean, callback: AsyncCallback<void>): void;
    /**
     * Sets a device to the active state. This method uses a promise to return the result.
     * @param deviceType Audio device type.
     * @param active Active status to set. The value true means to set the device to the active status, and false
     * means the opposite.
     * @returns Promise used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Communication
     */
    setCommunicationDevice(deviceType: CommunicationDeviceType, active: boolean): Promise<void>;

    /**
     * Checks whether a device is active. This method uses an asynchronous callback to return the query result.
     * @param deviceType Audio device type.
     * @param callback Callback used to return the active status of the device.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Communication
     */
    isCommunicationDeviceActive(deviceType: CommunicationDeviceType, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether a device is active. This method uses a promise to return the query result.
     * @param deviceType Audio device type.
     * @returns Promise used to return the active status of the device.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Communication
     */
    isCommunicationDeviceActive(deviceType: CommunicationDeviceType): Promise<boolean>;

    /**
     * Select the output device. This method uses an asynchronous callback to return the result.
     * @param outputAudioDevices Audio device description
     * @param callback Callback used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @systemapi
     */
    selectOutputDevice(outputAudioDevices: AudioDeviceDescriptors, callback: AsyncCallback<void>): void;
    /**
     * Select the output device. This method uses a promise to return the result.
     * @param outputAudioDevices Audio device description
     * @returns Promise used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @systemapi
     */
    selectOutputDevice(outputAudioDevices: AudioDeviceDescriptors): Promise<void>;

    /**
     * Select the output device with desired AudioRenderer. This method uses an asynchronous callback to return the result.
     * @param filter Filter for AudioRenderer.
     * @param outputAudioDevices Audio device description
     * @param callback Callback used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @systemapi
     */
    selectOutputDeviceByFilter(filter: AudioRendererFilter, outputAudioDevices: AudioDeviceDescriptors, callback: AsyncCallback<void>): void;
    /**
     * Select the output device with desired AudioRenderer. This method uses a promise to return the result.
     * @param filter Filter for AudioRenderer.
     * @param outputAudioDevices Audio device description
     * @returns Promise used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @systemapi
     */
    selectOutputDeviceByFilter(filter: AudioRendererFilter, outputAudioDevices: AudioDeviceDescriptors): Promise<void>;

    /**
     * Select the input device. This method uses an asynchronous callback to return the result.
     * @param inputAudioDevices Audio device description
     * @param callback Callback used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @systemapi
     */
    selectInputDevice(inputAudioDevices: AudioDeviceDescriptors, callback: AsyncCallback<void>): void;
    /**
     * Select the input device. This method uses a promise to return the result.
     * @param inputAudioDevices Audio device description
     * @returns Promise used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @systemapi
     */
    selectInputDevice(inputAudioDevices: AudioDeviceDescriptors): Promise<void>;
  }

  /**
   * Implements audio stream management.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Core
   */
  interface AudioStreamManager {
    /**
     * Get information of current existing audio renderers.
     * @param callback Callback used to return the information of current existing audio renderers.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    getCurrentAudioRendererInfoArray(callback: AsyncCallback<AudioRendererChangeInfoArray>): void;
    /**
     * Get information of current existing audio renderers.
     * @returns Promise used to return the information of current existing audio renderers.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    getCurrentAudioRendererInfoArray(): Promise<AudioRendererChangeInfoArray>;

    /**
     * Get information of current existing audio capturers.
     * @param callback Callback used to return the information of current existing audio capturers.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    getCurrentAudioCapturerInfoArray(callback: AsyncCallback<AudioCapturerChangeInfoArray>): void;
    /**
     * Get information of current existing audio capturers.
     * @returns Promise used to return the information of current existing audio capturers.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    getCurrentAudioCapturerInfoArray(): Promise<AudioCapturerChangeInfoArray>;

    /**
     * Listens for audio renderer change events. When there is any audio renderer change,
     * registered clients will receive the callback.
     * @param type Type of the event to listen for. Only the audioRendererChange event is supported.
     * @param callback Callback invoked for the audio renderer change event.
     * @throws { BusinessError } 401 - if input parameter type or number mismatch
     * @throws { BusinessError } 6800101 - if input parameter value error
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    on(type: "audioRendererChange", callback: Callback<AudioRendererChangeInfoArray>): void;

    /**
     * UnSubscribes to audio renderer change events.
     * @throws { BusinessError } 401 - if input parameter type or number mismatch
     * @throws { BusinessError } 6800101 - if input parameter value error
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    off(type: "audioRendererChange"): void;

    /**
     * Listens for audio capturer change events. When there is any audio capturer change,
     * registered clients will receive the callback.
     * @param type Type of the event to listen for. Only the audioCapturerChange event is supported.
     * @param callback Callback invoked for the audio capturer change event.
     * @throws { BusinessError } 401 - if input parameter type or number mismatch
     * @throws { BusinessError } 6800101 - if input parameter value error
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    on(type: "audioCapturerChange", callback: Callback<AudioCapturerChangeInfoArray>): void;

    /**
     * UnSubscribes to audio capturer change events.
     * @throws { BusinessError } 401 - if input parameter type or number mismatch
     * @throws { BusinessError } 6800101 - if input parameter value error
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    off(type: "audioCapturerChange"): void;

    /**
     * Checks whether a stream is active. This method uses an asynchronous callback to return the query result.
     * @param volumeType Audio stream type.
     * @param callback Callback used to return the active status of the stream. The value true means that the stream is
     * active, and false means the opposite.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    isActive(volumeType: AudioVolumeType, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether a stream is active. This method uses a promise to return the query result.
     * @param volumeType Audio stream type.
     * @returns Promise used to return the active status of the stream. The value true means that the stream is active,
     * and false means the opposite.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    isActive(volumeType: AudioVolumeType): Promise<boolean>;
  }

  /**
   * Implements audio volume management.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Volume
   */
  interface AudioVolumeManager {
    /**
     * Get the volume group list for a networkId. This method uses an asynchronous callback to return the result.
     * @param networkId Distributed deice net work id
     * @param callback Callback used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @systemapi
     */
    getVolumeGroupInfos(networkId: string, callback: AsyncCallback<VolumeGroupInfos>): void;
    /**
     * Get the volume group list for a networkId. This method uses a promise to return the result.
     * @param networkId Distributed deice net work id
     * @returns Promise used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @systemapi
     */
    getVolumeGroupInfos(networkId: string): Promise<VolumeGroupInfos>;

    /**
     * Obtains an AudioVolumeGroupManager instance. This method uses an asynchronous callback to return the result.
     * @param groupId volume group id, use LOCAL_VOLUME_GROUP_ID in default
     * @param callback Callback used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    getVolumeGroupManager(groupId: number, callback: AsyncCallback<AudioVolumeGroupManager>): void;
    /**
     * Obtains an AudioVolumeGroupManager instance. This method uses a promise to return the result.
     * @param groupId volume group id, use LOCAL_VOLUME_GROUP_ID in default
     * @param callback Callback used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    getVolumeGroupManager(groupId: number): Promise<AudioVolumeGroupManager>;

    /**
     * Listens for system volume change events. This method uses a callback to get volume change events.
     * @param callback Callback used to get the system volume change event.
     * @throws { BusinessError } 401 - if input parameter type or number mismatch
     * @throws { BusinessError } 6800101 - if input parameter value error
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    on(type: 'volumeChange', callback: Callback<VolumeEvent>): void;
  }

  /**
   * Implements audio volume group management.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Volume
   */
  interface AudioVolumeGroupManager {
    /**
     * Sets the volume for a stream. This method uses an asynchronous callback to return the result.
     * @param volumeType Audio stream type.
     * @param volume Volume to set. The value range can be obtained by calling getMinVolume and getMaxVolume.
     * @param callback Callback used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @permission ohos.permission.ACCESS_NOTIFICATION_POLICY
     * @systemapi
     */
    setVolume(volumeType: AudioVolumeType, volume: number, callback: AsyncCallback<void>): void;
    /**
     * Sets the volume for a stream. This method uses a promise to return the result.
     * @param volumeType Audio stream type.
     * @param volume Volume to set. The value range can be obtained by calling getMinVolume and getMaxVolume.
     * @returns Promise used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @permission ohos.permission.ACCESS_NOTIFICATION_POLICY
     * @systemapi
     */
    setVolume(volumeType: AudioVolumeType, volume: number): Promise<void>;

    /**
     * Obtains the volume of a stream. This method uses an asynchronous callback to return the query result.
     * @param volumeType Audio stream type.
     * @param callback Callback used to return the volume.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    getVolume(volumeType: AudioVolumeType, callback: AsyncCallback<number>): void;
    /**
     * Obtains the volume of a stream. This method uses a promise to return the query result.
     * @param volumeType Audio stream type.
     * @returns Promise used to return the volume.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    getVolume(volumeType: AudioVolumeType): Promise<number>;

    /**
     * Obtains the minimum volume allowed for a stream. This method uses an asynchronous callback to return the query result.
     * @param volumeType Audio stream type.
     * @param callback Callback used to return the minimum volume.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    getMinVolume(volumeType: AudioVolumeType, callback: AsyncCallback<number>): void;
    /**
     * Obtains the minimum volume allowed for a stream. This method uses a promise to return the query result.
     * @param volumeType Audio stream type.
     * @returns Promise used to return the minimum volume.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    getMinVolume(volumeType: AudioVolumeType): Promise<number>;

    /**
     * Obtains the maximum volume allowed for a stream. This method uses an asynchronous callback to return the query result.
     * @param volumeType Audio stream type.
     * @param callback Callback used to return the maximum volume.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    getMaxVolume(volumeType: AudioVolumeType, callback: AsyncCallback<number>): void;
    /**
     * Obtains the maximum volume allowed for a stream. This method uses a promise to return the query result.
     * @param volumeType Audio stream type.
     * @returns Promise used to return the maximum volume.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    getMaxVolume(volumeType: AudioVolumeType): Promise<number>;

    /**
     * Mutes a stream. This method uses an asynchronous callback to return the result.
     * @param volumeType Audio stream type.
     * @param mute Mute status to set. The value true means to mute the stream, and false means the opposite.
     * @param callback Callback used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @permission ohos.permission.ACCESS_NOTIFICATION_POLICY
     * @systemapi
     */
    mute(volumeType: AudioVolumeType, mute: boolean, callback: AsyncCallback<void>): void;
    /**
     * Mutes a stream. This method uses a promise to return the result.
     * @param volumeType Audio stream type.
     * @param mute Mute status to set. The value true means to mute the stream, and false means the opposite.
     * @returns Promise used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @permission ohos.permission.ACCESS_NOTIFICATION_POLICY
     * @systemapi
     */
    mute(volumeType: AudioVolumeType, mute: boolean): Promise<void>;

    /**
     * Checks whether a stream is muted. This method uses an asynchronous callback to return the query result.
     * @param volumeType Audio stream type.
     * @param callback Callback used to return the mute status of the stream. The value true means that the stream is
     * muted, and false means the opposite.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    isMute(volumeType: AudioVolumeType, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether a stream is muted. This method uses a promise to return the result.
     * @param volumeType Audio stream type.
     * @returns Promise used to return the mute status of the stream. The value true means that the stream is muted,
     * and false means the opposite.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    isMute(volumeType: AudioVolumeType): Promise<boolean>;

    /**
     * Sets the ringer mode. This method uses an asynchronous callback to return the result.
     * @param mode Ringer mode.
     * @param callback Callback used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @permission ohos.permission.ACCESS_NOTIFICATION_POLICY
     * @systemapi
     */
    setRingerMode(mode: AudioRingMode, callback: AsyncCallback<void>): void;
    /**
     * Sets the ringer mode. This method uses a promise to return the result.
     * @param mode Ringer mode.
     * @returns Promise used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @permission ohos.permission.ACCESS_NOTIFICATION_POLICY
     * @systemapi
     */
    setRingerMode(mode: AudioRingMode): Promise<void>;

    /**
     * Obtains the ringer mode. This method uses an asynchronous callback to return the query result.
     * @param callback Callback used to return the ringer mode.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    getRingerMode(callback: AsyncCallback<AudioRingMode>): void;
    /**
     * Obtains the ringer mode. This method uses a promise to return the query result.
     * @returns Promise used to return the ringer mode.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    getRingerMode(): Promise<AudioRingMode>;

    /**
     * Listens for ringer mode change events. This method uses a callback to get ringer mode changes.
     * @param callback Callback used to get the updated ringer mode.
     * @throws { BusinessError } 401 - if input parameter type or number mismatch
     * @throws { BusinessError } 6800101 - if input parameter value error
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    on(type: 'ringerModeChange', callback: Callback<AudioRingMode>): void;

    /**
     * Mutes or unmutes the microphone. This method uses an asynchronous callback to return the result.
     * @param mute Mute status to set. The value true means to mute the microphone, and false means the opposite.
     * @param callback Callback used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @permission ohos.permission.MANAGE_AUDIO_CONFIG
     */
    setMicrophoneMute(mute: boolean, callback: AsyncCallback<void>): void;
    /**
     * Mutes or unmutes the microphone. This method uses a promise to return the result.
     * @param mute Mute status to set. The value true means to mute the microphone, and false means the opposite.
     * @returns Promise used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @permission ohos.permission.MANAGE_AUDIO_CONFIG
     */
    setMicrophoneMute(mute: boolean): Promise<void>;

    /**
     * Checks whether the microphone is muted. This method uses an asynchronous callback to return the query result.
     * @param Callback used to return the mute status of the microphone. The value true means that the microphone is
     * muted, and false means the opposite.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    isMicrophoneMute(callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the microphone is muted. This method uses a promise to return the query result.
     * @returns Promise used to return the mute status of the microphone. The value true means that the microphone is
     * muted, and false means the opposite.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    isMicrophoneMute(): Promise<boolean>;

    /**
     * Listens for system microphone state change events. This method uses a callback to get microphone change events.
     * @param callback Callback used to get the system microphone state change event.
     * @throws { BusinessError } 401 - if input parameter type or number mismatch
     * @throws { BusinessError } 6800101 - if input parameter value error
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    on(type: 'micStateChange', callback: Callback<MicStateChangeEvent>): void;
  }

  /**
   * Describes an audio volume group.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Volume
   * @systemapi
   */
  enum ConnectType {
    /**
     * Connect type for local device.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    CONNECT_TYPE_LOCAL = 1,

    /**
     * Connect type for distributed device.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    CONNECT_TYPE_DISTRIBUTED = 2
  }

  /**
   * Describes an audio volume group.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Volume
   * @systemapi
   */
  interface VolumeGroupInfo {
    /**
     * Device network id.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @systemapi
     */
    readonly networkId: string;

    /**
     * Volume group id.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    readonly groupId: number;

    /**
     * Volume mapping group id.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    readonly mappingId: number;

    /**
     * Volume group name.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    readonly groupName: string;

    /**
     * Connect type of device for this group.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    readonly type: ConnectType;
  }

  /**
   * Array of VolumeGroupInfos, which is read-only.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Volume
   * @systemapi
   */
  type VolumeGroupInfos = Array<Readonly<VolumeGroupInfo>>;

  /**
   * Array of AudioRendererChangeInfo, which is read-only.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Renderer
   */
  type AudioRendererChangeInfoArray = Array<Readonly<AudioRendererChangeInfo>>;

  /**
   * Describes audio renderer change information.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Renderer
   */
  interface AudioRendererChangeInfo {
    /**
     * Audio stream unique id.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    readonly streamId: number;

    /**
     * Uid for audio renderer client application.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @systemapi
     */
    readonly clientUid: number;

    /**
     * Audio renderer information.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    readonly rendererInfo: AudioRendererInfo;

    /**
     * Audio state.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @systemapi
     */
    readonly rendererState: AudioState;

    /**
     * Audio output devices.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    readonly deviceDescriptors: AudioDeviceDescriptors;
  }

  /**
   * Array of AudioCapturerChangeInfo, which is read-only.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Capturer
   */
  type AudioCapturerChangeInfoArray = Array<Readonly<AudioCapturerChangeInfo>>;

  /**
   * Describes audio capturer change information.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Capturer
   */
  interface AudioCapturerChangeInfo {
    /**
     * Audio stream unique id.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    readonly streamId: number;

    /**
     * Uid for audio capturer client application.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     * @systemapi
     */
    readonly clientUid: number;

    /**
     * Audio capturer information.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    readonly capturerInfo: AudioCapturerInfo;

    /**
     * Audio state.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     * @systemapi
     */
    readonly capturerState: AudioState;

    /**
     * Audio input devices.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    readonly deviceDescriptors: AudioDeviceDescriptors;
  }

  /**
   * Describes an audio device.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Device
   */
  interface AudioDeviceDescriptor {
    /**
     * Audio device role.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    readonly deviceRole: DeviceRole;

    /**
     * Audio device type.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    readonly deviceType: DeviceType;

    /**
     * Audio device id.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    readonly id: number;

    /**
     * Audio device name.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    readonly name: string;

    /**
     * Audio device address.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    readonly address: string;

    /**
     * Supported sampling rates.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    readonly sampleRates: Array<number>;

    /**
     * Supported channel counts.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    readonly channelCounts: Array<number>;

    /**
     * Supported channel masks.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    readonly channelMasks: Array<number>;
    /**
     * Device network id
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @systemapi
     */
    readonly networkId: string;
    /**
     * Interrupt group id
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @systemapi
     */
    readonly interruptGroupId: number;
    /**
     * Volume group id
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     * @systemapi
     */
    readonly volumeGroupId: number;
  }

  /**
   * Array of AudioDeviceDescriptors, which is read-only.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Device
   */
  type AudioDeviceDescriptors = Array<Readonly<AudioDeviceDescriptor>>;

  /**
   * Describes the volume event received by the app when the volume is changed.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Volume
   */
  interface VolumeEvent {
    /**
     * Volume type of the current stream.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    volumeType: AudioVolumeType;
    /**
     * Volume level.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    volume: number;
    /**
     * Whether to show the volume change in UI.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     */
    updateUi: boolean;
    /**
     * volumeGroup id
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @systemapi
     */
    volumeGroupId: number;
    /**
     * Device network id
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Volume
     * @systemapi
     */
    networkId: string;
  }

  /**
   * Describes the callback invoked for audio interruption or focus gain events.When the audio of an application
   * is interrupted by another application, the callback is invoked to notify the former application.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Renderer
   * @deprecated since 9
   * @useinstead ohos.multimedia.audio.InterruptEvent
   */
  interface InterruptAction {

    /**
     * Event type.
     * The value TYPE_ACTIVATED means the focus gain event, and TYPE_INTERRUPT means the audio interruption event.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @deprecated since 9
     */
    actionType: InterruptActionType;

    /**
     * Type of the audio interruption event.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @deprecated since 9
     */
    type?: InterruptType;

    /**
     * Hint for the audio interruption event.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @deprecated since 9
     */
    hint?: InterruptHint;

    /**
     * Whether the focus is gained or released. The value true means that the focus is gained or released,
     * and false means that the focus fails to be gained or released.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @deprecated since 9
     */
    activated?: boolean;
  }

  /**
   * Describes input parameters of audio listening events.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Renderer
   * @deprecated since 9
   */
  interface AudioInterrupt {

    /**
     * Audio stream usage type.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @deprecated since 9
     */
    streamUsage: StreamUsage;

    /**
     * Type of the media interrupted.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @deprecated since 9
     */
    contentType: ContentType;

    /**
     * Whether audio playback can be paused when it is interrupted.
     * The value true means that audio playback can be paused when it is interrupted, and false means the opposite.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     * @deprecated since 9
     */
    pauseWhenDucked: boolean;
  }

  /**
   * Describes the microphone state change event received by the app when the microphone state is changed.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Device
   */
   interface MicStateChangeEvent {
    /**
     * Mic mute state.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    mute: boolean;
  }
  /**
   * Describes the device change type and device information.
   * @since 7
   * @syscap SystemCapability.Multimedia.Audio.Device
   */
  interface DeviceChangeAction {
    /**
     * Device change type.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    type: DeviceChangeType;

    /**
     * Device information.
     * @since 7
     * @syscap SystemCapability.Multimedia.Audio.Device
     */
    deviceDescriptors: AudioDeviceDescriptors;
  }

  /**
   * Provides audio playback APIs.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Renderer
   */
  interface AudioRenderer {
    /**
     * Defines the current render state.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    readonly state: AudioState;

    /**
     * Obtains the renderer information provided while creating a renderer instance. This method uses an asynchronous
     * callback to return the result.
     * @param callback Callback used to return the renderer information.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    getRendererInfo(callback: AsyncCallback<AudioRendererInfo>): void;
    /**
     * Obtains the renderer information provided while creating a renderer instance. This method uses a promise to
     * return the result.
     * @returns Promise used to return the renderer information.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    getRendererInfo(): Promise<AudioRendererInfo>;

    /**
     * Obtains the renderer stream information. This method uses an asynchronous callback to return the result.
     * @param callback Callback used to return the stream information.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    getStreamInfo(callback: AsyncCallback<AudioStreamInfo>): void;
    /**
     * Obtains the renderer stream information. This method uses a promise to return the result.
     * @returns Promise used to return the stream information.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    getStreamInfo(): Promise<AudioStreamInfo>;

    /**
     * Obtains the renderer stream id. This method uses an asynchronous callback to return the result.
     * @param callback Callback used to return the stream id.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    getAudioStreamId(callback: AsyncCallback<number>): void;
    /**
     * Obtains the renderer stream id. This method uses a promise to return the result.
     * @returns Promise used to return the stream id.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    getAudioStreamId(): Promise<number>;

    /**
     * Starts the renderer. This method uses an asynchronous callback to return the result.
     * @param callback Callback used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    start(callback: AsyncCallback<void>): void;
    /**
     * Starts the renderer. This method uses a promise to return the result.
     * @returns Promise used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    start(): Promise<void>;

    /**
     * Writes the buffer. This method uses an asynchronous callback to return the result.
     * @param buffer Buffer to be written.
     * @param callback Returns the number of bytes written if the operation is successful; returns an error code
     * otherwise.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    write(buffer: ArrayBuffer, callback: AsyncCallback<number>): void;
    /**
     * Writes the buffer. This method uses a promise to return the result.
     * @param buffer Buffer to be written.
     * @returns Returns the number of bytes written if the operation is successful; returns an error code otherwise.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    write(buffer: ArrayBuffer): Promise<number>;

    /**
     * Obtains the timestamp in Unix epoch time (starts from January 1, 1970), in nanoseconds. This method uses an
     * asynchronous callback to return the result.
     * @param callback Callback used to return the timestamp.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    getAudioTime(callback: AsyncCallback<number>): void;
    /**
     * Obtains the timestamp in Unix epoch time (starts from January 1, 1970), in nanoseconds. This method uses a
     * promise to return the result.
     * @returns Promise used to return the timestamp.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    getAudioTime(): Promise<number>;

    /**
     * Drains the playback buffer. This method uses an asynchronous callback to return the result.
     * @param callback Callback used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    drain(callback: AsyncCallback<void>): void;
    /**
     * Drains the playback buffer. This method uses a promise to return the result.
     * @returns Promise used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    drain(): Promise<void>;

    /**
     * Pauses rendering. This method uses an asynchronous callback to return the result.
     * @param callback Callback used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    pause(callback: AsyncCallback<void>): void;
    /**
     * Pauses rendering. This method uses a promise to return the result.
     * @returns Promise used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    pause(): Promise<void>;

    /**
     * Stops rendering. This method uses an asynchronous callback to return the result.
     * @param callback Callback used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    stop(callback: AsyncCallback<void>): void;
    /**
     * Stops rendering. This method uses a promise to return the result.
     * @returns Promise used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    stop(): Promise<void>;

    /**
     * Releases the renderer. This method uses an asynchronous callback to return the result.
     * @param callback Callback used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    release(callback: AsyncCallback<void>): void;
    /**
     * Releases the renderer. This method uses a promise to return the result.
     * @returns Promise used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    release(): Promise<void>;

    /**
     * Obtains a reasonable minimum buffer size in bytes for rendering. This method uses an asynchronous callback to
     * return the result.
     * @param callback Callback used to return the buffer size.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    getBufferSize(callback: AsyncCallback<number>): void;
    /**
     * Obtains a reasonable minimum buffer size in bytes for rendering. This method uses a promise to return the result.
     * @returns Promise used to return the buffer size.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    getBufferSize(): Promise<number>;

    /**
     * Sets the render rate. This method uses an asynchronous callback to return the result.
     * @param rate Audio render rate.
     * @param callback Callback used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    setRenderRate(rate: AudioRendererRate, callback: AsyncCallback<void>): void;
    /**
     * Sets the render rate. This method uses a promise to return the result.
     * @param rate Audio render rate.
     * @returns Promise used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    setRenderRate(rate: AudioRendererRate): Promise<void>;

    /**
     * Obtains the current render rate. This method uses an asynchronous callback to return the result.
     * @param callback Callback used to return the audio render rate.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    getRenderRate(callback: AsyncCallback<AudioRendererRate>): void;
    /**
     * Obtains the current render rate. This method uses a promise to return the result.
     * @returns Promise used to return the audio render rate.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    getRenderRate(): Promise<AudioRendererRate>;

    /**
     * Set interrupt mode.
     * @param mode The interrupt mode.
     * @param callback Callback used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Interrupt
     */
    setInterruptMode(mode: InterruptMode, callback: AsyncCallback<void>): void;
    /**
     * Set interrupt mode.
     * @param mode The interrupt mode.
     * @returns Promise used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Interrupt
     */
    setInterruptMode(mode: InterruptMode): Promise<void>;

    /**
     * Sets the volume for this stream. This method uses an asynchronous callback to return the result.
     * @param volume Volume to set. The value type is float, form 0.0 to 1.0.
     * @param callback Callback used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    setVolume(volume: number, callback: AsyncCallback<void>): void;
    /**
     * Sets the volume for a stream. This method uses a promise to return the result.
     * @param volume Volume to set. The value type is float, form 0.0 to 1.0.
     * @returns Promise used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    setVolume(volume: number): Promise<void>;

    /**
     * Listens for audio interrupt events. This method uses a callback to get interrupt events. The interrupt event is
     * triggered when audio playback is interrupted.
     * @param callback Callback used to listen for interrupt callback.
     * @throws { BusinessError } 401 - if input parameter type or number mismatch
     * @throws { BusinessError } 6800101 - if input parameter value error
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Interrupt
     */
    on(type: 'audioInterrupt', callback: Callback<InterruptEvent>): void;

    /**
     * Subscribes to mark reached events. When the number of frames rendered reaches the value of the frame parameter,
     * the callback is invoked.
     * @param frame Number of frames to trigger the event. The value must be greater than 0.
     * @param callback Callback invoked when the event is triggered.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    on(type: "markReach", frame: number, callback: Callback<number>): void;
    /**
     * Unsubscribes from mark reached events.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    off(type: "markReach"): void;

    /**
     * Subscribes to period reached events. When the period of frame rendering reaches the value of frame parameter,
     * the callback is invoked.
     * @param frame Period during which frame rendering is listened. The value must be greater than 0.
     * @param callback Callback invoked when the event is triggered.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    on(type: "periodReach", frame: number, callback: Callback<number>): void;
    /**
     * Unsubscribes from period reached events.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    off(type: "periodReach"): void;

    /**
     * Subscribes audio state change event callback.
     * @param callback Callback invoked when state change.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Renderer
     */
    on(type: "stateChange", callback: Callback<AudioState>): void;
  }

  /**
   * Enumerates source types.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Core
   */
  enum SourceType {
    /**
     * Invalid source type.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SOURCE_TYPE_INVALID = -1,
    /**
     * Mic source type.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SOURCE_TYPE_MIC = 0,
    /**
     * Voice recognition source type.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SOURCE_TYPE_VOICE_RECOGNITION = 1,
    /**
     * Voice communication source type.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    SOURCE_TYPE_VOICE_COMMUNICATION = 7
  }

  /**
   * Describes audio capturer information.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Core
   */
  interface AudioCapturerInfo {
    /**
     * Audio source type.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    source: SourceType;
    /**
     * Audio capturer flags.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Core
     */
    capturerFlags: number;
  }

  /**
   * Describes audio capturer configuration options.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Capturer
   */
  interface AudioCapturerOptions {
    /**
     * Stream information.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    streamInfo: AudioStreamInfo;
    /**
     * Capturer information.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    capturerInfo: AudioCapturerInfo;
  }

  /**
   * Provides APIs for audio recording.
   * @since 8
   * @syscap SystemCapability.Multimedia.Audio.Capturer
   */
  interface AudioCapturer {
    /**
     * Defines the current capture state.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    readonly state: AudioState;

    /**
     * Obtains the capturer information provided while creating a capturer instance. This method uses an asynchronous
     * callback to return the result.
     * @param callback Callback used to return the capturer information.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    getCapturerInfo(callback: AsyncCallback<AudioCapturerInfo>): void;
    /**
     * Obtains the capturer information provided while creating a capturer instance. This method uses a promise to
     * return the result.
     * @returns Promise used to return the capturer information.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    getCapturerInfo(): Promise<AudioCapturerInfo>;

    /**
     * Obtains the capturer stream information. This method uses an asynchronous callback to return the result.
     * @param callback Callback used to return the stream information.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    getStreamInfo(callback: AsyncCallback<AudioStreamInfo>): void;
    /**
     * Obtains the capturer stream information. This method uses a promise to return the result.
     * @returns Promise used to return the stream information.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    getStreamInfo(): Promise<AudioStreamInfo>;

    /**
     * Obtains the capturer stream id. This method uses an asynchronous callback to return the result.
     * @param callback Callback used to return the stream id.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    getAudioStreamId(callback: AsyncCallback<number>): void;
    /**
     * Obtains the capturer stream id. This method uses a promise to return the result.
     * @returns Promise used to return the stream id.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    getAudioStreamId(): Promise<number>;

    /**
     * Starts capturing. This method uses an asynchronous callback to return the result.
     * @param callback Callback used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    start(callback: AsyncCallback<void>): void;
    /**
     * Starts capturing. This method uses a promise to return the result.
     * @returns Promise used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    start(): Promise<void>;

    /**
     * Reads the buffer from the audio capturer. This method uses an asynchronous callback to return the result.
     * @param size Number of bytes to read.
     * @param isBlockingRead Whether the read operation should be blocked.
     * @param callback Callback used to return the buffer.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    read(size: number, isBlockingRead: boolean, callback: AsyncCallback<ArrayBuffer>): void;
    /**
     * Reads the buffer from the audio capturer. This method uses a promise to return the result.
     * @param size Number of bytes to read.
     * @param isBlockingRead Whether the read operation should be blocked.
     * @returns Returns the buffer data read if the operation is successful; returns an error code otherwise.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    read(size: number, isBlockingRead: boolean): Promise<ArrayBuffer>;

    /**
     * Obtains the timestamp in Unix epoch time (starts from January 1, 1970), in nanoseconds. This method uses an
     * asynchronous callback to return the result.
     * @param callback Callback used to return the timestamp.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    getAudioTime(callback: AsyncCallback<number>): void;
    /**
     * Obtains the timestamp in Unix epoch time (starts from January 1, 1970), in nanoseconds. This method uses a
     * promise to return the result.
     * @returns Promise used to return the timestamp.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    getAudioTime(): Promise<number>;

    /**
     * Stops capturing. This method uses an asynchronous callback to return the result.
     * @param callback Callback used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    stop(callback: AsyncCallback<void>): void;
    /**
     * Stops capturing. This method uses a promise to return the result.
     * @returns Promise used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    stop(): Promise<void>;

    /**
     * Releases the capturer. This method uses an asynchronous callback to return the result.
     * @param callback Callback used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    release(callback: AsyncCallback<void>): void;
    /**
     * Releases the capturer. This method uses a promise to return the result.
     * @returns Promise used to return the result.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    release(): Promise<void>;

    /**
     * Obtains a reasonable minimum buffer size in bytes for capturing. This method uses an asynchronous callback to
     * return the result.
     * @param callback Callback used to return the buffer size.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    getBufferSize(callback: AsyncCallback<number>): void;
    /**
     * Obtains a reasonable minimum buffer size in bytes for capturing. This method uses a promise to return the result.
     * @returns Promise used to return the buffer size.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    getBufferSize(): Promise<number>;

    /**
     * Subscribes to mark reached events. When the number of frames captured reaches the value of the frame parameter,
     * the callback is invoked.
     * @param frame Number of frames to trigger the event. The value must be greater than 0.
     * @param callback Callback invoked when the event is triggered.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    on(type: "markReach", frame: number, callback: Callback<number>): void;
    /**
     * Unsubscribes from the mark reached events.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    off(type: "markReach"): void;

    /**
     * Subscribes to period reached events. When the period of frame capturing reaches the value of frame parameter,
     * the callback is invoked.
     * @param frame Period during which frame capturing is listened. The value must be greater than 0.
     * @param callback Callback invoked when the event is triggered.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    on(type: "periodReach", frame: number, callback: Callback<number>): void;
    /**
     * Unsubscribes from period reached events.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    off(type: "periodReach"): void;

    /**
     * Subscribes audio state change event callback.
     * @param callback Callback used to listen for the audio state change event.
     * @since 8
     * @syscap SystemCapability.Multimedia.Audio.Capturer
     */
    on(type: "stateChange", callback: Callback<AudioState>): void;
  }

  /**
   * Enumerates tone types for player.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Tone
   * @systemapi
   */
  enum ToneType {
    /**
     * Dial tone for key 0.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_DIAL_0 = 0,
    /**
     * Dial tone for key 1.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_DIAL_1 = 1,
    /**
     * Dial tone for key 2.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_DIAL_2 = 2,
    /**
     * Dial tone for key 3.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_DIAL_3 = 3,
    /**
     * Dial tone for key 4.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_DIAL_4 = 4,
    /**
     * Dial tone for key 5.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_DIAL_5 = 5,
    /**
     * Dial tone for key 6.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_DIAL_6 = 6,
    /**
     * Dial tone for key 7.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_DIAL_7 = 7,
    /**
     * Dial tone for key 8.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_DIAL_8 = 8,
    /**
     * Dial tone for key 9.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_DIAL_9 = 9,
    /**
     * Dial tone for key *.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_DIAL_S = 10,
    /**
     * Dial tone for key #.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_DIAL_P = 11,
    /**
     * Dial tone for key A.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_DIAL_A = 12,
    /**
     * Dial tone for key B.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_DIAL_B = 13,
    /**
     * Dial tone for key C.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_DIAL_C = 14,
    /**
     * Dial tone for key D.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_DIAL_D = 15,
    /**
     * Supervisory tone for dial.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_COMMON_SUPERVISORY_DIAL = 100,
    /**
     * Supervisory tone for busy.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_COMMON_SUPERVISORY_BUSY = 101,
    /**
     * Supervisory tone for dial.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_COMMON_SUPERVISORY_CONGESTION = 102,
    /**
     * Supervisory tone for radio path acknowledgment.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_COMMON_SUPERVISORY_RADIO_ACK = 103,
    /**
     * Supervisory tone for radio path not available.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_COMMON_SUPERVISORY_RADIO_NOT_AVAILABLE = 104,
    /**
     * Supervisory tone for call waiting.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_COMMON_SUPERVISORY_CALL_WAITING = 106,
    /**
     * Supervisory tone for ringtone.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_COMMON_SUPERVISORY_RINGTONE = 107,
    /**
     * Proprietary tone for beep.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_COMMON_PROPRIETARY_BEEP = 200,
    /**
     * Proprietary tone for positive acknowledgment.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_COMMON_PROPRIETARY_ACK = 201,
    /**
     * Proprietary tone for prompt.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_COMMON_PROPRIETARY_PROMPT = 203,
    /**
     * Proprietary tone for double beep.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    TONE_TYPE_COMMON_PROPRIETARY_DOUBLE_BEEP = 204,
  }

  /**
   * Provides APIs for tone playing.
   * @since 9
   * @syscap SystemCapability.Multimedia.Audio.Tone
   * @systemapi
   */
  interface TonePlayer {
    /**
     * Loads tone. This method uses an asynchronous callback to return the result.
     * @param type Tone type to play.
     * @param callback Callback used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    load(type: ToneType, callback: AsyncCallback<void>): void;
    /**
     * Loads tone. This method uses a promise to return the result.
     * @param type Tone type to play.
     * @returns Promise used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    load(type: ToneType): Promise<void>;

    /**
     * Starts player. This method uses an asynchronous callback to return the result.
     * @param callback Callback used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    start(callback: AsyncCallback<void>): void;
    /**
     * Starts player. This method uses a promise to return the result.
     * @returns Promise used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    start(): Promise<void>;

    /**
     * Stops player. This method uses an asynchronous callback to return the result.
     * @param callback Callback used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    stop(callback: AsyncCallback<void>): void;
    /**
     * Stops player. This method uses a promise to return the result.
     * @returns Promise used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    stop(): Promise<void>;

    /**
     * Releases the player. This method uses an asynchronous callback to return the result.
     * @param callback Callback used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    release(callback: AsyncCallback<void>): void;
    /**
     * Releases the player. This method uses a promise to return the result.
     * @returns Promise used to return the result.
     * @since 9
     * @syscap SystemCapability.Multimedia.Audio.Tone
     */
    release(): Promise<void>;
  }
}

export default audio;