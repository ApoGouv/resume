import React, { useMemo } from 'react';
import useLocale from '@/Hooks/useLocale';
import { getDateFormatIntl, dateFormatOptions } from '@/Utils/dates';
import { printUrl } from '@/Utils/strings';
import { CertificateDetailsType } from '@/Components/Certificates/Certificates';

type ParentCertificateProps = {
  certificate: CertificateDetailsType;
};

function ParentCertificate({ certificate }: ParentCertificateProps) {
  const { appLocale } = useLocale();

  // Memoize formatted dates to avoid recalculating on every render
  const issuedOn = useMemo(() => {
    return getDateFormatIntl(
      certificate.valid.from,
      certificate.valid.showCurrent
        ? dateFormatOptions.year
        : dateFormatOptions.monthYear,
      appLocale
    );
  }, [certificate.valid.from, certificate.valid.showCurrent, appLocale]);

  const currentDate = useMemo(() => {
    if (certificate.valid.showCurrent) {
      return getDateFormatIntl(
        new Date().toLocaleDateString(),
        dateFormatOptions.year,
        appLocale
      );
    }
    return null;
  }, [certificate.valid.showCurrent, appLocale]);

  const linkUrl = useMemo(() => {
    return certificate.link ? printUrl(certificate.link) : null;
  }, [certificate.link]);

  return (
    <>
      <h3 className="certificate__name">{certificate.name}</h3>
      <div className="certificate__basic-info">
        <p className="certificate__issued-on">
          {issuedOn}
          {certificate.valid.showCurrent && currentDate && (
            <>
              {' - '}
              {currentDate}
            </>
          )}
        </p>
        <p className="certificate__info-separator"> | </p>
        <p className="certificate__org">{certificate.org}</p>
      </div>
      {certificate.link && certificate.showLink && (
        <div className="certificate__link">
          [
          <a href={certificate.link} target="_blank" rel="noopener noreferrer">
            &nbsp;{linkUrl}&nbsp;
          </a>
          ]
        </div>
      )}
    </>
  );
}

export default React.memo(ParentCertificate);
