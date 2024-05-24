// Pages/ResumePage/ResumePage.tsx
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SEO from '../../Components/Seo/SEO';
import Menu from '../../Components/Menu/Menu';
import Resume from '../../Components/Resume/Resume';
import Error404Page from '../Error404Page/Error404Page';

import useLocale from '../../Hooks/useLocale';
import useExpandedView from '../../Hooks/useExpandedView';
import useDarkMode from '../../Hooks/useDarkMode';
import usePrintStatus from '../../Hooks/usePrintStatus';

import { BASE_APP_URL } from '../../constants';

import userDataElGR from '../../Data/Data_el-GR.json';
import userDataEnUS from '../../Data/Data_en-US.json';
import './ResumePage.css';

function ResumePage() {
  const location = useLocation();
  const { appLocale, setLocale } = useLocale();
  const { expandedView } = useExpandedView();
  const { darkMode } = useDarkMode();
  const [state, setState] = useState(
    appLocale === 'en-US' ? userDataEnUS : userDataElGR
  );

  const isPrinting = usePrintStatus();

  useEffect(() => {
    console.log('Current location.pathname: ', location.pathname);

    // Determine the initial locale based on the URL
    if (
      location.pathname === `${BASE_APP_URL}/en` ||
      location.pathname.startsWith(`${BASE_APP_URL}/en/`)
    ) {
      setLocale('en-US');
    } else {
      setLocale('el-GR');
    }
  }, [location.pathname, setLocale]);

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
      <Routes>
        <Route
          path="/resume"
          element={
            <>
              <Menu name={profile.name} />
              <Resume data={state} locale={appLocale} dark={darkMode} />
            </>
          }
        />
        <Route
          path="/resume/en"
          element={
            <>
              <Menu name={profile.name} />
              <Resume data={state} locale={appLocale} dark={darkMode} />
            </>
          }
        />
        <Route
          path="*"
          element={<Error404Page locale={appLocale} dark={darkMode} />}
        />
      </Routes>
    </>
  );
}

export default ResumePage;
