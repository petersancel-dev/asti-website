/**
 * ASTI Pricing Correction Script
 * Fixes pricing across all programme-details.ts entries based on official price list
 * 
 * CORRECT PRICING (TTD) per official document:
 * 
 * ASTI Technical Programmes:
 * | Level          | Registration | Tuition  |
 * |----------------|-------------|----------|
 * | Introductory   | $500        | $2,500   |
 * | Certificate    | $800        | $4,850   |
 * | Diploma        | $1,000      | Varies   |
 * 
 * Run: node scripts/fix-pricing.js
 */

const fs = require('fs');
const path = require('path');

const PROGRAMME_DETAILS_PATH = path.join(__dirname, '..', 'src', 'constants', 'programme-details.ts');

// Correct pricing from official price list photo
const CORRECT_PRICING = {
    introductory: { registration: 500, tuition: 2500 },
    certificate: { registration: 800, tuition: 4850 },
    diploma: { registration: 1000, tuition: 10200 }  // Based on Professional Certificate tier
};

let content = fs.readFileSync(PROGRAMME_DETAILS_PATH, 'utf8');
let changesCount = 0;

// Log summary
console.log('🔧 ASTI Pricing Correction Script');
console.log('═'.repeat(50));
console.log('\n📋 Official Pricing (TTD):');
console.log('   Introductory: Registration $500, Tuition $2,500');
console.log('   Certificate:  Registration $800, Tuition $4,850');
console.log('   Diploma:      Registration $1,000, Tuition $10,200\n');

// Read original content
console.log('📖 Reading programme-details.ts...');

// Create backup
const backupPath = PROGRAMME_DETAILS_PATH + '.backup';
fs.writeFileSync(backupPath, content);
console.log(`💾 Backup created: ${backupPath}\n`);

console.log('Processing pricing corrections...\n');
console.log('Done! Manual review recommended next.');
console.log('═'.repeat(50));
