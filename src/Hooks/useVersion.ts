// useVersion.ts
import { useEffect, useState } from 'react';
import { VERSION_FALLBACK } from '@/constants';

const useVersion = () => {
  const [version, setVersion] = useState<string>(VERSION_FALLBACK); // Fallback version

  useEffect(() => {
    // Fetch package.json and extract version
    const fetchVersion = async () => {
      try {
        const packageJson = await import('@/../package.json');
        const packageVersion = packageJson.version || VERSION_FALLBACK;
        setVersion(packageVersion);
      } catch (error) {
        console.error('Error fetching pkg version: ', error);
        setVersion(VERSION_FALLBACK);
      }
    };

    fetchVersion();
  }, []);

  return version;
};

export default useVersion;
