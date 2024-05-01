// Pages/ResumePage/ResumePage.tsx
import { useEffect, useState } from 'react';
import SEO from '../../Components/Seo/SEO';
import Menu from '../../Components/Menu/Menu';
import Resume from '../../Components/Resume/Resume';

import useLocale from '../../Hooks/useLocale';
import useExpandedView from '../../Hooks/useExpandedView';
import useDarkMode from '../../Hooks/useDarkMode';
import usePrintStatus from '../../Hooks/usePrintStatus';

import userDataElGR from '../../Data/Data_el-GR.json';
import userDataEnUS from '../../Data/Data_en-US.json';
import './ResumePage.css';

function ResumePage() {
  const { appLocale } = useLocale();
  const { expandedView } = useExpandedView();
  const { darkMode } = useDarkMode();
  const [state, setState] = useState(
    appLocale === 'en-US' ? userDataEnUS : userDataElGR
  );

  const isPrinting = usePrintStatus();

  useEffect(() => {
    // Update state when appLocale changes
    if (appLocale === 'en-US') {
      setState({ ...userDataEnUS });
    } else {
      setState({ ...userDataElGR });
    }

    // Handle dark mode change
    const { body } = document;
    if (darkMode && !isPrinting) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }

    if (expandedView && !isPrinting) {
      body.classList.add('expanded-view');
    } else {
      body.classList.remove('expanded-view');
    }

    // Handle printing mode change
    if (isPrinting) {
      body.classList.remove('expanded-view');

      body.classList.add('printing-mode');
    } else {
      body.classList.remove('printing-mode');
    }
  }, [appLocale, darkMode, isPrinting, expandedView]);

  const { htmlLang, profile } = state;

  // console.log(`${appLocale} - state: `, state);

  return (
    <>
      <SEO
        lang={htmlLang}
        name={profile.name}
        occupation={profile.role}
        description={profile.bio}
        expStartDate={profile.overallExperienceStartDate}
        locale={appLocale}
      />
      <Menu name={profile.name} />
      <Resume data={state} locale={appLocale} dark={darkMode} />
    </>
  );
}

export default ResumePage;
