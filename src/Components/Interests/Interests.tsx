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
  if (interestsData.isHidden) return null;

  const filteredInterests = useMemo(
    () => interestsData.entries.filter(interest => !interest.isHidden),
    [interestsData.entries]
  );

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
