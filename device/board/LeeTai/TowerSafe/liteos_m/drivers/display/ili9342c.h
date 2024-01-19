

#ifndef _ILI9342C_H_
#define _ILI9342C_H_

/*********************
 *      INCLUDES
 *********************/
#include <stdbool.h>
#include "stdint.h"
#include "stdbool.h"

/*********************
 *      DEFINES
 *********************/

#ifdef __cplusplus
extern "C" {
#endif

// Screen

#define TFT_DC_PIN 0    // 15 Data Command control pin
#define TFT_CS_PIN -1   // 5 Chip select control pin
#define TFT_RST_PIN -1  // Reset pin (could connect to Arduino RESET pin)
#define TFT_BL_PIN -1   // LED back-light (required for LeeTai)

#define TFT_WIDTH 240
#define TFT_HEIGHT 320

void StartSPI(void);
void EndSPI(void);

#define ILI9341_DC        TFT_DC_PIN
#define ILI9341_USE_RST   0
#define ILI9341_RST       TFT_RST_PIN
#define ILI9341_INVERT_COLORS 1
#define CONFIG_LV_PREDEFINED_DISPLAY_TowerSafe 1
#define CONFIG_LV_DISPLAY_ORIENTATION 0

/**********************
 * GLOBAL PROTOTYPES
 **********************/

void ili9341_init(void);
void ili9341_send_cmd(uint8_t cmd);
void ili9341_send_data(void * data, uint16_t length);
void ili9341_send_color(void * data, uint16_t length);
void ili9341_set_orientation(uint8_t orientation);

void ili9341_sleep_in(void);
void ili9341_sleep_out(void);

#ifdef __cplusplus
} /*extern "C"*/
#endif

#endif