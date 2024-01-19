/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import sensor from '@ohos.sensor'

import {describe, beforeAll, beforeEach, afterEach, afterAll, it, expect} from 'deccjsunit/index'

describe("SensorJsTest", function () {
    function callback(data) {
        console.info("callback" + JSON.stringify(data));
        expect(typeof(data.x)).assertEqual("number");
    }

    function callback2() {
        console.info("callback2" + JSON.stringify(data));
        expect(typeof(data.x)).assertEqual("number");
    }

    beforeAll(function() {
        /*
         * @tc.setup: setup invoked before all testcases
         */
         console.info('beforeAll caled')
    })
    
    afterAll(function() {
        /*
         * @tc.teardown: teardown invoked after all testcases
         */
         console.info('afterAll caled')
    })
    
    beforeEach(function() {
        /*
         * @tc.setup: setup invoked before each testcases
         */
         console.info('beforeEach caled')
    })
    
    afterEach(function() {
        /*
         * @tc.teardown: teardown invoked after each testcases
         */
         console.info('afterEach caled')
    })

    const PARAMETER_ERROR_CODE = 401
    const SERVICE_EXCEPTION_CODE = 14500101
    const PARAMETER_ERROR_MSG = 'The parameter invalid.'
    const SERVICE_EXCEPTION_MSG = 'Service exception.'

    /*
     * @tc.name:SensorJsTest_001
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("SensorJsTest_001", 0, async function (done) {
        console.info('----------------------SensorJsTest_001---------------------------');
        sensor.on(sensor.SensorId.ACCELEROMETER, callback);
        setTimeout(()=>{
            sensor.off(sensor.SensorId.ACCELEROMETER);
            done();
        }, 500);
    })

    /*
     * @tc.name:SensorJsTest_002
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("SensorJsTest_002", 0, async function (done) {
        console.info('----------------------SensorJsTest_002---------------------------');
        function onSensorCallback(data) {
            console.info('SensorJsTest002 callback in');
            expect(false).assertTrue();
            done();
        }
        try {
            sensor.on(-1, onSensorCallback);
        } catch (error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
    })

    /*
     * @tc.name:SensorJsTest_003
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("SensorJsTest_003", 0, async function (done) {
        console.info('----------------------SensorJsTest003---------------------------');
        sensor.on(sensor.SensorId.ACCELEROMETER, callback, {'interval': 100000000});
        setTimeout(()=>{
            console.info('----------------------SensorJsTest_003 off in---------------------------');
            sensor.off(sensor.SensorId.ACCELEROMETER);
            console.info('----------------------SensorJsTest_003 off end---------------------------');
            done();
        }, 500);
    })

    /*
     * @tc.name:SensorJsTest_004
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("SensorJsTest_004", 0, function (done) {
        console.info('----------------------SensorJsTest_004---------------------------');
        function onSensorCallback(data) {
            console.info('SensorJsTest004  callback in');
            expect(true).assertTrue();
            done();
        }
        try {
            sensor.on(sensor.SensorId.ACCELEROMETER, onSensorCallback, {'interval': 100000000}, 5);
        } catch (error) {
            console.info(error);
            expect(false).assertTrue();
            done();
        }
        setTimeout(()=>{
            console.info('----------------------SensorJsTest_004 off in---------------------------');
            sensor.off(sensor.SensorId.ACCELEROMETER);
            console.info('----------------------SensorJsTest_004 off end---------------------------');
            done();
        }, 500);
    })

    /*
     * @tc.name:SensorJsTest_005
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("SensorJsTest_005", 0, async function (done) {
        sensor.once(sensor.SensorId.ACCELEROMETER, callback);
        setTimeout(()=>{
            expect(true).assertTrue();
            done();
        }, 500);
    })

    /*
     * @tc.name:SensorJsTest_006
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("SensorJsTest_006", 0, async function (done) {
        function onceSensorCallback(data) {
            console.info('SensorJsTest_006 callback in');
            expect(false).assertTrue();
            done();
        }
        try {
            sensor.once(-1, onceSensorCallback);
        } catch (error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
    })

    /*
     * @tc.name:SensorJsTest_007
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("SensorJsTest_007", 0, function (done) {
        function onceSensorCallback(data) {
            console.info('SensorJsTest007  on error');
            expect(true).assertTrue();
            done();
        }
        try{
            sensor.once(sensor.SensorId.ACCELEROMETER, onceSensorCallback, 5);
        } catch (error) {
            console.info(error);
            expect(false).assertTrue();
            done();
        }
    })

    /*
     * @tc.name:SensorJsTest_008
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("SensorJsTest_008", 0, async function (done) {
        try {
            sensor.off(-1, callback);
        } catch (error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG)
            done();
        }
    })

    /*
     * @tc.name:SensorJsTest_009
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("SensorJsTest_009", 0, async function (done) {
        function onSensorCallback(data) {
            console.info('SensorJsTest_009 callback in');
            expect(false).assertTrue();
            done();
        }
        sensor.on(sensor.SensorId.ACCELEROMETER, onSensorCallback);
        sensor.off(sensor.SensorId.ACCELEROMETER, onSensorCallback);
        setTimeout(()=>{
            expect(true).assertTrue();
            done();
        }, 500);
    })

    /*
     * @tc.name:SensorJsTest_010
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("SensorJsTest_010", 0, async function (done) {
        function onSensorCallback(data) {
            console.info('SensorJsTest010  on error');
            expect(false).assertTrue();
            done();
        }
        try {
            sensor.off(1000000, onSensorCallback);
        } catch (error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG)
            done();
        }
    })

    /*
     * @tc.name:SensorJsTest_011
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("SensorJsTest_011", 0, async function (done) {
        sensor.on(sensor.SensorId.ACCELEROMETER, (data)=>{
            console.info("callback: " + JSON.stringify(data));
            expect(typeof(data.x)).assertEqual("number");
        });
        sensor.on(sensor.SensorId.ACCELEROMETER, (data)=>{
            console.info("callback2: " + JSON.stringify(data));
            expect(typeof(data.x)).assertEqual("number");
        });
        setTimeout(()=>{
            console.info('----------------------SensorJsTest_011 off in---------------------------');
            sensor.off(sensor.SensorId.ACCELEROMETER);
            console.info('----------------------SensorJsTest_011 off end---------------------------');
            done();
        }, 1000);
    })

    /*
     * @tc.name:SensorJsTest_012
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("SensorJsTest_012", 0, function (done) {
        try {
            sensor.off(sensor.SensorId.ACCELEROMETER, 5);
        } catch (error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG)
            done();
        }
    })

    /*
     * @tc.name:SensorJsTest_013
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("SensorJsTest_013", 0, async function (done) {
        console.info('----------------------SensorJsTest013---------------------------');
        sensor.on(sensor.SensorId.ACCELEROMETER, (data)=>{
            console.info("callback: " + JSON.stringify(data));
            expect(typeof(data.x)).assertEqual("number");
        }, {'interval': 100000000});
        sensor.once(sensor.SensorId.ACCELEROMETER, (data)=>{
            console.info("callback2: " + JSON.stringify(data));
            expect(typeof(data.x)).assertEqual("number");
        });
        setTimeout(()=>{
            console.info('----------------------SensorJsTest_013 off in---------------------------');
            sensor.off(sensor.SensorId.ACCELEROMETER);
            console.info('----------------------SensorJsTest_013 off end---------------------------');
            done();
        }, 1000);
    })

    /*
     * @tc.name:SensorJsTest_014
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("SensorJsTest_014", 0, async function (done) {
        console.info('----------------------SensorJsTest_014---------------------------');
        sensor.on(sensor.SensorId.ACCELEROMETER, (data)=>{
            console.info("callback: " + JSON.stringify(data));
            expect(typeof(data.x)).assertEqual("number");
        }, {'interval': 100000000});
        sensor.on(sensor.SensorId.ACCELEROMETER, (data)=>{
            console.info("callback2: " + JSON.stringify(data));
            expect(typeof(data.x)).assertEqual("number");
        }, {'interval': 100000000});
        setTimeout(()=>{
            console.info('----------------------SensorJsTest_014 off in---------------------------');
            sensor.off(sensor.SensorId.ACCELEROMETER);
            console.info('----------------------SensorJsTest_014 off end---------------------------');
            done();
        }, 1000);
    })

    /*
     * @tc.name:SensorJsTest_015
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("SensorJsTest_015", 0, async function (done) {
        console.info('----------------------SensorJsTest_015---------------------------');
        try {
            sensor.on();
        } catch (error) {
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
        try {
            sensor.once();
        } catch (error) {
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
        try {
            sensor.off();
        } catch (error) {
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
    })

    let GEOMAGNETIC_COMPONENT_YEAR_RESULT = [
        [6570.3935546875, -146.3289337158203, 54606.0078125, -1.2758207321166992, 83.13726043701172, 6572.02294921875, 55000.0703125],
        [6554.17041015625, -87.19947052001953, 54649.078125, -0.7622424364089966, 83.16046905517578, 6554.75048828125, 55040.7734375],
        [6537.99169921875, -28.231582641601562, 54692.02734375, -0.24740631878376007, 83.18303680419922, 6538.052734375, 55081.4296875],
        [6521.81201171875, 30.73670768737793, 54734.97265625, 0.2700277864933014, 83.20502471923828, 6521.88427734375, 55122.15625],
        [6505.6328125, 89.70511627197266, 54777.90625, 0.7899921536445618, 83.22642517089844, 6506.2509765625, 55162.9453125]]

    let GEOMAGNETIC_COMPONENT_COORDINATES_RESULT = [
        [6570.3935546875, -146.3289337158203, 54606.0078125, -1.2758207321166992, 83.13726043701172, 6572.02294921875, 55000.0703125],
        [39624.28125, 109.8766098022461, -10932.4638671875, 0.15887857973575592, -15.424291610717773, 39624.43359375, 41104.921875],
        [37636.72265625, 104.90892791748047, -10474.810546875, 0.15970633924007416, -15.552550315856934, 37636.8671875, 39067.3203125],
        [5940.583984375, 15772.0927734375, -52480.7578125, 69.36103820800781, -72.19599914550781, 16853.765625, 55120.58984375],
        [5744.87255859375, 14799.48046875, -49969.40234375, 68.78474426269531, -72.37483215332031, 15875.3955078125, 52430.61328125]]

    let GEOMAGNETIC_COORDINATES = [[80, 0, 0],
                                   [0, 120, 0],
                                   [0, 120, 100000],
                                   [-80, 240, 0],
                                   [-80, 240, 100000]]

    let timeMillis = [1580486400000, 1612108800000, 1643644800000, 1675180800000, 1706716800000]

     /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_001
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2U6
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_001', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_001----------------------------------");
        let  promiseArray = []
        for (let i = 0; i < timeMillis.length; i++) {
            promiseArray.push(new Promise((resolve, reject) => {
                let j = i
                sensor.getGeomagneticInfo({'latitude':80, 'longitude':0, 'altitude':0}, timeMillis[j], (error, data) => {
                    if (error) {
                        console.info('Sensor_GetGeomagneticField_001 failed');
                        expect(false).assertTrue();
                        setTimeout(() =>{
                            reject()
                        }, 500)
                    } else {
                        console.info('Sensor_GetGeomagneticField_001 success x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                        + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                        expect(data.x).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[j][0])
                        expect(data.y).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[j][1])
                        expect(data.z).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[j][2])
                        expect(data.deflectionAngle).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[j][3])
                        expect(data.geomagneticDip).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[j][4])
                        expect(data.levelIntensity).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[j][5])
                        expect(data.totalIntensity).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[j][6])
                        setTimeout(() =>{
                            resolve()
                        }, 500)
                    }
                })
            }))
        }
        Promise.all(promiseArray).then(done)
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_002
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2U6
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_002', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_002----------------------------------");
        let  promiseArray = []
        for (let i = 0; i < GEOMAGNETIC_COORDINATES.length; i++) {
            promiseArray.push(new Promise((resolve, reject) => {
                let j = i
                sensor.getGeomagneticInfo({'latitude':GEOMAGNETIC_COORDINATES[j][0], 'longitude':GEOMAGNETIC_COORDINATES[j][1], 'altitude':GEOMAGNETIC_COORDINATES[j][2]}, timeMillis[0], (error, data) => {
                    if (error) {
                        console.info('Sensor_GetGeomagneticField_002 failed');
                        expect(false).assertTrue();
                        setTimeout(() =>{
                            reject()
                        }, 500)
                    } else {
                        console.info('Sensor_GetGeomagneticField_002 success x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                        + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                        expect(data.x).assertEqual(GEOMAGNETIC_COMPONENT_COORDINATES_RESULT[j][0])
                        expect(data.y).assertEqual(GEOMAGNETIC_COMPONENT_COORDINATES_RESULT[j][1])
                        expect(data.z).assertEqual(GEOMAGNETIC_COMPONENT_COORDINATES_RESULT[j][2])
                        expect(data.deflectionAngle).assertEqual(GEOMAGNETIC_COMPONENT_COORDINATES_RESULT[j][3])
                        expect(data.geomagneticDip).assertEqual(GEOMAGNETIC_COMPONENT_COORDINATES_RESULT[j][4])
                        expect(data.levelIntensity).assertEqual(GEOMAGNETIC_COMPONENT_COORDINATES_RESULT[j][5])
                        expect(data.totalIntensity).assertEqual(GEOMAGNETIC_COMPONENT_COORDINATES_RESULT[j][6])
                        setTimeout(() =>{
                            resolve()
                        }, 500)
                    }
                })
            }))
        }
        Promise.all(promiseArray).then(done)
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_003
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2U6
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_003', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_003----------------------------------");
        let geomagneticComponent = [27779.234375, -6214.9794921875, -14924.6611328125,
            -27.667943954467773, -12.610970497131348, 28465.9765625, 32141.2109375]
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':0}, Number.MIN_VALUE, (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_003 failed');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_003 success x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(data.x).assertEqual(geomagneticComponent[0])
                expect(data.y).assertEqual(geomagneticComponent[1])
                expect(data.z).assertEqual(geomagneticComponent[2])
                expect(data.geomagneticDip).assertEqual(geomagneticComponent[3])
                expect(data.deflectionAngle).assertEqual(geomagneticComponent[4])
                expect(data.levelIntensity).assertEqual(geomagneticComponent[5])
                expect(data.totalIntensity).assertEqual(geomagneticComponent[6])
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_004
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2U6
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_004', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_004----------------------------------");
        let geomagneticComponent = [1824.141845703125, 116.58167266845703, 56727.7734375, 88.15447235107422, 3.6568238735198975, 1827.8634033203125, 56757.21484375]
        sensor.getGeomagneticInfo({'latitude':Number.MAX_VALUE, 'longitude':0, 'altitude':0}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_004 failed');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_004 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(data.x).assertEqual(geomagneticComponent[0])
                expect(data.y).assertEqual(geomagneticComponent[1])
                expect(data.z).assertEqual(geomagneticComponent[2])
                expect(data.geomagneticDip).assertEqual(geomagneticComponent[3])
                expect(data.deflectionAngle).assertEqual(geomagneticComponent[4])
                expect(data.levelIntensity).assertEqual(geomagneticComponent[5])
                expect(data.totalIntensity).assertEqual(geomagneticComponent[6])
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_005
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2U6
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_005', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_005----------------------------------");
        let geomagneticComponent = [1824.141845703125, 116.58167266845703, 56727.7734375, 88.15447235107422, 3.6568238735198975, 1827.8634033203125, 56757.21484375]
        sensor.getGeomagneticInfo({'latitude':Number.NaN, 'longitude':0, 'altitude':0}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_005 failed');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_005 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(data.x).assertEqual(geomagneticComponent[0])
                expect(data.y).assertEqual(geomagneticComponent[1])
                expect(data.z).assertEqual(geomagneticComponent[2])
                expect(data.geomagneticDip).assertEqual(geomagneticComponent[3])
                expect(data.deflectionAngle).assertEqual(geomagneticComponent[4])
                expect(data.levelIntensity).assertEqual(geomagneticComponent[5])
                expect(data.totalIntensity).assertEqual(geomagneticComponent[6])
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_006
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2U6
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_006', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_006----------------------------------");
        let geomagneticComponent = [14425.57421875, -17156.767578125, -52023.21484375, -66.69005584716797, -49.94255447387695, 22415.4375, 56646.859375]
        sensor.getGeomagneticInfo({'latitude':Number.NEGATIVE_INFINITY, 'longitude':0, 'altitude':0}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_006 failed');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_006 success x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(data.x).assertEqual(geomagneticComponent[0])
                expect(data.y).assertEqual(geomagneticComponent[1])
                expect(data.z).assertEqual(geomagneticComponent[2])
                expect(data.geomagneticDip).assertEqual(geomagneticComponent[3])
                expect(data.deflectionAngle).assertEqual(geomagneticComponent[4])
                expect(data.levelIntensity).assertEqual(geomagneticComponent[5])
                expect(data.totalIntensity).assertEqual(geomagneticComponent[6])
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_007
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2U6
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_007', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_007----------------------------------");
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':Number.MAX_VALUE, 'altitude':0}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_007 failed');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_007 success x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(Number.isNaN(data.x) && Number.isNaN(data.y) && Number.isNaN(data.z)).assertTrue();
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_008
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: SR000GH2A3
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_008', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_008----------------------------------");
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':Number.NaN, 'altitude':0}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_008 failed');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_008 success x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(Number.isNaN(data.x) && Number.isNaN(data.y) && Number.isNaN(data.z)).assertTrue()
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_009
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: SR000GH2A3
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_009', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_009----------------------------------");
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':Number.NEGATIVE_INFINITY, 'altitude':0}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_009 failed');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_009 success x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(Number.isNaN(data.x) && Number.isNaN(data.y) && Number.isNaN(data.z)).assertTrue()
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_010
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: SR000GH2A3
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_010', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_010----------------------------------");
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.MAX_VALUE}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_010 failed');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_010 success x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(Number.isNaN(data.x) && Number.isNaN(data.y) && Number.isNaN(data.z)).assertTrue()
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_011
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: SR000GH2A4
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_011', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_011----------------------------------");
        let geomagneticComponent = [27536.40234375, -2248.586669921875, -16022.4306640625, -30.110872268676758, -4.66834020614624, 27628.05859375, 31937.875]
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.MIN_VALUE}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_011 failed');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_011 success x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(data.x).assertEqual(geomagneticComponent[0])
                expect(data.y).assertEqual(geomagneticComponent[1])
                expect(data.z).assertEqual(geomagneticComponent[2])
                expect(data.geomagneticDip).assertEqual(geomagneticComponent[3])
                expect(data.deflectionAngle).assertEqual(geomagneticComponent[4])
                expect(data.levelIntensity).assertEqual(geomagneticComponent[5])
                expect(data.totalIntensity).assertEqual(geomagneticComponent[6])
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_012
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: SR000GH2A4
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_012', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_012----------------------------------");
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.NaN}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_012 failed');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_012 success x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(Number.isNaN(data.x) && Number.isNaN(data.y) && Number.isNaN(data.z)).assertTrue()
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_013
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: SR000GH2A4
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_013', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_013----------------------------------");
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.NEGATIVE_INFINITY}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_013 failed');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_013 success x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(Number.isNaN(data.x) && Number.isNaN(data.y) && Number.isNaN(data.z)).assertTrue()
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_014
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2UB
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_014', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_014----------------------------------");
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':Number.NaN, 'altitude':0}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_014 failed');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_014 success x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(Number.isNaN(data.deflectionAngle) && Number.isNaN(data.geomagneticDip)).assertTrue()
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_015
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2UB
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_015', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_015----------------------------------");
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':Number.NEGATIVE_INFINITY, 'altitude':0}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_015 once success');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_015 success x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(Number.isNaN(data.deflectionAngle) && Number.isNaN(data.geomagneticDip)).assertTrue()
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_016
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2UB
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_016', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_016----------------------------------");
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.MAX_VALUE}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_016 failed');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_016 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(Number.isNaN(data.deflectionAngle) && Number.isNaN(data.geomagneticDip)).assertTrue()
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_017
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2UB
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_017', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_017----------------------------------");
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.NaN}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_017 failed');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_017 success x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(Number.isNaN(data.deflectionAngle) && Number.isNaN(data.geomagneticDip)).assertTrue()
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_018
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2UB
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_018', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_018----------------------------------");
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.NEGATIVE_INFINITY}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_018 failed');
                expect(false).assertfalse();
            } else {
                console.info('Sensor_GetGeomagneticField_018 success x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(Number.isNaN(data.deflectionAngle) && Number.isNaN(data.geomagneticDip)).assertTrue()
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_019
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2UB
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_019', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_019----------------------------------");
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':Number.MAX_VALUE, 'altitude':0}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_019 failed');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_019 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(Number.isNaN(data.levelIntensity) && Number.isNaN(data.totalIntensity)).assertTrue();
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_020
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2UB
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_020', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_020----------------------------------");
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':Number.NaN, 'altitude':0}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_020 failed');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_020 success x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(Number.isNaN(data.levelIntensity) && Number.isNaN(data.totalIntensity)).assertTrue()
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_021
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2UB
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_021', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_021----------------------------------");
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':Number.NEGATIVE_INFINITY, 'altitude':0}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_021 failed');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_021 success x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(Number.isNaN(data.deflectionAngle) && Number.isNaN(data.geomagneticDip)).assertTrue()
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_022
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2UB
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_022', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_022----------------------------------");
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.MAX_VALUE}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_022 failed');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_022 success x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(Number.isNaN(data.levelIntensity) && Number.isNaN(data.totalIntensity)).assertTrue()
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_023
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2UB
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_023', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_023----------------------------------");
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.NaN}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_023 once success');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_023 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(Number.isNaN(data.levelIntensity) && Number.isNaN(data.totalIntensity)).assertTrue()
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_024
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2UB
     * @tc.author:
     */
    it('Sensor_GetGeomagneticField_024', 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_024----------------------------------");
        sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.NEGATIVE_INFINITY}, timeMillis[0], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticField_024 once success');
                expect(false).assertTrue();
            } else {
                console.info('Sensor_GetGeomagneticField_024 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
                expect(Number.isNaN(data.levelIntensity) && Number.isNaN(data.totalIntensity)).assertTrue()
            }
            setTimeout(() =>{
                done()
            }, 500)
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_025
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2UB
     * @tc.author:
     */
    it("Sensor_GetGeomagneticField_025", 0, async function (done) {
        console.info("---------------------------Sensor_GetGeomagneticField_025----------------------------------");
        for (var i = 0; i < timeMillis.length; i++) {
            await sensor.getGeomagneticInfo({'latitude':80, 'longitude':0, 'altitude':0}, timeMillis[i]).then((data) => {
                console.info('Sensor_GetGeomagneticField_025 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
                + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity);
                expect(data.x).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[i][0])
                expect(data.y).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[i][1])
                expect(data.z).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[i][2])
                expect(data.deflectionAngle).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[i][3])
                expect(data.geomagneticDip).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[i][4])
                expect(data.levelIntensity).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[i][5])
                expect(data.totalIntensity).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[i][6])
            }).catch((error) => {
                console.info("promise::catch", error);
            })
        }
        done()
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_026
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2UD
     * @tc.author:
     */
    it("Sensor_GetGeomagneticField_026", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_026---------------------------');
        let geomagneticComponent = [27779.234375, -6214.9794921875, -14924.6611328125, -27.667943954467773, -12.610970497131348, 28465.9765625, 32141.2109375]
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':0}, Number.MIN_VALUE).then((data) => {
            console.info('Sensor_GetGeomagneticField_026 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(data.x).assertEqual(geomagneticComponent[0])
            expect(data.y).assertEqual(geomagneticComponent[1])
            expect(data.z).assertEqual(geomagneticComponent[2])
            expect(data.geomagneticDip).assertEqual(geomagneticComponent[3])
            expect(data.deflectionAngle).assertEqual(geomagneticComponent[4])
            expect(data.levelIntensity).assertEqual(geomagneticComponent[5])
            expect(data.totalIntensity).assertEqual(geomagneticComponent[6])
        }).catch((error) => {
            console.info("promise::catch", error);
        });
        done()
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_027
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2UD
     * @tc.author:
     */
    it("Sensor_GetGeomagneticField_027", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_027---------------------------');
        let geomagneticComponent = [1824.141845703125, 116.58167266845703, 56727.7734375, 88.15447235107422, 3.6568238735198975, 1827.8634033203125, 56757.21484375]
        await sensor.getGeomagneticInfo({'latitude':Number.MAX_VALUE, 'longitude':0, 'altitude':0}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_027 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(data.x).assertEqual(geomagneticComponent[0])
            expect(data.y).assertEqual(geomagneticComponent[1])
            expect(data.z).assertEqual(geomagneticComponent[2])
            expect(data.geomagneticDip).assertEqual(geomagneticComponent[3])
            expect(data.deflectionAngle).assertEqual(geomagneticComponent[4])
            expect(data.levelIntensity).assertEqual(geomagneticComponent[5])
            expect(data.totalIntensity).assertEqual(geomagneticComponent[6])
        }).catch((error) => {
            console.info("promise::catch", error)
        });
        done()
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetGeomagneticField_028
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2UD
     * @tc.author:
     */
    it("Sensor_GetGeomagneticField_028", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_028---------------------------');
        let geomagneticComponent = [1824.141845703125, 116.58167266845703, 56727.7734375, 88.15447235107422, 3.6568238735198975, 1827.8634033203125, 56757.21484375]
        await sensor.getGeomagneticInfo({'latitude':Number.NaN, 'longitude':0, 'altitude':0}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_028 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(data.x).assertEqual(geomagneticComponent[0])
            expect(data.y).assertEqual(geomagneticComponent[1])
            expect(data.z).assertEqual(geomagneticComponent[2])
            expect(data.geomagneticDip).assertEqual(geomagneticComponent[3])
            expect(data.deflectionAngle).assertEqual(geomagneticComponent[4])
            expect(data.levelIntensity).assertEqual(geomagneticComponent[5])
            expect(data.totalIntensity).assertEqual(geomagneticComponent[6])
        }).catch((error) => {
            console.info("promise::catch", error)
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_029
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_029", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_029---------------------------');
        let geomagneticComponent = [14425.57421875, -17156.767578125, -52023.21484375, -66.69005584716797, -49.94255447387695, 22415.4375, 56646.859375]
        await sensor.getGeomagneticInfo({'latitude':Number.NEGATIVE_INFINITY, 'longitude':0, 'altitude':0}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_029 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(data.x).assertEqual(geomagneticComponent[0])
            expect(data.y).assertEqual(geomagneticComponent[1])
            expect(data.z).assertEqual(geomagneticComponent[2])
            expect(data.geomagneticDip).assertEqual(geomagneticComponent[3])
            expect(data.deflectionAngle).assertEqual(geomagneticComponent[4])
            expect(data.levelIntensity).assertEqual(geomagneticComponent[5])
            expect(data.totalIntensity).assertEqual(geomagneticComponent[6])
        }).catch((error) => {
            console.info("promise::catch", error)
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_030
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_030", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_030---------------------------');
        let geomagneticComponent = [NaN, NaN, NaN]
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':Number.MAX_VALUE, 'altitude':0}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_030 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(Number.isNaN(data.x) && Number.isNaN(data.y) && Number.isNaN(data.z)).assertTrue()
        }).catch((error) => {
            console.info("promise::catch", error)
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_031
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_031", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_031---------------------------');
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':Number.NaN, 'altitude':0}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_031 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(Number.isNaN(data.x) && Number.isNaN(data.y) && Number.isNaN(data.z)).assertTrue()
        }).catch((error) => {
            console.info("promise::catch", error)
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_032
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_032", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_032---------------------------');
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':Number.NEGATIVE_INFINITY, 'altitude':0}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_032 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(Number.isNaN(data.x) && Number.isNaN(data.y) && Number.isNaN(data.z)).assertTrue()
        }).catch((error) => {
            console.info("promise::catch", error)
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_033
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_033", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_033---------------------------');
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.MAX_VALUE}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_033 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(Number.isNaN(data.x) && Number.isNaN(data.y) && Number.isNaN(data.z)).assertTrue()
        }).catch((error) => {
            console.info("promise::catch", error)
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_034
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_034", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_034---------------------------');
        let geomagneticComponent = [27536.40234375, -2248.586669921875, -16022.4306640625, -30.110872268676758, -4.66834020614624, 27628.05859375, 31937.875]
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.MIN_VALUE}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_034 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(data.x).assertEqual(geomagneticComponent[0])
            expect(data.y).assertEqual(geomagneticComponent[1])
            expect(data.z).assertEqual(geomagneticComponent[2])
            expect(data.geomagneticDip).assertEqual(geomagneticComponent[3])
            expect(data.deflectionAngle).assertEqual(geomagneticComponent[4])
            expect(data.levelIntensity).assertEqual(geomagneticComponent[5])
            expect(data.totalIntensity).assertEqual(geomagneticComponent[6])
        }).catch((error) => {
            console.info("promise::catch", error)
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_035
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_035", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_035---------------------------start');
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.NaN}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_035 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(Number.isNaN(data.x) && Number.isNaN(data.y) && Number.isNaN(data.z)).assertTrue()
        }).catch((error) => {
            console.info("promise::catch", error)
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_036
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_036", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_036---------------------------');
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.NEGATIVE_INFINITY}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_036 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(Number.isNaN(data.x) && Number.isNaN(data.y) && Number.isNaN(data.z)).assertTrue()
        }).catch((error) => {
            console.info("promise::catch", error)
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_037
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it('Sensor_GetGeomagneticField_037', 0, async function (done) {
        for (var i = 0; i < timeMillis.length; i++) {
            console.info('----------------------Sensor_GetGeomagneticField_037---------------------------');
            await sensor.getGeomagneticInfo({'latitude':80, 'longitude':0, 'altitude':0}, timeMillis[i]).then((data) => {
               console.info('Sensor_GetGeomagneticField_037 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
               + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity);
               expect(data.x).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[i][0])
               expect(data.y).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[i][1])
               expect(data.z).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[i][2])
               expect(data.deflectionAngle).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[i][3])
               expect(data.geomagneticDip).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[i][4])
               expect(data.levelIntensity).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[i][5])
               expect(data.totalIntensity).assertEqual(GEOMAGNETIC_COMPONENT_YEAR_RESULT[i][6])
            }).catch((error) => {
               console.info("promise::catch", error)
            });
        }
        done()
   })

    /*
     * @tc.name:Sensor_GetGeomagneticField_038
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_038", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_038---------------------------');
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':Number.NaN, 'altitude':0}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_038 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(Number.isNaN(data.deflectionAngle) && Number.isNaN(data.geomagneticDip)).assertTrue()
        }).catch((error) => {
            console.info("promise::catch", error)
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_039
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_039", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_039---------------------------');
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':Number.NEGATIVE_INFINITY, 'altitude':0}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_039 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(Number.isNaN(data.deflectionAngle) && Number.isNaN(data.geomagneticDip)).assertTrue()
        }).catch((error) => {
            console.info("promise::catch", error)
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_040
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_040", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_040 max ---------------------------');
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.MAX_VALUE}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_040 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(Number.isNaN(data.deflectionAngle) && Number.isNaN(data.geomagneticDip)).assertTrue()
        }).catch((error) => {
            console.info("promise::catch", error)
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_041
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_041", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_041---------------------------');
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.NaN}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_041 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(Number.isNaN(data.deflectionAngle) && Number.isNaN(data.geomagneticDip)).assertTrue()
        }).catch((error) => {
            console.info("promise::catch", error)
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_042
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_042", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_042---------------------------');
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.NEGATIVE_INFINITY}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_042 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(Number.isNaN(data.deflectionAngle) && Number.isNaN(data.geomagneticDip)).assertTrue()
        }).catch((error) => {
            console.info("promise::catch", error)
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_043
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
   it('Sensor_GetGeomagneticField_043', 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_043---------------------------');
       for (var i = 0; i < GEOMAGNETIC_COORDINATES.length; i++) {
            await sensor.getGeomagneticInfo({'latitude':GEOMAGNETIC_COORDINATES[i][0], 'longitude':GEOMAGNETIC_COORDINATES[i][1], 'altitude':GEOMAGNETIC_COORDINATES[i][2]}, timeMillis[0]).then((data) => {
               console.info('Sensor_GetGeomagneticField_043 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
               + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
               expect(data.x).assertEqual(GEOMAGNETIC_COMPONENT_COORDINATES_RESULT[i][0])
               expect(data.y).assertEqual(GEOMAGNETIC_COMPONENT_COORDINATES_RESULT[i][1])
               expect(data.z).assertEqual(GEOMAGNETIC_COMPONENT_COORDINATES_RESULT[i][2])
               expect(data.deflectionAngle).assertEqual(GEOMAGNETIC_COMPONENT_COORDINATES_RESULT[i][3])
               expect(data.geomagneticDip).assertEqual(GEOMAGNETIC_COMPONENT_COORDINATES_RESULT[i][4])
               expect(data.levelIntensity).assertEqual(GEOMAGNETIC_COMPONENT_COORDINATES_RESULT[i][5])
               expect(data.totalIntensity).assertEqual(GEOMAGNETIC_COMPONENT_COORDINATES_RESULT[i][6])
           }).catch((error) => {
               console.info("promise::catch", error);
           });
       }
       done()
   })

    /*
     * @tc.name:Sensor_GetGeomagneticField_044
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_044", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_044---------------------------');
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':Number.MAX_VALUE, 'altitude':0}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_044 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(Number.isNaN(data.levelIntensity) && Number.isNaN(data.totalIntensity)).assertTrue();
        }).catch((error) => {
            console.info("promise::catch", error);
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_045
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_045", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_045---------------------------');
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':Number.NaN, 'altitude':0}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_045 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(Number.isNaN(data.levelIntensity) && Number.isNaN(data.totalIntensity)).assertTrue()
        }).catch((error) => {
            console.info("promise::catch", error);
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_046
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_046", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_046---------------------------');
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':Number.NEGATIVE_INFINITY, 'altitude':0}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_046 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(Number.isNaN(data.deflectionAngle) && Number.isNaN(data.geomagneticDip)).assertTrue()
        }).catch((error) => {
            console.info("promise::catch", error);
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_047
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_047", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_047---------------------------');
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.MAX_VALUE}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_047 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(Number.isNaN(data.levelIntensity) && Number.isNaN(data.totalIntensity)).assertTrue()
        }).catch((error) => {
            console.info("promise::catch", error);
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_048
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_048", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_048---------------------------');
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.NaN}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_048 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(Number.isNaN(data.levelIntensity) && Number.isNaN(data.totalIntensity)).assertTrue()
        }).catch((error) => {
            console.info("promise::catch", error);
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_049
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("Sensor_GetGeomagneticField_049", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_049---------------------------');
        await sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.NEGATIVE_INFINITY}, timeMillis[0]).then((data) => {
            console.info('Sensor_GetGeomagneticField_049 x: ' + data.x + ',y: ' + data.y + ',z: ' + data.z + ',geomagneticDip: ' + data.geomagneticDip
            + ',deflectionAngle: ' + data.deflectionAngle + ',levelIntensity: ' + data.levelIntensity + ',totalIntensity: ' + data.totalIntensity)
            expect(Number.isNaN(data.levelIntensity) && Number.isNaN(data.totalIntensity)).assertTrue()
        }).catch((error) => {
            console.info("promise::catch", error);
        });
        done()
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_050
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: I5SWJI
     */
    it("Sensor_GetGeomagneticField_050", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_050---------------------------');
        try {
            await sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.NEGATIVE_INFINITY}).then((data) => {
                expect(true).assertfalse()
            }).catch((error) => {
                expect(true).assertfalse()
            });
            done()
        } catch(err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_051
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: I5SWJI
     */
    it("Sensor_GetGeomagneticField_051", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_051---------------------------');
        try {
            await sensor.getGeomagneticInfo(-1, timeMillis[0]).then((data) => {
                expect(true).assertfalse()
            }).catch((error) => {
                expect(true).assertfalse()
            });
            done()
        } catch(err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_052
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: I5SWJI
     */
    it("Sensor_GetGeomagneticField_052", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_052---------------------------');
        try {
            await sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.NEGATIVE_INFINITY}, 'invalid').then((data) => {
                expect(true).assertfalse()
            }).catch((error) => {
                expect(true).assertfalse()
            });
            done()
        } catch(err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_053
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: I5SWJI
     */
    it("Sensor_GetGeomagneticField_053", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_053---------------------------');
        try {
            await sensor.getGeomagneticInfo({'invalid':0, 'longitude':0, 'altitude':Number.NEGATIVE_INFINITY}, timeMillis[0]).then((data) => {
                expect(true).assertfalse()
            }).catch((error) => {
                expect(true).assertfalse()
            });
            done()
        } catch(err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_054
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: I5SWJI
     */
    it("Sensor_GetGeomagneticField_054", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_054---------------------------');
        try {
            sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.NEGATIVE_INFINITY}, (err, data) => {
                expect(false).assertTrue()
                setTimeout(() =>{
                    done()
                }, 500)
            });
        } catch(err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_055
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: I5SWJI
     */
    it("Sensor_GetGeomagneticField_055", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_055---------------------------');
        try {
            await sensor.getGeomagneticInfo(-1, timeMillis[0], (err, data) => {
                expect(false).assertTrue()
                setTimeout(() =>{
                    done()
                }, 500)
            });
        } catch(err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_056
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: I5SWJI
     */
    it("Sensor_GetGeomagneticField_056", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_056---------------------------');
        try {
            sensor.getGeomagneticInfo({'latitude':0, 'longitude':0, 'altitude':Number.NEGATIVE_INFINITY}, 'invalid', (err, data) => {
                expect(false).assertTrue()
                setTimeout(() =>{
                    done()
                }, 500)
            });
        } catch(err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /*
     * @tc.name:Sensor_GetGeomagneticField_057
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: I5SWJI
     */
    it("Sensor_GetGeomagneticField_057", 0, async function (done) {
        console.info('----------------------Sensor_GetGeomagneticField_057---------------------------');
        try {
            sensor.getGeomagneticInfo({'invalid':0, 'longitude':0, 'altitude':Number.NEGATIVE_INFINITY}, timeMillis[0], (err, data) => {
                expect(false).assertTrue()
                setTimeout(() =>{
                    done()
                }, 500)
            });
        } catch(err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    var SENSOR_DATA_MATRIX = [
        {
            "rotation": [-0.7980074882507324, 0.5486301183700562, 0.24937734007835388, -0.17277367413043976,
                -0.6047078967094421, 0.7774815559387207, 0.5773502588272095, 0.5773502588272095,0.5773502588272095],
            "inclination":[1, 0, 0, 0, 0.20444221794605255,0.9788785576820374, 0, -0.9788785576820374, 0.20444221794605255]
        },
        {
            "rotation": [-0.8206444382667542, 0.3832680284976959, 0.42384934425354004, 0.021023601293563843,
                -0.7209705710411072,0.6926466822624207, 0.5710522532463074,0.57732754945755,0.5836028456687927],
            "inclination":[1, 0, 0, 0, 0.2584352493286133,0.9660285115242004, 0, -0.9660285115242004, 0.2584352493286133]
        },
        {
            "rotation": [0.9583651423454285, 0.08038506656885147, -0.27399733662605286, 0.160231813788414,
                -0.9456362724304199, 0.2830156981945038, -0.23635157942771912, -0.3151354491710663, -0.9191450476646423],
            "inclination":[1, 0, 0, 0, 0.34239840507507324, 0.9395548701286316, 0, -0.9395548701286316, 0.34239840507507324]
        },
        {
            "rotation":[null, null, null, null, null, null, null, null, null],
            "inclination":[1, 0, 0, 0, null, null, 0, null ,null]
        },
        {
            "rotation":[null, null, null, null, null, null,0, 0, 0],
            "inclination":[1, 0, 0, 0, null, 0, 0, 0, null]
        }
    ]

    let GET_DIRECTION = [
        [ 0.38050639629364014, -0.9783217310905457, -0.6610431671142578],
        [-2.7610862255096436, 1.5018651485443115, 2.987273931503296],
        [0.32175055146217346, -1.006853699684143, -0.6857295036315918],
        [1.3332617282867432, -1.5440233945846558, -0.6627295017242432],
        [NaN, NaN, NaN],
        [0.7853981852531433, -0.6154797077178955, -0.7853981852531433],
        [0.7853981852531433, -0.7853981852531433, -0.7853981852531433],
        [0.785398, -0.615480, -0.785398],
        [0.785398, -0.785398, -0.785398]
    ]

    let rotationMatrix = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [-1, -2, -3, -4, -5, -6, -7, -78, -45],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        [11111111, 21111111, 31111111, 4111111, 5111111, 61111111, 71111111, 811111111, 91111111],
        [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN],
        [3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38],
        [3.40282e+39, 3.40282e+39, 3.40282e+39, 3.40282e+39, 3.40282e+39, 3.40282e+39, 3.40282e+39, 3.40282e+39, 3.40282e+39],
        [3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38],
        [3.40282e+39, 3.40282e+39, 3.40282e+39, 3.40282e+39, 3.40282e+39, 3.40282e+39, 3.40282e+39, 3.40282e+39, 3.40282e+39]
    ]

    let gravity = [
        [9, 9, 9], [91, 92, 93], [-9, -12, -35], [NaN, NaN, NaN], [3.40282e+38, 3.40282e+38, 3.40282e+38], [3.40282e+39, 3.40282e+39, 3.40282e+39]
    ]
    let geomagnetic = [
        [30, 25, 41], [3, 2, 4], [-123, -456, -564], [3.40282e+38, 3.40282e+38, 3.40282e+38], [NaN, NaN, NaN]
    ]

    /**
     * test
     *
     * @tc.name: Sensor_CreateRotationMatrix_001
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
     it('Sensor_CreateRotationMatrix_001', 0, async function (done) {
        sensor.getRotationMatrix(gravity[0], geomagnetic[0], (error,data)=>{
            if (error) {
                console.info('Sensor_CreateRotationMatrix_001 failed');
                expect(false).assertTrue();
            } else {
                console.info("Sensor_CreateRotationMatrix_001" + JSON.stringify(data))
                expect(JSON.stringify(data)).assertEqual(JSON.stringify(SENSOR_DATA_MATRIX[0]))
            }
            done()
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_CreateRotationMatrix_002
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */

    it('Sensor_CreateRotationMatrix_002', 0, async function (done) {
        sensor.getRotationMatrix(gravity[2],geomagnetic[2],(error,data)=>{
            if (error) {
                console.info('Sensor_CreateRotationMatrix_002 failed');
                expect(false).assertTrue();
            } else {
                console.info("Sensor_CreateRotationMatrix_002" + JSON.stringify(data))
                expect(JSON.stringify(data)).assertEqual(JSON.stringify(SENSOR_DATA_MATRIX[2]))
            }
            done()
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_CreateRotationMatrix_003
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
     it('Sensor_CreateRotationMatrix_003', 0, async function (done) {
        sensor.getRotationMatrix(gravity[0],geomagnetic[0]).then((data) => {
            console.info("Sensor_CreateRotationMatrix_003" + JSON.stringify(data))
            expect(JSON.stringify(data)).assertEqual(JSON.stringify(SENSOR_DATA_MATRIX[0]))
            done()
        }, (error) =>{
            expect(false).assertTrue();
            done()
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_CreateRotationMatrix_004
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
    it('Sensor_CreateRotationMatrix_004', 0, async function (done) {
        sensor.getRotationMatrix(gravity[1],geomagnetic[1]).then((data) => {
            console.info("Sensor_CreateRotationMatrix_004" + JSON.stringify(data))
            expect(JSON.stringify(data)).assertEqual(JSON.stringify(SENSOR_DATA_MATRIX[1]))
            done()
        }, (error) =>{
            expect(false).assertTrue();
            done()
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_CreateRotationMatrix_005
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
    it('Sensor_CreateRotationMatrix_005', 0, async function (done) {
        sensor.getRotationMatrix(gravity[2],geomagnetic[2]).then((data) => {
            console.info("Sensor_CreateRotationMatrix_005" + JSON.stringify(data))
            expect(JSON.stringify(data)).assertEqual(JSON.stringify(SENSOR_DATA_MATRIX[2]))
            done()
        }, (error) =>{
            expect(false).assertTrue();
            done()
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_CreateRotationMatrix_006
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
     it('Sensor_CreateRotationMatrix_006', 0, async function (done) {
        try {
            sensor.getRotationMatrix()
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /**
     * test
     *
     * @tc.name: Sensor_CreateRotationMatrix_007
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
     it('Sensor_CreateRotationMatrix_007', 0, async function (done) {
        try {
            sensor.getRotationMatrix(-1)
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /**
     * test
     *
     * @tc.name: Sensor_CreateRotationMatrix_008
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
     it('Sensor_CreateRotationMatrix_008', 0, async function (done) {
        try {
            sensor.getRotationMatrix(gravity[2], -1)
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /**
     * test
     *
     * @tc.name: Sensor_CreateRotationMatrix_009
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
     it('Sensor_CreateRotationMatrix_009', 0, async function (done) {
        try {
            sensor.getRotationMatrix().then((data) => {
                expect(true).assertfalse()
                done()
            }, (error) =>{
                expect(true).assertfalse()
                done()
            })
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /**
     * test
     *
     * @tc.name: Sensor_CreateRotationMatrix_010
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
    it('Sensor_CreateRotationMatrix_010', 0, async function (done) {
        try {
            sensor.getRotationMatrix(-1).then((data) => {
                expect(true).assertfalse()
                done()
            }, (error) =>{
                expect(true).assertfalse()
                done()
            })
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /**
     * test
     *
     * @tc.name: Sensor_CreateRotationMatrix_011
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
     it('Sensor_CreateRotationMatrix_011', 0, async function (done) {
        try {
            sensor.getRotationMatrix(gravity[2], -1).then((data) => {
                expect(true).assertfalse()
                done()
            }, (error) =>{
                expect(true).assertfalse()
                done()
            })
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    let createRotationMatrixResult = [
        [0.6724675297737122,-0.10471208393573761,0.7326819896697998,0.06531608104705811,0.9944750070571899,
            0.08217836916446686,-0.7372390031814575,-0.007406365126371384,0.6755914688110352],
        [1,0,0,0,1,0,0,0,1]
        ]
    /*
    * @tc.name: Sensor_CreateRotationMatrix_012
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: I5SWJI
    * @tc.author:
    */
    it('Sensor_CreateRotationMatrix_012', 0, async function (done) {
        console.info("Sensor_CreateRotationMatrix_012 start");
        sensor.getRotationMatrix([-0.0245, 0.402, 0.0465], (error, data) =>{
            console.info("Sensor_CreateRotationMatrix_012");
            if (error) {
                console.info('Sensor_CreateRotationMatrix_012 failed');
                expect(false).assertTrue();
            } else {
                for(var i = 0;i < data.length; i++) {
                    console.info("Sensor_CreateRotationMatrix_012 [" + i + ") = " + data[i]);
                    expect(data[i]).assertEqual(createRotationMatrixResult[0][i])
                }
            }
            done()
        })
        console.info(LABEL + "Sensor_CreateRotationMatrix_012 end");
    })

    /*
    * tc.name: Sensor_CreateRotationMatrix_013
    * tc.desc: Verfication results of the incorrect parameters of test interface.
    * tc.require: SR000GH2A2
    * @tc.author:
    */
    it('Sensor_CreateRotationMatrix_013', 0,async function (done) {
        console.info('Sensor_CreateRotationMatrix_013 start')
        sensor.getRotationMatrix([-0.0245, 0.402, 0.0465]).then((data) => {
            for(var i = 0;i < data.length; i++) {
                console.info("Sensor_CreateRotationMatrix_013 [" + i + "] : " + data[i]);
                expect(data[i]).assertEqual(createRotationMatrixResult[0][i])
            }
            done()
        },(error) => {
            expect(false).assertTrue();
            console.info('promise failed', error)
            done()
        })
        console.info( "Sensor_CreateRotationMatrix_013 end")
    })

    /*
    * tc.name: Sensor_CreateRotationMatrix_014
    * tc.desc: Verfication results of the incorrect parameters of test interface.
    * tc.require: I5SWJI
    * @tc.author:
    */
    it('Sensor_CreateRotationMatrix_014', 0,async function (done) {
        console.info('Sensor_CreateRotationMatrix_014 start')
        sensor.getRotationMatrix([0, 0, 0]).then((data) => {
            for(var i = 0;i < data.length; i++) {
                console.info("Sensor_CreateRotationMatrix_014 [" + i + "] : " + data[i]);
                expect(data[i]).assertEqual(createRotationMatrixResult[1][i])
            }
            done()
        }, (error) => {
            expect(false).assertTrue();
            console.info('promise failed', error)
            done()
        })
        console.info( "Sensor_CreateRotationMatrix_014 end")
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetDirection_001
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
    it('Sensor_GetDirection_001', 0, async function (done) {
        sensor.getOrientation(rotationMatrix[0],(error,data)=>{
            if (error) {
                console.info('Sensor_GetDirection_001 failed');
                expect(false).assertTrue();
            } else {
                for (var i = 1; i < data.length; i++) {
                    console.info("Sensor_GetDirection_001" + data[i])
                    expect(data[i]).assertEqual(GET_DIRECTION[0][i])
                }
            }
            done()
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetDirection_002
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
    it('Sensor_GetDirection_002', 0, async function (done) {
        sensor.getOrientation(rotationMatrix[1],function(error,data){
            if (error) {
                console.info('Sensor_GetDirection_002 failed');
                expect(false).assertTrue();
            } else {
                for (var i = 1; i < data.length; i++) {
                    console.info("Sensor_GetDirection_002" + data[i])
                    expect(data[i]).assertEqual(GET_DIRECTION[1][i])
                }
            }
            done()
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetDirection_003
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2RN
     * @tc.author:
     */
    it('Sensor_GetDirection_003', 0, async function (done) {
        sensor.getOrientation(rotationMatrix[0]).then((data) => {
            for (var i = 0; i<data.length; i++) {
                console.info("Sensor_GetDirection_003" + data[i])
                expect(data[i]).assertEqual(GET_DIRECTION[0][i])
            }
            done()
        }, (error) =>{
            expect(false).assertTrue();
            done()
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetDirection_004
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2RN
     * @tc.author:
     */
    it('Sensor_GetDirection_004', 0, async function (done) {
        sensor.getOrientation(rotationMatrix[1]).then((data) => {
            for (var i = 0; i<data.length; i++) {
                console.info("Sensor_GetDirection_004" + data[i])
                expect(data[i]).assertEqual(GET_DIRECTION[1][i])
            }
            done()
        }, (error) =>{
            expect(false).assertTrue();
            done()
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetDirection_005
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: AR000GH2RN
     * @tc.author:
     */
    it('Sensor_GetDirection_005', 0, async function (done) {
        try  {
            sensor.getOrientation([1,2,3,1,2,3,1,2,3,0]).then((data) => {
                for (var i = 0; i<data.length; i++) {
                    console.info("Sensor_GetDirection_005 failed")
                    expect(false).assertTrue();
                }
                done()
            }, (error) =>{
                expect(false).assertTrue();
                console.info("Sensor_GetDirection_005 success")
                done()
            })
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetDirection_006
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
     it('Sensor_GetDirection_006', 0, async function (done) {
        try {
            sensor.getRotationMatrix()
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetDirection_007
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
     it('Sensor_GetDirection_007', 0, async function (done) {
        try {
            sensor.getRotationMatrix(-1)
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetDirection_008
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
     it('Sensor_GetDirection_008', 0, async function (done) {
        try {
            sensor.getRotationMatrix(rotationMatrix[1], -1)
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetDirection_009
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
     it('Sensor_GetDirection_009', 0, async function (done) {
        try {
            sensor.getRotationMatrix().then((data) => {
                expect(true).assertfalse()
                done()
            }, (error) =>{
                expect(true).assertfalse()
                done()
            })
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetDirection_010
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
    it('Sensor_GetDirection_010', 0, async function (done) {
        try {
            sensor.getRotationMatrix(-1).then((data) => {
                expect(true).assertfalse()
                done()
            }, (error) =>{
                expect(true).assertfalse()
                done()
            })
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetDirection_011
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
     it('Sensor_GetDirection_011', 0, async function (done) {
        try {
            sensor.getRotationMatrix(rotationMatrix[1], -1).then((data) => {
                expect(true).assertfalse()
                done()
            }, (error) =>{
                expect(true).assertfalse()
                done()
            })
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    let ANGLECHANGE_9_RESULT = [
        [0.7853981852531433, NaN, -0.32175055146217346],  //123123123
        [0.7853981852531433, NaN, -0.7853981852531433],   //FLOAT.MAXVALUE
        [0.0, -0.0, -0.0],                                //FLOAT.MINVALUE
        [0.7853981852531433, NaN, -0.7853981852531433],   //FLOAT.MAXVALUE+1
        ];

    /**
     * test
     *
     * @tc.name: Sensor_GetAngleModify_001
     * @tc.desc:
     * @tc.require: AR000GH2SL
     * @tc.author:
     */
    it('Sensor_GetAngleModify_001', 0, async function (done) {
        console.info("SensorJsAPI--->Sensor_GetAngleModify_001");
        sensor.getAngleVariation([1,2,3,1,2,3,1,2,3], [2,2,2,2,2,2,2,2,2], function(error, data) {
            if (error) {
                console.info('Sensor_GetAngleModify_001 failed');
                expect(false).assertTrue();
            } else {
                for(var i = 0; i < data.length; i++) {
                    console.info("Sensor_GetAngleModify_001 [" + i + "] = " + data[i]);
                    expect(data[0]).assertEqual(ANGLECHANGE_9_RESULT[0][0]) && expect(Number.isNaN(data[1])).assertTrue() &&
                    expect(data[2]).assertEqual(ANGLECHANGE_9_RESULT[0][2]);
                }
            }
            done()
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetAngleModify_002
     * @tc.desc:
     * @tc.require: AR000GH2SL
     * @tc.author:
     */
    it('Sensor_GetAngleModify_002', 0, async function (done) {
        console.info("Sensor_GetAngleModify_002");
        sensor.getAngleVariation([3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38],
            [3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38],
            function(error, data) {
                if (error) {
                    console.info('Sensor_GetAngleModify_002 failed');
                    expect(false).assertTrue();
                } else {
                    for(var i = 0; i < data.length; i++) {
                        console.info("Sensor_GetAngleModify_002 [" + i + "] = " + data[i]);
                        expect(data[0]).assertEqual(ANGLECHANGE_9_RESULT[1][0]) && expect(Number.isNaN(data[1])).assertTrue() &&
                        expect(data[2]).assertEqual(ANGLECHANGE_9_RESULT[1][2]);
                    }
                }
                done()
            })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetAngleModify_003
     * @tc.desc:
     * @tc.require: AR000GH2SL
     * @tc.author:
     */
    it('Sensor_GetAngleModify_003', 0, async function (done) {
        console.info("Sensor_GetAngleModify_003 in");
        sensor.getAngleVariation([1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38],
            [1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38],
            function(error, data) {
                if (error) {
                    console.info('Sensor_GetAngleModify_003 failed');
                    expect(false).assertTrue();
                } else {
                    for(var i = 0; i < data.length; i++) {
                        console.info("Sensor_GetAngleModify_003 [" + i + "] = " + data[i]);
                        expect(data[0]).assertEqual(ANGLECHANGE_9_RESULT[2][0])
                        && expect(data[1]).assertEqual(ANGLECHANGE_9_RESULT[2][1])
                        && expect(data[2]).assertEqual(ANGLECHANGE_9_RESULT[2][2]);
                    }
                }
                done()
            });
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetAngleModify_004
     * @tc.desc:
     * @tc.require: AR000GH2SL
     * @tc.author:
     */
    it('Sensor_GetAngleModify_004', 0, async function (done) {
        console.info("Sensor_GetAngleModify_004");
        sensor.getAngleVariation([3.40282e+38+1, 3.40282e+38+1, 3.40282e+38+1, 3.40282e+38+1, 3.40282e+38+1, 3.40282e+38+1, 3.40282e+38+1, 3.40282e+38+1, 3.40282e+38+1],
            [3.40282e+38+1, 3.40282e+38+1, 3.40282e+38+1, 3.40282e+38+1, 3.40282e+38+1, 3.40282e+38+1, 3.40282e+38+1, 3.40282e+38+1, 3.40282e+38+1],
            function(error, data) {
                if (error) {
                    console.info('Sensor_GetAngleModify_004 failed');
                    expect(false).assertTrue();
                } else {
                    for(var i = 0; i < data.length; i++) {
                        console.info("Sensor_GetAngleModify_004 [" + i + "] = " + data[i]);
                        expect(data[0]).assertEqual(ANGLECHANGE_9_RESULT[3][0]) && expect(Number.isNaN(data[1])).assertTrue() && expect(data[2]).assertEqual(ANGLECHANGE_9_RESULT[3][2]);
                    }
                }
                done()
            });
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetAngleModify_005
     * @tc.desc:
     * @tc.require: AR000GH2SL
     * @tc.author:
     */
    it('Sensor_GetAngleModify_005', 0, async function (done) {
        console.info("Sensor_GetAngleModify_005 in");
        sensor.getAngleVariation([0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0],
            [0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0],
            function(error, data) {
                if (error) {
                    console.info('Sensor_GetAngleModify_005 failed');
                    expect(false).assertTrue();
                } else {
                    for(var i = 0; i < data.length; i++) {
                        console.info("Sensor_GetAngleModify_005 [" + i + "] = " + data[i]);
                        expect(Number.isNaN(data[0]) && Number.isNaN(data[1]) && Number.isNaN(data[2])).assertTrue();
                    }
                }
                done()
            });
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetAngleModify_006
     * @tc.desc:
     * @tc.require: AR000GH2SL
     * @tc.author:
     */
    it('Sensor_GetAngleModify_006', 0, async function (done) {
        console.info("Sensor_GetAngleModify_006 in");
        sensor.getAngleVariation([1,2,3,1,2,3,1,2,3], [2,2,2,2,2,2,2,2,2]).then((data) => {
            for(var i = 0; i < data.length; i++) {
                console.info("Sensor_GetAngleModify_006 [" + i + "] = " + data[i]);
                expect(data[0]).assertEqual(ANGLECHANGE_9_RESULT[0][0]) && expect(Number.isNaN(data[1])).assertTrue() &&
                expect(data[2]).assertEqual(ANGLECHANGE_9_RESULT[0][2]);
            }
            done();
        }, (error) =>{
            expect(false).assertTrue();
            done()
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetAngleModify_007
     * @tc.desc:
     * @tc.require: AR000GH2SL
     * @tc.author:
     */
    it('Sensor_GetAngleModify_007', 0, async function (done) {
        console.info("Sensor_GetAngleModify_007 in");
        sensor.getAngleVariation([3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38],
            [3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38]).then((data) => {
            for(var i = 0; i < data.length; i++) {
                console.info("Sensor_GetAngleModify_007 [" + i + "] = " + data[i]);
                expect(data[0]).assertEqual(ANGLECHANGE_9_RESULT[1][0]) && expect(Number.isNaN(data[1])).assertTrue() && expect(data[2]).assertEqual(ANGLECHANGE_9_RESULT[1][2]);
            }
            done()
        }, (error) =>{
            expect(false).assertTrue();
            done()
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetAngleModify_008
     * @tc.desc:
     * @tc.require: AR000GH2SL
     * @tc.author:
     */
    it('Sensor_GetAngleModify_008', 0, async function (done) {
        console.info("Sensor_GetAngleModify_008 in");
        sensor.getAngleVariation([1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38],
            [1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38, 1.17549e-38]).then((data) => {
            for(var i = 0; i < data.length; i++) {
                console.info("Sensor_GetAngleModify_008 [" + i + "] = " + data[i]);
                expect(data[0]).assertEqual(ANGLECHANGE_9_RESULT[2][0])
                && expect(data[1]).assertEqual(ANGLECHANGE_9_RESULT[2][1])
                && expect(data[2]).assertEqual(ANGLECHANGE_9_RESULT[2][2]);
            }
            done()
        }, (error) =>{
            expect(false).assertTrue();
            done()
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetAngleModify_009
     * @tc.desc:
     * @tc.require: AR000GH2SL
     * @tc.author:
     */
    it('Sensor_GetAngleModify_009', 0, async function (done) {
        console.info("Sensor_GetAngleModify_009 in");
        sensor.getAngleVariation([3.40282e+38 + 1,3.40282e+38 + 1,3.40282e+38 + 1,3.40282e+38+1,3.40282e+38+1,3.40282e+38+1,3.40282e+38+1,3.40282e+38+1,3.40282e+38+1],
            [3.40282e+38+1,3.40282e+38+1,3.40282e+38+1,3.40282e+38+1,3.40282e+38+1,3.40282e+38+1,3.40282e+38+1,3.40282e+38+1,3.40282e+38+1])
        .then((data) => {
            for(var i = 0; i < data.length; i++) {
                console.info("Sensor_GetAngleModify_009 [" + i + "] = " + data[i]);
                expect(data[0]).assertEqual(ANGLECHANGE_9_RESULT[3][0]) && expect(Number.isNaN(data[1])).assertTrue() && expect(data[2]).assertEqual(ANGLECHANGE_9_RESULT[3][2]);
            }
            done()
        }, (error) =>{
            expect(false).assertTrue();
            done()
        })
    })

    /**
     * test
     *
     * @tc.name: Sensor_GetAngleModify_010
     * @tc.desc:
     * @tc.require: AR000GH2SL
     * @tc.author:
     */
    it('Sensor_GetAngleModify_010', 0, async function (done) {
        console.info("Sensor_GetAngleModify_010 in");
        sensor.getAngleVariation([0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0],
            [0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0, 0.0 / 0.0]).then((data) => {
            for(var i = 0; i < data.length; i++) {
                console.info("Sensor_GetAngleModify_010 [" + i + "] = " + data[i]);
                expect(Number.isNaN(data[0]) && Number.isNaN(data[1]) && Number.isNaN(data[2])).assertTrue();
            }
            done()
        }, (error) =>{
            expect(false).assertTrue();
            done()
        })
    })

    /*
     * @tc.name:Sensor_GetAngleModify_011
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: I5SWJI
     */
    it("Sensor_GetAngleModify_011", 0, async function (done) {
        console.info('----------------------Sensor_GetAngleModify_011---------------------------');
        try {
            await sensor.getAngleVariation([1,2,3,1,2,3,1,2,3]).then((data) => {
                expect(true).assertfalse()
            }).catch((error) => {
                expect(true).assertfalse()
            });
            done()
        } catch(err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /*
     * @tc.name:Sensor_GetAngleModify_012
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: I5SWJI
     */
    it("Sensor_GetAngleModify_012", 0, async function (done) {
        console.info('----------------------Sensor_GetAngleModify_012---------------------------');
        try {
            await sensor.getAngleVariation(-1, [2,2,2,2,2,2,2,2,2]).then((data) => {
                expect(true).assertfalse()
            }).catch((error) => {
                expect(true).assertfalse()
            });
            done()
        } catch(err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /*
     * @tc.name:Sensor_GetAngleModify_013
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: I5SWJI
     */
    it("Sensor_GetAngleModify_013", 0, async function (done) {
        console.info('----------------------Sensor_GetAngleModify_013---------------------------');
        try {
            await sensor.getAngleVariation([1,2,3,1,2,3,1,2,3], 'invalid').then((data) => {
                expect(true).assertfalse()
            }).catch((error) => {
                expect(true).assertfalse()
            });
            done()
        } catch(err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /*
     * @tc.name:Sensor_GetAngleModify_014
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: I5SWJI
     */
    it("Sensor_GetAngleModify_014", 0, async function (done) {
        console.info('----------------------Sensor_GetAngleModify_014---------------------------');
        try {
            sensor.getAngleVariation([1,2,3,1,2,3,1,2,3], (err, data) => {
                expect(false).assertTrue()
                setTimeout(() =>{
                    done()
                }, 500)
            });
        } catch(err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /*
     * @tc.name:Sensor_GetAngleModify_015
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: I5SWJI
     */
    it("Sensor_GetAngleModify_015", 0, async function (done) {
        console.info('----------------------Sensor_GetAngleModify_015---------------------------');
        try {
            await sensor.getAngleVariation(-1, [2,2,2,2,2,2,2,2,2], (err, data) => {
                expect(false).assertTrue()
                setTimeout(() =>{
                    done()
                }, 500)
            });
        } catch(err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /*
     * @tc.name:Sensor_GetAngleModify_016
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: I5SWJI
     */
    it("Sensor_GetAngleModify_016", 0, async function (done) {
        console.info('----------------------Sensor_GetAngleModify_016---------------------------');
        try {
            sensor.getAngleVariation([1,2,3,1,2,3,1,2,3], 'invalid', (err, data) => {
                expect(false).assertTrue()
                setTimeout(() =>{
                    done()
                }, 500)
            });
        } catch(err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    var result = [
        [0.7441122531890869, 0.5199999809265137, -0.335999995470047, -0.25099998712539673],
        [0, 3.402820018375656e+38, 3.402820018375656e+38, 3.402820018375656e+38],
        [1, 0, 0, 0],
        [0.7183529734611511, -0.32499998807907104, -0.5619999766349792, -0.25],
        [0, 0, 0, 0]
    ]

    /*
    * @tc.name: Sensor_CreateQuaterniont_001
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2RP
    * @tc.author:
    */
    it('Sensor_CreateQuaterniont_001', 0,async function (done) {
        console.info('Sensor_CreateQuaterniont_001 start')
        sensor.getQuaternion([0.52, -0.336, -0.251], (error, data) =>{
            console.info('Sensor_CreateQuaterniont_001' + 'lengh:' + data.length);
            if (error) {
                console.info('Sensor_CreateQuaterniont_001 failed');
                expect(false).assertTrue();
            } else {
                for (var i = 0; i < data.length; i++) {
                    console.info("data[" + i + "]: " + data[i])
                    expect(data[i]).assertEqual(result[0][i])
                }
            }
            done()
        })
    })

    /*
    * @tc.name: Sensor_CreateQuaterniont_002
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2RP
    * @tc.author:
    */
    it('Sensor_CreateQuaterniont_002', 0,async function (done) {
        console.info('Sensor_CreateQuaterniont_002 start')
        sensor.getQuaternion([3.40282e+38, 3.40282e+38, 3.40282e+38], (error, data) =>{
            if (error) {
                console.info('Sensor_CreateQuaterniont_002 failed');
                expect(false).assertTrue();
            } else {
                for (var i = 0; i < data.length; i++) {
                    console.info("data[" + i + "]: " + data[i])
                    expect(data[i]).assertEqual(result[1][i])
                }
            }
            done()
        })
    })

    /*
    * @tc.name: Sensor_CreateQuaterniont_003
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2RP
    * @tc.author:
    */
    it('Sensor_CreateQuaterniont_003', 0,async function (done) {
        console.info('Sensor_CreateQuaterniont_003 start')
        sensor.getQuaternion([0, 0, 0], (error, data) =>{
            if (error) {
                console.info('Sensor_CreateQuaterniont_003 failed');
                expect(false).assertTrue();
            } else {
                for (var i = 0; i < data.length; i++) {
                    console.info("data[" + i + "]: " + data[i])
                    expect(data[i]).assertEqual(result[2][i])
                }
            }
            done()
        })
        console.info("Sensor_CreateQuaterniont_003 end")
    })

    /*
    * @tc.name: Sensor_CreateQuaterniont_004
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2RP
    * @tc.author:
    */
    it('Sensor_CreateQuaterniont_004', 0,async function (done) {
        console.info('Sensor_CreateQuaterniont_004 start')
        sensor.getQuaternion([-0.325, -0.562, -0.25], (error, data) =>{
            if (error) {
                console.info('Sensor_CreateQuaterniont_004 failed');
                expect(false).assertTrue();
            } else {
                for (var i = 0; i < data.length; i++) {
                    console.info("data[" + i + "]: " + data[i])
                    expect(data[i]).assertEqual(result[3][i])
            }
            }
            done()
        })
        console.info("Sensor_CreateQuaterniont_004 end")
    })

    /*
    * @tc.name: Sensor_CreateQuaterniont_005
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2RP
    * @tc.author:
    */
    it('Sensor_CreateQuaterniont_005', 0,async function (done) {
        console.info('Sensor_CreateQuaterniont_005 start')
        try {
            sensor.getQuaternion([0.25, 0.14], (error, data) =>{
                if (error) {
                    expect(false).assertTrue();
                } else {
                    expect(false).assertTrue();
                }
                done()
            })
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
        console.info("Sensor_CreateQuaterniont_005 end")
    })

    /*
    * @tc.name: Sensor_CreateQuaterniont_006
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2RP
    * @tc.author:
    */
    it('Sensor_CreateQuaterniont_006', 0,async function (done) {
        console.info('Sensor_CreateQuaterniont_006 start')
        sensor.getQuaternion([0.52, -0.336, -0.251]).then((data) => {
            console.info('Sensor_CreateQuaterniont_006');
            for (var i = 0; i < data.length; i++) {
                console.info("data[" + i + "]: " + data[i]);
                expect(data[i]).assertEqual(result[0][i])
            }
            done()
        }, (error) => {
            expect(false).assertTrue();
            console.info('promise failed')
            done()
        })
        console.info("Sensor_CreateQuaterniont_006 end")
    })

    /*
    * @tc.name: Sensor_CreateQuaterniont_007
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2RP
    * @tc.author:
    */
    it('Sensor_CreateQuaterniont_007', 0,async function (done) {
        console.info('Sensor_CreateQuaterniont_007 start')
        try {
            sensor.getQuaternion([0, 0]).then((data) => {
                console.info('Sensor_CreateQuaterniont_007');
                expect(false).assertTrue();
                done()
            }, (error) => {
                expect(false).assertTrue();
                console.info('promise failed')
                done()
            })
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
        console.info("Sensor_CreateQuaterniont_007 end")
    })

    /*
    * @tc.name: Sensor_CreateQuaterniont_008
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2RP
    * @tc.author:
    */
    it('Sensor_CreateQuaterniont_008', 0,async function (done) {
        console.info('Sensor_CreateQuaterniont_008 start')
        sensor.getQuaternion([0, 0, 0]).then((data) => {
            console.info('Sensor_CreateQuaterniont_008');
            for (var i = 0; i < data.length; i++) {
                console.info("data[" + i + "]: " + data[i]);
                expect(data[i]).assertEqual(result[2][i])
            }
            done()
        }, (error) => {
            expect(false).assertTrue();
            console.info('promise failed')
            done()
        })
        console.info("Sensor_CreateQuaterniont_008 end")
    })

    /*
    * @tc.name: Sensor_CreateQuaterniont_009
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2RP
    * @tc.author:
    */
    it('Sensor_CreateQuaterniont_009', 0,async function (done) {
        console.info('Sensor_CreateQuaterniont_009 start')
        sensor.getQuaternion([-0.325, -0.562, -0.25]).then((data) => {
            console.info('Sensor_CreateQuaterniont_009');
            for (var i = 0; i < data.length; i++) {
                console.info("data[" + i + "]: " + data[i]);
                expect(data[i]).assertEqual(result[3][i])
            }
            done()
        },(error) => {
            expect(false).assertTrue();
            console.info('promise failed')
            done()
        })
    })

    /*
    * @tc.name: Sensor_CreateQuaterniont_010
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2RP
    * @tc.author:
    */
    it('Sensor_CreateQuaterniont_010', 0,async function (done) {
        console.info('Sensor_CreateQuaterniont_010 start')
        try {
            sensor.getQuaternion([0.25, 0.14]).then((data) => {
                console.info('Sensor_CreateQuaterniont_010');
                expect(false).assertTrue();
                done()
            },(error) => {
                expect(false).assertTrue();
                console.info('promise failed')
                done()
            })
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /*
     * test
     *
     * @tc.name: Sensor_CreateQuaterniont_011
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
     it('Sensor_CreateQuaterniont_011', 0, async function (done) {
        try {
            sensor.createQuaternion()
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /*
     * test
     *
     * @tc.name: Sensor_CreateQuaterniont_012
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
     it('Sensor_CreateQuaterniont_012', 0, async function (done) {
        try {
            sensor.createQuaternion(-1)
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /*
     * test
     *
     * @tc.name: Sensor_CreateQuaterniont_013
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
     it('Sensor_CreateQuaterniont_013', 0, async function (done) {
        try {
            sensor.createQuaternion([0.52, -0.336, -0.251], -1)
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /*
     * test
     *
     * @tc.name: Sensor_CreateQuaterniont_014
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
     it('Sensor_CreateQuaterniont_014', 0, async function (done) {
        try {
            sensor.createQuaternion().then((data) => {
                expect(true).assertfalse()
                done()
            }, (error) =>{
                expect(false).assertfalse()
                done()
            })
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /*
     * test
     *
     * @tc.name: Sensor_CreateQuaterniont_015
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
    it('Sensor_CreateQuaterniont_015', 0, async function (done) {
        try {
            sensor.createQuaternion(-1).then((data) => {
                expect(true).assertfalse()
                done()
            }, (error) =>{
                expect(false).assertfalse()
                done()
            })
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    /*
     * test
     *
     * @tc.name: Sensor_CreateQuaterniont_016
     * @tc.desc: Verification results of the incorrect parameters of the test interface.
     * @tc.require: I5SWJI
     * @tc.author:
     */
     it('Sensor_CreateQuaterniont_016', 0, async function (done) {
        try {
            sensor.createQuaternion([0.52, -0.336, -0.251], -1).then((data) => {
                expect(true).assertfalse()
                done()
            }, (error) =>{
                expect(false).assertfalse()
                done()
            })
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
    })

    var getGeomagneticDipResult = [ 0.8760581016540527, 0.862170, -Infinity, 44330]

    /*
    * @tc.name: Sensor_GetGeomagneticDip_001
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2OG
    * @tc.author:
    */
    it('Sensor_GetGeomagneticDip_001', 0, async function (done) {
        console.info('Sensor_GetGeomagneticDip_001 start')
        sensor.getInclination([1, 2, 3, 4, 5, 6, 7, 8, 9], (error, data) => {
            if (error) {
                console.info('Sensor_GetGeomagneticDip_001 failed');
                expect(false).assertTrue();
            } else {
               console.info("Sensor_GetGeomagneticDip_001" + data)
               expect(data).assertEqual(getGeomagneticDipResult[0])
            }
            done()
            console.info('Sensor_GetGeomagneticDip_001' + 'lengh:' + data.length);
        })
        console.info("Sensor_GetGeomagneticDip_001 end")
    })

    /*
    * @tc.name: Sensor_GetGeomagneticDip_002
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2OG
    * @tc.author:
    */
    it('Sensor_GetGeomagneticDip_002', 0, async function (done) {
        console.info('Sensor_GetGeomagneticDip_002 start')
        try {
            sensor.getInclination([1, 2, 3, 4], (error,data) => {
                if (error) {
                    expect(false).assertTrue();
                } else {
                    expect(false).assertTrue();
                }
                done()
            })
        } catch (err) {
            expect(err.code).assertEqual(PARAMETER_ERROR_CODE)
            expect(err.message).assertEqual(PARAMETER_ERROR_MSG)
            done()
        }
        console.info("Sensor_GetGeomagneticDip_002 end")
    })

    /*
    * @tc.name: Sensor_GetGeomagneticDip_003
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: I5SWJI
    * @tc.author:
    */
    it('Sensor_GetGeomagneticDip_003', 0, async function (done) {
        console.info('Sensor_GetGeomagneticDip_003 start')
        try {
            sensor.getInclination()
        } catch(error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
        console.info("Sensor_GetGeomagneticDip_003 end")
    })

    /*
    * @tc.name: Sensor_GetGeomagneticDip_004
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: I5SWJI
    * @tc.author:
    */
    it('Sensor_GetGeomagneticDip_004', 0, async function (done) {
        console.info('Sensor_GetGeomagneticDip_004 start')
        try {
            sensor.getInclination(-1, (error, data) => {
                if (error) {
                    console.info('Sensor_GetGeomagneticDip_004 failed');
                    expect(false).assertTrue();
                } else {
                   console.info("Sensor_GetGeomagneticDip_004" + data)
                   expect(data).assertEqual(getGeomagneticDipResult[0])
                }
                done()
                console.info('Sensor_GetGeomagneticDip_004' + 'lengh:' + data.length);
            })
        } catch(error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
        console.info("Sensor_GetGeomagneticDip_004 end")
    })

    /*
    * @tc.name: Sensor_GetGeomagneticDip_005
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: I5SWJI
    * @tc.author:
    */
    it('Sensor_GetGeomagneticDip_005', 0, async function (done) {
        console.info('Sensor_GetGeomagneticDip_005 start')
        try {
            sensor.getInclination().then((data)=>{
                console.info("Sensor_GetGeomagneticDip_005" + data)
                expect(true).assertfalse()
                done()
            }, (error)=>{
                expect(true).assertfalse()
                done()
            })
        } catch(error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
        console.info("Sensor_GetGeomagneticDip_005 end")
    })

    /*
    * @tc.name: Sensor_GetGeomagneticDip_006
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: I5SWJI
    * @tc.author:
    */
    it('Sensor_GetGeomagneticDip_006', 0, async function (done) {
        console.info('Sensor_GetGeomagneticDip_006 start')
        try {
            sensor.getInclination(-1).then((data)=>{
                console.info("Sensor_GetGeomagneticDip_006" + data)
                expect(true).assertfalse()
                done()
            }, (error)=>{
                expect(true).assertfalse()
                done()
            })
        } catch(error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
        console.info("Sensor_GetGeomagneticDip_006 end")
    })

    /*
    * @tc.name: Sensor_GetAltitude_001
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2OG
    * @tc.author:
    */
    it('Sensor_GetAltitude_001', 0, async function (done) {
        console.info('Sensor_GetAltitude_001 start')
        sensor.getDeviceAltitude(0, 100, (error, data) => {
            if (error) {
                console.info('Sensor_GetAltitude_001 failed');
                expect(false).assertTrue();
            } else {
               console.info("Sensor_GetAltitude_001" + data)
               expect(data).assertEqual(getGeomagneticDipResult[2])
            }
            done()
            console.info("Sensor_GetAltitude_001 end")
        })
    })

    /*
    * @tc.name: Sensor_GetAltitude_002
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2OG
    * @tc.author:
    */
    it('Sensor_GetAltitude_002', 0, async function (done) {
        console.info('Sensor_GetAltitude_002 start')
        sensor.getDeviceAltitude(5, 0, (error, data) => {
            if (error) {
                console.info('Sensor_GetAltitude_002 failed');
                expect(false).assertTrue();
            } else {
               console.info("Sensor_GetAltitude_002" + data)
               expect(data).assertEqual(getGeomagneticDipResult[3])
            }
            done()
        })
        console.info("Sensor_GetAltitude_002 end")
    })

    /*
    * @tc.name: Sensor_GetAltitude_003
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2OG
    * @tc.author:
    */
    it('Sensor_GetAltitude_003', 0, async function (done) {
        sensor.getDeviceAltitude(0, 100).then((data)=>{
            console.info("Sensor_GetAltitude_003" + data)
            expect(data).assertEqual(getGeomagneticDipResult[2])
            done()
        }, (error)=>{
            console.info('Sensor_GetAltitude_003 failed');
            expect(false).assertTrue();
            done()
        });
    })

    /*
    * @tc.name: Sensor_GetAltitude_004
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2OG
    * @tc.author:
    */
    it('Sensor_GetAltitude_004', 0, async function (done) {
        sensor.getDeviceAltitude(5, 0).then((data)=>{
            console.info("Sensor_GetAltitude_004" + data)
            expect(data).assertEqual(getGeomagneticDipResult[3])
            done()
        }, (error)=>{
            console.info('Sensor_GetAltitude_004 failed');
            expect(false).assertTrue();
            done()
        });
    })

    /*
    * @tc.name: Sensor_GetAltitude_005
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: I5SWJI
    * @tc.author:
    */
    it('Sensor_GetAltitude_005', 0, async function (done) {
        console.info('Sensor_GetAltitude_005 start')
        try {
            sensor.getDeviceAltitude()
        } catch(error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
        console.info("Sensor_GetAltitude_005 end")
    })

    /*
    * @tc.name: Sensor_GetAltitude_006
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: I5SWJI
    * @tc.author:
    */
    it('Sensor_GetAltitude_006', 0, async function (done) {
        console.info('Sensor_GetAltitude_006 start')
        try {
            sensor.getDeviceAltitude("invalid", 0, (error, data) => {
                if (error) {
                    console.info('Sensor_GetAltitude_006 failed');
                    expect(false).assertTrue();
                } else {
                   console.info("Sensor_GetAltitude_006" + data)
                   expect(data).assertEqual(getGeomagneticDipResult[0])
                }
                done()
                console.info('Sensor_GetAltitude_006' + 'lengh:' + data.length);
            })
        } catch(error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
        console.info("Sensor_GetGeomagneticDip_004 end")
    })

    /*
    * @tc.name: Sensor_GetAltitude_007
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: I5SWJI
    * @tc.author:
    */
    it('Sensor_GetAltitude_007', 0, async function (done) {
        console.info('Sensor_GetAltitude_007 start')
        try {
            sensor.getDeviceAltitude().then((data)=>{
                console.info("Sensor_GetAltitude_007" + data)
                expect(true).assertfalse()
                done()
            }, (error)=>{
                expect(true).assertfalse()
                done()
            })
        } catch(error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
        console.info("Sensor_GetAltitude_007 end")
    })

    /*
    * @tc.name: Sensor_GetAltitude_008
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: I5SWJI
    * @tc.author:
    */
    it('Sensor_GetAltitude_008', 0, async function (done) {
        console.info('Sensor_GetAltitude_008 start')
        try {
            sensor.getDeviceAltitude("invalid", 0).then((data)=>{
                console.info("Sensor_GetAltitude_008" + data)
                expect(true).assertfalse()
                done()
            }, (error)=>{
                expect(true).assertfalse()
                done()
            })
        } catch(error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
        console.info("Sensor_GetAltitude_008 end")
    })

    let transformCoordinateSystemResult = [
    [1.500000, 1.500000, 1.500000, 1.500000, 1.500000, 1.500000, 1.500000, 1.500000, 1.500000],
    [340282001837565600000000000000000000000.000000, 340282001837565600000000000000000000000.000000, 340282001837565600000000000000000000000.000000,
     340282001837565600000000000000000000000.000000, 340282001837565600000000000000000000000.000000, 340282001837565600000000000000000000000.000000,
     340282001837565600000000000000000000000.000000, 340282001837565600000000000000000000000.000000, 340282001837565600000000000000000000000.000000],
     [Infinity, -Infinity, Infinity, Infinity, -Infinity, Infinity, Infinity, -Infinity, Infinity]]

    /*
    * @tc.name: Sensor_TransformCoordinateSystem_001
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2TR
    * @tc.author:
    */
     it('Sensor_TransformCoordinateSystem_001', 0, async function (done) {
        console.info("---------------------------Sensor_TransformCoordinateSystem_001----------------------------------");
        sensor.transformRotationMatrix([1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5], {'x':1, 'y':2}, (error, data) => {
            if (error) {
                console.info('Sensor_TransformCoordinateSystem_001 failed');
                expect(false).assertTrue();
            } else {
                console.info("Sensor_TransformCoordinateSystem_001 " + JSON.stringify(data));
                expect(JSON.stringify(data)).assertEqual(JSON.stringify(transformCoordinateSystemResult[0]))
            }
            done()
        })
    })

    /*
    * @tc.name: Sensor_TransformCoordinateSystem_002
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2TR
    * @tc.author:
    */
    it('Sensor_TransformCoordinateSystem_002', 0, async function (done) {
        console.info("---------------------------Sensor_TransformCoordinateSystem_002----------------------------------");
        sensor.transformRotationMatrix([3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38, 3.40282e+38], {'x':1, 'y':2}, (error, data) => {
            if (error) {
                console.info('Sensor_TransformCoordinateSystem_002 failed');
                expect(false).assertTrue();
            } else {
                console.info("Sensor_TransformCoordinateSystem_002 " + JSON.stringify(data));
                expect(JSON.stringify(data)).assertEqual(JSON.stringify(transformCoordinateSystemResult[1]))
            }
            done()
        })
    })

    /*
    * @tc.name: Sensor_TransformCoordinateSystem_003
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2TR
    * @tc.author:
    */
    it("Sensor_TransformCoordinateSystem_003", 0, async function (done) {
        console.info("---------------------------Sensor_TransformCoordinateSystem_003----------------------------------");
        sensor.transformRotationMatrix([1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5], {'x':1, 'y':2}).then((data) => {
            for (var i = 0; i < data.length; i++) {
                console.info("Sensor_TransformCoordinateSystem_003 data[ " + i + "] = " + data[i]);
                expect(data[i]).assertEqual(transformCoordinateSystemResult[0][i]);
            }
            done()
        }, (error)=>{
            console.info('Sensor_TransformCoordinateSystem_003 failed');
            expect(false).assertTrue();
            done()
        });
    })

    /*
    * @tc.name: Sensor_TransformCoordinateSystem_004
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2TR
    * @tc.author:
    */
    it("Sensor_TransformCoordinateSystem_004", 0, async function (done) {
        console.info("---------------------------Sensor_TransformCoordinateSystem_004----------------------------------");
        sensor.transformRotationMatrix([3.40282e+39, 3.40282e+39, 3.40282e+39, 3.40282e+39, 3.40282e+39, 3.40282e+39, 3.40282e+39, 3.40282e+39, 3.40282e+39], {'x':1, 'y':3}).then((data) => {
            for (var i = 0; i < data.length; i++) {
                console.info("Sensor_TransformCoordinateSystem_004 data[ " + i + "] = " + data[i]);
                expect(data[i]).assertEqual(transformCoordinateSystemResult[2][i]);
            }
            done()
        }, (error)=>{
            console.info('Sensor_TransformCoordinateSystem_004 failed');
            expect(false).assertTrue();
            done()
        });
    })

    /*
    * @tc.name: Sensor_TransformCoordinateSystem_005
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: I5SWJI
    * @tc.author:
    */
    it('Sensor_TransformCoordinateSystem_005', 0, async function (done) {
        console.info('Sensor_TransformCoordinateSystem_005 start')
        try {
            sensor.transformRotationMatrix()
        } catch(error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
        console.info("Sensor_TransformCoordinateSystem_005 end")
    })

    /*
    * @tc.name: Sensor_TransformCoordinateSystem_006
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: I5SWJI
    * @tc.author:
    */
    it('Sensor_TransformCoordinateSystem_006', 0, async function (done) {
        console.info('Sensor_TransformCoordinateSystem_006 start')
        try {
            sensor.transformRotationMatrix("invalid", 0, (error, data) => {
                if (error) {
                    console.info('Sensor_TransformCoordinateSystem_006 failed');
                    expect(false).assertTrue();
                } else {
                   console.info("Sensor_TransformCoordinateSystem_006" + data)
                   expect(data).assertEqual(getGeomagneticDipResult[0])
                }
                done()
            })
        } catch(error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
        console.info("Sensor_GetGeomagneticDip_004 end")
    })

    /*
    * @tc.name: Sensor_TransformCoordinateSystem_007
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: I5SWJI
    * @tc.author:
    */
    it('Sensor_TransformCoordinateSystem_007', 0, async function (done) {
        console.info('Sensor_TransformCoordinateSystem_007 start')
        try {
            sensor.transformRotationMatrix().then((data)=>{
                console.info("Sensor_TransformCoordinateSystem_007" + data)
                expect(true).assertfalse()
                done()
            }, (error)=>{
                expect(true).assertfalse()
                done()
            })
        } catch(error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
        console.info("Sensor_TransformCoordinateSystem_007 end")
    })

    /*
    * @tc.name: Sensor_TransformCoordinateSystem_008
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: I5SWJI
    * @tc.author:
    */
    it('Sensor_TransformCoordinateSystem_008', 0, async function (done) {
        console.info('Sensor_TransformCoordinateSystem_008 start')
        try {
            sensor.transformRotationMatrix("invalid", 0).then((data)=>{
                console.info("Sensor_TransformCoordinateSystem_008" + data)
                expect(true).assertfalse()
                done()
            }, (error)=>{
                expect(true).assertfalse()
                done()
            })
        } catch(error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
        console.info("Sensor_TransformCoordinateSystem_008 end")
    })

    /*
    * @tc.name: Sensor_TransformCoordinateSystem_009
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: I5SWJI
    * @tc.author:
    */
    it('Sensor_TransformCoordinateSystem_009', 0, async function (done) {
        console.info('Sensor_TransformCoordinateSystem_008 start')
        try {
            sensor.transformRotationMatrix([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], {'x':1, 'y':1}).then((data)=>{
                console.info("Sensor_TransformCoordinateSystem_009" + data)
                expect(true).assertfalse()
                done()
            }, (error)=>{
                expect(true).assertfalse()
                done()
            })
        } catch(error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
        console.info("Sensor_TransformCoordinateSystem_009 end")
    })

    /*
    * @tc.name: Sensor_TransformCoordinateSystem_010
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: I5SWJI
    * @tc.author:
    */
    it('Sensor_TransformCoordinateSystem_010', 0, async function (done) {
        console.info('Sensor_TransformCoordinateSystem_010 start')
        try {
            sensor.transformRotationMatrix([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], {'x':1, 'y':1}, (error, data) => {
                if (error) {
                    console.info('Sensor_TransformCoordinateSystem_010 failed');
                    expect(false).assertTrue();
                } else {
                   console.info("Sensor_TransformCoordinateSystem_010" + data)
                   expect(data).assertEqual(getGeomagneticDipResult[0])
                }
                done()
            })
        } catch(error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
        console.info("Sensor_TransformCoordinateSystem_010 end")
    })

    /*
    * @tc.name: Sensor_GetSensorList_001
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2TR
    * @tc.author:
    */
    it("Sensor_GetSensorList_001", 0, async function (done) {
        console.info("---------------------------Sensor_GetSensorList_001----------------------------------");
        sensor.getSensorList().then((data) => {
            console.info("---------------------------Sensor_GetSensorList_001 callback in-----------" + data.length);
            for (var i = 0; i < data.length; i++) {
                console.info("Sensor_GetSensorList_001 " + JSON.stringify(data[i]));
            }
            expect(true).assertTrue();
            done();
        }, (error)=>{
            console.info('Sensor_GetSensorList_001 failed');
            expect(false).assertTrue();
            done();
        });
    })

    /*
    * @tc.name: Sensor_GetSensorList_002
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2TR
    * @tc.author:
    */
    it("Sensor_GetSensorList_002", 0, async function (done) {
        console.info("---------------------------Sensor_GetSensorList_002----------------------------------");
        sensor.getSensorList((error, data) => {
            if (error) {
                console.info('Sensor_GetSensorList_002 failed');
                expect(false).assertTrue();
            } else {
                console.info("---------------------------Sensor_GetSensorList_002 callback in-----------" + data.length);
                for (var i = 0; i < data.length; i++) {
                    console.info("Sensor_GetSensorList_002 " + JSON.stringify(data[i]));
                }
                expect(true).assertTrue();
            }
            done();
        });
    })

    /*
    * @tc.name: Sensor_GetSensorList_003
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2TR
    * @tc.author:
    */
    it("Sensor_GetSensorList_003", 0, async function (done) {
        console.info("---------------------------Sensor_GetSensorList_003----------------------------------");
        try {
            sensor.getSensorList(-1);
        } catch(error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
    })

    /*
    * @tc.name: Sensor_GetSensorList_004
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2TR
    * @tc.author:
    */
    it("Sensor_GetSensorList_004", 0, async function (done) {
        console.info("---------------------------Sensor_GetSensorList_004----------------------------------");
        try {
            sensor.getSensorList(-1).then(data => {
                console.info("Sensor_GetSingleSensor_003 " + JSON.stringify(data));
                expect(false).assertTrue();
                done();
            }), (error => {
                console.info(error);
                expect(error.code).assertEqual(SERVICE_EXCEPTION_CODE);
                expect(error.code).assertEqual(SERVICE_EXCEPTION_MSG);
                done();
            });
        } catch(error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
    })

    /*
    * @tc.name: Sensor_GetSingleSensor_001
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2TR
    * @tc.author:
    */
    it("Sensor_GetSingleSensor_001", 0, async function (done) {
        console.info("---------------------------Sensor_GetSingleSensor_001----------------------------------");
        sensor.getSingleSensor(sensor.SensorId.ACCELEROMETER, (error, data) => {
            if (error) {
                console.info('Sensor_GetSingleSensor_001 failed');
                expect(false).assertTrue();
            } else {
                console.info("---------------------------Sensor_GetSingleSensor_001 callback in-----------" + data.length);
                console.info("Sensor_GetSingleSensor_001 " + JSON.stringify(data));
                expect(true).assertTrue();
            }
            done();
        });
    })

    /*
    * @tc.name: Sensor_GetSingleSensor_002
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2TR
    * @tc.author:
    */
    it("Sensor_GetSingleSensor_002", 0, async function (done) {
        console.info("---------------------------Sensor_GetSingleSensor_002----------------------------------");
        try {
            sensor.getSingleSensor(-1, (error, data) => {
                if (error) {
                    console.info('Sensor_GetSingleSensor_002 failed');
                    expect(true).assertTrue();
                } else {
                    console.info("---------------------------Sensor_GetSingleSensor_002 callback in-----------" + data.length);
                    console.info("Sensor_GetSingleSensor_002 " + JSON.stringify(data));
                    expect(false).assertTrue();
                }
                done();
            });
        } catch(error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
    })

    /*
    * @tc.name: Sensor_GetSingleSensor_003
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2TR
    * @tc.author:
    */
    it("Sensor_GetSingleSensor_003", 0, async function (done) {
        console.info("---------------------------SensorJsTest_114----------------------------------");
        sensor.getSingleSensor(sensor.SensorId.ACCELEROMETER).then((data) => {
            console.info("Sensor_GetSingleSensor_003 " + JSON.stringify(data));
            expect(true).assertTrue();
            done();
        }, (error)=>{
            console.info('Sensor_GetSingleSensor_003 failed');
            expect(false).assertTrue();
            done();
        });
    })

    /*
    * @tc.name: Sensor_GetSingleSensor_004
    * @tc.desc: Verfication results of the incorrect parameters of test interface.
    * @tc.require: AR000GH2TR
    * @tc.author:
    */
    it("Sensor_GetSingleSensor_004", 0, async function (done) {
        console.info("---------------------------Sensor_GetSingleSensor_004----------------------------------");
        try {
            sensor.getSingleSensor(-1).then((data) => {
                console.info("Sensor_GetSingleSensor_004 " + JSON.stringify(data));
                expect(false).assertTrue();
                done();
            }, (error)=>{
                console.info('Sensor_GetSingleSensor_004 success');
                expect(true).assertTrue();
                done();
            });
        } catch(error) {
            console.info(error);
            expect(error.code).assertEqual(PARAMETER_ERROR_CODE);
            expect(error.message).assertEqual(PARAMETER_ERROR_MSG);
            done();
        }
    })

    /*
     * @tc.name:Sensor_SubscribeAccelerometer_001
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: AR000GH2TR
     */
    it("Sensor_SubscribeAccelerometer_001", 0, async function (done) {
        console.info('----------------------Sensor_SubscribeAccelerometer_001---------------------------');
        sensor.subscribeAccelerometer({
            interval: 'normal',
            success: function(data) {
              expect(typeof(data.x)).assertEqual("number");
              expect(typeof(data.y)).assertEqual("number");
              expect(typeof(data.z)).assertEqual("number");
              console.info("SensorJsTest001 success" + JSON.stringify(data));
            },
            fail: function(data, code) {
              expect(false).assertTrue();
              console.error('Subscription failed. Code: ' + code + '; Data: ' + data);
            },
        });
        setTimeout(()=>{
            try {
                sensor.unsubscribeAccelerometer();
            } catch (error) {
                console.info('SensorJsTest001 unsubscribe failed' + error);
                expect(false).assertTrue();
            }
            setTimeout(()=>{
                expect(true).assertTrue();
                done();
            }, 500);
        }, 1000);
    })

    /*
     * @tc.name:Sensor_SubscribeAccelerometer_002
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: AR000GH2TR
     */
    it("Sensor_SubscribeAccelerometer_002", 0, async function (done) {
        console.info('----------------------Sensor_SubscribeAccelerometer_002---------------------------');
        sensor.subscribeAccelerometer({
            interval: 'xxx',
            success: function(data) {
              expect(false).assertTrue();
              console.info("Sensor_SubscribeAccelerometer_002 success" + JSON.stringify(data));
              done();
            },
            fail: function(data, code) {
              expect(true).assertTrue();
              console.error('Sensor_SubscribeAccelerometer_002 Subscription failed. Code: ' + code + '; Data: ' + data);
              done();
            },
        });
    })

    /*
     * @tc.name:Sensor_SubscribeAccelerometer_003
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: AR000GH2TR
     */
    it("Sensor_SubscribeAccelerometer_003", 0, async function (done) {
        console.info('----------------------Sensor_SubscribeAccelerometer_003---------------------------');
        try {
            sensor.subscribeAccelerometer({
                interval: 'xxx',
                success: function(data) {
                  expect(false).assertTrue();
                  console.info("Sensor_SubscribeAccelerometer_003 success" + JSON.stringify(data));
                }
            });
        } catch (error) {
            console.info('Sensor_SubscribeAccelerometer_003 Subscription failed' + error);
            expect(false).assertTrue();
        }
        setTimeout(()=>{
            expect(true).assertTrue();
            done();
        }, 500);
    })

    /*
     * @tc.name:Sensor_SubscribeAccelerometer_004
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: AR000GH2TR
     */
    it("Sensor_SubscribeAccelerometer_004", 0, async function (done) {
        console.info('----------------------Sensor_SubscribeAccelerometer_004---------------------------');
        try {
            sensor.subscribeAccelerometer({
                interval: 'normal',
            });
        } catch (error) {
            console.info('Sensor_SubscribeAccelerometer_004 Subscription failed' + error);
            expect(false).assertTrue();
        }
        setTimeout(()=>{
            expect(true).assertTrue();
            done();
        }, 500);
    })

    /*
     * @tc.name:Sensor_UnsubscribeAccelerometer_001
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: AR000GH2TR
     */
    it("Sensor_UnsubscribeAccelerometer_001", 0, async function (done) {
        console.info('----------------------Sensor_UnsubscribeAccelerometer_001---------------------------');
        try {
            sensor.unsubscribeAccelerometer();
        } catch (error) {
            console.info(error);
            expect(false).assertTrue();
        }
        setTimeout(()=>{
            expect(true).assertTrue();
            done();
        }, 500);
    })

    /*
     * @tc.name:Sensor_UnsubscribeAccelerometer_002
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: AR000GH2TR
     */
    it("Sensor_UnsubscribeAccelerometer_002", 0, async function (done) {
        console.info('----------------------Sensor_UnsubscribeAccelerometer_002---------------------------');
        try {
            sensor.unsubscribeAccelerometer('xxx');
        } catch (error) {
            console.info(error);
            expect(false).assertTrue();
        }
        setTimeout(()=>{
            expect(true).assertTrue();
            done();
        }, 500);
    })
})
