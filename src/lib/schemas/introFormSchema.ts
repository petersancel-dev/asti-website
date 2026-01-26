import { z } from 'zod';

/**
 * Enum values as const for type safety
 */
const genderOptions = ['Male', 'Female'] as const;
const marketingSourceOptions = [
  'Referral',
  'Social Media',
  'Newspaper',
  'School/College Fair',
  'ASTI Alumni',
  'Internet',
  'Website',
  'Other',
] as const;

const coerceBoolean = z.union([z.boolean(), z.string()])
  .transform((val) => val === true || val === 'true');

/**
 * Zod validation schema for ASTI Introduction Registration Form
 * Simpler form with 4 sections: Programme, Personal, Employment, Emergency Contact
 * 
 * Note: Using Zod v4 syntax (message instead of errorMap)
 */
export const introFormSchema = z.object({
  // ===========================
  // Section 1: Programme Information
  // ===========================
  courseRegisteringFor: z.string().min(1, 'Please select a course'),
  isReturningStudent: coerceBoolean,

  // ===========================
  // Section 2: Personal Details
  // ===========================
  surname: z.string().min(1, 'Surname is required'),
  firstName: z.string().min(1, 'First name is required'),
  gender: z.enum(genderOptions, { message: 'Please select your gender' }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  address: z.string().min(1, 'Address is required'),
  homePhone: z.string().optional(),
  mobilePhone: z.string().min(1, 'Mobile phone is required'),
  email: z.string().email('Please enter a valid email address'),
  hasDisability: z.boolean(),
  disabilitySpecification: z.string().optional(),
  marketingSource: z.enum(marketingSourceOptions, {
    message: 'Please tell us how you heard about ASTI',
  }),

  // ===========================
  // Section 3: Employment Details
  // ===========================
  jobTitle: z.string().optional(),
  employer: z.string().optional(),
  employerAddress: z.string().optional(),
  employerTel: z.string().optional(),
  employerEmail: z
    .string()
    .email('Please enter a valid email')
    .optional()
    .or(z.literal('')),

  // ===========================
  // Section 4: Emergency Contact
  // ===========================
  emergencyContactName: z.string().min(1, 'Emergency contact name is required'),
  emergencyRelationship: z.string().min(1, 'Relationship is required'),
  emergencyHomePhone: z.string().optional(),
  emergencyMobilePhone: z.string().min(1, 'Emergency contact mobile is required'),
});

export type IntroFormData = z.infer<typeof introFormSchema>;

/**
 * Default values for form initialization
 */
export const introFormDefaults: IntroFormData = {
  courseRegisteringFor: '',
  isReturningStudent: false,
  surname: '',
  firstName: '',
  gender: 'Male',
  dateOfBirth: '',
  address: '',
  homePhone: '',
  mobilePhone: '',
  email: '',
  hasDisability: false,
  disabilitySpecification: '',
  marketingSource: 'Website',
  jobTitle: '',
  employer: '',
  employerAddress: '',
  employerTel: '',
  employerEmail: '',
  emergencyContactName: '',
  emergencyRelationship: '',
  emergencyHomePhone: '',
  emergencyMobilePhone: '',
};
