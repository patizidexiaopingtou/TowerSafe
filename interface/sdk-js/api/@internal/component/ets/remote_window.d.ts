/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
  * Round rect.
  *
  * @systemapi
  * @since 9
  */
interface RRect {
  left: number;

  top: number;

  width: number;

  height: number;

  radius: number;
}

/**
 * Window animation target.
 *
 * @systemapi
 * @since 9
 */
interface WindowAnimationTarget {
  readonly bundleName: string;

  readonly abilityName: string;

  readonly windowBounds: RRect;

  readonly missionId: number;
}

/**
 * Provides an interface for controlling the remote window.
 *
 * @systemapi
 * @since 9
 */
interface RemoteWindowInterface {
  /**
   * Called when the remote window interface is used.
   *
   * @systemapi
   * @since 9
   */
  (target: WindowAnimationTarget): RemoteWindowAttribute;
}

/**
 * Inheritance CommonMethod Set Styles
 *
 * @systemapi
 * @since 9
 */
declare class RemoteWindowAttribute extends CommonMethod<RemoteWindowAttribute> {}

/**
 * Defines RemoteWindow Component.
 * @since 9
 * @systemapi
 */
declare const RemoteWindow: RemoteWindowInterface;

/**
 * Defines RemoteWindow Component instance.
 * @since 9
 * @systemapi
 */
declare const RemoteWindowInstance: RemoteWindowAttribute;
