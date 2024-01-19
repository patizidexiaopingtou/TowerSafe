/*
* Copyright (c) 2022 Huawei Device Co., Ltd.
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

import { AsyncCallback } from './basic';
import Context from './application/Context';
import DataShareResultSet from './@ohos.data.DataShareResultSet';
import dataSharePredicates from './@ohos.data.dataSharePredicates';
import { ValuesBucket } from './@ohos.data.ValuesBucket';

/**
* This module provides the dataShare capability for consumer.
* @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
* @systemapi
* @StageModelOnly
* @since 9
 */
declare namespace dataShare {
    /**
     * Obtains the dataShareHelper.
     * @param {Context} context - Indicates the application context.
     * @param {string} uri - Indicates the path of the file to open.
     * @param {AsyncCallback<DataShareHelper>} callback - {DataShareHelper}: the dataShareHelper for consumer.
     * @throws {BusinessError} 401 - the parameter check failed.
     * @throws {BusinessError} 15700010 - the DataShareHelper is not initialized successfully.
     * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    function createDataShareHelper(context: Context, uri: string, callback: AsyncCallback<DataShareHelper>): void;

    /**
     * Obtains the dataShareHelper.
     * @param {Context} context - Indicates the application context.
     * @param {string} uri - Indicates the path of the file to open.
     * @returns {Promise<DataShareHelper>} {DataShareHelper}: the dataShareHelper for consumer.
     * @throws {BusinessError} 401 - the parameter check failed.
     * @throws {BusinessError} 15700010 - the DataShareHelper is not initialized successfully.
     * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    function createDataShareHelper(context: Context, uri: string): Promise<DataShareHelper>;

    /**
     * DataShareHelper
     * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
     * @systemapi
     * @StageModelOnly
     * @since 9
     */
    interface DataShareHelper {
        /**
         * Registers an observer to observe data specified by the given uri.
         * @param {string} type - type must be 'dataChange'.
         * @param {string} uri - Indicates the path of the data to operate.
         * @param {AsyncCallback<void>} callback - the callback of on.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        on(type: 'dataChange', uri: string, callback: AsyncCallback<void>): void;

        /**
         * Deregisters an observer used for monitoring data specified by the given uri.
         * @param {string} type - type must be 'dataChange'.
         * @param {string} uri - Indicates the path of the data to operate.
         * @param {AsyncCallback<void>} callback - the callback of off.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        off(type: 'dataChange', uri: string, callback?: AsyncCallback<void>): void;

        /**
         * Inserts a single data record into the database.
         * @param {string} uri - Indicates the path of the data to operate.
         * @param {ValueBucket} value - Indicates the data record to insert. If this parameter is null,
         * a blank row will be inserted.
         * @param {AsyncCallback<number>} callback - {number}: the index of the inserted data record.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        insert(uri: string, value: ValuesBucket, callback: AsyncCallback<number>): void;

        /**
         * Inserts a single data record into the database.
         * @param {string} uri - Indicates the path of the data to operate.
         * @param {ValueBucket} value - Indicates the data record to insert. If this parameter is null,
         * a blank row will be inserted.
         * @returns {Promise<number>} {number}: the index of the inserted data record.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        insert(uri: string, value: ValuesBucket): Promise<number>;

        /**
         * Deletes one or more data records from the database.
         * @param {string} uri  - Indicates the path of the data to operate.
         * @param {dataSharePredicates.DataSharePredicates} predicates - Indicates filter criteria.
         * You should define the processing logic when this parameter is null.
         * @param {AsyncCallback<number>} callback - {number}: the number of data records deleted.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        delete(uri: string, predicates: dataSharePredicates.DataSharePredicates, callback: AsyncCallback<number>): void;

        /**
         * Deletes one or more data records from the database.
         * @param {string} uri - Indicates the path of the data to operate.
         * @param {dataSharePredicates.DataSharePredicates} predicates - Indicates filter criteria.
         * You should define the processing logic when this parameter is null.
         * @returns {Promise<number>} {number}: the number of data records deleted.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        delete(uri: string, predicates: dataSharePredicates.DataSharePredicates): Promise<number>;

        /**
         * Queries data in the database.
         * @param {string} uri - Indicates the path of data to query.
         * @param {dataSharePredicates.DataSharePredicates} predicates - Indicates filter criteria.
         * You should define the processing logic when this parameter is null.
         * @param {Array<string>} columns - Indicates the columns to query.
         * If this parameter is null, all columns are queried.
         * @param {AsyncCallback<DataShareResultSet>} callback - {DataShareResultSet}: the query result.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        query(uri: string, predicates: dataSharePredicates.DataSharePredicates, columns: Array<string>,
              callback: AsyncCallback<DataShareResultSet>): void;

        /**
         * Queries data in the database.
         * @param {string} uri - Indicates the path of data to query.
         * @param {dataSharePredicates.DataSharePredicates} predicates - Indicates filter criteria.
         * You should define the processing logic when this parameter is null.
         * @param {Array<string>} columns - Indicates the columns to query.
         * If this parameter is null, all columns are queried.
         * @returns {Promise<DataShareResultSet>} {DataShareResultSet}: the query result.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        query(uri: string, predicates: dataSharePredicates.DataSharePredicates,
              columns: Array<string>): Promise<DataShareResultSet>;

        /**
         * Updates data records in the database.
         * @param {string} uri - Indicates the path of data to update.
         * @param {dataSharePredicates.DataSharePredicates} predicates - Indicates filter criteria.
         * You should define the processing logic when this parameter is null.
         * @param {ValueBucket} value - Indicates the data to update. This parameter can be null.
         * @param {AsyncCallback<number>} callback - {number}: the number of data records updated.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        update(uri: string, predicates: dataSharePredicates.DataSharePredicates, value: ValuesBucket,
               callback: AsyncCallback<number>): void;

        /**
         * Updates data records in the database.
         * @param {string} uri - Indicates the path of data to update.
         * @param {dataSharePredicates.DataSharePredicates} predicates - Indicates filter criteria.
         * You should define the processing logic when this parameter is null.
         * @param {ValueBucket} value - Indicates the data to update. This parameter can be null.
         * @returns {Promise<number>} {number}: the number of data records updated.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        update(uri: string, predicates: dataSharePredicates.DataSharePredicates, value: ValuesBucket): Promise<number>;

        /**
         * Inserts multiple data records into the database.
         * @param {string} uri - Indicates the path of the data to operate.
         * @param {Array<ValuesBucket>} values - Indicates the data records to insert.
         * @param {AsyncCallback<number>} callback - {number}: the number of data records inserted.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        batchInsert(uri: string, values: Array<ValuesBucket>, callback: AsyncCallback<number>): void;

        /**
         * Inserts multiple data records into the database.
         * @param {string} uri - Indicates the path of the data to operate.
         * @param {Array<ValuesBucket>} values - Indicates the data records to insert.
         * @returns {Promise<number>} {number}: the number of data records inserted.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        batchInsert(uri: string, values: Array<ValuesBucket>): Promise<number>;

        /**
         * Converts the given {@code uri} that refers to the DataShare into a normalized {@link ohos.utils.net.Uri}.
         * A normalized uri can be used across devices, persisted, backed up, and restored.
         * <p>To transfer a normalized uri from another environment to the current environment, you should call this
         * method again to re-normalize the uri for the current environment or call {@link #denormalizeUri(Uri)}
         * to convert it to a denormalized uri that can be used only in the current environment.
         * @param {string} uri - Indicates the {@link ohos.utils.net.Uri} object to normalize.
         * @param {AsyncCallback<string>} callback - {string}: the normalized Uri,
         * if the DataShare supports uri normalization.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        normalizeUri(uri: string, callback: AsyncCallback<string>): void;

        /**
         * Converts the given {@code uri} that refers to the DataShare into a normalized {@link ohos.utils.net.Uri}.
         * A normalized uri can be used across devices, persisted, backed up, and restored.
         * <p>To transfer a normalized uri from another environment to the current environment, you should call this
         * method again to re-normalize the uri for the current environment or call {@link #denormalizeUri(Uri)}
         * to convert it to a denormalized uri that can be used only in the current environment.
         * @param {string} uri - Indicates the {@link ohos.utils.net.Uri} object to normalize.
         * @returns {Promise<string>} {string}: the normalized Uri if the DataShare supports uri normalization;
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        normalizeUri(uri: string): Promise<string>;

        /**
         * Converts the given normalized {@code uri} generated by {@link #normalizeUri(Uri)} into a denormalized one.
         * @param {string} uri - Indicates the {@link ohos.utils.net.Uri} object to denormalize.
         * @param {AsyncCallback<string>} callback - {string}: the denormalized {@code Uri} object if
         * the denormalization is successful; returns the original {@code Uri} passed to this method if
         * there is nothing to do; returns {@code null} if the data identified by the normalized {@code Uri}
         * cannot be found in the current environment.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        denormalizeUri(uri: string, callback: AsyncCallback<string>): void;

        /**
         * Converts the given normalized {@code uri} generated by {@link #normalizeUri(Uri)} into a denormalized one.
         * @param {string} uri - Indicates the {@link ohos.utils.net.Uri} object to denormalize.
         * @returns {Promise<string>} {string}: the denormalized {@code Uri} object if the denormalization
         * is successful; returns the original {@code Uri} passed to this method if there is nothing to do;
         * returns {@code null} if the data identified by the normalized {@code Uri} cannot be found in the
         * current environment.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        denormalizeUri(uri: string): Promise<string>;

        /**
         * Notifies the registered observers of a change to the data resource specified by Uri.
         * @param {string} uri - Indicates the {@link ohos.utils.net.Uri} object to notifyChange.
         * @param {AsyncCallback<void>} callback - the callback of notifyChange.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        notifyChange(uri: string, callback: AsyncCallback<void>): void;

        /**
         * Notifies the registered observers of a change to the data resource specified by Uri.
         * @param {string} uri - Indicates the {@link ohos.utils.net.Uri} object to notifyChange.
         * @returns {Promise<void>} the promise returned by the function.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Consumer
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        notifyChange(uri: string): Promise<void>;
    }
}

export default dataShare;