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
import { FALLBACK_NAME } from '@/constants';

import '@/Components/Resume/Resume.css';

type ResumeProps = {
  resumeData: {
    profile: ProfileProps['profileData'];
    workExperience: WorkExperienceProps['workExperienceData'];
    education: EducationProps['educationData'];
    certificates: CertificatesProps['certificatesData'];
    languages: LanguagesProp['languagesData'];
    tools: ToolsProp['toolsData'];
    interests: InterestsProps['interestsData'];
    projects: ProjectsProps['projectsData'];
  };
  locale: string;
  dark: boolean;
};

function Resume({ resumeData, locale, dark }: ResumeProps) {
  const {
    profile,
    workExperience,
    education,
    certificates,
    languages,
    tools,
    interests,
    projects,
  } = resumeData;

  const isMobile = useMediaQuery(`only screen and (max-width: 767.99px)`);
  const isPrinting = usePrintStatus();

  type SectionData = {
    isHidden?: boolean;
    entries?: unknown[];
  };

  const shouldRenderSection = <T extends SectionData>(
    sectionData: T
  ): boolean => {
    return Boolean(sectionData && !sectionData.isHidden && !isEmpty(sectionData.entries));
  };

  const leftContent = !isMobile || isPrinting
    ? <>
        {!certificates.isHidden && <Certificates certificatesData={certificates} />}
        {shouldRenderSection(tools) && <Tools toolsData={tools} />}
        {shouldRenderSection(languages) && <Languages languagesData={languages} />}
        {shouldRenderSection(interests) && <Interests interestsData={interests} />}
      </>
    : <>
        <WorkExperience workExperienceData={workExperience} />
        {!projects.isHidden && <Projects projectsData={projects} />}
        {!certificates.isHidden && <Certificates certificatesData={certificates} />}
      </>;

  const rightContent = !isMobile || isPrinting
  ? <>
      <WorkExperience workExperienceData={workExperience} />
      {!projects.isHidden && <Projects projectsData={projects} />}
    </>
  : <>
      {shouldRenderSection(tools) && <Tools toolsData={tools} />}
      {shouldRenderSection(languages) && <Languages languagesData={languages} />}
      {shouldRenderSection(interests) && <Interests interestsData={interests} />}
    </>;

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
        data-rs-name={`${profile?.name ?? FALLBACK_NAME}`}
        data-rs-locale={locale}
      >
        <div className="resume__left">
          <Profile profileData={profile} />
          <Education educationData={education} />
          {leftContent}
        </div>
        <div className="resume__right">
          {rightContent}
        </div>
      </div>
    </main>
  );
}

export default Resume;
