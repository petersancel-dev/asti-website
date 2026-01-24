/**
 * ASTI Complete Certificate → Certification Fix
 * 
 * Ensures ALL levelLabel values for certificate courses show "Certification"
 * Also updates any remaining user-facing "Certificate" text
 * 
 * Run: node scripts/fix-all-certificates.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, '..', 'src');

console.log('🔧 ASTI Complete Certificate → Certification Fix');
console.log('═'.repeat(50));

let totalChanges = 0;

// Process programme-details.ts
const detailsPath = path.join(SRC_DIR, 'constants', 'programme-details.ts');
let detailsContent = fs.readFileSync(detailsPath, 'utf8');

// Fix all levelLabel: 'Certificate' to 'Certification'
const labelMatches = detailsContent.match(/levelLabel:\s*'Certificate'/g);
if (labelMatches) {
    detailsContent = detailsContent.replace(/levelLabel:\s*'Certificate'/g, "levelLabel: 'Certification'");
    console.log(`   programme-details.ts: ${labelMatches.length} levelLabel fixes`);
    totalChanges += labelMatches.length;
}

fs.writeFileSync(detailsPath, detailsContent);

// Process programmes.ts - update the PROGRAMME_LEVELS label
const programmesPath = path.join(SRC_DIR, 'constants', 'programmes.ts');
let programmesContent = fs.readFileSync(programmesPath, 'utf8');

// Change "Certification" level label if it's currently "Certificate"
if (programmesContent.includes("{ id: 'certificate', label: 'Certificate'")) {
    programmesContent = programmesContent.replace(
        "{ id: 'certificate', label: 'Certificate'",
        "{ id: 'certificate', label: 'Certification'"
    );
    console.log('   programmes.ts: 1 level label fix');
    totalChanges++;
    fs.writeFileSync(programmesPath, programmesContent);
}

// Process other files with targeted replacements
const filesToProcess = [
    'constants/faq.ts',
    'constants/about.ts',
    'constants/accreditations.ts',
    'constants/admissions.ts',
    'constants/academics.ts',
    'constants/careers.ts',
    'components/Programmes.tsx',
    'components/DraggableCardStack.tsx',
    'app/apply/page.tsx',
];

for (const relativePath of filesToProcess) {
    const filePath = path.join(SRC_DIR, relativePath);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace user-facing "Certificate" with "Certification" in specific contexts
    // But preserve phrases like "Award Certificate" and "Certificate of Character"

    // UI Labels
    content = content.replace(/title:\s*["']Certificate["']/g, 'title: "Certification"');
    content = content.replace(/>Certificate</g, '>Certification<');
    content = content.replace(/\? 'Certificate'/g, "? 'Certification'");
    content = content.replace(/level:\s*'Certificate',/g, "level: 'Certification',");
    content = content.replace(/type:\s*'Certificate'/g, "type: 'Certification'");

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        const changes = (original.length - content.length !== 0) ? 'updated' : 'no changes';
        console.log(`   ${relativePath}: modified`);
    }
}

console.log(`\n✅ Total levelLabel fixes: ${totalChanges}`);
console.log('\n═'.repeat(50));
console.log('Run `npm run build` to verify.');
