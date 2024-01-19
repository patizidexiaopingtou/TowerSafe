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

// @ts-ignore
import {TabPaneFileStatistics} from "../../../../../../dist/trace/component/trace/sheet/file-system/TabPaneFilesystemStatistics.js"
// @ts-ignore
import {Utils} from "../../../../../../dist/trace/component/trace/base/Utils.js";

window.ResizeObserver = window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));
describe('TabPaneFileStatistics Test', () => {
    document.body.innerHTML = `<tabpane-file-statistics id="statistics"></tabpane-file-statistics>`
    let tabPaneFileStatistics = document.querySelector<TabPaneFileStatistics>('#statistics')

    it('TabPaneFileStatisticsTest01', function () {
        tabPaneFileStatistics.setInitDua = jest.fn(()=>true);
        let item = {
            allDuration: '',
            minDuration: '',
            avgDuration: '',
            maxDuration: '',
        }
        expect(tabPaneFileStatistics.setInitDua(item)).toBeTruthy();

    });

    it('TabPaneFileStatisticsTest02', function () {
        tabPaneFileStatistics.getInitData = jest.fn(()=>true);
        let item = {
            allDuration: '',
            minDuration: '',
            avgDuration: '',
            maxDuration: '',
        }
        expect(tabPaneFileStatistics.getInitData(item)).toBeTruthy();

    });

    it('TabPaneFileStatisticsTest04', function () {
        tabPaneFileStatistics.showButtomMenu = jest.fn(()=>true);
        let isShow = {
            filter: {
                setAttribute: 'tree, input, inputLeftText'
            }
        }
        expect(tabPaneFileStatistics.showButtomMenu(isShow)).toBeTruthy();

    });

    it('TabPaneFileStatisticsTest08', function () {
        let FileStatistics = new TabPaneFileStatistics();
        let item = {
            allDuration:"",
            minDuration:"",
            avgDuration:"",
            maxDuration:"",
            name:"as",
            logicalWrites:"",
            logicalReads:"",
            otherFile:"0 Bytes",
            pid:1
        }
        Utils.getBinaryByteWithUnit = jest.fn(()=>true)
        expect(FileStatistics.getInitData(item)).toEqual({"allDuration": "",
            "avgDuration": "", "logicalReads": true, "logicalWrites": true, "maxDuration": "",
            "minDuration": "", "name": "as", "node": {"allDuration": "", "avgDuration": "",
            "children": [], "logicalReads": "", "logicalWrites": "", "maxDuration": "",
            "minDuration": "", "name": "as", "otherFile": "0 Bytes", "pid": 1},
            "otherFile": true, "pid": 1, "title": "as(1)"
        });
    });

    it('TabPaneFileStatisticsTest09', function () {
        let FileStatistics = new TabPaneFileStatistics();
        let node = {
            children: []
        }
        // Utils.getBinaryByteWithUnit = jest.fn(()=>true)
        expect(FileStatistics.sortTable(node,'')).toBeUndefined();
    });
})
