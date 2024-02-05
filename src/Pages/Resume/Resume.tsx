import { useEffect, useState } from 'react';
import SEO from '../../Components/Seo/SEO';
import Menu from '../../Components/Menu/Menu';
import Profile from '../../Components/Profile/Profile';
import WorkExperience from '../../Components/WorkExperience/WorkExperience';
import Education from '../../Components/Education/Education';
import Certificates from '../../Components/Certificates/Certificates';
import Languages from '../../Components/Languages/Languages';
import Tools from '../../Components/Tools/Tools';
import Interests from '../../Components/Interests/Interests';
import isEmpty from '../../Utils/isEmpty';

import useLocale from '../../Hooks/useLocale';
import useDarkMode from '../../Hooks/useDarkMode';
import usePrintStatus from '../../Hooks/usePrintStatus';

import userDataElGR from '../../Data/Data_el-GR.json';
import userDataEnUS from '../../Data/Data_en-US.json';
import './Resume.css';

function Resume() {
  const { appLocale } = useLocale();
  const { darkMode } = useDarkMode();
  const [state, setState] = useState(
    appLocale === 'en-US' ? userDataEnUS : userDataElGR
  );

  const isPrinting = usePrintStatus();

  useEffect(() => {
    // Update state when appLocale changes
    if (appLocale === 'en-US') {
      setState({ ...userDataEnUS });
    } else if (appLocale === 'el-GR') {
      setState({ ...userDataElGR });
    }

    // Handle dark mode change
    const { body } = document;
    if (darkMode && !isPrinting) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }

    // Handle printing mode change
    if (isPrinting) {
      body.classList.add('printing-mode');
    } else {
      body.classList.remove('printing-mode');
    }
  }, [appLocale, darkMode, isPrinting]);

  const {
    htmlLang,
    profile,
    workExperience,
    education,
    certificates,
    languages,
    tools,
    interests,
  } = state;

  // console.log(`${appLocale} - state: `, state);

  return (
    <>
      <SEO
        lang={htmlLang}
        name={profile.name}
        occupation={profile.role}
        description={profile.bio}
      />
      <Menu />
      <main
        className={`resume-container ${darkMode ? 'dark-resume' : ''}`}
        id="resume-container"
      >
        <div className="resume resume-A4" id="resume">
          <div className="resume__left">
            <Profile data={profile} />
            <Education data={education} />
            {!isEmpty(languages.entries) && !languages.isHidden && (
              <Languages data={languages} />
            )}
            {!isEmpty(tools.entries) && !tools.isHidden && (
              <Tools data={tools} />
            )}
            {!isEmpty(interests.entries) && !interests.isHidden && (
              <Interests data={interests} />
            )}
          </div>
          <div className="resume__right">
            <WorkExperience data={workExperience} />
            {!certificates.isHidden && <Certificates data={certificates} />}
          </div>
        </div>
      </main>
    </>
  );
}

export default Resume;
