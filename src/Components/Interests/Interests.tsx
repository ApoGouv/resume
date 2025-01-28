import { useMemo } from 'react';
import { HIDE_UNLESS_EXPANDED } from '@/constants';
import '@/Components/Interests/Interests.css';

type InterestEntryType = {
  name: string;
  icon: string;
  isHidden: boolean;
};

type InterestsType = {
  isHidden: boolean;
  sectionTitle: string;
  entries: InterestEntryType[];
};

export type InterestsProps = {
  interestsData: InterestsType;
};

function Interests({ interestsData }: InterestsProps) {
  const filteredInterests = useMemo(() => {
    if (interestsData.isHidden) {
      return [];
    }
    return interestsData.entries.filter(interest => !interest.isHidden);
  }, [interestsData.isHidden, interestsData.entries]);

  // Return null if no filtered interests
  if (!filteredInterests.length) return null;

  return (
    <section className={`interests__section ${HIDE_UNLESS_EXPANDED}`} id="interests">
      <h2 className="interests__heading section-title">
        {interestsData.sectionTitle}
      </h2>
      <ul className="interests__entries">
        {filteredInterests.map((interest, index) => {
            return (
              <li key={`interest-${index}`} className="interests__entry">
                {interest.name}
              </li>
            );
          })}
      </ul>
    </section>
  );
}

export default Interests;
