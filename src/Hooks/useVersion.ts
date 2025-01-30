// useVersion.ts
import { useEffect, useState } from 'react';
import { VERSION_FALLBACK } from '@/constants';

/**
 * Custom React hook to retrieve the application's version from package.json.
 *
 * This hook attempts to dynamically import package.json and extract the `version` field.
 * If the import fails (e.g., due to build restrictions), it falls back to `VERSION_FALLBACK`.
 *
 * @returns {string} The application version as a string.
 *
 * @example
 * const appVersion = useVersion();
 * console.log(appVersion); // e.g., "1.2.3"
 */
const useVersion = (): string => {
  const [version, setVersion] = useState<string>(VERSION_FALLBACK);

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const packageJson = await import('@/../package.json');
        setVersion(packageJson.version ?? VERSION_FALLBACK);
      } catch (error) {
        console.warn('Failed to load package version. Using fallback.', error);
        setVersion(VERSION_FALLBACK);
      }
    };

    fetchVersion();
  }, []);

  return version;
};

export default useVersion;
