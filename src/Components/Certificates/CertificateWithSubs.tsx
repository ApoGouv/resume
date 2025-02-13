import React, { useMemo } from 'react';
import useLocale from '@/Hooks/useLocale';
import { getDateFormatIntl, dateFormatOptions } from '@/Utils/dates';
import { SubCertificatesType } from '@/Components/Certificates/Certificates';

type CertificateWithSubsProps = {
  subs: SubCertificatesType[];
  index: number;
};

function CertificateWithSubs({ subs, index }: CertificateWithSubsProps) {
  const { appLocale } = useLocale();

  // Memoize the filtered and mapped subs to avoid unnecessary recalculation on re-renders
  const filteredSubs = useMemo(() => {
    return subs.filter((subCert) => !subCert.isHidden);
  }, [subs]);

  return (
    <ul className="certificate__sub-certificates">
      {filteredSubs.map((subCert, subIndex) => (
        <li
          className="certificate__sub-cert"
          key={`cert-${index}-sub-${subIndex}`}
        >
          <div className="certificate__sub-cert-info">
            {subCert.link ? (
              <div className="certificate__sub-cert-name certificate__sub-cert-link">
                <a
                  href={subCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={subCert.linkTitle || subCert.name}
                >
                  {subCert.name}
                </a>
              </div>
            ) : (
              <div className="certificate__sub-cert-name">{subCert.name}</div>
            )}
            <div className="certificate__sub-cert-issued-on">
              {getDateFormatIntl(
                subCert.issuedOn,
                dateFormatOptions.dayMonthYear,
                appLocale
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default React.memo(CertificateWithSubs);
