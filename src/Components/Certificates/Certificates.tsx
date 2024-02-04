import { useState, useEffect } from 'react';
import useLocale from '../../Utils/useLocale';
import { getDateFormatIntl, dateFormatOptions } from '../../Utils/dates';
import { printUrl } from '../../Utils/strings';
import './Certificates.css';

type ValidityType = {
  from: string;
  to: string | null;
  showCurrent?: boolean;
};

type SubCertificatesType = {
  isHidden: boolean;
  name: string;
  link: string;
  issuedOn: string;
};

type CertificateDetailsType = {
  isHidden: boolean;
  org: string;
  name: string;
  valid: ValidityType;
  showLink: boolean;
  link: string | null;
  containsSub: boolean;
  shouldShowSubs: boolean;
  subs: SubCertificatesType[]; // Updated type for subs
};

type CertificatesType = {
  isHidden: boolean;
  sectionTitle: string;
  entries: CertificateDetailsType[];
};

type CertificatesProps = {
  data: CertificatesType;
};

function Certificates({ data }: CertificatesProps) {
  const [certificatesState, setCertificatesState] = useState(data);

  useEffect(() => {
    setCertificatesState(data);
  }, [data]);

  const { appLocale } = useLocale();

  return (
    <section className="certificates__section" id="certificates">
      <h2 className="certificates__heading section-title">
        {certificatesState.sectionTitle}
      </h2>
      {certificatesState.entries
        .filter((cert) => !cert.isHidden)
        .map((certificate, index) => {
          const keyCert = `cert-${index}`;
          return (
            <div className="certificate__entry" key={keyCert}>
              <div className="certificate__time">
                <span className="certificate__rounder" />
                <span className="certificate__line" />
              </div>
              <div className="certificate__data">
                <h3 className="certificate__name">{certificate.name}</h3>
                <div className="certificate__basic-info">
                  <p className="certificate__issued-on">
                    {getDateFormatIntl(
                      certificate.valid.from,
                      certificate.valid.showCurrent
                        ? dateFormatOptions.year
                        : dateFormatOptions.monthYear,
                      appLocale
                    )}
                    {certificate.valid.showCurrent && (
                      <>
                        {' - '}
                        {getDateFormatIntl(
                          new Date().toLocaleDateString(),
                          dateFormatOptions.year,
                          appLocale
                        )}
                      </>
                    )}
                  </p>
                  <p className="certificate__info-separator"> | </p>
                  <p className="certificate__org">{certificate.org}</p>
                </div>
                {certificate.link && certificate.showLink && (
                  <div className="certificate__link">
                    [
                    <a
                      href={certificate.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      &nbsp;{printUrl(certificate.link)}&nbsp;
                    </a>
                    ]
                  </div>
                )}
                {certificate.containsSub && certificate.shouldShowSubs && (
                  <ul className="certificate__sub-certificates">
                    {certificate.subs
                      .filter((subCert) => !subCert.isHidden)
                      .map((subCert, subIndex) => {
                        const keySubCert = `cert-${index}-sub-${subIndex}`;
                        return (
                          <li
                            className="certificate__sub-cert"
                            key={keySubCert}
                          >
                            <div className="certificate__sub-cert-info">
                              {subCert.link && (
                                <div className="certificate__sub-cert-name certificate__sub-cert-link">
                                  <a
                                    href={subCert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {subCert.name}
                                  </a>
                                </div>
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
                        );
                      })}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
    </section>
  );
}

export default Certificates;
