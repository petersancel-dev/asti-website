
import fs from 'fs';
import path from 'path';

const DEPARTMENTS_DIR = 'C:/Users/Shiv3rz/Documents/Joel/ASTI/ASTI WEB/CLONEZ/asticlone1/knowledge_base/academics/departments';
const OUTPUT_FILE = 'C:/Users/Shiv3rz/Documents/Joel/ASTI/ASTI WEB/asti-website/scripts/extracted_courses.json';

const files = fs.readdirSync(DEPARTMENTS_DIR);

const results: any[] = [];

files.forEach(file => {
    if (!file.endsWith('.md')) return;

    const content = fs.readFileSync(path.join(DEPARTMENTS_DIR, file), 'utf-8');
    const deptId = file.replace('.md', '').replace(/_/g, '-');

    // Attempt to finding course links [Course Title](link)
    // We look for links that likely point to courses
    const courseRegex = /\[(.*?)\]\(.*\/academics\/course\/.*\)/g;
    let match;
    const courses = [];

    while ((match = courseRegex.exec(content)) !== null) {
        if (courses.length < 2) { // Grab up to 2 courses per dept
            courses.push(match[1]);
        }
    }

    // fallback extraction if specific course links aren't found (some files might be different)
    if (courses.length === 0) {
        // Look for list items that might be courses
        const listRegex = /-\s+([A-Z][a-zA-Z\s&]+)/g;
        while ((match = listRegex.exec(content)) !== null) {
            if (match[1].length > 10 && courses.length < 2) {
                courses.push(match[1].trim());
            }
        }
    }

    results.push({
        deptId,
        deptFile: file,
        courses
    });
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
console.log('Done writing to ' + OUTPUT_FILE);
