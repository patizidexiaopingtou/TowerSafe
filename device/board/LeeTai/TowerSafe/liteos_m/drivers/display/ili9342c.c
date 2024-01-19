

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "ili9342c.h"
#include "gpio_if.h"
#include "spi_if.h"
#include "gpio_types.h"
#include "esp_err.h"
#include "hdf_log.h"
#include "osal_time.h"
#include "driver/spi_common.h"
#include "driver/spi_master.h"

/*********************
 *      DEFINES
 *********************/

/**********************
 *      TYPEDEFS
 **********************/

/*The LCD needs a bunch of command/argument values to be initialized. They are stored in this struct. */
typedef struct {
    uint8_t cmd;
    uint8_t data[16];
    uint8_t databytes; //No of data in data; bit 7 = delay after set; 0xFF = end of cmds.
} lcd_init_cmd_t;

/**********************
 *  STATIC PROTOTYPES
 **********************/
static void IomuxInit(void);

/**********************
 *  STATIC VARIABLES
 **********************/

static DevHandle spiHandle = NULL;

/**********************
 *      MACROS
 **********************/

/**********************
 *   GLOBAL FUNCTIONS
 **********************/

void ili9341_init(void)
{
	
    lcd_init_cmd_t ili_init_cmds[]={
        {0xCF, {0x00, 0x83, 0X30}, 3},
        {0xED, {0x64, 0x03, 0X12, 0X81}, 4},
        {0xE8, {0x85, 0x01, 0x79}, 3},
        {0xCB, {0x39, 0x2C, 0x00, 0x34, 0x02}, 5},
        {0xF7, {0x20}, 1},
        {0xEA, {0x00, 0x00}, 2},
        {0xC0, {0x26}, 1},          /*Power control*/
        {0xC1, {0x11}, 1},          /*Power control */
        {0xC5, {0x35, 0x3E}, 2},    /*VCOM control*/
        {0xC7, {0xBE}, 1},          /*VCOM control*/
        {0x36, {0x28}, 1},          /*Memory Access Control*/
        {0x3A, {0x55}, 1},			/*Pixel Format Set*/
        {0xB1, {0x00, 0x1B}, 2},
        {0xF2, {0x08}, 1},
        {0x26, {0x01}, 1},
        {0xE0, {0x1F, 0x1A, 0x18, 0x0A, 0x0F, 0x06, 0x45, 0X87, 0x32, 0x0A, 0x07, 0x02, 0x07, 0x05, 0x00}, 15},
        {0XE1, {0x00, 0x25, 0x27, 0x05, 0x10, 0x09, 0x3A, 0x78, 0x4D, 0x05, 0x18, 0x0D, 0x38, 0x3A, 0x1F}, 15},
        {0x2A, {0x00, 0x00, 0x00, 0xEF}, 4},
        {0x2B, {0x00, 0x00, 0x01, 0x3f}, 4},
        {0x2C, {0}, 0},
        {0xB7, {0x07}, 1},
        {0xB6, {0x0A, 0x82, 0x27, 0x00}, 4},
        {0x11, {0}, 0x80},
        {0x29, {0}, 0x80},
        {0, {0}, 0xff},
    };

    StartSPI();

	//Initialize non-SPI GPIOs
    (void)GpioSetDir(ILI9341_DC, GPIO_DIR_OUT);

#if ILI9341_USE_RST
    // gpio_pad_select_gpio(ILI9341_RST);
	// gpio_set_direction(ILI9341_RST, GPIO_MODE_OUTPUT);
    (void)GpioSetDir(ILI9341_RST, GPIO_DIR_OUT);

	//Reset the display
	// gpio_set_level(ILI9341_RST, 0);
	// vTaskDelay(100 / portTICK_RATE_MS);
	// gpio_set_level(ILI9341_RST, 1);
	// vTaskDelay(100 / portTICK_RATE_MS);
    (void)GpioWrite(ILI9341_DC, GPIO_VAL_LOW);
    osDelay(100 / portTICK_RATE_MS);
    (void)GpioWrite(ILI9341_DC, GPIO_VAL_HIGH);
    osDelay(100 / portTICK_RATE_MS);
#endif

	HDF_LOGI("Initialization.");

	//Send all the commands
	uint16_t cmd = 0;
	while (ili_init_cmds[cmd].databytes!=0xff) {
		ili9341_send_cmd(ili_init_cmds[cmd].cmd);
		ili9341_send_data(ili_init_cmds[cmd].data, ili_init_cmds[cmd].databytes&0x1F);
		if (ili_init_cmds[cmd].databytes & 0x80) {
			osDelay(100 / portTICK_RATE_MS);
		}
		cmd++;
	}

    ili9341_set_orientation(CONFIG_LV_DISPLAY_ORIENTATION);

#if ILI9341_INVERT_COLORS == 1
	ili9341_send_cmd(0x21);
#else
	ili9341_send_cmd(0x20);
#endif
}

void ili9341_send_cmd(uint8_t cmd)
{
    struct SpiMsg msg = {0};
    msg.wbuf = &cmd;
    msg.len = 1;
    (void)GpioWrite(ILI9341_DC, GPIO_VAL_LOW);
    (void)SpiTransfer(spiHandle, &msg, 1);
}

void ili9341_send_data(void * data, uint16_t length)
{
    if(length == 0) {
        data = NULL;
    }
    struct SpiMsg msg = {0};
    msg.wbuf = (uint8_t *)data;
    msg.len = length;
    (void)GpioWrite(ILI9341_DC, GPIO_VAL_HIGH);
    (void)SpiTransfer(spiHandle, &msg, 1);
}

void ili9341_send_color(void * data, uint16_t length)
{
    ili9341_send_data(data, length);
    
}

// static inline void disp_spi_send_data(uint8_t *data, size_t length) {
//     disp_spi_transaction(data, length, DISP_SPI_SEND_POLLING, NULL, 0, 0);
// }

// static inline void disp_spi_send_colors(uint8_t *data, size_t length) {
//     disp_spi_transaction(data, length,
//         DISP_SPI_SEND_QUEUED | DISP_SPI_SIGNAL_FLUSH,
//         NULL, 0, 0);
// }



// void disp_spi_transaction(const uint8_t *data, size_t length,
//     disp_spi_send_flag_t flags, uint8_t *out,
//     uint64_t addr, uint8_t dummy_bits)
// {
//     if (0 == length) {
//         return;
//     }

//     spi_transaction_ext_t t = {0};

//     /* transaction length is in bits */
//     t.base.length = length * 8;

//     if (length <= 4 && data != NULL) {
//         t.base.flags = SPI_TRANS_USE_TXDATA;
//         memcpy(t.base.tx_data, data, length);
//     } else {
//         t.base.tx_buffer = data;
//     }

//     if (flags & DISP_SPI_RECEIVE) {
//         assert(out != NULL && (flags & (DISP_SPI_SEND_POLLING | DISP_SPI_SEND_SYNCHRONOUS)));
//         t.base.rx_buffer = out;

// #if defined(DISP_SPI_HALF_DUPLEX)
// 		t.base.rxlength = t.base.length;
// 		t.base.length = 0;	/* no MOSI phase in half-duplex reads */
// #else
// 		t.base.rxlength = 0; /* in full-duplex mode, zero means same as tx length */
// #endif
//     }

//     if (flags & DISP_SPI_ADDRESS_8) {
//         t.address_bits = 8;
//     } else if (flags & DISP_SPI_ADDRESS_16) {
//         t.address_bits = 16;
//     } else if (flags & DISP_SPI_ADDRESS_24) {
//         t.address_bits = 24;
//     } else if (flags & DISP_SPI_ADDRESS_32) {
//         t.address_bits = 32;
//     }
//     if (t.address_bits) {
//         t.base.addr = addr;
//         t.base.flags |= SPI_TRANS_VARIABLE_ADDR;
//     }

// #if defined(DISP_SPI_HALF_DUPLEX)
// 	if (flags & DISP_SPI_MODE_DIO) {
// 		t.base.flags |= SPI_TRANS_MODE_DIO;
// 	} else if (flags & DISP_SPI_MODE_QIO) {
// 		t.base.flags |= SPI_TRANS_MODE_QIO;
// 	}

// 	if (flags & DISP_SPI_MODE_DIOQIO_ADDR) {
// 		t.base.flags |= SPI_TRANS_MODE_DIOQIO_ADDR;
// 	}

// 	if ((flags & DISP_SPI_VARIABLE_DUMMY) && dummy_bits) {
// 		t.dummy_bits = dummy_bits;
// 		t.base.flags |= SPI_TRANS_VARIABLE_DUMMY;
// 	}
// #endif

//     /* Save flags for pre/post transaction processing */
//     t.base.user = (void *) flags;

//     /* Poll/Complete/Queue transaction */
//     if (flags & DISP_SPI_SEND_POLLING) {
// 		disp_wait_for_pending_transactions();	/* before polling, all previous pending transactions need to be serviced */
//         spi_device_polling_transmit(spi, (spi_transaction_t *) &t);
//     } else if (flags & DISP_SPI_SEND_SYNCHRONOUS) {
// 		disp_wait_for_pending_transactions();	/* before synchronous queueing, all previous pending transactions need to be serviced */
//         spi_device_transmit(spi, (spi_transaction_t *) &t);
//     } else {
		
// 		/* if necessary, ensure we can queue new transactions by servicing some previous transactions */
// 		if(uxQueueMessagesWaiting(TransactionPool) == 0) {
// 			spi_transaction_t *presult;
// 			while(uxQueueMessagesWaiting(TransactionPool) < SPI_TRANSACTION_POOL_RESERVE) {
// 				if (spi_device_get_trans_result(spi, &presult, 1) == ESP_OK) {
// 					xQueueSend(TransactionPool, &presult, portMAX_DELAY);	/* back to the pool to be reused */
// 				}
// 			}
// 		}

// 		spi_transaction_ext_t *pTransaction = NULL;
// 		xQueueReceive(TransactionPool, &pTransaction, portMAX_DELAY);
//         memcpy(pTransaction, &t, sizeof(t));
//         if (spi_device_queue_trans(spi, (spi_transaction_t *) pTransaction, portMAX_DELAY) != ESP_OK) {
// 			xQueueSend(TransactionPool, &pTransaction, portMAX_DELAY);	/* send failed transaction back to the pool to be reused */
//         }
//     }
// }



void ili9341_set_orientation(uint8_t orientation)
{
    // ESP_ASSERT(orientation < 4);

    const char *orientation_str[] = {
        "PORTRAIT", "PORTRAIT_INVERTED", "LANDSCAPE", "LANDSCAPE_INVERTED"
    };

    HDF_LOGI("Display orientation: %s", orientation_str[orientation]);

#if defined CONFIG_LV_PREDEFINED_DISPLAY_LeeTai
    uint8_t data[] = {0x68, 0x68, 0x08, 0x08};
#elif defined (CONFIG_LV_PREDEFINED_DISPLAY_TowerSafe)
	uint8_t data[] = {0x08, 0x88, 0x28, 0xE8};
#elif defined (CONFIG_LV_PREDEFINED_DISPLAY_WROVER4)
    uint8_t data[] = {0x6C, 0xEC, 0xCC, 0x4C};
#elif defined (CONFIG_LV_PREDEFINED_DISPLAY_NONE)
    uint8_t data[] = {0x48, 0x88, 0x28, 0xE8};
#endif

    HDF_LOGI("0x36 command value: 0x%02X", data[orientation]);

    ili9341_send_cmd(0x36);
    ili9341_send_data((void *) &data[orientation], 1);
}

void ili9341_sleep_in()
{
	uint8_t data[] = {0x08};
	ili9341_send_cmd(0x10);
	ili9341_send_data(&data, 1);
}

void ili9341_sleep_out()
{
	uint8_t data[] = {0x08};
	ili9341_send_cmd(0x11);
	ili9341_send_data(&data, 1);
}

void StartSPI(void) {
    struct SpiDevInfo spiDevinfo = {0};
    spiDevinfo.busNum = VSPI_HOST;  //SPI设备总线号
    spiDevinfo.csNum = 0;           //SPI设备片选号
    spiHandle = SpiOpen(&spiDevinfo);
    if (spiHandle == NULL) {
        HDF_LOGE("SpiOpen: failed\n");
        return;
    }

    IomuxInit();
}

void EndSPI(void) {

    if (spiHandle) {
        SpiClose(spiHandle);
        spiHandle = NULL;
    }
}

/**********************
 *   STATIC FUNCTIONS
 **********************/
static void IomuxInit(void)
{
    gpio_config_t io_conf = {0};
    io_conf.pin_bit_mask = GPIO_SEL_15;
    io_conf.mode = GPIO_MODE_OUTPUT;
    if (gpio_config(&io_conf) != ESP_OK) {
        return;
    }
    (void)gpio_iomux_out(GPIO_NUM_15, FUNC_MTDO_GPIO15, 1);
}
