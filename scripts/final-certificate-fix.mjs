/**
 * Complete Certificate → Certification Rename
 * Final pass to change all user-facing "Certificate" to "Certification"
 * 
 * EXCEPTIONS (DO NOT CHANGE):
 * - "Police Certificate of Character" (external document)
 * - "Award Certificate" (specific programme type name - unclear, leaving for now)
 * - Comments in code
 * 
 * Run: node scripts/final-certificate-fix.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, '..', 'src');

console.log('🔧 Final Certificate → Certification Rename');
console.log('═'.repeat(50));

let totalChanges = 0;

// ============= PROGRAMME-DETAILS.TS =============
const detailsPath = path.join(SRC_DIR, 'constants', 'programme-details.ts');
let content = fs.readFileSync(detailsPath, 'utf8');
let original = content;

// Fix titles: "Certificate in X" → "Certification in X"
content = content.replace(/title: 'Certificate in /g, "title: 'Certification in ");
content = content.replace(/title: "Certificate in /g, 'title: "Certification in ');

// Fix meta descriptions
content = content.replace(/metaDescription: 'Certificate in /g, "metaDescription: 'Certification in ");

// Fix entry requirements: "Certificate in X" → "Certification in X"
content = content.replace(/'Certificate in /g, "'Certification in ");

// Fix certifications arrays: "ASTI Certificate in" → "ASTI Certification in"  
content = content.replace(/ASTI Certificate in/g, "ASTI Certification in");

// Fix other certification strings: "X Certificate" → "X Certification" (but not Police Certificate)
content = content.replace(/Technician Certificate/g, "Technician Certification");
content = content.replace(/Intro Certificate/g, "Intro Certification");
content = content.replace(/Solar Certificate/g, "Solar Certification");
content = content.replace(/Technology Certificate/g, "Technology Certification");
content = content.replace(/Conditioning Certificate/g, "Conditioning Certification");
content = content.replace(/Installer Certificate/g, "Installer Certification");
content = content.replace(/Robotics Certificate/g, "Robotics Certification");

// Fix: "Technical Certificate" in entry requirements
content = content.replace(/Technical Certificate/g, "Technical Certification");

// Fix: "Level 1 Certificate" → "Level 1 Certification"
content = content.replace(/Level 1 Certificate/g, "Level 1 Certification");

if (content !== original) {
    fs.writeFileSync(detailsPath, content);
    console.log('   programme-details.ts: Updated');
    totalChanges++;
}

// ============= PROGRAMMES.TS =============
const programmesPath = path.join(SRC_DIR, 'constants', 'programmes.ts');
content = fs.readFileSync(programmesPath, 'utf8');
original = content;

content = content.replace(/title: 'Certificate in /g, "title: 'Certification in ");

if (content !== original) {
    fs.writeFileSync(programmesPath, content);
    console.log('   programmes.ts: Updated');
    totalChanges++;
}

// ============= FAQ.TS =============
const faqPath = path.join(SRC_DIR, 'constants', 'faq.ts');
content = fs.readFileSync(faqPath, 'utf8');
original = content;

// Fix pricing display
content = content.replace(/Certificate: \$/g, "Certification: $");
content = content.replace(/Advanced Certificate:/g, "Advanced Certification:");
content = content.replace(/the Certificate programme/g, "the Certification programme");
content = content.replace(/Certificates and Certificates/g, "Certificates and Certifications");
content = content.replace(/from our Award Certificates and Certificates to/g, "from our Award Certifications and Certifications to");

if (content !== original) {
    fs.writeFileSync(faqPath, content);
    console.log('   faq.ts: Updated');
    totalChanges++;
}

// ============= CAREERS.TS =============
const careersPath = path.join(SRC_DIR, 'constants', 'careers.ts');
content = fs.readFileSync(careersPath, 'utf8');
original = content;

content = content.replace(/Telecommunications Certificate/g, "Telecommunications Certification");
content = content.replace(/Cybersecurity Certificate/g, "Cybersecurity Certification");

if (content !== original) {
    fs.writeFileSync(careersPath, content);
    console.log('   careers.ts: Updated');
    totalChanges++;
}

// ============= ADMISSIONS.TS =============
const admissionsPath = path.join(SRC_DIR, 'constants', 'admissions.ts');
content = fs.readFileSync(admissionsPath, 'utf8');
original = content;

content = content.replace(/Advanced Certificates/g, "Advanced Certifications");

if (content !== original) {
    fs.writeFileSync(admissionsPath, content);
    console.log('   admissions.ts: Updated');
    totalChanges++;
}

// ============= ACCREDITATIONS.TS =============
const accredPath = path.join(SRC_DIR, 'constants', 'accreditations.ts');
content = fs.readFileSync(accredPath, 'utf8');
original = content;

content = content.replace(/Award Certificates, Level 3 Certificates/g, "Award Certifications, Level 3 Certifications");

if (content !== original) {
    fs.writeFileSync(accredPath, content);
    console.log('   accreditations.ts: Updated');
    totalChanges++;
}

// ============= ABOUT.TS =============
const aboutPath = path.join(SRC_DIR, 'constants', 'about.ts');
content = fs.readFileSync(aboutPath, 'utf8');
original = content;

// Fix but preserve Award Certificate as per user clarification needed
// For now, change "Award Certificate courses" → "Award Certification courses"
content = content.replace(/Award Certificate courses/g, "Award Certification courses");

if (content !== original) {
    fs.writeFileSync(aboutPath, content);
    console.log('   about.ts: Updated');
    totalChanges++;
}

console.log(`\n✅ ${totalChanges} files updated`);
console.log('\n═'.repeat(50));
console.log('Run `npm run build` to verify.');
