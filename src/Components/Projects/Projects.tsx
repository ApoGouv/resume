import React, { useMemo } from 'react';
import { printUrl } from '@/Utils/strings';
import { HIDE_UNLESS_EXPANDED } from '@/constants';
import '@/Components/Projects/Projects.css';

type ProjectType = {
  isHidden: boolean;
  name: string;
  technologies: string[];
  showDesc: boolean;
  desc: string[];
  link: string | null;
};

type ProjectsType = {
  isHidden: boolean;
  sectionTitle: string;
  entries: ProjectType[];
};

export type ProjectsProps = {
  projectsData: ProjectsType;
};

function Projects({ projectsData }: ProjectsProps) {
  const filteredProjects = useMemo(() => {
    if (projectsData.isHidden) {
      return [];
    }
    return projectsData.entries.filter(project => !project.isHidden);
  }, [projectsData.isHidden, projectsData.entries]);

  // Return null if no filtered projects
  if (!filteredProjects.length) return null;

  return (
    <section className="projects__section" id="projects">
      <h2 className="projects__heading section-title">{projectsData.sectionTitle}</h2>
      {filteredProjects.map((project, index) => {
          const keyProject = `project-${index}`;
          return (
            <div className="project__entry section__timeentry" key={keyProject}>
              <div className="project__time section__timeentry-time">
                <span className="project__rounder section__timeentry-rounder" />
                <span className="project__line section__timeentry-line" />
              </div>
              <div className="project__data">
                <h3 className="project__name">{project.name}</h3>
                <div className="project__technologies">
                  <p className="project__tech-list">
                    {project.technologies.join(' | ')}
                  </p>
                </div>
                {project.showDesc && (
                  <ul className={`project__desc ${HIDE_UNLESS_EXPANDED}`}>
                    {project.desc.map((desc, descIndex) => (
                      <li key={`desc-${descIndex}`} className="project__desc-entry">{desc}</li>
                    ))}
                  </ul>
                )}
                {project.link && (
                  <div className="project__link">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {printUrl(project.link)}
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </section>
  );
}

export default React.memo(Projects);
