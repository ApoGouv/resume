import { useEffect, useState } from 'react';
import SEO from '../../Components/Seo/SEO';
import Profile from '../../Components/Profile/Profile';
import WorkExperience from '../../Components/WorkExperience/WorkExperience';
import Education from '../../Components/Education/Education';
import Certificates from '../../Components/Certificates/Certificates';
import Languages from '../../Components/Languages/Languages';
import Tools from '../../Components/Tools/Tools';
import Interests from '../../Components/Interests/Interests';
import isEmpty from '../../Utils/isEmpty';

import useLocale from '../../Utils/useLocale';

import userDataElGR from '../../Data/Data_el-GR.json';
import userDataEnUS from '../../Data/Data_en-US.json';
import './Resume.css';

function Resume() {
  const { appLocale, changeLocale } = useLocale();
  const [state, setState] = useState(
    appLocale === 'en-US' ? userDataEnUS : userDataElGR
  );

  // Update state when appLocale changes
  useEffect(() => {
    if (appLocale === 'en-US') {
      setState({ ...userDataEnUS });
    } else if (appLocale === 'el-GR') {
      setState({ ...userDataElGR });
    }
  }, [appLocale]);

  const {
    profile,
    workExperience,
    education,
    certificates,
    languages,
    tools,
    interests,
  } = state;

  console.log(`${appLocale} - state: `, state);
  console.log(`${appLocale} - state.tools: `, tools);

  return (
    <>
      <SEO
        name={profile.name}
        occupation={profile.role}
        description={profile.bio}
      />
      <div>
        <p>Current Locale: {appLocale}</p>
        <button
          type="button"
          onClick={() =>
            changeLocale(appLocale === 'el-GR' ? 'en-US' : 'el-GR')
          }
        >
          Toggle Locale
        </button>
      </div>
      <main className="resume-container" id="resume-container">
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
