import { Helmet } from 'react-helmet-async';
import { replacePlaceholderWithYearDifference } from '../../Utils/dates';

type Seo = {
  lang: string;
  name: string;
  occupation: string;
  description: string;
  expStartDate: string;
  locale: string;
};

export default function SEO({
  lang,
  name,
  occupation,
  description,
  expStartDate,
  locale,
}: Seo) {
  const getDescription = () => {
    return replacePlaceholderWithYearDifference(
      description,
      expStartDate,
      locale
    );
  };

  return (
    <Helmet>
      <html lang={lang} />
      <title>
        {name} - {occupation}
      </title>
      <meta name="description" content={getDescription()} />
    </Helmet>
  );
}
