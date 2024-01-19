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
* Defines the water flow options.
* @since 9
*/
declare interface WaterFlowOptions {
  /**
   * Describes the water flow footer.
   * @since 9
   */
  footer?: CustomBuilder;

  /**
   * Describes the water flow scroller.
   * @since 9
   */
  scroller?: Scroller;
}


/**
 * Defines the water flow interface.
 * @since 9
 */
interface WaterFlowInterface {
  /**
   * WaterFlow is returned when the parameter is transferred. Only support api: scrollToIndex
   * @since 9
   */
  (options?: WaterFlowOptions): WaterFlowAttribute;
}

/**
 * Defines the water flow attribute.
 * @since 9
 */
declare class WaterFlowAttribute extends CommonMethod<WaterFlowAttribute> {
  /**
   * This parameter specifies the number of columns in the current waterflow.
   * @since 9
   */
  columnsTemplate(value: string): WaterFlowAttribute;

  /**
   * This parameter specifies the min or max size of each item.
   * @since 9
   */
  itemConstraintSize(value: ConstraintSizeOptions): WaterFlowAttribute;

  /**
   * Set the number of rows in the current waterflow.
   * @since 9
   */
  rowsTemplate(value: string): WaterFlowAttribute;

  /**
   * Set the spacing between columns.
   * @since 9
   */
  columnsGap(value: Length): WaterFlowAttribute;

  /**
   * Set the spacing between rows.
   * @since 9
   */
  rowsGap(value: Length): WaterFlowAttribute;

  /**
   * Control layout direction of the WaterFlow.
   * @since 9
   */
  layoutDirection(value: FlexDirection): WaterFlowAttribute;
  
  /**
   * Called when the water flow begins to arrive.
   * @since 9
   */
  onReachStart(event: () => void): WaterFlowAttribute;

  /**
   * Called when the water flow reaches the end.
   * @since 9
   */
  onReachEnd(event: () => void): WaterFlowAttribute;
}

/**
 * Defines WaterFlow Component.
 * @since 9
 */
declare const WaterFlow: WaterFlowInterface;

/**
 * Defines WaterFlow Component instance.
 * @since 9
 */
declare const WaterFlowInstance: WaterFlowAttribute;
