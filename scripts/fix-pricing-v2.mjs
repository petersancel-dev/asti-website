/**
 * ASTI Pricing Correction Script v2
 * CORRECT pricing from the actual readable price list image
 * 
 * CORRECT PRICING (TTD):
 * 
 * ASTI Programmes:
 * | Level              | Registration | Tuition  | Exams   | Total    |
 * |--------------------|-------------|----------|---------|----------|
 * | INTRODUCTORY       | $300        | $2,700   | -       | $3,000   |
 * | CERTIFICATE        | $300        | $6,255   | $250    | $6,805   |
 * | ADVANCED CERT      | $600        | $6,480   | $300    | $7,380   |
 * | DIPLOMA            | $1,000      | $8,550   | $500    | $10,050  |
 * | ADVANCED DIPLOMA   | $1,200      | $10,260  | $600    | $12,060  |
 * 
 * Run: node scripts/fix-pricing-v2.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROGRAMME_DETAILS_PATH = path.join(__dirname, '..', 'src', 'constants', 'programme-details.ts');

// CORRECT pricing from the readable price list image
const CORRECT_PRICING = {
    introductory: { registration: 300, tuition: 2700 },
    certificate: { registration: 300, tuition: 6255 },
    diploma: { registration: 1000, tuition: 8550 }
};

console.log('🔧 ASTI Pricing Correction Script v2 (CORRECT VALUES)');
console.log('═'.repeat(50));
console.log('\n📋 CORRECT Official Pricing (TTD):');
console.log('   Introductory: Registration $300, Tuition $2,700');
console.log('   Certificate:  Registration $300, Tuition $6,255');
console.log('   Diploma:      Registration $1,000, Tuition $8,550\n');

// Read file
let content = fs.readFileSync(PROGRAMME_DETAILS_PATH, 'utf8');

// Create backup
const backupPath = PROGRAMME_DETAILS_PATH + '.backup.v2.' + Date.now();
fs.writeFileSync(backupPath, content);
console.log(`💾 Backup created: ${path.basename(backupPath)}\n`);

// Track changes
let stats = {
    introRegistration: 0,
    introTuition: 0,
    certRegistration: 0,
    certTuition: 0,
    diplomaRegistration: 0,
    diplomaTuition: 0
};

// Split by entry pattern and process each
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
        if (level === 'introductory') stats.introTuition++;
        else if (level === 'certificate') stats.certTuition++;
        else stats.diplomaTuition++;
    }

    // Fix registrationFee
    const regMatch = modifiedEntry.match(/registrationFee:\s*(\d+)/);
    if (regMatch && parseInt(regMatch[1]) !== pricing.registration) {
        modifiedEntry = modifiedEntry.replace(
            /registrationFee:\s*\d+/,
            `registrationFee: ${pricing.registration}`
        );
        if (level === 'introductory') stats.introRegistration++;
        else if (level === 'certificate') stats.certRegistration++;
        else stats.diplomaRegistration++;
    }

    fixedContent += modifiedEntry;
}

// Write fixed content
fs.writeFileSync(PROGRAMME_DETAILS_PATH, fixedContent);

console.log('✅ Pricing corrections applied:\n');
console.log(`   Introductory programmes:`);
console.log(`     - Registration: ${stats.introRegistration} fixed (→$300)`);
console.log(`     - Tuition: ${stats.introTuition} fixed (→$2,700)`);
console.log(`   Certificate programmes:`);
console.log(`     - Registration: ${stats.certRegistration} fixed (→$300)`);
console.log(`     - Tuition: ${stats.certTuition} fixed (→$6,255)`);
console.log(`   Diploma programmes:`);
console.log(`     - Registration: ${stats.diplomaRegistration} fixed (→$1,000)`);
console.log(`     - Tuition: ${stats.diplomaTuition} fixed (→$8,550)`);

const totalFixes = Object.values(stats).reduce((a, b) => a + b, 0);
console.log(`\n📊 Total changes: ${totalFixes}`);
console.log('\n═'.repeat(50));
console.log('Done! Run `npm run build` to verify.');
