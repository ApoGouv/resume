import { useState } from 'react';
import { getDateFormat } from '../../Utils/dates';
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
    <section className="workExp-section" id="workExperience">
      <div className="workExp__container">
        <h3 className="workExp__heading">Επαγγελματική Εμπειρία</h3>

        {workExpState.map((exp, index) => {
          const keyExpId: string = `exp-${index}`;
          return (
            <div className="experience" key={keyExpId}>
              <p className="company-name">{exp.company}</p>
              <div className="exp-info">
                <p className="exp-duration">
                  {getDateFormat(exp.duration.from, 'MMM, YYYY')}
                  {' - '}
                  {exp.duration.to === 'present'
                    ? 'Present'
                    : getDateFormat(exp.duration.to, 'MMM, YYYY')}
                </p>
                <p>{exp.location}</p>
              </div>

              {exp.work.map((work, workIndex) => {
                const keyExpWorkId: string = `exp-${index}-work-${workIndex}`;
                return (
                  <div className="work-wrapper" key={keyExpWorkId}>
                    <div className="work-info">
                      <p className="work-role">{work.role}</p>
                    </div>
                    {work.showDescription && work.description && (
                      <ul className="work-desc">
                        {work.description.map((desc, descIndex) => {
                          const keyWorkDescId: string = `desc-${index}-${workIndex}-${descIndex}}`;
                          return (
                            <li className="desc" key={keyWorkDescId}>
                              {desc}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    {work.projects && (
                      <div className="projects">
                        <ul className="project-list">
                          {work.projects.map((project, projectIndex) => {
                            const keyWorkProjectId: string = `project-${project.name}-${projectIndex}`;
                            return (
                              <li className="project" key={keyWorkProjectId}>
                                <div className="project-name">
                                  {project.name}
                                </div>
                                <div className="project-technologies">
                                  <div className="project-technologies-label">
                                    Technologies Used:{' '}
                                  </div>
                                  <div className="project-technologies-values">
                                    {project.technologies.join(', ')}
                                  </div>
                                </div>
                                {project.showResponsibilities && (
                                  <ul className="responsibilties">
                                    {project.responsibilities.map(
                                      (resp, respIndex) => {
                                        const keyWorkProjectResponsibilityId: string = `project-${project.name}-${projectIndex}-${respIndex}`;
                                        return (
                                          <li
                                            className="project-responsibility"
                                            key={keyWorkProjectResponsibilityId}
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
          );
        })}
      </div>
    </section>
  );
}

export default WorkExperience;
