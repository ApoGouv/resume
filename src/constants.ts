// src/constants.ts

/**
 * Fallback name to be used when the profile name is not available.
 * This is used in the Resume component to ensure there is always a name to display.
 * @constant
 */
export const FALLBACK_NAME = 'Απόστολος Γουβάλας';

/**
 * Whether the app is running in development mode.
 * Uses Vite's `import.meta.env.DEV` to detect the environment.
 * @constant
 */
export const APP_IN_DEV_MODE = import.meta.env?.DEV ?? false;

/**
 * The base URL of the app.
 * Used for routing and constructing absolute URLs.
 * Vite provides `import.meta.env.BASE_URL`, but we ensure a fallback.
 * @constant
 */
export const APP_BASE_URL = import.meta.env.BASE_URL ?? '/resume/';

/**
 * The production host of the app.
 * This is used when constructing full URLs for meta tags, social sharing, etc.
 * @constant
 */
export const APP_PROD_HOST = 'https://apogouv.github.io';

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
 * We use it in useVersion hook as a fallback in case we cannot
 * retrieve the app's version from the package.json file.
 *
 * And we use the version for cache busting when linking to the pdf
 * version of the resume.
 * @constant
 */
export const VERSION_FALLBACK = '5.0.3fx';

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

/**
 * CSS class used to hide elements when the expanded view is not active.
 * Typically applied to sections or components that should only appear in expanded view mode.
 * @constant
 */
export const HIDE_UNLESS_EXPANDED = 'only-on-expanded';
