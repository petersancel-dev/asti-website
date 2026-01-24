/**
 * REVERSE: Certification → Certificate
 * Changes all "Certification" back to "Certificate" site-wide
 * 
 * Run: node scripts/fix-certification-to-certificate.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, '..', 'src');

console.log('🔧 REVERSE: Certification → Certificate');
console.log('═'.repeat(50));

let totalChanges = 0;

function processFile(filePath) {
    if (!fs.existsSync(filePath)) return 0;

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Main replacements - Certification → Certificate
    content = content.replace(/Certification/g, 'Certificate');

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        const changes = (original.match(/Certification/g) || []).length;
        return changes;
    }
    return 0;
}

// Process all TS/TSX files in src
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

for (const filePath of files) {
    const changes = processFile(filePath);
    if (changes > 0) {
        console.log(`   ${path.relative(SRC_DIR, filePath)}: ${changes} changes`);
        totalChanges += changes;
    }
}

console.log(`\n✅ Total: ${totalChanges} replacements`);
console.log('\n═'.repeat(50));
console.log('Run `npm run build` to verify.');
