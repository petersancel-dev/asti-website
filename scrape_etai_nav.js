
const { chromium } = require('playwright');
const fs = require('fs');

// We need to find these specific certs:
// BFI, BFT, DCI, FOI, FOT, FOD, OTS, FSS
const TARGET_CERTS = [
  'Broadband Fiber Installer',
  'Broadband Fiber Technician',
  'Data Cabling Installer',
  'Fiber Optics Installer',
  'Fiber Optics Technician',
  'Fiber Optics Designer',
  'OTDR Testing Specialist', // OTS might be listed differently
  'Fiber Splicing Specialist' // FSS
];

(async () => {
  const browser = await chromium.launch({ headless: false }); // Visible for debugging as per skill
  const page = await browser.newPage();
  
  console.log('Navigating to ETAI Certifications...');
  // Based on standard nav, guessing the main cert list page
  await page.goto('https://www.etai.org/certifications', { waitUntil: 'domcontentloaded' });
  
  // Wait for some content
  await page.waitForTimeout(2000);

  // Extract all links
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a'))
      .map(a => ({ text: a.innerText.trim(), href: a.href }))
      .filter(a => a.text.length > 0 && a.href.includes('etai.org')); // Filter empty
  });

  const matches = [];
  
  console.log(`Found ${links.length} links. Filtering for targets...`);

  for (const target of TARGET_CERTS) {
    // Fuzzy match logic
    const match = links.find(l => l.text.toLowerCase().includes(target.toLowerCase()));
    if (match) {
        console.log(`✅ Found: ${target} -> ${match.href}`);
        matches.push({ id: target, url: match.href });
    } else {
        console.log(`❌ Missing: ${target}`);
    }
  }

  // Save findings
  fs.writeFileSync('c:/Users/Owner/OneDrive/Documents/JoelP/asti-website/etai_urls.json', JSON.stringify(matches, null, 2));
  console.log('Saved matches to etai_urls.json');

  await browser.close();
})();
