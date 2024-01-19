/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file expected in compliance with the License.
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
#include "double_preview_test.h"

using namespace testing::ext;

void DoublePreviewTest::SetUpTestCase(void)
{}
void DoublePreviewTest::TearDownTestCase(void)
{}
void DoublePreviewTest::SetUp(void)
{
    if (display_ == nullptr) {
        display_ = std::make_shared<TestDisplay>();
    }
    display_->Init();
}
void DoublePreviewTest::TearDown(void)
{
    display_->Close();
}

void DoublePreviewTest::SetStreamInfo(StreamInfo &streamInfo,
    const std::shared_ptr<StreamCustomer> &streamCustomer,
    const int streamId, const StreamIntent intent)
{
    sptr<OHOS::IBufferProducer> producer;
    constexpr uint32_t DATA_SPACE = 8; // picture dataspace
    constexpr uint32_t TUNNEL_MODE = 5; // tunnel mode
    constexpr uint32_t BUFFER_QUEUE_SIZE = 8; // set bufferQueue size
    if (intent == PREVIEW) {
        streamInfo.width_ = PREVIEW_WIDTH;
        streamInfo.height_ = PREVIEW_HEIGHT;
        streamInfo.format_ = PIXEL_FMT_RGBA_8888;
        if (streamId == display_->STREAM_ID_PREVIEW) {
            streamInfo.streamId_ = streamId;
        } else if (streamId == STREAMID_PREVIEW_DOUBLE) {
            streamInfo.streamId_ = streamId;
        }
    }
    streamInfo.dataspace_ = DATA_SPACE;
    streamInfo.intent_ = intent;
    streamInfo.tunneledMode_ = TUNNEL_MODE;
    producer = streamCustomer->CreateProducer();
    streamInfo.bufferQueue_ = new BufferProducerSequenceable(producer);
    streamInfo.bufferQueue_->producer_->SetQueueSize(BUFFER_QUEUE_SIZE);
}

void DoublePreviewTest::CreateStream(int streamId, StreamIntent intent)
{
    StreamInfo streamInfo = {};

    if (intent == PREVIEW) {
        if (streamId == display_->STREAM_ID_PREVIEW) {
            if (streamCustomerPreview_ == nullptr) {
                    streamCustomerPreview_ = std::make_shared<StreamCustomer>();
                    SetStreamInfo(streamInfo, streamCustomerPreview_, streamId, intent);
                    std::vector<StreamInfo>().swap(streamInfos_);
                    streamInfos_.push_back(streamInfo);
                }
        } else if (streamId == STREAMID_PREVIEW_DOUBLE) {
            if (streamCustomerPreviewDouble_ == nullptr) {
                streamCustomerPreviewDouble_ = std::make_shared<StreamCustomer>();
                SetStreamInfo(streamInfo, streamCustomerPreviewDouble_, streamId, intent);
                std::vector<StreamInfo>().swap(streamInfos_);
                streamInfos_.push_back(streamInfo);
            }
        }
    }
    result_ = (CamRetCode)display_->streamOperator->CreateStreams(streamInfos_);
    EXPECT_EQ(false, result_!= HDI::Camera::V1_0::NO_ERROR);
    if (result_ == HDI::Camera::V1_0::NO_ERROR) {
        std::cout << "==========[test log]CreateStreams success." << std::endl;
    } else {
        std::cout << "==========[test log]CreateStreams fail, result_ = " << result_ << std::endl;
    }
}

void DoublePreviewTest::CommitStream()
{
    result_ = (CamRetCode)display_->streamOperator->CommitStreams(NORMAL, display_->ability_);
    EXPECT_EQ(false, result_ != HDI::Camera::V1_0::NO_ERROR);
    if (result_ == HDI::Camera::V1_0::NO_ERROR) {
        std::cout << "==========[test log]CommitStreams preview success." << std::endl;
    } else {
        std::cout << "==========[test log]CommitStreams preview  fail, result_ = " << result_ << std::endl;
    }
}

void DoublePreviewTest::StartCapture(int streamId, int captureId, bool shutterCallback, bool isStreaming)
{
    captureInfo_.streamIds_ = {streamId};
    captureInfo_.captureSetting_ = display_->ability_;
    captureInfo_.enableShutterCallback_ = shutterCallback;
    constexpr uint32_t TIME_FOR_WAIT_IMAGE_PREVIEW = 2; // sleep two second
    result_ = (CamRetCode)display_->streamOperator->Capture(captureId, captureInfo_, isStreaming);
    EXPECT_EQ(true, result_ == HDI::Camera::V1_0::NO_ERROR);
    if (result_ == HDI::Camera::V1_0::NO_ERROR) {
        std::cout << "==========[test log]check Capture: Capture success, " << captureId << std::endl;
    } else {
        std::cout << "==========[test log]check Capture: Capture fail, result_ = " << result_ << captureId << std::endl;
    }
    if (captureId == display_->CAPTURE_ID_PREVIEW) {
        streamCustomerPreview_->ReceiveFrameOn([this](const unsigned char *addr, const uint32_t size) {
            std::cout << "==========[test log]preview size= " <<
                size << std::endl;
        });
    } else if (captureId == CAPTUREID_PREVIEW_DOUBLE) {
        streamCustomerPreviewDouble_->ReceiveFrameOn([this](const unsigned char *addr, const uint32_t size) {
            std::cout << "==========[test log]preview double size= " <<
                size << std::endl;
        });
    } else {
        std::cout << "==========[test log]StartCapture ignore command " << std::endl;
    }
    sleep(TIME_FOR_WAIT_IMAGE_PREVIEW);
}

void DoublePreviewTest::StopStream(std::vector<int> &captureIds, std::vector<int> &streamIds)
{
    if (sizeof(captureIds_) > 0) {
        for (const auto &captureId : captureIds_) {
            if (captureId == display_->CAPTURE_ID_PREVIEW) {
                streamCustomerPreview_->ReceiveFrameOff();
            } else if (captureId == CAPTUREID_PREVIEW_DOUBLE) {
                streamCustomerPreviewDouble_->ReceiveFrameOff();
            } else {
                std::cout << "==========[test log]StopStream ignore command. " <<  std::endl;
            }
        }
        for (auto &captureId : captureIds_) {
            result_ = (CamRetCode)display_->streamOperator->CancelCapture(captureId);
            EXPECT_EQ(true, result_ == HDI::Camera::V1_0::NO_ERROR);
            if (result_ == HDI::Camera::V1_0::NO_ERROR) {
                std::cout << "==========[test log]check Capture: CancelCapture success," << captureId << std::endl;
            } else {
                std::cout << "==========[test log]check Capture: CancelCapture fail, result_ = " << result_;
                std::cout << "captureId = " << captureId << std::endl;
            }
        }
    }

    if (sizeof(streamIds_) > 0) {
        result_ = (CamRetCode)display_->streamOperator->ReleaseStreams(streamIds_);
        EXPECT_EQ(true, result_ == HDI::Camera::V1_0::NO_ERROR);
        if (result_ == HDI::Camera::V1_0::NO_ERROR) {
            std::cout << "==========[test log]check Capture: ReleaseStreams success." << std::endl;
        } else {
            std::cout << "==========[test log]check Capture: ReleaseStreams fail, result_ = " << result_ << std::endl;
            std::cout << "streamIds_ = " << streamIds_.front() << std::endl;
        }
    }
}

/**
  * @tc.name: double preview
  * @tc.desc: Commit 2 streams together, Double preview streams, isStreaming is true.
  * @tc.level: Level1
  * @tc.size: MediumTest
  * @tc.type: Function
  */
static HWTEST_F(DoublePreviewTest, double_preview_001, TestSize.Level1)
{
    // Get the stream manager
    display_->AchieveStreamOperator();

    // Start stream
    CreateStream(display_->STREAM_ID_PREVIEW, PREVIEW);
    CreateStream(STREAMID_PREVIEW_DOUBLE, PREVIEW);

    // Commit stream
    CommitStream();

    // Get preview
    StartCapture(display_->STREAM_ID_PREVIEW, display_->CAPTURE_ID_PREVIEW, false, true);
    StartCapture(STREAMID_PREVIEW_DOUBLE, CAPTUREID_PREVIEW_DOUBLE, false, true);

    constexpr uint32_t TIME_FOR_WAIT_IMAGE_PREVIEW = 10; // sleep ten second 
    sleep(TIME_FOR_WAIT_IMAGE_PREVIEW);

    streamIds_ = {display_->STREAM_ID_PREVIEW, STREAMID_PREVIEW_DOUBLE};
    captureIds_ = {display_->CAPTURE_ID_PREVIEW, CAPTUREID_PREVIEW_DOUBLE};
    StopStream(captureIds_, streamIds_);
}

/**
  * @tc.name: double preview and still_capture
  * @tc.desc: Commit 3 streams together, Double preview and still_capture streams, isStreaming is true.
  * @tc.level: Level1
  * @tc.size: MediumTest
  * @tc.type: Function
  */
static HWTEST_F(DoublePreviewTest, double_preview_002, TestSize.Level1)
{
    // Get the stream manager
    display_->AchieveStreamOperator();

    // Start stream
    CreateStream(display_->STREAM_ID_PREVIEW, PREVIEW);
    CreateStream(STREAMID_PREVIEW_DOUBLE, PREVIEW);
    display_->intents = {STILL_CAPTURE};
    display_->StartStream(display_->intents);

    // Get preview
    StartCapture(display_->STREAM_ID_PREVIEW, display_->CAPTURE_ID_PREVIEW, false, true);
    StartCapture(STREAMID_PREVIEW_DOUBLE, CAPTUREID_PREVIEW_DOUBLE, false, true);
    // add dumy exif info
    constexpr double latitude = 27.987500; // dummy data: Qomolangma latitde
    constexpr double longitude = 86.927500; // dummy data: Qomolangma longituude
    constexpr double altitude = 8848.86; // dummy data: Qomolangma altitude
    constexpr size_t entryCapacity = 100;
    constexpr size_t dataCapacity = 2000;
    std::shared_ptr<CameraSetting>  captureSetting =
        std::make_shared<CameraSetting>(entryCapacity, dataCapacity);
    std::vector<double> gps;
    gps.push_back(latitude);
    gps.push_back(longitude);
    gps.push_back(altitude);
    captureSetting->addEntry(OHOS_JPEG_GPS_COORDINATES, gps.data(), gps.size());
    std::vector<uint8_t> setting;
    MetadataUtils::ConvertMetadataToVec(captureSetting, setting);

    CaptureInfo captureInfo = {};
    captureInfo.streamIds_ = {display_->STREAM_ID_CAPTURE};
    captureInfo.captureSetting_ = setting;
    captureInfo.enableShutterCallback_ = false;
    display_->rc = (CamRetCode)display_->streamOperator->Capture(display_->CAPTURE_ID_CAPTURE, captureInfo, true);
    EXPECT_EQ(true, display_->rc == HDI::Camera::V1_0::NO_ERROR);
    if (display_->rc == HDI::Camera::V1_0::NO_ERROR) {
        std::cout << "==========[test log]check Capture: Capture success, " << 
            display_->CAPTURE_ID_CAPTURE << std::endl;
    } else {
        std::cout << "==========[test log]check Capture: Capture fail, rc = " << display_->rc
            << display_->CAPTURE_ID_CAPTURE << std::endl;
    }
    display_->streamCustomerCapture_->ReceiveFrameOn([this](const unsigned char *addr, const uint32_t size) {
        display_->StoreImage(addr, size);
    });

    constexpr uint32_t TIME_FOR_WAIT_IMAGE_PREVIEW = 5; // sleep five second
    sleep(TIME_FOR_WAIT_IMAGE_PREVIEW);

    streamIds_ = {display_->STREAM_ID_PREVIEW, STREAMID_PREVIEW_DOUBLE};
    captureIds_ = {display_->CAPTURE_ID_PREVIEW, CAPTUREID_PREVIEW_DOUBLE};
    std::vector<int> captureIds =  {display_->CAPTURE_ID_CAPTURE};
    std::vector<int> streamIds = {display_->STREAM_ID_CAPTURE};
    StopStream(captureIds_, streamIds_);
    display_->StopStream(captureIds, streamIds);
}

/**
  * @tc.name: double preview and video
  * @tc.desc: Commit 3 streams together, Double preview and video streams, isStreaming is true.
  * @tc.level: Level1
  * @tc.size: MediumTest
  * @tc.type: Function
  */
static HWTEST_F(DoublePreviewTest, double_preview_003, TestSize.Level1)
{
    // Get the stream manager
    display_->AchieveStreamOperator();

    // Start stream
    CreateStream(display_->STREAM_ID_PREVIEW, PREVIEW);
    CreateStream(STREAMID_PREVIEW_DOUBLE, PREVIEW);
    display_->intents = {VIDEO};
    display_->StartStream(display_->intents);

    // Get preview
    StartCapture(display_->STREAM_ID_PREVIEW, display_->CAPTURE_ID_PREVIEW, false, true);
    StartCapture(STREAMID_PREVIEW_DOUBLE, CAPTUREID_PREVIEW_DOUBLE, false, true);
    display_->StartCapture(display_->STREAM_ID_VIDEO, display_->CAPTURE_ID_VIDEO, false, true);

    constexpr uint32_t TIME_FOR_WAIT_IMAGE_PREVIEW = 5; // sleep five second
    sleep(TIME_FOR_WAIT_IMAGE_PREVIEW);

    streamIds_ = {display_->STREAM_ID_PREVIEW, STREAMID_PREVIEW_DOUBLE};
    captureIds_ = {display_->CAPTURE_ID_PREVIEW, CAPTUREID_PREVIEW_DOUBLE};
    std::vector<int> captureIds =  {display_->CAPTURE_ID_VIDEO};
    std::vector<int> streamIds = {display_->STREAM_ID_VIDEO};
    StopStream(captureIds_, streamIds_);
    display_->StopStream(captureIds, streamIds);
}
