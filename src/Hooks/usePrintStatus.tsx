import { useEffect, useState } from 'react';

const usePrintStatus = () => {
  const getMatches = (queryToMatch: string = 'print'): boolean => {
    return window.matchMedia(queryToMatch).matches;
  };

  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  useEffect(() => {
    const printMediaQueryList = window.matchMedia('print');

    const updatePrintStatus = () => {
      setIsPrinting(printMediaQueryList.matches);
    };

    const handleBeforePrint = () => {
      setIsPrinting(true);
    };

    const handleAfterPrint = () => {
      setIsPrinting(false);
    };

    // Listen for changes in print status
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    printMediaQueryList.addEventListener('change', updatePrintStatus);

    // Initial check
    // setIsPrinting(getMatches('print'));

    // Clean up the event listeners on component unmount
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      printMediaQueryList.removeEventListener('change', updatePrintStatus);
    };
  }, []);

  return isPrinting;
};

export default usePrintStatus;
