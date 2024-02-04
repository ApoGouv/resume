import { padStart } from './strings';

const months: string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Aug',
  'Nov',
  'Dec',
];

/**
 * @name getDateFormat
 * @description Formats the simple date string to the required date format.
 * @param {string} dateString - Date string to be converted
 * @param {string} format - String representing the desired format of the date
 * @returns {string} Formatted date string
 */
export const getDateFormat = (dateString: string, format: string): string => {
  const dateObj = new Date(dateString);
  const fullYear = dateObj.getFullYear();
  const givenMonth = dateObj.getMonth();
  const givenDate = dateObj.getDate();

  const formattedDate: Record<string, string> = {};

  const year = (format.match(/y+/gi) || [])[0];
  const month = (format.match(/m+/gi) || [])[0];
  const date = (format.match(/d+/gi) || [])[0];

  // Set year replacer.
  if (year) {
    if (year.length === 4) {
      formattedDate[year] = fullYear.toString();
    } else {
      formattedDate[year] = dateObj
        .toString()
        .substring(4 - Math.max(year.length, 2));
    }
  }

  // Set month replacer.
  if (month) {
    if (month.length === 3) {
      formattedDate[month] = months[givenMonth];
    } else {
      formattedDate[month] = padStart(givenMonth + 1, '0', month.length);
    }
  }

  // Set date replacer.
  if (date) {
    formattedDate[date] = padStart(givenDate, '0', date.length);
  }

  return format
    .replace(year as string, formattedDate[year as string] || '')
    .replace(month as string, formattedDate[month as string] || '')
    .replace(date as string, formattedDate[date as string] || '');
};

export const calculateDiff = (
  startDate: string | Date,
  endDate: string | Date = new Date()
): string => {
  const startDateDateFormat = new Date(startDate);
  const endDateDateFormat = new Date(endDate);

  const experience = (
    (endDateDateFormat.getTime() - startDateDateFormat.getTime()) /
    (1000 * 60 * 60 * 24 * 30 * 12)
  ).toFixed(1);

  return `${experience} χρόν${+experience <= 1 ? 'ο' : 'ια'}`;
};

/**
 * @name getDateRangeFormatted
 * @description Formats a date range string.
 * @param {string} dateFrom - Starting date string
 * @param {string | null} dateTo - Ending date string or null if ongoing
 * @param {string} format - String representing the desired format of the date
 * @param {string} separator - Separator between date range values
 * @returns {string} Formatted date range string
 */
export const getDateRangeFormatted = (
  dateFrom: string,
  dateTo: string | null,
  format: string = 'YYYY',
  separator: string = ' - '
): string => {
  const formattedDateFrom = getDateFormat(dateFrom, format);
  let formattedDateTo = '';
  if (typeof dateTo === 'string') {
    formattedDateTo =
      dateTo === 'present' ? 'Present' : getDateFormat(dateTo, format);
    formattedDateTo = `${separator}${formattedDateTo}`;
  }

  return `${formattedDateFrom}${formattedDateTo}`;
};

/**
 * @name dateToGreekFormat
 * @description Converts a Date object to a formatted date string in Greek locale
 * @param {Date} date - The Date object to convert
 * @returns {string} Formatted date string in Greek locale
 */
export const dateToGreekFormat = (date: Date): string => {
  const localeDateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };

  return date.toLocaleDateString('el-GR', localeDateOptions);
};

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
