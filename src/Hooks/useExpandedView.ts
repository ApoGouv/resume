// Hooks\useExpandedView.ts
import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from '@/Context/ThemeContext';

const useExpandedView = (): Pick<
  ThemeContextType,
  'expandedView' | 'toggleExpandedView'
> => {
  const { expandedView, toggleExpandedView } = useContext(
    ThemeContext
  ) as ThemeContextType;

  if (expandedView === undefined || !toggleExpandedView) {
    throw new Error('useExpandedView must be used within a ThemeProvider');
  }

  return { expandedView, toggleExpandedView };
};

export default useExpandedView;
