// src/constants.ts

/**
 * The default base URL of the app.
 * We use it in ThemeContext and date functions that have locale.
 * @constant
 */
export const BASE_APP_URL = '/resume';

/**
 * Greek locale constant used for representing the Greek language and region.
 * @constant
 */
export const EL_LOCALE = 'el-GR';

/**
 * English locale constant used for representing the English language and US region.
 * @constant
 */
export const EN_LOCALE = 'en-US';

/**
 * The default locale of the app.
 * This is the fallback locale used across the app when no other locale is specified.
 * It is used in ThemeContext, date functions, and other components where locale is required.
 * @constant
 */
export const DEFAULT_LOCALE = EL_LOCALE;

/**
 * The fallback version number of the app.
 * We use it in useVersion hook as a falback in case we cannot
 * retrieve the app's version from the package.json file.
 *
 * And we use the version for cache busting when linking to the pdf
 * version of the resume.
 * @constant
 */
export const VERSION_FALLBACK = '3.0.1fx';

/**
 * Placeholder for string/text that will be replaced by years of experience number.
 * Used in replacePlaceholderWithYearDifference fn.
 * @constant
 */
export const EXP_YEARS_PLACEHOLDER = '__YEARS_OF_EXPERIENCE__';

/**
 * Date range separator.
 * Used in getDateRangeFormattedIntl fn.
 * @constant
 */
export const DATE_RANGE_SEPARATOR = ' - ';
