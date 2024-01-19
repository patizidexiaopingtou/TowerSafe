# NiobeU4开发板I2C使用说明文档
本示例将演示如何在Niobeu4开发板上使用I2C接口进行开发

## 接口说明

```
1. I2C open打开I2C函数:DevHandle I2cOpen(int16_t number);
    参数说明: 
        number:  I2C控制器ID
        return:  返回的handle不为NULL,表示初始化成功

2. I2C close打开I2C函数:void I2cClose(DevHandle handle);
    参数说明: 
        handle:  指向通过I2cOpen获得的I2C 控制器的设备句柄的指针

3. I2C transfer启动到I2C设备的自定义传输函数:int32_t I2cTransfer(DevHandle handle, struct I2cMsg *msgs, int16_t count);
    参数说明: 
        handle:  指向通过I2cOpen获得的I2C控制器的设备句柄的指针
        msgs:    指示指向 I2C 传输消息结构体数组的指针
        count:   表示消息结构数组的长度
        return:  如果操作成功，返回传输的消息结构的数量,否则返回负值
```

## 编译调试

- 进入//kernel/liteos_m目录, 在menuconfig配置中进入如下选项:
  `(Top) → Platform → Board Selection → select board niobeu4 → use openvalley niobeu4 application → niobeu4 application choose`
- 选择 `106_hdf_i2c`
- 回到sdk根目录，执行`hb build`脚本进行编译。

## hcs配置

hcs配置文件在device/board/openvalley/niobeu4/liteos_m/hdf_config/hdf.hcs目录下，需要进行如下设置：

```
i2c_config {
    i2c0 {
        match_attr = "i2c0_config";
        mode = 0;    // 0:master 1:slave
        port = 0;
        scl_pin = 4;
        sda_pin = 9;
        speed = 400000;
    }
}    
```
