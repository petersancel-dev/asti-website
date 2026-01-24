// Distance Learning Content
// Source: User-provided content
// Last updated: January 2026

export const DISTANCE_LEARNING_PAGE = {
    pageTitle: 'ASTI\'s Center for Online Learning',
    pageSubtitle: 'From short courses to full degrees — experience online study that works around you.',

    hero: {
        heading: 'Welcome to ASTI\'s Center for Online Learning',
        subheading: 'Welcome to Advanced Solutions Technical Institute!',
        tagline: 'From short courses to full degrees — experience online study that works around you.',
        description: 'Match your career move with a choice of more than 200 online courses. Wherever you want to take your career – in Business, education, security, fiber optics, health, IT, law, science or any other industry – Advanced Solutions Technical Institute has got the right course for you.',
        ctaText: 'Browse Online Courses',
        ctaUrl: '/programmes',
    },

    whyChoose: {
        heading: 'Why Choose Advanced Solutions Technical Institute?',
        benefits: [
            {
                title: 'Flexible Schedule',
                description: 'You decide when and where you want to finish your coursework.',
                icon: 'clock', // lucide icon
            },
            {
                title: 'All-Inclusive Tuition',
                description: 'The cost of tuition covers all content, including study guides and learning objectives.',
                icon: 'package',
            },
            {
                title: 'In-Demand Skills',
                description: 'We offer vocational programs in business, technology, healthcare, and trades — the fastest-growing sectors.',
                icon: 'trending-up',
            },
            {
                title: 'Learn Your Way',
                description: 'You can study in print or online. Receive books, study guides, and learning aids directly. You determine which learning method is best for you.',
                icon: 'book-open',
            },
        ],
    },

    categories: {
        heading: 'Explore Course Categories',
        subheading: 'Choose from 200+ online courses across these fields:',
        items: [
            { name: 'Business', icon: 'briefcase', color: 'from-blue-600 to-blue-400', href: '/programmes#business-administration' },
            { name: 'Technology & IT', icon: 'laptop', color: 'from-purple-600 to-purple-400', href: '/programmes#information-technology' },
            { name: 'Healthcare', icon: 'heart-pulse', color: 'from-rose-600 to-rose-400', href: '/programmes#healthcare' },
            { name: 'Education', icon: 'graduation-cap', color: 'from-green-600 to-green-400', href: '/programmes#education' },
            { name: 'Security', icon: 'shield', color: 'from-orange-600 to-orange-400', href: '/programmes#security-systems' },
            { name: 'Fiber Optics', icon: 'cable', color: 'from-cyan-600 to-cyan-400', href: '/programmes#fiber-optics' },
            { name: 'Law & Legal', icon: 'scale', color: 'from-indigo-600 to-indigo-400', href: '/programmes#legal-studies' },
            { name: 'Trades', icon: 'wrench', color: 'from-amber-600 to-amber-400', href: '/programmes#trades' },
        ],
    },

    howItWorks: {
        heading: 'How Online Learning Works',
        steps: [
            {
                number: 1,
                title: 'Browse & Enroll',
                description: 'Explore our catalog and choose from 200+ courses. Enroll online.',
            },
            {
                number: 2,
                title: 'Access Your Materials',
                description: 'Receive your study guides, learning objectives, and course content — online or in print.',
            },
            {
                number: 3,
                title: 'Learn at Your Pace',
                description: 'Complete coursework when and where it works for you. Our flexible format fits your life.',
            },
            {
                number: 4,
                title: 'Earn Your Credential',
                description: 'Graduate with industry-recognized certification to advance your career.',
            },
        ],
    },

    cta: {
        heading: 'The Future is Yours to Shape, Today',
        description: 'If tomorrow is inevitable, that makes the present the BEST TIME TO CHANGE YOUR FUTURE!',
        primaryButton: {
            text: 'Browse All Courses',
            url: '/programmes',
        },
        secondaryButton: {
            text: 'Contact Us',
            url: '/contact',
        },
    },
};
