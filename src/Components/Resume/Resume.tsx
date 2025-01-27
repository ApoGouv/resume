import Profile, { ProfileProps } from '@/Components/Profile/Profile';
import WorkExperience, {
  WorkExperienceProps,
} from '@/Components/WorkExperience/WorkExperience';
import Education, { EducationProps } from '@/Components/Education/Education';
import Certificates, { CertificatesProps } from '@/Components/Certificates/Certificates';
import Languages, { LanguagesProp } from '@/Components/Languages/Languages';
import Tools, { ToolsProp } from '@/Components/Tools/Tools';
import Interests, { InterestsProps } from '@/Components/Interests/Interests';
import Projects, { ProjectsProps } from '@/Components/Projects/Projects';
import isEmpty from '@/Utils/isEmpty';
import useMediaQuery from '@/Hooks/useMediaQuery';
import usePrintStatus from '@/Hooks/usePrintStatus';

import '@/Components/Resume/Resume.css';

type ResumeProps = {
  data: {
    profile: ProfileProps['profileData'];
    workExperience: WorkExperienceProps['data'];
    education: EducationProps['data'];
    certificates: CertificatesProps['certificatesData'];
    languages: LanguagesProp['languagesData'];
    tools: ToolsProp['toolsData'];
    interests: InterestsProps['interestsData'];
    projects: ProjectsProps['projectsData'];
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
    projects,
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
          <Profile profileData={profile} />
          <Education data={education} />
          {!isMobile || isPrinting ? (
            <>
              {!certificates.isHidden && <Certificates certificatesData={certificates} />}
              {!isEmpty(languages.entries) && !languages.isHidden && (
                <Languages languagesData={languages} />
              )}
              {!isEmpty(interests.entries) && !interests.isHidden && (
                <Interests interestsData={interests} />
              )}
            </>
          ) : (
            <>
              <WorkExperience data={workExperience} />
              {!projects.isHidden && <Projects projectsData={projects} />}
              {!certificates.isHidden && <Certificates certificatesData={certificates} />}
            </>
          )}
        </div>
        <div className="resume__right">
          {!isMobile || isPrinting ? (
            <>
              <WorkExperience data={workExperience} />
              {!projects.isHidden && <Projects projectsData={projects} />}
              {!isEmpty(tools.entries) && !tools.isHidden && (
                <Tools toolsData={tools} />
              )}
            </>
          ) : (
            <>
              {!isEmpty(tools.entries) && !tools.isHidden && (
                <Tools toolsData={tools} />
              )}
              {!isEmpty(languages.entries) && !languages.isHidden && (
                <Languages languagesData={languages} />
              )}
              {!isEmpty(interests.entries) && !interests.isHidden && (
                <Interests interestsData={interests} />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Resume;
