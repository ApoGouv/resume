import { padStart } from './padding';

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
 * @name getDateFormat formats the simple date string to required date format
 * @param {string} dateString date string which needs to be converted
 * @param {string} format string which represents the format of date
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

  // set year replacer
  if (year) {
    if (year.length === 4) {
      formattedDate[year] = fullYear.toString();
    } else {
      formattedDate[year] = dateObj
        .toString()
        .substring(4 - Math.max(year.length, 2));
    }
  }

  // set month replacer
  if (month) {
    if (month.length === 3) {
      formattedDate[month] = months[givenMonth];
    } else {
      formattedDate[month] = padStart(givenMonth + 1, '0', month.length);
    }
  }

  // set date replacer
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

export const dateToGreekFormat = (date: Date): string => {
  const localeDateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };

  return date.toLocaleDateString('el', localeDateOptions);
};
