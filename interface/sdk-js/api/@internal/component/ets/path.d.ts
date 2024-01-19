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
 * Provides the path drawing interface.
 * @since 7
 */
/**
 * Provides the path drawing interface.
 * @form
 * @since 9
 */
interface PathInterface {
  /**
   * Use new to create Path.
   * @since 7
   */
  /**
   * Use new to create Path.
   * @form
   * @since 9
   */
  new (value?: { width?: number | string; height?: number | string; commands?: string }): PathAttribute;

  /**
   * Called when drawing path.
   * @since 7
   */
  /**
   * Called when drawing path.
   * @form
   * @since 9
   */
  (value?: { width?: number | string; height?: number | string; commands?: string }): PathAttribute;
}

/**
 * @since 7
 */
/**
 * @form
 * @since 9
 */
declare class PathAttribute extends CommonShapeMethod<PathAttribute> {
  /**
   * Called when the command string drawn by the path is set.
   * @since 7
   */
  /**
   * Called when the command string drawn by the path is set.
   * @form
   * @since 9
   */
  commands(value: string): PathAttribute;
}

/**
 * Defines Path Component.
 * @since 7
 */
/**
 * Defines Path Component.
 * @form
 * @since 9
 */
declare const Path: PathInterface;

/**
 * Defines Path Component instance.
 * @since 7
 */
/**
 * Defines Path Component instance.
 * @form
 * @since 9
 */
declare const PathInstance: PathAttribute;
