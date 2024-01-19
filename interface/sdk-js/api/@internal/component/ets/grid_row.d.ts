/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
 * Defines the option in length unit of grid-row component.
 * @form
 * @since 9
 */
declare interface GridRowSizeOption {
    /**
     * Grid Row Size Option xs
     * @form
     * @since 9
     */
    xs?: Length,

    /**
     * Grid Row Size Option sm
     * @form
     * @since 9
     */
    sm?: Length,

    /**
     * Grid Row Size Option md
     * @form
     * @since 9
     */
    md?: Length,

    /**
     * Grid Row Size Option lg
     * @form
     * @since 9
     */
    lg?: Length,

    /**
     * Grid Row Size Option xl
     * @form
     * @since 9
     */
    xl?: Length,

    /**
     * Grid Row Size Option xxl
     * @form
     * @since 9
     */
    xxl?: Length,
}

/**
 * Defines the option in number unit of grid-container component.
 * @form
 * @since 9
 */
declare interface GridRowColumnOption {
    /**
     * Grid Row Column Option xs
     * @form
     * @since 9
     */
    xs?: number,

    /**
     * Grid Row Column Option sm
     * @form
     * @since 9
     */
    sm?: number,

    /**
     * Grid Row Column Option md
     * @form
     * @since 9
     */
    md?: number,

    /**
     * Grid Row Column Option lg
     * @form
     * @since 9
     */
    lg?: number,

    /**
     * Grid Row Column Option xl
     * @form
     * @since 9
     */
    xl?: number,

    /**
     * Grid Row Column Option xxl
     * @form
     * @since 9
     */
    xxl?: number,
}

/**
 * Defines the gutter of grid-row component.
 * @form
 * @since 9
 */
declare interface GutterOption {
    /**
     * Define x in GutterOption
     * @form
     * @since 9
     */
    x?: Length | GridRowSizeOption,

    /**
     * Define y in GutterOption
     * @form
     * @since 9
     */
    y?: Length | GridRowSizeOption
}

/**
 * Defines the breakpoint reference of grid-container component.
 * @form
 * @since 9
 */
declare enum BreakpointsReference {
    /**
     * Respond to breakpoint changes according to window width
     * @form
     * @since 9
     */
    WindowSize,

    /**
     * Respond to breakpoint changes according to component width
     * @form
     * @since 9
     */
    ComponentSize,
}

/**
 * Defines the direction of grid-container component.
 * @form
 * @since 9
 */
declare enum GridRowDirection {
    /**
     * The elements in the grid component are arranged in rows
     * @form
     * @since 9
     */
    Row,

    /**
     * The elements in the grid component are arranged in reverse order of rows
     * @form
     * @since 9
     */
    RowReverse,
}

/**
 * Defines the breakpoints of grid-row component.
 * @form
 * @since 9
 */
declare interface BreakPoints {
    /**
     * Breakpoint array
     * @form
     * @since 9
     */
    value?: Array<string>,

    /**
     * Set breakpoint reference
     * @form
     * @since 9
     */
    reference?: BreakpointsReference,
}

/**
 * Defines the options of grid-row component.
 * @form
 * @since 9
 */
declare interface GridRowOptions {
    /**
     * layout spacing between sub-components
     * @form
     * @since 9
     */
    gutter?: Length | GutterOption;

    /**
     * Sets the total number of columns in the current layout.
     * @form
     * @since 9
     */
    columns?: number | GridRowColumnOption;

    /**
     * grid-row layout breakpoints.
     * @form
     * @since 9
     */
    breakpoints?: BreakPoints;

    /**
     * grid-row layout direction.
     * @form
     * @since 9
     */
    direction?: GridRowDirection;
}

/**
 * Defines the the new version of grid-container component.
 * @form
 * @since 9
 */
interface GridRowInterface {
    /**
     * Defines the constructor of GridRow.
     * @form
     * @since 9
     */
    (option?: GridRowOptions): GridRowAttribute;
}

declare class GridRowAttribute extends CommonMethod<GridRowAttribute> {
    /**
     * Callback triggered when the breakpoint changes
     * @form
     * @since 9
     */
    onBreakpointChange(callback: (breakpoints: string) => void): GridRowAttribute;
}

/**
 * Defines GridRow Component.
 * @form
 * @since 9
 */
declare const GridRow: GridRowInterface;

/**
 * Defines GridRow Component instance.
 * @form
 * @since 9
 */
declare const GridRowInstance: GridRowAttribute;