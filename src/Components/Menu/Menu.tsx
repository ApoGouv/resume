import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { EN_LOCALE, EL_LOCALE, APP_BASE_URL } from '@/constants';
import useLocale from '@/Hooks/useLocale';
import usePrintStatus from '@/Hooks/usePrintStatus';
import useMediaQuery from '@/Hooks/useMediaQuery';
import useExpandedView from '@/Hooks/useExpandedView';
import useDarkMode from '@/Hooks/useDarkMode';
import useVersion from '@/Hooks/useVersion';
import { MENU_ICONS, getOppositeLocaleIconKey } from '@/Utils/iconsLibrary';
import { normalizeUrl } from '@/Utils/strings';

import '@/Components/Menu/Menu.css';

// Define type for localized strings
type LocalizedStringsType = {
  [key: string]: {
    print: string;
    downloadPdfsWrapper: string;
    downloadPdf: string;
    downloadGrayscalePdf: string;
    toggleLocale: string;
    toggleExpandedView: string;
    toggleDarkMode: string;
    bio: string;
  };
};

type MenuProps = {
  name: string;
};

function Menu({ name }: MenuProps) {
  const navigate = useNavigate();
  const { appLocale, setLocale } = useLocale();
  const { expandedView, toggleExpandedView } = useExpandedView();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const isPrinting = usePrintStatus();
  const resumeVersion = useVersion();
  const isMobile = useMediaQuery(`only screen and (max-width: 767.99px)`);

  const [showPdfButtons, setShowPdfButtons] = useState<boolean>(false);

  // const [loadingPdf, setLoadingPdf] = useState<boolean>(false);
  const loadingPdfRef = useRef(false);

  const languageIconKey = getOppositeLocaleIconKey(appLocale);
  const expandedViewIconKey = expandedView ? 'less_details' : 'more_details';
  const darkModeIconKey = darkMode ? 'sun' : 'moon';

  // Define dictionary for localized strings
  const localizedStrings = useMemo<LocalizedStringsType>(() => ({
    [EN_LOCALE]: {
      print: 'Print resume',
      downloadPdfsWrapper:
        'Download resume in PDF format (colored or grayscale)',
      downloadPdf: 'Download colored resume in PDF format',
      downloadGrayscalePdf: 'Download grayscaled resume in PDF format',
      toggleLocale: `Toggle locale to ${EL_LOCALE}`,
      toggleExpandedView: `Toggle expanded view ${expandedView ? 'Off' : 'On'}`,
      toggleDarkMode: `Toggle dark mode ${darkMode ? 'Off' : 'On'}`,
      bio: 'CV',
    },
    [EL_LOCALE]: {
      print: 'Εκτύπωση βιογραφικού',
      downloadPdfsWrapper:
        'Κατεβάστε το βιογραφικό σε μορφή PDf (έγχρωμο ή σε αποχρώσεις του γκρι)',
      downloadPdf: 'Κατεβάστε το έγχρωμο βιογραφικό σε μορφή PDf',
      downloadGrayscalePdf:
        'Κατεβάστε το βιογραφικό σε μορφή PDf σε αποχρώσεις του γκρι',
      toggleLocale: `Εναλλαγή γλώσσας σε ${EN_LOCALE}`,
      toggleExpandedView: `${
        expandedView ? 'Απενεργοποίηση' : 'Ενεργοποίηση'
      } διευρυμένης προβολής`,
      toggleDarkMode: `${
        darkMode ? 'Απενεργοποίηση' : 'Ενεργοποίηση'
      } σκούρου θέματος`,
      bio: 'Βιογραφικό',
    },
  }), [expandedView, darkMode]);

  const togglePdfButtons = () => {
    setShowPdfButtons((prevState) => !prevState);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-pdfs-resume') && showPdfButtons) {
      setShowPdfButtons(false);
    }
  }, [showPdfButtons]);

  // Hide PDF buttons when clicking outside
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handlePrintButtonClick = () => {
    /**
     * On mobile the window.print() is printing the mobile version
     * which is not print friendly. Thus we trigger the print PDF.
     */
    if (isMobile) {
      const printPdfButton = document.querySelector(
        '.menu-item.menu-grayscale-pdf-resume'
      ) as HTMLButtonElement;
      if (printPdfButton) {
        printPdfButton.click();
      } else {
        console.error('Print PDF button not found.');
      }
    } else {
      if (expandedView) {
        toggleExpandedView(); // Toggle expanded view off
        setTimeout(() => {
          window.print(); // Delay to ensure the state update propagates
        }, 100); // Small delay (100ms) for state propagation
      } else {
        window.print(); // Directly trigger print if not expanded
      }
    }
  };

  const handlePdfButtonClick = (bnw = false) => {
    if (loadingPdfRef.current) return; // Prevent multiple downloads

    loadingPdfRef.current = true;
    try {
      const pdfName = `${name.replace(/\s+/g, '-')}-${
        localizedStrings[appLocale].bio
      }${bnw ? '-print' : ''}`;
      const pdfUrl = normalizeUrl(
        `${APP_BASE_URL}/pdf/${pdfName}.pdf?v=${resumeVersion}`
      );

      const pdfWindowOptions = {
        url: pdfUrl,
        target: `${name} - ${localizedStrings[appLocale].bio}`,
        windowFeatures: [
          'popup=true',
          'noreferrer=true',
          'width=793.7007874px',
          'height=1122.519685px',
          'status=no',
          'location=no',
          'toolbar=no',
          'menubar=no',
        ],
      };

      window.open(
        pdfWindowOptions.url,
        pdfWindowOptions.target,
        pdfWindowOptions.windowFeatures.join()
      );
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      loadingPdfRef.current = false;
    }
  };

  const toggleLocale = useCallback(() => {
    const newLocale = appLocale === EL_LOCALE ? EN_LOCALE : EL_LOCALE;
    if (newLocale !== appLocale) {
      setLocale(newLocale);
      navigate(newLocale === EN_LOCALE ? `/en` : `/`);
    }
  }, [appLocale, setLocale, navigate]);

  return (
    <div
      id="menu"
      className={`menu ${isPrinting ? 'printing' : ''}`}
      data-rs-id="rs-menu"
    >
      <button
        className="menu-item menu-print-resume"
        type="button"
        title={localizedStrings[appLocale].print}
        data-rs-id="rs-menu-print"
        onClick={handlePrintButtonClick}
      >
        {MENU_ICONS.print}
      </button>

      <div
        className={`menu-item menu-pdfs-resume ${
          showPdfButtons ? ' active' : ''
        } ${!isMobile ? ' hoverable' : ''}`}
        title={localizedStrings[appLocale].downloadPdfsWrapper}
        data-rs-id="rs-menu-pdfs"
        onClick={(e) => {
          if (isMobile) {
            togglePdfButtons();
            // Explicitly blur the element to remove focus
            e.currentTarget.blur();
          }
        }}
      >
        <div 
          className={`pdf-buttons-container ${
            showPdfButtons || !isMobile ? 'visible' : ''
          }`}
        >
          <button
            className="menu-item menu-colored-pdf-resume"
            type="button"
            title={localizedStrings[appLocale].downloadPdf}
            data-rs-id="rs-menu-colored-pdf"
            onClick={() => handlePdfButtonClick()}
            disabled={loadingPdfRef.current}
          >
            {loadingPdfRef.current ? MENU_ICONS.loading : MENU_ICONS.pdf}
          </button>

          <button
            className="menu-item menu-grayscale-pdf-resume"
            type="button"
            title={localizedStrings[appLocale].downloadGrayscalePdf}
            data-rs-id="rs-menu-grayscale-pdf"
            onClick={() => handlePdfButtonClick(true)}
            disabled={loadingPdfRef.current}
          >
            {loadingPdfRef.current ? MENU_ICONS.loading : MENU_ICONS.pdf}
          </button>
        </div>
        {MENU_ICONS.pdf}
      </div>

      <button
        className="menu-item menu-locale-toggler"
        type="button"
        title={localizedStrings[appLocale].toggleLocale}
        data-rs-id="rs-menu-toggle-locale"
        onClick={toggleLocale}
      >
        {MENU_ICONS[languageIconKey as keyof typeof MENU_ICONS]}
      </button>

      <button
        className={`menu-item menu-expanded-view-toggler menu-ev-${expandedViewIconKey}`}
        type="button"
        title={localizedStrings[appLocale].toggleExpandedView}
        data-rs-id="rs-menu-toggle-expanded-view"
        onClick={toggleExpandedView}
      >
        {/* More details */}
        {MENU_ICONS[expandedViewIconKey as keyof typeof MENU_ICONS]}
      </button>

      <button
        className={`menu-item menu-dark-mode-toggler menu-dm-${darkModeIconKey}`}
        type="button"
        title={localizedStrings[appLocale].toggleDarkMode}
        data-rs-id="rs-menu-toggle-dark-mode"
        onClick={toggleDarkMode}
      >
        {MENU_ICONS[darkModeIconKey as keyof typeof MENU_ICONS]}
      </button>
    </div>
  );
}

export default Menu;
