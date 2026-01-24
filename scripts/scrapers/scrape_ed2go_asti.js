/**
 * scrape_ed2go_asti.js
 * 
 * PURPOSE:
 * Scrape course categories and information from ed2go.com/asti
 * for use in the new Distance Learning page
 * 
 * USAGE:
 *   cd scripts/scrapers
 *   node scrape_ed2go_asti.js
 * 
 * OUTPUT:
 *   - scraped_ed2go_data.json: Course categories and courses
 *   - ed2go_screenshot.png: Visual verification
 * 
 * Created: 2026-01-24
 */

const { chromium } = require('playwright');
const fs = require('fs');

const TARGET_URL = 'https://www.ed2go.com/asti/';

(async () => {
    console.log('='.repeat(60));
    console.log('Ed2Go ASTI Scraper');
    console.log('='.repeat(60));
    console.log(`Target: ${TARGET_URL}`);
    console.log('');

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
        // Navigate to the page
        console.log('Loading page...');
        await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 30000 });

        // Screenshot for verification
        await page.screenshot({ path: 'ed2go_screenshot.png', fullPage: true });
        console.log('Screenshot saved: ed2go_screenshot.png');

        // Extract page title and intro
        const pageTitle = await page.title();
        console.log(`Page Title: ${pageTitle}`);

        // Extract main content
        const data = await page.evaluate(() => {
            const result = {
                title: document.title,
                url: window.location.href,
                partnerName: '',
                partnerDescription: '',
                categories: [],
                featuredCourses: [],
                allCourses: []
            };

            // Look for partner name/branding
            const partnerHeader = document.querySelector('.partner-name, .partner-header, h1');
            if (partnerHeader) {
                result.partnerName = partnerHeader.innerText.trim();
            }

            // Look for partner description
            const intro = document.querySelector('.partner-intro, .school-intro, .description, .about-section');
            if (intro) {
                result.partnerDescription = intro.innerText.trim();
            }

            // Extract course categories
            const categoryElements = document.querySelectorAll('.category, .course-category, [class*="category"], .subject-area');
            categoryElements.forEach(cat => {
                const name = cat.querySelector('h2, h3, .category-name, .title');
                const courses = [];

                cat.querySelectorAll('.course, .course-card, [class*="course"]').forEach(course => {
                    const title = course.querySelector('.course-title, h3, h4, .title, a');
                    const desc = course.querySelector('.description, .course-desc, p');
                    const price = course.querySelector('.price, .course-price, [class*="price"]');
                    const duration = course.querySelector('.duration, .hours, [class*="duration"]');

                    if (title) {
                        courses.push({
                            title: title.innerText.trim(),
                            description: desc ? desc.innerText.trim() : '',
                            price: price ? price.innerText.trim() : '',
                            duration: duration ? duration.innerText.trim() : ''
                        });
                    }
                });

                if (name && courses.length > 0) {
                    result.categories.push({
                        name: name.innerText.trim(),
                        courses: courses
                    });
                }
            });

            // Extract all links that look like courses
            const courseLinks = document.querySelectorAll('a[href*="/course/"], a[href*="online-courses"]');
            courseLinks.forEach(link => {
                if (link.innerText.trim()) {
                    result.allCourses.push({
                        title: link.innerText.trim(),
                        href: link.href
                    });
                }
            });

            // Try to get categories from navigation/sidebar
            const navCategories = document.querySelectorAll('nav a, .sidebar a, .categories-list a');
            const seenCategories = new Set();
            navCategories.forEach(link => {
                const text = link.innerText.trim();
                if (text && !seenCategories.has(text) && text.length > 2 && text.length < 50) {
                    seenCategories.add(text);
                }
            });
            result.navigationCategories = Array.from(seenCategories);

            // Get all text content for analysis
            const mainContent = document.querySelector('main, .main-content, #content, body');
            if (mainContent) {
                result.rawTextSample = mainContent.innerText.substring(0, 3000);
            }

            return result;
        });

        // Write data to file
        fs.writeFileSync('scraped_ed2go_data.json', JSON.stringify(data, null, 2));
        console.log('Data saved: scraped_ed2go_data.json');

        // Print summary
        console.log('');
        console.log('='.repeat(60));
        console.log('EXTRACTION SUMMARY');
        console.log('='.repeat(60));
        console.log(`Partner Name: ${data.partnerName || '(not found)'}`);
        console.log(`Categories Found: ${data.categories.length}`);
        console.log(`All Course Links: ${data.allCourses.length}`);
        console.log(`Nav Categories: ${data.navigationCategories.length}`);

        if (data.categories.length > 0) {
            console.log('\nCategories:');
            data.categories.forEach(cat => {
                console.log(`  - ${cat.name}: ${cat.courses.length} courses`);
            });
        }

        if (data.rawTextSample) {
            console.log('\nRaw Text Sample (first 500 chars):');
            console.log(data.rawTextSample.substring(0, 500));
        }

    } catch (error) {
        console.error('Error:', error.message);

        // Try to get page content even on error
        try {
            const html = await page.content();
            fs.writeFileSync('ed2go_page_source.html', html);
            console.log('Page source saved: ed2go_page_source.html');
        } catch (e) {
            console.error('Could not save page source:', e.message);
        }
    } finally {
        await browser.close();
    }

    console.log('');
    console.log('Done!');
})();
