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

import { ValueType } from './@ohos.data.ValuesBucket';

/**
 *
 * This module provides data share services based on the ExtensionAbility.
 *
 * @namespace dataSharePredicates
 * @since 9
 * @syscap SystemCapability.DistributedDataManager.DataShare.Core
 * @systemapi
 * @StageModelOnly
 */
declare namespace dataSharePredicates {
    /**
     * Manages relational database configurations.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     */
    class DataSharePredicates {
    /**
     * Configure the DataSharePredicates to match the field whose data type is ValueType and value is equal
     * to a specified value.
     * This method is similar to = of the SQL statement.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name in the database table.
     * @param value Indicates the value to match with the DataSharePredicates.
     * @returns Returns the DataSharePredicates that match the specified field.
     */
    equalTo(field: string, value: ValueType): DataSharePredicates;

    /**
     * Configure the DataSharePredicates to match the field whose data type is ValueType and value is unequal to
     * a specified value.
     * This method is similar to != of the SQL statement.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name in the database table.
     * @param value Indicates the value to match with the DataSharePredicates.
     * @returns Returns the DataSharePredicates that match the specified field.
     */
    notEqualTo(field: string, value: ValueType): DataSharePredicates;

    /**
     * Adds a left parenthesis to the DataSharePredicates.
     * This method is similar to ( of the SQL statement and needs to be used together with endWrap().
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @returns Returns the DataSharePredicates with the left parenthesis.
     */
    beginWrap(): DataSharePredicates;

    /**
     * Adds a right parenthesis to the DataSharePredicates.
     * This method is similar to ) of the SQL statement and needs to be used together
     *
     * with beginWrap().
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @returns Returns the DataSharePredicates with the right parenthesis.
     */
    endWrap(): DataSharePredicates;

    /**
     * Adds an or condition to the DataSharePredicates.
     * This method is similar to or of the SQL statement.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @returns Returns the DataSharePredicates with the or condition.
     */
    or(): DataSharePredicates;

    /**
     * Adds an and condition to the DataSharePredicates.
     * This method is similar to and of the SQL statement.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @returns Returns the DataSharePredicates with the and condition.
     */
    and(): DataSharePredicates;

    /**
     * Configure the DataSharePredicates to match the field whose data type is string and value
     * contains a specified value.
     * This method is similar to contains of the SQL statement.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name in the database table.
     * @param value Indicates the value to match with the DataSharePredicates.
     * @returns Returns the DataSharePredicates that match the specified field.
     */
    contains(field: string, value: string): DataSharePredicates;

    /**
     * Configure the DataSharePredicates to match the field whose data type is string and value starts
     * with a specified string.
     * This method is similar to value% of the SQL statement.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name in the database table.
     * @param value Indicates the value to match with the DataSharePredicates.
     * @returns Returns the DataSharePredicates that match the specified field.
     */
    beginsWith(field: string, value: string): DataSharePredicates;

    /**
     * Configure the DataSharePredicates to match the field whose data type is string and value
     * ends with a specified string.
     * This method is similar to %value of the SQL statement.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name in the database table.
     * @param value Indicates the value to match with the DataSharePredicates.
     * @returns Returns the DataSharePredicates that match the specified field.
     */
    endsWith(field: string, value: string): DataSharePredicates;

    /**
     * Configure the DataSharePredicates to match the fields whose value is null.
     * This method is similar to is null of the SQL statement.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name in the database table.
     * @returns Returns the DataSharePredicates that match the specified field.
     */
    isNull(field: string): DataSharePredicates;

    /**
     * Configure the DataSharePredicates to match the specified fields whose value is not null.
     * This method is similar to is not null of the SQL statement.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name in the database table.
     * @returns Returns the DataSharePredicates that match the specified field.
     */
    isNotNull(field: string): DataSharePredicates;

    /**
     * Configure the DataSharePredicates to match the fields whose data type is string and value is
     * similar to a specified string.
     * This method is similar to like of the SQL statement.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name in the database table.
     * @param value Indicates the value to match with the DataSharePredicates. The percent sign (%) in the value
     * is a wildcard (like * in a regular expression).
     * @returns Returns the DataSharePredicates that match the specified field.
     */
    like(field: string, value: string): DataSharePredicates;

    /**
     * Configure the DataSharePredicates to match the fields whose data type is string and value is
     * similar to a specified string.
     * This method is similar to unlike of the SQL statement.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name in the database table.
     * @param value Indicates the value to match with the DataSharePredicates. The percent sign (%) in the value
     * is a wildcard (like * in a regular expression).
     * @returns Returns the DataSharePredicates that match the specified field.
     */
     unlike(field: string, value: string): DataSharePredicates;

    /**
     * Configure DataSharePredicates to match the specified field whose data type is string and the value contains
     * a wildcard.
     * Different from like, the input parameters of this method are case-sensitive.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name in the database table.
     * @param value Indicates the value to match with DataSharePredicates.
     * @returns Returns the SQL statement with the specified DataSharePredicates.
     */
    glob(field: string, value: string): DataSharePredicates;

    /**
     * Restricts the value of the field to the range between low value and high value.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name.
     * @param low Indicates the minimum value.
     * @param high Indicates the maximum value.
     * @returns Returns the SQL query statement with the specified DataSharePredicates.
     */
    between(field: string, low: ValueType, high: ValueType): DataSharePredicates;

    /**
     * Configure DataSharePredicates to match the specified field whose data type is int and value is
     * out of a given range.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name in the database table.
     * @param low Indicates the minimum value to match with DataSharePredicates.
     * @param high Indicates the maximum value to match with DataSharePredicates.
     * @returns Returns the SQL query statement with the specified DataSharePredicates.
     */
    notBetween(field: string, low: ValueType, high: ValueType): DataSharePredicates;

    /**
     * Restricts the value of the field to be greater than the specified value.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name.
     * @param value Indicates the String field.
     * @returns Returns the SQL query statement with the specified DataSharePredicates.
     */
    greaterThan(field: string, value: ValueType): DataSharePredicates;

    /**
     * Restricts the value of the field to be smaller than the specified value.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name.
     * @param value Indicates the String field.
     * @returns Returns the SQL query statement with the specified DataSharePredicates.
     */
    lessThan(field: string, value: ValueType): DataSharePredicates;

    /**
     * Restricts the value of the field to be greater than or equal to the specified value.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name.
     * @param value Indicates the String field.
     * @returns Returns the SQL query statement with the specified DataSharePredicates.
     */
    greaterThanOrEqualTo(field: string, value: ValueType): DataSharePredicates;

    /**
     * Restricts the value of the field to be smaller than or equal to the specified value.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name.
     * @param value Indicates the String field.
     * @returns Returns the SQL query statement with the specified DataSharePredicates.
     */
    lessThanOrEqualTo(field: string, value: ValueType): DataSharePredicates;

    /**
     * Restricts the ascending order of the return list. When there are several orders,
     * the one close to the head has the highest priority.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name for sorting the return list.
     * @returns Returns the SQL query statement with the specified DataSharePredicates.
     */
    orderByAsc(field: string): DataSharePredicates;

    /**
     * Restricts the descending order of the return list. When there are several orders,
     * the one close to the head has the highest priority.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name for sorting the return list.
     * @returns Returns the SQL query statement with the specified DataSharePredicates.
     */
    orderByDesc(field: string): DataSharePredicates;

    /**
     * Restricts each row of the query result to be unique.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @returns Returns the SQL query statement with the specified DataSharePredicates.
     */
    distinct(): DataSharePredicates;

    /**
     * Construct a query object to specify the number of results and the starting position.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param total Represents the specified number of results.
     * @param offset Indicates the starting position.
     * @returns Returns the query object.
     */
    limit(total: number, offset: number): DataSharePredicates;

    /**
     * Configure {@code DataSharePredicates} to group query results by specified columns.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param fields Indicates the specified columns by which query results are grouped.
     * @returns Returns the DataSharePredicates with the specified columns by which query results are grouped.
     */
    groupBy(fields: Array<string>): DataSharePredicates;

    /**
     * Configure {@code DataSharePredicates} to specify the index column.
     * Before using this method, you need to create an index column.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the name of the index column.
     * @returns Returns DataSharePredicates with the specified index column.
     */
    indexedBy(field: string): DataSharePredicates;

    /**
     * Configure {@code DataSharePredicates} to match the specified field whose data type is ValueType array and values
     * are within a given range.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name in the database table.
     * @param values Indicates the values to match with DataSharePredicates.
     * @returns Returns DataSharePredicates that matches the specified field.
     */
    in(field: string, value: Array<ValueType>): DataSharePredicates;

    /**
     * Configure {@code DataSharePredicates} to match the specified field whose data type is String array and values
     * are out of a given range.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param field Indicates the column name in the database table.
     * @param values Indicates the values to match with DataSharePredicates.
     * @returns Returns DataSharePredicates that matches the specified field.
     */
    notIn(field: string, value: Array<ValueType>): DataSharePredicates;

    /**
     * Configure {@code DataSharePredicates} Creates a query condition using the specified key prefix.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param prefix Represents the specified key prefix.
     * @returns Returns the query object.
     */
    prefixKey(prefix: string): DataSharePredicates;

    /**
     * Configure {@code DataSharePredicates} to match the specified value whose key is within a given range.
     *
     * @since 9
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @systemapi
     * @StageModelOnly
     * @param keys Represents the key names.
     * @returns Returns the query object.
     */
    inKeys(keys: Array<string>): DataSharePredicates;
    }
}

export default dataSharePredicates;