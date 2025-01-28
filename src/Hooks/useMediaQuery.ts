import { useState, useEffect } from 'react';

function useMediaQuery(query: string): boolean {
  const getMatches = (queryToMatch: string): boolean => {
    return window.matchMedia(queryToMatch).matches;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  useEffect(() => {
    const matchQueryList = window.matchMedia(query);

    // Function to update matches based on media query match on change event
    function handleMediaQueryChange() {
      setMatches(getMatches(query));
    }

    // Triggered at the first client-side load and if query changes
    handleMediaQueryChange();

    // Watch for updates
    try {
      matchQueryList.addEventListener('change', handleMediaQueryChange);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // Backwards compatibility for old browsers
      matchQueryList.addListener(handleMediaQueryChange);
    }

    // Cleanup function
    return () => {
      try {
        matchQueryList.removeEventListener('change', handleMediaQueryChange);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // Backwards compatibility for old browsers
        matchQueryList.removeListener(handleMediaQueryChange);
      }
    };
    // Empty dependency array ensures the effect runs only once after initial render.
    // With query it will run whenever it changes.
  }, [query]);

  return matches;
}

export default useMediaQuery;
