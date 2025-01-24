// Context/ThemeContext.ts
import { createContext } from 'react';

// Define the type for the locale context
export type ThemeContextType = {
  appLocale: string;
  setLocale: (newLocale: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  expandedView: boolean;
  toggleExpandedView: () => void;
};

// Create the context
export const ThemeContext = createContext<ThemeContextType | null>(null);
