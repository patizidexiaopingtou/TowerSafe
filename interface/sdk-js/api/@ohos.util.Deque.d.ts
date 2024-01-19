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

declare class Deque<T> {
  /**
   * A constructor used to create a Deque object.
   * @throws { BusinessError } 10200012 - The Deque's constructor cannot be directly invoked.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  constructor();
  /**
   * Gets the element number of the Deque.This is a number one higher than the highest index in the deque.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  length: number;
  /**
   * Inserts an element into the deque header.
   * @param element to be appended to this deque
   * @throws { BusinessError } 10200011 - The insertFront method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  insertFront(element: T): void;
  /**
   * Inserting an element at the end of a deque
   * @param element to be appended to this deque
   * @throws { BusinessError } 10200011 - The insertEnd method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  insertEnd(element: T): void;
  /**
   * Check if deque contains the specified element
   * @param element element to be contained
   * @returns the boolean type,if deque contains the specified element,return true,else return false
   * @throws { BusinessError } 10200011 - The has method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  has(element: T): boolean;
  /**
   * Obtains the header element of a deque.
   * @returns the T type
   * @throws { BusinessError } 10200011 - The getFirst method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  getFirst(): T;
  /**
   * Obtains the end element of a deque.
   * @returns the T type
   * @throws { BusinessError } 10200011 - The getLast method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  getLast(): T;
  /**
   * Obtains the header element of a deque and delete the element.
   * @returns the T type
   * @throws { BusinessError } 10200011 - The popFirst method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  popFirst(): T;
  /**
   * Obtains the end element of a deque and delete the element.
   * @returns the T type
   * @throws { BusinessError } 10200011 - The popLast method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  popLast(): T;
  /**
   * Executes a provided function once for each value in the deque object.
   * @param callbackFn (required) A function that accepts up to four arguments.The function to be called for each element in the deque
   * @param Value (required) current element
   * @param Index (Optional) The index value of the current element.
   * @param deque (Optional) The deque object to which the current element belongs.
   * @param thisArg (Optional) The value passed to the function generally uses the "this" value.
   * If this parameter is empty, "undefined" will be passed to the "this" value
   * @throws { BusinessError } 401 - The type of parameters are invalid.
   * @throws { BusinessError } 10200011 - The forEach method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  forEach(callbackFn: (value: T, index?: number, deque?: Deque<T>) => void,
  thisArg?: Object): void;
  /**
   * returns an iterator.Each item of the iterator is a Javascript Object
   * @throws { BusinessError } 10200011 - The Symbol.iterator method cannot be bound.
   * @since 8
   * @syscap SystemCapability.Utils.Lang
   */
  [Symbol.iterator](): IterableIterator<T>;
}

export default Deque;