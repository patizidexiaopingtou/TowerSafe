# 应用文件服务

## **简介**
应用文件服务是为应用提供文件分享和管理能力的服务，包含应用间文件分享、跨设备同应用文件分享以及跨设备跨应用文件分享的能力。
当前已具备基于分布式文件系统的跨设备同应用文件分享能力。

## **目录**
```
/foundation/filemanagement/app_file_service
│── interfaces                        // 接口声明
│  ├── innerkits                      // 对内接口声明
│  └── kits                           // 对外接口声明
```

## **说明**
### 接口说明
**表1** 应用文件服务接口说明
| **接口名** | **说明** |
| --- | --- |
| createSharePath(fd: number, cid: string, callback: AsyncCallback\<string>): void <br> createSharePath(fd: number, cid: string): Promise\<string> | 将文件fd与设备cid传递给分布式文件系统，创建跨设备分享路径 |
### 使用说明
createSharePath接口为分享文件fd创建能够跨设备访问的分布式路径，异步返回创建结果，设备号cid用于指定分享设备。

示例：
```
import remotefileshare from '@ohos.remotefileshare'

remotefileshare.createSharePath(fd, cid, function(err, path) {
    // callback
});

remotefileshare.createSharePath(fd, cid).then(function(path) {
    // promise
});
```

## **相关仓**

- [Linux内核5.10](https://gitee.com/openharmony/kernel_linux_5.10)
- [文件访问接口](https://gitee.com/zkx48/filemanagement_file_api)