import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocale from '../../Hooks/useLocale';
import usePrintStatus from '../../Hooks/usePrintStatus';
import useMediaQuery from '../../Hooks/useMediaQuery';
import useExpandedView from '../../Hooks/useExpandedView';
import useDarkMode from '../../Hooks/useDarkMode';
import { MENU_ICONS } from '../../Utils/iconsLibrary';
import { normalizeUrl } from '../../Utils/strings';

import './Menu.css';

// Define type for localized strings
type LocalizedStrings = {
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
  const isMobile = useMediaQuery(`only screen and (max-width: 767.99px)`);
  const [loadingPdf, setLoadingPdf] = useState<boolean>(false);

  const languageIconKey = appLocale === 'el-GR' ? 'en_us' : 'el_gr';
  const expandedViewIconKey = expandedView ? 'less_details' : 'more_details';
  const darkModeIconKey = darkMode ? 'sun' : 'moon';

  // Define dictionary for localized strings
  const localizedStrings: LocalizedStrings = {
    'en-US': {
      print: 'Print resume',
      downloadPdfsWrapper:
        'Download resume in PDF format (colored or grayscale)',
      downloadPdf: 'Download colored resume in PDF format',
      downloadGrayscalePdf: 'Download grayscaled resume in PDF format',
      toggleLocale: 'Toggle locale to el-GR',
      toggleExpandedView: `Toggle expanded view ${expandedView ? 'Off' : 'On'}`,
      toggleDarkMode: `Toggle dark mode ${darkMode ? 'Off' : 'On'}`,
      bio: 'CV',
    },
    'el-GR': {
      print: 'Εκτύπωση βιογραφικού',
      downloadPdfsWrapper:
        'Κατεβάστε το βιογραφικό σε μορφή PDf (έγχρωμο ή σε αποχρώσεις του γκρι)',
      downloadPdf: 'Κατεβάστε το έγχρωμο βιογραφικό σε μορφή PDf',
      downloadGrayscalePdf:
        'Κατεβάστε το βιογραφικό σε μορφή PDf σε αποχρώσεις του γκρι',
      toggleLocale: 'Εναλλαγή γλώσσας σε en-US',
      toggleExpandedView: `${
        expandedView ? 'Απενεργοποίηση' : 'Ενεργοποίηση'
      } διευρυμένης προβολής`,
      toggleDarkMode: `${
        darkMode ? 'Απενεργοποίηση' : 'Ενεργοποίηση'
      } σκούρου θέματος`,
      bio: 'Βιογραφικό',
    },
  };

  const handlePrintButtonClick = () => {
    /**
     * On mobile the window.print() is printing the mobile version
     * which is not print friendly.
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
      // eslint-disable-next-line no-restricted-globals
      window.print();
    }
  };

  const handlePdfButtonClick = (bnw = false) => {
    setLoadingPdf(true);
    try {
      const pdfName = `${name.replace(/\s+/g, '-')}-${
        localizedStrings[appLocale].bio
      }${bnw ? '-print' : ''}`;
      const pdfUrl = normalizeUrl(
        `${import.meta.env.BASE_URL}/pdf/${pdfName}.pdf`
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
      setLoadingPdf(false);
    }
  };

  const toggleLocale = () => {
    const newLocale = appLocale === 'el-GR' ? 'en-US' : 'el-GR';
    setLocale(newLocale);
    if (newLocale === 'en-US') {
      navigate(`/en`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <div
      id="menu"
      className={`menu ${isPrinting ? 'printing' : ''}`}
      data-rs-id="rs-menu"
    >
      {/*
      <p className="hidden">
        Current Locale: {appLocale} and langKey: {languageIconKey}
      </p>
      */}

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
        className="menu-item menu-pdfs-resume"
        title={localizedStrings[appLocale].downloadPdfsWrapper}
        data-rs-id="rs-menu-pdfs"
      >
        <div className="pdf-buttons-container">
          <button
            className="menu-item menu-colored-pdf-resume"
            type="button"
            title={localizedStrings[appLocale].downloadPdf}
            data-rs-id="rs-menu-colored-pdf"
            onClick={() => handlePdfButtonClick()}
            disabled={loadingPdf}
          >
            {loadingPdf ? MENU_ICONS.loading : MENU_ICONS.pdf}
          </button>

          <button
            className="menu-item menu-grayscale-pdf-resume"
            type="button"
            title={localizedStrings[appLocale].downloadGrayscalePdf}
            data-rs-id="rs-menu-grayscale-pdf"
            onClick={() => handlePdfButtonClick(true)}
            disabled={loadingPdf}
          >
            {loadingPdf ? MENU_ICONS.loading : MENU_ICONS.pdf}
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
        {/* more_details */}
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
