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

declare class LinkedList<T> {
  /**
   * A constructor used to create a LinkedList object.
   * @throws { BusinessError } 10200012 - The LinkedList's constructor cannot be directly invoked.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  constructor();
  /**
   * Gets the element number of the LinkedList. This is a number one higher than the highest index in the linkedlist.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  length: number;
  /**
   * Appends the specified element to the end of this linkedlist.
   * @param element to be appended to this linkedlist
   * @returns the boolean type, returns true if the addition is successful, and returns false if it fails.
   * @throws { BusinessError } 10200011 - The add method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  add(element: T): boolean;
  /**
   * Inserts the specified element at the specified position in this linkedlist.
   * @param index index at which the specified element is to be inserted
   * @param element element to be inserted
   * @throws { BusinessError } 10200011 - The insert method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @throws { BusinessError } 10200001 - The value of index is out of range.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  insert(index: number, element: T): void;
  /**
   * Returns the element at the specified position in this linkedlist,
   * or returns undefined if this linkedlist is empty
   * @param index specified position
   * @returns the T type
   * @throws { BusinessError } 10200011 - The get method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  get(index: number): T;
  /**
   * Inserts the specified element at the beginning of this LinkedList.
   * @param element the element to add
   * @throws { BusinessError } 10200011 - The addFirst method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  addFirst(element: T): void;
  /**
   * Retrieves and removes the head (first element) of this linkedlist.
   * @returns the head of this list
   * @throws { BusinessError } 10200011 - The removeFirst method cannot be bound.
   * @throws { BusinessError } 10200010 - Container is empty.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  removeFirst(): T;
  /**
   * Removes and returns the last element from this linkedlist.
   * @returns the head of this list
   * @throws { BusinessError } 10200011 - The removeLast method cannot be bound.
   * @throws { BusinessError } 10200010 - Container is empty.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  removeLast(): T;
  /**
   * Check if linkedlist contains the specified element
   * @param element element to be contained
   * @returns the boolean type,if linkedList contains the specified element,return true,else return false
   * @throws { BusinessError } 10200011 - The has method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  has(element: T): boolean;
  /**
   * Returns the index of the first occurrence of the specified element
   * in this linkedlist, or -1 if this linkedlist does not contain the element.
   * @param element element to be contained
   * @returns the number type ,returns the lowest index such that or -1 if there is no such index.
   * @throws { BusinessError } 10200011 - The getIndexOf method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  getIndexOf(element: T): number;
  /**
   * Find the corresponding element according to the index,
   * @param index the index in the linkedlist
   * @returns the T type ,returns undefined if linkedlist is empty,If the index is
   * out of bounds (greater than or equal to length or less than 0), throw an exception
   * @throws { BusinessError } 10200011 - The removeByIndex method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @throws { BusinessError } 10200001 - The value of index is out of range.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  removeByIndex(index: number): T;
  /**
   * Removes the first occurrence of the specified element from this linkedlist,
   * if it is present.  If the linkedlist does not contain the element, it is
   * unchanged.  More formally, removes the element with the lowest index
   * @param element element to remove
   * @returns the boolean type ,If there is no such element, return false
   * @throws { BusinessError } 10200011 - The remove method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  remove(element: T): boolean;
  /**
   * Removes the first occurrence of the specified element from this linkedlist,
   * if it is present.  If the linkedlist does not contain the element, it is
   * unchanged.  More formally, removes the element with the lowest index
   * @param element element to remove
   * @returns the boolean type ,If there is no such element, return false
   * @throws { BusinessError } 10200011 - The removeFirstFound method cannot be bound.
   * @throws { BusinessError } 10200010 - Container is empty.
   * @throws { BusinessError } 10200017 - The element does not exist in this container.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  removeFirstFound(element: T): boolean;
  /**
   * Removes the last occurrence of the specified element from this linkedlist,
   * if it is present.  If the linkedlist does not contain the element, it is
   * unchanged.  More formally, removes the element with the lowest index
   * @param element element to remove
   * @returns the boolean type ,If there is no such element, return false
   * @throws { BusinessError } 10200011 - The removeLastFound method cannot be bound.
   * @throws { BusinessError } 10200010 - Container is empty.
   * @throws { BusinessError } 10200017 - The element does not exist in this container.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  removeLastFound(element: T): boolean;
  /**
   * Returns in the index of the last occurrence of the specified element in this linkedlist ,
   * or -1 if the linkedlist does not contain the element.
   * @param element element to find
   * @returns the number type
   * @throws { BusinessError } 10200011 - The getLastIndexOf method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  getLastIndexOf(element: T): number;
  /**
   * Returns the first element (the item at index 0) of this linkedlist.
   * or returns undefined if linkedlist is empty
   * @returns the T type ,returns undefined if linkedList is empty
   * @throws { BusinessError } 10200011 - The getFirst method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  getFirst(): T;
  /**
   * Returns the Last element (the item at index length-1) of this linkedlist.
   * or returns undefined if linkedlist is empty
   * @returns the T type ,returns undefined if linkedList is empty
   * @throws { BusinessError } 10200011 - The getLast method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  getLast(): T;
  /**
   * Replaces the element at the specified position in this Vector with the specified element
   * @param element replaced element
   * @param index index to find
   * @returns the T type ,returns undefined if linkedList is empty
   * @throws { BusinessError } 10200011 - The set method cannot be bound.
   * @throws { BusinessError } 10200001 - The value of index is out of range.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  set(index: number, element: T): T;
  /**
   * Replaces each element of this linkedlist with the result of applying the operator to that element.
   * @param callbackFn (required) A function that accepts up to four arguments.
   * The function to be called for each element in the linkedlist,Returns the result of an operation
   * @param Value (required) current element
   * @param Index (Optional) The index value of the current element.
   * @param LinkedList (Optional) The linkedlist object to which the current element belongs.
   * @param thisArg (Optional) The value passed to the function generally uses the "this" value.
   * If this parameter is empty, "undefined" will be passed to the "this" value
   * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  forEach(callbackFn: (value: T, index?: number, LinkedList?: LinkedList<T>) => void,
  thisArg?: Object): void;
  /**
   * Removes all of the elements from this linkedlist.The linkedlist will
   * be empty after this call returns.length becomes 0
   * @throws { BusinessError } 10200011 - The clear method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  clear(): void;
  /**
   * Returns a shallow copy of this instance. (The elements themselves are not copied.)
   * @returns this linkedlist instance
   * @throws { BusinessError } 10200011 - The clone method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  clone(): LinkedList<T>;
  /**
   * convert linkedlist to array
   * @returns the Array type
   * @throws { BusinessError } 10200011 - The convertToArray method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  convertToArray(): Array<T>;
  /**
   * returns an iterator.Each item of the iterator is a Javascript Object
   * @throws { BusinessError } 10200011 - The Symbol.iterator method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  [Symbol.iterator](): IterableIterator<T>;
}

export default LinkedList;
