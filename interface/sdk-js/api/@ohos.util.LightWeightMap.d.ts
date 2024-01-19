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

declare class LightWeightMap<K, V> {
  /**
   * A constructor used to create a LightWeightMap object.
   * @throws { BusinessError } 10200012 - The LightWeightMap's constructor cannot be directly invoked.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  constructor();
  /**
   * Gets the element number of the LightWeightMap.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  length: number;
  /**
   * Returns whether this map has all the object in a specified map
   * @param map the Map object to compare
   * @returns the boolean type
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @throws { BusinessError } 10200011 - The hasAll method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  hasAll(map: LightWeightMap<K, V>): boolean;
  /**
   * Returns whether a key is contained in this map
   * @param key need to determine whether to include the key
   * @returns the boolean type
   * @throws { BusinessError } 10200011 - The hasKey method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  hasKey(key: K): boolean;
  /**
   * Returns whether a value is contained in this map
   * @param value need to determine whether to include the value
   * @returns the boolean type
   * @throws { BusinessError } 10200011 - The hasValue method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  hasValue(value: V): boolean;
  /**
   * Ensures that the capacity of an LightWeightMap container is greater than or equal to a specified value,
   * and that the container has all the original objects after capacity expansion
   * @param minimumCapacity Minimum capacity to be reserved
   * @throws { BusinessError } 10200011 - The increaseCapacityTo method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  increaseCapacityTo(minimumCapacity: number): void;
  /**
   * Returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order
   * @throws { BusinessError } 10200011 - The entries method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  entries(): IterableIterator<[K, V]>;
  /**
   * Returns the value to which the specified key is mapped, or undefined if this map contains no mapping for the key
   * @param key the index in LightWeightMap
   * @returns value or undefined
   * @throws { BusinessError } 10200011 - The get method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  get(key: K): V;
  /**
   * Obtains the index of the key equal to a specified key in an LightWeightMap container
   * @param key Looking for goals
   * @returns Subscript corresponding to target
   * @throws { BusinessError } 10200011 - The getIndexOfKey method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  getIndexOfKey(key: K): number;
  /**
   * Obtains the index of the value equal to a specified value in an LightWeightMap container
   * @param value Looking for goals
   * @returns Subscript corresponding to target
   * @throws { BusinessError } 10200011 - The getIndexOfValue method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  getIndexOfValue(value: V): number;
  /**
   * Returns whether the Map object contains elements
   * @returns the boolean type
   * @throws { BusinessError } 10200011 - The isEmpty method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  isEmpty(): boolean;
  /**
   * Obtains the key at the location identified by index in an LightWeightMap container
   * @param index Target subscript for search
   * @returns the key of key-value pairs
   * @throws { BusinessError } 10200011 - The getKeyAt method cannot be bound.
   * @throws { BusinessError } 10200001 - The value of index is out of range.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  getKeyAt(index: number): K;
  /**
   * Obtains a ES6 iterator that contains all the keys of an LightWeightMap container
   * @throws { BusinessError } 10200011 - The keys method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  keys(): IterableIterator<K>;
  /**
   * Adds all element groups in one map to another map
   * @param map the Map object to add members
   * @throws { BusinessError } 10200011 - The setAll method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  setAll(map: LightWeightMap<K, V>): void;
  /**
   * Adds or updates a(new) key-value pair with a key and value specified for the Map object
   * @param key Added or updated targets
   * @param value Added or updated value
   * @returns the map object after set
   * @throws { BusinessError } 10200011 - The set method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  set(key: K, value: V): Object;
  /**
   * Remove the mapping for this key from this map if present
   * @param key  Target to be deleted
   * @returns Target mapped value
   * @throws { BusinessError } 10200011 - The remove method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  remove(key: K): V;
  /**
   * Deletes a key-value pair at the location identified by index from an LightWeightMap container
   * @param index  Target subscript for search
   * @returns the boolean type(Is there a delete value)
   * @throws { BusinessError } 10200011 - The removeAt method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  removeAt(index: number): boolean;
  /**
   * Removes all of the mapping from this map
   * The map will be empty after this call returns
   * @throws { BusinessError } 10200011 - The clear method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  clear(): void;
  /**
   * Sets the value identified by index in an LightWeightMap container to a specified value
   * @param index Target subscript for search
   * @param value Updated the target mapped value
   * @returns the boolean type(Is there a value corresponding to the subscript)
   * @throws { BusinessError } 10200011 - The setValueAt method cannot be bound.
   * @throws { BusinessError } 10200001 - The value of index is out of range.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  setValueAt(index: number, newValue: V): boolean;
  /**
   * Executes the given callback function once for each real key in the map.
   * It does not perform functions on deleted keys
   * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  forEach(callbackFn: (value?: V, key?: K, map?: LightWeightMap<K, V>) => void,
  thisArg?: Object): void;
  /**
   * returns an ES6 iterator.Each item of the iterator is a Javascript Object
   * @throws { BusinessError } 10200011 - The Symbol.iterator method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  [Symbol.iterator](): IterableIterator<[K, V]>;
  /**
   * Obtains a string that contains all the keys and values in an LightWeightMap container
   * @throws { BusinessError } 10200011 - The toString method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  toString(): String;
  /**
   * Obtains the value identified by index in an LightWeightMap container
   * @param index Target subscript for search
   * @returns the value of key-value pairs
   * @throws { BusinessError } 10200011 - The getValueAt method cannot be bound.
   * @throws { BusinessError } 10200001 - The value of index is out of range.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  getValueAt(index: number): V;
  /**
   * Returns an iterator of the values contained in this map
   * @throws { BusinessError } 10200011 - The values method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  values(): IterableIterator<V>;
}

export default LightWeightMap;