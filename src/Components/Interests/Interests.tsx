import { useState, useEffect } from 'react';
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
  data: InterestsType;
};

function Interests({ data }: InterestsProps) {
  const [interestsState, setInterestsState] = useState(data);

  useEffect(() => {
    setInterestsState({ ...data });
  }, [data]);

  const interestsNamesString = interestsState.entries
    .map((interest) => interest.name)
    .join(', ');

  return (
    <section className="interests__section" id="interests">
      <h2 className="interests__heading section-title">
        {interestsState.sectionTitle}
      </h2>
      <div className="interests__entries">{interestsNamesString}</div>
    </section>
  );
}

export default Interests;
