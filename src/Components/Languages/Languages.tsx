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
  // Guard to avoid rendering unnecessary markup.
  if (languagesData.isHidden) return null;

  return (
    <section className="languages__section" id="languages">
      <h2 className="languages__heading section-title">
        {languagesData.sectionTitle}
      </h2>
      <ul className="languages__list">
        {languagesData.entries
          .filter((lang) => !lang.isHidden)
          .map((language, index) => {
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
