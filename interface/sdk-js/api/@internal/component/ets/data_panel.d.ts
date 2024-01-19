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
 * DataPanelType enum
 * @since 8
 */
/**
 * DataPanelType enum
 * @form
 * @since 9
 */
declare enum DataPanelType {
  /**
   * Line Type
   * @since 8
   */
  /**
   * Line Type
   * @form
   * @since 9
   */
  Line,

  /**
   * Line Rainbow
   * @since 8
   */
  /**
   * Line Rainbow
   * @form
   * @since 9
   */
  Circle,
}

/**
 * Defines the options of DataPanel.
 * @since 7
 */
/**
 * Defines the options of DataPanel.
 * @form
 * @since 9
 */
declare interface DataPanelOptions {
  /**
   * Current data value. the max length is 9.
   * @since 7
   */
  /**
   * Current data value. the max length is 9.
   * @form
   * @since 9
   */
  values: number[];

  /**
   * Maximum value of the current data.
   * @since 7
   */
  /**
   * Maximum value of the current data.
   * @form
   * @since 9
   */
  max?: number;

  /**
   * DataPanel Type
   * @since 8
   */
  /**
   * DataPanel Type
   * @form
   * @since 9
   */
  type?: DataPanelType;
}

/**
 * Defines the DataPanel component.
 * @since 7
 */
/**
 * Defines the DataPanel component.
 * @form
 * @since 9
 */
interface DataPanelInterface {
  /**
   * Return a DataPanel.
   * @since 7
   */
  /**
   * Return a DataPanel.
   * @form
   * @since 9
   */
  (options: DataPanelOptions): DataPanelAttribute;
}

/**
 * Defines the DataPanel attribute functions.
 * @since 7
 */
/**
 * Defines the DataPanel attribute functions.
 * @form
 * @since 9
 */
declare class DataPanelAttribute extends CommonMethod<DataPanelAttribute> {
  /**
   * Disable the special effect of the data ratio chart.
   * @since 7
   */
  /**
   * Disable the special effect of the data ratio chart.
   * @form
   * @since 9
   */
  closeEffect(value: boolean): DataPanelAttribute;
}

/**
 * Defines DataPanel Component.
 * @since 7
 */
/**
 * Defines DataPanel Component.
 * @form
 * @since 9
 */
declare const DataPanel: DataPanelInterface

/**
 * Defines DataPanel Component instance.
 * @since 7
 */
/**
 * Defines DataPanel Component instance.
 * @form
 * @since 9
 */
declare const DataPanelInstance: DataPanelAttribute;
