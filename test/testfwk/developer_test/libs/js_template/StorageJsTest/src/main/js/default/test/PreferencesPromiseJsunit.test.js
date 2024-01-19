/*
* Copyright (c) 2021 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from 'deccjsunit/index'
import data_preferences from '@ohos.data.preferences'
import featureAbility from '@ohos.ability.featureAbility';

const NAME = 'test_preferences';
const KEY_TEST_INT_ELEMENT = 'key_test_int';
const KEY_TEST_LONG_ELEMENT = 'key_test_long';
const KEY_TEST_FLOAT_ELEMENT = 'key_test_float';
const KEY_TEST_BOOLEAN_ELEMENT = 'key_test_boolean';
const KEY_TEST_STRING_ELEMENT = 'key_test_string';
const KEY_TEST_NUMBER_ARRAY_ELEMENT = 'key_test_number_array'
const KEY_TEST_STRING_ARRAY_ELEMENT = 'key_test_string_array'
const KEY_TEST_BOOL_ARRAY_ELEMENT = 'key_test_bool_array'
var mPreferences;
var context;

describe('preferencesTest', function () {
    beforeAll(async function () {
        console.info('beforeAll')
        context = featureAbility.getContext()
        mPreferences = await data_preferences.getPreferences(context, NAME);
    })

    afterAll(async function () {
        console.info('afterAll')
        await data_preferences.deletePreferences(context, NAME);
    })

    /**
     * @tc.name put StringArray promise interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0131
     * @tc.desc put StringArray promise interface test
     */
    it('testPreferencesPutStringArray0131', 0, async function (done) {
        await mPreferences.clear();
        var stringArr = ['1', '2', '3']
        let promise1 = mPreferences.put(KEY_TEST_STRING_ARRAY_ELEMENT, stringArr)
        await promise1
        let promise2 = mPreferences.get(KEY_TEST_STRING_ARRAY_ELEMENT, ['123', '321'])
        promise2.then((pre) => {
            for (let i = 0; i < stringArr.length; i++) {
                expect(stringArr[i]).assertEqual(pre[i]);
            }

        }).catch((err) => {
            expect(null).assertFail();
        })
        await promise2

        done();
    });

    /**
     * @tc.name put NumberArray promise interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0132
     * @tc.desc put NumberArray promise interface test
     */
    it('testPreferencesPutNumberArray0132', 0, async function (done) {
        await mPreferences.clear();
        var numberArr = [11, 22, 33, 44, 55]
        let promise1 = mPreferences.put(KEY_TEST_NUMBER_ARRAY_ELEMENT, numberArr)
        await promise1
        let promise2 = mPreferences.get(KEY_TEST_NUMBER_ARRAY_ELEMENT, [123, 321])
        promise2.then((pre) => {
            for (let i = 0; i < numberArr.length; i++) {
                expect(numberArr[i]).assertEqual(pre[i]);
            }
        }).catch((err) => {
            expect(null).assertFail();
        })
        await promise2

        done();
    });

    /**
     * @tc.name put BoolArray promise interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0133
     * @tc.desc put BoolArray promise interface test
     */
    it('testPreferencesPutBoolArray0133', 0, async function (done) {
        await mPreferences.clear();
        var boolArr = [true, true, false]
        let promise1 = mPreferences.put(KEY_TEST_BOOL_ARRAY_ELEMENT, boolArr)
        await promise1
        let promise2 = mPreferences.get(KEY_TEST_BOOL_ARRAY_ELEMENT, [false, true])
        promise2.then((pre) => {
            for (let i = 0; i < boolArr.length; i++) {
                expect(boolArr[i]).assertEqual(pre[i]);
            }
        }).catch((err) => {
            expect(null).assertFail();
        })
        await promise2

        done();
    });

    /**
     * @tc.name getAll promise interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0133
     * @tc.desc getAll promise interface test
     */
    it('testPreferencesGetAll0001', 0, async function (done) {
        await mPreferences.clear();
        let doubleArr = [11, 22, 33]
        let stringArr = ['11', '22', '33']
        let boolArr = [true, false, false, true]
        await mPreferences.put(KEY_TEST_STRING_ARRAY_ELEMENT, stringArr)
        await mPreferences.put(KEY_TEST_BOOL_ARRAY_ELEMENT, boolArr)
        await mPreferences.put(KEY_TEST_NUMBER_ARRAY_ELEMENT, doubleArr)
        await mPreferences.put(KEY_TEST_BOOLEAN_ELEMENT, false)
        await mPreferences.put(KEY_TEST_STRING_ELEMENT, "123")
        await mPreferences.put(KEY_TEST_FLOAT_ELEMENT, 123.1)

        await mPreferences.flush()

        let promise = mPreferences.getAll()
        promise.then((obj) => {
            expect(false).assertEqual(obj.key_test_boolean)
            expect("123").assertEqual(obj.key_test_string)
            expect(123.1).assertEqual(obj.key_test_float)
            let sArr = obj.key_test_string_array
            for (let i = 0; i < sArr.length; i++) {
                expect(sArr[i]).assertEqual(stringArr[i]);
            }

            let bArr = obj.key_test_bool_array
            for (let i = 0; i < bArr.length; i++) {
                expect(bArr[i]).assertEqual(boolArr[i]);
            }

            let nArr = obj.key_test_number_array
            for (let i = 0; i < nArr.length; i++) {
                expect(nArr[i]).assertEqual(doubleArr[i]);
            }
        }).catch((err) => {
            expect(null).assertFail();
        })
        await promise

        done();
    })

    /**
     * @tc.name clear promise interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Promise_0010
     * @tc.desc clear promise interface test
     */
    it('testPreferencesClear0011', 0, async function (done) {
        await mPreferences.put(KEY_TEST_STRING_ELEMENT, "test");
        await mPreferences.flush();
        const promise = mPreferences.clear();
        promise.then(async (ret) => {
            let per = await mPreferences.get(KEY_TEST_STRING_ELEMENT, "defaultvalue");
            done();
            expect("defaultvalue").assertEqual(per);
        }).catch((err) => {
            expect(null).assertFail();
        });
        await promise;
    })

    /**
     * @tc.name has string interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0020
     * @tc.desc has string interface test
     */
    it('testPreferencesHasKey0031', 0, async function (done) {
        await mPreferences.put(KEY_TEST_STRING_ELEMENT, "test");
        const promise = mPreferences.has(KEY_TEST_STRING_ELEMENT);
        promise.then((ret) => {
            expect(true).assertEqual(ret);
        }).catch((err) => {
            expect(null).assertFail();
        });
        await promise;
        done();
    })

    /**
     * @tc.name has int interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0140
     * @tc.desc has int interface test
     */
    it('testPreferencesHasKey0032', 0, async function (done) {
        await mPreferences.put(KEY_TEST_INT_ELEMENT, 1);
        const promise = mPreferences.has(KEY_TEST_INT_ELEMENT);
        promise.then((ret) => {
            expect(true).assertEqual(ret);
        }).catch((err) => {
            expect(null).assertFail();
        });
        await promise;
        done();
    })

    /**
     * @tc.name has float interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0150
     * @tc.desc has float interface test
     */
    it('testPreferencesHasKey0033', 0, async function (done) {
        await mPreferences.put(KEY_TEST_FLOAT_ELEMENT, 2.0);
        const promise = mPreferences.has(KEY_TEST_FLOAT_ELEMENT);
        promise.then((ret) => {
            expect(true).assertEqual(ret);
        }).catch((err) => {
            expect(null).assertFail();
        });
        await promise;
        done();
    })

    /**
     * @tc.name has boolean interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0160
     * @tc.desc has boolean interface test
     */
    it('testPreferencesHasKey0034', 0, async function (done) {
        await mPreferences.put(KEY_TEST_BOOLEAN_ELEMENT, false);
        const promise = mPreferences.has(KEY_TEST_BOOLEAN_ELEMENT);
        promise.then((ret) => {
            expect(true).assertEqual(ret);
        }).catch((err) => {
            expect(null).assertFail();
        });
        await promise;
        done();
    })

    /**
     * @tc.name has long interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0170
     * @tc.desc has long interface test
     */
    it('testPreferencesHasKey0035', 0, async function (done) {
        await mPreferences.put(KEY_TEST_LONG_ELEMENT, 0);
        const promise = mPreferences.has(KEY_TEST_LONG_ELEMENT);
        promise.then((ret) => {
            expect(true).assertEqual(ret);
        }).catch((err) => {
            expect(null).assertFail();
        });
        await promise;
        done();
    })

    /**
     * @tc.name get string promise interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0030
     * @tc.desc get string promise interface test
     */
    it('testPreferencesGetDefValue0061', 0, async function (done) {
        await mPreferences.clear();
        const promise = mPreferences.get(KEY_TEST_STRING_ELEMENT, "defaultValue");
        promise.then((ret) => {
            expect('defaultValue').assertEqual(ret);
        }).catch((err) => {
            expect(null).assertFail();
        });
        await promise;
        done();
    })

    /**
     * @tc.name get float promise interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0040
     * @tc.desc get float promise interface test
     */
    it('testPreferencesGetFloat0071', 0, async function (done) {
        await mPreferences.clear();
        await mPreferences.put(KEY_TEST_FLOAT_ELEMENT, 3.0);
        const promise = mPreferences.get(KEY_TEST_FLOAT_ELEMENT, 0.0);
        promise.then((ret) => {
            expect(3.0).assertEqual(ret);
        }).catch((err) => {
            expect(null).assertFail();
        });
        await promise;
        done();
    })

    /**
     * @tc.name get int promise interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0050
     * @tc.desc get int promise interface test
     */
    it('testPreferencesGetInt0081', 0, async function (done) {
        await mPreferences.clear();
        await mPreferences.put(KEY_TEST_INT_ELEMENT, 3);
        const promise = mPreferences.get(KEY_TEST_INT_ELEMENT, 0.0);
        promise.then((ret) => {
            expect(3).assertEqual(ret);
        }).catch((err) => {
            expect(null).assertFail();
        });
        await promise;
        done();
    })

    /**
     * @tc.name get long promise interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0060
     * @tc.desc get long promise interface test
     */
    it('testPreferencesGetLong0091', 0, async function (done) {
        await mPreferences.clear();
        await mPreferences.put(KEY_TEST_LONG_ELEMENT, 3);
        const promise = mPreferences.get(KEY_TEST_LONG_ELEMENT, 0);
        promise.then((ret) => {
            expect(3).assertEqual(ret);
        }).catch((err) => {
            expect(null).assertFail();
        });
        await promise;
        done();
    })

    /**
     * @tc.name get String promise interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0070
     * @tc.desc get String promise interface test
     */
    it('tesPreferencesGetString101', 0, async function (done) {
        await mPreferences.clear();
        await mPreferences.put(KEY_TEST_STRING_ELEMENT, "test");
        await mPreferences.flush();
        const promise = mPreferences.get(KEY_TEST_STRING_ELEMENT, "defaultvalue");
        promise.then((ret) => {
            expect('test').assertEqual(ret);
        }).catch((err) => {
            expect(null).assertFail();
        });
        await promise;
        done();
    })

    /**
     * @tc.name put boolean promise interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0090
     * @tc.desc put boolean promise interface test
     */
    it('testPreferencesPutBoolean0121', 0, async function (done) {
        const promise = mPreferences.put(KEY_TEST_BOOLEAN_ELEMENT, true);
        promise.then(async (ret) => {
            let per = await mPreferences.get(KEY_TEST_BOOLEAN_ELEMENT, false);
            expect(true).assertEqual(per);
            await mPreferences.flush();
            let per2 = await mPreferences.get(KEY_TEST_BOOLEAN_ELEMENT, false);
            done();
            expect(true).assertEqual(per2);
        }).catch((err) => {
            expect(null).assertFail();
        });
        await promise;
    })

    /**
     * @tc.name put float promise interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0100
     * @tc.desc put float promise interface test
     */
    it('testPreferencesPutFloat0131', 0, async function (done) {
        const promise = mPreferences.put(KEY_TEST_FLOAT_ELEMENT, 4.0);
        promise.then(async (ret) => {
            let per = await mPreferences.get(KEY_TEST_FLOAT_ELEMENT, 0.0);
            expect(4.0).assertEqual(per);
            await mPreferences.flush();
            let per2 = await mPreferences.get(KEY_TEST_FLOAT_ELEMENT, 0.0);
            done();
            expect(4.0).assertEqual(per2);
        }).catch((err) => {
            expect(null).assertFail();
        });
        await promise;
    })

    /**
     * @tc.name put int promise interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0110
     * @tc.desc put int promise interface test
     */
    it('testPreferencesPutInt0141', 0, async function (done) {
        const promise = mPreferences.put(KEY_TEST_INT_ELEMENT, 4);
        promise.then(async (ret) => {
            let per = await mPreferences.get(KEY_TEST_INT_ELEMENT, 0);
            expect(4).assertEqual(per);
            await mPreferences.flush();
            let per2 = await mPreferences.get(KEY_TEST_INT_ELEMENT, 0);
            done();
            expect(4).assertEqual(per2);
        }).catch((err) => {
            expect(null).assertFail();
        });
        await promise;
    })

    /**
     * @tc.name put long promise interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0120
     * @tc.desc put long promise interface test
     */
    it('testPreferencesPutLong0151', 0, async function (done) {
        const promise = mPreferences.put(KEY_TEST_LONG_ELEMENT, 4);
        promise.then(async (ret) => {
            let per = await mPreferences.get(KEY_TEST_LONG_ELEMENT, 0);
            expect(4).assertEqual(per);
            await mPreferences.flush();
            let per2 = await mPreferences.get(KEY_TEST_LONG_ELEMENT, 0);
            done();
            expect(4).assertEqual(per2);
        }).catch((err) => {
            expect(null).assertFail();
        });
        await promise;
    })

    /**
     * @tc.name put String promise interface test
     * @tc.number SUB_DDM_AppDataFWK_JSPreferences_Preferences_0130
     * @tc.desc put String promise interface test
     */
    it('testPreferencesPutString0161', 0, async function (done) {
        const promise = mPreferences.put(KEY_TEST_STRING_ELEMENT, '');
        promise.then(async (ret) => {
            let per = await mPreferences.get(KEY_TEST_STRING_ELEMENT, "defaultvalue")
            expect('').assertEqual(per);
            await mPreferences.flush();
            let per2 = await mPreferences.get(KEY_TEST_STRING_ELEMENT, "defaultvalue")
            done();
            expect('').assertEqual(per2);
        }).catch((err) => {
            expect(null).assertFail();
        });
        await promise;
    })
})