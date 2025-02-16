import React, { useMemo } from 'react';
import useExpandedView from '@/Hooks/useExpandedView';
import { printUrl } from '@/Utils/strings';
import { HIDE_UNLESS_EXPANDED, TECHNOLOGY_DISPLAY_LIMIT, EL_LOCALE} from '@/constants';
import '@/Components/Projects/Projects.css';
import useLocale from '@/Hooks/useLocale';

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
  const { expandedView } = useExpandedView();
  const { appLocale } = useLocale();

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

      <div className="projects__grid">
        {filteredProjects.map((project, index) => {
          const keyProject = `project-${index}`;

          // Apply the limit only if not in expanded view
          const displayedTechnologies = expandedView
            ? project.technologies
            : project.technologies.slice(0, TECHNOLOGY_DISPLAY_LIMIT);

          return (
            <div className="project__entry" key={keyProject}>
              <div className="project__content">
                <h3 className="project__name">{project.name}</h3>
                <ul className="project__technologies">
                  {displayedTechnologies.map((tech, techIndex) => (
                    <li key={`tech-${techIndex}`} className="project__tech-item">{tech}</li>
                  ))}
                  {!expandedView && project.technologies.length > TECHNOLOGY_DISPLAY_LIMIT && (
                    <li
                      className="project__tech-item project__tech-item-more"
                      title={project.technologies.slice(TECHNOLOGY_DISPLAY_LIMIT).join(', ')}
                    >
                      { appLocale == EL_LOCALE ? 'κ.ά.' : '+more'}
                    </li>
                  )}
                </ul>

                {project.showDesc && (
                  <ul className={`project__desc ${HIDE_UNLESS_EXPANDED}`}>
                    {project.desc.map((desc, descIndex) => (
                      <li key={`desc-${descIndex}`} className="project__desc-entry">{desc}</li>
                    ))}
                  </ul>
                )}

                {project.link && (
                  <div className="project__link">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" title={project.name}>
                      {printUrl(project.link)}
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default React.memo(Projects);
