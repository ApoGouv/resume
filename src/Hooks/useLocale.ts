// Hooks\useLocale.ts
import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from '../Context/ThemeContext';

const useLocale = (): Pick<ThemeContextType, 'appLocale' | 'changeLocale'> => {
  const { appLocale, changeLocale } = useContext(
    ThemeContext
  ) as ThemeContextType;

  if (!appLocale || !changeLocale) {
    throw new Error('useLocale must be used within a ThemeProvider');
  }

  return { appLocale, changeLocale };
};

export default useLocale;
