/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
 * A utility class used for handling objects that use the DataAbilityHelper scheme.
 * @name dataUriUtils
 * @since 7
 * @syscap SystemCapability.Ability.AbilityRuntime.Core
 * @permission N/A
 * @deprecated since 9
 * @useinstead @ohos.app.ability.dataUriUtils.d.ts
 */
declare namespace dataUriUtils {
  /**
   * Obtains the ID attached to the end of the path component of the given uri.
   *
   * @since 7
   * @syscap SystemCapability.Ability.AbilityRuntime.Core
   * @param uri Indicates the uri object from which the ID is to be obtained.
   * @returns Returns the ID attached to the end of the path component;
   */
  function getId(uri: string): number

  /**
   * Attaches the given ID to the end of the path component of the given uri.
   *
   * @since 7
   * @syscap SystemCapability.Ability.AbilityRuntime.Core
   * @param uri Indicates the uri string from which the ID is to be obtained.
   * @param id Indicates the ID to attach.
   * @returns Returns the uri object with the given ID attached.
   */
  function attachId(uri: string, id: number): string

  /**
   * Deletes the ID from the end of the path component of the given uri.
   *
   * @since 7
   * @syscap SystemCapability.Ability.AbilityRuntime.Core
   * @param uri Indicates the uri object from which the ID is to be deleted.
   * @returns Returns the uri object with the ID deleted.
   */
  function deleteId(uri: string): string

  /**
   * Updates the ID in the specified uri
   *
   * @since 7
   * @syscap SystemCapability.Ability.AbilityRuntime.Core
   * @param uri Indicates the uri object to be updated.
   * @param id Indicates the new ID.
   * @returns Returns the updated uri object.
   */
  function updateId(uri: string, id: number): string

}
export default dataUriUtils;