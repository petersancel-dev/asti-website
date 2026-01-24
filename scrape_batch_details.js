const { chromium } = require('playwright');
const fs = require('fs');

const TARGET_URL = 'https://www.etai.org/specialty_certifications.html';

const CERTS = [
    {
        id: 'etai-avfa',
        search: 'Audio Video Forensics Analyst (AVFA)',
        anchorId: 'AVFA'
    },
    {
        id: 'etai-avn',
        search: 'Avionics Technician (AVN)',
        anchorId: 'AVN'
    },
    {
        id: 'etai-dve',
        search: 'Digital Video Editor (DVE)',
        anchorId: 'DVE'
    },
    {
        id: 'etai-rfid',
        search: 'Radio Frequency Identification Technician (RFID)',
        anchorId: 'RFID'
    }
];

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    console.log(`Navigating to ${TARGET_URL}...`);
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    const results = [];

    for (const cert of CERTS) {
        console.log(`Scraping ${cert.id}...`);

        const data = await page.evaluate(({ search, id, anchorId }) => {
            // Find the header or anchor
            let container;
            if (anchorId) {
                const anchor = document.getElementById(anchorId);
                if (anchor) {
                    container = anchor.closest('.panel');
                }
            }

            // Fallback to searching text if anchor approach fails
            if (!container) {
                const headers = Array.from(document.querySelectorAll('h3.panel-title'));
                const header = headers.find(h => h.innerText.includes(search));
                if (header) {
                    container = header.closest('.panel');
                }
            }

            if (!container) {
                return {
                    id,
                    title: search,
                    description: 'Description not found on page.',
                    competencies: []
                };
            }

            // Extract title
            const titleEl = container.querySelector('.panel-title');
            const title = titleEl ? titleEl.innerText.trim() : search;

            // Extract content from panel-body
            const body = container.querySelector('.panel-body');
            let description = '';
            let competencies = [];

            if (body) {
                // Get paragraphs for description
                const paragraphs = body.querySelectorAll('p');
                paragraphs.forEach(p => {
                    // Filter out boilerplate text if possible, e.g. "Additional Information" is usually in a separate div or headlines
                    // The HTML structure shows <div class="headline"><h4>Additional Information</h4></div>
                    // We want text before that if possible.
                    // Let's just grab all 'p' text that doesn't look like footer info
                    const text = p.innerText.trim();
                    if (text && !text.startsWith('*') && !text.includes('allows one free retake')) {
                        description += text + ' ';
                    }
                });

                // Get bullets if any (rare on this page structure, but BIET description lists topics)
                // BIET description is one long paragraph with topics. 
                // We might want to split that paragraph for competencies if no UL exists.
            }

            // For structured data like Price, Duration etc, we look for the sibling column
            // The structure is col-md-8 (description) + col-md-4 (info table)
            // We need to find the "row" parent, then find the col-md-4 sibling
            let price = 0;
            let duration = '40 Hours'; // Default fallback

            const row = container.closest('.row');
            if (row) {
                const infoPanel = row.querySelector('.col-md-4 .panel');
                if (infoPanel) {
                    const table = infoPanel.querySelector('table');
                    if (table) {
                        const rows = table.querySelectorAll('tr');
                        rows.forEach(tr => {
                            const cells = tr.querySelectorAll('td');
                            if (cells.length === 2) {
                                const key = cells[0].innerText.toLowerCase();
                                const val = cells[1].innerText.trim();
                                if (key.includes('price')) {
                                    const match = val.match(/\$?(\d+)/);
                                    if (match) price = parseInt(match[1]);
                                }
                                // ETAI usually doesn't show duration in hours in this table, 
                                // it shows 'Time Allowed to Test' which is exam duration.
                                // We'll stick to our standard estimation if not found.
                            }
                        });
                    }
                }
            }

            return {
                id,
                title,
                description: description.trim(),
                competencies,
                price
            };
        }, cert);

        results.push(data);
    }

    fs.writeFileSync('scraped_batch_data.json', JSON.stringify(results, null, 2));
    console.log('Done! Saved to scraped_batch_data.json');
    await browser.close();
})();
