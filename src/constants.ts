// src/constants.ts

/**
 * The default base URL of the app.
 * We use it in ThemeContext and date functions that have locale.
 * @constant
 */
export const BASE_APP_URL = '/resume';

/**
 * The default locale of the app.
 * We use it in ThemeContext and date functions that have locale.
 * @constant
 */
export const DEFAULT_LOCALE = 'el-GR';

/**
 * Placeholder for string/text that will be replaces by years of experience number.
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
