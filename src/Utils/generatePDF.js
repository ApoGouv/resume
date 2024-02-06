// generatePDF.js
/**
 * In order to run this:
 * 1. from root folder run: `npm run dev`
 * 2. then run: `node ./src/Utils/generatePDF.js`
 *
 * This will generate the CV images and PDFs in the
 * `/public/img` and `/public/pdf` respectively.
 */

import { chromium } from 'playwright';

async function saveCurrentPageToPDF(page) {
  if (!page) {
    return false;
  }
  // Change the CSS media type to screen.
  await page.emulateMedia({ media: 'screen' });

  const title = await page.title();

  console.log('saveCurrentPageToPDF > title: ', title);

  let cvFileName = 'Apostolos-Gouvalas-CV';

  if (title) {
    const parts = title.split(' - ');
    const fullName = parts[0].replace(/\s+/g, '-');

    // Regular expression to check for Greek characters
    const greekRegex = /[Α-ω]/;

    // Check if the name contains any Greek characters
    const isGreek = greekRegex.test(fullName);
    if (isGreek) {
      cvFileName = `${fullName}-Βιογραφικό`;
    } else {
      cvFileName = `${fullName}-CV`;
    }
  }

  // Take a screenshot of current page.
  await page.screenshot({
    path: `./public/img/${cvFileName}.png`,
    fullPage: true,
  });

  // Change the CSS media type to print.
  await page.emulateMedia({ media: 'print' });

  // Save print version to pdf.
  await page.pdf({
    path: `./public/pdf/${cvFileName}.pdf`,
    format: 'A4',
  });

  // Change the CSS media type to screen.
  await page.emulateMedia({ media: 'screen' });

  return true;
}

(async () => {
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
  // page.getByTestId('rs-menu-toggle-locale').dispatchEvent('click');

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
