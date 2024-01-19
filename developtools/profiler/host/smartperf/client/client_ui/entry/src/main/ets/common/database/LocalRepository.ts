/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import dataRdb from '@ohos.data.rdb'
import database from './DatabaseUtils'
import BundleManager from '../utils/BundleMangerUtils';
import { dateFormat } from '../utils/TimeUtils'
import { ReportItem } from '../entity/LocalConfigEntity'
import { sql_t_general_info, dbVersion, dbName } from '../constant/ConstantSQL';
import { AppFileRealDir } from '../constant/ConstantsPath'
import SPLogger from '../utils/SPLogger'


const TAG = "LocalRepository"


export function initDb(): void {
  dataRdb.getRdbStore(globalThis.abilityContext, {
        name: dbName
  }, dbVersion)
        .then(rdbStore => {
            rdbStore.executeSql(sql_t_general_info, null).catch(err => {
                SPLogger.DEBUG(TAG, "--> createTable t_genneral_info err:" + err)
            })
            SPLogger.DEBUG(TAG, "--> createTable start execute sql_t_genneral_info:" + sql_t_general_info)
            return rdbStore
        })

    getReportListDb().then(res => {
        globalThis.reportList = res
        let bundleNameArr = []
        for (let reportItemKey in globalThis.reportList) {
            bundleNameArr.push(globalThis.reportList[reportItemKey].packageName)
        }

        BundleManager.getIconByBundleName(bundleNameArr).then(map => {
            globalThis.iconMap = map
        })

        let resReport: Array<ReportItem> = res

        globalThis.sumTest = resReport.length
        globalThis.sumTestTime = 0

        let sumTestAppMap = new Map
        for (let resReportKey in resReport) {
            sumTestAppMap.set(resReport[resReportKey].appName, "")
            globalThis.sumTestTime += Number(resReport[resReportKey].testDuration).valueOf()
        }
        globalThis.sumTestApp = sumTestAppMap.size
    }).catch(err => {
        SPLogger.DEBUG(TAG, "getReportListDb ERR:" + err);
    })
}


export async function getReportListDb(): Promise<Array<ReportItem>> {
    var result = Array<ReportItem>()
    await database.queryGeneralData().then(generals => {
        for (var i = 0; i < generals.length; i++) {
            var curGeneralInfo = generals[i]
            result.push(
                new ReportItem(
                curGeneralInfo.taskId.toString(),
                    AppFileRealDir + curGeneralInfo.sessionId.toString(),
                    curGeneralInfo.packageName,
                    "",
                    curGeneralInfo.taskName,
                    curGeneralInfo.appName,
                dateFormat(curGeneralInfo.startTime),
                curGeneralInfo.testDuration.toString(),
                    false
                ))
        }
    })
    return result
}