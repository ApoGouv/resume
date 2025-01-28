// Hooks/useBodyClassManager.ts
import { useEffect } from 'react';

/**
 * Helper function to add or remove a class from the body element based on a condition.
 *
 * @param condition - Whether the class should be added.
 * @param className - The class name to toggle.
 */
const toggleBodyClass = (condition: boolean, className: string) => {
  const { body } = document;
  if (condition) {
    if (!body.classList.contains(className)) body.classList.add(className);
  } else {
    if (body.classList.contains(className)) body.classList.remove(className);
  }
};

/**
 * Hook to manage specific body classes for dark mode, expanded view, and printing mode.
 *
 * @param darkMode - Whether dark mode is active.
 * @param expandedView - Whether expanded view is active.
 * @param isPrinting - Whether printing mode is active.
 */
const useBodyClassManager = (
  darkMode: boolean,
  expandedView: boolean,
  isPrinting: boolean
) => {
  useEffect(() => {
    const { body } = document;

    // Handle dark mode change
    toggleBodyClass(darkMode && !isPrinting, 'dark-mode');

    // Handle expanding view mode change
    toggleBodyClass(expandedView && !isPrinting, 'expanded-view');

    // Handle printing mode change
    if (isPrinting) {
      if (body.classList.contains('expanded-view')) {
        body.classList.remove('expanded-view');
      }
      if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
      }
    }

    toggleBodyClass(isPrinting, 'printing-mode');

    // Cleanup on unmount (not strictly necessary here since the effect re-runs)
    return () => {
      body.classList.remove('dark-mode', 'expanded-view', 'printing-mode');
    };
  }, [darkMode, expandedView, isPrinting]);
};

export default useBodyClassManager;
