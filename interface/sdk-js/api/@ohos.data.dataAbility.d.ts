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

import { AsyncCallback } from './basic';
import rdb from './@ohos.data.rdb';

/**
 * Provides predicates for implementing diverse query methods.
 *
 * @since 7
 * @syscap SystemCapability.DistributedDataManager.DataShare.Core
 */
declare namespace dataAbility {
    /**
     * Create an RdbPredicates by table name and DataAbilityPredicates.
     * This method is similar to = of the SQL statement.
     *
     * @since 7
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @param name Indicates the table name.
     * @param dataAbilityPredicates Indicates the dataAbility predicates.
     * @returns Returns an RdbPredicates.
     */
    function createRdbPredicates(name: string, dataAbilityPredicates: DataAbilityPredicates): rdb.RdbPredicates;

    /**
     * Manages relational database configurations.
     *
     * @since 7
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     */
    class DataAbilityPredicates {
        /**
         * Configure the DataAbilityPredicates to match the field whose data type is ValueType and value is equal
         * to a specified value.
         * This method is similar to = of the SQL statement.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name in the database table.
         * @param value Indicates the value to match with the DataAbilityPredicates.
         * @returns Returns the DataAbilityPredicates that match the specified field.
         */
        equalTo(field: string, value: ValueType): DataAbilityPredicates;

        /**
         * Configure the DataAbilityPredicates to match the field whose data type is ValueType and value is unequal to
         * a specified value.
         * Configure the data capability predicate to match a field where the data type is a value type and the value is not equal to the specified value.
         * This method is similar to != of the SQL statement.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name in the database table.
         * @param value Indicates the value to match with the DataAbilityPredicates.
         * @returns Returns the DataAbilityPredicates that match the specified field.
         */
        notEqualTo(field: string, value: ValueType): DataAbilityPredicates;

        /**
         * Adds a left parenthesis to the DataAbilityPredicates.
         * This method is similar to ( of the SQL statement and needs to be used together with endWrap().
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @returns Returns the DataAbilityPredicates with the left parenthesis.
         */
        beginWrap(): DataAbilityPredicates;

        /**
         * Adds a right parenthesis to the DataAbilityPredicates.
         * This method is similar to ) of the SQL statement and needs to be used together
         *
         * with beginWrap().
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @returns Returns the DataAbilityPredicates with the right parenthesis.
         */
        endWrap(): DataAbilityPredicates;

        /**
         * Adds an or condition to the DataAbilityPredicates.
         * This method is similar to or of the SQL statement.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @returns Returns the DataAbilityPredicates with the or condition.
         */
        or(): DataAbilityPredicates;

        /**
         * Adds an and condition to the DataAbilityPredicates.
         * This method is similar to and of the SQL statement.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @returns Returns the DataAbilityPredicates with the and condition.
         */
        and(): DataAbilityPredicates;

        /**
         * Configure the DataAbilityPredicates to match the field whose data type is string and value
         * contains a specified value.
         * This method is similar to contains of the SQL statement.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name in the database table.
         * @param value Indicates the value to match with the DataAbilityPredicates.
         * @returns Returns the DataAbilityPredicates that match the specified field.
         */
        contains(field: string, value: string): DataAbilityPredicates;

        /**
         * Configure the DataAbilityPredicates to match the field whose data type is string and value starts
         * with a specified string.
         * This method is similar to value% of the SQL statement.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name in the database table.
         * @param value Indicates the value to match with the DataAbilityPredicates.
         * @returns Returns the DataAbilityPredicates that match the specified field.
         */
        beginsWith(field: string, value: string): DataAbilityPredicates;

        /**
         * Configure the DataAbilityPredicates to match the field whose data type is string and value
         * ends with a specified string.
         * This method is similar to %value of the SQL statement.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name in the database table.
         * @param value Indicates the value to match with the DataAbilityPredicates.
         * @returns Returns the DataAbilityPredicates that match the specified field.
         */
        endsWith(field: string, value: string): DataAbilityPredicates;

        /**
         * Configure the DataAbilityPredicates to match the fields whose value is null.
         * This method is similar to is null of the SQL statement.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name in the database table.
         * @returns Returns the DataAbilityPredicates that match the specified field.
         */
        isNull(field: string): DataAbilityPredicates;

        /**
         * Configure the DataAbilityPredicates to match the specified fields whose value is not null.
         * This method is similar to is not null of the SQL statement.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name in the database table.
         * @returns Returns the DataAbilityPredicates that match the specified field.
         */
        isNotNull(field: string): DataAbilityPredicates;

        /**
         * Configure the DataAbilityPredicates to match the fields whose data type is string and value is
         * similar to a specified string.
         * This method is similar to like of the SQL statement.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name in the database table.
         * @param value Indicates the value to match with the DataAbilityPredicates. The percent sign (%) in the value
         * is a wildcard (like * in a regular expression).
         * @returns Returns the DataAbilityPredicates that match the specified field.
         */
        like(field: string, value: string): DataAbilityPredicates;

        /**
         * Configure DataAbilityPredicates to match the specified field whose data type is string and the value contains
         * a wildcard.
         * Different from like, the input parameters of this method are case-sensitive.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name in the database table.
         * @param value Indicates the value to match with DataAbilityPredicates.
         * @returns Returns the SQL statement with the specified DataAbilityPredicates.
         */
        glob(field: string, value: string): DataAbilityPredicates;

        /**
         * Restricts the value of the field to the range between low value and high value.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name.
         * @param low Indicates the minimum value.
         * @param high Indicates the maximum value.
         * @returns Returns the SQL query statement with the specified DataAbilityPredicates.
         */
        between(field: string, low: ValueType, high: ValueType): DataAbilityPredicates;

        /**
         * Configure DataAbilityPredicates to match the specified field whose data type is int and value is
         * out of a given range.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name in the database table.
         * @param low Indicates the minimum value to match with DataAbilityPredicates}.
         * @param high Indicates the maximum value to match with DataAbilityPredicates}.
         * @returns Returns the SQL query statement with the specified DataAbilityPredicates.
         */
        notBetween(field: string, low: ValueType, high: ValueType): DataAbilityPredicates;

        /**
         * Restricts the value of the field to be greater than the specified value.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name.
         * @param value Indicates the String field.
         * @returns Returns the SQL query statement with the specified DataAbilityPredicates.
         */
        greaterThan(field: string, value: ValueType): DataAbilityPredicates;

        /**
         * Restricts the value of the field to be smaller than the specified value.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name.
         * @param value Indicates the String field.
         * @returns Returns the SQL query statement with the specified DataAbilityPredicates.
         */
        lessThan(field: string, value: ValueType): DataAbilityPredicates;

        /**
         * Restricts the value of the field to be greater than or equal to the specified value.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name.
         * @param value Indicates the String field.
         * @returns Returns the SQL query statement with the specified DataAbilityPredicates.
         */
        greaterThanOrEqualTo(field: string, value: ValueType): DataAbilityPredicates;

        /**
         * Restricts the value of the field to be smaller than or equal to the specified value.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name.
         * @param value Indicates the String field.
         * @returns Returns the SQL query statement with the specified DataAbilityPredicates.
         */
        lessThanOrEqualTo(field: string, value: ValueType): DataAbilityPredicates;

        /**
         * Restricts the ascending order of the return list. When there are several orders,
         * the one close to the head has the highest priority.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name for sorting the return list.
         * @returns Returns the SQL query statement with the specified DataAbilityPredicates.
         */
        orderByAsc(field: string): DataAbilityPredicates;

        /**
         * Restricts the descending order of the return list. When there are several orders,
         * the one close to the head has the highest priority.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name for sorting the return list.
         * @returns Returns the SQL query statement with the specified DataAbilityPredicates.
         */
        orderByDesc(field: string): DataAbilityPredicates;

        /**
         * Restricts each row of the query result to be unique.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @returns Returns the SQL query statement with the specified DataAbilityPredicates.
         */
        distinct(): DataAbilityPredicates;

        /**
         * Restricts the max number of return records.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param value Indicates the max length of the return list.
         * @returns Returns the SQL query statement with the specified DataAbilityPredicates.
         * @throws IllegalPredicateException Throws this exception if DataAbilityPredicates are added to a wrong position.
         */
        limitAs(value: number): DataAbilityPredicates;

        /**
         * Configure DataAbilityPredicates to specify the start position of the returned result.
         * Use this method together with limit(int).
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param rowOffset Indicates the start position of the returned result. The value is a positive integer.
         * @returns Returns the SQL query statement with the specified AbsPredicates.
         */
        offsetAs(rowOffset: number): DataAbilityPredicates;

        /**
         * Configure DataAbilityPredicates to group query results by specified columns.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param fields Indicates the specified columns by which query results are grouped.
         * @returns Returns the DataAbilityPredicates with the specified columns by which query results are grouped.
         */
        groupBy(fields: Array<string>): DataAbilityPredicates;

        /**
         * Configure DataAbilityPredicates to specify the index column.
         * Before using this method, you need to create an index column.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param indexName Indicates the name of the index column.
         * @returns Returns DataAbilityPredicates with the specified index column.
         */
        indexedBy(field: string): DataAbilityPredicates;

        /**
         * Configure DataAbilityPredicates to match the specified field whose data type is ValueType array and values
         * are within a given range.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name in the database table.
         * @param values Indicates the values to match with DataAbilityPredicates.
         * @returns Returns DataAbilityPredicates that matches the specified field.
         */
        in(field: string, value: Array<ValueType>): DataAbilityPredicates;

        /**
         * Configure {@code DataAbilityPredicates} to match the specified field whose data type is String array and values
         * are out of a given range.
         *
         * @since 7
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @param field Indicates the column name in the database table.
         * @param values Indicates the values to match with DataAbilityPredicates.
         * @returns Returns DataAbilityPredicates that matches the specified field.
         */
        notIn(field: string, value: Array<ValueType>): DataAbilityPredicates;
    }
    /**
     * Indicates possible value types
     * @since 7
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     */
    type ValueType = number | string | boolean;
}

export default dataAbility;
