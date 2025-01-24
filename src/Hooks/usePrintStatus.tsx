import { useEffect, useState } from 'react';

type PrintCallbacks = {
  onBeforePrint?: () => void;
  onAfterPrint?: () => void;
};

const usePrintStatus = ({ onBeforePrint, onAfterPrint }: PrintCallbacks = {}) => {
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  useEffect(() => {
    // Flag to track if event listeners are already added
    let isListenerAdded = false;

    // const printMediaQueryList = window.matchMedia('print');

    // const updatePrintStatus = () => {
    //   setIsPrinting(printMediaQueryList.matches);
    // };

    const handleBeforePrint = () => {
      console.log('Before print');
      setIsPrinting(true);
      onBeforePrint?.();
    };

    const handleAfterPrint = () => {
      console.log('After print');
      setIsPrinting(false);
      onAfterPrint?.();
    };

    // Only add event listeners once
    if (!isListenerAdded) {
      // Listen for changes in print status
      window.addEventListener('beforeprint', handleBeforePrint);
      window.addEventListener('afterprint', handleAfterPrint);
      // printMediaQueryList.addEventListener('change', updatePrintStatus);
    }

    // Initial check
    // setIsPrinting(window.matchMedia('print'));

    // Clean up the event listeners on component unmount
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      // printMediaQueryList.removeEventListener('change', updatePrintStatus);
      isListenerAdded = false;
    };
  }, [onAfterPrint, onBeforePrint]);

  return isPrinting;
};

export default usePrintStatus;
