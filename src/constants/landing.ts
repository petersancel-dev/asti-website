// Landing Page Content - GROUND TRUTH from TVET Document
// Source: TVET DOCUMENT UPDATE.docx
// Last updated: January 2026

export const HERO_CONTENT = {
    headline: 'Advanced Solutions Technical Institute',
    highlightedText: 'ASTI',
    subheadline: 'Empowering Futures Through Education and Innovation',
    tagline: 'Teaching Tomorrow\'s Technology...Today',
    description: 'Internationally accredited programmes in Technology, Business, Security, and more. Join a community dedicated to fostering science and technology for the global workforce.',
    ctaButtons: [
        { label: 'Apply Now', href: '/admissions', variant: 'primary' as const },
        { label: 'Schedule a Visit', href: '/contact', variant: 'secondary' as const },
        { label: 'Learn More', href: '/about', variant: 'ghost' as const },
    ],
    videoUrl: null, // TODO: Add ASTI promotional video URL
};

export const QUICK_LINKS = [
    { id: 'tuition', label: 'Tuition & Financial Aid', href: '/admissions#financial-aid', icon: '💰' },
    { id: 'calendar', label: 'Academic Calendar', href: '/academics#calendar', icon: '📅' },
    { id: 'campus-map', label: 'Campus Map', href: '/about#map', icon: '🗺️' },
    { id: 'portal', label: 'Student Portal', href: '/research#lms', icon: '🎓' },
    { id: 'library', label: 'Library Resources', href: '/research#library', icon: '📚' },
];

export const NEWS_EVENTS = [
    {
        id: 'news-1',
        type: 'event' as const,
        title: 'Open Day 2026',
        date: '2026-02-15',
        description: 'Explore our campus, meet faculty, and learn about our programmes.',
        href: '/campus-life#events',
        image: '/images/placeholders/news-open-day.jpg',
    },
    {
        id: 'news-2',
        type: 'news' as const,
        title: 'New Solar Energy Programme Launch',
        date: '2026-01-10',
        description: 'ASTI introduces Bachelor of Science in Solar Energy for the renewable future.',
        href: '/academics',
        image: '/images/placeholders/news-solar.jpg',
    },
    {
        id: 'news-3',
        type: 'announcement' as const,
        title: 'Spring Semester Registration Open',
        date: '2026-01-05',
        description: 'Register now for our Spring 2026 semester. Limited seats available.',
        href: '/admissions',
        image: '/images/placeholders/news-registration.jpg',
    },
];

export const SPOTLIGHT_SECTIONS = [
    {
        id: 'academic-excellence',
        title: 'Academic Excellence',
        description: 'Leading TVET provider with over 200 internationally accredited programmes from introductory certificates to master\'s degrees.',
        image: '/images/placeholders/spotlight-academic.jpg',
        href: '/academics',
        stats: [
            { value: '200+', label: 'Programmes' },
            { value: '120+', label: 'Apprenticeships' },
        ],
    },
    {
        id: 'student-life',
        title: 'Student Life',
        description: 'Experience a vibrant campus community with clubs, events, and comprehensive student support services.',
        image: '/images/placeholders/spotlight-student-life.jpg',
        href: '/campus-life',
        stats: [
            { value: '5000+', label: 'Learners Annually' },
            { value: '2000+', label: 'Employer Partners' },
        ],
    },
    {
        id: 'research-innovation',
        title: 'Research & Innovation',
        description: 'Access cutting-edge digital resources, online learning platforms, and research support for academic success.',
        image: '/images/placeholders/spotlight-research.jpg',
        href: '/research',
        stats: [
            { value: '24/7', label: 'Digital Access' },
            { value: '100%', label: 'Online LMS' },
        ],
    },
];
