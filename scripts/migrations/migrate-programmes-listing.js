/**
 * migrate-programmes-listing.js
 * 
 * PURPOSE:
 * Updates duration field in programmes.ts (listing file) to match ground truth.
 * This is separate from programme-details.ts migration.
 * 
 * USAGE:
 *   node scripts/migrations/migrate-programmes-listing.js
 * 
 * Created: 2026-01-24
 */

const fs = require('fs');
const path = require('path');

// =============================================================================
// GROUND TRUTH DURATIONS (from Programme Price List.md)
// =============================================================================
const LEVEL_DURATIONS = {
    'introduction': '6 weeks',
    'certificate': '15 weeks',
    'diploma': '9 months',
};

const SOURCE_FILE = path.join(__dirname, '../../src/constants/programmes.ts');
const OUTPUT_FILE = path.join(__dirname, '../../src/constants/programmes.ts.migrated');
const REPORT_FILE = path.join(__dirname, 'migration-listing-report.json');

function main() {
    console.log('='.repeat(60));
    console.log('Programme Listing Duration Migration');
    console.log('='.repeat(60));
    console.log('');

    if (!fs.existsSync(SOURCE_FILE)) {
        console.error(`ERROR: Source file not found: ${SOURCE_FILE}`);
        process.exit(1);
    }

    let content = fs.readFileSync(SOURCE_FILE, 'utf-8');
    console.log(`Read ${content.length} characters from source file`);

    const report = {
        timestamp: new Date().toISOString(),
        sourceFile: SOURCE_FILE,
        changes: [],
        summary: { total: 0, updated: 0, unchanged: 0 }
    };

    // Match pattern: level: 'xxx',\n...\nduration: 'xxx',
    // Need to find each programme block and update duration based on level

    // Strategy: Find each object in the PROGRAMMES array
    const programmeRegex = /\{\s*id:\s*['"]([^'"]+)['"][^}]*level:\s*['"]([^'"]+)['"][^}]*duration:\s*['"]([^'"]+)['"][^}]*\}/gs;

    let updatedContent = content;
    let match;

    while ((match = programmeRegex.exec(content)) !== null) {
        const fullMatch = match[0];
        const id = match[1];
        const level = match[2];
        const currentDuration = match[3];

        report.summary.total++;

        const expectedDuration = LEVEL_DURATIONS[level];

        if (!expectedDuration) {
            console.log(`Unknown level: ${level} for ${id}`);
            continue;
        }

        if (currentDuration !== expectedDuration) {
            // Replace duration in this block
            const updatedBlock = fullMatch.replace(
                new RegExp(`duration:\\s*['"]${currentDuration.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`),
                `duration: '${expectedDuration}'`
            );

            updatedContent = updatedContent.replace(fullMatch, updatedBlock);

            report.changes.push({
                id,
                level,
                before: currentDuration,
                after: expectedDuration
            });

            report.summary.updated++;
        } else {
            report.summary.unchanged++;
        }
    }

    // Write outputs
    fs.writeFileSync(OUTPUT_FILE, updatedContent);
    console.log(`\nWrote migrated file to: ${OUTPUT_FILE}`);

    fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
    console.log(`Wrote migration report to: ${REPORT_FILE}`);

    // Print summary
    console.log('');
    console.log('='.repeat(60));
    console.log('SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total programmes: ${report.summary.total}`);
    console.log(`Updated: ${report.summary.updated}`);
    console.log(`Unchanged: ${report.summary.unchanged}`);

    // Show sample changes
    if (report.changes.length > 0) {
        console.log('\nSample changes:');
        report.changes.slice(0, 5).forEach(c => {
            console.log(`  ${c.id}: "${c.before}" → "${c.after}"`);
        });
    }

    console.log('');
    console.log('NEXT: Review and apply with:');
    console.log('  copy src\\constants\\programmes.ts.migrated src\\constants\\programmes.ts');
    console.log('');
}

main();
