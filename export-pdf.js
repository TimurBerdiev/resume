const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const browser = await puppeteer.launch({
    headless: true,
    ...(fs.existsSync(chromePath) ? { executablePath: chromePath } : {})
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:4000/pdf.html', { waitUntil: 'networkidle0' });
  await page.pdf({
    path: 'resume.pdf',
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: false,
    margin: { top: '12mm', right: '12mm', bottom: '12mm', left: '12mm' }
  });
  await browser.close();
  console.log('resume.pdf generated');
})();
