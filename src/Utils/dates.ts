import {
  EN_LOCALE,
  EL_LOCALE,
  DEFAULT_LOCALE,
  EXP_YEARS_PLACEHOLDER,
  DATE_RANGE_SEPARATOR,
} from '../constants';

/**
 * Checks if a value is of type string or number.
 * @param value - The value to check.
 * @returns {boolean} True if the value is of type string or number, otherwise false.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStringOrNumber = (value: any): value is string | number => {
  return typeof value === 'string' || typeof value === 'number';
};

/**
 * @typedef {Object} LanguageForms
 * @property {string} singular - The singular form of the word.
 * @property {string} plural - The plural form of the word.
 */
type LanguageForms = {
  singular: string;
  plural: string;
};

/**
 * @type {Record<string, LanguageForms>}
 * @description Object holding singular and plural forms of the word "year" for different locales.
 */
const yearsWords: Record<string, LanguageForms> = {
  [EL_LOCALE]: { singular: 'χρόνος', plural: 'χρόνια' },
  [EN_LOCALE]: { singular: 'year', plural: 'years' },
};

/**
 * @function calculateYearsDiff
 * @description Calculates the difference between two dates and returns the experience in years.
 * @param {string | number | Date } startDate - The start date of the experience.
 * @param {string | number | Date } [endDate=new Date()] - The end date of the experience (default is the current date).
 * @param {string} [locale=DEFAULT_LOCALE] - The locale to determine the language for formatting.
 * @returns {string} - The experience duration formatted in years.
 */
export const calculateYearsDiff = (
  startDate: string | number | Date,
  endDate: string | number | Date = new Date(),
  locale: string = DEFAULT_LOCALE
): string => {
  const startDateDateFormat = isStringOrNumber(startDate)
    ? new Date(startDate)
    : startDate;
  const endDateDateFormat = isStringOrNumber(endDate)
    ? new Date(endDate)
    : endDate;

  const experience = (
    (endDateDateFormat.getTime() - startDateDateFormat.getTime()) /
    (1000 * 60 * 60 * 24 * 30 * 12)
  ).toFixed(1);

  // Select the appropriate language forms based on the provided locale.
  const { singular, plural } = yearsWords[locale] || yearsWords[DEFAULT_LOCALE];

  return `${experience} ${+experience <= 1 ? singular : plural}`;
};

/**
 * Calculates the difference in months between two dates.
 * This function returns the number of months between the initial and final dates.
 * If the final date is before the initial date, it returns 0.
 * @param {Date | string | number} dateInitial - The initial date.
 * @param {Date | string | number} [dateFinal=new Date()] - The final date. Defaults to the current date.
 * @returns {number} The difference in months between the two dates.
 */
export const dateDifferenceInMonths = (
  dateInitial: Date | string | number,
  dateFinal: Date | string | number = new Date()
): number => {
  // Convert the arguments to Date objects if they are not already
  const initialDate: Date = isStringOrNumber(dateInitial)
    ? new Date(dateInitial)
    : dateInitial;
  const finalDate: Date = isStringOrNumber(dateFinal)
    ? new Date(dateFinal)
    : dateFinal;

  // Check if the date objects are valid
  if (
    Number.isNaN(initialDate.getTime()) ||
    Number.isNaN(finalDate.getTime())
  ) {
    return 0; // Return 0 if either date is invalid
  }

  // Calculate the difference in years
  const yearDifference: number =
    finalDate.getFullYear() - initialDate.getFullYear();

  // Calculate the difference in months
  const monthsDifference: number =
    finalDate.getMonth() - initialDate.getMonth();

  // Total months difference
  const totalMonthsDifference: number = yearDifference * 12 + monthsDifference;

  // Ensure the result is not negative, return 0 if it is
  return Math.max(totalMonthsDifference, 0);
};

/**
 * Calculates the difference in years between two dates.
 * This function returns the number of years between the initial and final dates.
 * If the final date is before the initial date, it returns 0.
 * @param {Date | string | number} dateInitial - The initial date.
 * @param {Date | string | number} [dateFinal=new Date()] - The final date. Defaults to the current date.
 * @returns {number} The difference in years between the two dates.
 */
export const dateDifferenceInYears = (
  dateInitial: Date | string | number,
  dateFinal: Date | string | number = new Date()
): number => {
  // Convert the arguments to Date objects if they are not already
  const initialDate: Date = isStringOrNumber(dateInitial)
    ? new Date(dateInitial)
    : dateInitial;
  const finalDate: Date = isStringOrNumber(dateFinal)
    ? new Date(dateFinal)
    : dateFinal;

  // Check if the date objects are valid
  if (
    Number.isNaN(initialDate.getTime()) ||
    Number.isNaN(finalDate.getTime())
  ) {
    return 0; // Return 0 if either date is invalid
  }

  // Calculate the difference in years by dividing the difference in months by 12
  return dateDifferenceInMonths(initialDate, finalDate) / 12;
};

/**
 * Formats a number based on the provided locale with maximum significant digits.
 * @param {number} number - The number to format.
 * @param {string} locale - The locale to use for formatting.
 * @returns {string} The formatted number.
 */
export const formatNumber = (
  number: number,
  locale: string = DEFAULT_LOCALE
): string => {
  return new Intl.NumberFormat(locale, {
    maximumSignificantDigits: 2,
    maximumFractionDigits: 1,
  }).format(number);
};

/**
 * Replaces a placeholder in the provided text with the calculated year difference
 * between the provided start date and the current date.
 *
 * @param {string} text - The text containing the placeholder.
 * @param {string} startDate - The start date in 'YYYY-MM-DD' format.
 * @param {string} [appLocale= DEFAULT_LOCALE] - The locale to format the number.
 * @param {string} [placeholderName='__YEARS_OF_EXPERIENCE__'] - The placeholder name to search for.
 * @param {"up" | "down"} [roundingMode="down"] - Determines whether to round up or down.
 * @returns {string} The text with the placeholder replaced by the calculated year difference.
 */
export const replacePlaceholderWithYearDifference = (
  text: string,
  startDate: string,
  appLocale: string = DEFAULT_LOCALE,
  placeholderName: string = EXP_YEARS_PLACEHOLDER,
  displayRawDiff = false,
  roundingMode: 'up' | 'down' = 'down'
): string => {
  const yearDifference = dateDifferenceInYears(startDate);

  const formattedYearDifference = displayRawDiff
    ? formatNumber(yearDifference, appLocale)
    : (roundingMode === 'up'
        ? Math.ceil(yearDifference)
        : Math.floor(yearDifference)
      ).toString();

  return text.replace(`{{${placeholderName}}}`, formattedYearDifference);
};

/**
 * @typedef {Object.<string, Intl.DateTimeFormatOptions>} DateFormatOptions
 * @description A mapping of date format options by key.
 * @property {Intl.DateTimeFormatOptions} year - Date format with only the year.
 * @property {Intl.DateTimeFormatOptions} monthYear - Date format with short month and year.
 * @property {Intl.DateTimeFormatOptions} dayMonthYear - Date format with short month, year, and 2-digit day.
 */

/**
 * @type {DateFormatOptions}
 * @description Mapping of date format options for various use cases.
 */
export const dateFormatOptions: Record<string, Intl.DateTimeFormatOptions> = {
  year: { year: 'numeric' },
  monthYear: { month: 'short', year: 'numeric' },
  dayMonthYear: { month: 'short', year: 'numeric', day: '2-digit' },
};

/**
 * @name getDateFormatIntl
 * @description Formats a date according to the specified options using Intl.DateTimeFormat
 * @param {string} dateString - The date string to format
 * @param {Intl.DateTimeFormatOptions} options - Options for formatting the date
 * @param {string} [locale=DEFAULT_LOCALE] - The locale string (e.g., 'en-US', 'el-GR')
 * @returns {string} Formatted date string
 */
export const getDateFormatIntl = (
  dateString: string,
  options: Intl.DateTimeFormatOptions,
  locale: string = DEFAULT_LOCALE
): string => {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString(locale, options);
};

const presentTranslationByLocale: Record<string, string> = {
  [EL_LOCALE]: 'Σήμερα',
  [EN_LOCALE]: 'Present',
};

/**
 * @name getDateRangeFormattedIntl
 * @description Formats a date range according to the specified options using Intl.DateTimeFormat
 * @param {string} dateFrom - The start date string
 * @param {string | null} dateTo - The end date string or null if ongoing
 * @param {Intl.DateTimeFormatOptions} options - Options for formatting the date range
 * @param {string} [locale= DEFAULT_LOCALE] - The locale string (e.g., 'en-US', 'el-GR')
 * @param {string} [separator= DATE_RANGE_SEPARATOR] - Separator between date parts
 * @returns {string} Formatted date range string
 */
export const getDateRangeFormattedIntl = (
  dateFrom: string,
  dateTo: string | null,
  options: Intl.DateTimeFormatOptions,
  locale: string = DEFAULT_LOCALE,
  separator: string = DATE_RANGE_SEPARATOR
): string => {
  const formattedDateFrom = getDateFormatIntl(dateFrom, options, locale);
  let formattedDateTo = '';

  if (dateTo !== null) {
    if (dateTo === 'present') {
      formattedDateTo = presentTranslationByLocale[locale] ?? '';
    } else {
      formattedDateTo = getDateFormatIntl(dateTo, options, locale);
    }
    if (formattedDateTo) {
      formattedDateTo = `${separator}${formattedDateTo}`;
    }
  }

  return `${formattedDateFrom}${formattedDateTo}`;
};
