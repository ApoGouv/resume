import { useState } from 'react';
import './Interests.css';

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

type InterestsProps = {
  data: InterestsType;
};

function Interests({ data }: InterestsProps) {
  const [interestsState] = useState(data);

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
