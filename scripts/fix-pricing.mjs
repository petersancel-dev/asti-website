/**
 * ASTI Pricing Correction Script
 * Fixes pricing across all programme-details.ts entries based on official price list
 * 
 * CORRECT PRICING (TTD) per official document (20260120_162832.jpg):
 * 
 * ASTI Technical Programmes:
 * | Level          | Registration | Tuition  |
 * |----------------|-------------|----------|
 * | Introductory   | $500        | $2,500   |
 * | Certificate    | $800        | $4,850   |
 * | Diploma        | $1,000      | $10,200  | (Professional Cert tier)
 * 
 * Run: node scripts/fix-pricing.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROGRAMME_DETAILS_PATH = path.join(__dirname, '..', 'src', 'constants', 'programme-details.ts');

// Correct pricing from official price list photo
const CORRECT_PRICING = {
    introductory: { registration: 500, tuition: 2500 },
    certificate: { registration: 800, tuition: 4850 },
    diploma: { registration: 1000, tuition: 10200 }
};

console.log('🔧 ASTI Pricing Correction Script');
console.log('═'.repeat(50));
console.log('\n📋 Official Pricing (TTD):');
console.log('   Introductory: Registration $500, Tuition $2,500');
console.log('   Certificate:  Registration $800, Tuition $4,850');
console.log('   Diploma:      Registration $1,000, Tuition $10,200\n');

// Read file
let content = fs.readFileSync(PROGRAMME_DETAILS_PATH, 'utf8');

// Create backup
const backupPath = PROGRAMME_DETAILS_PATH + '.backup.' + Date.now();
fs.writeFileSync(backupPath, content);
console.log(`💾 Backup created: ${path.basename(backupPath)}\n`);

// Track changes
let introRegistrationFixed = 0;
let introTuitionFixed = 0;
let certRegistrationFixed = 0;
let certTuitionFixed = 0;
let diplomaRegistrationFixed = 0;
let diplomaTuitionFixed = 0;

// Parse the file and fix pricing per entry
// Strategy: find each entry, determine its level, then fix its tuition and registration

// Split by entry pattern
const entryPattern = /'([a-z0-9-]+)':\s*\{/g;
const entries = content.split(/(?='[a-z0-9-]+':\s*\{)/);

let fixedContent = '';
for (const entry of entries) {
    if (!entry.includes('level:')) {
        fixedContent += entry;
        continue;
    }

    let modifiedEntry = entry;

    // Determine level
    const levelMatch = entry.match(/level:\s*'(introductory|certificate|diploma)'/);
    if (!levelMatch) {
        fixedContent += entry;
        continue;
    }

    const level = levelMatch[1];
    const pricing = CORRECT_PRICING[level];

    // Fix tuitionFee
    const tuitionMatch = modifiedEntry.match(/tuitionFee:\s*(\d+)/);
    if (tuitionMatch && parseInt(tuitionMatch[1]) !== pricing.tuition) {
        modifiedEntry = modifiedEntry.replace(
            /tuitionFee:\s*\d+/,
            `tuitionFee: ${pricing.tuition}`
        );
        if (level === 'introductory') introTuitionFixed++;
        else if (level === 'certificate') certTuitionFixed++;
        else diplomaTuitionFixed++;
    }

    // Fix registrationFee
    const regMatch = modifiedEntry.match(/registrationFee:\s*(\d+)/);
    if (regMatch && parseInt(regMatch[1]) !== pricing.registration) {
        modifiedEntry = modifiedEntry.replace(
            /registrationFee:\s*\d+/,
            `registrationFee: ${pricing.registration}`
        );
        if (level === 'introductory') introRegistrationFixed++;
        else if (level === 'certificate') certRegistrationFixed++;
        else diplomaRegistrationFixed++;
    }

    fixedContent += modifiedEntry;
}

// Write fixed content
fs.writeFileSync(PROGRAMME_DETAILS_PATH, fixedContent);

console.log('✅ Pricing corrections applied:\n');
console.log(`   Introductory programmes:`);
console.log(`     - Registration: ${introRegistrationFixed} fixed (250→500)`);
console.log(`     - Tuition: ${introTuitionFixed} fixed (→2500)`);
console.log(`   Certificate programmes:`);
console.log(`     - Registration: ${certRegistrationFixed} fixed (250→800)`);
console.log(`     - Tuition: ${certTuitionFixed} fixed (→4850)`);
console.log(`   Diploma programmes:`);
console.log(`     - Registration: ${diplomaRegistrationFixed} fixed (→1000)`);
console.log(`     - Tuition: ${diplomaTuitionFixed} fixed (→10200)`);

const totalFixes = introRegistrationFixed + introTuitionFixed + certRegistrationFixed + certTuitionFixed + diplomaRegistrationFixed + diplomaTuitionFixed;
console.log(`\n📊 Total changes: ${totalFixes}`);
console.log('\n═'.repeat(50));
console.log('Done! Run `npm run build` to verify.');
