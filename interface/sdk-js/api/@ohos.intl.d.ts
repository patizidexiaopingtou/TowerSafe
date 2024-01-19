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
 * Provides internationalization related APIs.
 *
 * @syscap SystemCapability.Global.I18n
 * @since 6
 */
declare namespace intl {
/**
 * Provides the options of Locale.
 *
 * @since 6
 * @syscap SystemCapability.Global.I18n
 */
export interface LocaleOptions {
    /**
     * Indicates the calendar.
     * @type { string } calendar
     * @since 6
     */
    /**
     * Indicates the calendar.
     * @type { string } [ calendar ]
     * @since 9
     */
    calendar?: string;

    /**
     * Indicates the collation.
     * @type { string } collation
     * @since 6
     */
    /**
     * Indicates the collation.
     * @type { string } [ collation ]
     * @since 9
     */
    collation?: string;
    
    /**
     * Indicates the hourCycle.
     * @type { string } hourCycle
     * @since 6
     */
    /**
     * Indicates the hourCycle.
     * @type { string } [ hourCycle ]
     * @since 9
     */
    hourCycle?: string;
    
    /**
     * Indicates the numberingSystem.
     * @type { string } numberingSystem
     * @since 6
     */
    /**
     * Indicates the numberingSystem.
     * @type { string } [ numberingSystem ]
     * @since 9
     */
    numberingSystem?: string;
    
    /**
     * Indicates the numeric.
     * @type { boolean } numeric
     * @since 6
     */
    /**
     * Indicates the numeric.
     * @type { boolean } [ numeric ]
     * @since 9
     */
    numeric?: boolean;
    
    /**
     * Indicates the caseFirst.
     * @type { string } caseFirst
     * @since 6
     */
    /**
     * Indicates the caseFirst.
     * @type { string } [ caseFirst ]
     * @since 9
     */
    caseFirst?: string;
}

/**
 * Provides APIs for obtaining locale information.
 *
 * @syscap SystemCapability.Global.I18n
 * @since 6
 */
export class Locale {
    /**
     * A constructor used to create a Locale object.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
   constructor();

    /**
     * A constructor used to create a Locale object.
     *
     * @syscap SystemCapability.Global.I18n
     * @param locale Indicates a character string containing the locale information, including
     *               the language and optionally the script and region.
     * @param options Indicates Locale option object use to initialize the Locale object.
     * @since 6
     */
   constructor(locale: string, options?: LocaleOptions);

    /**
     * Indicates the language of the locale.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    language: string

    /**
     * Indicates the script of the locale.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    script: string

    /**
     * Indicates the region of the locale.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    region: string

    /**
     * Indicates the basic locale information, which is returned as a substring of
     * a complete locale string.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    baseName: string

    /**
     * Indicates the case first style of the locale.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    caseFirst: string

    /**
     * Indicates the calendar.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    calendar: string

    /**
     * Indicates the collation.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    collation: string

    /**
     * Indicates the hour cycle.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    hourCycle:  string

    /**
     * Indicates the numbering system.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    numberingSystem: string

    /**
     * Indicates whether it is numeric.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    numeric: boolean

    /**
     * Convert the locale information to string.
     *
     * @syscap SystemCapability.Global.I18n
     * @returns Returns locale information in string form.
     * @since 6
     */
    toString(): string;

    /**
     * Maximize the locale's base information.
     *
     * @syscap SystemCapability.Global.I18n
     * @returns Returns maximized locale.
     * @since 6
     */
    maximize(): Locale;

    /**
     * Minimize the locale's base information.
     *
     * @syscap SystemCapability.Global.I18n
     * @returns Returns minimized locale.
     * @since 6
     */
    minimize(): Locale;
}

/**
 * Provides the options of date time format.
 *
 * @syscap SystemCapability.Global.I18n
 * @since 6
 */
export interface DateTimeOptions {
    /**
     * Indicates the locale.
     * @type { string } locale
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the locale.
     * @type { string } [ locale ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    locale?: string

    /**
     * Indicates the dateStyle.
     * @type { string } dateStyle
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the dateStyle.
     * @type { string } [ dateStyle ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    dateStyle?: string

    /**
     * Indicates the timeStyle.
     * @type { string } timeStyle
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the timeStyle.
     * @type { string } [ timeStyle ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    timeStyle?: string

    /**
     * Indicates the hourCycle.
     * @type { string } hourCycle
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the hourCycle.
     * @type { string } [ hourCycle ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    hourCycle?: string

    /**
     * Indicates the timeZone.
     * @type { string } timeZone
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the timeZone.
     * @type { string } [ timeZone ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    timeZone?: string

    /**
     * Indicates the numberingSystem.
     * @type { string } numberingSystem
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the numberingSystem.
     * @type { string } [ numberingSystem ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    numberingSystem?: string

    /**
     * Indicates the hour12.
     * @type { boolean } hour12
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the hour12.
     * @type { boolean } [ hour12 ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    hour12?: boolean

    /**
     * Indicates the weekday.
     * @type { string } weekday
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the weekday.
     * @type { string } [ weekday ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    weekday?: string

    /**
     * Indicates the era.
     * @type { string } era
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the era.
     * @type { string } [ era ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    era?: string

    /**
     * Indicates the year.
     * @type { string } year
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the year.
     * @type { string } [ year ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    year?: string

    /**
     * Indicates the month.
     * @type { string } month
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the month.
     * @type { string } [ month ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    month?: string

    /**
     * Indicates the day.
     * @type { string } day
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the day.
     * @type { string } [ day ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    day?: string

    /**
     * Indicates the hour.
     * @type { string } hour
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the hour.
     * @type { string } [ hour ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    hour?: string

    /**
     * Indicates the minute.
     * @type { string } minute
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the minute.
     * @type { string } [ minute ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    minute?: string

    /**
     * Indicates the second.
     * @type { string } second
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the second.
     * @type { string } [ second ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    second?: string

    /**
     * Indicates the timeZoneName.
     * @type { string } timeZoneName
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the timeZoneName.
     * @type { string } [ timeZoneName ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    timeZoneName?: string

    /**
     * Indicates the dayPeriod.
     * @type { string } dayPeriod
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the dayPeriod.
     * @type { string } [ dayPeriod ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    dayPeriod?: string

    /**
     * Indicates the localeMatcher.
     * @type { string } localeMatcher
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the localeMatcher.
     * @type { string } [ localeMatcher ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    localeMatcher?: string

    /**
     * Indicates the formatMatcher.
     * @type { string } formatMatcher
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the formatMatcher.
     * @type { string } [ formatMatcher ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    formatMatcher?: string
}

/**
 * Provides the API for formatting date strings.
 *
 * @syscap SystemCapability.Global.I18n
 * @since 6
 */
export class DateTimeFormat {
    /**
     * A constructor used to create a DateTimeFormat object.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    constructor();

    /**
     * A constructor used to create a DateTimeFormat object.
     *
     * @syscap SystemCapability.Global.I18n
     * @param locale Indicates character string containing the locale information, including
     *               the language and optionally the script and region, for the DateTimeFormat object.
     * @param options Indicates the options used to format the date.
     * @since 6
     */
    constructor(locale: string | Array<string>, options?: DateTimeOptions);

    /**
     * Obtains the formatted date strings.
     *
     * @syscap SystemCapability.Global.I18n
     * @param date Indicates the Date object to be formatted.
     * @returns Returns a date string formatted based on the specified locale.
     * @since 6
     */
    format(date: Date): string;

    /**
     * Obtains the formatted date strings of a date range.
     *
     * @syscap SystemCapability.Global.I18n
     * @param startDate Indicates the start date of the date range.
     * @param endDate Indicates the end date of the date range.
     * @returns Returns a date string formatted based on the specified locale.
     * @since 6
     */
    formatRange(startDate: Date, endDate: Date): string;

    /**
     * Obtains the options of the DateTimeFormat object.
     *
     * @syscap SystemCapability.Global.I18n
     * @returns Returns the options of the DateTimeFormat object.
     * @since 6
     */
    resolvedOptions(): DateTimeOptions;
}

/**
 * Provides the options of number format.
 *
 * @syscap SystemCapability.Global.I18n
 * @since 6
 */
export interface NumberOptions {
    /**
     * Indicates the locale.
     * @type { string } locale
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the locale.
     * @type { string } [ locale ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    locale?: string

    /**
     * Indicates the currency.
     * @type { string } currency
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the currency.
     * @type { string } [ currency ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    currency?: string

    /**
     * Indicates the currencySign.
     * @type { string } currencySign
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the currencySign.
     * @type { string } [ currencySign ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    currencySign?: string

    /**
     * Indicates the currencyDisplay.
     * @type { string } currencyDisplay
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the currencyDisplay.
     * @type { string } [ currencyDisplay ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    currencyDisplay?: string

    /**
     * Indicates the unit.
     * @type { string } unit
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the unit.
     * @type { string } [ unit ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    unit?: string

    /**
     * Indicates the unitDisplay.
     * @type { string } unitDisplay
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the unitDisplay.
     * @type { string } [ unitDisplay ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    unitDisplay?: string

    /**
     * Indicates the unitUsage.
     * @type { string } unitUsage
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * Indicates the unitUsage.
     * @type { string } [ unitUsage ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    unitUsage?: string

    /**
     * Indicates the signDisplay.
     * @type { string } signDisplay
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the signDisplay.
     * @type { string } [ signDisplay ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    signDisplay?: string

    /**
     * Indicates the compactDisplay.
     * @type { string } compactDisplay
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the compactDisplay.
     * @type { string } [ compactDisplay ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    compactDisplay?: string

    /**
     * Indicates the notation.
     * @type { string } notation
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the notation.
     * @type { string } [ notation ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    notation?: string

    /**
     * Indicates the localeMatcher.
     * @type { string } localeMatcher
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the localeMatcher.
     * @type { string } [ localeMatcher ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    localeMatcher?: string

    /**
     * Indicates the style.
     * @type { string } style
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the style.
     * @type { string } [ style ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    style?: string

    /**
     * Indicates the numberingSystem.
     * @type { string } numberingSystem
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the numberingSystem.
     * @type { string } [ numberingSystem ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    numberingSystem?: string

    /**
     * Indicates the useGrouping.
     * @type { boolean } useGrouping
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the useGrouping.
     * @type { boolean } [ useGrouping ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    useGrouping?: boolean

    /**
     * Indicates the minimumIntegerDigits.
     * @type { number } minimumIntegerDigits
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the minimumIntegerDigits.
     * @type { number } [ minimumIntegerDigits ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    minimumIntegerDigits?: number

    /**
     * Indicates the minimumFractionDigits.
     * @type { number } minimumFractionDigits
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the minimumFractionDigits.
     * @type { number } [ minimumFractionDigits ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    minimumFractionDigits?: number

    /**
     * Indicates the maximumFractionDigits.
     * @type { number } maximumFractionDigits
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the maximumFractionDigits.
     * @type { number } [ maximumFractionDigits ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    maximumFractionDigits?: number

    /**
     * Indicates the minimumSignificantDigits.
     * @type { number } minimumSignificantDigits
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the minimumSignificantDigits.
     * @type { number } [ minimumSignificantDigits ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    minimumSignificantDigits?: number

    /**
     * Indicates the maximumSignificantDigits.
     * @type { number } maximumSignificantDigits
     * @syscap SystemCapability.Global.I18n
     * @since 6
     */
    /**
     * Indicates the maximumSignificantDigits.
     * @type { number } [ maximumSignificantDigits ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    maximumSignificantDigits?: number
}

/**
 * Provides the API for formatting number strings.
 *
 * @syscap SystemCapability.Global.I18n
 * @since 6
 */
export class NumberFormat {
    /**
     * A constructor used to create a NumberFormat object.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    constructor();

    /**
     * A constructor used to create a NumberFormat object.
     *
     * @syscap SystemCapability.Global.I18n
     * @param locale Indicates a character string containing the locale information, including
     *               the language and optionally the script and region, for the NumberFormat object.
     * @param options Indicates the options used to format the number.
     * @since 6
     */
    constructor(locale: string | Array<string>, options?: NumberOptions);

    /**
     * Obtains the formatted number string.
     *
     * @syscap SystemCapability.Global.I18n
     * @param number Indicates the number to be formatted.
     * @returns Returns a number string formatted based on the specified locale.
     * @since 6
     */
    format(number: number): string;

    /**
     * Obtains the options of the NumberFormat object.
     *
     * @syscap SystemCapability.Global.I18n
     * @returns Returns the options of the NumberFormat object.
     * @since 6
     */
    resolvedOptions(): NumberOptions;
}

/**
 * Provides the options of Collator
 *
 * @syscap SystemCapability.Global.I18n
 * @since 8
 */
export interface CollatorOptions {
    /**
     * The locale matching algorithm to use.
     * Possible values are "lookup" and "best fit"; the default is "best fit".
     *
     * @type { string } localeMatcher
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * The locale matching algorithm to use.
     * Possible values are "lookup" and "best fit"; the default is "best fit".
     *
     * @type { string } [ localeMatcher ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    localeMatcher?: string;

    /**
     * Whether the comparison is for sorting or for searching for matching strings.
     * Possible values are "sort" and "search"; the default is "sort".
     *
     * @type { string } usage
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * Whether the comparison is for sorting or for searching for matching strings.
     * Possible values are "sort" and "search"; the default is "sort".
     *
     * @type { string } [ usage ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    usage?: string;

    /**
     * Which differences in the strings should lead to non-zero result values.
     * Possible values are "base", "accent", "case", "variant".
     * "base" are used when only strings that differ in base letters compare as unequal.
     * "accent" are used when only strings that differ in base letters or accents and
     *  other diacritic marks compare as unequal.
     * "case" are used when only strings that differ in base letters or case compare as unequal.
     * "variant" are used when Strings that differ in base letters, accents and other diacritic marks,
     *  or case compare as unequal.
     *
     * @type { string } sensitivity
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * Which differences in the strings should lead to non-zero result values.
     * Possible values are "base", "accent", "case", "variant".
     * "base" are used when only strings that differ in base letters compare as unequal.
     * "accent" are used when only strings that differ in base letters or accents and
     *  other diacritic marks compare as unequal.
     * "case" are used when only strings that differ in base letters or case compare as unequal.
     * "variant" are used when Strings that differ in base letters, accents and other diacritic marks,
     *  or case compare as unequal.
     * @type { string } [ sensitivity ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    sensitivity?: string;

    /**
     * Whether punctuation should be ignored. default value is false.
     *
     * @type { boolean } ignorePunctuation
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * Whether punctuation should be ignored. Default value is false.
     *
     * @type { boolean } [ ignorePunctuation ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    ignorePunctuation?: boolean;

    /**
     * Variant collations for certain locales.
     *
     * @type { string } collation
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * Variant collations for certain locales.
     *
     * @type { string } [ collation ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    collation?: string;

    /**
     * Whether numeric collation should be used. Default value is false.
     *
     * @type { boolean } numeric
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * Whether numeric collation should be used. Default value is false.
     *
     * @type { boolean } [ numeric ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    numeric?: boolean;

    /**
     * Whether upper case or lower case should sort first.
     * Possible values are "upper", "lower", or "false" (use the locale's default).
     *
     * @type { string } caseFirst
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * Whether upper case or lower case should sort first.
     * Possible values are "upper", "lower", or "false" (use the locale's default).
     *
     * @type { string } [ caseFirst ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    caseFirst?: string;
}

/**
 * Enable language-sensitive string comparison.
 *
 * @syscap SystemCapability.Global.I18n
 * @since 8
 */
export class Collator {
    /**
     * A constructor used to create Collator object.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    constructor();
    /**
     * A constructor used to create Collator Object;
     *
     * @syscap SystemCapability.Global.I18n
     * @param locale Indicates a character string containing the locale information, including
     *               the language and optionally the script and region, for the Collator object.
     * @param options Indicates the options used to initialize Collator object.
     * @since 8
     */
    constructor(locale: string | Array<string>, options?: CollatorOptions);

    /**
     * compares two strings according to the sort order of this Collator object
     *
     * @syscap SystemCapability.Global.I18n
     * @param first The first string to compare.
     * @param second The second string to compare.
     * @returns Returns a number indicating how first compare to second:
     *         a negative value if string1 comes before string2;
     *         a positive value if string1 comes after string2;
     *         0 if they are considered equal.
     * @since 8
     */
    compare(first: string, second: string): number;

    /**
     * Returns a new object with properties that reflect the locale and collation options computed
     * during initialization of the object.
     *
     * @syscap SystemCapability.Global.I18n
     * @returns Returns a CollatorOptions object with properties that reflect the properties of this object.
     * @since 8
     */
    resolvedOptions(): CollatorOptions;
}

/**
 * Provides the options of PluralRules
 *
 * @syscap SystemCapability.Global.I18n
 * @since 8
 */
export interface PluralRulesOptions {
    /**
     * The locale matching algorithm to use.
     * Possible values are "lookup" and "best fit"; the default is "best fit".
     *
     * @type { string } localeMatcher
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * The locale matching algorithm to use.
     * Possible values are "lookup" and "best fit"; the default is "best fit".
     *
     * @type { string } [ localeMatcher ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    localeMatcher?: string;

    /**
     * The type to use. Possible values are: "cardinal", "ordinal"
     *
     * @type { string } type
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * The type to use. Possible values are: "cardinal", "ordinal"
     *
     * @type { string } [ type ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    type?: string;

    /**
     * The minimum number of integer digits to use.
     * Possible values are from 1 to 21; the default is 1.
     *
     * @type { number } minimumIntegerDigits
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * The minimum number of integer digits to use.
     * Possible values are from 1 to 21; the default is 1.
     *
     * @type { number } [ minimumIntegerDigits ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    minimumIntegerDigits?: number;

    /**
     * The minimum number of fraction digits to use.
     * Possible values are from 0 to 20; the default for plain number and percent formatting is 0;
     *
     * @type { number } minimumFractionDigits
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * The minimum number of fraction digits to use.
     * Possible values are from 0 to 20; the default for plain number and percent formatting is 0;
     *
     * @type { number } [ minimumFractionDigits ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    minimumFractionDigits?: number;

    /**
     * The maximum number of fraction digits to use.
     * Possible values are from 0 to 20;
     * the default for plain number formatting is the larger of minimumFractionDigits and 3;
     *
     * @type { number } maximumFractionDigits
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * The maximum number of fraction digits to use.
     * Possible values are from 0 to 20;
     * the default for plain number formatting is the larger of minimumFractionDigits and 3;
     *
     * @type { number } [ maximumFractionDigits ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    maximumFractionDigits?: number;

    /**
     * The minimum number of significant digits to use.
     * Possible values are from 1 to 21; the default is 1.
     *
     * @type { number } minimumSignificantDigits
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * The minimum number of significant digits to use.
     * Possible values are from 1 to 21; the default is 1.
     *
     * @type { number } [ minimumSignificantDigits ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    minimumSignificantDigits?: number;

    /**
     * The maximum number of significant digits to use.
     * Possible values are from 1 to 21; the default is 21.
     *
     * @type { number } maximumSignificantDigits
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * The maximum number of significant digits to use.
     * Possible values are from 1 to 21; the default is 21.
     *
     * @type { number } [ maximumSignificantDigits ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    maximumSignificantDigits?: number;
}

/**
 * Enables plural-sensitive formatting and plural-related language rules.
 *
 * @syscap SystemCapability.Global.I18n
 * @since 8
 */
export class PluralRules {
    /**
     * A constructor used to create PluralRules object.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    constructor();

    /**
     * A constructor used to create PluralRules object.
     *
     * @syscap SystemCapability.Global.I18n
     * @param locale Indicates a character string containing the locale information, including
     *               the language and optionally the script and region, for the PluralRules object.
     * @param options Indicates the options used to initialize PluralRules object.
     * @since 8
     */
    constructor(locale: string | Array<string>, options?: PluralRulesOptions);

    /**
     * Returns a string indicating which plural rule to use for locale-aware formatting.
     *
     * @syscap SystemCapability.Global.I18n
     * @param n The number to get a plural rule for.
     * @returns A string representing the pluralization category of the number,
     *         can be one of zero, one, two, few, many or other.
     * @since 8
     */
    select(n: number): string;
}

/**
 * Provides the input options of RelativeTimeFormat.
 *
 * @syscap SystemCapability.Global.I18n
 * @since 8
 */
 export interface RelativeTimeFormatInputOptions {
    /**
     * The locale matching algorithm to use.
     * Possible values are: lookup, best fit
     *
     * @type { string } localeMatcher
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * The locale matching algorithm to use.
     * Possible values are: lookup, best fit
     *
     * @type { string } [ localeMatcher ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    localeMatcher?: string;

    /**
     * The format of output message.
     * Possible values are: always, auto
     *
     * @type { string } numeric
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * The format of output message.
     * Possible values are: always, auto
     *
     * @type { string } [ numeric ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    numeric?: string;

    /**
     * The length of the internationalized message.
     * Possible values are: long, short, narrow
     *
     * @type { string } style
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    /**
     * The length of the internationalized message.
     * Possible values are: long, short, narrow
     *
     * @type { string } [ style ]
     * @syscap SystemCapability.Global.I18n
     * @since 9
     */
    style?: string;
}

/**
 * Provides the resolved options of RelativeTimeFormat.
 *
 * @syscap SystemCapability.Global.I18n
 * @since 8
 */
export interface RelativeTimeFormatResolvedOptions {
    /**
     * The BCP 47 language tag for the locale actually used.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    locale: string;

    /**
     * The length of the internationalized message.
     * Possible values are: long, short, narrow
     *
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    style: string;

    /**
     * The format of output message.
     * Possible values are: always, auto
     *
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    numeric: string;

    /**
     * The value requested using the Unicode extension key "nu" or filled in as a default.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    numberingSystem: string;
}

/**
 * Given a Time period length value and a unit, RelativeTimeFormat object enables
 * language-sensitive relative time formatting.
 *
 * @syscap SystemCapability.Global.I18n
 * @since 8
 */
export class RelativeTimeFormat {
    /**
     * A constructor used to create RelativeTimeFormat object.
     *
     * @syscap SystemCapability.Global.I18n
     * @since 8
     */
    constructor();

    /**
     * A constructor used to create RelativeTimeFormat object.
     *
     * @syscap SystemCapability.Global.I18n
     * @param locale Indicates a character string containing the locale information, including
     *               the language and optionally the script and region, for the RelativeTimeFormat object.
     * @param options Indicates the options used to initialize RelativeTimeFormat object.
     * @since 8
     */
    constructor(locale: string | Array<string>, options?: RelativeTimeFormatInputOptions);

    /**
     * formats a value and unit according to the locale and formatting options of this object.
     *
     * @syscap SystemCapability.Global.I18n
     * @param value Numeric value to use in the internationalized relative time message.
     * @param unit Unit to use in the relative time internationalized message.
     *             Possible values are: year, quarter, month, week, day, hour, minute, second.
     * @returns formatted language-sensitive relative time.
     * @since 8
     */
    format(value: number, unit: string): string;

    /**
     * returns an Array of objects representing the relative time format in parts that can be used for
     * custom locale-aware formatting
     *
     * @syscap SystemCapability.Global.I18n
     * @param value Numeric value to use in the internationalized relative time message.
     * @param unit to use in the relative time internationalized message.
     *             Possible values are: year, quarter, month, week, day, hour, minute, second.
     * @returns an Array of objects representing the relative time format in parts
     * @since 8
     */
    formatToParts(value: number, unit: string): Array<object>;

    /**
     * Returns a new object with properties that reflect the locale and formatting options computed during
     * initialization of the object.
     *
     * @syscap SystemCapability.Global.I18n
     * @returns RelativeTimeFormatOptions which reflect the locale and formatting options of the object.
     * @since 8
     */
    resolvedOptions(): RelativeTimeFormatResolvedOptions;
}
}
export default intl;