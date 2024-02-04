// LocaleProvider.tsx
import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

// Define the type for the locale context
export type LocaleContextType = {
  appLocale: string;
  changeLocale: (newLocale: string) => void;
};

// Create the context
export const LocaleContext = createContext<LocaleContextType | undefined>(
  undefined
);

// Define the type for the props of LocaleProvider
type LocaleProviderProps = {
  children: ReactNode;
};

// Create the LocaleProvider component
function LocaleProvider({ children }: LocaleProviderProps): JSX.Element {
  // Set the default locale
  const [appLocale, setAppLocale] = useState('el-GR');

  // Function to change the locale
  const changeLocale = useCallback((newLocale: string) => {
    setAppLocale(newLocale);
  }, []); // Empty dependency array as setAppLocale is a stable function

  // Provide the context values to the children
  const contextValues: LocaleContextType = useMemo(() => {
    return {
      appLocale,
      changeLocale,
    };
  }, [appLocale, changeLocale]);

  return (
    <LocaleContext.Provider value={contextValues}>
      {children}
    </LocaleContext.Provider>
  );
}

export default LocaleProvider;
