import { useState, useEffect, useCallback } from 'react';
import jsPDF from 'jspdf';
import type { ProfileProps } from '@/Components/Profile/Profile';
import { getDateFormatIntl, dateFormatOptions } from '@/Utils/dates';

import { DEFAULT_TEMPLATE } from '@/Pages/LetterDraftPage/templates/defaultTemplate';
import { FRONTEND_TEMPLATE } from '@/Pages/LetterDraftPage/templates/frontendTemplate';
import { BACKEND_TEMPLATE } from '@/Pages/LetterDraftPage/templates/backendTemplate';

import '@/Pages/LetterDraftPage/LetterDraftPage.css';

const templates = [
  { id: 'default', name: 'Default', content: DEFAULT_TEMPLATE },
  { id: 'frontend', name: 'Frontend Developer', content: FRONTEND_TEMPLATE },
  { id: 'backend', name: 'Backend Developer', content: BACKEND_TEMPLATE },
  { id: 'custom', name: 'Custom Template', content: '' },
];

function LetterDraftPage({ profile }: ProfileProps) {
  const [jobTitle, setJobTitle] = useState('');
  const [jobCompanyName, setJobCompanyName] = useState('');
  const [jobHiringManagerName, setJobHiringManagerName] = useState('');
  const [coverText, setCoverText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('default');
  const [coverLetter, setCoverLetter] = useState(DEFAULT_TEMPLATE);
  const [customTemplate, setCustomTemplate] = useState('');

  const myInfo = {
    name: profile.name || '### My Name Here ###',
    email:
      profile.contact?.find((contact) => contact.type === 'email')?.value ||
      '### My Email Here ###',
    phone:
      profile.contact?.find((contact) => contact.type === 'phone')?.value ||
      '### My Phone Here ###',
  };

  const todayDate = getDateFormatIntl(
    new Date().toLocaleDateString(),
    dateFormatOptions.dayMonthYear,
    'en-US'
  );

  const generateCoverLetter = useCallback(() => {
    let template =
      selectedTemplate === 'custom'
        ? customTemplate
        : templates.find((t) => t.id === selectedTemplate)?.content || '';

    // Replace all occurrences of placeholders dynamically
    const replacements: Record<string, string> = {
      '{JOB_TITLE}': jobTitle || '### Job Title Here ###',
      '{JOB_COMPANY}': jobCompanyName || '### Job Company Here ###',
      '{JOB_HM}': jobHiringManagerName || 'Hiring Manager',
      '{NAME}': myInfo.name,
      '{EMAIL}': myInfo.email,
      '{PHONE}': myInfo.phone,
      '{DATE}': todayDate,
      '{COVER}': coverText,
    };

    let newCoverLetter = template;
    Object.entries(replacements).forEach(([key, value]) => {
      newCoverLetter = newCoverLetter.replaceAll(key, value);
    });

    setCoverLetter(newCoverLetter);
  }, [
    selectedTemplate,
    jobTitle,
    jobCompanyName,
    jobHiringManagerName,
    coverText,
    myInfo,
    todayDate,
  ]);

  useEffect(() => {
    generateCoverLetter();
  }, [selectedTemplate, jobTitle, jobCompanyName, jobHiringManagerName, coverText, myInfo, todayDate, generateCoverLetter]);


  // Function to handle typing in the cover letter textarea
  const handleCoverLetterChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCoverLetter(e.target.value);
  };

  const handleCustomTemplateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomTemplate(e.target.value);
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
      <h2>LetterDrafter</h2>

      <div className="form-container">
        <div className="input-fields">
          <label>Template:</label>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>

          {selectedTemplate === 'custom' && (
            <>
              <label>Custom Template:</label>
              <textarea
                value={customTemplate}
                onChange={handleCustomTemplateChange}
                rows={10}
              />
            </>
          )}

          <label>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />

          <label>Company Name:</label>
          <input
            type="text"
            value={jobCompanyName}
            onChange={(e) => setJobCompanyName(e.target.value)}
          />

          <label>Hiring Manager Name:</label>
          <input
            type="text"
            value={jobHiringManagerName}
            onChange={(e) => setJobHiringManagerName(e.target.value)}
          />

          <label>Cover text:</label>
          <textarea
            value={coverText}
            onChange={(e) => setCoverText(e.target.value)}
            rows={6}
          />

        </div>

        <div className="generated-letter">
          <h3>Generated Letter Draft:</h3>
          <textarea
            value={coverLetter}
            onChange={handleCoverLetterChange}
            rows={10}
          />

          <div className="buttons-container">
            <button onClick={() => navigator.clipboard.writeText(coverLetter)}>
              Copy to Clipboard
            </button>
            <button onClick={downloadPDF}>Download as PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LetterDraftPage;
