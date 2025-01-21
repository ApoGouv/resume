import { replacePlaceholderWithYearDifference } from '../../Utils/dates';

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

  const getTitle = () => {
    return `${name} - ${occupation}`;
  };

  return (
    <>
      <title>{getTitle()}</title>
      <meta name="description" content={getDescription()} />
    </>
  );
}
