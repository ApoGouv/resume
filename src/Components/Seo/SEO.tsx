import { replacePlaceholderWithYearDifference } from '@/Utils/dates';

type Seo = {
  name: string;
  occupation: string;
  description: string;
  expStartDate: string;
  locale: string;
};

export default function SEO({
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
      false,
      locale
    );
  };

  return (
    <>
      <title>{`${name} - ${occupation}`}</title>
      <meta name="description" content={getDescription()} />
    </>
  );
}
