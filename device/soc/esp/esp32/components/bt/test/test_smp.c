/*
 * Copyright (c) 2022 OpenValley Digital Co. LTD.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 Tests for the BLE SMP implementation
*/

#include <esp_types.h>
#include <stdio.h>
#include <stdlib.h>
#include <malloc.h>
#include <string.h>
#include <string.h>

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/semphr.h"
#include "freertos/queue.h"
#include "freertos/xtensa_api.h"
#include "unity.h"
#include "esp_heap_caps.h"
#include "esp_log.h"
#include "freertos/ringbuf.h"
#include "esp_system.h"
#include "nvs_flash.h"

#include "esp_bt.h"
#include "esp_bt_main.h"
#include "esp_bt_device.h"
#include "esp_gap_ble_api.h"

#define TAG "ble_smp_test"

#define KEY_LENGTH_DWORDS_P256 8

typedef unsigned long  DWORD;
typedef uint32_t UINT32;

typedef struct {
DWORD x[KEY_LENGTH_DWORDS_P256];
    DWORD y[KEY_LENGTH_DWORDS_P256];
    DWORD z[KEY_LENGTH_DWORDS_P256];
} Point;

typedef struct {
    // curve's coefficients
    DWORD a[KEY_LENGTH_DWORDS_P256];
    DWORD b[KEY_LENGTH_DWORDS_P256];

    //whether a is -3
    int a_minus3;

    // prime modulus
    DWORD p[KEY_LENGTH_DWORDS_P256];

    // Omega, p = 2^m -omega
    DWORD omega[KEY_LENGTH_DWORDS_P256];

    // base point, a point on E of order r
    Point G;

} elliptic_curve_t;

extern void ECC_PointMult_Bin_NAF(Point *q, Point *p, DWORD *n, uint32_t keyLength);
extern bool ECC_CheckPointIsInElliCur_P256(Point *p);
extern void p_256_init_curve(UINT32 keyLength);
extern elliptic_curve_t curve_p256;

static void bt_rand(void *buf, size_t len)
{
    if (!len) {
        return;
    }
    // Reset the buf value to the fixed value.
    memset(buf, 0x55, len);

    for (int i = 0; i < (int)(len / sizeof(uint32_t)); i++) {
        uint32_t rand = esp_random();
        memcpy(buf + i*sizeof(uint32_t), &rand, sizeof(uint32_t));
    }

    return;
}

TEST_CASE("ble_smp_public_key_check", "[ble_smp]")
{
    /* We wait init finish 200ms here */
    vTaskDelay(200 / portTICK_PERIOD_MS);
    Point public_key;
    DWORD private_key[KEY_LENGTH_DWORDS_P256] = {[0 ... (KEY_LENGTH_DWORDS_P256 - 1)] = 0x12345678};
    p_256_init_curve(KEY_LENGTH_DWORDS_P256);
    ECC_PointMult_Bin_NAF(&public_key, &(curve_p256.G), private_key, KEY_LENGTH_DWORDS_P256);
    /* Check Is the public key generated by the system on the given elliptic curve */
    TEST_ASSERT(ECC_CheckPointIsInElliCur_P256(&public_key));
    /* We simulate the attacker and set the y coordinate of the public key to 0. */
    for (int i = 0; i < KEY_LENGTH_DWORDS_P256; i++) {
        public_key.y[i] = 0x0;
    }
    /* At this point the public key should not be on the given elliptic curve. */
    TEST_ASSERT(!ECC_CheckPointIsInElliCur_P256(&public_key));
    /* Test whether the G point on the protocol is on a given elliptic curve */
    TEST_ASSERT(ECC_CheckPointIsInElliCur_P256(&(curve_p256.G)));
    /* test 100 times when the private key is generated by the random number. */
    for (int j = 0; j < 100; j++) {
        bt_rand(private_key, sizeof(DWORD)*KEY_LENGTH_DWORDS_P256);
        ECC_PointMult_Bin_NAF(&public_key, &(curve_p256.G), private_key, KEY_LENGTH_DWORDS_P256);
        /* Check Is the public key generated by the system on the given elliptic curve */
        TEST_ASSERT(ECC_CheckPointIsInElliCur_P256(&public_key));
    }
}

TEST_CASE("ble_smp_set_clear_static_passkey", "[ble_smp]")
{
    /* We wait init finish 200ms here */
    vTaskDelay(200 / portTICK_PERIOD_MS);
    esp_ble_auth_req_t auth_req = ESP_LE_AUTH_BOND;
    uint32_t passkey = 123456;
    /* test len = 0 when type != ESP_BLE_SM_CLEAR_STATIC_PASSKEY */
    TEST_ASSERT(esp_ble_gap_set_security_param(ESP_BLE_SM_AUTHEN_REQ_MODE, &auth_req, 0) == ESP_ERR_INVALID_ARG);
    /* test function */
    TEST_ASSERT(esp_ble_gap_set_security_param(ESP_BLE_SM_AUTHEN_REQ_MODE, &auth_req, sizeof(esp_ble_auth_req_t)) != ESP_ERR_INVALID_ARG);
    /* test type >= ESP_BLE_SM_MAX_PARAM */
    TEST_ASSERT(esp_ble_gap_set_security_param(ESP_BLE_SM_MAX_PARAM, &passkey, sizeof(uint32_t)) == ESP_ERR_INVALID_ARG);
    /* test len < sizeof(uint32_t) when type is ESP_BLE_SM_SET_STATIC_PASSKEY */
    TEST_ASSERT(esp_ble_gap_set_security_param(ESP_BLE_SM_SET_STATIC_PASSKEY, &passkey, sizeof(uint8_t)) != ESP_ERR_INVALID_ARG);
    /* test value is NULL when type != ESP_BLE_SM_CLEAR_STATIC_PASSKEY */
    TEST_ASSERT(esp_ble_gap_set_security_param(ESP_BLE_SM_SET_STATIC_PASSKEY, NULL, sizeof(uint8_t)) == ESP_ERR_INVALID_ARG);
    /* test value is NULL and len is 0 when type != ESP_BLE_SM_CLEAR_STATIC_PASSKEY */
    TEST_ASSERT(esp_ble_gap_set_security_param(ESP_BLE_SM_SET_STATIC_PASSKEY, NULL, 0) == ESP_ERR_INVALID_ARG);
    /* test function */
    TEST_ASSERT(esp_ble_gap_set_security_param(ESP_BLE_SM_SET_STATIC_PASSKEY, &passkey, sizeof(uint32_t)) != ESP_ERR_INVALID_ARG);
    /* test function */
    TEST_ASSERT(esp_ble_gap_set_security_param(ESP_BLE_SM_CLEAR_STATIC_PASSKEY, &passkey, sizeof(uint32_t)) != ESP_ERR_INVALID_ARG);
    /* test function */
    TEST_ASSERT(esp_ble_gap_set_security_param(ESP_BLE_SM_CLEAR_STATIC_PASSKEY, NULL, sizeof(uint32_t)) != ESP_ERR_INVALID_ARG);
    /* test function */
    TEST_ASSERT(esp_ble_gap_set_security_param(ESP_BLE_SM_CLEAR_STATIC_PASSKEY, NULL, 0) != ESP_ERR_INVALID_ARG);
}
