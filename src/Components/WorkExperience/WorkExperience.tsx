import React, { useMemo } from 'react';
import useLocale from '@/Hooks/useLocale';
import { getDateRangeFormattedIntl, dateFormatOptions } from '@/Utils/dates';
import { WORK_EXPERIENCE_ICONS } from '@/Utils/iconsLibrary';
import '@/Components/WorkExperience/WorkExperience.css';

type DurationType = {
  from: string;
  to: string;
  icon: string;
  showIcon: boolean;
};

type ProjectType = {
  name: string;
  technologies: string[];
  responsibilities: string[];
  showResponsibilities: boolean;
};

type WorkProjectsType = {
  isHidden: boolean;
  title: string;
  entries: ProjectType[];
};

type WorkType = {
  role: string;
  showRole: boolean;
  projects?: WorkProjectsType;
  description?: string[];
  showDescription?: boolean;
};

type AddressType = {
  street: string;
  postalCode: string;
  city: string;
  countryCode: string;
  country: string;
  text: string;
  icon: string;
  showIcon: boolean;
};

type ExperienceType = {
  isHidden: boolean;
  mainRole: string;
  company: string;
  companyOldName?: string;
  duration: DurationType;
  address: AddressType;
  work: WorkType[];
};

type ExperienceSectionType = {
  sectionTitle: string;
  isHidden: boolean;
  entries: ExperienceType[];
};

export type WorkExperienceProps = {
  workExperienceData: ExperienceSectionType;
};

function WorkExperience({ workExperienceData }: WorkExperienceProps) {
  const { appLocale } = useLocale();

  const visibleEntries = useMemo(
    () => workExperienceData.entries.filter((entry) => !entry.isHidden),
    [workExperienceData.entries]
  );

  return (
    <section className="workExp__section" id="workExperience">
      <div className="workExp__container">
        <h2 className="workExp__heading section-title">
          {workExperienceData.sectionTitle}
        </h2>

        {visibleEntries.map((exp, index) => {
          const keyExpId: string = `exp-${index}`;
          return (
            <div className="workExp__entry section__timeentry" key={keyExpId}>
              <div className="workExp__time section__timeentry-time">
                <span className="workExp__rounder section__timeentry-rounder" />
                <span className="workExp__line section__timeentry-line" />
              </div>
              <div className="workExp__data">
                <div className="workExp__company">
                  <h3 className="workExp__main-role">{exp.mainRole}</h3>
                  <div className="workExp__company-info">
                    <div className="workExp__company-duration">
                      {exp.duration.showIcon && (
                        <span className="workExp__company-duration-icon">
                          {
                            WORK_EXPERIENCE_ICONS[
                              exp.duration
                                .icon as keyof typeof WORK_EXPERIENCE_ICONS
                            ]
                          }
                        </span>
                      )}
                      <span className="workExp__company-duration-date-range">
                        {getDateRangeFormattedIntl(
                          exp.duration.from,
                          exp.duration.to,
                          dateFormatOptions.monthYear,
                          appLocale
                        )}
                      </span>
                    </div>
                    <div className="workExp__company-separator"> | </div>
                    <div className="workExp__company-name-wrapper">
                      <span className="workExp__company-name workExp__company-name-current">
                        {exp.company}
                      </span>
                      {exp.companyOldName && (
                        <span className="workExp__company-name-old-wrapper">
                          (
                            <span className="workExp__company-name workExp__company-name-old">
                              {exp.companyOldName}
                            </span>
                          )
                        </span>
                      )}
                    </div>
                    <div
                      className="workExp__company-location"
                      style={{ display: 'none' }}
                    >
                      {exp.address.showIcon && (
                        <span className="workExp__company-location-icon">
                          {
                            WORK_EXPERIENCE_ICONS[
                              exp.address
                                .icon as keyof typeof WORK_EXPERIENCE_ICONS
                            ]
                          }
                        </span>
                      )}
                      <span className="workExp__company-location-place">
                        {exp.address.city}, {exp.address.country}
                      </span>
                    </div>
                  </div>
                </div>

                {exp.work.map((work, workIndex) => {
                  const keyExpWorkId: string = `exp-${index}-work-${workIndex}`;
                  return (
                    <div className="workExp__work-wrapper" key={keyExpWorkId}>
                      {work.showRole && work.role && (
                        <div className="workExp__work-info">
                          <p className="workExp__work-role">{work.role}</p>
                        </div>
                      )}
                      {work.showDescription && work.description && (
                        <ul className="workExp__work-desc">
                          {work.description.map((desc, descIndex) => {
                            const keyWorkDescId: string = `desc-${index}-${workIndex}-${descIndex}}`;
                            return (
                              <li
                                className="workExp__work-desc-entry"
                                key={keyWorkDescId}
                              >
                                {desc}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                      {work.projects &&
                        !work.projects.isHidden &&
                        work.projects.entries && (
                          <div className="workExp__work-projects">
                            {work.projects.title && (
                              <div className="workExp__work-projects-title">
                                {work.projects.title}
                              </div>
                            )}
                            <ul className="workExp__work-project-list">
                              {work.projects.entries.map(
                                (project, projectIndex) => {
                                  const keyWorkProjectId: string = `project-${project.name}-${projectIndex}`;
                                  return (
                                    <li
                                      className="workExp__work-project-entry"
                                      key={keyWorkProjectId}
                                    >
                                      <div className="workExp__work-project-name">
                                        {project.name}
                                      </div>
                                      <div className="workExp__work-project-technologies">
                                        <div
                                          className="workExp__work-project-technologies-label"
                                          title="Τεχνολογίες που χρησιμοποιήθηκαν"
                                        >
                                          {WORK_EXPERIENCE_ICONS.code}:{' '}
                                        </div>
                                        <div className="workExp__work-project-technologies-values">
                                          {project.technologies.join(', ')}
                                        </div>
                                      </div>
                                      {project.showResponsibilities && (
                                        <ul className="workExp__work-project-responsibilities">
                                          {project.responsibilities.map(
                                            (resp, respIndex) => {
                                              const keyWorkProjectResponsibilityId: string = `project-${project.name}-${projectIndex}-${respIndex}`;
                                              return (
                                                <li
                                                  className="workExp__work-project-responsibility"
                                                  key={
                                                    keyWorkProjectResponsibilityId
                                                  }
                                                >
                                                  {resp}
                                                </li>
                                              );
                                            }
                                          )}
                                        </ul>
                                      )}
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default React.memo(WorkExperience);
