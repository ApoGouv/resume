// generatePDF.js
/**
 * In order to run this:
 * 1. from root folder run: `npm run dev`
 * 2. then run: `node ./src/Utils/generatePDF.js`
 *
 * This will generate the CV images and PDFs in the
 * `/public/img` and `/public/pdf` respectively.
 */

import { chromium, selectors } from 'playwright';

async function extractFullNameAndLocaleFromTitle(page) {
  console.log(' 🚀 extractFullNameAndLocaleFromTitle > running...');
  let fullName = '';
  let locale = '';

  const title = await page.title();
  console.log('    👉 extractFullNameAndLocaleFromTitle > CV title: ', title);

  if (title) {
    const parts = title.split(' - ');
    fullName = parts[0].replace(/\s+/g, '-');

    // Regular expression to check for Greek characters
    const greekRegex = /[Α-ω]/;

    // Check if the name contains any Greek characters
    const isGreek = greekRegex.test(fullName);
    locale = isGreek ? 'el-GR' : 'en-US';
  }

  return { fullName, locale };
}

async function extractFullNameAndLocaleFromResume(page) {
  console.log(' 🚀 extractFullNameAndLocaleFromResume > running...');
  const resumeLocator = await page.getByTestId('rs-resume');

  if (!resumeLocator) {
    throw new Error('Resume element not found on the page.');
  }

  const locale = await resumeLocator.getAttribute('data-rs-locale');
  const name = await resumeLocator.getAttribute('data-rs-name');
  const fullName = name.trim().replace(/\s+/g, '-');

  if (!fullName || !locale) {
    throw new Error('Full name or locale not found in the resume element.');
  }

  return { fullName, locale };
}

async function extractFullNameAndLocale(page) {
  console.log(' 🚀 extractFullNameAndLocale > running...');
  try {
    return await extractFullNameAndLocaleFromResume(page);
  } catch (error) {
    console.error('Error extracting data from resume:', error);
    console.log('Falling back to extracting data from title...');
    return await extractFullNameAndLocaleFromTitle(page);
  }
}

async function getCvFileName(page) {
  console.log(' 🚀 getCvFileName > running...');

  // Default file name
  let cvFileName = 'Απόστολος-Γουβάλας-Βιογραφικό';

  try {
    // Validate input
    if (!page || typeof page !== 'object') {
      throw new Error('Invalid page object provided.');
    }

    // Extract fullName and locale
    const { fullName, locale } = await extractFullNameAndLocale(page);

    console.log('    👉 getCvFileName > extracted fullName:', fullName);
    console.log('    👉 getCvFileName > extracted locale:', locale);

    // Determine file name based on locale and fullName
    cvFileName = fullName
      ? `${fullName}-${locale === 'en-US' ? 'CV' : 'Βιογραφικό'}`
      : cvFileName;

    return cvFileName;
  } catch (error) {
    console.error(
      ' ⚠️ getCvFileName > Error occurred in getCvFileName:',
      error.message
    );
    // Handle error gracefully, by returning  the default file name as fallback
    return cvFileName;
  }
}

async function saveCurrentPageToPDF(page) {
  console.log(' 🚀 saveCurrentPageToPDF > running...');
  if (!page) {
    return false;
  }
  // Change the CSS media type to screen.
  await page.emulateMedia({ media: 'screen' });

  const cvFileName = await getCvFileName(page);

  const screenshotFilePath = `./public/img/${cvFileName}.png`;

  // Get menu, so we can mask it during screenshot.
  await page.$eval('[data-rs-id="rs-menu"]', (menuEl) => {
    menuEl.style.display = 'none';
  });

  // const rsMenuMaskLocator = await page.getByTestId('rs-menu');

  // Take a screenshot of current page.
  // @see 👉 https://playwright.dev/docs/api/class-locator#locator-screenshot
  await page.screenshot({
    path: screenshotFilePath,
    type: 'png',
    fullPage: true,
    // mask: [rsMenuMaskLocator],
    // maskColor: '#f2f4f8',
  });

  console.log(
    '    👉 saveCurrentPageToPDF > took screenshot of it and saved at: ',
    screenshotFilePath
  );

  // Pdf file name and save colored version
  const pdfFilePath = `./public/pdf/${cvFileName}.pdf`;

  // Remove top and bottom margins in order to fit resume in one pdf page.
  await page.addStyleTag({ content: '#resume-container{margin: 0px auto;}' });

  // Save colored version to pdf.
  // @see https://playwright.dev/docs/api/class-page#page-pdf
  await page.pdf({
    path: pdfFilePath,
    format: 'A4',
    pageRanges: '1',
    printBackground: true, // Print background graphics. Defaults to false.
    /**
     * preferCSSPageSize boolean (optional):
     * Give any CSS @page size declared in the page priority over what is
     * declared in width and height or format options. Defaults to false,
     * which will scale the content to fit the paper size.
     */
    // preferCSSPageSize: true,
  });

  console.log(
    '    👉 saveCurrentPageToPDF > convert it to pdf and saved at: ',
    pdfFilePath
  );

  // Change the CSS media type to print.
  await page.emulateMedia({ media: 'print' });

  // Pdf file name and save print (monochrome) version
  const pdfFilePathMono = `./public/pdf/${cvFileName}-print.pdf`;

  // Save print version to pdf.
  await page.pdf({
    path: pdfFilePathMono,
    format: 'A4',
  });

  console.log(
    '    👉 saveCurrentPageToPDF > convert it to Print pdf and saved at: ',
    pdfFilePathMono
  );

  // Change the CSS media type to screen.
  await page.emulateMedia({ media: 'screen' });

  return true;
}

(async () => {
  console.log(' 🏁 generatePDF > running...');

  // Defines custom attribute name to be used in page.getByTestId(testId). data-testid is used by default.
  selectors.setTestIdAttribute('data-rs-id');

  const browser = await chromium.launch();

  const page = await browser.newPage();

  // Navigate to your resume page
  await page.goto('http://localhost:5173');

  const methodsTimeout = 3000; // ms = 3 sec.
  page.setDefaultTimeout(methodsTimeout);

  // Save current page to pdf.
  await saveCurrentPageToPDF(page);

  // Change locale by clicking the relative menu btn.
  const menuLocator = page.getByTestId('rs-menu-toggle-locale');
  if (menuLocator) {
    // @see https://playwright.dev/docs/api/class-locator#locator-dispatch-event
    await menuLocator.dispatchEvent('click');
  } else {
    // @see https://playwright.dev/docs/api/class-page#page-eval-on-selector
    // This method does not wait for the element to pass actionability checks.
    // Thus is working.
    await page.$eval('[data-rs-id="rs-menu-toggle-locale"]', (localeBtnEl) =>
      localeBtnEl.click()
    );
  }

  // Since we changed locale, save current page to pdf.
  await saveCurrentPageToPDF(page);

  // Close the browser
  await browser.close();

  console.log('🎆🎆🎆🎆 Finished 🎆🎆🎆🎆');
})();
