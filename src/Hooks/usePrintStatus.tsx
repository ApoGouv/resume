import { useEffect, useState } from 'react';

const usePrintStatus = () => {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const updatePrintStatus = () => {
      setIsPrinting(window.matchMedia && window.matchMedia('print').matches);
    };

    // Listen for changes in print status
    window.addEventListener('beforeprint', updatePrintStatus);
    window.addEventListener('afterprint', updatePrintStatus);

    // Initial check
    updatePrintStatus();

    // Clean up the event listeners on component unmount
    return () => {
      window.removeEventListener('beforeprint', updatePrintStatus);
      window.removeEventListener('afterprint', updatePrintStatus);
    };
  }, []);

  return isPrinting;
};

export default usePrintStatus;
