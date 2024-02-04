/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @name padStart
 * @description Pads a string or number with a specified character until it reaches the desired length
 * @param {unknown | string} value - The string or number to pad
 * @param {string} fillString - The character to use for padding
 * @param {number} maxLength - The desired length of the padded string
 * @returns {string} Padded string
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
 * @name padEnd
 * @description Pads a string or number with a specified character until it reaches the desired length
 * @param {unknown | string} value - The string or number to pad
 * @param {string} fillString - The character to use for padding
 * @param {number} maxLength - The desired length of the padded string
 * @returns {string} Padded string
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

export const printUrl = (url: string): string => {
  // Remove http or https
  let strippedUrl = url.replace(/^https?:\/\//, '');

  // Remove www.
  strippedUrl = strippedUrl.replace(/^www\./, '');

  // Remove trailing forward slashes
  strippedUrl = strippedUrl.replace(/\/+$/, '');

  return strippedUrl;
};
