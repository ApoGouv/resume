import { useMemo } from 'react';
import '@/Components/Languages/Languages.css';

type LanguageEntryType = {
  isHidden: boolean;
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
  languagesData: LanguagesType;
};

function Languages({ languagesData }: LanguagesProp) {
  const filteredLanguages = useMemo(() => {
    if (languagesData.isHidden) {
      return [];
    }
    return languagesData.entries.filter(lang => !lang.isHidden);
  }, [languagesData.isHidden, languagesData.entries]);

  // Return null if no filtered languages
  if (!filteredLanguages.length) return null;

  return (
    <section className="languages__section" id="languages">
      <h2 className="languages__heading section-title">
        {languagesData.sectionTitle}
      </h2>
      <ul className="languages__list">
        {filteredLanguages.map((language, index) => {
          return (
            <li
              className="languages__list-item languages__entry"
              key={`lang-${language.language}-${index}`}
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
