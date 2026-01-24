
const { chromium } = require('playwright');
const fs = require('fs');

const TARGET_URL = 'https://www.etai.org/fiber_cabling.html';

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    console.log(`Navigating to ${TARGET_URL}...`);
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000); // Give it time to settle

    const EXPECTED_IDS = [
        { id: 'BFI', search: 'Broadband Fiber Installer' },
        { id: 'BFT', search: 'Broadband Fiber Technician' },
        { id: 'DCI', search: 'Data Cabling Installer' },
        { id: 'FOI', search: 'Fiber Optics Installer' },
        { id: 'FOT', search: 'Fiber Optics Technician' },
        { id: 'FOD', search: 'Fiber Optics Designer' },
        { id: 'OTS', search: 'OTDR Testing Specialist' }, // Sometimes 'OSP' or similar, search full text
        { id: 'FSS', search: 'Fiber Splicing Specialist' }
    ];

    const scrapedData = [];

    for (const cert of EXPECTED_IDS) {
        console.log(`Scraping ${cert.id} (${cert.search})...`);

        const details = await page.evaluate(({ search, id }) => {
            const clean = (text) => text ? text.replace(/\s+/g, ' ').trim() : '';

            // Strategy: Find the header containing the text
            const elements = Array.from(document.querySelectorAll('h3, h4, strong, p.header'));
            const header = elements.find(el => el.innerText.includes(search));

            if (!header) return null;

            // The description is usually in the immediate next sibling texts, often separated by <br> or in <p>
            let container = header.parentElement;

            // If header is inside a transform block or something, go up
            if (container.tagName === 'A' || container.tagName === 'STRONG') container = container.parentElement;

            let description = '';
            let competencies = [];

            // Scan siblings after the header
            let next = header.nextElementSibling;
            let limit = 0;

            while (next && limit < 15) {
                const text = next.innerText || '';

                // Stop at next header
                if (next.tagName.match(/^H[1-6]$/) && next.innerText.length > 5) break;

                if (next.tagName === 'P') {
                    description += clean(text) + ' ';
                }
                if (next.tagName === 'UL') {
                    // Competencies
                    next.querySelectorAll('li').forEach(li => {
                        const txt = clean(li.innerText);
                        if (txt.length > 3) competencies.push(txt);
                    });
                }
                // Some lists are just <br> separated text in a div
                if (next.tagName === 'DIV' && text.includes('•')) {
                    text.split('\n').forEach(line => {
                        if (line.includes('•')) competencies.push(clean(line.replace(/•/g, '')));
                    });
                }

                next = next.nextElementSibling;
                limit++;
            }

            // Fallback: if description is empty, maybe it's text nodes inside parent
            if (!description && !competencies.length) {
                description = "Click 'View Details' on official site for full info."; // Safe fallback
            }

            return {
                id,
                title: clean(header.innerText),
                description: description.trim(),
                competencies
            };
        }, cert);

        if (details) {
            console.log(`✅  Found: ${details.title}`);
            scrapedData.push(details);
        } else {
            console.log(`❌  Not found: ${cert.search}`);
            // Add skeleton so we don't break the build, mark for manual
            scrapedData.push({
                id: cert.id,
                title: cert.search,
                description: "Detailed description available on official ETAI website.",
                competencies: []
            });
        }
    }

    fs.writeFileSync('c:/Users/Owner/OneDrive/Documents/JoelP/asti-website/scraped_fiber_data_v2.json', JSON.stringify(scrapedData, null, 2));
    console.log('Saved to scraped_fiber_data_v2.json');

    await browser.close();
})();
