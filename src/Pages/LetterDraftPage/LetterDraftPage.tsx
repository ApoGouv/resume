import { useState } from 'react';
import jsPDF from 'jspdf';
import { getDateFormatIntl, dateFormatOptions } from '@/Utils/dates';

import '@/Pages/LetterDraftPage/LetterDraftPage.css';

const DEFAULT_TEMPLATE = `[My Name]
[My Email] | [My Phone]
[Date]

Subject: Application for Junior [Job Title] Position @[Job Company]

Dear [Hiring Manager],

My name is [My Name], and I am a web developer with experience in PHP, SQL, and JavaScript. 

[Job Why]

I would love the opportunity to discuss further for this role in an interview and learn more about your team and projects.

Thank you for your time, and I hope to speak with you soon.

Best regards,

[My Name]`;

function LetterDraftPage() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobCompanyName, setJobCompanyName] = useState('');
  const [jobHiringManagerName, setJobHiringManagerName] = useState('');
  const [coverLetter, setCoverLetter] = useState(DEFAULT_TEMPLATE);

  const myInfo = {
    'name': 'Apostolos Gouvalas',
    'email': 'apo.gouv@gmail.com',
    'phone': '+30 6978 811 469',
  };

  const todayDate = getDateFormatIntl(
    new Date().toLocaleDateString(),
    dateFormatOptions.dayMonthYear,
    'en-US'
  );

  const generateCoverLetter = () => {
    const newCoverLetter = DEFAULT_TEMPLATE
      .replace('[Job Title]', jobTitle || '### Job Title Here ###')
      .replace('[Job Company]', jobCompanyName || '### Job Comapy Here ###')
      .replace('[My Name]', myInfo.name) // Placeholder for user name
      .replace('[My Email]', myInfo.email) // Placeholder for email
      .replace('[My Phone]', myInfo.phone) // Placeholder for phone number
      .replace('[Date]', todayDate) // Insert current date
      .replace('[Hiring Manager]', jobHiringManagerName || 'Hiring Manager'); // Placeholder for hiring manager

    setCoverLetter(newCoverLetter);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(12);
    doc.text(coverLetter, 10, 10, { maxWidth: 180 });
    doc.save('Cover_Letter.pdf');
  };

  return (
    <div className="cover-letter-generator">
      <h2>Cover Letter Generator</h2>

      <div className="form-container">
        <div className="input-fields">
          <label>Job Title:</label>
          <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />

          <label>Company Name:</label>
          <input type="text" value={jobCompanyName} onChange={(e) => setJobCompanyName(e.target.value)} />
          
          <label>Hiring Manager Name:</label>
          <input type="text" value={jobHiringManagerName} onChange={(e) => setJobHiringManagerName(e.target.value)} />

          <button onClick={generateCoverLetter}>Generate Cover Letter</button>
        </div>

        <div className="generated-letter">
          <h3>Generated Cover Letter:</h3>
          <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} rows={10} />

          <div className="buttons-container">
            <button onClick={() => navigator.clipboard.writeText(coverLetter)}>Copy to Clipboard</button>
            <button onClick={downloadPDF}>Download as PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LetterDraftPage;
