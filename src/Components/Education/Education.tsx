import React, { useMemo } from 'react';
import useLocale from '@/Hooks/useLocale';
import {
  getDateFormatIntl,
  getDateRangeFormattedIntl,
  dateFormatOptions,
} from '@/Utils/dates';
import '@/Components/Education/Education.css';

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
  educationData: EducationSectionType;
};

function Education({ educationData }: EducationProps) {
  const { appLocale } = useLocale();

  // Memoize the filtered entries to avoid recalculating them on every render
  const filteredEntries = useMemo(() => {
    return educationData.entries.filter((edu) => !edu.isHidden);
  }, [educationData.entries]);

  return (
    <section className="education__section" id="education">
      <h2 className="education__heading section-title">
        {educationData.sectionTitle}
      </h2>
      {filteredEntries.map((education, index) => {
        const keyEdu = `edu-${index}`;
        return (
          <div className="education__entry section__timeentry" key={keyEdu}>
            <div className="education__time section__timeentry-time">
              <span className="education__rounder section__timeentry-rounder" />
              <span className="education__line section__timeentry-line" />
            </div>
            <div className="education__data">
              <h3 className="education__degree">
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
                  <div className="education__score">[ {education.score} ]</div>
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

export default React.memo(Education);
