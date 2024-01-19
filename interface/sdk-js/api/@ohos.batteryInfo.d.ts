/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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

/**
 * Obtains battery information of a device.
 *
 * <p>Battery information includes the remaining battery power,
 * voltage, temperature, model, and charger type.
 *
 * @syscap SystemCapability.PowerManager.BatteryManager.Core
 * @since 6
 */
declare namespace batteryInfo {
    /**
     * Battery state of charge (SoC) of the current device, in percent.
     * @since 6
     */
    const batterySOC: number;

    /**
     * Battery charging status of the current device.
     * @since 6
     */
    const chargingStatus: BatteryChargeState;

    /**
     * Battery health state of the current device.
     * @since 6
     */
    const healthStatus: BatteryHealthState;

    /**
     * Charger type of the current device.
     * @since 6
     */
    const pluggedType: BatteryPluggedType;

    /**
     * Battery voltage of the current device, in µV.
     * @since 6
     */
    const voltage: number;

    /**
     * Battery technology of the current device.
     * @since 6
     */
    const technology: string;

    /**
     * Battery temperature of the current device, in 0.1℃.
     * @since 6
     */
    const batteryTemperature: number;

    /**
     * Battery present state of the current device.
     * @since 7
     */
    const isBatteryPresent: boolean;

    /**
     * Battery capacity level of the current device.
     * @since 9
     */
    const batteryCapacityLevel: BatteryCapacityLevel;

    /**
     * Estimated remaining time for the current device to be fully charged, in ms.
     * @since 9
     * @systemapi
     */
    const estimatedRemainingChargeTime: number;

    /**
     * Battery total energy of the current device, in mAh.
     * @since 9
     * @systemapi
     */
    const totalEnergy: number;

    /**
     * Battery immediate current of the current device, in mA.
     * @since 9
     * @systemapi
     */
    const nowCurrent: number;

    /**
     * Battery remaining energy of the current device, in mAh.
     * @since 9
     * @systemapi
     */
    const remainingEnergy: number;

    /**
     * Charger type of a device.
     *
     * @syscap SystemCapability.PowerManager.BatteryManager.Core
     * @since 6
     */
    export enum BatteryPluggedType {
        /**
         * Unknown type
         * @since 6
         */
        NONE,
        /**
         * AC charger
         * @since 6
         */
        AC,
        /**
         * USB charger
         * @since 6
         */
        USB,
        /**
         * Wireless charger
         * @since 6
         */
        WIRELESS
    }

    /**
     * Battery charging status of a device.
     *
     * @syscap SystemCapability.PowerManager.BatteryManager.Core
     * @since 6
     */
    export enum BatteryChargeState {
        /**
         * Unknown state.
         * @since 6
         */
        NONE,
        /**
         * The battery is being charged.
         * @since 6
         */
        ENABLE,
        /**
         * The battery is not being charged.
         * @since 6
         */
        DISABLE,
        /**
         * The battery is fully charged.
         * @since 6
         */
        FULL
    }

    /**
     * Battery health status of a device.
     *
     * @syscap SystemCapability.PowerManager.BatteryManager.Core
     * @since 6
     */
    export enum BatteryHealthState {
        /**
         * Unknown state.
         * @since 6
         */
        UNKNOWN,
        /**
         * The battery is in healthy state.
         * @since 6
         */
        GOOD,
        /**
         * The battery is overheated.
         * @since 6
         */
        OVERHEAT,
        /**
         * The battery voltage is over high.
         * @since 6
         */
        OVERVOLTAGE,
        /**
         * The battery temperature is low.
         * @since 6
         */
        COLD,
        /**
         * The battery is dead.
         * @since 6
         */
        DEAD
    }

    /**
     * Battery capacity level of a device.
     *
     * @syscap SystemCapability.PowerManager.BatteryManager.Core
     * @since 9
     */
    export enum BatteryCapacityLevel {
        /**
         * The battery is in full capacity level.
         * @since 9
         */
        LEVEL_FULL,
        /**
         * The battery is in high capacity level.
         * @since 9
         */
        LEVEL_HIGH,
        /**
         * The battery is in normal capacity level.
         * @since 9
         */
        LEVEL_NORMAL,
        /**
         * The battery is in low capacity level.
         * @since 9
         */
        LEVEL_LOW,
        /**
         * The battery is in warning low capacity level.
         * @since 9
         */
        LEVEL_WARNING,
        /**
         * The battery is in critical low capacity level.
         * @since 9
         */
        LEVEL_CRITICAL,
        /**
         * The battery is in the lowest capacity level, system will shut down automatically in a few seconds.
         * @since 9
         */
        LEVEL_SHUTDOWN
    }

    /**
     * Extra key of common event COMMON_EVENT_BATTERY_CHANGED.
     *
     * @syscap SystemCapability.PowerManager.BatteryManager.Core
     * @since 9
     */
    export enum CommonEventBatteryChangedKey {
        /**
         * Extra code of batterySOC.
         * @since 9
         */
        EXTRA_SOC = "soc",
        /**
         * Extra code of chargingStatus.
         * @since 9
         */
        EXTRA_CHARGE_STATE = "chargeState",
        /**
         * Extra code of healthStatus.
         * @since 9
         */
        EXTRA_HEALTH_STATE = "healthState",
        /**
         * Extra code of pluggedType.
         * @since 9
         */
        EXTRA_PLUGGED_TYPE = "pluggedType",
        /**
         * Extra code of voltage.
         * @since 9
         */
        EXTRA_VOLTAGE = "voltage",
        /**
         * Extra code of technology.
         * @since 9
         */
        EXTRA_TECHNOLOGY = "technology",
        /**
         * Extra code of batteryTemperature.
         * @since 9
         */
        EXTRA_TEMPERATURE = "temperature",
        /**
         * Extra code of isBatteryPresent.
         * @since 9
         */
        EXTRA_PRESENT = "present",
        /**
         * Extra code of batteryCapacityLevel.
         * @since 9
         */
        EXTRA_CAPACITY_LEVEL = "capacityLevel",
    }
}
export default batteryInfo;
