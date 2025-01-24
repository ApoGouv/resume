import { useState, useEffect } from 'react';
import '@/Components/Languages/Languages.css';

type LanguageEntryType = {
  language: string;
  rating: number;
  info: string;
};

type LanguagesType = {
  isHidden: boolean;
  sectionTitle: string;
  entries: LanguageEntryType[];
};

export type LanguagesProp = {
  data: LanguagesType;
};

function Languages({ data }: LanguagesProp) {
  const [languagesState, setLanguagesState] = useState(data);

  useEffect(() => {
    setLanguagesState({ ...data });
  }, [data]);

  return (
    <section className="languages__section" id="languages">
      <h2 className="languages__heading section-title">
        {languagesState.sectionTitle}
      </h2>
      <ul className="languages__list">
        {languagesState.entries.map((language, index) => {
          const keyLangId: string = `lang-${index}`;
          return (
            <li
              className="languages__list-item languages__entry"
              key={keyLangId}
            >
              <div className="languages__entry-detail">
                <div className="languages__entry-name">{language.language}</div>
                <div className="languages__entry-info">[{language.info}]</div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Languages;
