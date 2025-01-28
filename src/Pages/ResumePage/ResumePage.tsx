// Pages/ResumePage/ResumePage.tsx
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { EL_LOCALE, EN_LOCALE } from '@/constants';
import SEO from '@/Components/Seo/SEO';
import Menu from '@/Components/Menu/Menu';
import Resume from '@/Components/Resume/Resume';
import Error404Page from '@/Pages/Error404Page/Error404Page';

import useLocale from '@/Hooks/useLocale';
import useExpandedView from '@/Hooks/useExpandedView';
import useDarkMode from '@/Hooks/useDarkMode';
import usePrintStatus from '@/Hooks/usePrintStatus';
import useBodyClassManager from '@/Hooks/useBodyClassManager';

import userDataElGR from '@/Data/Data_el-GR.json';
import userDataEnUS from '@/Data/Data_en-US.json';
import { displayTypeTypes } from '@/Components/Certificates/Certificates';
import '@/Pages/ResumePage/ResumePage.css';

const sanitizedUserDataEnUS = {
  ...userDataEnUS,
  certificates: {
    ...userDataEnUS.certificates,
    entries: userDataEnUS.certificates.entries.map((entry) => ({
      ...entry,
      // Directly assert the 'displayType' property as 'displayTypeTypes' to enforce the correct type.
      // This ensures type compatibility and fixes the TypeScript error related to the 'displayType' property.
      displayType: entry.displayType as displayTypeTypes,
    })),
  },
};

const sanitizedUserDataElGR = {
  ...userDataElGR,
  certificates: {
    ...userDataElGR.certificates,
    entries: userDataElGR.certificates.entries.map((entry) => ({
      ...entry,
      // Directly assert the 'displayType' property as 'displayTypeTypes' to enforce the correct type.
      // This ensures type compatibility and fixes the TypeScript error related to the 'displayType' property.
      displayType: entry.displayType as displayTypeTypes,
    })),
  },
};

function ResumePage() {
  const { appLocale, setLocale } = useLocale();
  const { expandedView, toggleExpandedView } = useExpandedView();
  const { darkMode } = useDarkMode();
  const location = useLocation();
  
  const [state, setState] = useState(
    appLocale === EN_LOCALE ? sanitizedUserDataEnUS : sanitizedUserDataElGR
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
    const localeFromUrl = location.pathname.startsWith('/en') ? EN_LOCALE : EL_LOCALE;
    setLocale(localeFromUrl);

    // Check if both conditions are true for forced redirect
    const pathnameAfterResume = window.location.pathname.replace("/resume/", "");
    if (window.location.hash === "" && pathnameAfterResume !== "") {
      // Clean the URL and redirect to the 404 page if both conditions are met
      window.location.replace("/resume/#/404");
    }
  }, [location, setLocale]);


  useEffect(() => {
    // Set the document language attribute
    const language = appLocale.split('-')[0];  // Get the first part (e.g., "en" or "el")
    document.documentElement.setAttribute('lang', language);

    // Update state when appLocale changes
    if (appLocale === EN_LOCALE) {
      setState(sanitizedUserDataEnUS);
    } else {
      setState(sanitizedUserDataElGR);
    }
  }, [appLocale]);

  // Manage body classes
  useBodyClassManager(darkMode, expandedView, isPrinting);

  const { profile } = state;

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
        {/* Valid Locale Routes */}
        <Route
          path="/"
          element={
            <>
              <Menu name={profile.name} />
              <Resume 
                resumeData={state}
                locale={appLocale} 
                dark={darkMode}
              />
            </>
          }
        />
        <Route
          path="en"
          element={
            <>
              <Menu name={profile.name} />
              <Resume 
                resumeData={state}
                locale={appLocale} 
                dark={darkMode}
              />
            </>
          }
        />

        {/* Fallback for invalid paths */}
        <Route
          path="*"
          element={<Error404Page locale={appLocale} dark={darkMode} />}
        />
      </Routes>
    </>
  );
}

export default ResumePage;
