// eslint-disable-next-line import/no-extraneous-dependencies
import { Helmet } from 'react-helmet';

type Seo = {
  name: string;
  occupation: string;
  description: string;
};

export default function SEO({ name, occupation, description }: Seo) {
  return (
    <Helmet>
      <title>
        {name} - {occupation}
      </title>
      <meta name="description" content={description} />
    </Helmet>
  );
}
