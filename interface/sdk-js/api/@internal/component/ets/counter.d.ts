/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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

/**
 * Counter component, which provides corresponding increment or decrement counting operations.
 * @since 7
 */
/**
 * Counter component, which provides corresponding increment or decrement counting operations.
 * @form
 * @since 9
 */
interface CounterInterface {
  /**
   * Return Counter.
   * @since 7
   */
    /**
   * Return Counter.
   * @form
   * @since 9
   */
  (): CounterAttribute;
}

/**
 * Defines the Counter attribute functions.
 * @since 7
 */
/**
 * Defines the Counter attribute functions.
 * @form
 * @since 9
 */
declare class CounterAttribute extends CommonMethod<CounterAttribute> {
  /**
   * Listen to the event that the value increases.
   * @since 7
   */
  /**
   * Listen to the event that the value increases.
   * @form
   * @since 9
   */
  onInc(event: () => void): CounterAttribute;

  /**
   * Listens to the number decrease event.
   * @since 7
   */
  /**
   * Listens to the number decrease event.
   * @form
   * @since 9
   */
  onDec(event: () => void): CounterAttribute;
}

/**
 * Defines Counter Component instance.
 * @since 7
 */
/**
 * Defines Counter Component instance.
 * @form
 * @since 9
 */
declare const CounterInstance: CounterAttribute;

/**
 * Defines Counter Component.
 * @since 7
 */
/**
 * Defines Counter Component.
 * @form
 * @since 9
 */
declare const Counter: CounterInterface;
