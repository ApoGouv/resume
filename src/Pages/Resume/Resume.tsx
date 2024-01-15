import { useState } from 'react';
import SEO from '../../Components/Seo/SEO';
import Profile from '../../Components/Profile/Profile';
import WorkExperience from '../../Components/WorkExperience/WorkExperience';
import userData from '../../Data/Data.json';
import './Resume.css';

function Resume() {
  const [state] = useState(userData);
  const { profile, workExperience } = state;

  return (
    <>
      <SEO
        name={profile.name}
        occupation={profile.role}
        description={profile.bio}
      />
      <main className="resume-container" id="resume-container">
        <div className="resume resume-A4" id="resume">
          <div className="resume__left">
            <Profile data={profile} />
          </div>
          <div className="resume__right">
            <WorkExperience data={workExperience} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Resume;
