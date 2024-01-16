/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */

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

  return strippedUrl;
};
