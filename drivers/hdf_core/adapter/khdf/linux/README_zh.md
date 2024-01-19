# linux\_khdf<a name="ZH-CN_TOPIC_0000001078489630"></a>

-   [简介](#section11660541593)
-   [目录](#section161941989596)
-   [相关仓](#section1371113476307)

## 简介<a name="section11660541593"></a>

该目录主要存放OpenHarmony驱动子系统适配linux内核的代码和编译脚本，在linux内核中部署OpenHarmony驱动框架。

## 目录<a name="section161941989596"></a>

```
/drivers/hdf_core/adapter/khdf/linux
├── utils                #linux内核下编译配置解析代码的编译脚本
├── manager              #linux内核下启动适配启动HDF框架代码
├── model                #驱动模型适配linux代码
│   ├── audio            #音频驱动模型
│   ├── display          #显示驱动模型
│   ├── input            #输入驱动模型
│   ├── misc             #杂项驱动模型，包括dsoftbus、light、vibrator
│   ├── network          #wifi驱动模型
│   └── sensor           #传感器驱动模型
│   └── storage          #存储驱动模型
│   └── usb              #USB驱动模型
├── network              #适配linux内核网络代码
├── osal                 #适配linux内核的posix接口
├── platform             #平台设备接口适配linux内核代码
│   ├── adc              #adc接口
│   ├── emmc             #emmc操作接口
│   ├── gpio             #gpio接口
│   ├── i2c              #i2c接口
│   ├── mipi_csi         #mipi csi接口
│   ├── mipi_dsi         #mipi dsi接口
│   ├── mmc              #mmc接口
│   ├── pwm              #pwm接口
│   ├── regulator        #regulator接口
│   ├── rtc              #rtc接口
│   ├── sdio             #sdio接口
│   ├── spi              #spi接口
│   ├── uart             #uart接口
│   └── watchdog         #watchdog接口
├── test                 #linux内核测试用例
```

## 相关仓<a name="section1371113476307"></a>

[驱动子系统](https://gitee.com/openharmony/docs/blob/master/zh-cn/readme/%E9%A9%B1%E5%8A%A8%E5%AD%90%E7%B3%BB%E7%BB%9F.md)

[drivers\_framework](https://gitee.com/openharmony/drivers_framework/blob/master/README_zh.md)

[drivers\_adapter](https://gitee.com/openharmony/drivers_adapter/blob/master/README_zh.md)

[drivers\_adapter\_khdf\_linux](https://gitee.com/openharmony/drivers_adapter_khdf_linux/blob/master/README_zh.md)

[drivers\_peripheral](https://gitee.com/openharmony/drivers_peripheral/blob/master/README_zh.md)

