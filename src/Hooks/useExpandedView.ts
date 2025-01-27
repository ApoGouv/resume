// Hooks\useExpandedView.ts
import { useContext } from 'react';
import { ThemeContext } from '@/Context/ThemeContext';

const useExpandedView = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useExpandedView must be used within a ThemeProvider');
  }

  const { expandedView, toggleExpandedView } = context;

  if (expandedView === undefined || typeof toggleExpandedView !== 'function') {
    throw new Error(
      'Invalid context values: expandedView or toggleExpandedView is missing'
    );
  }

  return { expandedView, toggleExpandedView };
};

export default useExpandedView;
