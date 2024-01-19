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
import {TabPaneFileSystemDescHistory} from "../../../../../../dist/trace/component/trace/sheet/file-system/TabPaneFileSystemDescHistory.js"
window.ResizeObserver = window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));
describe('TabPaneFileSystemDescHistory Test', () => {

     document.body.innerHTML = `<tabpane-filesystem-desc-history id="history"></tabpane-filesystem-desc-history>`
     let tabPaneFileSystemDescHistory = document.querySelector<TabPaneFileSystemDescHistory>('#history')

     it('TabPaneFileSystemDescHistoryTest01', function () {
         expect(tabPaneFileSystemDescHistory.setProcessFilter).toBeUndefined();

     });

     it('TabPaneFileSystemDescHistoryTest02', function () {
         expect(tabPaneFileSystemDescHistory.filterData).toBeUndefined();

     });

     it('TabPaneFileSystemDescHistoryTest03', function () {
         expect(tabPaneFileSystemDescHistory.data).toBeUndefined();

     });

 })