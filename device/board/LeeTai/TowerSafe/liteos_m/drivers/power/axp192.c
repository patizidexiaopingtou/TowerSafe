

#include "axp192.h"
#include "i2c_if.h"
#include "hdf_log.h"

#define ACK_CHECK_EN 0x1  /*!< I2C master will check ack from slave     */
#define ACK_CHECK_DIS 0x0 /*!< I2C master will not check ack from slave */
#define ACK_VAL 0x0       /*!< I2C ack value  */
#define NACK_VAL 0x1      /*!< I2C nack value */

#define I2C_SUCCESE 1
#define I2C_ERROR 0
#define DEV_SLAVE_ADDR (0x44<<1|0)         // 从机设备地址
#define REG_WR_ADDR (0X44 << 1)     // write reg address
#define REG_RD_ADDR ((0x44 << 1) + 1) // read reg address
#define I2C_NUM 1
#define BUFF_LEN 2

static DevHandle i2cHandle = NULL;
static DevHandle i2cHandle_1 = NULL;

static int I2cWrite(DevHandle i2c_handle, unsigned char regAddr, unsigned char data)
{
  int ret = I2C_ERROR;
  unsigned char buf[BUFF_LEN] = {regAddr, data};
  struct I2cMsg msg = {
      .addr = DEV_SLAVE_ADDR,
      .buf = buf,
      .len = BUFF_LEN,
      .flags = 0,
  };
  ret = I2cTransfer(i2c_handle, &msg, 1);
  if (ret != 0)
  {
    printf("I2cWrite msg failed\n");
    return I2C_ERROR;
  }
  return I2C_SUCCESE;
}

static int I2cRead(DevHandle i2c_handle, unsigned char regAddr, unsigned char *data, int datalen)
{
  int ret = I2C_ERROR;
  struct I2cMsg writeMsg = {
      .addr = DEV_SLAVE_ADDR,
      .buf = &regAddr,
      .len = 1,
      .flags = 0,
  };
  ret = I2cTransfer(i2c_handle, &writeMsg, 1);
  if (ret != 0)
  {
    printf("I2cRead writeMsg failed\n");
    return I2C_ERROR;
  }

  struct I2cMsg readMsg = {
      .addr = DEV_SLAVE_ADDR,
      .buf = data,
      .len = datalen,
      .flags = I2C_FLAG_READ,
  };
  ret = I2cTransfer(i2c_handle, &readMsg, 1);
  if (ret != 0)
  {
    printf("I2cRead readMsg failed\n");
    return I2C_ERROR;
  }
  return I2C_SUCCESE;
}

void StartI2C(void)
{

  i2cHandle = I2cOpen(0);
  if (i2cHandle == NULL)
  {
    HDF_LOGE("I2cOpen: failed\n");
    return;
  }
  HDF_LOGE("I2cOpen: axp192 xxxx i2cHandle %d\n", i2cHandle);

  i2cHandle_1 = I2cOpen(1);
  if (i2cHandle_1 == NULL)
  {
    HDF_LOGE("EnvInit I2cOpen: failed\n");
    return;
  }
  HDF_LOGE("I2cOpen: EnvInit i2cHandle %d\n", i2cHandle_1);
  osDelay(1);
  // Write1Byte2(0x21,0x30);
  char data[BUFF_LEN] = {0};
  I2cWrite(i2cHandle_1, REG_WR_ADDR, 0x21 ); // 往寄存器地址中写入一个字节
  I2cWrite(i2cHandle_1, REG_WR_ADDR, 0x30 ); // 往寄存器地址中写入一个字节
  I2cRead(i2cHandle_1, REG_RD_ADDR, data, BUFF_LEN); // 从寄存器地址读取两个字节
  printf("\ni2c_read----02:%s\n",data);

}
void EndI2C(void)
{

  if (i2cHandle)
  {
    I2cClose(i2cHandle);
    i2cHandle = NULL;
  }
}
void EnvInit()
{
  HDF_LOGE("begun I2cOpen: EnvInit i2cHandle %d\n", i2cHandle);
  i2cHandle = I2cOpen(1);
  if (i2cHandle == NULL)
  {
    HDF_LOGE("EnvInit I2cOpen: failed\n");
    return;
  }
  HDF_LOGE("I2cOpen: EnvInit i2cHandle %d\n", i2cHandle);
}

void Axp192Init()
{
  StartI2C();

  // AXP192 30H
  Write1Byte(0x30, (Read8bit(0x30) & 0x04) | 0X02);
  printf("axp: vbus limit off\n");

  // AXP192 GPIO1:OD OUTPUT
  Write1Byte(0x92, Read8bit(0x92) & 0xf8);
  printf("axp: gpio1 init\n");

  // AXP192 GPIO2:OD OUTPUT
  Write1Byte(0x93, Read8bit(0x93) & 0xf8);
  printf("axp: gpio2 init\n");

  // AXP192 RTC CHG
  Write1Byte(0x35, (Read8bit(0x35) & 0x1c) | 0xa2);
  printf("axp: rtc battery charging enabled\n");

  SetESPVoltage(3350);
  printf("axp: esp32 power voltage was set to 3.35v\n");

  SetLcdVoltage(2800);
  printf("axp: lcd backlight voltage was set to 2.80v\n");

  SetLDOVoltage(2, 3300); // Periph power voltage preset (LCD_logic, SD card)
  printf("axp: lcd logic and sdcard voltage preset to 3.3v\n");

  SetLDOVoltage(3, 2000); // Vibrator power voltage preset
  printf("axp: vibrator voltage preset to 2v\n");

  SetLDOEnable(2, true);
  SetDCDC3(true); // LCD backlight
  SetLed(true);

  SetCHGCurrent(kCHG_100mA);
  // SetAxpPriphPower(1);
  // Serial.printf("axp: lcd_logic and sdcard power enabled\n\n");

  // pinMode(39, INPUT_PULLUP);

  // AXP192 GPIO4
  Write1Byte(0X95, (Read8bit(0x95) & 0x72) | 0X84);

  Write1Byte(0X36, 0X4C);

  Write1Byte(0x82, 0xff);

  SetLCDRSet(0);
  osDelay(100);
  SetLCDRSet(1);
  osDelay(100);
  // I2C_WriteByteDataAt(0X15,0XFE,0XFF);

  // axp: check v-bus status
  if (Read8bit(0x00) & 0x08)
  {
    Write1Byte(0x30, Read8bit(0x30) | 0x80);
    // if v-bus can use, disable M-Bus 5V output to input
    SetBusPowerMode(kMBusModeInput);
  }
  else
  {
    // if not, enable M-Bus 5V output
    SetBusPowerMode(kMBusModeOutput);
  }
}

void Write1Byte(uint8_t Addr, uint8_t Data)
{
  int ret;
  uint8_t buf[2] = {Addr, Data};
  struct I2cMsg msg = {
      .addr = AXP_ADDR,
      .buf = buf,
      .len = 2,
      .flags = 0,
  };
  ret = I2cTransfer(i2cHandle, &msg, 1);
  if (ret != 0)
  {
    printf("Write1Byte msg failed\n");
    return;
  }
}
void Write1Byte2(uint8_t Addr, uint8_t Data)
{
  int ret;
  uint8_t buf[2] = {Addr, Data};
  struct I2cMsg msg = {
      .addr = 0x44,
      .buf = buf,
      .len = 2,
      .flags = 0,
  };
  ret = I2cTransfer(i2cHandle_1, &msg, 1);
  if (ret != 0)
  {
    printf("Write1Byte msg failed\n");
    return;
  }
}

uint8_t Read8bit(uint8_t Addr)
{
  struct I2cMsg writeMsg = {
      .addr = AXP_ADDR,
      .buf = &Addr,
      .len = 1,
      .flags = 0,
  };
  int ret = I2cTransfer(i2cHandle, &writeMsg, 1);
  if (ret != 0)
  {
    printf("Read8bit writeMsg failed\n");
    return;
  }

  uint8_t data = 0x00;
  struct I2cMsg readMsg = {
      .addr = AXP_ADDR,
      .buf = &data,
      .len = 1,
      .flags = I2C_FLAG_READ,
  };
  ret = I2cTransfer(i2cHandle, &readMsg, 1);
  if (ret != 0)
  {
    printf("Read8bit readMsg failed\n");
    return;
  }
  return data;
}

uint16_t Read12Bit(uint8_t Addr)
{
  uint16_t Data = 0;
  uint8_t buf[2] = {0};
  ReadBuff(Addr, 2, buf);
  Data = ((buf[0] << 4) + buf[1]); //
  return Data;
}

uint16_t Read13Bit(uint8_t Addr)
{
  uint16_t Data = 0;
  uint8_t buf[2];
  ReadBuff(Addr, 2, buf);
  Data = ((buf[0] << 5) + buf[1]); //
  return Data;
}

uint16_t Read16bit(uint8_t Addr)
{
  uint16_t ReData = 0;
  uint8_t buf[2];
  ReadBuff(Addr, 2, buf);
  for (int i = 0; i < 2; i++)
  {
    ReData <<= 8;
    ReData |= buf[i];
  }
  return ReData;
}

uint32_t Read24bit(uint8_t Addr)
{
  uint32_t ReData = 0;
  uint8_t buf[3];
  ReadBuff(Addr, 3, buf);
  for (int i = 0; i < 3; i++)
  {
    ReData <<= 8;
    ReData |= buf[i];
  }
  return ReData;
}

// uint32_t Read32bit(uint8_t Addr) {
//   uint32_t ReData = 0;
//   Wire1.beginTransmission(0x34);
//   Wire1.write(Addr);
//   Wire1.endTransmission();
//   Wire1.requestFrom(0x34, 4);
//   for (int i = 0; i < 4; i++) {
//     ReData <<= 8;
//     ReData |= Wire1.read();
//   }
//   return ReData;
// }

void ReadBuff(uint8_t Addr, uint8_t Size, uint8_t *Buff)
{

  struct I2cMsg writeMsg = {
      .addr = AXP_ADDR,
      .buf = &Addr,
      .len = 1,
      .flags = 0,
  };
  int ret = I2cTransfer(i2cHandle, &writeMsg, 1);
  if (ret != 0)
  {
    printf("ReadBuff writeMsg failed\n");
    return;
  }

  struct I2cMsg readMsg = {
      .addr = AXP_ADDR,
      .buf = Buff,
      .len = Size,
      .flags = I2C_FLAG_READ,
  };
  ret = I2cTransfer(i2cHandle, &readMsg, 1);
  if (ret != 0)
  {
    printf("ReadBuff readMsg failed\n");
    return;
  }
}

void ScreenBreath(uint8_t brightness)
{
  if (brightness > 12)
  {
    brightness = 12;
  }
  uint8_t buf = Read8bit(0x28);
  Write1Byte(0x28, ((buf & 0x0f) | (brightness << 4)));
}

bool GetBatState()
{
  if (Read8bit(0x01) | 0x20)
    return true;
  else
    return false;
}
//---------coulombcounter_from_here---------
// enable: void EnableCoulombcounter(void);
// disable: void DisableCOulombcounter(void);
// stop: void StopCoulombcounter(void);
// clear: void ClearCoulombcounter(void);
// get charge data: uint32_t GetCoulombchargeData(void);
// get discharge data: uint32_t GetCoulombdischargeData(void);
// get coulomb val affter calculation: float GetCoulombData(void);
//------------------------------------------
void EnableCoulombcounter(void) { Write1Byte(0xB8, 0x80); }

void DisableCoulombcounter(void) { Write1Byte(0xB8, 0x00); }

void StopCoulombcounter(void) { Write1Byte(0xB8, 0xC0); }

void ClearCoulombcounter(void) { Write1Byte(0xB8, 0xA0); }

// uint32_t GetCoulombchargeData(void) { return Read32bit(0xB0); }

// uint32_t GetCoulombdischargeData(void) { return Read32bit(0xB4); }

// float GetCoulombData(void) {
//   uint32_t coin = 0;
//   uint32_t coout = 0;

//   coin = GetCoulombchargeData();
//   coout = GetCoulombdischargeData();

//   //c = 65536 * current_LSB * (coin - coout) / 3600 / ADC rate
//   //Adc rate can be read from 84H ,change this variable if you change the ADC reate
//   float ccc = 65536 * 0.5 * (int32_t)(coin - coout) / 3600.0 / 25.0;
//   return ccc;
// }

// Cut all power, except for LDO1 (RTC)
void PowerOff(void) { Write1Byte(0x32, Read8bit(0x32) | 0b10000000); }

void SetAdcState(bool state)
{
  // Enable / Disable all ADCs
  Write1Byte(0x82, state ? 0xff : 0x00);
}

void PrepareToSleep(void)
{
  // Disable ADCs
  SetAdcState(false);

  // Turn LED off
  SetLed(false);

  // Turn LCD backlight off
  SetDCDC3(false);
}

// Get current battery level
float GetBatteryLevel(void)
{
  const float batVoltage = GetBatVoltage();
  const float batPercentage =
      (batVoltage < 3.248088) ? (0) : (batVoltage - 3.120712) * 100;
  return (batPercentage <= 100) ? batPercentage : 100;
}

void RestoreFromLightSleep(void)
{
  // Turn LCD backlight on
  SetDCDC3(true);

  // Turn LED on
  SetLed(true);

  // Enable ADCs
  SetAdcState(true);
}

// uint8_t GetWarningLeve(void) {
//   Wire1.beginTransmission(0x34);
//   Wire1.write(0x47);
//   Wire1.endTransmission();
//   Wire1.requestFrom(0x34, 1);
//   uint8_t buf = Wire1.read();
//   return (buf & 0x01);
// }

// // -- sleep
// void DeepSleep(uint64_t time_in_us) {
//   PrepareToSleep();

//   if (time_in_us > 0) {
//     esp_sleep_enable_timer_wakeup(time_in_us);
//   } else {
//     esp_sleep_disable_wakeup_source(ESP_SLEEP_WAKEUP_TIMER);
//   }
//   (time_in_us == 0) ? esp_deep_sleep_start() : esp_deep_sleep(time_in_us);

//   // Never reached - after deep sleep ESP32 restarts
// }

// void LightSleep(uint64_t time_in_us) {
//   PrepareToSleep();

//   if (time_in_us > 0) {
//     esp_sleep_enable_timer_wakeup(time_in_us);
//   } else {
//     esp_sleep_disable_wakeup_source(ESP_SLEEP_WAKEUP_TIMER);
//   }
//   esp_light_sleep_start();

//   RestoreFromLightSleep();
// }

uint8_t GetWarningLevel(void) { return Read8bit(0x47) & 0x01; }

float GetBatVoltage()
{
  float ADCLSB = 1.1 / 1000.0;
  uint16_t ReData = Read12Bit(0x78);
  return ReData * ADCLSB;
}

float GetBatCurrent()
{
  float ADCLSB = 0.5;
  uint16_t CurrentIn = Read13Bit(0x7A);
  uint16_t CurrentOut = Read13Bit(0x7C);
  return (CurrentIn - CurrentOut) * ADCLSB;
}

float GetVinVoltage()
{
  float ADCLSB = 1.7 / 1000.0;
  uint16_t ReData = Read12Bit(0x56);
  return ReData * ADCLSB;
}

float GetVinCurrent()
{
  float ADCLSB = 0.625;
  uint16_t ReData = Read12Bit(0x58);
  return ReData * ADCLSB;
}

float GetVBusVoltage()
{
  float ADCLSB = 1.7 / 1000.0;
  uint16_t ReData = Read12Bit(0x5A);
  return ReData * ADCLSB;
}

float GetVBusCurrent()
{
  float ADCLSB = 0.375;
  uint16_t ReData = Read12Bit(0x5C);
  return ReData * ADCLSB;
}

float GetTempInAXP192()
{
  float ADCLSB = 0.1;
  const float OFFSET_DEG_C = -144.7;
  uint16_t ReData = Read12Bit(0x5E);
  return OFFSET_DEG_C + ReData * ADCLSB;
}

float GetBatPower()
{
  float VoltageLSB = 1.1;
  float CurrentLCS = 0.5;
  uint32_t ReData = Read24bit(0x70);
  return VoltageLSB * CurrentLCS * ReData / 1000.0;
}

float GetBatChargeCurrent()
{
  float ADCLSB = 0.5;
  uint16_t ReData = Read12Bit(0x7A);
  return ReData * ADCLSB;
}
float GetAPSVoltage()
{
  float ADCLSB = 1.4 / 1000.0;
  uint16_t ReData = Read12Bit(0x7E);
  return ReData * ADCLSB;
}

// float GetBatCoulombInput() {
//   uint32_t ReData = Read32bit(0xB0);
//   return ReData * 65536 * 0.5 / 3600 / 25.0;
// }

// float GetBatCoulombOut() {
//   uint32_t ReData = Read32bit(0xB4);
//   return ReData * 65536 * 0.5 / 3600 / 25.0;
// }

void SetCoulombClear() { Write1Byte(0xB8, 0x20); }

void SetLDO2(bool State)
{
  uint8_t buf = Read8bit(0x12);
  if (State == true)
    buf = (1 << 2) | buf;
  else
    buf = ~(1 << 2) & buf;
  Write1Byte(0x12, buf);
}

void SetDCDC3(bool State)
{
  uint8_t buf = Read8bit(0x12);
  if (State == true)
    buf = (1 << 1) | buf;
  else
    buf = ~(1 << 1) & buf;
  Write1Byte(0x12, buf);
}

uint8_t AXPInState() { return Read8bit(0x00); }
bool isACIN() { return (Read8bit(0x00) & 0x80) ? true : false; }
bool isCharging() { return (Read8bit(0x00) & 0x04) ? true : false; }
bool isVBUS() { return (Read8bit(0x00) & 0x20) ? true : false; }

void SetLDOVoltage(uint8_t number, uint16_t voltage)
{
  voltage = (voltage > 3300) ? 15 : (voltage / 100) - 18;
  switch (number)
  {
  // uint8_t reg, data;
  case 2:
    Write1Byte(0x28, (Read8bit(0x28) & 0X0F) | (voltage << 4));
    break;
  case 3:
    Write1Byte(0x28, (Read8bit(0x28) & 0XF0) | voltage);
    break;
  }
}

void SetDCVoltage(uint8_t number, uint16_t voltage)
{
  uint8_t addr;
  if (number > 2)
    return;
  voltage = (voltage < 700) ? 0 : (voltage - 700) / 25;
  switch (number)
  {
  case 0:
    addr = 0x26;
    break;
  case 1:
    addr = 0x25;
    break;
  case 2:
    addr = 0x27;
    break;
  }
  Write1Byte(addr, (Read8bit(addr) & 0X80) | (voltage & 0X7F));
}

void SetESPVoltage(uint16_t voltage)
{
  if (voltage >= 3000 && voltage <= 3400)
  {
    SetDCVoltage(0, voltage);
  }
}
void SetLcdVoltage(uint16_t voltage)
{
  if (voltage >= 2500 && voltage <= 3300)
  {
    SetDCVoltage(2, voltage);
  }
}

void SetLDOEnable(uint8_t number, bool state)
{
  uint8_t mark = 0x01;
  if ((number < 2) || (number > 3))
    return;

  mark <<= number;
  if (state)
  {
    Write1Byte(0x12, (Read8bit(0x12) | mark));
  }
  else
  {
    Write1Byte(0x12, (Read8bit(0x12) & (~mark)));
  }
}

void SetLCDRSet(bool state)
{
  uint8_t reg_addr = 0x96;
  uint8_t gpio_bit = 0x02;
  uint8_t data;
  data = Read8bit(reg_addr);

  if (state)
  {
    data |= gpio_bit;
  }
  else
  {
    data &= ~gpio_bit;
  }

  Write1Byte(reg_addr, data);
}

// Select source for BUS_5V
// 0 : use internal boost
// 1 : powered externally
void SetBusPowerMode(uint8_t state)
{
  uint8_t data;
  if (state == 0)
  {
    // Set GPIO to 3.3V (LDO OUTPUT mode)
    data = Read8bit(0x91);
    Write1Byte(0x91, (data & 0x0F) | 0xF0);
    // Set GPIO0 to LDO OUTPUT, pullup N_VBUSEN to disable VBUS supply from BUS_5V
    data = Read8bit(0x90);
    Write1Byte(0x90, (data & 0xF8) | 0x02);
    // Set EXTEN to enable 5v boost
    data = Read8bit(0x10);
    Write1Byte(0x10, data | 0x04);
  }
  else
  {
    // Set EXTEN to disable 5v boost
    data = Read8bit(0x10);
    Write1Byte(0x10, data & ~0x04);
    // Set GPIO0 to float, using enternal pulldown resistor to enable VBUS supply from BUS_5V
    data = Read8bit(0x90);
    Write1Byte(0x90, (data & 0xF8) | 0x07);
  }
}

void SetLed(uint8_t state)
{
  uint8_t reg_addr = 0x94;
  uint8_t data;
  data = Read8bit(reg_addr);

  if (state)
  {
    data = data & 0XFD;
  }
  else
  {
    data |= 0X02;
  }

  Write1Byte(reg_addr, data);
}

// set led state(GPIO high active,set 1 to enable amplifier)
void SetSpkEnable(uint8_t state)
{
  uint8_t reg_addr = 0x94;
  uint8_t gpio_bit = 0x04;
  uint8_t data;
  data = Read8bit(reg_addr);

  if (state)
  {
    data |= gpio_bit;
  }
  else
  {
    data &= ~gpio_bit;
  }

  Write1Byte(reg_addr, data);
}

void SetCHGCurrent(uint8_t state)
{
  uint8_t data = Read8bit(0x33);
  data &= 0xf0;
  data = data | (state & 0x0f);
  Write1Byte(0x33, data);
}
