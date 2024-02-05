// Context\ThemeContext.tsx
import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

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
  // Set the default locale to el-GR
  const [appLocale, setAppLocale] = useState('el-GR');

  // Set darkMode to false by default
  const [darkMode, setDarkMode] = useState(false);

  // Function to change the locale
  const changeLocale = useCallback((newLocale: string) => {
    setAppLocale(newLocale);
  }, []); // Empty dependency array as setAppLocale is a stable function

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  }, []); // Empty dependency array as setAppLocale is a stable function

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
