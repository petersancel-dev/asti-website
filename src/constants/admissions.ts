// Admissions Content - GROUND TRUTH from official ASTI documents
// Source: General Questions for Employees to Answer.docx, TVET DOCUMENT UPDATE.docx
// Last updated: January 2026

export const ADMISSIONS_CONTENT = {
    pageTitle: 'Admissions at Advanced Solutions Technical Institute (ASTI)',
    pageSubtitle: 'Your Path to Knowledge, Skills, and Career Success',
    welcomeMessage: "Congratulations, future alumni! Your path towards success through hard work and dedicated studies begins right here. Behind you lies doubt and uncertainty, while ahead lies a whole world of exciting prospects as a student of ASTI.",
};

// Official Programme Pricing from ASTI documents
export const PROGRAMME_PRICING = [
    {
        id: 'introductory',
        level: 'Introductory',
        price: 3500,
        currency: 'TTD',
        paymentPlan: {
            registration: 300,
            downpayment: 1500,
            installments: 2,
            installmentAmount: 850,
        },
    },
    {
        id: 'certificate',
        level: 'Certificate',
        price: 7500,
        currency: 'TTD',
        paymentPlan: {
            registration: 600,
            downpayment: 2000,
            installments: 3,
            installmentAmount: 1634,
        },
    },
    {
        id: 'diploma',
        level: 'Diploma',
        price: 12000,
        currency: 'TTD',
        paymentPlan: {
            registration: 1200,
            downpayment: 4000,
            installments: 12,
            installmentAmount: 567,
        },
    },
];

export const STUDY_LEVELS = [
    {
        id: 'introductory',
        type: 'Introductory / Award',
        purpose: 'Provides a short course giving learners a basic understanding of a subject.',
        features: [
            'Serves as a starting point for more advanced studies',
            'Acts as a "doorway" for those without standard entry requirements',
            'Enables progression to diplomas or higher tertiary education',
        ],
        duration: '20 Hours (2 Credits)',
        level: 'Level 1',
        icon: '/icons/award.png',
    },
    {
        id: 'certificate',
        type: 'Certificate',
        purpose: 'Provides specific skills or knowledge in a focused area with industry recognition. Includes Advanced Certificates.',
        features: [
            'Industry-relevant practical application',
            'Level 3 & 4 EduQual accredited options available',
            'Can stand alone or serve as a pathway to higher qualifications',
        ],
        duration: '6-9 Months',
        level: 'Level 3/4',
        icon: '/icons/certificate.png',
    },
    {
        id: 'diploma',
        type: 'Diploma (Advanced)',
        purpose: 'Comprehensive study covering theory and practice. Includes Advanced Diplomas, Associate & Master\'s level studies.',
        features: [
            'Broader subject coverage than certificates',
            'Prepares students for senior technical roles and leadership',
            'Industry-specific competency development',
        ],
        duration: '1-2 years',
        level: 'Level 5+',
        icon: '/icons/diploma.png',
    },
];

// Official Entry Requirements
export const ADMISSION_REQUIREMENTS = {
    standard: {
        title: 'Standard Academic Entry',
        description: 'For students coming straight from Secondary school',
        requirements: [
            'At least 5 CXC/O-levels which MUST include:',
            'Mathematics (CXC Grade 1 or 2), GCE (Grade A or B)',
            'English (CXC Grade 1 or 2), GCE (Grade A or B)',
            'At least 1 Science Subject, preferably Physics (CXC Grade 1, 2 or 3) or GCE (Grade A, B or C)',
        ],
    },
    alternative: {
        title: 'Alternative Entry (Award Certificate)',
        description: 'For those who lack standard requirements',
        requirements: [
            'Complete our Award Certificate courses as an entry pathway',
            'Successfully complete the appropriate academic pathway',
            'Progress to diploma or higher tertiary education upon completion',
        ],
    },
    mature: {
        title: 'Mature Entry',
        description: 'For experienced professionals aged 21 and above',
        requirements: [
            'Minimum age of 21 years',
            'Minimum 3 years of relevant industry experience',
            'Application through the Mature Entry route',
        ],
    },
};

export const FIELDS_OF_STUDY = [
    'Telecommunications',
    'Fiber Optics',
    'Electrical & Electronics',
    'Hybrid & Electric Vehicle Technology',
    'Renewable Energy & Solar Technologies',
    'Robotics',
    'Network Security & Cybersecurity',
    'CCTV & Security Systems',
    'Computer Repair & Maintenance',
    'Mobile Device Technology',
    'Auto Mechanics',
    'Air Conditioning',
    'Business Administration',
    'Information Technology',
];

export const FINANCIAL_AID = {
    title: 'Financial Support & Payment Plans',
    introduction: 'We fully understand the difficulty of obtaining a globally recognized education at an affordable price. ASTI strives to provide the ideal solution to the varied financial needs of our students. All payments must be completed before course completion.',

    paymentNote: 'Payment plans are structured depending on the programme. Registration fees and downpayments are due before course commencement.',

    options: [
        {
            id: 'payment-plan',
            title: 'Flexible Payment Plans',
            description: 'All programmes come with financially friendly Student Payment Plans. Your academic fees are broken down into manageable installments.',
            icon: '/icons/payment.png',
            highlight: 'Available for ALL programmes',
        },
        {
            id: 'scholarship',
            title: 'Partial Student Scholarships',
            description: 'Scholarships available for qualifying students. Contact our admissions team to learn about eligibility criteria.',
            icon: '/icons/scholarship.png',
            highlight: 'Subject to eligibility',
        },
        {
            id: 'military',
            title: 'Military & Protective Services',
            description: 'Special considerations for members of the Trinidad and Tobago Defence Force, Police Service, and other protective services.',
            icon: '/icons/military.png',
            highlight: 'Special rates available',
        },
    ],

    paymentMethods: [
        { id: 'cash', name: 'Cash', description: 'In-person at our San Juan campus' },
        { id: 'card', name: 'Linx or Credit Card', description: 'At ASTI campus' },
        { id: 'jmmb', name: 'Bank Transfer with JMMB', description: 'Online or in-bank' },
        { id: 'paywise', name: 'PayWise', description: 'Online payment' },
    ],

    contactMethods: {
        email: 'education@astitnt.com',
        phone: '+1 868-727-8562',
        whatsapp: '18687278562',
    },
};

export const APPLICATION_PROCESS = {
    title: 'How to Apply',
    steps: [
        {
            step: 1,
            title: 'Choose Your Programme',
            description: 'Browse our catalogue and select the programme that aligns with your career goals.'
        },
        {
            step: 2,
            title: 'Register Online or In-Person',
            description: 'Complete registration online on our website or visit us at #46 Boundary Road, San Juan.'
        },
        {
            step: 3,
            title: 'Submit Documents',
            description: 'Email your completed registration form along with all relevant certificates and documents to education@astitnt.com.'
        },
        {
            step: 4,
            title: 'Consultation',
            description: 'For degree programmes, schedule a consultation with Dr. Peters to discuss your pathway and financing options.'
        },
        {
            step: 5,
            title: 'Complete Payment',
            description: 'Pay your registration fee and downpayment to secure your place in the programme.'
        },
        {
            step: 6,
            title: 'Begin Your Journey',
            description: 'Receive your class schedule and start your educational journey towards career success!'
        },
    ],
    contactEmails: {
        registration: 'education@astitnt.com',
        academic: 'ancil@astitnt.com',
        info: 'marketing@astitnt.com',
    },
};

export const APPLICATION_FORMS = [
    { id: 'introductory', level: 'Introductory / Award', formUrl: '/forms/introductory-application.pdf' },
    { id: 'certificate', level: 'Certificate', formUrl: '/forms/certificate-application.pdf' },
    { id: 'diploma', level: 'Diploma', formUrl: '/forms/diploma-application.pdf' },
];
