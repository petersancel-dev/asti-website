
const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    console.log('Navigating to ETAI Specialty Page...');
    // Target the likely Specialty page based on naming convention
    const TARGET_URL = 'https://www.etai.org/specialty_certifications.html';
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });

    // Wait longer
    await page.waitForTimeout(5000);

    // Take screenshot
    await page.screenshot({ path: 'c:/Users/Owner/OneDrive/Documents/JoelP/asti-website/debug_specialty.png', fullPage: true });
    console.log('📸 Screenshot saved to debug_specialty.png');

    // Dump HTML to check structure
    const content = await page.content();
    fs.writeFileSync('c:/Users/Owner/OneDrive/Documents/JoelP/asti-website/debug_etai.html', content);

    // Extract all links
    const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a'))
            .map(a => ({ text: a.innerText.trim(), href: a.href }))
            .filter(a => a.href.includes('etai.org'));
    });

    console.log(`Found ${links.length} total links.`);
    fs.writeFileSync('c:/Users/Owner/OneDrive/Documents/JoelP/asti-website/debug_links.json', JSON.stringify(links, null, 2));

    await browser.close();
})();
