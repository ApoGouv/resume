import { useState } from 'react';
import { getDateFormat, getDateRangeFormatted } from '../../Utils/dates';
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

type EducationProps = {
  data: EducationType[];
};

function Education({ data }: EducationProps) {
  const [educationState] = useState(data);

  return (
    <section className="education__section">
      <h3 className="education__heading">ΕΚΠΑΙΔΕΥΣΗ</h3>
      {educationState
        .filter((edu) => !edu.isHidden)
        .map((education, index) => {
          const keyEdu = `edu-${index}`;
          return (
            <div className="education__entry" key={keyEdu}>
              <div className="education__basic-info">
                <div className="education__type">
                  {education.degree || education.type}
                </div>
                <div className="education__period">
                  {education.isGraduation ? (
                    <>
                      {getDateRangeFormatted(
                        education.duration.from,
                        education.duration?.to ?? null
                      )}
                    </>
                  ) : (
                    getDateFormat(education.duration.from, 'YYYY')
                  )}
                </div>
              </div>
              <div className="education__name-and-score">
                <div className="education__name">{education.school}</div>
                {education.score && (
                  <div className="education__score">[ {education.score} ]</div>
                )}
              </div>
            </div>
          );
        })}
    </section>
  );
}

export default Education;
