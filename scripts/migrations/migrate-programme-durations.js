/**
 * migrate-programme-durations.js
 * 
 * PURPOSE:
 * Automatically updates programme durations in programme-details.ts to match
 * the ground truth document (Contex/Programme Price List.md)
 * 
 * USAGE:
 *   node scripts/migrations/migrate-programme-durations.js
 * 
 * OUTPUT:
 *   - migration-report.json: Detailed log of all changes made
 *   - Logs summary to console
 * 
 * SAFETY:
 *   - Does NOT overwrite the original file automatically
 *   - Writes changes to programme-details.ts.migrated
 *   - Review the migrated file before manually replacing
 * 
 * Created: 2026-01-24
 */

const fs = require('fs');
const path = require('path');

// =============================================================================
// GROUND TRUTH: Standard durations by level (from Programme Price List.md)
// =============================================================================
const ASTI_LEVEL_DURATIONS = {
    'introductory': '6 weeks',
    'certificate': '15 weeks',
    'advanced-certificate': '3 months',
    'diploma': '9 months',
    'advanced-diploma': '1 year',
    'associates-degree': '2 years',
    'bachelors-degree': '3 years',
    'post-graduate-award': '1 year',
    'post-graduate-diploma': '1 year',
    'masters': '2 years',
};

// EduQual durations are not standardized the same way - they vary by programme
// These are generally shorter, skill-focused courses
const EDUQUAL_LEVEL_DURATIONS = {
    'eduqual-award': '20 hours',      // Level 2 - typically 5-6 credits
    'eduqual-certificate': '30 hours', // Level 3 - typically 22-30 credits
    'eduqual-diploma': '45 hours',     // Level 4 - typically 44-56 credits
};

// Combined lookup
const LEVEL_DURATIONS = {
    ...ASTI_LEVEL_DURATIONS,
    ...EDUQUAL_LEVEL_DURATIONS,
};

// =============================================================================
// MAIN SCRIPT
// =============================================================================

const SOURCE_FILE = path.join(__dirname, '../../src/constants/programme-details.ts');
const OUTPUT_FILE = path.join(__dirname, '../../src/constants/programme-details.ts.migrated');
const REPORT_FILE = path.join(__dirname, 'migration-report.json');

function main() {
    console.log('='.repeat(60));
    console.log('Programme Duration Migration Script');
    console.log('='.repeat(60));
    console.log('');

    // Read source file
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
        summary: {
            totalProgrammes: 0,
            durationsUpdated: 0,
            durationsUnchanged: 0,
            unknownLevels: [],
        }
    };

    // Regex to find programme entries with level and duration
    // This matches the pattern:  level: 'xxx',  ...  duration: 'xxx',
    const programmeBlockRegex = /(['"][\w-]+['"]\s*:\s*\{[\s\S]*?level:\s*['"])([\w-]+)(['"][\s\S]*?duration:\s*['"])([^'"]+)(['"])/g;

    let match;
    let updatedContent = content;

    while ((match = programmeBlockRegex.exec(content)) !== null) {
        const fullMatch = match[0];
        const level = match[2];
        const currentDuration = match[4];

        report.summary.totalProgrammes++;

        const expectedDuration = LEVEL_DURATIONS[level];

        if (!expectedDuration) {
            report.summary.unknownLevels.push(level);
            continue;
        }

        if (currentDuration !== expectedDuration) {
            // Build the replacement
            const replacement = match[1] + level + match[3] + expectedDuration + match[5];

            updatedContent = updatedContent.replace(fullMatch, replacement);

            report.changes.push({
                level,
                before: currentDuration,
                after: expectedDuration,
            });

            report.summary.durationsUpdated++;
        } else {
            report.summary.durationsUnchanged++;
        }
    }

    // Alternative approach: Simple regex for just duration lines with context
    // For entries not caught by the block regex
    const simpleDurationRegex = /(\s+duration:\s*['"])([^'"]+)(['"],?\s*(?:\/\/.*)?$)/gm;

    // We need to correlate with level - this is harder without context
    // For now, we'll just log what we found

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
    console.log(`Total programmes found: ${report.summary.totalProgrammes}`);
    console.log(`Durations updated: ${report.summary.durationsUpdated}`);
    console.log(`Durations unchanged: ${report.summary.durationsUnchanged}`);

    if (report.summary.unknownLevels.length > 0) {
        const uniqueLevels = [...new Set(report.summary.unknownLevels)];
        console.log(`Unknown levels encountered: ${uniqueLevels.join(', ')}`);
    }

    console.log('');
    console.log('NEXT STEPS:');
    console.log('1. Review the migrated file: programme-details.ts.migrated');
    console.log('2. Compare with the original using diff');
    console.log('3. If satisfied, manually replace the original file');
    console.log('');
}

main();
