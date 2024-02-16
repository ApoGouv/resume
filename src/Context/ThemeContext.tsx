// Context\ThemeContext.tsx
import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import { DEFAULT_LOCALE } from '../constants';

// Define the type for the locale context
export type ThemeContextType = {
  appLocale: string;
  changeLocale: (newLocale: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
};

// Create the context
export const ThemeContext = createContext<ThemeContextType | null>(null);

// Define the type for the props of ThemeProvider
type ThemeProviderProps = {
  children: ReactNode;
};

// Create the ThemeProvider component
function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const isLocalStorageSupported = (() => {
    try {
      localStorage.setItem('test_storage', 'Working!');
      localStorage.removeItem('test_storage');
      return true;
    } catch (error) {
      return false;
    }
  })();

  // Load initial values from local storage or use defaults
  const initialLocale = isLocalStorageSupported
    ? localStorage.getItem('appLocale') || DEFAULT_LOCALE
    : DEFAULT_LOCALE;
  const initialDarkMode = isLocalStorageSupported
    ? localStorage.getItem('darkMode') === 'true' || false
    : false;

  // Set the default locale to el-GR
  const [appLocale, setAppLocale] = useState(initialLocale);

  // Set darkMode to false by default
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  // Function to change the locale
  const changeLocale = useCallback((newLocale: string) => {
    setAppLocale(newLocale);
  }, []); // Empty dependency array as setAppLocale is a stable function

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  }, []); // Empty dependency array as setAppLocale is a stable function

  // Update local storage on appLocale change
  useEffect(() => {
    if (isLocalStorageSupported) {
      localStorage.setItem('appLocale', appLocale);
    }
  }, [appLocale, isLocalStorageSupported]);

  // Update local storage on darkMode change
  useEffect(() => {
    if (isLocalStorageSupported) {
      localStorage.setItem('darkMode', darkMode.toString());
    }
  }, [darkMode, isLocalStorageSupported]);

  // Provide the context values to the children
  const contextValues: ThemeContextType = useMemo(() => {
    return {
      appLocale,
      changeLocale,
      darkMode,
      toggleDarkMode,
    };
  }, [appLocale, darkMode, changeLocale, toggleDarkMode]);

  return (
    <ThemeContext.Provider value={contextValues}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
