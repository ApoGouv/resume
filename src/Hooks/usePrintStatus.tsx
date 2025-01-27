import { useEffect, useState, useRef } from 'react';

type PrintCallbacks = {
  onBeforePrint?: () => void;
  onAfterPrint?: () => void;
};

const usePrintStatus = ({ onBeforePrint, onAfterPrint }: PrintCallbacks = {}) => {
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const listenerAddedRef = useRef<boolean>(false);

  useEffect(() => {
    // Only add event listeners once when the component mounts
    if (!listenerAddedRef.current) {

      // const printMediaQueryList = window.matchMedia('print');

      // const updatePrintStatus = () => {
      //   setIsPrinting(printMediaQueryList.matches);
      // };

      const handleBeforePrint = () => {
        // console.log('Before print');
        setIsPrinting(true);
        onBeforePrint?.();
      };

      const handleAfterPrint = () => {
        // console.log('After print');
        setIsPrinting(false);
        onAfterPrint?.();
      };

      // Listen for changes in print status
      window.addEventListener('beforeprint', handleBeforePrint);
      window.addEventListener('afterprint', handleAfterPrint);
      // printMediaQueryList.addEventListener('change', updatePrintStatus);

      // Initial check
      // setIsPrinting(window.matchMedia('print'));

      // Mark that listeners have been added
      listenerAddedRef.current = true;

      // Clean up the event listeners on component unmount
      return () => {
        window.removeEventListener('beforeprint', handleBeforePrint);
        window.removeEventListener('afterprint', handleAfterPrint);
        // printMediaQueryList.removeEventListener('change', updatePrintStatus);
        listenerAddedRef.current = false;
      };
    }

    // This ensures the effect runs only once when the component mounts.
    // onBeforePrint or onAfterPrint changes will not cause the listeners to be re-added.

  }, [onAfterPrint, onBeforePrint]);

  return isPrinting;
};

export default usePrintStatus;
