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

import { AsyncCallback, Callback } from "./basic";

/**
 * This module provides the capability to subscribe to sensor data.
 *
 * @since 8
 * @syscap SystemCapability.Sensors.Sensor
 */
declare namespace sensor {
    /**
     * Enum for obtain the type of sensor.
     * @enum {number}
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
     enum SensorId {
        ACCELEROMETER = 1,          /**< Acceleration sensor */
        GYROSCOPE = 2,              /**< Gyroscope sensor */
        AMBIENT_LIGHT = 5,          /**< Ambient light sensor */
        MAGNETIC_FIELD = 6,         /**< Magnetic field sensor */
        BAROMETER = 8,              /**< Barometric pressure sensor */
        HALL = 10,                  /**< Hall effect sensor */
        PROXIMITY = 12,             /**< Proximity sensor */
        HUMIDITY = 13,              /**< Humidity sensor */
        ORIENTATION = 256,          /**< Orientation sensor */
        GRAVITY = 257,              /**< Gravity sensor */
        LINEAR_ACCELEROMETER = 258,  /**< Linear acceleration sensor */
        ROTATION_VECTOR = 259,      /**< Rotation vector sensor */
        AMBIENT_TEMPERATURE = 260,  /**< Ambient temperature sensor */
        MAGNETIC_FIELD_UNCALIBRATED = 261,  /**< Uncalibrated magnetic field sensor */
        GYROSCOPE_UNCALIBRATED = 263,  /**< Uncalibrated gyroscope sensor */
        SIGNIFICANT_MOTION = 264,    /**< Significant motion sensor */
        PEDOMETER_DETECTION = 265,   /**< Pedometer detection sensor */
        PEDOMETER = 266,             /**< Pedometer sensor */
        HEART_RATE = 278,            /**< Heart rate sensor */
        WEAR_DETECTION = 280,        /**< Wear detection sensor */
        ACCELEROMETER_UNCALIBRATED = 281   /**< Uncalibrated acceleration sensor */
    }

    /**
     * Subscribe to accelerometer sensor data.
     * @param { SensorId.ACCELEROMETER } type - Indicate the sensor type to listen for, {@code SensorId.ACCELEROMETER}.
     * @param { Callback<AccelerometerResponse> } callback - callback accelerometer data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @permission ohos.permission.ACCELEROMETER
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
     function on(type: SensorId.ACCELEROMETER, callback: Callback<AccelerometerResponse>,
        options?: Options): void;

    /**
     * Subscribe to uncalibrated accelerometer sensor data.
     * @param { SensorId.ACCELEROMETER_UNCALIBRATED } type - Indicate the sensor type to listen for,
     *        {@code SensorId.ACCELEROMETER_UNCALIBRATED}.
     * @param { Callback<AccelerometerUncalibratedResponse> } callback - callback uncalibrated accelerometer data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @permission ohos.permission.ACCELEROMETER
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.ACCELEROMETER_UNCALIBRATED, callback: Callback<AccelerometerUncalibratedResponse>,
        options?: Options): void;

    /**
     * Subscribe to ambient light sensor data.
     * @param { SensorId.AMBIENT_LIGHT } type - Indicate the sensor type to listen for, {@code SensorId.AMBIENT_LIGHT}.
     * @param { Callback<LightResponse> } callback - callback ambient data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.AMBIENT_LIGHT, callback: Callback<LightResponse>, options?: Options): void;

    /**
     * Subscribe to ambient temperature sensor data.
     * @param { SensorId.AMBIENT_TEMPERATURE } type - Indicate the sensor type to listen for, {@code SensorId.AMBIENT_TEMPERATURE}.
     * @param { Callback<AmbientTemperatureResponse> } callback - callback temperature data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.AMBIENT_TEMPERATURE, callback: Callback<AmbientTemperatureResponse>,
        options?: Options): void;

    /**
     * Subscribe to barometer sensor data.
     * @param { SensorId.BAROMETER } type - Indicate the sensor type to listen for, {@code SensorId.BAROMETER}.
     * @param { Callback<BarometerResponse> } callback - callback barometer data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.BAROMETER, callback: Callback<BarometerResponse>, options?: Options): void;

    /**
     * Subscribe to gravity sensor data.
     * @param { SensorId.GRAVITY } type - Indicate the sensor type to listen for, {@code SensorId.GRAVITY}.
     * @param { Callback<GravityResponse> } callback - callback gravity data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.GRAVITY, callback: Callback<GravityResponse>,
        options?: Options): void;

    /**
     * Subscribe to gyroscope sensor data.
     * @param { SensorId.GYROSCOPE } type - Indicate the sensor type to listen for, {@code SensorId.GYROSCOPE}.
     * @param { Callback<GyroscopeResponse> } callback - callback gyroscope data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @permission ohos.permission.GYROSCOPE
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.GYROSCOPE, callback: Callback<GyroscopeResponse>,
        options?: Options): void;

    /**
     * Subscribe to uncalibrated gyroscope sensor data.
     * @param { SensorId.GYROSCOPE_UNCALIBRATED } type - Indicate the sensor type to listen for, {@code SensorId.GYROSCOPE_UNCALIBRATED}.
     * @param { Callback<GyroscopeUncalibratedResponse> } callback - callback uncalibrated gyroscope data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @permission ohos.permission.GYROSCOPE
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.GYROSCOPE_UNCALIBRATED, callback: Callback<GyroscopeUncalibratedResponse>,
        options?: Options): void;

    /**
     * Subscribe to hall sensor data.
     * @param { SensorId.HALL } type - Indicate the sensor type to listen for, {@code SensorId.HALL}.
     * @param { Callback<HallResponse> } callback - callback uncalibrated gyroscope data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.HALL, callback: Callback<HallResponse>, options?: Options): void;

    /**
     * Subscribe to heart rate sensor data.
     * @param { SensorId.HEART_RATE } type - Indicate the sensor type to listen for, {@code SensorId.HEART_RATE}.
     * @param { Callback<HeartRateResponse> } callback - callback heart rate data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @permission ohos.permission.READ_HEALTH_DATA
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.HEART_RATE, callback: Callback<HeartRateResponse>,
        options?: Options): void;

    /**
     * Subscribe to humidity sensor data.
     * @param { SensorId.HUMIDITY } type - Indicate the sensor type to listen for, {@code SensorId.HUMIDITY}.
     * @param { Callback<HumidityResponse> } callback - callback humidity data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.HUMIDITY, callback: Callback<HumidityResponse>,
        options?: Options): void;

    /**
     * Subscribe to linear acceleration sensor data.
     * @param { SensorId.LINEAR_ACCELEROMETER } type - Indicate the sensor type to listen for, {@code SensorId.LINEAR_ACCELEROMETER}.
     * @param { Callback<LinearAccelerometerResponse> } callback - callback linear acceleration data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @permission ohos.permission.ACCELEROMETER
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.LINEAR_ACCELEROMETER, callback: Callback<LinearAccelerometerResponse>,
        options?: Options): void;

    /**
     * Subscribe to magnetic field sensor data.
     * @param { SensorId.MAGNETIC_FIELD } type - Indicate the sensor type to listen for, {@code SensorId.MAGNETIC_FIELD}.
     * @param { Callback<MagneticFieldResponse> } callback - callback magnetic field data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.MAGNETIC_FIELD, callback: Callback<MagneticFieldResponse>,
        options?: Options): void;

    /**
     * Subscribe to uncalibrated magnetic field sensor data.
     * @param { SensorId.MAGNETIC_FIELD_UNCALIBRATED } type - Indicate the sensor type to listen for,
     *        {@code SensorId.MAGNETIC_FIELD_UNCALIBRATED}.
     * @param { Callback<MagneticFieldUncalibratedResponse> } callback - callback uncalibrated magnetic field data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.MAGNETIC_FIELD_UNCALIBRATED, callback: Callback<MagneticFieldUncalibratedResponse>,
        options?: Options): void;

    /**
     * Subscribe to orientation sensor data.
     * @param { SensorId.ORIENTATION } type - Indicate the sensor type to listen for, {@code SensorId.ORIENTATION}.
     * @param { Callback<OrientationResponse> } callback - callback orientation data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.ORIENTATION, callback: Callback<OrientationResponse>,
        options?: Options): void;

    /**
     * Subscribe to pedometer sensor data.
     * @param { SensorId.PEDOMETER } type - Indicate the sensor type to listen for, {@code SensorId.PEDOMETER}.
     * @param { Callback<PedometerResponse> } callback - callback pedometer data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @permission ohos.permission.ACTIVITY_MOTION
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.PEDOMETER, callback: Callback<PedometerResponse>, options?: Options): void;

    /**
     * Subscribe to pedometer detection sensor data.
     * @param { SensorId.PEDOMETER_DETECTION } type - Indicate the sensor type to listen for, {@code SensorId.PEDOMETER_DETECTION}.
     * @param { Callback<PedometerDetectionResponse> } callback - callback pedometer detection data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @permission ohos.permission.ACTIVITY_MOTION
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.PEDOMETER_DETECTION, callback: Callback<PedometerDetectionResponse>,
        options?: Options): void;

    /**
     * Subscribe to proximity sensor data.
     * @param { SensorId.PROXIMITY } type - Indicate the sensor type to listen for, {@code SensorId.PROXIMITY}.
     * @param { Callback<ProximityResponse> } callback - callback proximity data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.PROXIMITY, callback: Callback<ProximityResponse>, options?: Options): void;

    /**
     * Subscribe to rotation vector sensor data.
     * @param { SensorId.ROTATION_VECTOR } type - Indicate the sensor type to listen for, {@code SensorId.ROTATION_VECTOR}.
     * @param { Callback<RotationVectorResponse> } callback - callback rotation vector data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.ROTATION_VECTOR, callback: Callback<RotationVectorResponse>,
        options?: Options): void;

    /**
     * Subscribe to significant motion sensor data.
     * @param { SensorId.SIGNIFICANT_MOTION } type - Indicate the sensor type to listen for, {@code SensorId.SIGNIFICANT_MOTION}.
     * @param { Callback<SignificantMotionResponse> } callback - callback significant motion data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.SIGNIFICANT_MOTION, callback: Callback<SignificantMotionResponse>,
        options?: Options): void;

    /**
     * Subscribe to wear detection sensor data.
     * @param { SensorId.WEAR_DETECTION } type - Indicate the sensor type to listen for, {@code SensorId.WEAR_DETECTION}.
     * @param { Callback<RotationVectorResponse> } callback - callback wear detection data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.WEAR_DETECTION, callback: Callback<WearDetectionResponse>,
        options?: Options): void;

    /**
     * Subscribe to accelerometer sensor data once.
     * @param { SensorId.ACCELEROMETER } type - Indicate the sensor type to listen for, {@code SensorId.ACCELEROMETER}.
     * @param { Callback<AccelerometerResponse> } callback - callback accelerometer data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @permission ohos.permission.ACCELEROMETER
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
     function once(type: SensorId.ACCELEROMETER, callback: Callback<AccelerometerResponse>): void;

    /**
     * Subscribe to uncalibrated accelerometer sensor data once.
     * @param { SensorId.ACCELEROMETER_UNCALIBRATED } type - Indicate the sensor type to listen for,
     *        {@code SensorId.ACCELEROMETER_UNCALIBRATED}.
     * @param { Callback<AccelerometerUncalibratedResponse> } callback - callback uncalibrated accelerometer data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @permission ohos.permission.ACCELEROMETER
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.ACCELEROMETER_UNCALIBRATED, callback: Callback<AccelerometerUncalibratedResponse>): void;

    /**
     * Subscribe to ambient light sensor data once.
     * @param { SensorId.AMBIENT_LIGHT } type - Indicate the sensor type to listen for, {@code SensorId.AMBIENT_LIGHT}.
     * @param { Callback<LightResponse> } callback - callback ambient data.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.AMBIENT_LIGHT, callback: Callback<LightResponse>): void;

    /**
     * Subscribe to ambient temperature sensor data once.
     * @param { SensorId.AMBIENT_TEMPERATURE } type - Indicate the sensor type to listen for, {@code SensorId.AMBIENT_TEMPERATURE}.
     * @param { Callback<AmbientTemperatureResponse> } callback - callback temperature data.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.AMBIENT_TEMPERATURE, callback: Callback<AmbientTemperatureResponse>): void;

    /**
     * Subscribe to barometer sensor data once.
     * @param { SensorId.BAROMETER } type - Indicate the sensor type to listen for, {@code SensorId.BAROMETER}.
     * @param { Callback<BarometerResponse> } callback - callback barometer data.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.BAROMETER, callback: Callback<BarometerResponse>): void;

    /**
     * Subscribe to gravity sensor data once.
     * @param { SensorId.GRAVITY } type - Indicate the sensor type to listen for, {@code SensorId.GRAVITY}.
     * @param { Callback<GravityResponse> } callback - callback gravity data.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.GRAVITY, callback: Callback<GravityResponse>): void;

    /**
     * Subscribe to gyroscope sensor data once.
     * @param { SensorId.GYROSCOPE } type - Indicate the sensor type to listen for, {@code SensorId.GYROSCOPE}.
     * @param { Callback<GyroscopeResponse> } callback - callback gyroscope data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @permission ohos.permission.GYROSCOPE
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.GYROSCOPE, callback: Callback<GyroscopeResponse>): void;

    /**
     * Subscribe to uncalibrated gyroscope sensor data once.
     * @param { SensorId.GYROSCOPE_UNCALIBRATED } type - Indicate the sensor type to listen for, {@code SensorId.GYROSCOPE_UNCALIBRATED}.
     * @param { Callback<GyroscopeUncalibratedResponse> } callback - callback uncalibrated gyroscope data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @permission ohos.permission.GYROSCOPE
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.GYROSCOPE_UNCALIBRATED, callback: Callback<GyroscopeUncalibratedResponse>): void;

    /**
     * Subscribe to hall sensor data once.
     * @param { SensorId.HALL } type - Indicate the sensor type to listen for, {@code SensorId.HALL}.
     * @param { Callback<HallResponse> } callback - callback uncalibrated gyroscope data.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.HALL, callback: Callback<HallResponse>): void;

    /**
     * Subscribe to heart rate sensor data once.
     * @param { SensorId.HEART_RATE } type - Indicate the sensor type to listen for, {@code SensorId.HEART_RATE}.
     * @param { Callback<HeartRateResponse> } callback - callback heart rate data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @permission ohos.permission.READ_HEALTH_DATA
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.HEART_RATE, callback: Callback<HeartRateResponse>): void;

    /**
     * Subscribe to humidity sensor data once.
     * @param { SensorId.HUMIDITY } type - Indicate the sensor type to listen for, {@code SensorId.HUMIDITY}.
     * @param { Callback<HumidityResponse> } callback - callback humidity data.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.HUMIDITY, callback: Callback<HumidityResponse>): void;

    /**
     * Subscribe to linear acceleration sensor data once.
     * @param { SensorId.LINEAR_ACCELEROMETER } type - Indicate the sensor type to listen for, {@code SensorId.LINEAR_ACCELEROMETER}.
     * @param { Callback<LinearAccelerometerResponse> } callback - callback linear acceleration data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @permission ohos.permission.ACCELEROMETER
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.LINEAR_ACCELEROMETER, callback: Callback<LinearAccelerometerResponse>): void;

    /**
     * Subscribe to magnetic field sensor data once.
     * @param { SensorId.MAGNETIC_FIELD } type - Indicate the sensor type to listen for, {@code SensorId.MAGNETIC_FIELD}.
     * @param { Callback<MagneticFieldResponse> } callback - callback magnetic field data.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.MAGNETIC_FIELD, callback: Callback<MagneticFieldResponse>): void;

    /**
     * Subscribe to uncalibrated magnetic field sensor data once.
     * @param { SensorId.MAGNETIC_FIELD_UNCALIBRATED } type - Indicate the sensor type to listen for,
     *        {@code SensorId.MAGNETIC_FIELD_UNCALIBRATED}.
     * @param { Callback<MagneticFieldUncalibratedResponse> } callback - callback uncalibrated magnetic field data.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.MAGNETIC_FIELD_UNCALIBRATED, callback: Callback<MagneticFieldUncalibratedResponse>): void;

    /**
     * Subscribe to orientation sensor data once.
     * @param { SensorId.ORIENTATION } type - Indicate the sensor type to listen for, {@code SensorId.ORIENTATION}.
     * @param { Callback<OrientationResponse> } callback - callback orientation data.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.ORIENTATION, callback: Callback<OrientationResponse>): void;

    /**
     * Subscribe to pedometer sensor data once.
     * @param { SensorId.PEDOMETER } type - Indicate the sensor type to listen for, {@code SensorId.PEDOMETER}.
     * @param { Callback<PedometerResponse> } callback - callback pedometer data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @permission ohos.permission.ACTIVITY_MOTION
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.PEDOMETER, callback: Callback<PedometerResponse>): void;

    /**
     * Subscribe to pedometer detection sensor data once.
     * @param { SensorId.PEDOMETER_DETECTION } type - Indicate the sensor type to listen for, {@code SensorId.PEDOMETER_DETECTION}.
     * @param { Callback<PedometerDetectionResponse> } callback - callback pedometer detection data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @permission ohos.permission.ACTIVITY_MOTION
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.PEDOMETER_DETECTION, callback: Callback<PedometerDetectionResponse>): void;

    /**
     * Subscribe to proximity sensor data once.
     * @param { SensorId.PROXIMITY } type - Indicate the sensor type to listen for, {@code SensorId.PROXIMITY}.
     * @param { Callback<ProximityResponse> } callback - callback proximity data.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.PROXIMITY, callback: Callback<ProximityResponse>): void;

    /**
     * Subscribe to rotation vector sensor data once.
     * @param { SensorId.ROTATION_VECTOR } type - Indicate the sensor type to listen for, {@code SensorId.ROTATION_VECTOR}.
     * @param { Callback<RotationVectorResponse> } callback - callback rotation vector data.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.ROTATION_VECTOR, callback: Callback<RotationVectorResponse>): void;

    /**
     * Subscribe to significant motion sensor data once.
     * @param { SensorId.SIGNIFICANT_MOTION } type - Indicate the sensor type to listen for, {@code SensorId.SIGNIFICANT_MOTION}.
     * @param { Callback<SignificantMotionResponse> } callback - callback significant motion data.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.SIGNIFICANT_MOTION, callback: Callback<SignificantMotionResponse>): void;

    /**
     * Subscribe to wear detection sensor data once.
     * @param { SensorId.WEAR_DETECTION } type - Indicate the sensor type to listen for, {@code SensorId.WEAR_DETECTION}.
     * @param { Callback<RotationVectorResponse> } callback - callback wear detection data.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     *
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.WEAR_DETECTION, callback: Callback<WearDetectionResponse>): void;
    /**
     * Unsubscribe to accelerometer sensor data.
     * @param { SensorId.ACCELEROMETER } type - Indicate the sensor type to listen for, {@code SensorId.ACCELEROMETER}.
     * @param { Callback<AccelerometerResponse> } callback - callback accelerometer data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @permission ohos.permission.ACCELEROMETER
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
     function off(type: SensorId.ACCELEROMETER, callback?: Callback<AccelerometerResponse>): void;

    /**
     * Unsubscribe to uncalibrated accelerometer sensor data.
     * @param { SensorId.ACCELEROMETER_UNCALIBRATED } type - Indicate the sensor type to listen for,
     *        {@code SensorId.ACCELEROMETER_UNCALIBRATED}.
     * @param { Callback<AccelerometerUncalibratedResponse> } callback - callback uncalibrated accelerometer data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @permission ohos.permission.ACCELEROMETER
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.ACCELEROMETER_UNCALIBRATED, callback?: Callback<AccelerometerUncalibratedResponse>): void;

    /**
     * Unsubscribe to ambient light sensor data.
     * @param { SensorId.AMBIENT_LIGHT } type - Indicate the sensor type to listen for, {@code SensorId.AMBIENT_LIGHT}.
     * @param { Callback<LightResponse> } callback - callback ambient data.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.AMBIENT_LIGHT, callback?: Callback<LightResponse>): void;

    /**
     * Unsubscribe to ambient temperature sensor data.
     * @param { SensorId.AMBIENT_TEMPERATURE } type - Indicate the sensor type to listen for, {@code SensorId.AMBIENT_TEMPERATURE}.
     * @param { Callback<AmbientTemperatureResponse> } callback - callback temperature data.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.AMBIENT_TEMPERATURE, callback?: Callback<AmbientTemperatureResponse>): void;

    /**
     * Unsubscribe to barometer sensor data.
     * @param { SensorId.BAROMETER } type - Indicate the sensor type to listen for, {@code SensorId.BAROMETER}.
     * @param { Callback<BarometerResponse> } callback - callback barometer data.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.BAROMETER, callback?: Callback<BarometerResponse>): void;

    /**
     * Unsubscribe to gravity sensor data.
     * @param { SensorId.GRAVITY } type - Indicate the sensor type to listen for, {@code SensorId.GRAVITY}.
     * @param { Callback<GravityResponse> } callback - callback gravity data.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.GRAVITY, callback?: Callback<GravityResponse>): void;

    /**
     * Unsubscribe to gyroscope sensor data.
     * @param { SensorId.GYROSCOPE } type - Indicate the sensor type to listen for, {@code SensorId.GYROSCOPE}.
     * @param { Callback<GyroscopeResponse> } callback - callback gyroscope data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @permission ohos.permission.GYROSCOPE
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.GYROSCOPE, callback?: Callback<GyroscopeResponse>): void;

    /**
     * Unsubscribe to uncalibrated gyroscope sensor data.
     * @param { SensorId.GYROSCOPE_UNCALIBRATED } type - Indicate the sensor type to listen for, {@code SensorId.GYROSCOPE_UNCALIBRATED}.
     * @param { Callback<GyroscopeUncalibratedResponse> } callback - callback uncalibrated gyroscope data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @permission ohos.permission.GYROSCOPE
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.GYROSCOPE_UNCALIBRATED, callback?: Callback<GyroscopeUncalibratedResponse>): void;

    /**
     * Unsubscribe to hall sensor data.
     * @param { SensorId.HALL } type - Indicate the sensor type to listen for, {@code SensorId.HALL}.
     * @param { Callback<HallResponse> } callback - callback uncalibrated gyroscope data.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.HALL, callback?: Callback<HallResponse>): void;

    /**
     * Unsubscribe to heart rate sensor data.
     * @param { SensorId.HEART_RATE } type - Indicate the sensor type to listen for, {@code SensorId.HEART_RATE}.
     * @param { Callback<HeartRateResponse> } callback - callback heart rate data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @permission ohos.permission.READ_HEALTH_DATA
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.HEART_RATE, callback?: Callback<HeartRateResponse>): void;

    /**
     * Unsubscribe to humidity sensor data.
     * @param { SensorId.HUMIDITY } type - Indicate the sensor type to listen for, {@code SensorId.HUMIDITY}.
     * @param { Callback<HumidityResponse> } callback - callback humidity data.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.HUMIDITY, callback?: Callback<HumidityResponse>): void;

    /**
     * Unsubscribe to linear acceleration sensor data.
     * @param { SensorId.LINEAR_ACCELEROMETER } type - Indicate the sensor type to listen for, {@code SensorId.LINEAR_ACCELEROMETER}.
     * @param { Callback<LinearAccelerometerResponse> } callback - callback linear acceleration data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @permission ohos.permission.ACCELEROMETER
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.LINEAR_ACCELEROMETER, callback?: Callback<LinearAccelerometerResponse>): void;

    /**
     * Unsubscribe to magnetic field sensor data.
     * @param { SensorId.MAGNETIC_FIELD } type - Indicate the sensor type to listen for, {@code SensorId.MAGNETIC_FIELD}.
     * @param { Callback<MagneticFieldResponse> } callback - callback magnetic field data.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.MAGNETIC_FIELD, callback?: Callback<MagneticFieldResponse>): void;

    /**
     * Unsubscribe to uncalibrated magnetic field sensor data.
     * @param { SensorId.MAGNETIC_FIELD_UNCALIBRATED } type - Indicate the sensor type to listen for,
     *        {@code SensorId.MAGNETIC_FIELD_UNCALIBRATED}.
     * @param { Callback<MagneticFieldUncalibratedResponse> } callback - callback uncalibrated magnetic field data.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.MAGNETIC_FIELD_UNCALIBRATED, callback?: Callback<MagneticFieldUncalibratedResponse>): void;

    /**
     * Unsubscribe to orientation sensor data.
     * @param { SensorId.ORIENTATION } type - Indicate the sensor type to listen for, {@code SensorId.ORIENTATION}.
     * @param { Callback<OrientationResponse> } callback - callback orientation data.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.ORIENTATION, callback?: Callback<OrientationResponse>): void;

    /**
     * Unsubscribe to pedometer sensor data.
     * @param { SensorId.PEDOMETER } type - Indicate the sensor type to listen for, {@code SensorId.PEDOMETER}.
     * @param { Callback<PedometerResponse> } callback - callback pedometer data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @permission ohos.permission.ACTIVITY_MOTION
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.PEDOMETER, callback?: Callback<PedometerResponse>): void;

    /**
     * Unsubscribe to pedometer detection sensor data.
     * @param { SensorId.PEDOMETER_DETECTION } type - Indicate the sensor type to listen for, {@code SensorId.PEDOMETER_DETECTION}.
     * @param { Callback<PedometerDetectionResponse> } callback - callback pedometer detection data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @permission ohos.permission.ACTIVITY_MOTION
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.PEDOMETER_DETECTION, callback?: Callback<PedometerDetectionResponse>): void;

    /**
     * Unsubscribe to proximity sensor data.
     * @param { SensorId.PROXIMITY } type - Indicate the sensor type to listen for, {@code SensorId.PROXIMITY}.
     * @param { Callback<ProximityResponse> } callback - callback proximity data.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.PROXIMITY, callback?: Callback<ProximityResponse>): void;

    /**
     * Unsubscribe to rotation vector sensor data.
     * @param { SensorId.ROTATION_VECTOR } type - Indicate the sensor type to listen for, {@code SensorId.ROTATION_VECTOR}.
     * @param { Callback<RotationVectorResponse> } callback - callback rotation vector data.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.ROTATION_VECTOR, callback?: Callback<RotationVectorResponse>): void;


    /**
     * Unsubscribe to significant motion sensor data.
     * @param { SensorId.SIGNIFICANT_MOTION } type - Indicate the sensor type to listen for, {@code SensorId.SIGNIFICANT_MOTION}.
     * @param { Callback<SignificantMotionResponse> } callback - callback significant motion data.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.SIGNIFICANT_MOTION, callback?: Callback<SignificantMotionResponse>): void;

    /**
     * Unsubscribe to wear detection sensor data.
     * @param { SensorId.WEAR_DETECTION } type - Indicate the sensor type to listen for, {@code SensorId.WEAR_DETECTION}.
     * @param { Callback<RotationVectorResponse> } callback - callback wear detection data.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.WEAR_DETECTION, callback?: Callback<WearDetectionResponse>): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_ACCELEROMETER}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @permission ohos.permission.ACCELEROMETER
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.ACCELEROMETER
     */
    function on(type: SensorType.SENSOR_TYPE_ID_ACCELEROMETER, callback: Callback<AccelerometerResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_ACCELEROMETER_UNCALIBRATED}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @permission ohos.permission.ACCELEROMETER
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.ACCELEROMETER_UNCALIBRATED
     */
    function on(type: SensorType.SENSOR_TYPE_ID_ACCELEROMETER_UNCALIBRATED, callback: Callback<AccelerometerUncalibratedResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_AMBIENT_LIGHT}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.AMBIENT_LIGHT
     */
    function on(type: SensorType.SENSOR_TYPE_ID_AMBIENT_LIGHT, callback: Callback<LightResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_AMBIENT_TEMPERATURE}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.AMBIENT_TEMPERATURE
     */
    function on(type: SensorType.SENSOR_TYPE_ID_AMBIENT_TEMPERATURE, callback: Callback<AmbientTemperatureResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_BAROMETER}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.BAROMETER
     */
    function on(type: SensorType.SENSOR_TYPE_ID_BAROMETER, callback: Callback<BarometerResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_GRAVITY}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.GRAVITY
     */
    function on(type: SensorType.SENSOR_TYPE_ID_GRAVITY, callback: Callback<GravityResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_GYROSCOPE}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.GYROSCOPE
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.GYROSCOPE
     */
    function on(type: SensorType.SENSOR_TYPE_ID_GYROSCOPE, callback: Callback<GyroscopeResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_GYROSCOPE_UNCALIBRATED}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.GYROSCOPE
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.GYROSCOPE_UNCALIBRATED
     */
    function on(type: SensorType.SENSOR_TYPE_ID_GYROSCOPE_UNCALIBRATED, callback: Callback<GyroscopeUncalibratedResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_HALL}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.HALL
     */
    function on(type: SensorType.SENSOR_TYPE_ID_HALL, callback: Callback<HallResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_HEART_RATE}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.HEALTH_DATA
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.HEART_RATE
     */
    function on(type: SensorType.SENSOR_TYPE_ID_HEART_RATE, callback: Callback<HeartRateResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_HUMIDITY}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.HUMIDITY
     */
    function on(type: SensorType.SENSOR_TYPE_ID_HUMIDITY, callback: Callback<HumidityResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_LINEAR_ACCELERATION}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.ACCELEROMETER
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.LINEAR_ACCELEROMETER
     */
    function on(type: SensorType.SENSOR_TYPE_ID_LINEAR_ACCELERATION, callback: Callback<LinearAccelerometerResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.MAGNETIC_FIELD
     */
    function on(type: SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD, callback: Callback<MagneticFieldResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD_UNCALIBRATED}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.MAGNETIC_FIELD_UNCALIBRATED
     */
    function on(type: SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD_UNCALIBRATED, callback: Callback<MagneticFieldUncalibratedResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_ORIENTATION}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.ORIENTATION
     */
    function on(type: SensorType.SENSOR_TYPE_ID_ORIENTATION, callback: Callback<OrientationResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_PEDOMETER}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.ACTIVITY_MOTION
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.PEDOMETER
     */
    function on(type: SensorType.SENSOR_TYPE_ID_PEDOMETER, callback: Callback<PedometerResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_PEDOMETER_DETECTION}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.ACTIVITY_MOTION
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.PEDOMETER_DETECTION
     */
    function on(type: SensorType.SENSOR_TYPE_ID_PEDOMETER_DETECTION, callback: Callback<PedometerDetectionResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_PROXIMITY}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.PROXIMITY
     */
    function on(type: SensorType.SENSOR_TYPE_ID_PROXIMITY, callback: Callback<ProximityResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_ROTATION_VECTOR}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.ROTATION_VECTOR
     */
    function on(type: SensorType.SENSOR_TYPE_ID_ROTATION_VECTOR, callback: Callback<RotationVectorResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_SIGNIFICANT_MOTION}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.SIGNIFICANT_MOTION
     */
    function on(type: SensorType.SENSOR_TYPE_ID_SIGNIFICANT_MOTION, callback: Callback<SignificantMotionResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_WEAR_DETECTION}.
     * @param options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.WEAR_DETECTION
     */
    function on(type: SensorType.SENSOR_TYPE_ID_WEAR_DETECTION, callback: Callback<WearDetectionResponse>,
        options?: Options): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_ACCELEROMETER}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.ACCELEROMETER
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.ACCELEROMETER
     */
    function once(type: SensorType.SENSOR_TYPE_ID_ACCELEROMETER, callback: Callback<AccelerometerResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_ACCELEROMETER_UNCALIBRATED}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.ACCELEROMETER
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.ACCELEROMETER_UNCALIBRATED
     */
    function once(type: SensorType.SENSOR_TYPE_ID_ACCELEROMETER_UNCALIBRATED, callback: Callback<AccelerometerUncalibratedResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_AMBIENT_LIGHT}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.AMBIENT_LIGHT
     */
    function once(type: SensorType.SENSOR_TYPE_ID_AMBIENT_LIGHT, callback: Callback<LightResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_AMBIENT_TEMPERATURE}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.AMBIENT_TEMPERATURE
     */
    function once(type: SensorType.SENSOR_TYPE_ID_AMBIENT_TEMPERATURE, callback: Callback<AmbientTemperatureResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_BAROMETER}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.BAROMETER
     */
    function once(type: SensorType.SENSOR_TYPE_ID_BAROMETER, callback: Callback<BarometerResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_GRAVITY}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.GRAVITY
     */
    function once(type: SensorType.SENSOR_TYPE_ID_GRAVITY, callback: Callback<GravityResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_GYROSCOPE}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.GYROSCOPE
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.GYROSCOPE
     */
    function once(type: SensorType.SENSOR_TYPE_ID_GYROSCOPE, callback: Callback<GyroscopeResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_GYROSCOPE_UNCALIBRATED}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.GYROSCOPE
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.GYROSCOPE_UNCALIBRATED
     */
    function once(type: SensorType.SENSOR_TYPE_ID_GYROSCOPE_UNCALIBRATED, callback: Callback<GyroscopeUncalibratedResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_HALL}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.HALL
     */
    function once(type: SensorType.SENSOR_TYPE_ID_HALL, callback: Callback<HallResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_HEART_RATE}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.HEART_RATE
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.HEART_RATE
     */
    function once(type: SensorType.SENSOR_TYPE_ID_HEART_RATE, callback: Callback<HeartRateResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_HUMIDITY}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.HUMIDITY
     */
    function once(type: SensorType.SENSOR_TYPE_ID_HUMIDITY, callback: Callback<HumidityResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_LINEAR_ACCELERATION}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.ACCELERATION
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.LINEAR_ACCELEROMETER
     */
    function once(type: SensorType.SENSOR_TYPE_ID_LINEAR_ACCELERATION, callback: Callback<LinearAccelerometerResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.MAGNETIC_FIELD
     */
    function once(type: SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD, callback: Callback<MagneticFieldResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD_UNCALIBRATED}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.MAGNETIC_FIELD_UNCALIBRATED
     */
    function once(type: SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD_UNCALIBRATED, callback: Callback<MagneticFieldUncalibratedResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_ORIENTATION}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.ORIENTATION
     */
    function once(type: SensorType.SENSOR_TYPE_ID_ORIENTATION, callback: Callback<OrientationResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_PEDOMETER}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.ACTIVITY_MOTION
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.PEDOMETER
     */
    function once(type: SensorType.SENSOR_TYPE_ID_PEDOMETER, callback: Callback<PedometerResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_PEDOMETER_DETECTION}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.ACTIVITY_MOTION
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.PEDOMETER_DETECTION
     */
    function once(type: SensorType.SENSOR_TYPE_ID_PEDOMETER_DETECTION, callback: Callback<PedometerDetectionResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_PROXIMITY}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.PROXIMITY
     */
    function once(type: SensorType.SENSOR_TYPE_ID_PROXIMITY, callback: Callback<ProximityResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_ROTATION_VECTOR}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.ROTATION_VECTOR
     */
    function once(type: SensorType.SENSOR_TYPE_ID_ROTATION_VECTOR, callback: Callback<RotationVectorResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_SIGNIFICANT_MOTION}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.SIGNIFICANT_MOTION
     */
    function once(type: SensorType.SENSOR_TYPE_ID_SIGNIFICANT_MOTION, callback: Callback<SignificantMotionResponse>): void;

    /**
     * Subscribe to sensor data once.
     * @param type Indicate the sensor type to listen for, {@code SensorType.SENSOR_TYPE_ID_WEAR_DETECTION}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.WEAR_DETECTION
     */
    function once(type: SensorType.SENSOR_TYPE_ID_WEAR_DETECTION, callback: Callback<WearDetectionResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_ACCELEROMETER}.
     * @permission ohos.permission.ACCELEROMETER
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.ACCELEROMETER
     */
     function off(type: SensorType.SENSOR_TYPE_ID_ACCELEROMETER, callback?: Callback<AccelerometerResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_ACCELEROMETER_UNCALIBRATED}.
     * @permission ohos.permission.ACCELEROMETER
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.ACCELEROMETER_UNCALIBRATED
     */
    function off(type: SensorType.SENSOR_TYPE_ID_ACCELEROMETER_UNCALIBRATED,
        callback?: Callback<AccelerometerUncalibratedResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_AMBIENT_LIGHT}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.AMBIENT_LIGHT
     */
    function off(type: SensorType.SENSOR_TYPE_ID_AMBIENT_LIGHT, callback?: Callback<LightResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_AMBIENT_TEMPERATURE}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.AMBIENT_TEMPERATURE
     */
    function off(type: SensorType.SENSOR_TYPE_ID_AMBIENT_TEMPERATURE, callback?: Callback<AmbientTemperatureResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_BAROMETER}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.BAROMETER
     */
    function off(type: SensorType.SENSOR_TYPE_ID_BAROMETER, callback?: Callback<BarometerResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_GRAVITY}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.GRAVITY
     */
    function off(type: SensorType.SENSOR_TYPE_ID_GRAVITY, callback?: Callback<GravityResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_GYROSCOPE}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.GYROSCOPE
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.GYROSCOPE
     */
    function off(type: SensorType.SENSOR_TYPE_ID_GYROSCOPE, callback?: Callback<GyroscopeResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_GYROSCOPE_UNCALIBRATED}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.GYROSCOPE
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.GYROSCOPE_UNCALIBRATED
     */
    function off(type: SensorType.SENSOR_TYPE_ID_GYROSCOPE_UNCALIBRATED, callback?: Callback<GyroscopeUncalibratedResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_HALL}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.HALL
     */
    function off(type: SensorType.SENSOR_TYPE_ID_HALL, callback?: Callback<HallResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_HEART_RATE}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.HEALTH_DATA
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.HEART_RATE
     */
    function off(type: SensorType.SENSOR_TYPE_ID_HEART_RATE, callback?: Callback<HeartRateResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_HUMIDITY}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.HUMIDITY
     */
    function off(type: SensorType.SENSOR_TYPE_ID_HUMIDITY, callback?: Callback<HumidityResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_LINEAR_ACCELERATION}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.ACCELEROMETER
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.LINEAR_ACCELEROMETER
     */
    function off(type: SensorType.SENSOR_TYPE_ID_LINEAR_ACCELERATION, callback?: Callback<LinearAccelerometerResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.MAGNETIC_FIELD
     */
    function off(type: SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD, callback?: Callback<MagneticFieldResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD_UNCALIBRATED}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.MAGNETIC_FIELD_UNCALIBRATED
     */
    function off(type: SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD_UNCALIBRATED, callback?: Callback<MagneticFieldUncalibratedResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_ORIENTATION}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.ORIENTATION
     */
    function off(type: SensorType.SENSOR_TYPE_ID_ORIENTATION, callback?: Callback<OrientationResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_PEDOMETER}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.ACTIVITY_MOTION
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.PEDOMETER
     */
    function off(type: SensorType.SENSOR_TYPE_ID_PEDOMETER, callback?: Callback<PedometerResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_PEDOMETER_DETECTION}.
     * @syscap SystemCapability.Sensors.Sensor
     * @permission ohos.permission.ACTIVITY_MOTION
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.PEDOMETER_DETECTION
     */
    function off(type: SensorType.SENSOR_TYPE_ID_PEDOMETER_DETECTION, callback?: Callback<PedometerDetectionResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_PROXIMITY}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.PROXIMITY
     */
    function off(type: SensorType.SENSOR_TYPE_ID_PROXIMITY, callback?: Callback<ProximityResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_ROTATION_VECTOR}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.ROTATION_VECTOR
     */
    function off(type: SensorType.SENSOR_TYPE_ID_ROTATION_VECTOR, callback?: Callback<RotationVectorResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_SIGNIFICANT_MOTION}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.SIGNIFICANT_MOTION
     */
    function off(type: SensorType.SENSOR_TYPE_ID_SIGNIFICANT_MOTION, callback?: Callback<SignificantMotionResponse>): void;

    /**
     * Unsubscribe to sensor data.
     * @param type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_WEAR_DETECTION}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#event:SensorId.WEAR_DETECTION
     */
    function off(type: SensorType.SENSOR_TYPE_ID_WEAR_DETECTION, callback?: Callback<WearDetectionResponse>): void;

    /**
     * Indicates sensor information.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    interface Sensor {
        sensorName:string; /**< Sensor name */
        vendorName:string; /**< Sensor vendor */
        firmwareVersion:string; /**< Sensor firmware version */
        hardwareVersion:string; /**< Sensor hardware version */
        sensorId:number; /**< Sensor type ID, {@code SensorType} */
        maxRange:number; /**< Maximum measurement range of the sensor */
        minSamplePeriod:number; /**< Minimum sample period allowed, in ns */
        maxSamplePeriod:number; /**< maximum sample period allowed, in ns */
        precision:number; /**< Sensor accuracy */
        power:number; /**< Sensor power */
    }

    /**
     * Obtains the sensor information of a specified type.
     * @param type Indicate the sensor type, {@code SensorId}.
     * @param { AsyncCallback<Sensor> } callback - callback sensor info.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getSingleSensor(type: SensorId, callback: AsyncCallback<Sensor>): void;

    /**
     * Obtains the sensor information of a specified type.
     * @param type Indicate the sensor type, {@code SensorId}.
     * @returns { Promise<Sensor> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getSingleSensor(type: SensorId): Promise<Sensor>;

    /**
     * Obtains all sensor information on the device.
     * @param type Indicate the sensor type, {@code SensorId}.
     * @param { AsyncCallback<Array<Sensor>> } callback - callback sensor list.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getSensorList(callback: AsyncCallback<Array<Sensor>>): void;

    /**
     * Obtains all sensor information on the device.
     * @param type Indicate the sensor type, {@code SensorId}.
     * @returns { Promise<Array<Sensor>> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getSensorList(): Promise<Array<Sensor>>;

    /**
     * Indicates geomagnetic field data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface GeomagneticResponse {
        x: number;
        y: number;
        z: number;
        geomagneticDip: number;
        deflectionAngle: number;
        levelIntensity: number;
        totalIntensity: number;
    }

    /**
     * Indicates geographic location.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface LocationOptions {
        latitude: number;
        longitude: number;
        altitude: number;
    }

   /**
     * Implements the calculation of the geomagnetic field at a specific location on Earth.
     *
     * @param LocationOptions Indicates geographic location, {@code LocationOptions}.
     * @param timeMillis Indicates the time at which the magnetic declination is to be obtained, in milliseconds
     * since the Unix epoch.
     * @returns Returns the geomagnetic field data, {@code GeomagneticResponse}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getGeomagneticInfo
     */
    function getGeomagneticField(locationOptions: LocationOptions, timeMillis: number, callback: AsyncCallback<GeomagneticResponse>): void;
    function getGeomagneticField(locationOptions: LocationOptions, timeMillis: number): Promise<GeomagneticResponse>;

    /**
     * Obtains the geomagnetic field at a specific location on the Earth.
     * @param LocationOptions Indicates geographic location, {@code LocationOptions}.
     * @param timeMillis Indicates the time at which the magnetic declination is to be obtained, in milliseconds
     * since the Unix epoch.
     * @param { AsyncCallback<GeomagneticResponse> } callback - callback geomagnetic field.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getGeomagneticInfo(locationOptions: LocationOptions, timeMillis: number, callback: AsyncCallback<GeomagneticResponse>): void;

    /**
     * Obtains the geomagnetic field at a specific location on the Earth.
     * @param LocationOptions Indicates geographic location, {@code LocationOptions}.
     * @param timeMillis Indicates the time at which the magnetic declination is to be obtained, in milliseconds
     * since the Unix epoch.
     * @returns { Promise<GeomagneticResponse> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getGeomagneticInfo(locationOptions: LocationOptions, timeMillis: number): Promise<GeomagneticResponse>;

   /**
     * Obtains the altitude at which the device is located based on the current atmospheric pressure.
     *
     * @param seaPressure Indicates the sea level pressure, in hPa.
     * @param currentPressure Indicates the atmospheric pressure measured by the barometer, in hPa.
     * @returns Returns the altitude in meters at which the device is located.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getDeviceAltitude
     */
    function getAltitude(seaPressure: number, currentPressure: number, callback: AsyncCallback<number>): void;
    function getAltitude(seaPressure: number, currentPressure: number): Promise<number>;

    /**
     * Obtains the altitude at which the device is located based on the current atmospheric pressure.
     * @param seaPressure Indicates the sea level pressure, in hPa.
     * @param currentPressure Indicates the atmospheric pressure measured by the barometer, in hPa.
     * @param { AsyncCallback<number> } callback - callback device altitude.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getDeviceAltitude(seaPressure: number, currentPressure: number, callback: AsyncCallback<number>): void;

    /**
     * Obtains the altitude at which the device is located based on the current atmospheric pressure.
     * @param seaPressure Indicates the sea level pressure, in hPa.
     * @param currentPressure Indicates the atmospheric pressure measured by the barometer, in hPa.
     * @returns { Promise<number> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getDeviceAltitude(seaPressure: number, currentPressure: number): Promise<number>;

    /**
     * Computes the geomagnetic inclination angle in radians from the inclination matrix.
     *
     * @param inclinationMatrix Indicates the inclination matrix.
     * @returns Returns the geomagnetic inclination angle in radians.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getInclination
     */
    function getGeomagneticDip(inclinationMatrix: Array<number>, callback: AsyncCallback<number>): void;
    function getGeomagneticDip(inclinationMatrix: Array<number>): Promise<number>;

    /**
     * Computes the geomagnetic inclination in radians from the inclination matrix.
     * @param inclinationMatrix Indicates the inclination matrix.
     * @param { AsyncCallback<number> } callback - callback inclination in radians.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getInclination(inclinationMatrix: Array<number>, callback: AsyncCallback<number>): void;

    /**
     * Computes the geomagnetic inclination in radians from the inclination matrix.
     * @param inclinationMatrix Indicates the inclination matrix.
     * @returns { Promise<number> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getInclination(inclinationMatrix: Array<number>): Promise<number>;

    /**
     * Get the angle change between two rotation matrices
     *
     * @param currentRotationMatrix Indicates the current rotation matrix.
     * @param preRotationMatrix Indicates the current rotation matrix.
     * @returns Returns the array of number(z, x and y) in which the angle variety.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getAngleVariation
     */
    function getAngleModify(currentRotationMatrix: Array<number>, preRotationMatrix: Array<number>,
        callback: AsyncCallback<Array<number>>): void;
    function getAngleModify(currentRotationMatrix: Array<number>, preRotationMatrix: Array<number>): Promise<Array<number>>;

    /**
     * Get the angle variation between two rotation matrices.
     * @param currentRotationMatrix Indicates the current rotation matrix.
     * @param preRotationMatrix Indicates the current rotation matrix.
     * @param { AsyncCallback<Array<number>> } callback - callback angle variation.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getAngleVariation(currentRotationMatrix: Array<number>, preRotationMatrix: Array<number>,
        callback: AsyncCallback<Array<number>>): void;

    /**
     * Get the angle variation between two rotation matrices.
     * @param currentRotationMatrix Indicates the current rotation matrix.
     * @param preRotationMatrix Indicates the current rotation matrix.
     * @returns { Promise<Array<number>> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getAngleVariation(currentRotationMatrix: Array<number>, preRotationMatrix: Array<number>): Promise<Array<number>>;

    /**
     * Convert rotation vector to rotation matrix.
     *
     * @param rotationVector Indicates the rotation vector.
     * @returns Returns the rotation matrix.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getRotationMatrix
     */
    function createRotationMatrix(rotationVector: Array<number>, callback: AsyncCallback<Array<number>>): void;
    function createRotationMatrix(rotationVector: Array<number>): Promise<Array<number>>;

    /**
     * Convert rotation vector to rotation matrix.
     * @param rotationVector Indicates the rotation vector.
     * @param { AsyncCallback<Array<number>> } callback - callback rotation matrix.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getRotationMatrix(rotationVector: Array<number>, callback: AsyncCallback<Array<number>>): void;

    /**
     * Convert rotation vector to rotation matrix.
     * @param rotationVector Indicates the rotation vector.
     * @returns { Promise<Array<number>> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getRotationMatrix(rotationVector: Array<number>): Promise<Array<number>>;

    /**
     * Indicates the axis of the new coordinate system that coincides with the XY axis of the
     * original coordinate system.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface CoordinatesOptions {
        /** Indicates the axis of the new coordinate system that coincides with the X axis of
         * the original coordinate system. 
         */
        x: number;
        /** Indicates the axis of the new coordinate system that coincides with the Z axis of
         * the original coordinate system. 
         */
        y: number;
    }

    /**
     * Rotate the provided rotation matrix so that it can be represented in a different way
     * Coordinate System
     * @param inRotationVector Indicates the rotation matrix to be transformed.
     * @param coordinates Indicates coordinate system guidance, {@code CoordinatesOptions}.
     * @returns Returns the transformed rotation matrix.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#transformRotationMatrix
     */
    function transformCoordinateSystem(inRotationVector: Array<number>, coordinates: CoordinatesOptions,
        callback: AsyncCallback<Array<number>>): void;
    function transformCoordinateSystem(inRotationVector: Array<number>, coordinates: CoordinatesOptions): Promise<Array<number>>;

    /**
     * Rotate the provided rotation matrix so that it can be represented in a different way coordinate System.
     * @param inRotationVector Indicates the rotation matrix to be transformed.
     * @param coordinates Indicates coordinate system guidance, {@code CoordinatesOptions}.
     * @param { AsyncCallback<Array<number>> } callback - callback rotation matrix.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function transformRotationMatrix(inRotationVector: Array<number>, coordinates: CoordinatesOptions,
        callback: AsyncCallback<Array<number>>): void;

    /**
     * Rotate the provided rotation matrix so that it can be represented in a different way coordinate System.
     * @param inRotationVector Indicates the rotation matrix to be transformed.
     * @param coordinates Indicates coordinate system guidance, {@code CoordinatesOptions}.
     * @returns { Promise<Array<number>> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function transformRotationMatrix(inRotationVector: Array<number>, coordinates: CoordinatesOptions): Promise<Array<number>>;

    /**
     * convert a rotation vector to a normalized quaternion.
     *
     * @param rotationVector Indicates the rotation vector.
     * @returns Returns the normalized quaternion.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getQuaternion
     */
    function createQuaternion(rotationVector: Array<number>, callback: AsyncCallback<Array<number>>): void;
    function createQuaternion(rotationVector: Array<number>): Promise<Array<number>>;

    /**
     * convert a rotation vector to a normalized quaternion.
     * @param rotationVector Indicates the rotation vector.
     * @param { AsyncCallback<Array<number>> } callback - callback a normalized quaternion.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getQuaternion(rotationVector: Array<number>, callback: AsyncCallback<Array<number>>): void;

    /**
     * convert a rotation vector to a normalized quaternion.
     * @param rotationVector Indicates the rotation vector.
     * @returns { Promise<Array<number>> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getQuaternion(rotationVector: Array<number>): Promise<Array<number>>;

    /**
     * Computes the device's orientation based on the rotation matrix.
     *
     * @param rotationMatrix Indicates the rotation matrix.
     * @returns Returns the array is the angle of rotation around the z, x, y axis.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getOrientation
     */
    function getDirection(rotationMatrix: Array<number>, callback: AsyncCallback<Array<number>>): void;
    function getDirection(rotationMatrix: Array<number>): Promise<Array<number>>;

    /**
     * Computes the device's orientation based on the rotation matrix.
     * @param rotationMatrix Indicates the rotation matrix.
     * @param { AsyncCallback<Array<number>> } callback - callback the angle of rotation around the z, x, y axis.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getOrientation(rotationMatrix: Array<number>, callback: AsyncCallback<Array<number>>): void;

    /**
     * Computes the device's orientation based on the rotation matrix.
     * @param rotationMatrix Indicates the rotation matrix.
     * @returns { Promise<Array<number>> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getOrientation(rotationMatrix: Array<number>): Promise<Array<number>>;

    /**
     * Indicates the response of rotation matrix.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface RotationMatrixResponse {
        rotation: Array<number>;
        inclination: Array<number>
    }

    /**
     * Calculate rotation matrix based on gravity vector and geomagnetic vector.
     *
     * @param gravity Indicates the gravity vector.
     * @param geomagnetic Indicates the geomagnetic vector.
     * @returns Returns the rotation matrix, {@code RotationMatrixResponse}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getRotationMatrix
     */
    function createRotationMatrix(gravity: Array<number>, geomagnetic: Array<number>, callback: AsyncCallback<RotationMatrixResponse>): void;
    function createRotationMatrix(gravity: Array<number>, geomagnetic: Array<number>,): Promise<RotationMatrixResponse>;

    /**
     * Calculate rotation matrix based on gravity vector and geomagnetic vector.
     * @param gravity Indicates the gravity vector.
     * @param geomagnetic Indicates the geomagnetic vector.
     * @param { AsyncCallback<Array<RotationMatrixResponse>> } callback - callback rotation matrix and inclination matrix.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
     function getRotationMatrix(gravity: Array<number>, geomagnetic: Array<number>, callback: AsyncCallback<RotationMatrixResponse>): void;

    /**
     * Calculate rotation matrix based on gravity vector and geomagnetic vector.
     * @param gravity Indicates the gravity vector.
     * @param geomagnetic Indicates the geomagnetic vector.
     * @returns { Promise<RotationMatrixResponse> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
     function getRotationMatrix(gravity: Array<number>, geomagnetic: Array<number>): Promise<RotationMatrixResponse>;

    /**
     * Subscribe to the sensor's optional parameters.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface Options {
        interval?: number; /**< Sensor event reporting event interval */
    }

    /**
     * The type of number.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId
     */
    enum SensorType {
        SENSOR_TYPE_ID_ACCELEROMETER = 1,          /**< Acceleration sensor */
        SENSOR_TYPE_ID_GYROSCOPE = 2,              /**< Gyroscope sensor */
        SENSOR_TYPE_ID_AMBIENT_LIGHT = 5,          /**< Ambient light sensor */
        SENSOR_TYPE_ID_MAGNETIC_FIELD = 6,         /**< Magnetic field sensor */
        SENSOR_TYPE_ID_BAROMETER = 8,              /**< Barometric pressure sensor */
        SENSOR_TYPE_ID_HALL = 10,                  /**< Hall effect sensor */
        SENSOR_TYPE_ID_PROXIMITY = 12,             /**< Proximity sensor */
        SENSOR_TYPE_ID_HUMIDITY = 13,              /**< Humidity sensor */
        SENSOR_TYPE_ID_ORIENTATION = 256,          /**< Orientation sensor */
        SENSOR_TYPE_ID_GRAVITY = 257,              /**< Gravity sensor */
        SENSOR_TYPE_ID_LINEAR_ACCELERATION = 258,  /**< Linear acceleration sensor */
        SENSOR_TYPE_ID_ROTATION_VECTOR = 259,      /**< Rotation vector sensor */
        SENSOR_TYPE_ID_AMBIENT_TEMPERATURE = 260,  /**< Ambient temperature sensor */
        SENSOR_TYPE_ID_MAGNETIC_FIELD_UNCALIBRATED = 261,  /**< Uncalibrated magnetic field sensor */
        SENSOR_TYPE_ID_GYROSCOPE_UNCALIBRATED = 263,  /**< Uncalibrated gyroscope sensor */
        SENSOR_TYPE_ID_SIGNIFICANT_MOTION = 264,    /**< Significant motion sensor */
        SENSOR_TYPE_ID_PEDOMETER_DETECTION = 265,   /**< Pedometer detection sensor */
        SENSOR_TYPE_ID_PEDOMETER = 266,             /**< Pedometer sensor */
        SENSOR_TYPE_ID_HEART_RATE = 278,            /**< Heart rate sensor */
        SENSOR_TYPE_ID_WEAR_DETECTION = 280,        /**< Wear detection sensor */
        SENSOR_TYPE_ID_ACCELEROMETER_UNCALIBRATED = 281   /**< Uncalibrated acceleration sensor */
    }

    /**
     * The basic data structure of the sensor event.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface Response {
        timestamp: number; /**< The timestamp of the reported sensor data */
    }

    /**
     * Acceleration sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface AccelerometerResponse extends Response {
        x: number; /**< Acceleration x-axis component */
        y: number; /**< Acceleration y-axis component */
        z: number; /**< Acceleration z-axis component */
    }

    /**
     * Linear acceleration sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface LinearAccelerometerResponse extends Response{
        x: number; /**< Linear acceleration x-axis component */
        y: number; /**< Linear acceleration y-axis component */
        z: number; /**< Linear acceleration z-axis component */
    }

    /**
     * Acceleration uncalibrated sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface AccelerometerUncalibratedResponse extends Response {
        x: number; /**< Acceleration uncalibrated x-axis component */
        y: number; /**< Acceleration uncalibrated y-axis component */
        z: number; /**< Acceleration uncalibrated z-axis component */
        biasX: number; /**< Acceleration uncalibrated x-axis offset */
        biasY: number; /**< Acceleration uncalibrated y-axis offset */
        biasZ: number; /**< Acceleration uncalibrated z-axis offset */
    }

    /**
     * Gravity sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface GravityResponse extends Response {
        x: number; /**< Gravity x-axis component */
        y: number; /**< Gravity y-axis component */
        z: number; /**< Gravity z-axis component */
    }

    /**
     * Orientation sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface OrientationResponse extends Response {
        alpha: number; /**< The device rotates at an angle around the Z axis */
        beta: number; /**< The device rotates at an angle around the X axis */
        gamma: number; /**< The device rotates at an angle around the Y axis */
    }

    /**
     * Rotation vector sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface RotationVectorResponse extends Response {
        x: number; /**< Rotation vector x-axis component */
        y: number; /**< Rotation vector y-axis component */
        z: number; /**< Rotation vector z-axis component */
        w: number; /**< Scalar quantity */
    }

    /**
     * Gyroscope sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface GyroscopeResponse extends Response {
        x: number; /**< Gyroscope x-axis component */
        y: number; /**< Gyroscope y-axis component */
        z: number; /**< Gyroscope z-axis component */
    }

    /**
     * Gyroscope uncalibrated sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface GyroscopeUncalibratedResponse extends Response {
        x: number; /**< Gyroscope uncalibrated x-axis component */
        y: number; /**< Gyroscope uncalibrated y-axis component */
        z: number; /**< Gyroscope uncalibrated z-axis component */
        biasX: number; /**< Gyroscope uncalibrated x-axis offset */
        biasY: number; /**< Gyroscope uncalibrated y-axis offset */
        biasZ: number; /**< Gyroscope uncalibrated z-axis offset */
    }

    /**
     * Significant motion sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface SignificantMotionResponse extends Response {
        scalar: number; /**< The degree of significant motion */
    }

    /**
     * Proximity sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface ProximityResponse extends Response {
        distance: number; /**< Indicates the degree of proximity, event 0 indicates proximity, and greater than 0 indicates distance */
    }

    /**
     * Light sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface LightResponse extends Response {
        intensity: number; /**< Indicates light intensity, in lux */
    }

    /**
     * Hall sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface HallResponse extends Response {
        status: number; /**< Indicates hall status, 0 indicates open, and greater than 0 indicates suction */
    }

    /**
     * Magnetic field sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface MagneticFieldResponse extends Response {
        x: number; /**< Magnetic field x-axis component */
        y: number; /**< Magnetic field y-axis component */
        z: number; /**< Magnetic field z-axis component */
    }

    /**
     * Magnetic field uncalibrated sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface MagneticFieldUncalibratedResponse extends Response {
        x: number; /**< Magnetic field uncalibrated x-axis component */
        y: number; /**< Magnetic field uncalibrated y-axis component */
        z: number; /**< Magnetic field uncalibrated z-axis component */
        biasX: number; /**< Magnetic field uncalibrated x-axis offset */
        biasY: number; /**< Magnetic field uncalibrated y-axis offset */
        biasZ: number; /**< Magnetic field uncalibrated z-axis offset */
    }

    /**
     * Pedometer sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface PedometerResponse extends Response {
        steps: number; /**< Indicates the number of steps */
    }

    /**
     * Humidity sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface HumidityResponse extends Response {
        humidity: number; /**< Indicates the number of humidity */
    }

    /**
     * Pedometer detection sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface PedometerDetectionResponse extends Response {
        scalar: number; /**< Indicates the pedometer detection status, 1 indicates that a walking action has occurred, and 0 indicates that no movement has occurred */
    }

    /**
     * Ambient temperature sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface AmbientTemperatureResponse extends Response {
        temperature: number; /**< Indicates ambient temperature, in celsius */
    }

    /**
     * Barometer sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface BarometerResponse extends Response {
        pressure: number; /**< Indicates the number of barometer, in pascal */
    }

    /**
     * Heart rate sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface HeartRateResponse extends Response {
        heartRate: number; /**< Indicates the number of heart rate */
    }

    /**
     * Wear detection sensor event data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface WearDetectionResponse extends Response {
        value: number; /**< Indicates the status of wear detection, 1 for wearing, 0 for wearing not */
    }
 }

 export default sensor;