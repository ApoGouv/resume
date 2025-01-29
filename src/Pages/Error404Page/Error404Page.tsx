import { useNavigate } from 'react-router-dom';
import { EN_LOCALE, EL_LOCALE, APP_BASE_URL } from '@/constants';
import { normalizeUrl } from '@/Utils/strings';
import { RESUME_NOT_FOUND_ICONS } from '@/Utils/iconsLibrary';
import './Error404Page.css';

type Error404PageProps = {
  locale: string;
  dark: boolean;
};

// Define type for localized strings
type Localized404Strings = {
  [key: string]: {
    errorMessage: string;
    title: string;
    desc: string;
    link2resume: string;
  };
};

function Error404Page({ locale, dark }: Error404PageProps) {
  const navigate = useNavigate();

  // Define dictionary for localized strings
  const localized404Strings: Localized404Strings = {
    [EN_LOCALE]: {
      errorMessage: 'Resume Not Found',
      title: 'Oops! How did you get here?',
      desc: 'Let me help you...',
      link2resume: 'Check out my Resume',
    },
    [EL_LOCALE]: {
      errorMessage: 'Το βιογραφικό δεν βρέθηκε',
      title: 'Ωχ! Πώς βρέθηκες εδώ;',
      desc: 'Κάτσε να σε βοηθήσω...',
      link2resume: 'Δες το βιογραφικό μου',
    },
  };

  const handleViewResumeButtonClick = () => {
    if (locale === EN_LOCALE) {
      navigate(`/en`);
    } else {
      navigate(`/`);
    }
  };

  const backgroundImageUrl = normalizeUrl(
    `${APP_BASE_URL}/img/404/CV-blured-${locale}.jpg`
  );

  return (
    <main
      className={`error-404-container ${
        dark ? 'error-in-the-dark' : 'error-in-the-sun'
      }`}
      id="error-404-container"
    >
      <div
        className="error-404-bg"
        id="error-404-bg"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `contain`,
          backgroundPosition: `center`,
        }}
      />
      <div className="error-404" id="error-404">
        <div className="error-404-error">
          <div className="error-404-error-code">
            <span className="error-404-code-4">4</span>
            <span className="error-404-code-0">0</span>
            <span className="error-404-code-4">4</span>
          </div>
          <div className="error-404-error-message">
            {localized404Strings[locale].errorMessage}
          </div>
        </div>
        <div className="error-404-content">
          <h1 className="error-404-title">
            {localized404Strings[locale].title}
          </h1>
          <div className="error-404-desc">
            {localized404Strings[locale].desc}
          </div>
          <div className="error-404-link2resume">
            <button
              type="button"
              className="btn-view_resume"
              onClick={handleViewResumeButtonClick}
            >
              <span className="btn-icon-wrapper">
                {RESUME_NOT_FOUND_ICONS.fileBack}
                {RESUME_NOT_FOUND_ICONS.fileFront}
                {RESUME_NOT_FOUND_ICONS.filePage}
              </span>
              <span className="btn-text">
                {localized404Strings[locale].link2resume}
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Error404Page;
