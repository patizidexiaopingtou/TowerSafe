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

declare class LightWeightSet<T> {
  /**
   * A constructor used to create a LightWeightSet object.
   * @throws { BusinessError } 10200012 - The LightWeightSet's constructor cannot be directly invoked.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  constructor();
  /**
   * Gets the element number of the LightWeightSet.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  length: number;
  /**
   * If the set does not contain the element, the specified element is added
   * @param value Added element
   * @returns the boolean type(Is there contain this element)
   * @throws { BusinessError } 10200011 - The add method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  add(obj: T): boolean;
  /**
   * Adds all the objects in a specified LightWeightSet container to the current LightWeightSet container
   * @param set the Set object to provide the added element
   * @returns the boolean type(Is there any new data added successfully)
   * @throws { BusinessError } 10200011 - The addAll method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  addAll(set: LightWeightSet<T>): boolean;
  /**
   * Returns whether this set has all the object in a specified set
   * @param set the Set object to compare
   * @returns the boolean type
   * @throws { BusinessError } 10200011 - The hasAll method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  hasAll(set: LightWeightSet<T>): boolean;
  /**
   * Checks whether an LightWeightSet container has a specified key
   * @param key need to determine whether to include the key
   * @returns the boolean type
   * @throws { BusinessError } 10200011 - The has method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  has(key: T): boolean;
  /**
   * Checks whether an the objects of an LightWeighSet container are of the same type as a specified Object LightWeightSet
   * @param obj need to determine whether to include the obj
   * @returns the boolean type
   * @throws { BusinessError } 10200011 - The equal method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  equal(obj: Object): boolean;
  /**
   * Ensures that the capacity of an LightWeightSet container is greater than or equal to a specified value,
   * and that the container has all the original objects after capacity expansion
   * @param minimumCapacity Minimum capacity to be reserved
   * @throws { BusinessError } 10200011 - The increaseCapacityTo method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @throws { BusinessError } 10200001 - The value of minimumCapacity is out of range.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  increaseCapacityTo(minimumCapacity: number): void;
  /**
   * Obtains the index of s key of a specified Object type in an LightWeightSet container
   * @param key Looking for goals
   * @returns Subscript corresponding to target
   * @throws { BusinessError } 10200011 - The getIndexOf method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  getIndexOf(key: T): number;
  /**
   * Deletes an object of a specified Object type from an LightWeightSet container
   * @param key  Target to be deleted
   * @returns Target element
   * @throws { BusinessError } 10200011 - The remove method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  remove(key: T): T;
  /**
   * Deletes an object at the location identified by index from an LightWeightSet container
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
   * Executes the given callback function once for each real key in the map.
   * It does not perform functions on deleted keys
   * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  forEach(callbackFn: (value?: T, key?: T, set?: LightWeightSet<T>) => void,
  thisArg?: Object): void;
  /**
   * returns an ES6 iterator.Each item of the iterator is a Javascript Object
   * @throws { BusinessError } 10200011 - The Symbol.iterator method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  [Symbol.iterator](): IterableIterator<T>;
  /**
   * Obtains a string that contains all the keys and values in an LightWeightSet container
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  toString(): String;
  /**
   * Obtains an Array that contains all the objects of an LightWeightSet container.
   * @throws { BusinessError } 10200011 - The toArray method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  toArray(): Array<T>;
  /**
   * Obtains the object at the location  identified by index in an LightWeightSet container
   * @param index Target subscript for search
   * @returns the value of key-value pairs
   * @throws { BusinessError } 10200011 - The getValueAt method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  getValueAt(index: number): T;
  /**
   * Returns a ES6 iterator of the values contained in this Set
   * @throws { BusinessError } 10200011 - The values method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  values(): IterableIterator<T>;
  /**
   * Returns a Iterator object that contains the [key, value] pairs for each element in the Set object in insertion order
   * @throws { BusinessError } 10200011 - The entries method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  entries(): IterableIterator<[T, T]>;
  /**
   * Returns whether the set object contains elements
   * @throws { BusinessError } 10200011 - The isEmpty method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  isEmpty(): boolean;
}

export default LightWeightSet;
