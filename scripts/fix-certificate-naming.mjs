/**
 * ASTI Certificate → Certification Rename Script
 * 
 * Changes user-facing "Certificate" to "Certification" across the site.
 * PRESERVES internal programmatic identifiers like level: 'certificate'
 * 
 * Run: node scripts/fix-certificate-naming.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, '..', 'src');

console.log('🔧 ASTI Certificate → Certification Rename Script');
console.log('═'.repeat(50));

// Patterns to replace (user-facing text)
const replacements = [
    // Level labels
    { from: "levelLabel: 'Certificate'", to: "levelLabel: 'Certification'" },
    { from: 'levelLabel: "Certificate"', to: 'levelLabel: "Certification"' },

    // Direct UI text
    { from: ">Certificate<", to: ">Certification<" },
    { from: '"Certificate"', to: '"Certification"', context: 'title' },

    // Dropdown/option values (display text only)
    { from: '>Certificate</option>', to: '>Certification</option>' },

    // Level display in cards/components
    { from: "'certificate' ? 'Certificate'", to: "'certificate' ? 'Certification'" },

    // Fee table references
    { from: 'Certificate:', to: 'Certification:', excludeFiles: ['faq.ts'] },

    // Bundle names
    { from: 'Certificate Bundle', to: 'Certification Bundle' },

    // Programme type descriptions
    { from: "type: 'Certificate'", to: "type: 'Certification'" },
    { from: "level: 'Certificate',", to: "level: 'Certification',", onlyIfNotQuotedId: true },

    // Form labels
    { from: "{ id: 'certificate', level: 'Certificate'", to: "{ id: 'certificate', level: 'Certification'" },
];

// Files to process
function getFilesToProcess(dir) {
    const files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory() && !item.name.startsWith('.')) {
            files.push(...getFilesToProcess(fullPath));
        } else if (item.isFile() && (item.name.endsWith('.ts') || item.name.endsWith('.tsx'))) {
            files.push(fullPath);
        }
    }
    return files;
}

const files = getFilesToProcess(SRC_DIR);
let totalChanges = 0;
const changedFiles = [];

for (const filePath of files) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let fileChanges = 0;

    // Apply targeted replacements
    for (const rep of replacements) {
        if (rep.excludeFiles && rep.excludeFiles.some(f => filePath.includes(f))) {
            continue;
        }

        const regex = new RegExp(rep.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const matches = content.match(regex);
        if (matches) {
            content = content.replace(regex, rep.to);
            fileChanges += matches.length;
        }
    }

    // Additional: replace standalone "Certificate" in programme level descriptions
    // But NOT programmatic identifiers

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        changedFiles.push({ file: path.relative(SRC_DIR, filePath), changes: fileChanges });
        totalChanges += fileChanges;
    }
}

console.log(`\n✅ Completed! ${totalChanges} replacements in ${changedFiles.length} files:\n`);
changedFiles.forEach(f => console.log(`   ${f.file}: ${f.changes} changes`));

console.log('\n═'.repeat(50));
console.log('Run `npm run build` to verify.');
