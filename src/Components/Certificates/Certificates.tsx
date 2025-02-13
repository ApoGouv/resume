import React, { useMemo } from 'react';
import '@/Components/Certificates/Certificates.css';
import ParentCertificate from '@/Components/Certificates/ParentCertificate';
import CertificateWithSubs from '@/Components/Certificates/CertificateWithSubs';

export type ValidityType = {
  from: string;
  to: string | null;
  showCurrent?: boolean;
};

export type SubCertificatesType = {
  isHidden: boolean;
  name: string;
  link: string;
  linkTitle?: string;
  issuedOn: string;
};

// Determines what to display
export type displayTypeTypes = 'subsOnly' | 'parentOnly' | 'both';

export type CertificateDetailsType = {
  isHidden: boolean;
  org: string;
  name: string;
  valid: ValidityType;
  showLink: boolean;
  link: string | null;
  displayType: displayTypeTypes; 
  subs: SubCertificatesType[];
};

export type CertificatesType = {
  isHidden: boolean;
  sectionTitle: string;
  entries: CertificateDetailsType[];
};

export type CertificatesProps = {
  certificatesData: CertificatesType;
};

function Certificates({ certificatesData }: CertificatesProps) {
  // Memoize the certificate entries to prevent unnecessary re-rendering
  const filteredCertificates = useMemo(
    () => certificatesData.entries.filter((cert) => !cert.isHidden),
    [certificatesData.entries]
  );

  return (
    <section className="certificates__section" id="certificates">
      <h2 className="certificates__heading section-title">
        {certificatesData.sectionTitle}
      </h2>
      {filteredCertificates.map((certificate, index) => {
        const keyCert = `cert-${index}`;
        return (
          <div className="certificate__entry section__timeentry" key={keyCert}>
            <div className="certificate__time section__timeentry-time">
              <span className="certificate__rounder section__timeentry-rounder" />
              <span className="certificate__line section__timeentry-line" />
            </div>
            <div className="certificate__data">
              {/* Render ParentCertificate if required */}
              {(certificate.displayType === 'parentOnly' ||
                certificate.displayType === 'both') && (
                <ParentCertificate certificate={certificate} />
              )}

              {/* Render CertificateWithSubs if required */}
              {(certificate.displayType === 'subsOnly' ||
                certificate.displayType === 'both') && (
                <CertificateWithSubs subs={certificate.subs} index={index} />
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default React.memo(Certificates);
