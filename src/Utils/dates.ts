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
  'el-GR': { singular: 'χρόνος', plural: 'χρόνια' },
  'en-US': { singular: 'year', plural: 'years' },
};

/**
 * @function calculateDiff
 * @description Calculates the difference between two dates and returns the experience in years.
 * @param {string | Date} startDate - The start date of the experience.
 * @param {string | Date} [endDate=new Date()] - The end date of the experience (default is the current date).
 * @param {string} [locale='el-GR'] - The locale to determine the language for formatting.
 * @returns {string} - The experience duration formatted in years.
 */
export const calculateDiff = (
  startDate: string | Date,
  endDate: string | Date = new Date(),
  locale: string = 'el-GR'
): string => {
  const startDateDateFormat = new Date(startDate);
  const endDateDateFormat = new Date(endDate);

  const experience = (
    (endDateDateFormat.getTime() - startDateDateFormat.getTime()) /
    (1000 * 60 * 60 * 24 * 30 * 12)
  ).toFixed(1);

  // Select the appropriate language forms based on the provided locale.
  const { singular, plural } = yearsWords[locale] || yearsWords['el-GR'];

  return `${experience} ${+experience <= 1 ? singular : plural}`;
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
 * @param {string} locale - The locale string (e.g., 'en-US', 'el-GR')
 * @returns {string} Formatted date string
 */
export const getDateFormatIntl = (
  dateString: string,
  options: Intl.DateTimeFormatOptions,
  locale: string = 'el-GR'
): string => {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString(locale, options);
};

const presentTranslationByLocale: Record<string, string> = {
  'el-GR': 'Σήμερα',
  'en-US': 'Present',
};

/**
 * @name getDateRangeFormattedIntl
 * @description Formats a date range according to the specified options using Intl.DateTimeFormat
 * @param {string} dateFrom - The start date string
 * @param {string | null} dateTo - The end date string or null if ongoing
 * @param {Intl.DateTimeFormatOptions} options - Options for formatting the date range
 * @param {string} locale - The locale string (e.g., 'en-US', 'el-GR')
 * @param {string} separator - Separator between date parts
 * @returns {string} Formatted date range string
 */
export const getDateRangeFormattedIntl = (
  dateFrom: string,
  dateTo: string | null,
  options: Intl.DateTimeFormatOptions,
  locale: string = 'el-GR',
  separator: string = ' - '
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
