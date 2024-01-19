/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

import{ AsyncCallback, Callback } from './basic';
import Context from "./application/BaseContext";
import dataSharePredicates from './@ohos.data.dataSharePredicates';

/**
 * Provides methods for rdbStore create and delete.
 *
 * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
 * @since 9
 */
declare namespace relationalStore
{
    /**
     * Obtains a RDB store.
     *
     * You can set parameters of the RDB store as required. In general, this method is recommended
     * to obtain a rdb store.
     *
     * @param {Context} context - indicates the context of application or capability.
     * @param {StoreConfig} config - indicates the {@link StoreConfig} configuration of the database related to this RDB store.
     * @param {AsyncCallback<RdbStore>} callback - the RDB store {@link RdbStore}.
     * @throws {BusinessError} 401 - if the parameter type is incorrect.
     * @throws {BusinessError} 14800010 - if failed open database by invalid database name.
     * @throws {BusinessError} 14800011 - if failed open database by database corrupted.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    function getRdbStore(context: Context, config: StoreConfig, callback: AsyncCallback<RdbStore>): void;

    /**
     * Obtains a RDB store.
     *
     * You can set parameters of the RDB store as required. In general, this method is recommended
     * to obtain a rdb store.
     *
     * @param {Context} context - indicates the context of application or capability.
     * @param {StoreConfig} config - indicates the {@link StoreConfig} configuration of the database related to this RDB store.
     * @returns {Promise<RdbStore>} the RDB store {@link RdbStore}.
     * @throws {BusinessError} 401 - if the parameter type is incorrect.
     * @throws {BusinessError} 14800010 - if failed open database by invalid database name.
     * @throws {BusinessError} 14800011 - if failed open database by database corrupted.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    function getRdbStore(context: Context, config: StoreConfig): Promise<RdbStore>;

    /**
     * Deletes the database with a specified name.
     *
     * @param {Context} context - indicates the context of application or capability.
     * @param {string} name - indicates the database name.
     * @param {AsyncCallback<void>} callback - the callback of deleteRdbStore.
     * @throws {BusinessError} 401 - if the parameter type is incorrect.
     * @throws {BusinessError} 14800010 - if failed delete database by invalid database name.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    function deleteRdbStore(context: Context, name: string, callback: AsyncCallback<void>): void;

    /**
     * Deletes the database with a specified name.
     *
     * @param {Context} context - indicates the context of application or capability.
     * @param {string} name - indicates the database name.
     * @returns {Promise<void>} the promise returned by the function.
     * @throws {BusinessError} 401 - if the parameter type is incorrect.
     * @throws {BusinessError} 14800010 - if failed delete database by invalid database name.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    function deleteRdbStore(context: Context, name: string): Promise<void>;

    /**
     * Manages relational database configurations.
     *
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    interface StoreConfig {
        /**
         * The database name.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        name: string;

        /**
         * Specifies the security level of the database.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        securityLevel: SecurityLevel;

        /**
         * Specifies whether the database is encrypted.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        encrypt ?: boolean;
    }

    /**
     * Describes the {@code RdbStore} type.
     *
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    enum SecurityLevel {
        /**
         * S1: means the db is low level security
         * There are some low impact, when the data is leaked.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
         S1 = 1,

         /**
          * S2: means the db is middle level security
          * There are some major impact, when the data is leaked.
          *
          * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
          * @since 9
          */
         S2 = 2,

         /**
          * S3: means the db is high level security
          * There are some severity impact, when the data is leaked.
          *
          * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
          * @since 9
          */
         S3 = 3,

         /**
          * S4: means the db is critical level security
          * There are some critical impact, when the data is leaked.
          *
          * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
          * @since 9
          */
         S4 = 4,
    }

    /**
     * Indicates possible value types
     *
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    type ValueType = number | string | boolean | Uint8Array;

    /**
     * Values in buckets are stored in key-value pairs
     *
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    type ValuesBucket = { [key:string]: ValueType | Uint8Array | null;}

    /**
     * Indicates the database synchronization mode.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     */
    enum SyncMode {
        /**
         * Indicates the data is pushed to remote device from local device.
         *
         * @since 9
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         */
        SYNC_MODE_PUSH = 0,

        /**
         * Indicates the data is pulled from remote device to local device.
         *
         * @since 9
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         */
        SYNC_MODE_PULL = 1,
    }

    /**
     * Describes the subscription type.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     */
    enum SubscribeType {
        /**
         * Subscription to remote data changes
         * @since 9
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         */
        SUBSCRIBE_TYPE_REMOTE = 0,
    }

    /**
     * Provides methods for managing the relational database (RDB).
     *
     * This class provides methods for creating, querying, updating, and deleting RDBs.
     *
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    interface RdbStore {
        /**
         * Inserts a row of data into the target table.
         *
         * @param {string} table - indicates the target table.
         * @param {ValuesBucket} values - indicates the row of data {@link ValuesBucket} to be inserted into the table.
         * @param {AsyncCallback<number>} callback - the row ID if the operation is successful. returns -1 otherwise.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        insert(table: string, values: ValuesBucket, callback: AsyncCallback<number>): void;

        /**
         * Inserts a row of data into the target table.
         *
         * @param {string} table - indicates the target table.
         * @param {ValuesBucket} values - indicates the row of data {@link ValuesBucket} to be inserted into the table.
         * @returns {Promise<void>} the row ID if the operation is successful. return -1 otherwise.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        insert(table: string, values: ValuesBucket): Promise<number>;

        /**
         * Inserts a batch of data into the target table.
         *
         * @param {string} table - indicates the target table.
         * @param {Array<ValuesBucket>} values - indicates the rows of data {@link ValuesBucket} to be inserted into the table.
         * @param {AsyncCallback<number>} callback - the number of values that were inserted if the operation is successful. returns -1 otherwise.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        batchInsert(table: string, values: Array<ValuesBucket>, callback: AsyncCallback<number>): void;

        /**
         * Inserts a batch of data into the target table.
         *
         * @param {string} table - indicates the target table.
         * @param {Array<ValuesBucket>} values - indicates the rows of data {@link ValuesBucket} to be inserted into the table.
         * @returns {Promise<void>} the number of values that were inserted if the operation is successful. returns -1 otherwise.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        batchInsert(table: string, values: Array<ValuesBucket>): Promise<number>;

        /**
         * Updates data in the database based on a specified instance object of RdbPredicates.
         *
         * @param {ValuesBucket} values - indicates the row of data to be updated in the database.The key-value pairs are associated with column names of the database table.
         * @param {RdbPredicates} predicates - indicates the specified update condition by the instance object of  {@link RdbPredicates}.
         * @param {AsyncCallback<number>} callback - the number of affected rows.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        update(values: ValuesBucket, predicates: RdbPredicates, callback: AsyncCallback<number>): void;

        /**
         * Updates data in the database based on a specified instance object of RdbPredicates.
         *
         * @param {ValuesBucket} values - indicates the row of data to be updated in the database.The key-value pairs are associated with column names of the database table.
         * @param {RdbPredicates} predicates - indicates the specified update condition by the instance object of  {@link RdbPredicates}.
         * @returns {Promise<number>} the number of affected rows.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        update(values: ValuesBucket, predicates: RdbPredicates): Promise<number>;

        /**
         * Updates data in the database based on a specified instance object of RdbPredicates.
         *
         * @param {string} table - indicates the target table.
         * @param {ValuesBucket} values - indicates the row of data to be updated in the database.The key-value pairs are associated with column names of the database table.
         * @param {DataSharePredicates} predicates - indicates the specified update condition by the instance object of {@link dataSharePredicates.DataSharePredicates}.
         * @param {AsyncCallback<number>} callback - the number of affected rows.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @throws {BusinessError} 202 - if permission verification failed, application which is not a system application uses system API.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        update(table: string, values: ValuesBucket, predicates: dataSharePredicates.DataSharePredicates, callback: AsyncCallback<number>): void;

        /**
         * Updates data in the database based on a specified instance object of RdbPredicates.
         *
         * @param {string} table - indicates the target table.
         * @param {ValuesBucket} values - indicates the row of data to be updated in the database.The key-value pairs are associated with column names of the database table.
         * @param {DataSharePredicates} predicates - indicates the specified update condition by the instance object of {@link dataSharePredicates.DataSharePredicates}.
         * @returns {Promise<number>} the number of affected rows.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @throws {BusinessError} 202 - if permission verification failed, application which is not a system application uses system API.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        update(table: string, values: ValuesBucket, predicates: dataSharePredicates.DataSharePredicates): Promise<number>;

        /**
         * Deletes data from the database based on a specified instance object of RdbPredicates.
         *
         * @param {RdbPredicates} predicates - the specified delete condition by the instance object of {@link RdbPredicates}.
         * @param {AsyncCallback<number>} callback - the number of affected rows.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        delete(predicates: RdbPredicates, callback: AsyncCallback<number>): void;

        /**
         * Deletes data from the database based on a specified instance object of RdbPredicates.
         *
         * @param {RdbPredicates} predicates - the specified delete condition by the instance object of {@link RdbPredicates}.
         * @returns {Promise<number>} the number of affected rows.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        delete(predicates: RdbPredicates): Promise<number>;

        /**
         * Deletes data from the database based on a specified instance object of RdbPredicates.
         *
         * @param {string} table - indicates the target table.
         * @param {DataSharePredicates} predicates - the specified delete condition by the instance object of {@link dataSharePredicates.DataSharePredicates}.
         * @param {AsyncCallback<number>} callback - the number of affected rows.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @throws {BusinessError} 202 - if permission verification failed, application which is not a system application uses system API.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        delete(table: string, predicates: dataSharePredicates.DataSharePredicates, callback: AsyncCallback<number>): void;

        /**
         * Deletes data from the database based on a specified instance object of RdbPredicates.
         *
         * @param {string} table - indicates the target table.
         * @param {DataSharePredicates} predicates - the specified delete condition by the instance object of {@link dataSharePredicates.DataSharePredicates}.
         * @returns {Promise<number>} the number of affected rows.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @throws {BusinessError} 202 - if permission verification failed, application which is not a system application uses system API.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        delete(table: string, predicates: dataSharePredicates.DataSharePredicates): Promise<number>;

        /**
         * Queries data in the database based on specified conditions.
         *
         * @param {RdbPredicates} predicates - the specified query condition by the instance object of {@link RdbPredicates}.
         * @param {Array<string>} columns - the columns to query. If the value is empty array, the query applies to all columns.
         * @param {AsyncCallback<ResultSet>} callback - the {@link ResultSet} object if the operation is successful.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        query(predicates: RdbPredicates, columns: Array<string>, callback: AsyncCallback<ResultSet>): void;

        /**
         * Queries data in the database based on specified conditions.
         *
         * @param {RdbPredicates} predicates - the specified query condition by the instance object of {@link RdbPredicates}.
         * @param {Array<string>} columns - the columns to query. If the value is null, the query applies to all columns.
         * @returns {Promise<ResultSet>} the {@link ResultSet} object if the operation is successful.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        query(predicates: RdbPredicates, columns ?: Array<string>): Promise<ResultSet>;

        /**
         * Queries data in the database based on specified conditions.
         *
         * @param {string} table - indicates the target table.
         * @param {dataSharePredicates.DataSharePredicates} predicates - the specified query condition by the instance object of {@link dataSharePredicates.DataSharePredicates}.
         * @param {Array<string>} columns - the columns to query. If the value is empty array, the query applies to all columns.
         * @param {AsyncCallback<ResultSet>} callback - the {@link ResultSet} object if the operation is successful.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @throws {BusinessError} 202 - if permission verification failed, application which is not a system application uses system API.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        query(table: string, predicates: dataSharePredicates.DataSharePredicates, columns: Array<string>, callback: AsyncCallback<ResultSet>): void;

        /**
         * Queries data in the database based on specified conditions.
         *
         * @param {string} table - indicates the target table.
         * @param {dataSharePredicates.DataSharePredicates} predicates - the specified query condition by the instance object of {@link dataSharePredicates.DataSharePredicates}.
         * @param {Array<string>} columns - the columns to query. If the value is null, the query applies to all columns.
         * @returns {Promise<ResultSet>} the {@link ResultSet} object if the operation is successful.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @throws {BusinessError} 202 - if permission verification failed, application which is not a system application uses system API.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @systemapi
         * @StageModelOnly
         * @since 9
         */
        query(table: string, predicates: dataSharePredicates.DataSharePredicates, columns ?: Array<string>): Promise<ResultSet>;

        /**
         * Queries data in the database based on SQL statement.
         *
         * @param {string} sql - indicates the SQL statement to execute.
         * @param {Array<ValueType>} bindArgs - indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @param {AsyncCallback<ResultSet>} callback - the {@link ResultSet} object if the operation is successful.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        querySql(sql: string, bindArgs: Array<ValueType>, callback: AsyncCallback<ResultSet>): void;

        /**
         * Queries data in the database based on SQL statement.
         *
         * @param {string} sql - indicates the SQL statement to execute.
         * @param {Array<ValueType>} bindArgs - indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @returns {Promise<ResultSet>} the {@link ResultSet} object if the operation is successful.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        querySql(sql: string, bindArgs ?: Array<ValueType>): Promise<ResultSet>;

        /**
         * Executes a SQL statement that contains specified parameters but returns no value.
         *
         * @param {string} sql - indicates the SQL statement to execute.
         * @param {Array<ValueType>} bindArgs - indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @param {AsyncCallback<void>} callback - the callback of executeSql.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        executeSql(sql: string, bindArgs: Array<ValueType>, callback: AsyncCallback<void>): void;

        /**
         * Executes a SQL statement that contains specified parameters but returns no value.
         *
         * @param {string} sql - indicates the SQL statement to execute.
         * @param {Array<ValueType>} bindArgs - indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @returns {Promise<void>} the promise returned by the function.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        executeSql(sql: string, bindArgs ?: Array<ValueType>): Promise<void>;

        /**
         * BeginTransaction before execute your sql.
         *
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        beginTransaction(): void;

        /**
         * Commit the the sql you have executed.
         *
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        commit(): void;

        /**
         * Roll back the sql you have already executed.
         *
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        rollBack(): void;

        /**
         * Backs up a database in a specified name.
         *
         * @param {string} destName - indicates the name that saves the database backup.
         * @param {AsyncCallback<void>} callback - the callback of backup.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        backup(destName: string, callback: AsyncCallback<void>): void;

        /**
         * Backs up a database in a specified name.
         *
         * @param {string} destName - indicates the name that saves the database backup.
         * @returns {Promise<void>} the promise returned by the function.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        backup(destName: string): Promise<void>;

        /**
         * Restores a database from a specified database file.
         *
         * @param {string} srcName - indicates the name that saves the database file.
         * @param {AsyncCallback<void>} callback - the callback of restore.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        restore(srcName: string, callback: AsyncCallback<void>): void;

        /**
         * Restores a database from a specified database file.
         *
         * @param {string} srcName - indicates the name that saves the database file.
         * @returns {Promise<void>} the promise returned by the function.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        restore(srcName: string): Promise<void>;

        /**
         * Set table to be distributed table.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param {Array<string>} tables - indicates the tables name you want to set.
         * @param {AsyncCallback<void>} callback - the callback of setDistributedTables.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @throws {BusinessError} 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        setDistributedTables(tables: Array<string>, callback: AsyncCallback<void>): void;

        /**
         * Set table to be distributed table.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param {Array<string>} tables - indicates the tables name you want to set.
         * @returns {Promise<void>} the promise returned by the function.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @throws {BusinessError} 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        setDistributedTables(tables: Array<string>): Promise<void>;

        /**
         * Obtain distributed table name of specified remote device according to local table name.
         * When query remote device database, distributed table name is needed.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param {string} device - indicates the remote device.
         * @param {AsyncCallback<string>} callback - {string}: the distributed table name.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @throws {BusinessError} 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        obtainDistributedTableName(device: string, table: string, callback: AsyncCallback<string>): void;

        /**
         * Obtain distributed table name of specified remote device according to local table name.
         * When query remote device database, distributed table name is needed.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param {string} device - indicates the remote device.
         * @returns {Promise<string>} {string}: the distributed table name.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @throws {BusinessError} 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        obtainDistributedTableName(device: string, table: string): Promise<string>;

        /**
         * Sync data between devices.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param {SyncMode} mode - indicates the database synchronization mode.
         * @param {RdbPredicates} predicates - the specified sync condition by the instance object of {@link RdbPredicates}.
         * @param {AsyncCallback<Array<[string, number]>>} callback - {Array<[string, number]>}: devices sync status array, {string}: device id, {number}: device sync status.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @throws {BusinessError} 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        sync(mode: SyncMode, predicates: RdbPredicates, callback: AsyncCallback<Array<[ string, number ]>>): void;

        /**
         * Sync data between devices.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param {SyncMode} mode - indicates the database synchronization mode.
         * @param {RdbPredicates} predicates - the specified sync condition by the instance object of {@link RdbPredicates}.
         * @returns {Promise<Array<[string, number]>>} {Array<[string, number]>}: devices sync status array, {string}: device id, {number}: device sync status.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @throws {BusinessError} 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        sync(mode: SyncMode, predicates: RdbPredicates): Promise<Array<[ string, number ]>>;

        /**
         * Queries remote data in the database based on specified conditions before Synchronizing Data.
         *
         * @param {string} device - indicates specified remote device.
         * @param {string} table - indicates the target table.
         * @param {RdbPredicates} predicates - the specified remote remote query condition by the instance object of {@link RdbPredicates}.
         * @param {Array<string>} columns - the columns to remote query. If the value is empty array, the remote query applies to all columns.
         * @param {AsyncCallback<ResultSet>} callback - the {@link ResultSet} object if the operation is successful.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @throws {BusinessError} 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        remoteQuery(device: string, table: string, predicates: RdbPredicates, columns: Array<string>, callback: AsyncCallback<ResultSet>): void;

        /**
         * Queries remote data in the database based on specified conditions before Synchronizing Data.
         *
         * @param {string} device - indicates specified remote device.
         * @param {string} table - indicates the target table.
         * @param {RdbPredicates} predicates - the specified remote remote query condition by the instance object of {@link RdbPredicates}.
         * @param {Array<string>} columns - the columns to remote query. If the value is empty array, the remote query applies to all columns.
         * @returns {Promise<ResultSet>} the {@link ResultSet} object if the operation is successful.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @throws {BusinessError} 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        remoteQuery(device: string, table: string, predicates: RdbPredicates, columns: Array<string>): Promise<ResultSet>;

        /**
         * Registers an observer for the database. When data in the distributed database changes,
         * the callback will be invoked.
         *
         * @param {string} event - indicates the event must be string 'dataChange'.
         * @param {SubscribeType} type - indicates the subscription type, which is defined in {@link SubscribeType}.If its value is SUBSCRIBE_TYPE_REMOTE, ohos.permission.DISTRIBUTED_DATASYNC is required.
         * @param {AsyncCallback<Array<string>>} observer - {Array<string>}: the observer of data change events in the distributed database.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @throws {BusinessError} 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        on(event: 'dataChange', type: SubscribeType, observer: Callback<Array<string>>): void;

        /**
         * Remove specified observer of specified type from the database.
         *
         * @param {string} event - indicates the event must be string 'dataChange'.
         * @param {SubscribeType} type - indicates the subscription type, which is defined in {@link SubscribeType}.If its value is SUBSCRIBE_TYPE_REMOTE, ohos.permission.DISTRIBUTED_DATASYNC is required.
         * @param {AsyncCallback<Array<string>>} observer - {Array<string>}: the data change observer already registered.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @throws {BusinessError} 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        off(event: 'dataChange', type: SubscribeType, observer: Callback<Array<string>>): void;
    }

    /**
     * Manages relational database configurations.
     *
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    class RdbPredicates {
        /**
         * A parameterized constructor used to create a RdbPredicates instance.
         *
         * @param {string} name - indicates the table name of the database.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        constructor(name: string)

        /**
         * Specifies remote devices which connect to local device when syncing distributed database.
         * When query database, this function should not be called.
         *
         * @param {Array<string>} devices - indicates specified remote devices.
         * @returns {RdbPredicates} -  the {@link RdbPredicates} self.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        inDevices(devices: Array<string>): RdbPredicates;

        /**
         * Specifies all remote devices which connect to local device when syncing distributed database.
         * When query database, this function should not be called.
         *
         * @returns {RdbPredicates} - the {@link RdbPredicates} self.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        inAllDevices(): RdbPredicates;

        /**
         * Configure the RdbPredicates to match the field whose data type is ValueType and value is equal
         * to a specified value.
         * This method is similar to = of the SQL statement.
         *
         * @param {string} field - indicates the column name in the database table.
         * @param {ValueType} value - indicates the value to match with the {@link RdbPredicates}.
         * @returns {RdbPredicates} - the {@link RdbPredicates} self.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        equalTo(field: string, value: ValueType): RdbPredicates;

        /**
         * Configure the RdbPredicates to match the field whose data type is ValueType and value is not equal to
         * a specified value.
         * This method is similar to != of the SQL statement.
         *
         * @param {string} field - indicates the column name in the database table.
         * @param {ValueType} value - indicates the value to match with the {@link RdbPredicates}.
         * @returns {RdbPredicates} - the {@link RdbPredicates} self.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        notEqualTo(field: string, value: ValueType): RdbPredicates;

        /**
         * Adds a left parenthesis to the RdbPredicates.
         * This method is similar to ( of the SQL statement and needs to be used together with endWrap().
         *
         * @returns {RdbPredicates} - the {@link RdbPredicates} with the left parenthesis.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        beginWrap(): RdbPredicates;

        /**
         * Adds a right parenthesis to the RdbPredicates.
         * This method is similar to ) of the SQL statement and needs to be used together with beginWrap().
         *
         * @returns {RdbPredicates} - the {@link RdbPredicates} with the right parenthesis.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        endWrap(): RdbPredicates;

        /**
         * Adds an or condition to the RdbPredicates.
         * This method is similar to or of the SQL statement.
         *
         * @returns {RdbPredicates} - the {@link RdbPredicates} with the or condition.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        or(): RdbPredicates;

        /**
         * Adds an and condition to the RdbPredicates.
         * This method is similar to and of the SQL statement.
         *
         * @returns {RdbPredicates} - the {@link RdbPredicates} with the and condition.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        and(): RdbPredicates;

        /**
         * Configure the RdbPredicates to match the field whose data type is string and value
         * contains a specified value.
         * This method is similar to contains of the SQL statement.
         *
         * @param {string} field - indicates the column name in the database table.
         * @param {ValueType} value - indicates the value to match with the {@link RdbPredicates}.
         * @returns {RdbPredicates} - the {@link RdbPredicates} self.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        contains(field: string, value: string): RdbPredicates;

        /**
         * Configure the RdbPredicates to match the field whose data type is string and value starts
         * with a specified string.
         * This method is similar to value% of the SQL statement.
         *
         * @param {string} field - indicates the column name in the database table.
         * @param {ValueType} value - indicates the value to match with the {@link RdbPredicates}.
         * @returns {RdbPredicates} - the {@link RdbPredicates} self.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        beginsWith(field: string, value: string): RdbPredicates;

        /**
         * Configure the RdbPredicates to match the field whose data type is string and value
         * ends with a specified string.
         * This method is similar to %value of the SQL statement.
         *
         * @param {string} field - indicates the column name in the database table.
         * @param {ValueType} value - indicates the value to match with the {@link RdbPredicates}.
         * @returns {RdbPredicates} - the {@link RdbPredicates} self.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        endsWith(field: string, value: string): RdbPredicates;

        /**
         * Configure the RdbPredicates to match the fields whose value is null.
         * This method is similar to is null of the SQL statement.
         *
         * @param {string} field - indicates the column name in the database table.
         * @returns {RdbPredicates} - the {@link RdbPredicates} self.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        isNull(field: string): RdbPredicates;

        /**
         * Configure the RdbPredicates to match the specified fields whose value is not null.
         * This method is similar to is not null of the SQL statement.
         *
         * @param {string} field - indicates the column name in the database table.
         * @returns {RdbPredicates} - the {@link RdbPredicates} self.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        isNotNull(field: string): RdbPredicates;

        /**
         * Configure the RdbPredicates to match the fields whose data type is string and value is
         * similar to a specified string.
         * This method is similar to like of the SQL statement.
         *
         * @param {string} field - indicates the column name in the database table.
         * @param {ValueType} value - indicates the value to match with the {@link RdbPredicates}.
         * @returns {RdbPredicates} - the {@link RdbPredicates} that match the specified field.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        like(field: string, value: string): RdbPredicates;

        /**
         * Configure RdbPredicates to match the specified field whose data type is string and the value contains
         * a wildcard.
         * Different from like, the input parameters of this method are case-sensitive.
         *
         * @param {string} field - indicates the column name in the database table.
         * @param {ValueType} value - indicates the value to match with the {@link RdbPredicates}.
         * @returns {RdbPredicates} - the SQL statement with the specified {@link RdbPredicates}.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        glob(field: string, value: string): RdbPredicates;

        /**
         * Configure RdbPredicates to match the specified field whose value is within a given range.
         *
         * @param {string} field - indicates the column name.
         * @param {ValueType} low - indicates the minimum value.
         * @param {ValueType} high - indicates the maximum value.
         * @returns {RdbPredicates} - the SQL statement with the specified {@link RdbPredicates}.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        between(field: string, low: ValueType, high: ValueType): RdbPredicates;

        /**
         * Configure RdbPredicates to match the specified field whose value is out of a given range.
         *
         * @param {string} field - indicates the column name in the database table.
         * @param {ValueType} low - indicates the minimum value.
         * @param {ValueType} high - indicates the maximum value.
         * @returns {RdbPredicates} - the SQL statement with the specified {@link RdbPredicates}.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        notBetween(field: string, low: ValueType, high: ValueType): RdbPredicates;

        /**
         * Restricts the value of the field to be greater than the specified value.
         *
         * @param {string} field - indicates the column name in the database table.
         * @param {ValueType} value - indicates the value to match with the {@link RdbPredicates}.
         * @returns {RdbPredicates} - the SQL query statement with the specified {@link RdbPredicates}.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        greaterThan(field: string, value: ValueType): RdbPredicates;

        /**
         * Restricts the value of the field to be smaller than the specified value.
         *
         * @param {string} field - indicates the column name in the database table.
         * @param {ValueType} value - indicates the value to match with the {@link RdbPredicates}.
         * @returns {RdbPredicates} - the SQL query statement with the specified {@link RdbPredicates}.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        lessThan(field: string, value: ValueType): RdbPredicates;

        /**
         * Restricts the value of the field to be greater than or equal to the specified value.
         *
         * @param {string} field - indicates the column name in the database table.
         * @param {ValueType} value - indicates the value to match with the {@link RdbPredicates}.
         * @returns {RdbPredicates} - the SQL query statement with the specified {@link RdbPredicates}.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        greaterThanOrEqualTo(field: string, value: ValueType): RdbPredicates;

        /**
         * Restricts the value of the field to be smaller than or equal to the specified value.
         *
         * @param {string} field - indicates the column name in the database table.
         * @param {ValueType} value - indicates the value to match with the {@link RdbPredicates}.
         * @returns {RdbPredicates} - the SQL query statement with the specified {@link RdbPredicates}.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        lessThanOrEqualTo(field: string, value: ValueType): RdbPredicates;

        /**
         * Restricts the ascending order of the return list. When there are several orders,
         * the one close to the head has the highest priority.
         *
         * @param {string} field - indicates the column name for sorting the return list.
         * @returns {RdbPredicates} - the SQL query statement with the specified {@link RdbPredicates}.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        orderByAsc(field: string): RdbPredicates;

        /**
         * Restricts the descending order of the return list. When there are several orders,
         * the one close to the head has the highest priority.
         *
         * @param {string} field - indicates the column name for sorting the return list.
         * @returns {RdbPredicates} - the SQL query statement with the specified {@link RdbPredicates}.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        orderByDesc(field: string): RdbPredicates;

        /**
         * Restricts each row of the query result to be unique.
         *
         * @returns {RdbPredicates} - the SQL query statement with the specified {@link RdbPredicates}.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        distinct(): RdbPredicates;

        /**
         * Restricts the max number of return records.
         *
         * @param {number} value - indicates the max length of the return list.
         * @returns {RdbPredicates} - the SQL query statement with the specified {@link RdbPredicates}.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        limitAs(value: number): RdbPredicates;

        /**
         * Configure RdbPredicates to specify the start position of the returned result.
         * Use this method together with limit(number).
         *
         * @param {number} rowOffset - indicates the start position of the returned result. The value is a positive integer.
         * @returns {RdbPredicates} - the SQL query statement with the specified {@link RdbPredicates}.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        offsetAs(rowOffset: number): RdbPredicates;

        /**
         * Configure RdbPredicates to group query results by specified columns.
         *
         * @param {Array<string>} fields - indicates the specified columns by which query results are grouped.
         * @returns {RdbPredicates} - the SQL query statement with the specified {@link RdbPredicates}.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        groupBy(fields: Array<string>): RdbPredicates;

        /**
         * Configure RdbPredicates to specify the index column.
         * Before using this method, you need to create an index column.
         *
         * @param {string} field - indicates the name of the index column.
         * @returns {RdbPredicates} - the SQL statement with the specified {@link RdbPredicates}.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        indexedBy(field: string): RdbPredicates;

        /**
         * Configure RdbPredicates to match the specified field whose data type is ValueType array and values
         * are within a given range.
         *
         * @param {string} field - indicates the column name in the database table.
         * @param {Array<ValueType>} value - indicates the values to match with {@link RdbPredicates}.
         * @returns {RdbPredicates} - the SQL statement with the specified {@link RdbPredicates}.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        in(field: string, value: Array<ValueType>): RdbPredicates;

        /**
         * Configure RdbPredicates to match the specified field whose data type is ValueType array and values
         * are out of a given range.
         *
         * @param {string} field - indicates the column name in the database table.
         * @param {Array<ValueType>} value - indicates the values to match with {@link RdbPredicates}.
         * @returns {RdbPredicates} - the SQL statement with the specified {@link RdbPredicates}.
         * @throws {BusinessError} 401 - if the parameter type is incorrect.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        notIn(field: string, value: Array<ValueType>): RdbPredicates;
    }

    /**
     * Provides methods for accessing a database result set generated by querying the database.
     *
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    interface ResultSet {

        /**
         * Obtains the names of all columns in a result set.
         * The column names are returned as a string array, in which the strings are in the same order
         * as the columns in the result set.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        columnNames: Array<string>;

        /**
         * Obtains the number of columns in the result set.
         * The returned number is equal to the length of the string array returned by the
         * columnNames method.
         *
         * @since 9
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         */
        columnCount: number;

        /**
         * Obtains the number of rows in the result set.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        rowCount: number;

        /**
         * Obtains the current index of the result set.
         * The result set index starts from 0.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        rowIndex: number;

        /**
         * Checks whether the cursor is positioned at the first row.
         *
         * @since 9
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         */
        isAtFirstRow: boolean;

        /**
         * Checks whether the cursor is positioned at the last row.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        isAtLastRow: boolean;

        /**
         * Checks whether the cursor is positioned after the last row.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        isEnded: boolean;

        /**
         * Checks whether the cursor is positioned before the first row.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        isStarted: boolean;

        /**
         * Checks whether the current result set is closed.
         *
         * If the result set is closed by calling the close method, true will be returned.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        isClosed: boolean;

        /**
         * Obtains the column index based on the specified column name.
         * The column name is passed as an input parameter.
         *
         * @param {string} columnName - indicates the name of the specified column in the result set.
         * @returns {number} the index of the specified column.
         * @throws {BusinessError} 14800013 - the column value is null or the column type is incompatible.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        getColumnIndex(columnName: string): number;

        /**
         * Obtains the column name based on the specified column index.
         * The column index is passed as an input parameter.
         *
         * @param {number} columnIndex - indicates the index of the specified column in the result set.
         * @returns {string} the name of the specified column.
         * @throws {BusinessError} 14800013 - the column value is null or the column type is incompatible.
         * @throws {BusinessError} 401 - parameter error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        getColumnName(columnIndex: number): string;

        /**
         * Go to the specified row of the result set forwards or backwards by an offset relative to its current position.
         * A positive offset indicates moving backwards, and a negative offset indicates moving forwards.
         *
         * @param {number} offset - indicates the offset relative to the current position.
         * @returns {string} true if the result set is moved successfully and does not go beyond the range;
         *                   returns false otherwise.
         * @throws {BusinessError} 14800012 - the result set is empty or the specified location is invalid.
         * @throws {BusinessError} 401 - parameter error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        goTo(offset: number): boolean;

        /**
         * Go to the specified row of the result set.
         *
         * @param {number} position - indicates the index of the specified row, which starts from 0.
         * @returns {boolean} true if the result set is moved successfully; returns false otherwise.
         * @throws {BusinessError} 14800012 - the result set is empty or the specified location is invalid.
         * @throws {BusinessError} 401 - parameter error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        goToRow(position: number): boolean;

        /**
         * Go to the first row of the result set.
         *
         * @returns {boolean} true if the result set is moved successfully;
         *                    returns false otherwise, for example, if the result set is empty.
         * @throws {BusinessError} 14800012 - the result set is empty or the specified location is invalid.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        goToFirstRow(): boolean;

        /**
         * Go to the last row of the result set.
         *
         * @returns {boolean} true if the result set is moved successfully;
         *                    returns false otherwise, for example, if the result set is empty.
         * @throws {BusinessError} 14800012 - the result set is empty or the specified location is invalid.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        goToLastRow(): boolean;

        /**
         * Go to the next row of the result set.
         *
         * @returns {boolean} true if the result set is moved successfully;
         *                    returns false otherwise, for example, if the result set is already in the last row.
         * @throws {BusinessError} 14800012 - the result set is empty or the specified location is invalid.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        goToNextRow(): boolean;

        /**
         * Go to the previous row of the result set.
         *
         * @returns {boolean} true if the result set is moved successfully;
         *                    returns false otherwise, for example, if the result set is already in the first row.
         * @throws {BusinessError} 14800012 - the result set is empty or the specified location is invalid.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        goToPreviousRow(): boolean;

        /**
         * Obtains the value of the specified column in the current row as a byte array.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null or the specified column is not of the Blob type.
         *
         * @param {number} columnIndex - indicates the specified column index, which starts from 0.
         * @returns {Uint8Array} the value of the specified column as a byte array.
         * @throws {BusinessError} 14800013 - the column value is null or the column type is incompatible.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        getBlob(columnIndex: number): Uint8Array;

        /**
         * Obtains the value of the specified column in the current row as string.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null or the specified column is not of the string type.
         *
         * @param {number} columnIndex - indicates the specified column index, which starts from 0.
         * @returns {string} the value of the specified column as a string.
         * @throws {BusinessError} 14800013 - the column value is null or the column type is incompatible.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        getString(columnIndex: number): string;

        /**
         * Obtains the value of the specified column in the current row as long.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null, the specified column is not of the integer type.
         *
         * @param {number} columnIndex - indicates the specified column index, which starts from 0.
         * @returns {number} the value of the specified column as a long.
         * @throws {BusinessError} 14800013 - the column value is null or the column type is incompatible.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        getLong(columnIndex: number): number;

        /**
         * Obtains the value of the specified column in the current row as double.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null, the specified column is not of the double type.
         *
         * @param {number} columnIndex - indicates the specified column index, which starts from 0.
         * @returns {number} the value of the specified column as a double.
         * @throws {BusinessError} 14800013 - the column value is null or the column type is incompatible.
         * @throws {BusinessError} 401 - the parameter check failed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        getDouble(columnIndex: number): number;

        /**
         * Checks whether the value of the specified column in the current row is null.
         *
         * @param {number} columnIndex - indicates the specified column index, which starts from 0.
         * @returns {boolean} true if the value of the specified column in the current row is null;
         *                    returns false otherwise.
         * @throws {BusinessError} 14800013 - the column value is null or the column type is incompatible.
         * @throws {BusinessError} 401 - parameter error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        isColumnNull(columnIndex: number): boolean;

        /**
         * Closes the result set.
         * Calling this method on the result set will release all of its resources and makes it ineffective.
         *
         * @throws {BusinessError} 14800012 - the result set is empty or the specified location is invalid.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        close(): void;
    }
}

export default relationalStore;