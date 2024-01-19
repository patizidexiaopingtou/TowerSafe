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

declare class List<T> {
  /**
   * A constructor used to create a List object.
   * @throws { BusinessError } 10200012 - The List's constructor cannot be directly invoked.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  constructor();
  /**
   * Gets the element number of the List. This is a number one higher than the highest index in the list.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  length: number;
  /**
   * Appends the specified element to the end of this list.
   * @param element to be appended to this list
   * @returns the boolean type, returns true if the addition is successful, and returns false if it fails.
   * @throws { BusinessError } 10200011 - The add method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  add(element: T): boolean;
  /**
   * Inserts the specified element at the specified position in this list.
   * @param index index at which the specified element is to be inserted
   * @param element element to be inserted
   * @throws { BusinessError } 10200011 - The insert method cannot be bound.
   * @throws { BusinessError } 10200001 - The value of index is out of range.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  insert(element: T, index: number): void;
  /**
   * Returns the element at the specified position in this list,
   * or returns undefined if this list is empty
   * @param index specified position
   * @returns the T type
   * @throws { BusinessError } 10200011 - The get method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  get(index: number): T;
  /**
   * Check if list contains the specified element
   * @param element element to be contained
   * @returns the boolean type,if list contains the specified element,return true,else return false
   * @throws { BusinessError } 10200011 - The has method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  has(element: T): boolean;
  /**
   * Returns the index of the first occurrence of the specified element
   * in this list, or -1 if this list does not contain the element.
   * @param element element to be contained
   * @returns the number type ,returns the lowest index such that or -1 if there is no such index.
   * @throws { BusinessError } 10200011 - The getIndexOf method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  getIndexOf(element: T): number;
  /**
   * Find the corresponding element according to the index,
   * @param index the index in the list
   * @returns the T type ,returns undefined if list is empty,If the index is
   * out of bounds (greater than or equal to length or less than 0), throw an exception
   * @throws { BusinessError } 10200011 - The removeByIndex method cannot be bound.
   * @throws { BusinessError } 10200001 - The value of index is out of range.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  removeByIndex(index: number): T;
  /**
   * Removes the first occurrence of the specified element from this list,
   * if it is present.  If the list does not contain the element, it is
   * unchanged.  More formally, removes the element with the lowest index
   * @param element element to remove
   * @returns the boolean type ,If there is no such element, return false
   * @throws { BusinessError } 10200011 - The remove method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  remove(element: T): boolean;
  /**
   * Returns in the index of the last occurrence of the specified element in this list ,
   * or -1 if the list does not contain the element.
   * @param element element to find
   * @returns the number type
   * @throws { BusinessError } 10200011 - The getLastIndexOf method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  getLastIndexOf(element: T): number;
  /**
   * Returns the first element (the item at index 0) of this list.
   * or returns undefined if list is empty
   * @returns the T type ,returns undefined if list is empty
   * @throws { BusinessError } 10200011 - The getFirst method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  getFirst(): T;
  /**
   * Returns the Last element (the item at index length-1) of this list.
   * or returns undefined if list is empty
   * @returns the T type ,returns undefined if list is empty
   * @throws { BusinessError } 10200011 - The getLast method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  getLast(): T;
  /**
   * Replaces the element at the specified position in this List with the specified element
   * @param element replaced element
   * @param index index to find
   * @returns the T type
   * @throws { BusinessError } 10200011 - The set method cannot be bound.
   * @throws { BusinessError } 10200001 - The value of index is out of range.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  set(index: number, element: T): T;
  /**
   * Compares the specified object with this list for equality.if the object are the same as this list
   * return true, otherwise return false.
   * @param obj Compare objects
   * @returns the boolean type
   * @throws { BusinessError } 10200011 - The equal method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  equal(obj: Object): boolean;
  /**
   * Replaces each element of this list with the result of applying the operator to that element.
   * @param callbackFn (required) A function that accepts up to four arguments.
   * The function to be called for each element in the list,Returns the result of an operation
   * @param Value (required) current element
   * @param Index (Optional) The index value of the current element.
   * @param List (Optional) The list object to which the current element belongs.
   * @param thisArg (Optional) The value passed to the function generally uses the "this" value.
   * If this parameter is empty, "undefined" will be passed to the "this" value
   * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  forEach(callbackFn: (value: T, index?: number, List?: List<T>) => void,
  thisArg?: Object): void;
  /**
   * Sorts this list according to the order induced by the specified comparator
   * @param comparator (required) A function that accepts up to two arguments.
   * Specifies the sort order. Must be a function,return number type,If it returns firstValue 
   * minus secondValue, it returns an list sorted in ascending order;If it returns secondValue 
   * minus firstValue, it returns an list sorted in descending order;
   * @param firstValue (Optional) previous element
   * @param secondValue (Optional) next elements
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @throws { BusinessError } 10200011 - The sort method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  sort(comparator: (firstValue: T, secondValue: T) => number): void;
  /**
   * Removes all of the elements from this list.The list will
   * be empty after this call returns.length becomes 0
   * @throws { BusinessError } 10200011 - The clear method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  clear(): void;
  /**
   * Returns a view of the portion of this list between the specified fromIndex,inclusive,and toIndex,exclusive
   * @param fromIndex The starting position of the index, containing the value at that index position
   * @param toIndex the end of the index, excluding the value at that index
   * @throws { BusinessError } 10200011 - The getSubList method cannot be bound.
   * @throws { BusinessError } 10200001 - The value of fromIndex or toIndex is out of range.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  getSubList(fromIndex: number, toIndex: number): List<T>;
  /**
   * Replaces each element of this list with the result of applying the operator to that element.
   * @param callbackFn (required) A function that accepts up to four arguments.
   * The function to be called for each element in the list,Returns the result of an operation
   * @param Value (required) current element
   * @param Index (Optional) The index value of the current element.
   * @param list (Optional) The list object to which the current element belongs.
   * @param thisArg (Optional) The value passed to the function generally uses the "this" value.
   * If this parameter is empty, "undefined" will be passed to the "this" value
   * @throws { BusinessError } 10200011 - The replaceAllElements method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  replaceAllElements(callbackFn: (value: T, index?: number, list?: List<T>) => T,
  thisArg?: Object): void;
  /**
   * convert list to array
   * @returns the Array type
   * @throws { BusinessError } 10200011 - The convertToArray method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  convertToArray(): Array<T>;
  /**
   * Determine whether list is empty and whether there is an element
   * @returns the boolean type
   * @throws { BusinessError } 10200011 - The isEmpty method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  isEmpty(): boolean;
  /**
   * returns an iterator.Each item of the iterator is a Javascript Object
   * @throws { BusinessError } 10200011 - The Symbol.iterator method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  [Symbol.iterator](): IterableIterator<T>;
}

export default List;
