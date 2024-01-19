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
 * Mesh container for static fixed-size layout scenarios.
 * @since 9
 */
interface FlowItemInterface {
  /**
   * Construct the flow item.
   * @since 9
   */
  (): FlowItemAttribute;
}

/**
 * Defines the water flow item attribute.
 * @since 9
 */
declare class FlowItemAttribute extends CommonMethod<FlowItemAttribute> {}

/**
 * Defines FlowItem Component.
 * @since 9
 */
declare const FlowItem: FlowItemInterface

/**
 * Defines FlowItem Component instance.
 * @since 9
 */
declare const FlowItemInstance: FlowItemAttribute;
