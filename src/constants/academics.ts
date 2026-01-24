// Academics Content - GROUND TRUTH from TVET Document
// Source: TVET DOCUMENT UPDATE.docx, Lines 61-199
// Last updated: January 2026

export const ACADEMICS_CONTENT = {
    pageTitle: 'Academics at Advanced Solutions Technical Institute (ASTI)',
    pageSubtitle: 'Technical and Vocational Education and Training Excellence',

    overview: {
        title: 'Our Academic Approach',
        introduction: 'ASTI delivers training programmes categorized into fields that align with industry expertise and demand. Our programme coordinators meticulously strategize and implement these programmes to ensure alignment with industry needs and generate measurable outcomes.',
        mission: 'ASTI delivers career success by producing competent, knowledgeable professionals in Telecommunications, IT and Business through a strategic blend of technical and theoretical learning.',
        accreditation: 'ASTI is fully accredited by ACTT (locally) and internationally by ASIC, EduQual, ETA International, and other bodies ensuring our programmes meet international standards.',
    },

    // Training Modalities from TVET Document Lines 69-115
    trainingModalities: [
        {
            id: 'lectures',
            title: 'Lectures',
            description: 'Instructor-led sessions delivered by subject matter experts in both virtual and in-person formats.',
            features: [
                'Delivered by subject matter experts',
                'Diverse training materials including handouts, videos, textbooks',
                'Interactive components with real-time feedback',
                'Structured learning environment',
            ],
        },
        {
            id: 'labs',
            title: 'Labs & Practical Sessions',
            description: 'Hands-on experience in state-of-the-art labs featuring modern technology.',
            features: [
                'Well-equipped facilities with latest industry tools',
                'Active student participation and experimentation',
                'Collaborative learning in pairs or groups',
                'Real-world application of theoretical knowledge',
            ],
        },
        {
            id: 'group-assignments',
            title: 'Group Assignments',
            description: 'Collaborative learning that enhances teamwork and interpersonal skills.',
            features: [
                'Team organization for exploration and presentation',
                'Active learning through discussions and idea sharing',
                'Development of communication and negotiation skills',
                'Shared objectives and collective problem-solving',
            ],
        },
        {
            id: 'case-studies',
            title: 'Coursework & Case Studies',
            description: 'Real-world scenarios requiring extensive research and analysis.',
            features: [
                'In-depth exploration of industry challenges',
                'Nuanced understanding of complex issues',
                'Application of theoretical concepts to practical situations',
                'Class discussions fostering diverse viewpoints',
            ],
        },
        {
            id: 'online-learning',
            title: 'Online Learning',
            description: 'Flexible, self-paced learning through robust LMS platforms.',
            features: [
                'Access course materials at your convenience',
                'Integration with Electude and ESA platforms',
                'Multimedia learning with video lectures and simulations',
                'Augmented and virtual reality experiences',
            ],
        },
    ],
};

export const ACADEMIC_CALENDAR = {
    title: 'Academic Calendar',
    pdfUrl: '/documents/academic-calendar-2026.pdf', // TODO: Add actual PDF
    highlights: [
        { date: '2026-01-15', event: 'Spring Registration Deadline' },
        { date: '2026-01-20', event: 'Spring Semester Begins' },
        { date: '2026-03-15', event: 'Mid-Semester Break' },
        { date: '2026-05-10', event: 'Final Examinations' },
        { date: '2026-05-25', event: 'Graduation Ceremony' },
    ],
};

export const COURSE_OFFERINGS = {
    title: 'Monthly Course Offerings',
    filterOptions: ['All', 'Technology', 'Business', 'Security', 'Telecommunications'],
    specialOffers: [
        { id: 'early-bird', title: 'Early Bird Registration', discount: '15% off', validUntil: '2026-01-31' },
        { id: 'bundle', title: 'Certificate Bundle', discount: '20% off 3+ courses', validUntil: '2026-02-28' },
    ],
    // Note: Actual courses would be loaded dynamically or from CMS
};

export const DISTANCE_LEARNING = {
    title: 'Distance Learning & Accommodations',
    overview: {
        heading: 'Online Learning at ASTI',
        description: 'ASTI offers flexible online learning programs designed for working professionals and students who require remote access to education.',
        features: [
            'Full degree programs available online',
            'Interactive virtual classrooms',
            'Access to digital library resources',
            'Technical support and tutoring services',
        ],
    },
    requirements: {
        heading: 'Technology Requirements',
        items: [
            'Reliable internet connection (minimum 5 Mbps)',
            'Computer with webcam and microphone',
            'Updated web browser (Chrome, Firefox, or Edge)',
            'Microsoft Office or Google Workspace',
        ],
    },
    accommodations: {
        heading: 'Accommodations for Students with Disabilities',
        description: 'ASTI is committed to providing equal access to education. We offer various accommodations for students with disabilities.',
        process: 'Contact our Accommodations Office to request support services.',
        contactEmail: 'accommodations@astitnt.com',
    },
};

export const FACULTY_PLACEHOLDER = {
    title: 'Meet Our Faculty & Staff',
    description: 'Our experienced faculty bring real-world expertise to the classroom.',
    // Note: Faculty directory would typically be loaded from a database
    sampleFaculty: [
        { id: 'f1', name: 'Dr. Jane Smith', title: 'Dean of Technology', department: 'Technology', image: '/images/placeholders/faculty-jane.jpg' },
        { id: 'f2', name: 'Prof. John Doe', title: 'Head of Business Studies', department: 'Business', image: '/images/placeholders/faculty-john.jpg' },
    ],
};
