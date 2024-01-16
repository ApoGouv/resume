import { useState } from 'react';
import { getDateRangeFormatted } from '../../Utils/dates';
import { WORK_EXPERIENCE_ICONS } from '../../Utils/iconsLibrary';
import './WorkExperience.css';

type DurationType = {
  from: string;
  to: string;
};

type ProjectType = {
  name: string;
  technologies: string[];
  responsibilities: string[];
  showResponsibilities: boolean;
};

type WorkType = {
  role: string;
  projects?: ProjectType[];
  description?: string[];
  showDescription?: boolean;
};

type ExperienceType = {
  isHidden: boolean;
  company: string;
  duration: DurationType;
  location: string;
  work: WorkType[];
};

type WorkExperienceProps = {
  data: ExperienceType[];
};

function WorkExperience({ data }: WorkExperienceProps) {
  const [workExpState] = useState<ExperienceType[]>(data);

  return (
    <section className="workExp__section" id="workExperience">
      <div className="workExp__container">
        <h2 className="workExp__heading">ΕΠΑΓΓΕΛΜΑΤΙΚΗ ΕΜΠΕΙΡΙΑ</h2>

        {workExpState
          .filter((exp) => !exp.isHidden)
          .map((exp, index) => {
            const keyExpId: string = `exp-${index}`;
            return (
              <div className="workExp__entry" key={keyExpId}>
                <div className="workExp__time">
                  <span className="workExp__rounder" />
                  <span className="workExp__line" />
                </div>
                <div className="workExp__data">
                  <h3 className="workExp__company-name">{exp.company}</h3>
                  <div className="workExp__company-info">
                    <p className="workExp__company-duration">
                      {getDateRangeFormatted(
                        exp.duration.from,
                        exp.duration.to,
                        'MMM, YYYY'
                      )}
                    </p>
                    <p className="workExp__company-location">{exp.location}</p>
                  </div>

                  {exp.work.map((work, workIndex) => {
                    const keyExpWorkId: string = `exp-${index}-work-${workIndex}`;
                    return (
                      <div className="workExp__work-wrapper" key={keyExpWorkId}>
                        <div className="workExp__work-info">
                          <p className="workExp__work-role">{work.role}</p>
                        </div>
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
                        {work.projects && (
                          <div className="workExp__work-projects">
                            <ul className="workExp__work-project-list">
                              {work.projects.map((project, projectIndex) => {
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
                                      <ul className="workExp__work-project-responsibilties">
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
                              })}
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

export default WorkExperience;
