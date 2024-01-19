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

declare class HashMap<K, V> {
  /**
   * A constructor used to create a HashMap object.
   * @throws { BusinessError } 10200012 - The HashMap's constructor cannot be directly invoked.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  constructor();
  /**
   * Gets the element number of the hashmap.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  length: number;
  /**
   * Returns whether the Map object contains elements
   * @returns the boolean type
   * @throws { BusinessError } 10200011 - The isEmpty method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  isEmpty(): boolean;
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
   * Returns a specified element in a Map object, or null if there is no corresponding element
   * @param key the index in HashMap
   * @returns value or null
   * @throws { BusinessError } 10200011 - The get method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  get(key: K): V;
  /**
   * Adds all element groups in one map to another map
   * @param map the Map object to add members
   * @throws { BusinessError } 10200011 - The setAll method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  setAll(map: HashMap<K, V>): void;
  /**
   * Adds or updates a(new) key-value pair with a key and value specified for the Map object
   * @param key Added or updated targets
   * @param value Added or updated value
   * @returns the map object after set
   * @throws { BusinessError } 10200011 - The set method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  set(key: K, value: V): Object;
  /**
   * Remove a specified element from a Map object
   * @param key  Target to be deleted
   * @returns Target mapped value
   * @throws { BusinessError } 10200011 - The remove method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  remove(key: K): V;
  /**
   * Clear all element groups in the map
   * @throws { BusinessError } 10200011 - The clear method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  clear(): void;
  /**
   * Returns a new Iterator object that contains the keys contained in this map
   * @throws { BusinessError } 10200011 - The keys method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  keys(): IterableIterator<K>;
  /**
   * Returns a new Iterator object that contains the values contained in this map
   * @throws { BusinessError } 10200011 - The values method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  values(): IterableIterator<V>;
  /**
   * Replace the old value by new value corresponding to the specified key
   * @param key Updated targets
   * @param newValue Updated the target mapped value
   * @returns the boolean type(Is there a target pointed to by the key)
   * @throws { BusinessError } 10200011 - The replace method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  replace(key: K, newValue: V): boolean;
  /**
   * Executes the given callback function once for each real key in the map.
   * It does not perform functions on deleted keys
   * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  forEach(callbackFn: (value?: V, key?: K, map?: HashMap<K, V>) => void,
  thisArg?: Object): void;
  /**
   * Returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order
   * @throws { BusinessError } 10200011 - The entries method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  entries(): IterableIterator<[K, V]>;
  /**
   * returns an iterator.Each item of the iterator is a Javascript Object
   * @throws { BusinessError } 10200011 - The Symbol.iterator method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  [Symbol.iterator](): IterableIterator<[K, V]>;
}

export default HashMap;
