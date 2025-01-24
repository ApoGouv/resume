// Pages/ResumePage/ResumePage.tsx
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { EL_LOCALE, EN_LOCALE } from '@/constants';
import SEO from '@/Components/Seo/SEO';
import Menu from '@/Components/Menu/Menu';
import Resume from '@/Components/Resume/Resume';
import Error404Page from '@/Pages/Error404Page/Error404Page';

import useLocale from '@/Hooks/useLocale';
import useExpandedView from '@/Hooks/useExpandedView';
import useDarkMode from '@/Hooks/useDarkMode';
import usePrintStatus from '@/Hooks/usePrintStatus';

import userDataElGR from '@/Data/Data_el-GR.json';
import userDataEnUS from '@/Data/Data_en-US.json';
import '@/Pages/ResumePage/ResumePage.css';

function ResumePage() {
  const { appLocale, setLocale } = useLocale();
  const { expandedView, toggleExpandedView } = useExpandedView();
  const { darkMode } = useDarkMode();
  const [state, setState] = useState(
    appLocale === EN_LOCALE ? userDataEnUS : userDataElGR
  );

  // const isPrinting = usePrintStatus();

  // Track previous expandedView state
  const [wasExpandedView, setWasExpandedView] = useState(expandedView);

  const isPrinting = usePrintStatus({
    onBeforePrint: () => {
      if (expandedView) {
        setWasExpandedView(true);
        toggleExpandedView(); // Disable expanded view before print
      }
    },
    onAfterPrint: () => {
      if (wasExpandedView) {
        toggleExpandedView(); // Restore expanded view after print
        setWasExpandedView(false);
      }
    },
  });

  useEffect(() => {
    // Determine the initial locale based on the URL
    if (
      window.location.hash === `#/en` ||
      window.location.hash.startsWith(`#/en/`)
    ) {
      setLocale(EN_LOCALE);
    } else {
      setLocale(EL_LOCALE);
    }
  }, [setLocale]);


  useEffect(() => {
    // Set the document language attribute
    const language = appLocale.split('-')[0];  // Get the first part (e.g., "en" or "el")
    document.documentElement.setAttribute('lang', language);

    // Update state when appLocale changes
    if (appLocale === EN_LOCALE) {
      setState({ ...userDataEnUS });
    } else {
      setState({ ...userDataElGR });
    }
  }, [appLocale]);

  useEffect(() => {
    // Handle dark mode change
    const { body } = document;
    if (darkMode && !isPrinting) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }

    // Handle expanding view mode change
    if (expandedView && !isPrinting) {
      body.classList.add('expanded-view');
    } else {
      body.classList.remove('expanded-view');
    }

    // Handle printing mode change
    if (isPrinting) {
      body.classList.remove('expanded-view');
      body.classList.remove('dark-mode');

      body.classList.add('printing-mode');
    } else {
      body.classList.remove('printing-mode');
    }
  }, [darkMode, isPrinting, expandedView]);

  const { profile } = state;

  // console.log(`${appLocale} - state: `, state);

  return (
    <>
      <SEO
        name={profile.name}
        occupation={profile.role}
        description={profile.bio}
        expStartDate={profile.overallExperienceStartDate}
        locale={appLocale}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Menu name={profile.name} />
              <Resume data={state} locale={appLocale} dark={darkMode} expandedView={expandedView} />
            </>
          }
        />
        <Route
          path="en"
          element={
            <>
              <Menu name={profile.name} />
              <Resume data={state} locale={appLocale} dark={darkMode} expandedView={expandedView}/>
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
