/*
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
#include "test_display.h"
using namespace std;

TestDisplay::TestDisplay()
{
}

sptr<ICameraHost> TestDisplay::CameraHostImplGetInstance(void)
{
    using OHOS::Camera::CameraHostImpl;
    CameraHostImpl *service = new (std::nothrow) CameraHostImpl();
    if (service == nullptr) {
        return nullptr;
    }

    service->Init();
    return service;
}

uint64_t TestDisplay::GetCurrentLocalTimeStamp()
{
    std::chrono::time_point<std::chrono::system_clock, std::chrono::milliseconds> tp =
        std::chrono::time_point_cast<std::chrono::milliseconds>(std::chrono::system_clock::now());
    auto tmp = std::chrono::duration_cast<std::chrono::milliseconds>(tp.time_since_epoch());
    return tmp.count();
}

void TestDisplay::StoreImage(const unsigned char *bufStart, const uint32_t size) const
{
    constexpr uint32_t pathLen = 64;
    char path[pathLen] = {0};
#ifdef CAMERA_BUILT_ON_OHOS_LITE
    char prefix[] = "/userdata/photo/";
#else
    char prefix[] = "/data/";
#endif

    int imgFD = 0;
    int ret = 0;

    struct timeval start = {};
    gettimeofday(&start, nullptr);
    if (sprintf_s(path, sizeof(path), "%spicture_%ld.jpeg", prefix, start.tv_usec) < 0) {
        CAMERA_LOGE("sprintf_s error .....\n");
        return;
    }

    imgFD = open(path, O_RDWR | O_CREAT, 00766); // 00766:file operate permission
    if (imgFD == -1) {
        CAMERA_LOGE("demo test:open image file error %{public}s.....\n", strerror(errno));
        return;
    }

    CAMERA_LOGD("demo test:StoreImage %{public}s buf_start == %{public}p size == %{public}d\n", path, bufStart, size);

    ret = write(imgFD, bufStart, size);
    if (ret == -1) {
        CAMERA_LOGE("demo test:write image file error %{public}s.....\n", strerror(errno));
    }

    close(imgFD);
}

void TestDisplay::StoreVideo(const unsigned char *bufStart, const uint32_t size) const
{
    int ret = 0;

    ret = write(videoFd_, bufStart, size);
    if (ret == -1) {
        CAMERA_LOGE("demo test:write video file error %{public}s.....\n", strerror(errno));
    }
    CAMERA_LOGD("demo test:StoreVideo buf_start == %{public}p size == %{public}d\n", bufStart, size);
}

void TestDisplay::OpenVideoFile()
{
    constexpr uint32_t pathLen = 64;
    char path[pathLen] = {0};
#ifdef CAMERA_BUILT_ON_OHOS_LITE
    char prefix[] = "/userdata/video/";
#else
    char prefix[] = "/data/";
#endif
    auto seconds = time(nullptr);
    if (sprintf_s(path, sizeof(path), "%svideo%ld.h264", prefix, seconds) < 0) {
        CAMERA_LOGE("%{public}s: sprintf  failed", __func__);
        return;
    }
    videoFd_ = open(path, O_RDWR | O_CREAT, 00766); // 00766:file operate permission
    if (videoFd_ < 0) {
        CAMERA_LOGE("demo test: StartVideo open %s %{public}s failed", path, strerror(errno));
    }
}

void TestDisplay::CloseFd()
{
    close(videoFd_);
    videoFd_ = -1;
}

void TestDisplay::PrintFaceDetectInfo(const unsigned char *bufStart, const uint32_t size) const
{
    common_metadata_header_t* data = reinterpret_cast<common_metadata_header_t*>(
        const_cast<unsigned char*>(bufStart));
    camera_metadata_item_t entry;
    int ret = 0;
    ret = FindCameraMetadataItem(data, OHOS_STATISTICS_FACE_DETECT_SWITCH, &entry);
    if (ret != 0) {
        CAMERA_LOGE("demo test: get OHOS_STATISTICS_FACE_DETECT_SWITCH error\n");
        return;
    }
    uint8_t switchValue = *(entry.data.u8);
    CAMERA_LOGI("demo test: switchValue=%{public}d", switchValue);

    ret = FindCameraMetadataItem(data, OHOS_STATISTICS_FACE_RECTANGLES, &entry);
    if (ret != 0) {
        CAMERA_LOGE("demo test: get OHOS_STATISTICS_FACE_RECTANGLES error\n");
        return;
    }
    uint32_t rectCount = entry.count;
    std::cout << "==========[test log] PrintFaceDetectInfo rectCount=" << rectCount << std::endl;
    CAMERA_LOGI("demo test: rectCount=%{public}d", rectCount);
    std::vector<std::vector<float>> faceRectangles;
    std::vector<float> faceRectangle;
    for (int i = 0; i < rectCount; i++) {
        faceRectangle.push_back(*(entry.data.f + i));
    }
    faceRectangles.push_back(faceRectangle);
    for (std::vector<std::vector<float>>::iterator it = faceRectangles.begin(); it < faceRectangles.end(); it++) {
        for (std::vector<float>::iterator innerIt = (*it).begin(); innerIt < (*it).end(); innerIt++) {
            std::cout << "==========[test log] PrintFaceDetectInfo innerIt : " << *innerIt << std::endl;
            CAMERA_LOGI("demo test: innerIt : %{public}f \n", *innerIt);
        }
    }

    ret = FindCameraMetadataItem(data, OHOS_STATISTICS_FACE_IDS, &entry);
    if (ret != 0) {
        CAMERA_LOGE("demo test: get OHOS_STATISTICS_FACE_IDS error\n");
        return;
    }
    uint32_t idCount = entry.count;
    std::cout << "==========[test log] PrintFaceDetectInfo idCount=" << idCount << std::endl;
    CAMERA_LOGI("demo test: idCount=%{public}d", idCount);
    std::vector<int32_t> faceIds;
    for (int i = 0; i < idCount; i++) {
        faceIds.push_back(*(entry.data.i32 + i));
    }
    for (auto it = faceIds.begin(); it != faceIds.end(); it++) {
        std::cout << "==========[test log] PrintFaceDetectInfo faceIds : " << *it << std::endl;
        CAMERA_LOGI("demo test: faceIds : %{public}d\n", *it);
    }
}

int32_t TestDisplay::SaveYUV(char* type, unsigned char* buffer, int32_t size)
{
    int ret;
    char path[PATH_MAX] = {0};
    ret = sprintf_s(path, sizeof(path) / sizeof(path[0]), "/mnt/yuv/%s_%lld.yuv", type, GetCurrentLocalTimeStamp());
    if (ret < 0) {
        CAMERA_LOGE("%s, sprintf_s failed, errno = %s.", __FUNCTION__, strerror(errno));
        return -1;
    }
    CAMERA_LOGI("%s, save yuv to file %s", __FUNCTION__, path);
    system("mkdir -p /mnt/yuv");
    int imgFd = open(path, O_RDWR | O_CREAT, 00766); // 00766: file permissions
    if (imgFd == -1) {
        CAMERA_LOGI("%s, open file failed, errno = %s.", __FUNCTION__, strerror(errno));
        return -1;
    }
    ret = write(imgFd, buffer, size);
    if (ret == -1) {
        CAMERA_LOGI("%s, write file failed, error = %s", __FUNCTION__, strerror(errno));
        close(imgFd);
        return -1;
    }
    close(imgFd);
    return 0;
}

int TestDisplay::DoFbMunmap(unsigned char* addr)
{
    int ret;
    unsigned int size = vinfo_.xres * vinfo_.yres * vinfo_.bits_per_pixel / 8; // 8:picture size;
    CAMERA_LOGI("main test:munmapped size = %d, virt_addr = 0x%p\n", size, addr);
    ret = (munmap(addr, finfo_.smem_len));
    return ret;
}

unsigned char* TestDisplay::DoFbMmap(int* pmemfd)
{
    unsigned char* ret;
    int screensize = vinfo_.xres * vinfo_.yres * vinfo_.bits_per_pixel / 8; // 8:picture size
    ret = static_cast<unsigned char*>(mmap(NULL, screensize, PROT_READ | PROT_WRITE, MAP_SHARED, *pmemfd, 0));
    if (ret == MAP_FAILED) {
        CAMERA_LOGE("main test:do_mmap: pmem mmap() failed: %s (%d)\n", strerror(errno), errno);
        return nullptr;
    }
    CAMERA_LOGI("main test:do_mmap: pmem mmap fd %d ptr %p len %u\n", *pmemfd, ret, screensize);
    return ret;
}

void TestDisplay::FBLog()
{
    CAMERA_LOGI("the fixed information is as follow:\n");
    CAMERA_LOGI("id=%s\n", finfo_.id);
    CAMERA_LOGI("sem_start=%lx\n", finfo_.smem_start);
    CAMERA_LOGI("smem_len=%u\n", finfo_.smem_len);
    CAMERA_LOGI("type=%u\n", finfo_.type);
    CAMERA_LOGI("line_length=%u\n", finfo_.line_length);
    CAMERA_LOGI("mmio_start=%lu\n", finfo_.mmio_start);
    CAMERA_LOGI("mmio_len=%d\n", finfo_.mmio_len);
    CAMERA_LOGI("visual=%d\n", finfo_.visual);

    CAMERA_LOGI("variable information is as follow:\n");
    CAMERA_LOGI("The xres is :%u\n", vinfo_.xres);
    CAMERA_LOGI("The yres is :%u\n", vinfo_.yres);
    CAMERA_LOGI("xres_virtual=%u\n", vinfo_.xres_virtual);
    CAMERA_LOGI("yres_virtual=%u\n", vinfo_.yres_virtual);
    CAMERA_LOGI("xoffset=%u\n", vinfo_.xoffset);
    CAMERA_LOGI("yoffset=%u\n", vinfo_.yoffset);
    CAMERA_LOGI("bits_per_pixel is :%u\n", vinfo_.bits_per_pixel);
    CAMERA_LOGI("red.offset=%u\n", vinfo_.red.offset);
    CAMERA_LOGI("red.length=%u\n", vinfo_.red.length);
    CAMERA_LOGI("red.msb_right=%u\n", vinfo_.red.msb_right);
    CAMERA_LOGI("green.offset=%d\n", vinfo_.green.offset);
    CAMERA_LOGI("green.length=%d\n", vinfo_.green.length);
    CAMERA_LOGI("green.msb_right=%d\n", vinfo_.green.msb_right);
    CAMERA_LOGI("blue.offset=%d\n", vinfo_.blue.offset);
    CAMERA_LOGI("blue.length=%d\n", vinfo_.blue.length);
    CAMERA_LOGI("blue.msb_right=%d\n", vinfo_.blue.msb_right);
    CAMERA_LOGI("transp.offset=%d\n", vinfo_.transp.offset);
    CAMERA_LOGI("transp.length=%d\n", vinfo_.transp.length);
    CAMERA_LOGI("transp.msb_right=%d\n", vinfo_.transp.msb_right);
    CAMERA_LOGI("height=%x\n", vinfo_.height);
}

OHOS::Camera::RetCode TestDisplay::FBInit()
{
    fbFd_ = open("/dev/fb0", O_RDWR);
    if (fbFd_ < 0) {
        CAMERA_LOGE("main test:cannot open framebuffer %s file node\n", "/dev/fb0");
        return RC_ERROR;
    }

    if (ioctl(fbFd_, FBIOGET_VSCREENINFO, &vinfo_) < 0) {
        CAMERA_LOGE("main test:cannot retrieve vscreenInfo!\n");
        close(fbFd_);
        return RC_ERROR;
    }

    if (ioctl(fbFd_, FBIOGET_FSCREENINFO, &finfo_) < 0) {
        CAMERA_LOGE("main test:can't retrieve fscreenInfo!\n");
        close(fbFd_);
        return RC_ERROR;
    }

    FBLog();

    CAMERA_LOGI("main test:allocating display buffer memory\n");
    displayBuf_ = DoFbMmap(&fbFd_);
    if (displayBuf_ == nullptr) {
        CAMERA_LOGE("main test:error displayBuf_ mmap error\n");
        close(fbFd_);
        return RC_ERROR;
    }
    return RC_OK;
}

void TestDisplay::ProcessImage(unsigned char* p, unsigned char* fbp)
{
    unsigned char* in = p;
    int width = 640; // 640:Displays the size of the width
    int height = 480; // 480:Displays the size of the height
    int istride = 1280; // 1280:Initial value of span
    int x, y, j;
    int y0, u, v, r, g, b;
    int32_t location = 0;
    int xpos = (vinfo_.xres - width) / 2;
    int ypos = (vinfo_.yres - height) / 2;

    int yPos = 0; // 0:Pixel initial value
    int uPos = 1; // 1:Pixel initial value
    int vPos = 3; // 3:Pixel initial value
    int yPosIncrement = 2; // 2:yPos increase value
    int uPosIncrement = 4; // 4:uPos increase value
    int vPosIncrement = 4; // 4:vPos increase value

    for (y = ypos; y < (height + ypos); y++) {
        for (j = 0, x = xpos; j < width; j++, x++) {
            location = (x + vinfo_.xoffset) * (vinfo_.bits_per_pixel / 8) + // 8: The bytes for each time
            (y + vinfo_.yoffset) * finfo_.line_length; // add one y number of rows at a time

            y0 = in[yPos];
            u = in[uPos] - 128; // 128:display size
            v = in[vPos] - 128; // 128:display size

            r = RANGE_LIMIT(y0 + v + ((v * 103) >> 8)); // 103,8:display range
            g = RANGE_LIMIT(y0 - ((u * 88) >> 8) - ((v * 183) >> 8)); // 88,8,183:display range
            b = RANGE_LIMIT(y0 + u + ((u * 198) >> 8)); // 198,8:display range

            fbp[location + 1] = ((r & 0xF8) | (g >> 5)); // 5:display range
            fbp[location + 0] = (((g & 0x1C) << 3) | (b >> 3)); // 3:display range

            yPos += yPosIncrement;

            if (j & 0x01) {
                uPos += uPosIncrement;
                vPos += vPosIncrement;
            }
        }

        yPos = 0; // 0:Pixel initial value
        uPos = 1; // 1:Pixel initial value
        vPos = 3; // 3:Pixel initial value
        in += istride; // add one y number of rows at a time
    }
}

void TestDisplay::LcdDrawScreen(unsigned char* displayBuf, unsigned char* addr)
{
    ProcessImage(addr, displayBuf);
}

void TestDisplay::BufferCallback(unsigned char* addr, int choice)
{
    if (choice == PREVIEW_MODE) {
        LcdDrawScreen(displayBuf_, addr);
        return;
    } else {
        LcdDrawScreen(displayBuf_, addr);
        std::cout << "==========[test log] capture start saveYuv......" << std::endl;
        SaveYUV("capture", reinterpret_cast<unsigned char*>(addr), bufSize_);
        std::cout << "==========[test log] capture end saveYuv......" << std::endl;
        return;
    }
}

void TestDisplay::Init()
{
    std::shared_ptr<OHOS::Camera::IDeviceManager> deviceManager = OHOS::Camera::IDeviceManager::GetInstance();
    if (!initFlag) {
        deviceManager->Init();
        initFlag = 1;
    }
    std::cout << "==========[test log] TestDisplay::Init()." << std::endl;
    if (cameraHost == nullptr) {
        constexpr const char *DEMO_SERVICE_NAME = "camera_service";
        cameraHost = ICameraHost::Get(DEMO_SERVICE_NAME, false);
        std::cout << "==========[test log] Camera::CameraHost::CreateCameraHost();" << std::endl;
        if (cameraHost == nullptr) {
            std::cout << "==========[test log] CreateCameraHost failed." << std::endl;
            return;
        }
        std::cout << "==========[test log] CreateCameraHost success." << std::endl;
    }

    OHOS::sptr<DemoCameraHostCallback> cameraHostCallback = new DemoCameraHostCallback();
    OHOS::Camera::RetCode ret = cameraHost->SetCallback(cameraHostCallback);
    if (ret != HDI::Camera::V1_0::NO_ERROR) {
        std::cout << "==========[test log] SetCallback failed." << std::endl;
        return;
    } else {
        std::cout << "==========[test log] SetCallback success." << std::endl;
    }

    if (cameraDevice == nullptr) {
        cameraHost->GetCameraIds(cameraIds);
        cameraHost->GetCameraAbility(cameraIds.front(), ability_);
        MetadataUtils::ConvertVecToMetadata(ability_, ability);
        const OHOS::sptr<DemoCameraDeviceCallback> callback = new DemoCameraDeviceCallback();
        rc = (CamRetCode)cameraHost->OpenCamera(cameraIds.front(), callback, cameraDevice);
        if (rc != HDI::Camera::V1_0::NO_ERROR || cameraDevice == nullptr) {
            std::cout << "==========[test log] OpenCamera failed, rc = " << rc << std::endl;
            return;
        }
        std::cout << "==========[test log]  OpenCamera success." << std::endl;
    }
}

void TestDisplay::UsbInit()
{
    std::shared_ptr<OHOS::Camera::IDeviceManager> deviceManager = OHOS::Camera::IDeviceManager::GetInstance();
    if (!initFlag) {
        deviceManager->Init();
        initFlag = 1;
    }
    if (cameraHost == nullptr) {
        constexpr const char *DEMO_SERVICE_NAME = "camera_service";
        cameraHost = ICameraHost::Get(DEMO_SERVICE_NAME, false);
        if (cameraHost == nullptr) {
            std::cout << "==========[test log] CreateCameraHost failed." << std::endl;
            return;
        }
        std::cout << "==========[test log] CreateCameraHost success." << std::endl;
    }

    OHOS::sptr<DemoCameraHostCallback> cameraHostCallback = new DemoCameraHostCallback();
    OHOS::Camera::RetCode ret = cameraHost->SetCallback(cameraHostCallback);
    if (ret != HDI::Camera::V1_0::NO_ERROR) {
        std::cout << "==========[test log] SetCallback failed." << std::endl;
        return;
    } else {
        std::cout << "==========[test log] SetCallback success." << std::endl;
    }
}

void TestDisplay::Close()
{
    std::cout << "==========[test log] cameraDevice->Close()." << std::endl;
    if (cameraDevice != nullptr) {
        cameraDevice->Close();
        cameraDevice = nullptr;
    }
}

void TestDisplay::OpenCamera()
{
    if (cameraDevice == nullptr) {
        cameraHost->GetCameraIds(cameraIds);
        const OHOS::sptr<OHOS::Camera::CameraDeviceCallback> callback = new CameraDeviceCallback();
        rc = (CamRetCode)cameraHost->OpenCamera(cameraIds.front(), callback, cameraDevice);
        if (rc != HDI::Camera::V1_0::NO_ERROR || cameraDevice == nullptr) {
            std::cout << "==========[test log] OpenCamera failed, rc = " << rc << std::endl;
            return;
        }
        std::cout << "==========[test log]  OpenCamera success." << std::endl;
    }
}

float TestDisplay::CalTime(struct timeval start, struct timeval end)
{
    float timeUse = 0;
    timeUse = (end.tv_sec - start.tv_sec) * 1000000 + (end.tv_usec - start.tv_usec); // 1000000:time
    return timeUse;
}

void TestDisplay::AchieveStreamOperator()
{
    // Create and get streamOperator information
    OHOS::sptr<DemoStreamOperatorCallback> streamOperatorCallback_ = new DemoStreamOperatorCallback();
    rc = (CamRetCode)cameraDevice->GetStreamOperator(streamOperatorCallback_, streamOperator);
    EXPECT_EQ(true, rc == HDI::Camera::V1_0::NO_ERROR);
    if (rc == HDI::Camera::V1_0::NO_ERROR) {
        std::cout << "==========[test log] AchieveStreamOperator success." << std::endl;
    } else {
        std::cout << "==========[test log] AchieveStreamOperator fail, rc = " << rc << std::endl;
    }
}

void TestDisplay::StartStream(std::vector<StreamIntent> intents)
{
    for (auto& intent : intents) {
        if (intent == PREVIEW) {
            if (streamCustomerPreview_ == nullptr) {
                streamCustomerPreview_ = std::make_shared<StreamCustomer>();
            }
            streamInfoPre.streamId_ = STREAM_ID_PREVIEW;
            streamInfoPre.width_ = PREVIEW_WIDTH; // 640:picture width
            streamInfoPre.height_ = PREVIEW_HEIGHT; // 480:picture height
            streamInfoPre.format_ = PIXEL_FMT_RGBA_8888;
            streamInfoPre.dataspace_ = 8; // 8:picture dataspace
            streamInfoPre.intent_ = intent;
            streamInfoPre.tunneledMode_ = 5; // 5:tunnel mode
            streamInfoPre.bufferQueue_ = new BufferProducerSequenceable(streamCustomerPreview_->CreateProducer());
            streamInfoPre.bufferQueue_->producer_->SetQueueSize(8); // 8:set bufferQueue size
            std::cout << "==========[test log]preview success." << std::endl;
            std::vector<StreamInfo>().swap(streamInfos);
            streamInfos.push_back(streamInfoPre);
        } else if (intent == VIDEO) {
            if (streamCustomerVideo_ == nullptr) {
                streamCustomerVideo_ = std::make_shared<StreamCustomer>();
            }
            streamInfoVideo.streamId_ = STREAM_ID_VIDEO;
            streamInfoVideo.width_ = VIDEO_WIDTH; // 1280:picture width
            streamInfoVideo.height_ = VIDEO_HEIGHT; // 960:picture height
            streamInfoVideo.format_ = PIXEL_FMT_RGBA_8888;
            streamInfoVideo.dataspace_ = 8; // 8:picture dataspace
            streamInfoVideo.intent_ = intent;
            streamInfoVideo.encodeType_ = ENCODE_TYPE_H264;
            streamInfoVideo.tunneledMode_ = 5; // 5:tunnel mode
            streamInfoVideo.bufferQueue_ = new BufferProducerSequenceable(streamCustomerVideo_->CreateProducer());
            streamInfoVideo.bufferQueue_->producer_->SetQueueSize(8); // 8:set bufferQueue size
            std::cout << "==========[test log]video success." << std::endl;
            std::vector<StreamInfo>().swap(streamInfos);
            streamInfos.push_back(streamInfoVideo);
        } else if (intent == STILL_CAPTURE) {
            if (streamCustomerCapture_ == nullptr) {
                streamCustomerCapture_ = std::make_shared<StreamCustomer>();
            }
            streamInfoCapture.streamId_ = STREAM_ID_CAPTURE;
            streamInfoCapture.width_ = CAPTURE_WIDTH; // 1280:picture width
            streamInfoCapture.height_ = CAPTURE_HEIGHT; // 960:picture height
            streamInfoCapture.format_ = PIXEL_FMT_RGBA_8888;
            streamInfoCapture.dataspace_ = 8; // 8:picture dataspace
            streamInfoCapture.intent_ = intent;
            streamInfoCapture.encodeType_ = ENCODE_TYPE_JPEG;
            streamInfoCapture.tunneledMode_ = 5; // 5:tunnel mode
            streamInfoCapture.bufferQueue_ = new BufferProducerSequenceable(streamCustomerCapture_->CreateProducer());
            streamInfoCapture.bufferQueue_->producer_->SetQueueSize(8); // 8:set bufferQueue size
            std::cout << "==========[test log]capture success." << std::endl;
            std::vector<StreamInfo>().swap(streamInfos);
            streamInfos.push_back(streamInfoCapture);
        } else if (intent == ANALYZE) {
            if (streamCustomerAnalyze_ == nullptr) {
                streamCustomerAnalyze_ = std::make_shared<StreamCustomer>();
            }
            streamInfoAnalyze.streamId_ = STREAM_ID_ANALYZE;
            streamInfoAnalyze.width_ = ANALYZE_WIDTH; // 640:picture width
            streamInfoAnalyze.height_ = ANALYZE_HEIGHT; // 480:picture height
            streamInfoAnalyze.format_ = PIXEL_FMT_RGBA_8888;
            streamInfoAnalyze.dataspace_ = 8; // 8:picture dataspace
            streamInfoAnalyze.intent_ = intent;
            streamInfoAnalyze.tunneledMode_ = 5; // 5:tunnel mode
            streamInfoAnalyze.bufferQueue_ = new BufferProducerSequenceable(streamCustomerAnalyze_->CreateProducer());
            streamInfoAnalyze.bufferQueue_->producer_->SetQueueSize(8); // 8:set bufferQueue size
            std::cout << "==========[test log]analyze success." << std::endl;
            std::vector<StreamInfo>().swap(streamInfos);
            streamInfos.push_back(streamInfoAnalyze);
        }
        rc = (CamRetCode)streamOperator->CreateStreams(streamInfos);
        EXPECT_EQ(false, rc != HDI::Camera::V1_0::NO_ERROR);
        if (rc == HDI::Camera::V1_0::NO_ERROR) {
            std::cout << "==========[test log]CreateStreams success." << std::endl;
        } else {
            std::cout << "==========[test log]CreateStreams fail, rc = " << rc << std::endl;
        }
        
        rc = (CamRetCode)streamOperator->CommitStreams(NORMAL, ability_);
        EXPECT_EQ(false, rc != HDI::Camera::V1_0::NO_ERROR);
        if (rc == HDI::Camera::V1_0::NO_ERROR) {
            std::cout << "==========[test log]CommitStreams success." << std::endl;
        } else {
            std::cout << "==========[test log]CommitStreams fail, rc = " << rc << std::endl;
        }
    }
}

void TestDisplay::StartCapture(int streamId, int captureId, bool shutterCallback, bool isStreaming)
{
    // Get preview
    captureInfo.streamIds_ = {streamId};
    captureInfo.captureSetting_ = ability_;
    captureInfo.enableShutterCallback_ = shutterCallback;
    rc = (CamRetCode)streamOperator->Capture(captureId, captureInfo, isStreaming);
    EXPECT_EQ(true, rc == HDI::Camera::V1_0::NO_ERROR);
    if (rc == HDI::Camera::V1_0::NO_ERROR) {
        std::cout << "==========[test log]check Capture: Capture success, " << captureId << std::endl;
    } else {
        std::cout << "==========[test log]check Capture: Capture fail, rc = " << rc << captureId << std::endl;
    }
    if (captureId == CAPTURE_ID_PREVIEW) {
        streamCustomerPreview_->ReceiveFrameOn(nullptr);
    } else if (captureId == CAPTURE_ID_CAPTURE) {
        streamCustomerCapture_->ReceiveFrameOn([this](const unsigned char *addr, const uint32_t size) {
            StoreImage(addr, size);
        });
    } else if (captureId == CAPTURE_ID_VIDEO) {
        OpenVideoFile();
        streamCustomerVideo_->ReceiveFrameOn([this](const unsigned char *addr, const uint32_t size) {
            StoreVideo(addr, size);
        });
    } else if (captureId == CAPTURE_ID_ANALYZE) {
        streamCustomerAnalyze_->ReceiveFrameOn([this](const unsigned char *addr, const uint32_t size) {
            PrintFaceDetectInfo(addr, size);
        });
    }
    sleep(2); // 2:sleep two second
}

void TestDisplay::StopStream(std::vector<int>& captureIds, std::vector<int>& streamIds)
{
    constexpr uint32_t TIME_FOR_WAIT_CANCEL_CAPTURE = 2;
    sleep(TIME_FOR_WAIT_CANCEL_CAPTURE);
    if (sizeof(captureIds) > 0) {
        for (auto &captureId : captureIds) {
            if (captureId == CAPTURE_ID_PREVIEW) {
                streamCustomerPreview_->ReceiveFrameOff();
            } else if (captureId == CAPTURE_ID_CAPTURE) {
                streamCustomerCapture_->ReceiveFrameOff();
            } else if (captureId == CAPTURE_ID_VIDEO) {
                streamCustomerVideo_->ReceiveFrameOff();
                sleep(1);
                CloseFd();
            } else if (captureId == CAPTURE_ID_ANALYZE) {
                streamCustomerAnalyze_->ReceiveFrameOff();
            }
        }
        for (const auto &captureId : captureIds) {
            std::cout << "==========[test log]check Capture: CancelCapture success," << captureId << std::endl;
            rc = (CamRetCode)streamOperator->CancelCapture(captureId);
            sleep(TIME_FOR_WAIT_CANCEL_CAPTURE);
            EXPECT_EQ(true, rc == HDI::Camera::V1_0::NO_ERROR);
            if (rc == HDI::Camera::V1_0::NO_ERROR) {
                std::cout << "==========[test log]check Capture: CancelCapture success," << captureId << std::endl;
            } else {
                std::cout << "==========[test log]check Capture: CancelCapture fail, rc = " << rc;
                std::cout << "captureId = " << captureId << std::endl;
            }
        }
    }
    sleep(1);
    if (sizeof(streamIds) > 0) {
        // release stream
        rc = (CamRetCode)streamOperator->ReleaseStreams(streamIds);
        EXPECT_EQ(true, rc == HDI::Camera::V1_0::NO_ERROR);
        if (rc == HDI::Camera::V1_0::NO_ERROR) {
            std::cout << "==========[test log]check Capture: ReleaseStreams success." << std::endl;
        } else {
            std::cout << "==========[test log]check Capture: ReleaseStreams fail, rc = " << rc << std::endl;
            std::cout << "streamIds = " << streamIds.front() << std::endl;
        }
    }
}

void DemoCameraDeviceCallback::PrintStabiliInfo(const std::shared_ptr<CameraMetadata>& result)
{
    if (result == nullptr) {
        CAMERA_LOGE("TestDisplay: result is null");
        return;
    }
    common_metadata_header_t* data = result->get();
    if (data == nullptr) {
        CAMERA_LOGE("TestDisplay: data is null");
        return;
    }
    uint8_t videoStabiliMode;
    camera_metadata_item_t entry;
    int ret = FindCameraMetadataItem(data, OHOS_CONTROL_VIDEO_STABILIZATION_MODE, &entry);
    if (ret != 0) {
        CAMERA_LOGE("demo test: get OHOS_CONTROL_EXPOSURE_MODE error\n");
        return;
    }
    videoStabiliMode = *(entry.data.u8);
    CAMERA_LOGI("videoStabiliMode: %{public}d", videoStabiliMode);
    std::cout << "==========[test log] PrintStabiliInfo videoStabiliMode: " << 
        static_cast<int>(videoStabiliMode) << std::endl;
}

void DemoCameraDeviceCallback::PrintFpsInfo(const std::shared_ptr<CameraMetadata>& result)
{
    if (result == nullptr) {
        CAMERA_LOGE("TestDisplay: result is null");
        return;
    }
    common_metadata_header_t* data = result->get();
    if (data == nullptr) {
        CAMERA_LOGE("TestDisplay: data is null");
        return;
    }
    std::vector<int32_t> fpsRange;
    camera_metadata_item_t entry;
    int ret = FindCameraMetadataItem(data, OHOS_CONTROL_FPS_RANGES, &entry);
    if (ret != 0) {
        CAMERA_LOGE("demo test: get OHOS_CONTROL_EXPOSURE_MODE error\n");
        return;
    }

    for (int i = 0; i < entry.count; i++) {
        fpsRange.push_back(*(entry.data.i32 + i));
    }
    CAMERA_LOGI("Set fpsRange: [%{public}d, %{public}d]", fpsRange[0], fpsRange[1]);
    std::cout << "==========[test log] PrintFpsInfo fpsRange: [" << fpsRange[0] << ", " <<
        fpsRange[1] << "]" << std::endl;
}

#ifndef CAMERA_BUILT_ON_OHOS_LITE
int32_t DemoCameraDeviceCallback::OnError(ErrorType type, int32_t errorCode)
{
    CAMERA_LOGI("demo test: OnError type : %{public}d, errorMsg : %{public}d", type, errorCode);
}

int32_t DemoCameraDeviceCallback::OnResult(uint64_t timestamp, const std::vector<uint8_t>& result)
{
    CAMERA_LOGI("%{public}s, enter.", __func__);
    return RC_OK;
}

int32_t DemoCameraHostCallback::OnCameraStatus(const std::string& cameraId, CameraStatus status)
{
    CAMERA_LOGI("%{public}s, enter.", __func__);
    return RC_OK;
}

int32_t DemoCameraHostCallback::OnFlashlightStatus(const std::string& cameraId, FlashlightStatus status)
{
    CAMERA_LOGI("%{public}s, enter. cameraId = %s, status = %d",
        __func__, cameraId.c_str(), static_cast<int>(status));
    return RC_OK;
}

int32_t DemoCameraHostCallback::OnCameraEvent(const std::string& cameraId, CameraEvent event)
{
    CAMERA_LOGI("%{public}s, enter. cameraId = %s, event = %d",
        __func__, cameraId.c_str(), static_cast<int>(event));
    return RC_OK;
}

int32_t DemoStreamOperatorCallback::OnCaptureStarted(int32_t captureId, const std::vector<int32_t>& streamIds)
{
    CAMERA_LOGI("%{public}s, enter.", __func__);
    return RC_OK;
}

int32_t DemoStreamOperatorCallback::OnCaptureEnded(int32_t captureId, const std::vector<CaptureEndedInfo>& infos)
{
    CAMERA_LOGI("%{public}s, enter.", __func__);
    return RC_OK;
}

int32_t DemoStreamOperatorCallback::OnCaptureError(int32_t captureId, const std::vector<CaptureErrorInfo>& infos)
{
    CAMERA_LOGI("%{public}s, enter.", __func__);
    return RC_OK;
}

int32_t DemoStreamOperatorCallback::OnFrameShutter(int32_t captureId,
    const std::vector<int32_t>& streamIds, uint64_t timestamp)
{
    CAMERA_LOGI("%{public}s, enter.", __func__);
    return RC_OK;
}

#endif
