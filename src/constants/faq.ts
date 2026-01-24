// FAQ Content - GROUND TRUTH from official ASTI documents
// Source: General Questions for Employees to Answer.docx, TVET DOCUMENT UPDATE.docx
// Last updated: January 2026

export interface FAQItem {
    question: string;
    answer: string;
    category?: 'general' | 'admissions' | 'programs' | 'financial' | 'operations';
}

export const FAQ_ITEMS: FAQItem[] = [
    {
        question: 'Who are we at ASTI?',
        answer: "Advanced Solutions Technical Institute is one of the longest-running, established tertiary institutions in Trinidad. Unlike larger institutions that cater to every possible degree, we've primarily chosen to focus on technically astute, globally recognized, industry-quality education in fiber optics technology, electronics, Certified Alarm and Security, renewable and hybrid technology, as well as mobile and computer-based development. We also offer tertiary training for a wide variety of undergraduate programmes, from our Award Certificates to Diplomas in a variety of technical and vocational fields.",
        category: 'general',
    },
    {
        question: 'When was ASTI founded?',
        answer: 'ASTI began from humble beginnings in 2001 with just a handful of students and two lecturers housed in a small room. Since then, we have grown to over fifteen hundred plus alumni and over twenty-five expert lecturers in a variety of fields. We intend to grow even larger as we expand beyond Trinidad and Tobago and the Caribbean as a whole.',
        category: 'general',
    },
    {
        question: 'Where is ASTI located?',
        answer: 'Our current branch is located at #46 Boundary Road, San Juan. With several recently announced partnerships regionally, you can soon expect several affiliate centers throughout the wider Caribbean.',
        category: 'general',
    },
    {
        question: 'What are your opening hours?',
        answer: 'Monday to Friday: 8:00 AM - 4:00 PM. Saturday: 8:00 AM - 12:00 PM. Sunday: Closed.',
        category: 'operations',
    },
    {
        question: 'What programmes does ASTI offer?',
        answer: 'We have over two hundred different available courses in high-demand, industry-relevant fields. Primarily we have courses and programmes that cater specifically for Telecommunication, Fiber Optics, Electrical and Electronics, progressive eco-friendly technology, mobile, digital and media. We have also diversified to include Security Cameras, Administrative, Clerical and Customer Service programmes.',
        category: 'programs',
    },
    {
        question: 'What are the entry requirements for the programmes?',
        answer: "For standard academic entry: at least 5 CXC/O-levels including Mathematics (Grade 1-2), English (Grade 1-2), and at least 1 Science Subject, preferably Physics. Mature entry route: 21 years+ with 3 years related work experience. For those who lack these requirements, our Award Certificate courses act as the appropriate 'doorway' to pursue diplomas or higher tertiary education.",
        category: 'admissions',
    },
    {
        question: 'How do I register and enroll at ASTI?',
        answer: 'Registration can be done online on our website or in person at #46 Boundary Road, San Juan. Alternatively, a PDF registration form can be sent to you, which should be completed and emailed to education@astitnt.com along with all relevant certificates and documents.',
        category: 'admissions',
    },
    {
        question: 'What are the prices for the programmes?',
        answer: 'Introductory: $3,500 TTD | Certificate: $7,200 TTD | Advanced Certificate: $7,500 TTD | Diploma: $10,000 TTD | Advanced Diploma: $12,000 TTD. For degree programmes, please schedule a consultation with Dr. Peters.',
        category: 'financial',
    },
    {
        question: 'Do you have payment plans?',
        answer: 'Yes! Payment plans are structured depending on the programme. All payments must be completed before course completion. Each programme has a registration fee, downpayment, and installment options. For example, the Certificate programme has a $500 registration fee, $1,500 downpayment, and 4 installments of $1,300.',
        category: 'financial',
    },
    {
        question: 'How can I make my payments?',
        answer: 'We accept: Cash (in-person at ASTI), Linx or Credit Card (at ASTI campus), Bank Transfer with JMMB (online or in-bank), and PayWise (online).',
        category: 'financial',
    },
    {
        question: 'Are these programmes accredited? By whom?',
        answer: "All programmes are fully recognized and accredited. Locally by ACTT (Accreditation Council of Trinidad and Tobago). Internationally by EduQual (recognized by SQA Accreditations UK), SCQF (Scottish Credit and Qualification Framework), ETA International (Electronic Technicians Association), and ASIC (Accreditation Service for International Schools, Colleges and Universities).",
        category: 'programs',
    },
    {
        question: 'Who should I contact for specific inquiries?',
        answer: 'Mr. Jason Singh (Support Manager) - engineer@astitnt.com for technical assistance and course outlines. Ms. Penelope Roberts (Business Development) - peneloperoberts@astitnt.com for course information. Ms. Kinda Finch (Coordinator) - education@astitnt.com for student registration. Dr. Ancil Peters (Academic Director) - ancil@astitnt.com for academic advice.',
        category: 'operations',
    },
];

// Group FAQs by category
export const FAQ_CATEGORIES = {
    general: 'General Information',
    admissions: 'Admissions & Registration',
    programs: 'Programmes & Courses',
    financial: 'Fees & Payments',
    operations: 'Hours & Contact',
};
