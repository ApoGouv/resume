// Hooks\useLocale.ts
import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from '@/Context/ThemeContext';

const useLocale = (): Pick<ThemeContextType, 'appLocale' | 'setLocale'> => {
  const { appLocale, setLocale } = useContext(ThemeContext) as ThemeContextType;

  if (!appLocale || !setLocale) {
    throw new Error('useLocale must be used within a ThemeProvider');
  }

  return { appLocale, setLocale };
};

export default useLocale;
