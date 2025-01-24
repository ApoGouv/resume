// Hooks\useDarkMode.ts
import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from '@/Context/ThemeContext';

const useDarkMode = (): Pick<
  ThemeContextType,
  'darkMode' | 'toggleDarkMode'
> => {
  const { darkMode, toggleDarkMode } = useContext(
    ThemeContext
  ) as ThemeContextType;

  if (darkMode === undefined || !toggleDarkMode) {
    throw new Error('useDarkMode must be used within a ThemeProvider');
  }

  return { darkMode, toggleDarkMode };
};

export default useDarkMode;
