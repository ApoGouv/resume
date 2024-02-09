import { useState, useEffect } from 'react';

const MAX_MOBILE_WIDTH = 767.99;

function useMobileDetection(): boolean {
  const mobileQuery = window.matchMedia(`(max-width: ${MAX_MOBILE_WIDTH}px)`);

  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);

  // Function to update isMobileScreen based on media query match
  const handleMobileMediaChanged = (
    e: MediaQueryListEvent | MediaQueryList
  ) => {
    setIsMobileScreen(e.matches);
  };

  useEffect(() => {
    // Set initial value
    handleMobileMediaChanged(mobileQuery);

    // Watch for updates
    try {
      mobileQuery.addEventListener('change', handleMobileMediaChanged);
    } catch (e) {
      // Backwards compatibility for old browsers
      mobileQuery.addListener(handleMobileMediaChanged);
    }

    // Cleanup function
    return () => {
      try {
        mobileQuery.removeEventListener('change', handleMobileMediaChanged);
      } catch (e) {
        // Backwards compatibility for old browsers
        mobileQuery.removeListener(handleMobileMediaChanged);
      }
    };
    // Empty dependency array ensures the effect runs only once after initial render.
    // With mobileQuery it will run whenever it changes.
  }, [mobileQuery]);

  return isMobileScreen;
}

export default useMobileDetection;
