import { useState } from 'react';

import SEO from '../../Components/Seo/SEO';
import Profile from '../../Components/Profile/Profile';
import userData from '../../Data/Data.json';
import './Resume.css';

function Resume() {
  const [state] = useState(userData);
  const { profile } = state;

  return (
    <>
      <SEO
        name={profile.name}
        occupation={profile.role}
        description={profile.bio}
      />
      <main className="resume-container" id="resume-container">
        <div className="resume size-A4" id="resume">
          <div className="profile">
            <Profile data={profile} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Resume;
