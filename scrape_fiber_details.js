
const { chromium } = require('playwright');
const fs = require('fs');

const TARGET_URL = 'https://www.etai.org/fiber_cabling.html';

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    console.log(`Navigating to ${TARGET_URL}...`);
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });

    // Wait for accordions/content to be ready
    await page.waitForTimeout(2000);

    // ETAI site often uses accordions or anchor links. 
    // We need to extract data for each cert.
    // Based on standard ETAI layout, certs usually have an ID (e.g. #BFI) and a section.

    // List of expected anchors/IDs from our plan
    const EXPECTED_IDS = ['BFI', 'BFT', 'DCI', 'FOI', 'FOT', 'FOD', 'OTS', 'FSS'];

    const scrapedData = [];

    for (const id of EXPECTED_IDS) {
        console.log(`Scraping #${id}...`);

        // Check if element exists
        const elementExists = await page.evaluate((selector) => {
            return !!document.querySelector(selector) || !!document.querySelector(`a[name="${selector}"]`);
        }, id);

        if (!elementExists) {
            console.log(`⚠️  Element #${id} not found immediately. Searching text...`);
            // Fallback: finding header with text
        }

        // Extract details. Structure varies, so we generalize.
        // We try to grab the header and the following paragraph/list.
        const details = await page.evaluate((targetId) => {
            // Helper to clean text
            const clean = (text) => text ? text.replace(/\s+/g, ' ').trim() : '';

            // Try to find the section by anchor name or ID
            let anchor = document.querySelector(`a[name="${targetId}"]`) || document.getElementById(targetId);

            if (!anchor) {
                // Try searching h3/h4 with text match if ID fails
                const headers = Array.from(document.querySelectorAll('h3, h4, strong'));
                anchor = headers.find(h => h.innerText.includes(targetId));
            }

            if (!anchor) return null;

            // The content is usually in the parent or following siblings
            let container = anchor.parentElement;

            // Grab title
            const title = clean(container.innerText).split('\n')[0];

            // Grab description (next P or text node)
            let description = '';
            let next = container.nextElementSibling;
            let limit = 0;

            // Walk siblings to find description and competencies
            const competencies = [];

            while (next && limit < 10) {
                if (next.tagName === 'P') {
                    description += clean(next.innerText) + ' ';
                }
                if (next.tagName === 'UL') {
                    // Competencies often in UL
                    next.querySelectorAll('li').forEach(li => competencies.push(clean(li.innerText)));
                }
                // Stop if we hit the next header or huge gap
                if (next.tagName === 'H3' || next.tagName === 'HR') break;

                next = next.nextElementSibling;
                limit++;
            }

            return {
                id: targetId,
                title,
                description: description.trim(),
                competencies
            };
        }, id);

        if (details) {
            console.log(`✅  Scraped: ${details.title}`);
            scrapedData.push(details);
        } else {
            console.log(`❌  Failed to scrape content for ${id}`);
        }
    }

    fs.writeFileSync('c:/Users/Owner/OneDrive/Documents/JoelP/asti-website/scraped_fiber_data.json', JSON.stringify(scrapedData, null, 2));
    console.log('Saved to scraped_fiber_data.json');

    await browser.close();
})();
