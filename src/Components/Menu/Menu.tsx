import useLocale from '../../Hooks/useLocale';
import usePrintStatus from '../../Hooks/usePrintStatus';
import useDarkMode from '../../Hooks/useDarkMode';
import { MENU_ICONS } from '../../Utils/iconsLibrary';

import './Menu.css';

function Menu() {
  const { appLocale, changeLocale } = useLocale();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const isPrinting = usePrintStatus();

  const darkModeIconKey = darkMode ? 'sun' : 'moon';
  const languageIconKey = appLocale === 'el-GR' ? 'en_us' : 'el_gr';

  const handlePrintButtonClick = () => {
    // eslint-disable-next-line no-restricted-globals
    print();
  };

  return (
    <div id="menu" className={`menu ${isPrinting ? 'printing' : ''}`}>
      <p className="hidden">
        Current Locale: {appLocale} and langKey: {languageIconKey}
      </p>
      <button
        className="menu-item menu-print-resume"
        type="button"
        title="Print Resume"
        onClick={handlePrintButtonClick}
      >
        {MENU_ICONS.print}
      </button>

      <button
        className="menu-item menu-locale-toggler"
        type="button"
        title={`Toggle Locale to ${appLocale === 'el-GR' ? 'en-US' : 'el-GR'}`}
        onClick={() => changeLocale(appLocale === 'el-GR' ? 'en-US' : 'el-GR')}
      >
        {MENU_ICONS[languageIconKey as keyof typeof MENU_ICONS]}
      </button>

      <button
        className={`menu-item menu-dark-mode-toggler menu-dm-${darkModeIconKey}`}
        type="button"
        title={`Toggle Dark Mode ${darkMode ? 'Off' : 'On'}`}
        onClick={toggleDarkMode}
      >
        {MENU_ICONS[darkModeIconKey as keyof typeof MENU_ICONS]}
      </button>
      {/* Additional buttons print, download PDF, here */}
    </div>
  );
}

export default Menu;
