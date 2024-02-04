// eslint-disable-next-line import/no-extraneous-dependencies
import { Helmet } from 'react-helmet-async';

type Seo = {
  lang: string;
  name: string;
  occupation: string;
  description: string;
};

export default function SEO({ lang, name, occupation, description }: Seo) {
  return (
    <Helmet>
      <html lang={lang} />
      <title>
        {name} - {occupation}
      </title>
      <meta name="description" content={description} />
    </Helmet>
  );
}
