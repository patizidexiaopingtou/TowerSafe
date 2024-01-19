/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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

import { AsyncCallback } from "./basic";
import ExtensionContext from "./application/ExtensionContext";
import Want from './@ohos.app.ability.Want';
import dataSharePredicates from './@ohos.data.dataSharePredicates';
import { ValuesBucket } from './@ohos.data.ValuesBucket';

/**
 * This module provides data sharing and expansion capabilities.
 *
 * @since 9
 * @syscap SystemCapability.DistributedDataManager.DataShare.Provider
 * @systemapi Hide this for inner system use.
 * @StageModelOnly
 */
export default class DataShareExtensionAbility {
    /**
     * Indicates datashare extension ability context.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Provider
     * @systemapi Hide this for inner system use.
     * @StageModelOnly
     */
    context?: ExtensionContext;

    /**
     * Called back when a datashare extension ability is started for initialization.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Provider
     * @param want Indicates connection information about the datashare extension ability.
     * @systemapi Hide this for inner system use.
     * @StageModelOnly
     */
    onCreate?(want: Want, callback: AsyncCallback<void>): void;

    /**
     * Inserts a data record into the database. This method should be implemented by a data share.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Provider
     * @param uri Indicates the position where the data is to insert.
     * @param valueBucket Indicates the data to insert.
     * @param callback Returns the index of the newly inserted data record.
     * @systemapi Hide this for inner system use.
     * @StageModelOnly
     */
    insert?(uri: string, valueBucket: ValuesBucket, callback: AsyncCallback<number>): void;

    /**
     * Updates one or more data records in the database. This method should be implemented by a data share.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Provider
     * @param uri Indicates the database table storing the data to update.
     * @param predicates Indicates filter criteria. If this parameter is null, all data records will be updated by
     *        default.
     * @param valueBucket Indicates the data to update. This parameter can be null.
     * @param callback Returns the number of data records updated.
     * @systemapi Hide this for inner system use.
     * @StageModelOnly
     */
    update?(uri: string, predicates: dataSharePredicates.DataSharePredicates, valueBucket: ValuesBucket,
        callback: AsyncCallback<number>): void;

    /**
     * Deletes one or more data records. This method should be implemented by a data share.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Provider
     * @param uri Indicates the database table storing the data to delete.
     * @param predicates Indicates filter criteria. If this parameter is null, all data records will be deleted by
     *     default.
     * @param callback Returns the number of data records deleted.
     * @systemapi Hide this for inner system use.
     * @StageModelOnly
     */
    delete?(uri: string, predicates: dataSharePredicates.DataSharePredicates, callback: AsyncCallback<number>): void;

    /**
     * Queries one or more data records in the database. This method should be implemented by a data share.
     * Only RDB and distributed KVDB resultsets are supported. The current version does not support custom resultsets.
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Provider
     * @param uri Indicates the database table storing the data to query.
     * @param predicates Indicates filter criteria. If this parameter is null, all data records will be queried by
     *                   default.
     * @param columns Indicates the columns to be queried, in array, for example, {"name","age"}. You should define
     *                the processing logic when this parameter is null.
     * @param callback Returns the queried data, only support result set of rdb or kvstore.
     * @systemapi Hide this for inner system use.
     * @StageModelOnly
     */
    query?(uri: string, predicates: dataSharePredicates.DataSharePredicates, columns: Array<string>,
        callback: AsyncCallback<Object>): void;

    /**
     * Inserts multiple data records into the database. This method should be implemented by a data share.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Provider
     * @param uri Indicates the position where the data is to insert.
     * @param valueBuckets Indicates the data to insert.
     * @param callback Returns the number of data records inserted.
     * @systemapi Hide this for inner system use.
     * @StageModelOnly
     */
    batchInsert?(uri: string, valueBuckets: Array<ValuesBucket>, callback: AsyncCallback<number>): void;

    /**
     * Converts the given {@code uri} that refer to the data share into a normalized URI. A normalized URI can be
     * used across devices, persisted, backed up, and restored. It can refer to the same item in the data share
     * even if the context has changed.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Provider
     * @param uri Indicates the uri to normalize.
     * @param callback Returns the normalized uri if the data share supports URI normalization;
     * @systemapi Hide this for inner system use.
     * @StageModelOnly
     */
    normalizeUri?(uri: string, callback: AsyncCallback<string>): void;

    /**
     * Converts the given normalized {@code uri} generated by {@link #normalizeUri(uri)} into a denormalized one.
     * The default implementation of this method returns the original uri passed to it.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Provider
     * @param uri Indicates the uri to denormalize.
     * @param callback Returns the denormalized {@code uri} object if the denormalization is successful; returns
     *                 the original
     * @systemapi Hide this for inner system use.
     * {@code uri} passed to this method if there is nothing to do; returns {@code null} if the data identified by
     * the original {@code uri} cannot be found in the current environment.
     * @StageModelOnly
     */
    denormalizeUri?(uri: string, callback: AsyncCallback<string>): void;
}