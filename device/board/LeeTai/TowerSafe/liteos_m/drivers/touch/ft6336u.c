

#include "ft6336u.h"
#include "i2c_if.h"
#include "gpio_if.h"
#include "hdf_log.h"
#include "esp_err.h"

ft6x36_status_t ft6x36_status;
uint8_t current_dev_addr;       // set during init

static DevHandle i2cHandle = NULL;

esp_err_t ft6x06_i2c_read_buf(uint8_t slave_addr, uint8_t register_addr, uint8_t *data_buf, uint8_t size) {
    struct I2cMsg writeMsg = {
        .addr = slave_addr,
        .buf = &register_addr,
        .len = 1,
        .flags = 0,
    };
    int ret = I2cTransfer(i2cHandle, &writeMsg, 1);
    if (ret != 0) {
        HDF_LOGE("ft6x06_i2c_read_buf writeMsg failed\n");
        return ESP_FAIL;
    }

    struct I2cMsg readMsg = {
        .addr = slave_addr,
        .buf = data_buf,
        .len = size,
        .flags = I2C_FLAG_READ,
    };
    ret = I2cTransfer(i2cHandle, &readMsg, 1);
    if (ret != 0) {
        HDF_LOGE("ft6x06_i2c_read_buf readMsg failed\n");
        return ESP_FAIL;
    }

    return ESP_OK;
}

esp_err_t ft6x06_i2c_read8(uint8_t slave_addr, uint8_t register_addr, uint8_t *data_buf) {
    esp_err_t ret = ft6x06_i2c_read_buf(slave_addr, register_addr, data_buf, 1);
    return ret;
}

/**
  * @brief  Read the FT6x36 gesture ID. Initialize first!
  * @param  dev_addr: I2C FT6x36 Slave address.
  * @retval The gesture ID or 0x00 in case of failure
  */
uint8_t ft6x36_get_gesture_id() {
    if (!ft6x36_status.inited) {
        HDF_LOGE("Init first!");
        return 0x00;
    }
    uint8_t data_buf;
    esp_err_t ret;
    if ((ret = ft6x06_i2c_read8(current_dev_addr, FT6X36_GEST_ID_REG, &data_buf) != ESP_OK))
        HDF_LOGE("Error reading from device: %s", esp_err_to_name(ret));
    return data_buf;
}

/**
  * @brief  Initialize for FT6x36 communication via I2C
  * @param  dev_addr: Device address on communication Bus (I2C slave address of FT6X36).
  * @retval None
  */
void ft6x06_init(uint16_t dev_addr) {
    if (!ft6x36_status.inited) {

/* I2C master is initialized before calling this function */
#if 1
        // esp_err_t code = i2c_master_init();
        esp_err_t code = ESP_OK;
        i2cHandle = I2cOpen(0);
        if (i2cHandle == NULL) {
            HDF_LOGE("I2cOpen: failed\n");
            code = ESP_FAIL;
        }

        (void)GpioSetDir(CST_INT, GPIO_DIR_IN);

        // // By default, the FT6336 will pulse the INT line for every touch
        // // event. But because it shares the Wire1 TwoWire/I2C with other
        // // devices, we cannot easily create an interrupt service routine to
        // // handle these events. So instead, we set the INT wire to polled mode,
        // // so it simply goes low as long as there is at least one valid touch.
        // // ft6336(0xA4, 0x00);
        // uint8_t buf[2] = {0xA4, 0x00};
        // struct I2cMsg msg = {
        //     .addr = dev_addr,
        //     .buf = buf,
        //     .len = 2,
        //     .flags = 0,
        // };
        // I2cTransfer(i2cHandle, &msg, 1);
#else
        esp_err_t code = ESP_OK;
#endif

        if (code != ESP_OK) {
            ft6x36_status.inited = false;
            HDF_LOGE("Error during I2C init %s", esp_err_to_name(code));
        } else {
            ft6x36_status.inited = true;
            current_dev_addr = dev_addr;
            uint8_t data_buf;
            esp_err_t ret;
            HDF_LOGI("Found touch panel controller");
            if ((ret = ft6x06_i2c_read8(dev_addr, FT6X36_PANEL_ID_REG, &data_buf) != ESP_OK))
                HDF_LOGE("Error reading from device: %s",
                         esp_err_to_name(ret));    // Only show error the first time
            HDF_LOGI("\tDevice ID: 0x%02x", data_buf);

            ft6x06_i2c_read8(dev_addr, FT6X36_CHIPSELECT_REG, &data_buf);
            HDF_LOGI("\tChip ID: 0x%02x", data_buf);

            ft6x06_i2c_read8(dev_addr, FT6X36_DEV_MODE_REG, &data_buf);
            HDF_LOGI("\tDevice mode: 0x%02x", data_buf);

            ft6x06_i2c_read8(dev_addr, FT6X36_FIRMWARE_ID_REG, &data_buf);
            HDF_LOGI("\tFirmware ID: 0x%02x", data_buf);

            ft6x06_i2c_read8(dev_addr, FT6X36_RELEASECODE_REG, &data_buf);
            HDF_LOGI("\tRelease code: 0x%02x", data_buf);
        }
    }
}

/**
  * @brief  Get the touch screen X and Y positions values. Ignores multi touch
  * @param  data: Store data here
  * @retval Always false
  */
bool ft6x36_read(int16_t *data) {
    uint8_t touch_pnt_cnt;        // Number of detected touch points
    static int16_t last_x = 0;  // 12bit pixel value
    static int16_t last_y = 0;  // 12bit pixel value

    uint8_t data_buf[5];        // 1 byte status, 2 bytes X, 2 bytes Y
    esp_err_t ret = ft6x06_i2c_read_buf(current_dev_addr, FT6X36_TD_STAT_REG, &data_buf[0], 5);
    
    if (ret != ESP_OK) {
        HDF_LOGE("Error getting X coordinates: %s", esp_err_to_name(ret));
        data[0] = last_x;
        data[1] = last_y;
        return false;
    }

    touch_pnt_cnt = data_buf[0];  // Number of detected touch points

    if (touch_pnt_cnt != 1) {    // ignore no touch & multi touch
        data[0] = last_x;
        data[1] = last_y;
        return false;
    }

    last_x = ((data_buf[1] & FT6X36_MSB_MASK) << 8) | (data_buf[2] & FT6X36_LSB_MASK);
    last_y = ((data_buf[3] & FT6X36_MSB_MASK) << 8) | (data_buf[4] & FT6X36_LSB_MASK);

#if CONFIG_LV_FT6X36_SWAPXY
    int16_t swap_buf = last_x;
    last_x = last_y;
    last_y = swap_buf;
#endif
#if CONFIG_LV_FT6X36_INVERT_X
    last_x =  LV_HOR_RES - last_x;
#endif
#if CONFIG_LV_FT6X36_INVERT_Y
    last_y = LV_VER_RES - last_y;
#endif
    data[0] = last_x;
    data[1] = last_y;
    // HDF_LOGI("X=%u Y=%u", data[0], data[1]);
    return true;
}

bool ft6x36_is_pressed(void) {
    uint16_t state = 0;

    if (!ft6x36_status.inited) {
        HDF_LOGE("Init first!");
        return false;
    }
    GpioRead(CST_INT, &state);
    return state == 1;
}