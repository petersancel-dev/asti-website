// Campus Life Content
// Based on: ASTI Site Build - 6. Campus Life.docx

export const CAMPUS_LIFE_CONTENT = {
    pageTitle: 'Campus Life at ASTI',
    pageSubtitle: 'Experience Learning, Community, and Support on Campus',

    overview: {
        title: 'Life at ASTI',
        introduction: 'At ASTI, we believe education extends beyond the classroom. Our campus is designed to foster a vibrant community where students can learn, grow, and connect with peers and mentors.',
        highlights: [
            'State-of-the-art facilities and classrooms',
            'Supportive community environment',
            'Comprehensive student services',
            'Active clubs and organizations',
        ],
    },
};

export const CAMPUS_SHOP = {
    title: 'Campus Shop',
    status: 'coming-soon' as const,
    launchDate: '2026-Q2',
    categories: [
        {
            id: 'computers',
            name: 'PCs & Laptops',
            description: 'Quality computers and peripherals for students',
            icon: '/icons/computer-lab.png',
        },
        {
            id: 'programming',
            name: 'Programming Services',
            description: 'Custom software development and solutions',
            icon: '👨‍💻',
        },
        {
            id: 'repairs',
            name: 'Repairs & Support',
            description: 'Technical repairs and maintenance services',
            icon: '🔧',
        },
    ],
};

export const CAMPUS_EVENTS = [
    {
        id: 'event-1',
        title: 'Open Day 2026',
        date: '2026-02-15',
        time: '9:00 AM - 3:00 PM',
        location: 'Main Campus',
        description: 'Explore our campus, meet faculty, and learn about our programmes.',
        registrationUrl: '/contact',
        featured: true,
    },
    {
        id: 'event-2',
        title: 'Tech Career Fair',
        date: '2026-03-10',
        time: '10:00 AM - 4:00 PM',
        location: 'Technology Building',
        description: 'Connect with leading employers in technology and business.',
        registrationUrl: '/contact',
        featured: true,
    },
    {
        id: 'event-3',
        title: 'Student Orientation',
        date: '2026-01-18',
        time: '8:00 AM - 12:00 PM',
        location: 'Main Auditorium',
        description: 'Welcome session for new students entering Spring semester.',
        registrationUrl: '/contact',
        featured: false,
    },
];

export const STUDENT_RESOURCES = {
    title: 'Student Resources & Support',
    categories: [
        {
            id: 'academic',
            title: 'Academic Support',
            description: 'Resources to help you succeed in your studies.',
            services: [
                'Study aids and learning materials',
                'Tutoring programs and learning labs',
                'Academic counselling for course selection',
                'Performance improvement guidance',
            ],
            cta: 'Access Academic Support',
            icon: '📖',
        },
        {
            id: 'personal',
            title: 'Personal Support',
            description: 'Services for your emotional and mental well-being.',
            services: [
                'Personal counselling services',
                'Mental health resources',
                'Peer support programs',
                'Wellness workshops',
            ],
            cta: 'Book a Session',
            icon: '💚',
        },
        {
            id: 'non-academic',
            title: 'Non-Academic Consultations',
            description: 'Guidance beyond the classroom.',
            services: [
                'Career planning and guidance',
                'Skill development workshops',
                'Industry mentorship connections',
                'Resume and interview preparation',
            ],
            cta: 'Learn More',
            icon: '🎯',
        },
    ],
};
