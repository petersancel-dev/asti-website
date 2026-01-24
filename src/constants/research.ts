// Research Content - GROUND TRUTH from TVET Document
// Source: TVET DOCUMENT UPDATE.docx, Lines 305-309
// Last updated: January 2026

export const RESEARCH_CONTENT = {
    pageTitle: 'Research at ASTI',
    pageSubtitle: 'Empowering Knowledge Through Resources, Tools, and Guidance',

    // Digital Adaptation from TVET Document
    digitalAdaptation: {
        title: 'Digital Adaptation',
        description: 'ASTI has implemented a system of using technology to promote effective digital and blended learning that enhances teaching, learning and assessment.',
    },
};

export const DIGITAL_LIBRARY = {
    title: 'Digital Library',
    description: 'Access a comprehensive collection of e-books, journals, and technical resources to support your academic journey.',
    features: [
        'E-books and digital textbooks',
        'Academic journals and publications',
        'Technical resources and documentation',
        'Searchable database for easy discovery',
    ],
    searchPlaceholder: 'Search for books, journals, or resources...',
    externalDatabases: [
        { name: 'IEEE Xplore', url: '#' },
        { name: 'JSTOR', url: '#' },
        { name: 'Google Scholar', url: 'https://scholar.google.com' },
    ],
    icon: '📚',
};

// Digital Learning Platforms from TVET Document - Electude, ESA
export const DIGITAL_PLATFORMS = [
    {
        id: 'electude',
        name: 'Electude',
        description: 'Automotive e-learning platform with augmented and virtual reality for engaging, impactful learning.',
        type: 'AR/VR Learning',
        url: 'https://www.electude.com',
    },
    {
        id: 'esa',
        name: 'ESA',
        description: 'Electronic Security Association training platform for security systems certification.',
        type: 'Security Training',
        url: 'https://www.esaweb.org',
    },

];

export const LMS_INFO = {
    title: 'Online Learning & LMS',
    description: 'Access ASTI online courses, course materials, and assignments through our Learning Management System. ASTI uses technology with augmented and virtual reality that supports engaging and impactful online learning.',
    features: [
        'Online course access and materials',
        'Discussion forums and collaboration',
        'Quizzes and assignment submissions',
        'Progress tracking and grades',
        'Integration with Electude and ESA',
    ],
    benefits: [
        'Learn at your own pace',
        'Access from anywhere, anytime',
        'Interactive learning experience',
        'Augmented and virtual reality content',
    ],
    loginUrl: '/lms',
    icon: '🖥️',
};

export const STUDENT_RESEARCH_RESOURCES = {
    title: 'Student Resources for Research',
    description: 'Tools and guidance to support your academic research and writing.',
    resources: [
        {
            id: 'methods',
            title: 'Research Methods Guides',
            description: 'Learn effective research methodologies and approaches.',
            type: 'guide',
        },
        {
            id: 'writing',
            title: 'Academic Writing Resources',
            description: 'Guides for thesis writing, essays, and academic papers.',
            type: 'guide',
        },
        {
            id: 'citation',
            title: 'Citation Tools & Templates',
            description: 'APA, MLA, and other citation format guides and tools.',
            type: 'tool',
        },
        {
            id: 'samples',
            title: 'Sample Papers & Templates',
            description: 'Example papers and document templates for reference.',
            type: 'template',
        },
    ],
    contactEmail: 'research@astitnt.com',
    icon: '🔬',
};

export const RESEARCH_GUIDES = [
    {
        id: 'guide-1',
        title: 'How to Access Digital Resources',
        category: 'General',
        type: 'PDF',
        downloadUrl: '/guides/digital-resources-guide.pdf',
    },
    {
        id: 'guide-2',
        title: 'Library Usage Guide',
        category: 'General',
        type: 'PDF',
        downloadUrl: '/guides/library-guide.pdf',
    },
    {
        id: 'guide-3',
        title: 'Research Methodology Handbook',
        category: 'Academic',
        type: 'PDF',
        downloadUrl: '/guides/research-methodology.pdf',
    },
    {
        id: 'guide-4',
        title: 'Citation Standards Guide',
        category: 'Academic',
        type: 'PDF',
        downloadUrl: '/guides/citation-standards.pdf',
    },
    {
        id: 'guide-5',
        title: 'Thesis Writing Guide',
        category: 'Academic',
        type: 'PDF',
        downloadUrl: '/guides/thesis-writing.pdf',
    },
    {
        id: 'guide-6',
        title: 'Project Planning Template',
        category: 'Academic',
        type: 'DOCX',
        downloadUrl: '/guides/project-planning-template.docx',
    },
];
