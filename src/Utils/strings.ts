/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Pads the start of a string or a value that can be converted to a string with a specified character until it reaches the desired length.
 *
 * This function converts the input value to a string if it's not already a string,
 * then pads the start of the string with the specified fill string until the
 * resulting string reaches the desired maximum length.
 *
 * @param {unknown | string} string - The string or value to pad.
 * @param {string} fillString - The character to use for padding.
 * @param {number} maxLength - The desired length of the padded string.
 * @returns {string} - The padded string.
 *
 * @example
 * // returns '000123'
 * padStart('123', '0', 6)
 *
 * @example
 * // returns '00abc'
 * padStart('abc', '0', 5)
 */
export const padStart = (
  string: unknown | string,
  fillString: string,
  maxLength: number
): string => {
  if (typeof string !== 'string') {
    string = (string as any).toString();
  }
  return (string as string).padStart(maxLength, fillString);
};

/**
 * Pads the end of a string or a value that can be converted to a string with a specified character until it reaches the desired length.
 *
 * This function converts the input value to a string if it's not already a string,
 * then pads the end of the string with the specified fill string until the
 * resulting string reaches the desired maximum length.
 *
 * @param {unknown | string} value - The string or value to pad.
 * @param {string} fillString - The character to use for padding.
 * @param {number} maxLength - The desired length of the padded string.
 * @returns {string} - The padded string.
 *
 * @example
 * // returns '123000'
 * padEnd('123', '0', 6)
 *
 * @example
 * // returns 'abc00'
 * padEnd('abc', '0', 5)
 */
export const padEnd = (
  string: unknown | string,
  fillString: string,
  maxLength: number
): string => {
  if (typeof string !== 'string') {
    string = (string as any).toString();
  }
  return (string as string).padEnd(maxLength, fillString);
};

/**
 * Adds a line break (`<br>`) after a specified placeholder in the given string.
 *
 * This function searches for all occurrences of the placeholder in the input string
 * and inserts a line break after each occurrence, as long as the placeholder is not
 * immediately followed by whitespace.
 *
 * @param {string} str - The input string in which to add line breaks.
 * @param {string} placeholder - The placeholder string after which to add line breaks.
 * @returns {string} - The modified string with line breaks added.
 *
 * @example
 * // returns 'Hello<br>World'
 * addLineBreak('HelloWorld', 'Hello')
 */
export const addLineBreak = (str: string, placeholder: string): string => {
  // Use a regular expression to find the placeholder and add a line break after it
  const regex = new RegExp(`${placeholder}(?!\\s)`, 'g');
  return str.replace(regex, `${placeholder}<br>`);
};

/**
 * Simplifies a URL by removing the protocol, 'www.' prefix, and trailing forward slashes.
 *
 * This function takes a URL string, removes the `http` or `https` protocol,
 * removes the `www.` prefix if present, and strips any trailing forward slashes.
 *
 * @param {string} url - The URL to be simplified.
 * @returns {string} - The simplified URL.
 *
 * @example
 * // returns 'example.com/path'
 * printUrl('https://www.example.com/path/')
 *
 * @example
 * // returns 'example.com'
 * printUrl('http://example.com/')
 */
export const printUrl = (url: string): string => {
  // Remove http or https
  let strippedUrl = url.replace(/^https?:\/\//, '');

  // Remove www.
  strippedUrl = strippedUrl.replace(/^www\./, '');

  // Remove trailing forward slashes
  strippedUrl = strippedUrl.replace(/\/+$/, '');

  return strippedUrl;
};

/**
 * Normalizes a URL by removing leading, trailing, and consecutive slashes.
 *
 * This function takes a URL string, splits it into parts based on the `/` delimiter,
 * filters out any empty parts (which result from leading, trailing, or consecutive slashes),
 * and then joins the remaining parts back together with a single `/`.
 *
 * @param {string} url - The URL to be normalized.
 * @returns {string} - The normalized URL.
 *
 * @example
 * // returns '/path/to/resource'
 * normalizeUrl('/path//to/resource/')
 *
 * @example
 * // returns '/example/path'
 * normalizeUrl('///example//path///')
 */
export const normalizeUrl = (url: string): string => {
  return `/${url.split('/').filter(Boolean).join('/')}`;
};

/**
 * Sanitizes a phone number to retain only digits and the leading '+' for international numbers.
 *
 * This function removes all characters except digits and a leading '+'.
 *
 * @param {string} phoneNumber - The phone number to sanitize.
 * @returns {string} - The sanitized phone number.
 *
 * @example
 * // returns '+301234567890'
 * sanitizeIntlPhoneNumber('+30 (123) 456-7890');
 *
 * @example
 * // returns '301234567890'
 * sanitizeIntlPhoneNumber('30 (123) 456-7890');
 */
export const sanitizeIntlPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/[^\d+]/g, '');
};

/**
 * Formats a sanitized international phone number into a more readable format.
 *
 * This function assumes the phone number is already sanitized and begins with a '+' if it's international.
 * It splits the number into groups for display (e.g., country code, area code, and remaining digits).
 *
 * @param {string} phoneNumber - The sanitized phone number to format.
 * @returns {string} - The formatted phone number.
 *
 * @example
 * // returns '+30 123 456 7890'
 * formatIntlPhoneNumber('+301234567890');
 *
 * @example
 * // returns '123 456 7890'
 * formatIntlPhoneNumber('1234567890');
 */
export const formatIntlPhoneNumber = (phoneNumber: string): string => {
  const sanitized = sanitizeIntlPhoneNumber(phoneNumber);

  // Match international numbers starting with '+' and group the digits
  const match: RegExpMatchArray | null = sanitized.match(/^\+(\d{2})(\d{3})(\d{3})(\d{4})$/);
  if (match !== null) {
    let [, countryCode, part1, part2, part3] = match as [string, string, string, string, string];
    return `+${countryCode} ${part1} ${part2} ${part3}`;
  }

  // Match local numbers without a '+'
  const localMatch: RegExpMatchArray | null = sanitized.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (localMatch !== null) {
    let [, part1, part2, part3] = localMatch as [string, string, string, string];
    return `${part1} ${part2} ${part3}`;
  }

  // If unable to format, return the original sanitized number
  return sanitized;
};