import Profile, { ProfileProps } from '../Profile/Profile';
import WorkExperience, {
  WorkExperienceProps,
} from '../WorkExperience/WorkExperience';
import Education, { EducationProps } from '../Education/Education';
import Certificates, { CertificatesProps } from '../Certificates/Certificates';
import Languages, { LanguagesProp } from '../Languages/Languages';
import Tools, { ToolsProp } from '../Tools/Tools';
import Interests, { InterestsProps } from '../Interests/Interests';
import isEmpty from '../../Utils/isEmpty';

import './Resume.css';

type ResumeProps = {
  data: {
    profile: ProfileProps['data'];
    workExperience: WorkExperienceProps['data'];
    education: EducationProps['data'];
    certificates: CertificatesProps['data'];
    languages: LanguagesProp['data'];
    tools: ToolsProp['data'];
    interests: InterestsProps['data'];
  };
};

function Resume({ data }: ResumeProps) {
  const {
    profile,
    workExperience,
    education,
    certificates,
    languages,
    tools,
    interests,
  } = data;

  return (
    <div className="resume resume-A4" id="resume">
      <div className="resume__left">
        <Profile data={profile} />
        <Education data={education} />
        {!isEmpty(languages.entries) && !languages.isHidden && (
          <Languages data={languages} />
        )}
        {!isEmpty(tools.entries) && !tools.isHidden && <Tools data={tools} />}
        {!isEmpty(interests.entries) && !interests.isHidden && (
          <Interests data={interests} />
        )}
      </div>
      <div className="resume__right">
        <WorkExperience data={workExperience} />
        {!certificates.isHidden && <Certificates data={certificates} />}
      </div>
    </div>
  );
}

export default Resume;
