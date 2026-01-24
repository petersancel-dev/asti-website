/**
 * Course Data Helper Script
 * 
 * This script provides utilities for extracting and transforming course data
 * from the scraped Markdown files into the ProgrammeDetail format.
 * 
 * Usage: Run specific functions as needed during batch processing.
 * 
 * @author ASTI Website Team
 * @version 1.0.0
 */

import * as fs from 'fs';
import * as path from 'path';

// =============================================================================
// CONFIGURATION
// =============================================================================

const KNOWLEDGE_BASE_PATH = path.join(
    __dirname,
    '../../CLONEZ/asticlone1/knowledge_base/academics'
);

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

interface ExtractedCourseData {
    filename: string;
    title: string;
    level: string;
    duration: string;
    department: string;
    prerequisites: string;
    description: string;
    courseOutline: string[];
    deliveryMode: string[];
    similarCourses: string[];
}

interface CourseFile {
    directory: string;
    filename: string;
    level: string;
}

// =============================================================================
// DIRECTORY MAPPING
// =============================================================================

const LEVEL_DIRECTORIES: Record<string, string> = {
    masters: 'masters_programs',
    associate: 'associate_degrees',
    'advanced-diploma': 'advanced_diplomas',
    diploma: 'diplomas',
    'advanced-certificate': 'advanced_certificates',
    certificate: 'certificates',
    introductory: 'introductory_programs'
};

const LEVEL_ORDER = [
    'masters',
    'associate',
    'advanced-diploma',
    'diploma',
    'advanced-certificate',
    'certificate',
    'introductory'
];

// =============================================================================
// DEPARTMENT TO CATEGORY MAPPING
// =============================================================================

const DEPARTMENT_TO_CATEGORY: Record<string, { slug: string; label: string }> = {
    'Accounting, Banking & Finance': { slug: 'accounting-finance', label: 'Accounting & Finance' },
    'Accounting Banking & Finance': { slug: 'accounting-finance', label: 'Accounting & Finance' },
    'Business Management': { slug: 'business-management', label: 'Business Management' },
    'Electrical and Electronics Engineering': { slug: 'electrical-electronics', label: 'Electrical & Electronics' },
    'Electrical And Electronic Department': { slug: 'electrical-electronics', label: 'Electrical & Electronics' },
    'Security Management': { slug: 'security', label: 'Security Management' },
    'Fibre Optics And Wireless Technologies Engineering': { slug: 'fiber-optics-wireless', label: 'Fiber Optics & Wireless' },
    'Telecommunications Network & Electronics Engineering': { slug: 'telecommunications', label: 'Telecommunications' },
    'Air Conditioning And Refrigeration Engineering': { slug: 'hvac', label: 'HVAC & Refrigeration' },
    'Mobile Phone Repair & Maintainance': { slug: 'mobile-repair', label: 'Mobile Phone Repair' },
    'Computer Science Engineering & Information Technology': { slug: 'computer-science', label: 'Computer Science & IT' },
    'Information Systems Management': { slug: 'information-systems', label: 'Information Systems' },
    'Information Systems Auditor / Administrator': { slug: 'information-systems', label: 'Information Systems' },
    'Project Management': { slug: 'project-management', label: 'Project Management' },
    'Human Resource Management': { slug: 'human-resources', label: 'Human Resource Management' },
    'Marketing': { slug: 'marketing', label: 'Marketing' },
    'Insurance': { slug: 'insurance', label: 'Insurance' },
    'Global Strategy & Leadership': { slug: 'leadership', label: 'Global Leadership' },
    'Hospitality, Hotel & Tourism Management': { slug: 'hospitality', label: 'Hospitality & Tourism' },
    'Media And Journalism': { slug: 'media-journalism', label: 'Media & Journalism' },
    'Shipping & Logistics': { slug: 'logistics', label: 'Shipping & Logistics' },
    'Healthcare & Biotechnology': { slug: 'healthcare', label: 'Healthcare & Biotech' },
    'Renewable Energy Department': { slug: 'renewable-energy', label: 'Renewable Energy' },
    'Solar Energy & Energy Technology': { slug: 'renewable-energy', label: 'Renewable Energy' },
    'Electric And Hybrid Engineering': { slug: 'electric-hybrid', label: 'Electric & Hybrid Vehicles' },
    'Automobile & Mechanical Engineering': { slug: 'auto-mechanics', label: 'Auto Mechanics' },
    'Architecture Management': { slug: 'architecture', label: 'Architecture' },
    'Construction Management': { slug: 'construction', label: 'Construction Management' },
    'Electrical Wiring': { slug: 'electrical-electronics', label: 'Electrical & Electronics' },
    'Real Estate Management Brokerage Agent Principles Practices': { slug: 'real-estate', label: 'Real Estate' }
};

// =============================================================================
// PRICING DEFAULTS BY LEVEL
// =============================================================================

const PRICING_DEFAULTS: Record<string, { tuition: number; registration: number }> = {
    introductory: { tuition: 2500, registration: 300 },
    certificate: { tuition: 4500, registration: 400 },
    'advanced-certificate': { tuition: 6500, registration: 450 },
    diploma: { tuition: 8500, registration: 500 },
    'advanced-diploma': { tuition: 12500, registration: 600 },
    associate: { tuition: 18000, registration: 750 },
    masters: { tuition: 35000, registration: 1500 }
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Lists all course files in a given level directory
 */
function listCourseFiles(level: string): CourseFile[] {
    const directory = LEVEL_DIRECTORIES[level];
    if (!directory) {
        console.error(`Unknown level: ${level}`);
        return [];
    }

    const dirPath = path.join(KNOWLEDGE_BASE_PATH, directory);

    if (!fs.existsSync(dirPath)) {
        console.error(`Directory not found: ${dirPath}`);
        return [];
    }

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));

    return files.map(filename => ({
        directory,
        filename,
        level
    }));
}

/**
 * Extracts course data from a markdown file
 */
function extractCourseData(filePath: string): ExtractedCourseData | null {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return null;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    // Extract title (first # header that's not login/admin related)
    let title = '';
    for (const line of lines) {
        if (line.startsWith('# ') &&
            !line.includes('login') &&
            !line.includes('Login') &&
            !line.includes('CLOSE') &&
            line.trim().length > 2) {
            title = line.replace('# ', '').trim();
            break;
        }
    }

    // Extract level
    const levelMatch = content.match(/Level:\s*([^\n]+)/i);
    const level = levelMatch ? levelMatch[1].trim() : '';

    // Extract duration
    const durationMatch = content.match(/Duration:\s*([^\n]+)/i);
    const duration = durationMatch ? durationMatch[1].trim() : '';

    // Extract department
    const deptMatch = content.match(/Department of ([^\n]+)/i);
    const department = deptMatch ? deptMatch[1].trim() : '';

    // Extract prerequisites
    const prereqMatch = content.match(/Pre Requisites:\s*([^\n]+)/i);
    const prerequisites = prereqMatch ? prereqMatch[1].trim() : '';

    // Extract description (main content paragraph)
    let description = '';
    const paragraphs = content.split('\n\n');
    for (const para of paragraphs) {
        if (para.length > 200 &&
            !para.includes('#') &&
            !para.includes('[') &&
            !para.includes('Level:') &&
            !para.includes('Duration:')) {
            description = para.trim().replace(/\r/g, '');
            break;
        }
    }

    // Extract course outline
    const courseOutline: string[] = [];
    const outlineMatch = content.match(/Course Outline\*?\*?\s*([\s\S]*?)(?=\n#|\n\*\*|$)/i);
    if (outlineMatch) {
        const outlineLines = outlineMatch[1].split('\n');
        for (const line of outlineLines) {
            const cleaned = line.replace(/^[\s-*•]+/, '').trim();
            if (cleaned.length > 3 && cleaned.length < 200) {
                courseOutline.push(cleaned);
            }
        }
    }

    // Determine delivery mode
    const deliveryMode: string[] = [];
    if (content.toLowerCase().includes('online') || content.toLowerCase().includes('distance')) {
        deliveryMode.push('online');
    }
    if (content.toLowerCase().includes('face-to-face') || content.toLowerCase().includes('on-site')) {
        deliveryMode.push('face-to-face');
    }
    if (deliveryMode.length === 0) {
        deliveryMode.push('online', 'face-to-face');  // Default to hybrid
    }

    // Extract similar courses
    const similarCourses: string[] = [];
    const similarMatch = content.match(/Explore similar courses[\s\S]*?([\s\S]*?)Explore more/i);
    if (similarMatch) {
        const courseLinks = similarMatch[1].match(/\[[\s\S]*?\]\([^)]+\)/g);
        if (courseLinks) {
            for (const link of courseLinks.slice(0, 5)) {
                const nameMatch = link.match(/\[([\s\S]*?)\]/);
                if (nameMatch) {
                    similarCourses.push(nameMatch[1].trim().replace(/\n/g, ' '));
                }
            }
        }
    }

    return {
        filename: path.basename(filePath),
        title,
        level,
        duration,
        department,
        prerequisites,
        description,
        courseOutline,
        deliveryMode,
        similarCourses
    };
}

/**
 * Generates a URL-friendly slug from course title and level
 */
function generateCourseId(title: string, levelSlug: string): string {
    // Remove common prefixes
    let cleaned = title
        .replace(/^(Certificate|Diploma|Advanced Certificate|Advanced Diploma|Introduction to|Introductory Program) in /i, '')
        .replace(/^(Certificate|Diploma|Advanced Certificate|Advanced Diploma) /i, '')
        .replace(/\s*\([^)]*\)\s*/g, '') // Remove parenthetical content
        .replace(/[^\w\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .toLowerCase()
        .substring(0, 50); // Limit length

    // Append level suffix
    const levelSuffixes: Record<string, string> = {
        masters: '-masters',
        associate: '-associate',
        'advanced-diploma': '-adv-diploma',
        diploma: '-diploma',
        'advanced-certificate': '-adv-cert',
        certificate: '-cert',
        introductory: '-intro'
    };

    return cleaned + (levelSuffixes[levelSlug] || '');
}

/**
 * Maps source level text to our level slug
 */
function mapLevel(sourceLevelText: string): string {
    const normalizedLevel = sourceLevelText.toLowerCase().trim();

    if (normalizedLevel.includes('master')) return 'masters';
    if (normalizedLevel.includes('associate degree')) return 'associate';
    if (normalizedLevel.includes('advanced diploma')) return 'advanced-diploma';
    if (normalizedLevel.includes('diploma')) return 'diploma';
    if (normalizedLevel.includes('advanced certificate')) return 'advanced-certificate';
    if (normalizedLevel.includes('certificate programme')) return 'certificate';
    if (normalizedLevel.includes('certificate')) return 'certificate';
    if (normalizedLevel.includes('introductory')) return 'introductory';

    return 'certificate'; // Default fallback
}

/**
 * Gets category info from department
 */
function getCategoryFromDepartment(department: string): { slug: string; label: string } {
    for (const [key, value] of Object.entries(DEPARTMENT_TO_CATEGORY)) {
        if (department.toLowerCase().includes(key.toLowerCase()) ||
            key.toLowerCase().includes(department.toLowerCase())) {
            return value;
        }
    }
    return { slug: 'general', label: 'General Studies' };
}

/**
 * Gets pricing for a level
 */
function getPricing(levelSlug: string): { tuition: number; registration: number } {
    return PRICING_DEFAULTS[levelSlug] || PRICING_DEFAULTS.certificate;
}

// =============================================================================
// BATCH LISTING FUNCTIONS
// =============================================================================

/**
 * Lists all courses in a batch range for a specific level
 */
function listBatchCourses(level: string, startIndex: number, count: number): void {
    const courses = listCourseFiles(level);
    const batch = courses.slice(startIndex, startIndex + count);

    console.log(`\n=== Batch: ${level} (${startIndex + 1}-${startIndex + batch.length}) ===\n`);

    batch.forEach((course, idx) => {
        console.log(`${startIndex + idx + 1}. ${course.filename}`);
    });

    console.log(`\nTotal in batch: ${batch.length}`);
}

/**
 * Generates a complete inventory summary
 */
function generateInventorySummary(): void {
    console.log('\n=== COMPLETE COURSE INVENTORY ===\n');

    let total = 0;

    for (const level of LEVEL_ORDER) {
        const courses = listCourseFiles(level);
        console.log(`${level.toUpperCase().padEnd(25)} : ${courses.length} courses`);
        total += courses.length;
    }

    console.log('─'.repeat(40));
    console.log(`${'TOTAL'.padEnd(25)} : ${total} courses`);
}

/**
 * Extracts and displays data for a specific course file
 */
function showCourseData(level: string, filename: string): void {
    const directory = LEVEL_DIRECTORIES[level];
    const filePath = path.join(KNOWLEDGE_BASE_PATH, directory, filename);

    const data = extractCourseData(filePath);

    if (data) {
        console.log('\n=== EXTRACTED COURSE DATA ===\n');
        console.log(`Title: ${data.title}`);
        console.log(`Level: ${data.level}`);
        console.log(`Duration: ${data.duration}`);
        console.log(`Department: ${data.department}`);
        console.log(`Prerequisites: ${data.prerequisites}`);
        console.log(`Delivery: ${data.deliveryMode.join(', ')}`);
        console.log(`\nDescription:\n${data.description.substring(0, 300)}...`);
        console.log(`\nCourse Outline (${data.courseOutline.length} items):`);
        data.courseOutline.slice(0, 10).forEach(item => console.log(`  - ${item}`));
        console.log(`\nSimilar Courses: ${data.similarCourses.length}`);
    }
}

// =============================================================================
// TEMPLATE GENERATION
// =============================================================================

/**
 * Generates a ProgrammeDetail template from extracted data
 */
function generateProgrammeDetailTemplate(
    extractedData: ExtractedCourseData,
    levelSlug: string
): string {
    const id = generateCourseId(extractedData.title, levelSlug);
    const category = getCategoryFromDepartment(extractedData.department);
    const pricing = getPricing(levelSlug);

    // Generate module structure from course outline
    const modules = generateModulesFromOutline(extractedData.courseOutline, extractedData.title);

    return `
    '${id}': {
        id: '${id}',
        title: '${extractedData.title}',
        subtitle: 'YOUR COMPELLING SUBTITLE HERE',
        level: '${levelSlug}',
        levelLabel: '${levelSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}',
        category: '${category.slug}',
        categoryLabel: '${category.label}',

        heroImage: '/images/programmes/placeholder.png',
        tagline: 'YOUR TAGLINE HERE - Based on: ${extractedData.description.substring(0, 100)}...',

        description: \`${extractedData.description || 'WRITE DESCRIPTION HERE'}\`,

        highlights: [
            'Highlight 1',
            'Highlight 2',
            'Highlight 3',
            'Highlight 4',
            'Highlight 5',
            'Highlight 6'
        ],

        duration: '${extractedData.duration}',
        credits: 60,
        totalHours: 720,
        startDates: ['January 2026', 'May 2026', 'September 2026'],
        delivery: ['${extractedData.deliveryMode.join("', '")}'],
        schedule: 'Flexible schedule options available',

        modules: [
${modules}
        ],

        entryRequirements: [
            '${extractedData.prerequisites}'
        ],
        matureEntry: 'Applicants aged 21+ without formal qualifications may be considered based on relevant work experience.',

        documentsRequired: [
            'Completed application form',
            'Certified copies of academic certificates',
            'Valid national ID or passport',
            'Two passport-sized photographs'
        ],

        careerOutcomes: [
            {
                title: 'Career Title 1',
                description: 'Description of career outcome',
                averageSalary: 'TTD $X,XXX - $X,XXX/month'
            }
        ],

        certifications: ['ASTI ${extractedData.level}'],

        tuitionFee: ${pricing.tuition},
        currency: 'TTD',
        registrationFee: ${pricing.registration},
        paymentPlans: [
            {
                name: 'Full Payment',
                downPayment: ${pricing.tuition + pricing.registration},
                installments: 0,
                installmentAmount: 0
            },
            {
                name: 'Standard Plan',
                downPayment: ${Math.round(pricing.tuition * 0.33)},
                installments: 6,
                installmentAmount: ${Math.round((pricing.tuition * 0.67) / 6)}
            }
        ],

        accreditedBy: ['ACTT'],

        relatedProgrammes: [],

        metaDescription: '${extractedData.title} at ASTI Trinidad. ${extractedData.duration} programme.',
        keywords: ['ASTI', 'Trinidad', '${levelSlug}']
    },`;
}

/**
 * Generates module structure from course outline
 */
function generateModulesFromOutline(outline: string[], courseTitle: string): string {
    if (outline.length < 4) {
        // Generate placeholder modules
        return `            {
                id: 'mod-1',
                title: 'Module 1: Foundations',
                description: 'Core foundational concepts',
                hours: 80,
                topics: ['Topic 1', 'Topic 2', 'Topic 3']
            },
            {
                id: 'mod-2',
                title: 'Module 2: Advanced Concepts',
                description: 'Building on fundamentals',
                hours: 100,
                topics: ['Topic 1', 'Topic 2', 'Topic 3']
            },
            {
                id: 'mod-3',
                title: 'Module 3: Practical Applications',
                description: 'Hands-on practice',
                hours: 120,
                topics: ['Topic 1', 'Topic 2', 'Topic 3']
            },
            {
                id: 'mod-4',
                title: 'Module 4: Capstone Project',
                description: 'Comprehensive project work',
                hours: 180,
                topics: ['Topic 1', 'Topic 2', 'Topic 3']
            }`;
    }

    // Group outline items into modules (4-6 items per module)
    const itemsPerModule = Math.ceil(outline.length / 5);
    const modules: string[] = [];

    for (let i = 0; i < 5 && (i * itemsPerModule) < outline.length; i++) {
        const moduleTopics = outline.slice(i * itemsPerModule, (i + 1) * itemsPerModule);
        const moduleNum = i + 1;

        modules.push(`            {
                id: 'mod-${moduleNum}',
                title: 'Module ${moduleNum}: ${moduleTopics[0] || 'Core Concepts'}',
                description: 'Comprehensive coverage of essential concepts',
                hours: ${80 + (i * 20)},
                topics: [
                    ${moduleTopics.map(t => `'${t.replace(/'/g, "\\'")}'`).join(',\n                    ')}
                ]
            }`);
    }

    return modules.join(',\n');
}

// =============================================================================
// CLI INTERFACE
// =============================================================================

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'inventory':
        generateInventorySummary();
        break;

    case 'list':
        if (args.length < 2) {
            console.log('Usage: list <level> [startIndex] [count]');
            break;
        }
        listBatchCourses(args[1], parseInt(args[2]) || 0, parseInt(args[3]) || 20);
        break;

    case 'show':
        if (args.length < 3) {
            console.log('Usage: show <level> <filename>');
            break;
        }
        showCourseData(args[1], args[2]);
        break;

    case 'template':
        if (args.length < 3) {
            console.log('Usage: template <level> <filename>');
            break;
        }
        const dir = LEVEL_DIRECTORIES[args[1]];
        const fp = path.join(KNOWLEDGE_BASE_PATH, dir, args[2]);
        const data = extractCourseData(fp);
        if (data) {
            console.log(generateProgrammeDetailTemplate(data, args[1]));
        }
        break;

    default:
        console.log(`
Course Data Helper Script

Commands:
  inventory          - Show complete course inventory
  list <level>       - List courses for a level (e.g., 'masters', 'diploma')
  show <level> <file> - Show extracted data from a specific file
  template <level> <file> - Generate ProgrammeDetail template

Levels: masters, associate, advanced-diploma, diploma, advanced-certificate, certificate, introductory
        `);
}

export {
    listCourseFiles,
    extractCourseData,
    generateCourseId,
    mapLevel,
    getCategoryFromDepartment,
    getPricing,
    generateProgrammeDetailTemplate,
    DEPARTMENT_TO_CATEGORY,
    PRICING_DEFAULTS,
    LEVEL_DIRECTORIES
};
