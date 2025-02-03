// Pages/ResumePage/ResumePage.tsx
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Menu from '@/Components/Menu/Menu';
import Resume from '@/Components/Resume/Resume';
import Error404Page from '@/Pages/Error404Page/Error404Page';

import { displayTypeTypes } from '@/Components/Certificates/Certificates';

import { EL_LOCALE, EN_LOCALE, APP_IN_DEV_MODE, APP_BASE_URL, APP_PROD_HOST } from '@/constants';
import { replacePlaceholderWithYearDifference } from '@/Utils/dates';

import useLocale from '@/Hooks/useLocale';
import useExpandedView from '@/Hooks/useExpandedView';
import useDarkMode from '@/Hooks/useDarkMode';
import usePrintStatus from '@/Hooks/usePrintStatus';
import useBodyClassManager from '@/Hooks/useBodyClassManager';

import userDataElGR from '@/Data/Data_el-GR.json';
import userDataEnUS from '@/Data/Data_en-US.json';

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

    // Normalize the pathname by ensuring it ends with a trailing slash
    const normalizedPathname = window.location.pathname.endsWith('/')
      ? window.location.pathname
      : window.location.pathname + '/';
    
    const pathnameAfterResume = normalizedPathname.replace("/resume/", "");
    // Check if both conditions are true for forced redirect
    if (window.location.hash === "" && pathnameAfterResume !== "" && pathnameAfterResume !== "/") {
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

  // Gather SEO meta data
  const baseURL = APP_IN_DEV_MODE ? `http://localhost:5173${APP_BASE_URL}` : `${APP_PROD_HOST}${APP_BASE_URL}`;

  const canonicalURL = `${baseURL}`; // Always point to Greek version
  const alternateEN = `${baseURL}#/en`; // English alternative
  const alternateEL = `${baseURL}`; // Greek alternative

  // Set the URL based on locale
  const pageURL = appLocale === EN_LOCALE ? alternateEN : alternateEL;

  const pageImage = `${baseURL}img/resume-preview.png`;
  const pageTitle = `${profile.name} - ${profile.role}`;
  const metaDescription = replacePlaceholderWithYearDifference(
    profile.bio,
    profile.overallExperienceStartDate,
    appLocale
  );

  return (
    <>
      <>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />

        <meta name="author" content={profile.name} />
        <meta name="copyright" content={profile.name} />
        
        {/* Canonical & hreflang */}
        {/* Canonical URL (Always Greek version) */}
        <link rel="canonical" href={canonicalURL} />

        {/* Hreflang (Language alternatives) */}
        <link rel="alternate" href={alternateEL} hrefLang="el" />
        <link rel="alternate" href={alternateEN} hrefLang="en" />
        <link rel="alternate" href={canonicalURL} hrefLang="x-default" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageURL} />
        {pageImage && <meta property="og:image" content={pageImage} />}
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {pageImage && <meta name="twitter:image" content={pageImage} />}
      </>

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
