import { useContext } from 'react';
import { LocaleContext, LocaleContextType } from '../LocaleProvider';

const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a makeLocaleProvider');
  }
  return context;
};

export default useLocale;
