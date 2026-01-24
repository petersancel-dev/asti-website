// Contact Information - GROUND TRUTH from official ASTI documents
// Source: General Questions for Employees to Answer.docx
// Last updated: January 2026

export const CONTACT_INFO = {
    name: 'Advanced Solutions Technical Institute',
    tagline: 'Teaching Tomorrow\'s Technology...Today',
    slogan: 'Through Education and Innovation',
    address: {
        street: '#46 Boundary Road',
        city: 'San Juan',
        country: 'Trinidad and Tobago',
        full: '#46 Boundary Road, San Juan, Trinidad and Tobago',
    },
    phones: [
        { label: 'Main Office', number: '+1 868-610-7500' },
        { label: 'Registration', number: '+1 868-727-8562' },
        { label: 'Sales', number: '+1 868-778-2135' },
    ],
    whatsapp: '+1 868-727-8562',
    email: 'marketing@astitnt.com',
    registrationEmail: 'education@astitnt.com',
    socialMedia: {
        facebook: 'https://www.facebook.com/ASTIUniversity/',
        instagram: 'https://www.instagram.com/asti_caribbean/',
    },
    hours: {
        weekdays: '8:00 AM - 4:00 PM',
        saturday: '8:00 AM - 12:00 PM',
        sunday: 'Closed',
    },
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.8!2d-61.45!3d10.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s46%20Boundary%20Road%2C%20San%20Juan!5e0!3m2!1sen!2stt!4v1600000000000!5m2!1sen!2stt',
};

// Staff Directory - from official documents
export const STAFF_DIRECTORY = [
    {
        id: 'dr-peters',
        name: 'Dr. Ancil Peters',
        title: 'Academic Director',
        department: 'Academic Administration',
        email: 'ancil@astitnt.com',
        phone: '+1 868-610-7500',
        responsibilities: 'Academic advice, Degree consultations',
    },
    {
        id: 'jason-singh',
        name: 'Mr. Jason Singh',
        title: 'Support Manager',
        department: 'Technical Support',
        email: 'engineer@astitnt.com',
        phone: '+1 868-778-2135',
        responsibilities: 'Technical assistance, course outlines, flyers',
    },
    {
        id: 'penelope-roberts',
        name: 'Ms. Penelope Roberts',
        title: 'Business Development Officer',
        department: 'Business Development',
        email: 'peneloperoberts@astitnt.com',
        phone: '+1 868-761-5169',
        responsibilities: 'Course information, business inquiries',
    },
    {
        id: 'jada-goodridge',
        name: 'Ms. Jada Goodridge',
        title: 'Research Officer',
        department: 'Research',
        email: 'jadagoodridge@astitnt.com',
        responsibilities: 'Research and development',
    },
    {
        id: 'kinda-finch',
        name: 'Ms. Kinda Finch',
        title: 'Coordinator',
        department: 'Student Services',
        email: 'education@astitnt.com',
        phone: '+1 868-610-7500',
        responsibilities: 'Coordination and student registration',
    },
];

export const STATS = [
    { value: '200+', label: 'Internationally Recognized Programmes' },
    { value: '5000+', label: 'Learners Annually' },
    { value: '120+', label: 'Apprenticeships Available' },
    { value: '2000+', label: 'Employer Partners' },
];

export const LEARNING_MODES = [
    {
        id: 'online',
        title: 'Online Learning',
        description: 'Self-paced learning through our robust LMS platforms with video lectures, podcasts, and interactive simulations.',
        icon: '/icons/online-learning.png',
    },
    {
        id: 'face-to-face',
        title: 'Face-to-Face',
        description: 'Instructor-led sessions at our state-of-the-art facilities featuring the most advanced technological laboratories in the region.',
        icon: '/icons/in-person.png',
    },
    {
        id: 'hybrid',
        title: 'Blended Learning',
        description: 'The best of both worlds combining flexible online learning with hands-on practical lab sessions.',
        icon: '/icons/hybrid.png',
    },
];

// Payment Methods - from official documents
export const PAYMENT_METHODS = [
    { id: 'cash', name: 'Cash', description: 'In-person at our San Juan campus' },
    { id: 'card', name: 'Linx or Credit Card', description: 'At ASTI campus' },
    { id: 'jmmb', name: 'Bank Transfer with JMMB', description: 'Online or in-bank' },
    { id: 'paywise', name: 'PayWise', description: 'Online payment' },
];
