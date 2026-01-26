
import { z } from 'zod';

/**
 * Enum values as const for type safety
 */
const programmeLevelOptions = [
    'Introduction',
    'Certificate',
    'Advanced Certificate',
    'Professional Diploma',
    'Advanced Certification',
] as const;

const titleOptions = ['Mr.', 'Mrs.', 'Ms.'] as const;
const genderOptions = ['Male', 'Female'] as const;
const fundingSourceOptions = ['Loan', 'Self', 'Parents', 'Work', 'Sponsor'] as const;
const marketingSourceOptions = [
    'Referral',
    'Social Media',
    'Newspaper',
    'School/College Fair',
    'ASTI Alumni',
    'Internet/Website',
    'Other',
] as const;

/**
 * Helper to safely coerce string "true"/"false" to boolean
 * Use z.union to handle both boolean (state) and string (input) values explicitly
 */
const coerceBoolean = z.union([
    z.boolean(),
    z.string().transform((val) => val === 'true')
]);

// ===========================
// Array Item Schemas (for useFieldArray)
// ===========================

export const examSchema = z.object({
    examiningBody: z.string().optional(),
    subject: z.string().optional(),
    levelAttained: z.string().optional(),
    grade: z.string().optional(),
    dateAwarded: z.string().optional(),
});

export const institutionSchema = z.object({
    name: z.string().optional(),
    programme: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    grade: z.string().optional(),
});

export const employmentSchema = z.object({
    employer: z.string().optional(),
    position: z.string().optional(),
    dateStarted: z.string().optional(),
    dateEnded: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
});

export const referenceSchema = z.object({
    name: z.string().min(1, 'Reference name is required'),
    organization: z.string().min(1, 'Organization is required'),
    position: z.string().optional(),
    address: z.string().optional(),
    mobile: z.string().min(1, 'Mobile number is required'),
    work: z.string().optional(),
    email: z.string().email('Valid email required'),
});

// ===========================
// Main Form Schema (7 Sections)
// Note: Using Zod v4 syntax (message instead of errorMap)
// ===========================

// ===========================
// Step-by-Step Schemas
// ===========================

export const programmeInfoSchema = z.object({
    programmeName: z.string().min(1, 'Programme name is required'),
    programmeLevel: z.enum(programmeLevelOptions, {
        message: 'Please select a programme level',
    }),
    isReturningStudent: coerceBoolean,
});

export const personalInfoSchema = z.object({
    title: z.enum(titleOptions, { message: 'Please select a title' }),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    gender: z.enum(genderOptions, { message: 'Please select your gender' }),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),

    // Contact Info
    mobilePhone: z.string().min(1, 'Mobile phone is required'),
    homePhone: z.string().optional(),
    workPhone: z.string().optional(),
    workExtension: z.string().optional(),
    email: z.string().email('Please enter a valid email'),

    // Current Address
    currentStreet: z.string().min(1, 'Street address is required'),
    currentZip: z.string().optional(),
    currentCity: z.string().min(1, 'City/Town is required'),
    currentCountry: z.string().min(1, 'Country is required'),

    // Mailing Address
    mailingStreet: z.string().optional(),
    mailingZip: z.string().optional(),
    mailingCity: z.string().optional(),
    mailingCountry: z.string().optional(),

    // Other Info
    religiousDenomination: z.string().optional(),
    countryOfBirth: z.string().optional(),

    // Emergency Contact
    emergencyName: z.string().min(1, 'Emergency contact name is required'),
    emergencyRelationship: z.string().min(1, 'Relationship is required'),
    emergencyMobile: z.string().min(1, 'Emergency contact mobile is required'),
    emergencyHome: z.string().optional(),

    // Disabilities
    hasDisability: coerceBoolean,
    disabilitySpecification: z.string().optional(),

    // ASTI Affiliation
    isStaffMember: coerceBoolean,
    staffName: z.string().optional(),
    staffPosition: z.string().optional(),
    staffDepartment: z.string().optional(),
    isDependentOfStaff: coerceBoolean,
    dependentStaffName: z.string().optional(),
    dependentStaffPosition: z.string().optional(),
    dependentStaffDepartment: z.string().optional(),
});

export const academicRecordsSchema = z.object({
    exams: z.array(examSchema),
    institutionsAttended: z.array(institutionSchema),
});

export const employmentHistorySchema = z.object({
    employmentHistory: z.array(employmentSchema),
});

export const referencesStepSchema = z.object({
    references: z.array(referenceSchema).min(2, 'Two references are required').max(2),
});

export const financialSupportSchema = z.object({
    fundingSource: z.enum(fundingSourceOptions, {
        message: 'Please select a funding source',
    }),
    sponsorName: z.string().optional(),
    sponsorContact: z.string().optional(),
    sponsorAddress: z.string().optional(),
});

export const declarationSchema = z.object({
    declarationAccepted: z.boolean().refine((val) => val === true, {
        message: 'You must accept the declaration to proceed',
    }),
    signatureName: z.string().min(1, 'Digital signature (full name) is required'),
    signatureDate: z.string().min(1, 'Date is required'),
    marketingSource: z.enum(marketingSourceOptions, {
        message: 'Please tell us how you heard about ASTI',
    }),
});

// ===========================
// Main Form Schema (Composed)
// ===========================

export const mainFormSchema = programmeInfoSchema
    .merge(personalInfoSchema)
    .merge(academicRecordsSchema)
    .merge(employmentHistorySchema)
    .merge(referencesStepSchema)
    .merge(financialSupportSchema)
    .merge(declarationSchema);

export type MainFormData = z.infer<typeof mainFormSchema>;
export type ExamEntry = z.infer<typeof examSchema>;
export type InstitutionEntry = z.infer<typeof institutionSchema>;
export type EmploymentEntry = z.infer<typeof employmentSchema>;
export type ReferenceEntry = z.infer<typeof referenceSchema>;

/**
 * Default values for form initialization
 */
export const mainFormDefaults: MainFormData = {
    programmeName: '',
    programmeLevel: 'Certificate',
    isReturningStudent: false,
    title: 'Mr.',
    firstName: '',
    lastName: '',
    gender: 'Male',
    dateOfBirth: '',
    mobilePhone: '',
    homePhone: '',
    workPhone: '',
    workExtension: '',
    email: '',
    currentStreet: '',
    currentZip: '',
    currentCity: '',
    currentCountry: 'Trinidad and Tobago',
    mailingStreet: '',
    mailingZip: '',
    mailingCity: '',
    mailingCountry: '',
    religiousDenomination: '',
    countryOfBirth: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyMobile: '',
    emergencyHome: '',
    hasDisability: false,
    disabilitySpecification: '',
    isStaffMember: false,
    staffName: '',
    staffPosition: '',
    staffDepartment: '',
    isDependentOfStaff: false,
    dependentStaffName: '',
    dependentStaffPosition: '',
    dependentStaffDepartment: '',
    exams: [],
    institutionsAttended: [],
    employmentHistory: [],
    references: [
        { name: '', organization: '', position: '', address: '', mobile: '', work: '', email: '' },
        { name: '', organization: '', position: '', address: '', mobile: '', work: '', email: '' },
    ],
    fundingSource: 'Self',
    sponsorName: '',
    sponsorContact: '',
    sponsorAddress: '',
    declarationAccepted: false,
    signatureName: '',
    signatureDate: '',
    marketingSource: 'Internet/Website',
};
