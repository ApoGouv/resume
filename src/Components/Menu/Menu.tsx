import useLocale from '../../Hooks/useLocale';
import usePrintStatus from '../../Hooks/usePrintStatus';
import './Menu.css';

function Menu() {
  const { appLocale, changeLocale } = useLocale();
  const isPrinting = usePrintStatus();

  return (
    <div id="menu" className={`menu ${isPrinting ? 'printing' : ''}`}>
      <p>Current Locale: {appLocale}</p>
      <button
        type="button"
        onClick={() => changeLocale(appLocale === 'el-GR' ? 'en-US' : 'el-GR')}
      >
        Toggle Locale
      </button>
      {/* Additional buttons for dark mode, print, download PDF, etc. can be added here */}
    </div>
  );
}

export default Menu;
