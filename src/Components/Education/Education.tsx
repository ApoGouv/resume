import { useState, useEffect } from 'react';
import useLocale from '../../Hooks/useLocale';
import {
  getDateFormatIntl,
  getDateRangeFormattedIntl,
  dateFormatOptions,
} from '../../Utils/dates';
import './Education.css';

type DurationType = {
  from: string;
  to?: string;
};

type EducationType = {
  type: string;
  degree: string;
  school: string;
  score: string | null;
  isHidden: boolean;
  duration: DurationType;
  isGraduation: boolean;
};

type EducationSectionType = {
  sectionTitle: string;
  isHidden: boolean;
  entries: EducationType[];
};

export type EducationProps = {
  data: EducationSectionType;
};

function Education({ data }: EducationProps) {
  const [educationState, setEducationState] = useState(data);

  useEffect(() => {
    setEducationState(data);
  }, [data]);

  const { appLocale } = useLocale();

  return (
    <section className="education__section" id="education">
      <h2 className="education__heading section-title">
        {educationState.sectionTitle}
      </h2>
      {educationState.entries
        .filter((edu) => !edu.isHidden)
        .map((education, index) => {
          const keyEdu = `edu-${index}`;
          return (
            <div className="education__entry section__timeentry" key={keyEdu}>
              <div className="education__time section__timeentry-time">
                <span className="education__rounder section__timeentry-rounder" />
                <span className="education__line section__timeentry-line" />
              </div>
              <div className="education__data">
                <h3 className="education__type">
                  {education.degree || education.type}
                </h3>
                <div className="education__basic-info">
                  <div className="education__period">
                    {education.isGraduation ? (
                      <>
                        {getDateRangeFormattedIntl(
                          education.duration.from,
                          education.duration?.to ?? null,
                          dateFormatOptions.year
                        )}
                      </>
                    ) : (
                      getDateFormatIntl(
                        education.duration.from,
                        dateFormatOptions.year,
                        appLocale
                      )
                    )}
                  </div>
                  {education.score && (
                    <div className="education__score">
                      [ {education.score} ]
                    </div>
                  )}
                </div>
                <div className="education__school-info">
                  <div className="education__name">{education.school}</div>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
}

export default Education;
