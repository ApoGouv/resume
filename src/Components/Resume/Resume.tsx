import Profile, { ProfileProps } from '@/Components/Profile/Profile';
import WorkExperience, {
  WorkExperienceProps,
} from '@/Components/WorkExperience/WorkExperience';
import Education, { EducationProps } from '@/Components/Education/Education';
import Certificates, { CertificatesProps } from '@/Components/Certificates/Certificates';
import Languages, { LanguagesProp } from '@/Components/Languages/Languages';
import Tools, { ToolsProp } from '@/Components/Tools/Tools';
import Interests, { InterestsProps } from '@/Components/Interests/Interests';
import isEmpty from '@/Utils/isEmpty';
import useMediaQuery from '@/Hooks/useMediaQuery';
import usePrintStatus from '@/Hooks/usePrintStatus';

import '@/Components/Resume/Resume.css';

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
  locale: string;
  dark: boolean;
};

function Resume({ data, locale, dark }: ResumeProps) {
  const {
    profile,
    workExperience,
    education,
    certificates,
    languages,
    tools,
    interests,
  } = data;

  const isMobile = useMediaQuery(`only screen and (max-width: 767.99px)`);
  const isPrinting = usePrintStatus();

  return (
    <main
      className={`resume-container ${dark ? 'dark-resume' : ''}`}
      id="resume-container"
      data-rs-id="rs-resume-container"
    >
      <div
        className="resume resume-A4"
        id="resume"
        data-rs-id="rs-resume"
        data-rs-name={`${profile?.name ?? 'Απόστολος Γουβάλας'}`}
        data-rs-locale={locale}
      >
        <div className="resume__left">
          <Profile data={profile} />
          <Education data={education} />
          {!isMobile || isPrinting ? (
            <>
              {!isEmpty(languages.entries) && !languages.isHidden && (
                <Languages data={languages} />
              )}
              {!isEmpty(tools.entries) && !tools.isHidden && (
                <Tools data={tools} />
              )}
              {!isEmpty(interests.entries) && !interests.isHidden && (
                <Interests data={interests} />
              )}
            </>
          ) : (
            <>
              <WorkExperience data={workExperience} />
              {!certificates.isHidden && <Certificates data={certificates} />}
            </>
          )}
        </div>
        <div className="resume__right">
          {!isMobile || isPrinting ? (
            <>
              <WorkExperience data={workExperience} />
              {!certificates.isHidden && <Certificates data={certificates} />}
            </>
          ) : (
            <>
              {!isEmpty(languages.entries) && !languages.isHidden && (
                <Languages data={languages} />
              )}
              {!isEmpty(tools.entries) && !tools.isHidden && (
                <Tools data={tools} />
              )}
              {!isEmpty(interests.entries) && !interests.isHidden && (
                <Interests data={interests} />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Resume;
