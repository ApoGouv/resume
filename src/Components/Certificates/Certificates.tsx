import { useState } from 'react';
import { getDateFormat } from '../../Utils/dates';
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
  certificatesDetails: CertificateDetailsType[];
};

type CertificatesProps = {
  data: CertificatesType;
};

function Certificates({ data }: CertificatesProps) {
  const [certificatesState] = useState(data);

  return (
    <section className="certificates__section">
      <h2 className="certificates__heading">Πιστοποιητικά</h2>
      {certificatesState.certificatesDetails
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
                  <div className="certificate__org">{certificate.org}</div>
                  <div className="certificate__issued-on">
                    {getDateFormat(
                      certificate.valid.from,
                      certificate.valid.showCurrent ? 'YYYY' : 'MMM, YYYY'
                    )}
                    {certificate.valid.showCurrent && (
                      <>
                        {' - '}
                        {getDateFormat(new Date().toLocaleDateString(), 'YYYY')}
                      </>
                    )}
                  </div>
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
                                {getDateFormat(
                                  subCert.issuedOn,
                                  'MMM DD, YYYY'
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
