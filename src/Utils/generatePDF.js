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
  console.log(
    '👉 saveCurrentPageToPDF > extractFullNameAndLocaleFromTitle running...'
  );
  let fullName = '';
  let locale = '';

  const title = await page.title();
  console.log('👉 saveCurrentPageToPDF > CV title: ', title);

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
  console.log(
    '👉 saveCurrentPageToPDF > extractFullNameAndLocaleFromResume running...'
  );
  const resumeLocator = await page.getByTestId('rs-resume');

  if (!resumeLocator) {
    throw new Error('Resume element not found on the page.');
  }

  const name = await resumeLocator.getAttribute('data-rs-locale');
  const locale = await resumeLocator.getAttribute('data-rs-name');

  if (!name || !locale) {
    throw new Error('Full name or locale not found in the resume element.');
  }

  const fullName = name.replace(/\s+/g, '-');

  return { fullName, locale };
}

async function extractFullNameAndLocale(page) {
  try {
    return await extractFullNameAndLocaleFromResume(page);
  } catch (error) {
    console.error('Error extracting data from resume:', error);
    console.log('Falling back to extracting data from title...');
    return await extractFullNameAndLocaleFromTitle(page);
  }
}

async function getCvFileName(page) {
  console.log('👉 saveCurrentPageToPDF > getCvFileName running...');
  // rs-resume
  let cvFileName = 'Απόστολος-Γουβάλας-Βιογραφικό';

  // Destructure the fullName and locale from the extractedData.
  const { fullName, locale } = await extractFullNameAndLocale(page);

  console.log('👉 saveCurrentPageToPDF > extracted fullName:', fullName);
  console.log('👉 saveCurrentPageToPDF > extracted locale:', locale);

  if (fullName) {
    if (locale === 'el-GR' || locale === '') {
      cvFileName = `${fullName}-Βιογραφικό`;
    } else {
      cvFileName = `${fullName}-CV`;
    }
  }

  return cvFileName;
}

async function saveCurrentPageToPDF(page) {
  if (!page) {
    return false;
  }
  // Change the CSS media type to screen.
  await page.emulateMedia({ media: 'screen' });

  const cvFileName = await getCvFileName(page);

  const screenshotFilePath = `./public/img/${cvFileName}.png`;

  // Take a screenshot of current page.
  // @todo 👉 Check menu visibility on screenshots. In greek is visible! In english not!
  await page.screenshot({
    path: screenshotFilePath,
    fullPage: true,
  });

  console.log(
    '👉 saveCurrentPageToPDF > took screenshot of it and saved at: ',
    screenshotFilePath
  );

  // Change the CSS media type to print.
  await page.emulateMedia({ media: 'print' });

  const pdfFilePath = `./public/pdf/${cvFileName}.pdf`;

  // Save print version to pdf.
  await page.pdf({
    path: pdfFilePath,
    format: 'A4',
  });

  console.log(
    '👉 saveCurrentPageToPDF > convert it to pdf and saved at: ',
    pdfFilePath
  );

  // Change the CSS media type to screen.
  await page.emulateMedia({ media: 'screen' });

  return true;
}

(async () => {
  console.log(' 🏁 saveCurrentPageToPDF > running');

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
  // /!\ This is not working because element is not visible.
  // await page.getByTestId('rs-menu-toggle-locale').click();
  // await page.getByTestId('rs-menu-toggle-locale').dispatchEvent('click');

  // @see https://playwright.dev/docs/api/class-elementhandle
  // /!\ This is not working because element is not visible.
  // const menuHandle = await page.$('#menu');
  // await menuHandle.$eval(
  //   '[data-testid="rs-menu-toggle-locale"]',
  //   (node) => node.click
  // );

  // @see https://playwright.dev/docs/api/class-page#page-eval-on-selector
  // This method does not wait for the element to pass actionability checks.
  // Thus is working.
  await page.$eval('[data-testid="rs-menu-toggle-locale"]', (localeBtnEl) =>
    localeBtnEl.click()
  );

  // Since we changed locale, save current page to pdf.
  await saveCurrentPageToPDF(page);

  // Close the browser
  await browser.close();
})();
